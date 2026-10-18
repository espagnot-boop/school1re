import type { Chapter } from '../types'

const r = String.raw

// ---------------------------------------------------------------------------
// Petits utilitaires SVG (privés à ce fichier)
// ---------------------------------------------------------------------------
const FONT = 'font-family="Geist, sans-serif"'
const BLUE = 'hsl(217 91% 60%)'
const RED = 'hsl(0 84% 60%)'
const GREEN = 'hsl(142 71% 45%)'
const ORANGE = 'hsl(25 95% 53%)'
const VIOLET = 'hsl(263 70% 60%)'

interface Frame { x0: number; x1: number; y0: number; y1: number; L: number; T: number; W: number; H: number }
const X = (F: Frame, x: number) => +(F.L + ((x - F.x0) / (F.x1 - F.x0)) * F.W).toFixed(1)
const Y = (F: Frame, y: number) => +(F.T + ((F.y1 - y) / (F.y1 - F.y0)) * F.H).toFixed(1)

function axes(F: Frame, xt: number[], yt: number[], xl = 'x', yl = 'y'): string {
  let s = ''
  for (const t of xt) s += `<line x1="${X(F, t)}" y1="${F.T}" x2="${X(F, t)}" y2="${F.T + F.H}" stroke="currentColor" opacity="0.1"/>`
  for (const t of yt) s += `<line x1="${F.L}" y1="${Y(F, t)}" x2="${F.L + F.W}" y2="${Y(F, t)}" stroke="currentColor" opacity="0.1"/>`
  const ox = X(F, 0)
  const oy = Y(F, 0)
  s += `<line x1="${F.L}" y1="${oy}" x2="${F.L + F.W}" y2="${oy}" stroke="currentColor" stroke-width="1.2"/>`
  s += `<line x1="${ox}" y1="${F.T + F.H}" x2="${ox}" y2="${F.T}" stroke="currentColor" stroke-width="1.2"/>`
  s += `<text x="${F.L + F.W - 4}" y="${oy - 6}" text-anchor="end" fill="currentColor" font-style="italic">${xl}</text>`
  s += `<text x="${ox + 6}" y="${F.T + 12}" fill="currentColor" font-style="italic">${yl}</text>`
  for (const t of xt) if (t !== 0) s += `<text x="${X(F, t)}" y="${oy + 14}" text-anchor="middle" fill="currentColor" opacity="0.75" font-size="11">${t}</text>`
  for (const t of yt) if (t !== 0) s += `<text x="${ox - 5}" y="${Y(F, t) + 4}" text-anchor="end" fill="currentColor" opacity="0.75" font-size="11">${t}</text>`
  s += `<text x="${ox - 5}" y="${oy + 14}" text-anchor="end" fill="currentColor" opacity="0.75" font-size="11">0</text>`
  return s
}

// ---------------------------------------------------------------------------
// Schéma 1 : nuages de points — arithmétique vs géométrique
// ---------------------------------------------------------------------------
const FN: Frame = { x0: 0, x1: 10.8, y0: 0, y1: 10.5, L: 40, T: 20, W: 430, H: 260 }
const ptsArith = Array.from({ length: 11 }, (_, n) => `<circle cx="${X(FN, n)}" cy="${Y(FN, 2 + 0.8 * n)}" r="4.5" fill="${BLUE}"/>`).join('')
const ptsGeo = Array.from({ length: 11 }, (_, n) => `<rect x="${X(FN, n) - 4}" y="${Y(FN, Math.pow(1.25, n)) - 4}" width="8" height="8" fill="${ORANGE}"/>`).join('')
const svgNuage = `<svg viewBox="0 0 640 310" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
${axes(FN, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [2, 4, 6, 8, 10], 'n', 'uₙ')}
<line x1="${X(FN, 0)}" y1="${Y(FN, 2)}" x2="${X(FN, 10)}" y2="${Y(FN, 10)}" stroke="${BLUE}" stroke-dasharray="4 4" opacity="0.6"/>
${ptsArith}${ptsGeo}
<g fill="currentColor">
<circle cx="490" cy="46" r="4.5" fill="${BLUE}"/><text x="502" y="50">uₙ = 2 + 0,8n</text>
<text x="490" y="68" opacity="0.75">arithmétique, r = 0,8</text>
<text x="490" y="84" opacity="0.75">points alignés</text>
<text x="490" y="100" opacity="0.75">(croissance linéaire)</text>
<rect x="486" y="126" width="8" height="8" fill="${ORANGE}"/><text x="502" y="134">vₙ = 1,25ⁿ</text>
<text x="490" y="152" opacity="0.75">géométrique, q = 1,25</text>
<text x="490" y="168" opacity="0.75">écarts de plus en plus</text>
<text x="490" y="184" opacity="0.75">grands (croissance</text>
<text x="490" y="200" opacity="0.75">exponentielle)</text>
<text x="490" y="232">Une suite n’est définie</text>
<text x="490" y="248">que pour n entier :</text>
<text x="490" y="264">on ne relie pas les points.</text>
</g>
</svg>`

// ---------------------------------------------------------------------------
// Schéma 2 : toile d'araignée pour u(n+1) = 0,5 u(n) + 2, u0 = 0
// ---------------------------------------------------------------------------
const FT: Frame = { x0: 0, x1: 5.4, y0: 0, y1: 5.4, L: 40, T: 15, W: 290, H: 290 }
let toile = ''
{
  let u = 0
  let d = `M${X(FT, u)},${Y(FT, 0)}`
  for (let k = 0; k < 6; k++) {
    const v = 0.5 * u + 2
    d += ` L${X(FT, u)},${Y(FT, v)} L${X(FT, v)},${Y(FT, v)}`
    u = v
  }
  toile = `<path d="${d}" fill="none" stroke="${RED}" stroke-width="1.6"/>`
  const us = [0, 2, 3, 3.5, 3.75]
  us.forEach((val, i) => {
    toile += `<circle cx="${X(FT, val)}" cy="${Y(FT, 0)}" r="3.5" fill="${GREEN}"/>`
    toile += `<text x="${X(FT, val)}" y="${Y(FT, 0) + 28}" text-anchor="middle" fill="${GREEN}" font-size="11">u${['₀', '₁', '₂', '₃', '₄'][i]}</text>`
  })
}
const svgToile = `<svg viewBox="0 0 640 330" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
${axes(FT, [1, 2, 3, 4, 5], [1, 2, 3, 4, 5])}
<line x1="${X(FT, 0)}" y1="${Y(FT, 0)}" x2="${X(FT, 5.4)}" y2="${Y(FT, 5.4)}" stroke="${VIOLET}" stroke-width="1.5"/>
<line x1="${X(FT, 0)}" y1="${Y(FT, 2)}" x2="${X(FT, 5.4)}" y2="${Y(FT, 4.7)}" stroke="${BLUE}" stroke-width="2.2"/>
${toile}
<circle cx="${X(FT, 4)}" cy="${Y(FT, 4)}" r="4" fill="none" stroke="currentColor"/>
<g fill="currentColor">
<text x="360" y="40" font-weight="600">uₙ₊₁ = f(uₙ) avec f(x) = 0,5x + 2</text>
<text x="360" y="62" fill="${BLUE}">— courbe de f</text>
<text x="360" y="80" fill="${VIOLET}">— droite y = x (« renvoi »)</text>
<text x="360" y="104">1. Partir de u₀ sur l’axe des abscisses.</text>
<text x="360" y="122">2. Monter jusqu’à la courbe : on lit u₁ = f(u₀)</text>
<text x="360" y="140">   en ordonnée.</text>
<text x="360" y="158">3. Aller horizontalement jusqu’à y = x pour</text>
<text x="360" y="176">   reporter u₁ en abscisse.</text>
<text x="360" y="194">4. Recommencer.</text>
<text x="360" y="222">u₀ = 0 ; u₁ = 2 ; u₂ = 3 ; u₃ = 3,5 ; u₄ = 3,75…</text>
<text x="360" y="246">Les termes semblent se rapprocher de 4,</text>
<text x="360" y="264">abscisse du point d’intersection</text>
<text x="360" y="282">de la courbe et de la droite y = x.</text>
</g>
</svg>`

