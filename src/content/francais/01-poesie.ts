import type { Chapter } from '../types'

const timelineSvg = `<svg viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif">
  <line x1="20" y1="120" x2="740" y2="120" stroke="currentColor" stroke-width="1.5"/>
  <g font-size="11" fill="currentColor">
    <line x1="40" y1="114" x2="40" y2="126" stroke="currentColor"/><text x="40" y="142" text-anchor="middle">1800</text>
    <line x1="208" y1="114" x2="208" y2="126" stroke="currentColor"/><text x="208" y="142" text-anchor="middle">1850</text>
    <line x1="376" y1="114" x2="376" y2="126" stroke="currentColor"/><text x="376" y="142" text-anchor="middle">1900</text>
    <line x1="544" y1="114" x2="544" y2="126" stroke="currentColor"/><text x="544" y="142" text-anchor="middle">1950</text>
    <line x1="712" y1="114" x2="712" y2="126" stroke="currentColor"/><text x="712" y="142" text-anchor="middle">2000</text>
  </g>
  <rect x="107" y="60" width="134" height="40" fill="hsl(217 91% 60%)" fill-opacity="0.18" stroke="hsl(217 91% 60%)"/>
  <text x="174" y="78" font-size="12" text-anchor="middle" fill="currentColor">Romantisme</text>
  <text x="174" y="93" font-size="10" text-anchor="middle" fill="currentColor">1820 – 1850</text>
  <rect x="215" y="160" width="134" height="40" fill="hsl(25 95% 53%)" fill-opacity="0.18" stroke="hsl(25 95% 53%)"/>
  <text x="282" y="178" font-size="12" text-anchor="middle" fill="currentColor">Parnasse</text>
  <text x="282" y="193" font-size="10" text-anchor="middle" fill="currentColor">1852 – 1890</text>
  <rect x="245" y="10" width="190" height="40" fill="hsl(263 70% 60%)" fill-opacity="0.18" stroke="hsl(263 70% 60%)"/>
  <text x="340" y="28" font-size="12" text-anchor="middle" fill="currentColor">Baudelaire → Symbolisme</text>
  <text x="340" y="43" font-size="10" text-anchor="middle" fill="currentColor">1857 – 1900 (manifeste 1886)</text>
  <rect x="430" y="60" width="140" height="40" fill="hsl(0 84% 60%)" fill-opacity="0.18" stroke="hsl(0 84% 60%)"/>
  <text x="500" y="78" font-size="12" text-anchor="middle" fill="currentColor">Surréalisme</text>
  <text x="500" y="93" font-size="10" text-anchor="middle" fill="currentColor">1924 – 1966</text>
  <rect x="540" y="160" width="200" height="40" fill="hsl(142 71% 45%)" fill-opacity="0.18" stroke="hsl(142 71% 45%)"/>
  <text x="640" y="178" font-size="12" text-anchor="middle" fill="currentColor">Poésie contemporaine</text>
  <text x="640" y="193" font-size="10" text-anchor="middle" fill="currentColor">Ponge, Char, Oulipo, Dorion…</text>
  <rect x="376" y="160" width="100" height="40" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>
  <text x="426" y="178" font-size="12" text-anchor="middle" fill="currentColor">Apollinaire</text>
  <text x="426" y="193" font-size="10" text-anchor="middle" fill="currentColor">Alcools, 1913</text>
</svg>`

const sonnetSvg = `<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif">
  <text x="20" y="22" font-size="13" fill="currentColor" font-weight="600">Le sonnet « régulier » français (14 vers)</text>
  <rect x="20" y="36" width="230" height="110" fill="hsl(217 91% 60%)" fill-opacity="0.12" stroke="hsl(217 91% 60%)"/>
  <text x="30" y="56" font-size="12" fill="currentColor">Quatrain 1</text>
  <text x="30" y="76" font-size="12" fill="currentColor">A — B — B — A</text>
  <text x="30" y="106" font-size="12" fill="currentColor">Quatrain 2</text>
  <text x="30" y="126" font-size="12" fill="currentColor">A — B — B — A</text>
  <text x="130" y="96" font-size="10" fill="currentColor" opacity="0.75">mêmes rimes</text>
  <rect x="270" y="36" width="230" height="110" fill="hsl(25 95% 53%)" fill-opacity="0.12" stroke="hsl(25 95% 53%)"/>
  <text x="280" y="56" font-size="12" fill="currentColor">Tercet 1</text>
  <text x="280" y="76" font-size="12" fill="currentColor">C — C — D</text>
  <text x="280" y="106" font-size="12" fill="currentColor">Tercet 2</text>
  <text x="280" y="126" font-size="12" fill="currentColor">E — E — D  (ou E — D — E)</text>
  <line x1="250" y1="91" x2="270" y2="91" stroke="currentColor" stroke-dasharray="3 3"/>
  <text x="20" y="176" font-size="12" fill="currentColor">• Quatrains : exposition, situation, thème.</text>
  <text x="20" y="198" font-size="12" fill="currentColor">• Passage quatrains → tercets : « volta », changement de ton ou de point de vue.</text>
  <text x="20" y="220" font-size="12" fill="currentColor">• Dernier vers = « chute » : pointe, surprise, révélation (ex. « Le Dormeur du val »).</text>
  <text x="20" y="250" font-size="11" fill="currentColor" opacity="0.75">Origine : Pétrarque (Italie, XIVe s.) ; acclimaté en France par Marot, la Pléiade (Ronsard, Du Bellay).</text>
  <text x="20" y="270" font-size="11" fill="currentColor" opacity="0.75">Au XIXe s., Baudelaire, Verlaine, Rimbaud, Heredia le pratiquent et le subvertissent.</text>
</svg>`

