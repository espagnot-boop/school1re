import type { Chapter } from '../types'

const svgInflammation =
  '<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">' +
  '<defs><marker id="ar6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>' +
  // epidermis
  '<rect x="10" y="10" width="620" height="40" fill="hsl(25 95% 53% / 0.18)" stroke="hsl(25 95% 53%)"/>' +
  '<text x="20" y="34" fill="currentColor" font-size="11">peau (barrière) - effraction</text>' +
  '<path d="M300 10 L320 50 L340 10 z" fill="hsl(0 0% 50% / 0.5)"/>' +
  // vessel
  '<rect x="10" y="215" width="620" height="60" fill="hsl(0 84% 60% / 0.15)" stroke="hsl(0 84% 60%)"/>' +
  '<text x="20" y="262" fill="currentColor" font-size="11">vaisseau sanguin (capillaire)</text>' +
  // bacteria
  '<g fill="hsl(142 71% 45%)"><rect x="285" y="62" width="14" height="7"/><rect x="320" y="70" width="14" height="7"/><rect x="305" y="88" width="14" height="7"/><rect x="340" y="95" width="14" height="7"/></g>' +
  '<text x="380" y="78" fill="currentColor" font-size="11">1. bactéries</text>' +
  // mastocyte
  '<circle cx="160" cy="110" r="22" fill="hsl(263 70% 60% / 0.3)" stroke="hsl(263 70% 60%)" stroke-width="1.5"/>' +
  '<text x="160" y="114" text-anchor="middle" fill="currentColor" font-size="10">mastocyte</text>' +
  '<g fill="hsl(263 70% 60%)"><circle cx="190" cy="125" r="2.5"/><circle cx="198" cy="135" r="2.5"/><circle cx="205" cy="145" r="2.5"/></g>' +
  '<text x="210" y="165" fill="currentColor" font-size="11">2. histamine, cytokines</text>' +
  // macrophage
  '<ellipse cx="340" cy="140" rx="30" ry="22" fill="hsl(217 91% 60% / 0.3)" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>' +
  '<text x="340" y="144" text-anchor="middle" fill="currentColor" font-size="10">macrophage</text>' +
  '<text x="385" y="145" fill="currentColor" font-size="11">3. phagocytose</text>' +
  // neutrophiles
  '<g fill="hsl(217 91% 60% / 0.35)" stroke="hsl(217 91% 60%)"><circle cx="470" cy="190" r="10"/><circle cx="520" cy="170" r="10"/><circle cx="570" cy="150" r="10"/></g>' +
  '<path d="M470 235 V 190" stroke="currentColor" fill="none" marker-end="url(#ar6)"/>' +
  '<text x="480" y="210" fill="currentColor" font-size="11">4. diapédèse des leucocytes</text>' +
  '<text x="540" y="130" fill="currentColor" font-size="11">attirés (chimiotactisme)</text>' +
  '<g stroke="currentColor" fill="none" marker-end="url(#ar6)"><path d="M180 135 Q 190 190 200 214"/></g>' +
  '<text x="205" y="195" fill="currentColor" font-size="11">vasodilatation, ↑ perméabilité</text>' +
  '</svg>'

const svgAnticorps =
  '<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">' +
  '<g stroke="hsl(217 91% 60%)" stroke-width="10" stroke-linecap="round" fill="none">' +
  '<path d="M140 130 L140 215"/><path d="M140 130 L85 70"/><path d="M140 130 L195 70"/></g>' +
  '<g stroke="hsl(142 71% 45%)" stroke-width="6" stroke-linecap="round" fill="none"><path d="M155 140 L215 80"/><path d="M125 140 L65 80"/></g>' +
  '<g fill="hsl(25 95% 53%)"><polygon points="62,48 80,48 71,66"/><polygon points="200,48 218,48 209,66"/></g>' +
  '<g fill="currentColor" font-size="12"><text x="215" y="100">chaîne légère (verte)</text><text x="160" y="190">chaîne lourde (bleue)</text>' +
  '<text x="30" y="30">sites de fixation de l’antigène</text><text x="165" y="245">anticorps (IgG)</text></g>' +
  '<g fill="currentColor" font-size="11" text-anchor="start"><text x="330" y="60" font-weight="600">Fonctions</text>' +
  '<text x="330" y="85">• neutralisation (toxines, virus)</text><text x="330" y="105">• agglutination (complexes immuns)</text>' +
  '<text x="330" y="125">• opsonisation : facilite la phagocytose</text><text x="330" y="145">• activation du complément</text>' +
  '<text x="330" y="180" font-weight="600">Spécificité</text>' +
  '<text x="330" y="200">1 anticorps ↔ 1 épitope</text><text x="330" y="220">(2 sites identiques par anticorps)</text></g>' +
  '</svg>'

const svgClonale =
  '<svg viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">' +
  '<defs><marker id="ar6b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>' +
  // stock of different LB
  '<g stroke="currentColor" stroke-width="1.2"><circle cx="40" cy="60" r="14" fill="hsl(217 91% 60% / 0.4)"/><circle cx="40" cy="105" r="14" fill="hsl(142 71% 45% / 0.4)"/><circle cx="40" cy="150" r="14" fill="hsl(25 95% 53% / 0.5)"/><circle cx="40" cy="195" r="14" fill="hsl(263 70% 60% / 0.4)"/><circle cx="40" cy="240" r="14" fill="hsl(0 84% 60% / 0.4)"/></g>' +
  '<text x="70" y="150" fill="currentColor" font-size="11">LB naïfs, chacun</text><text x="70" y="166" fill="currentColor" font-size="11">avec un récepteur différent</text>' +
  // antigen
  '<polygon points="170,140 190,140 180,158" fill="hsl(25 95% 53%)"/>' +
  '<text x="150" y="180" fill="currentColor" font-size="11">antigène</text>' +
  // selected
  '<line x1="210" y1="150" x2="270" y2="150" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar6b)"/>' +
  '<text x="215" y="140" fill="currentColor" font-size="11">sélection</text>' +
  '<circle cx="300" cy="150" r="16" fill="hsl(25 95% 53% / 0.5)" stroke="currentColor" stroke-width="1.5"/>' +
  '<line x1="320" y1="150" x2="380" y2="150" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar6b)"/>' +
  '<text x="322" y="140" fill="currentColor" font-size="11">prolifération</text>' +
  // clone
  '<g stroke="currentColor" fill="hsl(25 95% 53% / 0.5)"><circle cx="410" cy="110" r="12"/><circle cx="440" cy="150" r="12"/><circle cx="410" cy="190" r="12"/><circle cx="470" cy="110" r="12"/><circle cx="480" cy="190" r="12"/></g>' +
  '<text x="395" y="225" fill="currentColor" font-size="11">clone</text>' +
  '<line x1="500" y1="130" x2="560" y2="90" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar6b)"/>' +
  '<line x1="500" y1="170" x2="560" y2="210" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar6b)"/>' +
  '<circle cx="595" cy="80" r="20" fill="hsl(25 95% 53% / 0.5)" stroke="currentColor" stroke-width="1.5"/>' +
  '<text x="595" y="84" text-anchor="middle" fill="currentColor" font-size="10">plasmocyte</text>' +
  '<text x="595" y="55" text-anchor="middle" fill="currentColor" font-size="11">anticorps ↓↓</text>' +
  '<circle cx="595" cy="220" r="16" fill="hsl(25 95% 53% / 0.3)" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2"/>' +
  '<text x="595" y="224" text-anchor="middle" fill="currentColor" font-size="10">mémoire</text>' +
  '<text x="595" y="252" text-anchor="middle" fill="currentColor" font-size="11">LB mémoire</text>' +
  '<text x="340" y="272" text-anchor="middle" fill="currentColor" opacity="0.7">L’antigène sélectionne le lymphocyte dont le récepteur lui est complémentaire : il n’induit pas la diversité.</text>' +
  '</svg>'

