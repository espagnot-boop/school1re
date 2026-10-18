import type { Chapter } from '../types'

const svgReseau = `<svg viewBox="0 0 640 390" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <defs>
    <marker id="arrTroph" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.3" fill="none" marker-end="url(#arrTroph)">
    <line x1="300" y1="286" x2="185" y2="236"/>
    <line x1="300" y1="286" x2="445" y2="236"/>
    <line x1="180" y1="206" x2="115" y2="156"/>
    <line x1="180" y1="206" x2="255" y2="156"/>
    <line x1="450" y1="206" x2="475" y2="156"/>
    <line x1="450" y1="206" x2="345" y2="76"/>
    <line x1="115" y1="126" x2="320" y2="76"/>
    <line x1="260" y1="126" x2="330" y2="76"/>
  </g>
  <g stroke="currentColor" stroke-width="1.2">
    <rect x="255" y="286" width="90" height="28" fill="hsl(142 71% 45% / 0.35)"/>
    <rect x="135" y="206" width="90" height="28" fill="hsl(25 95% 53% / 0.3)"/>
    <rect x="405" y="206" width="90" height="28" fill="hsl(25 95% 53% / 0.3)"/>
    <rect x="65" y="126" width="100" height="28" fill="hsl(217 91% 60% / 0.3)"/>
    <rect x="215" y="126" width="90" height="28" fill="hsl(217 91% 60% / 0.3)"/>
    <rect x="435" y="126" width="90" height="28" fill="hsl(217 91% 60% / 0.3)"/>
    <rect x="285" y="48" width="90" height="28" fill="hsl(263 70% 60% / 0.3)"/>
    <rect x="40" y="345" width="560" height="28" fill="hsl(0 0% 50% / 0.2)"/>
  </g>
  <g fill="currentColor" text-anchor="middle">
    <text x="300" y="304">Herbes</text>
    <text x="180" y="224">Criquet</text>
    <text x="450" y="224">Lapin</text>
    <text x="115" y="144">Grenouille</text>
    <text x="260" y="144">Mésange</text>
    <text x="480" y="144">Renard</text>
    <text x="330" y="66">Buse</text>
    <text x="320" y="363">Décomposeurs (bactéries, champignons) : recyclent la matière organique morte</text>
  </g>
  <g fill="currentColor" font-size="11">
    <text x="560" y="304" text-anchor="end">Producteurs (niveau 1)</text>
    <text x="620" y="224" text-anchor="end">Consommateurs I</text>
    <text x="20" y="190" >Consommateurs II</text>
    <text x="20" y="60">Consommateurs III</text>
    <text x="30" y="20">Les flèches vont de la proie vers le prédateur (sens du flux de matière et d’énergie)</text>
  </g>
</svg>`

const svgPyramide = `<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <g stroke="currentColor" stroke-width="1.2">
    <rect x="60" y="230" width="360" height="42" fill="hsl(142 71% 45% / 0.35)"/>
    <rect x="110" y="180" width="260" height="42" fill="hsl(25 95% 53% / 0.3)"/>
    <rect x="160" y="130" width="160" height="42" fill="hsl(217 91% 60% / 0.3)"/>
    <rect x="205" y="80" width="70" height="42" fill="hsl(263 70% 60% / 0.3)"/>
  </g>
  <g fill="currentColor" text-anchor="middle">
    <text x="240" y="256">Producteurs : 10 000</text>
    <text x="240" y="206">Consommateurs I : 1 000</text>
    <text x="240" y="156">Consommateurs II : 100</text>
    <text x="240" y="106">C III : 10</text>
  </g>
  <g fill="currentColor" font-size="11">
    <text x="440" y="256">× 10 % →</text>
    <text x="440" y="206">× 10 % →</text>
    <text x="440" y="156">× 10 % →</text>
    <text x="30" y="30">Pyramide des productions (ou des énergies) : kJ/m²/an (exemple)</text>
    <text x="30" y="290">Rendement écologique ≈ 10 % entre deux niveaux (valeur indicative : 5 à 20 %).</text>
  </g>
</svg>`

const svgFlux = `<svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <defs>
    <marker id="arrFlux" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
    </marker>
    <marker id="arrHeat" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(0 84% 60%)"/>
    </marker>
  </defs>
  <circle cx="50" cy="110" r="30" fill="hsl(25 95% 53% / 0.5)" stroke="currentColor"/>
  <text x="50" y="114" text-anchor="middle" fill="currentColor">Soleil</text>
  <g stroke="currentColor" stroke-width="1.2">
    <rect x="130" y="90" width="110" height="40" fill="hsl(142 71% 45% / 0.35)"/>
    <rect x="290" y="90" width="110" height="40" fill="hsl(25 95% 53% / 0.3)"/>
    <rect x="450" y="90" width="130" height="40" fill="hsl(0 0% 50% / 0.25)"/>
    <rect x="130" y="220" width="450" height="40" fill="hsl(217 91% 60% / 0.2)"/>
  </g>
  <g fill="currentColor" text-anchor="middle">
    <text x="185" y="114">Producteurs</text>
    <text x="345" y="114">Consommateurs</text>
    <text x="515" y="114">Décomposeurs</text>
    <text x="355" y="244">Matière minérale : CO₂, eau, sels minéraux (N, P…)</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arrFlux)">
    <line x1="82" y1="110" x2="126" y2="110"/>
    <line x1="242" y1="110" x2="286" y2="110"/>
    <line x1="402" y1="110" x2="446" y2="110"/>
    <line x1="515" y1="132" x2="515" y2="216"/>
    <line x1="185" y1="216" x2="185" y2="134"/>
  </g>
  <g stroke="hsl(0 84% 60%)" stroke-width="1.5" fill="none" marker-end="url(#arrHeat)">
    <line x1="185" y1="88" x2="185" y2="40"/>
    <line x1="345" y1="88" x2="345" y2="40"/>
    <line x1="515" y1="88" x2="515" y2="40"/>
  </g>
  <text x="345" y="30" text-anchor="middle" fill="hsl(0 84% 60%)" font-size="11">Chaleur dissipée (respiration) : l’énergie n’est pas recyclée</text>
  <text x="530" y="180" fill="currentColor" font-size="11" text-anchor="end">Minéralisation</text>
  <text x="140" y="180" fill="currentColor" font-size="11" text-anchor="start">Photosynthèse</text>
  <text x="320" y="282" text-anchor="middle" fill="currentColor" font-size="11">La matière circule en boucle ; l’énergie est à sens unique.</text>
</svg>`

