import type { Chapter } from '../types'

const svgArbre =
  '<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">' +
  '<g stroke="currentColor" stroke-width="1.5" fill="none"><line x1="150" y1="60" x2="370" y2="60"/><line x1="260" y1="60" x2="260" y2="140"/><line x1="100" y1="140" x2="420" y2="140"/>' +
  '<line x1="100" y1="140" x2="100" y2="170"/><line x1="260" y1="140" x2="260" y2="170"/><line x1="420" y1="140" x2="420" y2="170"/></g>' +
  // parents
  '<rect x="130" y="40" width="40" height="40" fill="hsl(217 91% 60% / 0.18)" stroke="currentColor" stroke-width="1.5"/>' +
  '<circle cx="370" cy="60" r="22" fill="hsl(217 91% 60% / 0.18)" stroke="currentColor" stroke-width="1.5"/>' +
  '<g fill="currentColor" text-anchor="middle"><text x="150" y="30">I-1 (sain)</text><text x="370" y="28">I-2 (saine)</text>' +
  '<text x="150" y="98" font-size="11">N // m</text><text x="370" y="98" font-size="11">N // m</text></g>' +
  // children
  '<circle cx="100" cy="195" r="22" fill="hsl(0 84% 60% / 0.7)" stroke="currentColor" stroke-width="1.5"/>' +
  '<rect x="240" y="173" width="40" height="40" fill="hsl(217 91% 60% / 0.18)" stroke="currentColor" stroke-width="1.5"/>' +
  '<circle cx="420" cy="195" r="22" fill="hsl(217 91% 60% / 0.18)" stroke="currentColor" stroke-width="1.5"/>' +
  '<g fill="currentColor" text-anchor="middle"><text x="100" y="240">II-1 malade</text><text x="100" y="256" font-size="11">m // m</text>' +
  '<text x="260" y="240">II-2 sain</text><text x="260" y="256" font-size="11">N // N ou N // m</text>' +
  '<text x="420" y="240">II-3 saine</text><text x="420" y="256" font-size="11">N // N ou N // m</text></g>' +
  '<g fill="currentColor" font-size="11"><rect x="10" y="8" width="12" height="12" fill="hsl(217 91% 60% / 0.18)" stroke="currentColor"/><text x="28" y="18">carré = homme, rond = femme</text>' +
  '<rect x="270" y="8" width="12" height="12" fill="hsl(0 84% 60% / 0.7)" stroke="currentColor"/><text x="288" y="18">= personne atteinte</text></g>' +
  '</svg>'

const svgCFTR =
  '<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">' +
  // normal
  '<g>' +
  '<rect x="20" y="100" width="260" height="40" fill="hsl(25 95% 53% / 0.18)" stroke="hsl(25 95% 53%)"/>' +
  '<rect x="120" y="92" width="60" height="56" fill="hsl(217 91% 60% / 0.35)" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>' +
  '<text x="150" y="124" text-anchor="middle" font-size="11" fill="currentColor">CFTR</text>' +
  '<text x="150" y="40" text-anchor="middle" fill="currentColor" font-weight="600">Cellule saine</text>' +
  '<g fill="hsl(142 71% 45%)"><circle cx="140" cy="165" r="5"/><circle cx="160" cy="180" r="5"/><circle cx="150" cy="210" r="5"/></g>' +
  '<g fill="hsl(142 71% 45%)"><circle cx="150" cy="70" r="5"/><circle cx="130" cy="55" r="5"/></g>' +
  '<path d="M150 150 V 82" stroke="hsl(142 71% 45%)" stroke-width="2" marker-end="url(#ar5)"/>' +
  '<text x="200" y="165" fill="currentColor" font-size="11">Cl⁻ (intracellulaire)</text>' +
  '<text x="200" y="60" fill="currentColor" font-size="11">Cl⁻ sortent : mucus fluide</text>' +
  '<text x="150" y="245" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.8">protéine CFTR présente dans la membrane</text>' +
  '</g>' +
  // mutated
  '<g transform="translate(340,0)">' +
  '<rect x="20" y="100" width="260" height="40" fill="hsl(25 95% 53% / 0.18)" stroke="hsl(25 95% 53%)"/>' +
  '<text x="150" y="124" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">pas de canal</text>' +
  '<text x="150" y="40" text-anchor="middle" fill="currentColor" font-weight="600">Mucoviscidose (ΔF508)</text>' +
  '<g fill="hsl(142 71% 45%)"><circle cx="140" cy="165" r="5"/><circle cx="160" cy="180" r="5"/><circle cx="150" cy="210" r="5"/><circle cx="110" cy="190" r="5"/></g>' +
  '<g stroke="hsl(0 84% 60%)" stroke-width="3"><line x1="135" y1="72" x2="165" y2="102"/><line x1="165" y1="72" x2="135" y2="102"/></g>' +
  '<text x="200" y="60" fill="currentColor" font-size="11">Cl⁻ bloqués : mucus épais</text>' +
  '<path d="M60 175 q 20 -25 40 0" fill="hsl(263 70% 60% / 0.3)" stroke="hsl(263 70% 60%)"/>' +
  '<text x="40" y="200" fill="currentColor" font-size="10">protéine mal repliée, dégradée</text>' +
  '<text x="150" y="245" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.8">protéine CFTR absente de la membrane</text>' +
  '</g>' +
  '<defs><marker id="ar5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="hsl(142 71% 45%)"/></marker></defs>' +
  '</svg>'

const svgCancer =
  '<svg viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">' +
  '<defs><marker id="ar5c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>' +
  '<g stroke="currentColor" stroke-width="1.5" fill="hsl(217 91% 60% / 0.15)">' +
  '<circle cx="60" cy="80" r="30"/><circle cx="230" cy="80" r="30"/><circle cx="400" cy="80" r="30"/><circle cx="570" cy="80" r="30"/></g>' +
  '<g fill="currentColor" text-anchor="middle"><text x="60" y="84" font-size="11">normale</text><text x="230" y="84" font-size="11">mutée 1</text><text x="400" y="84" font-size="11">mutée 2</text><text x="570" y="84" font-size="11">cancéreuse</text></g>' +
  '<g stroke="currentColor" stroke-width="1.5"><line x1="94" y1="80" x2="194" y2="80" marker-end="url(#ar5c)"/><line x1="264" y1="80" x2="364" y2="80" marker-end="url(#ar5c)"/><line x1="434" y1="80" x2="534" y2="80" marker-end="url(#ar5c)"/></g>' +
  '<g fill="hsl(25 95% 53%)" text-anchor="middle" font-size="11"><text x="144" y="68">mutation</text><text x="144" y="104">oncogène</text><text x="314" y="68">mutation</text><text x="314" y="104">suppresseur</text><text x="484" y="68">+ autres</text><text x="484" y="104">mutations</text></g>' +
  '<g fill="currentColor" text-anchor="middle" font-size="11"><text x="60" y="140">division régulée</text><text x="230" y="140">division un peu accrue</text><text x="400" y="140">tumeur bénigne</text><text x="570" y="140">division incontrôlée,</text><text x="570" y="156">perte de différenciation,</text><text x="570" y="172">métastases</text></g>' +
  '<text x="340" y="198" text-anchor="middle" fill="currentColor" opacity="0.7">Le cancer résulte de l’accumulation de plusieurs mutations dans une même cellule, sur des années.</text>' +
  '</svg>'

