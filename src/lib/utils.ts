import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Arrondi lisible : fmt(3.14159, 2) -> "3,14" (virgule française) */
export function fmt(x: number, digits = 2): string {
  if (!Number.isFinite(x)) return x > 0 ? '+∞' : x < 0 ? '−∞' : '—'
  const r = Math.round(x * 10 ** digits) / 10 ** digits
  return r.toLocaleString('fr-FR', { maximumFractionDigits: digits })
}

export function clamp(x: number, a: number, b: number) {
  return Math.min(b, Math.max(a, x))
}

export function shuffle<T>(arr: T[], seed = 1): T[] {
  const a = arr.slice()
  let s = seed
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
