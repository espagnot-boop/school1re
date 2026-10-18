import { useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { PALETTE } from '@/lib/plot'
import { Tex } from '@/components/Tex'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Select, Label } from '@/components/ui/input'
import { Segmented } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Stat } from '@/components/ui/misc'
import { cn, fmt } from '@/lib/utils'
import { texNum } from './_maths2/util'

interface Props {
  pA?: number
  pBsachantA?: number
  pBsachantNonA?: number
  /** noms des événements (une lettre conseillée) */
  nameA?: string
  nameB?: string
}

type Focus = 'inter' | 'total' | 'inverse'

const PRESETS: { id: string; label: string; pA: number; pBA: number; pBnA: number; ctx?: { A: string; B: string } }[] = [
  { id: 'custom', label: 'Personnalisé', pA: 0.4, pBA: 0.7, pBnA: 0.2 },
  { id: 'depistage', label: 'Test de dépistage', pA: 0.02, pBA: 0.95, pBnA: 0.03, ctx: { A: 'la personne est malade', B: 'le test est positif' } },
  { id: 'usine', label: 'Deux machines', pA: 0.6, pBA: 0.03, pBnA: 0.05, ctx: { A: 'la pièce vient de la machine 1', B: 'la pièce est défectueuse' } },
  { id: 'indep', label: 'Indépendance', pA: 0.3, pBA: 0.5, pBnA: 0.5, ctx: { A: 'on obtient Pile', B: 'le dé donne un nombre pair' } },
]

const p01 = (x: unknown, d: number) => (typeof x === 'number' && Number.isFinite(x) ? Math.min(1, Math.max(0, x)) : d)
const f4 = (x: number) => fmt(x, 4)
const t4 = (x: number) => texNum(x, 4)

