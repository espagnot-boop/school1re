import { createContext, useContext, useMemo, useRef, useCallback } from 'react'

/**
 * Repère SVG réutilisable pour les widgets.
 *
 * <Plot xMin={-5} xMax={5} yMin={-3} yMax={3}>
 *   <FunctionPath f={(x) => x * x} />
 *   <Point x={1} y={1} label="A" />
 * </Plot>
 * Les enfants récupèrent la transformation via usePlot().
 */
export interface PlotCtx {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  width: number
  height: number
  sx: (x: number) => number // x math -> px
  sy: (y: number) => number // y math -> px
  ix: (px: number) => number // px -> x math
  iy: (py: number) => number
}

const Ctx = createContext<PlotCtx | null>(null)
export const usePlot = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error('usePlot doit être utilisé dans <Plot>')
  return c
}

export const PALETTE = {
  blue: 'hsl(217 91% 60%)',
  red: 'hsl(0 84% 60%)',
  green: 'hsl(142 71% 45%)',
  orange: 'hsl(25 95% 53%)',
  violet: 'hsl(263 70% 60%)',
  pink: 'hsl(330 81% 60%)',
  teal: 'hsl(173 80% 40%)',
  yellow: 'hsl(45 93% 47%)',
  fg: 'hsl(var(--foreground))',
  muted: 'hsl(var(--muted-foreground))',
  grid: 'hsl(var(--border))',
}
export const SERIES = [PALETTE.blue, PALETTE.red, PALETTE.green, PALETTE.orange, PALETTE.violet, PALETTE.pink, PALETTE.teal]

function niceStep(range: number) {
  const raw = range / 8
  const p = Math.pow(10, Math.floor(Math.log10(raw)))
  const m = raw / p
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p
}

export function Plot({
  xMin,
  xMax,
  yMin,
  yMax,
  width = 560,
  height = 360,
  grid = true,
  axes = true,
  labels = true,
  xStep,
  yStep,
  xLabel,
  yLabel,
  children,
  onPointer,
  className,
}: {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  width?: number
  height?: number
  grid?: boolean
  axes?: boolean
  labels?: boolean
  xStep?: number
  yStep?: number
  xLabel?: string
  yLabel?: string
  children?: React.ReactNode
  /** appelé avec les coordonnées math lors d'un pointerdown/move (bouton enfoncé) */
  onPointer?: (x: number, y: number, kind: 'down' | 'move' | 'up') => void
  className?: string
}) {
  const ref = useRef<SVGSVGElement>(null)
  const ctx = useMemo<PlotCtx>(() => {
    const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * width
    const sy = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height
    const ix = (px: number) => xMin + (px / width) * (xMax - xMin)
    const iy = (py: number) => yMin + ((height - py) / height) * (yMax - yMin)
    return { xMin, xMax, yMin, yMax, width, height, sx, sy, ix, iy }
  }, [xMin, xMax, yMin, yMax, width, height])

  const toMath = useCallback(
    (e: React.PointerEvent) => {
      const r = ref.current!.getBoundingClientRect()
      const px = ((e.clientX - r.left) / r.width) * width
      const py = ((e.clientY - r.top) / r.height) * height
      return [ctx.ix(px), ctx.iy(py)] as const
    },
    [ctx, width, height],
  )

  const dx = xStep ?? niceStep(xMax - xMin)
  const dy = yStep ?? niceStep(yMax - yMin)
  const xs: number[] = []
  for (let v = Math.ceil(xMin / dx) * dx; v <= xMax + 1e-9; v += dx) xs.push(+v.toFixed(10))
  const ys: number[] = []
  for (let v = Math.ceil(yMin / dy) * dy; v <= yMax + 1e-9; v += dy) ys.push(+v.toFixed(10))
  const x0 = Math.min(Math.max(ctx.sx(0), 0), width)
  const y0 = Math.min(Math.max(ctx.sy(0), 0), height)
  const fmtTick = (v: number) => (Math.abs(v) < 1e-9 ? '0' : Number(v.toPrecision(4)).toString().replace('.', ','))

  return (
    <Ctx.Provider value={ctx}>
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        className={className ?? 'h-auto w-full touch-none select-none border bg-background'}
        onPointerDown={
          onPointer
            ? (e) => {
                ;(e.target as Element).setPointerCapture?.(e.pointerId)
                const [x, y] = toMath(e)
                onPointer(x, y, 'down')
              }
            : undefined
        }
        onPointerMove={
          onPointer
            ? (e) => {
                if (e.buttons !== 1) return
                const [x, y] = toMath(e)
                onPointer(x, y, 'move')
              }
            : undefined
        }
        onPointerUp={
          onPointer
            ? (e) => {
                const [x, y] = toMath(e)
                onPointer(x, y, 'up')
              }
            : undefined
        }
      >
        {grid && (
          <g stroke={PALETTE.grid} strokeWidth={1} opacity={0.7}>
            {xs.map((v) => (
              <line key={'gx' + v} x1={ctx.sx(v)} x2={ctx.sx(v)} y1={0} y2={height} />
            ))}
            {ys.map((v) => (
              <line key={'gy' + v} y1={ctx.sy(v)} y2={ctx.sy(v)} x1={0} x2={width} />
            ))}
          </g>
        )}
        {axes && (
          <g stroke={PALETTE.fg} strokeWidth={1.25}>
            <line x1={0} x2={width} y1={y0} y2={y0} />
            <line y1={0} y2={height} x1={x0} x2={x0} />
            <path d={`M${width - 8},${y0 - 4} L${width},${y0} L${width - 8},${y0 + 4}`} fill="none" />
            <path d={`M${x0 - 4},8 L${x0},0 L${x0 + 4},8`} fill="none" />
          </g>
        )}
        {axes && labels && (
          <g fill={PALETTE.muted} fontSize={10} fontFamily="Geist Mono, monospace">
            {xs.map((v) =>
              Math.abs(v) < 1e-9 ? null : (
                <text key={'tx' + v} x={ctx.sx(v)} y={Math.min(y0 + 13, height - 3)} textAnchor="middle">
                  {fmtTick(v)}
                </text>
              ),
            )}
            {ys.map((v) =>
              Math.abs(v) < 1e-9 ? null : (
                <text key={'ty' + v} x={Math.max(x0 - 5, 22)} y={ctx.sy(v) + 3} textAnchor="end">
                  {fmtTick(v)}
                </text>
              ),
            )}
            <text x={Math.max(x0 - 5, 10)} y={Math.min(y0 + 13, height - 3)} textAnchor="end">
              0
            </text>
            {xLabel && (
              <text x={width - 4} y={y0 - 8} textAnchor="end" fill={PALETTE.fg}>
                {xLabel}
              </text>
            )}
            {yLabel && (
              <text x={x0 + 8} y={12} fill={PALETTE.fg}>
                {yLabel}
              </text>
            )}
          </g>
        )}
        {children}
      </svg>
    </Ctx.Provider>
  )
}

