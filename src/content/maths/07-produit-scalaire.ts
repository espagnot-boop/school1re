import type { Block, Chapter } from '../types'

// ---------------------------------------------------------------------------
// Aides pour les schémas SVG (style « blueprint », compatibles clair/sombre)
// ---------------------------------------------------------------------------
const BLUE = 'hsl(217 91% 60%)'
const RED = 'hsl(0 84% 60%)'
const GREEN = 'hsl(142 71% 45%)'
const ORANGE = 'hsl(25 95% 53%)'
const VIOLET = 'hsl(263 70% 60%)'

/** Pointes de flèches colorées, identifiants préfixés pour éviter les collisions entre SVG. */
const arrowDefs = (p: string) => {
  const cols: [string, string][] = [
    ['ink', 'currentColor'],
    ['blue', BLUE],
    ['red', RED],
    ['green', GREEN],
    ['orange', ORANGE],
    ['violet', VIOLET],
  ]
  return `<defs>${cols
    .map(
      ([n, c]) =>
        `<marker id="${p}-${n}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${c}"/></marker>`,
    )
    .join('')}</defs>`
}

/** Vecteur (segment fléché). */
const vec = (p: string, col: string, colName: string, x1: number, y1: number, x2: number, y2: number, w = 2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" marker-end="url(#${p}-${colName})"/>`

/** Nom de vecteur avec petite flèche au-dessus. */
const vlab = (x: number, y: number, t: string, col = 'currentColor', size = 14) => {
  const w = t.length * size * 0.55 + 2
  return `<text x="${x}" y="${y}" font-size="${size}" font-style="italic" fill="${col}">${t}</text><path d="M${x} ${y - size + 1} h${w.toFixed(1)} m-3 -2.5 l3 2.5 l-3 2.5" fill="none" stroke="${col}" stroke-width="1"/>`
}

const pt = (x: number, y: number, label: string, dx = 6, dy = -6) =>
  `<circle cx="${x}" cy="${y}" r="3" fill="currentColor"/><text x="${x + dx}" y="${y + dy}" font-size="13" fill="currentColor">${label}</text>`

const svgOpen = (w: number, h: number) =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif">`

// 1. Angle de deux vecteurs
const svgAngle = `${svgOpen(460, 220)}${arrowDefs('ps1')}
<path d="M100 190 A40 40 0 0 0 90.1 163.7" fill="none" stroke="${ORANGE}" stroke-width="1.5"/>
<text x="108" y="176" font-size="13" fill="${ORANGE}">θ</text>
${vec('ps1', BLUE, 'blue', 60, 190, 330, 190)}
${vec('ps1', RED, 'red', 60, 190, 220, 50)}
${vlab(300, 210, 'u', BLUE)}
${vlab(196, 50, 'v', RED)}
${pt(60, 190, 'O', -14, 16)}
<text x="250" y="110" font-size="12" class="svg-muted" fill="currentColor">u · v = ‖u‖ × ‖v‖ × cos θ</text>
</svg>`

// 2. Projection orthogonale : angle aigu / angle obtus
const svgProjection = `${svgOpen(640, 250)}${arrowDefs('ps2')}
<text x="40" y="24" font-size="13" font-weight="600" fill="currentColor">Angle BAC aigu</text>
<line x1="20" y1="190" x2="300" y2="190" stroke="currentColor" stroke-width="0.8" stroke-dasharray="4 3" class="svg-muted"/>
<line x1="190" y1="60" x2="190" y2="190" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4"/>
<path d="M180 190 V180 H190" fill="none" stroke="currentColor" stroke-width="1"/>
<line x1="40" y1="196" x2="190" y2="196" stroke="${GREEN}" stroke-width="4" opacity="0.8"/>
${vec('ps2', BLUE, 'blue', 40, 190, 280, 190)}
${vec('ps2', ORANGE, 'orange', 40, 190, 190, 60)}
${pt(40, 190, 'A', -14, 16)}${pt(280, 190, 'B', 4, 16)}${pt(190, 60, 'C', 6, -6)}${pt(190, 190, 'H', 4, 18)}
<text x="40" y="236" font-size="13" fill="${GREEN}">AB · AC = AB × AH  (&gt; 0)</text>
<text x="370" y="24" font-size="13" font-weight="600" fill="currentColor">Angle BAC obtus</text>
<line x1="330" y1="190" x2="625" y2="190" stroke="currentColor" stroke-width="0.8" stroke-dasharray="4 3" class="svg-muted"/>
<line x1="360" y1="60" x2="360" y2="190" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4"/>
<path d="M370 190 V180 H360" fill="none" stroke="currentColor" stroke-width="1"/>
<line x1="360" y1="196" x2="420" y2="196" stroke="${RED}" stroke-width="4" opacity="0.8"/>
${vec('ps2', BLUE, 'blue', 420, 190, 610, 190)}
${vec('ps2', ORANGE, 'orange', 420, 190, 360, 60)}
${pt(420, 190, 'A', 2, 18)}${pt(610, 190, 'B', 4, 16)}${pt(360, 60, 'C', 6, -6)}${pt(360, 190, 'H', -16, 18)}
<text x="370" y="236" font-size="13" fill="${RED}">AB · AC = − AB × AH  (&lt; 0)</text>
</svg>`

// 3. Parallélogramme et identités de polarisation
const svgPolar = `${svgOpen(440, 230)}${arrowDefs('ps3')}
<polygon points="60,180 280,180 360,60 140,60" fill="currentColor" opacity="0.05"/>
<line x1="280" y1="180" x2="360" y2="60" stroke="currentColor" stroke-width="0.8" stroke-dasharray="4 3"/>
<line x1="140" y1="60" x2="360" y2="60" stroke="currentColor" stroke-width="0.8" stroke-dasharray="4 3"/>
${vec('ps3', BLUE, 'blue', 60, 180, 280, 180)}
${vec('ps3', ORANGE, 'orange', 60, 180, 140, 60)}
${vec('ps3', VIOLET, 'violet', 60, 180, 360, 60)}
${vec('ps3', RED, 'red', 140, 60, 280, 180)}
${vlab(160, 202, 'u', BLUE)}${vlab(78, 118, 'v', ORANGE)}
<text x="232" y="106" font-size="13" fill="${VIOLET}" font-style="italic">u + v</text>
<text x="222" y="150" font-size="13" fill="${RED}" font-style="italic">u − v</text>
${pt(60, 180, 'A', -14, 16)}${pt(280, 180, 'B', 4, 18)}${pt(140, 60, 'C', -14, -6)}${pt(360, 60, 'D', 6, -6)}
<text x="20" y="222" font-size="12" fill="currentColor" class="svg-muted">‖u + v‖² + ‖u − v‖² = 2(‖u‖² + ‖v‖²) : règle du parallélogramme</text>
</svg>`

// 4. Triangle et formule d'Al-Kashi
const svgAlKashi = `${svgOpen(460, 230)}
<polygon points="80,190 380,190 250,50" fill="currentColor" opacity="0.05" stroke="currentColor" stroke-width="1.6"/>
<path d="M115 190 A35 35 0 0 0 107 167.7" fill="none" stroke="${ORANGE}" stroke-width="1.6"/>
<text x="120" y="180" font-size="13" fill="${ORANGE}">Â</text>
<text x="226" y="210" font-size="14" font-style="italic" fill="${BLUE}">c = AB</text>
<text x="104" y="112" font-size="14" font-style="italic" fill="${GREEN}">b = AC</text>
<text x="324" y="112" font-size="14" font-style="italic" fill="${RED}">a = BC</text>
${pt(80, 190, 'A', -16, 14)}${pt(380, 190, 'B', 6, 14)}${pt(250, 50, 'C', 6, -6)}
<text x="70" y="226" font-size="13" fill="currentColor">a² = b² + c² − 2bc cos Â</text>
</svg>`

// 5. Théorème de la médiane
const svgMediane = `${svgOpen(440, 230)}
<line x1="60" y1="190" x2="380" y2="190" stroke="currentColor" stroke-width="1.6"/>
<line x1="170" y1="60" x2="60" y2="190" stroke="${BLUE}" stroke-width="1.6"/>
<line x1="170" y1="60" x2="380" y2="190" stroke="${BLUE}" stroke-width="1.6"/>
<line x1="170" y1="60" x2="220" y2="190" stroke="${VIOLET}" stroke-width="2.2"/>
<path d="M136 184 l4 12 M140 184 l4 12 M296 184 l4 12 M300 184 l4 12" stroke="currentColor" stroke-width="1"/>
${pt(60, 190, 'A', -16, 14)}${pt(380, 190, 'B', 6, 14)}${pt(220, 190, 'I', -4, 20)}${pt(170, 60, 'M', -6, -10)}
<text x="204" y="128" font-size="13" fill="${VIOLET}">MI</text>
<text x="20" y="222" font-size="12" fill="currentColor">MA² + MB² = 2 MI² + AB²/2      MA · MB = MI² − AB²/4</text>
</svg>`

// 6. Cercle de diamètre [AB]
const svgCercle = `${svgOpen(440, 250)}
<circle cx="220" cy="130" r="100" fill="none" stroke="${BLUE}" stroke-width="1.6"/>
<line x1="120" y1="130" x2="320" y2="130" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/>
<line x1="270" y1="43.4" x2="120" y2="130" stroke="currentColor" stroke-width="1.4"/>
<line x1="270" y1="43.4" x2="320" y2="130" stroke="currentColor" stroke-width="1.4"/>
<path d="M259.6 49.4 L265.6 59.8 L276 53.8" fill="none" stroke="${RED}" stroke-width="1.4"/>
<line x1="126" y1="164.2" x2="120" y2="130" stroke="currentColor" stroke-width="1" opacity="0.6"/>
<line x1="126" y1="164.2" x2="320" y2="130" stroke="currentColor" stroke-width="1" opacity="0.6"/>
${pt(120, 130, 'A', -18, 4)}${pt(320, 130, 'B', 8, 4)}${pt(220, 130, 'I', -4, 18)}${pt(270, 43.4, 'M', 6, -8)}${pt(126, 164.2, 'M′', -24, 14)}
<text x="20" y="246" font-size="12" fill="currentColor">MA · MB = 0  ⟺  M est sur le cercle de diamètre [AB]</text>
</svg>`

// 7. Ligne de niveau AB · AM = k
const svgNiveau = `${svgOpen(440, 220)}${arrowDefs('ps7')}
<line x1="20" y1="150" x2="420" y2="150" stroke="currentColor" stroke-width="0.8" stroke-dasharray="4 3" class="svg-muted"/>
<line x1="320" y1="20" x2="320" y2="200" stroke="${GREEN}" stroke-width="1.8"/>
<path d="M310 150 V140 H320" fill="none" stroke="currentColor" stroke-width="1"/>
${vec('ps7', BLUE, 'blue', 60, 150, 220, 150)}
<line x1="60" y1="150" x2="320" y2="50" stroke="${ORANGE}" stroke-width="1.4"/>
<line x1="60" y1="150" x2="320" y2="190" stroke="${ORANGE}" stroke-width="1" opacity="0.7"/>
${pt(60, 150, 'A', -16, 16)}${pt(220, 150, 'B', -4, 18)}${pt(320, 150, 'H', 6, 18)}${pt(320, 50, 'M', 8, -2)}${pt(320, 190, 'M′', 8, 4)}
<text x="330" y="34" font-size="12" fill="${GREEN}">droite ⊥ (AB)</text>
<text x="20" y="214" font-size="12" fill="currentColor">Pour tout M de la droite : AB · AM = AB × AH = k</text>
</svg>`

const py = (code: string, caption?: string): Block => ({
  type: 'code',
  lang: 'python',
  code: code.replace(/^\n/, '').replace(/\n\s*$/, ''),
  ...(caption ? { caption } : {}),
})

const chapter: Chapter = {
  id: 'produit-scalaire',
  subject: 'maths',
  order: 7,
  title: 'Produit scalaire',
  theme: 'Géométrie',
  summary:
    'Définitions du produit scalaire (cosinus, projection, coordonnées, polarisation), propriétés de calcul, orthogonalité, formule d’Al-Kashi, théorème de la médiane et ensembles de points.',
  duration: '3 à 4 semaines',
  objectives: [
    'Calculer un produit scalaire en choisissant la méthode adaptée (normes et angle, projection orthogonale, coordonnées, identités de polarisation).',
    'Utiliser la bilinéarité et la symétrie du produit scalaire, développer des expressions comme $(\\vec{u}+\\vec{v})^2$.',
    'Caractériser l’orthogonalité de deux vecteurs et démontrer que deux droites sont perpendiculaires.',
    'Utiliser la formule d’Al-Kashi pour calculer une longueur ou un angle dans un triangle.',
    'Utiliser le théorème de la médiane et déterminer l’ensemble des points $M$ tels que $\\overrightarrow{MA}\\cdot\\overrightarrow{MB}=0$.',
    'Calculer des angles et des longueurs dans une configuration géométrique ou dans un repère orthonormé.',
  ],
  keywords: [
    'produit scalaire',
    'norme',
    'projection orthogonale',
    'orthogonalité',
    'bilinéarité',
    'polarisation',
    'Al-Kashi',
    'théorème de la médiane',
    'cercle de diamètre',
    'repère orthonormé',
  ],

  // =====================================================================
  // FICHE
  // =====================================================================
  fiche: [
    { type: 'h2', text: 'Quatre façons de calculer $\\vec{u}\\cdot\\vec{v}$' },
    {
      type: 'table',
      headers: ['Méthode', 'Formule', 'Quand l’utiliser ?'],
      rows: [
        [
          'Normes et angle',
          String.raw`$\vec{u}\cdot\vec{v}=\|\vec{u}\|\times\|\vec{v}\|\times\cos(\vec{u},\vec{v})$`,
          'On connaît les longueurs et l’angle.',
        ],
        [
          'Projection orthogonale',
          String.raw`$\overrightarrow{AB}\cdot\overrightarrow{AC}=\overrightarrow{AB}\cdot\overrightarrow{AH}$ ($H$ projeté de $C$ sur $(AB)$)`,
          'Figure avec angles droits (carré, rectangle, hauteur…).',
        ],
        [
          'Coordonnées (base orthonormée)',
          String.raw`$\vec{u}\cdot\vec{v}=xx'+yy'$`,
          'Un repère orthonormé est donné.',
        ],
        [
          'Polarisation (normes seules)',
          String.raw`$\vec{u}\cdot\vec{v}=\frac{1}{2}\left(\|\vec{u}+\vec{v}\|^2-\|\vec{u}\|^2-\|\vec{v}\|^2\right)$`,
          'On connaît seulement des longueurs.',
        ],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Projection : le signe',
      content: [
        {
          type: 'p',
          text: String.raw`$\overrightarrow{AB}\cdot\overrightarrow{AC}=AB\times AH$ si $\overrightarrow{AB}$ et $\overrightarrow{AH}$ sont de même sens ; $=-AB\times AH$ s’ils sont de sens contraires.`,
        },
      ],
    },
    { type: 'h2', text: 'Règles de calcul' },
    {
      type: 'list',
      items: [
        String.raw`**Symétrie** : $\vec{u}\cdot\vec{v}=\vec{v}\cdot\vec{u}$.`,
        String.raw`**Bilinéarité** : $\vec{u}\cdot(\vec{v}+\vec{w})=\vec{u}\cdot\vec{v}+\vec{u}\cdot\vec{w}$ et $(k\vec{u})\cdot\vec{v}=k(\vec{u}\cdot\vec{v})$.`,
        String.raw`**Carré scalaire** : $\vec{u}\cdot\vec{u}=\vec{u}^{\,2}=\|\vec{u}\|^2$, donc $\overrightarrow{AB}^{\,2}=AB^2$.`,
        String.raw`$\|\vec{u}+\vec{v}\|^2=\|\vec{u}\|^2+2\,\vec{u}\cdot\vec{v}+\|\vec{v}\|^2$ ; $\|\vec{u}-\vec{v}\|^2=\|\vec{u}\|^2-2\,\vec{u}\cdot\vec{v}+\|\vec{v}\|^2$ ; $(\vec{u}+\vec{v})\cdot(\vec{u}-\vec{v})=\|\vec{u}\|^2-\|\vec{v}\|^2$.`,
        String.raw`Avec des points : $\overrightarrow{AB}\cdot\overrightarrow{AC}=\frac{1}{2}\left(AB^2+AC^2-BC^2\right)$.`,
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Orthogonalité',
      content: [
        {
          type: 'p',
          text: String.raw`$\vec{u}\perp\vec{v}\iff\vec{u}\cdot\vec{v}=0\iff xx'+yy'=0$. Les droites $(AB)$ et $(CD)$ sont perpendiculaires $\iff\overrightarrow{AB}\cdot\overrightarrow{CD}=0$.`,
        },
      ],
    },
    { type: 'h2', text: 'Dans un triangle et pour des ensembles de points' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Formule d’Al-Kashi',
      content: [{ type: 'math', tex: String.raw`BC^2=AB^2+AC^2-2\,AB\times AC\times\cos\widehat{BAC}` }],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Théorème de la médiane ($I$ milieu de $[AB]$)',
      content: [
        {
          type: 'math',
          tex: String.raw`\overrightarrow{MA}\cdot\overrightarrow{MB}=MI^2-\frac{AB^2}{4}\qquad MA^2+MB^2=2MI^2+\frac{AB^2}{2}`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Ensemble de points',
      content: [
        {
          type: 'p',
          text: String.raw`L’ensemble des points $M$ tels que $\overrightarrow{MA}\cdot\overrightarrow{MB}=0$ est le **cercle de diamètre $[AB]$**.\nAngle : $\cos(\vec{u},\vec{v})=\dfrac{\vec{u}\cdot\vec{v}}{\|\vec{u}\|\,\|\vec{v}\|}$ puis $\arccos$ à la calculatrice.`,
        },
      ],
    },
  ],

  // =====================================================================
  // COURS
  // =====================================================================
  cours: [
    {
      type: 'p',
      text: 'Le produit scalaire associe à deux vecteurs un **nombre réel**. Cet outil unique permet de calculer des longueurs, des angles, de démontrer des orthogonalités et de caractériser des ensembles de points (cercles, droites). Il sera le fil conducteur de toute la géométrie de Première.',
    },

    // ---------------- 1. Définition
    { type: 'h2', text: '1. Norme et définition par le cosinus' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Norme d’un vecteur',
      content: [
        {
          type: 'p',
          text: String.raw`La **norme** du vecteur $\vec{u}=\overrightarrow{AB}$ est la longueur $AB$. On la note $\|\vec{u}\|$. Pour tout réel $k$ : $\|k\vec{u}\|=|k|\times\|\vec{u}\|$. Seul le vecteur nul a une norme nulle.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Produit scalaire (définition par le cosinus)',
      content: [
        {
          type: 'p',
          text: String.raw`Soient $\vec{u}$ et $\vec{v}$ deux vecteurs **non nuls** et $\theta$ une mesure de l’angle $(\vec{u},\vec{v})$. Le produit scalaire de $\vec{u}$ et $\vec{v}$ est le réel`,
        },
        { type: 'math', tex: String.raw`\vec{u}\cdot\vec{v}=\|\vec{u}\|\times\|\vec{v}\|\times\cos\theta` },
        {
          type: 'p',
          text: String.raw`Si $\vec{u}=\vec{0}$ ou $\vec{v}=\vec{0}$, on pose $\vec{u}\cdot\vec{v}=0$. Avec des points : $\overrightarrow{AB}\cdot\overrightarrow{AC}=AB\times AC\times\cos\widehat{BAC}$.`,
        },
      ],
    },
    { type: 'svg', svg: svgAngle, maxWidth: 480, caption: 'Le produit scalaire ne dépend que des longueurs des deux vecteurs et de l’angle qu’ils forment.' },
    {
      type: 'p',
      text: String.raw`Comme $\cos(-\theta)=\cos\theta$, l’orientation de l’angle n’a aucune importance : on peut utiliser l’angle géométrique (entre $0$ et $\pi$) formé par les deux vecteurs lorsqu’on les fait partir d’un même point.`,
    },
    {
      type: 'table',
      headers: ['Angle $\\theta$', '$\\cos\\theta$', 'Signe de $\\vec{u}\\cdot\\vec{v}$', 'Valeur'],
      rows: [
        ['$0$ (même sens)', '$1$', 'positif', String.raw`$\|\vec{u}\|\times\|\vec{v}\|$`],
        [String.raw`aigu ($0<\theta<\frac{\pi}{2}$)`, '$>0$', 'positif', '—'],
        [String.raw`droit ($\theta=\frac{\pi}{2}$)`, '$0$', 'nul', '$0$'],
        [String.raw`obtus ($\frac{\pi}{2}<\theta<\pi$)`, '$<0$', 'négatif', '—'],
        [String.raw`$\pi$ (sens contraires)`, '$-1$', 'négatif', String.raw`$-\|\vec{u}\|\times\|\vec{v}\|$`],
      ],
      caption: 'Le signe du produit scalaire renseigne sur la nature de l’angle.',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Carré scalaire',
      content: [
        {
          type: 'p',
          text: String.raw`Pour tout vecteur $\vec{u}$ : $\vec{u}\cdot\vec{u}=\|\vec{u}\|^2\times\cos 0=\|\vec{u}\|^2$. On note $\vec{u}^{\,2}=\vec{u}\cdot\vec{u}$. En particulier $\overrightarrow{AB}^{\,2}=AB^2$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : triangle équilatéral',
      content: [
        {
          type: 'p',
          text: String.raw`$ABC$ est équilatéral de côté $4$. Alors $\widehat{BAC}=\frac{\pi}{3}$ et
$$\overrightarrow{AB}\cdot\overrightarrow{AC}=4\times4\times\cos\frac{\pi}{3}=16\times\frac{1}{2}=8.$$
En revanche $\overrightarrow{AB}\cdot\overrightarrow{BC}$ : on fait partir les vecteurs du même point, $\overrightarrow{BC}$ et $\overrightarrow{AB}$ forment un angle de $\frac{2\pi}{3}$ (et non $\frac{\pi}{3}$ !), donc $\overrightarrow{AB}\cdot\overrightarrow{BC}=16\times\left(-\frac{1}{2}\right)=-8$.`,
        },
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
            'Le produit scalaire est un **nombre réel**, pas un vecteur : écrire $\\vec{u}\\cdot\\vec{v}=\\vec{0}$ est faux.',
            'Pour lire l’angle, les deux vecteurs doivent avoir **la même origine** (voir l’exemple $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$).',
            'On n’écrit jamais $\\vec{u}\\cdot\\vec{v}\\cdot\\vec{w}$ : cela n’a pas de sens.',
          ],
        },
      ],
    },

    // ---------------- 2. Projection
    { type: 'h2', text: '2. Produit scalaire et projection orthogonale' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Projeté orthogonal',
      content: [
        {
          type: 'p',
          text: String.raw`Le **projeté orthogonal** d’un point $C$ sur une droite $d$ est le point $H$ de $d$ tel que $(CH)\perp d$ (si $C\in d$, alors $H=C$).`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Propriété de la projection',
      content: [
        {
          type: 'p',
          text: String.raw`Soient $A\neq B$ et $C$ trois points, $H$ le projeté orthogonal de $C$ sur la droite $(AB)$. Alors`,
        },
        { type: 'math', tex: String.raw`\overrightarrow{AB}\cdot\overrightarrow{AC}=\overrightarrow{AB}\cdot\overrightarrow{AH}=\begin{cases}AB\times AH & \text{si } \overrightarrow{AB} \text{ et } \overrightarrow{AH} \text{ sont de même sens}\\ -AB\times AH & \text{si ils sont de sens contraires}\end{cases}` },
      ],
    },
    { type: 'svg', svg: svgProjection, maxWidth: 660, caption: 'On « projette » C sur (AB) : seule compte la longueur AH, avec un signe selon le sens.' },
    {
      type: 'reveal',
      title: 'Démonstration (à connaître)',
      content: [
        {
          type: 'p',
          text: String.raw`Si $\widehat{BAC}$ est aigu, $H$ est sur la demi-droite $[AB)$ et dans le triangle $ACH$ rectangle en $H$ : $\cos\widehat{BAC}=\dfrac{AH}{AC}$, donc $AB\times AC\times\cos\widehat{BAC}=AB\times AH$.`,
        },
        {
          type: 'p',
          text: String.raw`Si $\widehat{BAC}$ est obtus, $H$ est sur la demi-droite opposée et $\cos\widehat{BAC}=-\cos\widehat{CAH}=-\dfrac{AH}{AC}$, donc $\overrightarrow{AB}\cdot\overrightarrow{AC}=-AB\times AH$.`,
        },
        {
          type: 'p',
          text: String.raw`Dans les deux cas, on reconnaît la valeur de $\overrightarrow{AB}\cdot\overrightarrow{AH}$ (angle nul ou plat). Si l’angle est droit, $H=A$ et tout vaut $0$.`,
        },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Repérer le vecteur « support »', text: 'Choisir le vecteur sur la droite duquel on projette (souvent un côté de la figure).' },
        { title: 'Projeter', text: 'Projeter orthogonalement l’extrémité de l’autre vecteur (et son origine si elle n’est pas sur la droite) sur cette droite.' },
        { title: 'Mesurer et signer', text: 'Multiplier les longueurs ; signe $+$ si même sens, $-$ sinon.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : rectangle',
      content: [
        {
          type: 'p',
          text: String.raw`$ABCD$ est un rectangle avec $AB=5$ et $AD=3$.
- Le projeté de $C$ sur $(AB)$ est $B$ : $\overrightarrow{AB}\cdot\overrightarrow{AC}=\overrightarrow{AB}\cdot\overrightarrow{AB}=25$.
- Le projeté de $C$ sur $(AD)$ est $D$ : $\overrightarrow{AD}\cdot\overrightarrow{AC}=AD^2=9$.
- Les projetés de $B$ et $D$ sur $(AB)$ sont $B$ et $A$ : $\overrightarrow{AB}\cdot\overrightarrow{BD}=\overrightarrow{AB}\cdot\overrightarrow{BA}=-25$.
- $\overrightarrow{AB}\cdot\overrightarrow{AD}=0$ car l’angle est droit.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Généralisation',
      content: [
        {
          type: 'p',
          text: String.raw`Plus généralement, si $C'$ et $D'$ sont les projetés de $C$ et $D$ sur $(AB)$, alors $\overrightarrow{AB}\cdot\overrightarrow{CD}=\overrightarrow{AB}\cdot\overrightarrow{C'D'}$.`,
        },
      ],
    },

    // ---------------- 3. Propriétés
    { type: 'h2', text: '3. Propriétés algébriques' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Symétrie et bilinéarité',
      content: [
        { type: 'p', text: String.raw`Pour tous vecteurs $\vec{u},\vec{v},\vec{w}$ et tout réel $k$ :` },
        {
          type: 'list',
          items: [
            String.raw`$\vec{u}\cdot\vec{v}=\vec{v}\cdot\vec{u}$ (symétrie) ;`,
            String.raw`$\vec{u}\cdot(\vec{v}+\vec{w})=\vec{u}\cdot\vec{v}+\vec{u}\cdot\vec{w}$ ;`,
            String.raw`$(k\vec{u})\cdot\vec{v}=\vec{u}\cdot(k\vec{v})=k\,(\vec{u}\cdot\vec{v})$.`,
          ],
        },
        { type: 'p', text: 'Le produit scalaire se « développe » donc comme un produit de nombres.' },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Identités remarquables',
      content: [
        {
          type: 'math',
          tex: String.raw`\begin{aligned}\|\vec{u}+\vec{v}\|^2&=\|\vec{u}\|^2+2\,\vec{u}\cdot\vec{v}+\|\vec{v}\|^2\\ \|\vec{u}-\vec{v}\|^2&=\|\vec{u}\|^2-2\,\vec{u}\cdot\vec{v}+\|\vec{v}\|^2\\ (\vec{u}+\vec{v})\cdot(\vec{u}-\vec{v})&=\|\vec{u}\|^2-\|\vec{v}\|^2\end{aligned}`,
        },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration de la première identité',
      content: [
        {
          type: 'p',
          text: String.raw`$\|\vec{u}+\vec{v}\|^2=(\vec{u}+\vec{v})\cdot(\vec{u}+\vec{v})=\vec{u}\cdot\vec{u}+\vec{u}\cdot\vec{v}+\vec{v}\cdot\vec{u}+\vec{v}\cdot\vec{v}=\|\vec{u}\|^2+2\,\vec{u}\cdot\vec{v}+\|\vec{v}\|^2$ (bilinéarité puis symétrie). Les deux autres se démontrent de la même façon.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Identités de polarisation',
      content: [
        { type: 'p', text: 'En isolant $\\vec{u}\\cdot\\vec{v}$ dans les identités précédentes :' },
        {
          type: 'math',
          tex: String.raw`\vec{u}\cdot\vec{v}=\frac{1}{2}\left(\|\vec{u}+\vec{v}\|^2-\|\vec{u}\|^2-\|\vec{v}\|^2\right)=\frac{1}{2}\left(\|\vec{u}\|^2+\|\vec{v}\|^2-\|\vec{u}-\vec{v}\|^2\right)=\frac{1}{4}\left(\|\vec{u}+\vec{v}\|^2-\|\vec{u}-\vec{v}\|^2\right)`,
        },
        {
          type: 'p',
          text: String.raw`Avec $\vec{u}=\overrightarrow{AB}$ et $\vec{v}=\overrightarrow{AC}$, on a $\vec{u}-\vec{v}=\overrightarrow{CB}$, d’où la formule très utile :`,
        },
        { type: 'math', tex: String.raw`\overrightarrow{AB}\cdot\overrightarrow{AC}=\frac{1}{2}\left(AB^2+AC^2-BC^2\right)` },
      ],
    },
    { type: 'svg', svg: svgPolar, maxWidth: 460, caption: 'Dans le parallélogramme ABDC, les diagonales représentent u + v et u − v.' },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : uniquement des longueurs',
      content: [
        {
          type: 'p',
          text: String.raw`Dans un triangle $ABC$ avec $AB=4$, $AC=6$ et $BC=5$ :
$$\overrightarrow{AB}\cdot\overrightarrow{AC}=\frac{1}{2}\left(16+36-25\right)=\frac{27}{2}=13{,}5.$$
On en déduit $\cos\widehat{BAC}=\dfrac{13{,}5}{4\times6}=\dfrac{9}{16}$, donc $\widehat{BAC}\approx55{,}8^\circ$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Règle du parallélogramme',
      content: [
        {
          type: 'p',
          text: String.raw`En additionnant les deux premières identités : $\|\vec{u}+\vec{v}\|^2+\|\vec{u}-\vec{v}\|^2=2\left(\|\vec{u}\|^2+\|\vec{v}\|^2\right)$ : la somme des carrés des diagonales d’un parallélogramme égale la somme des carrés de ses quatre côtés.`,
        },
      ],
    },

    // ---------------- 4. Coordonnées
    { type: 'h2', text: '4. Expression en repère orthonormé' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Produit scalaire et coordonnées',
      content: [
        {
          type: 'p',
          text: String.raw`Dans une base **orthonormée** $(\vec{\imath},\vec{\jmath})$, si $\vec{u}\begin{pmatrix}x\\y\end{pmatrix}$ et $\vec{v}\begin{pmatrix}x'\\y'\end{pmatrix}$, alors`,
        },
        { type: 'math', tex: String.raw`\vec{u}\cdot\vec{v}=xx'+yy'\qquad\text{et}\qquad\|\vec{u}\|=\sqrt{x^2+y^2}` },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [
        {
          type: 'p',
          text: String.raw`La base est orthonormée : $\vec{\imath}\cdot\vec{\imath}=\vec{\jmath}\cdot\vec{\jmath}=1$ et $\vec{\imath}\cdot\vec{\jmath}=0$. Par bilinéarité :
$$\vec{u}\cdot\vec{v}=(x\vec{\imath}+y\vec{\jmath})\cdot(x'\vec{\imath}+y'\vec{\jmath})=xx'\,\vec{\imath}\cdot\vec{\imath}+(xy'+yx')\,\vec{\imath}\cdot\vec{\jmath}+yy'\,\vec{\jmath}\cdot\vec{\jmath}=xx'+yy'.$$`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : calcul d’un angle dans un repère',
      content: [
        {
          type: 'p',
          text: String.raw`Soient $A(1;1)$, $B(4;2)$ et $C(2;5)$. On a $\overrightarrow{AB}\begin{pmatrix}3\\1\end{pmatrix}$ et $\overrightarrow{AC}\begin{pmatrix}1\\4\end{pmatrix}$.
- $\overrightarrow{AB}\cdot\overrightarrow{AC}=3\times1+1\times4=7$ ;
- $AB=\sqrt{9+1}=\sqrt{10}$ et $AC=\sqrt{1+16}=\sqrt{17}$ ;
- $\cos\widehat{BAC}=\dfrac{7}{\sqrt{10}\times\sqrt{17}}=\dfrac{7}{\sqrt{170}}$, d’où $\widehat{BAC}\approx57{,}5^\circ$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Attention',
      content: [
        {
          type: 'p',
          text: 'La formule $xx\'+yy\'$ n’est valable **que dans une base orthonormée** (axes perpendiculaires et même unité). Dans un repère quelconque, elle donne un résultat faux.',
        },
      ],
    },

    // ---------------- 5. Orthogonalité
    { type: 'h2', text: '5. Orthogonalité' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Vecteurs orthogonaux',
      content: [
        {
          type: 'p',
          text: String.raw`Deux vecteurs $\vec{u}$ et $\vec{v}$ sont **orthogonaux** lorsque $\vec{u}\cdot\vec{v}=0$. On note $\vec{u}\perp\vec{v}$. Le vecteur nul est orthogonal à tout vecteur. Pour deux vecteurs non nuls, cela signifie que leurs directions sont perpendiculaires ($\cos\theta=0$).`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Critères',
      content: [
        {
          type: 'list',
          items: [
            String.raw`En base orthonormée : $\vec{u}\begin{pmatrix}x\\y\end{pmatrix}\perp\vec{v}\begin{pmatrix}x'\\y'\end{pmatrix}\iff xx'+yy'=0$.`,
            String.raw`Les droites $(AB)$ et $(CD)$ sont perpendiculaires $\iff\overrightarrow{AB}\cdot\overrightarrow{CD}=0$.`,
            String.raw`Le vecteur $\begin{pmatrix}-y\\x\end{pmatrix}$ est toujours orthogonal à $\begin{pmatrix}x\\y\end{pmatrix}$.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : trouver un paramètre',
      content: [
        {
          type: 'p',
          text: String.raw`Pour quelle valeur de $m$ les vecteurs $\vec{u}\begin{pmatrix}m\\2\end{pmatrix}$ et $\vec{v}\begin{pmatrix}3\\m-5\end{pmatrix}$ sont-ils orthogonaux ?
$\vec{u}\cdot\vec{v}=3m+2(m-5)=5m-10$. Donc $\vec{u}\perp\vec{v}\iff 5m-10=0\iff m=2$.`,
        },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Choisir deux vecteurs directeurs', text: 'Pour montrer que $(AB)\\perp(CD)$, on considère $\\overrightarrow{AB}$ et $\\overrightarrow{CD}$.' },
        { title: 'Calculer le produit scalaire', text: 'En coordonnées si un repère orthonormé est disponible, sinon par décomposition (relation de Chasles + bilinéarité).' },
        { title: 'Conclure', text: 'Produit scalaire nul $\\Rightarrow$ droites perpendiculaires. Rédiger la phrase de conclusion.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple sans repère : décomposer avec Chasles',
      content: [
        {
          type: 'p',
          text: String.raw`$ABCD$ est un carré de côté $a$, $I$ le milieu de $[AB]$ et $J$ celui de $[BC]$. Montrons que $(DI)\perp(AJ)$.
$$\overrightarrow{DI}\cdot\overrightarrow{AJ}=(\overrightarrow{DA}+\overrightarrow{AI})\cdot(\overrightarrow{AB}+\overrightarrow{BJ})=\overrightarrow{DA}\cdot\overrightarrow{AB}+\overrightarrow{DA}\cdot\overrightarrow{BJ}+\overrightarrow{AI}\cdot\overrightarrow{AB}+\overrightarrow{AI}\cdot\overrightarrow{BJ}.$$
$\overrightarrow{DA}\cdot\overrightarrow{AB}=0$ et $\overrightarrow{AI}\cdot\overrightarrow{BJ}=0$ (angles droits) ; $\overrightarrow{DA}$ et $\overrightarrow{BJ}$ sont colinéaires de sens contraires : $\overrightarrow{DA}\cdot\overrightarrow{BJ}=-a\times\frac{a}{2}$ ; $\overrightarrow{AI}\cdot\overrightarrow{AB}=\frac{a}{2}\times a$.
Total : $0-\frac{a^2}{2}+\frac{a^2}{2}+0=0$. Les droites $(DI)$ et $(AJ)$ sont perpendiculaires.`,
        },
      ],
    },

    // ---------------- 6. Al-Kashi
    { type: 'h2', text: '6. Formule d’Al-Kashi' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Théorème d’Al-Kashi (loi des cosinus)',
      content: [
        {
          type: 'p',
          text: String.raw`Dans un triangle $ABC$, en notant $a=BC$, $b=AC$, $c=AB$ :`,
        },
        { type: 'math', tex: String.raw`a^2=b^2+c^2-2bc\cos\widehat{A}` },
        {
          type: 'p',
          text: String.raw`et de même $b^2=a^2+c^2-2ac\cos\widehat{B}$, $c^2=a^2+b^2-2ab\cos\widehat{C}$.`,
        },
      ],
    },
    { type: 'svg', svg: svgAlKashi, maxWidth: 480, caption: 'Notations usuelles : chaque côté porte le nom (minuscule) du sommet opposé.' },
    {
      type: 'reveal',
      title: 'Démonstration (à connaître)',
      content: [
        {
          type: 'p',
          text: String.raw`$\overrightarrow{BC}=\overrightarrow{AC}-\overrightarrow{AB}$, donc
$$BC^2=\|\overrightarrow{AC}-\overrightarrow{AB}\|^2=AC^2-2\,\overrightarrow{AC}\cdot\overrightarrow{AB}+AB^2=AC^2+AB^2-2\,AB\times AC\times\cos\widehat{BAC}.$$`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Pythagore généralisé',
      content: [
        {
          type: 'p',
          text: String.raw`Si $\widehat{A}=90^\circ$, $\cos\widehat{A}=0$ et on retrouve $a^2=b^2+c^2$. Le terme $-2bc\cos\widehat{A}$ est une « correction » : négative si l’angle est aigu ($a^2<b^2+c^2$), positive s’il est obtus ($a^2>b^2+c^2$).`,
        },
      ],
    },
    {
      type: 'grid',
      columns: 2,
      items: [
        {
          title: 'Deux côtés et l’angle compris',
          text: 'On connaît $b$, $c$ et $\\widehat{A}$ : la formule donne directement $a^2$, puis $a$.',
          icon: 'Ruler',
        },
        {
          title: 'Les trois côtés',
          text: 'On isole le cosinus : $\\cos\\widehat{A}=\\dfrac{b^2+c^2-a^2}{2bc}$, puis on utilise $\\arccos$.',
          icon: 'Triangle',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé',
      content: [
        {
          type: 'p',
          text: String.raw`$ABC$ est un triangle tel que $AB=5$, $AC=7$ et $\widehat{BAC}=60^\circ$. D’après la formule d’Al-Kashi :
$$BC^2=5^2+7^2-2\times5\times7\times\cos60^\circ=25+49-35=39,\quad\text{donc } BC=\sqrt{39}\approx6{,}24.$$
Puis $\cos\widehat{ABC}=\dfrac{AB^2+BC^2-AC^2}{2\times AB\times BC}=\dfrac{25+39-49}{10\sqrt{39}}=\dfrac{15}{10\sqrt{39}}\approx0{,}240$, donc $\widehat{ABC}\approx76{,}1^\circ$ et $\widehat{ACB}\approx180-60-76{,}1=43{,}9^\circ$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Un peu d’histoire',
      content: [
        {
          type: 'p',
          text: 'Une version géométrique de ce résultat figure déjà dans les *Éléments* d’Euclide (livre II, propositions 12 et 13, vers −300). L’astronome et mathématicien persan **Ghiyath al-Din Jamshid al-Kashi** (vers 1380 – 1429), qui travaillait à Samarcande, l’a énoncé sous une forme adaptée au calcul trigonométrique. En France, on l’appelle « théorème d’Al-Kashi » ; ailleurs, on parle de « loi des cosinus ».',
        },
      ],
    },

    // ---------------- 7. Médiane
    { type: 'h2', text: '7. Théorème de la médiane' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Théorème de la médiane',
      content: [
        { type: 'p', text: String.raw`Soient $A$ et $B$ deux points et $I$ le milieu de $[AB]$. Pour tout point $M$ :` },
        {
          type: 'math',
          tex: String.raw`\overrightarrow{MA}\cdot\overrightarrow{MB}=MI^2-\frac{AB^2}{4}\qquad\text{et}\qquad MA^2+MB^2=2MI^2+\frac{AB^2}{2}`,
        },
      ],
    },
    { type: 'svg', svg: svgMediane, maxWidth: 460, caption: '[MI] est la médiane issue de M dans le triangle MAB.' },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [
        {
          type: 'p',
          text: String.raw`Comme $I$ est le milieu de $[AB]$, $\overrightarrow{IB}=-\overrightarrow{IA}$ et $IA=\frac{AB}{2}$. Avec Chasles :
$$\overrightarrow{MA}\cdot\overrightarrow{MB}=(\overrightarrow{MI}+\overrightarrow{IA})\cdot(\overrightarrow{MI}-\overrightarrow{IA})=MI^2-IA^2=MI^2-\frac{AB^2}{4}.$$
$$MA^2+MB^2=\|\overrightarrow{MI}+\overrightarrow{IA}\|^2+\|\overrightarrow{MI}-\overrightarrow{IA}\|^2=2MI^2+2IA^2=2MI^2+\frac{AB^2}{2}.$$
(les doubles produits $\pm2\,\overrightarrow{MI}\cdot\overrightarrow{IA}$ s’annulent).`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : longueur d’une médiane',
      content: [
        {
          type: 'p',
          text: String.raw`Dans le triangle $ABC$, $AB=5$, $AC=7$ et $BC=8$. Soit $I$ le milieu de $[BC]$. Le théorème appliqué à $M=A$ et au segment $[BC]$ donne
$$AB^2+AC^2=2AI^2+\frac{BC^2}{2}\iff 74=2AI^2+32\iff AI^2=21,$$
donc la médiane issue de $A$ mesure $AI=\sqrt{21}\approx4{,}58$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Complément',
      content: [
        {
          type: 'p',
          text: String.raw`On montre de même que $MA^2-MB^2=2\,\overrightarrow{IM}\cdot\overrightarrow{AB}$ (développer $(\overrightarrow{MA}-\overrightarrow{MB})\cdot(\overrightarrow{MA}+\overrightarrow{MB})$).`,
        },
      ],
    },

    // ---------------- 8. Ensembles de points
    { type: 'h2', text: '8. Ensembles de points' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Ensemble des points $M$ tels que $\\overrightarrow{MA}\\cdot\\overrightarrow{MB}=0$',
      content: [
        {
          type: 'p',
          text: String.raw`Soient $A\neq B$. L’ensemble des points $M$ du plan tels que $\overrightarrow{MA}\cdot\overrightarrow{MB}=0$ est le **cercle de diamètre $[AB]$**.`,
        },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [
        {
          type: 'p',
          text: String.raw`Avec $I$ milieu de $[AB]$ : $\overrightarrow{MA}\cdot\overrightarrow{MB}=0\iff MI^2-\dfrac{AB^2}{4}=0\iff MI^2=\left(\dfrac{AB}{2}\right)^2\iff MI=\dfrac{AB}{2}$ (des longueurs sont positives). C’est exactement le cercle de centre $I$ et de rayon $\frac{AB}{2}$.`,
        },
      ],
    },
    { type: 'svg', svg: svgCercle, maxWidth: 460, caption: 'Tout point M du cercle (distinct de A et B) voit [AB] sous un angle droit ; A et B eux-mêmes vérifient aussi MA · MB = 0.' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Cas général : $\\overrightarrow{MA}\\cdot\\overrightarrow{MB}=k$',
      content: [
        {
          type: 'p',
          text: String.raw`$\overrightarrow{MA}\cdot\overrightarrow{MB}=k\iff MI^2=k+\dfrac{AB^2}{4}$. Selon le signe de $k+\frac{AB^2}{4}$, l’ensemble est un **cercle** de centre $I$ (si $>0$), le **point** $I$ (si $=0$) ou **vide** (si $<0$).`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Ligne de niveau $\\overrightarrow{AB}\\cdot\\overrightarrow{AM}=k$',
      content: [
        {
          type: 'p',
          text: String.raw`Par projection, $\overrightarrow{AB}\cdot\overrightarrow{AM}=\overrightarrow{AB}\cdot\overrightarrow{AH}$ où $H$ est le projeté de $M$ sur $(AB)$. L’ensemble des points $M$ tels que $\overrightarrow{AB}\cdot\overrightarrow{AM}=k$ est donc une **droite perpendiculaire à $(AB)$**, passant par le point $H$ de $(AB)$ tel que $\overrightarrow{AB}\cdot\overrightarrow{AH}=k$.`,
        },
      ],
    },
    { type: 'svg', svg: svgNiveau, maxWidth: 460, caption: 'Tous les points d’une droite perpendiculaire à (AB) ont le même projeté H, donc le même produit scalaire.' },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        {
          type: 'p',
          text: String.raw`$AB=6$ et $I$ milieu de $[AB]$. Ensemble des points $M$ tels que $MA^2+MB^2=50$ : par le théorème de la médiane, $2MI^2+18=50\iff MI^2=16\iff MI=4$. C’est le cercle de centre $I$ et de rayon $4$.`,
        },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Faire apparaître le milieu', text: 'Introduire $I$, milieu de $[AB]$, et appliquer le théorème de la médiane.' },
        { title: 'Isoler $MI^2$', text: 'Se ramener à une condition $MI^2=r^2$.' },
        { title: 'Discuter le signe', text: 'Si $r^2>0$ : cercle de centre $I$ et de rayon $r$ ; si $r^2=0$ : point $I$ ; si $r^2<0$ : ensemble vide.' },
      ],
    },

    // ---------------- 9. Synthèse
    { type: 'h2', text: '9. Synthèse : calculer des angles et des longueurs' },
    {
      type: 'table',
      headers: ['On cherche…', 'On connaît…', 'Outil'],
      rows: [
        ['un produit scalaire', 'longueurs et angle', 'définition avec le cosinus'],
        ['un produit scalaire', 'une figure avec angles droits', 'projection orthogonale'],
        ['un produit scalaire', 'les trois longueurs du triangle', String.raw`$\frac{1}{2}(AB^2+AC^2-BC^2)$`],
        ['un angle', 'coordonnées', String.raw`$\cos\theta=\dfrac{\vec{u}\cdot\vec{v}}{\|\vec{u}\|\,\|\vec{v}\|}$`],
        ['une longueur', 'deux côtés et l’angle compris', 'Al-Kashi'],
        ['une longueur de médiane', 'les trois côtés', 'théorème de la médiane'],
        ['une orthogonalité', 'coordonnées ou décomposition', String.raw`$\vec{u}\cdot\vec{v}=0$`],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Rédaction et arrondis',
      content: [
        {
          type: 'list',
          items: [
            'Garder les **valeurs exactes** ($\\sqrt{39}$, $\\frac{7}{\\sqrt{170}}$…) jusqu’au bout et n’arrondir qu’à la fin.',
            'Vérifier que la calculatrice est en **degrés** (ou en radians) selon l’unité demandée.',
            'Un cosinus est toujours compris entre $-1$ et $1$ : un résultat hors de cet intervalle signale une erreur.',
          ],
        },
      ],
    },
  ],

  // =====================================================================
  // EXERCICES
  // =====================================================================
  exercices: [
    {
      id: 'ps-coordonnees',
      title: 'Produit scalaire, normes et angle en coordonnées',
      difficulty: 1,
      duration: 10,
      tags: ['coordonnées', 'angle'],
      statement: [
        {
          type: 'p',
          text: String.raw`Dans un repère orthonormé, on donne $\vec{u}\begin{pmatrix}3\\-2\end{pmatrix}$ et $\vec{v}\begin{pmatrix}4\\5\end{pmatrix}$.
1. Calculer $\vec{u}\cdot\vec{v}$.
2. Calculer $\|\vec{u}\|$ et $\|\vec{v}\|$.
3. En déduire une valeur approchée au dixième de degré de l’angle géométrique entre $\vec{u}$ et $\vec{v}$.
4. Donner les coordonnées d’un vecteur non nul orthogonal à $\vec{u}$.`,
        },
      ],
      hints: [
        'En base orthonormée : $xx\'+yy\'$.',
        '$\\cos\\theta = \\dfrac{\\vec{u}\\cdot\\vec{v}}{\\|\\vec{u}\\|\\,\\|\\vec{v}\\|}$.',
      ],
      solution: [
        {
          type: 'p',
          text: String.raw`1. $\vec{u}\cdot\vec{v}=3\times4+(-2)\times5=12-10=2$.
2. $\|\vec{u}\|=\sqrt{9+4}=\sqrt{13}$ et $\|\vec{v}\|=\sqrt{16+25}=\sqrt{41}$.
3. $\cos\theta=\dfrac{2}{\sqrt{13}\times\sqrt{41}}=\dfrac{2}{\sqrt{533}}\approx0{,}0866$, donc $\theta\approx85{,}0^\circ$. Le produit scalaire est positif mais petit : l’angle est aigu, proche d’un angle droit.
4. Le vecteur $\vec{w}\begin{pmatrix}2\\3\end{pmatrix}$ convient : $\vec{u}\cdot\vec{w}=6-6=0$ (on échange les coordonnées et on change un signe).`,
        },
      ],
    },
    {
      id: 'ps-normes-angle',
      title: 'Développer avec la bilinéarité',
      difficulty: 1,
      duration: 10,
      tags: ['bilinéarité', 'norme'],
      statement: [
        {
          type: 'p',
          text: String.raw`$\vec{u}$ et $\vec{v}$ sont deux vecteurs tels que $\|\vec{u}\|=3$, $\|\vec{v}\|=4$ et $(\vec{u},\vec{v})=\frac{\pi}{3}$.
1. Calculer $\vec{u}\cdot\vec{v}$.
2. Calculer $\|\vec{u}+\vec{v}\|$ et $\|\vec{u}-\vec{v}\|$.
3. Calculer $(2\vec{u}-\vec{v})\cdot(\vec{u}+3\vec{v})$.`,
        },
      ],
      hints: ['$\\|\\vec{u}+\\vec{v}\\|^2=(\\vec{u}+\\vec{v})\\cdot(\\vec{u}+\\vec{v})$.', 'Développer comme un produit de nombres, puis remplacer $\\vec{u}^{\\,2}$ par $9$.'],
      solution: [
        {
          type: 'p',
          text: String.raw`1. $\vec{u}\cdot\vec{v}=3\times4\times\cos\frac{\pi}{3}=12\times\frac{1}{2}=6$.
2. $\|\vec{u}+\vec{v}\|^2=\|\vec{u}\|^2+2\,\vec{u}\cdot\vec{v}+\|\vec{v}\|^2=9+12+16=37$, donc $\|\vec{u}+\vec{v}\|=\sqrt{37}$.
$\|\vec{u}-\vec{v}\|^2=9-12+16=13$, donc $\|\vec{u}-\vec{v}\|=\sqrt{13}$.
3. Par bilinéarité :
$$(2\vec{u}-\vec{v})\cdot(\vec{u}+3\vec{v})=2\vec{u}^{\,2}+6\,\vec{u}\cdot\vec{v}-\vec{v}\cdot\vec{u}-3\vec{v}^{\,2}=2\times9+5\times6-3\times16=18+30-48=0.$$
Les vecteurs $2\vec{u}-\vec{v}$ et $\vec{u}+3\vec{v}$ sont donc orthogonaux.`,
        },
      ],
    },
    {
      id: 'ps-projection-carre',
      title: 'Projections dans un carré',
      difficulty: 1,
      duration: 10,
      tags: ['projection'],
      statement: [
        {
          type: 'p',
          text: String.raw`$ABCD$ est un carré de côté $4$ et de centre $O$ ; $I$ est le milieu de $[CD]$. Calculer, en utilisant des projections orthogonales :
1. $\overrightarrow{AB}\cdot\overrightarrow{AC}$ ; 2. $\overrightarrow{AB}\cdot\overrightarrow{AI}$ ; 3. $\overrightarrow{AB}\cdot\overrightarrow{CD}$ ; 4. $\overrightarrow{AC}\cdot\overrightarrow{BD}$ ; 5. $\overrightarrow{AB}\cdot\overrightarrow{OC}$.`,
        },
      ],
      hints: ['Projeter sur la droite (AB) les points C, I, D, O.', 'Les diagonales d’un carré sont perpendiculaires.'],
      solution: [
        {
          type: 'list',
          items: [
            String.raw`Le projeté de $C$ sur $(AB)$ est $B$ : $\overrightarrow{AB}\cdot\overrightarrow{AC}=AB^2=16$.`,
            String.raw`Le projeté de $I$ sur $(AB)$ est le milieu $K$ de $[AB]$ : $\overrightarrow{AB}\cdot\overrightarrow{AI}=AB\times AK=4\times2=8$.`,
            String.raw`$\overrightarrow{CD}=-\overrightarrow{AB}$ : $\overrightarrow{AB}\cdot\overrightarrow{CD}=-AB^2=-16$.`,
            String.raw`Les diagonales d’un carré sont perpendiculaires : $\overrightarrow{AC}\cdot\overrightarrow{BD}=0$.`,
            String.raw`Les projetés de $O$ et $C$ sur $(AB)$ sont $K$ (milieu de $[AB]$) et $B$ : $\overrightarrow{AB}\cdot\overrightarrow{OC}=\overrightarrow{AB}\cdot\overrightarrow{KB}=4\times2=8$ (même sens).`,
          ],
        },
      ],
    },
    {
      id: 'ps-orthogonalite-parametre',
      title: 'Orthogonalité et paramètre',
      difficulty: 2,
      duration: 15,
      tags: ['orthogonalité', 'coordonnées'],
      statement: [
        {
          type: 'p',
          text: String.raw`Dans un repère orthonormé, on considère $A(-1;2)$, $B(3;4)$ et, pour tout réel $m$, le point $C_m(m;-1)$.
1. Exprimer $\overrightarrow{AB}\cdot\overrightarrow{AC_m}$ en fonction de $m$.
2. Pour quelle valeur de $m$ le triangle $ABC_m$ est-il rectangle en $A$ ?
3. Pour quelle(s) valeur(s) de $m$ est-il rectangle en $C_m$ ?`,
        },
      ],
      hints: [
        'Rectangle en $A$ : $\\overrightarrow{AB}\\cdot\\overrightarrow{AC_m}=0$.',
        'Rectangle en $C_m$ : $\\overrightarrow{C_mA}\\cdot\\overrightarrow{C_mB}=0$, on obtient une équation du second degré.',
      ],
      solution: [
        {
          type: 'p',
          text: String.raw`1. $\overrightarrow{AB}\begin{pmatrix}4\\2\end{pmatrix}$ et $\overrightarrow{AC_m}\begin{pmatrix}m+1\\-3\end{pmatrix}$, donc $\overrightarrow{AB}\cdot\overrightarrow{AC_m}=4(m+1)-6=4m-2$.
2. $4m-2=0\iff m=\frac{1}{2}$ : le triangle est rectangle en $A$ pour $m=\frac{1}{2}$.
3. $\overrightarrow{C_mA}\begin{pmatrix}-1-m\\3\end{pmatrix}$, $\overrightarrow{C_mB}\begin{pmatrix}3-m\\5\end{pmatrix}$ :
$$\overrightarrow{C_mA}\cdot\overrightarrow{C_mB}=(-1-m)(3-m)+15=m^2-2m-3+15=m^2-2m+12.$$
Son discriminant vaut $\Delta=4-48=-44<0$ : ce trinôme ne s’annule jamais. Le triangle n’est **jamais** rectangle en $C_m$.
*Interprétation* : le cercle de diamètre $[AB]$ (centre $(1;3)$, rayon $\sqrt5\approx2{,}24$) ne coupe pas la droite $y=-1$, située à distance $4$ du centre.`,
        },
      ],
    },
    {
      id: 'ps-al-kashi',
      title: 'Résoudre un triangle avec Al-Kashi',
      difficulty: 2,
      duration: 15,
      tags: ['Al-Kashi', 'angles'],
      statement: [
        {
          type: 'p',
          text: String.raw`1. Un triangle $ABC$ vérifie $AB=5$, $AC=7$ et $\widehat{BAC}=60^\circ$. Calculer la valeur exacte de $BC$, puis des valeurs approchées des angles $\widehat{ABC}$ et $\widehat{ACB}$ au dixième de degré.
2. Un triangle $EFG$ a pour côtés $EF=4$, $FG=6$ et $EG=8$. Est-il rectangle ? acutangle ? obtusangle ? Calculer son plus grand angle.`,
        },
      ],
      hints: [
        'Le plus grand angle est opposé au plus grand côté.',
        '$\\cos\\widehat{F}=\\dfrac{FE^2+FG^2-EG^2}{2\\,FE\\times FG}$.',
      ],
      solution: [
        {
          type: 'p',
          text: String.raw`1. $BC^2=25+49-2\times5\times7\times\frac{1}{2}=39$, donc $BC=\sqrt{39}\approx6{,}24$.
$\cos\widehat{ABC}=\dfrac{AB^2+BC^2-AC^2}{2\,AB\times BC}=\dfrac{25+39-49}{10\sqrt{39}}=\dfrac{3}{2\sqrt{39}}\approx0{,}2402$, d’où $\widehat{ABC}\approx76{,}1^\circ$.
$\widehat{ACB}=180^\circ-60^\circ-\widehat{ABC}\approx43{,}9^\circ$.
2. Le plus grand côté est $[EG]$, opposé à $F$. $\cos\widehat{F}=\dfrac{16+36-64}{2\times4\times6}=\dfrac{-12}{48}=-\dfrac{1}{4}$.
Le cosinus est négatif : l’angle $\widehat{F}$ est **obtus**, $\widehat{F}\approx104{,}5^\circ$. Le triangle est obtusangle (et non rectangle car $64\neq16+36$).`,
        },
      ],
    },
    {
      id: 'ps-mediane',
      title: 'Théorème de la médiane et ensembles de points',
      difficulty: 2,
      duration: 20,
      tags: ['médiane', 'ensemble de points'],
      statement: [
        {
          type: 'p',
          text: String.raw`$A$ et $B$ sont deux points tels que $AB=6$ ; $I$ est le milieu de $[AB]$. Déterminer et représenter :
1. l’ensemble $\mathcal{E}_1$ des points $M$ tels que $MA^2+MB^2=50$ ;
2. l’ensemble $\mathcal{E}_2$ des points $M$ tels que $\overrightarrow{MA}\cdot\overrightarrow{MB}=-9$ ;
3. l’ensemble $\mathcal{E}_3$ des points $M$ tels que $\overrightarrow{MA}\cdot\overrightarrow{MB}=-10$ ;
4. l’ensemble $\mathcal{E}_4$ des points $M$ tels que $\overrightarrow{MA}\cdot\overrightarrow{MB}=7$.`,
        },
      ],
      hints: ['$MA^2+MB^2=2MI^2+\\frac{AB^2}{2}$ et $\\overrightarrow{MA}\\cdot\\overrightarrow{MB}=MI^2-\\frac{AB^2}{4}$.', 'Ici $\\frac{AB^2}{4}=9$ et $\\frac{AB^2}{2}=18$.'],
      solution: [
        {
          type: 'list',
          items: [
            String.raw`$MA^2+MB^2=50\iff2MI^2+18=50\iff MI^2=16\iff MI=4$ : $\mathcal{E}_1$ est le cercle de centre $I$ et de rayon $4$.`,
            String.raw`$\overrightarrow{MA}\cdot\overrightarrow{MB}=-9\iff MI^2-9=-9\iff MI=0$ : $\mathcal{E}_2=\{I\}$.`,
            String.raw`$\overrightarrow{MA}\cdot\overrightarrow{MB}=-10\iff MI^2=-1$ : impossible, $\mathcal{E}_3=\varnothing$.`,
            String.raw`$\overrightarrow{MA}\cdot\overrightarrow{MB}=7\iff MI^2=16\iff MI=4$ : $\mathcal{E}_4=\mathcal{E}_1$, cercle de centre $I$ et de rayon $4$.`,
          ],
        },
        {
          type: 'p',
          text: 'Remarque : la valeur minimale de $\\overrightarrow{MA}\\cdot\\overrightarrow{MB}$ est $-9$, atteinte uniquement en $M=I$.',
        },
      ],
    },
    {
      id: 'ps-cercle-diametre',
      title: 'Cercle de diamètre [AB] en coordonnées',
      difficulty: 2,
      duration: 15,
      tags: ['ensemble de points', 'cercle'],
      statement: [
        {
          type: 'p',
          text: String.raw`Dans un repère orthonormé, $A(1;2)$ et $B(5;-2)$.
1. Déterminer une équation de l’ensemble $\mathcal{C}$ des points $M(x;y)$ tels que $\overrightarrow{MA}\cdot\overrightarrow{MB}=0$.
2. Retrouver son centre et son rayon. Était-ce prévisible ?
3. Le point $E(5;2)$ appartient-il à $\mathcal{C}$ ? Interpréter géométriquement.`,
        },
      ],
      hints: ['$\\overrightarrow{MA}\\begin{pmatrix}1-x\\\\2-y\\end{pmatrix}$.', 'Compléter les carrés : $x^2-6x=(x-3)^2-9$.'],
      solution: [
        {
          type: 'p',
          text: String.raw`1. $\overrightarrow{MA}\begin{pmatrix}1-x\\2-y\end{pmatrix}$, $\overrightarrow{MB}\begin{pmatrix}5-x\\-2-y\end{pmatrix}$ :
$$\overrightarrow{MA}\cdot\overrightarrow{MB}=(1-x)(5-x)+(2-y)(-2-y)=x^2-6x+5+y^2-4.$$
$\mathcal{C}$ : $x^2-6x+y^2+1=0$.
2. $x^2-6x+y^2+1=(x-3)^2-9+y^2+1$, donc $\mathcal{C}$ : $(x-3)^2+y^2=8$. Centre $I(3;0)$, rayon $\sqrt8=2\sqrt2$.
C’était prévisible : $\mathcal{C}$ est le cercle de diamètre $[AB]$, de centre le milieu $\left(\frac{1+5}{2};\frac{2-2}{2}\right)=(3;0)$ et de rayon $\frac{AB}{2}=\frac{\sqrt{16+16}}{2}=2\sqrt2$.
3. $(5-3)^2+2^2=8$ : oui, $E\in\mathcal{C}$. Donc $\overrightarrow{EA}\cdot\overrightarrow{EB}=0$ : le triangle $ABE$ est rectangle en $E$ (vérification : $\overrightarrow{EA}\begin{pmatrix}-4\\0\end{pmatrix}$, $\overrightarrow{EB}\begin{pmatrix}0\\-4\end{pmatrix}$).`,
        },
      ],
    },
    {
      id: 'ps-demo-carre',
      title: 'Démontrer une perpendicularité sans repère',
      difficulty: 2,
      duration: 15,
      tags: ['orthogonalité', 'Chasles'],
      statement: [
        {
          type: 'p',
          text: String.raw`$ABCD$ est un carré de côté $a$, $I$ est le milieu de $[AB]$ et $J$ celui de $[BC]$.
1. Démontrer, en décomposant les vecteurs, que $(DI)\perp(AJ)$.
2. Retrouver ce résultat dans le repère orthonormé $\left(A;\frac{1}{a}\overrightarrow{AB},\frac{1}{a}\overrightarrow{AD}\right)$.`,
        },
      ],
      hints: ['$\\overrightarrow{DI}=\\overrightarrow{DA}+\\overrightarrow{AI}$ et $\\overrightarrow{AJ}=\\overrightarrow{AB}+\\overrightarrow{BJ}$.', 'Dans le repère : $D(0;a)$, $I\\left(\\frac{a}{2};0\\right)$, $J\\left(a;\\frac{a}{2}\\right)$.'],
      solution: [
        {
          type: 'p',
          text: String.raw`1. $\overrightarrow{DI}\cdot\overrightarrow{AJ}=\overrightarrow{DA}\cdot\overrightarrow{AB}+\overrightarrow{DA}\cdot\overrightarrow{BJ}+\overrightarrow{AI}\cdot\overrightarrow{AB}+\overrightarrow{AI}\cdot\overrightarrow{BJ}$.
- $\overrightarrow{DA}\perp\overrightarrow{AB}$ et $\overrightarrow{AI}\perp\overrightarrow{BJ}$ : ces termes sont nuls.
- $\overrightarrow{BJ}=\frac{1}{2}\overrightarrow{AD}=-\frac{1}{2}\overrightarrow{DA}$ : $\overrightarrow{DA}\cdot\overrightarrow{BJ}=-\frac{1}{2}DA^2=-\frac{a^2}{2}$.
- $\overrightarrow{AI}=\frac{1}{2}\overrightarrow{AB}$ : $\overrightarrow{AI}\cdot\overrightarrow{AB}=\frac{a^2}{2}$.
Donc $\overrightarrow{DI}\cdot\overrightarrow{AJ}=0$ : les droites $(DI)$ et $(AJ)$ sont perpendiculaires.
2. $\overrightarrow{DI}\begin{pmatrix}a/2\\-a\end{pmatrix}$, $\overrightarrow{AJ}\begin{pmatrix}a\\a/2\end{pmatrix}$ : $\overrightarrow{DI}\cdot\overrightarrow{AJ}=\frac{a^2}{2}-\frac{a^2}{2}=0$. ✔`,
        },
      ],
    },
    {
      id: 'ps-parallelogramme',
      title: 'Règle du parallélogramme et losange',
      difficulty: 3,
      duration: 20,
      tags: ['démonstration', 'polarisation'],
      statement: [
        {
          type: 'p',
          text: String.raw`$ABCD$ est un parallélogramme. On pose $\vec{u}=\overrightarrow{AB}$ et $\vec{v}=\overrightarrow{AD}$.
1. Exprimer $\overrightarrow{AC}$ et $\overrightarrow{DB}$ en fonction de $\vec{u}$ et $\vec{v}$.
2. Démontrer que $AC^2+BD^2=2\left(AB^2+AD^2\right)$.
3. Démontrer que les diagonales de $ABCD$ sont perpendiculaires si et seulement si $ABCD$ est un losange.
4. Application : un parallélogramme a des côtés de longueurs $5$ et $7$ et une diagonale de longueur $8$. Calculer la longueur de l’autre diagonale.`,
        },
      ],
      hints: [
        '$\\overrightarrow{AC}=\\vec{u}+\\vec{v}$ et $\\overrightarrow{DB}=\\vec{u}-\\vec{v}$.',
        '$(\\vec{u}+\\vec{v})\\cdot(\\vec{u}-\\vec{v})=\\|\\vec{u}\\|^2-\\|\\vec{v}\\|^2$.',
      ],
      solution: [
        {
          type: 'p',
          text: String.raw`1. $\overrightarrow{AC}=\overrightarrow{AB}+\overrightarrow{BC}=\vec{u}+\vec{v}$ (car $\overrightarrow{BC}=\overrightarrow{AD}$) et $\overrightarrow{DB}=\overrightarrow{DA}+\overrightarrow{AB}=\vec{u}-\vec{v}$.
2. $AC^2+BD^2=\|\vec{u}+\vec{v}\|^2+\|\vec{u}-\vec{v}\|^2=\left(\|\vec{u}\|^2+2\vec{u}\cdot\vec{v}+\|\vec{v}\|^2\right)+\left(\|\vec{u}\|^2-2\vec{u}\cdot\vec{v}+\|\vec{v}\|^2\right)=2\left(AB^2+AD^2\right)$.
3. $\overrightarrow{AC}\cdot\overrightarrow{DB}=(\vec{u}+\vec{v})\cdot(\vec{u}-\vec{v})=AB^2-AD^2$. Les diagonales sont perpendiculaires $\iff AB^2=AD^2\iff AB=AD$ ; un parallélogramme ayant deux côtés consécutifs égaux est un losange. Réciproquement, dans un losange $AB=AD$ donc le produit scalaire est nul.
4. $8^2+d^2=2(25+49)=148\iff d^2=84\iff d=\sqrt{84}=2\sqrt{21}\approx9{,}17$.`,
        },
      ],
    },
    {
      id: 'ps-bac-triangle',
      title: 'Type bac : étude complète d’un triangle',
      difficulty: 3,
      duration: 35,
      tags: ['type bac', 'coordonnées', 'projection', 'aire'],
      statement: [
        {
          type: 'p',
          text: String.raw`Dans un repère orthonormé $(O;\vec{\imath},\vec{\jmath})$, on considère les points $A(-1;1)$, $B(3;-1)$ et $C(2;4)$.
1. Calculer $\overrightarrow{AB}\cdot\overrightarrow{AC}$, puis les longueurs $AB$, $AC$ et $BC$.
2. Vérifier la cohérence de ces résultats avec la formule d’Al-Kashi.
3. Déterminer une valeur approchée au dixième de degré des trois angles du triangle.
4. Soit $H$ le projeté orthogonal de $C$ sur $(AB)$.
 a. Justifier que $\overrightarrow{AB}\cdot\overrightarrow{AC}=\overrightarrow{AB}\cdot\overrightarrow{AH}$ et en déduire la longueur $AH$.
 b. Justifier que $\overrightarrow{AH}=k\,\overrightarrow{AB}$ avec $k=\dfrac{\overrightarrow{AB}\cdot\overrightarrow{AC}}{AB^2}$ et en déduire les coordonnées de $H$.
 c. Calculer $CH$ puis l’aire du triangle $ABC$.`,
        },
      ],
      hints: [
        'Pour l’angle en $B$, utiliser $\\overrightarrow{BA}$ et $\\overrightarrow{BC}$.',
        '$H$ est sur $(AB)$ donc $\\overrightarrow{AH}$ est colinéaire à $\\overrightarrow{AB}$ ; $\\overrightarrow{AB}\\cdot\\overrightarrow{AH}=k\\,AB^2$.',
        'Aire $=\\frac{1}{2}\\times AB\\times CH$.',
      ],
      solution: [
        {
          type: 'p',
          text: String.raw`1. $\overrightarrow{AB}\begin{pmatrix}4\\-2\end{pmatrix}$, $\overrightarrow{AC}\begin{pmatrix}3\\3\end{pmatrix}$, $\overrightarrow{BC}\begin{pmatrix}-1\\5\end{pmatrix}$.
$\overrightarrow{AB}\cdot\overrightarrow{AC}=12-6=6$ ; $AB=\sqrt{20}=2\sqrt5$ ; $AC=\sqrt{18}=3\sqrt2$ ; $BC=\sqrt{26}$.
2. Al-Kashi : $BC^2=AB^2+AC^2-2\,\overrightarrow{AB}\cdot\overrightarrow{AC}=20+18-12=26$. ✔
3. $\cos\widehat{A}=\dfrac{6}{2\sqrt5\times3\sqrt2}=\dfrac{1}{\sqrt{10}}$, d’où $\widehat{A}\approx71{,}6^\circ$.
$\overrightarrow{BA}\begin{pmatrix}-4\\2\end{pmatrix}$ : $\overrightarrow{BA}\cdot\overrightarrow{BC}=4+10=14$ et $\cos\widehat{B}=\dfrac{14}{\sqrt{20}\sqrt{26}}=\dfrac{14}{\sqrt{520}}$, d’où $\widehat{B}\approx52{,}1^\circ$.
$\widehat{C}\approx180-71{,}6-52{,}1=56{,}3^\circ$ (on vérifie avec $\overrightarrow{CA}\cdot\overrightarrow{CB}=3+15=12$, $\cos\widehat{C}=\frac{12}{\sqrt{18}\sqrt{26}}\approx0{,}555$).
4. a. Propriété de la projection : $\overrightarrow{AC}=\overrightarrow{AH}+\overrightarrow{HC}$ et $\overrightarrow{AB}\cdot\overrightarrow{HC}=0$. Comme $\widehat{A}$ est aigu, $\overrightarrow{AH}$ et $\overrightarrow{AB}$ ont le même sens : $6=AB\times AH$, donc $AH=\dfrac{6}{2\sqrt5}=\dfrac{3}{\sqrt5}=\dfrac{3\sqrt5}{5}$.
b. $\overrightarrow{AH}=k\overrightarrow{AB}$ donc $\overrightarrow{AB}\cdot\overrightarrow{AH}=k\,AB^2=6$, soit $k=\dfrac{6}{20}=0{,}3$. Ainsi $\overrightarrow{AH}\begin{pmatrix}1{,}2\\-0{,}6\end{pmatrix}$ et $H(0{,}2;0{,}4)$.
c. $\overrightarrow{CH}\begin{pmatrix}-1{,}8\\-3{,}6\end{pmatrix}$ (on vérifie $\overrightarrow{CH}\cdot\overrightarrow{AB}=-7{,}2+7{,}2=0$), $CH=\sqrt{3{,}24+12{,}96}=\sqrt{16{,}2}=\dfrac{9}{\sqrt5}$.
Aire $=\dfrac{1}{2}\times2\sqrt5\times\dfrac{9}{\sqrt5}=9$ unités d’aire.`,
        },
      ],
    },
    {
      id: 'ps-python',
      title: 'Python : produit scalaire, angle et orthogonalité',
      difficulty: 2,
      duration: 20,
      tags: ['Python', 'algorithmique'],
      statement: [
        {
          type: 'p',
          text: 'On représente un vecteur du plan (en base orthonormée) par un tuple Python de deux nombres, par exemple u = (3, -2).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire une fonction `prod_scal(u, v)` qui renvoie le produit scalaire de u et v.',
            'Écrire une fonction `norme(u)` (on pourra utiliser `sqrt` du module `math`).',
            'Écrire une fonction `angle_deg(u, v)` qui renvoie l’angle géométrique entre deux vecteurs non nuls, en degrés.',
            'Écrire une fonction `orthogonaux(u, v)` qui renvoie True si les vecteurs sont orthogonaux. Pourquoi est-il prudent de ne pas tester l’égalité exacte à 0 avec des flottants ?',
            'Que renvoie `angle_deg((3, -2), (4, 5))` ?',
          ],
        },
      ],
      hints: ['`math.acos` renvoie un angle en radians ; `math.degrees` le convertit.', 'Tester `abs(p) < 1e-9` plutôt que `p == 0`.'],
      solution: [
        py(String.raw`
from math import sqrt, acos, degrees

def prod_scal(u, v):
    return u[0] * v[0] + u[1] * v[1]

def norme(u):
    return sqrt(prod_scal(u, u))      # ||u||² = u.u

def angle_deg(u, v):
    c = prod_scal(u, v) / (norme(u) * norme(v))
    c = max(-1.0, min(1.0, c))        # protège acos des arrondis (ex. 1.0000000002)
    return degrees(acos(c))

def orthogonaux(u, v, eps=1e-9):
    return abs(prod_scal(u, v)) < eps

print(prod_scal((3, -2), (4, 5)))     # 2
print(angle_deg((3, -2), (4, 5)))     # 85.03...
print(orthogonaux((3, -2), (2, 3)))   # True
`),
        {
          type: 'p',
          text: String.raw`La norme s’obtient avec $\|\vec{u}\|=\sqrt{\vec{u}\cdot\vec{u}}$. Les flottants sont stockés de façon approchée (par exemple $0{,}1\times3$ n’est pas exactement $0{,}3$), donc un produit scalaire théoriquement nul peut valoir $10^{-17}$ : on teste $|p|<\varepsilon$. On obtient $\texttt{angle\_deg((3,-2),(4,5))}\approx85{,}03$, conformément à l’exercice 1.`,
        },
      ],
    },
  ],

  // =====================================================================
  // REPRÉSENTATIONS
  // =====================================================================
  representations: [
    {
      type: 'widget',
      id: 'scalar-product',
      title: 'Explorer le produit scalaire',
      props: { u: [4, 1], v: [1, 3] },
      caption: 'Déplacez les extrémités : observez que les trois formules (cosinus, projection, coordonnées) donnent toujours le même nombre.',
    },
    {
      type: 'widget',
      id: 'scalar-product',
      title: 'Angle obtus : produit scalaire négatif',
      props: { u: [4, 0], v: [-2, 3] },
      caption: 'Le projeté de l’extrémité de v tombe « derrière » l’origine : le produit scalaire est négatif. Cherchez une position où il s’annule.',
    },
    { type: 'svg', svg: svgProjection, maxWidth: 660, caption: 'Projection orthogonale : le signe dépend du sens de AH par rapport à AB.' },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Cosinus', text: '$\\vec{u}\\cdot\\vec{v}=\\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\cos\\theta$', icon: 'Compass' },
        { title: 'Projection', text: '$\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=\\pm AB\\times AH$', icon: 'ArrowDownToLine' },
        { title: 'Coordonnées', text: '$\\vec{u}\\cdot\\vec{v}=xx\'+yy\'$', icon: 'Grid3x3' },
        { title: 'Polarisation', text: '$\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=\\frac{1}{2}(AB^2+AC^2-BC^2)$', icon: 'Ruler' },
      ],
    },
    { type: 'svg', svg: svgCercle, maxWidth: 460, caption: 'Ensemble des points M tels que MA · MB = 0 : le cercle de diamètre [AB].' },
    {
      type: 'qcm',
      questions: [
        {
          question: String.raw`$\|\vec{u}\|=2$, $\|\vec{v}\|=5$ et $(\vec{u},\vec{v})=\frac{2\pi}{3}$. Alors $\vec{u}\cdot\vec{v}$ vaut :`,
          choices: ['$5$', '$-5$', '$5\\sqrt3$', '$-10$'],
          answer: 1,
          explanation: String.raw`$2\times5\times\cos\frac{2\pi}{3}=10\times\left(-\frac{1}{2}\right)=-5$.`,
        },
        {
          question: String.raw`En repère orthonormé, $\vec{u}\begin{pmatrix}2\\-3\end{pmatrix}\cdot\vec{v}\begin{pmatrix}6\\4\end{pmatrix}=$`,
          choices: ['$0$', '$24$', '$-12$', '$12$'],
          answer: 0,
          explanation: '$12-12=0$ : les vecteurs sont orthogonaux.',
        },
        {
          question: String.raw`$ABCD$ est un carré de côté $3$. $\overrightarrow{AB}\cdot\overrightarrow{AC}=$`,
          choices: ['$9\\sqrt2$', '$9$', '$3\\sqrt2$', '$0$'],
          answer: 1,
          explanation: 'Le projeté de $C$ sur $(AB)$ est $B$ : $AB^2=9$.',
        },
        {
          question: String.raw`$AB=3$, $AC=4$, $BC=6$. $\overrightarrow{AB}\cdot\overrightarrow{AC}=$`,
          choices: ['$-5{,}5$', '$5{,}5$', '$11$', '$-11$'],
          answer: 0,
          explanation: String.raw`$\frac{1}{2}(9+16-36)=-\frac{11}{2}$ : l’angle $\widehat{A}$ est obtus.`,
        },
        {
          question: String.raw`$\|\vec{u}+\vec{v}\|^2$ est égal à :`,
          choices: [
            String.raw`$\|\vec{u}\|^2+\|\vec{v}\|^2$`,
            String.raw`$\|\vec{u}\|^2+2\,\vec{u}\cdot\vec{v}+\|\vec{v}\|^2$`,
            String.raw`$(\|\vec{u}\|+\|\vec{v}\|)^2$`,
            String.raw`$\|\vec{u}\|^2-2\,\vec{u}\cdot\vec{v}+\|\vec{v}\|^2$`,
          ],
          answer: 1,
        },
        {
          question: String.raw`Dans un triangle, $b=4$, $c=5$ et $\widehat{A}=90^\circ$. Alors $a^2=$`,
          choices: ['$41$', '$21$', '$9$', '$1$'],
          answer: 0,
          explanation: 'Al-Kashi avec $\\cos 90^\\circ=0$ : c’est Pythagore, $16+25=41$.',
        },
        {
          question: String.raw`$AB=4$, $I$ milieu de $[AB]$. L’ensemble des $M$ tels que $\overrightarrow{MA}\cdot\overrightarrow{MB}=0$ est :`,
          choices: ['la médiatrice de $[AB]$', 'le cercle de centre $I$ de rayon $4$', 'le cercle de centre $I$ de rayon $2$', 'le point $I$'],
          answer: 2,
          explanation: 'C’est le cercle de diamètre $[AB]$, de rayon $\\frac{AB}{2}=2$.',
        },
        {
          question: String.raw`$AB=6$, $I$ milieu de $[AB]$, $MI=5$. Alors $MA^2+MB^2=$`,
          choices: ['$68$', '$59$', '$50$', '$34$'],
          answer: 0,
          explanation: '$2\\times25+\\frac{36}{2}=50+18=68$.',
        },
        {
          question: String.raw`Si $\vec{u}\cdot\vec{v}<0$, l’angle géométrique entre $\vec{u}$ et $\vec{v}$ est :`,
          choices: ['aigu', 'droit', 'obtus', 'on ne peut rien dire'],
          answer: 2,
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Définition de $\\vec{u}\\cdot\\vec{v}$ avec le cosinus', back: '$\\|\\vec{u}\\|\\times\\|\\vec{v}\\|\\times\\cos(\\vec{u},\\vec{v})$ (et $0$ si un vecteur est nul).' },
        { front: '$\\vec{u}\\cdot\\vec{u}$', back: '$\\|\\vec{u}\\|^2$ (carré scalaire). $\\overrightarrow{AB}^{\\,2}=AB^2$.' },
        { front: 'Produit scalaire en coordonnées (base orthonormée)', back: "$xx'+yy'$" },
        { front: 'Formule de projection', back: '$\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=\\overrightarrow{AB}\\cdot\\overrightarrow{AH}$, $H$ projeté orthogonal de $C$ sur $(AB)$.' },
        { front: 'Polarisation avec trois points', back: '$\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=\\frac{1}{2}(AB^2+AC^2-BC^2)$' },
        { front: '$(\\vec{u}+\\vec{v})\\cdot(\\vec{u}-\\vec{v})$', back: '$\\|\\vec{u}\\|^2-\\|\\vec{v}\\|^2$' },
        { front: 'Condition d’orthogonalité', back: '$\\vec{u}\\cdot\\vec{v}=0$ ; en coordonnées $xx\'+yy\'=0$.' },
        { front: 'Formule d’Al-Kashi', back: '$a^2=b^2+c^2-2bc\\cos\\widehat{A}$' },
        { front: 'Cosinus d’un angle à partir des côtés', back: '$\\cos\\widehat{A}=\\dfrac{b^2+c^2-a^2}{2bc}$' },
        { front: 'Théorème de la médiane (somme)', back: '$MA^2+MB^2=2MI^2+\\frac{AB^2}{2}$' },
        { front: 'Théorème de la médiane (produit)', back: '$\\overrightarrow{MA}\\cdot\\overrightarrow{MB}=MI^2-\\frac{AB^2}{4}$' },
        { front: 'Ensemble des $M$ tels que $\\overrightarrow{MA}\\cdot\\overrightarrow{MB}=0$', back: 'Le cercle de diamètre $[AB]$.' },
        { front: 'Ensemble des $M$ tels que $\\overrightarrow{AB}\\cdot\\overrightarrow{AM}=k$', back: 'Une droite perpendiculaire à $(AB)$.' },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        {
          text: 'Le produit scalaire de deux vecteurs est un vecteur.',
          answer: false,
          explanation: 'C’est un nombre réel.',
        },
        {
          text: String.raw`Si $\vec{u}\cdot\vec{v}=\vec{u}\cdot\vec{w}$ avec $\vec{u}\neq\vec{0}$, alors $\vec{v}=\vec{w}$.`,
          answer: false,
          explanation: String.raw`On a seulement $\vec{u}\cdot(\vec{v}-\vec{w})=0$ : $\vec{v}-\vec{w}$ est orthogonal à $\vec{u}$, pas forcément nul.`,
        },
        {
          text: String.raw`$\|\vec{u}+\vec{v}\|=\|\vec{u}\|+\|\vec{v}\|$ pour tous vecteurs.`,
          answer: false,
          explanation: 'Vrai seulement si les vecteurs sont colinéaires de même sens (ou si l’un est nul).',
        },
        {
          text: String.raw`$\vec{u}\perp\vec{v}\iff\|\vec{u}+\vec{v}\|^2=\|\vec{u}\|^2+\|\vec{v}\|^2$.`,
          answer: true,
          explanation: 'C’est le théorème de Pythagore vectoriel : le double produit $2\\vec{u}\\cdot\\vec{v}$ est nul.',
        },
        {
          text: String.raw`$(-2\vec{u})\cdot(3\vec{v})=-6\,\vec{u}\cdot\vec{v}$.`,
          answer: true,
          explanation: 'Bilinéarité.',
        },
        {
          text: 'Dans un triangle de côtés 5, 6 et 9, le plus grand angle est obtus.',
          answer: true,
          explanation: '$81>25+36=61$ donc $\\cos<0$.',
        },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque situation à la bonne méthode',
      pairs: [
        { left: 'On connaît $AB$, $AC$ et $\\widehat{BAC}$', right: 'Définition avec le cosinus' },
        { left: 'Figure : carré, rectangle, hauteur', right: 'Projection orthogonale' },
        { left: 'Repère orthonormé donné', right: "$xx'+yy'$" },
        { left: 'On ne connaît que les trois côtés', right: 'Polarisation / Al-Kashi' },
        { left: 'Longueur d’une médiane', right: 'Théorème de la médiane' },
        { left: 'Montrer que deux droites sont perpendiculaires', right: 'Produit scalaire nul' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter le raisonnement',
      text: 'Pour montrer que deux vecteurs sont orthogonaux, on montre que leur produit scalaire est {{nul|égal à 0|0}}. Dans un triangle ABC, la formule d’Al-Kashi généralise le théorème de {{Pythagore}}. Si $\\cos\\widehat{A}<0$, l’angle $\\widehat{A}$ est {{obtus}}. L’ensemble des points M tels que $\\overrightarrow{MA}\\cdot\\overrightarrow{MB}=0$ est le {{cercle}} de diamètre [AB]. Le théorème de la médiane fait intervenir le {{milieu}} I du segment [AB].',
    },
  ],
}

export default chapter
