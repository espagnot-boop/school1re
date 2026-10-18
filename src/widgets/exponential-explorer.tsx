import { useMemo, useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/input'
import { Segmented } from '@/components/ui/tabs'
import { Stat, Switch } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { Plot, FunctionPath, Line, Point, Segment, PALETTE } from '@/lib/plot'
import { fmt } from '@/lib/utils'
import { texNum } from './_maths1/expr'
import { Handle, Interpretation, PlotText, snap } from './_maths1/ui'

interface Props {
  k?: number
  a?: number
  tab?: 'courbe' | 'proprietes' | 'euler'
  title?: string
}

type Tab = 'courbe' | 'proprietes' | 'euler'
const W = 560
const H = 360
const STEPS = ['1', '0.5', '0.25', '0.1', '0.05', '0.01'] as const
const par = (v: number, d = 2) => (v < 0 ? `\\left(${texNum(v, d)}\\right)` : texNum(v, d))
/** k·x en LaTeX (k = 1 -> x, k = -1 -> -x) */
const kx = (k: number, v = 'x') => (Math.abs(k - 1) < 1e-9 ? v : Math.abs(k + 1) < 1e-9 ? `-${v}` : Math.abs(k) < 1e-9 ? '0' : `${texNum(k, 2)}${v}`)
const ek = (k: number) => (Math.abs(k) < 1e-9 ? '1' : `\\mathrm{e}^{${kx(k)}}`)

export default function ExponentialExplorer({ k: k0 = 1, a: a0 = 0.5, tab: tab0 = 'courbe', title }: Props) {
  const [tab, setTab] = useState<Tab>(tab0)
  const [k, setK] = useState(k0)
  const [a, setA] = useState(a0)
  const [showRef, setShowRef] = useState(true)
  // propriétés
  const [pa, setPa] = useState(1.2)
  const [pb, setPb] = useState(0.5)
  const [pn, setPn] = useState(2)
  // Euler
  const [hs, setHs] = useState<(typeof STEPS)[number]>('0.25')
  const h = parseFloat(hs)

  const kLo = Math.min(-3, Math.floor(k0))
  const kHi = Math.max(3, Math.ceil(k0))

  return (
    <WidgetFrame
      title={title ?? 'La fonction exponentielle'}
      subtitle="Courbes eᵏˣ et tangentes, propriétés algébriques, méthode d’Euler"
      footer={
        <Interpretation>
          {tab === 'courbe' ? <CourbeText k={k} a={a} /> : tab === 'proprietes' ? <PropText a={pa} b={pb} /> : <EulerText k={k} h={h} />}
        </Interpretation>
      }
      controls={
        <>
          <Segmented
            value={tab}
            onChange={setTab}
            options={[
              { value: 'courbe', label: 'Courbe' },
              { value: 'proprietes', label: 'Propriétés' },
              { value: 'euler', label: 'Euler' },
            ]}
          />
          {tab !== 'proprietes' && <Slider label={<Tex>k</Tex>} value={k} min={kLo} max={kHi} step={0.1} digits={2} onChange={setK} />}
          {tab === 'courbe' && (
            <>
              <Slider label={<span>abscisse <Tex>a</Tex> du point A</span>} value={a} min={-3} max={3} step={0.01} digits={2} onChange={setA} />
              <Switch checked={showRef} onChange={setShowRef} label={<span>Afficher la courbe de <Tex>{'\\mathrm{e}^x'}</Tex></span>} />
            </>
          )}
          {tab === 'proprietes' && (
            <>
              <Slider label={<Tex>a</Tex>} value={pa} min={-2} max={2} step={0.1} digits={1} onChange={setPa} />
              <Slider label={<Tex>b</Tex>} value={pb} min={-2} max={2} step={0.1} digits={1} onChange={setPb} />
              <Slider label={<span>entier <Tex>n</Tex></span>} value={pn} min={-3} max={3} step={1} digits={0} onChange={(v) => setPn(Math.round(v))} />
            </>
          )}
          {tab === 'euler' && (
            <div className="flex flex-col gap-2">
              <Label>Pas h</Label>
              <Segmented value={hs} onChange={setHs} options={STEPS.map((s) => ({ value: s, label: s.replace('.', ',') }))} />
            </div>
          )}
        </>
      }
    >
      {tab === 'courbe' && <Courbe k={k} a={a} setA={setA} showRef={showRef} />}
      {tab === 'proprietes' && <Props_ a={pa} b={pb} n={pn} />}
      {tab === 'euler' && <Euler k={k} h={h} />}
    </WidgetFrame>
  )
}

/* ------------------------------ Courbe ------------------------------ */

function Courbe({ k, a, setA, showRef }: { k: number; a: number; setA: (v: number) => void; showRef: boolean }) {
  const f = (x: number) => Math.exp(k * x)
  const fa = f(a)
  const m = k * fa
  const x0 = Math.abs(k) > 1e-9 ? a - 1 / k : NaN // intersection tangente / axe des abscisses
  const view = { xMin: -4, xMax: 4, yMin: -1.5, yMax: 7.5 }
  return (
    <>
      <Plot {...view} width={W} height={H} onPointer={(x) => setA(snap(Math.max(-3, Math.min(3, x)), 0.01))}>
        {showRef && Math.abs(k - 1) > 1e-9 && <FunctionPath f={Math.exp} color={PALETTE.muted} width={1.5} dashed />}
        <FunctionPath f={f} color={PALETTE.blue} width={2.5} />
        <Line m={m} p={fa - m * a} color={PALETTE.red} width={1.5} />
        {Number.isFinite(x0) && x0 > view.xMin && x0 < view.xMax && (
          <>
            <Segment x1={a} y1={0} x2={a} y2={fa} color={PALETTE.muted} width={1} dashed />
            <Segment x1={x0} y1={0} x2={a} y2={0} color={PALETTE.orange} width={3} />
            <Point x={x0} y={0} color={PALETTE.orange} r={3.5} />
            <PlotText x={(x0 + a) / 2} y={0} dy={16} anchor="middle" color={PALETTE.orange} size={10}>
              {`1/|k| = ${fmt(1 / Math.abs(k), 2)}`}
            </PlotText>
          </>
        )}
        <Point x={0} y={1} color={PALETTE.green} r={3.5} label="(0 ; 1)" dx={-48} dy={-6} />
        <Handle x={a} y={fa} color={PALETTE.orange} label="A" />
      </Plot>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="f(a) = e^(ka)" value={fmt(fa, 4)} />
        <Stat label="f′(a) = k·e^(ka)" value={fmt(m, 4)} tone="destructive" />
        <Stat label="f′(a) / f(a)" value={fmt(k, 2)} tone="info" />
        <Stat label="Tangente ∩ (Ox)" value={Number.isFinite(x0) ? `x = ${fmt(x0, 3)}` : 'aucune'} />
      </div>
      <div className="mt-3 flex flex-col gap-1.5 overflow-x-auto border bg-muted/20 p-3 text-sm">
        <Tex>{`f(x) = ${ek(k)}, \\qquad f'(x) = ${Math.abs(k) < 1e-9 ? '0' : `${Math.abs(k - 1) < 1e-9 ? '' : texNum(k, 2)}\\,${ek(k)}`}`}</Tex>
        <Tex>{`T_A : y = f'(a)(x - a) + f(a) = ${texNum(m, 3)}\\left(x ${a < 0 ? '+' : '-'} ${texNum(Math.abs(a), 2)}\\right) + ${texNum(fa, 3)}`}</Tex>
        <Tex>{`\\text{En } 0 : \\; f(0) = 1, \\; f'(0) = ${texNum(k, 2)} \\;\\Rightarrow\\; y = ${Math.abs(k) < 1e-9 ? '1' : `${kx(k)} + 1`}`}</Tex>
      </div>
    </>
  )
}

function CourbeText({ k, a }: { k: number; a: number }) {
  if (Math.abs(k) < 1e-9) return <>Avec <Tex>k = 0</Tex>, <Tex>{'\\mathrm{e}^{0} = 1'}</Tex> : la fonction est constante, toutes ses tangentes sont horizontales.</>
  return (
    <>
      La dérivée de <Tex>{'x \\mapsto \\mathrm{e}^{kx}'}</Tex> est <Tex>{'k\\,\\mathrm{e}^{kx}'}</Tex> : en chaque point, la pente de la tangente vaut <Tex>k</Tex> fois l’ordonnée (
      <Tex>{`f'(${texNum(a, 2)}) = ${texNum(k, 2)} \\times ${texNum(Math.exp(k * a), 3)}`}</Tex>). La fonction est {k > 0 ? 'strictement croissante' : 'strictement décroissante'}, toujours
      strictement positive, et chaque tangente coupe l’axe des abscisses à la distance constante <Tex>{`\\frac{1}{|k|} = ${texNum(1 / Math.abs(k), 2)}`}</Tex> du pied de A.
    </>
  )
}

/* ---------------------------- Propriétés ---------------------------- */

function Props_({ a, b, n }: { a: number; b: number; n: number }) {
  const ea = Math.exp(a)
  const eb = Math.exp(b)
  const rows: { tex: string; lhs: number; rhs: number; name: string }[] = [
    { name: 'Somme → produit', tex: `\\mathrm{e}^{a+b} = \\mathrm{e}^{a} \\times \\mathrm{e}^{b} \\quad : \\quad \\mathrm{e}^{${texNum(a + b, 1)}} = ${texNum(ea, 4)} \\times ${texNum(eb, 4)}`, lhs: Math.exp(a + b), rhs: ea * eb },
    { name: 'Différence → quotient', tex: `\\mathrm{e}^{a-b} = \\dfrac{\\mathrm{e}^{a}}{\\mathrm{e}^{b}} \\quad : \\quad \\mathrm{e}^{${texNum(a - b, 1)}} = \\dfrac{${texNum(ea, 4)}}{${texNum(eb, 4)}}`, lhs: Math.exp(a - b), rhs: ea / eb },
    { name: 'Inverse', tex: `\\mathrm{e}^{-a} = \\dfrac{1}{\\mathrm{e}^{a}} \\quad : \\quad \\mathrm{e}^{${texNum(-a, 1)}} = \\dfrac{1}{${texNum(ea, 4)}}`, lhs: Math.exp(-a), rhs: 1 / ea },
    { name: 'Puissance', tex: `\\left(\\mathrm{e}^{a}\\right)^{n} = \\mathrm{e}^{na} \\quad : \\quad ${texNum(ea, 4)}^{${n}} = \\mathrm{e}^{${texNum(n * a, 1)}}`, lhs: Math.pow(ea, n), rhs: Math.exp(n * a) },
  ]
  const s = a + b
  return (
    <>
      <Plot xMin={-4.5} xMax={4.5} yMin={-1} yMax={Math.max(8, Math.min(60, Math.exp(s) * 1.15))} width={W} height={H}>
        <FunctionPath f={Math.exp} color={PALETTE.blue} width={2.5} />
        {[
          { x: a, c: PALETTE.orange, l: 'eᵃ' },
          { x: b, c: PALETTE.green, l: 'eᵇ' },
          { x: s, c: PALETTE.red, l: 'eᵃ⁺ᵇ' },
        ].map((p) => (
          <g key={p.l}>
            <Segment x1={p.x} y1={0} x2={p.x} y2={Math.exp(p.x)} color={p.c} width={1} dashed />
            <Segment x1={-4.5} y1={Math.exp(p.x)} x2={p.x} y2={Math.exp(p.x)} color={p.c} width={1} dashed />
            <Point x={p.x} y={Math.exp(p.x)} color={p.c} label={p.l} dx={-14} dy={-10} />
          </g>
        ))}
      </Plot>
      <div className="mt-3 grid gap-2">
        {rows.map((r) => (
          <div key={r.name} className="flex flex-wrap items-center justify-between gap-2 border bg-background px-3 py-2">
            <div className="min-w-0 overflow-x-auto text-sm">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{r.name}</div>
              <Tex>{r.tex}</Tex>
            </div>
            <div className="font-mono text-xs tabular-nums text-success">
              {fmt(r.lhs, 4)} = {fmt(r.rhs, 4)} ✓
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function PropText({ a, b }: { a: number; b: number }) {
  return (
    <>
      Ajouter <Tex>{`b = ${texNum(b, 1)}`}</Tex> à l’exposant revient à <strong>multiplier</strong> par <Tex>{`\\mathrm{e}^{${texNum(b, 1)}} \\approx ${texNum(Math.exp(b), 3)}`}</Tex> : l’exponentielle
      transforme les sommes en produits. Comme elle est strictement croissante, <Tex>{'\\mathrm{e}^a < \\mathrm{e}^b \\iff a < b'}</Tex> — ici <Tex>{`\\mathrm{e}^{${texNum(a, 1)}} ${a < b ? '<' : a > b ? '>' : '='} \\mathrm{e}^{${texNum(b, 1)}}`}</Tex>.
    </>
  )
}

/* ------------------------------- Euler ------------------------------ */

function Euler({ k, h }: { k: number; h: number }) {
  const X = 2
  const N = Math.round(X / h)
  const pts = useMemo(() => {
    const out: [number, number][] = [[0, 1]]
    let y = 1
    for (let i = 1; i <= N; i++) {
      y = y * (1 + k * h)
      out.push([+(i * h).toFixed(6), y])
    }
    return out
  }, [k, h, N])
  const iAt1 = Math.round(1 / h)
  const approx1 = pts[iAt1][1]
  const exact1 = Math.exp(k)
  const exact = (x: number) => Math.exp(k * x)
  const ys = [...pts.map((p) => p[1]), exact(X), exact(0)]
  let yMax = Math.max(...ys)
  let yMin = Math.min(0, ...ys)
  const pad = (yMax - yMin) * 0.1 || 1
  yMax += pad
  yMin -= pad * 0.5
  return (
    <>
      <Plot xMin={-0.25} xMax={2.25} yMin={yMin} yMax={yMax} width={W} height={H} xStep={0.25}>
        <FunctionPath f={exact} color={PALETTE.blue} width={2.5} />
        {pts.slice(1).map((p, i) => (
          <Segment key={i} x1={pts[i][0]} y1={pts[i][1]} x2={p[0]} y2={p[1]} color={PALETTE.orange} width={2} />
        ))}
        {N <= 40 && pts.map((p, i) => <Point key={'p' + i} x={p[0]} y={p[1]} color={PALETTE.orange} r={2.5} />)}
        <Line vertical={1} color={PALETTE.muted} width={1} dashed />
        <Point x={1} y={exact1} color={PALETTE.blue} r={3.5} label="e^k" dx={8} />
      </Plot>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Nombre de pas sur [0 ; 1]" value={String(iAt1)} />
        <Stat label="Euler : y(1) ≈" value={fmt(approx1, 5)} tone="warning" />
        <Stat label="Valeur exacte e^k" value={fmt(exact1, 5)} tone="info" />
        <Stat label="Erreur relative" value={`${fmt((Math.abs(approx1 - exact1) / exact1) * 100, 2)} %`} />
      </div>
      <div className="mt-3 flex flex-col gap-1.5 overflow-x-auto border bg-muted/20 p-3 text-sm">
        <Tex>{`y' = ${kx(k, 'y')},\\; y(0) = 1 \\quad\\Rightarrow\\quad y(x + h) \\approx y(x) + h\\,y'(x) = \\left(1 + ${par(k, 2)} \\times ${texNum(h, 2)}\\right) y(x)`}</Tex>
        <Tex>{`y_n = \\left(1 + kh\\right)^n \\quad\\Rightarrow\\quad y(1) \\approx \\left(1 + \\tfrac{${texNum(k, 2)}}{${iAt1}}\\right)^{${iAt1}} = ${texNum(approx1, 5)} \\quad\\text{contre}\\quad \\mathrm{e}^{${texNum(k, 2)}} = ${texNum(exact1, 5)}`}</Tex>
      </div>
      <div className="mt-3 overflow-x-auto border">
        <table className="w-full border-collapse font-mono text-xs tabular-nums">
          <tbody>
            <tr className="bg-muted/40">
              <th className="border-r px-2 py-1 text-left font-semibold">N</th>
              {[1, 2, 5, 10, 100, 1000, 10000].map((n) => (
                <td key={n} className="border-r px-2 py-1 text-right last:border-r-0">
                  {fmt(n, 0)}
                </td>
              ))}
            </tr>
            <tr className="border-t">
              <th className="border-r px-2 py-1 text-left font-semibold">(1 + k/N)ᴺ</th>
              {[1, 2, 5, 10, 100, 1000, 10000].map((n) => (
                <td key={n} className="border-r px-2 py-1 text-right last:border-r-0">
                  {fmt(Math.pow(1 + k / n, n), 5)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

function EulerText({ k, h }: { k: number; h: number }) {
  return (
    <>
      La méthode d’Euler remplace la courbe par des segments de tangente : à chaque pas, on multiplie par <Tex>{`1 + kh = ${texNum(1 + k * h, 3)}`}</Tex>. Plus le pas <Tex>h</Tex> est petit, plus la ligne
      brisée colle à la courbe de <Tex>{'x \\mapsto \\mathrm{e}^{kx}'}</Tex> : <Tex>{'\\left(1 + \\frac{k}{N}\\right)^N'}</Tex> se rapproche de <Tex>{'\\mathrm{e}^k'}</Tex> quand <Tex>N</Tex> devient grand.
      {1 + k * h < 0 && <> Attention : avec ce pas, <Tex>{'1 + kh < 0'}</Tex>, l’approximation oscille et n’a plus de sens.</>}
    </>
  )
}
