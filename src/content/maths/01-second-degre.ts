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

function curve(F: Frame, f: (x: number) => number, a: number, b: number, n = 80): string {
  const pts: string[] = []
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n
    pts.push(`${X(F, x)},${Y(F, f(x))}`)
  }
  return 'M' + pts.join(' L')
}

function axes(F: Frame, xt: number[], yt: number[], xl = 'x', yl = 'y', labels = true): string {
  let s = ''
  for (const t of xt) s += `<line x1="${X(F, t)}" y1="${F.T}" x2="${X(F, t)}" y2="${F.T + F.H}" stroke="currentColor" opacity="0.1"/>`
  for (const t of yt) s += `<line x1="${F.L}" y1="${Y(F, t)}" x2="${F.L + F.W}" y2="${Y(F, t)}" stroke="currentColor" opacity="0.1"/>`
  const ox = X(F, 0)
  const oy = Y(F, 0)
  s += `<line x1="${F.L}" y1="${oy}" x2="${F.L + F.W}" y2="${oy}" stroke="currentColor" stroke-width="1.2"/>`
  s += `<line x1="${ox}" y1="${F.T + F.H}" x2="${ox}" y2="${F.T}" stroke="currentColor" stroke-width="1.2"/>`
  s += `<text x="${F.L + F.W - 4}" y="${oy - 6}" text-anchor="end" fill="currentColor" font-style="italic">${xl}</text>`
  s += `<text x="${ox + 6}" y="${F.T + 12}" fill="currentColor" font-style="italic">${yl}</text>`
  if (labels) {
    for (const t of xt) if (t !== 0) s += `<text x="${X(F, t)}" y="${oy + 14}" text-anchor="middle" fill="currentColor" opacity="0.75" font-size="11">${String(t).replace('-', '−')}</text>`
    for (const t of yt) if (t !== 0) s += `<text x="${ox - 5}" y="${Y(F, t) + 4}" text-anchor="end" fill="currentColor" opacity="0.75" font-size="11">${String(t).replace('-', '−')}</text>`
    s += `<text x="${ox - 5}" y="${oy + 14}" text-anchor="end" fill="currentColor" opacity="0.75" font-size="11">0</text>`
  }
  return s
}

function clip(id: string, F: Frame): string {
  return `<clipPath id="${id}"><rect x="${F.L}" y="${F.T}" width="${F.W}" height="${F.H}"/></clipPath>`
}

// ---------------------------------------------------------------------------
// Schéma 1 : parabole de f(x) = x² − 2x − 3, sommet, axe, racines
// ---------------------------------------------------------------------------
const F1: Frame = { x0: -2.5, x1: 4.5, y0: -5, y1: 7, L: 30, T: 20, W: 420, H: 280 }
const svgParabole = `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
<defs>${clip('m1-c1', F1)}</defs>
${axes(F1, [-2, -1, 1, 2, 3, 4], [-4, -2, 2, 4, 6])}
<line x1="${X(F1, 1)}" y1="${F1.T}" x2="${X(F1, 1)}" y2="${F1.T + F1.H}" stroke="${VIOLET}" stroke-dasharray="6 4" stroke-width="1.5"/>
<g clip-path="url(#m1-c1)"><path d="${curve(F1, (x) => x * x - 2 * x - 3, -2.5, 4.5)}" fill="none" stroke="${BLUE}" stroke-width="2.5"/></g>
<circle cx="${X(F1, 1)}" cy="${Y(F1, -4)}" r="5" fill="${RED}"/>
<circle cx="${X(F1, -1)}" cy="${Y(F1, 0)}" r="5" fill="${GREEN}"/>
<circle cx="${X(F1, 3)}" cy="${Y(F1, 0)}" r="5" fill="${GREEN}"/>
<circle cx="${X(F1, 0)}" cy="${Y(F1, -3)}" r="4" fill="${ORANGE}"/>
<circle cx="${X(F1, 2)}" cy="${Y(F1, -3)}" r="4" fill="${ORANGE}"/>
<line x1="${X(F1, 0)}" y1="${Y(F1, -3)}" x2="${X(F1, 2)}" y2="${Y(F1, -3)}" stroke="${ORANGE}" stroke-dasharray="3 3"/>
<text x="${X(F1, 1) + 10}" y="${Y(F1, -4) + 4}" fill="${RED}">S(1 ; −4)</text>
<g fill="currentColor">
<text x="470" y="40" font-weight="600">f(x) = x² − 2x − 3</text>
<text x="470" y="66">a = 1 &gt; 0 : parabole</text>
<text x="470" y="82">tournée vers le haut</text>
<text x="470" y="108" fill="${RED}">Sommet S(α ; β)</text>
<text x="470" y="124">α = −b/(2a) = 1</text>
<text x="470" y="140">β = f(1) = −4 (minimum)</text>
<text x="470" y="166" fill="${VIOLET}">Axe de symétrie : x = 1</text>
<text x="470" y="192" fill="${GREEN}">Racines : −1 et 3</text>
<text x="470" y="208">(Δ = 16 &gt; 0)</text>
<text x="470" y="234" fill="${ORANGE}">f(0) = f(2) = −3 :</text>
<text x="470" y="250">points symétriques</text>
<text x="470" y="274">Forme canonique :</text>
<text x="470" y="290">f(x) = (x − 1)² − 4</text>
</g>
</svg>`

// ---------------------------------------------------------------------------
// Schéma 2 : les six configurations (signe de a, signe de Δ)
// ---------------------------------------------------------------------------
function mini(id: string, ox: number, oy: number, f: (x: number) => number, title: string, color: string, roots: number[]): string {
  const F: Frame = { x0: -3, x1: 3, y0: -3, y1: 3, L: ox, T: oy, W: 180, H: 110 }
  let s = `<defs>${clip(id, F)}</defs>`
  s += `<rect x="${F.L}" y="${F.T}" width="${F.W}" height="${F.H}" fill="none" stroke="currentColor" opacity="0.3"/>`
  s += `<line x1="${F.L}" y1="${Y(F, 0)}" x2="${F.L + F.W}" y2="${Y(F, 0)}" stroke="currentColor"/>`
  s += `<g clip-path="url(#${id})"><path d="${curve(F, f, -3, 3, 40)}" fill="none" stroke="${color}" stroke-width="2.2"/></g>`
  for (const x of roots) s += `<circle cx="${X(F, x)}" cy="${Y(F, 0)}" r="3.5" fill="${GREEN}"/>`
  s += `<text x="${F.L + F.W / 2}" y="${F.T + F.H + 16}" text-anchor="middle" fill="currentColor">${title}</text>`
  return s
}
const svgSixCas = `<svg viewBox="0 0 640 330" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
<text x="20" y="22" fill="currentColor" font-weight="600">a &gt; 0</text>
<text x="20" y="182" fill="currentColor" font-weight="600">a &lt; 0</text>
${mini('m1-s1', 20, 30, (x) => 0.5 * x * x - 2, 'Δ &gt; 0 : deux racines', BLUE, [-2, 2])}
${mini('m1-s2', 230, 30, (x) => 0.5 * x * x, 'Δ = 0 : une racine double', BLUE, [0])}
${mini('m1-s3', 440, 30, (x) => 0.5 * x * x + 0.8, 'Δ &lt; 0 : aucune racine', BLUE, [])}
${mini('m1-s4', 20, 190, (x) => -0.5 * x * x + 2, 'Δ &gt; 0 : deux racines', RED, [-2, 2])}
${mini('m1-s5', 230, 190, (x) => -0.5 * x * x, 'Δ = 0 : une racine double', RED, [0])}
${mini('m1-s6', 440, 190, (x) => -0.5 * x * x - 0.8, 'Δ &lt; 0 : aucune racine', RED, [])}
</svg>`

// ---------------------------------------------------------------------------
// Schéma 3 : optimisation — enclos le long d'un mur
// ---------------------------------------------------------------------------
const svgEnclos = `<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
<rect x="60" y="30" width="300" height="10" fill="currentColor" opacity="0.35"/>
<text x="210" y="24" text-anchor="middle" fill="currentColor">mur (pas de grillage)</text>
<path d="M60,40 L60,160 L360,160 L360,40" fill="${GREEN}" fill-opacity="0.12" stroke="${GREEN}" stroke-width="2.5"/>
<text x="48" y="104" text-anchor="end" fill="currentColor" font-style="italic">x</text>
<text x="372" y="104" fill="currentColor" font-style="italic">x</text>
<text x="210" y="180" text-anchor="middle" fill="currentColor" font-style="italic">60 − 2x</text>
<text x="210" y="105" text-anchor="middle" fill="currentColor">Aire A(x) = x(60 − 2x)</text>
<g fill="currentColor">
<text x="420" y="50" font-weight="600">Grillage : 60 m</text>
<text x="420" y="74">x ∈ ]0 ; 30[</text>
<text x="420" y="98">A(x) = −2x² + 60x</text>
<text x="420" y="122">α = −60/(2 × (−2)) = 15</text>
<text x="420" y="146" fill="${RED}">A max = A(15) = 450 m²</text>
<text x="420" y="170">→ enclos 15 m × 30 m</text>
</g>
</svg>`

