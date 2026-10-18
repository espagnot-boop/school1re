import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'metropolisation',
  subject: 'histoire-geo',
  order: 5,
  title: `La métropolisation : un processus mondial différencié`,
  theme: `Géographie — Thème 1`,
  summary: `La métropolisation concentre population, richesses, pouvoirs et flux dans de grandes villes connectées à l’échelle mondiale ; elle prend des formes très différentes selon les régions du monde et recompose les territoires, en France comme ailleurs.`,
  duration: `4 à 5 semaines`,
  objectives: [
    `Définir métropole, mégapole, ville mondiale et métropolisation, et les distinguer de l’urbanisation.`,
    `Expliquer la hiérarchie mondiale des villes et le fonctionnement en réseau des métropoles.`,
    `Analyser les recompositions internes des métropoles : étalement, gentrification, ségrégation, fragmentation.`,
    `Montrer les différences de métropolisation entre pays du Nord, émergents et pays du Sud (études de cas).`,
    `Étudier le cas français : Paris, les métropoles régionales, la loi MAPTAM, les relations avec les territoires environnants.`,
    `Réaliser un croquis ou un schéma de synthèse avec une légende organisée.`,
  ],
  keywords: [`métropolisation`, `métropole`, `mégapole`, `ville mondiale`, `gentrification`, `ségrégation socio-spatiale`, `étalement urbain`, `périurbanisation`, `CBD`, `MAPTAM`, `Grand Paris`, `Mumbai`],

  fiche: [
    { type: 'h2', text: `L’essentiel` },
    { type: 'callout', variant: 'definition', title: `Notions clés`, content: [
      { type: 'keyvalue', items: [
        { key: `Urbanisation`, value: `Augmentation de la part de population vivant en ville et extension des espaces urbanisés.` },
        { key: `Métropolisation`, value: `Processus de concentration des hommes, activités, fonctions de commandement et richesses dans les plus grandes villes (les métropoles), qui sont de plus en plus connectées entre elles à l’échelle mondiale.` },
        { key: `Métropole`, value: `Grande ville qui concentre les fonctions de décision, de recherche, de services rares et dont l’influence dépasse largement son agglomération.` },
        { key: `Mégapole / mégalopole`, value: `Mégapole : ville de plus de 10 millions d’habitants. Mégalopole : ensemble de villes proches et reliées formant une vaste région urbaine continue (ex. BosWash).` },
        { key: `Ville mondiale`, value: `Métropole au sommet de la hiérarchie urbaine, qui commande l’économie mondiale (New York, Londres, Tokyo, Paris, Shanghai…).` },
      ] },
    ] },
    { type: 'h3', text: `Trois idées-forces` },
    { type: 'list', items: [
      `**Un processus mondial** : en 2018, 55 % des humains vivent en ville (ONU) ; 33 villes dépassent 10 millions d’habitants en 2025, dont 19 en Asie.`,
      `**Un processus différencié** : intensité, rythme et formes varient (villes du Nord, émergentes, pays les moins avancés ; villes de rang mondial ou secondaires).`,
      `**Un processus qui recompose les territoires** : étalement, gentrification, ségrégation, fragmentation ; en France, hypertrophie de Paris et affirmation de métropoles régionales.`,
    ] },
    { type: 'h3', text: `Chiffres clés` },
    { type: 'table', headers: [`Donnée`, `Valeur`, `Source`], rows: [
      [`Population urbaine mondiale`, `55 % en 2018 ; 68 % attendus en 2050`, `ONU, World Urbanization Prospects 2018`],
      [`Mégapoles (> 10 M hab.)`, `33 en 2025 (8 en 1975), dont 19 en Asie`, `ONU, WUP 2025`],
      [`Ville la plus peuplée`, `Jakarta ≈ 42 M (WUP 2025, nouvelle méthode) ; Tokyo ≈ 37 M selon le WUP 2018`, `ONU`],
      [`Île-de-France`, `≈ 12,3 M d’habitants (≈ 18 % de la population française), ≈ 30 % du PIB national`, `INSEE, 2021`],
      [`Métropoles françaises`, `22 métropoles (statut législatif)`, `Loi MAPTAM 2014, état 2018`],
    ] },
    { type: 'callout', variant: 'remember', title: `À retenir`, content: [
      { type: 'p', text: `La métropolisation est un **processus** (mouvement de concentration), l’urbanisation est un **fait** (croissance des villes). Une métropole se définit moins par sa taille que par ses **fonctions** (commandement, innovation, connexion).` },
    ] },
    { type: 'h3', text: `Plan de la composition / du croquis` },
    { type: 'list', ordered: true, items: [
      `Une hiérarchie mondiale : des villes mondiales en réseau, des métropoles inégalement intégrées.`,
      `Des recompositions internes : centre attractif et valorisé, périphéries étalées, inégalités et fragmentation.`,
      `En France : Paris dominante, des métropoles régionales à l’influence variable, des territoires en marge.`,
    ] },
  ],

  cours: [
    { type: 'h2', text: `I. La métropolisation, un processus mondial` },
    { type: 'h3', text: `A. De l’urbanisation à la métropolisation` },
    { type: 'p', text: `Depuis 1950, la population urbaine mondiale a été multipliée par plus de six : de 30 % de la population mondiale en 1950 à **55 % en 2018** (ONU). Elle devrait atteindre **68 % en 2050**. Cette croissance se fait surtout en Asie et en Afrique, alors que l’Europe et l’Amérique du Nord sont déjà très urbanisées (plus de 75-80 %).` },
    { type: 'p', text: `Mais l’urbanisation ne signifie pas uniquement croissance des villes. Les plus grandes villes captent une part croissante des richesses, des emplois qualifiés et des pouvoirs : c’est la **métropolisation**.` },
    { type: 'callout', variant: 'definition', title: `Métropolisation`, content: [
      { type: 'p', text: `Processus de **concentration** de la population, des activités économiques à haute valeur ajoutée, des fonctions de décision et de la richesse dans les grandes villes, qui s’accompagne d’une **mise en réseau** de ces villes à l’échelle mondiale grâce aux flux (capitaux, informations, personnes, marchandises).` },
    ] },
    { type: 'callout', variant: 'warning', title: `Piège`, content: [
      { type: 'p', text: `Ne confondez pas **mégapole** (critère démographique : plus de 10 millions d’habitants) et **métropole** (critère fonctionnel). Lagos est une mégapole mais une métropole moins bien intégrée à la mondialisation que Singapour, qui compte environ 6 millions d’habitants.` },
    ] },
    { type: 'h3', text: `B. Les moteurs de la métropolisation` },
    { type: 'grid', columns: 3, items: [
      { title: `Concentration des fonctions`, text: `Sièges sociaux de firmes transnationales, services financiers, juridiques, conseil, recherche, enseignement supérieur : le **tertiaire supérieur** s’installe dans les métropoles.`, icon: 'Building2' },
      { title: `Connexion`, text: `Aéroports (hubs), ports, gares TGV, réseaux numériques, grands événements : la métropole est un **nœud** des flux mondiaux.`, icon: 'Plane' },
      { title: `Attractivité`, text: `Marchés du travail diversifiés, universités, offre culturelle, image de marque : les métropoles attirent les talents (« classe créative »), les investisseurs et les touristes.`, icon: 'Sparkles' },
    ] },
    { type: 'h3', text: `C. Une hiérarchie des villes mondiales` },
    { type: 'p', text: `Le réseau **GaWC** (Globalization and World Cities, université de Loughborough) classe les villes selon la présence de services aux entreprises (banque, comptabilité, droit, publicité, conseil). **New York et Londres** forment le sommet (catégorie « Alpha++ »). Viennent ensuite des villes comme Paris, Tokyo, Hong Kong, Singapour, Shanghai, Pékin ou Dubaï. Les trois grands pôles de la **Triade** (Amérique du Nord, Europe de l’Ouest, Asie orientale) concentrent historiquement les villes mondiales, mais l’Asie-Pacifique a vu monter plusieurs métropoles (Shanghai, Singapour, Dubaï…).` },
    { type: 'table', caption: `Quelques types de métropoles (exemples)`, headers: [`Type`, `Exemples`, `Caractéristiques`], rows: [
      [`Villes mondiales de rang 1`, `New York, Londres`, `Places financières majeures, sièges sociaux, rayonnement culturel et politique`],
      [`Grandes métropoles du Nord`, `Paris, Tokyo, Chicago, Los Angeles`, `Poids économique et politique, forte attractivité, coût de la vie élevé`],
      [`Métropoles émergentes`, `Shanghai, Singapour, São Paulo, Mumbai, Dubaï`, `Croissance rapide, intégration croissante aux flux mondiaux, fortes inégalités`],
      [`Mégapoles des pays pauvres`, `Lagos, Dacca, Kinshasa`, `Croissance démographique massive, sous-équipement, économie informelle, faible intégration`],
    ] },
    { type: 'callout', variant: 'remember', title: `Une logique d’archipel`, content: [
      { type: 'p', text: `Les métropoles sont reliées entre elles par des flux plus intenses qu’avec leur arrière-pays : on parle d’**archipel métropolitain mondial** (Pierre Veltz). Une métropole est souvent plus proche économiquement d’une autre métropole lointaine que de la petite ville voisine.` },
    ] },
    { type: 'svg', maxWidth: 720, caption: `Schéma : la hiérarchie et la mise en réseau des villes mondiales (représentation schématique, non à l’échelle)`, svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<rect x="4" y="4" width="712" height="392" class="svg-card" fill="none" stroke="currentColor" stroke-opacity="0.3"/>
<ellipse cx="130" cy="150" rx="105" ry="75" fill="hsl(217 91% 60%)" fill-opacity="0.12" stroke="hsl(217 91% 60%)"/>
<text x="130" y="85" text-anchor="middle" fill="currentColor" font-size="12">Amérique du Nord</text>
<ellipse cx="360" cy="125" rx="95" ry="65" fill="hsl(217 91% 60%)" fill-opacity="0.12" stroke="hsl(217 91% 60%)"/>
<text x="360" y="68" text-anchor="middle" fill="currentColor" font-size="12">Europe de l’Ouest</text>
<ellipse cx="600" cy="165" rx="95" ry="75" fill="hsl(217 91% 60%)" fill-opacity="0.12" stroke="hsl(217 91% 60%)"/>
<text x="600" y="100" text-anchor="middle" fill="currentColor" font-size="12">Asie orientale</text>
<g stroke="hsl(0 84% 60%)" stroke-width="3" fill="none"><line x1="165" y1="150" x2="330" y2="130"/><line x1="395" y1="130" x2="570" y2="165"/><path d="M150 205 Q380 330 585 215"/></g>
<circle cx="150" cy="150" r="11" fill="hsl(0 84% 60%)"/><text x="150" y="154" text-anchor="middle" fill="#fff" font-size="9">NY</text>
<circle cx="345" cy="132" r="11" fill="hsl(0 84% 60%)"/><text x="345" y="136" text-anchor="middle" fill="#fff" font-size="9">Lon.</text>
<circle cx="385" cy="148" r="8" fill="hsl(25 95% 53%)"/><text x="405" y="165" fill="currentColor" font-size="10">Paris</text>
<circle cx="615" cy="150" r="8" fill="hsl(25 95% 53%)"/><text x="628" y="146" fill="currentColor" font-size="10">Tokyo</text>
<circle cx="585" cy="185" r="8" fill="hsl(25 95% 53%)"/><text x="535" y="190" fill="currentColor" font-size="10">Shanghai</text>
<circle cx="555" cy="235" r="7" fill="hsl(25 95% 53%)"/><text x="565" y="250" fill="currentColor" font-size="10">Singapour</text>
<circle cx="470" cy="215" r="7" fill="hsl(25 95% 53%)"/><text x="470" y="236" text-anchor="middle" fill="currentColor" font-size="10">Dubaï</text>
<circle cx="170" cy="260" r="7" fill="hsl(25 95% 53%)"/><text x="182" y="276" fill="currentColor" font-size="10">São Paulo</text>
<circle cx="380" cy="270" r="7" fill="hsl(142 71% 45%)"/><text x="392" y="286" fill="currentColor" font-size="10">Lagos</text>
<circle cx="500" cy="280" r="7" fill="hsl(142 71% 45%)"/><text x="512" y="296" fill="currentColor" font-size="10">Mumbai</text>
<g font-size="11" fill="currentColor"><text x="20" y="335" font-weight="bold">Légende</text>
<ellipse cx="30" cy="350" rx="10" ry="6" fill="hsl(217 91% 60%)" fill-opacity="0.2" stroke="hsl(217 91% 60%)"/><text x="46" y="354">Pôle de la Triade</text>
<circle cx="190" cy="350" r="7" fill="hsl(0 84% 60%)"/><text x="203" y="354">Ville mondiale de rang 1</text>
<circle cx="360" cy="350" r="6" fill="hsl(25 95% 53%)"/><text x="372" y="354">Ville mondiale / grande métropole</text>
<circle cx="580" cy="350" r="6" fill="hsl(142 71% 45%)"/><text x="592" y="354">Métropole du Sud</text>
<line x1="20" y1="375" x2="48" y2="375" stroke="hsl(0 84% 60%)" stroke-width="3"/><text x="56" y="379">Flux majeurs entre métropoles</text></g>
</svg>` },

    { type: 'h2', text: `II. Les recompositions internes des métropoles` },
    { type: 'h3', text: `A. Un centre attractif et valorisé` },
    { type: 'p', text: `Le centre concentre les fonctions de commandement, souvent regroupées dans un quartier d’affaires (**CBD**, *Central Business District* : Manhattan, La Défense, la City, Lujiazui à Shanghai). Le patrimoine, le commerce de luxe et la culture y renforcent l’image de la métropole. Les prix de l’immobilier y sont très élevés.` },
    { type: 'callout', variant: 'definition', title: `Gentrification`, content: [
      { type: 'p', text: `Processus par lequel un quartier populaire central ou péricentral est investi par des ménages plus aisés (réhabilitation, hausse des loyers) qui remplacent progressivement les anciens habitants. Exemples : Docklands de Londres, Brooklyn à New York, Belleville ou Montreuil près de Paris.` },
    ] },
    { type: 'h3', text: `B. Un étalement urbain` },
    { type: 'p', text: `La croissance se fait aussi par **étalement** : la ville s’étend en périphérie (périurbanisation) grâce à l’automobile, aux infrastructures (autoroutes, RER, métro), à la recherche de logements moins chers et plus spacieux. L’espace métropolitain devient discontinu, avec un tissu lâche (lotissements, zones commerciales, parcs d’activités) : on parle de ville **diffuse**. Les conséquences sont fortes : artificialisation des sols, mobilités pendulaires, pollution, congestion.` },
    { type: 'h3', text: `C. Inégalités, ségrégation et fragmentation` },
    { type: 'p', text: `La métropolisation produit des **inégalités sociales** que l’on retrouve dans l’espace :` },
    { type: 'list', items: [
      `**Ségrégation socio-spatiale** : séparation des groupes sociaux dans l’espace urbain (quartiers riches/quartiers pauvres, grands ensembles, bidonvilles).`,
      `**Fragmentation** : coupures spatiales et sociales parfois matérialisées par des barrières (*gated communities*, résidences sécurisées de São Paulo, Johannesburg ou Los Angeles).`,
      `**Étalement et précarité** : dans les villes du Sud, les périphéries accueillent souvent des quartiers informels sans services de base.`,
    ] },
    { type: 'svg', maxWidth: 720, caption: `Schéma : les recompositions spatiales d’une métropole (modèle simplifié)`, svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<rect x="4" y="4" width="712" height="412" fill="none" stroke="currentColor" stroke-opacity="0.3"/>
<circle cx="230" cy="205" r="190" fill="hsl(142 71% 45%)" fill-opacity="0.08" stroke="hsl(142 71% 45%)" stroke-dasharray="6 4"/>
<circle cx="230" cy="205" r="130" fill="hsl(25 95% 53%)" fill-opacity="0.12" stroke="hsl(25 95% 53%)"/>
<circle cx="230" cy="205" r="75" fill="hsl(263 70% 60%)" fill-opacity="0.15" stroke="hsl(263 70% 60%)"/>
<circle cx="230" cy="205" r="28" fill="hsl(0 84% 60%)" fill-opacity="0.85"/>
<text x="230" y="209" text-anchor="middle" fill="#fff" font-size="11">CBD</text>
<path d="M258 205 L420 205 M230 233 L230 395 M202 205 L40 205" stroke="currentColor" stroke-width="2" fill="none"/>
<path d="M230 177 L230 20" stroke="currentColor" stroke-width="2" fill="none"/>
<rect x="170" y="130" width="14" height="14" fill="hsl(217 91% 60%)"/><text x="190" y="142" fill="currentColor" font-size="10">gentrification</text>
<rect x="95" y="95" width="12" height="12" fill="hsl(0 84% 60%)"/><text x="112" y="106" fill="currentColor" font-size="10">zone d’activités</text>
<rect x="335" y="260" width="12" height="12" fill="hsl(217 91% 60%)" fill-opacity="0.3" stroke="hsl(217 91% 60%)"/><text x="352" y="271" fill="currentColor" font-size="10">gated community</text>
<rect x="95" y="300" width="12" height="12" fill="hsl(0 84% 60%)" fill-opacity="0.3" stroke="hsl(0 84% 60%)"/><text x="112" y="311" fill="currentColor" font-size="10">quartier précaire</text>
<g font-size="11" fill="currentColor">
<text x="470" y="40" font-weight="bold">Légende</text>
<text x="470" y="62" font-weight="bold" font-size="11">1. Une organisation en auréoles</text>
<circle cx="480" cy="78" r="7" fill="hsl(0 84% 60%)"/><text x="494" y="82">Centre d’affaires (CBD)</text>
<circle cx="480" cy="100" r="7" fill="hsl(263 70% 60%)" fill-opacity="0.4" stroke="hsl(263 70% 60%)"/><text x="494" y="104">Péricentre (habitat dense, gentrification)</text>
<circle cx="480" cy="122" r="7" fill="hsl(25 95% 53%)" fill-opacity="0.4" stroke="hsl(25 95% 53%)"/><text x="494" y="126">Banlieue (grands ensembles, pavillons)</text>
<circle cx="480" cy="144" r="7" fill="hsl(142 71% 45%)" fill-opacity="0.3" stroke="hsl(142 71% 45%)" stroke-dasharray="3 2"/><text x="494" y="148">Périurbain (étalement, mobilités pendulaires)</text>
<text x="470" y="180" font-weight="bold" font-size="11">2. Des recompositions</text>
<rect x="473" y="190" width="12" height="12" fill="hsl(217 91% 60%)"/><text x="494" y="200">Quartier gentrifié</text>
<rect x="473" y="212" width="12" height="12" fill="hsl(217 91% 60%)" fill-opacity="0.3" stroke="hsl(217 91% 60%)"/><text x="494" y="222">Enclave fermée (fragmentation)</text>
<rect x="473" y="234" width="12" height="12" fill="hsl(0 84% 60%)" fill-opacity="0.3" stroke="hsl(0 84% 60%)"/><text x="494" y="244">Quartier défavorisé, habitat informel</text>
<rect x="473" y="256" width="12" height="12" fill="hsl(0 84% 60%)"/><text x="494" y="266">Zone d’activités / pôle logistique</text>
<text x="470" y="296" font-weight="bold" font-size="11">3. Les liaisons</text>
<line x1="472" y1="308" x2="490" y2="308" stroke="currentColor" stroke-width="2"/><text x="498" y="312">Axes de transport (routes, RER, métro)</text>
</g>
</svg>` },
    { type: 'callout', variant: 'tip', title: `La ville durable`, content: [
      { type: 'p', text: `Face aux problèmes (pollution, congestion, artificialisation), les métropoles cherchent des réponses : transports en commun, mobilités douces, densification, « ville du quart d’heure » (Paris), éco-quartiers, *smart city*. Ces politiques peuvent toutefois accentuer la gentrification en renchérissant le foncier.` },
    ] },

    { type: 'h2', text: `III. Des métropoles aux visages différents : études de cas` },
    { type: 'h3', text: `A. Londres et New York : villes mondiales du Nord` },
    { type: 'p', text: `Londres et New York sont les deux places financières de rang mondial. Londres : la **City** (place financière), **Canary Wharf** (ancien Docklands reconverti en quartier d’affaires à partir des années 1980), environ 8,8 millions d’habitants dans le Grand Londres (recensement 2021). Les prix du logement y sont parmi les plus élevés d’Europe : les classes moyennes sont repoussées vers la périphérie.` },
    { type: 'h3', text: `B. Mumbai : métropole émergente et inégalités` },
    { type: 'p', text: `**Mumbai** (Bombay), capitale financière de l’Inde, compte environ 12,5 millions d’habitants dans la municipalité et plus de 20 millions dans l’agglomération. Elle abrite la Bourse, les sièges de grandes entreprises (Tata, Reliance) et l’industrie cinématographique (Bollywood). Mais près de la moitié de la population vit dans des quartiers informels (*slums*). **Dharavi**, l’un des plus grands bidonvilles d’Asie, concentre plusieurs centaines de milliers d’habitants (les estimations vont de 600 000 à 1 million) sur environ 2 km², en plein cœur de la ville, à proximité du quartier d’affaires de Bandra-Kurla. Un projet de rénovation de grande ampleur, confié à un groupe privé indien, illustre les tensions entre valorisation foncière et droit au logement.` },
    { type: 'h3', text: `C. Dubaï, Lagos, Shanghai : trajectoires contrastées` },
    { type: 'table', headers: [`Métropole`, `Caractère dominant`, `Ce qu’elle illustre`], rows: [
      [`Dubaï (Émirats)`, `Métropole planifiée, hub aérien (Emirates) et portuaire (Jebel Ali), tourisme, finance`, `Une métropolisation voulue par l’État et fondée sur les flux et l’image`],
      [`Lagos (Nigeria)`, `Mégapole de plus de 15 millions d’habitants, économie très informelle`, `Une croissance démographique sans intégration forte à la mondialisation`],
      [`Shanghai (Chine)`, `Premier port à conteneurs du monde, quartier d’affaires de Pudong (Lujiazui), ≈ 25 millions d’habitants`, `L’émergence de villes mondiales asiatiques (voir chapitre La Chine)`],
    ] },
    { type: 'callout', variant: 'remember', title: `Un processus différencié`, content: [
      { type: 'list', items: [
        `**Selon le niveau de développement** : métropoles du Nord (mondiales, post-industrielles), émergentes (croissance rapide, contrastes), pays pauvres (croissance subie).`,
        `**Selon la place dans la hiérarchie** : de New York à une métropole secondaire.`,
        `**Selon le rôle de l’État et du marché** : Dubaï, Singapour (planification) / villes nord-américaines (marché, étalement).`,
      ] },
    ] },

    { type: 'h2', text: `IV. En France : une métropolisation à deux vitesses` },
    { type: 'h3', text: `A. Paris, métropole de rang mondial` },
    { type: 'p', text: `L’Île-de-France compte environ **12,3 millions d’habitants (2021)**, soit près de 18 % de la population française, sur 2 % du territoire, et produit près de **30 % du PIB**. Elle concentre les sièges sociaux (une très large part des sièges des grandes entreprises françaises), les fonctions politiques, les grandes universités et grandes écoles, une forte proportion des cadres des fonctions métropolitaines, deux grands aéroports internationaux (Roissy-Charles-de-Gaulle, Orly) et des quartiers d’affaires (**La Défense**, premier quartier d’affaires européen par la surface de bureaux). Paris est classée parmi les villes mondiales les plus importantes (GaWC).` },
    { type: 'p', text: `La métropole est aussi très inégale : écarts de revenus et de prix de l’immobilier entre l’ouest et le sud-ouest (Paris, Hauts-de-Seine, Yvelines) et le nord-est (Seine-Saint-Denis). La **Seine-Saint-Denis** est le département le plus pauvre de France métropolitaine (taux de pauvreté de l’ordre de 28 %).` },
    { type: 'callout', variant: 'example', title: `Le Grand Paris`, content: [
      { type: 'p', text: `Depuis 2016 existe la **Métropole du Grand Paris** (131 communes : Paris et la petite couronne plus quelques communes voisines, environ 7 millions d’habitants). Le projet du **Grand Paris Express** vise à créer environ 200 km de lignes de métro automatique autour de Paris (lignes 15, 16, 17, 18 et prolongement de la 14) pour relier les banlieues sans passer par le centre ; la mise en service est progressive depuis 2024. Les Jeux olympiques de 2024 ont accéléré des aménagements en Seine-Saint-Denis (Village olympique, Centre aquatique).` },
    ] },
    { type: 'h3', text: `B. Les métropoles régionales` },
    { type: 'p', text: `La loi **MAPTAM** (2014, « modernisation de l’action publique territoriale et d’affirmation des métropoles ») crée un statut de **métropole** pour les grandes agglomérations (22 métropoles en 2018) : Lyon (collectivité à statut particulier), Aix-Marseille-Provence, Toulouse, Lille, Bordeaux, Nantes, Strasbourg, Rennes, Montpellier, Grenoble… Elles ont des compétences élargies (urbanisme, transports, développement économique). Mais elles pèsent beaucoup moins que Paris : l’écart démographique et économique entre Paris et Lyon (≈ 2,3 M d’habitants dans l’aire d’attraction, soit 5 fois moins) est considérable. Toulouse (aéronautique et spatial, Airbus), Lyon (santé, chimie, finance), Grenoble (recherche), Lille (position de carrefour avec Bruxelles et Londres), Bordeaux (tourisme, TGV Paris en 2 h) cherchent à s’affirmer dans les réseaux européens.` },
    { type: 'h3', text: `C. Des territoires en marge ?` },
    { type: 'p', text: `La concentration des emplois qualifiés et des services dans les métropoles pose la question de la place des **villes moyennes** et des espaces ruraux (voir chapitre sur les espaces ruraux). Dans le débat public, on oppose une « France des métropoles » à une « France périphérique » (Christophe Guilluy), une analyse discutée par de nombreux géographes. Les politiques d’aménagement (Action Cœur de Ville, Petites villes de demain, réseau TGV, numérique) cherchent à rééquilibrer les territoires.` },
    { type: 'svg', maxWidth: 720, caption: `Croquis modèle : la France, une métropolisation à deux vitesses (schéma simplifié de l’hexagone)`, svg: `<svg viewBox="0 0 720 460" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<rect x="4" y="4" width="712" height="452" fill="none" stroke="currentColor" stroke-opacity="0.3"/>
<polygon points="190,40 270,30 330,60 370,110 360,160 380,230 330,300 300,370 230,420 170,400 100,380 90,300 60,230 90,160 40,110 100,70" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-width="1.5"/>
<path d="M230 100 L250 140" stroke="hsl(0 84% 60%)" stroke-width="4"/>
<path d="M255 135 L290 235" stroke="hsl(0 84% 60%)" stroke-width="3"/>
<path d="M250 140 L150 235" stroke="hsl(0 84% 60%)" stroke-width="3"/>
<path d="M250 140 L170 360" stroke="hsl(0 84% 60%)" stroke-width="3"/>
<path d="M250 140 L270 55" stroke="hsl(0 84% 60%)" stroke-width="3"/>
<path d="M290 235 L330 340" stroke="hsl(0 84% 60%)" stroke-width="3"/>
<circle cx="250" cy="140" r="22" fill="hsl(0 84% 60%)"/><text x="250" y="144" text-anchor="middle" fill="#fff" font-size="10">Paris</text>
<circle cx="290" cy="235" r="14" fill="hsl(25 95% 53%)"/><text x="310" y="232" fill="currentColor" font-size="11">Lyon</text>
<circle cx="330" cy="340" r="14" fill="hsl(25 95% 53%)"/><text x="268" y="345" fill="currentColor" font-size="11">Marseille</text>
<circle cx="195" cy="330" r="11" fill="hsl(25 95% 53%)"/><text x="215" y="326" fill="currentColor" font-size="11">Toulouse</text>
<circle cx="120" cy="285" r="10" fill="hsl(25 95% 53%)"/><text x="132" y="302" fill="currentColor" font-size="11">Bordeaux</text>
<circle cx="150" cy="190" r="9" fill="hsl(25 95% 53%)"/><text x="62" y="193" fill="currentColor" font-size="11">Nantes</text>
<circle cx="95" cy="130" r="8" fill="hsl(25 95% 53%)"/><text x="108" y="125" fill="currentColor" font-size="11">Rennes</text>
<circle cx="285" cy="62" r="9" fill="hsl(25 95% 53%)"/><text x="298" y="66" fill="currentColor" font-size="11">Lille</text>
<circle cx="345" cy="130" r="9" fill="hsl(25 95% 53%)"/><text x="318" y="152" fill="currentColor" font-size="11">Strasbourg</text>
<ellipse cx="225" cy="255" rx="40" ry="55" fill="hsl(263 70% 60%)" fill-opacity="0.1" stroke="hsl(263 70% 60%)" stroke-dasharray="5 4"/>
<g font-size="11" fill="currentColor"><text x="410" y="40" font-weight="bold">Légende</text>
<text x="410" y="62" font-weight="bold">1. Une métropole dominante</text>
<circle cx="422" cy="78" r="9" fill="hsl(0 84% 60%)"/><text x="440" y="82">Paris : ville mondiale, ≈ 30 % du PIB</text>
<text x="410" y="108" font-weight="bold">2. Des métropoles régionales</text>
<circle cx="422" cy="124" r="7" fill="hsl(25 95% 53%)"/><text x="440" y="128">Métropoles d’envergure européenne</text>
<text x="410" y="154" font-weight="bold">3. Des liaisons</text>
<line x1="412" y1="170" x2="434" y2="170" stroke="hsl(0 84% 60%)" stroke-width="4"/><text x="442" y="174">Axes de flux et LGV vers Paris</text>
<text x="410" y="204" font-weight="bold">4. Des territoires en marge</text>
<ellipse cx="422" cy="220" rx="12" ry="8" fill="hsl(263 70% 60%)" fill-opacity="0.2" stroke="hsl(263 70% 60%)" stroke-dasharray="4 3"/><text x="442" y="224">Territoires peu denses, éloignés des métropoles</text>
</g>
</svg>` },

    { type: 'h2', text: `Méthode : réaliser un croquis de géographie` },
    { type: 'steps', items: [
      { title: `1. Analyser le sujet`, text: `Identifier les mots-clés (« processus mondial différencié ») et l’échelle. Le croquis répond à la question posée ; il n’est pas un simple plan de carte.` },
      { title: `2. Construire un plan de légende`, text: `Trois parties maximum, titrées par des idées (et non des descriptions) : ex. « Une métropole dominante », « Des métropoles régionales inégales », « Des territoires en marge ». Chaque partie contient 2 à 4 figurés.` },
      { title: `3. Choisir des figurés adaptés`, text: `Ponctuels (cercles, carrés) pour les villes et leur importance, linéaires (flèches, traits) pour les flux et axes, surfaciques (aplats, hachures) pour les zones. Distinguer l’importance par la taille.` },
      { title: `4. Réaliser le croquis`, text: `Tracer d’abord le fond (contours), puis les figurés surfaciques, linéaires, ponctuels. Respecter la hiérarchie par la taille et les couleurs (chaudes pour le dominant). Placer la nomenclature (noms de lieux) lisiblement.` },
      { title: `5. Titrer et vérifier`, text: `Le titre reprend le sujet. Vérifier la légende (organisée, complète), l’orientation et l’échelle, la propreté.` },
    ] },
    { type: 'callout', variant: 'warning', title: `Erreurs à éviter`, content: [
      { type: 'list', items: [
        `Une légende sans organisation (liste de figurés sans titres de parties).`,
        `Des couleurs qui se confondent, ou des figurés non cités dans la légende.`,
        `Un croquis sans titre ni nomenclature.`,
        `Des flèches trop nombreuses : privilégier les flux principaux.`,
      ] },
    ] },
  ],

  exercices: [
    {
      id: 'metro-ex1', title: `Définir les notions`, difficulty: 1, duration: 10, tags: [`notions`],
      statement: [
        { type: 'p', text: `Définissez en une phrase chacune des notions suivantes, puis donnez un exemple : **métropolisation**, **mégapole**, **gentrification**, **ségrégation socio-spatiale**.` },
      ],
      hints: [`Pensez au critère de définition (taille, fonctions, processus social).`, `Un exemple précis et localisé vaut mieux qu’un exemple vague.`],
      solution: [
        { type: 'list', items: [
          `**Métropolisation** : processus de concentration des hommes, des activités et des fonctions de commandement dans les plus grandes villes, connectées à l’échelle mondiale. Exemple : Londres.`,
          `**Mégapole** : ville de plus de 10 millions d’habitants (critère démographique). Exemple : Lagos.`,
          `**Gentrification** : arrivée de ménages aisés dans un quartier populaire qui en transforme la population et le bâti. Exemple : les Docklands à Londres, Brooklyn à New York.`,
          `**Ségrégation socio-spatiale** : séparation des groupes sociaux dans l’espace urbain. Exemple : Dharavi et les quartiers d’affaires de Mumbai.`,
        ] },
      ],
    },
    {
      id: 'metro-ex2', title: `Analyser un tableau de chiffres`, difficulty: 1, duration: 15, tags: [`document`, `statistiques`],
      statement: [
        { type: 'table', caption: `Population urbaine mondiale (ONU, WUP 2018, % de la population totale)`, headers: [`Année`, `1950`, `1990`, `2018`, `2050 (prévision)`], rows: [[`Part urbaine`, `30 %`, `43 %`, `55 %`, `68 %`]] },
        { type: 'p', text: `1. Calculez l’augmentation en points de pourcentage entre 1950 et 2018. 2. Décrivez l’évolution. 3. Pourquoi ce document ne suffit-il pas à définir la métropolisation ?` },
      ],
      hints: [`Un point de pourcentage est la différence de deux pourcentages.`],
      solution: [
        { type: 'p', text: `1. 55 − 30 = **25 points** de pourcentage (la part urbaine a presque doublé).` },
        { type: 'p', text: `2. La part de population vivant en ville augmente de façon continue, et l’ONU prévoit qu’elle dépasse les deux tiers de l’humanité en 2050 (68 %).` },
        { type: 'p', text: `3. Le tableau mesure l’**urbanisation** (part de citadins), pas la **métropolisation** : il ne dit rien de la concentration des fonctions de commandement dans les plus grandes villes ni de leur mise en réseau. Il faut compléter avec des données sur les mégapoles, les sièges sociaux ou les flux.` },
      ],
    },
    {
      id: 'metro-ex3', title: `Mégapole ou métropole ?`, difficulty: 2, duration: 20, tags: [`réflexion`, `notions`],
      statement: [
        { type: 'p', text: `Lagos est une mégapole de plus de 15 millions d’habitants. Singapour (environ 6 millions d’habitants) est un des grands hubs mondiaux. En vous appuyant sur ces deux exemples, expliquez pourquoi une grande ville n’est pas forcément une métropole.` },
      ],
      hints: [`Quels critères définissent une métropole ?`, `Pensez à la connectivité, aux sièges sociaux, aux services rares.`],
      solution: [
        { type: 'p', text: `Une **mégapole** se définit par un seuil démographique ; une **métropole** par ses fonctions et sa connexion aux flux mondiaux.` },
        { type: 'p', text: `**Lagos** a une croissance démographique très rapide, mais son économie est encore largement informelle, ses infrastructures (transports, énergie, assainissement) sont insuffisantes, et elle accueille peu de fonctions de commandement mondiales : son intégration à la mondialisation reste limitée.` },
        { type: 'p', text: `**Singapour**, moins peuplée, est un port parmi les premiers du monde, une place financière, un hub aérien, le siège régional de nombreuses firmes : elle est très connectée et concentre des fonctions rares. Elle est classée parmi les premières villes mondiales par le GaWC.` },
        { type: 'p', text: `Conclusion : taille et rang mondial ne coïncident pas ; la métropolisation est un processus **différencié** qui dépend de la capacité d’une ville à concentrer des fonctions supérieures et à être connectée en réseau.` },
      ],
    },
    {
      id: 'metro-ex4', title: `Étude de document : Dharavi`, difficulty: 2, duration: 25, tags: [`document`, `étude de cas`],
      statement: [
        { type: 'quote', text: `Dharavi, au centre de Mumbai, s’étend sur environ deux kilomètres carrés ; on y trouve à la fois des logements précaires, des milliers de petits ateliers (cuir, poterie, recyclage) et des habitants dont les revenus alimentent l’économie de la métropole. Le terrain, proche du quartier d’affaires de Bandra-Kurla, est convoité par les promoteurs.`, source: `Synthèse d’après divers articles de presse` },
        { type: 'p', text: `1. Présentez ce document et dégagez les caractéristiques de Dharavi. 2. Montrez que ce quartier illustre à la fois l’intégration de Mumbai à la mondialisation et les inégalités. 3. Quels enjeux soulève un projet de rénovation ?` },
      ],
      hints: [`Opposez le quartier d’affaires voisin et le quartier informel.`, `Pensez à économie informelle, foncier, relogement.`],
      solution: [
        { type: 'p', text: `1. Le document est un extrait de synthèse journalistique sur Dharavi. Il montre un quartier central, dense (2 km²), mêlant habitat précaire et activités économiques informelles.` },
        { type: 'p', text: `2. Mumbai est capitale financière de l’Inde, avec un quartier d’affaires moderne (Bandra-Kurla) proche : la métropole est insérée dans les flux mondiaux. Mais Dharavi, où vivent des centaines de milliers d’habitants, montre une ségrégation socio-spatiale forte et l’importance de l’économie informelle qui fait fonctionner la ville.` },
        { type: 'p', text: `3. Les projets de rénovation soulèvent des enjeux de **valorisation foncière** (terrain central très convoité), de **relogement** des habitants et de **maintien des activités** informelles : il y a le risque d’une gentrification qui chasserait les plus pauvres.` },
      ],
    },
    {
      id: 'metro-ex5', title: `Schéma : la ville et ses couronnes`, difficulty: 2, duration: 25, tags: [`schéma`, `croquis`],
      statement: [
        { type: 'p', text: `Réalisez un schéma d’une métropole du Nord (type Londres ou Paris) montrant : le centre d’affaires, un quartier gentrifié, un quartier défavorisé de banlieue, le périurbain, les axes de transports. Organisez la légende en trois parties.` },
      ],
      hints: [`Utilisez des cercles concentriques et des figurés différents.`, `Titre de légende : par exemple « Un centre puissant », « Des périphéries contrastées », « Des liaisons ».`],
      solution: [
        { type: 'p', text: `Schéma attendu (voir le schéma du cours). Éléments : cercles concentriques (CBD au centre, péricentre, banlieue, périurbain), aplat pour la gentrification, hachures ou autre aplat pour un quartier défavorisé, traits épais pour les axes (autoroute, RER).` },
        { type: 'list', items: [
          `**I. Un centre puissant** : centre d’affaires (CBD) ; quartiers gentrifiés du péricentre.`,
          `**II. Des périphéries contrastées** : banlieues défavorisées (grands ensembles) ; périurbain pavillonnaire ; zones d’activités.`,
          `**III. Des liaisons** : axes de transport (RER, autoroutes) ; flèches vers les aéroports.`,
        ] },
        { type: 'p', text: `Le titre doit être explicite : « La recomposition spatiale d’une métropole du Nord ».` },
      ],
    },
    {
      id: 'metro-ex6', title: `Le Grand Paris : analyse d’un document`, difficulty: 2, duration: 25, tags: [`France`, `document`],
      statement: [
        { type: 'p', text: `À partir de vos connaissances et du texte suivant, expliquez en quoi le Grand Paris Express vise à corriger des inégalités.` },
        { type: 'quote', text: `Aujourd’hui, la majorité des transports en commun d’Île-de-France sont organisés en étoile autour de Paris. Pour aller d’une banlieue à une autre, il faut souvent passer par le centre. Le Grand Paris Express, métro automatique en rocade de 200 km environ, reliera les pôles de banlieue entre eux, ainsi que les aéroports et les pôles universitaires.`, source: `Synthèse d’après la Société des grands projets` },
      ],
      hints: [`Que signifie « organisé en étoile » ?`, `Quels territoires bénéficient le plus de ce projet ?`],
      solution: [
        { type: 'p', text: `Le réseau francilien actuel est **radial** : il est conçu pour amener les banlieusards vers Paris. Les déplacements de banlieue à banlieue sont longs et pénibles, ce qui pénalise les territoires de banlieue (notamment la Seine-Saint-Denis, plus pauvre) en termes d’accès à l’emploi et aux services.` },
        { type: 'p', text: `Le Grand Paris Express, métro **en rocade**, vise à relier directement les pôles de banlieue, les aéroports (Orly, Roissy) et les pôles de recherche (Saclay), favorisant l’accessibilité, le développement économique, la constitution de centralités secondaires (**polycentrisme**), l’emploi et l’attractivité.` },
        { type: 'p', text: `Limites : coût élevé (plusieurs dizaines de milliards d’euros), délais et risque de hausse des prix de l’immobilier autour des gares (gentrification).` },
      ],
    },
    {
      id: 'metro-ex7', title: `Composition type bac : les métropoles françaises`, difficulty: 3, duration: 45, tags: [`type bac`, `composition`],
      statement: [
        { type: 'p', text: `**Sujet** : « Paris et les métropoles régionales : une métropolisation à deux vitesses ? » Rédigez l’introduction et proposez un plan détaillé.` },
      ],
      hints: [`Dans l’introduction : accroche, définitions, problématique, annonce du plan.`, `Plan en trois parties : domination de Paris / affirmation des métropoles / territoires en marge.`],
      solution: [
        { type: 'p', text: `**Introduction (modèle)** : Avec 12,3 millions d’habitants et près de 30 % du PIB national, l’Île-de-France domine l’espace français. La métropolisation, processus de concentration des hommes, des activités et des pouvoirs dans les grandes villes, y prend une forme particulièrement marquée. Depuis la loi MAPTAM de 2014, 22 métropoles sont reconnues, et la question est de savoir si elles parviennent à rivaliser avec Paris. Dans quelle mesure la métropolisation en France est-elle à plusieurs vitesses ? Nous verrons d’abord la domination de Paris, puis l’affirmation inégale des métropoles régionales, enfin les territoires qui restent en marge.` },
        { type: 'list', ordered: true, items: [
          `**Paris, ville mondiale dominante** : poids démographique et économique, sièges sociaux, aéroports, La Défense, JO 2024, Grand Paris Express ; mais inégalités internes.`,
          `**Des métropoles régionales qui s’affirment** : statut MAPTAM, spécialisations (Toulouse aéronautique, Lyon santé, Grenoble recherche, Lille carrefour européen), TGV ; mais écart de poids avec Paris.`,
          `**Des territoires en marge et des inégalités** : villes moyennes et espaces ruraux, périurbain, politiques de rééquilibrage (Action Cœur de Ville, numérique).`,
        ] },
        { type: 'p', text: `**Conclusion** : la métropolisation française est inégale ; pour répondre à la question, on peut conclure que si Paris dominante, d’autres métropoles gagnent en autonomie, mais des fractures territoriales demeurent.` },
      ],
    },
  ],

  representations: [
    { type: 'timeline', events: [
      { date: `1950`, title: `30 % d’urbains`, text: `Premier jalon : un tiers de l’humanité vit en ville.` },
      { date: `1975`, title: `8 mégapoles`, text: `Selon l’ONU : 8 villes de plus de 10 millions d’habitants dans le monde.` },
      { date: `2007`, title: `Les urbains deviennent majoritaires`, text: `Pour la première fois, plus de la moitié de la population mondiale vit en ville (estimation ONU).` },
      { date: `2014`, title: `Loi MAPTAM`, text: `Création du statut de métropole en France.` },
      { date: `2016`, title: `Métropole du Grand Paris`, text: `Création de l’établissement public regroupant 131 communes.` },
      { date: `2024`, title: `JO de Paris et ligne 14 prolongée à Orly`, text: `Début de la mise en service du Grand Paris Express.` },
      { date: `2025`, title: `33 mégapoles`, text: `ONU, WUP 2025 : 33 villes de plus de 10 millions d’habitants.` },
    ] },
    { type: 'flashcards', cards: [
      { front: `Métropolisation`, back: `Processus de concentration des hommes, des activités, des fonctions de commandement et des richesses dans les grandes villes, connectées en réseau à l’échelle mondiale.` },
      { front: `Mégapole`, back: `Ville de plus de 10 millions d’habitants (critère démographique).` },
      { front: `Ville mondiale`, back: `Métropole au sommet de la hiérarchie urbaine, qui commande l’économie mondiale (New York, Londres…).` },
      { front: `CBD`, back: `Central Business District : quartier d’affaires concentrant sièges sociaux et services (La Défense, la City, Lujiazui).` },
      { front: `Gentrification`, back: `Remplacement de la population d’un quartier populaire par des ménages plus aisés.` },
      { front: `Ségrégation socio-spatiale`, back: `Séparation spatiale des groupes sociaux dans la ville.` },
      { front: `Fragmentation urbaine`, back: `Coupures spatiales et sociales dans la ville, parfois matérialisées par des barrières (gated communities).` },
      { front: `Étalement urbain / périurbanisation`, back: `Extension de la ville en périphérie, souvent de faible densité (lotissements, zones commerciales).` },
      { front: `Triade`, back: `Les trois pôles dominants de l’économie mondiale : Amérique du Nord, Europe de l’Ouest, Asie orientale.` },
      { front: `Loi MAPTAM (2014)`, back: `Loi de modernisation de l’action publique territoriale et d’affirmation des métropoles : crée le statut de métropole.` },
      { front: `Grand Paris Express`, back: `Projet de métro automatique en rocade autour de Paris (≈ 200 km, 4 nouvelles lignes + ligne 14 prolongée).` },
      { front: `Dharavi`, back: `Quartier informel au cœur de Mumbai (≈ 2 km², des centaines de milliers d’habitants) : symbole des inégalités métropolitaines.` },
    ] },
    { type: 'matching', title: `Associer chaque notion à sa définition`, pairs: [
      { left: `Métropolisation`, right: `Concentration des fonctions et des richesses dans les grandes villes en réseau` },
      { left: `Mégapole`, right: `Ville de plus de 10 millions d’habitants` },
      { left: `Gentrification`, right: `Embourgeoisement d’un quartier populaire` },
      { left: `Gated community`, right: `Résidence fermée et sécurisée` },
      { left: `CBD`, right: `Quartier d’affaires` },
      { left: `Périurbanisation`, right: `Étalement de la ville dans les campagnes proches` },
    ] },
    { type: 'truefalse', title: `Vrai ou faux ?`, statements: [
      { text: `Une mégapole est toujours une ville mondiale.`, answer: false, explanation: `Lagos est une mégapole mais pas une ville mondiale de rang élevé : métropole = fonctions, mégapole = taille.` },
      { text: `En 2018, plus de la moitié de la population mondiale vit en ville.`, answer: true, explanation: `55 % selon l’ONU.` },
      { text: `La métropolisation en France est équilibrée entre les régions.`, answer: false, explanation: `Paris domine largement (≈ 30 % du PIB).` },
      { text: `La loi MAPTAM (2014) a créé un statut de métropole.`, answer: true },
      { text: `La gentrification fait baisser les loyers dans les quartiers populaires.`, answer: false, explanation: `Elle fait monter les prix et chasse parfois les habitants modestes.` },
    ] },
    { type: 'svg', maxWidth: 560, caption: `Les trois dimensions de la métropolisation`, svg: `<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
<circle cx="200" cy="105" r="75" fill="hsl(217 91% 60%)" fill-opacity="0.25" stroke="hsl(217 91% 60%)"/>
<circle cx="280" cy="105" r="75" fill="hsl(0 84% 60%)" fill-opacity="0.25" stroke="hsl(0 84% 60%)"/>
<circle cx="240" cy="165" r="75" fill="hsl(142 71% 45%)" fill-opacity="0.25" stroke="hsl(142 71% 45%)"/>
<text x="165" y="85" fill="currentColor" text-anchor="middle">Concentration</text>
<text x="315" y="85" fill="currentColor" text-anchor="middle">Connexion</text>
<text x="240" y="205" fill="currentColor" text-anchor="middle">Inégalités</text>
<text x="240" y="130" fill="currentColor" text-anchor="middle" font-weight="bold">Métropolisation</text>
<text x="420" y="60" fill="currentColor" font-size="11">Hommes, richesses, pouvoirs</text>
<text x="420" y="110" fill="currentColor" font-size="11">Flux, hubs, réseau mondial</text>
<text x="420" y="170" fill="currentColor" font-size="11">Gentrification, ségrégation</text>
</svg>` },
    { type: 'qcm', questions: [
      { question: `Quelle part de la population mondiale vit en ville en 2018 (ONU) ?`, choices: [`30 %`, `45 %`, `55 %`, `75 %`], answer: 2, explanation: `55 % en 2018 ; 68 % attendus en 2050.` },
      { question: `Qu’est-ce qui définit principalement une métropole ?`, choices: [`Une population supérieure à 10 millions`, `La concentration de fonctions de commandement et la connexion aux flux mondiaux`, `L’absence de périphéries`, `Un climat tempéré`], answer: 1 },
      { question: `Quelles villes forment le sommet de la hiérarchie du GaWC ?`, choices: [`Paris et Tokyo`, `Londres et New York`, `Shanghai et Pékin`, `Dubaï et Singapour`], answer: 1 },
      { question: `Qu’est-ce que la gentrification ?`, choices: [`L’abandon d’un quartier`, `L’embourgeoisement d’un quartier populaire`, `La construction de grands ensembles`, `L’étalement des banlieues`], answer: 1 },
      { question: `Quel pourcentage approximatif du PIB français l’Île-de-France produit-elle ?`, choices: [`10 %`, `20 %`, `30 %`, `50 %`], answer: 2, explanation: `Près de 30 % du PIB sur 2 % du territoire.` },
      { question: `Quelle loi de 2014 crée le statut de métropole en France ?`, choices: [`Loi NOTRe`, `Loi MAPTAM`, `Loi Pasqua`, `Loi SRU`], answer: 1, explanation: `La loi MAPTAM (modernisation de l’action publique territoriale et d’affirmation des métropoles).` },
      { question: `Le Grand Paris Express est :`, choices: [`Un TGV vers Marseille`, `Un métro automatique en rocade autour de Paris`, `Une autoroute`, `Un aéroport`], answer: 1 },
      { question: `Dharavi est un quartier de :`, choices: [`Lagos`, `Dubaï`, `Mumbai`, `São Paulo`], answer: 2 },
    ] },
  ],
}

export default chapter
