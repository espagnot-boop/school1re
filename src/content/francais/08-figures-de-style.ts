import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'figures-de-style',
  subject: 'francais',
  order: 8,
  title: 'Figures de style, registres et champs lexicaux',
  theme: 'Outils d’analyse',
  summary:
    'Reconnaître, nommer et interpréter les principales figures de style (analogie, substitution, amplification et atténuation, opposition, construction, sonorités), les registres littéraires et les champs lexicaux.',
  duration: '3 semaines',
  objectives: [
    'Identifier une figure de style et la nommer précisément.',
    'Distinguer les grandes familles de figures : analogie, substitution, amplification/atténuation, opposition, construction, sonorités.',
    'Interpréter l’effet d’une figure dans son contexte.',
    'Reconnaître les registres littéraires et justifier son choix par des indices.',
    'Relever et exploiter un champ lexical et un champ sémantique.',
  ],
  keywords: [
    'comparaison',
    'métaphore',
    'personnification',
    'métonymie',
    'hyperbole',
    'litote',
    'antithèse',
    'oxymore',
    'anaphore',
    'allitération',
    'registre',
    'champ lexical',
  ],
  fiche: [
    {
      type: 'callout',
      variant: 'remember',
      title: 'Règle d’or',
      content: [
        {
          type: 'p',
          text: 'Nommer une figure ne suffit jamais : il faut **citer**, **nommer**, puis **interpréter** (quel effet ? quel sens ?). Une figure n’a de valeur qu’en contexte.',
        },
      ],
    },
    { type: 'h2', text: 'Les grandes familles' },
    {
      type: 'table',
      headers: ['Famille', 'Figures principales', 'Effet général'],
      rows: [
        ['**Analogie**', 'comparaison, métaphore, personnification, allégorie', 'Rapprocher deux réalités pour faire voir autrement'],
        ['**Substitution**', 'métonymie, synecdoque, périphrase, euphémisme, antonomase', 'Dire autrement, remplacer un terme par un autre'],
        ['**Amplification / atténuation**', 'hyperbole, gradation, accumulation / litote, euphémisme', 'Renforcer ou atténuer'],
        ['**Opposition**', 'antithèse, oxymore, paradoxe, chiasme', 'Contraste, tension'],
        ['**Construction**', 'anaphore, parallélisme, chiasme, asyndète, polysyndète, ellipse, inversion', 'Rythme, insistance'],
        ['**Sonorités**', 'allitération, assonance, harmonie imitative', 'Musicalité, suggestion'],
        ['**Ironie / sens**', 'ironie, antiphrase, périphrase', 'Distance critique'],
      ],
    },
    { type: 'h2', text: 'Les registres' },
    {
      type: 'table',
      headers: ['Registre', 'Effet recherché', 'Indices'],
      rows: [
        ['Lyrique', 'Exprimer des sentiments personnels', 'Je, exclamations, rythmes, images'],
        ['Pathétique', 'Émouvoir, susciter la pitié', 'Souffrance, adjectifs affectifs'],
        ['Tragique', 'Fatalité, mort inéluctable', 'Destin, impuissance'],
        ['Comique', 'Faire rire', 'Quiproquos, exagération, jeux de mots'],
        ['Ironique', 'Dire le contraire pour critiquer', 'Antiphrase, exagération feinte'],
        ['Satirique', 'Se moquer, dénoncer', 'Caricature, ridicule'],
        ['Épique', 'Exalter l’héroïsme', 'Hyperboles, gradations'],
        ['Fantastique', 'Hésitation entre naturel et surnaturel', 'Doute, ambiguïtés'],
        ['Polémique', 'Attaquer, combattre', 'Termes dévalorisants, apostrophes'],
        ['Élégiaque', 'Plaintes mélancoliques', 'Deuil, regrets, douceur'],
        ['Didactique', 'Instruire', 'Explication, présent de vérité générale'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Champ lexical',
      content: [
        {
          type: 'p',
          text: 'Un **champ lexical** est l’ensemble des mots d’un texte qui se rapportent à **une même notion** (la mort, la nature, la guerre). Il révèle le thème ou l’atmosphère du texte. À ne pas confondre avec le **champ sémantique**, qui regroupe les **sens** possibles d’un mot.',
        },
      ],
    },
  ],
  cours: [
    { type: 'h2', text: '1. Pourquoi étudier les figures de style ?' },
    {
      type: 'p',
      text: 'Les figures de style sont des **procédés d’écriture** qui s’écartent de l’expression ordinaire pour produire un effet : frapper l’esprit, émouvoir, convaincre, faire sourire, suggérer. Elles sont un outil, jamais une fin : l’analyse littéraire consiste à **expliquer ce qu’elles font** dans le texte.',
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Méthode en trois temps',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Repérer et citer', text: 'Relever la citation exacte (mot, groupe, vers).' },
            { title: 'Nommer', text: 'Donner le nom précis de la figure, sans confusion.' },
            { title: 'Interpréter', text: 'Dire l’effet produit et ce que cela révèle (émotion, idée, vision du monde).' },
          ],
        },
      ],
    },
    { type: 'h2', text: '2. Les figures d’analogie' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Analogie',
      content: [
        { type: 'p', text: 'Rapprochement entre deux réalités qui présentent un point commun. L’image comporte un **comparé** (ce dont on parle), un **comparant** (ce à quoi on le compare) et parfois un **outil de comparaison** et un **point commun**.' },
      ],
    },
    {
      type: 'table',
      headers: ['Figure', 'Définition', 'Exemple', 'Effet'],
      rows: [
        ['**Comparaison**', 'Rapprochement avec un outil de comparaison (comme, tel, semblable à, ressembler, pareil à, plus… que)', '« Il est fort comme un lion. »', 'Clarté, force de l’image'],
        ['**Métaphore**', 'Comparaison sans outil : le comparant remplace le comparé', '« La Nature est un temple » (Baudelaire)', 'Image saisissante, plus condensée'],
        ['**Métaphore filée**', 'Métaphore développée sur plusieurs mots ou vers', 'La nature-temple : « piliers », « paroles »', 'Cohérence d’un univers imagé'],
        ['**Personnification**', 'Attribuer des traits humains à un objet, un animal, une abstraction', '« Le soleil se lève, paresseux »', 'Animer, rendre vivant'],
        ['**Allégorie**', 'Représentation concrète d’une idée abstraite (souvent personnifiée)', 'La Mort en faucheuse', 'Rendre visible une idée'],
        ['**Comparaison / métaphore animalière**', 'Assimiler un humain à un animal', '« Une bête féroce »', 'Dévaloriser ou faire sentir une violence'],
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples littéraires',
      content: [
        {
          type: 'list',
          items: [
            '« Ma jeunesse ne fut qu’un ténébreux orage » (Baudelaire) : **métaphore** (jeunesse = orage), annonce un passé tourmenté.',
            '« Les sanglots longs / Des violons / De l’automne » (Verlaine) : **personnification** + **métonymie** de l’automne mélancolique.',
            '« Il pleure dans mon cœur / Comme il pleut sur la ville » (Verlaine) : **comparaison** qui lie émotion et paysage.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ne pas confondre',
      content: [
        {
          type: 'p',
          text: '**Comparaison** : il y a un outil de comparaison (« comme »). **Métaphore** : pas d’outil. Attention : « comme » ne marque pas toujours une comparaison figurée (« comme il pleut » exprime ici la similitude, mais « comme tu veux » = manière).',
        },
      ],
    },
    { type: 'h2', text: '3. Les figures de substitution' },
    {
      type: 'table',
      headers: ['Figure', 'Définition', 'Exemple'],
      rows: [
        ['**Métonymie**', 'Désigner une chose par un terme voisin (contenant/contenu, cause/effet, auteur/œuvre, lieu/habitants)', '« Boire un verre » ; « lire du Hugo »'],
        ['**Synecdoque**', 'Désigner le tout par la partie (ou l’inverse)', '« Une voile à l’horizon » (= un bateau)'],
        ['**Périphrase**', 'Expression longue qui remplace un terme simple', '« La Ville Lumière » (= Paris)'],
        ['**Euphémisme**', 'Adoucir une réalité pénible ou choquante', '« Il nous a quittés » (= il est mort)'],
        ['**Antonomase**', 'Nom propre employé comme nom commun (ou l’inverse)', '« un don Juan », « le Corse »'],
        ['**Antiphrase**', 'Dire le contraire de ce qu’on pense (ironie)', '« Joli travail ! » (devant un désastre)'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Métonymie / synecdoque',
      content: [
        { type: 'p', text: 'La **métonymie** repose sur un lien de **proximité** (contenant/contenu…). La **synecdoque** sur un lien de **partie à tout**. Dans « Les voiles au loin descendant vers Harfleur » (Hugo), « voiles » désigne les navires : c’est une synecdoque.' },
      ],
    },
    { type: 'h2', text: '4. Amplification et atténuation' },
    {
      type: 'table',
      headers: ['Figure', 'Définition', 'Exemple', 'Effet'],
      rows: [
        ['**Hyperbole**', 'Exagération', '« Je meurs de faim »', 'Insister, frapper'],
        ['**Gradation**', 'Énumération en ordre croissant (ou décroissant) d’intensité', '« C’est un roc ! c’est un pic ! c’est un cap ! Que dis-je, c’est un cap ? … c’est une péninsule ! » (Rostand)', 'Intensification progressive'],
        ['**Accumulation (énumération)**', 'Suite de termes qui se succèdent', '« Ni or, ni argent, ni honneurs »', 'Foisonnement, rythme'],
        ['**Litote**', 'Dire peu pour suggérer beaucoup', '« Va, je ne te hais point » (Corneille : Chimène à Rodrigue)', 'Suggérer avec pudeur'],
        ['**Euphémisme**', 'Adoucir', '« Il est parti pour un monde meilleur »', 'Atténuer'],
        ['**Pléonasme / répétition**', 'Redite voulue', '« De mes propres yeux vu »', 'Insistance'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Hyperbole ≠ gradation',
      content: [
        { type: 'p', text: 'L’**hyperbole** exagère un seul terme. La **gradation** suppose une série ordonnée en intensité. Il peut y avoir une gradation d’hyperboles.' },
      ],
    },
    { type: 'h2', text: '5. Figures d’opposition' },
    {
      type: 'table',
      headers: ['Figure', 'Définition', 'Exemple'],
      rows: [
        ['**Antithèse**', 'Rapprochement de deux termes ou idées opposés', '« Je suis la plaie et le couteau » (Baudelaire) ; « le jour… comme la nuit »'],
        ['**Oxymore**', 'Alliance de deux mots contradictoires dans un même groupe', '« Cette obscure clarté » (Corneille) ; « un silence assourdissant »'],
        ['**Paradoxe**', 'Idée qui heurte l’opinion commune mais qui peut être vraie', '« Pour vivre heureux, vivons cachés »'],
        ['**Chiasme**', 'Disposition croisée de termes (ABBA)', '« Il faut manger pour vivre et non vivre pour manger » (Molière)'],
        ['**Parallélisme**', 'Répétition d’une même structure syntaxique (en opposition ou en écho)', '« Il pleure… / Il pleut… »'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Antithèse ≠ oxymore',
      content: [
        { type: 'p', text: 'L’**antithèse** oppose deux éléments **distincts** (« le jour et la nuit »). L’**oxymore** unit deux mots contradictoires **dans le même groupe** (adjectif + nom, par exemple « obscure clarté »).' },
      ],
    },
    { type: 'h2', text: '6. Figures de construction' },
    {
      type: 'table',
      headers: ['Figure', 'Définition', 'Exemple', 'Effet'],
      rows: [
        ['**Anaphore**', 'Répétition d’un mot ou groupe en début de phrase, de vers ou de proposition', '« J’irai par la forêt, j’irai par la montagne » (Hugo)', 'Insistance, rythme, obsession'],
        ['**Épiphore**', 'Répétition à la fin', '« …Et cela, je ne le pardonne pas. »', 'Insistance finale'],
        ['**Asyndète**', 'Absence de mots de liaison', '« Je suis venu, j’ai vu, j’ai vaincu »', 'Rapidité, énergie'],
        ['**Polysyndète**', 'Répétition de conjonctions de coordination', '« Et la vie, et la mort, et l’amour… »', 'Lenteur, accumulation'],
        ['**Parallélisme**', 'Même construction répétée', '« Sans rien voir… sans entendre… »', 'Symétrie, rythme'],
        ['**Ellipse**', 'Omission d’éléments attendus', '« Seul, inconnu, le dos courbé »', 'Concision, vivacité'],
        ['**Inversion**', 'Ordre inhabituel des mots', '« De ces beaux yeux belle Marquise… »', 'Mise en relief'],
        ['**Question rhétorique (oratoire)**', 'Question dont la réponse est évidente', '« Qui n’a pas rêvé de liberté ? »', 'Convaincre, impliquer'],
        ['**Apostrophe**', 'Interpellation directe', '« Ô temps, suspends ton vol ! » (Lamartine)', 'Adresse vive, lyrisme'],
      ],
    },
    { type: 'h2', text: '7. Figures de sonorités' },
    {
      type: 'table',
      headers: ['Figure', 'Définition', 'Exemple'],
      rows: [
        ['**Allitération**', 'Répétition d’une même **consonne**', '« Pour qui sont ces serpents qui sifflent sur vos têtes ? » (Racine) — [s]'],
        ['**Assonance**', 'Répétition d’une même **voyelle**', '« Il pleure dans mon cœur » — [œ] / « Tout m’afflige et me nuit » (voyelle [i])'],
        ['**Harmonie imitative**', 'Sonorités qui imitent un bruit ou un mouvement', '« Le clapotis… » (imitation du bruit de l’eau)'],
        ['**Rime**', 'Répétition de sons à la fin des vers (riche, suffisante, pauvre ; plate, croisée, embrassée)', 'Hugo : tombe / tombe'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Interpréter une sonorité',
      content: [
        {
          type: 'list',
          items: [
            'Les consonnes **sifflantes** [s] [z] [ʃ] : chuchotement, sifflement, menace.',
            'Les **occlusives** [p] [t] [k] [b] [d] [g] : coups, dureté, violence.',
            'Les **liquides** [l] [r] : fluidité, douceur (ou rugosité pour [r]).',
            'Les **nasales** [ã] [ɔ̃] [ɛ̃] : gravité, plainte.',
            'Attention : une sonorité n’a de valeur que si le **contexte** la justifie.',
          ],
        },
      ],
    },
    { type: 'h2', text: '8. Ironie et humour' },
    {
      type: 'p',
      text: 'L’**ironie** consiste à dire le contraire de ce qu’on pense (**antiphrase**) pour **critiquer**, en comptant sur la complicité du lecteur. Elle suppose un **décalage** entre ce qui est dit et ce qui est pensé.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple (Voltaire, Candide, chap. 3)',
      content: [
        { type: 'p', text: '« Rien n’était si beau, si leste, si brillant, si bien ordonné que les deux armées… » : l’éloge apparent annonce la « boucherie héroïque », oxymore qui dévoile la critique de la guerre.' },
      ],
    },
    { type: 'h2', text: '9. Les registres littéraires' },
    {
      type: 'p',
      text: 'Le **registre** (ou tonalité) désigne **l’effet dominant** que produit un texte sur le lecteur. Il se repère par un faisceau d’indices : vocabulaire, figures, rythme, ponctuation, thèmes. Un texte peut mêler plusieurs registres.',
    },
    {
      type: 'table',
      headers: ['Registre', 'Effet', 'Indices', 'Exemple'],
      rows: [
        ['**Lyrique**', 'Exprimer des sentiments personnels', 'Première personne, exclamations, images, rythme musical', 'Hugo, « Demain, dès l’aube »'],
        ['**Élégiaque**', 'Plainte mélancolique', 'Deuil, regret, douceur', 'Lamartine, « Le Lac »'],
        ['**Pathétique**', 'Émouvoir, faire pitié', 'Scène de souffrance, adjectifs affectifs, ponctuation expressive', 'Mort d’un personnage'],
        ['**Tragique**', 'Fatalité, impuissance', 'Destin, malédiction, mort', 'Racine, *Phèdre*'],
        ['**Épique**', 'Exalter un héros', 'Hyperboles, gradations, images', 'Hugo, « Waterloo »'],
        ['**Comique**', 'Faire rire', 'Quiproquos, jeux de mots, exagération, farce', 'Molière'],
        ['**Satirique**', 'Se moquer pour critiquer', 'Caricature, ridicule', 'La Bruyère, *Les Caractères*'],
        ['**Ironique**', 'Dire le contraire, critiquer', 'Antiphrase, exagération feinte', 'Voltaire, *Candide*'],
        ['**Polémique**', 'Attaquer, combattre', 'Termes dévalorisants, apostrophes, exclamations', 'Hugo, *Les Châtiments*'],
        ['**Fantastique**', 'Hésitation entre explications naturelle et surnaturelle', 'Étrange, doute, ambiguïté du narrateur', 'Maupassant, « Le Horla »'],
        ['**Réaliste**', 'Représenter le réel avec précision', 'Détails concrets, descriptions', 'Balzac, Flaubert'],
        ['**Didactique**', 'Instruire', 'Explication, présent de vérité générale, exemples', 'La Fontaine, morale des fables'],
        ['**Oratoire**', 'Persuader un auditoire', 'Apostrophes, questions rhétoriques', 'Discours'],
      ],
    },
    { type: 'h2', text: '10. Champ lexical et champ sémantique' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Champ lexical',
      content: [
        { type: 'p', text: 'Ensemble des mots d’un texte qui se rapportent à **une même notion ou un même thème**, quelle que soit leur nature grammaticale. Exemple : dans « Demain, dès l’aube », champ lexical du **voyage** (partirai, irai, marcherai, arriverai, forêt, montagne) et celui du **deuil** (triste, nuit, tombe).' },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Champ sémantique',
      content: [
        { type: 'p', text: 'Ensemble des **sens** (**significations**) d’un mot dans la langue (polysémie). Exemple : « tombe » (nom : sépulture ; verbe : choir).' },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Exploiter un champ lexical',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Relever', text: 'Les mots (au moins 4 ou 5) avec leur nature (noms, verbes, adjectifs).' },
            { title: 'Nommer le thème', text: 'Un seul mot-titre : « deuil », « guerre », « nature ».' },
            { title: 'Montrer l’évolution', text: 'Le champ est-il présent partout ? Progresse-t-il ? Contraste-t-il avec un autre ?' },
            { title: 'Interpréter', text: 'Que révèle ce champ de l’atmosphère, du sentiment, de la thèse ?' },
          ],
        },
      ],
    },
    { type: 'h2', text: '11. Dénotation et connotation' },
    {
      type: 'table',
      headers: ['Notion', 'Définition', 'Exemple'],
      rows: [
        ['**Dénotation**', 'Sens objectif, de dictionnaire', '« Nuit » : période sans soleil'],
        ['**Connotation**', 'Sens associé, subjectif ou culturel', '« Nuit » : mort, tristesse, mystère'],
      ],
    },
    { type: 'h2', text: '12. Pièges et bons réflexes' },
    {
      type: 'callout',
      variant: 'warning',
      title: 'À retenir',
      content: [
        {
          type: 'list',
          items: [
            'Ne jamais citer une figure sans l’**interpréter**.',
            'Ne pas multiplier les relevés : préférer **peu de figures bien analysées**.',
            'Vérifier la définition avant de nommer (comparaison / métaphore, antithèse / oxymore, hyperbole / gradation).',
            'Une même phrase peut contenir plusieurs figures : choisir celle qui compte pour votre axe.',
            'Associer **registre + indices + effet** : « Le registre pathétique, par… , suscite… ».',
          ],
        },
      ],
    },
  ],
  exercices: [
    {
      id: 'fig-ex1',
      title: 'Nommer les figures',
      difficulty: 1,
      duration: 10,
      tags: ['analogie', 'opposition'],
      statement: [
        { type: 'p', text: 'Nommez la figure de style de chaque phrase.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Cet enfant est un vrai singe.',
            'Elle est belle comme le jour.',
            'Le vent hurle dans la nuit.',
            'Un silence assourdissant.',
            'Paris m’a donné rendez-vous.',
            'Je meurs de faim.',
            'Va, je ne te hais point.',
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**Métaphore** (animalière) : pas d’outil de comparaison.',
            '**Comparaison** (outil « comme »).',
            '**Personnification** : le vent « hurle » comme un être vivant.',
            '**Oxymore** : « silence » et « assourdissant » contradictoires.',
            '**Métonymie** : « Paris » désigne les habitants ou la ville comme personne.',
            '**Hyperbole** : exagération.',
            '**Litote** : « je ne te hais point » = « je t’aime ».',
          ],
        },
      ],
    },
    {
      id: 'fig-ex2',
      title: 'Distinguer les figures voisines',
      difficulty: 1,
      duration: 10,
      tags: ['distinctions'],
      statement: [
        { type: 'p', text: 'Pour chaque phrase, dites s’il s’agit d’une antithèse ou d’un oxymore.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Cette obscure clarté qui tombe des étoiles.',
            'Le jour pour moi sera comme la nuit.',
            'Un hurlement silencieux.',
            'Il est tantôt riche, tantôt pauvre.',
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**Oxymore** : adjectif « obscure » et nom « clarté » dans un même groupe.',
            '**Antithèse** (et comparaison) : deux termes opposés (« jour » / « nuit ») dans deux groupes distincts.',
            '**Oxymore** : « hurlement » et « silencieux » dans le même groupe.',
            '**Antithèse** : « riche » / « pauvre ».',
          ],
        },
      ],
    },
    {
      id: 'fig-ex3',
      title: 'Analyser des figures dans un poème',
      difficulty: 2,
      duration: 20,
      tags: ['analyse'],
      statement: [
        {
          type: 'quote',
          text: 'Je marcherai les yeux fixés sur mes pensées,\nSans rien voir au dehors, sans entendre aucun bruit,\nSeul, inconnu, le dos courbé, les mains croisées,\nTriste, et le jour pour moi sera comme la nuit.',
          author: 'Victor Hugo',
          source: 'Les Contemplations, « Demain, dès l’aube »',
        },
        { type: 'p', text: 'Relevez et interprétez : (1) un parallélisme ; (2) une figure d’opposition ; (3) une ellipse ; (4) une comparaison.' },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**Parallélisme** : « sans rien voir… sans entendre… » : même construction, symétrie qui enferme le poète dans un monde sourd et aveugle.',
            '**Antithèse** : « jour / nuit » ; elle est effacée par la comparaison (« comme »), car le chagrin confond les contraires.',
            '**Ellipse** : « Seul, inconnu, le dos courbé, les mains croisées » : absence de verbe conjugué, juxtaposition de touches qui fait un portrait immobile.',
            '**Comparaison** : « le jour… comme la nuit », qui exprime l’obscurité intérieure.',
          ],
        },
      ],
    },
    {
      id: 'fig-ex4',
      title: 'Identifier le registre',
      difficulty: 2,
      duration: 15,
      tags: ['registres'],
      statement: [
        { type: 'p', text: 'Identifiez le registre dominant de chaque extrait et justifiez par des indices.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '« Rodrigue, as-tu du cœur ? — Tout autre que mon père / L’éprouverait sur l’heure. » (Corneille, *Le Cid*)',
            '« Ô temps ! suspends ton vol, et vous, heures propices ! / Suspendez votre cours ! » (Lamartine, *Le Lac*)',
            '« Tu es un voleur, un menteur, un lâche, un traître ! » (adresse à un personnage)',
            '« Cette bête n’avait pas l’air méchante ; elle avait, comme tout le monde, ses petits défauts… » (récit humoristique)',
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**Héroïque / tragique** : dilemme, honneur, mort possible, ton noble et mesuré.',
            '**Lyrique / élégiaque** : apostrophe au Temps, exclamations, regret du bonheur perdu.',
            '**Polémique** : accusations, accumulation de termes dévalorisants, ponctuation exclamative.',
            '**Comique / ironique** : litote et ton décalé, minimisation humoristique.',
          ],
        },
      ],
    },
    {
      id: 'fig-ex5',
      title: 'Sonorités',
      difficulty: 2,
      duration: 15,
      tags: ['sonorités'],
      statement: [
        { type: 'p', text: 'Identifiez la figure de sonorité et interprétez.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '« Pour qui sont ces serpents qui sifflent sur vos têtes ? » (Racine, *Andromaque*)',
            '« Il pleure dans mon cœur / Comme il pleut sur la ville » (Verlaine)',
            '« Les sanglots longs / Des violons / De l’automne / Blessent mon cœur / D’une langueur / Monotone. » (Verlaine)',
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**Allitération en [s]** : le son sifflant reproduit le sifflement des serpents (harmonie imitative), ce qui crée une atmosphère de menace.',
            '**Assonance en [œ]** (« pleure », « cœur ») et allitération en [l] (« pleut », « ville ») : une musique plaintive et fluide, qui imite la pluie.',
            '**Assonances en [ɔ̃] et [œ]** (« sanglots longs », « violons », « automne », « cœur », « langueur ») : sons nasals graves et sourds, qui prolongent la plainte, comme le son des violons.',
          ],
        },
      ],
    },
    {
      id: 'fig-ex6',
      title: 'Champ lexical et commentaire',
      difficulty: 2,
      duration: 20,
      tags: ['champ lexical'],
      statement: [
        {
          type: 'quote',
          text: 'Les canons tonnaient. La terre tremblait. Des hommes couraient, tombaient, hurlaient dans la fumée ; le sang coulait sur la boue.',
          source: 'Texte fictif écrit pour l’exercice',
        },
        { type: 'p', text: 'Relevez le champ lexical dominant, nommez le registre et rédigez deux phrases d’analyse.' },
      ],
      solution: [
        {
          type: 'p',
          text: '**Champ lexical de la guerre** : « canons », « tonnaient », « hommes… tombaient… hurlaient », « sang », « fumée », « boue ». **Registre** : pathétique (souffrance) avec une dimension épique (grandeur des éléments : « La terre tremblait »). Analyse : « Le champ lexical de la guerre, associé à des verbes d’action au passé qui s’enchaînent, donne une impression de chaos et de violence. L’asyndète et la brièveté des phrases traduisent la rapidité des événements et suscitent l’effroi du lecteur. »',
        },
      ],
    },
    {
      id: 'fig-ex7',
      title: 'Type bac : analyser un passage',
      difficulty: 3,
      duration: 40,
      tags: ['type bac'],
      statement: [
        { type: 'p', text: 'Lisez ce passage et rédigez un paragraphe d’analyse (à partir des figures) qui répond à la question : comment l’auteur donne-t-il une dimension à la fois comique et critique à cette scène ?' },
        {
          type: 'quote',
          text: 'Rien n’était si beau, si leste, si brillant, si bien ordonné que les deux armées. Les trompettes, les fifres, les hautbois, les tambours, les canons, formaient une harmonie telle qu’il n’y en eut jamais en enfer. Les canons renversèrent d’abord à peu près six mille hommes de chaque côté ; ensuite la mousqueterie ôta du meilleur des mondes environ neuf à dix mille coquins qui en infectaient la surface.',
          author: 'Voltaire',
          source: 'Candide, chapitre 3 (1759)',
        },
      ],
      hints: ['Cherchez les gradations et l’antiphrase.', 'Que fait « du meilleur des mondes » dans la phrase ? Rappel du contexte de l’optimisme.', 'Qui sont les « coquins » ?'],
      solution: [
        {
          type: 'p',
          text: 'Voltaire dénonce la guerre en usant de l’**ironie** : l’éloge hyperbolique du début (« Rien n’était si beau, si leste, si brillant, si bien ordonné ») est une **antiphrase**, que l’on comprend à la lumière de la suite. La **gradation** des instruments (« les trompettes, les fifres, les hautbois, les tambours, les canons ») passe de la musique militaire à l’arme de mort, et la comparaison avec l’« harmonie telle qu’il n’y en eut jamais en enfer » associe sournoisement la bataille à l’enfer. Le **chiffre** précis (« six mille », « neuf à dix mille ») et l’adjectif « coquins », qui qualifie ironiquement les victimes, adoptent le ton froid d’un rapport de comptable et **déshumanisent** les morts. L’expression « du meilleur des mondes », reprise parodique de la philosophie de Pangloss, retourne la formule optimiste contre elle-même. Le comique naît donc du décalage, la critique de la guerre de l’indignation que ce décalage fait naître chez le lecteur.',
        },
      ],
    },
  ],
  representations: [
    {
      type: 'flashcards',
      cards: [
        { front: 'Comparaison', back: 'Rapprochement de deux éléments avec un outil de comparaison (comme, tel, semblable à…).' },
        { front: 'Métaphore', back: 'Comparaison sans outil : le comparant remplace le comparé (« Cet homme est un lion »).' },
        { front: 'Personnification', back: 'Attribuer des traits humains à un objet, un animal ou une idée.' },
        { front: 'Allégorie', back: 'Représentation concrète d’une idée abstraite, souvent personnifiée.' },
        { front: 'Métonymie', back: 'Désigner une chose par un terme voisin (contenant/contenu, auteur/œuvre) : « boire un verre ».' },
        { front: 'Synecdoque', back: 'Désigner le tout par la partie (ou l’inverse) : « une voile à l’horizon » = un navire.' },
        { front: 'Périphrase', back: 'Expression longue qui remplace un terme simple (« la Ville Lumière »).' },
        { front: 'Euphémisme', back: 'Adoucir une réalité pénible : « il nous a quittés ».' },
        { front: 'Hyperbole', back: 'Exagération : « mourir de faim ».' },
        { front: 'Gradation', back: 'Série de termes d’intensité croissante ou décroissante.' },
        { front: 'Litote', back: 'Dire moins pour faire entendre plus : « Va, je ne te hais point ».' },
        { front: 'Antithèse', back: 'Opposition de deux termes ou idées dans des groupes distincts.' },
        { front: 'Oxymore', back: 'Alliance de deux termes contradictoires dans un même groupe : « obscure clarté ».' },
        { front: 'Paradoxe', back: 'Affirmation qui heurte l’opinion commune mais recèle une vérité.' },
        { front: 'Chiasme', back: 'Structure croisée ABBA : « manger pour vivre, non vivre pour manger ».' },
        { front: 'Anaphore', back: 'Répétition d’un mot en début de phrase ou de vers.' },
        { front: 'Asyndète', back: 'Absence de mots de liaison : accélère le rythme.' },
        { front: 'Polysyndète', back: 'Répétition des conjonctions de coordination : ralentit, accumule.' },
        { front: 'Allitération / assonance', back: 'Répétition d’une consonne / d’une voyelle.' },
        { front: 'Ironie', back: 'Dire le contraire de ce que l’on pense (antiphrase) pour critiquer.' },
        { front: 'Champ lexical', back: 'Ensemble des mots d’un texte relatifs à une même notion.' },
        { front: 'Dénotation / connotation', back: 'Sens objectif / sens associé (subjectif, culturel).' },
      ],
    },
    {
      type: 'qcm',
      questions: [
        { question: '« Cette obscure clarté » est…', choices: ['une antithèse', 'un oxymore', 'une métaphore', 'une litote'], answer: 1 },
        { question: '« Je ne te hais point » est…', choices: ['une hyperbole', 'une litote', 'une gradation', 'une anaphore'], answer: 1 },
        { question: '« Il est fort comme un lion » est…', choices: ['une métaphore', 'une comparaison', 'une personnification', 'une allégorie'], answer: 1 },
        { question: '« Boire un verre » est…', choices: ['une métonymie', 'une synecdoque', 'une litote', 'une antithèse'], answer: 0 },
        { question: 'La répétition de [s] dans « serpents qui sifflent sur vos têtes » est…', choices: ['une assonance', 'une allitération', 'une anaphore', 'un chiasme'], answer: 1 },
        { question: '« J’irai par la forêt, j’irai par la montagne » contient…', choices: ['un chiasme', 'une anaphore', 'un oxymore', 'une litote'], answer: 1 },
        { question: 'Dire le contraire de ce que l’on pense relève de…', choices: ['l’antiphrase / ironie', 'l’euphémisme', 'l’hyperbole', 'la gradation'], answer: 0 },
        { question: 'Le registre qui cherche à émouvoir par la souffrance est…', choices: ['épique', 'pathétique', 'comique', 'didactique'], answer: 1 },
        { question: 'Le registre qui fait hésiter entre naturel et surnaturel est…', choices: ['fantastique', 'lyrique', 'satirique', 'polémique'], answer: 0 },
        { question: 'Quelle figure exagère un seul terme ?', choices: ['Gradation', 'Hyperbole', 'Litote', 'Chiasme'], answer: 1 },
      ],
    },
    {
      type: 'matching',
      title: 'Associer figure et exemple',
      pairs: [
        { left: 'Métaphore', right: 'La Nature est un temple' },
        { left: 'Comparaison', right: 'Il pleure comme il pleut' },
        { left: 'Oxymore', right: 'Une obscure clarté' },
        { left: 'Litote', right: 'Va, je ne te hais point' },
        { left: 'Hyperbole', right: 'Je meurs de faim' },
        { left: 'Anaphore', right: 'j’irai par la forêt, j’irai par la montagne' },
        { left: 'Chiasme', right: 'Manger pour vivre et non vivre pour manger' },
        { left: 'Euphémisme', right: 'Il nous a quittés' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer registre et effet',
      pairs: [
        { left: 'Lyrique', right: 'Exprimer des sentiments personnels' },
        { left: 'Épique', right: 'Exalter l’héroïsme' },
        { left: 'Pathétique', right: 'Émouvoir par la souffrance' },
        { left: 'Satirique', right: 'Se moquer pour critiquer' },
        { left: 'Polémique', right: 'Attaquer, combattre' },
        { left: 'Fantastique', right: 'Hésitation entre naturel et surnaturel' },
        { left: 'Didactique', right: 'Instruire' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter les définitions',
      text: 'La {{comparaison}} comporte un outil de comparaison, la {{métaphore}} n’en comporte pas. L’{{oxymore}} unit deux termes contradictoires dans un même groupe, l’{{antithèse}} oppose deux termes distincts. La {{litote}} dit peu pour suggérer beaucoup, l’{{hyperbole}} exagère. La répétition d’une consonne est une {{allitération}}, celle d’une voyelle une {{assonance}}. Les mots relatifs à une même notion forment un champ {{lexical}}.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Il suffit de nommer une figure pour l’analyser.', answer: false, explanation: 'Il faut aussi l’interpréter.' },
        { text: '« Un silence assourdissant » est un oxymore.', answer: true },
        { text: 'La métonymie repose sur un lien de ressemblance.', answer: false, explanation: 'Elle repose sur un lien de proximité (la métaphore repose sur la ressemblance).' },
        { text: 'L’asyndète accélère le rythme.', answer: true },
        { text: 'Une allitération est la répétition d’une voyelle.', answer: false, explanation: 'C’est une assonance ; l’allitération répète une consonne.' },
        { text: 'L’ironie dit le contraire de ce qu’on pense.', answer: true },
        { text: 'Un champ lexical regroupe des mots d’un même thème.', answer: true },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Repérer', text: 'Relever la citation précise.' },
        { title: 'Nommer', text: 'Donner le nom exact de la figure.' },
        { title: 'Interpréter', text: 'Expliquer l’effet et le sens.' },
        { title: 'Relier', text: 'Montrer le lien avec l’axe ou le projet de lecture.' },
      ],
    },
    {
      type: 'ordering',
      title: 'Ordre d’intensité croissante',
      items: ['Il fait frais', 'Il fait froid', 'Il fait très froid', 'On gèle', 'On meurt de froid'],
    },
    {
      type: 'widget',
      id: 'syllable-counter',
      props: { verse: 'Comme il pleut sur la ville' },
      title: 'Compter les syllabes',
      caption: 'Attention aux e muets : « pleure » compte pour deux syllabes devant une consonne (Il pleu-re dans mon cœur).',
    },
    {
      type: 'reveal',
      title: 'Aide-mémoire : distinctions à connaître',
      content: [
        {
          type: 'table',
          headers: ['À distinguer', 'Différence'],
          rows: [
            ['Comparaison / métaphore', 'Outil de comparaison / pas d’outil'],
            ['Antithèse / oxymore', 'Deux groupes distincts / un seul groupe'],
            ['Hyperbole / gradation', 'Un terme exagéré / série ordonnée'],
            ['Métonymie / synecdoque', 'Lien de proximité / lien de partie à tout'],
            ['Allitération / assonance', 'Consonne / voyelle'],
            ['Litote / euphémisme', 'Dire moins pour suggérer plus / adoucir une réalité pénible'],
          ],
        },
      ],
    },
  ],
}

export default chapter
