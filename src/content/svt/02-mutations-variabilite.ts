import type { Chapter } from '../types'

const F = 'font-family="Geist, sans-serif"'
const BLUE = 'hsl(217 91% 60%)'
const RED = 'hsl(0 84% 60%)'
const GREEN = 'hsl(142 71% 45%)'
const ORANGE = 'hsl(25 95% 53%)'

/** Rangée de nucléotides dans des cases ; `hl` = indices surlignés, `col` = couleur. */
const seq = (x: number, y: number, s: string, hl: number[] = [], col = RED) =>
  s
    .split('')
    .map((c, i) => {
      const cx = x + i * 18
      if (c === ' ') return ''
      const h = hl.includes(i)
      return `<rect x="${cx}" y="${y}" width="16" height="20" fill="${h ? col : 'none'}" fill-opacity="${h ? 0.3 : 0}" stroke="${h ? col : 'currentColor'}" stroke-width="1"/><text x="${cx + 8}" y="${y + 14}" text-anchor="middle" font-size="11" fill="currentColor">${c}</text>`
    })
    .join('')

const svgTypes = `<svg viewBox="0 0 560 250" width="100%" xmlns="http://www.w3.org/2000/svg" ${F}>
  <g font-size="12" fill="currentColor" font-weight="600">
    <text x="10" y="34">Référence</text>
    <text x="10" y="94">Substitution</text>
    <text x="10" y="154">Insertion</text>
    <text x="10" y="214">Délétion</text>
  </g>
  ${seq(110, 20, 'ATG GCA TTC AAA')}
  ${seq(110, 80, 'ATG GCA TAC AAA', [9])}
  ${seq(110, 140, 'ATG GCA TGTC AAA', [9], GREEN)}
  ${seq(110, 200, 'ATG GCA TC AAA', [], ORANGE)}
  <path d="M245 222 v-6" stroke="${ORANGE}" stroke-width="2"/>
  <g font-size="11" fill="currentColor" class="svg-muted">
    <text x="412" y="34">Met-Ala-Phe-Lys</text>
    <text x="412" y="94">Met-Ala-Tyr-Lys</text>
    <text x="412" y="108">(T → A : faux-sens)</text>
    <text x="412" y="154">Met-Ala-Cys-Gln…</text>
    <text x="412" y="168">(+1 nt : décalage)</text>
    <text x="412" y="214">Met-Ala-Ser…</text>
    <text x="412" y="228">(−1 nt : décalage)</text>
  </g>
</svg>`

const svgUV = `<svg viewBox="0 0 460 200" width="100%" xmlns="http://www.w3.org/2000/svg" ${F}>
  <g stroke="${BLUE}" stroke-width="4"><line x1="40" y1="60" x2="420" y2="60"/><line x1="40" y1="150" x2="420" y2="150"/></g>
  <g font-size="12" fill="currentColor" text-anchor="middle">
    <text x="80" y="84">A</text><text x="140" y="84">C</text><text x="200" y="84" font-weight="700">T</text><text x="260" y="84" font-weight="700">T</text><text x="320" y="84">G</text><text x="380" y="84">A</text>
    <text x="80" y="136">T</text><text x="140" y="136">G</text><text x="200" y="136">A</text><text x="260" y="136">A</text><text x="320" y="136">C</text><text x="380" y="136">T</text>
  </g>
  <g stroke="currentColor" stroke-dasharray="2 3" class="svg-muted"><line x1="80" y1="90" x2="80" y2="122"/><line x1="140" y1="90" x2="140" y2="122"/><line x1="320" y1="90" x2="320" y2="122"/><line x1="380" y1="90" x2="380" y2="122"/></g>
  <rect x="186" y="68" width="88" height="24" fill="${RED}" fill-opacity="0.2" stroke="${RED}"/>
  <path d="M206 80 H254" stroke="${RED}" stroke-width="3"/>
  <g stroke="${ORANGE}" stroke-width="2" fill="none"><path d="M190 10 l10 10 l-6 2 l12 14"/><path d="M250 10 l10 10 l-6 2 l12 14"/></g>
  <text x="290" y="24" font-size="12" fill="currentColor">UV</text>
  <text x="230" y="180" text-anchor="middle" font-size="12" fill="currentColor">dimère de thymines : liaison anormale entre deux T voisines</text>
  <text x="230" y="196" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">déformation de la double hélice, appariement impossible avec A</text>
</svg>`

const node = (x: number, y: number, mut: boolean) =>
  `<circle cx="${x}" cy="${y}" r="9" fill="${mut ? RED : 'none'}" fill-opacity="${mut ? 0.6 : 0}" stroke="${mut ? RED : 'currentColor'}" stroke-width="1.5"/>`

const svgSomaGerm = `<svg viewBox="0 0 560 250" width="100%" xmlns="http://www.w3.org/2000/svg" ${F}>
  <text x="140" y="20" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">Mutation somatique</text>
  <text x="420" y="20" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">Mutation germinale</text>
  <g stroke="currentColor" stroke-width="1" fill="none">
    <path d="M140 50 L80 100 M140 50 L200 100 M80 100 L50 150 M80 100 L110 150 M200 100 L170 150 M200 100 L230 150"/>
    <path d="M420 50 L360 100 M420 50 L480 100 M360 100 L330 150 M360 100 L390 150 M480 100 L450 150 M480 100 L510 150"/>
  </g>
  ${node(140, 50, false)}${node(80, 100, false)}${node(200, 100, true)}${node(50, 150, false)}${node(110, 150, false)}${node(170, 150, true)}${node(230, 150, true)}
  ${node(420, 50, false)}${node(360, 100, false)}${node(480, 100, false)}${node(330, 150, false)}${node(390, 150, false)}${node(450, 150, false)}
  <rect x="501" y="141" width="18" height="18" fill="${RED}" fill-opacity="0.6" stroke="${RED}"/>
  <path d="M510 165 V190" stroke="currentColor"/><path d="M510 190 l-4 -7 h8 z" fill="currentColor"/>
  <text x="510" y="208" text-anchor="middle" font-size="11" fill="currentColor">gamète muté</text>
  <text x="510" y="222" text-anchor="middle" font-size="11" fill="currentColor">→ descendant :</text>
  <text x="510" y="236" text-anchor="middle" font-size="11" fill="currentColor">toutes ses cellules</text>
  <text x="140" y="185" text-anchor="middle" font-size="11" fill="currentColor">sous-clone muté dans l’individu</text>
  <text x="140" y="200" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">non transmis à la descendance</text>
  <text x="140" y="215" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">(ex. cancer de la peau)</text>
  <text x="360" y="200" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">lignée germinale</text>
  <text x="360" y="214" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">(ovaires, testicules)</text>
</svg>`