// ---------------------------------------------------------------------------
// Schéma 3 : somme de Gauss 1 + 2 + … + 6 (deux escaliers = rectangle 6 × 7)
// ---------------------------------------------------------------------------
let gauss = ''
{
  const s = 30
  const ox = 60
  const oy = 30
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      const blue = col <= row
      gauss += `<rect x="${ox + col * s}" y="${oy + row * s}" width="${s - 2}" height="${s - 2}" fill="${blue ? BLUE : ORANGE}" fill-opacity="${blue ? 0.55 : 0.35}" stroke="${blue ? BLUE : ORANGE}"/>`
    }
    gauss += `<text x="${ox - 10}" y="${oy + row * s + 19}" text-anchor="end" fill="currentColor" font-size="11">${row + 1}</text>`
  }
}
const svgGauss = `<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
${gauss}
<text x="165" y="226" text-anchor="middle" fill="currentColor">7 colonnes (= n + 1)</text>
<g fill="currentColor">
<text x="320" y="50" font-weight="600">S = 1 + 2 + 3 + 4 + 5 + 6</text>
<text x="320" y="76" fill="${BLUE}">■ escalier bleu : S carreaux</text>
<text x="320" y="96" fill="${ORANGE}">■ escalier orange (retourné) : S carreaux</text>
<text x="320" y="124">Ensemble : un rectangle 6 × 7</text>
<text x="320" y="144">2S = 6 × 7 = 42, donc S = 21</text>
<text x="320" y="178" font-weight="600">En général : 1 + 2 + … + n = n(n + 1)/2</text>
</g>
</svg>`

