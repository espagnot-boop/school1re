/** Mini-parseur d'expressions booléennes (syntaxe Python, française ou symbolique). */

export type BinOp = 'and' | 'or' | 'xor' | 'nand' | 'nor'
export type BNode =
  | { k: 'var'; name: string }
  | { k: 'const'; v: boolean }
  | { k: 'not'; a: BNode }
  | { k: 'bin'; op: BinOp; args: BNode[] }

type Tok = { t: 'id'; v: string } | { t: 'op'; v: BinOp | 'not' } | { t: 'lp' } | { t: 'rp' } | { t: 'const'; v: boolean }

const KEYWORDS: Record<string, Tok> = {
  and: { t: 'op', v: 'and' },
  et: { t: 'op', v: 'and' },
  or: { t: 'op', v: 'or' },
  ou: { t: 'op', v: 'or' },
  not: { t: 'op', v: 'not' },
  non: { t: 'op', v: 'not' },
  xor: { t: 'op', v: 'xor' },
  nand: { t: 'op', v: 'nand' },
  nor: { t: 'op', v: 'nor' },
  true: { t: 'const', v: true },
  false: { t: 'const', v: false },
  vrai: { t: 'const', v: true },
  faux: { t: 'const', v: false },
}

function tokenize(src: string): Tok[] {
  const out: Tok[] = []
  let i = 0
  while (i < src.length) {
    const c = src[i]
    if (/\s/.test(c)) {
      i++
      continue
    }
    if (/[A-Za-z_À-ÿ]/.test(c)) {
      let j = i
      while (j < src.length && /[A-Za-z0-9_À-ÿ]/.test(src[j])) j++
      const w = src.slice(i, j)
      const kw = KEYWORDS[w.toLowerCase()]
      out.push(kw ?? { t: 'id', v: w })
      i = j
      continue
    }
    const two = src.slice(i, i + 2)
    if (two === '&&' || two === '||') {
      out.push({ t: 'op', v: two === '&&' ? 'and' : 'or' })
      i += 2
      continue
    }
    if ('&·*∧.'.includes(c)) out.push({ t: 'op', v: 'and' })
    else if ('|+∨'.includes(c)) out.push({ t: 'op', v: 'or' })
    else if ('~!¬'.includes(c)) out.push({ t: 'op', v: 'not' })
    else if ('^⊕'.includes(c)) out.push({ t: 'op', v: 'xor' })
    else if (c === '(' || c === '[') out.push({ t: 'lp' })
    else if (c === ')' || c === ']') out.push({ t: 'rp' })
    else if (c === '0' || c === '1') out.push({ t: 'const', v: c === '1' })
    else throw new Error(`Caractère inattendu « ${c} »`)
    i++
  }
  return out
}

// Priorités : not > and/nand > xor > or/nor
const PREC: Record<BinOp, number> = { or: 1, nor: 1, xor: 2, and: 3, nand: 3 }

export function parseBool(src: string): BNode {
  const toks = tokenize(src)
  let p = 0
  const peek = () => toks[p]

  function parseLevel(level: number): BNode {
    if (level > 3) return parseUnary()
    let left = parseLevel(level + 1)
    for (;;) {
      const t = peek()
      if (!t || t.t !== 'op' || t.v === 'not' || PREC[t.v] !== level) break
      p++
      const right = parseLevel(level + 1)
      const op = t.v
      // on aplatit les chaînes associatives (A and B and C → porte à 3 entrées)
      if ((op === 'and' || op === 'or' || op === 'xor') && left.k === 'bin' && left.op === op && !(left as { paren?: boolean }).paren) {
        left = { k: 'bin', op, args: [...left.args, right] }
      } else left = { k: 'bin', op, args: [left, right] }
    }
    return left
  }
  function parseUnary(): BNode {
    const t = peek()
    if (!t) throw new Error('Expression incomplète')
    if (t.t === 'op' && t.v === 'not') {
      p++
      return { k: 'not', a: parseUnary() }
    }
    if (t.t === 'lp') {
      p++
      const e = parseLevel(1)
      if (!peek() || peek().t !== 'rp') throw new Error('Parenthèse fermante manquante')
      p++
      // marque « parenthésé » pour ne pas fusionner (A and B) and C — sans conséquence logique,
      // mais on respecte l'écriture de l'élève
      if (e.k === 'bin') return Object.assign({}, e, { paren: true }) as BNode
      return e
    }
    if (t.t === 'id') {
      p++
      return { k: 'var', name: t.v }
    }
    if (t.t === 'const') {
      p++
      return { k: 'const', v: t.v }
    }
    if (t.t === 'rp') throw new Error('Parenthèse fermante inattendue')
    throw new Error(`Opérateur « ${t.v} » mal placé`)
  }
  if (toks.length === 0) throw new Error('Expression vide')
  const e = parseLevel(1)
  if (p < toks.length) throw new Error('Symboles en trop après la fin de l’expression')
  return e
}

