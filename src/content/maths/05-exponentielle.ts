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

function curve(F: Frame, f: (x: number) => number, a: number, b: number, n = 120): string {
  const pts: string[] = []
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n
    pts.push(`${X(F, x)},${Y(F, f(x))}`)
  }
  return 'M' + pts.join(' L')
}

function axes(F: Frame, xt: number[], yt: number[]): string {
  let s = ''
  for (const t of xt) s += `<line x1="${X(F, t)}" y1="${F.T}" x2="${X(F, t)}" y2="${F.T + F.H}" stroke="currentColor" opacity="0.1"/>`
  for (const t of yt) s += `<line x1="${F.L}" y1="${Y(F, t)}" x2="${F.L + F.W}" y2="${Y(F, t)}" stroke="currentColor" opacity="0.1"/>`
  const ox = X(F, 0)
  const oy = Y(F, 0)
  s += `<line x1="${F.L}" y1="${oy}" x2="${F.L + F.W}" y2="${oy}" stroke="currentColor" stroke-width="1.2"/>`
  s += `<line x1="${ox}" y1="${F.T + F.H}" x2="${ox}" y2="${F.T}" stroke="currentColor" stroke-width="1.2"/>`
  for (const t of xt) if (t !== 0) s += `<text x="${X(F, t)}" y="${oy + 14}" text-anchor="middle" fill="currentColor" opacity="0.75" font-size="11">${String(t).replace('-', '−')}</text>`
  for (const t of yt) if (t !== 0) s += `<text x="${ox - 5}" y="${Y(F, t) + 4}" text-anchor="end" fill="currentColor" opacity="0.75" font-size="11">${String(t).replace('-', '−')}</text>`
  return s
}

// ---------------------------------------------------------------------------
// Schéma 1 : courbe de exp et tangentes en 0 et en 1
// ---------------------------------------------------------------------------
const F1: Frame = { x0: -3.5, x1: 2.2, y0: -1.5, y1: 7.5, L: 20, T: 15, W: 380, H: 280 }
const svgCourbe = `<svg viewBox="0 0 640 310" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
<defs><clipPath id="m5-c1"><rect x="${F1.L}" y="${F1.T}" width="${F1.W}" height="${F1.H}"/></clipPath></defs>
${axes(F1, [-3, -2, -1, 1, 2], [-1, 1, 2, 3, 4, 5, 6, 7])}
<g clip-path="url(#m5-c1)">
<path d="${curve(F1, Math.exp, -3.5, 2.2)}" fill="none" stroke="${BLUE}" stroke-width="2.5"/>
<path d="${curve(F1, (x) => x + 1, -3.5, 2.2, 2)}" fill="none" stroke="${ORANGE}" stroke-width="1.8"/>
<path d="${curve(F1, (x) => Math.E * x, -3.5, 2.2, 2)}" fill="none" stroke="${GREEN}" stroke-width="1.8" stroke-dasharray="6 3"/>
</g>
<circle cx="${X(F1, 0)}" cy="${Y(F1, 1)}" r="4.5" fill="${ORANGE}"/>
<circle cx="${X(F1, 1)}" cy="${Y(F1, Math.E)}" r="4.5" fill="${GREEN}"/>
<text x="${X(F1, 0) + 8}" y="${Y(F1, 1) + 16}" fill="${ORANGE}">(0 ; 1)</text>
<text x="${X(F1, 1) + 8}" y="${Y(F1, Math.E) + 14}" fill="${GREEN}">(1 ; e)</text>
<g fill="currentColor">
<text x="420" y="40" font-weight="600" fill="${BLUE}">y = eˣ</text>
<text x="420" y="64" fill="${ORANGE}">Tangente en 0 : y = x + 1</text>
<text x="420" y="84" fill="${GREEN}">Tangente en 1 : y = e·x</text>
<text x="420" y="84" dy="18" fill="${GREEN}" font-size="11">(passe par l’origine)</text>
<text x="420" y="134">• eˣ &gt; 0 pour tout réel x</text>
<text x="420" y="156">• strictement croissante</text>
<text x="420" y="178">• e⁰ = 1 et e¹ = e ≈ 2,718</text>
<text x="420" y="200">• la courbe est au-dessus</text>
<text x="432" y="216">de ses tangentes :</text>
<text x="432" y="232">eˣ ≥ x + 1</text>
<text x="420" y="262" opacity="0.8">Vers −∞ : la courbe se</text>
<text x="420" y="278" opacity="0.8">rapproche de l’axe (Ox).</text>
</g>
</svg>`

