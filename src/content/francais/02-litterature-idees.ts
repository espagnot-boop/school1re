import type { Chapter } from '../types'

const argumentSvg = `<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif">
  <text x="320" y="22" font-size="13" text-anchor="middle" fill="currentColor" font-weight="600">Argumenter : deux voies complémentaires</text>
  <rect x="250" y="40" width="140" height="44" fill="none" stroke="currentColor"/>
  <text x="320" y="60" font-size="12" text-anchor="middle" fill="currentColor">Thèse</text>
  <text x="320" y="75" font-size="10" text-anchor="middle" fill="currentColor" opacity="0.75">opinion défendue</text>
  <line x1="290" y1="84" x2="150" y2="120" stroke="currentColor"/>
  <line x1="350" y1="84" x2="490" y2="120" stroke="currentColor"/>
  <rect x="30" y="120" width="240" height="120" fill="hsl(217 91% 60%)" fill-opacity="0.12" stroke="hsl(217 91% 60%)"/>
  <text x="150" y="140" font-size="12" text-anchor="middle" fill="currentColor" font-weight="600">CONVAINCRE (raison)</text>
  <text x="44" y="162" font-size="11" fill="currentColor">• arguments logiques, exemples</text>
  <text x="44" y="180" font-size="11" fill="currentColor">• connecteurs, raisonnement</text>
  <text x="44" y="198" font-size="11" fill="currentColor">• registre didactique</text>
  <text x="44" y="216" font-size="11" fill="currentColor">• logos (Aristote)</text>
  <rect x="370" y="120" width="240" height="120" fill="hsl(0 84% 60%)" fill-opacity="0.12" stroke="hsl(0 84% 60%)"/>
  <text x="490" y="140" font-size="12" text-anchor="middle" fill="currentColor" font-weight="600">PERSUADER (émotions)</text>
  <text x="384" y="162" font-size="11" fill="currentColor">• pathos : pitié, indignation</text>
  <text x="384" y="180" font-size="11" fill="currentColor">• ethos : image de l’orateur</text>
  <text x="384" y="198" font-size="11" fill="currentColor">• ironie, satire, fiction</text>
  <text x="384" y="216" font-size="11" fill="currentColor">• registres pathétique, polémique</text>
</svg>`

const apologueSvg = `<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif">
  <text x="300" y="22" font-size="13" text-anchor="middle" fill="currentColor" font-weight="600">L’apologue : un récit au service d’une leçon</text>
  <rect x="30" y="50" width="240" height="80" fill="hsl(142 71% 45%)" fill-opacity="0.12" stroke="hsl(142 71% 45%)"/>
  <text x="150" y="76" font-size="12" text-anchor="middle" fill="currentColor">RÉCIT (le « corps »)</text>
  <text x="150" y="96" font-size="11" text-anchor="middle" fill="currentColor">fiction plaisante, personnages</text>
  <text x="150" y="114" font-size="11" text-anchor="middle" fill="currentColor">« plaire »</text>
  <line x1="270" y1="90" x2="330" y2="90" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="330,85 340,90 330,95" fill="currentColor"/>
  <rect x="340" y="50" width="230" height="80" fill="hsl(263 70% 60%)" fill-opacity="0.12" stroke="hsl(263 70% 60%)"/>
  <text x="455" y="76" font-size="12" text-anchor="middle" fill="currentColor">MORALE (l’« âme »)</text>
  <text x="455" y="96" font-size="11" text-anchor="middle" fill="currentColor">leçon explicite ou implicite</text>
  <text x="455" y="114" font-size="11" text-anchor="middle" fill="currentColor">« instruire »</text>
  <text x="300" y="160" font-size="11" text-anchor="middle" fill="currentColor" opacity="0.8">Formes : fable, conte philosophique, utopie, parabole, mythe, lettres fictives</text>
  <text x="300" y="180" font-size="11" text-anchor="middle" fill="currentColor" opacity="0.8">« plaire et instruire » (placere et docere, Horace)</text>
</svg>`

