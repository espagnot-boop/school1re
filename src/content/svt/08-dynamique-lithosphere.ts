import type { Chapter } from '../types'

// Bandes d’anomalies magnétiques symétriques de part et d’autre de l’axe de la dorsale (x = 300)
function bandesAnomalies(): string {
  const normales: [number, number][] = [
    [0, 10],
    [34, 52],
    [74, 90],
    [116, 128],
    [150, 172],
    [206, 220],
  ]
  let s = ''
  for (const [a, b] of normales) {
    s += `<rect x="${300 + a}" y="70" width="${b - a}" height="110" fill="currentColor" opacity="0.75"/>`
    if (a > 0) s += `<rect x="${300 - b}" y="70" width="${b - a}" height="110" fill="currentColor" opacity="0.75"/>`
  }
  s += `<rect x="290" y="70" width="10" height="110" fill="currentColor" opacity="0.75"/>`
  return s
}

const svgDorsale = `<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <rect x="0" y="30" width="600" height="60" fill="hsl(217 91% 60% / 0.12)"/>
  <text x="14" y="50" fill="currentColor" font-size="11">Océan</text>
  <!-- croûte océanique -->
  <polygon points="20,100 260,72 300,90 340,72 580,100 580,125 340,97 300,115 260,97 20,125" fill="hsl(25 95% 53% / 0.35)" stroke="currentColor" stroke-width="1.2"/>
  <!-- manteau lithosphérique : s’épaissit avec l’âge -->
  <polygon points="20,125 260,97 300,115 340,97 580,125 580,190 300,125 20,190" fill="hsl(263 70% 60% / 0.18)" stroke="currentColor" stroke-width="0.8"/>
  <!-- asthénosphère -->
  <rect x="20" y="190" width="560" height="100" fill="hsl(0 84% 60% / 0.10)"/>
  <polygon points="300,125 20,190 580,190" fill="hsl(0 84% 60% / 0.10)" stroke="none"/>
  <!-- zone de fusion -->
  <polygon points="300,130 255,215 345,215" fill="hsl(0 84% 60% / 0.35)" stroke="hsl(0 84% 60%)" stroke-width="1"/>
  <ellipse cx="300" cy="107" rx="18" ry="8" fill="hsl(0 84% 60% / 0.7)"/>
  <!-- flèches -->
  <line x1="300" y1="285" x2="300" y2="222" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="300,215 295,226 305,226" fill="currentColor"/>
  <line x1="270" y1="68" x2="150" y2="68" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="144,68 154,63 154,73" fill="currentColor"/>
  <line x1="330" y1="68" x2="450" y2="68" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="456,68 446,63 446,73" fill="currentColor"/>
  <text x="300" y="25" text-anchor="middle" fill="currentColor" font-weight="600">Axe de la dorsale</text>
  <text x="120" y="60" fill="currentColor" font-size="11" text-anchor="middle">plaque</text>
  <text x="480" y="60" fill="currentColor" font-size="11" text-anchor="middle">plaque</text>
  <text x="130" y="112" fill="currentColor" font-size="11">Croûte (basalte, gabbro) ≈ 7 km</text>
  <text x="95" y="160" fill="currentColor" font-size="11">Manteau lithosphérique (péridotite) : s’épaissit en vieillissant</text>
  <text x="312" y="250" fill="currentColor" font-size="11">Remontée de manteau (asthénosphère)</text>
  <text x="312" y="264" fill="currentColor" font-size="11">décompression → fusion partielle</text>
  <text x="318" y="170" fill="hsl(0 84% 60%)" font-size="11">fusion partielle ≈ 10 %</text>
  <text x="300" y="310" text-anchor="middle" fill="currentColor" font-size="11">Coupe schématique d’une dorsale (échelle verticale exagérée)</text>
</svg>`

const svgAnomalies = `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <rect x="60" y="70" width="480" height="110" fill="none" stroke="currentColor" stroke-width="1"/>
  ${bandesAnomalies()}
  <line x1="300" y1="55" x2="300" y2="195" stroke="hsl(0 84% 60%)" stroke-width="2"/>
  <text x="300" y="45" text-anchor="middle" fill="hsl(0 84% 60%)" font-weight="600">axe de la dorsale</text>
  <rect x="70" y="215" width="14" height="14" fill="currentColor" opacity="0.75"/>
  <text x="92" y="227" fill="currentColor" font-size="11">Anomalie positive : aimantation de polarité normale</text>
  <rect x="70" y="236" width="14" height="14" fill="none" stroke="currentColor"/>
  <text x="92" y="248" fill="currentColor" font-size="11">Anomalie négative : aimantation de polarité inverse</text>
  <text x="300" y="20" text-anchor="middle" fill="currentColor" font-size="11">Vue de dessus : bandes symétriques de part et d’autre de l’axe</text>
</svg>`

const svgLimites = `<svg viewBox="0 0 620 210" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <g>
    <rect x="10" y="60" width="80" height="60" fill="hsl(217 91% 60% / 0.2)" stroke="currentColor"/>
    <rect x="120" y="60" width="80" height="60" fill="hsl(217 91% 60% / 0.2)" stroke="currentColor"/>
    <line x1="85" y1="150" x2="40" y2="150" stroke="currentColor" stroke-width="1.5"/><polygon points="34,150 44,145 44,155" fill="currentColor"/>
    <line x1="125" y1="150" x2="170" y2="150" stroke="currentColor" stroke-width="1.5"/><polygon points="176,150 166,145 166,155" fill="currentColor"/>
    <text x="105" y="40" text-anchor="middle" fill="currentColor" font-weight="600">Divergente</text>
    <text x="105" y="185" text-anchor="middle" fill="currentColor" font-size="11">dorsale : accrétion</text>
  </g>
  <g>
    <rect x="230" y="60" width="80" height="60" fill="hsl(217 91% 60% / 0.2)" stroke="currentColor"/>
    <rect x="340" y="60" width="80" height="60" fill="hsl(25 95% 53% / 0.25)" stroke="currentColor"/>
    <line x1="245" y1="150" x2="290" y2="150" stroke="currentColor" stroke-width="1.5"/><polygon points="296,150 286,145 286,155" fill="currentColor"/>
    <line x1="405" y1="150" x2="360" y2="150" stroke="currentColor" stroke-width="1.5"/><polygon points="354,150 364,145 364,155" fill="currentColor"/>
    <text x="325" y="40" text-anchor="middle" fill="currentColor" font-weight="600">Convergente</text>
    <text x="325" y="185" text-anchor="middle" fill="currentColor" font-size="11">subduction ou collision</text>
  </g>
  <g>
    <rect x="450" y="60" width="70" height="60" fill="hsl(217 91% 60% / 0.2)" stroke="currentColor"/>
    <rect x="525" y="60" width="70" height="60" fill="hsl(217 91% 60% / 0.2)" stroke="currentColor"/>
    <line x1="480" y1="140" x2="480" y2="165" stroke="currentColor" stroke-width="1.5"/><polygon points="480,171 475,161 485,161" fill="currentColor"/>
    <line x1="565" y1="165" x2="565" y2="140" stroke="currentColor" stroke-width="1.5"/><polygon points="565,134 560,144 570,144" fill="currentColor"/>
    <text x="522" y="40" text-anchor="middle" fill="currentColor" font-weight="600">Transformante</text>
    <text x="522" y="190" text-anchor="middle" fill="currentColor" font-size="11">faille coulissante</text>
  </g>
</svg>`

