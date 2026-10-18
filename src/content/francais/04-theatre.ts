import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'theatre',
  subject: 'francais',
  order: 4,
  title: 'Le théâtre du XVIIe au XXIe siècle',
  theme: 'Le théâtre du XVIIe au XXIe siècle',
  summary:
    'Du théâtre classique au théâtre contemporain : règles, genres, double énonciation, didascalies, types de répliques, mise en scène, et trois œuvres au programme : Corneille, Musset, Sarraute.',
  duration: '5 à 6 semaines',
  objectives: [
    'Situer une pièce dans l’histoire du théâtre et dans son genre (tragédie, comédie, drame…).',
    'Connaître les règles du théâtre classique et leur remise en cause.',
    'Analyser la double énonciation, les didascalies et les types de répliques.',
    'Distinguer texte et représentation : lire une mise en scène.',
    'Rédiger un commentaire ou une dissertation sur une œuvre théâtrale et son parcours.',
  ],
  keywords: [
    'tragédie',
    'comédie',
    'règle des trois unités',
    'bienséance',
    'drame romantique',
    'théâtre de l’absurde',
    'double énonciation',
    'didascalie',
    'tirade',
    'stichomythie',
    'aparté',
    'mise en scène',
    'Corneille',
    'Musset',
    'Sarraute',
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
          text: 'Le théâtre ne change pas par rapport à l’année précédente. Le professeur choisit **une** des trois œuvres :',
        },
        {
          type: 'table',
          headers: ['Œuvre', 'Parcours associé'],
          rows: [
            ['Pierre Corneille, *Le Menteur* (comédie, 1644)', 'Mensonge et comédie'],
            ['Alfred de Musset, *On ne badine pas avec l’amour* (1834)', 'Les jeux du cœur et de la parole'],
            ['Nathalie Sarraute, *Pour un oui ou pour un non* (1982)', 'Théâtre et dispute'],
          ],
        },
        {
          type: 'p',
          text: '*Précision : les sources consultées (BO n° 30 du 24 juillet 2025) divergent sur le libellé « session 2027 » ou « session 2028 » ; vérifiez auprès de votre professeur. Les œuvres sont les mêmes.*',
        },
      ],
    },
    { type: 'h2', text: 'Repères' },
    {
      type: 'table',
      headers: ['Période', 'Forme', 'Auteurs et pièces'],
      rows: [
        ['XVIIe s.', 'Tragédie et comédie classiques', 'Corneille (*Le Cid*, 1637), Racine (*Phèdre*, 1677), Molière (*Tartuffe*, 1664)'],
        ['XVIIIe s.', 'Comédie de mœurs, drame bourgeois', 'Marivaux (*Le Jeu de l’amour et du hasard*, 1730), Beaumarchais (*Le Mariage de Figaro*, 1784)'],
        ['XIXe s.', 'Drame romantique', 'Hugo (*Hernani*, 1830), Musset (*Lorenzaccio*, 1834)'],
        ['XXe s.', 'Théâtre de l’absurde, théâtre engagé', 'Ionesco (*La Cantatrice chauve*, 1950), Beckett (*En attendant Godot*, 1953), Sartre'],
        ['XXe-XXIe s.', 'Théâtre contemporain', 'Sarraute, Koltès, Lagarce, Reza, Mouawad, Pommerat'],
      ],
    },
    { type: 'h2', text: 'Les outils' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Double énonciation', value: 'Les personnages se parlent, mais l’auteur s’adresse aussi au public.' },
        { key: 'Didascalies', value: 'Indications scéniques (lieu, gestes, ton) : texte non prononcé.' },
        { key: 'Tirade', value: 'Longue réplique d’un personnage.' },
        { key: 'Stichomythie', value: 'Échange de répliques courtes, vers à vers.' },
        { key: 'Monologue / aparté', value: 'Personnage seul qui s’exprime / propos dits à part, entendus du public mais pas des autres personnages.' },
        { key: 'Trois unités', value: 'Temps (24 h), lieu, action.' },
        { key: 'Bienséances', value: 'Ne pas choquer le public : pas de violence ni de trivialité en scène.' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Réflexe méthode',
      content: [
        {
          type: 'p',
          text: 'Face à un extrait de pièce : 1) situer la scène (acte, enjeu) ; 2) repérer qui parle à qui (double énonciation) ; 3) analyser le rythme des répliques et les didascalies ; 4) penser **mise en scène** (ton, déplacements, jeu).',
        },
      ],
    },
  ],

  // ───────────────────────── COURS ─────────────────────────
  cours: [
    { type: 'h2', text: '1. Qu’est-ce que le théâtre ?' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Théâtre',
      content: [
        {
          type: 'p',
          text: 'Le mot désigne à la fois un **genre littéraire** (un texte destiné à être joué, composé de répliques et de didascalies), un **art du spectacle** (représentation devant un public) et un **lieu**. Le texte théâtral est écrit pour la scène : il n’est complet que joué.',
        },
      ],
    },
    {
      type: 'p',
      text: 'Le dramaturge écrit un **texte**, le metteur en scène l’interprète et le fait vivre avec des comédiens, des décors, des costumes, de la lumière, du son. Une même pièce peut donc être représentée de multiples façons.',
    },

    { type: 'h2', text: '2. Le théâtre classique (XVIIe siècle)' },
    { type: 'h3', text: 'Contexte' },
    {
      type: 'p',
      text: 'Sous Louis XIII puis Louis XIV, le théâtre est protégé par le pouvoir (Richelieu, l’Académie française fondée en 1635, le roi). Les doctes (Chapelain, d’Aubignac, Boileau) fixent des règles inspirées d’Aristote (*La Poétique*) et des Anciens. La **querelle du Cid** (1637) oppose Corneille aux partisans de ces règles.',
    },
    { type: 'h3', text: 'Les règles du théâtre classique' },
    {
      type: 'table',
      headers: ['Règle', 'Contenu', 'Fonction'],
      rows: [
        ['Unité d’action', 'Une seule intrigue principale', 'Clarté, concentration'],
        ['Unité de temps', 'Moins de 24 heures', 'Vraisemblance'],
        ['Unité de lieu', 'Un lieu unique (ou un lieu qui reste vraisemblable)', 'Vraisemblance'],
        ['Vraisemblance', 'Ce qui se passe doit être crédible pour le spectateur', 'Adhésion du public'],
        ['Bienséance interne', 'Cohérence des personnages', 'Crédibilité'],
        ['Bienséance externe', 'Ne rien montrer de violent, de grossier ou d’indécent : morts hors scène, racontées', 'Respect du public'],
        ['Séparation des genres', 'Tragédie (personnages nobles, fin malheureuse) / comédie (personnages ordinaires, fin heureuse)', 'Clarté des registres'],
        ['Cinq actes en vers', 'Alexandrin à rimes plates (sauf comédies en prose possibles chez Molière)', 'Dignité'],
      ],
    },
    {
      type: 'quote',
      text: 'Qu’en un lieu, qu’en un jour, un seul fait accompli\nTienne jusqu’à la fin le théâtre rempli.',
      author: 'Nicolas Boileau',
      source: 'Art poétique, 1674, chant III',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Catharsis',
      content: [
        {
          type: 'p',
          text: 'Pour Aristote, la tragédie suscite **crainte et pitié**, et purge ainsi le spectateur de ces passions : c’est la catharsis. La comédie, selon la formule attribuée à Molière, « corrige les hommes en les divertissant » (*castigat ridendo mores*).',
        },
      ],
    },
    { type: 'h3', text: 'La structure d’une pièce classique' },
    {
      type: 'steps',
      items: [
        { title: 'Acte I : exposition', text: 'Présente lieu, époque, personnages, situation initiale ; un événement perturbateur lance l’action.' },
        { title: 'Actes II-III : nœud', text: 'Les obstacles et complications se multiplient.' },
        { title: 'Acte IV : péripéties, crise', text: 'L’action atteint son sommet de tension, tout semble perdu ou renversé.' },
        { title: 'Acte V : dénouement', text: 'Résolution : mort ou salut dans la tragédie ; mariage, réconciliation dans la comédie.' },
      ],
    },
    { type: 'h3', text: 'Tragédie' },
    {
      type: 'list',
      items: [
        '**Personnages** nobles (rois, héros), enjeux politiques et passionnels, **dilemme** et fatalité.',
        '**Corneille** : héros volontaire, tiraillé entre devoir et amour (*Le Cid*, 1637 ; *Horace*, 1640 ; *Cinna*, 1641).',
        '**Racine** : passion destructrice, fatalité (*Andromaque*, 1667 ; *Britannicus*, 1669 ; *Bérénice*, 1670 ; *Phèdre*, 1677).',
      ],
    },
    { type: 'h3', text: 'Comédie' },
    {
      type: 'list',
      items: [
        '**Personnages** de condition ordinaire, situations familières, dénouement heureux.',
        '**Molière** (1622-1673) : comédie de caractère (*Tartuffe*, 1664 ; *Le Misanthrope*, 1666 ; *L’Avare*, 1668), comédie-ballet, farce.',
        '**Formes du comique** : de geste (coups, mimiques), de mots (jeux de mots, répétitions), de situation (quiproquo, travestissement), de caractère (défaut d’un personnage), de mœurs.',
      ],
    },

    { type: 'h2', text: '3. Du XVIIIe siècle au drame romantique' },
    {
      type: 'list',
      items: [
        '**Marivaux** (*Le Jeu de l’amour et du hasard*, 1730) : comédie sentimentale et analyse de l’amour naissant, « marivaudage ».',
        '**Beaumarchais** (*Le Mariage de Figaro*, 1784) : comédie de critique sociale, le valet Figaro s’affirme face au comte.',
        '**Diderot** défend le **drame bourgeois** : un théâtre sérieux sur des personnages de condition moyenne.',
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Le drame romantique',
      content: [
        {
          type: 'p',
          text: '**Victor Hugo** en donne le manifeste avec la **préface de *Cromwell*** (1827) : refus de la règle des trois unités (on conserve seulement l’unité d’action), mélange du **sublime et du grotesque**, du tragique et du comique, de la prose et du vers, **couleur locale**. La bataille d’***Hernani*** (25 février 1830, Comédie-Française) oppose « classiques » et « romantiques ». Autres pièces : *Ruy Blas* (Hugo, 1838), *Lorenzaccio* (Musset, 1834), *Chatterton* (Vigny, 1835).',
        },
      ],
    },

    { type: 'h2', text: '4. Le théâtre au XXe et au XXIe siècle' },
    {
      type: 'grid',
      columns: 3,
      items: [
        {
          title: 'Théâtre de l’absurde',
          icon: 'HelpCircle',
          text: 'Après la Seconde Guerre mondiale : crise du sens, dialogues déconstruits, personnages sans psychologie. Ionesco (*La Cantatrice chauve*, 1950), Beckett (*En attendant Godot*, 1953), Adamov.',
        },
        {
          title: 'Théâtre engagé',
          icon: 'Megaphone',
          text: 'Sartre (*Huis clos*, 1944), Camus, Brecht (distanciation) : le théâtre éclaire la condition humaine et les choix politiques.',
        },
        {
          title: 'Théâtre contemporain',
          icon: 'Sparkles',
          text: 'Koltès (*Dans la solitude des champs de coton*, 1986), Lagarce (*Juste la fin du monde*, 1990), Reza (*Art*, 1994), Mouawad (*Incendies*, 2003), Pommerat. Écriture du fragment, de la parole intime ou du non-dit.',
        },
      ],
    },
    {
      type: 'p',
      text: 'Le XXe siècle voit aussi l’essor de la **mise en scène** comme art (Copeau, Jouvet, Vilar, Brook, Mnouchkine, Vitez), la fondation du **festival d’Avignon** (1947, Jean Vilar) et la décentralisation théâtrale.',
    },

    { type: 'h2', text: '5. Outils d’analyse du texte théâtral' },
    { type: 'h3', text: 'La double énonciation' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Double énonciation',
      content: [
        {
          type: 'p',
          text: 'Au théâtre, les paroles des personnages s’adressent à un interlocuteur sur scène (premier niveau), mais aussi, par-dessus eux, au **spectateur** (second niveau). Ce dernier sait parfois plus que les personnages : c’est ce qui permet l’**ironie dramatique** (un personnage ignore ce que le spectateur sait) et le **comique de situation** (quiproquo).',
        },
      ],
    },
    {
      type: 'svg',
      caption: 'La double énonciation : A et B se parlent, mais le texte vise aussi le spectateur.',
      svg: `<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <rect x="20" y="20" width="520" height="110" fill="none" stroke="currentColor" stroke-width="1.2" class="svg-card"/>
  <text x="280" y="38" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.8">SCÈNE</text>
  <circle cx="130" cy="85" r="26" fill="none" stroke="hsl(217 91% 60%)" stroke-width="2"/>
  <text x="130" y="90" text-anchor="middle" fill="currentColor">Perso. A</text>
  <circle cx="430" cy="85" r="26" fill="none" stroke="hsl(25 95% 53%)" stroke-width="2"/>
  <text x="430" y="90" text-anchor="middle" fill="currentColor">Perso. B</text>
  <path d="M158 80 L402 80" stroke="currentColor" stroke-width="1.5" marker-end="url(#a)"/>
  <defs><marker id="a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <text x="280" y="70" text-anchor="middle" fill="currentColor" font-size="12">1. énonciation interne</text>
  <rect x="190" y="170" width="180" height="36" fill="none" stroke="hsl(142 71% 45%)" stroke-width="2"/>
  <text x="280" y="193" text-anchor="middle" fill="currentColor">Public (spectateur)</text>
  <path d="M130 111 L240 168" stroke="hsl(142 71% 45%)" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#a)"/>
  <path d="M280 125 L280 168" stroke="hsl(142 71% 45%)" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#a)"/>
  <text x="400" y="155" fill="hsl(142 71% 45%)" font-size="12">2. énonciation externe</text>
  <text x="400" y="172" fill="hsl(142 71% 45%)" font-size="12">(auteur → public)</text>
</svg>`,
    },
    { type: 'h3', text: 'Les didascalies' },
    {
      type: 'p',
      text: 'Ce sont les indications de l’auteur qui ne sont pas prononcées : noms des personnages, indications de lieu et d’époque, gestes, déplacements, ton (« *à part* », « *ironiquement* »), entrées et sorties. Leur importance varie : rares et brèves chez Corneille, abondantes chez Musset, essentielles chez Beckett, Ionesco ou Sarraute.',
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Fonctions des didascalies',
      content: [
        {
          type: 'list',
          items: [
            'Informer sur le cadre (lieu, temps, décor).',
            'Guider le jeu des acteurs (gestes, voix).',
            'Donner un sens (ironie, tonalité).',
            'Manifester la présence de l’auteur ; chez certains auteurs contemporains, elles forment un véritable texte littéraire.',
          ],
        },
      ],
    },
    { type: 'h3', text: 'Les types de répliques' },
    {
      type: 'table',
      headers: ['Terme', 'Définition', 'Effet'],
      rows: [
        ['Tirade', 'Longue réplique, éloquente', 'Argumenter, exprimer un sentiment, émouvoir'],
        ['Stichomythie', 'Échange de répliques brèves, d’un vers chacune (ou moins)', 'Tension, duel verbal'],
        ['Monologue', 'Personnage seul sur scène qui parle (réflexion, délibération)', 'Exprimer son intériorité, informer le spectateur'],
        ['Stances', 'Monologue lyrique en strophes (tragédie)', 'Délibérer, exprimer un dilemme'],
        ['Aparté', 'Réplique dite « à part », entendue du public mais pas des autres personnages', 'Complicité avec le public, ironie'],
        ['Récit', 'Narration d’événements hors scène (par bienséance)', 'Informer, raconter la violence'],
        ['Quiproquo', 'Malentendu entre personnages', 'Comique de situation'],
      ],
    },
    { type: 'h3', text: 'Le vers au théâtre : l’alexandrin' },
    {
      type: 'p',
      text: 'L’alexandrin (12 syllabes, césure à l’hémistiche après la 6e) est le vers de la tragédie et de la grande comédie classique. Il se compte en tenant compte du *e* muet (élidé devant voyelle ou en fin de vers, prononcé devant consonne). Exemple de Boileau : *Qu’en un lieu, qu’en un jour, un seul fait accompli*.',
    },

    { type: 'h2', text: '6. Texte et représentation : la mise en scène' },
    {
      type: 'p',
      text: 'La **mise en scène** est l’ensemble des choix qui font passer le texte à la scène : scénographie (espace, décor), costumes, lumières, musique, direction d’acteurs, rythme, interprétation. Le metteur en scène lit le texte et propose un point de vue (actualisation, lecture psychologique, politique…).',
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Commenter une mise en scène',
      content: [
        {
          type: 'list',
          items: [
            'Décrire : espace, décor, costumes, lumière, jeu des acteurs.',
            'Interpréter : qu’est-ce que ce choix fait comprendre du texte ?',
            'Comparer deux mises en scène d’une même scène pour voir la diversité des lectures.',
          ],
        },
      ],
    },

    { type: 'h2', text: '7. Œuvre 1 — Corneille, Le Menteur' },
    {
      type: 'callout',
      variant: 'history',
      title: 'Contexte',
      content: [
        {
          type: 'p',
          text: '**Pierre Corneille** (1606-1684) donne *Le Menteur* en **1644**, **comédie en cinq actes et en alexandrins**, adaptée de la pièce espagnole *La verdad sospechosa* (« La vérité suspecte »), attribuée alors à Lope de Vega mais écrite par **Juan Ruiz de Alarcón**. Corneille, déjà célèbre pour ses tragédies (*Le Cid*, *Horace*, *Cinna*), revient à la comédie, dans le Paris de Louis XIII (lieu : Paris, jardin des Tuileries et place Royale).',
        },
      ],
    },
    {
      type: 'p',
      text: '**Dorante**, jeune homme de bonne famille revenu de ses études à Poitiers, aime inventer des histoires pour séduire. Accompagné de son valet **Cliton**, il rencontre deux jeunes femmes, **Clarice** et **Lucrèce**, et invente une fête somptueuse sur l’eau (la « collation ») qu’il aurait offerte. Il se trompe sur les noms (il croit que celle qu’il aime s’appelle Lucrèce), ce qui provoque une série de quiproquos. Son père **Géronte** veut le marier à Clarice ; Dorante, pour éviter ce mariage, invente qu’il est déjà marié à Poitiers, puis multiplie les mensonges. À la fin, ses mensonges se retournent contre lui : il doit épouser Lucrèce alors qu’il aime Clarice (promise à Alcippe). Le dénouement est comique, mais le mensonge est puni.',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Parcours : mensonge et comédie',
      content: [
        {
          type: 'list',
          items: [
            '**Le mensonge, ressort comique** : inventions, quiproquos, cascade de mensonges pour couvrir d’autres mensonges ; le menteur est pris à son propre piège (comique de situation).',
            '**Le mensonge comme art** : Dorante est un « poète » de la parole ; sa verve fait de lui un personnage ambigu, à la fois condamné et séduisant ; l’imagination est brillante, mais elle est dangereuse.',
            '**Théâtre et illusion** : le menteur est un auteur d’illusions, comme le dramaturge ; le spectateur est complice (double énonciation).',
            '**Morale** : comme dans la comédie classique, le vice est corrigé (*castigat ridendo mores*) mais le ton est léger.',
            '**Aussi** : esprit de la comédie « de mœurs » de la société parisienne, nouveauté de Corneille par rapport à la farce ou à la comédie italienne.',
          ],
        },
      ],
    },

    { type: 'h2', text: '8. Œuvre 2 — Musset, On ne badine pas avec l’amour' },
    {
      type: 'callout',
      variant: 'history',
      title: 'Contexte',
      content: [
        {
          type: 'p',
          text: '**Alfred de Musset** (1810-1857) publie *On ne badine pas avec l’amour* en **1834** dans la *Revue des deux Mondes*, puis dans *Un spectacle dans un fauteuil*. La pièce est un « **proverbe** » dramatique en trois actes, en prose, mêlant comédie et drame ; elle ne sera représentée qu’en **1861** (à la Comédie-Française), après la mort de Musset. L’œuvre est marquée par l’expérience de la rupture avec George Sand (1834).',
        },
      ],
    },
    {
      type: 'p',
      text: '**Perdican** et **Camille**, cousins, reviennent chez le baron, leur oncle, après des études. Le baron rêve de les marier. Camille, sortie du couvent, refuse l’amour et la sensualité ; Perdican, déçu, courtise **Rosette**, la sœur de lait de Camille, pour provoquer sa jalousie. Camille finit par laisser entendre qu’elle aime Perdican, mais l’orgueil et les manipulations de chacun conduisent au drame : Rosette, trahie, meurt, et les amants sont séparés à jamais. Le chœur (paysans) commente l’action ; le baron, Dame Pluche, maître Blazius et maître Bridaine apportent un comique de farce.',
    },
    {
      type: 'quote',
      text: 'Tous les hommes sont menteurs, inconstants, faux, bavards, hypocrites, orgueilleux et lâches, méprisables et sensuels ; toutes les femmes sont perfides, artificieuses, vaniteuses, curieuses et dépravées ; le monde n’est qu’un égout sans fond où les phoques les plus informes rampent et se tordent sur des montagnes de fange ; mais il y a au monde une chose sainte et sublime, c’est l’union de deux de ces êtres si imparfaits et si affreux. On est souvent trompé en amour, souvent blessé et souvent malheureux ; mais on aime, et quand on est sur le bord de sa tombe, on se retourne pour regarder en arrière, et on se dit : J’ai souffert souvent, je me suis trompé quelquefois, mais j’ai aimé. C’est moi qui ai vécu, et non pas un être factice créé par mon orgueil et mon ennui.',
      author: 'Perdican',
      source: 'On ne badine pas avec l’amour, acte II, scène 5',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Parcours : les jeux du cœur et de la parole',
      content: [
        {
          type: 'list',
          items: [
            '**Jeux de l’amour** : orgueil, défi, mise à l’épreuve, jalousie ; on « badine » avec un sentiment qui finit par tuer.',
            '**Jeux de la parole** : tirades lyriques et argumentatives, joutes verbales, proverbe en forme de morale, tonalités mêlées (lyrisme, ironie, farce, pathétique).',
            '**Mélange des genres** : héritage romantique (pièce non destinée d’abord à la scène, dénouement tragique, comique de farce).',
            '**Le chœur** : héritage antique, il commente l’action et accentue l’ironie.',
            '**Didascalies** : nombreuses (décor, gestes, mouvements) ; elles font de la pièce un « spectacle dans un fauteuil ».',
          ],
        },
      ],
    },

    { type: 'h2', text: '9. Œuvre 3 — Sarraute, Pour un oui ou pour un non' },
    {
      type: 'callout',
      variant: 'history',
      title: 'Contexte',
      content: [
        {
          type: 'p',
          text: '**Nathalie Sarraute** (1900-1999), figure du **nouveau roman** (*Tropismes*, 1939 ; *L’Ère du soupçon*, 1956), écrit *Pour un oui ou pour un non* en 1981-1982 : pièce courte en un acte, d’abord diffusée à la radio, publiée en 1982. Les personnages sont désignés par des lettres : **H1, H2, H3** et **une femme** (pas de noms, pas de contexte social précis).',
        },
      ],
    },
    {
      type: 'p',
      text: 'Deux amis de longue date, H1 et H2, se brouillent à cause d’une remarque banale. H1 reproche à H2 d’avoir dit, sur un ton qu’il juge condescendant, la phrase « C’est bien… ça », avec une pause et une insistance sur « bien » : phrase minuscule en apparence, mais pour H1 elle exprime un mépris. H2 prend un tiers (H3), puis une femme, à témoin, pour juger. La pièce se déploie sur un conflit minuscule, qui révèle des enjeux de pouvoir, de supériorité et d’humiliation.',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Parcours : théâtre et dispute',
      content: [
        {
          type: 'list',
          items: [
            '**Une dispute sans cause apparente** : un « oui » ou un « non », un ton, un silence ; les mots ne disent pas ce qu’ils veulent dire.',
            '**Sous-conversation (tropismes)** : Sarraute explore ce qui se passe sous les paroles, les micro-mouvements psychologiques ; les points de suspension, les blancs et les silences sont essentiels.',
            '**Théâtre de la parole** : peu d’action, tout se joue dans le dialogue ; l’échange est un combat.',
            '**Rôle des tiers** : H3 et la Femme sont juges et spectateurs ; ils redoublent la situation de double énonciation.',
            '**Quelque chose de nouveau** : un théâtre sans décor précis ni psychologie traditionnelle, héritier de l’absurde mais attentif à l’intime.',
          ],
        },
      ],
    },

    { type: 'h2', text: '10. Méthode : commenter un extrait de théâtre' },
    {
      type: 'steps',
      items: [
        { title: 'Situer', text: 'Où en est-on dans la pièce ? Qui parle ? Quel est l’enjeu ?' },
        { title: 'Observer', text: 'Types de répliques, didascalies, rythme, lexique, tonalités, double énonciation.' },
        { title: 'Problématiser', text: 'Comment cette scène fait-elle… (tension, comique, révélation) ?' },
        { title: 'Rédiger en 2-3 axes', text: 'Chaque axe : idée + citation + procédé + effet (sur le public).' },
        { title: 'Penser à la scène', text: 'Évoquer le jeu, le ton, les gestes, une mise en scène possible.' },
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
            'Traiter une pièce comme un roman (oublier la représentation).',
            'Confondre aparté et monologue.',
            'Oublier la double énonciation.',
            'Répéter l’intrigue sans analyser.',
          ],
        },
      ],
    },
  ],

  // ───────────────────────── EXERCICES ─────────────────────────
  exercices: [
    {
      id: 'repliques-reperer',
      title: 'Identifier les types de répliques et de didascalies',
      difficulty: 1,
      duration: 15,
      tags: ['répliques', 'didascalies'],
      statement: [
        { type: 'p', text: 'Nommez le procédé théâtral correspondant à chaque situation :' },
        { type: 'list', ordered: true, items: [
          'Un personnage, seul sur scène, délibère à voix haute.',
          'Deux personnages se répondent vers à vers, en un seul vers chacun.',
          'Un personnage murmure un commentaire que le public entend mais pas son interlocuteur.',
          'Un personnage prononce une longue réplique argumentée de vingt lignes.',
          'Un personnage raconte une bataille qui s’est déroulée hors de la scène.',
          '*(Il sort en claquant la porte.)*',
        ] },
      ],
      hints: ['Rappelez-vous la différence entre texte prononcé et texte non prononcé.'],
      solution: [
        { type: 'list', ordered: true, items: [
          '**Monologue** (si lyrique et en strophes : stances).',
          '**Stichomythie**.',
          '**Aparté**.',
          '**Tirade**.',
          '**Récit** (par bienséance : on ne montre pas la violence).',
          '**Didascalie** (indication scénique, non prononcée).',
        ] },
      ],
    },
    {
      id: 'regles-classiques',
      title: 'Les règles classiques : application',
      difficulty: 1,
      duration: 15,
      tags: ['classicisme'],
      statement: [
        { type: 'list', ordered: true, items: [
          'Citez les trois unités et leur définition.',
          'Quelle règle justifie qu’une mort soit racontée plutôt que montrée ?',
          'Quelle différence entre tragédie et comédie classiques (personnages, dénouement) ?',
          'Quel auteur a rompu avec ces règles dans la préface de *Cromwell* ?',
        ] },
      ],
      solution: [
        { type: 'list', ordered: true, items: [
          '**Unité d’action** (une seule intrigue principale), **unité de temps** (moins de 24 heures), **unité de lieu** (un seul lieu).',
          'La **bienséance** (externe) : on ne montre pas la violence ou le sang devant le public ; on la raconte.',
          'Tragédie : personnages nobles, enjeux graves, fin souvent malheureuse (mort). Comédie : personnages ordinaires, intrigue amusante, fin heureuse (mariage).',
          '**Victor Hugo** (1827) : refus des unités de lieu et de temps, mélange du sublime et du grotesque.',
        ] },
      ],
    },
    {
      id: 'alexandrin-scansion',
      title: 'Scander un alexandrin de théâtre',
      difficulty: 2,
      duration: 15,
      tags: ['versification'],
      statement: [
        { type: 'p', text: 'Scandez le vers de Boileau et indiquez le type de césure : *Qu’en un lieu, qu’en un jour, un seul fait accompli*' },
      ],
      hints: ['Comptez 12 syllabes ; « lieu » compte pour une syllabe (diphtongue)', 'La césure est après la 6e syllabe.'],
      solution: [
        { type: 'p', text: '*Qu’en / un / lieu / qu’en / un / jour / // un / seul / fait / ac / com / pli* : 12 syllabes (1 : Qu’en ; 2 : un ; 3 : lieu ; 4 : qu’en ; 5 : un ; 6 : jour ; // 7 : un ; 8 : seul ; 9 : fait ; 10 : ac ; 11 : com ; 12 : pli). Hémistiche 6/6, césure après « jour ». Le parallélisme (« qu’en un lieu, qu’en un jour ») marque l’équilibre du vers, qui énonce les unités de lieu et de temps.' },
      ],
    },
    {
      id: 'tirade-perdican',
      title: 'Commentaire : la tirade de Perdican (II, 5)',
      difficulty: 3,
      duration: 40,
      tags: ['commentaire', 'Musset', 'type bac'],
      statement: [
        { type: 'p', text: 'Lisez la tirade de Perdican (voir cours §8). Proposez une problématique et un plan détaillé de commentaire.' },
      ],
      hints: ['Observez le basculement marqué par « mais ».', 'Pensez aux tonalités (satirique, lyrique, pathétique) et à la double énonciation.'],
      solution: [
        { type: 'p', text: '**Problématique** : comment cette tirade, d’abord réquisitoire, se retourne-t-elle en éloge de l’amour, et que révèle-t-elle de Perdican et du drame à venir ?' },
        { type: 'list', ordered: true, items: [
          '**Un réquisitoire qui reprend les clichés misogynes et misanthropes** : énumération de défauts (« menteurs, inconstants, faux, bavards… »), hyperboles, symétrie hommes/femmes, métaphore de l’« égout sans fond », ton cynique ; Perdican reprend le discours de Camille et du couvent pour mieux le retourner.',
          '**Un renversement lyrique** : articulation « mais il y a au monde une chose sainte et sublime » ; vocabulaire mélioratif (« sainte », « sublime »), amplitude de la phrase, anaphores (« souvent… souvent… »), emploi du « on », puis du « je » : la leçon devient confession.',
          '**Un moment de vérité fragile et ambigu** : « J’ai souffert… j’ai aimé » ; conception romantique de l’amour qui se vit même dans la douleur ; mais ironie tragique, car la suite de la pièce montrera que Perdican joue aussi avec les sentiments (Rosette). Pour le spectateur, la tirade annonce l’échec des deux amants.',
        ] },
        { type: 'p', text: '**Mise en scène** : on peut jouer la tirade comme un cri sincère ou comme un effet oratoire, en variant le ton après « mais ».' },
      ],
    },
    {
      id: 'menteur-dissertation',
      title: 'Dissertation : Le mensonge est-il un bon ressort comique ?',
      difficulty: 3,
      duration: 60,
      tags: ['dissertation', 'Corneille', 'type bac'],
      statement: [
        { type: 'p', text: 'Sujet : « Le mensonge est-il un bon ressort de comédie ? » Vous répondrez à cette question en vous appuyant sur *Le Menteur* de Corneille, sur le parcours « Mensonge et comédie » et sur vos lectures.' },
        { type: 'p', text: 'Proposez une problématique, un plan en trois parties avec exemples, et une conclusion.' },
      ],
      hints: ['Cherchez ce que le mensonge produit : quiproquos, rythme, révélation, morale.', 'Un bon dépassement : le mensonge comme métaphore du théâtre lui-même.'],
      solution: [
        { type: 'p', text: '**Problématique** : en quoi le mensonge, moteur d’intrigue et source de comique, révèle-t-il aussi les ambiguïtés de la comédie (morale, illusion) ?' },
        { type: 'list', ordered: true, items: [
          '**Un ressort efficace** : il engendre quiproquos et rebondissements (confusion des noms Clarice/Lucrèce, mariage supposé à Poitiers), cascade de mensonges qui accélère l’action, comique de situation et de caractère (Dorante pris à son propre piège), valet Cliton qui commente (aparté).',
          '**Un art de la parole et de l’illusion** : Dorante invente avec brio (la « collation » offerte sur l’eau) ; il est un auteur de fictions, donc un double du dramaturge ; le spectateur est complice (double énonciation) et goûte la virtuosité.',
          '**Un ressort qui engage une morale** : le dénouement punit le menteur (il doit épouser Lucrèce, qu’il n’aime pas) ; la comédie « corrige les mœurs en divertissant » ; mais le mensonge séduit, ce qui nuance la leçon ; comparaison avec *Tartuffe* (mensonge dangereux) ou *Le Jeu de l’amour et du hasard* (déguisement bénéfique).',
        ] },
        { type: 'p', text: '**Conclusion** : le mensonge est un excellent ressort parce qu’il touche à l’essence du théâtre : l’illusion partagée entre scène et salle.' },
      ],
    },
    {
      id: 'sarraute-dispute',
      title: 'Question de synthèse : Pour un oui ou pour un non',
      difficulty: 2,
      duration: 25,
      tags: ['Sarraute', 'parcours'],
      statement: [
        { type: 'p', text: 'En quoi *Pour un oui ou pour un non* est-elle une « pièce sur la dispute » et sur le langage ? Répondez en une quinzaine de lignes.' },
      ],
      hints: ['La cause de la dispute est minuscule : un ton, un silence.', 'Quel rôle jouent les tiers ?'],
      solution: [
        { type: 'p', text: 'Dans la pièce de Nathalie Sarraute, une dispute éclate entre deux amis de longue date pour une cause infime : une phrase (« C’est bien… ça ») prononcée avec une certaine intonation. Le conflit révèle que **les mots portent plus que leur sens** : ton, pause, insistance expriment des rapports de force et d’humiliation. Sarraute met ainsi en scène la **sous-conversation**, ce qui se joue sous les paroles.' },
        { type: 'p', text: 'La dispute est aussi **théâtralisée** : H2 prend des tiers (H3, la Femme) à témoin, comme un procès ; ces personnages jugent, comme le public. Le dialogue, fait d’interruptions, de reprises et de silences, devient un **duel verbal**. La pièce interroge donc la possibilité de se comprendre : le langage unit et sépare à la fois.' },
      ],
    },
    {
      id: 'mise-en-scene',
      title: 'Imaginer une mise en scène',
      difficulty: 2,
      duration: 25,
      tags: ['mise en scène'],
      statement: [
        { type: 'p', text: 'Choisissez une scène d’une des trois œuvres au programme. Décrivez en 10 lignes une mise en scène (espace, costumes, lumière, jeu) et justifiez votre choix par rapport au texte.' },
      ],
      hints: ['Que voulez-vous faire comprendre du texte ?', 'Pensez à l’espace : sobre, naturaliste, symbolique ?'],
      solution: [
        { type: 'p', text: '*Exemple pour Pour un oui ou pour un non* : espace presque nu, deux chaises et une table, lumière blanche et crue, costumes contemporains neutres pour souligner l’universalité du conflit. Les comédiens ne bougent presque pas au début pour concentrer l’attention sur la parole ; leur jeu s’accélère quand la dispute s’envenime. Les silences sont tenus, le public entend les « blancs » du texte. **Justification** : le texte est sans décor précis, personnages désignés par des lettres, et l’enjeu est la parole : l’épure scénique met en valeur la sous-conversation.' },
        { type: 'p', text: '*Pour Musset*, on peut au contraire choisir une scénographie fluide, avec le chœur des paysans en arrière-plan et un jardin stylisé ; pour *Corneille*, un décor de Paris XVIIe stylisé ou une actualisation contemporaine soulignant le goût du mensonge social (réseaux sociaux, par exemple).' },
      ],
    },
  ],

  // ───────────────────────── REPRÉSENTATIONS ─────────────────────────
  representations: [
    { type: 'h2', text: 'Frise : le théâtre du XVIIe au XXIe siècle' },
    {
      type: 'timeline',
      events: [
        { date: '1637', title: 'Le Cid', text: 'Corneille ; querelle du Cid' },
        { date: '1644', title: 'Le Menteur', text: 'Corneille, comédie en alexandrins' },
        { date: '1664', title: 'Tartuffe', text: 'Molière (première version, interdite ; version définitive en 1669)' },
        { date: '1677', title: 'Phèdre', text: 'Racine, tragédie' },
        { date: '1730', title: 'Le Jeu de l’amour et du hasard', text: 'Marivaux' },
        { date: '1784', title: 'Le Mariage de Figaro', text: 'Beaumarchais' },
        { date: '1827', title: 'Préface de Cromwell', text: 'Hugo, manifeste du drame romantique' },
        { date: '1830', title: 'Bataille d’Hernani', text: 'Victoire des romantiques à la Comédie-Française' },
        { date: '1834', title: 'On ne badine pas avec l’amour', text: 'Musset (publication ; première représentation en 1861)' },
        { date: '1950', title: 'La Cantatrice chauve', text: 'Ionesco, théâtre de l’absurde' },
        { date: '1953', title: 'En attendant Godot', text: 'Beckett' },
        { date: '1982', title: 'Pour un oui ou pour un non', text: 'Sarraute (publication)' },
      ],
    },
    { type: 'h2', text: 'Schéma : la structure dramatique classique' },
    {
      type: 'svg',
      caption: 'Courbe de la tension dramatique dans une pièce en cinq actes.',
      svg: `<svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <line x1="50" y1="230" x2="690" y2="230" stroke="currentColor" stroke-width="1.2"/>
  <line x1="50" y1="230" x2="50" y2="25" stroke="currentColor" stroke-width="1.2"/>
  <text x="14" y="130" fill="currentColor" transform="rotate(-90 14 130)" text-anchor="middle">Tension</text>
  <g stroke="currentColor" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.5">
    <line x1="178" y1="230" x2="178" y2="25"/><line x1="306" y1="230" x2="306" y2="25"/><line x1="434" y1="230" x2="434" y2="25"/><line x1="562" y1="230" x2="562" y2="25"/>
  </g>
  <polyline fill="none" stroke="hsl(217 91% 60%)" stroke-width="3" points="50,215 114,195 178,170 242,150 306,120 370,100 434,70 500,45 562,40 626,150 690,215"/>
  <g fill="hsl(25 95% 53%)">
    <circle cx="114" cy="195" r="4"/><circle cx="306" cy="120" r="4"/><circle cx="500" cy="45" r="4"/><circle cx="690" cy="215" r="4"/>
  </g>
  <g fill="currentColor" text-anchor="middle">
    <text x="114" y="252">Acte I</text><text x="242" y="252">Acte II</text><text x="370" y="252">Acte III</text><text x="498" y="252">Acte IV</text><text x="626" y="252">Acte V</text>
  </g>
  <g fill="currentColor" font-size="11">
    <text x="60" y="185">Exposition</text>
    <text x="196" y="108">Nœud</text>
    <text x="360" y="85" >Péripéties</text>
    <text x="510" y="30">Crise</text>
    <text x="620" y="135">Dénouement</text>
  </g>
</svg>`,
    },
    { type: 'h2', text: 'Compter un alexandrin' },
    {
      type: 'widget',
      id: 'syllable-counter',
      props: { verse: 'Qu’en un lieu, qu’en un jour, un seul fait accompli' },
      title: 'Compteur de syllabes',
      caption: 'Scande le vers de Boileau, puis essaie d’autres alexandrins du théâtre classique.',
    },
    { type: 'h2', text: 'Associe le terme et sa définition' },
    {
      type: 'matching',
      title: 'Vocabulaire du théâtre',
      pairs: [
        { left: 'Aparté', right: 'Parole entendue du public mais pas des autres personnages' },
        { left: 'Tirade', right: 'Longue réplique d’un personnage' },
        { left: 'Stichomythie', right: 'Échange de répliques brèves, vers à vers' },
        { left: 'Monologue', right: 'Personnage seul qui s’exprime' },
        { left: 'Didascalie', right: 'Indication scénique non prononcée' },
        { left: 'Double énonciation', right: 'Parole adressée à la fois au personnage et au public' },
        { left: 'Bienséance', right: 'Règle interdisant de montrer le violent ou l’indécent' },
      ],
    },
    {
      type: 'matching',
      title: 'Œuvres et auteurs',
      pairs: [
        { left: 'Le Menteur', right: 'Pierre Corneille' },
        { left: 'On ne badine pas avec l’amour', right: 'Alfred de Musset' },
        { left: 'Pour un oui ou pour un non', right: 'Nathalie Sarraute' },
        { left: 'Tartuffe', right: 'Molière' },
        { left: 'Hernani', right: 'Victor Hugo' },
        { left: 'En attendant Godot', right: 'Samuel Beckett' },
      ],
    },
    { type: 'h2', text: 'Texte à trous' },
    {
      type: 'cloze',
      title: 'Le théâtre classique',
      text: 'Les trois unités sont l’unité d’{{action}}, de {{temps}} et de {{lieu}}. La règle qui interdit de montrer la violence en scène est la {{bienséance}}. L’alexandrin compte {{12|douze}} syllabes. Les mots prononcés « à part » sont un {{aparté}}. Hugo expose les principes du drame romantique dans la préface de {{Cromwell}}.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Le Menteur de Corneille est une tragédie.', answer: false, explanation: 'C’est une comédie en cinq actes et en alexandrins (1644).' },
        { text: 'On ne badine pas avec l’amour est écrite en alexandrins.', answer: false, explanation: 'Elle est écrite en prose.' },
        { text: 'Un aparté est entendu des autres personnages.', answer: false, explanation: 'Il est entendu du seul public.' },
        { text: 'La double énonciation est propre au théâtre.', answer: true },
        { text: 'Sarraute fait partie du mouvement du nouveau roman.', answer: true },
        { text: 'La bataille d’Hernani a eu lieu en 1830.', answer: true },
      ],
    },
    { type: 'h2', text: 'QCM de révision' },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Quel est le parcours associé à Le Menteur ?',
          choices: ['Théâtre et dispute', 'Mensonge et comédie', 'Les jeux du cœur et de la parole', 'Dévoiler les rouages de la société'],
          answer: 1,
        },
        {
          question: 'Quel est le parcours associé à On ne badine pas avec l’amour ?',
          choices: ['Les jeux du cœur et de la parole', 'Mensonge et comédie', 'Théâtre et dispute', 'Émancipations créatrices'],
          answer: 0,
        },
        {
          question: 'Dans Pour un oui ou pour un non, les personnages principaux sont désignés par :',
          choices: ['Des prénoms antiques', 'Des lettres (H1, H2…)', 'Des titres nobiliaires', 'Des surnoms'],
          answer: 1,
        },
        {
          question: 'Quelle règle impose que l’action dure moins de 24 heures ?',
          choices: ['Unité de lieu', 'Unité de temps', 'Bienséance', 'Vraisemblance'],
          answer: 1,
        },
        {
          question: 'Quelle pièce de Ionesco date de 1950 ?',
          choices: ['Rhinocéros', 'Les Chaises', 'La Cantatrice chauve', 'Le Roi se meurt'],
          answer: 2,
          explanation: 'La Cantatrice chauve a été créée en 1950 ; Les Chaises en 1952 ; Rhinocéros en 1959.',
        },
        {
          question: 'Qu’est-ce qu’une stichomythie ?',
          choices: ['Un monologue en vers', 'Un échange de répliques brèves', 'Une indication scénique', 'Une tirade lyrique'],
          answer: 1,
        },
        {
          question: 'De quelle pièce espagnole Le Menteur est-il adapté ?',
          choices: ['Le Cid', 'La verdad sospechosa', 'Fuente Ovejuna', 'Don Juan'],
          answer: 1,
          explanation: 'La verdad sospechosa de Juan Ruiz de Alarcón (alors attribuée à Lope de Vega).',
        },
        {
          question: 'Quel est le manifeste du drame romantique ?',
          choices: ['L’Art poétique', 'La préface de Cromwell', 'La Poétique d’Aristote', 'Le Paradoxe sur le comédien'],
          answer: 1,
        },
      ],
    },
    { type: 'h2', text: 'Flashcards' },
    {
      type: 'flashcards',
      cards: [
        { front: 'Les trois unités', back: 'Action (une intrigue), temps (24 h), lieu (un seul).' },
        { front: 'Bienséance', back: 'Ne pas choquer le public : pas de violence ni de trivialité en scène.' },
        { front: 'Double énonciation', back: 'Les paroles s’adressent aux personnages et au spectateur.' },
        { front: 'Aparté', back: 'Réplique entendue du public seul.' },
        { front: 'Stichomythie', back: 'Répliques brèves vers à vers.' },
        { front: 'Catharsis', back: 'Purgation des passions (crainte, pitié) chez le spectateur de tragédie.' },
        { front: 'Le Menteur', back: 'Corneille, 1644, comédie en alexandrins ; parcours « Mensonge et comédie ».' },
        { front: 'On ne badine pas avec l’amour', back: 'Musset, 1834 (représentée en 1861) ; parcours « Les jeux du cœur et de la parole ».' },
        { front: 'Pour un oui ou pour un non', back: 'Sarraute, 1982 ; parcours « Théâtre et dispute » ; sous-conversation.' },
        { front: 'Drame romantique', back: 'Mélange sublime/grotesque, refus des unités de lieu et de temps (préface de Cromwell, 1827).' },
        { front: 'Théâtre de l’absurde', back: 'Ionesco, Beckett : crise du sens, dialogues déconstruits (années 1950).' },
        { front: 'Mise en scène', back: 'Ensemble des choix qui font passer le texte à la scène (espace, jeu, lumière, costumes).' },
      ],
    },
  ],
}

export default chapter
