import { useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/input'
import { Stat, Switch } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { Plot, FunctionPath, Line, Segment, PALETTE } from '@/lib/plot'
import { fmt } from '@/lib/utils'
import { autoYRange, compileExpr, derivative, diff, isDifferentiableAt, texNum, toFn, toTex } from './_maths1/expr'
import { ExprField, Handle, Interpretation, PlotText, pxDist, snap } from './_maths1/ui'

interface Props {
  expression?: string
  a?: number
  h?: number
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
  editable?: boolean
  title?: string
}

const W = 560
const H = 360
const H_TABLE = [1, 0.5, 0.1, 0.01, 0.001]

/** coefficient en LaTeX pour « y = m x + p » */
function lineTex(m: number, p: number) {
  const mm = Math.abs(m) < 5e-5 ? 0 : m
  const pp = Math.abs(p) < 5e-5 ? 0 : p
  let s = ''
  if (mm !== 0) s = Math.abs(mm - 1) < 5e-5 ? 'x' : Math.abs(mm + 1) < 5e-5 ? '-x' : `${texNum(mm, 4)}x`
  if (pp !== 0 || !s) s += s ? (pp > 0 ? ` + ${texNum(pp, 4)}` : ` - ${texNum(-pp, 4)}`) : texNum(pp, 4)
  return `y = ${s}`
}
const par = (v: number, d = 3) => (v < 0 ? `\\left(${texNum(v, d)}\\right)` : texNum(v, d))

export default function TangentExplorer({ expression = 'x^2', a: a0 = 1, h: h0 = 1.5, xMin: pxMin, xMax: pxMax, yMin: pyMin, yMax: pyMax, editable = true, title }: Props) {
  const [expr, setExpr] = useState(expression)
  const [a, setA] = useState(a0)
  const [h, setH] = useState(h0 === 0 ? 1 : h0)
  const [showSec, setShowSec] = useState(true)
  const [showTan, setShowTan] = useState(true)
  const [playing, setPlaying] = useState(false)
  const drag = useRef<'A' | 'M' | null>(null)
  const [active, setActive] = useState<'A' | 'M' | null>(null)

  const compiled = useMemo(() => compileExpr(expr, ['x']), [expr])
  const [last, setLast] = useState(compiled.ok ? compiled : compileExpr('x^2'))
  useEffect(() => {
    if (compiled.ok) setLast(compiled)
  }, [compiled])
  const cur = compiled.ok ? compiled : last
  const f = useMemo(() => {
    const fn = cur.ok ? cur.fn : () => NaN
    return (x: number) => fn({ x })
  }, [cur])
  const dNode = useMemo(() => (cur.ok ? diff(cur.node) : null), [cur])
  const fp = useMemo(() => {
    const g = dNode ? toFn(dNode) : null
    return (x: number) => {
      const v = g ? g({ x }) : NaN
      return Number.isFinite(v) ? v : derivative(f, x)
    }
  }, [dNode, f])

  const xMin = pxMin ?? -5
  const xMax = pxMax ?? (pxMin !== undefined ? pxMin + 10 : 5)
  const [yMin, yMax] = useMemo(() => {
    if (pyMin !== undefined && pyMax !== undefined) return [pyMin, pyMax]
    const [lo, hi] = autoYRange([f], xMin, xMax, [-4, 6])
    return [pyMin ?? lo, pyMax ?? hi]
    // le cadrage suit la fonction saisie
  }, [f, xMin, xMax, pyMin, pyMax])
  const view = { xMin, xMax, yMin, yMax, width: W, height: H }

  // animation h -> 0 (décroissance géométrique de h)
  const hRef = useRef(h)
  hRef.current = h
  useEffect(() => {
    if (!playing) return
    let raf = 0
    let t0 = performance.now()
    const tick = (t: number) => {
      const dt = Math.min(64, t - t0)
      t0 = t
      const v = hRef.current
      const nv = v * Math.pow(0.35, dt / 1000)
      if (Math.abs(nv) < 0.001) {
        setH(Math.sign(v) * 0.001)
        setPlaying(false)
        return
      }
      setH(nv)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  const fa = f(a)
  const fah = f(a + h)
  const tau = (fah - fa) / h
  const dOk = isDifferentiableAt(f, a)
  const m = fp(a)
  const p = fa - m * a
  const defined = Number.isFinite(fa)

  const onPointer = (x: number, y: number, kind: 'down' | 'move' | 'up') => {
    if (kind === 'up') {
      drag.current = null
      setActive(null)
      return
    }
    if (kind === 'down') {
      setPlaying(false)
      const dA = pxDist(view, x, y, a, fa)
      const dM = pxDist(view, x, y, a + h, fah)
      drag.current = dM < 22 && dM < dA ? 'M' : 'A'
      setActive(drag.current)
    }
    const xs = snap(Math.max(xMin, Math.min(xMax, x)), 0.01)
    if (drag.current === 'A') setA(xs)
    else if (drag.current === 'M') {
      let nh = snap(xs - a, 0.001)
      if (Math.abs(nh) < 0.001) nh = h > 0 ? 0.001 : -0.001
      setH(nh)
    }
  }

  const hAbsDigits = Math.abs(h) < 0.01 ? 4 : 3
  const fmtA = texNum(a, 2)
  const fmtAH = texNum(a + h, hAbsDigits)

  const interp = !defined ? (
    <>
      La fonction n’est pas définie en <Tex>{`a = ${fmtA}`}</Tex> : choisissez une autre valeur de <Tex>a</Tex>.
    </>
  ) : !dOk ? (
    <>
      En <Tex>{`a = ${fmtA}`}</Tex>, les taux d’accroissement à gauche (<Tex>{'h<0'}</Tex>) et à droite (<Tex>{'h>0'}</Tex>) ne tendent pas vers la même valeur :{' '}
      <strong>f n’est pas dérivable en a</strong>, la courbe n’admet pas de tangente (non verticale) bien définie en ce point.
    </>
  ) : (
    <>
      Quand <Tex>h</Tex> tend vers 0, le point <Tex>M</Tex> se rapproche de <Tex>A</Tex> et la sécante <Tex>(AM)</Tex> pivote vers la tangente : son coefficient directeur{' '}
      <Tex>{`\\tau(h) = ${texNum(tau, 4)}`}</Tex> tend vers le nombre dérivé <Tex>{`f'(${fmtA}) ${Math.abs(m - +m.toFixed(4)) < 1e-9 ? '=' : '\\approx'} ${texNum(m, 4)}`}</Tex>.{' '}
      {Math.abs(m) < 5e-5 ? 'La tangente est horizontale : extremum local possible.' : m > 0 ? 'Pente positive : f est croissante au voisinage de a.' : 'Pente négative : f est décroissante au voisinage de a.'}
    </>
  )

  return (
    <WidgetFrame
      title={title ?? 'De la sécante à la tangente'}
      subtitle="Faites glisser A le long de la courbe, ou M pour régler h"
      footer={<Interpretation>{interp}</Interpretation>}
      controls={
        <>
          {editable ? (
            <ExprField label="Fonction f" value={expr} onChange={setExpr} error={compiled.ok ? null : compiled.error} tex={compiled.ok ? compiled.tex : null} prefix="f(x)" color={PALETTE.blue} placeholder="ex. x^3 - 3x" />
          ) : (
            <Tex>{`f(x) = ${cur.ok ? cur.tex : ''}`}</Tex>
          )}
          {dNode && (
            <div className="-mt-2 overflow-x-auto text-sm text-muted-foreground">
              <Tex>{`f'(x) = ${toTex(dNode)}`}</Tex>
            </div>
          )}
          <Slider label={<Tex>a</Tex>} value={a} min={xMin} max={xMax} step={0.01} digits={2} onChange={(v) => setA(v)} />
          <Slider
            label={<Tex>h</Tex>}
            value={h}
            min={-3}
            max={3}
            step={0.001}
            digits={hAbsDigits}
            onChange={(v) => {
              setPlaying(false)
              setH(Math.abs(v) < 0.001 ? (h >= 0 ? 0.001 : -0.001) : v)
            }}
          />
          <div className="flex flex-wrap gap-1.5">
            <Button size="sm" onClick={() => {
                if (Math.abs(h) <= 0.0011) {
                  setH(h0 === 0 ? 1.5 : h0)
                  setPlaying(true)
                } else setPlaying((v) => !v)
              }}>
              {playing ? <Pause /> : <Play />} {playing ? 'Pause' : 'h → 0'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setPlaying(false)
                setH(h0 === 0 ? 1 : h0)
              }}
            >
              <RotateCcw /> h initial
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Affichage</Label>
            <Switch checked={showSec} onChange={setShowSec} label="Sécante (AM)" />
            <Switch checked={showTan} onChange={setShowTan} label="Tangente en A" />
          </div>
        </>
      }
    >
      <Plot xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} width={W} height={H} onPointer={onPointer}>
        <FunctionPath f={f} color={PALETTE.blue} width={2.5} />
        {defined && showTan && dOk && <Line m={m} p={p} color={PALETTE.red} width={1.75} />}
        {defined && showSec && Number.isFinite(tau) && <Line m={tau} p={fa - tau * a} color={PALETTE.green} width={1.5} dashed />}
        {defined && Number.isFinite(fah) && (
          <>
            <Segment x1={a} y1={fa} x2={a + h} y2={fa} color={PALETTE.muted} width={1} dashed />
            <Segment x1={a + h} y1={fa} x2={a + h} y2={fah} color={PALETTE.muted} width={1} dashed />
            {Math.abs(h) > (xMax - xMin) / 25 && (
              <PlotText x={a + h / 2} y={fa} dy={fah >= fa ? 14 : -6} anchor="middle" color={PALETTE.muted} size={10}>
                h
              </PlotText>
            )}
            <Handle x={a + h} y={fah} color={PALETTE.green} label="M" active={active === 'M'} />
          </>
        )}
        {defined && <Handle x={a} y={fa} color={PALETTE.orange} label="A" active={active === 'A'} dx={-16} />}
      </Plot>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="f(a)" value={fmt(fa, 4)} />
        <Stat label="h" value={fmt(h, hAbsDigits + 1)} />
        <Stat label="Taux τ(h)" value={fmt(tau, 4)} tone="success" />
        <Stat label="f′(a)" value={dOk ? fmt(m, 4) : 'non dérivable'} tone={dOk ? 'destructive' : 'warning'} />
      </div>

      <div className="mt-3 flex flex-col gap-1.5 overflow-x-auto border bg-muted/20 p-3 text-sm">
        <Tex>{`\\tau(h) = \\dfrac{f(a+h) - f(a)}{h} = \\dfrac{f(${fmtAH}) - f(${fmtA})}{${texNum(h, hAbsDigits + 1)}} = \\dfrac{${texNum(fah, 4)} - ${par(fa, 4)}}{${texNum(h, hAbsDigits + 1)}} \\approx ${texNum(tau, 4)}`}</Tex>
        {dOk && defined && (
          <>
            <Tex>{`f'(${fmtA}) = \\lim_{h \\to 0} \\tau(h) \\approx ${texNum(m, 4)}`}</Tex>
            <Tex>{`T_A : y = f'(a)(x - a) + f(a) \\iff ${lineTex(m, p)}`}</Tex>
          </>
        )}
      </div>

      {defined && (
        <div className="mt-3 overflow-x-auto border">
          <table className="w-full border-collapse font-mono text-xs tabular-nums">
            <tbody>
              <tr className="bg-muted/40">
                <th className="border-r px-2 py-1 text-left font-semibold">h</th>
                {H_TABLE.flatMap((v) => [v, -v]).map((v) => (
                  <td key={v} className="border-r px-2 py-1 text-right last:border-r-0">
                    {fmt(v, 3)}
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <th className="border-r px-2 py-1 text-left font-semibold">τ(h)</th>
                {H_TABLE.flatMap((v) => [v, -v]).map((v) => {
                  const t = (f(a + v) - fa) / v
                  return (
                    <td key={v} className="border-r px-2 py-1 text-right last:border-r-0">
                      {Number.isFinite(t) ? fmt(t, 4) : '—'}
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </WidgetFrame>
  )
}
