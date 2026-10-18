import type { Block, Chapter } from '../types'

// ---------------------------------------------------------------------------
// Aides SVG : repère orthonormé, droites, cercles, vecteurs (coordonnées mathématiques)
// ---------------------------------------------------------------------------
const BLUE = 'hsl(217 91% 60%)'
const RED = 'hsl(0 84% 60%)'
const GREEN = 'hsl(142 71% 45%)'
const ORANGE = 'hsl(25 95% 53%)'
const VIOLET = 'hsl(263 70% 60%)'

const COLS: Record<string, string> = { ink: 'currentColor', blue: BLUE, red: RED, green: GREEN, orange: ORANGE, violet: VIOLET }

interface FrameOpts {
  id: string
  xmin: number
  xmax: number
  ymin: number
  ymax: number
  u: number
}

/** Construit un repère : renvoie les fonctions de conversion et des générateurs d'éléments. */
const frame = (f: FrameOpts) => {
  const pad = 18
  const W = (f.xmax - f.xmin) * f.u + 2 * pad
  const H = (f.ymax - f.ymin) * f.u + 2 * pad
  const X = (x: number) => +(pad + (x - f.xmin) * f.u).toFixed(1)
  const Y = (y: number) => +(pad + (f.ymax - y) * f.u).toFixed(1)
  const r1 = (v: number) => +v.toFixed(1)

  const defs =
    `<defs><clipPath id="${f.id}-clip"><rect x="${X(f.xmin)}" y="${Y(f.ymax)}" width="${r1((f.xmax - f.xmin) * f.u)}" height="${r1((f.ymax - f.ymin) * f.u)}"/></clipPath>` +
    Object.entries(COLS)
      .map(
        ([n, c]) =>
          `<marker id="${f.id}-${n}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${c}"/></marker>`,
      )
      .join('') +
    `</defs>`

  let grid = ''
  for (let x = Math.ceil(f.xmin); x <= f.xmax; x++) {
    grid += `<line x1="${X(x)}" y1="${Y(f.ymin)}" x2="${X(x)}" y2="${Y(f.ymax)}" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>`
    if (x !== 0) grid += `<text x="${X(x) - 3}" y="${Y(0) + 13}" font-size="10" fill="currentColor" opacity="0.55">${x}</text>`
  }
  for (let y = Math.ceil(f.ymin); y <= f.ymax; y++) {
    grid += `<line x1="${X(f.xmin)}" y1="${Y(y)}" x2="${X(f.xmax)}" y2="${Y(y)}" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>`
    if (y !== 0) grid += `<text x="${X(0) - 14}" y="${Y(y) + 4}" font-size="10" fill="currentColor" opacity="0.55">${y}</text>`
  }
  grid += `<line x1="${X(f.xmin)}" y1="${Y(0)}" x2="${X(f.xmax) + 8}" y2="${Y(0)}" stroke="currentColor" stroke-width="1" marker-end="url(#${f.id}-ink)"/>`
  grid += `<line x1="${X(0)}" y1="${Y(f.ymin)}" x2="${X(0)}" y2="${Y(f.ymax) - 8}" stroke="currentColor" stroke-width="1" marker-end="url(#${f.id}-ink)"/>`
  grid += `<text x="${X(0) - 12}" y="${Y(0) + 13}" font-size="11" fill="currentColor">O</text>`

  const open = `<svg viewBox="0 0 ${r1(W + 10)} ${r1(H)}" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif">${defs}${grid}`

  /** Droite d'équation ax + by + c = 0, découpée au cadre. */
  const line = (a: number, b: number, c: number, col: string, w = 1.8, dash = '') => {
    let p1: [number, number]
    let p2: [number, number]
    if (Math.abs(b) > 1e-12) {
      p1 = [f.xmin - 1, (-c - a * (f.xmin - 1)) / b]
      p2 = [f.xmax + 1, (-c - a * (f.xmax + 1)) / b]
    } else {
      p1 = [-c / a, f.ymin - 1]
      p2 = [-c / a, f.ymax + 1]
    }
    return `<line x1="${X(p1[0])}" y1="${Y(p1[1])}" x2="${X(p2[0])}" y2="${Y(p2[1])}" stroke="${col}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''} clip-path="url(#${f.id}-clip)"/>`
  }
  const seg = (x1: number, y1: number, x2: number, y2: number, col = 'currentColor', w = 1.4, dash = '') =>
    `<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" stroke="${col}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''} clip-path="url(#${f.id}-clip)"/>`
  const vec = (x1: number, y1: number, x2: number, y2: number, colName: string, w = 2.2) =>
    `<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" stroke="${COLS[colName]}" stroke-width="${w}" marker-end="url(#${f.id}-${colName})"/>`
  const circle = (cx: number, cy: number, r: number, col: string, w = 1.8) =>
    `<circle cx="${X(cx)}" cy="${Y(cy)}" r="${r1(r * f.u)}" fill="none" stroke="${col}" stroke-width="${w}" clip-path="url(#${f.id}-clip)"/>`
  const curve = (fn: (x: number) => number, x1: number, x2: number, col: string, w = 2) => {
    const pts: string[] = []
    const n = 120
    for (let i = 0; i <= n; i++) {
      const x = x1 + ((x2 - x1) * i) / n
      pts.push(`${X(x)},${Y(fn(x))}`)
    }
    return `<polyline points="${pts.join(' ')}" fill="none" stroke="${col}" stroke-width="${w}" clip-path="url(#${f.id}-clip)"/>`
  }
  const pt = (x: number, y: number, label: string, dx = 6, dy = -6, col = 'currentColor') =>
    `<circle cx="${X(x)}" cy="${Y(y)}" r="3.2" fill="${col}"/><text x="${r1(X(x) + dx)}" y="${r1(Y(y) + dy)}" font-size="13" fill="${col}">${label}</text>`
  const text = (x: number, y: number, t: string, col = 'currentColor', size = 12, extra = '') =>
    `<text x="${X(x)}" y="${Y(y)}" font-size="${size}" fill="${col}"${extra}>${t}</text>`
  /** Équerre au point (px;py) entre les directions d1 et d2 (vecteurs quelconques). */
  const ra = (px: number, py: number, d1: [number, number], d2: [number, number], s = 0.32, col = 'currentColor') => {
    const n1 = Math.hypot(d1[0], d1[1])
    const n2 = Math.hypot(d2[0], d2[1])
    const a: [number, number] = [px + (s * d1[0]) / n1, py + (s * d1[1]) / n1]
    const b: [number, number] = [a[0] + (s * d2[0]) / n2, a[1] + (s * d2[1]) / n2]
    const c: [number, number] = [px + (s * d2[0]) / n2, py + (s * d2[1]) / n2]
    return `<path d="M${X(a[0])} ${Y(a[1])} L${X(b[0])} ${Y(b[1])} L${X(c[0])} ${Y(c[1])}" fill="none" stroke="${col}" stroke-width="1.2"/>`
  }
  /** Nom de vecteur avec flèche au-dessus. */
  const vlab = (x: number, y: number, t: string, col = 'currentColor', size = 14) => {
    const w = t.length * size * 0.55 + 2
    return `<text x="${X(x)}" y="${Y(y)}" font-size="${size}" font-style="italic" fill="${col}">${t}</text><path d="M${X(x)} ${r1(Y(y) - size + 1)} h${w.toFixed(1)} m-3 -2.5 l3 2.5 l-3 2.5" fill="none" stroke="${col}" stroke-width="1"/>`
  }
  return { open, close: '</svg>', X, Y, line, seg, vec, circle, curve, pt, text, ra, vlab }
}

// --- Figure 1 : droite, vecteur directeur, vecteur normal
const svgDroite = (() => {
  const g = frame({ id: 'gr1', xmin: -4, xmax: 5, ymin: -3, ymax: 4, u: 34 })
  return (
    g.open +
    g.line(1, -2, 2, 'currentColor', 2) +
    g.ra(0, 1, [2, 1], [1, -2], 0.35, RED) +
    g.vec(0, 1, 2, 2, 'blue') +
    g.vec(0, 1, 1, -1, 'red') +
    g.pt(0, 1, 'A', -16, -6) +
    g.vlab(1.6, 2.5, 'u', BLUE) +
    g.text(2.05, 2.5, '(2 ; 1) directeur', BLUE, 12) +
    g.vlab(1.2, -1.1, 'n', RED) +
    g.text(1.6, -1.1, '(1 ; −2) normal', RED, 12) +
    g.text(-3.8, 3.5, 'd : x − 2y + 2 = 0', 'currentColor', 13, ' font-weight="600"') +
    g.close
  )
})()

// --- Figure 2 : cercle de centre Ω et de rayon r
const svgCercle = (() => {
  const g = frame({ id: 'gr2', xmin: -3, xmax: 5, ymin: -2, ymax: 4, u: 36 })
  return (
    g.open +
    g.circle(1, 1, Math.sqrt(5), BLUE, 2) +
    g.seg(1, 1, 2, 3, VIOLET, 2) +
    g.pt(1, 1, 'Ω(1 ; 1)', 6, 16) +
    g.pt(2, 3, 'M(x ; y)', 8, -4) +
    g.text(1.05, 2.2, 'r = √5', VIOLET, 12) +
    g.text(-2.9, 3.6, '(x − 1)² + (y − 1)² = 5', 'currentColor', 13, ' font-weight="600"') +
    g.close
  )
})()

