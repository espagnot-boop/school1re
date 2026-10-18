/**
 * Helpers privés des widgets de chimie / optique :
 * formatage en chiffres significatifs, formules chimiques (TeX et SVG),
 * conversion longueur d'onde → couleur, couleur perçue d'une solution.
 */

// ---------------------------------------------------------------------------
// Chiffres significatifs (notation française)
// ---------------------------------------------------------------------------

const SUP_MAP: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', '+': '⁺',
}
export const toSup = (s: string) => s.split('').map((c) => SUP_MAP[c] ?? c).join('')

function splitExp(x: number, sig: number): [string, number] {
  const [m, e] = x.toExponential(Math.max(0, sig - 1)).split('e')
  return [m, Number(e)]
}

/** 6,56 × 10⁻⁷ */
export function sci(x: number, sig = 3): string {
  if (!Number.isFinite(x)) return '—'
  if (x === 0) return '0'
  const [m, e] = splitExp(x, sig)
  const mm = m.replace('.', ',').replace('-', '−')
  if (e === 0) return mm
  return `${mm} × 10${toSup(String(e))}`
}

/** Même chose en LaTeX : 6{,}56\times 10^{-7} */
export function sciTex(x: number, sig = 3): string {
  if (!Number.isFinite(x)) return '\\text{—}'
  if (x === 0) return '0'
  const [m, e] = splitExp(x, sig)
  const mm = m.replace('.', '{,}')
  if (e === 0) return mm
  return `${mm}\\times 10^{${e}}`
}

/**
 * Nombre avec `sig` chiffres significatifs ; écriture décimale si 10⁻³ ≤ |x| < 10⁴,
 * scientifique sinon.
 */
export function fmtSig(x: number, sig = 3, lo = 1e-3, hi = 1e4): string {
  if (!Number.isFinite(x)) return '—'
  if (x === 0) return '0'
  const r = Number(x.toPrecision(sig))
  const a = Math.abs(r)
  if (a < lo || a >= hi) return sci(r, sig)
  const e = Math.floor(Math.log10(a))
  const dec = Math.max(0, sig - 1 - e)
  return r.toFixed(dec).replace('.', ',').replace('-', '−')
}

/** Version LaTeX de fmtSig */
export function texSig(x: number, sig = 3, lo = 1e-3, hi = 1e4): string {
  if (!Number.isFinite(x)) return '\\text{—}'
  if (x === 0) return '0'
  const r = Number(x.toPrecision(sig))
  const a = Math.abs(r)
  if (a < lo || a >= hi) return sciTex(r, sig)
  const e = Math.floor(Math.log10(a))
  const dec = Math.max(0, sig - 1 - e)
  return r.toFixed(dec).replace('.', '{,}')
}

/** Arrondi « joli » supérieur : 1, 2, 2,5, 5 × 10ᵏ */
export function niceCeil(x: number): number {
  if (x <= 0) return 1
  const p = Math.pow(10, Math.floor(Math.log10(x)))
  const m = x / p
  const n = m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10
  return n * p
}

// ---------------------------------------------------------------------------
// Formules chimiques
// ---------------------------------------------------------------------------

export interface ParsedFormula {
  parts: { t: string; sub: boolean }[]
  charge: string // ex. "2+", "−", ""
  state: string // aq, s, l, g
}

const SUBS = '₀₁₂₃₄₅₆₇₈₉'
const SUPS = '⁰¹²³⁴⁵⁶⁷⁸⁹'

/**
 * Analyse « Cu2+ », « Cu^2+ », « SO4^2- », « SO42- », « NH4+ », « Fe³⁺ », « H2O(l) », « Ca(OH)2 ».
 * Convention sans « ^ » : un seul chiffre avant le signe = charge pour un ion monoatomique (Cu2+),
 * indice sinon (NH4+) ; deux chiffres ou plus : le dernier est la charge (SO42-).
 */