const svgReponse =
  '<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">' +
  '<g stroke="currentColor" fill="none" stroke-width="1.2"><line x1="50" y1="230" x2="610" y2="230"/><line x1="50" y1="230" x2="50" y2="25"/></g>' +
  '<text x="55" y="20" fill="currentColor">taux d’anticorps</text><text x="610" y="250" text-anchor="end" fill="currentColor">temps (jours)</text>' +
  // primary
  '<path d="M60 229 L160 229 C190 225 220 160 250 150 C290 148 310 200 340 224" fill="none" stroke="hsl(217 91% 60%)" stroke-width="2.5"/>' +
  // secondary
  '<path d="M340 228 C360 222 372 90 400 50 C440 40 470 80 520 150 C550 190 580 215 605 222" fill="none" stroke="hsl(0 84% 60%)" stroke-width="2.5"/>' +
  '<g stroke="currentColor" stroke-dasharray="4 3" opacity="0.6"><line x1="60" y1="225" x2="60" y2="270"/><line x1="340" y1="225" x2="340" y2="270"/></g>' +
  '<g fill="currentColor" font-size="11"><text x="62" y="268">1re injection de l’antigène</text><text x="344" y="268">2e injection (même antigène)</text>' +
  '<text x="95" y="215" fill="hsl(217 91% 60%)">latence ≈ 5-7 j</text><text x="230" y="130" fill="hsl(217 91% 60%)">réponse primaire</text>' +
  '<text x="415" y="60" fill="hsl(0 84% 60%)">réponse secondaire :</text><text x="415" y="75" fill="hsl(0 84% 60%)">rapide, intense, durable</text></g>' +
  '</svg>'

const svgCooperation =
  '<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">' +
  '<defs><marker id="ar6c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>' +
  '<g stroke="currentColor" stroke-width="1.5"><rect x="10" y="20" width="150" height="46" fill="hsl(25 95% 53% / 0.2)"/><rect x="210" y="20" width="170" height="46" fill="hsl(217 91% 60% / 0.2)"/>' +
  '<rect x="430" y="20" width="220" height="46" fill="hsl(263 70% 60% / 0.2)"/></g>' +
  '<g fill="currentColor" text-anchor="middle"><text x="85" y="40">Pathogène (antigène)</text><text x="85" y="56" font-size="11">capté, phagocyté</text>' +
  '<text x="295" y="40">Cellule dendritique / macrophage</text><text x="295" y="56" font-size="11">présente un peptide (CMH II)</text>' +
  '<text x="540" y="40">LT CD4 (auxiliaire) activé</text><text x="540" y="56" font-size="11">sécrète des interleukines (IL-2)</text></g>' +
  '<g stroke="currentColor" stroke-width="1.5"><line x1="160" y1="43" x2="208" y2="43" marker-end="url(#ar6c)"/><line x1="380" y1="43" x2="428" y2="43" marker-end="url(#ar6c)"/></g>' +
  '<g stroke="currentColor" stroke-width="1.5"><line x1="480" y1="68" x2="260" y2="140" marker-end="url(#ar6c)"/><line x1="600" y1="68" x2="600" y2="140" marker-end="url(#ar6c)"/></g>' +
  '<g stroke="currentColor" stroke-width="1.5"><rect x="140" y="140" width="190" height="52" fill="hsl(142 71% 45% / 0.2)"/><rect x="500" y="140" width="160" height="52" fill="hsl(0 84% 60% / 0.2)"/></g>' +
  '<g fill="currentColor" text-anchor="middle"><text x="235" y="160">LB sélectionné + activé</text><text x="235" y="176" font-size="11">(avec aide des LT CD4)</text>' +
  '<text x="580" y="160">LT CD8 sélectionné</text><text x="580" y="176" font-size="11">(avec aide des LT CD4)</text></g>' +
  '<g stroke="currentColor" stroke-width="1.5"><line x1="235" y1="194" x2="235" y2="232" marker-end="url(#ar6c)"/><line x1="580" y1="194" x2="580" y2="232" marker-end="url(#ar6c)"/></g>' +
  '<g stroke="currentColor" stroke-width="1.5"><rect x="130" y="234" width="210" height="52" fill="hsl(142 71% 45% / 0.3)"/><rect x="480" y="234" width="190" height="52" fill="hsl(0 84% 60% / 0.3)"/></g>' +
  '<g fill="currentColor" text-anchor="middle"><text x="235" y="254">Plasmocytes → anticorps</text><text x="235" y="270" font-size="11">+ LB mémoire : immunité humorale</text>' +
  '<text x="575" y="254">LT CD8 cytotoxiques</text><text x="575" y="270" font-size="11">+ LT mémoire : immunité cellulaire</text></g>' +
  '<text x="340" y="308" text-anchor="middle" fill="currentColor" opacity="0.7">Les LT CD4 coordonnent la réponse adaptative : sans eux, elle est très déficiente (SIDA).</text>' +
  '</svg>'

