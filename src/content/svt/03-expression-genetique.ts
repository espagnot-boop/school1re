import type { Chapter } from '../types'

const F = 'font-family="Geist, sans-serif"'
const BLUE = 'hsl(217 91% 60%)'
const RED = 'hsl(0 84% 60%)'
const GREEN = 'hsl(142 71% 45%)'
const ORANGE = 'hsl(25 95% 53%)'
const VIOLET = 'hsl(263 70% 60%)'

// ---------- Code génétique (ordre des bases U, C, A, G) ----------
const BASES = ['U', 'C', 'A', 'G']
const AA = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG'
const NAMES: Record<string, string> = {
  F: 'Phe', L: 'Leu', S: 'Ser', Y: 'Tyr', '*': '**STOP**', C: 'Cys', W: 'Trp', P: 'Pro', H: 'His', Q: 'Gln', R: 'Arg',
  I: 'Ile', M: '**Met** (initiation)', T: 'Thr', N: 'Asn', K: 'Lys', V: 'Val', A: 'Ala', D: 'Asp', E: 'Glu', G: 'Gly',
}
const codeRows: string[][] = []
BASES.forEach((b1, i) =>
  BASES.forEach((b3, k) => {
    const row = [k === 0 ? `**${b1}**` : '']
    BASES.forEach((b2, j) => {
      row.push(`${b1}${b2}${b3} ${NAMES[AA[i * 16 + j * 4 + k]]}`)
    })
    row.push(b3)
    codeRows.push(row)
  }),
)

// ---------- Schémas SVG ----------
const svgFlux = `<svg viewBox="0 0 560 230" width="100%" xmlns="http://www.w3.org/2000/svg" ${F}>
  <rect x="10" y="10" width="540" height="210" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="20" y="28" font-size="11" class="svg-muted" fill="currentColor">cellule eucaryote</text>
  <ellipse cx="150" cy="120" rx="125" ry="85" fill="none" stroke="currentColor" stroke-dasharray="5 3"/>
  <text x="150" y="52" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">noyau</text>
  <g stroke="${BLUE}" stroke-width="4"><line x1="50" y1="80" x2="190" y2="80"/><line x1="50" y1="90" x2="190" y2="90"/></g>
  <rect x="90" y="74" width="60" height="22" fill="none" stroke="${ORANGE}" stroke-width="1.5"/>
  <text x="120" y="112" text-anchor="middle" font-size="11" fill="currentColor">gène (ADN)</text>
  <path d="M120 118 V138" stroke="currentColor"/><path d="M120 142 l-4 -7 h8 z" fill="currentColor"/>
  <text x="130" y="134" font-size="11" fill="currentColor" font-weight="600">transcription</text>
  <path d="M70 155 H170" stroke="${GREEN}" stroke-width="3" stroke-dasharray="10 4"/>
  <text x="120" y="172" text-anchor="middle" font-size="11" fill="currentColor">pré-ARNm → ARNm</text>
  <text x="120" y="186" text-anchor="middle" font-size="10" class="svg-muted" fill="currentColor">(maturation, épissage)</text>
  <path d="M180 155 C 240 155 260 150 330 150" stroke="currentColor" fill="none"/><path d="M334 150 l-7 -4 v8 z" fill="currentColor"/>
  <text x="262" y="142" font-size="10" fill="currentColor">pore nucléaire</text>
  <path d="M345 150 H470" stroke="${GREEN}" stroke-width="3"/>
  <ellipse cx="385" cy="140" rx="20" ry="12" fill="none" stroke="${VIOLET}" stroke-width="1.5"/>
  <ellipse cx="385" cy="158" rx="24" ry="10" fill="none" stroke="${VIOLET}" stroke-width="1.5"/>
  <text x="410" y="178" font-size="11" fill="currentColor" font-weight="600">traduction</text>
  <text x="410" y="192" font-size="10" class="svg-muted" fill="currentColor">(ribosome, cytoplasme)</text>
  <g fill="${RED}"><circle cx="385" cy="112" r="5"/><circle cx="395" cy="102" r="5"/><circle cx="407" cy="96" r="5"/><circle cx="420" cy="92" r="5"/></g>
  <text x="430" y="96" font-size="11" fill="currentColor">protéine</text>
</svg>`

const svgTranscription = `<svg viewBox="0 0 560 210" width="100%" xmlns="http://www.w3.org/2000/svg" ${F}>
  <g stroke="${BLUE}" stroke-width="4" fill="none">
    <path d="M10 70 H170 C 200 70 210 40 250 40 H330 C 370 40 380 70 410 70 H550"/>
    <path d="M10 90 H170 C 200 90 210 130 250 130 H330 C 370 130 380 90 410 90 H550"/>
  </g>
  <rect x="300" y="88" width="60" height="44" fill="${VIOLET}" fill-opacity="0.18" stroke="${VIOLET}"/>
  <text x="330" y="106" text-anchor="middle" font-size="10" fill="currentColor">ARN</text>
  <text x="330" y="119" text-anchor="middle" font-size="10" fill="currentColor">polymérase</text>
  <path d="M300 118 C 270 118 250 160 200 175 L120 190" stroke="${GREEN}" stroke-width="3" fill="none"/>
  <g font-size="11" fill="currentColor">
    <text x="20" y="60">brin non transcrit (codant)</text>
    <text x="20" y="110">brin transcrit (matrice)</text>
    <text x="40" y="196">ARN en cours de synthèse (5′ → 3′)</text>
    <text x="420" y="125">sens de la</text>
    <text x="420" y="139">transcription →</text>
  </g>
  <g font-size="11" fill="currentColor" font-family="Geist Mono, monospace">
    <text x="240" y="32">5′ A T G C C A 3′</text>
    <text x="236" y="150" class="svg-muted">3′ T A C G G T 5′</text>
    <text x="236" y="166" fill="${GREEN}">5′ A U G C C A 3′ (ARN)</text>
  </g>
</svg>`

const box = (x: number, w: number, label: string, col: string, intron = false) =>
  intron
    ? `<line x1="${x}" y1="45" x2="${x + w}" y2="45" stroke="currentColor" stroke-width="2"/><text x="${x + w / 2}" y="36" text-anchor="middle" font-size="10" class="svg-muted" fill="currentColor">${label}</text>`
    : `<rect x="${x}" y="33" width="${w}" height="24" fill="${col}" fill-opacity="0.35" stroke="${col}"/><text x="${x + w / 2}" y="49" text-anchor="middle" font-size="11" fill="currentColor">${label}</text>`

const exon = (x: number, y: number, w: number, label: string, col: string) =>
  `<rect x="${x}" y="${y}" width="${w}" height="22" fill="${col}" fill-opacity="0.35" stroke="${col}"/><text x="${x + w / 2}" y="${y + 15}" text-anchor="middle" font-size="11" fill="currentColor">${label}</text>`

