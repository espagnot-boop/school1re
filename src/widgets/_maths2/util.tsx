import type { ReactNode } from 'react'
import { usePlot, type PlotCtx } from '@/lib/plot'
import { fmt } from '@/lib/utils'

/** Accès direct au repère d'un <Plot> pour dessiner des éléments sur mesure. */
export function Layer({ children }: { children: (p: PlotCtx) => ReactNode }) {
  const p = usePlot()
  return <>{children(p)}</>
}

export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a))
  b = Math.abs(Math.round(b))
  while (b) [a, b] = [b, a % b]
  return a || 1
}

export const snap = (x: number, step: number) => Math.round(x / step) * step

/** Nombre au format français pour KaTeX : 1,5 -> 1{,}5 */
export function texNum(x: number, digits = 2): string {
  if (Math.abs(x) < 0.5 * 10 ** -digits) x = 0
  return fmt(x, digits)
    .replace(/[−]/g, '-')
    .replace(',', '{,}')
    .replace(/[\s  ]/g, '\\,')
}

/** Reconnaît une fraction p/q (q ≤ maxDen) ; renvoie [p, q] ou null. */
export function asFraction(x: number, maxDen = 64, tol = 1e-9): [number, number] | null {
  if (!Number.isFinite(x)) return null
  for (let q = 1; q <= maxDen; q++) {
    const p = Math.round(x * q)
    if (Math.abs(x - p / q) < tol) {
      const g = gcd(p, q)
      return [p / g, q / g]
    }
  }
  return null
}

/** LaTeX exact si x est une fraction simple, sinon décimal. */
export function fracTex(x: number, maxDen = 64, digits = 3): string {
  const f = asFraction(x, maxDen)
  if (!f) return texNum(x, digits)
  const [p, q] = f
  if (q === 1) return String(p)
  return `${p < 0 ? '-' : ''}\\frac{${Math.abs(p)}}{${q}}`
}

/** √n simplifié : a√b (n entier ≥ 0) */
function simplifySqrt(n: number): [number, number] {
  let a = 1
  let b = n
  for (let k = 2; k * k <= b; k++) {
    while (b % (k * k) === 0) {
      b /= k * k
      a *= k
    }
  }
  return [a, b]
}

/**
 * Racine exacte de n2 quand n2 est rationnel « simple » (dénominateur ≤ 16) :
 * sqrtTex(8) -> 2\sqrt{2}, sqrtTex(1.25) -> \frac{\sqrt{5}}{2}. Sinon null.
 */
export function sqrtTex(n2: number): string | null {
  if (n2 < -1e-12) return null
  if (Math.abs(n2) < 1e-12) return '0'
  const f = asFraction(n2, 16)
  if (!f) return null
  const [p, q] = f
  // √(p/q) = √(pq)/q
  const [a0, b] = simplifySqrt(p * q)
  const g = gcd(a0, q)
  const a = a0 / g
  const d = q / g
  const num = b === 1 ? String(a) : `${a === 1 ? '' : a}\\sqrt{${b}}`
  return d === 1 ? num : `\\frac{${num}}{${d}}`
}

/** Analyse « 0,25 », « 1/6 », « -3 » ; NaN si invalide. */
export function parseNum(s: string): number {
  const t = s.trim().replace(/\s+/g, '').replace(/,/g, '.').replace(/[−]/g, '-')
  if (t === '') return NaN
  const m = t.match(/^(-?\d*\.?\d+)\/(\d*\.?\d+)$/)
  if (m) {
    const d = parseFloat(m[2])
    return d === 0 ? NaN : parseFloat(m[1]) / d
  }
  return /^-?(\d+\.?\d*|\.\d+)$/.test(t) ? parseFloat(t) : NaN
}

/** Plus proche « poignée » d'un point (en unités du repère). */
export function nearest<K extends string>(handles: Record<K, [number, number]>, x: number, y: number, tol: number): K | null {
  let best: K | null = null
  let bd = tol
  for (const k of Object.keys(handles) as K[]) {
    const [hx, hy] = handles[k]
    const d = Math.hypot(hx - x, hy - y)
    if (d < bd) {
      bd = d
      best = k
    }
  }
  return best
}

/** Écriture d'un coefficient dans une combinaison : signe + valeur (1 omis). */
export function termTex(c: number, v: string, first: boolean, digits = 2): string {
  if (Math.abs(c) < 1e-12) return ''
  const abs = Math.abs(c)
  const body = v && Math.abs(abs - 1) < 1e-12 ? v : `${fracTex(abs, 12, digits)}${v}`
  if (first) return c < 0 ? `-${body}` : body
  return c < 0 ? ` - ${body}` : ` + ${body}`
}

/** Poignée déplaçable (cercle plein + halo) en coordonnées du repère. */
export function Handle({ x, y, color, label, dx = 9, dy = -9, r = 6 }: { x: number; y: number; color: string; label?: string; dx?: number; dy?: number; r?: number }) {
  const p = usePlot()
  const X = p.sx(x)
  const Y = p.sy(y)
  return (
    <g style={{ cursor: 'grab' }}>
      <circle cx={X} cy={Y} r={r + 7} fill={color} opacity={0.14} />
      <circle cx={X} cy={Y} r={r} fill={color} stroke="hsl(var(--background))" strokeWidth={2} />
      {label && <OutlinedText x={X + dx} y={Y + dy} fill={color} weight={700}>{label}</OutlinedText>}
    </g>
  )
}

/** Texte SVG avec liseré couleur de fond (lisible sur la grille, clair/sombre). */
export function OutlinedText({ x, y, children, fill = 'hsl(var(--foreground))', size = 12, anchor = 'start', weight = 600, italic }: { x: number; y: number; children: ReactNode; fill?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; weight?: number; italic?: boolean }) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontSize={size}
      fontWeight={weight}
      fontStyle={italic ? 'italic' : undefined}
      textAnchor={anchor}
      fontFamily="Geist, sans-serif"
      stroke="hsl(var(--background))"
      strokeWidth={3}
      paintOrder="stroke"
      style={{ pointerEvents: 'none' }}
    >
      {children}
    </text>
  )
}
