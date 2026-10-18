import type { Chapter } from '../types'

const r = String.raw

/* ------------------------------------------------------------------ */
/* Constructions optiques générées par calcul (relation de conjugaison) */
/* ------------------------------------------------------------------ */

const FONT = 'font-family="Geist, sans-serif"'
const BLUE = 'hsl(217 91% 60%)'
const RED = 'hsl(0 84% 60%)'
const GREEN = 'hsl(142 71% 45%)'
const ORANGE = 'hsl(25 95% 53%)'
const VIOLET = 'hsl(263 70% 60%)'

interface LensOpts {
  f: number // distance focale (cm)
  OA: number // mesure algébrique de OA (cm), négative
  AB: number // hauteur algébrique de l'objet (cm)
  s: number // échelle px/cm
  xL: number // abscisse de la lentille (px)
  y0: number // ordonnée de l'axe (px)
  W: number // largeur du viewBox
  H: number // hauteur du viewBox
  id: string // préfixe unique pour les marqueurs
  third?: boolean // tracer le rayon passant par F
  title?: string
}

const n = (v: number) => v.toFixed(1)

/** Symbole d'une lentille convergente (double flèche). */
const lensSymbol = (x: number, yTop: number, yBot: number) =>
  `<line x1="${x}" y1="${yTop}" x2="${x}" y2="${yBot}" stroke="currentColor" stroke-width="2"/>` +
  `<path d="M${x - 7} ${yTop + 9} L${x} ${yTop} L${x + 7} ${yTop + 9}" fill="none" stroke="currentColor" stroke-width="2"/>` +
  `<path d="M${x - 7} ${yBot - 9} L${x} ${yBot} L${x + 7} ${yBot - 9}" fill="none" stroke="currentColor" stroke-width="2"/>`

const arrowDefs = (id: string) => `<defs>
<marker id="${id}-k" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker>
<marker id="${id}-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${BLUE}"/></marker>
<marker id="${id}-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${RED}"/></marker>
<marker id="${id}-g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${GREEN}"/></marker>
<marker id="${id}-o" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${ORANGE}"/></marker>
<marker id="${id}-v" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${VIOLET}"/></marker>
</defs>`

