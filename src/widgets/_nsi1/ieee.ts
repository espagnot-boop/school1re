/** Outils exacts pour IEEE 754 (binary32 / binary64) — arithmétique BigInt, aucune approximation. */

export type Fmt = 32 | 64
export const SPEC = {
  32: { exp: 8, frac: 23, bias: 127 },
  64: { exp: 11, frac: 52, bias: 1023 },
} as const

export const roundTo = (x: number, f: Fmt) => (f === 32 ? Math.fround(x) : x)

export function toBits(x: number, f: Fmt): bigint {
  const dv = new DataView(new ArrayBuffer(8))
  if (f === 32) {
    dv.setFloat32(0, x)
    return BigInt(dv.getUint32(0))
  }
  dv.setFloat64(0, x)
  return dv.getBigUint64(0)
}

export function fromBits(b: bigint, f: Fmt): number {
  const dv = new DataView(new ArrayBuffer(8))
  if (f === 32) {
    dv.setUint32(0, Number(b & 0xffffffffn))
    return dv.getFloat32(0)
  }
  dv.setBigUint64(0, b & 0xffffffffffffffffn)
  return dv.getFloat64(0)
}

export interface Decomp {
  sign: number
  E: number // exposant biaisé
  F: bigint // champ mantisse (fraction)
  kind: 'zero' | 'subnormal' | 'normal' | 'inf' | 'nan'
  e: number // exposant réel
  /** valeur = m × 2^k (m entier impair, ou 0) */
  m: bigint
  k: number
}

export function decompose(x: number, f: Fmt): Decomp {
  const { exp, frac, bias } = SPEC[f]
  const b = toBits(x, f)
  const sign = Number((b >> BigInt(exp + frac)) & 1n)
  const E = Number((b >> BigInt(frac)) & ((1n << BigInt(exp)) - 1n))
  const F = b & ((1n << BigInt(frac)) - 1n)
  const Emax = (1 << exp) - 1
  let kind: Decomp['kind']
  let m = 0n
  let k = 0
  let e = 0
  if (E === Emax) kind = F === 0n ? 'inf' : 'nan'
  else if (E === 0) {
    kind = F === 0n ? 'zero' : 'subnormal'
    m = F
    k = 1 - bias - frac
    e = 1 - bias
  } else {
    kind = 'normal'
    m = F | (1n << BigInt(frac))
    k = E - bias - frac
    e = E - bias
  }
  if (m !== 0n) {
    while ((m & 1n) === 0n) {
      m >>= 1n
      k++
    }
  }
  return { sign, E, F, kind, e, m, k }
}

/** Écriture décimale exacte de m × 2^k (sans signe). */
export function exactDecimal(m: bigint, k: number): string {
  if (m === 0n) return '0'
  if (k >= 0) return (m << BigInt(k)).toString()
  const D = -k
  const N = m * 5n ** BigInt(D)
  const s = N.toString().padStart(D + 1, '0')
  const ip = s.slice(0, s.length - D)
  const fp = s.slice(s.length - D).replace(/0+$/, '')
  return fp ? `${ip}.${fp}` : ip
}

// ---------------------------------------------------------------- rationnels
export interface Rat {
  n: bigint
  d: bigint
}
const babs = (x: bigint) => (x < 0n ? -x : x)
function gcd(a: bigint, b: bigint): bigint {
  a = babs(a)
  b = babs(b)
  while (b) [a, b] = [b, a % b]
  return a || 1n
}
export function rat(n: bigint, d: bigint = 1n): Rat {
  if (d < 0n) {
    n = -n
    d = -d
  }
  const g = gcd(n, d)
  return { n: n / g, d: d / g }
}
export const rAdd = (a: Rat, b: Rat) => rat(a.n * b.d + b.n * a.d, a.d * b.d)
export const rSub = (a: Rat, b: Rat) => rat(a.n * b.d - b.n * a.d, a.d * b.d)
export const rMul = (a: Rat, b: Rat) => rat(a.n * b.n, a.d * b.d)
export const rDiv = (a: Rat, b: Rat) => rat(a.n * b.d, a.d * b.n)

/** m × 2^k (signé) → rationnel */
export function decompToRat(d: Decomp): Rat {
  const s = d.sign ? -1n : 1n
  return d.k >= 0 ? rat(s * (d.m << BigInt(d.k))) : rat(s * d.m, 1n << BigInt(-d.k))
}

/** Parse un décimal « -12,5e-3 » de façon exacte. */
export function parseDecimalRat(str: string): Rat | null {
  const t = str.trim().replace(/[−–]/g, '-').replace(/\s/g, '').replace(',', '.')
  const m = /^([+-])?(\d*)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/.exec(t)
  if (!m || (!m[2] && !m[3])) return null
  const digits = (m[2] || '') + (m[3] || '')
  let exp = (m[4] ? parseInt(m[4], 10) : 0) - (m[3] ? m[3].length : 0)
  if (Math.abs(exp) > 2000) return null
  let n = BigInt(digits || '0')
  if (m[1] === '-') n = -n
  if (exp >= 0) return rat(n * 10n ** BigInt(exp))
  return rat(n, 10n ** BigInt(-exp))
}

