import { useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, SkipForward } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/input'
import { Segmented } from '@/components/ui/tabs'
import { Stat } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { Plot, FunctionPath, Line, Point, Segment, PALETTE } from '@/lib/plot'
import { cn, fmt } from '@/lib/utils'
import { compileExpr, texNum, toTex } from './_maths1/expr'
import { ExprField, Interpretation, PlotText, snap } from './_maths1/ui'

type Kind = 'arithmetique' | 'geometrique' | 'recurrence'
interface Props {
  kind?: Kind | 'arithmétique' | 'géométrique' | 'récurrence'
  u0?: number
  r?: number
  q?: number
  expression?: string
  n?: number
  view?: 'nuage' | 'toile'
  title?: string
}

const W = 560
const H = 360
const SUB = '₀₁₂₃₄₅₆₇₈₉'
const sub = (n: number) =>
  String(n)
    .split('')
    .map((d) => SUB[+d])
    .join('')
const par = (v: number, d = 3) => (v < 0 ? `\\left(${texNum(v, d)}\\right)` : texNum(v, d))
const LIMIT = 1e9

function normKind(k: Props['kind'], hasExpr: boolean): Kind {
  if (!k) return hasExpr ? 'recurrence' : 'arithmetique'
  const s = k.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  if (s.startsWith('geo')) return 'geometrique'
  if (s.startsWith('rec')) return 'recurrence'
  return 'arithmetique'
}

