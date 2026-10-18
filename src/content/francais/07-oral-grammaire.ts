import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'oral-grammaire',
  subject: 'francais',
  order: 7,
  title: 'L’oral et la grammaire',
  theme: 'Méthodes du bac',
  summary:
    'Réussir l’épreuve orale : explication linéaire, question de grammaire, présentation d’une œuvre et entretien. Révision de la grammaire au programme : subordination, interrogation, négation, accord du participe passé, analyse de la phrase complexe.',
  duration: '4 semaines',
  objectives: [
    'Connaître la structure de l’épreuve orale et gérer sa préparation de 30 minutes.',
    'Mener une explication linéaire : introduction, lecture, mouvements, conclusion.',
    'Répondre à la question de grammaire avec méthode : repérer, nommer, justifier.',
    'Identifier et analyser les subordonnées, les phrases interrogatives et négatives.',
    'Accorder correctement le participe passé dans les cas courants.',
    'Présenter une œuvre de son choix et dialoguer lors de l’entretien.',
  ],
  keywords: [
    'explication linéaire',
    'mouvements',
    'projet de lecture',
    'question de grammaire',
    'proposition subordonnée',
    'interrogation',
    'négation',
    'participe passé',
    'phrase complexe',
    'entretien',
  ],
  fiche: [
    {
      type: 'callout',
      variant: 'remember',
      title: 'L’épreuve orale en bref (à vérifier au BO de la session 2027)',
      content: [
        {
          type: 'list',
          items: [
            '**Préparation : 30 minutes** ; **passage : environ 20 minutes**.',
            '**1re partie (sur 12 points, environ 12 min)** : explication linéaire d’un texte tiré du descriptif de l’élève, **suivie d’une question de grammaire** portant sur ce texte (la grammaire compte pour 2 points sur 12).',
            '**2e partie (sur 8 points, environ 8 min)** : présentation de l’œuvre choisie par le candidat parmi celles du descriptif, puis entretien avec l’examinateur.',
            'Le texte à expliquer est choisi par l’examinateur dans le **descriptif des lectures et activités** remis par l’élève (nombre de textes et répartition selon la note de service en vigueur).',
          ],
        },
      ],
    },
    { type: 'h2', text: 'Explication linéaire : plan type' },
    {
      type: 'steps',
      items: [
        { title: 'Introduction (1 min 30)', text: 'Auteur, œuvre, date, genre, situation du texte, thème, projet de lecture (la problématique), annonce des mouvements.' },
        { title: 'Lecture à voix haute (1 min 30)', text: 'Expressive, posée, en respectant la ponctuation, les liaisons, les « e » et la diérèse en poésie.' },
        { title: 'Explication linéaire (6 min)', text: 'Suivre le texte mouvement par mouvement ; dans chacun : repérage, citation, procédé, effet, lien avec le projet de lecture.' },
        { title: 'Conclusion (30 s)', text: 'Bilan qui répond au projet de lecture, éventuellement ouverture.' },
      ],
    },
    { type: 'h2', text: 'Question de grammaire' },
    {
      type: 'list',
      items: [
        'Elle porte sur une **phrase ou un court passage** du texte.',
        'Méthode : **repérer** l’élément visé, **nommer** sa nature et sa fonction, **justifier** (test de suppression, de remplacement, de déplacement).',
        'Notions au programme : subordination, interrogation, négation, accord du participe passé, analyse de la phrase complexe (les notions peuvent varier selon l’année : consultez le BO).',
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Entretien',
      content: [
        {
          type: 'p',
          text: 'Présentez votre œuvre en 2 minutes (pourquoi ce choix, ce qu’elle vous a apporté, une scène ou un passage marquant), puis dialoguez : soyez précis, appuyez-vous sur des exemples, osez donner un avis argumenté.',
        },
      ],
    },
  ],
  cours: [
    { type: 'h2', text: '1. Structure de l’épreuve orale' },
    {
      type: 'table',
      headers: ['Partie', 'Durée indicative', 'Points', 'Contenu'],
      rows: [
        ['Explication linéaire', '≈ 8 à 10 min', '10', 'Texte tiré du descriptif, lecture + explication'],
        ['Question de grammaire', '≈ 2 min', '2', 'Une question sur le texte expliqué'],
        ['Présentation de l’œuvre + entretien', '≈ 8 min', '8', 'Œuvre choisie par le candidat, échange avec l’examinateur'],
      ],
      caption: 'Total : 20 points, 30 minutes de préparation avant le passage. Les durées exactes sont à vérifier dans la note de service de la session.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Votre descriptif',
      content: [
        {
          type: 'p',
          text: 'Le **descriptif** liste les lectures et activités de l’année (textes étudiés en classe, œuvres intégrales, parcours associés). **Connaissez-le par cœur** : chaque texte doit pouvoir être expliqué, chaque œuvre présentée. Relisez chaque texte à voix haute plusieurs fois.',
        },
      ],
    },
    { type: 'h2', text: '2. L’explication linéaire' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Explication linéaire',
      content: [
        {
          type: 'p',
          text: 'C’est un exercice oral d’interprétation qui suit **le mouvement du texte** (de la première à la dernière ligne) en dégageant à chaque étape **le sens et les effets** produits par les choix d’écriture, en lien avec un **projet de lecture**. Elle ne se confond ni avec la paraphrase, ni avec un catalogue de procédés.',
        },
      ],
    },
    { type: 'h3', text: 'L’introduction' },
    {
      type: 'steps',
      items: [
        { title: 'Présenter l’auteur et l’œuvre', text: 'Nom, période, genre, œuvre, date. Une phrase suffit.' },
        { title: 'Situer le passage', text: 'Dans l’œuvre ou dans le parcours : ce qui précède, ce qui suit, la situation.' },
        { title: 'Dégager le thème', text: 'De quoi parle le texte ? (en une phrase)' },
        { title: 'Énoncer le projet de lecture', text: 'Une question : « En quoi ce texte… ? » « Comment l’auteur… ? »' },
        { title: 'Annoncer les mouvements', text: 'Délimiter les 3 ou 4 grandes étapes du texte (par lignes ou vers).' },
      ],
    },
    { type: 'h3', text: 'La lecture à voix haute' },
    {
      type: 'list',
      items: [
        'Lentement, en **articulant**, avec des **pauses** aux virgules et aux points.',
        'En poésie : prononcer les **e muets** quand la métrique l’exige, respecter les **diérèses** et la **césure**.',
        'En théâtre : donner le ton (interrogation, exclamation), sans surjouer.',
        'La lecture est **évaluée** : elle témoigne de votre compréhension.',
      ],
    },
    { type: 'h3', text: 'Le déroulé de l’explication' },
    {
      type: 'p',
      text: 'Pour **chaque mouvement**, appliquez la séquence : **annoncer** (« Le premier mouvement, du vers 1 au vers 4, présente… ») → **citer** → **analyser** le procédé → **interpréter** l’effet → **relier** au projet de lecture.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Un mini-extrait d’explication (Hugo, « Demain, dès l’aube », 1er mouvement)',
      content: [
        {
          type: 'p',
          text: '« Le premier quatrain, des vers 1 à 4, annonce le départ du poète. La première ligne s’ouvre sur un adverbe de temps, “Demain”, suivi de la précision “dès l’aube” : le projet est immédiat et précis. Le verbe “partirai” est au futur de l’indicatif, qui exprime une résolution ferme. Au vers 3, l’anaphore “j’irai… j’irai…” donne au vers un rythme de marche. Ce premier mouvement installe donc l’image d’un voyage résolu, sans révéler sa destination, ce qui crée une attente chez le lecteur. »',
        },
      ],
    },
    { type: 'h3', text: 'La conclusion' },
    {
      type: 'p',
      text: 'Bilan en deux ou trois phrases qui **répondent au projet de lecture**. Une ouverture est possible (un autre texte du descriptif) mais jamais indispensable.',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Erreurs fréquentes',
      content: [
        {
          type: 'list',
          items: [
            'Réciter un cours mémorisé sans regarder le texte.',
            'Paraphraser, ou énumérer des procédés sans les interpréter.',
            'Passer trop de temps sur le début et expédier la fin du texte : veillez à **tout** traiter.',
            'Lire d’une voix monotone.',
          ],
        },
      ],
    },
    { type: 'h2', text: '3. Présentation de l’œuvre et entretien' },
    {
      type: 'p',
      text: 'La seconde partie permet de montrer votre **culture littéraire** et votre **capacité à dialoguer**. Vous choisissez une œuvre parmi celles de votre descriptif (une œuvre intégrale lue, pas seulement des extraits).',
    },
    {
      type: 'steps',
      items: [
        { title: 'Présenter votre œuvre (≈ 2 min)', text: 'Titre, auteur, genre, époque. Pourquoi l’avoir choisie ? Quel intérêt littéraire ? Un passage marquant (acte/scène, chapitre, poème).' },
        { title: 'Argumenter', text: 'Défendre un point de vue personnel : ce que l’œuvre vous a appris, fait ressentir, questionné.' },
        { title: 'Dialoguer', text: 'Répondre précisément aux questions. Si vous ne savez pas, reformulez, cherchez un lien, ne vous bloquez pas.' },
        { title: 'Mettre en relation', text: 'Rapprocher l’œuvre d’autres lectures, d’un thème, d’un genre, d’un film, d’un spectacle vu.' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Préparer l’œuvre',
      content: [
        {
          type: 'list',
          items: [
            'Résumé en 5 lignes, thèmes majeurs, personnages clés.',
            '3 passages précis à citer ou raconter.',
            'Contexte (auteur, époque, mouvement).',
            'Votre **avis argumenté** (ce que vous avez aimé ou moins aimé, et pourquoi).',
            'Des liens avec d’autres œuvres du descriptif.',
          ],
        },
      ],
    },
    { type: 'h2', text: '4. La question de grammaire : méthode' },
    {
      type: 'steps',
      items: [
        { title: 'Lire la question', text: 'Quelle notion ? Quel passage ? (ex. : « Analysez la proposition subordonnée du vers 3. »)' },
        { title: 'Repérer l’élément', text: 'Souligner mentalement le mot ou groupe concerné.' },
        { title: 'Nommer', text: 'Nature (relative, conjonctive…) et fonction (complément de, apposée…).' },
        { title: 'Justifier par un test', text: 'Suppression, déplacement, remplacement, substitution par un pronom ou un groupe nominal.' },
        { title: 'Répondre clairement et brièvement', text: 'Une réponse structurée en 2 phrases : nature, fonction, justification.' },
      ],
    },
    { type: 'h2', text: '5. La phrase complexe et la subordination' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Phrase simple, phrase complexe',
      content: [
        {
          type: 'list',
          items: [
            '**Phrase simple** : une seule proposition (un verbe conjugué). « Il pleut. »',
            '**Phrase complexe** : plusieurs propositions (plusieurs verbes conjugués). « Je sais que tu m’attends. »',
          ],
        },
      ],
    },
    {
      type: 'table',
      headers: ['Mode de liaison', 'Définition', 'Exemple'],
      rows: [
        ['**Juxtaposition**', 'Propositions séparées par une ponctuation', 'Je pars, tu restes.'],
        ['**Coordination**', 'Propositions reliées par une conjonction de coordination (mais, ou, et, donc, or, ni, car)', 'Je pars et tu restes.'],
        ['**Subordination**', 'Une proposition dépend d’une autre (principale) grâce à un mot subordonnant', 'Je pars parce que tu restes.'],
      ],
    },
    { type: 'h3', text: 'Les trois types de subordonnées' },
    {
      type: 'table',
      headers: ['Type', 'Mot subordonnant', 'Fonction principale', 'Exemple'],
      rows: [
        ['**Relative**', 'Pronom relatif : qui, que, quoi, dont, où, lequel…', 'Complément de l’antécédent (épithète)', 'L’homme **qui passe** est mon voisin.'],
        ['**Conjonctive complétive**', 'que (conjonction)', 'COD, sujet, attribut… du verbe principal', 'Je sais **que tu m’attends**.'],
        ['**Interrogative indirecte**', 'si, qui, quel, où, comment…', 'COD du verbe de la principale', 'Je me demande **si tu viendras**.'],
        ['**Circonstancielle**', 'Conjonction : quand, parce que, si, bien que, pour que…', 'Complément circonstanciel de la principale', 'Je pars **quand tu veux**.'],
      ],
    },
    { type: 'h3', text: 'Les subordonnées relatives' },
    {
      type: 'list',
      items: [
        '**Déterminative** (ou restrictive) : précise l’antécédent, ne peut être supprimée : « Les élèves **qui ont révisé** réussiront. »',
        '**Explicative** (ou appositive) : apporte une information supplémentaire, entre virgules, supprimable : « Les élèves, **qui avaient révisé**, ont réussi. »',
        'Pronom relatif : **qui** (sujet), **que** (COD), **dont** (complément introduit par « de »), **où** (lieu, temps), **à qui / auquel** (COI)…',
        'Le verbe de la relative s’accorde avec l’**antécédent** : « C’est moi **qui suis** là. »',
      ],
    },
    { type: 'h3', text: 'Les subordonnées conjonctives circonstancielles' },
    {
      type: 'table',
      headers: ['Valeur', 'Conjonctions', 'Mode', 'Exemple'],
      rows: [
        ['Temps', 'quand, lorsque, dès que, après que, avant que, pendant que, tandis que', 'Indicatif (avant que → subjonctif)', 'Dès qu’il arrivera, nous partirons.'],
        ['Cause', 'parce que, puisque, comme, étant donné que', 'Indicatif', 'Il est absent parce qu’il est malade.'],
        ['Conséquence', 'si bien que, de sorte que, tellement… que', 'Indicatif', 'Il est si fatigué qu’il s’endort.'],
        ['But', 'pour que, afin que', 'Subjonctif', 'Parlez fort pour que tous entendent.'],
        ['Concession / opposition', 'bien que, quoique, alors que', 'Subjonctif (bien que) / indicatif (alors que)', 'Bien qu’il pleuve, nous sortons.'],
        ['Condition / hypothèse', 'si, à condition que, au cas où', 'Indicatif / conditionnel / subjonctif', 'S’il pleut, nous resterons.'],
        ['Comparaison', 'comme, ainsi que, plus que', 'Indicatif', 'Il parle comme il pense.'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ne pas confondre',
      content: [
        {
          type: 'list',
          items: [
            '**que** pronom relatif (remplace un nom : « le livre **que** je lis ») ≠ **que** conjonction (« je pense **que** tu as raison »). Test : on peut remplacer le pronom relatif par « lequel ».',
            '**si** conjonction de condition (« **si** tu viens ») ≠ **si** interrogatif (« je me demande **si** tu viens »).',
            '**quand / comme** : peuvent introduire une subordonnée de temps, de cause ou de comparaison selon le sens.',
          ],
        },
      ],
    },
    { type: 'h3', text: 'Méthode : analyser une phrase complexe' },
    {
      type: 'steps',
      items: [
        { title: 'Repérer les verbes conjugués', text: 'Autant de verbes conjugués, autant de propositions.' },
        { title: 'Isoler les propositions', text: 'Mettre entre crochets chaque proposition.' },
        { title: 'Repérer la principale', text: 'Celle qui ne dépend d’aucune autre.' },
        { title: 'Identifier les mots subordonnants et coordonnants', text: 'Pronoms relatifs, conjonctions de subordination, conjonctions de coordination.' },
        { title: 'Donner nature et fonction', text: 'Ex. : « [Je sais] [que tu m’attends] » : principale + subordonnée conjonctive complétive, COD de « sais ».' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Analyse d’une phrase de Hugo',
      content: [
        {
          type: 'p',
          text: '« Je ne regarderai ni l’or du soir qui tombe, ni les voiles au loin descendant vers Harfleur. » → propositions : [Je ne regarderai ni l’or du soir] (principale) [qui tombe] (subordonnée relative, complément de l’antécédent « soir ») ; « descendant vers Harfleur » n’est pas une proposition conjuguée : c’est un **groupe participial** (participe présent) qui complète « voiles ».',
        },
      ],
    },
    { type: 'h2', text: '6. L’interrogation' },
    {
      type: 'table',
      headers: ['Type', 'Définition', 'Exemple'],
      rows: [
        ['**Interrogation totale**', 'La réponse est oui / non / si', 'Viens-tu ? / Est-ce que tu viens ?'],
        ['**Interrogation partielle**', 'Porte sur un élément, avec un mot interrogatif (qui, que, quand, où, comment, pourquoi, combien…)', 'Où vas-tu ?'],
        ['**Interrogation directe**', 'Posée directement, point d’interrogation', 'Que fais-tu ?'],
        ['**Interrogation indirecte**', 'Subordonnée interrogative, pas de point d’interrogation', 'Je me demande ce que tu fais.'],
        ['**Interrogation oratoire**', 'Question dont la réponse est évidente, effet rhétorique', 'Qui n’a pas rêvé de voyager ?'],
      ],
    },
    {
      type: 'list',
      items: [
        '**Marques de l’interrogation** : intonation montante (à l’oral), **inversion sujet-verbe** (« Viens-tu ? », avec t euphonique « Vient-il ? »), **est-ce que** (« Est-ce que tu viens ? »), **mots interrogatifs**.',
        '**Registres** : soutenu (inversion), courant (est-ce que), familier (intonation seule : « Tu viens ? »).',
        'L’interrogation indirecte se **transforme** : « Je demande : “Où vas-tu ?” » → « Je demande **où tu vas**. »',
      ],
    },
    { type: 'h2', text: '7. La négation' },
    {
      type: 'table',
      headers: ['Type', 'Marques', 'Exemple'],
      rows: [
        ['**Négation totale**', 'ne… pas, ne… point', 'Je ne viens pas.'],
        ['**Négation partielle**', 'ne… jamais, ne… plus, ne… rien, ne… personne, ne… aucun, ne… nul', 'Il ne mange plus rien.'],
        ['**Négation restrictive** (exceptive)', 'ne… que', 'Je ne bois que de l’eau. (= seulement)'],
        ['**Négation lexicale**', 'Préfixes in-, im-, dé-, mal-, a-', 'impossible, déloyal'],
        ['**Double négation**', 'Deux négations qui s’annulent (valeur affirmative atténuée)', 'Il n’est pas sans talent. (= il a du talent)'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Points d’attention',
      content: [
        {
          type: 'list',
          items: [
            '« **ne** » seul peut exprimer la négation à l’écrit soutenu : « Je ne puis. » ; « Il n’ose. »',
            '« **ne** » **explétif** (sans valeur négative) : « Je crains qu’il **ne** vienne. » (= je crains qu’il vienne). Il apparaît après certains verbes de crainte, « avant que », « à moins que ».',
            'Dans « ne… que », la phrase est **affirmative** pour le sens (= seulement).',
            'À l’oral, « ne » est souvent omis (« Je sais pas »).',
          ],
        },
      ],
    },
    { type: 'h2', text: '8. L’accord du participe passé' },
    {
      type: 'table',
      headers: ['Emploi', 'Règle', 'Exemple'],
      rows: [
        ['Sans auxiliaire (épithète, attribut…)', 'S’accorde comme un adjectif avec le nom', 'Des fleurs **fanées**.'],
        ['Avec **être**', 'S’accorde avec le **sujet**', 'Elles sont **parties**.'],
        ['Avec **avoir**', 'S’accorde avec le **COD placé avant le verbe** (sinon, invariable)', 'Les fleurs que j’ai **cueillies**. / J’ai **cueilli** des fleurs.'],
        ['Verbes pronominaux **essentiellement** pronominaux', 'Accord avec le **sujet**', 'Elles se sont **évanouies**.'],
        ['Pronominaux de sens réfléchi ou réciproque', 'Accord avec le **COD** s’il est avant le verbe (le « se » est COD) ; invariable si « se » est COI', 'Elle s’est **lavée**. / Elle s’est **lavé** les mains. / Elles se sont **parlé**.'],
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Méthode pour le participe avec avoir',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Repérer l’auxiliaire', text: 'Si c’est « avoir », chercher le COD.' },
            { title: 'Poser la question « qui ? quoi ? »', text: '« J’ai mangé quoi ? des pommes. »' },
            { title: 'Où est le COD ?', text: 'Placé AVANT le verbe : accord. Placé APRÈS (ou absent) : pas d’accord.' },
            { title: 'Accorder', text: 'En genre et en nombre avec ce COD.' },
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Cas particuliers',
      content: [
        {
          type: 'list',
          items: [
            '**Participe suivi d’un infinitif** : accord avec le COD si ce COD fait l’action de l’infinitif : « Les enfants que j’ai **vus** jouer » (les enfants jouent) ; sinon invariable : « Les fleurs qu’il a **voulu** cueillir ».',
            '**Fait + infinitif** : toujours invariable : « Elle les a **fait** venir ».',
            '**Laissé** + infinitif : accord possible (usage moderne), mais **fait** reste invariable.',
            '**Verbes intransitifs avec être** : « Elles sont **venues**. »',
            '**Coûté, valu, pesé, couru, vécu** : invariables quand le complément exprime un prix, un poids, une durée : « Les dix euros que ce livre m’a **coûté**. » (mais accord au sens figuré : « les efforts que ce travail m’a **coûtés** »).',
            '**Le pronom « en »** : participe invariable : « Des pommes, j’en ai **mangé**. »',
          ],
        },
      ],
    },
    { type: 'h2', text: '9. Quelques éléments de lexique et de syntaxe utiles' },
    {
      type: 'table',
      headers: ['Notion', 'Définition', 'Exemple'],
      rows: [
        ['Proposition indépendante', 'Ne dépend d’aucune autre', 'Il pleut.'],
        ['Proposition principale', 'Régit une subordonnée', 'Je sais que tu m’attends.'],
        ['Proposition participiale', 'Participe avec son propre sujet', 'Le soir tombant, nous rentrâmes.'],
        ['Proposition infinitive', 'Infinitif avec son propre sujet', 'Je vois les enfants jouer.'],
        ['Apposition', 'Terme qui apporte une précision sur un nom', 'Victor Hugo, poète romantique, …'],
      ],
    },
  ],
  exercices: [
    {
      id: 'oral-ex1',
      title: 'Identifier les propositions',
      difficulty: 1,
      duration: 10,
      tags: ['subordination'],
      statement: [
        { type: 'p', text: 'Dans chaque phrase, relevez les verbes conjugués, isolez les propositions et indiquez la principale.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Je sais que tu m’attends.',
            'L’homme qui passe est mon voisin.',
            'Quand j’arriverai, je mettrai un bouquet.',
            'Il pleut mais nous sortons.',
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '[Je sais] (principale) [que tu m’attends] (subordonnée conjonctive complétive, COD de « sais »).',
            '[L’homme est mon voisin] (principale, coupée par la relative) [qui passe] (subordonnée relative, complète « homme »).',
            '[Quand j’arriverai] (subordonnée circonstancielle de temps) [je mettrai un bouquet] (principale).',
            '[Il pleut] [mais nous sortons] : deux propositions indépendantes **coordonnées** par « mais ».',
          ],
        },
      ],
    },
    {
      id: 'oral-ex2',
      title: 'Nature et valeur des subordonnées',
      difficulty: 1,
      duration: 10,
      tags: ['subordination'],
      statement: [
        { type: 'p', text: 'Donnez la nature et la valeur de la subordonnée soulignée.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Il a gagné parce qu’il s’était entraîné.',
            'Parlez plus fort pour que tout le monde vous entende.',
            'Bien qu’il soit fatigué, il continue.',
            'Je me demande s’il viendra.',
            'Si tu viens, nous irons au cinéma.',
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Subordonnée conjonctive circonstancielle de **cause** (parce que).',
            'Subordonnée conjonctive circonstancielle de **but** (pour que, subjonctif).',
            'Subordonnée conjonctive circonstancielle de **concession** (bien que, subjonctif).',
            'Subordonnée **interrogative indirecte** (si = ‘est-ce que’), COD de « demande ».',
            'Subordonnée conjonctive circonstancielle de **condition** (si + indicatif).',
          ],
        },
      ],
    },
    {
      id: 'oral-ex3',
      title: 'Accord du participe passé',
      difficulty: 2,
      duration: 15,
      tags: ['participe passé'],
      statement: [
        { type: 'p', text: 'Accordez le participe passé entre parenthèses et justifiez.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Les lettres que j’ai (écrire) hier sont parties.',
            'Elle s’est (laver) les mains.',
            'Elles se sont (parler) longtemps.',
            'Les fleurs, il les a (cueillir) lui-même.',
            'Les enfants que j’ai (voir) jouer étaient heureux.',
            'Elle les a (fait) venir.',
            'Voilà les efforts que ce travail m’a (coûter).',
          ],
        },
      ],
      hints: ['Cherchez l’auxiliaire, puis le COD et sa place.', 'Pour les pronominaux, demandez-vous si « se » est COD ou COI.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**écrites** : COD « que » (= les lettres), féminin pluriel, placé avant « ai ».',
            '**lavé** : « se » est COI (elle a lavé quoi ? les mains, COD placé après) ; invariable.',
            '**parlé** : « se » est COI (parler à quelqu’un) ; invariable.',
            '**cueillies** : COD « les » (= les fleurs) placé avant « a ».',
            '**vus** : COD « que » (= les enfants), masculin pluriel, qui fait l’action de l’infinitif « jouer » ; accord.',
            '**fait** : « fait » suivi d’un infinitif est toujours invariable.',
            '**coûtés** : sens figuré (les efforts), le COD « que » placé avant ; accord (au sens propre de prix, ce serait invariable).',
          ],
        },
      ],
    },
    {
      id: 'oral-ex4',
      title: 'Interrogation',
      difficulty: 2,
      duration: 15,
      tags: ['interrogation'],
      statement: [
        { type: 'p', text: 'Pour chaque phrase, indiquez si l’interrogation est directe ou indirecte, totale ou partielle.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Viens-tu demain ?',
            'Je ne sais pas où il habite.',
            'Qui a écrit ce poème ?',
            'Dis-moi si tu viens.',
            'Est-ce que tu m’entends ?',
          ],
        },
        { type: 'p', text: 'Transformez ensuite en interrogation indirecte : « Il a demandé : “Pourquoi pars-tu ?” ».' },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Directe, **totale** (réponse par oui/non), avec inversion sujet-verbe.',
            'Indirecte, **partielle** (mot interrogatif « où »).',
            'Directe, **partielle** (mot interrogatif « qui »).',
            'Indirecte, **totale** (« si »).',
            'Directe, **totale**, avec « est-ce que ».',
          ],
        },
        { type: 'p', text: 'Transformation : « Il a demandé **pourquoi je partais**. » (le pronom et le temps changent ; pas de point d’interrogation).' },
      ],
    },
    {
      id: 'oral-ex5',
      title: 'Négation',
      difficulty: 2,
      duration: 10,
      tags: ['négation'],
      statement: [
        { type: 'p', text: 'Identifiez la négation (totale, partielle, restrictive) et repérez le « ne » explétif.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Il ne parle jamais de lui.',
            'Je ne lis que des romans.',
            'Je crains qu’il ne pleuve.',
            'Elle n’est pas sans talent.',
            'Il n’a rien dit.',
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Négation **partielle** (ne… jamais).',
            'Négation **restrictive** (ne… que = seulement) : la phrase est affirmative pour le sens.',
            '« ne » **explétif** (après un verbe de crainte) ; sens : je crains qu’il pleuve.',
            '**Double négation** : « pas » + « sans » : elle a du talent.',
            'Négation **partielle** (ne… rien).',
          ],
        },
      ],
    },
    {
      id: 'oral-ex6',
      title: 'Question de grammaire sur un texte',
      difficulty: 3,
      duration: 20,
      tags: ['type bac'],
      statement: [
        { type: 'p', text: 'Texte : « Je ne regarderai ni l’or du soir qui tombe, / Ni les voiles au loin descendant vers Harfleur, / Et quand j’arriverai, je mettrai sur ta tombe / Un bouquet de houx vert et de bruyère en fleur. » (Hugo)' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quelle est la nature de « qui tombe » ? Quelle est sa fonction ?',
            'Analysez « quand j’arriverai ».',
            'Quel type de négation est employé au vers 1 ?',
          ],
        },
      ],
      hints: ['« qui » remplace « soir ».', 'Remplacez « quand j’arriverai » par « à mon arrivée ».'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '« qui tombe » est une proposition **subordonnée relative** introduite par le pronom relatif « qui » (sujet, antécédent « soir »). Fonction : **complément de l’antécédent** (épithète, déterminative ici ou explicative selon l’interprétation) de « soir ». Test : on peut remplacer par un adjectif (« le soir tombant »).',
            '« quand j’arriverai » est une proposition subordonnée **conjonctive circonstancielle de temps** (conjonction « quand »), complément circonstanciel de « mettrai ». Test : « à mon arrivée, je mettrai… ».',
            'La construction « ne… ni… ni… » exprime une **négation** coordonnant deux compléments (négation coordonnant deux compléments : l’or du soir, les voiles).',
          ],
        },
      ],
    },
    {
      id: 'oral-ex7',
      title: 'Préparer l’explication linéaire d’un texte',
      difficulty: 3,
      duration: 40,
      tags: ['type bac', 'oral'],
      statement: [
        { type: 'p', text: 'Pour « Il pleure dans mon cœur » de Verlaine (strophes 1 et 2), préparez en 30 minutes : projet de lecture, mouvements, et l’explication complète du premier mouvement. Chronométrez-vous.' },
        {
          type: 'quote',
          text: 'Il pleure dans mon cœur\nComme il pleut sur la ville ;\nQuelle est cette langueur\nQui pénètre mon cœur ?\n\nÔ bruit doux de la pluie\nPar terre et sur les toits !\nPour un cœur qui s’ennuie,\nÔ le chant de la pluie !',
          author: 'Paul Verlaine',
          source: 'Romances sans paroles (1874)',
        },
      ],
      hints: ['Projet de lecture : comment le poème traduit-il, par sa forme, une tristesse sans cause ?', 'Deux mouvements : la tristesse (str. 1) / la consolation par la musique de la pluie (str. 2).'],
      solution: [
        { type: 'p', text: '**Projet de lecture** : comment Verlaine fait-il de la pluie l’image d’une mélancolie sans cause et le support d’une musique poétique ?' },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Mouvement 1 (v. 1-4)** : une tristesse qui envahit : comparaison cœur/ville, impersonnel « il pleure », question sans réponse sur la « langueur », verbe « pénètre ».',
            '**Mouvement 2 (v. 5-8)** : la pluie devient chant : exclamations, « bruit doux », « chant », « Pour un cœur qui s’ennuie », musique des répétitions et des sonorités.',
          ],
        },
        { type: 'p', text: '**Explication du mouvement 1** : « Le poème s’ouvre sur une comparaison très simple : “Il pleure dans mon cœur / Comme il pleut sur la ville”. Le verbe impersonnel “pleure”, construit sur “pleut”, présente la tristesse comme un phénomène naturel, involontaire. Les deux vers de six syllabes se répondent par un parallélisme (“Il pleure… / Il pleut…”) qui associe monde intérieur et extérieur. Ensuite, la question “Quelle est cette langueur” traduit l’incompréhension du poète ; “pénètre” suggère une intrusion douce et irrésistible, comme la pluie qui s’infiltre. Ce premier mouvement installe donc un état d’âme flou, que le second va transformer en musique. »' },
        { type: 'p', text: '**Grammaire possible** : « Qui pénètre mon cœur » est une subordonnée relative (antécédent « langueur »), complément de l’antécédent ; « Quelle est cette langueur » est une interrogation directe partielle.' },
      ],
    },
  ],
  representations: [
    {
      type: 'flashcards',
      cards: [
        { front: 'Durée de préparation de l’oral', back: '30 minutes.' },
        { front: 'Les deux parties de l’oral', back: '1. Explication linéaire + question de grammaire. 2. Présentation de l’œuvre choisie + entretien.' },
        { front: 'Barème de l’oral', back: '12 points pour l’explication linéaire et la grammaire (grammaire sur 2), 8 points pour la présentation et l’entretien.' },
        { front: 'Qu’est-ce qu’un projet de lecture ?', back: 'La question centrale qui guide l’explication : elle porte sur l’intérêt et la visée du texte.' },
        { front: 'Qu’est-ce qu’un mouvement ?', back: 'Une étape du texte (par vers ou lignes) qui développe une idée ou une émotion.' },
        { front: 'Séquence d’un mouvement', back: 'Annoncer – citer – analyser – interpréter – relier au projet de lecture.' },
        { front: 'Phrase simple / complexe', back: 'Simple : un verbe conjugué. Complexe : plusieurs verbes conjugués.' },
        { front: 'Juxtaposition', back: 'Propositions séparées par une ponctuation, sans mot de liaison.' },
        { front: 'Coordination', back: 'Propositions reliées par mais, ou, et, donc, or, ni, car.' },
        { front: 'Subordination', back: 'Une proposition dépend d’une principale grâce à un subordonnant (pronom relatif, conjonction).' },
        { front: 'Trois grands types de subordonnées', back: 'Relative, conjonctive (complétive ou circonstancielle), interrogative indirecte.' },
        { front: 'Relative déterminative / explicative', back: 'Déterminative : précise l’antécédent, non supprimable. Explicative : entre virgules, supprimable.' },
        { front: 'Négation restrictive', back: 'ne… que (= seulement).' },
        { front: '« ne » explétif', back: '« ne » sans valeur négative, après des verbes de crainte ou avant que : « Je crains qu’il ne vienne ».' },
        { front: 'Participe passé avec avoir', back: 'S’accorde avec le COD placé avant le verbe, sinon invariable.' },
        { front: 'Participe passé avec être', back: 'S’accorde avec le sujet.' },
        { front: 'Participe « fait » + infinitif', back: 'Toujours invariable.' },
        { front: 'Interrogation totale / partielle', back: 'Totale : réponse par oui/non/si. Partielle : introduite par un mot interrogatif.' },
      ],
    },
    {
      type: 'qcm',
      questions: [
        { question: 'Combien de temps dure la préparation de l’oral ?', choices: ['10 min', '20 min', '30 min', '1 h'], answer: 2 },
        { question: 'La question de grammaire est…', choices: ['posée avant l’explication', 'posée à la fin de l’explication, sur le texte', 'posée dans l’entretien sur l’œuvre', 'facultative'], answer: 1 },
        { question: 'Dans « Je sais que tu m’attends », « que tu m’attends » est une…', choices: ['relative', 'conjonctive complétive COD', 'circonstancielle de temps', 'interrogative indirecte'], answer: 1 },
        { question: 'Dans « Bien qu’il pleuve, nous sortons », la subordonnée exprime…', choices: ['la cause', 'la concession', 'le but', 'la condition'], answer: 1 },
        { question: 'Quel mode suit « pour que » ?', choices: ['Indicatif', 'Conditionnel', 'Subjonctif', 'Impératif'], answer: 2 },
        { question: 'Les fleurs que j’ai ____ .', choices: ['cueilli', 'cueillis', 'cueillies', 'cueillie'], answer: 2, explanation: 'COD « que » (fleurs) placé avant : féminin pluriel.' },
        { question: '« Il ne boit que de l’eau » exprime…', choices: ['une négation totale', 'une restriction (seulement)', 'une double négation', 'une interrogation'], answer: 1 },
        { question: 'Elle s’est lavé les mains : pourquoi invariable ?', choices: ['Parce que « se » est COI, le COD « les mains » est après', 'Parce qu’on n’accorde jamais', 'Parce que le sujet est masculin', 'Parce que « laver » est irrégulier'], answer: 0 },
        { question: '« Je me demande si tu viens » contient une…', choices: ['interrogation directe', 'interrogation indirecte', 'négation', 'relative'], answer: 1 },
        { question: 'Elle les a ____ venir.', choices: ['fait', 'faits', 'faite', 'faites'], answer: 0, explanation: '« fait » suivi d’un infinitif reste invariable.' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer la subordonnée à sa valeur',
      pairs: [
        { left: 'parce que', right: 'cause' },
        { left: 'pour que', right: 'but' },
        { left: 'bien que', right: 'concession' },
        { left: 'si (+ indicatif)', right: 'condition' },
        { left: 'quand', right: 'temps' },
        { left: 'si bien que', right: 'conséquence' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer la négation à son type',
      pairs: [
        { left: 'ne… pas', right: 'négation totale' },
        { left: 'ne… jamais', right: 'négation partielle' },
        { left: 'ne… que', right: 'négation restrictive' },
        { left: 'Elle n’est pas sans talent', right: 'double négation' },
        { left: 'Je crains qu’il ne vienne', right: 'ne explétif' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter la grammaire',
      text: 'Une phrase complexe contient plusieurs verbes {{conjugués}}. La proposition qui dépend d’une autre est la {{subordonnée}}. Le pronom relatif « {{qui}} » est sujet, « {{que}} » est COD. Avec l’auxiliaire avoir, le participe passé s’accorde avec le {{COD}} s’il est placé {{avant}} le verbe. Le participe suivi de l’auxiliaire {{être}} s’accorde avec le sujet.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'L’explication linéaire suit l’ordre du texte.', answer: true },
        { text: 'La grammaire est notée sur 10 points.', answer: false, explanation: 'La question de grammaire compte pour 2 points.' },
        { text: '« Je pense que tu as raison » contient une relative.', answer: false, explanation: 'C’est une conjonctive complétive.' },
        { text: '« Les lettres que j’ai écrites » : accord car le COD est avant.', answer: true },
        { text: 'Après « il a fait venir », « fait » s’accorde.', answer: false },
        { text: 'Dans « ne… que », la phrase est négative au sens.', answer: false, explanation: 'Elle est affirmative : ne… que = seulement.' },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Lire la question', text: 'Quelle notion ? Quel passage ?' },
        { title: 'Repérer', text: 'L’élément concerné dans le texte.' },
        { title: 'Nommer', text: 'Nature et fonction.' },
        { title: 'Justifier', text: 'Test de suppression, de déplacement, de remplacement.' },
        { title: 'Répondre', text: 'En 2 phrases claires.' },
      ],
    },
    {
      type: 'ordering',
      title: 'Ordre de l’explication linéaire',
      items: ['Introduction avec projet de lecture', 'Lecture à voix haute', 'Explication mouvement 1', 'Explication mouvement 2', 'Explication mouvement 3', 'Conclusion', 'Question de grammaire'],
    },
    {
      type: 'table',
      headers: ['Participe passé', 'Accord'],
      rows: [
        ['Avec être', 'Avec le sujet'],
        ['Avec avoir', 'Avec le COD avant le verbe'],
        ['Pronominal réfléchi', 'Avec le COD si avant (se COD) ; invariable si se COI'],
        ['Fait + infinitif', 'Invariable'],
        ['Avec « en »', 'Invariable'],
      ],
      caption: 'Aide-mémoire',
    },
  ],
}

export default chapter
