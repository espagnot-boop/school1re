import type { Chapter } from '../types'

const HUGO = [
  'Demain, dès l’aube, à l’heure où blanchit la campagne,',
  'Je partirai. Vois-tu, je sais que tu m’attends.',
  'J’irai par la forêt, j’irai par la montagne.',
  'Je ne puis demeurer loin de toi plus longtemps.',
  '',
  'Je marcherai les yeux fixés sur mes pensées,',
  'Sans rien voir au dehors, sans entendre aucun bruit,',
  'Seul, inconnu, le dos courbé, les mains croisées,',
  'Triste, et le jour pour moi sera comme la nuit.',
  '',
  'Je ne regarderai ni l’or du soir qui tombe,',
  'Ni les voiles au loin descendant vers Harfleur,',
  'Et quand j’arriverai, je mettrai sur ta tombe',
  'Un bouquet de houx vert et de bruyère en fleur.',
].join('\n')

const chapter: Chapter = {
  id: 'commentaire',
  subject: 'francais',
  order: 5,
  title: 'Le commentaire de texte',
  theme: 'Méthodes du bac',
  summary:
    'Lire un texte, formuler une problématique, bâtir un plan en axes, rédiger introduction, développement et conclusion : la méthode complète, avec un commentaire entièrement rédigé.',
  duration: '3 semaines',
  objectives: [
    'Lire un texte littéraire de façon active : repérer genre, situation, thème, tonalités, procédés.',
    'Formuler une problématique qui interroge le texte et ne se contente pas de le paraphraser.',
    'Construire un plan en deux ou trois axes progressifs, chacun avec des sous-parties.',
    'Rédiger une introduction en cinq temps, un développement en paragraphes (idée – citation – analyse – interprétation) et une conclusion.',
    'Gérer son temps sur les 4 heures de l’épreuve écrite.',
  ],
  keywords: [
    'commentaire',
    'problématique',
    'axe',
    'plan',
    'introduction',
    'citation',
    'procédé',
    'effet',
    'interprétation',
    'conclusion',
  ],
  fiche: [
    {
      type: 'callout',
      variant: 'remember',
      title: 'L’épreuve écrite en bref (session 2027)',
      content: [
        {
          type: 'p',
          text: 'L’écrit anticipé de français dure **4 heures** et a lieu le **mardi 15 juin 2027 au matin**. Le candidat choisit entre **commentaire** (sur un texte littéraire, poésie ou prose, d’un auteur du programme ou non) et **dissertation** (sur une œuvre au programme). Le commentaire comme la dissertation sont notés sur 20 et comptent pour l’écrit. Vérifiez toujours les modalités sur le BO et Eduscol : elles peuvent être ajustées.',
        },
      ],
    },
    { type: 'h2', text: 'Les 5 temps du commentaire' },
    {
      type: 'steps',
      items: [
        { title: '1. Lire (30 à 40 min)', text: 'Lire le texte 2 à 3 fois, lire le paratexte (auteur, date, œuvre), annoter : champs lexicaux, figures, temps verbaux, énonciation, rythme.' },
        { title: '2. Problématiser', text: 'Dégager l’intérêt du texte, sa singularité : formuler une question à laquelle le commentaire répondra.' },
        { title: '3. Planifier', text: '2 ou 3 axes (titre-phrase), chacun avec 2 à 3 sous-parties, relevés et citations notés au brouillon.' },
        { title: '4. Rédiger l’introduction', text: 'Amorce – présentation du texte – situation – problématique – annonce du plan. Au propre, sur la copie.' },
        { title: '5. Rédiger le développement et la conclusion', text: 'Paragraphes argumentés, transitions, conclusion bilan + ouverture.' },
      ],
    },
    { type: 'h2', text: 'Le paragraphe type' },
    {
      type: 'list',
      ordered: true,
      items: [
        '**Idée** : une phrase qui énonce ce que le passage montre.',
        '**Citation** : courte, entre guillemets, avec le vers ou la ligne.',
        '**Procédé** : nommer précisément la figure ou le fait de langue.',
        '**Effet / interprétation** : ce que cela produit, ce que cela révèle.',
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Les erreurs qui coûtent cher',
      content: [
        {
          type: 'list',
          items: [
            'Paraphraser (redire le texte avec d’autres mots) ou faire une lecture linéaire au lieu d’un plan en axes.',
            '« Repérer » un procédé sans l’interpréter (« il y a une métaphore » ne suffit pas).',
            'Plaquer des connaissances sur l’auteur sans lien avec le texte.',
            'Annoncer un plan et ne pas le suivre ; oublier la conclusion faute de temps.',
          ],
        },
      ],
    },
  ],
  cours: [
    { type: 'h2', text: '1. Comprendre ce qu’est un commentaire' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Commentaire',
      content: [
        {
          type: 'p',
          text: 'Le commentaire de texte est un **exercice d’analyse et d’interprétation** : on explique comment un texte produit du sens et des effets, en organisant l’analyse **par centres d’intérêt** (les axes) et non en suivant le texte ligne à ligne. Il se distingue de l’**explication linéaire** de l’oral, qui suit le mouvement du texte.',
        },
      ],
    },
    {
      type: 'table',
      headers: ['', 'Commentaire (écrit)', 'Explication linéaire (oral)'],
      rows: [
        ['Organisation', 'Axes thématiques (2–3)', 'Mouvements successifs du texte'],
        ['Support', 'Texte inconnu, à partir du paratexte', 'Texte du parcours de l’œuvre étudié en classe'],
        ['Durée', 'Dans le cadre des 4 h de l’écrit', 'Quelques minutes à l’oral (cf. chapitre oral)'],
        ['Problématique', 'Obligatoire', 'Projet de lecture annoncé en introduction'],
      ],
    },
    { type: 'h2', text: '2. La lecture et les relevés' },
    {
      type: 'p',
      text: 'Avant tout, **lisez le titre, le nom de l’auteur, la date, la source** : ils donnent le genre, l’époque, le mouvement. Puis lisez le texte en entier plusieurs fois, crayon en main. Chaque lecture a un but différent.',
    },
    {
      type: 'steps',
      items: [
        { title: 'Lecture 1 : comprendre', text: 'Qui parle ? À qui ? De quoi ? Où et quand ? Quelle est la situation ? Quel est le mouvement général ?' },
        { title: 'Lecture 2 : repérer', text: 'Surligner par couleurs : champs lexicaux, figures de style, temps et modes verbaux, pronoms, ponctuation, rythme, sonorités.' },
        { title: 'Lecture 3 : interpréter', text: 'Se demander pourquoi : quel effet produisent ces choix, sur quelle émotion, quelle idée, quelle vision du monde ?' },
      ],
    },
    {
      type: 'table',
      headers: ['Grille de relevés', 'Questions à se poser'],
      rows: [
        ['Énonciation', 'Je, tu, nous, on ? Narrateur, point de vue (interne, externe, omniscient) ? Registre de langue ?'],
        ['Temps et modes', 'Futur, présent de vérité générale, imparfait, passé simple ? Impératif, conditionnel ?'],
        ['Lexique', 'Champs lexicaux dominants, connotations, mots-clés répétés, niveaux de langue.'],
        ['Syntaxe', 'Phrases longues ou brèves, nominales, interrogatives, exclamatives ? Rythme binaire, ternaire ?'],
        ['Figures', 'Comparaisons, métaphores, antithèses, hyperboles, ironie, anaphores…'],
        ['Sonorités, versification', 'Allitérations, assonances, rimes, enjambement, rejet, coupe, césure (si poème).'],
        ['Tonalités / registres', 'Lyrique, pathétique, tragique, comique, ironique, épique, polémique, fantastique…'],
      ],
    },
    { type: 'h2', text: '3. La problématique' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Problématique',
      content: [
        {
          type: 'p',
          text: 'La problématique est la **question centrale** que pose le texte à qui le lit attentivement : elle porte sur sa singularité, son effet, sa **visée**. Le commentaire entier est la réponse à cette question. Elle prend souvent la forme « Comment… ? » ou « En quoi… ? ».',
        },
      ],
    },
    {
      type: 'table',
      headers: ['À éviter', 'À préférer'],
      rows: [
        ['« Quels sont les procédés de ce texte ? » (descriptif)', '« Comment l’auteur transforme-t-il une scène banale en réquisitoire ? »'],
        ['« Que raconte ce poème ? » (paraphrase)', '« En quoi ce poème de deuil donne-t-il l’illusion d’un simple voyage ? »'],
        ['Question à laquelle on répond par oui ou non', 'Question qui invite à une démonstration progressive'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Astuce',
      content: [
        {
          type: 'p',
          text: 'Cherchez ce qui **surprend, ce qui change, ce qui résiste** : une chute, un contraste, une rupture de ton, un paradoxe. C’est presque toujours là que se trouve la problématique.',
        },
      ],
    },
    { type: 'h2', text: '4. Le plan : des axes, pas une liste' },
    {
      type: 'p',
      text: 'On organise l’analyse en **deux ou trois axes** (rarement quatre). Chaque axe est formulé par une **phrase-titre** qui énonce une idée (au brouillon, pas sur la copie) et se subdivise en **deux ou trois sous-parties**. Les axes doivent être **progressifs** : on va du plus évident au plus profond, ou du sens au projet de l’auteur.',
    },
    {
      type: 'grid',
      columns: 3,
      items: [
        { icon: 'Layers', title: 'Plan thématique', text: 'Chaque axe traite un thème ou un aspect : ce que dit le texte, comment il le dit, ce qu’il révèle.' },
        { icon: 'GitBranch', title: 'Plan chronologique (à éviter)', text: 'Suivre le texte du début à la fin : c’est de la lecture linéaire déguisée. On l’évite au commentaire.' },
        { icon: 'Target', title: 'Plan « de l’effet à la visée »', text: 'Du récit/de la forme (I) vers l’émotion (II) puis vers la portée, la leçon ou la réflexion (III).' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Chaque axe croise forme ET fond',
      content: [
        {
          type: 'p',
          text: 'Ne faites jamais « I. Le fond / II. La forme ». Dans chaque sous-partie, un **procédé** (forme) sert à faire ressortir une **idée ou une émotion** (fond). Les deux sont indissociables.',
        },
      ],
    },
    { type: 'h2', text: '5. L’introduction (au propre)' },
    {
      type: 'steps',
      items: [
        { title: 'Amorce', text: 'Une ou deux phrases pour entrer dans le sujet : le genre, une thématique générale, le courant littéraire. Pas de généralité vague (« De tout temps… »).' },
        { title: 'Présentation du texte', text: 'Auteur, titre, œuvre, date, genre, forme (poème en alexandrins, extrait de roman, scène de théâtre).' },
        { title: 'Situation du passage', text: 'Contexte dans l’œuvre et résumé en une phrase ; sujet du texte, mouvement général.' },
        { title: 'Problématique', text: 'Question centrale, formulée de façon claire (« Comment… ? »).' },
        { title: 'Annonce du plan', text: 'Les axes annoncés dans une phrase fluide : « Nous verrons d’abord… puis… enfin… ».' },
      ],
    },
    { type: 'h2', text: '6. Le développement' },
    {
      type: 'p',
      text: 'Chaque sous-partie correspond à **un paragraphe** (ou deux). Passez une ligne entre les axes et marquez les alinéas. Chaque paragraphe suit la structure **idée – citation – analyse – interprétation** (parfois dit « PEA » ou « PCEI » : Point, Citation, Explication, Interprétation).',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Un paragraphe modèle (Hugo, « Demain, dès l’aube »)',
      content: [
        {
          type: 'p',
          text: 'Le poète construit d’abord l’image d’un marcheur déterminé. Le futur de l’indicatif, omniprésent (« je partirai », « j’irai », « je marcherai »), exprime une **résolution sans faille**, tandis que l’**anaphore** « j’irai par la forêt, j’irai par la montagne » (v. 3) donne au vers un rythme régulier de pas qui avancent. Cette répétition suggère un voyage qui semble sans fin, et prépare le lecteur à comprendre que ce déplacement dépasse une simple promenade.',
        },
      ],
    },
    { type: 'h3', text: 'Les connecteurs pour articuler le développement' },
    {
      type: 'table',
      headers: ['Fonction', 'Exemples'],
      rows: [
        ['Ajouter', 'de plus, en outre, par ailleurs, également, non seulement… mais encore'],
        ['Opposer', 'cependant, pourtant, en revanche, toutefois, à l’inverse'],
        ['Expliquer / justifier', 'en effet, car, c’est pourquoi, ainsi, par conséquent'],
        ['Illustrer', 'par exemple, notamment, comme le montre, ainsi (« … »)'],
        ['Conclure', 'finalement, en somme, ainsi, on voit que'],
      ],
    },
    { type: 'h3', text: 'Citer correctement' },
    {
      type: 'list',
      items: [
        'Citations **courtes** (un mot, un groupe, un vers), entre **guillemets** : « lui tendant la main ».',
        'Localisation : vers 3 (« v. 3 ») pour un poème, ligne (« l. 5 ») pour un texte en prose.',
        'La citation s’intègre dans votre phrase : « Le poète emploie le verbe “partir” au futur (« je partirai », v. 2) ».',
        'Pour deux vers, séparer par une barre oblique : « J’irai par la forêt, / j’irai par la montagne ».',
      ],
    },
    { type: 'h2', text: '7. La conclusion' },
    {
      type: 'steps',
      items: [
        { title: 'Bilan', text: 'Répondre à la problématique en reprenant les axes, sans simple redite : « Le texte a montré que… ».' },
        { title: 'Ouverture', text: 'Élargir : autre texte, œuvre, mouvement ou thème en lien (idéalement avec une œuvre du programme). Une phrase suffit, mais elle doit être pertinente.' },
      ],
    },
    { type: 'h2', text: '8. Exemple complet : « Demain, dès l’aube » (Victor Hugo)' },
    {
      type: 'callout',
      variant: 'history',
      title: 'Texte',
      content: [
        {
          type: 'quote',
          text: HUGO,
          author: 'Victor Hugo',
          source: 'Les Contemplations, « Pauca meae », IV, 14 (1856) — poème daté du 3 octobre 1847',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Relevés au brouillon',
      content: [
        {
          type: 'list',
          items: [
            '**Genre** : poème lyrique, trois quatrains d’alexandrins, rimes croisées (ABAB).',
            '**Énonciation** : « je » et « tu » (« Vois-tu, je sais que tu m’attends »), apostrophe à une personne aimée.',
            '**Temps** : futur de l’indicatif dans tout le poème, avec un seul présent (« je sais que tu m’attends »).',
            '**Lexique** : mouvement (« partirai », « irai », « marcherai », « arriverai ») ; repli (« yeux fixés sur mes pensées », « dos courbé », « mains croisées ») ; tristesse (« Triste », « nuit », « tombe »).',
            '**Chute** : seule la dernière strophe dévoile la destination : la **tombe** de la personne aimée.',
            '**Contexte** : la fille de Hugo, Léopoldine, est morte noyée à Villequier en 1843. Le poème évoque une visite à sa tombe. Harfleur est un ancien port de l’estuaire de la Seine. (Ce contexte est connu par le recueil, pas par le poème seul : il est autorisé s’il éclaire le texte, mais le commentaire doit rester centré sur le texte.)',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Problématique et plan retenus',
      content: [
        { type: 'p', text: '**Problématique** : comment Hugo fait-il d’un simple récit de voyage l’expression retenue et bouleversante d’un deuil ?' },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Un voyage résolu** : la certitude d’un départ (futur, anaphores, précision du temps et du lieu, adresse à l’être aimé).',
            '**Une marche intérieure et douloureuse** : le poète se coupe du monde (négations, repli sur soi, antithèse jour/nuit).',
            '**Un dénouement qui bouleverse** : la chute dévoile la tombe ; le dernier vers, par la simplicité du geste (le bouquet), exprime la tendresse et la douleur.',
          ],
          },
      ],
    },
    { type: 'h3', text: 'Introduction rédigée' },
    {
      type: 'p',
      text: 'Le recueil *Les Contemplations* (1856) rassemble les poèmes que Victor Hugo a écrits sur vingt-cinq ans, et dont la deuxième partie, « Aujourd’hui », s’ouvre sur la mort de sa fille Léopoldine, noyée en 1843. Dans « Demain, dès l’aube », poème lyrique composé de trois quatrains d’alexandrins à rimes croisées, le poète annonce à l’être aimé un départ à pied pour le retrouver. On croit lire d’abord le récit d’un voyage ; ce n’est qu’à la dernière strophe qu’on comprend que ce voyage mène à une tombe. Comment Hugo fait-il d’un simple récit de voyage l’expression retenue et bouleversante d’un deuil ? Nous verrons d’abord que le poème construit l’image d’un voyage résolu, puis que cette marche est avant tout intérieure et douloureuse, avant d’analyser comment le dénouement révèle le sens caché du poème.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Vérifiez l’introduction',
      content: [
        {
          type: 'p',
          text: 'Les cinq éléments sont là : amorce (le recueil et la mort de Léopoldine), présentation (genre, forme), situation (le départ annoncé), problématique (la question), annonce du plan (trois axes). Remarquez que l’introduction **ne dévoile pas la chute en détail** : elle crée l’attente, comme le poème.',
        },
      ],
    },
    { type: 'h3', text: 'Développement rédigé' },
    {
      type: 'p',
      text: '**I. Un voyage résolu.** Le poème s’ouvre sur un projet très précis : « Demain, dès l’aube, à l’heure où blanchit la campagne » (v. 1). L’indication temporelle, d’une grande précision poétique, inscrit le départ dans un cadre quasi réel, tandis que l’adverbe « Demain » donne au projet une immédiateté qui ne laisse aucune place au doute. Le futur de l’indicatif, présent dans presque tous les vers (« je partirai », « j’irai », « je marcherai »), exprime **une certitude absolue** : le poète ne dit pas « je voudrais », il dit « je partirai ». Cette détermination est renforcée par l’**anaphore** « j’irai par la forêt, j’irai par la montagne » (v. 3), dont le parallélisme syntaxique reproduit le **rythme régulier d’un marcheur** et dont l’énumération des lieux suggère un long trajet à travers tous les obstacles.',
    },
    {
      type: 'p',
      text: 'Ce voyage est pourtant dicté par une relation intime. Dès le vers 2, le poète s’adresse à un « tu » (« Vois-tu, je sais que tu m’attends ») : le présent de l’indicatif, seul au milieu des futurs, exprime une **vérité affective** qui justifie la marche. Le dernier vers de la première strophe en donne la raison : « Je ne puis demeurer loin de toi plus longtemps » (v. 4). La tournure soutenue « je ne puis », la litote douloureuse de « plus longtemps » trahissent une **séparation devenue insupportable** : le voyage n’est pas un choix mais une nécessité.',
    },
    {
      type: 'p',
      text: '**II. Une marche intérieure et douloureuse.** La deuxième strophe change de focale : on ne regarde plus la route mais l’état d’esprit du marcheur. Il avance « les yeux fixés sur [ses] pensées » (v. 5), expression qui retourne le regard vers l’intérieur, tandis que la double négation « sans rien voir au dehors, sans entendre aucun bruit » (v. 6) **abolit le monde extérieur**. Le parallélisme des deux groupes (« sans… sans… ») et l’absence de verbe conjugué enferment le personnage dans sa **solitude**. Les adjectifs et les participes qui suivent (« Seul, inconnu, le dos courbé, les mains croisées », v. 7) brossent un portrait en quelques touches : la ponctuation (virgules) hache le vers et le **ralentit**, comme pour imiter le pas lourd d’un homme accablé. La posture des « mains croisées » évoque l’attitude de la prière autant que celle de l’abattement.',
    },
    {
      type: 'p',
      text: 'La strophe s’achève sur une **comparaison** douloureuse : « Triste, et le jour pour moi sera comme la nuit » (v. 8). L’**antithèse** jour/nuit est ici abolie : pour le poète en deuil, la lumière a perdu son pouvoir, tout se confond dans l’obscurité du chagrin. Le début de la troisième strophe prolonge cette cécité volontaire avec la **négation** « Je ne regarderai ni l’or du soir qui tombe, / Ni les voiles au loin descendant vers Harfleur » (v. 9-10). Hugo évoque, par deux images lumineuses (l’« or » du soir, les « voiles » qui descendent la Seine), la beauté du monde, mais pour **mieux souligner que le poète n’y est plus sensible**. Le contraste entre la beauté évoquée et l’indifférence du marcheur creuse la douleur.',
    },
    {
      type: 'p',
      text: '**III. Un dénouement qui bouleverse.** C’est au vers 11 que le sens du poème bascule : « Et quand j’arriverai, je mettrai sur ta tombe ». Le mot « tombe » révèle brutalement la destination : tout le poème prend alors **un autre sens**, et les mots « loin de toi », « tu m’attends », « nuit », « triste » s’éclairent rétrospectivement. La **rime** « tombe / tombe » (v. 9 et 11) joue d’ailleurs sur une homonymie : le soir « qui tombe » annonce, par le simple écho sonore, la « tombe » qui attend le poète, et suggère que la mort a envahi jusqu’à l’image du soir.',
    },
    {
      type: 'p',
      text: 'Le dernier vers, « Un bouquet de houx vert et de bruyère en fleur » (v. 12), apporte une **conclusion à la fois simple et déchirante**. Le geste, minuscule, a la douceur d’une offrande ; le choix des plantes est précis : le « houx vert » reste vert en hiver, et la « bruyère en fleur » fleurit à l’automne, à la saison du poème (octobre) — deux végétaux qui défient la mort par leur permanence. Le rythme du vers, régulier et apaisé, tranche avec l’agitation des strophes précédentes : après la marche douloureuse, le poète atteint enfin son but et une forme de **paix** se dessine, sans pour autant effacer la souffrance. Le poème demeure ainsi dans la retenue : Hugo ne dit jamais « ma fille est morte », il le fait comprendre.',
    },
    { type: 'h3', text: 'Conclusion rédigée' },
    {
      type: 'p',
      text: 'Ainsi, dans « Demain, dès l’aube », Hugo transforme le récit d’un voyage en une **expression pudique du deuil** : la certitude du départ, la marche repliée sur la douleur, puis la révélation finale de la tombe construisent un poème de la retenue, où l’émotion naît de ce qui n’est pas dit. En refusant les lamentations, le poète rend le chagrin d’autant plus poignant. Cette pudeur rapproche ce poème de nombreux textes sur la perte d’un être cher, et l’on pourrait le comparer à d’autres poèmes des *Contemplations* où Hugo évoque Léopoldine, par exemple « À Villequier », plus ouvertement tourné vers la méditation sur la mort et sur Dieu.',
    },
    { type: 'h2', text: '9. Gérer ses 4 heures' },
    {
      type: 'table',
      headers: ['Phase', 'Durée indicative', 'Objectif'],
      rows: [
        ['Choix du sujet et premières lectures', '20–30 min', 'Choisir commentaire ou dissertation selon son aisance, pas par peur'],
        ['Lecture annotée, relevés', '30–40 min', 'Repérages précis'],
        ['Problématique et plan (brouillon)', '30 min', 'Axes solides, citations choisies'],
        ['Introduction (au propre)', '20–25 min', 'Soignée, complète'],
        ['Développement', '1 h 30', 'Trois axes équilibrés'],
        ['Conclusion', '10 min', 'Bilan + ouverture'],
        ['Relecture', '10–15 min', 'Orthographe, accords, citations'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'À retenir',
      content: [
        {
          type: 'list',
          items: [
            'Un commentaire répond à **une problématique** et s’organise en **axes**.',
            'Chaque paragraphe : **idée – citation – procédé – effet/interprétation**.',
            'Rédigez toujours une conclusion, même brève.',
            'La qualité de l’écriture (orthographe, syntaxe, vocabulaire précis) est évaluée.',
          ],
        },
      ],
    },
  ],
  exercices: [
    {
      id: 'com-ex1',
      title: 'Identifier les éléments de l’introduction',
      difficulty: 1,
      duration: 10,
      tags: ['introduction'],
      statement: [
        { type: 'p', text: 'Voici une introduction de commentaire. Identifiez chacun des cinq éléments (amorce, présentation, situation, problématique, annonce du plan).' },
        {
          type: 'quote',
          text: 'La Fontaine, dans ses *Fables*, met en scène des animaux pour critiquer les hommes. Dans « Le Corbeau et le Renard » (livre I, fable 2, 1668), il raconte comment un renard flatteur dérobe un fromage à un corbeau vaniteux. Comment La Fontaine fait-il de cette scène animalière une leçon de morale vivante et amusante ? Nous verrons d’abord comment il construit un récit vivant, puis comment il fait du dialogue le lieu d’une démonstration, avant de dégager la morale de l’apologue.',
        },
      ],
      hints: ['Cherchez la phrase interrogative : c’est la problématique.', 'La dernière phrase contient « d’abord… puis… avant de ».'],
      solution: [
        {
          type: 'list',
          items: [
            '**Amorce** : « La Fontaine, dans ses *Fables*, met en scène des animaux pour critiquer les hommes. »',
            '**Présentation et situation** : « Le Corbeau et le Renard » (livre I, fable 2, 1668), un renard flatteur dérobe un fromage à un corbeau vaniteux.',
            '**Problématique** : « Comment La Fontaine fait-il de cette scène animalière une leçon de morale vivante et amusante ? »',
            '**Annonce du plan** : trois axes (récit vivant, dialogue-démonstration, morale).',
          ],
        },
        { type: 'p', text: 'Remarque : ici la présentation et la situation sont fusionnées en une phrase, ce qui est acceptable pour un texte court. On veillera cependant à bien indiquer l’auteur, le titre, la date et le genre.' },
      ],
    },
    {
      id: 'com-ex2',
      title: 'Corriger des problématiques',
      difficulty: 1,
      duration: 10,
      tags: ['problématique'],
      statement: [
        { type: 'p', text: 'Pour chaque problématique, dites si elle est acceptable et, sinon, proposez une reformulation. Texte : « Demain, dès l’aube » (Hugo).' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quelles sont les figures de style de ce poème ?',
            'Que raconte le poème ?',
            'Comment Hugo fait-il d’un récit de voyage l’expression discrète d’un deuil ?',
            'Hugo est-il triste dans ce poème ?',
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**Non** : question purement descriptive (procédés). Reformulation : « Comment les procédés d’écriture traduisent-ils la douleur du poète ? ».',
            '**Non** : appelle une paraphrase. Reformulation : « Comment le poème transforme-t-il un récit simple en méditation sur la mort ? ».',
            '**Oui** : elle porte sur l’effet du texte et appelle une démonstration (voyage → deuil).',
            '**Non** : question fermée (réponse oui/non) et trop évidente. Reformulation : « Comment la tristesse s’exprime-t-elle par la retenue plutôt que par les plaintes ? ».',
          ],
        },
      ],
    },
    {
      id: 'com-ex3',
      title: 'Relevés sur un texte de Baudelaire',
      difficulty: 2,
      duration: 20,
      tags: ['lecture', 'relevés'],
      statement: [
        {
          type: 'quote',
          text: 'La Nature est un temple où de vivants piliers\nLaissent parfois sortir de confuses paroles ;\nL’homme y passe à travers des forêts de symboles\nQui l’observent avec des regards familiers.',
          author: 'Charles Baudelaire',
          source: 'Les Fleurs du mal, « Correspondances » (1857), vers 1-4',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quel est le genre de ce passage et quelle forme a-t-il (type de vers, de rimes) ?',
            'Relevez une métaphore et une personnification, et interprétez-les.',
            'Quel est le champ lexical dominant ? Que suggère-t-il ?',
            'Proposez une problématique.',
          ],
        },
      ],
      hints: ['Comptez les syllabes du premier vers : « La Na-tu-re est un tem-ple où de vi-vants pi-liers ».', 'Les rimes sont piliers / paroles / symboles / familiers : dans quel ordre ?'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Ce sont les premiers vers d’un **sonnet** (poème lyrique) en **alexandrins** à **rimes embrassées** (ABBA : piliers / paroles / symboles / familiers).',
            '**Métaphore** : « La Nature est un temple » (la Nature est assimilée à un lieu sacré, ce qui lui donne une dimension spirituelle). **Personnification** : les « piliers » sont « vivants » et laissent « sortir de confuses paroles », les symboles « observent » l’homme avec des « regards familiers » : la nature semble vivante, consciente et bienveillante.',
            'Le champ lexical du **sacré / du temple** (temple, piliers) et celui de la **perception** (paroles, observent, regards) : l’homme est face à un monde qui lui parle et le regarde, mais dont il ne comprend pas tout (« confuses »).',
            'Par exemple : « Comment Baudelaire fait-il de la Nature un lieu sacré dont l’homme doit déchiffrer le langage ? ».',
          ],
        },
      ],
    },
    {
      id: 'com-ex4',
      title: 'Construire un plan',
      difficulty: 2,
      duration: 25,
      tags: ['plan'],
      statement: [
        {
          type: 'quote',
          text: 'Il y avait là des chevaux fumants qui renâclaient. Les murs étaient noirs de suie. Dans la grande forge, les ouvriers, torse nu, frappaient en cadence sur l’enclume ; chaque coup faisait jaillir une gerbe d’étincelles, et la sueur coulait sur leurs dos luisants comme une pluie sombre.',
          source: 'Texte fictif écrit pour l’exercice',
        },
        { type: 'p', text: 'Proposez une problématique et un plan en deux ou trois axes pour ce texte, avec pour chaque axe une phrase-titre et deux sous-parties.' },
      ],
      hints: ['Cherchez les champs lexicaux du feu, du travail, de la dureté.', 'Quel effet produisent le rythme et les sonorités ?'],
      solution: [
        { type: 'p', text: '**Problématique possible** : comment l’auteur donne-t-il à la forge une dimension à la fois réaliste et presque épique ?' },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Une description réaliste d’un lieu de travail** : (a) un décor sombre et chaud (« noirs de suie », « fumants ») ; (b) des gestes précis et physiques (« torse nu », « frappaient », « sueur »).',
            '**Un monde en mouvement, rythmé** : (a) le rythme de la phrase et les allitérations en [f] et [r] qui imitent les coups ; (b) l’effet de cadence collective (« en cadence »).',
            '**Une vision épique du travail** : (a) l’hyperbole et l’image des « gerbes d’étincelles » ; (b) la comparaison « comme une pluie sombre », qui donne à la scène une dimension presque cosmique.',
          ],
        },
        { type: 'p', text: 'Le plan va du plus visible (le décor) au plus interprétatif (la portée épique) : il est donc **progressif**.' },
      ],
    },
    {
      id: 'com-ex5',
      title: 'Rédiger un paragraphe de développement',
      difficulty: 2,
      duration: 20,
      tags: ['rédaction'],
      statement: [
        { type: 'p', text: 'En vous appuyant sur « Demain, dès l’aube » (Hugo), rédigez un paragraphe de commentaire sur l’idée suivante : « Le poème exprime la douleur par la retenue » (à partir de la deuxième strophe). Respectez la structure idée – citation – procédé – interprétation.' },
      ],
      hints: ['Choisissez 2 citations courtes.', 'N’oubliez pas d’interpréter chaque procédé.'],
      solution: [
        {
          type: 'p',
          text: 'Un paragraphe possible : « La deuxième strophe exprime la douleur du poète sans jamais la nommer directement. Le portrait du marcheur, fait de touches juxtaposées (« Seul, inconnu, le dos courbé, les mains croisées », v. 7), repose sur une **énumération d’adjectifs et de groupes nominaux sans verbe** : cette absence de verbe immobilise le personnage dans l’abattement. La répétition de la préposition « sans » dans le vers 6 (« sans rien voir… sans entendre… ») **abolit le monde extérieur** : le poète est enfermé dans son chagrin. Enfin, la comparaison « le jour pour moi sera comme la nuit » (v. 8) confond la lumière et l’obscurité et suggère un monde privé de sens depuis la mort de l’être aimé. La douleur se lit donc dans la forme même du vers plutôt que dans des plaintes explicites. »',
        },
      ],
    },
    {
      id: 'com-ex6',
      title: 'Écrire une conclusion',
      difficulty: 2,
      duration: 15,
      tags: ['conclusion'],
      statement: [
        { type: 'p', text: 'Rédigez la conclusion d’un commentaire d’un extrait de *Candide* (Voltaire, chapitre 3, la « boucherie héroïque ») dont les axes étaient : I. un récit d’apparence épique ; II. un renversement ironique ; III. une dénonciation de la guerre. Elle doit contenir un bilan et une ouverture.' },
      ],
      hints: ['Reprenez les trois axes en une ou deux phrases.', 'Ouvrez sur un autre texte qui dénonce la guerre : « Le Dormeur du val » de Rimbaud, ou Les Misérables de Hugo (Waterloo), par exemple.'],
      solution: [
        {
          type: 'p',
          text: 'Exemple : « Ainsi, sous les apparences d’un récit épique, Voltaire retourne les codes de la guerre contre elle-même : l’emploi de termes exaltants (« rien n’était si beau… »), détournés par l’**ironie** et les **antithèses** (« boucherie héroïque »), met à nu l’absurdité et l’horreur des combats. Ce passage illustre la visée du conte philosophique, qui est de faire réfléchir par le rire. On peut rapprocher ce texte de « Le Dormeur du val » de Rimbaud, où un cadre idyllique cache aussi la mort d’un jeune soldat : dans les deux cas, le contraste dénonce l’absurdité de la guerre. »',
        },
      ],
    },
    {
      id: 'com-ex7',
      title: 'Type bac : commentaire d’un poème de Verlaine',
      difficulty: 3,
      duration: 90,
      tags: ['type bac'],
      statement: [
        { type: 'p', text: 'Rédigez un commentaire du texte suivant (introduction, deux axes développés, conclusion).' },
        {
          type: 'quote',
          text: 'Il pleure dans mon cœur\nComme il pleut sur la ville ;\nQuelle est cette langueur\nQui pénètre mon cœur ?\n\nÔ bruit doux de la pluie\nPar terre et sur les toits !\nPour un cœur qui s’ennuie,\nÔ le chant de la pluie !',
          author: 'Paul Verlaine',
          source: 'Romances sans paroles, « Ariettes oubliées » III (1874), strophes 1 et 2',
        },
      ],
      hints: [
        'Remarquez la rime « cœur / langueur / cœur » (v. 1, 3, 4) et la reprise de « pluie ».',
        'Pensez à la musicalité : vers courts (hexasyllabes), allitérations en [l] et [p], et l’impersonnel « il pleure ».',
        'Axes possibles : I. une correspondance entre paysage et émotion ; II. une musique de la mélancolie.',
      ],
      solution: [
        { type: 'h3', text: 'Problématique et plan' },
        { type: 'p', text: '**Problématique** : comment Verlaine fait-il de la pluie le miroir d’un état d’âme mélancolique et la matière d’une musique poétique ?' },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Une correspondance entre le paysage et l’émotion** : la comparaison initiale, l’impersonnel « il pleure » qui confond le dehors et le dedans, le mystère de la « langueur » sans cause.',
            '**Une poésie musicale** : vers courts de six syllabes, répétitions (« cœur », « pluie »), allitérations en [l] et [p], assonances en [œ] (« cœur », « langueur »), exclamations.',
          ],
        },
        { type: 'h3', text: 'Introduction (rédigée)' },
        {
          type: 'p',
          text: 'Dans les *Romances sans paroles* (1874), recueil composé pendant sa liaison avec Rimbaud, Paul Verlaine cherche à faire de la poésie une musique avant toute chose. Le poème « Il pleure dans mon cœur », extrait des « Ariettes oubliées » (III), est constitué de quatrains de vers courts, à la manière d’une petite chanson. Le poète y évoque une tristesse sans cause qui l’envahit au rythme de la pluie. Comment Verlaine fait-il de la pluie le miroir d’un état d’âme mélancolique et la matière d’une musique poétique ? Nous verrons d’abord comment le poème établit une correspondance entre le paysage et l’émotion, puis comment il s’appuie sur une écriture musicale pour traduire cette « langueur » insaisissable.',
        },
        { type: 'h3', text: 'Développement (rédigé)' },
        {
          type: 'p',
          text: '**I. Une correspondance entre le paysage et l’émotion.** Le poème s’ouvre sur une **comparaison** inattendue : « Il pleure dans mon cœur / Comme il pleut sur la ville » (v. 1-2). Verlaine utilise le verbe impersonnel « il pleure », construit sur le modèle de « il pleut » : la tristesse devient un phénomène naturel et involontaire, sur lequel le poète n’a pas de prise, **comme on ne choisit pas la pluie**. La symétrie syntaxique des deux vers (« Il pleure… / Il pleut… ») associe intimement l’intérieur (« mon cœur ») et l’extérieur (« la ville ») : le monde et l’âme semblent faits de la même matière. Cette tristesse reste pourtant **inexpliquée** : la question « Quelle est cette langueur / Qui pénètre mon cœur ? » (v. 3-4) exprime l’incompréhension du poète. Le verbe « pénètre » suggère une **intrusion douce mais irrésistible**, comme l’eau qui s’infiltre. Ce flou correspond à l’idée verlainienne de « nuance » : l’émotion est indéfinie, mouvante.',
        },
        {
          type: 'p',
          text: '**II. Une poésie musicale.** Le poème mime la pluie par sa forme. Les **vers courts** (six syllabes, ou hexasyllabes) donnent un rythme léger et régulier, comme des gouttes qui tombent. Les répétitions sont nombreuses : « cœur » revient trois fois en quatre vers et rime avec lui-même (v. 1, 4) ou avec « langueur » (v. 3), et la « pluie » est reprise dans la deuxième strophe (« bruit doux de la pluie », « chant de la pluie »). Cette **répétition** a l’effet d’un refrain ou d’une berceuse. Les **sonorités** accentuent cette musicalité : l’allitération en [l] (« ville », « langueur », « pluie ») donne au poème une fluidité liquide, tandis que l’assonance en [œ] (« pleure », « cœur », « langueur ») prolonge un son sourd et plaintif, comme un soupir. Les exclamations de la seconde strophe (« Ô bruit doux de la pluie… », « Ô le chant de la pluie ! ») transforment la plainte en **chant**. La pluie, d’abord source de tristesse, devient même consolation : le bruit est « doux » et il est le « chant » qui apaise « un cœur qui s’ennuie ».',
        },
        { type: 'h3', text: 'Conclusion (rédigée)' },
        {
          type: 'p',
          text: 'Ainsi Verlaine fait de la pluie à la fois une image de la mélancolie et le modèle d’une écriture musicale : en confondant paysage et émotion, puis en travaillant rythme, répétitions et sonorités, il exprime une tristesse indéfinissable que les mots seuls ne sauraient dire. Ce poème illustre l’idée développée dans son « Art poétique » (« De la musique avant toute chose ») et peut être rapproché de poèmes de Baudelaire (« Spleen ») où la pluie, elle aussi, devient l’image de l’ennui.',
        },
      ],
    },
  ],
  representations: [
    {
      type: 'flashcards',
      cards: [
        { front: 'Qu’est-ce qu’un commentaire de texte ?', back: 'Un exercice d’analyse et d’interprétation organisé en axes, qui explique comment un texte produit du sens et des effets.' },
        { front: 'Les 5 éléments de l’introduction', back: 'Amorce, présentation du texte, situation du passage, problématique, annonce du plan.' },
        { front: 'Qu’est-ce qu’une problématique ?', back: 'La question centrale, portant sur la singularité du texte et sa visée, à laquelle le commentaire répond.' },
        { front: 'Pourquoi éviter le plan chronologique ?', back: 'Il revient à une lecture linéaire : le commentaire doit être organisé par centres d’intérêt (axes).' },
        { front: 'Structure d’un paragraphe', back: 'Idée – citation – procédé – effet/interprétation.' },
        { front: 'Comment citer un vers ?', back: 'Entre guillemets, avec le numéro du vers (v. 3) ; pour deux vers, séparer par une barre oblique.' },
        { front: 'Que contient la conclusion ?', back: 'Un bilan qui répond à la problématique et une ouverture (autre texte, œuvre, courant).' },
        { front: 'Que veut dire « interpréter » un procédé ?', back: 'Expliquer l’effet produit et ce qu’il révèle du sens ou de la vision de l’auteur, au-delà du simple repérage.' },
        { front: 'Différence commentaire / explication linéaire', back: 'Commentaire : écrit, en axes. Explication linéaire : orale, suit le mouvement du texte.' },
        { front: 'Durée de l’épreuve écrite', back: '4 heures (commentaire ou dissertation), le mardi 15 juin 2027 au matin.' },
        { front: 'Pourquoi forme et fond sont-ils liés ?', back: 'Parce que chaque procédé d’écriture (forme) sert à produire un effet ou un sens (fond) : on ne les sépare pas dans un même axe.' },
        { front: 'Que faire en premier avant de lire le texte ?', back: 'Lire le paratexte : auteur, titre, date, œuvre, genre.' },
      ],
    },
    {
      type: 'qcm',
      questions: [
        { question: 'Une bonne problématique de commentaire…', choices: ['résume le texte', 'liste les figures de style', 'pose une question sur la singularité et l’effet du texte', 'se répond par oui ou non'], answer: 2, explanation: 'Elle interroge ce que le texte a de singulier et appelle une démonstration.' },
        { question: 'Quel plan est à éviter au commentaire ?', choices: ['Thématique', 'Chronologique (ligne à ligne)', 'En trois axes progressifs', 'De la forme vers la visée'], answer: 1, explanation: 'Le plan chronologique est une lecture linéaire déguisée.' },
        { question: 'Combien d’axes développe-t-on en général ?', choices: ['1', '2 ou 3', '5', '6'], answer: 1 },
        { question: 'Que doit-on faire d’un procédé repéré ?', choices: ['Le nommer seulement', 'Le nommer et interpréter son effet', 'L’ignorer', 'Le recopier'], answer: 1 },
        { question: 'Comment doit être une citation ?', choices: ['Un paragraphe entier recopié', 'Courte, entre guillemets, localisée', 'Sans guillemets', 'Toujours en italique sans indication'], answer: 1 },
        { question: 'Où place-t-on la problématique ?', choices: ['Dans la conclusion', 'Dans l’introduction', 'Au brouillon seulement', 'Au milieu du développement'], answer: 1 },
        { question: 'Que contient l’ouverture de la conclusion ?', choices: ['Une nouvelle analyse du texte', 'Un lien avec une autre œuvre, un courant ou un thème', 'Un résumé du texte', 'Une critique de l’auteur'], answer: 1 },
        { question: 'Dans « Demain, dès l’aube », que révèle le dernier quatrain ?', choices: ['La destination : la tombe de l’être aimé', 'Une rencontre amoureuse', 'Un retour chez soi', 'Un voyage en bateau'], answer: 0, explanation: 'Le mot « tombe » (v. 11) dévoile le sens de tout le poème.' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer l’étape du commentaire à son rôle',
      pairs: [
        { left: 'Amorce', right: 'Entrer dans le sujet (genre, thème, courant)' },
        { left: 'Situation du passage', right: 'Placer l’extrait dans l’œuvre et dire de quoi il parle' },
        { left: 'Problématique', right: 'Question centrale à laquelle répond le commentaire' },
        { left: 'Annonce du plan', right: 'Présenter les axes dans une phrase fluide' },
        { left: 'Bilan', right: 'Répondre à la problématique en conclusion' },
        { left: 'Ouverture', right: 'Élargir à un autre texte ou thème' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter la méthode',
      text: 'Un commentaire s’organise en {{axes}} et non ligne à ligne. Chaque paragraphe associe une idée, une {{citation}}, un {{procédé}} et une {{interprétation|analyse|effet}}. L’introduction s’achève par la {{problématique}} et l’annonce du {{plan}}. Dans « Demain, dès l’aube », le {{futur}} de l’indicatif exprime la résolution du poète.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'On peut commencer le commentaire sans avoir lu le titre ni l’auteur.', answer: false, explanation: 'Le paratexte donne des informations essentielles (genre, époque, œuvre).' },
        { text: 'Repérer une métaphore suffit pour obtenir tous les points.', answer: false, explanation: 'Il faut en interpréter l’effet et la signification.' },
        { text: 'Un plan « I. Le fond / II. La forme » est conseillé.', answer: false, explanation: 'Chaque axe doit croiser forme et fond.' },
        { text: 'La conclusion peut contenir une ouverture.', answer: true },
        { text: 'On cite des passages courts, entre guillemets, avec leur localisation.', answer: true },
        { text: 'Le plan est annoncé à la fin de l’introduction.', answer: true },
        { text: 'Il est inutile de faire une conclusion si le temps manque.', answer: false, explanation: 'Mieux vaut en rédiger une courte : elle est attendue.' },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Lire le paratexte', text: 'Auteur, titre, date, source, genre.' },
        { title: 'Annoter', text: 'Champs lexicaux, figures, temps, énonciation, rythme.' },
        { title: 'Formuler la problématique', text: 'Ce que le texte a de singulier ; question « Comment… ? ».' },
        { title: 'Construire les axes', text: '2 à 3 axes progressifs, chaque axe avec 2 sous-parties.' },
        { title: 'Rédiger l’introduction au propre', text: 'Les 5 temps.' },
        { title: 'Rédiger le développement', text: 'Idée – citation – procédé – interprétation.' },
        { title: 'Conclure', text: 'Bilan + ouverture, puis relire.' },
      ],
    },
    {
      type: 'ordering',
      title: 'Remettre les étapes de l’introduction dans l’ordre',
      items: ['Amorce', 'Présentation du texte', 'Situation du passage', 'Problématique', 'Annonce du plan'],
    },
    {
      type: 'widget',
      id: 'syllable-counter',
      props: { verse: 'Demain, dès l’aube, à l’heure où blanchit la campagne,' },
      title: 'Compter les syllabes d’un vers de Hugo',
      caption: 'Alexandrin : 12 syllabes. Le « e » final de « campagne » ne compte pas en fin de vers.',
    },
    {
      type: 'reveal',
      title: 'Voir le plan complet de « Demain, dès l’aube »',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Un voyage résolu (futur, anaphore, adresse au « tu », urgence).',
            'Une marche intérieure et douloureuse (négations, repli, antithèse jour/nuit).',
            'Un dénouement qui bouleverse (chute, rime tombe/tombe, bouquet de houx et de bruyère).',
          ],
        },
      ],
    },
  ],
}

export default chapter