const chapter: Chapter = {
  id: 'litterature-idees',
  subject: 'francais',
  order: 2,
  title: 'La littérature d’idées du XVIe au XVIIIe siècle',
  theme: 'La littérature d’idées du XVIe au XVIIIe siècle',
  summary:
    'Humanisme, classicisme et Lumières ; formes de l’argumentation (essai, fable, conte philosophique, dialogue, lettres) et stratégies argumentatives ; œuvres au programme 2027 : La Boétie, Fontenelle, Graffigny.',
  duration: '6 semaines',
  objectives: [
    'Situer un texte argumentatif dans son contexte : humanisme, classicisme, Lumières',
    'Identifier la thèse, les arguments, les exemples et le circuit argumentatif',
    'Distinguer convaincre et persuader, argumentation directe et indirecte',
    'Reconnaître les formes (essai, discours, dialogue, fable, conte philosophique, lettre) et les registres',
    'Analyser les procédés de l’ironie, de la satire et de la polémique',
    'Connaître les œuvres au programme : La Boétie, Fontenelle, Graffigny',
  ],
  keywords: [
    'humanisme', 'classicisme', 'Lumières', 'essai', 'apologue', 'fable', 'conte philosophique', 'dialogue',
    'convaincre', 'persuader', 'ironie', 'La Boétie', 'Fontenelle', 'Graffigny',
  ],

  // ================================================================== FICHE
  fiche: [
    { type: 'h2', text: 'Œuvres au programme (bac 2027, voie générale)' },
    {
      type: 'table',
      headers: ['Œuvre', 'Parcours associé', 'À retenir'],
      rows: [
        ['Étienne de La Boétie, *Discours de la servitude volontaire* (écrit vers 1548, publié en 1576)', '« Défendre et entretenir la liberté »', 'Le tyran n’a de pouvoir que celui qu’on lui donne ; coutume, divertissements, réseau de complices'],
        ['Bernard Le Bouyer de Fontenelle, *Entretiens sur la pluralité des mondes* (1686)', '« Le goût de la science »', 'Dialogue galant avec une marquise ; vulgariser l’astronomie copernicienne ; esprit critique'],
        ['Françoise de Graffigny, *Lettres d’une Péruvienne* (1747 ; éd. augmentée 1752)', '« Un nouvel univers s’est offert à mes yeux »', 'Roman épistolaire ; regard étranger d’une Inca sur la France ; critique sociale, condition des femmes'],
      ],
      caption: 'Note de service du 4 juillet 2025, BO n° 30 du 24 juillet 2025 (programme reconduit de 2025-2026).',
    },
    { type: 'h2', text: 'Trois siècles, trois mouvements' },
    {
      type: 'table',
      headers: ['Mouvement', 'Idées', 'Auteurs'],
      rows: [
        ['**Humanisme** (XVIe)', 'Retour aux textes antiques, confiance en l’homme, éducation, tolérance, foi critique', 'Érasme, Rabelais, Montaigne, La Boétie'],
        ['**Classicisme** (XVIIe, surtout 1660-1685)', 'Raison, ordre, vraisemblance, bienséance, « plaire et instruire », moralistes', 'La Fontaine, Pascal, La Rochefoucauld, La Bruyère, Fontenelle (transition)'],
        ['**Lumières** (XVIIIe)', 'Raison critique, lutte contre l’obscurantisme, tolérance, liberté, bonheur, progrès', 'Montesquieu, Voltaire, Diderot, Rousseau, Graffigny'],
      ],
    },
    { type: 'h2', text: 'Les outils de l’argumentation' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Thèse / thèse adverse', value: 'Opinion défendue / opinion réfutée' },
        { key: 'Argument / exemple', value: 'Idée qui soutient la thèse / fait concret qui illustre ou prouve' },
        { key: 'Convaincre', value: 'Agir sur la raison (logos) : arguments, raisonnements, preuves' },
        { key: 'Persuader', value: 'Agir sur les sentiments (pathos) et par l’image de l’orateur (ethos)' },
        { key: 'Argumentation directe', value: 'Essai, discours, traité, lettre ouverte, dialogue d’idées' },
        { key: 'Argumentation indirecte', value: 'Apologue : fable, conte philosophique, utopie, roman épistolaire' },
        { key: 'Raisonnements', value: 'Déductif, inductif, par analogie, concessif, par l’absurde, a fortiori' },
        { key: 'Registres', value: 'Didactique, polémique, satirique, ironique, pathétique, épidictique (éloge/blâme)' },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'L’ironie, arme des Lumières',
      content: [{ type: 'p', text: 'Dire le contraire de ce qu’on pense pour le faire comprendre au lecteur complice : **antiphrase**, fausse naïveté, raisonnement absurde poussé à bout (Montesquieu, « De l’esclavage des nègres », 1748 ; Voltaire, *Candide*, 1759).' }],
    },
  ],

  // ================================================================== COURS
  cours: [
    { type: 'h2', text: '1. Qu’est-ce que la littérature d’idées ?' },
    { type: 'p', text: 'La littérature d’idées regroupe les textes dont la visée principale est d’**argumenter** : défendre une thèse, critiquer une institution, réfléchir sur l’homme, la société, le savoir, la religion, le pouvoir. Mais ce sont des textes **littéraires** : l’efficacité de l’idée tient à l’art de la dire (images, fiction, rythme, ironie). Le programme de Première couvre trois siècles décisifs, du XVIe au XVIIIe siècle, de la Renaissance à la veille de la Révolution française.' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Argumenter',
      content: [{ type: 'p', text: 'Argumenter, c’est chercher à **modifier l’opinion ou le comportement** d’un destinataire en lui présentant une **thèse** appuyée par des **arguments** et des **exemples**, en vue de le **convaincre** (par la raison) et/ou de le **persuader** (par les sentiments).' }],
    },

    { type: 'h2', text: '2. Le XVIe siècle : l’humanisme' },
    { type: 'h3', text: '2.1 Contexte' },
    { type: 'list', items: [
      '**L’imprimerie** (Gutenberg, vers 1450) diffuse les textes.',
      '**Les Grandes Découvertes** (Colomb, 1492) ouvrent l’horizon et posent la question de l’autre.',
      '**La redécouverte de l’Antiquité** grecque et latine, l’étude des textes originaux (philologie).',
      '**La révolution copernicienne** : *De revolutionibus* (1543) place le Soleil au centre.',
      '**La Réforme** (Luther, 1517) puis les **guerres de Religion** (1562-1598), jusqu’à l’édit de Nantes (1598).',
    ] },
    { type: 'p', text: 'L’**humanisme** est un mouvement intellectuel européen qui place l’**homme** au centre de la réflexion : il croit en sa dignité, en sa perfectibilité par l’**éducation**, prône le retour aux sources antiques et une foi plus personnelle, et défend la tolérance et la paix.' },
    { type: 'h3', text: '2.2 Auteurs et œuvres' },
    {
      type: 'list',
      items: [
        '**Érasme** (vers 1467 – 1536) : *Éloge de la folie* (1511), satire des théologiens et des puissants.',
        '**Thomas More** : *L’Utopie* (1516), invention du mot et du genre de l’utopie.',
        '**François Rabelais** (vers 1494 – 1553) : *Pantagruel* (1532), *Gargantua* (1534 ou 1535) ; la lettre de Gargantua à Pantagruel (« science sans conscience n’est que ruine de l’âme ») ; l’abbaye de Thélème et sa règle « Fais ce que voudras ».',
        '**Joachim Du Bellay** : *Défense et illustration de la langue française* (1549), manifeste de la Pléiade.',
        '**Étienne de La Boétie** (1530 – 1563) : *Discours de la servitude volontaire*.',
        '**Michel de Montaigne** (1533 – 1592) : *Essais* (1580, puis 1588, éd. posthume 1595).',
      ],
    },
    { type: 'h3', text: '2.3 Montaigne et l’invention de l’essai' },
    { type: 'p', text: 'Montaigne invente le genre de l’**essai** : un texte en prose, libre, subjectif, où l’auteur « essaie » son jugement sur les sujets les plus variés. « Ainsi, lecteur, je suis moi-même la matière de mon livre » (« Au lecteur »). Sa devise sceptique : « Que sais-je ? ». Dans « Des cannibales » (*Essais*, I, 31), il renverse le regard porté sur les Indiens du Brésil : « chacun appelle barbarie ce qui n’est pas de son usage ». En pédagogie, il préfère « une tête bien faite » à « une tête bien pleine » (I, 26).' },
    { type: 'p', text: 'Montaigne fut l’ami intime de La Boétie, mort en 1563. Il écrit de cette amitié : « Parce que c’était lui, parce que c’était moi » (« De l’amitié », I, 28).' },

    { type: 'h2', text: '3. Œuvre 1 — La Boétie, *Discours de la servitude volontaire* (parcours « Défendre et entretenir la liberté »)' },
    { type: 'h3', text: '3.1 Genèse et publication' },
    { type: 'p', text: 'Étienne de La Boétie naît à Sarlat en 1530 et meurt en 1563, conseiller au parlement de Bordeaux. Selon Montaigne, il aurait écrit le *Discours* très jeune, à « seize ans » (corrigé ensuite en « dix-huit »), donc vers **1546-1548**, peut-être après la répression sanglante de la révolte de la gabelle en Guyenne (1548). Le texte circule en manuscrit ; il est publié, sans l’accord de Montaigne, par des protestants : partiellement en **1574** (*Le Réveille-Matin des François*), puis intégralement en **1576** (*Mémoires de l’estat de France sous Charles IX*, recueil de Simon Goulart), où il devient un pamphlet contre la monarchie après la Saint-Barthélemy (1572). On l’appelle aussi le *Contr’un*.' },
    { type: 'h3', text: '3.2 La thèse : un paradoxe' },
    { type: 'p', text: 'La Boétie s’étonne : comment « tant d’hommes, tant de bourgs, tant de villes, tant de nations » peuvent-ils supporter un seul tyran, qui n’a de puissance que celle qu’on lui donne ? La **servitude** est **volontaire** : le peuple consent à son propre asservissement. Il suffirait donc de **ne plus obéir** pour être libre, sans même avoir à combattre.' },
    { type: 'quote', text: 'Soyez résolus de ne servir plus, et vous voilà libres.', author: 'La Boétie', source: '*Discours de la servitude volontaire* (orthographe modernisée)' },
    { type: 'p', text: 'Il poursuit par une image : il ne faut pas renverser le tyran, mais seulement cesser de le soutenir, « et vous le verrez, comme un grand colosse à qui on a dérobé sa base, de son poids même fondre en bas et se rompre ».' },
    { type: 'h3', text: '3.3 Les causes de la servitude' },
    {
      type: 'steps',
      items: [
        { title: 'La coutume', text: '« La première raison de la servitude volontaire, c’est la coutume » : les hommes nés sous le joug oublient la liberté, qui est pourtant naturelle (les animaux eux-mêmes la défendent).' },
        { title: 'Les divertissements', text: 'Les tyrans abêtissent le peuple par les jeux, théâtres, farces, festins (exemple de Cyrus et des Lydiens, des jeux romains) : c’est l’ancêtre du « du pain et des jeux ».' },
        { title: 'La religion et le prestige', text: 'Les tyrans se couvrent de religion, de légendes, de pouvoirs miraculeux pour se faire révérer.' },
        { title: 'La pyramide des complices', text: 'Le « ressort et le secret de la domination » : cinq ou six favoris tiennent le tyran, eux-mêmes en tiennent six cents, qui en tiennent six mille… chacun espère profiter de la tyrannie : le système repose sur l’intérêt de nombreux « tyranneaux ».' },
      ],
    },
    { type: 'h3', text: '3.4 Une argumentation humaniste' },
    {
      type: 'list',
      items: [
        '**Exemples antiques** très nombreux (Grecs, Romains, Perses), selon la culture humaniste.',
        '**Arguments par analogie** avec la nature (les animaux, le colosse, le feu qui s’éteint faute de bois).',
        '**Registre polémique et oratoire** : apostrophes au peuple (« Pauvres gens et misérables, peuples insensés »), questions rhétoriques, accumulations.',
        '**Éloge de l’amitié**, qui ne peut exister qu’entre égaux, alors que le tyran n’a que des complices.',
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Parcours « Défendre et entretenir la liberté »',
      content: [{ type: 'p', text: 'La liberté n’est pas acquise : il faut la **défendre** (contre le tyran) et l’**entretenir** (par l’éducation, l’amitié, la vigilance). Textes à rapprocher : Montaigne, Rabelais (Thélème), Montesquieu (*De l’esprit des lois*, séparation des pouvoirs, 1748), Rousseau (*Du contrat social*, 1762 : « L’homme est né libre, et partout il est dans les fers »), Diderot (article « Autorité politique » de l’*Encyclopédie* : « Aucun homme n’a reçu de la nature le droit de commander aux autres »), Kant (*Qu’est-ce que les Lumières ?*, 1784), voire Hugo ou la Déclaration des droits de l’homme et du citoyen (1789).' }],
    },

    { type: 'h2', text: '4. Le XVIIe siècle : classicisme et moralistes' },
    { type: 'h3', text: '4.1 Contexte et esthétique' },
    { type: 'p', text: 'Le XVIIe siècle est marqué par la monarchie absolue (Louis XIV règne personnellement de 1661 à 1715), la fondation de l’**Académie française** (1635, Richelieu), l’essor du rationalisme (Descartes, *Discours de la méthode*, 1637) et des sciences (Galilée condamné en 1633 ; Newton, *Principia*, 1687). Le **classicisme** valorise la raison, l’ordre, la clarté, la vraisemblance et la bienséance, avec une visée morale : **plaire et instruire**. Boileau en fixe les principes dans *L’Art poétique* (1674).' },
    { type: 'h3', text: '4.2 Les moralistes' },
    { type: 'p', text: 'Les moralistes observent les mœurs et la nature humaine, souvent avec pessimisme, dans des formes brèves.' },
    {
      type: 'table',
      headers: ['Auteur', 'Œuvre', 'Forme et idée'],
      rows: [
        ['La Rochefoucauld', '*Maximes* (1665)', 'Maximes : l’amour-propre derrière nos vertus (« Nos vertus ne sont, le plus souvent, que des vices déguisés », épigraphe)'],
        ['Pascal', '*Pensées* (posthume, 1670)', 'Fragments : misère et grandeur de l’homme, « roseau pensant » ; « Le cœur a ses raisons que la raison ne connaît point »'],
        ['La Fontaine', '*Fables* (1668, 1678-1679, 1694)', 'Apologue en vers : satire de la cour, des puissants, de la nature humaine'],
        ['La Bruyère', '*Les Caractères* (1688)', 'Portraits satiriques (Giton et Phédon, le riche et le pauvre)'],
      ],
    },
    { type: 'quote', text: 'L’homme n’est qu’un roseau, le plus faible de la nature ; mais c’est un roseau pensant.', author: 'Blaise Pascal', source: '*Pensées*' },
    { type: 'h3', text: '4.3 La fable, apologue classique' },
    { type: 'p', text: 'Jean de La Fontaine (1621 – 1695) reprend Ésope et Phèdre. La fable est un **apologue** : un court récit (le « corps ») au service d’une **morale** (l’« âme »), explicite ou implicite, placée au début ou à la fin. « Une morale nue apporte de l’ennui » (« Le Pâtre et le Lion », VI, 1) : la fiction rend la leçon agréable.' },
    { type: 'quote', text: 'La raison du plus fort est toujours la meilleure :\nNous l’allons montrer tout à l’heure.', author: 'Jean de La Fontaine', source: '« Le Loup et l’Agneau », *Fables*, I, 10 (1668)' },
    { type: 'p', text: 'La morale, placée en tête, est **ironique** : elle constate un fait (la loi du plus fort l’emporte) plutôt qu’elle ne l’approuve. Le dialogue montre l’Agneau réfuter avec logique chaque accusation du Loup, qui finit par l’emporter « Sans autre forme de procès » : la force triomphe du droit, critique de l’arbitraire du pouvoir.' },
    { type: 'svg', svg: apologueSvg, caption: 'Structure de l’apologue', maxWidth: 620 },

    { type: 'h2', text: '5. Œuvre 2 — Fontenelle, *Entretiens sur la pluralité des mondes* (parcours « Le goût de la science »)' },
    { type: 'h3', text: '5.1 L’auteur et l’œuvre' },
    { type: 'p', text: '**Bernard Le Bouyer de Fontenelle** (1657 – 1757), neveu de Corneille, mort presque centenaire, est secrétaire perpétuel de l’Académie des sciences (à partir de 1697). Il fait le lien entre l’âge classique et les Lumières. Dans les *Entretiens sur la pluralité des mondes* (**1686**), un philosophe (le narrateur) explique à une jeune et spirituelle **marquise**, au cours de **soirées** de promenade dans un parc, sous les étoiles, le système de **Copernic** (héliocentrisme), les **tourbillons** de Descartes, et la possibilité que d’autres planètes soient habitées. L’édition de 1686 compte cinq soirs ; un sixième est ajouté en 1687.' },
    {
      type: 'table',
      headers: ['Soir', 'Contenu principal'],
      rows: [
        ['1er', 'La Terre est une planète qui tourne sur elle-même et autour du Soleil'],
        ['2e', 'La Lune est une terre habitable'],
        ['3e', 'Particularités du monde de la Lune ; autres planètes peut-être habitées'],
        ['4e', 'Particularités des mondes de Vénus, Mercure, Mars, Jupiter et Saturne'],
        ['5e', 'Les étoiles fixes sont autant de soleils, chacun éclairant un monde'],
        ['6e (1687)', 'Nouvelles pensées confirmant les précédentes ; dernières découvertes'],
      ],
    },
    { type: 'h3', text: '5.2 Un art de la vulgarisation' },
    {
      type: 'list',
      items: [
        '**Le dialogue** : forme héritée de Platon et de Galilée (*Dialogue sur les deux grands systèmes du monde*, 1632) ; les questions de la marquise permettent d’avancer pas à pas.',
        '**Une destinataire féminine** : Fontenelle veut instruire un public mondain, non spécialiste, et notamment les femmes, exclues des collèges et universités.',
        '**La galanterie** : badinage, compliments, cadre nocturne et amoureux : la science se fait conversation plaisante (plaire et instruire).',
        '**Les comparaisons** : la nature comparée à l’opéra, dont le machiniste caché fait voler les acteurs ; le philosophe veut voir les « machines » ; les planètes comparées à des terres, les tourbillons à des remous.',
        '**L’esprit critique** : ne pas croire ce que montrent les sens (le Soleil semble tourner), se défier de l’autorité et des préjugés, accepter le doute ; l’homme n’est plus le centre du monde.',
      ],
    },
    { type: 'quote', text: 'Je me figure toujours que la nature est un grand spectacle qui ressemble à celui de l’Opéra.', author: 'Fontenelle', source: '*Entretiens sur la pluralité des mondes*, Premier soir' },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Parcours « Le goût de la science »',
      content: [{ type: 'p', text: 'Le « goût » désigne le plaisir de savoir et le jugement éclairé. À rapprocher : Rabelais (programme d’éducation encyclopédique), Montaigne, Descartes (*Discours de la méthode*), Pascal (expériences sur le vide), Cyrano de Bergerac (*L’Autre Monde*, posthume 1657), Voltaire (*Micromégas*, 1752 ; *Lettres philosophiques*, 1734, sur Newton), Émilie du Châtelet (traduction des *Principia* de Newton), l’*Encyclopédie* de Diderot et d’Alembert (1751-1772), Buffon (*Histoire naturelle*).' }],
    },

    { type: 'h2', text: '6. Le XVIIIe siècle : les Lumières' },
    { type: 'h3', text: '6.1 Un combat pour la raison' },
    { type: 'p', text: 'Les philosophes des **Lumières** veulent éclairer les hommes par la **raison** contre l’**obscurantisme**, le fanatisme religieux, l’intolérance, l’arbitraire du pouvoir absolu, la torture, l’esclavage. Ils croient au **progrès**, au bonheur terrestre et défendent la liberté d’expression. Kant résume : « *Sapere aude !* Aie le courage de te servir de ton propre entendement » (1784).' },
    {
      type: 'table',
      headers: ['Auteur', 'Œuvres', 'Combats'],
      rows: [
        ['Montesquieu (1689 – 1755)', '*Lettres persanes* (1721), *De l’esprit des lois* (1748)', 'Satire de la société française par le regard étranger ; séparation des pouvoirs ; ironie contre l’esclavage'],
        ['Voltaire (1694 – 1778)', '*Lettres philosophiques* (1734), *Zadig* (1747), *Micromégas* (1752), *Candide* (1759), *Traité sur la tolérance* (1763)', 'Tolérance (affaire Calas), contre le fanatisme et l’optimisme, « Écrasez l’infâme »'],
        ['Diderot (1713 – 1784)', '*Encyclopédie* (dir. avec d’Alembert, 1751-1772), *Supplément au Voyage de Bougainville* (écrit en 1772, publié en 1796)', 'Diffusion du savoir, critique de la morale chrétienne et de la colonisation'],
        ['Rousseau (1712 – 1778)', '*Discours sur l’origine de l’inégalité* (1755), *Du contrat social* (1762), *Émile* (1762)', 'Bonté naturelle, critique de la propriété, souveraineté du peuple'],
        ['Graffigny (1695 – 1758)', '*Lettres d’une Péruvienne* (1747)', 'Regard étranger, éducation et condition des femmes'],
      ],
    },
    { type: 'h3', text: '6.2 Le regard étranger et le conte philosophique' },
    { type: 'p', text: 'Pour contourner la **censure** et faire réfléchir le lecteur, les Lumières recourent au **regard éloigné** : un étranger (Persan, Huron, Tahitien, Péruvienne) découvre la France et en révèle l’absurdité par sa naïveté. Le **conte philosophique** (Voltaire) mêle fiction merveilleuse ou exotique, voyages, rythme rapide, personnages types et **ironie**, au service d’une réflexion.' },
    { type: 'quote', text: 'C’est à ce prix que vous mangez du sucre en Europe.', author: 'Voltaire', source: '*Candide*, chapitre 19 (1759), paroles de l’esclave de Surinam' },
    { type: 'quote', text: 'Il faut cultiver notre jardin.', author: 'Voltaire', source: '*Candide*, chapitre 30, dernière phrase' },
    { type: 'h3', text: '6.3 L’ironie de Montesquieu' },
    { type: 'p', text: 'Dans « De l’esclavage des nègres » (*De l’esprit des lois*, XV, 5, 1748), Montesquieu feint de justifier l’esclavage : « Si j’avais à soutenir le droit que nous avons eu de rendre les nègres esclaves, voici ce que je dirais ». Il énumère des « arguments » si absurdes, racistes ou cyniques qu’ils se discréditent d’eux-mêmes : « Le sucre serait trop cher, si l’on ne faisait travailler la plante qui le produit par des esclaves. » Le lecteur doit comprendre l’**antiphrase** : c’est un réquisitoire contre l’esclavage et ceux qui le défendent.' },

    { type: 'h2', text: '7. Œuvre 3 — Graffigny, *Lettres d’une Péruvienne* (parcours « Un nouvel univers s’est offert à mes yeux »)' },
    { type: 'h3', text: '7.1 L’autrice et le roman' },
    { type: 'p', text: '**Françoise de Graffigny** (1695 – 1758), née à Nancy, séparée d’un mari violent, vit de sa plume à Paris où elle tient salon. Les *Lettres d’une Péruvienne* (**1747**) sont l’un des plus grands succès du siècle ; l’édition de **1752**, augmentée, ajoute une « Introduction historique » sur les Incas et de nouvelles lettres.' },
    { type: 'p', text: 'Zilia, jeune princesse inca promise au futur Inca **Aza**, est enlevée du temple du Soleil lors de la conquête espagnole. Capturée ensuite par un vaisseau français, elle est conduite en France par l’officier **Déterville**, qui tombe amoureux d’elle. Elle écrit à Aza d’abord au moyen de **quipus** (cordelettes à nœuds), puis en français lorsqu’elle a appris la langue. Elle découvre la société française, ses mœurs, son luxe, son hypocrisie. Aza, finalement, la trahit en épousant une Espagnole. Zilia refuse cependant d’épouser Déterville : elle lui offre son **amitié** et choisit une vie **indépendante**, dans une maison à elle, en goûtant « le plaisir d’être ».' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Extrait au programme',
      content: [{ type: 'p', text: 'Le programme précise que l’œuvre se lit dans l’**édition de 1752**, en incluant l’**Introduction historique** et les **lettres XXVIII, XXIX, XXX et XXXIV** (textes ajoutés ou remaniés dans cette édition). Vérifiez l’édition utilisée en classe.' }],
    },
    { type: 'h3', text: '7.2 Une argumentation indirecte' },
    {
      type: 'list',
      items: [
        '**Le regard étranger** (comme dans les *Lettres persanes*) : Zilia décrit avec naïveté apparente ce que les Français ne voient plus ; l’étonnement devient critique.',
        '**Critique sociale** : vanité, politesse de façade, luxe, mépris des pauvres, importance de l’argent, superficialité des conversations (lettres XXVIII-XXX environ).',
        '**Condition des femmes** (lettre XXXIV, notamment) : éducation négligée des filles, réduites à plaire, mariage arrangé, dépendance ; Zilia dénonce cette contradiction d’une nation qui méprise les femmes tout en les flattant.',
        '**Critique de la colonisation** : la violence des Espagnols, la prétendue « barbarie » des Incas renversée.',
        '**Un roman sensible** : registre lyrique et pathétique, passion pour Aza, exil, solitude : l’émotion soutient la réflexion.',
        '**Une émancipation féminine** : Zilia apprend, lit, juge, et refuse finalement le mariage : figure d’une femme qui conquiert sa liberté intellectuelle.',
      ],
    },
    { type: 'p', text: 'Le titre du parcours, « Un nouvel univers s’est offert à mes yeux », reprend l’étonnement de l’héroïne devant le monde nouveau qu’elle découvre : la découverte de l’autre est aussi découverte de soi et apprentissage de la pensée critique.' },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Textes à rapprocher',
      content: [{ type: 'p', text: 'Montaigne, « Des cannibales » ; Montesquieu, *Lettres persanes* (1721) ; Voltaire, *L’Ingénu* (1767) ; Diderot, *Supplément au Voyage de Bougainville* ; Olympe de Gouges, *Déclaration des droits de la femme et de la citoyenne* (1791) ; Marivaux, *L’Île des esclaves* (1725).' }],
    },

    { type: 'h2', text: '8. Les formes de l’argumentation' },
    {
      type: 'table',
      headers: ['Forme', 'Caractéristiques', 'Exemples'],
      rows: [
        ['Essai', 'Prose libre, subjective, réflexion personnelle, digressions', 'Montaigne, *Essais*'],
        ['Discours', 'Texte oratoire adressé à un auditoire ; apostrophes, questions rhétoriques', 'La Boétie, *Discours de la servitude volontaire* ; Rousseau, *Discours*'],
        ['Traité', 'Exposé méthodique et complet d’une question', 'Voltaire, *Traité sur la tolérance*'],
        ['Dialogue', 'Échange entre personnages ; confrontation d’idées, maïeutique, vulgarisation', 'Fontenelle, *Entretiens* ; Diderot, *Supplément*'],
        ['Lettre (réelle ou fictive)', 'Destinataire, regard subjectif ; roman épistolaire', 'Montesquieu, *Lettres persanes* ; Graffigny'],
        ['Fable', 'Apologue en vers, animaux, morale', 'La Fontaine'],
        ['Conte philosophique', 'Récit bref, merveilleux, voyages, ironie', 'Voltaire, *Candide*, *Zadig*'],
        ['Utopie', 'Description d’une société idéale, critique implicite du réel', 'More, *L’Utopie* ; Rabelais, Thélème ; l’Eldorado de *Candide*'],
        ['Maxime, pensée, portrait', 'Formes brèves des moralistes', 'La Rochefoucauld, Pascal, La Bruyère'],
        ['Article d’encyclopédie, pamphlet', 'Diffusion du savoir, attaque violente', '*Encyclopédie*'],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Argumentation directe ou indirecte',
      content: [
        { type: 'list', items: ['**Directe** : l’auteur expose sa thèse explicitement (essai, discours, traité). Avantage : clarté, rigueur.', '**Indirecte** : l’auteur passe par une fiction (apologue) ; le lecteur doit déduire la leçon. Avantages : plaisir, accessibilité, contournement de la censure, participation active du lecteur.'] },
      ],
    },

    { type: 'h2', text: '9. Les stratégies argumentatives' },
    { type: 'h3', text: '9.1 Convaincre et persuader' },
    { type: 'p', text: 'Depuis Aristote (*Rhétorique*), on distingue trois moyens de preuve : le **logos** (la raison, les arguments), l’**ethos** (l’image que l’orateur donne de lui : compétence, sincérité, vertu) et le **pathos** (les émotions suscitées chez le destinataire). **Convaincre** relève du logos ; **persuader** de l’ethos et du pathos. Les grands textes combinent les deux.' },
    { type: 'svg', svg: argumentSvg, caption: 'Convaincre et persuader', maxWidth: 660 },
    { type: 'h3', text: '9.2 Les types d’arguments' },
    {
      type: 'table',
      headers: ['Argument', 'Principe', 'Exemple'],
      rows: [
        ['Par l’exemple', 'Un fait précis prouve la thèse', 'La Boétie cite les tyrans antiques'],
        ['D’autorité', 'S’appuyer sur une personne reconnue', 'Citer Aristote, la Bible, Homère'],
        ['Par analogie', 'Raisonner à partir d’une situation semblable', 'Le tyran = un colosse sans base ; la nature = un opéra'],
        ['A fortiori', '« À plus forte raison »', 'Si les bêtes défendent leur liberté, à plus forte raison les hommes'],
        ['Par l’absurde', 'Montrer que la thèse adverse mène à des conséquences absurdes', 'Montesquieu, « De l’esclavage des nègres »'],
        ['Ad hominem', 'Attaquer la personne plutôt que ses idées', 'Satire des théologiens chez Érasme'],
        ['Pragmatique', 'Juger par les conséquences', '« C’est à ce prix que vous mangez du sucre »'],
        ['Concession / réfutation', 'Admettre une part de la thèse adverse pour mieux la réfuter', '« certes… mais… »'],
      ],
    },
    { type: 'h3', text: '9.3 Les types de raisonnement' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Déductif', value: 'Du général au particulier (syllogisme : tous les hommes sont mortels, or Socrate est un homme, donc Socrate est mortel).' },
        { key: 'Inductif', value: 'Du particulier au général : on tire une loi d’exemples.' },
        { key: 'Analogique', value: 'On transpose ce qui est vrai d’un domaine à un autre.' },
        { key: 'Concessif', value: 'On concède avant d’objecter.' },
        { key: 'Dialectique', value: 'Thèse, antithèse, synthèse ; confrontation de points de vue (dialogue).' },
      ],
    },
    { type: 'h3', text: '9.4 Les registres' },
    {
      type: 'table',
      headers: ['Registre', 'But', 'Procédés'],
      rows: [
        ['Didactique', 'Enseigner, expliquer', 'Définitions, exemples, présent de vérité générale, connecteurs logiques'],
        ['Polémique', 'Attaquer violemment, combattre', 'Apostrophes, questions rhétoriques, hyperboles, vocabulaire péjoratif'],
        ['Satirique', 'Se moquer pour critiquer des mœurs, des institutions', 'Caricature, exagération, portrait'],
        ['Ironique', 'Faire entendre le contraire de ce qu’on dit', 'Antiphrase, fausse naïveté, euphémisme, décalage'],
        ['Pathétique', 'Émouvoir, susciter la pitié', 'Champ lexical de la souffrance, exclamations, hyperboles'],
        ['Épidictique', 'Faire l’éloge ou le blâme', 'Superlatifs, termes mélioratifs ou péjoratifs'],
        ['Lyrique', 'Exprimer les sentiments du sujet', 'Première personne, exclamations, images'],
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Repérer l’ironie',
      content: [
        { type: 'list', items: ['Décalage entre le ton et le contenu (ton léger pour une horreur).', 'Antiphrase : termes mélioratifs pour une réalité condamnable (« le droit que nous avons eu »).', 'Fausse logique : connecteurs rigoureux (« donc », « car ») pour un raisonnement absurde.', 'Exagération, naïveté feinte du narrateur ou du personnage.', 'Signaux du contexte : ce que l’auteur pense par ailleurs.'] },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Piège',
      content: [{ type: 'p', text: 'Ne pas prendre au pied de la lettre une phrase ironique : « La raison du plus fort est toujours la meilleure » n’est pas une approbation du Loup par La Fontaine, mais un constat amer.' }],
    },

    { type: 'h2', text: '10. Méthodes' },
    {
      type: 'steps',
      items: [
        { title: 'Identifier la situation d’argumentation', text: 'Qui parle ? À qui ? Dans quel contexte (censure, guerre, débat) ? Quelle forme ?' },
        { title: 'Dégager la thèse', text: 'Reformuler en une phrase ; repérer la thèse adverse éventuelle.' },
        { title: 'Reconstituer le raisonnement', text: 'Connecteurs, étapes, arguments, exemples, concessions.' },
        { title: 'Analyser les stratégies', text: 'Convaincre / persuader ; registres ; procédés (ironie, images, apostrophes).' },
        { title: 'Évaluer la portée', text: 'Pourquoi ce texte est-il efficace ? Quelle actualité ?' },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Dissertation sur la littérature d’idées',
      content: [{ type: 'p', text: 'Le sujet porte sur l’œuvre et le parcours. Il interroge souvent la **forme** (le plaisir de la fiction ou du dialogue sert-il l’idée ?), la **portée** (le texte est-il seulement critique ? propose-t-il des solutions ?) ou le **destinataire**. Chaque argument doit s’appuyer sur des passages précis de l’œuvre et des textes du parcours.' }],
    },
  ],

  // ================================================================== EXERCICES
  exercices: [
    {
      id: 'idees-ex1',
      title: 'Identifier les types d’arguments',
      difficulty: 1,
      duration: 15,
      tags: ['argumentation'],
      statement: [
        { type: 'p', text: 'Nommez le type d’argument ou de raisonnement employé.' },
        { type: 'list', ordered: true, items: [
          'Les bêtes mêmes se défendent quand on veut les enfermer ; à plus forte raison les hommes, doués de raison, devraient défendre leur liberté.',
          '« Le sucre serait trop cher, si l’on ne faisait travailler la plante qui le produit par des esclaves. » (Montesquieu)',
          'Comme le feu s’éteint quand on cesse de lui donner du bois, le tyran tombe quand on cesse de lui obéir.',
          'Aristote l’a dit : l’homme est un animal politique.',
        ] },
      ],
      hints: ['« À plus forte raison » est un indice.', 'Pour Montesquieu, pensez à l’ironie.'],
      solution: [
        { type: 'list', ordered: true, items: [
          '**Argument a fortiori** : si c’est vrai pour les bêtes, c’est d’autant plus vrai pour les hommes.',
          '**Argument pragmatique (économique)** utilisé **ironiquement** : en feignant de le soutenir, Montesquieu montre qu’on sacrifie des vies humaines au prix du sucre ; c’est un **raisonnement par l’absurde** qui condamne l’esclavage.',
          '**Argument par analogie** (comparaison avec le feu, image présente chez La Boétie).',
          '**Argument d’autorité** : on s’appuie sur le prestige d’Aristote.',
        ] },
      ],
    },
    {
      id: 'idees-ex2',
      title: 'Convaincre ou persuader ?',
      difficulty: 1,
      duration: 15,
      tags: ['stratégies'],
      statement: [
        { type: 'p', text: 'Pour chaque procédé, dites s’il vise d’abord à convaincre ou à persuader, et justifiez.' },
        { type: 'list', ordered: true, items: ['Une série d’exemples historiques précis', 'L’apostrophe « Pauvres gens et misérables, peuples insensés »', 'Un syllogisme', 'Le récit de la souffrance d’un esclave mutilé', 'L’auteur rappelle sa propre expérience et sa bonne foi'] },
      ],
      solution: [
        { type: 'list', ordered: true, items: [
          '**Convaincre** : les exemples sont des preuves qui s’adressent à la raison (logos).',
          '**Persuader** : apostrophe pathétique et polémique qui cherche à secouer le peuple, à l’indigner (pathos).',
          '**Convaincre** : raisonnement logique déductif.',
          '**Persuader** : le pathétique suscite pitié et indignation (Voltaire, *Candide*, ch. 19).',
          '**Persuader** par l’**ethos** : l’orateur inspire confiance en donnant une image fiable de lui-même.',
        ] },
      ],
    },
    {
      id: 'idees-ex3',
      title: 'Analyse d’une fable : « Le Loup et l’Agneau »',
      difficulty: 2,
      duration: 30,
      tags: ['La Fontaine', 'apologue'],
      statement: [
        { type: 'quote', text: 'La raison du plus fort est toujours la meilleure :\nNous l’allons montrer tout à l’heure.', author: 'La Fontaine', source: '*Fables*, I, 10' },
        { type: 'p', text: 'La fable s’achève ainsi : « Là-dessus, au fond des forêts / Le Loup l’emporte, et puis le mange, / Sans autre forme de procès. » Montrez comment La Fontaine critique l’abus de pouvoir.' },
      ],
      hints: ['Où est placée la morale ? Est-elle sérieuse ?', 'Le dialogue ressemble à un procès : qui a les meilleurs arguments ?', 'Que signifie « Sans autre forme de procès » ?'],
      solution: [
        { type: 'p', text: '**Une morale ironique en tête.** Placée au début, la morale annonce le dénouement ; le mot « raison » est à double sens (le raisonnement / avoir raison). La Fontaine ne dit pas que la force est juste : il constate amèrement qu’elle l’emporte.' },
        { type: 'p', text: '**Un faux procès.** Le dialogue prend la forme d’un procès : le Loup accuse (troubler son breuvage, médire de lui l’an passé), l’Agneau se défend par des arguments logiques et respectueux (il boit en aval, il n’était pas né). Chaque accusation est réfutée, mais le Loup, à court d’arguments, passe à une responsabilité collective (« Si ce n’est toi, c’est donc ton frère »).' },
        { type: 'p', text: '**La force contre le droit.** La chute est brutale : les verbes rapides « l’emporte, et puis le mange » et l’expression juridique « Sans autre forme de procès » montrent que la parole et la justice ne pèsent rien face à la force. Sous Louis XIV, la fable vise implicitement l’arbitraire des puissants : l’apologue permet une critique plaisante et prudente.' },
      ],
    },
    {
      id: 'idees-ex4',
      title: 'Les procédés de l’ironie chez Montesquieu',
      difficulty: 2,
      duration: 35,
      tags: ['Lumières', 'ironie'],
      statement: [
        { type: 'quote', text: 'Les peuples d’Europe ayant exterminé ceux de l’Amérique, ils ont dû mettre en esclavage ceux de l’Afrique, pour s’en servir à défricher tant de terres.\nLe sucre serait trop cher, si l’on ne faisait travailler la plante qui le produit par des esclaves.\nOn ne peut se mettre dans l’idée que Dieu, qui est un être très sage, ait mis une âme, surtout une âme bonne, dans un corps tout noir.', author: 'Montesquieu', source: '« De l’esclavage des nègres », *De l’esprit des lois*, XV, 5 (1748)' },
        { type: 'p', text: 'Relevez et analysez trois procédés ironiques. Quelle est la véritable thèse de Montesquieu ?' },
      ],
      hints: ['Observez les connecteurs logiques et ce qu’ils relient.', 'Que vaut un argument économique face à la vie humaine ?', 'Le dernier argument est-il rationnel ?'],
      solution: [
        { type: 'list', items: [
          '**Fausse logique** : « ayant exterminé… ils ont dû » présente un massacre comme une cause naturelle justifiant un second crime ; la nécessité (« ont dû ») est absurde et révèle un enchaînement de crimes.',
          '**Disproportion pragmatique** : le prix du sucre, un produit de luxe, est mis en balance avec la liberté humaine ; l’énormité de l’argument le discrédite.',
          '**Préjugé raciste et religieux** poussé à l’absurde : lier la couleur de peau à l’âme est une idée irrationnelle ; l’adverbe « surtout » et le superlatif « très sage » soulignent l’ironie.',
        ] },
        { type: 'p', text: 'En feignant de reprendre les arguments des esclavagistes, Montesquieu les fait parler eux-mêmes et révèle leur cynisme et leur bêtise : sa **véritable thèse** est la **condamnation de l’esclavage**. L’ironie exige un lecteur actif, complice, qui reconstruit l’antiphrase : c’est une stratégie typique des Lumières.' },
      ],
    },
    {
      id: 'idees-ex5',
      title: 'Plan de commentaire : la thèse de La Boétie',
      difficulty: 3,
      duration: 60,
      tags: ['La Boétie', 'commentaire', 'type bac'],
      statement: [
        { type: 'p', text: 'Dans le passage où La Boétie affirme : « Soyez résolus de ne servir plus, et vous voilà libres. Je ne veux pas que vous le poussiez ni l’ébranliez, mais seulement ne le soutenez plus, et vous le verrez, comme un grand colosse à qui on a dérobé sa base, de son poids même fondre en bas et se rompre », proposez une problématique et un plan de commentaire en deux ou trois parties.' },
      ],
      hints: ['Quelle est la solution proposée contre la tyrannie ? Est-elle violente ?', 'Étudiez l’impératif et l’adresse au peuple.', 'Analysez l’image du colosse.'],
      solution: [
        { type: 'p', text: '**Problématique** : comment La Boétie transforme-t-il un constat amer sur la servitude en un appel paradoxal à une libération non violente ?' },
        { type: 'h3', text: 'I. Un appel direct au peuple' },
        { type: 'list', items: ['A. L’impératif et l’adresse à la deuxième personne (« Soyez résolus », « ne le soutenez plus ») : registre oratoire, discours délibératif.', 'B. Une solution d’une simplicité déconcertante : la liberté dépend d’une décision (« résolus »), la construction « et vous voilà libres » exprime l’immédiateté.', 'C. La responsabilité rendue au peuple : la servitude est « volontaire », donc la liberté aussi.'] },
        { type: 'h3', text: 'II. Une libération sans violence' },
        { type: 'list', items: ['A. Le refus de la révolte armée : négation « Je ne veux pas que vous le poussiez ni l’ébranliez ».', 'B. Le pouvoir du tyran n’est qu’emprunté : il suffit de retirer son soutien.', 'C. Une idée moderne : on y a vu une anticipation de la désobéissance civile (Thoreau, Gandhi).'] },
        { type: 'h3', text: 'III. La force de l’image' },
        { type: 'list', items: ['A. La comparaison du colosse (statue antique) dont on « dérobe la base » : le tyran est grand en apparence mais fragile.', 'B. La gradation finale « fondre en bas et se rompre » : chute inéluctable, « de son poids même ».', 'C. Une argumentation qui allie convaincre (logique de l’analogie) et persuader (énergie de l’image et de l’appel).'] },
        { type: 'p', text: '**Conclusion** : La Boétie renverse le rapport de force : le peuple, qui se croit faible, est en réalité la source du pouvoir. Ce texte humaniste résonne avec le parcours « Défendre et entretenir la liberté » et avec Rousseau (*Du contrat social*).' },
      ],
    },
    {
      id: 'idees-ex6',
      title: 'Dissertation : La Boétie et la liberté',
      difficulty: 3,
      duration: 120,
      tags: ['La Boétie', 'dissertation', 'type bac'],
      statement: [
        { type: 'p', text: 'Sujet : « Le *Discours de la servitude volontaire* est-il seulement une dénonciation de la tyrannie ? » Vous répondrez en vous appuyant sur l’œuvre, sur les textes étudiés dans le parcours « Défendre et entretenir la liberté » et sur votre culture personnelle.' },
      ],
      hints: ['« Seulement » invite à montrer d’autres dimensions : analyse des causes, appel au peuple, réflexion sur la nature humaine, éloge de l’amitié.', 'Pensez au sens de « entretenir » dans le parcours.'],
      solution: [
        { type: 'p', text: '**Problématique** : le *Discours* se borne-t-il à accuser le tyran, ou propose-t-il une réflexion plus large sur la liberté et la responsabilité des hommes ?' },
        { type: 'h3', text: 'I. Une dénonciation virulente de la tyrannie' },
        { type: 'list', items: ['A. Le portrait du tyran : un homme seul, souvent lâche et « efféminé », qui ruine et opprime.', 'B. Un registre polémique : apostrophes au peuple, questions rhétoriques, accumulations des maux subis.', 'C. Les exemples antiques de tyrans (Néron, César) et de peuples asservis.'] },
        { type: 'h3', text: 'II. Mais surtout une analyse des mécanismes de la servitude' },
        { type: 'list', items: ['A. Le paradoxe central : c’est le peuple qui se donne au tyran ; la servitude est volontaire.', 'B. Les causes : coutume, divertissements, religion, pyramide des complices (« tyranneaux »).', 'C. Une critique qui vise les sujets autant que le maître : le texte responsabilise.'] },
        { type: 'h3', text: 'III. Un éloge de la liberté et un appel à l’entretenir' },
        { type: 'list', items: ['A. La liberté est naturelle (les animaux eux-mêmes la défendent) : un humanisme confiant.', 'B. La libération est possible par le simple refus d’obéir.', 'C. Entretenir la liberté : l’éducation, la lecture, la mémoire de la liberté (ceux qui « ont la tête bien faite »), l’amitié entre égaux. Prolongements : Montesquieu, Rousseau, Diderot, Kant, la Déclaration de 1789.'] },
        { type: 'p', text: '**Conclusion** : bien plus qu’un pamphlet, le *Discours* est une réflexion politique et morale sur le consentement à l’oppression. Sa portée universelle explique qu’il ait été relu à chaque époque de lutte pour la liberté.' },
      ],
    },
    {
      id: 'idees-ex7',
      title: 'Dissertation : Fontenelle et le goût de la science',
      difficulty: 3,
      duration: 120,
      tags: ['Fontenelle', 'dissertation', 'type bac'],
      statement: [
        { type: 'p', text: 'Sujet : « Dans les *Entretiens sur la pluralité des mondes*, le plaisir de la conversation nuit-il à la transmission du savoir ? »' },
      ],
      hints: ['Le badinage galant pourrait sembler frivole.', 'Mais la conversation permet d’adapter le savoir à la marquise.', 'Le plaisir est peut-être la condition même du goût de la science.'],
      solution: [
        { type: 'p', text: '**Problématique** : la forme galante et mondaine choisie par Fontenelle affaiblit-elle la rigueur scientifique, ou est-elle au contraire l’instrument d’une vulgarisation réussie ?' },
        { type: 'h3', text: 'I. Un plaisir qui peut sembler éloigner du savoir' },
        { type: 'list', items: ['A. Le cadre galant (parc, nuit, compliments) et les digressions badines.', 'B. Les simplifications et images (opéra, horloge) qui risquent l’approximation ; certaines hypothèses (habitants des planètes, tourbillons cartésiens) sont aujourd’hui fausses.', 'C. Le savoir semble un divertissement mondain.'] },
        { type: 'h3', text: 'II. Un plaisir au service de la transmission' },
        { type: 'list', items: ['A. Le dialogue progressif : questions et objections de la marquise, méthode pédagogique.', 'B. Les comparaisons rendent concret l’abstrait.', 'C. Un public élargi : les femmes et les mondains, exclus du savoir savant.'] },
        { type: 'h3', text: 'III. Le plaisir comme condition du goût de la science' },
        { type: 'list', items: ['A. Faire naître le goût, c’est-à-dire la curiosité et l’envie d’apprendre : la marquise devient une véritable interlocutrice.', 'B. Former l’esprit critique : se défier des sens, des préjugés, de l’anthropocentrisme.', 'C. Héritage : plaire et instruire classique, puis Voltaire (*Micromégas*), l’*Encyclopédie* ; aujourd’hui la médiation scientifique.'] },
        { type: 'p', text: '**Conclusion** : loin de nuire au savoir, le plaisir de la conversation en est le véhicule ; Fontenelle fait de la science une aventure de l’esprit accessible à tous, annonçant les Lumières.' },
      ],
    },
    {
      id: 'idees-ex8',
      title: 'Dissertation : Graffigny et le regard étranger',
      difficulty: 3,
      duration: 120,
      tags: ['Graffigny', 'dissertation', 'type bac'],
      statement: [
        { type: 'p', text: 'Sujet : « Les *Lettres d’une Péruvienne* ne sont-elles qu’un roman sentimental ? » Vous appuierez votre réflexion sur l’œuvre et sur le parcours « Un nouvel univers s’est offert à mes yeux ».' },
      ],
      hints: ['Le roman raconte une histoire d’amour : Zilia et Aza.', 'Mais le regard de Zilia porte une critique de la société.', 'Le dénouement est-il sentimental ?'],
      solution: [
        { type: 'p', text: '**Problématique** : l’histoire d’amour de Zilia est-elle l’essentiel du roman, ou le support d’une réflexion critique sur la société et la condition des femmes ?' },
        { type: 'h3', text: 'I. Un roman sentimental' },
        { type: 'list', items: ['A. La passion pour Aza, destinataire des lettres : lyrisme, fidélité, désespoir.', 'B. Le pathétique de l’exil, de l’enlèvement, de la solitude.', 'C. Le triangle amoureux avec Déterville ; la trahison d’Aza.'] },
        { type: 'h3', text: 'II. Un roman d’idées par le regard étranger' },
        { type: 'list', items: ['A. Le procédé du regard éloigné (hérité des *Lettres persanes*) : la naïveté de Zilia révèle les absurdités françaises.', 'B. Critique sociale : luxe, vanité, hypocrisie, politesse vide.', 'C. Critique de la colonisation et de la prétendue supériorité européenne.'] },
        { type: 'h3', text: 'III. Un roman de l’émancipation' },
        { type: 'list', items: ['A. Critique de l’éducation des femmes et de leur condition (lettre XXXIV).', 'B. Apprendre à lire et à écrire, accéder au savoir : le « nouvel univers » est aussi celui de la pensée.', 'C. Un dénouement anti-romanesque : Zilia refuse le mariage, choisit l’amitié et l’indépendance, « le plaisir d’être ».'] },
        { type: 'p', text: '**Conclusion** : le sentiment n’est pas un ornement mais le moteur de la critique : en émouvant, Graffigny fait réfléchir. Le roman sentimental devient un roman philosophique et une œuvre féministe avant la lettre.' },
      ],
    },
  ],

  // ================================================================== REPRÉSENTATIONS
  representations: [
    {
      type: 'timeline',
      events: [
        { date: '1511', title: 'Érasme, *Éloge de la folie*' },
        { date: '1516', title: 'More, *L’Utopie*' },
        { date: '1532', title: 'Rabelais, *Pantagruel*' },
        { date: 'v. 1548', title: 'La Boétie écrit le *Discours de la servitude volontaire*', text: 'Publié intégralement en 1576.' },
        { date: '1580', title: 'Montaigne, *Essais* (livres I et II)' },
        { date: '1637', title: 'Descartes, *Discours de la méthode*' },
        { date: '1665', title: 'La Rochefoucauld, *Maximes*' },
        { date: '1668', title: 'La Fontaine, *Fables* (premier recueil)' },
        { date: '1670', title: 'Pascal, *Pensées* (posthume)' },
        { date: '1686', title: 'Fontenelle, *Entretiens sur la pluralité des mondes*' },
        { date: '1688', title: 'La Bruyère, *Les Caractères*' },
        { date: '1721', title: 'Montesquieu, *Lettres persanes*' },
        { date: '1747', title: 'Graffigny, *Lettres d’une Péruvienne*', text: 'Édition augmentée en 1752.' },
        { date: '1748', title: 'Montesquieu, *De l’esprit des lois*' },
        { date: '1751', title: 'Premier volume de l’*Encyclopédie*' },
        { date: '1759', title: 'Voltaire, *Candide*' },
        { date: '1762', title: 'Rousseau, *Du contrat social*' },
        { date: '1789', title: 'Déclaration des droits de l’homme et du citoyen' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer auteurs et œuvres',
      pairs: [
        { left: 'La Boétie', right: '*Discours de la servitude volontaire*' },
        { left: 'Montaigne', right: '*Essais*' },
        { left: 'Rabelais', right: '*Gargantua*' },
        { left: 'La Fontaine', right: '*Fables*' },
        { left: 'Pascal', right: '*Pensées*' },
        { left: 'Fontenelle', right: '*Entretiens sur la pluralité des mondes*' },
        { left: 'Montesquieu', right: '*Lettres persanes*' },
        { left: 'Graffigny', right: '*Lettres d’une Péruvienne*' },
        { left: 'Voltaire', right: '*Candide*' },
        { left: 'Rousseau', right: '*Du contrat social*' },
      ],
    },
    {
      type: 'qcm',
      questions: [
        { question: 'Persuader, c’est agir principalement sur :', choices: ['la raison', 'les émotions', 'la mémoire', 'la logique'], answer: 1, explanation: 'Persuader relève du pathos (et de l’ethos) ; convaincre du logos.' },
        { question: 'Un apologue est :', choices: ['un éloge funèbre', 'un récit à visée morale ou argumentative', 'un traité scientifique', 'un poème lyrique'], answer: 1, explanation: 'Fable, conte philosophique, utopie… : la fiction au service d’une leçon.' },
        { question: 'Selon La Boétie, la « première raison de la servitude volontaire » est :', choices: ['la peur', 'la coutume', 'la religion', 'la pauvreté'], answer: 1, explanation: 'Les hommes nés serfs s’habituent à la servitude.' },
        { question: 'L’interlocutrice du philosophe dans les *Entretiens* de Fontenelle est :', choices: ['une reine', 'une marquise', 'une religieuse', 'une paysanne'], answer: 1, explanation: 'Une marquise curieuse et spirituelle, lors de soirées dans un parc.' },
        { question: 'Zilia écrit d’abord ses lettres au moyen de :', choices: ['hiéroglyphes', 'quipus', 'tablettes de cire', 'parchemins'], answer: 1, explanation: 'Cordelettes nouées utilisées par les Incas.' },
        { question: 'Le système défendu par Fontenelle place au centre :', choices: ['la Terre', 'la Lune', 'le Soleil', 'Jupiter'], answer: 2, explanation: 'Héliocentrisme de Copernic (1543).' },
        { question: '« Il faut cultiver notre jardin » conclut :', choices: ['*Zadig*', '*Candide*', '*Micromégas*', '*L’Ingénu*'], answer: 1, explanation: 'Dernière phrase de *Candide* (1759).' },
        { question: 'Le registre qui cherche à attaquer violemment un adversaire est :', choices: ['didactique', 'lyrique', 'polémique', 'épidictique'], answer: 2, explanation: 'Du grec *polemos*, la guerre.' },
        { question: 'L’argument « à plus forte raison » est un argument :', choices: ['d’autorité', 'a fortiori', 'ad hominem', 'par l’exemple'], answer: 1 },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Humanisme', back: 'XVIe s. : retour aux Anciens, confiance en l’homme, éducation, tolérance (Érasme, Rabelais, Montaigne).' },
        { front: 'Classicisme', back: 'XVIIe s. : raison, ordre, vraisemblance, bienséance, « plaire et instruire ».' },
        { front: 'Lumières', back: 'XVIIIe s. : raison critique contre l’obscurantisme, tolérance, liberté, progrès.' },
        { front: 'Essai', back: 'Genre inventé par Montaigne : réflexion libre, subjective, en prose.' },
        { front: 'Apologue', back: 'Récit fictif à visée argumentative (fable, conte philosophique, utopie).' },
        { front: 'Logos / ethos / pathos', back: 'Raison / image de l’orateur / émotions (Aristote).' },
        { front: 'Antiphrase', back: 'Dire le contraire de ce qu’on pense : base de l’ironie.' },
        { front: 'Regard éloigné', back: 'Procédé consistant à faire décrire une société par un étranger naïf (Montesquieu, Graffigny, Voltaire).' },
        { front: 'Servitude volontaire', back: 'La Boétie : les peuples consentent à leur asservissement ; il suffit de ne plus servir pour être libres.' },
        { front: 'Pyramide des « tyranneaux »', back: 'Le tyran est soutenu par 5 ou 6 favoris, qui en tiennent 600, qui en tiennent 6 000…' },
        { front: 'Entretiens sur la pluralité des mondes', back: 'Fontenelle, 1686 : dialogue galant vulgarisant l’astronomie (Copernic, Descartes).' },
        { front: 'Lettres d’une Péruvienne', back: 'Graffigny, 1747/1752 : Zilia, princesse inca, découvre la France et choisit l’indépendance.' },
        { front: 'Argument a fortiori', back: 'Ce qui vaut dans un cas vaut à plus forte raison dans un cas plus évident.' },
        { front: 'Registre épidictique', back: 'Éloge ou blâme.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter le cours',
      text: 'Le *Discours de la servitude volontaire* de {{La Boétie}} affirme : « Soyez résolus de ne {{servir}} plus, et vous voilà {{libres}}. » Les *Entretiens sur la pluralité des mondes* de {{Fontenelle}} paraissent en {{1686}} ; le philosophe y instruit une {{marquise}}. Dans les *Lettres d’une Péruvienne* ({{1747}}), Zilia écrit à {{Aza}}. Convaincre fait appel à la {{raison}} ; persuader aux {{émotions|sentiments}}.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'La Boétie appelle le peuple à prendre les armes contre le tyran.', answer: false, explanation: 'Il suffit de ne plus le soutenir : « Je ne veux pas que vous le poussiez ni l’ébranliez ».' },
        { text: 'Fontenelle défend le système de Ptolémée.', answer: false, explanation: 'Il vulgarise le système de Copernic (héliocentrisme).' },
        { text: 'À la fin du roman, Zilia épouse Déterville.', answer: false, explanation: 'Elle refuse et lui propose son amitié, choisissant l’indépendance.' },
        { text: 'Montaigne et La Boétie étaient amis.', answer: true, explanation: '« Parce que c’était lui, parce que c’était moi. »' },
        { text: 'Dans « Le Loup et l’Agneau », la morale est placée au début.', answer: true },
        { text: 'L’*Encyclopédie* est dirigée par Diderot et d’Alembert.', answer: true },
      ],
    },
    {
      type: 'ordering',
      title: 'Remettre les œuvres dans l’ordre chronologique',
      items: ['*Gargantua* (Rabelais)', '*Essais* (Montaigne)', '*Fables* (La Fontaine)', '*Entretiens sur la pluralité des mondes* (Fontenelle)', '*Lettres persanes* (Montesquieu)', '*Lettres d’une Péruvienne* (Graffigny)', '*Candide* (Voltaire)'],
    },
    {
      type: 'reveal',
      title: 'Révéler : pourquoi l’argumentation indirecte ?',
      content: [
        { type: 'list', items: ['**Plaire pour instruire** : la fiction rend la leçon agréable et mémorable.', '**Contourner la censure** : la critique est déguisée (Orient, pays lointains, animaux).', '**Rendre le lecteur actif** : il doit déduire la leçon, comprendre l’ironie.', '**Universaliser** : les personnages types valent pour tous les temps.'] },
      ],
    },
  ],
}

export default chapter
