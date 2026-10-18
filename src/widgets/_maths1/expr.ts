/**
 * Parseur d'expressions mathématiques (privé aux widgets maths du groupe 1).
 * - multiplication implicite : 2x, 3(x+1), kx, x(x-1), 2sin(x)
 * - fonctions : sqrt sin cos tan exp ln log abs floor, constantes pi, e
 * - puissance associative à droite, -x^2 = -(x^2)
 * - rendu LaTeX de l'arbre (avec substitution éventuelle des paramètres)
 * Messages d'erreur en français.
 */
import { fmt } from '@/lib/utils'

export type Node =
  | { t: 'num'; v: number }
  | { t: 'var'; name: string }
  | { t: 'const'; name: 'pi' | 'e' }
  | { t: 'neg'; a: Node }
  | { t: 'bin'; op: '+' | '-' | '*' | '/' | '^'; a: Node; b: Node }
  | { t: 'call'; fn: string; a: Node }

export type Env = Record<string, number>
export type Fn = (env: Env) => number

const FUNCS = ['sqrt', 'racine', 'sin', 'cos', 'tan', 'exp', 'ln', 'log', 'abs', 'floor']
const ALIASES: Record<string, string> = { racine: 'sqrt' }

type Tok = { k: 'num'; v: number } | { k: 'id'; s: string } | { k: 'op'; s: string }

class ParseError extends Error {}

function normalize(src: string) {
  return src
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/[×·⋅∙]/g, '*')
    .replace(/÷/g, '/')
    .replace(/[−–—]/g, '-')
    .replace(/π/g, 'pi')
    .replace(/√/g, 'sqrt')
    .replace(/ℯ/g, 'e')
    .replace(/\*\*/g, '^')
    .replace(/[[{]/g, '(')
    .replace(/[\]}]/g, ')')
    .replace(/(\d),(\d)/g, '$1.$2')
}

function tokenize(src: string, vars: string[]): Tok[] {
  const names = [...FUNCS, 'pi', ...vars, 'e'].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => b.length - a.length)
  const toks: Tok[] = []
  let i = 0
  while (i < src.length) {
    const c = src[i]
    if (/\s/.test(c)) {
      i++
      continue
    }
    if (/[\d.]/.test(c)) {
      const m = /^(\d+\.?\d*|\.\d+)/.exec(src.slice(i))
      if (!m) throw new ParseError(`Nombre mal écrit près de « ${src.slice(i, i + 4)} »`)
      toks.push({ k: 'num', v: parseFloat(m[0]) })
      i += m[0].length
      continue
    }
    if (/[a-zA-Z_]/.test(c)) {
      const m = /^[a-zA-Z_]+/.exec(src.slice(i))!
      const run = m[0]
      // découpe gloutonne en noms connus : "kx" -> k·x, "exp" -> exp
      let j = 0
      while (j < run.length) {
        const name = names.find((n) => run.startsWith(n, j)) ?? names.find((n) => run.toLowerCase().startsWith(n, j) && FUNCS.includes(n))
        if (!name) {
          const allowed = ['x', ...vars.filter((v) => v !== 'x')].join(', ')
          throw new ParseError(`Symbole inconnu « ${run.slice(j)} » (variables possibles : ${allowed})`)
        }
        toks.push({ k: 'id', s: ALIASES[name] ?? name })
        j += name.length
      }
      i += run.length
      continue
    }
    if ('+-*/^()|'.includes(c)) {
      toks.push({ k: 'op', s: c })
      i++
      continue
    }
    throw new ParseError(`Caractère non reconnu « ${c} »`)
  }
  return toks
}