const svgEpissage = `<svg viewBox="0 0 560 250" width="100%" xmlns="http://www.w3.org/2000/svg" ${F}>
  <text x="10" y="20" font-size="12" font-weight="600" fill="currentColor">Pré-ARNm</text>
  ${box(20, 70, 'E1', BLUE)}${box(90, 50, 'intron', '', true)}${box(140, 70, 'E2', GREEN)}${box(210, 50, 'intron', '', true)}${box(260, 70, 'E3', ORANGE)}${box(330, 50, 'intron', '', true)}${box(380, 70, 'E4', VIOLET)}
  <g stroke="currentColor" fill="none"><path d="M150 65 L90 110"/><path d="M330 65 L390 110"/></g>
  <text x="240" y="92" text-anchor="middle" font-size="11" fill="currentColor">épissage : élimination des introns, raccordement des exons</text>
  <text x="10" y="130" font-size="12" font-weight="600" fill="currentColor">ARNm 1</text>
  ${exon(80, 116, 70, 'E1', BLUE)}${exon(150, 116, 70, 'E2', GREEN)}${exon(220, 116, 70, 'E3', ORANGE)}${exon(290, 116, 70, 'E4', VIOLET)}
  <text x="380" y="131" font-size="11" fill="currentColor">→ protéine 1</text>
  <text x="10" y="180" font-size="12" font-weight="600" fill="currentColor">ARNm 2</text>
  ${exon(80, 166, 70, 'E1', BLUE)}${exon(150, 166, 70, 'E2', GREEN)}${exon(220, 166, 70, 'E4', VIOLET)}
  <text x="380" y="181" font-size="11" fill="currentColor">→ protéine 2</text>
  <text x="10" y="230" font-size="11" class="svg-muted" fill="currentColor">Épissage alternatif : l’exon 3 est conservé dans un tissu, éliminé dans un autre → deux protéines à partir d’un seul gène.</text>
</svg>`

const codonBox = (x: number, c: string, aa: string, active = false) =>
  `<text x="${x + 22}" y="128" text-anchor="middle" font-size="12" fill="currentColor" font-family="Geist Mono, monospace">${c}</text>${aa ? `<text x="${x + 22}" y="150" text-anchor="middle" font-size="10" class="svg-muted" fill="currentColor">${aa}</text>` : ''}${active ? `<rect x="${x}" y="112" width="44" height="22" fill="none" stroke="${RED}" stroke-width="1.5"/>` : ''}`

const svgTraduction = `<svg viewBox="0 0 560 200" width="100%" xmlns="http://www.w3.org/2000/svg" ${F}>
  <line x1="10" y1="136" x2="550" y2="136" stroke="${GREEN}" stroke-width="3"/>
  <text x="14" y="128" font-size="11" fill="currentColor">5′</text><text x="534" y="128" font-size="11" fill="currentColor">3′</text>
  ${codonBox(40, 'AUG', 'Met')}${codonBox(90, 'GCA', 'Ala')}${codonBox(140, 'UUC', 'Phe')}${codonBox(190, 'AAA', 'Lys', true)}${codonBox(240, 'GGC', '')}${codonBox(290, 'UGG', '')}${codonBox(340, 'CCA', '')}${codonBox(390, 'UAA', 'STOP')}
  <ellipse cx="212" cy="104" rx="48" ry="28" fill="${VIOLET}" fill-opacity="0.12" stroke="${VIOLET}" stroke-width="1.5"/>
  <ellipse cx="212" cy="148" rx="56" ry="18" fill="${VIOLET}" fill-opacity="0.12" stroke="${VIOLET}" stroke-width="1.5"/>
  <text x="212" y="186" text-anchor="middle" font-size="11" fill="currentColor">ribosome (se déplace codon par codon, 5′ → 3′)</text>
  <g fill="${RED}" stroke="none">
    <circle cx="212" cy="70" r="9"/><circle cx="190" cy="56" r="9"/><circle cx="168" cy="44" r="9"/><circle cx="146" cy="34" r="9"/>
  </g>
  <g font-size="9" fill="white" text-anchor="middle"><text x="212" y="73">Lys</text><text x="190" y="59">Phe</text><text x="168" y="47">Ala</text><text x="146" y="37">Met</text></g>
  <text x="240" y="40" font-size="11" fill="currentColor">chaîne polypeptidique en croissance</text>
  <text x="240" y="54" font-size="10" class="svg-muted" fill="currentColor">(acides aminés unis par liaisons peptidiques)</text>
  <path d="M290 100 H330" stroke="currentColor"/><path d="M334 100 l-7 -4 v8 z" fill="currentColor"/>
</svg>`

const svgEchelles = `<svg viewBox="0 0 560 190" width="100%" xmlns="http://www.w3.org/2000/svg" ${F}>
  <rect x="10" y="20" width="160" height="120" fill="none" stroke="${BLUE}"/>
  <rect x="200" y="20" width="160" height="120" fill="none" stroke="${GREEN}"/>
  <rect x="390" y="20" width="160" height="120" fill="none" stroke="${ORANGE}"/>
  <g font-size="12" font-weight="600" fill="currentColor" text-anchor="middle">
    <text x="90" y="40">Moléculaire</text><text x="280" y="40">Cellulaire</text><text x="470" y="40">Organisme</text>
  </g>
  <g font-size="11" fill="currentColor" text-anchor="middle">
    <text x="90" y="70">protéine produite</text><text x="90" y="86">(séquence, forme,</text><text x="90" y="102">activité)</text>
    <text x="280" y="70">fonctionnement,</text><text x="280" y="86">forme de la cellule</text>
    <text x="470" y="70">caractères visibles</text><text x="470" y="86">ou mesurables</text>
  </g>
  <g font-size="10" class="svg-muted" fill="currentColor" text-anchor="middle">
    <text x="90" y="124">ex. hémoglobine S</text><text x="280" y="124">hématie en faucille</text><text x="470" y="124">anémie, crises</text>
  </g>
  <g stroke="currentColor"><path d="M170 80 H196"/><path d="M360 80 H386"/></g>
  <path d="M200 80 l-7 -4 v8 z" fill="currentColor"/><path d="M390 80 l-7 -4 v8 z" fill="currentColor"/>
  <rect x="10" y="155" width="540" height="26" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>
  <text x="280" y="172" text-anchor="middle" font-size="11" fill="currentColor">Génotype (allèles)  +  environnement (température, alimentation, O₂, UV…)  →  phénotype</text>
</svg>`

