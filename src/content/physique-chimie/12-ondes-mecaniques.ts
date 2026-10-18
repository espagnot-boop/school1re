import type { Chapter } from '../types'

const r = String.raw

/* ------------------------------------------------------------------ */
/* Schémas SVG (générés par calcul pour être exacts)                    */
/* ------------------------------------------------------------------ */

const FONT = 'font-family="Geist, sans-serif"'
const BLUE = 'hsl(217 91% 60%)'
const RED = 'hsl(0 84% 60%)'
const GREEN = 'hsl(142 71% 45%)'
const ORANGE = 'hsl(25 95% 53%)'

const defs = `<defs>
<marker id="om-k" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker>
<marker id="om-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${RED}"/></marker>
<marker id="om-g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${GREEN}"/></marker>
<marker id="om-o" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${ORANGE}"/></marker>
</defs>`

/** Chemin SVG d'une fonction échantillonnée. */
const path = (f: (x: number) => number, x0: number, x1: number, n = 240) => {
  const pts: string[] = []
  for (let k = 0; k <= n; k++) {
    const x = x0 + ((x1 - x0) * k) / n
    pts.push(`${k === 0 ? 'M' : 'L'}${x.toFixed(1)} ${f(x).toFixed(1)}`)
  }
  return pts.join(' ')
}

/** Perturbation (bosse) se propageant le long d'une corde, à deux dates. */
const svgCorde = (() => {
  const bump = (c: number) => (x: number) => {
    const u = (x - c) / 22
    return Math.abs(u) < 1 ? 70 - 40 * Math.cos((Math.PI * u) / 2) ** 2 : 70
  }
  const bump2 = (c: number) => (x: number) => bump(c)(x) + 110
  return `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
${defs}
<text x="10" y="40" fill="currentColor">date t₁</text>
<path d="${path(bump(140), 40, 540)}" fill="none" stroke="${BLUE}" stroke-width="2"/>
<text x="10" y="150" fill="currentColor">date t₂</text>
<path d="${path(bump2(380), 40, 540)}" fill="none" stroke="${BLUE}" stroke-width="2"/>
<circle cx="260" cy="70" r="4" fill="${RED}"/><text x="254" y="92" fill="${RED}">M</text>
<circle cx="260" cy="180" r="4" fill="${RED}"/><text x="254" y="202" fill="${RED}">M</text>
<line x1="140" y1="22" x2="140" y2="215" stroke="currentColor" stroke-dasharray="3 3" stroke-opacity="0.5"/>
<line x1="380" y1="130" x2="380" y2="215" stroke="currentColor" stroke-dasharray="3 3" stroke-opacity="0.5"/>
<line x1="142" y1="228" x2="378" y2="228" stroke="${GREEN}" stroke-width="1.6" marker-start="url(#om-g)" marker-end="url(#om-g)"/>
<text x="260" y="244" text-anchor="middle" fill="${GREEN}">d = v·(t₂ − t₁)</text>
<line x1="420" y1="40" x2="500" y2="40" stroke="${ORANGE}" stroke-width="1.6" marker-end="url(#om-o)"/>
<text x="420" y="30" fill="${ORANGE}">sens de propagation</text>
<text x="40" y="118" fill="currentColor" class="svg-muted" font-size="11">Le point M (repos à t₁) sera perturbé quand la bosse l'atteindra : il monte puis redescend, sans avancer.</text>
</svg>`
})()

/** Représentation spatiale d'une onde sinusoïdale : longueur d'onde. */
const svgSpatial = (() => {
  // x de 0 à 3 m -> 60 à 510 px (150 px/m) ; λ = 1,0 m ; amplitude 50 px
  const X = (xm: number) => 60 + xm * 150
  const f = (px: number) => 130 - 50 * Math.sin((2 * Math.PI * (px - 60)) / 150)
  return `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
${defs}
<line x1="60" y1="130" x2="530" y2="130" stroke="currentColor" stroke-width="1.2" marker-end="url(#om-k)"/>
<line x1="60" y1="220" x2="60" y2="30" stroke="currentColor" stroke-width="1.2" marker-end="url(#om-k)"/>
<text x="520" y="150" fill="currentColor">x (m)</text>
<text x="66" y="34" fill="currentColor">y (à une date t fixée)</text>
${[1, 2, 3].map((k) => `<line x1="${X(k)}" y1="126" x2="${X(k)}" y2="134" stroke="currentColor"/><text x="${X(k)}" y="148" text-anchor="middle" fill="currentColor">${k},0</text>`).join('')}
<path d="${path(f, 60, 510)}" fill="none" stroke="${BLUE}" stroke-width="2"/>
<line x1="${X(0.25)}" y1="80" x2="${X(0.25)}" y2="60" stroke="currentColor" stroke-dasharray="3 3"/>
<line x1="${X(1.25)}" y1="80" x2="${X(1.25)}" y2="60" stroke="currentColor" stroke-dasharray="3 3"/>
<line x1="${X(0.25) + 2}" y1="62" x2="${X(1.25) - 2}" y2="62" stroke="${RED}" stroke-width="1.6" marker-start="url(#om-r)" marker-end="url(#om-r)"/>
<text x="${X(0.75)}" y="55" text-anchor="middle" fill="${RED}">λ (deux crêtes successives)</text>
<line x1="${X(1)}" y1="200" x2="${X(1)}" y2="130" stroke="currentColor" stroke-dasharray="3 3" stroke-opacity="0.5"/>
<line x1="${X(2)}" y1="200" x2="${X(2)}" y2="130" stroke="currentColor" stroke-dasharray="3 3" stroke-opacity="0.5"/>
<line x1="${X(1) + 2}" y1="200" x2="${X(2) - 2}" y2="200" stroke="${GREEN}" stroke-width="1.6" marker-start="url(#om-g)" marker-end="url(#om-g)"/>
<text x="${X(1.5)}" y="216" text-anchor="middle" fill="${GREEN}">λ (points en phase)</text>
<circle cx="${X(1.25)}" cy="80" r="4" fill="${ORANGE}"/><circle cx="${X(1.75)}" cy="180" r="4" fill="${ORANGE}"/>
<text x="${X(1.75) + 8}" y="184" fill="${ORANGE}">points distants de λ/2 : opposition de phase</text>
</svg>`
})()