const chapter: Chapter = {
  id: 'immunite',
  subject: 'svt',
  order: 6,
  title: 'Immunité innée et adaptative',
  theme: 'Corps humain et santé',
  summary:
    'Face à un pathogène, l’organisme déclenche une réponse innée immédiate (inflammation, phagocytose) puis une réponse adaptative spécifique (LB, anticorps, LT) qui conserve une mémoire exploitée par la vaccination.',
  duration: '3 semaines',
  objectives: [
    'Décrire les barrières de l’organisme et les étapes de l’immunité innée (inflammation, phagocytose).',
    'Expliquer le principe de la réponse adaptative : sélection clonale, rôle des LB, plasmocytes, anticorps, LT CD4 et LT CD8.',
    'Distinguer immunité humorale et immunité cellulaire ; réponse primaire et secondaire ; mémoire immunitaire.',
    'Expliquer le principe de la vaccination et de l’immunité de groupe ; comparer vaccination et sérothérapie.',
    'Exploiter des documents (expériences, courbes) pour argumenter sur le rôle d’acteurs de l’immunité.',
  ],
  keywords: [
    'immunité innée',
    'inflammation',
    'phagocytose',
    'immunité adaptative',
    'lymphocyte B',
    'plasmocyte',
    'anticorps',
    'lymphocyte T CD4',
    'lymphocyte T CD8',
    'sélection clonale',
    'mémoire immunitaire',
    'vaccination',
    'immunité de groupe',
  ],
  fiche: [
    { type: 'h2', text: 'L’essentiel à retenir' },
    {
      type: 'table',
      headers: ['', 'Immunité innée', 'Immunité adaptative'],
      rows: [
        ['Rapidité', 'immédiate (minutes à heures)', 'lente (4 à 7 jours la première fois)'],
        ['Spécificité', '**non spécifique** (reconnaît des motifs communs aux pathogènes)', '**spécifique** de l’antigène'],
        ['Cellules', 'mastocytes, phagocytes (macrophages, polynucléaires neutrophiles), cellules dendritiques', 'lymphocytes B (plasmocytes), LT CD4, LT CD8'],
        ['Mémoire', 'non', '**oui** (cellules mémoire)'],
        ['Effecteurs', 'inflammation, phagocytose', 'anticorps (humorale), cytotoxicité (cellulaire)'],
      ],
    },
    { type: 'h3', text: 'Immunité innée' },
    {
      type: 'list',
      items: [
        '**Barrières** : peau, muqueuses, mucus, flore, sécrétions (larmes, acidité).',
        '**Inflammation** : rougeur, chaleur, gonflement, douleur ; histamine et cytokines des mastocytes → vasodilatation, perméabilité, **diapédèse** des leucocytes.',
        '**Phagocytose** : ingestion et digestion du pathogène par macrophages et polynucléaires neutrophiles.',
      ],
    },
    { type: 'h3', text: 'Immunité adaptative' },
    {
      type: 'list',
      items: [
        '**Sélection clonale** : l’antigène sélectionne le lymphocyte (LB ou LT) dont le récepteur lui est complémentaire ; celui-ci se multiplie (clone) et se différencie.',
        '**LB → plasmocytes** : sécrètent des **anticorps** (immunité humorale) qui neutralisent, agglutinent et facilitent la phagocytose.',
        '**LT CD8 → cytotoxiques** : détruisent les cellules infectées ou tumorales (immunité cellulaire).',
        '**LT CD4 (auxiliaires)** : sécrètent des **interleukines** qui coordonnent LB et LT CD8.',
        '**Mémoire** : LB et LT mémoire → réponse secondaire plus rapide, plus forte, plus durable.',
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Vaccination',
      content: [
        {
          type: 'p',
          text: 'Injection d’un antigène **inoffensif** (agent atténué ou inactivé, fragment, ARNm codant un antigène) → réponse primaire sans maladie → **cellules mémoire** → réponse secondaire rapide en cas d’infection réelle. Le seuil d’immunité de groupe est $1 - 1/R_0$.',
        },
      ],
    },
  ],
  cours: [
    { type: 'h2', text: '1. Le soi, le non-soi et les agents pathogènes' },
    {
      type: 'p',
      text: 'Notre milieu intérieur est constamment exposé à des micro-organismes : bactéries, virus, champignons, parasites. Certains sont des **pathogènes** : ils se multiplient chez l’hôte et provoquent une maladie. L’organisme distingue ses propres constituants (le **soi**) de ce qui lui est étranger (le **non-soi**), et dispose de deux grands types de défenses : l’**immunité innée** et l’**immunité adaptative**.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Antigène',
      content: [
        {
          type: 'p',
          text: 'Un **antigène** est une molécule (souvent une protéine ou un polysaccharide) reconnue par le système immunitaire comme étrangère et capable de déclencher une réponse adaptative. La région précise reconnue par un anticorps ou un récepteur de lymphocyte est un **épitope**.',
        },
      ],
    },

    { type: 'h2', text: '2. L’immunité innée' },
    { type: 'h3', text: '2.1 Les barrières naturelles' },
    {
      type: 'p',
      text: 'La **peau** (épiderme kératinisé), les **muqueuses** (mucus, cils vibratiles des bronches), les sécrétions (larmes et salive contenant du lysozyme, **acidité** gastrique et de la peau) et la **flore commensale** empêchent la plupart des micro-organismes d’entrer ou de s’installer. Ces barrières sont la première ligne de défense.',
    },
    { type: 'h3', text: '2.2 La réaction inflammatoire' },
    {
      type: 'p',
      text: 'Si les barrières sont franchies (piqûre, écharde, plaie), une **réaction inflammatoire aiguë** se développe en quelques minutes à quelques heures. Elle se manifeste par quatre signes : **rougeur, chaleur, gonflement (œdème), douleur**.',
    },
    { type: 'svg', svg: svgInflammation, caption: 'Réaction inflammatoire : détection des bactéries, libération de médiateurs, afflux de leucocytes.' },
    {
      type: 'steps',
      items: [
        { title: 'Reconnaissance', text: 'Des cellules sentinelles tissulaires (**mastocytes**, macrophages, cellules dendritiques) reconnaissent des motifs moléculaires communs à de nombreux micro-organismes (non spécifique).' },
        { title: 'Médiateurs', text: 'Elles libèrent des **médiateurs chimiques** : histamine (mastocytes) et cytokines.' },
        { title: 'Réactions vasculaires', text: '**Vasodilatation** des capillaires (rougeur, chaleur) et augmentation de leur **perméabilité** (le plasma passe dans les tissus : gonflement, douleur par compression des terminaisons nerveuses et action des médiateurs).' },
        { title: 'Recrutement', text: 'Des molécules attirent (**chimiotactisme**) les leucocytes circulants (surtout les polynucléaires neutrophiles, puis les monocytes) : ils traversent la paroi des capillaires (**diapédèse**) et gagnent le foyer infectieux.' },
        { title: 'Élimination', text: 'Les phagocytes détruisent les agents pathogènes. Le **pus** est constitué de phagocytes morts, de débris cellulaires et de bactéries.' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Fièvre et inflammation généralisée',
      content: [
        {
          type: 'p',
          text: 'Certaines cytokines (interleukines) passent dans le sang et agissent sur l’hypothalamus : elles déclenchent la **fièvre**, qui ralentit la multiplication de certains pathogènes et stimule les défenses. Une inflammation chronique ou excessive (arthrite, asthme, choc septique) devient elle-même pathologique.',
        },
      ],
    },
    { type: 'h3', text: '2.3 La phagocytose' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Phagocytose',
      content: [
        {
          type: 'p',
          text: 'La **phagocytose** est le mécanisme par lequel une cellule (**phagocyte**) englobe une particule (bactérie, débris) puis la détruit. Les principaux phagocytes sont les **macrophages**, issus de monocytes, présents dans les tissus, et les **polynucléaires neutrophiles**, très nombreux dans le sang.',
        },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Adhésion', text: 'Le phagocyte reconnaît et se fixe à la surface du pathogène (récepteurs).' },
        { title: 'Ingestion', text: 'Sa membrane émet des **pseudopodes** qui entourent la bactérie : elle est englobée dans une vacuole, le **phagosome**.' },
        { title: 'Digestion', text: 'Le phagosome fusionne avec des **lysosomes** contenant des enzymes digestives et des substances oxydantes : le pathogène est détruit.' },
        { title: 'Élimination et présentation', text: 'Les déchets sont rejetés. Chez les **cellules présentatrices d’antigène** (cellules dendritiques, macrophages), des fragments (peptides) sont présentés à la surface avec des molécules du **CMH** (complexe majeur d’histocompatibilité) : cela fait le lien avec l’immunité adaptative.' },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Caractéristiques de l’immunité innée',
      content: [
        {
          type: 'list',
          items: [
            'Elle est **rapide** (immédiate) et **non spécifique** : la réponse est la même quel que soit le pathogène.',
            'Elle est **présente dès la naissance**, identique chez tous les individus d’une espèce.',
            'Elle ne laisse pas de mémoire immunitaire spécifique (réponse identique lors d’un second contact).',
            'Elle suffit souvent à éliminer les infections bénignes ; sinon, elle contient l’infection et déclenche la réponse adaptative.',
          ],
        },
      ],
    },

    { type: 'h2', text: '3. L’immunité adaptative' },
    {
      type: 'p',
      text: 'Lorsque l’immunité innée ne suffit pas, l’**immunité adaptative** (ou acquise) prend le relais. Elle est **spécifique** de l’antigène, plus lente à se mettre en place (une semaine environ), et garde une **mémoire**. Elle repose sur les **lymphocytes**, cellules produites dans la moelle osseuse : les lymphocytes **B** (LB), qui y mûrissent, et les lymphocytes **T** (LT), qui mûrissent dans le thymus.',
    },
    { type: 'h3', text: '3.1 La sélection clonale' },
    {
      type: 'p',
      text: 'Chaque lymphocyte porte à sa surface des **récepteurs identiques** (récepteur des LB = anticorps membranaire ; récepteur des LT = TCR), spécifiques d’**un seul épitope**. Ces récepteurs sont fabriqués avant tout contact avec un antigène (assemblages aléatoires de segments de gènes lors de la maturation) : le répertoire contient des millions de lymphocytes différents, chacun présent en quelques exemplaires.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Sélection clonale',
      content: [
        {
          type: 'p',
          text: 'Quand un antigène est présent, il **sélectionne** parmi les lymphocytes ceux dont le récepteur lui est **complémentaire**. Ces lymphocytes **se multiplient** (prolifération clonale) puis **se différencient** en cellules effectrices et en cellules mémoire. L’antigène **ne crée pas** le récepteur : il choisit.',
        },
      ],
    },
    { type: 'svg', svg: svgClonale, caption: 'Principe de la sélection clonale.' },
    { type: 'h3', text: '3.2 L’immunité humorale : LB, plasmocytes et anticorps' },
    {
      type: 'p',
      text: 'Un LB dont le récepteur reconnaît un antigène (et activé avec l’aide de LT CD4) prolifère et se différencie en **plasmocytes**, cellules sécrétrices de grandes quantités d’**anticorps**, tous de même spécificité (le clone), et en **LB mémoire**.',
    },
    { type: 'svg', svg: svgAnticorps, caption: 'Structure d’un anticorps (immunoglobuline G) : 2 chaînes lourdes, 2 chaînes légères, 2 sites de fixation de l’antigène.' },
    {
      type: 'p',
      text: 'Les anticorps sont des protéines (immunoglobulines) présentes dans le **sang et la lymphe** (immunité **humorale**). Un anticorps se fixe sur son antigène par complémentarité de forme, formant un **complexe immun**. Ce complexe :\n- **neutralise** toxines et virus (ils ne peuvent plus se fixer sur les cellules) ;\n- **agglutine** les pathogènes ;\n- favorise la **phagocytose** (**opsonisation**) : les phagocytes reconnaissent la partie constante de l’anticorps ;\n- active le **complément**, qui perfore ou lyse certains pathogènes.',
    },
    {
      type: 'callout',
      variant: 'warning',
      content: [
        {
          type: 'p',
          text: 'Les anticorps **n’éliminent pas** eux-mêmes les pathogènes : ils les neutralisent et les marquent pour leur destruction par les phagocytes ou le complément. Ils agissent hors des cellules ; ils ne peuvent pas atteindre un virus **à l’intérieur** d’une cellule.',
        },
      ],
    },
    { type: 'h3', text: '3.3 L’immunité cellulaire : les LT CD8' },
    {
      type: 'p',
      text: 'Les virus et certaines bactéries se multiplient **dans** les cellules. Celles-ci présentent à leur surface, avec des molécules du CMH de classe I, des fragments de protéines du pathogène. Un **LT CD8** dont le TCR reconnaît ce complexe (et qui a été activé avec l’aide de LT CD4) prolifère puis se différencie en **LT cytotoxiques**. Ceux-ci s’attachent à la cellule infectée et libèrent de la **perforine** (qui perce la membrane) et des **granzymes** qui déclenchent l’**apoptose**. Le même mécanisme élimine certaines cellules tumorales. C’est l’immunité à **médiation cellulaire**, car ce sont des cellules, et non des anticorps, qui agissent.',
    },
    { type: 'h3', text: '3.4 Les LT CD4 : les chefs d’orchestre' },
    {
      type: 'p',
      text: 'Un **LT CD4** reconnaît, grâce à son TCR, un peptide présenté par une **cellule présentatrice d’antigène** (CMH de classe II). Activé, il prolifère et se différencie en **LT auxiliaires** qui sécrètent des **interleukines** (par exemple IL-2) nécessaires à l’activation et à la prolifération des LB et des LT CD8. Le LT CD4 ne détruit pas le pathogène, mais coordonne les réponses humorale et cellulaire.',
    },
    { type: 'svg', svg: svgCooperation, caption: 'Coopération cellulaire dans la réponse adaptative.' },
    { type: 'widget', id: 'immune-response', title: 'Simulation : réponse immunitaire', caption: 'Observer les phases innée et adaptative, puis comparer réponse primaire et réponse secondaire.' },
    {
      type: 'table',
      headers: ['Cellule', 'Rôle', 'Cible / action'],
      rows: [
        ['Mastocyte', 'inflammation', 'libère histamine et cytokines'],
        ['Macrophage, neutrophile', 'phagocytose (innée)', 'détruit les pathogènes ; macrophage : présente des antigènes'],
        ['Cellule dendritique', 'présentation d’antigène', 'active les LT naïfs'],
        ['LB / plasmocyte', 'immunité humorale', 'plasmocyte : sécrète les anticorps'],
        ['LT CD4', 'coordination', 'sécrète des interleukines'],
        ['LT CD8 cytotoxique', 'immunité cellulaire', 'tue les cellules infectées / tumorales'],
      ],
    },

    { type: 'h2', text: '4. La mémoire immunitaire' },
    {
      type: 'p',
      text: 'Lors de la réponse primaire (1er contact avec l’antigène), l’apparition d’anticorps est retardée (latence de 5 à 7 jours), leur taux reste modéré. Une partie des lymphocytes sélectionnés se différencie en **cellules mémoire**, à longue durée de vie (des années, parfois toute la vie). Lors d’un **second contact** avec le même antigène, ces cellules, plus nombreuses et plus facilement activées, déclenchent une **réponse secondaire**.',
    },
    { type: 'svg', svg: svgReponse, caption: 'Réponses primaire et secondaire : la seconde est plus précoce, plus intense et plus durable.' },
    {
      type: 'table',
      headers: ['', 'Réponse primaire', 'Réponse secondaire'],
      rows: [
        ['Délai', '5 à 7 jours (latence)', '1 à 3 jours'],
        ['Intensité', 'faible à modérée', 'beaucoup plus élevée (souvent 10 à 100 fois)'],
        ['Durée', 'brève', 'plus longue'],
        ['Anticorps', 'surtout IgM puis IgG', 'surtout IgG, d’affinité plus grande'],
        ['Cellules', 'lymphocytes naïfs', 'lymphocytes mémoire'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      content: [
        {
          type: 'p',
          text: 'La mémoire est **spécifique** : un second contact avec un antigène **différent** déclenche une réponse primaire contre ce nouvel antigène. Elle explique qu’on n’a généralement la rougeole qu’une fois.',
        },
      ],
    },

    { type: 'h2', text: '5. Vaccination et immunité de groupe' },
    { type: 'h3', text: '5.1 Le principe de la vaccination' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Vaccination',
      content: [
        {
          type: 'p',
          text: 'La **vaccination** consiste à introduire dans l’organisme un **antigène inoffensif** (le vaccin) pour provoquer une réponse immunitaire primaire et la formation de **cellules mémoire**, **sans** déclencher la maladie. En cas de contact ultérieur avec le vrai pathogène, la **réponse secondaire** est rapide et efficace : l’infection est évitée ou atténuée.',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Type de vaccin', 'Principe', 'Exemples'],
      rows: [
        ['Vivant atténué', 'agent infectieux affaibli, ne provoque pas la maladie', 'rougeole-oreillons-rubéole (ROR), BCG, varicelle'],
        ['Inactivé / tué', 'agent entier tué', 'grippe (inactivé), hépatite A, poliomyélite (injectable)'],
        ['Sous-unité / anatoxine', 'fragment du pathogène ou toxine inactivée', 'tétanos, diphtérie, coqueluche, papillomavirus'],
        ['ARN messager', 'ARNm codant un antigène du virus, produit par nos cellules', 'vaccins contre le Covid-19'],
      ],
    },
    {
      type: 'p',
      text: 'Un vaccin peut contenir un **adjuvant**, substance qui stimule l’immunité innée et renforce la réponse. Des **rappels** sont souvent nécessaires pour entretenir la mémoire. L’efficacité de la vaccination est documentée depuis **Jenner** (1796, variole) et **Pasteur** (charbon 1881, rage 1885). La **variole** a été **éradiquée** en 1980 grâce à la vaccination.',
    },
    { type: 'h3', text: '5.2 Vaccination et sérothérapie' },
    {
      type: 'table',
      headers: ['', 'Vaccination (immunité active)', 'Sérothérapie (immunité passive)'],
      rows: [
        ['Principe', 'injection de l’antigène', 'injection d’anticorps déjà fabriqués (sérum)'],
        ['Délai d’action', 'plusieurs jours', 'immédiat'],
        ['Durée', 'longue (mémoire)', 'courte (quelques semaines)'],
        ['Usage', 'préventif', 'curatif / urgence (venins, tétanos, rage…)'],
      ],
    },
    { type: 'h3', text: '5.3 L’immunité de groupe (ou collective)' },
    {
      type: 'p',
      text: 'Un individu vacciné ne peut plus transmettre la maladie : lorsque la **proportion d’immunisés** dans une population est suffisante, la circulation du pathogène s’interrompt et les **personnes non vaccinées sont indirectement protégées** (nourrissons, personnes immunodéprimées).',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Seuil d’immunité de groupe',
      content: [
        {
          type: 'p',
          text: 'Le **taux de reproduction de base** $R_0$ est le nombre moyen de personnes contaminées par un malade dans une population entièrement sensible. L’épidémie recule si chaque malade en contamine moins d’un, ce qui se produit si la proportion d’immunisés dépasse\n$$S = 1 - \\frac{1}{R_0}$$\nExemples : rougeole $R_0 \\approx 12$ à $18$ → seuil d’environ 92 à 95 % ; Covid-19 (souche initiale) $R_0 \\approx 2{,}5$ à $3$ → 60 à 67 %.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Obligation vaccinale',
      content: [
        {
          type: 'p',
          text: 'En France, 11 vaccins sont obligatoires pour les nourrissons nés depuis 2018 (diphtérie, tétanos, poliomyélite, coqueluche, Haemophilus influenzae b, hépatite B, pneumocoque, méningocoque C, rougeole, oreillons, rubéole). Une baisse de la couverture vaccinale favorise le **retour d’épidémies** (rougeole).',
        },
      ],
    },

    { type: 'h2', text: '6. Quand l’immunité est défaillante : le VIH' },
    {
      type: 'p',
      text: 'Le virus de l’immunodéficience humaine (VIH) infecte principalement les **LT CD4** (qui portent la molécule CD4 servant de récepteur au virus) et les détruit. Le nombre de LT CD4 diminue progressivement pendant plusieurs années. Comme les LT CD4 coordonnent les réponses humorale et cellulaire, l’immunité adaptative devient défaillante : en dessous d’environ 200 LT CD4 par mm³ de sang (normale : 500 à 1 500), des **infections opportunistes** et certains cancers apparaissent : c’est le **SIDA**. Les traitements antirétroviraux bloquent la multiplication du virus et permettent de vivre normalement, mais ne guérissent pas.',
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Bilan',
      content: [
        {
          type: 'list',
          items: [
            'Innée : rapide, non spécifique, sans mémoire (inflammation, phagocytose).',
            'Adaptative : spécifique, plus lente, avec mémoire (sélection clonale ; humorale : LB, plasmocytes, anticorps ; cellulaire : LT CD8 ; coordination : LT CD4).',
            'La vaccination exploite la mémoire ; l’immunité de groupe protège ceux qui ne peuvent pas être vaccinés.',
          ],
        },
      ],
    },
  ],
  exercices: [
    {
      id: 'ex-inflammation',
      title: 'Une écharde dans le doigt',
      difficulty: 1,
      duration: 15,
      tags: ['inflammation', 'immunité innée'],
      statement: [
        {
          type: 'p',
          text: 'Une personne se plante une écharde sous l’ongle. Après quelques heures, la zone est rouge, chaude, gonflée et douloureuse. Quelques jours plus tard, un liquide jaunâtre s’en écoule. On compte les polynucléaires neutrophiles dans le sang et dans le tissu atteint :',
        },
        {
          type: 'table',
          headers: ['Temps (h)', '0', '2', '6', '12', '24'],
          rows: [
            ['Neutrophiles sanguins (milliers/mm³)', '5', '6', '8', '9', '7'],
            ['Neutrophiles dans le tissu (unités arbitraires)', '0', '10', '60', '120', '80'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Nommer les quatre signes de la réaction observée et leur donner une origine.',
            'Décrire et interpréter l’évolution des neutrophiles.',
            'Quelle est la nature du liquide jaunâtre ?',
            'Quel est le caractère de cette réponse (spécifique / non spécifique) ? Justifier.',
          ],
        },
      ],
      hints: ['Pensez à la vasodilatation et à la perméabilité des capillaires.', 'Sortie des cellules du sang vers le tissu : quel nom ?'],
      solution: [
        { type: 'p', text: '**1.** **Rougeur** et **chaleur** : vasodilatation (afflux de sang) ; **gonflement** (œdème) : augmentation de la perméabilité, le plasma passe dans le tissu ; **douleur** : action de médiateurs sur les terminaisons nerveuses et compression par l’œdème. Ces effets sont provoqués par l’histamine et les cytokines libérées par les mastocytes et les macrophages.' },
        { type: 'p', text: '**2.** Les neutrophiles augmentent dans le sang (5 → 9) et surtout dans le tissu (0 → 120 à 12 h) : ils sont attirés par des médiateurs (chimiotactisme) et traversent la paroi des capillaires (**diapédèse**). Leur nombre diminue ensuite (24 h) quand le pathogène est éliminé et que l’inflammation s’éteint.' },
        { type: 'p', text: '**3.** C’est du **pus**, constitué de phagocytes (neutrophiles) morts, de débris cellulaires et de bactéries.' },
        { type: 'p', text: '**4.** Réponse **non spécifique** (innée) : elle ne dépend pas de l’identité du micro-organisme, elle se déclenche en quelques heures et se produit de la même façon à chaque fois.' },
      ],
    },
    {
      id: 'ex-opsonisation',
      title: 'Anticorps et phagocytose',
      difficulty: 2,
      duration: 20,
      tags: ['phagocytose', 'anticorps', 'opsonisation'],
      statement: [
        {
          type: 'p',
          text: 'On mélange des macrophages et des bactéries *Streptococcus pneumoniae* et on mesure, après 30 minutes, le pourcentage de bactéries phagocytées.',
        },
        {
          type: 'table',
          headers: ['Condition', 'Bactéries phagocytées (%)'],
          rows: [
            ['Bactéries seules + macrophages', '10'],
            ['+ sérum d’une souris immunisée contre *S. pneumoniae*', '75'],
            ['+ sérum d’une souris non immunisée', '12'],
            ['+ sérum immun préalablement absorbé par des bactéries *S. pneumoniae*', '11'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Montrer que le sérum immun contient un facteur qui stimule la phagocytose.',
            'Justifier que ce facteur est spécifique des bactéries étudiées.',
            'Identifier ce facteur et nommer le phénomène.',
            'Faire le lien entre immunité innée et immunité adaptative.',
          ],
        },
      ],
      hints: ['Comparez les lignes 1, 2 et 3.', 'L’absorption par les bactéries retire de ce sérum ce qui se fixe sur elles.'],
      solution: [
        { type: 'p', text: '**1.** Avec le sérum immun, le pourcentage passe de 10 à 75 % ; le sérum d’une souris non immunisée a peu d’effet (12 %) : le sérum de la souris immunisée contient un facteur absent du sérum non immunisé.' },
        { type: 'p', text: '**2.** Quand le sérum immun est absorbé par les bactéries, il perd son effet (11 %) : le facteur se fixe sur ces bactéries et est retiré du sérum : il leur est spécifique.' },
        { type: 'p', text: '**3.** Ce sont des **anticorps** (produits par les plasmocytes lors de l’immunisation) qui se fixent sur les bactéries et facilitent leur reconnaissance par les macrophages : c’est l’**opsonisation**.' },
        { type: 'p', text: '**4.** La phagocytose (immunité innée) est rendue beaucoup plus efficace par des anticorps (immunité adaptative) : les deux immunités coopèrent ; réciproquement, les phagocytes présentent des antigènes aux LT et déclenchent la réponse adaptative.' },
      ],
    },
    {
      id: 'ex-primaire-secondaire',
      title: 'Réponse primaire et secondaire',
      difficulty: 2,
      duration: 25,
      tags: ['mémoire', 'anticorps', 'courbe'],
      statement: [
        {
          type: 'p',
          text: 'Des souris reçoivent au jour 0 une injection de l’antigène A. Au jour 28, on leur injecte A **et** un autre antigène B. On dose les anticorps spécifiques (unités arbitraires) :',
        },
        {
          type: 'table',
          headers: ['Jour', '0', '7', '14', '21', '28', '31', '35', '42'],
          rows: [
            ['Anticorps anti-A', '0', '5', '40', '25', '15', '400', '1 000', '800'],
            ['Anticorps anti-B', '0', '0', '0', '0', '0', '0', '10', '40'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Comparer la réponse à A après la 1re et la 2e injection (délai, intensité).',
            'Pourquoi la réponse à B après le jour 28 ressemble-t-elle à une réponse primaire ?',
            'Quelle propriété de l’immunité adaptative ces résultats illustrent-ils ? Expliquer le mécanisme cellulaire.',
            'Quel intérêt pour la vaccination ?',
          ],
        },
      ],
      hints: ['Regardez le taux 3 jours après la 2e injection pour A et pour B.', 'Quelles cellules persistent après la 1re réponse ?'],
      solution: [
        { type: 'p', text: '**1.** Après la 1re injection : délai de 5 à 7 jours (5 au jour 7), maximum de 40 au jour 14. Après la 2e : le taux est déjà de 400 en 3 jours, et atteint 1 000 en 7 jours, soit environ 25 fois le maximum de la réponse primaire : réponse **plus rapide, plus intense, plus durable** (800 au jour 42).' },
        { type: 'p', text: '**2.** B est un antigène nouveau : sa première rencontre déclenche une réponse primaire (apparition tardive des anticorps, taux faible : 10 puis 40).' },
        { type: 'p', text: '**3.** **La mémoire immunitaire est spécifique** de l’antigène. Lors de la 1re réponse, des LB mémoire anti-A (à longue durée de vie) se sont formés : plus nombreux que les LB naïfs, ils sont rapidement activés lors du second contact et se différencient en plasmocytes.' },
        { type: 'p', text: '**4.** Le vaccin provoque une réponse primaire sans maladie : si le vrai pathogène se présente, la réponse secondaire rapide et forte l’élimine avant l’apparition de symptômes. Le rappel de vaccin renforce cette mémoire.' },
      ],
    },
    {
      id: 'ex-selection-clonale',
      title: 'Sélection clonale : une expérience célèbre',
      difficulty: 3,
      duration: 25,
      tags: ['sélection clonale', 'expérience', 'lymphocyte'],
      statement: [
        {
          type: 'p',
          text: 'Expérience (inspirée de travaux d’Ada, 1969). Des lymphocytes d’une souris naïve sont incubés avec de l’antigène X marqué par un isotope **très fortement** radioactif (qui tue les cellules sur lesquelles il se fixe). Les lymphocytes survivants sont injectés à une souris dont le système immunitaire a été détruit. Ensuite, on lui injecte les antigènes X et Y, et on dose les anticorps :',
        },
        {
          type: 'table',
          headers: ['Souris receveuse', 'Anticorps anti-X', 'Anticorps anti-Y'],
          rows: [
            ['Lymphocytes non traités', 'élevé', 'élevé'],
            ['Lymphocytes traités avec X radioactif', 'très faible', 'élevé'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Expliquer pourquoi le traitement par X radioactif supprime la réponse anti-X.',
            'Pourquoi la réponse anti-Y reste-t-elle normale ?',
            'Que montre cette expérience sur l’origine de la spécificité des lymphocytes : l’antigène la crée-t-il ou la sélectionne-t-il ?',
            'Schématiser en quelques lignes le principe de la sélection clonale.',
          ],
        },
      ],
      hints: ['Quels lymphocytes fixent X ?', 'Si l’antigène « instruisait » les lymphocytes, la réponse à X serait-elle restaurée ?'],
      solution: [
        { type: 'p', text: '**1.** Les lymphocytes portant un récepteur spécifique de X se fixent sur l’antigène radioactif et sont **tués**. Après traitement, la souris receveuse n’a plus de lymphocytes capables de reconnaître X : plus de réponse anti-X.' },
        { type: 'p', text: '**2.** Les lymphocytes spécifiques de Y, qui ne fixent pas X, ont survécu : la réponse anti-Y est normale.' },
        { type: 'p', text: '**3.** Les lymphocytes spécifiques de X existent **avant** le contact avec X (ils sont éliminés par X radioactif) ; si X induisait la spécificité de n’importe quel lymphocyte, la souris pourrait répondre à X après élimination de quelques cellules, ce qui n’est pas observé. L’antigène **sélectionne** donc des lymphocytes préexistants dont le récepteur lui est complémentaire.' },
        { type: 'p', text: '**4.** Répertoire de lymphocytes tous différents → rencontre d’un antigène → sélection du (ou des) lymphocyte(s) à récepteur complémentaire → **prolifération clonale** → **différenciation** en cellules effectrices (plasmocytes, LT cytotoxiques) et cellules mémoire.' },
      ],
    },
    {
      id: 'ex-lt8',
      title: 'Immunité humorale ou cellulaire ?',
      difficulty: 3,
      duration: 30,
      tags: ['LT CD8', 'immunité cellulaire', 'type bac'],
      statement: [
        {
          type: 'p',
          text: 'D’après des expériences classiques (simplifiées), on infecte des souris de souche A avec un virus V. On prélève 7 jours plus tard des lymphocytes T CD8 et du sérum, que l’on met en contact pendant 4 heures avec différentes cellules cibles, et on mesure le pourcentage de cellules cibles détruites.',
        },
        {
          type: 'table',
          headers: ['Mélange', 'Cellules cibles détruites (%)'],
          rows: [
            ['LT CD8 de souris infectée (souche A) + cellules de souche A infectées par V', '70'],
            ['LT CD8 de souris infectée (souche A) + cellules de souche A non infectées', '5'],
            ['LT CD8 de souris infectée (souche A) + cellules de souche B infectées par V', '6'],
            ['LT CD8 de souris non infectée (souche A) + cellules de souche A infectées par V', '4'],
            ['Sérum de souris infectée (souche A) + cellules de souche A infectées par V', '3'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quelle conclusion tirer des lignes 1, 2 et 4 ?',
            'Que montrent les lignes 1 et 3 ? (Souches A et B ont des molécules du CMH différentes.)',
            'Que montre la ligne 5 ? Cela signifie-t-il que les anticorps ne servent à rien contre ce virus ?',
            'Rédiger un texte de synthèse (10 lignes) sur le mode d’action des LT CD8 et sur les conditions de leur activation.',
          ],
        },
      ],
      hints: ['Les lignes 1 et 4 diffèrent par l’origine des LT.', 'Pensez à la reconnaissance du complexe CMH-peptide viral.'],
      solution: [
        { type: 'p', text: '**1.** Les LT CD8 de souris **infectée** détruisent massivement (70 %) les cellules infectées, mais pas les cellules non infectées (5 %) ; ceux d’une souris non infectée ne le font pas (4 %) : ces LT sont **spécifiques du virus**, et leur activation nécessite le contact préalable avec l’antigène viral.' },
        { type: 'p', text: '**2.** Les LT CD8 de la souris A n’éliminent pas les cellules infectées de souche B (6 %) : ils reconnaissent le peptide viral **associé aux molécules du CMH de la souche A** : la reconnaissance nécessite le complexe peptide-CMH (« double reconnaissance »).' },
        { type: 'p', text: '**3.** Le sérum seul ne détruit pas les cellules infectées (3 %) : en l’absence de cellules effectrices, les anticorps ne détruisent pas les cellules déjà infectées. L’élimination des cellules infectées repose sur l’**immunité cellulaire**. Les anticorps restent utiles : ils neutralisent les virus libres avant leur entrée dans des cellules et favorisent leur phagocytose ; ils ne remplacent pas les LT CD8.' },
        { type: 'p', text: '**4.** Synthèse : un virus infecte une cellule qui présente des peptides viraux avec le CMH I ; un LT CD8 dont le TCR est complémentaire est sélectionné, activé (avec les interleukines des LT CD4 activés par des cellules présentatrices) puis prolifère et se différencie en LT cytotoxiques et en LT mémoire ; ces LT cytotoxiques reconnaissent le complexe CMH-peptide, libèrent perforine et granzymes et provoquent l’apoptose des cellules infectées, ce qui arrête la production de virus.' },
      ],
    },
    {
      id: 'ex-groupe',
      title: 'Couverture vaccinale et rougeole',
      difficulty: 2,
      duration: 20,
      tags: ['immunité de groupe', 'R0', 'calcul'],
      statement: [
        {
          type: 'p',
          text: 'La rougeole a un taux de reproduction de base $R_0 \\approx 15$. Le vaccin protège 97 % des personnes vaccinées avec deux doses.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la proportion minimale de personnes immunisées nécessaire pour interrompre la circulation du virus.',
            'Quelle couverture vaccinale faut-il atteindre en tenant compte de l’efficacité de 97 % ?',
            'Dans une région où 80 % de la population est vaccinée, déterminer le nombre moyen de personnes contaminées par un malade ($R_{eff}$). Une épidémie peut-elle se propager ?',
            'Expliquer pourquoi la vaccination protège aussi des nourrissons trop jeunes pour être vaccinés.',
          ],
        },
      ],
      hints: ['Seuil : $1 - 1/R_0$.', 'La proportion immunisée = couverture × efficacité.', '$R_{eff} = R_0 \\times (1 - \\text{proportion immunisée})$.'],
      solution: [
        { type: 'p', text: '**1.** $S = 1 - \\dfrac{1}{15} = \\dfrac{14}{15} \\approx 0{,}933$ : au moins **93,3 %** de la population doit être immunisée.' },
        { type: 'p', text: '**2.** Proportion d’immunisés = couverture × 0,97 ≥ 0,933 ⇒ couverture ≥ $0{,}933/0{,}97 \\approx 0{,}962$ : il faut environ **96 %** de couverture vaccinale.' },
        { type: 'p', text: '**3.** Immunisés : $0{,}80 \\times 0{,}97 = 0{,}776$. $R_{eff} = 15 \\times (1 - 0{,}776) = 15 \\times 0{,}224 \\approx 3{,}4 > 1$ : chaque malade contamine en moyenne 3 à 4 personnes : l’épidémie **peut se propager**.' },
        { type: 'p', text: '**4.** Quand la majorité de la population est immunisée, le virus circule très peu : les nourrissons non vaccinés sont rarement en contact avec un malade : c’est l’**immunité de groupe** (protection collective).' },
      ],
    },
    {
      id: 'ex-vih',
      title: 'Évolution de l’infection par le VIH',
      difficulty: 2,
      duration: 20,
      tags: ['VIH', 'LT CD4', 'SIDA'],
      statement: [
        {
          type: 'p',
          text: 'Évolution moyenne, non traitée, de la charge virale (copies de virus par mL de sang) et du nombre de LT CD4 chez un patient :',
        },
        {
          type: 'table',
          headers: ['Temps après infection', '3 sem.', '3 mois', '2 ans', '5 ans', '8 ans', '10 ans'],
          rows: [
            ['Charge virale', '10 000 000', '50 000', '30 000', '60 000', '300 000', '2 000 000'],
            ['LT CD4 (/mm³)', '800', '650', '600', '450', '250', '100'],
            ['Anticorps anti-VIH', 'apparition', 'élevés', 'élevés', 'élevés', 'élevés', 'en baisse'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Décrire l’évolution de la charge virale et des LT CD4.',
            'Expliquer pourquoi la charge virale chute après les 3 premières semaines.',
            'Expliquer pourquoi l’immunité est défaillante à 10 ans, sachant que le VIH infecte et détruit les LT CD4.',
            'Citer deux conséquences pour le patient.',
          ],
        },
      ],
      hints: ['Que se passe-t-il quand la réponse adaptative se met en place ?', 'Quel rôle jouent les LT CD4 ?'],
      solution: [
        { type: 'p', text: '**1.** Charge virale très élevée en début d’infection, chute (3 mois), reste basse plusieurs années (phase asymptomatique), puis remonte fortement. LT CD4 : 800 → 650 → 600 → 450 → 250 → 100 : diminution progressive, accélérée à la fin.' },
        { type: 'p', text: '**2.** La réponse immunitaire adaptative (anticorps, LT CD8 cytotoxiques détruisant les cellules infectées) se met en place et limite la multiplication du virus : charge virale en baisse ; le virus n’est cependant pas éliminé (il persiste dans des cellules réservoirs).' },
        { type: 'p', text: '**3.** Les LT CD4 sécrètent les interleukines nécessaires à l’activation des LB et des LT CD8 : leur disparition (100/mm³ contre 500 à 1 500 normalement) rend les réponses humorale et cellulaire très inefficaces, le virus se multiplie alors sans contrôle (charge virale élevée) : syndrome d’immunodéficience acquise (SIDA).' },
        { type: 'p', text: '**4.** Infections opportunistes (pneumocystose, tuberculose, toxoplasmose…) et certains cancers (sarcome de Kaposi, lymphomes). Les traitements antirétroviraux bloquent la multiplication du virus, ce qui permet la remontée du nombre de LT CD4 et empêche l’évolution vers le SIDA.' },
      ],
    },
    {
      id: 'ex-bac-vaccin',
      title: 'Type bac : comment un vaccin protège-t-il ?',
      difficulty: 3,
      duration: 35,
      tags: ['type bac', 'vaccination', 'mémoire'],
      statement: [
        {
          type: 'p',
          text: 'On étudie la protection conférée par la vaccination antitétanique. Des cobayes reçoivent par injection : lot 1, rien ; lot 2, l’anatoxine tétanique (toxine inactivée, non toxique) à J0 et J28. À J60, on injecte à tous les lots une dose de toxine tétanique normalement mortelle.',
        },
        {
          type: 'table',
          headers: ['Lot', 'Traitement', 'Anticorps antitoxine à J59 (unités)', 'Devenir après la toxine'],
          rows: [
            ['1', 'aucun', '0', 'mort en 4 jours'],
            ['2', 'anatoxine à J0 et J28', '150', 'survie, sans symptômes'],
            ['3', 'sérum prélevé sur un cobaye du lot 2, injecté à J59 (sans anatoxine)', '120', 'survie sans symptômes'],
            ['4', 'lymphocytes prélevés sur un cobaye du lot 2, tués, sans anticorps, injectés à J59', '0', 'mort en 4 jours'],
          ],
        },
        {
          type: 'p',
          text: 'Par ailleurs, la protection conférée aux cobayes du lot 3 disparaît en quelques semaines, alors que celle du lot 2 persiste plusieurs mois.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Montrer que la protection du lot 2 est liée à la présence d’anticorps.',
            'Pourquoi les lymphocytes du lot 4 n’apportent-ils pas de protection ? Que faudrait-il pour tester leur rôle dans la mémoire ?',
            'Expliquer la différence de durée de protection entre les lots 2 et 3.',
            'Expliquer, avec un schéma ou un texte, les mécanismes cellulaires responsables de la protection du lot 2 depuis la première injection.',
          ],
        },
      ],
      hints: ['Comparez les lots 2, 3 et 1.', 'Le lot 3 reçoit des anticorps mais pas de cellules qui en fabriquent.'],
      solution: [
        { type: 'p', text: '**1.** Les lots protégés (2 et 3) ont des anticorps (150 et 120), les lots non protégés (1 et 4) n’en ont pas. Surtout, le lot 3 est protégé par le simple transfert de sérum, qui contient les anticorps et pas de cellules : les anticorps sont donc suffisants pour la protection.' },
        { type: 'p', text: '**2.** Les lymphocytes du lot 4 sont tués : ils ne peuvent ni se multiplier ni se différencier en plasmocytes. Pour tester le rôle des cellules mémoire, il faudrait injecter des lymphocytes **vivants** du lot 2 : à l’arrivée de la toxine, ils produiraient rapidement des anticorps (réponse secondaire).' },
        { type: 'p', text: '**3.** Lot 3 : immunité **passive** : les anticorps injectés sont peu à peu éliminés (et aucune cellule ne peut les remplacer). Lot 2 : immunité **active** : des **cellules mémoire** persistent et, en cas de nouveau contact avec la toxine, produisent rapidement beaucoup d’anticorps.' },
        { type: 'p', text: '**4.** Lors de la première injection d’anatoxine : sélection clonale des LB spécifiques (avec l’aide des LT CD4 activés par des cellules présentatrices), prolifération, différenciation en plasmocytes sécréteurs d’anticorps (réponse primaire) et en LB mémoire. La deuxième injection (J28) active la mémoire : réponse secondaire intense, qui laisse davantage de cellules mémoire. À J60, la toxine est neutralisée par les anticorps déjà présents, puis par une réponse secondaire rapide : l’animal est protégé.' },
      ],
    },
  ],
  representations: [
    { type: 'widget', id: 'immune-response', title: 'Réponse immunitaire interactive', caption: 'Explorez la réponse innée, la réponse adaptative et la mémoire (première puis seconde exposition).' },
    { type: 'svg', svg: svgInflammation, caption: 'Inflammation : rougeur, chaleur, gonflement, douleur.' },
    { type: 'svg', svg: svgCooperation, caption: 'Coopération cellulaire dans la réponse adaptative.' },
    { type: 'svg', svg: svgAnticorps, caption: 'L’anticorps : structure et fonctions.' },
    { type: 'svg', svg: svgReponse, caption: 'Courbe de réponse primaire et secondaire.' },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Quelle cellule est un phagocyte ?',
          choices: ['le plasmocyte', 'le macrophage', 'le LT CD8', 'le globule rouge'],
          answer: 1,
        },
        {
          question: 'Quel est le rôle de l’histamine dans l’inflammation ?',
          choices: ['elle tue les bactéries', 'elle provoque vasodilatation et augmentation de la perméabilité', 'elle fabrique des anticorps', 'elle présente l’antigène'],
          answer: 1,
        },
        {
          question: 'La diapédèse est :',
          choices: ['la digestion d’une bactérie', 'le passage des leucocytes à travers la paroi des capillaires', 'la sécrétion d’anticorps', 'la division d’un lymphocyte'],
          answer: 1,
        },
        {
          question: 'Les plasmocytes sont :',
          choices: ['des LT CD8', 'des LB différenciés sécréteurs d’anticorps', 'des macrophages', 'des cellules cancéreuses'],
          answer: 1,
        },
        {
          question: 'Les LT CD8 cytotoxiques :',
          choices: ['sécrètent des anticorps', 'détruisent les cellules infectées', 'phagocytent les bactéries', 'produisent l’histamine'],
          answer: 1,
        },
        {
          question: 'Les LT CD4 :',
          choices: ['sont détruits par le VIH et coordonnent la réponse adaptative', 'sont des plasmocytes', 'sont des phagocytes', 'sont des anticorps'],
          answer: 0,
        },
        {
          question: 'La sélection clonale signifie que :',
          choices: ['l’antigène crée de nouveaux récepteurs', 'l’antigène sélectionne les lymphocytes dont le récepteur lui est complémentaire', 'tous les lymphocytes répondent', 'les anticorps se clonent'],
          answer: 1,
        },
        {
          question: 'La réponse secondaire est :',
          choices: ['plus lente et plus faible', 'plus rapide et plus intense', 'identique à la primaire', 'inexistante'],
          answer: 1,
        },
        {
          question: 'Pour R0 = 4, le seuil d’immunité de groupe est :',
          choices: ['25 %', '50 %', '75 %', '96 %'],
          answer: 2,
          explanation: '1 − 1/4 = 0,75.',
        },
        {
          question: 'Le sérum contenant des anticorps est utilisé en :',
          choices: ['vaccination', 'sérothérapie', 'chirurgie', 'dépistage'],
          answer: 1,
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Immunité innée', back: 'Défense immédiate, non spécifique, sans mémoire : barrières, inflammation, phagocytose.' },
        { front: 'Inflammation : 4 signes', back: 'Rougeur, chaleur, gonflement (œdème), douleur.' },
        { front: 'Diapédèse', back: 'Traversée de la paroi des capillaires par les leucocytes.' },
        { front: 'Phagocytose', back: 'Englobement (phagosome) et digestion (lysosomes) d’un pathogène par un phagocyte.' },
        { front: 'Immunité adaptative', back: 'Spécifique de l’antigène, plus lente, avec mémoire.' },
        { front: 'Sélection clonale', back: 'L’antigène sélectionne le lymphocyte au récepteur complémentaire, qui prolifère et se différencie.' },
        { front: 'Plasmocyte', back: 'LB différencié sécrétant des anticorps.' },
        { front: 'Anticorps', back: 'Protéine (immunoglobuline) qui se fixe sur un antigène : neutralisation, agglutination, opsonisation, complément.' },
        { front: 'LT CD8', back: 'Devient LT cytotoxique : détruit les cellules infectées (perforine, granzymes).' },
        { front: 'LT CD4', back: 'Auxiliaire : sécrète des interleukines qui activent LB et LT CD8 ; cible du VIH.' },
        { front: 'CMH', back: 'Molécules de présentation d’antigène à la surface des cellules.' },
        { front: 'Cellules mémoire', back: 'LB et LT à longue durée de vie : réponse secondaire rapide et intense.' },
        { front: 'Vaccination', back: 'Injection d’un antigène inoffensif pour former des cellules mémoire sans maladie.' },
        { front: 'Seuil d’immunité de groupe', back: '1 − 1/R0.' },
        { front: 'Sérothérapie', back: 'Injection d’anticorps : immunité passive, immédiate mais brève.' },
      ],
    },
    {
      type: 'cloze',
      title: 'La réponse adaptative',
      text: 'Un antigène {{sélectionne}} le lymphocyte dont le {{récepteur}} lui est complémentaire. Un LB se différencie en {{plasmocyte}}, qui sécrète des {{anticorps}}. Les LT {{CD8}} détruisent les cellules infectées. Les LT {{CD4}} sécrètent des {{interleukines}} qui coordonnent la réponse.',
    },
    {
      type: 'matching',
      title: 'Associer cellule et rôle',
      pairs: [
        { left: 'Mastocyte', right: 'Libère l’histamine' },
        { left: 'Macrophage', right: 'Phagocyte présentateur d’antigène' },
        { left: 'Plasmocyte', right: 'Sécrète les anticorps' },
        { left: 'LT CD8 cytotoxique', right: 'Détruit les cellules infectées' },
        { left: 'LT CD4', right: 'Sécrète des interleukines (coordination)' },
      ],
    },
    {
      type: 'ordering',
      title: 'Étapes de l’inflammation et de la réponse',
      items: [
        'Franchissement de la barrière cutanée par des bactéries',
        'Libération d’histamine et de cytokines',
        'Vasodilatation et augmentation de la perméabilité des capillaires',
        'Diapédèse et phagocytose par les leucocytes',
        'Présentation de l’antigène et activation des lymphocytes',
        'Production d’anticorps et de LT cytotoxiques, formation de cellules mémoire',
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'L’immunité innée est spécifique de chaque pathogène.', answer: false, explanation: 'Elle est non spécifique.' },
        { text: 'Les anticorps sont produits par les plasmocytes.', answer: true },
        { text: 'Les LT CD8 peuvent détruire des cellules infectées par un virus.', answer: true },
        { text: 'Le VIH détruit les LT CD4.', answer: true },
        { text: 'Un vaccin contient toujours le virus vivant.', answer: false, explanation: 'Il existe des vaccins inactivés, des sous-unités et à ARNm.' },
        { text: 'La sérothérapie donne une immunité de longue durée.', answer: false, explanation: 'Immunité passive, brève.' },
        { text: 'L’immunité de groupe protège aussi les personnes non vaccinées.', answer: true },
      ],
    },
  ],
}

export default chapter