/** Courbe d'une fonction (gère les discontinuités / valeurs non finies). */
export function FunctionPath({ f, color = PALETTE.blue, width = 2, from, to, samples = 400, dashed }: { f: (x: number) => number; color?: string; width?: number; from?: number; to?: number; samples?: number; dashed?: boolean }) {
  const p = usePlot()
  const a = from ?? p.xMin
  const b = to ?? p.xMax
  let d = ''
  let pen = false
  const span = p.yMax - p.yMin
  for (let i = 0; i <= samples; i++) {
    const x = a + ((b - a) * i) / samples
    const y = f(x)
    if (!Number.isFinite(y) || y > p.yMax + span * 4 || y < p.yMin - span * 4) {
      pen = false
      continue
    }
    d += `${pen ? 'L' : 'M'}${p.sx(x).toFixed(2)},${p.sy(y).toFixed(2)}`
    pen = true
  }
  return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dashed ? '6 4' : undefined} />
}

export function Point({ x, y, label, color = PALETTE.fg, r = 4, dx = 6, dy = -6 }: { x: number; y: number; label?: string; color?: string; r?: number; dx?: number; dy?: number }) {
  const p = usePlot()
  return (
    <g>
      <rect x={p.sx(x) - r} y={p.sy(y) - r} width={r * 2} height={r * 2} fill={color} />
      {label && (
        <text x={p.sx(x) + dx} y={p.sy(y) + dy} fontSize={12} fill={color} fontFamily="Geist, sans-serif" fontWeight={600}>
          {label}
        </text>
      )}
    </g>
  )
}