export function variables(n: BNode, acc: string[] = []): string[] {
  if (n.k === 'var') {
    if (!acc.includes(n.name)) acc.push(n.name)
  } else if (n.k === 'not') variables(n.a, acc)
  else if (n.k === 'bin') n.args.forEach((a) => variables(a, acc))
  return acc
}

export function evalBool(n: BNode, env: Record<string, boolean>): boolean {
  switch (n.k) {
    case 'var':
      return !!env[n.name]
    case 'const':
      return n.v
    case 'not':
      return !evalBool(n.a, env)
    case 'bin': {
      const v = n.args.map((a) => evalBool(a, env))
      switch (n.op) {
        case 'and':
          return v.every(Boolean)
        case 'or':
          return v.some(Boolean)
        case 'xor':
          return v.filter(Boolean).length % 2 === 1
        case 'nand':
          return !v.every(Boolean)
        case 'nor':
          return !v.some(Boolean)
      }
    }
  }
}

const PY_PREC = (n: BNode) => (n.k === 'bin' ? (n.op === 'nand' || n.op === 'nor' ? 4 : PREC[n.op]) : n.k === 'not' ? 4 : 5)

/** Écriture Python (nand/nor → not (… and …)) */
export function toPython(n: BNode): string {
  const wrap = (c: BNode, min: number) => {
    const s = toPython(c)
    return PY_PREC(c) < min ? `(${s})` : s
  }
  switch (n.k) {
    case 'var':
      return n.name
    case 'const':
      return n.v ? 'True' : 'False'
    case 'not':
      return `not ${wrap(n.a, 4)}`
    case 'bin': {
      if (n.op === 'nand' || n.op === 'nor') {
        const inner = n.args.map((a) => wrap(a, n.op === 'nand' ? 3 : 1)).join(n.op === 'nand' ? ' and ' : ' or ')
        return `not (${inner})`
      }
      if (n.op === 'xor') {
        // Python n'a pas de mot-clé xor : on utilise ^ (prioritaire sur not/and/or)
        return n.args.map((a) => (a.k === 'var' || a.k === 'const' ? toPython(a) : `(${toPython(a)})`)).join(' ^ ')
      }
      const lvl = PREC[n.op]
      return n.args.map((a, i) => wrap(a, i === 0 ? lvl : lvl + 1)).join(` ${n.op} `)
    }
  }
}

/** Écriture algébrique LaTeX : A·B, A + B, A ⊕ B, barre pour la négation */
export function toTex(n: BNode): string {
  const prec = (c: BNode) => (c.k === 'bin' ? (c.op === 'nand' || c.op === 'nor' ? 5 : PREC[c.op]) : 5)
  const wrap = (c: BNode, min: number) => {
    const s = toTex(c)
    return prec(c) < min ? `(${s})` : s
  }
  switch (n.k) {
    case 'var':
      return n.name.length > 1 ? `\\mathrm{${n.name.replace(/_/g, '\\_')}}` : n.name
    case 'const':
      return n.v ? '1' : '0'
    case 'not':
      return `\\overline{${toTex(n.a)}}`
    case 'bin': {
      const sym = n.op === 'and' || n.op === 'nand' ? ' \\cdot ' : n.op === 'xor' ? ' \\oplus ' : ' + '
      const lvl = n.op === 'nand' ? 3 : n.op === 'nor' ? 1 : PREC[n.op]
      const inner = n.args.map((a, i) => wrap(a, i === 0 ? lvl : lvl + 1)).join(sym)
      return n.op === 'nand' || n.op === 'nor' ? `\\overline{${inner}}` : inner
    }
  }
}

/** Sous-expressions (portes) dans l'ordre d'évaluation, sans doublon */
export function subExpressions(n: BNode, acc: BNode[] = [], seen = new Set<string>()): BNode[] {
  if (n.k === 'not') subExpressions(n.a, acc, seen)
  if (n.k === 'bin') n.args.forEach((a) => subExpressions(a, acc, seen))
  if (n.k === 'not' || n.k === 'bin') {
    const key = toPython(n)
    if (!seen.has(key)) {
      seen.add(key)
      acc.push(n)
    }
  }
  return acc
}
