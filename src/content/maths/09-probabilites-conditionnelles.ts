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

// ---------------------------------------------------------------------------
// Générateur d'arbres pondérés en SVG (style blueprint, clair/sombre)
// ---------------------------------------------------------------------------
interface TNode {
  label: string
  neg?: boolean // affiche le libellé surligné (événement contraire)
  p: string // pondération de la branche qui mène au nœud
  children?: TNode[]
  leaf?: string // annotation en bout de chemin
}

const BLUE = 'hsl(217 91% 60%)'
const ORANGE = 'hsl(25 95% 53%)'

const ov = (s: string) => `<tspan text-decoration="overline">${s}</tspan>`
const sub = (s: string) => `<tspan baseline-shift="sub" font-size="9">${s}</tspan>`

function nodeLabel(n: TNode): string {
  return n.neg ? `<tspan text-decoration="overline">${n.label}</tspan>` : n.label
}

function treeSvg(children: TNode[], opts: { leafTitle?: string } = {}): string {
  const X0 = 24
  const X1 = 190
  const X2 = 360
  const XL = 392
  const GAP = 46
  const TOP = 34
  let leafIndex = 0
  const parts: string[] = []

  const leafY = () => TOP + GAP * leafIndex++

  const edge = (x1: number, y1: number, x2: number, y2: number, prob: string) => {
    parts.push(
      `<line x1="${x1 + 12}" y1="${y1}" x2="${x2 - 14}" y2="${y2}" stroke="currentColor" stroke-width="1.2"/>`,
    )
    const mx = (x1 + x2) / 2
    const my = (y1 + y2) / 2
    const dy = y2 < y1 ? -8 : y2 > y1 ? 16 : -7
    const dx = y2 < y1 ? -10 : y2 > y1 ? -10 : 0
    parts.push(
      `<text x="${mx + dx}" y="${my + dy}" text-anchor="middle" font-size="12.5" fill="${BLUE}">${prob}</text>`,
    )
  }

  const placed = children.map((c) => {
    const ys = (c.children ?? []).map(() => leafY())
    const y = ys.length ? ys.reduce((a, b) => a + b, 0) / ys.length : leafY()
    return { c, y, ys }
  })
  const rootY = placed.reduce((a, b) => a + b.y, 0) / placed.length
  const H = TOP + GAP * (leafIndex - 1) + 30

  parts.push(`<circle cx="${X0}" cy="${rootY}" r="3.5" fill="currentColor"/>`)
  for (const { c, y, ys } of placed) {
    edge(X0 - 6, rootY, X1, y, c.p)
    parts.push(
      `<text x="${X1}" y="${y + 5}" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">${nodeLabel(c)}</text>`,
    )
    ;(c.children ?? []).forEach((g, i) => {
      const gy = ys[i]
      edge(X1, y, X2, gy, g.p)
      parts.push(
        `<text x="${X2}" y="${gy + 5}" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">${nodeLabel(g)}</text>`,
      )
      if (g.leaf) {
        parts.push(
          `<text x="${XL}" y="${gy + 5}" font-size="12" fill="currentColor" opacity="0.85">${g.leaf}</text>`,
        )
      }
    })
    if (!c.children && c.leaf) {
      parts.push(`<text x="${X1 + 30}" y="${y + 5}" font-size="12" fill="currentColor">${c.leaf}</text>`)
    }
  }
  if (opts.leafTitle) {
    parts.push(
      `<text x="${XL}" y="16" font-size="11" fill="${ORANGE}" letter-spacing="0.5">${opts.leafTitle}</text>`,
    )
  }
  return `<svg viewBox="0 0 600 ${H}" width="100%" font-family="Geist, sans-serif" xmlns="http://www.w3.org/2000/svg">${parts.join('')}</svg>`
}


// Arbre générique A / B
const nA = ov('A')
const nB = ov('B')
const genericTree = treeSvg(
  [
    {
      label: 'A',
      p: 'P(A)',
      children: [
        { label: 'B', p: `P${sub('A')}(B)`, leaf: `P(A ∩ B) = P(A) × P${sub('A')}(B)` },
        { label: 'B', neg: true, p: `P${sub('A')}(${nB})`, leaf: `P(A ∩ ${nB}) = P(A) × P${sub('A')}(${nB})` },
      ],
    },
    {
      label: 'A',
      neg: true,
      p: `P(${nA})`,
      children: [
        { label: 'B', p: `P${sub(nA)}(B)`, leaf: `P(${nA} ∩ B) = P(${nA}) × P${sub(nA)}(B)` },
        { label: 'B', neg: true, p: `P${sub(nA)}(${nB})`, leaf: `P(${nA} ∩ ${nB}) = P(${nA}) × P${sub(nA)}(${nB})` },
      ],
    },
  ],
  { leafTitle: 'PROBABILITÉ DU CHEMIN (produit)' },
)

// Arbre de l'exemple numérique du cours
const exampleTree = treeSvg(
  [
    {
      label: 'A',
      p: '0,3',
      children: [
        { label: 'B', p: '0,8', leaf: 'P(A ∩ B) = 0,3 × 0,8 = 0,24' },
        { label: 'B', neg: true, p: '0,2', leaf: `P(A ∩ ${nB}) = 0,3 × 0,2 = 0,06` },
      ],
    },
    {
      label: 'A',
      neg: true,
      p: '0,7',
      children: [
        { label: 'B', p: '0,4', leaf: `P(${nA} ∩ B) = 0,7 × 0,4 = 0,28` },
        { label: 'B', neg: true, p: '0,6', leaf: `P(${nA} ∩ ${nB}) = 0,7 × 0,6 = 0,42` },
      ],
    },
  ],
  { leafTitle: 'CHEMINS — total = 1' },
)

// Arbre du test médical (cours)
const testTree = treeSvg(
  [
    {
      label: 'M',
      p: '0,02',
      children: [
        { label: 'T', p: '0,95', leaf: 'vrais positifs : 0,019' },
        { label: 'T', neg: true, p: '0,05', leaf: 'faux négatifs : 0,001' },
      ],
    },
    {
      label: 'M',
      neg: true,
      p: '0,98',
      children: [
        { label: 'T', p: '0,10', leaf: 'faux positifs : 0,098' },
        { label: 'T', neg: true, p: '0,90', leaf: 'vrais négatifs : 0,882' },
      ],
    },
  ],
  { leafTitle: 'M : malade, T : test positif' },
)

// Arbre à trois branches (partition)
const partitionTree = treeSvg(
  [
    {
      label: 'A₁',
      p: '0,5',
      children: [
        { label: 'D', p: '0,02', leaf: '0,5 × 0,02 = 0,010' },
        { label: 'D', neg: true, p: '0,98', leaf: '0,5 × 0,98 = 0,490' },
      ],
    },
    {
      label: 'A₂',
      p: '0,3',
      children: [
        { label: 'D', p: '0,04', leaf: '0,3 × 0,04 = 0,012' },
        { label: 'D', neg: true, p: '0,96', leaf: '0,3 × 0,96 = 0,288' },
      ],
    },
    {
      label: 'A₃',
      p: '0,2',
      children: [
        { label: 'D', p: '0,05', leaf: '0,2 × 0,05 = 0,010' },
        { label: 'D', neg: true, p: '0,95', leaf: '0,2 × 0,95 = 0,190' },
      ],
    },
  ],
  { leafTitle: 'P(D) = 0,010 + 0,012 + 0,010 = 0,032' },
)

// Arbre de deux épreuves indépendantes (pièce truquée lancée deux fois)
const indepTree = treeSvg(
  [
    {
      label: 'P',
      p: '0,6',
      children: [
        { label: 'P', p: '0,6', leaf: '(P ; P) : 0,36' },
        { label: 'F', p: '0,4', leaf: '(P ; F) : 0,24' },
      ],
    },
    {
      label: 'F',
      p: '0,4',
      children: [
        { label: 'P', p: '0,6', leaf: '(F ; P) : 0,24' },
        { label: 'F', p: '0,4', leaf: '(F ; F) : 0,16' },
      ],
    },
  ],
  { leafTitle: 'MÊMES PONDÉRATIONS AU 2ᵉ NIVEAU' },
)

// Diagramme « carré unité » : partition et probabilités totales
const partitionSquare = `<svg viewBox="0 0 520 250" width="100%" font-family="Geist, sans-serif" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="300" height="200" fill="none" stroke="currentColor" stroke-width="1.4"/>
<line x1="170" y1="20" x2="170" y2="220" stroke="currentColor" stroke-width="1"/>
<line x1="260" y1="20" x2="260" y2="220" stroke="currentColor" stroke-width="1"/>
<rect x="20" y="160" width="150" height="60" fill="${BLUE}" opacity="0.35"/>
<rect x="170" y="140" width="90" height="80" fill="${BLUE}" opacity="0.35"/>
<rect x="260" y="110" width="60" height="110" fill="${BLUE}" opacity="0.35"/>
<path d="M20 160 H170 V140 H260 V110 H320" fill="none" stroke="${BLUE}" stroke-width="1.6"/>
<text x="95" y="45" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">A₁</text>
<text x="215" y="45" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">A₂</text>
<text x="290" y="45" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">A₃</text>
<text x="95" y="195" text-anchor="middle" font-size="12" fill="currentColor">B ∩ A₁</text>
<text x="215" y="185" text-anchor="middle" font-size="12" fill="currentColor">B ∩ A₂</text>
<text x="290" y="170" text-anchor="middle" font-size="12" fill="currentColor">B ∩ A₃</text>
<text x="20" y="240" font-size="11" fill="currentColor" opacity="0.8">Ω (aire totale = 1)</text>
<text x="340" y="60" font-size="12.5" fill="currentColor">• A₁, A₂, A₃ : deux à deux</text>
<text x="352" y="77" font-size="12.5" fill="currentColor">incompatibles, réunion = Ω</text>
<text x="340" y="110" font-size="12.5" fill="${BLUE}">• B (zone bleue) est découpé</text>
<text x="352" y="127" font-size="12.5" fill="${BLUE}">en trois morceaux disjoints</text>
<text x="340" y="165" font-size="12.5" fill="currentColor">P(B) = P(B∩A₁) + P(B∩A₂)</text>
<text x="400" y="182" font-size="12.5" fill="currentColor">+ P(B∩A₃)</text>
</svg>`

