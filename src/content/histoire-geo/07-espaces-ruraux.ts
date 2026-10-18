import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'espaces-ruraux',
  subject: 'histoire-geo',
  order: 7,
  title: `Les espaces ruraux : multifonctionnalité ou fragmentation ?`,
  theme: `Géographie — Thème 3`,
  summary: `Les espaces ruraux français sont de plus en plus divers : agricoles, résidentiels, touristiques, productifs, ils cumulent des fonctions mais connaissent aussi des fractures entre campagnes dynamiques et territoires en difficulté.`,
  duration: `3 à 4 semaines`,
  objectives: [
    `Définir espace rural, rural sous influence urbaine, multifonctionnalité, périurbanisation, déprise, « diagonale du vide ».`,
    `Décrire les fonctions des espaces ruraux : agriculture, résidence, loisirs et tourisme, production, protection de l’environnement.`,
    `Expliquer les mutations de l’agriculture française et ses effets sur les paysages.`,
    `Analyser les contrastes entre espaces ruraux (périurbain dynamique, rural agricole, rural touristique, rural isolé).`,
    `Étudier des politiques d’aménagement (PAC, parcs naturels régionaux, France services, Petites villes de demain).`,
    `Réaliser un croquis sur la diversité des espaces ruraux français.`,
  ],
  keywords: [`espace rural`, `multifonctionnalité`, `fragmentation`, `périurbanisation`, `rurbanisation`, `diagonale du vide`, `déprise agricole`, `PAC`, `parc naturel régional`, `néoruraux`, `services publics`, `Creuse`, `Bretagne`],

  fiche: [
    { type: 'h2', text: `L’essentiel` },
    { type: 'callout', variant: 'definition', title: `Notions clés`, content: [
      { type: 'keyvalue', items: [
        { key: `Espace rural`, value: `Espace de faible densité de population et d’urbanisation, où le bâti est discontinu et où dominent les espaces agricoles, forestiers et naturels. Selon la grille de densité INSEE, ce sont les communes peu denses et très peu denses.` },
        { key: `Multifonctionnalité`, value: `Capacité d’un espace rural à remplir plusieurs fonctions à la fois : production agricole, résidence, loisirs, ressources, protection de l’environnement.` },
        { key: `Fragmentation`, value: `Différenciation croissante des espaces ruraux : des campagnes dynamiques et d’autres en difficulté, avec des inégalités d’accès aux services et à l’emploi.` },
        { key: `Périurbanisation`, value: `Extension des villes dans les campagnes proches (lotissements, zones d’activités), liée à la voiture et à la recherche de logements moins chers.` },
        { key: `Déprise agricole`, value: `Abandon progressif de l’activité agricole sur certains espaces (friches, reboisement).` },
        { key: `Diagonale du vide`, value: `Large bande de faibles densités qui traverse la France du Nord-Est (Meuse, Ardennes) au Sud-Ouest (Landes, Pyrénées), prolongée par le Massif central et les Alpes du Sud ; expression discutée car ces espaces ont aussi des dynamiques.` },
      ] },
    ] },
    { type: 'h3', text: `Trois idées-forces` },
    { type: 'list', items: [
      `**Une grande diversité** : les espaces ruraux couvrent la majeure partie du territoire français (plus de 3/4 de la superficie), mais environ un tiers de la population.`,
      `**Une multifonctionnalité croissante** : l’agriculture n’y est plus la seule activité ; résidence, tourisme, énergies renouvelables, nature protégée.`,
      `**Des contrastes marqués** : périurbain en croissance, campagnes touristiques ou agricoles dynamiques, campagnes vieillissantes en perte de services.`,
    ] },
    { type: 'h3', text: `Chiffres clés` },
    { type: 'table', headers: [`Donnée`, `Valeur`, `Source`], rows: [
      [`Exploitations agricoles`, `≈ 390 000 en 2020 (contre ≈ 1,6 million en 1970)`, `Agreste, recensement agricole 2020`],
      [`Surface agricole utilisée (SAU)`, `≈ 27 millions d’hectares (≈ la moitié du territoire)`, `Agreste`],
      [`SAU moyenne par exploitation`, `≈ 69 ha en 2020 (≈ 20 ha en 1970)`, `Agreste`],
      [`Parcs naturels régionaux`, `59 PNR, environ 17 % du territoire`, `Fédération des PNR`],
      [`Creuse`, `≈ 116 000 habitants, contre ≈ 164 000 en 1962`, `INSEE`],
    ] },
    { type: 'callout', variant: 'remember', title: `À retenir`, content: [
      { type: 'p', text: `La problématique du chapitre : les espaces ruraux sont-ils **multifonctionnels** (on y trouve des activités et des habitants variés) ou **fragmentés** (de plus en plus inégaux) ? Réponse : **les deux** — la multifonctionnalité est réelle mais ne bénéficie pas à tous les territoires de la même manière.` },
    ] },
  ],

  cours: [
    { type: 'h2', text: `I. Des espaces ruraux multifonctionnels` },
    { type: 'h3', text: `A. Qu’est-ce qu’un espace rural ?` },
    { type: 'p', text: `Il n’existe pas de définition unique. L’**INSEE** utilise depuis 2020 la **grille communale de densité** (méthode européenne), qui distingue sept niveaux, des grands centres urbains aux communes très peu denses. Les espaces ruraux correspondent aux communes **peu denses** et **très peu denses** : elles représentent environ 88 % des communes, plus de 3/4 de la superficie et environ un tiers de la population.` },
    { type: 'p', text: `Les espaces ruraux ne se réduisent plus à l’agriculture : moins de 4 % des habitants du rural sont agriculteurs. L’espace rural est un espace de **vie**, de **production**, de **loisirs** et de **nature**.` },
    { type: 'callout', variant: 'warning', title: `Piège`, content: [
      { type: 'p', text: `Rural ne veut pas dire agricole. Un agriculteur peut vivre en ville, et la majorité des habitants des communes rurales travaillent dans l’industrie, les services ou dans la ville voisine.` },
    ] },
    { type: 'h3', text: `B. Les fonctions des espaces ruraux` },
    { type: 'grid', columns: 3, items: [
      { title: `Production agricole et forestière`, text: `La France est le premier producteur agricole de l’UE ; l’agriculture occupe environ la moitié du territoire ; la forêt couvre près de 31 % du territoire métropolitain.`, icon: 'Wheat' },
      { title: `Résidence`, text: `Les campagnes proches des villes attirent des ménages en quête de logements spacieux et peu coûteux (périurbanisation, néoruraux).`, icon: 'Home' },
      { title: `Loisirs et tourisme`, text: `Tourisme vert, randonnée, villages de caractère, stations de montagne, résidences secondaires (environ 10 % des logements en France).`, icon: 'Mountain' },
      { title: `Industrie et énergie`, text: `PME industrielles, agroalimentaire, carrières, énergies renouvelables (éoliennes, photovoltaïque, hydroélectricité).`, icon: 'Factory' },
      { title: `Protection de la nature`, text: `Parcs nationaux (11), parcs naturels régionaux (59), sites Natura 2000, réserves ; enjeux de biodiversité.`, icon: 'Trees' },
      { title: `Ressources`, text: `Eau potable, captages, bois, air : les espaces ruraux fournissent des services aux villes.`, icon: 'Droplets' },
    ] },
    { type: 'h3', text: `C. Une agriculture transformée` },
    { type: 'p', text: `Après 1945, l’agriculture française s’est **modernisée** (mécanisation, engrais, remembrement, PAC créée en 1962) : la production a fortement augmenté, la France est devenue exportatrice. Mais le nombre d’exploitations a été divisé par quatre (de 1,6 million en 1970 à environ 390 000 en 2020) alors que leur taille moyenne a été multipliée par 3,5 (de 20 à 69 hectares). Les agriculteurs représentent environ 1,5 % de l’emploi.` },
    { type: 'p', text: `Aujourd’hui coexistent plusieurs modèles :` },
    { type: 'table', headers: [`Modèle`, `Caractéristiques`, `Exemples`], rows: [
      [`Agriculture intensive et exportatrice`, `Grandes exploitations, cultures céréalières ou élevage hors-sol, forte mécanisation, intrants, liens avec l’agro-industrie`, `Bassin parisien (blé), Bretagne (porcs, volailles), Nord (betterave, pomme de terre)`],
      [`Agriculture de qualité et circuits courts`, `Labels (AOC, Label rouge, IGP), bio, vente directe`, `Vignobles (Bordeaux, Champagne), fromages AOP (Comté, Roquefort)`],
      [`Agriculture extensive en difficulté`, `Élevage extensif, revenus faibles, vieillissement des exploitants`, `Massif central, montagnes`],
    ] },
    { type: 'p', text: `L’agriculture biologique progresse (environ 10 % de la SAU en 2023). Les enjeux environnementaux (pollution aux nitrates en Bretagne et algues vertes, usage des pesticides, érosion de la biodiversité) font débat. Une partie des exploitants a du mal à vivre de son travail (revenus agricoles faibles dans l’élevage), et la crise agricole de l’hiver 2023-2024 l’a rappelé.` },
    { type: 'callout', variant: 'example', title: `Étude de cas : la Bretagne agro-industrielle`, content: [
      { type: 'p', text: `La Bretagne est la première région agricole française pour l’élevage : elle produit environ la moitié des porcs français, une grande partie des volailles et du lait. Cette réussite repose sur de petites exploitations devenues intensives, des coopératives et une agro-industrie puissante (Bigard-Charal, Lactalis, Triskalia, Savéol). Le **coût environnemental** est élevé : pollution des eaux par les nitrates et prolifération d’**algues vertes** sur le littoral (baie de Saint-Brieuc, Lieue de Grève). Un modèle productif mais contesté, en pleine recherche de transition (agroécologie, circuits courts).` },
    ] },
    { type: 'svg', maxWidth: 720, caption: `Schéma : les fonctions d’un espace rural multifonctionnel (organisation en auréoles autour d’une ville)`, svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<rect x="4" y="4" width="712" height="392" fill="none" stroke="currentColor" stroke-opacity="0.3"/>
<ellipse cx="220" cy="200" rx="200" ry="175" fill="hsl(142 71% 45%)" fill-opacity="0.08" stroke="hsl(142 71% 45%)" stroke-dasharray="6 4"/>
<ellipse cx="220" cy="200" rx="135" ry="115" fill="hsl(25 95% 53%)" fill-opacity="0.12" stroke="hsl(25 95% 53%)"/>
<ellipse cx="220" cy="200" rx="65" ry="55" fill="hsl(0 84% 60%)" fill-opacity="0.15" stroke="hsl(0 84% 60%)"/>
<text x="220" y="204" text-anchor="middle" fill="currentColor" font-size="11">Ville</text>
<g fill="currentColor" font-size="10">
<text x="220" y="148" text-anchor="middle">Zone périurbaine</text>
<text x="220" y="62" text-anchor="middle">Campagne agricole</text>
<text x="105" y="330" text-anchor="middle">Rural isolé</text>
<text x="320" y="320" text-anchor="middle">Tourisme / loisirs</text></g>
<g><rect x="310" y="150" width="9" height="9" fill="hsl(25 95% 53%)"/><rect x="326" y="160" width="9" height="9" fill="hsl(25 95% 53%)"/><rect x="170" y="268" width="9" height="9" fill="hsl(25 95% 53%)"/></g>
<rect x="125" y="90" width="22" height="14" fill="hsl(142 71% 45%)" fill-opacity="0.4" stroke="hsl(142 71% 45%)"/>
<rect x="260" y="85" width="22" height="14" fill="hsl(142 71% 45%)" fill-opacity="0.4" stroke="hsl(142 71% 45%)"/>
<circle cx="320" cy="295" r="7" fill="hsl(263 70% 60%)"/>
<path d="M285 200 L520 200" stroke="currentColor" stroke-width="2" fill="none"/>
<g font-size="11" fill="currentColor"><text x="470" y="40" font-weight="bold">Légende</text>
<text x="470" y="62" font-weight="bold">1. Une ville et ses couronnes</text>
<ellipse cx="480" cy="78" rx="10" ry="7" fill="hsl(0 84% 60%)" fill-opacity="0.3" stroke="hsl(0 84% 60%)"/><text x="498" y="82">Ville-centre (emplois, services)</text>
<ellipse cx="480" cy="100" rx="10" ry="7" fill="hsl(25 95% 53%)" fill-opacity="0.3" stroke="hsl(25 95% 53%)"/><text x="498" y="104">Périurbain (résidentiel, navetteurs)</text>
<ellipse cx="480" cy="122" rx="10" ry="7" fill="hsl(142 71% 45%)" fill-opacity="0.2" stroke="hsl(142 71% 45%)" stroke-dasharray="3 2"/><text x="498" y="126">Rural (agriculture, nature, bourgs)</text>
<text x="470" y="160" font-weight="bold">2. Des fonctions</text>
<rect x="473" y="170" width="14" height="10" fill="hsl(142 71% 45%)" fill-opacity="0.4" stroke="hsl(142 71% 45%)"/><text x="498" y="179">Production agricole</text>
<rect x="475" y="192" width="9" height="9" fill="hsl(25 95% 53%)"/><text x="498" y="200">Habitat pavillonnaire</text>
<circle cx="480" cy="217" r="6" fill="hsl(263 70% 60%)"/><text x="498" y="221">Pôle touristique</text>
<line x1="472" y1="240" x2="490" y2="240" stroke="currentColor" stroke-width="2"/><text x="498" y="244">Axe routier / ferroviaire</text></g>
</svg>` },

    { type: 'h2', text: `II. Des espaces ruraux différenciés : vers une fragmentation ?` },
    { type: 'h3', text: `A. Un rural sous influence urbaine : le périurbain` },
    { type: 'p', text: `Autour des villes, la **périurbanisation** attire des ménages (souvent des familles, propriétaires de maison individuelle) qui font des **migrations pendulaires** vers la ville. La croissance démographique y est forte, ce qui provoque l’étalement, l’artificialisation des terres agricoles (environ 20 000 à 25 000 hectares par an ces dernières années, d’après le Cerema, en baisse après la loi *Climat et résilience* de 2021 qui vise le « zéro artificialisation nette » en 2050) et une forte dépendance à la voiture. Le **péri-urbain toulousain** ou lyonnais en sont de bons exemples.` },
    { type: 'h3', text: `B. Des campagnes touristiques et résidentielles` },
    { type: 'p', text: `Les zones littorales, les montagnes (Alpes du Nord et leurs stations comme les Trois Vallées, plus grand domaine skiable relié au monde) et certains espaces ruraux de charme (Provence, Dordogne, Luberon) attirent touristes, résidents secondaires et retraités. L’économie **résidentielle et touristique** y est dynamique, mais les prix de l’immobilier augmentent, ce qui pose des problèmes d’accès au logement pour les jeunes actifs et les saisonniers.` },
    { type: 'h3', text: `C. Des campagnes en difficulté` },
    { type: 'p', text: `Dans les territoires de très faible densité (Creuse, Cantal, Lozère, Haute-Marne, Ardennes), on observe **déclin démographique**, **vieillissement**, **fermeture de services** (écoles, commerces, bureaux de poste, maternités), **déserts médicaux**, faible couverture numérique. La **Creuse** est passée d’environ 164 000 habitants en 1962 à environ 116 000 aujourd’hui ; un tiers de la population a plus de 65 ans.` },
    { type: 'callout', variant: 'tip', title: `Attention à la « diagonale du vide »`, content: [
      { type: 'p', text: `Cette expression, popularisée par les aménageurs dans les années 1980, désigne une bande de faibles densités. Mais **tous les espaces peu denses ne déclinent pas** : certains bourgs et petites villes gagnent des habitants (néoruraux, télétravailleurs), notamment depuis la crise sanitaire de 2020. Mieux vaut parler de **rural diversifié** que d’un « vide ».` },
    ] },
    { type: 'table', caption: `Typologie simplifiée des espaces ruraux français`, headers: [`Type`, `Dynamique`, `Exemples`, `Enjeux`], rows: [
      [`Rural périurbain`, `Croissance démographique, résidentiel`, `Couronnes de Toulouse, Lyon, Nantes`, `Étalement, transports, artificialisation`],
      [`Rural touristique / littoral / montagne`, `Dynamique saisonnière, résidences secondaires`, `Alpes du Nord, Côte d’Azur, littoral atlantique`, `Prix fonciers, saisonnalité, pression sur les ressources`],
      [`Rural agricole productif`, `Emploi agricole et agroalimentaire`, `Bretagne, Beauce, Champagne`, `Environnement, concentration des exploitations`],
      [`Rural de faible densité, en déprise`, `Déclin démographique, vieillissement`, `Creuse, Cantal, Haute-Marne`, `Services, santé, désenclavement, reconversion`],
    ] },

    { type: 'h2', text: `III. Quels aménagements pour les espaces ruraux ?` },
    { type: 'h3', text: `A. Les politiques européennes et nationales` },
    { type: 'list', items: [
      `**PAC** (Politique agricole commune, 1962) : soutien aux revenus des agriculteurs, développement rural (2e pilier), aujourd’hui verdissement (écorégimes).`,
      `**Parcs naturels régionaux** (créés en 1967) : 59 PNR protègent et valorisent des territoires ruraux de qualité (Luberon, Vercors, Camargue, Morvan).`,
      `**Services publics** : réseau **France services** (guichets uniques, plus de 2 700 structures), Maisons de santé pluriprofessionnelles, plan France très haut débit (fibre).`,
      `**Programmes de revitalisation** : *Petites villes de demain* (1 600 communes, 2020), *Action cœur de ville* (234 villes moyennes), *Agenda rural* (2019), « contrats de ruralité ».`,
    ] },
    { type: 'h3', text: `B. Des initiatives locales` },
    { type: 'p', text: `Circuits courts, tiers-lieux et espaces de télétravail, épiceries multiservices, agritourisme, **énergies renouvelables** (méthanisation, éoliennes), marques territoriales. Les habitants s’organisent (associations, coopératives) pour maintenir services et lien social.` },
    { type: 'callout', variant: 'warning', title: `Des tensions d’usage`, content: [
      { type: 'p', text: `La multifonctionnalité provoque des **conflits d’usage** : agriculteurs et néoruraux (bruits, épandages), éoliennes et paysages, tourisme et protection de la nature, artificialisation et production agricole, bassines et accès à l’eau (conflit de Sainte-Soline en 2023).` },
    ] },
    { type: 'svg', maxWidth: 720, caption: `Croquis modèle : la diversité des espaces ruraux français (schéma simplifié)`, svg: `<svg viewBox="0 0 720 460" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<rect x="4" y="4" width="712" height="452" fill="none" stroke="currentColor" stroke-opacity="0.3"/>
<polygon points="190,40 270,30 330,60 370,110 360,160 380,230 330,300 300,370 230,420 170,400 100,380 90,300 60,230 90,160 40,110 100,70" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-width="1.5"/>
<polygon points="320,90 345,100 300,230 250,330 215,350 200,310 250,230 290,140" fill="hsl(263 70% 60%)" fill-opacity="0.2" stroke="hsl(263 70% 60%)" stroke-dasharray="5 4"/>
<ellipse cx="250" cy="145" rx="45" ry="35" fill="hsl(25 95% 53%)" fill-opacity="0.3" stroke="hsl(25 95% 53%)"/>
<ellipse cx="290" cy="240" rx="30" ry="28" fill="hsl(25 95% 53%)" fill-opacity="0.3" stroke="hsl(25 95% 53%)"/>
<ellipse cx="200" cy="330" rx="30" ry="28" fill="hsl(25 95% 53%)" fill-opacity="0.3" stroke="hsl(25 95% 53%)"/>
<ellipse cx="110" cy="150" rx="40" ry="35" fill="hsl(142 71% 45%)" fill-opacity="0.3" stroke="hsl(142 71% 45%)"/>
<ellipse cx="270" cy="75" rx="40" ry="25" fill="hsl(142 71% 45%)" fill-opacity="0.3" stroke="hsl(142 71% 45%)"/>
<path d="M335 280 L345 380" stroke="hsl(217 91% 60%)" stroke-width="10" opacity="0.5"/>
<path d="M310 300 L270 395" stroke="hsl(217 91% 60%)" stroke-width="10" opacity="0.5"/>
<path d="M310 200 L370 250" stroke="hsl(217 91% 60%)" stroke-width="10" opacity="0.5"/>
<circle cx="252" cy="145" r="8" fill="hsl(0 84% 60%)"/>
<g font-size="10" fill="currentColor"><text x="235" y="130">Paris</text><text x="320" y="245">Lyon</text><text x="230" y="335">Toulouse</text><text x="70" y="155">Bretagne</text><text x="233" y="70">Nord</text><text x="262" y="290">Massif</text><text x="262" y="302">central</text><text x="340" y="350">Alpes</text></g>
<g font-size="11" fill="currentColor"><text x="410" y="40" font-weight="bold">Légende</text>
<text x="410" y="62" font-weight="bold">1. Des campagnes dynamiques</text>
<ellipse cx="422" cy="78" rx="11" ry="8" fill="hsl(25 95% 53%)" fill-opacity="0.4" stroke="hsl(25 95% 53%)"/><text x="440" y="82">Périurbain des grandes métropoles</text>
<ellipse cx="422" cy="100" rx="11" ry="8" fill="hsl(142 71% 45%)" fill-opacity="0.4" stroke="hsl(142 71% 45%)"/><text x="440" y="104">Agriculture intensive et agro-industrie</text>
<line x1="412" y1="122" x2="434" y2="122" stroke="hsl(217 91% 60%)" stroke-width="8" opacity="0.5"/><text x="440" y="126">Montagnes et littoraux touristiques</text>
<text x="410" y="164" font-weight="bold">2. Des campagnes en difficulté</text>
<ellipse cx="422" cy="180" rx="11" ry="8" fill="hsl(263 70% 60%)" fill-opacity="0.3" stroke="hsl(263 70% 60%)" stroke-dasharray="4 3"/><text x="440" y="184">Faibles densités, déprise, vieillissement</text>
<text x="410" y="224" font-weight="bold">3. Un centre</text>
<circle cx="422" cy="240" r="7" fill="hsl(0 84% 60%)"/><text x="440" y="244">Paris</text></g>
</svg>` },

    { type: 'h2', text: `Méthode : étudier un territoire rural` },
    { type: 'steps', items: [
      { title: `1. Localiser et caractériser`, text: `Où se trouve le territoire ? Quelle densité, quelle évolution démographique (solde naturel, solde migratoire) ?` },
      { title: `2. Identifier les fonctions`, text: `Agriculture, résidence, tourisme, industrie, protection : lesquelles dominent ?` },
      { title: `3. Repérer les acteurs`, text: `Agriculteurs, collectivités, État, UE (PAC), habitants, associations, entreprises.` },
      { title: `4. Dégager atouts et contraintes`, text: `Accessibilité, services, emploi, environnement.` },
      { title: `5. Conclure`, text: `Multifonctionnalité ou fragmentation ? Nuancer.` },
    ] },
  ],

  exercices: [
    {
      id: 'rur-ex1', title: `Définir les notions`, difficulty: 1, duration: 10, tags: [`notions`],
      statement: [{ type: 'p', text: `Définissez : espace rural, multifonctionnalité, périurbanisation, déprise agricole, diagonale du vide. Donnez un exemple pour chaque notion.` }],
      hints: [`Un exemple localisé pour chacune.`],
      solution: [{ type: 'list', items: [
        `**Espace rural** : espace peu dense dominé par l’agriculture, la forêt et la nature (Creuse).`,
        `**Multifonctionnalité** : cumul de fonctions agricole, résidentielle, touristique (Luberon).`,
        `**Périurbanisation** : extension des villes dans les campagnes (couronne de Toulouse).`,
        `**Déprise agricole** : abandon de l’agriculture (friches en montagne).`,
        `**Diagonale du vide** : bande de faibles densités du Nord-Est au Sud-Ouest (Meuse, Massif central).`,
      ] }],
    },
    {
      id: 'rur-ex2', title: `Analyser des chiffres agricoles`, difficulty: 1, duration: 15, tags: [`statistiques`],
      statement: [
        { type: 'table', headers: [`Année`, `Exploitations`, `SAU moyenne`], rows: [[`1970`, `1,6 million`, `20 ha`], [`2020`, `390 000`, `69 ha`]] },
        { type: 'p', text: `1. Calculez la baisse du nombre d’exploitations en pourcentage. 2. Calculez le coefficient multiplicateur de la SAU moyenne. 3. Que traduisent ces évolutions ?` },
      ],
      hints: [`Baisse = (valeur finale − valeur initiale) / valeur initiale.`],
      solution: [
        { type: 'p', text: `1. (390 000 − 1 600 000) / 1 600 000 ≈ −0,756, soit une baisse d’environ **76 %** (le nombre d’exploitations est divisé par plus de 4).` },
        { type: 'p', text: `2. 69 / 20 = **3,45**, soit une SAU moyenne multipliée par environ 3,5.` },
        { type: 'p', text: `3. **Concentration** des terres : moins d’exploitations mais beaucoup plus grandes, modernisées, mécanisées. Cela traduit l’exode agricole, la restructuration, les gains de productivité et la diminution de la population agricole.` },
      ],
    },
    {
      id: 'rur-ex3', title: `Étude de cas : la Creuse`, difficulty: 2, duration: 25, tags: [`document`, `étude de cas`],
      statement: [
        { type: 'table', caption: `Population de la Creuse (ordre de grandeur, INSEE)`, headers: [`Année`, `1962`, `1990`, `2020`], rows: [[`Habitants`, `164 000`, `131 000`, `116 000`]] },
        { type: 'p', text: `1. Décrivez l’évolution. 2. Quelles en sont les causes et conséquences ? 3. Quelles solutions envisager ?` },
      ],
      hints: [`Exode rural, vieillissement, services.`, `Pensez à France services, numérique, accueil de néoruraux.`],
      solution: [
        { type: 'p', text: `1. La population a baissé de 164 000 à 116 000 habitants en près de 60 ans, soit environ −29 %.` },
        { type: 'p', text: `2. **Causes** : exode rural (départ des jeunes vers les villes pour les études et l’emploi), déclin de l’agriculture, faible attractivité économique, solde naturel négatif (vieillissement). **Conséquences** : fermeture de services (écoles, commerces, hôpitaux de proximité), déserts médicaux, entretien difficile du patrimoine et des routes, perte de dynamisme.` },
        { type: 'p', text: `3. **Solutions** : maintien de services (France services, maisons de santé), très haut débit pour le télétravail, accueil de néoruraux, valorisation du tourisme vert, circuits courts, énergies renouvelables, politiques de revitalisation (Petites villes de demain). Les résultats restent limités.` },
      ],
    },
    {
      id: 'rur-ex4', title: `Document : la PAC`, difficulty: 2, duration: 25, tags: [`document`, `PAC`],
      statement: [
        { type: 'quote', text: `La PAC représente environ un tiers du budget de l’Union européenne. La France est le premier bénéficiaire des aides, avec une dizaine de milliards d’euros par an. Les aides directes à l’hectare ont été critiquées pour favoriser les grandes exploitations.`, source: `Synthèse d’après la Commission européenne` },
        { type: 'p', text: `1. Qu’est-ce que la PAC ? 2. Quels effets a-t-elle eus sur l’agriculture française ? 3. Quelles critiques lui adresse-t-on ?` },
      ],
      hints: [`PAC créée en 1962, objectifs d’origine : sécurité alimentaire.`],
      solution: [
        { type: 'p', text: `1. La **PAC** (politique agricole commune, 1962) est la politique de l’UE de soutien à l’agriculture : prix garantis à l’origine, puis aides directes aux revenus et aides au développement rural.` },
        { type: 'p', text: `2. Elle a permis de moderniser l’agriculture, d’atteindre l’autosuffisance et de faire de la France une grande puissance exportatrice ; elle contribue au revenu de nombreux agriculteurs.` },
        { type: 'p', text: `3. **Critiques** : avantage aux grandes exploitations, effets environnementaux (intensification), surproduction passée, inégalités entre agriculteurs et entre pays. Les réformes récentes insistent sur l’environnement (verdissement, écorégimes) et le soutien aux petites exploitations.` },
      ],
    },
    {
      id: 'rur-ex5', title: `Schéma : un espace périurbain`, difficulty: 2, duration: 25, tags: [`schéma`],
      statement: [{ type: 'p', text: `Réalisez un schéma d’un espace périurbain autour d’une ville moyenne. Placez : la ville-centre, les lotissements, une zone commerciale, des terres agricoles, une autoroute, des flux de navetteurs. Légende en trois parties.` }],
      hints: [`Utilisez des cercles concentriques et des flèches pour les migrations pendulaires.`],
      solution: [
        { type: 'list', items: [
          `**I. Une ville-centre** : emplois, services, administration.`,
          `**II. Un espace périurbain en croissance** : lotissements pavillonnaires, zone commerciale en entrée de ville, zone d’activités.`,
          `**III. Des relations** : autoroute et axes de transport ; flèches de migrations pendulaires vers la ville ; terres agricoles grignotées par l’artificialisation.`,
        ] },
        { type: 'p', text: `Titre : « Un espace périurbain : étalement et dépendance à la ville ».` },
      ],
    },
    {
      id: 'rur-ex6', title: `Conflits d’usage : un exemple de bassines`, difficulty: 3, duration: 30, tags: [`étude de cas`, `enjeux`],
      statement: [
        { type: 'p', text: `Dans le Poitou, des agriculteurs construisent des « méga-bassines » (réserves d’eau pour l’irrigation) ; des associations et habitants s’y opposent (manifestation de Sainte-Soline, mars 2023). À partir de cet exemple, montrez que la multifonctionnalité des espaces ruraux est source de tensions.` },
      ],
      hints: [`Identifiez les acteurs et leurs intérêts.`, `Pensez à l’eau comme ressource partagée.`],
      solution: [
        { type: 'p', text: `**Les acteurs** : agriculteurs irrigants (veulent sécuriser leur production face à la sécheresse), associations environnementales et habitants (craignent l’accaparement de l’eau et l’atteinte aux nappes), État et collectivités (arbitrent).` },
        { type: 'p', text: `**Les enjeux** : l’eau est une ressource commune ; elle est nécessaire à l’agriculture, à l’eau potable, à la biodiversité, au tourisme. Le changement climatique accentue la rareté. Les fonctions de l’espace rural (production, nature, résidence) entrent en concurrence.` },
        { type: 'p', text: `**Conclusion** : la multifonctionnalité n’est pas harmonieuse : elle suppose des **arbitrages** entre acteurs et la recherche de compromis (sobriété, nouvelles pratiques agricoles).` },
      ],
    },
    {
      id: 'rur-ex7', title: `Composition type bac : multifonctionnalité ou fragmentation ?`, difficulty: 3, duration: 45, tags: [`type bac`, `composition`],
      statement: [{ type: 'p', text: `**Sujet** : « Les espaces ruraux français : entre multifonctionnalité et fragmentation ». Rédigez l’introduction et le plan détaillé.` }],
      hints: [`Plan : des espaces multifonctionnels / des espaces fragmentés / des politiques pour y répondre.`],
      solution: [
        { type: 'p', text: `**Introduction** : Les espaces ruraux couvrent plus des trois quarts du territoire français mais n’abritent qu’un tiers de la population. Longtemps assimilés à l’agriculture, ils cumulent aujourd’hui plusieurs fonctions (résidence, tourisme, production, nature) : c’est la multifonctionnalité. Mais les écarts se creusent entre campagnes dynamiques et territoires en déclin, d’où l’idée de fragmentation. Dans quelle mesure les espaces ruraux français sont-ils multifonctionnels, et comment les inégalités qui les traversent sont-elles prises en charge ? Nous verrons d’abord leur diversité de fonctions, puis les contrastes entre territoires, enfin les politiques d’aménagement.` },
        { type: 'list', ordered: true, items: [
          `**Des espaces multifonctionnels** : agriculture modernisée (Bretagne), résidence périurbaine, tourisme, nature protégée (PNR), énergies renouvelables.`,
          `**Des espaces fragmentés** : périurbain en croissance, rural touristique valorisé, rural de faible densité en déprise (Creuse), accès inégal aux services.`,
          `**Des politiques et des initiatives pour recomposer** : PAC, PNR, France services, Petites villes de demain, circuits courts, tiers-lieux ; limites et conflits d’usage.`,
        ] },
        { type: 'p', text: `**Conclusion** : la multifonctionnalité est une réalité mais inégalement partagée ; la fragmentation est réelle mais nuancée par les dynamiques locales.` },
      ],
    },
  ],

  representations: [
    { type: 'timeline', events: [
      { date: `1945-1960`, title: `Modernisation agricole`, text: `Mécanisation, engrais, remembrement, exode rural.` },
      { date: `1962`, title: `Création de la PAC`, text: `Politique agricole commune de la CEE.` },
      { date: `1967`, title: `Premiers parcs naturels régionaux`, text: `Protection et valorisation de territoires ruraux.` },
      { date: `1975-1999`, title: `Renouveau démographique du rural périurbain`, text: `Le « renouveau rural » : les campagnes proches des villes regagnent des habitants.` },
      { date: `2018`, title: `Mouvement des gilets jaunes`, text: `Révèle les tensions sur la mobilité et les services en milieu rural et périurbain.` },
      { date: `2019-2020`, title: `Agenda rural, Petites villes de demain`, text: `Programmes de revitalisation.` },
      { date: `2020`, title: `Recensement agricole`, text: `≈ 390 000 exploitations en France.` },
      { date: `2023-2024`, title: `Crise agricole`, text: `Mobilisation des agriculteurs sur revenus, normes et concurrence.` },
    ] },
    { type: 'flashcards', cards: [
      { front: `Espace rural`, back: `Espace de faible densité, où dominent l’agriculture, la forêt et la nature.` },
      { front: `Multifonctionnalité`, back: `Cumul de plusieurs fonctions dans un espace rural : production, résidence, loisirs, protection.` },
      { front: `Fragmentation`, back: `Différenciation croissante des espaces ruraux, avec des inégalités entre territoires.` },
      { front: `Périurbanisation`, back: `Extension des villes dans les campagnes proches ; habitat pavillonnaire, navettes.` },
      { front: `Migrations pendulaires`, back: `Déplacements quotidiens domicile-travail.` },
      { front: `Déprise agricole`, back: `Abandon de l’activité agricole sur un espace ; friches, reboisement.` },
      { front: `PAC`, back: `Politique agricole commune de l’UE (1962) : soutien aux agriculteurs, développement rural.` },
      { front: `PNR`, back: `Parc naturel régional : territoire rural protégé et valorisé (59 en France).` },
      { front: `France services`, back: `Guichets uniques qui rapprochent les services publics des habitants des territoires ruraux.` },
      { front: `Néoruraux`, back: `Citadins qui s’installent à la campagne pour y vivre et parfois y travailler.` },
      { front: `Diagonale du vide`, back: `Bande de faibles densités du Nord-Est au Sud-Ouest de la France ; expression discutée.` },
      { front: `Conflit d’usage`, back: `Opposition entre acteurs pour l’utilisation d’un même espace ou d’une même ressource.` },
    ] },
    { type: 'matching', title: `Associer le territoire à son type`, pairs: [
      { left: `Couronne périurbaine de Toulouse`, right: `Rural sous influence urbaine, en croissance` },
      { left: `Creuse`, right: `Rural de faible densité, vieillissant` },
      { left: `Bretagne`, right: `Agriculture intensive et agro-industrie` },
      { left: `Alpes du Nord (Trois Vallées)`, right: `Rural touristique de montagne` },
      { left: `Luberon`, right: `Parc naturel régional, tourisme et résidence` },
    ] },
    { type: 'truefalse', title: `Vrai ou faux ?`, statements: [
      { text: `Les espaces ruraux occupent plus des trois quarts du territoire français.`, answer: true },
      { text: `Tous les espaces ruraux perdent des habitants.`, answer: false, explanation: `Le périurbain et certains rural touristiques gagnent des habitants.` },
      { text: `Le nombre d’exploitations agricoles a augmenté depuis 1970.`, answer: false, explanation: `Il est passé de 1,6 million à environ 390 000.` },
      { text: `La majorité des habitants des communes rurales sont agriculteurs.`, answer: false, explanation: `Les agriculteurs sont une petite minorité (moins de 4 %).` },
      { text: `La PAC a été créée en 1962.`, answer: true },
    ] },
    { type: 'qcm', questions: [
      { question: `Combien d’exploitations agricoles en France en 2020 (environ) ?`, choices: [`1,6 million`, `800 000`, `390 000`, `100 000`], answer: 2 },
      { question: `Quelle région produit environ la moitié des porcs français ?`, choices: [`Occitanie`, `Bretagne`, `Grand Est`, `Normandie`], answer: 1 },
      { question: `La multifonctionnalité désigne :`, choices: [`La spécialisation agricole`, `Le cumul de plusieurs fonctions`, `La disparition de l’agriculture`, `L’exode rural`], answer: 1 },
      { question: `Quel est l’objectif des Petites villes de demain ?`, choices: [`Construire des métropoles`, `Revitaliser les petites villes`, `Supprimer des communes`, `Développer l’agriculture intensive`], answer: 1 },
      { question: `Qu’est-ce que la périurbanisation ?`, choices: [`La croissance du centre-ville`, `L’extension des villes dans les campagnes proches`, `L’abandon des villes`, `La disparition des routes`], answer: 1 },
      { question: `Combien de parcs naturels régionaux en France ?`, choices: [`11`, `35`, `59`, `120`], answer: 2 },
      { question: `Quel problème environnemental est lié à l’élevage intensif en Bretagne ?`, choices: [`Les avalanches`, `Les algues vertes`, `Les séismes`, `Les canicules uniquement`], answer: 1 },
    ] },
  ],
}

export default chapter