const chapter: Chapter = {
  id: 'ecosystemes',
  subject: 'svt',
  order: 9,
  title: 'Écosystèmes : fonctionnement, services et gestion durable',
  theme: 'Enjeux planétaires contemporains',
  summary:
    'Fonctionnement d’un écosystème (interactions, réseaux trophiques, flux d’énergie), sa dynamique et sa résilience, les services écosystémiques et l’impact des activités humaines, vers une gestion durable.',
  duration: '3 semaines',
  objectives: [
    'Définir un écosystème et ses composantes (biotope, biocénose) ; identifier facteurs biotiques et abiotiques.',
    'Caractériser les relations interspécifiques (prédation, compétition, parasitisme, mutualisme…).',
    'Exploiter un réseau trophique et analyser des flux de matière et d’énergie (rendement, pyramides).',
    'Expliquer la dynamique d’un écosystème (fluctuations, succession, perturbations, résilience).',
    'Définir et illustrer les services écosystémiques ; analyser l’impact des activités humaines et des stratégies de gestion durable.',
  ],
  keywords: [
    'écosystème',
    'biotope',
    'biocénose',
    'réseau trophique',
    'producteur',
    'décomposeur',
    'rendement écologique',
    'résilience',
    'espèce clé de voûte',
    'services écosystémiques',
    'biodiversité',
    'gestion durable',
  ],
  fiche: [
    { type: 'h2', text: 'Qu’est-ce qu’un écosystème ?' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Écosystème',
      content: [
        {
          type: 'p',
          text: 'Ensemble formé par un **milieu physico-chimique** (**biotope** : facteurs abiotiques – lumière, température, eau, sol, pH…) et par la communauté des êtres vivants qui l’occupent (**biocénose** : producteurs, consommateurs, décomposeurs), reliés par des **interactions** (relations biotiques) et des **flux de matière et d’énergie**.',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Interaction', 'Effets (A / B)', 'Exemple'],
      rows: [
        ['Prédation', '+ / −', 'Renard / lapin'],
        ['Parasitisme', '+ / −', 'Tique / mammifère'],
        ['Compétition', '− / −', 'Deux mésanges pour les mêmes insectes'],
        ['Mutualisme', '+ / +', 'Abeille / fleur, mycorhizes, lichens'],
        ['Commensalisme', '+ / 0', 'Rémora / requin'],
      ],
    },
    { type: 'h3', text: 'Flux de matière et d’énergie' },
    {
      type: 'list',
      items: [
        '**Producteurs** (autotrophes : photosynthèse) → **consommateurs** (primaires, secondaires, tertiaires) → **décomposeurs** (recyclent la matière morte).',
        '**Rendement écologique** (≈ 10 % en moyenne) : le reste est perdu (respiration, excréments, parties non consommées). D’où des chaînes courtes (3 à 5 niveaux).',
        'La **matière** circule en boucle (cycles biogéochimiques) ; l’**énergie** est à sens unique (Soleil → chaleur).',
      ],
    },
    { type: 'h3', text: 'Dynamique, résilience et services' },
    {
      type: 'list',
      items: [
        'Un écosystème **fluctue** autour d’un équilibre dynamique ; une **perturbation** (feu, tempête, activité humaine) peut le modifier. Il est **résistant** s’il change peu, **résilient** s’il retrouve son état.',
        '**Espèce clé de voûte** : effet sur l’écosystème sans rapport avec son abondance (loutre de mer, loup, étoile de mer *Pisaster*).',
        '**Services écosystémiques** : bénéfices tirés des écosystèmes (approvisionnement, régulation, culturels, support).',
        '**Pressions humaines** (IPBES 2019) : changements d’usage des terres et des mers, exploitation directe, changement climatique, pollution, espèces exotiques envahissantes.',
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Gestion durable',
      content: [
        {
          type: 'p',
          text: 'Exploiter une ressource **sans dépasser sa capacité de renouvellement** (ex. quotas de pêche sous le rendement maximal durable), préserver la **biodiversité** et les habitats (aires protégées, corridors écologiques), adapter les pratiques agricoles et forestières, restaurer les milieux dégradés.',
        },
      ],
    },
  ],
  cours: [
    { type: 'h2', text: '1. L’écosystème : une unité fonctionnelle' },
    {
      type: 'p',
      text: 'Le terme **écosystème** (Tansley, 1935) désigne un système dynamique composé d’une **communauté d’êtres vivants** (la **biocénose**) et du **milieu** qu’elle occupe (le **biotope**). Les échelles sont variables : une mare, une prairie, une forêt, un récif corallien, ou même un océan. Les limites sont souvent floues, et les écosystèmes sont ouverts (échanges d’énergie, de matière et d’êtres vivants avec l’extérieur).',
    },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Biotope — facteurs abiotiques', text: 'Lumière, température, humidité, disponibilité en eau, nature du sol, pH, salinité, concentration en dioxygène, éléments minéraux (N, P)…', icon: 'Sun' },
        { title: 'Biocénose — facteurs biotiques', text: 'Ensemble des êtres vivants (animaux, végétaux, champignons, microorganismes) et de leurs relations : alimentation, compétition, coopération, parasitisme…', icon: 'Bug' },
      ],
    },
    {
      type: 'p',
      text: 'Les facteurs abiotiques déterminent quelles espèces peuvent s’installer (**gamme de tolérance**, optimum) ; les espèces, en retour, modifient le milieu (un arbre crée de l’ombre et enrichit le sol en humus). Le fonctionnement résulte donc de ces deux types d’influences.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Habitat et niche écologique',
      content: [
        {
          type: 'p',
          text: 'L’**habitat** est le lieu de vie d’une espèce. La **niche écologique** est l’ensemble des conditions (ressources, milieu) et du rôle fonctionnel de l’espèce dans l’écosystème. Deux espèces ayant une niche très proche entrent en compétition.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Vocabulaire',
      content: [
        {
          type: 'p',
          text: 'Biotope + biocénose = écosystème. L’écosystème n’est pas seulement « les êtres vivants » : il comprend le milieu **et** les interactions. Ne pas confondre non plus **population** (une seule espèce) et **communauté** (plusieurs espèces) ; la biocénose est une communauté.',
        },
      ],
    },

    { type: 'h2', text: '2. Les interactions entre êtres vivants' },
    {
      type: 'table',
      headers: ['Interaction', 'Définition', 'Effet sur A / B', 'Exemple'],
      rows: [
        ['Prédation', 'Un prédateur tue et consomme sa proie', '+ / −', 'Lynx / lièvre variable ; coccinelle / pucerons'],
        ['Herbivorie', 'Consommation de végétaux par un animal', '+ / −', 'Chevreuil / jeunes pousses'],
        ['Parasitisme', 'Un parasite vit aux dépens d’un hôte sans le tuer immédiatement', '+ / −', 'Tique, ténia, gui sur le chêne'],
        ['Compétition', 'Plusieurs individus ou espèces se disputent la même ressource limitée', '− / −', 'Mésange bleue / charbonnière ; arbres pour la lumière'],
        ['Mutualisme (symbiose)', 'Association à bénéfice réciproque', '+ / +', 'Pollinisation, mycorhizes (champignon + racine), lichen (algue + champignon), bactéries fixatrices d’azote'],
        ['Commensalisme', 'Un partenaire profite sans nuire ni aider', '+ / 0', 'Rémora sur un requin, oiseaux nichant dans un arbre'],
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Les mycorhizes',
      content: [
        {
          type: 'p',
          text: 'Le champignon étend ses filaments et fournit à l’arbre de l’eau et des sels minéraux (phosphore, azote) ; l’arbre lui fournit des sucres issus de la photosynthèse. C’est un mutualisme majeur : la majorité des plantes terrestres en possèdent.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Les interactions dépendent du contexte',
      content: [
        {
          type: 'p',
          text: 'Un même couple d’espèces peut être en mutualisme dans certaines conditions et en parasitisme dans d’autres. La nature d’une interaction se détermine par ses **effets sur la survie et la reproduction** de chaque espèce, mesurés expérimentalement (présence/absence).',
        },
      ],
    },

    { type: 'h2', text: '3. Les réseaux trophiques' },
    {
      type: 'p',
      text: 'Une **chaîne alimentaire** est une suite linéaire d’êtres vivants dont chacun mange le précédent. En réalité, une espèce consomme et est consommée par plusieurs autres : on parle de **réseau trophique**. Les êtres vivants se répartissent en **niveaux trophiques** :',
    },
    {
      type: 'table',
      headers: ['Niveau', 'Rôle', 'Exemples'],
      rows: [
        ['Producteurs', 'Autotrophes : produisent leur matière organique à partir de matière minérale et d’énergie lumineuse (photosynthèse)', 'Plantes, algues, cyanobactéries'],
        ['Consommateurs primaires', 'Herbivores', 'Criquet, lapin'],
        ['Consommateurs secondaires, tertiaires', 'Carnivores (ou omnivores)', 'Renard, buse, mésange'],
        ['Décomposeurs et détritivores', 'Dégradent la matière organique morte et libèrent des sels minéraux, CO₂ (minéralisation)', 'Bactéries, champignons, vers de terre, cloportes'],
      ],
    },
    { type: 'svg', svg: svgReseau, caption: 'Exemple de réseau trophique terrestre (les flèches indiquent « est mangé par »).', maxWidth: 680 },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Sens des flèches',
      content: [
        {
          type: 'p',
          text: 'Dans un réseau trophique, la flèche va de **la proie vers le prédateur** (« est mangé par » ou « fournit de la matière et de l’énergie à »). Une espèce peut occuper plusieurs niveaux (un omnivore).',
        },
      ],
    },
    { type: 'widget', id: 'food-web', title: 'Réseau trophique interactif', caption: 'Retirez une espèce et observez les effets en cascade sur les autres populations.' },

    { type: 'h2', text: '4. Flux de matière et d’énergie' },
    {
      type: 'p',
      text: 'L’énergie entre dans l’écosystème sous forme d’**énergie lumineuse**, convertie par les producteurs en énergie chimique (matière organique). Elle est ensuite transférée de niveau en niveau, mais à chaque étape une grande partie est **dissipée sous forme de chaleur** (respiration) ou perdue (excréments, parties non consommées, morts non consommées qui vont aux décomposeurs). La **matière** (C, N, P…), elle, **est recyclée** par les décomposeurs.',
    },
    { type: 'svg', svg: svgFlux, caption: 'Flux de matière (cycle) et d’énergie (à sens unique) dans un écosystème.', maxWidth: 680 },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Productivité',
      content: [
        {
          type: 'p',
          text: 'La **production primaire brute** (PPB) est la matière organique produite par photosynthèse ; la **production primaire nette** (PPN) vaut PPB moins la respiration des producteurs. La production s’exprime en g de matière sèche (ou en kJ) par m² et par an. Elle varie beaucoup : très élevée en forêt tropicale humide et en estuaire, faible en désert ou en océan ouvert.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Rendement écologique',
      content: [
        { type: 'math', tex: 'R=\\dfrac{\\text{production du niveau } n}{\\text{production du niveau } n-1}\\times 100' },
        {
          type: 'p',
          text: 'En moyenne R ≈ **10 %** (de 5 à 20 % selon les cas). Il est plus faible pour les consommateurs à sang chaud (qui dépensent beaucoup d’énergie pour maintenir leur température) et plus élevé pour les consommateurs ectothermes. Conséquence : peu de niveaux trophiques (3 à 5) et très peu de biomasse de grands prédateurs.',
        },
      ],
    },
    { type: 'svg', svg: svgPyramide, caption: 'Pyramide des productions avec un rendement de 10 % à chaque niveau.', maxWidth: 560 },
    {
      type: 'p',
      text: 'Les pyramides peuvent représenter la **biomasse** (masse de matière vivante), les **nombres** d’individus ou les **énergies/productions**. Seule la pyramide des productions (énergies) est toujours de forme « pyramidale » ; celles des biomasses ou des nombres peuvent être inversées (en milieu marin, la biomasse de phytoplancton, à renouvellement très rapide, peut être inférieure à celle du zooplancton à un instant donné).',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Conséquence alimentaire',
      content: [
        {
          type: 'p',
          text: 'Pour une même surface cultivée, un régime riche en produits animaux mobilise bien plus de ressources qu’un régime végétal : le passage par un niveau trophique supplémentaire fait perdre ≈ 90 % de l’énergie. Ce raisonnement fait partie des arguments dans le débat sur l’alimentation durable.',
        },
      ],
    },

    { type: 'h2', text: '5. Dynamique des écosystèmes' },
    { type: 'h3', text: 'Fluctuations et équilibres dynamiques' },
    {
      type: 'p',
      text: 'Les effectifs des populations fluctuent au cours du temps (saisons, ressources, prédation). Un exemple classique est celui du **lynx du Canada et du lièvre d’Amérique** : les effectifs varient de façon cyclique (≈ 10 ans), les pics de lièvres précédant ceux de lynx. L’écosystème est **stable en moyenne** mais jamais figé : on parle d’**équilibre dynamique**.',
    },
    { type: 'h3', text: 'Perturbations, résistance et résilience' },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Perturbation', text: 'Événement qui modifie l’écosystème : feu, tempête, sécheresse, crue, pollution, défrichement, introduction d’espèce…', icon: 'Flame' },
        { title: 'Résistance', text: 'Capacité à **ne pas être modifié** par une perturbation.', icon: 'Shield' },
        { title: 'Résilience', text: 'Capacité à **retrouver un état proche de l’état initial** après une perturbation.', icon: 'RotateCcw' },
      ],
    },
    {
      type: 'p',
      text: 'Après une perturbation intense (incendie, retrait d’un glacier, abandon d’un champ), le milieu est colonisé par des espèces **pionnières**, puis remplacé par des communautés plus complexes : c’est la **succession écologique**, qui peut aboutir en quelques décennies ou siècles à une communauté mature, plus stable (par exemple la forêt). Au-delà d’un certain **seuil**, la perturbation peut conduire à un **nouvel état stable**, différent de l’état initial (par exemple lac eutrophisé qui ne retrouve pas son état clair).',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Biodiversité et stabilité',
      content: [
        {
          type: 'p',
          text: 'Les écosystèmes à forte biodiversité sont généralement plus **productifs** et plus **stables** (résilients) : plusieurs espèces remplissent des rôles proches (redondance fonctionnelle), si l’une disparaît d’autres la remplacent. Des expériences en prairies (Tilman) ont montré que les parcelles les plus riches en espèces sont plus productives et résistent mieux à la sécheresse.',
        },
      ],
    },
    { type: 'h3', text: 'Espèces clés de voûte et cascades trophiques' },
    {
      type: 'p',
      text: 'Certaines espèces ont un effet disproportionné sur leur écosystème par rapport à leur abondance : les **espèces clés de voûte**. Leur disparition provoque des **effets en cascade** :',
    },
    {
      type: 'list',
      items: [
        '**Étoile de mer Pisaster** (Paine, 1966) : en la retirant de zones rocheuses côtières du Pacifique, les moules deviennent dominantes et la diversité chute fortement.',
        '**Loutre de mer** (Aléoutiennes) : en la chassant, les oursins prolifèrent et détruisent les forêts de kelp, qui abritent de nombreuses espèces.',
        '**Loup** (parc de Yellowstone) : disparu vers 1926, réintroduit en 1995 ; les populations de wapitis ont diminué et changé de comportement, ce qui a favorisé la repousse de certains arbres (saules, peupliers) le long des cours d’eau. L’ampleur de la cascade fait l’objet de discussions : d’autres facteurs (climat, grizzlis, chasse) interviennent aussi.',
      ],
    },

    { type: 'h2', text: '6. Les services écosystémiques' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Services écosystémiques',
      content: [
        {
          type: 'p',
          text: 'Bénéfices que les êtres humains retirent du fonctionnement des écosystèmes (Évaluation des écosystèmes pour le millénaire, ONU, 2005).',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Catégorie', 'Exemples'],
      rows: [
        ['Approvisionnement', 'Nourriture (cultures, élevage, pêche), eau douce, bois, fibres, plantes médicinales, ressources génétiques'],
        ['Régulation', 'Pollinisation, régulation du climat (stockage du carbone par forêts, océans, sols), épuration de l’eau, protection contre l’érosion et les crues, lutte biologique contre ravageurs'],
        ['Culturels', 'Loisirs, tourisme, valeurs esthétiques, spirituelles, éducatives'],
        ['Soutien (support)', 'Formation des sols, cycles des éléments nutritifs, production primaire : processus qui rendent possibles les autres services'],
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'La pollinisation',
      content: [
        {
          type: 'p',
          text: 'Environ 75 % des principales espèces cultivées (en nombre d’espèces) dépendent au moins en partie des animaux pollinisateurs (abeilles, bourdons, syrphes, papillons…), ce qui représente environ un tiers du volume de la production alimentaire végétale. Le déclin des insectes pollinisateurs (pesticides, perte d’habitats, parasites, changement climatique) menace donc un service essentiel, que l’on évalue en dizaines de milliards d’euros par an à l’échelle mondiale.',
        },
      ],
    },
    {
      type: 'p',
      text: 'On tente d’évaluer économiquement ces services (en 1997, des chercheurs ont estimé leur valeur à l’échelle de la planète à plusieurs dizaines de milliers de milliards de dollars par an : un ordre de grandeur très discuté mais qui montre leur importance). Ces services sont souvent **gratuits et invisibles** donc peu pris en compte dans les décisions.',
    },

    { type: 'h2', text: '7. L’impact des activités humaines' },
    {
      type: 'p',
      text: 'Depuis le XIXe siècle, les activités humaines modifient profondément les écosystèmes. L’IPBES (2019) estime qu’environ **un million d’espèces** animales et végétales sont menacées d’extinction et que **≈ 75 %** de la surface terrestre est significativement altérée. Le rythme actuel d’extinction est de **dizaines à centaines de fois** supérieur au rythme moyen des dix derniers millions d’années.',
    },
    {
      type: 'table',
      headers: ['Pression (IPBES)', 'Exemples', 'Conséquences'],
      rows: [
        ['Changements d’usage des terres et des mers', 'Déforestation, urbanisation, agriculture intensive, drainage des zones humides', 'Destruction et fragmentation des habitats, première cause de perte de biodiversité'],
        ['Exploitation directe des organismes', 'Surpêche, chasse, braconnage, prélèvement de bois', 'Effondrement de populations (morue de Terre-Neuve), simplification des réseaux trophiques'],
        ['Changement climatique', 'Réchauffement, acidification des océans, évènements extrêmes', 'Déplacement d’aires de répartition, blanchissement des coraux, décalage des cycles'],
        ['Pollutions', 'Pesticides, engrais (nitrates, phosphates), plastiques, rejets', 'Eutrophisation, contamination des chaînes alimentaires (bioaccumulation), déclin des insectes'],
        ['Espèces exotiques envahissantes', 'Frelon asiatique, renouée du Japon, ragondin, jussie', 'Compétition ou prédation sur espèces locales, perturbation des cycles'],
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'L’eutrophisation',
      content: [
        {
          type: 'p',
          text: 'Des apports excessifs de nitrates et de phosphates (engrais, effluents d’élevage) enrichissent les eaux. Les algues et phytoplancton prolifèrent (« blooms », marées vertes sur les côtes bretonnes) ; en mourant, leur décomposition par les bactéries consomme le dioxygène : milieu **hypoxique** et mortalité des poissons. La résilience du milieu est dépassée.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Bioaccumulation',
      content: [
        {
          type: 'p',
          text: 'Certains polluants persistants (mercure, DDT, PCB) ne sont pas éliminés : ils s’accumulent dans l’organisme et se **concentrent** de plus en plus aux niveaux trophiques supérieurs (bio-amplification), ce qui touche surtout les grands prédateurs (rapaces, thon, humains).',
        },
      ],
    },

    { type: 'h2', text: '8. Vers une gestion durable des écosystèmes' },
    {
      type: 'p',
      text: 'La **gestion durable** vise à répondre aux besoins actuels sans compromettre la capacité des écosystèmes à rendre leurs services aux générations futures. Elle repose sur la connaissance du fonctionnement des écosystèmes et sur des choix collectifs (scientifiques, politiques, économiques, citoyens).',
    },
    {
      type: 'h3',
      text: 'Exemple : gérer une ressource halieutique',
    },
    {
      type: 'p',
      text: 'Un stock de poissons se renouvelle par reproduction et croissance. En modèle **logistique**, avec un taux de croissance r et une capacité d’accueil K (effectif maximal supportable), la production nette de biomasse (le « surplus ») pour un stock N vaut :',
    },
    { type: 'math', tex: 'P(N)=r\\,N\\left(1-\\dfrac{N}{K}\\right)' },
    {
      type: 'p',
      text: 'Elle est **maximale pour N = K/2** et vaut alors **P = rK/4** : c’est le **rendement maximal durable (RMD)**. Prélever plus que la production fait diminuer le stock ; au-delà d’un seuil, le stock peut s’effondrer.',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Production d’un stock halieutique',
      props: { expressions: ['r*x*(1-x/100)'], params: [{ name: 'r', min: 0.1, max: 1, step: 0.05, value: 0.4 }], xMin: 0, xMax: 100, yMin: 0, yMax: 25 },
      caption: 'x = stock (milliers de tonnes), K = 100. Le maximum de production est atteint pour x = 50 (RMD = rK/4).',
    },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Pêche', text: 'Quotas inférieurs au RMD, taille minimale de capture, mailles, périodes de repos biologique, aires marines protégées, lutte contre la pêche illégale.', icon: 'Fish' },
        { title: 'Agriculture', text: 'Agroécologie : haies, rotations, couverts végétaux, agroforesterie, réduction des intrants, lutte biologique, maintien des pollinisateurs.', icon: 'Wheat' },
        { title: 'Forêts', text: 'Gestion durable (coupes inférieures à l’accroissement), diversité des essences, bois mort conservé, certification, reboisement adapté.', icon: 'TreePine' },
        { title: 'Aires protégées et trames', text: 'Parcs, réserves, corridors écologiques (trame verte et bleue) reliant les habitats fragmentés ; restauration écologique de zones humides, cours d’eau.', icon: 'Map' },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Morue de Terre-Neuve',
      content: [
        {
          type: 'p',
          text: 'Surexploitée par des flottes industrielles, la morue de Terre-Neuve s’est effondrée au début des années 1990 ; un moratoire fut instauré en 1992. Malgré l’arrêt de la pêche, le stock ne s’est que partiellement reconstitué des décennies plus tard, illustrant que la résilience peut être faible lorsque des seuils sont franchis.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Méthode : analyser un enjeu de gestion',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Identifier l’écosystème et le service', text: 'Quel service (approvisionnement, régulation…) est concerné ? Quelle espèce ou ressource ?' },
            { title: 'Repérer la pression', text: 'Quelle activité humaine exerce quel effet (surexploitation, pollution, destruction d’habitat) ?' },
            { title: 'Évaluer les conséquences', text: 'Sur les populations, les réseaux trophiques, les services (cascade).' },
            { title: 'Proposer des solutions', text: 'Réglementaires, techniques, de restauration, de changement de pratiques, en pesant les intérêts et les contraintes.' },
          ],
        },
      ],
    },
  ],
  exercices: [
    {
      id: 'ex1-rendement',
      title: 'Rendement trophique',
      difficulty: 1,
      duration: 15,
      tags: ['flux d’énergie', 'calcul'],
      statement: [
        {
          type: 'p',
          text: 'Dans une prairie, la production annuelle de chaque niveau trophique est donnée (en kJ/m²/an) : producteurs 8 000 ; consommateurs primaires 900 ; consommateurs secondaires 90 ; consommateurs tertiaires 9.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer le rendement écologique entre chaque niveau.',
            'Comparer à la valeur moyenne attendue.',
            'Expliquer à quoi sont dus ces pertes d’énergie.',
            'Pourquoi les chaînes alimentaires comptent-elles rarement plus de 5 niveaux ?',
          ],
        },
      ],
      hints: ['R = production niveau n / production niveau n−1 × 100.'],
      solution: [
        { type: 'p', text: '**1.** Producteurs → C1 : 900/8 000 × 100 = **11,25 %**. C1 → C2 : 90/900 × 100 = **10 %**. C2 → C3 : 9/90 × 100 = **10 %**.' },
        { type: 'p', text: '**2.** Les valeurs sont proches de 10 %, valeur moyenne.' },
        { type: 'p', text: '**3.** Une grande partie de l’énergie ingérée est perdue : respiration (dissipée en chaleur), excréments, parties non consommées (os, racines…), organismes morts dégradés par les décomposeurs.' },
        { type: 'p', text: '**4.** Chaque transfert divise l’énergie disponible par ≈ 10 : après quatre ou cinq niveaux, il reste moins de 0,01 % de l’énergie des producteurs, insuffisant pour nourrir un niveau de plus.' },
      ],
    },
    {
      id: 'ex2-reseau',
      title: 'Lire un réseau trophique',
      difficulty: 1,
      duration: 15,
      tags: ['réseau trophique'],
      statement: [
        {
          type: 'p',
          text: 'Dans une prairie : les herbes sont mangées par les criquets et les lapins ; les criquets par les grenouilles et les mésanges ; les lapins par les renards et les buses ; les grenouilles et les mésanges par les buses. Les décomposeurs dégradent tous les cadavres.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Citer deux chaînes alimentaires de ce réseau, l’une à 3 niveaux et l’autre à 4.',
            'Quel est le rôle des herbes ? Des décomposeurs ?',
            'Quelle peut être la conséquence d’une disparition des criquets (par un insecticide) sur les grenouilles, mésanges et buses ?',
            'Si les renards disparaissent, quelles conséquences peut-on prévoir ?',
          ],
        },
      ],
      hints: ['Écrire les chaînes avec des flèches de la proie vers le prédateur.'],
      solution: [
        { type: 'p', text: '**1.** À 3 niveaux : herbes → lapin → renard. À 4 niveaux : herbes → criquet → grenouille → buse.' },
        { type: 'p', text: '**2.** Les herbes sont les **producteurs** (photosynthèse). Les décomposeurs minéralisent la matière organique morte et recyclent les éléments minéraux utilisables par les producteurs.' },
        { type: 'p', text: '**3.** Les grenouilles et mésanges perdent leur source de nourriture : leurs effectifs diminuent, puis ceux des buses, qui compensent en partie en mangeant davantage de lapins. Les lapins (consommés davantage) diminuent ensuite.' },
        { type: 'p', text: '**4.** Moins de prédation sur les lapins : leurs effectifs augmentent, donc la consommation d’herbes s’accroît et la végétation peut diminuer. Les buses peuvent aussi bénéficier d’une compétition réduite.' },
      ],
    },
    {
      id: 'ex3-interactions',
      title: 'Classer des interactions',
      difficulty: 1,
      duration: 15,
      tags: ['interactions'],
      statement: [
        {
          type: 'p',
          text: 'Pour chaque situation, nommer la relation (prédation, parasitisme, compétition, mutualisme, commensalisme) et indiquer les effets (+, −, 0) pour chaque espèce.',
        },
        {
          type: 'list',
          items: [
            'A. Le gui pousse sur un chêne et lui prélève de la sève.',
            'B. Un rémora s’accroche à un requin et se nourrit de restes de ses repas, sans l’affecter.',
            'C. Les poissons-clowns vivent dans les anémones de mer : ils les protègent de certains prédateurs et les anémones les protègent par leurs tentacules urticants.',
            'D. Deux espèces de mésanges nichant dans les mêmes cavités et se nourrissant des mêmes insectes.',
            'E. Une chouette mange des campagnols.',
            'F. Un champignon s’associe aux racines d’un hêtre et échange eau et sels minéraux contre des sucres.',
          ],
        },
      ],
      hints: ['Se demander si chaque partenaire gagne, perd ou n’est pas affecté.'],
      solution: [
        { type: 'p', text: '**A.** Parasitisme (gui + / chêne −). **B.** Commensalisme (rémora + / requin 0). **C.** Mutualisme (+ / +). **D.** Compétition (− / −). **E.** Prédation (chouette + / campagnol −). **F.** Mutualisme, mycorhize (+ / +).' },
      ],
    },
    {
      id: 'ex4-loup',
      title: 'Les loups de Yellowstone',
      difficulty: 2,
      duration: 25,
      tags: ['cascade trophique', 'esprit critique'],
      statement: [
        {
          type: 'p',
          text: 'Les loups ont disparu du parc de Yellowstone vers 1926 et ont été réintroduits en 1995. Données arrondies, à titre d’illustration : effectifs de wapitis du troupeau du nord du parc : 1995 : environ 17 000 ; 2005 : environ 9 000 ; 2015 : environ 5 500. Sur la même période, on a observé une repousse de saules et de peupliers le long de certains cours d’eau, et un retour des castors dans certains secteurs.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la variation relative des effectifs de wapitis entre 1995 et 2015.',
            'Proposer une explication reliant les loups, les wapitis, la végétation et les castors.',
            'Pourquoi parle-t-on d’espèce clé de voûte ?',
            'Quels autres facteurs pourraient expliquer la diminution des wapitis ? Quelle conclusion prudente peut-on tirer ?',
          ],
        },
      ],
      hints: ['Variation relative = (valeur finale − valeur initiale)/valeur initiale.', 'Une corrélation n’est pas forcément une causalité.'],
      solution: [
        { type: 'p', text: '**1.** (5 500 − 17 000)/17 000 ≈ −0,68, soit une **baisse d’environ 68 %**.' },
        { type: 'p', text: '**2.** Le loup, prédateur du wapiti, a réduit ses effectifs et changé son comportement (il évite les zones à risque, le long des cours d’eau). La pression de broutage a diminué : saules et peupliers repoussent, ce qui fournit nourriture et matériaux aux castors, dont les barrages modifient le cours d’eau et créent des habitats : c’est une **cascade trophique**.' },
        { type: 'p', text: '**3.** Le loup, peu abondant, a un effet sur l’écosystème bien supérieur à sa biomasse : il est espèce clé de voûte.' },
        { type: 'p', text: '**4.** La chasse hors du parc, la prédation par les grizzlis et pumas, le climat (sécheresses, hivers) et la disponibilité en nourriture peuvent aussi jouer. Une corrélation temporelle ne prouve pas à elle seule une causalité : il faut comparer à des sites témoins et croiser les études. On peut conclure que le loup a probablement contribué, avec d’autres facteurs, aux changements observés.' },
      ],
    },
    {
      id: 'ex5-peche',
      title: 'Rendement maximal durable',
      difficulty: 2,
      duration: 25,
      tags: ['gestion durable', 'modèle logistique'],
      statement: [
        {
          type: 'p',
          text: 'On modélise un stock de poissons par la production nette P(N) = r N (1 − N/K), avec N en milliers de tonnes (kt), r = 0,4 par an et K = 100 kt.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer P pour N = 20, 50, 80 et 100 kt.',
            'Quelle valeur de N maximise P ? Quel est le rendement maximal durable ?',
            'Un quota fixe de 12 kt/an est imposé. Que se passe-t-il à long terme ? Justifier.',
            'Un quota de 8 kt/an est-il durable ? Quels stocks d’équilibre sont possibles ?',
          ],
        },
      ],
      hints: ['La production est maximale pour N = K/2.', 'Pour un prélèvement C, un équilibre exige P(N) = C.'],
      solution: [
        { type: 'p', text: '**1.** P(20) = 0,4 × 20 × 0,8 = **6,4 kt/an** ; P(50) = 0,4 × 50 × 0,5 = **10 kt/an** ; P(80) = 0,4 × 80 × 0,2 = **6,4 kt/an** ; P(100) = **0**.' },
        { type: 'p', text: '**2.** P est maximale pour N = K/2 = 50 kt : RMD = rK/4 = 0,4 × 100/4 = **10 kt/an**.' },
        { type: 'p', text: '**3.** 12 kt/an dépasse la production maximale possible (10 kt/an) : quel que soit le stock, on prélève plus que le renouvellement, donc le stock diminue jusqu’à s’effondrer. Le quota n’est pas durable.' },
        { type: 'p', text: '**4.** On résout 0,4 N (1 − N/100) = 8, soit N² − 100 N + 2 000 = 0 : Δ = 10 000 − 8 000 = 2 000, N = (100 ± 44,7)/2 ≈ 27,6 kt ou 72,4 kt. Le quota de 8 kt/an est donc durable avec un stock d’équilibre d’environ 72 kt (stable) ; l’équilibre à 28 kt est instable (si le stock passe sous cette valeur, il s’effondre). Prélever moins que le RMD en maintenant un stock plus élevé est plus sûr.' },
      ],
    },
    {
      id: 'ex6-service',
      title: 'Valeur d’un service : la pollinisation',
      difficulty: 2,
      duration: 20,
      tags: ['services écosystémiques', 'calcul'],
      statement: [
        {
          type: 'p',
          text: 'Dans un verger de pommiers, on isole des branches avec des filets (sans insectes) et on laisse d’autres branches en libre accès. Taux de fructification : 30 % avec filet, 80 % en libre accès. Le verger couvre 50 ha et produit 25 t/ha avec pollinisateurs ; le prix moyen est de 600 €/t. On suppose le rendement proportionnel au taux de fructification.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quelle catégorie de service écosystémique est la pollinisation ?',
            'Estimer le rendement sans pollinisateurs, par hectare puis pour le verger.',
            'Calculer la perte de production et sa valeur en euros.',
            'Citer deux causes du déclin des pollinisateurs et une mesure de gestion.',
          ],
        },
      ],
      hints: ['Rendement sans insectes = 25 × 30/80.'],
      solution: [
        { type: 'p', text: '**1.** Service de **régulation** (qui soutient l’approvisionnement en fruits).' },
        { type: 'p', text: '**2.** 25 × 30/80 = 9,4 t/ha (arrondi) ; soit ≈ 469 t pour 50 ha (au lieu de 1 250 t).' },
        { type: 'p', text: '**3.** Perte : 25 − 9,375 = 15,6 t/ha ; × 50 = 781 t ; × 600 € = ≈ **469 000 €** par an.' },
        { type: 'p', text: '**4.** Causes : pesticides, perte d’habitats et de fleurs sauvages, parasites (varroa), changement climatique. Mesures : haies et bandes fleuries, réduction des pesticides, ruches, maintien d’habitats favorables.' },
      ],
    },
    {
      id: 'ex7-resilience',
      title: 'Résilience après un incendie',
      difficulty: 2,
      duration: 25,
      tags: ['résilience', 'succession'],
      statement: [
        {
          type: 'p',
          text: 'Données simplifiées (illustratives) sur une forêt méditerranéenne après un incendie.',
        },
        {
          type: 'table',
          headers: ['Temps après le feu (années)', '1', '5', '20', '50', '100'],
          rows: [
            ['Couvert végétal (%)', '25', '60', '90', '100', '100'],
            ['Espèces végétales (nombre)', '12', '28', '40', '35', '30'],
            ['Ligneux dominants', 'Aucun', 'Cistes, bruyères', 'Arbustes (chênes kermès)', 'Chênes verts, pins', 'Chênes verts'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Décrire l’évolution du couvert végétal et de la diversité.',
            'Définir « succession écologique » et en donner les étapes ici.',
            'Peut-on parler de résilience ? Justifier avec les données.',
            'Si les incendies deviennent plus fréquents (tous les 10 ans), que prévoir pour cet écosystème ?',
          ],
        },
      ],
      hints: ['La résilience est le retour à un état proche de l’état initial.'],
      solution: [
        { type: 'p', text: '**1.** Le couvert passe de 25 % à 100 % en 50 ans. Le nombre d’espèces augmente jusqu’à un maximum à 20 ans (40) puis diminue légèrement (30 à 100 ans) car quelques espèces dominantes éliminent les espèces pionnières (compétition pour la lumière).' },
        { type: 'p', text: '**2.** La succession est le remplacement progressif de communautés après une perturbation. Ici : espèces pionnières (cistes, bruyères), puis arbustes, puis forêt de chênes verts et pins.' },
        { type: 'p', text: '**3.** Oui : le couvert végétal (100 %) et la forêt de chênes sont retrouvés en 50 à 100 ans, l’écosystème est résilient à un incendie unique. La durée de retour (décennies à siècle) mesure cette résilience.' },
        { type: 'p', text: '**4.** Des incendies tous les 10 ans empêchent le retour des chênes (qui mettent plusieurs décennies à se développer) : la végétation resterait au stade de garrigue à espèces pionnières, voire se dégraderait (érosion des sols). Un seuil de fréquence peut faire basculer l’écosystème vers un autre état.' },
      ],
    },
    {
      id: 'ex8-bac-eutrophisation',
      title: 'Type bac : un étang eutrophisé',
      difficulty: 3,
      duration: 40,
      tags: ['bac', 'pression humaine', 'gestion'],
      statement: [
        {
          type: 'p',
          text: '**Document 1.** Concentration moyenne en nitrates de l’eau d’un étang et recouvrement de la surface par les algues : 1970 : 5 mg/L, 5 % ; 1990 : 25 mg/L, 40 % ; 2010 : 45 mg/L, 90 %. **Document 2.** Concentration en dioxygène au fond : 1970 : 8 mg/L ; 1990 : 4 mg/L ; 2010 : 0,5 mg/L. Disparition des carpes et tanches, apparition de mortalités massives de poissons en été. **Document 3.** Le bassin versant est occupé à 70 % par des cultures fertilisées et un élevage porcin intensif. Des mesures prises en 2012 : bandes enherbées le long des ruisseaux, zones humides tampons, réduction de 30 % des apports d’azote.',
        },
        {
          type: 'p',
          text: 'Question : à l’aide des documents et de vos connaissances, expliquer l’évolution de l’étang et discuter les mesures de gestion envisagées.',
        },
      ],
      hints: ['Chaîne de causes : engrais → nitrates → algues → décomposition → dioxygène.', 'Pensez à la résilience et aux services perdus.'],
      solution: [
        { type: 'p', text: '**Constat.** Entre 1970 et 2010, nitrates et recouvrement algal augmentent (5 → 45 mg/L ; 5 → 90 %), tandis que le dioxygène au fond chute de 8 à 0,5 mg/L (doc. 1 et 2). Les poissons disparaissent.' },
        { type: 'p', text: '**Explication.** Les cultures fertilisées et l’élevage (doc. 3) apportent des nitrates (et des phosphates) par lessivage et ruissellement : le milieu est eutrophisé. Les algues prolifèrent en surface, limitent la lumière pour les plantes immergées. À leur mort, les algues sont décomposées par des bactéries qui consomment le dioxygène : le fond devient hypoxique, d’où la mort des poissons, notamment l’été (eau chaude contenant moins de dioxygène).' },
        { type: 'p', text: '**Conséquences écosystémiques.** Simplification du réseau trophique, perte de biodiversité, perte de services (pêche, loisirs, qualité de l’eau).' },
        { type: 'p', text: '**Mesures (doc. 3).** Réduire les apports d’azote à la source (−30 %) est l’action la plus efficace ; bandes enherbées et zones humides tampons interceptent et épurent une partie des nitrates (service de régulation) ; ces mesures s’inscrivent dans une gestion durable.' },
        { type: 'p', text: '**Discussion.** Les effets ne seront pas immédiats (stock de nutriments dans les sédiments, bassin versant lent à réagir, éventuel seuil d’irréversibilité) ; −30 % peut être insuffisant. Il faut aussi tenir compte des contraintes économiques des agriculteurs, d’où la nécessité d’un suivi, d’aides et de concertation.' },
      ],
    },
  ],
  representations: [
    { type: 'widget', id: 'food-web', title: 'Réseau trophique : retirer une espèce', caption: 'Testez l’effet en cascade de la disparition d’un maillon.' },
    { type: 'svg', svg: svgReseau, caption: 'Un réseau trophique de prairie.', maxWidth: 680 },
    { type: 'svg', svg: svgFlux, caption: 'Matière en cycle, énergie à sens unique.', maxWidth: 680 },
    { type: 'svg', svg: svgPyramide, caption: 'Pyramide des productions.', maxWidth: 560 },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Rendement maximal durable',
      props: { expressions: ['r*x*(1-x/100)'], params: [{ name: 'r', min: 0.1, max: 1, step: 0.05, value: 0.4 }], xMin: 0, xMax: 100, yMin: 0, yMax: 25 },
      caption: 'Faites varier r : le maximum de production est toujours à K/2 et vaut rK/4.',
    },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Un écosystème est formé…',
          choices: [
            'Uniquement des êtres vivants',
            'D’un biotope et d’une biocénose en interaction',
            'D’une espèce et de ses prédateurs',
            'Des seuls facteurs abiotiques',
          ],
          answer: 1,
          explanation: 'Biotope + biocénose + interactions et flux.',
        },
        {
          question: 'Le mutualisme est une interaction…',
          choices: ['+/−', '−/−', '+/+', '+/0'],
          answer: 2,
          explanation: 'Les deux partenaires en tirent bénéfice (ex. mycorhizes).',
        },
        {
          question: 'Dans un réseau trophique, la flèche va…',
          choices: ['Du prédateur vers la proie', 'De la proie vers le prédateur', 'Du décomposeur vers le producteur uniquement', 'De haut en bas'],
          answer: 1,
          explanation: 'Elle indique « est mangé par » et le sens du flux de matière et d’énergie.',
        },
        {
          question: 'Le rendement écologique moyen entre deux niveaux trophiques est d’environ…',
          choices: ['1 %', '10 %', '50 %', '90 %'],
          answer: 1,
          explanation: 'Environ 10 % (5 à 20 % selon les cas).',
        },
        {
          question: 'Les décomposeurs…',
          choices: [
            'Produisent de la matière organique par photosynthèse',
            'Minéralisent la matière organique morte',
            'Sont uniquement des prédateurs',
            'N’existent pas en milieu aquatique',
          ],
          answer: 1,
          explanation: 'Ils libèrent CO₂ et sels minéraux réutilisables par les producteurs.',
        },
        {
          question: 'La résilience est…',
          choices: [
            'La capacité à ne pas être perturbé',
            'La capacité à retrouver un état proche de l’état initial après une perturbation',
            'Le nombre d’espèces',
            'Le rendement écologique',
          ],
          answer: 1,
          explanation: 'Distincte de la résistance (absence de changement).',
        },
        {
          question: 'Une espèce clé de voûte…',
          choices: [
            'Est toujours la plus abondante',
            'A un effet sur l’écosystème disproportionné par rapport à son abondance',
            'Est un décomposeur',
            'N’existe qu’en milieu marin',
          ],
          answer: 1,
          explanation: 'Ex. loutre de mer, loup, Pisaster.',
        },
        {
          question: 'La pollinisation est un service…',
          choices: ['Culturel', 'De régulation', 'Géologique', 'Sans valeur économique'],
          answer: 1,
          explanation: 'Régulation (soutient l’approvisionnement alimentaire).',
        },
        {
          question: 'Première cause actuelle de perte de biodiversité (IPBES) :',
          choices: [
            'Le changement d’usage des terres et des mers',
            'Les météorites',
            'La photosynthèse',
            'Les volcans',
          ],
          answer: 0,
          explanation: 'Destruction et fragmentation des habitats.',
        },
        {
          question: 'Le rendement maximal durable d’un stock est atteint pour un stock égal à…',
          choices: ['K', 'K/2', 'K/10', '0'],
          answer: 1,
          explanation: 'Dans le modèle logistique, la production est maximale pour N = K/2.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Écosystème', back: 'Biotope (milieu) + biocénose (êtres vivants) en interaction, avec flux de matière et d’énergie.' },
        { front: 'Facteur abiotique / biotique', back: 'Abiotique : physico-chimique (lumière, température, eau…). Biotique : lié aux êtres vivants (compétition, prédation…).' },
        { front: 'Prédation, parasitisme', back: 'Prédation : +/− (tue la proie). Parasitisme : +/− (vit aux dépens de l’hôte sans le tuer immédiatement).' },
        { front: 'Mutualisme', back: '+/+ : bénéfice réciproque (pollinisation, mycorhizes, lichens).' },
        { front: 'Commensalisme', back: '+/0 : un partenaire profite sans effet sur l’autre.' },
        { front: 'Producteur', back: 'Organisme autotrophe (plante, algue) qui fabrique de la matière organique grâce à l’énergie lumineuse.' },
        { front: 'Décomposeur', back: 'Bactéries, champignons… : minéralisent la matière organique morte.' },
        { front: 'Rendement écologique', back: 'Production d’un niveau / production du niveau précédent : ≈ 10 %.' },
        { front: 'Matière vs énergie', back: 'La matière circule en cycle (recyclée) ; l’énergie est à sens unique et finit en chaleur.' },
        { front: 'PPB / PPN', back: 'Production primaire brute / nette (nette = brute − respiration des producteurs).' },
        { front: 'Résistance / résilience', back: 'Résistance : peu de changement. Résilience : retour à l’état initial.' },
        { front: 'Succession écologique', back: 'Remplacement progressif des communautés après perturbation : pionniers → communautés matures.' },
        { front: 'Espèce clé de voûte', back: 'Espèce dont l’effet est disproportionné par rapport à son abondance (loup, loutre, Pisaster).' },
        { front: 'Services écosystémiques', back: 'Approvisionnement, régulation, culturels, soutien.' },
        { front: 'Cinq pressions sur la biodiversité', back: 'Usage des terres et des mers, exploitation directe, changement climatique, pollutions, espèces exotiques envahissantes.' },
        { front: 'RMD', back: 'Rendement maximal durable : production maximale renouvelable d’un stock, atteint pour N = K/2 (rK/4).' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer interaction et exemple',
      pairs: [
        { left: 'Mutualisme', right: 'Mycorhize hêtre-champignon' },
        { left: 'Parasitisme', right: 'Gui sur un chêne' },
        { left: 'Prédation', right: 'Chouette et campagnol' },
        { left: 'Compétition', right: 'Deux mésanges pour la même nourriture' },
        { left: 'Commensalisme', right: 'Rémora et requin' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer service et catégorie',
      pairs: [
        { left: 'Pêche', right: 'Approvisionnement' },
        { left: 'Épuration de l’eau par une zone humide', right: 'Régulation' },
        { left: 'Randonnée en forêt', right: 'Culturel' },
        { left: 'Formation des sols', right: 'Soutien' },
      ],
    },
    {
      type: 'ordering',
      title: 'Chaîne alimentaire (de la production au sommet)',
      items: ['Herbes', 'Criquet', 'Grenouille', 'Buse'],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'Un écosystème comprend un {{biotope}} et une {{biocénose}}. Les {{producteurs}} réalisent la photosynthèse, les {{décomposeurs}} minéralisent la matière morte. Le rendement écologique est d’environ {{10 %|10}}. La capacité d’un écosystème à retrouver son état après une perturbation est sa {{résilience}}.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'L’énergie est recyclée dans un écosystème, comme la matière.', answer: false, explanation: 'L’énergie se dissipe en chaleur ; seule la matière est recyclée.' },
        { text: 'Un parasite tue toujours son hôte immédiatement.', answer: false, explanation: 'Il vit à ses dépens, le tuant rarement tout de suite.' },
        { text: 'Les espèces clés de voûte sont les plus abondantes.', answer: false, explanation: 'Leur effet est disproportionné par rapport à leur abondance.' },
        { text: 'Une forte biodiversité favorise en général la stabilité d’un écosystème.', answer: true },
        { text: 'Tout prélèvement de ressource renouvelable est non durable.', answer: false, explanation: 'Il est durable s’il reste inférieur à la capacité de renouvellement (RMD).' },
      ],
    },
    {
      type: 'reveal',
      title: 'Pourquoi y a-t-il peu de grands prédateurs ?',
      content: [
        {
          type: 'p',
          text: 'À chaque niveau trophique, seulement ≈ 10 % de l’énergie est transférée au niveau suivant. Au sommet, il ne reste que très peu d’énergie disponible : les grands prédateurs sont rares, ont de vastes territoires et sont vulnérables à la perte d’habitat ou à la bioaccumulation de polluants.',
        },
      ],
    },
  ],
}

export default chapter
