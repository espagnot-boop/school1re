import { useMemo, useState } from 'react'
import { Plus, RotateCcw, ZoomIn, ZoomOut, MoveVertical } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Select, Label } from '@/components/ui/input'
import { Stat, Switch } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { Plot, FunctionPath, Line, Point, SERIES, PALETTE } from '@/lib/plot'
import { fmt } from '@/lib/utils'
import { compileExpr, derivative, autoYRange, toTex, usedVars, texNum, diff, toFn } from './_maths1/expr'
import { ExprField, Interpretation, PlotText, snap } from './_maths1/ui'

interface ParamDef {
  name: string
  min?: number
  max?: number
  step?: number
  value?: number
  label?: string
}
interface Props {
  expressions?: string[]
  params?: ParamDef[]
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
  editable?: boolean
  showDerivative?: boolean
  xLabel?: string
  yLabel?: string
  title?: string
}

const NAMES = ['f', 'g', 'h', 'k', 'm', 'p']
const MAX_CURVES = 6
const STEPS = [0.01, 0.05, 0.1, 0.2, 0.25, 0.5, 1, 2, 5, 10, 20, 50, 100, 1000]

type View = { xMin: number; xMax: number; yMin: number; yMax: number }

export default function FunctionPlotter({
  expressions,
  params,
  xMin: pxMin,
  xMax: pxMax,
  yMin: pyMin,
  yMax: pyMax,
  editable = true,
  showDerivative = false,
  xLabel = 'x',
  yLabel = 'y',
  title,
}: Props) {
  const paramDefs = useMemo(
    () =>
      (params ?? [])
        .filter((p) => p && typeof p.name === 'string' && /^[a-zA-Z_]+$/.test(p.name) && p.name !== 'x')
        .map((p) => {
          const min = p.min ?? -5
          const max = p.max ?? 5
          return { name: p.name, min, max, step: p.step ?? (max - min) / 100, value: p.value ?? (min + max) / 2, label: p.label }
        }),
    [params],
  )
  const vars = useMemo(() => ['x', ...paramDefs.map((p) => p.name)], [paramDefs])

  const [exprs, setExprs] = useState<string[]>(() => (expressions && expressions.length ? expressions.slice(0, MAX_CURVES) : ['x^2 - 2', '0.5x + 1']))
  const [vals, setVals] = useState<Record<string, number>>(() => Object.fromEntries(paramDefs.map((p) => [p.name, p.value])))
  const [deriv, setDeriv] = useState(showDerivative)

  const compiled = useMemo(() => exprs.map((e) => compileExpr(e, vars)), [exprs, vars])
  const fns = useMemo(
    () =>
      compiled.map((c) => {
        if (!c.ok) return null
        const fn = c.fn
        return (x: number) => fn({ ...vals, x })
      }),
    [compiled, vals],
  )

  const dNodes = useMemo(() => compiled.map((c) => (c.ok ? diff(c.node) : null)), [compiled])
  const dfns = useMemo(
    () =>
      dNodes.map((n, i) => {
        if (!n) return null
        const g = toFn(n)
        const f = fns[i]!
        // dérivée symbolique ; repli numérique si la formule n'est pas évaluable
        return (x: number) => {
          const v = g({ ...vals, x })
          return Number.isFinite(v) ? v : Number.isFinite(f(x)) ? derivative(f, x) : NaN
        }
      }),
    [dNodes, fns, vals],
  )

  const initialView = useMemo<View>(() => {
    const xMin = pxMin ?? -5
    const xMax = pxMax ?? (pxMin !== undefined ? pxMin + 10 : 5)
    let yMin = pyMin
    let yMax = pyMax
    if (yMin === undefined || yMax === undefined) {
      const fs = fns.filter((f): f is (x: number) => number => !!f)
      const [lo, hi] = autoYRange(fs, xMin, xMax, [-4, 6])
      yMin = yMin ?? lo
      yMax = yMax ?? hi
    }
    if (!(yMax > yMin)) yMax = yMin + 10
    return { xMin, xMax: xMax > xMin ? xMax : xMin + 10, yMin, yMax }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pxMin, pxMax, pyMin, pyMax])
  const [view, setView] = useState<View>(initialView)

  const [cursor, setCursor] = useState<number>(() => {
    const mid = (initialView.xMin + initialView.xMax) / 2
    const span = initialView.xMax - initialView.xMin
    return snap(mid + span * 0.15, STEPS.find((s) => s >= span / 50) ?? 1)
  })

  const spanX = view.xMax - view.xMin
  const cursorStep = STEPS.find((s) => s >= spanX / 200) ?? 1

  // tableau de valeurs
  const [tableStep, setTableStep] = useState<number>(() => STEPS.find((s) => s >= (initialView.xMax - initialView.xMin) / 8) ?? 1)
  const tableStart = Math.ceil(view.xMin / tableStep - 1e-9) * tableStep
  const tableXs = Array.from({ length: 9 }, (_, i) => +(tableStart + i * tableStep).toPrecision(10))

  const zoom = (k: number) => {
    const cx = (view.xMin + view.xMax) / 2
    const cy = (view.yMin + view.yMax) / 2
    const hx = ((view.xMax - view.xMin) / 2) * k
    const hy = ((view.yMax - view.yMin) / 2) * k
    setView({ xMin: cx - hx, xMax: cx + hx, yMin: cy - hy, yMax: cy + hy })
  }
  const fitY = () => {
    const fs = fns.filter((f): f is (x: number) => number => !!f)
    const [yMin, yMax] = autoYRange(fs, view.xMin, view.xMax, [view.yMin, view.yMax])
    setView({ ...view, yMin, yMax })
  }

  const setExpr = (i: number, v: string) => setExprs((es) => es.map((e, j) => (j === i ? v : e)))
  const addExpr = () => setExprs((es) => (es.length < MAX_CURVES ? [...es, ''] : es))
  const removeExpr = (i: number) => setExprs((es) => es.filter((_, j) => j !== i))

  const values = fns.map((f) => (f ? f(cursor) : NaN))
  const slopes = dfns.map((d) => (d ? d(cursor) : NaN))
  const valid = fns.map((f, i) => !!f && exprs[i].trim() !== '')

  const texLabel = (i: number) => {
    const c = compiled[i]
    if (!c.ok) return null
    const used = [...usedVars(c.node)].filter((v) => v !== 'x')
    if (!used.length) return c.tex
    return `${c.tex} = ${toTex(c.node, { subst: vals })}`
  }

  // phrase d'interprétation
  const interp = (() => {
    const ok = values.map((v, i) => valid[i] && Number.isFinite(v))
    const xs = fmt(cursor, 3)
    const idx = valid.map((v, i) => (v ? i : -1)).filter((i) => i >= 0)
    if (!idx.length) return <>Saisissez une expression en fonction de x (ex. <code className="font-mono">x^2 - 3x + 1</code>).</>
    const i0 = idx[0]
    const n0 = NAMES[i0]
    if (!ok[i0]) return <>La fonction {n0} n’est pas définie en x = {xs} (division par zéro, racine ou logarithme d’un nombre négatif…).</>
    const v = values[i0]
    const s = slopes[i0]
    const parts: React.ReactNode[] = []
    parts.push(
      <span key="a">
        Le point de coordonnées ({xs} ; {fmt(v, 3)}) appartient à la courbe de {n0} : {n0}({xs}) = {fmt(v, 3)}
        {Math.abs(v) < 1e-9 ? ', donc ' + xs + ' est un zéro de ' + n0 : v > 0 ? ', la courbe est au-dessus de l’axe des abscisses' : ', la courbe est sous l’axe des abscisses'}.
      </span>,
    )
    if (Number.isFinite(s))
      parts.push(
        <span key="b">
          {' '}
          Pente de la tangente ≈ {fmt(s, 3)} : {Math.abs(s) < 1e-6 ? 'tangente horizontale (extremum possible).' : s > 0 ? `${n0} est croissante au voisinage de ${xs}.` : `${n0} est décroissante au voisinage de ${xs}.`}
        </span>,
      )
    if (idx.length > 1 && ok[idx[1]]) {
      const i1 = idx[1]
      const d = v - values[i1]
      parts.push(
        <span key="c">
          {' '}
          {Math.abs(d) < 1e-6 ? `Les courbes de ${n0} et ${NAMES[i1]} se coupent ici.` : `La courbe de ${n0} est ${d > 0 ? 'au-dessus' : 'en dessous'} de celle de ${NAMES[i1]} (écart ${fmt(Math.abs(d), 3)}).`}
        </span>,
      )
    }
    return parts
  })()

  const yOf = (v: number) => (Number.isFinite(v) && v >= view.yMin && v <= view.yMax ? v : null)

  return (
    <WidgetFrame
      title={title ?? 'Traceur de courbes'}
      subtitle="Saisissez des expressions, faites glisser le curseur sur le graphique"
      footer={<Interpretation>{interp}</Interpretation>}
      controls={
        <>
          <div className="flex flex-col gap-3">
            <Label>Fonctions</Label>
            {exprs.map((e, i) =>
              editable ? (
                <ExprField
                  key={i}
                  value={e}
                  onChange={(v) => setExpr(i, v)}
                  color={SERIES[i % SERIES.length]}
                  error={e.trim() === '' ? null : compiled[i].ok ? null : (compiled[i] as { error: string }).error}
                  tex={texLabel(i)}
                  prefix={`${NAMES[i]}(x)`}
                  placeholder="ex. x^2 - 3x + 1"
                  onRemove={exprs.length > 1 ? () => removeExpr(i) : undefined}
                />
              ) : (
                <div key={i} className="flex items-center gap-2 overflow-x-auto text-sm">
                  <span className="size-2.5 shrink-0" style={{ background: SERIES[i % SERIES.length] }} />
                  {compiled[i].ok ? <Tex>{`${NAMES[i]}(x) = ${texLabel(i)}`}</Tex> : <span className="text-destructive">Expression invalide</span>}
                </div>
              ),
            )}
            {editable && exprs.length < MAX_CURVES && (
              <Button variant="outline" size="sm" onClick={addExpr}>
                <Plus /> Ajouter une courbe
              </Button>
            )}
            {editable && <p className="text-[11px] leading-snug text-muted-foreground">Syntaxe : 2x, x^2, sqrt(x), exp(x), ln(x), sin(x), |x|, pi. Virgule ou point décimal.</p>}
          </div>
          {paramDefs.length > 0 && (
            <div className="flex flex-col gap-3">
              <Label>Paramètres</Label>
              {paramDefs.map((p) => (
                <Slider
                  key={p.name}
                  label={
                    <span>
                      <Tex>{p.name.length > 1 ? `\\mathrm{${p.name}}` : p.name}</Tex>
                      {p.label ? ` — ${p.label}` : ''}
                    </span>
                  }
                  value={vals[p.name] ?? p.value}
                  min={p.min}
                  max={p.max}
                  step={p.step}
                  digits={Math.max(0, Math.min(4, -Math.floor(Math.log10(p.step || 1))))}
                  onChange={(v) => setVals((o) => ({ ...o, [p.name]: v }))}
                />
              ))}
            </div>
          )}
          <div className="flex flex-col gap-3">
            <Label>Affichage</Label>
            <Switch checked={deriv} onChange={setDeriv} label="Afficher les fonctions dérivées (pointillés)" />
            <Slider label="Abscisse du curseur x₀" value={cursor} min={view.xMin} max={view.xMax} step={cursorStep} digits={3} onChange={setCursor} />
            <div className="flex flex-wrap gap-1.5">
              <Button variant="outline" size="xs" onClick={() => zoom(1 / 1.5)} aria-label="Zoom avant">
                <ZoomIn /> Zoom
              </Button>
              <Button variant="outline" size="xs" onClick={() => zoom(1.5)} aria-label="Zoom arrière">
                <ZoomOut />
              </Button>
              <Button variant="outline" size="xs" onClick={fitY} title="Ajuster l’axe des ordonnées aux courbes">
                <MoveVertical /> Ajuster y
              </Button>
              <Button variant="outline" size="xs" onClick={() => setView(initialView)} title="Fenêtre initiale">
                <RotateCcw />
              </Button>
            </div>
          </div>
        </>
      }
    >
      <Plot
        xMin={view.xMin}
        xMax={view.xMax}
        yMin={view.yMin}
        yMax={view.yMax}
        xLabel={xLabel}
        yLabel={yLabel}
        onPointer={(x) => setCursor(snap(Math.min(view.xMax, Math.max(view.xMin, x)), cursorStep))}
      >
        <Line vertical={cursor} color={PALETTE.muted} width={1} dashed />
        {fns.map((f, i) =>
          f && valid[i] ? (
            <g key={i}>
              {deriv && dfns[i] && <FunctionPath f={dfns[i]!} color={SERIES[i % SERIES.length]} width={1.5} dashed />}
              <FunctionPath f={f} color={SERIES[i % SERIES.length]} width={2.25} />
            </g>
          ) : null,
        )}
        {fns.map((f, i) => {
          if (!f || !valid[i]) return null
          const y = yOf(values[i])
          const yd = deriv ? yOf(slopes[i]) : null
          const c = SERIES[i % SERIES.length]
          return (
            <g key={'p' + i}>
              {yd !== null && <Point x={cursor} y={yd} color={c} r={3} label={`${NAMES[i]}′`} />}
              {y !== null && <Point x={cursor} y={y} color={c} label={NAMES[i]} />}
            </g>
          )
        })}
        <PlotText x={cursor} y={view.yMin} dy={-6} dx={4} color={PALETTE.muted} size={10}>
          x₀ = {fmt(cursor, 3)}
        </PlotText>
      </Plot>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {fns.map((f, i) =>
          f && valid[i] ? (
            <Stat
              key={i}
              label={
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2" style={{ background: SERIES[i % SERIES.length] }} />
                  {NAMES[i]}({fmt(cursor, 3)}){deriv ? ` · ${NAMES[i]}′` : ''}
                </span>
              }
              value={
                <>
                  {Number.isFinite(values[i]) ? fmt(values[i], 4) : 'non définie'}
                  {deriv && Number.isFinite(slopes[i]) && <span className="text-muted-foreground"> · {fmt(slopes[i], 3)}</span>}
                </>
              }
            />
          ) : null,
        )}
      </div>

      <div className="mt-3">
        <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Tableau de valeurs</span>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            pas
            <Select value={String(tableStep)} onChange={(e) => setTableStep(parseFloat(e.target.value))} className="h-7 text-xs">
              {STEPS.map((s) => (
                <option key={s} value={s}>
                  {fmt(s, 2)}
                </option>
              ))}
            </Select>
          </label>
        </div>
        <div className="overflow-x-auto border">
          <table className="w-full border-collapse font-mono text-xs tabular-nums">
            <tbody>
              <tr className="bg-muted/40">
                <th className="border-r px-2 py-1 text-left font-semibold">
                  <Tex>x</Tex>
                </th>
                {tableXs.map((x) => (
                  <td key={x} className="border-r px-2 py-1 text-right last:border-r-0">
                    {fmt(x, 3)}
                  </td>
                ))}
              </tr>
              {fns.map((f, i) =>
                f && valid[i] ? (
                  <tr key={i} className="border-t">
                    <th className="border-r px-2 py-1 text-left font-semibold" style={{ color: SERIES[i % SERIES.length] }}>
                      <Tex>{`${NAMES[i]}(x)`}</Tex>
                    </th>
                    {tableXs.map((x) => {
                      const y = f(x)
                      return (
                        <td key={x} className="border-r px-2 py-1 text-right last:border-r-0">
                          {Number.isFinite(y) ? fmt(y, 3) : '—'}
                        </td>
                      )
                    })}
                  </tr>
                ) : null,
              )}
            </tbody>
          </table>
        </div>
        {deriv && (
          <div className="mt-2 flex flex-col gap-1 overflow-x-auto text-sm">
            {dNodes.map((n, i) =>
              n && valid[i] ? (
                <div key={i} className="flex items-center gap-2">
                  <span className="size-2 shrink-0" style={{ background: SERIES[i % SERIES.length] }} />
                  <Tex>{`${NAMES[i]}'(x) = ${toTex(n)}`}</Tex>
                </div>
              ) : null,
            )}
          </div>
        )}
        {deriv && (
          <p className="mt-2 text-xs text-muted-foreground">
            Les courbes en pointillés représentent les dérivées <Tex>{"f'"}</Tex> : là où <Tex>{"f'(x) > 0"}</Tex>, la fonction est croissante ; là où{' '}
            <Tex>{"f'(x) = 0"}</Tex>, la tangente est horizontale. En <Tex>{`x_0 = ${texNum(cursor, 3)}`}</Tex>, le point de la dérivée a pour ordonnée la pente de la tangente.
          </p>
        )}
      </div>
    </WidgetFrame>
  )
}
