import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Button } from '@/components/ui/button'
import { Stat } from '@/components/ui/misc'
import { cn } from '@/lib/utils'

/* Un vecteur de nombres décrit l'état de la cellule à chaque étape ;
   on interpole entre deux étapes pour animer la transition. */

const BLUE = 'hsl(217 91% 60%)'
const RED = 'hsl(0 84% 60%)'
const CHROM_COLORS = [BLUE, RED, BLUE, RED]
const CHROM_LEN = [42, 42, 26, 26]
const PLATE_Y = [76, 118, 158, 190]

// indices du vecteur
const I = { cond: 0, rep: 1, env: 2, nucR: 3, spindle: 4, cent: 5, centY: 6, cdup: 7, rx: 8, furrow: 9, sep: 10, env2: 11, ch: 12 } as const

function vec(p: {
  cond: number; rep: number; env: number; nucR: number; spindle: number; cent: number; centY: number; cdup: number
  rx: number; furrow: number; sep: number; env2: number
  ch: [number, number, number][]
}): number[] {
  return [p.cond, p.rep, p.env, p.nucR, p.spindle, p.cent, p.centY, p.cdup, p.rx, p.furrow, p.sep, p.env2, ...p.ch.flat()]
}

const INTER: [number, number, number][] = [[172, 108, 15], [228, 112, -20], [178, 164, 40], [226, 166, -45]]
const PROPH: [number, number, number][] = [[170, 104, 25], [230, 108, -30], [176, 168, 55], [228, 170, -60]]
const PROMETA: [number, number, number][] = [[180, 100, 70], [222, 120, -60], [190, 170, 80], [214, 154, 20]]
const PLATE: [number, number, number][] = PLATE_Y.map((y) => [200, y, 0])

interface StageInfo {
  key: string
  short: string
  title: string
  group: 'Interphase' | 'Mitose'
  weight: number
  text: string
  events: string[]
  chromosomes: string
  chromatids: string
  dna: string
  dnaValue: number
  dnaX: number
  state: number[]
}