export function parseFormula(raw: string): ParsedFormula {
  let s = ''
  let inSup = false
  for (const ch of raw.trim()) {
    const i = SUBS.indexOf(ch)
    const j = SUPS.indexOf(ch)
    if (i >= 0) {
      s += String(i)
      inSup = false
    } else if (j >= 0 || ch === '⁺' || ch === '⁻') {
      if (!inSup) s += '^'
      inSup = true
      s += j >= 0 ? String(j) : ch === '⁺' ? '+' : '-'
    } else {
      inSup = false
      s += ch === '−' ? '-' : ch
    }
  }
  let state = ''
  const ms = s.match(/\s*\((aq|s|l|g)\)$/)
  if (ms) {
    state = ms[1]
    s = s.slice(0, ms.index)
  }
  let charge = ''
  if (s.includes('^')) {
    const k = s.indexOf('^')
    charge = s.slice(k + 1).replace(/[{}]/g, '')
    s = s.slice(0, k)
  } else {
    const m = s.match(/^(.*?)(\d*)([+-])$/)
    if (m && m[1]) {
      let b = m[1]
      let d = m[2]
      if (d.length >= 2) {
        b += d.slice(0, -1)
        d = d.slice(-1)
      } else if (d.length === 1 && !/^[A-Z][a-z]?$/.test(b)) {
        b += d
        d = ''
      }
      s = b
      charge = (d === '1' ? '' : d) + m[3]
    }
  }
  // "1+" -> "+"
  charge = charge.replace(/^1(?=[+-])/, '')
  const parts = s
    .split(/(\d+)/)
    .filter((t) => t !== '')
    .map((t) => ({ t, sub: /^\d+$/.test(t) }))
  return { parts, charge, state }
}

/** LaTeX d'une formule : \mathrm{Cu^{2+}} */
export function formulaTex(f: string): string {
  const p = parseFormula(f)
  const body = p.parts.map((x) => (x.sub ? `_{${x.t}}` : x.t.replace(/([()])/g, '$1'))).join('')
  const ch = p.charge ? `^{${p.charge}}` : ''
  const st = p.state ? `\\,_{(\\mathrm{${p.state}})}` : ''
  return `\\mathrm{${body}${ch}}${st}`
}

/** Texte unicode : Cu²⁺, H₂O */
export function formulaText(f: string): string {
  const p = parseFormula(f)
  return p.parts.map((x) => (x.sub ? x.t.split('').map((c) => SUBS[+c]).join('') : x.t)).join('') + toSup(p.charge)
}

/** Formule chimique rendue en SVG (tspans indices/exposants). */
export function SvgFormula({
  f,
  x,
  y,
  size = 13,
  anchor = 'middle',
  fill = 'hsl(var(--foreground))',
  weight = 600,
}: {
  f: string
  x: number
  y: number
  size?: number
  anchor?: 'start' | 'middle' | 'end'
  fill?: string
  weight?: number
}) {
  const p = parseFormula(f)
  const small = size * 0.72
  const off = size * 0.3
  const nodes: React.ReactNode[] = []
  let shift = 0 // décalage vertical courant
  p.parts.forEach((part, i) => {
    const target = part.sub ? off : 0
    nodes.push(
      <tspan key={i} dy={target - shift} fontSize={part.sub ? small : size}>
        {part.t}
      </tspan>,
    )
    shift = target
  })
  if (p.charge) {
    const target = -size * 0.42
    nodes.push(
      <tspan key="c" dy={target - shift} fontSize={small}>
        {p.charge.replace('-', '−')}
      </tspan>,
    )
    shift = target
  }
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={fill} fontWeight={weight} fontFamily="Geist, sans-serif">
      {nodes}
    </text>
  )
}

/** Équation de réaction en LaTeX */
export function equationTex(reactants: { formula: string; coef: number }[], products: { formula: string; coef: number }[]): string {
  const side = (l: { formula: string; coef: number }[]) =>
    l.map((s) => `${s.coef === 1 ? '' : String(s.coef).replace('.', '{,}') + '\\,'}${formulaTex(s.formula)}`).join(' + ')
  return `${side(reactants)} \\longrightarrow ${side(products)}`
}

// ---------------------------------------------------------------------------
// Couleurs
// ---------------------------------------------------------------------------

