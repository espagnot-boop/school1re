import { useEffect, useRef } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fmt } from '@/lib/utils'

/** Boucle requestAnimationFrame : cb(dt en s) appelé tant que `running`. dt plafonné à 50 ms. */
export function useAnimationFrame(cb: (dt: number) => void, running: boolean) {
  const cbRef = useRef(cb)
  cbRef.current = cb
  useEffect(() => {
    if (!running) return
    let raf = 0
    let last = performance.now()
    const loop = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000))
      last = now
      cbRef.current(dt)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [running])
}

/** Boutons lecture / pause / réinitialiser. */
export function PlayControls({
  playing,
  onToggle,
  onReset,
  children,
}: {
  playing: boolean
  onToggle: () => void
  onReset?: () => void
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" onClick={onToggle} aria-label={playing ? 'Pause' : 'Lecture'}>
        {playing ? <Pause /> : <Play />}
        {playing ? 'Pause' : 'Lecture'}
      </Button>
      {onReset && (
        <Button size="sm" variant="outline" onClick={onReset} aria-label="Réinitialiser">
          <RotateCcw />
          Réinitialiser
        </Button>
      )}
      {children}
    </div>
  )
}

/** Flèche SVG (coordonnées pixels). */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = 'hsl(var(--foreground))',
  width = 2,
  head = 9,
  dashed,
  opacity,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
  width?: number
  head?: number
  dashed?: boolean
  opacity?: number
}) {
  const L = Math.hypot(x2 - x1, y2 - y1)
  if (!(L > 0.5) || !Number.isFinite(L)) return null
  const a = Math.atan2(y2 - y1, x2 - x1)
  const h = Math.min(head, L * 0.6)
  const bx = x2 - h * 0.8 * Math.cos(a)
  const by = y2 - h * 0.8 * Math.sin(a)
  return (
    <g opacity={opacity}>
      <line x1={x1} y1={y1} x2={bx} y2={by} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '5 4' : undefined} />
      <path
        d={`M${x2},${y2} L${x2 - h * Math.cos(a - 0.38)},${y2 - h * Math.sin(a - 0.38)} L${x2 - h * Math.cos(a + 0.38)},${y2 - h * Math.sin(a + 0.38)} Z`}
        fill={color}
      />
    </g>
  )
}

/** Libellé de vecteur en SVG : lettre + petite flèche au-dessus (ex. F⃗A/B). */
export function VecLabel({
  x,
  y,
  name,
  sub,
  color = 'hsl(var(--foreground))',
  size = 13,
  anchor = 'start',
}: {
  x: number
  y: number
  name: string
  sub?: string
  color?: string
  size?: number
  anchor?: 'start' | 'middle' | 'end'
}) {
  const w = name.length * size * 0.62
  const subW = sub ? sub.length * size * 0.45 : 0
  const total = w + subW
  const x0 = anchor === 'start' ? x : anchor === 'middle' ? x - total / 2 : x - total
  const ay = y - size * 0.95
  return (
    <g fill={color} fontFamily="Geist, sans-serif" fontWeight={600}>
      <text x={x0} y={y} fontSize={size} fontStyle="italic">
        {name}
      </text>
      {sub && (
        <text x={x0 + w} y={y + size * 0.3} fontSize={size * 0.7}>
          {sub}
        </text>
      )}
      <line x1={x0} y1={ay} x2={x0 + w - 1} y2={ay} stroke={color} strokeWidth={1.1} />
      <path d={`M${x0 + w - 4},${ay - 2.5} L${x0 + w},${ay} L${x0 + w - 4},${ay + 2.5}`} fill="none" stroke={color} strokeWidth={1.1} />
    </g>
  )
}

/** Nombre au format français pour KaTeX : 1 013,2 -> 1\,013{,}2 */
export function texNum(x: number, digits = 2): string {
  return fmt(x, digits)
    .replace(/[\s  ]/g, '\\,')
    .replace(',', '{,}')
    .replace('−', '-')
}

/** Écriture scientifique : renvoie { m, e } avec 1 ≤ |m| < 10 */
export function sciParts(x: number, sig = 3) {
  if (x === 0 || !Number.isFinite(x)) return { m: x, e: 0 }
  let e = Math.floor(Math.log10(Math.abs(x)))
  let m = x / 10 ** e
  const r = Number(m.toFixed(sig - 1))
  if (Math.abs(r) >= 10) {
    e += 1
    m = r / 10
  } else m = r
  return { m, e }
}

/** Écriture scientifique en TeX : 1{,}23 \times 10^{-5} (sans puissance si 0,01 ≤ |x| < 10 000) */
export function texSci(x: number, sig = 3): string {
  if (x === 0) return '0'
  if (!Number.isFinite(x)) return '\\infty'
  const ax = Math.abs(x)
  if (ax >= 0.01 && ax < 10000) {
    const d = Math.max(0, sig - 1 - Math.floor(Math.log10(ax)))
    return texNum(x, Math.min(d, 6))
  }
  const { m, e } = sciParts(x, sig)
  return `${texNum(m, sig - 1)} \\times 10^{${e}}`
}

const SUP: Record<string, string> = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' }

/** Écriture scientifique en texte brut : « 1,23 × 10⁻⁵ » */
export function sciText(x: number, sig = 3): string {
  if (x === 0) return '0'
  if (!Number.isFinite(x)) return '∞'
  const ax = Math.abs(x)
  if (ax >= 0.01 && ax < 10000) {
    const d = Math.max(0, sig - 1 - Math.floor(Math.log10(ax)))
    return fmt(x, Math.min(d, 6))
  }
  const { m, e } = sciParts(x, sig)
  return `${fmt(m, sig - 1)} × 10${String(e)
    .split('')
    .map((c) => SUP[c] ?? c)
    .join('')}`
}

/** Petite phrase d'interprétation encadrée. */
export function Note({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-6 text-muted-foreground">{children}</p>
}

export const FONT = 'Geist, sans-serif'
export const MONO = 'Geist Mono, monospace'