export function parse(input: string, vars: string[] = ['x']): Node {
  const src = normalize(input)
  if (!src.trim()) throw new ParseError('Expression vide')
  const toks = tokenize(src, vars)
  let p = 0
  let absDepth = 0
  const peek = () => toks[p]
  const isOp = (s: string) => toks[p]?.k === 'op' && (toks[p] as { s: string }).s === s
  const eat = (s: string) => {
    if (!isOp(s)) {
      const t = toks[p]
      if (!t) throw new ParseError(s === ')' ? 'Parenthèse fermante manquante' : s === '|' ? 'Barre de valeur absolue manquante' : 'Expression incomplète')
      throw new ParseError(`« ${s} » attendu`)
    }
    p++
  }
  const startsFactor = () => {
    const t = peek()
    if (!t) return false
    if (t.k === 'num' || t.k === 'id') return true
    return t.k === 'op' && (t.s === '(' || (t.s === '|' && absDepth === 0))
  }

  function expr(): Node {
    let a = term()
    while (isOp('+') || isOp('-')) {
      const op = (toks[p++] as { s: '+' | '-' }).s
      a = { t: 'bin', op, a, b: term() }
    }
    return a
  }
  function term(): Node {
    let a = unary()
    for (;;) {
      if (isOp('*') || isOp('/')) {
        const op = (toks[p++] as { s: '*' | '/' }).s
        a = { t: 'bin', op, a, b: unary() }
      } else if (startsFactor()) {
        a = { t: 'bin', op: '*', a, b: power() }
      } else break
    }
    return a
  }
  function unary(): Node {
    if (isOp('-')) {
      p++
      const a = unary()
      return a.t === 'num' ? { t: 'num', v: -a.v } : { t: 'neg', a }
    }
    if (isOp('+')) {
      p++
      return unary()
    }
    return power()
  }
  function power(): Node {
    const base = primary()
    if (isOp('^')) {
      p++
      return { t: 'bin', op: '^', a: base, b: unary() }
    }
    return base
  }
  function primary(): Node {
    const t = peek()
    if (!t) throw new ParseError('Expression incomplète')
    if (t.k === 'num') {
      p++
      return { t: 'num', v: t.v }
    }
    if (t.k === 'id') {
      p++
      if (FUNCS.includes(t.s)) {
        if (isOp('(')) {
          p++
          const a = expr()
          eat(')')
          return { t: 'call', fn: t.s, a }
        }
        if (!peek()) throw new ParseError(`Argument manquant après « ${t.s} »`)
        return { t: 'call', fn: t.s, a: power() }
      }
      if (t.s === 'pi' || t.s === 'e') return { t: 'const', name: t.s }
      return { t: 'var', name: t.s }
    }
    if (t.s === '(') {
      p++
      if (isOp(')')) throw new ParseError('Parenthèses vides')
      const a = expr()
      eat(')')
      return a
    }
    if (t.s === '|') {
      p++
      absDepth++
      const a = expr()
      absDepth--
      eat('|')
      return { t: 'call', fn: 'abs', a }
    }
    throw new ParseError(t.s === ')' ? 'Parenthèse fermante en trop' : `Opérateur « ${t.s} » mal placé`)
  }

  const n = expr()
  if (p < toks.length) {
    const t = toks[p]
    throw new ParseError(t.k === 'op' && t.s === ')' ? 'Parenthèse fermante en trop' : 'Expression mal formée')
  }
  return n
}

const MATH: Record<string, (x: number) => number> = {
  sqrt: Math.sqrt,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  exp: Math.exp,
  ln: Math.log,
  log: Math.log10,
  abs: Math.abs,
  floor: Math.floor,
}