function lensConstruction(o: LensOpts): string {
  const { f, OA, AB, s, xL, y0, W, H, id } = o
  const OAp = 1 / (1 / f + 1 / OA)
  const gamma = OAp / OA
  const ApBp = gamma * AB
  const X = (cm: number) => xL + s * cm
  const Y = (cm: number) => y0 - s * cm
  const xA = X(OA)
  const yB = Y(AB)
  const xAp = X(OAp)
  const yBp = Y(ApBp)
  const xF = X(-f)
  const xFp = X(f)
  const real = OAp > 0
  const xEnd = W - 15
  const out: string[] = []
  // axe optique
  out.push(`<line x1="10" y1="${y0}" x2="${W - 8}" y2="${y0}" stroke="currentColor" stroke-width="1" stroke-dasharray="8 4 2 4" stroke-opacity="0.7"/>`)
  out.push(lensSymbol(xL, 20, H - 20))
  // foyers
  for (const [x, lab] of [[xF, 'F'], [xFp, "F'"]] as const) {
    out.push(`<line x1="${x}" y1="${y0 - 5}" x2="${x}" y2="${y0 + 5}" stroke="currentColor" stroke-width="1.6"/>`)
    out.push(`<text x="${x}" y="${y0 + 20}" text-anchor="middle" fill="currentColor">${lab}</text>`)
  }
  out.push(`<text x="${xL + 8}" y="${y0 + 20}" fill="currentColor">O</text>`)
  // objet
  out.push(`<line x1="${n(xA)}" y1="${y0}" x2="${n(xA)}" y2="${n(yB)}" stroke="${BLUE}" stroke-width="2.5" marker-end="url(#${id}-b)"/>`)
  out.push(`<text x="${n(xA - 4)}" y="${y0 + 20}" text-anchor="middle" fill="${BLUE}">A</text>`)
  out.push(`<text x="${n(xA - 12)}" y="${n(yB)}" text-anchor="middle" fill="${BLUE}">B</text>`)
  // rayon 1 : parallèle à l'axe, émerge en passant par F'
  const r1 = (x: number) => yB + ((y0 - yB) * (x - xL)) / (xFp - xL)
  out.push(`<path d="M${n(xA)} ${n(yB)} L${xL} ${n(yB)} L${xEnd} ${n(r1(xEnd))}" fill="none" stroke="${GREEN}" stroke-width="1.5"/>`)
  out.push(`<line x1="${n((xA + xL) / 2 - 10)}" y1="${n(yB)}" x2="${n((xA + xL) / 2)}" y2="${n(yB)}" stroke="${GREEN}" stroke-width="1.5" marker-end="url(#${id}-g)"/>`)
  // rayon 2 : passe par O sans être dévié
  const r2 = (x: number) => y0 + ((yB - y0) * (x - xL)) / (xA - xL)
  out.push(`<line x1="${n(xA)}" y1="${n(yB)}" x2="${xEnd}" y2="${n(r2(xEnd))}" stroke="${ORANGE}" stroke-width="1.5"/>`)
  const xm2 = (xA + xL) / 2
  out.push(`<line x1="${n(xm2 - 10)}" y1="${n(r2(xm2 - 10))}" x2="${n(xm2)}" y2="${n(r2(xm2))}" stroke="${ORANGE}" stroke-width="1.5" marker-end="url(#${id}-o)"/>`)
  // rayon 3 : passe par F, émerge parallèle à l'axe
  if (o.third && real) {
    const yI = yB + ((y0 - yB) * (xL - xA)) / (xF - xA)
    out.push(`<path d="M${n(xA)} ${n(yB)} L${xL} ${n(yI)} L${xEnd} ${n(yI)}" fill="none" stroke="${VIOLET}" stroke-width="1.5"/>`)
    const xm3 = (xA + xF) / 2
    const r3 = (x: number) => yB + ((y0 - yB) * (x - xA)) / (xF - xA)
    out.push(`<line x1="${n(xm3 - 10)}" y1="${n(r3(xm3 - 10))}" x2="${n(xm3)}" y2="${n(r3(xm3))}" stroke="${VIOLET}" stroke-width="1.5" marker-end="url(#${id}-v)"/>`)
  }
  // image
  if (real) {
    out.push(`<line x1="${n(xAp)}" y1="${y0}" x2="${n(xAp)}" y2="${n(yBp)}" stroke="${RED}" stroke-width="2.5" marker-end="url(#${id}-r)"/>`)
  } else {
    out.push(`<line x1="${n(xAp)}" y1="${y0}" x2="${n(xAp)}" y2="${n(yBp)}" stroke="${RED}" stroke-width="2.5" stroke-dasharray="6 4" marker-end="url(#${id}-r)"/>`)
    // prolongements en pointillés des rayons émergents
    out.push(`<line x1="${xL}" y1="${n(yB)}" x2="${n(xAp)}" y2="${n(yBp)}" stroke="${GREEN}" stroke-width="1" stroke-dasharray="4 4"/>`)
    out.push(`<line x1="${n(xA)}" y1="${n(yB)}" x2="${n(xAp)}" y2="${n(yBp)}" stroke="${ORANGE}" stroke-width="1" stroke-dasharray="4 4"/>`)
    // œil de l'observateur
    out.push(`<text x="${xEnd - 4}" y="${y0 - 12}" text-anchor="end" fill="currentColor" font-size="11">œil →</text>`)
  }
  const labY = ApBp < 0 ? y0 - 8 : y0 + 20
  out.push(`<text x="${n(xAp + 4)}" y="${labY}" fill="${RED}">A'</text>`)
  out.push(`<text x="${n(xAp + 12)}" y="${n(ApBp < 0 ? yBp + 14 : yBp)}" fill="${RED}">B'</text>`)
  if (o.title) out.push(`<text x="12" y="16" fill="currentColor" font-size="12">${o.title}</text>`)
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="13">${arrowDefs(id)}${out.join('')}</svg>`
}

/** Cas 1 : objet au-delà de 2F — image réelle, renversée, plus petite. f' = 10 cm, OA = −30 cm. */
const svgReelle = lensConstruction({ f: 10, OA: -30, AB: 4, s: 9, xL: 330, y0: 140, W: 580, H: 250, id: 'lc1', third: true, title: "f' = 10 cm ; OA = −30 cm → OA' = +15 cm ; γ = −0,5" })

/** Cas 2 : objet entre F et 2F — image réelle, renversée, agrandie. f' = 10 cm, OA = −15 cm. */
const svgAgrandie = lensConstruction({ f: 10, OA: -15, AB: 3, s: 8, xL: 200, y0: 120, W: 580, H: 230, id: 'lc2', third: true, title: "f' = 10 cm ; OA = −15 cm → OA' = +30 cm ; γ = −2" })

/** Cas 3 : objet entre F et O — loupe, image virtuelle, droite, agrandie. f' = 5 cm, OA = −4 cm. */
const svgLoupe = lensConstruction({ f: 5, OA: -4, AB: 1.5, s: 12, xL: 360, y0: 200, W: 560, H: 290, id: 'lc3', title: "Loupe : f' = 5,0 cm ; OA = −4,0 cm → OA' = −20 cm ; γ = +5" })

/** Foyers : faisceau parallèle convergeant en F'. */
const svgFoyers = (() => {
  const xL = 280
  const y0 = 130
  const f = 120
  const rays = [-60, -30, 30, 60]
  const id = 'lcf'
  const parts = rays.map(
    (h) =>
      `<path d="M30 ${y0 - h} L${xL} ${y0 - h} L${xL + f} ${y0} L${xL + 1.8 * f} ${y0 + 0.8 * h}" fill="none" stroke="${GREEN}" stroke-width="1.4"/>` +
      `<line x1="120" y1="${y0 - h}" x2="135" y2="${y0 - h}" stroke="${GREEN}" stroke-width="1.4" marker-end="url(#${id}-g)"/>`,
  )
  return `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="13">${arrowDefs(id)}
<line x1="10" y1="${y0}" x2="550" y2="${y0}" stroke="currentColor" stroke-dasharray="8 4 2 4" stroke-opacity="0.7"/>
${lensSymbol(xL, 30, 230)}
${parts.join('')}
<line x1="${xL - f}" y1="${y0 - 5}" x2="${xL - f}" y2="${y0 + 5}" stroke="currentColor" stroke-width="1.6"/>
<line x1="${xL + f}" y1="${y0 - 5}" x2="${xL + f}" y2="${y0 + 5}" stroke="currentColor" stroke-width="1.6"/>
<text x="${xL - f}" y="${y0 + 22}" text-anchor="middle" fill="currentColor">F</text>
<text x="${xL + f}" y="${y0 - 10}" text-anchor="middle" fill="currentColor">F'</text>
<text x="${xL + 8}" y="${y0 + 22}" fill="currentColor">O</text>
<line x1="${xL + 2}" y1="245" x2="${xL + f - 2}" y2="245" stroke="${RED}" stroke-width="1.5" marker-start="url(#${id}-r)" marker-end="url(#${id}-r)"/>
<text x="${xL + f / 2}" y="240" text-anchor="middle" fill="${RED}">f' = OF'</text>
<line x1="${xL - f + 2}" y1="245" x2="${xL - 2}" y2="245" stroke="currentColor" stroke-width="1" stroke-opacity="0.6" marker-start="url(#${id}-k)" marker-end="url(#${id}-k)"/>
<text x="${xL - f / 2}" y="240" text-anchor="middle" fill="currentColor">OF = −f'</text>
<text x="20" y="20" fill="currentColor" font-size="12">Un faisceau parallèle à l'axe converge au foyer image F'.</text>
</svg>`
})()

/** Modèle réduit de l'œil. */
const svgOeil = (() => {
  const id = 'lce'
  return `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">${arrowDefs(id)}
<ellipse cx="300" cy="125" rx="150" ry="100" fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.4"/>
<line x1="20" y1="125" x2="545" y2="125" stroke="currentColor" stroke-dasharray="8 4 2 4" stroke-opacity="0.6"/>
<!-- iris / diaphragme -->
<line x1="200" y1="40" x2="200" y2="95" stroke="${ORANGE}" stroke-width="4"/>
<line x1="200" y1="155" x2="200" y2="210" stroke="${ORANGE}" stroke-width="4"/>
<!-- cristallin = lentille -->
${lensSymbol(215, 85, 165)}
<!-- rétine = écran -->
<line x1="450" y1="45" x2="450" y2="205" stroke="${RED}" stroke-width="4"/>
<!-- rayons d'un objet à l'infini (faisceau parallèle) qui convergent sur la rétine -->
<path d="M40 105 L215 105 L450 125" fill="none" stroke="${GREEN}" stroke-width="1.3"/>
<path d="M40 145 L215 145 L450 125" fill="none" stroke="${GREEN}" stroke-width="1.3"/>
<path d="M40 125 L450 125" fill="none" stroke="${GREEN}" stroke-width="1.3"/>
<text x="150" y="30" fill="${ORANGE}">iris → diaphragme</text>
<text x="160" y="190" fill="currentColor">cristallin</text>
<text x="160" y="204" fill="currentColor">→ lentille convergente</text>
<text x="460" y="60" fill="${RED}">rétine</text>
<text x="460" y="74" fill="${RED}">→ écran</text>
<line x1="217" y1="232" x2="448" y2="232" stroke="${BLUE}" stroke-width="1.5" marker-start="url(#${id}-b)" marker-end="url(#${id}-b)"/>
<text x="332" y="226" text-anchor="middle" fill="${BLUE}">distance cristallin–rétine fixe (≈ 17 mm)</text>
<text x="40" y="96" fill="${GREEN}">objet à l'infini</text>
</svg>`
})()

/* ------------------------------------------------------------------ */

const chapter: Chapter = {
  id: 'lentilles-images',
  subject: 'physique-chimie',
  order: 13,
  title: 'Images formées par une lentille mince convergente',
  theme: 'Ondes et signaux',
  summary:
    'Lentille mince convergente : centre optique, foyers, distance focale et vergence ; construction géométrique des images ; relation de conjugaison et grandissement en mesures algébriques ; modèle réduit de l’œil et accommodation.',
  duration: '2 semaines',
  objectives: [
    'Définir et déterminer géométriquement un grandissement.',
    'Exploiter les relations de conjugaison et de grandissement fournies pour déterminer la position et la taille de l’image d’un objet-plan réel.',
    'Déterminer les caractéristiques de l’image d’un objet-plan réel formée par une lentille mince convergente.',
    'Construire l’image d’un objet-plan réel par une lentille mince convergente (rayons particuliers).',
    'Définir et calculer la vergence d’une lentille : $C = \\dfrac{1}{f\'}$.',
    'Estimer la distance focale d’une lentille ; vérifier la relation de conjugaison (capacité expérimentale).',
    'Modéliser l’œil (cristallin, rétine, iris) et expliquer l’accommodation.',
  ],
  keywords: ['lentille convergente', 'centre optique', 'foyer image', 'foyer objet', 'distance focale', 'vergence', 'dioptrie', 'relation de conjugaison', 'grandissement', 'image réelle', 'image virtuelle', 'loupe', 'œil', 'accommodation', 'mesure algébrique'],

  /* ================================================================ */
  fiche: [
    { type: 'h2', text: 'Lentille mince convergente' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Centre optique O', value: 'tout rayon passant par O n’est pas dévié.' },
        { key: 'Foyer image F′', value: 'tout rayon incident parallèle à l’axe optique émerge en passant par F′.' },
        { key: 'Foyer objet F', value: 'tout rayon incident passant par F émerge parallèle à l’axe. F et F′ sont symétriques par rapport à O.' },
        { key: 'Distance focale $f\'$', value: '$f\' = \\overline{OF\'} > 0$ pour une lentille convergente (en m).' },
        { key: 'Vergence $C$', value: '$C = \\dfrac{1}{f\'}$ en dioptries (δ = m⁻¹).' },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Mesures algébriques',
      content: [
        {
          type: 'p',
          text: r`Axe orienté dans le sens de propagation de la lumière (gauche → droite) et vers le haut. Objet réel : $\overline{OA} < 0$. Image réelle : $\overline{OA'} > 0$ ; image virtuelle : $\overline{OA'} < 0$.`,
        },
      ],
    },
    { type: 'h2', text: 'Relations' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Conjugaison et grandissement',
      content: [
        { type: 'math', tex: String.raw`\frac{1}{\overline{OA'}} - \frac{1}{\overline{OA}} = \frac{1}{f'} \qquad\qquad \gamma = \frac{\overline{A'B'}}{\overline{AB}} = \frac{\overline{OA'}}{\overline{OA}}` },
        { type: 'p', text: r`$\gamma < 0$ : image **renversée** ; $\gamma > 0$ : image **droite** ; $|\gamma| > 1$ : image **agrandie**.` },
      ],
    },
    {
      type: 'table',
      headers: ['Position de l’objet', 'Image', 'Exemple'],
      rows: [
        ['à l’infini', 'dans le plan focal image (en F′ si sur l’axe)', 'astronomie, œil au repos'],
        ['au-delà de 2F ($\\overline{OA} < -2f\'$)', 'réelle, renversée, plus petite', 'appareil photo'],
        ['en 2F', 'réelle, renversée, même taille ($\\gamma = -1$)', ''],
        ['entre 2F et F', 'réelle, renversée, agrandie', 'vidéoprojecteur'],
        ['en F', 'à l’infini', 'collimateur'],
        ['entre F et O', 'virtuelle, droite, agrandie', 'loupe'],
      ],
    },
    { type: 'h2', text: 'Rayons particuliers' },
    {
      type: 'list',
      items: [
        'Rayon passant par O : non dévié.',
        'Rayon parallèle à l’axe : émerge en passant par F′.',
        'Rayon passant par F : émerge parallèle à l’axe.',
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Modèle réduit de l’œil',
      content: [
        {
          type: 'p',
          text: r`Iris = **diaphragme** ; cristallin = **lentille convergente de vergence variable** ; rétine = **écran**. La distance cristallin–rétine est fixe : pour voir net un objet plus proche, l'œil **accommode** (le cristallin se bombe, $C$ augmente).`,
        },
      ],
    },
  ],

  /* ================================================================ */
  cours: [
    { type: 'h2', text: '1. Lentilles minces convergentes' },
    { type: 'h3', text: '1.1 Description' },
    {
      type: 'p',
      text: r`Une **lentille** est un milieu transparent (verre, plastique) limité par deux faces dont l'une au moins est sphérique. Elle est **mince** si son épaisseur est faible devant les rayons de courbure de ses faces. Une lentille **convergente** est plus épaisse au centre qu'aux bords ; elle fait converger un faisceau de lumière parallèle.`,
    },
    {
      type: 'p',
      text: r`On la représente par un segment perpendiculaire à l'**axe optique** (axe de symétrie de la lentille), terminé par deux pointes de flèches dirigées vers l'extérieur. Le point d'intersection de la lentille et de l'axe optique est le **centre optique** O.`,
    },
    { type: 'h3', text: '1.2 Foyers et distance focale' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Foyers',
      content: [
        {
          type: 'list',
          items: [
            r`Le **foyer image** F′ est le point de l'axe optique où convergent, après la lentille, les rayons arrivant **parallèlement à l'axe optique**.`,
            r`Le **foyer objet** F est le point de l'axe tel que tout rayon passant par F émerge **parallèlement à l'axe optique**.`,
            r`F et F′ sont **symétriques** par rapport à O.`,
          ],
        },
      ],
    },
    { type: 'svg', svg: svgFoyers, caption: 'Un faisceau parallèle à l’axe optique converge au foyer image F′.', maxWidth: 620 },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Distance focale et vergence',
      content: [
        {
          type: 'p',
          text: r`La **distance focale** est $f' = \overline{OF'}$ (en m) ; elle est positive pour une lentille convergente, et $\overline{OF} = -f'$. La **vergence** est $$C = \frac{1}{f'}$$ en **dioptries** (symbole δ, $1\ \delta = 1\ \text{m}^{-1}$). Plus la vergence est grande, plus la lentille est convergente (et plus elle est bombée).`,
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
          text: r`Une lentille de distance focale $f' = 20\ \text{cm} = 0{,}20\ \text{m}$ a pour vergence $C = \dfrac{1}{0{,}20} = 5{,}0\ \delta$. Une lentille de $+8{,}0\ \delta$ a pour distance focale $f' = \dfrac{1}{8{,}0} = 0{,}125\ \text{m} = 12{,}5\ \text{cm}$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Estimer rapidement la distance focale',
      content: [
        {
          type: 'p',
          text: r`On forme sur un écran (ou une feuille) l'image d'un objet très éloigné (le Soleil, une fenêtre au fond de la salle) : l'image se forme pratiquement dans le plan focal image. La distance lentille–écran donne une estimation de $f'$.`,
        },
      ],
    },
    { type: 'h3', text: '1.3 Mesures algébriques' },
    {
      type: 'p',
      text: r`On oriente l'axe optique dans le sens de propagation de la lumière (en général de gauche à droite) et l'axe vertical vers le haut. Une **mesure algébrique** $\overline{AB}$ est la distance $AB$ affectée d'un signe : positive si l'on va de A vers B dans le sens de l'axe, négative sinon. Ainsi $\overline{BA} = -\overline{AB}$.`,
    },
    {
      type: 'list',
      items: [
        r`Un objet réel placé avant la lentille : $\overline{OA} < 0$.`,
        r`Une image réelle, après la lentille : $\overline{OA'} > 0$ ; une image virtuelle, du même côté que l'objet : $\overline{OA'} < 0$.`,
        r`Un objet dirigé vers le haut : $\overline{AB} > 0$ ; une image renversée : $\overline{A'B'} < 0$.`,
      ],
    },
    { type: 'h2', text: '2. Construction de l’image d’un objet' },
    {
      type: 'p',
      text: r`Un objet plan $AB$, perpendiculaire à l'axe optique avec A sur l'axe, a pour image un segment $A'B'$ également perpendiculaire à l'axe, A′ sur l'axe. Il suffit donc de construire **B′**, image de B, à l'intersection de deux rayons issus de B (le troisième sert de vérification), puis d'abaisser la perpendiculaire sur l'axe pour obtenir A′.`,
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Les trois rayons particuliers',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`Le rayon issu de B passant par le centre optique O **n'est pas dévié** (en orange ci-dessous).`,
            r`Le rayon issu de B **parallèle à l'axe optique** émerge en passant par le **foyer image F′** (en vert).`,
            r`Le rayon issu de B passant par le **foyer objet F** émerge **parallèle à l'axe optique** (en violet).`,
          ],
        },
      ],
    },
    { type: 'svg', svg: svgReelle, caption: 'Objet au-delà de 2F : image réelle, renversée, plus petite (cas de l’appareil photo).', maxWidth: 640 },
    {
      type: 'steps',
      items: [
        { title: 'Échelle', text: 'Choisir une échelle (souvent différente horizontalement et verticalement), tracer l’axe optique, la lentille, placer O, F et F′.' },
        { title: 'Objet', text: 'Placer A sur l’axe et B au-dessus (flèche).' },
        { title: 'Rayons', text: 'Tracer au moins deux rayons particuliers issus de B, avec des flèches indiquant le sens de propagation.' },
        { title: 'Image', text: 'B′ est à l’intersection des rayons émergents (ou de leurs prolongements). A′ est le projeté de B′ sur l’axe.' },
        { title: 'Mesure', text: 'Mesurer $\\overline{OA\'}$ et $\\overline{A\'B\'}$, convertir avec l’échelle et comparer avec le calcul.' },
      ],
    },
    { type: 'svg', svg: svgAgrandie, caption: 'Objet entre 2F et F : image réelle, renversée, agrandie (cas du projecteur).', maxWidth: 640 },
    { type: 'h3', text: 'Image réelle, image virtuelle' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Nature de l’image',
      content: [
        {
          type: 'list',
          items: [
            r`Une image est **réelle** si les rayons émergents passent effectivement par elle : on peut l'observer sur un **écran**. Pour une lentille convergente, elle est située après la lentille ($\overline{OA'} > 0$).`,
            r`Une image est **virtuelle** si ce sont les **prolongements** des rayons émergents qui se coupent : elle ne peut pas être recueillie sur un écran, mais on la voit en regardant à travers la lentille. Elle est du même côté que l'objet ($\overline{OA'} < 0$).`,
          ],
        },
      ],
    },
    { type: 'svg', svg: svgLoupe, caption: 'Objet entre F et O : image virtuelle, droite, agrandie — principe de la loupe. Les prolongements des rayons émergents (pointillés) se coupent en B′.', maxWidth: 620 },
    {
      type: 'table',
      headers: ['Position de l’objet ($\\overline{OA}$)', 'Position de l’image', 'Nature', 'Sens', 'Taille'],
      rows: [
        ['$\\overline{OA} \\to -\\infty$', 'en F′', 'réelle', '—', 'ponctuelle (si objet sur l’axe)'],
        ['$\\overline{OA} < -2f\'$', '$f\' < \\overline{OA\'} < 2f\'$', 'réelle', 'renversée', 'plus petite'],
        ['$\\overline{OA} = -2f\'$', '$\\overline{OA\'} = 2f\'$', 'réelle', 'renversée', 'même taille'],
        ['$-2f\' < \\overline{OA} < -f\'$', '$\\overline{OA\'} > 2f\'$', 'réelle', 'renversée', 'agrandie'],
        ['$\\overline{OA} = -f\'$', 'à l’infini', '—', '—', '—'],
        ['$-f\' < \\overline{OA} < 0$', '$\\overline{OA\'} < 0$', 'virtuelle', 'droite', 'agrandie'],
      ],
    },
    { type: 'h2', text: '3. Relation de conjugaison et grandissement' },
    { type: 'h3', text: '3.1 Grandissement' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Grandissement',
      content: [
        {
          type: 'p',
          text: r`Le **grandissement** $\gamma$ (gamma) est le rapport des tailles algébriques de l'image et de l'objet : $$\gamma = \frac{\overline{A'B'}}{\overline{AB}}$$ C'est un nombre sans unité. Son **signe** indique le sens de l'image ($\gamma < 0$ : renversée) et sa **valeur absolue** sa taille relative ($|\gamma| > 1$ : agrandie).`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Expression avec les positions',
      content: [
        {
          type: 'p',
          text: r`$$\gamma = \frac{\overline{A'B'}}{\overline{AB}} = \frac{\overline{OA'}}{\overline{OA}}$$ **Démonstration** : le rayon $BB'$ passe par O sans être dévié. Les triangles $OAB$ et $OA'B'$ sont en configuration de Thalès (droites $(AB)$ et $(A'B')$ parallèles, toutes deux perpendiculaires à l'axe), d'où l'égalité des rapports ; les signes sont cohérents car $A$ et $A'$ d'une part, $B$ et $B'$ d'autre part, sont de part et d'autre de O pour une image réelle.`,
        },
      ],
    },
    { type: 'h3', text: '3.2 Relation de conjugaison' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Relation de conjugaison (de Descartes)',
      content: [
        {
          type: 'math',
          tex: String.raw`\frac{1}{\overline{OA'}} - \frac{1}{\overline{OA}} = \frac{1}{\overline{OF'}} = \frac{1}{f'} = C`,
        },
        { type: 'p', text: r`Les trois longueurs doivent être exprimées dans la **même unité** (en m si l'on veut faire apparaître la vergence en δ).` },
      ],
    },
    {
      type: 'reveal',
      title: 'Démonstration (à partir de deux triangles semblables)',
      content: [
        {
          type: 'p',
          text: r`Soit I le point de la lentille atteint par le rayon issu de B parallèle à l'axe : $\overline{OI} = \overline{AB}$. Ce rayon émerge en passant par F′ et B′. Thalès dans les triangles $F'OI$ et $F'A'B'$ : $$\frac{\overline{A'B'}}{\overline{OI}} = \frac{\overline{F'A'}}{\overline{F'O}} = \frac{\overline{OA'} - f'}{-f'} = 1 - \frac{\overline{OA'}}{f'}$$ Or $\dfrac{\overline{A'B'}}{\overline{OI}} = \dfrac{\overline{A'B'}}{\overline{AB}} = \gamma = \dfrac{\overline{OA'}}{\overline{OA}}$. Donc $\dfrac{\overline{OA'}}{\overline{OA}} = 1 - \dfrac{\overline{OA'}}{f'}$. En divisant par $\overline{OA'}$ : $\dfrac{1}{\overline{OA}} = \dfrac{1}{\overline{OA'}} - \dfrac{1}{f'}$, soit $\dfrac{1}{\overline{OA'}} - \dfrac{1}{\overline{OA}} = \dfrac{1}{f'}$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Calculer la position et la taille d’une image',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Données algébriques', text: 'Écrire $\\overline{OA}$ (négatif pour un objet réel), $f\'$ et $\\overline{AB}$ dans la même unité.' },
            { title: 'Isoler', text: '$\\dfrac{1}{\\overline{OA\'}} = \\dfrac{1}{f\'} + \\dfrac{1}{\\overline{OA}}$, puis inverser.' },
            { title: 'Grandissement', text: '$\\gamma = \\overline{OA\'}/\\overline{OA}$, puis $\\overline{A\'B\'} = \\gamma\\,\\overline{AB}$.' },
            { title: 'Interpréter', text: 'Signe de $\\overline{OA\'}$ → réelle ou virtuelle ; signe de γ → droite ou renversée ; $|\\gamma|$ → taille.' },
          ],
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
          text: r`Lentille $f' = 10\ \text{cm}$, objet $\overline{AB} = 2{,}0\ \text{cm}$ placé à $30\ \text{cm}$ avant la lentille : $\overline{OA} = -30\ \text{cm}$. $$\frac{1}{\overline{OA'}} = \frac{1}{10} + \frac{1}{-30} = \frac{3 - 1}{30} = \frac{2}{30} \;\Rightarrow\; \overline{OA'} = 15\ \text{cm}$$ $\gamma = \dfrac{15}{-30} = -0{,}50$ et $\overline{A'B'} = -0{,}50 \times 2{,}0 = -1{,}0\ \text{cm}$. L'image est réelle (à 15 cm après la lentille), renversée et deux fois plus petite que l'objet.`,
        },
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
            r`Oublier le signe moins de $\overline{OA}$ pour un objet réel : c'est l'erreur n° 1.`,
            r`Écrire $\dfrac{1}{\overline{OA'}} = \dfrac{1}{f'} - \dfrac{1}{\overline{OA}}$ : faux, c'est **plus** $\dfrac{1}{\overline{OA}}$.`,
            r`Inverser seulement un terme : $\dfrac{1}{a + b} \neq \dfrac{1}{a} + \dfrac{1}{b}$. Calculer d'abord la somme, puis inverser.`,
            r`Mélanger cm et m : ne convertir en m que si l'on utilise la vergence en δ.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : la loupe',
      content: [
        {
          type: 'p',
          text: r`Loupe $f' = 5{,}0\ \text{cm}$, objet à $\overline{OA} = -4{,}0\ \text{cm}$ : $\dfrac{1}{\overline{OA'}} = \dfrac{1}{5{,}0} - \dfrac{1}{4{,}0} = \dfrac{4 - 5}{20} = -\dfrac{1}{20}$ donc $\overline{OA'} = -20\ \text{cm}$ : image **virtuelle**. $\gamma = \dfrac{-20}{-4{,}0} = +5{,}0$ : image **droite** et 5 fois plus grande.`,
        },
      ],
    },
    { type: 'h2', text: '4. Modèle de l’œil' },
    {
      type: 'p',
      text: r`L'œil est un système optique complexe (cornée, humeur aqueuse, cristallin, humeur vitrée), mais on peut le modéliser simplement par l'**œil réduit**.`,
    },
    { type: 'svg', svg: svgOeil, caption: 'Modèle réduit de l’œil : un objet à l’infini donne une image nette sur la rétine quand l’œil n’accommode pas.', maxWidth: 620 },
    {
      type: 'table',
      headers: ['Œil réel', 'Modèle (banc optique)', 'Rôle'],
      rows: [
        ['Iris (pupille)', 'Diaphragme', 'règle la quantité de lumière entrant dans l’œil'],
        ['Cristallin (+ cornée)', 'Lentille mince convergente de vergence variable', 'forme l’image'],
        ['Rétine', 'Écran', 'reçoit l’image (réelle, renversée) ; le cerveau la « redresse »'],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Accommodation',
      content: [
        {
          type: 'p',
          text: r`La distance cristallin–rétine $\overline{OA'}$ est **fixe** (environ 17 mm dans le modèle réduit). D'après la relation de conjugaison, pour que l'image d'un objet se forme toujours sur la rétine quand l'objet se rapproche ($|\overline{OA}|$ diminue), il faut que $\dfrac{1}{f'} = \dfrac{1}{\overline{OA'}} - \dfrac{1}{\overline{OA}}$ **augmente** : les muscles ciliaires bombent le cristallin, sa vergence augmente. C'est l'**accommodation**.`,
        },
      ],
    },
    {
      type: 'keyvalue',
      items: [
        { key: 'Punctum remotum (PR)', value: 'point le plus éloigné vu net sans accommoder : à l’infini pour un œil normal (emmétrope).' },
        { key: 'Punctum proximum (PP)', value: 'point le plus proche vu net en accommodant au maximum : environ 25 cm pour un œil normal adulte jeune.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple chiffré',
      content: [
        {
          type: 'p',
          text: r`Avec $\overline{OA'} = 17\ \text{mm}$ : pour un objet à l'infini, $C = \dfrac{1}{0{,}017} = 58{,}8\ \delta$ ; pour un objet à 25 cm ($\overline{OA} = -0{,}25\ \text{m}$), $C = \dfrac{1}{0{,}017} + \dfrac{1}{0{,}25} = 58{,}8 + 4{,}0 = 62{,}8\ \delta$. L'œil doit augmenter sa vergence de $4{,}0\ \delta$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Analogie avec l’appareil photo',
      content: [
        {
          type: 'p',
          text: r`Dans un appareil photo, l'objectif (convergent) a une distance focale fixe : pour faire la mise au point, on déplace l'objectif par rapport au capteur (on change $\overline{OA'}$). L'œil, lui, garde $\overline{OA'}$ fixe et modifie $f'$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Repères',
      content: [
        {
          type: 'p',
          text: r`Kepler (1604) explique que l'image se forme, renversée, sur la rétine. Descartes publie dans *La Dioptrique* (1637) une étude des lentilles et de l'œil ; la relation de conjugaison des lentilles minces porte souvent son nom.`,
        },
      ],
    },
  ],

  /* ================================================================ */
  exercices: [
    {
      id: 'li-vergence',
      title: 'Vergence et distance focale',
      difficulty: 1,
      duration: 5,
      tags: ['vergence'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la vergence d’une lentille de distance focale $f\' = 20$ cm.',
            'Calculer la distance focale d’une lentille de vergence $C = +8{,}0\\ \\delta$.',
            'Laquelle des deux lentilles est la plus convergente ? Comment le reconnaître au toucher ?',
          ],
        },
      ],
      hints: ['$C = 1/f\'$ avec $f\'$ en mètres.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$C = \dfrac{1}{f'} = \dfrac{1}{0{,}20} = 5{,}0\ \delta$.`,
            r`$f' = \dfrac{1}{C} = \dfrac{1}{8{,}0} = 0{,}125\ \text{m} = 12{,}5\ \text{cm}$.`,
            r`La seconde ($8{,}0\ \delta > 5{,}0\ \delta$, focale plus courte) est la plus convergente : elle est plus bombée (beaucoup plus épaisse au centre qu'aux bords).`,
          ],
        },
      ],
    },
    {
      id: 'li-conjugaison',
      title: 'Position et taille d’une image',
      difficulty: 1,
      duration: 8,
      tags: ['conjugaison', 'grandissement'],
      statement: [
        {
          type: 'p',
          text: r`Un objet $AB$ de hauteur $2{,}0\ \text{cm}$ est placé à $30\ \text{cm}$ devant une lentille convergente de distance focale $f' = 10\ \text{cm}$ (A sur l'axe).`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Donner $\\overline{OA}$ et $\\overline{AB}$.',
            'Calculer $\\overline{OA\'}$.',
            'Calculer le grandissement puis $\\overline{A\'B\'}$. Décrire l’image.',
          ],
        },
      ],
      hints: ['Objet avant la lentille : $\\overline{OA} < 0$.', '$\\dfrac{1}{\\overline{OA\'}} = \\dfrac{1}{f\'} + \\dfrac{1}{\\overline{OA}}$.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$\overline{OA} = -30\ \text{cm}$ ; $\overline{AB} = +2{,}0\ \text{cm}$.`,
            r`$\dfrac{1}{\overline{OA'}} = \dfrac{1}{10} + \dfrac{1}{-30} = \dfrac{2}{30}$, d'où $\overline{OA'} = +15\ \text{cm}$.`,
            r`$\gamma = \dfrac{\overline{OA'}}{\overline{OA}} = \dfrac{15}{-30} = -0{,}50$ ; $\overline{A'B'} = \gamma\,\overline{AB} = -1{,}0\ \text{cm}$. Image réelle (15 cm après la lentille, observable sur un écran), renversée, deux fois plus petite.`,
          ],
        },
      ],
    },
    {
      id: 'li-construction',
      title: 'Construction graphique et vérification',
      difficulty: 1,
      duration: 12,
      tags: ['construction', 'rayons particuliers'],
      statement: [
        {
          type: 'p',
          text: r`Lentille convergente $f' = 10\ \text{cm}$ ; objet $\overline{AB} = 3{,}0\ \text{cm}$ avec $\overline{OA} = -15\ \text{cm}$. Échelle horizontale : 1 cm sur le papier pour 5 cm ; verticale : 1 cm pour 1 cm.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Construire l’image $A\'B\'$ à l’aide des trois rayons particuliers.',
            'Lire $\\overline{OA\'}$ et $\\overline{A\'B\'}$.',
            'Vérifier par le calcul.',
          ],
        },
      ],
      hints: ['F est à 10 cm avant O, F′ à 10 cm après O : sur le papier, 2 cm.'],
      solution: [
        { type: 'svg', svg: svgAgrandie, maxWidth: 600 },
        {
          type: 'list',
          ordered: true,
          items: [
            'On trace le rayon passant par O (non dévié), le rayon parallèle à l’axe (émerge par F′) et le rayon passant par F (émerge parallèle à l’axe). Ils se coupent en B′.',
            r`On lit A′ à 6 cm du centre sur le papier, soit $\overline{OA'} = +30\ \text{cm}$, et $\overline{A'B'} \approx -6{,}0\ \text{cm}$.`,
            r`$\dfrac{1}{\overline{OA'}} = \dfrac{1}{10} - \dfrac{1}{15} = \dfrac{3 - 2}{30} = \dfrac{1}{30}$ donc $\overline{OA'} = 30\ \text{cm}$ ; $\gamma = \dfrac{30}{-15} = -2{,}0$ ; $\overline{A'B'} = -2{,}0 \times 3{,}0 = -6{,}0\ \text{cm}$ ✓. Image réelle, renversée, deux fois plus grande.`,
          ],
        },
      ],
    },
    {
      id: 'li-loupe',
      title: 'La loupe',
      difficulty: 2,
      duration: 10,
      tags: ['image virtuelle', 'loupe'],
      statement: [
        {
          type: 'p',
          text: r`On observe un timbre de $2{,}0\ \text{cm}$ de haut à travers une loupe de vergence $C = 20\ \delta$, le timbre étant à $4{,}0\ \text{cm}$ de la loupe.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la distance focale de la loupe.',
            'Calculer la position de l’image. Est-elle réelle ou virtuelle ? Peut-on la recueillir sur un écran ?',
            'Calculer le grandissement et la taille de l’image.',
            'Où doit-on placer l’objet par rapport à F pour qu’une lentille convergente fonctionne en loupe ?',
          ],
        },
      ],
      hints: ['$f\' = 1/C = 0{,}050$ m.', 'Un $\\overline{OA\'}$ négatif signifie une image virtuelle.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$f' = \dfrac{1}{20} = 0{,}050\ \text{m} = 5{,}0\ \text{cm}$.`,
            r`$\dfrac{1}{\overline{OA'}} = \dfrac{1}{5{,}0} + \dfrac{1}{-4{,}0} = \dfrac{4 - 5}{20} = -\dfrac{1}{20}$ donc $\overline{OA'} = -20\ \text{cm}$. Image **virtuelle** (du même côté que l'objet) : on ne peut pas la recueillir sur un écran, on la voit en regardant à travers la loupe.`,
            r`$\gamma = \dfrac{-20}{-4{,}0} = +5{,}0$ ; $\overline{A'B'} = 5{,}0 \times 2{,}0 = +10\ \text{cm}$ : image droite, 5 fois plus grande.`,
            r`L'objet doit être placé **entre le foyer objet F et la lentille** ($-f' < \overline{OA} < 0$).`,
          ],
        },
      ],
    },
    {
      id: 'li-focale-mesures',
      title: 'Déterminer une distance focale à partir de mesures',
      difficulty: 2,
      duration: 10,
      tags: ['conjugaison', 'expérimental'],
      statement: [
        {
          type: 'p',
          text: r`Sur un banc d'optique, un objet lumineux est placé à $20{,}0\ \text{cm}$ d'une lentille convergente inconnue ; on obtient une image nette sur un écran placé à $60{,}0\ \text{cm}$ derrière la lentille.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la distance focale et la vergence de la lentille.',
            'Calculer le grandissement. L’objet mesure 1,5 cm : quelle est la taille de l’image ?',
            'Proposer une méthode graphique pour exploiter plusieurs couples de mesures et vérifier la relation de conjugaison.',
          ],
        },
      ],
      hints: ['$\\overline{OA} = -20{,}0$ cm ; $\\overline{OA\'} = +60{,}0$ cm.', 'Tracer $1/\\overline{OA\'}$ en fonction de $1/\\overline{OA}$.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$\dfrac{1}{f'} = \dfrac{1}{60{,}0} - \dfrac{1}{-20{,}0} = \dfrac{1 + 3}{60{,}0} = \dfrac{4}{60{,}0}$ donc $f' = 15{,}0\ \text{cm}$ et $C = \dfrac{1}{0{,}150} = 6{,}67\ \delta$.`,
            r`$\gamma = \dfrac{60{,}0}{-20{,}0} = -3{,}00$ ; $\overline{A'B'} = -3{,}00 \times 1{,}5 = -4{,}5\ \text{cm}$ (image renversée de 4,5 cm).`,
            r`On réalise plusieurs mesures, puis on trace $y = \dfrac{1}{\overline{OA'}}$ en fonction de $x = \dfrac{1}{\overline{OA}}$. La relation de conjugaison s'écrit $y = x + \dfrac{1}{f'}$ : on doit obtenir une droite de **coefficient directeur 1** et d'ordonnée à l'origine $C = 1/f'$.`,
          ],
        },
      ],
    },
    {
      id: 'li-oeil',
      title: 'Modèle de l’œil et accommodation',
      difficulty: 2,
      duration: 12,
      tags: ['œil', 'accommodation', 'vergence'],
      statement: [
        {
          type: 'p',
          text: r`On modélise un œil normal par une lentille convergente (cristallin) placée à $17\ \text{mm}$ d'un écran (rétine).`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'À quels éléments du modèle correspondent l’iris, le cristallin et la rétine ?',
            'L’œil regarde un objet très éloigné sans accommoder. Calculer la vergence du cristallin.',
            'L’œil regarde un texte à 25 cm. Calculer la nouvelle vergence et commenter.',
            'La lettre lue mesure 3,0 mm. Calculer la taille de son image sur la rétine.',
          ],
        },
      ],
      hints: ['Objet à l’infini : image dans le plan focal, $f\' = 17$ mm.', 'Garder $\\overline{OA\'} = 17$ mm.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Iris → diaphragme ; cristallin → lentille convergente de vergence variable ; rétine → écran.',
            r`L'image d'un objet à l'infini se forme au foyer image : $f' = 17\ \text{mm} = 0{,}017\ \text{m}$, donc $C_1 = \dfrac{1}{0{,}017} = 58{,}8 \approx 59\ \delta$.`,
            r`$C_2 = \dfrac{1}{\overline{OA'}} - \dfrac{1}{\overline{OA}} = \dfrac{1}{0{,}017} - \dfrac{1}{-0{,}25} = 58{,}8 + 4{,}0 = 62{,}8 \approx 63\ \delta$ (soit $f' = 15{,}9\ \text{mm}$). La vergence a augmenté de $4{,}0\ \delta$ : le cristallin s'est bombé, c'est l'**accommodation**.`,
            r`$\gamma = \dfrac{\overline{OA'}}{\overline{OA}} = \dfrac{17}{-250} = -0{,}068$ ; $\overline{A'B'} = -0{,}068 \times 3{,}0 = -0{,}20\ \text{mm}$ : image renversée de $0{,}20\ \text{mm}$.`,
          ],
        },
      ],
    },
    {
      id: 'li-projecteur',
      title: 'Vidéoprojecteur',
      difficulty: 2,
      duration: 12,
      tags: ['grandissement', 'conjugaison'],
      statement: [
        {
          type: 'p',
          text: r`Dans un projecteur, une matrice lumineuse de largeur $24\ \text{mm}$ est l'objet. L'objectif (assimilé à une lentille mince convergente) en donne une image nette de largeur $1{,}20\ \text{m}$ sur un écran situé à $3{,}00\ \text{m}$ de l'objectif.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Justifier que le grandissement est négatif, puis le calculer.',
            'En déduire la distance entre la matrice et l’objectif.',
            'Calculer la distance focale de l’objectif.',
            'Pourquoi la matrice est-elle placée « à l’envers » dans le projecteur ?',
          ],
        },
      ],
      hints: ['L’image sur l’écran est réelle donc renversée.', '$\\overline{OA} = \\overline{OA\'}/\\gamma$.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`L'image est réelle (sur un écran) : pour une lentille convergente et un objet réel, elle est alors renversée, donc $\gamma < 0$. $\gamma = -\dfrac{1{,}20}{24\times10^{-3}} = -50$.`,
            r`$\overline{OA} = \dfrac{\overline{OA'}}{\gamma} = \dfrac{3{,}00}{-50} = -0{,}060\ \text{m}$ : la matrice est à $6{,}0\ \text{cm}$ de l'objectif.`,
            r`$\dfrac{1}{f'} = \dfrac{1}{3{,}00} - \dfrac{1}{-0{,}060} = 0{,}333 + 16{,}7 = 17{,}0\ \delta$ ; $f' = \dfrac{1}{17{,}0} = 5{,}9\times10^{-2}\ \text{m} = 5{,}9\ \text{cm}$. L'objet est bien entre F et 2F (entre 5,9 et 11,8 cm), ce qui donne une image agrandie.`,
            r`L'image étant renversée, on retourne la matrice pour que l'image projetée apparaisse à l'endroit.`,
          ],
        },
      ],
    },
    {
      id: 'li-photo-bac',
      title: 'Type bac — Mise au point d’un appareil photographique',
      difficulty: 3,
      duration: 25,
      tags: ['type bac', 'conjugaison', 'grandissement', 'appareil photo'],
      statement: [
        {
          type: 'p',
          text: r`L'objectif d'un appareil photographique est modélisé par une lentille mince convergente de distance focale $f' = 50\ \text{mm}$. Le capteur, de dimensions $24\ \text{mm} \times 36\ \text{mm}$, joue le rôle d'écran. Pour la mise au point, l'objectif se déplace par rapport au capteur.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Pour photographier un paysage lointain, où doit se trouver le capteur ? Justifier.',
            'On photographie une personne de 1,80 m située à 2,0 m de l’objectif. Calculer la distance objectif–capteur. De combien l’objectif a-t-il été déplacé par rapport à la question 1 ?',
            'Calculer la hauteur de l’image de la personne. Tient-elle entière sur le capteur tenu verticalement (36 mm) ?',
            'À quelle distance minimale doit se placer le photographe pour que la personne tienne entièrement en hauteur sur le capteur vertical ?',
            'Comparer la mise au point de l’appareil photo et celle de l’œil.',
          ],
        },
      ],
      hints: [
        'Objet à l’infini → image dans le plan focal image.',
        'Travailler en mm : $\\overline{OA} = -2\\,000$ mm.',
        'Imposer $\\gamma = -36/1800$ puis exprimer $\\overline{OA}$ : $\\overline{OA} = f\'(1/\\gamma - 1)$.',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`Un objet à l'infini a son image dans le **plan focal image** : le capteur doit être à $f' = 50\ \text{mm}$ de l'objectif.`,
            r`$\overline{OA} = -2\,000\ \text{mm}$ : $\dfrac{1}{\overline{OA'}} = \dfrac{1}{50} - \dfrac{1}{2\,000} = \dfrac{40 - 1}{2\,000} = \dfrac{39}{2\,000}$ donc $\overline{OA'} = \dfrac{2\,000}{39} = 51{,}3\ \text{mm}$. L'objectif a été avancé de $51{,}3 - 50 = 1{,}3\ \text{mm}$ (éloigné du capteur).`,
            r`$\gamma = \dfrac{51{,}3}{-2\,000} = -2{,}56\times10^{-2}$ ; $\overline{A'B'} = -2{,}56\times10^{-2} \times 1\,800 = -46\ \text{mm}$. $46\ \text{mm} > 36\ \text{mm}$ : la personne ne tient pas en entier.`,
            r`Il faut $|\gamma| \le \dfrac{36}{1\,800} = 0{,}020$, soit $\gamma = -0{,}020$ à la limite. Avec $\overline{OA'} = \gamma\,\overline{OA}$ dans la relation de conjugaison : $\dfrac{1}{\gamma\,\overline{OA}} - \dfrac{1}{\overline{OA}} = \dfrac{1}{f'}$, d'où $\overline{OA} = f'\left(\dfrac{1}{\gamma} - 1\right) = 50 \times (-50 - 1) = -2\,550\ \text{mm}$. Le photographe doit se placer à au moins $2{,}55\ \text{m}$ (vérification : $\overline{OA'} = 51\ \text{mm}$ et $\dfrac{1}{51} + \dfrac{1}{2\,550} = \dfrac{51}{2\,550} = \dfrac{1}{50}$ ✓).`,
            r`Appareil photo : $f'$ fixe, on modifie la distance lentille–capteur $\overline{OA'}$. Œil : distance cristallin–rétine fixe, on modifie $f'$ (accommodation).`,
          ],
        },
      ],
    },
    {
      id: 'li-bessel',
      title: 'Objet et écran fixes : deux positions de la lentille',
      difficulty: 3,
      duration: 20,
      tags: ['conjugaison', 'approfondissement'],
      statement: [
        {
          type: 'p',
          text: r`Un objet et un écran sont fixes, distants de $D = 1{,}00\ \text{m}$. On déplace entre eux une lentille convergente de distance focale $f' = 16\ \text{cm}$. On note $p = -\overline{OA} > 0$ la distance objet–lentille.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Exprimer $\\overline{OA\'}$ en fonction de $D$ et $p$.',
            'Montrer que, pour obtenir une image nette, $p$ vérifie $p^2 - Dp + f\'D = 0$.',
            'Résoudre cette équation. Combien y a-t-il de positions possibles ?',
            'Calculer le grandissement dans chaque cas.',
            'À quelle condition sur $D$ et $f\'$ peut-on obtenir une image nette ?',
          ],
        },
      ],
      hints: ['$\\overline{OA\'} = D - p$.', 'Remplacer dans $\\dfrac{1}{D - p} + \\dfrac{1}{p} = \\dfrac{1}{f\'}$.', 'Discriminant $\\Delta = D^2 - 4f\'D$.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`L'écran est à la distance $D - p$ après la lentille : $\overline{OA'} = D - p$.`,
            r`Conjugaison : $\dfrac{1}{D - p} - \dfrac{1}{-p} = \dfrac{1}{f'}$, soit $\dfrac{p + (D - p)}{p(D - p)} = \dfrac{1}{f'}$, donc $p(D - p) = f'D$, c'est-à-dire $p^2 - Dp + f'D = 0$.`,
            r`Avec $D = 1{,}00$ m et $f' = 0{,}16$ m : $\Delta = 1{,}00 - 4 \times 0{,}16 = 0{,}36$, $\sqrt{\Delta} = 0{,}60$. $p_1 = \dfrac{1{,}00 - 0{,}60}{2} = 0{,}20\ \text{m}$ et $p_2 = \dfrac{1{,}00 + 0{,}60}{2} = 0{,}80\ \text{m}$ : **deux positions** de la lentille.`,
            r`Position 1 : $\overline{OA} = -0{,}20$, $\overline{OA'} = 0{,}80$, $\gamma_1 = -4{,}0$ (image agrandie). Position 2 : $\overline{OA} = -0{,}80$, $\overline{OA'} = 0{,}20$, $\gamma_2 = -0{,}25$ (image réduite). On remarque $\gamma_1\gamma_2 = 1$ : les deux positions sont symétriques (on échange objet et image). Vérification : $\dfrac{1}{0{,}80} + \dfrac{1}{0{,}20} = 1{,}25 + 5{,}0 = 6{,}25\ \delta = \dfrac{1}{0{,}16}$ ✓.`,
            r`Il faut $\Delta \ge 0$ : $D^2 - 4f'D \ge 0$, soit $D \ge 4f'$. La distance objet–écran doit être au moins égale à quatre fois la distance focale.`,
          ],
        },
      ],
    },
  ],

  /* ================================================================ */
  representations: [
    {
      type: 'widget',
      id: 'thin-lens',
      title: 'Lentille mince convergente : tracé de rayons',
      caption: 'Déplacez l’objet et modifiez la distance focale : observez l’image (réelle ou virtuelle), la relation de conjugaison et le grandissement.',
    },
    { type: 'svg', svg: svgReelle, caption: 'Construction avec les trois rayons particuliers.', maxWidth: 640 },
    { type: 'svg', svg: svgLoupe, caption: 'Image virtuelle donnée par une loupe.', maxWidth: 620 },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Un rayon incident parallèle à l’axe optique d’une lentille convergente émerge :',
          choices: ['sans être dévié', 'en passant par F′', 'en passant par F', 'parallèle à l’axe'],
          answer: 1,
        },
        {
          question: 'Une lentille de vergence 4,0 δ a une distance focale de :',
          choices: ['4,0 m', '25 cm', '40 cm', '2,5 cm'],
          answer: 1,
          explanation: '$f\' = 1/4{,}0 = 0{,}25$ m.',
        },
        {
          question: 'Avec $f\' = 10$ cm et $\\overline{OA} = -20$ cm, on obtient :',
          choices: ['$\\overline{OA\'} = 20$ cm, $\\gamma = -1$', '$\\overline{OA\'} = 10$ cm, $\\gamma = -0{,}5$', '$\\overline{OA\'} = -20$ cm, $\\gamma = 1$', 'pas d’image'],
          answer: 0,
          explanation: '$1/\\overline{OA\'} = 1/10 - 1/20 = 1/20$ ; objet en 2F → image en 2F′, même taille, renversée.',
        },
        {
          question: 'Un grandissement $\\gamma = -3$ signifie que l’image est :',
          choices: ['droite et 3 fois plus petite', 'renversée et 3 fois plus grande', 'virtuelle', 'droite et 3 fois plus grande'],
          answer: 1,
        },
        {
          question: 'Pour obtenir une image virtuelle avec une lentille convergente, l’objet doit être :',
          choices: ['au-delà de 2F', 'entre 2F et F', 'en F', 'entre F et O'],
          answer: 3,
        },
        {
          question: 'Lorsqu’un objet se rapproche de l’œil, la vergence du cristallin :',
          choices: ['diminue', 'augmente', 'reste constante', 's’annule'],
          answer: 1,
          explanation: 'La distance cristallin–rétine est fixe : il faut augmenter $C$ (accommodation).',
        },
        {
          question: 'Dans le modèle de l’œil, la rétine est représentée par :',
          choices: ['une lentille', 'un diaphragme', 'un écran', 'un miroir'],
          answer: 2,
        },
        {
          question: 'Un objet placé au foyer objet F d’une lentille convergente donne une image :',
          choices: ['en F′', 'à l’infini', 'en O', 'virtuelle en F'],
          answer: 1,
          explanation: '$1/\\overline{OA\'} = 1/f\' - 1/f\' = 0$.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Centre optique O', back: 'Tout rayon passant par O n’est pas dévié.' },
        { front: 'Foyer image F′', back: 'Point où convergent les rayons arrivant parallèlement à l’axe.' },
        { front: 'Foyer objet F', back: 'Un rayon passant par F émerge parallèle à l’axe ; F symétrique de F′ par rapport à O.' },
        { front: 'Vergence', back: '$C = 1/f\'$ en dioptries (δ = m⁻¹).' },
        { front: 'Relation de conjugaison', back: '$\\dfrac{1}{\\overline{OA\'}} - \\dfrac{1}{\\overline{OA}} = \\dfrac{1}{f\'}$' },
        { front: 'Grandissement', back: '$\\gamma = \\dfrac{\\overline{A\'B\'}}{\\overline{AB}} = \\dfrac{\\overline{OA\'}}{\\overline{OA}}$' },
        { front: 'Image réelle', back: 'Les rayons émergents s’y croisent réellement ; observable sur un écran ; $\\overline{OA\'} > 0$.' },
        { front: 'Image virtuelle', back: 'Les prolongements des rayons s’y croisent ; non observable sur écran ; $\\overline{OA\'} < 0$.' },
        { front: 'Loupe', back: 'Objet entre F et O : image virtuelle, droite, agrandie.' },
        { front: 'Objet à l’infini', back: 'Image dans le plan focal image.' },
        { front: 'Modèle de l’œil', back: 'Iris = diaphragme ; cristallin = lentille convergente de vergence variable ; rétine = écran.' },
        { front: 'Accommodation', back: 'Augmentation de la vergence du cristallin pour voir net un objet proche.' },
      ],
    },
    {
      type: 'matching',
      title: 'Position de l’objet → caractéristiques de l’image',
      pairs: [
        { left: 'Objet à l’infini', right: 'Image dans le plan focal image' },
        { left: 'Objet au-delà de 2F', right: 'Réelle, renversée, plus petite' },
        { left: 'Objet en 2F', right: 'Réelle, renversée, même taille' },
        { left: 'Objet entre 2F et F', right: 'Réelle, renversée, agrandie' },
        { left: 'Objet en F', right: 'Image rejetée à l’infini' },
        { left: 'Objet entre F et O', right: 'Virtuelle, droite, agrandie' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'La vergence d’une lentille s’exprime en {{dioptries|dioptrie|δ}}. Pour un objet réel, $\\overline{OA}$ est {{négatif|négative}}. Si $\\gamma$ est négatif, l’image est {{renversée}}. Dans l’œil, la distance cristallin–rétine est {{fixe|constante}} ; pour voir de près, le cristallin se {{bombe}} et sa vergence {{augmente}}.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Une image virtuelle peut être projetée sur un écran.', answer: false },
        { text: 'F et F′ sont symétriques par rapport à O.', answer: true },
        { text: 'Plus une lentille est bombée, plus sa distance focale est grande.', answer: false, explanation: 'Plus elle est bombée, plus elle est convergente : $C$ grande, $f\'$ petite.' },
        { text: 'L’image formée sur la rétine est renversée.', answer: true, explanation: 'Le cerveau interprète l’image.' },
        { text: 'Pour un objet en 2F, le grandissement vaut −1.', answer: true },
      ],
    },
  ],
}

export default chapter