const svgSelection =
  '<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">' +
  '<defs><marker id="ar5s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>' +
  '<g stroke="currentColor" fill="none" stroke-width="1.3"><rect x="10" y="40" width="180" height="130"/><rect x="240" y="40" width="180" height="130"/><rect x="470" y="40" width="180" height="130"/></g>' +
  '<g fill="currentColor" font-weight="600" text-anchor="middle"><text x="100" y="30">1. Population initiale</text><text x="330" y="30">2. + antibiotique</text><text x="560" y="30">3. Après quelques générations</text></g>' +
  // pop1
  '<g fill="hsl(217 91% 60%)"><circle cx="40" cy="70" r="7"/><circle cx="80" cy="90" r="7"/><circle cx="120" cy="65" r="7"/><circle cx="160" cy="100" r="7"/><circle cx="55" cy="125" r="7"/><circle cx="105" cy="140" r="7"/><circle cx="150" cy="150" r="7"/><circle cx="35" cy="155" r="7"/><circle cx="130" cy="115" r="7"/><circle cx="170" cy="70" r="7"/></g>' +
  '<circle cx="85" cy="55" r="7" fill="hsl(0 84% 60%)"/>' +
  // pop2
  '<g fill="none" stroke="hsl(217 91% 60%)" stroke-dasharray="2 2"><circle cx="270" cy="70" r="7"/><circle cx="310" cy="90" r="7"/><circle cx="350" cy="65" r="7"/><circle cx="390" cy="100" r="7"/><circle cx="285" cy="125" r="7"/><circle cx="335" cy="140" r="7"/><circle cx="380" cy="150" r="7"/><circle cx="265" cy="155" r="7"/><circle cx="360" cy="115" r="7"/><circle cx="400" cy="70" r="7"/></g>' +
  '<circle cx="315" cy="55" r="7" fill="hsl(0 84% 60%)"/>' +
  // pop3
  '<g fill="hsl(0 84% 60%)"><circle cx="500" cy="70" r="7"/><circle cx="540" cy="90" r="7"/><circle cx="580" cy="65" r="7"/><circle cx="620" cy="100" r="7"/><circle cx="515" cy="125" r="7"/><circle cx="565" cy="140" r="7"/><circle cx="610" cy="150" r="7"/><circle cx="495" cy="155" r="7"/><circle cx="590" cy="115" r="7"/><circle cx="630" cy="70" r="7"/><circle cx="545" cy="55" r="7"/></g>' +
  '<g stroke="currentColor" stroke-width="1.5"><line x1="192" y1="105" x2="238" y2="105" marker-end="url(#ar5s)"/><line x1="422" y1="105" x2="468" y2="105" marker-end="url(#ar5s)"/></g>' +
  '<g fill="currentColor" font-size="11" text-anchor="middle"><text x="100" y="190">bactéries sensibles (bleu)</text><text x="100" y="206">1 mutant résistant (rouge)</text>' +
  '<text x="330" y="190">sensibles tuées (pointillés)</text><text x="330" y="206">le mutant survit</text>' +
  '<text x="560" y="190">le mutant se multiplie :</text><text x="560" y="206">population entièrement résistante</text></g>' +
  '<text x="330" y="238" text-anchor="middle" fill="currentColor" opacity="0.7">L’antibiotique ne crée pas la mutation : il sélectionne un mutant déjà présent.</text>' +
  '</svg>'

