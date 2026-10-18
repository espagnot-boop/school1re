import type { Block, Chapter } from '../types'

const r = String.raw

// ---------------------------------------------------------------------------
// Petits utilitaires de rédaction
// ---------------------------------------------------------------------------
const p = (text: string): Block => ({ type: 'p', text })
const h2 = (text: string): Block => ({ type: 'h2', text })
const h3 = (text: string): Block => ({ type: 'h3', text })
const m = (tex: string): Block => ({ type: 'math', tex })
const ul = (...items: string[]): Block => ({ type: 'list', items })
const ol = (...items: string[]): Block => ({ type: 'list', items, ordered: true })
const py = (code: string, caption?: string): Block => ({
  type: 'code',
  lang: 'python',
  code: code.replace(/^\n/, '').replace(/\n\s*$/, ''),
  ...(caption ? { caption } : {}),
})

const BLUE = 'hsl(217 91% 60%)'
const ORANGE = 'hsl(25 95% 53%)'
const GREEN = 'hsl(142 71% 45%)'

// ---------------------------------------------------------------------------
// Diagramme en bâtons de la loi de la somme de deux dés
// ---------------------------------------------------------------------------
const diceSumSvg = (() => {
  const base = 220
  const scale = 180 / 6 // 1/36 -> 30 px
  const parts: string[] = []
  parts.push(`<line x1="40" y1="${base}" x2="500" y2="${base}" stroke="currentColor" stroke-width="1.2"/>`)
  parts.push(`<line x1="40" y1="${base}" x2="40" y2="20" stroke="currentColor" stroke-width="1.2"/>`)
  for (let k = 1; k <= 6; k++) {
    const y = base - k * scale
    parts.push(`<line x1="36" y1="${y}" x2="500" y2="${y}" class="svg-grid" stroke="currentColor" stroke-opacity="0.15" stroke-width="1"/>`)
    parts.push(`<text x="32" y="${y + 4}" text-anchor="end" font-size="11" fill="currentColor">${k}/36</text>`)
  }
  for (let s = 2; s <= 12; s++) {
    const n = 6 - Math.abs(s - 7)
    const x = 40 + (s - 1) * 38
    parts.push(`<line x1="${x}" y1="${base}" x2="${x}" y2="${base - n * scale}" stroke="${BLUE}" stroke-width="10"/>`)
    parts.push(`<text x="${x}" y="${base + 16}" text-anchor="middle" font-size="12" fill="currentColor">${s}</text>`)
  }
  const xE = 40 + 6 * 38
  parts.push(`<line x1="${xE}" y1="14" x2="${xE}" y2="${base}" stroke="${ORANGE}" stroke-width="1.4" stroke-dasharray="5 4"/>`)
  parts.push(`<text x="${xE + 8}" y="26" font-size="12.5" fill="${ORANGE}">E(S) = 7</text>`)
  parts.push(`<text x="500" y="${base + 34}" text-anchor="end" font-size="11" fill="currentColor" opacity="0.8">valeurs de S</text>`)
  return `<svg viewBox="0 0 520 262" width="100%" font-family="Geist, sans-serif" xmlns="http://www.w3.org/2000/svg">${parts.join('')}</svg>`
})()

// ---------------------------------------------------------------------------
// Loi des grands nombres : moyenne cumulée de lancers de dé (pseudo-aléatoire
// déterministe, générateur congruentiel, pour que la figure soit stable)
// ---------------------------------------------------------------------------
const lgnSvg = (() => {
  let seed = 20261018
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648
    return seed / 2147483648
  }
  const N = 1000
  const X0 = 50
  const X1 = 500
  const Y = (v: number) => 30 + ((5 - Math.min(5, Math.max(2, v))) / 3) * 180 // [2 ; 5] -> [210 ; 30]
  const X = (n: number) => X0 + ((n - 1) / (N - 1)) * (X1 - X0)
  let s = 0
  const pts: string[] = []
  for (let n = 1; n <= N; n++) {
    s += 1 + Math.floor(rand() * 6)
    pts.push(`${X(n).toFixed(1)},${Y(s / n).toFixed(1)}`)
  }
  const parts: string[] = []
  parts.push(`<line x1="${X0}" y1="210" x2="${X1}" y2="210" stroke="currentColor" stroke-width="1.2"/>`)
  parts.push(`<line x1="${X0}" y1="210" x2="${X0}" y2="24" stroke="currentColor" stroke-width="1.2"/>`)
  for (const v of [2, 3, 3.5, 4, 5]) {
    parts.push(`<text x="${X0 - 6}" y="${Y(v) + 4}" text-anchor="end" font-size="11" fill="currentColor">${String(v).replace('.', ',')}</text>`)
  }
  for (const n of [1, 250, 500, 750, 1000]) {
    parts.push(`<text x="${X(n)}" y="226" text-anchor="middle" font-size="11" fill="currentColor">${n}</text>`)
  }
  parts.push(`<line x1="${X0}" y1="${Y(3.5)}" x2="${X1}" y2="${Y(3.5)}" stroke="${ORANGE}" stroke-width="1.4" stroke-dasharray="5 4"/>`)
  parts.push(`<polyline points="${pts.join(' ')}" fill="none" stroke="${BLUE}" stroke-width="1.6"/>`)
  parts.push(`<text x="${X1}" y="${Y(3.5) - 8}" text-anchor="end" font-size="12" fill="${ORANGE}">E(X) = 3,5</text>`)
  parts.push(`<text x="${X1}" y="244" text-anchor="end" font-size="11" fill="currentColor" opacity="0.8">nombre n de lancers</text>`)
  parts.push(`<text x="${X0 + 8}" y="20" font-size="11" fill="${BLUE}">moyenne des n premiers résultats</text>`)
  return `<svg viewBox="0 0 520 250" width="100%" font-family="Geist, sans-serif" xmlns="http://www.w3.org/2000/svg">${parts.join('')}</svg>`
})()

// ---------------------------------------------------------------------------
// Schéma : même espérance, dispersions différentes
// ---------------------------------------------------------------------------
const dispersionSvg = `<svg viewBox="0 0 520 200" width="100%" font-family="Geist, sans-serif" xmlns="http://www.w3.org/2000/svg">
<text x="130" y="20" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">Jeu A : σ = 1</text>
<text x="390" y="20" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">Jeu B : σ = 10</text>
<line x1="20" y1="160" x2="240" y2="160" stroke="currentColor" stroke-width="1.2"/>
<line x1="280" y1="160" x2="500" y2="160" stroke="currentColor" stroke-width="1.2"/>
<line x1="119" y1="160" x2="119" y2="70" stroke="${BLUE}" stroke-width="10"/>
<line x1="141" y1="160" x2="141" y2="70" stroke="${BLUE}" stroke-width="10"/>
<line x1="290" y1="160" x2="290" y2="70" stroke="${GREEN}" stroke-width="10"/>
<line x1="490" y1="160" x2="490" y2="70" stroke="${GREEN}" stroke-width="10"/>
<line x1="130" y1="40" x2="130" y2="165" stroke="${ORANGE}" stroke-dasharray="4 3" stroke-width="1.3"/>
<line x1="390" y1="40" x2="390" y2="165" stroke="${ORANGE}" stroke-dasharray="4 3" stroke-width="1.3"/>
<text x="119" y="178" text-anchor="middle" font-size="11" fill="currentColor">−1</text>
<text x="141" y="178" text-anchor="middle" font-size="11" fill="currentColor">1</text>
<text x="290" y="178" text-anchor="middle" font-size="11" fill="currentColor">−10</text>
<text x="490" y="178" text-anchor="middle" font-size="11" fill="currentColor">10</text>
<text x="130" y="36" text-anchor="middle" font-size="11" fill="${ORANGE}">E = 0</text>
<text x="390" y="36" text-anchor="middle" font-size="11" fill="${ORANGE}">E = 0</text>
<text x="260" y="196" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Chaque valeur a la probabilité 1/2 : même espérance, risque très différent.</text>
</svg>`

