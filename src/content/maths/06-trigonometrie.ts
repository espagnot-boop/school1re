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
const PI = Math.PI

const f1 = (v: number) => +v.toFixed(1)

// ---------------------------------------------------------------------------
// Schéma 1 : cercle trigonométrique et points remarquables
// ---------------------------------------------------------------------------
const CX = 200
const CY = 200
const R = 140
const px = (t: number, rr = R) => f1(CX + rr * Math.cos(t))
const py = (t: number, rr = R) => f1(CY - rr * Math.sin(t))
const remarquables: [number, string][] = [
  [0, '0'],
  [PI / 6, 'π/6'],
  [PI / 4, 'π/4'],
  [PI / 3, 'π/3'],
  [PI / 2, 'π/2'],
  [(2 * PI) / 3, '2π/3'],
  [(3 * PI) / 4, '3π/4'],
  [(5 * PI) / 6, '5π/6'],
  [PI, 'π'],
  [-PI / 6, '−π/6'],
  [-PI / 4, '−π/4'],
  [-PI / 3, '−π/3'],
  [-PI / 2, '−π/2'],
  [(-2 * PI) / 3, '−2π/3'],
  [(-3 * PI) / 4, '−3π/4'],
  [(-5 * PI) / 6, '−5π/6'],
]
const svgCercle = `<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
<defs><marker id="m6-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${VIOLET}"/></marker></defs>
<line x1="${CX - R - 30}" y1="${CY}" x2="${CX + R + 30}" y2="${CY}" stroke="currentColor" stroke-width="1.2"/>
<line x1="${CX}" y1="${CY + R + 30}" x2="${CX}" y2="${CY - R - 30}" stroke="currentColor" stroke-width="1.2"/>
<circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="${BLUE}" stroke-width="2"/>
${remarquables.map(([t]) => `<line x1="${CX}" y1="${CY}" x2="${px(t)}" y2="${py(t)}" stroke="currentColor" opacity="0.12"/>`).join('')}
<line x1="${px(PI / 3)}" y1="${py(PI / 3)}" x2="${px(PI / 3)}" y2="${CY}" stroke="${RED}" stroke-dasharray="4 3"/>
<line x1="${px(PI / 3)}" y1="${py(PI / 3)}" x2="${CX}" y2="${py(PI / 3)}" stroke="${GREEN}" stroke-dasharray="4 3"/>
<line x1="${CX}" y1="${CY}" x2="${px(PI / 3)}" y2="${py(PI / 3)}" stroke="${ORANGE}" stroke-width="1.8"/>
<path d="M ${px(0, 40)} ${py(0, 40)} A 40 40 0 0 0 ${px(PI / 3, 40)} ${py(PI / 3, 40)}" fill="none" stroke="${VIOLET}" stroke-width="1.5" marker-end="url(#m6-ar)"/>
${remarquables.map(([t]) => `<circle cx="${px(t)}" cy="${py(t)}" r="3.5" fill="${BLUE}"/>`).join('')}
${remarquables.map(([t, l]) => `<text x="${px(t, R + 20)}" y="${f1(py(t, R + 20) + 4)}" text-anchor="middle" fill="currentColor" font-size="11">${l}</text>`).join('')}
<line x1="${px(PI / 3)}" y1="${CY - 4}" x2="${px(PI / 3)}" y2="${CY + 4}" stroke="${RED}" stroke-width="2"/>
<text x="${px(PI / 3)}" y="${CY + 16}" text-anchor="middle" fill="${RED}" font-size="11">1/2</text>
<text x="${CX - 6}" y="${f1(py(PI / 3) + 4)}" text-anchor="end" fill="${GREEN}" font-size="11">√3/2</text>
<text x="${CX - 8}" y="${CY + 16}" text-anchor="end" fill="currentColor">O</text>
<text x="${CX + R + 6}" y="${CY - 22}" fill="currentColor">I</text>
<text x="${CX + 6}" y="${CY - R - 4}" fill="currentColor">J</text>
<g fill="currentColor">
<text x="410" y="40" font-weight="600">Cercle trigonométrique</text>
<text x="410" y="62">centre O, rayon 1, sens direct</text>
<text x="410" y="78">(inverse des aiguilles d’une montre)</text>
<text x="410" y="110" fill="${ORANGE}">M(π/3) : point associé à π/3</text>
<text x="410" y="132" fill="${RED}">cos(π/3) = 1/2 : abscisse de M</text>
<text x="410" y="152" fill="${GREEN}">sin(π/3) = √3/2 : ordonnée de M</text>
<text x="410" y="184">Pour tout réel x :</text>
<text x="420" y="204">M(x) a pour coordonnées</text>
<text x="420" y="222">(cos x ; sin x)</text>
<text x="420" y="246">−1 ≤ cos x ≤ 1, −1 ≤ sin x ≤ 1</text>
<text x="420" y="266">cos²x + sin²x = 1</text>
<text x="410" y="298" opacity="0.8">Points symétriques : mêmes</text>
<text x="410" y="314" opacity="0.8">valeurs au signe près</text>
<text x="410" y="330" opacity="0.8">(angles associés).</text>
</g>
</svg>`

// ---------------------------------------------------------------------------
// Schéma 2 : enroulement de la droite des réels
// ---------------------------------------------------------------------------
const C2x = 170
const C2y = 190
const R2 = 100
const svgEnroulement = `<svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
<defs><marker id="m6-ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${ORANGE}"/></marker></defs>
<line x1="${C2x - R2 - 30}" y1="${C2y}" x2="${C2x + R2 + 60}" y2="${C2y}" stroke="currentColor" opacity="0.5"/>
<line x1="${C2x}" y1="${C2y + R2 + 30}" x2="${C2x}" y2="${C2y - R2 - 30}" stroke="currentColor" opacity="0.5"/>
<circle cx="${C2x}" cy="${C2y}" r="${R2}" fill="none" stroke="${BLUE}" stroke-width="2"/>
<line x1="${C2x + R2}" y1="${C2y + 170}" x2="${C2x + R2}" y2="${C2y - 175}" stroke="${ORANGE}" stroke-width="2"/>
${[-1, 1, 2, 3].map((k) => `<line x1="${C2x + R2 - 5}" y1="${C2y - k * R2 * 0.55}" x2="${C2x + R2 + 5}" y2="${C2y - k * R2 * 0.55}" stroke="${ORANGE}"/><text x="${C2x + R2 + 10}" y="${f1(C2y - k * R2 * 0.55 + 4)}" fill="${ORANGE}">${k < 0 ? '−1' : k}</text>`).join('')}
<text x="${C2x + R2 + 10}" y="${C2y + 4}" fill="${ORANGE}">0</text>
<path d="M ${C2x + R2 + 25} ${C2y - 1 * R2 * 0.55} Q ${C2x + R2 + 40} ${C2y - 1.4 * R2 * 0.55} ${f1(C2x + (R2 + 18) * Math.cos(1))} ${f1(C2y - (R2 + 18) * Math.sin(1))}" fill="none" stroke="${ORANGE}" stroke-dasharray="4 3" marker-end="url(#m6-ar2)"/>
<circle cx="${f1(C2x + R2 * Math.cos(1))}" cy="${f1(C2y - R2 * Math.sin(1))}" r="4.5" fill="${RED}"/>
<text x="${f1(C2x + R2 * Math.cos(1)) - 10}" y="${f1(C2y - R2 * Math.sin(1)) - 10}" fill="${RED}" text-anchor="end">M(1)</text>
<circle cx="${f1(C2x + R2 * Math.cos(2))}" cy="${f1(C2y - R2 * Math.sin(2))}" r="4.5" fill="${GREEN}"/>
<text x="${f1(C2x + R2 * Math.cos(2)) - 10}" y="${f1(C2y - R2 * Math.sin(2)) - 6}" fill="${GREEN}" text-anchor="end">M(2)</text>
<circle cx="${f1(C2x + R2 * Math.cos(-1))}" cy="${f1(C2y - R2 * Math.sin(-1))}" r="4.5" fill="${VIOLET}"/>
<text x="${f1(C2x + R2 * Math.cos(-1)) - 10}" y="${f1(C2y - R2 * Math.sin(-1)) + 18}" fill="${VIOLET}" text-anchor="end">M(−1)</text>
<circle cx="${C2x + R2}" cy="${C2y}" r="4" fill="currentColor"/>
<text x="${C2x + R2 - 14}" y="${C2y + 16}" fill="currentColor">I</text>
<g fill="currentColor">
<text x="350" y="40" font-weight="600">Enroulement de la droite</text>
<text x="350" y="64">On « enroule » la droite des réels,</text>
<text x="350" y="80">tangente au cercle en I, autour</text>
<text x="350" y="96">du cercle de rayon 1.</text>
<text x="350" y="124">Le réel x vient sur le point M(x) :</text>
<text x="350" y="140">l’arc IM a pour longueur |x|.</text>
<text x="350" y="168" fill="${ORANGE}">x &gt; 0 : sens direct</text>
<text x="350" y="186" fill="${ORANGE}">x &lt; 0 : sens indirect</text>
<text x="350" y="216">Un tour complet = 2π ≈ 6,28 :</text>
<text x="350" y="234">x et x + 2kπ (k ∈ ℤ) ont</text>
<text x="350" y="250">le même point image.</text>
</g>
</svg>`