/** Couleur approchée d'une radiation monochromatique (algorithme de Bruton), composantes 0–1, ou null hors visible. */
export function wavelengthRGB(nm: number, edgeFade = true): [number, number, number] | null {
  if (nm < 380 || nm > 780) return null
  let r = 0, g = 0, b = 0
  if (nm < 440) {
    r = -(nm - 440) / (440 - 380)
    b = 1
  } else if (nm < 490) {
    g = (nm - 440) / (490 - 440)
    b = 1
  } else if (nm < 510) {
    g = 1
    b = -(nm - 510) / (510 - 490)
  } else if (nm < 580) {
    r = (nm - 510) / (580 - 510)
    g = 1
  } else if (nm < 645) {
    r = 1
    g = -(nm - 645) / (645 - 580)
  } else {
    r = 1
  }
  let f = 1
  if (edgeFade) {
    if (nm < 420) f = 0.3 + (0.7 * (nm - 380)) / 40
    else if (nm > 700) f = 0.3 + (0.7 * (780 - nm)) / 80
  }
  const gam = (c: number) => (c <= 0 ? 0 : Math.pow(c * f, 0.8))
  return [gam(r), gam(g), gam(b)]
}

export const rgbCss = (c: [number, number, number], a = 1) =>
  `rgba(${Math.round(255 * Math.min(1, Math.max(0, c[0])))}, ${Math.round(255 * Math.min(1, Math.max(0, c[1])))}, ${Math.round(255 * Math.min(1, Math.max(0, c[2])))}, ${a})`

/** Couleur CSS d'une radiation (gris si hors visible) */
export function wavelengthCss(nm: number): string {
  const c = wavelengthRGB(nm)
  return c ? rgbCss(c) : 'hsl(var(--muted-foreground))'
}

/** Nom de la couleur (domaine) d'une radiation dans le vide */
export function wavelengthName(nm: number): string {
  if (nm < 10) return 'rayons X'
  if (nm < 380) return 'ultraviolet'
  if (nm < 450) return 'violet'
  if (nm < 490) return 'bleu'
  if (nm < 500) return 'bleu-vert'
  if (nm < 560) return 'vert'
  if (nm < 590) return 'jaune'
  if (nm < 625) return 'orange'
  if (nm <= 780) return 'rouge'
  if (nm < 1e6) return 'infrarouge'
  return 'micro-ondes'
}

export function wavelengthDomain(nm: number): 'UV' | 'visible' | 'IR' {
  return nm < 380 ? 'UV' : nm > 780 ? 'IR' : 'visible'
}

/** Bande d'absorption gaussienne */
export interface Band {
  lambda: number // nm
  width: number // demi-largeur caractéristique (nm)
  A: number // absorbance au maximum
}

/**
 * Couleur perçue (lumière blanche transmise) d'une solution dont l'absorbance
 * est une somme de bandes gaussiennes. Renvoie des composantes 0–1.
 */
export function transmittedColor(bands: Band[]): [number, number, number] {
  let R = 0, G = 0, B = 0, R0 = 0, G0 = 0, B0 = 0
  for (let l = 380; l <= 780; l += 4) {
    const c = wavelengthRGB(l, false)!
    let A = 0
    for (const b of bands) A += b.A * Math.exp(-(((l - b.lambda) / b.width) ** 2))
    const T = Math.pow(10, -A)
    R += c[0] * T
    G += c[1] * T
    B += c[2] * T
    R0 += c[0]
    G0 += c[1]
    B0 += c[2]
  }
  return [R / R0, G / G0, B / B0]
}

/** Spectre visible horizontal (dégradé SVG) — id unique requis */
export function SpectrumGradient({ id, from = 380, to = 780 }: { id: string; from?: number; to?: number }) {
  const stops: React.ReactNode[] = []
  const n = 40
  for (let i = 0; i <= n; i++) {
    const l = from + ((to - from) * i) / n
    const c = wavelengthRGB(l)
    stops.push(<stop key={i} offset={`${(i / n) * 100}%`} stopColor={c ? rgbCss(c) : '#000'} />)
  }
  return (
    <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
      {stops}
    </linearGradient>
  )
}

/** Constantes physiques (valeurs CODATA arrondies) */
export const PHYS = {
  h: 6.626e-34, // J·s
  c: 2.998e8, // m/s
  e: 1.602e-19, // C (1 eV = 1,602 × 10⁻¹⁹ J)
  hc_eVnm: 1239.84, // h·c en eV·nm
}
