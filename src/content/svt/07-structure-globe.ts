import type { Chapter } from '../types'

const svgGlobe = `<svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <circle cx="160" cy="160" r="140" fill="hsl(25 95% 53% / 0.18)" class="svg-stroke" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="160" cy="160" r="137" fill="hsl(25 95% 53% / 0.28)" stroke="currentColor" stroke-width="0.8"/>
  <circle cx="160" cy="160" r="77" fill="hsl(0 84% 60% / 0.28)" stroke="currentColor" stroke-width="1.2"/>
  <circle cx="160" cy="160" r="27" fill="hsl(0 84% 60% / 0.55)" stroke="currentColor" stroke-width="1.2"/>
  <circle cx="160" cy="160" r="2" fill="currentColor"/>
  <line x1="160" y1="160" x2="160" y2="20" stroke="currentColor" stroke-width="0.6" stroke-dasharray="3 3"/>
  <text x="160" y="105" text-anchor="middle" fill="currentColor">Manteau</text>
  <text x="160" y="135" text-anchor="middle" fill="currentColor" font-size="11">solide (péridotite)</text>
  <text x="160" y="183" text-anchor="middle" fill="currentColor" font-size="11">Noyau externe</text>
  <text x="160" y="196" text-anchor="middle" fill="currentColor" font-size="11">liquide (Fe, Ni)</text>
  <text x="160" y="163" text-anchor="middle" fill="currentColor" font-size="9">graine</text>
  <text x="360" y="40" fill="currentColor" font-weight="600">Croûte</text>
  <text x="360" y="54" fill="currentColor" font-size="11">5–10 km (océanique)</text>
  <text x="360" y="67" fill="currentColor" font-size="11">30–70 km (continentale)</text>
  <text x="360" y="100" fill="currentColor" font-weight="600">Manteau</text>
  <text x="360" y="114" fill="currentColor" font-size="11">jusqu’à 2 900 km</text>
  <text x="360" y="127" fill="currentColor" font-size="11">Moho en haut</text>
  <text x="360" y="164" fill="currentColor" font-weight="600">Noyau externe</text>
  <text x="360" y="178" fill="currentColor" font-size="11">2 900 → 5 150 km</text>
  <text x="360" y="191" fill="currentColor" font-size="11">Gutenberg (2 900 km)</text>
  <text x="360" y="228" fill="currentColor" font-weight="600">Noyau interne (graine)</text>
  <text x="360" y="242" fill="currentColor" font-size="11">5 150 → 6 371 km (centre)</text>
  <text x="360" y="255" fill="currentColor" font-size="11">solide — Lehmann (5 150 km)</text>
  <line x1="297" y1="22" x2="356" y2="38" stroke="currentColor" stroke-width="0.6"/>
  <line x1="240" y1="110" x2="356" y2="98" stroke="currentColor" stroke-width="0.6"/>
  <line x1="200" y1="168" x2="356" y2="162" stroke="currentColor" stroke-width="0.6"/>
  <line x1="170" y1="172" x2="356" y2="226" stroke="currentColor" stroke-width="0.6"/>
  <text x="160" y="312" text-anchor="middle" fill="currentColor" font-size="11">Rayon terrestre moyen : 6 371 km (épaisseur de la croûte non à l’échelle)</text>
</svg>`

const svgOmbre = `<svg viewBox="0 0 400 330" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <circle cx="200" cy="165" r="120" fill="hsl(25 95% 53% / 0.12)" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="200" cy="165" r="66" fill="hsl(0 84% 60% / 0.25)" stroke="currentColor" stroke-width="1.2"/>
  <path d="M 316.9 192 A 120 120 0 0 1 273.9 259.6" fill="none" stroke="hsl(0 84% 60%)" stroke-width="6"/>
  <path d="M 126.1 259.6 A 120 120 0 0 1 83.1 192" fill="none" stroke="hsl(0 84% 60%)" stroke-width="6"/>
  <circle cx="200" cy="45" r="4" fill="hsl(263 70% 60%)"/>
  <text x="212" y="38" fill="currentColor">Foyer (séisme)</text>
  <line x1="200" y1="45" x2="316.9" y2="192" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>
  <line x1="200" y1="45" x2="83.1" y2="192" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>
  <polyline points="200,45 243,107 243,223 200,285" fill="none" stroke="hsl(142 71% 45%)" stroke-width="1.5"/>
  <polyline points="200,45 157,107 157,223 200,285" fill="none" stroke="hsl(142 71% 45%)" stroke-width="1.5"/>
  <text x="336" y="190" fill="currentColor" font-size="11">103°</text>
  <text x="296" y="275" fill="currentColor" font-size="11">142°</text>
  <text x="46" y="190" fill="currentColor" font-size="11">103°</text>
  <text x="86" y="275" fill="currentColor" font-size="11">142°</text>
  <text x="200" y="168" text-anchor="middle" fill="currentColor" font-size="11">Noyau</text>
  <text x="200" y="182" text-anchor="middle" fill="currentColor" font-size="11">liquide</text>
  <text x="200" y="318" text-anchor="middle" fill="currentColor" font-size="11">Rouge : zone d’ombre des ondes P (103° à 142°) ; au-delà de 103°, plus d’onde S</text>
  <text x="200" y="14" text-anchor="middle" fill="currentColor" font-size="11">Schéma de principe (rayons simplifiés)</text>
</svg>`

const svgGeotherme = `<svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <line x1="60" y1="20" x2="60" y2="280" stroke="currentColor" stroke-width="1.2"/>
  <line x1="60" y1="20" x2="500" y2="20" stroke="currentColor" stroke-width="1.2"/>
  <text x="280" y="14" text-anchor="middle" fill="currentColor">Température (°C)</text>
  <text x="14" y="150" fill="currentColor" transform="rotate(-90 14 150)" text-anchor="middle">Profondeur</text>
  <text x="60" y="296" fill="currentColor" font-size="11" text-anchor="middle">0</text>
  <g stroke="currentColor" stroke-width="0.4" stroke-dasharray="2 3" opacity="0.5">
    <line x1="170" y1="20" x2="170" y2="280"/><line x1="280" y1="20" x2="280" y2="280"/><line x1="390" y1="20" x2="390" y2="280"/><line x1="500" y1="20" x2="500" y2="280"/>
  </g>
  <text x="170" y="12" fill="currentColor" font-size="10" text-anchor="middle">1 000</text>
  <text x="390" y="12" fill="currentColor" font-size="10" text-anchor="middle">3 000</text>
  <text x="500" y="12" fill="currentColor" font-size="10" text-anchor="end">4 000</text>
  <rect x="62" y="22" width="436" height="26" fill="hsl(217 91% 60% / 0.15)"/>
  <rect x="62" y="48" width="436" height="48" fill="hsl(25 95% 53% / 0.12)"/>
  <text x="496" y="38" fill="currentColor" font-size="11" text-anchor="end">Lithosphère (rigide, conduction)</text>
  <text x="496" y="76" fill="currentColor" font-size="11" text-anchor="end">Asthénosphère (ductile, convection)</text>
  <polyline points="60,20 80,40 100,56 122,80 170,100 230,150 300,200 360,240 420,262 470,274" fill="none" stroke="hsl(0 84% 60%)" stroke-width="2.5"/>
  <line x1="130" y1="20" x2="130" y2="280" stroke="hsl(263 70% 60%)" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="134" y="270" fill="hsl(263 70% 60%)" font-size="11">isotherme ≈ 1 300 °C</text>
  <text x="240" y="130" fill="hsl(0 84% 60%)" font-size="12">géotherme</text>
  <text x="240" y="144" fill="currentColor" font-size="10">gradient fort (≈ 10–30 °C/km) puis faible</text>
  <text x="66" y="312" fill="currentColor" font-size="10">Schéma qualitatif : gradient élevé dans la lithosphère (conduction), très faible dans le manteau convectif.</text>
</svg>`