// ---------------------------------------------------------------------------
// Schéma 3 : angles associés
// ---------------------------------------------------------------------------
const C3x = 180
const C3y = 180
const R3 = 130
const a3 = 0.55
const pts3: [number, string, string][] = [
  [a3, 'M(x)', BLUE],
  [-a3, 'M(−x)', RED],
  [PI - a3, 'M(π − x)', GREEN],
  [PI + a3, 'M(π + x)', ORANGE],
  [PI / 2 - a3, 'M(π/2 − x)', VIOLET],
]
const svgAssocies = `<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
<line x1="${C3x - R3 - 25}" y1="${C3y}" x2="${C3x + R3 + 25}" y2="${C3y}" stroke="currentColor" stroke-width="1.2"/>
<line x1="${C3x}" y1="${C3y + R3 + 25}" x2="${C3x}" y2="${C3y - R3 - 25}" stroke="currentColor" stroke-width="1.2"/>
<line x1="${f1(C3x - (R3 + 10) * Math.cos(PI / 4))}" y1="${f1(C3y + (R3 + 10) * Math.sin(PI / 4))}" x2="${f1(C3x + (R3 + 10) * Math.cos(PI / 4))}" y2="${f1(C3y - (R3 + 10) * Math.sin(PI / 4))}" stroke="${VIOLET}" stroke-dasharray="5 4" opacity="0.6"/>
<circle cx="${C3x}" cy="${C3y}" r="${R3}" fill="none" stroke="currentColor" stroke-width="1.5"/>
<line x1="${f1(C3x + R3 * Math.cos(a3))}" y1="${f1(C3y - R3 * Math.sin(a3))}" x2="${f1(C3x + R3 * Math.cos(-a3))}" y2="${f1(C3y - R3 * Math.sin(-a3))}" stroke="${RED}" stroke-dasharray="3 3"/>
<line x1="${f1(C3x + R3 * Math.cos(a3))}" y1="${f1(C3y - R3 * Math.sin(a3))}" x2="${f1(C3x + R3 * Math.cos(PI - a3))}" y2="${f1(C3y - R3 * Math.sin(PI - a3))}" stroke="${GREEN}" stroke-dasharray="3 3"/>
<line x1="${f1(C3x + R3 * Math.cos(a3))}" y1="${f1(C3y - R3 * Math.sin(a3))}" x2="${f1(C3x + R3 * Math.cos(PI + a3))}" y2="${f1(C3y - R3 * Math.sin(PI + a3))}" stroke="${ORANGE}" stroke-dasharray="3 3"/>
${pts3.map(([t, l, c]) => `<circle cx="${f1(C3x + R3 * Math.cos(t))}" cy="${f1(C3y - R3 * Math.sin(t))}" r="5" fill="${c}"/><text x="${f1(C3x + (R3 + 22) * Math.cos(t))}" y="${f1(C3y - (R3 + 22) * Math.sin(t) + 4)}" text-anchor="middle" fill="${c}">${l}</text>`).join('')}
<g fill="currentColor">
<text x="380" y="36" font-weight="600">Angles associés à x</text>
<text x="380" y="62" fill="${RED}">−x : symétrie d’axe (Ox)</text>
<text x="392" y="78" fill="${RED}" font-size="11">cos(−x) = cos x ; sin(−x) = −sin x</text>
<text x="380" y="106" fill="${GREEN}">π − x : symétrie d’axe (Oy)</text>
<text x="392" y="122" fill="${GREEN}" font-size="11">cos(π − x) = −cos x ; sin(π − x) = sin x</text>
<text x="380" y="150" fill="${ORANGE}">π + x : symétrie de centre O</text>
<text x="392" y="166" fill="${ORANGE}" font-size="11">cos(π + x) = −cos x ; sin(π + x) = −sin x</text>
<text x="380" y="194" fill="${VIOLET}">π/2 − x : symétrie d’axe y = x</text>
<text x="392" y="210" fill="${VIOLET}" font-size="11">cos(π/2 − x) = sin x ; sin(π/2 − x) = cos x</text>
<text x="380" y="238">π/2 + x : quart de tour direct</text>
<text x="392" y="254" font-size="11">cos(π/2 + x) = −sin x ; sin(π/2 + x) = cos x</text>
</g>
</svg>`

// ---------------------------------------------------------------------------
// Schéma 4 : courbes de sin et cos
// ---------------------------------------------------------------------------
const GX0 = -2 * PI - 0.3
const GX1 = 2 * PI + 0.3
const GL = 20
const GW = 600
const GT = 20
const GH = 200
const gx = (x: number) => f1(GL + ((x - GX0) / (GX1 - GX0)) * GW)
const gy = (y: number) => f1(GT + ((1.4 - y) / 2.8) * GH)
function gcurve(f: (x: number) => number): string {
  const pts: string[] = []
  for (let i = 0; i <= 240; i++) {
    const x = GX0 + ((GX1 - GX0) * i) / 240
    pts.push(`${gx(x)},${gy(f(x))}`)
  }
  return 'M' + pts.join(' L')
}
const gticks: [number, string][] = [
  [-2 * PI, '−2π'],
  [-PI, '−π'],
  [-PI / 2, '−π/2'],
  [PI / 2, 'π/2'],
  [PI, 'π'],
  [(3 * PI) / 2, '3π/2'],
  [2 * PI, '2π'],
]
const svgCourbes = `<svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="11">
${gticks.map(([t]) => `<line x1="${gx(t)}" y1="${GT}" x2="${gx(t)}" y2="${GT + GH}" stroke="currentColor" opacity="0.1"/>`).join('')}
<line x1="${GL}" y1="${gy(1)}" x2="${GL + GW}" y2="${gy(1)}" stroke="currentColor" opacity="0.15" stroke-dasharray="3 3"/>
<line x1="${GL}" y1="${gy(-1)}" x2="${GL + GW}" y2="${gy(-1)}" stroke="currentColor" opacity="0.15" stroke-dasharray="3 3"/>
<line x1="${GL}" y1="${gy(0)}" x2="${GL + GW}" y2="${gy(0)}" stroke="currentColor" stroke-width="1.2"/>
<line x1="${gx(0)}" y1="${GT + GH}" x2="${gx(0)}" y2="${GT}" stroke="currentColor" stroke-width="1.2"/>
<rect x="${gx(0)}" y="${GT}" width="${f1(gx(2 * PI) - gx(0))}" height="${GH}" fill="${VIOLET}" opacity="0.06"/>
<path d="${gcurve(Math.sin)}" fill="none" stroke="${BLUE}" stroke-width="2.2"/>
<path d="${gcurve(Math.cos)}" fill="none" stroke="${RED}" stroke-width="2.2"/>
${gticks.map(([t, l]) => `<text x="${gx(t)}" y="${f1(gy(0) + 14)}" text-anchor="middle" fill="currentColor" opacity="0.8">${l}</text>`).join('')}
<text x="${gx(0) - 4}" y="${gy(1) + 4}" text-anchor="end" fill="currentColor">1</text>
<text x="${gx(0) - 4}" y="${gy(-1) + 4}" text-anchor="end" fill="currentColor">−1</text>
<text x="${GL + 4}" y="240" fill="${BLUE}" font-size="12">— y = sin x (impaire : symétrie de centre O)</text>
<text x="350" y="240" fill="${RED}" font-size="12">— y = cos x (paire : symétrie d’axe (Oy))</text>
</svg>`

