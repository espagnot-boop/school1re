import type { Chapter } from '../types'

const F = 'font-family="Geist, sans-serif"'

// ---------- Schémas SVG ----------

const svgCycle = `<svg viewBox="0 0 420 300" width="100%" xmlns="http://www.w3.org/2000/svg" ${F}>
  <g transform="rotate(-90 150 150)" fill="none" stroke-width="26">
    <circle cx="150" cy="150" r="100" stroke="hsl(217 91% 60%)" stroke-dasharray="251.3 628.3" stroke-dashoffset="0"/>
    <circle cx="150" cy="150" r="100" stroke="hsl(142 71% 45%)" stroke-dasharray="188.5 628.3" stroke-dashoffset="-251.3"/>
    <circle cx="150" cy="150" r="100" stroke="hsl(25 95% 53%)" stroke-dasharray="125.7 628.3" stroke-dashoffset="-439.8"/>
    <circle cx="150" cy="150" r="100" stroke="hsl(0 84% 60%)" stroke-dasharray="62.8 628.3" stroke-dashoffset="-565.5"/>
  </g>
  <text x="150" y="145" text-anchor="middle" font-size="14" fill="currentColor" font-weight="600">Cycle cellulaire</text>
  <text x="150" y="163" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">≈ 24 h (cellule humaine en culture)</text>
  <text x="268" y="112" font-size="13" fill="currentColor" font-weight="600">G1</text>
  <text x="104" y="285" font-size="13" fill="currentColor" font-weight="600">S</text>
  <text x="8" y="114" font-size="13" fill="currentColor" font-weight="600">G2</text>
  <text x="98" y="28" font-size="13" fill="currentColor" font-weight="600">M</text>
  <g font-size="11" fill="currentColor">
    <rect x="300" y="40" width="12" height="12" fill="hsl(217 91% 60%)"/><text x="318" y="50">G1 : croissance</text>
    <rect x="300" y="64" width="12" height="12" fill="hsl(142 71% 45%)"/><text x="318" y="74">S : réplication</text>
    <rect x="300" y="88" width="12" height="12" fill="hsl(25 95% 53%)"/><text x="318" y="98">G2 : préparation</text>
    <rect x="300" y="112" width="12" height="12" fill="hsl(0 84% 60%)"/><text x="318" y="122">M : mitose</text>
    <text x="300" y="160">Interphase =</text>
    <text x="300" y="176">G1 + S + G2</text>
    <text x="300" y="200" class="svg-muted">ADN : Q → 2Q en S</text>
    <text x="300" y="216" class="svg-muted">2Q → Q à la mitose</text>
  </g>
</svg>`

const svgChromosomes = `<svg viewBox="0 0 420 200" width="100%" xmlns="http://www.w3.org/2000/svg" ${F}>
  <g stroke="hsl(217 91% 60%)" stroke-width="10" stroke-linecap="square">
    <line x1="80" y1="40" x2="80" y2="140"/>
  </g>
  <circle cx="80" cy="80" r="7" fill="currentColor"/>
  <text x="80" y="170" text-anchor="middle" font-size="12" fill="currentColor">1 chromatide</text>
  <text x="80" y="186" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">(G1, après mitose)</text>
  <path d="M130 90 H190" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <path d="M190 90 l-8 -5 v10 z" fill="currentColor"/>
  <text x="160" y="80" text-anchor="middle" font-size="11" fill="currentColor">réplication</text>
  <text x="160" y="108" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">(phase S)</text>
  <g stroke="hsl(217 91% 60%)" stroke-width="10" stroke-linecap="square">
    <line x1="246" y1="40" x2="252" y2="80"/><line x1="252" y1="80" x2="246" y2="140"/>
    <line x1="274" y1="40" x2="268" y2="80"/><line x1="268" y1="80" x2="274" y2="140"/>
  </g>
  <circle cx="260" cy="80" r="8" fill="currentColor"/>
  <text x="260" y="170" text-anchor="middle" font-size="12" fill="currentColor">2 chromatides sœurs</text>
  <text x="260" y="186" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">(G2, prophase, métaphase)</text>
  <g font-size="11" fill="currentColor">
    <line x1="290" y1="80" x2="320" y2="80" stroke="currentColor" stroke-width="1"/><text x="324" y="84">centromère</text>
    <line x1="280" y1="125" x2="320" y2="125" stroke="currentColor" stroke-width="1"/><text x="324" y="129">chromatide</text>
    <text x="324" y="143" class="svg-muted">(1 molécule d’ADN)</text>
  </g>
</svg>`

const cell = (x: number, inner: string, label: string, sub: string) => `
  <rect x="${x}" y="30" width="110" height="110" fill="none" stroke="currentColor" stroke-width="1.5"/>
  ${inner}
  <text x="${x + 55}" y="162" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">${label}</text>
  <text x="${x + 55}" y="178" text-anchor="middle" font-size="10" class="svg-muted" fill="currentColor">${sub}</text>`

const X = (cx: number, cy: number) => `<g stroke="hsl(217 91% 60%)" stroke-width="4"><line x1="${cx - 5}" y1="${cy - 9}" x2="${cx + 5}" y2="${cy + 9}"/><line x1="${cx + 5}" y1="${cy - 9}" x2="${cx - 5}" y2="${cy + 9}"/></g>`
const Xr = (cx: number, cy: number) => `<g stroke="hsl(0 84% 60%)" stroke-width="4"><line x1="${cx - 4}" y1="${cy - 7}" x2="${cx + 4}" y2="${cy + 7}"/><line x1="${cx + 4}" y1="${cy - 7}" x2="${cx - 4}" y2="${cy + 7}"/></g>`
const H = (cx: number, cy: number) => `<g stroke="hsl(217 91% 60%)" stroke-width="4"><line x1="${cx - 9}" y1="${cy}" x2="${cx + 9}" y2="${cy}"/><line x1="${cx}" y1="${cy - 4}" x2="${cx}" y2="${cy + 4}"/></g>`

const svgMitose = `<svg viewBox="0 0 600 190" width="100%" xmlns="http://www.w3.org/2000/svg" ${F}>
  ${cell(5, `<circle cx="60" cy="85" r="38" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>${X(48, 72)}${X(70, 78)}${Xr(52, 100)}${Xr(72, 98)}`, 'Prophase', 'condensation, fuseau')}
  ${cell(125, `<line x1="180" y1="38" x2="180" y2="132" stroke="currentColor" stroke-dasharray="2 3" class="svg-muted"/><g stroke="currentColor" stroke-width="0.6" class="svg-muted"><line x1="140" y1="85" x2="180" y2="55"/><line x1="140" y1="85" x2="180" y2="115"/><line x1="220" y1="85" x2="180" y2="55"/><line x1="220" y1="85" x2="180" y2="115"/></g>${X(180, 55)}${X(180, 75)}${Xr(180, 96)}${Xr(180, 115)}`, 'Métaphase', 'plaque équatoriale')}
  ${cell(245, `<g stroke-width="4" fill="none"><path d="M262 58 l6 -10 l6 10" stroke="hsl(217 91% 60%)"/><path d="M282 58 l6 -10 l6 10" stroke="hsl(217 91% 60%)"/><path d="M302 58 l5 -8 l5 8" stroke="hsl(0 84% 60%)"/><path d="M320 58 l5 -8 l5 8" stroke="hsl(0 84% 60%)"/><path d="M262 112 l6 10 l6 -10" stroke="hsl(217 91% 60%)"/><path d="M282 112 l6 10 l6 -10" stroke="hsl(217 91% 60%)"/><path d="M302 112 l5 8 l5 -8" stroke="hsl(0 84% 60%)"/><path d="M320 112 l5 8 l5 -8" stroke="hsl(0 84% 60%)"/></g><g stroke="currentColor" stroke-width="1"><path d="M300 76 V64 M300 94 V106"/></g>`, 'Anaphase', 'chromatides sœurs → pôles')}
  ${cell(365, `<line x1="368" y1="85" x2="472" y2="85" stroke="currentColor" stroke-width="1.5"/><circle cx="420" cy="57" r="22" fill="none" stroke="currentColor" stroke-dasharray="4 3"/><circle cx="420" cy="113" r="22" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>${H(412, 52)}${H(428, 62)}${H(412, 108)}${H(428, 118)}`, 'Télophase', 'décondensation, 2 noyaux')}
  ${cell(485, `<rect x="495" y="38" width="90" height="42" fill="none" stroke="currentColor"/><rect x="495" y="90" width="90" height="42" fill="none" stroke="currentColor"/><circle cx="540" cy="59" r="13" fill="none" stroke="currentColor"/><circle cx="540" cy="111" r="13" fill="none" stroke="currentColor"/>`, 'Cytodiérèse', '2 cellules filles')}
</svg>`