const chapter: Chapter = {
  id: 'structure-globe',
  subject: 'svt',
  order: 7,
  title: 'La structure du globe terrestre',
  theme: 'La dynamique interne de la Terre',
  summary:
    'Comment la sismologie révèle les enveloppes de la Terre (croûte, manteau, noyau), leurs discontinuités, leur composition, et pourquoi la chaleur interne est évacuée par conduction et convection.',
  duration: '3 semaines',
  objectives: [
    'Exploiter des données sismiques (ondes P et S, hodochrones, zones d’ombre) pour caractériser la structure interne du globe.',
    'Situer les discontinuités de Mohorovičić, de Gutenberg et de Lehmann et en déduire l’état physique des enveloppes.',
    'Utiliser le modèle PREM (vitesses, masse volumique) et comparer à des matériaux connus (péridotite, basalte, granite, fer).',
    'Distinguer croûte continentale et croûte océanique, lithosphère et asthénosphère.',
    'Interpréter un géotherme et un flux thermique ; distinguer conduction et convection.',
  ],
  keywords: [
    'ondes P',
    'ondes S',
    'Moho',
    'Gutenberg',
    'Lehmann',
    'PREM',
    'zone d’ombre',
    'lithosphère',
    'asthénosphère',
    'géotherme',
    'conduction',
    'convection',
  ],
  fiche: [
    { type: 'h2', text: 'Étudier l’intérieur de la Terre : la sismologie' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Ondes sismiques',
      content: [
        {
          type: 'list',
          items: [
            '**Ondes P** (primaires) : compression-dilatation, les plus rapides, traversent solides **et** liquides.',
            '**Ondes S** (secondaires) : cisaillement, plus lentes, **ne se propagent pas dans les liquides**.',
            'Quand les propriétés du milieu changent, les ondes sont **réfléchies/réfractées** : leur vitesse change brutalement à une **discontinuité**.',
          ],
        },
      ],
    },
    {
      type: 'table',
      headers: ['Discontinuité', 'Profondeur', 'Observation', 'Interprétation'],
      rows: [
        ['Moho (1909)', '≈ 7 km (océan), 30–70 km (continent)', 'Vp passe de ≈ 6–7 à ≈ 8 km/s', 'Croûte (basalte/gabbro ou granite) → manteau (péridotite)'],
        ['Gutenberg (1914)', '2 900 km', 'Vp chute (≈ 13,7 → 8 km/s) ; Vs devient nulle', 'Manteau solide → noyau externe liquide'],
        ['Lehmann (1936)', '5 150 km', 'Vp augmente (≈ 10,4 → 11 km/s) ; Vs réapparaît', 'Noyau externe liquide → noyau interne (graine) solide'],
      ],
    },
    { type: 'h2', text: 'Les enveloppes du globe' },
    {
      type: 'table',
      headers: ['Enveloppe', 'Composition', 'État', 'Masse volumique (g/cm³)'],
      rows: [
        ['Croûte océanique', 'Basalte, gabbro', 'Solide', '≈ 2,9'],
        ['Croûte continentale', 'Granitoïdes, gneiss', 'Solide', '≈ 2,7'],
        ['Manteau', 'Péridotite (olivine, pyroxènes)', 'Solide (ductile à long terme)', '3,3 → 5,6'],
        ['Noyau externe', 'Fer + nickel + éléments légers', 'Liquide', '≈ 9,9 → 12,2'],
        ['Noyau interne', 'Fer + nickel', 'Solide', '≈ 12,8 → 13,1'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Lithosphère et asthénosphère',
      content: [
        {
          type: 'p',
          text: '**Lithosphère** = croûte + partie supérieure du manteau, **rigide**, fragmentée en plaques, s’arrêtant vers l’isotherme ≈ 1 300 °C. **Asthénosphère** = manteau sous-jacent, **plus ductile** (zone de faible vitesse sismique). Cette distinction est **mécanique**, pas chimique : manteau lithosphérique et asthénosphère ont la même composition (péridotite).',
        },
      ],
    },
    { type: 'h2', text: 'Chaleur interne' },
    {
      type: 'list',
      items: [
        '**Géotherme** : courbe T = f(profondeur). Gradient fort dans la lithosphère (≈ 10 à 30 °C/km en moyenne dans la croûte), faible dans le manteau convectif. T ≈ 1 300 °C vers 100 km ; ≈ 4 000 °C à la base du manteau ; ≈ 5 000 °C ou plus au centre.',
        '**Flux thermique** moyen ≈ 87 mW/m², soit ≈ 45 TW pour toute la Terre. Origine : désintégration d’éléments radioactifs (U, Th, K), chaleur d’accrétion, cristallisation de la graine.',
        '**Conduction** (lithosphère, sans déplacement de matière) et **convection** (manteau, noyau externe : mouvements de matière) sont les deux modes de transfert.',
      ],
    },
  ],
  cours: [
    { type: 'h2', text: '1. Comment connaître l’intérieur de la Terre ?' },
    {
      type: 'p',
      text: 'Le rayon terrestre vaut environ **6 371 km**, mais le forage le plus profond jamais réalisé (Kola, Russie) n’a atteint que **12 km**. L’essentiel de nos connaissances est donc **indirect**.',
    },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Observations directes', text: 'Roches de surface, forages (≤ 12 km), **xénolithes** remontés par des magmas (roches du manteau jusqu’à ≈ 150 km), **ophiolites** (portions de lithosphère océanique charriées sur un continent).', icon: 'Pickaxe' },
        { title: 'Sismologie', text: 'Les ondes sismiques parcourent le globe : leurs temps de trajet révèlent les variations de propriétés (vitesses) avec la profondeur. C’est l’outil majeur.', icon: 'Activity' },
        { title: 'Météorites', text: 'Chondrites (matière primitive, proche du manteau) et sidérites (fer-nickel, proches du noyau) : indices sur la composition globale.', icon: 'Orbit' },
        { title: 'Autres méthodes', text: 'Gravimétrie (masse volumique moyenne ≈ 5,5 g/cm³), champ magnétique (noyau liquide qui convecte), flux thermique, expériences à haute pression.', icon: 'FlaskConical' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Un argument de masse volumique',
      content: [
        {
          type: 'p',
          text: 'La masse volumique moyenne de la Terre (≈ 5,5 g/cm³) est bien supérieure à celle des roches de surface (2,7 à 3). L’intérieur contient donc des matériaux beaucoup plus denses : c’est une première raison de penser à un noyau métallique.',
        },
      ],
    },

    { type: 'h2', text: '2. Séismes et ondes sismiques' },
    {
      type: 'p',
      text: 'Un séisme est une rupture brutale de roches soumises à des contraintes. Il naît en un point profond, le **foyer** (ou hypocentre) ; l’**épicentre** est le point de la surface à la verticale du foyer. L’énergie libérée se propage sous forme d’**ondes sismiques** enregistrées par les **sismomètres** (sismogrammes).',
    },
    {
      type: 'table',
      headers: ['', 'Ondes P', 'Ondes S', 'Ondes de surface'],
      rows: [
        ['Nom', 'Primaires, de compression', 'Secondaires, de cisaillement', 'Love, Rayleigh'],
        ['Déformation', 'Parallèle à la propagation (longitudinale)', 'Perpendiculaire à la propagation (transversale)', 'Se propagent à la surface'],
        ['Milieux traversés', 'Solides, liquides, gaz', 'Solides uniquement', 'Surface'],
        ['Vitesse', 'La plus élevée (arrivent en premier)', '≈ 1,7 fois plus lente que les P', 'Les plus lentes, mais amplitudes les plus fortes (dégâts)'],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Vitesse des ondes et propriétés du milieu',
      content: [
        {
          type: 'p',
          text: 'La vitesse dépend de la **rigidité** du milieu (module de cisaillement μ), de sa compressibilité (K) et de sa masse volumique ρ :',
        },
        { type: 'math', tex: 'V_S=\\sqrt{\\dfrac{\\mu}{\\rho}}\\qquad V_P=\\sqrt{\\dfrac{K+\\tfrac{4}{3}\\mu}{\\rho}}' },
        {
          type: 'p',
          text: 'Pour un liquide, μ = 0 : donc **Vs = 0** et les ondes S ne s’y propagent pas. On retiendra qualitativement : plus un matériau est rigide, plus les ondes y sont rapides.',
        },
      ],
    },
    { type: 'h3', text: 'Localiser un épicentre' },
    {
      type: 'p',
      text: 'Les ondes P et S partent en même temps du foyer, mais les P arrivent avant les S. Le **décalage Δt = tS − tP** augmente avec la distance d à l’épicentre. Pour des vitesses constantes :',
    },
    { type: 'math', tex: 'd=\\Delta t\\times\\dfrac{V_P\\,V_S}{V_P-V_S}' },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        {
          type: 'p',
          text: 'Avec Vp = 6,0 km/s et Vs = 3,5 km/s, un décalage Δt = 40 s donne d = 40 × (6,0 × 3,5)/(6,0 − 3,5) = 40 × 8,4 = **336 km**. Une seule station donne une distance (un cercle de position possible) ; **trois stations** donnent l’épicentre par triangulation.',
        },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Lire le sismogramme', text: 'Repérer le début des ondes P (tP) puis des ondes S (tS) ; calculer Δt.' },
        { title: 'Convertir en distance', text: 'Utiliser une hodochrone (courbe temps = f(distance)) ou la formule ci-dessus.' },
        { title: 'Tracer un cercle', text: 'Sur une carte, tracer autour de la station un cercle de rayon d.' },
        { title: 'Recouper', text: 'L’épicentre est à l’intersection des cercles de trois stations au moins.' },
      ],
    },

    { type: 'h2', text: '3. Réflexion, réfraction et discontinuités' },
    {
      type: 'p',
      text: 'Dans un milieu homogène, une onde se propage en ligne droite. Lorsqu’elle rencontre une surface séparant deux milieux de propriétés différentes (une **discontinuité**), une partie est **réfléchie** et une autre est **réfractée** (déviée) selon la loi de Snell-Descartes :',
    },
    { type: 'math', tex: '\\dfrac{\\sin i_1}{V_1}=\\dfrac{\\sin i_2}{V_2}' },
    {
      type: 'p',
      text: 'Si la vitesse augmente (V2 > V1), le rayon s’**éloigne de la normale** ; si elle diminue, il s’en **rapproche**. Dans un milieu où la vitesse varie progressivement avec la profondeur, les rayons sont **courbés** (concavité tournée vers la surface lorsque la vitesse augmente avec la profondeur). Les temps de parcours et les trajets mesurés en surface renseignent ainsi sur l’intérieur.',
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Profondeur d’une discontinuité par réflexion',
      content: [
        {
          type: 'p',
          text: 'Une onde émise verticalement, réfléchie sur une discontinuité à la profondeur h et revenant en surface au bout du temps t, vérifie 2h = V × t, donc h = V × t / 2.',
        },
      ],
    },

    { type: 'h2', text: '4. Les grandes discontinuités' },
    {
      type: 'timeline',
      events: [
        { date: '1909', title: 'Moho', text: 'Andrija Mohorovičić, étudiant un séisme en Croatie, observe deux arrivées d’ondes P : l’une directe, l’autre réfractée sur une couche plus rapide. Il en déduit une discontinuité vers 30–50 km sous l’Europe.' },
        { date: '1914', title: 'Discontinuité de Gutenberg', text: 'Beno Gutenberg localise à 2 900 km la limite manteau-noyau, à l’origine d’une zone d’ombre.' },
        { date: '1936', title: 'Discontinuité de Lehmann', text: 'Inge Lehmann explique la réapparition d’ondes P dans la zone d’ombre par une graine (noyau interne) à 5 150 km, solide.' },
        { date: '1981', title: 'Modèle PREM', text: 'Dziewonski et Anderson publient le « Preliminary Reference Earth Model », modèle de référence à symétrie sphérique.' },
      ],
    },
    {
      type: 'table',
      headers: ['Discontinuité', 'Profondeur', 'Vp (km/s) au-dessus → au-dessous', 'Vs (km/s)', 'Nature du changement'],
      rows: [
        ['Moho', '≈ 7 km (domaine océanique), 30–35 km (continent), jusqu’à 70 km (chaînes de montagnes)', '≈ 6,5–7 → ≈ 8', '≈ 3,5–4 → ≈ 4,5', 'Changement de **composition** : croûte → péridotite du manteau'],
        ['Gutenberg', '2 900 km', '≈ 13,7 → ≈ 8', '≈ 7,3 → 0', 'Changement de composition **et** d’état : manteau solide → noyau métallique liquide'],
        ['Lehmann', '5 150 km', '≈ 10,4 → ≈ 11', '0 → ≈ 3,5', 'Changement d’état : liquide → solide (sous très forte pression)'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Vitesse qui chute ≠ discontinuité de même nature',
      content: [
        {
          type: 'p',
          text: 'À 2 900 km, la baisse de Vp et l’**annulation de Vs** sont les signatures d’un milieu liquide. À 5 150 km, au contraire, **Vp augmente et Vs réapparaît** : le matériau redevient solide. Ne pas confondre les deux.',
        },
      ],
    },
    {
      type: 'p',
      text: 'Dans le manteau, d’autres variations plus modestes existent : une **zone de faible vitesse** (≈ 100–200 km de profondeur) puis des augmentations de vitesse vers **410 km** et **660 km**, dues à des transformations minéralogiques (l’olivine se réorganise en structures plus compactes sous la pression), sans changement de composition chimique globale.',
    },

    { type: 'h2', text: '5. Les zones d’ombre' },
    {
      type: 'p',
      text: 'Les sismographes placés à plus de **103°** de l’épicentre (distance angulaire mesurée au centre de la Terre) n’enregistrent **aucune onde S directe**, et entre **103° et 142°** aucune onde P directe : c’est la **zone d’ombre**.',
    },
    { type: 'svg', svg: svgOmbre, caption: 'Zone d’ombre des ondes P entre 103° et 142° et absence d’ondes S au-delà de 103°.', maxWidth: 520 },
    {
      type: 'list',
      items: [
        '**Absence d’ondes S** au-delà de 103° : elles ont rencontré un milieu où elles ne se propagent pas, un **liquide** → le noyau externe est liquide.',
        '**Zone d’ombre des ondes P** : à la traversée du noyau, les ondes P sont fortement **réfractées** (Vp chute brutalement) et défléchies vers l’intérieur, laissant une zone sans arrivée directe.',
        '**Ondes P dans la zone d’ombre (1936)** : de faibles ondes P y sont détectées. Lehmann les explique par une **réflexion/réfraction sur un noyau interne solide** plus rapide.',
      ],
    },

    { type: 'h2', text: '6. Le modèle PREM : une Terre en couches' },
    {
      type: 'p',
      text: 'En combinant des millions de sismogrammes, on construit un **modèle de référence** donnant, à chaque profondeur, Vp, Vs et la masse volumique ρ (modèle à symétrie sphérique). Il confirme les grandes enveloppes :',
    },
    { type: 'svg', svg: svgGlobe, caption: 'Coupe schématique du globe (modèle PREM).', maxWidth: 640 },
    {
      type: 'table',
      headers: ['Enveloppe', 'Profondeurs', 'Vp (km/s)', 'Vs (km/s)', 'ρ (g/cm³)'],
      rows: [
        ['Croûte', '0 – 7 à 70 km', '5,8 – 7', '3,2 – 4', '2,7 – 2,9'],
        ['Manteau supérieur', 'Moho – 660 km', '8 – 10,8', '4,4 – 5,9', '3,3 – 4,0'],
        ['Manteau inférieur', '660 – 2 900 km', '10,8 – 13,7', '5,9 – 7,3', '4,4 – 5,6'],
        ['Noyau externe', '2 900 – 5 150 km', '8,0 – 10,4', '0', '9,9 – 12,2'],
        ['Noyau interne', '5 150 – 6 371 km', '≈ 11', '≈ 3,5', '12,8 – 13,1'],
      ],
      caption: 'Valeurs arrondies du modèle PREM.',
    },
    {
      type: 'p',
      text: 'La **pression** augmente avec la profondeur (≈ 1 GPa vers 30 km ; ≈ 136 GPa à 2 900 km ; ≈ 330–364 GPa au centre). Elle explique que le noyau interne soit solide alors que la température y est encore plus élevée qu’ailleurs.',
    },
    { type: 'widget', id: 'earth-layers', title: 'Explorer la coupe du globe', caption: 'Observez la variation de Vp, Vs et de la température avec la profondeur.' },

    { type: 'h2', text: '7. De quoi est faite la Terre ?' },
    {
      type: 'h3',
      text: 'La croûte',
    },
    {
      type: 'table',
      headers: ['', 'Croûte océanique', 'Croûte continentale'],
      rows: [
        ['Épaisseur', '≈ 7 km (5 à 10 km)', '≈ 30–35 km en moyenne ; jusqu’à 70 km sous les chaînes de montagnes'],
        ['Roches principales', 'Basaltes (en surface), gabbros (en profondeur)', 'Granites et roches apparentées (granodiorites), gneiss, roches sédimentaires en surface'],
        ['Masse volumique', '≈ 2,9 g/cm³', '≈ 2,7 g/cm³'],
        ['Âge', 'Jeune : au plus ≈ 180–200 Ma', 'Ancien : jusqu’à ≈ 4 Ga'],
        ['Altitude moyenne', '≈ −4 000 m', '≈ + 840 m'],
      ],
    },
    { type: 'h3', text: 'Le manteau' },
    {
      type: 'p',
      text: 'Le manteau est constitué de **péridotite**, roche riche en **olivine** et en **pyroxènes**, de masse volumique ≈ 3,3 g/cm³ en surface. Arguments : (1) vitesses sismiques (Vp ≈ 8 km/s) compatibles avec la péridotite ; (2) **xénolithes** de péridotite remontés par des basaltes (kimberlites, basaltes alcalins) ; (3) **ophiolites** contenant des péridotites ; (4) météorites **chondrites**, dont la composition moyenne est proche de celle d’un manteau + noyau.',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Manteau solide, pas liquide',
      content: [
        {
          type: 'p',
          text: 'Le manteau transmet les ondes S : il est **solide** à l’échelle des ondes sismiques (durée de quelques secondes). Sur des millions d’années, il se déforme lentement comme un solide **ductile** (convection). Une fusion très partielle (≈ 1 %) peut localement exister dans l’asthénosphère, mais le manteau n’est pas un « océan de magma ».',
        },
      ],
    },
    { type: 'h3', text: 'Le noyau' },
    {
      type: 'p',
      text: 'Le noyau (≈ 15 % du volume, ≈ 32 % de la masse) est un alliage de **fer et de nickel** avec quelques % d’**éléments légers** (soufre, oxygène, silicium, hydrogène, carbone…). Son existence est justifiée par la masse volumique moyenne de la Terre, la comparaison avec les **sidérites**, et le **champ magnétique** terrestre, produit par la convection du noyau externe liquide, conducteur électrique (effet dynamo).',
    },

    { type: 'h2', text: '8. Lithosphère et asthénosphère' },
    {
      type: 'p',
      text: 'La distinction **lithosphère / asthénosphère** repose sur le **comportement mécanique** (rhéologie) et non sur la composition.',
    },
    {
      type: 'table',
      headers: ['', 'Lithosphère', 'Asthénosphère'],
      rows: [
        ['Constitution', 'Croûte + manteau lithosphérique (péridotite)', 'Manteau supérieur (péridotite)'],
        ['Comportement', 'Rigide, cassant en surface (séismes), se fragmente en plaques', 'Ductile, se déforme lentement ; zone de faible vitesse sismique'],
        ['Transfert de chaleur', 'Surtout par conduction', 'Surtout par convection'],
        ['Limite inférieure', 'Isotherme ≈ 1 300 °C ; ≈ 100 km (océan âgé), 150 km ou plus (continent)', 'Se prolonge jusqu’à ≈ 660 km (puis manteau inférieur)'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      content: [
        {
          type: 'p',
          text: 'Croûte ≠ lithosphère. La **croûte** est définie par sa **composition**, la **lithosphère** par son **comportement mécanique**. La lithosphère comprend la croûte **et** une partie du manteau.',
        },
      ],
    },

    { type: 'h2', text: '9. La chaleur interne de la Terre' },
    {
      type: 'h3',
      text: 'Gradient et géotherme',
    },
    {
      type: 'p',
      text: 'La température augmente avec la profondeur : c’est le **gradient géothermique** (en moyenne ≈ 30 °C/km dans les premiers kilomètres de la croûte continentale, avec de fortes variations). Le **géotherme** est la courbe T = f(z) : sa pente (gradient) diminue fortement au-delà de la lithosphère.',
    },
    { type: 'svg', svg: svgGeotherme, caption: 'Allure du géotherme : fort gradient dans la lithosphère, gradient faible dans le manteau.', maxWidth: 640 },
    {
      type: 'table',
      headers: ['Profondeur', 'Température (ordre de grandeur)'],
      rows: [
        ['≈ 100 km (base de la lithosphère)', '≈ 1 300 °C'],
        ['≈ 660 km', '≈ 1 800 °C'],
        ['2 900 km (limite manteau-noyau)', '≈ 3 700–4 000 °C'],
        ['5 150 km (graine)', '≈ 5 000 °C'],
        ['Centre', '≈ 5 000–6 000 °C'],
      ],
    },
    {
      type: 'p',
      text: 'On confronte le géotherme à la **courbe de fusion (solidus)** des péridotites : le manteau reste solide car sa température est **inférieure** au solidus (la fusion s’y produit seulement localement). Dans le noyau, la température dépasse la fusion du fer à la pression du noyau externe, qui est donc liquide ; vers le centre, la pression devient si forte que le fer se solidifie (noyau interne solide) malgré une température plus élevée.',
    },
    { type: 'h3', text: 'Flux thermique' },
    {
      type: 'p',
      text: 'Le **flux thermique** φ est la puissance traversant une unité de surface (en W/m²). En régime de conduction, il suit la **loi de Fourier** :',
    },
    { type: 'math', tex: '\\varphi=\\lambda\\times\\dfrac{\\Delta T}{\\Delta z}' },
    {
      type: 'p',
      text: 'avec λ la conductivité thermique (W·m⁻¹·K⁻¹) et ΔT/Δz le gradient. Pour λ ≈ 3 W·m⁻¹·K⁻¹ et un gradient de 30 °C/km (0,03 K/m), φ ≈ 0,09 W/m² soit environ **90 mW/m²** : cohérent avec la moyenne mondiale (≈ 87 mW/m²). Le flux est **plus élevé au niveau des dorsales** (lithosphère mince, remontée de matière chaude) et **plus faible dans les vieux domaines continentaux**. Au total la Terre perd environ **45 TW**.',
    },
    {
      type: 'p',
      text: 'Origines de cette chaleur : (1) la **désintégration radioactive** d’isotopes à longue période (uranium 238 et 235, thorium 232, potassium 40), concentrés surtout dans la croûte continentale ; (2) la chaleur **primitive** (accrétion, différenciation fer/silicates) ; (3) la **chaleur latente** liée à la cristallisation de la graine.',
    },

    { type: 'h2', text: '10. Les transferts thermiques : conduction et convection' },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Conduction', text: 'Transfert de chaleur de proche en proche **sans déplacement de matière**, des zones chaudes vers les zones froides. Mode dominant dans la **lithosphère** (rigide). Très lent à grande échelle.', icon: 'Thermometer' },
        { title: 'Convection', text: 'Transfert **avec déplacement de matière** : la matière chaude, moins dense, monte ; la matière froide, plus dense, descend. Mode dominant dans le **manteau** (ductile) et le **noyau externe** (liquide).', icon: 'RefreshCw' },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Pourquoi la convection dans le manteau ?',
      content: [
        {
          type: 'p',
          text: 'Une durée caractéristique de conduction sur une longueur L est t ≈ L²/κ (κ ≈ 10⁻⁶ m²/s, diffusivité thermique des roches). Pour L = 2 900 km, t ≈ 8,4 × 10¹⁸ s ≈ 2,7 × 10¹¹ ans, soit près de 60 fois l’âge de la Terre (4,56 Ga) : la conduction seule ne peut refroidir le manteau. Les mouvements de convection (quelques cm/an) évacuent la chaleur en environ **100 Ma** d’échelle de temps.',
        },
      ],
    },
    {
      type: 'p',
      text: 'La **tomographie sismique** met en évidence ces mouvements : les zones où les ondes sont **plus rapides que la moyenne** correspondent à des matériaux **plus froids et denses** (lithosphère plongeante), celles où elles sont **plus lentes** à des matériaux **plus chauds** (remontées chaudes, « panaches »). Les mouvements de convection sont le moteur de la **tectonique des plaques** (chapitre suivant).',
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Des réponses jamais définitives',
      content: [
        {
          type: 'p',
          text: 'Lord Kelvin estimait vers 1862 l’âge de la Terre à moins de 100 Ma en supposant qu’elle ne se refroidissait que par conduction, sans source de chaleur interne. La découverte de la radioactivité (Becquerel 1896, Curie) et de la convection mantellique ont invalidé ce calcul : un bon exemple de modèle scientifique révisé grâce à de nouvelles données.',
        },
      ],
    },
  ],
  exercices: [
    {
      id: 'ex1-epicentre',
      title: 'Distance à l’épicentre',
      difficulty: 1,
      duration: 10,
      tags: ['sismologie', 'calcul'],
      statement: [
        {
          type: 'p',
          text: 'Une station enregistre les premières ondes P à 10 h 12 min 05 s et les premières ondes S à 10 h 12 min 45 s. On suppose Vp = 6,0 km/s et Vs = 3,5 km/s dans la croûte.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer le décalage Δt = tS − tP.',
            'En déduire la distance d entre la station et l’épicentre.',
            'Combien de stations faut-il pour localiser l’épicentre ? Justifier.',
          ],
        },
      ],
      hints: ['Les deux ondes parcourent la même distance d : exprimer tP = d/Vp et tS = d/Vs.', 'Δt = d(1/Vs − 1/Vp).'],
      solution: [
        { type: 'p', text: '**1.** Δt = 45 − 5 = **40 s**.' },
        {
          type: 'p',
          text: '**2.** tP = d/Vp, tS = d/Vs, donc Δt = d (1/Vs − 1/Vp) = d (Vp − Vs)/(Vp Vs). Ainsi d = Δt × Vp Vs/(Vp − Vs) = 40 × (6,0 × 3,5)/(6,0 − 3,5) = 40 × 21/2,5 = 40 × 8,4 = **336 km**.',
        },
        {
          type: 'p',
          text: '**3.** Une seule station donne seulement la distance : l’épicentre peut être n’importe où sur un cercle de rayon 336 km centré sur la station. Deux stations donnent deux points d’intersection (ambigu) ; **trois stations** au moins donnent un point unique (triangulation).',
        },
      ],
    },
    {
      id: 'ex2-moho',
      title: 'Épaisseur de la croûte par réflexion',
      difficulty: 1,
      duration: 10,
      tags: ['Moho', 'réflexion'],
      statement: [
        {
          type: 'p',
          text: 'Une expérience de sismique réflexion verticale en domaine continental enregistre un écho d’onde P au bout de 11,7 s. La vitesse moyenne des ondes P dans la croûte est 6,0 km/s.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quelle distance totale l’onde a-t-elle parcourue ?',
            'En déduire la profondeur de la discontinuité réfléchissante. De laquelle s’agit-il ?',
            'Le même dispositif en domaine océanique donne un écho à 2,3 s (Vp moyenne 6,0 km/s, on néglige la tranche d’eau). Calculer l’épaisseur de la croûte océanique et comparer.',
          ],
        },
      ],
      hints: ['L’onde fait un aller-retour : 2h = V × t.'],
      solution: [
        { type: 'p', text: '**1.** d = V × t = 6,0 × 11,7 = 70,2 km (aller-retour).' },
        { type: 'p', text: '**2.** h = 70,2 / 2 = **35,1 km**. Valeur typique d’une croûte continentale : il s’agit de la **discontinuité de Mohorovičić (Moho)**, limite croûte/manteau.' },
        { type: 'p', text: '**3.** h = 6,0 × 2,3 / 2 = **6,9 km** : la croûte océanique (≈ 7 km) est donc **environ 5 fois plus mince** que la croûte continentale (≈ 35 km).' },
      ],
    },
    {
      id: 'ex3-vitesses',
      title: 'Lire un profil de vitesses',
      difficulty: 2,
      duration: 20,
      tags: ['PREM', 'discontinuités'],
      statement: [
        { type: 'p', text: 'Le tableau donne des valeurs (arrondies, d’après le modèle PREM) des vitesses des ondes sismiques en fonction de la profondeur.' },
        {
          type: 'table',
          headers: ['Profondeur (km)', 'Vp (km/s)', 'Vs (km/s)'],
          rows: [
            ['20', '6,0', '3,5'],
            ['50', '8,1', '4,5'],
            ['150', '8,0', '4,4'],
            ['1 000', '11,4', '6,3'],
            ['2 800', '13,7', '7,3'],
            ['3 000', '8,1', '0'],
            ['5 000', '10,3', '0'],
            ['5 300', '11,2', '3,6'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Entre quelles profondeurs trouve-t-on la discontinuité du Moho ? Justifier à partir des vitesses.',
            'Montrer qu’il existe une autre discontinuité entre 2 800 et 3 000 km. Que nous apprend la valeur de Vs à 3 000 km ?',
            'Entre 5 000 et 5 300 km, que traduit la réapparition de Vs ? Nommer cette discontinuité.',
            'Entre 50 et 150 km, comment évoluent les vitesses ? À quelle zone cela correspond-il ?',
          ],
        },
      ],
      hints: ['Cherchez les variations brusques de Vp.', 'Vs = 0 signifie que le milieu n’est pas rigide.'],
      solution: [
        { type: 'p', text: '**1.** Entre 20 et 50 km, Vp passe de 6,0 à 8,1 km/s et Vs de 3,5 à 4,5 km/s : augmentation brutale. Le **Moho** (profondeur variable) se trouve donc entre 20 et 50 km (cohérent avec ≈ 30–35 km sous un continent). Il sépare la croûte de la péridotite du manteau.' },
        { type: 'p', text: '**2.** Vp chute brutalement de 13,7 à 8,1 km/s alors que la profondeur augmente : discontinuité de **Gutenberg** (2 900 km). À 3 000 km, **Vs = 0** : les ondes S ne s’y propagent pas, le milieu est donc **liquide** (noyau externe).' },
        { type: 'p', text: '**3.** Vp augmente (10,3 → 11,2 km/s) et Vs réapparaît (3,6 km/s) : le milieu redevient **solide**. C’est la discontinuité de **Lehmann** (5 150 km) : noyau externe liquide / noyau interne solide.' },
        { type: 'p', text: '**4.** Les vitesses diminuent légèrement (Vp 8,1 → 8,0 ; Vs 4,5 → 4,4 km/s) alors qu’elles auraient tendance à augmenter avec la pression. Cela correspond à la **zone de faible vitesse** de l’**asthénosphère** (matériau plus chaud, proche de la fusion partielle, plus ductile), sous la lithosphère rigide.' },
      ],
    },
    {
      id: 'ex4-ombre',
      title: 'Zones d’ombre et noyau liquide',
      difficulty: 2,
      duration: 20,
      tags: ['zone d’ombre', 'noyau', 'bac'],
      statement: [
        {
          type: 'p',
          text: 'Après un séisme, les stations situées à moins de 103° de l’épicentre enregistrent des ondes P et S. Entre 103° et 142°, on n’enregistre ni P ni S directes. Au-delà de 142°, des ondes P arrivent de nouveau (en retard par rapport à ce qu’une Terre homogène prévoirait), mais on n’observe toujours aucune onde S. En 1936, Inge Lehmann détecte en outre de faibles ondes P dans la zone d’ombre.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quelle conclusion tire-t-on de l’absence d’ondes S au-delà de 103° ?',
            'Expliquer la zone d’ombre des ondes P et leur retard au-delà de 142°.',
            'Quelle hypothèse Lehmann formule-t-elle pour expliquer les ondes P détectées dans la zone d’ombre ? Quelle propriété du noyau interne en découle ?',
          ],
        },
      ],
      hints: ['Souvenez-vous des propriétés des ondes S dans un liquide.', 'Une forte baisse de vitesse à l’entrée d’un milieu rapproche le rayon de la normale.'],
      solution: [
        { type: 'p', text: '**1.** Les ondes S ne se propagent que dans les solides. Leur absence au-delà de 103° signifie qu’elles ont été arrêtées par une enveloppe **liquide** : le **noyau externe** (à partir de 2 900 km) est liquide.' },
        { type: 'p', text: '**2.** À l’entrée dans le noyau (discontinuité de Gutenberg), la vitesse des ondes P chute (≈ 13,7 → 8 km/s). Les rayons sont réfractés en se rapprochant de la normale, donc déviés vers l’intérieur : ils émergent loin de l’épicentre (au-delà de 142°) et laissent entre 103° et 142° une zone sans arrivée directe, la **zone d’ombre**. Les ondes traversant le noyau, plus lentes, arrivent avec du **retard**.' },
        { type: 'p', text: '**3.** Lehmann propose l’existence d’une **graine** centrale, où les ondes P sont de nouveau plus rapides, qui les réfracte (ou les réfléchit) vers la zone d’ombre. La vitesse plus élevée correspond à un milieu **solide** : le noyau interne est solide malgré la température très élevée, du fait de la pression énorme.' },
      ],
    },
    {
      id: 'ex5-flux',
      title: 'Flux thermique et bilan énergétique',
      difficulty: 2,
      duration: 20,
      tags: ['flux', 'géotherme', 'calcul'],
      statement: [
        {
          type: 'p',
          text: 'En un point de la croûte continentale, on mesure un gradient géothermique de 25 °C/km. La conductivité thermique des roches est λ = 2,8 W·m⁻¹·K⁻¹.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer le flux thermique φ en mW/m².',
            'Le flux moyen mondial est de 87 mW/m². Comparer et commenter.',
            'La surface de la Terre est ≈ 5,1 × 10¹⁴ m². Estimer la puissance totale perdue en TW (1 TW = 10¹² W).',
            'Citer deux sources de cette chaleur.',
          ],
        },
      ],
      hints: ['Convertir le gradient en K/m : 25 °C/km = 0,025 K/m.', 'Puissance = flux × surface.'],
      solution: [
        { type: 'p', text: '**1.** φ = λ × gradient = 2,8 × 0,025 = 0,070 W/m² = **70 mW/m²**.' },
        { type: 'p', text: '**2.** 70 mW/m² est un peu inférieur à la moyenne mondiale (87 mW/m²) : plausible pour une croûte continentale ancienne, car les flux les plus forts se trouvent aux dorsales (lithosphère mince) et les plus faibles dans les vieux boucliers.' },
        { type: 'p', text: '**3.** P = 0,087 × 5,1 × 10¹⁴ ≈ 4,4 × 10¹³ W = **≈ 44 TW**.' },
        { type: 'p', text: '**4.** Désintégration radioactive (U, Th, K), chaleur résiduelle de l’accrétion et de la différenciation du noyau, chaleur latente de cristallisation de la graine (deux au choix).' },
      ],
    },
    {
      id: 'ex6-conduction',
      title: 'Conduction ou convection ?',
      difficulty: 3,
      duration: 25,
      tags: ['transferts thermiques', 'ordres de grandeur'],
      statement: [
        {
          type: 'p',
          text: 'On souhaite comparer l’efficacité de deux modes de transfert de chaleur dans le manteau (épaisseur L = 2 900 km). La diffusivité thermique des roches est κ = 1,0 × 10⁻⁶ m²/s. On estime la durée de la conduction par t = L²/κ. Une année = 3,16 × 10⁷ s. L’âge de la Terre est 4,56 Ga.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer t en secondes puis en années.',
            'Comparer à l’âge de la Terre. Que peut-on conclure ?',
            'En convection, la matière se déplace à environ 5 cm/an. Calculer la durée nécessaire pour parcourir 2 900 km.',
            'Quel mode de transfert domine dans le manteau ? Dans la lithosphère ? Justifier avec le comportement de la roche.',
          ],
        },
      ],
      hints: ['Convertir L en mètres.', '5 cm/an = 0,05 m/an.'],
      solution: [
        { type: 'p', text: '**1.** L = 2,9 × 10⁶ m, donc L² = 8,41 × 10¹² m² et t = 8,41 × 10¹² / 10⁻⁶ = 8,41 × 10¹⁸ s. En années : 8,41 × 10¹⁸ / 3,16 × 10⁷ ≈ **2,7 × 10¹¹ ans**.' },
        { type: 'p', text: '**2.** C’est environ 58 fois l’âge de la Terre (4,56 × 10⁹ ans) : la conduction seule serait incapable d’évacuer la chaleur du manteau depuis la formation de la Terre. Un autre mécanisme plus efficace doit intervenir.' },
        { type: 'p', text: '**3.** t = 2,9 × 10⁶ m / 0,05 m/an = 5,8 × 10⁷ ans ≈ **58 Ma**, donc de l’ordre de quelques dizaines de millions d’années : très inférieur à l’âge de la Terre.' },
        { type: 'p', text: '**4.** Dans le **manteau**, ductile à l’échelle géologique, la **convection** domine. Dans la **lithosphère**, rigide, la matière ne peut pas circuler : la chaleur la traverse essentiellement par **conduction**.' },
      ],
    },
    {
      id: 'ex7-lithosphere',
      title: 'Limite lithosphère-asthénosphère',
      difficulty: 3,
      duration: 25,
      tags: ['géotherme', 'lithosphère'],
      statement: [
        {
          type: 'p',
          text: 'Données simplifiées pour une lithosphère océanique âgée : température T en fonction de la profondeur z. On admet que la limite lithosphère/asthénosphère correspond à l’isotherme 1 300 °C.',
        },
        {
          type: 'table',
          headers: ['z (km)', '0', '25', '50', '75', '100', '150', '200'],
          rows: [['T (°C)', '2', '480', '900', '1 200', '1 300', '1 360', '1 400']],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer le gradient géothermique moyen entre 0 et 50 km, puis entre 100 et 200 km.',
            'Déterminer la profondeur de la base de la lithosphère.',
            'Que traduit le changement de gradient ? Quel mode de transfert dominerait de part et d’autre de la limite ?',
            'Le manteau lithosphérique et l’asthénosphère ont-ils la même composition ? Justifier.',
          ],
        },
      ],
      hints: ['Gradient = ΔT / Δz.'],
      solution: [
        { type: 'p', text: '**1.** Entre 0 et 50 km : (900 − 2)/50 ≈ **18 °C/km**. Entre 100 et 200 km : (1 400 − 1 300)/100 = **1 °C/km**.' },
        { type: 'p', text: '**2.** T = 1 300 °C à **100 km** : base de la lithosphère.' },
        { type: 'p', text: '**3.** Le gradient s’effondre de ≈ 18 à ≈ 1 °C/km : on passe d’un milieu rigide où la chaleur est transférée par **conduction** (fort gradient) à un milieu ductile en **convection**, qui homogénéise la température (gradient faible).' },
        { type: 'p', text: '**4.** Oui : ils sont tous deux formés de péridotite. La limite est **thermique et mécanique** (rigide/ductile), non chimique.' },
      ],
    },
    {
      id: 'ex8-bac-manteau',
      title: 'Type bac : de quoi est fait le manteau ?',
      difficulty: 3,
      duration: 35,
      tags: ['bac', 'composition', 'argumentation'],
      statement: [
        {
          type: 'p',
          text: 'Vous disposez des documents suivants pour déterminer la nature des roches du manteau supérieur.',
        },
        {
          type: 'table',
          headers: ['Document 1 : roche', 'Masse volumique (g/cm³)', 'Vp au laboratoire (km/s)'],
          rows: [
            ['Granite', '2,7', '≈ 6,0'],
            ['Basalte', '2,9', '≈ 6,5'],
            ['Gabbro', '3,0', '≈ 7,0'],
            ['Péridotite', '3,3', '≈ 8,1'],
          ],
        },
        {
          type: 'p',
          text: '**Document 2.** Sous l’Europe, les ondes P voyagent à ≈ 8,0 km/s juste sous le Moho. **Document 3.** Des basaltes, issus de volcans, contiennent des enclaves (xénolithes) vertes, riches en olivine et pyroxènes, de masse volumique 3,3 g/cm³. **Document 4.** Dans certaines chaînes de montagnes (Alpes, Oman), on observe des roches qui sont des lambeaux de lithosphère océanique avec, à leur base, des péridotites.',
        },
        {
          type: 'p',
          text: 'Question : à l’aide des documents et de vos connaissances, argumentez que le manteau supérieur est constitué de péridotite et non de granite, de basalte ou de gabbro, puis indiquez les limites de cette démonstration.',
        },
      ],
      hints: ['Rapprocher document 1 et document 2.', 'Les xénolithes sont des échantillons directs.', 'Pensez aux conditions de pression/température du manteau.'],
      solution: [
        {
          type: 'p',
          text: '**Introduction.** Le manteau n’est pas accessible directement, on le caractérise en comparant des données géophysiques et des roches connues.',
        },
        {
          type: 'p',
          text: '**Argument 1 (vitesses).** Juste sous le Moho, Vp ≈ 8 km/s (doc. 2). Parmi les roches du doc. 1, seule la **péridotite** (≈ 8,1 km/s) a une vitesse comparable ; granite (6,0), basalte (6,5) et gabbro (7,0) sont trop lents : ils sont exclus.',
        },
        {
          type: 'p',
          text: '**Argument 2 (densité et échantillons directs).** Des xénolithes à olivine + pyroxènes, de masse volumique 3,3 g/cm³ (doc. 3), sont remontés par des magmas depuis le manteau : ils sont des échantillons directs et leur densité correspond à celle de la péridotite.',
        },
        {
          type: 'p',
          text: '**Argument 3 (ophiolites).** Les péridotites à la base des lambeaux de lithosphère océanique (doc. 4) confirment que la roche sous la croûte océanique est de la péridotite.',
        },
        {
          type: 'p',
          text: '**Limites.** Les mesures de laboratoire sont faites à pression et température ordinaires alors que la pression et la température augmentent avec la profondeur (modifiant les vitesses et les minéraux) ; les xénolithes ne proviennent que de ≈ 150 km maximum ; la composition du manteau profond n’est pas directement observée. D’où l’intérêt de croiser plusieurs méthodes (sismologie, pétrologie, météorites chondritiques).',
        },
      ],
    },
  ],
  representations: [
    { type: 'widget', id: 'earth-layers', title: 'Coupe interactive du globe', caption: 'Parcourez les profondeurs : enveloppes, vitesses des ondes P et S, géotherme, lithosphère/asthénosphère.' },
    { type: 'svg', svg: svgGlobe, caption: 'Structure interne du globe (non à l’échelle pour la croûte).', maxWidth: 640 },
    { type: 'svg', svg: svgOmbre, caption: 'Zones d’ombre sismiques : preuve d’un noyau externe liquide et d’une graine solide.', maxWidth: 520 },
    { type: 'svg', svg: svgGeotherme, caption: 'Allure du géotherme et limite lithosphère/asthénosphère.', maxWidth: 640 },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Quelle onde sismique ne se propage pas dans un liquide ?',
          choices: ['Onde P', 'Onde S', 'Les deux', 'Aucune'],
          answer: 1,
          explanation: 'Les ondes S sont des ondes de cisaillement : un liquide (μ = 0) ne peut pas transmettre ce cisaillement.',
        },
        {
          question: 'La discontinuité de Gutenberg se situe à environ…',
          choices: ['35 km', '660 km', '2 900 km', '5 150 km'],
          answer: 2,
          explanation: 'Limite manteau / noyau externe, à ≈ 2 900 km de profondeur.',
        },
        {
          question: 'À la discontinuité de Lehmann (5 150 km)…',
          choices: ['Vs s’annule', 'Vp augmente et Vs réapparaît', 'Vp chute fortement', 'On passe de la croûte au manteau'],
          answer: 1,
          explanation: 'On passe du noyau externe liquide au noyau interne solide.',
        },
        {
          question: 'Quelle roche constitue majoritairement le manteau supérieur ?',
          choices: ['Granite', 'Basalte', 'Gabbro', 'Péridotite'],
          answer: 3,
          explanation: 'Roche ultrabasique riche en olivine et pyroxènes.',
        },
        {
          question: 'La lithosphère est…',
          choices: [
            'Uniquement la croûte',
            'La croûte et la partie supérieure rigide du manteau',
            'Le noyau externe',
            'Le manteau liquide',
          ],
          answer: 1,
          explanation: 'Définition mécanique : enveloppe rigide fragmentée en plaques.',
        },
        {
          question: 'Dans la lithosphère, le transfert thermique est surtout…',
          choices: ['Convectif', 'Conductif', 'Radiatif', 'Nul'],
          answer: 1,
          explanation: 'Rigide : pas de mouvement de matière, donc conduction.',
        },
        {
          question: 'La zone d’ombre des ondes P est observée entre…',
          choices: ['0° et 103°', '103° et 142°', '142° et 180°', '30° et 60°'],
          answer: 1,
          explanation: 'À cause de la forte réfraction sur le noyau.',
        },
        {
          question: 'Les ondes sismiques arrivant dans un sismogramme dans l’ordre sont…',
          choices: ['S puis P', 'P puis S', 'Ondes de surface puis P', 'Simultanément'],
          answer: 1,
          explanation: 'Les P sont les plus rapides (primaires), puis les S, puis les ondes de surface.',
        },
        {
          question: 'Le flux thermique terrestre moyen vaut environ…',
          choices: ['87 mW/m²', '87 W/m²', '1 360 W/m²', '0,001 mW/m²'],
          answer: 0,
          explanation: 'Environ 0,087 W/m², soit ≈ 45 TW au total.',
        },
        {
          question: 'Le noyau interne est solide parce que…',
          choices: [
            'Il est plus froid que le noyau externe',
            'La pression y est très élevée, ce qui élève la température de fusion du fer',
            'Il est constitué de granite',
            'Les ondes S ne le traversent pas',
          ],
          answer: 1,
          explanation: 'Sa température est élevée mais la pression (≈ 330–364 GPa) maintient le fer à l’état solide.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Ondes P', back: 'Ondes de compression-dilatation (primaires) : les plus rapides, traversent solides et liquides.' },
        { front: 'Ondes S', back: 'Ondes de cisaillement (secondaires) : plus lentes que les P, ne traversent pas les liquides.' },
        { front: 'Discontinuité de Mohorovičić', back: 'Limite croûte/manteau : ≈ 7 km en domaine océanique, ≈ 30–35 km (jusqu’à 70) sous les continents. Vp passe à ≈ 8 km/s.' },
        { front: 'Discontinuité de Gutenberg', back: '2 900 km : manteau solide / noyau externe liquide. Vp chute, Vs = 0.' },
        { front: 'Discontinuité de Lehmann', back: '5 150 km : noyau externe liquide / noyau interne solide. Vp augmente, Vs réapparaît.' },
        { front: 'Zone d’ombre des ondes P', back: 'Entre 103° et 142° de l’épicentre : aucune P directe, à cause de la réfraction sur le noyau.' },
        { front: 'Composition du manteau', back: 'Péridotite : olivine + pyroxènes (+ grenat, spinelle ou plagioclase selon la pression). ρ ≈ 3,3 g/cm³ en surface.' },
        { front: 'Croûte océanique', back: 'Basalte et gabbro, ≈ 7 km, ρ ≈ 2,9 g/cm³, jeune (< 200 Ma).' },
        { front: 'Croûte continentale', back: 'Granitoïdes et gneiss, ≈ 30–35 km, ρ ≈ 2,7 g/cm³, ancienne (jusqu’à ≈ 4 Ga).' },
        { front: 'Lithosphère', back: 'Croûte + manteau supérieur rigide (jusqu’à ≈ 1 300 °C). Fragmentée en plaques. Transfert par conduction.' },
        { front: 'Asthénosphère', back: 'Manteau supérieur ductile, zone de faible vitesse sismique ; transfert par convection.' },
        { front: 'Géotherme', back: 'Courbe température = f(profondeur). Gradient fort dans la lithosphère puis faible.' },
        { front: 'Flux thermique terrestre moyen', back: '≈ 87 mW/m² (≈ 45 TW). Plus fort aux dorsales.' },
        { front: 'Conduction vs convection', back: 'Conduction : sans mouvement de matière (lithosphère). Convection : avec mouvement de matière (manteau, noyau externe).' },
        { front: 'Modèle PREM', back: 'Modèle de référence de la Terre (1981) : Vp, Vs, ρ en fonction de la profondeur, à symétrie sphérique.' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer discontinuité et profondeur',
      pairs: [
        { left: 'Moho', right: '≈ 7 à 70 km selon le domaine' },
        { left: 'Zone de faible vitesse', right: '≈ 100–200 km' },
        { left: 'Gutenberg', right: '2 900 km' },
        { left: 'Lehmann', right: '5 150 km' },
        { left: 'Centre de la Terre', right: '6 371 km' },
      ],
    },
    {
      type: 'ordering',
      title: 'Du centre vers la surface : enveloppes de la Terre',
      items: ['Noyau interne (solide)', 'Noyau externe (liquide)', 'Manteau inférieur', 'Manteau supérieur', 'Croûte'],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'Les ondes {{S}} ne se propagent pas dans les {{liquides|liquide}}. La discontinuité de {{Gutenberg}} sépare le manteau du noyau {{externe}}. La {{lithosphère}} est rigide et transfère la chaleur par {{conduction}}, tandis que le manteau la transfère par {{convection}}.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Le manteau est liquide car il est très chaud.', answer: false, explanation: 'Il transmet les ondes S : il est solide (ductile à long terme).' },
        { text: 'La croûte et la lithosphère désignent la même enveloppe.', answer: false, explanation: 'La lithosphère comprend la croûte et le manteau supérieur rigide.' },
        { text: 'Le noyau externe est liquide.', answer: true, explanation: 'Absence d’ondes S et zone d’ombre.' },
        { text: 'La croûte océanique est plus dense et plus mince que la croûte continentale.', answer: true, explanation: '≈ 2,9 g/cm³ et ≈ 7 km contre ≈ 2,7 g/cm³ et ≈ 35 km.' },
        { text: 'La conduction suffit à refroidir le manteau.', answer: false, explanation: 'Trop lente (≈ 10¹¹ ans) : la convection domine.' },
      ],
    },
    {
      type: 'reveal',
      title: 'Pourquoi les ondes S disparaissent-elles dans le noyau externe ?',
      content: [
        {
          type: 'p',
          text: 'Un liquide ne résiste pas au cisaillement (μ = 0). Comme Vs = √(μ/ρ), Vs = 0 : l’onde S ne peut pas s’y propager. C’est la preuve principale de l’état liquide du noyau externe.',
        },
      ],
    },
  ],
}

export default chapter
