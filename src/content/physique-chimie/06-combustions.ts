import type { Chapter } from '../types'

/* ------------------------------------------------------------------ */
/*  Schémas SVG                                                        */
/* ------------------------------------------------------------------ */

const FONT = 'font-family="Geist, sans-serif"'
const BLUE = 'hsl(217 91% 60%)'
const RED = 'hsl(0 84% 60%)'
const GREEN = 'hsl(142 71% 45%)'
const ORANGE = 'hsl(25 95% 53%)'
const VIOLET = 'hsl(263 70% 60%)'

function tx(x: number, y: number, s: string, size = 12, fill = 'currentColor', anchor = 'middle', weight = '400'): string {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="central" font-size="${size}" font-weight="${weight}" fill="${fill}" ${FONT}>${s}</text>`
}

function arrow(x: number, y1: number, y2: number, color: string): string {
  const dir = y2 > y1 ? 1 : -1
  return (
    `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2 - dir * 8}" stroke="${color}" stroke-width="2"/>` +
    `<polygon points="${x - 5},${y2 - dir * 9} ${x + 5},${y2 - dir * 9} ${x},${y2}" fill="${color}"/>`
  )
}

function energyDiagramSvg(): string {
  // échelle : 0,05 px par kJ
  const yR = 196
  const yA = yR - 2648 * 0.05 // 63,6
  const yP = yA + 3460 * 0.05 // 236,6
  let s = `<svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg">`
  s += `<line x1="40" y1="20" x2="40" y2="270" stroke="currentColor" stroke-width="1.4"/><polygon points="35,24 40,12 45,24" fill="currentColor"/>`
  s += tx(48, 16, 'énergie', 11, 'currentColor', 'start')
  // niveaux
  s += `<line x1="70" y1="${yR}" x2="230" y2="${yR}" stroke="currentColor" stroke-width="2.5"/>` + tx(150, yR + 14, 'CH₄(g) + 2 O₂(g)', 12, 'currentColor', 'middle', '700')
  s += `<line x1="200" y1="${yA}" x2="440" y2="${yA}" stroke="${VIOLET}" stroke-width="2.5"/>` + tx(320, yA - 14, 'atomes séparés : C(g) + 4 H(g) + 4 O(g)', 12, VIOLET, 'middle', '700')
  s += `<line x1="410" y1="${yP}" x2="570" y2="${yP}" stroke="currentColor" stroke-width="2.5"/>` + tx(490, yP + 14, 'CO₂(g) + 2 H₂O(g)', 12, 'currentColor', 'middle', '700')
  // flèches
  s += arrow(215, yR, yA, RED)
  s += tx(208, (yR + yA) / 2 - 8, 'rupture : 4 C–H + 2 O=O', 11, RED, 'end', '600')
  s += tx(208, (yR + yA) / 2 + 8, '+ 2 648 kJ (énergie reçue)', 11, RED, 'end', '700')
  s += arrow(425, yA, yP, BLUE)
  s += tx(434, (yA + yP) / 2 - 8, 'formation : 2 C=O + 4 O–H', 11, BLUE, 'start', '600')
  s += tx(434, (yA + yP) / 2 + 8, '− 3 460 kJ (énergie libérée)', 11, BLUE, 'start', '700')
  // bilan
  s += `<line x1="320" y1="${yR}" x2="320" y2="${yP}" stroke="${GREEN}" stroke-width="1" stroke-dasharray="4 3"/>`
  s += `<line x1="230" y1="${yR}" x2="330" y2="${yR}" stroke="currentColor" stroke-width="0.8" stroke-dasharray="3 3"/>`
  s += arrow(320, yR, yP, GREEN)
  s += tx(326, (yR + yP) / 2 + 2, 'Eᵣ ≈ −812 kJ/mol', 12, GREEN, 'start', '700')
  s += tx(320, 280, 'Bilan : Eᵣ ≈ Σ E(liaisons rompues) − Σ E(liaisons formées) < 0 : réaction exothermique', 11, 'currentColor')
  s += '</svg>'
  return s
}

function fireTriangleSvg(): string {
  let s = `<svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg">`
  s += `<polygon points="260,30 90,220 430,220" fill="${ORANGE}" opacity="0.12" stroke="${ORANGE}" stroke-width="2"/>`
  s += tx(260, 150, 'FEU', 20, ORANGE, 'middle', '700')
  s += tx(140, 112, 'COMBUSTIBLE', 13, 'currentColor', 'end', '700')
  s += tx(140, 130, 'bois, gaz, essence…', 11, 'currentColor', 'end')
  s += tx(380, 112, 'COMBURANT', 13, 'currentColor', 'start', '700')
  s += tx(380, 130, 'dioxygène de l’air', 11, 'currentColor', 'start')
  s += tx(260, 240, 'ÉNERGIE D’ACTIVATION', 13, 'currentColor', 'middle', '700')
  s += tx(260, 254, 'flamme, étincelle, chaleur', 11, 'currentColor')
  s += tx(260, 186, 'Supprimer un côté = éteindre le feu', 11, RED, 'middle', '600')
  s += '</svg>'
  return s
}

function calorimetrySvg(): string {
  let s = `<svg viewBox="0 0 560 330" xmlns="http://www.w3.org/2000/svg">`
  // potence
  s += `<line x1="70" y1="20" x2="70" y2="310" stroke="currentColor" stroke-width="2"/><line x1="70" y1="110" x2="150" y2="110" stroke="currentColor" stroke-width="1.6"/>`
  // canette d'eau
  s += `<rect x="150" y="70" width="80" height="100" fill="none" stroke="currentColor" stroke-width="1.8"/>`
  s += `<rect x="151" y="90" width="78" height="79" fill="${BLUE}" opacity="0.22"/>`
  // thermomètre
  s += `<rect x="186" y="30" width="8" height="120" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="190" cy="152" r="6" fill="${RED}"/><rect x="188" y="80" width="4" height="70" fill="${RED}"/>`
  // flamme
  s += `<path d="M 190 238 C 172 220, 182 200, 190 182 C 198 200, 208 220, 190 238 Z" fill="${ORANGE}" opacity="0.8"/>`
  s += `<path d="M 190 236 C 182 226, 186 214, 190 206 C 194 214, 198 226, 190 236 Z" fill="${BLUE}" opacity="0.7"/>`
  // lampe
  s += `<rect x="186" y="238" width="8" height="14" fill="currentColor"/>`
  s += `<path d="M 150 290 L 160 252 L 220 252 L 230 290 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>`
  s += `<rect x="152" y="268" width="76" height="21" fill="${VIOLET}" opacity="0.25"/>`
  // balance
  s += `<rect x="120" y="290" width="140" height="20" fill="none" stroke="currentColor" stroke-width="1.6"/>` + tx(190, 300, '123,45 g', 11, GREEN, 'middle', '700')
  // légendes
  const L = (x: number, y: number, t1: string, t2?: string) => {
    let r = `<line x1="${x}" y1="${y}" x2="300" y2="${y}" stroke="currentColor" stroke-width="0.7"/>` + tx(306, y, t1, 12, 'currentColor', 'start', '600')
    if (t2) r += tx(306, y + 15, t2, 11, 'currentColor', 'start')
    return r
  }
  s += L(194, 46, 'thermomètre : θᵢ puis θ_f')
  s += L(230, 120, 'canette contenant une masse mₑ d’eau', 'Q reçue = mₑ · cₑ · (θ_f − θᵢ)')
  s += L(205, 210, 'flamme')
  s += L(230, 275, 'lampe à combustible (ex. éthanol)')
  s += L(260, 300, 'balance : masse de combustible brûlée Δm')
  s += '</svg>'
  return s
}

function carbonCycleSvg(): string {
  let s = `<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">`
  // fossile
  s += `<rect x="20" y="30" width="280" height="170" fill="none" class="svg-grid"/>`
  s += tx(160, 48, 'Combustible FOSSILE', 13, RED, 'middle', '700')
  s += tx(160, 76, 'carbone stocké depuis des millions d’années', 11)
  s += tx(160, 100, 'pétrole, gaz, charbon', 11)
  s += `<line x1="160" y1="170" x2="160" y2="118" stroke="${RED}" stroke-width="2"/><polygon points="155,126 165,126 160,114" fill="${RED}"/>`
  s += tx(172, 146, 'CO₂ ajouté à l’atmosphère', 11, RED, 'start', '600')
  s += tx(160, 186, '→ hausse nette du CO₂ atmosphérique', 11, 'currentColor', 'middle', '600')
  // biomasse
  s += `<rect x="340" y="30" width="280" height="170" fill="none" class="svg-grid"/>`
  s += tx(480, 48, 'BIOCOMBUSTIBLE (biomasse)', 13, GREEN, 'middle', '700')
  s += `<line x1="430" y1="160" x2="430" y2="82" stroke="${GREEN}" stroke-width="2"/><polygon points="425,90 435,90 430,78" fill="${GREEN}"/>`
  s += `<line x1="530" y1="82" x2="530" y2="160" stroke="${GREEN}" stroke-width="2"/><polygon points="525,152 535,152 530,164" fill="${GREEN}"/>`
  s += tx(420, 120, 'combustion', 11, GREEN, 'end', '600') + tx(420, 136, '(CO₂ libéré)', 11, 'currentColor', 'end')
  s += tx(540, 120, 'photosynthèse', 11, GREEN, 'start', '600') + tx(540, 136, '(CO₂ absorbé)', 11, 'currentColor', 'start')
  s += tx(480, 70, 'CO₂ atmosphérique', 12, 'currentColor', 'middle', '700')
  s += tx(480, 174, 'plantes, bois, éthanol', 12, 'currentColor', 'middle', '700')
  s += tx(480, 192, 'bilan proche de 0 sur un cycle (hors énergie de production)', 10)
  s += '</svg>'
  return s
}