const band = (x: number, y: number, color: string) => `<rect x="${x - 22}" y="${y}" width="44" height="5" fill="${color}"/>`
const tube = (x: number, bands: string, label: string) => `
  <rect x="${x - 25}" y="40" width="50" height="160" fill="none" stroke="currentColor" stroke-width="1.5"/>
  ${bands}
  <text x="${x}" y="222" text-anchor="middle" font-size="11" fill="currentColor">${label}</text>`

const svgMeselson = `<svg viewBox="0 0 470 240" width="100%" xmlns="http://www.w3.org/2000/svg" ${F}>
  <text x="10" y="22" font-size="12" font-weight="600" fill="currentColor">Centrifugation en gradient de CsCl (densité ↓ vers le haut)</text>
  ${tube(70, band(70, 160, 'hsl(217 91% 60%)'), 'G0 : ¹⁵N')}
  ${tube(170, band(170, 125, 'hsl(263 70% 60%)'), 'G1 (¹⁴N)')}
  ${tube(270, band(270, 90, 'hsl(142 71% 45%)') + band(270, 125, 'hsl(263 70% 60%)'), 'G2 (¹⁴N)')}
  ${tube(370, `<rect x="348" y="90" width="44" height="7" fill="hsl(142 71% 45%)"/>` + band(370, 125, 'hsl(263 70% 60%)'), 'G3 (¹⁴N)')}
  <g font-size="11" fill="currentColor">
    <line x1="400" y1="93" x2="412" y2="93" stroke="currentColor"/><text x="415" y="97">léger</text>
    <line x1="400" y1="128" x2="412" y2="128" stroke="currentColor"/><text x="415" y="132">hybride</text>
    <line x1="400" y1="163" x2="412" y2="163" stroke="currentColor"/><text x="415" y="167">lourd</text>
  </g>
</svg>`

const svgModeles = `<svg viewBox="0 0 520 210" width="100%" xmlns="http://www.w3.org/2000/svg" ${F}>
  <g font-size="12" fill="currentColor" font-weight="600">
    <text x="80" y="20" text-anchor="middle">Semi-conservatif</text>
    <text x="260" y="20" text-anchor="middle">Conservatif</text>
    <text x="440" y="20" text-anchor="middle">Dispersif</text>
  </g>
  <g stroke-width="6">
    <line x1="70" y1="40" x2="70" y2="80" stroke="hsl(217 91% 60%)"/><line x1="90" y1="40" x2="90" y2="80" stroke="hsl(217 91% 60%)"/>
    <line x1="250" y1="40" x2="250" y2="80" stroke="hsl(217 91% 60%)"/><line x1="270" y1="40" x2="270" y2="80" stroke="hsl(217 91% 60%)"/>
    <line x1="430" y1="40" x2="430" y2="80" stroke="hsl(217 91% 60%)"/><line x1="450" y1="40" x2="450" y2="80" stroke="hsl(217 91% 60%)"/>

    <line x1="40" y1="120" x2="40" y2="170" stroke="hsl(217 91% 60%)"/><line x1="58" y1="120" x2="58" y2="170" stroke="hsl(25 95% 53%)"/>
    <line x1="102" y1="120" x2="102" y2="170" stroke="hsl(25 95% 53%)"/><line x1="120" y1="120" x2="120" y2="170" stroke="hsl(217 91% 60%)"/>

    <line x1="220" y1="120" x2="220" y2="170" stroke="hsl(217 91% 60%)"/><line x1="238" y1="120" x2="238" y2="170" stroke="hsl(217 91% 60%)"/>
    <line x1="282" y1="120" x2="282" y2="170" stroke="hsl(25 95% 53%)"/><line x1="300" y1="120" x2="300" y2="170" stroke="hsl(25 95% 53%)"/>

    <line x1="400" y1="120" x2="400" y2="133" stroke="hsl(217 91% 60%)"/><line x1="400" y1="133" x2="400" y2="146" stroke="hsl(25 95% 53%)"/><line x1="400" y1="146" x2="400" y2="158" stroke="hsl(217 91% 60%)"/><line x1="400" y1="158" x2="400" y2="170" stroke="hsl(25 95% 53%)"/>
    <line x1="418" y1="120" x2="418" y2="133" stroke="hsl(25 95% 53%)"/><line x1="418" y1="133" x2="418" y2="146" stroke="hsl(217 91% 60%)"/><line x1="418" y1="146" x2="418" y2="158" stroke="hsl(25 95% 53%)"/><line x1="418" y1="158" x2="418" y2="170" stroke="hsl(217 91% 60%)"/>
    <line x1="462" y1="120" x2="462" y2="133" stroke="hsl(25 95% 53%)"/><line x1="462" y1="133" x2="462" y2="146" stroke="hsl(217 91% 60%)"/><line x1="462" y1="146" x2="462" y2="158" stroke="hsl(25 95% 53%)"/><line x1="462" y1="158" x2="462" y2="170" stroke="hsl(217 91% 60%)"/>
    <line x1="480" y1="120" x2="480" y2="133" stroke="hsl(217 91% 60%)"/><line x1="480" y1="133" x2="480" y2="146" stroke="hsl(25 95% 53%)"/><line x1="480" y1="146" x2="480" y2="158" stroke="hsl(217 91% 60%)"/><line x1="480" y1="158" x2="480" y2="170" stroke="hsl(25 95% 53%)"/>
  </g>
  <g stroke="currentColor" stroke-width="1" fill="none">
    <path d="M80 88 V108"/><path d="M260 88 V108"/><path d="M440 88 V108"/>
  </g>
  <g font-size="11" fill="currentColor">
    <rect x="20" y="188" width="12" height="8" fill="hsl(217 91% 60%)"/><text x="38" y="196">brin ancien (¹⁵N, lourd)</text>
    <rect x="220" y="188" width="12" height="8" fill="hsl(25 95% 53%)"/><text x="238" y="196">brin néoformé (¹⁴N, léger)</text>
  </g>
</svg>`

const svgFourche = `<svg viewBox="0 0 520 200" width="100%" xmlns="http://www.w3.org/2000/svg" ${F}>
  <g stroke="hsl(217 91% 60%)" stroke-width="4" fill="none">
    <path d="M10 92 H200 L470 30"/>
    <path d="M10 108 H200 L470 170"/>
  </g>
  <g stroke="currentColor" stroke-width="1" class="svg-muted">
    <line x1="30" y1="92" x2="30" y2="108"/><line x1="50" y1="92" x2="50" y2="108"/><line x1="70" y1="92" x2="70" y2="108"/><line x1="90" y1="92" x2="90" y2="108"/><line x1="110" y1="92" x2="110" y2="108"/><line x1="130" y1="92" x2="130" y2="108"/><line x1="150" y1="92" x2="150" y2="108"/><line x1="170" y1="92" x2="170" y2="108"/><line x1="190" y1="92" x2="190" y2="108"/>
  </g>
  <g stroke="hsl(25 95% 53%)" stroke-width="4" fill="none">
    <path d="M215 104 L420 57"/>
    <path d="M300 144 L440 175"/>
  </g>
  <rect x="402" y="44" width="44" height="26" fill="hsl(142 71% 45%)" fill-opacity="0.25" stroke="hsl(142 71% 45%)"/>
  <text x="424" y="61" text-anchor="middle" font-size="10" fill="currentColor">ADN pol.</text>
  <g font-size="11" fill="currentColor">
    <text x="20" y="80">ADN parental (double brin)</text>
    <text x="196" y="130">fourche de réplication</text>
    <text x="250" y="70" class="svg-muted">brin parental = matrice</text>
    <text x="300" y="196">brin néoformé (complémentaire)</text>
    <text x="450" y="100">sens de</text>
    <text x="450" y="114">progression →</text>
  </g>
</svg>`