// ---------------------------------------------------------------------------
// Chapitre
// ---------------------------------------------------------------------------
const chapter: Chapter = {
  id: 'probabilites-conditionnelles',
  subject: 'maths',
  order: 9,
  title: 'Probabilités conditionnelles et indépendance',
  theme: 'Probabilités et statistiques',
  summary:
    'Probabilité conditionnelle, tableaux croisés et arbres pondérés, formule des probabilités totales, inversion du conditionnement (tests médicaux) et indépendance de deux événements ou de deux épreuves.',
  duration: '3 semaines',
  objectives: [
    'Construire un arbre pondéré ou un tableau croisé en lien avec une situation donnée ; passer du registre de la langue naturelle au registre symbolique et inversement.',
    r`Calculer une probabilité conditionnelle $P_A(B)$ et utiliser la formule $P(A \cap B) = P(A) \times P_A(B)$.`,
    'Utiliser un arbre pondéré : règle du produit sur un chemin, règle de la somme sur les branches issues d’un même nœud.',
    'Calculer une probabilité à l’aide de la formule des probabilités totales (partition de l’univers).',
    r`Inverser un conditionnement : calculer $P_B(A)$ à partir de $P(A)$ et $P_A(B)$ ; interpréter (faux positifs, faux négatifs).`,
    'Reconnaître et utiliser l’indépendance de deux événements ; ne pas confondre indépendance et incompatibilité.',
    'Modéliser la succession de deux épreuves indépendantes (arbre, tableau, produit des probabilités).',
    'Simuler une expérience aléatoire en Python pour estimer une probabilité conditionnelle.',
  ],
  keywords: [
    'probabilité conditionnelle',
    'arbre pondéré',
    'tableau croisé',
    'partition',
    'probabilités totales',
    'indépendance',
    'épreuves indépendantes',
    'faux positif',
    'sensibilité',
    'spécificité',
    'formule de Bayes',
  ],

  // =====================================================================
  // FICHE
  // =====================================================================
  fiche: [
    h2('1. Rappels'),
    {
      type: 'table',
      headers: ['Notion', 'Écriture', 'Formule'],
      rows: [
        ['Événement contraire', r`$\overline{A}$`, r`$P(\overline{A}) = 1 - P(A)$`],
        ['« A et B »', r`$A \cap B$`, '—'],
        ['« A ou B »', r`$A \cup B$`, r`$P(A \cup B) = P(A) + P(B) - P(A \cap B)$`],
        ['Incompatibles', r`$A \cap B = \varnothing$`, r`$P(A \cup B) = P(A) + P(B)$`],
        ['Équiprobabilité', '—', r`$P(A) = \dfrac{\text{nombre d'issues de } A}{\text{nombre total d'issues}}$`],
      ],
    },
    h2('2. Probabilité conditionnelle'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Probabilité de B sachant A',
      content: [
        p(r`Si $P(A) \neq 0$ : $$P_A(B) = \dfrac{P(A \cap B)}{P(A)}$$`),
        p(r`D'où la **formule du produit** : $P(A \cap B) = P(A) \times P_A(B)$. De plus $P_A(\overline{B}) = 1 - P_A(B)$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ne pas confondre',
      content: [p(r`$P_A(B)$ (on sait que $A$ est réalisé), $P_B(A)$ (on sait que $B$ est réalisé) et $P(A \cap B)$ (les deux à la fois) sont **trois nombres différents** en général.`)],
    },
    h2('3. Arbre pondéré'),
    {
      type: 'callout',
      variant: 'property',
      title: 'Règles de l’arbre',
      content: [
        ol(
          '**Nœud** : la somme des probabilités des branches issues d’un même nœud vaut $1$.',
          '**Chemin** : la probabilité d’un chemin est le **produit** des probabilités de ses branches.',
          '**Événement** : la probabilité d’un événement est la **somme** des probabilités des chemins qui y mènent.',
          r`Au 2ᵉ niveau, les branches portent des probabilités **conditionnelles** : $P_A(B)$, $P_{\overline{A}}(B)$…`,
        ),
      ],
    },
    { type: 'svg', svg: genericTree, caption: 'Arbre pondéré à deux niveaux.', maxWidth: 640 },
    h2('4. Probabilités totales'),
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Formule des probabilités totales',
      content: [
        p(r`Si $A_1, \dots, A_n$ forment une **partition** de $\Omega$ (deux à deux incompatibles, de réunion $\Omega$, de probabilités non nulles) :`),
        m(r`P(B) = P(A_1 \cap B) + \dots + P(A_n \cap B) = P(A_1)P_{A_1}(B) + \dots + P(A_n)P_{A_n}(B)`),
        p(r`Cas usuel : $P(B) = P(A)P_A(B) + P(\overline{A})P_{\overline{A}}(B)$.`),
      ],
    },
    h2('5. Inverser un conditionnement'),
    m(r`P_B(A) = \dfrac{P(A \cap B)}{P(B)} = \dfrac{P(A) \times P_A(B)}{P(A)P_A(B) + P(\overline{A})P_{\overline{A}}(B)}`),
    p('Test médical : même un test fiable peut donner beaucoup de **faux positifs** si la maladie est rare.'),
    h2('6. Indépendance'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Événements indépendants',
      content: [
        p(r`$A$ et $B$ sont indépendants si $P(A \cap B) = P(A) \times P(B)$.`),
        p(r`Si $P(A) \neq 0$ : équivaut à $P_A(B) = P(B)$. Alors $\overline{A}$ et $B$, $A$ et $\overline{B}$, $\overline{A}$ et $\overline{B}$ sont aussi indépendants.`),
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Deux épreuves indépendantes',
      content: [
        p(r`Pour deux épreuves indépendantes, la probabilité du couple $(x ; y)$ est $P(x) \times P(y)$ : dans l'arbre, le 2ᵉ niveau porte les **mêmes** probabilités sous chaque nœud.`),
        p('Tirages **avec remise** : indépendants. Tirages **sans remise** : non indépendants.'),
      ],
    },
  ],

  // =====================================================================
  // COURS
  // =====================================================================
  cours: [
    h2('1. Rappels sur les probabilités'),
    p('On étudie une **expérience aléatoire** : on connaît toutes ses issues possibles, mais on ne peut pas prévoir laquelle se produira.'),
    {
      type: 'keyvalue',
      items: [
        { key: r`Univers $\Omega$`, value: 'Ensemble de toutes les issues possibles.' },
        { key: 'Événement', value: r`Partie de $\Omega$ ; il est réalisé si l'issue obtenue lui appartient.` },
        { key: r`Contraire $\overline{A}$`, value: r`Ensemble des issues qui ne sont pas dans $A$ (« non $A$ »).` },
        { key: r`Intersection $A \cap B$`, value: r`Issues dans $A$ **et** dans $B$.` },
        { key: r`Réunion $A \cup B$`, value: r`Issues dans $A$ **ou** dans $B$ (ou dans les deux).` },
        { key: 'Incompatibles', value: r`$A \cap B = \varnothing$ : $A$ et $B$ ne peuvent pas être réalisés simultanément.` },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Propriétés d’une probabilité $P$',
      content: [
        ul(
          r`Pour tout événement $A$ : $0 \le P(A) \le 1$, $P(\varnothing) = 0$, $P(\Omega) = 1$.`,
          r`$P(\overline{A}) = 1 - P(A)$.`,
          r`$P(A \cup B) = P(A) + P(B) - P(A \cap B)$ ; si $A$ et $B$ sont incompatibles, $P(A \cup B) = P(A) + P(B)$.`,
          r`En situation d'**équiprobabilité** : $P(A) = \dfrac{\operatorname{card}(A)}{\operatorname{card}(\Omega)}$.`,
        ),
      ],
    },

    h2('2. Probabilité conditionnelle'),
    h3('2.1 Une situation pour comprendre'),
    p(r`On lance un dé équilibré à six faces. Soit $A$ : « le résultat est pair » $= \{2 ; 4 ; 6\}$ et $B$ : « le résultat est supérieur ou égal à 4 » $= \{4 ; 5 ; 6\}$.`),
    p(r`On a $P(B) = \dfrac{3}{6} = \dfrac{1}{2}$. Mais si l'on **sait** que le résultat est pair, il ne reste que trois issues possibles $\{2 ; 4 ; 6\}$, dont deux réalisent $B$ : la probabilité de $B$ « sachant $A$ » vaut $\dfrac{2}{3}$.`),
    p(r`On remarque que $\dfrac{2}{3} = \dfrac{2/6}{3/6} = \dfrac{P(A \cap B)}{P(A)}$ : l'information « $A$ est réalisé » **restreint l'univers** à $A$.`),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Probabilité conditionnelle',
      content: [
        p(r`Soit $A$ un événement de probabilité **non nulle**. La probabilité de $B$ sachant $A$ est le nombre noté $P_A(B)$ défini par :`),
        m(r`P_A(B) = \dfrac{P(A \cap B)}{P(A)}`),
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Formule du produit (probabilités composées)',
      content: [
        p(r`Si $P(A) \neq 0$ : $$P(A \cap B) = P(A) \times P_A(B)$$`),
        p(r`Si de plus $P(B) \neq 0$ : $P(A \cap B) = P(B) \times P_B(A)$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: '$P_A$ est une probabilité',
      content: [
        p(r`L'application $B \mapsto P_A(B)$ est une probabilité sur $\Omega$. En particulier : $0 \le P_A(B) \le 1$, $P_A(A) = 1$ et`),
        m(r`P_A(\overline{B}) = 1 - P_A(B)`),
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Trois nombres à ne pas confondre',
      content: [
        ul(
          r`$P(A \cap B)$ : probabilité que $A$ **et** $B$ se réalisent (on ne sait rien au départ).`,
          r`$P_A(B)$ : probabilité de $B$ quand on **sait** que $A$ est réalisé (on divise par $P(A)$).`,
          r`$P_B(A)$ : probabilité de $A$ quand on **sait** que $B$ est réalisé (on divise par $P(B)$).`,
        ),
        p(r`Dans l'exemple du dé : $P(A \cap B) = \dfrac{1}{3}$, $P_A(B) = \dfrac{2}{3}$, $P_B(A) = \dfrac{2/6}{3/6} = \dfrac{2}{3}$. Ici $P_A(B) = P_B(A)$ uniquement parce que $P(A) = P(B)$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Repérer une probabilité conditionnelle dans un énoncé',
      content: [
        p('Les expressions « **parmi** les… », « **sachant que**… », « **si** la personne est… », « **chez** les… », « **lorsque**… » signalent une probabilité conditionnelle.'),
        p(r`*« 12 % des fumeurs sont malades »* se traduit par $P_F(M) = 0{,}12$, alors que *« 12 % des personnes sont des fumeurs malades »* se traduit par $P(F \cap M) = 0{,}12$.`),
      ],
    },

    h3('2.2 Tableau croisé d’effectifs'),
    p(r`Lorsque l'on choisit un individu **au hasard** (équiprobabilité) dans une population décrite par un tableau croisé, une probabilité conditionnelle se lit comme une **proportion dans une ligne ou une colonne**.`),
    p(r`**Exemple.** Dans un groupe de 250 personnes, on note $V$ : « la personne est vaccinée » et $M$ : « la personne a contracté la grippe cet hiver ».`),
    {
      type: 'table',
      headers: ['', r`$M$ (malade)`, r`$\overline{M}$`, 'Total'],
      rows: [
        [r`$V$ (vacciné)`, '15', '135', '150'],
        [r`$\overline{V}$`, '30', '70', '100'],
        ['Total', '45', '205', '250'],
      ],
      caption: 'Tableau croisé des effectifs',
    },
    ul(
      r`$P(M) = \dfrac{45}{250} = 0{,}18$ ; $P(V \cap M) = \dfrac{15}{250} = 0{,}06$.`,
      r`$P_V(M) = \dfrac{15}{150} = 0{,}1$ : 10 % des vaccinés ont été malades (on lit **la ligne** $V$).`,
      r`$P_{\overline{V}}(M) = \dfrac{30}{100} = 0{,}3$ : 30 % des non-vaccinés ont été malades.`,
      r`$P_M(V) = \dfrac{15}{45} = \dfrac{1}{3}$ : un tiers des malades étaient vaccinés (on lit **la colonne** $M$).`,
    ),
    p(r`On vérifie la définition : $\dfrac{P(V \cap M)}{P(V)} = \dfrac{15/250}{150/250} = \dfrac{15}{150} = 0{,}1 = P_V(M)$.`),
    {
      type: 'steps',
      items: [
        { title: 'Identifier la condition', text: r`Repérer l'événement « sachant » : il désigne la **ligne** ou la **colonne** de référence.` },
        { title: 'Lire l’effectif favorable', text: r`Prendre la case à l'intersection des deux événements.` },
        { title: 'Diviser par le total de la condition', text: r`$P_A(B) = \dfrac{\text{effectif de } A \cap B}{\text{effectif de } A}$ (et **non** par l'effectif total).` },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Interprétation',
      content: [p(r`Que $P_M(V) = \dfrac{1}{3}$ ne signifie pas que le vaccin est inefficace : il y a plus de vaccinés que de non-vaccinés. Pour juger, on compare $P_V(M) = 0{,}1$ et $P_{\overline{V}}(M) = 0{,}3$.`)],
    },

    h2('3. Arbres pondérés'),
    p(r`Un **arbre pondéré** représente une expérience en plusieurs étapes. Chaque branche porte une probabilité ; au premier niveau ce sont des probabilités « simples », aux niveaux suivants ce sont des **probabilités conditionnelles**.`),
    { type: 'svg', svg: genericTree, caption: 'Arbre pondéré général : à chaque extrémité, la probabilité du chemin.', maxWidth: 640 },
    {
      type: 'callout',
      variant: 'property',
      title: 'Règles de calcul sur un arbre pondéré',
      content: [
        ol(
          '**Règle des nœuds** : la somme des probabilités portées par les branches issues d’un même nœud est égale à $1$.',
          r`**Règle du produit** : la probabilité d'un chemin est le produit des probabilités des branches qui le composent (c'est la formule $P(A \cap B) = P(A) \times P_A(B)$).`,
          '**Règle de la somme** : la probabilité d’un événement est la somme des probabilités des chemins qui mènent à cet événement.',
        ),
      ],
    },
    p(r`**Exemple.** On donne $P(A) = 0{,}3$, $P_A(B) = 0{,}8$ et $P_{\overline{A}}(B) = 0{,}4$. On complète l'arbre grâce à la règle des nœuds : $P(\overline{A}) = 0{,}7$, $P_A(\overline{B}) = 0{,}2$, $P_{\overline{A}}(\overline{B}) = 0{,}6$.`),
    { type: 'svg', svg: exampleTree, caption: 'Arbre complété : les quatre chemins ont une somme égale à 1.', maxWidth: 640 },
    ul(
      r`$P(A \cap B) = 0{,}3 \times 0{,}8 = 0{,}24$.`,
      r`$P(B) = P(A \cap B) + P(\overline{A} \cap B) = 0{,}24 + 0{,}28 = 0{,}52$.`,
      r`Contrôle : $0{,}24 + 0{,}06 + 0{,}28 + 0{,}42 = 1$.`,
    ),
    {
      type: 'callout',
      variant: 'method',
      title: 'Construire un arbre à partir d’un énoncé',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Nommer les événements', text: 'Choisir des lettres explicites et écrire leur signification en français.' },
            { title: 'Choisir l’ordre', text: r`Au premier niveau, l'événement dont on connaît la probabilité **non conditionnelle** ; les données « parmi les… » vont au second niveau.` },
            { title: 'Placer les données', text: 'Traduire chaque pourcentage de l’énoncé en écriture symbolique, puis le reporter sur la bonne branche.' },
            { title: 'Compléter', text: 'Utiliser la règle des nœuds (complément à 1) pour toutes les branches manquantes.' },
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ce que l’arbre ne donne pas directement',
      content: [p(r`Sur un arbre de premier niveau $A$, on lit $P_A(B)$, mais **jamais** $P_B(A)$ ni $P(B)$ : il faut les calculer (probabilités totales, puis inversion).`)],
    },

    h2('4. Partition et formule des probabilités totales'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Partition de l’univers',
      content: [
        p(r`Les événements $A_1, A_2, \dots, A_n$ forment une **partition** de $\Omega$ s'ils sont **non vides**, **deux à deux incompatibles** ($A_i \cap A_j = \varnothing$ pour $i \neq j$) et si leur **réunion est** $\Omega$.`),
        p(r`Exemple fondamental : pour tout événement $A$ tel que $A \neq \varnothing$ et $A \neq \Omega$, le couple $(A, \overline{A})$ est une partition de $\Omega$.`),
      ],
    },
    { type: 'svg', svg: partitionSquare, caption: 'Une partition découpe B en morceaux disjoints.', maxWidth: 600 },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Formule des probabilités totales',
      content: [
        p(r`Soit $A_1, \dots, A_n$ une partition de $\Omega$ formée d'événements de probabilités non nulles. Pour tout événement $B$ :`),
        m(r`P(B) = P(A_1 \cap B) + P(A_2 \cap B) + \dots + P(A_n \cap B)`),
        m(r`P(B) = P(A_1) \times P_{A_1}(B) + P(A_2) \times P_{A_2}(B) + \dots + P(A_n) \times P_{A_n}(B)`),
        p(r`Cas particulier ($n = 2$) : $P(B) = P(A) \times P_A(B) + P(\overline{A}) \times P_{\overline{A}}(B)$.`),
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [
        p(r`Les événements $A_i \cap B$ sont deux à deux incompatibles (car $(A_i \cap B) \cap (A_j \cap B) \subset A_i \cap A_j = \varnothing$) et leur réunion est $(A_1 \cup \dots \cup A_n) \cap B = \Omega \cap B = B$.`),
        p(r`Par additivité de la probabilité pour des événements incompatibles : $P(B) = P(A_1 \cap B) + \dots + P(A_n \cap B)$.`),
        p(r`Enfin, pour chaque $i$, $P(A_i) \neq 0$ donc $P(A_i \cap B) = P(A_i) \times P_{A_i}(B)$ (formule du produit). $\square$`),
      ],
    },
    p(r`**Exemple.** Une entreprise achète ses pièces à trois fournisseurs : $A_1$ (50 %), $A_2$ (30 %) et $A_3$ (20 %). Les taux de pièces défectueuses sont respectivement 2 %, 4 % et 5 %. On note $D$ : « la pièce est défectueuse ».`),
    { type: 'svg', svg: partitionTree, caption: 'Arbre à trois branches : A₁, A₂, A₃ forment une partition.', maxWidth: 640 },
    m(r`P(D) = 0{,}5 \times 0{,}02 + 0{,}3 \times 0{,}04 + 0{,}2 \times 0{,}05 = 0{,}010 + 0{,}012 + 0{,}010 = 0{,}032`),
    p('Ainsi 3,2 % des pièces achetées sont défectueuses.'),

    h2('5. Inverser un conditionnement'),
    p(r`Les arbres donnent naturellement $P_A(B)$ ; on cherche souvent $P_B(A)$ (« sachant le résultat observé, quelle est la cause ? »). On combine la définition, la formule du produit et les probabilités totales :`),
    {
      type: 'callout',
      variant: 'property',
      title: 'Inversion (formule de Bayes, hors programme sous ce nom)',
      content: [
        m(r`P_B(A) = \dfrac{P(A \cap B)}{P(B)} = \dfrac{P(A) \times P_A(B)}{P(A) \times P_A(B) + P(\overline{A}) \times P_{\overline{A}}(B)}`),
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Calculer le numérateur', text: r`$P(A \cap B) = P(A) \times P_A(B)$ (un chemin de l'arbre).` },
        { title: 'Calculer le dénominateur', text: r`$P(B)$ par la formule des probabilités totales (somme de tous les chemins menant à $B$).` },
        { title: 'Diviser et interpréter', text: r`$P_B(A) = \dfrac{P(A \cap B)}{P(B)}$, puis conclure par une phrase en contexte.` },
      ],
    },
    p(r`Dans l'exemple des fournisseurs, la probabilité qu'une pièce défectueuse provienne de $A_3$ vaut $P_D(A_3) = \dfrac{0{,}010}{0{,}032} = 0{,}3125$ : alors que $A_3$ ne fournit que 20 % des pièces, il est responsable de 31,25 % des défauts.`),

    h3('5.1 Application : tests de dépistage et faux positifs'),
    p(r`Une maladie touche 2 % d'une population. Un test de dépistage est positif chez 95 % des malades (**sensibilité**) et négatif chez 90 % des personnes saines (**spécificité**). On note $M$ : « la personne est malade » et $T$ : « le test est positif ».`),
    { type: 'svg', svg: testTree, caption: 'Arbre du test de dépistage.', maxWidth: 640 },
    {
      type: 'keyvalue',
      items: [
        { key: 'Sensibilité', value: r`$P_M(T) = 0{,}95$ : aptitude à détecter les malades.` },
        { key: 'Spécificité', value: r`$P_{\overline{M}}(\overline{T}) = 0{,}90$ : aptitude à ne pas alarmer les personnes saines.` },
        { key: 'Faux positif', value: r`Personne saine avec test positif : événement $\overline{M} \cap T$.` },
        { key: 'Faux négatif', value: r`Personne malade avec test négatif : événement $M \cap \overline{T}$.` },
        { key: 'Valeur prédictive positive', value: r`$P_T(M)$ : probabilité d'être malade quand le test est positif.` },
      ],
    },
    p(r`Probabilités totales : $P(T) = 0{,}02 \times 0{,}95 + 0{,}98 \times 0{,}10 = 0{,}019 + 0{,}098 = 0{,}117$.`),
    m(r`P_T(M) = \dfrac{P(M \cap T)}{P(T)} = \dfrac{0{,}019}{0{,}117} = \dfrac{19}{117} \approx 0{,}162`),
    p(r`**Interprétation surprenante** : une personne testée positive n'a qu'environ **16 %** de chances d'être malade ! Les faux positifs (0,098) sont cinq fois plus nombreux que les vrais positifs (0,019), car les personnes saines sont très majoritaires.`),
    {
      type: 'table',
      headers: ['Sur 10 000 personnes', r`$T$ (positif)`, r`$\overline{T}$ (négatif)`, 'Total'],
      rows: [
        [r`$M$`, '190', '10', '200'],
        [r`$\overline{M}$`, '980', '8 820', '9 800'],
        ['Total', '1 170', '8 830', '10 000'],
      ],
      caption: r`Même calcul en effectifs : $P_T(M) = \dfrac{190}{1\,170} \approx 0{,}162$.`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Astuce : raisonner sur 10 000 individus',
      content: [p('Transformer les probabilités en effectifs sur une population fictive (1 000 ou 10 000 personnes) rend l’inversion très intuitive et permet de vérifier un calcul.')],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Erreur classique (« sophisme du procureur »)',
      content: [p(r`Confondre $P_M(T) = 0{,}95$ (probabilité d'un test positif chez un malade) avec $P_T(M) \approx 0{,}16$ (probabilité d'être malade si le test est positif). Ces deux nombres n'ont rien à voir !`)],
    },
    {
      type: 'widget',
      id: 'probability-tree',
      props: { pA: 0.02, pBsachantA: 0.95, pBsachantNonA: 0.1 },
      title: 'Explorer le test de dépistage',
      caption: 'Faites varier la prévalence P(A) : quand la maladie devient fréquente, la valeur prédictive positive P_B(A) augmente fortement.',
    },

    h2('6. Indépendance de deux événements'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Événements indépendants',
      content: [
        p(r`Deux événements $A$ et $B$ sont **indépendants** lorsque :`),
        m(r`P(A \cap B) = P(A) \times P(B)`),
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Caractérisation par les probabilités conditionnelles',
      content: [
        p(r`Si $P(A) \neq 0$ : $A$ et $B$ sont indépendants $\iff P_A(B) = P(B)$.`),
        p('Autrement dit, savoir que $A$ est réalisé ne modifie pas la probabilité de $B$.'),
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [
        p(r`Comme $P(A) \neq 0$, $P(A \cap B) = P(A) \times P_A(B)$. Donc $P(A \cap B) = P(A) \times P(B) \iff P(A) \times P_A(B) = P(A) \times P(B) \iff P_A(B) = P(B)$ (on divise par $P(A) \neq 0$). $\square$`),
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Indépendance et événement contraire',
      content: [p(r`Si $A$ et $B$ sont indépendants, alors $\overline{A}$ et $B$ sont indépendants (de même $A$ et $\overline{B}$, ainsi que $\overline{A}$ et $\overline{B}$).`)],
    },
    {
      type: 'reveal',
      title: 'Démonstration (au programme)',
      content: [
        p(r`$(A, \overline{A})$ est une partition de $\Omega$, donc $B = (A \cap B) \cup (\overline{A} \cap B)$ avec deux événements incompatibles : $P(B) = P(A \cap B) + P(\overline{A} \cap B)$.`),
        p(r`D'où $P(\overline{A} \cap B) = P(B) - P(A \cap B) = P(B) - P(A)P(B) = P(B)\big(1 - P(A)\big) = P(\overline{A}) \times P(B)$.`),
        p(r`Donc $\overline{A}$ et $B$ sont indépendants. En appliquant ce résultat au couple $(B, A)$ puis à $(\overline{A}, B)$, on obtient les deux autres cas. $\square$`),
      ],
    },
    p(r`**Exemple.** On lance un dé équilibré. $A$ : « pair » $= \{2 ; 4 ; 6\}$ et $C$ : « au plus 2 » $= \{1 ; 2\}$. Alors $P(A \cap C) = P(\{2\}) = \dfrac{1}{6}$ et $P(A) \times P(C) = \dfrac{1}{2} \times \dfrac{1}{3} = \dfrac{1}{6}$ : $A$ et $C$ sont indépendants. En revanche avec $B = \{4 ; 5 ; 6\}$ : $P(A \cap B) = \dfrac{1}{3} \neq \dfrac{1}{2} \times \dfrac{1}{2}$, donc $A$ et $B$ ne sont pas indépendants.`),
    {
      type: 'callout',
      variant: 'warning',
      title: 'Indépendants ≠ incompatibles',
      content: [
        p(r`Si $A$ et $B$ sont incompatibles avec $P(A) \neq 0$ et $P(B) \neq 0$, alors $P(A \cap B) = 0 \neq P(A)P(B)$ : ils sont **dépendants** ! (Savoir que $A$ est réalisé garantit que $B$ ne l'est pas.)`),
        p('L’incompatibilité se voit sur un diagramme ; l’indépendance est une propriété **numérique** qui dépend de la probabilité choisie.'),
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Prouver (ou réfuter) une indépendance',
      content: [
        ol(
          r`Calculer séparément $P(A)$, $P(B)$ et $P(A \cap B)$.`,
          r`Comparer $P(A \cap B)$ et $P(A) \times P(B)$ (ou bien $P_A(B)$ et $P(B)$).`,
          'Conclure : égalité ⇒ indépendants ; sinon ⇒ non indépendants.',
        ),
      ],
    },
    p(r`**Sur un arbre**, $A$ et $B$ sont indépendants si et seulement si $P_A(B) = P_{\overline{A}}(B)$ (lorsque $0 < P(A) < 1$) : les deux branches menant à $B$ portent la même probabilité, qui est alors $P(B)$.`),

    h2('7. Succession de deux épreuves indépendantes'),
    p(r`On réalise successivement deux expériences aléatoires, la seconde ne dépendant **pas** du résultat de la première (deux lancers de dé, lancer d'une pièce puis tirage dans une urne, tirages **avec remise**…).`),
    {
      type: 'callout',
      variant: 'property',
      title: 'Modélisation',
      content: [
        p(r`Si la première épreuve a pour univers $\Omega_1$ et la seconde $\Omega_2$, l'univers de l'expérience est l'ensemble des **couples** $(x ; y)$ avec $x \in \Omega_1$ et $y \in \Omega_2$, et :`),
        m(r`P\big((x ; y)\big) = P(x) \times P(y)`),
        p('Dans l’arbre correspondant, les probabilités du second niveau sont **les mêmes** sous chaque nœud du premier niveau.'),
      ],
    },
    p(r`**Exemple.** Une pièce truquée tombe sur Pile avec probabilité $0{,}6$. On la lance deux fois.`),
    { type: 'svg', svg: indepTree, caption: 'Deux lancers indépendants : les pondérations se répètent.', maxWidth: 640 },
    ul(
      r`$P(\text{« deux fois Pile »}) = 0{,}6^2 = 0{,}36$.`,
      r`$P(\text{« exactement un Pile »}) = 0{,}24 + 0{,}24 = 0{,}48$.`,
      r`$P(\text{« au moins un Pile »}) = 1 - P\big((F;F)\big) = 1 - 0{,}16 = 0{,}84$.`,
    ),
    h3('7.1 Tirages avec ou sans remise'),
    p(r`Une urne contient 3 boules rouges et 2 boules bleues. On tire deux boules successivement.`),
    {
      type: 'table',
      headers: ['', 'Avec remise (indépendants)', 'Sans remise (dépendants)'],
      rows: [
        [r`$P(R_1 \cap R_2)$`, r`$\dfrac{3}{5} \times \dfrac{3}{5} = \dfrac{9}{25} = 0{,}36$`, r`$\dfrac{3}{5} \times \dfrac{2}{4} = \dfrac{3}{10} = 0{,}3$`],
        ['Une boule de chaque couleur', r`$2 \times \dfrac{3}{5} \times \dfrac{2}{5} = \dfrac{12}{25} = 0{,}48$`, r`$\dfrac{3}{5} \times \dfrac{2}{4} + \dfrac{2}{5} \times \dfrac{3}{4} = \dfrac{3}{5} = 0{,}6$`],
        [r`$P_{R_1}(R_2)$`, r`$\dfrac{3}{5}$ (inchangée)`, r`$\dfrac{2}{4} = \dfrac{1}{2}$ (modifiée)`],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'À retenir',
      content: [p('Avec remise, la composition de l’urne est la même au second tirage : les deux tirages sont indépendants. Sans remise, la composition change : le second tirage dépend du premier, il faut utiliser des probabilités conditionnelles.')],
    },
    h3('7.2 Répétition d’une même épreuve'),
    p(r`On généralise à $n$ épreuves identiques et indépendantes : la probabilité d'une liste de résultats est le **produit** des probabilités. Par exemple, la probabilité d'obtenir au moins un 6 en quatre lancers d'un dé équilibré est :`),
    m(r`1 - \left(\dfrac{5}{6}\right)^4 = 1 - \dfrac{625}{1296} = \dfrac{671}{1296} \approx 0{,}518`),
    {
      type: 'callout',
      variant: 'history',
      title: 'Le problème du chevalier de Méré (1654)',
      content: [p(r`Le chevalier de Méré pariait qu'il obtiendrait au moins un 6 en 4 lancers (probabilité $\approx 0{,}518$, pari gagnant) mais aussi au moins un double 6 en 24 lancers de deux dés. Pascal montra que ce second pari est perdant : $1 - \left(\frac{35}{36}\right)^{24} \approx 0{,}491 < 0{,}5$.`)],
    },

    h2('8. Simuler pour estimer une probabilité conditionnelle'),
    p(r`On lance une pièce équilibrée : si Pile, on tire une boule dans l'urne $U_1$ (3 rouges sur 5) ; si Face, dans l'urne $U_2$ (1 rouge sur 4). On estime $P_R(\text{Pile})$ en ne gardant que les expériences où la boule est rouge.`),
    py(
      r`
from random import random

def experience():
    pile = random() < 0.5
    if pile:
        rouge = random() < 3/5
    else:
        rouge = random() < 1/4
    return pile, rouge

def estimation(n):
    nb_rouge = 0
    nb_pile_et_rouge = 0
    for _ in range(n):
        pile, rouge = experience()
        if rouge:
            nb_rouge += 1
            if pile:
                nb_pile_et_rouge += 1
    return nb_pile_et_rouge / nb_rouge

print(estimation(100000))   # environ 0.706
`,
      'Estimation de P_R(Pile) par simulation',
    ),
    p(r`Valeur exacte : $P(R) = 0{,}5 \times 0{,}6 + 0{,}5 \times 0{,}25 = 0{,}425$ et $P_R(\text{Pile}) = \dfrac{0{,}3}{0{,}425} = \dfrac{12}{17} \approx 0{,}706$.`),
    {
      type: 'callout',
      variant: 'tip',
      title: 'Fréquence conditionnelle',
      content: [p('Une probabilité conditionnelle s’estime par une **fréquence conditionnelle** : on divise par le nombre d’expériences où la condition est réalisée, pas par le nombre total d’expériences.')],
    },

    h2('9. Synthèse des pièges'),
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Sachant / et', text: r`« Parmi les A, 30 % sont B » : $P_A(B) = 0{,}3$, pas $P(A \cap B)$.`, icon: 'Split' },
        { title: 'Lire un arbre', text: r`L'arbre donne $P_A(B)$, jamais directement $P(B)$ ni $P_B(A)$.`, icon: 'GitBranch' },
        { title: 'Diviser par le bon total', text: r`$P_A(B)$ : diviser par $P(A)$ (ou l'effectif de $A$).`, icon: 'Divide' },
        { title: 'Indépendance', text: 'Ne se « voit » pas : elle se vérifie par le calcul. Incompatibles ⇒ dépendants (si probabilités non nulles).', icon: 'Unlink' },
        { title: 'Sans remise', text: 'Les tirages sans remise ne sont pas indépendants.', icon: 'Shuffle' },
        { title: 'Faux positifs', text: 'Pour une maladie rare, un test positif peut être le plus souvent un faux positif.', icon: 'Stethoscope' },
      ],
    },
  ],

  // =====================================================================
  // EXERCICES
  // =====================================================================
  exercices: [
    {
      id: 'pc-ex1-tableau',
      title: 'Lire un tableau croisé',
      difficulty: 1,
      duration: 10,
      tags: ['tableau croisé', 'probabilité conditionnelle'],
      statement: [
        p(r`Dans un lycée, on interroge 200 élèves de Première. On note $F$ : « l'élève est une fille » et $S$ : « l'élève pratique un sport en club ».`),
        {
          type: 'table',
          headers: ['', r`$S$`, r`$\overline{S}$`, 'Total'],
          rows: [
            [r`$F$`, '45', '75', '120'],
            [r`$\overline{F}$`, '40', '40', '80'],
            ['Total', '85', '115', '200'],
          ],
        },
        p('On choisit un élève au hasard. Calculer :'),
        ol(r`$P(F)$, $P(S)$ et $P(F \cap S)$ ;`, r`$P_F(S)$ et $P_{\overline{F}}(S)$ ;`, r`$P_S(F)$. Interpréter ce dernier résultat par une phrase.`),
      ],
      hints: ['Le choix au hasard donne une situation d’équiprobabilité : probabilité = effectif / effectif de référence.', r`Pour $P_F(S)$, la référence est la ligne $F$ (120 filles).`],
      solution: [
        p(r`1. $P(F) = \dfrac{120}{200} = 0{,}6$ ; $P(S) = \dfrac{85}{200} = 0{,}425$ ; $P(F \cap S) = \dfrac{45}{200} = 0{,}225$.`),
        p(r`2. $P_F(S) = \dfrac{45}{120} = 0{,}375$ : 37,5 % des filles pratiquent un sport en club. $P_{\overline{F}}(S) = \dfrac{40}{80} = 0{,}5$ : la moitié des garçons pratiquent un sport en club.`),
        p(r`3. $P_S(F) = \dfrac{45}{85} = \dfrac{9}{17} \approx 0{,}529$ : parmi les élèves pratiquant un sport en club, environ 52,9 % sont des filles.`),
        p(r`Vérification avec la définition : $P_F(S) = \dfrac{P(F \cap S)}{P(F)} = \dfrac{0{,}225}{0{,}6} = 0{,}375$. ✓`),
      ],
    },
    {
      id: 'pc-ex2-arbre',
      title: 'Compléter et exploiter un arbre',
      difficulty: 1,
      duration: 10,
      tags: ['arbre pondéré', 'probabilités totales'],
      statement: [
        p(r`On donne $P(A) = 0{,}4$, $P_A(B) = 0{,}7$ et $P_{\overline{A}}(B) = 0{,}2$.`),
        ol(
          'Construire l’arbre pondéré complet.',
          r`Calculer $P(A \cap B)$ et $P(\overline{A} \cap B)$.`,
          r`En déduire $P(B)$ puis $P(\overline{B})$.`,
          r`Calculer $P_B(A)$.`,
        ),
      ],
      hints: ['Règle des nœuds : les branches issues d’un même nœud ont une somme égale à 1.', r`$P(B)$ = somme des chemins qui mènent à $B$.`],
      solution: [
        p(r`1. Règle des nœuds : $P(\overline{A}) = 1 - 0{,}4 = 0{,}6$ ; $P_A(\overline{B}) = 1 - 0{,}7 = 0{,}3$ ; $P_{\overline{A}}(\overline{B}) = 1 - 0{,}2 = 0{,}8$.`),
        {
          type: 'svg',
          svg: treeSvg([
            {
              label: 'A',
              p: '0,4',
              children: [
                { label: 'B', p: '0,7', leaf: '0,28' },
                { label: 'B', neg: true, p: '0,3', leaf: '0,12' },
              ],
            },
            {
              label: 'A',
              neg: true,
              p: '0,6',
              children: [
                { label: 'B', p: '0,2', leaf: '0,12' },
                { label: 'B', neg: true, p: '0,8', leaf: '0,48' },
              ],
            },
          ]),
          maxWidth: 560,
        },
        p(r`2. $P(A \cap B) = P(A) \times P_A(B) = 0{,}4 \times 0{,}7 = 0{,}28$ ; $P(\overline{A} \cap B) = 0{,}6 \times 0{,}2 = 0{,}12$.`),
        p(r`3. $(A, \overline{A})$ est une partition de l'univers, donc d'après la formule des probabilités totales : $P(B) = 0{,}28 + 0{,}12 = 0{,}40$ et $P(\overline{B}) = 1 - 0{,}4 = 0{,}6$.`),
        p(r`4. $P_B(A) = \dfrac{P(A \cap B)}{P(B)} = \dfrac{0{,}28}{0{,}4} = 0{,}7$.`),
      ],
    },
    {
      id: 'pc-ex3-independance',
      title: 'Indépendants ou non ?',
      difficulty: 1,
      duration: 10,
      tags: ['indépendance'],
      statement: [
        ol(
          r`On donne $P(A) = 0{,}3$, $P(B) = 0{,}5$ et $P(A \cap B) = 0{,}15$. $A$ et $B$ sont-ils indépendants ? Calculer $P(A \cup B)$.`,
          r`On donne $P(C) = 0{,}2$, $P(D) = 0{,}4$ et $P(C \cup D) = 0{,}5$. $C$ et $D$ sont-ils indépendants ?`,
          r`$E$ et $F$ sont indépendants, avec $P(E) = 0{,}6$ et $P(F) = 0{,}25$. Calculer $P(E \cap F)$, $P(\overline{E} \cap F)$ et $P(E \cup F)$.`,
        ),
      ],
      hints: [r`Comparer $P(A \cap B)$ et $P(A) \times P(B)$.`, r`Pour la question 2, retrouver $P(C \cap D)$ grâce à $P(C \cup D) = P(C) + P(D) - P(C \cap D)$.`],
      solution: [
        p(r`1. $P(A) \times P(B) = 0{,}3 \times 0{,}5 = 0{,}15 = P(A \cap B)$ : $A$ et $B$ sont **indépendants**. $P(A \cup B) = 0{,}3 + 0{,}5 - 0{,}15 = 0{,}65$.`),
        p(r`2. $P(C \cap D) = P(C) + P(D) - P(C \cup D) = 0{,}2 + 0{,}4 - 0{,}5 = 0{,}1$. Or $P(C) \times P(D) = 0{,}08 \neq 0{,}1$ : $C$ et $D$ **ne sont pas** indépendants.`),
        p(r`3. Indépendance : $P(E \cap F) = 0{,}6 \times 0{,}25 = 0{,}15$. $\overline{E}$ et $F$ sont aussi indépendants : $P(\overline{E} \cap F) = 0{,}4 \times 0{,}25 = 0{,}1$. Enfin $P(E \cup F) = 0{,}6 + 0{,}25 - 0{,}15 = 0{,}7$.`),
      ],
    },
    {
      id: 'pc-ex4-machines',
      title: 'Deux machines et des pièces défectueuses',
      difficulty: 2,
      duration: 15,
      tags: ['probabilités totales', 'inversion'],
      statement: [
        p(r`Une usine fabrique des pièces avec deux machines : la machine $M_1$ produit 60 % des pièces et la machine $M_2$ le reste. 3 % des pièces de $M_1$ et 5 % des pièces de $M_2$ sont défectueuses. On prélève une pièce au hasard dans la production ; on note $D$ : « la pièce est défectueuse ».`),
        ol(
          'Traduire les données de l’énoncé par des probabilités, puis construire un arbre pondéré.',
          r`Calculer la probabilité que la pièce soit défectueuse et fabriquée par $M_1$.`,
          r`Montrer que $P(D) = 0{,}038$.`,
          r`La pièce est défectueuse. Quelle est la probabilité qu'elle provienne de $M_1$ ? (arrondir au millième)`,
        ),
      ],
      hints: [r`« 3 % des pièces de $M_1$ » se traduit par $P_{M_1}(D) = 0{,}03$.`, r`Question 4 : on cherche $P_D(M_1)$.`],
      solution: [
        p(r`1. $P(M_1) = 0{,}6$, $P(M_2) = 0{,}4$, $P_{M_1}(D) = 0{,}03$, $P_{M_2}(D) = 0{,}05$ ; donc $P_{M_1}(\overline{D}) = 0{,}97$ et $P_{M_2}(\overline{D}) = 0{,}95$.`),
        {
          type: 'svg',
          svg: treeSvg([
            {
              label: 'M₁',
              p: '0,6',
              children: [
                { label: 'D', p: '0,03', leaf: '0,018' },
                { label: 'D', neg: true, p: '0,97', leaf: '0,582' },
              ],
            },
            {
              label: 'M₂',
              p: '0,4',
              children: [
                { label: 'D', p: '0,05', leaf: '0,020' },
                { label: 'D', neg: true, p: '0,95', leaf: '0,380' },
              ],
            },
          ]),
          maxWidth: 560,
        },
        p(r`2. $P(M_1 \cap D) = P(M_1) \times P_{M_1}(D) = 0{,}6 \times 0{,}03 = 0{,}018$.`),
        p(r`3. $M_1$ et $M_2$ forment une partition de l'univers ; d'après la formule des probabilités totales : $P(D) = P(M_1 \cap D) + P(M_2 \cap D) = 0{,}018 + 0{,}4 \times 0{,}05 = 0{,}018 + 0{,}020 = 0{,}038$.`),
        p(r`4. $P_D(M_1) = \dfrac{P(M_1 \cap D)}{P(D)} = \dfrac{0{,}018}{0{,}038} = \dfrac{9}{19} \approx 0{,}474$. Bien que $M_1$ produise 60 % des pièces, elle n'est à l'origine que d'environ 47,4 % des pièces défectueuses.`),
      ],
    },
    {
      id: 'pc-ex5-urne',
      title: 'Tirages avec et sans remise',
      difficulty: 2,
      duration: 15,
      tags: ['épreuves indépendantes', 'arbre'],
      statement: [
        p('Une urne contient 4 boules vertes et 6 boules noires indiscernables au toucher. On tire successivement deux boules.'),
        ol(
          'Les tirages sont effectués **avec remise**. Calculer la probabilité d’obtenir deux boules vertes, puis celle d’obtenir deux boules de couleurs différentes.',
          'Mêmes questions lorsque les tirages sont effectués **sans remise**.',
          r`Dans le cas sans remise, on note $V_1$ : « la 1ʳᵉ boule est verte » et $V_2$ : « la 2ᵉ boule est verte ». Calculer $P(V_2)$ puis $P_{V_2}(V_1)$. Les événements $V_1$ et $V_2$ sont-ils indépendants ?`,
        ),
      ],
      hints: ['Avec remise : les deux tirages sont indépendants, on multiplie.', r`Sans remise : après une verte, il reste 3 vertes sur 9 boules.`],
      solution: [
        p(r`1. **Avec remise** : $P(V_1 \cap V_2) = 0{,}4 \times 0{,}4 = 0{,}16$. Couleurs différentes : $0{,}4 \times 0{,}6 + 0{,}6 \times 0{,}4 = 0{,}48$.`),
        p(r`2. **Sans remise** : $P(V_1 \cap V_2) = \dfrac{4}{10} \times \dfrac{3}{9} = \dfrac{12}{90} = \dfrac{2}{15} \approx 0{,}133$. Couleurs différentes : $\dfrac{4}{10} \times \dfrac{6}{9} + \dfrac{6}{10} \times \dfrac{4}{9} = \dfrac{24}{90} + \dfrac{24}{90} = \dfrac{48}{90} = \dfrac{8}{15} \approx 0{,}533$.`),
        p(r`3. Probabilités totales : $P(V_2) = \dfrac{4}{10} \times \dfrac{3}{9} + \dfrac{6}{10} \times \dfrac{4}{9} = \dfrac{12}{90} + \dfrac{24}{90} = \dfrac{36}{90} = \dfrac{2}{5} = 0{,}4$.`),
        p(r`Remarque : on retrouve $0{,}4$, comme au premier tirage (résultat de symétrie).`),
        p(r`$P_{V_2}(V_1) = \dfrac{P(V_1 \cap V_2)}{P(V_2)} = \dfrac{2/15}{2/5} = \dfrac{2}{15} \times \dfrac{5}{2} = \dfrac{1}{3}$.`),
        p(r`$P(V_1) \times P(V_2) = 0{,}4 \times 0{,}4 = 0{,}16 \neq \dfrac{2}{15}$ : $V_1$ et $V_2$ **ne sont pas indépendants** (normal, sans remise la composition de l'urne change).`),
      ],
    },
    {
      id: 'pc-ex6-depistage',
      title: 'Test de dépistage : faux positifs',
      difficulty: 2,
      duration: 20,
      tags: ['inversion du conditionnement', 'test médical'],
      statement: [
        p(r`Une maladie touche 1 % de la population. On dispose d'un test dont la **sensibilité** est de 99 % (99 % des malades ont un test positif) et la **spécificité** de 98 % (98 % des personnes saines ont un test négatif). On choisit une personne au hasard ; $M$ : « elle est malade », $T$ : « son test est positif ».`),
        ol(
          r`Traduire l'énoncé : donner $P(M)$, $P_M(T)$ et $P_{\overline{M}}(\overline{T})$, puis construire l'arbre.`,
          r`Calculer $P(T)$.`,
          r`Une personne a un test positif. Calculer la probabilité qu'elle soit malade. Commenter.`,
          r`Une personne a un test négatif. Calculer la probabilité qu'elle soit saine (arrondir à $10^{-4}$).`,
          r`On fait passer le test à 10 000 personnes. Compléter un tableau croisé d'effectifs (théoriques) et retrouver le résultat de la question 3.`,
        ),
      ],
      hints: [r`$P_{\overline{M}}(T) = 1 - 0{,}98 = 0{,}02$.`, r`Question 3 : on cherche $P_T(M) = \dfrac{P(M \cap T)}{P(T)}$.`],
      solution: [
        p(r`1. $P(M) = 0{,}01$, $P_M(T) = 0{,}99$, $P_{\overline{M}}(\overline{T}) = 0{,}98$. On complète : $P(\overline{M}) = 0{,}99$, $P_M(\overline{T}) = 0{,}01$, $P_{\overline{M}}(T) = 0{,}02$.`),
        {
          type: 'svg',
          svg: treeSvg([
            {
              label: 'M',
              p: '0,01',
              children: [
                { label: 'T', p: '0,99', leaf: '0,0099' },
                { label: 'T', neg: true, p: '0,01', leaf: '0,0001' },
              ],
            },
            {
              label: 'M',
              neg: true,
              p: '0,99',
              children: [
                { label: 'T', p: '0,02', leaf: '0,0198' },
                { label: 'T', neg: true, p: '0,98', leaf: '0,9702' },
              ],
            },
          ]),
          maxWidth: 560,
        },
        p(r`2. Formule des probabilités totales avec la partition $(M, \overline{M})$ : $P(T) = 0{,}01 \times 0{,}99 + 0{,}99 \times 0{,}02 = 0{,}0099 + 0{,}0198 = 0{,}0297$.`),
        p(r`3. $P_T(M) = \dfrac{P(M \cap T)}{P(T)} = \dfrac{0{,}0099}{0{,}0297} = \dfrac{1}{3} \approx 0{,}333$.`),
        p(r`**Commentaire** : malgré un test très fiable (99 % et 98 %), seule **une personne testée positive sur trois** est réellement malade. Comme la maladie est rare, les faux positifs ($0{,}0198$) sont deux fois plus nombreux que les vrais positifs ($0{,}0099$). En pratique, on confirme par un second test.`),
        p(r`4. $P(\overline{T}) = 1 - 0{,}0297 = 0{,}9703$ et $P_{\overline{T}}(\overline{M}) = \dfrac{0{,}9702}{0{,}9703} \approx 0{,}9999$ : un test négatif est très rassurant.`),
        {
          type: 'table',
          headers: ['', r`$T$`, r`$\overline{T}$`, 'Total'],
          rows: [
            [r`$M$`, '99', '1', '100'],
            [r`$\overline{M}$`, '198', '9 702', '9 900'],
            ['Total', '297', '9 703', '10 000'],
          ],
        },
        p(r`5. Parmi les 297 tests positifs, 99 correspondent à des malades : $\dfrac{99}{297} = \dfrac{1}{3}$. ✓`),
      ],
    },
    {
      id: 'pc-ex7-bac-cantine',
      title: 'Type bac — Internat et cantine',
      difficulty: 3,
      duration: 30,
      tags: ['type bac', 'arbre', 'paramètre', 'indépendance'],
      statement: [
        p(r`Dans un lycée, 30 % des élèves sont internes. Parmi les internes, 80 % déjeunent à la cantine le samedi midi. Parmi les externes, une proportion $x$ (avec $0 \le x \le 1$) déjeune à la cantine le samedi midi. On choisit un élève au hasard et on note $I$ : « l'élève est interne » et $C$ : « l'élève déjeune à la cantine le samedi midi ».`),
        ol(
          r`Construire un arbre pondéré décrivant la situation (en fonction de $x$).`,
          r`Calculer $P(I \cap C)$.`,
          r`Montrer que $P(C) = 0{,}24 + 0{,}7x$.`,
          r`Une enquête indique que 59 % des élèves déjeunent à la cantine le samedi midi. Déterminer $x$.`,
          r`On prend désormais $x = 0{,}5$. Un élève déjeune à la cantine le samedi : quelle est la probabilité qu'il soit interne ? (arrondir à $10^{-3}$)`,
          r`Les événements $I$ et $C$ sont-ils indépendants ?`,
          r`On choisit au hasard deux élèves ; on admet que les deux choix sont indépendants. Calculer la probabilité qu'exactement un des deux déjeune à la cantine le samedi midi.`,
        ),
      ],
      hints: [
        r`Les branches « externe » portent $1 - 0{,}3 = 0{,}7$, puis $x$ et $1 - x$.`,
        r`Question 4 : résoudre $0{,}24 + 0{,}7x = 0{,}59$.`,
        r`Question 7 : deux chemins, $(C ; \overline{C})$ et $(\overline{C} ; C)$.`,
      ],
      solution: [
        p(r`1. $P(I) = 0{,}3$, $P(\overline{I}) = 0{,}7$, $P_I(C) = 0{,}8$, $P_I(\overline{C}) = 0{,}2$, $P_{\overline{I}}(C) = x$, $P_{\overline{I}}(\overline{C}) = 1 - x$.`),
        {
          type: 'svg',
          svg: treeSvg([
            {
              label: 'I',
              p: '0,3',
              children: [
                { label: 'C', p: '0,8', leaf: '0,24' },
                { label: 'C', neg: true, p: '0,2', leaf: '0,06' },
              ],
            },
            {
              label: 'I',
              neg: true,
              p: '0,7',
              children: [
                { label: 'C', p: 'x', leaf: '0,7x' },
                { label: 'C', neg: true, p: '1 − x', leaf: '0,7(1 − x)' },
              ],
            },
          ]),
          maxWidth: 560,
        },
        p(r`2. $P(I \cap C) = P(I) \times P_I(C) = 0{,}3 \times 0{,}8 = 0{,}24$.`),
        p(r`3. $(I, \overline{I})$ forme une partition de l'univers. D'après la formule des probabilités totales : $P(C) = P(I \cap C) + P(\overline{I} \cap C) = 0{,}24 + 0{,}7x$.`),
        p(r`4. $0{,}24 + 0{,}7x = 0{,}59 \iff 0{,}7x = 0{,}35 \iff x = 0{,}5$. La moitié des externes déjeunent à la cantine le samedi.`),
        p(r`5. $P_C(I) = \dfrac{P(I \cap C)}{P(C)} = \dfrac{0{,}24}{0{,}59} = \dfrac{24}{59} \approx 0{,}407$.`),
        p(r`6. $P(I) \times P(C) = 0{,}3 \times 0{,}59 = 0{,}177 \neq 0{,}24 = P(I \cap C)$ : $I$ et $C$ **ne sont pas indépendants**. (Autre argument : $P_I(C) = 0{,}8 \neq P(C) = 0{,}59$.)`),
        p(r`7. Les deux choix étant indépendants, la probabilité du chemin $(C ; \overline{C})$ est $0{,}59 \times 0{,}41$, de même pour $(\overline{C} ; C)$. Donc $P = 2 \times 0{,}59 \times 0{,}41 = 0{,}4838$.`),
      ],
    },
    {
      id: 'pc-ex8-python',
      title: 'Simulation Python : deux urnes',
      difficulty: 2,
      duration: 20,
      tags: ['Python', 'simulation', 'fréquence conditionnelle'],
      statement: [
        p(r`On lance un dé équilibré. Si l'on obtient 1 ou 2, on tire une boule dans l'urne $U_1$ qui contient 2 boules rouges et 3 blanches ; sinon on tire dans l'urne $U_2$ qui contient 1 boule rouge et 4 blanches. On note $A$ : « on obtient 1 ou 2 » et $R$ : « la boule tirée est rouge ».`),
        ol(
          r`Calculer $P(R)$ puis $P_R(A)$.`,
          'Compléter la fonction Python suivante pour qu’elle simule l’expérience et renvoie le couple de booléens `(a, rouge)`.',
          'Écrire une fonction `frequence(n)` qui simule $n$ expériences et renvoie' + r` la fréquence de $A$ **parmi** les expériences où la boule est rouge. Quelle valeur doit-on observer pour $n$ grand ?`,
        ),
        py(r`
from random import randint, random

def experience():
    de = randint(1, 6)
    a = ...
    if a:
        rouge = ...
    else:
        rouge = ...
    return a, rouge
`),
      ],
      hints: [r`$P(A) = \dfrac{1}{3}$, $P_A(R) = \dfrac{2}{5}$, $P_{\overline{A}}(R) = \dfrac{1}{5}$.`, '`random() < 0.4` est vrai avec une probabilité 0,4.'],
      solution: [
        p(r`1. $P(R) = \dfrac{1}{3} \times \dfrac{2}{5} + \dfrac{2}{3} \times \dfrac{1}{5} = \dfrac{2}{15} + \dfrac{2}{15} = \dfrac{4}{15} \approx 0{,}267$.`),
        p(r`$P_R(A) = \dfrac{P(A \cap R)}{P(R)} = \dfrac{2/15}{4/15} = \dfrac{1}{2}$.`),
        p('2. et 3. Une solution possible :'),
        py(r`
from random import randint, random

def experience():
    de = randint(1, 6)
    a = de <= 2
    if a:
        rouge = random() < 2/5
    else:
        rouge = random() < 1/5
    return a, rouge

def frequence(n):
    nb_rouge = 0
    nb_a_et_rouge = 0
    for _ in range(n):
        a, rouge = experience()
        if rouge:
            nb_rouge += 1
            if a:
                nb_a_et_rouge += 1
    return nb_a_et_rouge / nb_rouge
`),
        p('On divise par `nb_rouge` (nombre' + r` d'expériences où la condition $R$ est réalisée) et non par $n$. Pour $n$ grand (par exemple $n = 100\,000$), la fréquence obtenue est proche de $P_R(A) = 0{,}5$.`),
        p(r`Remarque : si on divisait par $n$, on estimerait $P(A \cap R) = \dfrac{2}{15} \approx 0{,}133$.`),
      ],
    },
    {
      id: 'pc-ex9-demo',
      title: 'Démonstrations autour de l’indépendance',
      difficulty: 3,
      duration: 20,
      tags: ['démonstration', 'indépendance'],
      statement: [
        p(r`Soit $A$ et $B$ deux événements tels que $0 < P(A) < 1$.`),
        ol(
          r`Démontrer que si $A$ et $B$ sont indépendants, alors $A$ et $\overline{B}$ sont indépendants.`,
          r`Démontrer que $A$ et $B$ sont indépendants si et seulement si $P_A(B) = P_{\overline{A}}(B)$.`,
          r`Application : on lance deux fois un dé équilibré. $A$ : « le premier lancer donne 6 », $S$ : « la somme des deux lancers vaut 7 ». Montrer que $A$ et $S$ sont indépendants.`,
        ),
      ],
      hints: [
        r`$P(A) = P(A \cap B) + P(A \cap \overline{B})$.`,
        r`Poser $p = P_A(B)$, $q = P_{\overline{A}}(B)$ et écrire $P(B)$ avec les probabilités totales.`,
        r`Il y a 36 couples équiprobables ; lister ceux de somme 7.`,
      ],
      solution: [
        p(r`1. $A = (A \cap B) \cup (A \cap \overline{B})$, union disjointe, donc $P(A \cap \overline{B}) = P(A) - P(A \cap B) = P(A) - P(A)P(B) = P(A)\big(1 - P(B)\big) = P(A)P(\overline{B})$. Donc $A$ et $\overline{B}$ sont indépendants.`),
        p(r`2. Posons $p = P_A(B)$ et $q = P_{\overline{A}}(B)$, $a = P(A)$. Par les probabilités totales, $P(B) = ap + (1-a)q$.`),
        p(r`Comme $P(A) \neq 0$, $A$ et $B$ indépendants $\iff P(B) = p \iff ap + (1 - a)q = p \iff (1 - a)q = (1 - a)p \iff q = p$ (car $1 - a \neq 0$).`),
        p(r`3. Les 36 couples sont équiprobables. $S = \{(1;6), (2;5), (3;4), (4;3), (5;2), (6;1)\}$ donc $P(S) = \dfrac{6}{36} = \dfrac{1}{6}$. $P(A) = \dfrac{6}{36} = \dfrac{1}{6}$. $A \cap S = \{(6;1)\}$ donc $P(A \cap S) = \dfrac{1}{36}$.`),
        p(r`Or $P(A) \times P(S) = \dfrac{1}{6} \times \dfrac{1}{6} = \dfrac{1}{36} = P(A \cap S)$ : $A$ et $S$ sont indépendants. (Quel que soit le premier résultat, il existe exactement une valeur du second qui donne 7.)`),
      ],
    },
    {
      id: 'pc-ex10-bac-partition',
      title: 'Type bac — Trois fournisseurs et contrôle qualité',
      difficulty: 3,
      duration: 30,
      tags: ['type bac', 'partition', 'épreuves indépendantes'],
      statement: [
        p(r`Un magasin de vélos s'approvisionne en batteries auprès de trois fournisseurs : 50 % chez $F_1$, 30 % chez $F_2$ et le reste chez $F_3$. Une batterie de $F_1$ est défectueuse avec la probabilité $0{,}02$, de $F_2$ avec la probabilité $0{,}04$ et de $F_3$ avec la probabilité $0{,}05$. On choisit une batterie au hasard dans le stock ; $D$ : « la batterie est défectueuse ».`),
        ol(
          'Construire un arbre pondéré.',
          r`Justifier que $P(D) = 0{,}032$.`,
          r`Le gérant affirme : « une batterie défectueuse sur trois vient de $F_3$ ». A-t-il raison ?`,
          r`Le magasin vend trois batteries. Le stock est assez grand pour assimiler ces choix à des tirages indépendants. Calculer la probabilité qu'aucune ne soit défectueuse, puis qu'au moins une le soit (arrondir à $10^{-3}$).`,
          r`Combien de batteries doit-on vendre au minimum pour que la probabilité qu'au moins une soit défectueuse dépasse $0{,}5$ ?`,
        ),
      ],
      hints: [r`$P(F_3) = 1 - 0{,}5 - 0{,}3 = 0{,}2$.`, r`« Au moins une » : passer par l'événement contraire « aucune ».`, r`Chercher le plus petit entier $n$ tel que $0{,}968^n < 0{,}5$ (calculatrice ou boucle).`],
      solution: [
        p(r`1. $P(F_3) = 0{,}2$. L'arbre a trois branches au premier niveau ($0{,}5$ ; $0{,}3$ ; $0{,}2$), puis $D$ / $\overline{D}$ avec $0{,}02/0{,}98$, $0{,}04/0{,}96$, $0{,}05/0{,}95$.`),
        { type: 'svg', svg: partitionTree, maxWidth: 640 },
        p(r`2. $F_1, F_2, F_3$ forment une partition de l'univers ; formule des probabilités totales : $P(D) = 0{,}5 \times 0{,}02 + 0{,}3 \times 0{,}04 + 0{,}2 \times 0{,}05 = 0{,}010 + 0{,}012 + 0{,}010 = 0{,}032$.`),
        p(r`3. $P_D(F_3) = \dfrac{P(F_3 \cap D)}{P(D)} = \dfrac{0{,}010}{0{,}032} = 0{,}3125$. C'est un peu moins d'un tiers ($\approx 0{,}333$) : l'affirmation est approximativement juste mais pas exacte (31,25 %).`),
        p(r`4. Par indépendance, $P(\text{aucune défectueuse}) = 0{,}968^3 \approx 0{,}907$ (exactement $0{,}907\,039\,232$). Donc $P(\text{au moins une}) = 1 - 0{,}968^3 \approx 0{,}093$.`),
        p(r`5. On cherche le plus petit $n$ tel que $1 - 0{,}968^n > 0{,}5$, c'est-à-dire $0{,}968^n < 0{,}5$. À la calculatrice : $0{,}968^{21} \approx 0{,}505$ et $0{,}968^{22} \approx 0{,}489$. Il faut vendre au moins **22 batteries**.`),
        py(r`
n = 0
while 0.968 ** n >= 0.5:
    n = n + 1
print(n)   # affiche 22
`),
      ],
    },
  ],

  // =====================================================================
  // REPRÉSENTATIONS
  // =====================================================================
  representations: [
    {
      type: 'widget',
      id: 'probability-tree',
      props: { pA: 0.3, pBsachantA: 0.8, pBsachantNonA: 0.4 },
      title: 'Arbre pondéré interactif',
      caption: 'Réglez P(A), P_A(B) et P_Ā(B) : l’arbre, le tableau croisé, P(B) (probabilités totales) et P_B(A) (inversion) se mettent à jour.',
    },
    {
      type: 'widget',
      id: 'probability-tree',
      props: { pA: 0.01, pBsachantA: 0.99, pBsachantNonA: 0.02 },
      title: 'Le paradoxe des faux positifs',
      caption: 'Maladie rare (1 %), test sensible à 99 % et spécifique à 98 % : P_B(A) ne vaut qu’un tiers. Augmentez la prévalence pour voir l’effet.',
    },
    { type: 'svg', svg: exampleTree, caption: 'Lecture d’un arbre : produit le long d’un chemin, somme des chemins pour un événement.', maxWidth: 640 },
    { type: 'svg', svg: partitionSquare, caption: 'Formule des probabilités totales vue comme un découpage d’aires.', maxWidth: 600 },
    {
      type: 'qcm',
      questions: [
        {
          question: r`« 40 % des clients qui achètent un ordinateur prennent une extension de garantie. » Avec $O$ et $G$ évidents, cela se traduit par :`,
          choices: [r`$P(O \cap G) = 0{,}4$`, r`$P_O(G) = 0{,}4$`, r`$P_G(O) = 0{,}4$`, r`$P(G) = 0{,}4$`],
          answer: 1,
          explanation: '« Parmi les clients qui achètent un ordinateur » : la condition est $O$.',
        },
        {
          question: r`$P(A) = 0{,}5$ et $P(A \cap B) = 0{,}2$. Alors $P_A(B)$ vaut :`,
          choices: ['$0{,}1$', '$0{,}25$', '$0{,}4$', '$0{,}7$'],
          answer: 2,
          explanation: r`$P_A(B) = \dfrac{0{,}2}{0{,}5} = 0{,}4$.`,
        },
        {
          question: r`Sur un arbre, $P(A) = 0{,}2$, $P_A(B) = 0{,}5$, $P_{\overline{A}}(B) = 0{,}25$. Alors $P(B) =$`,
          choices: ['$0{,}75$', '$0{,}3$', '$0{,}1$', '$0{,}375$'],
          answer: 1,
          explanation: r`$0{,}2 \times 0{,}5 + 0{,}8 \times 0{,}25 = 0{,}1 + 0{,}2 = 0{,}3$.`,
        },
        {
          question: r`Avec les données précédentes, $P_B(A) =$`,
          choices: ['$0{,}5$', r`$\dfrac{1}{3}$`, '$0{,}1$', '$0{,}2$'],
          answer: 1,
          explanation: r`$P_B(A) = \dfrac{0{,}1}{0{,}3} = \dfrac{1}{3}$.`,
        },
        {
          question: r`$A$ et $B$ sont indépendants, $P(A) = 0{,}4$, $P(B) = 0{,}5$. Alors $P(A \cup B) =$`,
          choices: ['$0{,}9$', '$0{,}2$', '$0{,}7$', '$0{,}6$'],
          answer: 2,
          explanation: r`$P(A \cap B) = 0{,}2$ donc $P(A \cup B) = 0{,}4 + 0{,}5 - 0{,}2 = 0{,}7$.`,
        },
        {
          question: r`Deux événements incompatibles de probabilités non nulles sont :`,
          choices: ['toujours indépendants', 'jamais indépendants', 'indépendants une fois sur deux', 'on ne peut pas savoir'],
          answer: 1,
          explanation: r`$P(A \cap B) = 0$ alors que $P(A)P(B) > 0$.`,
        },
        {
          question: r`On lance trois fois une pièce équilibrée. La probabilité d'obtenir au moins une fois Pile est :`,
          choices: [r`$\dfrac{1}{8}$`, r`$\dfrac{3}{8}$`, r`$\dfrac{1}{2}$`, r`$\dfrac{7}{8}$`],
          answer: 3,
          explanation: r`$1 - \left(\dfrac{1}{2}\right)^3 = \dfrac{7}{8}$.`,
        },
        {
          question: r`Si $P(A) \ne 0$, l'égalité $P_A(\overline{B}) = 1 - P_A(B)$ est :`,
          choices: ['toujours vraie', 'vraie seulement si A et B sont indépendants', 'toujours fausse', 'vraie seulement si A et B sont incompatibles'],
          answer: 0,
          explanation: r`$P_A$ est une probabilité : la règle du complément s'applique.`,
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: r`Définition de $P_A(B)$`, back: r`Si $P(A) \neq 0$ : $P_A(B) = \dfrac{P(A \cap B)}{P(A)}$.` },
        { front: 'Formule du produit', back: r`$P(A \cap B) = P(A) \times P_A(B)$.` },
        { front: r`$P_A(\overline{B})$ ?`, back: r`$1 - P_A(B)$.` },
        { front: 'Règle des nœuds', back: 'La somme des probabilités des branches issues d’un même nœud vaut 1.' },
        { front: 'Probabilité d’un chemin', back: 'Produit des probabilités des branches du chemin.' },
        { front: 'Partition de Ω', back: 'Événements non vides, deux à deux incompatibles, dont la réunion est Ω.' },
        { front: 'Formule des probabilités totales (2 cas)', back: r`$P(B) = P(A)P_A(B) + P(\overline{A})P_{\overline{A}}(B)$.` },
        { front: r`Calculer $P_B(A)$ à partir d'un arbre de premier niveau $A$`, back: r`$P_B(A) = \dfrac{P(A)P_A(B)}{P(B)}$ avec $P(B)$ par probabilités totales.` },
        { front: 'Indépendance de A et B', back: r`$P(A \cap B) = P(A) \times P(B)$ ; si $P(A) \neq 0$, équivaut à $P_A(B) = P(B)$.` },
        { front: r`$A$, $B$ indépendants ⇒ ?`, back: r`$\overline{A}$ et $B$, $A$ et $\overline{B}$, $\overline{A}$ et $\overline{B}$ sont indépendants.` },
        { front: 'Sensibilité d’un test', back: r`$P_M(T)$ : probabilité d'un test positif chez un malade.` },
        { front: 'Spécificité d’un test', back: r`$P_{\overline{M}}(\overline{T})$ : probabilité d'un test négatif chez une personne saine.` },
        { front: 'Deux épreuves indépendantes', back: r`$P\big((x;y)\big) = P(x) \times P(y)$ ; mêmes pondérations au 2ᵉ niveau de l'arbre.` },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: r`$P_A(B) = P_B(A)$ pour tous événements $A$, $B$ de probabilités non nulles.`, answer: false, explanation: r`Faux en général : $P_A(B) = \dfrac{P(A \cap B)}{P(A)}$ et $P_B(A) = \dfrac{P(A \cap B)}{P(B)}$ ; égalité seulement si $P(A) = P(B)$ (ou $P(A \cap B) = 0$).` },
        { text: r`$P(A \cap B) \le P_A(B)$ lorsque $P(A) \neq 0$.`, answer: true, explanation: r`$P(A \cap B) = P(A) \times P_A(B)$ avec $P(A) \le 1$.` },
        { text: 'Deux tirages successifs sans remise dans une urne sont indépendants.', answer: false, explanation: 'La composition de l’urne change après le premier tirage.' },
        { text: r`Si $A$ et $B$ sont indépendants, alors $\overline{A}$ et $\overline{B}$ le sont aussi.`, answer: true, explanation: 'Propriété du cours (appliquée deux fois).' },
        { text: r`Un test sensible à 99 % donne, quand il est positif, 99 % de chances d'être malade.`, answer: false, explanation: r`On confond $P_M(T)$ et $P_T(M)$ ; ce dernier dépend fortement de la prévalence.` },
        { text: r`Si $P_A(B) = P_{\overline{A}}(B)$ (avec $0 < P(A) < 1$), alors $A$ et $B$ sont indépendants.`, answer: true, explanation: r`Alors $P(B) = P(A)p + (1-P(A))p = p = P_A(B)$.` },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter le raisonnement',
      text: r`On a $P(A) = 0{,}3$, $P_A(B) = 0{,}8$ et $P_{\overline{A}}(B) = 0{,}4$. Par la règle des nœuds, $P(\overline{A}) =$ {{0,7|0.7}}. La probabilité du chemin $A \cap B$ vaut $0{,}3 \times 0{,}8 =$ {{0,24|0.24}}. D'après la formule des probabilités {{totales}}, $P(B) = 0{,}24 + 0{,}28 =$ {{0,52|0.52}}. Enfin $P_B(A) = 0{,}24 / 0{,}52 \approx$ {{0,46|0.46|0,462|0.462}}.`,
    },
    {
      type: 'matching',
      title: 'Associer chaque phrase à sa traduction',
      pairs: [
        { left: '20 % des élèves sont internes', right: r`$P(I) = 0{,}2$` },
        { left: 'Parmi les internes, 70 % mangent à la cantine', right: r`$P_I(C) = 0{,}7$` },
        { left: '14 % des élèves sont internes et mangent à la cantine', right: r`$P(I \cap C) = 0{,}14$` },
        { left: 'Parmi les élèves qui mangent à la cantine, 35 % sont internes', right: r`$P_C(I) = 0{,}35$` },
        { left: 'Être interne ne change pas la probabilité de manger à la cantine', right: r`$P_I(C) = P(C)$` },
      ],
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre la méthode d’inversion du conditionnement',
      items: [
        'Nommer les événements et traduire l’énoncé',
        'Construire et compléter l’arbre pondéré',
        r`Calculer $P(A \cap B) = P(A) \times P_A(B)$`,
        r`Calculer $P(B)$ par la formule des probabilités totales`,
        r`Diviser : $P_B(A) = P(A \cap B) / P(B)$`,
        'Interpréter le résultat en contexte',
      ],
    },
  ],
}

export default chapter