export function toFn(n: Node): Fn {
  switch (n.t) {
    case 'num':
      return () => n.v
    case 'var':
      return (env) => env[n.name] ?? NaN
    case 'const': {
      const v = n.name === 'pi' ? Math.PI : Math.E
      return () => v
    }
    case 'neg': {
      const a = toFn(n.a)
      return (env) => -a(env)
    }
    case 'call': {
      const f = MATH[n.fn]
      const a = toFn(n.a)
      return (env) => f(a(env))
    }
    case 'bin': {
      const a = toFn(n.a)
      const b = toFn(n.b)
      switch (n.op) {
        case '+':
          return (e) => a(e) + b(e)
        case '-':
          return (e) => a(e) - b(e)
        case '*':
          return (e) => a(e) * b(e)
        case '/':
          return (e) => a(e) / b(e)
        case '^':
          return (e) => Math.pow(a(e), b(e))
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/* Rendu LaTeX                                                          */
/* ------------------------------------------------------------------ */

/** Nombre au format LaTeX français : 1,5 -> 1{,}5 ; 1 000 -> 1\,000 */
export function texNum(v: number, digits = 3): string {
  if (!Number.isFinite(v)) return v > 0 ? '+\\infty' : v < 0 ? '-\\infty' : '\\text{—}'
  return fmt(v, digits)
    .replace(/[  \s]/g, '\\,')
    .replace(/,/g, '{,}')
    .replace(/−/g, '-')
}

const GREEK = new Set(['alpha', 'beta', 'gamma', 'delta', 'lambda', 'mu', 'theta', 'omega', 'sigma', 'tau', 'phi', 'rho'])

interface TexOpts {
  subst?: Env
  digits?: number
}
type R = { s: string; p: number; num?: boolean }

function tx(n: Node, o: TexOpts): R {
  const wrap = (r: R, need: boolean) => (need ? `\\left(${r.s}\\right)` : r.s)
  switch (n.t) {
    case 'num':
      return { s: texNum(n.v, o.digits ?? 4), p: n.v < 0 ? 1.5 : 5, num: true }
    case 'var': {
      if (o.subst && n.name in o.subst) {
        const v = o.subst[n.name]
        return { s: texNum(v, o.digits ?? 4), p: v < 0 ? 1.5 : 5, num: true }
      }
      const s = GREEK.has(n.name) ? `\\${n.name}` : n.name.length > 1 ? `\\mathrm{${n.name}}` : n.name
      return { s, p: 5 }
    }
    case 'const':
      return { s: n.name === 'pi' ? '\\pi' : '\\mathrm{e}', p: 5 }
    case 'neg': {
      const a = tx(n.a, o)
      return { s: `-${wrap(a, a.p < 2)}`, p: 1.5 }
    }
    case 'call': {
      const a = tx(n.a, o)
      switch (n.fn) {
        case 'sqrt':
          return { s: `\\sqrt{${a.s}}`, p: 5 }
        case 'abs':
          return { s: `\\left|${a.s}\\right|`, p: 5 }
        case 'floor':
          return { s: `\\lfloor ${a.s}\\rfloor`, p: 5 }
        case 'exp':
          return { s: `\\mathrm{e}^{${a.s}}`, p: 4 }
        default: {
          const name = n.fn === 'log' ? '\\log' : `\\${n.fn}`
          const simple = (n.a.t === 'var' || n.a.t === 'const' || (n.a.t === 'num' && n.a.v >= 0)) && !(o.subst && n.a.t === 'var' && n.a.name in o.subst)
          return { s: simple ? `${name} ${a.s}` : `${name}\\left(${a.s}\\right)`, p: 3 }
        }
      }
    }
    case 'bin': {
      const a = tx(n.a, o)
      const b = tx(n.b, o)
      switch (n.op) {
        case '+':
          if (b.s.startsWith('-')) return { s: `${a.s} - ${b.s.slice(1)}`, p: 1 }
          return { s: `${a.s} + ${b.s}`, p: 1 }
        case '-':
          return { s: `${a.s} - ${wrap(b, b.p < 2)}`, p: 1 }
        case '*': {
          const L = wrap(a, a.p < 1.5)
          const Rr = wrap(b, b.p < 2)
          const needTimes = /^[\d{]/.test(Rr) || b.num || (n.b.t === 'bin' && n.b.op === '^' && tx(n.b.a, o).num) || b.s.startsWith('\\frac')
          return { s: needTimes ? `${L} \\times ${Rr}` : `${L} ${Rr}`, p: 2 }
        }
        case '/':
          return { s: `\\frac{${a.s}}{${b.s}}`, p: 4.5 }
        case '^': {
          if (n.a.t === 'const' && n.a.name === 'e') return { s: `\\mathrm{e}^{${b.s}}`, p: 4 }
          const needBase = a.p < 5 || n.a.t === 'call' && !['sqrt', 'abs'].includes(n.a.fn)
          return { s: `${needBase ? `\\left(${a.s}\\right)` : a.s}^{${b.s}}`, p: 4 }
        }
      }
    }
  }
}

export function toTex(n: Node, opts: TexOpts = {}): string {
  return tx(n, opts).s
}

/** Variables utilisées par un arbre */
export function usedVars(n: Node, acc = new Set<string>()): Set<string> {
  if (n.t === 'var') acc.add(n.name)
  else if (n.t === 'neg' || n.t === 'call') usedVars(n.a, acc)
  else if (n.t === 'bin') {
    usedVars(n.a, acc)
    usedVars(n.b, acc)
  }
  return acc
}

export interface Compiled {
  ok: true
  node: Node
  fn: Fn
  tex: string
}
export interface Failed {
  ok: false
  error: string
}

/** Compile une saisie ; ne lève jamais d'exception. */
export function compileExpr(input: string, vars: string[] = ['x']): Compiled | Failed {
  try {
    const node = parse(input, vars)
    const fn = toFn(node)
    return { ok: true, node, fn, tex: toTex(node) }
  } catch (e) {
    return { ok: false, error: e instanceof ParseError ? e.message : 'Expression invalide' }
  }
}

/* ------------------------------------------------------------------ */
/* Outils numériques                                                    */
/* ------------------------------------------------------------------ */

/** Nombre dérivé numérique (différences centrées + extrapolation de Richardson). */
export function derivative(f: (x: number) => number, x: number): number {
  const h = 1e-3 * Math.max(1, Math.abs(x))
  const d1 = (f(x + h) - f(x - h)) / (2 * h)
  const d2 = (f(x + h / 2) - f(x - h / 2)) / h
  return (4 * d2 - d1) / 3
}

/** Test de dérivabilité : compare les taux d'accroissement à gauche et à droite. */
export function isDifferentiableAt(f: (x: number) => number, x: number): boolean {
  const y = f(x)
  if (!Number.isFinite(y)) return false
  const h = 1e-6 * Math.max(1, Math.abs(x))
  const l = (y - f(x - h)) / h
  const r = (f(x + h) - y) / h
  if (!Number.isFinite(l) || !Number.isFinite(r)) return false
  return Math.abs(l - r) <= 1e-3 * (1 + Math.abs(l) + Math.abs(r))
}

/** Plage verticale raisonnable pour un ensemble de fonctions sur [a, b]. */
export function autoYRange(fs: ((x: number) => number)[], a: number, b: number, fallback: [number, number] = [-5, 5]): [number, number] {
  const ys: number[] = []
  for (const f of fs) {
    for (let i = 0; i <= 240; i++) {
      const y = f(a + ((b - a) * i) / 240)
      if (Number.isFinite(y) && Math.abs(y) < 1e9) ys.push(y)
    }
  }
  if (ys.length < 5) return fallback
  ys.sort((u, v) => u - v)
  let lo = ys[Math.floor(ys.length * 0.03)]
  let hi = ys[Math.ceil(ys.length * 0.97) - 1]
  if (hi - lo < 1e-9) {
    lo -= 1
    hi += 1
  }
  const pad = (hi - lo) * 0.12
  lo -= pad
  hi += pad
  // inclure l'axe des abscisses s'il est proche
  if (lo > 0 && lo < (hi - lo) * 0.6) lo = -(hi - lo) * 0.05
  if (hi < 0 && -hi < (hi - lo) * 0.6) hi = (hi - lo) * 0.05
  return [niceFloor(lo), niceCeil(hi)]
}

function niceUnit(span: number) {
  const p = Math.pow(10, Math.floor(Math.log10(Math.max(span, 1e-9))) - 1)
  return p
}
function niceFloor(v: number) {
  const u = niceUnit(Math.abs(v) || 1) * 5
  return Math.floor(v / u) * u
}
function niceCeil(v: number) {
  const u = niceUnit(Math.abs(v) || 1) * 5
  return Math.ceil(v / u) * u
}

/* ------------------------------------------------------------------ */
/* Dérivation symbolique + simplification                              */
/* ------------------------------------------------------------------ */

const N = (v: number): Node => ({ t: 'num', v })
const B = (op: '+' | '-' | '*' | '/' | '^', a: Node, b: Node): Node => ({ t: 'bin', op, a, b })
const C = (fn: string, a: Node): Node => ({ t: 'call', fn, a })

function hasVar(n: Node, v: string): boolean {
  return usedVars(n).has(v)
}
const isNum = (n: Node, v?: number): boolean => n.t === 'num' && (v === undefined || Math.abs(n.v - v) < 1e-12)

export function simplify(n: Node): Node {
  switch (n.t) {
    case 'num':
    case 'var':
    case 'const':
      return n
    case 'neg': {
      const a = simplify(n.a)
      if (a.t === 'num') return N(-a.v)
      if (a.t === 'neg') return a.a
      if (a.t === 'bin' && a.op === '*' && a.a.t === 'num') return simplify(B('*', N(-a.a.v), a.b))
      return { t: 'neg', a }
    }
    case 'call': {
      const a = simplify(n.a)
      if (a.t === 'num' && n.fn !== 'floor') {
        const v = MATH[n.fn](a.v)
        if (Number.isInteger(v)) return N(v)
      }
      return C(n.fn, a)
    }
    case 'bin': {
      const a = simplify(n.a)
      const b = simplify(n.b)
      if (a.t === 'num' && b.t === 'num') {
        const v = toFn(B(n.op, a, b))({})
        if (n.op !== '/' || Number.isInteger(v)) return N(v)
      }
      switch (n.op) {
        case '+':
          if (isNum(a, 0)) return b
          if (isNum(b, 0)) return a
          if (b.t === 'num' && b.v < 0) return B('-', a, N(-b.v))
          if (b.t === 'neg') return B('-', a, b.a)
          if (b.t === 'bin' && b.op === '*' && b.a.t === 'num' && b.a.v < 0) return B('-', a, simplify(B('*', N(-b.a.v), b.b)))
          if (a.t === 'neg') return simplify(B('-', b, a.a))
          return B('+', a, b)
        case '-':
          if (isNum(b, 0)) return a
          if (isNum(a, 0)) return simplify({ t: 'neg', a: b })
          if (b.t === 'num' && b.v < 0) return B('+', a, N(-b.v))
          if (b.t === 'neg') return B('+', a, b.a)
          if (b.t === 'bin' && b.op === '*' && b.a.t === 'num' && b.a.v < 0) return B('+', a, simplify(B('*', N(-b.a.v), b.b)))
          return B('-', a, b)
        case '*': {
          if (isNum(a, 0) || isNum(b, 0)) return N(0)
          if (isNum(a, 1)) return b
          if (isNum(b, 1)) return a
          if (isNum(a, -1)) return simplify({ t: 'neg', a: b })
          if (isNum(b, -1)) return simplify({ t: 'neg', a })
          if (b.t === 'num') return simplify(B('*', b, a))
          if (a.t === 'neg') return simplify({ t: 'neg', a: B('*', a.a, b) })
          if (b.t === 'neg') return simplify({ t: 'neg', a: B('*', a, b.a) })
          if (a.t === 'num' && b.t === 'bin' && b.op === '*' && b.a.t === 'num') return simplify(B('*', N(a.v * b.a.v), b.b))
          if (a.t === 'num' && b.t === 'bin' && b.op === '/' && b.a.t === 'num') return simplify(B('/', N(a.v * b.a.v), b.b))
          if (a.t === 'bin' && a.op === '*' && a.a.t === 'num') return simplify(B('*', a.a, B('*', a.b, b)))
          if (b.t === 'bin' && b.op === '*' && b.a.t === 'num') return simplify(B('*', b.a, B('*', a, b.b)))
          if (a.t === 'bin' && a.op === '/' && isNum(a.a, 1)) return simplify(B('/', b, a.b))
          if (b.t === 'bin' && b.op === '/' && isNum(b.a, 1)) return simplify(B('/', a, b.b))
          // x * x -> x^2 ; facteur littéral simple placé en tête : e^{kx}·k -> k·e^{kx}
          if (a.t === 'var' && b.t === 'var' && a.name === b.name) return B('^', a, N(2))
          if (b.t === 'var' && a.t !== 'var' && a.t !== 'num') return B('*', b, a)
          return B('*', a, b)
        }
        case '/':
          if (isNum(a, 0)) return N(0)
          if (isNum(b, 1)) return a
          if (a.t === 'neg') return simplify({ t: 'neg', a: B('/', a.a, b) })
          if (a.t === 'num' && a.v < 0) return simplify({ t: 'neg', a: B('/', N(-a.v), b) })
          if (a.t === 'num' && b.t === 'bin' && b.op === '*' && b.a.t === 'num') {
            const k = a.v / b.a.v
            if (Number.isInteger(k)) return simplify(B('/', N(k), b.b))
          }
          if (b.t === 'var' && a.t === 'bin' && a.op === '^' && a.a.t === 'var' && a.a.name === b.name && a.b.t === 'num') return simplify(B('^', b, N(a.b.v - 1)))
          if (b.t === 'num' && a.t === 'bin' && a.op === '*' && a.a.t === 'num') {
            const k = a.a.v / b.v
            if (Number.isInteger(k * 1000)) return simplify(B('*', N(k), a.b))
          }
          return B('/', a, b)
        case '^':
          if (isNum(b, 0)) return N(1)
          if (isNum(b, 1)) return a
          if (isNum(a, 1)) return N(1)
          if (a.t === 'bin' && a.op === '^' && a.b.t === 'num' && b.t === 'num') return B('^', a.a, N(a.b.v * b.v))
          return B('^', a, b)
      }
    }
  }
}

/** Dérivée symbolique par rapport à v (par défaut x). */
export function diff(n: Node, v = 'x'): Node {
  const d = (m: Node): Node => {
    if (!hasVar(m, v)) return N(0)
    switch (m.t) {
      case 'num':
      case 'const':
        return N(0)
      case 'var':
        return N(m.name === v ? 1 : 0)
      case 'neg':
        return { t: 'neg', a: d(m.a) }
      case 'bin': {
        const { a, b } = m
        switch (m.op) {
          case '+':
          case '-':
            return B(m.op, d(a), d(b))
          case '*':
            if (!hasVar(a, v)) return B('*', a, d(b))
            if (!hasVar(b, v)) return B('*', b, d(a))
            return B('+', B('*', d(a), b), B('*', a, d(b)))
          case '/':
            if (!hasVar(b, v)) return B('/', d(a), b)
            if (!hasVar(a, v)) return { t: 'neg', a: B('/', B('*', a, d(b)), B('^', b, N(2))) }
            return B('/', B('-', B('*', d(a), b), B('*', a, d(b))), B('^', b, N(2)))
          case '^':
            if (!hasVar(b, v)) {
              const nb = simplify(b)
              return B('*', B('*', nb, B('^', a, simplify(B('-', nb, N(1))))), d(a))
            }
            if (a.t === 'const' && a.name === 'e') return B('*', m, d(b))
            if (!hasVar(a, v)) return B('*', B('*', m, C('ln', a)), d(b))
            return B('*', m, d(B('*', b, C('ln', a))))
        }
        break
      }
      case 'call': {
        const a = m.a
        const da = d(a)
        switch (m.fn) {
          case 'sqrt':
            return B('/', da, B('*', N(2), C('sqrt', a)))
          case 'sin':
            return B('*', C('cos', a), da)
          case 'cos':
            return { t: 'neg', a: B('*', C('sin', a), da) }
          case 'tan':
            return B('/', da, B('^', C('cos', a), N(2)))
          case 'exp':
            return B('*', C('exp', a), da)
          case 'ln':
            return B('/', da, a)
          case 'log':
            return B('/', da, B('*', a, C('ln', N(10))))
          case 'abs':
            return B('/', B('*', a, da), C('abs', a))
          default:
            return N(0)
        }
      }
    }
    return N(0)
  }
  // simplifications répétées jusqu'à stabilité
  let r = d(n)
  for (let i = 0; i < 6; i++) {
    const s = simplify(r)
    if (JSON.stringify(s) === JSON.stringify(r)) break
    r = s
  }
  return r
}
