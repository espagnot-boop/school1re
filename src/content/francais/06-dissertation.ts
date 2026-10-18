import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'dissertation',
  subject: 'francais',
  order: 6,
  title: 'La dissertation sur œuvre',
  theme: 'Méthodes du bac',
  summary:
    'Analyser un sujet, trouver une problématique, bâtir un plan dialectique ou thématique, nourrir ses arguments d’exemples précis tirés de l’œuvre et rédiger une dissertation complète.',
  duration: '3 semaines',
  objectives: [
    'Analyser les termes d’un sujet de dissertation et en dégager les enjeux.',
    'Formuler une problématique à partir du sujet.',
    'Choisir et construire un plan (dialectique, thématique, progressif) équilibré.',
    'Mobiliser des exemples précis et analysés, tirés de l’œuvre et de son parcours.',
    'Rédiger une introduction, des parties argumentées avec transitions, et une conclusion.',
  ],
  keywords: ['dissertation', 'sujet', 'problématique', 'plan dialectique', 'plan thématique', 'argument', 'exemple', 'transition'],
  fiche: [
    {
      type: 'callout',
      variant: 'remember',
      title: 'Le principe',
      content: [
        {
          type: 'p',
          text: 'La dissertation est un **raisonnement argumenté** sur une question portant sur **une œuvre au programme** (et son parcours associé). Elle a lieu dans le cadre des 4 heures de l’écrit (au choix avec le commentaire). On y répond à une question en s’appuyant sur **l’œuvre étudiée** : exemples précis, citations, analyses. Le programme des œuvres change d’une année sur l’autre : vérifiez la liste officielle (BO, Eduscol).',
        },
      ],
    },
    { type: 'h2', text: 'Les étapes' },
    {
      type: 'steps',
      items: [
        { title: '1. Analyser le sujet', text: 'Entourer les mots-clés, les définir, repérer la forme (citation + consigne, question, opinion à discuter).' },
        { title: '2. Chercher des idées', text: 'Au brouillon : arguments pour, contre, nuancés ; exemples précis de l’œuvre (scènes, chapitres, poèmes).' },
        { title: '3. Problématiser', text: 'Dégager la tension entre deux idées : « Dans quelle mesure… ? », « En quoi… ? ».' },
        { title: '4. Construire le plan', text: 'Dialectique (thèse / antithèse / synthèse), thématique ou progressif, 2 ou 3 parties.' },
        { title: '5. Rédiger', text: 'Introduction au propre, parties avec transitions, conclusion.' },
      ],
    },
    { type: 'h2', text: 'Les trois formes de plan' },
    {
      type: 'table',
      headers: ['Plan', 'Principe', 'Quand ?'],
      rows: [
        ['**Dialectique**', 'I. Oui (thèse) – II. Mais non (antithèse) – III. Dépassement (synthèse)', 'Sujet qui affirme ou oppose : « Est-ce que… ? »'],
        ['**Thématique**', 'Chaque partie explore un aspect ou une dimension du sujet', 'Sujet descriptif : « Quelle est la fonction de… ? »'],
        ['**Progressif**', 'Chaque partie prolonge et approfondit la précédente', 'Sujet de portée (« Que nous apprend… ? »)'],
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
            'Réciter un cours sur l’œuvre au lieu de répondre à la question posée (hors-sujet).',
            'Rester vague : sans exemples précis, un argument ne vaut rien.',
            'Un plan en « oui / non / peut-être » artificiel qui ne répond pas vraiment.',
            'Oublier les transitions, ou la conclusion.',
          ],
        },
      ],
    },
  ],
  cours: [
    { type: 'h2', text: '1. Qu’est-ce que la dissertation ?' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Dissertation',
      content: [
        {
          type: 'p',
          text: 'Exercice de **réflexion argumentée** : on répond de façon progressive, nuancée et illustrée à une question posée sur une œuvre. Le sujet se présente souvent sous la forme d’une **citation** (d’un critique, d’un auteur) suivie d’une consigne (« Vous discuterez cette affirmation en vous appuyant sur l’œuvre au programme ») ou d’une **question directe**.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Ce qu’on évalue',
      content: [
        {
          type: 'list',
          items: [
            'La **compréhension du sujet** (pas de hors-sujet).',
            'La **qualité de l’argumentation** : problématique, plan cohérent, progression.',
            'La **connaissance précise de l’œuvre** : exemples, citations, analyses.',
            'La **maîtrise de la langue** : orthographe, syntaxe, lexique, clarté.',
          ],
        },
      ],
    },
    { type: 'h2', text: '2. Analyser le sujet' },
    {
      type: 'steps',
      items: [
        { title: 'Lire lentement, deux fois', text: 'Souligner chaque mot : aucun terme n’est neutre.' },
        { title: 'Définir les mots-clés', text: 'Chercher le sens, les synonymes, les contraires, les nuances (par exemple « seulement », « avant tout », « toujours » sont des restrictions ou des intensités).' },
        { title: 'Reformuler le sujet', text: 'Avec vos propres mots : « Le sujet demande si… ».' },
        { title: 'Repérer la tension', text: 'Entre quelles idées le sujet hésite-t-il ? Quel est le débat implicite ?' },
        { title: 'Délimiter le périmètre', text: 'À quelle partie de l’œuvre (ou à quel parcours) le sujet renvoie-t-il ?' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Les mots « petits mais décisifs »',
      content: [
        {
          type: 'table',
          headers: ['Mot du sujet', 'Ce qu’il implique'],
          rows: [
            ['« seulement », « uniquement »', 'Il faut montrer qu’il y a **autre chose** en plus.'],
            ['« avant tout »', 'Il faut hiérarchiser : est-ce **le plus important** ?'],
            ['« toujours », « jamais »', 'Chercher des **contre-exemples**.'],
            ['« dans quelle mesure »', 'Appelle une **réponse nuancée** (plan dialectique).'],
            ['« ou » (alternative)', 'Faut-il choisir ? Peut-on **dépasser** l’alternative ?'],
          ],
        },
      ],
    },
    { type: 'h2', text: '3. Les types de sujets' },
    {
      type: 'grid',
      columns: 3,
      items: [
        { icon: 'Scale', title: 'Sujet à discuter', text: 'Une affirmation à examiner : « Cette œuvre est-elle avant tout…, ou… ? » Plan dialectique souvent adapté.' },
        { icon: 'HelpCircle', title: 'Sujet-question', text: 'Une question ouverte : « Pourquoi… ? », « En quoi… ? » Plan thématique ou progressif.' },
        { icon: 'Quote', title: 'Sujet-citation', text: 'Une citation de critique ou d’auteur à expliquer puis à discuter : définir d’abord ce que dit la citation.' },
      ],
    },
    { type: 'h2', text: '4. La problématique' },
    {
      type: 'p',
      text: 'Elle découle de l’analyse du sujet : c’est la **question de fond** qui sous-tend le sujet, formulée de façon à ouvrir le débat. Dans une dissertation, elle n’est **pas** une simple reprise du sujet : elle l’**approfondit** et fait apparaître la tension à résoudre.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple (sur Candide)',
      content: [
        { type: 'p', text: '**Sujet** : « Candide est-il un conte pour divertir ou pour instruire ? »' },
        { type: 'p', text: '**Tension** : le plaisir de lire (rire, péripéties) / la portée critique et philosophique.' },
        { type: 'p', text: '**Problématique** : le divertissement s’oppose-t-il à la réflexion, ou en est-il le moyen privilégié ?' },
      ],
    },
    { type: 'h2', text: '5. Construire le plan' },
    { type: 'h3', text: 'Le plan dialectique' },
    {
      type: 'p',
      text: 'On examine d’abord la **thèse** (l’idée du sujet), puis l’**antithèse** (ses limites, l’idée contraire), puis on cherche une **synthèse** qui dépasse l’opposition. La synthèse n’est pas un compromis mou : c’est une **idée nouvelle** qui explique pourquoi thèse et antithèse sont toutes deux partiellement vraies.',
    },
    {
      type: 'table',
      headers: ['Partie', 'Rôle', 'Formule type'],
      rows: [
        ['I. Thèse', 'Montrer en quoi le sujet est vrai', '« Certes, … »'],
        ['II. Antithèse', 'Montrer ses limites', '« Cependant, … »'],
        ['III. Synthèse', 'Dépasser le débat', '« Il faut donc comprendre que… »'],
      ],
    },
    { type: 'h3', text: 'Le plan thématique' },
    {
      type: 'p',
      text: 'Chaque partie explore **un aspect** du sujet. Il faut bien veiller à la **progression** : les parties doivent s’enchaîner logiquement (du plus simple au plus complexe), sans juxtaposition.',
    },
    { type: 'h3', text: 'Équilibre et progression' },
    {
      type: 'list',
      items: [
        'Deux ou trois parties, de **longueur équilibrée**.',
        'Chaque partie a **deux ou trois arguments** (sous-parties).',
        'Chaque argument est illustré par **un ou deux exemples précis**, analysés.',
        'On évite de répéter dans une partie ce qui a été dit dans la précédente.',
      ],
    },
    { type: 'h2', text: '6. Arguments et exemples' },
    {
      type: 'callout',
      variant: 'method',
      title: 'Structure d’un paragraphe argumentatif',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Argument', text: 'Phrase d’ouverture qui énonce une idée claire (au présent).' },
            { title: 'Explication', text: 'Développer l’idée : pourquoi est-ce vrai ?' },
            { title: 'Exemple', text: 'Un passage précis de l’œuvre : scène, chapitre, personnage, citation courte.' },
            { title: 'Analyse', text: 'Commenter l’exemple : en quoi illustre-t-il l’argument ?' },
            { title: 'Mini-conclusion', text: 'Revenir à la question posée par le sujet.' },
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Constituez votre « réserve d’exemples » toute l’année',
      content: [
        {
          type: 'p',
          text: 'Pour chaque œuvre étudiée, notez 10 à 15 passages-clés (avec chapitre ou acte/scène), 5 à 8 citations courtes, 5 thèmes majeurs, le contexte historique et littéraire, et les liens avec le parcours. Un exemple précis **analysé** vaut mieux que trois allusions vagues.',
        },
      ],
    },
    { type: 'h2', text: '7. Rédaction' },
    { type: 'h3', text: 'L’introduction' },
    {
      type: 'steps',
      items: [
        { title: 'Amorce', text: 'Entrer dans le sujet par une idée générale pertinente (genre, thème, débat littéraire). Pas de généralités vagues.' },
        { title: 'Présentation du sujet', text: 'Citer ou reformuler le sujet en en définissant les termes.' },
        { title: 'Problématique', text: 'Formuler la question de fond.' },
        { title: 'Annonce du plan', text: 'Annoncer les parties dans une phrase (sans les numéroter lourdement).' },
      ],
    },
    { type: 'h3', text: 'Les parties' },
    {
      type: 'list',
      items: [
        'Sauter des lignes entre les parties, marquer les alinéas entre les arguments.',
        'Commencer chaque partie par une **phrase d’introduction partielle** (ce que la partie va montrer).',
        'Terminer chaque partie par une **mini-conclusion** et une **transition** vers la suivante.',
      ],
    },
    {
      type: 'table',
      headers: ['Fonction', 'Connecteurs'],
      rows: [
        ['Concession', 'certes, il est vrai que, sans doute, bien que'],
        ['Opposition', 'mais, cependant, pourtant, or, toutefois'],
        ['Cause / conséquence', 'en effet, car, donc, ainsi, par conséquent'],
        ['Addition', 'de plus, en outre, d’autre part, non seulement… mais aussi'],
        ['Dépassement', 'au-delà, plus profondément, en réalité'],
      ],
    },
    { type: 'h3', text: 'La conclusion' },
    {
      type: 'list',
      items: [
        '**Bilan** : répondre explicitement à la question posée (avec nuance).',
        '**Ouverture** : élargir vers un autre texte, une autre œuvre, une question plus large.',
        'Elle est courte (une dizaine de lignes) mais **indispensable**.',
      ],
    },
    { type: 'h2', text: '8. Exemple complet' },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Remarque',
      content: [
        {
          type: 'p',
          text: 'L’œuvre utilisée ici (*Candide* de Voltaire, 1759) sert uniquement à illustrer la **méthode**. Pour votre épreuve, vous traiterez l’œuvre de **votre programme** : transposez la démarche avec vos propres exemples.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Sujet',
      content: [{ type: 'p', text: '« Candide est-il un conte écrit pour divertir ou pour instruire ? Vous répondrez en vous appuyant sur l’œuvre de Voltaire. »' }],
    },
    { type: 'h3', text: 'Analyse du sujet' },
    {
      type: 'list',
      items: [
        '**Candide** : conte philosophique (1759), récit bref à visée critique, qui raconte les mésaventures d’un jeune naïf.',
        '**divertir** : amuser, distraire (péripéties, comique, rythme).',
        '**instruire** : faire réfléchir, transmettre une idée ou une leçon (critique de l’optimisme, de la guerre, de l’esclavage, de la religion…).',
        '**ou** : alternative apparente. Les deux visées sont-elles exclusives ? On pense à la formule classique **plaire et instruire** (Horace, Boileau, La Fontaine).',
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Problématique et plan',
      content: [
        { type: 'p', text: '**Problématique** : le plaisir de lire s’oppose-t-il à la réflexion, ou Voltaire en fait-il le moyen de convaincre ?' },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Un conte qui divertit** : récit rapide, péripéties, comique, ironie.',
            '**Un conte qui instruit** : critique de l’optimisme, de la guerre, de l’esclavage, de l’intolérance.',
            '**Divertir pour mieux instruire** : l’ironie et le rire comme arme ; une leçon qui engage le lecteur (« il faut cultiver notre jardin »).',
          ],
        },
      ],
    },
    { type: 'h3', text: 'Introduction rédigée' },
    {
      type: 'p',
      text: 'Depuis l’Antiquité, la littérature se voit assigner une double fonction : plaire et instruire. Au XVIIIᵉ siècle, les philosophes des Lumières s’emparent de cet idéal pour faire de la fiction une arme dans leur combat contre les préjugés. Voltaire illustre cette démarche avec *Candide* (1759), conte philosophique dans lequel un jeune homme naïf, élevé dans la doctrine de l’optimisme, est jeté sur les routes du monde et découvre le mal. Le récit est-il écrit pour amuser son lecteur ou pour l’instruire ? Le plaisir de lire s’oppose-t-il à la réflexion, ou Voltaire en fait-il le moyen de convaincre ? Nous verrons d’abord que *Candide* est un récit qui divertit ; nous montrerons ensuite qu’il instruit en dénonçant des maux bien réels ; enfin, nous verrons que le rire est précisément la manière dont Voltaire instruit.',
    },
    { type: 'h3', text: 'Développement rédigé' },
    {
      type: 'p',
      text: '**I. Un conte qui divertit.** *Candide* est d’abord un récit mené tambour battant. L’intrigue enchaîne les péripéties : chassé du château, enrôlé de force chez les Bulgares, ballotté de Lisbonne à Buenos Aires, du pays d’Eldorado à Venise puis Constantinople, le héros ne cesse de perdre et de retrouver ses compagnons. Les chapitres sont courts, les rebondissements incessants (on croit Pangloss pendu, il réapparaît ; on croit Cunégonde morte, elle est vivante). Ce rythme soutenu, hérité du roman d’aventures, tient le lecteur en haleine. Le comique contribue aussi au plaisir : comique de caractère avec le personnage de Pangloss, dont la formule « tout est pour le mieux dans le meilleur des mondes possibles » (chap. 1) revient comme un leitmotiv même au cœur des pires malheurs ; comique de situation et de gestes avec les mésaventures du baron ou les coups de pied qui ouvrent le récit. L’**ironie** voltairienne, enfin, suscite chez le lecteur un sourire complice : en qualifiant la guerre de « boucherie héroïque » (chap. 3), Voltaire invite à rire tout en indiquant la vérité.',
    },
    {
      type: 'p',
      text: '**II. Un conte qui instruit.** Mais ce divertissement n’est qu’une surface : *Candide* est aussi un **réquisitoire**. Voltaire s’en prend d’abord à la philosophie optimiste de Leibniz, incarnée par Pangloss, que chaque épreuve dément : le tremblement de terre de Lisbonne (chap. 5), qui avait réellement frappé la ville en 1755, rend dérisoire l’idée que « tout est bien ». Il dénonce ensuite la guerre, dont le chapitre 3 montre l’absurdité et l’horreur sous le vernis de l’héroïsme. Il condamne l’intolérance religieuse avec l’autodafé du chapitre 6, organisé en prétendu remède au séisme. Il dénonce enfin l’esclavage : dans la rencontre avec le « nègre de Surinam » (chap. 19), mutilé de la main et de la jambe, la phrase « c’est à ce prix que vous mangez du sucre en Europe » lie directement le confort européen à la souffrance des esclaves. Le lecteur est donc instruit par la confrontation répétée entre une théorie rassurante et une réalité terrifiante.',
    },
    {
      type: 'p',
      text: '**III. Divertir pour mieux instruire.** Faut-il pour autant opposer les deux visées ? À y regarder de près, le divertissement est **la méthode** même de l’instruction. Le rire est une arme : en ridiculisant Pangloss, Voltaire ridiculise une idée. L’**ironie**, qui dit le contraire de ce qu’elle pense, oblige le lecteur à penser par lui-même : elle suppose son intelligence et le rend complice. La brièveté et la vivacité du conte donnent à la critique une efficacité que n’aurait pas un traité. Enfin, la conclusion « il faut cultiver notre jardin » (chap. 30) ne livre pas une doctrine achevée mais une **leçon pratique et ouverte** : le lecteur est invité à en tirer le sens. Le conte ne se contente donc pas d’enseigner, il met le lecteur en position active, ce que le simple divertissement ne ferait pas.',
    },
    { type: 'h3', text: 'Conclusion rédigée' },
    {
      type: 'p',
      text: 'Ainsi, *Candide* est à la fois un récit plaisant et un texte engagé, et ces deux dimensions ne s’opposent pas : Voltaire divertit **pour** instruire, faisant du rire l’instrument de sa critique de l’optimisme, de la guerre, de l’intolérance et de l’esclavage. La forme brève et ironique du conte philosophique permet d’atteindre un large public sans lasser. On peut rapprocher cette stratégie de celle de La Fontaine, qui « instruit en plaisant » dans ses *Fables*, ou, plus tard, de Hugo dans *Les Châtiments* : la littérature engagée, depuis les Lumières, a souvent pris le masque du plaisir.',
    },
    { type: 'h2', text: '9. Avant de rendre la copie' },
    {
      type: 'table',
      headers: ['Je me demande…', 'Oui ?'],
      rows: [
        ['Ai-je défini tous les mots-clés du sujet ?', ''],
        ['Ma problématique va-t-elle plus loin que le sujet ?', ''],
        ['Chaque partie répond-elle à la question ?', ''],
        ['Chaque argument a-t-il un exemple précis et analysé ?', ''],
        ['Y a-t-il des transitions ?', ''],
        ['Ma conclusion répond-elle à la problématique ?', ''],
        ['Ai-je relu orthographe et accords ?', ''],
      ],
    },
  ],
  exercices: [
    {
      id: 'dis-ex1',
      title: 'Analyser les mots du sujet',
      difficulty: 1,
      duration: 10,
      tags: ['analyse du sujet'],
      statement: [
        { type: 'p', text: 'Sujet : « Dans une œuvre de fiction, le personnage principal est-il avant tout un porte-parole de l’auteur ? »' },
        { type: 'p', text: 'Soulignez les mots-clés, définissez-les et dites ce que la nuance « avant tout » implique.' },
      ],
      hints: ['Qu’est-ce qu’un « porte-parole » ?', '« Avant tout » demande de hiérarchiser.'],
      solution: [
        {
          type: 'list',
          items: [
            '**Personnage principal** : le héros ou la figure centrale d’un récit, d’un poème, d’une pièce.',
            '**Porte-parole** : celui qui exprime les idées d’un autre (ici, l’auteur).',
            '**Avant tout** : le sujet demande si c’est sa fonction **principale**. Il faut donc examiner les autres fonctions possibles (faire vivre une histoire, incarner une époque, susciter l’émotion, être un type humain) et se demander si le rôle de porte-parole l’emporte.',
          ],
        },
        { type: 'p', text: 'Le débat : le personnage est-il un simple masque ou un être de fiction autonome ? Cela appelle plutôt un plan dialectique.' },
      ],
    },
    {
      id: 'dis-ex2',
      title: 'Associer plans et sujets',
      difficulty: 1,
      duration: 10,
      tags: ['plan'],
      statement: [
        { type: 'p', text: 'Pour chaque sujet, indiquez le type de plan le plus adapté (dialectique, thématique, progressif) et justifiez en une phrase.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dans quelle mesure le comique sert-il la critique dans cette œuvre ?',
            'Quelles sont les fonctions du personnage du valet dans la comédie ?',
            'L’héroïne est-elle responsable de son malheur ?',
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**Dialectique ou progressif** : « Dans quelle mesure » appelle une réponse nuancée (le comique sert la critique, mais jusqu’où ? Il peut aussi la masquer).',
            '**Thématique** : on explore plusieurs fonctions (comique, dramaturgique, critique sociale).',
            '**Dialectique** : on examine le oui (responsabilité), le non (fatalité, société), puis la synthèse (responsabilité partielle dans un contexte contraignant).',
          ],
        },
      ],
    },
    {
      id: 'dis-ex3',
      title: 'Formuler une problématique',
      difficulty: 2,
      duration: 15,
      tags: ['problématique'],
      statement: [
        { type: 'p', text: 'Sujet : « Le théâtre n’a-t-il pour but que de faire rire ? » (réfléchissez à partir d’une comédie classique, par exemple de Molière). Dégagez la tension et formulez une problématique.' },
      ],
      hints: ['Quelle est la double tradition de la comédie ?', '« Castigat ridendo mores » : corriger les mœurs par le rire.'],
      solution: [
        { type: 'p', text: '**Tension** : plaisir comique (faire rire) / portée critique et morale (corriger, instruire, émouvoir).' },
        { type: 'p', text: '**Problématique possible** : le rire est-il le but de la comédie ou le moyen d’une réflexion sur les travers humains ?' },
        { type: 'p', text: 'On remarque que la problématique ne reprend pas le sujet mot pour mot : elle en dégage l’enjeu (but ou moyen).' },
      ],
    },
    {
      id: 'dis-ex4',
      title: 'Du sujet au plan détaillé',
      difficulty: 2,
      duration: 30,
      tags: ['plan'],
      statement: [
        { type: 'p', text: 'À partir de l’œuvre de votre choix parmi celles que vous avez étudiées, élaborez au brouillon un plan en trois parties (avec au moins deux arguments et un exemple par argument) pour le sujet : « Cette œuvre est-elle avant tout le portrait d’une époque ? »' },
      ],
      hints: ['Commencez par lister les éléments qui font ancrer l’œuvre dans son époque.', 'Cherchez ensuite ce qui est universel ou intemporel.'],
      solution: [
        { type: 'p', text: 'Plan type (à adapter à votre œuvre) :' },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Oui, l’œuvre est un témoignage sur son époque** : (a) cadre historique et social précis (exemples : lieux, métiers, mœurs) ; (b) critique ou satire de son temps.',
            '**Mais elle dépasse son époque** : (a) personnages qui incarnent des passions universelles ; (b) questions éternelles (amour, pouvoir, mort).',
            '**Un portrait d’époque qui devient portrait de l’homme** : (a) l’époque comme révélateur ; (b) l’art qui transforme le particulier en universel.',
          ],
        },
        { type: 'p', text: 'L’évaluation porte sur la rigueur de la progression et sur la précision des exemples : chaque argument doit s’appuyer sur un passage identifié de l’œuvre.' },
      ],
    },
    {
      id: 'dis-ex5',
      title: 'Rédiger un paragraphe argumentatif',
      difficulty: 2,
      duration: 20,
      tags: ['rédaction'],
      statement: [
        { type: 'p', text: 'À partir de *Candide*, rédigez un paragraphe qui démontre l’idée suivante : « Voltaire utilise l’ironie pour dénoncer la guerre. » Structure demandée : argument – explication – exemple – analyse – mini-conclusion.' },
      ],
      hints: ['L’exemple : chap. 3, l’expression « boucherie héroïque ».', 'Quelle est la contradiction entre les deux termes ?'],
      solution: [
        {
          type: 'p',
          text: 'Voltaire dénonce la guerre en usant de l’ironie, c’est-à-dire en disant le contraire de ce qu’il pense. Au lieu de condamner directement les combats, il feint de les décrire avec admiration pour mieux en révéler l’horreur. Ainsi, au chapitre 3, il écrit : « Rien n’était si beau, si leste, si brillant, si bien ordonné que les deux armées », avant d’ajouter que les canons ont « renversé » les hommes et que la baïonnette est « la raison suffisante de quelques milliers de morts ». L’accumulation des adjectifs laudatifs imite le ton d’un récit épique, tandis que l’expression « boucherie héroïque » unit deux termes contradictoires : « boucherie » désigne une tuerie sauvage, « héroïque » la gloire. Cette alliance de mots montre que l’héroïsme guerrier n’est qu’un masque pour le massacre. L’ironie oblige donc le lecteur à rétablir lui-même le véritable jugement, ce qui rend la critique plus efficace.',
        },
      ],
    },
    {
      id: 'dis-ex6',
      title: 'Écrire une transition',
      difficulty: 2,
      duration: 10,
      tags: ['transition'],
      statement: [
        { type: 'p', text: 'Rédigez la transition qui relie la partie II (« Candide instruit ») à la partie III (« divertir pour mieux instruire ») de la dissertation sur Candide. Elle doit faire le bilan de II et ouvrir la question de III.' },
      ],
      solution: [
        {
          type: 'p',
          text: 'Exemple : « Candide apparaît donc comme un réquisitoire : l’optimisme, la guerre, l’intolérance et l’esclavage y sont tour à tour condamnés. Mais cette leçon, si grave, passe par une narration plaisante et un style ironique : ne faut-il pas dès lors se demander si le divertissement est autre chose que le moyen de cette instruction ? »',
        },
        { type: 'p', text: 'Une bonne transition fait le **bilan** de la partie qui s’achève et **annonce** la suivante par une question ou une nuance.' },
      ],
    },
    {
      id: 'dis-ex7',
      title: 'Type bac : dissertation complète',
      difficulty: 3,
      duration: 120,
      tags: ['type bac'],
      statement: [
        { type: 'p', text: 'En vous appuyant sur l’œuvre étudiée en classe (ou, à défaut, sur *Candide*), traitez le sujet suivant : **« Le rire est-il seulement une façon de divertir le lecteur ? »**' },
        { type: 'p', text: 'Rédigez une introduction, au moins deux parties développées avec exemples, et une conclusion.' },
      ],
      hints: [
        '« Seulement » : il faut montrer que le rire a d’autres fonctions que le divertissement.',
        'Fonctions possibles : critiquer, dédramatiser, rapprocher auteur et lecteur, faire réfléchir.',
        'Plan dialectique : (I) le rire divertit ; (II) il critique ; (III) il fait penser autrement.',
      ],
      solution: [
        { type: 'h3', text: 'Analyse du sujet' },
        {
          type: 'list',
          items: [
            '**Le rire** : manifestation de comique (de mots, de situation, de caractère), d’ironie, de satire.',
            '**Seulement** : le sujet demande de montrer **ce que le rire apporte en plus** (ou de nuancer cette affirmation).',
            '**Divertir** : distraire, amuser, procurer du plaisir.',
          ],
        },
        { type: 'p', text: '**Problématique** : le rire est-il un simple plaisir, ou une manière d’exercer une critique ou de faire réfléchir ?' },
        { type: 'h3', text: 'Plan proposé' },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Le rire divertit** : plaisir de l’invention comique, de la caricature, du rythme.',
            '**Mais il fait plus** : critique sociale (ridiculiser les vices), distance qui permet de dire l’indicible (guerre, esclavage, mort).',
            '**Le rire comme appel à la réflexion** : l’ironie suppose un lecteur actif, le rire partagé crée une complicité qui engage.',
          ],
        },
        {
          type: 'p',
          text: 'Introduction possible : « Depuis l’Antiquité, le rire accompagne la littérature : Aristote voyait dans la comédie l’imitation d’hommes “plus mauvais” que nous, et La Fontaine proclamait vouloir “plaire et instruire”. Mais le rire est-il seulement un plaisir que l’auteur offre à son lecteur ? Ne peut-il pas aussi être une arme, une façon de dire le sérieux sans lourdeur ? Nous verrons d’abord comment l’œuvre divertit par le comique, puis comment ce rire se met au service d’une critique, avant de montrer qu’il engage le lecteur dans une réflexion active. »',
        },
        { type: 'p', text: '**Conseil de rédaction** : dans chaque partie, deux arguments, chacun illustré par un passage précis de l’œuvre étudiée en classe (acte/scène, chapitre, poème), avec citation courte et analyse. Terminez par une conclusion nuancée avec ouverture sur une autre œuvre.' },
      ],
    },
  ],
  representations: [
    {
      type: 'flashcards',
      cards: [
        { front: 'Qu’est-ce qu’une dissertation ?', back: 'Un raisonnement argumenté, nuancé et illustré qui répond à une question portant sur une œuvre au programme.' },
        { front: 'Première étape ?', back: 'Analyser le sujet : mots-clés, définitions, reformulation, tension.' },
        { front: 'Que signifie « seulement » dans un sujet ?', back: 'Qu’il faut examiner ce qu’il y a en plus ; on doit montrer les autres dimensions.' },
        { front: 'Que signifie « dans quelle mesure » ?', back: 'Il faut nuancer : réponse partiellement oui, partiellement non (plan dialectique).' },
        { front: 'Le plan dialectique', back: 'Thèse (l’idée du sujet) – antithèse (ses limites) – synthèse (dépassement).' },
        { front: 'Le plan thématique', back: 'Chaque partie explore un aspect du sujet, avec une progression logique.' },
        { front: 'Structure d’un paragraphe argumentatif', back: 'Argument – explication – exemple – analyse – mini-conclusion.' },
        { front: 'Que contient l’introduction ?', back: 'Amorce, présentation du sujet, problématique, annonce du plan.' },
        { front: 'Qu’est-ce qu’une bonne transition ?', back: 'Elle fait le bilan de la partie finie et annonce la suivante.' },
        { front: 'Que contient la conclusion ?', back: 'Un bilan qui répond à la problématique et une ouverture.' },
        { front: 'Différence thèse/synthèse', back: 'La synthèse n’est pas un compromis mou : c’est un dépassement qui explique pourquoi thèse et antithèse ont chacune une part de vérité.' },
        { front: 'Hors-sujet : de quoi s’agit-il ?', back: 'Réciter un cours sur l’œuvre sans répondre à la question posée par le sujet.' },
      ],
    },
    {
      type: 'qcm',
      questions: [
        { question: 'Un sujet commence par « Dans quelle mesure… ». Quel plan choisir ?', choices: ['Un plan strictement chronologique', 'Un plan dialectique ou nuancé', 'Un plan sans problématique', 'Une liste d’exemples'], answer: 1 },
        { question: 'La problématique de dissertation est…', choices: ['la reprise exacte du sujet', 'une question qui approfondit le sujet et fait apparaître la tension', 'un résumé de l’œuvre', 'la conclusion anticipée'], answer: 1 },
        { question: 'Que doit contenir chaque argument ?', choices: ['Un exemple précis de l’œuvre et son analyse', 'Seulement une opinion personnelle', 'Une biographie de l’auteur', 'Une citation longue'], answer: 0 },
        { question: 'Combien de parties dans une dissertation ?', choices: ['1', '2 ou 3', '6', 'Aucune règle'], answer: 1 },
        { question: 'La synthèse du plan dialectique est…', choices: ['un résumé des deux premières parties', 'un dépassement de l’opposition', 'une opinion sans preuve', 'une répétition de la thèse'], answer: 1 },
        { question: 'Un hors-sujet consiste à…', choices: ['bien répondre à la question', 'réciter un cours sans traiter le sujet', 'citer l’œuvre', 'faire une conclusion'], answer: 1 },
        { question: 'Les mots « avant tout » dans un sujet demandent de…', choices: ['hiérarchiser', 'résumer', 'décrire', 'ne rien discuter'], answer: 0 },
        { question: 'À quoi sert l’ouverture de la conclusion ?', choices: ['À redire les arguments', 'À élargir vers un autre texte ou une question plus large', 'À critiquer le sujet', 'À remplir la copie'], answer: 1 },
      ],
    },
    {
      type: 'matching',
      title: 'Associer l’élément à son rôle dans la dissertation',
      pairs: [
        { left: 'Amorce', right: 'Entrer dans le sujet' },
        { left: 'Problématique', right: 'Question de fond qui fait apparaître la tension' },
        { left: 'Thèse', right: 'Première partie : l’idée du sujet' },
        { left: 'Antithèse', right: 'Deuxième partie : limites, idée contraire' },
        { left: 'Synthèse', right: 'Troisième partie : dépassement' },
        { left: 'Transition', right: 'Bilan d’une partie et annonce de la suivante' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter la méthode',
      text: 'La dissertation répond à une question à l’aide d’{{arguments}} illustrés par des {{exemples}} précis tirés de l’œuvre. On commence par {{analyser}} le sujet. La {{problématique}} fait apparaître une tension. Dans un plan {{dialectique}}, la troisième partie est la {{synthèse}}. Chaque partie se termine par une {{transition}}.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'La dissertation peut se passer d’exemples tirés de l’œuvre.', answer: false, explanation: 'Les exemples précis sont indispensables : sans eux, l’argument n’est pas prouvé.' },
        { text: 'La problématique est la reprise mot pour mot du sujet.', answer: false, explanation: 'Elle l’approfondit et dégage la tension.' },
        { text: 'Un plan dialectique comporte thèse, antithèse et synthèse.', answer: true },
        { text: 'Un hors-sujet peut être lourdement sanctionné.', answer: true },
        { text: 'La conclusion doit comporter un bilan et une ouverture.', answer: true },
        { text: 'On peut commencer la rédaction sans avoir analysé le sujet.', answer: false },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Analyser le sujet', text: 'Mots-clés, définitions, tension.' },
        { title: 'Brouillon d’idées', text: 'Arguments et exemples de l’œuvre.' },
        { title: 'Problématique', text: 'Question de fond.' },
        { title: 'Plan détaillé', text: '2–3 parties, 2–3 arguments chacune.' },
        { title: 'Introduction au propre', text: 'Amorce, sujet, problématique, plan.' },
        { title: 'Parties rédigées', text: 'Arguments, exemples, transitions.' },
        { title: 'Conclusion et relecture', text: 'Bilan, ouverture, orthographe.' },
      ],
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre les étapes de la dissertation',
      items: ['Analyser le sujet', 'Chercher arguments et exemples', 'Formuler la problématique', 'Construire le plan', 'Rédiger l’introduction', 'Rédiger les parties', 'Rédiger la conclusion'],
    },
    {
      type: 'reveal',
      title: 'Voir le plan complet de l’exemple sur Candide',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Un conte qui divertit : péripéties, comique de Pangloss, ironie.',
            'Un conte qui instruit : optimisme (Lisbonne), guerre (chap. 3), autodafé (chap. 6), esclavage (chap. 19).',
            'Divertir pour mieux instruire : l’ironie comme arme, lecteur actif, « cultiver notre jardin ».',
          ],
        },
      ],
    },
  ],
}

export default chapter