/** Représentation temporelle : période. */
const svgTemporel = (() => {
  // t de 0 à 30 ms -> 60 à 510 px (15 px/ms) ; T = 10 ms
  const f = (px: number) => 120 - 50 * Math.sin((2 * Math.PI * (px - 60)) / 150)
  return `<svg viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
${defs}
<line x1="60" y1="120" x2="530" y2="120" stroke="currentColor" stroke-width="1.2" marker-end="url(#om-k)"/>
<line x1="60" y1="210" x2="60" y2="30" stroke="currentColor" stroke-width="1.2" marker-end="url(#om-k)"/>
<text x="515" y="140" fill="currentColor">t (ms)</text>
<text x="66" y="34" fill="currentColor">y_M (élongation d'un point M fixé)</text>
${[10, 20, 30].map((k) => `<line x1="${60 + k * 15}" y1="116" x2="${60 + k * 15}" y2="124" stroke="currentColor"/><text x="${60 + k * 15}" y="138" text-anchor="middle" fill="currentColor">${k}</text>`).join('')}
<path d="${path(f, 60, 510)}" fill="none" stroke="${BLUE}" stroke-width="2"/>
<line x1="${60 + 2.5 * 15}" y1="70" x2="${60 + 2.5 * 15}" y2="50" stroke="currentColor" stroke-dasharray="3 3"/>
<line x1="${60 + 12.5 * 15}" y1="70" x2="${60 + 12.5 * 15}" y2="50" stroke="currentColor" stroke-dasharray="3 3"/>
<line x1="${60 + 2.5 * 15 + 2}" y1="52" x2="${60 + 12.5 * 15 - 2}" y2="52" stroke="${RED}" stroke-width="1.6" marker-start="url(#om-r)" marker-end="url(#om-r)"/>
<text x="${60 + 7.5 * 15}" y="45" text-anchor="middle" fill="${RED}">T = 10 ms</text>
<line x1="${60 + 22.5 * 15}" y1="120" x2="${60 + 22.5 * 15}" y2="70" stroke="${GREEN}" stroke-width="1.6" marker-start="url(#om-g)" marker-end="url(#om-g)"/>
<text x="${60 + 22.5 * 15 + 8}" y="98" fill="${GREEN}">amplitude A</text>
</svg>`
})()

/** Oscillogramme : deux voies (micros M1 et M2), décalage temporel. */
const svgOscillo = (() => {
  // écran 10 × 8 divisions de 40 px, origine (40, 20). Base de temps 0,5 ms/div.
  // Voie 1 : T = 4 div (2,0 ms), amplitude 2 div ; voie 2 : retard 1 div (0,5 ms), amplitude 1,5 div
  const ox = 40
  const oy = 20
  const D = 40
  const lines: string[] = []
  for (let i = 0; i <= 10; i++) lines.push(`<line x1="${ox + i * D}" y1="${oy}" x2="${ox + i * D}" y2="${oy + 8 * D}" stroke="currentColor" stroke-opacity="${i === 5 ? 0.35 : 0.15}"/>`)
  for (let j = 0; j <= 8; j++) lines.push(`<line x1="${ox}" y1="${oy + j * D}" x2="${ox + 10 * D}" y2="${oy + j * D}" stroke="currentColor" stroke-opacity="${j === 4 ? 0.35 : 0.15}"/>`)
  const yc = oy + 4 * D
  const v1 = (px: number) => yc - 2 * D * Math.sin((2 * Math.PI * (px - ox)) / (4 * D))
  const v2 = (px: number) => yc - 1.5 * D * Math.sin((2 * Math.PI * (px - ox - D)) / (4 * D))
  return `<svg viewBox="0 0 560 380" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
${defs}
<rect x="${ox}" y="${oy}" width="${10 * D}" height="${8 * D}" fill="none" stroke="currentColor" stroke-width="1.4"/>
${lines.join('')}
<path d="${path(v1, ox, ox + 10 * D, 400)}" fill="none" stroke="${BLUE}" stroke-width="2"/>
<path d="${path(v2, ox, ox + 10 * D, 400)}" fill="none" stroke="${ORANGE}" stroke-width="2"/>
<line x1="${ox + D}" y1="${oy + 2 * D}" x2="${ox + D}" y2="${oy + 8 * D}" stroke="${BLUE}" stroke-dasharray="3 3"/>
<line x1="${ox + 2 * D}" y1="${oy + 2.5 * D}" x2="${ox + 2 * D}" y2="${oy + 8 * D}" stroke="${ORANGE}" stroke-dasharray="3 3"/>
<line x1="${ox + D + 2}" y1="${oy + 7.5 * D}" x2="${ox + 2 * D - 2}" y2="${oy + 7.5 * D}" stroke="${RED}" stroke-width="1.6" marker-start="url(#om-r)" marker-end="url(#om-r)"/>
<text x="${ox + 2 * D + 6}" y="${oy + 7.5 * D + 4}" fill="${RED}">τ = 1 div</text>
<line x1="${ox + D}" y1="${oy + 1.6 * D}" x2="${ox + 5 * D}" y2="${oy + 1.6 * D}" stroke="${GREEN}" stroke-width="1.6" marker-start="url(#om-g)" marker-end="url(#om-g)"/>
<line x1="${ox + 5 * D}" y1="${oy + 1.4 * D}" x2="${ox + 5 * D}" y2="${oy + 2 * D}" stroke="${GREEN}" stroke-dasharray="3 3"/>
<text x="${ox + 3 * D}" y="${oy + 1.4 * D}" text-anchor="middle" fill="${GREEN}">T = 4 div</text>
<text x="${ox}" y="${oy + 8 * D + 22}" fill="currentColor">Base de temps : 0,5 ms/div  —  Sensibilité : 1 V/div (2 voies)</text>
<text x="${ox + 10 * D + 10}" y="${oy + 30}" fill="${BLUE}">voie 1</text>
<text x="${ox + 10 * D + 10}" y="${oy + 46}" fill="${BLUE}">(micro M₁)</text>
<text x="${ox + 10 * D + 10}" y="${oy + 80}" fill="${ORANGE}">voie 2</text>
<text x="${ox + 10 * D + 10}" y="${oy + 96}" fill="${ORANGE}">(micro M₂)</text>
</svg>`
})()

/** Onde longitudinale (son) vs transversale (corde). */
const svgLongTrans = (() => {
  const dots: string[] = []
  for (let k = 0; k < 44; k++) {
    const x0 = 40 + k * 11
    const x = x0 + 5 * Math.sin((2 * Math.PI * x0) / 120)
    dots.push(`<line x1="${x.toFixed(1)}" y1="150" x2="${x.toFixed(1)}" y2="200" stroke="currentColor" stroke-width="1.6"/>`)
  }
  const corde = (px: number) => 60 - 25 * Math.sin((2 * Math.PI * (px - 40)) / 160)
  return `<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
${defs}
<text x="40" y="20" fill="currentColor">Onde transversale (corde) : perturbation ⟂ propagation</text>
<path d="${path(corde, 40, 520)}" fill="none" stroke="${BLUE}" stroke-width="2"/>
<line x1="530" y1="45" x2="530" y2="80" stroke="${RED}" stroke-width="1.6" marker-start="url(#om-r)" marker-end="url(#om-r)"/>
<line x1="380" y1="110" x2="460" y2="110" stroke="${ORANGE}" stroke-width="1.6" marker-end="url(#om-o)"/>
<text x="470" y="114" fill="${ORANGE}">propagation</text>
<text x="40" y="140" fill="currentColor">Onde longitudinale (son, ressort) : perturbation ∥ propagation (compressions / dilatations)</text>
${dots.join('')}
<line x1="200" y1="220" x2="240" y2="220" stroke="${RED}" stroke-width="1.6" marker-start="url(#om-r)" marker-end="url(#om-r)"/>
<text x="250" y="224" fill="${RED}">déplacement des tranches d'air</text>
</svg>`
})()