const svgDevenir = `<svg viewBox="0 0 560 210" width="100%" xmlns="http://www.w3.org/2000/svg" ${F}>
  <rect x="200" y="10" width="160" height="34" fill="none" stroke="currentColor"/>
  <text x="280" y="32" text-anchor="middle" font-size="12" fill="currentColor">Lésion / erreur de l’ADN</text>
  <g stroke="currentColor" fill="none"><path d="M280 44 V60 H100 V80 M280 60 H280 V80 M280 60 H460 V80"/></g>
  <rect x="20" y="80" width="160" height="50" fill="${GREEN}" fill-opacity="0.15" stroke="${GREEN}"/>
  <text x="100" y="101" text-anchor="middle" font-size="12" fill="currentColor">Réparation</text>
  <text x="100" y="118" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">ADN restauré (cas majoritaire)</text>
  <rect x="200" y="80" width="160" height="50" fill="${RED}" fill-opacity="0.15" stroke="${RED}"/>
  <text x="280" y="101" text-anchor="middle" font-size="12" fill="currentColor">Non réparée</text>
  <text x="280" y="118" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">→ mutation à la réplication</text>
  <rect x="380" y="80" width="160" height="50" fill="${ORANGE}" fill-opacity="0.15" stroke="${ORANGE}"/>
  <text x="460" y="101" text-anchor="middle" font-size="12" fill="currentColor">Trop de lésions</text>
  <text x="460" y="118" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">→ mort de la cellule</text>
  <path d="M280 130 V150" stroke="currentColor"/>
  <rect x="160" y="150" width="240" height="44" fill="none" stroke="currentColor"/>
  <text x="280" y="169" text-anchor="middle" font-size="12" fill="currentColor">Transmise aux cellules filles</text>
  <text x="280" y="185" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">(nouvel allèle, sous-clone)</text>
</svg>`