const STAGES: StageInfo[] = [
  {
    key: 'G1', short: 'G1', title: 'Phase G1 (interphase)', group: 'Interphase', weight: 26,
    text: 'La cellule croît et assure son métabolisme. Le noyau est intact, la chromatine est décondensée : chaque chromosome est formé d’une seule chromatide (une molécule d’ADN).',
    events: ['Chromatine décondensée, expression des gènes active', 'Un seul centrosome', 'Phase la plus variable en durée (ou G0 si la cellule ne se divise plus)'],
    chromosomes: '4 (2n = 4)', chromatids: '1 chromatide', dna: '2Q', dnaValue: 2, dnaX: 0.5,
    state: vec({ cond: 0.05, rep: 0, env: 1, nucR: 74, spindle: 0, cent: 0, centY: 50, cdup: 0, rx: 100, furrow: 0, sep: 0, env2: 0, ch: INTER }),
  },
  {
    key: 'S', short: 'S', title: 'Phase S : réplication de l’ADN', group: 'Interphase', weight: 20,
    text: 'L’ADN est répliqué de façon semi-conservative : chaque molécule d’ADN donne deux molécules identiques. Chaque chromosome passe de une à deux chromatides sœurs.',
    events: ['Réplication semi-conservative', 'La quantité d’ADN double (2Q → 4Q)', 'Le centrosome commence à se dupliquer'],
    chromosomes: '4 (2n = 4)', chromatids: '1 → 2 chromatides', dna: '2Q → 4Q', dnaValue: 3, dnaX: 1.5,
    state: vec({ cond: 0.1, rep: 0.55, env: 1, nucR: 74, spindle: 0, cent: 0, centY: 50, cdup: 0.6, rx: 102, furrow: 0, sep: 0, env2: 0, ch: INTER }),
  },
  {
    key: 'G2', short: 'G2', title: 'Phase G2 (interphase)', group: 'Interphase', weight: 12,
    text: 'La réplication est terminée : chaque chromosome possède deux chromatides sœurs identiques, encore décondensées. La cellule vérifie l’ADN et se prépare à la mitose.',
    events: ['ADN entièrement répliqué', 'Deux centrosomes côte à côte', 'Contrôle de l’intégrité de l’ADN avant la mitose'],
    chromosomes: '4 (2n = 4)', chromatids: '2 chromatides sœurs', dna: '4Q', dnaValue: 4, dnaX: 2.5,
    state: vec({ cond: 0.2, rep: 1, env: 1, nucR: 74, spindle: 0, cent: 7, centY: 50, cdup: 1, rx: 105, furrow: 0, sep: 0, env2: 0, ch: INTER }),
  },
  {
    key: 'P', short: 'Pro', title: 'Prophase', group: 'Mitose', weight: 7,
    text: 'La chromatine se condense : les chromosomes deviennent visibles, formés de deux chromatides jointes au niveau du centromère. Les centrosomes migrent vers les pôles et le fuseau se met en place.',
    events: ['Condensation des chromosomes', 'Centrosomes vers les pôles, début du fuseau', 'Enveloppe nucléaire en cours de disparition'],
    chromosomes: '4 (2n = 4)', chromatids: '2 chromatides sœurs', dna: '4Q', dnaValue: 4, dnaX: 3.5,
    state: vec({ cond: 0.65, rep: 1, env: 0.55, nucR: 76, spindle: 0.35, cent: 55, centY: 72, cdup: 1, rx: 108, furrow: 0, sep: 0, env2: 0, ch: PROPH }),
  },
  {
    key: 'PM', short: 'Prom.', title: 'Prométaphase', group: 'Mitose', weight: 7,
    text: 'L’enveloppe nucléaire a disparu. Les microtubules du fuseau s’attachent aux centromères des chromosomes qui se déplacent vers le centre de la cellule.',
    events: ['Rupture de l’enveloppe nucléaire', 'Fixation des microtubules sur les centromères', 'Les chromosomes sont ballottés vers le plan équatorial'],
    chromosomes: '4 (2n = 4)', chromatids: '2 chromatides sœurs', dna: '4Q', dnaValue: 4, dnaX: 4.5,
    state: vec({ cond: 1, rep: 1, env: 0, nucR: 80, spindle: 1, cent: 100, centY: 118, cdup: 1, rx: 108, furrow: 0, sep: 0, env2: 0, ch: PROMETA }),
  },
  {
    key: 'M', short: 'Méta.', title: 'Métaphase', group: 'Mitose', weight: 7,
    text: 'Les chromosomes, au maximum de leur condensation, s’alignent sur le plan équatorial de la cellule. C’est le moment idéal pour dresser un caryotype : on compte et on observe les chromosomes.',
    events: ['Chromosomes alignés sur la plaque équatoriale', 'Chaque chromatide est reliée à un pôle différent', 'Point de contrôle du fuseau'],
    chromosomes: '4 (2n = 4)', chromatids: '2 chromatides sœurs', dna: '4Q', dnaValue: 4, dnaX: 5.5,
    state: vec({ cond: 1, rep: 1, env: 0, nucR: 80, spindle: 1, cent: 105, centY: 134, cdup: 1, rx: 110, furrow: 0, sep: 0, env2: 0, ch: PLATE }),
  },
  {
    key: 'A', short: 'Ana.', title: 'Anaphase', group: 'Mitose', weight: 7,
    text: 'Les centromères se divisent : les deux chromatides de chaque chromosome se séparent et migrent vers des pôles opposés. Chaque pôle reçoit un lot complet d’information génétique identique.',
    events: ['Séparation des chromatides sœurs', 'Raccourcissement des microtubules, allongement de la cellule', 'Chaque pôle reçoit 4 chromosomes à une chromatide'],
    chromosomes: '8 (4 vers chaque pôle)', chromatids: '1 chromatide', dna: '4Q (dans la cellule)', dnaValue: 4, dnaX: 6.5,
    state: vec({ cond: 1, rep: 1, env: 0, nucR: 80, spindle: 1, cent: 125, centY: 134, cdup: 1, rx: 135, furrow: 0.1, sep: 52, env2: 0, ch: PLATE }),
  },
  {
    key: 'T', short: 'Télo.', title: 'Télophase et cytocinèse', group: 'Mitose', weight: 14,
    text: 'Aux deux pôles, les chromosomes se décondensent et une enveloppe nucléaire se reforme. La cytocinèse étrangle la cellule (anneau d’actine chez les animaux) : deux cellules filles génétiquement identiques.',
    events: ['Reformation de deux noyaux', 'Décondensation des chromosomes', 'Cytocinèse : deux cellules filles identiques à la cellule mère'],
    chromosomes: '4 par cellule fille', chromatids: '1 chromatide', dna: '2Q par cellule fille', dnaValue: 2, dnaX: 7.7,
    state: vec({ cond: 0.4, rep: 1, env: 0, nucR: 80, spindle: 0.15, cent: 130, centY: 134, cdup: 1, rx: 150, furrow: 1, sep: 88, env2: 1, ch: PLATE }),
  },
]