const chapter: Chapter = {
  id: 'poesie',
  subject: 'francais',
  order: 1,
  title: 'La poésie du XIXe au XXIe siècle',
  theme: 'La poésie du XIXe au XXIe siècle',
  summary:
    'Histoire du genre poétique du romantisme à la poésie contemporaine, versification, figures de style, méthode d’analyse et œuvres au programme du bac 2027 (Rimbaud, Ponge, Dorion).',
  duration: '6 à 7 semaines',
  objectives: [
    'Situer un poème dans l’histoire du genre (romantisme, Parnasse, symbolisme, surréalisme, poésie contemporaine)',
    'Analyser la versification : mètre, rimes, strophes, formes fixes, vers libre, poème en prose',
    'Identifier et interpréter les figures de style et les effets sonores',
    'Mener une explication linéaire et un commentaire de poème',
    'Construire une dissertation sur une œuvre intégrale au programme et son parcours associé',
    'Connaître les œuvres au programme : Rimbaud, Ponge, Dorion',
  ],
  keywords: [
    'alexandrin', 'césure', 'diérèse', 'sonnet', 'vers libre', 'poème en prose', 'romantisme', 'Parnasse',
    'symbolisme', 'surréalisme', 'Rimbaud', 'Cahier de Douai', 'Ponge', 'Dorion', 'figures de style',
  ],

  // ================================================================== FICHE
  fiche: [
    { type: 'h2', text: 'Œuvres au programme (bac 2027, voie générale)' },
    {
      type: 'table',
      headers: ['Œuvre', 'Parcours associé', 'À retenir'],
      rows: [
        ['Arthur Rimbaud, *Cahier de Douai* (22 poèmes, 1870)', '« Émancipations créatrices »', 'Révolte adolescente, fugues, liberté, satire politique et religieuse, sonnets subvertis'],
        ['Francis Ponge, *La rage de l’expression* (1952)', '« Dans l’atelier du poète »', 'Brouillons publiés, recherche de l’expression juste, poésie de l’objet, prose'],
        ['Hélène Dorion, *Mes forêts* (2021)', '« La poésie, la nature, l’intime »', 'Forêt intérieure, écopoésie, vers libre, fragilité du vivant et de soi'],
      ],
      caption: 'Note de service du 4 juillet 2025, BO n° 30 du 24 juillet 2025 — le professeur choisit une œuvre.',
    },
    { type: 'h2', text: 'Les grands mouvements' },
    {
      type: 'table',
      headers: ['Mouvement', 'Dates', 'Auteurs / œuvres', 'Idées clés'],
      rows: [
        ['Romantisme', '1820 – 1850', 'Lamartine (*Méditations poétiques*, 1820), Hugo (*Les Contemplations*, 1856), Musset, Vigny', 'Lyrisme, moi, nature confidente, fuite du temps, poète mage'],
        ['Parnasse', '1852 – 1890', 'Gautier (*Émaux et Camées*, 1852), Leconte de Lisle, Heredia (*Les Trophées*, 1893)', 'L’art pour l’art, impersonnalité, perfection formelle'],
        ['Baudelaire', '1857', '*Les Fleurs du mal* (1857), *Le Spleen de Paris* (1869)', 'Spleen et Idéal, modernité, beauté du laid, correspondances'],
        ['Symbolisme', '1886 – 1900', 'Verlaine, Rimbaud, Mallarmé ; manifeste de Moréas (1886)', 'Suggérer plutôt que nommer, musicalité, monde des symboles'],
        ['Surréalisme', '1924 – 1966', 'Breton (*Manifeste*, 1924), Éluard, Aragon, Desnos', 'Inconscient, rêve, écriture automatique, images insolites'],
        ['Contemporain', 'après 1945', 'Ponge, Char, Prévert, Césaire, Bonnefoy, Jaccottet, Oulipo, Dorion', 'Poésie de l’objet, du quotidien, engagement, jeux formels, écopoésie'],
      ],
    },
    { type: 'h2', text: 'Versification express' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Alexandrin', value: '12 syllabes, deux hémistiches de 6 séparés par la césure (6//6)' },
        { key: 'Décasyllabe / octosyllabe', value: '10 syllabes (souvent 4//6) / 8 syllabes' },
        { key: 'E muet', value: 'Compté devant consonne ; élidé devant voyelle ou h muet ; jamais compté en fin de vers' },
        { key: 'Diérèse / synérèse', value: 'Diérèse : deux voyelles en deux syllabes (*nu-ées*) ; synérèse : en une (*pi-liers*)' },
        { key: 'Disposition des rimes', value: 'Suivies AABB, croisées ABAB, embrassées ABBA' },
        { key: 'Richesse', value: 'Pauvre (1 son commun), suffisante (2), riche (3 ou plus)' },
        { key: 'Genre des rimes', value: 'Féminine (finit par un e muet), masculine (sinon) ; alternance obligatoire en poésie classique' },
        { key: 'Enjambement, rejet, contre-rejet', value: 'La phrase déborde sur le vers suivant ; rejet = mot bref rejeté au vers suivant ; contre-rejet = mot bref annonçant la suite en fin de vers' },
        { key: 'Sonnet', value: '2 quatrains + 2 tercets, ABBA ABBA CCD EED (ou EDE) ; dernier vers = chute' },
        { key: 'Vers libre / poème en prose', value: 'Vers sans mètre ni rime fixes / poésie sans vers (Bertrand, Baudelaire, Rimbaud, Ponge)' },
      ],
    },
    { type: 'h2', text: 'Figures de style indispensables' },
    {
      type: 'table',
      headers: ['Famille', 'Figures'],
      rows: [
        ['Analogie', 'comparaison, métaphore (filée), personnification, allégorie'],
        ['Substitution', 'métonymie, synecdoque, périphrase, euphémisme, litote, antiphrase'],
        ['Opposition', 'antithèse, oxymore, chiasme, paradoxe'],
        ['Amplification / insistance', 'hyperbole, gradation, anaphore, accumulation, parallélisme'],
        ['Sonorités', 'allitération (consonnes), assonance (voyelles), paronomase, harmonie imitative'],
        ['Construction', 'enjambement, rejet, hypallage, zeugme, apostrophe, question rhétorique'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Réflexe d’analyse',
      content: [
        { type: 'p', text: 'Ne jamais se contenter de **nommer** un procédé : **procédé + citation + effet / interprétation**. « L’allitération en [s] dans “ces serpents qui sifflent” imite le sifflement des serpents et traduit la folie d’Oreste. »' },
      ],
    },
  ],

  // ================================================================== COURS
  cours: [
    { type: 'h2', text: '1. Qu’est-ce que la poésie ?' },
    { type: 'p', text: 'Le mot vient du grec *poiein*, « faire, fabriquer » : le poète est d’abord un **artisan du langage**. La poésie se distingue de la prose ordinaire par un **travail sur la forme** (rythme, sonorités, images, disposition sur la page) qui fait du langage non plus seulement un outil de communication mais une matière sensible. Paul Valéry la comparait à la danse, quand la prose serait la marche.' },
    { type: 'p', text: 'Au programme de Première, l’objet d’étude couvre la période **XIXe – XXIe siècle** : on y observe une **émancipation progressive** du poème à l’égard des règles classiques héritées de Malherbe et Boileau (alexandrin, rime, alternance), jusqu’au vers libre, au poème en prose et aux formes contemporaines.' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Les fonctions de la poésie',
      content: [
        {
          type: 'list',
          items: [
            '**Lyrique** : exprimer les sentiments personnels (amour, deuil, mélancolie) — de la lyre d’Orphée.',
            '**Engagée** : dénoncer, combattre (Hugo, *Les Châtiments*, 1853 ; poésie de la Résistance).',
            '**Épique** : célébrer des héros, une histoire collective (Hugo, *La Légende des siècles*).',
            '**Descriptive / esthétique** : saisir la beauté des choses (Parnasse, Ponge).',
            '**Visionnaire** : révéler un monde caché derrière les apparences (Baudelaire, Rimbaud « voyant »).',
          ],
        },
      ],
    },

    { type: 'h2', text: '2. Histoire du genre du XIXe au XXIe siècle' },
    { type: 'h3', text: '2.1 Le romantisme (vers 1820 – 1850)' },
    { type: 'p', text: 'Né en Allemagne et en Angleterre à la fin du XVIIIe siècle, le romantisme triomphe en France avec les *Méditations poétiques* de **Lamartine (1820)**. Il exalte le **moi**, la sensibilité, la nature (miroir de l’âme), la fuite du temps, la mort, l’amour, l’ailleurs. Le poète se veut aussi **guide du peuple**, « écho sonore » de son siècle (Hugo, « Ce siècle avait deux ans… »).' },
    { type: 'quote', text: 'Ô temps ! suspends ton vol, et vous, heures propices !\nSuspendez votre cours :', author: 'Alphonse de Lamartine', source: '« Le Lac », *Méditations poétiques*, 1820' },
    { type: 'p', text: 'L’**apostrophe** au temps personnifié, l’impératif et le contraste entre l’alexandrin et le vers court (6 syllabes) expriment le désir de suspendre l’instant heureux : c’est le thème du *carpe diem* revisité de façon élégiaque.' },
    { type: 'quote', text: 'Demain, dès l’aube, à l’heure où blanchit la campagne,\nJe partirai. Vois-tu, je sais que tu m’attends.', author: 'Victor Hugo', source: '*Les Contemplations*, 1856 (poème daté du 3 septembre 1847)' },
    { type: 'p', text: 'Le poème semble décrire un rendez-vous amoureux ; la chute révèle qu’il s’agit d’une visite sur la tombe de Léopoldine, fille de Hugo noyée en 1843. Le **rejet** « Je partirai » et le tutoiement donnent au deuil une intensité intime.' },
    {
      type: 'list',
      items: [
        '**Victor Hugo** (1802 – 1885) : *Préface de Cromwell* (1827), *Les Châtiments* (1853), *Les Contemplations* (1856), *La Légende des siècles* (1859-1883).',
        '**Alfred de Musset** (1810 – 1857) : *Les Nuits* (1835-1837).',
        '**Alfred de Vigny** (1797 – 1863) : *Les Destinées* (posthume, 1864).',
        '**Gérard de Nerval** (1808 – 1855) : *Les Chimères* (1854), sonnets hermétiques (« El Desdichado »).',
      ],
    },

    { type: 'h3', text: '2.2 Le Parnasse (1852 – 1890)' },
    { type: 'p', text: 'En réaction aux épanchements romantiques, les Parnassiens (du nom du recueil collectif *Le Parnasse contemporain*, 1866) défendent **l’art pour l’art** : la poésie n’a pas à être utile ni à exprimer le moi, elle doit viser la **beauté formelle**, l’impersonnalité, la précision du mot rare, le culte de l’Antiquité et de l’exotisme.' },
    { type: 'quote', text: 'Il n’y a de vraiment beau que ce qui ne peut servir à rien ; tout ce qui est utile est laid.', author: 'Théophile Gautier', source: 'Préface de *Mademoiselle de Maupin*, 1835' },
    { type: 'list', items: ['**Théophile Gautier** : *Émaux et Camées* (1852).', '**Leconte de Lisle** : *Poèmes antiques* (1852), *Poèmes barbares* (1862).', '**José-Maria de Heredia** : *Les Trophées* (1893), 118 sonnets ciselés (« Les Conquérants » : « Comme un vol de gerfauts hors du charnier natal »).'] },

    { type: 'h3', text: '2.3 Baudelaire, la modernité poétique' },
    { type: 'p', text: '**Charles Baudelaire** (1821 – 1867) se situe au carrefour du romantisme, du Parnasse (il dédie *Les Fleurs du mal* à Gautier) et du symbolisme qu’il annonce. *Les Fleurs du mal* (1857) sont condamnées pour « outrage à la morale publique » : six poèmes doivent être retirés. Le recueil oppose **Spleen** (ennui, angoisse, finitude) et **Idéal** (beauté, amour, ailleurs). Baudelaire veut extraire « la beauté du mal » et faire de la ville moderne (Paris) un sujet poétique (« Tableaux parisiens »).' },
    { type: 'quote', text: 'Le Poète est semblable au prince des nuées\nQui hante la tempête et se rit de l’archer ;\nExilé sur le sol au milieu des huées,\nSes ailes de géant l’empêchent de marcher.', author: 'Charles Baudelaire', source: '« L’Albatros », *Les Fleurs du mal* (éd. 1861)' },
    { type: 'p', text: 'Ce dernier quatrain explicite l’**allégorie** : la comparaison « semblable au prince des nuées » (périphrase désignant l’albatros) assimile le poète, sublime dans l’idéal, à un être maladroit et moqué parmi les hommes. Le **paradoxe** final (des ailes immenses qui empêchent de marcher) dit la malédiction du génie.' },
    { type: 'quote', text: 'La Nature est un temple où de vivants piliers\nLaissent parfois sortir de confuses paroles ;', author: 'Charles Baudelaire', source: '« Correspondances », *Les Fleurs du mal*, 1857' },
    { type: 'p', text: 'La théorie des **correspondances** est double : correspondances **verticales** entre le monde sensible et un monde spirituel caché, et correspondances **horizontales** entre les sens (**synesthésies**) : « Les parfums, les couleurs et les sons se répondent. » Baudelaire invente aussi en France le **poème en prose** moderne avec *Le Spleen de Paris* (*Petits poèmes en prose*, posthume, 1869), après *Gaspard de la nuit* d’Aloysius Bertrand (1842).' },

    { type: 'h3', text: '2.4 Le symbolisme (1886 – fin du siècle)' },
    { type: 'p', text: 'Le terme est consacré par le **Manifeste du symbolisme** de Jean Moréas (*Le Figaro*, 18 septembre 1886). Les symbolistes refusent la description réaliste : il faut **suggérer** plutôt que nommer, exprimer par des **symboles** une réalité spirituelle, et rapprocher la poésie de la **musique**.' },
    { type: 'quote', text: 'De la musique avant toute chose,\nEt pour cela préfère l’Impair', author: 'Paul Verlaine', source: '« Art poétique » (1874), publié dans *Jadis et naguère*, 1884' },
    { type: 'p', text: 'Le premier vers compte lui-même **9 syllabes** : Verlaine applique son précepte en employant un **vers impair**, plus fluide, « plus vague et plus soluble dans l’air ».' },
    { type: 'quote', text: 'Les sanglots longs\nDes violons\nDe l’automne\nBlessent mon cœur\nD’une langueur\nMonotone.', author: 'Paul Verlaine', source: '« Chanson d’automne », *Poèmes saturniens*, 1866' },
    { type: 'p', text: 'Vers très courts (4/4/3), **assonances** en [ɔ̃] (sanglots, longs, violons, monotone) qui imitent le son étouffé des violons, rimes riches : la mélancolie est rendue par la musique même du poème.' },
    {
      type: 'list',
      items: [
        '**Paul Verlaine** (1844 – 1896) : *Poèmes saturniens* (1866), *Fêtes galantes* (1869), *Romances sans paroles* (1874).',
        '**Arthur Rimbaud** (1854 – 1891) : *Cahier de Douai* (1870), « Le Bateau ivre » (1871), *Une saison en enfer* (1873), *Illuminations* (publiées en 1886).',
        '**Stéphane Mallarmé** (1842 – 1898) : *Poésies*, « Brise marine » (« La chair est triste, hélas ! et j’ai lu tous les livres. »), *Un coup de dés jamais n’abolira le hasard* (1897), poème typographique.',
        '**Lautréamont** (1846 – 1870) : *Les Chants de Maldoror* (1869), admirés plus tard des surréalistes.',
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Rimbaud « voyant »',
      content: [
        { type: 'p', text: 'Dans la lettre à Paul Demeny du 15 mai 1871, dite « lettre du Voyant », Rimbaud écrit : « Je est un autre » et « Le Poète se fait voyant par un long, immense et raisonné dérèglement de tous les sens. » Le poète doit « arriver à l’inconnu » et « trouver une langue ».' },
      ],
    },

    { type: 'h3', text: '2.5 Vers la modernité : Apollinaire' },
    { type: 'p', text: '**Guillaume Apollinaire** (1880 – 1918) fait le lien entre symbolisme et avant-gardes. Dans *Alcools* (1913), il **supprime toute ponctuation** et mêle tradition (lyrisme élégiaque) et modernité (« Zone » : « À la fin tu es las de ce monde ancien »). Dans *Calligrammes* (1918), le poème devient dessin.' },
    { type: 'quote', text: 'Sous le pont Mirabeau coule la Seine\nEt nos amours\nFaut-il qu’il m’en souvienne\nLa joie venait toujours après la peine', author: 'Guillaume Apollinaire', source: '« Le Pont Mirabeau », *Alcools*, 1913' },
    { type: 'p', text: 'Le décasyllabe initial (4//6) est comme « cassé » en deux vers courts au vers 2-3 : le rythme imite l’écoulement de l’eau et du temps. Le refrain « Vienne la nuit sonne l’heure / Les jours s’en vont je demeure » oppose le temps qui passe et le moi immobile.' },

    { type: 'h3', text: '2.6 Le surréalisme (1924 – 1966)' },
    { type: 'p', text: 'Issu du mouvement Dada (Tristan Tzara, Zurich, 1916), le surréalisme est fondé par **André Breton** avec le *Manifeste du surréalisme* (1924). Il le définit comme un « automatisme psychique pur » visant à exprimer « le fonctionnement réel de la pensée » hors de tout contrôle de la raison. Influencés par Freud, les surréalistes explorent le **rêve**, l’**inconscient**, le hasard objectif, l’amour fou, par l’**écriture automatique** et des **images** rapprochant des réalités éloignées.' },
    { type: 'p', text: 'Exemple célèbre d’image surréaliste : « La terre est bleue comme une orange » (Paul Éluard, *L’Amour la poésie*, 1929). La comparaison, absurde en apparence, rapproche deux sphères et deux couleurs complémentaires : elle crée un monde neuf.' },
    { type: 'list', items: ['**Paul Éluard** : *Capitale de la douleur* (1926), « Liberté » (1942).', '**Louis Aragon** : *Le Paysan de Paris* (1926), puis poésie de la Résistance.', '**Robert Desnos** : *Corps et biens* (1930).', '**Aimé Césaire** : *Cahier d’un retour au pays natal* (1939), poésie de la **négritude** proche du surréalisme.'] },

    { type: 'h3', text: '2.7 La poésie depuis 1945' },
    { type: 'p', text: 'La poésie contemporaine se diversifie : **poésie engagée** de la Résistance (Char, *Feuillets d’Hypnos*, 1946), **poésie du quotidien** (Prévert, *Paroles*, 1946), **poésie de l’objet** (Ponge, *Le Parti pris des choses*, 1942), poésie de la présence et du paysage (Yves Bonnefoy, Philippe Jaccottet), **jeux formels** de l’**Oulipo** (fondé en 1960 par Raymond Queneau et François Le Lionnais ; *Cent mille milliards de poèmes*, 1961), poésie francophone (Senghor, Césaire, Glissant), et aujourd’hui **écopoésie** attentive au vivant, dont Hélène Dorion est une représentante.' },
    { type: 'widget', id: 'syllable-counter', props: { verse: 'Ô temps ! suspends ton vol, et vous, heures propices !' }, title: 'Compter les syllabes', caption: 'Testez des vers cités dans ce cours.' },

    { type: 'h2', text: '3. La versification' },
    { type: 'h3', text: '3.1 Compter les syllabes' },
    { type: 'p', text: 'En poésie, on compte les **syllabes prononcées** (on parle de « pieds » abusivement). Règles essentielles :' },
    {
      type: 'list',
      items: [
        'Le **e muet** (ou caduc) se prononce et compte **devant une consonne** : « tou-te-cho-se ».',
        'Il **s’élide** devant une voyelle ou un h muet : « l’heu-r(e) où » → 2 syllabes.',
        'Il **ne compte jamais en fin de vers** (il rend la rime féminine).',
        '**Diérèse** : deux voyelles contiguës prononcées en deux syllabes (*vi-o-lon*, *nu-é-es*), souvent pour mettre un mot en valeur.',
        '**Synérèse** : prononciation en une seule syllabe (*pi-liers*, *hier*).',
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé',
      content: [
        { type: 'p', text: '« Le / Po / è / t(e) est / sem / bla // bl(e) au / prin / ce / des / nu / ées » = **12 syllabes** : alexandrin. Le e de « Poète » et celui de « semblable » s’élident ; « nu-ées » est en **diérèse** ; le e final ne compte pas. Césure après la 6e syllabe.' },
      ],
    },
    {
      type: 'table',
      headers: ['Nom du vers', 'Syllabes', 'Exemple'],
      rows: [
        ['Alexandrin', '12', '« Demain, dès l’aube, à l’heure où blanchit la campagne » (Hugo)'],
        ['Décasyllabe', '10', '« Sous le pont Mirabeau coule la Seine » (Apollinaire)'],
        ['Ennéasyllabe', '9', '« De la musique avant toute chose » (Verlaine)'],
        ['Octosyllabe', '8', 'vers des chansons et des ballades (Villon, Gautier)'],
        ['Heptasyllabe', '7', 'vers impair cher à Verlaine'],
        ['Tétrasyllabe', '4', '« Les sanglots longs » (Verlaine)'],
      ],
    },
    { type: 'h3', text: '3.2 Rythme : césure, coupes, enjambements' },
    { type: 'p', text: 'L’alexandrin classique se divise en deux **hémistiches** de 6 syllabes séparés par la **césure** (//). Des **coupes** secondaires (/) créent des mesures : le **tétramètre** (3/3//3/3) est régulier ; le **trimètre romantique** (4/4/4) bouscule la césure. La discordance entre la phrase et le vers produit des effets de sens :' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Enjambement', value: 'La phrase se poursuit sur le vers suivant sans pause forte.' },
        { key: 'Rejet', value: 'Un élément bref, lié syntaxiquement au vers précédent, est rejeté au début du vers suivant et mis en relief (« Je partirai. »).' },
        { key: 'Contre-rejet', value: 'Un élément bref placé en fin de vers appartient syntaxiquement au vers suivant.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Le rejet dans « Le Dormeur du val »',
      content: [{ type: 'p', text: '« Les parfums ne font pas frissonner sa narine ; / Il dort dans le soleil, la main sur sa poitrine, / **Tranquille**. Il a deux trous rouges au côté droit. » — Le rejet de « Tranquille » prolonge l’illusion du sommeil juste avant la révélation brutale de la mort.' }],
    },
    { type: 'h3', text: '3.3 Les rimes' },
    {
      type: 'table',
      headers: ['Critère', 'Types', 'Exemple'],
      rows: [
        ['Disposition', 'suivies (AABB), croisées (ABAB), embrassées (ABBA)', 'Le sonnet régulier commence par des rimes embrassées'],
        ['Richesse', 'pauvre (1 phonème), suffisante (2), riche (3 et +)', 'vi**olons** / l**ongs** (pauvre : [ɔ̃]) ; cœur / langueur (suffisante : [œR]) ; aut**omne** / mon**otone** (riche : [tɔn])'],
        ['Genre', 'féminine (e muet final), masculine', '« campagne » (f.) / « attends » (m.)'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Piège : rime ≠ orthographe',
      content: [{ type: 'p', text: 'La rime se juge **à l’oreille** : on compte les phonèmes identiques à partir de la dernière voyelle prononcée. « longs » et « violons » ne partagent que le son [ɔ̃] : rime pauvre, même si plusieurs lettres coïncident.' }],
    },
    { type: 'h3', text: '3.4 Strophes et formes fixes' },
    { type: 'p', text: 'Strophes : **distique** (2 vers), **tercet** (3), **quatrain** (4), **quintil** (5), **sizain** (6), **huitain** (8), **dizain** (10).' },
    { type: 'svg', svg: sonnetSvg, caption: 'Structure du sonnet régulier', maxWidth: 560 },
    {
      type: 'list',
      items: [
        '**Sonnet** : 14 vers, 2 quatrains + 2 tercets ; la « chute » finale. Forme favorite du XIXe siècle (Baudelaire, Heredia, Rimbaud — qui le subvertit, par ex. en employant des rimes non conformes ou des sujets triviaux).',
        '**Ballade** : 3 strophes + un envoi, refrain (Villon, *Ballade des pendus*).',
        '**Rondeau** : forme brève à refrain (Charles d’Orléans).',
        '**Pantoum** : quatrains enchaînés, les vers 2 et 4 d’une strophe devenant 1 et 3 de la suivante (« Harmonie du soir » de Baudelaire s’en inspire).',
        '**Haïku** (forme japonaise de 17 syllabes, 5-7-5), repris par des poètes francophones contemporains.',
      ],
    },
    { type: 'h3', text: '3.5 La libération du vers' },
    {
      type: 'steps',
      items: [
        { title: 'Le vers libéré (XIXe s.)', text: 'On garde mètre et rime mais on assouplit les règles : césure déplacée, enjambements, vers impairs (Hugo, Verlaine, Rimbaud).' },
        { title: 'Le poème en prose (1842-1869)', text: 'Bertrand, *Gaspard de la nuit* ; Baudelaire, *Le Spleen de Paris* ; Rimbaud, *Illuminations*. La poésie se passe du vers mais garde densité, images, rythme, brièveté et unité.' },
        { title: 'Le vers libre (fin XIXe – XXe s.)', text: 'Gustave Kahn, Jules Laforgue, puis Apollinaire, les surréalistes : vers de longueur variable, sans rime obligatoire, dont le rythme est fondé sur la syntaxe, le souffle, la mise en page.' },
        { title: 'Formes contemporaines', text: 'Poésie spatiale, calligrammes, contraintes oulipiennes, « proêmes » de Ponge, fragments en vers libres de Dorion.' },
      ],
    },

    { type: 'h2', text: '4. Figures de style' },
    { type: 'h3', text: '4.1 Figures d’analogie' },
    {
      type: 'table',
      headers: ['Figure', 'Définition', 'Exemple'],
      rows: [
        ['Comparaison', 'Rapprochement de deux éléments par un outil de comparaison (comme, tel, semblable à…)', '« Le Poète est semblable au prince des nuées » (Baudelaire)'],
        ['Métaphore', 'Rapprochement sans outil de comparaison', '« La Nature est un temple » (Baudelaire)'],
        ['Métaphore filée', 'Métaphore prolongée sur plusieurs termes du même champ lexical', 'la Nature-temple, ses « piliers », ses « paroles »'],
        ['Personnification', 'Attribuer des traits humains à une chose ou un animal', '« Ô temps ! suspends ton vol » (Lamartine)'],
        ['Allégorie', 'Représentation concrète et développée d’une idée abstraite', 'L’albatros = le poète ; la Mort en faucheuse'],
      ],
    },
    { type: 'h3', text: '4.2 Figures de substitution' },
    {
      type: 'table',
      headers: ['Figure', 'Définition', 'Exemple'],
      rows: [
        ['Métonymie', 'Désigner une réalité par une autre qui lui est liée (contenant/contenu, cause/effet, auteur/œuvre…)', '« boire un verre », « lire un Hugo »'],
        ['Synecdoque', 'Métonymie particulière : la partie pour le tout', '« une voile » pour un navire'],
        ['Périphrase', 'Remplacer un mot par une expression qui le décrit', '« le prince des nuées » (l’albatros)'],
        ['Euphémisme', 'Atténuer une réalité pénible', '« il nous a quittés » pour « il est mort »'],
        ['Litote', 'Dire moins pour faire entendre plus', '« Va, je ne te hais point » (Corneille, *Le Cid*, III, 4)'],
        ['Antiphrase', 'Dire le contraire de ce qu’on pense (ironie)', '« Quel temps magnifique ! » sous l’orage'],
      ],
    },
    { type: 'h3', text: '4.3 Figures d’opposition' },
    {
      type: 'table',
      headers: ['Figure', 'Définition', 'Exemple'],
      rows: [
        ['Antithèse', 'Opposition de deux termes ou idées dans un même passage', '« Exilé sur le sol » / « prince des nuées »'],
        ['Oxymore', 'Union de deux termes contradictoires dans un même groupe', '« Cette obscure clarté qui tombe des étoiles » (Corneille, *Le Cid*, IV, 3)'],
        ['Chiasme', 'Structure en miroir ABBA', '« Il faut manger pour vivre et non pas vivre pour manger » (Molière, *L’Avare*, III, 1)'],
        ['Paradoxe', 'Idée contraire à l’opinion commune', '« Ses ailes de géant l’empêchent de marcher »'],
      ],
    },
    { type: 'h3', text: '4.4 Figures d’insistance et d’amplification' },
    {
      type: 'table',
      headers: ['Figure', 'Définition', 'Exemple'],
      rows: [
        ['Hyperbole', 'Exagération', '« mourir de rire »'],
        ['Gradation', 'Termes d’intensité croissante (ou décroissante)', '« Va, cours, vole, et nous venge » (Corneille, *Le Cid*, I, 5)'],
        ['Anaphore', 'Répétition d’un mot en tête de vers ou de phrase', '« Sur mes cahiers d’écolier… Sur… J’écris ton nom » (Éluard, « Liberté »)'],
        ['Accumulation / énumération', 'Suite de termes', 'listes d’objets chez Prévert'],
        ['Parallélisme', 'Reprise d’une même construction syntaxique', '« Les jours s’en vont je demeure » face à « Vienne la nuit sonne l’heure »'],
      ],
    },
    { type: 'h3', text: '4.5 Figures sonores et de construction' },
    {
      type: 'table',
      headers: ['Figure', 'Définition', 'Exemple'],
      rows: [
        ['Allitération', 'Répétition d’une consonne', '« Pour qui sont ces serpents qui sifflent sur vos têtes ? » (Racine, *Andromaque*, V, 5) : [s]'],
        ['Assonance', 'Répétition d’une voyelle', '« Les sanglots longs / Des violons » : [ɔ̃]'],
        ['Paronomase', 'Rapprochement de mots aux sons proches', '« Il pleure dans mon cœur / Comme il pleut sur la ville » (Verlaine)'],
        ['Hypallage', 'Attribuer à un mot un caractère qui convient logiquement à un autre', '« Ils allaient obscurs sous la nuit solitaire » (Virgile, trad.)'],
        ['Zeugme', 'Unir par un même mot deux éléments de nature différente (concret/abstrait)', '« Vêtu de probité candide et de lin blanc » (Hugo, « Booz endormi »)'],
        ['Apostrophe', 'Interpellation d’un être absent ou d’une chose', '« Ô temps ! »'],
        ['Synesthésie', 'Association de sensations relevant de sens différents', '« Les parfums, les couleurs et les sons se répondent » (Baudelaire)'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Confusions fréquentes',
      content: [
        { type: 'list', items: ['**Métaphore ≠ comparaison** : vérifier la présence d’un outil de comparaison.', '**Antithèse ≠ oxymore** : l’oxymore unit les contraires dans un même groupe de mots (nom + adjectif), l’antithèse les oppose à distance.', '**Métonymie ≠ métaphore** : la métonymie repose sur un lien logique réel (contiguïté), la métaphore sur une ressemblance.'] },
      ],
    },

    { type: 'h2', text: '5. Œuvre 1 — Rimbaud, *Cahier de Douai* (parcours « Émancipations créatrices »)' },
    { type: 'h3', text: '5.1 Contexte' },
    { type: 'p', text: '**Arthur Rimbaud** naît le 20 octobre 1854 à Charleville (Ardennes) et meurt à Marseille le 10 novembre 1891. Élève brillant, encouragé par son jeune professeur **Georges Izambard**, il étouffe dans sa ville de province et sous l’autorité d’une mère austère. En 1870, année de la **guerre franco-prussienne** (déclarée le 19 juillet ; défaite de Sedan le 2 septembre ; proclamation de la République le 4 septembre), il fugue à Paris (fin août, il est arrêté gare du Nord et emprisonné à Mazas), puis séjourne à **Douai** chez les tantes d’Izambard, et fugue de nouveau en Belgique (Charleroi, Bruxelles) en octobre.' },
    { type: 'p', text: 'À Douai, à l’automne 1870, il recopie ses poèmes et les confie au poète **Paul Demeny** en espérant les faire publier. Ces **22 poèmes**, répartis en deux cahiers et publiés de façon posthume, forment ce qu’on appelle le *Cahier de Douai* (ou « Recueil Demeny »). Rimbaud a alors **15-16 ans**. Le programme retient les 22 poèmes, de « Première soirée » à « Ma Bohème ».' },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Poèmes de l’élan', text: '« Sensation », « Première soirée », « Roman », « Rêvé pour l’hiver », « Ma Bohème » : nature, désir, liberté.', icon: 'Sun' },
        { title: 'Poèmes politiques', text: '« Le Forgeron », « Le Mal », « Rages de Césars », « L’Éclatante Victoire de Sarrebrück », « Le Dormeur du val » : satire de Napoléon III, horreur de la guerre.', icon: 'Swords' },
        { title: 'Satire et dérision', text: '« À la musique », « Vénus Anadyomène », « Le Châtiment de Tartufe », « Bal des pendus » : caricature des bourgeois, des dévots, de la beauté convenue.', icon: 'Drama' },
      ],
    },
    { type: 'h3', text: '5.2 Des émancipations multiples' },
    {
      type: 'list',
      items: [
        '**Émancipation personnelle et familiale** : la fugue, la marche, la « bohème » ; le poète s’affranchit du foyer et de la province.',
        '**Émancipation sociale et politique** : Rimbaud est républicain, il attaque l’Empire (« Rages de Césars » montre Napoléon III vaincu), le bourgeois satisfait (« À la musique »), il exalte le peuple (« Le Forgeron »).',
        '**Émancipation religieuse et morale** : « Le Mal » oppose les massacres de la guerre à un Dieu qui « rit aux nappes damassées » ; « Le Châtiment de Tartufe » ridiculise l’hypocrisie dévote.',
        '**Émancipation amoureuse et sensuelle** : désir adolescent, érotisme léger (« Première soirée », « Roman »).',
        '**Émancipation poétique** : Rimbaud imite les maîtres (Hugo, Banville, les Parnassiens) pour mieux les dépasser : sonnets irréguliers, mots triviaux ou familiers (« Oh ! là ! là ! »), images neuves, ironie.',
      ],
    },
    { type: 'quote', text: 'Par les soirs bleus d’été, j’irai dans les sentiers,\nPicoté par les blés, fouler l’herbe menue :', author: 'Arthur Rimbaud', source: '« Sensation », mars 1870' },
    { type: 'p', text: 'Le **futur** projette un rêve de liberté ; le corps entier (« Picoté », « fouler ») entre en contact avec la nature. Le poème s’achève sur la comparaison « heureux comme avec une femme » : nature et amour se confondent.' },
    { type: 'quote', text: 'On n’est pas sérieux, quand on a dix-sept ans.', author: 'Arthur Rimbaud', source: '« Roman », 1870 (premier vers)' },
    { type: 'h3', text: '5.3 Deux poèmes à connaître de près' },
    { type: 'p', text: '**« Le Dormeur du val »** (octobre 1870) : sonnet en alexandrins. Les quatrains peignent un paysage lumineux, presque idyllique (« C’est un trou de verdure où chante une rivière »), où un jeune soldat semble dormir. Les indices de mort se multiplient (« pâle », « Souriant comme / Sourirait un enfant malade », « Nature, berce-le chaudement : il a froid ») jusqu’à la **chute** : « Il a deux trous rouges au côté droit. » Le contraste entre la nature vivante et la mort, la litote du dernier vers et le silence sur la cause rendent la dénonciation de la guerre d’autant plus forte.' },
    { type: 'quote', text: 'Je m’en allais, les poings dans mes poches crevées ;\nMon paletot aussi devenait idéal ;\nJ’allais sous le ciel, Muse ! et j’étais ton féal ;\nOh ! là ! là ! que d’amours splendides j’ai rêvées !', author: 'Arthur Rimbaud', source: '« Ma Bohème (Fantaisie) », octobre 1870' },
    { type: 'p', text: '**« Ma Bohème »** clôt le recueil comme un **art poétique**. L’imparfait de la marche, la pauvreté heureuse (« poches crevées »), le jeu sur « idéal » (le paletot usé devient immatériel, et s’élève à l’Idéal), l’apostrophe à la Muse tournée en familiarité (« Oh ! là ! là ! ») : Rimbaud désacralise le lyrisme. Dans le dernier tercet, il tire « les élastiques / De [ses] souliers blessés » comme des lyres : le poète vagabond fait de sa misère même un instrument de musique.' },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Pour la dissertation',
      content: [{ type: 'p', text: 'Pensez à nuancer : le *Cahier de Douai* est **aussi** un recueil d’apprentissage, où Rimbaud reprend des formes traditionnelles (sonnet, alexandrin, rimes) et des modèles (Hugo, Banville, Coppée parfois parodié). L’émancipation est **créatrice** parce qu’elle passe par l’imitation, la parodie et le détournement, non par la table rase.' }],
    },

    { type: 'h2', text: '6. Œuvre 2 — Ponge, *La rage de l’expression* (parcours « Dans l’atelier du poète »)' },
    { type: 'p', text: '**Francis Ponge** (1899 – 1988) est connu pour *Le Parti pris des choses* (1942), recueil de poèmes en prose consacrés à des objets humbles (« Le Cageot », « L’Huître », « Le Pain », « La Bougie »). Il veut « prendre le parti des choses », c’est-à-dire les décrire au plus près, contre l’anthropomorphisme et les clichés lyriques, en tenant compte autant de l’objet que des mots qui le disent : c’est ce qu’il appelle l’« **objeu** » ou l’« objoie ».' },
    { type: 'p', text: '*La rage de l’expression* (Mermod, 1952) rassemble des textes écrits pour l’essentiel entre 1938 et 1944. Au lieu de livrer des poèmes achevés, Ponge publie ses **brouillons, notes datées, variantes, repentirs** : « Berges de la Loire », « La Guêpe », « Notes prises pour un oiseau », « L’Œillet », « Le Mimosa », « Le Carnet du bois de pins », « La Mounine ». Le lecteur entre ainsi dans l’**atelier** du poète et assiste au travail de l’écriture : recherche du mot juste, échecs, recommencements. Le titre dit cette **rage** : un combat acharné avec la langue pour rendre justice à l’objet.' },
    {
      type: 'list',
      items: [
        '**Poétique du chantier** : le texte n’est jamais clos ; la recherche fait œuvre.',
        '**Le dictionnaire** comme outil : Ponge consulte le Littré, explore l’étymologie, les sonorités des mots (le mot « mimosa », le mot « œillet »).',
        '**Refus du lyrisme facile** : la description doit conjurer les clichés poétiques (l’oiseau, la fleur sont des thèmes usés).',
        '**Prose et poésie** : la poésie n’est plus définie par le vers mais par l’exigence d’une expression juste.',
      ],
    },
    { type: 'p', text: 'Le parcours « Dans l’atelier du poète » invite à rapprocher Ponge d’autres textes montrant la fabrique du poème : brouillons de Flaubert ou de Hugo, arts poétiques (Boileau, Verlaine, Rimbaud et sa lettre du Voyant), *Carnets* de Valéry, *Exercices de style* de Queneau (1947).' },

    { type: 'h2', text: '7. Œuvre 3 — Hélène Dorion, *Mes forêts* (parcours « La poésie, la nature, l’intime »)' },
    { type: 'p', text: '**Hélène Dorion**, poète québécoise née en 1958 à Québec, publie *Mes forêts* en 2021 (Éditions Bruno Doucey). Le recueil, en **vers libres** et poèmes brefs, organisé en cinq sections, fait de la forêt à la fois un **paysage réel** (arbres, écorce, mousses, ruisseaux, saisons) et une **forêt intérieure** : traverser la forêt, c’est explorer sa mémoire, ses blessures, son rapport au temps et à la mort.' },
    {
      type: 'list',
      items: [
        '**Le moi et la nature en miroir** : héritage romantique (nature confidente) renouvelé par une écriture sobre et fragmentaire.',
        '**Écopoésie** : la forêt est menacée (coupes, incendies, dérèglement climatique) ; la poésie dit la vulnérabilité du vivant et invite à l’attention.',
        '**Le temps** : cycles des saisons, croissance lente des arbres, mémoire des anneaux du tronc.',
        '**Forme** : vers libres, absence de ponctuation fréquente, blancs typographiques, répétitions qui créent une respiration.',
      ],
    },
    { type: 'p', text: 'Le parcours permet de relier Dorion à Lamartine (« Le Lac »), Hugo (*Les Contemplations*), Baudelaire (« Correspondances »), Rimbaud (« Sensation »), Jaccottet, Bonnefoy, ou encore à la poésie de Ponge sur les choses de la nature (« Le Carnet du bois de pins »).' },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Droits d’auteur',
      content: [{ type: 'p', text: 'Les textes de Ponge (mort en 1988) et de Dorion (vivante) ne sont pas dans le domaine public : ils ne sont pas cités ici. Travaillez avec votre édition de classe.' }],
    },

    { type: 'h2', text: '8. Méthode : analyser un poème' },
    {
      type: 'steps',
      items: [
        { title: 'Lire et situer', text: 'Auteur, recueil, date, mouvement ; titre ; forme (sonnet ? vers libre ? prose ?).' },
        { title: 'Repérer la structure', text: 'Mouvements du texte (strophes, connecteurs, changement de temps verbal, de ton, de destinataire).' },
        { title: 'Observer la versification', text: 'Mètre, césure, enjambements/rejets, rimes (disposition, richesse, genre), sonorités.' },
        { title: 'Étudier les images et l’énonciation', text: 'Figures de style, champs lexicaux, qui parle, à qui (lyrisme du « je », apostrophes).' },
        { title: 'Interpréter', text: 'Formuler une problématique : en quoi la forme sert-elle le sens ? Toujours relier procédé et effet.' },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Explication linéaire (oral) vs commentaire (écrit)',
      content: [
        { type: 'list', items: ['**Explication linéaire** : on suit le texte dans l’ordre, mouvement par mouvement, en répondant à une problématique annoncée en introduction.', '**Commentaire** : on organise l’analyse en 2 ou 3 axes thématiques (I, II, III) avec sous-parties, chaque idée étant illustrée par des citations analysées.', 'Dans les deux cas : introduction (amorce, présentation, problématique, plan) et conclusion (bilan, ouverture).'] },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Dissertation sur œuvre',
      content: [
        { type: 'list', items: ['Analyser le sujet : mots-clés, présupposés, enjeu ; reformuler en problématique.', 'Plan dialectique (oui / mais / dépassement) ou thématique ; 2 ou 3 parties, 2-3 sous-parties chacune.', 'Chaque sous-partie : argument + exemple précis de l’œuvre (poème cité, analysé) + lien au sujet ; mobiliser aussi les textes du parcours.'] },
      ],
    },
  ],

  // ================================================================== EXERCICES
  exercices: [
    {
      id: 'poesie-ex1',
      title: 'Compter les syllabes et identifier le mètre',
      difficulty: 1,
      duration: 15,
      tags: ['versification'],
      statement: [
        { type: 'p', text: 'Comptez les syllabes des vers suivants, nommez le mètre et signalez les élisions, diérèses ou synérèses.' },
        { type: 'list', ordered: true, items: ['« Je m’en allais, les poings dans mes poches crevées » (Rimbaud)', '« Sous le pont Mirabeau coule la Seine » (Apollinaire)', '« La Nature est un temple où de vivants piliers » (Baudelaire)', '« Des violons » (Verlaine)'] },
      ],
      hints: ['Le e muet compte devant une consonne et s’élide devant une voyelle.', 'Le e final d’un vers ne compte jamais.', '« violons » se prononce-t-il en 2 ou 3 syllabes ici ?'],
      solution: [
        { type: 'list', ordered: true, items: [
          'Je / m’en / al / lais / les / poings // dans / mes / po / ches / cre / vées = **12** : alexandrin. Le e de « poches » compte (devant consonne) ; le e final de « crevées » ne compte pas. Césure après « poings ».',
          'Sous / le / pont / Mi // ra / beau / cou / le / la / Sei(ne) = **10** : décasyllabe, coupé 4//6. Le e de « coule » compte devant « la ».',
          'La / Na / tu / r(e) est / un / tem // pl(e) où / de / vi / vants / pi / liers = **12** : alexandrin. Élisions de « Nature » et « temple » ; **synérèse** sur « piliers » (pi-liers).',
          'Des / vi / o / lons = **4** : tétrasyllabe, avec **diérèse** sur « vi-o-lons », qui allonge le mot et imite la plainte de l’instrument.',
        ] },
      ],
    },
    {
      id: 'poesie-ex2',
      title: 'Identifier les figures de style',
      difficulty: 1,
      duration: 15,
      tags: ['figures de style'],
      statement: [
        { type: 'p', text: 'Nommez la figure principale de chaque extrait et indiquez son effet.' },
        { type: 'list', ordered: true, items: [
          '« Cette obscure clarté qui tombe des étoiles » (Corneille)',
          '« Pour qui sont ces serpents qui sifflent sur vos têtes ? » (Racine)',
          '« Il pleure dans mon cœur / Comme il pleut sur la ville » (Verlaine)',
          '« Va, je ne te hais point » (Corneille)',
          '« Vêtu de probité candide et de lin blanc » (Hugo)',
          '« Il faut manger pour vivre et non pas vivre pour manger » (Molière)',
        ] },
      ],
      hints: ['Cherchez des termes contradictoires, des sons répétés, une structure en miroir.', 'Une figure peut associer un concret et un abstrait.'],
      solution: [
        { type: 'list', ordered: true, items: [
          '**Oxymore** (« obscure clarté ») : la lumière nocturne, faible et mystérieuse, est rendue par l’union des contraires.',
          '**Allitération en [s]** : le sifflement imite les serpents des Érinyes qui hantent Oreste devenu fou ; harmonie imitative.',
          '**Paronomase** (pleure / pleut) et **comparaison** : la tristesse intérieure se confond avec la pluie, correspondance entre paysage et état d’âme.',
          '**Litote** : Chimène dit moins (« ne te hais point ») pour faire entendre plus (« je t’aime »), contrainte par l’honneur.',
          '**Zeugme** : « vêtu » s’applique à une qualité morale (probité) et à un vêtement (lin) ; la pureté morale de Booz se fait visible.',
          '**Chiasme** (manger / vivre / vivre / manger) : la structure en miroir renverse l’ordre et rend la maxime frappante.',
        ] },
      ],
    },
    {
      id: 'poesie-ex3',
      title: 'Situer un extrait dans l’histoire de la poésie',
      difficulty: 1,
      duration: 10,
      tags: ['mouvements'],
      statement: [
        { type: 'p', text: 'Associez chaque affirmation à un mouvement et justifiez brièvement.' },
        { type: 'list', ordered: true, items: [
          '« Il n’y a de vraiment beau que ce qui ne peut servir à rien. »',
          'La poésie doit naître de l’écriture automatique, hors du contrôle de la raison.',
          'Le poète confie à la nature son deuil et sa mélancolie.',
          'Il faut suggérer plutôt que nommer, « De la musique avant toute chose ».',
        ] },
      ],
      solution: [
        { type: 'list', ordered: true, items: [
          '**Parnasse** (Gautier, 1835, formule reprise par l’« art pour l’art ») : refus de l’utilité de l’art, culte de la beauté formelle.',
          '**Surréalisme** (Breton, *Manifeste*, 1924) : l’inconscient et le rêve deviennent sources de la poésie.',
          '**Romantisme** (Lamartine, « Le Lac » ; Hugo, *Les Contemplations*) : lyrisme personnel et nature confidente.',
          '**Symbolisme** (Verlaine, « Art poétique ») : musicalité, suggestion, vers impair.',
        ] },
      ],
    },
    {
      id: 'poesie-ex4',
      title: 'Question d’analyse : « L’Albatros »',
      difficulty: 2,
      duration: 30,
      tags: ['Baudelaire', 'analyse'],
      statement: [
        { type: 'quote', text: 'Le Poète est semblable au prince des nuées\nQui hante la tempête et se rit de l’archer ;\nExilé sur le sol au milieu des huées,\nSes ailes de géant l’empêchent de marcher.', author: 'Baudelaire', source: '« L’Albatros », dernière strophe' },
        { type: 'p', text: 'Montrez que cette strophe donne la clé du poème et propose une image de la condition du poète. Rédigez un paragraphe argumenté.' },
      ],
      hints: ['Repérez l’outil de comparaison et la périphrase.', 'Opposez les vers 1-2 et 3-4.', 'Que signifie le paradoxe du dernier vers ?'],
      solution: [
        { type: 'p', text: 'Cette dernière strophe explicite l’**allégorie** développée dans les trois premières : l’outil de comparaison « semblable » rapproche enfin le « Poète », avec une majuscule qui le grandit, de l’albatros désigné par la **périphrase** méliorative « prince des nuées ». Les deux premiers vers montrent sa souveraineté dans le ciel : il « hante la tempête », « se rit de l’archer », dominant les dangers. Les deux derniers renversent cette image par une **antithèse** : « Exilé sur le sol » s’oppose aux « nuées », et la rime « nuées / huées » associe le sublime et la moquerie de la foule. Le **paradoxe** final, « Ses ailes de géant l’empêchent de marcher », résume la condition du poète maudit : ce qui fait sa grandeur dans l’Idéal le rend inapte et ridicule dans le monde réel. Baudelaire fait ainsi du poète un être double, supérieur et exclu, à l’image de la tension entre Spleen et Idéal qui structure *Les Fleurs du mal*.' },
      ],
    },
    {
      id: 'poesie-ex5',
      title: 'Question d’analyse : « Ma Bohème », premier quatrain',
      difficulty: 2,
      duration: 30,
      tags: ['Rimbaud', 'Cahier de Douai'],
      statement: [
        { type: 'quote', text: 'Je m’en allais, les poings dans mes poches crevées ;\nMon paletot aussi devenait idéal ;\nJ’allais sous le ciel, Muse ! et j’étais ton féal ;\nOh ! là ! là ! que d’amours splendides j’ai rêvées !', author: 'Rimbaud', source: '« Ma Bohème », 1870' },
        { type: 'p', text: 'En quoi ce quatrain mêle-t-il idéal poétique et réalité triviale ?' },
      ],
      hints: ['Relevez les termes qui évoquent la pauvreté et ceux qui évoquent l’idéal.', 'Analysez « idéal » : deux sens possibles.', 'Quel registre introduit « Oh ! là ! là ! » ?'],
      solution: [
        { type: 'p', text: '**Une réalité triviale.** Le poète se présente en vagabond pauvre : « poches crevées », « paletot » (manteau usé). L’imparfait duratif « Je m’en allais », « J’allais » dit une errance libre, celle des fugues de 1870.' },
        { type: 'p', text: '**Un idéal poétique.** Le mot « idéal », à la rime, joue sur deux sens : le paletot est tellement usé qu’il en devient immatériel, mais il est aussi transfiguré, élevé à l’Idéal baudelairien. L’apostrophe « Muse ! » et le terme médiéval « féal » (vassal fidèle) inscrivent le poète dans la tradition lyrique la plus noble.' },
        { type: 'p', text: '**Une désacralisation ironique.** L’interjection familière « Oh ! là ! là ! » et l’hyperbole « amours splendides » introduisent un ton badin, presque parodique. Rimbaud se moque gentiment de la pose du poète inspiré tout en affirmant la liberté joyeuse du créateur. Ce mélange est au cœur du parcours « Émancipations créatrices » : s’émanciper de la famille et de la société, mais aussi des codes poétiques.' },
      ],
    },
    {
      id: 'poesie-ex6',
      title: 'Plan de commentaire : « Le Dormeur du val »',
      difficulty: 3,
      duration: 60,
      tags: ['Rimbaud', 'commentaire', 'type bac'],
      statement: [
        { type: 'p', text: 'Proposez une introduction rédigée et un plan détaillé de commentaire pour le sonnet « Le Dormeur du val » (Rimbaud, *Cahier de Douai*, octobre 1870).' },
        { type: 'p', text: 'Rappel : « C’est un trou de verdure où chante une rivière » (v. 1) … « Tranquille. Il a deux trous rouges au côté droit. » (v. 14).' },
      ],
      hints: ['Le poème est construit sur un effet de surprise : quelle est la lecture naïve, quelle est la lecture finale ?', 'Pensez au contexte historique de 1870.', 'Problématique possible : comment le poème transforme-t-il un tableau bucolique en dénonciation de la guerre ?'],
      solution: [
        { type: 'h3', text: 'Introduction' },
        { type: 'p', text: 'En 1870, la guerre franco-prussienne fait des milliers de morts et entraîne la chute du Second Empire. Arthur Rimbaud, alors âgé de seize ans, compose en octobre « Le Dormeur du val », sonnet en alexandrins recopié dans le *Cahier de Douai*. Le poème peint un jeune soldat endormi dans un vallon ensoleillé, avant de révéler, au dernier vers, qu’il est mort. **Comment ce sonnet transforme-t-il un tableau bucolique en une dénonciation saisissante de la guerre ?** Nous verrons d’abord que Rimbaud peint une nature idyllique et accueillante, puis que des indices inquiétants préparent la chute, enfin que cette construction fait du poème un réquisitoire contre la guerre.' },
        { type: 'h3', text: 'I. Un tableau bucolique et lumineux' },
        { type: 'list', items: ['A. Une nature vivante et personnifiée : la rivière « chante », la montagne est « fière », le val « mousse de rayons ».', 'B. Une lumière et des couleurs éclatantes : soleil, « vert », « bleu », « lumière pleut » (métaphore) ; synesthésies.', 'C. Un soldat en harmonie avec le paysage : « Dort », « étendu dans l’herbe », image de l’enfance et du repos.'] },
        { type: 'h3', text: 'II. Des indices qui préparent la chute' },
        { type: 'list', items: ['A. Une pâleur et une immobilité suspectes : « pâle », « bouche ouverte », « tête nue ».', 'B. La comparaison troublante : « Souriant comme / Sourirait un enfant malade » (enjambement et rejet), « il a froid » malgré le soleil.', 'C. L’insistance sur le sommeil (« Il dort » répété) qui devient euphémisme de la mort ; « Les parfums ne font pas frissonner sa narine ».'] },
        { type: 'h3', text: 'III. Un réquisitoire contre la guerre' },
        { type: 'list', items: ['A. La chute : le rejet « Tranquille. », puis la litote froide « deux trous rouges au côté droit » ; le rouge du sang rompt la palette.', 'B. Le contraste vie / mort, jeunesse / violence : un « soldat jeune », presque un enfant, sacrifié.', 'C. Une dénonciation implicite : aucun cri, aucun ennemi nommé ; la sobriété rend l’émotion plus forte que l’éloquence ; Rimbaud subvertit le sonnet pastoral en poème engagé.'] },
        { type: 'h3', text: 'Conclusion' },
        { type: 'p', text: 'Par un jeu de dévoilement progressif, Rimbaud fait du sonnet une machine à surprendre : la beauté de la nature rend la mort plus scandaleuse. Ce poème de l’adolescence témoigne déjà d’une émancipation à la fois politique et poétique. On peut le rapprocher de « Le Mal », du même recueil, ou, plus tard, des poèmes d’Apollinaire sur la Grande Guerre dans *Calligrammes*.' },
      ],
    },
    {
      id: 'poesie-ex7',
      title: 'Dissertation : Cahier de Douai et « Émancipations créatrices »',
      difficulty: 3,
      duration: 120,
      tags: ['Rimbaud', 'dissertation', 'type bac'],
      statement: [
        { type: 'p', text: 'Sujet : « Dans le *Cahier de Douai*, Rimbaud se contente-t-il de se révolter ? » Vous répondrez en vous appuyant sur l’œuvre, le parcours associé et votre culture personnelle.' },
      ],
      hints: ['« Se contenter » invite à nuancer : la révolte est-elle seulement négative ?', 'Distinguez révolte (refus) et création (invention).', 'Une 3e partie peut montrer que la révolte devient source de création.'],
      solution: [
        { type: 'p', text: '**Problématique** : la révolte du jeune Rimbaud n’est-elle qu’un refus de l’ordre établi, ou devient-elle le moteur d’une création poétique nouvelle ?' },
        { type: 'h3', text: 'I. Un recueil de la révolte' },
        { type: 'list', items: ['A. Contre la famille et la province : fugues, marche (« Ma Bohème », « Au Cabaret-Vert ») ; satire des bourgeois de Charleville (« À la musique »).', 'B. Contre le pouvoir et la guerre : « Rages de Césars », « L’Éclatante Victoire de Sarrebrück », « Le Dormeur du val ».', 'C. Contre la religion et l’hypocrisie : « Le Mal », « Le Châtiment de Tartufe ».'] },
        { type: 'h3', text: 'II. Mais une révolte qui s’accompagne d’un élan vital' },
        { type: 'list', items: ['A. La célébration de la nature et des sensations (« Sensation » : « Picoté par les blés »).', 'B. L’amour et le désir adolescent (« Première soirée », « Roman », « Rêvé pour l’hiver »).', 'C. La liberté joyeuse et la fantaisie : ton léger, ironie tendre, humour.'] },
        { type: 'h3', text: 'III. La révolte comme création : une émancipation poétique' },
        { type: 'list', items: ['A. Hériter pour subvertir : sonnets et alexandrins, mais mots familiers, rimes audacieuses, tons mêlés (« Oh ! là ! là ! »).', 'B. Parodier les modèles (Hugo, Banville, la beauté parnassienne retournée en laideur dans « Vénus Anadyomène »).', 'C. Annoncer le « voyant » : la lettre de mai 1871 et « Je est un autre » ; dans le parcours, d’autres émancipations créatrices (Hugo et la « Réponse à un acte d’accusation », Baudelaire, Apollinaire supprimant la ponctuation, les surréalistes).'] },
        { type: 'p', text: '**Conclusion** : Rimbaud ne se contente pas de se révolter ; sa révolte, d’abord refus, devient affirmation d’une liberté et invention d’une langue. C’est en cela qu’elle est « créatrice ».' },
      ],
    },
    {
      id: 'poesie-ex8',
      title: 'Dissertation : Ponge et l’atelier du poète',
      difficulty: 3,
      duration: 120,
      tags: ['Ponge', 'dissertation', 'type bac'],
      statement: [
        { type: 'p', text: 'Sujet : « Peut-on dire que, dans *La rage de l’expression*, le travail de l’écriture compte davantage que le poème achevé ? »' },
      ],
      hints: ['Examinez le statut des brouillons publiés.', 'L’inachèvement est-il un échec ou une esthétique ?', 'L’objet (la guêpe, le mimosa) disparaît-il derrière le travail des mots ?'],
      solution: [
        { type: 'p', text: '**Problématique** : en publiant ses brouillons, Ponge fait-il du processus l’essentiel de l’œuvre, au point de renoncer au poème ?' },
        { type: 'h3', text: 'I. Oui : un livre qui expose le chantier' },
        { type: 'list', items: ['A. Notes datées, variantes, ratures assumées : la genèse devient le texte (« Berges de la Loire », « Notes prises pour un oiseau »).', 'B. Un combat avec la langue : dictionnaire, étymologie, sonorités ; la « rage » du titre.', 'C. Une esthétique de l’inachèvement : le lecteur suit le poète à l’œuvre.'] },
        { type: 'h3', text: 'II. Mais ce travail vise toujours l’objet et l’expression juste' },
        { type: 'list', items: ['A. Le but reste de rendre justice aux choses (la guêpe, l’œillet, le mimosa, le bois de pins).', 'B. Des moments de réussite : formules trouvées, fragments achevés au sein des notes.', 'C. Le travail est subordonné à une exigence de vérité, contre les clichés lyriques.'] },
        { type: 'h3', text: 'III. Le travail est le poème : une nouvelle définition de la poésie' },
        { type: 'list', items: ['A. La poésie n’est plus un objet fini mais une démarche, un « objeu » entre la chose et les mots.', 'B. Le lecteur devient témoin et partenaire de la création.', 'C. Dans le parcours : arts poétiques (Boileau, Verlaine), brouillons de Hugo, *Exercices de style* de Queneau (1947), Valéry et la poésie comme « fabrication ».'] },
        { type: 'p', text: '**Conclusion** : chez Ponge, l’opposition entre travail et œuvre se dissout : le chantier est l’œuvre, parce que la poésie consiste précisément dans la recherche infinie de l’expression.' },
      ],
    },
  ],

  // ================================================================== REPRÉSENTATIONS
  representations: [
    { type: 'svg', svg: timelineSvg, caption: 'Frise des mouvements poétiques du XIXe au XXIe siècle', maxWidth: 780 },
    {
      type: 'timeline',
      events: [
        { date: '1820', title: 'Lamartine, *Méditations poétiques*', text: 'Acte de naissance du romantisme poétique français.' },
        { date: '1835', title: 'Gautier, préface de *Mademoiselle de Maupin*', text: 'Manifeste de l’art pour l’art.' },
        { date: '1842', title: 'Bertrand, *Gaspard de la nuit*', text: 'Premier recueil de poèmes en prose (posthume).' },
        { date: '1856', title: 'Hugo, *Les Contemplations*', text: '« Autrefois » / « Aujourd’hui », autour de la mort de Léopoldine (1843).' },
        { date: '1857', title: 'Baudelaire, *Les Fleurs du mal*', text: 'Procès pour outrage à la morale publique.' },
        { date: '1866', title: '*Le Parnasse contemporain* ; Verlaine, *Poèmes saturniens*' },
        { date: '1870', title: 'Rimbaud, *Cahier de Douai*', text: '22 poèmes confiés à Paul Demeny, à Douai.' },
        { date: '1886', title: 'Moréas, Manifeste du symbolisme', text: '*Le Figaro*, 18 septembre.' },
        { date: '1913', title: 'Apollinaire, *Alcools*', text: 'Suppression de la ponctuation.' },
        { date: '1924', title: 'Breton, *Manifeste du surréalisme*' },
        { date: '1942', title: 'Ponge, *Le Parti pris des choses*' },
        { date: '1952', title: 'Ponge, *La rage de l’expression*' },
        { date: '1960', title: 'Fondation de l’Oulipo', text: 'Queneau et Le Lionnais.' },
        { date: '2021', title: 'Dorion, *Mes forêts*' },
      ],
    },
    { type: 'widget', id: 'syllable-counter', props: { verse: 'Le Poète est semblable au prince des nuées' }, title: 'Diérèse et élisions', caption: 'Repérez la diérèse sur « nuées ».' },
    { type: 'widget', id: 'syllable-counter', props: { verse: 'De la musique avant toute chose' }, title: 'L’Impair de Verlaine', caption: 'Combien de syllabes ? Pourquoi est-ce un choix poétique ?' },
    {
      type: 'matching',
      title: 'Associer auteurs et œuvres',
      pairs: [
        { left: 'Lamartine', right: '*Méditations poétiques* (1820)' },
        { left: 'Hugo', right: '*Les Contemplations* (1856)' },
        { left: 'Baudelaire', right: '*Les Fleurs du mal* (1857)' },
        { left: 'Verlaine', right: '*Poèmes saturniens* (1866)' },
        { left: 'Rimbaud', right: '*Cahier de Douai* (1870)' },
        { left: 'Heredia', right: '*Les Trophées* (1893)' },
        { left: 'Apollinaire', right: '*Alcools* (1913)' },
        { left: 'Ponge', right: '*La rage de l’expression* (1952)' },
        { left: 'Dorion', right: '*Mes forêts* (2021)' },
      ],
    },
    {
      type: 'qcm',
      questions: [
        { question: '« La Nature est un temple » est :', choices: ['une comparaison', 'une métaphore', 'une métonymie', 'un oxymore'], answer: 1, explanation: 'Il n’y a pas d’outil de comparaison : c’est une métaphore (filée dans le quatrain).' },
        { question: '« Cette obscure clarté qui tombe des étoiles » contient :', choices: ['une antithèse', 'un chiasme', 'un oxymore', 'une litote'], answer: 2, explanation: 'Deux termes contradictoires unis dans le même groupe nominal.' },
        { question: '« Va, je ne te hais point » est :', choices: ['une hyperbole', 'une litote', 'un euphémisme', 'une antiphrase'], answer: 1, explanation: 'On dit moins pour suggérer plus : « je t’aime ».' },
        { question: '« Pour qui sont ces serpents qui sifflent sur vos têtes ? » repose sur :', choices: ['une assonance en [i]', 'une allitération en [s]', 'une paronomase', 'une anaphore'], answer: 1, explanation: 'Répétition de la consonne [s] : harmonie imitative du sifflement.' },
        { question: 'Lire « un Hugo » pour « un livre de Hugo » est :', choices: ['une métaphore', 'une périphrase', 'une métonymie', 'une allégorie'], answer: 2, explanation: 'L’auteur pour l’œuvre : lien logique de contiguïté.' },
        { question: '« Va, cours, vole, et nous venge » est :', choices: ['une gradation', 'un chiasme', 'un zeugme', 'une hypallage'], answer: 0, explanation: 'Verbes d’intensité croissante (Corneille, *Le Cid*).' },
        { question: '« Vêtu de probité candide et de lin blanc » est :', choices: ['une antithèse', 'un zeugme', 'une synecdoque', 'une gradation'], answer: 1, explanation: '« Vêtu » régit un terme abstrait et un terme concret.' },
        { question: 'Le dernier vers d’un sonnet, qui crée une surprise, s’appelle :', choices: ['l’envoi', 'la chute', 'le refrain', 'la volta'], answer: 1, explanation: 'La chute (ou pointe). L’envoi termine une ballade.' },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Alexandrin', back: 'Vers de 12 syllabes, deux hémistiches de 6 séparés par la césure.' },
        { front: 'Diérèse', back: 'Prononciation en deux syllabes de deux voyelles contiguës (vi-o-lon).' },
        { front: 'Synérèse', back: 'Prononciation en une syllabe de deux voyelles contiguës (pi-liers).' },
        { front: 'Rejet', back: 'Élément bref rejeté au début du vers suivant, mis en valeur.' },
        { front: 'Rime riche', back: 'Au moins trois phonèmes communs.' },
        { front: 'Rimes embrassées', back: 'ABBA.' },
        { front: 'Sonnet', back: '14 vers : 2 quatrains + 2 tercets, souvent ABBA ABBA CCD EED.' },
        { front: 'Poème en prose', back: 'Poème sans vers : Bertrand (1842), Baudelaire (*Le Spleen de Paris*, 1869), Rimbaud, Ponge.' },
        { front: 'L’art pour l’art', back: 'Doctrine parnassienne : la beauté n’a pas à être utile (Gautier).' },
        { front: 'Correspondances', back: 'Liens entre monde sensible et spirituel, et entre les sens (synesthésie) — Baudelaire.' },
        { front: 'Écriture automatique', back: 'Technique surréaliste : écrire sans contrôle de la raison (Breton, 1924).' },
        { front: 'Cahier de Douai', back: 'Rimbaud, 22 poèmes de 1870 confiés à Paul Demeny ; parcours « Émancipations créatrices ».' },
        { front: 'La rage de l’expression', back: 'Ponge, 1952 : brouillons et notes publiés ; parcours « Dans l’atelier du poète ».' },
        { front: 'Mes forêts', back: 'Hélène Dorion, 2021 ; parcours « La poésie, la nature, l’intime ».' },
        { front: '« Je est un autre »', back: 'Rimbaud, lettres de mai 1871 (lettre du Voyant à Demeny, 15 mai).' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter le cours',
      text: 'Le romantisme s’impose en France avec les *Méditations poétiques* de {{Lamartine}} en {{1820}}. Le Parnasse défend l’{{art pour l’art}}. *Les Fleurs du mal* de {{Baudelaire}} paraissent en {{1857}}. Le manifeste du {{symbolisme}} est publié par Moréas en 1886. Le *Manifeste du surréalisme* est écrit par {{Breton}} en {{1924}}. Un vers de douze syllabes est un {{alexandrin}} ; il est coupé par la {{césure}} en deux {{hémistiches}}.',
    },
    {
      type: 'ordering',
      title: 'Remettre les mouvements dans l’ordre chronologique',
      items: ['Romantisme', 'Parnasse', 'Symbolisme', 'Surréalisme', 'Oulipo'],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Le e muet compte toujours en fin de vers.', answer: false, explanation: 'Il ne compte jamais en fin de vers ; il rend la rime féminine.' },
        { text: 'Rimbaud avait environ 16 ans quand il composa les poèmes du *Cahier de Douai*.', answer: true, explanation: 'Né en octobre 1854, il écrit ces poèmes en 1870.' },
        { text: 'Le poème en prose apparaît avec le surréalisme.', answer: false, explanation: 'Il date du XIXe siècle (Bertrand, 1842 ; Baudelaire, 1869).' },
        { text: '« Le Pont Mirabeau » ne comporte aucune ponctuation.', answer: true, explanation: 'Apollinaire supprime la ponctuation dans *Alcools* (1913).' },
        { text: 'Dans *La rage de l’expression*, Ponge ne publie que des poèmes achevés.', answer: false, explanation: 'Il publie notes, brouillons et variantes : c’est l’atelier du poète.' },
      ],
    },
    {
      type: 'reveal',
      title: 'Révéler : la « chute » du Dormeur du val',
      content: [
        { type: 'quote', text: 'Les parfums ne font pas frissonner sa narine ;\nIl dort dans le soleil, la main sur sa poitrine,\nTranquille. Il a deux trous rouges au côté droit.', author: 'Rimbaud', source: '« Le Dormeur du val », v. 12-14' },
        { type: 'p', text: 'Le rejet « Tranquille. » suspend le rythme ; la phrase finale, d’une sobriété clinique, révèle la mort par la couleur rouge (les blessures), seule note violente du tableau.' },
      ],
    },
  ],
}

export default chapter