/* ------------------------------------------------------------------ */
/*  Chapitre                                                           */
/* ------------------------------------------------------------------ */

const r = String.raw

const chapter: Chapter = {
  id: 'combustions',
  subject: 'physique-chimie',
  order: 6,
  title: 'Conversions d’énergie au cours d’une combustion',
  theme: 'Constitution et transformations de la matière',
  summary:
    'Combustibles usuels, équation de combustion complète, combustion vue comme une oxydo-réduction, énergie molaire de réaction, pouvoir calorifique, énergies de liaison et enjeux environnementaux.',
  duration: '2 semaines',
  objectives: [
    'Citer des exemples de combustibles usuels (fossiles et biocombustibles).',
    'Écrire l’équation de réaction de combustion complète d’un alcane et d’un alcool.',
    'Interpréter une combustion comme une réaction d’oxydo-réduction.',
    'Calculer l’énergie libérée lors d’une combustion à partir de l’énergie molaire de réaction ou du pouvoir calorifique massique.',
    'Estimer l’énergie molaire de réaction d’une transformation en phase gazeuse à partir des énergies de liaison.',
    'Mettre en œuvre une expérience pour estimer le pouvoir calorifique d’un combustible.',
    'Citer des applications usuelles des combustions, les risques associés, et des axes d’étude s’inscrivant dans une perspective de développement durable.',
  ],
  keywords: [
    'combustion', 'combustible', 'comburant', 'triangle du feu', 'combustion complète', 'combustion incomplète', 'monoxyde de carbone',
    'oxydo-réduction', 'énergie molaire de réaction', 'exothermique', 'pouvoir calorifique', 'énergie de liaison', 'gaz à effet de serre', 'biocarburant',
  ],

  /* ================================================================ */
  fiche: [
    { type: 'h2', text: '1. Combustion et combustibles' },
    {
      type: 'list',
      items: [
        '**Combustion** : transformation chimique entre un **combustible** et un **comburant** (le dioxygène O₂), qui libère de l’énergie (exothermique). Il faut aussi une énergie d’activation : c’est le **triangle du feu**.',
        'Combustibles usuels : gaz naturel (méthane CH₄), GPL (propane C₃H₈, butane C₄H₁₀), essence (modèle : octane C₈H₁₈), gazole, kérosène, charbon, bois, éthanol C₂H₆O.',
        '**Fossiles** (non renouvelables : pétrole, gaz, charbon) / **biomasse** (renouvelables : bois, bioéthanol, biogaz).',
      ],
    },
    { type: 'h2', text: '2. Équations de combustion complète' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Produits : CO₂ et H₂O',
      content: [
        { type: 'math', tex: r`\text{alcane : } \mathrm{C}_n\mathrm{H}_{2n+2} + \tfrac{3n+1}{2}\,\mathrm{O_2} \longrightarrow n\,\mathrm{CO_2} + (n+1)\,\mathrm{H_2O}` },
        { type: 'math', tex: r`\text{alcool : } \mathrm{C}_n\mathrm{H}_{2n+2}\mathrm{O} + \tfrac{3n}{2}\,\mathrm{O_2} \longrightarrow n\,\mathrm{CO_2} + (n+1)\,\mathrm{H_2O}` },
      ],
    },
    {
      type: 'table',
      headers: ['Combustible', 'Équation de combustion complète'],
      rows: [
        ['méthane', 'CH₄ + 2 O₂ → CO₂ + 2 H₂O'],
        ['propane', 'C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O'],
        ['butane', '2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O'],
        ['octane', '2 C₈H₁₈ + 25 O₂ → 16 CO₂ + 18 H₂O'],
        ['éthanol', 'C₂H₆O + 3 O₂ → 2 CO₂ + 3 H₂O'],
      ],
    },
    {
      type: 'list',
      items: [
        'Combustion **incomplète** (manque de O₂) : formation de **monoxyde de carbone CO** (toxique, inodore) et de carbone C (suies, flamme jaune).',
        'C’est une **oxydo-réduction** : le combustible est le **réducteur**, le dioxygène l’**oxydant** (couple O₂/H₂O).',
      ],
    },
    { type: 'h2', text: '3. Énergie libérée' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Énergie molaire de réaction $E_r$', value: 'énergie échangée par le système pour un avancement de 1 mol (J·mol⁻¹). $E_r < 0$ pour une combustion : le système **cède** de l’énergie.' },
        { key: 'Énergie libérée', value: '$E_{lib} = n_{comb} \\times |E_r|$ (si le combustible a pour coefficient 1).' },
        { key: 'Pouvoir calorifique massique', value: '$PC = \\dfrac{|E_r|}{M}$ (J·kg⁻¹ ou MJ·kg⁻¹) : énergie libérée par la combustion de 1 kg ; $E_{lib} = m \\times PC$.' },
      ],
    },
    {
      type: 'table',
      headers: ['Combustible', '$E_r$ (kJ·mol⁻¹)', 'PC (MJ·kg⁻¹)'],
      rows: [
        ['dihydrogène H₂', '−242', '≈ 120'],
        ['méthane', '−802', '≈ 50'],
        ['propane', '−2 044', '≈ 46'],
        ['octane (essence)', '−5 070', '≈ 44'],
        ['éthanol', '−1 235', '≈ 27'],
        ['bois sec', '—', '≈ 15 à 18'],
      ],
      caption: 'Valeurs approchées, eau formée à l’état de vapeur.',
    },
    { type: 'h2', text: '4. Énergies de liaison' },
    {
      type: 'list',
      items: [
        '**Énergie de liaison** $E(A{-}B)$ : énergie à fournir pour rompre une mole de liaisons A–B, toutes les espèces étant **gazeuses** (> 0).',
        'Rompre une liaison **consomme** de l’énergie ; en former une en **libère**.',
      ],
    },
    { type: 'math', tex: r`E_r \approx \sum E(\text{liaisons rompues}) - \sum E(\text{liaisons formées})` },
    { type: 'p', text: 'Ex. : CH₄ + 2 O₂ : $E_r \\approx (4 \\times 413 + 2 \\times 498) - (2 \\times 804 + 4 \\times 463) = -812$ kJ·mol⁻¹.' },
    { type: 'h2', text: '5. Enjeux' },
    {
      type: 'list',
      items: [
        'CO₂ : **gaz à effet de serre** → réchauffement climatique ; ressources fossiles limitées.',
        'Polluants : CO, particules fines, oxydes d’azote NOₓ, SO₂ (pluies acides). Risques : incendies, explosions, intoxication au CO.',
        'Pistes : biocarburants, dihydrogène « vert », captage du CO₂, chaudières à condensation, sobriété et efficacité énergétique.',
      ],
    },
  ],

  /* ================================================================ */
  cours: [
    { type: 'h2', text: 'I. Combustions et combustibles' },
    { type: 'h3', text: '1. Qu’est-ce qu’une combustion ?' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Combustion',
      content: [
        { type: 'p', text: 'Une **combustion** est une transformation chimique au cours de laquelle un **combustible** réagit avec un **comburant**, le plus souvent le **dioxygène** O₂ de l’air. Elle est **exothermique** : elle libère de l’énergie, essentiellement sous forme thermique (et lumineuse dans une flamme).' },
      ],
    },
    {
      type: 'p',
      text: 'Pour qu’une combustion démarre, il faut réunir trois éléments : un combustible, un comburant et une **énergie d’activation** (flamme, étincelle, surface chaude). C’est le **triangle du feu**. Supprimer l’un des trois éteint le feu : couvrir une casserole d’huile enflammée (suppression du comburant), couper l’arrivée de gaz (suppression du combustible), refroidir avec de l’eau (suppression de l’énergie).',
    },
    { type: 'svg', svg: fireTriangleSvg(), caption: 'Le triangle du feu.' },
    { type: 'h3', text: '2. Les combustibles usuels' },
    {
      type: 'table',
      headers: ['Combustible', 'Composition (modèle)', 'Origine', 'Usages'],
      rows: [
        ['gaz naturel', 'méthane CH₄ (> 90 %)', 'fossile', 'chauffage, cuisson, centrales électriques'],
        ['GPL', 'propane C₃H₈, butane C₄H₁₀', 'fossile (raffinage)', 'bouteilles de gaz, carburant'],
        ['essence', 'alcanes C₅ à C₁₀ (modèle : octane C₈H₁₈)', 'fossile (pétrole)', 'moteurs à allumage commandé'],
        ['gazole, fioul', 'alcanes C₁₀ à C₂₀ (modèle : cétane C₁₆H₃₄)', 'fossile', 'moteurs Diesel, chaudières'],
        ['kérosène', 'alcanes C₁₀ à C₁₄', 'fossile', 'avions'],
        ['charbon', 'essentiellement du carbone C', 'fossile', 'centrales, sidérurgie'],
        ['bois', 'cellulose (C₆H₁₀O₅)ₙ, lignine', 'biomasse', 'chauffage'],
        ['éthanol', 'C₂H₅OH ou C₂H₆O', 'biomasse (fermentation)', 'biocarburant (SP95-E10, E85)'],
        ['biogaz', 'méthane CH₄ + CO₂', 'biomasse (méthanisation)', 'chauffage, électricité, bus'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Fossile ou renouvelable ?',
      content: [{ type: 'p', text: 'Les combustibles **fossiles** proviennent de la transformation, sur des millions d’années, de matière organique enfouie : leurs réserves sont **limitées** à l’échelle humaine. Les combustibles issus de la **biomasse** se renouvellent à l’échelle de quelques années ou décennies.' }],
    },

    { type: 'h2', text: 'II. L’équation de combustion' },
    { type: 'h3', text: '1. Combustion complète' },
    {
      type: 'p',
      text: 'Lors de la **combustion complète** d’un combustible organique (formé de C, H, et éventuellement O), en présence de dioxygène en quantité suffisante, les seuls produits sont le **dioxyde de carbone** CO₂ et l’**eau** H₂O.',
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Ajuster une équation de combustion',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Écrire réactifs et produits', text: 'Combustible + O₂ → CO₂ + H₂O.' },
            { title: 'Ajuster C', text: 'Coefficient de CO₂ = nombre d’atomes C du combustible.' },
            { title: 'Ajuster H', text: 'Coefficient de H₂O = (nombre d’atomes H) / 2.' },
            { title: 'Ajuster O en dernier', text: 'Compter les O à droite, retrancher ceux du combustible, diviser par 2 pour obtenir le coefficient de O₂.' },
            { title: 'Éliminer les fractions', text: 'Si le coefficient de O₂ est fractionnaire, multiplier tous les coefficients par 2.' },
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé : l’octane C₈H₁₈',
      content: [
        { type: 'p', text: 'C : 8 CO₂. H : 18/2 = 9 H₂O. O à droite : $8 \\times 2 + 9 = 25$ atomes, soit $25/2$ O₂. On obtient C₈H₁₈ + 25/2 O₂ → 8 CO₂ + 9 H₂O, puis, en multipliant par 2 :' },
        { type: 'math', tex: r`2\,\mathrm{C_8H_{18}} + 25\,\mathrm{O_2} \longrightarrow 16\,\mathrm{CO_2} + 18\,\mathrm{H_2O}` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé : l’éthanol C₂H₆O',
      content: [
        { type: 'p', text: 'C : 2 CO₂. H : 6/2 = 3 H₂O. O à droite : $2 \\times 2 + 3 = 7$ ; le combustible en apporte 1 : il faut 6 atomes O, soit 3 O₂.' },
        { type: 'math', tex: r`\mathrm{C_2H_6O} + 3\,\mathrm{O_2} \longrightarrow 2\,\mathrm{CO_2} + 3\,\mathrm{H_2O}` },
      ],
    },
    {
      type: 'p',
      text: 'De façon générale, pour un alcane CₙH₂ₙ₊₂ : $n$ CO₂, $(n+1)$ H₂O, donc $2n + (n+1) = 3n + 1$ atomes O, soit $\\tfrac{3n+1}{2}$ O₂. Pour un alcool CₙH₂ₙ₊₂O, il faut un atome O de moins : $\\tfrac{3n}{2}$ O₂.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Mettre en évidence les produits',
      content: [{ type: 'p', text: 'L’eau formée se condense sur une paroi froide et bleuit le **sulfate de cuivre anhydre** (blanc). Le dioxyde de carbone **trouble l’eau de chaux**.' }],
    },
    { type: 'h3', text: '2. Combustion incomplète' },
    {
      type: 'p',
      text: 'Lorsque le dioxygène est en quantité insuffisante (pièce mal aérée, appareil mal réglé, brûleur encrassé), la combustion est **incomplète** : il se forme du **monoxyde de carbone** CO et/ou du **carbone** C (suies, fumées noires). La flamme est alors jaune et éclairante (particules de carbone incandescentes) au lieu d’être bleue.',
    },
    { type: 'math', tex: r`2\,\mathrm{CH_4} + 3\,\mathrm{O_2} \longrightarrow 2\,\mathrm{CO} + 4\,\mathrm{H_2O} \qquad \mathrm{CH_4} + \mathrm{O_2} \longrightarrow \mathrm{C} + 2\,\mathrm{H_2O}` },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Danger : le monoxyde de carbone',
      content: [{ type: 'p', text: 'Le CO est un gaz **incolore et inodore**, très toxique : il se fixe sur l’hémoglobine à la place du dioxygène. Il est responsable chaque année en France d’environ une centaine de décès. Prévention : entretien annuel des chaudières, aération des pièces, détecteurs de CO.' }],
    },
    { type: 'h3', text: '3. Réactif limitant et mélange stœchiométrique' },
    {
      type: 'p',
      text: 'Comme pour toute transformation, on peut dresser un **tableau d’avancement**. Le mélange est **stœchiométrique** lorsque les réactifs sont introduits dans les proportions des nombres stœchiométriques : pour CH₄ + 2 O₂, il faut 2 mol de O₂ par mole de méthane. L’air contenant environ 21 % de O₂ en volume, il faut à peu près $2/0{,}21 \\approx 9{,}5$ volumes d’air par volume de méthane.',
    },
    {
      type: 'table',
      headers: ['État', 'Avancement', 'CH₄', '2 O₂', 'CO₂', '2 H₂O'],
      rows: [
        ['initial', '0', '1,0 mol', '3,0 mol', '0', '0'],
        ['en cours', '$x$', '$1{,}0 - x$', '$3{,}0 - 2x$', '$x$', '$2x$'],
        ['final', '$x_{max} = 1{,}0$ mol', '0', '1,0 mol', '1,0 mol', '2,0 mol'],
      ],
      caption: 'Exemple : 1,0 mol de méthane et 3,0 mol de dioxygène ; $1{,}0 - x = 0$ donne $x = 1{,}0$ et $3{,}0 - 2x = 0$ donne $x = 1{,}5$ : le méthane est limitant.',
    },

    { type: 'h2', text: 'III. Une combustion est une oxydo-réduction' },
    {
      type: 'p',
      text: 'Une combustion peut être modélisée par une réaction d’**oxydo-réduction** : le combustible, qui cède des électrons, est le **réducteur** ; le dioxygène, qui en capte, est l’**oxydant**. On l’établit, comme vu au chapitre sur l’oxydo-réduction, à partir de deux demi-équations électroniques (écrites en milieu acide pour faciliter l’ajustement).',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Combustion du méthane',
      content: [
        { type: 'p', text: 'Couples : CO₂/CH₄ et O₂/H₂O.' },
        { type: 'math', tex: r`\mathrm{CH_4} + 2\,\mathrm{H_2O} = \mathrm{CO_2} + 8\,\mathrm{H^+} + 8\,e^- \qquad (\text{oxydation})` },
        { type: 'math', tex: r`\mathrm{O_2} + 4\,\mathrm{H^+} + 4\,e^- = 2\,\mathrm{H_2O} \qquad (\times 2,\ \text{réduction})` },
        { type: 'p', text: 'En multipliant la seconde par 2 pour échanger 8 électrons et en additionnant : CH₄ + 2 H₂O + 2 O₂ + 8 H⁺ → CO₂ + 8 H⁺ + 4 H₂O. Après simplification (2 H₂O et 8 H⁺ de chaque côté) :' },
        { type: 'math', tex: r`\mathrm{CH_4} + 2\,\mathrm{O_2} \longrightarrow \mathrm{CO_2} + 2\,\mathrm{H_2O}` },
      ],
    },

    { type: 'h2', text: 'IV. Énergie libérée par une combustion' },
    { type: 'h3', text: '1. Énergie molaire de réaction' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Énergie molaire de réaction',
      content: [
        { type: 'p', text: 'L’**énergie molaire de réaction** $E_r$ est l’énergie échangée par le système chimique avec l’extérieur lorsque l’avancement de la réaction est de 1 mol. Elle s’exprime en **J·mol⁻¹** (souvent kJ·mol⁻¹). Pour une combustion, le système cède de l’énergie : par convention $E_r < 0$.' },
        { type: 'p', text: 'L’énergie échangée pour un avancement $x$ est $E = x \\times E_r$. Lorsque le combustible a pour nombre stœchiométrique 1, $x$ est égal à la quantité de combustible brûlée $n$ :' },
        { type: 'math', tex: r`E_{\text{libérée}} = n \times |E_r| = \frac{m}{M} \times |E_r|` },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Attention aux coefficients',
      content: [{ type: 'p', text: 'On donne en général $E_r$ « par mole de combustible », c’est-à-dire pour l’équation où le combustible a le coefficient 1 (C₈H₁₈ + 25/2 O₂ → …). Si l’on utilise l’équation 2 C₈H₁₈ + 25 O₂ → 16 CO₂ + 18 H₂O, l’énergie par mole d’avancement est doublée.' }],
    },
    { type: 'h3', text: '2. Pouvoir calorifique' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Pouvoir calorifique massique',
      content: [
        { type: 'p', text: 'Le **pouvoir calorifique massique** $PC$ d’un combustible est l’énergie libérée par la combustion complète d’**un kilogramme** de ce combustible. Il s’exprime en J·kg⁻¹ (souvent MJ·kg⁻¹, et 1 MJ·kg⁻¹ = 1 kJ·g⁻¹).' },
        { type: 'math', tex: r`PC = \frac{|E_r|}{M} \qquad E_{\text{libérée}} = m \times PC` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé',
      content: [
        { type: 'p', text: 'Pour le méthane, $E_r = -802$ kJ·mol⁻¹ et $M = 16{,}0$ g·mol⁻¹ : $PC = \\dfrac{802}{16{,}0} = 50{,}1$ kJ·g⁻¹ $= 50{,}1$ MJ·kg⁻¹.' },
        { type: 'p', text: 'Énergie libérée par la combustion de 2,0 kg de méthane : $E = 2{,}0 \\times 50{,}1 = 1{,}0 \\times 10^2$ MJ.' },
      ],
    },
    {
      type: 'table',
      headers: ['Combustible', 'M (g·mol⁻¹)', '$E_r$ (kJ·mol⁻¹)', 'PC (MJ·kg⁻¹)', 'CO₂ émis (g par MJ)'],
      rows: [
        ['dihydrogène H₂', '2,0', '−242', '121', '0'],
        ['méthane CH₄', '16,0', '−802', '50,1', '55'],
        ['propane C₃H₈', '44,0', '−2 044', '46,5', '65'],
        ['butane C₄H₁₀', '58,0', '−2 657', '45,8', '66'],
        ['octane C₈H₁₈', '114', '−5 070', '44,5', '69'],
        ['méthanol CH₄O', '32,0', '−638', '19,9', '69'],
        ['éthanol C₂H₆O', '46,0', '−1 235', '26,8', '71'],
        ['carbone (charbon) C', '12,0', '−394', '32,8', '112'],
      ],
      caption: 'Valeurs approchées (eau formée à l’état gazeux, conditions usuelles). CO₂ par MJ = (nombre de C × 44 g) / |Eᵣ|.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'PCI et PCS',
      content: [{ type: 'p', text: 'Si l’eau formée se **condense**, elle libère en plus environ 44 kJ par mole d’eau : on parle de pouvoir calorifique **supérieur** (PCS), alors que le pouvoir calorifique **inférieur** (PCI) correspond à l’eau sous forme de vapeur. Pour le méthane : $802 + 2 \\times 44 = 890$ kJ·mol⁻¹. Les **chaudières à condensation** récupèrent cette énergie.' }],
    },
    { type: 'h3', text: '3. Estimer expérimentalement un pouvoir calorifique' },
    {
      type: 'p',
      text: 'On chauffe une masse d’eau connue $m_e$ avec la flamme du combustible. L’énergie reçue par l’eau, qui passe de la température $\\theta_i$ à $\\theta_f$, vaut $Q = m_e\\,c_e\\,(\\theta_f - \\theta_i)$, où $c_e = 4{,}18$ J·g⁻¹·°C⁻¹ est la capacité thermique massique de l’eau. On pèse le brûleur avant et après pour connaître la masse $\\Delta m$ de combustible brûlée.',
    },
    { type: 'svg', svg: calorimetrySvg(), caption: 'Dispositif d’estimation du pouvoir calorifique d’un combustible.' },
    { type: 'math', tex: r`PC_{\text{exp}} = \frac{m_e\,c_e\,(\theta_f - \theta_i)}{\Delta m}` },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Une estimation par défaut',
      content: [{ type: 'p', text: 'Une grande partie de l’énergie libérée chauffe l’air, la canette, le support… et une combustion incomplète (suies sous la canette) libère moins d’énergie. La valeur expérimentale est donc **inférieure** à la valeur tabulée. Pour améliorer : protéger la flamme des courants d’air, rapprocher la canette, utiliser un calorimètre.' }],
    },

    { type: 'h2', text: 'V. Interprétation microscopique : les énergies de liaison' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Énergie de liaison',
      content: [
        { type: 'p', text: 'L’**énergie de liaison** $E(A{-}B)$ est l’énergie qu’il faut **fournir** pour rompre une mole de liaisons A–B, les espèces étant à l’état **gazeux**. C’est une grandeur positive, exprimée en kJ·mol⁻¹. Inversement, la formation d’une mole de liaisons A–B **libère** la même énergie.' },
      ],
    },
    {
      type: 'table',
      headers: ['Liaison', 'H–H', 'C–H', 'C–C', 'C=C', 'C–O', 'C=O (dans CO₂)', 'O=O', 'O–H', 'N≡N'],
      rows: [['E (kJ·mol⁻¹)', '436', '413', '348', '614', '358', '804', '498', '463', '945']],
      caption: 'Énergies de liaison moyennes (les valeurs peuvent légèrement différer selon les tables).',
    },
    {
      type: 'p',
      text: 'On modélise la réaction en deux étapes fictives : **rupture** de toutes les liaisons des réactifs (on obtient des atomes isolés à l’état gazeux, ce qui **coûte** de l’énergie), puis **formation** des liaisons des produits (ce qui en **libère**). D’où :',
    },
    { type: 'math', tex: r`E_r \approx \sum E(\text{liaisons rompues}) - \sum E(\text{liaisons formées})` },
    { type: 'svg', svg: energyDiagramSvg(), caption: 'Diagramme énergétique de la combustion du méthane (à l’échelle).' },
    {
      type: 'steps',
      items: [
        { title: 'Écrire les formules développées', text: 'Pour dénombrer les liaisons de chaque espèce (ex. CH₄ : 4 C–H ; O₂ : 1 O=O ; CO₂ : 2 C=O ; H₂O : 2 O–H).' },
        { title: 'Faire le bilan des liaisons rompues', text: 'En tenant compte des nombres stœchiométriques (équation avec le combustible au coefficient 1).' },
        { title: 'Faire le bilan des liaisons formées', text: 'Idem pour les produits.' },
        { title: 'Calculer', text: '$E_r$ = somme (rompues) − somme (formées). Vérifier le signe : négatif pour une combustion.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé : combustion du méthane',
      content: [
        { type: 'p', text: 'CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(g).' },
        { type: 'p', text: 'Liaisons rompues : 4 C–H et 2 O=O : $4 \\times 413 + 2 \\times 498 = 1652 + 996 = 2648$ kJ.' },
        { type: 'p', text: 'Liaisons formées : 2 C=O et 4 O–H : $2 \\times 804 + 4 \\times 463 = 1608 + 1852 = 3460$ kJ.' },
        { type: 'p', text: '$E_r \\approx 2648 - 3460 = -812$ kJ·mol⁻¹. La valeur mesurée est −802 kJ·mol⁻¹ : l’écart (environ 1 %) vient de ce que les énergies de liaison tabulées sont des **moyennes** sur de nombreuses molécules.' },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Interprétation',
      content: [{ type: 'p', text: 'Une combustion est exothermique parce que les liaisons formées (C=O et O–H, très solides) libèrent plus d’énergie que n’en consomme la rupture des liaisons des réactifs. La méthode s’applique aux transformations où **toutes les espèces sont gazeuses** ; sinon, il faudrait tenir compte des changements d’état.' }],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Autre exemple : le dihydrogène',
      content: [
        { type: 'p', text: 'H₂(g) + ½ O₂(g) → H₂O(g). Rompues : 1 H–H + ½ O=O = $436 + 249 = 685$ kJ ; formées : 2 O–H = 926 kJ. $E_r \\approx 685 - 926 = -241$ kJ·mol⁻¹ (valeur tabulée : −242). Avec $M = 2{,}0$ g·mol⁻¹, $PC \\approx 120$ MJ·kg⁻¹ : le meilleur pouvoir calorifique massique, et aucune émission de CO₂.' },
      ],
    },

    { type: 'h2', text: 'VI. Enjeux de société et environnementaux' },
    { type: 'h3', text: '1. Applications et risques' },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Transports', text: 'Moteurs à essence, Diesel, réacteurs d’avion : environ un tiers de l’énergie finale consommée en France.', icon: 'Car' },
        { title: 'Chauffage et cuisson', text: 'Chaudières au gaz ou au fioul, poêles à bois, gazinières.', icon: 'Flame' },
        { title: 'Production d’électricité', text: 'Centrales thermiques au gaz, au charbon ou à la biomasse.', icon: 'Factory' },
      ],
    },
    {
      type: 'list',
      items: [
        '**Incendies** et **explosions** (fuite de gaz : un mélange air–gaz peut exploser au contact d’une étincelle).',
        '**Intoxications au monoxyde de carbone** (combustions incomplètes).',
        '**Brûlures**. Pictogramme « inflammable » sur les étiquettes des combustibles.',
      ],
    },
    { type: 'h3', text: '2. Effet de serre et réchauffement climatique' },
    {
      type: 'p',
      text: 'La combustion des combustibles fossiles libère dans l’atmosphère du carbone stocké dans le sous-sol depuis des millions d’années, sous forme de **CO₂**, principal gaz à effet de serre d’origine humaine. La concentration atmosphérique de CO₂ est passée d’environ 280 ppm avant l’ère industrielle à plus de 420 ppm aujourd’hui, ce qui renforce l’effet de serre et provoque le **réchauffement climatique**.',
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Calculer une masse de CO₂ émise',
      content: [
        { type: 'p', text: 'Combustion de 1,00 kg d’octane : $n = \\dfrac{1000}{114} = 8{,}77$ mol. D’après 2 C₈H₁₈ + 25 O₂ → 16 CO₂ + 18 H₂O, $n(\\mathrm{CO_2}) = 8\\,n = 70{,}2$ mol, soit $m = 70{,}2 \\times 44{,}0 = 3{,}09 \\times 10^3$ g. Brûler 1 kg d’essence émet environ **3 kg de CO₂** (les atomes O viennent de l’air !).' },
      ],
    },
    { type: 'svg', svg: carbonCycleSvg(), caption: 'Combustible fossile et biocombustible : bilan carbone comparé.' },
    { type: 'h3', text: '3. Autres pollutions' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Oxydes d’azote NOₓ', value: 'formés à haute température dans les moteurs à partir du N₂ et du O₂ de l’air ; irritants, à l’origine de l’ozone de basse altitude (pics de pollution).' },
        { key: 'Dioxyde de soufre SO₂', value: 'provient du soufre présent comme impureté (charbon, fioul) ; responsable de pluies acides.' },
        { key: 'Particules fines', value: 'suies issues des combustions incomplètes (Diesel, chauffage au bois mal maîtrisé) ; effets sur la santé respiratoire et cardiovasculaire.' },
        { key: 'Monoxyde de carbone CO', value: 'toxique (voir plus haut).' },
      ],
    },
    { type: 'h3', text: '4. Perspectives de développement durable' },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Biocarburants', text: 'Bioéthanol (betterave, canne à sucre, résidus agricoles), biodiesel, biogaz : le CO₂ émis a été absorbé par les plantes lors de leur croissance. Limites : surfaces agricoles, énergie de production.', icon: 'Leaf' },
        { title: 'Dihydrogène', text: 'Sa combustion (ou son utilisation en pile à combustible) ne produit que de l’eau. Il doit être produit sans énergie fossile (électrolyse de l’eau avec électricité renouvelable ou nucléaire) et stocké en sécurité.', icon: 'Atom' },
        { title: 'Captage et stockage du CO₂', text: 'Récupérer le CO₂ en sortie des centrales et des usines pour le stocker dans le sous-sol ou le valoriser.', icon: 'Database' },
        { title: 'Efficacité et sobriété', text: 'Chaudières à condensation, isolation des bâtiments, moteurs plus efficaces, réduction des consommations.', icon: 'Gauge' },
      ],
    },
  ],

  /* ================================================================ */
  exercices: [
    {
      id: 'pc06-ex1',
      title: 'Ajuster des équations de combustion',
      difficulty: 1,
      duration: 10,
      tags: ['équation', 'combustion complète'],
      statement: [
        { type: 'p', text: 'Écrire l’équation de la combustion complète de chacun des combustibles suivants :' },
        {
          type: 'list',
          items: ['a) propane C₃H₈', 'b) pentane C₅H₁₂', 'c) butane C₄H₁₀', 'd) méthanol CH₄O', 'e) propan-1-ol C₃H₈O', 'f) glucose C₆H₁₂O₆'],
        },
        { type: 'p', text: 'g) Vérifier les résultats a) et b) à l’aide de la formule générale des alcanes.' },
      ],
      hints: ['Ajuster dans l’ordre : C, puis H, puis O.', 'Pour les alcools, ne pas oublier l’atome O du combustible.'],
      solution: [
        { type: 'p', text: 'a) C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O (O : $3 \\times 2 + 4 = 10$, soit 5 O₂).' },
        { type: 'p', text: 'b) C₅H₁₂ + 8 O₂ → 5 CO₂ + 6 H₂O (O : $10 + 6 = 16$, soit 8 O₂).' },
        { type: 'p', text: 'c) C₄H₁₀ + 13/2 O₂ → 4 CO₂ + 5 H₂O, soit 2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O.' },
        { type: 'p', text: 'd) CH₄O + 3/2 O₂ → CO₂ + 2 H₂O (O à droite : 4, dont 1 apporté par le méthanol), soit 2 CH₄O + 3 O₂ → 2 CO₂ + 4 H₂O.' },
        { type: 'p', text: 'e) C₃H₈O + 9/2 O₂ → 3 CO₂ + 4 H₂O (O : $6 + 4 - 1 = 9$), soit 2 C₃H₈O + 9 O₂ → 6 CO₂ + 8 H₂O.' },
        { type: 'p', text: 'f) C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O (O : $12 + 6 - 6 = 12$, soit 6 O₂). C’est le bilan de la respiration cellulaire.' },
        { type: 'p', text: 'g) Pour un alcane, $\\tfrac{3n+1}{2}$ O₂ : $n = 3$ → $10/2 = 5$ ✓ ; $n = 5$ → $16/2 = 8$ ✓.' },
      ],
    },
    {
      id: 'pc06-ex2',
      title: 'Une cartouche de butane',
      difficulty: 1,
      duration: 12,
      tags: ['énergie libérée', 'pouvoir calorifique'],
      statement: [
        { type: 'p', text: 'Une cartouche de camping contient 190 g de butane C₄H₁₀. Données : $E_r = -2{,}66 \\times 10^3$ kJ·mol⁻¹ (par mole de butane) ; M(C) = 12,0 g·mol⁻¹ ; M(H) = 1,0 g·mol⁻¹ ; $c_e = 4{,}18$ J·g⁻¹·°C⁻¹.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la quantité de butane contenue dans la cartouche.',
            'Calculer l’énergie libérée par la combustion complète de tout le butane.',
            'Calculer le pouvoir calorifique massique du butane en MJ·kg⁻¹.',
            'On veut porter 2,0 L d’eau (2,0 kg) de 15 °C à 100 °C. Quelle énergie l’eau doit-elle recevoir ? Seulement 50 % de l’énergie libérée par le réchaud est transmise à l’eau : quelle masse de butane faut-il brûler ?',
          ],
        },
      ],
      hints: ['$M(\\mathrm{C_4H_{10}}) = 4 \\times 12{,}0 + 10 \\times 1{,}0$.', '$Q = m\\,c\\,\\Delta\\theta$.'],
      solution: [
        { type: 'p', text: '1. $M = 58{,}0$ g·mol⁻¹ ; $n = \\dfrac{190}{58{,}0} = 3{,}28$ mol.' },
        { type: 'p', text: '2. $E = n \\times |E_r| = 3{,}28 \\times 2{,}66 \\times 10^3 = 8{,}71 \\times 10^3$ kJ ≈ **8,7 MJ**.' },
        { type: 'p', text: '3. $PC = \\dfrac{|E_r|}{M} = \\dfrac{2{,}66 \\times 10^3\\ \\text{kJ·mol}^{-1}}{58{,}0\\ \\text{g·mol}^{-1}} = 45{,}9$ kJ·g⁻¹ = **45,9 MJ·kg⁻¹**.' },
        { type: 'p', text: '4. $Q = 2{,}0 \\times 10^3 \\times 4{,}18 \\times (100 - 15) = 7{,}1 \\times 10^5$ J = 711 kJ. Énergie à libérer : $711 / 0{,}50 = 1{,}42 \\times 10^3$ kJ. Masse de butane : $m = \\dfrac{1{,}42 \\times 10^3\\ \\text{kJ}}{45{,}9\\ \\text{kJ·g}^{-1}} = 31$ g.' },
      ],
    },
    {
      id: 'pc06-ex3',
      title: 'La combustion du propane, une oxydo-réduction',
      difficulty: 2,
      duration: 12,
      tags: ['oxydo-réduction'],
      statement: [
        { type: 'p', text: 'Couples mis en jeu : CO₂/C₃H₈ et O₂/H₂O.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire la demi-équation électronique du couple CO₂/C₃H₈ en milieu acide.',
            'Écrire celle du couple O₂/H₂O.',
            'En déduire l’équation de la combustion du propane. Préciser l’oxydant et le réducteur.',
          ],
        },
      ],
      hints: ['Ajuster C, puis O avec H₂O, puis H avec H⁺, puis les charges avec e⁻.', 'Les deux demi-équations doivent échanger le même nombre d’électrons.'],
      solution: [
        { type: 'p', text: '1. C₃H₈ + 6 H₂O = 3 CO₂ + 20 H⁺ + 20 e⁻ (C : 3 ; O : 6 = 6 ; H : 8 + 12 = 20 ; charges : 0 = 20 − 20).' },
        { type: 'p', text: '2. O₂ + 4 H⁺ + 4 e⁻ = 2 H₂O.' },
        { type: 'p', text: '3. On multiplie la seconde par 5 : 5 O₂ + 20 H⁺ + 20 e⁻ = 10 H₂O. Somme : C₃H₈ + 6 H₂O + 5 O₂ + 20 H⁺ → 3 CO₂ + 20 H⁺ + 10 H₂O, d’où après simplification **C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O**. Le propane, qui cède des électrons, est le **réducteur** ; le dioxygène, qui en capte, est l’**oxydant**.' },
      ],
    },
    {
      id: 'pc06-ex4',
      title: 'Énergies de liaison : combustion du méthane et du propane',
      difficulty: 2,
      duration: 15,
      tags: ['énergies de liaison'],
      statement: [
        { type: 'p', text: 'Données (kJ·mol⁻¹) : C–H 413 ; C–C 348 ; O=O 498 ; C=O (CO₂) 804 ; O–H 463. Toutes les espèces sont gazeuses.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dénombrer les liaisons de CH₄, O₂, CO₂ et H₂O à partir de leurs formules développées.',
            'Estimer l’énergie molaire de réaction de la combustion du méthane.',
            'Même question pour le propane (C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O). En déduire son pouvoir calorifique massique (M = 44,0 g·mol⁻¹).',
            'Les valeurs tabulées sont −802 et −2044 kJ·mol⁻¹. Calculer les écarts relatifs et proposer une explication.',
          ],
        },
      ],
      hints: ['Le propane CH₃–CH₂–CH₃ possède 8 liaisons C–H et 2 liaisons C–C.', '$E_r \\approx \\sum E_{rompues} - \\sum E_{formées}$.'],
      solution: [
        { type: 'p', text: '1. CH₄ : 4 C–H ; O₂ : 1 O=O ; CO₂ (O=C=O) : 2 C=O ; H₂O (H–O–H) : 2 O–H.' },
        { type: 'p', text: '2. Rompues : $4 \\times 413 + 2 \\times 498 = 2648$ kJ ; formées : $2 \\times 804 + 4 \\times 463 = 3460$ kJ. $E_r \\approx -812$ kJ·mol⁻¹.' },
        { type: 'p', text: '3. Rompues : $8 \\times 413 + 2 \\times 348 + 5 \\times 498 = 3304 + 696 + 2490 = 6490$ kJ. Formées : $3 \\times 2 \\times 804 + 4 \\times 2 \\times 463 = 4824 + 3704 = 8528$ kJ. $E_r \\approx 6490 - 8528 = -2038$ kJ·mol⁻¹. $PC = 2038 / 44{,}0 = 46{,}3$ kJ·g⁻¹ = 46,3 MJ·kg⁻¹.' },
        { type: 'p', text: '4. Méthane : $\\dfrac{|-812 - (-802)|}{802} = 1{,}2\\ \\%$ ; propane : $\\dfrac{6}{2044} = 0{,}3\\ \\%$. Les énergies de liaison sont des valeurs **moyennes** (une liaison C–H n’a pas exactement la même énergie dans toutes les molécules) : le calcul n’est qu’une estimation, néanmoins très satisfaisante.' },
      ],
    },
    {
      id: 'pc06-ex5',
      title: 'Le dihydrogène, combustible d’avenir ?',
      difficulty: 2,
      duration: 15,
      tags: ['énergies de liaison', 'pouvoir calorifique', 'développement durable'],
      statement: [
        { type: 'p', text: 'Données : E(H–H) = 436 kJ·mol⁻¹ ; E(O=O) = 498 kJ·mol⁻¹ ; E(O–H) = 463 kJ·mol⁻¹ ; M(H) = 1,0 g·mol⁻¹ ; PC(méthane) = 50 MJ·kg⁻¹. Masse volumique du dihydrogène gazeux à 20 °C et 1 bar : 0,083 kg·m⁻³ ; du méthane : 0,67 kg·m⁻³.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire l’équation de la combustion du dihydrogène (eau gazeuse), avec H₂ au coefficient 1.',
            'Estimer son énergie molaire de réaction et son pouvoir calorifique massique.',
            'Comparer avec le méthane. Quel avantage environnemental présente le dihydrogène ?',
            'Calculer l’énergie libérée par la combustion de 1 m³ de chaque gaz (20 °C, 1 bar). Quel inconvénient du dihydrogène apparaît ?',
          ],
        },
      ],
      hints: ['½ O=O à rompre par mole de H₂.', 'Masse de 1 m³ = masse volumique × 1 m³.'],
      solution: [
        { type: 'p', text: '1. H₂(g) + ½ O₂(g) → H₂O(g).' },
        { type: 'p', text: '2. Rompues : $436 + \\tfrac{1}{2} \\times 498 = 685$ kJ ; formées : $2 \\times 463 = 926$ kJ ; $E_r \\approx -241$ kJ·mol⁻¹. $PC = \\dfrac{241}{2{,}0} = 1{,}2 \\times 10^2$ kJ·g⁻¹ = **120 MJ·kg⁻¹**.' },
        { type: 'p', text: '3. Le dihydrogène libère environ 2,4 fois plus d’énergie par kilogramme que le méthane, et sa combustion ne produit que de l’eau : **aucune émission de CO₂** (à condition qu’il soit produit sans énergie fossile).' },
        { type: 'p', text: '4. 1 m³ de H₂ : $m = 0{,}083$ kg → $E = 0{,}083 \\times 120 = 10$ MJ. 1 m³ de CH₄ : $m = 0{,}67$ kg → $E = 0{,}67 \\times 50 = 34$ MJ. Le dihydrogène est très peu dense : pour stocker la même énergie, il faut un volume environ 3 fois plus grand, ou le comprimer fortement (réservoirs à 700 bar), ce qui pose des difficultés techniques et de sécurité.' },
      ],
    },
    {
      id: 'pc06-ex6',
      title: 'Tableau d’avancement d’une combustion',
      difficulty: 2,
      duration: 15,
      tags: ['avancement', 'réactif limitant', 'combustion incomplète'],
      statement: [
        { type: 'p', text: 'On fait brûler 0,50 mol de propane avec 2,0 mol de dioxygène. Équation : C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O ; $E_r = -2044$ kJ·mol⁻¹.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dresser le tableau d’avancement.',
            'Déterminer l’avancement maximal et le réactif limitant.',
            'Donner la composition du système à l’état final (transformation totale).',
            'Calculer l’énergie libérée.',
            'Le mélange est-il stœchiométrique ? Dans la réalité, quel risque présente une telle situation ?',
            'L’air contient 21 % de dioxygène en volume. Quel volume d’air faut-il au minimum pour brûler complètement 1,0 L de propane (volumes mesurés dans les mêmes conditions) ?',
          ],
        },
      ],
      hints: ['Comparer $0{,}50/1$ et $2{,}0/5$.', 'Dans les mêmes conditions, les volumes de gaz sont proportionnels aux quantités de matière.'],
      solution: [
        {
          type: 'table',
          headers: ['État', 'x (mol)', 'C₃H₈', '5 O₂', '3 CO₂', '4 H₂O'],
          rows: [
            ['initial', '0', '0,50', '2,0', '0', '0'],
            ['en cours', '$x$', '$0{,}50 - x$', '$2{,}0 - 5x$', '$3x$', '$4x$'],
            ['final', '$x_{max} = 0{,}40$', '0,10', '0', '1,2', '1,6'],
          ],
        },
        { type: 'p', text: '2. Si C₃H₈ est limitant : $x = 0{,}50$ mol ; si O₂ est limitant : $2{,}0 - 5x = 0$ → $x = 0{,}40$ mol. On retient la plus petite valeur : $x_{max} = 0{,}40$ mol, **le dioxygène est limitant**.' },
        { type: 'p', text: '3. État final : 0,10 mol de propane, 0 mol de O₂, 1,2 mol de CO₂ et 1,6 mol de H₂O.' },
        { type: 'p', text: '4. $E = x_{max} \\times |E_r| = 0{,}40 \\times 2044 = 818$ kJ ≈ $8{,}2 \\times 10^2$ kJ.' },
        { type: 'p', text: '5. Non : il faudrait 5 × 0,50 = 2,5 mol de O₂. En réalité, un défaut de dioxygène conduit à une **combustion incomplète**, avec formation de monoxyde de carbone (toxique) et de suies.' },
        { type: 'p', text: '6. Il faut 5,0 L de O₂, donc $V_{air} = \\dfrac{5{,}0}{0{,}21} = 24$ L d’air.' },
      ],
    },
    {
      id: 'pc06-ex7',
      title: 'Estimer le pouvoir calorifique de l’éthanol',
      difficulty: 2,
      duration: 15,
      tags: ['expérience', 'pouvoir calorifique', 'incertitudes'],
      statement: [
        { type: 'p', text: 'Une lampe à éthanol chauffe une canette contenant 200 g d’eau. La température de l’eau passe de 20,0 °C à 45,0 °C. La lampe a perdu 1,20 g pendant l’expérience. Données : $c_e = 4{,}18$ J·g⁻¹·°C⁻¹ ; PC tabulé de l’éthanol : 26,8 MJ·kg⁻¹.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer l’énergie reçue par l’eau.',
            'En déduire une estimation du pouvoir calorifique de l’éthanol.',
            'Comparer à la valeur tabulée (écart relatif). Quelle fraction de l’énergie libérée a effectivement chauffé l’eau ?',
            'Proposer deux causes de l’écart et deux améliorations du protocole.',
          ],
        },
      ],
      hints: ['$Q = m_e c_e (\\theta_f - \\theta_i)$.', 'Rendement de transfert = $PC_{exp}/PC_{tab}$.'],
      solution: [
        { type: 'p', text: '1. $Q = 200 \\times 4{,}18 \\times (45{,}0 - 20{,}0) = 2{,}09 \\times 10^4$ J = 20,9 kJ.' },
        { type: 'p', text: '2. $PC_{exp} = \\dfrac{20{,}9\\ \\text{kJ}}{1{,}20\\ \\text{g}} = 17{,}4$ kJ·g⁻¹ = 17,4 MJ·kg⁻¹.' },
        { type: 'p', text: '3. Écart relatif : $\\dfrac{26{,}8 - 17{,}4}{26{,}8} = 35\\ \\%$. Seuls $\\dfrac{17{,}4}{26{,}8} = 65\\ \\%$ de l’énergie libérée ont chauffé l’eau.' },
        { type: 'p', text: '4. Causes : pertes thermiques (air chauffé autour de la flamme, canette et thermomètre chauffés, rayonnement) ; combustion en partie incomplète ; évaporation d’éthanol non brûlé (la masse perdue ne correspond pas entièrement à de l’éthanol brûlé). Améliorations : protéger la flamme par un écran (paravent), rapprocher la canette de la flamme, couvrir la canette, utiliser un calorimètre, agiter l’eau, prendre en compte la capacité thermique de la canette.' },
      ],
    },
    {
      id: 'pc06-ex8',
      title: 'Éthanol ou essence ? (type bac)',
      difficulty: 3,
      duration: 30,
      tags: ['énergies de liaison', 'pouvoir calorifique', 'CO₂', 'biocarburant', 'type bac'],
      statement: [
        { type: 'p', text: 'Le superéthanol E85 contient jusqu’à 85 % d’éthanol, produit par fermentation de betteraves ou de céréales. On compare l’éthanol C₂H₆O et l’essence, modélisée par l’octane C₈H₁₈.' },
        {
          type: 'table',
          headers: ['Donnée', 'Éthanol', 'Octane'],
          rows: [
            ['M (g·mol⁻¹)', '46,0', '114'],
            ['masse volumique (kg·L⁻¹)', '0,79', '0,70'],
            ['$E_r$ tabulée (kJ·mol⁻¹)', '−1 235', '−5 070'],
          ],
        },
        { type: 'p', text: 'Énergies de liaison (kJ·mol⁻¹) : C–H 413 ; C–C 348 ; C–O 358 ; O–H 463 ; O=O 498 ; C=O (CO₂) 804. M(CO₂) = 44,0 g·mol⁻¹.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire la formule semi-développée de l’éthanol et dénombrer ses liaisons.',
            'Écrire l’équation de combustion complète de l’éthanol, puis estimer son énergie molaire de réaction à l’aide des énergies de liaison (toutes espèces gazeuses). Comparer à la valeur tabulée.',
            'Calculer le pouvoir calorifique massique de chaque combustible, puis l’énergie libérée par la combustion d’un litre de chacun.',
            'Une voiture consomme 6,0 L d’essence aux 100 km. Estimer sa consommation d’éthanol pur pour la même distance (même rendement du moteur).',
            'Calculer la masse de CO₂ émise par MJ d’énergie libérée pour chaque combustible.',
            'Les deux valeurs sont proches. Pourquoi l’éthanol est-il cependant présenté comme une solution pour limiter le réchauffement climatique ? Citer une limite.',
          ],
        },
      ],
      hints: [
        'CH₃–CH₂–OH : 5 C–H, 1 C–C, 1 C–O, 1 O–H.',
        'Énergie d’un litre = ρ × V × PC.',
        'Par mole de combustible : éthanol 2 CO₂, octane 8 CO₂.',
      ],
      solution: [
        { type: 'p', text: '1. CH₃–CH₂–OH : 5 liaisons C–H, 1 C–C, 1 C–O, 1 O–H.' },
        { type: 'p', text: '2. C₂H₆O + 3 O₂ → 2 CO₂ + 3 H₂O. Rompues : $5 \\times 413 + 348 + 358 + 463 + 3 \\times 498 = 2065 + 348 + 358 + 463 + 1494 = 4728$ kJ. Formées : $4 \\times 804 + 6 \\times 463 = 3216 + 2778 = 5994$ kJ. $E_r \\approx 4728 - 5994 = -1266$ kJ·mol⁻¹. Écart avec −1235 : $31/1235 = 2{,}5\\ \\%$ (énergies de liaison moyennes ; de plus l’éthanol est liquide à 25 °C, et la valeur tabulée ne correspond pas exactement à la phase gazeuse).' },
        { type: 'p', text: '3. $PC_{éthanol} = 1235/46{,}0 = 26{,}8$ MJ·kg⁻¹ ; $PC_{octane} = 5070/114 = 44{,}5$ MJ·kg⁻¹. Pour 1 L : éthanol $0{,}79 \\times 26{,}8 = 21{,}2$ MJ ; octane $0{,}70 \\times 44{,}5 = 31{,}2$ MJ.' },
        { type: 'p', text: '4. Il faut la même énergie : $V = 6{,}0 \\times \\dfrac{31{,}2}{21{,}2} = 8{,}8$ L d’éthanol aux 100 km (environ 47 % de plus).' },
        { type: 'p', text: '5. Éthanol : 2 mol de CO₂ (88,0 g) pour 1235 kJ → $\\dfrac{88{,}0}{1{,}235} = 71$ g·MJ⁻¹. Octane : 8 mol de CO₂ (352 g) pour 5070 kJ → $\\dfrac{352}{5{,}070} = 69$ g·MJ⁻¹.' },
        { type: 'p', text: '6. Le carbone de l’éthanol provient du CO₂ **absorbé par les plantes** lors de leur croissance (photosynthèse) quelques mois plus tôt : sur un cycle, le bilan net est proche de zéro, alors que l’octane libère du carbone fossile stocké depuis des millions d’années. Limites : l’agriculture, la fermentation et la distillation consomment de l’énergie (souvent fossile) ; les cultures occupent des terres agricoles (concurrence avec l’alimentation).' },
      ],
    },
    {
      id: 'pc06-ex9',
      title: 'Choisir un mode de chauffage (type bac)',
      difficulty: 3,
      duration: 30,
      tags: ['pouvoir calorifique', 'CO₂', 'PCS', 'type bac'],
      statement: [
        { type: 'p', text: 'Une maison a besoin chaque année de 15 000 kWh de chaleur (1 kWh = 3,6 MJ). On compare trois solutions : une chaudière au gaz naturel (méthane), une chaudière au charbon (modélisé par du carbone pur) et un poêle à granulés de bois.' },
        {
          type: 'table',
          headers: ['Combustible', 'Équation', '$E_r$ (kJ·mol⁻¹)', 'M (g·mol⁻¹)'],
          rows: [
            ['méthane', 'CH₄ + 2 O₂ → CO₂ + 2 H₂O', '−802 (eau vapeur)', '16,0'],
            ['carbone', 'C + O₂ → CO₂', '−394', '12,0'],
          ],
        },
        { type: 'p', text: 'Données : M(CO₂) = 44,0 g·mol⁻¹ ; énergie libérée par la condensation de l’eau : 44 kJ par mole d’eau ; on considère que toute l’énergie libérée chauffe la maison.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Convertir le besoin annuel en MJ.',
            'Calculer la masse de méthane nécessaire, puis la masse de CO₂ émise.',
            'Même question pour le charbon. Conclure.',
            'Une chaudière à condensation récupère l’énergie de condensation de l’eau formée. Calculer l’énergie libérée par mole de méthane dans ce cas, puis le pourcentage de gaz économisé.',
            'Le bois émet, par MJ, autant de CO₂ que le charbon. Pourquoi le considère-t-on néanmoins comme une énergie renouvelable à faible impact climatique ? Quelle pollution spécifique faut-il surveiller ?',
          ],
        },
      ],
      hints: ['$E = 15\\,000 \\times 3{,}6$ MJ.', 'Pour le méthane, 1 mol de CO₂ par mole de méthane ; idem pour le carbone.', '2 mol d’eau se condensent par mole de méthane.'],
      solution: [
        { type: 'p', text: '1. $E = 15\\,000 \\times 3{,}6 = 5{,}4 \\times 10^4$ MJ.' },
        { type: 'p', text: '2. $n(\\mathrm{CH_4}) = \\dfrac{5{,}4 \\times 10^{10}\\ \\text{J}}{8{,}02 \\times 10^5\\ \\text{J·mol}^{-1}} = 6{,}7 \\times 10^4$ mol ; $m = 6{,}7 \\times 10^4 \\times 16{,}0 = 1{,}1 \\times 10^6$ g = **1,1 t de méthane**. $n(\\mathrm{CO_2}) = n(\\mathrm{CH_4})$ : $m(\\mathrm{CO_2}) = 6{,}7 \\times 10^4 \\times 44{,}0 = 3{,}0 \\times 10^6$ g = **3,0 t de CO₂**.' },
        { type: 'p', text: '3. $n(\\mathrm{C}) = \\dfrac{5{,}4 \\times 10^{10}}{3{,}94 \\times 10^5} = 1{,}37 \\times 10^5$ mol ; $m(\\mathrm{C}) = 1{,}6$ t ; $m(\\mathrm{CO_2}) = 1{,}37 \\times 10^5 \\times 44{,}0 = 6{,}0 \\times 10^6$ g = **6,0 t de CO₂**, soit deux fois plus qu’avec le gaz. Le méthane, riche en hydrogène, produit une partie de son énergie en formant de l’eau et non du CO₂ : il émet moins de CO₂ par MJ.' },
        { type: 'p', text: '4. Par mole de CH₄, 2 mol d’eau se condensent : $802 + 2 \\times 44 = 890$ kJ. Pour la même énergie, la quantité de méthane est multipliée par $\\dfrac{802}{890} = 0{,}90$ : on économise environ **10 %** de gaz (et de CO₂).' },
        { type: 'p', text: '5. Le CO₂ émis par le bois a été absorbé par l’arbre pendant sa croissance : si la forêt est gérée durablement (replantation), le bilan carbone sur un cycle est proche de zéro. En revanche, la combustion du bois, surtout dans des appareils anciens, émet beaucoup de **particules fines** (et de CO en cas de combustion incomplète), dangereuses pour la santé.' },
      ],
    },
  ],

  /* ================================================================ */
  representations: [
    {
      type: 'widget',
      id: 'advancement-table',
      props: {
        reaction: {
          reactants: [
            { formula: 'CH4', coef: 1, n0: 2 },
            { formula: 'O2', coef: 2, n0: 3 },
          ],
          products: [
            { formula: 'CO2', coef: 1, n0: 0 },
            { formula: 'H2O', coef: 2, n0: 0 },
          ],
        },
      },
      title: 'Combustion du méthane : tableau d’avancement',
      caption: '2 mol de méthane et 3 mol de dioxygène : quel est le réactif limitant ? Que risque-t-on dans un vrai brûleur ?',
    },
    {
      type: 'widget',
      id: 'advancement-table',
      props: {
        reaction: {
          reactants: [
            { formula: 'C3H8', coef: 1, n0: 0.5 },
            { formula: 'O2', coef: 5, n0: 2 },
          ],
          products: [
            { formula: 'CO2', coef: 3, n0: 0 },
            { formula: 'H2O', coef: 4, n0: 0 },
          ],
        },
      },
      title: 'Combustion du propane',
      caption: 'Situation de l’exercice 6 : vérifier que xmax = 0,40 mol.',
    },
    { type: 'svg', svg: energyDiagramSvg(), caption: 'Rompre coûte, former rapporte : le bilan énergétique de la combustion du méthane.' },
    { type: 'svg', svg: fireTriangleSvg(), caption: 'Le triangle du feu.' },
    { type: 'svg', svg: carbonCycleSvg(), caption: 'Fossile ou biomasse : ce qui change pour le CO₂ atmosphérique.' },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Les produits de la combustion complète d’un alcane sont :',
          choices: ['CO et H₂O', 'CO₂ et H₂', 'CO₂ et H₂O', 'C et H₂O'],
          answer: 2,
          explanation: 'Combustion complète : dioxyde de carbone et eau.',
        },
        {
          question: 'Le coefficient de O₂ dans la combustion complète d’une mole de propane C₃H₈ est :',
          choices: ['3', '4', '5', '13/2'],
          answer: 2,
          explanation: 'C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O.',
        },
        {
          question: 'Dans une combustion, le dioxygène joue le rôle :',
          choices: ['de réducteur', 'd’oxydant', 'de catalyseur', 'de combustible'],
          answer: 1,
          explanation: 'O₂ capte des électrons (couple O₂/H₂O) : c’est l’oxydant ; le combustible est le réducteur.',
        },
        {
          question: 'Le pouvoir calorifique massique du méthane ($E_r = -802$ kJ·mol⁻¹, M = 16,0 g·mol⁻¹) vaut environ :',
          choices: ['12,8 MJ·kg⁻¹', '50 MJ·kg⁻¹', '802 MJ·kg⁻¹', '0,02 MJ·kg⁻¹'],
          answer: 1,
          explanation: '802 / 16,0 = 50,1 kJ·g⁻¹ = 50,1 MJ·kg⁻¹.',
        },
        {
          question: 'Pour estimer $E_r$ avec les énergies de liaison, on calcule :',
          choices: ['Σ formées − Σ rompues', 'Σ rompues − Σ formées', 'Σ rompues + Σ formées', 'Σ rompues × Σ formées'],
          answer: 1,
          explanation: 'Rompre consomme (+), former libère (−).',
        },
        {
          question: 'Une flamme jaune qui noircit le fond d’une casserole indique :',
          choices: ['une combustion complète', 'une combustion incomplète', 'l’absence de combustible', 'un excès de dioxygène'],
          answer: 1,
          explanation: 'Les suies (carbone) sont caractéristiques d’un manque de dioxygène.',
        },
        {
          question: 'Lequel de ces combustibles émet le moins de CO₂ par MJ ?',
          choices: ['charbon', 'octane', 'méthane', 'éthanol'],
          answer: 2,
          explanation: 'Méthane ≈ 55 g/MJ, contre ≈ 69 (octane), 71 (éthanol) et 112 (charbon).',
        },
        {
          question: 'Le gaz incolore et inodore produit par une combustion incomplète et responsable d’intoxications est :',
          choices: ['le dioxyde de carbone', 'le monoxyde de carbone', 'la vapeur d’eau', 'le diazote'],
          answer: 1,
          explanation: 'CO se fixe sur l’hémoglobine.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Combustion', back: 'Réaction entre un combustible et un comburant (O₂), exothermique.' },
        { front: 'Triangle du feu', back: 'Combustible + comburant + énergie d’activation.' },
        { front: 'Combustion complète d’un alcane', back: 'CₙH₂ₙ₊₂ + (3n+1)/2 O₂ → n CO₂ + (n+1) H₂O' },
        { front: 'Combustion complète d’un alcool', back: 'CₙH₂ₙ₊₂O + 3n/2 O₂ → n CO₂ + (n+1) H₂O' },
        { front: 'Combustion incomplète', back: 'Manque de O₂ : formation de CO (toxique) et de C (suies).' },
        { front: 'Combustion et oxydo-réduction', back: 'Combustible = réducteur ; O₂ = oxydant (couple O₂/H₂O).' },
        { front: 'Énergie molaire de réaction', back: 'Eᵣ, énergie échangée pour un avancement de 1 mol (J·mol⁻¹) ; < 0 pour une combustion.' },
        { front: 'Pouvoir calorifique massique', back: 'PC = |Eᵣ| / M : énergie libérée par 1 kg de combustible (MJ·kg⁻¹).' },
        { front: 'Énergie libérée', back: 'E = n × |Eᵣ| = m × PC' },
        { front: 'Énergie de liaison', back: 'Énergie à fournir pour rompre 1 mol de liaisons A–B à l’état gazeux.' },
        { front: 'Estimation de Eᵣ', back: 'Eᵣ ≈ Σ E(rompues) − Σ E(formées)' },
        { front: 'Eᵣ de la combustion du méthane (estimée)', back: '(4×413 + 2×498) − (2×804 + 4×463) = −812 kJ·mol⁻¹' },
        { front: 'Mesure du PC', back: 'PC ≈ mₑ cₑ Δθ / Δm (valeur par défaut à cause des pertes).' },
        { front: 'Pourquoi le CO₂ est-il un problème ?', back: 'Gaz à effet de serre : sa hausse renforce l’effet de serre → réchauffement climatique.' },
        { front: 'Biocarburant', back: 'Carburant issu de la biomasse ; le CO₂ émis a été absorbé lors de la croissance des plantes.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'La combustion complète du méthane produit du {{dioxyde de carbone|CO2|CO₂}} et de l’{{eau}}. Son équation est CH₄ + {{2}} O₂ → CO₂ + 2 H₂O. Elle est {{exothermique}} : son énergie molaire de réaction est {{négative}}. Le méthane y joue le rôle de {{réducteur}}. En cas de manque de dioxygène, il se forme du {{monoxyde de carbone|CO}}, gaz très toxique.',
    },
    {
      type: 'matching',
      title: 'Associer chaque combustible à son pouvoir calorifique approché',
      pairs: [
        { left: 'dihydrogène', right: '≈ 120 MJ·kg⁻¹' },
        { left: 'méthane', right: '≈ 50 MJ·kg⁻¹' },
        { left: 'octane (essence)', right: '≈ 44 MJ·kg⁻¹' },
        { left: 'éthanol', right: '≈ 27 MJ·kg⁻¹' },
        { left: 'bois sec', right: '≈ 15 à 18 MJ·kg⁻¹' },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Rompre une liaison chimique libère de l’énergie.', answer: false, explanation: 'Il faut fournir de l’énergie pour rompre une liaison ; c’est la formation qui en libère.' },
        { text: 'Brûler 1 kg d’essence produit environ 3 kg de CO₂.', answer: true, explanation: 'Les atomes d’oxygène du CO₂ proviennent de l’air.' },
        { text: 'La combustion du dihydrogène produit du CO₂.', answer: false, explanation: 'Elle ne produit que de l’eau.' },
        { text: 'Un pouvoir calorifique mesuré avec une canette est en général inférieur à la valeur tabulée.', answer: true, explanation: 'Pertes thermiques importantes.' },
        { text: 'Le monoxyde de carbone se détecte facilement à l’odeur.', answer: false, explanation: 'Il est inodore : il faut un détecteur.' },
        { text: 'La méthode des énergies de liaison s’applique à des espèces à l’état gazeux.', answer: true, explanation: 'Les énergies de liaison sont définies pour des espèces gazeuses.' },
      ],
    },
    {
      type: 'reveal',
      title: 'Défi : pourquoi le gaz naturel émet-il moins de CO₂ que le charbon ?',
      content: [
        { type: 'p', text: 'Dans le charbon (C), toute l’énergie provient de la formation de liaisons C=O : une mole de CO₂ pour 394 kJ. Dans le méthane (CH₄), une grande partie de l’énergie provient de la formation de liaisons O–H (eau) : une mole de CO₂ pour 802 kJ. Plus un combustible est riche en hydrogène, moins il émet de CO₂ par unité d’énergie — jusqu’au dihydrogène, qui n’en émet pas du tout.' },
      ],
    },
  ],
}

export default chapter
