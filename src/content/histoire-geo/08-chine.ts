import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'chine',
  subject: 'histoire-geo',
  order: 8,
  title: `La Chine : des recompositions spatiales multiples`,
  theme: `Géographie — Thème 4`,
  summary: `Depuis 1978, la Chine s’est ouverte, urbanisée et intégrée à la mondialisation : cette croissance recompose son territoire (façade littorale, métropoles, ZES, migrations) tout en laissant subsister de fortes inégalités et de lourds défis environnementaux et démographiques.`,
  duration: `3 à 4 semaines`,
  objectives: [
    `Situer la Chine et ses grands ensembles (Chine de l’Est, de l’Ouest, du Nord-Est, bassins fluviaux) et présenter ses atouts et contraintes.`,
    `Expliquer les étapes de l’ouverture économique depuis 1978 (ZES, OMC, Nouvelles routes de la soie).`,
    `Analyser la littoralisation, la formation de métropoles et de grands pôles (Pékin, Shanghai, delta de la rivière des Perles).`,
    `Comprendre l’urbanisation, les migrations intérieures et le système du hukou.`,
    `Montrer les inégalités territoriales (Est/Ouest, villes/campagnes) et les politiques de rééquilibrage.`,
    `Évaluer les défis démographiques, environnementaux et géopolitiques.`,
    `Réaliser un croquis de synthèse sur la Chine.`,
  ],
  keywords: [`Chine`, `ZES`, `Shenzhen`, `littoralisation`, `hukou`, `migrants`, `urbanisation`, `delta de la rivière des Perles`, `Pudong`, `Go West`, `Nouvelles routes de la soie`, `ligne Heihe-Tengchong`, `pollution`, `transition démographique`],

  fiche: [
    { type: 'h2', text: `L’essentiel` },
    { type: 'callout', variant: 'definition', title: `Notions clés`, content: [
      { type: 'keyvalue', items: [
        { key: `Littoralisation`, value: `Concentration croissante des hommes, des activités et de la richesse sur le littoral.` },
        { key: `ZES`, value: `Zone économique spéciale : espace ouvert aux capitaux étrangers avec des avantages (fiscalité, douane). Créées en 1980 : Shenzhen, Zhuhai, Shantou, Xiamen.` },
        { key: `Hukou`, value: `Système d’enregistrement des ménages, rural ou urbain, qui conditionne l’accès aux services (école, santé) dans la ville de résidence ; il limite l’installation durable des migrants ruraux en ville.` },
        { key: `Migrants (mingong)`, value: `Travailleurs ruraux venus travailler en ville sans hukou local : près de 300 millions.` },
        { key: `Nouvelles routes de la soie (BRI)`, value: `Initiative lancée en 2013 par Xi Jinping : grands projets d’infrastructures (routes, ports, voies ferrées) reliant la Chine à l’Asie, l’Afrique et l’Europe.` },
        { key: `Ligne Heihe-Tengchong`, value: `Ligne diagonale (Hu Huanyong, 1935) qui sépare l’est (environ 43 % de la superficie, 94 % de la population) de l’ouest peu peuplé.` },
      ] },
    ] },
    { type: 'h3', text: `Trois idées-forces` },
    { type: 'list', items: [
      `**Une puissance mondiale** : 2e économie du monde, 1er exportateur de marchandises, 1er émetteur de CO₂ ; mais un PIB par habitant encore inférieur à celui des pays développés.`,
      `**Un territoire recomposé** : ouverture de la façade littorale, formation de grands pôles métropolitains, urbanisation massive, grands aménagements.`,
      `**Des fractures et des défis** : inégalités Est/Ouest et villes/campagnes, migrants sans droits, vieillissement, pollution, tensions géopolitiques.`,
    ] },
    { type: 'h3', text: `Chiffres clés` },
    { type: 'table', headers: [`Donnée`, `Valeur`, `Source`], rows: [
      [`Population`, `≈ 1,41 milliard d’habitants (2023), en baisse depuis 2022 ; dépassée par l’Inde en 2023`, `Bureau national des statistiques de Chine (NBS)`],
      [`Taux d’urbanisation`, `≈ 18 % en 1978, plus de 66 % en 2023`, `NBS`],
      [`PIB`, `≈ 126 000 milliards de yuans en 2023 (≈ 17,9 billions de dollars, 2e économie mondiale) ; croissance de 5,2 % en 2023`, `NBS / Banque mondiale`],
      [`Structure du PIB (2023)`, `Tertiaire ≈ 54 %, industrie et construction ≈ 38 %, agriculture ≈ 7 %`, `NBS`],
      [`Travailleurs migrants`, `≈ 297 millions en 2023`, `NBS`],
      [`Fécondité`, `≈ 1,0 à 1,1 enfant par femme (2022-2023)`, `ONU / NBS`],
    ] },
    { type: 'callout', variant: 'remember', title: `À retenir`, content: [
      { type: 'p', text: `La Chine a fait en 40 ans un « bond » : de pays pauvre et rural à atelier du monde puis à puissance technologique. Cette trajectoire a produit un territoire **dual** : une façade littorale hyper-connectée et riche, et des intérieurs plus pauvres, avec des politiques de **rééquilibrage** (Go West, villes nouvelles, LGV).` },
    ] },
  ],

  cours: [
    { type: 'h2', text: `I. Un territoire et un peuple contrastés` },
    { type: 'h3', text: `A. Un espace immense aux contraintes physiques fortes` },
    { type: 'p', text: `Avec environ 9,6 millions de km², la Chine est le 3e ou 4e pays du monde par la superficie (selon les comptages). Le relief se **hiérarchise d’ouest en est** : hauts plateaux et montagnes à l’ouest (plateau tibétain, Tian Shan, Taklamakan), plateaux et bassins au centre, grandes plaines alluviales à l’est (plaine du Nord, plaine du Yangzi) qui concentrent la population et l’agriculture. Les grands fleuves (**Fleuve Jaune**, **Yangzi Jiang**, **rivière des Perles**) coulent d’ouest en est ; ils sont à la fois ressource, voie de transport et risque (inondations).` },
    { type: 'p', text: `La **ligne Heihe-Tengchong** (proposée par le géographe Hu Huanyong en 1935) trace une diagonale du nord-est au sud-ouest : à l’est, environ 43 % de la superficie mais 94 % de la population ; à l’ouest, 57 % de la superficie pour 6 % de la population. Cette dissymétrie reste valable aujourd’hui.` },
    { type: 'h3', text: `B. Une population nombreuse en mutation` },
    { type: 'p', text: `La Chine comptait **1,41 milliard d’habitants en 2023**. Elle a été dépassée par l’**Inde** en 2023 et sa population diminue depuis 2022. La **politique de l’enfant unique** (1979-2015, remplacée par la politique des deux enfants puis des trois enfants en 2021) a fait chuter la fécondité (≈ 1,0 à 1,1 enfant par femme) et accélère le **vieillissement** : les plus de 60 ans représentent plus de 21 % de la population en 2023 (près de 297 millions). Le pays doit financer des retraites et de la santé avec une population active qui diminue. Le déséquilibre entre garçons et filles à la naissance, né de la préférence pour les garçons, a été prononcé.` },

    { type: 'h2', text: `II. Une insertion rapide dans la mondialisation` },
    { type: 'h3', text: `A. Les étapes de l’ouverture (1978-aujourd’hui)` },
    { type: 'timeline', events: [
      { date: `1978`, title: `Début des réformes de Deng Xiaoping`, text: `« Réforme et ouverture » : décollectivisation des campagnes (système de responsabilité des ménages), ouverture aux investissements étrangers.` },
      { date: `1980`, title: `Premières ZES`, text: `Shenzhen, Zhuhai, Shantou (Guangdong), Xiamen (Fujian), près de Hong Kong, Macao et Taïwan.` },
      { date: `1984-1988`, title: `Extension de l’ouverture`, text: `14 villes côtières ouvertes (1984), ZES de l’île de Hainan (1988).` },
      { date: `1990`, title: `Pudong (Shanghai)`, text: `Création de la nouvelle zone de Pudong, qui devient un grand centre financier.` },
      { date: `1997-1999`, title: `Retour de Hong Kong et Macao`, text: `Régime « un pays, deux systèmes ».` },
      { date: `2001`, title: `Adhésion à l’OMC`, text: `Le pays devient « atelier du monde » ; explosion des exportations.` },
      { date: `2013`, title: `Nouvelles routes de la soie`, text: `Initiative « la Ceinture et la Route » lancée par Xi Jinping.` },
      { date: `2015-2025`, title: `« Made in China 2025 », montée en gamme`, text: `Objectif : passer de l’atelier du monde à la puissance technologique (5G, véhicules électriques, IA, aéronautique).` },
    ] },
    { type: 'h3', text: `B. Une puissance économique à tous les niveaux` },
    { type: 'p', text: `La Chine est la **2e économie mondiale** (PIB d’environ 17,9 billions de dollars en 2023, après les États-Unis), le **1er exportateur de marchandises** (environ 14 % des exportations mondiales), le 1er producteur industriel, le 1er émetteur de CO₂. Son économie s’est **tertiarisée** (plus de 54 % du PIB) et **montée en gamme** : constructeurs automobiles électriques (BYD), télécoms (Huawei), commerce en ligne (Alibaba), semi-conducteurs, IA. Mais le PIB **par habitant** (environ 12 600 dollars en 2023) reste inférieur à celui des pays développés : la Chine reste un pays à revenu intermédiaire de tranche supérieure.` },
    { type: 'callout', variant: 'warning', title: `Un modèle fragilisé ?`, content: [
      { type: 'p', text: `Ralentissement de la croissance (de 10 % par an dans les années 2000 à environ 5 % aujourd’hui), crise de l’immobilier (faillite du promoteur Evergrande en 2021-2023), endettement local, chômage des jeunes, tensions commerciales avec les États-Unis et l’Union européenne.` },
    ] },
    { type: 'h3', text: `C. Les Nouvelles routes de la soie (BRI)` },
    { type: 'p', text: `Lancée en 2013, la **Belt and Road Initiative** comprend la « ceinture » terrestre (voies ferrées vers l’Europe via l’Asie centrale) et la « route » maritime (ports de Gwadar au Pakistan, Hambantota au Sri Lanka, Le Pirée en Grèce, etc.). Elle vise à sécuriser les approvisionnements en ressources, ouvrir des marchés, exporter les excédents de capacité de la Chine et accroître son influence. Elle suscite des critiques : endettement de pays partenaires (« piège de la dette »), faible transparence, impacts environnementaux.` },

    { type: 'h2', text: `III. Des recompositions spatiales multiples` },
    { type: 'h3', text: `A. La littoralisation : une façade ouverte sur le monde` },
    { type: 'p', text: `L’ouverture a commencé par le littoral du Sud-Est : la **façade maritime** concentre ports (Shanghai, Ningbo-Zhoushan, Shenzhen, Guangzhou, Tianjin, Qingdao), industries exportatrices, investissements étrangers et métropoles. Les provinces littorales (Guangdong, Jiangsu, Zhejiang, Shandong) produisent la majorité du PIB et des exportations. C’est la **littoralisation**.` },
    { type: 'p', text: `Trois grands **pôles métropolitains** structurent cette façade :` },
    { type: 'table', headers: [`Pôle`, `Villes`, `Spécificités`], rows: [
      [`Jing-Jin-Ji (Pékin-Tianjin-Hebei)`, `Pékin (capitale politique, ≈ 22 M d’habitants), Tianjin (port), Hebei`, `Pouvoirs politique et économique, universités ; nouvelle ville de Xiong’an (2017) pour désengorger Pékin`],
      [`Delta du Yangzi`, `Shanghai (≈ 25 M), Nanjing, Hangzhou, Suzhou…`, `Premier pôle économique et financier, premier port du monde (Shanghai), industrie, commerce (Alibaba à Hangzhou)`],
      [`Delta de la rivière des Perles (Grande Baie Guangdong-Hong Kong-Macao)`, `Hong Kong, Shenzhen, Guangzhou, Dongguan, Macao…`, `Atelier du monde, électronique (Huawei, Tencent, DJI à Shenzhen), 11 villes et environ 86 millions d’habitants`],
    ] },
    { type: 'callout', variant: 'example', title: `Étude de cas : Shenzhen`, content: [
      { type: 'p', text: `**Shenzhen** n’était en 1979 qu’un bourg de pêcheurs de quelques dizaines de milliers d’habitants, à la frontière de Hong Kong. Devenue ZES en 1980, elle accueille des usines d’assemblage (électronique) attirées par les avantages fiscaux et la main-d’œuvre. Elle compte environ **17,6 millions d’habitants en 2020** (recensement), dont une majorité de migrants. Elle est aujourd’hui un **pôle technologique** (Huawei, Tencent, BYD, DJI) et un grand centre financier. Elle illustre le passage d’un modèle d’assemblage à bas coûts à un modèle d’innovation, mais aussi les difficultés des migrants (hukou), la hausse du prix de l’immobilier.` },
    ] },
    { type: 'callout', variant: 'example', title: `Étude de cas : Shanghai et Pudong`, content: [
      { type: 'p', text: `Shanghai (environ 25 millions d’habitants) est le plus grand port à conteneurs du monde (plus de 49 millions d’EVP en 2023) et un centre financier (Bourse de Shanghai). Le quartier de **Pudong**, ancienne zone de marais et d’entrepôts sur la rive est du Huangpu, a été aménagé à partir de 1990 : **Lujiazui**, quartier d’affaires aux gratte-ciel (Tour de Shanghai, 632 m, 2015), nouvel aéroport international, port en eau profonde de Yangshan (inauguré en 2005 sur une île reliée par un pont de plus de 30 km). Face au Bund historique, Pudong symbolise la vitrine de la nouvelle Chine.` },
    ] },
    { type: 'svg', maxWidth: 720, caption: `Schéma : les grands pôles de la façade littorale chinoise (représentation très simplifiée)`, svg: `<svg viewBox="0 0 720 460" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<rect x="4" y="4" width="712" height="452" fill="none" stroke="currentColor" stroke-opacity="0.3"/>
<polygon points="40,150 100,90 190,60 270,40 340,70 400,40 430,90 410,140 440,170 400,220 380,270 340,320 290,370 220,390 160,360 110,300 60,260 30,210" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-width="1.5"/>
<line x1="110" y1="60" x2="335" y2="385" stroke="hsl(263 70% 60%)" stroke-width="2" stroke-dasharray="8 5"/>
<path d="M410 140 Q445 190 385 270 Q360 310 330 355" stroke="hsl(217 91% 60%)" stroke-width="12" fill="none" opacity="0.35"/>
<circle cx="365" cy="105" r="15" fill="hsl(0 84% 60%)"/>
<circle cx="395" cy="200" r="18" fill="hsl(0 84% 60%)"/>
<circle cx="345" cy="335" r="14" fill="hsl(0 84% 60%)"/>
<circle cx="372" cy="270" r="8" fill="hsl(25 95% 53%)"/>
<circle cx="335" cy="352" r="7" fill="hsl(25 95% 53%)"/>
<circle cx="260" cy="270" r="9" fill="hsl(25 95% 53%)"/>
<circle cx="228" cy="195" r="9" fill="hsl(25 95% 53%)"/>
<circle cx="150" cy="145" r="8" fill="hsl(25 95% 53%)"/>
<ellipse cx="170" cy="220" rx="75" ry="45" fill="hsl(0 84% 60%)" fill-opacity="0.07" stroke="hsl(0 84% 60%)" stroke-dasharray="4 3"/>
<path d="M170 215 L360 110" stroke="hsl(142 71% 45%)" stroke-width="3" fill="none"/>
<g font-size="10" fill="currentColor"><text x="378" y="100">Pékin / Tianjin</text><text x="418" y="205">Shanghai</text><text x="360" y="340">Shenzhen /</text><text x="360" y="352">Hong Kong</text><text x="375" y="280">Xiamen</text><text x="262" y="270">Wuhan</text><text x="205" y="190">Xi’an</text><text x="125" y="140">Urumqi</text><text x="150" y="225">Ouest</text></g>
<g font-size="11" fill="currentColor"><text x="460" y="40" font-weight="bold">Légende</text>
<text x="460" y="62" font-weight="bold">1. Une façade littorale dominante</text>
<circle cx="470" cy="78" r="8" fill="hsl(0 84% 60%)"/><text x="486" y="82">Grands pôles métropolitains mondiaux</text>
<line x1="462" y1="100" x2="482" y2="100" stroke="hsl(217 91% 60%)" stroke-width="10" opacity="0.4"/><text x="490" y="104">Façade maritime ouverte</text>
<text x="460" y="134" font-weight="bold">2. Des intérieurs en développement</text>
<circle cx="470" cy="150" r="6" fill="hsl(25 95% 53%)"/><text x="486" y="154">Villes de l’intérieur (rééquilibrage)</text>
<line x1="462" y1="172" x2="482" y2="172" stroke="hsl(142 71% 45%)" stroke-width="3"/><text x="490" y="176">Axes ferroviaires (LGV)</text>
<text x="460" y="206" font-weight="bold">3. Des fractures</text>
<line x1="462" y1="222" x2="482" y2="222" stroke="hsl(263 70% 60%)" stroke-width="2" stroke-dasharray="6 4"/><text x="490" y="226">Ligne Heihe-Tengchong</text>
<ellipse cx="472" cy="244" rx="10" ry="7" fill="hsl(0 84% 60%)" fill-opacity="0.15" stroke="hsl(0 84% 60%)" stroke-dasharray="3 2"/><text x="490" y="248">Ouest peu peuplé et enclavé</text></g>
</svg>` },
    { type: 'h3', text: `B. Une urbanisation spectaculaire et des migrations massives` },
    { type: 'p', text: `Le taux d’urbanisation est passé d’environ **18 % en 1978 à plus de 66 % en 2023**. Plus de 900 millions de Chinois vivent en ville. Elle repose sur l’exode rural et sur les **migrations intérieures** : près de **300 millions de travailleurs migrants** (mingong) quittent les campagnes de l’intérieur (Sichuan, Henan, Anhui) pour les villes de l’Est. Le **hukou** (permis de résidence) les prive en partie d’accès aux services locaux (écoles pour leurs enfants, santé) : ils sont des « citadins de seconde zone », d’où les enfants laissés au village (« enfants restés »). Des réformes assouplissent progressivement le hukou dans les villes petites et moyennes.` },
    { type: 'p', text: `L’urbanisation s’accompagne de **grands aménagements** : villes nouvelles (Xiong’an, Pudong), réseau de **trains à grande vitesse** (plus de 45 000 km, premier au monde, fin 2023), grands ponts, aéroports. Elle a aussi produit des « villes fantômes » (Ordos) liées à la spéculation immobilière.` },
    { type: 'h3', text: `C. Des inégalités territoriales et des politiques de rééquilibrage` },
    { type: 'p', text: `**Inégalités Est/Ouest** : le PIB par habitant des provinces littorales (Shanghai, Pékin, Jiangsu, Zhejiang) est plusieurs fois supérieur à celui des provinces de l’intérieur (Gansu, Guizhou, Yunnan) ; l’Ouest (Tibet, Xinjiang) est peu peuplé et enclavé. **Inégalités villes/campagnes** : le revenu moyen d’un urbain est environ 2,4 fois celui d’un rural. **Le Nord-Est** (Liaoning, Jilin, Heilongjiang), ancienne « ceinture de rouille » de l’industrie lourde, décline.` },
    { type: 'list', items: [
      `**Go West** (« Ouest en développement », 2000) : infrastructures (voies ferrées Qinghai-Tibet en 2006, routes, barrages), exploitation des ressources, villes comme Chengdu, Chongqing, Xi’an, Urumqi.`,
      `**Relocalisation d’industries** vers l’intérieur ; pôles de croissance (Chongqing, Chengdu, Wuhan).`,
      `**Lutte contre la pauvreté** : Pékin annonce l’éradication de l’extrême pauvreté en 2021.`,
      `**Politique de « prospérité commune »** (2021) pour réduire les inégalités.`,
    ] },
    { type: 'callout', variant: 'warning', title: `Aménager l’Ouest : un enjeu aussi politique`, content: [
      { type: 'p', text: `Au **Xinjiang** et au **Tibet**, l’aménagement de territoires de peuples minoritaires (Ouïghours, Tibétains) s’accompagne d’une forte présence de l’État, d’une immigration han et de tensions politiques et religieuses, avec des accusations de violations des droits humains par plusieurs ONG et pays.` },
    ] },

    { type: 'h2', text: `IV. Des défis majeurs` },
    { type: 'h3', text: `A. Environnement et énergie` },
    { type: 'p', text: `La croissance a un lourd coût environnemental : pollution de l’air (smog dans le Nord, villes comme Pékin ou Shijiazhuang), des eaux et des sols, érosion des sols, désertification au Nord. Le **charbon** fournit encore environ 55 à 60 % du mix énergétique. La Chine est le **1er émetteur de CO₂** (près du tiers des émissions mondiales) mais aussi le 1er investisseur dans les **énergies renouvelables** (solaire, éolien, hydroélectricité : barrage des Trois-Gorges, mis en service en 2003-2012, 22,5 GW) et le 1er producteur de panneaux solaires, de batteries et de véhicules électriques. Elle s’est engagée à atteindre le **pic des émissions avant 2030 et la neutralité carbone avant 2060**. Le projet de transfert d’eau Sud-Nord vise à compenser la pénurie d’eau du Nord.` },
    { type: 'h3', text: `B. Défis démographiques et sociaux` },
    { type: 'p', text: `Vieillissement, baisse de la population active, système de retraites, chômage des jeunes diplômés, inégalités. L’État tente de relancer la natalité (politique des trois enfants en 2021).` },
    { type: 'h3', text: `C. Une puissance géopolitique contestée` },
    { type: 'p', text: `La Chine affirme sa puissance : armée en modernisation, présence en **mer de Chine méridionale** (îles Spratleys artificialisées), tensions avec **Taïwan** (que Pékin considère comme une province), rivalité avec les **États-Unis** (guerre commerciale depuis 2018, restrictions sur les semi-conducteurs), rapprochement avec la Russie, influence en Afrique et en Asie, projet de Nouvelles routes de la soie.` },
    { type: 'svg', maxWidth: 680, caption: `Schéma de synthèse : les recompositions spatiales de la Chine`, svg: `<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
<rect x="4" y="4" width="672" height="292" fill="none" stroke="currentColor" stroke-opacity="0.3"/>
<rect x="30" y="30" width="190" height="230" fill="hsl(217 91% 60%)" fill-opacity="0.12" stroke="hsl(217 91% 60%)"/>
<text x="125" y="55" text-anchor="middle" fill="currentColor" font-weight="bold">Ouverture (1978-2001)</text>
<text x="125" y="85" text-anchor="middle" fill="currentColor" font-size="11">Réformes de Deng</text>
<text x="125" y="105" text-anchor="middle" fill="currentColor" font-size="11">ZES (1980)</text>
<text x="125" y="125" text-anchor="middle" fill="currentColor" font-size="11">Entrée à l’OMC (2001)</text>
<text x="125" y="165" text-anchor="middle" fill="currentColor" font-size="11">Atelier du monde</text>
<rect x="245" y="30" width="190" height="230" fill="hsl(25 95% 53%)" fill-opacity="0.12" stroke="hsl(25 95% 53%)"/>
<text x="340" y="55" text-anchor="middle" fill="currentColor" font-weight="bold">Recompositions</text>
<text x="340" y="85" text-anchor="middle" fill="currentColor" font-size="11">Littoralisation</text>
<text x="340" y="105" text-anchor="middle" fill="currentColor" font-size="11">Métropoles et pôles</text>
<text x="340" y="125" text-anchor="middle" fill="currentColor" font-size="11">Urbanisation (66 %)</text>
<text x="340" y="145" text-anchor="middle" fill="currentColor" font-size="11">Migrations (≈ 300 M)</text>
<text x="340" y="165" text-anchor="middle" fill="currentColor" font-size="11">LGV, ports, villes nouvelles</text>
<rect x="460" y="30" width="190" height="230" fill="hsl(0 84% 60%)" fill-opacity="0.12" stroke="hsl(0 84% 60%)"/>
<text x="555" y="55" text-anchor="middle" fill="currentColor" font-weight="bold">Défis</text>
<text x="555" y="85" text-anchor="middle" fill="currentColor" font-size="11">Inégalités Est/Ouest</text>
<text x="555" y="105" text-anchor="middle" fill="currentColor" font-size="11">Vieillissement</text>
<text x="555" y="125" text-anchor="middle" fill="currentColor" font-size="11">Pollution, charbon</text>
<text x="555" y="145" text-anchor="middle" fill="currentColor" font-size="11">Tensions géopolitiques</text>
<text x="555" y="165" text-anchor="middle" fill="currentColor" font-size="11">Ralentissement</text>
<path d="M220 145 L245 145 M435 145 L460 145" stroke="currentColor" stroke-width="3"/>
</svg>` },

    { type: 'h2', text: `Méthode : le croquis de la Chine` },
    { type: 'steps', items: [
      { title: `1. Fond de carte`, text: `Tracer les contours, le littoral, quelques fleuves (Fleuve Jaune, Yangzi) ; placer Pékin, Shanghai, Hong Kong/Shenzhen.` },
      { title: `2. Plan de légende`, text: `Exemple : I. Une façade littorale puissante et ouverte ; II. Des espaces intérieurs en recomposition ; III. Des fractures et des défis.` },
      { title: `3. Figurés`, text: `Cercles de taille variable pour les métropoles, aplats pour la façade et les intérieurs, flèches pour les migrations et les flux, tirets pour la ligne Heihe-Tengchong.` },
      { title: `4. Nomenclature et titre`, text: `Nommer les principales villes et régions ; titre : « La Chine : un territoire recomposé par l’ouverture ».` },
    ] },
  ],

  exercices: [
    {
      id: 'chn-ex1', title: `Définir les notions`, difficulty: 1, duration: 10, tags: [`notions`],
      statement: [{ type: 'p', text: `Définissez : ZES, hukou, littoralisation, Nouvelles routes de la soie. Donnez un exemple.` }],
      hints: [`Exemple : Shenzhen, Shanghai, Gwadar…`],
      solution: [{ type: 'list', items: [
        `**ZES** : zone ouverte aux capitaux étrangers avec avantages fiscaux (Shenzhen, 1980).`,
        `**Hukou** : permis de résidence rural/urbain qui limite l’accès des migrants aux services urbains.`,
        `**Littoralisation** : concentration de la population et des richesses sur la façade maritime (Shanghai, delta de la rivière des Perles).`,
        `**Nouvelles routes de la soie** : initiative de 2013 d’infrastructures reliant la Chine au reste du monde (port de Gwadar, voie ferrée vers l’Europe).`,
      ] }],
    },
    {
      id: 'chn-ex2', title: `Lire des données : urbanisation chinoise`, difficulty: 1, duration: 15, tags: [`statistiques`],
      statement: [
        { type: 'table', caption: `Taux d’urbanisation de la Chine (NBS, arrondis)`, headers: [`Année`, `1978`, `2000`, `2023`], rows: [[`Taux`, `18 %`, `36 %`, `66 %`]] },
        { type: 'p', text: `1. Calculez la hausse en points entre 1978 et 2023. 2. Comparez les rythmes 1978-2000 et 2000-2023. 3. Quels sont les moteurs de cette urbanisation ?` },
      ],
      hints: [`Points par an = différence / nombre d’années.`],
      solution: [
        { type: 'p', text: `1. 66 − 18 = **48 points**.` },
        { type: 'p', text: `2. 1978-2000 : 18 points en 22 ans, soit 0,8 point par an ; 2000-2023 : 30 points en 23 ans, soit environ 1,3 point par an. L’urbanisation **s’accélère** après l’adhésion à l’OMC.` },
        { type: 'p', text: `3. Exode rural, industrialisation de la façade littorale, politique d’urbanisation de l’État, création de villes nouvelles, extension du périmètre administratif des villes.` },
      ],
    },
    {
      id: 'chn-ex3', title: `Étude de cas : Shenzhen`, difficulty: 2, duration: 25, tags: [`document`, `étude de cas`],
      statement: [
        { type: 'table', caption: `Population de Shenzhen (arrondis)`, headers: [`Année`, `1979`, `1990`, `2020`], rows: [[`Habitants`, `≈ 30 000`, `≈ 2 millions`, `≈ 17,6 millions`]] },
        { type: 'p', text: `1. Décrivez l’évolution. 2. Expliquez les facteurs de cette croissance. 3. Montrez que Shenzhen illustre à la fois les réussites et les limites du modèle chinois.` },
      ],
      hints: [`ZES, migrants, proximité de Hong Kong, hukou, prix de l’immobilier.`],
      solution: [
        { type: 'p', text: `1. De quelques dizaines de milliers d’habitants à environ 17,6 millions en 40 ans : population multipliée par près de 600.` },
        { type: 'p', text: `2. **Statut de ZES** (1980) et avantages fiscaux ; proximité de **Hong Kong** (capitaux, savoir-faire) ; main-d’œuvre abondante venue des campagnes (migrants) ; accès au port ; politique volontariste de l’État.` },
        { type: 'p', text: `3. **Réussites** : passage de l’assemblage à la haute technologie (Huawei, Tencent, DJI), richesse, métropole mondiale. **Limites** : inégalités, travailleurs migrants sans hukou local, coût de la vie, forte dépendance aux exportations, pollution, conditions de travail difficiles.` },
      ],
    },
    {
      id: 'chn-ex4', title: `Analyser un document : le hukou`, difficulty: 2, duration: 25, tags: [`document`, `migrations`],
      statement: [
        { type: 'quote', text: `Un migrant originaire du Sichuan travaille depuis dix ans dans une usine de Dongguan. Son hukou reste rural : ses enfants ne peuvent pas être scolarisés dans les écoles publiques de la ville, il n’a qu’un accès limité à la sécurité sociale locale. Chaque année, il rentre au village pour le Nouvel An chinois.`, source: `Cas type d’après des enquêtes de terrain sur les travailleurs migrants` },
        { type: 'p', text: `1. Qu’est-ce que le hukou ? 2. Quelles conséquences sociales a-t-il ? 3. Quelles évolutions sont en cours ?` },
      ],
      hints: [`Pensez aux « enfants restés au village ».`],
      solution: [
        { type: 'p', text: `1. Le **hukou** est un système d’enregistrement qui rattache chaque ménage à un lieu et à un statut (rural ou urbain). Les droits sociaux (école, santé, retraite) sont liés au lieu d’enregistrement.` },
        { type: 'p', text: `2. Les migrants (≈ 300 millions) occupent des emplois urbains sans bénéficier des mêmes droits : inégalités, précarité, séparation des familles (enfants « restés » au village), forte mobilité saisonnière (migration pendulaire annuelle au Nouvel An).` },
        { type: 'p', text: `3. Depuis les années 2010, assouplissement progressif du hukou pour les petites et moyennes villes, tout en maintenant des contraintes dans les mégapoles (Pékin, Shanghai). Les réformes sont lentes.` },
      ],
    },
    {
      id: 'chn-ex5', title: `Schéma : les inégalités territoriales`, difficulty: 2, duration: 25, tags: [`schéma`],
      statement: [{ type: 'p', text: `Réalisez un schéma simple des inégalités spatiales en Chine : façade littorale, intérieur, ouest, Nord-Est industriel, ligne Heihe-Tengchong, flux de migrants. Organisez la légende.` }],
      hints: [`Utilisez des aplats de couleurs dégradées et des flèches.`],
      solution: [
        { type: 'list', items: [
          `**I. Des espaces dominants** : façade littorale (aplat foncé), grands pôles (cercles), ports.`,
          `**II. Des espaces en décalage** : Ouest peu peuplé (aplat clair), Nord-Est en reconversion (hachures), campagnes de l’intérieur.`,
          `**III. Des flux et des liens** : flèches de migrations vers la façade, ligne Heihe-Tengchong en tirets, LGV et politiques de rééquilibrage (Go West).`,
        ] },
        { type: 'p', text: `Titre : « Des inégalités territoriales qui persistent malgré le rééquilibrage ».` },
      ],
    },
    {
      id: 'chn-ex6', title: `Les Nouvelles routes de la soie`, difficulty: 2, duration: 30, tags: [`document`, `géopolitique`],
      statement: [
        { type: 'quote', text: `Lancée en 2013 par le président Xi Jinping, l’initiative « la Ceinture et la Route » vise à financer et construire des infrastructures dans plus de 140 pays. Des ports comme Gwadar (Pakistan) ou Le Pirée (Grèce) ont été développés avec des capitaux chinois ; certains pays partenaires s’inquiètent de leur endettement.`, source: `Synthèse d’après des sources officielles et la presse` },
        { type: 'p', text: `1. Quels sont les objectifs de la Chine ? 2. Quels risques ces projets font-ils courir aux pays partenaires ? 3. Quelle stratégie spatiale ces routes traduisent-elles ?` },
      ],
      hints: [`Ressources, débouchés, influence, sécurité des routes maritimes.`],
      solution: [
        { type: 'p', text: `1. **Objectifs** : sécuriser les approvisionnements en énergie et matières premières, ouvrir des marchés aux entreprises et aux surcapacités chinoises, développer l’Ouest enclavé, accroître l’influence politique et diplomatique.` },
        { type: 'p', text: `2. **Risques** : endettement (exemple du port de Hambantota au Sri Lanka, cédé en location à une entreprise chinoise en 2017), dépendance économique, impacts environnementaux, faible transparence, tensions avec les populations locales.` },
        { type: 'p', text: `3. Une **stratégie de réseau** : la Chine se positionne au centre d’un vaste maillage terrestre et maritime, qui lui assure une maîtrise des flux et un rôle de puissance mondiale, tout en contournant la dépendance au détroit de Malacca.` },
      ],
    },
    {
      id: 'chn-ex7', title: `Composition type bac : la Chine, un territoire recomposé`, difficulty: 3, duration: 45, tags: [`type bac`, `composition`],
      statement: [{ type: 'p', text: `**Sujet** : « La Chine : des recompositions spatiales multiples ». Rédigez l’introduction, le plan détaillé et la conclusion.` }],
      hints: [`Plan : ouverture et mondialisation / littoralisation, métropoles et urbanisation / inégalités et défis.`],
      solution: [
        { type: 'p', text: `**Introduction** : En 1978, la Chine est un pays pauvre et rural ; en 2023, c’est la deuxième économie du monde, plus urbaine que rurale. Cette trajectoire, engagée par l’ouverture économique de Deng Xiaoping, a profondément recomposé son territoire. Comment l’intégration à la mondialisation a-t-elle transformé l’espace chinois, et avec quelles limites ? Nous verrons d’abord l’ouverture et ses étapes, puis la recomposition du territoire (littoralisation, métropoles, urbanisation), enfin les inégalités et défis qui subsistent.` },
        { type: 'list', ordered: true, items: [
          `**Une ouverture progressive à la mondialisation** : réformes de 1978, ZES (Shenzhen 1980), OMC (2001), atelier du monde, montée en gamme, Nouvelles routes de la soie.`,
          `**Un territoire recomposé** : littoralisation (façade maritime, ports), trois grands pôles (Jing-Jin-Ji, delta du Yangzi, delta de la rivière des Perles), urbanisation (18 % → 66 %), migrations (≈ 300 M), grands aménagements.`,
          `**Des inégalités et des défis** : Est/Ouest, villes/campagnes, hukou, Nord-Est en reconversion, Go West, vieillissement, pollution et transition énergétique, tensions géopolitiques.`,
        ] },
        { type: 'p', text: `**Conclusion** : La Chine a connu une recomposition spatiale rapide centrée sur le littoral, mais reste marquée par de fortes inégalités et des défis environnementaux et démographiques ; sa puissance s’accompagne de fragilités.` },
      ],
    },
  ],

  representations: [
    { type: 'timeline', events: [
      { date: `1949`, title: `Proclamation de la République populaire de Chine`, text: `Mao Zedong ; économie planifiée et collectivisation.` },
      { date: `1978`, title: `Réformes de Deng Xiaoping`, text: `Début de la politique de réforme et d’ouverture.` },
      { date: `1980`, title: `Premières ZES`, text: `Shenzhen, Zhuhai, Shantou, Xiamen.` },
      { date: `1979-2015`, title: `Politique de l’enfant unique`, text: `Remplacée par la politique des deux enfants (2016), puis des trois (2021).` },
      { date: `1990`, title: `Pudong`, text: `Lancement de la nouvelle zone de Shanghai.` },
      { date: `2001`, title: `Entrée à l’OMC`, text: `Essor des exportations.` },
      { date: `2010`, title: `2e économie mondiale`, text: `La Chine dépasse le Japon pour le PIB.` },
      { date: `2013`, title: `Nouvelles routes de la soie`, text: `Initiative « la Ceinture et la Route ».` },
      { date: `2023`, title: `L’Inde dépasse la Chine en population`, text: `La population chinoise diminue depuis 2022.` },
    ] },
    { type: 'flashcards', cards: [
      { front: `ZES`, back: `Zone économique spéciale : espace ouvert aux capitaux étrangers, créée en 1980 (Shenzhen, Zhuhai, Shantou, Xiamen).` },
      { front: `Hukou`, back: `Permis de résidence rural/urbain qui conditionne l’accès aux services publics.` },
      { front: `Mingong`, back: `Travailleurs migrants ruraux en ville (≈ 300 millions).` },
      { front: `Littoralisation`, back: `Concentration des hommes et des activités sur le littoral.` },
      { front: `Ligne Heihe-Tengchong`, back: `Ligne qui sépare l’est (94 % de la population) de l’ouest peu peuplé.` },
      { front: `Go West`, back: `Politique de développement de l’ouest chinois lancée en 2000.` },
      { front: `Pudong`, back: `Nouvelle zone de Shanghai, aménagée depuis 1990 (quartier d’affaires de Lujiazui).` },
      { front: `Nouvelles routes de la soie`, back: `Initiative chinoise (2013) d’infrastructures : « Ceinture » terrestre et « Route » maritime.` },
      { front: `Grande Baie Guangdong-Hong Kong-Macao`, back: `Pôle de 11 villes (≈ 86 M d’habitants), atelier du monde et centre technologique.` },
      { front: `Politique de l’enfant unique`, back: `1979-2015 ; cause du vieillissement rapide.` },
      { front: `Atelier du monde`, back: `Qualificatif donné à la Chine depuis les années 1990-2000 (premier producteur industriel).` },
      { front: `Mer de Chine méridionale`, back: `Espace maritime stratégique revendiqué en grande partie par la Chine (îles Spratleys, Paracels).` },
    ] },
    { type: 'matching', title: `Associer le lieu et le fait`, pairs: [
      { left: `Shenzhen`, right: `ZES créée en 1980 devenue pôle technologique` },
      { left: `Pudong`, right: `Quartier d’affaires de Shanghai (Lujiazui)` },
      { left: `Xiong’an`, right: `Ville nouvelle (2017) pour désengorger Pékin` },
      { left: `Chongqing / Chengdu`, right: `Grandes villes de l’intérieur, politique Go West` },
      { left: `Xinjiang / Tibet`, right: `Régions de l’ouest de peuplement minoritaire` },
      { left: `Trois-Gorges`, right: `Barrage hydroélectrique sur le Yangzi` },
    ] },
    { type: 'truefalse', title: `Vrai ou faux ?`, statements: [
      { text: `La Chine est entrée à l’OMC en 2001.`, answer: true },
      { text: `La population chinoise continue d’augmenter rapidement.`, answer: false, explanation: `Elle diminue depuis 2022 et l’Inde l’a dépassée en 2023.` },
      { text: `La majorité des Chinois vivent en ville en 2023.`, answer: true, explanation: `Plus de 66 % d’urbains.` },
      { text: `L’Ouest concentre l’essentiel de la population chinoise.`, answer: false, explanation: `94 % de la population vit à l’est de la ligne Heihe-Tengchong.` },
      { text: `Le charbon est la première source d’énergie de la Chine.`, answer: true },
    ] },
    { type: 'svg', maxWidth: 600, caption: `Évolution de l’urbanisation chinoise (en % de la population)`, svg: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<line x1="60" y1="230" x2="560" y2="230" stroke="currentColor"/><line x1="60" y1="230" x2="60" y2="30" stroke="currentColor"/>
<g stroke="currentColor" stroke-opacity="0.15"><line x1="60" y1="180" x2="560" y2="180"/><line x1="60" y1="130" x2="560" y2="130"/><line x1="60" y1="80" x2="560" y2="80"/></g>
<g fill="currentColor" font-size="11" text-anchor="end"><text x="52" y="234">0</text><text x="52" y="184">20</text><text x="52" y="134">40</text><text x="52" y="84">60</text></g>
<rect x="110" y="185" width="60" height="45" fill="hsl(217 91% 60%)"/><text x="140" y="178" text-anchor="middle" fill="currentColor">18 %</text>
<rect x="250" y="140" width="60" height="90" fill="hsl(217 91% 60%)"/><text x="280" y="133" text-anchor="middle" fill="currentColor">36 %</text>
<rect x="390" y="70" width="60" height="160" fill="hsl(0 84% 60%)"/><text x="420" y="63" text-anchor="middle" fill="currentColor">66 %</text>
<g fill="currentColor" text-anchor="middle"><text x="140" y="250">1978</text><text x="280" y="250">2000</text><text x="420" y="250">2023</text></g>
</svg>` },
    { type: 'qcm', questions: [
      { question: `En quelle année ont été créées les premières ZES chinoises ?`, choices: [`1949`, `1978`, `1980`, `2001`], answer: 2 },
      { question: `Quelle ZES était un village de pêcheurs en 1979 ?`, choices: [`Shenzhen`, `Pékin`, `Chongqing`, `Wuhan`], answer: 0 },
      { question: `Que désigne le hukou ?`, choices: [`Une monnaie`, `Un permis de résidence rural/urbain`, `Un fleuve`, `Un plan quinquennal`], answer: 1 },
      { question: `Quelle part de la population vit à l’est de la ligne Heihe-Tengchong ?`, choices: [`50 %`, `70 %`, `94 %`, `99 %`], answer: 2 },
      { question: `Quel est le taux d’urbanisation de la Chine en 2023 ?`, choices: [`Environ 36 %`, `Environ 50 %`, `Plus de 66 %`, `Environ 90 %`], answer: 2 },
      { question: `Les Nouvelles routes de la soie ont été lancées en :`, choices: [`2001`, `2008`, `2013`, `2020`], answer: 2 },
      { question: `Quel pays a dépassé la Chine en population en 2023 ?`, choices: [`États-Unis`, `Inde`, `Indonésie`, `Pakistan`], answer: 1 },
      { question: `Quel est l’objectif de la politique « Go West » ?`, choices: [`Renforcer la façade littorale`, `Développer l’ouest du pays`, `Limiter les migrations vers l’étranger`, `Fermer les ZES`], answer: 1 },
    ] },
  ],
}

export default chapter