const chapter: Chapter = {
  id: 'replication-mitose',
  subject: 'svt',
  order: 1,
  title: 'Réplication de l’ADN et mitose',
  theme: 'Transmission, variation et expression du patrimoine génétique',
  summary:
    'Le cycle cellulaire, la réplication semi-conservative de l’ADN et la mitose permettent la formation de clones cellulaires qui conservent l’information génétique.',
  duration: '3 semaines',
  objectives: [
    'Décrire les phases du cycle cellulaire et l’évolution de la quantité d’ADN par cellule.',
    'Relier l’aspect des chromosomes (1 ou 2 chromatides, condensés ou non) aux étapes du cycle.',
    'Identifier et ordonner les phases de la mitose à partir d’observations microscopiques.',
    'Exploiter l’expérience de Meselson et Stahl pour valider le modèle semi-conservatif de la réplication.',
    'Expliquer le rôle de l’ADN polymérase et le principe de complémentarité des bases.',
    'Définir un clone cellulaire et expliquer pourquoi ses cellules sont génétiquement identiques (aux mutations près).',
  ],
  keywords: [
    'cycle cellulaire',
    'interphase',
    'chromatide',
    'centromère',
    'mitose',
    'réplication semi-conservative',
    'ADN polymérase',
    'Meselson et Stahl',
    'clone',
  ],

  // =====================================================================
  fiche: [
    { type: 'h2', text: 'Le cycle cellulaire' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Cycle cellulaire',
      content: [
        {
          type: 'p',
          text: 'Ensemble des étapes qui séparent deux divisions successives d’une cellule : **interphase** (G1 → S → G2) puis **mitose** (phase M). Une cellule humaine en culture effectue un cycle en ≈ 24 h, dont ≈ 1 h de mitose.',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Phase', 'Événement principal', 'Chromosomes', 'Quantité d’ADN'],
      rows: [
        ['G1', 'croissance, activité cellulaire', '1 chromatide, décondensés', 'Q'],
        ['S', '==réplication de l’ADN==', '1 → 2 chromatides', 'Q → 2Q'],
        ['G2', 'préparation de la division', '2 chromatides, décondensés', '2Q'],
        ['M (mitose)', 'répartition des chromatides sœurs', 'condensés puis séparés', '2Q → Q (par cellule fille)'],
      ],
    },
    { type: 'h2', text: 'La mitose' },
    {
      type: 'list',
      ordered: true,
      items: [
        '**Prophase** : condensation des chromosomes (2 chromatides), disparition de l’enveloppe nucléaire, mise en place du fuseau.',
        '**Métaphase** : chromosomes alignés sur la **plaque équatoriale** (centromères au centre).',
        '**Anaphase** : séparation des **chromatides sœurs**, migration vers les pôles opposés.',
        '**Télophase** : décondensation, reformation de deux noyaux ; **cytodiérèse** : partage du cytoplasme.',
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Conservation de l’information',
      content: [
        {
          type: 'p',
          text: 'Les deux cellules filles reçoivent le **même nombre** de chromosomes (2n = 46 chez l’Homme) et la **même information génétique** que la cellule mère : chaque cellule fille reçoit une copie de chaque chromatide sœur.',
        },
      ],
    },
    { type: 'h2', text: 'La réplication de l’ADN' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Semi-conservative', value: 'chaque molécule fille contient **un brin ancien** (matrice) et **un brin néoformé**.' },
        { key: 'Complémentarité', value: 'A–T et C–G : la séquence du brin néoformé est imposée par la matrice.' },
        { key: 'ADN polymérase', value: 'enzyme qui assemble les nucléotides libres complémentaires de la matrice (sens 5′ → 3′).' },
        { key: 'Fourche / œil', value: 'la réplication démarre en de nombreuses **origines** et progresse dans les deux sens.' },
        { key: 'Meselson et Stahl (1958)', value: '¹⁵N puis ¹⁴N : G1 = 100 % hybride ; G2 = 50 % hybride + 50 % léger → modèle semi-conservatif.' },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Clone cellulaire',
      content: [
        {
          type: 'p',
          text: 'Ensemble des cellules issues d’**une même cellule** par mitoses successives. Elles sont génétiquement **identiques**, sauf si une **mutation** (erreur de réplication non réparée) est apparue : on obtient alors un **sous-clone**.',
        },
      ],
    },
  ],

  // =====================================================================
  cours: [
    { type: 'h2', text: 'Introduction : de la cellule-œuf à l’organisme' },
    {
      type: 'p',
      text: 'Un être humain adulte compte environ $3 \\times 10^{13}$ cellules, toutes issues d’une **cellule unique**, la cellule-œuf. Ces cellules (à l’exception des gamètes) possèdent le **même caryotype** (46 chromosomes) et la **même information génétique**. Comment l’information génétique est-elle copiée puis transmise fidèlement d’une cellule à ses descendantes ?',
    },
    {
      type: 'p',
      text: 'Deux processus sont en jeu : la **réplication de l’ADN**, qui double la quantité d’information, et la **mitose**, qui la répartit de façon égale entre deux cellules filles. Ils s’enchaînent au cours du **cycle cellulaire**.',
    },

    { type: 'h2', text: '1. Les chromosomes, supports de l’information génétique' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Chromosome',
      content: [
        {
          type: 'p',
          text: 'Structure formée d’**ADN** associé à des **protéines** (histones), présente dans le noyau des cellules eucaryotes. Un chromosome est constitué d’**une** chromatide (une molécule d’ADN) ou de **deux chromatides sœurs** identiques (deux molécules d’ADN) réunies au niveau du **centromère**.',
        },
      ],
    },
    {
      type: 'p',
      text: 'L’ADN (acide désoxyribonucléique) est une **double hélice** formée de deux brins de **nucléotides**. Chaque nucléotide comporte un sucre (désoxyribose), un groupement phosphate et une base azotée parmi quatre : **A** (adénine), **T** (thymine), **C** (cytosine), **G** (guanine). Les deux brins sont **complémentaires** : A s’apparie avec T, C avec G (liaisons hydrogène).',
    },
    {
      type: 'p',
      text: 'Selon le moment du cycle, l’ADN est plus ou moins **condensé** : décondensé en interphase (chromatine, non visible individuellement au microscope optique), très condensé pendant la mitose (chromosomes visibles, c’est l’aspect du **caryotype**).',
    },
    { type: 'svg', svg: svgChromosomes, caption: 'Chromosome à une chromatide et chromosome à deux chromatides sœurs.', maxWidth: 520 },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ne pas confondre',
      content: [
        {
          type: 'list',
          items: [
            '**Chromatides sœurs** : deux copies **identiques** d’une même molécule d’ADN, issues de la réplication, reliées par le centromère.',
            '**Chromosomes homologues** : deux chromosomes de la même paire (l’un d’origine paternelle, l’autre maternelle) portant les **mêmes gènes** mais éventuellement des **allèles différents**.',
          ],
        },
      ],
    },
    {
      type: 'p',
      text: 'Chez l’Homme, les cellules somatiques sont **diploïdes** : $2n = 46$ chromosomes, soit 23 paires (22 paires d’autosomes + 1 paire de chromosomes sexuels XX ou XY).',
    },

    { type: 'h2', text: '2. Le cycle cellulaire' },
    {
      type: 'p',
      text: 'Le cycle cellulaire comprend une **interphase**, longue, et une **phase de division** (mitose), courte. L’interphase se subdivise en trois phases :',
    },
    {
      type: 'list',
      items: [
        '**G1** (*gap* 1) : croissance de la cellule, synthèse de protéines, activité « normale » ; les chromosomes ont **une chromatide**.',
        '**S** (synthèse) : **réplication de l’ADN** ; chaque chromosome passe de une à **deux chromatides**.',
        '**G2** (*gap* 2) : poursuite de la croissance, vérification de l’ADN répliqué, préparation de la mitose.',
      ],
    },
    { type: 'svg', svg: svgCycle, caption: 'Le cycle cellulaire (durées relatives indicatives).', maxWidth: 560 },
    {
      type: 'p',
      text: 'Certaines cellules sortent du cycle et ne se divisent plus (phase dite **G0**) : c’est le cas de la plupart des neurones ou des cellules musculaires cardiaques. D’autres se divisent très activement (cellules de l’épiderme, de la moelle osseuse, de l’épithélium intestinal).',
    },
    { type: 'h3', text: 'Évolution de la quantité d’ADN au cours du cycle' },
    {
      type: 'p',
      text: 'En notant $Q$ la quantité d’ADN d’une cellule en G1, la quantité **double progressivement** pendant la phase S (de $Q$ à $2Q$), reste à $2Q$ pendant G2 et le début de la mitose, puis est **divisée par deux** à la fin de la mitose (chaque cellule fille reçoit $Q$).',
    },
    {
      type: 'svg',
      svg: `<svg viewBox="0 0 480 220" width="100%" xmlns="http://www.w3.org/2000/svg" ${F}>
  <line x1="50" y1="180" x2="460" y2="180" stroke="currentColor"/><line x1="50" y1="180" x2="50" y2="20" stroke="currentColor"/>
  <text x="455" y="198" font-size="11" fill="currentColor" text-anchor="end">temps</text>
  <text x="14" y="30" font-size="11" fill="currentColor">ADN</text>
  <text x="34" y="134" font-size="11" fill="currentColor">Q</text><text x="28" y="74" font-size="11" fill="currentColor">2Q</text>
  <line x1="50" y1="130" x2="460" y2="130" stroke="currentColor" stroke-dasharray="2 4" class="svg-muted"/>
  <line x1="50" y1="70" x2="460" y2="70" stroke="currentColor" stroke-dasharray="2 4" class="svg-muted"/>
  <path d="M50 130 H140 L220 70 H310 V130 H340 L400 70" fill="none" stroke="hsl(217 91% 60%)" stroke-width="2.5"/>
  <g font-size="11" fill="currentColor" text-anchor="middle">
    <text x="95" y="198">G1</text><text x="180" y="198">S</text><text x="255" y="198">G2</text><text x="300" y="198">M</text><text x="320" y="214" class="svg-muted">cycle suivant →</text>
  </g>
  <g stroke="currentColor" stroke-dasharray="3 3" class="svg-muted"><line x1="140" y1="180" x2="140" y2="40"/><line x1="220" y1="180" x2="220" y2="40"/><line x1="290" y1="180" x2="290" y2="40"/><line x1="310" y1="180" x2="310" y2="40"/></g>
</svg>`,
      caption: 'Quantité d’ADN par cellule au cours de deux cycles successifs.',
      maxWidth: 560,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Lire une courbe de quantité d’ADN',
      content: [
        {
          type: 'list',
          items: [
            'Un **palier bas** = G1 (chromosomes à 1 chromatide).',
            'Une **montée progressive** = phase S (la réplication prend plusieurs heures).',
            'Un **palier haut** = G2 + début de mitose (chromosomes à 2 chromatides).',
            'Une **chute brutale** de moitié = fin de mitose (cytodiérèse), chaque cellule fille reçoit la moitié.',
          ],
        },
      ],
    },

    { type: 'h2', text: '3. La mitose : répartition égale de l’information' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Mitose',
      content: [
        {
          type: 'p',
          text: 'Division cellulaire au cours de laquelle une cellule mère donne **deux cellules filles génétiquement identiques** entre elles et à la cellule mère. Elle est classiquement découpée en **quatre phases** suivies de la cytodiérèse.',
        },
      ],
    },
    { type: 'svg', svg: svgMitose, caption: 'Les phases de la mitose dans une cellule à 2n = 4 chromosomes (une paire bleue, une paire rouge).', maxWidth: 700 },
    {
      type: 'steps',
      items: [
        {
          title: 'Prophase',
          text: 'Les chromosomes, déjà répliqués (2 chromatides), se **condensent** et deviennent visibles. L’**enveloppe nucléaire se fragmente**, le nucléole disparaît, le **fuseau de division** (microtubules) se met en place entre les deux pôles.',
        },
        {
          title: 'Métaphase',
          text: 'Les chromosomes, très condensés, sont attachés par leur centromère aux fibres du fuseau et **s’alignent dans le plan équatorial** : c’est la **plaque équatoriale**. C’est le moment idéal pour réaliser un caryotype.',
        },
        {
          title: 'Anaphase',
          text: 'Les centromères se séparent : les **chromatides sœurs** de chaque chromosome se **séparent** et migrent vers des **pôles opposés**, tirées par le raccourcissement des fibres du fuseau. Chaque pôle reçoit ainsi un lot complet de chromosomes à **une chromatide**.',
        },
        {
          title: 'Télophase',
          text: 'Les chromosomes arrivés aux pôles se **décondensent**, une **enveloppe nucléaire se reforme** autour de chaque lot : la cellule possède momentanément deux noyaux.',
        },
        {
          title: 'Cytodiérèse',
          text: 'Le cytoplasme se partage : **étranglement** (sillon de division) chez les cellules animales, mise en place d’une **nouvelle paroi** (phragmoplaste) chez les cellules végétales. On obtient deux cellules filles.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Bilan chromosomique de la mitose',
      content: [
        {
          type: 'p',
          text: 'Cellule mère en G2 : $2n$ chromosomes à 2 chromatides (quantité $2Q$). → Deux cellules filles en G1 : $2n$ chromosomes à 1 chromatide chacune (quantité $Q$). Le **nombre** de chromosomes est conservé ; la **quantité d’ADN** est divisée par deux, ce qui compense exactement le doublement de la phase S.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Piège classique',
      content: [
        {
          type: 'p',
          text: 'La mitose ne « double » pas les chromosomes : c’est la **réplication**, en phase S (interphase), qui produit les chromatides sœurs. La mitose ne fait que les **séparer**. Et en anaphase, ce sont des **chromatides sœurs** (identiques) qui se séparent, pas des chromosomes homologues (cela, c’est la méiose, au programme de Terminale).',
        },
      ],
    },
    { type: 'h3', text: 'Observer la mitose' },
    {
      type: 'p',
      text: 'On observe classiquement la mitose au microscope dans l’**extrémité de racine d’ail ou d’oignon** (méristème), après coloration des chromosomes (orcéine acétique, carmin acétique ou réactif de Feulgen). La majorité des cellules sont en interphase : le noyau y est homogène, avec un nucléole visible.',
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Estimer la durée des phases',
      content: [
        {
          type: 'p',
          text: 'Dans une population de cellules qui se divisent de manière asynchrone, la **proportion** de cellules observées dans une phase est proportionnelle à la **durée** de cette phase. Si un cycle dure $T$ et que $p$ % des cellules sont en métaphase, la métaphase dure environ $\\frac{p}{100} \\times T$.',
        },
      ],
    },

    { type: 'h2', text: '4. La réplication semi-conservative de l’ADN' },
    { type: 'h3', text: '4.1. Trois modèles en concurrence' },
    {
      type: 'p',
      text: 'Dès la découverte de la double hélice (Watson et Crick, 1953, grâce notamment aux clichés de diffraction de **Rosalind Franklin**), la complémentarité des deux brins suggère un mécanisme de copie. Trois hypothèses sont alors proposées :',
    },
    {
      type: 'list',
      items: [
        '**Modèle conservatif** : la molécule mère reste intacte ; une molécule entièrement nouvelle est synthétisée.',
        '**Modèle semi-conservatif** : les deux brins se séparent ; chacun sert de **matrice** à un brin nouveau. Chaque molécule fille = 1 brin ancien + 1 brin nouveau.',
        '**Modèle dispersif** : chaque brin des molécules filles est une mosaïque de fragments anciens et nouveaux.',
      ],
    },
    { type: 'svg', svg: svgModeles, caption: 'Les trois modèles de réplication (première génération).', maxWidth: 640 },
    { type: 'h3', text: '4.2. L’expérience de Meselson et Stahl (1958)' },
    {
      type: 'callout',
      variant: 'history',
      title: 'Protocole',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Des bactéries *Escherichia coli* sont cultivées pendant de nombreuses générations sur un milieu contenant de l’azote lourd **¹⁵N** : tout leur ADN devient « **lourd** ».',
            'Elles sont transférées sur un milieu contenant uniquement de l’azote léger **¹⁴N**.',
            'Après chaque génération (≈ 20 à 30 min), on extrait l’ADN et on le centrifuge dans un **gradient de densité de chlorure de césium** (CsCl) : chaque molécule se place au niveau de sa propre densité.',
          ],
        },
      ],
    },
    { type: 'svg', svg: svgMeselson, caption: 'Résultats de Meselson et Stahl (position des bandes d’ADN).', maxWidth: 560 },
    {
      type: 'table',
      headers: ['Génération', 'Résultat observé', 'Conservatif', 'Semi-conservatif', 'Dispersif'],
      rows: [
        ['0', '1 bande lourde', 'lourde', 'lourde', 'lourde'],
        ['1', '**1 bande intermédiaire**', '1 lourde + 1 légère ✗', '100 % hybride ✓', '1 intermédiaire ✓'],
        ['2', '**1 intermédiaire + 1 légère** (50/50)', '1/4 lourde + 3/4 légère ✗', '50 % hybride + 50 % léger ✓', '1 bande unique entre intermédiaire et léger ✗'],
        ['3', '1/4 intermédiaire + 3/4 légère', '✗', '25 % hybride + 75 % léger ✓', '✗'],
      ],
      caption: 'Confrontation des prédictions aux résultats.',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Conclusion',
      content: [
        {
          type: 'p',
          text: 'La génération 1 **réfute le modèle conservatif** (il prévoyait deux bandes). La génération 2 **réfute le modèle dispersif** (il prévoyait une seule bande). Seul le **modèle semi-conservatif** est compatible avec l’ensemble des résultats : la réplication de l’ADN est **semi-conservative**.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Généraliser',
      content: [
        {
          type: 'p',
          text: 'Partant d’une molécule lourde, après $n$ générations en ¹⁴N on obtient $2^n$ molécules dont **toujours 2 hybrides** (les deux brins lourds d’origine ne sont jamais détruits). La proportion d’ADN hybride est donc $\\frac{2}{2^n} = \\frac{1}{2^{n-1}}$ : 100 % (n = 1), 50 % (n = 2), 25 % (n = 3), 12,5 % (n = 4)…',
        },
      ],
    },
    { type: 'h3', text: '4.3. Le mécanisme moléculaire' },
    { type: 'svg', svg: svgFourche, caption: 'Une fourche de réplication (schéma simplifié).', maxWidth: 640 },
    {
      type: 'list',
      items: [
        'Les deux brins de la double hélice sont **séparés** localement (rupture des liaisons hydrogène entre bases) : il se forme un **œil de réplication** limité par deux **fourches** qui progressent en sens opposés.',
        'L’**ADN polymérase** se fixe sur chaque brin parental, utilisé comme **matrice**, et assemble des **nucléotides libres** (désoxyribonucléotides) en respectant la **complémentarité** des bases : A face à T, T face à A, C face à G, G face à C.',
        'L’ADN polymérase ne synthétise le brin nouveau que dans **un seul sens** (de l’extrémité 5′ vers l’extrémité 3′ du brin néoformé).',
        'Chez les eucaryotes, la réplication démarre simultanément en de **très nombreuses origines** (plusieurs dizaines de milliers dans le génome humain), ce qui permet de répliquer environ $6 \\times 10^9$ paires de bases en quelques heures malgré une vitesse d’environ 50 nucléotides par seconde et par fourche.',
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple de complémentarité',
      content: [
        { type: 'p', text: 'Brin matrice : `3′ – T A C G G A T C – 5′`' },
        { type: 'p', text: 'Brin néoformé : `5′ – A T G C C T A G – 3′`' },
      ],
    },
    {
      type: 'p',
      text: 'Observée au microscope électronique, une molécule d’ADN en cours de réplication présente des **yeux de réplication** (zones où l’ADN est dédoublé) qui s’agrandissent et finissent par fusionner. À la fin de la phase S, chaque chromosome est constitué de deux chromatides sœurs, chacune contenant une molécule d’ADN « hybride » (un brin ancien + un brin nouveau).',
    },
    { type: 'h3', text: '4.4. Une copie très fidèle mais pas parfaite' },
    {
      type: 'p',
      text: 'L’ADN polymérase commet rarement des erreurs : de l’ordre d’**un nucléotide mal apparié pour $10^5$** incorporés. Grâce à son activité de **relecture** et aux systèmes de **réparation** de la cellule, le taux d’erreur final tombe à environ **1 pour $10^9$ à $10^{10}$** nucléotides. Les rares erreurs non corrigées deviennent des **mutations**, transmises aux cellules filles (voir chapitre suivant).',
    },

    { type: 'h2', text: '5. Les clones cellulaires' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Clone',
      content: [
        {
          type: 'p',
          text: 'Un **clone cellulaire** est l’ensemble des cellules issues d’une **cellule unique** par **mitoses successives**. Toutes ces cellules possèdent la même information génétique que la cellule initiale.',
        },
      ],
    },
    {
      type: 'p',
      text: 'La combinaison « réplication semi-conservative + mitose » assure la **conservation de l’information génétique** au fil des divisions. Exemples de clones :',
    },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Organisme', text: 'Toutes les cellules somatiques d’un individu forment (approximativement) un clone issu de la cellule-œuf.', icon: 'User' },
        { title: 'Colonies', text: 'Une colonie de bactéries ou de levures sur une boîte de Petri est issue d’une seule cellule.', icon: 'FlaskConical' },
        { title: 'Lymphocytes', text: 'Lors d’une réponse immunitaire, un lymphocyte activé se multiplie en un clone de cellules identiques.', icon: 'Shield' },
        { title: 'Tumeurs', text: 'Une tumeur dérive d’une cellule ayant accumulé des mutations, puis proliférant de façon incontrôlée.', icon: 'AlertTriangle' },
        { title: 'Bouturage', text: 'Une bouture, un tubercule ou un stolon donnent des plantes génétiquement identiques au pied mère.', icon: 'Leaf' },
        { title: 'Cultures', text: 'Les lignées cellulaires de laboratoire (ex. cellules HeLa) sont des clones.', icon: 'Microscope' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Identiques… aux mutations près',
      content: [
        {
          type: 'p',
          text: 'Si une mutation survient dans une cellule d’un clone, elle est transmise à toutes ses descendantes : il se forme un **sous-clone** porteur de la mutation. Un individu est donc en réalité une **mosaïque** de sous-clones légèrement différents.',
        },
      ],
    },

    { type: 'h2', text: 'Bilan' },
    {
      type: 'p',
      text: 'Au cours du cycle cellulaire, la **réplication semi-conservative** de l’ADN (phase S), catalysée par l’ADN polymérase et fondée sur la complémentarité des bases, produit deux copies identiques de chaque molécule d’ADN : les chromatides sœurs. Lors de la **mitose**, ces chromatides sont séparées et réparties équitablement entre deux cellules filles. Les mitoses successives forment des **clones** de cellules génétiquement identiques, à de rares mutations près.',
    },
  ],

  // =====================================================================
  exercices: [
    {
      id: 'svt1-ex1',
      title: 'Vocabulaire du cycle cellulaire',
      difficulty: 1,
      duration: 10,
      tags: ['restitution'],
      statement: [
        { type: 'p', text: 'Définir les termes suivants : **chromatide**, **centromère**, **interphase**, **clone cellulaire**.' },
        { type: 'p', text: 'Puis indiquer pour chaque phase (G1, S, G2, M) le nombre de chromatides par chromosome.' },
      ],
      hints: ['Une chromatide correspond à une seule molécule d’ADN.', 'La réplication a lieu pendant la phase S.'],
      solution: [
        {
          type: 'keyvalue',
          items: [
            { key: 'Chromatide', value: 'une molécule d’ADN associée à des protéines ; un chromosome compte 1 ou 2 chromatides.' },
            { key: 'Centromère', value: 'région du chromosome qui relie les deux chromatides sœurs et sur laquelle se fixent les fibres du fuseau.' },
            { key: 'Interphase', value: 'période entre deux mitoses, comprenant G1, S et G2 ; l’ADN est décondensé et la cellule est active.' },
            { key: 'Clone cellulaire', value: 'ensemble des cellules issues d’une même cellule par mitoses successives, génétiquement identiques (sauf mutation).' },
          ],
        },
        {
          type: 'table',
          headers: ['Phase', 'Chromatides par chromosome'],
          rows: [
            ['G1', '1'],
            ['S', '1 → 2 (au fur et à mesure de la réplication)'],
            ['G2', '2'],
            ['M', '2 jusqu’à la métaphase, puis 1 à partir de l’anaphase'],
          ],
        },
      ],
    },
    {
      id: 'svt1-ex2',
      title: 'Reconnaître les phases de la mitose',
      difficulty: 1,
      duration: 10,
      tags: ['observation', 'mitose'],
      statement: [
        { type: 'p', text: 'Des cellules de pointe de racine d’oignon colorées au carmin acétique sont décrites ci-dessous. Nommer la phase correspondant à chaque description puis les ranger dans l’ordre chronologique.' },
        {
          type: 'list',
          items: [
            'A. Deux lots de chromosomes très condensés aux deux extrémités de la cellule, qui commencent à se décondenser ; une paroi se forme au milieu.',
            'B. Chromosomes condensés, regroupés en V, en migration vers les deux pôles.',
            'C. Noyau volumineux et homogène, nucléole visible, pas de chromosomes individualisés.',
            'D. Chromosomes très condensés alignés au centre de la cellule.',
            'E. Chromosomes filamenteux visibles dans un noyau dont la limite devient floue.',
          ],
        },
      ],
      hints: ['Les chromosomes en V sont tirés par le centromère.', 'Une cellule sans chromosomes visibles n’est pas en mitose.'],
      solution: [
        {
          type: 'list',
          items: [
            '**C = interphase** : ADN décondensé, enveloppe nucléaire intacte.',
            '**E = prophase** : condensation des chromosomes et fragmentation de l’enveloppe nucléaire.',
            '**D = métaphase** : chromosomes alignés sur la plaque équatoriale.',
            '**B = anaphase** : les chromatides sœurs séparées migrent vers les pôles (forme en V car tirées par le centromère).',
            '**A = télophase** (avec cytodiérèse) : décondensation et formation de la nouvelle paroi végétale.',
          ],
        },
        { type: 'p', text: 'Ordre chronologique : **C → E → D → B → A**.' },
      ],
    },
    {
      id: 'svt1-ex3',
      title: 'Interpréter une courbe de quantité d’ADN',
      difficulty: 2,
      duration: 15,
      tags: ['analyse de document', 'cycle cellulaire'],
      statement: [
        { type: 'p', text: 'On mesure la quantité d’ADN (en picogrammes) dans le noyau d’une cellule humaine en culture.' },
        {
          type: 'table',
          headers: ['Temps (h)', '0', '6', '10', '12', '14', '16', '18', '20', '22', '23', '24'],
          rows: [['ADN (pg)', '6,6', '6,6', '6,6', '8,2', '9,9', '11,5', '13,2', '13,2', '13,2', '13,2', '6,6']],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Délimiter les phases G1, S, G2 et M sachant que la mitose dure environ 1 h et que la phase S commence à 10 h.',
            'Expliquer la variation observée entre 10 h et 18 h, puis entre 23 h et 24 h.',
            'Schématiser un chromosome à 6 h et à 20 h.',
          ],
        },
      ],
      hints: ['Le doublement de la quantité d’ADN correspond à la réplication.', 'La chute brutale correspond à la fin de la mitose.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**G1** : de 0 à 10 h (palier à 6,6 pg) ; **S** : de 10 h à 18 h (augmentation progressive) ; **G2** : de 18 h à ≈ 23 h (palier à 13,2 pg) ; **M** : de ≈ 23 h à 24 h, la quantité retombe à 6,6 pg à la fin.',
            'Entre 10 h et 18 h, la quantité d’ADN double ($6{,}6 \\times 2 = 13{,}2$ pg) de façon progressive : c’est la **réplication** de l’ADN, qui dure environ 8 h. Entre 23 h et 24 h, la quantité est divisée par 2 : au cours de la **mitose**, les chromatides sœurs sont séparées et réparties entre deux cellules filles, qui reçoivent chacune 6,6 pg.',
            'À 6 h (G1) : chromosome à **une chromatide** (un bâtonnet). À 20 h (G2) : chromosome à **deux chromatides sœurs** reliées par le centromère (décondensé en réalité, mais schématisé en X).',
          ],
        },
      ],
    },
    {
      id: 'svt1-ex4',
      title: 'Prédire les résultats de Meselson et Stahl',
      difficulty: 2,
      duration: 20,
      tags: ['raisonnement', 'réplication'],
      statement: [
        { type: 'p', text: 'Des bactéries dont l’ADN est entièrement marqué à l’¹⁵N (lourd) sont placées sur un milieu ¹⁴N (léger).' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Pour chacun des trois modèles (conservatif, semi-conservatif, dispersif), prévoir le nombre et la position des bandes d’ADN après 1 et 2 générations.',
            'Les résultats réels sont : G1 = une bande intermédiaire ; G2 = une bande intermédiaire et une bande légère d’égale intensité. Conclure.',
            'Pourquoi l’analyse de la génération 1 ne suffit-elle pas à conclure ?',
          ],
        },
      ],
      hints: ['Dessinez les brins en deux couleurs (lourd / léger).', 'Le modèle dispersif donne toujours des molécules toutes identiques entre elles.'],
      solution: [
        {
          type: 'table',
          headers: ['Modèle', 'Génération 1', 'Génération 2'],
          rows: [
            ['Conservatif', '2 bandes : lourde (50 %) + légère (50 %)', '2 bandes : lourde (25 %) + légère (75 %)'],
            ['Semi-conservatif', '1 bande intermédiaire (100 % hybride)', '2 bandes : intermédiaire (50 %) + légère (50 %)'],
            ['Dispersif', '1 bande intermédiaire (½ ¹⁵N)', '1 bande entre intermédiaire et légère (¼ ¹⁵N)'],
          ],
        },
        {
          type: 'p',
          text: '2. Les résultats de G1 éliminent le modèle conservatif (une seule bande au lieu de deux) ; ceux de G2 éliminent le modèle dispersif (deux bandes au lieu d’une). Seul le **modèle semi-conservatif** est validé : chaque molécule fille contient un brin parental et un brin néoformé.',
        },
        {
          type: 'p',
          text: '3. À la génération 1, les modèles semi-conservatif et dispersif prévoient **tous deux** une bande unique intermédiaire : ils ne peuvent pas être départagés. Il faut la génération 2 pour les distinguer.',
        },
      ],
    },
    {
      id: 'svt1-ex5',
      title: 'Proportion d’ADN hybride',
      difficulty: 2,
      duration: 10,
      tags: ['calcul', 'réplication'],
      statement: [
        { type: 'p', text: 'On part d’**une** molécule d’ADN lourde (¹⁵N/¹⁵N) placée en milieu ¹⁴N, réplication semi-conservative.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Combien de molécules obtient-on après 3 générations ? Combien sont hybrides ?',
            'Quelle est la proportion d’ADN hybride après 3 puis 5 générations ?',
            'Retrouver la formule générale.',
          ],
        },
      ],
      hints: ['Le nombre de molécules double à chaque génération.', 'Les deux brins lourds initiaux ne disparaissent jamais.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Après 3 générations : $2^3 = 8$ molécules. Les deux brins lourds d’origine se retrouvent chacun dans une molécule hybride : **2 hybrides** et 6 légères.',
            'Après 3 générations : $\\frac{2}{8} = 25\\,\\%$. Après 5 générations : $\\frac{2}{2^5} = \\frac{2}{32} = 6{,}25\\,\\%$.',
            'Après $n$ générations ($n \\geq 1$) : proportion hybride $= \\frac{2}{2^n} = \\frac{1}{2^{n-1}}$, le reste étant léger. Il n’y a plus jamais d’ADN lourd dès la génération 1.',
          ],
        },
      ],
    },
    {
      id: 'svt1-ex6',
      title: 'Pourquoi de nombreuses origines de réplication ?',
      difficulty: 2,
      duration: 15,
      tags: ['calcul', 'réplication'],
      statement: [
        {
          type: 'p',
          text: 'Le chromosome 1 humain contient environ $2{,}49 \\times 10^8$ paires de bases. Chaque fourche de réplication progresse à environ 50 nucléotides par seconde. La phase S dure environ 8 h.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la durée de réplication de ce chromosome s’il n’existait qu’**une seule** origine (deux fourches partant en sens opposés). Conclure.',
            'Calculer le nombre minimal d’origines nécessaires pour répliquer ce chromosome en 8 h.',
          ],
        },
      ],
      hints: ['Une origine = deux fourches = 100 nucléotides par seconde.', '8 h = 28 800 s.'],
      solution: [
        {
          type: 'p',
          text: '1. Une origine ouvre deux fourches : vitesse totale $2 \\times 50 = 100$ nucléotides/s. Durée : $\\frac{2{,}49 \\times 10^8}{100} = 2{,}49 \\times 10^6$ s, soit $\\frac{2{,}49 \\times 10^6}{86\\,400} \\approx 29$ jours. C’est incompatible avec une phase S de 8 h.',
        },
        {
          type: 'p',
          text: '2. En 8 h $= 28\\,800$ s, une origine réplique $100 \\times 28\\,800 = 2{,}88 \\times 10^6$ pb. Nombre minimal d’origines : $\\frac{2{,}49 \\times 10^8}{2{,}88 \\times 10^6} \\approx 86{,}5$, soit **au moins 87 origines**. En réalité, il en existe bien davantage (plusieurs centaines sur ce chromosome), ce qui explique les nombreux yeux de réplication observés au microscope électronique.',
        },
      ],
    },
    {
      id: 'svt1-ex7',
      title: 'Durée des phases de la mitose',
      difficulty: 3,
      duration: 20,
      tags: ['analyse de document', 'calcul', 'type bac'],
      statement: [
        {
          type: 'p',
          text: 'Dans une culture de cellules humaines se divisant de façon asynchrone, le cycle dure 24 h. On compte 1 000 cellules au microscope :',
        },
        {
          type: 'table',
          headers: ['Phase', 'Interphase', 'Prophase', 'Métaphase', 'Anaphase', 'Télophase'],
          rows: [['Nombre de cellules', '900', '50', '20', '10', '20']],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Justifier qu’on peut déduire la durée d’une phase de la proportion de cellules qui s’y trouvent.',
            'Calculer la durée de chaque phase.',
            'Pour réaliser un caryotype, on bloque les cellules en métaphase avec de la colchicine (qui empêche la formation du fuseau). Expliquer pourquoi la métaphase est choisie.',
          ],
        },
      ],
      hints: ['Plus une phase est longue, plus on a de chances d’y « surprendre » une cellule.', 'Durée = proportion × 24 h.'],
      solution: [
        {
          type: 'p',
          text: '1. Les cellules étant **asynchrones**, à un instant donné elles sont réparties au hasard dans le cycle. La probabilité d’observer une cellule dans une phase est égale à la fraction du cycle occupée par cette phase : proportion de cellules = durée de la phase / durée du cycle.',
        },
        {
          type: 'table',
          headers: ['Phase', 'Proportion', 'Durée'],
          rows: [
            ['Interphase', '900/1000 = 90 %', '0,90 × 24 = 21,6 h'],
            ['Prophase', '5 %', '1,2 h = 72 min'],
            ['Métaphase', '2 %', '0,48 h ≈ 29 min'],
            ['Anaphase', '1 %', '0,24 h ≈ 14 min'],
            ['Télophase', '2 %', '0,48 h ≈ 29 min'],
          ],
        },
        { type: 'p', text: 'La mitose dure au total 2,4 h (10 % du cycle) ; l’anaphase est la phase la plus courte.' },
        {
          type: 'p',
          text: '3. En métaphase, les chromosomes sont **condensés au maximum** et bien individualisés sur la plaque équatoriale : on peut les compter, les classer par taille et position du centromère. La colchicine empêchant la formation du fuseau, les chromatides ne peuvent pas être séparées : les cellules s’accumulent en métaphase, ce qui augmente le nombre de cellules exploitables.',
        },
      ],
    },
    {
      id: 'svt1-ex8',
      title: 'Synthèse : la conservation de l’information génétique',
      difficulty: 3,
      duration: 40,
      tags: ['restitution', 'synthèse', 'type bac'],
      statement: [
        {
          type: 'p',
          text: '« Toutes les cellules d’un individu, issues de la cellule-œuf, possèdent la même information génétique. » Dans un texte structuré illustré de schémas, expliquer comment la réplication et la mitose permettent la conservation de l’information génétique au cours des divisions cellulaires. Vous préciserez la limite de cette affirmation.',
        },
      ],
      hints: [
        'Plan possible : I. La réplication (S) — II. La mitose — III. Clones et limites (mutations).',
        'Pensez à un schéma des chromosomes d’une cellule 2n = 4 à chaque étape.',
      ],
      solution: [
        { type: 'h3', text: 'Introduction' },
        { type: 'p', text: 'Un organisme pluricellulaire provient de la cellule-œuf par une succession de divisions cellulaires. Problème : comment l’information génétique, portée par l’ADN des chromosomes, est-elle copiée puis transmise à l’identique ?' },
        { type: 'h3', text: 'I. La réplication de l’ADN en phase S' },
        {
          type: 'list',
          items: [
            'Pendant l’interphase, au cours de la phase S, la quantité d’ADN double (Q → 2Q).',
            'Les deux brins de chaque molécule se séparent ; l’ADN polymérase synthétise sur chaque brin matrice un brin complémentaire (A–T, C–G).',
            'La réplication est **semi-conservative** (Meselson et Stahl, 1958) : chaque molécule fille contient un brin ancien et un brin nouveau, et est identique à la molécule mère.',
            'Chaque chromosome possède alors deux chromatides sœurs identiques.',
          ],
        },
        { type: 'h3', text: 'II. La mitose répartit équitablement les copies' },
        {
          type: 'list',
          items: [
            'Prophase : condensation ; métaphase : alignement sur la plaque équatoriale.',
            'Anaphase : séparation des chromatides sœurs, chaque pôle reçoit un exemplaire de chaque chromatide.',
            'Télophase et cytodiérèse : deux cellules filles à 2n chromosomes à une chromatide, identiques à la cellule mère (quantité Q).',
          ],
        },
        { type: 'h3', text: 'III. Clones cellulaires et limites' },
        {
          type: 'p',
          text: 'Les mitoses successives forment un clone de cellules génétiquement identiques. Toutefois, la réplication n’est pas parfaite (≈ 1 erreur pour $10^9$ à $10^{10}$ nucléotides après réparation) : des **mutations** apparaissent et se transmettent aux cellules filles, formant des sous-clones. L’affirmation est donc vraie « aux mutations près » ; de plus, les gamètes (issus de la méiose) ne sont pas identiques aux cellules somatiques.',
        },
        { type: 'h3', text: 'Conclusion' },
        { type: 'p', text: 'Le couple réplication semi-conservative / mitose garantit une transmission conforme de l’information génétique, base de l’unité génétique de l’individu, tandis que les rares erreurs non réparées sont source de variabilité.' },
      ],
    },
  ],

  // =====================================================================
  representations: [
    {
      type: 'widget',
      id: 'mitosis-stages',
      title: 'Explorer le cycle cellulaire et la mitose',
      caption: 'Suivez l’état des chromosomes et la quantité d’ADN à chaque étape.',
    },
    { type: 'svg', svg: svgMitose, caption: 'Les phases de la mitose (2n = 4).', maxWidth: 700 },
    { type: 'svg', svg: svgMeselson, caption: 'Expérience de Meselson et Stahl : position des bandes d’ADN.', maxWidth: 560 },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre les étapes du cycle',
      items: [
        'G1 : croissance, chromosomes à une chromatide',
        'S : réplication de l’ADN',
        'G2 : préparation de la division',
        'Prophase : condensation des chromosomes',
        'Métaphase : plaque équatoriale',
        'Anaphase : séparation des chromatides sœurs',
        'Télophase : décondensation, deux noyaux',
        'Cytodiérèse : deux cellules filles',
      ],
    },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Pendant quelle phase la quantité d’ADN d’une cellule double-t-elle ?',
          choices: ['G1', 'S', 'G2', 'Anaphase'],
          answer: 1,
          explanation: 'La réplication de l’ADN a lieu pendant la phase S de l’interphase.',
        },
        {
          question: 'En anaphase de mitose, il y a séparation…',
          choices: ['des chromosomes homologues', 'des chromatides sœurs', 'des deux brins d’ADN', 'des noyaux'],
          answer: 1,
          explanation: 'Les centromères se séparent et chaque chromatide sœur migre vers un pôle.',
        },
        {
          question: 'Dans l’expérience de Meselson et Stahl, quel résultat élimine le modèle conservatif ?',
          choices: ['Une seule bande lourde en G0', 'Une seule bande intermédiaire en G1', 'Deux bandes en G2', 'Une bande légère en G3'],
          answer: 1,
          explanation: 'Le modèle conservatif prévoyait deux bandes (lourde et légère) dès la génération 1.',
        },
        {
          question: 'Après 4 générations en ¹⁴N (réplication semi-conservative), la proportion d’ADN hybride est de :',
          choices: ['50 %', '25 %', '12,5 %', '6,25 %'],
          answer: 2,
          explanation: '2 molécules hybrides sur 2⁴ = 16, soit 1/8 = 12,5 %.',
        },
        {
          question: 'L’ADN polymérase :',
          choices: [
            'sépare les chromatides sœurs',
            'synthétise un brin d’ADN complémentaire d’un brin matrice',
            'synthétise l’ARN messager',
            'condense les chromosomes',
          ],
          answer: 1,
        },
        {
          question: 'Un chromosome de cellule en G2 est constitué de :',
          choices: ['une molécule d’ADN', 'deux molécules d’ADN identiques', 'deux chromosomes homologues', 'quatre brins d’ADN différents'],
          answer: 1,
          explanation: 'Deux chromatides sœurs = deux molécules d’ADN double brin identiques (soit 4 brins, deux à deux complémentaires).',
        },
        {
          question: 'Une colonie de levures sur une boîte de Petri est :',
          choices: ['un clone', 'un mélange de cellules génétiquement différentes', 'un organisme pluricellulaire', 'un tissu'],
          answer: 0,
          explanation: 'Elle est issue d’une seule cellule par divisions successives.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Cycle cellulaire', back: 'Interphase (G1, S, G2) + mitose (M).' },
        { front: 'Phase S', back: 'Réplication de l’ADN : Q → 2Q, chromosomes à 2 chromatides.' },
        { front: 'Chromatides sœurs', back: 'Deux copies identiques d’une molécule d’ADN, reliées par le centromère.' },
        { front: 'Prophase', back: 'Condensation des chromosomes, disparition de l’enveloppe nucléaire, fuseau.' },
        { front: 'Métaphase', back: 'Chromosomes alignés sur la plaque équatoriale.' },
        { front: 'Anaphase', back: 'Séparation des chromatides sœurs vers les pôles.' },
        { front: 'Télophase', back: 'Décondensation, reformation de 2 enveloppes nucléaires.' },
        { front: 'Réplication semi-conservative', back: 'Chaque molécule fille = 1 brin ancien + 1 brin néoformé.' },
        { front: 'Meselson et Stahl (1958)', back: '¹⁵N → ¹⁴N, centrifugation CsCl : G1 hybride, G2 hybride + léger.' },
        { front: 'ADN polymérase', back: 'Enzyme qui assemble les nucléotides complémentaires du brin matrice.' },
        { front: 'Clone cellulaire', back: 'Cellules issues d’une même cellule par mitoses, génétiquement identiques.' },
        { front: 'Taux d’erreur final de la réplication', back: '≈ 1 nucléotide pour 10⁹ à 10¹⁰ après relecture et réparation.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter le bilan',
      text: 'Pendant la phase {{S}} de l’interphase, l’ADN est répliqué de manière {{semi-conservative|semi conservative}} : chaque brin sert de {{matrice}} à l’{{ADN polymérase}}, qui respecte la complémentarité A–{{T}} et C–{{G}}. Pendant l’{{anaphase}}, les {{chromatides}} sœurs se séparent. Les cellules issues d’une même cellule par mitoses forment un {{clone}}.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'La mitose double le nombre de chromosomes.', answer: false, explanation: 'Elle conserve le nombre de chromosomes (2n → 2n) ; c’est la réplication qui double la quantité d’ADN.' },
        { text: 'Une cellule en G1 et une cellule en G2 ont le même nombre de chromosomes.', answer: true, explanation: 'Oui (2n = 46), mais à 1 chromatide en G1 et 2 chromatides en G2.' },
        { text: 'Le modèle dispersif est éliminé dès la première génération par Meselson et Stahl.', answer: false, explanation: 'Il prévoit aussi une bande intermédiaire en G1 ; il n’est éliminé qu’à la génération 2.' },
        { text: 'Les cellules d’un clone peuvent différer par quelques mutations.', answer: true, explanation: 'Une erreur de réplication non réparée est transmise à toute la descendance de la cellule : sous-clone.' },
        { text: 'La réplication a lieu pendant la prophase.', answer: false, explanation: 'Elle a lieu en phase S de l’interphase ; en prophase, les chromosomes ont déjà deux chromatides.' },
      ],
    },
  ],
}

export default chapter