// ---------------------------------------------------------------------------
// Schéma 2 : méthode d'Euler, pas h = 0,5
// ---------------------------------------------------------------------------
const F2: Frame = { x0: -0.2, x1: 2.2, y0: -0.4, y1: 7.8, L: 30, T: 15, W: 380, H: 270 }
const euler: [number, number][] = [[0, 1], [0.5, 1.5], [1, 2.25], [1.5, 3.375], [2, 5.0625]]
const svgEuler = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
<defs><clipPath id="m5-c2"><rect x="${F2.L}" y="${F2.T}" width="${F2.W}" height="${F2.H}"/></clipPath></defs>
${axes(F2, [0.5, 1, 1.5, 2], [1, 2, 3, 4, 5, 6, 7])}
<g clip-path="url(#m5-c2)">
<path d="${curve(F2, Math.exp, -0.2, 2.2)}" fill="none" stroke="${BLUE}" stroke-width="2.2"/>
<polyline points="${euler.map(([x, y]) => `${X(F2, x)},${Y(F2, y)}`).join(' ')}" fill="none" stroke="${RED}" stroke-width="2"/>
</g>
${euler.map(([x, y]) => `<circle cx="${X(F2, x)}" cy="${Y(F2, y)}" r="4" fill="${RED}"/>`).join('')}
<text x="${X(F2, 2) - 6}" y="${Y(F2, 5.0625) + 18}" fill="${RED}" text-anchor="end">≈ 5,06</text>
<text x="${X(F2, 2) - 6}" y="${Y(F2, Math.exp(2)) - 2}" fill="${BLUE}" text-anchor="end">e² ≈ 7,39</text>
<g fill="currentColor">
<text x="430" y="40" font-weight="600">Méthode d’Euler (h = 0,5)</text>
<text x="430" y="66">On part de (0 ; 1) et on suit</text>
<text x="430" y="82">la tangente sur une longueur h :</text>
<text x="430" y="108" fill="${RED}">yₙ₊₁ = yₙ + h·f′(xₙ)</text>
<text x="430" y="126" fill="${RED}">     = yₙ + h·yₙ = (1 + h)·yₙ</text>
<text x="430" y="156">y₀ = 1 ; y₁ = 1,5 ; y₂ = 2,25 ;</text>
<text x="430" y="172">y₃ = 3,375 ; y₄ = 5,0625</text>
<text x="430" y="202" opacity="0.8">Suite géométrique de raison</text>
<text x="430" y="218" opacity="0.8">1 + h. Plus h est petit, plus</text>
<text x="430" y="234" opacity="0.8">la ligne brisée est proche</text>
<text x="430" y="250" opacity="0.8">de la courbe de exp.</text>
</g>
</svg>`

// ---------------------------------------------------------------------------
// Schéma 3 : famille x ↦ e^{kx}
// ---------------------------------------------------------------------------
const F3: Frame = { x0: -3, x1: 3, y0: -0.5, y1: 5, L: 20, T: 15, W: 380, H: 260 }
const ks: [number, string][] = [[2, RED], [1, BLUE], [0.5, GREEN], [-0.5, ORANGE], [-1, VIOLET]]
const svgFamille = `<svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
<defs><clipPath id="m5-c3"><rect x="${F3.L}" y="${F3.T}" width="${F3.W}" height="${F3.H}"/></clipPath></defs>
${axes(F3, [-3, -2, -1, 1, 2, 3], [1, 2, 3, 4, 5])}
<g clip-path="url(#m5-c3)">
${ks.map(([k, c]) => `<path d="${curve(F3, (x) => Math.exp(k * x), -3, 3)}" fill="none" stroke="${c}" stroke-width="2"/>`).join('')}
</g>
<circle cx="${X(F3, 0)}" cy="${Y(F3, 1)}" r="4" fill="currentColor"/>
<g fill="currentColor">
<text x="420" y="40" font-weight="600">Fonctions x ↦ e^(kx)</text>
${ks.map(([k, c], i) => `<text x="420" y="${68 + 20 * i}" fill="${c}">k = ${String(k).replace('.', ',').replace('-', '−')}</text>`).join('')}
<text x="420" y="180">Toutes passent par (0 ; 1).</text>
<text x="420" y="204">k &gt; 0 : croissante</text>
<text x="420" y="224">k &lt; 0 : décroissante</text>
<text x="420" y="248" opacity="0.8">Dérivée : k·e^(kx), du signe de k</text>
</g>
</svg>`

const chapter: Chapter = {
  id: 'exponentielle',
  subject: 'maths',
  order: 5,
  title: 'Fonction exponentielle',
  theme: 'Analyse',
  summary:
    'La fonction exponentielle, unique fonction égale à sa dérivée et valant 1 en 0 : propriétés algébriques, notation eˣ, signe, variations, courbe, fonctions e^{kx} et e^{ax+b}, lien avec les suites géométriques et modélisation.',
  duration: '3 semaines',
  objectives: [
    'Connaître la définition de la fonction exponentielle (unique fonction dérivable sur ℝ telle que f′ = f et f(0) = 1).',
    'Construire une approximation de la courbe par la méthode d’Euler.',
    'Transformer une expression en utilisant les propriétés algébriques de la fonction exponentielle.',
    'Connaître le signe, le sens de variation et la courbe représentative de la fonction exponentielle.',
    'Pour une valeur numérique strictement positive de k, représenter graphiquement les fonctions t ↦ e^{−kt} et t ↦ e^{kt}.',
    'Dériver des fonctions de la forme x ↦ e^{ax+b} et étudier des fonctions faisant intervenir l’exponentielle.',
    'Reconnaître que la suite (e^{na}) est géométrique.',
    'Résoudre des équations et inéquations du type e^{u} = e^{v}, e^{u} < e^{v}.',
    'Modéliser une situation par une croissance ou une décroissance exponentielle.',
  ],
  keywords: ['exponentielle', 'e', 'f′ = f', 'méthode d’Euler', 'propriétés algébriques', 'eˣ', 'e^{kx}', 'suite géométrique', 'croissance exponentielle', 'décroissance exponentielle'],

  // =========================================================================
  // FICHE
  // =========================================================================
  fiche: [
    { type: 'h2', text: 'Définition' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Théorème-définition',
      content: [
        { type: 'p', text: r`Il existe une **unique** fonction $f$ dérivable sur $\mathbb{R}$ telle que $f' = f$ et $f(0) = 1$. C'est la fonction **exponentielle**, notée $\exp$.` },
        { type: 'p', text: r`On note $e = \exp(1) \approx 2{,}718$ et, pour tout réel $x$, $\exp(x) = e^x$.` },
      ],
    },
    { type: 'h2', text: 'Propriétés algébriques' },
    {
      type: 'table',
      headers: ['Propriété', 'Formule (pour tous réels $a$, $b$, entier relatif $n$)'],
      rows: [
        ['Relation fonctionnelle', r`$e^{a+b} = e^a \times e^b$`],
        ['Inverse', r`$e^{-a} = \dfrac{1}{e^a}$`],
        ['Quotient', r`$e^{a-b} = \dfrac{e^a}{e^b}$`],
        ['Puissance', r`$(e^a)^n = e^{na}$`],
        ['Valeurs', r`$e^0 = 1$, $e^1 = e$, $e^{1/2} = \sqrt{e}$`],
      ],
    },
    { type: 'h2', text: 'Étude de la fonction' },
    {
      type: 'list',
      items: [
        r`**Signe :** pour tout réel $x$, $e^x > 0$.`,
        r`**Dérivée :** $(e^x)' = e^x$ ; **variations :** $\exp$ est strictement croissante sur $\mathbb{R}$.`,
        r`**Comparaison :** $e^a = e^b \iff a = b$ et $e^a < e^b \iff a < b$.`,
        r`**Tangente en 0 :** $y = x + 1$ ; la courbe est au-dessus : $e^x \geqslant x + 1$.`,
        r`**Repères :** $e^x < 1 \iff x < 0$ ; $e^x > 1 \iff x > 0$.`,
      ],
    },
    { type: 'h2', text: 'Fonctions associées' },
    {
      type: 'callout',
      variant: 'property',
      content: [
        { type: 'math', tex: r`\big(e^{kx}\big)' = k\,e^{kx} \qquad \big(e^{ax+b}\big)' = a\,e^{ax+b} \qquad \big(e^{u}\big)' = u'e^u \text{ (pour } u \text{ affine)}` },
        { type: 'p', text: r`$x \mapsto e^{kx}$ est croissante si $k > 0$, décroissante si $k < 0$. La suite $(e^{na})$ est **géométrique** de raison $e^a$ et de premier terme $1$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Réflexes',
      content: [
        {
          type: 'list',
          items: [
            r`Dans $f(x) = u(x)e^x$, mettre $e^x$ en facteur : $f'(x) = \big(u'(x) + u(x)\big)e^x$ a le signe de $u' + u$.`,
            r`Équation $e^{2x} + be^x + c = 0$ : poser $X = e^x > 0$.`,
            r`Méthode d'Euler pour $f' = f$ : $y_{n+1} = (1 + h)\,y_n$.`,
          ],
        },
      ],
    },
  ],

  // =========================================================================
  // COURS
  // =========================================================================
  cours: [
    { type: 'h2', text: '1. Définition de la fonction exponentielle' },
    {
      type: 'p',
      text: r`De nombreux phénomènes (croissance d'une population de bactéries, désintégration radioactive, refroidissement, intérêts composés en continu…) obéissent à une loi du type « la vitesse de variation est proportionnelle à la quantité ». Mathématiquement : $f' = kf$. Le cas le plus simple, $f' = f$, définit une nouvelle fonction de référence.`,
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Théorème-définition (existence admise)',
      content: [
        { type: 'p', text: r`Il existe une **unique** fonction $f$ dérivable sur $\mathbb{R}$ telle que :` },
        { type: 'math', tex: r`f' = f \qquad \text{et} \qquad f(0) = 1.` },
        { type: 'p', text: r`Cette fonction est appelée **fonction exponentielle** et notée $\exp$. Ainsi $\exp' = \exp$ et $\exp(0) = 1$.` },
      ],
    },
    { type: 'h3', text: '1.1 La fonction exponentielle ne s’annule pas' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Propriété',
      content: [{ type: 'p', text: r`Pour tout réel $x$, $\exp(x) \times \exp(-x) = 1$. En particulier, $\exp(x) \neq 0$ et $\exp(-x) = \dfrac{1}{\exp(x)}$.` }],
    },
    {
      type: 'reveal',
      title: 'Démonstration (au programme)',
      content: [
        { type: 'p', text: r`Posons $\varphi(x) = \exp(x)\exp(-x)$. $\varphi$ est dérivable sur $\mathbb{R}$ (produit, et $x \mapsto \exp(-x)$ est de la forme $g(ax+b)$ avec $a = -1$, de dérivée $-\exp(-x)$).` },
        { type: 'math', tex: r`\varphi'(x) = \exp(x)\exp(-x) + \exp(x)\times\big(-\exp(-x)\big) = 0.` },
        { type: 'p', text: r`$\varphi$ a une dérivée nulle sur l'intervalle $\mathbb{R}$ : elle est constante, égale à $\varphi(0) = \exp(0)^2 = 1$. Donc $\exp(x)\exp(-x) = 1$, ce qui interdit $\exp(x) = 0$.` },
      ],
    },
    { type: 'h3', text: '1.2 Unicité' },
    {
      type: 'reveal',
      title: 'Démonstration de l’unicité (au programme)',
      content: [
        { type: 'p', text: r`Soit $g$ une fonction dérivable sur $\mathbb{R}$ telle que $g' = g$ et $g(0) = 1$. Comme $\exp$ ne s'annule pas, on peut poser $h(x) = \dfrac{g(x)}{\exp(x)}$, dérivable sur $\mathbb{R}$ :` },
        { type: 'math', tex: r`h'(x) = \frac{g'(x)\exp(x) - g(x)\exp'(x)}{\exp(x)^2} = \frac{g(x)\exp(x) - g(x)\exp(x)}{\exp(x)^2} = 0.` },
        { type: 'p', text: r`Donc $h$ est constante, égale à $h(0) = \dfrac{g(0)}{\exp(0)} = 1$. Ainsi $g(x) = \exp(x)$ pour tout $x$ : $g = \exp$.` },
      ],
    },
    { type: 'h3', text: '1.3 Approximation par la méthode d’Euler' },
    {
      type: 'p',
      text: r`L'existence est admise, mais on peut **construire** une approximation de la courbe. Pour $h$ petit, l'approximation affine donne $f(x + h) \approx f(x) + h f'(x)$. Avec $f' = f$ : $f(x + h) \approx (1 + h) f(x)$.`,
    },
    {
      type: 'steps',
      items: [
        { title: 'Départ', text: r`$x_0 = 0$, $y_0 = 1$ (car $f(0) = 1$).` },
        { title: 'Itération', text: r`$x_{n+1} = x_n + h$ et $y_{n+1} = y_n + h\,y_n = (1 + h)\,y_n$.` },
        { title: 'Résultat', text: r`$(y_n)$ est géométrique de raison $1 + h$ : $y_n = (1 + h)^n \approx e^{nh}$.` },
      ],
    },
    { type: 'svg', svg: svgEuler, caption: 'Méthode d’Euler avec un pas $h = 0{,}5$ : la ligne brisée approche la courbe de $\\exp$ par en dessous.', maxWidth: 680 },
    {
      type: 'table',
      headers: [r`Pas $h$`, r`Nombre d'étapes jusqu'à $x = 1$`, r`Valeur approchée de $e$ : $(1 + h)^{1/h}$`],
      rows: [
        [r`$1$`, r`$1$`, r`$2$`],
        [r`$0{,}5$`, r`$2$`, r`$2{,}25$`],
        [r`$0{,}1$`, r`$10$`, r`$1{,}1^{10} \approx 2{,}5937$`],
        [r`$0{,}01$`, r`$100$`, r`$1{,}01^{100} \approx 2{,}7048$`],
        [r`$0{,}001$`, r`$1\,000$`, r`$\approx 2{,}7169$`],
      ],
      caption: 'Plus le pas est petit, meilleure est l’approximation de $e \\approx 2{,}71828$.',
    },
    { type: 'h2', text: '2. Propriétés algébriques' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Relation fonctionnelle',
      content: [{ type: 'p', text: r`Pour tous réels $a$ et $b$ : $\exp(a + b) = \exp(a) \times \exp(b)$.` }],
    },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [
        { type: 'p', text: r`Fixons $b$ et posons $k(x) = \exp(x + b)\exp(-x)$. Alors $k'(x) = \exp(x+b)\exp(-x) - \exp(x+b)\exp(-x) = 0$, donc $k$ est constante : $k(x) = k(0) = \exp(b)$.` },
        { type: 'p', text: r`Ainsi $\exp(x + b)\exp(-x) = \exp(b)$ ; en multipliant par $\exp(x)$ (car $\exp(-x)\exp(x) = 1$) : $\exp(x + b) = \exp(x)\exp(b)$. On conclut avec $x = a$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Conséquences',
      content: [
        { type: 'p', text: r`Pour tous réels $a$, $b$ et tout entier relatif $n$ :` },
        { type: 'math', tex: r`\exp(-a) = \frac{1}{\exp(a)} \qquad \exp(a - b) = \frac{\exp(a)}{\exp(b)} \qquad \exp(na) = \big(\exp(a)\big)^n` },
      ],
    },
    { type: 'h3', text: '2.1 La notation $e^x$' },
    {
      type: 'p',
      text: r`On pose $e = \exp(1) \approx 2{,}71828$. D'après la propriété des puissances, $\exp(n) = \exp(1)^n = e^n$ pour tout entier $n$. On **étend** cette notation à tout réel $x$ : $\exp(x) = e^x$. Les règles de calcul sont alors exactement celles des puissances :`,
    },
    { type: 'math', tex: r`e^{a+b} = e^a e^b \qquad e^{-a} = \frac{1}{e^a} \qquad e^{a-b} = \frac{e^a}{e^b} \qquad (e^a)^n = e^{na} \qquad e^0 = 1` },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples de simplification',
      content: [
        {
          type: 'list',
          items: [
            r`$e^{3x} \times e^{-x} = e^{3x - x} = e^{2x}$`,
            r`$\dfrac{(e^x)^3}{e^{2x}} = \dfrac{e^{3x}}{e^{2x}} = e^{x}$`,
            r`$\dfrac{e^{x+1}}{e^{x-1}} = e^{(x+1)-(x-1)} = e^{2}$`,
            r`$(e^x + e^{-x})^2 = e^{2x} + 2e^x e^{-x} + e^{-2x} = e^{2x} + 2 + e^{-2x}$`,
          ],
        },
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
            r`$e^{a+b} \neq e^a + e^b$ (c'est un **produit**).`,
            r`$e^{2x} \neq e^{x^2}$ : $e^{2x} = (e^x)^2$.`,
            r`$e^{-x} \neq -e^x$ : $e^{-x} = \dfrac1{e^x} > 0$.`,
            r`$e^{x}$ n'est **jamais** nul ni négatif : l'équation $e^x = -2$ n'a pas de solution.`,
          ],
        },
      ],
    },
    { type: 'h2', text: '3. Étude de la fonction exponentielle' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Signe',
      content: [{ type: 'p', text: r`Pour tout réel $x$, $e^x > 0$.` }],
    },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [{ type: 'p', text: r`$e^x = e^{\frac{x}{2} + \frac{x}{2}} = \left(e^{x/2}\right)^2 \geqslant 0$, et $e^x \neq 0$ d'après 1.1. Donc $e^x > 0$.` }],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Variations',
      content: [
        { type: 'p', text: r`$\exp' = \exp > 0$ : la fonction exponentielle est **strictement croissante** sur $\mathbb{R}$.` },
        { type: 'p', text: r`Conséquences, pour tous réels $a$ et $b$ : $\quad e^a = e^b \iff a = b \quad$ et $\quad e^a < e^b \iff a < b$.` },
      ],
    },
    {
      type: 'table',
      headers: [r`$x$`, r`$-2$`, r`$-1$`, r`$0$`, r`$0{,}5$`, r`$1$`, r`$2$`, r`$3$`],
      rows: [[r`$e^x$ (arrondi)`, r`$0{,}135$`, r`$0{,}368$`, r`$1$`, r`$1{,}649$`, r`$2{,}718$`, r`$7{,}389$`, r`$20{,}086$`]],
      caption: 'Quelques valeurs : la croissance est très rapide.',
    },
    { type: 'svg', svg: svgCourbe, caption: 'Courbe de la fonction exponentielle et ses tangentes en 0 et en 1.', maxWidth: 680 },
    {
      type: 'callout',
      variant: 'property',
      title: 'Tangentes remarquables',
      content: [
        { type: 'p', text: r`En $0$ : $\exp(0) = 1$ et $\exp'(0) = 1$, donc $T_0 : y = x + 1$.` },
        { type: 'p', text: r`En $1$ : $T_1 : y = e(x - 1) + e = ex$, qui passe par l'origine.` },
        { type: 'p', text: r`Plus généralement, en $a$ : $T_a : y = e^a(x - a) + e^a = e^a(x - a + 1)$, qui coupe l'axe des abscisses en $x = a - 1$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Inégalité fondamentale : $e^x \\geqslant x + 1$',
      content: [
        { type: 'p', text: r`Soit $g(x) = e^x - x - 1$ sur $\mathbb{R}$. $g'(x) = e^x - 1$. Or $e^x - 1 > 0 \iff e^x > e^0 \iff x > 0$.` },
        { type: 'p', text: r`$g$ décroît sur $]-\infty ; 0]$, croît sur $[0 ; +\infty[$ : son minimum est $g(0) = 1 - 0 - 1 = 0$. Donc $g(x) \geqslant 0$, i.e. $e^x \geqslant x + 1$ pour tout réel $x$ : la courbe de $\exp$ est **au-dessus de sa tangente en 0**.` },
      ],
    },
    { type: 'h2', text: '4. Fonctions $x \\mapsto e^{kx}$ et $x \\mapsto e^{ax+b}$' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Dérivée',
      content: [
        { type: 'p', text: r`D'après la formule de dérivation de $x \mapsto g(ax + b)$ :` },
        { type: 'math', tex: r`\big(e^{ax+b}\big)' = a\,e^{ax+b} \qquad \text{en particulier} \qquad \big(e^{kx}\big)' = k\,e^{kx}.` },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Sens de variation de $x \\mapsto e^{kx}$',
      content: [
        {
          type: 'list',
          items: [
            r`si $k > 0$ : $k e^{kx} > 0$, la fonction est strictement **croissante** (croissance exponentielle) ;`,
            r`si $k < 0$ : $k e^{kx} < 0$, la fonction est strictement **décroissante** (décroissance exponentielle) ;`,
            r`si $k = 0$ : fonction constante égale à $1$.`,
          ],
        },
      ],
    },
    { type: 'svg', svg: svgFamille, caption: 'Les courbes de $x \\mapsto e^{kx}$ passent toutes par le point $(0;1)$.', maxWidth: 680 },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : $f(x) = 3e^{-2x+1}$',
      content: [{ type: 'p', text: r`$f'(x) = 3 \times (-2)e^{-2x+1} = -6e^{-2x+1} < 0$ : $f$ est strictement décroissante sur $\mathbb{R}$.` }],
    },
    { type: 'h2', text: '5. Exponentielle et suites géométriques' },
    {
      type: 'callout',
      variant: 'property',
      content: [
        { type: 'p', text: r`Pour tout réel $a$, la suite $(u_n)$ définie par $u_n = e^{na}$ est **géométrique** de raison $q = e^a$ et de premier terme $u_0 = 1$, car $u_{n+1} = e^{(n+1)a} = e^{na} \times e^a = u_n \times e^a$.` },
      ],
    },
    {
      type: 'p',
      text: r`On retrouve la « version discrète » de l'exponentielle : en observant une quantité qui évolue exponentiellement à intervalles réguliers, on obtient une suite géométrique. Si $a > 0$, $q = e^a > 1$ et la suite est croissante ; si $a < 0$, $0 < q < 1$ et elle est décroissante.`,
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [{ type: 'p', text: r`$v_n = 5e^{-0{,}2n}$ : suite géométrique de premier terme $5$ et de raison $e^{-0{,}2} \approx 0{,}819$. Elle est décroissante, et chaque terme vaut environ $81{,}9\,\%$ du précédent (baisse d'environ $18{,}1\,\%$ par étape).` }],
    },
    { type: 'h2', text: '6. Équations et inéquations' },
    {
      type: 'callout',
      variant: 'method',
      title: 'Méthode',
      content: [
        {
          type: 'list',
          items: [
            r`Écrire chaque membre sous la forme $e^{\text{quelque chose}}$ (utiliser $1 = e^0$, $e = e^1$, propriétés algébriques).`,
            r`Utiliser $e^A = e^B \iff A = B$ ou $e^A < e^B \iff A < B$ (le sens est conservé car $\exp$ est croissante).`,
            r`Dans un produit, $e^{u(x)} > 0$ : le signe de $P(x)e^{u(x)}$ est celui de $P(x)$.`,
            r`Équation du second degré « déguisée » : poser $X = e^x$ (avec $X > 0$).`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples résolus',
      content: [
        { type: 'p', text: r`**a)** $e^{3x - 1} = e^{x + 5} \iff 3x - 1 = x + 5 \iff x = 3$. $\mathcal{S} = \{3\}$.` },
        { type: 'p', text: r`**b)** $e^{x^2} = e^{x+2} \iff x^2 - x - 2 = 0 \iff (x - 2)(x + 1) = 0$. $\mathcal{S} = \{-1 ; 2\}$.` },
        { type: 'p', text: r`**c)** $e^{2x} \leqslant e^{1 - x} \iff 2x \leqslant 1 - x \iff x \leqslant \dfrac13$. $\mathcal{S} = \left]-\infty ; \dfrac13\right]$.` },
        { type: 'p', text: r`**d)** $e^{-x} > 1 \iff e^{-x} > e^0 \iff -x > 0 \iff x < 0$.` },
        { type: 'p', text: r`**e)** $(x - 3)e^{x} \geqslant 0 \iff x - 3 \geqslant 0$ (car $e^x > 0$) $\iff x \geqslant 3$.` },
        { type: 'p', text: r`**f)** $e^x = -1$ : aucune solution car $e^x > 0$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Et $e^x = 2$ ?',
      content: [{ type: 'p', text: r`$\exp$ est continue et strictement croissante, elle prend une fois et une seule chaque valeur strictement positive. L'unique solution de $e^x = 2$ ($\approx 0{,}693$) se note $\ln 2$ : c'est la fonction **logarithme népérien**, étudiée en Terminale. En Première, on se contente d'une valeur approchée (balayage, calculatrice).` }],
    },
    { type: 'h2', text: '7. Étudier une fonction avec l’exponentielle' },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : $f(x) = xe^x$',
      content: [
        { type: 'p', text: r`Produit : $f'(x) = 1 \times e^x + x e^x = (x + 1)e^x$. Comme $e^x > 0$, $f'(x)$ a le signe de $x + 1$.` },
        { type: 'p', text: r`$f$ décroît sur $]-\infty ; -1]$, croît sur $[-1 ; +\infty[$. Minimum : $f(-1) = -e^{-1} = -\dfrac1e \approx -0{,}368$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : $g(x) = \\dfrac{e^x}{x}$ sur $]0;+\\infty[$',
      content: [
        { type: 'math', tex: r`g'(x) = \frac{e^x \times x - e^x \times 1}{x^2} = \frac{(x - 1)e^x}{x^2}.` },
        { type: 'p', text: r`Signe de $x - 1$ : $g$ décroît sur $]0 ; 1]$, croît sur $[1 ; +\infty[$, minimum $g(1) = e$. On en déduit $e^x \geqslant ex$ pour $x > 0$.` },
      ],
    },
    { type: 'h2', text: '8. Modélisation' },
    {
      type: 'p',
      text: r`Une grandeur $N$ dont la vitesse de variation est proportionnelle à elle-même ($N' = kN$) s'écrit $N(t) = N_0 e^{kt}$, où $N_0 = N(0)$. On vérifie : $N'(t) = N_0 k e^{kt} = kN(t)$.`,
    },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Croissance ($k > 0$)', text: r`Population bactérienne en phase exponentielle, capital placé à intérêts composés continus. Doublement à intervalles réguliers.`, icon: 'TrendingUp' },
        { title: 'Décroissance ($k < 0$)', text: r`Désintégration radioactive $N(t) = N_0e^{-\lambda t}$, élimination d'un médicament, décharge d'un condensateur.`, icon: 'TrendingDown' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : désintégration',
      content: [
        { type: 'p', text: r`La masse (en g) d'une substance radioactive est $m(t) = 1000e^{-0{,}03t}$, $t$ en années.` },
        {
          type: 'list',
          items: [
            r`$m(0) = 1000$ g ; $m(10) = 1000e^{-0{,}3} \approx 740{,}8$ g ; $m(20) = 1000e^{-0{,}6} \approx 548{,}8$ g.`,
            r`$m'(t) = -30e^{-0{,}03t} < 0$ : la masse diminue.`,
            r`Chaque année, $m(t+1) = m(t) \times e^{-0{,}03}$ : baisse d'environ $2{,}96\,\%$ par an ; la suite $(m(n))$ est géométrique.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Un peu d’histoire',
      content: [{ type: 'p', text: r`Le nombre $e$ apparaît chez Jacques Bernoulli (1683) en étudiant les intérêts composés : $\left(1 + \frac1n\right)^n$ se rapproche de $e$ quand $n$ grandit. C'est Euler qui le nomme $e$ (vers 1730) et en donne de nombreuses propriétés, dont $e \approx 2{,}718281828$.` }],
    },
  ],

  // =========================================================================
  // EXERCICES
  // =========================================================================
  exercices: [
    {
      id: 'exp-ex1',
      title: 'Simplifier des expressions',
      difficulty: 1,
      duration: 10,
      tags: ['propriétés algébriques'],
      statement: [
        { type: 'p', text: r`Écrire plus simplement, pour tout réel $x$ :` },
        {
          type: 'list',
          items: [
            r`$A = e^{3x} \times e^{-x}$`,
            r`$B = \dfrac{(e^x)^3}{e^{2x}}$`,
            r`$C = \dfrac{e^{x+1}}{e^{x-1}}$`,
            r`$D = (e^x + e^{-x})^2 - (e^x - e^{-x})^2$`,
            r`$E = \dfrac{e^{2x} - 1}{e^{x} - 1}$ (pour $x \neq 0$)`,
          ],
        },
      ],
      hints: [r`Pour $D$, utiliser $(a+b)^2 - (a-b)^2 = 4ab$.`, r`Pour $E$, $e^{2x} - 1 = (e^x)^2 - 1^2$.`],
      solution: [
        { type: 'p', text: r`$A = e^{3x + (-x)} = e^{2x}$.` },
        { type: 'p', text: r`$B = \dfrac{e^{3x}}{e^{2x}} = e^{3x - 2x} = e^x$.` },
        { type: 'p', text: r`$C = e^{(x+1) - (x - 1)} = e^2$ (constante !).` },
        { type: 'p', text: r`$D = 4 \times e^x \times e^{-x} = 4e^0 = 4$.` },
        { type: 'p', text: r`$E = \dfrac{(e^x - 1)(e^x + 1)}{e^x - 1} = e^x + 1$ (pour $x \neq 0$, $e^x \neq 1$ donc on peut simplifier).` },
      ],
    },
    {
      id: 'exp-ex2',
      title: 'Calculs de dérivées',
      difficulty: 1,
      duration: 12,
      tags: ['dérivée'],
      statement: [
        { type: 'p', text: r`Calculer la dérivée de chaque fonction sur l'intervalle indiqué et en déduire son sens de variation quand c'est possible.` },
        {
          type: 'list',
          items: [
            r`$f_1(x) = 3e^x - 2x$ sur $\mathbb{R}$`,
            r`$f_2(x) = (x^2 + 1)e^x$ sur $\mathbb{R}$`,
            r`$f_3(x) = e^{-2x + 3}$ sur $\mathbb{R}$`,
            r`$f_4(x) = \dfrac{e^x - 1}{e^x + 1}$ sur $\mathbb{R}$`,
          ],
        },
      ],
      hints: [r`Pour $f_2$, factoriser par $e^x$ puis reconnaître une identité remarquable.`],
      solution: [
        { type: 'p', text: r`$f_1'(x) = 3e^x - 2$. (Signe non immédiat : $3e^x - 2 > 0 \iff e^x > \frac23$, nécessite le logarithme.)` },
        { type: 'p', text: r`$f_2'(x) = 2xe^x + (x^2+1)e^x = (x^2 + 2x + 1)e^x = (x + 1)^2 e^x \geqslant 0$, nulle seulement en $-1$ : $f_2$ est strictement croissante sur $\mathbb{R}$.` },
        { type: 'p', text: r`$f_3'(x) = -2e^{-2x+3} < 0$ : $f_3$ est strictement décroissante sur $\mathbb{R}$.` },
        { type: 'math', tex: r`f_4'(x) = \frac{e^x(e^x + 1) - (e^x - 1)e^x}{(e^x+1)^2} = \frac{e^{2x} + e^x - e^{2x} + e^x}{(e^x + 1)^2} = \frac{2e^x}{(e^x + 1)^2} > 0.` },
        { type: 'p', text: r`$f_4$ est strictement croissante sur $\mathbb{R}$.` },
      ],
    },
    {
      id: 'exp-ex3',
      title: 'Équations et inéquations',
      difficulty: 2,
      duration: 15,
      tags: ['équations', 'inéquations'],
      statement: [
        { type: 'p', text: r`Résoudre dans $\mathbb{R}$ :` },
        {
          type: 'list',
          items: [
            r`(a) $e^{2x+1} = e^{-x+7}$`,
            r`(b) $e^{x^2 - 3} = e^{2x}$`,
            r`(c) $e^{x} \times e^{x+2} = e$`,
            r`(d) $e^{4 - x} < e^{3x}$`,
            r`(e) $(2x - 5)e^{-x} \leqslant 0$`,
            r`(f) $e^{2x} - (e + 1)e^x + e = 0$`,
          ],
        },
      ],
      hints: [r`Pour (c), regrouper : $e^{2x+2} = e^1$.`, r`Pour (f), poser $X = e^x$ : $X^2 - (e+1)X + e = (X - 1)(X - e)$.`],
      solution: [
        { type: 'p', text: r`**(a)** $2x + 1 = -x + 7 \iff 3x = 6 \iff x = 2$. $\mathcal{S} = \{2\}$.` },
        { type: 'p', text: r`**(b)** $x^2 - 3 = 2x \iff x^2 - 2x - 3 = 0 \iff (x - 3)(x + 1) = 0$. $\mathcal{S} = \{-1 ; 3\}$.` },
        { type: 'p', text: r`**(c)** $e^{2x + 2} = e^1 \iff 2x + 2 = 1 \iff x = -\dfrac12$. $\mathcal{S} = \left\{-\dfrac12\right\}$.` },
        { type: 'p', text: r`**(d)** $4 - x < 3x \iff 4 < 4x \iff x > 1$. $\mathcal{S} = ]1 ; +\infty[$.` },
        { type: 'p', text: r`**(e)** $e^{-x} > 0$, donc l'inéquation équivaut à $2x - 5 \leqslant 0$, soit $x \leqslant \dfrac52$. $\mathcal{S} = \left]-\infty ; \dfrac52\right]$.` },
        { type: 'p', text: r`**(f)** Avec $X = e^x > 0$ : $X^2 - (e+1)X + e = 0$. On vérifie que $(X-1)(X-e) = X^2 - eX - X + e$. Donc $X = 1$ ou $X = e$, c'est-à-dire $e^x = e^0$ ou $e^x = e^1$ : $\mathcal{S} = \{0 ; 1\}$.` },
      ],
    },
    {
      id: 'exp-ex4',
      title: 'Étude d’une fonction produit',
      difficulty: 2,
      duration: 20,
      tags: ['étude de fonction', 'tangente'],
      statement: [
        { type: 'p', text: r`Soit $f(x) = (x + 2)e^{-x}$ définie sur $\mathbb{R}$, de courbe $\mathcal{C}$.` },
        {
          type: 'list',
          ordered: true,
          items: [r`Montrer que $f'(x) = -(x + 1)e^{-x}$.`, r`Dresser le tableau de variations de $f$ (sans les limites).`, r`Déterminer l'équation de la tangente à $\mathcal{C}$ au point d'abscisse $0$.`, r`Résoudre $f(x) > 0$.`],
        },
      ],
      hints: [r`$(e^{-x})' = -e^{-x}$.`],
      solution: [
        { type: 'p', text: r`**1.** $u = x + 2$, $u' = 1$, $v = e^{-x}$, $v' = -e^{-x}$. $f'(x) = e^{-x} - (x+2)e^{-x} = (1 - x - 2)e^{-x} = -(x + 1)e^{-x}$.` },
        { type: 'p', text: r`**2.** $e^{-x} > 0$ : $f'(x)$ a le signe de $-(x+1)$, positif pour $x < -1$, négatif pour $x > -1$. $f$ croît sur $]-\infty ; -1]$ et décroît sur $[-1 ; +\infty[$. Maximum : $f(-1) = 1 \times e^{1} = e \approx 2{,}718$.` },
        { type: 'p', text: r`**3.** $f(0) = 2$, $f'(0) = -1$ : $T : y = -x + 2$.` },
        { type: 'p', text: r`**4.** $e^{-x} > 0$, donc $f(x) > 0 \iff x + 2 > 0 \iff x > -2$. $\mathcal{S} = ]-2 ; +\infty[$.` },
      ],
    },
    {
      id: 'exp-ex5',
      title: 'Inégalité et approximation de $e$',
      difficulty: 2,
      duration: 15,
      tags: ['inégalité', 'nombre e'],
      statement: [
        { type: 'list', ordered: true, items: [r`Démontrer que pour tout réel $x$, $e^x \geqslant 1 + x$.`, r`En déduire que pour tout entier $n \geqslant 1$, $\left(1 + \dfrac1n\right)^n \leqslant e$.`, r`En appliquant l'inégalité à $x = -\dfrac{1}{n+1}$, montrer que $e \leqslant \left(1 + \dfrac1n\right)^{n+1}$. Donner un encadrement de $e$ pour $n = 100$.`] },
      ],
      hints: [r`Étudier $g(x) = e^x - 1 - x$.`, r`Avec $x = \frac1n$, élever à la puissance $n$ (les deux membres sont positifs).`, r`$1 - \frac{1}{n+1} = \frac{n}{n+1}$.`],
      solution: [
        { type: 'p', text: r`**1.** $g(x) = e^x - 1 - x$, $g'(x) = e^x - 1$, positif $\iff x > 0$. $g$ admet un minimum en $0$ : $g(0) = 0$. Donc $g(x) \geqslant 0$ : $e^x \geqslant 1 + x$.` },
        { type: 'p', text: r`**2.** Avec $x = \dfrac1n$ : $e^{1/n} \geqslant 1 + \dfrac1n > 0$. La fonction $t \mapsto t^n$ étant croissante sur $[0 ; +\infty[$ : $\left(e^{1/n}\right)^n \geqslant \left(1 + \dfrac1n\right)^n$, soit $e \geqslant \left(1 + \dfrac1n\right)^n$.` },
        { type: 'p', text: r`**3.** $e^{-1/(n+1)} \geqslant 1 - \dfrac{1}{n+1} = \dfrac{n}{n+1} > 0$. En élevant à la puissance $n + 1$ : $e^{-1} \geqslant \left(\dfrac{n}{n+1}\right)^{n+1}$, et en passant aux inverses (nombres positifs) : $e \leqslant \left(\dfrac{n+1}{n}\right)^{n+1} = \left(1 + \dfrac1n\right)^{n+1}$.` },
        { type: 'p', text: r`Pour $n = 100$ : $1{,}01^{100} \approx 2{,}7048$ et $1{,}01^{101} \approx 2{,}7319$, donc $2{,}704 \leqslant e \leqslant 2{,}732$.` },
      ],
    },
    {
      id: 'exp-ex6',
      title: 'Suite géométrique et exponentielle',
      difficulty: 2,
      duration: 15,
      tags: ['suites', 'géométrique'],
      statement: [
        { type: 'p', text: r`On pose, pour tout entier naturel $n$, $u_n = 3e^{-0{,}5n}$.` },
        {
          type: 'list',
          ordered: true,
          items: [r`Montrer que $(u_n)$ est une suite géométrique ; préciser sa raison et son premier terme.`, r`Étudier son sens de variation.`, r`Calculer la somme $S = u_0 + u_1 + \dots + u_9$ (valeur exacte puis arrondie au centième).`],
        },
      ],
      hints: [r`Calculer $\dfrac{u_{n+1}}{u_n}$.`, r`Somme des termes d'une suite géométrique : $u_0 \dfrac{1 - q^{N}}{1 - q}$ avec $N$ le nombre de termes.`],
      solution: [
        { type: 'p', text: r`**1.** $u_{n+1} = 3e^{-0{,}5(n+1)} = 3e^{-0{,}5n} \times e^{-0{,}5} = u_n \times e^{-0{,}5}$. $(u_n)$ est géométrique de raison $q = e^{-0{,}5} \approx 0{,}607$ et de premier terme $u_0 = 3$.` },
        { type: 'p', text: r`**2.** $u_0 > 0$ et $0 < q < 1$ (car $-0{,}5 < 0$ donne $e^{-0{,}5} < e^0 = 1$) : la suite est strictement décroissante.` },
        { type: 'p', text: r`**3.** $S$ comporte $10$ termes : $S = 3 \times \dfrac{1 - (e^{-0{,}5})^{10}}{1 - e^{-0{,}5}} = \dfrac{3(1 - e^{-5})}{1 - e^{-0{,}5}} \approx 7{,}57$.` },
      ],
    },
    {
      id: 'exp-ex7',
      title: 'Type bac : concentration d’un médicament',
      difficulty: 3,
      duration: 35,
      tags: ['type bac', 'modélisation', 'Python', 'étude de fonction'],
      statement: [
        { type: 'p', text: r`La concentration (en mg/L) d'un médicament dans le sang, $t$ heures après une injection, est modélisée par $C(t) = 5t\,e^{-0{,}5t}$ pour $t \in [0 ; 10]$.` },
        {
          type: 'list',
          ordered: true,
          items: [
            r`Calculer $C(0)$ et interpréter.`,
            r`Montrer que $C'(t) = 2{,}5(2 - t)e^{-0{,}5t}$.`,
            r`Dresser le tableau de variations de $C$ sur $[0 ; 10]$. À quel instant la concentration est-elle maximale ? Donner sa valeur exacte puis arrondie au centième.`,
            r`Déterminer l'équation de la tangente à la courbe en $0$. Que représente son coefficient directeur ?`,
            r`Le médicament n'est plus efficace lorsque la concentration devient inférieure à $1$ mg/L. Compléter le programme Python ci-dessous pour qu'il renvoie, à $0{,}01$ près, l'instant à partir duquel le médicament n'est plus efficace, puis donner le résultat.`,
          ],
        },
        {
          type: 'code',
          lang: 'python',
          code: `from math import exp

def C(t):
    return 5 * t * exp(-0.5 * t)

t = 2
while ......... :
    t = t + 0.01
print(round(t, 2))`,
        },
      ],
      hints: [r`Produit $u = 5t$, $v = e^{-0{,}5t}$, $v' = -0{,}5e^{-0{,}5t}$.`, r`Après le maximum, $C$ est décroissante : on cherche le premier $t \geqslant 2$ tel que $C(t) < 1$.`],
      solution: [
        { type: 'p', text: r`**1.** $C(0) = 0$ : au moment de l'injection, le médicament n'est pas encore passé dans le sang.` },
        { type: 'p', text: r`**2.** $C'(t) = 5e^{-0{,}5t} + 5t \times (-0{,}5)e^{-0{,}5t} = (5 - 2{,}5t)e^{-0{,}5t} = 2{,}5(2 - t)e^{-0{,}5t}$.` },
        { type: 'p', text: r`**3.** $2{,}5e^{-0{,}5t} > 0$ : $C'(t)$ a le signe de $2 - t$. $C$ croît sur $[0 ; 2]$, décroît sur $[2 ; 10]$. $C(2) = 10e^{-1} = \dfrac{10}{e} \approx 3{,}68$ mg/L et $C(10) = 50e^{-5} \approx 0{,}34$ mg/L.` },
        {
          type: 'table',
          headers: [r`$t$`, r`$0$`, r`$]0 ; 2[$`, r`$2$`, r`$]2 ; 10[$`, r`$10$`],
          rows: [
            [r`$C'(t)$`, '', r`$+$`, r`$0$`, r`$-$`, ''],
            [r`$C$`, r`$0$`, r`$\nearrow$`, r`$\dfrac{10}{e}$`, r`$\searrow$`, r`$50e^{-5}$`],
          ],
        },
        { type: 'p', text: r`La concentration est maximale **2 heures** après l'injection et vaut $\dfrac{10}{e} \approx 3{,}68$ mg/L.` },
        { type: 'p', text: r`**4.** $C'(0) = 2{,}5 \times 2 \times 1 = 5$ et $C(0) = 0$ : $T : y = 5t$. Le coefficient directeur $5$ est la **vitesse initiale d'augmentation** de la concentration : 5 mg/L par heure.` },
        { type: 'p', text: "**5.** La condition de boucle est `C(t) >= 1` : on avance tant que le médicament est encore efficace. Partir de $t = 2$ garantit qu'on est sur la partie décroissante. Le programme affiche **7.16** : le médicament n'est plus efficace environ $7{,}16$ h après l'injection, soit environ 7 h 10 min ($C(7{,}15) \\approx 1{,}0016$ et $C(7{,}16) \\approx 0{,}9979$)." },
      ],
    },
    {
      id: 'exp-ex8',
      title: 'Python : méthode d’Euler',
      difficulty: 2,
      duration: 20,
      tags: ['Python', 'Euler', 'algorithmique'],
      statement: [
        { type: 'p', text: r`On cherche une valeur approchée de $e = \exp(1)$ par la méthode d'Euler appliquée à $f' = f$, $f(0) = 1$, avec un pas $h$.` },
        {
          type: 'code',
          lang: 'python',
          code: `def euler(h):
    x = 0
    y = 1
    n = round(1 / h)       # nombre d'étapes pour aller de 0 à 1
    for k in range(n):
        y = y + h * y      # y(x + h) ≈ y(x) + h * y'(x) avec y' = y
        x = x + h
    return y

for h in [0.5, 0.1, 0.01, 0.001]:
    print(h, euler(h))`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Justifier la ligne `y = y + h * y`.',
            r`Faire tourner l'algorithme « à la main » pour $h = 0{,}5$.`,
            r`Exprimer la valeur renvoyée en fonction de $h$. Quelles valeurs obtient-on pour $h = 0{,}1$ et $h = 0{,}01$ ?`,
          ],
        },
      ],
      hints: [r`Approximation affine : $f(x + h) \approx f(x) + hf'(x)$.`, r`À chaque étape, $y$ est multiplié par $1 + h$.`],
      solution: [
        { type: 'p', text: r`**1.** Pour $h$ petit, $f(x + h) \approx f(x) + h f'(x)$ (approximation par la tangente). Comme $f' = f$, $f(x + h) \approx f(x) + h f(x)$ : c'est exactement $y \leftarrow y + hy$.` },
        { type: 'p', text: r`**2.** $h = 0{,}5$, $n = 2$. Étape 1 : $y = 1 + 0{,}5 \times 1 = 1{,}5$, $x = 0{,}5$. Étape 2 : $y = 1{,}5 + 0{,}5 \times 1{,}5 = 2{,}25$, $x = 1$. Renvoie $2{,}25$.` },
        { type: 'p', text: r`**3.** $y$ est multiplié $n = \frac1h$ fois par $1 + h$ : valeur renvoyée $(1 + h)^{1/h}$. Pour $h = 0{,}1$ : $1{,}1^{10} \approx 2{,}5937$ ; pour $h = 0{,}01$ : $1{,}01^{100} \approx 2{,}7048$ ; pour $h = 0{,}001$ : $\approx 2{,}7169$. On se rapproche de $e \approx 2{,}7183$ (par défaut, car la courbe est au-dessus de ses tangentes).` },
      ],
    },
    {
      id: 'exp-ex9',
      title: 'Tangentes à la courbe de l’exponentielle',
      difficulty: 3,
      duration: 20,
      tags: ['tangente', 'raisonnement'],
      statement: [
        { type: 'p', text: r`Soit $a$ un réel et $T_a$ la tangente à la courbe de $\exp$ au point d'abscisse $a$.` },
        {
          type: 'list',
          ordered: true,
          items: [
            r`Montrer que $T_a$ a pour équation $y = e^a(x - a + 1)$.`,
            r`Montrer que $T_a$ coupe l'axe des abscisses au point d'abscisse $a - 1$. En déduire une construction géométrique simple de la tangente.`,
            r`Existe-t-il une tangente à la courbe passant par l'origine ? Si oui, laquelle ?`,
            r`Déterminer le point de la courbe où la tangente est parallèle à la droite $y = x$.`,
          ],
        },
      ],
      hints: [r`$T_a : y = \exp'(a)(x - a) + \exp(a)$.`, r`Pour 3, résoudre $e^a(0 - a + 1) = 0$.`],
      solution: [
        { type: 'p', text: r`**1.** $\exp'(a) = e^a$ donc $T_a : y = e^a(x - a) + e^a = e^a(x - a + 1)$.` },
        { type: 'p', text: r`**2.** $y = 0 \iff e^a(x - a + 1) = 0 \iff x - a + 1 = 0$ (car $e^a \neq 0$) $\iff x = a - 1$. Construction : on place le point $M(a ; e^a)$ et le point $P(a - 1 ; 0)$ ; la tangente est la droite $(MP)$.` },
        { type: 'p', text: r`**3.** $O \in T_a \iff e^a(1 - a) = 0 \iff a = 1$. La seule tangente passant par l'origine est $T_1 : y = ex$.` },
        { type: 'p', text: r`**4.** Parallèle à $y = x$ : coefficient directeur $1$, donc $e^a = 1 = e^0$, soit $a = 0$. C'est le point $(0 ; 1)$, de tangente $y = x + 1$.` },
      ],
    },
    {
      id: 'exp-ex10',
      title: 'Modélisation : refroidissement d’un café',
      difficulty: 3,
      duration: 25,
      tags: ['modélisation', 'décroissance exponentielle', 'suites'],
      statement: [
        { type: 'p', text: r`Un café servi à $80\,°$C refroidit dans une pièce à $20\,°$C. Sa température (en °C) après $t$ minutes est modélisée par $\theta(t) = 20 + 60e^{-0{,}1t}$, $t \geqslant 0$.` },
        {
          type: 'list',
          ordered: true,
          items: [
            r`Vérifier que $\theta(0) = 80$. Étudier le sens de variation de $\theta$.`,
            r`Calculer la température au bout de $10$ min, puis de $20$ min (arrondis au dixième).`,
            r`Montrer que la suite $d_n = \theta(n) - 20$ est géométrique. Interpréter.`,
            r`Montrer que pour tout $t \geqslant 0$, $\theta(t) > 20$. Interpréter.`,
          ],
        },
      ],
      solution: [
        { type: 'p', text: r`**1.** $\theta(0) = 20 + 60e^0 = 80$. $\theta'(t) = 60 \times (-0{,}1)e^{-0{,}1t} = -6e^{-0{,}1t} < 0$ : la température décroît.` },
        { type: 'p', text: r`**2.** $\theta(10) = 20 + 60e^{-1} \approx 42{,}1\,°$C ; $\theta(20) = 20 + 60e^{-2} \approx 28{,}1\,°$C.` },
        { type: 'p', text: r`**3.** $d_n = 60e^{-0{,}1n}$ et $d_{n+1} = 60e^{-0{,}1n}e^{-0{,}1} = d_n \times e^{-0{,}1}$ : géométrique de raison $e^{-0{,}1} \approx 0{,}905$. L'écart avec la température ambiante diminue d'environ $9{,}5\,\%$ chaque minute.` },
        { type: 'p', text: r`**4.** $60e^{-0{,}1t} > 0$ donc $\theta(t) > 20$ : le café se rapproche de la température de la pièce sans jamais l'atteindre (dans ce modèle).` },
      ],
      hints: [r`$(e^{-0{,}1t})' = -0{,}1e^{-0{,}1t}$.`],
    },
  ],

  // =========================================================================
  // REPRÉSENTATIONS
  // =========================================================================
  representations: [
    {
      type: 'widget',
      id: 'exponential-explorer',
      title: 'Explorer l’exponentielle',
      props: { k: 1 },
      caption: 'Tangentes, propriétés algébriques et méthode d’Euler : faites varier $k$ et le pas.',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Famille $x \\mapsto e^{kx}$',
      props: {
        expressions: ['exp(k*x)', 'exp(x)'],
        params: [{ name: 'k', min: -3, max: 3, step: 0.1, value: 0.5 }],
        xMin: -4,
        xMax: 4,
        yMin: -1,
        yMax: 8,
        showDerivative: false,
      },
      caption: 'Pour $k > 0$ la fonction croît, pour $k < 0$ elle décroît ; toutes les courbes passent par $(0 ; 1)$.',
    },
    {
      type: 'widget',
      id: 'tangent-explorer',
      title: 'Tangente à la courbe de $\\exp$',
      props: { expression: 'exp(x)', a: 1 },
      caption: 'Vérifiez que la tangente en $a$ coupe l’axe des abscisses en $a - 1$, et que la courbe reste au-dessus.',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Modèle de concentration $C(t) = 5t\\,e^{-0{,}5t}$',
      props: {
        expressions: ['a*x*exp(-b*x)'],
        params: [
          { name: 'a', min: 1, max: 10, step: 0.5, value: 5 },
          { name: 'b', min: 0.1, max: 2, step: 0.05, value: 0.5 },
        ],
        xMin: 0,
        xMax: 12,
        yMin: -0.5,
        yMax: 6,
      },
      caption: 'Le maximum est atteint en $t = \\dfrac{1}{b}$ : vérifiez-le en faisant varier $b$.',
    },
    { type: 'svg', svg: svgEuler, caption: 'Méthode d’Euler.', maxWidth: 680 },
    {
      type: 'qcm',
      questions: [
        {
          question: r`$e^{2x} \times e^{-3x}$ est égal à :`,
          choices: [r`$e^{-6x^2}$`, r`$e^{-x}$`, r`$e^{5x}$`, r`$-e^{x}$`],
          answer: 1,
          explanation: r`$e^{2x + (-3x)} = e^{-x}$.`,
        },
        {
          question: r`La dérivée de $x \mapsto e^{3x - 1}$ est :`,
          choices: [r`$e^{3x-1}$`, r`$3e^{3x - 1}$`, r`$(3x - 1)e^{3x-2}$`, r`$3e^{3x}$`],
          answer: 1,
          explanation: r`$(e^{ax+b})' = ae^{ax+b}$ avec $a = 3$.`,
        },
        {
          question: r`L'équation $e^x = -3$ :`,
          choices: [r`a pour solution $-3$`, r`a pour solution $\frac13$`, 'n’a pas de solution', 'a deux solutions'],
          answer: 2,
          explanation: r`$e^x > 0$ pour tout réel $x$.`,
        },
        {
          question: r`$e^{x^2} \leqslant e^{4}$ équivaut à :`,
          choices: [r`$x \leqslant 2$`, r`$x \in [-2 ; 2]$`, r`$x \geqslant -2$`, r`$x \leqslant 4$`],
          answer: 1,
          explanation: r`$x^2 \leqslant 4 \iff -2 \leqslant x \leqslant 2$.`,
        },
        {
          question: r`La suite $u_n = e^{0{,}2n}$ est :`,
          choices: [r`arithmétique de raison $0{,}2$`, r`géométrique de raison $e^{0{,}2}$`, r`géométrique de raison $0{,}2$`, 'ni arithmétique ni géométrique'],
          answer: 1,
          explanation: r`$u_{n+1} = u_n \times e^{0{,}2}$.`,
        },
        {
          question: r`La tangente à la courbe de $\exp$ en $0$ a pour équation :`,
          choices: [r`$y = x$`, r`$y = ex$`, r`$y = x + 1$`, r`$y = 1$`],
          answer: 2,
          explanation: r`$\exp(0) = \exp'(0) = 1$.`,
        },
        {
          question: r`Le signe de $f(x) = (1 - x)e^{2x}$ est :`,
          choices: [r`toujours positif`, r`positif sur $]-\infty ; 1]$`, r`positif sur $[1 ; +\infty[$`, r`celui de $e^{2x}$`],
          answer: 1,
          explanation: r`$e^{2x} > 0$, le signe est celui de $1 - x$.`,
        },
        {
          question: r`$f(x) = xe^x$ admet un minimum égal à :`,
          choices: [r`$0$`, r`$-1$`, r`$-\dfrac1e$`, r`$-e$`],
          answer: 2,
          explanation: r`$f'(x) = (x+1)e^x$, minimum en $-1$ : $f(-1) = -e^{-1}$.`,
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Définition de exp', back: r`Unique fonction dérivable sur $\mathbb{R}$ avec $f' = f$ et $f(0) = 1$` },
        { front: r`$e^{a+b}$`, back: r`$e^a \times e^b$` },
        { front: r`$e^{-a}$`, back: r`$\dfrac{1}{e^a}$` },
        { front: r`$e^{a-b}$`, back: r`$\dfrac{e^a}{e^b}$` },
        { front: r`$(e^a)^n$`, back: r`$e^{na}$` },
        { front: r`Signe de $e^x$`, back: r`$e^x > 0$ pour tout réel $x$` },
        { front: r`$(e^{ax+b})'$`, back: r`$a\,e^{ax+b}$` },
        { front: r`$e^a < e^b$`, back: r`$\iff a < b$` },
        { front: r`Valeur de $e$`, back: r`$e = \exp(1) \approx 2{,}718$` },
        { front: 'Tangente en 0', back: r`$y = x + 1$ ; et $e^x \geqslant x + 1$` },
        { front: r`Suite $(e^{na})$`, back: r`Géométrique de raison $e^a$, premier terme $1$` },
        { front: 'Méthode d’Euler pour f′ = f', back: r`$y_{n+1} = (1 + h)\,y_n$` },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque expression à sa forme simplifiée',
      pairs: [
        { left: r`$e^{x}e^{2x}$`, right: r`$e^{3x}$` },
        { left: r`$\dfrac{e^{5}}{e^{3}}$`, right: r`$e^{2}$` },
        { left: r`$(e^{-x})^2$`, right: r`$e^{-2x}$` },
        { left: r`$e^{x}e^{-x}$`, right: r`$1$` },
        { left: r`$\dfrac{1}{e^{-x}}$`, right: r`$e^{x}$` },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: r`Pour tous réels $a$ et $b$, $e^{a+b} = e^a + e^b$.`, answer: false, explanation: r`C'est un produit : $e^{a+b} = e^ae^b$.` },
        { text: r`La fonction $x \mapsto e^{-x}$ est décroissante sur $\mathbb{R}$.`, answer: true, explanation: r`Sa dérivée $-e^{-x}$ est négative.` },
        { text: r`$e^{2x} = (e^x)^2$.`, answer: true, explanation: 'Propriété des puissances.' },
        { text: r`Il existe un réel $x$ tel que $e^x = 0$.`, answer: false, explanation: r`$e^x > 0$.` },
        { text: r`Pour tout réel $x$, $e^x \geqslant x + 1$.`, answer: true, explanation: 'La courbe est au-dessus de sa tangente en 0.' },
        { text: r`La méthode d'Euler donne la valeur exacte de $e$ pour $h = 0{,}001$.`, answer: false, explanation: r`Elle donne une approximation : $1{,}001^{1000} \approx 2{,}7169$.` },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: r`La fonction exponentielle est égale à sa {{dérivée}} et vaut {{1}} en $0$. Elle est strictement {{croissante}} sur $\mathbb{R}$ et toujours strictement {{positive}}. On a $e^{a+b} = e^a \times e^b$, donc la suite $(e^{na})$ est {{géométrique}} de raison $e^a$.`,
    },
  ],
}

export default chapter