export default function SuiteExplorer(props: Props) {
  const [kind, setKind] = useState<Kind>(() => normKind(props.kind, !!props.expression))
  const [u0, setU0] = useState(props.u0 ?? (props.kind || props.expression ? 1 : 2))
  const [r, setR] = useState(props.r ?? 1.5)
  const [q, setQ] = useState(props.q ?? 1.2)
  const [expr, setExpr] = useState(props.expression ?? '0.5u + 3')
  const [count, setCount] = useState(Math.max(2, Math.min(40, props.n ?? 12)))
  const [view, setView] = useState<'nuage' | 'toile'>(props.view ?? (normKind(props.kind, !!props.expression) === 'recurrence' ? 'toile' : 'nuage'))
  const [shown, setShown] = useState(count) // nombre de termes révélés (animation)
  const [playing, setPlaying] = useState(false)
  const [sel, setSel] = useState<number | null>(null)

  const compiled = useMemo(() => compileExpr(expr, ['u', 'x', 'n']), [expr])
  const recF = useMemo(() => {
    if (kind === 'arithmetique') return (x: number) => x + r
    if (kind === 'geometrique') return (x: number) => q * x
    if (!compiled.ok) return null
    const fn = compiled.fn
    return (x: number, n = 0) => fn({ u: x, x, n })
  }, [kind, r, q, compiled])

  // termes
  const { terms, diverged } = useMemo(() => {
    const t: number[] = [u0]
    let div = false
    if (!recF) return { terms: t, diverged: false }
    for (let n = 1; n < count; n++) {
      const v = kind === 'arithmetique' ? u0 + n * r : kind === 'geometrique' ? u0 * Math.pow(q, n) : recF(t[n - 1], n - 1)
      if (!Number.isFinite(v) || Math.abs(v) > LIMIT) {
        div = true
        break
      }
      t.push(+v.toPrecision(14))
    }
    return { terms: t, diverged: div }
  }, [u0, r, q, count, kind, recF])

  useEffect(() => {
    if (!playing) setShown(count)
  }, [count, kind, u0, r, q, expr]) // eslint-disable-line react-hooks/exhaustive-deps

  // animation : révèle un terme toutes les 450 ms
  const shownRef = useRef(shown)
  shownRef.current = shown
  useEffect(() => {
    if (!playing) return
    let raf = 0
    let acc = 0
    let t0 = performance.now()
    const tick = (t: number) => {
      acc += t - t0
      t0 = t
      if (acc > 450) {
        acc = 0
        const s = Math.min(count, shownRef.current + 1)
        shownRef.current = s
        setShown(s)
        if (s >= count) {
          setPlaying(false)
          return
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, count])

  const vis = terms.slice(0, Math.max(1, shown))
  const last = vis[vis.length - 1]
  const nLast = vis.length - 1
  const sum = vis.reduce((s, v) => s + v, 0)

  // ---------- fenêtres ----------
  const scatterView = useMemo(() => {
    const ys = terms.filter((v) => Number.isFinite(v))
    let lo = Math.min(0, ...ys)
    let hi = Math.max(0, ...ys)
    if (hi - lo < 1e-9) {
      lo -= 1
      hi += 1
    }
    const pad = (hi - lo) * 0.1
    return { xMin: -0.8, xMax: count - 0.2 + 0.6, yMin: lo - pad, yMax: hi + pad }
  }, [terms, count])

  const frozen = useRef<null | { xMin: number; xMax: number; yMin: number; yMax: number }>(null)
  const cobView = useMemo(() => {
    const vals = terms.filter((v) => Number.isFinite(v))
    let lo = Math.min(0, ...vals)
    let hi = Math.max(0, ...vals)
    if (hi - lo < 1e-9) {
      lo -= 1
      hi += 1
    }
    const pad = (hi - lo) * 0.15
    lo -= pad
    hi += pad
    const span = hi - lo
    const cx = (lo + hi) / 2
    const half = (span * (W / H)) / 2
    return { xMin: cx - half, xMax: cx + half, yMin: lo, yMax: hi }
  }, [terms])
  const cv = frozen.current ?? cobView

  // points fixes de f (recherche de changements de signe de f(x) − x)
  const fixed = useMemo(() => {
    if (!recF) return [] as number[]
    const out: number[] = []
    const g = (x: number) => recF(x, 0) - x
    const N = 600
    let px = cv.xMin
    let pg = g(px)
    for (let i = 1; i <= N; i++) {
      const x = cv.xMin + ((cv.xMax - cv.xMin) * i) / N
      const gx = g(x)
      if (Number.isFinite(pg) && Number.isFinite(gx) && (pg === 0 || pg * gx < 0)) {
        let a = px
        let b = x
        for (let k = 0; k < 60; k++) {
          const m = (a + b) / 2
          if (g(a) * g(m) <= 0) b = m
          else a = m
        }
        const root = (a + b) / 2
        if (!out.some((o) => Math.abs(o - root) < 1e-6)) out.push(root)
      }
      px = x
      pg = gx
    }
    return out.slice(0, 4)
  }, [recF, cv])

  // ---------- analyse ----------
  const diffs = terms.slice(1).map((v, i) => v - terms[i])
  const tol = 1e-12
  const incr = diffs.length > 0 && diffs.every((d) => d >= -tol)
  const decr = diffs.length > 0 && diffs.every((d) => d <= tol)
  const constant = incr && decr
  const conv = !diverged && terms.length > 4 && Math.abs(terms[terms.length - 1] - terms[terms.length - 2]) < 1e-4 * (1 + Math.abs(terms[terms.length - 1]))

  let interp: React.ReactNode
  if (kind === 'arithmetique') {
    interp = (
      <>
        Suite arithmétique de raison <Tex>{`r = ${texNum(r, 2)}`}</Tex> : on ajoute toujours {fmt(r, 2)}, les points du nuage sont <strong>alignés</strong> (croissance linéaire).{' '}
        {Math.abs(r) < 1e-12 ? 'La suite est constante.' : r > 0 ? <>La suite est strictement croissante et tend vers <Tex>{'+\\infty'}</Tex>.</> : <>La suite est strictement décroissante et tend vers <Tex>{'-\\infty'}</Tex>.</>}
      </>
    )
  } else if (kind === 'geometrique') {
    const qq = <Tex>{`q = ${texNum(q, 2)}`}</Tex>
    let s: React.ReactNode
    if (Math.abs(u0) < 1e-12) s = 'Avec u₀ = 0, tous les termes sont nuls.'
    else if (Math.abs(q - 1) < 1e-12) s = 'Avec q = 1, la suite est constante.'
    else if (Math.abs(q) < 1e-12) s = 'Avec q = 0, la suite est nulle à partir du rang 1.'
    else if (q > 1) s = <>Avec {qq} {'>'} 1, la suite est {u0 > 0 ? 'strictement croissante' : 'strictement décroissante'} et tend vers <Tex>{u0 > 0 ? '+\\infty' : '-\\infty'}</Tex> (croissance exponentielle).</>
    else if (q > 0) s = <>Avec 0 {'<'} {qq} {'<'} 1, la suite est {u0 > 0 ? 'strictement décroissante' : 'strictement croissante'} et tend vers 0.</>
    else if (q > -1) s = <>Avec −1 {'<'} {qq} {'<'} 0, les termes changent de signe à chaque rang (suite non monotone) et tendent vers 0.</>
    else if (Math.abs(q + 1) < 1e-12) s = <>Avec {qq}, la suite alterne entre {fmt(u0, 2)} et {fmt(-u0, 2)} : elle n’a pas de limite.</>
    else s = <>Avec {qq} {'<'} −1, les termes alternent de signe et leur valeur absolue explose : pas de limite.</>
    interp = (
      <>
        Suite géométrique : on multiplie toujours par {fmt(q, 2)}. {s}
      </>
    )
  } else if (!compiled.ok) {
    interp = <>Saisissez une expression valide de <Tex>u_n</Tex> (variable u ou x), par exemple <code className="font-mono">0.5u + 3</code> ou <code className="font-mono">sqrt(u + 6)</code>.</>
  } else {
    interp = (
      <>
        Sur les {terms.length} premiers termes, la suite semble{' '}
        {constant ? 'constante' : incr ? 'croissante' : decr ? 'décroissante' : 'non monotone'}
        {diverged ? ' et diverge (les termes deviennent trop grands).' : conv ? (
          <>
            {' '}
            et <strong>converger</strong> vers <Tex>{`\\ell \\approx ${texNum(terms[terms.length - 1], 4)}`}</Tex>, solution de <Tex>{'f(\\ell) = \\ell'}</Tex> : sur la toile d’araignée, l’escalier (ou
            l’escargot) se resserre autour de l’intersection de la courbe et de la droite <Tex>{'y = x'}</Tex>.
          </>
        ) : (
          '. Pas de convergence visible sur ces termes : augmentez le nombre de termes ou changez u₀.'
        )}
      </>
    )
  }

  // ---------- formules ----------
  const recTex =
    kind === 'arithmetique'
      ? `u_{n+1} = u_n ${r < 0 ? '-' : '+'} ${texNum(Math.abs(r), 2)}`
      : kind === 'geometrique'
        ? `u_{n+1} = ${texNum(q, 2)} \\, u_n`
        : compiled.ok
          ? `u_{n+1} = f(u_n) \\text{ avec } f(x) = ${toTex(compiled.node).replace(/\bu\b/g, 'x')}`
          : 'u_{n+1} = f(u_n)'
  const explicitTex =
    kind === 'arithmetique'
      ? `u_n = u_0 + n r = ${texNum(u0, 2)} ${r < 0 ? '-' : '+'} ${texNum(Math.abs(r), 2)}\\,n`
      : kind === 'geometrique'
        ? `u_n = u_0 \\times q^n = ${texNum(u0, 2)} \\times ${par(q, 2)}^{n}`
        : null
  const nTerms = vis.length
  const sumTex =
    kind === 'arithmetique'
      ? `S = u_0 + \\dots + u_{${nLast}} = ${nTerms} \\times \\dfrac{u_0 + u_{${nLast}}}{2} = ${nTerms} \\times \\dfrac{${texNum(u0, 2)} + ${par(last, 2)}}{2} = ${texNum(sum, 3)}`
      : kind === 'geometrique'
        ? Math.abs(q - 1) < 1e-12
          ? `S = ${nTerms} \\times u_0 = ${texNum(sum, 3)}`
          : `S = u_0 \\times \\dfrac{1 - q^{${nTerms}}}{1 - q} = ${texNum(u0, 2)} \\times \\dfrac{1 - ${par(q, 2)}^{${nTerms}}}{1 - ${par(q, 2)}} ${Math.abs(sum - +sum.toFixed(3)) < 1e-9 ? '=' : '\\approx'} ${texNum(sum, 3)}`
          : `S = u_0 + u_1 + \\dots + u_{${nLast}} \\approx ${texNum(sum, 4)}`

  const ext = (v: number, lo: number, hi: number) => [Math.min(lo, Math.floor(v)), Math.max(hi, Math.ceil(v))] as const
  const [u0Lo, u0Hi] = ext(props.u0 ?? 0, -10, 10)
  const [rLo, rHi] = ext(props.r ?? 0, -5, 5)
  const [qLo, qHi] = ext(props.q ?? 0, -2, 3)

  const play = () => {
    if (playing) return setPlaying(false)
    setShown(1)
    setPlaying(true)
  }

  const onScatter = (x: number) => setSel(Math.max(0, Math.min(vis.length - 1, Math.round(x))))
  const onCob = (x: number, _y: number, kind2: 'down' | 'move' | 'up') => {
    if (kind2 === 'down') frozen.current = cobView
    if (kind2 === 'up') {
      frozen.current = null
      return
    }
    const lim = frozen.current ?? cobView
    setU0(snap(Math.max(lim.xMin, Math.min(lim.xMax, x)), 0.1))
  }

  const selIdx = sel !== null && sel < vis.length ? sel : null

  return (
    <WidgetFrame
      title={props.title ?? 'Explorateur de suites'}
      subtitle={view === 'toile' ? 'Toile d’araignée : faites glisser horizontalement pour choisir u₀' : 'Nuage de points (n ; uₙ) — touchez un point pour lire le terme'}
      footer={<Interpretation>{interp}</Interpretation>}
      controls={
        <>
          <div className="flex flex-col gap-2">
            <Label>Type de suite</Label>
            <Segmented
              value={kind}
              onChange={(k) => {
                setKind(k)
                setSel(null)
              }}
              options={[
                { value: 'arithmetique', label: 'Arithm.' },
                { value: 'geometrique', label: 'Géom.' },
                { value: 'recurrence', label: 'uₙ₊₁ = f(uₙ)' },
              ]}
            />
          </div>
          {kind === 'recurrence' && (
            <ExprField label="f(u) (variable u ou x, éventuellement n)" value={expr} onChange={setExpr} error={compiled.ok ? null : compiled.error} tex={compiled.ok ? compiled.tex : null} prefix="f(u)" placeholder="ex. 0.5u + 3" />
          )}
          <Slider label={<Tex>u_0</Tex>} value={u0} min={u0Lo} max={u0Hi} step={0.1} digits={2} onChange={setU0} />
          {kind === 'arithmetique' && <Slider label={<span>raison <Tex>r</Tex></span>} value={r} min={rLo} max={rHi} step={0.1} digits={2} onChange={setR} />}
          {kind === 'geometrique' && <Slider label={<span>raison <Tex>q</Tex></span>} value={q} min={qLo} max={qHi} step={0.05} digits={2} onChange={setQ} />}
          <Slider label="Nombre de termes" value={count} min={2} max={40} step={1} digits={0} onChange={(v) => setCount(Math.round(v))} />
          <div className="flex flex-col gap-2">
            <Label>Représentation</Label>
            <Segmented
              value={view}
              onChange={setView}
              options={[
                { value: 'nuage', label: 'Nuage de points' },
                { value: 'toile', label: 'Toile d’araignée' },
              ]}
            />
          </div>
          <div className="flex gap-1.5">
            <Button size="sm" onClick={play}>
              {playing ? <Pause /> : <Play />} {playing ? 'Pause' : 'Animer'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setPlaying(false)
                setShown(count)
              }}
            >
              <SkipForward /> Tout
            </Button>
          </div>
        </>
      }
    >
      {view === 'nuage' ? (
        <Plot {...scatterView} width={W} height={H} xStep={count > 20 ? 5 : count > 10 ? 2 : 1} xLabel="n" yLabel="uₙ" onPointer={onScatter}>
          {kind === 'arithmetique' && vis.length > 1 && <FunctionPath f={(x) => u0 + r * x} from={0} to={vis.length - 1} color={PALETTE.blue} width={1} dashed />}
          {vis.map((v, k) => (
            <g key={k}>
              {(selIdx === k || vis.length <= 12) && <Segment x1={k} y1={0} x2={k} y2={v} color={PALETTE.muted} width={1} dashed />}
              <Point x={k} y={v} color={selIdx === k ? PALETTE.red : PALETTE.blue} r={selIdx === k ? 5 : 3.5} label={selIdx === k || (vis.length <= 8 && k === vis.length - 1) ? `u${sub(k)}` : undefined} />
            </g>
          ))}
        </Plot>
      ) : (
        <Plot {...cv} width={W} height={H} onPointer={onCob}>
          <Line m={1} p={0} color={PALETTE.muted} width={1.25} />
          {recF && <FunctionPath f={(x) => recF(x, 0)} color={PALETTE.blue} width={2.25} />}
          {fixed.map((l, i) => (
            <Point key={'l' + i} x={l} y={l} color={PALETTE.violet} r={3.5} label="ℓ" dx={8} dy={14} />
          ))}
          {/* escalier / escargot */}
          {vis.length > 1 && (
            <>
              <Segment x1={vis[0]} y1={0} x2={vis[0]} y2={vis[1]} color={PALETTE.orange} width={1.5} />
              {vis.slice(1).map((v, k) => {
                const next = vis[k + 2]
                return (
                  <g key={k}>
                    <Segment x1={vis[k]} y1={v} x2={v} y2={v} color={PALETTE.orange} width={1.5} />
                    {next !== undefined && <Segment x1={v} y1={v} x2={v} y2={next} color={PALETTE.orange} width={1.5} />}
                    {k < 6 && <Segment x1={v} y1={v} x2={v} y2={0} color={PALETTE.muted} width={0.75} dashed />}
                  </g>
                )
              })}
            </>
          )}
          {vis.slice(0, 6).map((v, k) => (
            <g key={'t' + k}>
              <Point x={v} y={0} color={k === 0 ? PALETTE.red : PALETTE.orange} r={k === 0 ? 4.5 : 3} />
              <PlotText x={v} y={0} dy={k % 2 ? 26 : 15} anchor="middle" color={k === 0 ? PALETTE.red : PALETTE.orange} size={11}>
                {`u${sub(k)}`}
              </PlotText>
            </g>
          ))}
          <PlotText x={cv.xMax} y={cv.xMax} dx={-26} dy={18} color={PALETTE.muted} size={10}>
            y = x
          </PlotText>
        </Plot>
      )}

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label={`u${sub(nLast)}`} value={fmt(last, 4)} />
        <Stat label={`Somme des ${nTerms} termes`} value={fmt(sum, 4)} />
        <Stat
          label="Sens de variation"
          value={constant ? 'constante' : incr ? 'croissante' : decr ? 'décroissante' : 'non monotone'}
          tone={constant ? 'info' : incr ? 'success' : decr ? 'destructive' : 'warning'}
        />
        <Stat label={kind === 'recurrence' ? 'Point(s) fixe(s) ℓ = f(ℓ)' : 'Limite'} value={kind === 'recurrence' ? (fixed.length ? fixed.map((l) => fmt(l, 4)).join(' ; ') : 'aucun visible') : limitText(kind, u0, r, q)} />
      </div>

      <div className="mt-3 flex flex-col gap-1.5 overflow-x-auto border bg-muted/20 p-3 text-sm">
        <Tex>{`u_0 = ${texNum(u0, 2)}, \\quad ${recTex}`}</Tex>
        {explicitTex && <Tex>{explicitTex}</Tex>}
        <Tex>{sumTex}</Tex>
      </div>

      <div className="mt-3 overflow-x-auto border">
        <table className="w-full border-collapse font-mono text-xs tabular-nums">
          <tbody>
            <tr className="bg-muted/40">
              <th className="sticky left-0 border-r bg-muted px-2 py-1 text-left font-semibold">n</th>
              {terms.map((_, k) => (
                <td key={k} className={cn('border-r px-2 py-1 text-right', k >= vis.length && 'opacity-30', selIdx === k && 'bg-accent')}>
                  {k}
                </td>
              ))}
            </tr>
            <tr className="border-t">
              <th className="sticky left-0 border-r bg-card px-2 py-1 text-left font-semibold">uₙ</th>
              {terms.map((v, k) => (
                <td key={k} className={cn('cursor-pointer border-r px-2 py-1 text-right', k >= vis.length && 'opacity-30', selIdx === k && 'bg-accent')} onClick={() => setSel(k)}>
                  {fmt(v, 3)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      {diverged && <p className="mt-2 text-xs text-warning">Calcul interrompu : les termes dépassent 10⁹ en valeur absolue (ou ne sont plus définis).</p>}
    </WidgetFrame>
  )
}

function limitText(kind: Kind, u0: number, r: number, q: number) {
  if (kind === 'arithmetique') return Math.abs(r) < 1e-12 ? fmt(u0, 2) : r > 0 ? '+∞' : '−∞'
  if (Math.abs(u0) < 1e-12 || Math.abs(q) < 1e-12) return '0'
  if (Math.abs(q - 1) < 1e-12) return fmt(u0, 2)
  if (q > 1) return u0 > 0 ? '+∞' : '−∞'
  if (q > -1) return '0'
  return 'pas de limite'
}