const chapter: Chapter = {
  id: 'mutations-variabilite',
  subject: 'svt',
  order: 2,
  title: 'Mutations de l’ADN et variabilité génétique',
  theme: 'Transmission, variation et expression du patrimoine génétique',
  summary:
    'Les mutations, spontanées ou induites par des agents mutagènes, modifient la séquence de l’ADN ; non réparées, elles créent de nouveaux allèles, source de la variabilité génétique.',
  duration: '2 semaines',
  objectives: [
    'Savoir que des erreurs spontanées surviennent lors de la réplication et que leur fréquence est augmentée par des agents mutagènes.',
    'Décrire les différents types de mutations ponctuelles (substitution, insertion, délétion) et leurs conséquences possibles sur la protéine.',
    'Expliquer le rôle des systèmes de réparation de l’ADN et les conséquences de leur défaillance.',
    'Distinguer mutations somatiques et mutations germinales et leurs conséquences.',
    'Relier mutations et apparition de nouveaux allèles ; définir le polyallélisme.',
    'Exploiter des données expérimentales (levures irradiées, séquences) pour mettre en évidence l’action d’un mutagène.',
  ],
  keywords: ['mutation', 'mutagène', 'UV', 'substitution', 'délétion', 'insertion', 'réparation', 'somatique', 'germinale', 'allèle', 'polyallélisme'],

  // =====================================================================
  fiche: [
    { type: 'h2', text: 'Qu’est-ce qu’une mutation ?' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Mutation',
      content: [
        {
          type: 'p',
          text: 'Modification **rare**, **aléatoire** et **héréditaire** (transmise aux cellules filles) de la **séquence** des nucléotides de l’ADN. Elle crée un nouvel **allèle**.',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Origine', 'Mécanisme', 'Exemples'],
      rows: [
        ['**Spontanée**', 'erreur de l’ADN polymérase non corrigée, instabilité chimique', '≈ 1 erreur / 10⁵ nt avant correction, 1 / 10⁹–10¹⁰ après'],
        ['**Induite**', 'agent **mutagène** qui augmente la fréquence des mutations', 'UV (dimères de thymines), rayons X et γ, benzo[a]pyrène (tabac)'],
      ],
    },
    { type: 'h2', text: 'Types et conséquences' },
    {
      type: 'table',
      headers: ['Mutation', 'Effet sur la séquence', 'Effet possible sur la protéine'],
      rows: [
        ['Substitution', '1 nucléotide remplacé', '**silencieuse** (même aa), **faux-sens** (aa différent), **non-sens** (codon STOP)'],
        ['Insertion / délétion', '+1 / −1 nucléotide (ou plusieurs)', '**décalage du cadre de lecture** si le nombre n’est pas multiple de 3 → protéine très modifiée'],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Réparation',
      content: [
        {
          type: 'p',
          text: 'La cellule possède des **systèmes enzymatiques de réparation**. Une lésion **non réparée** avant la réplication devient une mutation. Si les lésions sont trop nombreuses, la cellule meurt. Un défaut de réparation (ex. **xeroderma pigmentosum**) augmente fortement le risque de cancer.',
        },
      ],
    },
    { type: 'h2', text: 'Somatique ou germinale ?' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Somatique', value: 'dans une cellule du corps → transmise au **sous-clone** issu de cette cellule, **non transmise** à la descendance (ex. cancers).' },
        { key: 'Germinale', value: 'dans la lignée germinale → présente dans des **gamètes** → transmise à la descendance (présente dans toutes ses cellules).' },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Allèles et polyallélisme',
      content: [
        {
          type: 'p',
          text: 'Un **allèle** est une version d’un gène. Les mutations germinales accumulées au fil des générations expliquent qu’un gène puisse exister sous **de nombreux allèles** dans une population : c’est le **polyallélisme** (ex. système ABO : allèles A, B, O ; gène *CFTR* : plus de 2 000 allèles connus). C’est la base de la **biodiversité génétique**.',
        },
      ],
    },
  ],

  // =====================================================================
  cours: [
    { type: 'h2', text: 'Introduction' },
    {
      type: 'p',
      text: 'La réplication de l’ADN est remarquablement fidèle, mais pas parfaite. Par ailleurs, l’ADN subit en permanence des agressions (rayonnements, substances chimiques). Les modifications de séquence qui en résultent, les **mutations**, sont à l’origine de la **diversité des allèles** et donc de la variabilité génétique des individus… mais aussi de maladies comme les cancers.',
    },

    { type: 'h2', text: '1. Les mutations : des modifications de la séquence de l’ADN' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Mutation',
      content: [
        {
          type: 'p',
          text: 'Une **mutation** est une modification de la **séquence des nucléotides** d’une molécule d’ADN. Elle est **héréditaire** : une fois installée, elle est recopiée à chaque réplication et transmise à toutes les cellules issues de la cellule mutée.',
        },
      ],
    },
    {
      type: 'list',
      items: [
        '**Rare** : la probabilité qu’un nucléotide donné mute à chaque division est très faible.',
        '**Aléatoire** : elle peut toucher n’importe quelle région de l’ADN ; elle ne survient pas « pour » répondre à un besoin.',
        '**Ponctuelle** (au programme de Première) : elle ne concerne qu’un ou quelques nucléotides.',
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Gène et allèle',
      content: [
        {
          type: 'p',
          text: 'Un **gène** est une portion d’ADN, située à un emplacement précis (**locus**) d’un chromosome, qui contient l’information nécessaire à la synthèse d’une protéine (ou d’un ARN). Un **allèle** est l’une des versions possibles d’un gène, qui diffère des autres par sa séquence. Une mutation dans un gène crée donc un **nouvel allèle**.',
        },
      ],
    },

    { type: 'h2', text: '2. L’origine des mutations' },
    { type: 'h3', text: '2.1. Les mutations spontanées : erreurs de réplication' },
    {
      type: 'p',
      text: 'L’ADN polymérase incorpore parfois un nucléotide non complémentaire du brin matrice (environ **1 erreur pour $10^5$ nucléotides**). La plupart de ces erreurs sont aussitôt corrigées par l’activité de relecture de l’enzyme, puis par des systèmes de réparation des mésappariements. Le taux final est de l’ordre de **1 pour $10^9$ à $10^{10}$** nucléotides par réplication.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Ordre de grandeur',
      content: [
        {
          type: 'p',
          text: 'Une cellule humaine diploïde contient environ $6{,}4 \\times 10^9$ paires de bases. Avec un taux de $10^{-9}$ par nucléotide, chaque réplication introduit en moyenne $6{,}4 \\times 10^9 \\times 10^{-9} \\approx 6$ mutations. Rapporté aux milliards de divisions qui ont lieu dans un organisme, le nombre total de mutations est considérable… même si la plupart touchent des régions sans effet.',
        },
      ],
    },
    {
      type: 'p',
      text: 'D’autres mutations spontanées résultent de l’**instabilité chimique** de l’ADN (par exemple, perte spontanée de bases ou transformation d’une cytosine en une autre base) ou de l’action de molécules produites par le métabolisme cellulaire lui-même (espèces réactives de l’oxygène).',
    },
    { type: 'h3', text: '2.2. Les mutations induites : les agents mutagènes' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Agent mutagène',
      content: [
        { type: 'p', text: 'Facteur physique ou chimique qui **augmente la fréquence** des mutations (il ne crée pas de « nouveaux types » de mutations, mais les rend plus nombreuses).' },
      ],
    },
    {
      type: 'table',
      headers: ['Type', 'Agent', 'Action sur l’ADN'],
      rows: [
        ['Physique', '**Rayons ultraviolets** (UV-B surtout)', 'formation de **dimères de pyrimidines** (deux T voisines liées)'],
        ['Physique', 'Rayons X, rayonnements γ (radioactivité)', 'cassures des brins d’ADN, altération des bases'],
        ['Chimique', 'Benzo[a]pyrène (fumée de tabac, grillades)', 'se fixe sur les guanines → erreurs de réplication'],
        ['Chimique', 'Certains colorants, aflatoxines, gaz moutarde…', 'modification chimique des bases'],
      ],
    },
    { type: 'svg', svg: svgUV, caption: 'Les UV provoquent la formation de dimères de thymines.', maxWidth: 560 },
    { type: 'h3', text: '2.3. Mettre en évidence l’effet d’un mutagène : l’expérience des levures' },
    {
      type: 'p',
      text: 'On utilise une souche de levures *Saccharomyces cerevisiae* dite **ade2**, porteuse d’une mutation du gène *ADE2* qui bloque la synthèse de l’adénine : un pigment s’accumule et les colonies sont **rouges**. Une nouvelle mutation dans un gène situé **plus en amont** dans la même chaîne de synthèse empêche la formation du pigment : la colonie devient **blanche**.',
    },
    {
      type: 'steps',
      items: [
        { title: 'Protocole', text: 'Des boîtes ensemencées avec le même nombre de levures sont exposées aux UV pendant des durées croissantes (0 s = témoin), puis incubées.' },
        { title: 'Observation 1', text: 'Le **nombre total de colonies diminue** avec la durée d’exposition : les UV provoquent des lésions trop nombreuses qui tuent certaines cellules.' },
        { title: 'Observation 2', text: 'La **proportion de colonies blanches** (mutantes) **augmente** avec la durée d’exposition, alors qu’elle est quasi nulle chez le témoin.' },
        { title: 'Conclusion', text: 'Les UV sont un agent **mutagène** : ils augmentent la fréquence des mutations. Chaque colonie blanche est un **clone** issu d’une cellule mutée.' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Le témoin est indispensable',
      content: [
        { type: 'p', text: 'Sans la boîte non exposée, on ne pourrait pas distinguer les mutations induites par les UV des mutations spontanées. Le témoin montre que les mutations spontanées sont très rares.' },
      ],
    },

    { type: 'h2', text: '3. Les systèmes de réparation de l’ADN' },
    {
      type: 'p',
      text: 'Les cellules disposent de **nombreux systèmes enzymatiques** qui détectent et réparent les lésions de l’ADN : correction des mésappariements après réplication, excision du fragment de brin portant une lésion (par exemple un dimère de thymines) puis resynthèse à partir du brin complémentaire intact, réparation des cassures…',
    },
    { type: 'svg', svg: svgDevenir, caption: 'Devenir d’une lésion de l’ADN.', maxWidth: 640 },
    {
      type: 'callout',
      variant: 'property',
      title: 'Lésion ≠ mutation',
      content: [
        {
          type: 'p',
          text: 'Une **lésion** (dimère, base modifiée) n’est pas encore une mutation : elle le devient si elle n’est **pas réparée avant la réplication**, la séquence modifiée étant alors recopiée et transmise aux cellules filles. L’efficacité de la réparation explique la rareté des mutations.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Xeroderma pigmentosum',
      content: [
        {
          type: 'p',
          text: 'Maladie génétique rare due à une déficience d’un système de réparation des lésions causées par les UV. Les malades (« enfants de la Lune ») développent des **cancers de la peau** dès l’enfance, avec un risque multiplié par plus de 1 000 par rapport à la population générale, s’ils ne sont pas strictement protégés de la lumière solaire. Cette maladie démontre le rôle protecteur des systèmes de réparation.',
        },
      ],
    },

    { type: 'h2', text: '4. Les différents types de mutations ponctuelles' },
    { type: 'svg', svg: svgTypes, caption: 'Trois types de mutations ponctuelles sur le brin non transcrit (codant) et effet sur la séquence d’acides aminés.', maxWidth: 680 },
    {
      type: 'list',
      items: [
        '**Substitution** : un nucléotide est remplacé par un autre.',
        '**Insertion** (ou addition) : un ou plusieurs nucléotides sont ajoutés.',
        '**Délétion** : un ou plusieurs nucléotides sont supprimés.',
      ],
    },
    { type: 'h3', text: 'Conséquences sur la protéine' },
    {
      type: 'p',
      text: 'Le code génétique associe à chaque triplet de nucléotides (**codon**) un acide aminé (chapitre suivant). Une mutation dans un gène peut donc modifier la protéine codée, selon le cas :',
    },
    {
      type: 'table',
      headers: ['Conséquence', 'Mutation', 'Effet', 'Exemple (brin codant)'],
      rows: [
        ['**Silencieuse** (synonyme)', 'substitution', 'même acide aminé (code redondant)', 'GCA → GCG : Ala → Ala'],
        ['**Faux-sens**', 'substitution', 'un acide aminé remplacé par un autre', 'GAG → GTG : Glu → Val (drépanocytose)'],
        ['**Non-sens**', 'substitution', 'apparition d’un codon STOP : protéine **tronquée**', 'TAC → TAA : Tyr → STOP'],
        ['**Décalage du cadre**', 'insertion/délétion de 1 ou 2 nt', 'tous les codons suivants changent, STOP prématuré fréquent', 'allèle O du groupe sanguin'],
        ['Perte/gain d’un aa', 'délétion/insertion de 3 nt', 'un acide aminé en moins/en plus, pas de décalage', 'F508del (mucoviscidose)'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Toutes les mutations n’ont pas d’effet',
      content: [
        {
          type: 'p',
          text: 'Une grande partie de l’ADN humain ne code pas de protéine : une mutation dans ces régions est souvent **neutre**. Même dans un gène, une mutation silencieuse ou une substitution d’un acide aminé par un autre aux propriétés proches peut ne pas modifier la fonction de la protéine. À l’inverse, une seule substitution peut avoir un effet majeur (drépanocytose).',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'La drépanocytose',
      content: [
        {
          type: 'p',
          text: 'Le gène *HBB* code la chaîne β de l’hémoglobine. Chez l’allèle *HbS*, une substitution A → T sur le brin codant transforme le 6ᵉ codon GAG en GTG : l’acide glutamique (Glu) est remplacé par une valine (Val). Cette seule modification rend l’hémoglobine S capable de polymériser en fibres quand le dioxygène est rare, ce qui déforme les hématies « en faucille ».',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Analyser une mutation à partir de séquences',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Aligner', text: 'Comparer nucléotide par nucléotide la séquence de référence et la séquence mutée ; repérer la position de la différence.' },
            { title: 'Nommer', text: 'Identifier le type : substitution (même longueur), insertion (plus longue), délétion (plus courte).' },
            { title: 'Traduire', text: 'Découper en codons à partir du codon d’initiation, écrire l’ARNm (T → U sur le brin codant) et traduire avec le code génétique.' },
            { title: 'Conclure', text: 'Comparer les deux protéines : silencieuse, faux-sens, non-sens ou décalage ; envisager l’effet sur la fonction.' },
          ],
        },
      ],
    },

    { type: 'h2', text: '5. Mutations somatiques et germinales' },
    { type: 'svg', svg: svgSomaGerm, caption: 'Une mutation n’est transmise à la descendance que si elle touche la lignée germinale.', maxWidth: 680 },
    {
      type: 'grid',
      columns: 2,
      items: [
        {
          title: 'Mutation somatique',
          text: 'Survient dans une cellule non reproductrice (peau, poumon…). Elle est transmise par mitoses au **clone** issu de cette cellule, mais **pas aux descendants** de l’individu. Exemple : l’accumulation de mutations dans des mélanocytes exposés aux UV peut conduire à un **mélanome**.',
          icon: 'User',
        },
        {
          title: 'Mutation germinale',
          text: 'Survient dans une cellule de la **lignée germinale** (à l’origine des gamètes). Le gamète muté peut participer à la fécondation : l’enfant porte la mutation dans **toutes ses cellules** et pourra la transmettre à son tour.',
          icon: 'Baby',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Cancers et mutations',
      content: [
        {
          type: 'p',
          text: 'Un cancer résulte de l’**accumulation de plusieurs mutations somatiques** dans une même lignée de cellules, touchant des gènes qui contrôlent la division cellulaire. La cellule se divise alors de façon incontrôlée et forme un clone : la **tumeur**. D’où le rôle de la prévention : protection solaire, arrêt du tabac.',
        },
      ],
    },

    { type: 'h2', text: '6. Mutations, allèles et biodiversité' },
    {
      type: 'p',
      text: 'Les mutations germinales sont transmises de génération en génération. Au cours du temps, elles s’accumulent dans les populations : un même gène existe alors sous **plusieurs allèles** (on dit qu’il est **polyallélique**). La comparaison des génomes de deux humains montre en moyenne une différence tous les 1 000 nucléotides environ.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Polyallélisme',
      content: [
        { type: 'p', text: 'Existence, dans une population, de **plus de deux allèles** pour un même gène. Un individu diploïde ne possède au maximum que **deux** de ces allèles (un sur chaque chromosome homologue).' },
      ],
    },
    {
      type: 'grid',
      columns: 2,
      items: [
        {
          title: 'Système ABO',
          text: 'Gène codant une enzyme (glycosyltransférase). L’allèle **B** diffère de **A** par 7 substitutions, dont 4 changent un acide aminé : l’enzyme ajoute un autre sucre. L’allèle **O** porte une **délétion d’un nucléotide** qui décale le cadre de lecture : enzyme non fonctionnelle.',
          icon: 'Droplet',
        },
        {
          title: 'Gène CFTR',
          text: 'Code un canal à ions chlorure. Plus de **2 000 allèles** ont été décrits ; beaucoup provoquent la **mucoviscidose**. Le plus fréquent (F508del) est une délétion de 3 nucléotides : la phénylalanine 508 est absente.',
          icon: 'Wind',
        },
      ],
    },
    {
      type: 'p',
      text: 'Les mutations sont ainsi la **source première de la diversité génétique** : elles fournissent la matière première sur laquelle agissent ensuite la sélection naturelle et la dérive génétique (programme de Terminale). Elles sont la base de la **biodiversité** au niveau génétique.',
    },

    { type: 'h2', text: 'Bilan' },
    {
      type: 'p',
      text: 'Les mutations sont des modifications rares, aléatoires et héréditaires de la séquence de l’ADN. Spontanées (erreurs de réplication) ou induites (agents mutagènes comme les UV), elles ne deviennent effectives que si elles échappent aux systèmes de réparation. Substitutions, insertions et délétions peuvent modifier la protéine codée. Somatiques, elles concernent un clone de cellules de l’individu ; germinales, elles sont transmises à la descendance et alimentent le polyallélisme et la biodiversité.',
    },
  ],

  // =====================================================================
  exercices: [
    {
      id: 'svt2-ex1',
      title: 'Définitions essentielles',
      difficulty: 1,
      duration: 10,
      tags: ['restitution'],
      statement: [
        { type: 'p', text: 'Définir : **mutation**, **agent mutagène**, **allèle**, **polyallélisme**. Puis expliquer en deux phrases la différence entre une lésion de l’ADN et une mutation.' },
      ],
      hints: ['Une lésion peut être réparée ; une mutation est recopiée.'],
      solution: [
        {
          type: 'keyvalue',
          items: [
            { key: 'Mutation', value: 'modification rare, aléatoire et héréditaire de la séquence des nucléotides de l’ADN.' },
            { key: 'Agent mutagène', value: 'facteur physique (UV, rayons X) ou chimique (benzo[a]pyrène) qui augmente la fréquence des mutations.' },
            { key: 'Allèle', value: 'version d’un gène, différant des autres versions par sa séquence nucléotidique.' },
            { key: 'Polyallélisme', value: 'existence de plus de deux allèles d’un même gène dans une population.' },
          ],
        },
        {
          type: 'p',
          text: 'Une **lésion** est une altération de l’ADN (base modifiée, dimère de thymines) qui peut encore être réparée par la cellule. Elle devient une **mutation** si elle n’est pas réparée avant la réplication : la séquence modifiée est alors recopiée et transmise aux cellules filles.',
        },
      ],
    },
    {
      id: 'svt2-ex2',
      title: 'Identifier le type de mutation',
      difficulty: 1,
      duration: 10,
      tags: ['séquences'],
      statement: [
        { type: 'p', text: 'Comparer chaque séquence mutée (brin codant) à la séquence de référence et nommer le type de mutation.' },
        {
          type: 'table',
          headers: ['Allèle', 'Séquence'],
          rows: [
            ['Référence', '`ATG GCC AAG TTA CGT`'],
            ['Allèle 1', '`ATG GCC AAG TTG CGT`'],
            ['Allèle 2', '`ATG GCA AGT TAC GT`'],
            ['Allèle 3', '`ATG GCC AAA GTT ACG T`'],
          ],
        },
      ],
      hints: ['Comparez d’abord les longueurs (15 nucléotides pour la référence).'],
      solution: [
        {
          type: 'list',
          items: [
            '**Allèle 1** : même longueur (15 nt), le 12ᵉ nucléotide A est remplacé par G (TTA → TTG) : **substitution**. TTA et TTG codent tous deux la leucine : mutation **silencieuse**.',
            '**Allèle 2** : 14 nt, le 6ᵉ nucléotide (C) a disparu : **délétion** d’un nucléotide → décalage du cadre de lecture.',
            '**Allèle 3** : 16 nt, un A a été ajouté dans la série de A (positions 7–9 : AAG → AAA G…) : **insertion** d’un nucléotide → décalage du cadre de lecture.',
          ],
        },
      ],
    },
    {
      id: 'svt2-ex3',
      title: 'Conséquences d’une mutation sur la protéine',
      difficulty: 2,
      duration: 20,
      tags: ['code génétique', 'séquences'],
      statement: [
        { type: 'p', text: 'Brin codant d’un gène (début) : `5′ ATG TCT GGA TAC CAA TGG AAA TAG 3′`.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire la séquence d’acides aminés correspondante.',
            'Pour chacune des mutations suivantes, donner la nouvelle séquence protéique et qualifier la mutation : (a) TCT → TCC ; (b) GGA → AGA ; (c) TAC → TAA ; (d) délétion du 4ᵉ nucléotide (T).',
          ],
        },
        {
          type: 'p',
          text: 'Extrait du code génétique (ARNm) : AUG Met ; UCU, UCC Ser ; GGA Gly ; AGA Arg ; UAC Tyr ; CAA Gln ; UGG Trp ; AAA Lys ; UAA, UAG, UGA STOP ; CUG Leu ; GAU Asp ; ACC Thr ; AAU Asn.',
        },
      ],
      hints: ['L’ARNm a la même séquence que le brin codant, avec U à la place de T.', 'Pour la délétion, redécoupez en codons à partir de ATG.'],
      solution: [
        { type: 'p', text: '1. ARNm : AUG UCU GGA UAC CAA UGG AAA UAG → **Met – Ser – Gly – Tyr – Gln – Trp – Lys** (UAG = STOP).' },
        {
          type: 'list',
          items: [
            '(a) UCC code aussi Ser : protéine **inchangée**, mutation **silencieuse** (redondance du code).',
            '(b) AGA code Arg : Met – Ser – **Arg** – Tyr – Gln – Trp – Lys, mutation **faux-sens** (Gly → Arg).',
            '(c) UAA est un codon STOP : Met – Ser – Gly, protéine **tronquée**, mutation **non-sens**.',
            '(d) Nouvelle séquence : ATG CTG GAT ACC AAT GGA AAT AG… → Met – **Leu – Asp – Thr – Asn – Gly – Asn**… Tous les acides aminés après Met sont modifiés et le STOP initial est perdu : **décalage du cadre de lecture**, protéine très différente, généralement non fonctionnelle.',
          ],
        },
      ],
    },
    {
      id: 'svt2-ex4',
      title: 'Levures et rayons UV',
      difficulty: 2,
      duration: 20,
      tags: ['analyse de document', 'mutagène'],
      statement: [
        {
          type: 'p',
          text: 'Des levures *ade2* (colonies rouges) sont étalées en quantité égale sur 4 boîtes, exposées aux UV pendant des durées différentes, puis incubées 3 jours. Une colonie blanche est issue d’une levure ayant subi une mutation supplémentaire.',
        },
        {
          type: 'table',
          headers: ['Durée d’exposition (s)', '0', '15', '30', '60'],
          rows: [
            ['Colonies totales', '500', '400', '260', '120'],
            ['Colonies blanches', '0', '2', '5', '6'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer le pourcentage de colonies blanches pour chaque durée.',
            'Analyser l’évolution du nombre total de colonies et du pourcentage de colonies blanches.',
            'Conclure sur l’effet des UV et justifier le rôle de la boîte « 0 s ».',
          ],
        },
      ],
      hints: ['Pourcentage = blanches / totales × 100.', 'Le nombre de colonies blanches n’est pas le bon indicateur : rapportez-le au nombre de survivants.'],
      solution: [
        {
          type: 'table',
          headers: ['Durée (s)', '0', '15', '30', '60'],
          rows: [['% de colonies blanches', '0 %', '2/400 = 0,5 %', '5/260 ≈ 1,9 %', '6/120 = 5 %']],
        },
        {
          type: 'p',
          text: '2. Quand la durée d’exposition augmente de 0 à 60 s, le nombre total de colonies diminue (500 → 120, soit une survie de 24 %), tandis que le pourcentage de colonies blanches augmente fortement (0 % → 5 %).',
        },
        {
          type: 'p',
          text: '3. Les UV provoquent des lésions de l’ADN : quand elles sont très nombreuses, les levures meurent (baisse du nombre de colonies) ; parmi les survivantes, certaines lésions non réparées deviennent des mutations, dont la fréquence augmente avec la dose. Les UV sont donc un **agent mutagène**. La boîte témoin (0 s) montre que, sans UV, la fréquence des mutations spontanées est trop faible pour être détectée ici : les colonies blanches sont donc bien dues aux UV.',
        },
      ],
    },
    {
      id: 'svt2-ex5',
      title: 'Transmise ou non ?',
      difficulty: 2,
      duration: 10,
      tags: ['raisonnement'],
      statement: [
        { type: 'p', text: 'Pour chaque situation, indiquer si la mutation est somatique ou germinale et si elle peut être transmise aux enfants. Justifier.' },
        {
          type: 'list',
          items: [
            'a. Un mélanome apparaît sur le bras d’un homme de 60 ans ayant beaucoup travaillé au soleil.',
            'b. Un enfant atteint de mucoviscidose naît de deux parents sains, tous deux porteurs d’un allèle muté.',
            'c. Une mutation apparaît dans une spermatogonie (cellule souche des spermatozoïdes) d’un homme.',
            'd. Une mutation apparaît dans une cellule de l’embryon précoce, à l’origine d’une tache de couleur sur l’iris d’un seul œil.',
          ],
        },
      ],
      hints: ['La question à se poser : la cellule mutée peut-elle donner des gamètes ?'],
      solution: [
        {
          type: 'list',
          items: [
            'a. **Somatique** : elle touche des mélanocytes de la peau ; le clone muté forme la tumeur. Non transmise aux enfants.',
            'b. **Germinale** : l’allèle muté est présent dans les gamètes de chaque parent ; l’enfant a reçu deux allèles mutés, présents dans toutes ses cellules. Transmissible à la descendance.',
            'c. **Germinale** : la spermatogonie se divise pour produire des spermatozoïdes ; une partie d’entre eux portera la mutation, qui pourra être transmise.',
            'd. **Somatique** : seule la lignée de cellules de l’iris issue de la cellule mutée est concernée (mosaïque) ; non transmise, sauf si la lignée germinale était aussi issue de cette cellule (peu probable ici).',
          ],
        },
      ],
    },
    {
      id: 'svt2-ex6',
      title: 'Xeroderma pigmentosum',
      difficulty: 2,
      duration: 20,
      tags: ['analyse de document', 'réparation'],
      statement: [
        {
          type: 'p',
          text: 'On irradie aux UV des cellules de peau (fibroblastes) d’une personne saine et d’une personne atteinte de xeroderma pigmentosum (XP). On mesure le pourcentage de dimères de thymines encore présents au cours du temps.',
        },
        {
          type: 'table',
          headers: ['Temps après irradiation (h)', '0', '6', '12', '24'],
          rows: [
            ['Cellules saines', '100 %', '45 %', '20 %', '5 %'],
            ['Cellules XP', '100 %', '95 %', '92 %', '90 %'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Comparer l’évolution des dimères dans les deux types de cellules.',
            'Expliquer pourquoi les malades XP développent très tôt de nombreux cancers de la peau.',
            'Proposer des conseils de prévention adaptés.',
          ],
        },
      ],
      hints: ['La disparition des dimères traduit leur réparation.'],
      solution: [
        {
          type: 'p',
          text: '1. Juste après l’irradiation, les deux types de cellules ont autant de dimères. Dans les cellules saines, 95 % des dimères ont disparu en 24 h : ils sont **réparés**. Dans les cellules XP, 90 % des dimères sont encore présents à 24 h : la réparation est **quasi inexistante**.',
        },
        {
          type: 'p',
          text: '2. Chez les malades XP, un gène codant une enzyme du système de réparation est muté. Les lésions causées par les UV persistent et, lors de la réplication, deviennent des **mutations**. Les cellules de peau accumulent ainsi rapidement des mutations somatiques, dont certaines touchent des gènes contrôlant la division : des cancers apparaissent dès l’enfance.',
        },
        { type: 'p', text: '3. Éviter toute exposition aux UV : vêtements couvrants, visière anti-UV, filtres sur les vitres, sorties de nuit, crème solaire à très haute protection, dépistage dermatologique régulier.' },
      ],
    },
    {
      id: 'svt2-ex7',
      title: 'La drépanocytose : une substitution aux lourdes conséquences',
      difficulty: 3,
      duration: 25,
      tags: ['type bac', 'séquences', 'analyse de document'],
      statement: [
        { type: 'p', text: 'Document : début du brin codant du gène *HBB* (chaîne β de l’hémoglobine) pour deux allèles.' },
        {
          type: 'table',
          headers: ['Codon n°', '1', '2', '3', '4', '5', '6', '7', '8'],
          rows: [
            ['Allèle *HbA*', 'GTG', 'CAC', 'CTG', 'ACT', 'CCT', 'GAG', 'GAG', 'AAG'],
            ['Allèle *HbS*', 'GTG', 'CAC', 'CTG', 'ACT', 'CCT', 'GTG', 'GAG', 'AAG'],
          ],
          caption: 'La numérotation commence après le codon d’initiation, dont la méthionine est retirée de la protéine mature.',
        },
        {
          type: 'p',
          text: 'Code génétique (ARNm) : GUG Val ; CAC His ; CUG Leu ; ACU Thr ; CCU Pro ; GAG Glu ; AAG Lys. Les malades homozygotes HbS/HbS présentent des hématies déformées en faucille, qui obstruent les capillaires (crises douloureuses) et sont détruites rapidement (anémie).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Identifier la mutation et sa nature.',
            'Traduire les 8 premiers acides aminés pour chaque allèle et qualifier la mutation.',
            'Expliquer, en reliant les différentes échelles, comment cette mutation entraîne les symptômes.',
            'Cette mutation est-elle somatique ou germinale chez un malade ? Justifier.',
          ],
        },
      ],
      hints: [
        'Comparez codon par codon.',
        'Une protéine dont la structure change peut changer de propriétés (ici, elle s’agrège).',
      ],
      solution: [
        {
          type: 'p',
          text: '1. Les deux séquences ont la même longueur et ne diffèrent qu’au 2ᵉ nucléotide du codon 6 : A (*HbA*) est remplacé par T (*HbS*). C’est une **substitution** ponctuelle (GAG → GTG).',
        },
        {
          type: 'p',
          text: '2. *HbA* : Val – His – Leu – Thr – Pro – **Glu** – Glu – Lys. *HbS* : Val – His – Leu – Thr – Pro – **Val** – Glu – Lys. Un seul acide aminé change (acide glutamique → valine) : mutation **faux-sens**.',
        },
        {
          type: 'list',
          items: [
            '**Échelle moléculaire** : la chaîne β de l’hémoglobine S porte une valine à la place d’un acide glutamique ; en cas de manque de O₂, les molécules d’hémoglobine S s’associent en longues fibres.',
            '**Échelle cellulaire** : ces fibres déforment les hématies, qui prennent une forme de faucille, rigide et fragile.',
            '**Échelle de l’organisme** : les hématies falciformes obstruent les petits vaisseaux (crises douloureuses, lésions d’organes) et sont détruites précocement (anémie, fatigue).',
          ],
        },
        {
          type: 'p',
          text: '4. Le malade a hérité de l’allèle muté de chacun de ses parents : la mutation est apparue un jour dans la lignée **germinale** d’un ancêtre, puis a été transmise de génération en génération. Elle est présente dans toutes les cellules du malade.',
        },
      ],
    },
    {
      id: 'svt2-ex8',
      title: 'Le polyallélisme du système ABO',
      difficulty: 3,
      duration: 25,
      tags: ['type bac', 'polyallélisme'],
      statement: [
        {
          type: 'p',
          text: 'Le gène *ABO* (chromosome 9) code une enzyme qui ajoute un sucre sur une molécule de la membrane des hématies (antigène H). L’enzyme A ajoute une N-acétylgalactosamine (antigène A), l’enzyme B un galactose (antigène B).',
        },
        {
          type: 'list',
          items: [
            'Document 1 : l’allèle B diffère de l’allèle A par 7 substitutions ; 4 d’entre elles modifient un acide aminé de l’enzyme, dont deux situés dans le site actif.',
            'Document 2 : l’allèle O le plus fréquent possède la même séquence que A, à l’exception de la **délétion d’un G** au 261ᵉ nucléotide de la séquence codante ; la protéine produite compte environ 116 acides aminés au lieu de 354 et n’a aucune activité.',
            'Document 3 : de nombreux autres allèles (A2, B3, O2…) ont été identifiés ; on en connaît plusieurs centaines.',
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Montrer que le gène *ABO* présente un polyallélisme.',
            'Expliquer pourquoi les enzymes A et B ont des activités différentes.',
            'Expliquer pourquoi l’allèle O ne produit pas d’enzyme fonctionnelle (utiliser la notion de cadre de lecture).',
            'Un individu peut-il posséder les allèles A, B et O ? Justifier.',
            'Expliquer l’origine de cette diversité d’allèles.',
          ],
        },
      ],
      hints: ['La perte d’un seul nucléotide modifie le découpage en codons de toute la suite de la séquence.', 'Un individu diploïde possède deux exemplaires de chaque chromosome.'],
      solution: [
        { type: 'p', text: '1. Il existe dans la population humaine **bien plus de deux allèles** du gène *ABO* (A, B, O et plusieurs centaines de variants) : c’est la définition du polyallélisme.' },
        {
          type: 'p',
          text: '2. Les substitutions faux-sens modifient 4 acides aminés, dont deux dans le **site actif**, région de l’enzyme qui fixe le sucre à transférer. La forme du site actif change : l’enzyme B reconnaît le galactose au lieu de la N-acétylgalactosamine.',
        },
        {
          type: 'p',
          text: '3. La délétion d’un seul nucléotide **décale le cadre de lecture** : tous les codons situés après la mutation sont modifiés, ce qui change la séquence des acides aminés et fait apparaître un **codon STOP prématuré**. La protéine est tronquée (≈ 116 acides aminés au lieu de 354), privée de son site actif : elle est inactive. Aucun sucre n’est ajouté sur l’antigène H (groupe O).',
        },
        { type: 'p', text: '4. **Non** : un individu diploïde possède deux exemplaires du chromosome 9, donc **deux allèles au maximum** (par exemple A et O, ou A et B).' },
        {
          type: 'p',
          text: '5. Ces allèles proviennent de **mutations** (substitutions, délétions) apparues au hasard dans la lignée germinale d’individus au cours de l’histoire évolutive, puis transmises et accumulées dans les populations au fil des générations.',
        },
      ],
    },
  ],

  // =====================================================================
  representations: [
    {
      type: 'widget',
      id: 'mutation-simulator',
      props: { sequence: 'ATGGTGCACCTGACTCCTGAGGAGAAGTAA' },
      title: 'Simulateur de mutations',
      caption: 'Début du gène de la β-globine : essayez de reproduire la mutation de la drépanocytose (codon 7 ici, GAG → GTG) puis une délétion.',
    },
    { type: 'svg', svg: svgTypes, caption: 'Substitution, insertion et délétion.', maxWidth: 680 },
    { type: 'svg', svg: svgSomaGerm, caption: 'Mutations somatiques et germinales.', maxWidth: 680 },
    {
      type: 'matching',
      title: 'Associer chaque mutation à sa conséquence',
      pairs: [
        { left: 'GCA → GCG (Ala → Ala)', right: 'mutation silencieuse' },
        { left: 'GAG → GTG (Glu → Val)', right: 'mutation faux-sens' },
        { left: 'TAC → TAG (Tyr → STOP)', right: 'mutation non-sens' },
        { left: 'Délétion d’un nucléotide', right: 'décalage du cadre de lecture' },
        { left: 'Délétion de 3 nucléotides', right: 'perte d’un acide aminé' },
      ],
    },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Un agent mutagène :',
          choices: ['crée des mutations orientées utiles', 'augmente la fréquence des mutations', 'répare l’ADN', 'est toujours d’origine chimique'],
          answer: 1,
        },
        {
          question: 'Les UV provoquent principalement :',
          choices: ['des cassures des chromosomes', 'des dimères de thymines', 'la perte de chromosomes entiers', 'la méthylation de l’ADN'],
          answer: 1,
        },
        {
          question: 'Une mutation dans une cellule de la peau :',
          choices: ['est transmise aux enfants', 'est transmise aux cellules issues de cette cellule', 'n’est jamais transmise', 'touche tout l’organisme'],
          answer: 1,
          explanation: 'C’est une mutation somatique : elle forme un sous-clone dans l’individu.',
        },
        {
          question: 'Quelle mutation a le plus de chances d’être sans effet sur la protéine ?',
          choices: ['Insertion d’un nucléotide', 'Substitution du 3ᵉ nucléotide d’un codon', 'Délétion de 2 nucléotides', 'Apparition d’un codon STOP'],
          answer: 1,
          explanation: 'Grâce à la redondance du code, un changement en 3ᵉ position donne souvent le même acide aminé.',
        },
        {
          question: 'Le taux d’erreur de la réplication après réparation est d’environ :',
          choices: ['1 pour 100', '1 pour 10⁵', '1 pour 10⁹ à 10¹⁰', 'zéro'],
          answer: 2,
        },
        {
          question: 'Le polyallélisme désigne :',
          choices: [
            'la présence de plus de deux allèles chez un individu',
            'l’existence de plus de deux allèles d’un gène dans une population',
            'la présence de plusieurs gènes sur un chromosome',
            'la duplication d’un gène',
          ],
          answer: 1,
        },
        {
          question: 'Les malades atteints de xeroderma pigmentosum sont déficients pour :',
          choices: ['la réplication', 'la réparation de l’ADN', 'la mitose', 'la synthèse de mélanine'],
          answer: 1,
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Mutation', back: 'Modification rare, aléatoire et héréditaire de la séquence de l’ADN.' },
        { front: 'Mutation spontanée', back: 'Erreur de réplication non réparée (≈ 10⁻⁹ à 10⁻¹⁰ par nt).' },
        { front: 'Agent mutagène', back: 'Facteur (UV, rayons X, benzo[a]pyrène) qui augmente la fréquence des mutations.' },
        { front: 'Effet des UV', back: 'Dimères de thymines (pyrimidines) sur un même brin.' },
        { front: 'Mutation silencieuse', back: 'Substitution sans changement d’acide aminé (code redondant).' },
        { front: 'Mutation faux-sens', back: 'Substitution remplaçant un acide aminé par un autre.' },
        { front: 'Mutation non-sens', back: 'Substitution créant un codon STOP : protéine tronquée.' },
        { front: 'Décalage du cadre de lecture', back: 'Insertion ou délétion de 1 ou 2 nt : tous les codons suivants changent.' },
        { front: 'Mutation somatique', back: 'Dans une cellule du corps ; transmise au clone, pas à la descendance.' },
        { front: 'Mutation germinale', back: 'Dans la lignée germinale ; transmise à la descendance.' },
        { front: 'Xeroderma pigmentosum', back: 'Défaut de réparation des lésions UV → cancers de la peau précoces.' },
        { front: 'Polyallélisme', back: 'Plus de deux allèles d’un gène dans une population (ABO, CFTR).' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'Une mutation est une modification de la {{séquence}} de l’ADN. Elle peut être spontanée, due à une erreur de {{réplication}}, ou induite par un agent {{mutagène}} comme les {{UV|ultraviolets}}. Si la lésion n’est pas {{réparée}}, elle est transmise aux cellules filles. Une mutation {{germinale}} peut être transmise à la descendance, contrairement à une mutation {{somatique}}. Les mutations sont à l’origine de nouveaux {{allèles}}.',
    },
    {
      type: 'truefalse',
      statements: [
        { text: 'Toutes les mutations ont un effet sur le phénotype.', answer: false, explanation: 'Beaucoup sont neutres (régions non codantes, mutations silencieuses).' },
        { text: 'Les UV augmentent la fréquence des mutations.', answer: true },
        { text: 'Un individu peut posséder trois allèles différents d’un même gène autosomique.', answer: false, explanation: 'Un individu diploïde possède deux allèles au maximum.' },
        { text: 'Une délétion de 3 nucléotides décale toujours le cadre de lecture.', answer: false, explanation: '3 nt = un codon : un acide aminé est perdu, mais le cadre est conservé.' },
        { text: 'Un cancer résulte généralement de l’accumulation de plusieurs mutations somatiques.', answer: true },
      ],
    },
  ],
}

export default chapter