// --- Figure 3 : cercle de diamètre [AB]
const svgDiametre = (() => {
  const g = frame({ id: 'gr3', xmin: -4, xmax: 6, ymin: -1, ymax: 7, u: 30 })
  return (
    g.open +
    g.circle(1, 3, Math.sqrt(13), BLUE, 2) +
    g.seg(-2, 1, 4, 5, 'currentColor', 1.2, '5 4') +
    g.seg(3, 6, -2, 1, ORANGE, 1.6) +
    g.seg(3, 6, 4, 5, ORANGE, 1.6) +
    g.ra(3, 6, [-1, -1], [1, -1], 0.35, RED) +
    g.pt(-2, 1, 'A', -16, 4) +
    g.pt(4, 5, 'B', 8, 6) +
    g.pt(1, 3, 'I', -4, 18) +
    g.pt(3, 6, 'M', 6, -8) +
    g.text(-3.9, 6.6, 'MA · MB = 0', 'currentColor', 13, ' font-weight="600"') +
    g.close
  )
})()

// --- Figure 4 : positions relatives droite / cercle (schéma)
const svgPositions = `<svg viewBox="0 0 540 230" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif">
<g>
<circle cx="90" cy="120" r="50" fill="none" stroke="${BLUE}" stroke-width="1.8"/>
<line x1="15" y1="95" x2="165" y2="95" stroke="currentColor" stroke-width="1.6"/>
<line x1="90" y1="120" x2="90" y2="95" stroke="${ORANGE}" stroke-width="1.2" stroke-dasharray="4 3"/>
<circle cx="90" cy="120" r="2.5" fill="currentColor"/>
<circle cx="46.7" cy="95" r="3.2" fill="${RED}"/><circle cx="133.3" cy="95" r="3.2" fill="${RED}"/>
<text x="20" y="200" font-size="12" fill="currentColor">d &lt; r : 2 points</text>
<text x="20" y="218" font-size="11" fill="currentColor" opacity="0.7">Δ &gt; 0 (sécante)</text>
</g>
<g>
<circle cx="270" cy="120" r="50" fill="none" stroke="${BLUE}" stroke-width="1.8"/>
<line x1="195" y1="70" x2="345" y2="70" stroke="currentColor" stroke-width="1.6"/>
<line x1="270" y1="120" x2="270" y2="70" stroke="${ORANGE}" stroke-width="1.2" stroke-dasharray="4 3"/>
<path d="M270 80 H280 V70" fill="none" stroke="currentColor" stroke-width="1"/>
<circle cx="270" cy="120" r="2.5" fill="currentColor"/>
<circle cx="270" cy="70" r="3.2" fill="${RED}"/>
<text x="200" y="200" font-size="12" fill="currentColor">d = r : 1 point</text>
<text x="200" y="218" font-size="11" fill="currentColor" opacity="0.7">Δ = 0 (tangente)</text>
</g>
<g>
<circle cx="450" cy="120" r="50" fill="none" stroke="${BLUE}" stroke-width="1.8"/>
<line x1="375" y1="45" x2="525" y2="45" stroke="currentColor" stroke-width="1.6"/>
<line x1="450" y1="120" x2="450" y2="45" stroke="${ORANGE}" stroke-width="1.2" stroke-dasharray="4 3"/>
<circle cx="450" cy="120" r="2.5" fill="currentColor"/>
<text x="385" y="200" font-size="12" fill="currentColor">d &gt; r : aucun point</text>
<text x="385" y="218" font-size="11" fill="currentColor" opacity="0.7">Δ &lt; 0 (extérieure)</text>
</g>
<text x="20" y="20" font-size="12" fill="${ORANGE}">d = distance du centre à la droite</text>
</svg>`

// --- Figure 5 : parabole y = x² − 2x − 3
const svgParabole = (() => {
  const g = frame({ id: 'gr5', xmin: -3, xmax: 5, ymin: -5, ymax: 6, u: 28 })
  const f = (x: number) => x * x - 2 * x - 3
  return (
    g.open +
    g.seg(1, -5, 1, 6, ORANGE, 1.4, '6 4') +
    g.curve(f, -2.5, 4.5, BLUE, 2.2) +
    g.seg(0, -3, 2, -3, 'currentColor', 1, '3 3') +
    g.pt(1, -4, 'S(1 ; −4)', 8, 6, RED) +
    g.pt(-1, 0, '−1', -16, -6) +
    g.pt(3, 0, '3', 6, -6) +
    g.pt(0, -3, '', 0, 0) +
    g.pt(2, -3, '', 0, 0) +
    g.text(1.15, 5.4, 'axe : x = 1', ORANGE, 12) +
    g.text(-2.9, 5.4, 'y = x² − 2x − 3', BLUE, 13, ' font-weight="600"') +
    g.close
  )
})()

// --- Figure 6 : projeté orthogonal d'un point sur une droite
const svgProjete = (() => {
  const g = frame({ id: 'gr6', xmin: -2, xmax: 7, ymin: -2, ymax: 5, u: 32 })
  return (
    g.open +
    g.line(1, 2, -3, 'currentColor', 2) +
    g.seg(5, 4, 3, 0, RED, 1.6, '5 4') +
    g.ra(3, 0, [-2, 1], [1, 2], 0.35, RED) +
    g.vec(-1, 2, 0, 4, 'blue') +
    g.vlab(-1.05, 3.7, 'n', BLUE) +
    g.text(-0.55, 3.7, '(1 ; 2)', BLUE, 12) +
    g.pt(5, 4, 'A(5 ; 4)', 8, -4) +
    g.pt(3, 0, 'H(3 ; 0)', 8, 16, RED) +
    g.pt(-1, 2, '', 0, 0) +
    g.text(3.4, 4.6, 'd : x + 2y − 3 = 0', 'currentColor', 13, ' font-weight="600"') +
    g.text(4.15, 1.9, 'AH = 2√5', RED, 12) +
    g.close
  )
})()

// --- Figure 7 : tangente à un cercle
const svgTangente = (() => {
  const g = frame({ id: 'gr7', xmin: -4, xmax: 4, ymin: -1, ymax: 6, u: 34 })
  return (
    g.open +
    g.circle(-1, 2, Math.sqrt(5), BLUE, 2) +
    g.line(1, 2, -8, GREEN, 2) +
    g.vec(-1, 2, 0, 4, 'violet') +
    g.ra(0, 4, [2, -1], [-1, -2], 0.32, RED) +
    g.pt(-1, 2, 'Ω', -16, 14) +
    g.pt(0, 4, 'A(0 ; 4)', 6, -8) +
    g.text(1.5, 3.8, 'T : x + 2y − 8 = 0', GREEN, 12, ' font-weight="600"') +
    g.text(-3.9, 5.6, '(x + 1)² + (y − 2)² = 5', BLUE, 12) +
    g.close
  )
})()

const py = (code: string, caption?: string): Block => ({
  type: 'code',
  lang: 'python',
  code: code.replace(/^\n/, '').replace(/\n\s*$/, ''),
  ...(caption ? { caption } : {}),
})