export function Segment({ x1, y1, x2, y2, color = PALETTE.fg, width = 1.5, dashed, arrow }: { x1: number; y1: number; x2: number; y2: number; color?: string; width?: number; dashed?: boolean; arrow?: boolean }) {
  const p = usePlot()
  const X1 = p.sx(x1), Y1 = p.sy(y1), X2 = p.sx(x2), Y2 = p.sy(y2)
  const ang = Math.atan2(Y2 - Y1, X2 - X1)
  const h = 9
  return (
    <g stroke={color} strokeWidth={width} fill="none">
      <line x1={X1} y1={Y1} x2={X2} y2={Y2} strokeDasharray={dashed ? '5 4' : undefined} />
      {arrow && (
        <path
          d={`M${X2 - h * Math.cos(ang - 0.4)},${Y2 - h * Math.sin(ang - 0.4)} L${X2},${Y2} L${X2 - h * Math.cos(ang + 0.4)},${Y2 - h * Math.sin(ang + 0.4)}`}
          fill={color}
        />
      )}
    </g>
  )
}

/** Droite infinie y = m x + p (ou verticale si vertical=x0) */
export function Line({ m, p: q, vertical, color = PALETTE.fg, width = 1.5, dashed }: { m?: number; p?: number; vertical?: number; color?: string; width?: number; dashed?: boolean }) {
  const p = usePlot()
  if (vertical !== undefined) return <line x1={p.sx(vertical)} x2={p.sx(vertical)} y1={0} y2={p.height} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '5 4' : undefined} />
  const f = (x: number) => (m ?? 0) * x + (q ?? 0)
  return <line x1={p.sx(p.xMin)} y1={p.sy(f(p.xMin))} x2={p.sx(p.xMax)} y2={p.sy(f(p.xMax))} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '5 4' : undefined} />
}

/**
 * Évaluateur d'expressions sûr : compile("x^2 - 3*x + 1")(2) -> -1
 * Supporte + - * / ^, parenthèses, multiplication implicite (2x, 3(x+1), x(x-1)),
 * fonctions sin cos tan exp ln log sqrt abs floor, constantes pi e, et des paramètres nommés.
 */
export function compile(expr: string, params: string[] = []): ((x: number, vars?: Record<string, number>) => number) | null {
  try {
    const src = expr
      .replace(/\s+/g, '')
      .replace(/,/g, '.')
      .replace(/²/g, '^2')
      .replace(/³/g, '^3')
      .replace(/π/g, 'pi')
      .replace(/×/g, '*')
      .replace(/−/g, '-')
    const allowed = new Set(['x', 'pi', 'e', 'sin', 'cos', 'tan', 'exp', 'ln', 'log', 'sqrt', 'abs', 'floor', ...params])
    const tokens = src.match(/(\d+\.?\d*|\.\d+|[a-zA-Z_]+|[+\-*/^()])/g)
    if (!tokens || tokens.join('') !== src) return null
    const out: string[] = []
    let prev: string | null = null
    const isValueEnd = (t: string | null) => t !== null && (/^[\d.]/.test(t) || t === ')' || (/^[a-zA-Z_]+$/.test(t) && !FUNCS.has(t)))
    for (const t0 of tokens) {
      let t = t0
      if (/^[a-zA-Z_]+$/.test(t)) {
        // découpe "xx" -> x*x si non reconnu
        if (!allowed.has(t)) return null
      }
      const startsValue = /^[\d.]/.test(t) || t === '(' || /^[a-zA-Z_]+$/.test(t)
      if (isValueEnd(prev) && startsValue) out.push('*')
      if (t === '^') t = '**'
      else if (t === 'pi') t = 'Math.PI'
      else if (t === 'e') t = 'Math.E'
      else if (t === 'ln') t = 'Math.log'
      else if (t === 'log') t = 'Math.log10'
      else if (FUNCS.has(t)) t = 'Math.' + t
      else if (t !== 'x' && params.includes(t)) t = `v.${t}`
      out.push(t)
      prev = t0
    }
    // (-x)**2 : JS interdit "-x**2" ambigu -> on parenthèse les unaires avant **
    const body = out.join('').replace(/(^|[(*+/-])-([\w.]+(?:\([^()]*\))?)\*\*/g, '$1-1*$2**')
    // eslint-disable-next-line no-new-func
    const fn = new Function('x', 'v', `"use strict"; return (${body});`) as (x: number, v: Record<string, number>) => number
    fn(1, Object.fromEntries(params.map((p) => [p, 1])))
    return (x: number, vars: Record<string, number> = {}) => {
      try {
        const r = fn(x, vars)
        return typeof r === 'number' ? r : NaN
      } catch {
        return NaN
      }
    }
  } catch {
    return null
  }
}
const FUNCS = new Set(['sin', 'cos', 'tan', 'exp', 'sqrt', 'abs', 'floor', 'ln', 'log'])