/* ------------------------------------------------------------------ */

const chapter: Chapter = {
  id: 'ondes-mecaniques',
  subject: 'physique-chimie',
  order: 12,
  title: 'Ondes mécaniques',
  theme: 'Ondes et signaux',
  summary:
    'Onde mécanique progressive, célérité et retard ; ondes périodiques et sinusoïdales : période, longueur d’onde, double périodicité, relation v = λ/T ; ondes sonores et mesures à l’oscilloscope.',
  duration: '2 semaines',
  objectives: [
    'Décrire, dans le cas d’une onde mécanique progressive, la propagation d’une perturbation mécanique d’un milieu dans l’espace et au cours du temps.',
    'Distinguer onde transversale et onde longitudinale.',
    'Exploiter la relation entre la durée de propagation (retard), la distance parcourue et la célérité : $\\tau = \\dfrac{d}{v}$.',
    'Définir et déterminer la période $T$ et la fréquence $f$ d’une onde périodique.',
    'Définir et déterminer la longueur d’onde $\\lambda$ ; exploiter la double périodicité.',
    'Exploiter la relation $v = \\dfrac{\\lambda}{T} = \\lambda f$.',
    'Exploiter des représentations spatiale et temporelle d’une onde sinusoïdale.',
    'Déterminer une célérité, une période, une longueur d’onde à l’aide d’un oscilloscope ou d’une acquisition (capacité expérimentale).',
  ],
  keywords: ['onde progressive', 'célérité', 'retard', 'période', 'fréquence', 'longueur d’onde', 'double périodicité', 'onde sonore', 'ultrasons', 'oscilloscope', 'en phase', 'opposition de phase'],

  /* ================================================================ */
  fiche: [
    { type: 'h2', text: 'Onde mécanique progressive' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Définition',
      content: [
        {
          type: 'p',
          text: r`Une **onde mécanique progressive** est la propagation d'une **perturbation** dans un **milieu matériel**, **sans transport de matière** mais **avec transport d'énergie**.`,
        },
      ],
    },
    {
      type: 'table',
      headers: ['Type', 'Direction de la perturbation', 'Exemples'],
      rows: [
        ['Transversale', 'perpendiculaire à la propagation', 'corde, surface de l’eau, ondes S'],
        ['Longitudinale', 'parallèle à la propagation', 'son, ressort comprimé, ondes P'],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Célérité et retard',
      content: [
        {
          type: 'p',
          text: r`$$v = \frac{d}{\Delta t} \qquad \tau = \frac{M_1M_2}{v}$$ Le point $M_2$ reproduit le mouvement de $M_1$ avec un **retard** $\tau$ : $y_{M_2}(t) = y_{M_1}(t - \tau)$. La célérité dépend du **milieu** (pas de la forme de la perturbation).`,
        },
      ],
    },
    { type: 'h2', text: 'Ondes périodiques et sinusoïdales' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Période $T$ (s)', value: 'plus petite durée au bout de laquelle un point du milieu retrouve le même état vibratoire : **périodicité temporelle**.' },
        { key: 'Fréquence $f$ (Hz)', value: '$f = \\dfrac{1}{T}$ : nombre de périodes par seconde.' },
        { key: 'Longueur d’onde $\\lambda$ (m)', value: 'plus petite distance séparant deux points dans le même état vibratoire (en phase) : **périodicité spatiale**. C’est la distance parcourue par l’onde en une période.' },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Relation fondamentale',
      content: [{ type: 'math', tex: String.raw`v = \frac{\lambda}{T} = \lambda\,f` }],
    },
    {
      type: 'table',
      headers: ['Distance entre deux points', 'État vibratoire'],
      rows: [
        ['$d = k\\lambda$ ($k$ entier)', '**en phase** (vibrent identiquement)'],
        ['$d = (k + \\tfrac12)\\lambda$', '**en opposition de phase**'],
      ],
    },
    { type: 'h2', text: 'Ondes sonores' },
    {
      type: 'list',
      items: [
        'Ondes **longitudinales** de compression/dilatation : ne se propagent **pas dans le vide**.',
        'Célérité dans l’air à 20 °C : $v \\approx 340\\ \\text{m·s}^{-1}$ ; dans l’eau : $\\approx 1\\,500\\ \\text{m·s}^{-1}$ ; dans l’acier : $\\approx 5\\,000\\ \\text{m·s}^{-1}$.',
        'Audibles : 20 Hz à 20 kHz ; infrasons < 20 Hz ; ultrasons > 20 kHz.',
        'Écho : $d = \\dfrac{v\\,\\Delta t}{2}$ (aller-retour).',
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Lecture d’oscillogramme',
      content: [
        { type: 'p', text: r`Durée = (nombre de divisions) × (base de temps). Pour plus de précision, mesurer **plusieurs périodes** et diviser.` },
      ],
    },
  ],

  /* ================================================================ */
  cours: [
    { type: 'h2', text: '1. Onde mécanique progressive' },
    { type: 'h3', text: '1.1 Définition' },
    {
      type: 'p',
      text: r`Lorsqu'on agite l'extrémité d'une corde tendue, une « bosse » se déplace le long de la corde. Chaque point de la corde se soulève puis redescend, **sans avancer** : c'est la **perturbation** qui se déplace, pas la matière.`,
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Onde mécanique progressive',
      content: [
        {
          type: 'p',
          text: r`On appelle **onde mécanique progressive** le phénomène de propagation d'une perturbation dans un milieu matériel, **sans transport de matière**, mais **avec transport d'énergie**. La perturbation est une modification locale et temporaire d'une propriété mécanique du milieu (position, pression…).`,
        },
      ],
    },
    {
      type: 'list',
      items: [
        r`Une onde mécanique a besoin d'un **milieu matériel** (solide, liquide, gaz) : elle ne se propage pas dans le vide (contrairement à la lumière, onde électromagnétique).`,
        r`Elle se propage dans **toutes les directions** qui lui sont offertes : à 1 dimension (corde), 2 dimensions (surface de l'eau), 3 dimensions (son dans l'air).`,
        r`Le **transport d'énergie** se manifeste par exemple par la mise en mouvement d'un bouchon flottant, la vibration du tympan, les dégâts d'un séisme.`,
      ],
    },
    { type: 'h3', text: '1.2 Ondes transversales et longitudinales' },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Onde transversale', text: 'La perturbation (déplacement des points du milieu) est perpendiculaire à la direction de propagation. Ex. : corde, vagues, ondes sismiques S.', icon: 'MoveVertical' },
        { title: 'Onde longitudinale', text: 'La perturbation est parallèle à la direction de propagation : compressions et dilatations. Ex. : son, ressort, ondes sismiques P.', icon: 'MoveHorizontal' },
      ],
    },
    { type: 'svg', svg: svgLongTrans, caption: 'Onde transversale le long d’une corde et onde longitudinale (son).', maxWidth: 640 },
    { type: 'h3', text: '1.3 Célérité' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Célérité',
      content: [
        {
          type: 'p',
          text: r`La **célérité** $v$ d'une onde est la vitesse de propagation de la perturbation. Si la perturbation parcourt la distance $d$ pendant la durée $\Delta t$ : $$v = \frac{d}{\Delta t}$$ $v$ en $\text{m·s}^{-1}$, $d$ en m, $\Delta t$ en s.`,
        },
      ],
    },
    { type: 'svg', svg: svgCorde, caption: 'Propagation d’une perturbation le long d’une corde entre les dates t₁ et t₂.', maxWidth: 640 },
    {
      type: 'p',
      text: r`La célérité **dépend du milieu de propagation** (de sa nature, de sa rigidité, de sa température, de la tension d'une corde…), mais **pas** de la forme ni de l'amplitude de la perturbation (dans le cadre du programme).`,
    },
    {
      type: 'table',
      headers: ['Onde', 'Milieu', 'Célérité approximative'],
      rows: [
        ['Son', 'air à 20 °C', '$340\\ \\text{m·s}^{-1}$'],
        ['Son', 'eau', '$1\\,500\\ \\text{m·s}^{-1}$'],
        ['Son', 'acier', '$5\\,000$ à $6\\,000\\ \\text{m·s}^{-1}$'],
        ['Ondes sismiques P', 'croûte terrestre', '$6$ à $8\\ \\text{km·s}^{-1}$'],
        ['Ondes sismiques S', 'croûte terrestre', '$3{,}5$ à $4{,}5\\ \\text{km·s}^{-1}$'],
        ['Vague (houle)', 'océan', 'quelques $\\text{m·s}^{-1}$ à $\\approx 10\\ \\text{m·s}^{-1}$'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Célérité ≠ vitesse des points du milieu',
      content: [
        { type: 'p', text: r`La célérité est la vitesse de la **perturbation**. Un point de la corde, lui, oscille sur place avec une vitesse qui n'a rien à voir avec $v$.` },
      ],
    },
    { type: 'h3', text: '1.4 Retard' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Retard',
      content: [
        {
          type: 'p',
          text: r`Soient deux points $M_1$ et $M_2$ du milieu, $M_2$ étant plus loin de la source sur la direction de propagation. Le point $M_2$ reproduit le mouvement de $M_1$ avec un **retard** $$\tau = \frac{M_1M_2}{v}$$ Autrement dit, l'état de $M_2$ à la date $t$ est celui qu'avait $M_1$ à la date $t - \tau$ : $y_{M_2}(t) = y_{M_1}(t - \tau)$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : foudre et tonnerre',
      content: [
        {
          type: 'p',
          text: r`On entend le tonnerre $\tau = 6{,}0\ \text{s}$ après avoir vu l'éclair (la lumière arrive quasi instantanément). Distance de l'orage : $d = v\,\tau = 340 \times 6{,}0 = 2{,}0\times10^{3}\ \text{m} = 2{,}0\ \text{km}$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Mesurer la célérité du son',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Montage', text: 'Deux microphones M₁ et M₂ alignés avec la source, distants de $d$, reliés aux deux voies d’un oscilloscope (ou d’une carte d’acquisition).' },
            { title: 'Signal', text: 'Produire un son bref (claquement) : il atteint M₁ puis M₂.' },
            { title: 'Mesure', text: 'Mesurer le décalage $\\tau$ entre les débuts des deux signaux.' },
            { title: 'Calcul', text: '$v = d/\\tau$. Répéter pour plusieurs distances : $d = v\\tau$ est une droite passant par l’origine de pente $v$.' },
          ],
        },
      ],
    },
    { type: 'h2', text: '2. Ondes mécaniques progressives périodiques' },
    { type: 'h3', text: '2.1 Périodicité temporelle' },
    {
      type: 'p',
      text: r`Si la source impose une perturbation qui se répète identique à elle-même à intervalles de temps réguliers, l'onde est **périodique**. Chaque point du milieu reproduit alors un mouvement périodique.`,
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Période et fréquence',
      content: [
        {
          type: 'p',
          text: r`La **période** $T$ (en s) est la plus petite durée au bout de laquelle un point du milieu se retrouve dans le même état vibratoire. La **fréquence** $f$ (en hertz, Hz) est le nombre de périodes par seconde : $$f = \frac{1}{T}$$ La période et la fréquence de l'onde sont **imposées par la source** et ne dépendent pas du milieu.`,
        },
      ],
    },
    {
      type: 'p',
      text: r`Une onde **sinusoïdale** est une onde périodique pour laquelle l'élongation d'un point est une fonction sinusoïdale du temps. Son **amplitude** est la valeur maximale de l'élongation.`,
    },
    { type: 'svg', svg: svgTemporel, caption: 'Représentation temporelle : élongation d’un point M en fonction du temps. Ici T = 10 ms, donc f = 100 Hz.', maxWidth: 620 },
    { type: 'h3', text: '2.2 Périodicité spatiale : longueur d’onde' },
    {
      type: 'p',
      text: r`Prenons une « photographie » du milieu à une date donnée (représentation **spatiale**) : l'aspect du milieu se répète régulièrement dans l'espace.`,
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Longueur d’onde',
      content: [
        {
          type: 'p',
          text: r`La **longueur d'onde** $\lambda$ (en m) est la plus petite distance séparant deux points du milieu qui vibrent **en phase** (dans le même état vibratoire à chaque instant). C'est aussi la distance parcourue par l'onde pendant une période $T$.`,
        },
      ],
    },
    { type: 'svg', svg: svgSpatial, caption: 'Représentation spatiale à une date fixée : ici λ = 1,0 m.', maxWidth: 620 },
    { type: 'h3', text: '2.3 Relation entre célérité, longueur d’onde et période' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Relation fondamentale',
      content: [
        {
          type: 'p',
          text: r`Pendant une période $T$, l'onde parcourt une longueur d'onde $\lambda$. Donc : $$v = \frac{\lambda}{T} \quad \Longleftrightarrow \quad \lambda = v\,T = \frac{v}{f}$$`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Justification',
      content: [
        {
          type: 'p',
          text: r`Un point $M$ situé à la distance $\lambda$ de la source vibre en phase avec elle : il reproduit son mouvement avec un retard égal à un nombre entier de périodes, le plus petit possible, soit $\tau = T$. Or $\tau = \lambda / v$. D'où $\lambda / v = T$, soit $\lambda = vT$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : le la du diapason',
      content: [
        {
          type: 'p',
          text: r`Le diapason émet un son de fréquence $f = 440\ \text{Hz}$. Dans l'air : $T = \dfrac{1}{440} = 2{,}27\times10^{-3}\ \text{s}$ et $\lambda = \dfrac{v}{f} = \dfrac{340}{440} = 0{,}773\ \text{m}$. Dans l'eau ($v = 1500\ \text{m·s}^{-1}$), la fréquence reste $440\ \text{Hz}$ mais $\lambda = 1500/440 = 3{,}41\ \text{m}$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ce qui change quand l’onde change de milieu',
      content: [
        { type: 'p', text: r`La **fréquence** (imposée par la source) ne change pas ; la **célérité** change, donc la **longueur d'onde** change aussi.` },
      ],
    },
    { type: 'h3', text: '2.4 Double périodicité' },
    {
      type: 'p',
      text: r`Une onde périodique possède donc une **double périodicité** : **temporelle** (période $T$, visible sur la représentation $y_M = f(t)$ d'un point fixé) et **spatiale** (longueur d'onde $\lambda$, visible sur la représentation $y = f(x)$ à une date fixée).`,
    },
    {
      type: 'table',
      headers: ['', 'Représentation temporelle', 'Représentation spatiale'],
      rows: [
        ['Ce qu’on fixe', 'un point M du milieu', 'une date t'],
        ['Axe horizontal', 'temps t', 'position x'],
        ['Période lue', 'T (en s)', 'λ (en m)'],
        ['Analogie', '« enregistrement vidéo » d’un point', '« photographie » du milieu'],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Points en phase, en opposition de phase',
      content: [
        {
          type: 'list',
          items: [
            r`Deux points distants de $d = k\lambda$ ($k$ entier) vibrent **en phase** : le retard $\tau = kT$ est un nombre entier de périodes.`,
            r`Deux points distants de $d = \left(k + \tfrac12\right)\lambda$ vibrent **en opposition de phase** : quand l'un est en haut, l'autre est en bas.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        {
          type: 'p',
          text: r`Une onde de période $T = 0{,}20\ \text{s}$ se propage à $v = 2{,}0\ \text{m·s}^{-1}$ : $\lambda = vT = 0{,}40\ \text{m}$. Un point à $1{,}0\ \text{m}$ de la source est à $\dfrac{1{,}0}{0{,}40} = 2{,}5\,\lambda$ : il vibre en **opposition de phase** avec la source. Son retard vaut $\tau = 1{,}0/2{,}0 = 0{,}50\ \text{s} = 2{,}5\,T$.`,
        },
      ],
    },
    { type: 'h2', text: '3. Ondes sonores et ultrasonores' },
    {
      type: 'p',
      text: r`Un son est une onde mécanique **longitudinale** : la source (membrane de haut-parleur, cordes vocales) comprime et dilate alternativement les tranches d'air voisines ; ces variations de **pression** se propagent de proche en proche. Le son ne se propage pas dans le vide.`,
    },
    {
      type: 'table',
      headers: ['Domaine', 'Fréquences', 'Exemples'],
      rows: [
        ['Infrasons', '$f < 20$ Hz', 'séismes, éléphants, éoliennes'],
        ['Sons audibles (humain)', '$20$ Hz à $20$ kHz', 'voix, musique'],
        ['Ultrasons', '$f > 20$ kHz', 'échographie, sonar, chauves-souris, télémètre'],
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Principe de l’écho (sonar, échographie, télémètre)',
      content: [
        {
          type: 'p',
          text: r`Un émetteur envoie une salve qui se réfléchit sur un obstacle et revient à un récepteur situé au même endroit. Si $\Delta t$ est la durée entre émission et réception, l'onde a parcouru **l'aller-retour** $2d$ : $$2d = v\,\Delta t \quad \Rightarrow \quad d = \frac{v\,\Delta t}{2}$$`,
        },
      ],
    },
    { type: 'h2', text: '4. Mesures à l’oscilloscope' },
    {
      type: 'p',
      text: r`Un microphone convertit l'onde sonore en tension électrique, visualisée sur un **oscilloscope** (ou une interface d'acquisition). L'écran est quadrillé en **divisions** : la **base de temps** (en s/div ou ms/div) donne l'échelle horizontale, la **sensibilité verticale** (en V/div) l'échelle verticale.`,
    },
    { type: 'svg', svg: svgOscillo, caption: 'Oscillogramme : deux microphones M₁ (voie 1) et M₂ (voie 2) captant le même son sinusoïdal.', maxWidth: 620 },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exploitation de l’oscillogramme ci-dessus',
      content: [
        {
          type: 'list',
          items: [
            r`Une période occupe $4$ divisions : $T = 4 \times 0{,}5 = 2{,}0\ \text{ms}$, donc $f = \dfrac{1}{2{,}0\times10^{-3}} = 500\ \text{Hz}$.`,
            r`Amplitude voie 1 : $2$ div × $1\ \text{V/div} = 2{,}0\ \text{V}$.`,
            r`Le signal de M₂ est décalé de $1$ division : $\tau = 0{,}5\ \text{ms}$ (modulo $T$ : on ne peut pas savoir, sur ce seul enregistrement, si le retard est $0{,}5$ ms, $2{,}5$ ms, $4{,}5$ ms…).`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Mesurer une longueur d’onde avec deux microphones',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Coïncidence', text: 'Placer M₁ et M₂ côte à côte : les deux courbes sont en phase.' },
            { title: 'Déplacement', text: 'Éloigner lentement M₂ de la source : les courbes se décalent, puis se retrouvent en phase quand M₁M₂ = λ.' },
            { title: 'Précision', text: 'Compter $n$ retours en phase successifs sur la distance $D$ : $\\lambda = D/n$ (mesurer plusieurs λ réduit l’incertitude).' },
            { title: 'Exploitation', text: 'Connaissant $f$ (lue sur l’oscilloscope ou sur le GBF), calculer $v = \\lambda f$.' },
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Précision des mesures',
      content: [
        { type: 'p', text: r`Pour mesurer $T$, on mesure la durée de **plusieurs périodes** ($nT$) puis on divise par $n$ : l'incertitude de lecture est répartie sur $n$ périodes. Même idée pour $\lambda$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Histoire des sciences',
      content: [
        {
          type: 'p',
          text: r`En 1822, une mesure célèbre de la vitesse du son est réalisée près de Paris (Villejuif – Montlhéry, environ 18,6 km) en chronométrant le décalage entre l'éclair et la détonation de coups de canon : on trouve environ $340\ \text{m·s}^{-1}$. En 1826, Colladon et Sturm mesurent la célérité du son dans l'eau du lac Léman (environ $1\,435\ \text{m·s}^{-1}$).`,
        },
      ],
    },
  ],

  /* ================================================================ */
  exercices: [
    {
      id: 'om-retard',
      title: 'Calculer un retard',
      difficulty: 1,
      duration: 5,
      tags: ['retard', 'célérité'],
      statement: [
        {
          type: 'p',
          text: r`Deux spectateurs sont situés à $34\ \text{m}$ et $51\ \text{m}$ d'une scène. Le son se propage à $v = 340\ \text{m·s}^{-1}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quelle est la nature (transversale ou longitudinale) de l’onde sonore ?',
            'Calculer la durée mise par le son pour atteindre chaque spectateur.',
            'Quel est le retard du second spectateur par rapport au premier ?',
          ],
        },
      ],
      hints: ['$\\Delta t = d/v$.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Le son est une onde **longitudinale** : les tranches d’air oscillent parallèlement à la direction de propagation.',
            r`$\Delta t_1 = \dfrac{34}{340} = 0{,}10\ \text{s}$ ; $\Delta t_2 = \dfrac{51}{340} = 0{,}15\ \text{s}$.`,
            r`$\tau = \Delta t_2 - \Delta t_1 = 0{,}050\ \text{s} = 50\ \text{ms}$ (ou directement $\tau = \dfrac{51 - 34}{340} = \dfrac{17}{340} = 0{,}050\ \text{s}$).`,
          ],
        },
      ],
    },
    {
      id: 'om-corde',
      title: 'Perturbation le long d’une corde',
      difficulty: 1,
      duration: 8,
      tags: ['célérité', 'onde transversale'],
      statement: [
        {
          type: 'p',
          text: r`On photographie une corde à deux dates : à $t_1 = 0{,}20\ \text{s}$, le front de la perturbation est à $x_1 = 1{,}2\ \text{m}$ de la source ; à $t_2 = 0{,}70\ \text{s}$, il est à $x_2 = 2{,}2\ \text{m}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'L’onde est-elle transversale ou longitudinale ?',
            'Calculer la célérité de l’onde.',
            'À quelle date le front atteindra-t-il le point M d’abscisse $x_M = 3{,}0$ m ?',
            'À quelle date la perturbation a-t-elle quitté la source ? Commenter.',
          ],
        },
      ],
      hints: ['$v = (x_2 - x_1)/(t_2 - t_1)$.', 'Le front part de $x = 0$.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Les points de la corde se déplacent perpendiculairement à la corde : onde **transversale**.',
            r`$v = \dfrac{2{,}2 - 1{,}2}{0{,}70 - 0{,}20} = \dfrac{1{,}0}{0{,}50} = 2{,}0\ \text{m·s}^{-1}$.`,
            r`Depuis $x_1$ : $\Delta t = \dfrac{3{,}0 - 1{,}2}{2{,}0} = 0{,}90\ \text{s}$, donc $t_M = 0{,}20 + 0{,}90 = 1{,}10\ \text{s}$.`,
            r`Le front a parcouru $1{,}2\ \text{m}$ en $\dfrac{1{,}2}{2{,}0} = 0{,}60\ \text{s}$ avant $t_1$ : il est parti de la source à $t_0 = 0{,}20 - 0{,}60 = -0{,}40\ \text{s}$, c'est-à-dire $0{,}40\ \text{s}$ **avant** le déclenchement du chronomètre. Rien d'anormal : l'origine des dates est arbitraire.`,
          ],
        },
      ],
    },
    {
      id: 'om-lambda',
      title: 'Longueur d’onde d’un son',
      difficulty: 1,
      duration: 6,
      tags: ['longueur d’onde', 'fréquence'],
      statement: [
        {
          type: 'p',
          text: r`Un haut-parleur émet un son de fréquence $f = 440\ \text{Hz}$ dans l'air ($v = 340\ \text{m·s}^{-1}$).`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la période $T$ du son.',
            'Calculer sa longueur d’onde dans l’air.',
            'Le son passe dans l’eau ($v = 1\\,500$ m·s⁻¹). Que deviennent $f$, $T$ et $\\lambda$ ?',
          ],
        },
      ],
      hints: ['$T = 1/f$, $\\lambda = v/f$.', 'La fréquence est imposée par la source.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$T = \dfrac{1}{f} = \dfrac{1}{440} = 2{,}27\times10^{-3}\ \text{s} \approx 2{,}3\ \text{ms}$.`,
            r`$\lambda = \dfrac{v}{f} = \dfrac{340}{440} = 0{,}773\ \text{m} \approx 77\ \text{cm}$.`,
            r`$f$ et $T$ ne changent pas (imposés par la source). $\lambda_{\text{eau}} = \dfrac{1500}{440} = 3{,}41\ \text{m}$ : la longueur d'onde est environ 4,4 fois plus grande.`,
          ],
        },
      ],
    },
    {
      id: 'om-echo',
      title: 'Écho et sonar',
      difficulty: 2,
      duration: 8,
      tags: ['écho', 'ultrasons'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Un randonneur crie face à une falaise et entend l’écho $0{,}40$ s plus tard. Calculer sa distance à la falaise ($v_{\\text{air}} = 340$ m·s⁻¹).',
            'Le sonar d’un bateau émet des ultrasons de fréquence $40$ kHz ; l’écho sur le fond revient $0{,}24$ s après l’émission. Calculer la profondeur ($v_{\\text{eau}} = 1\\,500$ m·s⁻¹).',
            'Calculer la longueur d’onde de ces ultrasons dans l’eau.',
          ],
        },
      ],
      hints: ['L’onde fait l’aller et le retour : $2d = v\\Delta t$.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$2d = v\,\Delta t$ donc $d = \dfrac{340 \times 0{,}40}{2} = 68\ \text{m}$.`,
            r`$h = \dfrac{1500 \times 0{,}24}{2} = 180\ \text{m}$.`,
            r`$\lambda = \dfrac{v}{f} = \dfrac{1500}{40\times10^{3}} = 3{,}75\times10^{-2}\ \text{m} \approx 3{,}8\ \text{cm}$.`,
          ],
        },
      ],
    },
    {
      id: 'om-oscillo',
      title: 'Lecture d’un oscillogramme',
      difficulty: 2,
      duration: 10,
      tags: ['oscilloscope', 'période', 'célérité'],
      statement: [
        { type: 'p', text: 'On utilise l’oscillogramme ci-dessous : deux microphones M₁ et M₂ sont alignés avec un haut-parleur, M₂ étant plus loin que M₁.' },
        { type: 'svg', svg: svgOscillo, maxWidth: 560 },
        {
          type: 'list',
          ordered: true,
          items: [
            'Déterminer la période et la fréquence du son.',
            'Pourquoi l’amplitude de la voie 2 est-elle plus faible ?',
            'On éloigne M₂ en partant de la position où les deux signaux sont en phase. On compte 5 nouvelles coïncidences sur une distance de $3{,}40$ m. En déduire $\\lambda$ puis la célérité du son.',
          ],
        },
      ],
      hints: ['Base de temps : 0,5 ms/div.', '5 coïncidences successives correspondent à 5λ.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`Une période occupe 4 divisions : $T = 4 \times 0{,}5 = 2{,}0\ \text{ms}$ ; $f = \dfrac{1}{2{,}0\times10^{-3}} = 500\ \text{Hz}$.`,
            r`M₂ est plus éloigné : l'énergie de l'onde se répartit sur une surface plus grande (et une partie est absorbée par l'air), d'où une amplitude plus faible.`,
            r`$5\lambda = 3{,}40\ \text{m}$ donc $\lambda = 0{,}680\ \text{m}$ ; $v = \lambda f = 0{,}680 \times 500 = 340\ \text{m·s}^{-1}$.`,
          ],
        },
      ],
    },
    {
      id: 'om-seisme',
      title: 'Localiser l’épicentre d’un séisme',
      difficulty: 2,
      duration: 12,
      tags: ['ondes sismiques', 'retard'],
      statement: [
        {
          type: 'p',
          text: r`Un sismographe enregistre l'arrivée des ondes P ($v_P = 6{,}0\ \text{km·s}^{-1}$), puis, $\Delta t = 20\ \text{s}$ plus tard, celle des ondes S ($v_S = 3{,}5\ \text{km·s}^{-1}$), émises au même instant au foyer du séisme.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Les ondes P sont longitudinales, les ondes S transversales. Expliquer ces termes.',
            'Exprimer $\\Delta t$ en fonction de la distance $d$, $v_P$ et $v_S$.',
            'En déduire $d$.',
          ],
        },
      ],
      hints: ['$\\Delta t = t_S - t_P = d/v_S - d/v_P$.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Onde P : déplacement des roches parallèle à la propagation (compression) ; onde S : déplacement perpendiculaire à la propagation (cisaillement).',
            r`$\Delta t = \dfrac{d}{v_S} - \dfrac{d}{v_P} = d\left(\dfrac{1}{v_S} - \dfrac{1}{v_P}\right) = d\,\dfrac{v_P - v_S}{v_P\,v_S}$.`,
            r`$d = \dfrac{\Delta t\, v_P\, v_S}{v_P - v_S} = \dfrac{20 \times 6{,}0 \times 3{,}5}{6{,}0 - 3{,}5} = \dfrac{420}{2{,}5} = 168\ \text{km} \approx 1{,}7\times10^{2}\ \text{km}$. Avec trois stations, on localise l'épicentre à l'intersection de trois cercles.`,
          ],
        },
      ],
    },
    {
      id: 'om-houle',
      title: 'La houle : double périodicité',
      difficulty: 2,
      duration: 10,
      tags: ['double périodicité', 'opposition de phase'],
      statement: [
        {
          type: 'p',
          text: r`Au large, une houle a une longueur d'onde $\lambda = 60\ \text{m}$. Un bouchon flottant monte et descend : on mesure $10$ oscillations en $62\ \text{s}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Déterminer la période de la houle.',
            'Calculer sa célérité.',
            'Deux bouchons sont distants de 30 m dans la direction de propagation ; puis de 120 m. Comparer leurs mouvements.',
            'Le bouchon avance-t-il avec la houle ? Justifier.',
          ],
        },
      ],
      hints: ['$T = 62/10$.', '30 m = λ/2.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$T = \dfrac{62}{10} = 6{,}2\ \text{s}$.`,
            r`$v = \dfrac{\lambda}{T} = \dfrac{60}{6{,}2} = 9{,}7\ \text{m·s}^{-1}$ (environ $35\ \text{km·h}^{-1}$).`,
            r`$30\ \text{m} = \lambda/2$ : bouchons en **opposition de phase** (l'un est sur une crête quand l'autre est dans un creux). $120\ \text{m} = 2\lambda$ : bouchons **en phase**.`,
            r`Non : une onde progressive transporte de l'énergie **sans transport de matière** ; le bouchon oscille autour d'une position moyenne.`,
          ],
        },
      ],
    },
    {
      id: 'om-telemetre-bac',
      title: 'Type bac — Télémètre à ultrasons',
      difficulty: 3,
      duration: 25,
      tags: ['type bac', 'ultrasons', 'oscilloscope', 'écho'],
      statement: [
        {
          type: 'p',
          text: r`Un télémètre de robot utilise un émetteur et un récepteur d'ultrasons. **Partie A.** L'émetteur est alimenté en continu. Sur l'oscilloscope (base de temps $10\ \mu\text{s/div}$), une période du signal reçu occupe $2{,}5$ divisions. **Partie B.** Deux récepteurs R₁ et R₂ sont placés face à l'émetteur, d'abord côte à côte (signaux en phase). On recule R₂ et on compte 10 nouvelles positions où les signaux sont en phase ; R₂ a alors reculé de $8{,}5\ \text{cm}$. **Partie C.** Le télémètre fonctionne en salves : l'écho sur un mur revient $\Delta t = 5{,}0\ \text{ms}$ après l'émission.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'A. Déterminer la période et la fréquence des ultrasons. Justifier le terme « ultrasons ».',
            'B. Déterminer la longueur d’onde. Pourquoi est-il préférable de compter 10 longueurs d’onde plutôt qu’une seule ?',
            'B. En déduire la célérité des ultrasons dans l’air.',
            'C. Calculer la distance entre le robot et le mur.',
            'C. Le télémètre ne peut pas mesurer de distance inférieure à environ 2 cm. Proposer une explication sachant qu’une salve dure environ 0,1 ms.',
          ],
        },
      ],
      hints: [
        '$T = 2{,}5 \\times 10\\ \\mu$s.',
        '$10\\lambda = 8{,}5$ cm.',
        'Pendant que l’émetteur envoie la salve, le récepteur ne peut pas distinguer l’écho.',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$T = 2{,}5 \times 10 = 25\ \mu\text{s} = 2{,}5\times10^{-5}\ \text{s}$ ; $f = \dfrac{1}{T} = 4{,}0\times10^{4}\ \text{Hz} = 40\ \text{kHz}$. C'est supérieur à $20\ \text{kHz}$ : inaudible pour l'être humain, ce sont des ultrasons.`,
            r`$10\lambda = 8{,}5\ \text{cm}$ donc $\lambda = 0{,}85\ \text{cm} = 8{,}5\times10^{-3}\ \text{m}$. Mesurer 10 λ divise l'incertitude de positionnement (environ 1 mm) par 10 sur la valeur de $\lambda$.`,
            r`$v = \lambda f = 8{,}5\times10^{-3} \times 4{,}0\times10^{4} = 340\ \text{m·s}^{-1}$ (cohérent avec la célérité du son dans l'air).`,
            r`Aller-retour : $d = \dfrac{v\,\Delta t}{2} = \dfrac{340 \times 5{,}0\times10^{-3}}{2} = 0{,}85\ \text{m}$.`,
            r`Pendant l'émission de la salve ($\approx 0{,}1\ \text{ms}$), l'écho d'un obstacle proche revient alors que l'émetteur émet encore : les deux signaux se superposent. La distance limite est de l'ordre de $\dfrac{340 \times 0{,}1\times10^{-3}}{2} \approx 1{,}7\times10^{-2}\ \text{m} \approx 2\ \text{cm}$.`,
          ],
        },
      ],
    },
    {
      id: 'om-representations',
      title: 'Représentations spatiale et temporelle',
      difficulty: 3,
      duration: 15,
      tags: ['double périodicité', 'retard', 'opposition de phase'],
      statement: [
        {
          type: 'p',
          text: r`Une source S impose à l'extrémité d'une longue corde un mouvement sinusoïdal de période $T = 0{,}20\ \text{s}$ et d'amplitude $2{,}0\ \text{cm}$, à partir de $t = 0$ (la source monte d'abord). L'onde se propage à $v = 2{,}0\ \text{m·s}^{-1}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la longueur d’onde.',
            'À quelle date le point M, situé à 1,0 m de S, commence-t-il à bouger ? Dans quel sens ?',
            'Comparer, une fois le régime établi, le mouvement de M à celui de S.',
            'À $t = 0{,}60$ s, quelle longueur de corde est perturbée ? Combien de longueurs d’onde cela représente-t-il ? Dessiner l’allure de la corde.',
          ],
        },
      ],
      hints: ['$\\lambda = vT$.', 'Tout point commence comme la source (il reproduit son mouvement avec retard).'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$\lambda = vT = 2{,}0 \times 0{,}20 = 0{,}40\ \text{m}$.`,
            r`Retard : $\tau = \dfrac{SM}{v} = \dfrac{1{,}0}{2{,}0} = 0{,}50\ \text{s}$. M commence à bouger à $t = 0{,}50\ \text{s}$ et, comme il reproduit le mouvement de la source, il **monte** d'abord.`,
            r`$SM = 1{,}0\ \text{m} = 2{,}5\,\lambda$ (ou $\tau = 2{,}5\,T$) : M vibre en **opposition de phase** avec S (quand S est en haut, M est en bas).`,
            r`Le front a parcouru $d = v t = 2{,}0 \times 0{,}60 = 1{,}2\ \text{m}$, soit $1{,}2/0{,}40 = 3$ longueurs d'onde : trois « sinusoïdes » complètes entre S et le front, le reste de la corde étant au repos. À cette date ($t = 3T$) la source repasse par sa position de repos en montant.`,
          ],
        },
      ],
    },
  ],

  /* ================================================================ */
  representations: [
    {
      type: 'widget',
      id: 'wave-simulator',
      title: 'Simulateur d’onde progressive sinusoïdale',
      caption: 'Modifiez la période et la longueur d’onde : observez la célérité v = λ/T, le retard d’un point et la double périodicité.',
    },
    { type: 'svg', svg: svgSpatial, caption: 'Périodicité spatiale : λ.', maxWidth: 620 },
    { type: 'svg', svg: svgTemporel, caption: 'Périodicité temporelle : T.', maxWidth: 620 },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Une onde mécanique progressive transporte :',
          choices: ['de la matière', 'de l’énergie sans transport de matière', 'de la matière et de l’énergie', 'rien'],
          answer: 1,
        },
        {
          question: 'Le son peut-il se propager dans le vide ?',
          choices: ['Oui, à 340 m/s', 'Oui, à la vitesse de la lumière', 'Non', 'Seulement les ultrasons'],
          answer: 2,
          explanation: 'Une onde mécanique nécessite un milieu matériel.',
        },
        {
          question: 'Un son de fréquence 680 Hz dans l’air (340 m/s) a une longueur d’onde :',
          choices: ['2,0 m', '0,50 m', '231 km', '1,0 m'],
          answer: 1,
          explanation: '$\\lambda = v/f = 340/680 = 0{,}50$ m.',
        },
        {
          question: 'Deux points distants de 1,5λ vibrent :',
          choices: ['en phase', 'en opposition de phase', 'sans relation', 'avec un retard de 1,5 s'],
          answer: 1,
          explanation: '$1{,}5\\lambda = (1 + \\tfrac12)\\lambda$.',
        },
        {
          question: 'Quand une onde sonore passe de l’air dans l’eau, ce qui ne change pas est :',
          choices: ['la célérité', 'la longueur d’onde', 'la fréquence', 'rien'],
          answer: 2,
        },
        {
          question: 'Sur un oscilloscope réglé à 2 ms/div, 3 périodes occupent 6 divisions. La fréquence vaut :',
          choices: ['250 Hz', '83 Hz', '500 Hz', '12 Hz'],
          answer: 0,
          explanation: '$3T = 12$ ms donc $T = 4{,}0$ ms et $f = 250$ Hz.',
        },
        {
          question: 'La représentation y = f(x) à une date fixée permet de lire :',
          choices: ['la période', 'la fréquence', 'la longueur d’onde', 'la célérité directement'],
          answer: 2,
        },
        {
          question: 'Une onde se propage à 5,0 m/s. Le retard entre deux points distants de 2,0 m vaut :',
          choices: ['10 s', '2,5 s', '0,40 s', '7,0 s'],
          answer: 2,
          explanation: '$\\tau = d/v = 2{,}0/5{,}0 = 0{,}40$ s.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Onde mécanique progressive', back: 'Propagation d’une perturbation dans un milieu matériel, sans transport de matière, avec transport d’énergie.' },
        { front: 'Onde transversale', back: 'Perturbation perpendiculaire à la direction de propagation (corde, vagues, ondes S).' },
        { front: 'Onde longitudinale', back: 'Perturbation parallèle à la propagation (son, ondes P).' },
        { front: 'Célérité', back: '$v = d/\\Delta t$ ; dépend du milieu.' },
        { front: 'Retard', back: '$\\tau = M_1M_2/v$ ; $y_{M_2}(t) = y_{M_1}(t - \\tau)$.' },
        { front: 'Période / fréquence', back: '$f = 1/T$ ; imposées par la source.' },
        { front: 'Longueur d’onde', back: 'Plus petite distance entre deux points en phase ; distance parcourue en une période.' },
        { front: 'Relation fondamentale', back: '$v = \\lambda/T = \\lambda f$' },
        { front: 'Points en opposition de phase', back: 'Distants de $(k + \\tfrac12)\\lambda$.' },
        { front: 'Domaine audible', back: '20 Hz – 20 kHz ; ultrasons au-delà de 20 kHz.' },
        { front: 'Écho', back: '$d = v\\Delta t/2$ (aller-retour).' },
        { front: 'Célérité du son', back: 'air ≈ 340 m/s ; eau ≈ 1 500 m/s ; acier ≈ 5 000 m/s.' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque grandeur à sa définition',
      pairs: [
        { left: 'Période $T$', right: 'Périodicité temporelle (s)' },
        { left: 'Longueur d’onde $\\lambda$', right: 'Périodicité spatiale (m)' },
        { left: 'Fréquence $f$', right: 'Nombre de périodes par seconde (Hz)' },
        { left: 'Célérité $v$', right: 'Vitesse de propagation de la perturbation (m/s)' },
        { left: 'Retard $\\tau$', right: 'Durée de propagation entre deux points (s)' },
        { left: 'Amplitude', right: 'Élongation maximale' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'Une onde mécanique ne se propage pas dans le {{vide}}. Le son est une onde {{longitudinale}}. La longueur d’onde est la distance parcourue par l’onde pendant une {{période}}. On a donc $\\lambda = v \\times T$, soit $v = \\lambda \\times$ {{f|la fréquence}}. Deux points séparés d’un nombre entier de longueurs d’onde vibrent en {{phase}}.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'La célérité d’une onde dépend de son amplitude.', answer: false, explanation: 'Elle dépend du milieu de propagation.' },
        { text: 'Un point d’une corde parcourue par une onde avance avec l’onde.', answer: false, explanation: 'Il oscille sur place.' },
        { text: 'Si la fréquence double, à célérité constante, la longueur d’onde est divisée par 2.', answer: true, explanation: '$\\lambda = v/f$.' },
        { text: 'Les ultrasons ont une fréquence inférieure à 20 Hz.', answer: false, explanation: 'Ce sont les infrasons ; ultrasons > 20 kHz.' },
        { text: 'Le son va plus vite dans l’eau que dans l’air.', answer: true, explanation: '≈ 1 500 m/s contre 340 m/s.' },
      ],
    },
  ],
}

export default chapter
