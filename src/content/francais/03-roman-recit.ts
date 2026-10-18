import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'roman-recit',
  subject: 'francais',
  order: 3,
  title: 'Le roman et le récit du Moyen Âge au XXIe siècle',
  theme: 'Le roman et le récit du Moyen Âge au XXIe siècle',
  summary:
    'Histoire du genre romanesque, outils d’analyse du récit (narrateur, focalisation, ordre, rythme, personnage, description, discours rapportés) et trois œuvres au programme : Chrétien de Troyes, Zola, Simone Schwarz-Bart.',
  duration: '5 à 6 semaines',
  objectives: [
    'Situer un roman dans l’histoire du genre et dans son mouvement littéraire.',
    'Identifier le narrateur, la focalisation, l’ordre et le rythme d’un récit.',
    'Analyser la construction d’un personnage et la fonction d’une description.',
    'Reconnaître et interpréter les formes de discours rapporté.',
    'Rédiger un commentaire ou une dissertation sur une œuvre et son parcours associé.',
  ],
  keywords: [
    'roman courtois',
    'narrateur',
    'focalisation',
    'analepse',
    'ellipse',
    'discours indirect libre',
    'réalisme',
    'naturalisme',
    'nouveau roman',
    'Chrétien de Troyes',
    'Zola',
    'Schwarz-Bart',
  ],

  // ───────────────────────── FICHE ─────────────────────────
  fiche: [
    {
      type: 'callout',
      variant: 'remember',
      title: 'Œuvres au programme (liste connue la plus récente : année 2026-2027)',
      content: [
        {
          type: 'p',
          text: 'Le professeur choisit **une** œuvre parmi trois pour cet objet d’étude. Pour l’année scolaire 2026-2027, les trois romans (renouvelés) sont :',
        },
        {
          type: 'table',
          headers: ['Œuvre', 'Parcours associé'],
          rows: [
            ['Chrétien de Troyes, *Le Chevalier de la charrette* (v. 1177-1181)', 'Le roman et l’invention de l’amour'],
            ['Émile Zola, *Pot-Bouille* (1882)', 'Dévoiler les rouages de la société'],
            ['Simone Schwarz-Bart, *Pluie et vent sur Télumée Miracle* (1972)', 'Tisser les mémoires, habiter le monde'],
          ],
        },
        {
          type: 'p',
          text: '*Précision : les sources consultées (BO n° 30 du 24 juillet 2025) divergent sur le libellé « session 2027 » ou « session 2028 » ; vérifiez auprès de votre professeur ou sur education.gouv.fr. Les œuvres, elles, sont les mêmes.*',
        },
      ],
    },
    { type: 'h2', text: 'Repères historiques' },
    {
      type: 'table',
      headers: ['Époque', 'Forme / courant', 'Repères'],
      rows: [
        ['XIIe s.', 'Roman courtois (en vers)', 'Chrétien de Troyes ; amour, aventure, chevalerie'],
        ['XVIe-XVIIe s.', 'Roman comique, pastoral, baroque, d’analyse', 'Rabelais, *L’Astrée* (1607-1627), *La Princesse de Clèves* (1678)'],
        ['XVIIIe s.', 'Roman épistolaire, libertin, philosophique', 'Montesquieu, Laclos, Rousseau, Voltaire (*Candide*, 1759)'],
        ['XIXe s.', 'Romantisme, réalisme, naturalisme', 'Stendhal, Balzac, Flaubert, Zola'],
        ['XXe s.', 'Roman de la conscience, engagé, nouveau roman', 'Proust, Gide, Camus, Sartre, Robbe-Grillet, Sarraute'],
        ['XXe-XXIe s.', 'Romans de la mémoire, postcoloniaux, autofiction', 'Schwarz-Bart, Perec, Ernaux…'],
      ],
    },
    { type: 'h2', text: 'Les outils du récit' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Auteur / narrateur', value: 'L’auteur est une personne réelle ; le narrateur est une voix du texte.' },
        { key: 'Narrateur hétérodiégétique', value: 'Absent de l’histoire (3e personne). Homodiégétique : personnage de l’histoire ; autodiégétique : héros de sa propre histoire.' },
        { key: 'Focalisation zéro', value: 'Le narrateur en sait plus que les personnages (point de vue omniscient).' },
        { key: 'Focalisation interne', value: 'On perçoit à travers un personnage.' },
        { key: 'Focalisation externe', value: 'Le narrateur n’en dit pas plus que ce qu’un témoin extérieur verrait.' },
        { key: 'Analepse / prolepse', value: 'Retour en arrière / anticipation.' },
        { key: 'Rythme', value: 'Scène (durée récit ≈ durée histoire), sommaire (accélération), ellipse (saut), pause (description, commentaire).' },
        { key: 'Discours rapportés', value: 'Direct, indirect, indirect libre, narrativisé.' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Réflexe méthode',
      content: [
        {
          type: 'p',
          text: 'Pour un commentaire de roman : 1) qui raconte (voix) ? 2) qui voit (focalisation) ? 3) quel rythme ? 4) quel effet sur le lecteur (adhésion, ironie, critique sociale, émotion) ? Toujours **relier un procédé à un effet**.',
        },
      ],
    },
  ],

  // ───────────────────────── COURS ─────────────────────────
  cours: [
    { type: 'h2', text: '1. Qu’est-ce qu’un roman ?' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Roman',
      content: [
        {
          type: 'p',
          text: 'Récit de fiction, généralement long, en prose (mais les premiers romans médiévaux sont en vers), qui met en scène des personnages dans une intrigue et un cadre déterminés. Le mot vient de l’expression « mettre en roman », c’est-à-dire traduire du latin en langue romane (le français).',
        },
      ],
    },
    {
      type: 'p',
      text: 'Le roman est un genre **ouvert** : il n’a pas de règles fixes comme la tragédie classique. Il a donc constamment évolué, absorbant lettres, journaux, dialogues, poésie, essais. Il se définit moins par une forme que par la présence d’un **récit de fiction** qui construit un monde.',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ne pas confondre',
      content: [
        {
          type: 'list',
          items: [
            '**Récit** : mode de narration (on peut raconter dans un roman, une nouvelle, un conte, une autobiographie).',
            '**Roman** : genre littéraire fictionnel.',
            '**Nouvelle** : récit bref, centré sur un événement ou un personnage, chute souvent.',
            '**Conte** : récit merveilleux ou philosophique (*Candide* de Voltaire est un conte philosophique).',
          ],
        },
      ],
    },

    { type: 'h2', text: '2. Histoire du roman' },
    { type: 'h3', text: 'Le Moyen Âge : le roman courtois' },
    {
      type: 'p',
      text: 'Au XIIe siècle apparaissent les premiers romans, **en octosyllabes à rimes plates**. Ils racontent les aventures de chevaliers (matière de Bretagne : le roi Arthur, ses chevaliers de la Table ronde). **Chrétien de Troyes** (actif entre 1160 et 1190 environ) invente le roman arthurien : *Érec et Énide*, *Cligès*, *Yvain ou le Chevalier au lion*, *Perceval ou le Conte du Graal*, et *Lancelot ou Le Chevalier de la charrette*.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Amour courtois (fin’amor)',
      content: [
        {
          type: 'p',
          text: 'Code amoureux de la littérature médiévale : le chevalier voue à une dame, souvent mariée et de rang supérieur, un amour respectueux et exigeant. Il se met à son service et accomplit des épreuves pour la mériter. Le roman de Chrétien de Troyes montre ce code mais en questionne aussi les excès.',
        },
      ],
    },
    { type: 'h3', text: 'XVIe-XVIIe siècles : diversité' },
    {
      type: 'list',
      items: [
        '**Rabelais**, *Pantagruel* (1532) et *Gargantua* (1534) : roman humaniste, comique et satirique.',
        '**Cervantès**, *Don Quichotte* (1605-1615) : parodie des romans de chevalerie, modèle pour tout le genre.',
        '**Honoré d’Urfé**, *L’Astrée* (1607-1627) : roman pastoral, très long, qui popularise la préciosité.',
        '**Roman baroque** : intrigues complexes, aventures multiples, travestissements, illusions (*Histoire comique de Francion* de Sorel, 1623).',
        '**Scarron**, *Le Roman comique* (1651) : roman burlesque et réaliste.',
        '**Madame de La Fayette**, *La Princesse de Clèves* (1678) : roman d’analyse psychologique, sobre, devenu un modèle.',
      ],
    },
    { type: 'h3', text: 'Le XVIIIe siècle : les Lumières' },
    {
      type: 'p',
      text: 'Le roman devient un outil de réflexion et de critique. Les formes se diversifient : **roman épistolaire** (*Lettres persanes* de Montesquieu, 1721 ; *Julie ou la Nouvelle Héloïse* de Rousseau, 1761 ; *Les Liaisons dangereuses* de Laclos, 1782), **roman-mémoires** (*Manon Lescaut* de l’abbé Prévost, 1731 ; *La Vie de Marianne* de Marivaux, 1731-1742), **conte philosophique** (*Candide*, Voltaire, 1759), **roman dialogué et ludique** (*Jacques le Fataliste* de Diderot, composé entre 1765 et 1780 environ, publié en 1796).',
    },
    { type: 'h3', text: 'Le XIXe siècle : l’âge d’or' },
    {
      type: 'grid',
      columns: 3,
      items: [
        {
          title: 'Romantisme',
          icon: 'Feather',
          text: 'Primat du moi, de l’individu et des passions (Chateaubriand, *René*, 1802 ; Hugo, *Notre-Dame de Paris*, 1831).',
        },
        {
          title: 'Réalisme',
          icon: 'Eye',
          text: 'Représenter la société contemporaine avec exactitude : Stendhal (*Le Rouge et le Noir*, 1830), Balzac (*La Comédie humaine*, dont *Le Père Goriot*, 1835), Flaubert (*Madame Bovary*, 1857).',
        },
        {
          title: 'Naturalisme',
          icon: 'Microscope',
          text: 'Zola applique au roman la méthode expérimentale (*Le Roman expérimental*, 1880) : hérédité et milieu déterminent les êtres.',
        },
      ],
    },
    {
      type: 'quote',
      text: 'Un roman, c’est un miroir qu’on promène le long d’un chemin.',
      author: 'Stendhal',
      source: 'Le Rouge et le Noir, 1830 (livre I, chap. XIII, citation attribuée à Saint-Réal)',
    },
    { type: 'h3', text: 'Le XXe siècle : crise et renouvellement' },
    {
      type: 'list',
      items: [
        '**Proust**, *À la recherche du temps perdu* (1913-1927) : roman de la mémoire involontaire et du temps.',
        '**Gide**, *Les Faux-monnayeurs* (1925) : roman qui réfléchit sur lui-même.',
        '**Céline**, *Voyage au bout de la nuit* (1932) ; **Sartre**, *La Nausée* (1938) ; **Camus**, *L’Étranger* (1942) : romans de l’absurde, de l’engagement.',
        '**Nouveau roman** (années 1950-1960) : Robbe-Grillet (*Les Gommes*, 1953 ; *Pour un nouveau roman*, 1963), Sarraute (*L’Ère du soupçon*, 1956), Butor, Simon, Duras. Refus du personnage traditionnel et de l’intrigue linéaire.',
        '**Perec**, *La Vie mode d’emploi* (1978) : roman en forme de puzzle.',
      ],
    },
    { type: 'h3', text: 'Du XXe au XXIe siècle : mémoires et voix plurielles' },
    {
      type: 'p',
      text: 'La littérature de langue française s’ouvre aux voix de la francophonie (Antilles, Afrique, Maghreb) et à l’histoire des marges. *Pluie et vent sur Télumée Miracle* (1972) de **Simone Schwarz-Bart**, romancière guadeloupéenne, donne la parole à une femme descendante d’esclaves. L’autofiction (Ernaux, Modiano…) interroge la frontière entre vécu et fiction.',
    },

    { type: 'h2', text: '3. Le narrateur et la narration' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Auteur, narrateur, personnage',
      content: [
        {
          type: 'p',
          text: 'L’**auteur** est la personne réelle qui écrit. Le **narrateur** est la voix qui raconte dans le texte (fictive). Le **personnage** vit l’histoire. Dans un récit autobiographique, auteur, narrateur et héros sont censés être identiques ; dans un roman, narrateur et auteur ne se confondent jamais, même avec « je ».',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Type de narrateur', 'Définition', 'Exemple'],
      rows: [
        ['Hétérodiégétique', 'N’est pas un personnage de l’histoire (3e personne)', 'Balzac, Zola'],
        ['Homodiégétique', 'Est un personnage de l’histoire, parfois secondaire (témoin)', 'Le récit à « nous » du début de *Madame Bovary*'],
        ['Autodiégétique', 'Héros de sa propre histoire (1re personne)', 'Meursault dans *L’Étranger*, Télumée dans *Pluie et vent…*'],
      ],
    },
    {
      type: 'quote',
      text: 'Nous étions à l’Étude, quand le Proviseur entra, suivi d’un nouveau habillé en bourgeois et d’un garçon de classe qui portait un grand pupitre.',
      author: 'Gustave Flaubert',
      source: 'Madame Bovary, 1857, incipit',
    },
    {
      type: 'p',
      text: 'Dans cet incipit, le narrateur parle à la première personne du pluriel (« nous ») : il est un camarade de Charles. Puis il disparaît du récit, qui devient hétérodiégétique : procédé singulier qui trouble le lecteur et donne l’illusion de la vérité.',
    },
    { type: 'h3', text: 'Le point de vue (focalisation)' },
    {
      type: 'p',
      text: 'La focalisation répond à la question : **qui perçoit ?** (et non qui parle). Gérard Genette (*Figures III*, 1972) en distingue trois types.',
    },
    {
      type: 'table',
      headers: ['Focalisation', 'Relation narrateur / personnage', 'Appelée aussi', 'Indices'],
      rows: [
        ['Zéro', 'Narrateur > personnage', 'Point de vue omniscient, vision « par derrière »', 'Pensées de plusieurs personnages, commentaires, savoir sur l’avenir'],
        ['Interne', 'Narrateur = personnage', 'Vision « avec »', 'Perceptions, sentiments, verbes de perception ; limité au point de vue du personnage'],
        ['Externe', 'Narrateur < personnage', 'Vision « du dehors »', 'Gestes et paroles sans explication, « comme si », « semblait »'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Piège classique',
      content: [
        {
          type: 'p',
          text: 'Un récit à la 1re personne n’est pas forcément en focalisation interne ; un narrateur adulte qui raconte son enfance peut savoir plus que l’enfant qu’il était (focalisation zéro). Et un récit à la 3e personne peut être en focalisation interne (le narrateur raconte à travers un personnage).',
        },
      ],
    },
    { type: 'h3', text: 'L’ordre du récit' },
    {
      type: 'list',
      items: [
        '**Analepse** (retour en arrière, flash-back) : explication du passé d’un personnage.',
        '**Prolepse** (anticipation) : « Elle ne savait pas encore qu’elle ne le reverrait jamais. »',
        '**In medias res** : le récit commence au milieu de l’action.',
      ],
    },
    { type: 'h3', text: 'Le rythme du récit' },
    {
      type: 'table',
      headers: ['Mouvement', 'Durée du récit vs durée de l’histoire', 'Effet'],
      rows: [
        ['Scène (dialogue)', 'Durée du récit ≈ durée de l’histoire', 'Ralentit, dramatise, donne l’illusion de présence'],
        ['Sommaire', 'Récit plus court que l’histoire', 'Accélère, résume des périodes'],
        ['Ellipse', 'Durée du récit = 0 (« Trois ans plus tard »)', 'Saute un épisode, crée un blanc'],
        ['Pause', 'Histoire arrêtée (description, commentaire)', 'Fait attendre, installe un cadre, argumente'],
        ['Ralentissement', 'Récit plus long que l’histoire', 'Souligne l’importance d’un instant'],
      ],
    },
    { type: 'h3', text: 'Les temps du récit' },
    {
      type: 'p',
      text: 'Au passé : **passé simple** pour les actions de premier plan, **imparfait** pour l’arrière-plan, les descriptions et les actions répétées, **plus-que-parfait** pour l’antériorité. Au présent de narration : effet de vivacité. Le présent peut aussi être le temps du journal ou du monologue intérieur.',
    },

    { type: 'h2', text: '4. Le personnage de roman' },
    {
      type: 'p',
      text: 'Le personnage est un être de papier mais le lecteur l’interprète comme une personne. Il est construit par : sa **description** (portrait physique, moral), ses **actions**, ses **paroles**, sa **place dans la société**, le regard des **autres personnages**, son **évolution**.',
    },
    {
      type: 'list',
      items: [
        '**Héros / anti-héros** : l’anti-héros est dépourvu des qualités du héros traditionnel (Meursault, Bardamu).',
        '**Types sociaux** : la littérature réaliste crée des types (l’avare, l’arriviste, le bourgeois, la jeune fille à marier).',
        '**Personnage-type et personnage complexe** : le premier est lisible et symbolique ; le second est contradictoire.',
        '**Schéma actantiel** : sujet, objet, adjuvant, opposant, destinateur, destinataire (Greimas).',
        '**Nouveau roman** : le personnage devient instable, sans identité fixe, parfois réduit à une voix.',
      ],
    },

    { type: 'h2', text: '5. La description' },
    {
      type: 'callout',
      variant: 'method',
      title: 'Analyser une description',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Repérer la structure', text: 'Quel est l’ordre (haut/bas, proche/loin) ? Quel est le point de vue (fixe, mobile) ?' },
            { title: 'Relever les procédés', text: 'Temps (imparfait), expansions du nom, comparaisons, métaphores, énumérations, champs lexicaux.' },
            { title: 'Identifier la fonction', text: 'Décorative, informative, explicative (le décor explique le personnage), symbolique, réaliste (effet de réel), ou critique.' },
            { title: 'Interpréter', text: 'Que dit cette description du personnage, de la société, de l’auteur ?' },
          ],
        },
      ],
    },
    {
      type: 'quote',
      text: 'Toute sa personne explique la pension, comme la pension implique sa personne.',
      author: 'Honoré de Balzac',
      source: 'Le Père Goriot, 1835 (portrait de Mme Vauquer)',
    },
    {
      type: 'p',
      text: 'Chez Balzac, la description est **explicative** : le lieu reflète ses habitants (théorie du milieu). Chez Zola, elle est **symbolique et critique** (la cour de l’immeuble de *Pot-Bouille* contraste avec la façade bourgeoise). Dans le nouveau roman, elle devient l’objet même du texte (Robbe-Grillet).',
    },

    { type: 'h2', text: '6. Les discours rapportés' },
    {
      type: 'table',
      headers: ['Type', 'Caractéristiques', 'Exemple'],
      rows: [
        ['Direct', 'Paroles citées telles quelles, guillemets ou tiret, verbe introducteur', 'Il dit : « Je viendrai demain. »'],
        ['Indirect', 'Proposition subordonnée, changements de personnes et de temps', 'Il dit qu’il viendrait le lendemain.'],
        ['Indirect libre', 'Pas de verbe introducteur ni de subordination, mais la syntaxe et le ton restent ceux du personnage (points d’exclamation, interrogations, imparfait)', 'Il hésitait : viendrait-il demain ? Il ne savait plus !'],
        ['Narrativisé', 'Les paroles sont résumées dans le récit', 'Il annonça sa visite pour le lendemain.'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Effets',
      content: [
        {
          type: 'list',
          items: [
            'Le discours direct donne vie, rythme, caractérise un langage (argot, patois, créole).',
            'Le discours indirect libre fait entendre deux voix (narrateur et personnage) : ironie, empathie, flou. Technique virtuose de Flaubert et de Zola.',
            'Le discours narrativisé accélère le récit.',
          ],
        },
      ],
    },

    { type: 'h2', text: '7. Œuvre 1 — Chrétien de Troyes, Le Chevalier de la charrette' },
    {
      type: 'callout',
      variant: 'history',
      title: 'Contexte',
      content: [
        {
          type: 'p',
          text: 'Roman de **Chrétien de Troyes**, écrit vers 1177-1181 à la demande de **Marie de Champagne** (fille d’Aliénor d’Aquitaine), à la cour de Troyes. Il est rédigé en **octosyllabes à rimes plates**. Chrétien le laisse inachevé : un certain **Godefroi de Lagny** le termine.',
        },
      ],
    },
    {
      type: 'p',
      text: 'Le roi Arthur est menacé : **Guenièvre**, sa femme, est enlevée par **Méléagant**. Le chevalier **Lancelot** part à sa recherche. Pour la retrouver, il accepte de monter dans une **charrette**, véhicule d’infamie réservé aux criminels : il y renonce d’abord un instant (deux pas), puis y monte. Cette hésitation sera plus tard reprochée par la reine, car l’amour doit passer avant l’honneur. Lancelot traverse le **pont de l’épée** (épreuve physique), affronte Méléagant, libère les prisonniers du royaume de Gorre et retrouve la reine.',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Parcours : le roman et l’invention de l’amour',
      content: [
        {
          type: 'list',
          items: [
            'Lancelot est le **parfait amant courtois** : il vénère Guenièvre (scène célèbre où il s’agenouille devant elle ; extase devant le peigne portant ses cheveux), et se soumet à ses ordres, même humiliants.',
            'L’amour est **adultère** (Guenièvre est la femme du roi Arthur), mais il est valorisé : il rend le chevalier meilleur. Il est source de **souffrance** et d’**épreuves**.',
            'Le roman crée un **modèle littéraire** de l’amour qui influence l’imaginaire occidental (l’amour comme quête, service, excès).',
            'Le statut de l’amour est ambigu : Lancelot, aveuglé, oublie parfois sa dignité de chevalier. Chrétien de Troyes ne tranche pas.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'À retenir pour l’oral',
      content: [
        {
          type: 'p',
          text: 'Le narrateur de Chrétien de Troyes intervient souvent (prologue en l’honneur de Marie de Champagne, adresses au public) : c’est un **narrateur hétérodiégétique omniscient** qui commente. L’œuvre mêle merveilleux arthurien et analyse sentimentale.',
        },
      ],
    },

    { type: 'h2', text: '8. Œuvre 2 — Zola, Pot-Bouille' },
    {
      type: 'callout',
      variant: 'history',
      title: 'Contexte',
      content: [
        {
          type: 'p',
          text: '*Pot-Bouille* (1882) est le dixième roman du cycle des **Rougon-Macquart** (20 romans, 1871-1893), sous-titré « histoire naturelle et sociale d’une famille sous le Second Empire ». Il suit *Nana* (1880) et précède *Au Bonheur des Dames* (1883). Zola y utilise la méthode naturaliste : enquête documentaire, observation, théorie de l’hérédité et du milieu.',
        },
      ],
    },
    {
      type: 'p',
      text: 'L’intrigue se déroule **à Paris, rue de Choiseul**, dans un immeuble bourgeois neuf : sur la façade, richesse et respectabilité ; dans la cour et l’escalier de service, saleté, adultères, hypocrisie. Le jeune **Octave Mouret**, arrivé de province, y observe les mœurs de ses voisins (les Josserand, les Campardon, les Duveyrier, les Pichon, les Vabre…), séduit plusieurs femmes. Le roman se déroule sur environ deux ans, le titre argotique désigne la cuisine ordinaire (« la pot-bouille ») : la vie bourgeoise vue par ses coulisses.',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Parcours : dévoiler les rouages de la société',
      content: [
        {
          type: 'list',
          items: [
            '**Un huis clos social** : l’immeuble est un microcosme de la bourgeoisie du Second Empire.',
            '**Satire de l’hypocrisie** : la morale officielle (mariage, vertu, religion) masque l’argent, le désir, l’adultère.',
            '**Le mariage comme marché** : Mme Josserand veut marier ses filles (Hortense, Berthe) ; la dot et les apparences priment.',
            '**Hauts/bas** : l’opposition entre l’escalier d’honneur et la cour/l’escalier de service (domestiques) révèle la double face de la société.',
            '**Écriture** : narrateur omniscient mais souvent focalisation interne sur Octave ; discours indirect libre, ironie, métaphores animales ou organiques, longues descriptions.',
          ],
        },
      ],
    },

    { type: 'h2', text: '9. Œuvre 3 — Simone Schwarz-Bart, Pluie et vent sur Télumée Miracle' },
    {
      type: 'callout',
      variant: 'history',
      title: 'Contexte',
      content: [
        {
          type: 'p',
          text: 'Roman publié en **1972** par **Simone Schwarz-Bart** (née en 1938 en Guadeloupe). Il raconte la vie de **Télumée**, petite-fille de **Toussine** (surnommée « Reine sans nom »), dans un village de Guadeloupe (Fond-Zombi), de l’époque postérieure à l’abolition de l’esclavage (1848) jusqu’au début du XXe siècle. L’autrice y mêle histoire coloniale et traditions orales caribéennes.',
        },
      ],
    },
    {
      type: 'p',
      text: 'Télumée, vieille femme, **raconte sa propre vie** : l’enfance auprès de sa grand-mère Toussine, la rupture avec son premier amour, le mariage avec Élie, la perte de ce dernier, sa dignité face à la misère et à la violence sociale. Dans la dernière partie, elle est devenue la sage du village, au jardin, et résume sa philosophie de résistance.',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Parcours : tisser les mémoires, habiter le monde',
      content: [
        {
          type: 'list',
          items: [
            '**Transmission matrilinéaire** : la mémoire passe de grand-mère en petite-fille ; elle transmet des savoirs, proverbes, conseils.',
            '**Mémoire de l’esclavage** : le roman rend visible la survivance d’une domination (économique, sexuelle) après l’abolition.',
            '**Oralité créole** : le récit est nourri de contes, de proverbes, d’images, de rythmes de la parole antillaise, tout en étant écrit en français.',
            '**Habiter le monde** : résister par la dignité, l’entraide, l’attachement à un lieu, malgré les épreuves. Le titre (« pluie et vent ») associe la violence des éléments à la résilience.',
            '**Narration autodiégétique** : Télumée est à la fois narratrice et héroïne ; sa voix crée une intimité mais aussi une autorité.',
          ],
        },
      ],
    },

    { type: 'h2', text: '10. Méthode : commenter un extrait de roman' },
    {
      type: 'steps',
      items: [
        { title: 'Lecture et situation', text: 'Situer le passage dans l’œuvre ; repérer le mouvement (début, milieu, fin).' },
        { title: 'Observation', text: 'Relever : narrateur, focalisation, temps, rythme, lexique, figures de style, discours rapportés.' },
        { title: 'Projet de lecture', text: 'Formuler une problématique (« Comment ce passage…? ») qui unifie les axes.' },
        { title: 'Plan en 2-3 axes', text: 'Chaque axe = idée + citations + procédé + interprétation. Éviter la paraphrase.' },
        { title: 'Conclusion', text: 'Bilan et ouverture vers l’œuvre ou le parcours.' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Erreurs fréquentes',
      content: [
        {
          type: 'list',
          items: [
            'Confondre auteur et narrateur.',
            'Faire de la paraphrase au lieu d’analyser.',
            'Relever des procédés sans les interpréter.',
            'Oublier le parcours associé à l’œuvre dans l’entretien oral.',
          ],
        },
      ],
    },
  ],

  // ───────────────────────── EXERCICES ─────────────────────────
  exercices: [
    {
      id: 'focalisation-reperer',
      title: 'Repérer la focalisation et le type de narrateur',
      difficulty: 1,
      duration: 15,
      tags: ['narration', 'focalisation'],
      statement: [
        { type: 'p', text: 'Pour chacun des trois extraits, indiquez le type de narrateur (hétérodiégétique, homodiégétique, autodiégétique) et la focalisation dominante. Justifiez.' },
        { type: 'quote', text: 'Aujourd’hui, maman est morte. Ou peut-être hier, je ne sais pas. J’ai reçu un télégramme de l’asile : « Mère décédée. Enterrement demain. Sentiments distingués. » Cela ne veut rien dire. C’était peut-être hier.', author: 'Albert Camus', source: 'L’Étranger, 1942 (extrait I)' },
        { type: 'quote', text: 'Toute sa personne explique la pension, comme la pension implique sa personne.', author: 'Honoré de Balzac', source: 'Le Père Goriot, 1835 (extrait II)' },
        { type: 'quote', text: 'Nous étions à l’Étude, quand le Proviseur entra, suivi d’un nouveau habillé en bourgeois et d’un garçon de classe qui portait un grand pupitre.', author: 'Gustave Flaubert', source: 'Madame Bovary, 1857 (extrait III)' },
      ],
      hints: [
        'Cherchez la personne grammaticale : « je », « nous », « il/elle » ?',
        'Demandez-vous qui perçoit : le narrateur sait-il plus que le personnage ?',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**Camus** : narrateur **autodiégétique** (« je », Meursault est à la fois narrateur et héros). Focalisation **interne** : on perçoit le monde à travers son regard et son incertitude (« peut-être hier, je ne sais pas »). Le style simple, factuel, reflète son indifférence apparente.',
            '**Balzac** : narrateur **hétérodiégétique** (3e personne, absent de l’histoire). Focalisation **zéro** : le narrateur connaît et explique le lien entre le personnage et son milieu ; il formule une loi générale (présent de vérité générale, tournure sentencieuse).',
            '**Flaubert** : narrateur **homodiégétique** (« nous » = camarades de classe, témoin de l’arrivée de Charles). Focalisation **interne** à ce groupe d’élèves (on voit ce qu’ils voient : « un nouveau habillé en bourgeois »). Le narrateur disparaît ensuite du récit.',
          ],
        },
      ],
    },
    {
      id: 'discours-rapportes',
      title: 'Transformer et identifier les discours rapportés',
      difficulty: 1,
      duration: 20,
      tags: ['discours rapporté'],
      statement: [
        { type: 'p', text: 'On donne la phrase au discours direct : *Marie dit à Paul : « Je suis fatiguée, je rentre demain. »*' },
        { type: 'list', ordered: true, items: [
          'Transposez-la au discours indirect.',
          'Transposez-la au discours indirect libre (récit au passé).',
          'Résumez-la au discours narrativisé.',
          'Identifiez le type de discours rapporté de : *Elle ouvrit la porte. Quelle heure était-il ? Il était sûrement tard. Fallait-il dormir ?*',
        ] },
      ],
      hints: [
        'Au discours indirect, on a une proposition subordonnée avec « que » et des changements de personne, de temps et de repères temporels (demain → le lendemain).',
        'Le discours indirect libre conserve le ton (exclamations, interrogations) sans verbe introducteur.',
      ],
      solution: [
        { type: 'list', ordered: true, items: [
          '**Indirect** : *Marie dit à Paul qu’elle était fatiguée et qu’elle rentrerait le lendemain.* (personne : je → elle ; temps : présent → imparfait ; futur → conditionnel ; demain → le lendemain).',
          '**Indirect libre** : *Marie était fatiguée. Elle rentrerait le lendemain.* (pas de verbe introducteur ni de « que »).',
          '**Narrativisé** : *Marie annonça à Paul sa fatigue et son retour pour le lendemain.* (les paroles sont résumées, sans citation)',
          '**Discours indirect libre** : les questions « Quelle heure était-il ? », « Fallait-il dormir ? » sont les pensées du personnage, rapportées sans verbe introducteur, à l’imparfait, avec la syntaxe interrogative propre au personnage. « Il était sûrement tard » est aussi dans la perspective du personnage (adverbe subjectif).',
        ] },
      ],
    },
    {
      id: 'rythme-ordre',
      title: 'Étudier l’ordre et le rythme d’un récit',
      difficulty: 2,
      duration: 20,
      tags: ['rythme', 'ordre'],
      statement: [
        { type: 'p', text: 'Texte inventé pour l’exercice :' },
        { type: 'quote', text: 'Lucie arriva à la gare à midi. Trois ans auparavant, elle avait quitté cette ville en pleurant. Elle posa sa valise. — Vous attendez quelqu’un ? demanda le chef de gare. — Personne, répondit-elle. Puis les mois passèrent, sans que rien ne changeât.' },
        { type: 'list', ordered: true, items: [
          'Repérez l’analepse.',
          'Identifiez les mouvements du récit (scène, sommaire, ellipse, pause) et justifiez.',
          'Quel est l’effet produit ?',
        ] },
      ],
      hints: ['Regardez les indicateurs temporels (« trois ans auparavant », « les mois passèrent »).', 'La scène est souvent dialoguée.'],
      solution: [
        { type: 'list', ordered: true, items: [
          '**Analepse** : « Trois ans auparavant, elle avait quitté cette ville en pleurant » (plus-que-parfait + indicateur de temps) : retour en arrière qui éclaire le sens de l’arrivée.',
          '**Scène** : le dialogue avec le chef de gare (durée du récit ≈ durée de l’histoire). **Sommaire** : « Puis les mois passèrent, sans que rien ne changeât » : plusieurs mois résumés en une phrase ; il joue aussi le rôle d’une **ellipse** puisque rien n’est dit. Il n’y a pas de pause descriptive ici.',
          '**Effet** : le contraste entre l’analepse (une blessure ancienne), la scène brève et le sommaire final crée une impression d’attente et d’immobilité ; le lecteur devine un deuil ou un échec sans qu’il soit dit.',
        ] },
      ],
    },
    {
      id: 'commentaire-incipit',
      title: 'Plan de commentaire : l’incipit de Madame Bovary',
      difficulty: 2,
      duration: 30,
      tags: ['commentaire', 'réalisme'],
      statement: [
        { type: 'p', text: 'Proposez une problématique et un plan détaillé de commentaire pour l’incipit de *Madame Bovary* (1857) :' },
        { type: 'quote', text: 'Nous étions à l’Étude, quand le Proviseur entra, suivi d’un nouveau habillé en bourgeois et d’un garçon de classe qui portait un grand pupitre. Ceux qui dormaient se réveillèrent, et chacun se leva comme surpris dans son travail.', author: 'Gustave Flaubert', source: 'Madame Bovary, I, 1' },
      ],
      hints: ['Qui parle ? Quel point de vue ?', 'Que montre-t-on de Charles ? Quelle est la fonction d’un incipit ?'],
      solution: [
        { type: 'p', text: '**Problématique** : comment cet incipit installe-t-il une scène réaliste tout en brouillant la voix narrative et en annonçant la médiocrité du personnage ?' },
        { type: 'list', ordered: true, items: [
          '**Une scène d’entrée vivante et ancrée dans le réel** : cadre précis (salle d’étude, collège), personnages typiques (le Proviseur, le garçon de classe), détails concrets (« grand pupitre »), temps du récit (passé simple, imparfait), mouvement collectif (« chacun se leva »).',
          '**Une narration déroutante** : le « nous » d’un narrateur-élève, qui disparaîtra ; point de vue collectif et limité, effet de réel et de témoignage ; ironie diffuse.',
          '**Un personnage mis en scène de façon discrète mais révélatrice** : Charles est désigné comme « un nouveau » (anonymat), « habillé en bourgeois » (décalage social/ridicule), il est précédé d’une autorité ; l’incipit installe sa maladresse (la scène se poursuit avec la célèbre casquette).',
        ] },
        { type: 'p', text: '**Conclusion** : cet incipit annonce le projet réaliste (observer sans juger) et prépare l’ironie de l’œuvre à l’égard de Charles et de la médiocrité du quotidien.' },
      ],
    },
    {
      id: 'amour-courtois',
      title: 'Question de synthèse : Le Chevalier de la charrette et l’amour',
      difficulty: 2,
      duration: 25,
      tags: ['Chrétien de Troyes', 'parcours'],
      statement: [
        { type: 'p', text: 'En vous appuyant sur *Le Chevalier de la charrette*, répondez en une quinzaine de lignes : en quoi ce roman participe-t-il à « l’invention de l’amour » dans la littérature ?' },
      ],
      hints: ['Pensez à la charrette, à la soumission de Lancelot, au statut adultère de l’amour.', 'Distinguez ce que le roman célèbre et ce qu’il questionne.'],
      solution: [
        { type: 'p', text: 'Le roman de Chrétien de Troyes (v. 1177-1181), écrit pour Marie de Champagne, met en scène un modèle d’amour qui devient un code littéraire, l’amour courtois : le chevalier **Lancelot** voue à la reine **Guenièvre** une passion totale, qui est à la fois **service** et **épreuve**. Pour la libérer, il accepte la honte de monter dans la **charrette**, véhicule d’infamie, puis traverse le **pont de l’épée** : l’amour justifie les sacrifices les plus extrêmes et transforme la quête chevaleresque en quête amoureuse.' },
        { type: 'p', text: 'Mais cet amour est **adultère** (Guenièvre est l’épouse du roi Arthur) et **ambivalent** : la reine reproche à Lancelot son bref instant d’hésitation devant la charrette ; il s’humilie, il va jusqu’à l’aveuglement. Le roman célèbre ainsi la fin’amor tout en laissant percevoir ses excès. Il invente un **imaginaire amoureux** (amour-souffrance, amour-quête, femme dominante) qui influencera durablement la littérature occidentale.' },
      ],
    },
    {
      id: 'pot-bouille-dissertation',
      title: 'Dissertation sur Pot-Bouille : dévoiler les rouages de la société',
      difficulty: 3,
      duration: 60,
      tags: ['dissertation', 'Zola', 'type bac'],
      statement: [
        { type: 'p', text: 'Sujet : « Le romancier doit-il dévoiler les coulisses de la société ? » Vous répondrez à cette question en vous appuyant sur *Pot-Bouille* de Zola, sur le parcours « Dévoiler les rouages de la société » et sur vos lectures personnelles.' },
        { type: 'p', text: 'Proposez une introduction rédigée (accroche, définition, problématique, annonce du plan) et un plan détaillé avec exemples.' },
      ],
      hints: ['Que signifie « dévoiler » : révéler, dénoncer, expliquer ?', 'Un bon plan évite l’opposition caricaturale : pensez à « oui, mais » et à un dépassement.'],
      solution: [
        { type: 'h3', text: 'Introduction rédigée' },
        { type: 'p', text: 'Balzac se disait « secrétaire » de la société qu’il décrivait, et Zola a voulu en faire la dissection. Depuis le XIXe siècle, le roman réaliste et naturaliste s’est donné pour mission de montrer ce que la société cache. Dévoiler, c’est révéler ce qui est caché, mais aussi dénoncer et faire comprendre. Dans *Pot-Bouille* (1882), Zola ouvre les portes d’un immeuble bourgeois parisien pour montrer l’hypocrisie qui règne derrière la façade. Mais le romancier doit-il se limiter à révéler, au risque de réduire la fiction à un procès ? Nous verrons d’abord que le roman a le pouvoir de dévoiler, puis comment il le fait par des moyens proprement littéraires, enfin que dévoiler engage une responsabilité et ses limites.' },
        { type: 'h3', text: 'Plan détaillé' },
        { type: 'list', ordered: true, items: [
          '**Le roman peut mettre au jour ce que la société cache.** L’immeuble de la rue de Choiseul comme microcosme ; opposition façade / cour et escalier de service ; l’adultère, le mariage-marché des filles Josserand, la hiérarchie sociale (maîtres/domestiques) ; autres romans : *Le Père Goriot* (la pension Vauquer), *Madame Bovary*.',
          '**Dévoiler suppose un art : la fiction éclaire par ses moyens propres.** Narration omnisciente et focalisation interne (Octave) pour pénétrer dans les appartements ; description symbolique, comparaisons animales ou organiques ; ironie et discours indirect libre qui laissent entendre l’hypocrisie ; construction par scènes de dîners et de visites.',
          '**Mais dévoiler a un coût et des limites.** Risque du pamphlet ou du caricatural (personnages types) ; scandale et censure (Zola attaqué pour « immoralité ») ; le roman invente aussi du possible, il ne se réduit pas au document : *Pluie et vent sur Télumée Miracle* dévoile la domination en célébrant la dignité, c’est-à-dire qu’il « dévoile » aussi en réparant et en transmettant.',
        ] },
        { type: 'p', text: '**Conclusion** : dévoiler les rouages est un des pouvoirs du roman, à condition que la vérité soit portée par une écriture et non réduite à une thèse ; le roman est alors un instrument de connaissance et de transformation du regard.' },
      ],
    },
    {
      id: 'schwarz-bart-memoire',
      title: 'Commentaire guidé : la transmission des mémoires',
      difficulty: 3,
      duration: 40,
      tags: ['Schwarz-Bart', 'parcours', 'type bac'],
      statement: [
        { type: 'p', text: 'Dans *Pluie et vent sur Télumée Miracle*, la mémoire se transmet de génération en génération. Sans recourir à une citation précise, rédigez un devoir de réflexion de 20 lignes sur ce thème en répondant : comment le roman montre-t-il que raconter, c’est résister ?' },
      ],
      hints: ['Pensez à la narration autodiégétique de Télumée, à son rapport à Toussine, aux contes et proverbes créoles.', 'Reliez la voix narrative à la dignité du personnage.'],
      solution: [
        { type: 'p', text: 'Dans le roman de Simone Schwarz-Bart (1972), la narratrice, Télumée, évoque sa vie et celle de sa lignée de femmes (Minerve, Toussine, Victoire…). Raconter est d’abord **une manière de survivre à l’oubli** : la mémoire familiale, celle des descendants d’esclaves, risquerait de disparaître si elle n’était pas transmise. La grand-mère **Toussine** joue un rôle de passeuse : elle apprend à sa petite-fille la dignité, la patience et l’art de « tenir debout » face à l’adversité.' },
        { type: 'p', text: 'Raconter est aussi **une résistance** : en écrivant en français une parole nourrie d’oralité créole (proverbes, images, tournures), l’autrice donne voix à ceux que l’histoire coloniale a réduits au silence. La narration autodiégétique de Télumée, devenue vieille, lui permet de reprendre la maîtrise de son destin ; elle transforme la souffrance en sagesse. Le roman suggère ainsi que **habiter le monde**, c’est aussi l’habiter par les histoires qu’on en raconte et qu’on lègue.' },
      ],
    },
    {
      id: 'zola-reperes',
      title: 'Zola et le naturalisme : repères et questions de culture',
      difficulty: 2,
      duration: 20,
      tags: ['Zola', 'naturalisme'],
      statement: [
        { type: 'list', ordered: true, items: [
          'Qu’est-ce que le cycle des Rougon-Macquart ? Quelles dates ?',
          'Citez deux principes du naturalisme.',
          'Quelle différence entre réalisme (Flaubert, Balzac) et naturalisme (Zola) ?',
          'Pourquoi le titre *Pot-Bouille* est-il significatif ?',
        ] },
      ],
      solution: [
        { type: 'list', ordered: true, items: [
          'C’est un cycle de **20 romans** publiés de **1871 à 1893**, qui racontent l’histoire d’une famille sous le Second Empire (1852-1870) : « histoire naturelle et sociale d’une famille sous le Second Empire ». *Pot-Bouille* (1882) en est le dixième volume.',
          'Principes : (1) le romancier est un **observateur-expérimentateur** (enquête, documentation, carnets) ; (2) le comportement humain est déterminé par l’**hérédité** et le **milieu** (Zola, *Le Roman expérimental*, 1880).',
          'Le réalisme veut représenter fidèlement la réalité sociale ; le naturalisme ajoute une **ambition scientifique** (déterminisme, méthode expérimentale) et une attention plus grande aux milieux populaires, au corps, à la physiologie.',
          'Le mot « pot-bouille » désigne en argot la cuisine ordinaire, le ménage quotidien : le titre promet de montrer la vie bourgeoise « de l’intérieur », dans ses coulisses peu reluisantes.',
        ] },
      ],
    },
  ],

  // ───────────────────────── REPRÉSENTATIONS ─────────────────────────
  representations: [
    { type: 'h2', text: 'Frise : le roman du XIIe au XXe siècle' },
    {
      type: 'timeline',
      events: [
        { date: 'v. 1177-1181', title: 'Le Chevalier de la charrette', text: 'Chrétien de Troyes, roman arthurien en octosyllabes' },
        { date: '1532', title: 'Pantagruel', text: 'Rabelais, roman humaniste' },
        { date: '1605-1615', title: 'Don Quichotte', text: 'Cervantès, parodie des romans de chevalerie' },
        { date: '1678', title: 'La Princesse de Clèves', text: 'Madame de La Fayette, roman d’analyse' },
        { date: '1721', title: 'Lettres persanes', text: 'Montesquieu, roman épistolaire' },
        { date: '1759', title: 'Candide', text: 'Voltaire, conte philosophique' },
        { date: '1782', title: 'Les Liaisons dangereuses', text: 'Laclos, roman épistolaire libertin' },
        { date: '1830', title: 'Le Rouge et le Noir', text: 'Stendhal, « chronique de 1830 »' },
        { date: '1857', title: 'Madame Bovary', text: 'Flaubert, réalisme' },
        { date: '1882', title: 'Pot-Bouille', text: 'Zola, naturalisme (10e volume des Rougon-Macquart)' },
        { date: '1913', title: 'Du côté de chez Swann', text: 'Proust, premier volume de la Recherche' },
        { date: '1942', title: 'L’Étranger', text: 'Camus, roman de l’absurde' },
        { date: '1953', title: 'Les Gommes', text: 'Robbe-Grillet, nouveau roman' },
        { date: '1972', title: 'Pluie et vent sur Télumée Miracle', text: 'Simone Schwarz-Bart' },
      ],
    },
    { type: 'h2', text: 'Schéma : les trois focalisations' },
    {
      type: 'svg',
      caption: 'Focalisation zéro, interne, externe : ce que sait le narrateur par rapport au personnage.',
      svg: `<svg viewBox="0 0 720 230" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <g fill="none" stroke="currentColor" stroke-width="1.2">
    <rect x="10" y="10" width="220" height="210" class="svg-card"/>
    <rect x="250" y="10" width="220" height="210" class="svg-card"/>
    <rect x="490" y="10" width="220" height="210" class="svg-card"/>
  </g>
  <g fill="currentColor" text-anchor="middle" font-weight="600">
    <text x="120" y="34">Focalisation zéro</text>
    <text x="360" y="34">Focalisation interne</text>
    <text x="600" y="34">Focalisation externe</text>
  </g>
  <!-- zéro -->
  <circle cx="120" cy="115" r="62" fill="none" stroke="hsl(217 91% 60%)" stroke-width="2" stroke-dasharray="5 4"/>
  <circle cx="120" cy="115" r="22" fill="none" stroke="hsl(25 95% 53%)" stroke-width="2"/>
  <text x="120" y="119" text-anchor="middle" fill="currentColor" font-size="11">Perso.</text>
  <text x="120" y="193" text-anchor="middle" fill="hsl(217 91% 60%)">Narrateur &gt; personnage</text>
  <text x="120" y="210" text-anchor="middle" fill="currentColor" font-size="11">« vision par derrière »</text>
  <!-- interne -->
  <circle cx="360" cy="115" r="38" fill="none" stroke="hsl(25 95% 53%)" stroke-width="2"/>
  <circle cx="360" cy="115" r="38" fill="none" stroke="hsl(217 91% 60%)" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="360" y="119" text-anchor="middle" fill="currentColor" font-size="11">Perso.</text>
  <text x="360" y="193" text-anchor="middle" fill="hsl(217 91% 60%)">Narrateur = personnage</text>
  <text x="360" y="210" text-anchor="middle" fill="currentColor" font-size="11">« vision avec »</text>
  <!-- externe -->
  <circle cx="600" cy="115" r="48" fill="none" stroke="hsl(25 95% 53%)" stroke-width="2"/>
  <circle cx="600" cy="115" r="22" fill="none" stroke="hsl(217 91% 60%)" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="600" y="48" text-anchor="middle" fill="currentColor" font-size="11" opacity="0">.</text>
  <text x="600" y="119" text-anchor="middle" fill="currentColor" font-size="11">Narr.</text>
  <text x="600" y="193" text-anchor="middle" fill="hsl(217 91% 60%)">Narrateur &lt; personnage</text>
  <text x="600" y="210" text-anchor="middle" fill="currentColor" font-size="11">« vision du dehors »</text>
</svg>`,
    },
    { type: 'h2', text: 'Schéma : les rythmes du récit' },
    {
      type: 'svg',
      caption: 'Rapport entre durée de l’histoire (en haut) et longueur du récit (en bas).',
      svg: `<svg viewBox="0 0 720 200" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <g fill="currentColor">
    <text x="10" y="30" font-weight="600">Histoire</text>
    <text x="10" y="150" font-weight="600">Récit</text>
  </g>
  <line x1="80" y1="25" x2="700" y2="25" stroke="currentColor" stroke-width="2"/>
  <g stroke="currentColor" stroke-width="1">
    <line x1="80" y1="18" x2="80" y2="32"/><line x1="236" y1="18" x2="236" y2="32"/><line x1="390" y1="18" x2="390" y2="32"/><line x1="545" y1="18" x2="545" y2="32"/><line x1="700" y1="18" x2="700" y2="32"/>
  </g>
  <rect x="80" y="140" width="155" height="14" fill="hsl(142 71% 45%)"/>
  <rect x="236" y="140" width="40" height="14" fill="hsl(217 91% 60%)"/>
  <rect x="277" y="140" width="1" height="14" fill="hsl(0 84% 60%)"/>
  <rect x="390" y="140" width="155" height="14" fill="hsl(263 70% 60%)"/>
  <g fill="currentColor" text-anchor="middle" font-size="11">
    <text x="158" y="175">Scène</text>
    <text x="256" y="175">Sommaire</text>
    <text x="312" y="175">Ellipse</text>
    <text x="468" y="175">Pause</text>
  </g>
  <g stroke="currentColor" stroke-dasharray="3 3" stroke-width="0.8" fill="none">
    <path d="M158 32 L158 140"/><path d="M313 32 L277 140"/><path d="M468 32 L468 140"/>
  </g>
  <g fill="currentColor" font-size="11">
    <text x="90" y="75">Durée égale</text>
    <text x="270" y="95">Récit plus court</text>
    <text x="410" y="75">Histoire arrêtée</text>
  </g>
</svg>`,
    },
    { type: 'h2', text: 'Associe l’œuvre et son auteur' },
    {
      type: 'matching',
      title: 'Œuvres et auteurs',
      pairs: [
        { left: 'Le Chevalier de la charrette', right: 'Chrétien de Troyes' },
        { left: 'Pot-Bouille', right: 'Émile Zola' },
        { left: 'Pluie et vent sur Télumée Miracle', right: 'Simone Schwarz-Bart' },
        { left: 'Madame Bovary', right: 'Gustave Flaubert' },
        { left: 'La Princesse de Clèves', right: 'Madame de La Fayette' },
        { left: 'L’Étranger', right: 'Albert Camus' },
        { left: 'Les Gommes', right: 'Alain Robbe-Grillet' },
      ],
    },
    {
      type: 'matching',
      title: 'Focalisations et définitions',
      pairs: [
        { left: 'Focalisation zéro', right: 'Le narrateur en sait plus que le personnage' },
        { left: 'Focalisation interne', right: 'Le récit épouse la perception d’un personnage' },
        { left: 'Focalisation externe', right: 'Le narrateur en dit moins que le personnage n’en sait' },
        { left: 'Analepse', right: 'Retour en arrière' },
        { left: 'Prolepse', right: 'Anticipation' },
      ],
    },
    { type: 'h2', text: 'Mets dans l’ordre chronologique' },
    {
      type: 'ordering',
      title: 'Du plus ancien au plus récent',
      items: [
        'Le Chevalier de la charrette',
        'La Princesse de Clèves',
        'Candide',
        'Madame Bovary',
        'Pot-Bouille',
        'L’Étranger',
        'Pluie et vent sur Télumée Miracle',
      ],
    },
    { type: 'h2', text: 'Texte à trous' },
    {
      type: 'cloze',
      title: 'Le récit',
      text: 'Un narrateur qui est le héros de l’histoire est dit {{autodiégétique}}. Le retour en arrière s’appelle une {{analepse}}. Quand les paroles sont intégrées au récit sans guillemets ni verbe introducteur, il s’agit du discours indirect {{libre}}. Les {{Rougon-Macquart}} forment le cycle de vingt romans de Zola. Chrétien de Troyes écrit en {{octosyllabes}} à rimes plates.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Le narrateur d’un roman est toujours l’auteur.', answer: false, explanation: 'Le narrateur est une instance fictive, même à la première personne.' },
        { text: 'Un récit à la 1re personne est forcément en focalisation interne.', answer: false, explanation: 'Un narrateur peut raconter avec un recul et en savoir plus que le personnage qu’il était.' },
        { text: 'Pot-Bouille est le dixième volume des Rougon-Macquart.', answer: true },
        { text: 'Le Chevalier de la charrette est un roman en prose du XVIIIe siècle.', answer: false, explanation: 'C’est un roman en vers (octosyllabes) du XIIe siècle.' },
        { text: 'La pause est un mouvement du récit où l’histoire est arrêtée.', answer: true },
        { text: 'Pluie et vent sur Télumée Miracle est un roman de Zola.', answer: false, explanation: 'C’est de Simone Schwarz-Bart, publié en 1972.' },
      ],
    },
    { type: 'h2', text: 'QCM de révision' },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Quel est le titre exact du parcours associé à Pot-Bouille ?',
          choices: ['Le roman et l’invention de l’amour', 'Dévoiler les rouages de la société', 'Tisser les mémoires, habiter le monde', 'Mensonge et comédie'],
          answer: 1,
          explanation: 'Le parcours de Zola est « Dévoiler les rouages de la société ».',
        },
        {
          question: 'Quel type de narrateur est Meursault dans L’Étranger ?',
          choices: ['Hétérodiégétique', 'Homodiégétique témoin', 'Autodiégétique', 'Omniscient'],
          answer: 2,
          explanation: 'Il raconte sa propre histoire à la première personne.',
        },
        {
          question: 'Dans quelle langue poétique est écrit Le Chevalier de la charrette ?',
          choices: ['En alexandrins', 'En octosyllabes à rimes plates', 'En prose', 'En décasyllabes'],
          answer: 1,
        },
        {
          question: 'Le discours indirect libre se reconnaît à :',
          choices: ['Des guillemets', 'Un verbe introducteur et « que »', 'L’absence de verbe introducteur, avec le ton du personnage', 'Un résumé des paroles'],
          answer: 2,
        },
        {
          question: 'Quel mouvement du récit accélère le temps ?',
          choices: ['La scène', 'La pause', 'Le sommaire', 'Le ralentissement'],
          answer: 2,
        },
        {
          question: 'Qui a commandé Le Chevalier de la charrette à Chrétien de Troyes ?',
          choices: ['Aliénor d’Aquitaine', 'Marie de Champagne', 'Philippe Auguste', 'Louis VII'],
          answer: 1,
          explanation: 'Marie de Champagne, fille d’Aliénor, fournit à Chrétien « la matière et le sens ».',
        },
        {
          question: 'Le naturalisme de Zola s’appuie notamment sur :',
          choices: ['Le merveilleux', 'L’hérédité et le milieu', 'Le seul culte du moi', 'La disparition du personnage'],
          answer: 1,
        },
        {
          question: 'Quel écrivain est associé au nouveau roman ?',
          choices: ['Balzac', 'Alain Robbe-Grillet', 'Camus', 'Marivaux'],
          answer: 1,
        },
      ],
    },
    { type: 'h2', text: 'Flashcards' },
    {
      type: 'flashcards',
      cards: [
        { front: 'Focalisation zéro', back: 'Narrateur omniscient : il en sait plus que les personnages (vision par derrière).' },
        { front: 'Focalisation interne', back: 'Point de vue d’un personnage (vision avec).' },
        { front: 'Focalisation externe', back: 'Le narrateur en dit moins que ce que sait le personnage (vision du dehors).' },
        { front: 'Narrateur autodiégétique', back: 'Narrateur qui est le héros de l’histoire (je).' },
        { front: 'Analepse / prolepse', back: 'Retour en arrière / anticipation.' },
        { front: 'Discours indirect libre', back: 'Paroles ou pensées rapportées sans verbe introducteur ni subordination, avec le ton du personnage.' },
        { front: 'Le Chevalier de la charrette : auteur, date, parcours', back: 'Chrétien de Troyes, v. 1177-1181 ; « Le roman et l’invention de l’amour ».' },
        { front: 'Pot-Bouille : auteur, date, parcours', back: 'Zola, 1882 (10e volume des Rougon-Macquart) ; « Dévoiler les rouages de la société ».' },
        { front: 'Pluie et vent sur Télumée Miracle : auteur, date, parcours', back: 'Simone Schwarz-Bart, 1972 ; « Tisser les mémoires, habiter le monde ».' },
        { front: 'Amour courtois', back: 'Code médiéval : le chevalier sert sa dame avec dévotion et accomplit des épreuves.' },
        { front: 'Réalisme vs naturalisme', back: 'Réalisme : peindre le réel (Balzac, Flaubert). Naturalisme : ajoute la méthode scientifique, l’hérédité et le milieu (Zola).' },
        { front: 'Nouveau roman', back: 'Années 1950-1960 : refus de l’intrigue et du personnage traditionnel (Robbe-Grillet, Sarraute, Butor, Simon).' },
      ],
    },
  ],
}

export default chapter