const svgHotspot = `<svg viewBox="0 0 620 320" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <rect x="0" y="40" width="620" height="45" fill="hsl(217 91% 60% / 0.12)"/>
  <!-- plaque -->
  <rect x="10" y="100" width="600" height="55" fill="hsl(263 70% 60% / 0.2)" stroke="currentColor" stroke-width="1"/>
  <!-- panache -->
  <path d="M 470 310 C 440 250 450 200 470 160 L 490 160 C 510 200 520 250 490 310 Z" fill="hsl(0 84% 60% / 0.35)" stroke="hsl(0 84% 60%)"/>
  <ellipse cx="480" cy="140" rx="22" ry="12" fill="hsl(0 84% 60% / 0.6)"/>
  <!-- volcans -->
  <polygon points="440,100 480,50 520,100" fill="hsl(25 95% 53% / 0.7)" stroke="currentColor"/>
  <polygon points="320,100 345,72 370,100" fill="hsl(25 95% 53% / 0.45)" stroke="currentColor"/>
  <polygon points="195,100 215,88 235,100" fill="hsl(25 95% 53% / 0.3)" stroke="currentColor"/>
  <polygon points="60,100 85,92 110,100" fill="none" stroke="currentColor" stroke-dasharray="3 3"/>
  <line x1="60" y1="84" x2="110" y2="84" stroke="currentColor" stroke-dasharray="2 3" stroke-width="0.6"/>
  <!-- flèche plaque -->
  <line x1="420" y1="125" x2="290" y2="125" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="284,125 294,120 294,130" fill="currentColor"/>
  <text x="355" y="120" text-anchor="middle" fill="currentColor" font-size="11">mouvement de la plaque</text>
  <text x="480" y="25" text-anchor="middle" fill="currentColor" font-size="11">volcan actif (0 Ma)</text>
  <text x="357" y="30" text-anchor="middle" fill="currentColor" font-size="11">plus âgé</text>
  <text x="215" y="30" text-anchor="middle" fill="currentColor" font-size="11">encore plus âgé</text>
  <text x="85" y="30" text-anchor="middle" fill="currentColor" font-size="11">guyot (sous l’eau)</text>
  <text x="480" y="230" text-anchor="middle" fill="currentColor" font-size="11">Panache</text>
  <text x="480" y="244" text-anchor="middle" fill="currentColor" font-size="11">de manteau chaud</text>
  <text x="200" y="260" text-anchor="middle" fill="currentColor" font-size="11">Le point chaud reste « fixe » :</text>
  <text x="200" y="274" text-anchor="middle" fill="currentColor" font-size="11">la plaque défile au-dessus.</text>
  <text x="310" y="312" text-anchor="middle" fill="currentColor" font-size="11">Âge des édifices croissant dans le sens du déplacement de la plaque</text>
</svg>`

const svgSubduction = `<svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <rect x="0" y="40" width="300" height="70" fill="hsl(217 91% 60% / 0.12)"/>
  <text x="14" y="60" fill="currentColor" font-size="11">Océan</text>
  <!-- manteau/asthénosphère -->
  <rect x="0" y="138" width="600" height="190" fill="hsl(0 84% 60% / 0.08)"/>
  <!-- plaque plongeante -->
  <polygon points="60,110 300,110 470,280 450,300 288,138 60,138" fill="hsl(217 91% 60% / 0.3)" stroke="currentColor" stroke-width="1.2"/>
  <!-- plaque chevauchante -->
  <polygon points="300,110 310,95 580,90 580,150 340,150" fill="hsl(25 95% 53% / 0.3)" stroke="currentColor" stroke-width="1.2"/>
  <!-- volcan -->
  <polygon points="410,93 430,62 450,92" fill="hsl(25 95% 53% / 0.8)" stroke="currentColor"/>
  <!-- séismes -->
  <g fill="hsl(0 84% 60%)">
    <circle cx="320" cy="140" r="3"/><circle cx="350" cy="170" r="3"/><circle cx="380" cy="200" r="3"/><circle cx="410" cy="230" r="3"/><circle cx="440" cy="260" r="3"/>
  </g>
  <line x1="200" y1="124" x2="150" y2="124" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="144,124 154,119 154,129" fill="currentColor"/>
  <text x="170" y="150" fill="currentColor" font-size="11" text-anchor="middle">lithosphère océanique</text>
  <text x="170" y="164" fill="currentColor" font-size="11" text-anchor="middle">froide et dense</text>
  <text x="295" y="100" fill="currentColor" font-size="11" text-anchor="end">fosse</text>
  <text x="520" y="120" fill="currentColor" font-size="11" text-anchor="middle">plaque chevauchante</text>
  <text x="520" y="250" fill="currentColor" font-size="11">séismes alignés</text>
  <text x="520" y="264" fill="currentColor" font-size="11">(plan de Wadati-Benioff)</text>
  <text x="430" y="50" fill="currentColor" font-size="11" text-anchor="middle">arc volcanique</text>
  <text x="300" y="332" text-anchor="middle" fill="currentColor" font-size="11">Subduction : la lithosphère océanique plonge dans l’asthénosphère</text>
</svg>`

