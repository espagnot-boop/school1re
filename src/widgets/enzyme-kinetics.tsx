import { useEffect, useMemo, useRef, useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Slider } from '@/components/ui/slider'
import { Segmented } from '@/components/ui/tabs'
import { Label, Select } from '@/components/ui/input'
import { Stat } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { fmt } from '@/lib/utils'

/* Modèle pédagogique :
   v = Vmax · [E]rel · f_T(T) · f_pH(pH) · [S] / (Km + [S])
   f_T : activité qui double environ tous les 10 °C (Q10 = 2) multipliée par la fraction d'enzyme native (dénaturation thermique).
   f_pH : courbe en cloche autour du pH optimal. */

interface Enzyme {
  id: string
  name: string
  topt: number
  phopt: number
  km: number // mmol/L
  vmax: number // µmol/min (unité arbitraire)
  note: string
}

const ENZYMES: Enzyme[] = [
  { id: 'amylase', name: 'Amylase salivaire (digestion de l’amidon)', topt: 37, phopt: 6.8, km: 5, vmax: 100, note: 'Active dans la bouche (pH ≈ 7), inactivée dans l’estomac acide.' },
  { id: 'pepsine', name: 'Pepsine (estomac)', topt: 37, phopt: 2, km: 3, vmax: 100, note: 'Protéase de l’estomac : optimum en milieu très acide (pH ≈ 2).' },
  { id: 'trypsine', name: 'Trypsine (intestin grêle)', topt: 37, phopt: 8, km: 4, vmax: 100, note: 'Protéase de l’intestin : optimum en milieu légèrement basique (pH ≈ 8).' },
  { id: 'taq', name: 'ADN polymérase Taq (bactérie thermophile)', topt: 72, phopt: 8.5, km: 2, vmax: 100, note: 'Provient de Thermus aquaticus : reste active à 72 °C, utilisée en PCR.' },
]

const Q = Math.LN2 / 10

function nativeFrac(T: number, e: Enzyme) {
  const Td = e.topt + 3.9
  return 1 / (1 + Math.exp((T - Td) / 2.5))
}
function rawT(T: number, e: Enzyme) {
  return Math.exp(Q * (T - e.topt)) * nativeFrac(T, e)
}
const normCache = new Map<string, number>()
function fT(T: number, e: Enzyme) {
  let n = normCache.get(e.id)
  if (n === undefined) {
    n = 0
    for (let t = 0; t <= 100; t += 0.25) n = Math.max(n, rawT(t, e))
    normCache.set(e.id, n)
  }
  return rawT(T, e) / n
}
function fPH(pH: number, e: Enzyme) {
  return Math.exp(-0.5 * Math.pow((pH - e.phopt) / 1.15, 2))
}
function mm(S: number, km: number) {
  return S / (km + S)
}

type View = 'S' | 'T' | 'pH'