const chapter: Chapter = {
  id: 'trigonometrie',
  subject: 'maths',
  order: 6,
  title: 'Fonctions trigonométriques',
  theme: 'Analyse',
  summary:
    'Cercle trigonométrique, radian et enroulement de la droite des réels ; cosinus et sinus d’un réel, valeurs remarquables et angles associés ; fonctions cosinus et sinus (parité, périodicité, courbes) et équations cos x = a, sin x = a.',
  duration: '3 semaines',
  objectives: [
    'Connaître le cercle trigonométrique, le radian et le principe d’enroulement de la droite des réels.',
    'Placer un point sur le cercle trigonométrique ; déterminer la mesure principale d’un angle.',
    'Définir le cosinus et le sinus d’un nombre réel ; faire le lien avec le cosinus et le sinus dans un triangle rectangle.',
    'Connaître les valeurs remarquables et démontrer celles de sin(π/4), cos(π/3), sin(π/3).',
    'Par lecture du cercle trigonométrique, déterminer les cosinus et sinus d’angles associés à x.',
    'Connaître les fonctions cosinus et sinus, leur parité, leur périodicité et leurs courbes représentatives ; traduire graphiquement parité et périodicité.',
    'Lier la représentation graphique des fonctions cosinus et sinus et le cercle trigonométrique.',
    'Résoudre dans un intervalle des équations du type cos x = a et sin x = a.',
    'Algorithmique : approximation de π par la méthode d’Archimède.',
  ],
  keywords: ['cercle trigonométrique', 'radian', 'enroulement', 'cosinus', 'sinus', 'valeurs remarquables', 'angles associés', 'mesure principale', 'parité', 'périodicité', 'sinusoïde', 'Archimède'],

  // =========================================================================
  // FICHE
  // =========================================================================
  fiche: [
    { type: 'h2', text: 'Cercle trigonométrique et radian' },
    {
      type: 'list',
      items: [
        r`**Cercle trigonométrique** : centre $O$, rayon $1$, orienté dans le **sens direct** (inverse des aiguilles d'une montre). Périmètre $2\pi$.`,
        r`**Radian** : $1$ rad est l'angle qui intercepte un arc de longueur $1$. $\pi \text{ rad} = 180°$ ; $\alpha_{\text{rad}} = \dfrac{\pi}{180}\alpha_{°}$.`,
        r`**Enroulement** : chaque réel $x$ a un point image $M(x)$ ; $x$ et $x + 2k\pi$ ($k \in \mathbb{Z}$) ont le **même** point image.`,
        r`**Mesure principale** : l'unique mesure dans $]-\pi ; \pi]$.`,
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Cosinus et sinus d’un réel',
      content: [
        { type: 'p', text: r`$\cos x$ et $\sin x$ sont l'**abscisse** et l'**ordonnée** du point $M(x)$ dans le repère $(O ; I, J)$.` },
        { type: 'math', tex: r`-1 \leqslant \cos x \leqslant 1 \qquad -1 \leqslant \sin x \leqslant 1 \qquad \cos^2 x + \sin^2 x = 1` },
      ],
    },
    { type: 'h2', text: 'Valeurs remarquables' },
    {
      type: 'table',
      headers: [r`$x$`, r`$0$`, r`$\dfrac{\pi}{6}$`, r`$\dfrac{\pi}{4}$`, r`$\dfrac{\pi}{3}$`, r`$\dfrac{\pi}{2}$`, r`$\pi$`],
      rows: [
        [r`$\cos x$`, r`$1$`, r`$\dfrac{\sqrt3}{2}$`, r`$\dfrac{\sqrt2}{2}$`, r`$\dfrac12$`, r`$0$`, r`$-1$`],
        [r`$\sin x$`, r`$0$`, r`$\dfrac12$`, r`$\dfrac{\sqrt2}{2}$`, r`$\dfrac{\sqrt3}{2}$`, r`$1$`, r`$0$`],
      ],
    },
    { type: 'h2', text: 'Angles associés' },
    {
      type: 'table',
      headers: ['Angle', 'cos', 'sin', 'Symétrie'],
      rows: [
        [r`$-x$`, r`$\cos x$`, r`$-\sin x$`, r`axe $(Ox)$`],
        [r`$\pi - x$`, r`$-\cos x$`, r`$\sin x$`, r`axe $(Oy)$`],
        [r`$\pi + x$`, r`$-\cos x$`, r`$-\sin x$`, r`centre $O$`],
        [r`$\dfrac{\pi}{2} - x$`, r`$\sin x$`, r`$\cos x$`, r`droite $y = x$`],
        [r`$\dfrac{\pi}{2} + x$`, r`$-\sin x$`, r`$\cos x$`, 'quart de tour'],
      ],
    },
    { type: 'h2', text: 'Fonctions cosinus et sinus' },
    {
      type: 'list',
      items: [
        r`Définies sur $\mathbb{R}$, **périodiques de période $2\pi$** : $\cos(x + 2\pi) = \cos x$, $\sin(x + 2\pi) = \sin x$.`,
        r`$\cos$ est **paire** (courbe symétrique par rapport à $(Oy)$) ; $\sin$ est **impaire** (courbe symétrique par rapport à $O$).`,
        r`Sur $[0 ; \pi]$ : $\cos$ décroît de $1$ à $-1$ ; sur $\left[-\frac{\pi}{2} ; \frac{\pi}{2}\right]$ : $\sin$ croît de $-1$ à $1$.`,
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Équations',
      content: [
        { type: 'math', tex: r`\cos x = \cos a \iff x = a + 2k\pi \ \text{ ou } \ x = -a + 2k\pi \quad (k \in \mathbb{Z})` },
        { type: 'math', tex: r`\sin x = \sin a \iff x = a + 2k\pi \ \text{ ou } \ x = \pi - a + 2k\pi \quad (k \in \mathbb{Z})` },
        { type: 'p', text: r`En pratique : placer sur le cercle les points d'abscisse (ou d'ordonnée) $a$, puis lire les solutions dans l'intervalle demandé.` },
      ],
    },
  ],

  // =========================================================================
  // COURS
  // =========================================================================
  cours: [
    { type: 'h2', text: '1. Le cercle trigonométrique et le radian' },
    { type: 'h3', text: '1.1 Cercle trigonométrique' },
    {
      type: 'callout',
      variant: 'definition',
      content: [
        { type: 'p', text: r`Dans un repère orthonormé $(O ; I, J)$, le **cercle trigonométrique** est le cercle de centre $O$ et de rayon $1$, muni d'un sens de parcours : le **sens direct** (ou trigonométrique), contraire au sens des aiguilles d'une montre.` },
        { type: 'p', text: r`Son périmètre est $2\pi \times 1 = 2\pi$.` },
      ],
    },
    { type: 'h3', text: '1.2 Le radian' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Radian',
      content: [
        { type: 'p', text: r`Un angle de **1 radian** est un angle au centre qui intercepte, sur un cercle de rayon $1$, un arc de longueur $1$. Plus généralement, sur un cercle de rayon $1$, **la mesure en radians d'un angle au centre est égale à la longueur de l'arc intercepté**.` },
      ],
    },
    {
      type: 'p',
      text: r`Le tour complet mesure $360°$ et correspond à un arc de longueur $2\pi$ : $360° = 2\pi$ rad, soit $180° = \pi$ rad. Les mesures sont **proportionnelles** :`,
    },
    { type: 'math', tex: r`\alpha_{\text{rad}} = \frac{\pi}{180} \times \alpha_{\text{deg}} \qquad \alpha_{\text{deg}} = \frac{180}{\pi} \times \alpha_{\text{rad}} \qquad 1 \text{ rad} \approx 57{,}3°` },
    {
      type: 'table',
      headers: ['Degrés', r`$0°$`, r`$30°$`, r`$45°$`, r`$60°$`, r`$90°$`, r`$120°$`, r`$135°$`, r`$150°$`, r`$180°$`, r`$360°$`],
      rows: [['Radians', r`$0$`, r`$\frac{\pi}{6}$`, r`$\frac{\pi}{4}$`, r`$\frac{\pi}{3}$`, r`$\frac{\pi}{2}$`, r`$\frac{2\pi}{3}$`, r`$\frac{3\pi}{4}$`, r`$\frac{5\pi}{6}$`, r`$\pi$`, r`$2\pi$`]],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Longueur d’un arc',
      content: [{ type: 'p', text: r`Sur un cercle de rayon $R$, un angle au centre de $\alpha$ radians intercepte un arc de longueur $\ell = R\alpha$. Exemple : sur un cercle de rayon $5$ cm, un angle de $\frac{\pi}{3}$ intercepte un arc de $\frac{5\pi}{3} \approx 5{,}24$ cm.` }],
    },
    { type: 'h3', text: '1.3 Enroulement de la droite des réels' },
    {
      type: 'p',
      text: r`On considère la droite tangente au cercle en $I$, graduée avec la même unité et d'origine $I$, orientée vers le haut. On « enroule » cette droite autour du cercle : à chaque réel $x$ correspond un unique point $M$ du cercle, appelé **point image** de $x$ (ou point associé à $x$). L'arc $\overset{\frown}{IM}$, parcouru dans le sens direct si $x > 0$, indirect si $x < 0$, a pour longueur $|x|$.`,
    },
    { type: 'svg', svg: svgEnroulement, caption: 'Enroulement de la droite numérique sur le cercle trigonométrique.', maxWidth: 640 },
    {
      type: 'callout',
      variant: 'property',
      content: [
        { type: 'p', text: r`Les réels $x$ et $x + 2k\pi$, pour tout $k \in \mathbb{Z}$, ont **le même point image** (on fait $k$ tours de plus ou de moins). Un point du cercle est donc l'image d'une infinité de réels : ce sont les **mesures** de l'angle orienté $(\overrightarrow{OI}, \overrightarrow{OM})$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Mesure principale',
      content: [{ type: 'p', text: r`Parmi tous les réels associés à un point $M$, un seul appartient à $]-\pi ; \pi]$ : c'est la **mesure principale**.` }],
    },
    {
      type: 'steps',
      items: [
        { title: 'Écrire la fraction', text: r`Pour $x = \dfrac{p\pi}{q}$, chercher le multiple de $2\pi = \dfrac{2q\pi}{q}$ le plus proche de $x$.` },
        { title: 'Retrancher', text: r`$x - 2k\pi$ doit appartenir à $]-\pi ; \pi]$.` },
        { title: 'Exemple', text: r`$\dfrac{17\pi}{6} = \dfrac{12\pi}{6} + \dfrac{5\pi}{6} = 2\pi + \dfrac{5\pi}{6}$ : mesure principale $\dfrac{5\pi}{6}$. De même $-\dfrac{25\pi}{4} = -6\pi - \dfrac{\pi}{4}$ : mesure principale $-\dfrac{\pi}{4}$.` },
      ],
    },
    { type: 'h2', text: '2. Cosinus et sinus d’un réel' },
    {
      type: 'callout',
      variant: 'definition',
      content: [
        { type: 'p', text: r`Soit $x$ un réel et $M$ son point image sur le cercle trigonométrique. On appelle **cosinus** de $x$, noté $\cos x$, l'**abscisse** de $M$, et **sinus** de $x$, noté $\sin x$, l'**ordonnée** de $M$ : $M(\cos x ; \sin x)$.` },
      ],
    },
    { type: 'svg', svg: svgCercle, caption: 'Cercle trigonométrique, points remarquables ; lecture de $\\cos\\frac{\\pi}{3}$ et $\\sin\\frac{\\pi}{3}$.', maxWidth: 680 },
    {
      type: 'callout',
      variant: 'property',
      title: 'Propriétés immédiates',
      content: [
        {
          type: 'list',
          items: [
            r`Pour tout réel $x$ : $-1 \leqslant \cos x \leqslant 1$ et $-1 \leqslant \sin x \leqslant 1$ (le cercle est de rayon $1$).`,
            r`$\cos^2 x + \sin^2 x = 1$ (théorème de Pythagore, $OM = 1$). On note $\cos^2 x = (\cos x)^2$.`,
            r`Pour tout $k \in \mathbb{Z}$ : $\cos(x + 2k\pi) = \cos x$ et $\sin(x + 2k\pi) = \sin x$.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Lien avec le triangle rectangle',
      content: [
        { type: 'p', text: r`Pour $x \in \left]0 ; \frac{\pi}{2}\right[$, soit $H$ le projeté orthogonal de $M$ sur $(OI)$. Le triangle $OHM$ est rectangle en $H$, d'hypoténuse $OM = 1$ et d'angle $\widehat{HOM} = x$. On retrouve les définitions du collège :` },
        { type: 'math', tex: r`\cos x = \frac{OH}{OM} = OH \qquad \sin x = \frac{HM}{OM} = HM.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Signes selon le quadrant',
      content: [
        {
          type: 'table',
          headers: ['Position de $M(x)$', r`$\cos x$`, r`$\sin x$`],
          rows: [
            [r`$x \in \left]0 ; \frac{\pi}{2}\right[$ (en haut à droite)`, r`$+$`, r`$+$`],
            [r`$x \in \left]\frac{\pi}{2} ; \pi\right[$ (en haut à gauche)`, r`$-$`, r`$+$`],
            [r`$x \in \left]-\pi ; -\frac{\pi}{2}\right[$ (en bas à gauche)`, r`$-$`, r`$-$`],
            [r`$x \in \left]-\frac{\pi}{2} ; 0\right[$ (en bas à droite)`, r`$+$`, r`$-$`],
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Calculer l’un connaissant l’autre',
      content: [
        { type: 'p', text: r`On sait que $\sin x = \dfrac35$ et $x \in \left[\dfrac{\pi}{2} ; \pi\right]$. Alors $\cos^2 x = 1 - \dfrac{9}{25} = \dfrac{16}{25}$, donc $\cos x = \dfrac45$ ou $\cos x = -\dfrac45$. Comme $x \in \left[\frac{\pi}{2} ; \pi\right]$, $\cos x \leqslant 0$ : $\cos x = -\dfrac45$.` },
      ],
    },
    { type: 'h2', text: '3. Valeurs remarquables' },
    {
      type: 'table',
      headers: [r`$x$`, r`$0$`, r`$\dfrac{\pi}{6}$`, r`$\dfrac{\pi}{4}$`, r`$\dfrac{\pi}{3}$`, r`$\dfrac{\pi}{2}$`, r`$\pi$`],
      rows: [
        [r`$\cos x$`, r`$1$`, r`$\dfrac{\sqrt3}{2}$`, r`$\dfrac{\sqrt2}{2}$`, r`$\dfrac12$`, r`$0$`, r`$-1$`],
        [r`$\sin x$`, r`$0$`, r`$\dfrac12$`, r`$\dfrac{\sqrt2}{2}$`, r`$\dfrac{\sqrt3}{2}$`, r`$1$`, r`$0$`],
      ],
      caption: 'Astuce : la ligne des sinus se lit $\\frac{\\sqrt0}{2}, \\frac{\\sqrt1}{2}, \\frac{\\sqrt2}{2}, \\frac{\\sqrt3}{2}, \\frac{\\sqrt4}{2}$ ; celle des cosinus dans l’ordre inverse.',
    },
    {
      type: 'reveal',
      title: 'Démonstration : $\\sin\\frac{\\pi}{4} = \\cos\\frac{\\pi}{4} = \\frac{\\sqrt2}{2}$ (au programme)',
      content: [
        { type: 'p', text: r`Soit $M$ le point image de $\frac{\pi}{4}$ et $H$ son projeté orthogonal sur $(OI)$. Dans le triangle $OHM$ rectangle en $H$, l'angle $\widehat{HOM}$ vaut $\frac{\pi}{4}$ ($45°$), donc $\widehat{OMH} = \frac{\pi}{4}$ aussi : le triangle est **isocèle rectangle** et $OH = HM$, c'est-à-dire $\cos\frac{\pi}{4} = \sin\frac{\pi}{4}$.` },
        { type: 'p', text: r`Par Pythagore, $OH^2 + HM^2 = OM^2 = 1$, donc $2\,OH^2 = 1$, $OH^2 = \dfrac12$ et, comme $OH > 0$, $OH = \dfrac{1}{\sqrt2} = \dfrac{\sqrt2}{2}$.` },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration : $\\cos\\frac{\\pi}{3} = \\frac12$ et $\\sin\\frac{\\pi}{3} = \\frac{\\sqrt3}{2}$ (au programme)',
      content: [
        { type: 'p', text: r`Soit $M$ le point image de $\frac{\pi}{3}$. Le triangle $OIM$ est isocèle en $O$ ($OI = OM = 1$) avec un angle au sommet $\widehat{IOM} = \frac{\pi}{3}$ ($60°$) ; ses angles à la base valent donc $\frac{1}{2}\left(\pi - \frac{\pi}{3}\right) = \frac{\pi}{3}$ : il est **équilatéral**.` },
        { type: 'p', text: r`Dans un triangle équilatéral, la hauteur issue de $M$ est aussi médiane : le projeté $H$ de $M$ sur $(OI)$ est le milieu de $[OI]$. Donc $\cos\frac{\pi}{3} = OH = \dfrac12$.` },
        { type: 'p', text: r`Enfin $\sin^2\frac{\pi}{3} = 1 - \cos^2\frac{\pi}{3} = 1 - \dfrac14 = \dfrac34$ et $\sin\frac{\pi}{3} > 0$, d'où $\sin\frac{\pi}{3} = \dfrac{\sqrt3}{2}$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Et $\\frac{\\pi}{6}$ ?',
      content: [{ type: 'p', text: r`Le point image de $\frac{\pi}{6}$ est le symétrique de celui de $\frac{\pi}{3}$ par rapport à la droite $y = x$ (car $\frac{\pi}{6} = \frac{\pi}{2} - \frac{\pi}{3}$) : on échange abscisse et ordonnée, $\cos\frac{\pi}{6} = \frac{\sqrt3}{2}$, $\sin\frac{\pi}{6} = \frac12$.` }],
    },
    { type: 'h2', text: '4. Angles associés' },
    {
      type: 'p',
      text: r`Les points images de $-x$, $\pi - x$, $\pi + x$, $\frac{\pi}{2} - x$ et $\frac{\pi}{2} + x$ s'obtiennent à partir de $M(x)$ par des symétries simples. On en déduit leurs cosinus et sinus **par lecture du cercle**, sans apprendre par cœur.`,
    },
    { type: 'svg', svg: svgAssocies, caption: 'Les angles associés à $x$ et les symétries correspondantes.', maxWidth: 680 },
    {
      type: 'table',
      headers: ['Angle', 'Transformation', 'cos', 'sin'],
      rows: [
        [r`$-x$`, r`symétrie d'axe $(Ox)$`, r`$\cos(-x) = \cos x$`, r`$\sin(-x) = -\sin x$`],
        [r`$\pi - x$`, r`symétrie d'axe $(Oy)$`, r`$\cos(\pi - x) = -\cos x$`, r`$\sin(\pi - x) = \sin x$`],
        [r`$\pi + x$`, r`symétrie de centre $O$`, r`$\cos(\pi + x) = -\cos x$`, r`$\sin(\pi + x) = -\sin x$`],
        [r`$\frac{\pi}{2} - x$`, r`symétrie d'axe $y = x$`, r`$\cos\left(\frac{\pi}{2} - x\right) = \sin x$`, r`$\sin\left(\frac{\pi}{2} - x\right) = \cos x$`],
        [r`$\frac{\pi}{2} + x$`, r`rotation d'un quart de tour`, r`$\cos\left(\frac{\pi}{2} + x\right) = -\sin x$`, r`$\sin\left(\frac{\pi}{2} + x\right) = \cos x$`],
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples : valeurs exactes',
      content: [
        {
          type: 'list',
          items: [
            r`$\cos\dfrac{3\pi}{4} = \cos\left(\pi - \dfrac{\pi}{4}\right) = -\cos\dfrac{\pi}{4} = -\dfrac{\sqrt2}{2}$ et $\sin\dfrac{3\pi}{4} = \sin\dfrac{\pi}{4} = \dfrac{\sqrt2}{2}$.`,
            r`$\sin\dfrac{7\pi}{6} = \sin\left(\pi + \dfrac{\pi}{6}\right) = -\sin\dfrac{\pi}{6} = -\dfrac12$ et $\cos\dfrac{7\pi}{6} = -\dfrac{\sqrt3}{2}$.`,
            r`$\cos\dfrac{11\pi}{6} = \cos\left(2\pi - \dfrac{\pi}{6}\right) = \cos\left(-\dfrac{\pi}{6}\right) = \dfrac{\sqrt3}{2}$ et $\sin\dfrac{11\pi}{6} = -\dfrac12$.`,
            r`$\cos\left(-\dfrac{2\pi}{3}\right) = \cos\dfrac{2\pi}{3} = -\dfrac12$ et $\sin\left(-\dfrac{2\pi}{3}\right) = -\sin\dfrac{2\pi}{3} = -\dfrac{\sqrt3}{2}$.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Piège',
      content: [{ type: 'p', text: r`$\cos(\pi - x) \neq \cos\pi - \cos x$ : le cosinus n'est **pas linéaire**. De même $\sin(2x) \neq 2\sin x$ (par exemple $\sin\left(2 \times \frac{\pi}{2}\right) = 0$ alors que $2\sin\frac{\pi}{2} = 2$).` }],
    },
    { type: 'h2', text: '5. Les fonctions cosinus et sinus' },
    {
      type: 'callout',
      variant: 'definition',
      content: [{ type: 'p', text: r`La fonction **cosinus** est la fonction $x \mapsto \cos x$ définie sur $\mathbb{R}$ ; la fonction **sinus** est $x \mapsto \sin x$ définie sur $\mathbb{R}$.` }],
    },
    { type: 'h3', text: '5.1 Périodicité' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Fonction périodique',
      content: [{ type: 'p', text: r`Une fonction $f$ définie sur $\mathbb{R}$ est **périodique de période $T$** ($T > 0$) si pour tout réel $x$, $f(x + T) = f(x)$. Sa courbe est alors invariante par la **translation** de vecteur $T\vec{\imath}$ : il suffit de la tracer sur un intervalle de longueur $T$.` }],
    },
    {
      type: 'callout',
      variant: 'property',
      content: [{ type: 'p', text: r`Les fonctions cosinus et sinus sont **périodiques de période $2\pi$** : $\cos(x + 2\pi) = \cos x$ et $\sin(x + 2\pi) = \sin x$ ($x$ et $x + 2\pi$ ont le même point image).` }],
    },
    { type: 'h3', text: '5.2 Parité' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Fonction paire, fonction impaire',
      content: [
        { type: 'p', text: r`Soit $f$ définie sur un ensemble $D$ symétrique par rapport à $0$ (si $x \in D$, alors $-x \in D$).` },
        {
          type: 'list',
          items: [
            r`$f$ est **paire** si $f(-x) = f(x)$ pour tout $x \in D$ : sa courbe est symétrique par rapport à l'axe des ordonnées.`,
            r`$f$ est **impaire** si $f(-x) = -f(x)$ pour tout $x \in D$ : sa courbe est symétrique par rapport à l'origine $O$.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      content: [{ type: 'p', text: r`$\cos(-x) = \cos x$ : la fonction **cosinus est paire**. $\sin(-x) = -\sin x$ : la fonction **sinus est impaire**.` }],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Conséquence pratique',
      content: [{ type: 'p', text: r`Grâce à la parité et à la périodicité, il suffit d'étudier cosinus et sinus sur $[0 ; \pi]$ : on complète par symétrie (axe $(Oy)$ ou centre $O$) pour obtenir $[-\pi ; \pi]$, puis par translations de $2k\pi$.` }],
    },
    { type: 'h3', text: '5.3 Variations et courbes' },
    {
      type: 'p',
      text: r`Quand $x$ parcourt $[0 ; \pi]$, le point $M(x)$ parcourt le demi-cercle supérieur de $I$ à $I'(-1 ; 0)$ : son abscisse **diminue** de $1$ à $-1$, son ordonnée **augmente** de $0$ à $1$ (en $\frac{\pi}{2}$) puis **diminue** jusqu'à $0$.`,
    },
    {
      type: 'table',
      headers: [r`$x$`, r`$0$`, r`$]0 ; \frac{\pi}{2}[$`, r`$\frac{\pi}{2}$`, r`$]\frac{\pi}{2} ; \pi[$`, r`$\pi$`],
      rows: [
        [r`$\cos$`, r`$1$`, r`$\searrow$`, r`$0$`, r`$\searrow$`, r`$-1$`],
        [r`$\sin$`, r`$0$`, r`$\nearrow$`, r`$1$`, r`$\searrow$`, r`$0$`],
      ],
      caption: 'Variations sur $[0 ; \\pi]$ (lues sur le cercle ; la démonstration par la dérivée est vue en Terminale).',
    },
    { type: 'svg', svg: svgCourbes, caption: 'Sinusoïdes : courbes de sinus et de cosinus sur $[-2\\pi ; 2\\pi]$ (une période est surlignée).', maxWidth: 700 },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Lien entre les deux courbes',
      content: [{ type: 'p', text: r`Comme $\cos x = \sin\left(x + \frac{\pi}{2}\right)$, la courbe de cosinus est l'image de celle de sinus par la translation de vecteur $-\frac{\pi}{2}\vec{\imath}$ : ces deux courbes sont des **sinusoïdes** identiques à une translation près.` }],
    },
    { type: 'h2', text: '6. Équations $\\cos x = a$ et $\\sin x = a$' },
    {
      type: 'callout',
      variant: 'property',
      content: [
        { type: 'p', text: r`Si $|a| > 1$, les équations $\cos x = a$ et $\sin x = a$ n'ont **aucune solution**. Si $-1 \leqslant a \leqslant 1$ et si $\alpha$ est un réel tel que $\cos\alpha = a$ (resp. $\sin\alpha = a$) :` },
        { type: 'math', tex: r`\cos x = \cos\alpha \iff x = \alpha + 2k\pi \ \text{ ou } \ x = -\alpha + 2k\pi, \ k \in \mathbb{Z}` },
        { type: 'math', tex: r`\sin x = \sin\alpha \iff x = \alpha + 2k\pi \ \text{ ou } \ x = \pi - \alpha + 2k\pi, \ k \in \mathbb{Z}` },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Reconnaître une valeur remarquable', text: r`Trouver $\alpha$ avec $\cos\alpha = a$ (ou $\sin\alpha = a$), par exemple $\frac12 = \cos\frac{\pi}{3}$.` },
        { title: 'Placer les points', text: r`Pour $\cos x = a$ : les deux points du cercle d'**abscisse** $a$ (symétriques par rapport à $(Ox)$). Pour $\sin x = a$ : les deux points d'**ordonnée** $a$ (symétriques par rapport à $(Oy)$).` },
        { title: 'Lire dans l’intervalle', text: r`Donner les réels associés appartenant à l'intervalle demandé ($]-\pi ; \pi]$, $[0 ; 2\pi[$…).` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples',
      content: [
        { type: 'p', text: r`**a)** $\cos x = \dfrac12$ sur $]-\pi ; \pi]$ : $\cos x = \cos\frac{\pi}{3}$, donc $\mathcal{S} = \left\{-\dfrac{\pi}{3} ; \dfrac{\pi}{3}\right\}$.` },
        { type: 'p', text: r`**b)** $\sin x = \dfrac{\sqrt2}{2}$ sur $[0 ; 2\pi[$ : $x = \dfrac{\pi}{4}$ ou $x = \pi - \dfrac{\pi}{4} = \dfrac{3\pi}{4}$.` },
        { type: 'p', text: r`**c)** $\sin x = -\dfrac12$ sur $]-\pi ; \pi]$ : $-\frac12 = \sin\left(-\frac{\pi}{6}\right)$, donc $x = -\dfrac{\pi}{6}$ ou $x = \pi + \dfrac{\pi}{6} - 2\pi = -\dfrac{5\pi}{6}$.` },
        { type: 'p', text: r`**d)** $\cos x = 2$ : aucune solution.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Inéquation lue sur le cercle',
      content: [{ type: 'p', text: r`$\cos x \geqslant \dfrac12$ sur $]-\pi ; \pi]$ : on cherche les points du cercle d'abscisse $\geqslant \frac12$, c'est l'arc compris entre $M\left(-\frac{\pi}{3}\right)$ et $M\left(\frac{\pi}{3}\right)$ côté $I$. $\mathcal{S} = \left[-\dfrac{\pi}{3} ; \dfrac{\pi}{3}\right]$.` }],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Un peu d’histoire',
      content: [
        { type: 'p', text: r`Les astronomes grecs (Hipparque, Ptolémée) utilisaient des tables de **cordes**. Les mathématiciens indiens (Aryabhata, Vᵉ siècle) introduisent la demi-corde, ancêtre du sinus ; le mot « sinus » vient d'une traduction latine d'un terme arabe. Le **radian** n'est nommé qu'en 1873 (James Thomson). Archimède (IIIᵉ siècle av. J.-C.) avait encadré $\pi$ entre $3 + \frac{10}{71}$ et $3 + \frac{1}{7}$ à l'aide de polygones à 96 côtés.` },
      ],
    },
  ],

  // =========================================================================
  // EXERCICES
  // =========================================================================
  exercices: [
    {
      id: 'trigo-ex1',
      title: 'Degrés et radians',
      difficulty: 1,
      duration: 8,
      tags: ['radian', 'conversion'],
      statement: [
        { type: 'list', ordered: true, items: [r`Convertir en radians : $30°$, $135°$, $210°$, $72°$.`, r`Convertir en degrés : $\dfrac{5\pi}{12}$, $\dfrac{7\pi}{4}$, $1$ rad (arrondi au dixième).`, r`Calculer la longueur d'un arc de cercle de rayon $3$ cm intercepté par un angle au centre de $\dfrac{2\pi}{3}$.`] },
      ],
      hints: [r`Multiplier par $\frac{\pi}{180}$ pour passer des degrés aux radians.`],
      solution: [
        { type: 'p', text: r`**1.** $30° = \dfrac{30\pi}{180} = \dfrac{\pi}{6}$ ; $135° = \dfrac{135\pi}{180} = \dfrac{3\pi}{4}$ ; $210° = \dfrac{7\pi}{6}$ ; $72° = \dfrac{72\pi}{180} = \dfrac{2\pi}{5}$.` },
        { type: 'p', text: r`**2.** $\dfrac{5\pi}{12} = \dfrac{5 \times 180}{12} = 75°$ ; $\dfrac{7\pi}{4} = 7 \times 45 = 315°$ ; $1 \text{ rad} = \dfrac{180}{\pi} \approx 57{,}3°$.` },
        { type: 'p', text: r`**3.** $\ell = R\alpha = 3 \times \dfrac{2\pi}{3} = 2\pi \approx 6{,}28$ cm.` },
      ],
    },
    {
      id: 'trigo-ex2',
      title: 'Mesures principales et points images',
      difficulty: 1,
      duration: 12,
      tags: ['mesure principale', 'enroulement'],
      statement: [
        { type: 'p', text: r`Déterminer la mesure principale de chacun des réels suivants, puis placer son point image sur le cercle trigonométrique : $\dfrac{17\pi}{6}$ ; $-\dfrac{25\pi}{4}$ ; $\dfrac{31\pi}{3}$ ; $-\dfrac{7\pi}{2}$ ; $2027\pi$.` },
      ],
      hints: [r`Retrancher (ou ajouter) un multiple de $2\pi$ pour arriver dans $]-\pi ; \pi]$.`, r`$\frac{31\pi}{3} = \frac{30\pi}{3} + \frac{\pi}{3}$.`],
      solution: [
        { type: 'list', items: [
          r`$\dfrac{17\pi}{6} = 2\pi + \dfrac{5\pi}{6}$ : mesure principale $\dfrac{5\pi}{6}$.`,
          r`$-\dfrac{25\pi}{4} = -6\pi - \dfrac{\pi}{4}$ (car $6\pi = \frac{24\pi}{4}$) : mesure principale $-\dfrac{\pi}{4}$.`,
          r`$\dfrac{31\pi}{3} = 10\pi + \dfrac{\pi}{3}$ et $10\pi = 5 \times 2\pi$ : mesure principale $\dfrac{\pi}{3}$.`,
          r`$-\dfrac{7\pi}{2} + 4\pi = \dfrac{\pi}{2}$ : mesure principale $\dfrac{\pi}{2}$ (point $J$).`,
          r`$2027\pi = 2026\pi + \pi = 1013 \times 2\pi + \pi$ : mesure principale $\pi$ (point $I'(-1;0)$).`,
        ] },
      ],
    },
    {
      id: 'trigo-ex3',
      title: 'Valeurs exactes',
      difficulty: 1,
      duration: 12,
      tags: ['valeurs remarquables', 'angles associés'],
      statement: [
        { type: 'p', text: r`Donner la valeur exacte de :` },
        { type: 'list', items: [r`$\cos\dfrac{3\pi}{4}$ et $\sin\dfrac{3\pi}{4}$`, r`$\cos\dfrac{5\pi}{3}$ et $\sin\dfrac{5\pi}{3}$`, r`$\cos\left(-\dfrac{5\pi}{6}\right)$ et $\sin\left(-\dfrac{5\pi}{6}\right)$`, r`$\sin\left(-\dfrac{5\pi}{4}\right)$`, r`$\cos\dfrac{19\pi}{6}$`] },
      ],
      hints: [r`Se ramener à la mesure principale, puis à un angle de $\left[0 ; \frac{\pi}{2}\right]$ par symétrie.`],
      solution: [
        { type: 'p', text: r`$\cos\frac{3\pi}{4} = -\cos\frac{\pi}{4} = -\frac{\sqrt2}{2}$ ; $\sin\frac{3\pi}{4} = \sin\frac{\pi}{4} = \frac{\sqrt2}{2}$ (angle $\pi - \frac{\pi}{4}$).` },
        { type: 'p', text: r`$\frac{5\pi}{3} = 2\pi - \frac{\pi}{3}$ : $\cos\frac{5\pi}{3} = \cos\left(-\frac{\pi}{3}\right) = \frac12$ ; $\sin\frac{5\pi}{3} = -\sin\frac{\pi}{3} = -\frac{\sqrt3}{2}$.` },
        { type: 'p', text: r`$-\frac{5\pi}{6} = -\pi + \frac{\pi}{6}$, i.e. $\pi + \frac{\pi}{6}$ à $2\pi$ près : $\cos\left(-\frac{5\pi}{6}\right) = -\cos\frac{\pi}{6} = -\frac{\sqrt3}{2}$ ; $\sin\left(-\frac{5\pi}{6}\right) = -\sin\frac{\pi}{6} = -\frac12$.` },
        { type: 'p', text: r`$-\frac{5\pi}{4} + 2\pi = \frac{3\pi}{4}$ : $\sin\left(-\frac{5\pi}{4}\right) = \sin\frac{3\pi}{4} = \frac{\sqrt2}{2}$.` },
        { type: 'p', text: r`$\frac{19\pi}{6} = 2\pi + \frac{7\pi}{6} = 2\pi + \pi + \frac{\pi}{6}$ : $\cos\frac{19\pi}{6} = -\cos\frac{\pi}{6} = -\frac{\sqrt3}{2}$.` },
      ],
    },
    {
      id: 'trigo-ex4',
      title: 'Du sinus au cosinus',
      difficulty: 2,
      duration: 12,
      tags: ['cos² + sin² = 1', 'angles associés'],
      statement: [
        { type: 'p', text: r`Soit $x \in \left[\dfrac{\pi}{2} ; \pi\right]$ tel que $\sin x = \dfrac35$.` },
        { type: 'list', ordered: true, items: [r`Calculer $\cos x$.`, r`En déduire $\cos(\pi - x)$, $\sin(\pi + x)$, $\cos\left(\dfrac{\pi}{2} - x\right)$ et $\sin(-x)$.`] },
      ],
      hints: [r`$\cos^2 x = 1 - \sin^2 x$ ; quel est le signe de $\cos x$ sur $\left[\frac{\pi}{2} ; \pi\right]$ ?`],
      solution: [
        { type: 'p', text: r`**1.** $\cos^2 x = 1 - \dfrac{9}{25} = \dfrac{16}{25}$. Sur $\left[\frac{\pi}{2} ; \pi\right]$, $M(x)$ est à gauche de l'axe des ordonnées : $\cos x \leqslant 0$. Donc $\cos x = -\dfrac45$.` },
        { type: 'p', text: r`**2.** $\cos(\pi - x) = -\cos x = \dfrac45$ ; $\sin(\pi + x) = -\sin x = -\dfrac35$ ; $\cos\left(\frac{\pi}{2} - x\right) = \sin x = \dfrac35$ ; $\sin(-x) = -\sin x = -\dfrac35$.` },
      ],
    },
    {
      id: 'trigo-ex5',
      title: 'Simplifier avec les angles associés',
      difficulty: 2,
      duration: 12,
      tags: ['angles associés', 'calcul'],
      statement: [
        { type: 'p', text: r`Simplifier, pour tout réel $x$ :` },
        { type: 'list', items: [r`$A = \cos(\pi - x) + \cos(\pi + x) + 2\cos(-x)$`, r`$B = \sin(\pi - x) + \cos\left(\dfrac{\pi}{2} - x\right) - \sin(-x)$`, r`$C = \cos\left(\dfrac{\pi}{2} + x\right) + \sin(\pi - x)$`] },
        { type: 'p', text: r`Puis calculer $D = \cos\dfrac{\pi}{7} + \cos\dfrac{2\pi}{7} + \cos\dfrac{5\pi}{7} + \cos\dfrac{6\pi}{7}$.` },
      ],
      hints: [r`Pour $D$ : $\frac{6\pi}{7} = \pi - \frac{\pi}{7}$.`],
      solution: [
        { type: 'p', text: r`$A = -\cos x - \cos x + 2\cos x = 0$.` },
        { type: 'p', text: r`$B = \sin x + \sin x + \sin x = 3\sin x$.` },
        { type: 'p', text: r`$C = -\sin x + \sin x = 0$.` },
        { type: 'p', text: r`$\cos\frac{6\pi}{7} = \cos\left(\pi - \frac{\pi}{7}\right) = -\cos\frac{\pi}{7}$ et $\cos\frac{5\pi}{7} = \cos\left(\pi - \frac{2\pi}{7}\right) = -\cos\frac{2\pi}{7}$. Donc $D = 0$.` },
      ],
    },
    {
      id: 'trigo-ex6',
      title: 'Équations trigonométriques',
      difficulty: 2,
      duration: 18,
      tags: ['équations'],
      statement: [
        { type: 'p', text: r`Résoudre :` },
        {
          type: 'list',
          items: [
            r`(a) $\cos x = \dfrac{\sqrt3}{2}$ sur $]-\pi ; \pi]$`,
            r`(b) $\sin x = \dfrac12$ sur $[0 ; 2\pi[$`,
            r`(c) $2\cos x + \sqrt2 = 0$ sur $[0 ; 2\pi[$`,
            r`(d) $\sin x = -1$ sur $\mathbb{R}$`,
            r`(e) $\cos x = -\dfrac{\sqrt3}{2}$ sur $\mathbb{R}$`,
            r`(f) $2\sin^2 x - \sin x = 0$ sur $]-\pi ; \pi]$`,
          ],
        },
      ],
      hints: [r`Pour (f), factoriser par $\sin x$.`, r`$-\frac{\sqrt2}{2} = \cos\frac{3\pi}{4}$.`],
      solution: [
        { type: 'p', text: r`**(a)** $\cos x = \cos\frac{\pi}{6}$ : $\mathcal{S} = \left\{-\dfrac{\pi}{6} ; \dfrac{\pi}{6}\right\}$.` },
        { type: 'p', text: r`**(b)** $\sin x = \sin\frac{\pi}{6}$ : $x = \dfrac{\pi}{6}$ ou $x = \pi - \dfrac{\pi}{6} = \dfrac{5\pi}{6}$.` },
        { type: 'p', text: r`**(c)** $\cos x = -\dfrac{\sqrt2}{2} = \cos\dfrac{3\pi}{4}$ : $x = \dfrac{3\pi}{4}$ ou $x = -\dfrac{3\pi}{4} + 2\pi = \dfrac{5\pi}{4}$.` },
        { type: 'p', text: r`**(d)** Le seul point d'ordonnée $-1$ est $J'(0 ; -1)$, image de $-\frac{\pi}{2}$ : $\mathcal{S} = \left\{-\dfrac{\pi}{2} + 2k\pi,\ k \in \mathbb{Z}\right\}$.` },
        { type: 'p', text: r`**(e)** $\cos x = \cos\dfrac{5\pi}{6}$ : $x = \dfrac{5\pi}{6} + 2k\pi$ ou $x = -\dfrac{5\pi}{6} + 2k\pi$, $k \in \mathbb{Z}$.` },
        { type: 'p', text: r`**(f)** $\sin x(2\sin x - 1) = 0 \iff \sin x = 0$ ou $\sin x = \frac12$. Sur $]-\pi ; \pi]$ : $\sin x = 0$ donne $x = 0$ ou $x = \pi$ ; $\sin x = \frac12$ donne $\frac{\pi}{6}$ ou $\frac{5\pi}{6}$. $\mathcal{S} = \left\{0 ; \dfrac{\pi}{6} ; \dfrac{5\pi}{6} ; \pi\right\}$.` },
      ],
    },
    {
      id: 'trigo-ex7',
      title: 'Parité et périodicité',
      difficulty: 2,
      duration: 15,
      tags: ['parité', 'périodicité'],
      statement: [
        { type: 'p', text: r`Étudier la parité des fonctions suivantes définies sur $\mathbb{R}$, et montrer qu'elles sont périodiques en précisant une période.` },
        { type: 'list', items: [r`$f(x) = x\sin x$ (parité seulement)`, r`$g(x) = \sin x \cos x$`, r`$h(x) = \cos(2x)$`, r`$k(x) = 3 + \cos^2 x$`] },
      ],
      hints: [r`Calculer $f(-x)$ et comparer à $f(x)$ et $-f(x)$.`, r`Pour $h$, calculer $h(x + \pi)$.`],
      solution: [
        { type: 'p', text: r`$f(-x) = (-x)\sin(-x) = (-x)(-\sin x) = x\sin x = f(x)$ : $f$ est **paire** (elle n'est pas périodique : $f(2\pi k + \frac{\pi}{2}) = 2\pi k + \frac{\pi}{2}$ prend des valeurs arbitrairement grandes).` },
        { type: 'p', text: r`$g(-x) = \sin(-x)\cos(-x) = -\sin x\cos x = -g(x)$ : $g$ est **impaire**. $g(x + \pi) = (-\sin x)(-\cos x) = g(x)$ : $g$ est **$\pi$-périodique** (donc aussi $2\pi$-périodique).` },
        { type: 'p', text: r`$h(-x) = \cos(-2x) = \cos(2x) = h(x)$ : $h$ est **paire**. $h(x + \pi) = \cos(2x + 2\pi) = \cos(2x) = h(x)$ : période $\pi$.` },
        { type: 'p', text: r`$k(-x) = 3 + \cos^2(-x) = k(x)$ : **paire**. $\cos(x + \pi) = -\cos x$, donc $\cos^2(x + \pi) = \cos^2 x$ : $k$ est $\pi$-périodique.` },
      ],
    },
    {
      id: 'trigo-ex8',
      title: 'Inéquations lues sur le cercle',
      difficulty: 2,
      duration: 12,
      tags: ['inéquations', 'cercle'],
      statement: [
        { type: 'p', text: r`À l'aide du cercle trigonométrique, résoudre :` },
        { type: 'list', items: [r`(a) $\cos x \geqslant \dfrac12$ sur $]-\pi ; \pi]$`, r`(b) $\sin x < \dfrac12$ sur $[0 ; 2\pi[$`, r`(c) $\cos x < 0$ sur $[0 ; 2\pi[$`] },
      ],
      hints: [r`Colorier l'arc des points dont l'abscisse (ou l'ordonnée) vérifie la condition.`],
      solution: [
        { type: 'p', text: r`**(a)** Points d'abscisse $\geqslant \frac12$ : arc de $M\left(-\frac{\pi}{3}\right)$ à $M\left(\frac{\pi}{3}\right)$ passant par $I$. $\mathcal{S} = \left[-\dfrac{\pi}{3} ; \dfrac{\pi}{3}\right]$.` },
        { type: 'p', text: r`**(b)** Points d'ordonnée $\geqslant \frac12$ : arc de $M\left(\frac{\pi}{6}\right)$ à $M\left(\frac{5\pi}{6}\right)$. On prend le complémentaire : $\mathcal{S} = \left[0 ; \dfrac{\pi}{6}\right[ \cup \left]\dfrac{5\pi}{6} ; 2\pi\right[$.` },
        { type: 'p', text: r`**(c)** Points à gauche de l'axe des ordonnées : $\mathcal{S} = \left]\dfrac{\pi}{2} ; \dfrac{3\pi}{2}\right[$.` },
      ],
    },
    {
      id: 'trigo-ex9',
      title: 'Type bac : étude de $x \\mapsto \\cos(2x)$',
      difficulty: 3,
      duration: 30,
      tags: ['type bac', 'parité', 'périodicité', 'équations'],
      statement: [
        { type: 'p', text: r`Soit $f$ la fonction définie sur $\mathbb{R}$ par $f(x) = \cos(2x)$, et $\mathcal{C}$ sa courbe représentative.` },
        {
          type: 'list',
          ordered: true,
          items: [
            r`Montrer que $f$ est paire et périodique de période $\pi$. Qu'en déduit-on pour $\mathcal{C}$ ?`,
            r`Calculer $f(0)$, $f\left(\dfrac{\pi}{6}\right)$, $f\left(\dfrac{\pi}{4}\right)$, $f\left(\dfrac{\pi}{3}\right)$ et $f\left(\dfrac{\pi}{2}\right)$.`,
            r`Justifier que $f$ est décroissante sur $\left[0 ; \dfrac{\pi}{2}\right]$, puis tracer l'allure de $\mathcal{C}$ sur $[-\pi ; \pi]$.`,
            r`Résoudre dans $]-\pi ; \pi]$ l'équation $f(x) = \dfrac12$.`,
            r`Résoudre dans $]-\pi ; \pi]$ l'équation $\cos(2x) = \cos x$.`,
          ],
        },
      ],
      hints: [
        r`Quand $x$ décrit $\left[0 ; \frac{\pi}{2}\right]$, $2x$ décrit $[0 ; \pi]$, où cosinus est décroissante.`,
        r`$\cos(2x) = \frac12 \iff 2x = \pm\frac{\pi}{3} + 2k\pi \iff x = \pm\frac{\pi}{6} + k\pi$.`,
        r`Q5 : $2x = x + 2k\pi$ ou $2x = -x + 2k\pi$.`,
      ],
      solution: [
        { type: 'p', text: r`**1.** $f(-x) = \cos(-2x) = \cos(2x) = f(x)$ : $f$ est paire, $\mathcal{C}$ est symétrique par rapport à $(Oy)$. $f(x + \pi) = \cos(2x + 2\pi) = \cos(2x) = f(x)$ : $f$ est $\pi$-périodique, $\mathcal{C}$ est invariante par la translation de vecteur $\pi\vec{\imath}$. Il suffit d'étudier $f$ sur $\left[0 ; \frac{\pi}{2}\right]$.` },
        { type: 'p', text: r`**2.** $f(0) = 1$ ; $f\left(\frac{\pi}{6}\right) = \cos\frac{\pi}{3} = \frac12$ ; $f\left(\frac{\pi}{4}\right) = \cos\frac{\pi}{2} = 0$ ; $f\left(\frac{\pi}{3}\right) = \cos\frac{2\pi}{3} = -\frac12$ ; $f\left(\frac{\pi}{2}\right) = \cos\pi = -1$.` },
        { type: 'p', text: r`**3.** Si $0 \leqslant a < b \leqslant \frac{\pi}{2}$, alors $0 \leqslant 2a < 2b \leqslant \pi$ et, cosinus étant décroissante sur $[0 ; \pi]$, $\cos(2a) \geqslant \cos(2b)$ : $f$ est décroissante sur $\left[0 ; \frac{\pi}{2}\right]$, de $1$ à $-1$. Par parité, $f$ croît sur $\left[-\frac{\pi}{2} ; 0\right]$ ; par périodicité, on obtient une sinusoïde « deux fois plus serrée » que celle de cosinus, avec des maxima $1$ en $-\pi$, $0$, $\pi$ et des minima $-1$ en $\pm\frac{\pi}{2}$.` },
        { type: 'p', text: r`**4.** $\cos(2x) = \cos\frac{\pi}{3} \iff 2x = \frac{\pi}{3} + 2k\pi$ ou $2x = -\frac{\pi}{3} + 2k\pi \iff x = \frac{\pi}{6} + k\pi$ ou $x = -\frac{\pi}{6} + k\pi$. Dans $]-\pi ; \pi]$ : $\mathcal{S} = \left\{-\dfrac{5\pi}{6} ; -\dfrac{\pi}{6} ; \dfrac{\pi}{6} ; \dfrac{5\pi}{6}\right\}$.` },
        { type: 'p', text: r`**5.** $\cos(2x) = \cos x \iff 2x = x + 2k\pi$ ou $2x = -x + 2k\pi \iff x = 2k\pi$ ou $x = \frac{2k\pi}{3}$. Les premiers sont inclus dans les seconds. Dans $]-\pi ; \pi]$ : $\mathcal{S} = \left\{-\dfrac{2\pi}{3} ; 0 ; \dfrac{2\pi}{3}\right\}$. *Vérification :* $\cos\frac{4\pi}{3} = -\frac12 = \cos\frac{2\pi}{3}$.` },
      ],
    },
    {
      id: 'trigo-ex10',
      title: 'Python : la méthode d’Archimède pour approcher $\\pi$',
      difficulty: 3,
      duration: 25,
      tags: ['Python', 'algorithmique', 'π'],
      statement: [
        { type: 'p', text: r`On inscrit dans un cercle de rayon $1$ un polygone régulier à $n$ côtés, de côté $c_n$. Son périmètre $n\,c_n$ est un peu inférieur au périmètre $2\pi$ du cercle, donc $\dfrac{n\,c_n}{2} \approx \pi$. Archimède part de l'hexagone ($n = 6$, $c_6 = 1$) et double le nombre de côtés grâce à la relation (admise, issue de Pythagore) :` },
        { type: 'math', tex: r`c_{2n} = \sqrt{2 - \sqrt{4 - c_n^2}}.` },
        {
          type: 'code',
          lang: 'python',
          code: `from math import sqrt

n = 6
c = 1.0
for etape in range(6):
    print(n, n * c / 2)
    c = sqrt(2 - sqrt(4 - c ** 2))
    n = 2 * n`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            r`Pourquoi a-t-on $c_6 = 1$ ?`,
            r`Exprimer $c_n$ à l'aide d'un sinus. (Indication : le triangle formé par $O$ et deux sommets consécutifs est isocèle d'angle au sommet $\frac{2\pi}{n}$.)`,
            r`Calculer à la main $c_{12}$ et la valeur approchée correspondante de $\pi$.`,
            r`Qu'affiche le programme ? Pourquoi n'utilise-t-on pas directement la formule de la question 2 pour approcher $\pi$ ?`,
          ],
        },
      ],
      hints: [r`L'hexagone régulier inscrit est formé de 6 triangles équilatéraux.`, r`Couper le triangle isocèle en deux triangles rectangles.`],
      solution: [
        { type: 'p', text: r`**1.** L'hexagone régulier se décompose en 6 triangles isocèles d'angle au sommet $\frac{2\pi}{6} = \frac{\pi}{3}$, donc équilatéraux : le côté est égal au rayon, $c_6 = 1$.` },
        { type: 'p', text: r`**2.** La hauteur issue de $O$ coupe le triangle isocèle en deux triangles rectangles d'hypoténuse $1$ et d'angle $\frac{\pi}{n}$ : la moitié du côté vaut $\sin\frac{\pi}{n}$. Donc $c_n = 2\sin\dfrac{\pi}{n}$ et $\dfrac{n c_n}{2} = n\sin\dfrac{\pi}{n}$.` },
        { type: 'p', text: r`**3.** $c_{12} = \sqrt{2 - \sqrt{4 - 1}} = \sqrt{2 - \sqrt3} \approx 0{,}5176$ et $\dfrac{12 \times 0{,}5176}{2} \approx 3{,}1058$.` },
        {
          type: 'table',
          headers: [r`$n$`, '6', '12', '24', '48', '96', '192'],
          rows: [[r`$\frac{n c_n}{2}$`, r`$3$`, r`$3{,}10583$`, r`$3{,}13263$`, r`$3{,}13935$`, r`$3{,}14103$`, r`$3{,}14145$`]],
        },
        { type: 'p', text: r`**4.** Le programme affiche ces six lignes : les valeurs croissent vers $\pi \approx 3{,}14159$ (avec 96 côtés, comme Archimède, on obtient $3{,}141$). La formule $n\sin\frac{\pi}{n}$ utilise déjà $\pi$ (pour calculer le sinus) : elle ne permettrait pas de **découvrir** $\pi$. L'algorithme d'Archimède n'utilise que des racines carrées.` },
      ],
    },
    {
      id: 'trigo-ex11',
      title: 'Quand cosinus et sinus sont égaux',
      difficulty: 3,
      duration: 15,
      tags: ['équations', 'angles associés'],
      statement: [
        { type: 'p', text: r`Résoudre dans $]-\pi ; \pi]$ l'équation $\sin x = \cos x$, d'abord par lecture du cercle, puis par le calcul en utilisant $\cos x = \sin\left(\dfrac{\pi}{2} - x\right)$.` },
      ],
      hints: [r`Les points du cercle tels que abscisse = ordonnée sont sur la droite $y = x$.`],
      solution: [
        { type: 'p', text: r`**Lecture :** les points du cercle d'abscisse égale à l'ordonnée sont les intersections avec la droite $y = x$ : $M\left(\frac{\pi}{4}\right)$ et $M\left(-\frac{3\pi}{4}\right)$.` },
        { type: 'p', text: r`**Calcul :** $\sin x = \sin\left(\frac{\pi}{2} - x\right) \iff x = \frac{\pi}{2} - x + 2k\pi$ ou $x = \pi - \left(\frac{\pi}{2} - x\right) + 2k\pi$. La première donne $x = \frac{\pi}{4} + k\pi$. La seconde donne $0 = \frac{\pi}{2} + 2k\pi$, impossible.` },
        { type: 'p', text: r`Dans $]-\pi ; \pi]$ : $k = 0$ donne $\frac{\pi}{4}$, $k = -1$ donne $-\frac{3\pi}{4}$. $\mathcal{S} = \left\{-\dfrac{3\pi}{4} ; \dfrac{\pi}{4}\right\}$.` },
      ],
    },
  ],

  // =========================================================================
  // REPRÉSENTATIONS
  // =========================================================================
  representations: [
    {
      type: 'widget',
      id: 'trig-circle',
      title: 'Cercle trigonométrique interactif',
      props: { angle: Math.PI / 3 },
      caption: 'Déplacez le point : lisez $\\cos x$ et $\\sin x$, observez l’enroulement et le tracé simultané des courbes.',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Courbes de sinus et cosinus',
      props: { expressions: ['sin(x)', 'cos(x)'], xMin: -7, xMax: 7, yMin: -1.6, yMax: 1.6, showDerivative: false },
      caption: 'Repérez la période $2\\pi$, la symétrie d’axe $(Oy)$ de cosinus et la symétrie de centre $O$ de sinus.',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Sinusoïdes $a\\sin(bx)$',
      props: {
        expressions: ['a*sin(b*x)', 'sin(x)'],
        params: [
          { name: 'a', min: -3, max: 3, step: 0.1, value: 1 },
          { name: 'b', min: 0.5, max: 4, step: 0.5, value: 2 },
        ],
        xMin: -7,
        xMax: 7,
        yMin: -3.5,
        yMax: 3.5,
      },
      caption: '$a$ modifie l’amplitude, $b$ la période ($\\frac{2\\pi}{b}$). Pour $b = 2$, on retrouve la période $\\pi$ de l’exercice type bac.',
    },
    { type: 'svg', svg: svgCercle, caption: 'Les points remarquables du cercle trigonométrique.', maxWidth: 680 },
    { type: 'svg', svg: svgAssocies, caption: 'Angles associés.', maxWidth: 680 },
    {
      type: 'qcm',
      questions: [
        { question: r`$150°$ en radians vaut :`, choices: [r`$\frac{3\pi}{4}$`, r`$\frac{5\pi}{6}$`, r`$\frac{2\pi}{3}$`, r`$\frac{5\pi}{3}$`], answer: 1, explanation: r`$150 \times \frac{\pi}{180} = \frac{5\pi}{6}$.` },
        { question: r`La mesure principale de $\frac{13\pi}{4}$ est :`, choices: [r`$\frac{\pi}{4}$`, r`$\frac{5\pi}{4}$`, r`$-\frac{3\pi}{4}$`, r`$\frac{3\pi}{4}$`], answer: 2, explanation: r`$\frac{13\pi}{4} - 4\pi = -\frac{3\pi}{4}$.` },
        { question: r`$\sin\frac{2\pi}{3} =$`, choices: [r`$\frac12$`, r`$-\frac12$`, r`$\frac{\sqrt3}{2}$`, r`$-\frac{\sqrt3}{2}$`], answer: 2, explanation: r`$\sin\left(\pi - \frac{\pi}{3}\right) = \sin\frac{\pi}{3}$.` },
        { question: r`$\cos(\pi + x) =$`, choices: [r`$\cos x$`, r`$-\cos x$`, r`$\sin x$`, r`$-\sin x$`], answer: 1, explanation: 'Symétrie de centre O.' },
        { question: r`La fonction sinus est :`, choices: ['paire', 'impaire', 'ni paire ni impaire', 'paire et impaire'], answer: 1, explanation: r`$\sin(-x) = -\sin x$.` },
        { question: r`Sur $]-\pi ; \pi]$, l'équation $\cos x = 0$ a pour solutions :`, choices: [r`$0$ et $\pi$`, r`$\frac{\pi}{2}$ seulement`, r`$-\frac{\pi}{2}$ et $\frac{\pi}{2}$`, 'aucune'], answer: 2, explanation: r`Les points d'abscisse $0$ sont $J$ et $J'$.` },
        { question: r`Si $\cos x = 0{,}6$ et $\sin x < 0$, alors $\sin x =$`, choices: [r`$-0{,}4$`, r`$-0{,}8$`, r`$0{,}8$`, r`$-0{,}64$`], answer: 1, explanation: r`$\sin^2 x = 1 - 0{,}36 = 0{,}64$.` },
        { question: r`Une période de $x \mapsto \sin(3x)$ est :`, choices: [r`$2\pi$`, r`$3\pi$`, r`$\frac{2\pi}{3}$`, r`$\frac{\pi}{3}$`], answer: 2, explanation: r`$\sin(3(x + \frac{2\pi}{3})) = \sin(3x + 2\pi) = \sin(3x)$. ($2\pi$ est aussi une période, mais pas la plus petite.)` },
      ],
    },
    {
      type: 'matching',
      title: 'Degrés ↔ radians',
      pairs: [
        { left: r`$30°$`, right: r`$\frac{\pi}{6}$` },
        { left: r`$45°$`, right: r`$\frac{\pi}{4}$` },
        { left: r`$120°$`, right: r`$\frac{2\pi}{3}$` },
        { left: r`$270°$`, right: r`$\frac{3\pi}{2}$` },
        { left: r`$330°$`, right: r`$\frac{11\pi}{6}$` },
        { left: r`$18°$`, right: r`$\frac{\pi}{10}$` },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Cercle trigonométrique', back: r`Centre $O$, rayon $1$, sens direct (anti-horaire)` },
        { front: r`$180°$ en radians`, back: r`$\pi$ rad` },
        { front: r`Points images de $x$ et $x + 2k\pi$`, back: 'Identiques' },
        { front: 'Mesure principale', back: r`L'unique mesure dans $]-\pi ; \pi]$` },
        { front: r`$\cos x$ et $\sin x$`, back: r`Abscisse et ordonnée de $M(x)$` },
        { front: 'Relation fondamentale', back: r`$\cos^2 x + \sin^2 x = 1$` },
        { front: r`$\cos\frac{\pi}{6}$, $\sin\frac{\pi}{6}$`, back: r`$\frac{\sqrt3}{2}$, $\frac12$` },
        { front: r`$\cos\frac{\pi}{4}$, $\sin\frac{\pi}{4}$`, back: r`$\frac{\sqrt2}{2}$, $\frac{\sqrt2}{2}$` },
        { front: r`$\cos\frac{\pi}{3}$, $\sin\frac{\pi}{3}$`, back: r`$\frac12$, $\frac{\sqrt3}{2}$` },
        { front: r`$\cos(\pi - x)$, $\sin(\pi - x)$`, back: r`$-\cos x$, $\sin x$` },
        { front: r`$\cos\left(\frac{\pi}{2} - x\right)$`, back: r`$\sin x$` },
        { front: 'Parité de cos et sin', back: 'cos paire, sin impaire' },
        { front: r`$\cos x = \cos a$`, back: r`$x = a + 2k\pi$ ou $x = -a + 2k\pi$` },
        { front: r`$\sin x = \sin a$`, back: r`$x = a + 2k\pi$ ou $x = \pi - a + 2k\pi$` },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: r`Pour tout réel $x$, $\cos(x + \pi) = \cos x$.`, answer: false, explanation: r`$\cos(x + \pi) = -\cos x$ ; la période est $2\pi$.` },
        { text: r`Les réels $\frac{\pi}{3}$ et $\frac{7\pi}{3}$ ont le même point image.`, answer: true, explanation: r`$\frac{7\pi}{3} = \frac{\pi}{3} + 2\pi$.` },
        { text: r`Il existe un réel $x$ tel que $\sin x = 1{,}2$.`, answer: false, explanation: r`$-1 \leqslant \sin x \leqslant 1$.` },
        { text: r`La courbe de cosinus est symétrique par rapport à l'axe des ordonnées.`, answer: true, explanation: 'Cosinus est paire.' },
        { text: r`$\sin(2x) = 2\sin x$ pour tout réel $x$.`, answer: false, explanation: r`Pour $x = \frac{\pi}{2}$ : $0 \neq 2$.` },
        { text: r`Sur $[0 ; \pi]$, la fonction cosinus est décroissante.`, answer: true, explanation: r`L'abscisse de $M(x)$ diminue de $1$ à $-1$.` },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: r`Le cercle trigonométrique a pour rayon {{1}} et son périmètre vaut $2\pi$. Un angle de $90°$ mesure $\frac{\pi}{2}$ radians, et $\pi$ rad $=$ {{180}}°. Le cosinus de $x$ est l'{{abscisse}} du point $M(x)$ et le sinus en est l'{{ordonnée}}. La fonction cosinus est {{paire}}, la fonction sinus est {{impaire}}, et toutes deux sont périodiques de période $2\pi$.`,
    },
    {
      type: 'ordering',
      title: 'Ranger dans l’ordre croissant',
      items: [r`$\cos\pi$`, r`$\sin\left(-\frac{\pi}{6}\right)$`, r`$\cos\frac{\pi}{2}$`, r`$\sin\frac{\pi}{6}$`, r`$\cos\frac{\pi}{4}$`, r`$\sin\frac{\pi}{3}$`, r`$\cos 0$`],
    },
  ],
}

export default chapter