const chapter: Chapter = {
  id: 'geometrie-reperee',
  subject: 'maths',
  order: 8,
  title: 'Géométrie repérée',
  theme: 'Géométrie',
  summary:
    'Vecteur normal et équation cartésienne d’une droite, équations de cercles, intersections droite/cercle, parabole y = ax² + bx + c et projeté orthogonal d’un point sur une droite.',
  duration: '3 semaines',
  objectives: [
    'Déterminer une équation cartésienne d’une droite connaissant un point et un vecteur normal (ou directeur).',
    'Déterminer les coordonnées du projeté orthogonal d’un point sur une droite.',
    'Déterminer et utiliser l’équation d’un cercle donné par son centre et son rayon, ou par un diamètre.',
    'Reconnaître une équation de cercle, déterminer centre et rayon (mise sous forme canonique).',
    'Déterminer l’intersection d’une droite et d’un cercle.',
    'Déterminer l’axe de symétrie et le sommet d’une parabole d’équation $y=ax^2+bx+c$.',
  ],
  keywords: [
    'vecteur normal',
    'vecteur directeur',
    'équation cartésienne',
    'cercle',
    'tangente',
    'projeté orthogonal',
    'distance',
    'parabole',
    'sommet',
    'axe de symétrie',
  ],

  // =====================================================================
  // FICHE
  // =====================================================================
  fiche: [
    { type: 'p', text: 'Tout le chapitre se place dans un **repère orthonormé** $(O;\\vec{\\imath},\\vec{\\jmath})$.' },
    { type: 'h2', text: 'Droites' },
    {
      type: 'table',
      headers: ['Équation $ax+by+c=0$', 'Vecteur', 'Coordonnées'],
      rows: [
        ['vecteur **directeur**', '$\\vec{u}$', '$(-b\\,;\\,a)$'],
        ['vecteur **normal**', '$\\vec{n}$', '$(a\\,;\\,b)$'],
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Droite passant par $A$ de vecteur normal $\\vec{n}(a;b)$',
      content: [
        {
          type: 'p',
          text: String.raw`$M(x;y)\in d\iff\overrightarrow{AM}\cdot\vec{n}=0\iff a(x-x_A)+b(y-y_A)=0$.`,
        },
      ],
    },
    {
      type: 'list',
      items: [
        String.raw`$d\perp d'\iff\vec{n}\cdot\vec{n}'=0\iff aa'+bb'=0$ ; $d\parallel d'\iff\vec{n}$ et $\vec{n}'$ colinéaires $\iff ab'-a'b=0$.`,
        String.raw`**Médiatrice** de $[AB]$ : droite passant par le milieu de $[AB]$, de vecteur normal $\overrightarrow{AB}$.`,
        String.raw`**Projeté orthogonal** $H$ de $A$ sur $d$ : $H=A+t\,\vec{n}$ avec $t$ tel que $H\in d$. Distance : $AH=\dfrac{|ax_A+by_A+c|}{\sqrt{a^2+b^2}}$.`,
      ],
    },
    { type: 'h2', text: 'Cercles' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Équations de cercle',
      content: [
        {
          type: 'list',
          items: [
            String.raw`Centre $\Omega(x_0;y_0)$, rayon $r$ : $(x-x_0)^2+(y-y_0)^2=r^2$.`,
            String.raw`Diamètre $[AB]$ : $\overrightarrow{MA}\cdot\overrightarrow{MB}=0\iff(x-x_A)(x-x_B)+(y-y_A)(y-y_B)=0$.`,
            String.raw`Reconnaître $x^2+y^2+\alpha x+\beta y+\gamma=0$ : **compléter les carrés** $x^2-2px=(x-p)^2-p^2$.`,
            String.raw`**Tangente** en $A$ au cercle de centre $\Omega$ : droite passant par $A$ de vecteur normal $\overrightarrow{\Omega A}$.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Intersection droite / cercle',
      content: [
        {
          type: 'p',
          text: 'On isole $x$ ou $y$ dans l’équation de la droite, on substitue dans celle du cercle : équation du second degré. $\\Delta>0$ : 2 points ; $\\Delta=0$ : tangente ; $\\Delta<0$ : aucun point.',
        },
      ],
    },
    { type: 'h2', text: 'Parabole $y=ax^2+bx+c$ ($a\\neq0$)' },
    {
      type: 'list',
      items: [
        String.raw`Axe de symétrie : la droite $x=\alpha$ avec $\alpha=-\dfrac{b}{2a}$.`,
        String.raw`Sommet $S(\alpha;\beta)$ avec $\beta=f(\alpha)$ ; forme canonique $y=a(x-\alpha)^2+\beta$.`,
        String.raw`Tournée vers le haut si $a>0$ ($S$ = minimum), vers le bas si $a<0$ ($S$ = maximum).`,
      ],
    },
  ],

  // =====================================================================
  // COURS
  // =====================================================================
  cours: [
    {
      type: 'p',
      text: 'En Seconde, on a caractérisé les droites par un vecteur directeur. Le produit scalaire apporte un nouvel outil : le **vecteur normal**. Il permet d’écrire très rapidement des équations de droites perpendiculaires, de cercles, de tangentes, et de calculer des projetés orthogonaux et des distances. Dans tout le chapitre, le plan est muni d’un **repère orthonormé** $(O;\\vec{\\imath},\\vec{\\jmath})$ (indispensable pour utiliser $xx\'+yy\'$).',
    },

    // ---------------- 1. Rappels
    { type: 'h2', text: '1. Rappels : vecteur directeur et équation cartésienne' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Vecteur directeur',
      content: [
        {
          type: 'p',
          text: String.raw`Un **vecteur directeur** d’une droite $d$ est un vecteur non nul $\vec{u}$ dont la direction est celle de $d$ : si $A$ et $B$ sont deux points distincts de $d$, $\overrightarrow{AB}$ est un vecteur directeur.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Équation cartésienne',
      content: [
        {
          type: 'p',
          text: String.raw`Toute droite admet une équation de la forme $ax+by+c=0$ avec $(a;b)\neq(0;0)$. Réciproquement, l’ensemble des points $M(x;y)$ vérifiant une telle équation est une droite, de vecteur directeur $\vec{u}(-b;a)$.`,
        },
      ],
    },
    {
      type: 'p',
      text: String.raw`Rappel : $M\in d$ (passant par $A$, dirigée par $\vec{u}(\alpha;\beta)$) $\iff\overrightarrow{AM}$ et $\vec{u}$ colinéaires $\iff\det(\overrightarrow{AM},\vec{u})=(x-x_A)\beta-(y-y_A)\alpha=0$.`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Une droite a une infinité d’équations',
      content: [
        {
          type: 'p',
          text: '$2x-y+3=0$ et $-4x+2y-6=0$ décrivent la même droite : on peut multiplier une équation cartésienne par n’importe quel réel non nul. On parle donc d’**une** équation cartésienne, pas de « l’ » équation.',
        },
      ],
    },

    // ---------------- 2. Vecteur normal
    { type: 'h2', text: '2. Vecteur normal à une droite' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Vecteur normal',
      content: [
        {
          type: 'p',
          text: String.raw`Un **vecteur normal** à une droite $d$ est un vecteur **non nul** orthogonal à un vecteur directeur de $d$.`,
        },
      ],
    },
    { type: 'svg', svg: svgDroite, maxWidth: 420, caption: 'Pour d : x − 2y + 2 = 0, le vecteur (1 ; −2) est normal et le vecteur (2 ; 1) est directeur.' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Vecteur normal et équation cartésienne',
      content: [
        {
          type: 'list',
          items: [
            String.raw`Si $d$ a pour équation $ax+by+c=0$, alors $\vec{n}(a;b)$ est un vecteur normal à $d$.`,
            String.raw`Réciproquement, la droite passant par $A(x_A;y_A)$ et de vecteur normal $\vec{n}(a;b)$ a pour équation $a(x-x_A)+b(y-y_A)=0$, de la forme $ax+by+c=0$.`,
          ],
        },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration (à connaître)',
      content: [
        {
          type: 'p',
          text: String.raw`1. $\vec{u}(-b;a)$ dirige $d$ et $\vec{n}\cdot\vec{u}=a(-b)+ba=0$ : $\vec{n}$ est normal à $d$.
2. Soit $d$ la droite passant par $A$ de vecteur normal $\vec{n}$. Un point $M$ appartient à $d$ si et seulement si $\overrightarrow{AM}$ est orthogonal à $\vec{n}$ (car $\overrightarrow{AM}$ dirige alors $d$, ou est nul) :
$$M(x;y)\in d\iff\overrightarrow{AM}\cdot\vec{n}=0\iff a(x-x_A)+b(y-y_A)=0\iff ax+by\underbrace{-ax_A-by_A}_{c}=0.$$`,
        },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Identifier un point et un vecteur normal', text: 'Le vecteur normal peut être donné, être un vecteur $\\overrightarrow{AB}$ (hauteur, médiatrice), ou un vecteur directeur d’une droite perpendiculaire.' },
        { title: 'Écrire $ax+by+c=0$', text: 'Les coordonnées de $\\vec{n}$ donnent directement $a$ et $b$.' },
        { title: 'Trouver $c$', text: 'Remplacer $x$ et $y$ par les coordonnées du point connu.' },
        { title: 'Vérifier', text: 'Le point connu vérifie l’équation ; $\\vec{n}$ est bien orthogonal au vecteur directeur $(-b;a)$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        {
          type: 'p',
          text: String.raw`Droite $d$ passant par $A(1;3)$ et de vecteur normal $\vec{n}(2;-5)$ : elle a une équation $2x-5y+c=0$. Comme $A\in d$ : $2-15+c=0$, donc $c=13$.
$d$ : $2x-5y+13=0$, de vecteur directeur $\vec{u}(5;2)$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Droites perpendiculaires, droites parallèles',
      content: [
        {
          type: 'p',
          text: String.raw`Soient $d$ : $ax+by+c=0$ et $d'$ : $a'x+b'y+c'=0$, de vecteurs normaux $\vec{n}(a;b)$ et $\vec{n}'(a';b')$.`,
        },
        {
          type: 'list',
          items: [
            String.raw`$d\perp d'\iff\vec{n}\cdot\vec{n}'=0\iff aa'+bb'=0$ ;`,
            String.raw`$d\parallel d'\iff\vec{n}$ et $\vec{n}'$ colinéaires $\iff ab'-a'b=0$.`,
            String.raw`Un vecteur directeur de $d$ est un vecteur normal de toute perpendiculaire à $d$.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : perpendiculaire passant par un point',
      content: [
        {
          type: 'p',
          text: String.raw`Perpendiculaire $d'$ à $d$ : $2x-5y+13=0$ passant par $B(0;1)$. Le vecteur directeur $\vec{u}(5;2)$ de $d$ est normal à $d'$, d’où $d'$ : $5x+2y+c=0$ ; $B\in d'$ donne $2+c=0$, soit $d'$ : $5x+2y-2=0$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : médiatrice d’un segment',
      content: [
        {
          type: 'p',
          text: String.raw`$A(1;2)$, $B(5;4)$. La médiatrice de $[AB]$ passe par le milieu $K(3;3)$ et a pour vecteur normal $\overrightarrow{AB}(4;2)$ :
$4(x-3)+2(y-3)=0\iff4x+2y-18=0\iff2x+y-9=0$.
*Vérification* par l’équidistance : $MA^2=MB^2\iff(x-1)^2+(y-2)^2=(x-5)^2+(y-4)^2\iff-2x+1-4y+4=-10x+25-8y+16\iff8x+4y-36=0$. ✔`,
        },
      ],
    },

    // ---------------- 3. Projeté orthogonal
    { type: 'h2', text: '3. Projeté orthogonal d’un point sur une droite' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Projeté orthogonal, distance',
      content: [
        {
          type: 'p',
          text: String.raw`Le projeté orthogonal de $A$ sur la droite $d$ est le point $H$ de $d$ tel que $\overrightarrow{AH}$ soit normal à $d$ (ou nul si $A\in d$). La longueur $AH$ est la **distance** du point $A$ à la droite $d$ : c’est la plus courte distance entre $A$ et un point de $d$.`,
        },
      ],
    },
    { type: 'svg', svg: svgProjete, maxWidth: 420, caption: 'H est le pied de la perpendiculaire à d passant par A.' },
    {
      type: 'steps',
      items: [
        {
          title: 'Méthode 1 : suivre le vecteur normal',
          text: 'Comme $\\overrightarrow{AH}$ est colinéaire à $\\vec{n}(a;b)$, on écrit $H(x_A+ta\\,;\\,y_A+tb)$ pour un réel $t$.',
        },
        { title: 'Utiliser $H\\in d$', text: 'On remplace dans l’équation de $d$ : on obtient une équation du premier degré en $t$.' },
        { title: 'Conclure', text: 'On en déduit $t$, puis les coordonnées de $H$ et éventuellement $AH=|t|\\times\\|\\vec{n}\\|$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé',
      content: [
        {
          type: 'p',
          text: String.raw`Projeté $H$ de $A(-1;4)$ sur $d$ : $2x-y+1=0$. Un vecteur normal est $\vec{n}(2;-1)$, donc $H(-1+2t\,;\,4-t)$.
$H\in d\iff2(-1+2t)-(4-t)+1=0\iff5t-5=0\iff t=1$. Donc $H(1;3)$ (vérification : $2-3+1=0$ ✔).
Distance : $AH=|t|\times\|\vec{n}\|=1\times\sqrt{5}=\sqrt5$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Méthode 2 : intersection de deux droites',
      content: [
        {
          type: 'p',
          text: String.raw`On écrit une équation de la perpendiculaire $\Delta$ à $d$ passant par $A$ (son vecteur normal est un vecteur directeur de $d$), puis on résout le système formé par les équations de $d$ et $\Delta$. Dans l’exemple : $\Delta$ a pour vecteur normal $\vec{u}(1;2)$, donc $\Delta$ : $x+2y-7=0$ ; le système $\begin{cases}2x-y+1=0\\x+2y-7=0\end{cases}$ donne $x=1$, $y=3$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Pour aller plus loin : formule de la distance',
      content: [
        {
          type: 'p',
          text: String.raw`La distance du point $A(x_A;y_A)$ à la droite $d$ : $ax+by+c=0$ vaut
$$AH=\frac{|ax_A+by_A+c|}{\sqrt{a^2+b^2}}.$$
*Preuve* : avec $H=A+t\vec{n}$, la condition $H\in d$ donne $ax_A+by_A+c+t(a^2+b^2)=0$, d’où $|t|=\dfrac{|ax_A+by_A+c|}{a^2+b^2}$ et $AH=|t|\sqrt{a^2+b^2}$. Exemple : $\dfrac{|2(-1)-4+1|}{\sqrt5}=\dfrac{5}{\sqrt5}=\sqrt5$. ✔`,
        },
      ],
    },

    // ---------------- 4. Cercles
    { type: 'h2', text: '4. Équations de cercles' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Cercle de centre et de rayon donnés',
      content: [
        {
          type: 'p',
          text: String.raw`Le cercle $\mathcal{C}$ de centre $\Omega(x_0;y_0)$ et de rayon $r>0$ a pour équation`,
        },
        { type: 'math', tex: String.raw`(x-x_0)^2+(y-y_0)^2=r^2` },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration',
      content: [
        {
          type: 'p',
          text: String.raw`$M(x;y)\in\mathcal{C}\iff\Omega M=r\iff\Omega M^2=r^2$ (des longueurs sont positives) $\iff(x-x_0)^2+(y-y_0)^2=r^2$, car le repère est orthonormé.`,
        },
      ],
    },
    { type: 'svg', svg: svgCercle, maxWidth: 400, caption: 'M est sur le cercle si et seulement si ΩM² = r².' },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        {
          type: 'p',
          text: String.raw`Le cercle de centre $\Omega(-2;1)$ et de rayon $3$ a pour équation $(x+2)^2+(y-1)^2=9$, soit en développant $x^2+y^2+4x-2y-4=0$.
Le point $E(1;1)$ est sur ce cercle : $3^2+0^2=9$. Le point $F(0;3)$ n’y est pas : $2^2+2^2=8\neq9$ ($F$ est intérieur au disque).`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Reconnaître une équation de cercle',
      content: [
        {
          type: 'p',
          text: String.raw`Face à $x^2+y^2+\alpha x+\beta y+\gamma=0$, on fait apparaître des carrés avec $x^2+2px=(x+p)^2-p^2$ :
$$x^2+y^2-6x+2y+6=0\iff(x-3)^2-9+(y+1)^2-1+6=0\iff(x-3)^2+(y+1)^2=4.$$
C’est le cercle de centre $(3;-1)$ et de rayon $2$.`,
        },
      ],
    },
    {
      type: 'table',
      headers: ['Après mise en forme $(x-x_0)^2+(y-y_0)^2=k$', 'Ensemble des points'],
      rows: [
        ['$k>0$', 'cercle de centre $\\Omega(x_0;y_0)$ et de rayon $\\sqrt{k}$'],
        ['$k=0$', 'le seul point $\\Omega$'],
        ['$k<0$', 'ensemble vide'],
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
            String.raw`Dans $(x+2)^2$, l’abscisse du centre est $-2$, pas $2$.`,
            String.raw`Le membre de droite est $r^2$ : $(x-1)^2+y^2=9$ a pour rayon $3$, pas $9$.`,
            String.raw`Une équation avec $x^2$ et $y^2$ de coefficients différents (ex. $x^2+2y^2=1$) n’est pas celle d’un cercle.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Cercle de diamètre $[AB]$',
      content: [
        {
          type: 'p',
          text: String.raw`D’après le chapitre précédent, $M$ est sur le cercle de diamètre $[AB]$ si et seulement si $\overrightarrow{MA}\cdot\overrightarrow{MB}=0$, c’est-à-dire`,
        },
        { type: 'math', tex: String.raw`(x-x_A)(x-x_B)+(y-y_A)(y-y_B)=0` },
      ],
    },
    { type: 'svg', svg: svgDiametre, maxWidth: 400, caption: 'Cercle de diamètre [AB] avec A(−2 ; 1) et B(4 ; 5) : le point M(3 ; 6) voit [AB] sous un angle droit.' },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        {
          type: 'p',
          text: String.raw`$A(-2;1)$, $B(4;5)$ : $(x+2)(x-4)+(y-1)(y-5)=0\iff x^2-2x-8+y^2-6y+5=0\iff(x-1)^2+(y-3)^2=13$.
Centre $I(1;3)$ (milieu de $[AB]$), rayon $\sqrt{13}=\frac{AB}{2}$ car $AB=\sqrt{36+16}=2\sqrt{13}$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Tangente à un cercle',
      content: [
        {
          type: 'p',
          text: String.raw`La tangente en un point $A$ au cercle de centre $\Omega$ est la droite passant par $A$ et **perpendiculaire au rayon** $[\Omega A]$ : elle a pour vecteur normal $\overrightarrow{\Omega A}$.`,
        },
      ],
    },
    { type: 'svg', svg: svgTangente, maxWidth: 400, caption: 'Le rayon ΩA est normal à la tangente T en A.' },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        {
          type: 'p',
          text: String.raw`$\mathcal{C}$ : $(x+1)^2+(y-2)^2=5$ et $A(0;4)$ : $1^2+2^2=5$ donc $A\in\mathcal{C}$. $\overrightarrow{\Omega A}(1;2)$ est normal à la tangente $T$ :
$1(x-0)+2(y-4)=0\iff x+2y-8=0$.`,
        },
      ],
    },

    // ---------------- 5. Intersections
    { type: 'h2', text: '5. Intersection d’une droite et d’un cercle' },
    {
      type: 'steps',
      items: [
        { title: 'Isoler une inconnue', text: 'Dans l’équation de la droite, exprimer $y$ en fonction de $x$ (ou l’inverse).' },
        { title: 'Substituer', text: 'Remplacer dans l’équation du cercle : on obtient une équation du second degré.' },
        { title: 'Résoudre', text: 'Calculer $\\Delta$ : deux solutions, une solution double (droite tangente) ou aucune.' },
        { title: 'Conclure', text: 'Calculer l’autre coordonnée de chaque point et vérifier qu’il est sur les deux courbes.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé',
      content: [
        {
          type: 'p',
          text: String.raw`$\mathcal{C}$ : $x^2+y^2=25$ et $d$ : $x+y-1=0$. On a $y=1-x$, donc
$$x^2+(1-x)^2=25\iff2x^2-2x-24=0\iff x^2-x-12=0\iff(x-4)(x+3)=0.$$
Pour $x=4$ : $y=-3$ ; pour $x=-3$ : $y=4$. La droite coupe le cercle en $(4;-3)$ et $(-3;4)$ (vérification : $16+9=25$ ✔).`,
        },
      ],
    },
    { type: 'svg', svg: svgPositions, maxWidth: 560, caption: 'Les trois positions relatives d’une droite et d’un cercle de rayon r.' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Avec la distance au centre',
      content: [
        {
          type: 'p',
          text: String.raw`Si $h$ est la distance du centre $\Omega$ à la droite $d$ : $h<r$ : deux points d’intersection ; $h=r$ : $d$ est tangente au cercle (le point de contact est le projeté de $\Omega$ sur $d$) ; $h>r$ : aucun point commun.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Cas particuliers utiles',
      content: [
        {
          type: 'list',
          items: [
            'Intersection avec l’axe des abscisses : faire $y=0$ ; avec l’axe des ordonnées : $x=0$.',
            'Intersection de deux droites : résoudre un système linéaire de deux équations à deux inconnues.',
            'Intersection d’une droite et d’une parabole : même méthode, on égalise les $y$.',
          ],
        },
      ],
    },

    // ---------------- 6. Parabole
    { type: 'h2', text: '6. Parabole d’équation $y=ax^2+bx+c$' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Axe de symétrie et sommet',
      content: [
        {
          type: 'p',
          text: String.raw`Soit $f(x)=ax^2+bx+c$ avec $a\neq0$, de forme canonique $f(x)=a(x-\alpha)^2+\beta$, où $\alpha=-\dfrac{b}{2a}$ et $\beta=f(\alpha)$. La courbe de $f$ est une **parabole** :`,
        },
        {
          type: 'list',
          items: [
            String.raw`de **sommet** $S(\alpha;\beta)$ ;`,
            String.raw`d’**axe de symétrie** la droite d’équation $x=\alpha$ ;`,
            String.raw`tournée vers le haut si $a>0$ (le sommet est le point le plus bas), vers le bas si $a<0$.`,
          ],
        },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration de la symétrie',
      content: [
        {
          type: 'p',
          text: String.raw`Pour tout réel $h$ : $f(\alpha+h)=ah^2+\beta=a(-h)^2+\beta=f(\alpha-h)$. Les points d’abscisses $\alpha+h$ et $\alpha-h$ ont la même ordonnée : ils sont symétriques par rapport à la droite $x=\alpha$.`,
        },
      ],
    },
    { type: 'svg', svg: svgParabole, maxWidth: 360, caption: 'y = x² − 2x − 3 = (x − 1)² − 4 : sommet S(1 ; −4), axe x = 1. Les points d’ordonnée −3 (x = 0 et x = 2) sont symétriques.' },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        {
          type: 'p',
          text: String.raw`$\mathcal{P}$ : $y=x^2-2x-3$. $\alpha=-\frac{-2}{2}=1$ et $\beta=1-2-3=-4$ : sommet $S(1;-4)$, axe $x=1$.
Intersections avec l’axe des abscisses : $\Delta=4+12=16$, $x_1=\frac{2-4}{2}=-1$, $x_2=\frac{2+4}{2}=3$. Elles sont bien symétriques par rapport à $x=1$ : $\frac{-1+3}{2}=1$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Astuce',
      content: [
        {
          type: 'p',
          text: String.raw`Si la parabole coupe l’axe des abscisses en $x_1$ et $x_2$, l’axe de symétrie est $x=\dfrac{x_1+x_2}{2}$. Plus généralement, deux points de même ordonnée ont leur milieu sur l’axe.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Intersection parabole / droite',
      content: [
        {
          type: 'p',
          text: String.raw`$\mathcal{P}$ : $y=x^2-2x-3$ et $d$ : $y=x-1$. On résout $x^2-2x-3=x-1\iff x^2-3x-2=0$ : $\Delta=9+8=17>0$, deux points d’abscisses $\frac{3\pm\sqrt{17}}{2}$, d’ordonnées $y=x-1=\frac{1\pm\sqrt{17}}{2}$.`,
        },
      ],
    },

    // ---------------- 7. Synthèse
    { type: 'h2', text: '7. Synthèse des méthodes' },
    {
      type: 'table',
      headers: ['Objectif', 'Outil', 'Équation obtenue'],
      rows: [
        ['Droite par $A$, normale à $\\vec{n}(a;b)$', '$\\overrightarrow{AM}\\cdot\\vec{n}=0$', '$a(x-x_A)+b(y-y_A)=0$'],
        ['Hauteur issue de $C$ dans $ABC$', 'normal $\\overrightarrow{AB}$, passe par $C$', '$\\overrightarrow{CM}\\cdot\\overrightarrow{AB}=0$'],
        ['Médiatrice de $[AB]$', 'normal $\\overrightarrow{AB}$, passe par le milieu', '$\\overrightarrow{KM}\\cdot\\overrightarrow{AB}=0$'],
        ['Cercle centre $\\Omega$, rayon $r$', '$\\Omega M^2=r^2$', '$(x-x_0)^2+(y-y_0)^2=r^2$'],
        ['Cercle de diamètre $[AB]$', '$\\overrightarrow{MA}\\cdot\\overrightarrow{MB}=0$', '$(x-x_A)(x-x_B)+(y-y_A)(y-y_B)=0$'],
        ['Tangente en $A$ au cercle', 'normal $\\overrightarrow{\\Omega A}$', '$\\overrightarrow{AM}\\cdot\\overrightarrow{\\Omega A}=0$'],
        ['Projeté de $A$ sur $d$', '$H=A+t\\vec{n}$, $H\\in d$', 'équation en $t$'],
      ],
    },
  ],

  // =====================================================================
  // EXERCICES
  // =====================================================================
  exercices: [
    {
      id: 'gr-normal',
      title: 'Équation à partir d’un vecteur normal',
      difficulty: 1,
      duration: 10,
      tags: ['vecteur normal', 'équation cartésienne'],
      statement: [
        {
          type: 'p',
          text: String.raw`1. Déterminer une équation cartésienne de la droite $d$ passant par $A(2;-1)$ et de vecteur normal $\vec{n}(3;4)$.
2. Donner un vecteur directeur de $d$.
3. Le point $B(-2;2)$ appartient-il à $d$ ?
4. Déterminer une équation de la droite $d'$ perpendiculaire à $d$ passant par l’origine.`,
        },
      ],
      hints: ['$d$ : $3x+4y+c=0$, puis utiliser $A$.', 'Un vecteur directeur de $d$ est normal à $d\'$.'],
      solution: [
        {
          type: 'p',
          text: String.raw`1. $d$ : $3x+4y+c=0$ et $A\in d$ : $6-4+c=0$ donc $c=-2$. $d$ : $3x+4y-2=0$.
2. $\vec{u}(-4;3)$ (de la forme $(-b;a)$) ; on vérifie $\vec{u}\cdot\vec{n}=-12+12=0$.
3. $3\times(-2)+4\times2-2=-6+8-2=0$ : oui, $B\in d$.
4. $\vec{u}(-4;3)$ est normal à $d'$ : $-4x+3y+c'=0$ et $O\in d'$ donne $c'=0$. $d'$ : $-4x+3y=0$, soit $4x-3y=0$.`,
        },
      ],
    },
    {
      id: 'gr-appartenance-cercle',
      title: 'Équation de cercle et appartenance',
      difficulty: 1,
      duration: 10,
      tags: ['cercle'],
      statement: [
        {
          type: 'p',
          text: String.raw`1. Écrire une équation du cercle $\mathcal{C}$ de centre $\Omega(-1;3)$ et de rayon $5$, puis la développer.
2. Les points $A(2;7)$, $B(3;0)$ et $C(4;4)$ appartiennent-ils à $\mathcal{C}$ ?
3. Déterminer les points d’intersection de $\mathcal{C}$ avec l’axe des ordonnées.`,
        },
      ],
      hints: ['Remplacer les coordonnées dans $(x+1)^2+(y-3)^2$.', 'Axe des ordonnées : $x=0$.'],
      solution: [
        {
          type: 'p',
          text: String.raw`1. $\mathcal{C}$ : $(x+1)^2+(y-3)^2=25$, soit $x^2+2x+1+y^2-6y+9=25\iff x^2+y^2+2x-6y-15=0$.
2. $A$ : $3^2+4^2=25$ ✔ ; $B$ : $4^2+(-3)^2=25$ ✔ ; $C$ : $5^2+1^2=26\neq25$ ✘ ($C$ est à l’extérieur du cercle).
3. $x=0$ : $1+(y-3)^2=25\iff(y-3)^2=24\iff y=3\pm2\sqrt6$. Points $(0;3+2\sqrt6)$ et $(0;3-2\sqrt6)$.`,
        },
      ],
    },
    {
      id: 'gr-reconnaitre',
      title: 'Reconnaître une équation de cercle',
      difficulty: 1,
      duration: 12,
      tags: ['cercle', 'forme canonique'],
      statement: [
        {
          type: 'p',
          text: String.raw`Déterminer la nature de l’ensemble des points $M(x;y)$ vérifiant :
1. $x^2+y^2-4x+6y-12=0$ ;
2. $x^2+y^2+2x-4y+6=0$ ;
3. $x^2+y^2-8y+16=0$.`,
        },
      ],
      hints: ['$x^2-4x=(x-2)^2-4$ et $y^2+6y=(y+3)^2-9$.'],
      solution: [
        {
          type: 'list',
          items: [
            String.raw`$(x-2)^2-4+(y+3)^2-9-12=0\iff(x-2)^2+(y+3)^2=25$ : cercle de centre $(2;-3)$ et de rayon $5$.`,
            String.raw`$(x+1)^2-1+(y-2)^2-4+6=0\iff(x+1)^2+(y-2)^2=-1$ : impossible (une somme de carrés est positive), ensemble **vide**.`,
            String.raw`$x^2+(y-4)^2-16+16=0\iff x^2+(y-4)^2=0\iff x=0$ et $y=4$ : c’est le **point** $(0;4)$.`,
          ],
        },
      ],
    },
    {
      id: 'gr-parabole',
      title: 'Sommet et axe d’une parabole',
      difficulty: 1,
      duration: 12,
      tags: ['parabole', 'second degré'],
      statement: [
        {
          type: 'p',
          text: String.raw`1. Déterminer le sommet et l’axe de symétrie de la parabole $\mathcal{P}$ : $y=2x^2-8x+3$. Est-elle tournée vers le haut ou vers le bas ?
2. Déterminer les points d’intersection de $\mathcal{P}$ avec l’axe des abscisses.
3. Déterminer l’équation de la parabole de sommet $S(1;-4)$ passant par le point $E(3;0)$.`,
        },
      ],
      hints: ['$\\alpha=-\\frac{b}{2a}$, $\\beta=f(\\alpha)$.', 'Question 3 : $y=a(x-1)^2-4$, puis utiliser $E$.'],
      solution: [
        {
          type: 'p',
          text: String.raw`1. $\alpha=-\dfrac{-8}{2\times2}=2$ et $\beta=2\times4-16+3=-5$. Sommet $S(2;-5)$, axe $x=2$. Comme $a=2>0$, la parabole est tournée vers le haut ($S$ est le point le plus bas).
2. $2x^2-8x+3=0$ : $\Delta=64-24=40$, $x=\dfrac{8\pm\sqrt{40}}{4}=2\pm\dfrac{\sqrt{10}}{2}$. Points $\left(2-\frac{\sqrt{10}}{2};0\right)$ et $\left(2+\frac{\sqrt{10}}{2};0\right)$, symétriques par rapport à $x=2$.
3. $y=a(x-1)^2-4$ ; $E$ donne $4a-4=0$ donc $a=1$ : $y=(x-1)^2-4=x^2-2x-3$.`,
        },
      ],
    },
    {
      id: 'gr-tangentes',
      title: 'Tangentes à un cercle',
      difficulty: 2,
      duration: 20,
      tags: ['tangente', 'cercle'],
      statement: [
        {
          type: 'p',
          text: String.raw`$\mathcal{C}$ est l’ensemble des points $M(x;y)$ tels que $x^2+y^2-2x+4y-5=0$.
1. Montrer que $\mathcal{C}$ est un cercle dont on précisera le centre $\Omega$ et le rayon.
2. Vérifier que $A(2;1)$ et $B(4;-1)$ sont sur $\mathcal{C}$.
3. Déterminer une équation des tangentes $T_A$ et $T_B$ à $\mathcal{C}$ en $A$ et en $B$.
4. Déterminer le point d’intersection $K$ de $T_A$ et $T_B$ et vérifier que $\Omega AK$ est rectangle en $A$.`,
        },
      ],
      hints: ['Compléter les carrés.', 'La tangente en $A$ a pour vecteur normal $\\overrightarrow{\\Omega A}$.'],
      solution: [
        {
          type: 'p',
          text: String.raw`1. $(x-1)^2-1+(y+2)^2-4-5=0\iff(x-1)^2+(y+2)^2=10$ : centre $\Omega(1;-2)$, rayon $\sqrt{10}$.
2. $A$ : $1^2+3^2=10$ ✔ ; $B$ : $3^2+1^2=10$ ✔.
3. $\overrightarrow{\Omega A}(1;3)$ : $T_A$ : $(x-2)+3(y-1)=0\iff x+3y-5=0$.
$\overrightarrow{\Omega B}(3;1)$ : $T_B$ : $3(x-4)+(y+1)=0\iff3x+y-11=0$.
4. De $T_B$ : $y=11-3x$ ; dans $T_A$ : $x+33-9x-5=0\iff x=\frac{7}{2}$, puis $y=11-\frac{21}{2}=\frac{1}{2}$. $K\left(\frac{7}{2};\frac{1}{2}\right)$.
$\overrightarrow{A\Omega}(-1;-3)$ et $\overrightarrow{AK}\left(\frac{3}{2};-\frac{1}{2}\right)$ : $\overrightarrow{A\Omega}\cdot\overrightarrow{AK}=-\frac{3}{2}+\frac{3}{2}=0$ ✔. (Et $\Omega K^2=\frac{25}{4}+\frac{25}{4}=\frac{25}{2}=\Omega A^2+AK^2=10+\frac{5}{2}$.)`,
        },
      ],
    },
    {
      id: 'gr-intersection',
      title: 'Intersection droite / cercle et tangence',
      difficulty: 2,
      duration: 20,
      tags: ['intersection', 'second degré'],
      statement: [
        {
          type: 'p',
          text: String.raw`1. Déterminer les points d’intersection du cercle $\mathcal{C}$ : $x^2+y^2-4x-2y-20=0$ et de la droite $d$ : $x-2y+5=0$.
2. On considère le cercle $\Gamma$ : $x^2+y^2=8$ et, pour tout réel $k$, la droite $d_k$ : $y=x+k$. Déterminer les valeurs de $k$ pour lesquelles $d_k$ est tangente à $\Gamma$.`,
        },
      ],
      hints: ['Dans $d$, $x=2y-5$.', 'Question 2 : on obtient $2x^2+2kx+k^2-8=0$ ; tangente $\\iff\\Delta=0$.'],
      solution: [
        {
          type: 'p',
          text: String.raw`1. $x=2y-5$ donc $(2y-5)^2+y^2-4(2y-5)-2y-20=0\iff4y^2-20y+25+y^2-8y+20-2y-20=0\iff5y^2-30y+25=0\iff y^2-6y+5=0$.
Racines $y=1$ et $y=5$ ; d’où $x=-3$ et $x=5$. Points d’intersection : $(-3;1)$ et $(5;5)$.
*Vérification* avec $\mathcal{C}$ : $(x-2)^2+(y-1)^2=25$ ; $(-5)^2+0^2=25$ ✔ et $3^2+4^2=25$ ✔.
2. $x^2+(x+k)^2=8\iff2x^2+2kx+k^2-8=0$. $\Delta=4k^2-8(k^2-8)=64-4k^2$.
$d_k$ tangente $\iff\Delta=0\iff k^2=16\iff k=4$ ou $k=-4$.
*Contrôle* : la distance de $O$ à $x-y+k=0$ vaut $\frac{|k|}{\sqrt2}=\frac{4}{\sqrt2}=2\sqrt2=\sqrt8$, le rayon. ✔`,
        },
      ],
    },
    {
      id: 'gr-projete',
      title: 'Projeté orthogonal, distance et symétrique',
      difficulty: 2,
      duration: 15,
      tags: ['projeté orthogonal', 'distance'],
      statement: [
        {
          type: 'p',
          text: String.raw`On considère la droite $d$ : $x+2y-3=0$ et le point $A(5;4)$.
1. Déterminer les coordonnées du projeté orthogonal $H$ de $A$ sur $d$.
2. En déduire la distance du point $A$ à la droite $d$.
3. Déterminer les coordonnées du symétrique $A'$ de $A$ par rapport à $d$.`,
        },
      ],
      hints: ['$H(5+t\\,;\\,4+2t)$ car $\\vec{n}(1;2)$.', '$H$ est le milieu de $[AA\']$.'],
      solution: [
        {
          type: 'p',
          text: String.raw`1. $\vec{n}(1;2)$ est normal à $d$, donc $H(5+t\,;\,4+2t)$. $H\in d\iff5+t+8+4t-3=0\iff5t+10=0\iff t=-2$. $H(3;0)$ (vérification : $3+0-3=0$ ✔).
2. $AH=|t|\times\|\vec{n}\|=2\sqrt5$. (Formule : $\frac{|5+8-3|}{\sqrt5}=\frac{10}{\sqrt5}=2\sqrt5$ ✔.)
3. $H$ milieu de $[AA']$ : $x_{A'}=2\times3-5=1$, $y_{A'}=2\times0-4=-4$. $A'(1;-4)$.`,
        },
      ],
    },
    {
      id: 'gr-diametre',
      title: 'Cercle de diamètre [AB]',
      difficulty: 2,
      duration: 12,
      tags: ['cercle', 'produit scalaire'],
      statement: [
        {
          type: 'p',
          text: String.raw`$A(-1;0)$ et $B(3;2)$.
1. Déterminer une équation du cercle $\mathcal{C}$ de diamètre $[AB]$ de deux façons : avec le centre et le rayon, puis avec $\overrightarrow{MA}\cdot\overrightarrow{MB}=0$.
2. Le point $E(0;3)$ est-il sur $\mathcal{C}$ ? Que peut-on en déduire pour le triangle $ABE$ ?`,
        },
      ],
      hints: ['Le centre est le milieu de $[AB]$ et le rayon vaut $\\frac{AB}{2}$.'],
      solution: [
        {
          type: 'p',
          text: String.raw`1. Centre $I(1;1)$, $AB=\sqrt{16+4}=2\sqrt5$ donc $r=\sqrt5$ : $\mathcal{C}$ : $(x-1)^2+(y-1)^2=5$.
Autre méthode : $(x+1)(x-3)+(y-0)(y-2)=0\iff x^2-2x-3+y^2-2y=0\iff(x-1)^2+(y-1)^2=5$. ✔
2. $(0-1)^2+(3-1)^2=1+4=5$ : $E\in\mathcal{C}$. Donc $\overrightarrow{EA}\cdot\overrightarrow{EB}=0$ : le triangle $ABE$ est rectangle en $E$ (vérification : $\overrightarrow{EA}(-1;-3)$, $\overrightarrow{EB}(3;-1)$, produit $-3+3=0$).`,
        },
      ],
    },
    {
      id: 'gr-bac-triangle',
      title: 'Type bac : orthocentre, centre du cercle circonscrit et droite d’Euler',
      difficulty: 3,
      duration: 40,
      tags: ['type bac', 'hauteur', 'médiatrice', 'cercle'],
      statement: [
        {
          type: 'p',
          text: String.raw`Dans un repère orthonormé, on considère les points $A(-1;0)$, $B(5;2)$ et $C(1;6)$.
1. a. Déterminer une équation de la hauteur $h_C$ issue de $C$ du triangle $ABC$.
 b. Déterminer une équation de la hauteur $h_A$ issue de $A$.
 c. En déduire les coordonnées de l’orthocentre $H$ du triangle, et vérifier que $H$ est sur la troisième hauteur.
2. a. Déterminer une équation des médiatrices de $[AB]$ et de $[BC]$.
 b. En déduire les coordonnées du centre $O'$ du cercle circonscrit à $ABC$, son rayon et une équation de ce cercle.
3. Soit $G$ le centre de gravité de $ABC$, de coordonnées $\left(\frac{x_A+x_B+x_C}{3};\frac{y_A+y_B+y_C}{3}\right)$. Montrer que $\overrightarrow{O'H}=3\,\overrightarrow{O'G}$. Que peut-on en conclure ?`,
        },
      ],
      hints: [
        'La hauteur issue de $C$ passe par $C$ et a pour vecteur normal $\\overrightarrow{AB}$.',
        'La médiatrice de $[AB]$ passe par le milieu de $[AB]$ et a pour vecteur normal $\\overrightarrow{AB}$.',
        'Trois points $O\'$, $G$, $H$ tels que $\\overrightarrow{O\'H}=3\\overrightarrow{O\'G}$ sont alignés.',
      ],
      solution: [
        {
          type: 'p',
          text: String.raw`1. a. $\overrightarrow{AB}(6;2)$ : $h_C$ : $6(x-1)+2(y-6)=0\iff6x+2y-18=0\iff3x+y-9=0$.
b. $\overrightarrow{BC}(-4;4)$ : $h_A$ : $-4(x+1)+4(y-0)=0\iff-x+y-1=0\iff y=x+1$.
c. En reportant $y=x+1$ dans $3x+y-9=0$ : $4x-8=0$, $x=2$, $y=3$. $H(2;3)$.
Troisième hauteur $h_B$ : $\overrightarrow{AC}(2;6)$, $2(x-5)+6(y-2)=0\iff x+3y-11=0$ ; $2+9-11=0$ ✔.
2. a. Milieu de $[AB]$ : $(2;1)$ ; médiatrice : $6(x-2)+2(y-1)=0\iff3x+y-7=0$.
Milieu de $[BC]$ : $(3;4)$ ; médiatrice : $-4(x-3)+4(y-4)=0\iff y=x+1$.
b. $3x+x+1-7=0\iff x=\frac{3}{2}$, $y=\frac{5}{2}$ : $O'\left(\frac{3}{2};\frac{5}{2}\right)$.
$O'A^2=\left(\frac{5}{2}\right)^2+\left(\frac{5}{2}\right)^2=\frac{25}{2}$ (et de même $O'B^2=\frac{49}{4}+\frac{1}{4}=\frac{25}{2}$, $O'C^2=\frac{1}{4}+\frac{49}{4}=\frac{25}{2}$). Rayon $\frac{5}{\sqrt2}=\frac{5\sqrt2}{2}$.
Équation : $\left(x-\frac{3}{2}\right)^2+\left(y-\frac{5}{2}\right)^2=\frac{25}{2}$.
3. $G\left(\frac{5}{3};\frac{8}{3}\right)$. $\overrightarrow{O'H}\left(\frac{1}{2};\frac{1}{2}\right)$ et $\overrightarrow{O'G}\left(\frac{1}{6};\frac{1}{6}\right)$, donc $\overrightarrow{O'H}=3\overrightarrow{O'G}$.
Les points $O'$, $G$ et $H$ sont **alignés** : c’est la **droite d’Euler** du triangle.`,
        },
      ],
    },
    {
      id: 'gr-parabole-droite',
      title: 'Parabole et droites : discussion selon un paramètre',
      difficulty: 3,
      duration: 25,
      tags: ['parabole', 'paramètre', 'second degré'],
      statement: [
        {
          type: 'p',
          text: String.raw`On considère la parabole $\mathcal{P}$ : $y=x^2-2x-3$ et, pour tout réel $m$, la droite $d_m$ : $y=mx-7$.
1. Que représente le réel $m$ ? Quel point commun ont toutes les droites $d_m$ ?
2. Montrer que les abscisses des points d’intersection de $\mathcal{P}$ et $d_m$ sont les solutions de $x^2-(m+2)x+4=0$.
3. Discuter, selon $m$, le nombre de points d’intersection.
4. Déterminer les droites $d_m$ tangentes à $\mathcal{P}$ et leurs points de contact.
5. Pour $m=3$, déterminer les points d’intersection.`,
        },
      ],
      hints: ['$\\Delta=(m+2)^2-16$.', '$(m+2)^2>16\\iff m+2>4$ ou $m+2<-4$.'],
      solution: [
        {
          type: 'p',
          text: String.raw`1. $m$ est le coefficient directeur de $d_m$. Toutes les droites passent par $(0;-7)$.
2. $x^2-2x-3=mx-7\iff x^2-(m+2)x+4=0$.
3. $\Delta=(m+2)^2-16=(m+2-4)(m+2+4)=(m-2)(m+6)$.
- $\Delta>0\iff m<-6$ ou $m>2$ : deux points ;
- $\Delta=0\iff m=-6$ ou $m=2$ : un point (tangence) ;
- $\Delta<0\iff-6<m<2$ : aucun point.
4. $m=2$ : $x^2-4x+4=(x-2)^2=0$, $x=2$, $y=2\times2-7=-3$ : $d_2$ : $y=2x-7$ est tangente en $(2;-3)$.
$m=-6$ : $x^2+4x+4=(x+2)^2=0$, $x=-2$, $y=12-7=5$ : $d_{-6}$ : $y=-6x-7$ est tangente en $(-2;5)$.
(Contrôle : $\mathcal{P}(2)=4-4-3=-3$ et $\mathcal{P}(-2)=4+4-3=5$ ✔.)
5. $m=3$ : $x^2-5x+4=0\iff(x-1)(x-4)=0$. Points $(1;-4)$ et $(4;5)$.`,
        },
      ],
    },
    {
      id: 'gr-tangence-distance',
      title: 'Montrer qu’une droite est tangente à un cercle',
      difficulty: 3,
      duration: 20,
      tags: ['tangente', 'distance', 'projeté orthogonal'],
      statement: [
        {
          type: 'p',
          text: String.raw`Soit $\mathcal{C}$ : $x^2+y^2-2x-4y-20=0$ et $d$ : $3x+4y-36=0$.
1. Déterminer le centre $\Omega$ et le rayon $r$ de $\mathcal{C}$.
2. Déterminer le projeté orthogonal $T$ de $\Omega$ sur $d$, puis la distance $\Omega T$.
3. En déduire que $d$ est tangente à $\mathcal{C}$ et préciser le point de contact.
4. Retrouver ce résultat par la méthode de substitution.`,
        },
      ],
      hints: ['$T(1+3t\\,;\\,2+4t)$.', 'Substitution : $y=\\frac{36-3x}{4}$, puis multiplier par 16.'],
      solution: [
        {
          type: 'p',
          text: String.raw`1. $(x-1)^2-1+(y-2)^2-4-20=0\iff(x-1)^2+(y-2)^2=25$ : $\Omega(1;2)$, $r=5$.
2. $\vec{n}(3;4)$ : $T(1+3t\,;\,2+4t)$, $T\in d\iff3+9t+8+16t-36=0\iff25t=25\iff t=1$. $T(4;6)$ et $\Omega T=|t|\times\|\vec{n}\|=1\times5=5$.
3. $\Omega T=r$ : la distance du centre à la droite est égale au rayon, donc $d$ est tangente à $\mathcal{C}$ en $T(4;6)$ (on vérifie $3^2+4^2=25$ ✔).
4. $y=\frac{36-3x}{4}$ ; $(x-1)^2+\left(\frac{36-3x}{4}-2\right)^2=25\iff(x-1)^2+\frac{(28-3x)^2}{16}=25$.
En multipliant par $16$ : $16x^2-32x+16+784-168x+9x^2=400\iff25x^2-200x+400=0\iff x^2-8x+16=0\iff(x-4)^2=0$.
Solution double $x=4$ ($\Delta=0$) : un seul point commun, $T(4;6)$. ✔`,
        },
      ],
    },
    {
      id: 'gr-python',
      title: 'Python : projeté orthogonal et reconnaissance de cercle',
      difficulty: 2,
      duration: 20,
      tags: ['Python', 'algorithmique'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire une fonction `projete(a, b, c, xA, yA)` qui renvoie les coordonnées du projeté orthogonal de A(xA ; yA) sur la droite ax + by + c = 0.',
            'Écrire une fonction `distance(a, b, c, xA, yA)` qui renvoie la distance de A à cette droite.',
            'Écrire une fonction `cercle(p, q, s)` qui étudie l’ensemble d’équation x² + y² + px + qy + s = 0 et renvoie le centre et le rayon, ou un message si l’ensemble est un point ou vide.',
            'Tester avec la droite x + 2y − 3 = 0 et A(5 ; 4), puis avec x² + y² − 4x + 6y − 12 = 0.',
          ],
        },
      ],
      hints: [
        'H = (xA + t·a, yA + t·b) avec t = −(a·xA + b·yA + c)/(a² + b²).',
        'x² + px = (x + p/2)² − p²/4.',
      ],
      solution: [
        py(String.raw`
from math import sqrt

def projete(a, b, c, xA, yA):
    t = -(a * xA + b * yA + c) / (a**2 + b**2)
    return (xA + t * a, yA + t * b)

def distance(a, b, c, xA, yA):
    return abs(a * xA + b * yA + c) / sqrt(a**2 + b**2)

def cercle(p, q, s):
    x0, y0 = -p / 2, -q / 2          # centre éventuel
    k = x0**2 + y0**2 - s           # (x - x0)² + (y - y0)² = k
    if k > 0:
        return ("cercle", (x0, y0), sqrt(k))
    elif k == 0:
        return ("point", (x0, y0))
    else:
        return ("vide",)

print(projete(1, 2, -3, 5, 4))      # (3.0, 0.0)
print(distance(1, 2, -3, 5, 4))     # 4.472... = 2*sqrt(5)
print(cercle(-4, 6, -12))           # ('cercle', (2.0, -3.0), 5.0)
print(cercle(2, -4, 6))             # ('vide',)
`),
        {
          type: 'p',
          text: String.raw`Justification de $t$ : $H=A+t\vec{n}\in d\iff a(x_A+ta)+b(y_A+tb)+c=0\iff t=-\dfrac{ax_A+by_A+c}{a^2+b^2}$. Pour le cercle : $x^2+px+y^2+qy+s=\left(x+\frac{p}{2}\right)^2+\left(y+\frac{q}{2}\right)^2-\frac{p^2}{4}-\frac{q^2}{4}+s$, d’où $k=x_0^2+y_0^2-s$. Avec des flottants, le cas $k=0$ peut être manqué à cause des arrondis : on pourrait tester $|k|<10^{-12}$.`,
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
      id: 'line-circle-geometry',
      title: 'Droite : vecteur directeur et vecteur normal',
      props: { mode: 'droite' },
      caption: 'Déplacez les points : l’équation cartésienne ax + by + c = 0 se met à jour, ainsi que les vecteurs (−b ; a) et (a ; b).',
    },
    {
      type: 'widget',
      id: 'line-circle-geometry',
      title: 'Cercle : centre, rayon et équation',
      props: { mode: 'cercle' },
      caption: 'Déplacez le centre et un point du cercle : comparez l’équation réduite (x − x₀)² + (y − y₀)² = r² et sa forme développée.',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Parabole y = ax² + bx + c : sommet et axe',
      props: {
        expressions: ['a*x^2+b*x+c'],
        params: [
          { name: 'a', min: -3, max: 3, step: 0.5, value: 1 },
          { name: 'b', min: -6, max: 6, step: 0.5, value: -2 },
          { name: 'c', min: -6, max: 6, step: 0.5, value: -3 },
        ],
        xMin: -5,
        xMax: 7,
        yMin: -8,
        yMax: 8,
      },
      caption: 'Faites varier a, b et c : le sommet a pour abscisse −b/(2a). Que se passe-t-il quand a change de signe ?',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Parabole et droites passant par (0 ; −7)',
      props: {
        expressions: ['x^2-2x-3', 'm*x-7'],
        params: [{ name: 'm', min: -10, max: 6, step: 0.5, value: 2 }],
        xMin: -5,
        xMax: 6,
        yMin: -10,
        yMax: 10,
      },
      caption: 'Pour m = 2 et m = −6, la droite est tangente à la parabole (exercice « discussion selon un paramètre »).',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Cercle x² + y² = 25 et droite x + y = 1',
      props: {
        expressions: ['sqrt(25-x^2)', '-sqrt(25-x^2)', '1-x'],
        xMin: -8,
        xMax: 8,
        yMin: -6,
        yMax: 6,
        editable: true,
      },
      caption: 'Le cercle est tracé comme réunion de deux demi-cercles. Les points d’intersection sont (4 ; −3) et (−3 ; 4).',
    },
    { type: 'svg', svg: svgPositions, maxWidth: 560, caption: 'Positions relatives d’une droite et d’un cercle.' },
    { type: 'svg', svg: svgProjete, maxWidth: 420, caption: 'Projeté orthogonal H de A sur d.' },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Un vecteur normal à la droite $d$ : $3x-2y+5=0$ est :',
          choices: ['$(2;3)$', '$(3;-2)$', '$(-2;3)$', '$(3;2)$'],
          answer: 1,
          explanation: 'Les coefficients de $x$ et $y$ : $\\vec{n}(a;b)=(3;-2)$. Le vecteur $(2;3)$ est directeur.',
        },
        {
          question: 'La droite passant par $A(1;2)$ de vecteur normal $\\vec{n}(4;-1)$ a pour équation :',
          choices: ['$4x-y-2=0$', '$4x-y+2=0$', '$x+4y-9=0$', '$-x+4y-7=0$'],
          answer: 0,
          explanation: '$4(x-1)-(y-2)=0\\iff4x-y-2=0$.',
        },
        {
          question: 'Les droites $2x+3y-1=0$ et $6x-4y+7=0$ sont :',
          choices: ['parallèles', 'perpendiculaires', 'confondues', 'ni l’un ni l’autre'],
          answer: 1,
          explanation: '$\\vec{n}\\cdot\\vec{n}\'=12-12=0$.',
        },
        {
          question: 'Le cercle $(x-2)^2+(y+5)^2=16$ a pour centre et rayon :',
          choices: ['$(2;-5)$ et $16$', '$(-2;5)$ et $4$', '$(2;-5)$ et $4$', '$(2;5)$ et $4$'],
          answer: 2,
        },
        {
          question: 'L’équation $x^2+y^2+6x+10=0$ représente :',
          choices: ['un cercle de rayon $1$', 'un point', 'l’ensemble vide', 'un cercle de rayon $\\sqrt{10}$'],
          answer: 2,
          explanation: '$(x+3)^2+y^2=-1<0$.',
        },
        {
          question: 'Le sommet de la parabole $y=-x^2+4x+1$ est :',
          choices: ['$(2;5)$', '$(-2;-11)$', '$(4;1)$', '$(2;-3)$'],
          answer: 0,
          explanation: '$\\alpha=-\\frac{4}{-2}=2$, $\\beta=-4+8+1=5$.',
        },
        {
          question: 'La tangente en $A(3;4)$ au cercle $x^2+y^2=25$ a pour équation :',
          choices: ['$4x-3y=0$', '$3x+4y-25=0$', '$3x+4y+25=0$', '$x+y-7=0$'],
          answer: 1,
          explanation: 'Vecteur normal $\\overrightarrow{OA}(3;4)$ : $3(x-3)+4(y-4)=0$.',
        },
        {
          question: 'La distance du point $O$ à la droite $3x+4y-10=0$ vaut :',
          choices: ['$10$', '$2$', '$\\frac{10}{7}$', '$5$'],
          answer: 1,
          explanation: '$\\frac{|-10|}{\\sqrt{9+16}}=\\frac{10}{5}=2$.',
        },
        {
          question: 'Le projeté orthogonal de $A(4;3)$ sur l’axe des abscisses est :',
          choices: ['$(0;3)$', '$(4;0)$', '$(3;4)$', '$(0;0)$'],
          answer: 1,
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Vecteur directeur de $ax+by+c=0$', back: '$\\vec{u}(-b;a)$' },
        { front: 'Vecteur normal de $ax+by+c=0$', back: '$\\vec{n}(a;b)$' },
        { front: 'Droite par $A$ de vecteur normal $\\vec{n}(a;b)$', back: '$a(x-x_A)+b(y-y_A)=0$' },
        { front: 'Condition $d\\perp d\'$', back: "$aa'+bb'=0$ (vecteurs normaux orthogonaux)" },
        { front: 'Équation du cercle de centre $\\Omega(x_0;y_0)$, rayon $r$', back: '$(x-x_0)^2+(y-y_0)^2=r^2$' },
        { front: 'Équation du cercle de diamètre $[AB]$', back: '$(x-x_A)(x-x_B)+(y-y_A)(y-y_B)=0$' },
        { front: 'Tangente en $A$ au cercle de centre $\\Omega$', back: 'Droite passant par $A$ de vecteur normal $\\overrightarrow{\\Omega A}$.' },
        { front: 'Projeté orthogonal de $A$ sur $d$ (méthode)', back: '$H=A+t\\vec{n}$ et on écrit que $H\\in d$ pour trouver $t$.' },
        { front: 'Distance d’un point à une droite', back: '$\\dfrac{|ax_A+by_A+c|}{\\sqrt{a^2+b^2}}$' },
        { front: 'Axe de symétrie de $y=ax^2+bx+c$', back: 'La droite $x=-\\dfrac{b}{2a}$.' },
        { front: 'Sommet de la parabole', back: '$S(\\alpha;\\beta)$ avec $\\alpha=-\\frac{b}{2a}$ et $\\beta=f(\\alpha)$.' },
        { front: 'Intersection droite / cercle', back: 'Substitution → équation du second degré ; le signe de $\\Delta$ donne 2, 1 ou 0 point(s).' },
        { front: 'Médiatrice de $[AB]$', back: 'Droite passant par le milieu de $[AB]$, de vecteur normal $\\overrightarrow{AB}$.' },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        {
          text: 'Le vecteur $(2;-6)$ est normal à la droite $x-3y+4=0$.',
          answer: true,
          explanation: 'Il est colinéaire à $(1;-3)$.',
        },
        {
          text: 'L’équation $(x+3)^2+(y-1)^2=4$ est celle du cercle de centre $(3;-1)$.',
          answer: false,
          explanation: 'Le centre est $(-3;1)$ (rayon $2$).',
        },
        {
          text: 'Une droite et un cercle peuvent avoir trois points communs.',
          answer: false,
          explanation: 'On obtient une équation du second degré : au plus deux solutions.',
        },
        {
          text: 'La parabole $y=3x^2-6x+1$ a pour axe de symétrie la droite $x=1$.',
          answer: true,
          explanation: '$-\\frac{-6}{6}=1$.',
        },
        {
          text: 'Les droites $y=2x+1$ et $y=-2x+3$ sont perpendiculaires.',
          answer: false,
          explanation: 'Vecteurs directeurs $(1;2)$ et $(1;-2)$ : produit scalaire $1-4=-3\\neq0$. Il faudrait des coefficients directeurs de produit $-1$.',
        },
        {
          text: 'Si la distance du centre d’un cercle à une droite est égale au rayon, la droite est tangente au cercle.',
          answer: true,
        },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque équation à sa nature',
      pairs: [
        { left: '$2x-y+3=0$', right: 'droite de vecteur normal $(2;-1)$' },
        { left: '$(x-1)^2+(y+2)^2=9$', right: 'cercle de centre $(1;-2)$, de rayon $3$' },
        { left: '$x^2+y^2-2x=0$', right: 'cercle de centre $(1;0)$, de rayon $1$' },
        { left: '$x^2+y^2+1=0$', right: 'ensemble vide' },
        { left: '$y=x^2-4x+1$', right: 'parabole de sommet $(2;-3)$' },
        { left: '$x=3$', right: 'droite de vecteur normal $(1;0)$' },
      ],
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre : déterminer le projeté orthogonal H de A sur d',
      items: [
        'Lire un vecteur normal $\\vec{n}(a;b)$ dans l’équation de $d$.',
        'Écrire $H(x_A+ta\\,;\\,y_A+tb)$ avec $t$ réel.',
        'Remplacer dans l’équation de $d$ et résoudre l’équation en $t$.',
        'En déduire les coordonnées de $H$.',
        'Vérifier que $H$ est sur $d$ et calculer éventuellement $AH=|t|\\,\\|\\vec{n}\\|$.',
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'Pour la droite d’équation $5x-2y+1=0$, un vecteur normal a pour coordonnées 5 et {{-2|−2}}, et un vecteur directeur a pour coordonnées {{2}} et 5. Le cercle d’équation $(x-4)^2+y^2=49$ a pour centre le point d’abscisse {{4}} et d’ordonnée 0, et pour rayon {{7}}. La tangente à un cercle en un point A est {{perpendiculaire}} au rayon [ΩA]. La parabole $y=x^2+6x$ a pour axe de symétrie la droite d’équation x = {{-3|−3}}.',
    },
  ],
}

export default chapter
