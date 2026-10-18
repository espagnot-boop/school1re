export type Val = number | number[]
export interface Step {
  /** ligne (1-indexée) sur le point d'être exécutée */
  line: number
  vars: Record<string, Val>
  note: string
  out: string[]
}
export interface Program {
  id: string
  label: string
  code: string[]
  /** variables servant d'indices dans le tableau `array` */
  pointers: string[]
  array?: string
  derived?: (v: Record<string, Val>) => [string, string][]
  steps: Step[]
}

class Rec {
  steps: Step[] = []
  out: string[] = []
  at(line: number, vars: Record<string, Val>, note: string) {
    const v: Record<string, Val> = {}
    for (const k of Object.keys(vars)) v[k] = Array.isArray(vars[k]) ? [...(vars[k] as number[])] : vars[k]
    this.steps.push({ line, vars: v, note, out: [...this.out] })
  }
}

function somme(): Program {
  const code = ['def somme(t):', '    s = 0', '    for i in range(len(t)):', '        s = s + t[i]', '    return s', '', 'print(somme([4, 7, 1, 8]))']
  const t = [4, 7, 1, 8]
  const r = new Rec()
  r.at(7, {}, 'On appelle somme avec t = [4, 7, 1, 8], puis on affichera le résultat.')
  let s = 0
  r.at(2, { t, s: 0 }, 'Début de la fonction : s est initialisé à 0 (l’accumulateur).')
  s = 0
  r.at(3, { t, s }, `La boucle va parcourir les indices i = 0 à ${t.length - 1}.`)
  for (let i = 0; i < t.length; i++) {
    r.at(4, { t, s, i }, `i = ${i} : s devient ${s} + t[${i}] = ${s} + ${t[i]} = ${s + t[i]}.`)
    s += t[i]
    r.at(3, { t, s, i }, i < t.length - 1 ? `Indice suivant : i = ${i + 1}.` : 'Dernier indice traité : la boucle se termine.')
  }
  r.at(5, { t, s, i: t.length - 1 }, `On renvoie s = ${s}.`)
  r.out.push(String(s))
  r.at(7, {}, `print affiche ${s}.`)
  return { id: 'somme', label: 'Somme', code, pointers: ['i'], array: 't', steps: r.steps }
}

function maximum(): Program {
  const code = ['def maximum(t):', '    m = t[0]', '    for i in range(1, len(t)):', '        if t[i] > m:', '            m = t[i]', '    return m', '', 'print(maximum([3, 8, 2, 9, 5]))']
  const t = [3, 8, 2, 9, 5]
  const r = new Rec()
  r.at(8, {}, 'On appelle maximum avec t = [3, 8, 2, 9, 5].')
  let m = t[0]
  r.at(2, { t }, `On suppose que le maximum est le premier élément : m = t[0] = ${t[0]}.`)
  r.at(3, { t, m }, `Boucle sur i = 1 à ${t.length - 1}.`)
  for (let i = 1; i < t.length; i++) {
    const gt = t[i] > m
    r.at(4, { t, m, i }, `Test : t[${i}] > m ? ${t[i]} > ${m} est ${gt ? 'vrai' : 'faux'}.`)
    if (gt) {
      r.at(5, { t, m, i }, `Vrai : m prend la valeur t[${i}] = ${t[i]}.`)
      m = t[i]
    }
    r.at(3, { t, m, i }, i < t.length - 1 ? `Indice suivant : i = ${i + 1}.` : 'Fin du parcours.')
  }
  r.at(6, { t, m, i: t.length - 1 }, `On renvoie m = ${m}.`)
  r.out.push(String(m))
  r.at(8, {}, `print affiche ${m}.`)
  return { id: 'max', label: 'Maximum', code, pointers: ['i'], array: 't', steps: r.steps }
}

function triSelection(): Program {
  const code = [
    'def tri_selection(t):',
    '    n = len(t)',
    '    for i in range(n - 1):',
    '        i_min = i',
    '        for j in range(i + 1, n):',
    '            if t[j] < t[i_min]:',
    '                i_min = j',
    '        t[i], t[i_min] = t[i_min], t[i]',
    '    return t',
    '',
    'print(tri_selection([5, 2, 4, 1]))',
  ]
  const t = [5, 2, 4, 1]
  const n = t.length
  const r = new Rec()
  r.at(11, {}, 'On appelle tri_selection avec t = [5, 2, 4, 1] (le tableau est modifié en place).')
  r.at(2, { t }, 'On mémorise la longueur du tableau.')
  r.at(3, { t, n }, `Boucle externe : i va de 0 à ${n - 2}.`)
  for (let i = 0; i < n - 1; i++) {
    r.at(4, { t, n, i }, `i = ${i} : on suppose que le minimum de t[${i}..] est en position ${i}.`)
    let im = i
    r.at(5, { t, n, i, i_min: im }, `Boucle interne : j va de ${i + 1} à ${n - 1}.`)
    for (let j = i + 1; j < n; j++) {
      const lt = t[j] < t[im]
      r.at(6, { t, n, i, i_min: im, j }, `t[${j}] < t[${im}] ? ${t[j]} < ${t[im]} est ${lt ? 'vrai' : 'faux'}.`)
      if (lt) {
        r.at(7, { t, n, i, i_min: im, j }, `Nouveau minimum trouvé : i_min = ${j}.`)
        im = j
      }
      r.at(5, { t, n, i, i_min: im, j }, j < n - 1 ? `j suivant : ${j + 1}.` : 'Fin de la boucle interne.')
    }
    r.at(8, { t, n, i, i_min: im }, im === i ? `i_min = i : l’échange ne change rien.` : `On échange t[${i}] = ${t[i]} et t[${im}] = ${t[im]}.`)
    ;[t[i], t[im]] = [t[im], t[i]]
    r.at(3, { t, n, i, i_min: im }, `t[0..${i}] est trié et définitif.`)
  }
  r.at(9, { t, n, i: n - 2 }, 'Le tableau est trié : on le renvoie.')
  r.out.push('[' + t.join(', ') + ']')
  r.at(11, {}, `print affiche [${t.join(', ')}].`)
  return { id: 'tri_selection', label: 'Tri par sélection', code, pointers: ['i', 'j', 'i_min'], array: 't', steps: r.steps }
}