const chapter: Chapter = {
  id: 'dynamique-lithosphere',
  subject: 'svt',
  order: 8,
  title: 'La dynamique de la lithosphère : tectonique des plaques',
  theme: 'La dynamique interne de la Terre',
  summary:
    'Plaques lithosphériques et leurs mouvements (GPS, paléomagnétisme), naissance de la lithosphère océanique aux dorsales, son vieillissement, sa disparition en subduction et les points chauds.',
  duration: '4 semaines',
  objectives: [
    'Décrire l’histoire d’un modèle : de la dérive des continents à la tectonique des plaques.',
    'Exploiter des données de GPS, de paléomagnétisme et d’âge des fonds océaniques pour déterminer des mouvements de plaques.',
    'Expliquer la formation de la lithosphère océanique à l’axe des dorsales (fusion partielle par décompression, magmatisme, ophiolites).',
    'Relier le vieillissement de la lithosphère océanique à son refroidissement, son épaississement et sa densité.',
    'Caractériser une zone de subduction (séismes, géométrie) et un point chaud (chaîne d’îles).',
  ],
  keywords: [
    'plaque lithosphérique',
    'dorsale',
    'accrétion',
    'GPS',
    'paléomagnétisme',
    'anomalies magnétiques',
    'ophiolite',
    'fusion partielle',
    'subduction',
    'point chaud',
    'Wegener',
  ],
  fiche: [
    { type: 'h2', text: 'La tectonique des plaques en bref' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Plaque lithosphérique',
      content: [
        {
          type: 'p',
          text: 'Portion de **lithosphère rigide** (croûte + manteau supérieur) bordée de zones d’activité sismique et volcanique, qui se déplace par rapport aux autres sur l’asthénosphère ductile. On en compte **7 grandes** (Pacifique, Eurasie, Afrique, Amérique du Nord, Amérique du Sud, Antarctique, Indo-Australie) et une dizaine de plus petites. Vitesses : de **1 à 15 cm/an**.',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Limite', 'Mouvement relatif', 'Exemples', 'Phénomènes'],
      rows: [
        ['Divergente (dorsale)', 'Écartement', 'Dorsale médio-atlantique, dorsale est-Pacifique', 'Séismes superficiels, volcanisme basaltique, naissance de lithosphère'],
        ['Convergente', 'Rapprochement', 'Fosse du Japon, Andes, Himalaya', 'Séismes jusqu’à 700 km, volcanisme explosif, déformations'],
        ['Transformante', 'Coulissage', 'Faille de San Andreas', 'Séismes superficiels, pas de création/destruction de lithosphère'],
      ],
    },
    { type: 'h3', text: 'Comment mesurer le mouvement ?' },
    {
      type: 'list',
      items: [
        '**GPS / géodésie spatiale** : mesure directe, en temps réel, de vitesses de quelques mm à cm/an.',
        '**Paléomagnétisme** : les anomalies magnétiques symétriques de part et d’autre des dorsales enregistrent les inversions du champ magnétique et donnent la vitesse d’expansion océanique (moyennée sur des millions d’années).',
        '**Âge des fonds océaniques** : croît de part et d’autre de la dorsale (≈ 0 Ma à l’axe, ≤ 180–200 Ma au plus loin).',
      ],
    },
    { type: 'h3', text: 'Cycle de la lithosphère océanique' },
    {
      type: 'steps',
      items: [
        { title: 'Naissance (dorsale)', text: 'Remontée de péridotite, fusion partielle par décompression, magma basaltique qui forme la croûte (basalte, gabbro) ; le manteau lithosphérique se forme dessous.' },
        { title: 'Vieillissement', text: 'Refroidissement → épaississement (par le bas) → densité croissante → subsidence : profondeur ≈ 2 500 + 350√t (t en Ma, t < 70 Ma).' },
        { title: 'Disparition (subduction)', text: 'Devenue plus dense que l’asthénosphère, la lithosphère océanique plonge au niveau des fosses ; le plan de Wadati-Benioff matérialise la plaque plongeante.' },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Points chauds',
      content: [
        {
          type: 'p',
          text: 'Volcanisme intraplaque lié à une remontée de manteau chaud (panache) relativement fixe : la plaque se déplaçant au-dessus, on obtient une **chaîne de volcans d’âge croissant** dans le sens du mouvement (Hawaï). Elle permet de calculer la vitesse de la plaque.',
        },
      ],
    },
  ],
  cours: [
    { type: 'h2', text: '1. Histoire d’un modèle : de la dérive des continents à la tectonique des plaques' },
    {
      type: 'timeline',
      events: [
        { date: '1912–1915', title: 'Alfred Wegener : dérive des continents', text: 'Arguments : emboîtement des côtes (Amérique/Afrique), continuité de chaînes de montagnes et de formations géologiques, fossiles identiques sur des continents séparés (Glossopteris, Mesosaurus), traces de glaciations anciennes. Mais pas de mécanisme convaincant : l’hypothèse est rejetée.' },
        { date: '1950–1960', title: 'Exploration des fonds océaniques', text: 'Le sondage des océans révèle les dorsales (chaîne de 60 000 km), les fosses, un fond océanique jeune et très peu sédimenté. Les études de paléomagnétisme montrent que les continents ont changé de latitude.' },
        { date: '1960–1962', title: 'Harry Hess : expansion océanique', text: 'La croûte océanique se forme à la dorsale par remontée de matériaux du manteau et s’écarte de part et d’autre.' },
        { date: '1963', title: 'Vine, Matthews, Morley', text: 'Les bandes d’anomalies magnétiques symétriques sont expliquées par l’enregistrement des inversions du champ magnétique dans la croûte qui se forme.' },
        { date: '1965', title: 'Tuzo Wilson : failles transformantes', text: 'Les failles qui décalent les dorsales sont des limites coulissantes de plaques.' },
        { date: '1967–1968', title: 'Naissance de la tectonique des plaques', text: 'Morgan, McKenzie et Parker, Le Pichon : la surface du globe est découpée en plaques rigides qui se déplacent. Mesures GPS (années 1980–90) : confirmation directe.' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Un modèle scientifique évolue',
      content: [
        {
          type: 'p',
          text: 'Le modèle de Wegener était partiellement juste (les continents bougent) mais incomplet (mécanisme). La tectonique des plaques en est un prolongement rendu possible par de nouvelles techniques et données (bathymétrie, paléomagnétisme, séismologie, GPS) : un modèle est testé, complété ou remplacé.',
        },
      ],
    },

    { type: 'h2', text: '2. Les plaques lithosphériques' },
    {
      type: 'p',
      text: 'La carte des **séismes** et des **volcans** montre qu’ils se concentrent le long de bandes étroites, qui délimitent des domaines peu actifs : les **plaques lithosphériques**. Chaque plaque est rigide et se déplace d’un bloc sur l’asthénosphère. Une plaque peut porter à la fois du domaine océanique et du domaine continental (l’Afrique, par exemple).',
    },
    { type: 'svg', svg: svgLimites, caption: 'Les trois types de limites de plaques.', maxWidth: 640 },
    {
      type: 'table',
      headers: ['Plaque', 'Domaine', 'Vitesse approximative'],
      rows: [
        ['Pacifique', 'Océanique (surtout)', 'Jusqu’à ≈ 10 cm/an (par rapport aux points chauds)'],
        ['Indo-Australie', 'Océanique + continental', '≈ 6–7 cm/an vers le nord'],
        ['Afrique', 'Continental + océanique', '≈ 2–3 cm/an'],
        ['Eurasie', 'Continental surtout', '< 1 cm/an'],
        ['Amérique du Nord / du Sud', 'Continental + océanique', '≈ 1–2 cm/an'],
        ['Antarctique', 'Continental + océanique', '≈ 1 cm/an'],
      ],
      caption: 'Vitesses moyennes dans un référentiel mondial : ordres de grandeur.',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Plaque ≠ continent',
      content: [
        {
          type: 'p',
          text: 'Une plaque est un ensemble de **lithosphère** (croûte + manteau supérieur). Un continent n’est qu’une partie de plaque. La limite d’une plaque ne suit pas forcément le rivage : l’Atlantique ne marque pas une limite de plaque, la dorsale en est une.',
        },
      ],
    },

    { type: 'h2', text: '3. Mesurer les mouvements des plaques' },
    { type: 'h3', text: 'Le GPS et la géodésie spatiale' },
    {
      type: 'p',
      text: 'Des stations GPS fixées sur le sol enregistrent leur position en permanence grâce à des satellites. L’évolution de leur position au cours des années donne un **vecteur vitesse** (direction et valeur) avec une précision de l’ordre du **millimètre par an**. Ces mesures confirment que les plaques se déplacent comme des blocs rigides, avec des vitesses qui s’accordent avec les valeurs moyennes déduites des anomalies magnétiques sur plusieurs millions d’années.',
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Convertir une vitesse',
      content: [
        {
          type: 'p',
          text: '1 cm/an = 10 km/Ma. Ainsi 2 cm/an donnent 20 km d’écartement en 1 Ma et 2 000 km en 100 Ma.',
        },
        { type: 'math', tex: 'v=\\dfrac{d}{t}\\;\\Rightarrow\\; t=\\dfrac{d}{v}' },
      ],
    },
    { type: 'h3', text: 'Le paléomagnétisme' },
    {
      type: 'p',
      text: 'Les roches volcaniques riches en minéraux magnétiques (magnétite) acquièrent, en refroidissant sous la **température de Curie** (≈ 580 °C pour la magnétite), une **aimantation** parallèle au champ magnétique terrestre de l’époque. Elles fossilisent ainsi la direction (inclinaison, déclinaison) et le sens du champ. Deux applications :',
    },
    {
      type: 'list',
      items: [
        '**Paléolatitude** : le champ est dipolaire, et l’inclinaison I vérifie tan I = 2 tan λ (λ = latitude). Mesurer I d’une roche ancienne donne la latitude où elle s’est formée : les continents ont donc changé de latitude (par exemple l’Inde, partie de l’hémisphère sud et montée vers le nord).',
        '**Inversions du champ** : à l’échelle géologique le champ magnétique s’inverse (pôles Nord et Sud magnétiques échangés), en moyenne quelques fois par Ma, de façon irrégulière. La dernière inversion (Brunhes–Matuyama) date d’environ **0,78 Ma**.',
      ],
    },
    { type: 'svg', svg: svgAnomalies, caption: 'Bandes d’anomalies magnétiques de part et d’autre d’une dorsale (schéma).', maxWidth: 640 },
    {
      type: 'p',
      text: 'En survolant l’océan, un magnétomètre mesure le champ total : au-dessus d’une croûte d’aimantation normale, le champ mesuré est plus fort que le champ attendu (**anomalie positive**), au-dessus d’une croûte d’aimantation inverse il est plus faible (**anomalie négative**). L’alternance de bandes **symétriques** par rapport à l’axe prouve que la croûte se forme à l’axe et s’écarte de part et d’autre.',
    },
    {
      type: 'steps',
      items: [
        { title: 'Identifier l’inversion', text: 'Repérer sur un profil le même événement (par exemple la limite Brunhes/Matuyama) de chaque côté de l’axe.' },
        { title: 'Associer âge et distance', text: 'L’âge de l’inversion est connu (échelle des inversions) ; mesurer sa distance d à l’axe.' },
        { title: 'Calculer la vitesse', text: 'Vitesse d’expansion de chaque côté (demi-vitesse) : v = d/t. La vitesse d’écartement entre les plaques est le double (somme des deux côtés).' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        {
          type: 'p',
          text: 'Une inversion datée de 2,6 Ma est située à 26 km de l’axe : v = 26 km / 2,6 Ma = 10 km/Ma = 1 cm/an de chaque côté, soit **2 cm/an** d’écartement : c’est une dorsale **lente** (Atlantique).',
        },
      ],
    },
    { type: 'h3', text: 'L’âge des fonds océaniques' },
    {
      type: 'p',
      text: 'Les forages et les cartes d’âge montrent que la **croûte océanique est d’autant plus ancienne qu’on s’éloigne de la dorsale**, et que les sédiments sont de plus en plus épais. Les plus vieux fonds océaniques ont **≈ 180–200 Ma** (l’âge moyen de la croûte continentale est bien supérieur, jusqu’à ≈ 4 Ga) : la lithosphère océanique est constamment renouvelée.',
    },

    { type: 'h2', text: '4. Dorsales et divergence : naissance de la lithosphère océanique' },
    {
      type: 'p',
      text: 'Les **dorsales océaniques** forment un réseau de plus de 60 000 km de relief sous-marin, souvent à ≈ 2 500 m de profondeur, entaillé par un **rift axial** (dans les dorsales lentes). Elles sont le lieu d’une intense activité volcanique et d’une sismicité superficielle, et marquent des limites de plaques **divergentes**.',
    },
    { type: 'svg', svg: svgDorsale, caption: 'Coupe schématique d’une dorsale : remontée du manteau, fusion partielle, croûte et manteau lithosphérique.', maxWidth: 680 },
    { type: 'h3', text: 'Origine du magmatisme' },
    {
      type: 'p',
      text: 'La roche du manteau (péridotite) est **solide**, mais sous la dorsale elle **remonte** avec l’écartement des plaques. En remontant, **la pression diminue** alors que la température reste à peu près constante (ascension rapide) : la roche franchit son **solidus** (courbe de début de fusion) : c’est la **fusion partielle par décompression**. Seule une fraction (≈ 10 %) de la péridotite fond ; le liquide, moins dense, s’extrait et monte.',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Pas d’ajout de chaleur ni d’eau',
      content: [
        {
          type: 'p',
          text: 'À la dorsale, la fusion n’est pas due à un échauffement du manteau ni à un apport d’eau : c’est la **baisse de pression** qui permet la fusion. À ne pas confondre avec les zones de subduction (fusion hydratée).',
        },
      ],
    },
    { type: 'h3', text: 'Formation de la croûte océanique' },
    {
      type: 'p',
      text: 'Le magma basaltique s’accumule dans une **chambre magmatique** peu profonde sous l’axe. Il refroidit :',
    },
    {
      type: 'table',
      headers: ['Niveau (de haut en bas)', 'Roche', 'Texture', 'Interprétation'],
      rows: [
        ['Sédiments (quasi absents à l’axe)', 'Boues, argiles, carbonates', 'Détritique', 'S’accumulent avec le temps'],
        ['Laves en coussins (pillow-lavas)', 'Basalte', 'Microlitique ou vitreuse', 'Refroidissement rapide au contact de l’eau de mer'],
        ['Complexe filonien', 'Dolérite (basalte à grain fin à moyen)', 'Microgrenue', 'Magma refroidi dans des fractures (filons) alimentant les coulées'],
        ['Gabbros', 'Gabbro (même composition chimique que le basalte)', 'Grenue', 'Refroidissement lent en profondeur dans la chambre magmatique'],
        ['Manteau lithosphérique', 'Péridotite', 'Grenue', 'Résidu de fusion, refroidi'],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Même composition, textures différentes',
      content: [
        {
          type: 'p',
          text: 'Basalte et gabbro ont la **même composition chimique** et minéralogique (plagioclases, pyroxènes), mais le **basalte** a refroidi **vite** (cristaux petits, voire verre) et le **gabbro** **lentement** (gros cristaux, texture grenue).',
        },
      ],
    },
    {
      type: 'p',
      text: 'La **dorsale rapide** (> 8–9 cm/an d’écartement, Pacifique) a un profil en dôme, sans rift marqué, et alimente en continu une chambre magmatique. La **dorsale lente** (< 5 cm/an, Atlantique) a un rift profond (plusieurs km), une activité magmatique plus discontinue et des failles. L’eau de mer circule dans les fractures de la croûte jeune, se réchauffe (jusqu’à ≈ 350 °C) et ressort en **fumeurs noirs** (hydrothermalisme), transformant minéralogiquement les roches.',
    },
    {
      type: 'table',
      headers: ['', 'Dorsale lente', 'Dorsale rapide'],
      rows: [
        ['Vitesse d’écartement', '< 5 cm/an (Atlantique : ≈ 2–4)', '> 8 cm/an (Est-Pacifique : jusqu’à ≈ 15)'],
        ['Relief', 'Rift axial profond, relief accidenté', 'Dôme sans rift, relief doux'],
        ['Magmatisme', 'Discontinu, chambre magmatique petite ou intermittente', 'Continu, chambre magmatique permanente'],
      ],
    },

    { type: 'h2', text: '5. Les ophiolites : des morceaux de lithosphère océanique à terre' },
    {
      type: 'p',
      text: 'Des **ophiolites** sont des fragments de lithosphère océanique **charriés** sur un continent (obduction). Exemples : Chenaillet (Alpes occidentales, près de Briançon), Semail (Oman), Troodos (Chypre). Leur coupe reproduit la coupe de la lithosphère océanique actuelle : **péridotites** (manteau lithosphérique), **gabbros**, **complexe filonien de dolérites**, **basaltes en coussins**, parfois sédiments.',
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Argument',
      content: [
        {
          type: 'p',
          text: 'La **comparaison des roches** (nature, minéraux, textures, succession) et des vitesses sismiques d’une ophiolite avec la lithosphère océanique actuelle permet d’affirmer que les ophiolites sont d’anciens fonds océaniques formés à une dorsale. Ce sont aussi des échantillons **directs** de la structure de la lithosphère océanique.',
        },
      ],
    },

    { type: 'h2', text: '6. Vieillissement et épaississement de la lithosphère océanique' },
    {
      type: 'p',
      text: 'En s’éloignant de la dorsale, la lithosphère océanique **se refroidit** par conduction et par circulation hydrothermale. L’isotherme limite (≈ 1 300 °C) s’enfonce : une partie de l’asthénosphère **se refroidit et devient lithosphère** (accrétion par le bas). La croûte garde à peu près la même épaisseur (≈ 7 km), l’**épaisseur de lithosphère croît** avec l’âge (≈ 0 à l’axe, ≈ 100 km vers 70–100 Ma).',
    },
    {
      type: 'p',
      text: 'Le refroidissement augmente la **masse volumique** de la lithosphère (contraction thermique). La lithosphère s’enfonce donc dans l’asthénosphère par **subsidence** (isostasie) : la profondeur de l’océan augmente avec l’âge. Pour les âges inférieurs à ≈ 70 Ma environ :',
    },
    { type: 'math', tex: 'p(t)\\approx 2500+350\\sqrt{t}\\quad (p \\text{ en m},\\ t \\text{ en Ma})' },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Profondeur de l’océan en fonction de l’âge',
      props: { expressions: ['2500+350*sqrt(x)'], xMin: 0, xMax: 70, yMin: 2000, yMax: 6000, editable: true },
      caption: 'x = âge de la lithosphère (Ma), y = profondeur du plancher océanique (m).',
    },
    {
      type: 'list',
      items: [
        '**Flux thermique** : diminue avec l’âge (≈ proportionnel à 1/√t) car la lithosphère s’épaissit et isole.',
        '**Après ≈ 70–80 Ma** : la profondeur tend vers un palier (≈ 5 500–6 000 m), le refroidissement étant compensé par un apport de chaleur par la base.',
        '**Sédiments** : s’accumulent et épaississent la couche superficielle.',
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Lien avec la subduction',
      content: [
        {
          type: 'p',
          text: 'Au bout de quelques dizaines de Ma, la lithosphère océanique, refroidie, est en moyenne **plus dense que l’asthénosphère** sur laquelle elle repose : elle devient gravitairement instable et peut s’enfoncer dans le manteau, ce qui se produit au niveau des zones de subduction. Cela explique que le plancher océanique ne dépasse pas ≈ 180–200 Ma.',
        },
      ],
    },

    { type: 'h2', text: '7. Les zones de subduction : approche' },
    {
      type: 'p',
      text: 'Dans une **zone de subduction**, une plaque (le plus souvent océanique) plonge sous une autre dans l’asthénosphère. Elle est marquée en surface par une **fosse océanique** profonde (jusqu’à 11 km) et en profondeur par la plaque plongeante.',
    },
    { type: 'svg', svg: svgSubduction, caption: 'Coupe schématique d’une zone de subduction.', maxWidth: 680 },
    {
      type: 'list',
      items: [
        '**Séismes** : leurs foyers s’alignent selon un plan incliné (**plan de Wadati-Benioff**), profond de quelques km jusqu’à ≈ 700 km, qui matérialise la plaque plongeante rigide.',
        '**Tomographie sismique** : une anomalie de vitesse **positive** (matériau froid) suit la plaque plongeante dans le manteau.',
        '**Volcanisme** : un **arc volcanique** apparaît sur la plaque chevauchante, à une centaine de km au-dessus de la plaque plongeante, avec des magmas souvent explosifs (andésites).',
        '**Bilan de surface** : la Terre ne grossit pas. La lithosphère créée aux dorsales (≈ 3 km²/an) est détruite dans les zones de subduction.',
      ],
    },
    {
      type: 'p',
      text: 'La plaque plongeante, plus dense que le manteau environnant, **tire** le reste de la plaque (**traction par la plaque**, ou *slab pull*), un des moteurs principaux de la tectonique des plaques, avec la convection mantellique et la poussée aux dorsales (*ridge push*).',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'À retenir sur la limite du programme',
      content: [
        {
          type: 'p',
          text: 'Le métamorphisme de la plaque plongeante (déshydratation, formation des magmas) et la collision continentale sont traités ailleurs (domaine continental). Ici, on retient la **géométrie**, la **sismicité** et le **rôle de la densité**.',
        },
      ],
    },

    { type: 'h2', text: '8. Les points chauds' },
    {
      type: 'p',
      text: 'Les **points chauds** sont des zones de volcanisme intense situées **à l’intérieur de plaques** (Hawaï, La Réunion, Islande, Yellowstone) liées à des remontées de manteau chaud (**panaches**). Ils s’accompagnent de volcanisme basaltique, et laissent derrière eux **une chaîne de volcans** de plus en plus anciens.',
    },
    { type: 'svg', svg: svgHotspot, caption: 'Un point chaud fixe et une plaque en mouvement : naissance d’une chaîne volcanique.', maxWidth: 680 },
    {
      type: 'p',
      text: 'La chaîne **Hawaï-Empereur** (Pacifique) en est l’exemple classique : l’île d’Hawaï (volcans actifs : Kilauea, Mauna Loa) est la plus jeune ; vers le nord-ouest, Kauai a ≈ 5 Ma, Midway ≈ 28 Ma, puis la chaîne s’infléchit vers le nord (**coude** il y a ≈ 47–50 Ma) pour former la chaîne de l’Empereur, dont les plus vieux monts ont ≈ 80 Ma. Les édifices anciens, érodés et affaissés avec la lithosphère qui se refroidit, deviennent des **guyots**.',
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Calculer la vitesse de la plaque',
      content: [
        {
          type: 'p',
          text: 'Si le point chaud est fixe, la vitesse de la plaque est v = d/Δt, avec d la distance entre deux volcans et Δt la différence de leurs âges. Ex. : 520 km entre Hawaï et Kauai (≈ 5,1 Ma) donne ≈ 100 km/Ma, soit ≈ 10 cm/an. Les points chauds fournissent un référentiel fixe pour mesurer les mouvements « absolus ».',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Point chaud ou dorsale ?',
      content: [
        {
          type: 'p',
          text: 'Dorsale : volcanisme à une **limite** de plaque, linéaire, en accrétion. Point chaud : volcanisme **intraplaque**, ponctuel, laissant une chaîne d’âges croissants. L’Islande cumule les deux : un point chaud sur la dorsale médio-atlantique.',
        },
      ],
    },
  ],
  exercices: [
    {
      id: 'ex1-gps',
      title: 'Écartement de l’Atlantique',
      difficulty: 1,
      duration: 10,
      tags: ['GPS', 'calcul'],
      statement: [
        {
          type: 'p',
          text: 'Deux stations GPS situées de part et d’autre de la dorsale médio-atlantique (Amérique du Nord et Eurasie) voient leur distance augmenter de 1,7 cm chaque année.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Convertir cette vitesse en km/Ma.',
            'De quelle distance l’Atlantique s’élargit-il en 10 Ma ?',
            'En supposant cette vitesse constante, en combien de temps une distance de 3 400 km a-t-elle pu s’ouvrir ?',
          ],
        },
      ],
      hints: ['1 cm/an = 10 km/Ma.'],
      solution: [
        { type: 'p', text: '**1.** 1,7 cm/an = 17 km/Ma.' },
        { type: 'p', text: '**2.** d = 17 × 10 = **170 km**.' },
        { type: 'p', text: '**3.** t = d/v = 3 400/17 = **200 Ma**. En réalité l’ouverture a débuté il y a ≈ 180 Ma pour l’Atlantique central, et la vitesse n’a pas toujours été constante : on obtient bien un ordre de grandeur cohérent avec l’âge des plus vieux fonds.' },
      ],
    },
    {
      id: 'ex2-anomalies',
      title: 'Vitesse d’expansion et anomalies magnétiques',
      difficulty: 2,
      duration: 20,
      tags: ['paléomagnétisme', 'dorsale'],
      statement: [
        {
          type: 'p',
          text: 'Le long d’un profil perpendiculaire à une dorsale, on repère les limites de bandes d’anomalies correspondant à des inversions datées :',
        },
        {
          type: 'table',
          headers: ['Limite', 'Âge (Ma)', 'Distance à l’axe (km)'],
          rows: [
            ['Brunhes / Matuyama', '0,78', '8'],
            ['Matuyama / Gauss', '2,58', '25'],
            ['Gauss / Gilbert', '3,6', '36'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer pour chaque limite la vitesse d’expansion d’un côté (km/Ma).',
            'En déduire la vitesse moyenne d’écartement des deux plaques (en cm/an).',
            'S’agit-il d’une dorsale lente ou rapide ?',
            'Quelle observation sur la disposition des bandes permet de dire que la croûte se forme à l’axe ?',
          ],
        },
      ],
      hints: ['v = d / t pour chaque limite.', 'Écartement = 2 × demi-vitesse.'],
      solution: [
        { type: 'p', text: '**1.** 8 / 0,78 ≈ 10,3 km/Ma ; 25 / 2,58 ≈ 9,7 km/Ma ; 36 / 3,6 = 10 km/Ma. La vitesse est quasiment constante, ≈ **10 km/Ma** soit 1 cm/an de chaque côté.' },
        { type: 'p', text: '**2.** Écartement = 2 × 1 cm/an = **2 cm/an**.' },
        { type: 'p', text: '**3.** 2 cm/an est une vitesse faible (< 5 cm/an) : dorsale **lente** (de type Atlantique).' },
        { type: 'p', text: '**4.** Les bandes sont **symétriques** de part et d’autre de l’axe, et les âges augmentent avec la distance : la croûte se forme à l’axe, s’écarte symétriquement et enregistre les inversions du champ magnétique à mesure qu’elle refroidit.' },
      ],
    },
    {
      id: 'ex3-hawai',
      title: 'Hawaï : vitesse d’une plaque',
      difficulty: 2,
      duration: 20,
      tags: ['point chaud', 'calcul'],
      statement: [
        {
          type: 'p',
          text: 'Données simplifiées sur la chaîne Hawaï-Empereur (distances mesurées depuis le Kilauea, volcan actif au-dessus du point chaud).',
        },
        {
          type: 'table',
          headers: ['Édifice', 'Âge (Ma)', 'Distance au Kilauea (km)'],
          rows: [
            ['Hawaï (Kilauea)', '0', '0'],
            ['Kauai', '5,1', '520'],
            ['Midway', '27,7', '2 400'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quelle hypothèse sur le point chaud permet d’interpréter ces données ?',
            'Calculer la vitesse de la plaque Pacifique entre Kilauea et Kauai, puis entre Kauai et Midway (en cm/an).',
            'Dans quelle direction la plaque se déplace-t-elle ? Justifier.',
            'La chaîne présente un coude vers ≈ 47 Ma. Qu’en déduit-on ?',
          ],
        },
      ],
      hints: ['Entre Kauai et Midway : distance = 2 400 − 520, durée = 27,7 − 5,1.', '1 km/Ma = 0,1 cm/an.'],
      solution: [
        { type: 'p', text: '**1.** Le point chaud (panache de manteau) est supposé **fixe** par rapport à la plaque Pacifique qui défile au-dessus : chaque volcan s’éteint lorsqu’il s’éloigne du panache et un nouveau naît.' },
        { type: 'p', text: '**2.** Kilauea → Kauai : 520 km en 5,1 Ma ≈ 102 km/Ma ≈ **10 cm/an**. Kauai → Midway : (2 400 − 520) / (27,7 − 5,1) = 1 880 / 22,6 ≈ 83 km/Ma ≈ **8 cm/an**. La vitesse est de l’ordre de 8 à 10 cm/an.' },
        { type: 'p', text: '**3.** Les volcans sont de plus en plus vieux vers le **nord-ouest** : la plaque Pacifique se déplace vers le nord-ouest par rapport au point chaud.' },
        { type: 'p', text: '**4.** Le **changement de direction** de la chaîne traduit un changement de direction du mouvement de la plaque Pacifique il y a ≈ 47 Ma (il était alors dirigé plutôt vers le nord, puis vers le nord-ouest).' },
      ],
    },
    {
      id: 'ex4-ophiolite',
      title: 'Une ophiolite comme lithosphère océanique',
      difficulty: 2,
      duration: 25,
      tags: ['ophiolite', 'roches'],
      statement: [
        {
          type: 'p',
          text: 'On étudie une coupe dans l’ophiolite de Chypre (Troodos). De haut en bas : (A) laves en forme de coussins, roche à petits cristaux et verre ; (B) nombreux filons verticaux de dolérite ; (C) roche grenue à grands cristaux de plagioclase et pyroxène ; (D) roche verte riche en olivine. La composition chimique de (A) et (C) est quasi identique.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Nommer les roches A, B, C, D.',
            'Expliquer pourquoi A et C ont la même composition chimique mais des textures différentes.',
            'Comparer cette coupe à celle d’une lithosphère océanique actuelle et conclure sur l’origine de l’ophiolite.',
            'Expliquer pourquoi une telle roche se retrouve sur un continent.',
          ],
        },
      ],
      hints: ['Associer texture et vitesse de refroidissement.', 'Pensez au charriage (obduction).'],
      solution: [
        { type: 'p', text: '**1.** A : basalte en coussins (pillow-lavas) ; B : complexe filonien de dolérite ; C : gabbro ; D : péridotite (manteau lithosphérique).' },
        { type: 'p', text: '**2.** Même magma basaltique : en surface, au contact de l’eau, il refroidit **rapidement** (petits cristaux, verre) : basalte. En profondeur, dans la chambre magmatique, il refroidit **lentement**, ce qui permet de gros cristaux : gabbro.' },
        { type: 'p', text: '**3.** La succession basalte, dolérite, gabbro, péridotite est exactement celle de la lithosphère océanique (croûte ≈ 7 km sur manteau lithosphérique). L’ophiolite est donc un fragment d’ancienne lithosphère océanique formée à une dorsale.' },
        { type: 'p', text: '**4.** Lors de la fermeture d’un océan, un morceau de lithosphère océanique a été **charrié** sur le continent (obduction) au lieu de plonger en subduction.' },
      ],
    },
    {
      id: 'ex5-profondeur',
      title: 'Subsidence thermique de la lithosphère océanique',
      difficulty: 2,
      duration: 20,
      tags: ['vieillissement', 'modèle'],
      statement: [
        {
          type: 'p',
          text: 'Pour une lithosphère océanique de moins de 70 Ma, la profondeur du plancher océanique suit le modèle p = 2 500 + 350 √t (p en m, t en Ma). On mesure par ailleurs, pour un âge de 100 Ma, une profondeur de 5 400 m.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la profondeur pour t = 4 Ma, 25 Ma et 49 Ma.',
            'Quelle valeur le modèle prévoit-il à 100 Ma ? Comparer à la mesure.',
            'Interpréter la subsidence de la lithosphère. Pourquoi le modèle devient-il inexact ?',
          ],
        },
      ],
      hints: ['√4 = 2 ; √25 = 5 ; √49 = 7.'],
      solution: [
        { type: 'p', text: '**1.** t = 4 Ma : 2 500 + 350 × 2 = **3 200 m** ; t = 25 Ma : 2 500 + 350 × 5 = **4 250 m** ; t = 49 Ma : 2 500 + 350 × 7 = **4 950 m**.' },
        { type: 'p', text: '**2.** À 100 Ma, le modèle donne 2 500 + 350 × 10 = 6 000 m, alors que la mesure est de 5 400 m : le modèle surestime la profondeur.' },
        { type: 'p', text: '**3.** En vieillissant, la lithosphère se refroidit et se contracte : sa masse volumique augmente et, par isostasie, elle s’enfonce (subsidence). Au-delà de ≈ 70 Ma, la profondeur tend vers un palier : un apport de chaleur par la base compense le refroidissement et l’épaississement ralentit ; la loi en √t n’est donc plus valable.' },
      ],
    },
    {
      id: 'ex6-densite',
      title: 'Quand la lithosphère océanique devient-elle plus dense que l’asthénosphère ?',
      difficulty: 3,
      duration: 30,
      tags: ['densité', 'subduction', 'modèle'],
      statement: [
        {
          type: 'p',
          text: 'Modèle simplifié. L’épaisseur de la lithosphère océanique de t millions d’années est e = 13 √t (e en km). La croûte a 7 km d’épaisseur et une masse volumique de 2,90 g/cm³ ; le manteau lithosphérique froid a 3,30 g/cm³. L’asthénosphère, plus chaude, a une masse volumique de 3,25 g/cm³.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Exprimer la masse volumique moyenne ρ de la lithosphère en fonction de e.',
            'Calculer ρ pour t = 4 Ma, 25 Ma et 64 Ma.',
            'À partir de quel âge environ la lithosphère devient-elle plus dense que l’asthénosphère ?',
            'Quelle conséquence en tirer pour le devenir du plancher océanique ? Quelles limites a ce modèle ?',
          ],
        },
      ],
      hints: ['ρ = (7 × 2,90 + (e − 7) × 3,30)/e.', 'Résoudre ρ = 3,25 pour trouver e, puis t = (e/13)².'],
      solution: [
        { type: 'p', text: '**1.** ρ = [7 × 2,90 + (e − 7) × 3,30] / e = (20,3 + 3,30 (e − 7))/e.' },
        { type: 'p', text: '**2.** t = 4 Ma : e = 26 km, ρ = (20,3 + 62,7)/26 = **3,19 g/cm³**. t = 25 Ma : e = 65 km, ρ = (20,3 + 191,4)/65 = **3,26 g/cm³**. t = 64 Ma : e = 104 km, ρ = (20,3 + 320,1)/104 = **3,27 g/cm³**.' },
        { type: 'p', text: '**3.** ρ = 3,25 donne 20,3 + 3,30 e − 23,1 = 3,25 e, soit 0,05 e = 2,8 et e = 56 km, donc t = (56/13)² ≈ **19 Ma**. À partir d’environ 20 Ma, la lithosphère est plus dense que l’asthénosphère.' },
        { type: 'p', text: '**4.** Une lithosphère âgée est gravitairement instable : elle peut s’enfoncer dans le manteau (subduction) ; c’est pourquoi les fonds océaniques dépassent rarement 180–200 Ma. Limites : le modèle suppose des densités constantes (en réalité dépendantes de T et de P), néglige les sédiments, l’hydratation, et le fait que la subduction nécessite aussi un déclencheur mécanique.' },
      ],
    },
    {
      id: 'ex7-subduction',
      title: 'Plan de Wadati-Benioff',
      difficulty: 2,
      duration: 20,
      tags: ['subduction', 'séismes'],
      statement: [
        {
          type: 'p',
          text: 'Pour une zone de subduction, on relève la profondeur des foyers sismiques en fonction de la distance à la fosse (mesurée perpendiculairement) :',
        },
        {
          type: 'table',
          headers: ['Distance à la fosse (km)', '0', '100', '200', '300', '400'],
          rows: [['Profondeur du foyer (km)', '10', '75', '140', '210', '280']],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Représenter les points et décrire la disposition des foyers.',
            'Calculer le pendage moyen de la plaque plongeante (angle avec l’horizontale).',
            'À quoi correspond cet alignement de séismes ? Pourquoi n’y a-t-il pas de séismes plus profonds que ≈ 700 km ?',
            'Les volcans de l’arc sont situés à environ 110 km de profondeur au-dessus du plan. Estimer leur distance à la fosse.',
          ],
        },
      ],
      hints: ['Pente = Δprofondeur/Δdistance ; tan α = pente.', 'Interpolation linéaire entre les points.'],
      solution: [
        { type: 'p', text: '**1.** Les foyers sont alignés selon une droite inclinée : plus on s’éloigne de la fosse, plus ils sont profonds.' },
        { type: 'p', text: '**2.** Pente = (280 − 10)/(400 − 0) ≈ 0,675 donc α = arctan 0,675 ≈ **34°**.' },
        { type: 'p', text: '**3.** Les séismes se produisent dans la **plaque plongeante**, cassante et froide : cet alignement matérialise la plaque dans l’asthénosphère (plan de Wadati-Benioff). Plus profond, la plaque est réchauffée et devient plus ductile et se déforme sans rupture : plus de séismes.' },
        { type: 'p', text: '**4.** La profondeur de 110 km est atteinte entre les points (100 km ; 75 km) et (200 km ; 140 km) : 110 = 75 + 0,65 (d − 100) soit d ≈ 154 km. L’arc volcanique est donc à environ **150 km** de la fosse.' },
      ],
    },
    {
      id: 'ex8-bac-modele',
      title: 'Type bac : un modèle qui s’impose',
      difficulty: 3,
      duration: 40,
      tags: ['bac', 'histoire des sciences'],
      statement: [
        {
          type: 'p',
          text: 'Wegener propose en 1912 que les continents se déplacent. En 1960, l’hypothèse de l’expansion océanique est avancée. Dans les années 1960, la tectonique des plaques s’impose.',
        },
        {
          type: 'p',
          text: '**Document 1.** L’âge des sédiments les plus anciens forés dans l’Atlantique Nord augmente de façon régulière quand on s’éloigne de la dorsale : 250 km : 25 Ma ; 500 km : 50 Ma ; 1 000 km : 100 Ma. **Document 2.** Les anomalies magnétiques forment des bandes parallèles symétriques à l’axe de la dorsale. **Document 3.** Les mesures GPS actuelles donnent un écartement de ≈ 2 cm/an entre l’Amérique du Nord et l’Eurasie. **Document 4.** Dans l’Atlantique, le contour des côtes des Amériques s’emboîte avec celui de l’Europe et de l’Afrique (à la profondeur de 2 000 m).',
        },
        {
          type: 'p',
          text: 'Question : montrer, à l’aide des documents et de vos connaissances, comment les données ont permis de passer de l’hypothèse de Wegener au modèle de la tectonique des plaques.',
        },
      ],
      hints: ['Calculez la vitesse à partir du document 1.', 'Comparez les vitesses obtenues par des méthodes indépendantes.'],
      solution: [
        { type: 'p', text: '**Introduction.** Wegener s’appuyait sur des arguments de forme et de continuité géologique (doc. 4), mais sans mécanisme, d’où le rejet de son hypothèse.' },
        { type: 'p', text: '**Doc. 1.** L’âge des sédiments basaux croît avec la distance à la dorsale : v = 250 km/25 Ma = 10 km/Ma = 1 cm/an de chaque côté, soit 2 cm/an d’écartement. Le fond océanique se forme à l’axe et s’en éloigne (expansion).' },
        { type: 'p', text: '**Doc. 2.** Les anomalies magnétiques symétriques enregistrent les inversions du champ dans la croûte formée à l’axe ; elles fournissent une vitesse d’expansion identique (≈ 1 cm/an de chaque côté) et donnent un mécanisme pour le mouvement.' },
        { type: 'p', text: '**Doc. 3.** Le GPS donne une mesure **directe et actuelle** de ≈ 2 cm/an : concordante avec la vitesse moyenne sur 100 Ma, ce qui indique un mouvement stable.' },
        { type: 'p', text: '**Doc. 4.** L’emboîtement des côtes soutient l’idée que les continents Amérique/Europe-Afrique étaient joints puis se sont séparés ; avec 2 cm/an pendant ≈ 180–200 Ma, l’ouverture atteint quelques milliers de km, ce qui correspond à la largeur de l’Atlantique.' },
        { type: 'p', text: '**Conclusion.** Plusieurs méthodes indépendantes (âges, paléomagnétisme, GPS) concordent : les continents appartiennent à des plaques lithosphériques mobiles dont les limites sont les dorsales, les zones de subduction et les failles transformantes. Le modèle de Wegener est ainsi complété par un mécanisme (expansion océanique, convection) et validé.' },
      ],
    },
  ],
  representations: [
    { type: 'svg', svg: svgLimites, caption: 'Types de limites de plaques.', maxWidth: 640 },
    { type: 'svg', svg: svgDorsale, caption: 'Dorsale : fusion partielle par décompression et formation de la lithosphère océanique.', maxWidth: 680 },
    { type: 'svg', svg: svgAnomalies, caption: 'Anomalies magnétiques symétriques de part et d’autre d’une dorsale.', maxWidth: 640 },
    { type: 'svg', svg: svgSubduction, caption: 'Zone de subduction.', maxWidth: 680 },
    { type: 'svg', svg: svgHotspot, caption: 'Chaîne volcanique de point chaud.', maxWidth: 680 },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Subsidence thermique : testez le modèle',
      props: { expressions: ['2500+350*sqrt(x)', '2500+a*sqrt(x)'], params: [{ name: 'a', min: 200, max: 500, step: 10, value: 350 }], xMin: 0, xMax: 70, yMin: 2000, yMax: 6000 },
      caption: 'Modifiez le coefficient pour voir comment la profondeur change avec l’âge.',
    },
    { type: 'widget', id: 'earth-layers', title: 'Lithosphère et asthénosphère', caption: 'Rappel de la structure du globe.' },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Le magmatisme des dorsales est dû à…',
          choices: [
            'Un apport d’eau dans le manteau',
            'Une fusion partielle de la péridotite par décompression',
            'Un échauffement par friction',
            'La fusion du noyau',
          ],
          answer: 1,
          explanation: 'La péridotite remonte, la pression diminue, elle franchit son solidus.',
        },
        {
          question: 'Le basalte et le gabbro…',
          choices: [
            'Ont des compositions chimiques très différentes',
            'Ont la même composition mais des textures différentes',
            'Sont tous les deux des roches sédimentaires',
            'Sont des roches du manteau',
          ],
          answer: 1,
          explanation: 'Refroidissement rapide (basalte) ou lent (gabbro).',
        },
        {
          question: 'Les anomalies magnétiques de part et d’autre d’une dorsale sont…',
          choices: ['Aléatoires', 'Symétriques', 'Identiques sur toute la Terre', 'Absentes'],
          answer: 1,
          explanation: 'Leur symétrie prouve l’accrétion à l’axe.',
        },
        {
          question: 'Une inversion datée de 5 Ma est à 50 km de l’axe. La demi-vitesse d’expansion est…',
          choices: ['0,1 cm/an', '1 cm/an', '10 cm/an', '2 cm/an'],
          answer: 1,
          explanation: '50 km / 5 Ma = 10 km/Ma = 1 cm/an.',
        },
        {
          question: 'Avec l’âge, la lithosphère océanique…',
          choices: [
            'S’amincit et devient moins dense',
            'S’épaissit et devient plus dense',
            'Garde la même densité',
            'Devient de la croûte continentale',
          ],
          answer: 1,
          explanation: 'Refroidissement : épaississement par le bas, augmentation de masse volumique.',
        },
        {
          question: 'Une chaîne de volcans d’âges croissants à l’intérieur d’une plaque est typique…',
          choices: ['D’une dorsale', 'D’une subduction', 'D’un point chaud', 'D’une faille transformante'],
          answer: 2,
          explanation: 'La plaque défile au-dessus d’un panache relativement fixe.',
        },
        {
          question: 'Les foyers des séismes alignés selon un plan incliné jusqu’à ≈ 700 km caractérisent…',
          choices: ['Une dorsale', 'Une zone de subduction', 'Un point chaud', 'Un rift continental'],
          answer: 1,
          explanation: 'Plan de Wadati-Benioff.',
        },
        {
          question: 'Les ophiolites sont…',
          choices: [
            'Des fragments de croûte continentale',
            'Des fragments de lithosphère océanique charriés sur un continent',
            'Des volcans de point chaud',
            'Des sédiments marins',
          ],
          answer: 1,
          explanation: 'Elles reproduisent la coupe de la lithosphère océanique.',
        },
        {
          question: 'Le GPS permet de mesurer…',
          choices: [
            'Les mouvements actuels des plaques (mm à cm/an)',
            'L’âge des roches',
            'La température du manteau',
            'La composition du noyau',
          ],
          answer: 0,
          explanation: 'Mesure directe du déplacement de stations.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Plaque lithosphérique', back: 'Portion rigide de lithosphère limitée par des zones actives (séismes, volcans). 7 grandes plaques.' },
        { front: 'Les 3 types de limites', back: 'Divergente (dorsale), convergente (subduction/collision), transformante (coulissage).' },
        { front: 'Dérive des continents (Wegener)', back: '1912 : les continents se déplacent. Arguments de forme, fossiles, géologie, climats anciens. Manque un mécanisme.' },
        { front: 'Expansion océanique', back: 'Hess (1960) : la croûte océanique se forme à la dorsale et s’écarte symétriquement.' },
        { front: 'Anomalies magnétiques', back: 'Bandes symétriques positives et négatives : enregistrent les inversions du champ dans la croûte formée à l’axe.' },
        { front: '1 cm/an en km/Ma', back: '10 km/Ma.' },
        { front: 'Fusion partielle par décompression', back: 'Remontée de la péridotite : la pression chute, le solidus est franchi, ≈ 10 % de fusion, magma basaltique.' },
        { front: 'Croûte océanique : coupe', back: 'Sédiments, basaltes en coussins, complexe filonien (dolérites), gabbros ; en dessous manteau lithosphérique (péridotite).' },
        { front: 'Ophiolite', back: 'Fragment de lithosphère océanique obducté sur un continent (Chenaillet, Oman, Chypre).' },
        { front: 'Vieillissement lithosphère océanique', back: 'Refroidissement, épaississement par le bas, augmentation de masse volumique, subsidence : p ≈ 2 500 + 350√t.' },
        { front: 'Subduction', back: 'Plongement d’une lithosphère océanique dense sous une autre plaque ; fosse, séismes (Wadati-Benioff), arc volcanique.' },
        { front: 'Point chaud', back: 'Volcanisme intraplaque lié à un panache de manteau chaud ; chaîne de volcans d’âges croissants (Hawaï).' },
        { front: 'Âge maximal des fonds océaniques', back: '≈ 180–200 Ma, car la lithosphère est détruite dans les subductions.' },
        { front: 'Dorsale lente vs rapide', back: 'Lente (< 5 cm/an) : rift axial profond ; rapide (> 8 cm/an) : dôme sans rift.' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer phénomène et lieu',
      pairs: [
        { left: 'Accrétion de lithosphère océanique', right: 'Dorsale' },
        { left: 'Destruction de lithosphère océanique', right: 'Zone de subduction' },
        { left: 'Chaîne volcanique d’âges croissants', right: 'Point chaud' },
        { left: 'Plan de Wadati-Benioff', right: 'Plaque plongeante' },
        { left: 'Fragment de lithosphère océanique à terre', right: 'Ophiolite' },
      ],
    },
    {
      type: 'ordering',
      title: 'Coupe de la lithosphère océanique, de haut en bas',
      items: ['Sédiments', 'Basaltes en coussins', 'Complexe filonien (dolérites)', 'Gabbros', 'Péridotites'],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'Aux dorsales, la {{péridotite}} subit une fusion partielle par {{décompression}}. Le magma basaltique forme la croûte océanique. En vieillissant, la lithosphère se {{refroidit}}, s’{{épaissit}} et sa masse volumique {{augmente}}. Elle est détruite dans les zones de {{subduction}}.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Les plaques se déplacent sur l’asthénosphère à des vitesses de 1 à 15 cm/an.', answer: true },
        { text: 'À une dorsale, la fusion est due à un apport d’eau.', answer: false, explanation: 'Elle est due à la décompression.' },
        { text: 'Les fonds océaniques sont plus vieux que les continents.', answer: false, explanation: 'Ils ont au plus ≈ 200 Ma ; les continents jusqu’à ≈ 4 Ga.' },
        { text: 'Un point chaud est situé à la limite de deux plaques.', answer: false, explanation: 'Il est généralement intraplaque.' },
        { text: 'L’épaisseur de la croûte océanique augmente avec l’âge, comme celle de la lithosphère.', answer: false, explanation: 'La croûte garde ≈ 7 km ; c’est le manteau lithosphérique qui s’épaissit.' },
      ],
    },
    {
      type: 'reveal',
      title: 'Pourquoi la Terre ne grossit-elle pas ?',
      content: [
        {
          type: 'p',
          text: 'Parce que la production de lithosphère océanique aux dorsales (≈ 3 km² par an) est compensée par sa destruction dans les zones de subduction. La surface du globe reste constante.',
        },
      ],
    },
  ],
}

export default chapter