const chapter: Chapter = {
  id: 'variation-genetique-sante',
  subject: 'svt',
  order: 5,
  title: 'Variation génétique et santé',
  theme: 'Corps humain et santé',
  summary:
    'Des mutations de l’ADN peuvent altérer la santé : mucoviscidose (maladie héréditaire), cancers (mutations somatiques cumulées) ; chez les bactéries, la sélection de mutants résistants explique la résistance aux antibiotiques.',
  duration: '3 semaines',
  objectives: [
    'Expliquer l’origine des mutations et leur devenir (cellules somatiques, cellules germinales).',
    'Relier le génotype, la protéine et le phénotype dans la mucoviscidose ; interpréter un arbre généalogique et calculer des risques de transmission.',
    'Décrire les principales approches thérapeutiques de la mucoviscidose.',
    'Expliquer le développement d’un cancer par l’accumulation de mutations (oncogènes, gènes suppresseurs de tumeurs) ; identifier des facteurs de risque et des moyens de prévention.',
    'Expliquer la résistance bactérienne aux antibiotiques par sélection naturelle de mutants et adopter des comportements responsables.',
  ],
  keywords: [
    'mutation',
    'allèle',
    'mucoviscidose',
    'CFTR',
    'ΔF508',
    'autosomique récessif',
    'cancer',
    'oncogène',
    'gène suppresseur de tumeur',
    'facteur de risque',
    'antibiotique',
    'résistance',
    'sélection naturelle',
  ],
  fiche: [
    { type: 'h2', text: 'L’essentiel à retenir' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Mutation',
      content: [
        {
          type: 'p',
          text: 'Une **mutation** est une modification **rare, aléatoire** et **permanente** de la séquence de l’ADN (substitution, insertion, délétion). Elle apparaît lors de la réplication (erreur non réparée) ou sous l’effet d’un **agent mutagène** (UV, rayonnements ionisants, certains produits chimiques). Elle crée un nouvel **allèle**.',
        },
      ],
    },
    {
      type: 'table',
      headers: ['', 'Mutation germinale', 'Mutation somatique'],
      rows: [
        ['Cellule touchée', 'cellule de la lignée germinale (gamète)', 'cellule du corps (non reproductrice)'],
        ['Transmission', 'à la descendance (héréditaire)', 'aux cellules filles seulement : **pas transmise** à la descendance'],
        ['Exemple', 'mucoviscidose (allèle ΔF508)', 'cancer de la peau dû aux UV'],
      ],
    },
    { type: 'h3', text: 'Trois pathologies étudiées' },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Mucoviscidose', icon: 'Wind', text: 'Gène **CFTR** (chromosome 7). Maladie **autosomique récessive** : allèle muté (ΔF508 le plus fréquent) → protéine canal Cl⁻ absente → mucus épais (poumons, pancréas).' },
        { title: 'Cancers', icon: 'Microscope', text: 'Cellules à **mutations cumulées** (oncogènes activés, suppresseurs inactivés) : divisions incontrôlées, échappement à l’apoptose. **Facteurs de risque** : tabac, UV, alcool, HPV, etc.' },
        { title: 'Résistance aux antibiotiques', icon: 'Bug', text: 'Mutants résistants **préexistants** : l’antibiotique est une **pression de sélection** ; les résistants se multiplient et transmettent leur allèle.' },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      content: [
        {
          type: 'list',
          items: [
            'Parents sains hétérozygotes (N//m) : risque d’enfant malade **1/4**, porteur sain **1/2**, sain non porteur **1/4**.',
            'Le **phénotype** dépend du génotype et de l’**environnement** : un cancer résulte de mutations *et* d’expositions.',
            'Un antibiotique est inefficace contre les **virus**. Mauvais usage → sélection de bactéries résistantes → **bon usage** : seulement si nécessaire, dose et durée prescrites.',
          ],
        },
      ],
    },
  ],
  cours: [
    { type: 'h2', text: '1. Mutations et variation génétique' },
    {
      type: 'p',
      text: 'Le matériel génétique, l’ADN, est copié avant chaque division cellulaire (**réplication**). La réplication est très fidèle, mais pas parfaite : environ une erreur pour $10^{9}$ à $10^{10}$ nucléotides copiés, après action des systèmes de réparation. Chaque cellule, à chaque division, a donc une petite chance de présenter une modification de sa séquence d’ADN : une **mutation**.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Types de mutations ponctuelles',
      content: [
        {
          type: 'list',
          items: [
            '**Substitution** : un nucléotide est remplacé par un autre (peut être silencieuse, faux-sens ou non-sens) ;',
            '**Insertion** : un ou plusieurs nucléotides sont ajoutés ;',
            '**Délétion** : un ou plusieurs nucléotides sont perdus. Si le nombre de nucléotides insérés ou perdus n’est pas un multiple de 3, le cadre de lecture est décalé (**décalage du cadre de lecture**).',
          ],
        },
      ],
    },
    {
      type: 'p',
      text: 'Les mutations sont **aléatoires** (elles ne sont pas dirigées en réponse à un besoin), **rares**, et le plus souvent **sans conséquence** (la grande majorité du génome humain ne code pas de protéine et le code génétique est redondant). Certaines ont un effet délétère, d’autres sont neutres ou, rarement, avantageuses. Elles sont à l’origine de la **diversité des allèles** d’un gène.',
    },
    {
      type: 'p',
      text: 'La fréquence des mutations augmente sous l’effet d’**agents mutagènes** : rayonnements ultraviolets (formation de dimères de thymine), rayonnements ionisants (rayons X, gamma), substances chimiques (benzo[a]pyrène de la fumée de tabac, aflatoxines) ou certains virus.',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Cellule germinale ou somatique ?',
      content: [
        {
          type: 'p',
          text: 'Une mutation survenue dans une **cellule somatique** concerne cette cellule et ses descendantes (un clone), mais **n’est pas transmise** aux enfants. Une mutation de la **lignée germinale** peut se retrouver dans un gamète, donc chez l’enfant, dans toutes ses cellules : elle est **héréditaire**.',
        },
      ],
    },

    { type: 'h2', text: '2. La mucoviscidose : une maladie génétique' },
    { type: 'h3', text: '2.1 Les symptômes' },
    {
      type: 'p',
      text: 'La **mucoviscidose** est la maladie génétique grave la plus fréquente en France métropolitaine : environ **1 naissance sur 4 700**, soit plus de 200 enfants par an, dépistés dès la naissance. Les sécrétions muqueuses sont anormalement **épaisses et collantes**. Elles obstruent :\n- les **bronches** (infections respiratoires à répétition, insuffisance respiratoire — première cause de décès) ;\n- le **pancréas** (les enzymes digestives n’arrivent plus à l’intestin : mauvaise digestion, retard de croissance) ;\n- d’autres organes (intestin, voies génitales masculines : stérilité fréquente ; sueur trop salée).',
    },
    { type: 'h3', text: '2.2 Du gène au phénotype' },
    {
      type: 'p',
      text: 'La maladie est due à des mutations du gène **CFTR**, situé sur le **chromosome 7**. Ce gène code la protéine **CFTR**, un **canal membranaire** qui laisse sortir les ions chlorure ($Cl^-$) des cellules épithéliales. Cette sortie d’ions entraîne, par osmose, celle de l’eau : le mucus reste **fluide**.',
    },
    { type: 'svg', svg: svgCFTR, caption: 'Protéine CFTR : canal à ions chlorure dans la membrane d’une cellule épithéliale saine ; absente chez un malade porteur de la mutation ΔF508.' },
    {
      type: 'p',
      text: 'La mutation la plus fréquente (environ 70 % des allèles mutés en Europe) est **ΔF508** : une **délétion de 3 nucléotides** (CTT) qui supprime un seul acide aminé, la **phénylalanine en position 508**, sans décalage du cadre de lecture. La protéine, privée de cet acide aminé, se **replie mal** : elle est reconnue comme anormale et **dégradée** avant d’atteindre la membrane. Sans canal, les ions $Cl^-$ ne sortent plus, l’eau reste dans la cellule, le mucus se déshydrate et s’épaissit.',
    },
    {
      type: 'math',
      tex: '\\text{allèle muté CFTR} \\rightarrow \\text{protéine anormale (ΔF508)} \\rightarrow \\text{canal absent} \\rightarrow \\text{mucus épais} \\rightarrow \\text{phénotype malade}',
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Plusieurs niveaux de phénotype',
      content: [
        {
          type: 'p',
          text: 'Phénotype **moléculaire** (protéine CFTR absente), **cellulaire** (mucus épais), **de l’organisme** (symptômes respiratoires et digestifs). Plus de 2 000 variants du gène CFTR sont décrits ; leur gravité varie.',
        },
      ],
    },
    { type: 'h3', text: '2.3 Transmission : une maladie autosomique récessive' },
    {
      type: 'p',
      text: 'L’arbre généalogique ci-dessous montre une famille où deux parents sains ont une fille malade.',
    },
    { type: 'svg', svg: svgArbre, caption: 'Arbre généalogique : parents sains, enfant malade → allèle récessif ; fille malade → gène sur un autosome (non lié au sexe).' },
    {
      type: 'callout',
      variant: 'method',
      title: 'Raisonnement',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**Récessif** : deux parents sains ont un enfant malade ; l’allèle de la maladie est masqué chez eux.',
            '**Autosomique** : une **fille** est malade alors que son **père** est sain. Si le gène était porté par le chromosome X et récessif, le père d’une fille malade serait obligatoirement malade (il lui transmet son X).',
            'Parents **hétérozygotes** : ils ont transmis chacun un allèle muté à leur fille.',
          ],
        },
      ],
    },
    {
      type: 'table',
      caption: 'Échiquier de croisement de deux parents hétérozygotes N//m (N : allèle normal dominant, m : allèle muté récessif)',
      headers: ['gamètes', 'N (1/2)', 'm (1/2)'],
      rows: [
        ['N (1/2)', 'N//N (1/4) : sain', 'N//m (1/4) : sain, porteur'],
        ['m (1/2)', 'm//N (1/4) : sain, porteur', 'm//m (1/4) : malade'],
      ],
    },
    {
      type: 'p',
      text: 'À chaque grossesse : **1 risque sur 4** d’avoir un enfant malade, **1 chance sur 2** d’avoir un enfant porteur sain, 1 chance sur 4 d’avoir un enfant sain non porteur. Environ **1 personne sur 30 à 35** est porteuse (hétérozygote) d’une mutation du gène CFTR en France. Un couple de porteurs peut bénéficier d’un **conseil génétique** et d’un **diagnostic prénatal** ou préimplantatoire.',
    },
    { type: 'h3', text: '2.4 Prise en charge et thérapies' },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Traitements symptomatiques', icon: 'Pill', text: 'Kinésithérapie respiratoire (désencombrer les bronches), enzymes pancréatiques, alimentation riche en calories, antibiotiques contre les infections bronchiques, greffe pulmonaire en dernier recours.' },
        { title: 'Modulateurs de CFTR', icon: 'FlaskConical', text: 'Médicaments (ivacaftor depuis 2012 ; association elexacaftor-tezacaftor-ivacaftor depuis 2020 pour la mutation ΔF508) qui aident la protéine à rejoindre la membrane et/ou à rester ouverte : ils corrigent la cause moléculaire.' },
        { title: 'Thérapie génique (recherche)', icon: 'Dna', text: 'Apporter une copie normale du gène CFTR aux cellules des voies respiratoires (vecteurs viraux ou lipidiques, ARNm) : efficacité encore limitée, essais cliniques en cours.' },
        { title: 'Dépistage et prévention', icon: 'ShieldCheck', text: 'Dépistage néonatal systématique en France depuis 2002 ; conseil génétique, diagnostic prénatal ou préimplantatoire pour les couples à risque.' },
      ],
    },

    { type: 'h2', text: '3. Les cancers : maladies de l’ADN' },
    { type: 'h3', text: '3.1 Une cellule cancéreuse' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Cancer',
      content: [
        {
          type: 'p',
          text: 'Un **cancer** résulte de la prolifération anarchique d’une cellule (et de ses descendantes) qui a accumulé des **mutations** de son ADN. Les cellules cancéreuses :\n- se **divisent sans contrôle** (insensibilité aux signaux inhibiteurs) ;\n- **perdent leur différenciation** ;\n- échappent à la **mort cellulaire programmée** (apoptose) ;\n- forment une **tumeur**, puis peuvent envahir les tissus voisins et migrer (**métastases**).',
        },
      ],
    },
    {
      type: 'p',
      text: 'Le cancer est une maladie **fréquente** (plus de 400 000 nouveaux cas par an en France) qui apparaît surtout avec l’âge, le temps nécessaire à l’accumulation des mutations.',
    },
    { type: 'h3', text: '3.2 Gènes impliqués : accélérateurs et freins' },
    {
      type: 'table',
      headers: ['', 'Proto-oncogène → oncogène', 'Gène suppresseur de tumeur'],
      rows: [
        ['Rôle normal', '**Accélérateur** : stimule la division cellulaire (facteurs de croissance, récepteurs, protéines de signalisation)', '**Frein** : bloque le cycle si l’ADN est endommagé, déclenche la réparation ou l’apoptose'],
        ['Effet de la mutation', '**Gain de fonction** : activité excessive, permanente (accélérateur bloqué) → 1 seul allèle muté suffit', '**Perte de fonction** : plus de frein → il faut en général inactiver **les deux allèles**'],
        ['Exemples', 'RAS (cancers du pancréas, colon), MYC, HER2', 'TP53 (« gardien du génome », muté dans environ la moitié des cancers), RB, APC, BRCA1/2'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      content: [
        {
          type: 'p',
          text: 'Un cancer n’est **pas dû à une seule mutation** mais à l’**accumulation de plusieurs** (souvent 5 à 10) dans des gènes de division, de réparation et de mort cellulaire, dans la **même cellule**. Dans le cancer du côlon, on observe par exemple successivement des mutations d’APC, de KRAS puis de TP53, entre la muqueuse normale, le polype, puis le cancer.',
        },
      ],
    },
    { type: 'svg', svg: svgCancer, caption: 'Du tissu normal à la cellule cancéreuse : accumulation de mutations.' },
    { type: 'h3', text: '3.3 Origine des mutations : facteurs de risque' },
    {
      type: 'p',
      text: 'Une partie des mutations provient d’**erreurs spontanées** de réplication : plus il y a de divisions, plus il y a de risque. D’autres résultent de l’exposition à des **facteurs de risque** (agents mutagènes ou favorisant la prolifération) :',
    },
    {
      type: 'table',
      headers: ['Facteur', 'Exemple de cancer associé', 'Mécanisme / remarque'],
      rows: [
        ['Tabac', 'poumon, gorge, vessie…', 'benzo[a]pyrène et autres substances mutagènes ; plus de 70 produits cancérogènes'],
        ['Rayons UV (soleil, cabines)', 'peau (mélanome)', 'dimères de thymine ; prévention : crème, éviter les coups de soleil'],
        ['Alcool', 'bouche, œsophage, foie, sein', 'toxicité de l’acétaldéhyde'],
        ['Infections (HPV, hépatite B)', 'col de l’utérus, foie', 'vaccination possible'],
        ['Alimentation déséquilibrée, sédentarité, surpoids', 'côlon, sein, etc.', 'inflammation chronique, hormones'],
        ['Hérédité (mutations de BRCA1/2…)', 'sein, ovaire', 'prédisposition (germinale) : pas une fatalité mais un risque plus élevé'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Prévention et dépistage',
      content: [
        {
          type: 'p',
          text: 'On estime qu’environ **40 %** des cancers pourraient être évités par la **prévention** (arrêt du tabac, modération de l’alcool, protection solaire, activité physique, vaccination HPV et hépatite B). Le **dépistage** précoce (mammographie, test de recherche de sang dans les selles, frottis) augmente les chances de guérison. Les traitements : chirurgie, radiothérapie, chimiothérapie, thérapies ciblées, immunothérapie.',
        },
      ],
    },

    { type: 'h2', text: '4. La résistance bactérienne aux antibiotiques' },
    {
      type: 'p',
      text: 'Les **antibiotiques** sont des molécules qui tuent les bactéries ou bloquent leur multiplication (la pénicilline, découverte par Fleming en 1928, est utilisée à partir des années 1940). Ils ne sont **pas actifs sur les virus**. Rapidement sont apparues des bactéries **résistantes**, qui survivent en présence de l’antibiotique.',
    },
    { type: 'h3', text: '4.1 Les mécanismes de résistance' },
    {
      type: 'list',
      items: [
        '**Destruction** de l’antibiotique par une enzyme (ex. β-lactamases qui hydrolysent la pénicilline) ;',
        '**Modification de la cible** de l’antibiotique (ex. protéine de la paroi chez le SARM, *Staphylococcus aureus* résistant à la méticilline) ;',
        '**Pompes** qui expulsent l’antibiotique hors de la bactérie ;',
        '**Diminution de la perméabilité** de la paroi.',
      ],
    },
    { type: 'h3', text: '4.2 L’origine : mutation puis sélection' },
    {
      type: 'steps',
      items: [
        { title: 'Mutation aléatoire', text: 'Dans une grande population bactérienne ($10^9$ bactéries dans 1 mL de culture), des mutations apparaissent **au hasard**, à chaque division. Quelques bactéries portent par hasard un allèle de résistance, **avant tout contact** avec l’antibiotique.' },
        { title: 'Pression de sélection', text: 'En présence de l’antibiotique, les bactéries sensibles meurent ou ne se divisent plus ; les **mutants résistants survivent**.' },
        { title: 'Multiplication et transmission', text: 'Les résistants se multiplient rapidement (une division toutes les 20 à 30 min chez *E. coli* en conditions favorables) et transmettent leur allèle à leurs descendants (**transmission verticale**). La proportion de bactéries résistantes **augmente** : c’est la **sélection naturelle**.' },
        { title: 'Transfert horizontal', text: 'Les gènes de résistance, souvent portés par des **plasmides**, peuvent aussi passer d’une bactérie à une autre, parfois d’espèce différente (**conjugaison**), ce qui accélère la diffusion.' },
      ],
    },
    { type: 'svg', svg: svgSelection, caption: 'La sélection de bactéries résistantes en présence d’un antibiotique.' },
    {
      type: 'callout',
      variant: 'history',
      title: 'Les mutations préexistent : l’expérience de Lederberg (1952)',
      content: [
        {
          type: 'p',
          text: 'Joshua et Esther Lederberg étalent des bactéries sur une boîte sans antibiotique, puis, avec un tampon de velours, transfèrent l’empreinte des colonies sur des boîtes contenant l’antibiotique. Les colonies résistantes apparaissent **aux mêmes positions** sur plusieurs boîtes : elles étaient déjà résistantes sur la boîte d’origine, **avant** tout contact avec l’antibiotique. Les mutations résistantes ne sont donc pas induites par l’antibiotique (Luria et Delbrück avaient déjà abouti à cette conclusion en 1943).',
        },
      ],
    },
    { type: 'h3', text: '4.3 Un enjeu de santé publique' },
    {
      type: 'p',
      text: 'Plus on utilise les antibiotiques, plus on sélectionne de bactéries résistantes. Un usage **excessif** (prescriptions inutiles, antibiotiques pour une infection virale comme la grippe ou le rhume), **inadapté** (doses trop faibles, traitement arrêté trop tôt) ou **massif en élevage** favorise leur apparition. Des infections peuvent devenir **impossibles à traiter** (bactéries multirésistantes).',
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Bon usage des antibiotiques',
      content: [
        {
          type: 'list',
          items: [
            'Uniquement sur **prescription** et pour une infection **bactérienne** ;',
            'Respecter la **dose** et la **durée** prescrites ;',
            'Ne pas garder de restes, ne pas s’automédicamenter ;',
            'Prévenir la transmission : hygiène des mains, **vaccination**.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Bilan',
      content: [
        {
          type: 'list',
          items: [
            'Les mutations sont la source de la variation génétique ; elles sont à l’origine de maladies (mucoviscidose, cancers) et de la résistance bactérienne.',
            'Maladie héréditaire = mutation **germinale** ; cancer = mutations **somatiques** cumulées.',
            'La résistance bactérienne illustre la **sélection naturelle** à l’échelle de quelques jours.',
          ],
        },
      ],
    },
  ],
  exercices: [
    {
      id: 'ex-vrai-faux-mutation',
      title: 'Mutations : germinale ou somatique ?',
      difficulty: 1,
      duration: 10,
      tags: ['mutation', 'germinale', 'somatique'],
      statement: [
        {
          type: 'p',
          text: 'Pour chaque situation, indiquer s’il s’agit d’une mutation germinale ou somatique et si elle peut être transmise aux enfants.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Un mélanome apparaît chez un homme de 60 ans après de nombreuses expositions aux UV : une mutation dans une cellule de la peau.',
            'Un enfant est atteint de mucoviscidose avec deux allèles CFTR mutés.',
            'Une mutation apparaît dans un spermatozoïde (non présente chez le père) et conduit, après fécondation, à un enfant porteur dans toutes ses cellules.',
            'Une cellule du foie d’une personne fumeuse présente une mutation de TP53.',
          ],
        },
      ],
      hints: ['La mutation est-elle présente dans toutes les cellules, y compris les gamètes ?'],
      solution: [
        { type: 'p', text: '**1.** **Somatique** (cellule de la peau) : transmise seulement aux cellules filles, pas aux enfants.' },
        { type: 'p', text: '**2.** **Germinale** : les allèles mutés ont été transmis par les gamètes des parents et sont présents dans toutes les cellules de l’enfant ; l’enfant pourra les transmettre à son tour.' },
        { type: 'p', text: '**3.** **Germinale** (dans un gamète) : mutation *de novo*, absente chez le père mais transmissible à la descendance de l’enfant.' },
        { type: 'p', text: '**4.** **Somatique** : non transmise aux enfants, mais peut contribuer au développement d’un cancer chez la personne.' },
      ],
    },
    {
      id: 'ex-delta-f508',
      title: 'Séquence de la mutation ΔF508',
      difficulty: 2,
      duration: 20,
      tags: ['CFTR', 'ΔF508', 'séquence', 'code génétique'],
      statement: [
        {
          type: 'p',
          text: 'Partie de la séquence du brin non transcrit de l’allèle normal du gène CFTR (codons 506 à 510) : `ATC ATC TTT GGT GTT`. Chez la majorité des malades, la mutation ΔF508 est une **délétion des 3 nucléotides CTT**, ce qui donne : `ATC ATT GGT GTT`.',
        },
        {
          type: 'p',
          text: 'Extrait du code génétique (ARNm) : AUC, AUU = isoleucine (Ile) ; UUU = phénylalanine (Phe) ; GGU = glycine (Gly) ; GUU = valine (Val).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire les séquences d’ARNm correspondantes et traduire les deux séquences en acides aminés.',
            'Quelle est la conséquence de la mutation sur la protéine ? Pourquoi dit-on que le cadre de lecture n’est pas décalé ?',
            'Expliquer comment cette mutation entraîne la mucoviscidose.',
          ],
        },
      ],
      hints: ['Le brin transcrit est complémentaire, mais l’ARNm est identique au brin non transcrit (T → U).', 'Retirez les trois nucléotides CTT et relisez par triplets.'],
      solution: [
        { type: 'p', text: '**1.** Allèle normal : ARNm AUC AUC UUU GGU GUU → **Ile – Ile – Phe – Gly – Val**… (codons 506 à 510). Allèle ΔF508 : AUC AUU GGU GUU → **Ile – Ile – Gly – Val**.' },
        { type: 'p', text: '**2.** Il manque un seul acide aminé : la **phénylalanine 508**. Les 3 nucléotides supprimés forment un multiple de 3 ; la lecture des codons suivants reste en phase (GGU, GUU…) : pas de décalage du cadre de lecture, le reste de la protéine est donc normal.' },
        { type: 'p', text: '**3.** L’absence de Phe508 perturbe le repliement de la protéine CFTR (structure 3D anormale) ; elle est reconnue comme défectueuse et dégradée avant d’atteindre la membrane plasmique. Pas de canal à ions Cl⁻ : le mucus s’épaissit (phénotype moléculaire → cellulaire → organisme).' },
      ],
    },
    {
      id: 'ex-arbre-muco',
      title: 'Arbre généalogique et risque',
      difficulty: 2,
      duration: 20,
      tags: ['arbre généalogique', 'risque', 'récessif'],
      statement: [
        {
          type: 'p',
          text: 'Dans une famille, Claire (I-2) et Marc (I-1), tous deux sains, ont trois enfants : Léa (II-1) atteinte de mucoviscidose, Paul (II-2) et Sarah (II-3) sains. On sait que les parents de Marc et de Claire sont sains.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Montrer que l’allèle responsable est récessif, puis qu’il est porté par un autosome.',
            'Déterminer le génotype de Léa et celui de ses parents (allèles N / m).',
            'Quelle est la probabilité que Paul soit porteur de l’allèle muté ?',
            'Léa est adulte, elle a un conjoint dont le génotype est inconnu ; environ 1 personne sur 30 est porteuse dans la population. Quelle est la probabilité qu’ils aient un enfant atteint ? (On suppose que Léa est homozygote m//m).',
          ],
        },
      ],
      hints: ['Paul est sain : trois génotypes possibles pour un enfant d’un couple N//m × N//m, mais un seul est exclu.', 'Léa donne toujours m ; le conjoint donne m avec la probabilité 1/2 s’il est porteur.'],
      solution: [
        { type: 'p', text: '**1.** Deux parents sains ont une enfant malade : si l’allèle de la maladie était dominant, au moins un parent serait malade. Il est donc **récessif**. Léa étant une fille atteinte de père sain : si le gène était porté par X et récessif, son père aurait donné son X (portant l’allèle récessif) et serait malade. Le gène est donc **autosomique**.' },
        { type: 'p', text: '**2.** Léa : **m//m**. Ses parents, sains mais ayant transmis chacun un allèle m : **N//m** tous les deux.' },
        { type: 'p', text: '**3.** Paul est sain (N//N ou N//m). Parmi les enfants sains d’un couple N//m × N//m, les génotypes possibles : N//N (1/4), N//m (2/4). Probabilité conditionnelle : $\\dfrac{2/4}{3/4} = \\dfrac{2}{3}$. Paul est porteur avec la probabilité **2/3**.' },
        { type: 'p', text: '**4.** Le conjoint est porteur avec la probabilité 1/30. Léa transmet toujours m. Un enfant est atteint si le conjoint est porteur **et** lui transmet m : $\\dfrac{1}{30} \\times \\dfrac{1}{2} = \\dfrac{1}{60}$, soit environ **1,7 %**.' },
      ],
    },
    {
      id: 'ex-couple-risque',
      title: 'Risque dans la population générale',
      difficulty: 2,
      duration: 15,
      tags: ['probabilités', 'population'],
      statement: [
        {
          type: 'p',
          text: 'En France, environ une personne sur 30 est porteuse d’un allèle muté de CFTR. Deux personnes sans lien de parenté et sans antécédents familiaux forment un couple.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quelle est la probabilité que les deux membres du couple soient porteurs ?',
            'S’ils sont porteurs, quelle est la probabilité qu’un enfant soit malade ?',
            'En déduire la probabilité qu’un enfant du couple soit atteint de mucoviscidose. Comparer à la fréquence observée de 1 naissance sur 4 700.',
          ],
        },
      ],
      hints: ['Les événements « être porteur » sont indépendants pour les deux membres du couple.'],
      solution: [
        { type: 'p', text: '**1.** $\\frac{1}{30} \\times \\frac{1}{30} = \\frac{1}{900}$.' },
        { type: 'p', text: '**2.** $\\frac{1}{4}$ (échiquier de croisement N//m × N//m).' },
        { type: 'p', text: '**3.** $\\frac{1}{900} \\times \\frac{1}{4} = \\frac{1}{3\\,600}$, soit environ 1 naissance sur 3 600 ; la fréquence observée (1/4 700) est du même ordre de grandeur. La différence vient du fait que la fréquence de porteurs est en fait voisine de 1/34 à 1/35, pas exactement 1/30, et que certaines mutations rares n’entraînent pas toujours la forme classique.' },
      ],
    },
    {
      id: 'ex-oncogene',
      title: 'Oncogènes et gènes suppresseurs',
      difficulty: 2,
      duration: 20,
      tags: ['cancer', 'oncogène', 'suppresseur'],
      statement: [
        {
          type: 'p',
          text: '**Document 1.** La protéine RAS est activée lorsqu’elle fixe du GTP : elle transmet alors au noyau un signal de division cellulaire. Elle s’inactive seule en hydrolysant le GTP. Dans certains cancers, une substitution d’un acide aminé empêche cette hydrolyse : la protéine reste activée.',
        },
        {
          type: 'p',
          text: '**Document 2.** La protéine p53 (gène TP53) est activée lors de lésions de l’ADN : elle arrête le cycle cellulaire pour permettre la réparation ou déclenche l’apoptose si la lésion est trop importante. Environ la moitié des cancers présentent des mutations inactivant TP53.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Classer RAS et TP53 (proto-oncogène ou gène suppresseur de tumeur). Justifier.',
            'Expliquer pourquoi un seul allèle RAS muté suffit alors qu’il faut en général que les deux allèles de TP53 soient inactivés.',
            'Expliquer pourquoi une cellule dont TP53 est inactivé accumule plus facilement de nouvelles mutations.',
          ],
        },
      ],
      hints: ['Accélérateur ou frein ?', 'Le second allèle de TP53 produit une protéine normale tant qu’il n’est pas muté.'],
      solution: [
        { type: 'p', text: '**1.** **RAS** : proto-oncogène (stimule la division) ; sa forme mutée constamment active est un **oncogène** (gain de fonction). **TP53** : **gène suppresseur de tumeur** (protège contre la prolifération de cellules à ADN altéré) ; mutation = perte de fonction.' },
        { type: 'p', text: '**2.** RAS muté produit une protéine toujours active, qui stimule en permanence la division, même si l’autre allèle est normal : un seul allèle muté suffit (mutation dominante au niveau cellulaire). Pour TP53, un allèle normal suffit en général à produire assez de protéine p53 fonctionnelle pour freiner le cycle ; le frein ne disparaît que si les deux allèles sont inactivés.' },
        { type: 'p', text: '**3.** Sans p53 fonctionnelle, les cellules à ADN endommagé ne sont ni arrêtées pour réparation ni éliminées par apoptose : elles se divisent avec leurs lésions et transmettent les mutations à leurs descendantes. Le nombre de mutations s’accumule donc plus vite, ce qui favorise l’apparition d’autres mutations de gènes de la division : cancer.' },
      ],
    },
    {
      id: 'ex-lederberg',
      title: 'Les mutants résistants préexistent-ils ?',
      difficulty: 3,
      duration: 25,
      tags: ['antibiotique', 'résistance', 'expérience'],
      statement: [
        {
          type: 'p',
          text: 'Deux hypothèses sont possibles pour expliquer l’apparition de bactéries résistantes à un antibiotique A : **H1** : l’antibiotique induit chez les bactéries la mutation de résistance ; **H2** : des mutants résistants existent déjà dans la population avant tout contact avec l’antibiotique.',
        },
        {
          type: 'p',
          text: 'On réalise l’expérience suivante (réplique sur velours) : des bactéries sont étalées sur un milieu M1 sans antibiotique ; après croissance, on obtient environ 300 colonies. Un tampon de velours est appliqué sur M1 puis sur un milieu M2 contenant l’antibiotique A : 4 colonies poussent sur M2, **aux positions correspondant à 4 colonies de M1**. On répète l’expérience avec un autre tampon sur un milieu M3 identique à M2 : les 4 colonies apparaissent **aux mêmes positions**.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quels résultats seraient attendus sous l’hypothèse H1 ?',
            'Les résultats observés valident-ils H1 ou H2 ? Argumenter.',
            'Proposer une expérience complémentaire pour confirmer que les colonies de M1 aux positions concernées sont bien résistantes.',
            'Expliquer en quoi cette expérience illustre la sélection naturelle.',
          ],
        },
      ],
      hints: ['Si l’antibiotique induisait la mutation, où apparaîtraient les colonies sur M2 et M3 ?', 'Prélevez des cellules de M1 à ces positions.'],
      solution: [
        { type: 'p', text: '**1.** Sous H1, la résistance apparaîtrait au hasard après contact avec l’antibiotique : les colonies résistantes de M2 et de M3 seraient en **nombre et positions différents** (pas de lien avec les positions des colonies de M1).' },
        { type: 'p', text: '**2.** Les colonies résistantes apparaissent exactement **aux mêmes positions** sur M2 et M3 et correspondent aux mêmes colonies de M1 : ces colonies descendent de bactéries qui étaient déjà résistantes avant le contact avec l’antibiotique. Les résultats valident **H2**.' },
        { type: 'p', text: '**3.** On prélève sur M1 les bactéries aux positions concernées (et en contrôle des bactéries d’autres positions) et on les étale sur un milieu contenant l’antibiotique : seules les premières devraient se multiplier.' },
        { type: 'p', text: '**4.** Dans la population initiale existe une variation génétique (rare, due à des mutations aléatoires). Le milieu avec antibiotique (**pression de sélection**) permet la survie et la reproduction des seuls mutants : la fréquence de l’allèle de résistance augmente dans la population : c’est la **sélection naturelle**.' },
      ],
    },
    {
      id: 'ex-bac-antibio',
      title: 'Type bac : évolution d’une population résistante',
      difficulty: 3,
      duration: 35,
      tags: ['type bac', 'antibiotique', 'sélection', 'calcul'],
      statement: [
        {
          type: 'p',
          text: '**Document 1.** Une population de *Escherichia coli* de $10^{9}$ bactéries contient, en moyenne, une bactérie résistante à un antibiotique pour $10^{8}$ bactéries sensibles (apparition par mutation aléatoire). Les bactéries se divisent toutes les 20 minutes. En présence de l’antibiotique, toutes les bactéries sensibles meurent en moins d’une heure.',
        },
        {
          type: 'p',
          text: '**Document 2.** Évolution de la proportion de souches de *Streptococcus pneumoniae* résistantes à la pénicilline G, simplifiée pour l’exercice : dans un pays A où la consommation d’antibiotiques par habitant est élevée, 40 % des souches isolées sont résistantes ; dans un pays B, où elle est faible, 5 %. Après une campagne nationale de réduction des prescriptions inutiles, la proportion de souches résistantes du pays A est passée de 40 % à 25 % en 6 ans.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer le nombre approximatif de bactéries résistantes dans la population initiale (document 1).',
            'On ajoute l’antibiotique à cette population. Que devient la proportion de bactéries résistantes après une heure ? Justifier.',
            'Si les résistants se multiplient pendant 3 heures (à raison d’une division toutes les 20 minutes), par combien est multiplié leur nombre ? Calculer leur nombre approximatif.',
            'À l’aide des documents 1 et 2, expliquer comment l’usage des antibiotiques influence la résistance, et pourquoi la proportion de souches résistantes peut diminuer lorsque la consommation baisse.',
            'Proposer deux mesures permettant de limiter la diffusion des résistances.',
          ],
        },
      ],
      hints: [
        '$10^{9}$ bactéries au total, 1 résistante pour $10^{8}$ : divisez.',
        '3 heures = 9 divisions de 20 minutes : le nombre est multiplié par $2^{9}$.',
        'Pensez au coût éventuel de la résistance pour la bactérie sans antibiotique.',
      ],
      solution: [
        { type: 'p', text: '**1.** $10^{9} / 10^{8} = 10$ bactéries résistantes environ (sur un milliard).' },
        { type: 'p', text: '**2.** Les bactéries sensibles ($\\approx 10^{9} - 10$) meurent ; il ne reste que les mutants résistants : la proportion de résistants passe de $10^{-8}$ (1 sur $10^{8}$) à **100 %** : la population est devenue entièrement résistante en quelques heures (sélection).' },
        { type: 'p', text: '**3.** 3 heures = 180 min = 9 générations de 20 minutes : le nombre est multiplié par $2^{9} = 512$. Soit environ $10 \\times 512 = 5\\,120$ bactéries (hors mortalité). En réalité la croissance finit par être limitée par les ressources du milieu, mais la population résistante peut rapidement reconstituer une population de plusieurs milliards de bactéries.' },
        { type: 'p', text: '**4.** Les mutants résistants existent avant l’antibiotique, mais très rares. L’antibiotique est une **pression de sélection** : les sensibles meurent, les résistants survivent, se multiplient et transmettent l’allèle ; plus l’antibiotique est utilisé, plus la proportion de résistants augmente (pays A : 40 % contre 5 % dans le pays B). Quand la consommation baisse, les bactéries résistantes n’ont plus d’avantage ; si l’allèle de résistance a un **coût** (métabolisme moins efficace), elles se multiplient moins vite que les sensibles et leur proportion décroît : la sélection s’inverse, mais lentement (40 % → 25 % en 6 ans).' },
        { type: 'p', text: '**5.** Par exemple : n’utiliser les antibiotiques que sur prescription et pour des infections bactériennes ; respecter la dose et la durée ; vacciner (moins d’infections) ; hygiène des mains ; limiter l’usage préventif en élevage ; développer des tests rapides pour identifier le germe.' },
      ],
    },
    {
      id: 'ex-cancer-facteurs',
      title: 'Facteurs de risque et cancer du poumon',
      difficulty: 2,
      duration: 20,
      tags: ['cancer', 'facteurs de risque', 'tabac'],
      statement: [
        {
          type: 'p',
          text: 'Données épidémiologiques simplifiées : on suit des hommes pendant 20 ans. Le nombre de cancers du poumon pour 1 000 hommes est de 1 chez les non-fumeurs, 10 chez ceux qui fument 10 cigarettes par jour, 25 chez ceux qui fument 20 cigarettes par jour. Parmi les anciens fumeurs ayant arrêté depuis 10 ans, il est de 5.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Décrire la relation entre consommation de tabac et fréquence du cancer du poumon.',
            'Comment peut-on expliquer ce lien au niveau de l’ADN ?',
            'Que montre la valeur obtenue chez les anciens fumeurs ?',
            'Un non-fumeur peut-il avoir un cancer du poumon ? Pourquoi ?',
          ],
        },
      ],
      hints: ['Comparez 1, 10 et 25 cas pour 1 000.', 'Mutagène + accumulation.'],
      solution: [
        { type: 'p', text: '**1.** Plus la consommation est élevée, plus la fréquence augmente : 1 → 10 → 25 pour 1 000, soit 25 fois plus de cas pour 20 cigarettes par jour que chez les non-fumeurs. La relation est croissante (corrélation forte, qui, avec les données biologiques, indique un facteur de risque).' },
        { type: 'p', text: '**2.** La fumée contient des substances mutagènes (benzo[a]pyrène…) qui provoquent des lésions de l’ADN dans les cellules pulmonaires. Plus l’exposition est forte et prolongée, plus les mutations s’accumulent dans des gènes de la division (oncogènes) et de contrôle (TP53) : la probabilité qu’une cellule devienne cancéreuse augmente.' },
        { type: 'p', text: '**3.** L’arrêt du tabac réduit le risque (5 pour 1 000 au lieu de 10, voire 25) : on diminue le nombre de nouvelles mutations ; les cellules réparent leurs lésions et on réduit la prolifération. Il n’est **jamais trop tard** pour arrêter.' },
        { type: 'p', text: '**4.** Oui : le risque n’est pas nul (1 pour 1 000) : des mutations spontanées de réplication, d’autres facteurs (radon, pollution, tabagisme passif, hérédité) peuvent intervenir. Le cancer résulte d’un cumul de facteurs de risque et de hasard.' },
      ],
    },
  ],
  representations: [
    { type: 'svg', svg: svgCFTR, caption: 'Protéine CFTR dans la membrane : cellule saine / cellule malade.' },
    { type: 'svg', svg: svgArbre, caption: 'Arbre généalogique d’une maladie autosomique récessive.' },
    { type: 'svg', svg: svgCancer, caption: 'Les étapes de la cancérisation.' },
    { type: 'svg', svg: svgSelection, caption: 'Sélection de mutants résistants par un antibiotique.' },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Une mutation somatique :',
          choices: ['est transmise à tous les enfants', 'n’est pas transmise à la descendance', 'touche forcément un gamète', 'est toujours un cancer'],
          answer: 1,
        },
        {
          question: 'Le gène CFTR est situé sur :',
          choices: ['le chromosome X', 'le chromosome Y', 'le chromosome 7', 'l’ADN mitochondrial'],
          answer: 2,
        },
        {
          question: 'La mutation ΔF508 est :',
          choices: ['une substitution', 'une délétion de 3 nucléotides', 'une insertion d’un nucléotide', 'une translocation'],
          answer: 1,
          explanation: 'Elle supprime CTT, donc la phénylalanine 508, sans décalage du cadre de lecture.',
        },
        {
          question: 'Deux parents hétérozygotes (N//m) ont un risque d’enfant malade de :',
          choices: ['0', '1/4', '1/2', '3/4'],
          answer: 1,
        },
        {
          question: 'Un oncogène est :',
          choices: ['un gène suppresseur de tumeur muté', 'un proto-oncogène muté dont l’activité devient excessive', 'un virus', 'un facteur de risque'],
          answer: 1,
        },
        {
          question: 'Un cancer résulte généralement :',
          choices: ['d’une seule mutation', 'de l’accumulation de plusieurs mutations dans une cellule', 'd’une infection uniquement', 'd’un allèle hérité de façon systématique'],
          answer: 1,
        },
        {
          question: 'Les bactéries résistantes aux antibiotiques apparaissent car :',
          choices: ['l’antibiotique provoque la mutation de résistance', 'des mutants résistants préexistent et sont sélectionnés', 'les bactéries décident de résister', 'les virus transmettent la résistance'],
          answer: 1,
        },
        {
          question: 'Les antibiotiques sont efficaces contre :',
          choices: ['les virus de la grippe', 'les bactéries', 'les virus et les bactéries', 'tous les microbes'],
          answer: 1,
        },
        {
          question: 'Le transfert de gènes de résistance par plasmide entre bactéries est :',
          choices: ['une transmission verticale', 'un transfert horizontal', 'une mutation somatique', 'une mitose'],
          answer: 1,
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Mutation', back: 'Modification rare, aléatoire et permanente de la séquence de l’ADN.' },
        { front: 'Agent mutagène', back: 'Facteur qui augmente la fréquence des mutations (UV, rayons X, benzo[a]pyrène…).' },
        { front: 'Mutation germinale / somatique', back: 'Germinale : dans un gamète, transmise ; somatique : dans une cellule du corps, non transmise.' },
        { front: 'Mucoviscidose', back: 'Maladie génétique autosomique récessive due à des mutations du gène CFTR (chromosome 7) : mucus épais.' },
        { front: 'Protéine CFTR', back: 'Canal membranaire à ions chlorure des cellules épithéliales.' },
        { front: 'ΔF508', back: 'Délétion de 3 nucléotides (perte de la phénylalanine 508) : mutation la plus fréquente de CFTR.' },
        { front: 'Porteur sain', back: 'Individu hétérozygote N//m qui n’est pas malade mais peut transmettre l’allèle muté.' },
        { front: 'Cancer', back: 'Prolifération incontrôlée de cellules ayant accumulé des mutations.' },
        { front: 'Proto-oncogène / oncogène', back: 'Gène stimulant la division / sa forme mutée hyperactive.' },
        { front: 'Gène suppresseur de tumeur', back: 'Gène frein (ex. TP53) : sa perte de fonction favorise le cancer.' },
        { front: 'Facteur de risque', back: 'Facteur augmentant la probabilité d’une maladie (tabac, UV, alcool…).' },
        { front: 'Pression de sélection', back: 'Facteur du milieu (ex. antibiotique) qui favorise la survie des individus résistants.' },
        { front: 'Transfert horizontal', back: 'Passage de gènes (ex. résistance) d’une bactérie à une autre, par plasmide.' },
      ],
    },
    {
      type: 'cloze',
      title: 'La résistance aux antibiotiques',
      text: 'Dans une population bactérienne, des {{mutations}} apparaissent au hasard. Quelques bactéries sont {{résistantes}} avant tout contact avec l’antibiotique, qui exerce une {{pression de sélection}}. Les bactéries sensibles meurent, les résistantes se {{multiplient}} et transmettent leur {{allèle|gène}}.',
    },
    {
      type: 'matching',
      title: 'Associer facteur et cancer',
      pairs: [
        { left: 'Tabac', right: 'Cancer du poumon' },
        { left: 'UV', right: 'Cancer de la peau' },
        { left: 'Papillomavirus (HPV)', right: 'Cancer du col de l’utérus' },
        { left: 'Mutations BRCA1/2', right: 'Prédisposition au cancer du sein et de l’ovaire' },
      ],
    },
    {
      type: 'ordering',
      title: 'Du gène à la maladie (mucoviscidose)',
      items: [
        'Mutation du gène CFTR (délétion ΔF508)',
        'Synthèse d’une protéine CFTR anormale',
        'Dégradation de la protéine, absence de canal Cl⁻ dans la membrane',
        'Mucus déshydraté et épais',
        'Obstruction des bronches et du pancréas : symptômes',
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Un antibiotique est efficace contre la grippe.', answer: false, explanation: 'La grippe est virale.' },
        { text: 'Les mutations sont dirigées par les besoins de l’organisme.', answer: false, explanation: 'Elles sont aléatoires.' },
        { text: 'Un porteur sain de l’allèle de la mucoviscidose est hétérozygote.', answer: true },
        { text: 'Un cancer de la peau dû aux UV peut être transmis aux enfants.', answer: false, explanation: 'Les mutations sont somatiques.' },
        { text: 'Arrêter un traitement antibiotique dès qu’on se sent mieux est sans risque.', answer: false, explanation: 'Risque de sélectionner des bactéries résistantes.' },
        { text: 'Tous les cancers sont héréditaires.', answer: false, explanation: 'La plupart résultent de mutations somatiques.' },
      ],
    },
  ],
}

export default chapter
