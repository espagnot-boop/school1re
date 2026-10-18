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
// Schéma 1 : tableau de variations de f(x) = x³ − 3x + 1
// ---------------------------------------------------------------------------
const svgTableau = `<svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="13">
<defs><marker id="m4-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${BLUE}"/></marker></defs>
<g fill="none" stroke="currentColor" stroke-width="1.2">
<rect x="10" y="10" width="500" height="180"/>
<line x1="10" y1="45" x2="510" y2="45"/>
<line x1="10" y1="85" x2="510" y2="85"/>
<line x1="90" y1="10" x2="90" y2="190"/>
</g>
<g fill="currentColor" text-anchor="middle">
<text x="50" y="33" font-style="italic">x</text>
<text x="50" y="70">signe de f′(x)</text>
<text x="50" y="142">variations de f</text>
<text x="110" y="33">−∞</text><text x="230" y="33">−1</text><text x="370" y="33">1</text><text x="490" y="33">+∞</text>
<text x="160" y="71" fill="${GREEN}" font-weight="600">+</text>
<text x="230" y="71">0</text>
<text x="300" y="71" fill="${RED}" font-weight="600">−</text>
<text x="370" y="71">0</text>
<text x="440" y="71" fill="${GREEN}" font-weight="600">+</text>
<text x="230" y="105" font-weight="600">3</text>
<text x="370" y="180" font-weight="600">−1</text>
</g>
<line x1="230" y1="48" x2="230" y2="82" stroke="currentColor" stroke-dasharray="3 3" opacity="0.6"/>
<line x1="370" y1="48" x2="370" y2="82" stroke="currentColor" stroke-dasharray="3 3" opacity="0.6"/>
<g stroke="${BLUE}" stroke-width="1.8" marker-end="url(#m4-ar)">
<line x1="115" y1="172" x2="215" y2="105"/>
<line x1="245" y1="105" x2="355" y2="170"/>
<line x1="385" y1="170" x2="485" y2="105"/>
</g>
<text x="305" y="125" fill="${VIOLET}" font-size="11" text-anchor="middle">max local 3 en −1 · min local −1 en 1</text>
</svg>`

// ---------------------------------------------------------------------------
// Schéma 2 : courbe de x³ − 3x + 1 avec extremums et tangentes horizontales
// ---------------------------------------------------------------------------
const F2: Frame = { x0: -2.5, x1: 2.5, y0: -2.5, y1: 4.5, L: 20, T: 15, W: 380, H: 270 }
const f2 = (x: number) => x ** 3 - 3 * x + 1
const svgExtremums = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
<defs><clipPath id="m4-c2"><rect x="${F2.L}" y="${F2.T}" width="${F2.W}" height="${F2.H}"/></clipPath></defs>
${axes(F2, [-2, -1, 1, 2], [-2, -1, 1, 2, 3, 4])}
<g clip-path="url(#m4-c2)">
<path d="${curve(F2, f2, -2.5, 2.5)}" fill="none" stroke="${BLUE}" stroke-width="2.5"/>
<line x1="${X(F2, -2)}" y1="${Y(F2, 3)}" x2="${X(F2, 0)}" y2="${Y(F2, 3)}" stroke="${RED}" stroke-width="1.5" stroke-dasharray="6 3"/>
<line x1="${X(F2, 0)}" y1="${Y(F2, -1)}" x2="${X(F2, 2)}" y2="${Y(F2, -1)}" stroke="${GREEN}" stroke-width="1.5" stroke-dasharray="6 3"/>
</g>
<circle cx="${X(F2, -1)}" cy="${Y(F2, 3)}" r="5" fill="${RED}"/>
<circle cx="${X(F2, 1)}" cy="${Y(F2, -1)}" r="5" fill="${GREEN}"/>
<text x="${X(F2, -1) - 10}" y="${Y(F2, 3) - 10}" fill="${RED}" text-anchor="middle">A(−1 ; 3)</text>
<text x="${X(F2, 1) + 8}" y="${Y(F2, -1) + 18}" fill="${GREEN}">B(1 ; −1)</text>
<g fill="currentColor">
<text x="420" y="40" font-weight="600">f(x) = x³ − 3x + 1</text>
<text x="420" y="64">f′(x) = 3x² − 3 = 3(x − 1)(x + 1)</text>
<text x="420" y="94" fill="${RED}">En A : f′(−1) = 0 et f′ passe</text>
<text x="420" y="110" fill="${RED}">de + à − → maximum local</text>
<text x="420" y="140" fill="${GREEN}">En B : f′(1) = 0 et f′ passe</text>
<text x="420" y="156" fill="${GREEN}">de − à + → minimum local</text>
<text x="420" y="186">Aux extremums, la tangente</text>
<text x="420" y="202">est horizontale (pointillés).</text>
<text x="420" y="232" opacity="0.8">Le maximum local 3 n’est pas</text>
<text x="420" y="248" opacity="0.8">le maximum de f sur ℝ :</text>
<text x="420" y="264" opacity="0.8">f(2) = 3 et f(2,5) ≈ 9,1.</text>
</g>
</svg>`

// ---------------------------------------------------------------------------
// Schéma 3 : position relative courbe / tangente pour x³ en 1
// ---------------------------------------------------------------------------
const F3: Frame = { x0: -3, x1: 2.2, y0: -9, y1: 6, L: 20, T: 15, W: 380, H: 270 }
const svgPosition = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
<defs><clipPath id="m4-c3"><rect x="${F3.L}" y="${F3.T}" width="${F3.W}" height="${F3.H}"/></clipPath></defs>
${axes(F3, [-3, -2, -1, 1, 2], [-8, -6, -4, -2, 2, 4, 6])}
<g clip-path="url(#m4-c3)">
<rect x="${X(F3, -3)}" y="${F3.T}" width="${X(F3, -2) - X(F3, -3)}" height="${F3.H}" fill="${RED}" opacity="0.08"/>
<rect x="${X(F3, -2)}" y="${F3.T}" width="${X(F3, 2.2) - X(F3, -2)}" height="${F3.H}" fill="${GREEN}" opacity="0.08"/>
<path d="${curve(F3, (x) => x ** 3, -3, 2.2)}" fill="none" stroke="${BLUE}" stroke-width="2.5"/>
<path d="${curve(F3, (x) => 3 * x - 2, -3, 2.2, 2)}" fill="none" stroke="${ORANGE}" stroke-width="2"/>
</g>
<circle cx="${X(F3, 1)}" cy="${Y(F3, 1)}" r="5" fill="${ORANGE}"/>
<circle cx="${X(F3, -2)}" cy="${Y(F3, -8)}" r="5" fill="${VIOLET}"/>
<text x="${X(F3, 1) + 8}" y="${Y(F3, 1) + 16}" fill="${ORANGE}">A(1 ; 1)</text>
<text x="${X(F3, -2) + 8}" y="${Y(F3, -8) + 4}" fill="${VIOLET}">(−2 ; −8)</text>
<g fill="currentColor">
<text x="420" y="40" font-weight="600" fill="${BLUE}">𝒞 : y = x³</text>
<text x="420" y="60" font-weight="600" fill="${ORANGE}">T : y = 3x − 2 (tangente en 1)</text>
<text x="420" y="92">d(x) = x³ − (3x − 2)</text>
<text x="420" y="110">     = (x − 1)²(x + 2)</text>
<text x="420" y="140" fill="${RED}">x &lt; −2 : d(x) &lt; 0</text>
<text x="420" y="156" fill="${RED}">→ 𝒞 en dessous de T</text>
<text x="420" y="186" fill="${GREEN}">x &gt; −2 : d(x) ≥ 0</text>
<text x="420" y="202" fill="${GREEN}">→ 𝒞 au-dessus de T</text>
<text x="420" y="232" opacity="0.8">𝒞 et T se coupent en x = −2</text>
<text x="420" y="248" opacity="0.8">et se touchent en x = 1</text>
<text x="420" y="264" opacity="0.8">(racine double de d).</text>
</g>
</svg>`

// ---------------------------------------------------------------------------
// Schéma 4 : boîte sans couvercle (optimisation)
// ---------------------------------------------------------------------------
const svgBoite = `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
<g fill="none" stroke="currentColor" stroke-width="1.5">
<rect x="30" y="20" width="200" height="200"/>
</g>
<g fill="${ORANGE}" opacity="0.35">
<rect x="30" y="20" width="35" height="35"/><rect x="195" y="20" width="35" height="35"/>
<rect x="30" y="185" width="35" height="35"/><rect x="195" y="185" width="35" height="35"/>
</g>
<g stroke="${BLUE}" stroke-dasharray="5 3" stroke-width="1.3">
<line x1="65" y1="55" x2="195" y2="55"/><line x1="65" y1="185" x2="195" y2="185"/>
<line x1="65" y1="55" x2="65" y2="185"/><line x1="195" y1="55" x2="195" y2="185"/>
</g>
<g fill="currentColor" text-anchor="middle">
<text x="47" y="42" font-style="italic">x</text>
<text x="130" y="125">12 − 2x</text>
<text x="130" y="240">feuille carrée de côté 12 cm</text>
</g>
<g fill="none" stroke="currentColor" stroke-width="1.5">
<path d="M330,110 L470,110 L520,80 L380,80 Z" opacity="0.5"/>
<path d="M330,110 L330,180 L470,180 L470,110"/>
<path d="M470,180 L520,150 L520,80"/>
<path d="M330,180 L380,150 L380,80" stroke-dasharray="4 3" opacity="0.6"/>
<path d="M380,150 L520,150" stroke-dasharray="4 3" opacity="0.6"/>
</g>
<g fill="currentColor">
<text x="300" y="150" font-style="italic">x</text>
<text x="380" y="200">12 − 2x</text>
<text x="500" y="185">12 − 2x</text>
<text x="330" y="232" fill="${BLUE}">V(x) = x(12 − 2x)², x ∈ [0 ; 6]</text>
</g>
</svg>`