// ---------------------------------------------------------------------------
// Chapitre
// ---------------------------------------------------------------------------
const chapter: Chapter = {
  id: 'variables-aleatoires',
  subject: 'maths',
  order: 10,
  title: 'Variables aléatoires réelles',
  theme: 'Probabilités et statistiques',
  summary:
    'Variable aléatoire réelle et loi de probabilité, espérance, variance et écart type, transformation affine, étude de jeux, simulation en Python et approche intuitive de la loi des grands nombres.',
  duration: '3 semaines',
  objectives: [
    'Interpréter en situation et utiliser les notations $\\{X = a\\}$, $\\{X \\le a\\}$, $P(X = a)$, $P(X \\le a)$.',
    'Déterminer la loi de probabilité d’une variable aléatoire et la présenter dans un tableau.',
    'Calculer et interpréter en contexte l’espérance, la variance et l’écart type d’une variable aléatoire.',
    'Utiliser les formules $E(aX + b) = aE(X) + b$ et $V(aX + b) = a^2 V(X)$.',
    'Étudier un jeu : gain algébrique, espérance, jeu équitable, favorable ou défavorable.',
    'Simuler une variable aléatoire et des échantillons en Python ; observer la loi des grands nombres.',
    'Comparer l’écart type des moyennes d’échantillons de taille $n$ à $\\dfrac{\\sigma}{\\sqrt{n}}$.',
  ],
  keywords: [
    'variable aléatoire',
    'loi de probabilité',
    'espérance',
    'variance',
    'écart type',
    'jeu équitable',
    'gain',
    'loi des grands nombres',
    'échantillon',
    'simulation',
  ],

  // =====================================================================
  // FICHE
  // =====================================================================
  fiche: [
    h2('1. Variable aléatoire et loi'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Définitions',
      content: [
        p(r`Une **variable aléatoire réelle** $X$ associe un nombre réel à chaque issue de $\Omega$. $\{X = a\}$ est l'événement « $X$ prend la valeur $a$ ».`),
        p(r`Sa **loi de probabilité** : les valeurs $x_1, \dots, x_n$ et les probabilités $p_i = P(X = x_i)$, avec $p_1 + \dots + p_n = 1$.`),
      ],
    },
    {
      type: 'table',
      headers: [r`$x_i$`, r`$x_1$`, r`$x_2$`, '…', r`$x_n$`, 'Total'],
      rows: [[r`$P(X = x_i)$`, r`$p_1$`, r`$p_2$`, '…', r`$p_n$`, '$1$']],
    },
    h2('2. Indicateurs'),
    {
      type: 'table',
      headers: ['Indicateur', 'Formule', 'Sens'],
      rows: [
        ['Espérance', r`$E(X) = \displaystyle\sum_{i=1}^n p_i x_i$`, 'Valeur moyenne à long terme'],
        ['Variance', r`$V(X) = \displaystyle\sum_{i=1}^n p_i \big(x_i - E(X)\big)^2 = E(X^2) - E(X)^2$`, 'Dispersion (unité au carré)'],
        ['Écart type', r`$\sigma(X) = \sqrt{V(X)}$`, 'Dispersion (même unité que $X$)'],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Transformation affine',
      content: [m(r`E(aX + b) = aE(X) + b \qquad V(aX + b) = a^2V(X) \qquad \sigma(aX + b) = |a|\,\sigma(X)`)],
    },
    h2('3. Jeux'),
    ul(
      r`**Gain algébrique** $G$ = ce que l'on reçoit $-$ la mise (peut être négatif).`,
      r`$E(G) = 0$ : jeu **équitable** ; $E(G) > 0$ : favorable au joueur ; $E(G) < 0$ : défavorable.`,
      r`Si $G = X - m$ (mise $m$) : $E(G) = E(X) - m$ et $V(G) = V(X)$.`,
    ),
    h2('4. Loi des grands nombres'),
    {
      type: 'callout',
      variant: 'remember',
      title: 'Approche intuitive',
      content: [
        p(r`Pour un échantillon de taille $n$ (répétitions indépendantes), la **moyenne** $M_n$ des valeurs obtenues se rapproche de $E(X)$ quand $n$ devient grand.`),
        p(r`Les moyennes d'échantillons fluctuent autour de $\mu = E(X)$ avec un écart type d'environ $\dfrac{\sigma}{\sqrt{n}}$ ; dans environ 95 % des cas, $|M_n - \mu| \le \dfrac{2\sigma}{\sqrt{n}}$.`),
      ],
    },
  ],

  // =====================================================================
  // COURS
  // =====================================================================
  cours: [
    h2('1. Variable aléatoire réelle'),
    p(r`Dans de nombreuses expériences aléatoires, on ne s'intéresse pas à l'issue elle-même mais à un **nombre** qui lui est associé : un gain, une somme de points, un nombre de succès, une durée…`),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Variable aléatoire réelle',
      content: [
        p(r`Soit $\Omega$ l'univers (fini) d'une expérience aléatoire. Une **variable aléatoire réelle** $X$ est une fonction qui, à chaque issue $\omega$ de $\Omega$, associe un nombre réel $X(\omega)$.`),
        p(r`L'ensemble des valeurs prises par $X$ est noté $X(\Omega) = \{x_1 ; x_2 ; \dots ; x_n\}$.`),
      ],
    },
    {
      type: 'keyvalue',
      items: [
        { key: r`$\{X = a\}$`, value: r`Événement formé des issues $\omega$ telles que $X(\omega) = a$ ; on note sa probabilité $P(X = a)$.` },
        { key: r`$\{X \le a\}$`, value: r`Événement « $X$ prend une valeur inférieure ou égale à $a$ » ; probabilité $P(X \le a)$.` },
        { key: r`$\{X > a\}$`, value: r`Contraire de $\{X \le a\}$ : $P(X > a) = 1 - P(X \le a)$.` },
        { key: r`$\{a \le X \le b\}$`, value: r`Issues pour lesquelles $X$ prend une valeur entre $a$ et $b$ (inclus).` },
      ],
    },
    p(r`**Exemple.** On lance deux fois une pièce équilibrée : $\Omega = \{PP ; PF ; FP ; FF\}$ (issues équiprobables). Soit $X$ le nombre de Pile obtenus : $X(PP) = 2$, $X(PF) = X(FP) = 1$, $X(FF) = 0$.`),
    p(r`L'événement $\{X = 1\} = \{PF ; FP\}$ a pour probabilité $P(X = 1) = \dfrac{2}{4} = \dfrac{1}{2}$, et $P(X \ge 1) = 1 - P(X = 0) = 1 - \dfrac{1}{4} = \dfrac{3}{4}$.`),
    {
      type: 'callout',
      variant: 'warning',
      title: 'Vocabulaire',
      content: [p(r`Malgré son nom, une variable aléatoire n'est **ni une variable, ni aléatoire** : c'est une **fonction** (parfaitement déterminée) définie sur l'univers. Ce qui est aléatoire, c'est l'issue de l'expérience.`)],
    },

    h2('2. Loi de probabilité'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Loi de probabilité de X',
      content: [
        p(r`Définir la **loi de probabilité** de $X$, c'est donner pour chaque valeur $x_i$ prise par $X$ la probabilité $p_i = P(X = x_i)$. On la présente en général dans un tableau.`),
        p(r`Les événements $\{X = x_i\}$ forment une partition de $\Omega$, donc $p_1 + p_2 + \dots + p_n = 1$.`),
      ],
    },
    p(r`**Exemple fondamental : somme de deux dés.** On lance deux dés équilibrés à six faces ; les 36 couples sont équiprobables. Soit $S$ la somme des deux résultats.`),
    {
      type: 'table',
      headers: ['+', '1', '2', '3', '4', '5', '6'],
      rows: [
        ['**1**', '2', '3', '4', '5', '6', '7'],
        ['**2**', '3', '4', '5', '6', '7', '8'],
        ['**3**', '4', '5', '6', '7', '8', '9'],
        ['**4**', '5', '6', '7', '8', '9', '10'],
        ['**5**', '6', '7', '8', '9', '10', '11'],
        ['**6**', '7', '8', '9', '10', '11', '12'],
      ],
      caption: 'Tableau à double entrée des 36 issues',
    },
    {
      type: 'table',
      headers: [r`$s$`, '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      rows: [[r`$P(S = s)$`, r`$\frac{1}{36}$`, r`$\frac{2}{36}$`, r`$\frac{3}{36}$`, r`$\frac{4}{36}$`, r`$\frac{5}{36}$`, r`$\frac{6}{36}$`, r`$\frac{5}{36}$`, r`$\frac{4}{36}$`, r`$\frac{3}{36}$`, r`$\frac{2}{36}$`, r`$\frac{1}{36}$`]],
      caption: 'Loi de probabilité de S',
    },
    { type: 'svg', svg: diceSumSvg, caption: 'Diagramme en bâtons de la loi de S (somme de deux dés).', maxWidth: 600 },
    p(r`On lit par exemple $P(S \ge 10) = \dfrac{3 + 2 + 1}{36} = \dfrac{6}{36} = \dfrac{1}{6}$ et $P(S \le 4) = \dfrac{1 + 2 + 3}{36} = \dfrac{1}{6}$.`),
    {
      type: 'callout',
      variant: 'method',
      title: 'Déterminer la loi d’une variable aléatoire',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Valeurs possibles', text: r`Lister toutes les valeurs que peut prendre $X$ (par ordre croissant).` },
            { title: 'Probabilités', text: r`Pour chaque valeur $x_i$, identifier l'événement $\{X = x_i\}$ (issues, chemins d'un arbre…) et calculer sa probabilité.` },
            { title: 'Tableau', text: 'Présenter la loi dans un tableau à deux lignes.' },
            { title: 'Contrôle', text: r`Vérifier que la somme des probabilités vaut $1$.` },
          ],
        },
      ],
    },

    h2('3. Espérance'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Espérance mathématique',
      content: [
        p(r`L'**espérance** de $X$ est le nombre :`),
        m(r`E(X) = p_1x_1 + p_2x_2 + \dots + p_nx_n = \sum_{i=1}^{n} p_i\,x_i`),
      ],
    },
    p(r`**Interprétation.** $E(X)$ est la **moyenne** des valeurs de $X$ pondérées par leurs probabilités. Si l'on répète l'expérience un grand nombre de fois, la moyenne des valeurs observées de $X$ est proche de $E(X)$ (voir la loi des grands nombres, §8). C'est l'analogue de la moyenne $\bar{x}$ en statistique, où les fréquences sont remplacées par des probabilités.`),
    p(r`**Exemples.**`),
    ul(
      r`Nombre de Pile en deux lancers : $E(X) = \dfrac{1}{4} \times 0 + \dfrac{1}{2} \times 1 + \dfrac{1}{4} \times 2 = 1$.`,
      r`Résultat $D$ d'un dé équilibré : $E(D) = \dfrac{1 + 2 + 3 + 4 + 5 + 6}{6} = \dfrac{21}{6} = 3{,}5$.`,
      r`Somme $S$ de deux dés : par symétrie de la loi autour de 7, $E(S) = 7$ (on peut le vérifier : $\dfrac{2 \times 1 + 3 \times 2 + \dots + 12 \times 1}{36} = \dfrac{252}{36} = 7$).`,
    ),
    {
      type: 'callout',
      variant: 'warning',
      title: 'L’espérance n’est pas forcément une valeur prise',
      content: [p(r`Un dé ne donne jamais $3{,}5$ ! L'espérance est une **moyenne théorique**, pas une valeur « attendue » au sens courant. Elle a la même unité que $X$ (euros, points…).`)],
    },

    h2('4. Variance et écart type'),
    p(r`L'espérance ne suffit pas à décrire une loi : deux jeux de même espérance peuvent comporter des risques très différents.`),
    { type: 'svg', svg: dispersionSvg, caption: 'Deux lois de même espérance mais d’écarts types différents.', maxWidth: 600 },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Variance et écart type',
      content: [
        p(r`On note $\mu = E(X)$. La **variance** de $X$ est la moyenne (pondérée par les probabilités) des carrés des écarts à l'espérance :`),
        m(r`V(X) = \sum_{i=1}^{n} p_i\,(x_i - \mu)^2 = p_1(x_1 - \mu)^2 + \dots + p_n(x_n - \mu)^2`),
        p(r`L'**écart type** de $X$ est $\sigma(X) = \sqrt{V(X)}$ ; il s'exprime dans la même unité que $X$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Formule de König-Huygens',
      content: [m(r`V(X) = E(X^2) - \big(E(X)\big)^2 \quad \text{où} \quad E(X^2) = \sum_{i=1}^n p_i\,x_i^2`)],
    },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [
        p(r`En développant $(x_i - \mu)^2 = x_i^2 - 2\mu x_i + \mu^2$ :`),
        m(r`V(X) = \sum p_i x_i^2 - 2\mu \sum p_i x_i + \mu^2 \sum p_i = E(X^2) - 2\mu \times \mu + \mu^2 \times 1 = E(X^2) - \mu^2. \quad \square`),
      ],
    },
    p(r`**Exemple (dé équilibré).** $E(D^2) = \dfrac{1 + 4 + 9 + 16 + 25 + 36}{6} = \dfrac{91}{6}$, donc $V(D) = \dfrac{91}{6} - 3{,}5^2 = \dfrac{91}{6} - \dfrac{49}{4} = \dfrac{182 - 147}{12} = \dfrac{35}{12} \approx 2{,}917$ et $\sigma(D) = \sqrt{\dfrac{35}{12}} \approx 1{,}708$.`),
    p(r`**Exemple (nombre de Pile).** $E(X^2) = \dfrac{1}{4} \times 0 + \dfrac{1}{2} \times 1 + \dfrac{1}{4} \times 4 = \dfrac{3}{2}$, donc $V(X) = \dfrac{3}{2} - 1^2 = \dfrac{1}{2}$ et $\sigma(X) = \dfrac{\sqrt{2}}{2} \approx 0{,}707$.`),
    {
      type: 'callout',
      variant: 'tip',
      title: 'Organiser les calculs dans un tableau',
      content: [
        {
          type: 'table',
          headers: [r`$x_i$`, r`$p_i$`, r`$p_ix_i$`, r`$x_i^2$`, r`$p_ix_i^2$`],
          rows: [
            ['$0$', '$0{,}25$', '$0$', '$0$', '$0$'],
            ['$1$', '$0{,}5$', '$0{,}5$', '$1$', '$0{,}5$'],
            ['$2$', '$0{,}25$', '$0{,}5$', '$4$', '$1$'],
            ['**Total**', '$1$', r`$E(X) = 1$`, '', r`$E(X^2) = 1{,}5$`],
          ],
        },
        p(r`On conclut : $V(X) = 1{,}5 - 1^2 = 0{,}5$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Interprétation',
      content: [
        ul(
          r`$V(X) \ge 0$ ; $V(X) = 0$ si et seulement si $X$ est constante.`,
          r`Plus $\sigma(X)$ est grand, plus les valeurs de $X$ sont **dispersées** autour de $E(X)$ : dans un jeu, $\sigma$ mesure le **risque**.`,
        ),
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Erreurs fréquentes',
      content: [
        ul(
          r`Écrire $E(X^2) = E(X)^2$ : c'est faux en général (leur différence est justement la variance).`,
          r`Oublier les probabilités dans $E(X^2)$ : on calcule $\sum p_i x_i^2$, pas $\sum x_i^2$.`,
          r`Donner l'écart type sans racine carrée, ou une variance négative (signe d'une erreur de calcul !).`,
        ),
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'À la calculatrice',
      content: [p(r`Saisir les valeurs $x_i$ dans une liste et les probabilités $p_i$ dans une autre (utilisées comme « effectifs » ou « fréquences »), puis lancer les statistiques à une variable : $\bar{x}$ donne $E(X)$ et $\sigma_x$ donne $\sigma(X)$.`)],
    },

    h2('5. Transformation affine'),
    {
      type: 'callout',
      variant: 'property',
      title: 'Linéarité de l’espérance, effet sur la variance',
      content: [
        p(r`Pour tous réels $a$ et $b$ :`),
        m(r`E(aX + b) = aE(X) + b \qquad V(aX + b) = a^2V(X) \qquad \sigma(aX + b) = |a|\,\sigma(X)`),
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [
        p(r`La variable $Y = aX + b$ prend les valeurs $ax_i + b$ avec les probabilités $p_i$.`),
        m(r`E(Y) = \sum p_i(ax_i + b) = a\sum p_ix_i + b\sum p_i = aE(X) + b`),
        m(r`V(Y) = \sum p_i\big(ax_i + b - aE(X) - b\big)^2 = \sum p_i\,a^2\big(x_i - E(X)\big)^2 = a^2V(X)`),
        p(r`Enfin $\sigma(Y) = \sqrt{a^2V(X)} = |a|\sqrt{V(X)} = |a|\,\sigma(X)$. $\square$`),
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Ce qu’il faut comprendre',
      content: [
        ul(
          r`Ajouter une constante $b$ **décale** les valeurs : l'espérance augmente de $b$, la dispersion ne change pas.`,
          r`Multiplier par $a$ multiplie l'espérance par $a$ et l'écart type par $|a|$ (la variance par $a^2$).`,
        ),
      ],
    },
    p(r`**Exemple.** La température $X$ (en °C) à midi en avril dans une ville a pour espérance $15$ et pour écart type $4$. En degrés Fahrenheit, $F = 1{,}8X + 32$ : $E(F) = 1{,}8 \times 15 + 32 = 59$, $\sigma(F) = 1{,}8 \times 4 = 7{,}2$ et $V(F) = 7{,}2^2 = 51{,}84$.`),
    {
      type: 'callout',
      variant: 'warning',
      title: 'Piège',
      content: [p(r`$V(-X) = V(X)$ et non $-V(X)$ ; $V(X + 3) = V(X)$ et non $V(X) + 3$ ; $V(2X) = 4V(X)$ et non $2V(X)$.`)],
    },

    h2('6. Étude d’un jeu'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Gain algébrique et jeu équitable',
      content: [
        p(r`Dans un jeu payant, on appelle **gain algébrique** (ou gain net) $G$ la différence entre la somme reçue et la mise. Une valeur négative de $G$ est une perte.`),
        ul(
          r`Le jeu est **équitable** si $E(G) = 0$.`,
          r`Il est **favorable** au joueur si $E(G) > 0$, **défavorable** si $E(G) < 0$.`,
        ),
        p(r`$E(G)$ représente le gain moyen par partie sur un grand nombre de parties ; pour l'organisateur, le gain moyen est $-E(G)$.`),
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Définir G', text: r`Préciser la mise et ce que l'on reçoit dans chaque cas ; écrire $G$ = reçu $-$ mise.` },
        { title: 'Loi de G', text: 'Construire un arbre ou un tableau des issues, puis le tableau de la loi de $G$.' },
        { title: 'Espérance', text: r`Calculer $E(G)$ et conclure (équitable, favorable, défavorable).` },
        { title: 'Paramètre éventuel', text: r`Si la mise ou un lot est inconnu, résoudre l'équation $E(G) = 0$.` },
        { title: 'Risque', text: r`Comparer éventuellement les écarts types de deux jeux de même espérance.` },
      ],
    },
    h3('6.1 Exemple : la roulette'),
    p(r`Une roulette comporte 37 cases équiprobables : le 0 (vert) et les numéros de 1 à 36 (18 rouges, 18 noirs). On mise 1 €.`),
    {
      type: 'table',
      headers: ['Pari', 'Loi du gain G', 'E(G)', 'σ(G)'],
      rows: [
        ['Sur un numéro (reçoit 36 €)', r`$G = 35$ avec proba $\frac{1}{37}$, $G = -1$ avec proba $\frac{36}{37}$`, r`$\frac{35 - 36}{37} = -\frac{1}{37} \approx -0{,}027$`, r`$\approx 5{,}84$`],
        ['Sur « rouge » (reçoit 2 €)', r`$G = 1$ avec proba $\frac{18}{37}$, $G = -1$ avec proba $\frac{19}{37}$`, r`$\frac{18 - 19}{37} = -\frac{1}{37} \approx -0{,}027$`, r`$\approx 1{,}00$`],
      ],
    },
    p(r`Les deux paris sont **défavorables** au joueur, avec la même espérance : en moyenne on perd environ 2,7 centimes par euro misé. Mais le pari sur un numéro est **beaucoup plus risqué** ($\sigma \approx 5{,}84$ contre $\sigma \approx 1{,}00$).`),
    {
      type: 'reveal',
      title: 'Détail du calcul des écarts types',
      content: [
        p(r`Numéro : $E(G^2) = \dfrac{35^2 \times 1 + 1 \times 36}{37} = \dfrac{1261}{37}$, $V(G) = \dfrac{1261}{37} - \dfrac{1}{37^2} = \dfrac{46\,656}{1369} \approx 34{,}08$, $\sigma(G) = \dfrac{216}{37} \approx 5{,}84$.`),
        p(r`Rouge : $E(G^2) = 1$, $V(G) = 1 - \dfrac{1}{1369} = \dfrac{1368}{1369}$, $\sigma(G) \approx 0{,}9996$.`),
      ],
    },
    {
      type: 'widget',
      id: 'random-variable',
      props: { values: [35, -1], probs: [1 / 37, 36 / 37] },
      title: 'Pari sur un numéro à la roulette',
      caption: 'Simulez des milliers de parties : la moyenne des gains se rapproche de −1/37 ≈ −0,027.',
    },
    h3('6.2 Mise et gain : G = X − m'),
    p(r`Si $X$ désigne la somme reçue et $m$ la mise, alors $G = X - m$ : d'après le §5, $E(G) = E(X) - m$ et $V(G) = V(X)$. Le jeu est équitable si et seulement si $m = E(X)$ : **la mise équitable est l'espérance de la somme reçue**.`),

    h2('7. Simulation en Python'),
    p(r`Pour simuler une variable aléatoire, on utilise le module \`random\` : \`random()\` renvoie un réel aléatoire de $[0 ; 1[$ et \`randint(a, b)\` un entier aléatoire entre $a$ et $b$ inclus.`.replace(/\\`/g, '`')),
    py(
      r`
from random import random

def X():
    """Simule une variable aléatoire de loi :
    valeurs -2, 1, 5 avec probabilités 0.5, 0.3, 0.2"""
    u = random()
    if u < 0.5:
        return -2
    elif u < 0.8:      # 0.5 + 0.3
        return 1
    else:
        return 5

def moyenne(n):
    s = 0
    for _ in range(n):
        s = s + X()
    return s / n

print(moyenne(10))       # très variable
print(moyenne(100000))   # proche de E(X) = 0.3
`,
      'Simulation d’une loi donnée par un tableau',
    ),
    p(r`Ici $E(X) = 0{,}5 \times (-2) + 0{,}3 \times 1 + 0{,}2 \times 5 = -1 + 0{,}3 + 1 = 0{,}3$.`),
    {
      type: 'callout',
      variant: 'method',
      title: 'Simuler une loi quelconque avec random()',
      content: [p(r`On découpe $[0 ; 1[$ en intervalles de longueurs $p_1, p_2, \dots$ (bornes = probabilités **cumulées**) ; le nombre \`u = random()\` tombe dans le $i$-ème intervalle avec la probabilité $p_i$.`.replace(/\\`/g, '`'))],
    },

    h2('8. Échantillons et loi des grands nombres'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Échantillon',
      content: [p(r`Un **échantillon de taille $n$** de la loi de $X$ est la liste $(x_1, \dots, x_n)$ des valeurs obtenues en répétant $n$ fois, de façon **indépendante**, l'expérience qui définit $X$. Sa moyenne est $M_n = \dfrac{x_1 + \dots + x_n}{n}$.`)],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Loi des grands nombres (version intuitive)',
      content: [p(r`Lorsque la taille $n$ de l'échantillon devient grande, la moyenne $M_n$ des valeurs observées se rapproche de l'espérance $E(X)$ : **les moyennes empiriques se stabilisent autour de l'espérance**.`)],
    },
    { type: 'svg', svg: lgnSvg, caption: 'Moyenne cumulée des résultats de 1 000 lancers de dé : elle se stabilise autour de 3,5.', maxWidth: 600 },
    p(r`C'est cette loi qui justifie l'interprétation de $E(X)$ comme « moyenne à long terme », et le fait qu'un casino (dont l'espérance de gain est positive) gagne à coup sûr à long terme sur un très grand nombre de parties.`),
    h3('8.1 Fluctuation des moyennes d’échantillons'),
    p(r`Deux échantillons de même taille ne donnent pas la même moyenne : c'est la **fluctuation d'échantillonnage**. On observe par simulation que, si $X$ a pour espérance $\mu$ et pour écart type $\sigma$ :`),
    ul(
      r`l'écart type $s$ de la série des moyennes de nombreux échantillons de taille $n$ est proche de $\dfrac{\sigma}{\sqrt{n}}$ ;`,
      r`dans environ **95 %** des cas, l'écart entre la moyenne $M_n$ d'un échantillon et $\mu$ est inférieur ou égal à $\dfrac{2\sigma}{\sqrt{n}}$.`,
    ),
    p(r`Pour diviser par 2 la dispersion des moyennes, il faut donc **multiplier par 4** la taille des échantillons.`),
    py(
      r`
from random import randint
from math import sqrt

def moyenne_echantillon(n):
    """Moyenne d'un échantillon de n lancers de dé."""
    s = 0
    for _ in range(n):
        s = s + randint(1, 6)
    return s / n

def proportion(N, n):
    """Proportion des N échantillons de taille n dont la moyenne
    est à moins de 2*sigma/sqrt(n) de l'espérance."""
    mu = 3.5
    sigma = sqrt(35 / 12)
    compteur = 0
    for _ in range(N):
        m = moyenne_echantillon(n)
        if abs(m - mu) <= 2 * sigma / sqrt(n):
            compteur = compteur + 1
    return compteur / N

print(proportion(1000, 100))   # environ 0.95
`,
      'Fluctuation des moyennes d’échantillons de lancers de dé',
    ),
    {
      type: 'callout',
      variant: 'warning',
      title: 'Pas de « compensation »',
      content: [p('La loi des grands nombres ne dit pas qu’après une série de « Pile », « Face » devient plus probable : les lancers sont indépendants. La moyenne se stabilise parce que les écarts passés sont **dilués** dans un nombre croissant de lancers, pas parce qu’ils sont compensés.')],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Jacques Bernoulli (1654-1705)',
      content: [p('Dans son *Ars Conjectandi* (publié en 1713, après sa mort), Jacques Bernoulli démontre la première version de la loi des grands nombres : la fréquence d’un événement se rapproche de sa probabilité quand le nombre d’expériences augmente.')],
    },

    h2('9. Synthèse'),
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Loi', text: r`Tableau $x_i$ / $p_i$ ; somme des $p_i$ égale à 1.`, icon: 'Table' },
        { title: 'Espérance', text: r`$E(X) = \sum p_ix_i$ : moyenne à long terme.`, icon: 'Target' },
        { title: 'Variance', text: r`$V(X) = E(X^2) - E(X)^2 \ge 0$.`, icon: 'Sigma' },
        { title: 'Écart type', text: r`$\sigma = \sqrt{V}$ : dispersion, risque.`, icon: 'MoveHorizontal' },
        { title: 'Affine', text: r`$E(aX+b) = aE(X)+b$ ; $V(aX+b) = a^2V(X)$.`, icon: 'TrendingUp' },
        { title: 'Grands nombres', text: r`$M_n \to E(X)$ ; fluctuation $\approx \sigma/\sqrt{n}$.`, icon: 'Dices' },
      ],
    },
  ],

  // =====================================================================
  // EXERCICES
  // =====================================================================
  exercices: [
    {
      id: 'va-ex1-de',
      title: 'Résultat d’un dé',
      difficulty: 1,
      duration: 10,
      tags: ['loi', 'espérance', 'variance'],
      statement: [
        p(r`On lance un dé équilibré à six faces et on note $X$ le résultat obtenu.`),
        ol(
          r`Donner la loi de probabilité de $X$.`,
          r`Calculer $P(X \ge 5)$ et $P(X < 3)$.`,
          r`Calculer $E(X)$, $V(X)$ et $\sigma(X)$ (valeur exacte puis arrondi au centième).`,
        ),
      ],
      hints: ['Situation d’équiprobabilité : chaque face a la probabilité $\\frac{1}{6}$.', r`Utiliser $V(X) = E(X^2) - E(X)^2$.`],
      solution: [
        p(r`1. $X$ prend les valeurs $1, 2, 3, 4, 5, 6$, chacune avec la probabilité $\dfrac{1}{6}$.`),
        p(r`2. $P(X \ge 5) = P(X = 5) + P(X = 6) = \dfrac{2}{6} = \dfrac{1}{3}$ ; $P(X < 3) = P(X = 1) + P(X = 2) = \dfrac{1}{3}$.`),
        p(r`3. $E(X) = \dfrac{1 + 2 + 3 + 4 + 5 + 6}{6} = \dfrac{21}{6} = 3{,}5$.`),
        p(r`$E(X^2) = \dfrac{1 + 4 + 9 + 16 + 25 + 36}{6} = \dfrac{91}{6}$ donc $V(X) = \dfrac{91}{6} - \dfrac{49}{4} = \dfrac{182 - 147}{12} = \dfrac{35}{12} \approx 2{,}92$.`),
        p(r`$\sigma(X) = \sqrt{\dfrac{35}{12}} \approx 1{,}71$.`),
      ],
    },
    {
      id: 'va-ex2-loi-inconnue',
      title: 'Compléter une loi et calculer les indicateurs',
      difficulty: 1,
      duration: 10,
      tags: ['loi', 'espérance', 'écart type'],
      statement: [
        p(r`Une variable aléatoire $X$ a la loi suivante, où $a$ est un réel :`),
        {
          type: 'table',
          headers: [r`$x_i$`, '$-2$', '$0$', '$1$', '$3$'],
          rows: [[r`$P(X = x_i)$`, '$0{,}1$', '$0{,}3$', '$a$', '$0{,}2$']],
        },
        ol(r`Déterminer $a$.`, r`Calculer $P(X \le 0)$ et $P(X > 0)$.`, r`Calculer $E(X)$, $V(X)$ et $\sigma(X)$.`),
      ],
      hints: ['La somme des probabilités vaut 1.', r`Calculer d'abord $E(X^2) = \sum p_i x_i^2$.`],
      solution: [
        p(r`1. $0{,}1 + 0{,}3 + a + 0{,}2 = 1$ donc $a = 0{,}4$.`),
        p(r`2. $P(X \le 0) = 0{,}1 + 0{,}3 = 0{,}4$ et $P(X > 0) = 1 - 0{,}4 = 0{,}6$.`),
        p(r`3. $E(X) = 0{,}1 \times (-2) + 0{,}3 \times 0 + 0{,}4 \times 1 + 0{,}2 \times 3 = -0{,}2 + 0 + 0{,}4 + 0{,}6 = 0{,}8$.`),
        p(r`$E(X^2) = 0{,}1 \times 4 + 0{,}3 \times 0 + 0{,}4 \times 1 + 0{,}2 \times 9 = 0{,}4 + 0{,}4 + 1{,}8 = 2{,}6$.`),
        p(r`$V(X) = 2{,}6 - 0{,}8^2 = 2{,}6 - 0{,}64 = 1{,}96$ et $\sigma(X) = \sqrt{1{,}96} = 1{,}4$.`),
      ],
    },
    {
      id: 'va-ex3-affine',
      title: 'Transformations affines',
      difficulty: 1,
      duration: 10,
      tags: ['E(aX+b)', 'V(aX+b)'],
      statement: [
        p(r`Une variable aléatoire $X$ vérifie $E(X) = 5$ et $V(X) = 4$.`),
        ol(
          r`Calculer l'espérance, la variance et l'écart type de $Y = 3X - 2$.`,
          r`Même question pour $Z = 10 - X$.`,
          r`Un commercial perçoit chaque mois un fixe de 1 500 € et une prime de 120 € par contrat signé. Le nombre $N$ de contrats signés en un mois vérifie $E(N) = 6$ et $\sigma(N) = 2{,}5$. Calculer l'espérance et l'écart type de son salaire mensuel $S$.`,
        ),
      ],
      hints: [r`$E(aX+b) = aE(X)+b$, $V(aX+b) = a^2V(X)$.`, r`$S = 120N + 1500$.`],
      solution: [
        p(r`1. $E(Y) = 3 \times 5 - 2 = 13$ ; $V(Y) = 3^2 \times 4 = 36$ ; $\sigma(Y) = 6$.`),
        p(r`2. $Z = -X + 10$ : $E(Z) = -5 + 10 = 5$ ; $V(Z) = (-1)^2 \times 4 = 4$ ; $\sigma(Z) = 2$.`),
        p(r`3. $S = 120N + 1500$ donc $E(S) = 120 \times 6 + 1500 = 2\,220$ € et $\sigma(S) = 120 \times 2{,}5 = 300$ €. Le salaire moyen est de 2 220 € avec une dispersion de 300 €.`),
      ],
    },
    {
      id: 'va-ex4-pieces',
      title: 'Un jeu avec deux pièces',
      difficulty: 2,
      duration: 15,
      tags: ['jeu', 'jeu équitable', 'espérance'],
      statement: [
        p(r`Pour jouer, on paie 2 €. On lance deux pièces équilibrées : si l'on obtient deux Pile, on reçoit 5 € ; si l'on obtient exactement un Pile, on reçoit 2 € ; sinon on ne reçoit rien. On note $G$ le gain algébrique du joueur.`),
        ol(
          r`Déterminer la loi de $G$.`,
          r`Calculer $E(G)$. Le jeu est-il favorable au joueur ?`,
          r`Calculer $\sigma(G)$ (arrondi au centième).`,
          r`L'organisateur souhaite rendre le jeu équitable en modifiant uniquement la somme reçue pour deux Pile. Quelle somme doit-il proposer ?`,
        ),
      ],
      hints: ['Les quatre issues PP, PF, FP, FF sont équiprobables.', r`Pour la question 4, noter $x$ la somme reçue et résoudre $E(G) = 0$.`],
      solution: [
        p(r`1. Gains : deux Pile → $5 - 2 = 3$ ; un Pile → $2 - 2 = 0$ ; aucun Pile → $-2$.`),
        {
          type: 'table',
          headers: [r`$g_i$`, '$-2$', '$0$', '$3$'],
          rows: [[r`$P(G = g_i)$`, r`$\frac{1}{4}$`, r`$\frac{1}{2}$`, r`$\frac{1}{4}$`]],
        },
        p(r`2. $E(G) = \dfrac{1}{4} \times (-2) + \dfrac{1}{2} \times 0 + \dfrac{1}{4} \times 3 = \dfrac{1}{4} = 0{,}25$. $E(G) > 0$ : le jeu est **favorable au joueur** (il gagne en moyenne 25 centimes par partie).`),
        p(r`3. $E(G^2) = \dfrac{4}{4} + 0 + \dfrac{9}{4} = \dfrac{13}{4} = 3{,}25$ ; $V(G) = 3{,}25 - 0{,}25^2 = 3{,}1875$ ; $\sigma(G) \approx 1{,}79$.`),
        p(r`4. Si l'on reçoit $x$ € pour deux Pile : $E(G) = \dfrac{1}{4}(x - 2) + 0 + \dfrac{1}{4}(-2) = \dfrac{x - 4}{4}$. Le jeu est équitable si $E(G) = 0$, soit $x = 4$ €.`),
      ],
    },
    {
      id: 'va-ex5-urne',
      title: 'Nombre de boules rouges (sans remise)',
      difficulty: 2,
      duration: 15,
      tags: ['arbre', 'loi', 'variance'],
      statement: [
        p(r`Une urne contient 3 boules rouges et 2 boules bleues. On tire successivement et **sans remise** deux boules. On note $X$ le nombre de boules rouges obtenues.`),
        ol(r`À l'aide d'un arbre, déterminer la loi de $X$.`, r`Calculer $E(X)$, $V(X)$ et $\sigma(X)$.`, r`Interpréter $E(X)$.`),
      ],
      hints: [r`Après une rouge, il reste 2 rouges sur 4 boules.`, r`$X = 1$ correspond à deux chemins.`],
      solution: [
        p(r`1. $P(X = 2) = \dfrac{3}{5} \times \dfrac{2}{4} = \dfrac{3}{10}$ ; $P(X = 0) = \dfrac{2}{5} \times \dfrac{1}{4} = \dfrac{1}{10}$ ; $P(X = 1) = \dfrac{3}{5} \times \dfrac{2}{4} + \dfrac{2}{5} \times \dfrac{3}{4} = \dfrac{6}{20} + \dfrac{6}{20} = \dfrac{6}{10}$.`),
        {
          type: 'table',
          headers: [r`$x_i$`, '$0$', '$1$', '$2$'],
          rows: [[r`$P(X = x_i)$`, '$0{,}1$', '$0{,}6$', '$0{,}3$']],
        },
        p(r`Contrôle : $0{,}1 + 0{,}6 + 0{,}3 = 1$.`),
        p(r`2. $E(X) = 0 + 0{,}6 + 0{,}6 = 1{,}2$. $E(X^2) = 0 + 0{,}6 + 0{,}3 \times 4 = 1{,}8$. $V(X) = 1{,}8 - 1{,}44 = 0{,}36$ ; $\sigma(X) = 0{,}6$.`),
        p(r`3. Si l'on répète l'expérience un grand nombre de fois, on obtient en moyenne 1,2 boule rouge par tirage de deux boules (c'est $2 \times \frac{3}{5}$, la proportion de rouges étant $\frac{3}{5}$).`),
      ],
    },
    {
      id: 'va-ex6-pannes',
      title: 'Nombre de pannes et coût de maintenance',
      difficulty: 2,
      duration: 15,
      tags: ['espérance', 'variance', 'transformation affine'],
      statement: [
        p(r`Le nombre $X$ de pannes quotidiennes d'un parc de machines suit la loi :`),
        {
          type: 'table',
          headers: [r`$x_i$`, '$0$', '$1$', '$2$', '$3$'],
          rows: [[r`$P(X = x_i)$`, '$0{,}5$', '$0{,}3$', '$0{,}15$', '$0{,}05$']],
        },
        ol(
          r`Calculer la probabilité qu'il y ait au moins une panne dans la journée.`,
          r`Calculer $E(X)$ et $V(X)$.`,
          r`Chaque jour, la maintenance coûte 50 € de frais fixes plus 200 € par panne. On note $C$ le coût journalier. Exprimer $C$ en fonction de $X$, puis calculer $E(C)$ et $\sigma(C)$ (arrondi à l'euro).`,
          r`Estimer le coût total de maintenance sur une année de 365 jours.`,
        ),
      ],
      hints: [r`$P(X \ge 1) = 1 - P(X = 0)$.`, r`$C = 200X + 50$.`],
      solution: [
        p(r`1. $P(X \ge 1) = 1 - 0{,}5 = 0{,}5$.`),
        p(r`2. $E(X) = 0 + 0{,}3 + 0{,}3 + 0{,}15 = 0{,}75$. $E(X^2) = 0{,}3 \times 1 + 0{,}15 \times 4 + 0{,}05 \times 9 = 0{,}3 + 0{,}6 + 0{,}45 = 1{,}35$. $V(X) = 1{,}35 - 0{,}75^2 = 1{,}35 - 0{,}5625 = 0{,}7875$.`),
        p(r`3. $C = 200X + 50$. $E(C) = 200 \times 0{,}75 + 50 = 200$ €. $V(C) = 200^2 \times 0{,}7875 = 31\,500$, donc $\sigma(C) = \sqrt{31\,500} \approx 177$ €.`),
        p(r`4. D'après la loi des grands nombres, le coût moyen par jour sur une année est proche de $E(C)$ : coût annuel $\approx 365 \times 200 = 73\,000$ €.`),
      ],
    },
    {
      id: 'va-ex7-bac-loterie',
      title: 'Type bac — Loterie de kermesse',
      difficulty: 3,
      duration: 30,
      tags: ['type bac', 'jeu', 'mise équitable', 'écart type'],
      statement: [
        p(r`Lors d'une kermesse, une urne contient 10 boules indiscernables au toucher : 1 boule dorée, 3 boules rouges et 6 boules blanches. Le joueur mise 4 € puis tire une boule : la boule dorée rapporte 20 €, une boule rouge rapporte 5 €, une boule blanche ne rapporte rien. On note $X$ la somme reçue et $G$ le gain algébrique du joueur.`),
        ol(
          r`Déterminer la loi de $X$, puis calculer $E(X)$.`,
          r`Exprimer $G$ en fonction de $X$ et en déduire $E(G)$. Interpréter.`,
          r`Calculer $V(X)$, puis $\sigma(G)$ (arrondi au centième).`,
          r`Quelle devrait être la mise pour que le jeu soit équitable ?`,
          r`Avec une mise de 4 €, l'association organisatrice prévoit environ 1 000 parties. Quel bénéfice peut-elle espérer ?`,
          r`Un joueur joue deux parties (tirages avec remise). Calculer la probabilité que son gain algébrique soit positif lors des deux parties.`,
        ),
      ],
      hints: [
        r`$X$ prend les valeurs $0$, $5$ et $20$.`,
        r`$G = X - 4$ : $E(G) = E(X) - 4$ et $V(G) = V(X)$.`,
        r`Le gain est positif si la boule n'est pas blanche : probabilité $0{,}4$.`,
      ],
      solution: [
        {
          type: 'table',
          headers: [r`$x_i$`, '$0$', '$5$', '$20$'],
          rows: [[r`$P(X = x_i)$`, '$0{,}6$', '$0{,}3$', '$0{,}1$']],
        },
        p(r`1. $E(X) = 0 \times 0{,}6 + 5 \times 0{,}3 + 20 \times 0{,}1 = 1{,}5 + 2 = 3{,}5$.`),
        p(r`2. $G = X - 4$, donc $E(G) = E(X) - 4 = -0{,}5$. Le jeu est **défavorable** au joueur : sur un grand nombre de parties, il perd en moyenne 50 centimes par partie.`),
        p(r`3. $E(X^2) = 0 + 25 \times 0{,}3 + 400 \times 0{,}1 = 7{,}5 + 40 = 47{,}5$. $V(X) = 47{,}5 - 3{,}5^2 = 47{,}5 - 12{,}25 = 35{,}25$.`),
        p(r`Comme $G = X - 4$, $V(G) = V(X) = 35{,}25$ et $\sigma(G) = \sqrt{35{,}25} \approx 5{,}94$ €.`),
        p(r`*Vérification directe* : $G$ prend les valeurs $-4$, $1$, $16$ avec les probabilités $0{,}6$ ; $0{,}3$ ; $0{,}1$ : $E(G) = -2{,}4 + 0{,}3 + 1{,}6 = -0{,}5$ ✓.`),
        p(r`4. Avec une mise $m$ : $E(G) = 3{,}5 - m = 0 \iff m = 3{,}5$. La mise équitable est 3,50 €.`),
        p(r`5. Le gain moyen de l'association par partie est $-E(G) = 0{,}5$ € ; sur 1 000 parties, elle peut espérer environ $1\,000 \times 0{,}5 = 500$ € de bénéfice.`),
        p(r`6. $G > 0 \iff$ la boule tirée est dorée ou rouge, de probabilité $0{,}4$. Les deux parties étant indépendantes : $P = 0{,}4 \times 0{,}4 = 0{,}16$.`),
      ],
    },
    {
      id: 'va-ex8-python',
      title: 'Python : simuler la loterie et les échantillons',
      difficulty: 3,
      duration: 25,
      tags: ['Python', 'simulation', 'loi des grands nombres', 'échantillon'],
      statement: [
        p(r`On reprend la loterie de l'exercice précédent : gain $G$ égal à $16$, $1$ ou $-4$ avec les probabilités $0{,}1$ ; $0{,}3$ ; $0{,}6$. On rappelle que $E(G) = -0{,}5$ et $\sigma(G) \approx 5{,}94$.`),
        py(r`
from random import randint

def gain():
    b = randint(1, 10)
    if b == 1:
        return 16
    elif b <= 4:
        return 1
    else:
        return -4
`),
        ol(
          r`Expliquer pourquoi la fonction \`gain\` simule bien la variable $G$.`,
          r`Écrire une fonction \`moyenne(n)\` qui renvoie la moyenne des gains de $n$ parties. Que doit-on observer pour $n = 100\,000$ ?`,
          r`Écrire une fonction \`proportion(N, n)\` qui simule $N$ échantillons de taille $n$ et renvoie la proportion de ceux dont la moyenne $m$ vérifie $|m - E(G)| \le \dfrac{2\sigma}{\sqrt{n}}$. Quelle valeur approximative attend-on ?`,
          r`Pour $n = 100$, calculer $\dfrac{2\sigma}{\sqrt{n}}$. Un joueur a fait 100 parties et a obtenu un gain moyen de $+1{,}50$ € : est-ce surprenant ?`,
        ).items
          ? ol(
              'Expliquer pourquoi la fonction `gain` simule bien la variable $G$.',
              'Écrire une fonction `moyenne(n)` qui renvoie la moyenne des gains de $n$ parties. Que doit-on observer pour $n = 100\\,000$ ?',
              'Écrire une fonction `proportion(N, n)` qui simule $N$ échantillons de taille $n$ et renvoie la proportion de ceux dont la moyenne $m$ vérifie $|m - E(G)| \\le \\dfrac{2\\sigma}{\\sqrt{n}}$. Quelle valeur approximative attend-on ?',
              'Pour $n = 100$, calculer $\\dfrac{2\\sigma}{\\sqrt{n}}$. Un joueur a fait 100 parties et a obtenu un gain moyen de $+1{,}50$ € : est-ce surprenant ?',
            )
          : p(''),
      ],
      hints: [r`\`randint(1, 10)\` donne un entier de 1 à 10, chacun avec la probabilité $\frac{1}{10}$.`.replace(/\\`/g, '`'), r`Intervalle à 95 % : $[-0{,}5 - 1{,}19 ; -0{,}5 + 1{,}19]$.`],
      solution: [
        p(r`1. \`randint(1, 10)\` modélise le numéro de la boule tirée (10 boules équiprobables). La valeur 1 (boule dorée) a la probabilité $0{,}1$ et donne $16$ ; les valeurs 2, 3, 4 (boules rouges) ont la probabilité $0{,}3$ et donnent $1$ ; les valeurs 5 à 10 (boules blanches) ont la probabilité $0{,}6$ et donnent $-4$.`.replace(/\\`/g, '`')),
        p('2. et 3. Une solution possible :'),
        py(r`
from math import sqrt

def moyenne(n):
    s = 0
    for _ in range(n):
        s = s + gain()
    return s / n

def proportion(N, n):
    esperance = -0.5
    sigma = sqrt(35.25)
    compteur = 0
    for _ in range(N):
        m = moyenne(n)
        if abs(m - esperance) <= 2 * sigma / sqrt(n):
            compteur = compteur + 1
    return compteur / N

print(moyenne(100000))        # proche de -0.5
print(proportion(1000, 100))  # proche de 0.95
`),
        p(r`Pour $n = 100\,000$, d'après la loi des grands nombres, la moyenne obtenue est proche de $E(G) = -0{,}5$. La proportion renvoyée par \`proportion\` est d'environ $0{,}95$.`.replace(/\\`/g, '`')),
        p(r`4. $\dfrac{2\sigma}{\sqrt{100}} = \dfrac{2 \times 5{,}94}{10} \approx 1{,}19$. Dans environ 95 % des cas, la moyenne de 100 parties est dans $[-1{,}69 ; 0{,}69]$. Un gain moyen de $+1{,}50$ € sort de cet intervalle : c'est un résultat **peu fréquent** (moins de 5 % des cas environ), donc surprenant, mais pas impossible.`),
      ],
    },
    {
      id: 'va-ex9-parametres',
      title: 'Retrouver une loi à partir de l’espérance',
      difficulty: 2,
      duration: 15,
      tags: ['loi', 'système', 'espérance'],
      statement: [
        p(r`Une variable aléatoire $X$ prend les valeurs $-1$, $0$ et $2$ avec $P(X = 2) = 0{,}3$. On sait de plus que $E(X) = 0{,}2$.`),
        ol(r`Déterminer $P(X = -1)$ et $P(X = 0)$.`, r`Calculer $V(X)$ et $\sigma(X)$ (arrondi au centième).`, r`Calculer $E(5X + 1)$ et $\sigma(5X + 1)$.`),
      ],
      hints: [r`Poser $a = P(X = -1)$, $b = P(X = 0)$ : deux équations.`],
      solution: [
        p(r`1. $E(X) = -a + 0 \times b + 2 \times 0{,}3 = -a + 0{,}6 = 0{,}2$ donc $a = 0{,}4$. Puis $a + b + 0{,}3 = 1$ donne $b = 0{,}3$.`),
        p(r`2. $E(X^2) = 0{,}4 \times 1 + 0 + 0{,}3 \times 4 = 1{,}6$ ; $V(X) = 1{,}6 - 0{,}2^2 = 1{,}56$ ; $\sigma(X) = \sqrt{1{,}56} \approx 1{,}25$.`),
        p(r`3. $E(5X + 1) = 5 \times 0{,}2 + 1 = 2$ et $\sigma(5X + 1) = 5\sigma(X) = 5\sqrt{1{,}56} \approx 6{,}24$.`),
      ],
    },
    {
      id: 'va-ex10-proportionnelle',
      title: 'Loi proportionnelle et dé truqué',
      difficulty: 3,
      duration: 20,
      tags: ['loi', 'approfondissement'],
      statement: [
        p(r`Un dé truqué à trois faces numérotées 1, 2, 3 est tel que la probabilité d'obtenir la face $k$ est proportionnelle à $k$. On note $X$ le résultat.`),
        ol(
          r`Montrer que $P(X = k) = \dfrac{k}{6}$ pour $k \in \{1 ; 2 ; 3\}$.`,
          r`Calculer $E(X)$, $V(X)$ et $\sigma(X)$ (valeurs exactes).`,
          r`On lance ce dé deux fois (lancers indépendants) et on note $S$ la somme. Déterminer la loi de $S$ et vérifier que $E(S) = 2E(X)$.`,
        ),
      ],
      hints: [r`Il existe $c$ tel que $P(X = k) = ck$ ; la somme vaut 1.`, r`$S$ prend les valeurs de 2 à 6 ; utiliser un tableau à double entrée et le produit des probabilités.`],
      solution: [
        p(r`1. $P(X = k) = ck$ avec $c + 2c + 3c = 1$, donc $c = \dfrac{1}{6}$.`),
        p(r`2. $E(X) = \dfrac{1 \times 1 + 2 \times 2 + 3 \times 3}{6} = \dfrac{14}{6} = \dfrac{7}{3}$. $E(X^2) = \dfrac{1 + 8 + 27}{6} = 6$. $V(X) = 6 - \dfrac{49}{9} = \dfrac{5}{9}$ et $\sigma(X) = \dfrac{\sqrt{5}}{3} \approx 0{,}745$.`),
        p(r`3. Par indépendance, $P\big((i ; j)\big) = \dfrac{i}{6} \times \dfrac{j}{6} = \dfrac{ij}{36}$.`),
        ul(
          r`$P(S = 2) = \dfrac{1}{36}$ ; $P(S = 3) = \dfrac{2 + 2}{36} = \dfrac{4}{36}$ ; $P(S = 4) = \dfrac{3 + 4 + 3}{36} = \dfrac{10}{36}$ ;`,
          r`$P(S = 5) = \dfrac{6 + 6}{36} = \dfrac{12}{36}$ ; $P(S = 6) = \dfrac{9}{36}$. Contrôle : $1 + 4 + 10 + 12 + 9 = 36$ ✓.`,
        ),
        p(r`$E(S) = \dfrac{2 \times 1 + 3 \times 4 + 4 \times 10 + 5 \times 12 + 6 \times 9}{36} = \dfrac{2 + 12 + 40 + 60 + 54}{36} = \dfrac{168}{36} = \dfrac{14}{3} = 2 \times \dfrac{7}{3}$ ✓.`),
      ],
    },
  ],

  // =====================================================================
  // REPRÉSENTATIONS
  // =====================================================================
  representations: [
    {
      type: 'widget',
      id: 'random-variable',
      props: { values: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], probs: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1].map((k) => k / 36) },
      title: 'Somme de deux dés',
      caption: 'Loi de S, espérance 7, variance 35/6 ≈ 5,83 : simulez des lancers et observez la moyenne se stabiliser.',
    },
    {
      type: 'widget',
      id: 'random-variable',
      props: { values: [-4, 1, 16], probs: [0.6, 0.3, 0.1] },
      title: 'Gain à la loterie de la kermesse',
      caption: 'E(G) = −0,5 : le jeu est défavorable. Modifiez les probabilités ou les gains pour le rendre équitable.',
    },
    { type: 'svg', svg: diceSumSvg, caption: 'Diagramme en bâtons de la loi de la somme de deux dés.', maxWidth: 600 },
    { type: 'svg', svg: lgnSvg, caption: 'Loi des grands nombres : moyenne cumulée de lancers de dé.', maxWidth: 600 },
    {
      type: 'qcm',
      questions: [
        {
          question: r`$X$ prend les valeurs $1$, $2$, $4$ avec les probabilités $0{,}5$ ; $0{,}25$ ; $0{,}25$. $E(X) =$`,
          choices: ['$2$', r`$\dfrac{7}{3}$`, '$2{,}5$', '$1{,}75$'],
          answer: 0,
          explanation: r`$0{,}5 + 0{,}5 + 1 = 2$.`,
        },
        {
          question: r`Avec la même loi, $V(X) =$`,
          choices: ['$1{,}5$', '$5{,}5$', '$1$', '$0{,}5$'],
          answer: 0,
          explanation: r`$E(X^2) = 0{,}5 + 1 + 4 = 5{,}5$ et $V(X) = 5{,}5 - 4 = 1{,}5$.`,
        },
        {
          question: r`Si $V(X) = 9$, alors $\sigma(-2X + 7) =$`,
          choices: ['$-6$', '$6$', '$36$', '$13$'],
          answer: 1,
          explanation: r`$\sigma(-2X + 7) = |-2| \times 3 = 6$.`,
        },
        {
          question: r`Si $E(X) = 4$, alors $E(3 - X) =$`,
          choices: ['$-1$', '$1$', '$7$', '$-4$'],
          answer: 0,
          explanation: r`$E(3 - X) = 3 - 4 = -1$.`,
        },
        {
          question: 'Un jeu est équitable lorsque :',
          choices: [r`$E(G) = 0$`, r`$V(G) = 0$`, 'on gagne une fois sur deux', 'la mise est égale au gain maximal'],
          answer: 0,
          explanation: 'L’espérance du gain algébrique est nulle.',
        },
        {
          question: r`On mise $m$ € et on reçoit $X$ € avec $E(X) = 6$. Le jeu est équitable si :`,
          choices: ['$m = 6$', '$m = 0$', '$m = 3$', '$m = 12$'],
          answer: 0,
          explanation: r`$E(G) = E(X) - m = 0 \iff m = 6$.`,
        },
        {
          question: r`Les moyennes d'échantillons de taille $n$ d'une loi d'écart type $\sigma$ ont un écart type d'environ :`,
          choices: [r`$\sigma$`, r`$\dfrac{\sigma}{n}$`, r`$\dfrac{\sigma}{\sqrt{n}}$`, r`$\sigma\sqrt{n}$`],
          answer: 2,
          explanation: 'Résultat observé par simulation (programme de Première).',
        },
        {
          question: 'Après 10 « Face » consécutifs avec une pièce équilibrée, la probabilité d’obtenir « Pile » au lancer suivant est :',
          choices: ['supérieure à 0,5', 'égale à 0,5', 'inférieure à 0,5', 'égale à 1'],
          answer: 1,
          explanation: 'Les lancers sont indépendants : aucune « compensation ».',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Variable aléatoire réelle', back: r`Fonction qui associe un réel à chaque issue de $\Omega$.` },
        { front: 'Loi de probabilité de X', back: r`Les valeurs $x_i$ et les probabilités $P(X = x_i)$ ; leur somme vaut 1.` },
        { front: r`$E(X)$`, back: r`$\sum p_i x_i$ : moyenne théorique, valeur moyenne à long terme.` },
        { front: r`$V(X)$ (définition)`, back: r`$\sum p_i (x_i - E(X))^2$.` },
        { front: r`$V(X)$ (formule pratique)`, back: r`$E(X^2) - E(X)^2$.` },
        { front: r`$\sigma(X)$`, back: r`$\sqrt{V(X)}$, même unité que $X$ : mesure la dispersion.` },
        { front: r`$E(aX + b)$`, back: r`$aE(X) + b$.` },
        { front: r`$V(aX + b)$`, back: r`$a^2 V(X)$ (le $b$ disparaît).` },
        { front: r`$\sigma(aX + b)$`, back: r`$|a|\,\sigma(X)$.` },
        { front: 'Jeu équitable', back: r`$E(G) = 0$ ; favorable si $E(G) > 0$, défavorable si $E(G) < 0$.` },
        { front: 'Mise équitable', back: r`$m = E(X)$ où $X$ est la somme reçue.` },
        { front: 'Loi des grands nombres', back: r`La moyenne d'un échantillon de grande taille est proche de $E(X)$.` },
        { front: 'Fluctuation des moyennes', back: r`Écart type $\approx \sigma/\sqrt{n}$ ; environ 95 % des moyennes à moins de $2\sigma/\sqrt{n}$ de $\mu$.` },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'L’espérance d’une variable aléatoire est toujours une valeur prise par cette variable.', answer: false, explanation: 'Un dé a pour espérance 3,5.' },
        { text: r`Une variance peut être négative.`, answer: false, explanation: 'C’est une somme de termes positifs.' },
        { text: r`$V(X + 10) = V(X)$.`, answer: true, explanation: 'Un décalage ne change pas la dispersion.' },
        { text: r`$V(2X) = 2V(X)$.`, answer: false, explanation: r`$V(2X) = 4V(X)$.` },
        { text: r`$E(X^2) \ge E(X)^2$ pour toute variable aléatoire $X$.`, answer: true, explanation: r`Car $V(X) = E(X^2) - E(X)^2 \ge 0$.` },
        { text: 'Si E(G) < 0, le joueur perd forcément à chaque partie.', answer: false, explanation: 'Il perd en moyenne sur un grand nombre de parties, mais peut gagner certaines parties.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter le calcul',
      text: r`$X$ prend les valeurs $0$, $1$, $3$ avec les probabilités $0{,}2$ ; $0{,}5$ ; $0{,}3$. Alors $E(X) = 0{,}5 + 0{,}9 =$ {{1,4|1.4}}, $E(X^2) = 0{,}5 + 2{,}7 =$ {{3,2|3.2}}, donc $V(X) = 3{,}2 - 1{,}4^2 =$ {{1,24|1.24}}. Pour $Y = 2X - 1$ : $E(Y) =$ {{1,8|1.8}} et $V(Y) =$ {{4,96|4.96}}.`,
    },
    {
      type: 'matching',
      title: 'Associer chaque expression à sa valeur (E(X) = 2, V(X) = 3)',
      pairs: [
        { left: r`$E(3X + 1)$`, right: '$7$' },
        { left: r`$V(3X + 1)$`, right: '$27$' },
        { left: r`$E(X^2)$`, right: '$7$ (= V + E²)' },
        { left: r`$V(-X)$`, right: '$3$' },
        { left: r`$E(5 - X)$`, right: '$3$ (= 5 − 2)' },
        { left: r`$\sigma(2X)$`, right: r`$2\sqrt{3}$` },
      ],
    },
    {
      type: 'ordering',
      title: 'Étapes de l’étude d’un jeu',
      items: [
        'Définir le gain algébrique G (reçu − mise)',
        'Lister les valeurs possibles de G',
        'Calculer la probabilité de chaque valeur',
        'Vérifier que la somme des probabilités vaut 1',
        r`Calculer $E(G)$`,
        'Conclure : jeu équitable, favorable ou défavorable',
      ],
    },
  ],
}

export default chapter
