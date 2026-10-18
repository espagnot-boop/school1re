import { useRef, useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/input'
import { Stat } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { Plot, FunctionPath, Line, Point, PALETTE } from '@/lib/plot'
import { fmt } from '@/lib/utils'
import { texNum } from './_maths1/expr'
import { Handle, Interpretation, PlotText, pxDist, snap } from './_maths1/ui'

interface Props {
  a?: number
  b?: number
  c?: number
  title?: string
}

const VIEW = { xMin: -8, xMax: 8, yMin: -10, yMax: 10, width: 560, height: 360 }
const EPS = 1e-9

const round = (v: number, d = 6) => Math.round(v * 10 ** d) / 10 ** d
/** nombre LaTeX, parenthésé s'il est négatif */
const par = (v: number, d = 3) => (v < 0 ? `\\left(${texNum(v, d)}\\right)` : texNum(v, d))
const isExact = (v: number, d = 3) => Math.abs(v - Math.round(v * 10 ** d) / 10 ** d) < 1e-9
const eq = (v: number, d = 3) => (isExact(v, d) ? '=' : '\\approx')

/** a x² + b x + c en LaTeX */
function polyTex(a: number, b: number, c: number) {
  const terms: string[] = []
  const coef = (k: number, v: string, first: boolean) => {
    if (Math.abs(k) < EPS) return
    const sign = k < 0 ? '-' : first ? '' : '+'
    const abs = Math.abs(k)
    const num = v && Math.abs(abs - 1) < EPS ? '' : texNum(abs, 2)
    terms.push(`${first ? sign : ` ${sign} `}${num}${v}`)
  }
  coef(a, 'x^2', true)
  coef(b, 'x', terms.length === 0)
  coef(c, '', terms.length === 0)
  return terms.length ? terms.join('') : '0'
}
/** facteur (x − r) */
const factor = (r: number) => (Math.abs(r) < EPS ? 'x' : r > 0 ? `\\left(x - ${texNum(r, 3)}\\right)` : `\\left(x + ${texNum(-r, 3)}\\right)`)
const lead = (a: number) => (Math.abs(a - 1) < EPS ? '' : Math.abs(a + 1) < EPS ? '-' : texNum(a, 2))

const PRESETS: { label: string; v: [number, number, number] }[] = [
  { label: 'Δ > 0', v: [1, -2, -3] },
  { label: 'Δ = 0', v: [1, -4, 4] },
  { label: 'Δ < 0', v: [1, 2, 3] },
  { label: 'a < 0', v: [-0.5, 1, 4] },
]

export default function SecondDegre({ a: a0 = 1, b: b0 = -2, c: c0 = -3, title }: Props) {
  const [a, setA] = useState(a0)
  const [b, setB] = useState(b0)
  const [c, setC] = useState(c0)
  const drag = useRef<'S' | 'C' | null>(null)
  const [active, setActive] = useState<'S' | 'C' | null>(null)

  const deg2 = Math.abs(a) > EPS
  const delta = round(b * b - 4 * a * c)
  const alpha = deg2 ? round(-b / (2 * a)) : NaN
  const beta = deg2 ? round(-delta / (4 * a)) : NaN
  const f = (x: number) => a * x * x + b * x + c
  const sq = Math.sqrt(Math.max(0, delta))
  let roots: number[] = []
  if (deg2) {
    if (delta > EPS) {
      const r1 = (-b - sq) / (2 * a)
      const r2 = (-b + sq) / (2 * a)
      roots = [Math.min(r1, r2), Math.max(r1, r2)].map((r) => round(r, 9))
    } else if (Math.abs(delta) <= EPS) roots = [alpha]
  } else if (Math.abs(b) > EPS) roots = [round(-c / b, 9)]
  const sa = a > 0 ? 1 : -1
  const sgnTxt = (s: number) => (s > 0 ? 'positif' : 'négatif')

  const onPointer = (x: number, y: number, kind: 'down' | 'move' | 'up') => {
    if (kind === 'down') {
      const dS = deg2 ? pxDist(VIEW, x, y, alpha, beta) : Infinity
      const dC = pxDist(VIEW, x, y, 0, c)
      drag.current = dS < 22 && dS <= dC ? 'S' : dC < 22 ? 'C' : null
      setActive(drag.current)
    }
    if (kind === 'up') {
      drag.current = null
      setActive(null)
      return
    }
    if (drag.current === 'S') {
      const al = snap(Math.max(VIEW.xMin, Math.min(VIEW.xMax, x)), 0.1)
      const be = snap(Math.max(VIEW.yMin, Math.min(VIEW.yMax, y)), 0.1)
      setB(round(-2 * a * al, 2))
      setC(round(a * al * al + be, 2))
    } else if (drag.current === 'C') {
      setC(snap(Math.max(VIEW.yMin, Math.min(VIEW.yMax, y)), 0.1))
    }
  }

  // ---------- formules ----------
  const fTex = `f(x) = ${polyTex(a, b, c)}`
  const deltaTex = `\\Delta = b^2 - 4ac = ${par(b, 2)}^2 - 4 \\times ${par(a, 2)} \\times ${par(c, 2)} = ${texNum(delta, 4)}`
  let rootsTex = ''
  if (deg2) {
    if (delta > EPS) {
      const sqrtTex = isExact(sq, 4) ? texNum(sq, 4) : `\\sqrt{${texNum(delta, 4)}}`
      rootsTex =
        `x_1 = \\dfrac{-b - \\sqrt{\\Delta}}{2a} = \\dfrac{${texNum(-b, 2)} - ${sqrtTex}}{${texNum(2 * a, 2)}} ${eq(roots[0])} ${texNum(roots[0], 3)}` +
        `\\qquad x_2 = \\dfrac{${texNum(-b, 2)} + ${sqrtTex}}{${texNum(2 * a, 2)}} ${eq(roots[1])} ${texNum(roots[1], 3)}`
    } else if (Math.abs(delta) <= EPS) rootsTex = `x_0 = -\\dfrac{b}{2a} ${eq(alpha)} ${texNum(alpha, 3)} \\quad\\text{(racine double)}`
    else rootsTex = `\\Delta < 0 \\;:\\; \\text{aucune racine réelle}`
  }
  const canonTex = deg2
    ? `f(x) = ${lead(a)}${Math.abs(alpha) < EPS ? 'x^2' : `${factor(alpha)}^2`}${Math.abs(beta) < EPS ? '' : beta > 0 ? ` + ${texNum(beta, 3)}` : ` - ${texNum(-beta, 3)}`}`
    : ''
  const factTex = !deg2
    ? ''
    : delta > EPS
      ? `f(x) = ${lead(a)}${factor(roots[0])}${factor(roots[1])}`
      : Math.abs(delta) <= EPS
        ? `f(x) = ${lead(a)}${factor(alpha)}^2`
        : `\\text{pas de factorisation dans } \\mathbb{R}`
  const approx = deg2 && roots.some((r) => !isExact(r))

  // ---------- interprétation ----------
  const interp = !deg2 ? (
    <>
      Avec <Tex>a = 0</Tex>, <Tex>f</Tex> n’est plus un trinôme du second degré mais une fonction affine : sa courbe est une droite.
    </>
  ) : delta > EPS ? (
    <>
      <Tex>{'\\Delta > 0'}</Tex> : deux racines distinctes, la parabole coupe l’axe des abscisses en deux points. <Tex>f(x)</Tex> est du signe de <Tex>a</Tex> ({sgnTxt(sa)}) à l’extérieur
      des racines et du signe contraire entre elles. Le sommet <Tex>{`S(${texNum(alpha, 2)}\\,;\\,${texNum(beta, 2)})`}</Tex> est un {a > 0 ? 'minimum' : 'maximum'}.
    </>
  ) : Math.abs(delta) <= EPS ? (
    <>
      <Tex>{'\\Delta = 0'}</Tex> : une racine double <Tex>{`x_0 = ${texNum(alpha, 3)}`}</Tex>, la parabole touche l’axe des abscisses en son sommet. <Tex>f(x)</Tex> est {sgnTxt(sa)}{' '}
      (du signe de <Tex>a</Tex>) et ne s’annule qu’en <Tex>x_0</Tex>.
    </>
  ) : (
    <>
      <Tex>{'\\Delta < 0'}</Tex> : aucune racine réelle, la parabole ne coupe pas l’axe des abscisses. <Tex>f(x)</Tex> est strictement {sgnTxt(sa)} pour tout réel <Tex>x</Tex> (signe de{' '}
      <Tex>a</Tex>), et son {a > 0 ? 'minimum' : 'maximum'} vaut <Tex>{`\\beta = ${texNum(beta, 3)}`}</Tex>.
    </>
  )

  const rng = (v: number, lo: number, hi: number) => [Math.min(lo, Math.floor(v)), Math.max(hi, Math.ceil(v))] as const
  const [aLo, aHi] = rng(a0, -5, 5)
  const [bLo, bHi] = rng(b0, -10, 10)
  const [cLo, cHi] = rng(c0, -10, 10)

  return (
    <WidgetFrame
      title={title ?? 'Fonction polynôme du second degré'}
      subtitle="Curseurs a, b, c — faites glisser le sommet S ou le point C(0 ; c)"
      footer={<Interpretation>{interp}</Interpretation>}
      controls={
        <>
          <div className="flex flex-col gap-3">
            <Slider label={<Tex>a</Tex>} value={a} min={aLo} max={aHi} step={0.1} digits={2} onChange={(v) => setA(round(v, 4))} />
            <Slider label={<Tex>b</Tex>} value={b} min={bLo} max={bHi} step={0.1} digits={2} onChange={(v) => setB(round(v, 4))} />
            <Slider label={<Tex>c</Tex>} value={c} min={cLo} max={cHi} step={0.1} digits={2} onChange={(v) => setC(round(v, 4))} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Exemples</Label>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <Button
                  key={p.label}
                  variant="outline"
                  size="xs"
                  onClick={() => {
                    setA(p.v[0])
                    setB(p.v[1])
                    setC(p.v[2])
                  }}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Stat label="Δ" value={fmt(delta, 3)} tone={delta > EPS ? 'success' : Math.abs(delta) <= EPS ? 'warning' : 'destructive'} />
            <Stat label="Racines" value={!deg2 ? '—' : roots.length === 0 ? 'aucune' : roots.map((r) => fmt(r, 3)).join(' ; ')} />
            <Stat label="Sommet S" value={deg2 ? `(${fmt(alpha, 2)} ; ${fmt(beta, 2)})` : '—'} />
            <Stat label="Axe de symétrie" value={deg2 ? `x = ${fmt(alpha, 2)}` : '—'} />
            {deg2 && roots.length === 2 && (
              <>
                <Stat label="Somme x₁ + x₂ = −b/a" value={fmt(roots[0] + roots[1], 3)} />
                <Stat label="Produit x₁x₂ = c/a" value={fmt(roots[0] * roots[1], 3)} />
              </>
            )}
          </div>
        </>
      }
    >
      <Plot xMin={VIEW.xMin} xMax={VIEW.xMax} yMin={VIEW.yMin} yMax={VIEW.yMax} xStep={1} yStep={2} onPointer={onPointer}>
        {deg2 && <Line vertical={alpha} color={PALETTE.violet} width={1} dashed />}
        <FunctionPath f={f} color={PALETTE.blue} width={2.5} />
        {roots.map((r, i) => (
          <Point key={i} x={r} y={0} color={PALETTE.red} label={roots.length === 2 ? `x${i ? '₂' : '₁'}` : 'x₀'} dy={16} dx={-6} />
        ))}
        <Handle x={0} y={c} color={PALETTE.green} label="C" active={active === 'C'} dx={-18} />
        {deg2 && <Handle x={alpha} y={beta} color={PALETTE.orange} label="S" active={active === 'S'} dy={a > 0 ? 20 : -10} />}
        {deg2 && Number.isFinite(alpha) && (
          <PlotText x={alpha} y={VIEW.yMax} dx={4} dy={14} color={PALETTE.violet} size={10}>
            x = {fmt(alpha, 2)}
          </PlotText>
        )}
      </Plot>

      <div className="mt-3 flex flex-col gap-1.5 overflow-x-auto border bg-muted/20 p-3 text-sm">
        <Tex>{fTex}</Tex>
        <Tex>{deltaTex}</Tex>
        {rootsTex && <Tex>{rootsTex}</Tex>}
        {deg2 && (
          <div className="mt-1 grid gap-1.5 sm:grid-cols-2">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Forme canonique a(x − α)² + β</div>
              <Tex>{canonTex}</Tex>
            </div>
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Forme factorisée{approx ? ' (valeurs approchées)' : ''}</div>
              <Tex>{factTex}</Tex>
            </div>
          </div>
        )}
        {deg2 && (
          <div className="text-xs text-muted-foreground">
            <Tex>{`\\alpha = -\\dfrac{b}{2a} ${eq(alpha)} ${texNum(alpha, 3)}, \\quad \\beta = f(\\alpha) = -\\dfrac{\\Delta}{4a} ${eq(beta)} ${texNum(beta, 3)}`}</Tex>
          </div>
        )}
      </div>

      {deg2 && <SignTable a={a} roots={roots} alpha={alpha} beta={beta} f={f} />}
    </WidgetFrame>
  )
}

/** Tableau de signe + tableau de variations (SVG). */
function SignTable({ a, roots, alpha, beta, f }: { a: number; roots: number[]; alpha: number; beta: number; f: (x: number) => number }) {
  const W = 560
  const L = 120
  const H1 = 30
  const H2 = 32
  const H3 = 64
  const H = H1 + H2 + H3
  const fg = 'hsl(var(--foreground))'
  const mu = 'hsl(var(--muted-foreground))'
  const bd = 'hsl(var(--border))'

  // valeurs clés : racines et abscisse du sommet, triées
  const pts: { v: number; root: boolean; top: boolean }[] = []
  for (const r of roots) pts.push({ v: r, root: true, top: false })
  const ia = pts.findIndex((p) => Math.abs(p.v - alpha) < 1e-9)
  if (ia >= 0) pts[ia].top = true
  else pts.push({ v: alpha, root: false, top: true })
  pts.sort((u, w) => u.v - w.v)
  const n = pts.length + 2
  const colX = (i: number) => L + 22 + ((W - L - 44) * i) / (n - 1)
  const xs = [-Infinity, ...pts.map((p) => p.v), Infinity]
  const mid = (i: number) => {
    const l = xs[i]
    const r = xs[i + 1]
    if (!Number.isFinite(l)) return r - 1
    if (!Number.isFinite(r)) return l + 1
    return (l + r) / 2
  }
  const iTop = 1 + pts.findIndex((p) => p.top)

  const yHigh = H1 + H2 + 14
  const yLow = H1 + H2 + H3 - 10
  const vEnd = a > 0 ? yHigh : yLow
  const vMid = a > 0 ? yLow : yHigh
  const arrow = (x1: number, y1: number, x2: number, y2: number, k: number) => {
    const ang = Math.atan2(y2 - y1, x2 - x1)
    const ex = x2 - 4 * Math.cos(ang)
    const ey = y2 - 4 * Math.sin(ang)
    return (
      <g key={k} stroke={fg} strokeWidth={1.4} fill={fg}>
        <line x1={x1} y1={y1} x2={ex} y2={ey} />
        <path d={`M${ex - 7 * Math.cos(ang - 0.45)},${ey - 7 * Math.sin(ang - 0.45)} L${ex},${ey} L${ex - 7 * Math.cos(ang + 0.45)},${ey - 7 * Math.sin(ang + 0.45)} Z`} />
      </g>
    )
  }
  const lab = (i: number) => (i === 0 ? '−∞' : i === n - 1 ? '+∞' : (pts[i - 1].top && !pts[i - 1].root ? 'α = ' : '') + fmt(pts[i - 1].v, 2))

  return (
    <div className="mt-3">
      <div className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">Tableau de signe et de variations</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full border bg-background" role="img" aria-label="Tableau de signe et de variations">
        <g stroke={bd} strokeWidth={1}>
          <line x1={L} y1={0} x2={L} y2={H} />
          <line x1={0} y1={H1} x2={W} y2={H1} />
          <line x1={0} y1={H1 + H2} x2={W} y2={H1 + H2} />
        </g>
        <g fontFamily="Geist, sans-serif" fontSize={12} fill={fg}>
          <text x={10} y={H1 / 2 + 4} fontStyle="italic" fontWeight={600}>
            x
          </text>
          <text x={10} y={H1 + H2 / 2 + 4}>
            signe de f(x)
          </text>
          <text x={10} y={H1 + H2 + H3 / 2 + 4}>
            variations de f
          </text>
          {xs.map((_, i) => (
            <text key={i} x={colX(i)} y={H1 / 2 + 4} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize={11}>
              {lab(i)}
            </text>
          ))}
          {xs.slice(0, -1).map((_, i) => {
            const s = f(mid(i))
            return (
              <text key={'s' + i} x={(colX(i) + colX(i + 1)) / 2} y={H1 + H2 / 2 + 5} textAnchor="middle" fontSize={15} fontWeight={600} fill={s > 0 ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}>
                {s > 0 ? '+' : '−'}
              </text>
            )
          })}
          {pts.map((p, k) =>
            p.root ? (
              <g key={'z' + k}>
                <line x1={colX(k + 1)} x2={colX(k + 1)} y1={H1} y2={H1 + H2} stroke={mu} strokeWidth={1} />
                <rect x={colX(k + 1) - 8} y={H1 + H2 / 2 - 8} width={16} height={16} fill="hsl(var(--background))" />
                <text x={colX(k + 1)} y={H1 + H2 / 2 + 4} textAnchor="middle" fontFamily="Geist Mono, monospace">
                  0
                </text>
              </g>
            ) : null,
          )}
          <text x={colX(iTop)} y={vMid + 4} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize={11}>
            {fmt(beta, 2)}
          </text>
          {arrow(colX(0) + 6, vEnd, colX(iTop) - 22, vMid + (a > 0 ? -4 : 4), 1)}
          {arrow(colX(iTop) + 22, vMid + (a > 0 ? -4 : 4), colX(n - 1) - 6, vEnd, 2)}
        </g>
      </svg>
    </div>
  )
}
