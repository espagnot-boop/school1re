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

function line(F: Frame, m: number, p: number, a: number, b: number, color: string, extra = ''): string {
  return `<line x1="${X(F, a)}" y1="${Y(F, m * a + p)}" x2="${X(F, b)}" y2="${Y(F, m * b + p)}" stroke="${color}" ${extra}/>`
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
// Schéma 1 : des sécantes à la tangente, f(x) = x²/2 en a = 1
// ---------------------------------------------------------------------------
const FS: Frame = { x0: -0.6, x1: 4.2, y0: -1, y1: 6, L: 30, T: 15, W: 400, H: 290 }
const fS = (x: number) => (x * x) / 2
const svgSecantes = `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
<defs>${clip('m3-c1', FS)}</defs>
${axes(FS, [1, 2, 3, 4], [1, 2, 3, 4, 5])}
<g clip-path="url(#m3-c1)">
<path d="${curve(FS, fS, -0.6, 4.2)}" fill="none" stroke="${BLUE}" stroke-width="2.5"/>
${line(FS, 2, -1.5, -0.6, 4.2, ORANGE, 'stroke-width="1.5" stroke-dasharray="6 4"')}
${line(FS, 1.5, -1, -0.6, 4.2, VIOLET, 'stroke-width="1.5" stroke-dasharray="6 4"')}
${line(FS, 1, -0.5, -0.6, 4.2, RED, 'stroke-width="2.2"')}
</g>
<circle cx="${X(FS, 1)}" cy="${Y(FS, 0.5)}" r="5" fill="${RED}"/>
<circle cx="${X(FS, 3)}" cy="${Y(FS, 4.5)}" r="4.5" fill="${ORANGE}"/>
<circle cx="${X(FS, 2)}" cy="${Y(FS, 2)}" r="4.5" fill="${VIOLET}"/>
<text x="${X(FS, 1) + 8}" y="${Y(FS, 0.5) + 18}" fill="${RED}">A(1 ; f(1))</text>
<text x="${X(FS, 3) + 8}" y="${Y(FS, 4.5) + 4}" fill="${ORANGE}">M (h = 2)</text>
<text x="${X(FS, 2) + 8}" y="${Y(FS, 2) + 14}" fill="${VIOLET}">M (h = 1)</text>
<g fill="currentColor">
<text x="450" y="40" font-weight="600">f(x) = x²/2, a = 1</text>
<text x="450" y="64">Taux de variation :</text>
<text x="450" y="80">(f(1 + h) − f(1))/h = 1 + h/2</text>
<text x="450" y="106" fill="${ORANGE}">h = 2 : pente 2</text>
<text x="450" y="124" fill="${VIOLET}">h = 1 : pente 1,5</text>
<text x="450" y="142" opacity="0.8">h = 0,1 : pente 1,05</text>
<text x="450" y="170" fill="${RED}">h → 0 : pente → 1</text>
<text x="450" y="194">Les sécantes (AM) « tendent »</text>
<text x="450" y="210">vers la tangente en A,</text>
<text x="450" y="226">de coefficient directeur</text>
<text x="450" y="242" fill="${RED}">f′(1) = 1.</text>
<text x="450" y="270">Tangente : y = x − 0,5</text>
</g>
</svg>`

// ---------------------------------------------------------------------------
// Schéma 2 : non-dérivabilité de √x et |x| en 0
// ---------------------------------------------------------------------------
const FR: Frame = { x0: -0.5, x1: 4.2, y0: -0.6, y1: 2.6, L: 20, T: 20, W: 280, H: 220 }
const FA: Frame = { x0: -2.6, x1: 2.6, y0: -0.6, y1: 2.6, L: 340, T: 20, W: 280, H: 220 }
const svgNonDerivable = `<svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
<defs>${clip('m3-c2', FR)}${clip('m3-c3', FA)}</defs>
${axes(FR, [1, 2, 3, 4], [1, 2])}
<g clip-path="url(#m3-c2)"><path d="${curve(FR, (x) => Math.sqrt(x), 0, 4.2, 120)}" fill="none" stroke="${BLUE}" stroke-width="2.5"/></g>
<line x1="${X(FR, 0)}" y1="${FR.T}" x2="${X(FR, 0)}" y2="${Y(FR, 0)}" stroke="${RED}" stroke-width="2.5" stroke-dasharray="6 4"/>
<text x="${X(FR, 0) + 8}" y="${FR.T + 30}" fill="${RED}">tangente verticale</text>
<text x="160" y="268" text-anchor="middle" fill="currentColor">y = √x : (√h)/h = 1/√h → +∞</text>
${axes(FA, [-2, -1, 1, 2], [1, 2])}
<g clip-path="url(#m3-c3)"><path d="${curve(FA, (x) => Math.abs(x), -2.6, 2.6, 2)}" fill="none" stroke="${BLUE}" stroke-width="2.5"/></g>
${line(FA, 1, 0, 0, 2.3, GREEN, 'stroke-width="1.5" stroke-dasharray="6 4" transform="translate(0,-6)"')}
${line(FA, -1, 0, -2.3, 0, ORANGE, 'stroke-width="1.5" stroke-dasharray="6 4" transform="translate(0,-6)"')}
<text x="${X(FA, 1.2)}" y="${Y(FA, 2.2)}" fill="${GREEN}">pente 1 (h &gt; 0)</text>
<text x="${X(FA, -2.5)}" y="${Y(FA, 2.2)}" fill="${ORANGE}">pente −1 (h &lt; 0)</text>
<text x="480" y="268" text-anchor="middle" fill="currentColor">y = |x| : |h|/h vaut 1 ou −1 : pas de limite</text>
</svg>`

// ---------------------------------------------------------------------------
// Schéma 3 : lecture graphique (exercice) — f(x) = −x²/4 + 2x + 1
// ---------------------------------------------------------------------------
const FL: Frame = { x0: -1.4, x1: 9, y0: -1, y1: 7, L: 30, T: 15, W: 580, H: 300 }
const fL = (x: number) => -(x * x) / 4 + 2 * x + 1
const svgLecture = `<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
<defs>${clip('m3-c4', FL)}</defs>
${axes(FL, [-1, 1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6])}
<g clip-path="url(#m3-c4)">
<path d="${curve(FL, fL, -1.4, 9)}" fill="none" stroke="${BLUE}" stroke-width="2.5"/>
${line(FL, 2, 1, -1.2, 2.6, RED, 'stroke-width="1.8"')}
${line(FL, 0, 5, 2.2, 5.8, GREEN, 'stroke-width="1.8"')}
${line(FL, -1, 10, 4.2, 8.6, ORANGE, 'stroke-width="1.8"')}
</g>
<circle cx="${X(FL, 0)}" cy="${Y(FL, 1)}" r="4.5" fill="${RED}"/>
<circle cx="${X(FL, 1)}" cy="${Y(FL, 3)}" r="3.5" fill="none" stroke="${RED}" stroke-width="1.5"/>
<circle cx="${X(FL, 4)}" cy="${Y(FL, 5)}" r="4.5" fill="${GREEN}"/>
<circle cx="${X(FL, 6)}" cy="${Y(FL, 4)}" r="4.5" fill="${ORANGE}"/>
<circle cx="${X(FL, 8)}" cy="${Y(FL, 2)}" r="3.5" fill="none" stroke="${ORANGE}" stroke-width="1.5"/>
<text x="${X(FL, 0) + 8}" y="${Y(FL, 1) + 16}" fill="${RED}">A</text>
<text x="${X(FL, 1) - 18}" y="${Y(FL, 3) - 6}" fill="${RED}">P</text>
<text x="${X(FL, 4) - 4}" y="${Y(FL, 5) - 10}" fill="${GREEN}">B</text>
<text x="${X(FL, 6) + 8}" y="${Y(FL, 4) - 6}" fill="${ORANGE}">C</text>
<text x="${X(FL, 8) + 8}" y="${Y(FL, 2) - 6}" fill="${ORANGE}">Q</text>
<text x="${X(FL, 7.6)}" y="${Y(FL, 0.4)}" fill="${BLUE}">𝒞f</text>
</svg>`

// ---------------------------------------------------------------------------
// Schéma 4 : lecture d'un coefficient directeur (triangle)
// ---------------------------------------------------------------------------
const svgPente = `<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
<line x1="40" y1="190" x2="360" y2="30" stroke="${RED}" stroke-width="2.2"/>
<path d="M120,150 L280,150 L280,70" fill="none" stroke="currentColor" stroke-dasharray="5 4"/>
<circle cx="120" cy="150" r="4.5" fill="${RED}"/>
<circle cx="280" cy="70" r="4.5" fill="${RED}"/>
<text x="200" y="168" text-anchor="middle" fill="currentColor">Δx = x_B − x_A</text>
<text x="288" y="114" fill="currentColor">Δy = y_B − y_A</text>
<text x="108" y="140" text-anchor="end" fill="${RED}">A</text>
<text x="272" y="62" text-anchor="end" fill="${RED}">B</text>
<g fill="currentColor">
<text x="400" y="60" font-weight="600">Coefficient directeur</text>
<text x="400" y="86">m = Δy / Δx</text>
<text x="400" y="112">Sur la tangente en a :</text>
<text x="400" y="130" fill="${RED}">m = f′(a)</text>
<text x="400" y="156">On avance de 1 en abscisse,</text>
<text x="400" y="172">on monte de f′(a) en ordonnée.</text>
</g>
</svg>`

// ---------------------------------------------------------------------------
const chapter: Chapter = {
  id: 'derivation',
  subject: 'maths',
  order: 3,
  title: 'Dérivation',
  theme: 'Analyse',
  summary:
    'Du taux de variation au nombre dérivé, tangente à une courbe, fonction dérivée, dérivées des fonctions usuelles et règles de calcul (somme, produit, quotient, composée avec une fonction affine).',
  duration: '4 semaines',
  objectives: [
    'Calculer un taux de variation et l’interpréter comme coefficient directeur d’une sécante.',
    'Déterminer un nombre dérivé comme limite du taux de variation quand $h$ tend vers 0.',
    'Interpréter le nombre dérivé comme coefficient directeur de la tangente ; le lire graphiquement.',
    'Déterminer une équation de la tangente en un point.',
    'Connaître les dérivées des fonctions usuelles : $x^n$ ($n \\in \\mathbb{N}$), $\\frac{1}{x}$, $\\sqrt{x}$.',
    'Calculer la dérivée d’une somme, d’un produit, d’un inverse, d’un quotient et de $x \\mapsto g(ax+b)$.',
    'Démontrer que la fonction racine carrée n’est pas dérivable en 0 ; étudier la fonction valeur absolue en 0.',
  ],
  keywords: [
    'taux de variation',
    'sécante',
    'nombre dérivé',
    'tangente',
    'fonction dérivée',
    'dérivable',
    'dérivée d’un produit',
    'dérivée d’un quotient',
    'composée affine',
    'racine carrée',
    'valeur absolue',
  ],

  // =========================================================================
  // FICHE
  // =========================================================================
  fiche: [
    { type: 'h2', text: 'Du taux de variation au nombre dérivé' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Taux de variation', value: r`$\tau(h) = \dfrac{f(a+h) - f(a)}{h}$ ($h \neq 0$) = pente de la sécante entre les points d’abscisses $a$ et $a+h$.` },
        { key: 'Nombre dérivé', value: r`$f'(a) = \lim\limits_{h \to 0} \dfrac{f(a+h) - f(a)}{h}$ (si cette limite existe et est finie : $f$ est dérivable en $a$).` },
        { key: 'Tangente en $a$', value: 'Droite passant par $A(a \\,;\\, f(a))$ de coefficient directeur $f\'(a)$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Équation de la tangente en $a$',
      content: [{ type: 'math', tex: r`y = f'(a)(x - a) + f(a)` }],
    },
    { type: 'h2', text: 'Dérivées usuelles' },
    {
      type: 'table',
      headers: ['$f(x)$', '$f\'(x)$', 'Dérivable sur'],
      rows: [
        ['$k$ (constante)', '$0$', '$\\mathbb{R}$'],
        ['$x$', '$1$', '$\\mathbb{R}$'],
        ['$x^2$', '$2x$', '$\\mathbb{R}$'],
        ['$x^3$', '$3x^2$', '$\\mathbb{R}$'],
        ['$x^n$ ($n \\geq 1$ entier)', '$nx^{n-1}$', '$\\mathbb{R}$'],
        [r`$\dfrac{1}{x}$`, r`$-\dfrac{1}{x^2}$`, '$]-\\infty \\,;\\, 0[$ et $]0 \\,;\\, +\\infty[$'],
        [r`$\dfrac{1}{x^n}$ ($n \geq 1$)`, r`$-\dfrac{n}{x^{n+1}}$`, '$]-\\infty \\,;\\, 0[$ et $]0 \\,;\\, +\\infty[$'],
        ['$\\sqrt{x}$', r`$\dfrac{1}{2\sqrt{x}}$`, '$]0 \\,;\\, +\\infty[$ (pas en $0$ !)'],
      ],
    },
    { type: 'h2', text: 'Opérations ($u$, $v$ dérivables, $k$ réel)' },
    {
      type: 'table',
      headers: ['Fonction', 'Dérivée', 'Condition'],
      rows: [
        ['$u + v$', '$u\' + v\'$', ''],
        ['$ku$', '$ku\'$', ''],
        ['$uv$', '$u\'v + uv\'$', ''],
        [r`$\dfrac{1}{v}$`, r`$-\dfrac{v'}{v^2}$`, '$v$ ne s’annule pas'],
        [r`$\dfrac{u}{v}$`, r`$\dfrac{u'v - uv'}{v^2}$`, '$v$ ne s’annule pas'],
        ['$x \\mapsto g(ax+b)$', '$x \\mapsto a\\,g\'(ax+b)$', '$ax+b$ dans l’ensemble de dérivabilité de $g$'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'À ne pas écrire',
      content: [
        {
          type: 'list',
          items: [
            '$(uv)\' = u\'v\'$ : **FAUX** ; $(uv)\' = u\'v + uv\'$.',
            '$\\left(\\frac{u}{v}\\right)\' = \\frac{u\'}{v\'}$ : **FAUX**.',
            '$\\sqrt{\\ }$ est définie en $0$ mais **pas dérivable** en $0$ ; $|x|$ n’est pas dérivable en $0$.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples express',
      content: [
        {
          type: 'list',
          items: [
            '$(3x^4 - 5x^2 + 2x - 7)\' = 12x^3 - 10x + 2$',
            r`$\left(\dfrac{x-1}{x+2}\right)' = \dfrac{(x+2) - (x-1)}{(x+2)^2} = \dfrac{3}{(x+2)^2}$`,
            '$\\left((3x-2)^5\\right)\' = 3 \\times 5(3x-2)^4 = 15(3x-2)^4$',
            r`$\left(\sqrt{4x+1}\right)' = \dfrac{4}{2\sqrt{4x+1}} = \dfrac{2}{\sqrt{4x+1}}$`,
          ],
        },
      ],
    },
  ],

  // =========================================================================
  // COURS
  // =========================================================================
  cours: [
    { type: 'h2', text: '1. Taux de variation' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Définition',
      content: [
        { type: 'p', text: 'Soit $f$ une fonction définie sur un intervalle $I$, $a \\in I$ et $h$ un réel non nul tel que $a + h \\in I$. Le **taux de variation** de $f$ entre $a$ et $a + h$ est' },
        { type: 'math', tex: r`\tau(h) = \frac{f(a+h) - f(a)}{(a+h) - a} = \frac{f(a+h) - f(a)}{h}.` },
      ],
    },
    {
      type: 'p',
      text: 'Graphiquement, c’est le **coefficient directeur de la sécante** $(AM)$, où $A(a \\,;\\, f(a))$ et $M(a + h \\,;\\, f(a+h))$ sont deux points de la courbe. Physiquement, si $f(t)$ est une position, c’est une **vitesse moyenne** entre les instants $a$ et $a + h$.',
    },
    { type: 'svg', svg: svgPente, caption: 'Coefficient directeur d’une droite passant par deux points.', maxWidth: 640 },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : $f(x) = x^2$ en $a = 1$',
      content: [
        { type: 'math', tex: r`\frac{f(1+h) - f(1)}{h} = \frac{1 + 2h + h^2 - 1}{h} = \frac{h(2 + h)}{h} = 2 + h` },
        { type: 'p', text: 'Pour $h = 1$ : $3$ ; pour $h = 0{,}1$ : $2{,}1$ ; pour $h = -0{,}01$ : $1{,}99$. Quand $h$ se rapproche de $0$, le taux se rapproche de $2$.' },
      ],
    },

    { type: 'h2', text: '2. Nombre dérivé' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Définition',
      content: [
        { type: 'p', text: 'On dit que $f$ est **dérivable en $a$** si le taux de variation $\\frac{f(a+h) - f(a)}{h}$ tend vers un nombre réel $\\ell$ quand $h$ tend vers $0$. Ce nombre est appelé **nombre dérivé** de $f$ en $a$ et noté $f\'(a)$ :' },
        { type: 'math', tex: r`f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}.` },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Calculer $f(a+h)$', text: 'Remplacer $x$ par $a + h$ et développer.' },
        { title: 'Former et simplifier le taux', text: 'Calculer $f(a+h) - f(a)$, puis diviser par $h$ (en factorisant par $h$ au numérateur).' },
        { title: 'Faire tendre $h$ vers $0$', text: 'Une fois $h$ simplifié, remplacer $h$ par $0$ dans l’expression obtenue.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : $f(x) = \\frac{1}{x}$ en $a = 2$',
      content: [
        { type: 'math', tex: r`\frac{f(2+h) - f(2)}{h} = \frac{1}{h}\left(\frac{1}{2+h} - \frac{1}{2}\right) = \frac{1}{h} \times \frac{2 - (2+h)}{2(2+h)} = \frac{-1}{2(2+h)}` },
        { type: 'p', text: 'Quand $h \\to 0$, ce taux tend vers $-\\frac{1}{4}$ : $f$ est dérivable en $2$ et $f\'(2) = -\\frac{1}{4}$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Interprétation cinématique',
      content: [{ type: 'p', text: 'Si $d(t)$ est la distance parcourue à l’instant $t$, le taux de variation est une vitesse moyenne et $d\'(t)$ la **vitesse instantanée**. Pour une chute libre $d(t) = 4{,}9t^2$ (m, s) : $d\'(t) = 9{,}8t$, soit $19{,}6$ m/s à $t = 2$ s.' }],
    },

    { type: 'h2', text: '3. Tangente à une courbe' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Définition',
      content: [{ type: 'p', text: 'Si $f$ est dérivable en $a$, la **tangente** à la courbe $\\mathcal{C}_f$ au point $A(a \\,;\\, f(a))$ est la droite passant par $A$ et de coefficient directeur $f\'(a)$. C’est la « position limite » des sécantes $(AM)$ quand $M$ se rapproche de $A$.' }],
    },
    { type: 'svg', svg: svgSecantes, caption: 'Quand $h \\to 0$, la sécante $(AM)$ pivote autour de $A$ et se rapproche de la tangente.', maxWidth: 640 },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Équation de la tangente',
      content: [
        { type: 'p', text: 'Si $f$ est dérivable en $a$, la tangente à $\\mathcal{C}_f$ au point d’abscisse $a$ a pour équation' },
        { type: 'math', tex: r`y = f'(a)(x - a) + f(a).` },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [
        { type: 'p', text: 'La tangente n’est pas verticale (coefficient directeur $f\'(a)$), elle a donc une équation de la forme $y = f\'(a)x + p$. Elle passe par $A(a \\,;\\, f(a))$ : $f(a) = f\'(a) \\times a + p$, donc $p = f(a) - f\'(a)a$.' },
        { type: 'p', text: 'Finalement $y = f\'(a)x + f(a) - f\'(a)a = f\'(a)(x - a) + f(a)$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : tangente à la parabole $y = x^2$ en $a = 3$',
      content: [
        { type: 'p', text: '$f(3) = 9$ et $f\'(3) = 2 \\times 3 = 6$. Tangente : $y = 6(x - 3) + 9 = 6x - 9$.' },
        { type: 'p', text: 'Contrôle : le point $(3 \\,;\\, 9)$ vérifie bien $6 \\times 3 - 9 = 9$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Lire graphiquement un nombre dérivé',
      content: [
        {
          type: 'list',
          items: [
            '$f(a)$ : ordonnée du point de la courbe d’abscisse $a$.',
            '$f\'(a)$ : coefficient directeur de la tangente en ce point, lu avec deux points de la tangente : $\\frac{\\Delta y}{\\Delta x}$.',
            'Tangente horizontale $\\iff f\'(a) = 0$ (souvent en un sommet de la courbe).',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Approximation affine',
      content: [
        { type: 'p', text: 'Près de $a$, la courbe est très proche de sa tangente : pour $h$ petit, $f(a + h) \\approx f(a) + f\'(a)h$.' },
        { type: 'p', text: 'Exemple : avec $f(x) = \\sqrt{x}$, $a = 1$, $f\'(1) = \\frac{1}{2}$ : $\\sqrt{1{,}02} \\approx 1 + 0{,}5 \\times 0{,}02 = 1{,}01$ (valeur exacte $\\approx 1{,}00995$).' },
      ],
    },

    { type: 'h2', text: '4. Fonction dérivée' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Définition',
      content: [{ type: 'p', text: 'Une fonction $f$ est **dérivable sur un intervalle $I$** si elle est dérivable en tout réel $a$ de $I$. La fonction qui à tout $x \\in I$ associe $f\'(x)$ est la **fonction dérivée** de $f$, notée $f\'$.' }],
    },
    {
      type: 'p',
      text: 'On obtient ainsi d’un coup tous les nombres dérivés : c’est ce qui rend la dérivation si efficace. Au chapitre suivant, le **signe de $f\'$** donnera les variations de $f$.',
    },

    { type: 'h2', text: '5. Dérivées des fonctions usuelles' },
    {
      type: 'table',
      headers: ['Fonction $f$', 'Dérivée $f\'$', 'Ensemble de dérivabilité'],
      rows: [
        ['$f(x) = k$', '$f\'(x) = 0$', '$\\mathbb{R}$'],
        ['$f(x) = mx + p$', '$f\'(x) = m$', '$\\mathbb{R}$'],
        ['$f(x) = x^2$', '$f\'(x) = 2x$', '$\\mathbb{R}$'],
        ['$f(x) = x^3$', '$f\'(x) = 3x^2$', '$\\mathbb{R}$'],
        ['$f(x) = x^n$, $n \\in \\mathbb{N}^*$', '$f\'(x) = nx^{n-1}$', '$\\mathbb{R}$'],
        [r`$f(x) = \dfrac{1}{x}$`, r`$f'(x) = -\dfrac{1}{x^2}$`, '$]-\\infty \\,;\\, 0[$, $]0 \\,;\\, +\\infty[$'],
        [r`$f(x) = \dfrac{1}{x^n}$, $n \in \mathbb{N}^*$`, r`$f'(x) = -\dfrac{n}{x^{n+1}}$`, '$]-\\infty \\,;\\, 0[$, $]0 \\,;\\, +\\infty[$'],
        ['$f(x) = \\sqrt{x}$', r`$f'(x) = \dfrac{1}{2\sqrt{x}}$`, '$]0 \\,;\\, +\\infty[$'],
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration : dérivée de $x \\mapsto x^2$',
      content: [
        { type: 'p', text: 'Pour $a$ réel et $h \\neq 0$ :' },
        { type: 'math', tex: r`\frac{(a+h)^2 - a^2}{h} = \frac{2ah + h^2}{h} = 2a + h \xrightarrow[h \to 0]{} 2a.` },
        { type: 'p', text: 'Donc la fonction carrée est dérivable sur $\\mathbb{R}$ et sa dérivée est $x \\mapsto 2x$.' },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration : dérivée de $x \\mapsto \\frac{1}{x}$',
      content: [
        { type: 'p', text: 'Pour $a \\neq 0$ et $h \\neq 0$ assez petit pour que $a + h$ soit du même signe que $a$ :' },
        { type: 'math', tex: r`\frac{1}{h}\left(\frac{1}{a+h} - \frac{1}{a}\right) = \frac{1}{h} \times \frac{a - (a+h)}{a(a+h)} = \frac{-1}{a(a+h)} \xrightarrow[h \to 0]{} -\frac{1}{a^2}.` },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration : dérivée de $x \\mapsto x^3$',
      content: [
        { type: 'math', tex: r`\frac{(a+h)^3 - a^3}{h} = \frac{3a^2h + 3ah^2 + h^3}{h} = 3a^2 + 3ah + h^2 \xrightarrow[h \to 0]{} 3a^2.` },
        { type: 'p', text: 'La formule générale $(x^n)\' = nx^{n-1}$ est admise (elle se démontre par récurrence en Terminale, ou avec la dérivée d’un produit).' },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration : dérivée de $x \\mapsto \\sqrt{x}$ sur $]0 \\,;\\, +\\infty[$',
      content: [
        { type: 'p', text: 'Pour $a > 0$, on multiplie par la **quantité conjuguée** :' },
        { type: 'math', tex: r`\frac{\sqrt{a+h} - \sqrt{a}}{h} = \frac{(\sqrt{a+h} - \sqrt{a})(\sqrt{a+h} + \sqrt{a})}{h(\sqrt{a+h} + \sqrt{a})} = \frac{h}{h(\sqrt{a+h} + \sqrt{a})} = \frac{1}{\sqrt{a+h} + \sqrt{a}}.` },
        { type: 'p', text: 'Quand $h \\to 0$, ce quotient tend vers $\\frac{1}{2\\sqrt{a}}$.' },
      ],
    },

    { type: 'h2', text: '6. Deux fonctions non dérivables en 0' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'La fonction racine carrée n’est pas dérivable en 0',
      content: [
        { type: 'p', text: 'Pour $h > 0$ :' },
        { type: 'math', tex: r`\frac{\sqrt{0 + h} - \sqrt{0}}{h} = \frac{\sqrt{h}}{h} = \frac{1}{\sqrt{h}}.` },
        { type: 'p', text: 'Quand $h$ tend vers $0$ (par valeurs positives), $\\sqrt{h}$ tend vers $0$ et $\\frac{1}{\\sqrt{h}}$ devient arbitrairement grand : le taux tend vers $+\\infty$, ce n’est **pas un réel**. Donc $\\sqrt{\\ }$ n’est pas dérivable en $0$. Graphiquement, la courbe admet en l’origine une **tangente verticale** (l’axe des ordonnées).' },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'La fonction valeur absolue n’est pas dérivable en 0',
      content: [
        { type: 'p', text: 'Rappel : $|x| = x$ si $x \\geq 0$ et $|x| = -x$ si $x < 0$. En $0$ :' },
        { type: 'math', tex: r`\frac{|0 + h| - |0|}{h} = \frac{|h|}{h} = \begin{cases} 1 & \text{si } h > 0 \\ -1 & \text{si } h < 0 \end{cases}` },
        { type: 'p', text: 'Le taux ne se rapproche pas d’un unique nombre quand $h \\to 0$ : la fonction n’est pas dérivable en $0$. La courbe présente un **point anguleux** avec deux demi-tangentes de pentes $1$ et $-1$. (Elle est dérivable sur $]-\\infty \\,;\\, 0[$ de dérivée $-1$ et sur $]0 \\,;\\, +\\infty[$ de dérivée $1$.)' },
      ],
    },
    { type: 'svg', svg: svgNonDerivable, caption: 'Tangente verticale pour $\\sqrt{x}$ en 0, point anguleux pour $|x|$ en 0.', maxWidth: 640 },

    { type: 'h2', text: '7. Opérations sur les fonctions dérivables' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Somme et produit par un réel',
      content: [{ type: 'p', text: 'Si $u$ et $v$ sont dérivables sur $I$ et $k$ est un réel, alors $u + v$ et $ku$ sont dérivables sur $I$ et $(u + v)\' = u\' + v\'$, $(ku)\' = ku\'$.' }],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Conséquence : dérivée d’un polynôme',
      content: [
        { type: 'p', text: '$f(x) = 3x^4 - 5x^2 + 2x - 7$ : $f\'(x) = 3 \\times 4x^3 - 5 \\times 2x + 2 = 12x^3 - 10x + 2$.' },
        { type: 'p', text: 'Pour un trinôme : $(ax^2 + bx + c)\' = 2ax + b$, qui s’annule en $-\\frac{b}{2a}$ : on retrouve l’abscisse du sommet !' },
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Produit',
      content: [{ type: 'p', text: 'Si $u$ et $v$ sont dérivables sur $I$, alors $uv$ est dérivable sur $I$ et $(uv)\' = u\'v + uv\'$.' }],
    },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [
        { type: 'p', text: 'Pour $a \\in I$ et $h \\neq 0$, on ajoute et on retranche $u(a)v(a+h)$ au numérateur :' },
        {
          type: 'math',
          tex: r`\frac{u(a+h)v(a+h) - u(a)v(a)}{h} = \frac{u(a+h) - u(a)}{h}\, v(a+h) + u(a)\, \frac{v(a+h) - v(a)}{h}.`,
        },
        { type: 'p', text: 'Quand $h \\to 0$ : le premier quotient tend vers $u\'(a)$, $v(a+h)$ tend vers $v(a)$ (on admet qu’une fonction dérivable a ce comportement « sans saut »), et le second quotient tend vers $v\'(a)$. D’où $(uv)\'(a) = u\'(a)v(a) + u(a)v\'(a)$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Inverse et quotient',
      content: [
        { type: 'p', text: 'Si $u$ et $v$ sont dérivables sur $I$ et si $v$ **ne s’annule pas** sur $I$, alors $\\frac{1}{v}$ et $\\frac{u}{v}$ sont dérivables sur $I$ et' },
        { type: 'math', tex: r`\left(\frac{1}{v}\right)' = -\frac{v'}{v^2} \qquad\qquad \left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}.` },
      ],
    },
    {
      type: 'reveal',
      title: 'Du quotient à partir de l’inverse et du produit',
      content: [{ type: 'p', text: '$\\frac{u}{v} = u \\times \\frac{1}{v}$, donc $\\left(\\frac{u}{v}\\right)\' = u\' \\times \\frac{1}{v} + u \\times \\left(-\\frac{v\'}{v^2}\\right) = \\frac{u\'v}{v^2} - \\frac{uv\'}{v^2} = \\frac{u\'v - uv\'}{v^2}$.' }],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Composée avec une fonction affine',
      content: [
        { type: 'p', text: 'Soit $g$ une fonction dérivable sur un intervalle $J$, et $a$, $b$ deux réels. Sur tout intervalle $I$ tel que $ax + b \\in J$ pour tout $x \\in I$, la fonction $f : x \\mapsto g(ax + b)$ est dérivable et' },
        { type: 'math', tex: r`f'(x) = a \, g'(ax + b).` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples de composées',
      content: [
        {
          type: 'list',
          items: [
            '$f(x) = (3x - 2)^5$ : $g(X) = X^5$, $g\'(X) = 5X^4$, donc $f\'(x) = 3 \\times 5(3x - 2)^4 = 15(3x-2)^4$.',
            r`$f(x) = \sqrt{4x + 1}$ sur $\left]-\frac{1}{4} \,;\, +\infty\right[$ : $f'(x) = 4 \times \dfrac{1}{2\sqrt{4x+1}} = \dfrac{2}{\sqrt{4x+1}}$.`,
            r`$f(x) = \dfrac{1}{2x - 5}$ sur $\left]\frac{5}{2} \,;\, +\infty\right[$ : $f'(x) = 2 \times \left(-\dfrac{1}{(2x-5)^2}\right) = -\dfrac{2}{(2x-5)^2}$.`,
          ],
        },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Identifier la structure', text: 'Somme ? produit $u \\times v$ ? quotient $\\frac{u}{v}$ ? fonction usuelle appliquée à $ax + b$ ?' },
        { title: 'Nommer les morceaux', text: 'Écrire $u(x) = \\ldots$, $u\'(x) = \\ldots$, $v(x) = \\ldots$, $v\'(x) = \\ldots$.' },
        { title: 'Appliquer la formule', text: 'Remplacer dans $u\'v + uv\'$ ou $\\frac{u\'v - uv\'}{v^2}$.' },
        { title: 'Simplifier', text: 'Développer et réduire le numérateur ; **ne pas développer** le dénominateur $v^2$ (utile pour le signe).' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple 1 : un produit',
      content: [
        { type: 'p', text: '$g(x) = (2x + 1)\\sqrt{x}$ sur $]0 \\,;\\, +\\infty[$. $u(x) = 2x + 1$, $u\'(x) = 2$ ; $v(x) = \\sqrt{x}$, $v\'(x) = \\frac{1}{2\\sqrt{x}}$.' },
        { type: 'math', tex: r`g'(x) = 2\sqrt{x} + \frac{2x+1}{2\sqrt{x}} = \frac{4x + 2x + 1}{2\sqrt{x}} = \frac{6x+1}{2\sqrt{x}}.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple 2 : un quotient',
      content: [
        { type: 'p', text: '$h(x) = \\frac{x - 1}{x + 2}$ sur $]-2 \\,;\\, +\\infty[$. $u(x) = x - 1$, $u\'(x) = 1$ ; $v(x) = x + 2$, $v\'(x) = 1$.' },
        { type: 'math', tex: r`h'(x) = \frac{1 \times (x+2) - (x-1) \times 1}{(x+2)^2} = \frac{3}{(x+2)^2}.` },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Pièges',
      content: [
        {
          type: 'list',
          items: [
            'Dans $u\'v - uv\'$, l’ordre compte (signe « moins ») ; et il faut des **parenthèses** : $-(x-1) \\times 1 = -x + 1$.',
            'Penser au facteur $a$ dans $g(ax+b)$ : $\\left((1 - x)^3\\right)\' = -3(1-x)^2$, pas $3(1-x)^2$.',
            'Toujours préciser l’intervalle de dérivabilité (dénominateur non nul, radicande strictement positif).',
            '$\\frac{k}{x}$ se dérive comme $k \\times \\frac{1}{x}$ : $\\left(\\frac{3}{x}\\right)\' = -\\frac{3}{x^2}$, inutile d’utiliser le quotient.',
          ],
        },
      ],
    },

    { type: 'h2', text: '8. Approche algorithmique' },
    {
      type: 'p',
      text: 'On peut **approcher** un nombre dérivé en calculant le taux de variation pour des valeurs de $h$ de plus en plus petites.',
    },
    {
      type: 'code',
      lang: 'python',
      caption: 'Taux de variation de f(x) = x³ en a = 2 pour h = 0,1 ; 0,01 ; 0,001…',
      code: `def f(x):
    return x**3

def taux(f, a, h):
    return (f(a + h) - f(a)) / h

for k in range(1, 6):
    h = 10**(-k)
    print(h, taux(f, 2, h))

# 0.1     12.61...
# 0.01    12.0601...
# 0.001   12.006001...   -> f'(2) = 3 × 2² = 12`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Limite de l’ordinateur',
      content: [{ type: 'p', text: 'Pour $h$ extrêmement petit ($10^{-15}$), les erreurs d’arrondi des flottants rendent le résultat faux : le calcul numérique ne remplace pas la limite exacte.' }],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Un peu d’histoire',
      content: [{ type: 'p', text: 'Le calcul différentiel est inventé indépendamment par **Newton** (« fluxions », vers 1665–1671) et **Leibniz** (publication en 1684), ce qui déclencha une célèbre querelle de priorité. La notation $f\'$ est due à **Lagrange** (1797), la notation $\\frac{dy}{dx}$ à Leibniz. La définition rigoureuse par les limites date du XIXᵉ siècle (Cauchy, Weierstrass).' }],
    },
  ],

  // =========================================================================
  // EXERCICES
  // =========================================================================
  exercices: [
    {
      id: 'de-ex1',
      title: 'Nombre dérivé par le taux de variation',
      difficulty: 1,
      duration: 12,
      tags: ['taux de variation', 'nombre dérivé'],
      statement: [
        { type: 'list', ordered: true, items: ['Soit $f(x) = x^2 - 3x$. Calculer, pour $h \\neq 0$, le taux de variation de $f$ entre $2$ et $2 + h$. En déduire $f\'(2)$.', 'Soit $g(x) = \\dfrac{3}{x}$. Montrer que $g$ est dérivable en $1$ et calculer $g\'(1)$.'] },
      ],
      hints: ['$f(2+h) = (2+h)^2 - 3(2+h)$.', 'Pour $g$ : mettre au même dénominateur $\\frac{3}{1+h} - 3$.'],
      solution: [
        { type: 'p', text: '**1.** $f(2+h) = 4 + 4h + h^2 - 6 - 3h = h^2 + h - 2$ et $f(2) = 4 - 6 = -2$.' },
        { type: 'math', tex: r`\frac{f(2+h) - f(2)}{h} = \frac{h^2 + h}{h} = h + 1 \xrightarrow[h \to 0]{} 1` },
        { type: 'p', text: 'Donc $f$ est dérivable en $2$ et $f\'(2) = 1$. (Contrôle : $f\'(x) = 2x - 3$, $f\'(2) = 1$ ✔.)' },
        { type: 'p', text: '**2.** Pour $h \\neq 0$, $h > -1$ :' },
        { type: 'math', tex: r`\frac{g(1+h) - g(1)}{h} = \frac{1}{h}\left(\frac{3}{1+h} - 3\right) = \frac{1}{h} \times \frac{3 - 3 - 3h}{1+h} = \frac{-3}{1+h} \xrightarrow[h \to 0]{} -3.` },
        { type: 'p', text: '$g$ est dérivable en $1$ et $g\'(1) = -3$.' },
      ],
    },
    {
      id: 'de-ex2',
      title: 'Dérivées usuelles et sommes',
      difficulty: 1,
      duration: 10,
      tags: ['calcul de dérivées'],
      statement: [
        { type: 'p', text: 'Calculer la dérivée de chaque fonction (on précisera l’intervalle de dérivabilité).' },
        { type: 'list', items: ['a) $f(x) = 4x^3 - 2x^2 + 7x - 1$', 'b) $g(x) = \\dfrac{3}{x} + x^2$', 'c) $h(x) = 5\\sqrt{x} - 2x$', 'd) $k(x) = \\dfrac{x^6}{3}$', 'e) $m(x) = \\dfrac{1}{x^3}$'] },
      ],
      solution: [
        { type: 'p', text: '**a)** Sur $\\mathbb{R}$ : $f\'(x) = 12x^2 - 4x + 7$.' },
        { type: 'p', text: '**b)** Sur $]-\\infty \\,;\\, 0[$ et sur $]0 \\,;\\, +\\infty[$ : $g\'(x) = -\\dfrac{3}{x^2} + 2x$.' },
        { type: 'p', text: '**c)** Sur $]0 \\,;\\, +\\infty[$ : $h\'(x) = \\dfrac{5}{2\\sqrt{x}} - 2$.' },
        { type: 'p', text: '**d)** Sur $\\mathbb{R}$ : $k\'(x) = \\dfrac{6x^5}{3} = 2x^5$.' },
        { type: 'p', text: '**e)** Sur $]-\\infty \\,;\\, 0[$ et sur $]0 \\,;\\, +\\infty[$ : $m\'(x) = -\\dfrac{3}{x^4}$.' },
      ],
    },
    {
      id: 'de-ex3',
      title: 'Équation d’une tangente',
      difficulty: 1,
      duration: 10,
      tags: ['tangente'],
      statement: [
        { type: 'list', ordered: true, items: ['Déterminer une équation de la tangente à la courbe de $f(x) = x^3 - 2x$ au point d’abscisse $1$.', 'Déterminer une équation de la tangente à la courbe de $g(x) = \\sqrt{x}$ au point d’abscisse $4$. En déduire une valeur approchée de $\\sqrt{4{,}1}$.'] },
      ],
      solution: [
        { type: 'p', text: '**1.** $f(1) = 1 - 2 = -1$ ; $f\'(x) = 3x^2 - 2$ donc $f\'(1) = 1$. Tangente : $y = 1 \\times (x - 1) + (-1)$, soit $y = x - 2$.' },
        { type: 'p', text: '**2.** $g(4) = 2$ ; $g\'(x) = \\frac{1}{2\\sqrt{x}}$ donc $g\'(4) = \\frac{1}{4}$. Tangente : $y = \\frac{1}{4}(x - 4) + 2 = \\frac{1}{4}x + 1$.' },
        { type: 'p', text: 'Près de $4$, la courbe est proche de sa tangente : $\\sqrt{4{,}1} \\approx \\frac{4{,}1}{4} + 1 = 2{,}025$ (valeur exacte $\\approx 2{,}0248$).' },
      ],
    },
    {
      id: 'de-ex4',
      title: 'Produits et quotients',
      difficulty: 2,
      duration: 15,
      tags: ['produit', 'quotient'],
      statement: [
        { type: 'p', text: 'Calculer la dérivée des fonctions suivantes sur l’intervalle indiqué.' },
        { type: 'list', items: ['a) $f(x) = (x^2 + 1)(3x - 2)$ sur $\\mathbb{R}$', 'b) $g(x) = x\\sqrt{x}$ sur $]0 \\,;\\, +\\infty[$', 'c) $h(x) = \\dfrac{2x + 3}{x - 1}$ sur $]1 \\,;\\, +\\infty[$', 'd) $k(x) = \\dfrac{1}{x^2 + 1}$ sur $\\mathbb{R}$', 'e) $m(x) = \\dfrac{x^2}{x + 1}$ sur $]-1 \\,;\\, +\\infty[$'] },
      ],
      hints: ['Écrire $u$, $u\'$, $v$, $v\'$ avant d’appliquer la formule.', 'd) Utiliser $\\left(\\frac{1}{v}\\right)\' = -\\frac{v\'}{v^2}$.'],
      solution: [
        { type: 'p', text: '**a)** $u = x^2 + 1$, $u\' = 2x$, $v = 3x - 2$, $v\' = 3$ : $f\'(x) = 2x(3x - 2) + 3(x^2 + 1) = 6x^2 - 4x + 3x^2 + 3 = 9x^2 - 4x + 3$. (Contrôle en développant d’abord : $f(x) = 3x^3 - 2x^2 + 3x - 2$ ✔.)' },
        { type: 'p', text: '**b)** $u = x$, $v = \\sqrt{x}$ : $g\'(x) = \\sqrt{x} + x \\times \\dfrac{1}{2\\sqrt{x}} = \\sqrt{x} + \\dfrac{\\sqrt{x}}{2} = \\dfrac{3}{2}\\sqrt{x}$.' },
        { type: 'p', text: '**c)** $u = 2x + 3$, $u\' = 2$, $v = x - 1$, $v\' = 1$ :' },
        { type: 'math', tex: r`h'(x) = \frac{2(x-1) - (2x+3) \times 1}{(x-1)^2} = \frac{2x - 2 - 2x - 3}{(x-1)^2} = \frac{-5}{(x-1)^2}.` },
        { type: 'p', text: '**d)** $v = x^2 + 1$ (jamais nul), $v\' = 2x$ : $k\'(x) = -\\dfrac{2x}{(x^2+1)^2}$.' },
        { type: 'p', text: '**e)** $u = x^2$, $u\' = 2x$, $v = x + 1$, $v\' = 1$ :' },
        { type: 'math', tex: r`m'(x) = \frac{2x(x+1) - x^2}{(x+1)^2} = \frac{x^2 + 2x}{(x+1)^2} = \frac{x(x+2)}{(x+1)^2}.` },
      ],
    },
    {
      id: 'de-ex5',
      title: 'Composées avec une fonction affine',
      difficulty: 2,
      duration: 12,
      tags: ['composée'],
      statement: [
        { type: 'p', text: 'Calculer la dérivée des fonctions suivantes.' },
        { type: 'list', items: ['a) $f(x) = (2x - 1)^3$ sur $\\mathbb{R}$', 'b) $g(x) = \\sqrt{3 - x}$ sur $]-\\infty \\,;\\, 3[$', 'c) $h(x) = \\dfrac{1}{5x + 2}$ sur $\\left]-\\frac{2}{5} \\,;\\, +\\infty\\right[$', 'd) $k(x) = (1 - 4x)^2$ sur $\\mathbb{R}$ (de deux façons)'] },
      ],
      hints: ['$\\left(g(ax+b)\\right)\' = a \\, g\'(ax+b)$ : ne pas oublier le facteur $a$.'],
      solution: [
        { type: 'p', text: '**a)** $a = 2$, $g(X) = X^3$ : $f\'(x) = 2 \\times 3(2x-1)^2 = 6(2x-1)^2$.' },
        { type: 'p', text: '**b)** $a = -1$, $g(X) = \\sqrt{X}$ : $g\'(x) = -1 \\times \\dfrac{1}{2\\sqrt{3 - x}} = -\\dfrac{1}{2\\sqrt{3-x}}$.' },
        { type: 'p', text: '**c)** $a = 5$, $g(X) = \\frac{1}{X}$ : $h\'(x) = 5 \\times \\left(-\\dfrac{1}{(5x+2)^2}\\right) = -\\dfrac{5}{(5x+2)^2}$.' },
        { type: 'p', text: '**d)** Composée : $k\'(x) = -4 \\times 2(1 - 4x) = -8(1-4x) = 32x - 8$. En développant : $k(x) = 1 - 8x + 16x^2$, $k\'(x) = -8 + 32x$. ✔' },
      ],
    },
    {
      id: 'de-ex6',
      title: 'Lecture graphique',
      difficulty: 2,
      duration: 15,
      tags: ['lecture graphique', 'tangente'],
      statement: [
        { type: 'p', text: 'On a tracé ci-dessous la courbe $\\mathcal{C}_f$ d’une fonction $f$ dérivable sur $\\mathbb{R}$ et ses tangentes aux points $A$, $B$ et $C$ d’abscisses respectives $0$, $4$ et $6$. La tangente en $A$ passe par $P(1 \\,;\\, 3)$, la tangente en $B$ est horizontale et la tangente en $C$ passe par $Q(8 \\,;\\, 2)$.' },
        { type: 'svg', svg: svgLecture, maxWidth: 640 },
        {
          type: 'list',
          ordered: true,
          items: [
            'Lire $f(0)$, $f(4)$ et $f(6)$.',
            'Déterminer $f\'(0)$, $f\'(4)$ et $f\'(6)$.',
            'Donner une équation de chacune des trois tangentes.',
            'On admet que $f(x) = -\\frac{1}{4}x^2 + 2x + 1$. Vérifier les résultats précédents par le calcul.',
          ],
        },
      ],
      hints: ['Coefficient directeur de $(AP)$ : $\\frac{y_P - y_A}{x_P - x_A}$.'],
      solution: [
        { type: 'p', text: '**1.** $f(0) = 1$, $f(4) = 5$, $f(6) = 4$.' },
        { type: 'p', text: '**2.** $f\'(0)$ est le coefficient directeur de $(AP)$ : $\\frac{3 - 1}{1 - 0} = 2$. La tangente en $B$ est horizontale : $f\'(4) = 0$. Tangente en $C$ : $\\frac{2 - 4}{8 - 6} = -1$, donc $f\'(6) = -1$.' },
        { type: 'p', text: '**3.** En $A$ : $y = 2x + 1$. En $B$ : $y = 5$. En $C$ : $y = -1(x - 6) + 4 = -x + 10$.' },
        { type: 'p', text: '**4.** $f(0) = 1$, $f(4) = -4 + 8 + 1 = 5$, $f(6) = -9 + 12 + 1 = 4$ ✔. $f\'(x) = -\\frac{1}{2}x + 2$ : $f\'(0) = 2$, $f\'(4) = 0$, $f\'(6) = -3 + 2 = -1$ ✔.' },
      ],
    },
    {
      id: 'de-ex7',
      title: 'Dérivabilité en un point',
      difficulty: 2,
      duration: 15,
      tags: ['non-dérivabilité', 'démonstration'],
      statement: [
        { type: 'list', ordered: true, items: ['Soit $f(x) = x\\sqrt{x}$ sur $[0 \\,;\\, +\\infty[$. Montrer que $f$ est dérivable en $0$ et donner $f\'(0)$. Interpréter graphiquement.', 'Soit $g(x) = |x - 2|$. Calculer le taux de variation de $g$ entre $2$ et $2 + h$ selon le signe de $h$. La fonction $g$ est-elle dérivable en $2$ ?', 'La fonction $k(x) = \\sqrt{x - 1}$ est-elle dérivable en $1$ ?'] },
      ],
      solution: [
        { type: 'p', text: '**1.** Pour $h > 0$ : $\\dfrac{f(h) - f(0)}{h} = \\dfrac{h\\sqrt{h}}{h} = \\sqrt{h} \\xrightarrow[h \\to 0]{} 0$. Donc $f$ est dérivable en $0$ et $f\'(0) = 0$ : la courbe admet en l’origine une tangente **horizontale** (l’axe des abscisses), contrairement à $\\sqrt{x}$.' },
        { type: 'p', text: '**2.** $\\dfrac{g(2+h) - g(2)}{h} = \\dfrac{|h|}{h}$, qui vaut $1$ si $h > 0$ et $-1$ si $h < 0$. Le taux n’a pas de limite unique quand $h \\to 0$ : $g$ n’est **pas dérivable en $2$** (point anguleux en $(2 \\,;\\, 0)$).' },
        { type: 'p', text: '**3.** Pour $h > 0$ : $\\dfrac{k(1+h) - k(1)}{h} = \\dfrac{\\sqrt{h}}{h} = \\dfrac{1}{\\sqrt{h}} \\to +\\infty$. Non dérivable en $1$ (tangente verticale). Attention : la formule $(\\sqrt{ax+b})\' = \\frac{a}{2\\sqrt{ax+b}}$ n’est valable que là où $ax + b > 0$.' },
      ],
    },
    {
      id: 'de-ex8',
      title: 'Python — Approcher un nombre dérivé',
      difficulty: 2,
      duration: 20,
      tags: ['Python', 'algorithmique'],
      statement: [
        { type: 'p', text: 'On considère le programme suivant.' },
        {
          type: 'code',
          lang: 'python',
          code: `def f(x):
    return x**3

def taux(a, h):
    return (f(a + h) - f(a)) / h

h = 1
while h > 0.0001:
    h = h / 10
    print(h, taux(2, h))`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Combien de lignes le programme affiche-t-il ? Quelles valeurs de $h$ sont utilisées ?',
            'Calculer à la main les valeurs affichées pour $h = 0{,}1$ et $h = 0{,}01$.',
            'Montrer que, pour $h \\neq 0$, $\\frac{f(2+h) - f(2)}{h} = 12 + 6h + h^2$. Conclure.',
            'Modifier le programme pour afficher une approximation de $g\'(4)$ où $g(x) = \\sqrt{x}$ (on importera `sqrt` du module `math`).',
          ],
        },
      ],
      hints: ['La boucle s’arrête dès que $h \\leq 0{,}0001$.', '$(2+h)^3 = 8 + 12h + 6h^2 + h^3$.'],
      solution: [
        { type: 'p', text: '**1.** $h$ prend successivement les valeurs $0{,}1$ ; $0{,}01$ ; $0{,}001$ ; $0{,}0001$ (après ce passage, $h \\leq 0{,}0001$ et la boucle s’arrête) : **4 lignes**. (En pratique, les flottants donnent $h \\approx 0{,}0001$ à $10^{-20}$ près, sans changer la conclusion.)' },
        { type: 'p', text: '**2.** $h = 0{,}1$ : $\\frac{2{,}1^3 - 8}{0{,}1} = \\frac{9{,}261 - 8}{0{,}1} = 12{,}61$. $h = 0{,}01$ : $\\frac{2{,}01^3 - 8}{0{,}01} = \\frac{8{,}120601 - 8}{0{,}01} = 12{,}0601$.' },
        { type: 'p', text: '**3.** $\\frac{(2+h)^3 - 8}{h} = \\frac{12h + 6h^2 + h^3}{h} = 12 + 6h + h^2 \\xrightarrow[h \\to 0]{} 12$. Donc $f\'(2) = 12$, ce qui confirme $f\'(x) = 3x^2$. Les valeurs affichées se rapprochent de $12$.' },
        {
          type: 'code',
          lang: 'python',
          code: `from math import sqrt

def g(x):
    return sqrt(x)

def taux(a, h):
    return (g(a + h) - g(a)) / h

h = 1
while h > 0.0001:
    h = h / 10
    print(h, taux(4, h))     # se rapproche de 1/(2*sqrt(4)) = 0.25`,
        },
      ],
    },
    {
      id: 'de-ex9',
      title: 'Type bac — Étude d’une fonction rationnelle',
      difficulty: 3,
      duration: 30,
      tags: ['quotient', 'tangente', 'type bac'],
      statement: [
        { type: 'p', text: 'Soit $f$ la fonction définie sur $]1 \\,;\\, +\\infty[$ par $f(x) = \\dfrac{x^2 + 3}{x - 1}$, et $\\mathcal{C}$ sa courbe représentative.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Montrer que pour tout $x > 1$, $f\'(x) = \\dfrac{x^2 - 2x - 3}{(x-1)^2}$.',
            'Déterminer une équation de la tangente $T$ à $\\mathcal{C}$ au point d’abscisse $2$.',
            'Déterminer les points de $\\mathcal{C}$ en lesquels la tangente est horizontale.',
            'Existe-t-il des points de $\\mathcal{C}$ en lesquels la tangente est parallèle à la droite $\\Delta$ d’équation $y = x$ ?',
            'Étudier le signe de $f\'(x)$ sur $]1 \\,;\\, +\\infty[$ (on utilisera le chapitre « Second degré »).',
          ],
        },
      ],
      hints: ['Quotient : $u = x^2 + 3$, $v = x - 1$.', 'Tangente horizontale : $f\'(x) = 0$.', 'Parallèle à $y = x$ : $f\'(x) = 1$.'],
      solution: [
        { type: 'p', text: '**1.** $u(x) = x^2 + 3$, $u\'(x) = 2x$, $v(x) = x - 1$ (non nul sur $]1 \\,;\\, +\\infty[$), $v\'(x) = 1$ :' },
        { type: 'math', tex: r`f'(x) = \frac{2x(x-1) - (x^2 + 3)}{(x-1)^2} = \frac{2x^2 - 2x - x^2 - 3}{(x-1)^2} = \frac{x^2 - 2x - 3}{(x-1)^2}.` },
        { type: 'p', text: '**2.** $f(2) = \\frac{4 + 3}{1} = 7$ et $f\'(2) = \\frac{4 - 4 - 3}{1} = -3$. $T : y = -3(x - 2) + 7$, soit $y = -3x + 13$.' },
        { type: 'p', text: '**3.** $f\'(x) = 0 \\iff x^2 - 2x - 3 = 0$ ($\\Delta = 16$, racines $-1$ et $3$). Sur $]1 \\,;\\, +\\infty[$ seule $x = 3$ convient : $f(3) = \\frac{12}{2} = 6$. Tangente horizontale au point $(3 \\,;\\, 6)$, d’équation $y = 6$.' },
        { type: 'p', text: '**4.** On cherche $x > 1$ tel que $f\'(x) = 1$ :' },
        { type: 'math', tex: r`\frac{x^2 - 2x - 3}{(x-1)^2} = 1 \iff x^2 - 2x - 3 = x^2 - 2x + 1 \iff -3 = 1.` },
        { type: 'p', text: 'C’est impossible : **aucune** tangente n’est parallèle à $\\Delta$.' },
        { type: 'p', text: '**5.** $(x-1)^2 > 0$ donc $f\'(x)$ a le signe de $x^2 - 2x - 3 = (x+1)(x-3)$, positif à l’extérieur de $[-1 \\,;\\, 3]$. Sur $]1 \\,;\\, +\\infty[$ : $f\'(x) < 0$ sur $]1 \\,;\\, 3[$, $f\'(3) = 0$, $f\'(x) > 0$ sur $]3 \\,;\\, +\\infty[$. (On verra que $f$ admet donc un minimum $6$ en $3$.)' },
      ],
    },
    {
      id: 'de-ex10',
      title: 'Type bac — Tangentes passant par un point donné',
      difficulty: 3,
      duration: 25,
      tags: ['tangente', 'second degré', 'type bac'],
      statement: [
        { type: 'p', text: 'Soit $\\mathcal{P}$ la parabole d’équation $y = x^2$ et $E(0 \\,;\\, -1)$.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Montrer que la tangente $T_a$ à $\\mathcal{P}$ au point d’abscisse $a$ a pour équation $y = 2ax - a^2$.',
            'Déterminer les valeurs de $a$ pour lesquelles $T_a$ passe par $E$. Donner les équations des tangentes correspondantes.',
            'Plus généralement, combien de tangentes à $\\mathcal{P}$ passent par le point $M(1 \\,;\\, k)$ selon la valeur du réel $k$ ?',
          ],
        },
      ],
      hints: ['$E \\in T_a \\iff -1 = 2a \\times 0 - a^2$.', '3. Écrire $k = 2a - a^2$ et étudier le discriminant de $a^2 - 2a + k = 0$.'],
      solution: [
        { type: 'p', text: '**1.** $f(x) = x^2$, $f\'(a) = 2a$ : $T_a : y = 2a(x - a) + a^2 = 2ax - a^2$.' },
        { type: 'p', text: '**2.** $E \\in T_a \\iff -1 = -a^2 \\iff a^2 = 1 \\iff a = 1$ ou $a = -1$. Tangentes : $T_1 : y = 2x - 1$ et $T_{-1} : y = -2x - 1$.' },
        { type: 'p', text: '**3.** $M(1 \\,;\\, k) \\in T_a \\iff k = 2a - a^2 \\iff a^2 - 2a + k = 0$ (équation d’inconnue $a$). $\\Delta = 4 - 4k = 4(1 - k)$.' },
        {
          type: 'list',
          items: [
            'Si $k < 1$ ($M$ « sous » la parabole) : $\\Delta > 0$, **deux** tangentes passent par $M$.',
            'Si $k = 1$ ($M = (1 \\,;\\, 1) \\in \\mathcal{P}$) : **une seule** tangente ($a = 1$, $y = 2x - 1$).',
            'Si $k > 1$ ($M$ « au-dessus », à l’intérieur de la parabole) : **aucune** tangente.',
          ],
        },
      ],
    },
    {
      id: 'de-ex11',
      title: 'Retrouver un trinôme',
      difficulty: 3,
      duration: 20,
      tags: ['tangente', 'système'],
      statement: [
        { type: 'p', text: 'On cherche une fonction $f(x) = ax^2 + bx + c$ dont la courbe passe par $A(0 \\,;\\, 1)$ et $B(1 \\,;\\, 0)$, et dont la tangente en $A$ a pour coefficient directeur $2$.' },
        { type: 'list', ordered: true, items: ['Traduire les conditions par trois équations et déterminer $a$, $b$, $c$.', 'Déterminer le point de la courbe où la tangente est horizontale.', 'Donner une équation de la tangente en $B$.'] },
      ],
      solution: [
        { type: 'p', text: '**1.** $f\'(x) = 2ax + b$. $f(0) = 1 \\iff c = 1$ ; $f\'(0) = 2 \\iff b = 2$ ; $f(1) = 0 \\iff a + b + c = 0 \\iff a = -3$. Donc $f(x) = -3x^2 + 2x + 1$.' },
        { type: 'p', text: '**2.** $f\'(x) = -6x + 2 = 0 \\iff x = \\frac{1}{3}$, et $f\\left(\\frac{1}{3}\\right) = -\\frac{1}{3} + \\frac{2}{3} + 1 = \\frac{4}{3}$. Point $\\left(\\frac{1}{3} \\,;\\, \\frac{4}{3}\\right)$ (le sommet de la parabole).' },
        { type: 'p', text: '**3.** $f\'(1) = -4$, $f(1) = 0$ : $y = -4(x - 1) = -4x + 4$.' },
      ],
    },
  ],

  // =========================================================================
  // REPRÉSENTATIONS
  // =========================================================================
  representations: [
    {
      type: 'widget',
      id: 'tangent-explorer',
      title: 'De la sécante à la tangente',
      props: { expression: 'x^2/2', a: 1 },
      caption: 'Faites tendre $h$ vers $0$ : le coefficient directeur de la sécante se rapproche de $f\'(1) = 1$.',
    },
    {
      type: 'widget',
      id: 'tangent-explorer',
      title: 'Racine carrée : que se passe-t-il en 0 ?',
      props: { expression: 'sqrt(x)', a: 0 },
      caption: 'En $a = 0$, le taux $\\frac{1}{\\sqrt{h}}$ explose : tangente verticale, pas de nombre dérivé. Comparez avec $a = 1$.',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Tangente mobile à la parabole $y = x^2$',
      props: {
        expressions: ['x^2', '2*a*(x-a)+a^2'],
        params: [{ name: 'a', min: -3, max: 3, step: 0.1, value: 1 }],
        xMin: -4,
        xMax: 4,
        yMin: -3,
        yMax: 10,
      },
      caption: 'La droite $y = f\'(a)(x - a) + f(a) = 2a(x - a) + a^2$ reste tangente à la parabole quand $a$ varie.',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Une fonction et sa dérivée',
      props: { expressions: ['x^3-3x'], showDerivative: true, xMin: -3, xMax: 3, yMin: -5, yMax: 5 },
      caption: 'Comparez la courbe de $f(x) = x^3 - 3x$ et celle de $f\'(x) = 3x^2 - 3$ : où $f\'$ s’annule-t-elle ? Que fait $f$ à ces endroits ?',
    },
    { type: 'svg', svg: svgSecantes, caption: 'Sécantes et tangente.', maxWidth: 640 },
    { type: 'svg', svg: svgNonDerivable, caption: 'Deux cas de non-dérivabilité en 0.', maxWidth: 640 },
    {
      type: 'qcm',
      questions: [
        { question: 'Si $f(x) = x^4$, alors $f\'(x) =$', choices: ['$4x^3$', '$4x^4$', '$x^3$', '$3x^4$'], answer: 0, explanation: '$(x^n)\' = nx^{n-1}$.' },
        { question: 'La dérivée de $\\frac{1}{x}$ est :', choices: ['$-\\frac{1}{x^2}$', '$\\frac{1}{x^2}$', '$\\ln x$', '$-\\frac{1}{x}$'], answer: 0 },
        { question: 'La tangente en $a$ a pour équation :', choices: ['$y = f\'(a)(x - a) + f(a)$', '$y = f(a)(x - a) + f\'(a)$', '$y = f\'(x)(x - a) + f(a)$', '$y = f\'(a)x + f(a)$'], answer: 0 },
        { question: 'Si $f(x) = (x^2 + 1)(x - 3)$, alors $f\'(1) =$', choices: ['$-2$', '$2$', '$-4$', '$0$'], answer: 0, explanation: '$f\'(x) = 2x(x-3) + (x^2+1)$, $f\'(1) = 2 \\times (-2) + 2 = -2$.' },
        { question: 'La dérivée de $\\sqrt{2x + 1}$ (là où $2x+1 > 0$) est :', choices: ['$\\frac{1}{\\sqrt{2x+1}}$', '$\\frac{1}{2\\sqrt{2x+1}}$', '$\\frac{2}{\\sqrt{2x+1}}$', '$2\\sqrt{2x+1}$'], answer: 0, explanation: '$2 \\times \\frac{1}{2\\sqrt{2x+1}} = \\frac{1}{\\sqrt{2x+1}}$.' },
        { question: 'Le taux de variation de $f(x) = x^2$ entre $3$ et $3 + h$ vaut :', choices: ['$6 + h$', '$6$', '$9 + h$', '$2h + 6h^2$'], answer: 0, explanation: '$\\frac{(3+h)^2 - 9}{h} = \\frac{6h + h^2}{h} = 6 + h$.' },
        { question: 'Quelle fonction n’est pas dérivable en $0$ ?', choices: ['$x \\mapsto |x|$', '$x \\mapsto x^2$', '$x \\mapsto x\\sqrt{x}$ (sur $[0 \\,;\\, +\\infty[$)', '$x \\mapsto 3x + 1$'], answer: 0 },
        { question: 'Si la tangente en $A(2 \\,;\\, 5)$ passe par $(4 \\,;\\, 1)$, alors $f\'(2) =$', choices: ['$-2$', '$2$', '$-\\frac{1}{2}$', '$5$'], answer: 0, explanation: '$\\frac{1 - 5}{4 - 2} = -2$.' },
        { question: 'La dérivée de $\\frac{x}{x+1}$ est :', choices: ['$\\frac{1}{(x+1)^2}$', '$\\frac{-1}{(x+1)^2}$', '$\\frac{2x+1}{(x+1)^2}$', '$1$'], answer: 0, explanation: '$\\frac{(x+1) - x}{(x+1)^2} = \\frac{1}{(x+1)^2}$.' },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Taux de variation de $f$ entre $a$ et $a+h$', back: '$\\dfrac{f(a+h) - f(a)}{h}$' },
        { front: 'Définition de $f\'(a)$', back: '$\\lim\\limits_{h \\to 0} \\dfrac{f(a+h) - f(a)}{h}$ (limite finie)' },
        { front: 'Équation de la tangente en $a$', back: '$y = f\'(a)(x-a) + f(a)$' },
        { front: '$(x^n)\'$', back: '$nx^{n-1}$' },
        { front: '$\\left(\\frac{1}{x}\\right)\'$', back: '$-\\dfrac{1}{x^2}$' },
        { front: '$(\\sqrt{x})\'$', back: '$\\dfrac{1}{2\\sqrt{x}}$ sur $]0 \\,;\\, +\\infty[$' },
        { front: '$(uv)\'$', back: '$u\'v + uv\'$' },
        { front: '$\\left(\\frac{1}{v}\\right)\'$', back: '$-\\dfrac{v\'}{v^2}$' },
        { front: '$\\left(\\frac{u}{v}\\right)\'$', back: '$\\dfrac{u\'v - uv\'}{v^2}$' },
        { front: '$\\left(g(ax+b)\\right)\'$', back: '$a\\,g\'(ax+b)$' },
        { front: 'Pourquoi $\\sqrt{\\ }$ n’est pas dérivable en 0 ?', back: '$\\frac{\\sqrt{h}}{h} = \\frac{1}{\\sqrt{h}} \\to +\\infty$ : tangente verticale.' },
        { front: 'Pourquoi $|x|$ n’est pas dérivable en 0 ?', back: '$\\frac{|h|}{h} = \\pm 1$ selon le signe de $h$ : pas de limite (point anguleux).' },
        { front: 'Tangente horizontale en $a$', back: '$f\'(a) = 0$' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque fonction à sa dérivée',
      pairs: [
        { left: '$x^5$', right: '$5x^4$' },
        { left: '$\\frac{2}{x}$', right: '$-\\frac{2}{x^2}$' },
        { left: '$\\sqrt{x}$', right: '$\\frac{1}{2\\sqrt{x}}$' },
        { left: '$(2x+1)^2$', right: '$4(2x+1)$' },
        { left: '$x\\sqrt{x}$', right: '$\\frac{3}{2}\\sqrt{x}$' },
        { left: '$\\frac{1}{x^2}$', right: '$-\\frac{2}{x^3}$' },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Si $f\'(a) = 0$, la tangente au point d’abscisse $a$ est horizontale.', answer: true },
        { text: '$(uv)\' = u\'v\'$.', answer: false, explanation: '$(uv)\' = u\'v + uv\'$ ; par exemple $(x \\cdot x)\' = 2x \\neq 1 \\times 1$.' },
        { text: 'La fonction racine carrée est définie et dérivable sur $[0 \\,;\\, +\\infty[$.', answer: false, explanation: 'Définie sur $[0 \\,;\\, +\\infty[$ mais dérivable seulement sur $]0 \\,;\\, +\\infty[$.' },
        { text: 'La dérivée de $(1 - x)^3$ est $-3(1-x)^2$.', answer: true, explanation: 'Composée avec $a = -1$.' },
        { text: 'Le nombre dérivé $f\'(a)$ est le coefficient directeur de la tangente en $A(a \\,;\\, f(a))$.', answer: true },
        { text: 'Une fonction définie en $a$ est toujours dérivable en $a$.', answer: false, explanation: 'Contre-exemples : $|x|$ et $\\sqrt{x}$ en $0$.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'Le nombre dérivé de $f$ en $a$ est la limite, quand $h$ tend vers {{0|zéro}}, du taux de variation. Il est égal au coefficient {{directeur}} de la tangente. La dérivée de $x^3$ est {{3x^2|3x²|3x^{2}}}. La dérivée de $\\frac{u}{v}$ a pour dénominateur {{v^2|v²|v^{2}}}.',
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre : déterminer la tangente en $a$',
      items: ['Calculer $f(a)$', 'Calculer $f\'(x)$', 'En déduire $f\'(a)$', 'Écrire $y = f\'(a)(x - a) + f(a)$', 'Développer et réduire sous la forme $y = mx + p$'],
    },
  ],
}

export default chapter