function dichotomie(): Program {
  const code = [
    'def dichotomie(t, x):',
    '    g = 0',
    '    d = len(t) - 1',
    '    while g <= d:',
    '        m = (g + d) // 2',
    '        if t[m] == x:',
    '            return m',
    '        elif t[m] < x:',
    '            g = m + 1',
    '        else:',
    '            d = m - 1',
    '    return -1',
    '',
    'print(dichotomie([2, 5, 8, 12, 16, 23, 38, 56], 16))',
  ]
  const t = [2, 5, 8, 12, 16, 23, 38, 56]
  const x = 16
  const r = new Rec()
  r.at(14, {}, 'On cherche 16 dans le tableau trié t.')
  let g = 0
  r.at(2, { t, x }, 'g est l’indice de gauche de la zone de recherche.')
  let d = t.length - 1
  r.at(3, { t, x, g }, `d est l’indice de droite : d = len(t) − 1 = ${d}.`)
  let res = -1
  while (true) {
    r.at(4, { t, x, g, d }, g <= d ? `g ≤ d (${g} ≤ ${d}) : la zone n’est pas vide, on continue.` : `g > d (${g} > ${d}) : zone vide, on sort de la boucle.`)
    if (!(g <= d)) break
    const m = Math.floor((g + d) / 2)
    r.at(5, { t, x, g, d }, `m = (${g} + ${d}) // 2 = ${m}.`)
    if (t[m] === x) {
      r.at(6, { t, x, g, d, m }, `t[${m}] == x ? ${t[m]} == ${x} est vrai.`)
      r.at(7, { t, x, g, d, m }, `On renvoie m = ${m}.`)
      res = m
      break
    }
    r.at(6, { t, x, g, d, m }, `t[${m}] == x ? ${t[m]} == ${x} est faux.`)
    const lt = t[m] < x
    r.at(8, { t, x, g, d, m }, `t[${m}] < x ? ${t[m]} < ${x} est ${lt ? 'vrai' : 'faux'}.`)
    if (lt) {
      r.at(9, { t, x, g, d, m }, `On garde la moitié droite : g = m + 1 = ${m + 1}.`)
      g = m + 1
    } else {
      r.at(11, { t, x, g, d, m }, `On garde la moitié gauche : d = m − 1 = ${m - 1}.`)
      d = m - 1
    }
  }
  r.out.push(String(res))
  r.at(14, {}, `print affiche ${res}.`)
  return {
    id: 'dichotomie',
    label: 'Dichotomie',
    code,
    pointers: ['g', 'd', 'm'],
    array: 't',
    derived: (v) => (typeof v.g === 'number' && typeof v.d === 'number' ? [['d − g + 1 (variant)', String(v.d - v.g + 1)]] : []),
    steps: r.steps,
  }
}

function factorielle(): Program {
  const code = ['def factorielle(n):', '    f = 1', '    for k in range(2, n + 1):', '        f = f * k', '    return f', '', 'print(factorielle(5))']
  const n = 5
  const r = new Rec()
  r.at(7, {}, 'On calcule 5! = 1 × 2 × 3 × 4 × 5.')
  let f = 1
  r.at(2, { n }, 'f est l’accumulateur du produit, initialisé à 1.')
  r.at(3, { n, f }, `Boucle sur k = 2 à ${n}.`)
  for (let k = 2; k <= n; k++) {
    r.at(4, { n, f, k }, `f devient ${f} × ${k} = ${f * k}.`)
    f *= k
    r.at(3, { n, f, k }, k < n ? `k suivant : ${k + 1}.` : 'Fin de la boucle.')
  }
  r.at(5, { n, f, k: n }, `On renvoie f = ${f}.`)
  r.out.push(String(f))
  r.at(7, {}, `print affiche ${f}.`)
  return { id: 'factorielle', label: 'Factorielle', code, pointers: [], steps: r.steps }
}

export const PROGRAMS: Record<string, Program> = {
  somme: somme(),
  max: maximum(),
  tri_selection: triSelection(),
  dichotomie: dichotomie(),
  factorielle: factorielle(),
}