const chapter: Chapter = {
  id: 'expression-genetique',
  subject: 'svt',
  order: 3,
  title: 'L’expression du patrimoine génétique',
  theme: 'Transmission, variation et expression du patrimoine génétique',
  summary:
    'De l’ADN à la protéine : transcription, maturation de l’ARN (épissage alternatif) et traduction grâce au code génétique ; le phénotype résulte des protéines produites et de l’environnement.',
  duration: '3 semaines',
  objectives: [
    'Décrire la transcription d’un gène en ARN par l’ARN polymérase, selon la complémentarité des bases.',
    'Expliquer la maturation de l’ARN pré-messager chez les eucaryotes et l’épissage alternatif.',
    'Décrire la traduction de l’ARNm en protéine par les ribosomes et utiliser le code génétique.',
    'Connaître les propriétés du code génétique (triplets, univocité, redondance, universalité, codons d’initiation et STOP).',
    'Définir le phénotype à différentes échelles et relier génotype, protéines et phénotype.',
    'Montrer, à partir d’exemples, que l’environnement influence l’expression du génotype.',
  ],
  keywords: ['transcription', 'ARN polymérase', 'ARNm', 'épissage', 'exon', 'intron', 'traduction', 'ribosome', 'codon', 'code génétique', 'phénotype'],

  // =====================================================================
  fiche: [
    { type: 'h2', text: 'De l’ADN à la protéine' },
    { type: 'math', tex: '\\text{ADN (gène)} \\xrightarrow{\\text{transcription}} \\text{pré-ARNm} \\xrightarrow{\\text{maturation}} \\text{ARNm} \\xrightarrow{\\text{traduction}} \\text{protéine}' },
    {
      type: 'table',
      headers: ['Étape', 'Lieu (eucaryote)', 'Acteur', 'Principe'],
      rows: [
        ['Transcription', 'noyau', 'ARN polymérase', 'copie d’**un seul brin** (brin transcrit) en ARN complémentaire : A→U, T→A, C→G, G→C'],
        ['Maturation', 'noyau', 'complexe d’épissage', 'élimination des **introns**, raccordement des **exons** ; **épissage alternatif** → plusieurs ARNm par gène'],
        ['Traduction', 'cytoplasme', '**ribosome**', 'lecture des **codons** de l’ARNm de AUG jusqu’à un STOP ; assemblage des acides aminés'],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Le code génétique',
      content: [
        {
          type: 'list',
          items: [
            '**Triplets** : 1 codon = 3 nucléotides de l’ARNm → $4^3 = 64$ codons.',
            '**Univoque** (non ambigu) : un codon ne code qu’un seul acide aminé.',
            '**Redondant** : 61 codons pour 20 acides aminés → plusieurs codons pour un même acide aminé.',
            '**Universel** (à de rares exceptions près) : le même chez presque tous les êtres vivants.',
            'Codon d’**initiation** AUG (Met) ; codons **STOP** UAA, UAG, UGA (aucun acide aminé).',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'ARN ≠ ADN',
      content: [{ type: 'p', text: 'L’ARN est **simple brin**, contient du **ribose** et de l’**uracile (U)** à la place de la thymine. L’ARNm a la même séquence que le **brin non transcrit** (codant) de l’ADN, avec U à la place de T.' }],
    },
    { type: 'h2', text: 'Du génotype au phénotype' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Phénotype', value: 'ensemble des caractères d’un individu, observable à l’échelle **moléculaire** (protéines), **cellulaire** et de l’**organisme**.' },
        { key: 'Génotype', value: 'ensemble des allèles d’un individu (pour un ou plusieurs gènes).' },
        { key: 'Lien', value: 'les allèles déterminent la séquence des protéines, dont l’activité détermine le phénotype.' },
        { key: 'Environnement', value: 'influence aussi le phénotype : lapin himalayen (température), phénylcétonurie (alimentation), bronzage (UV).' },
      ],
    },
  ],

  // =====================================================================
  cours: [
    { type: 'h2', text: 'Introduction' },
    {
      type: 'p',
      text: 'Toutes les cellules d’un individu possèdent la même information génétique, mais un neurone, une hématie ou une cellule de la peau ne fabriquent pas les mêmes protéines. L’**expression** d’un gène correspond à la production de la molécule qu’il code, le plus souvent une **protéine**. Comment l’information portée par la séquence de l’ADN est-elle convertie en une séquence d’acides aminés ?',
    },
    { type: 'svg', svg: svgFlux, caption: 'Vue d’ensemble de l’expression d’un gène dans une cellule eucaryote.', maxWidth: 680 },
    {
      type: 'p',
      text: 'Chez les eucaryotes, l’ADN reste dans le **noyau**, alors que les protéines sont synthétisées dans le **cytoplasme**. Il existe donc un **intermédiaire** entre les deux : l’**ARN messager** (ARNm).',
    },

    { type: 'h2', text: '1. Les protéines, molécules de l’expression génétique' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Protéine',
      content: [
        {
          type: 'p',
          text: 'Macromolécule formée d’une ou plusieurs chaînes d’**acides aminés** liés par des **liaisons peptidiques**. Il existe **20 acides aminés** différents dans les protéines du vivant. La **séquence** (ordre) des acides aminés détermine la **forme tridimensionnelle** de la protéine, donc sa **fonction**.',
        },
      ],
    },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Enzymes', text: 'catalysent les réactions du métabolisme (tyrosinase, amylase…).', icon: 'FlaskConical' },
        { title: 'Transport', text: 'hémoglobine (O₂), canaux et transporteurs membranaires (CFTR).', icon: 'Truck' },
        { title: 'Structure', text: 'kératine, collagène, protéines du cytosquelette.', icon: 'Boxes' },
        { title: 'Signalisation', text: 'hormones (insuline), récepteurs.', icon: 'Radio' },
        { title: 'Défense', text: 'anticorps.', icon: 'Shield' },
        { title: 'Mouvement', text: 'actine et myosine des muscles.', icon: 'Activity' },
      ],
    },

    { type: 'h2', text: '2. La transcription : de l’ADN à l’ARN' },
    { type: 'h3', text: '2.1. L’ARN, une molécule proche de l’ADN' },
    {
      type: 'table',
      headers: ['', 'ADN', 'ARN'],
      rows: [
        ['Sucre', 'désoxyribose', 'ribose'],
        ['Bases', 'A, T, C, G', 'A, **U**, C, G'],
        ['Structure', 'double brin (double hélice)', 'simple brin'],
        ['Taille', 'très longue (millions de nucléotides)', 'courte (quelques centaines à milliers)'],
        ['Localisation (eucaryotes)', 'noyau (et mitochondries)', 'synthétisé dans le noyau, ARNm traduit dans le cytoplasme'],
        ['Durée de vie', 'stable', 'courte (ARNm dégradé en quelques minutes à quelques heures)'],
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Mettre en évidence l’intermédiaire',
      content: [
        {
          type: 'p',
          text: 'Des cellules sont cultivées pendant 15 min en présence d’**uridine radioactive** (précurseur spécifique de l’ARN), puis transférées sur un milieu non radioactif. Juste après le marquage, la radioactivité est localisée dans le **noyau** ; 1 h 30 plus tard, elle se trouve majoritairement dans le **cytoplasme**. L’ARN est donc synthétisé dans le noyau puis migre vers le cytoplasme (par les pores nucléaires).',
        },
      ],
    },
    { type: 'h3', text: '2.2. Le mécanisme de la transcription' },
    { type: 'svg', svg: svgTranscription, caption: 'Transcription d’un gène par l’ARN polymérase.', maxWidth: 680 },
    {
      type: 'steps',
      items: [
        { title: 'Initiation', text: 'L’**ARN polymérase** se fixe en amont du gène et sépare localement les deux brins d’ADN.' },
        {
          title: 'Élongation',
          text: 'Elle se déplace le long du gène et assemble des **ribonucléotides** libres complémentaires du **brin transcrit** (brin matrice) : face à A elle place U, face à T → A, face à C → G, face à G → C. L’ARN est synthétisé dans le sens 5′ → 3′.',
        },
        { title: 'Terminaison', text: 'À la fin du gène, l’ARN polymérase se détache ; l’ARN est libéré et la double hélice se referme.' },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Brin transcrit et brin non transcrit',
      content: [
        {
          type: 'p',
          text: 'Pour un gène donné, **un seul** des deux brins est transcrit. L’ARN produit est **complémentaire du brin transcrit** et donc **identique au brin non transcrit** (appelé aussi brin codant), à la différence près que **U remplace T**. C’est pourquoi les séquences de gènes sont généralement données sous la forme du brin non transcrit.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        { type: 'p', text: 'Brin non transcrit : `5′ ATG CCA GTT 3′`' },
        { type: 'p', text: 'Brin transcrit : `3′ TAC GGT CAA 5′`' },
        { type: 'p', text: 'ARN : `5′ AUG CCA GUU 3′`' },
      ],
    },
    {
      type: 'p',
      text: 'Un même gène peut être transcrit simultanément par de nombreuses ARN polymérases, ce qui produit rapidement beaucoup de copies d’ARN : c’est une **amplification** de l’information.',
    },

    { type: 'h2', text: '3. La maturation de l’ARN chez les eucaryotes' },
    {
      type: 'p',
      text: 'Chez les eucaryotes, la plupart des gènes sont **morcelés** : ils alternent des **exons** (séquences conservées dans l’ARNm) et des **introns** (séquences éliminées). La transcription produit d’abord un **ARN pré-messager** (pré-ARNm), copie complète du gène, exons et introns compris.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Épissage',
      content: [
        {
          type: 'p',
          text: 'Étape de **maturation** du pré-ARNm, dans le noyau, au cours de laquelle les **introns sont excisés** et les **exons raccordés** bout à bout. On obtient l’**ARNm mature**, plus court, qui quitte le noyau.',
        },
      ],
    },
    { type: 'svg', svg: svgEpissage, caption: 'Épissage et épissage alternatif.', maxWidth: 680 },
    {
      type: 'callout',
      variant: 'property',
      title: 'Épissage alternatif',
      content: [
        {
          type: 'p',
          text: 'Selon la cellule (le tissu) ou le moment, certains exons peuvent être conservés ou éliminés : **un même pré-ARNm** donne alors **plusieurs ARNm différents**, donc **plusieurs protéines**. Plus de 90 % des gènes humains à plusieurs exons subissent un épissage alternatif. Ainsi, avec environ 20 000 gènes codant des protéines, l’être humain produit plusieurs dizaines de milliers de protéines différentes.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Calcitonine et CGRP',
      content: [
        {
          type: 'p',
          text: 'Le gène *CALCA* est transcrit en un même pré-ARNm dans la thyroïde et dans certains neurones. Dans les cellules de la thyroïde, l’épissage conserve les exons 1 à 4 : l’ARNm code la **calcitonine** (hormone régulant la calcémie). Dans les neurones, l’exon 4 est éliminé et les exons 5 et 6 conservés : l’ARNm code le **CGRP** (neuropeptide vasodilatateur).',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Procaryotes',
      content: [
        { type: 'p', text: 'Les bactéries n’ont ni noyau ni introns (dans la très grande majorité des cas) : l’ARNm n’est pas épissé et sa traduction commence avant même la fin de sa transcription.' },
      ],
    },

    { type: 'h2', text: '4. La traduction : de l’ARNm à la protéine' },
    { type: 'h3', text: '4.1. Le code génétique' },
    {
      type: 'p',
      text: 'Il faut faire correspondre un alphabet de **4 nucléotides** à un alphabet de **20 acides aminés**. Un nucléotide ne permettrait de coder que $4$ acides aminés, deux nucléotides $4^2 = 16$ : c’est insuffisant. Avec trois nucléotides, on obtient $4^3 = 64$ combinaisons, ce qui suffit. Un **codon** est un triplet de nucléotides de l’ARNm.',
    },
    {
      type: 'table',
      headers: ['1ʳᵉ base', '2ᵉ base U', '2ᵉ base C', '2ᵉ base A', '2ᵉ base G', '3ᵉ base'],
      rows: codeRows,
      caption: 'Le code génétique (codons de l’ARNm).',
    },
    {
      type: 'list',
      items: [
        '**Univoque** : chaque codon correspond à un seul acide aminé (pas d’ambiguïté).',
        '**Redondant** (dégénéré) : la plupart des acides aminés sont codés par plusieurs codons (6 pour Leu, Ser, Arg ; 1 seul pour Met et Trp). Les codons synonymes diffèrent souvent par leur 3ᵉ base.',
        '**Universel** : il est le même chez presque tous les êtres vivants (bactéries, plantes, animaux), ce qui témoigne d’une **origine commune** du vivant et permet la **transgenèse** (une bactérie peut produire l’insuline humaine).',
        '**Codons particuliers** : AUG est le codon d’**initiation** (méthionine) ; UAA, UAG et UGA sont des codons **STOP**, qui ne codent aucun acide aminé et terminent la traduction.',
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Traduire une séquence',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Obtenir l’ARNm', text: 'À partir du brin transcrit : complémentaire (A→U, T→A, C→G, G→C). À partir du brin non transcrit : recopier en remplaçant T par U.' },
            { title: 'Trouver le cadre de lecture', text: 'Repérer le premier **AUG** en partant de l’extrémité 5′ ; découper en triplets à partir de là.' },
            { title: 'Traduire', text: 'Lire chaque codon dans le tableau du code génétique jusqu’au premier codon STOP (exclu).' },
          ],
        },
      ],
    },
    { type: 'h3', text: '4.2. Le déroulement de la traduction' },
    { type: 'svg', svg: svgTraduction, caption: 'Traduction d’un ARNm par un ribosome.', maxWidth: 680 },
    {
      type: 'steps',
      items: [
        { title: 'Initiation', text: 'Les deux sous-unités du **ribosome** s’assemblent sur l’ARNm au niveau du codon d’initiation **AUG** ; le premier acide aminé est toujours une méthionine.' },
        {
          title: 'Élongation',
          text: 'Le ribosome se déplace de codon en codon (sens 5′ → 3′). À chaque codon, l’acide aminé correspondant (apporté par un ARN de transfert) est lié au précédent par une **liaison peptidique** : la chaîne s’allonge.',
        },
        { title: 'Terminaison', text: 'Quand le ribosome atteint un codon **STOP**, il se dissocie et libère la chaîne polypeptidique.' },
      ],
    },
    {
      type: 'p',
      text: 'Plusieurs ribosomes traduisent simultanément le même ARNm, formant un **polysome** : de nombreuses copies de la protéine sont produites à partir d’un seul ARNm. Après la traduction, la chaîne se **replie** pour adopter sa forme fonctionnelle ; elle peut subir des modifications (retrait de la méthionine initiale, ajout de sucres…).',
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Preuve de l’universalité du code',
      content: [
        {
          type: 'p',
          text: 'En 1971, Gurdon et ses collaborateurs injectent de l’ARNm de globine de lapin dans des ovocytes de grenouille (xénope) : ceux-ci synthétisent de la **globine de lapin**. L’ARNm porte donc l’information de la séquence de la protéine, et la machinerie de traduction de la grenouille « lit » le même code que celle du lapin.',
        },
      ],
    },

    { type: 'h2', text: '5. Du génotype au phénotype' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Phénotype',
      content: [
        {
          type: 'p',
          text: 'Ensemble des **caractères observables** d’un individu. Il se définit à plusieurs **échelles** : **moléculaire** (les protéines produites), **cellulaire** (aspect et fonctionnement des cellules) et **macroscopique** (organisme). Le **génotype** est l’ensemble des allèles d’un individu.',
        },
      ],
    },
    { type: 'svg', svg: svgEchelles, caption: 'Le phénotype à différentes échelles.', maxWidth: 680 },
    {
      type: 'table',
      headers: ['Échelle', 'Albinisme (allèle muté du gène *TYR*)', 'Drépanocytose (allèle *HbS*)'],
      rows: [
        ['Moléculaire', 'tyrosinase non fonctionnelle : pas de synthèse de **mélanine**', 'hémoglobine S, qui polymérise en fibres quand O₂ manque'],
        ['Cellulaire', 'mélanocytes sans pigment', 'hématies déformées en faucille, rigides'],
        ['Organisme', 'peau et cheveux très clairs, troubles de la vision, grande sensibilité aux UV', 'anémie, crises douloureuses, atteinte d’organes'],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Relation génotype – phénotype',
      content: [
        {
          type: 'p',
          text: 'Les allèles d’un individu déterminent la **séquence** des protéines qu’il produit ; cette séquence détermine leur **forme** et leur **activité**, dont dépend le phénotype cellulaire puis macroscopique. Un phénotype dépend souvent de **plusieurs gènes** et d’un individu à l’autre, les cellules n’expriment pas les mêmes gènes selon le tissu.',
        },
      ],
    },

    { type: 'h2', text: '6. L’influence de l’environnement' },
    {
      type: 'p',
      text: 'Le phénotype ne dépend pas uniquement du génotype : des facteurs de l’environnement peuvent modifier l’activité des protéines ou l’expression des gènes.',
    },
    {
      type: 'grid',
      columns: 3,
      items: [
        {
          title: 'Lapin himalayen, chat siamois',
          text: 'Leur tyrosinase est codée par un allèle qui la rend **thermosensible** : inactive à la température du corps, active dans les extrémités plus froides (oreilles, museau, pattes, queue), qui sont pigmentées. Si l’on rase une zone du dos et qu’on la refroidit, les poils repoussent foncés.',
          icon: 'Thermometer',
        },
        {
          title: 'Phénylcétonurie',
          text: 'Maladie due à une enzyme (PAH) non fonctionnelle : la phénylalanine s’accumule et devient toxique pour le cerveau. Un **régime pauvre en phénylalanine** dès la naissance (après dépistage néonatal) permet d’éviter les troubles.',
          icon: 'Apple',
        },
        {
          title: 'Bronzage',
          text: 'Les **UV** stimulent la production de mélanine par les mélanocytes : la couleur de la peau change sans modification du génotype.',
          icon: 'Sun',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'À retenir',
      content: [{ type: 'p', text: 'Phénotype = résultat de l’**interaction entre le génotype et l’environnement**. Pour la drépanocytose, par exemple, la falciformation des hématies est déclenchée par un manque de dioxygène (effort intense, altitude, déshydratation).' }],
    },

    { type: 'h2', text: 'Bilan' },
    {
      type: 'p',
      text: 'L’information génétique d’un gène est d’abord **transcrite** en ARN dans le noyau par l’ARN polymérase, à partir du brin transcrit. Chez les eucaryotes, le pré-ARNm est **maturé** par épissage, éventuellement alternatif, ce qui permet à un gène de coder plusieurs protéines. L’ARNm est ensuite **traduit** dans le cytoplasme par les ribosomes selon le **code génétique**, universel et redondant. Les protéines produites, avec l’influence de l’environnement, déterminent le **phénotype** aux échelles moléculaire, cellulaire et de l’organisme.',
    },
  ],

  // =====================================================================
  exercices: [
    {
      id: 'svt3-ex1',
      title: 'Transcrire puis traduire',
      difficulty: 1,
      duration: 10,
      tags: ['transcription', 'traduction'],
      statement: [
        { type: 'p', text: 'Voici le **brin transcrit** d’un court gène : `3′ TAC CGT AAG TTT CCG ACT 5′`.' },
        {
          type: 'list',
          ordered: true,
          items: ['Écrire la séquence de l’ARNm.', 'Écrire la séquence du brin non transcrit.', 'Traduire l’ARNm à l’aide du code génétique.'],
        },
      ],
      hints: ['Face à A, l’ARN polymérase place U.', 'Le brin non transcrit a la même séquence que l’ARNm, avec T au lieu de U.'],
      solution: [
        { type: 'p', text: '1. ARNm (complémentaire du brin transcrit) : `5′ AUG GCA UUC AAA GGC UGA 3′`.' },
        { type: 'p', text: '2. Brin non transcrit : `5′ ATG GCA TTC AAA GGC TGA 3′`.' },
        { type: 'p', text: '3. AUG = Met, GCA = Ala, UUC = Phe, AAA = Lys, GGC = Gly, UGA = STOP → peptide **Met – Ala – Phe – Lys – Gly** (5 acides aminés).' },
      ],
    },
    {
      id: 'svt3-ex2',
      title: 'Trouver le cadre de lecture',
      difficulty: 1,
      duration: 10,
      tags: ['traduction', 'code génétique'],
      statement: [
        { type: 'p', text: 'Un ARNm a pour séquence : `5′ CCGAUGCAUGGCUUACCGAAGUGGUAAGC 3′`.' },
        { type: 'list', ordered: true, items: ['Repérer le codon d’initiation.', 'Traduire l’ARNm.', 'Combien de nucléotides de cet ARNm ne sont pas traduits ?'] },
      ],
      hints: ['Le cadre de lecture commence au premier AUG en partant de 5′.'],
      solution: [
        { type: 'p', text: '1. Le premier AUG commence au 4ᵉ nucléotide : CCG **AUG** CAU…' },
        { type: 'p', text: '2. AUG CAU GGC UUA CCG AAG UGG UAA → **Met – His – Gly – Leu – Pro – Lys – Trp**, puis STOP (UAA).' },
        {
          type: 'p',
          text: '3. L’ARNm compte 29 nucléotides. Les 7 codons traduits représentent 21 nucléotides et le codon STOP 3 nucléotides. Ne sont pas traduits : 3 nt en amont (CCG), le STOP (3 nt) et 2 nt en aval (GC), soit 8 nucléotides.',
        },
      ],
    },
    {
      id: 'svt3-ex3',
      title: 'Pourquoi un code à trois lettres ?',
      difficulty: 1,
      duration: 10,
      tags: ['raisonnement', 'code génétique'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Montrer par un calcul qu’un codon doit comporter au moins 3 nucléotides.',
            'Le code compte 64 codons, dont 3 STOP. Combien de codons codent des acides aminés ? Que peut-on en déduire ?',
            'Expliquer pourquoi l’universalité du code permet de faire produire de l’insuline humaine par une bactérie.',
          ],
        },
      ],
      solution: [
        { type: 'p', text: '1. Avec 4 nucléotides : codons de 1 nt → $4$ possibilités ; de 2 nt → $4^2 = 16$ ; de 3 nt → $4^3 = 64$. Il faut coder 20 acides aminés : il faut au moins 3 nucléotides par codon.' },
        { type: 'p', text: '2. $64 - 3 = 61$ codons codent 20 acides aminés : plusieurs codons codent un même acide aminé, le code est **redondant**.' },
        {
          type: 'p',
          text: '3. La bactérie lit les codons de la même façon que la cellule humaine. Si l’on introduit dans la bactérie la séquence codante du gène de l’insuline (sans introns), ses ribosomes traduisent l’ARNm en une chaîne d’acides aminés identique à celle de l’insuline humaine.',
        },
      ],
    },
    {
      id: 'svt3-ex4',
      title: 'Où l’ARN est-il fabriqué ?',
      difficulty: 2,
      duration: 15,
      tags: ['analyse de document', 'expérience'],
      statement: [
        {
          type: 'p',
          text: 'Des cellules sont placées 15 min dans un milieu contenant de l’uridine radioactive (nucléotide à uracile), puis transférées dans un milieu sans radioactivité. On mesure la radioactivité dans le noyau et dans le cytoplasme.',
        },
        {
          type: 'table',
          headers: ['Temps après le transfert', '0 min', '30 min', '90 min'],
          rows: [
            ['Radioactivité du noyau (%)', '95', '55', '20'],
            ['Radioactivité du cytoplasme (%)', '5', '45', '80'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Pourquoi utilise-t-on de l’uridine et non de la thymidine ?',
            'Analyser les résultats et conclure.',
            'Quel est l’intérêt d’un intermédiaire entre l’ADN et les ribosomes ?',
          ],
        },
      ],
      hints: ['L’uracile est une base propre à l’ARN.', 'Le transfert dans un milieu non radioactif permet de suivre le devenir des molécules marquées.'],
      solution: [
        { type: 'p', text: '1. L’uracile n’existe que dans l’ARN : l’uridine radioactive marque spécifiquement les ARN synthétisés pendant les 15 min, et non l’ADN.' },
        {
          type: 'p',
          text: '2. À 0 min, 95 % de la radioactivité est dans le noyau : l’ARN y est synthétisé. Ensuite, la radioactivité diminue dans le noyau (95 → 20 %) et augmente dans le cytoplasme (5 → 80 %) : les ARN marqués **migrent du noyau vers le cytoplasme**. L’ARN est donc fabriqué dans le noyau (transcription) puis exporté dans le cytoplasme où se trouvent les ribosomes.',
        },
        {
          type: 'p',
          text: '3. L’ADN, précieux, reste protégé dans le noyau ; l’ARNm, copie temporaire, transporte l’information vers les ribosomes. De nombreuses copies d’ARNm peuvent être produites à partir d’un gène, ce qui amplifie la production de protéines.',
        },
      ],
    },
    {
      id: 'svt3-ex5',
      title: 'Épissage alternatif',
      difficulty: 2,
      duration: 20,
      tags: ['épissage', 'raisonnement'],
      statement: [
        {
          type: 'p',
          text: 'Le gène *CALCA* comporte 6 exons. Dans la thyroïde, l’ARNm contient les exons 1-2-3-4 et code la calcitonine ; dans des neurones, il contient les exons 1-2-3-5-6 et code le CGRP.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Expliquer comment un même gène peut coder deux protéines différentes.',
            'Les deux protéines ont-elles une partie de séquence commune ? Justifier.',
            'Un autre gène possède 5 exons : les exons 1 et 5 sont toujours conservés, les exons 2, 3 et 4 peuvent chacun être conservés ou éliminés indépendamment. Combien d’ARNm différents ce gène peut-il produire ?',
          ],
        },
      ],
      hints: ['Chaque exon facultatif offre deux possibilités.'],
      solution: [
        {
          type: 'p',
          text: '1. Le gène est transcrit en un **même pré-ARNm** dans les deux types de cellules. Lors de la maturation, l’**épissage alternatif** conserve des exons différents selon le tissu : on obtient deux ARNm différents, traduits en deux protéines différentes.',
        },
        { type: 'p', text: '2. Oui : les exons 1, 2 et 3 sont communs aux deux ARNm. Les parties de protéine codées par ces exons sont donc identiques (le début des précurseurs protéiques).' },
        { type: 'p', text: '3. Chacun des 3 exons facultatifs est présent ou absent : $2 \\times 2 \\times 2 = 2^3 = 8$ ARNm différents possibles.' },
      ],
    },
    {
      id: 'svt3-ex6',
      title: 'Un ARNm de lapin dans un ovocyte de grenouille',
      difficulty: 2,
      duration: 15,
      tags: ['analyse de document', 'code génétique'],
      statement: [
        {
          type: 'p',
          text: 'Les ovocytes de xénope (grenouille) ne fabriquent jamais de globine. On injecte dans certains ovocytes de l’ARNm extrait de cellules productrices de globine de lapin ; d’autres reçoivent une injection de solution saline. Seuls les ovocytes ayant reçu l’ARNm produisent de la globine de lapin.',
        },
        {
          type: 'list',
          ordered: true,
          items: ['Quel est le rôle des ovocytes injectés avec la solution saline ?', 'Quelles conclusions peut-on tirer de cette expérience ?'],
        },
      ],
      solution: [
        { type: 'p', text: '1. Ce sont des **témoins** : ils montrent que l’injection elle-même ne déclenche pas la production de globine.' },
        {
          type: 'list',
          items: [
            'L’**ARNm** porte l’information nécessaire à la synthèse de la protéine : c’est bien l’intermédiaire entre gène et protéine.',
            'La machinerie de traduction de la grenouille (ribosomes…) traduit l’ARNm de lapin en la **même protéine** que dans les cellules de lapin : le code génétique est le même chez ces deux espèces, argument en faveur de son **universalité**.',
          ],
        },
      ],
    },
    {
      id: 'svt3-ex7',
      title: 'L’albinisme : du gène au phénotype',
      difficulty: 2,
      duration: 20,
      tags: ['phénotype', 'analyse de document'],
      statement: [
        {
          type: 'p',
          text: 'La mélanine, pigment de la peau, des cheveux et de l’iris, est produite dans les mélanocytes à partir de la tyrosine, grâce à une enzyme : la **tyrosinase**, codée par le gène *TYR*. Chez une personne atteinte d’albinisme (type OCA1), le brin non transcrit de *TYR* présente, dans la première partie du gène, une substitution qui transforme un codon TGG en TAG.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Déterminer la conséquence de cette mutation sur la tyrosinase (UGG = Trp, UAG = STOP).',
            'Décrire le phénotype de cette personne aux échelles moléculaire, cellulaire et de l’organisme.',
            'Pourquoi une personne albinos doit-elle se protéger particulièrement du soleil ?',
          ],
        },
      ],
      hints: ['La mélanine absorbe les UV.'],
      solution: [
        {
          type: 'p',
          text: '1. Le codon UGG (Trp) devient UAG, codon **STOP** : c’est une mutation **non-sens**. La traduction s’arrête prématurément à ce codon : la tyrosinase est **tronquée** (il lui manque une grande partie de ses quelque 530 acides aminés) et donc non fonctionnelle.',
        },
        {
          type: 'list',
          items: [
            '**Moléculaire** : tyrosinase inactive → pas de transformation de la tyrosine → pas de mélanine.',
            '**Cellulaire** : les mélanocytes sont présents mais ne contiennent pas de pigment.',
            '**Organisme** : peau et cheveux très clairs, iris peu pigmentés, troubles de la vision.',
          ],
        },
        { type: 'p', text: '3. La mélanine absorbe une partie des UV et protège l’ADN des cellules de la peau. Sans mélanine, les UV provoquent plus de lésions de l’ADN : risque accru de coups de soleil et de cancers de la peau.' },
      ],
    },
    {
      id: 'svt3-ex8',
      title: 'Le pelage du lapin himalayen',
      difficulty: 3,
      duration: 25,
      tags: ['type bac', 'environnement', 'analyse de document'],
      statement: [
        {
          type: 'p',
          text: 'Le lapin himalayen a un pelage blanc, sauf aux extrémités (oreilles, museau, pattes, queue) qui sont noires. Ces extrémités sont plus froides (≈ 30 °C) que le reste du corps (≈ 38 °C).',
        },
        {
          type: 'list',
          items: [
            'Document 1 : on rase une zone du dos et on y maintient une poche de glace pendant la repousse : les poils repoussent **noirs**. Sur un lapin témoin rasé sans glace, ils repoussent blancs.',
            'Document 2 : activité de la tyrosinase extraite de lapins himalayens et de lapins noirs, mesurée in vitro.',
          ],
        },
        {
          type: 'table',
          headers: ['Température (°C)', '25', '30', '35', '38'],
          rows: [
            ['Tyrosinase du lapin noir (% activité max.)', '70', '85', '95', '100'],
            ['Tyrosinase du lapin himalayen (% activité max.)', '90', '75', '10', '2'],
          ],
          caption: 'Données simplifiées à but pédagogique.',
        },
        {
          type: 'p',
          text: 'Expliquer, à partir de l’ensemble des documents, la répartition des couleurs du pelage du lapin himalayen et montrer que le phénotype dépend à la fois du génotype et de l’environnement.',
        },
      ],
      hints: [
        'Comparez les deux enzymes à 30 °C puis à 38 °C.',
        'Le document 1 permet d’isoler l’effet de la température sur un même individu.',
      ],
      solution: [
        {
          type: 'p',
          text: '**Document 2** : la tyrosinase du lapin noir est active à toutes les températures testées (70 à 100 %). Celle du lapin himalayen est active à basse température (90 % à 25 °C, 75 % à 30 °C) mais presque inactive au-dessus de 35 °C (2 % à 38 °C) : elle est **thermosensible**. Les deux lapins possèdent donc des **allèles différents** du gène de la tyrosinase, codant des enzymes de séquences différentes.',
        },
        {
          type: 'p',
          text: '**Explication du pelage** : à 38 °C (corps), la tyrosinase himalayenne est inactive : pas de mélanine, les poils sont blancs. Aux extrémités (≈ 30 °C), elle est active : la mélanine est produite, les poils sont noirs.',
        },
        {
          type: 'p',
          text: '**Document 1** : en refroidissant la peau du dos, on rend la tyrosinase active : les poils repoussent noirs, sans changement du génotype. Le témoin prouve que ce n’est pas le rasage qui change la couleur.',
        },
        {
          type: 'p',
          text: '**Conclusion** : le phénotype « pelage » résulte de l’**interaction entre le génotype** (un allèle codant une tyrosinase thermosensible) **et l’environnement** (la température locale de la peau). Un même génotype peut produire des phénotypes différents selon les conditions.',
        },
      ],
    },
    {
      id: 'svt3-ex9',
      title: 'La phénylcétonurie : gène, enzyme et alimentation',
      difficulty: 3,
      duration: 30,
      tags: ['type bac', 'synthèse', 'environnement'],
      statement: [
        {
          type: 'p',
          text: 'La phénylalanine hydroxylase (PAH), enzyme du foie, transforme la phénylalanine (acide aminé apporté par l’alimentation) en tyrosine. Chez les personnes atteintes de **phénylcétonurie** (environ 1 naissance sur 17 000 en France), les deux allèles du gène *PAH* sont mutés et l’enzyme est inactive : la phénylalanine s’accumule dans le sang et provoque, sans traitement, un retard mental sévère. Depuis les années 1970, tous les nouveau-nés sont dépistés en France ; les enfants malades suivent un régime pauvre en phénylalanine et se développent normalement.',
        },
        {
          type: 'p',
          text: 'Rédiger une synthèse expliquant comment des allèles mutés du gène *PAH* conduisent au phénotype « phénylcétonurie » (de l’ADN au phénotype), puis comment l’environnement peut modifier ce phénotype.',
        },
      ],
      hints: [
        'Structurez : I. Expression du gène PAH — II. Phénotype aux trois échelles — III. Rôle de l’environnement.',
      ],
      solution: [
        { type: 'h3', text: 'I. De l’allèle à l’enzyme' },
        {
          type: 'p',
          text: 'Dans les cellules du foie, le gène *PAH* est **transcrit** en pré-ARNm dans le noyau par l’ARN polymérase, puis **maturé** par épissage. L’ARNm migre dans le cytoplasme où il est **traduit** par les ribosomes selon le code génétique. Chez le malade, les allèles portent des mutations (faux-sens, non-sens, décalage…) qui modifient la séquence des acides aminés de l’enzyme, donc sa forme : elle est inactive.',
        },
        { type: 'h3', text: 'II. Le phénotype aux différentes échelles' },
        {
          type: 'list',
          items: [
            '**Moléculaire** : PAH inactive ; la phénylalanine n’est pas transformée en tyrosine.',
            '**Cellulaire** : les hépatocytes ne dégradent plus la phénylalanine, qui s’accumule dans le sang et perturbe le fonctionnement des neurones en développement.',
            '**Organisme** : sans traitement, retard mental sévère.',
          ],
        },
        { type: 'h3', text: 'III. L’influence de l’environnement' },
        {
          type: 'p',
          text: 'La phénylalanine provient de l’**alimentation**. Un régime pauvre en phénylalanine, mis en place dès le dépistage néonatal, empêche son accumulation : l’enfant malade (génotype inchangé) ne développe pas les troubles neurologiques. Le phénotype dépend donc à la fois du génotype et d’un facteur de l’environnement, ce qui justifie le dépistage systématique.',
        },
      ],
    },
  ],

  // =====================================================================
  representations: [
    {
      type: 'widget',
      id: 'dna-transcription',
      props: { dna: 'TACGGTCAAACCGAGATT' },
      title: 'De l’ADN à la protéine',
      caption: 'Observez la transcription en ARNm, le découpage en codons et la traduction. Modifiez la séquence pour tester le code génétique.',
    },
    { type: 'svg', svg: svgFlux, caption: 'Transcription dans le noyau, traduction dans le cytoplasme.', maxWidth: 680 },
    { type: 'svg', svg: svgEpissage, caption: 'Épissage alternatif : un gène, plusieurs protéines.', maxWidth: 680 },
    {
      type: 'ordering',
      title: 'Ordonner les étapes de l’expression d’un gène eucaryote',
      items: [
        'Fixation de l’ARN polymérase sur l’ADN',
        'Synthèse du pré-ARNm complémentaire du brin transcrit',
        'Épissage : élimination des introns',
        'Sortie de l’ARNm par les pores nucléaires',
        'Fixation du ribosome au niveau du codon AUG',
        'Allongement de la chaîne d’acides aminés',
        'Arrivée sur un codon STOP et libération de la protéine',
      ],
    },
    {
      type: 'matching',
      title: 'Associer',
      pairs: [
        { left: 'ARN polymérase', right: 'transcription' },
        { left: 'Ribosome', right: 'traduction' },
        { left: 'Intron', right: 'séquence éliminée lors de l’épissage' },
        { left: 'Codon', right: 'triplet de nucléotides de l’ARNm' },
        { left: 'AUG', right: 'codon d’initiation (Met)' },
        { left: 'UGA', right: 'codon STOP' },
      ],
    },
    {
      type: 'qcm',
      questions: [
        {
          question: 'L’ARNm a la même séquence que :',
          choices: ['le brin transcrit', 'le brin non transcrit (T remplacé par U)', 'les deux brins', 'aucun des brins'],
          answer: 1,
        },
        {
          question: 'Chez un eucaryote, la traduction a lieu :',
          choices: ['dans le noyau', 'dans le cytoplasme', 'dans les chromosomes', 'dans la membrane nucléaire'],
          answer: 1,
        },
        {
          question: 'Le code génétique est dit redondant car :',
          choices: [
            'un codon code plusieurs acides aminés',
            'plusieurs codons peuvent coder le même acide aminé',
            'il est identique chez tous les êtres vivants',
            'il comporte trois codons STOP',
          ],
          answer: 1,
        },
        {
          question: 'Combien d’acides aminés compte le peptide codé par l’ARNm AUG UUU GGC UAA ?',
          choices: ['2', '3', '4', '12'],
          answer: 1,
          explanation: 'Met – Phe – Gly, puis STOP (UAA ne code aucun acide aminé).',
        },
        {
          question: 'L’épissage alternatif permet :',
          choices: ['de corriger les mutations', 'd’obtenir plusieurs protéines à partir d’un seul gène', 'de répliquer l’ADN', 'de traduire les introns'],
          answer: 1,
        },
        {
          question: 'Face à un A du brin transcrit, l’ARN polymérase place :',
          choices: ['T', 'U', 'A', 'G'],
          answer: 1,
        },
        {
          question: 'Le pelage du lapin himalayen montre que :',
          choices: [
            'le phénotype ne dépend que du génotype',
            'la température peut modifier le phénotype',
            'la température modifie le génotype',
            'la tyrosinase est absente',
          ],
          answer: 1,
        },
        {
          question: 'Le phénotype moléculaire d’un individu correspond :',
          choices: ['à ses allèles', 'aux protéines qu’il produit', 'à son aspect extérieur', 'à son caryotype'],
          answer: 1,
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Transcription', back: 'Synthèse d’un ARN complémentaire du brin transcrit de l’ADN, par l’ARN polymérase (noyau).' },
        { front: 'Différences ARN / ADN', back: 'Ribose, uracile, simple brin, courte durée de vie.' },
        { front: 'Pré-ARNm', back: 'Copie complète du gène (exons + introns) avant maturation.' },
        { front: 'Épissage', back: 'Élimination des introns et raccordement des exons.' },
        { front: 'Épissage alternatif', back: 'Différentes combinaisons d’exons → plusieurs ARNm et protéines pour un gène.' },
        { front: 'Codon', back: 'Triplet de nucléotides de l’ARNm correspondant à un acide aminé ou à un STOP.' },
        { front: 'Codon d’initiation', back: 'AUG (méthionine).' },
        { front: 'Codons STOP', back: 'UAA, UAG, UGA.' },
        { front: 'Propriétés du code', back: 'Univoque, redondant, universel, lu par triplets sans chevauchement.' },
        { front: 'Ribosome', back: 'Structure cytoplasmique qui traduit l’ARNm en chaîne d’acides aminés.' },
        { front: 'Polysome', back: 'Plusieurs ribosomes traduisant simultanément un même ARNm.' },
        { front: 'Phénotype', back: 'Caractères observables aux échelles moléculaire, cellulaire et de l’organisme.' },
        { front: 'Génotype', back: 'Ensemble des allèles d’un individu.' },
        { front: 'Lapin himalayen', back: 'Tyrosinase thermosensible : extrémités froides pigmentées → influence de l’environnement.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter le bilan',
      text: 'Dans le noyau, l’{{ARN polymérase}} synthétise un ARN complémentaire du brin {{transcrit}}. Chez les eucaryotes, ce pré-ARNm subit un {{épissage}} qui élimine les {{introns}}. L’ARNm est traduit dans le {{cytoplasme}} par les {{ribosomes}}. Chaque {{codon}} de trois nucléotides correspond à un {{acide aminé}}. La traduction commence au codon {{AUG}} et s’arrête à un codon {{STOP}}.',
    },
    {
      type: 'truefalse',
      statements: [
        { text: 'Les deux brins d’un gène sont transcrits.', answer: false, explanation: 'Un seul brin, le brin transcrit, sert de matrice.' },
        { text: 'Le code génétique est quasi universel.', answer: true, explanation: 'Ce qui permet la transgenèse et témoigne d’une origine commune.' },
        { text: 'Un ARNm mature contient les introns.', answer: false, explanation: 'Les introns sont éliminés lors de l’épissage.' },
        { text: 'Toutes les cellules d’un individu expriment les mêmes gènes.', answer: false, explanation: 'Elles ont les mêmes gènes, mais n’expriment pas les mêmes selon leur type.' },
        { text: 'Le codon STOP correspond à un acide aminé particulier.', answer: false, explanation: 'Il ne code aucun acide aminé : il marque la fin de la traduction.' },
      ],
    },
  ],
}

export default chapter
