import { useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Segmented } from '@/components/ui/tabs'
import { Label } from '@/components/ui/input'
import { Stat } from '@/components/ui/misc'
import { cn, fmt } from '@/lib/utils'

/* Modèle qualitatif (équations différentielles simples, intégrées par la méthode d'Euler).
   P : pathogène · N : réponse innée (phagocytes, inflammation) · L : lymphocytes T/B effecteurs
   Pl : plasmocytes · Ab : anticorps (titre relatif) · M : lymphocytes mémoire · Ag : antigène vaccinal.
   Unités arbitraires : le but est de reproduire l'allure des courbes, pas de prédire des valeurs. */

type Scenario = 'primaire' | 'secondaire' | 'vaccin'
interface Exposure {
  t: number
  kind: 'path' | 'vac'
  dose: number
  label: string
}
interface Sample {
  t: number
  P: number
  N: number
  L: number
  Pl: number
  Ab: number
  M: number
}
const DAYS = 120

function simulate(exps: Exposure[], g: number): Sample[] {
  const dt = 0.05
  let P = 0, N = 0, L = 0, Pl = 0, Ab = 1, M = 0, Ag = 0
  let ei = 0
  const out: Sample[] = []
  const Kp = 0.3
  const steps = Math.round(DAYS / dt)
  for (let k = 0; k <= steps; k++) {
    const t = k * dt
    while (ei < exps.length && exps[ei].t <= t + 1e-9) {
      if (exps[ei].kind === 'path') P += exps[ei].dose
      else Ag += exps[ei].dose
      ei++
    }
    if (k % 5 === 0) out.push({ t, P, N, L, Pl, Ab, M })
    const S = (P + Ag) / (P + Ag + Kp)
    const dP = g * P * (1 - P / 10) - 0.5 * N * P - 400 * L * P - 0.004 * Ab * P
    const dN = 2 * S - 0.7 * N
    const dAg = -0.15 * Ag - 0.0005 * Ab * Ag
    const dL = (1e-6 + 1.2 * M) * S + 1.8 * S * L - 0.3 * L
    const dPl = 2 * L + 250 * M * S - 0.3 * Pl
    const dAb = 2500 * Pl - 0.04 * Ab
    const dM = 0.03 * L - 0.002 * M
    P = Math.max(0, P + dt * dP)
    N += dt * dN
    Ag = Math.max(0, Ag + dt * dAg)
    L += dt * dL
    Pl += dt * dPl
    Ab = Math.max(1, Ab + dt * dAb)
    M += dt * dM
    if (P < 1e-5) P = 0
  }
  return out
}

const SCEN: Record<Scenario, { label: string; text: string }> = {
  primaire: {
    label: 'Première infection',
    text: 'Premier contact avec le pathogène : la réponse innée freine sa multiplication, mais la réponse adaptative spécifique est lente (plusieurs jours : sélection puis multiplication des clones de LT et LB). Les anticorps apparaissent vers le 7e–10e jour.',
  },
  secondaire: {
    label: 'Seconde infection',
    text: 'Au second contact (jour 60), les lymphocytes mémoire spécifiques, déjà nombreux, sont activés immédiatement : la réponse est plus rapide, plus intense et plus durable. Le pathogène est éliminé avant l’apparition de symptômes marqués.',
  },
  vaccin: {
    label: 'Vaccination puis infection',
    text: 'Le vaccin (antigène non pathogène) déclenche une réponse primaire et crée des cellules mémoire ; le rappel (jour 28) l’amplifie. Lors de l’infection (jour 70), la réponse secondaire est immédiate : le pathogène est neutralisé presque aussitôt.',
  },
}

function exposures(s: Scenario, dose: number): Exposure[] {
  if (s === 'primaire') return [{ t: 0, kind: 'path', dose, label: 'infection' }]
  if (s === 'secondaire') return [{ t: 0, kind: 'path', dose, label: '1re infection' }, { t: 60, kind: 'path', dose, label: '2e infection' }]
  return [
    { t: 0, kind: 'vac', dose: 0.6, label: 'vaccin' },
    { t: 28, kind: 'vac', dose: 0.6, label: 'rappel' },
    { t: 70, kind: 'path', dose, label: 'infection' },
  ]
}

const BLUE = 'hsl(217 91% 60%)'
const RED = 'hsl(0 84% 60%)'
const VIOLET = 'hsl(263 70% 60%)'
const GREEN = 'hsl(142 71% 45%)'
const ORANGE = 'hsl(25 95% 53%)'