/** Écriture scientifique approchée d'un rationnel : « 5,551 × 10^-18 » → [mantisse, exposant] */
export function ratToSci(r: Rat, sig = 4): { mant: string; exp: number; neg: boolean } | null {
  if (r.n === 0n) return null
  const neg = r.n < 0n
  const p = babs(r.n)
  const q = r.d
  let e = p.toString().length - q.toString().length
  const scaled = (ee: number) => {
    const s = sig - 1 - ee
    const num = s >= 0 ? p * 10n ** BigInt(s) : p
    const den = s >= 0 ? q : q * 10n ** BigInt(-s)
    return (2n * num + den) / (2n * den)
  }
  let v = scaled(e)
  for (let i = 0; i < 3; i++) {
    if (v >= 10n ** BigInt(sig)) {
      e++
      v = scaled(e)
    } else if (v < 10n ** BigInt(sig - 1)) {
      e--
      v = scaled(e)
    } else break
  }
  const s = v.toString()
  const mant = sig > 1 ? `${s[0]},${s.slice(1)}`.replace(/,?0+$/, '') : s
  return { mant, exp: e, neg }
}

/** Affichage le plus court qui redonne exactement le même flottant. */
export function shortest(x: number, f: Fmt): string {
  if (Number.isNaN(x)) return 'NaN'
  if (!Number.isFinite(x)) return x > 0 ? 'Infinity' : '-Infinity'
  if (Object.is(x, -0)) return '-0'
  if (f === 64) return String(x)
  for (let p = 1; p <= 9; p++) {
    const s = x.toPrecision(p)
    if (Math.fround(Number(s)) === x) return String(Number(s))
  }
  return String(x)
}

/** Ce qu'afficherait Python avec repr() / print() pour un float (binary64). */
export function pythonRepr(x: number): string {
  if (Number.isNaN(x)) return 'nan'
  if (!Number.isFinite(x)) return x > 0 ? 'inf' : '-inf'
  if (x === 0) return Object.is(x, -0) ? '-0.0' : '0.0'
  const ex = x.toExponential() // chiffres les plus courts
  const [mant, eStr] = ex.split('e')
  const exp = parseInt(eStr, 10)
  const neg = mant.startsWith('-')
  const digits = mant.replace('-', '').replace('.', '')
  let out: string
  if (exp < -4 || exp >= 16) {
    const m = digits.length > 1 ? `${digits[0]}.${digits.slice(1)}` : digits
    const ae = Math.abs(exp)
    out = `${m}e${exp < 0 ? '-' : '+'}${ae < 10 ? '0' + ae : ae}`
  } else if (exp < 0) {
    out = `0.${'0'.repeat(-exp - 1)}${digits}`
  } else if (digits.length <= exp + 1) {
    out = `${digits}${'0'.repeat(exp + 1 - digits.length)}.0`
  } else {
    out = `${digits.slice(0, exp + 1)}.${digits.slice(exp + 1)}`
  }
  return (neg ? '-' : '') + out
}

/** Partie fractionnaire en binaire par multiplications successives par 2 (exact). */
export function fracSteps(r: Rat, max = 30): { steps: { before: Rat; bit: number }[]; period: [number, number] | null; terminated: boolean } {
  let x = rat(babs(r.n) % r.d, r.d)
  const steps: { before: Rat; bit: number }[] = []
  const seen = new Map<string, number>()
  for (let i = 0; i < max; i++) {
    if (x.n === 0n) return { steps, period: null, terminated: true }
    const key = `${x.n}/${x.d}`
    if (seen.has(key)) return { steps, period: [seen.get(key)!, i], terminated: false }
    seen.set(key, i)
    const y = rat(x.n * 2n, x.d)
    const bit = y.n >= y.d ? 1 : 0
    steps.push({ before: x, bit })
    x = bit ? rat(y.n - y.d, y.d) : y
  }
  return { steps, period: null, terminated: x.n === 0n }
}

/** Rationnel → écriture décimale (exacte si possible, sinon tronquée) */
export function ratToDec(r: Rat, maxDigits = 30): string {
  const neg = r.n < 0n
  let n = babs(r.n)
  const ip = n / r.d
  n = n % r.d
  let s = ''
  for (let i = 0; i < maxDigits && n !== 0n; i++) {
    n *= 10n
    s += (n / r.d).toString()
    n %= r.d
  }
  return (neg ? '-' : '') + ip.toString() + (s ? '.' + s : '') + (n !== 0n ? '…' : '')
}