export default function EnzymeKinetics() {
  const [enzId, setEnzId] = useState('amylase')
  const e = ENZYMES.find((x) => x.id === enzId)!
  const [S, setS] = useState(10)
  const [T, setT] = useState(37)
  const [pH, setPH] = useState(7)
  const [E, setE] = useState(1)
  const [view, setView] = useState<View>('S')

  const changeEnzyme = (id: string) => {
    const n = ENZYMES.find((x) => x.id === id)!
    setEnzId(id)
    setT(n.topt)
    setPH(n.phopt)
  }

  const ft = fT(T, e)
  const fp = fPH(pH, e)
  const vmaxEff = e.vmax * E * ft * fp
  const v = vmaxEff * mm(S, e.km)
  const native = nativeFrac(T, e)
  const occ = mm(S, e.km)
  const vmaxRef = e.vmax * E

  const state = native < 0.2 ? 'dénaturée' : native < 0.85 ? 'en cours de dénaturation' : 'native'
  const stateTone = native < 0.2 ? 'destructive' : native < 0.85 ? 'warning' : 'success'

  let comment: string
  if (native < 0.2) comment = 'La température est trop élevée : la structure tridimensionnelle de l’enzyme est détruite (dénaturation irréversible), le site actif n’existe plus. La vitesse tombe à presque zéro.'
  else if (native < 0.85) comment = 'Au-delà de la température optimale, une partie des enzymes se dénature : la vitesse chute alors que l’agitation thermique devrait l’augmenter.'
  else if (fp < 0.3) comment = 'Le pH s’écarte fortement du pH optimal : l’ionisation des acides aminés du site actif change, le substrat ne se fixe plus correctement. L’enzyme est peu active (effet en partie réversible).'
  else if (T < e.topt - 15) comment = 'À basse température l’enzyme n’est pas détruite mais l’agitation moléculaire est faible : les rencontres enzyme-substrat sont rares et la réaction est lente (effet réversible).'
  else if (S < e.km * 0.3) comment = 'Pour de faibles concentrations de substrat, la plupart des sites actifs sont libres : la vitesse est proportionnelle à [S].'
  else if (occ > 0.9) comment = 'Presque tous les sites actifs sont occupés : la vitesse atteint un plateau voisin de Vmax. Augmenter [S] ne l’accélère plus (seule [E] le ferait).'
  else comment = 'Conditions proches de l’optimum : la vitesse dépend de la saturation des sites actifs par le substrat.'

  return (
    <WidgetFrame
      title="Cinétique enzymatique"
      subtitle="Vitesse initiale en fonction de la concentration en substrat, de la température et du pH"
      controls={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Enzyme</Label>
            <Select value={enzId} onChange={(ev) => changeEnzyme(ev.target.value)}>
              {ENZYMES.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </Select>
            <div className="text-[11px] leading-snug text-muted-foreground">{e.note}</div>
          </div>
          <Slider label="Substrat [S]" value={S} min={0} max={50} step={0.5} unit="mmol/L" digits={1} onChange={setS} />
          <Slider label="Température" value={T} min={0} max={100} step={1} unit="°C" digits={0} onChange={setT} />
          <Slider label="pH" value={pH} min={0} max={14} step={0.1} digits={1} onChange={setPH} />
          <Slider label="Quantité d’enzyme [E]" value={E} min={0.25} max={2} step={0.25} unit="× réf." digits={2} onChange={setE} />
          <div className="grid grid-cols-2 gap-2">
            <Stat label="Vitesse v" value={`${fmt(v, 1)} µmol/min`} tone="info" />
            <Stat label="Vmax (conditions)" value={`${fmt(vmaxEff, 1)}`} />
            <Stat label="Sites occupés" value={`${fmt(occ * 100, 0)} %`} />
            <Stat label="Enzyme native" value={`${fmt(native * 100, 0)} %`} tone={stateTone} />
          </div>
        </>
      }
      footer={
        <div className="space-y-1 text-xs leading-relaxed">
          <p>
            <b>Enzyme {state}.</b> {comment}
          </p>
          <p className="text-muted-foreground">
            Modèle de Michaelis-Menten : <Tex>{String.raw`v = V_{max}\,\dfrac{[S]}{K_m + [S]}`}</Tex>, avec <Tex>{String.raw`K_m`}</Tex> = {fmt(e.km, 1)} mmol/L ici (concentration de substrat pour laquelle{' '}
            <Tex>{String.raw`v = V_{max}/2`}</Tex>).
          </p>
        </div>
      }
    >
      <div className="space-y-3">
        <ActiveSite S={S} km={e.km} native={native} fp={fp} ft={ft} />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold">Vitesse initiale en fonction de…</span>
          <Segmented
            value={view}
            onChange={setView}
            options={[
              { value: 'S', label: '[S]' },
              { value: 'T', label: 'Température' },
              { value: 'pH', label: 'pH' },
            ]}
          />
        </div>
        <Chart view={view} e={e} S={S} T={T} pH={pH} E={E} ft={ft} fp={fp} vmaxRef={vmaxRef} />
      </div>
    </WidgetFrame>
  )
}

/* ------------------------------------------------------------------ */
/* Animation du site actif                                            */
/* ------------------------------------------------------------------ */

function enzymePath(def: number, notchDepth: number) {
  const pts: string[] = []
  const n = 140
  for (let i = 0; i <= n; i++) {
    const th = (i / n) * Math.PI * 2
    const dth = Math.atan2(Math.sin(th + Math.PI / 2), Math.cos(th + Math.PI / 2)) // 0 au sommet
    const notch = notchDepth * Math.exp(-Math.pow(dth / 0.33, 2))
    const wob = def * (9 * Math.sin(3 * th + 1) + 6 * Math.sin(5 * th + 2) + 4 * Math.sin(7 * th))
    const r = 62 + wob - notch
    const x = 180 + r * Math.cos(th)
    const y = 118 + r * Math.sin(th) * 0.9
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ') + ' Z'
}

function ActiveSite({ S, km, native, fp, ft }: { S: number; km: number; native: number; fp: number; ft: number }) {
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

  const def = 1 - native // déformation par dénaturation
  const fails = native < 0.45 || fp < 0.12
  const rate = Math.max(0.05, ft * fp)
  const dead = ft * fp < 0.03 || S < 0.05

  // chronologie du cycle
  const tApp = 0.9
  const tBound = 1.5 / rate
  const tRel = 0.9
  const tWait = Math.min(10, tBound * (km / Math.max(S, 0.05)))
  const period = tWait + tApp + tBound + tRel
  const u = dead ? 0 : now % period
  type Ph = 'wait' | 'approach' | 'bound' | 'release'
  let ph: Ph = 'wait'
  let f = 0
  if (!dead) {
    if (u < tWait) { ph = 'wait'; f = u / tWait }
    else if (u < tWait + tApp) { ph = 'approach'; f = (u - tWait) / tApp }
    else if (u < tWait + tApp + tBound) { ph = 'bound'; f = (u - tWait - tApp) / tBound }
    else { ph = 'release'; f = (u - tWait - tApp - tBound) / tRel }
  }
  const notchDepth = 30 * (1 - 0.75 * def) * (fp < 0.5 ? 0.6 + 0.8 * fp : 1)
  const body = useMemo(() => enzymePath(def, notchDepth), [def, notchDepth])
  const notchY = 118 - 62 * 0.9 + notchDepth * 0.9 * 1 // fond de la poche
  const siteC = { x: 180, y: notchY + 2 }

  // position du substrat actif
  const start = { x: 300, y: 28 }
  let sx = start.x + Math.sin(now * 1.3) * 6
  let sy = start.y + Math.cos(now * 1.7) * 5
  let showS = true
  let split = 0
  if (ph === 'approach') {
    const k = fails ? Math.sin((f * Math.PI)) * 0.62 : f
    const e = k * k * (3 - 2 * k)
    sx = start.x + (siteC.x - start.x) * e
    sy = start.y + (siteC.y - 12 - start.y) * e
    if (fails && f > 0.95) sx = start.x
  } else if (ph === 'bound') {
    if (fails) {
      sx = start.x + Math.sin(now * 1.3) * 6
      sy = start.y + Math.cos(now * 1.7) * 5
    } else {
      sx = siteC.x
      sy = siteC.y - 12
      split = f > 0.5 ? Math.min(1, (f - 0.5) * 3) : 0
    }
  } else if (ph === 'release') {
    split = 1
    showS = !fails
  }
  const bound = ph === 'bound' && !fails
  const nFloat = Math.round(Math.min(14, (S / 50) * 14 + (S > 0 ? 1 : 0)))
  const floaters = useMemo(
    () => Array.from({ length: 14 }, (_, i) => ({ x: 20 + ((i * 53) % 330), y: 20 + ((i * 37) % 70) + (i % 3) * 10, p: i * 1.9 })),
    [],
  )

  const col = fp < 0.5 ? 'hsl(263 70% 60%)' : 'hsl(217 91% 60%)'
  const subShape = (cx: number, cy: number, half?: 0 | 1 | 2, off = 0) => {
    // petit hexagone ; half : moitié gauche (1) ou droite (2)
    const pts = [[-12, 0], [-6, -10], [6, -10], [12, 0], [6, 10], [-6, 10]]
    const sel = half === 1 ? [[0, -10], [-6, -10], [-12, 0], [-6, 10], [0, 10]] : half === 2 ? [[0, -10], [6, -10], [12, 0], [6, 10], [0, 10]] : pts
    const d = sel.map(([x, y], i) => `${i ? 'L' : 'M'}${(cx + x + (half === 1 ? -off : half === 2 ? off : 0)).toFixed(1)} ${(cy + y).toFixed(1)}`).join(' ') + ' Z'
    return d
  }

  return (
    <div className="border bg-background">
      <svg viewBox="0 0 360 215" className="w-full" fontFamily="Geist, sans-serif">
        {/* substrats libres en solution */}
        {floaters.slice(0, nFloat).map((fl, i) => (
          <path
            key={i}
            d={subShape(fl.x + Math.sin(now * 0.8 + fl.p) * 10, fl.y + Math.cos(now * 0.6 + fl.p * 1.3) * 7)}
            fill="hsl(142 71% 45% / 0.55)"
            stroke="hsl(142 71% 45%)"
            strokeWidth="1"
            opacity={0.8}
            transform={`scale(0.7) translate(${(fl.x + Math.sin(now * 0.8 + fl.p) * 10) * 0.43},${(fl.y + Math.cos(now * 0.6 + fl.p * 1.3) * 7) * 0.43})`}
          />
        ))}
        {/* enzyme */}
        <path d={body} fill={bound ? 'hsl(45 93% 47% / 0.35)' : `color-mix(in srgb, ${col} 28%, transparent)`} stroke={col} strokeWidth="2.5" />
        {bound && <path d={body} fill="none" stroke="hsl(45 93% 47%)" strokeWidth="5" opacity={0.35 + 0.25 * Math.sin(now * 6)} />}
        <text x="180" y="158" textAnchor="middle" fontSize="12" fontWeight="700" className="svg-fill">Enzyme</text>
        <text x="180" y="173" textAnchor="middle" fontSize="9" className="svg-muted">{native < 0.45 ? 'structure détruite' : fp < 0.5 ? 'pH défavorable' : 'structure native'}</text>
        {/* substrat actif */}
        {!dead && showS && split === 0 && (
          <path d={subShape(sx, sy)} fill="hsl(142 71% 45%)" stroke="hsl(142 71% 30%)" strokeWidth="1.5" />
        )}
        {!dead && split > 0 && (
          <g>
            <path d={subShape(sx + (ph === 'release' ? -f * 40 : 0), sy + (ph === 'release' ? -f * 40 : 0), 1, split * 3)} fill="hsl(217 91% 60%)" stroke="hsl(217 91% 40%)" strokeWidth="1.5" />
            <path d={subShape(sx + (ph === 'release' ? f * 40 : 0), sy + (ph === 'release' ? -f * 40 : 0), 2, split * 3)} fill="hsl(25 95% 53%)" stroke="hsl(25 95% 35%)" strokeWidth="1.5" />
          </g>
        )}
        {dead && S >= 0.05 && <path d={subShape(start.x + Math.sin(now * 1.3) * 6, start.y + Math.cos(now * 1.7) * 5)} fill="hsl(142 71% 45%)" stroke="hsl(142 71% 30%)" strokeWidth="1.5" />}
        {/* annotations */}
        <g fontSize="9.5" className="svg-fill">
          <text x="8" y="14" fontWeight="600">Site actif et substrat</text>
          <text x="352" y="210" textAnchor="end" className="svg-muted">
            {bound ? 'complexe enzyme-substrat (ES) → produits' : dead ? (S < 0.05 ? 'pas de substrat' : 'enzyme inactive') : fails && ph !== 'wait' ? 'le substrat ne s’ajuste plus au site actif' : ph === 'wait' ? 'site actif libre : attente d’un substrat' : ph === 'release' ? 'libération des produits' : 'fixation du substrat'}
          </text>
          <g transform="translate(8 192)">
            <path d="M0 0 l5 -6 h8 l5 6 l-5 6 h-8 z" fill="hsl(142 71% 45%)" />
            <text x="24" y="3">substrat</text>
            <path d="M64 0 l5 -6 h5 v12 h-5 z" fill="hsl(217 91% 60%)" />
            <path d="M76 -6 h5 l5 6 l-5 6 h-5 z" fill="hsl(25 95% 53%)" />
            <text x="92" y="3">produits</text>
          </g>
        </g>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Graphiques                                                         */
/* ------------------------------------------------------------------ */

function Chart({ view, e, S, T, pH, E, ft, fp, vmaxRef }: { view: View; e: Enzyme; S: number; T: number; pH: number; E: number; ft: number; fp: number; vmaxRef: number }) {
  const W = 520
  const H = 250
  const m = { l: 46, r: 46, t: 14, b: 38 }
  const xr = view === 'S' ? [0, 50] : view === 'T' ? [0, 100] : [0, 14]
  const yMax = vmaxRef * 1.15
  const sx = (x: number) => m.l + ((x - xr[0]) / (xr[1] - xr[0])) * (W - m.l - m.r)
  const sy = (y: number) => H - m.b - (y / yMax) * (H - m.t - m.b)
  const vAt = (x: number) =>
    view === 'S'
      ? e.vmax * E * ft * fp * mm(x, e.km)
      : view === 'T'
        ? e.vmax * E * fT(x, e) * fp * mm(S, e.km)
        : e.vmax * E * ft * fPH(x, e) * mm(S, e.km)
  const cur = view === 'S' ? S : view === 'T' ? T : pH
  const N = 200
  const path = Array.from({ length: N + 1 }, (_, i) => {
    const x = xr[0] + ((xr[1] - xr[0]) * i) / N
    return `${i ? 'L' : 'M'}${sx(x).toFixed(1)} ${sy(vAt(x)).toFixed(1)}`
  }).join(' ')
  const vmaxEff = e.vmax * E * ft * fp
  const xticks = view === 'S' ? [0, 10, 20, 30, 40, 50] : view === 'T' ? [0, 20, 40, 60, 80, 100] : [0, 2, 4, 6, 8, 10, 12, 14]
  const yticks = [0, 0.25, 0.5, 0.75, 1].map((k) => k * vmaxRef)
  const xlab = view === 'S' ? '[S] (mmol/L)' : view === 'T' ? 'Température (°C)' : 'pH'
  const denat =
    view === 'T'
      ? Array.from({ length: N + 1 }, (_, i) => {
          const x = (100 * i) / N
          const y = H - m.b - (1 - nativeFrac(x, e)) * (H - m.t - m.b)
          return `${i ? 'L' : 'M'}${sx(x).toFixed(1)} ${y.toFixed(1)}`
        }).join(' ')
      : ''
  const vcur = vAt(cur)
  return (
    <div className="border bg-background">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" fontFamily="Geist, sans-serif">
        {yticks.map((y) => (
          <g key={y}>
            <line x1={m.l} x2={W - m.r} y1={sy(y)} y2={sy(y)} className="svg-grid" strokeDasharray={y === 0 ? undefined : '3 3'} />
            <text x={m.l - 6} y={sy(y) + 3} textAnchor="end" fontSize="9" className="svg-muted">{fmt(y, 0)}</text>
          </g>
        ))}
        {xticks.map((x) => (
          <g key={x}>
            <line x1={sx(x)} x2={sx(x)} y1={H - m.b} y2={H - m.b + 4} className="svg-stroke" />
            <text x={sx(x)} y={H - m.b + 15} textAnchor="middle" fontSize="9" className="svg-muted">{x}</text>
          </g>
        ))}
        <line x1={m.l} x2={m.l} y1={m.t} y2={H - m.b} className="svg-stroke" />
        <line x1={m.l} x2={W - m.r} y1={H - m.b} y2={H - m.b} className="svg-stroke" />
        <text x={(m.l + W - m.r) / 2} y={H - 6} textAnchor="middle" fontSize="10" className="svg-fill">{xlab}</text>
        <text x="12" y={(m.t + H - m.b) / 2} fontSize="10" className="svg-fill" transform={`rotate(-90 12 ${(m.t + H - m.b) / 2})`} textAnchor="middle">v (µmol/min)</text>

        {view === 'S' && (
          <g>
            <line x1={m.l} x2={W - m.r} y1={sy(vmaxEff)} y2={sy(vmaxEff)} stroke="hsl(0 84% 60%)" strokeDasharray="5 4" />
            <text x={W - m.r - 4} y={sy(vmaxEff) - 4} textAnchor="end" fontSize="10" fill="hsl(0 84% 60%)">Vmax</text>
            <line x1={m.l} x2={sx(e.km)} y1={sy(vmaxEff / 2)} y2={sy(vmaxEff / 2)} stroke="hsl(25 95% 53%)" strokeDasharray="3 3" />
            <line x1={sx(e.km)} x2={sx(e.km)} y1={sy(vmaxEff / 2)} y2={H - m.b} stroke="hsl(25 95% 53%)" strokeDasharray="3 3" />
            <text x={sx(e.km) + 4} y={H - m.b - 5} fontSize="10" fill="hsl(25 95% 53%)">Km</text>
            <text x={m.l + 4} y={sy(vmaxEff / 2) - 4} fontSize="10" fill="hsl(25 95% 53%)">Vmax/2</text>
          </g>
        )}
        {view === 'T' && (
          <g>
            <path d={denat} fill="none" stroke="hsl(0 84% 60%)" strokeWidth="1.8" strokeDasharray="5 3" />
            <text x={W - m.r + 6} y={m.t + 8} fontSize="9" fill="hsl(0 84% 60%)">100 %</text>
            <text x={W - m.r + 6} y={H - m.b} fontSize="9" fill="hsl(0 84% 60%)">0 %</text>
            <text x={sx(Math.min(92, e.topt + 25))} y={m.t + 28} fontSize="9" fill="hsl(0 84% 60%)" textAnchor="middle">enzyme dénaturée (%)</text>
            <line x1={sx(e.topt)} x2={sx(e.topt)} y1={m.t} y2={H - m.b} className="svg-grid" strokeDasharray="2 3" />
            <text x={sx(e.topt) - 4} y={m.t + 10} textAnchor="end" fontSize="9" className="svg-muted">T opt ≈ {e.topt} °C</text>
          </g>
        )}
        {view === 'pH' && (
          <g>
            <line x1={sx(e.phopt)} x2={sx(e.phopt)} y1={m.t} y2={H - m.b} className="svg-grid" strokeDasharray="2 3" />
            <text x={sx(e.phopt) + 4} y={m.t + 10} fontSize="9" className="svg-muted">pH opt ≈ {fmt(e.phopt, 1)}</text>
          </g>
        )}

        <path d={path} fill="none" stroke="hsl(217 91% 60%)" strokeWidth="2.8" />
        <line x1={sx(cur)} x2={sx(cur)} y1={sy(vcur)} y2={H - m.b} className="svg-stroke" strokeDasharray="2 3" opacity="0.6" />
        <circle cx={sx(cur)} cy={sy(vcur)} r="5.5" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2.2" />
        <text x={sx(cur) + (cur > (xr[0] + xr[1]) / 2 ? -9 : 9)} y={sy(vcur) - 9} textAnchor={cur > (xr[0] + xr[1]) / 2 ? 'end' : 'start'} fontSize="10" fontWeight="700" className="svg-fill">
          v = {fmt(vcur, 1)}
        </text>
      </svg>
    </div>
  )
}