export default function ImmuneResponse() {
  const [scen, setScen] = useState<Scenario>('primaire')
  const [day, setDay] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [dose, setDose] = useState(0.01)
  const [g, setG] = useState(1.6)

  const exps = useMemo(() => exposures(scen, dose), [scen, dose])
  const data = useMemo(() => simulate(exps, g), [exps, g])
  const lastInf = [...exps].reverse().find((e) => e.kind === 'path')!
  const ghost = useMemo(() => (scen === 'primaire' ? null : simulate([{ t: lastInf.t, kind: 'path', dose, label: '' }], g)), [scen, lastInf.t, dose, g])

  useEffect(() => {
    if (!playing) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      setDay((d) => {
        const nd = d + dt * 6
        if (nd >= DAYS) {
          setPlaying(false)
          return DAYS
        }
        return nd
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  const idx = Math.min(data.length - 1, Math.round(day / 0.25))
  const cur = data[idx]
  const after = data.filter((d) => d.t >= lastInf.t)
  const peakP = after.reduce((a, d) => Math.max(a, d.P), 0)
  const peakAt = after.find((d) => d.P === peakP)
  const clearedAt = peakAt ? data.find((d) => d.t > peakAt.t && d.P < 0.01) : undefined
  const baseline = 1

  const flags = [
    { on: cur.N > 0.3, label: 'Réponse innée', color: BLUE },
    { on: cur.L > 3e-5, label: 'Adaptative cellulaire (LT)', color: VIOLET },
    { on: cur.Ab > 5, label: 'Adaptative humorale (anticorps)', color: ORANGE },
    { on: cur.M > 3e-4, label: 'Mémoire immunitaire', color: GREEN },
  ]

  return (
    <WidgetFrame
      title="Réponse immunitaire : innée, adaptative et mémoire"
      subtitle="Simulation qualitative sur 120 jours (unités arbitraires)"
      controls={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Scénario</Label>
            <div className="flex flex-col gap-1">
              {(Object.keys(SCEN) as Scenario[]).map((k) => (
                <button
                  key={k}
                  onClick={() => {
                    setScen(k)
                    setDay(0)
                    setPlaying(false)
                  }}
                  className={cn('border px-2.5 py-1.5 text-left text-xs font-medium', scen === k ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent')}
                >
                  {SCEN[k].label}
                </button>
              ))}
            </div>
          </div>
          <Slider label="Temps écoulé" value={day} min={0} max={DAYS} step={0.25} unit="j" digits={1} onChange={(v) => { setPlaying(false); setDay(v) }} />
          <div className="flex gap-2">
            <Button size="sm" className="flex-1" onClick={() => { if (day >= DAYS) setDay(0); setPlaying((p) => !p) }}>
              {playing ? <Pause /> : <Play />} {playing ? 'Pause' : 'Lecture'}
            </Button>
            <Button size="sm" variant="outline" onClick={() => { setPlaying(false); setDay(0) }} aria-label="Retour au début">
              <RotateCcw />
            </Button>
          </div>
          <Slider label="Dose de pathogène" value={dose} min={0.002} max={0.05} step={0.002} digits={3} onChange={setDose} />
          <Slider label="Vitesse de multiplication" value={g} min={0.8} max={2.4} step={0.1} unit="/j" digits={1} onChange={setG} />
          <div className="grid grid-cols-2 gap-2">
            <Stat label="Pathogène" value={cur.P < 0.001 ? '0' : fmt(cur.P, cur.P < 0.1 ? 3 : 2)} tone={cur.P > 0.3 ? 'destructive' : cur.P > 0.01 ? 'warning' : 'success'} />
            <Stat label="Titre en anticorps" value={`× ${fmt(cur.Ab / baseline, cur.Ab > 100 ? 0 : 1)}`} tone="info" />
            <Stat label="Pic du pathogène" value={fmt(peakP, 2)} tone={peakP > 0.5 ? 'warning' : 'success'} />
            <Stat label="Élimination" value={clearedAt ? `j ${fmt(clearedAt.t, 0)} (+${fmt(clearedAt.t - lastInf.t, 0)} j)` : '—'} />
          </div>
        </>
      }
      footer={
        <div className="space-y-1 text-xs leading-relaxed">
          <p>{SCEN[scen].text}</p>
          <p className="text-muted-foreground">
            <b>Innée</b> : immédiate, non spécifique (barrières, inflammation, phagocytes, cellules NK). <b>Adaptative</b> : spécifique, plus lente ; les LT CD4 (auxiliaires) coordonnent, les LT CD8 détruisent les cellules infectées,
            les LB deviennent des plasmocytes sécréteurs d’anticorps (neutralisation, opsonisation). <b>Mémoire</b> : LB et LT mémoire persistants, à l’origine de la réponse secondaire et du principe de la vaccination.
          </p>
        </div>
      }
    >
      <div className="space-y-3">
        <Scene cur={cur} />
        <div className="flex flex-wrap gap-1.5">
          {flags.map((f) => (
            <span
              key={f.label}
              className={cn('border px-2 py-0.5 text-[11px] font-medium transition-opacity', f.on ? '' : 'opacity-35')}
              style={f.on ? { borderColor: f.color, background: `color-mix(in srgb, ${f.color} 18%, transparent)` } : undefined}
            >
              {f.label}
            </span>
          ))}
        </div>
        <Charts data={data} ghost={ghost} exps={exps} day={day} scen={scen} />
      </div>
    </WidgetFrame>
  )
}

/* ------------------------------------------------------------------ */
/* Scène animée                                                       */
/* ------------------------------------------------------------------ */

function hash(i: number, s: number) {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453
  return x - Math.floor(x)
}
const clamp01 = (x: number) => Math.max(0, Math.min(1, x))

function Scene({ cur }: { cur: Sample }) {
  const [now, setNow] = useState(0)
  const t0 = useRef(performance.now())
  useEffect(() => {
    let raf = 0
    const tick = (t: number) => {
      setNow((t - t0.current) / 1000)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const nP = cur.P > 0.003 ? Math.max(1, Math.ceil(Math.sqrt(cur.P / 2.3) * 22)) : 0
  const nN = cur.N > 0.05 ? Math.max(1, Math.ceil(clamp01(cur.N / 2.5) * 8)) : 0
  const nL = cur.L > 1e-6 ? Math.ceil(clamp01((Math.log10(cur.L) + 6) / 4) * 8) : 0
  const nPl = cur.Pl > 1e-6 ? Math.ceil(clamp01((Math.log10(cur.Pl) + 6) / 4.6) * 6) : 0
  const nAb = cur.Ab > 1.2 ? Math.ceil(clamp01(Math.log10(cur.Ab) / 4) * 26) : 0
  const nM = cur.M > 1e-5 ? Math.ceil(clamp01((Math.log10(cur.M) + 5) / 2.6) * 6) : 0

  const pos = (i: number, s: number, ax = 14, ay = 10) => ({
    x: 14 + hash(i, s) * 392 + Math.sin(now * (0.4 + hash(i, s + 1) * 0.5) + i) * ax,
    y: 14 + hash(i, s + 2) * 172 + Math.cos(now * (0.3 + hash(i, s + 3) * 0.5) + i * 2) * ay,
  })

  return (
    <div className="border bg-background">
      <svg viewBox="0 0 420 200" className="w-full" fontFamily="Geist, sans-serif">
        <rect x="0" y="0" width="420" height="200" fill="hsl(var(--muted) / 0.25)" />
        {/* cellules de l'hôte */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x = 20 + (i % 6) * 70 + (Math.floor(i / 6) % 2) * 28
          const y = 30 + Math.floor(i / 6) * 120
          return <ellipse key={i} cx={x + 20} cy={y + 20} rx="28" ry="20" fill="hsl(var(--card))" stroke="hsl(var(--border))" opacity="0.7" />
        })}
        {/* anticorps */}
        {Array.from({ length: nAb }).map((_, i) => {
          const p = pos(i, 7, 18, 12)
          const a = Math.sin(now * 0.7 + i) * 40
          return (
            <g key={`a${i}`} transform={`translate(${p.x} ${p.y}) rotate(${a})`} stroke={ORANGE} strokeWidth="1.6" fill="none" strokeLinecap="round">
              <path d="M0 5 V0 M0 0 L-4 -5 M0 0 L4 -5" />
            </g>
          )
        })}
        {/* pathogènes */}
        {Array.from({ length: nP }).map((_, i) => {
          const p = pos(i, 1)
          return (
            <g key={`p${i}`} transform={`translate(${p.x} ${p.y}) rotate(${now * 30 + i * 40})`}>
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <line key={a} x1="0" y1="0" x2={7.5 * Math.cos((a * Math.PI) / 180)} y2={7.5 * Math.sin((a * Math.PI) / 180)} stroke={RED} strokeWidth="1.3" />
              ))}
              <circle r="4.5" fill={RED} />
            </g>
          )
        })}
        {/* phagocytes */}
        {Array.from({ length: nN }).map((_, i) => {
          const p = pos(i, 3, 22, 14)
          return (
            <g key={`n${i}`} transform={`translate(${p.x} ${p.y})`}>
              <ellipse rx={13 + Math.sin(now * 2 + i) * 1.2} ry="10" fill="hsl(217 91% 60% / 0.3)" stroke={BLUE} strokeWidth="1.5" />
              <circle cx="-3" cy="0" r="3.5" fill={BLUE} opacity="0.6" />
            </g>
          )
        })}
        {/* lymphocytes T */}
        {Array.from({ length: nL }).map((_, i) => {
          const p = pos(i, 5, 20, 12)
          return (
            <g key={`l${i}`} transform={`translate(${p.x} ${p.y})`}>
              <circle r="7.5" fill="hsl(263 70% 60% / 0.3)" stroke={VIOLET} strokeWidth="1.8" />
              <circle r="3.6" fill={VIOLET} />
            </g>
          )
        })}
        {/* plasmocytes */}
        {Array.from({ length: nPl }).map((_, i) => {
          const p = pos(i, 9, 16, 10)
          return (
            <g key={`pl${i}`} transform={`translate(${p.x} ${p.y})`}>
              <ellipse rx="10" ry="8" fill="hsl(142 71% 45% / 0.25)" stroke={GREEN} strokeWidth="1.6" />
              <path d="M-5 -2 q3 -3 6 0 q3 3 6 0 M-5 2 q3 -3 6 0 q3 3 6 0" stroke={GREEN} fill="none" strokeWidth="1" />
            </g>
          )
        })}
        {/* mémoire */}
        {Array.from({ length: nM }).map((_, i) => {
          const p = pos(i, 11, 8, 6)
          return (
            <g key={`m${i}`} transform={`translate(${p.x} ${p.y})`}>
              <circle r="6" fill="hsl(var(--background))" stroke={GREEN} strokeWidth="1.6" strokeDasharray="2 2" />
              <circle r="2" fill={GREEN} />
            </g>
          )
        })}
        {/* légende */}
        <g transform="translate(0 188)" fontSize="8.5" className="svg-fill">
          <rect x="0" y="-8" width="420" height="20" fill="hsl(var(--card))" opacity="0.9" />
          <g transform="translate(8 0)"><circle r="3.5" fill={RED} /><text x="7" y="3">pathogène</text></g>
          <g transform="translate(70 0)"><ellipse rx="6" ry="4.5" fill="hsl(217 91% 60% / 0.3)" stroke={BLUE} /><text x="10" y="3">phagocyte</text></g>
          <g transform="translate(130 0)"><circle r="4.5" fill="hsl(263 70% 60% / 0.3)" stroke={VIOLET} strokeWidth="1.5" /><text x="8" y="3">LT effecteur</text></g>
          <g transform="translate(198 0)"><ellipse rx="6" ry="4.5" fill="hsl(142 71% 45% / 0.25)" stroke={GREEN} /><text x="10" y="3">plasmocyte</text></g>
          <g transform="translate(262 0)"><path d="M0 4 V0 M0 0 L-3 -4 M0 0 L3 -4" stroke={ORANGE} strokeWidth="1.5" fill="none" /><text x="7" y="3">anticorps</text></g>
          <g transform="translate(316 0)"><circle r="4" fill="none" stroke={GREEN} strokeDasharray="2 1.5" /><text x="8" y="3">cellule mémoire</text></g>
        </g>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Courbes                                                            */
/* ------------------------------------------------------------------ */

function Charts({ data, ghost, exps, day, scen }: { data: Sample[]; ghost: Sample[] | null; exps: Exposure[]; day: number; scen: Scenario }) {
  const W = 520
  const m = { l: 44, r: 12, t: 20, b: 28 }
  const sx = (t: number) => m.l + (t / DAYS) * (W - m.l - m.r)
  const mk = (H: number) => {
    return { H, sy: (v: number, max: number) => H - m.b - (Math.min(v, max) / max) * (H - m.t - m.b) }
  }
  const A = mk(150)
  const B = mk(150)
  const maxA = 3
  const line = (s: Sample[], f: (d: Sample) => number, sy: (v: number) => number) => s.map((d, i) => `${i ? 'L' : 'M'}${sx(d.t).toFixed(1)} ${sy(f(d)).toFixed(1)}`).join(' ')
  const lgMax = 4.2
  const syB = (v: number) => B.H - m.b - (Math.log10(Math.max(1, v)) / lgMax) * (B.H - m.t - m.b)
  const axisX = (H: number) => (
    <g>
      {[0, 20, 40, 60, 80, 100, 120].map((d) => (
        <g key={d}>
          <line x1={sx(d)} x2={sx(d)} y1={m.t} y2={H - m.b} className="svg-grid" strokeDasharray="2 3" />
          <text x={sx(d)} y={H - m.b + 12} textAnchor="middle" fontSize="8.5" className="svg-muted">{d}</text>
        </g>
      ))}
      <text x={(m.l + W - m.r) / 2} y={H - 3} textAnchor="middle" fontSize="9" className="svg-fill">temps (jours)</text>
    </g>
  )
  const events = (H: number) =>
    exps.map((e, i) => (
      <g key={i}>
        <line x1={sx(e.t)} x2={sx(e.t)} y1={m.t - 4} y2={H - m.b} stroke={e.kind === 'path' ? RED : GREEN} strokeWidth="1.6" />
        <text x={sx(e.t) + 3} y={m.t + 4} fontSize="8.5" fontWeight="700" fill={e.kind === 'path' ? RED : GREEN}>{e.label}</text>
      </g>
    ))
  const cursor = (H: number) => <line x1={sx(day)} x2={sx(day)} y1={m.t} y2={H - m.b} className="svg-stroke" strokeWidth="1.5" />
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="border bg-background">
        <svg viewBox={`0 0 ${W} ${A.H}`} className="w-full" fontFamily="Geist, sans-serif">
          <text x="8" y="12" fontSize="10" fontWeight="600" className="svg-fill">Pathogène et réponse innée (u. a.)</text>
          {axisX(A.H)}
          <line x1={m.l} x2={m.l} y1={m.t} y2={A.H - m.b} className="svg-stroke" />
          <line x1={m.l} x2={W - m.r} y1={A.H - m.b} y2={A.H - m.b} className="svg-stroke" />
          {[0, 1, 2, 3].map((v) => (
            <text key={v} x={m.l - 5} y={A.sy(v, maxA) + 3} textAnchor="end" fontSize="8.5" className="svg-muted">{v}</text>
          ))}
          {events(A.H)}
          {ghost && <path d={line(ghost, (d) => d.P, (v) => A.sy(v, maxA))} fill="none" stroke={RED} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />}
          <path d={line(data, (d) => d.N, (v) => A.sy(v, maxA))} fill="none" stroke={BLUE} strokeWidth="2" />
          <path d={line(data, (d) => d.P, (v) => A.sy(v, maxA))} fill="none" stroke={RED} strokeWidth="2.6" />
          {cursor(A.H)}
          <g fontSize="9" fontWeight="700">
            <text x={W - m.r - 4} y={m.t + 14} textAnchor="end" fill={RED}>— pathogène</text>
            <text x={W - m.r - 4} y={m.t + 26} textAnchor="end" fill={BLUE}>— réponse innée</text>
            {ghost && <text x={W - m.r - 4} y={m.t + 38} textAnchor="end" fill={RED} opacity="0.7">- - sans immunité préalable</text>}
          </g>
        </svg>
      </div>
      <div className="border bg-background">
        <svg viewBox={`0 0 ${W} ${B.H}`} className="w-full" fontFamily="Geist, sans-serif">
          <text x="8" y="12" fontSize="10" fontWeight="600" className="svg-fill">Anticorps spécifiques (échelle logarithmique)</text>
          {axisX(B.H)}
          <line x1={m.l} x2={m.l} y1={m.t} y2={B.H - m.b} className="svg-stroke" />
          <line x1={m.l} x2={W - m.r} y1={B.H - m.b} y2={B.H - m.b} className="svg-stroke" />
          {[0, 1, 2, 3, 4].map((e) => (
            <g key={e}>
              <line x1={m.l} x2={W - m.r} y1={syB(10 ** e)} y2={syB(10 ** e)} className="svg-grid" strokeDasharray="2 3" />
              <text x={m.l - 5} y={syB(10 ** e) + 3} textAnchor="end" fontSize="8.5" className="svg-muted">10{['⁰', '¹', '²', '³', '⁴'][e]}</text>
            </g>
          ))}
          {events(B.H)}
          <path d={line(data, (d) => d.Ab, syB)} fill="none" stroke={ORANGE} strokeWidth="2.6" />
          {cursor(B.H)}
          {scen !== 'primaire' && <text x={W - m.r - 4} y={m.t + 14} textAnchor="end" fontSize="9" className="svg-muted">réponse secondaire : plus rapide et plus ample</text>}
          {scen === 'primaire' && <text x={W - m.r - 4} y={m.t + 14} textAnchor="end" fontSize="9" className="svg-muted">réponse primaire : retard de plusieurs jours</text>}
        </svg>
      </div>
    </div>
  )
}