const lerpVec = (a: number[], b: number[], t: number) => a.map((v, i) => v + (b[i] - v) * t)
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

export default function MitosisStages() {
  const [stage, setStage] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [v, setV] = useState<number[]>(STAGES[0].state)
  const vRef = useRef<number[]>(STAGES[0].state)
  const raf = useRef(0)

  useEffect(() => {
    const from = vRef.current
    const to = STAGES[stage].state
    const t0 = performance.now()
    const D = 900
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / D)
      const cur = lerpVec(from, to, ease(t))
      vRef.current = cur
      setV(cur)
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [stage])

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setStage((s) => (s + 1) % STAGES.length), 3200)
    return () => clearInterval(id)
  }, [playing])

  const st = STAGES[stage]
  const goto = (i: number) => {
    setPlaying(false)
    setStage((i + STAGES.length) % STAGES.length)
  }

  return (
    <WidgetFrame
      title="Cycle cellulaire et mitose"
      subtitle="Cellule animale à 2n = 4 : une paire de grands chromosomes et une paire de petits (bleu : origine maternelle, rouge : paternelle)"
      controls={
        <>
          <div className="flex flex-col gap-2">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Étape</div>
            <div className="grid grid-cols-2 gap-1.5">
              {STAGES.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => goto(i)}
                  className={cn('border px-2 py-1.5 text-left text-xs font-medium transition-colors', i === stage ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent')}
                >
                  <span className="mr-1 font-mono opacity-60">{i + 1}</span>
                  {s.title.split(' (')[0].split(' :')[0].replace(' et cytocinèse', '')}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => goto(stage - 1)} aria-label="Étape précédente">
              <ChevronLeft />
            </Button>
            <Button size="sm" className="flex-1" onClick={() => setPlaying((p) => !p)}>
              {playing ? <Pause /> : <Play />} {playing ? 'Pause' : 'Lecture'}
            </Button>
            <Button size="sm" variant="outline" onClick={() => goto(stage + 1)} aria-label="Étape suivante">
              <ChevronRight />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Stat label="Chromosomes" value={st.chromosomes} />
            <Stat label="Chromatides par chromosome" value={st.chromatids} />
            <Stat label="ADN par cellule" value={st.dna} tone={st.dnaValue === 4 ? 'warning' : 'info'} />
          </div>
        </>
      }
      footer={
        <div className="text-xs leading-relaxed">
          <b>Conservation du caryotype :</b> la réplication (phase S) double la quantité d’ADN, la mitose la répartit à l’identique. Les deux cellules filles ont le même nombre de chromosomes (2n) et la même
          information génétique que la cellule mère, à l’exception de rares erreurs de réplication (mutations).
        </div>
      }
    >
      <div className="space-y-3">
        <div className="border bg-background">
          <svg viewBox="0 0 400 260" className="w-full" fontFamily="Geist, sans-serif">
            <CellScene v={v} />
            <text x="8" y="16" fontSize="12" fontWeight="700" className="svg-fill">{st.title}</text>
          </svg>
        </div>

        <div className="border bg-muted/20 p-3">
          <div className="mb-1 flex items-center gap-2">
            <span className={cn('px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider', st.group === 'Mitose' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>{st.group}</span>
            <span className="text-sm font-semibold">{st.title}</span>
          </div>
          <p className="text-sm leading-relaxed">{st.text}</p>
          <ul className="mt-2 list-disc space-y-0.5 pl-5 text-xs text-muted-foreground">
            {st.events.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <CycleRing stage={stage} onPick={goto} />
          <DnaChart stage={stage} />
        </div>
      </div>
    </WidgetFrame>
  )
}

function wigglePath(L: number, amp: number, phase: number) {
  const n = 28
  const pts: string[] = []
  for (let i = 0; i <= n; i++) {
    const f = i / n
    const x = amp * Math.sin(f * Math.PI * 2 * 3.5 + phase)
    const y = -L / 2 + L * f
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return pts.join(' ')
}

function CellScene({ v }: { v: number[] }) {
  const cond = v[I.cond]
  const rep = v[I.rep]
  const rx = v[I.rx]
  const furrow = v[I.furrow]
  const sep = v[I.sep]
  const cent = v[I.cent]
  const centY = v[I.centY]
  const cdup = v[I.cdup]
  const spindle = v[I.spindle]
  const cx = 200
  const cy = 134
  const ry = 98

  const outline = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 90; i++) {
      const t = (i / 90) * Math.PI * 2
      const x = cx + rx * Math.cos(t)
      const pinch = 1 - furrow * 0.88 * Math.exp(-Math.pow((x - cx) / (rx * 0.2), 2))
      const y = cy + ry * Math.sin(t) * pinch
      pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
    }
    return pts.join(' ') + ' Z'
  }, [rx, furrow])

  const wAmp = (1 - cond) * 5.5
  const gap = 1.6 + cond * 2.1
  const width = 1.4 + cond * 4.2

  const chromatids: { key: string; x: number; y: number; rot: number; L: number; color: string; op: number; k: number; c: number }[] = []
  for (let c = 0; c < 4; c++) {
    const bx = v[I.ch + c * 3]
    const by = v[I.ch + c * 3 + 1]
    const br = v[I.ch + c * 3 + 2]
    for (let k = 0; k < 2; k++) {
      const s = k === 0 ? -1 : 1
      const rr = (br * Math.PI) / 180
      const lx = s * gap
      const x = bx + lx * Math.cos(rr) + s * sep
      const y = by + lx * Math.sin(rr)
      chromatids.push({ key: `${c}-${k}`, x, y, rot: br, L: CHROM_LEN[c], color: CHROM_COLORS[c], op: k === 0 ? 1 : rep, k, c })
    }
  }

  const poles = [
    { x: cx - cent, y: centY },
    { x: cx + cent, y: centY },
  ]

  return (
    <g>
      <path d={outline} fill="hsl(var(--muted) / 0.35)" stroke="hsl(var(--foreground))" strokeWidth="2" />

      {v[I.env] > 0.02 && (
        <circle cx={cx} cy={cy} r={v[I.nucR]} fill="hsl(263 70% 60% / 0.08)" stroke="hsl(263 70% 60%)" strokeWidth="2" strokeDasharray={v[I.env] < 0.95 ? '5 4' : undefined} opacity={v[I.env]} />
      )}
      {v[I.env2] > 0.02 &&
        [-1, 1].map((s) => (
          <ellipse key={s} cx={cx + s * sep} cy={cy} rx="30" ry={86} fill="hsl(263 70% 60% / 0.08)" stroke="hsl(263 70% 60%)" strokeWidth="2" opacity={v[I.env2]} />
        ))}

      {spindle > 0.02 && (
        <g opacity={spindle} stroke="hsl(var(--muted-foreground))" strokeWidth="0.8">
          {chromatids.map((ch, i) => {
            const p = poles[ch.k]
            return ch.op > 0.5 ? <line key={ch.key + i} x1={p.x} y1={p.y} x2={ch.x} y2={ch.y} /> : null
          })}
          <line x1={poles[0].x} y1={poles[0].y} x2={poles[1].x} y2={poles[1].y} strokeDasharray="2 3" opacity="0.6" />
        </g>
      )}

      {chromatids.map((ch) => (
        <g key={ch.key} transform={`translate(${ch.x.toFixed(2)} ${ch.y.toFixed(2)}) rotate(${ch.rot.toFixed(1)})`} opacity={ch.op}>
          <path d={wigglePath(ch.L, wAmp, ch.c * 1.7 + ch.k * 2.2)} fill="none" stroke={ch.color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      {cond > 0.35 &&
        [0, 1, 2, 3].map((c) => {
          const bx = v[I.ch + c * 3]
          const by = v[I.ch + c * 3 + 1]
          if (sep > 4) {
            return [-1, 1].map((s) => (
              <circle key={`${c}${s}`} cx={bx + s * sep} cy={by} r="2.2" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1" opacity={cond} />
            ))
          }
          return <circle key={c} cx={bx} cy={by} r={rep > 0.5 ? 3.2 : 2.2} fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1.2" opacity={Math.min(1, (cond - 0.35) * 2)} />
        })}

      {poles.map((p, i) => {
        const op = i === 0 ? 1 : cdup
        return (
          <g key={i} transform={`translate(${p.x} ${p.y})`} opacity={op}>
            {spindle > 0.05 &&
              [0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <line key={a} x1="0" y1="0" x2={9 * Math.cos((a * Math.PI) / 180)} y2={9 * Math.sin((a * Math.PI) / 180)} stroke="hsl(25 95% 53%)" strokeWidth="0.8" />
              ))}
            <rect x="-4" y="-2" width="8" height="3" fill="hsl(25 95% 53%)" />
            <rect x="-1.5" y="1" width="3" height="7" fill="hsl(25 95% 53%)" opacity="0.7" />
          </g>
        )
      })}

      <g fontSize="9" className="svg-muted" transform="translate(8 247)">
        <circle cx="4" cy="4" r="3.5" fill="hsl(25 95% 53%)" />
        <text x="12" y="7">centrosome</text>
        <line x1="72" x2="84" y1="4" y2="4" stroke="hsl(var(--muted-foreground))" />
        <text x="88" y="7">microtubules (fuseau)</text>
        <circle cx="196" cy="4" r="3" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" />
        <text x="204" y="7">centromère</text>
        <circle cx="262" cy="4" r="3.5" fill="none" stroke="hsl(263 70% 60%)" strokeWidth="1.5" />
        <text x="270" y="7">noyau</text>
      </g>
    </g>
  )
}

function CycleRing({ stage, onPick }: { stage: number; onPick: (i: number) => void }) {
  const total = STAGES.reduce((a, s) => a + s.weight, 0)
  const R = 62
  const r = 40
  let a0 = -Math.PI / 2
  const arcs = STAGES.map((s, i) => {
    const a1 = a0 + (s.weight / total) * Math.PI * 2
    const gapA = 0.02
    const p = (rad: number, a: number) => [100 + rad * Math.cos(a), 100 + rad * Math.sin(a)]
    const [x0, y0] = p(R, a0 + gapA)
    const [x1, y1] = p(R, a1 - gapA)
    const [x2, y2] = p(r, a1 - gapA)
    const [x3, y3] = p(r, a0 + gapA)
    const large = a1 - a0 > Math.PI ? 1 : 0
    const d = `M${x0} ${y0} A${R} ${R} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${r} ${r} 0 ${large} 0 ${x3} ${y3} Z`
    const mid = (a0 + a1) / 2
    const [lx, ly] = p((R + r) / 2, mid)
    a0 = a1
    return { d, lx, ly, s, i }
  })
  return (
    <div className="border bg-background p-2">
      <div className="mb-1 text-xs font-semibold">Cycle cellulaire (durées non à l’échelle)</div>
      <svg viewBox="0 0 200 200" className="mx-auto w-full max-w-[220px]" fontFamily="Geist, sans-serif">
        {arcs.map(({ d, lx, ly, s, i }) => (
          <g key={s.key} onClick={() => onPick(i)} className="cursor-pointer">
            <path d={d} fill={i === stage ? 'hsl(var(--primary))' : s.group === 'Mitose' ? 'hsl(263 70% 60% / 0.28)' : 'hsl(var(--muted))'} stroke="hsl(var(--border))" />
            <text x={lx} y={ly + 3} textAnchor="middle" fontSize="8.5" fontWeight="600" fill={i === stage ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))'}>
              {s.short}
            </text>
          </g>
        ))}
        <text x="100" y="94" textAnchor="middle" fontSize="9" className="svg-muted">Interphase</text>
        <text x="100" y="105" textAnchor="middle" fontSize="9" className="svg-muted">≈ 90 % du cycle</text>
        <text x="100" y="118" textAnchor="middle" fontSize="9" fill="hsl(263 70% 60%)">Mitose ≈ 1 h</text>
      </svg>
    </div>
  )
}

function dnaAt(x: number) {
  if (x < 1) return 2
  if (x < 2) return 2 + (x - 1) * 2
  if (x < 7) return 4
  if (x < 7.6) return 4 - ((x - 7) / 0.6) * 2
  return 2
}

function DnaChart({ stage }: { stage: number }) {
  const W = 260
  const H = 150
  const m = { l: 34, r: 8, t: 10, b: 26 }
  const sx = (x: number) => m.l + (x / 8) * (W - m.l - m.r)
  const sy = (y: number) => H - m.b - (y / 4.5) * (H - m.t - m.b)
  const pts: string[] = []
  for (let x = 0; x <= 8.001; x += 0.05) pts.push(`${x === 0 ? 'M' : 'L'}${sx(x).toFixed(1)} ${sy(dnaAt(x)).toFixed(1)}`)
  const st = STAGES[stage]
  return (
    <div className="border bg-background p-2">
      <div className="mb-1 text-xs font-semibold">Quantité d’ADN par cellule au cours du cycle</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" fontFamily="Geist, sans-serif">
        {[2, 4].map((y) => (
          <g key={y}>
            <line x1={m.l} x2={W - m.r} y1={sy(y)} y2={sy(y)} className="svg-grid" strokeDasharray="3 3" />
            <text x={m.l - 5} y={sy(y) + 3} textAnchor="end" fontSize="9" className="svg-muted">{y}Q</text>
          </g>
        ))}
        <line x1={m.l} x2={m.l} y1={m.t} y2={H - m.b} className="svg-stroke" />
        <line x1={m.l} x2={W - m.r} y1={H - m.b} y2={H - m.b} className="svg-stroke" />
        {STAGES.map((s, i) => (
          <text key={s.key} x={sx(i + 0.5)} y={H - m.b + 11} textAnchor="middle" fontSize="7.5" fontWeight={i === stage ? 700 : 400} className="svg-muted">
            {s.short}
          </text>
        ))}
        <rect x={sx(3)} y={m.t} width={sx(8) - sx(3)} height={H - m.t - m.b} fill="hsl(263 70% 60% / 0.07)" />
        <text x={sx(5.5)} y={m.t + 9} textAnchor="middle" fontSize="8" fill="hsl(263 70% 60%)">mitose</text>
        <path d={pts.join(' ')} fill="none" stroke="hsl(217 91% 60%)" strokeWidth="2.5" />
        <circle cx={sx(st.dnaX)} cy={sy(st.dnaValue)} r="5" fill="hsl(var(--background))" stroke="hsl(0 84% 60%)" strokeWidth="2.5" />
        <text x={sx(1.5)} y={sy(3) + 14} textAnchor="middle" fontSize="8" className="svg-muted">réplication</text>
        <text x={sx(7.4)} y={sy(4) - 6} textAnchor="middle" fontSize="8" className="svg-muted">partage</text>
      </svg>
      <div className="text-[11px] text-muted-foreground">Q = quantité d’ADN d’un lot haploïde de chromosomes à une chromatide ; une cellule diploïde en G1 contient 2Q.</div>
    </div>
  )
}