export default function ProbabilityTree({ pA: pA0, pBsachantA, pBsachantNonA, nameA = 'A', nameB = 'B' }: Props) {
  const [pA, setPA] = useState(p01(pA0, 0.4))
  const [pBA, setPBA] = useState(p01(pBsachantA, 0.7))
  const [pBnA, setPBnA] = useState(p01(pBsachantNonA, 0.2))
  const [preset, setPreset] = useState('custom')
  const [reversed, setReversed] = useState(false)
  const [focus, setFocus] = useState<Focus>('inverse')
  const [view, setView] = useState<'proba' | 'effectifs'>('proba')
  const N = 1000

  const ctx = PRESETS.find((p) => p.id === preset)?.ctx
  const nA = nameA || 'A'
  const nB = nameB || 'B'
  const tex = (n: string) => (/^[A-Za-z]$/.test(n) ? n : `\\text{${n}}`)
  const TA = tex(nA)
  const TB = tex(nB)
  const TnA = `\\overline{${TA}}`
  const TnB = `\\overline{${TB}}`

  // probabilités
  const pnA = 1 - pA
  const pAB = pA * pBA
  const pAnB = pA * (1 - pBA)
  const pnAB = pnA * pBnA
  const pnAnB = pnA * (1 - pBnA)
  const pB = pAB + pnAB
  const pnB = 1 - pB
  const pAgB = pB > 1e-12 ? pAB / pB : NaN
  const pAgnB = pnB > 1e-12 ? pAnB / pnB : NaN
  const indep = Math.abs(pAB - pA * pB) < 1e-9

  // arbre (direct ou inversé)
  type Node = { name: string; neg: boolean; p: number; children: { name: string; neg: boolean; p: number; joint: number; hit: boolean; key: string }[] }
  const first: Node[] = reversed
    ? [
        { name: nB, neg: false, p: pB, children: [
          { name: nA, neg: false, p: pAgB, joint: pAB, hit: true, key: 'AB' },
          { name: nA, neg: true, p: 1 - pAgB, joint: pnAB, hit: false, key: 'nAB' },
        ] },
        { name: nB, neg: true, p: pnB, children: [
          { name: nA, neg: false, p: pAgnB, joint: pAnB, hit: false, key: 'AnB' },
          { name: nA, neg: true, p: 1 - pAgnB, joint: pnAnB, hit: false, key: 'nAnB' },
        ] },
      ]
    : [
        { name: nA, neg: false, p: pA, children: [
          { name: nB, neg: false, p: pBA, joint: pAB, hit: true, key: 'AB' },
          { name: nB, neg: true, p: 1 - pBA, joint: pAnB, hit: false, key: 'AnB' },
        ] },
        { name: nA, neg: true, p: pnA, children: [
          { name: nB, neg: false, p: pBnA, joint: pnAB, hit: false, key: 'nAB' },
          { name: nB, neg: true, p: 1 - pBnA, joint: pnAnB, hit: false, key: 'nAnB' },
        ] },
      ]

  // feuilles mises en évidence selon la question
  const hot = new Set<string>(focus === 'inter' ? ['AB'] : ['AB', 'nAB'])
  const hotFirst = (i: number) => first[i].children.some((c) => hot.has(c.key))

  const leafLabel = (key: string) => {
    const map: Record<string, [string, boolean, string, boolean]> = {
      AB: [nA, false, nB, false],
      AnB: [nA, false, nB, true],
      nAB: [nA, true, nB, false],
      nAnB: [nA, true, nB, true],
    }
    const [a, na, b, nb] = map[key]
    return reversed ? [b, nb, a, na] as const : [a, na, b, nb] as const
  }

  const W = 560
  const H = 300
  const root = { x: 24, y: H / 2 }
  const l1 = [{ x: 210, y: 78 }, { x: 210, y: 222 }]
  const l2 = [{ x: 380, y: 36 }, { x: 380, y: 120 }, { x: 380, y: 180 }, { x: 380, y: 264 }]
  const ew = (p: number) => 1.2 + 9 * Math.max(0, p)

  const Name = ({ x, y, name, neg, size = 15, anchor = 'middle' }: { x: number; y: number; name: string; neg: boolean; size?: number; anchor?: 'middle' | 'start' }) => (
    <text x={x} y={y} fontSize={size} fontWeight={700} textAnchor={anchor} fill="currentColor" fontFamily="Geist, sans-serif" style={neg ? { textDecoration: 'overline' } : undefined}>
      {name}
    </text>
  )

  const EdgeLabel = ({ x1, y1, x2, y2, p, up }: { x1: number; y1: number; x2: number; y2: number; p: number; up: boolean }) => {
    const mx = (x1 + x2) / 2
    const my = (y1 + y2) / 2 + (up ? -10 : 18)
    return (
      <text x={mx} y={my} fontSize={12} textAnchor="middle" fill="currentColor" fontFamily="Geist Mono, monospace" stroke="hsl(var(--card))" strokeWidth={4} paintOrder="stroke">
        {Number.isFinite(p) ? f4(p) : '—'}
      </text>
    )
  }

  const applyPreset = (id: string) => {
    setPreset(id)
    const p = PRESETS.find((q) => q.id === id)
    if (p && id !== 'custom') {
      setPA(p.pA)
      setPBA(p.pBA)
      setPBnA(p.pBnA)
    }
  }

  const val = (p: number) => (view === 'proba' ? f4(p) : fmt(p * N, 2))

  const cell = (p: number, isHot: boolean, strong = false) => (
    <td className={cn('border px-2 py-1.5 text-right font-mono tabular-nums', isHot && 'bg-[hsl(25_95%_53%/0.15)] font-semibold', strong && 'font-semibold')}>{val(p)}</td>
  )

  const controls = (
    <>
      <div className="flex flex-col gap-1">
        <Label>Situation</Label>
        <Select value={preset} onChange={(e) => applyPreset(e.target.value)}>
          {PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </Select>
      </div>
      <Slider label={<Tex>{`P(${TA})`}</Tex>} value={pA} min={0} max={1} step={0.01} digits={2} onChange={(v) => { setPA(v); setPreset('custom') }} />
      <Slider label={<Tex>{`P_{${TA}}(${TB})`}</Tex>} value={pBA} min={0} max={1} step={0.01} digits={2} onChange={(v) => { setPBA(v); setPreset('custom') }} />
      <Slider label={<Tex>{`P_{${TnA}}(${TB})`}</Tex>} value={pBnA} min={0} max={1} step={0.01} digits={2} onChange={(v) => { setPBnA(v); setPreset('custom') }} />
      <div>
        <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Question</div>
        <Segmented<Focus>
          value={focus}
          onChange={setFocus}
          className="flex w-full [&>button]:flex-1"
          options={[
            { value: 'inter', label: <Tex>{`P(${TA}\\cap ${TB})`}</Tex> },
            { value: 'total', label: <Tex>{`P(${TB})`}</Tex> },
            { value: 'inverse', label: <Tex>{`P_{${TB}}(${TA})`}</Tex> },
          ]}
        />
      </div>
      <Button size="sm" variant={reversed ? 'default' : 'outline'} onClick={() => setReversed((r) => !r)}>
        <ArrowLeftRight /> {reversed ? 'Arbre inversé (B d’abord)' : 'Inverser l’arbre'}
      </Button>
      <div className="grid grid-cols-2 gap-2">
        <Stat label={<Tex>{`P(${TB})`}</Tex>} value={f4(pB)} tone={focus === 'total' ? 'info' : undefined} />
        <Stat label={<Tex>{`P_{${TB}}(${TA})`}</Tex>} value={Number.isFinite(pAgB) ? f4(pAgB) : 'non définie'} tone={focus === 'inverse' ? 'info' : undefined} />
        <Stat label={<Tex>{`P(${TA}\\cap ${TB})`}</Tex>} value={f4(pAB)} tone={focus === 'inter' ? 'info' : undefined} />
        <Stat label={<Tex>{`P_{${TnB}}(${TA})`}</Tex>} value={Number.isFinite(pAgnB) ? f4(pAgnB) : 'non définie'} />
      </div>
    </>
  )

  const interpretation = (() => {
    if (!Number.isFinite(pAgB)) return `P(${nB}) = 0 : on ne peut pas conditionner par ${nB}.`
    const pa = ctx ? `« ${ctx.A} »` : nA
    const pb = ctx ? `« ${ctx.B} »` : nB
    const cmp = indep
      ? `C’est la même valeur que P(${nA}) : ${nA} et ${nB} sont indépendants.`
      : pAgB > pA
        ? `C’est plus que P(${nA}) = ${f4(pA)} : savoir que ${nB} est réalisé rend ${nA} plus probable.`
        : `C’est moins que P(${nA}) = ${f4(pA)} : savoir que ${nB} est réalisé rend ${nA} moins probable.`
    return `Sachant ${pb}, la probabilité de ${pa} vaut ${f4(pAgB)} (soit ${fmt(pAgB * 100, 1)} %). ${cmp}`
  })()

  return (
    <WidgetFrame
      title="Arbre pondéré et probabilités conditionnelles"
      subtitle={ctx ? `${nA} : ${ctx.A} — ${nB} : ${ctx.B}` : 'Réglez les probabilités, choisissez la question, inversez l’arbre'}
      controls={controls}
      footer={<span>{interpretation}</span>}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full border bg-background text-foreground">
        {first.map((n, i) => {
          const a = l1[i]
          const on1 = hotFirst(i)
          return (
            <g key={i}>
              <line x1={root.x + 8} y1={root.y} x2={a.x - 14} y2={a.y} stroke={on1 ? PALETTE.orange : PALETTE.muted} strokeOpacity={on1 ? 0.9 : 0.45} strokeWidth={ew(n.p)} strokeLinecap="butt" />
              <EdgeLabel x1={root.x} y1={root.y} x2={a.x} y2={a.y} p={n.p} up={i === 0} />
              <Name x={a.x} y={a.y + 5} name={n.name} neg={n.neg} />
              {n.children.map((c, j) => {
                const b = l2[i * 2 + j]
                const on = hot.has(c.key)
                const [x1, nx1, x2, nx2] = leafLabel(c.key)
                return (
                  <g key={j}>
                    <line x1={a.x + 14} y1={a.y} x2={b.x - 14} y2={b.y} stroke={on ? PALETTE.orange : PALETTE.muted} strokeOpacity={on ? 0.9 : 0.45} strokeWidth={ew(c.joint)} />
                    <EdgeLabel x1={a.x} y1={a.y} x2={b.x} y2={b.y} p={c.p} up={j === 0} />
                    <Name x={b.x} y={b.y + 5} name={c.name} neg={c.neg} />
                    <g fontFamily="Geist Mono, monospace" fontSize={12}>
                      <text x={b.x + 22} y={b.y + 4} fill="currentColor">
                        <tspan style={nx1 ? { textDecoration: 'overline' } : undefined}>{x1}</tspan>
                        <tspan> ∩ </tspan>
                        <tspan style={nx2 ? { textDecoration: 'overline' } : undefined}>{x2}</tspan>
                        <tspan fill={on ? PALETTE.orange : 'currentColor'} fontWeight={on ? 700 : 400}>
                          {' '}: {val(c.joint)}
                        </tspan>
                      </text>
                    </g>
                  </g>
                )
              })}
            </g>
          )
        })}
        <circle cx={root.x} cy={root.y} r={5} fill="currentColor" />
        <text x={W - 8} y={H - 8} textAnchor="end" fontSize={10} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
          épaisseur des branches ∝ probabilité du chemin {view === 'effectifs' ? `— effectifs sur ${N}` : ''}
        </text>
      </svg>

      <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Tableau croisé</span>
            <Segmented
              value={view}
              onChange={setView}
              options={[
                { value: 'proba', label: 'Probabilités' },
                { value: 'effectifs', label: `Effectifs /${N}` },
              ]}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/40">
                  <th className="border px-2 py-1.5" />
                  <th className="border px-2 py-1.5"><Tex>{TB}</Tex></th>
                  <th className="border px-2 py-1.5"><Tex>{TnB}</Tex></th>
                  <th className="border px-2 py-1.5 text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="border bg-muted/40 px-2 py-1.5"><Tex>{TA}</Tex></th>
                  {cell(pAB, true)}
                  {cell(pAnB, false)}
                  {cell(pA, false, true)}
                </tr>
                <tr>
                  <th className="border bg-muted/40 px-2 py-1.5"><Tex>{TnA}</Tex></th>
                  {cell(pnAB, focus !== 'inter')}
                  {cell(pnAnB, false)}
                  {cell(pnA, false, true)}
                </tr>
                <tr>
                  <th className="border bg-muted/40 px-2 py-1.5 text-muted-foreground">Total</th>
                  {cell(pB, focus !== 'inter', true)}
                  {cell(pnB, false, true)}
                  {cell(1, false, true)}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {indep ? <Badge variant="success">indépendants</Badge> : <Badge variant="outline">non indépendants</Badge>}
            <Tex>{`P(${TA})\\times P(${TB}) = ${t4(pA * pB)} ${indep ? '=' : '\\neq'} P(${TA}\\cap ${TB})`}</Tex>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-1.5 text-sm">
          <div className={cn('overflow-x-auto border px-3 py-1.5', focus === 'inter' ? 'border-foreground/40 bg-muted/60' : 'bg-background')}>
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Intersection (on multiplie le long d’un chemin)</div>
            <Tex>{`P(${TA}\\cap ${TB}) = P(${TA})\\times P_{${TA}}(${TB}) = ${t4(pA)}\\times ${t4(pBA)} = ${t4(pAB)}`}</Tex>
          </div>
          <div className={cn('overflow-x-auto border px-3 py-1.5', focus === 'total' ? 'border-foreground/40 bg-muted/60' : 'bg-background')}>
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Probabilités totales (partition {nA}, non {nA})</div>
            <Tex>{`P(${TB}) = P(${TA}\\cap ${TB}) + P(${TnA}\\cap ${TB}) = ${t4(pA)}\\times ${t4(pBA)} + ${t4(pnA)}\\times ${t4(pBnA)} = ${t4(pB)}`}</Tex>
          </div>
          <div className={cn('overflow-x-auto border px-3 py-1.5', focus === 'inverse' ? 'border-foreground/40 bg-muted/60' : 'bg-background')}>
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Inversion du conditionnement</div>
            <Tex>{Number.isFinite(pAgB) ? `P_{${TB}}(${TA}) = \\dfrac{P(${TA}\\cap ${TB})}{P(${TB})} = \\dfrac{${t4(pAB)}}{${t4(pB)}} \\approx ${t4(pAgB)}` : `P(${TB}) = 0 \\Rightarrow P_{${TB}}(${TA}) \\text{ non définie}`}</Tex>
          </div>
        </div>
      </div>
    </WidgetFrame>
  )
}