const chapter: Chapter = {
  id: 'variations-fonctions',
  subject: 'maths',
  order: 4,
  title: 'Variations et courbes représentatives des fonctions',
  theme: 'Analyse',
  summary:
    'Exploiter le signe de la dérivée pour obtenir le sens de variation, dresser un tableau de variations, déterminer des extremums, étudier la position d’une courbe par rapport à une tangente et résoudre des problèmes d’optimisation.',
  duration: '3 semaines',
  objectives: [
    'Connaître et utiliser le lien entre le signe de la dérivée et le sens de variation d’une fonction sur un intervalle.',
    'Étudier les variations d’une fonction : calcul de la dérivée, étude de son signe, tableau de variations.',
    'Déterminer les extremums locaux et globaux d’une fonction dérivable ; savoir qu’en un extremum local intérieur, la dérivée s’annule.',
    'Étudier complètement une fonction polynôme de degré 3 ou une fonction quotient.',
    'Étudier la position relative d’une courbe et d’une tangente ou de deux courbes (signe d’une différence).',
    'Démontrer une inégalité en étudiant les variations d’une fonction.',
    'Résoudre un problème d’optimisation (modéliser par une fonction, étudier ses variations, conclure dans le contexte).',
  ],
  keywords: [
    'dérivée',
    'sens de variation',
    'tableau de variations',
    'extremum local',
    'maximum',
    'minimum',
    'tangente horizontale',
    'position relative',
    'optimisation',
    'polynôme de degré 3',
    'fonction quotient',
  ],

  // =========================================================================
  // FICHE
  // =========================================================================
  fiche: [
    { type: 'h2', text: 'Signe de la dérivée et sens de variation' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Théorème (admis)',
      content: [
        { type: 'p', text: r`Soit $f$ dérivable sur un **intervalle** $I$.` },
        {
          type: 'list',
          items: [
            r`Si $f'(x) \geqslant 0$ pour tout $x \in I$, alors $f$ est **croissante** sur $I$.`,
            r`Si $f'(x) \leqslant 0$ pour tout $x \in I$, alors $f$ est **décroissante** sur $I$.`,
            r`Si $f'(x) = 0$ pour tout $x \in I$, alors $f$ est **constante** sur $I$.`,
            r`Si $f'(x) > 0$ sur $I$ (sauf éventuellement en un nombre fini de points où elle s'annule), $f$ est **strictement croissante** sur $I$ (de même avec $<0$ et strictement décroissante).`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Réciproque (sens direct)',
      content: [{ type: 'p', text: r`Si $f$ est croissante sur $I$, alors $f'(x) \geqslant 0$ sur $I$ ; si $f$ est décroissante, $f'(x) \leqslant 0$.` }],
    },
    { type: 'h2', text: 'Extremums locaux' },
    {
      type: 'callout',
      variant: 'definition',
      content: [
        { type: 'p', text: r`$f(a)$ est un **maximum local** (resp. minimum local) de $f$ s'il existe un intervalle ouvert $J$ contenant $a$ tel que $f(x) \leqslant f(a)$ (resp. $f(x) \geqslant f(a)$) pour tout $x \in J \cap I$.` },
      ],
    },
    {
      type: 'list',
      items: [
        r`Si $f$ admet un extremum local en $a$, **intérieur** à $I$, alors $f'(a) = 0$ : la tangente est **horizontale**.`,
        r`Si $f'$ **s'annule en changeant de signe** en $a$, alors $f(a)$ est un extremum local : $+ \to -$ : maximum ; $- \to +$ : minimum.`,
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Piège',
      content: [{ type: 'p', text: r`$f'(a) = 0$ ne suffit pas : pour $f(x) = x^3$, $f'(0) = 0$ mais $f$ est strictement croissante sur $\mathbb{R}$ (pas d'extremum en $0$, $f'$ ne change pas de signe).` }],
    },
    { type: 'h2', text: 'Méthode d’étude d’une fonction' },
    {
      type: 'steps',
      items: [
        { title: 'Domaine', text: r`Préciser l'ensemble de dérivabilité (attention aux valeurs interdites d'un quotient).` },
        { title: 'Dérivée', text: r`Calculer $f'(x)$ et la **factoriser** au maximum.` },
        { title: 'Signe', text: r`Étudier le signe de $f'(x)$ (tableau de signes, trinôme, carré, $e^x>0$, dénominateur au carré $>0$…).` },
        { title: 'Tableau', text: r`Dresser le tableau de variations et calculer les **images** des bornes et des points où $f'$ s'annule.` },
      ],
    },
    { type: 'h2', text: 'Position relative et inégalités' },
    {
      type: 'table',
      headers: ['Problème', 'Méthode'],
      rows: [
        [r`Position de $\mathcal{C}_f$ et de $\mathcal{C}_g$`, r`Étudier le signe de $d(x) = f(x) - g(x)$ : $d > 0 \iff \mathcal{C}_f$ au-dessus.`],
        [r`Position de $\mathcal{C}_f$ et de sa tangente $T_a$`, r`Signe de $f(x) - \big(f'(a)(x-a) + f(a)\big)$ ; souvent un facteur $(x-a)^2$.`],
        [r`Démontrer $f(x) \geqslant g(x)$ sur $I$`, r`Étudier les variations de $d = f - g$ et montrer que son **minimum** est $\geqslant 0$.`],
        ['Optimisation', r`Choisir la variable, exprimer la grandeur $f(x)$, préciser l'intervalle, étudier les variations, **conclure dans le contexte**.`],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Dérivées à connaître',
      content: [
        {
          type: 'math',
          tex: r`(x^n)' = nx^{n-1} \quad \left(\tfrac{1}{x}\right)' = -\tfrac{1}{x^2} \quad (uv)' = u'v + uv' \quad \left(\tfrac{u}{v}\right)' = \tfrac{u'v - uv'}{v^2} \quad \big(g(ax+b)\big)' = a\,g'(ax+b)`,
        },
      ],
    },
  ],

  // =========================================================================
  // COURS
  // =========================================================================
  cours: [
    { type: 'h2', text: '1. Du signe de la dérivée au sens de variation' },
    {
      type: 'p',
      text: r`Le nombre dérivé $f'(a)$ est le **coefficient directeur de la tangente** à la courbe $\mathcal{C}_f$ au point d'abscisse $a$. Intuitivement, si toutes les tangentes « montent » sur un intervalle (pente positive), la courbe monte : la fonction est croissante. Ce chapitre transforme cette intuition en un outil de calcul très puissant : **pour connaître les variations de $f$, il suffit d'étudier le signe de $f'$**.`,
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Rappel : sens de variation',
      content: [
        { type: 'p', text: r`$f$ est **croissante** sur $I$ si pour tous $a, b \in I$, $a \leqslant b \Rightarrow f(a) \leqslant f(b)$ (l'ordre est conservé).` },
        { type: 'p', text: r`$f$ est **décroissante** sur $I$ si pour tous $a, b \in I$, $a \leqslant b \Rightarrow f(a) \geqslant f(b)$ (l'ordre est inversé).` },
        { type: 'p', text: 'On parle de stricte croissance/décroissance avec des inégalités strictes.' },
      ],
    },
    { type: 'h3', text: '1.1 Le théorème fondamental' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Théorème (admis)',
      content: [
        { type: 'p', text: r`Soit $f$ une fonction dérivable sur un **intervalle** $I$ de $\mathbb{R}$.` },
        {
          type: 'list',
          items: [
            r`Si, pour tout $x \in I$, $f'(x) \geqslant 0$, alors $f$ est croissante sur $I$.`,
            r`Si, pour tout $x \in I$, $f'(x) \leqslant 0$, alors $f$ est décroissante sur $I$.`,
            r`Si, pour tout $x \in I$, $f'(x) = 0$, alors $f$ est constante sur $I$.`,
          ],
        },
        { type: 'p', text: r`De plus, si $f'(x) > 0$ pour tout $x \in I$ sauf éventuellement en un nombre fini de valeurs où $f'$ s'annule, alors $f$ est **strictement croissante** sur $I$. Énoncé analogue pour la stricte décroissance.` },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Sens « réciproque » (démontrable)',
      content: [
        { type: 'p', text: r`Si $f$ est dérivable et croissante sur $I$, alors $f'(x) \geqslant 0$ pour tout $x \in I$.` },
        {
          type: 'p',
          text: r`*Idée de preuve.* Pour $h > 0$ (avec $x + h \in I$), $f(x+h) \geqslant f(x)$ donc $\dfrac{f(x+h)-f(x)}{h} \geqslant 0$. Pour $h<0$, $f(x+h) \leqslant f(x)$ et le quotient est encore $\geqslant 0$. En passant à la limite $h \to 0$, le nombre dérivé $f'(x)$ est $\geqslant 0$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'L’hypothèse « intervalle » est indispensable',
      content: [
        {
          type: 'p',
          text: r`La fonction inverse $x \mapsto \dfrac{1}{x}$ a pour dérivée $-\dfrac{1}{x^2} < 0$ sur $\mathbb{R}^*$. Elle est décroissante sur $]-\infty ; 0[$ **et** sur $]0 ; +\infty[$, mais **pas** sur $\mathbb{R}^*$ : $-1 < 1$ et pourtant $\dfrac{1}{-1} = -1 < 1 = \dfrac{1}{1}$. On doit toujours raisonner **intervalle par intervalle**.`,
        },
      ],
    },
    { type: 'h3', text: '1.2 Le tableau de variations' },
    {
      type: 'p',
      text: r`On résume l'étude dans un **tableau de variations** : une ligne pour $x$ (bornes et valeurs où $f'$ s'annule ou change de signe), une ligne pour le signe de $f'(x)$, une ligne de flèches pour $f$ (montante si $f' > 0$, descendante si $f' < 0$), au bout desquelles on écrit les **images**.`,
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé : $f(x) = x^3 - 3x + 1$ sur $\mathbb{R}$',
      content: [
        { type: 'p', text: r`$f$ est une fonction polynôme, dérivable sur $\mathbb{R}$, et pour tout réel $x$ :` },
        { type: 'math', tex: r`f'(x) = 3x^2 - 3 = 3(x^2 - 1) = 3(x-1)(x+1).` },
        { type: 'p', text: r`$f'(x)$ est un trinôme de coefficient $a = 3 > 0$ et de racines $-1$ et $1$ : il est **positif à l'extérieur des racines**, négatif entre elles.` },
        { type: 'p', text: r`Images : $f(-1) = -1 + 3 + 1 = 3$ et $f(1) = 1 - 3 + 1 = -1$.` },
        { type: 'p', text: r`Donc $f$ est strictement croissante sur $]-\infty ; -1]$, strictement décroissante sur $[-1 ; 1]$ et strictement croissante sur $[1 ; +\infty[$.` },
      ],
    },
    { type: 'svg', svg: svgTableau, caption: 'Tableau de variations de $f(x) = x^3 - 3x + 1$.', maxWidth: 560 },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Où placer les valeurs ?',
      content: [
        { type: 'p', text: r`Dans la ligne $x$, on met les bornes de l'ensemble d'étude et **toutes** les valeurs où $f'$ s'annule (ou n'est pas définie). Les limites en $\pm\infty$ sont au programme de Terminale : en Première, on laisse ces cases vides (ou on travaille sur un intervalle fermé $[a ; b]$ en calculant $f(a)$ et $f(b)$).` },
      ],
    },
    { type: 'h2', text: '2. Extremums' },
    { type: 'h3', text: '2.1 Définitions' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Maximum, minimum (globaux)',
      content: [
        { type: 'p', text: r`Soit $f$ définie sur $I$ et $a \in I$. $f(a)$ est **le maximum** de $f$ sur $I$ si, pour tout $x \in I$, $f(x) \leqslant f(a)$. $f(a)$ est **le minimum** de $f$ sur $I$ si, pour tout $x \in I$, $f(x) \geqslant f(a)$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Extremum local',
      content: [
        { type: 'p', text: r`$f(a)$ est un **maximum local** (resp. **minimum local**) de $f$ s'il existe un intervalle ouvert $J$ contenant $a$ tel que $f(a)$ soit le maximum (resp. minimum) de $f$ sur $J \cap I$. Un **extremum** est un maximum ou un minimum.` },
      ],
    },
    { type: 'svg', svg: svgExtremums, caption: 'Extremums locaux de $x^3 - 3x + 1$ : tangentes horizontales en $-1$ et $1$.', maxWidth: 680 },
    { type: 'h3', text: '2.2 Extremum et dérivée' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Condition nécessaire',
      content: [
        { type: 'p', text: r`Si $f$ est dérivable sur un intervalle **ouvert** $I$ et admet un extremum local en $a \in I$, alors $f'(a) = 0$.` },
        { type: 'p', text: r`*Interprétation :* la tangente à $\mathcal{C}_f$ au point d'abscisse $a$ est **horizontale** (d'équation $y = f(a)$).` },
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Condition suffisante',
      content: [
        { type: 'p', text: r`Si $f'$ **s'annule en changeant de signe** en $a$, alors $f$ admet un extremum local en $a$ :` },
        {
          type: 'list',
          items: [
            r`$f'$ passe de $+$ à $-$ : $f$ croît puis décroît, $f(a)$ est un **maximum local** ;`,
            r`$f'$ passe de $-$ à $+$ : $f$ décroît puis croît, $f(a)$ est un **minimum local**.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Deux pièges classiques',
      content: [
        {
          type: 'list',
          items: [
            r`$f'(a) = 0$ **sans changement de signe** : pas d'extremum. Exemple : $f(x) = x^3$, $f'(x) = 3x^2 \geqslant 0$, $f'(0) = 0$, mais $f$ est strictement croissante.`,
            r`Un extremum peut être atteint **au bord** de l'intervalle sans que $f'$ s'annule : $f(x) = x$ sur $[0 ; 1]$ a pour maximum $1$ en $1$, alors que $f'(1) = 1 \neq 0$. La condition nécessaire ne vaut que pour un point **intérieur**.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : local mais pas global',
      content: [
        { type: 'p', text: r`Pour $f(x) = x^3 - 3x + 1$, $3$ est un maximum local (atteint en $-1$) mais pas un maximum sur $\mathbb{R}$ : $f(3) = 27 - 9 + 1 = 19 > 3$. Sur l'intervalle $[-2 ; 2]$, en revanche, $f(-2) = -8 + 6 + 1 = -1$ et $f(2) = 8 - 6 + 1 = 3$ : le maximum de $f$ sur $[-2;2]$ est $3$ (atteint en $-1$ et en $2$) et le minimum est $-1$ (atteint en $-2$ et en $1$).` },
      ],
    },
    { type: 'h2', text: '3. Étude complète de fonctions' },
    {
      type: 'steps',
      items: [
        { title: 'Ensemble de définition et de dérivabilité', text: r`Pour un quotient $\dfrac{u}{v}$, exclure les valeurs qui annulent $v$.` },
        { title: 'Calcul de la dérivée', text: r`Utiliser les formules (somme, produit, quotient, $g(ax+b)$). **Réduire au même dénominateur et factoriser.**` },
        { title: 'Signe de la dérivée', text: r`Repérer les facteurs de signe connu (carré, dénominateur $v^2>0$, constante) ; étudier les autres (affine, trinôme) dans un tableau de signes.` },
        { title: 'Tableau de variations', text: r`Flèches + images calculées en valeur exacte. Indiquer les extremums.` },
        { title: 'Exploitation', text: r`Tangentes, position relative, nombre de solutions, inégalités, optimisation…` },
      ],
    },
    { type: 'h3', text: '3.1 Polynôme de degré 3' },
    {
      type: 'p',
      text: r`Pour $f(x) = ax^3 + bx^2 + cx + d$ ($a \neq 0$), la dérivée $f'(x) = 3ax^2 + 2bx + c$ est un **trinôme** : on étudie son signe avec son discriminant $\Delta = (2b)^2 - 4 \times 3a \times c = 4b^2 - 12ac$.`,
    },
    {
      type: 'table',
      headers: [r`Signe du discriminant de $f'$`, r`Allure de $f$ (cas $a > 0$)`],
      rows: [
        [r`$\Delta > 0$ : deux racines $x_1 < x_2$`, r`croissante, décroissante, croissante : un maximum local en $x_1$, un minimum local en $x_2$`],
        [r`$\Delta = 0$ : une racine double`, r`strictement croissante (tangente horizontale en un point, sans extremum)`],
        [r`$\Delta < 0$ : pas de racine`, r`strictement croissante sur $\mathbb{R}$, aucun extremum`],
      ],
      caption: 'Pour $a < 0$, inverser les sens de variation.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : $g(x) = -2x^3 + 3x^2 + 12x - 5$',
      content: [
        { type: 'math', tex: r`g'(x) = -6x^2 + 6x + 12 = -6(x^2 - x - 2) = -6(x+1)(x-2).` },
        { type: 'p', text: r`Le trinôme $-6x^2 + 6x + 12$ a un coefficient dominant négatif : il est **négatif** à l'extérieur des racines $-1$ et $2$, positif entre elles.` },
        { type: 'p', text: r`$g(-1) = 2 + 3 - 12 - 5 = -12$ et $g(2) = -16 + 12 + 24 - 5 = 15$.` },
        { type: 'p', text: r`$g$ est décroissante sur $]-\infty ; -1]$, croissante sur $[-1 ; 2]$, décroissante sur $[2 ; +\infty[$ : minimum local $-12$ en $-1$, maximum local $15$ en $2$.` },
      ],
    },
    {
      type: 'table',
      headers: [r`$x$`, r`$]-\infty ; -1[$`, r`$-1$`, r`$]-1 ; 2[$`, r`$2$`, r`$]2 ; +\infty[$`],
      rows: [
        [r`$-6$`, r`$-$`, r`$-$`, r`$-$`, r`$-$`, r`$-$`],
        [r`$x + 1$`, r`$-$`, r`$0$`, r`$+$`, r`$+$`, r`$+$`],
        [r`$x - 2$`, r`$-$`, r`$-$`, r`$-$`, r`$0$`, r`$+$`],
        [r`$g'(x)$`, r`$-$`, r`$0$`, r`$+$`, r`$0$`, r`$-$`],
        [r`$g$`, r`$\searrow$`, r`$-12$ (min. local)`, r`$\nearrow$`, r`$15$ (max. local)`, r`$\searrow$`],
      ],
      caption: 'Tableau de signes de $g\'(x)$ puis variations de $g$.',
    },
    { type: 'h3', text: '3.2 Fonctions quotients' },
    {
      type: 'callout',
      variant: 'method',
      title: 'Astuce clé',
      content: [
        { type: 'p', text: r`Avec $\left(\dfrac{u}{v}\right)' = \dfrac{u'v - uv'}{v^2}$, le dénominateur $v(x)^2$ est **strictement positif** sur l'ensemble de définition : le signe de la dérivée est celui du **numérateur** $u'v - uv'$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple 1 : $f(x) = \\dfrac{2x+1}{x-3}$ sur $]3 ; +\\infty[$',
      content: [
        { type: 'p', text: r`$u(x) = 2x + 1$, $u'(x) = 2$, $v(x) = x - 3$, $v'(x) = 1$.` },
        { type: 'math', tex: r`f'(x) = \frac{2(x-3) - (2x+1)\times 1}{(x-3)^2} = \frac{-7}{(x-3)^2} < 0.` },
        { type: 'p', text: r`$f$ est strictement décroissante sur $]3 ; +\infty[$ (et aussi sur $]-\infty ; 3[$, séparément).` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple 2 : $h(x) = \\dfrac{x^2+3}{x+1}$ sur $]-1 ; +\\infty[$',
      content: [
        { type: 'math', tex: r`h'(x) = \frac{2x(x+1) - (x^2+3)\times 1}{(x+1)^2} = \frac{x^2 + 2x - 3}{(x+1)^2} = \frac{(x+3)(x-1)}{(x+1)^2}.` },
        { type: 'p', text: r`Sur $]-1 ; +\infty[$ : $x + 3 > 0$ et $(x+1)^2 > 0$, donc $h'(x)$ a le signe de $x - 1$.` },
        { type: 'p', text: r`$h$ est strictement décroissante sur $]-1 ; 1]$, strictement croissante sur $[1 ; +\infty[$, et admet un **minimum** égal à $h(1) = \dfrac{4}{2} = 2$. Conséquence : pour tout $x > -1$, $\dfrac{x^2+3}{x+1} \geqslant 2$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple 3 : $k(x) = \\dfrac{x}{x^2+1}$ sur $\\mathbb{R}$',
      content: [
        { type: 'p', text: r`Le dénominateur ne s'annule jamais ($x^2 + 1 \geqslant 1$), donc $k$ est dérivable sur $\mathbb{R}$.` },
        { type: 'math', tex: r`k'(x) = \frac{1\times(x^2+1) - x \times 2x}{(x^2+1)^2} = \frac{1 - x^2}{(x^2+1)^2} = \frac{(1-x)(1+x)}{(x^2+1)^2}.` },
        { type: 'p', text: r`$k'$ est négative sur $]-\infty ; -1]$, positive sur $[-1 ; 1]$, négative sur $[1 ; +\infty[$. Minimum local $k(-1) = -\dfrac{1}{2}$, maximum local $k(1) = \dfrac{1}{2}$. On peut montrer qu'ils sont globaux : $\dfrac12 - k(x) = \dfrac{(x-1)^2}{2(x^2+1)} \geqslant 0$.` },
      ],
    },
    { type: 'h2', text: '4. Position relative de deux courbes, d’une courbe et d’une tangente' },
    {
      type: 'callout',
      variant: 'method',
      title: 'Méthode générale',
      content: [
        { type: 'p', text: r`Pour comparer $\mathcal{C}_f$ et $\mathcal{C}_g$ sur $I$, on étudie le **signe de la différence** $d(x) = f(x) - g(x)$ :` },
        {
          type: 'list',
          items: [
            r`$d(x) > 0$ : $\mathcal{C}_f$ est **au-dessus** de $\mathcal{C}_g$ ;`,
            r`$d(x) < 0$ : $\mathcal{C}_f$ est **en dessous** de $\mathcal{C}_g$ ;`,
            r`$d(x) = 0$ : les courbes se **coupent** (point d'intersection).`,
          ],
        },
        { type: 'p', text: r`Pour la tangente $T_a$ : $g(x) = f'(a)(x - a) + f(a)$. Comme $d(a) = 0$, le polynôme $d$ admet $a$ pour racine — et même **racine double** : $(x-a)^2$ est en facteur pour un polynôme.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : $f(x) = x^3$ et sa tangente en $1$',
      content: [
        { type: 'p', text: r`$f(1) = 1$, $f'(x) = 3x^2$ donc $f'(1) = 3$. $T_1 : y = 3(x-1) + 1 = 3x - 2$.` },
        { type: 'p', text: r`$d(x) = x^3 - 3x + 2$. On vérifie par développement que $(x-1)^2(x+2) = (x^2 - 2x + 1)(x + 2) = x^3 - 3x + 2$.` },
        { type: 'p', text: r`$(x-1)^2 \geqslant 0$, donc $d(x)$ a le signe de $x + 2$ : la courbe est en dessous de $T_1$ sur $]-\infty ; -2[$, au-dessus sur $]-2 ; +\infty[$ ; elles se coupent en $(-2 ; -8)$ et se touchent en $(1 ; 1)$.` },
      ],
    },
    { type: 'svg', svg: svgPosition, caption: 'Position de la courbe de $x^3$ par rapport à sa tangente en $1$.', maxWidth: 680 },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Si on ne sait pas factoriser $d$',
      content: [{ type: 'p', text: r`On étudie les **variations** de $d$ (on dérive $d$) pour déterminer son signe : si son minimum est $0$, alors $d \geqslant 0$. C'est la méthode utilisée pour démontrer des inégalités.` }],
    },
    { type: 'h2', text: '5. Démontrer une inégalité' },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : pour tout $x > 0$, $x + \\dfrac{1}{x} \\geqslant 2$',
      content: [
        { type: 'p', text: r`Soit $f(x) = x + \dfrac{1}{x}$ sur $]0 ; +\infty[$. $f'(x) = 1 - \dfrac{1}{x^2} = \dfrac{x^2 - 1}{x^2} = \dfrac{(x-1)(x+1)}{x^2}$.` },
        { type: 'p', text: r`Pour $x > 0$ : $x + 1 > 0$ et $x^2 > 0$, donc $f'(x)$ a le signe de $x - 1$ : $f$ décroît sur $]0 ; 1]$ et croît sur $[1 ; +\infty[$.` },
        { type: 'p', text: r`Le minimum de $f$ sur $]0;+\infty[$ est $f(1) = 2$, donc $f(x) \geqslant 2$ pour tout $x > 0$. **Égalité si et seulement si $x = 1$.**` },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Vérification algébrique',
      content: [{ type: 'p', text: r`On peut aussi écrire $x + \dfrac1x - 2 = \dfrac{x^2 - 2x + 1}{x} = \dfrac{(x-1)^2}{x} \geqslant 0$ pour $x>0$. Les deux méthodes se complètent : la seconde est plus rapide quand on « voit » l'identité remarquable.` }],
    },
    { type: 'h2', text: '6. Problèmes d’optimisation' },
    {
      type: 'steps',
      items: [
        { title: 'Choisir la variable', text: r`Identifier la grandeur libre $x$ et ses **contraintes** : intervalle d'étude $[a ; b]$ (longueur positive, quantité limitée…).` },
        { title: 'Modéliser', text: r`Exprimer la grandeur à optimiser (aire, volume, coût, bénéfice…) en fonction de $x$ : $f(x)$.` },
        { title: 'Étudier', text: r`Dériver, étudier le signe de $f'$, dresser le tableau de variations sur $[a ; b]$.` },
        { title: 'Conclure', text: r`Lire l'extremum dans le tableau et **répondre à la question posée** avec unités.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : la boîte de volume maximal',
      content: [
        { type: 'p', text: r`Dans une feuille carrée de côté $12$ cm, on découpe aux quatre coins un carré de côté $x$ cm, puis on relève les bords. Quel $x$ donne un volume maximal ?` },
        { type: 'p', text: r`**Modélisation.** Le fond est un carré de côté $12 - 2x$, la hauteur est $x$, avec $0 \leqslant x \leqslant 6$. $V(x) = x(12 - 2x)^2$.` },
        { type: 'p', text: r`**Dérivée** (produit $u = x$, $v = (12-2x)^2$, $v' = 2 \times (-2)(12 - 2x)$) :` },
        { type: 'math', tex: r`V'(x) = (12-2x)^2 - 4x(12-2x) = (12-2x)(12 - 6x) = 12(6 - x)(2 - x).` },
        { type: 'p', text: r`Sur $[0 ; 6]$, $6 - x \geqslant 0$ : $V'(x)$ a le signe de $2 - x$. $V$ croît sur $[0 ; 2]$, décroît sur $[2 ; 6]$.` },
        { type: 'p', text: r`**Conclusion.** Le volume est maximal pour $x = 2$ cm et vaut $V(2) = 2 \times 8^2 = 128$ cm³.` },
      ],
    },
    { type: 'svg', svg: svgBoite, caption: 'Patron et boîte : volume $V(x) = x(12-2x)^2$.', maxWidth: 600 },
    { type: 'h2', text: '7. Lecture graphique et liens entre $f$ et $f\'$' },
    {
      type: 'table',
      headers: [r`Sur la courbe de $f$`, r`Sur la courbe de $f'$`],
      rows: [
        [r`$f$ croissante`, r`$\mathcal{C}_{f'}$ au-dessus de l'axe des abscisses`],
        [r`$f$ décroissante`, r`$\mathcal{C}_{f'}$ en dessous de l'axe des abscisses`],
        [r`Extremum local de $f$ en $a$ (tangente horizontale)`, r`$\mathcal{C}_{f'}$ **coupe** l'axe des abscisses en $a$ (changement de signe)`],
        [r`Pente de la tangente en $a$`, r`Ordonnée du point de $\mathcal{C}_{f'}$ d'abscisse $a$`],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ne pas confondre',
      content: [{ type: 'p', text: r`Ce sont les **valeurs** de $f'$ (au-dessus/en dessous de l'axe) qui donnent les variations de $f$, et non les variations de $f'$. Une dérivée décroissante peut très bien rester positive : la fonction est alors croissante, de plus en plus lentement.` }],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Un peu d’histoire',
      content: [
        { type: 'p', text: r`Pierre de Fermat (vers 1636) recherchait déjà les maxima et minima en écrivant que $f(x+e)$ et $f(x)$ sont « presque égaux » au voisinage d'un extremum — une idée très proche de $f'(a) = 0$. Leibniz (1684) et Newton formaliseront ensuite le calcul différentiel.` },
      ],
    },
  ],

  // =========================================================================
  // EXERCICES
  // =========================================================================
  exercices: [
    {
      id: 'var-ex1',
      title: 'Tableau de variations d’un polynôme de degré 3',
      difficulty: 1,
      duration: 10,
      tags: ['degré 3', 'tableau de variations'],
      statement: [
        { type: 'p', text: r`Soit $f$ la fonction définie sur $\mathbb{R}$ par $f(x) = 2x^3 - 9x^2 + 12x - 4$.` },
        { type: 'list', ordered: true, items: [r`Calculer $f'(x)$ et la factoriser.`, r`Dresser le tableau de variations de $f$.`, r`Préciser les extremums locaux de $f$.`] },
      ],
      hints: [r`$f'(x) = 6x^2 - 18x + 12$ : mettre $6$ en facteur.`, r`$x^2 - 3x + 2$ a une racine évidente : $1$.`],
      solution: [
        { type: 'p', text: r`**1.** $f$ est un polynôme, dérivable sur $\mathbb{R}$ : $f'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2)$. Le trinôme $x^2 - 3x + 2$ a pour discriminant $\Delta = 9 - 8 = 1$, racines $\dfrac{3 - 1}{2} = 1$ et $\dfrac{3+1}{2} = 2$. Donc $f'(x) = 6(x-1)(x-2)$.` },
        { type: 'p', text: r`**2.** $f'(x)$ est un trinôme de coefficient dominant $6 > 0$ : positif sur $]-\infty ; 1[$ et $]2 ; +\infty[$, négatif sur $]1 ; 2[$. On calcule $f(1) = 2 - 9 + 12 - 4 = 1$ et $f(2) = 16 - 36 + 24 - 4 = 0$.` },
        {
          type: 'table',
          headers: [r`$x$`, r`$]-\infty ; 1[$`, r`$1$`, r`$]1 ; 2[$`, r`$2$`, r`$]2 ; +\infty[$`],
          rows: [
            [r`$f'(x)$`, r`$+$`, r`$0$`, r`$-$`, r`$0$`, r`$+$`],
            [r`$f$`, r`$\nearrow$`, r`$1$`, r`$\searrow$`, r`$0$`, r`$\nearrow$`],
          ],
        },
        { type: 'p', text: r`**3.** $f'$ s'annule en changeant de signe en $1$ (de $+$ à $-$) : $f(1) = 1$ est un **maximum local**. En $2$ (de $-$ à $+$) : $f(2) = 0$ est un **minimum local**.` },
      ],
    },
    {
      id: 'var-ex2',
      title: 'Variations d’une fonction homographique',
      difficulty: 1,
      duration: 8,
      tags: ['quotient'],
      statement: [
        { type: 'p', text: r`Soit $f(x) = \dfrac{3x - 1}{x + 2}$ définie sur $]-2 ; +\infty[$.` },
        { type: 'list', ordered: true, items: [r`Calculer $f'(x)$.`, r`En déduire le sens de variation de $f$ sur $]-2 ; +\infty[$.`, r`Comparer, sans calcul supplémentaire, $f(10^{3})$ et $f(10^{4})$.`] },
      ],
      hints: [r`Formule $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$ avec $u = 3x-1$ et $v = x + 2$.`],
      solution: [
        { type: 'p', text: r`**1.** $u(x) = 3x - 1$, $u'(x) = 3$ ; $v(x) = x + 2$, $v'(x) = 1$. Pour $x > -2$ :` },
        { type: 'math', tex: r`f'(x) = \frac{3(x+2) - (3x-1)}{(x+2)^2} = \frac{3x + 6 - 3x + 1}{(x+2)^2} = \frac{7}{(x+2)^2}.` },
        { type: 'p', text: r`**2.** $7 > 0$ et $(x+2)^2 > 0$ sur $]-2;+\infty[$, donc $f'(x) > 0$ : $f$ est **strictement croissante** sur $]-2 ; +\infty[$.` },
        { type: 'p', text: r`**3.** $10^3 < 10^4$ et ces deux nombres appartiennent à $]-2 ; +\infty[$ où $f$ est strictement croissante, donc $f(10^3) < f(10^4)$.` },
      ],
    },
    {
      id: 'var-ex3',
      title: 'Encadrement par l’étude des extremums',
      difficulty: 2,
      duration: 15,
      tags: ['quotient', 'extremums', 'inégalité'],
      statement: [
        { type: 'p', text: r`Soit $f(x) = \dfrac{4x}{x^2 + 1}$ définie sur $\mathbb{R}$.` },
        { type: 'list', ordered: true, items: [r`Justifier que $f$ est dérivable sur $\mathbb{R}$ et calculer $f'(x)$.`, r`Dresser le tableau de variations de $f$ sur $[-3 ; 3]$.`, r`Démontrer que pour tout réel $x$, $-2 \leqslant f(x) \leqslant 2$.`] },
      ],
      hints: [r`Le dénominateur vérifie $x^2 + 1 \geqslant 1$.`, r`Pour la question 3, étudier le signe de $2 - f(x)$ et de $f(x) + 2$ en réduisant au même dénominateur.`],
      solution: [
        { type: 'p', text: r`**1.** $x^2 + 1 \geqslant 1 > 0$ : le dénominateur ne s'annule pas, $f$ est un quotient de polynômes dérivable sur $\mathbb{R}$.` },
        { type: 'math', tex: r`f'(x) = \frac{4(x^2+1) - 4x\times 2x}{(x^2+1)^2} = \frac{4 - 4x^2}{(x^2+1)^2} = \frac{4(1-x)(1+x)}{(x^2+1)^2}.` },
        { type: 'p', text: r`**2.** Le signe de $f'(x)$ est celui de $4(1 - x^2)$ : positif sur $]-1 ; 1[$, négatif ailleurs. Images : $f(-3) = \dfrac{-12}{10} = -1{,}2$ ; $f(-1) = \dfrac{-4}{2} = -2$ ; $f(1) = 2$ ; $f(3) = 1{,}2$.` },
        {
          type: 'table',
          headers: [r`$x$`, r`$-3$`, r`$]-3 ; -1[$`, r`$-1$`, r`$]-1 ; 1[$`, r`$1$`, r`$]1 ; 3[$`, r`$3$`],
          rows: [
            [r`$f'(x)$`, '', r`$-$`, r`$0$`, r`$+$`, r`$0$`, r`$-$`, ''],
            [r`$f$`, r`$-1{,}2$`, r`$\searrow$`, r`$-2$`, r`$\nearrow$`, r`$2$`, r`$\searrow$`, r`$1{,}2$`],
          ],
        },
        { type: 'p', text: r`**3.** $2 - f(x) = \dfrac{2x^2 + 2 - 4x}{x^2+1} = \dfrac{2(x-1)^2}{x^2+1} \geqslant 0$ et $f(x) + 2 = \dfrac{2x^2 + 4x + 2}{x^2+1} = \dfrac{2(x+1)^2}{x^2+1} \geqslant 0$. Donc $-2 \leqslant f(x) \leqslant 2$ pour tout $x$ réel : $2$ et $-2$ sont le maximum et le minimum (globaux) de $f$ sur $\mathbb{R}$.` },
      ],
    },
    {
      id: 'var-ex4',
      title: 'Position d’une courbe par rapport à une tangente',
      difficulty: 2,
      duration: 15,
      tags: ['tangente', 'position relative'],
      statement: [
        { type: 'p', text: r`Soit $f(x) = x^3 - 3x^2 + 2$ et $\mathcal{C}$ sa courbe représentative.` },
        { type: 'list', ordered: true, items: [r`Déterminer l'équation de la tangente $T$ à $\mathcal{C}$ au point d'abscisse $1$.`, r`Montrer que $f(x) - (-3x + 3) = (x-1)^3$.`, r`En déduire la position relative de $\mathcal{C}$ et de $T$.`] },
      ],
      hints: [r`$T : y = f'(1)(x - 1) + f(1)$.`, r`Développer $(x-1)^3 = x^3 - 3x^2 + 3x - 1$.`],
      solution: [
        { type: 'p', text: r`**1.** $f(1) = 1 - 3 + 2 = 0$. $f'(x) = 3x^2 - 6x$, donc $f'(1) = -3$. $T : y = -3(x - 1) + 0$, soit $y = -3x + 3$.` },
        { type: 'p', text: r`**2.** $f(x) - (-3x + 3) = x^3 - 3x^2 + 2 + 3x - 3 = x^3 - 3x^2 + 3x - 1$. Or $(x-1)^3 = x^3 - 3x^2 + 3x - 1$. D'où l'égalité.` },
        { type: 'p', text: r`**3.** $(x-1)^3$ a le signe de $x - 1$ : pour $x < 1$, $\mathcal{C}$ est **en dessous** de $T$ ; pour $x > 1$, $\mathcal{C}$ est **au-dessus** de $T$. La courbe **traverse** sa tangente au point $(1 ; 0)$ : on dit que c'est un *point d'inflexion* (notion de Terminale).` },
      ],
    },
    {
      id: 'var-ex5',
      title: 'Démontrer une inégalité',
      difficulty: 2,
      duration: 12,
      tags: ['inégalité', 'étude de fonction'],
      statement: [
        { type: 'p', text: r`Démontrer que pour tout réel $x \geqslant 0$, $x^3 + 2 \geqslant 3x$, en étudiant la fonction $g(x) = x^3 - 3x + 2$ sur $[0 ; +\infty[$. Dans quel cas a-t-on l'égalité ?` },
      ],
      hints: [r`$g'(x) = 3(x^2 - 1)$.`, r`Chercher le minimum de $g$ sur $[0;+\infty[$.`],
      solution: [
        { type: 'p', text: r`$g$ est dérivable sur $[0 ; +\infty[$ et $g'(x) = 3x^2 - 3 = 3(x-1)(x+1)$. Pour $x \geqslant 0$, $x + 1 > 0$, donc $g'(x)$ a le signe de $x - 1$ : $g$ est décroissante sur $[0 ; 1]$ et croissante sur $[1 ; +\infty[$.` },
        { type: 'p', text: r`$g$ admet donc sur $[0 ; +\infty[$ un minimum égal à $g(1) = 1 - 3 + 2 = 0$. Ainsi $g(x) \geqslant 0$, c'est-à-dire $x^3 - 3x + 2 \geqslant 0$, soit $x^3 + 2 \geqslant 3x$.` },
        { type: 'p', text: r`L'égalité a lieu si et seulement si $g(x) = 0$, c'est-à-dire (sur $[0;+\infty[$) pour $x = 1$. *Remarque :* $g(x) = (x-1)^2(x+2)$, ce qui confirme le résultat et montre qu'il reste vrai pour $x \geqslant -2$.` },
      ],
    },
    {
      id: 'var-ex6',
      title: 'Bénéfice maximal d’une entreprise',
      difficulty: 2,
      duration: 20,
      tags: ['optimisation', 'économie'],
      statement: [
        { type: 'p', text: r`Une entreprise fabrique $q$ centaines d'objets par jour, avec $q \in [0 ; 10]$. Le coût total de production, en centaines d'euros, est $C(q) = q^3 - 12q^2 + 60q$. Chaque centaine d'objets est vendue $39$ centaines d'euros.` },
        {
          type: 'list',
          ordered: true,
          items: [
            r`Étudier le sens de variation de $C$ sur $[0 ; 10]$.`,
            r`Exprimer le bénéfice $B(q)$ en fonction de $q$.`,
            r`Étudier les variations de $B$ sur $[0;10]$.`,
            r`Quelle production faut-il réaliser pour un bénéfice maximal ? Quel est ce bénéfice ?`,
          ],
        },
      ],
      hints: [r`Pour $C'$, le discriminant du trinôme est négatif.`, r`$B(q) = 39q - C(q)$.`, r`$B'(q) = -3q^2 + 24q - 21 = -3(q-1)(q-7)$.`],
      solution: [
        { type: 'p', text: r`**1.** $C'(q) = 3q^2 - 24q + 60 = 3(q^2 - 8q + 20)$. Discriminant de $q^2 - 8q + 20$ : $64 - 80 = -16 < 0$, donc ce trinôme est toujours du signe de son coefficient dominant $1 > 0$. $C'(q) > 0$ : $C$ est strictement croissante sur $[0;10]$ (logique : produire plus coûte plus).` },
        { type: 'p', text: r`**2.** $B(q) = R(q) - C(q) = 39q - (q^3 - 12q^2 + 60q) = -q^3 + 12q^2 - 21q$.` },
        { type: 'p', text: r`**3.** $B'(q) = -3q^2 + 24q - 21 = -3(q^2 - 8q + 7) = -3(q-1)(q-7)$. Coefficient dominant $-3 < 0$ : $B'(q) < 0$ sur $[0 ; 1[$ et $]7 ; 10]$, $B'(q) > 0$ sur $]1 ; 7[$. Images : $B(0) = 0$, $B(1) = -1 + 12 - 21 = -10$, $B(7) = -343 + 588 - 147 = 98$, $B(10) = -1000 + 1200 - 210 = -10$.` },
        {
          type: 'table',
          headers: [r`$q$`, r`$0$`, r`$]0 ; 1[$`, r`$1$`, r`$]1 ; 7[$`, r`$7$`, r`$]7 ; 10[$`, r`$10$`],
          rows: [
            [r`$B'(q)$`, '', r`$-$`, r`$0$`, r`$+$`, r`$0$`, r`$-$`, ''],
            [r`$B$`, r`$0$`, r`$\searrow$`, r`$-10$`, r`$\nearrow$`, r`$98$`, r`$\searrow$`, r`$-10$`],
          ],
        },
        { type: 'p', text: r`**4.** Le bénéfice est maximal pour $q = 7$, c'est-à-dire **700 objets par jour**, et il vaut $98$ centaines d'euros, soit **9 800 €**.` },
      ],
    },
    {
      id: 'var-ex7',
      title: 'Type bac : étude d’un quotient et tangente',
      difficulty: 3,
      duration: 30,
      tags: ['type bac', 'quotient', 'tangente', 'position relative'],
      statement: [
        { type: 'p', text: r`On considère la fonction $f$ définie sur $[0 ; 5]$ par $f(x) = \dfrac{x^2 + 3}{x + 1}$, de courbe $\mathcal{C}$ dans un repère orthonormé.` },
        {
          type: 'list',
          ordered: true,
          items: [
            r`Montrer que pour tout $x \in [0;5]$, $f'(x) = \dfrac{(x+3)(x-1)}{(x+1)^2}$.`,
            r`Dresser le tableau de variations de $f$ sur $[0 ; 5]$. Préciser le minimum de $f$.`,
            r`Déterminer une équation de la tangente $T$ à $\mathcal{C}$ au point d'abscisse $0$.`,
            r`Montrer que pour tout $x \in [0 ; 5]$, $f(x) - (-3x + 3) = \dfrac{4x^2}{x+1}$. En déduire la position de $\mathcal{C}$ par rapport à $T$.`,
            r`Déterminer, s'il existe, un point de $\mathcal{C}$ où la tangente est parallèle à la droite d'équation $y = \dfrac{3}{4}x$.`,
          ],
        },
      ],
      hints: [
        r`Pour la question 5, résoudre $f'(x) = \dfrac34$.`,
        r`$4(x^2 + 2x - 3) = 3(x+1)^2$ conduit à $x^2 + 2x - 15 = 0$.`,
      ],
      solution: [
        { type: 'p', text: r`**1.** $u = x^2 + 3$, $u' = 2x$, $v = x + 1$, $v' = 1$ ; $v$ ne s'annule pas sur $[0;5]$.` },
        { type: 'math', tex: r`f'(x) = \frac{2x(x+1) - (x^2 + 3)}{(x+1)^2} = \frac{x^2 + 2x - 3}{(x+1)^2} = \frac{(x+3)(x-1)}{(x+1)^2}` },
        { type: 'p', text: r`car $(x+3)(x-1) = x^2 + 2x - 3$.` },
        { type: 'p', text: r`**2.** Sur $[0;5]$, $x + 3 > 0$ et $(x+1)^2 > 0$ : $f'(x)$ a le signe de $x - 1$. $f(0) = 3$, $f(1) = \dfrac{4}{2} = 2$, $f(5) = \dfrac{28}{6} = \dfrac{14}{3}$.` },
        {
          type: 'table',
          headers: [r`$x$`, r`$0$`, r`$]0 ; 1[$`, r`$1$`, r`$]1 ; 5[$`, r`$5$`],
          rows: [
            [r`$f'(x)$`, '', r`$-$`, r`$0$`, r`$+$`, ''],
            [r`$f$`, r`$3$`, r`$\searrow$`, r`$2$`, r`$\nearrow$`, r`$\dfrac{14}{3}$`],
          ],
        },
        { type: 'p', text: r`Le minimum de $f$ sur $[0;5]$ est $2$, atteint en $x = 1$.` },
        { type: 'p', text: r`**3.** $f'(0) = \dfrac{3 \times (-1)}{1} = -3$ et $f(0) = 3$ : $T : y = -3x + 3$.` },
        { type: 'math', tex: r`f(x) - (-3x+3) = \frac{x^2 + 3 + (3x - 3)(x + 1)}{x+1} = \frac{x^2 + 3 + 3x^2 - 3}{x+1} = \frac{4x^2}{x+1}.` },
        { type: 'p', text: r`**4.** Sur $[0 ; 5]$, $4x^2 \geqslant 0$ et $x + 1 > 0$ : la différence est positive (nulle seulement en $0$). $\mathcal{C}$ est **au-dessus** de $T$ sur $[0 ; 5]$, et la touche au point $(0 ; 3)$.` },
        { type: 'p', text: r`**5.** Deux droites sont parallèles si elles ont même coefficient directeur : on résout $f'(x) = \dfrac34$, soit $4(x^2 + 2x - 3) = 3(x^2 + 2x + 1)$, c'est-à-dire $x^2 + 2x - 15 = 0$. $\Delta = 4 + 60 = 64$, racines $\dfrac{-2-8}{2} = -5 \notin [0;5]$ et $\dfrac{-2+8}{2} = 3$. Le point cherché est $A(3 ; f(3)) = \left(3 ; \dfrac{12}{4}\right) = (3 ; 3)$.` },
      ],
    },
    {
      id: 'var-ex8',
      title: 'Optimisation géométrique : la boîte',
      difficulty: 3,
      duration: 25,
      tags: ['optimisation', 'géométrie'],
      statement: [
        { type: 'p', text: r`On dispose d'une plaque rectangulaire de $16$ cm sur $10$ cm. On découpe à chaque coin un carré de côté $x$ cm, puis on replie pour former une boîte sans couvercle.` },
        {
          type: 'list',
          ordered: true,
          items: [
            r`Dans quel intervalle $I$ peut varier $x$ ?`,
            r`Montrer que le volume de la boîte est $V(x) = 4x^3 - 52x^2 + 160x$.`,
            r`Étudier les variations de $V$ sur $I$ et en déduire la valeur de $x$ rendant le volume maximal, ainsi que ce volume.`,
          ],
        },
      ],
      hints: [r`Les dimensions du fond sont $16 - 2x$ et $10 - 2x$.`, r`$V'(x) = 12x^2 - 104x + 160 = 4(3x^2 - 26x + 40)$.`],
      solution: [
        { type: 'p', text: r`**1.** Il faut $x \geqslant 0$ et $10 - 2x \geqslant 0$ (la plus petite dimension), donc $I = [0 ; 5]$.` },
        { type: 'p', text: r`**2.** $V(x) = x(16 - 2x)(10 - 2x)$. Or $(16 - 2x)(10 - 2x) = 160 - 32x - 20x + 4x^2 = 4x^2 - 52x + 160$, d'où $V(x) = 4x^3 - 52x^2 + 160x$.` },
        { type: 'p', text: r`**3.** $V'(x) = 12x^2 - 104x + 160 = 4(3x^2 - 26x + 40)$. Pour $3x^2 - 26x + 40$ : $\Delta = 676 - 480 = 196 = 14^2$, racines $\dfrac{26 - 14}{6} = 2$ et $\dfrac{26 + 14}{6} = \dfrac{20}{3} \approx 6{,}67 \notin I$. Donc $V'(x) = 12(x - 2)\left(x - \dfrac{20}{3}\right)$.` },
        { type: 'p', text: r`Sur $[0 ; 5]$, $x - \dfrac{20}{3} < 0$ : $V'(x)$ a le signe contraire de $x - 2$. $V$ croît sur $[0 ; 2]$ et décroît sur $[2 ; 5]$. $V(0) = 0$, $V(5) = 0$ et $V(2) = 2 \times 12 \times 6 = 144$.` },
        { type: 'p', text: r`**Conclusion :** le volume est maximal pour $x = 2$ cm ; il vaut alors $144$ cm³ (boîte de $12 \times 6 \times 2$).` },
      ],
    },
    {
      id: 'var-ex9',
      title: 'Python : recherche d’un maximum par balayage',
      difficulty: 2,
      duration: 15,
      tags: ['Python', 'algorithmique', 'optimisation'],
      statement: [
        { type: 'p', text: r`On reprend la boîte du cours : $V(x) = x(12 - 2x)^2$ sur $[0 ; 6]$. On souhaite retrouver le maximum par un programme.` },
        {
          type: 'code',
          lang: 'python',
          code: `def V(x):
    return x * (12 - 2 * x) ** 2

def balayage(a, b, pas):
    x_max = a
    v_max = V(a)
    n = int((b - a) / pas)
    for i in range(n + 1):
        x = a + i * pas
        if V(x) > v_max:
            x_max = x
            v_max = V(x)
    return x_max, v_max

print(balayage(0, 6, 0.01))`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Expliquer le rôle des variables `x_max` et `v_max`.',
            r`Combien de valeurs de $V$ sont testées ? Que renvoie le programme ?`,
            r`Pourquoi le résultat est-il conforme à l'étude théorique ? Quelle est la limite de cette méthode ?`,
          ],
        },
      ],
      hints: [r`La boucle teste $x = 0 ; 0{,}01 ; 0{,}02 ; \dots ; 6$.`],
      solution: [
        { type: 'p', text: "**1.** `v_max` mémorise la plus grande valeur de $V$ rencontrée jusqu'ici et `x_max` l'abscisse correspondante ; elles sont mises à jour chaque fois qu'on trouve une valeur plus grande." },
        { type: 'p', text: r`**2.** $n = \dfrac{6 - 0}{0{,}01} = 600$, la boucle va de $i = 0$ à $i = 600$ : $601$ valeurs testées. Le programme affiche (2.0, 128.0) : maximum $128$ atteint en $x = 2$.` },
        { type: 'p', text: r`**3.** L'étude a montré que $V$ croît sur $[0;2]$ et décroît sur $[2;6]$ avec $V(2) = 128$, et $2$ fait partie des valeurs testées. Limite : le balayage ne donne qu'une **valeur approchée** à la précision du pas près (si le maximum était en $x = \sqrt{2}$, on n'obtiendrait qu'une approximation) ; il ne **démontre** rien, contrairement à l'étude du signe de $V'$.` },
      ],
    },
    {
      id: 'var-ex10',
      title: 'Avec un paramètre : nombre d’extremums',
      difficulty: 3,
      duration: 20,
      tags: ['paramètre', 'degré 3', 'discriminant'],
      statement: [
        { type: 'p', text: r`Pour un réel $m$, on considère $f_m(x) = x^3 + mx^2 + 3x$ sur $\mathbb{R}$.` },
        {
          type: 'list',
          ordered: true,
          items: [r`Calculer $f_m'(x)$ et son discriminant en fonction de $m$.`, r`Pour quelles valeurs de $m$ la fonction $f_m$ est-elle strictement croissante sur $\mathbb{R}$ ?`, r`Pour $m = -3$ : étudier les variations. Pour $m = 5$ : déterminer les extremums locaux.`],
        },
      ],
      hints: [r`$f_m'(x) = 3x^2 + 2mx + 3$, $\Delta = 4m^2 - 36$.`, r`Si $\Delta \leqslant 0$, $f_m'$ ne change pas de signe.`],
      solution: [
        { type: 'p', text: r`**1.** $f_m'(x) = 3x^2 + 2mx + 3$ ; $\Delta = (2m)^2 - 4\times 3 \times 3 = 4m^2 - 36 = 4(m-3)(m+3)$.` },
        { type: 'p', text: r`**2.** Si $\Delta < 0$, i.e. $-3 < m < 3$, alors $f_m'(x) > 0$ pour tout $x$. Si $\Delta = 0$ ($m = \pm 3$), $f_m'(x) \geqslant 0$ et ne s'annule qu'en un point : $f_m$ reste strictement croissante. Si $\Delta > 0$, $f_m'$ est négative entre ses racines : $f_m$ n'est pas croissante. **Conclusion : $f_m$ est strictement croissante sur $\mathbb{R}$ si et seulement si $m \in [-3 ; 3]$.**` },
        { type: 'p', text: r`**3.** Pour $m = -3$ : $f'(x) = 3x^2 - 6x + 3 = 3(x-1)^2 \geqslant 0$, nulle seulement en $1$ : $f$ est strictement croissante sur $\mathbb{R}$, sans extremum (tangente horizontale en $x = 1$).` },
        { type: 'p', text: r`Pour $m = 5$ : $f'(x) = 3x^2 + 10x + 3$, $\Delta = 100 - 36 = 64$, racines $\dfrac{-10 - 8}{6} = -3$ et $\dfrac{-10+8}{6} = -\dfrac13$. $f'$ est positive à l'extérieur des racines : maximum local en $-3$ : $f(-3) = -27 + 45 - 9 = 9$ ; minimum local en $-\dfrac13$ : $f\left(-\dfrac13\right) = -\dfrac{1}{27} + \dfrac{5}{9} - 1 = \dfrac{-1 + 15 - 27}{27} = -\dfrac{13}{27}$.` },
      ],
    },
  ],

  // =========================================================================
  // REPRÉSENTATIONS
  // =========================================================================
  representations: [
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Une fonction et sa dérivée',
      props: { expressions: ['x^3-3*x+1'], showDerivative: true, xMin: -3, xMax: 3, yMin: -4, yMax: 6 },
      caption: 'Observez : là où la courbe de $f\'$ est au-dessus de l\'axe, $f$ croît ; elle s\'annule aux extremums de $f$. Modifiez l\'expression (essayez `x^3`).',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Nombre d’extremums d’un polynôme de degré 3',
      props: {
        expressions: ['x^3+a*x^2+b*x'],
        params: [
          { name: 'a', min: -5, max: 5, step: 0.5, value: 0 },
          { name: 'b', min: -6, max: 6, step: 0.5, value: -3 },
        ],
        showDerivative: true,
        xMin: -4,
        xMax: 4,
        yMin: -8,
        yMax: 8,
      },
      caption: 'La dérivée $3x^2 + 2ax + b$ a pour discriminant $4a^2 - 12b$ : deux extremums si $a^2 > 3b$, aucun sinon.',
    },
    {
      type: 'widget',
      id: 'tangent-explorer',
      title: 'Courbe et tangente : qui est au-dessus ?',
      props: { expression: 'x^3-3*x^2+2', a: 1 },
      caption: 'En $a = 1$, la courbe traverse sa tangente $y = -3x + 3$. Déplacez $a$ : où la tangente est-elle horizontale ?',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Optimisation : volume de la boîte',
      props: { expressions: ['x*(12-2*x)^2'], xMin: 0, xMax: 6, yMin: 0, yMax: 140, showDerivative: false },
      caption: 'Le maximum $128$ cm³ est atteint pour $x = 2$ cm.',
    },
    { type: 'svg', svg: svgTableau, caption: 'Tableau de variations type.', maxWidth: 560 },
    {
      type: 'qcm',
      questions: [
        {
          question: r`$f$ est dérivable sur $[0 ; 4]$ et $f'(x) < 0$ pour tout $x$ de cet intervalle. Alors :`,
          choices: [r`$f(0) < f(4)$`, r`$f(0) > f(4)$`, r`$f(0) = f(4)$`, 'On ne peut rien dire'],
          answer: 1,
          explanation: r`$f$ est strictement décroissante sur $[0;4]$, donc $0 < 4 \Rightarrow f(0) > f(4)$.`,
        },
        {
          question: r`$f'(x) = (x - 2)^2$. Alors $f$ :`,
          choices: [r`admet un minimum en $2$`, r`admet un maximum en $2$`, r`est croissante sur $\mathbb{R}$`, r`est décroissante puis croissante`],
          answer: 2,
          explanation: r`$f'(x) \geqslant 0$ et ne s'annule qu'en $2$ sans changer de signe : $f$ est strictement croissante, pas d'extremum.`,
        },
        {
          question: r`Dérivée de $f(x) = \dfrac{x}{x+1}$ sur $]-1;+\infty[$ :`,
          choices: [r`$\dfrac{1}{(x+1)^2}$`, r`$\dfrac{-1}{(x+1)^2}$`, r`$\dfrac{2x+1}{(x+1)^2}$`, r`$1$`],
          answer: 0,
          explanation: r`$\dfrac{1\times(x+1) - x \times 1}{(x+1)^2} = \dfrac{1}{(x+1)^2}$.`,
        },
        {
          question: r`$f(x) = x^3 - 12x$. Les abscisses des extremums locaux sont :`,
          choices: [r`$0$ et $12$`, r`$-2$ et $2$`, r`$-\sqrt{12}$ et $\sqrt{12}$`, r`$-4$ et $4$`],
          answer: 1,
          explanation: r`$f'(x) = 3x^2 - 12 = 3(x-2)(x+2)$ s'annule en changeant de signe en $\pm 2$.`,
        },
        {
          question: r`La courbe de $f'$ coupe l'axe des abscisses en $a$ en passant du positif au négatif. Alors en $a$, $f$ admet :`,
          choices: ['un minimum local', 'un maximum local', 'aucun extremum', 'une valeur nulle'],
          answer: 1,
          explanation: r`$f$ croît puis décroît : maximum local.`,
        },
        {
          question: r`Pour étudier la position de $\mathcal{C}_f$ par rapport à la droite $D : y = 2x$, on étudie :`,
          choices: [r`le signe de $f'(x) - 2$`, r`le signe de $f(x) - 2x$`, r`les variations de $f$`, r`le signe de $f(x)$`],
          answer: 1,
          explanation: 'On étudie toujours le signe de la différence des ordonnées.',
        },
        {
          question: r`Le maximum de $x \mapsto -x^3 + 3x$ sur $[0 ; 2]$ vaut :`,
          choices: [r`$0$`, r`$2$`, r`$-2$`, r`$1$`],
          answer: 1,
          explanation: r`$f'(x) = -3x^2 + 3 = 3(1-x)(1+x)$ : $f$ croît sur $[0;1]$, décroît sur $[1;2]$, $f(1) = 2$ (et $f(2) = -2$).`,
        },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: r`Si $f'(a) = 0$, alors $f$ admet un extremum local en $a$.`, answer: false, explanation: r`Contre-exemple : $x^3$ en $0$.` },
        { text: r`Si $f$ admet un extremum local en $a$ intérieur à l'intervalle, alors $f'(a) = 0$.`, answer: true, explanation: 'Condition nécessaire du cours.' },
        { text: r`La fonction inverse est décroissante sur $\mathbb{R}^*$.`, answer: false, explanation: r`Seulement sur chacun des intervalles $]-\infty;0[$ et $]0;+\infty[$.` },
        { text: r`Si $f'$ est décroissante, alors $f$ est décroissante.`, answer: false, explanation: r`C'est le **signe** de $f'$ qui compte : $f(x) = -x^2 + 10x$ sur $[0;1]$ a une dérivée décroissante mais positive.` },
        { text: r`Un polynôme de degré 3 admet toujours deux extremums locaux.`, answer: false, explanation: r`$x^3 + x$ est strictement croissante (dérivée $3x^2 + 1 > 0$).` },
        { text: r`Le signe de la dérivée d'un quotient $\frac{u}{v}$ est celui de $u'v - uv'$.`, answer: true, explanation: r`Le dénominateur $v^2$ est strictement positif.` },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque fonction au signe de sa dérivée',
      pairs: [
        { left: r`$x^3 - 3x$`, right: r`$3(x-1)(x+1)$` },
        { left: r`$\dfrac{1}{x^2+1}$`, right: r`$\dfrac{-2x}{(x^2+1)^2}$` },
        { left: r`$x^3 + 3x$`, right: r`$3x^2 + 3 > 0$` },
        { left: r`$\dfrac{x-1}{x+1}$`, right: r`$\dfrac{2}{(x+1)^2}$` },
        { left: r`$x + \dfrac{4}{x}$`, right: r`$\dfrac{(x-2)(x+2)}{x^2}$` },
      ],
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre les étapes d’une étude de fonction',
      items: [
        'Déterminer l’ensemble de définition et de dérivabilité',
        'Calculer la dérivée f′(x)',
        'Factoriser f′(x)',
        'Étudier le signe de f′(x)',
        'Dresser le tableau de variations avec les images',
        'Conclure (extremums, réponse au problème)',
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: r`$f' \geqslant 0$ sur un intervalle $I$`, back: r`$f$ croissante sur $I$` },
        { front: r`$f' = 0$ sur un intervalle $I$`, back: r`$f$ constante sur $I$` },
        { front: 'Condition nécessaire d’extremum local (point intérieur)', back: r`$f'(a) = 0$ (tangente horizontale)` },
        { front: 'Condition suffisante d’extremum local', back: r`$f'$ s'annule **en changeant de signe** en $a$` },
        { front: r`$f'$ passe de $-$ à $+$ en $a$`, back: r`$f(a)$ est un minimum local` },
        { front: 'Contre-exemple classique', back: r`$x^3$ : $f'(0) = 0$ sans extremum` },
        { front: r`Signe de $\left(\frac{u}{v}\right)'$`, back: r`Signe de $u'v - uv'$ car $v^2 > 0$` },
        { front: 'Position de deux courbes', back: r`Signe de $f(x) - g(x)$` },
        { front: 'Équation de la tangente en $a$', back: r`$y = f'(a)(x - a) + f(a)$` },
        { front: r`Démontrer $f \geqslant g$`, back: r`Étudier $d = f - g$, montrer que son minimum est $\geqslant 0$` },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter le raisonnement',
      text: r`Soit $f(x) = x^3 - 6x^2 + 9x$. On a $f'(x) = 3x^2 - 12x + 9 = 3(x - a)(x - b)$ avec $a =$ {{1}} et $b =$ {{3}} ($a < b$). Le trinôme est positif à l'{{extérieur}} des racines. Donc $f$ est {{croissante}} sur $[3 ; +\infty[$, et admet un maximum local égal à {{4}} (atteint en $x = 1$) et un minimum local égal à {{0}} (atteint en $x = 3$).`,
    },
  ],
}

export default chapter