// ---------------------------------------------------------------------------
const chapter: Chapter = {
  id: 'second-degre',
  subject: 'maths',
  order: 1,
  title: 'Second degré',
  theme: 'Algèbre',
  summary:
    'Fonctions polynômes du second degré : formes développée, canonique et factorisée, discriminant, racines, signe du trinôme, variations, inéquations et optimisation.',
  duration: '4 semaines',
  objectives: [
    'Reconnaître une fonction polynôme du second degré et identifier les coefficients $a$, $b$, $c$.',
    'Passer de la forme développée à la forme canonique, et choisir la forme adaptée à la question posée.',
    'Déterminer les variations et l’extremum d’une fonction polynôme du second degré ; tracer sa parabole (sommet, axe de symétrie).',
    'Calculer le discriminant, déterminer les racines et factoriser un trinôme.',
    'Utiliser la somme et le produit des racines (racine évidente, recherche de deux nombres).',
    'Étudier le signe d’un trinôme et résoudre une inéquation du second degré.',
    'Résoudre une équation bicarrée par changement de variable.',
    'Modéliser une situation et résoudre un problème d’optimisation.',
  ],
  keywords: [
    'trinôme',
    'polynôme du second degré',
    'forme canonique',
    'forme factorisée',
    'discriminant',
    'racine',
    'parabole',
    'sommet',
    'axe de symétrie',
    'signe du trinôme',
    'inéquation',
    'équation bicarrée',
    'optimisation',
  ],

  // =========================================================================
  // FICHE
  // =========================================================================
  fiche: [
    { type: 'h2', text: 'Les trois formes d’un trinôme ($a \\neq 0$)' },
    {
      type: 'table',
      headers: ['Forme', 'Expression', 'Ce qu’elle donne immédiatement'],
      rows: [
        ['Développée', '$f(x) = ax^2 + bx + c$', '$f(0) = c$, coefficients pour $\\Delta$'],
        ['Canonique', '$f(x) = a(x-\\alpha)^2 + \\beta$', 'Sommet $S(\\alpha \\,;\\, \\beta)$, variations, extremum'],
        ['Factorisée', '$f(x) = a(x-x_1)(x-x_2)$', 'Racines, signe (tableau de signes)'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Sommet',
      content: [{ type: 'math', tex: r`\alpha = -\frac{b}{2a} \qquad \beta = f(\alpha) = -\frac{\Delta}{4a}` }],
    },
    { type: 'h2', text: 'Discriminant et racines' },
    { type: 'math', tex: r`\Delta = b^2 - 4ac` },
    {
      type: 'table',
      headers: ['Signe de $\\Delta$', 'Solutions de $ax^2+bx+c=0$', 'Factorisation'],
      rows: [
        ['$\\Delta > 0$', r`$x_1 = \dfrac{-b-\sqrt{\Delta}}{2a}$ et $x_2 = \dfrac{-b+\sqrt{\Delta}}{2a}$`, '$a(x-x_1)(x-x_2)$'],
        ['$\\Delta = 0$', r`$x_0 = -\dfrac{b}{2a}$ (racine double)`, '$a(x-x_0)^2$'],
        ['$\\Delta < 0$', 'Aucune solution réelle', 'Impossible (pas de factorisation)'],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Somme et produit des racines (si $\\Delta \\geq 0$)',
      content: [
        { type: 'math', tex: r`x_1 + x_2 = -\frac{b}{a} \qquad x_1 x_2 = \frac{c}{a}` },
        { type: 'p', text: 'Racine évidente $x_1$ ⇒ l’autre racine vaut $x_2 = \\dfrac{c}{a x_1}$ (si $x_1 \\neq 0$).' },
      ],
    },
    { type: 'h2', text: 'Signe et variations' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Signe du trinôme',
      content: [
        { type: 'p', text: '$ax^2+bx+c$ est **du signe de $a$**, sauf **entre les racines** (quand elles existent) où il est du signe de $-a$.' },
        { type: 'list', items: ['$\\Delta < 0$ : signe de $a$ partout.', '$\\Delta = 0$ : signe de $a$, s’annule en $x_0$.', '$\\Delta > 0$ : signe de $a$ à l’extérieur de $[x_1 \\,;\\, x_2]$, signe de $-a$ à l’intérieur.'] },
      ],
    },
    {
      type: 'table',
      headers: ['', 'Variations', 'Extremum'],
      rows: [
        ['$a > 0$', 'décroissante sur $]-\\infty \\,;\\, \\alpha]$, croissante sur $[\\alpha \\,;\\, +\\infty[$', 'minimum $\\beta$ atteint en $\\alpha$'],
        ['$a < 0$', 'croissante sur $]-\\infty \\,;\\, \\alpha]$, décroissante sur $[\\alpha \\,;\\, +\\infty[$', 'maximum $\\beta$ atteint en $\\alpha$'],
      ],
    },
    { type: 'svg', svg: svgSixCas, caption: 'Les six positions de la parabole selon le signe de $a$ et de $\\Delta$.', maxWidth: 640 },
    { type: 'h2', text: 'Méthodes express' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Inéquation', value: 'Tout passer à gauche ($\\ldots > 0$), calculer $\\Delta$, racines, règle du signe, conclure par un intervalle.' },
        { key: 'Bicarrée', value: '$ax^4+bx^2+c=0$ : poser $X = x^2$ ($X \\geq 0$), résoudre en $X$, puis $x = \\pm\\sqrt{X}$ pour chaque $X \\geq 0$.' },
        { key: 'Optimisation', value: 'Modéliser par $f(x)$, préciser l’intervalle, l’extremum est en $\\alpha = -\\frac{b}{2a}$ (s’il est dans l’intervalle).' },
        { key: 'Deux nombres', value: 'Somme $S$, produit $P$ : ce sont les racines de $x^2 - Sx + P$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Pièges classiques',
      content: [
        {
          type: 'list',
          items: [
            '$\\Delta = b^2 - 4ac$ : attention au signe de $b$ (avec $b=-3$ : $b^2 = 9$, pas $-9$).',
            'On ne divise jamais une inéquation par $x$ (signe inconnu) : on factorise.',
            'Pour $\\Delta < 0$, l’équation n’a pas de solution réelle mais l’inéquation peut avoir $\\mathbb{R}$ comme ensemble solution.',
          ],
        },
      ],
    },
  ],

  // =========================================================================
  // COURS
  // =========================================================================
  cours: [
    { type: 'h2', text: '1. Fonctions polynômes du second degré' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Définition',
      content: [
        {
          type: 'p',
          text: 'On appelle **fonction polynôme du second degré** toute fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = ax^2 + bx + c$, où $a$, $b$, $c$ sont des réels avec $a \\neq 0$. L’expression $ax^2+bx+c$ s’appelle un **trinôme** (du second degré).',
        },
        { type: 'p', text: 'Une **racine** du trinôme est un réel $x$ tel que $ax^2+bx+c = 0$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples et contre-exemples',
      content: [
        {
          type: 'list',
          items: [
            '$f(x) = 3x^2 - 5x + 1$ : $a = 3$, $b = -5$, $c = 1$.',
            '$g(x) = -x^2 + 4$ : $a = -1$, $b = 0$, $c = 4$.',
            '$h(x) = (2x-1)(x+3)$ est du second degré : en développant, $h(x) = 2x^2 + 5x - 3$.',
            '$k(x) = (x+1)^2 - x^2 = 2x + 1$ n’est **pas** du second degré (les $x^2$ s’éliminent : fonction affine).',
            '$m(x) = x^3 + x^2$ n’est pas du second degré (degré 3).',
          ],
        },
      ],
    },
    {
      type: 'p',
      text: 'Sa courbe représentative dans un repère est une **parabole**. La fonction carrée $x \\mapsto x^2$ (étudiée en Seconde) est le cas le plus simple : $a = 1$, $b = c = 0$.',
    },

    { type: 'h2', text: '2. Forme canonique' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Théorème (forme canonique)',
      content: [
        { type: 'p', text: 'Tout trinôme $ax^2+bx+c$ ($a \\neq 0$) peut s’écrire de façon unique sous la forme' },
        { type: 'math', tex: r`ax^2+bx+c = a(x-\alpha)^2 + \beta \quad \text{avec} \quad \alpha = -\frac{b}{2a} \ \text{ et } \ \beta = f(\alpha) = -\frac{b^2-4ac}{4a}.` },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [
        { type: 'p', text: 'Comme $a \\neq 0$, on factorise par $a$ les deux premiers termes, puis on reconnaît le début d’une identité remarquable :' },
        {
          type: 'math',
          tex: r`ax^2+bx+c = a\left(x^2 + \frac{b}{a}x\right) + c = a\left[\left(x+\frac{b}{2a}\right)^2 - \frac{b^2}{4a^2}\right] + c`,
        },
        { type: 'p', text: 'car $\\left(x+\\frac{b}{2a}\\right)^2 = x^2 + \\frac{b}{a}x + \\frac{b^2}{4a^2}$. En développant le crochet :' },
        { type: 'math', tex: r`ax^2+bx+c = a\left(x+\frac{b}{2a}\right)^2 - \frac{b^2}{4a} + \frac{4ac}{4a} = a\left(x-\left(-\frac{b}{2a}\right)\right)^2 - \frac{b^2-4ac}{4a}.` },
        { type: 'p', text: 'On a bien $\\alpha = -\\frac{b}{2a}$ et $\\beta = -\\frac{b^2-4ac}{4a}$. En remplaçant $x$ par $\\alpha$ dans la forme canonique, on obtient $f(\\alpha) = \\beta$.' },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Factoriser par $a$', text: 'Écrire $f(x) = a\\left(x^2 + \\frac{b}{a}x\\right) + c$ (si $a = 1$, rien à faire).' },
        { title: 'Compléter le carré', text: '$x^2 + px = \\left(x + \\frac{p}{2}\\right)^2 - \\frac{p^2}{4}$.' },
        { title: 'Développer le crochet et regrouper les constantes', text: 'On obtient $a(x-\\alpha)^2 + \\beta$.' },
        { title: 'Vérifier', text: 'Contrôler que $\\alpha = -\\frac{b}{2a}$ et que $\\beta = f(\\alpha)$ (ou redévelopper).' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé : $f(x) = 2x^2 - 12x + 10$',
      content: [
        { type: 'math', tex: r`f(x) = 2(x^2 - 6x) + 10 = 2\left[(x-3)^2 - 9\right] + 10 = 2(x-3)^2 - 18 + 10 = 2(x-3)^2 - 8.` },
        { type: 'p', text: 'Vérification : $\\alpha = -\\frac{-12}{2 \\times 2} = 3$ et $f(3) = 18 - 36 + 10 = -8$. ✔' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Méthode rapide',
      content: [{ type: 'p', text: 'Dans la pratique, il suffit souvent de calculer $\\alpha = -\\frac{b}{2a}$ puis $\\beta = f(\\alpha)$ : la forme canonique est alors $a(x-\\alpha)^2+\\beta$.' }],
    },

    { type: 'h2', text: '3. Variations, sommet et parabole' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Variations',
      content: [
        { type: 'p', text: 'Soit $f(x) = a(x-\\alpha)^2 + \\beta$.' },
        {
          type: 'list',
          items: [
            'Si $a > 0$ : $f$ est décroissante sur $]-\\infty \\,;\\, \\alpha]$ et croissante sur $[\\alpha \\,;\\, +\\infty[$ ; elle admet un **minimum** égal à $\\beta$, atteint en $x = \\alpha$.',
            'Si $a < 0$ : $f$ est croissante sur $]-\\infty \\,;\\, \\alpha]$ et décroissante sur $[\\alpha \\,;\\, +\\infty[$ ; elle admet un **maximum** égal à $\\beta$, atteint en $x = \\alpha$.',
          ],
        },
      ],
    },
    {
      type: 'reveal',
      title: 'Justification (cas $a > 0$)',
      content: [
        { type: 'p', text: 'Pour tout réel $x$, $(x-\\alpha)^2 \\geq 0$ donc $a(x-\\alpha)^2 \\geq 0$ et $f(x) \\geq \\beta = f(\\alpha)$ : $\\beta$ est le minimum.' },
        {
          type: 'p',
          text: 'Si $\\alpha \\leq u < v$ alors $0 \\leq u - \\alpha < v - \\alpha$ et, la fonction carrée étant croissante sur $[0 \\,;\\, +\\infty[$, $(u-\\alpha)^2 < (v-\\alpha)^2$, d’où $f(u) < f(v)$ : $f$ est croissante sur $[\\alpha \\,;\\, +\\infty[$. Même raisonnement sur $]-\\infty \\,;\\, \\alpha]$ avec la décroissance de la fonction carrée sur $]-\\infty \\,;\\, 0]$.',
        },
      ],
    },
    {
      type: 'table',
      caption: 'Tableau de variations pour $a > 0$ (à gauche) — pour $a < 0$, les flèches sont inversées et $\\beta$ est un maximum.',
      headers: ['$x$', '$-\\infty$', '', '$\\alpha$', '', '$+\\infty$'],
      rows: [['$f(x)$', '', '↘', '$\\beta$ (min)', '↗', '']],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Parabole',
      content: [
        {
          type: 'list',
          items: [
            'La courbe de $f$ est une **parabole** de **sommet** $S(\\alpha \\,;\\, \\beta)$.',
            'Elle admet la droite d’équation $x = \\alpha$ comme **axe de symétrie** : $f(\\alpha - h) = f(\\alpha + h)$ pour tout $h$.',
            'Elle est « tournée vers le haut » si $a > 0$, « vers le bas » si $a < 0$ ; plus $|a|$ est grand, plus elle est « resserrée ».',
            'Elle coupe l’axe des ordonnées au point $(0 \\,;\\, c)$.',
          ],
        },
      ],
    },
    { type: 'svg', svg: svgParabole, caption: 'Parabole de $f(x) = x^2 - 2x - 3 = (x-1)^2 - 4$ : sommet, axe de symétrie, racines.', maxWidth: 640 },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Astuce : symétrie',
      content: [
        { type: 'p', text: 'Si deux réels $x_1$ et $x_2$ ont la même image, alors $\\alpha = \\frac{x_1 + x_2}{2}$. En particulier, l’abscisse du sommet est la **moyenne des racines** quand elles existent. Ci-dessus : $\\frac{-1 + 3}{2} = 1$.' },
      ],
    },

    { type: 'h2', text: '4. Discriminant et équation $ax^2+bx+c = 0$' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Discriminant',
      content: [{ type: 'p', text: 'Le **discriminant** du trinôme $ax^2+bx+c$ est le réel $\\Delta = b^2 - 4ac$.' }],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Théorème (résolution de $ax^2+bx+c=0$)',
      content: [
        {
          type: 'list',
          items: [
            r`Si $\Delta > 0$ : deux solutions distinctes $x_1 = \dfrac{-b-\sqrt{\Delta}}{2a}$ et $x_2 = \dfrac{-b+\sqrt{\Delta}}{2a}$.`,
            r`Si $\Delta = 0$ : une seule solution (racine double) $x_0 = -\dfrac{b}{2a}$.`,
            'Si $\\Delta < 0$ : aucune solution réelle.',
          ],
        },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration (à partir de la forme canonique)',
      content: [
        { type: 'p', text: 'D’après la forme canonique, avec $a \\neq 0$ :' },
        { type: 'math', tex: r`ax^2+bx+c = 0 \iff a\left[\left(x+\frac{b}{2a}\right)^2 - \frac{\Delta}{4a^2}\right] = 0 \iff \left(x+\frac{b}{2a}\right)^2 = \frac{\Delta}{4a^2}.` },
        {
          type: 'list',
          items: [
            'Si $\\Delta < 0$ : le membre de droite est strictement négatif, or un carré est positif : pas de solution.',
            'Si $\\Delta = 0$ : $\\left(x+\\frac{b}{2a}\\right)^2 = 0 \\iff x = -\\frac{b}{2a}$.',
            r`Si $\Delta > 0$ : $\frac{\Delta}{4a^2} = \left(\frac{\sqrt{\Delta}}{2a}\right)^2$, donc $x + \frac{b}{2a} = \frac{\sqrt{\Delta}}{2a}$ ou $x + \frac{b}{2a} = -\frac{\sqrt{\Delta}}{2a}$, ce qui donne $x_2$ et $x_1$.`,
          ],
        },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Écrire l’équation sous la forme $ax^2+bx+c = 0$', text: 'Tout passer dans le membre de gauche, réduire, identifier $a$, $b$, $c$ avec leurs signes.' },
        { title: 'Chercher un raccourci', text: 'Si $b = 0$ ou $c = 0$, ou si une identité remarquable apparaît, on peut éviter $\\Delta$ (ex. $x^2 - 3x = x(x-3)$).' },
        { title: 'Calculer $\\Delta = b^2 - 4ac$', text: 'Conclure sur le nombre de solutions.' },
        { title: 'Calculer les racines', text: 'Les écrire sous forme exacte (simplifier les radicaux), puis donner l’ensemble des solutions $S$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Trois exemples',
      content: [
        { type: 'p', text: '**a)** $x^2 - 5x + 6 = 0$ : $\\Delta = 25 - 24 = 1 > 0$, $x_1 = \\frac{5-1}{2} = 2$, $x_2 = \\frac{5+1}{2} = 3$. $S = \\{2 \\,;\\, 3\\}$.' },
        { type: 'p', text: '**b)** $4x^2 - 12x + 9 = 0$ : $\\Delta = 144 - 144 = 0$, $x_0 = \\frac{12}{8} = \\frac{3}{2}$. $S = \\left\\{\\frac{3}{2}\\right\\}$ (en effet $4x^2-12x+9 = (2x-3)^2$).' },
        { type: 'p', text: '**c)** $x^2 + x + 1 = 0$ : $\\Delta = 1 - 4 = -3 < 0$. $S = \\varnothing$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Racines irrationnelles : $x^2 - 4x + 1 = 0$',
      content: [
        { type: 'p', text: '$\\Delta = 16 - 4 = 12 > 0$ et $\\sqrt{12} = 2\\sqrt{3}$.' },
        { type: 'math', tex: r`x_1 = \frac{4 - 2\sqrt{3}}{2} = 2 - \sqrt{3} \qquad x_2 = 2 + \sqrt{3}` },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Erreurs fréquentes',
      content: [
        {
          type: 'list',
          items: [
            'Oublier de tout passer d’un côté : pour $x^2 = 3x - 2$, on résout $x^2 - 3x + 2 = 0$.',
            'Se tromper sur $b^2$ quand $b < 0$ : avec $b = -5$, $b^2 = (-5)^2 = 25$.',
            'Écrire $\\frac{-b \\pm \\sqrt{\\Delta}}{2}$ en oubliant le $a$ du dénominateur $2a$.',
          ],
        },
      ],
    },

    { type: 'h2', text: '5. Forme factorisée' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Factorisation',
      content: [
        {
          type: 'list',
          items: [
            'Si $\\Delta > 0$ : $ax^2+bx+c = a(x-x_1)(x-x_2)$.',
            'Si $\\Delta = 0$ : $ax^2+bx+c = a(x-x_0)^2$.',
            'Si $\\Delta < 0$ : le trinôme ne peut pas s’écrire comme produit de facteurs du premier degré.',
          ],
        },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration (cas $\\Delta > 0$)',
      content: [
        { type: 'p', text: 'On part de la forme canonique et on utilise $A^2 - B^2 = (A-B)(A+B)$ :' },
        {
          type: 'math',
          tex: r`a\left[\left(x+\frac{b}{2a}\right)^2 - \left(\frac{\sqrt{\Delta}}{2a}\right)^2\right] = a\left(x + \frac{b}{2a} - \frac{\sqrt{\Delta}}{2a}\right)\left(x + \frac{b}{2a} + \frac{\sqrt{\Delta}}{2a}\right) = a(x-x_2)(x-x_1).`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        { type: 'p', text: '$f(x) = 2x^2 - 12x + 10$ : $\\Delta = 144 - 80 = 64$, $x_1 = \\frac{12 - 8}{4} = 1$, $x_2 = \\frac{12+8}{4} = 5$.' },
        { type: 'p', text: 'Donc $f(x) = 2(x-1)(x-5)$. (Ne pas oublier le facteur $a = 2$ !)' },
      ],
    },
    {
      type: 'table',
      caption: 'Choisir la bonne forme selon la question.',
      headers: ['Question', 'Forme la plus adaptée', 'Exemple avec $f(x) = 2x^2-12x+10$'],
      rows: [
        ['Calculer $f(0)$, dériver, calculer $\\Delta$', 'Développée', '$f(0) = 10$'],
        ['Extremum, variations, résoudre $f(x) = \\beta + k$', 'Canonique $2(x-3)^2 - 8$', 'Minimum $-8$ en $3$'],
        ['Résoudre $f(x) = 0$, signe de $f(x)$', 'Factorisée $2(x-1)(x-5)$', '$f(x) = 0 \\iff x = 1$ ou $x = 5$'],
      ],
    },

    { type: 'h2', text: '6. Somme et produit des racines' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Propriété',
      content: [
        { type: 'p', text: 'Si $\\Delta \\geq 0$ et si $x_1$, $x_2$ sont les racines (éventuellement égales) de $ax^2+bx+c$, alors' },
        { type: 'math', tex: r`S = x_1 + x_2 = -\frac{b}{a} \qquad\qquad P = x_1 x_2 = \frac{c}{a}.` },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [
        { type: 'math', tex: r`x_1 + x_2 = \frac{-b-\sqrt{\Delta} - b + \sqrt{\Delta}}{2a} = \frac{-2b}{2a} = -\frac{b}{a}` },
        { type: 'math', tex: r`x_1 x_2 = \frac{(-b-\sqrt{\Delta})(-b+\sqrt{\Delta})}{4a^2} = \frac{b^2 - \Delta}{4a^2} = \frac{b^2 - b^2 + 4ac}{4a^2} = \frac{c}{a}` },
        { type: 'p', text: 'Autre méthode : en développant $a(x-x_1)(x-x_2) = ax^2 - a(x_1+x_2)x + ax_1x_2$ et en identifiant avec $ax^2+bx+c$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Racine évidente',
      content: [
        { type: 'p', text: 'On teste des valeurs simples ($0$, $1$, $-1$, $2$, $-2$…). Si $x_1$ est racine, l’autre s’obtient sans $\\Delta$ grâce au produit (ou à la somme).' },
        { type: 'p', text: 'Exemple : $2x^2 + 3x - 5$. Pour $x = 1$ : $2 + 3 - 5 = 0$, donc $1$ est racine. Produit : $1 \\times x_2 = \\frac{c}{a} = -\\frac{5}{2}$, donc $x_2 = -\\frac{5}{2}$.' },
        { type: 'p', text: 'Astuce : $1$ est racine $\\iff a + b + c = 0$ ; $-1$ est racine $\\iff a - b + c = 0$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Trouver deux nombres connaissant leur somme $S$ et leur produit $P$',
      content: [
        { type: 'p', text: 'Ce sont les solutions de $x^2 - Sx + P = 0$ (si elles existent).' },
        { type: 'p', text: 'Exemple : somme $10$, produit $21$ : $x^2 - 10x + 21 = 0$, $\\Delta = 100 - 84 = 16$, solutions $\\frac{10 \\pm 4}{2}$ soit $3$ et $7$. ✔ ($3 + 7 = 10$, $3 \\times 7 = 21$)' },
      ],
    },

    { type: 'h2', text: '7. Signe du trinôme' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Théorème',
      content: [
        {
          type: 'list',
          items: [
            'Si $\\Delta < 0$ : pour tout réel $x$, $ax^2+bx+c$ est **du signe de $a$** (jamais nul).',
            'Si $\\Delta = 0$ : $ax^2+bx+c$ est du signe de $a$ et s’annule uniquement en $x_0$.',
            'Si $\\Delta > 0$ (avec $x_1 < x_2$) : $ax^2+bx+c$ est du signe de $a$ à l’extérieur des racines, du signe de $-a$ strictement entre les racines, nul en $x_1$ et $x_2$.',
          ],
        },
      ],
    },
    {
      type: 'reveal',
      title: 'Justification',
      content: [
        { type: 'p', text: 'Si $\\Delta < 0$ : $f(x) = a\\left[\\left(x+\\frac{b}{2a}\\right)^2 + \\frac{-\\Delta}{4a^2}\\right]$ et le crochet est strictement positif (somme d’un carré et d’un nombre $> 0$) : $f(x)$ a le signe de $a$.' },
        { type: 'p', text: 'Si $\\Delta = 0$ : $f(x) = a(x-x_0)^2$ et $(x-x_0)^2 \\geq 0$.' },
        { type: 'p', text: 'Si $\\Delta > 0$ : $f(x) = a(x-x_1)(x-x_2)$ ; un tableau de signes du produit $(x-x_1)(x-x_2)$ montre qu’il est négatif seulement entre $x_1$ et $x_2$.' },
      ],
    },
    {
      type: 'table',
      caption: 'Tableau de signes dans le cas $\\Delta > 0$ et $a > 0$.',
      headers: ['$x$', '$-\\infty$', '', '$x_1$', '', '$x_2$', '', '$+\\infty$'],
      rows: [['$ax^2+bx+c$', '', '$+$', '$0$', '$-$', '$0$', '$+$', '']],
    },
    { type: 'svg', svg: svgSixCas, caption: 'Lecture graphique du signe : la parabole est au-dessus de l’axe des abscisses là où le trinôme est positif.', maxWidth: 640 },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : signe de $f(x) = -x^2 + 2x + 3$',
      content: [
        { type: 'p', text: '$a = -1$, $b = 2$, $c = 3$ ; $\\Delta = 4 + 12 = 16$ ; $x_1 = \\frac{-2 + 4}{-2} = -1$ et $x_2 = \\frac{-2-4}{-2} = 3$.' },
        { type: 'p', text: '$a < 0$ : $f(x) < 0$ sur $]-\\infty \\,;\\, -1[ \\,\\cup\\, ]3 \\,;\\, +\\infty[$, $f(x) > 0$ sur $]-1 \\,;\\, 3[$, $f(-1) = f(3) = 0$.' },
      ],
    },

    { type: 'h2', text: '8. Inéquations du second degré' },
    {
      type: 'steps',
      items: [
        { title: 'Se ramener à une comparaison avec 0', text: 'Écrire l’inéquation sous la forme $ax^2+bx+c > 0$ (ou $\\geq$, $<$, $\\leq$).' },
        { title: 'Étudier le signe du trinôme', text: 'Calculer $\\Delta$, les racines éventuelles, appliquer la règle du signe (tableau de signes).' },
        { title: 'Lire l’ensemble des solutions', text: 'Crochets fermés aux racines pour $\\geq$ ou $\\leq$, ouverts pour $>$ ou $<$ ; toujours ouverts en $\\pm\\infty$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple 1 : $2x^2 - 3x - 2 \\leq 0$',
      content: [
        { type: 'p', text: '$\\Delta = 9 + 16 = 25$, $x_1 = \\frac{3-5}{4} = -\\frac{1}{2}$, $x_2 = \\frac{3+5}{4} = 2$.' },
        { type: 'p', text: '$a = 2 > 0$ : le trinôme est négatif ou nul entre les racines. $S = \\left[-\\frac{1}{2} \\,;\\, 2\\right]$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple 2 : $x^2 > 2x + 3$',
      content: [
        { type: 'p', text: '$x^2 > 2x + 3 \\iff x^2 - 2x - 3 > 0$. $\\Delta = 4 + 12 = 16$, racines $-1$ et $3$, $a = 1 > 0$.' },
        { type: 'p', text: 'Strictement positif à l’extérieur des racines : $S = ]-\\infty \\,;\\, -1[ \\,\\cup\\, ]3 \\,;\\, +\\infty[$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple 3 : $x^2 + x + 1 > 0$ et $x^2 + x + 1 < 0$',
      content: [{ type: 'p', text: '$\\Delta = -3 < 0$ et $a > 0$ : le trinôme est toujours strictement positif. La première a pour ensemble solution $\\mathbb{R}$, la seconde $\\varnothing$.' }],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ne jamais diviser par une expression de signe inconnu',
      content: [
        { type: 'p', text: 'Pour $x^2 \\geq 3x$, diviser par $x$ donnerait $x \\geq 3$ et ferait perdre les solutions négatives ! On écrit $x^2 - 3x \\geq 0 \\iff x(x-3) \\geq 0$, d’où $S = ]-\\infty \\,;\\, 0] \\cup [3 \\,;\\, +\\infty[$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Inéquation-quotient',
      content: [
        { type: 'p', text: 'Pour une inéquation du type $\\frac{P(x)}{Q(x)} \\geq 0$ : valeurs interdites ($Q(x) = 0$), signe de chaque facteur (affines, trinômes), tableau de signes, double barre aux valeurs interdites (toujours exclues).' },
      ],
    },

    { type: 'h2', text: '9. Équations bicarrées' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Définition',
      content: [{ type: 'p', text: 'Une **équation bicarrée** est une équation de la forme $ax^4 + bx^2 + c = 0$ ($a \\neq 0$). On la résout par le **changement de variable** $X = x^2$.' }],
    },
    {
      type: 'steps',
      items: [
        { title: 'Poser $X = x^2$', text: 'L’équation devient $aX^2 + bX + c = 0$ avec la contrainte $X \\geq 0$.' },
        { title: 'Résoudre en $X$', text: 'Discriminant, racines $X_1$, $X_2$.' },
        { title: 'Revenir à $x$', text: 'Pour chaque solution $X_i > 0$ : $x = \\sqrt{X_i}$ ou $x = -\\sqrt{X_i}$ ; si $X_i = 0$ : $x = 0$ ; si $X_i < 0$ : aucune solution.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples',
      content: [
        { type: 'p', text: '**a)** $x^4 - 5x^2 + 4 = 0$. Avec $X = x^2$ : $X^2 - 5X + 4 = 0$, $\\Delta = 9$, $X = 1$ ou $X = 4$. Donc $x^2 = 1$ ou $x^2 = 4$ : $S = \\{-2 \\,;\\, -1 \\,;\\, 1 \\,;\\, 2\\}$.' },
        { type: 'p', text: '**b)** $x^4 + x^2 - 6 = 0$. $X^2 + X - 6 = 0$, $\\Delta = 25$, $X = 2$ ou $X = -3$. $x^2 = -3$ est impossible ; $x^2 = 2$ donne $S = \\{-\\sqrt{2} \\,;\\, \\sqrt{2}\\}$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Généralisation',
      content: [{ type: 'p', text: 'La même idée s’applique à d’autres équations : par exemple $x - 5\\sqrt{x} + 6 = 0$ avec $X = \\sqrt{x}$ ($X \\geq 0$) donne $X^2 - 5X + 6 = 0$, $X = 2$ ou $X = 3$, donc $x = 4$ ou $x = 9$.' }],
    },

    { type: 'h2', text: '10. Problèmes d’optimisation' },
    {
      type: 'steps',
      items: [
        { title: 'Choisir l’inconnue', text: 'Nommer la variable $x$ et préciser son unité et son **domaine** (contraintes physiques : longueurs positives…).' },
        { title: 'Modéliser', text: 'Exprimer la grandeur à optimiser sous la forme $f(x) = ax^2 + bx + c$.' },
        { title: 'Trouver l’extremum', text: '$\\alpha = -\\frac{b}{2a}$ ; maximum si $a < 0$, minimum si $a > 0$. Vérifier que $\\alpha$ appartient au domaine.' },
        { title: 'Conclure', text: 'Répondre à la question posée par une phrase, avec unités.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : le plus grand enclos',
      content: [
        { type: 'p', text: 'Un éleveur dispose de $60$ m de grillage pour clôturer un enclos rectangulaire adossé à un mur (le côté le long du mur n’est pas grillagé). On note $x$ la longueur (en m) des deux côtés perpendiculaires au mur.' },
        { type: 'p', text: 'Le côté parallèle au mur mesure $60 - 2x$, avec $0 < x < 30$. L’aire est $A(x) = x(60 - 2x) = -2x^2 + 60x$.' },
        { type: 'p', text: '$a = -2 < 0$ : maximum en $\\alpha = -\\frac{60}{2 \\times (-2)} = 15 \\in \\,]0 \\,;\\, 30[$. $A(15) = 15 \\times 30 = 450$.' },
        { type: 'p', text: '**Conclusion** : l’aire est maximale, égale à $450$ m², pour un enclos de $15$ m sur $30$ m.' },
      ],
    },
    { type: 'svg', svg: svgEnclos, caption: 'Modélisation du problème de l’enclos.', maxWidth: 640 },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Le sommet doit être dans le domaine',
      content: [
        { type: 'p', text: 'Si $\\alpha$ n’appartient pas à l’intervalle d’étude $[m \\,;\\, M]$, la fonction est monotone sur cet intervalle et l’extremum est atteint en une borne. Exemple : $f(x) = x^2 - 2x$ sur $[2 \\,;\\, 5]$ : $\\alpha = 1 \\notin [2 \\,;\\, 5]$, $f$ croissante, minimum $f(2) = 0$, maximum $f(5) = 15$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Un peu d’histoire',
      content: [
        { type: 'p', text: 'Les Babyloniens (vers −1800) résolvaient déjà des problèmes équivalents à des équations du second degré. Au IXᵉ siècle, **al-Khwârizmî** en donne une résolution systématique et géométrique (« compléter le carré »), dans un traité dont le titre a donné le mot *algèbre*. La formule avec le discriminant, sous sa forme symbolique moderne, ne s’impose qu’à partir de Viète et Descartes (XVIᵉ–XVIIᵉ siècles).' },
      ],
    },
  ],

  // =========================================================================
  // EXERCICES
  // =========================================================================
  exercices: [
    {
      id: 'sd-ex1',
      title: 'Discriminant et racines',
      difficulty: 1,
      duration: 10,
      tags: ['discriminant', 'racines'],
      statement: [
        { type: 'p', text: 'Résoudre dans $\\mathbb{R}$ les équations suivantes.' },
        { type: 'list', items: ['a) $3x^2 - 2x - 1 = 0$', 'b) $x^2 - 6x + 9 = 0$', 'c) $2x^2 + x + 3 = 0$', 'd) $5x^2 - 20 = 0$'] },
      ],
      hints: ['Identifier $a$, $b$, $c$ avec leurs signes.', 'Pour d), pas besoin de $\\Delta$ : isoler $x^2$.'],
      solution: [
        { type: 'p', text: '**a)** $a = 3$, $b = -2$, $c = -1$. $\\Delta = (-2)^2 - 4 \\times 3 \\times (-1) = 4 + 12 = 16 > 0$.' },
        { type: 'math', tex: r`x_1 = \frac{2 - 4}{6} = -\frac{1}{3} \qquad x_2 = \frac{2+4}{6} = 1 \qquad S = \left\{-\frac{1}{3} \,;\, 1\right\}` },
        { type: 'p', text: 'Contrôle : $a + b + c = 0$ donc $1$ est racine, et $x_1 x_2 = \\frac{c}{a} = -\\frac{1}{3}$. ✔' },
        { type: 'p', text: '**b)** $\\Delta = 36 - 36 = 0$ : racine double $x_0 = \\frac{6}{2} = 3$. (On reconnaît $(x-3)^2$.) $S = \\{3\\}$.' },
        { type: 'p', text: '**c)** $\\Delta = 1 - 24 = -23 < 0$ : pas de solution réelle, $S = \\varnothing$.' },
        { type: 'p', text: '**d)** $5x^2 = 20 \\iff x^2 = 4 \\iff x = -2$ ou $x = 2$. $S = \\{-2 \\,;\\, 2\\}$.' },
      ],
    },
    {
      id: 'sd-ex2',
      title: 'Forme canonique et extremum',
      difficulty: 1,
      duration: 15,
      tags: ['forme canonique', 'variations'],
      statement: [
        { type: 'p', text: 'On considère $f(x) = x^2 + 4x - 1$ et $g(x) = -2x^2 + 8x - 3$, définies sur $\\mathbb{R}$.' },
        {
          type: 'list',
          ordered: true,
          items: ['Écrire $f(x)$ et $g(x)$ sous forme canonique.', 'En déduire le tableau de variations de chaque fonction et son extremum.', 'Donner les coordonnées du sommet et l’axe de symétrie de chaque parabole.'],
        },
      ],
      hints: ['$x^2 + 4x = (x+2)^2 - 4$.', 'Pour $g$, factoriser d’abord par $-2$ : $g(x) = -2(x^2 - 4x) - 3$.'],
      solution: [
        { type: 'p', text: '**1.** $f(x) = (x+2)^2 - 4 - 1 = (x+2)^2 - 5$.' },
        { type: 'p', text: '$g(x) = -2(x^2 - 4x) - 3 = -2\\left[(x-2)^2 - 4\\right] - 3 = -2(x-2)^2 + 8 - 3 = -2(x-2)^2 + 5$.' },
        { type: 'p', text: 'Vérification : $-2(x^2 - 4x + 4) + 5 = -2x^2 + 8x - 3$. ✔' },
        { type: 'p', text: '**2.** Pour $f$ : $a = 1 > 0$, $f$ est décroissante sur $]-\\infty \\,;\\, -2]$, croissante sur $[-2 \\,;\\, +\\infty[$ ; **minimum** $-5$ atteint en $-2$.' },
        { type: 'table', headers: ['$x$', '$-\\infty$', '', '$-2$', '', '$+\\infty$'], rows: [['$f(x)$', '', '↘', '$-5$', '↗', '']] },
        { type: 'p', text: 'Pour $g$ : $a = -2 < 0$, $g$ est croissante sur $]-\\infty \\,;\\, 2]$, décroissante sur $[2 \\,;\\, +\\infty[$ ; **maximum** $5$ atteint en $2$.' },
        { type: 'table', headers: ['$x$', '$-\\infty$', '', '$2$', '', '$+\\infty$'], rows: [['$g(x)$', '', '↗', '$5$', '↘', '']] },
        { type: 'p', text: '**3.** Parabole de $f$ : sommet $S(-2 \\,;\\, -5)$, axe $x = -2$. Parabole de $g$ : sommet $S\'(2 \\,;\\, 5)$, axe $x = 2$.' },
      ],
    },
    {
      id: 'sd-ex3',
      title: 'Signe d’un trinôme et inéquations',
      difficulty: 1,
      duration: 15,
      tags: ['signe', 'inéquation'],
      statement: [
        { type: 'p', text: 'Résoudre dans $\\mathbb{R}$ :' },
        { type: 'list', items: ['a) $-x^2 + x + 6 \\geq 0$', 'b) $x^2 - 4x + 5 < 0$', 'c) $3x^2 < 5x + 2$', 'd) $9x^2 - 6x + 1 > 0$'] },
      ],
      hints: ['Comparer à 0 puis appliquer la règle « signe de $a$ à l’extérieur des racines ».', 'c) : $3x^2 - 5x - 2 < 0$.'],
      solution: [
        { type: 'p', text: '**a)** $\\Delta = 1 + 24 = 25$, $x_1 = \\frac{-1 + 5}{-2} = -2$, $x_2 = \\frac{-1-5}{-2} = 3$. $a = -1 < 0$ : le trinôme est positif entre les racines. $S = [-2 \\,;\\, 3]$.' },
        { type: 'p', text: '**b)** $\\Delta = 16 - 20 = -4 < 0$ et $a > 0$ : le trinôme est toujours strictement positif. $S = \\varnothing$.' },
        { type: 'p', text: '**c)** $3x^2 - 5x - 2 < 0$ ; $\\Delta = 25 + 24 = 49$, racines $\\frac{5-7}{6} = -\\frac{1}{3}$ et $\\frac{5+7}{6} = 2$. $a > 0$ : négatif strictement entre les racines. $S = \\left]-\\frac{1}{3} \\,;\\, 2\\right[$.' },
        { type: 'p', text: '**d)** $9x^2 - 6x + 1 = (3x-1)^2$, $\\Delta = 0$, racine double $\\frac{1}{3}$. Le carré est strictement positif sauf en $\\frac{1}{3}$. $S = \\mathbb{R} \\setminus \\left\\{\\frac{1}{3}\\right\\}$.' },
      ],
    },
    {
      id: 'sd-ex4',
      title: 'Racine évidente, somme et produit',
      difficulty: 2,
      duration: 15,
      tags: ['somme et produit', 'racine évidente'],
      statement: [
        { type: 'list', ordered: true, items: ['Montrer que $1$ est racine de $3x^2 - 7x + 4$ et en déduire l’autre racine sans calculer $\\Delta$. Factoriser.', 'Déterminer deux réels dont la somme vaut $1$ et le produit $-12$.', 'Sans calculer les racines, déterminer le signe des racines de $x^2 - 9x + 7$ (on justifiera qu’elles existent).'] },
      ],
      hints: ['Produit des racines : $\\frac{c}{a}$.', 'Les deux réels sont racines de $x^2 - Sx + P$.', 'Si le produit et la somme sont positifs…'],
      solution: [
        { type: 'p', text: '**1.** $3 \\times 1^2 - 7 \\times 1 + 4 = 0$, donc $1$ est racine. Le produit des racines vaut $\\frac{c}{a} = \\frac{4}{3}$, donc $1 \\times x_2 = \\frac{4}{3}$ : $x_2 = \\frac{4}{3}$.' },
        { type: 'p', text: 'Factorisation : $3x^2 - 7x + 4 = 3(x-1)\\left(x - \\frac{4}{3}\\right) = (x-1)(3x-4)$.' },
        { type: 'p', text: '**2.** Les deux réels sont les solutions de $x^2 - x - 12 = 0$ : $\\Delta = 1 + 48 = 49$, $x = \\frac{1 \\pm 7}{2}$, soit $4$ et $-3$. Vérification : $4 + (-3) = 1$ et $4 \\times (-3) = -12$. ✔' },
        { type: 'p', text: '**3.** $\\Delta = 81 - 28 = 53 > 0$ : deux racines distinctes. Leur produit $P = 7 > 0$ : elles sont de même signe. Leur somme $S = 9 > 0$ : elles sont donc **toutes deux positives**.' },
      ],
    },
    {
      id: 'sd-ex5',
      title: 'Équations bicarrées',
      difficulty: 2,
      duration: 15,
      tags: ['bicarrée', 'changement de variable'],
      statement: [{ type: 'list', items: ['a) $2x^4 - 7x^2 + 3 = 0$', 'b) $x^4 + 3x^2 + 2 = 0$', 'c) $x^4 - 2x^2 + 1 = 0$'] }],
      hints: ['Poser $X = x^2$ et ne garder que les $X \\geq 0$.'],
      solution: [
        { type: 'p', text: '**a)** $X = x^2$ : $2X^2 - 7X + 3 = 0$, $\\Delta = 49 - 24 = 25$, $X_1 = \\frac{7-5}{4} = \\frac{1}{2}$, $X_2 = \\frac{7+5}{4} = 3$. Les deux sont positives.' },
        { type: 'p', text: '$x^2 = 3 \\iff x = \\pm\\sqrt{3}$ et $x^2 = \\frac{1}{2} \\iff x = \\pm\\frac{1}{\\sqrt{2}} = \\pm\\frac{\\sqrt{2}}{2}$.' },
        { type: 'math', tex: r`S = \left\{-\sqrt{3} \,;\, -\frac{\sqrt{2}}{2} \,;\, \frac{\sqrt{2}}{2} \,;\, \sqrt{3}\right\}` },
        { type: 'p', text: '**b)** $X^2 + 3X + 2 = 0$, $\\Delta = 1$, $X = -1$ ou $X = -2$ : toutes deux négatives, or $x^2 \\geq 0$. $S = \\varnothing$. (Plus rapide : $x^4 + 3x^2 + 2 \\geq 2 > 0$.)' },
        { type: 'p', text: '**c)** $X^2 - 2X + 1 = (X-1)^2 = 0 \\iff X = 1 \\iff x^2 = 1$. $S = \\{-1 \\,;\\, 1\\}$.' },
      ],
    },
    {
      id: 'sd-ex6',
      title: 'Équation à paramètre',
      difficulty: 2,
      duration: 15,
      tags: ['paramètre', 'discriminant'],
      statement: [
        { type: 'p', text: 'Pour tout réel $m$, on considère l’équation $(E_m)$ : $x^2 + mx + 4 = 0$.' },
        { type: 'list', ordered: true, items: ['Exprimer le discriminant $\\Delta_m$ en fonction de $m$.', 'Discuter, selon les valeurs de $m$, le nombre de solutions de $(E_m)$.', 'Pour quelle(s) valeur(s) de $m$ l’équation a-t-elle une solution double ? Préciser cette solution.'] },
      ],
      hints: ['$\\Delta_m = m^2 - 16$ est lui-même un trinôme en $m$.'],
      solution: [
        { type: 'p', text: '**1.** $\\Delta_m = m^2 - 4 \\times 1 \\times 4 = m^2 - 16 = (m-4)(m+4)$.' },
        { type: 'p', text: '**2.** Signe de $\\Delta_m$ (trinôme en $m$, coefficient $1 > 0$, racines $-4$ et $4$) :' },
        {
          type: 'list',
          items: [
            'si $m < -4$ ou $m > 4$ : $\\Delta_m > 0$, deux solutions distinctes ;',
            'si $m = -4$ ou $m = 4$ : $\\Delta_m = 0$, une solution double ;',
            'si $-4 < m < 4$ : $\\Delta_m < 0$, aucune solution.',
          ],
        },
        { type: 'p', text: '**3.** Pour $m = 4$ : $x^2 + 4x + 4 = (x+2)^2$, solution double $x_0 = -\\frac{m}{2} = -2$. Pour $m = -4$ : $(x-2)^2$, solution double $x_0 = 2$.' },
      ],
    },
    {
      id: 'sd-ex7',
      title: 'Inéquation avec un quotient',
      difficulty: 2,
      duration: 20,
      tags: ['tableau de signes', 'inéquation'],
      statement: [{ type: 'p', text: 'Résoudre dans $\\mathbb{R}$ l’inéquation $\\dfrac{x^2 - x - 2}{x - 3} \\leq 0$.' }],
      hints: ['Valeur interdite : $3$.', 'Factoriser le numérateur, puis dresser un tableau de signes avec trois facteurs ou deux lignes.'],
      solution: [
        { type: 'p', text: '**Valeur interdite** : $x - 3 = 0 \\iff x = 3$.' },
        { type: 'p', text: '**Numérateur** : $\\Delta = 1 + 8 = 9$, racines $\\frac{1 - 3}{2} = -1$ et $\\frac{1+3}{2} = 2$ ; $a = 1 > 0$ donc positif à l’extérieur de $[-1 \\,;\\, 2]$.' },
        {
          type: 'table',
          headers: ['$x$', '$-\\infty$', '', '$-1$', '', '$2$', '', '$3$', '', '$+\\infty$'],
          rows: [
            ['$x^2 - x - 2$', '', '$+$', '$0$', '$-$', '$0$', '$+$', '', '$+$', ''],
            ['$x - 3$', '', '$-$', '', '$-$', '', '$-$', '$0$', '$+$', ''],
            ['Quotient', '', '$-$', '$0$', '$+$', '$0$', '$-$', '‖', '$+$', ''],
          ],
        },
        { type: 'p', text: 'Le quotient est négatif ou nul sur $]-\\infty \\,;\\, -1]$ et sur $[2 \\,;\\, 3[$ ($3$ exclu car valeur interdite).' },
        { type: 'math', tex: r`S = \left]-\infty \,;\, -1\right] \cup \left[2 \,;\, 3\right[` },
      ],
    },
    {
      id: 'sd-ex8',
      title: 'Retrouver un trinôme à partir de sa parabole',
      difficulty: 2,
      duration: 15,
      tags: ['forme canonique', 'racines'],
      statement: [
        { type: 'p', text: 'La parabole $\\mathcal{P}$ représentant une fonction polynôme du second degré $f$ a pour sommet $S(2 \\,;\\, -3)$ et passe par le point $A(0 \\,;\\, 5)$.' },
        { type: 'list', ordered: true, items: ['Déterminer la forme canonique puis la forme développée de $f(x)$.', 'Déterminer les abscisses des points d’intersection de $\\mathcal{P}$ avec l’axe des abscisses.'] },
      ],
      hints: ['Le sommet donne $\\alpha$ et $\\beta$ : $f(x) = a(x-2)^2 - 3$.', 'Utiliser $f(0) = 5$ pour trouver $a$.'],
      solution: [
        { type: 'p', text: '**1.** Le sommet étant $S(2 \\,;\\, -3)$, $f(x) = a(x-2)^2 - 3$. Comme $A \\in \\mathcal{P}$ : $f(0) = 4a - 3 = 5$, d’où $a = 2$.' },
        { type: 'p', text: '$f(x) = 2(x-2)^2 - 3 = 2(x^2 - 4x + 4) - 3 = 2x^2 - 8x + 5$.' },
        { type: 'p', text: '**2.** On résout $f(x) = 0$. Avec la forme canonique : $2(x-2)^2 = 3 \\iff (x-2)^2 = \\frac{3}{2} \\iff x - 2 = \\pm\\sqrt{\\frac{3}{2}} = \\pm\\frac{\\sqrt{6}}{2}$.' },
        { type: 'math', tex: r`x_1 = 2 - \frac{\sqrt{6}}{2} \approx 0{,}78 \qquad x_2 = 2 + \frac{\sqrt{6}}{2} \approx 3{,}22` },
        { type: 'p', text: 'Contrôle avec le discriminant : $\\Delta = 64 - 40 = 24$, $x = \\frac{8 \\pm 2\\sqrt{6}}{4} = 2 \\pm \\frac{\\sqrt{6}}{2}$. ✔' },
      ],
    },
    {
      id: 'sd-ex9',
      title: 'Programme Python : résolution d’une équation du second degré',
      difficulty: 2,
      duration: 20,
      tags: ['Python', 'algorithmique'],
      statement: [
        { type: 'p', text: 'On considère la fonction Python suivante, incomplète.' },
        {
          type: 'code',
          lang: 'python',
          code: `from math import sqrt

def resoudre(a, b, c):
    """Renvoie la liste des solutions réelles de ax² + bx + c = 0 (a ≠ 0)."""
    delta = ...
    if delta > 0:
        x1 = (-b - sqrt(delta)) / (2 * a)
        x2 = ...
        return [x1, x2]
    elif delta == 0:
        return [...]
    else:
        return []`,
        },
        { type: 'list', ordered: true, items: ['Compléter les trois lignes contenant `...`.', 'Que renvoie `resoudre(1, -5, 6)` ? et `resoudre(2, 4, 2)` ? et `resoudre(1, 0, 1)` ?', 'Écrire une fonction `sommet(a, b, c)` qui renvoie les coordonnées du sommet de la parabole.'] },
      ],
      hints: ['$\\Delta$ se code `b**2 - 4*a*c`.', 'Pour le sommet : `alpha = -b / (2*a)` puis évaluer le trinôme en `alpha`.'],
      solution: [
        { type: 'p', text: '**1.** Version complète :' },
        {
          type: 'code',
          lang: 'python',
          code: `from math import sqrt

def resoudre(a, b, c):
    delta = b**2 - 4*a*c
    if delta > 0:
        x1 = (-b - sqrt(delta)) / (2 * a)
        x2 = (-b + sqrt(delta)) / (2 * a)
        return [x1, x2]
    elif delta == 0:
        return [-b / (2 * a)]
    else:
        return []`,
        },
        { type: 'p', text: '**2.** `resoudre(1, -5, 6)` : $\\Delta = 1$, renvoie `[2.0, 3.0]`. `resoudre(2, 4, 2)` : $\\Delta = 16 - 16 = 0$, renvoie `[-1.0]`. `resoudre(1, 0, 1)` : $\\Delta = -4$, renvoie `[]`.' },
        { type: 'p', text: '**3.**' },
        {
          type: 'code',
          lang: 'python',
          code: `def sommet(a, b, c):
    alpha = -b / (2 * a)
    beta = a * alpha**2 + b * alpha + c
    return (alpha, beta)

print(sommet(2, -12, 10))   # (3.0, -8.0)`,
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Remarque',
          content: [{ type: 'p', text: 'Le test `delta == 0` peut être trompeur avec des flottants (erreurs d’arrondi) : avec des coefficients décimaux, un $\\Delta$ théoriquement nul peut valoir $10^{-16}$.' }],
        },
      ],
    },
    {
      id: 'sd-ex10',
      title: 'Type bac — Optimisation d’un enclos',
      difficulty: 3,
      duration: 25,
      tags: ['optimisation', 'modélisation', 'type bac'],
      statement: [
        { type: 'p', text: 'Un éleveur dispose de $60$ mètres de grillage pour construire un enclos rectangulaire contre un mur rectiligne ; le côté le long du mur n’a pas besoin de grillage. On note $x$ la longueur, en mètres, de chacun des deux côtés perpendiculaires au mur.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Justifier que $x \\in \\,]0 \\,;\\, 30[$ et que l’aire de l’enclos, en m², est $A(x) = -2x^2 + 60x$.',
            'Déterminer la forme canonique de $A(x)$.',
            'En déduire les dimensions de l’enclos d’aire maximale et cette aire maximale.',
            'L’éleveur souhaite une aire d’au moins $400$ m². Déterminer les valeurs possibles de $x$.',
          ],
        },
      ],
      hints: ['Le côté parallèle au mur mesure $60 - 2x$.', '$A(x) \\geq 400 \\iff -2x^2 + 60x - 400 \\geq 0$ : diviser par $-2$ change le sens.'],
      solution: [
        { type: 'p', text: '**1.** Le grillage forme deux côtés de longueur $x$ et un côté de longueur $60 - 2x$. Les longueurs doivent être strictement positives : $x > 0$ et $60 - 2x > 0 \\iff x < 30$. L’aire vaut $A(x) = x(60-2x) = -2x^2 + 60x$.' },
        { type: 'p', text: '**2.** $A(x) = -2(x^2 - 30x) = -2\\left[(x - 15)^2 - 225\\right] = -2(x-15)^2 + 450$.' },
        { type: 'p', text: '**3.** Pour tout $x$, $-2(x-15)^2 \\leq 0$ donc $A(x) \\leq 450$, avec égalité pour $x = 15 \\in \\,]0 \\,;\\, 30[$. L’aire maximale est $450$ m², obtenue pour un enclos de $15$ m (perpendiculairement au mur) sur $60 - 30 = 30$ m (le long du mur).' },
        { type: 'p', text: '**4.** $A(x) \\geq 400 \\iff -2x^2 + 60x - 400 \\geq 0 \\iff x^2 - 30x + 200 \\leq 0$ (division par $-2 < 0$).' },
        { type: 'p', text: '$\\Delta = 900 - 800 = 100$, racines $\\frac{30 - 10}{2} = 10$ et $\\frac{30+10}{2} = 20$. Coefficient $1 > 0$ : le trinôme est négatif ou nul entre les racines.' },
        { type: 'p', text: '**Conclusion** : l’aire est d’au moins $400$ m² si et seulement si $x \\in [10 \\,;\\, 20]$ (intervalle bien inclus dans $]0 \\,;\\, 30[$).' },
      ],
    },
    {
      id: 'sd-ex11',
      title: 'Type bac — Parabole et droites',
      difficulty: 3,
      duration: 30,
      tags: ['position relative', 'tangente', 'type bac'],
      statement: [
        { type: 'p', text: 'Dans un repère, on note $\\mathcal{P}$ la parabole d’équation $y = x^2 - 3x + 1$ et $\\mathcal{D}$ la droite d’équation $y = x - 2$.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Déterminer les coordonnées des points d’intersection de $\\mathcal{P}$ et $\\mathcal{D}$.',
            'Étudier la position relative de $\\mathcal{P}$ et $\\mathcal{D}$.',
            'Pour tout réel $m$, on note $\\mathcal{D}_m$ la droite d’équation $y = x + m$. Déterminer, selon $m$, le nombre de points d’intersection de $\\mathcal{P}$ et $\\mathcal{D}_m$.',
            'Pour quelle valeur de $m$ la droite $\\mathcal{D}_m$ n’a-t-elle qu’un seul point commun avec $\\mathcal{P}$ ? Préciser ce point.',
          ],
        },
      ],
      hints: ['Position relative : étudier le signe de la différence $(x^2 - 3x + 1) - (x - 2)$.', 'Intersection avec $\\mathcal{D}_m$ : $x^2 - 4x + 1 - m = 0$, calculer son discriminant en fonction de $m$.'],
      solution: [
        { type: 'p', text: '**1.** $x^2 - 3x + 1 = x - 2 \\iff x^2 - 4x + 3 = 0$. $\\Delta = 16 - 12 = 4$, $x = \\frac{4 \\pm 2}{2}$, soit $x = 1$ ou $x = 3$.' },
        { type: 'p', text: 'Pour $x = 1$ : $y = 1 - 2 = -1$ ; pour $x = 3$ : $y = 3 - 2 = 1$. Points d’intersection : $A(1 \\,;\\, -1)$ et $B(3 \\,;\\, 1)$.' },
        { type: 'p', text: '**2.** $d(x) = (x^2 - 3x + 1) - (x - 2) = x^2 - 4x + 3 = (x-1)(x-3)$. Ce trinôme ($a = 1 > 0$) est négatif strictement sur $]1 \\,;\\, 3[$ et positif strictement à l’extérieur de $[1 \\,;\\, 3]$.' },
        { type: 'p', text: 'Donc $\\mathcal{P}$ est **au-dessous** de $\\mathcal{D}$ sur $]1 \\,;\\, 3[$ et **au-dessus** sur $]-\\infty \\,;\\, 1[ \\,\\cup\\, ]3 \\,;\\, +\\infty[$.' },
        { type: 'p', text: '**3.** $x^2 - 3x + 1 = x + m \\iff x^2 - 4x + (1 - m) = 0$. $\\Delta_m = 16 - 4(1-m) = 12 + 4m$.' },
        { type: 'list', items: ['Si $m > -3$ : $\\Delta_m > 0$, deux points d’intersection.', 'Si $m = -3$ : $\\Delta_m = 0$, un seul point.', 'Si $m < -3$ : $\\Delta_m < 0$, aucun point.'] },
        { type: 'p', text: '**4.** Pour $m = -3$ : $x^2 - 4x + 4 = (x-2)^2 = 0$, donc $x = 2$ et $y = 2 - 3 = -1$. Le point commun est $T(2 \\,;\\, -1)$ (vérification : $4 - 6 + 1 = -1$ ✔). On verra au chapitre « Dérivation » que $\\mathcal{D}_{-3}$ est la **tangente** à $\\mathcal{P}$ en $T$.' },
      ],
    },
  ],

  // =========================================================================
  // REPRÉSENTATIONS
  // =========================================================================
  representations: [
    {
      type: 'widget',
      id: 'second-degre',
      title: 'Explorer un trinôme',
      props: { a: 1, b: -2, c: -3 },
      caption: 'Faites varier $a$, $b$, $c$ : observez le sommet, le signe de $\\Delta$, le nombre de racines et le tableau de signes. Que se passe-t-il quand $a$ change de signe ?',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Forme canonique : rôle de $a$, $\\alpha$ et $\\beta$',
      props: {
        expressions: ['a*(x-h)^2+k', 'x^2'],
        params: [
          { name: 'a', min: -3, max: 3, step: 0.1, value: 1 },
          { name: 'h', min: -4, max: 4, step: 0.5, value: 1 },
          { name: 'k', min: -5, max: 5, step: 0.5, value: -4 },
        ],
        xMin: -6,
        xMax: 6,
        yMin: -8,
        yMax: 8,
      },
      caption: 'Ici $h$ joue le rôle de $\\alpha$ et $k$ celui de $\\beta$ : la parabole de $x^2$ est translatée pour amener le sommet en $(h \\,;\\, k)$, puis « étirée » par $a$.',
    },
    { type: 'svg', svg: svgParabole, caption: 'Anatomie d’une parabole.', maxWidth: 640 },
    { type: 'svg', svg: svgSixCas, caption: 'Signe de $a$, signe de $\\Delta$ : six configurations à connaître.', maxWidth: 640 },
    {
      type: 'qcm',
      questions: [
        { question: 'Le discriminant de $2x^2 - 3x + 1$ vaut :', choices: ['$1$', '$17$', '$-1$', '$9$'], answer: 0, explanation: '$\\Delta = (-3)^2 - 4 \\times 2 \\times 1 = 9 - 8 = 1$.' },
        { question: 'La forme canonique de $x^2 + 6x + 5$ est :', choices: ['$(x+3)^2 - 4$', '$(x-3)^2 - 4$', '$(x+3)^2 + 5$', '$(x+6)^2 - 31$'], answer: 0, explanation: '$x^2 + 6x = (x+3)^2 - 9$, donc $x^2+6x+5 = (x+3)^2 - 4$.' },
        { question: 'La fonction $f(x) = -3(x-1)^2 + 2$ admet :', choices: ['un maximum égal à $2$ en $1$', 'un minimum égal à $2$ en $1$', 'un maximum égal à $1$ en $2$', 'un minimum égal à $-3$'], answer: 0, explanation: '$a = -3 < 0$ : maximum $\\beta = 2$ atteint en $\\alpha = 1$.' },
        { question: 'Si $\\Delta < 0$ et $a > 0$, l’inéquation $ax^2 + bx + c > 0$ a pour ensemble de solutions :', choices: ['$\\mathbb{R}$', '$\\varnothing$', 'l’intervalle entre les racines', '$\\{0\\}$'], answer: 0, explanation: 'Le trinôme est toujours du signe de $a$, donc strictement positif.' },
        { question: 'Les racines de $x^2 - 7x + 10$ ont pour somme et produit :', choices: ['$S = 7$, $P = 10$', '$S = -7$, $P = 10$', '$S = 7$, $P = -10$', '$S = 10$, $P = 7$'], answer: 0, explanation: '$S = -\\frac{b}{a} = 7$ et $P = \\frac{c}{a} = 10$ (racines $2$ et $5$).' },
        { question: 'L’ensemble des solutions de $x^2 \\leq 9$ est :', choices: ['$[-3 \\,;\\, 3]$', '$]-\\infty \\,;\\, 3]$', '$\\{-3 \\,;\\, 3\\}$', '$]-\\infty \\,;\\, -3] \\cup [3 \\,;\\, +\\infty[$'], answer: 0, explanation: '$x^2 - 9 = (x-3)(x+3) \\leq 0$ entre les racines.' },
        { question: 'Une forme factorisée de $2x^2 - 2x - 4$ est :', choices: ['$2(x+1)(x-2)$', '$(x+1)(x-2)$', '$2(x-1)(x+2)$', '$(2x+1)(x-4)$'], answer: 0, explanation: 'Racines $-1$ et $2$ (Δ = 4 + 32 = 36), et il ne faut pas oublier $a = 2$.' },
        { question: 'L’équation $x^4 - 10x^2 + 9 = 0$ possède :', choices: ['4 solutions', '2 solutions', '1 solution', 'aucune solution'], answer: 0, explanation: '$X^2 - 10X + 9 = 0$ donne $X = 1$ ou $X = 9$, d’où $x \\in \\{-3 \\,;\\, -1 \\,;\\, 1 \\,;\\, 3\\}$.' },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Discriminant de $ax^2+bx+c$', back: '$\\Delta = b^2 - 4ac$' },
        { front: 'Racines si $\\Delta > 0$', back: '$x_{1,2} = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$' },
        { front: 'Racine double si $\\Delta = 0$', back: '$x_0 = -\\dfrac{b}{2a}$' },
        { front: 'Coordonnées du sommet', back: '$\\alpha = -\\dfrac{b}{2a}$, $\\beta = f(\\alpha) = -\\dfrac{\\Delta}{4a}$' },
        { front: 'Forme canonique', back: '$a(x-\\alpha)^2 + \\beta$' },
        { front: 'Forme factorisée ($\\Delta > 0$)', back: '$a(x-x_1)(x-x_2)$' },
        { front: 'Somme et produit des racines', back: '$x_1 + x_2 = -\\dfrac{b}{a}$, $x_1x_2 = \\dfrac{c}{a}$' },
        { front: 'Règle du signe du trinôme', back: 'Signe de $a$ sauf entre les racines.' },
        { front: '$1$ est racine évidente quand…', back: '$a + b + c = 0$' },
        { front: 'Équation bicarrée $ax^4+bx^2+c=0$', back: 'Poser $X = x^2 \\geq 0$.' },
        { front: 'Axe de symétrie de la parabole', back: 'La droite d’équation $x = \\alpha$.' },
        { front: 'Deux nombres de somme $S$ et produit $P$', back: 'Racines de $x^2 - Sx + P$.' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque trinôme à sa forme factorisée',
      pairs: [
        { left: '$x^2 - 5x + 6$', right: '$(x-2)(x-3)$' },
        { left: '$x^2 + x - 6$', right: '$(x-2)(x+3)$' },
        { left: '$2x^2 - 8$', right: '$2(x-2)(x+2)$' },
        { left: '$x^2 - 4x + 4$', right: '$(x-2)^2$' },
        { left: '$-x^2 + 2x + 3$', right: '$-(x+1)(x-3)$' },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Si $a$ et $c$ sont de signes contraires, le trinôme $ax^2+bx+c$ a deux racines distinctes.', answer: true, explanation: '$ac < 0$ donc $-4ac > 0$ et $\\Delta = b^2 - 4ac > 0$.' },
        { text: 'Un trinôme de discriminant négatif est toujours positif.', answer: false, explanation: 'Il est du signe de $a$ : toujours négatif si $a < 0$ (ex. $-x^2 - 1$).' },
        { text: 'La parabole de $f(x) = ax^2+bx+c$ coupe l’axe des ordonnées en $(0 \\,;\\, c)$.', answer: true, explanation: '$f(0) = c$.' },
        { text: 'Les solutions de $x^2 \\geq 4$ sont les $x \\geq 2$.', answer: false, explanation: '$S = ]-\\infty \\,;\\, -2] \\cup [2 \\,;\\, +\\infty[$ : on perd les négatifs en « prenant la racine ».' },
        { text: 'L’abscisse du sommet est la moyenne des deux racines.', answer: true, explanation: '$\\frac{x_1 + x_2}{2} = \\frac{-b/a}{2} = -\\frac{b}{2a} = \\alpha$.' },
        { text: '$f(x) = (x+1)^2 - x^2$ est une fonction polynôme du second degré.', answer: false, explanation: '$f(x) = 2x + 1$ est affine.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter la méthode',
      text: 'Pour résoudre $ax^2+bx+c > 0$, on calcule le {{discriminant}} $\\Delta = b^2 - 4ac$. Si $\\Delta > 0$, le trinôme a {{deux|2}} racines et il est du signe de $a$ à l’{{extérieur}} des racines. Si $\\Delta < 0$, le trinôme est toujours du signe de {{a}}. Le sommet de la parabole a pour abscisse $\\alpha = -\\frac{b}{2a}$ ; si $a > 0$, $f(\\alpha)$ est un {{minimum}}.',
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre la résolution d’une inéquation du second degré',
      items: [
        'Tout passer dans le membre de gauche pour comparer à 0',
        'Identifier $a$, $b$ et $c$',
        'Calculer le discriminant $\\Delta$',
        'Calculer les racines éventuelles',
        'Appliquer la règle du signe du trinôme (tableau de signes)',
        'Écrire l’ensemble des solutions avec les bons crochets',
      ],
    },
  ],
}

export default chapter
