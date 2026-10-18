import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'espaces-production',
  subject: 'histoire-geo',
  order: 6,
  title: `Une diversification des espaces et des acteurs de la production`,
  theme: `Géographie — Thème 2`,
  summary: `La production est organisée à l’échelle mondiale par des acteurs variés (firmes transnationales, États, organisations) qui fragmentent les chaînes de valeur et redessinent les espaces productifs ; en France, ces espaces se recomposent (désindustrialisation, métropoles, agriculture, tourisme).`,
  duration: `4 semaines`,
  objectives: [
    `Définir firme transnationale, chaîne de valeur mondiale, division internationale du travail, zone économique spéciale, flux.`,
    `Expliquer comment les FTN organisent la production à l’échelle mondiale (exemple : iPhone, Airbus).`,
    `Identifier les espaces de la production mondialisée : métropoles, ZES, ports, hubs, espaces agricoles.`,
    `Analyser la diversité des acteurs : firmes, États, collectivités, ONG, consommateurs.`,
    `Étudier les espaces productifs français : industrie, agriculture, tertiaire, tourisme, et leurs mutations.`,
    `Réaliser un croquis de synthèse à partir d’une carte ou de documents.`,
  ],
  keywords: [`firme transnationale`, `chaîne de valeur mondiale`, `délocalisation`, `division internationale du travail`, `ZES`, `hub`, `conteneur`, `maquiladora`, `désindustrialisation`, `réindustrialisation`, `Foxconn`, `Airbus`, `Fos-sur-Mer`],

  fiche: [
    { type: 'h2', text: `L’essentiel` },
    { type: 'callout', variant: 'definition', title: `Notions clés`, content: [
      { type: 'keyvalue', items: [
        { key: `Firme transnationale (FTN)`, value: `Entreprise implantée dans plusieurs pays, qui organise sa production à l’échelle mondiale à partir d’un siège situé dans un pays d’origine.` },
        { key: `Chaîne de valeur mondiale`, value: `Fragmentation d’un processus de production en étapes (conception, fabrication, assemblage, distribution, services) réparties dans différents pays.` },
        { key: `Division internationale du travail (DIT)`, value: `Répartition des tâches productives entre territoires selon leurs avantages (coût, qualification, ressources, taille du marché).` },
        { key: `Délocalisation`, value: `Transfert d’une activité de production vers un autre pays, souvent pour réduire les coûts.` },
        { key: `Zone économique spéciale (ZES)`, value: `Espace où l’État offre des avantages (fiscalité, douanes) pour attirer les investissements productifs (Shenzhen, maquiladoras mexicaines).` },
        { key: `Hub`, value: `Plateforme de correspondance qui concentre et redistribue les flux (port à conteneurs, aéroport).` },
      ] },
    ] },
    { type: 'h3', text: `Trois idées-forces` },
    { type: 'list', items: [
      `**La production est mondialisée** : les FTN fragmentent les chaînes de valeur pour tirer parti des différences entre territoires ; la conception et les services à forte valeur ajoutée restent dans les pays développés et les métropoles.`,
      `**Les acteurs et les espaces se diversifient** : à côté des FTN du Nord, des FTN des pays émergents (Huawei, Tata, Samsung…) ; des États qui attirent ou protègent ; des espaces productifs (ZES, ports, parcs technologiques).`,
      `**En France, la production se recompose** : désindustrialisation, concentration dans les métropoles et sur les littoraux, agriculture puissante, tourisme de premier rang mondial.`,
    ] },
    { type: 'h3', text: `Chiffres clés` },
    { type: 'table', headers: [`Donnée`, `Valeur`, `Source`], rows: [
      [`Part du transport maritime dans le commerce mondial de marchandises (volume)`, `≈ 80 %`, `CNUCED`],
      [`Premier port à conteneurs du monde`, `Shanghai : plus de 49 M d’EVP en 2023`, `Shanghai International Port Group / Lloyd’s List`],
      [`Part de l’industrie dans la valeur ajoutée française`, `≈ 10 % (contre ≈ 20 % en 1980)`, `INSEE`],
      [`Visiteurs internationaux en France`, `≈ 100 millions (1er rang mondial)`, `ONU Tourisme (OMT), 2023-2024`],
      [`Bangladesh : Rana Plaza (2013)`, `1 134 morts, effondrement d’un immeuble d’ateliers textiles`, `OIT`],
    ] },
    { type: 'callout', variant: 'remember', title: `À retenir`, content: [
      { type: 'p', text: `Une chaîne de valeur mondiale fragmente la production : les **tâches à forte valeur ajoutée** (conception, marketing, services) se concentrent dans les métropoles du Nord, les **tâches d’assemblage** vont vers des espaces à main-d’œuvre moins coûteuse, reliés par des **flux** (maritimes, aériens, numériques).` },
    ] },
  ],

  cours: [
    { type: 'h2', text: `I. La production à l’échelle mondiale : acteurs et chaînes de valeur` },
    { type: 'h3', text: `A. Les firmes transnationales, acteurs majeurs` },
    { type: 'p', text: `Une **firme transnationale (FTN)** possède des filiales dans plusieurs pays. Selon la CNUCED, on compte plus de 100 000 FTN (ordre de grandeur) et des centaines de milliers de filiales. Les 500 plus grandes entreprises mondiales réalisent à elles seules une part considérable du commerce et de la production. Leur chiffre d’affaires peut dépasser le PIB de nombreux États.` },
    { type: 'p', text: `Les FTN sont d’origine variée : États-Unis (Apple, Microsoft, Amazon, ExxonMobil), Europe (Volkswagen, TotalEnergies, LVMH, Airbus), Asie (Toyota, Samsung, Huawei, Alibaba, Tata). On voit apparaître des FTN des **pays émergents** qui investissent à l’étranger.` },
    { type: 'callout', variant: 'method', title: `Comment une FTN s’organise`, content: [
      { type: 'list', items: [
        `**Siège** : décisions stratégiques, finance, recherche (souvent dans une métropole du pays d’origine).`,
        `**Centres de R&D** : proches des pôles de recherche (Silicon Valley, Saclay, Bangalore).`,
        `**Sites de production** : implantés selon les coûts, les compétences, la taille du marché, les incitations publiques.`,
        `**Filiales commerciales** : proches des marchés de consommation.`,
      ] },
    ] },
    { type: 'h3', text: `B. Les chaînes de valeur mondiales` },
    { type: 'p', text: `Le processus de production est **fragmenté** : conception, fabrication de composants, assemblage, logistique, marketing, service après-vente sont répartis entre pays. Cette **division internationale du travail (DIT)** est permise par la baisse des coûts de transport (conteneurisation depuis les années 1960), les technologies de l’information, la libéralisation des échanges (GATT puis OMC) et l’ouverture de la Chine (entrée à l’OMC en 2001).` },
    { type: 'callout', variant: 'definition', title: `La courbe du sourire`, content: [
      { type: 'p', text: `Schéma proposé par Stan Shih (fondateur d’Acer) dans les années 1990 : dans une chaîne de valeur, les étapes situées **en amont** (R&D, conception) et **en aval** (marketing, marque, services) créent le plus de valeur ajoutée, alors que la **fabrication et l’assemblage**, au milieu, en créent le moins. La courbe a la forme d’un sourire.` },
    ] },
    { type: 'svg', maxWidth: 720, caption: `La courbe du sourire : valeur ajoutée aux différentes étapes d’une chaîne de valeur`, svg: `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<rect x="4" y="4" width="712" height="332" fill="none" stroke="currentColor" stroke-opacity="0.3"/>
<line x1="60" y1="280" x2="680" y2="280" stroke="currentColor" stroke-width="1.5"/>
<line x1="60" y1="280" x2="60" y2="30" stroke="currentColor" stroke-width="1.5"/>
<text x="20" y="150" transform="rotate(-90 20 150)" fill="currentColor" font-size="11" text-anchor="middle">Valeur ajoutée</text>
<path d="M80 70 Q370 330 660 70" stroke="hsl(0 84% 60%)" stroke-width="3" fill="none"/>
<g fill="currentColor" font-size="11" text-anchor="middle">
<text x="90" y="300">Recherche</text><text x="90" y="314">et conception</text>
<text x="215" y="300">Composants</text>
<text x="360" y="300">Assemblage</text>
<text x="500" y="300">Logistique,</text><text x="500" y="314">distribution</text>
<text x="630" y="300">Marque,</text><text x="630" y="314">services</text>
</g>
<circle cx="90" cy="82" r="6" fill="hsl(217 91% 60%)"/><circle cx="360" cy="195" r="6" fill="hsl(25 95% 53%)"/><circle cx="650" cy="82" r="6" fill="hsl(217 91% 60%)"/>
<text x="110" y="62" fill="currentColor" font-size="11">Pays développés, métropoles (Californie, Europe)</text>
<text x="360" y="225" text-anchor="middle" fill="currentColor" font-size="11">Pays à bas coûts (Chine, Vietnam, Mexique…)</text>
<text x="660" y="62" text-anchor="end" fill="currentColor" font-size="11">Pays développés</text>
</svg>` },
    { type: 'h3', text: `C. Étude de cas : l’iPhone d’Apple` },
    { type: 'p', text: `L’iPhone est **conçu en Californie** (siège d’Apple à Cupertino), avec des composants fabriqués dans plusieurs pays : écrans (Corée du Sud, Japon, Chine), processeurs (conçus par Apple, produits à Taïwan par TSMC), mémoire (Corée du Sud, Japon), puces et capteurs (États-Unis, Europe). L’**assemblage** est réalisé surtout en **Chine** (Zhengzhou, Shenzhen) par Foxconn, sous-traitant taïwanais, et depuis les années 2020 de plus en plus en **Inde** et au Vietnam. Une part très importante de la valeur ajoutée revient à Apple (conception, logiciel, marque), très peu à l’assemblage.` },
    { type: 'callout', variant: 'warning', title: `Vulnérabilités`, content: [
      { type: 'p', text: `Les chaînes de valeur dépendent de flux fluides et peuvent être perturbées : crise du Covid-19 (2020), pénurie de semi-conducteurs (2021), tensions commerciales sino-américaines, blocage du canal de Suez (mars 2021, l’*Ever Given*). D’où les politiques de **relocalisation** et de diversification (« friend-shoring »).` },
    ] },
    { type: 'h3', text: `D. Une diversité d’acteurs` },
    { type: 'grid', columns: 3, items: [
      { title: `Les États`, text: `Ils attirent les investissements (ZES, fiscalité), protègent leurs secteurs stratégiques (droits de douane, subventions), financent la recherche.`, icon: 'Landmark' },
      { title: `Les organisations internationales`, text: `OMC (règles du commerce), UE (marché unique, PAC), OIT (normes du travail), CNUCED.`, icon: 'Globe2' },
      { title: `Collectivités, ONG, consommateurs`, text: `Régions et métropoles (pôles de compétitivité), ONG (conditions de travail), consommateurs (labels, boycotts).`, icon: 'Users' },
    ] },

    { type: 'h2', text: `II. Des espaces de la production mondialisée` },
    { type: 'h3', text: `A. Les espaces moteurs : métropoles et technopôles` },
    { type: 'p', text: `La **conception**, la recherche, les sièges et les services aux entreprises se concentrent dans les **métropoles** et les **technopôles** (Silicon Valley, Paris-Saclay, Bangalore, Shenzhen). Ces espaces bénéficient de main-d’œuvre qualifiée, d’universités, de capitaux et de réseaux.` },
    { type: 'h3', text: `B. Les ateliers du monde : ZES et maquiladoras` },
    { type: 'p', text: `Les **ZES** attirent des industries d’assemblage grâce à des avantages fiscaux, des infrastructures et une main-d’œuvre peu coûteuse. Exemples : **Shenzhen** (créée en 1980, village de pêcheurs devenu métropole de plus de 17 millions d’habitants) ; les **maquiladoras** du nord du Mexique (usines d’assemblage à la frontière des États-Unis, développées depuis 1965, renforcées par l’ALENA en 1994 puis l’ACEUM/USMCA en 2020) ; le **Bangladesh** (textile : deuxième exportateur mondial de vêtements après la Chine, avec de très bas salaires et des conditions de travail dénoncées, notamment après la catastrophe du **Rana Plaza** en 2013 qui fit 1 134 morts).` },
    { type: 'h3', text: `C. Les flux : ports, hubs et routes maritimes` },
    { type: 'p', text: `Environ **80 % du volume du commerce mondial de marchandises** transite par voie maritime. Les routes se concentrent sur l’axe **Asie – Europe** (par le canal de Suez) et **transpacifique** ; les détroits (Malacca, Ormuz, Gibraltar, Bosphore) et canaux (Suez, Panama) sont des passages stratégiques. Les grands ports à conteneurs (**Shanghai**, **Singapour**, Ningbo-Zhoushan, Shenzhen, Rotterdam en Europe) sont des **hubs** et des interfaces entre l’espace maritime et les territoires productifs (zones industrialo-portuaires).` },
    { type: 'table', caption: `Quelques grands ports à conteneurs (ordre de grandeur, 2023, millions d’EVP)`, headers: [`Port`, `Trafic`, `Remarque`], rows: [
      [`Shanghai (Chine)`, `≈ 49`, `Premier port mondial depuis 2010`],
      [`Singapour`, `≈ 39`, `Hub entre océan Indien et Pacifique, détroit de Malacca`],
      [`Rotterdam (Pays-Bas)`, `≈ 13,4`, `Premier port européen`],
      [`Le Havre (France)`, `≈ 3`, `Premier port à conteneurs français ; ensemble HAROPA avec Rouen et Paris`],
      [`Marseille-Fos (France)`, `≈ 1,5`, `Premier port français pour le trafic total (hydrocarbures)`],
    ] },
    { type: 'callout', variant: 'definition', title: `EVP`, content: [
      { type: 'p', text: `**Équivalent vingt pieds** : unité de mesure des conteneurs (un conteneur standard de 20 pieds = 1 EVP, un de 40 pieds = 2 EVP).` },
    ] },
    { type: 'h3', text: `D. Les espaces agricoles et miniers` },
    { type: 'p', text: `L’**agriculture** aussi est mondialisée : le **Brésil** est premier exportateur mondial de soja (région du Mato Grosso, grandes exploitations, firmes comme Cargill ou Bunge), avec des conséquences environnementales (déforestation de l’Amazonie et du Cerrado). Les **ressources énergétiques et minières** (pétrole du golfe Persique, cobalt de la République démocratique du Congo, lithium de l’Amérique andine) font l’objet de stratégies d’États et de firmes.` },
    { type: 'svg', maxWidth: 760, caption: `Schéma : l’organisation spatiale d’une production mondialisée (exemple d’une FTN de l’électronique)`, svg: `<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<rect x="4" y="4" width="752" height="412" fill="none" stroke="currentColor" stroke-opacity="0.3"/>
<rect x="30" y="60" width="150" height="90" fill="hsl(217 91% 60%)" fill-opacity="0.15" stroke="hsl(217 91% 60%)"/>
<text x="105" y="82" text-anchor="middle" fill="currentColor" font-weight="bold">Pays d’origine</text>
<text x="105" y="102" text-anchor="middle" fill="currentColor" font-size="11">Siège, R&amp;D, conception</text>
<text x="105" y="118" text-anchor="middle" fill="currentColor" font-size="11">Marque, finance</text>
<text x="105" y="134" text-anchor="middle" fill="currentColor" font-size="11">(Californie)</text>
<rect x="300" y="20" width="150" height="80" fill="hsl(25 95% 53%)" fill-opacity="0.15" stroke="hsl(25 95% 53%)"/>
<text x="375" y="45" text-anchor="middle" fill="currentColor" font-weight="bold">Fournisseurs</text>
<text x="375" y="65" text-anchor="middle" fill="currentColor" font-size="11">Composants à haute technologie</text>
<text x="375" y="81" text-anchor="middle" fill="currentColor" font-size="11">(Corée, Taïwan, Japon)</text>
<rect x="300" y="170" width="150" height="80" fill="hsl(0 84% 60%)" fill-opacity="0.15" stroke="hsl(0 84% 60%)"/>
<text x="375" y="195" text-anchor="middle" fill="currentColor" font-weight="bold">Ateliers d’assemblage</text>
<text x="375" y="215" text-anchor="middle" fill="currentColor" font-size="11">ZES, sous-traitants</text>
<text x="375" y="231" text-anchor="middle" fill="currentColor" font-size="11">(Chine, Inde, Vietnam)</text>
<rect x="570" y="100" width="160" height="90" fill="hsl(142 71% 45%)" fill-opacity="0.15" stroke="hsl(142 71% 45%)"/>
<text x="650" y="125" text-anchor="middle" fill="currentColor" font-weight="bold">Marchés</text>
<text x="650" y="145" text-anchor="middle" fill="currentColor" font-size="11">Amérique du Nord, Europe,</text>
<text x="650" y="161" text-anchor="middle" fill="currentColor" font-size="11">Chine, Asie…</text>
<g stroke="currentColor" stroke-width="2" fill="none" marker-end="url(#ar)">
<defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="currentColor"/></marker></defs>
<line x1="180" y1="90" x2="298" y2="60" stroke="hsl(217 91% 60%)"/>
<line x1="180" y1="120" x2="298" y2="200" stroke="hsl(217 91% 60%)"/>
<line x1="375" y1="100" x2="375" y2="168" stroke="hsl(25 95% 53%)"/>
<line x1="450" y1="210" x2="568" y2="165" stroke="hsl(0 84% 60%)" stroke-width="4"/>
<line x1="450" y1="60" x2="568" y2="115" stroke="hsl(25 95% 53%)"/>
</g>
<ellipse cx="375" cy="330" rx="330" ry="35" fill="hsl(217 91% 60%)" fill-opacity="0.08" stroke="hsl(217 91% 60%)" stroke-dasharray="5 4"/>
<text x="375" y="334" text-anchor="middle" fill="currentColor" font-size="11">Routes maritimes, hubs portuaires et aériens (flux de marchandises et d’informations)</text>
<g font-size="11" fill="currentColor"><text x="30" y="385" font-weight="bold">Légende :</text>
<line x1="95" y1="381" x2="125" y2="381" stroke="hsl(217 91% 60%)" stroke-width="2"/><text x="130" y="385">Flux de conception / consignes</text>
<line x1="300" y1="381" x2="330" y2="381" stroke="hsl(25 95% 53%)" stroke-width="2"/><text x="335" y="385">Flux de composants</text>
<line x1="470" y1="381" x2="500" y2="381" stroke="hsl(0 84% 60%)" stroke-width="4"/><text x="505" y="385">Flux de produits finis</text></g>
</svg>` },

    { type: 'h2', text: `III. Les espaces productifs en France` },
    { type: 'h3', text: `A. Une industrie qui s’est transformée` },
    { type: 'p', text: `Depuis le milieu des années 1970, la France a connu une **désindustrialisation** : l’industrie représente environ **10 % de la valeur ajoutée** (contre près de 20 % en 1980) et environ 3 millions d’emplois (contre plus de 5 millions au milieu des années 1970). Les vieux bassins industriels (Nord, Lorraine, vallée de la Loire) ont été durement touchés ; la sidérurgie lorraine a décliné dès les années 1970-1980. L’industrie persiste dans des secteurs de pointe (aéronautique, spatial, luxe, pharmacie, agroalimentaire, automobile, énergie nucléaire) et dans des **pôles de compétitivité** (Toulouse, Grenoble, Saclay, Sophia-Antipolis).` },
    { type: 'p', text: `Depuis les années 2010 et la crise du Covid-19, on parle de **réindustrialisation** : plan *France Relance* (2020), *France 2030*, loi « industrie verte » (2023). Dans les Hauts-de-France, la « **vallée de la batterie** » (usines de batteries électriques à Douvrin, Dunkerque, Douai) en est un exemple.` },
    { type: 'callout', variant: 'example', title: `Airbus : une chaîne de valeur européenne et mondiale`, content: [
      { type: 'p', text: `Les avions Airbus sont conçus et assemblés à **Toulouse** (A320, A350, A380 jusqu’en 2021), **Hambourg** (A320), **Séville**, avec des éléments produits dans toute l’Europe (ailes au Royaume-Uni, fuselages en Allemagne, mâts moteurs et cockpit à Toulouse, etc.). Airbus a aussi des chaînes d’assemblage à **Tianjin** (Chine) et **Mobile** (États-Unis) pour se rapprocher des marchés. Les éléments sont transportés par bateau puis par un convoi routier spécial jusqu’à Toulouse, ou par avion-cargo Beluga. Le pôle toulousain concentre environ 100 000 emplois liés à l’aéronautique et au spatial dans la région.` },
    ] },
    { type: 'h3', text: `B. Les espaces industrialo-portuaires` },
    { type: 'p', text: `Les grandes zones industrialo-portuaires (ZIP), comme **Fos-sur-Mer** (Marseille-Fos, sidérurgie, raffinage, pétrochimie), **Dunkerque** (sidérurgie, nouveaux projets bas carbone, batteries), **Le Havre** (Axe Seine : HAROPA Port) articulent flux maritimes et production. Elles sont des **interfaces** entre la France, l’Europe et le monde, avec un enjeu de décarbonation.` },
    { type: 'h3', text: `C. Les services et le tourisme` },
    { type: 'p', text: `Le **tertiaire** représente environ 80 % de la valeur ajoutée et des emplois. Le **tourisme** place la France au 1er rang mondial pour les arrivées internationales (environ **100 millions** de visiteurs en 2023 et 2024) et représente entre 7 et 8 % du PIB. Les grands pôles : Paris (culture, affaires), littoraux (Côte d’Azur, Atlantique), montagnes (stations de ski des Alpes), Disneyland Paris (premier site touristique d’Europe en fréquentation). C’est un secteur majeur mais très concentré et sensible aux crises (attentats de 2015-2016, Covid-19).` },
    { type: 'h3', text: `D. Une puissance agricole` },
    { type: 'p', text: `La France est le **premier producteur agricole de l’Union européenne**. L’agriculture intensive (blé, betterave, maïs, élevage) côtoie des productions de qualité sous label (AOC, bio, Label rouge). La **PAC** (politique agricole commune), financée par l’UE, joue un rôle essentiel. L’**agro-industrie** (Danone, Lactalis, Bigard) est un acteur clé.` },
    { type: 'callout', variant: 'tip', title: `Les territoires productifs français`, content: [
      { type: 'list', items: [
        `**Les métropoles** concentrent services supérieurs, recherche et industries de pointe.`,
        `**Les littoraux et façades maritimes** : ZIP, tourisme.`,
        `**Les espaces ruraux** : agriculture, énergies renouvelables, tourisme vert.`,
        `**Les territoires en reconversion** : Nord, Lorraine ; pôles de compétitivité, réindustrialisation.`,
      ] },
    ] },
    { type: 'svg', maxWidth: 720, caption: `Croquis modèle : les espaces productifs en France (schéma simplifié)`, svg: `<svg viewBox="0 0 720 460" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<rect x="4" y="4" width="712" height="452" fill="none" stroke="currentColor" stroke-opacity="0.3"/>
<polygon points="190,40 270,30 330,60 370,110 360,160 380,230 330,300 300,370 230,420 170,400 100,380 90,300 60,230 90,160 40,110 100,70" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-width="1.5"/>
<ellipse cx="150" cy="150" rx="55" ry="45" fill="hsl(142 71% 45%)" fill-opacity="0.2" stroke="hsl(142 71% 45%)"/>
<ellipse cx="260" cy="150" rx="60" ry="40" fill="hsl(142 71% 45%)" fill-opacity="0.2" stroke="hsl(142 71% 45%)"/>
<ellipse cx="320" cy="85" rx="35" ry="25" fill="hsl(0 84% 60%)" fill-opacity="0.2" stroke="hsl(0 84% 60%)" stroke-dasharray="5 3"/>
<ellipse cx="345" cy="130" rx="25" ry="22" fill="hsl(0 84% 60%)" fill-opacity="0.2" stroke="hsl(0 84% 60%)" stroke-dasharray="5 3"/>
<circle cx="250" cy="150" r="14" fill="hsl(217 91% 60%)"/>
<circle cx="195" cy="330" r="9" fill="hsl(217 91% 60%)"/>
<circle cx="290" cy="235" r="9" fill="hsl(217 91% 60%)"/>
<circle cx="335" cy="340" r="9" fill="hsl(217 91% 60%)"/>
<rect x="185" y="360" width="14" height="14" fill="hsl(25 95% 53%)"/>
<rect x="300" y="320" width="14" height="14" fill="hsl(25 95% 53%)"/>
<rect x="195" y="85" width="14" height="14" fill="hsl(25 95% 53%)"/>
<rect x="305" y="55" width="14" height="14" fill="hsl(25 95% 53%)"/>
<path d="M210 360 L235 345" stroke="hsl(263 70% 60%)" stroke-width="3"/>
<path d="M310 225 L345 215 L365 195" stroke="hsl(263 70% 60%)" stroke-width="3"/>
<g font-size="10" fill="currentColor"><text x="262" y="154">Paris</text><text x="305" y="238">Lyon</text><text x="212" y="334">Toulouse</text><text x="92" y="153">Bretagne</text><text x="298" y="372">Fos</text><text x="165" y="373">Bordeaux</text><text x="222" y="92">Le Havre</text><text x="268" y="50">Dunkerque</text></g>
<g font-size="11" fill="currentColor"><text x="410" y="40" font-weight="bold">Légende</text>
<text x="410" y="62" font-weight="bold">1. Des espaces de l’innovation et des services</text>
<circle cx="422" cy="78" r="8" fill="hsl(217 91% 60%)"/><text x="440" y="82">Métropoles, technopôles, pôles de compétitivité</text>
<text x="410" y="112" font-weight="bold">2. Des interfaces maritimes</text>
<rect x="415" y="122" width="14" height="14" fill="hsl(25 95% 53%)"/><text x="440" y="134">Grands ports et zones industrialo-portuaires</text>
<text x="410" y="164" font-weight="bold">3. Des espaces agricoles puissants</text>
<ellipse cx="422" cy="180" rx="12" ry="8" fill="hsl(142 71% 45%)" fill-opacity="0.3" stroke="hsl(142 71% 45%)"/><text x="440" y="184">Agriculture intensive (Bretagne, Bassin parisien)</text>
<text x="410" y="214" font-weight="bold">4. Des territoires en reconversion</text>
<ellipse cx="422" cy="230" rx="12" ry="8" fill="hsl(0 84% 60%)" fill-opacity="0.2" stroke="hsl(0 84% 60%)" stroke-dasharray="4 3"/><text x="440" y="234">Anciens bassins industriels (Nord, Lorraine)</text>
<text x="410" y="264" font-weight="bold">5. Des axes de flux</text>
<line x1="412" y1="278" x2="434" y2="278" stroke="hsl(263 70% 60%)" stroke-width="3"/><text x="442" y="282">Axes Seine, Rhône-Saône</text>
</g>
</svg>` },

    { type: 'h2', text: `Méthode : analyser un document sur la production` },
    { type: 'steps', items: [
      { title: `1. Présenter le document`, text: `Nature (carte, texte, statistique, photo), auteur, source, date, sujet précis.` },
      { title: `2. Identifier les acteurs et les espaces`, text: `Qui produit (FTN, État, sous-traitant) ? Où (échelle locale, nationale, mondiale) ? Quels flux relient ces lieux ?` },
      { title: `3. Mettre en relation avec le cours`, text: `Mobilisez les notions : chaîne de valeur, DIT, ZES, hub, délocalisation.` },
      { title: `4. Dégager un enjeu`, text: `Gains (emplois, croissance) et limites (dépendance, environnement, conditions de travail, vulnérabilité).` },
    ] },
  ],

  exercices: [
    {
      id: 'prod-ex1', title: `Définir les notions`, difficulty: 1, duration: 10, tags: [`notions`],
      statement: [{ type: 'p', text: `Définissez : firme transnationale, chaîne de valeur mondiale, délocalisation, ZES, hub. Donnez un exemple pour chacune.` }],
      hints: [`Un exemple par notion suffit.`],
      solution: [{ type: 'list', items: [
        `**FTN** : entreprise implantée dans plusieurs pays (Apple, Toyota, Airbus).`,
        `**Chaîne de valeur mondiale** : étapes de production réparties dans différents pays (iPhone).`,
        `**Délocalisation** : transfert d’une production vers l’étranger (textile vers le Bangladesh).`,
        `**ZES** : espace à avantages fiscaux pour attirer des usines (Shenzhen).`,
        `**Hub** : plateforme de concentration et de redistribution des flux (port de Singapour, aéroport de Dubaï).`,
      ] }],
    },
    {
      id: 'prod-ex2', title: `Lire une courbe du sourire`, difficulty: 1, duration: 15, tags: [`schéma`],
      statement: [{ type: 'p', text: `Expliquez à quoi correspond la courbe du sourire et quelles étapes de la production d’un smartphone sont à haute et à basse valeur ajoutée.` }],
      hints: [`Où se situent conception et assemblage ?`],
      solution: [
        { type: 'p', text: `La courbe du sourire montre que la valeur ajoutée est élevée en **amont** (recherche, conception, design, logiciels) et en **aval** (marketing, marque, distribution, services), mais faible au **milieu** (fabrication et assemblage).` },
        { type: 'p', text: `Pour un smartphone : conception, système d’exploitation, marque et service client (Californie pour Apple) concentrent l’essentiel de la valeur ; l’assemblage dans des usines en Chine (Foxconn) n’en capte qu’une petite part. Les pays et firmes qui ne font qu’assembler dégagent donc peu de profits.` },
      ],
    },
    {
      id: 'prod-ex3', title: `Étude de cas : le textile au Bangladesh`, difficulty: 2, duration: 25, tags: [`document`, `chaîne de valeur`],
      statement: [
        { type: 'quote', text: `Le 24 avril 2013, l’immeuble du Rana Plaza, près de Dacca, s’effondre. Il abritait plusieurs ateliers de confection qui travaillaient pour des marques de vêtements occidentales. Le bilan est de 1 134 morts et plus de 2 000 blessés.`, source: `D’après l’Organisation internationale du travail` },
        { type: 'p', text: `1. Quel rôle joue le Bangladesh dans la chaîne de valeur du textile ? 2. Pourquoi les FTN y délocalisent-elles ? 3. Quelles conséquences et quelles réponses cet événement a-t-il suscitées ?` },
      ],
      hints: [`Salaires, coûts, accords d’importation.`, `Accord sur la sécurité des bâtiments, rôle des ONG.`],
      solution: [
        { type: 'p', text: `1. Le Bangladesh est un grand **atelier d’assemblage** (confection) : il est le deuxième exportateur mondial de vêtements après la Chine, pour des marques de pays développés. L’industrie textile représente la grande majorité de ses exportations.` },
        { type: 'p', text: `2. Les FTN profitent de **salaires très faibles**, d’une main-d’œuvre nombreuse, de tarifs douaniers réduits à l’entrée en Europe et aux États-Unis pour les pays les moins avancés.` },
        { type: 'p', text: `3. La catastrophe a révélé les mauvaises conditions de sécurité et de travail dans les sous-traitants. Elle a conduit à l’**Accord sur la sécurité incendie et la sécurité des bâtiments au Bangladesh** (2013), signé par des marques et des syndicats, à des inspections et à une prise de conscience des consommateurs et des ONG. Elle illustre aussi l’inégale répartition de la valeur et des risques dans les chaînes de valeur.` },
      ],
    },
    {
      id: 'prod-ex4', title: `Analyser un tableau de trafic portuaire`, difficulty: 2, duration: 20, tags: [`statistiques`, `ports`],
      statement: [
        { type: 'table', caption: `Trafic de conteneurs (millions d’EVP, ordre de grandeur, 2023)`, headers: [`Port`, `Trafic`], rows: [[`Shanghai`, `49`], [`Singapour`, `39`], [`Rotterdam`, `13,4`], [`Le Havre`, `3`]] },
        { type: 'p', text: `1. Calculez combien de fois le trafic de Shanghai est supérieur à celui de Rotterdam (arrondi à l’unité). 2. Commentez le classement. 3. Que montre la place de Rotterdam et du Havre ?` },
      ],
      hints: [`49 divisé par 13,4.`],
      solution: [
        { type: 'p', text: `1. 49 ÷ 13,4 ≈ 3,7, soit **environ 4 fois** plus.` },
        { type: 'p', text: `2. Les deux premiers ports sont asiatiques : ils reflètent la place de l’Asie orientale comme « atelier du monde » et premier pôle exportateur. Singapour est un hub de transbordement entre océan Indien et Pacifique.` },
        { type: 'p', text: `3. Rotterdam est le grand port européen, porte d’entrée de l’Europe du Nord-Ouest ; Le Havre, avec 3 millions d’EVP environ, est loin derrière : l’Europe reste un grand marché mais pas le principal pôle de transit mondial ; la France a un retard portuaire que l’ensemble HAROPA (Le Havre-Rouen-Paris) vise à combler.` },
      ],
    },
    {
      id: 'prod-ex5', title: `Schéma d’une chaîne de valeur`, difficulty: 2, duration: 25, tags: [`schéma`],
      statement: [{ type: 'p', text: `Choisissez une FTN (Apple, Airbus ou une marque de vêtements) et réalisez un schéma de sa chaîne de valeur en localisant : le siège et la conception, les fournisseurs de composants, l’assemblage, les marchés. Légende organisée.` }],
      hints: [`Suivez le schéma du cours.`, `Utilisez des flèches de tailles différentes selon l’importance des flux.`],
      solution: [
        { type: 'p', text: `Exemple Airbus : **Conception et assemblage final** à Toulouse (point rouge), **Hambourg**, Séville ; **composants** : ailes (Royaume-Uni), fuselages (Allemagne, Espagne), moteurs ; **chaînes d’assemblage délocalisées** : Tianjin, Mobile ; **marchés** : Asie, Amérique du Nord, Europe, Moyen-Orient.` },
        { type: 'list', items: [
          `I. Un pôle de conception et d’assemblage (Toulouse).`,
          `II. Un réseau de fournisseurs européens (flèches fines).`,
          `III. Des sites proches des marchés et des flux de livraison (flèches larges).`,
        ] },
      ],
    },
    {
      id: 'prod-ex6', title: `Les mutations de l’industrie française`, difficulty: 2, duration: 25, tags: [`France`, `document`],
      statement: [
        { type: 'table', caption: `Industrie en France`, headers: [`Année`, `Part dans la valeur ajoutée (environ)`, `Emplois industriels (environ)`], rows: [[`1980`, `20 %`, `5 millions`], [`2000`, `15 %`, `4 millions`], [`2023`, `10 %`, `3,1 millions`]] },
        { type: 'p', text: `Décrivez l’évolution, expliquez-la et montrez que la désindustrialisation n’est pas uniforme sur le territoire. Quelles réponses a-t-on apportées ?` },
      ],
      hints: [`Concurrence, délocalisations, tertiarisation, gains de productivité.`],
      solution: [
        { type: 'p', text: `**Description** : la part de l’industrie dans la valeur ajoutée a été divisée par deux en 40 ans ; l’emploi industriel a baissé d’environ 40 %.` },
        { type: 'p', text: `**Explication** : concurrence des pays à bas coûts, délocalisations, externalisation de services (qui ont fait « passer » des emplois du secteur industriel au tertiaire), gains de productivité (automatisation), tertiarisation de l’économie.` },
        { type: 'p', text: `**Inégalités territoriales** : très forte baisse dans les bassins sidérurgiques et textiles (Lorraine, Nord, Vosges) ; maintien ou développement dans des pôles (Toulouse, Grenoble, Saclay) et sur certains littoraux (Fos, Dunkerque, Le Havre).` },
        { type: 'p', text: `**Réponses** : pôles de compétitivité (2004), France Relance (2020), France 2030, loi industrie verte (2023), « vallée de la batterie » dans les Hauts-de-France.` },
      ],
    },
    {
      id: 'prod-ex7', title: `Composition type bac : les FTN et la production`, difficulty: 3, duration: 45, tags: [`type bac`, `composition`],
      statement: [{ type: 'p', text: `**Sujet** : « Les firmes transnationales, actrices de la diversification des espaces de production ». Rédigez l’introduction, le plan détaillé et la conclusion.` }],
      hints: [`Plan possible : FTN et chaînes de valeur / espaces mondialisés (ZES, ports) / limites et réponses (États, relocalisation).`],
      solution: [
        { type: 'p', text: `**Introduction** : Apple conçoit en Californie ses smartphones, assemblés en Chine à partir de composants venus d’une dizaine de pays. Les firmes transnationales (FTN), entreprises implantées dans plusieurs pays, organisent ainsi des chaînes de valeur mondiales. Dans quelle mesure ces firmes contribuent-elles à diversifier les espaces et les acteurs de la production ? Nous verrons d’abord leur rôle dans l’organisation des chaînes de valeur, puis les espaces de production qu’elles dessinent, enfin les limites et la recomposition de leurs stratégies.` },
        { type: 'list', ordered: true, items: [
          `**Les FTN organisent la production à l’échelle mondiale** : fragmentation, DIT, courbe du sourire, exemples Apple / Airbus, diversification des FTN (Samsung, Huawei, Tata).`,
          `**Des espaces de production variés** : métropoles et technopôles, ZES (Shenzhen, maquiladoras), ports et hubs (Shanghai, Singapour), espaces agricoles (soja brésilien).`,
          `**Des limites et des recompositions** : vulnérabilité (Covid, semi-conducteurs, Suez), conditions de travail (Rana Plaza), rôle des États et des ONG, relocalisation et réindustrialisation (France 2030, vallée de la batterie).`,
        ] },
        { type: 'p', text: `**Conclusion** : les FTN diversifient et connectent les espaces productifs mais restent sous l’influence des États et des crises ; la production mondialisée se recompose vers plus de régionalisation et de résilience.` },
      ],
    },
  ],

  representations: [
    { type: 'timeline', events: [
      { date: `1956-1960s`, title: `Conteneurisation`, text: `Malcolm McLean lance le premier navire porte-conteneurs en 1956 ; la généralisation fait chuter les coûts du transport maritime.` },
      { date: `1965`, title: `Maquiladoras`, text: `Lancement du programme de zones d’assemblage au nord du Mexique.` },
      { date: `1980`, title: `Shenzhen`, text: `Première zone économique spéciale chinoise.` },
      { date: `2001`, title: `La Chine entre à l’OMC`, text: `Accélération de sa place dans les chaînes de valeur.` },
      { date: `2013`, title: `Rana Plaza`, text: `1 134 morts dans l’effondrement d’un immeuble d’ateliers textiles au Bangladesh.` },
      { date: `2020-2021`, title: `Covid-19, pénurie de semi-conducteurs, canal de Suez`, text: `Les vulnérabilités des chaînes de valeur apparaissent.` },
      { date: `2023`, title: `Loi industrie verte (France)`, text: `Politique de réindustrialisation et de transition écologique.` },
    ] },
    { type: 'flashcards', cards: [
      { front: `FTN`, back: `Firme transnationale : entreprise implantée dans plusieurs pays, organisant sa production à l’échelle mondiale.` },
      { front: `DIT`, back: `Division internationale du travail : répartition des tâches productives entre pays.` },
      { front: `Chaîne de valeur mondiale`, back: `Étapes de production (conception, fabrication, assemblage, distribution) réparties dans plusieurs pays.` },
      { front: `Courbe du sourire`, back: `Montre que conception et services (amont/aval) créent plus de valeur que l’assemblage.` },
      { front: `ZES`, back: `Zone économique spéciale : espace à fiscalité avantageuse pour attirer les investissements (Shenzhen).` },
      { front: `Maquiladora`, back: `Usine d’assemblage du nord du Mexique, proche de la frontière américaine.` },
      { front: `Hub`, back: `Plateforme de concentration et de redistribution des flux (port, aéroport).` },
      { front: `EVP`, back: `Équivalent vingt pieds : unité de mesure des conteneurs.` },
      { front: `Délocalisation / relocalisation`, back: `Transfert d’une production à l’étranger / retour de la production dans le pays d’origine.` },
      { front: `Désindustrialisation`, back: `Baisse de la part de l’industrie dans l’emploi et la valeur ajoutée.` },
      { front: `Pôle de compétitivité`, back: `Réseau local d’entreprises, laboratoires et universités qui coopèrent sur l’innovation (label français, depuis 2004).` },
      { front: `ZIP`, back: `Zone industrialo-portuaire : espace où l’industrie est implantée près d’un grand port (Fos, Dunkerque).` },
    ] },
    { type: 'matching', title: `Associer l’exemple au concept`, pairs: [
      { left: `Shenzhen`, right: `Zone économique spéciale créée en 1980` },
      { left: `Rana Plaza`, right: `Conditions de travail dans la sous-traitance textile` },
      { left: `Foxconn`, right: `Sous-traitant d’assemblage de l’iPhone` },
      { left: `Fos-sur-Mer`, right: `Zone industrialo-portuaire française` },
      { left: `Singapour`, right: `Hub portuaire sur le détroit de Malacca` },
      { left: `Vallée de la batterie`, right: `Réindustrialisation dans les Hauts-de-France` },
    ] },
    { type: 'truefalse', title: `Vrai ou faux ?`, statements: [
      { text: `L’assemblage est l’étape qui crée le plus de valeur ajoutée.`, answer: false, explanation: `C’est l’inverse : conception et services en créent davantage (courbe du sourire).` },
      { text: `Environ 80 % du volume du commerce mondial de marchandises passe par la mer.`, answer: true },
      { text: `La France est le premier pays touristique du monde en arrivées internationales.`, answer: true, explanation: `Environ 100 millions de visiteurs en 2023-2024.` },
      { text: `L’industrie représente aujourd’hui 20 % de la valeur ajoutée française.`, answer: false, explanation: `Environ 10 % aujourd’hui, contre près de 20 % en 1980.` },
      { text: `Shanghai est le premier port à conteneurs d’Europe.`, answer: false, explanation: `Shanghai est en Chine ; c’est le premier port du monde. Rotterdam est le premier d’Europe.` },
    ] },
    { type: 'qcm', questions: [
      { question: `Que désigne une FTN ?`, choices: [`Une entreprise publique`, `Une entreprise implantée dans plusieurs pays`, `Une ONG`, `Un syndicat international`], answer: 1 },
      { question: `Où est conçu l’iPhone ?`, choices: [`En Chine`, `En Californie`, `À Taïwan`, `En Inde`], answer: 1 },
      { question: `Quelle étape de la chaîne de valeur crée le moins de valeur ajoutée ?`, choices: [`La conception`, `Le marketing`, `L’assemblage`, `Les services`], answer: 2 },
      { question: `Quelle est la première zone économique spéciale chinoise créée en 1980 ?`, choices: [`Pudong`, `Shenzhen`, `Hainan`, `Tianjin`], answer: 1, explanation: `Shenzhen (1980), puis Zhuhai, Shantou, Xiamen.` },
      { question: `Combien de morts au Rana Plaza (2013) ?`, choices: [`113`, `500`, `1 134`, `3 000`], answer: 2 },
      { question: `Quel est le premier port à conteneurs du monde ?`, choices: [`Rotterdam`, `Singapour`, `Shanghai`, `Los Angeles`], answer: 2 },
      { question: `La « vallée de la batterie » se situe :`, choices: [`En Occitanie`, `Dans les Hauts-de-France`, `En Bretagne`, `En Alsace`], answer: 1 },
      { question: `Quelle part de l’industrie dans la valeur ajoutée française (environ) ?`, choices: [`5 %`, `10 %`, `25 %`, `40 %`], answer: 1 },
    ] },
  ],
}

export default chapter