// ---------------------------------------------------------------------------
const chapter: Chapter = {
  id: 'suites',
  subject: 'maths',
  order: 2,
  title: 'Suites numériques',
  theme: 'Algèbre',
  summary:
    'Modes de génération d’une suite, représentation graphique, sens de variation, suites arithmétiques et géométriques, sommes de termes, notion de limite et algorithmes en Python.',
  duration: '4 semaines',
  objectives: [
    'Dans le cadre d’une modélisation, décrire une suite par une formule explicite ou par une relation de récurrence.',
    'Calculer des termes d’une suite définie explicitement ou par récurrence, à la main, au tableur ou en Python.',
    'Représenter graphiquement une suite (nuage de points, construction en escalier ou « toile d’araignée »).',
    'Étudier le sens de variation d’une suite (signe de $u_{n+1} - u_n$, comparaison de $\\frac{u_{n+1}}{u_n}$ à 1, fonction associée).',
    'Reconnaître une suite arithmétique ou géométrique ; exprimer son terme général.',
    'Calculer $1 + 2 + \\cdots + n$, $1 + q + \\cdots + q^n$ et des sommes de termes consécutifs.',
    'Conjecturer la limite éventuelle d’une suite à partir de calculs ou d’un graphique.',
    'Écrire un algorithme (Python) calculant un terme, une somme, ou déterminant un seuil.',
  ],
  keywords: [
    'suite',
    'terme général',
    'récurrence',
    'formule explicite',
    'suite arithmétique',
    'raison',
    'suite géométrique',
    'somme des termes',
    'sens de variation',
    'limite',
    'seuil',
    'Python',
  ],

  // =========================================================================
  // FICHE
  // =========================================================================
  fiche: [
    { type: 'h2', text: 'Générer une suite' },
    {
      type: 'table',
      headers: ['Mode', 'Exemple', 'Calcul de $u_{10}$'],
      rows: [
        ['Explicite : $u_n = f(n)$', '$u_n = n^2 - 3n$', 'Direct : $u_{10} = 70$'],
        ['Récurrence : $u_0$ et $u_{n+1} = f(u_n)$', '$u_0 = 2$, $u_{n+1} = 3u_n - 1$', 'Il faut $u_1, u_2, \\ldots, u_9$ (boucle)'],
      ],
    },
    { type: 'h2', text: 'Sens de variation' },
    {
      type: 'list',
      items: [
        '$(u_n)$ **croissante** : $u_{n+1} \\geq u_n$ pour tout $n$ ; **décroissante** : $u_{n+1} \\leq u_n$.',
        'Méthode 1 : étudier le **signe de $u_{n+1} - u_n$**.',
        'Méthode 2 (termes strictement positifs) : comparer $\\frac{u_{n+1}}{u_n}$ à $1$.',
        'Méthode 3 : si $u_n = f(n)$ avec $f$ monotone sur $[0 \\,;\\, +\\infty[$, $(u_n)$ a le même sens de variation.',
      ],
    },
    { type: 'h2', text: 'Arithmétique / géométrique' },
    {
      type: 'table',
      headers: ['', 'Arithmétique (raison $r$)', 'Géométrique (raison $q$)'],
      rows: [
        ['Récurrence', '$u_{n+1} = u_n + r$', '$u_{n+1} = q \\times u_n$'],
        ['Terme général', '$u_n = u_0 + nr$', '$u_n = u_0 \\times q^n$'],
        ['Entre deux rangs', '$u_n = u_p + (n-p)r$', '$u_n = u_p \\times q^{n-p}$'],
        ['Reconnaître', '$u_{n+1} - u_n$ constant', '$\\frac{u_{n+1}}{u_n}$ constant (termes non nuls)'],
        ['Variations', 'signe de $r$', '$u_0 > 0$ : croissante si $q > 1$, décroissante si $0 < q < 1$'],
        ['Graphique', 'points alignés', 'croissance/décroissance exponentielle'],
        ['Évolution', '$+r$ à chaque étape', 'évolution de $t$ % : $q = 1 + \\frac{t}{100}$'],
      ],
    },
    { type: 'h2', text: 'Sommes à connaître' },
    { type: 'math', tex: r`1 + 2 + \cdots + n = \frac{n(n+1)}{2} \qquad\qquad 1 + q + q^2 + \cdots + q^n = \frac{1 - q^{n+1}}{1 - q} \quad (q \neq 1)` },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Sommes de termes consécutifs',
      content: [
        { type: 'list', items: ['Arithmétique : $S = (\\text{nombre de termes}) \\times \\dfrac{\\text{premier} + \\text{dernier}}{2}$.', 'Géométrique ($q \\neq 1$) : $S = \\text{premier} \\times \\dfrac{1 - q^{\\text{nombre de termes}}}{1 - q}$.', 'De $u_p$ à $u_n$ il y a $n - p + 1$ termes.'] },
      ],
    },
    { type: 'h2', text: 'Limites (notion intuitive)' },
    {
      type: 'table',
      headers: ['Valeur de $q$', '$q > 1$', '$q = 1$', '$0 \\leq q < 1$', '$-1 < q < 0$', '$q \\leq -1$'],
      rows: [['$q^n$ quand $n \\to +\\infty$', '$+\\infty$', '$1$', '$0$', '$0$', 'pas de limite']],
    },
    { type: 'h2', text: 'Python : seuil' },
    {
      type: 'code',
      lang: 'python',
      code: `def seuil(S):
    n, u = 0, 2000          # u0
    while u <= S:           # tant que le seuil n'est pas dépassé
        u = 1.03 * u        # relation de récurrence
        n = n + 1
    return n`,
    },
  ],

  // =========================================================================
  // COURS
  // =========================================================================
  cours: [
    { type: 'h2', text: '1. Qu’est-ce qu’une suite ?' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Définition',
      content: [
        { type: 'p', text: 'Une **suite numérique** $u$ est une fonction de $\\mathbb{N}$ (ou d’une partie de $\\mathbb{N}$) dans $\\mathbb{R}$, qui à tout entier $n$ associe un réel noté $u_n$ (plutôt que $u(n)$).' },
        { type: 'list', items: ['$u_n$ est le **terme de rang $n$** (ou d’indice $n$) ;', 'la suite se note $u$ ou $(u_n)$ ou $(u_n)_{n \\in \\mathbb{N}}$ ;', 'si la suite commence à $n = 1$, on écrit $(u_n)_{n \\geq 1}$.'] },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ne pas confondre',
      content: [
        { type: 'p', text: '$u_{n+1}$ (terme qui suit $u_n$) et $u_n + 1$ (on ajoute 1 au terme $u_n$). Si $u_n = n^2$ : $u_{n+1} = (n+1)^2 = n^2 + 2n + 1$ alors que $u_n + 1 = n^2 + 1$.' },
        { type: 'p', text: 'Le terme de rang $n$ n’est pas forcément le $n$-ième terme : si la suite commence à $u_0$, le $n$-ième terme est $u_{n-1}$.' },
      ],
    },

    { type: 'h2', text: '2. Modes de génération' },
    { type: 'h3', text: 'a) Formule explicite' },
    {
      type: 'p',
      text: 'La suite est définie par une formule $u_n = f(n)$ où $f$ est une fonction définie au moins sur $[0 \\,;\\, +\\infty[$. On peut calculer **directement** n’importe quel terme.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        { type: 'p', text: '$u_n = n^2 - 3n$ pour $n \\in \\mathbb{N}$ : $u_0 = 0$, $u_1 = -2$, $u_2 = -2$, $u_3 = 0$, $u_4 = 4$, $u_{10} = 100 - 30 = 70$.' },
        { type: 'p', text: 'Ici $f(x) = x^2 - 3x$.' },
      ],
    },
    { type: 'h3', text: 'b) Relation de récurrence' },
    {
      type: 'p',
      text: 'La suite est définie par son **premier terme** et une **relation** permettant de calculer chaque terme à partir du précédent : $u_0$ donné et, pour tout $n$, $u_{n+1} = f(u_n)$.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        { type: 'p', text: '$u_0 = 2$ et $u_{n+1} = 3u_n - 1$ : $u_1 = 3 \\times 2 - 1 = 5$, $u_2 = 3 \\times 5 - 1 = 14$, $u_3 = 3 \\times 14 - 1 = 41$.' },
        { type: 'p', text: 'Pour calculer $u_{10}$, il faut calculer tous les termes précédents : c’est le travail d’une **boucle** (calculatrice, tableur, Python).' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Autres façons de générer une suite',
      content: [
        {
          type: 'list',
          items: [
            'Récurrence faisant intervenir $n$ : $u_{n+1} = u_n + 2n + 1$.',
            'Motif géométrique : nombre d’allumettes pour construire $n$ carrés accolés ($3n + 1$).',
            'Algorithme ou processus : $u_n$ = $n$-ième décimale de $\\pi$, population après $n$ années…',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Au tableur',
      content: [{ type: 'p', text: 'En A2 : `0` ; en B2 : `=2` ($u_0$) ; en A3 : `=A2+1` ; en B3 : `=3*B2-1` (récurrence) ou `=A3^2-3*A3` (explicite), puis on recopie vers le bas.' }],
    },

    { type: 'h2', text: '3. Représentation graphique' },
    {
      type: 'p',
      text: 'Dans un repère, la représentation graphique d’une suite $(u_n)$ est le **nuage des points** de coordonnées $(n \\,;\\, u_n)$. Ces points sont isolés : on ne les relie pas (une suite n’est définie que pour des entiers).',
    },
    { type: 'svg', svg: svgNuage, caption: 'Nuage de points d’une suite arithmétique (points alignés) et d’une suite géométrique.', maxWidth: 640 },
    {
      type: 'p',
      text: 'Pour une suite définie par récurrence $u_{n+1} = f(u_n)$, on peut placer les termes **sur l’axe des abscisses** grâce à la courbe de $f$ et à la droite d’équation $y = x$ : c’est la construction en « toile d’araignée » (ou en escalier).',
    },
    { type: 'svg', svg: svgToile, caption: 'Construction des premiers termes de $u_{n+1} = 0{,}5u_n + 2$, $u_0 = 0$.', maxWidth: 640 },

    { type: 'h2', text: '4. Sens de variation' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Définitions',
      content: [
        {
          type: 'list',
          items: [
            '$(u_n)$ est **croissante** si pour tout $n$, $u_{n+1} \\geq u_n$ ;',
            '$(u_n)$ est **décroissante** si pour tout $n$, $u_{n+1} \\leq u_n$ ;',
            '$(u_n)$ est **constante** si pour tout $n$, $u_{n+1} = u_n$ ;',
            '$(u_n)$ est **monotone** si elle est croissante ou décroissante.',
          ],
        },
        { type: 'p', text: 'Avec des inégalités strictes, on parle de suite strictement croissante / décroissante. Ces propriétés peuvent n’être vraies qu’**à partir d’un certain rang** $n_0$.' },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Méthode de la différence', text: 'Calculer $u_{n+1} - u_n$, simplifier, étudier son signe. Positif pour tout $n$ ⇒ croissante ; négatif ⇒ décroissante.' },
        { title: 'Méthode du quotient (si $u_n > 0$ pour tout $n$)', text: 'Calculer $\\frac{u_{n+1}}{u_n}$ et le comparer à $1$ : $\\geq 1$ ⇒ croissante ; $\\leq 1$ ⇒ décroissante. Adaptée aux puissances.' },
        { title: 'Méthode de la fonction (suite explicite)', text: 'Si $u_n = f(n)$ et $f$ est croissante (resp. décroissante) sur $[0 \\,;\\, +\\infty[$, alors $(u_n)$ l’est aussi.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple 1 (différence) : $u_n = n^2 + n$',
      content: [
        { type: 'math', tex: r`u_{n+1} - u_n = (n+1)^2 + (n+1) - n^2 - n = 2n + 2 > 0` },
        { type: 'p', text: 'Donc $(u_n)$ est strictement croissante.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple 2 (quotient) : $v_n = \\dfrac{3^n}{5^{n}}$',
      content: [{ type: 'p', text: 'Pour tout $n$, $v_n > 0$ et $\\frac{v_{n+1}}{v_n} = \\frac{3^{n+1}}{5^{n+1}} \\times \\frac{5^n}{3^n} = \\frac{3}{5} < 1$ : $(v_n)$ est strictement décroissante.' }],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple 3 (fonction) : $w_n = \\dfrac{1}{n+1}$',
      content: [{ type: 'p', text: '$w_n = f(n)$ avec $f(x) = \\frac{1}{x+1}$, décroissante sur $[0 \\,;\\, +\\infty[$ : $(w_n)$ est décroissante.' }],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Attention à la récurrence',
      content: [{ type: 'p', text: 'Pour $u_{n+1} = f(u_n)$, le sens de variation de $f$ **ne donne pas** celui de $(u_n)$ ! Avec $f(x) = 0{,}5x + 2$ (croissante), la suite est croissante si $u_0 = 0$ mais décroissante si $u_0 = 10$ ($u_1 = 7$, $u_2 = 5{,}5$…).' }],
    },

    { type: 'h2', text: '5. Suites arithmétiques' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Définition',
      content: [{ type: 'p', text: 'Une suite $(u_n)$ est **arithmétique** s’il existe un réel $r$, appelé **raison**, tel que pour tout $n \\in \\mathbb{N}$ : $u_{n+1} = u_n + r$. On passe d’un terme au suivant en **ajoutant** toujours le même nombre.' }],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Terme général',
      content: [
        { type: 'p', text: 'Si $(u_n)$ est arithmétique de raison $r$, alors pour tous entiers $n$ et $p$ :' },
        { type: 'math', tex: r`u_n = u_0 + nr \qquad\qquad u_n = u_p + (n-p)\,r` },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [
        { type: 'p', text: 'On ajoute $r$ à chaque étape : $u_1 = u_0 + r$, $u_2 = u_1 + r = u_0 + 2r$, …, et après $n$ étapes $u_n = u_0 + nr$. De même, de $u_p$ à $u_n$, il y a $n - p$ étapes, d’où $u_n = u_p + (n-p)r$.' },
        { type: 'p', text: 'Réciproquement, une suite de la forme $u_n = an + b$ est arithmétique de raison $a$ : $u_{n+1} - u_n = a(n+1) + b - an - b = a$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Variations et représentation',
      content: [
        { type: 'list', items: ['$r > 0$ : strictement croissante ; $r < 0$ : strictement décroissante ; $r = 0$ : constante.', 'Les points $(n \\,;\\, u_n)$ sont **alignés** sur la droite d’équation $y = rx + u_0$ : on parle de **croissance linéaire**.'] },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples',
      content: [
        { type: 'p', text: '**a)** $u_0 = 5$ et $r = 3$ : $u_n = 5 + 3n$, $u_{20} = 65$.' },
        { type: 'p', text: '**b)** $u_4 = 10$ et $u_9 = 25$ : $u_9 = u_4 + 5r$ donc $5r = 15$, $r = 3$, puis $u_0 = u_4 - 4r = -2$ et $u_n = -2 + 3n$.' },
        { type: 'p', text: '**c)** Montrer que $v_n = 4 - 2n$ définit une suite arithmétique : $v_{n+1} - v_n = 4 - 2(n+1) - 4 + 2n = -2$, constante. Raison $-2$, premier terme $v_0 = 4$.' },
      ],
    },

    { type: 'h2', text: '6. Somme $1 + 2 + \\cdots + n$ et sommes arithmétiques' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Somme des premiers entiers',
      content: [{ type: 'math', tex: r`\text{Pour tout } n \geq 1, \quad 1 + 2 + 3 + \cdots + n = \frac{n(n+1)}{2}.` }],
    },
    {
      type: 'reveal',
      title: 'Démonstration (méthode de Gauss)',
      content: [
        { type: 'p', text: 'On écrit la somme $S$ dans les deux sens et on additionne terme à terme :' },
        { type: 'math', tex: r`\begin{array}{rcccccccc} S &=& 1 &+& 2 &+& \cdots &+& n \\ S &=& n &+& (n-1) &+& \cdots &+& 1 \\ \hline 2S &=& (n+1) &+& (n+1) &+& \cdots &+& (n+1) \end{array}` },
        { type: 'p', text: 'Il y a $n$ termes égaux à $n+1$, donc $2S = n(n+1)$ et $S = \\frac{n(n+1)}{2}$.' },
      ],
    },
    { type: 'svg', svg: svgGauss, caption: 'Preuve visuelle : deux « escaliers » de $1 + 2 + \\cdots + 6$ carreaux forment un rectangle $6 \\times 7$.', maxWidth: 640 },
    {
      type: 'callout',
      variant: 'property',
      title: 'Somme de termes consécutifs d’une suite arithmétique',
      content: [
        { type: 'math', tex: r`S = u_p + u_{p+1} + \cdots + u_n = (n - p + 1) \times \frac{u_p + u_n}{2}` },
        { type: 'p', text: 'Moyen mnémotechnique : **nombre de termes × moyenne du premier et du dernier**.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        { type: 'p', text: 'Avec $u_n = 5 + 3n$ : $S = u_0 + u_1 + \\cdots + u_{20}$ compte $21$ termes, $u_0 = 5$, $u_{20} = 65$, donc $S = 21 \\times \\frac{5 + 65}{2} = 21 \\times 35 = 735$.' },
        { type: 'p', text: 'Autre méthode : $S = 21 \\times 5 + 3(0 + 1 + \\cdots + 20) = 105 + 3 \\times \\frac{20 \\times 21}{2} = 105 + 630 = 735$. ✔' },
      ],
    },

    { type: 'h2', text: '7. Suites géométriques' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Définition',
      content: [{ type: 'p', text: 'Une suite $(u_n)$ est **géométrique** s’il existe un réel $q$, appelé **raison**, tel que pour tout $n \\in \\mathbb{N}$ : $u_{n+1} = q \\times u_n$. On passe d’un terme au suivant en **multipliant** toujours par le même nombre.' }],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Terme général',
      content: [{ type: 'math', tex: r`u_n = u_0 \times q^n \qquad\qquad u_n = u_p \times q^{\,n-p}` }],
    },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [{ type: 'p', text: 'On multiplie par $q$ à chaque étape : $u_1 = u_0 q$, $u_2 = u_1 q = u_0 q^2$, …, $u_n = u_0 q^n$. Réciproquement, $u_n = a \\times b^n$ définit une suite géométrique de raison $b$ car $u_{n+1} = a b^{n+1} = b \\times u_n$.' }],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Reconnaître une suite géométrique',
      content: [{ type: 'p', text: 'Montrer que $u_{n+1} = q \\times u_n$ avec $q$ indépendant de $n$ ; si les termes sont non nuls, cela revient à montrer que $\\frac{u_{n+1}}{u_n}$ est constant. Pour **prouver** qu’une suite **n’est pas** géométrique, un contre-exemple suffit : $\\frac{u_1}{u_0} \\neq \\frac{u_2}{u_1}$.' }],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Sens de variation (cas $u_0 > 0$)',
      content: [
        {
          type: 'list',
          items: [
            '$q > 1$ : strictement croissante ;',
            '$0 < q < 1$ : strictement décroissante ;',
            '$q = 1$ : constante ;',
            '$q < 0$ : les termes changent de signe, la suite n’est pas monotone.',
          ],
        },
        { type: 'p', text: 'Si $u_0 < 0$, les sens sont inversés. Justification : $u_{n+1} - u_n = u_0 q^n (q - 1)$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Lien avec les pourcentages',
      content: [
        { type: 'p', text: 'Une grandeur qui augmente de $t$ % par période est multipliée par $q = 1 + \\frac{t}{100}$ : elle évolue selon une suite géométrique. Diminuer de $t$ % : $q = 1 - \\frac{t}{100}$.' },
        { type: 'p', text: 'Une ville de $2\\,000$ habitants gagnant $3$ % par an : $u_n = 2\\,000 \\times 1{,}03^n$, et $u_{10} = 2\\,000 \\times 1{,}03^{10} \\approx 2\\,688$ habitants.' },
      ],
    },

    { type: 'h2', text: '8. Somme $1 + q + \\cdots + q^n$ et sommes géométriques' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Théorème',
      content: [{ type: 'math', tex: r`\text{Pour } q \neq 1 \text{ et } n \in \mathbb{N}, \quad 1 + q + q^2 + \cdots + q^n = \frac{1 - q^{n+1}}{1 - q}.` }],
    },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [
        { type: 'p', text: 'Notons $S = 1 + q + \\cdots + q^n$. Alors $qS = q + q^2 + \\cdots + q^{n+1}$. En soustrayant, presque tous les termes s’éliminent :' },
        { type: 'math', tex: r`S - qS = 1 - q^{n+1} \iff S(1-q) = 1 - q^{n+1} \iff S = \frac{1 - q^{n+1}}{1-q} \quad (q \neq 1).` },
        { type: 'p', text: 'Si $q = 1$, la somme vaut simplement $n + 1$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Somme de termes consécutifs d’une suite géométrique ($q \\neq 1$)',
      content: [{ type: 'math', tex: r`u_p + \cdots + u_n = u_p \times \frac{1 - q^{\,n-p+1}}{1 - q} = \text{premier terme} \times \frac{1 - q^{\text{nombre de termes}}}{1-q}` }],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'La légende de l’échiquier',
      content: [
        { type: 'p', text: 'On place $1$ grain de riz sur la première case, $2$ sur la deuxième, $4$ sur la troisième… en doublant à chaque case. Sur les $64$ cases :' },
        { type: 'math', tex: r`1 + 2 + 2^2 + \cdots + 2^{63} = \frac{1 - 2^{64}}{1 - 2} = 2^{64} - 1 \approx 1{,}8 \times 10^{19} \text{ grains.}` },
        { type: 'p', text: 'De même $1 + 2 + 4 + \\cdots + 2^{10} = 2^{11} - 1 = 2\\,047$.' },
      ],
    },

    { type: 'h2', text: '9. Notion intuitive de limite' },
    {
      type: 'p',
      text: 'On s’intéresse au comportement des termes $u_n$ quand $n$ devient très grand (« $n$ tend vers $+\\infty$ »). En Première, on se contente de **conjecturer** ce comportement (tableau de valeurs, graphique, programme).',
    },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Limite finie $\\ell$', text: 'Les termes deviennent aussi proches de $\\ell$ que l’on veut : $\\lim u_n = \\ell$. Ex. $\\frac{1}{n} \\to 0$, $3 + \\frac{1}{n+1} \\to 3$.', icon: 'Target' },
        { title: 'Limite $+\\infty$ ou $-\\infty$', text: 'Les termes dépassent (resp. passent sous) n’importe quel seuil : $n^2 \\to +\\infty$, $-2n \\to -\\infty$.', icon: 'TrendingUp' },
        { title: 'Pas de limite', text: 'Les termes ne se stabilisent pas : $(-1)^n$ vaut alternativement $1$ et $-1$.', icon: 'Shuffle' },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Limite de $q^n$ (admise)',
      content: [
        { type: 'list', items: ['Si $q > 1$ : $q^n \\to +\\infty$.', 'Si $-1 < q < 1$ : $q^n \\to 0$.', 'Si $q = 1$ : $q^n = 1$.', 'Si $q \\leq -1$ : pas de limite.'] },
        { type: 'p', text: 'Ainsi $1 + \\frac{1}{2} + \\frac{1}{4} + \\cdots + \\frac{1}{2^n} = 2\\left(1 - \\frac{1}{2^{n+1}}\\right)$ semble tendre vers $2$.' },
      ],
    },
    {
      type: 'table',
      caption: 'Conjecturer une limite à l’aide d’un tableau de valeurs ($u_n = \\frac{2n+1}{n+1}$).',
      headers: ['$n$', '$0$', '$1$', '$10$', '$100$', '$1\\,000$', '$10^6$'],
      rows: [['$u_n$', '$1$', '$1{,}5$', '$\\approx 1{,}909$', '$\\approx 1{,}990$', '$\\approx 1{,}999$', '$\\approx 1{,}999\\,999$']],
    },
    { type: 'p', text: 'On conjecture que $\\lim\\limits_{n \\to +\\infty} u_n = 2$ (en effet $u_n = 2 - \\frac{1}{n+1}$).' },

    { type: 'h2', text: '10. Algorithmes en Python' },
    { type: 'h3', text: 'Calcul d’un terme (récurrence)' },
    {
      type: 'code',
      lang: 'python',
      caption: 'Terme de rang n de la suite u0 = 2, u(n+1) = 3u(n) − 1.',
      code: `def terme(n):
    u = 2                    # u0
    for k in range(n):       # n répétitions : on passe de u0 à un
        u = 3 * u - 1
    return u

print(terme(3))   # 41`,
    },
    { type: 'h3', text: 'Liste des premiers termes et somme' },
    {
      type: 'code',
      lang: 'python',
      code: `def liste_termes(n):
    u = 2
    L = [u]
    for k in range(n):
        u = 3 * u - 1
        L.append(u)
    return L                  # [u0, u1, ..., un]

def somme_arith(n):
    S = 0
    for k in range(n + 1):    # k = 0, 1, ..., n
        S = S + (5 + 3 * k)   # u_k = 5 + 3k
    return S

print(liste_termes(3))   # [2, 5, 14, 41]
print(somme_arith(20))   # 735`,
    },
    { type: 'h3', text: 'Algorithme de seuil' },
    {
      type: 'p',
      text: 'On cherche le **plus petit entier $n$** tel que $u_n$ dépasse un seuil $S$. On ne connaît pas à l’avance le nombre d’itérations : on utilise une boucle **while** (« tant que »).',
    },
    {
      type: 'code',
      lang: 'python',
      caption: 'Ville de 2 000 habitants, +3 % par an : à partir de quelle année dépasse-t-elle 3 000 habitants ?',
      code: `def seuil(S):
    n = 0
    u = 2000
    while u <= S:      # on continue TANT QUE le seuil n'est pas dépassé
        u = 1.03 * u
        n = n + 1
    return n

print(seuil(3000))   # 14`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Pièges de l’algorithme de seuil',
      content: [
        {
          type: 'list',
          items: [
            'La condition du `while` est la **négation** de la condition d’arrêt : on veut $u > 3\\,000$, donc on boucle tant que $u \\leq 3\\,000$.',
            'Mettre à jour $u$ **et** $n$ dans la boucle, sinon boucle infinie ou mauvais rang.',
            'S’assurer que le seuil sera atteint (ici $1{,}03^n \\to +\\infty$) ; sinon le programme ne s’arrête jamais.',
          ],
        },
        { type: 'p', text: 'Vérification : $2\\,000 \\times 1{,}03^{13} \\approx 2\\,937$ et $2\\,000 \\times 1{,}03^{14} \\approx 3\\,025$ : c’est bien $n = 14$.' },
      ],
    },
    { type: 'widget', id: 'python-tracer', props: { program: 'somme' }, title: 'Exécuter pas à pas un calcul de somme', caption: 'Observez l’évolution des variables à chaque tour de boucle.' },
    {
      type: 'callout',
      variant: 'history',
      title: 'Un peu d’histoire',
      content: [{ type: 'p', text: 'La suite de **Fibonacci** ($F_0 = 0$, $F_1 = 1$, $F_{n+2} = F_{n+1} + F_n$), introduite en 1202 pour modéliser une population de lapins, est l’exemple le plus célèbre de récurrence. L’anecdote du jeune **Gauss** calculant $1 + 2 + \\cdots + 100 = 5\\,050$ en quelques instants est sans doute embellie, mais sa méthode est celle démontrée plus haut.' }],
    },
  ],

  // =========================================================================
  // EXERCICES
  // =========================================================================
  exercices: [
    {
      id: 'su-ex1',
      title: 'Calculer des termes',
      difficulty: 1,
      duration: 10,
      tags: ['explicite', 'récurrence'],
      statement: [
        { type: 'list', ordered: true, items: ['Soit $u_n = 2n^2 - 1$ pour $n \\in \\mathbb{N}$. Calculer $u_0$, $u_1$, $u_2$, $u_3$, puis exprimer $u_{n+1}$ en fonction de $n$.', 'Soit $(v_n)$ définie par $v_0 = 1$ et $v_{n+1} = 2v_n + 3$. Calculer $v_1$, $v_2$, $v_3$.', 'Peut-on calculer directement $v_{50}$ ? Expliquer.'] },
      ],
      hints: ['$u_{n+1}$ : remplacer $n$ par $n+1$ dans la formule.'],
      solution: [
        { type: 'p', text: '**1.** $u_0 = -1$, $u_1 = 1$, $u_2 = 7$, $u_3 = 17$. $u_{n+1} = 2(n+1)^2 - 1 = 2n^2 + 4n + 1$.' },
        { type: 'p', text: '**2.** $v_1 = 2 \\times 1 + 3 = 5$, $v_2 = 2 \\times 5 + 3 = 13$, $v_3 = 2 \\times 13 + 3 = 29$.' },
        { type: 'p', text: '**3.** Non : la suite est définie par récurrence, il faut calculer de proche en proche $v_1, \\ldots, v_{49}$ (boucle). Remarque : on peut montrer que $v_n = 4 \\times 2^n - 3$ (voir l’exercice sur les suites auxiliaires), ce qui permettrait ensuite un calcul direct.' },
      ],
    },
    {
      id: 'su-ex2',
      title: 'Suite arithmétique : deux termes connus',
      difficulty: 1,
      duration: 12,
      tags: ['arithmétique', 'somme'],
      statement: [
        { type: 'p', text: '$(u_n)$ est une suite arithmétique telle que $u_3 = 7$ et $u_{10} = 28$.' },
        { type: 'list', ordered: true, items: ['Déterminer la raison $r$ et le premier terme $u_0$.', 'Exprimer $u_n$ en fonction de $n$ et calculer $u_{50}$.', 'Calculer $S = u_0 + u_1 + \\cdots + u_{50}$.', 'À partir de quel rang a-t-on $u_n > 1\\,000$ ?'] },
      ],
      hints: ['$u_{10} = u_3 + 7r$.', '$S$ comporte $51$ termes.'],
      solution: [
        { type: 'p', text: '**1.** $u_{10} = u_3 + 7r \\iff 28 = 7 + 7r \\iff r = 3$. Puis $u_0 = u_3 - 3r = 7 - 9 = -2$.' },
        { type: 'p', text: '**2.** $u_n = -2 + 3n$ et $u_{50} = -2 + 150 = 148$.' },
        { type: 'p', text: '**3.** $51$ termes : $S = 51 \\times \\frac{u_0 + u_{50}}{2} = 51 \\times \\frac{-2 + 148}{2} = 51 \\times 73 = 3\\,723$.' },
        { type: 'p', text: '**4.** $-2 + 3n > 1\\,000 \\iff 3n > 1\\,002 \\iff n > 334$. Le premier rang est $n = 335$ ($u_{334} = 1\\,000$ n’est pas strictement supérieur ; $u_{335} = 1\\,003$).' },
      ],
    },
    {
      id: 'su-ex3',
      title: 'Suite géométrique et somme',
      difficulty: 1,
      duration: 12,
      tags: ['géométrique', 'somme'],
      statement: [
        { type: 'p', text: '$(v_n)$ est la suite géométrique de premier terme $v_0 = 3$ et de raison $q = 2$.' },
        { type: 'list', ordered: true, items: ['Exprimer $v_n$ en fonction de $n$ ; calculer $v_5$.', 'Calculer $v_0 + v_1 + \\cdots + v_5$ de deux façons.', 'Étudier le sens de variation de $(v_n)$ et conjecturer sa limite.'] },
      ],
      solution: [
        { type: 'p', text: '**1.** $v_n = 3 \\times 2^n$ ; $v_5 = 3 \\times 32 = 96$.' },
        { type: 'p', text: '**2.** Directement : $3 + 6 + 12 + 24 + 48 + 96 = 189$. Avec la formule ($6$ termes) : $3 \\times \\frac{1 - 2^6}{1 - 2} = 3 \\times 63 = 189$. ✔' },
        { type: 'p', text: '**3.** $v_0 = 3 > 0$ et $q = 2 > 1$ : $(v_n)$ est strictement croissante (en effet $v_{n+1} - v_n = 3 \\times 2^n > 0$). Comme $2^n \\to +\\infty$, $\\lim v_n = +\\infty$.' },
      ],
    },
    {
      id: 'su-ex4',
      title: 'Sens de variation',
      difficulty: 2,
      duration: 15,
      tags: ['variations'],
      statement: [
        { type: 'p', text: 'Étudier le sens de variation des suites suivantes, définies pour $n \\in \\mathbb{N}$.' },
        { type: 'list', items: ['a) $u_n = n^2 - 4n$', 'b) $v_n = 5 \\times 0{,}8^n$', 'c) $w_0 = 1$ et $w_{n+1} = w_n - n^2 - 1$', 'd) $t_n = \\dfrac{2^n}{n+1}$'] },
      ],
      hints: ['a) $u_{n+1} - u_n = 2n - 3$.', 'd) Termes positifs : utiliser le quotient.'],
      solution: [
        { type: 'p', text: '**a)** $u_{n+1} - u_n = (n+1)^2 - 4(n+1) - n^2 + 4n = 2n - 3$. Négatif pour $n \\in \\{0 \\,;\\, 1\\}$, positif pour $n \\geq 2$. Donc $u_0 > u_1 > u_2$ puis $(u_n)$ est **croissante à partir du rang 2**. ($u_0 = 0$, $u_1 = -3$, $u_2 = -4$, $u_3 = -3$, $u_4 = 0$.) Elle n’est pas monotone sur $\\mathbb{N}$.' },
        { type: 'p', text: '**b)** Suite géométrique de premier terme $5 > 0$ et de raison $0{,}8 \\in \\,]0 \\,;\\, 1[$ : strictement décroissante.' },
        { type: 'p', text: '**c)** $w_{n+1} - w_n = -n^2 - 1 < 0$ pour tout $n$ : strictement décroissante.' },
        { type: 'p', text: '**d)** $t_n > 0$ et $\\dfrac{t_{n+1}}{t_n} = \\dfrac{2^{n+1}}{n+2} \\times \\dfrac{n+1}{2^n} = \\dfrac{2(n+1)}{n+2} = \\dfrac{2n+2}{n+2}$. Or $2n + 2 \\geq n + 2 \\iff n \\geq 0$ : le quotient est $\\geq 1$, donc $(t_n)$ est croissante (égalité seulement pour $n = 0$ : $t_0 = t_1 = 1$).' },
      ],
    },
    {
      id: 'su-ex5',
      title: 'Sommes remarquables',
      difficulty: 2,
      duration: 15,
      tags: ['somme', 'arithmétique', 'géométrique'],
      statement: [
        { type: 'p', text: 'Calculer les sommes suivantes (valeurs exactes).' },
        { type: 'list', items: ['a) $A = 1 + 2 + \\cdots + 100$', 'b) $B = 1 + 3 + 5 + \\cdots + 99$', 'c) $C = 1 + \\dfrac{1}{2} + \\dfrac{1}{4} + \\cdots + \\dfrac{1}{2^{10}}$', 'd) $D = 2 + 6 + 18 + \\cdots + 2 \\times 3^7$'] },
      ],
      hints: ['b) Les impairs : $u_k = 1 + 2k$. Combien de termes ?', 'd) Raison $3$, combien de termes de $3^0$ à $3^7$ ?'],
      solution: [
        { type: 'p', text: '**a)** $A = \\frac{100 \\times 101}{2} = 5\\,050$.' },
        { type: 'p', text: '**b)** Suite arithmétique $u_k = 1 + 2k$, avec $u_{49} = 99$ : $50$ termes. $B = 50 \\times \\frac{1 + 99}{2} = 2\\,500$. (La somme des $n$ premiers impairs vaut $n^2$.)' },
        { type: 'p', text: '**c)** $1 + q + \\cdots + q^{10}$ avec $q = \\frac{1}{2}$ : $C = \\dfrac{1 - (1/2)^{11}}{1 - 1/2} = 2\\left(1 - \\dfrac{1}{2\\,048}\\right) = 2 - \\dfrac{1}{1\\,024} = \\dfrac{2\\,047}{1\\,024}$.' },
        { type: 'p', text: '**d)** Premier terme $2$, raison $3$, $8$ termes (exposants $0$ à $7$) : $D = 2 \\times \\dfrac{1 - 3^8}{1 - 3} = 3^8 - 1 = 6\\,560$.' },
      ],
    },
    {
      id: 'su-ex6',
      title: 'Conjecturer des limites',
      difficulty: 1,
      duration: 10,
      tags: ['limite'],
      statement: [
        { type: 'p', text: 'Conjecturer la limite éventuelle de chaque suite, en justifiant à l’aide des résultats du cours.' },
        { type: 'list', items: ['a) $u_n = 3 + \\dfrac{1}{n+1}$', 'b) $v_n = 2 \\times 1{,}5^n$', 'c) $w_n = 4 \\times 0{,}5^n - 1$', 'd) $t_n = (-1)^n$', 'e) $s_n = 1 - n^2$'] },
      ],
      solution: [
        { type: 'p', text: '**a)** $\\frac{1}{n+1}$ devient aussi petit que l’on veut : $u_n \\to 3$.' },
        { type: 'p', text: '**b)** $1{,}5 > 1$ donc $1{,}5^n \\to +\\infty$ et $v_n \\to +\\infty$.' },
        { type: 'p', text: '**c)** $0 < 0{,}5 < 1$ donc $0{,}5^n \\to 0$ et $w_n \\to -1$.' },
        { type: 'p', text: '**d)** $t_n$ vaut alternativement $1$ et $-1$ : pas de limite.' },
        { type: 'p', text: '**e)** $n^2 \\to +\\infty$ donc $s_n \\to -\\infty$.' },
      ],
    },
    {
      id: 'su-ex7',
      title: 'Deux contrats de travail',
      difficulty: 2,
      duration: 25,
      tags: ['modélisation', 'arithmétique', 'géométrique'],
      statement: [
        { type: 'p', text: 'Une entreprise propose deux contrats. Contrat A : salaire annuel de $18\\,000$ € la première année, puis augmentation de $400$ € par an. Contrat B : $18\\,000$ € la première année, puis augmentation de $2$ % par an. On note $a_n$ et $b_n$ les salaires de l’année $n$ ($n = 0$ pour la première année).' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Préciser la nature des suites $(a_n)$ et $(b_n)$, puis exprimer $a_n$ et $b_n$ en fonction de $n$.',
            'Comparer les salaires de l’année $n = 10$.',
            'À l’aide de la calculatrice, déterminer à partir de quelle année le contrat B devient plus avantageux (salaire annuel).',
            'Calculer le total perçu sur les $12$ premières années ($n = 0$ à $n = 11$) avec chaque contrat. Conclure.',
          ],
        },
      ],
      hints: ['Augmenter de $2$ % revient à multiplier par $1{,}02$.', 'Total sur 12 ans : somme de 12 termes consécutifs.'],
      solution: [
        { type: 'p', text: '**1.** $(a_n)$ arithmétique de raison $400$ : $a_n = 18\\,000 + 400n$. $(b_n)$ géométrique de raison $1{,}02$ : $b_n = 18\\,000 \\times 1{,}02^n$.' },
        { type: 'p', text: '**2.** $a_{10} = 22\\,000$ € et $b_{10} = 18\\,000 \\times 1{,}02^{10} \\approx 21\\,941{,}90$ € : A est encore meilleur.' },
        { type: 'table', headers: ['$n$', '$10$', '$11$', '$12$', '$13$'], rows: [['$a_n$', '$22\\,000$', '$22\\,400$', '$22\\,800$', '$23\\,200$'], ['$b_n$ (arrondi)', '$21\\,941{,}90$', '$22\\,380{,}74$', '$22\\,828{,}35$', '$23\\,284{,}92$']] },
        { type: 'p', text: '**3.** $b_n > a_n$ pour la première fois en $n = 12$, c’est-à-dire la **13ᵉ année**, et l’écart ne fait ensuite que croître (croissance exponentielle contre linéaire).' },
        { type: 'p', text: '**4.** Contrat A : $12 \\times \\frac{a_0 + a_{11}}{2} = 12 \\times \\frac{18\\,000 + 22\\,400}{2} = 242\\,400$ €.' },
        { type: 'p', text: 'Contrat B : $18\\,000 \\times \\frac{1 - 1{,}02^{12}}{1 - 1{,}02} \\approx 241\\,417{,}62$ €.' },
        { type: 'p', text: '**Conclusion** : sur 12 ans, A rapporte un peu plus au total ($\\approx 982$ €), mais B devient plus avantageux pour une carrière longue.' },
      ],
    },
    {
      id: 'su-ex8',
      title: 'Type bac — Suite arithmético-géométrique et suite auxiliaire',
      difficulty: 3,
      duration: 30,
      tags: ['récurrence', 'suite auxiliaire', 'type bac'],
      statement: [
        { type: 'p', text: 'On considère la suite $(u_n)$ définie par $u_0 = 2$ et, pour tout $n \\in \\mathbb{N}$, $u_{n+1} = 2u_n - 3$.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer $u_1$, $u_2$ et $u_3$. La suite est-elle arithmétique ? géométrique ?',
            'On pose, pour tout $n$, $v_n = u_n - 3$. Démontrer que $(v_n)$ est géométrique ; préciser sa raison et son premier terme.',
            'En déduire l’expression de $v_n$, puis de $u_n$, en fonction de $n$.',
            'Étudier le sens de variation de $(u_n)$ et conjecturer sa limite.',
            'Calculer $u_0 + u_1 + \\cdots + u_{9}$.',
          ],
        },
      ],
      hints: ['$v_{n+1} = u_{n+1} - 3 = 2u_n - 6$.', 'Puis $u_n = v_n + 3$.', 'La somme des $u_k$ = somme des $v_k$ + $10 \\times 3$.'],
      solution: [
        { type: 'p', text: '**1.** $u_1 = 2 \\times 2 - 3 = 1$, $u_2 = 2 - 3 = -1$, $u_3 = -2 - 3 = -5$.' },
        { type: 'p', text: '$u_1 - u_0 = -1$ et $u_2 - u_1 = -2$ : différences non constantes, la suite n’est pas arithmétique. $\\frac{u_1}{u_0} = \\frac{1}{2}$ et $\\frac{u_2}{u_1} = -1$ : pas géométrique.' },
        { type: 'p', text: '**2.** Pour tout $n$ : $v_{n+1} = u_{n+1} - 3 = 2u_n - 3 - 3 = 2u_n - 6 = 2(u_n - 3) = 2v_n$.' },
        { type: 'p', text: '$(v_n)$ est géométrique de raison $q = 2$ et de premier terme $v_0 = u_0 - 3 = -1$.' },
        { type: 'p', text: '**3.** $v_n = -1 \\times 2^n = -2^n$, donc $u_n = v_n + 3 = 3 - 2^n$. Contrôle : $u_3 = 3 - 8 = -5$. ✔' },
        { type: 'p', text: '**4.** $u_{n+1} - u_n = (3 - 2^{n+1}) - (3 - 2^n) = 2^n - 2^{n+1} = 2^n(1 - 2) = -2^n < 0$ : $(u_n)$ est strictement décroissante. Comme $2^n \\to +\\infty$, on conjecture $\\lim u_n = -\\infty$.' },
        { type: 'p', text: '**5.** $\\sum_{k=0}^{9} u_k = \\sum_{k=0}^{9} 3 - \\sum_{k=0}^{9} 2^k = 30 - \\frac{1 - 2^{10}}{1 - 2} = 30 - 1\\,023 = -993$.' },
      ],
    },
    {
      id: 'su-ex9',
      title: 'Python — Pollution d’un lac (seuil)',
      difficulty: 3,
      duration: 30,
      tags: ['Python', 'seuil', 'type bac'],
      statement: [
        { type: 'p', text: 'Un lac contient $100$ tonnes de polluant. Chaque année, un traitement élimine $10$ % du polluant présent, mais $5$ tonnes nouvelles sont rejetées. On note $u_n$ la masse (en tonnes) de polluant après $n$ années : $u_0 = 100$.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Justifier que $u_{n+1} = 0{,}9u_n + 5$. Calculer $u_1$ et $u_2$.',
            'Compléter la fonction Python ci-dessous pour qu’elle renvoie le nombre d’années nécessaires pour que la masse de polluant devienne strictement inférieure à $60$ tonnes.',
            'On pose $v_n = u_n - 50$. Montrer que $(v_n)$ est géométrique et en déduire $u_n = 50 + 50 \\times 0{,}9^n$.',
            'Vérifier le résultat de la fonction `annees()` par le calcul, puis conjecturer la limite de $(u_n)$ et l’interpréter.',
          ],
        },
        {
          type: 'code',
          lang: 'python',
          code: `def annees():
    n = 0
    u = 100
    while ......... :
        u = .........
        n = .........
    return n`,
        },
      ],
      hints: ['Retirer 10 %, c’est multiplier par $0{,}9$.', 'On boucle tant que $u \\geq 60$.', '$v_{n+1} = 0{,}9u_n + 5 - 50 = 0{,}9(u_n - 50)$.'],
      solution: [
        { type: 'p', text: '**1.** Après traitement il reste $90$ % de $u_n$, soit $0{,}9u_n$, auquel s’ajoutent $5$ tonnes : $u_{n+1} = 0{,}9u_n + 5$. $u_1 = 90 + 5 = 95$, $u_2 = 85{,}5 + 5 = 90{,}5$.' },
        { type: 'p', text: '**2.**' },
        {
          type: 'code',
          lang: 'python',
          code: `def annees():
    n = 0
    u = 100
    while u >= 60:
        u = 0.9 * u + 5
        n = n + 1
    return n

print(annees())   # 16`,
        },
        { type: 'p', text: '**3.** $v_{n+1} = u_{n+1} - 50 = 0{,}9u_n - 45 = 0{,}9(u_n - 50) = 0{,}9 v_n$ : géométrique de raison $0{,}9$, $v_0 = 50$. Donc $v_n = 50 \\times 0{,}9^n$ et $u_n = 50 + 50 \\times 0{,}9^n$.' },
        { type: 'p', text: '**4.** $u_n < 60 \\iff 50 \\times 0{,}9^n < 10 \\iff 0{,}9^n < 0{,}2$. À la calculatrice : $0{,}9^{15} \\approx 0{,}206$ et $0{,}9^{16} \\approx 0{,}185$. Le plus petit $n$ est $16$ ($u_{15} \\approx 60{,}29$, $u_{16} \\approx 59{,}27$), conforme au programme.' },
        { type: 'p', text: 'Comme $0 < 0{,}9 < 1$, $0{,}9^n \\to 0$ : on conjecture $\\lim u_n = 50$. À long terme, la masse de polluant se stabilise autour de $50$ tonnes (équilibre : $0{,}9 \\times 50 + 5 = 50$).' },
      ],
    },
    {
      id: 'su-ex10',
      title: 'Type bac — Motif et suite définie par un dessin',
      difficulty: 2,
      duration: 20,
      tags: ['modélisation', 'arithmétique', 'somme'],
      statement: [
        { type: 'p', text: 'On construit des rangées de carrés accolés avec des allumettes : $1$ carré nécessite $4$ allumettes, $2$ carrés accolés $7$ allumettes, $3$ carrés $10$ allumettes, etc. On note $a_n$ le nombre d’allumettes pour une rangée de $n$ carrés ($n \\geq 1$).' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Justifier que $(a_n)_{n \\geq 1}$ est arithmétique, exprimer $a_n$ en fonction de $n$.',
            'Combien d’allumettes faut-il pour $50$ carrés ?',
            'Avec une boîte de $1\\,000$ allumettes, combien de carrés peut-on construire au maximum en une rangée ?',
            'On construit successivement les rangées de $1$, $2$, …, $20$ carrés (chacune avec ses propres allumettes). Combien d’allumettes au total ?',
          ],
        },
      ],
      solution: [
        { type: 'p', text: '**1.** Pour ajouter un carré à la rangée, il faut $3$ allumettes de plus (deux horizontales et une verticale) : $a_{n+1} = a_n + 3$. Suite arithmétique de raison $3$ et $a_1 = 4$, donc $a_n = a_1 + (n-1) \\times 3 = 3n + 1$.' },
        { type: 'p', text: '**2.** $a_{50} = 151$ allumettes.' },
        { type: 'p', text: '**3.** $3n + 1 \\leq 1\\,000 \\iff n \\leq 333$ : au maximum $333$ carrés ($a_{333} = 1\\,000$ exactement).' },
        { type: 'p', text: '**4.** $a_1 + \\cdots + a_{20}$ : $20$ termes, $a_{20} = 61$. Total $= 20 \\times \\frac{4 + 61}{2} = 650$ allumettes.' },
      ],
    },
  ],

  // =========================================================================
  // REPRÉSENTATIONS
  // =========================================================================
  representations: [
    {
      type: 'widget',
      id: 'suite-explorer',
      title: 'Suite arithmétique',
      props: { kind: 'arithmetique', u0: 2, r: 0.8 },
      caption: 'Les points sont alignés. Modifiez la raison : quand la suite est-elle croissante ? Observez la somme des termes.',
    },
    {
      type: 'widget',
      id: 'suite-explorer',
      title: 'Suite géométrique',
      props: { kind: 'geometrique', u0: 1, q: 1.25 },
      caption: 'Essayez $q = 0{,}5$, $q = 1$, $q = -0{,}8$, $q = 1{,}5$ : comment se comportent les termes quand $n$ devient grand ?',
    },
    {
      type: 'widget',
      id: 'suite-explorer',
      title: 'Suite récurrente et toile d’araignée',
      props: { kind: 'recurrence', u0: 0, expression: '0.5*x+2' },
      caption: '$u_{n+1} = 0{,}5u_n + 2$ : les termes semblent converger vers $4$. Changez $u_0$ (par exemple $u_0 = 10$) : la limite change-t-elle ?',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Croissance linéaire ou exponentielle ?',
      props: {
        expressions: ['18000+400*x', '18000*q^x'],
        params: [{ name: 'q', min: 1, max: 1.05, step: 0.005, value: 1.02 }],
        xMin: 0,
        xMax: 30,
        yMin: 15000,
        yMax: 35000,
        editable: true,
      },
      caption: 'Courbes associées aux deux contrats de l’exercice 7 : la croissance exponentielle finit toujours par l’emporter.',
    },
    { type: 'svg', svg: svgToile, caption: 'Construction graphique des termes d’une suite récurrente.', maxWidth: 640 },
    { type: 'svg', svg: svgGauss, caption: 'La somme $1 + 2 + \\cdots + n$ en image.', maxWidth: 640 },
    {
      type: 'qcm',
      questions: [
        { question: 'Pour $u_n = 3n - 2$, on a $u_{n+1} =$', choices: ['$3n + 1$', '$3n - 1$', '$3n - 2 + 1$', '$3n + 3$'], answer: 0, explanation: '$u_{n+1} = 3(n+1) - 2 = 3n + 1$.' },
        { question: '$(u_n)$ est arithmétique avec $u_2 = 5$ et $u_6 = 17$. Sa raison vaut :', choices: ['$3$', '$12$', '$4$', '$\\frac{17}{5}$'], answer: 0, explanation: '$u_6 - u_2 = 4r = 12$, donc $r = 3$.' },
        { question: '$(v_n)$ est géométrique avec $v_0 = 5$ et $q = 3$. Alors $v_4 =$', choices: ['$405$', '$60$', '$17$', '$1\\,215$'], answer: 0, explanation: '$5 \\times 3^4 = 5 \\times 81 = 405$.' },
        { question: '$1 + 2 + \\cdots + 50 =$', choices: ['$1\\,275$', '$2\\,550$', '$1\\,250$', '$2\\,500$'], answer: 0, explanation: '$\\frac{50 \\times 51}{2} = 1\\,275$.' },
        { question: '$1 + 3 + 9 + \\cdots + 3^5 =$', choices: ['$364$', '$243$', '$728$', '$121$'], answer: 0, explanation: '$\\frac{1 - 3^6}{1 - 3} = \\frac{728}{2} = 364$.' },
        { question: 'Un prix baisse de $5$ % par an. La suite des prix est :', choices: ['géométrique de raison $0{,}95$', 'géométrique de raison $-0{,}05$', 'arithmétique de raison $-5$', 'géométrique de raison $1{,}05$'], answer: 0, explanation: 'Baisser de $5$ % revient à multiplier par $1 - 0{,}05 = 0{,}95$.' },
        { question: 'La suite $u_n = 7 \\times 0{,}6^n$ :', choices: ['est décroissante et tend vers $0$', 'est croissante et tend vers $+\\infty$', 'est décroissante et tend vers $7$', 'n’a pas de limite'], answer: 0, explanation: '$u_0 > 0$ et $0 < q < 1$ : décroissante ; $0{,}6^n \\to 0$.' },
        { question: 'Dans un algorithme de seuil cherchant le premier $n$ tel que $u_n > 1\\,000$, la boucle s’écrit :', choices: ['`while u <= 1000:`', '`while u > 1000:`', '`for n in range(1000):`', '`if u > 1000:`'], answer: 0, explanation: 'On répète tant que la condition d’arrêt ($u > 1\\,000$) n’est pas réalisée.' },
        { question: 'Le nombre de termes de la somme $u_5 + u_6 + \\cdots + u_{20}$ est :', choices: ['$16$', '$15$', '$20$', '$21$'], answer: 0, explanation: '$20 - 5 + 1 = 16$.' },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Définition d’une suite arithmétique', back: '$u_{n+1} = u_n + r$ pour tout $n$' },
        { front: 'Terme général (arithmétique)', back: '$u_n = u_0 + nr = u_p + (n-p)r$' },
        { front: 'Définition d’une suite géométrique', back: '$u_{n+1} = q \\, u_n$ pour tout $n$' },
        { front: 'Terme général (géométrique)', back: '$u_n = u_0 q^n = u_p q^{n-p}$' },
        { front: '$1 + 2 + \\cdots + n$', back: '$\\dfrac{n(n+1)}{2}$' },
        { front: '$1 + q + \\cdots + q^n$ ($q \\neq 1$)', back: '$\\dfrac{1 - q^{n+1}}{1 - q}$' },
        { front: 'Somme de termes consécutifs (arithmétique)', back: 'nb de termes × (premier + dernier)/2' },
        { front: 'Somme de termes consécutifs (géométrique)', back: 'premier × $\\dfrac{1 - q^{\\text{nb de termes}}}{1 - q}$' },
        { front: 'Étudier le sens de variation', back: 'Signe de $u_{n+1} - u_n$ (ou $\\frac{u_{n+1}}{u_n}$ vs $1$ si $u_n > 0$)' },
        { front: 'Limite de $q^n$ si $q > 1$', back: '$+\\infty$' },
        { front: 'Limite de $q^n$ si $-1 < q < 1$', back: '$0$' },
        { front: 'Coefficient multiplicateur d’une hausse de $t$ %', back: '$1 + \\dfrac{t}{100}$' },
        { front: 'Nombre de termes de $u_p$ à $u_n$', back: '$n - p + 1$' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque suite à sa nature',
      pairs: [
        { left: '$u_n = 4 - 7n$', right: 'arithmétique de raison $-7$' },
        { left: '$u_n = 3 \\times 2^n$', right: 'géométrique de raison $2$' },
        { left: '$u_{n+1} = u_n + 0{,}5$', right: 'arithmétique de raison $0{,}5$' },
        { left: '$u_{n+1} = \\frac{u_n}{4}$', right: 'géométrique de raison $\\frac{1}{4}$' },
        { left: '$u_n = n^2$', right: 'ni arithmétique ni géométrique' },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Si $u_{n+1} = f(u_n)$ avec $f$ croissante, alors $(u_n)$ est croissante.', answer: false, explanation: 'Contre-exemple : $f(x) = 0{,}5x + 2$, $u_0 = 10$ donne une suite décroissante.' },
        { text: 'Une suite géométrique de raison négative n’est pas monotone (si $u_0 \\neq 0$).', answer: true, explanation: 'Les termes changent de signe à chaque rang.' },
        { text: 'La suite $u_n = 2n + 5$ est arithmétique de raison $5$.', answer: false, explanation: 'Raison $2$ (coefficient de $n$), premier terme $5$.' },
        { text: '$1 + 2 + 4 + \\cdots + 2^{n} = 2^{n+1} - 1$.', answer: true, explanation: '$\\frac{1 - 2^{n+1}}{1 - 2} = 2^{n+1} - 1$.' },
        { text: 'Une suite croissante tend forcément vers $+\\infty$.', answer: false, explanation: '$u_n = 2 - \\frac{1}{n+1}$ est croissante et tend vers $2$.' },
        { text: 'Pour une suite géométrique, les points $(n \\,;\\, u_n)$ sont alignés.', answer: false, explanation: 'C’est le cas des suites arithmétiques.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'Une suite $(u_n)$ telle que $u_{n+1} = u_n + r$ est dite {{arithmétique|arithmetique}} de raison $r$ ; son terme général est $u_n = u_0 + nr$ et ses points $(n \\,;\\, u_n)$ sont {{alignés|alignes}}. Une suite telle que $u_{n+1} = q u_n$ est dite {{géométrique|geometrique}}. Si $u_0 > 0$ et $q > 1$, elle est {{croissante}}. La somme $1 + 2 + \\cdots + 10$ vaut {{55}}.',
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre les lignes de l’algorithme de seuil',
      items: ['def seuil(S):', '    n, u = 0, 2000', '    while u <= S:', '        u = 1.03 * u', '        n = n + 1', '    return n'],
    },
  ],
}

export default chapter
