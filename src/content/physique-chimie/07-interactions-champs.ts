import type { Chapter } from '../types'

const r = String.raw

// ---------------------------------------------------------------------------
// Schémas SVG
// ---------------------------------------------------------------------------

const svgCoulomb = `<svg viewBox="0 0 520 230" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <defs>
    <marker id="pc7-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="hsl(0 84% 60%)"/></marker>
    <marker id="pc7-ab" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="hsl(217 91% 60%)"/></marker>
  </defs>
  <text x="10" y="22" class="svg-fill" font-weight="600">Charges de même signe : répulsion</text>
  <line x1="150" y1="60" x2="370" y2="60" class="svg-muted" stroke="currentColor" stroke-dasharray="4 4" stroke-width="1"/>
  <circle cx="150" cy="60" r="16" fill="none" stroke="hsl(0 84% 60%)" stroke-width="2"/>
  <text x="150" y="65" text-anchor="middle" fill="hsl(0 84% 60%)" font-weight="700">+</text>
  <circle cx="370" cy="60" r="16" fill="none" stroke="hsl(0 84% 60%)" stroke-width="2"/>
  <text x="370" y="65" text-anchor="middle" fill="hsl(0 84% 60%)" font-weight="700">+</text>
  <line x1="134" y1="60" x2="70" y2="60" stroke="hsl(0 84% 60%)" stroke-width="2.5" marker-end="url(#pc7-ar)"/>
  <line x1="386" y1="60" x2="450" y2="60" stroke="hsl(0 84% 60%)" stroke-width="2.5" marker-end="url(#pc7-ar)"/>
  <text x="80" y="48" fill="hsl(0 84% 60%)">F(B/A)</text>
  <text x="400" y="48" fill="hsl(0 84% 60%)">F(A/B)</text>
  <text x="150" y="98" text-anchor="middle" class="svg-fill">A (q_A)</text>
  <text x="370" y="98" text-anchor="middle" class="svg-fill">B (q_B)</text>
  <text x="260" y="80" text-anchor="middle" class="svg-fill">d</text>
  <text x="10" y="135" class="svg-fill" font-weight="600">Charges de signes contraires : attraction</text>
  <line x1="150" y1="175" x2="370" y2="175" class="svg-muted" stroke="currentColor" stroke-dasharray="4 4" stroke-width="1"/>
  <circle cx="150" cy="175" r="16" fill="none" stroke="hsl(0 84% 60%)" stroke-width="2"/>
  <text x="150" y="180" text-anchor="middle" fill="hsl(0 84% 60%)" font-weight="700">+</text>
  <circle cx="370" cy="175" r="16" fill="none" stroke="hsl(217 91% 60%)" stroke-width="2"/>
  <text x="370" y="180" text-anchor="middle" fill="hsl(217 91% 60%)" font-weight="700">−</text>
  <line x1="166" y1="175" x2="230" y2="175" stroke="hsl(217 91% 60%)" stroke-width="2.5" marker-end="url(#pc7-ab)"/>
  <line x1="354" y1="175" x2="290" y2="175" stroke="hsl(217 91% 60%)" stroke-width="2.5" marker-end="url(#pc7-ab)"/>
  <text x="170" y="163" fill="hsl(217 91% 60%)">F(B/A)</text>
  <text x="290" y="163" fill="hsl(217 91% 60%)">F(A/B)</text>
  <text x="150" y="213" text-anchor="middle" class="svg-fill">A (q_A &gt; 0)</text>
  <text x="370" y="213" text-anchor="middle" class="svg-fill">B (q_B &lt; 0)</text>
  <text x="510" y="213" text-anchor="end" class="svg-muted" fill="currentColor" font-size="11">F(A/B) = − F(B/A)</text>
</svg>`

const svgCondensateur = `<svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <defs>
    <marker id="pc7-ce" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(217 91% 60%)"/></marker>
    <marker id="pc7-cf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(25 95% 53%)"/></marker>
  </defs>
  <rect x="90" y="40" width="300" height="10" fill="hsl(0 84% 60%)" opacity="0.85"/>
  <rect x="90" y="200" width="300" height="10" fill="hsl(217 91% 60%)" opacity="0.85"/>
  <text x="400" y="50" fill="hsl(0 84% 60%)" font-weight="700">+ + + + (armature positive)</text>
  <text x="400" y="210" fill="hsl(217 91% 60%)" font-weight="700">− − − −</text>
  <g stroke="hsl(217 91% 60%)" stroke-width="1.5">
    <line x1="120" y1="52" x2="120" y2="196" marker-end="url(#pc7-ce)"/>
    <line x1="170" y1="52" x2="170" y2="196" marker-end="url(#pc7-ce)"/>
    <line x1="220" y1="52" x2="220" y2="196" marker-end="url(#pc7-ce)"/>
    <line x1="270" y1="52" x2="270" y2="196" marker-end="url(#pc7-ce)"/>
    <line x1="320" y1="52" x2="320" y2="196" marker-end="url(#pc7-ce)"/>
    <line x1="360" y1="52" x2="360" y2="196" marker-end="url(#pc7-ce)"/>
  </g>
  <text x="128" y="130" fill="hsl(217 91% 60%)" font-weight="600">E</text>
  <line x1="60" y1="45" x2="60" y2="205" stroke="currentColor" class="svg-stroke" stroke-width="1"/>
  <line x1="54" y1="45" x2="66" y2="45" stroke="currentColor" class="svg-stroke"/>
  <line x1="54" y1="205" x2="66" y2="205" stroke="currentColor" class="svg-stroke"/>
  <text x="40" y="130" class="svg-fill">d</text>
  <circle cx="245" cy="125" r="7" fill="none" stroke="hsl(25 95% 53%)" stroke-width="2"/>
  <text x="245" y="129" text-anchor="middle" fill="hsl(25 95% 53%)" font-size="11" font-weight="700">+</text>
  <line x1="245" y1="133" x2="245" y2="178" stroke="hsl(25 95% 53%)" stroke-width="2.5" marker-end="url(#pc7-cf)"/>
  <text x="253" y="170" fill="hsl(25 95% 53%)">F = qE (q &gt; 0)</text>
  <text x="400" y="130" class="svg-fill">U = V₊ − V₋</text>
  <text x="400" y="150" class="svg-fill">E = U / d</text>
  <text x="90" y="240" class="svg-muted" fill="currentColor" font-size="11">Champ uniforme : lignes parallèles, orientées de l’armature + vers l’armature −</text>
</svg>`

const svgLignes = `<svg viewBox="0 0 540 250" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <defs>
    <marker id="pc7-lr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(0 84% 60%)"/></marker>
    <marker id="pc7-lg" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(142 71% 45%)"/></marker>
  </defs>
  <text x="130" y="20" text-anchor="middle" class="svg-fill" font-weight="600">Charge ponctuelle Q &gt; 0</text>
  <g stroke="hsl(0 84% 60%)" stroke-width="1.5">
    <line x1="152" y1="125" x2="230" y2="125" marker-mid="url(#pc7-lr)"/>
    <line x1="108" y1="125" x2="30" y2="125"/>
    <line x1="130" y1="103" x2="130" y2="35"/>
    <line x1="130" y1="147" x2="130" y2="215"/>
    <line x1="146" y1="109" x2="200" y2="55"/>
    <line x1="114" y1="109" x2="60" y2="55"/>
    <line x1="146" y1="141" x2="200" y2="195"/>
    <line x1="114" y1="141" x2="60" y2="195"/>
  </g>
  <g fill="hsl(0 84% 60%)">
    <path d="M200,120 L212,125 L200,130 z"/><path d="M60,120 L48,125 L60,130 z"/>
    <path d="M125,60 L130,48 L135,60 z"/><path d="M125,190 L130,202 L135,190 z"/>
    <path d="M178,70 L190,65 L185,77 z"/><path d="M82,70 L70,65 L75,77 z"/>
    <path d="M178,180 L190,185 L185,173 z"/><path d="M82,180 L70,185 L75,173 z"/>
  </g>
  <circle cx="130" cy="125" r="16" fill="none" stroke="hsl(0 84% 60%)" stroke-width="2"/>
  <text x="130" y="130" text-anchor="middle" fill="hsl(0 84% 60%)" font-weight="700">+</text>
  <text x="130" y="243" text-anchor="middle" class="svg-muted" fill="currentColor" font-size="11">E radial, sortant (entrant si Q &lt; 0)</text>
  <text x="400" y="20" text-anchor="middle" class="svg-fill" font-weight="600">Astre de masse M</text>
  <g stroke="hsl(142 71% 45%)" stroke-width="1.5">
    <line x1="510" y1="125" x2="436" y2="125"/>
    <line x1="290" y1="125" x2="364" y2="125"/>
    <line x1="400" y1="35" x2="400" y2="89"/>
    <line x1="400" y1="215" x2="400" y2="161"/>
    <line x1="470" y1="55" x2="426" y2="99"/>
    <line x1="330" y1="55" x2="374" y2="99"/>
    <line x1="470" y1="195" x2="426" y2="151"/>
    <line x1="330" y1="195" x2="374" y2="151"/>
  </g>
  <g fill="hsl(142 71% 45%)">
    <path d="M478,120 L466,125 L478,130 z"/><path d="M322,120 L334,125 L322,130 z"/>
    <path d="M395,55 L400,67 L405,55 z"/><path d="M395,195 L400,183 L405,195 z"/>
    <path d="M452,70 L440,78 L446,66 z"/><path d="M348,70 L360,78 L354,66 z"/>
    <path d="M452,180 L440,172 L446,184 z"/><path d="M348,180 L360,172 L354,184 z"/>
  </g>
  <circle cx="400" cy="125" r="36" fill="none" stroke="hsl(142 71% 45%)" stroke-width="2"/>
  <text x="400" y="130" text-anchor="middle" class="svg-fill">M</text>
  <text x="400" y="243" text-anchor="middle" class="svg-muted" fill="currentColor" font-size="11">g radial, toujours dirigé vers le centre de l’astre</text>
</svg>`

const svgAimant = `<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <g fill="none" stroke="hsl(263 70% 60%)" stroke-width="1.4">
    <path d="M330,120 C380,120 380,60 260,60 C140,60 140,120 190,120"/>
    <path d="M330,120 C420,120 420,25 260,25 C100,25 100,120 190,120"/>
    <path d="M330,120 C380,120 380,180 260,180 C140,180 140,120 190,120"/>
    <path d="M330,120 C420,120 420,215 260,215 C100,215 100,120 190,120"/>
    <line x1="330" y1="120" x2="500" y2="120"/>
    <line x1="190" y1="120" x2="20" y2="120"/>
  </g>
  <g fill="hsl(263 70% 60%)">
    <path d="M255,55 L245,60 L255,65 z"/>
    <path d="M255,20 L245,25 L255,30 z"/>
    <path d="M255,175 L245,180 L255,185 z"/>
    <path d="M255,210 L245,215 L255,220 z"/>
    <path d="M460,115 L472,120 L460,125 z"/>
    <path d="M50,115 L62,120 L50,125 z"/>
  </g>
  <rect x="190" y="105" width="70" height="30" fill="hsl(0 84% 60%)" opacity="0.9"/>
  <rect x="260" y="105" width="70" height="30" fill="hsl(217 91% 60%)" opacity="0.9"/>
  <text x="225" y="125" text-anchor="middle" fill="white" font-weight="700">S</text>
  <text x="295" y="125" text-anchor="middle" fill="white" font-weight="700">N</text>
  <g transform="translate(440,60)">
    <circle r="14" fill="none" stroke="currentColor" class="svg-stroke"/>
    <path d="M-10,0 L0,-3 L0,3 z" fill="hsl(0 84% 60%)"/>
    <path d="M10,0 L0,-3 L0,3 z" fill="hsl(217 91% 60%)"/>
  </g>
  <text x="440" y="92" text-anchor="middle" class="svg-muted" fill="currentColor" font-size="11">boussole</text>
  <text x="260" y="236" text-anchor="middle" class="svg-muted" fill="currentColor" font-size="11">À l’extérieur de l’aimant, les lignes de champ sortent par le pôle N et entrent par le pôle S</text>
</svg>`

// ---------------------------------------------------------------------------

const chapter: Chapter = {
  id: 'interactions-champs',
  subject: 'physique-chimie',
  order: 7,
  title: 'Interactions fondamentales et notion de champ',
  theme: 'Mouvement et interactions',
  summary:
    'Loi de Coulomb et loi de la gravitation universelle, analogies, champs électrostatique (condensateur plan), de gravitation et magnétique, lignes de champ.',
  duration: '2 semaines',
  objectives: [
    'Interpréter des expériences mettant en jeu l’interaction électrostatique (électrisation par frottement, contact, influence).',
    'Utiliser la loi de Coulomb, sous forme vectorielle, pour calculer une force électrostatique.',
    'Utiliser l’expression vectorielle de la force de gravitation universelle.',
    'Comparer les forces gravitationnelle et électrostatique et justifier la cohésion de la matière à différentes échelles.',
    'Utiliser les expressions vectorielles du champ électrostatique et du champ de gravitation créés par un objet ponctuel ou sphérique.',
    'Exploiter l’expression du champ électrostatique dans un condensateur plan : $E = \\dfrac{U}{d}$.',
    'Caractériser localement une ligne de champ et représenter des lignes de champ (électrostatique, gravitation, magnétique).',
    'Établir l’analogie entre force de gravitation et force électrostatique, entre poids et champ de pesanteur.',
  ],
  keywords: [
    'loi de Coulomb',
    'charge électrique',
    'gravitation universelle',
    'champ électrostatique',
    'champ de gravitation',
    'condensateur plan',
    'lignes de champ',
    'champ magnétique',
    'électrisation',
  ],

  // =========================================================================
  fiche: [
    { type: 'h2', text: 'Interactions électrostatique et gravitationnelle' },
    {
      type: 'table',
      headers: ['', 'Électrostatique (Coulomb)', 'Gravitation (Newton)'],
      rows: [
        ['Grandeur source', r`charge $q$ en coulomb (C), signe $+$ ou $-$`, r`masse $m$ en kilogramme (kg), toujours $> 0$`],
        ['Valeur de la force', r`$F = k\,\dfrac{|q_A\,q_B|}{d^2}$`, r`$F = G\,\dfrac{m_A\,m_B}{d^2}$`],
        ['Constante', r`$k = 8{,}99\times10^{9}\ \text{N·m}^2\text{·C}^{-2}$`, r`$G = 6{,}67\times10^{-11}\ \text{N·m}^2\text{·kg}^{-2}$`],
        ['Forme vectorielle', r`$\vec F_{A/B} = k\,\dfrac{q_A q_B}{d^2}\,\vec u_{AB}$`, r`$\vec F_{A/B} = -G\,\dfrac{m_A m_B}{d^2}\,\vec u_{AB}$`],
        ['Nature', 'attractive ou répulsive', 'toujours attractive'],
        ['Champ créé', r`$\vec E = k\,\dfrac{Q}{d^2}\,\vec u$ (V·m⁻¹)`, r`$\vec{\mathcal G} = -G\,\dfrac{M}{d^2}\,\vec u$ (N·kg⁻¹)`],
        ['Force subie', r`$\vec F = q\,\vec E$`, r`$\vec F = m\,\vec{\mathcal G}$`],
      ],
      caption: r`$\vec u_{AB}$ : vecteur unitaire dirigé de A vers B ; $d = AB$ en mètre.`,
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Principe des actions réciproques',
      content: [{ type: 'p', text: r`Dans les deux cas $\vec F_{A/B} = -\vec F_{B/A}$ : même droite d’action, même valeur, sens opposés.` }],
    },
    { type: 'h2', text: 'Champs' },
    {
      type: 'list',
      items: [
        r`**Champ électrostatique** : $\vec E = \dfrac{\vec F}{q}$ ; unité V·m⁻¹ (ou N·C⁻¹). Pour $q > 0$, $\vec F$ et $\vec E$ ont le même sens ; pour $q < 0$, sens opposés.`,
        r`**Condensateur plan** : champ **uniforme** entre les armatures, dirigé de l’armature $+$ vers l’armature $-$, de valeur $E = \dfrac{U}{d}$.`,
        r`**Champ de gravitation** de la Terre : $\mathcal G = \dfrac{G M_T}{(R_T + h)^2}$ ; au voisinage du sol, $\vec{\mathcal G} \approx \vec g$ (champ de pesanteur), $g \approx 9{,}81\ \text{N·kg}^{-1}$, et $\vec P = m\vec g$.`,
        r`**Champ magnétique** $\vec B$ (tesla, T) : créé par les aimants, les courants électriques, la Terre ($B \approx 5\times10^{-5}$ T). Une boussole s’oriente selon $\vec B$ (du S vers le N de l’aiguille).`,
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Ligne de champ',
      content: [
        {
          type: 'p',
          text: 'Courbe tangente en chacun de ses points au vecteur champ, orientée dans le sens du champ. Lignes resserrées = champ intense ; lignes parallèles et équidistantes = champ uniforme.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Pièges classiques',
      content: [
        {
          type: 'list',
          items: [
            r`Convertir les distances en **mètres** et les charges en **coulombs** ($1\ \text{nC} = 10^{-9}$ C, $1\ \mu\text{C} = 10^{-6}$ C).`,
            r`$d$ est **au carré** : doubler la distance divise la force par 4.`,
            r`Pour un astre sphérique, $d$ est la distance au **centre** : $d = R + h$.`,
            r`Charge élémentaire : $e = 1{,}60\times10^{-19}$ C ; toute charge vaut $q = n\,e$ avec $n$ entier relatif.`,
          ],
        },
      ],
    },
  ],

  // =========================================================================
  cours: [
    { type: 'h2', text: '1. La charge électrique et l’électrisation' },
    {
      type: 'p',
      text: 'La matière est constituée d’atomes, eux-mêmes formés d’un noyau (protons chargés positivement et neutrons neutres) et d’électrons chargés négativement. Un atome est électriquement neutre : il compte autant de protons que d’électrons.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Charge électrique',
      content: [
        {
          type: 'p',
          text: r`La **charge électrique** $q$ est une grandeur qui caractérise la capacité d’un objet à exercer ou subir une interaction électrique. Elle s’exprime en **coulomb** (C). Elle est **quantifiée** : $q = n\,e$ avec $n \in \mathbb Z$ et $e = 1{,}60\times10^{-19}$ C la charge élémentaire.`,
        },
        {
          type: 'list',
          items: [r`charge d’un proton : $+e$ ;`, r`charge d’un électron : $-e$ ;`, 'charge d’un neutron : 0.'],
        },
      ],
    },
    {
      type: 'p',
      text: 'Un objet initialement neutre peut se charger (on dit qu’il est **électrisé**) en **gagnant** des électrons (il devient chargé négativement) ou en **perdant** des électrons (il devient chargé positivement). Seuls les électrons se déplacent : les protons restent dans les noyaux.',
    },
    { type: 'h3', text: 'Les trois modes d’électrisation' },
    {
      type: 'grid',
      columns: 3,
      items: [
        {
          title: 'Par frottement',
          text: 'Une règle en plastique frottée avec un tissu en laine lui arrache des électrons : la règle devient négative, la laine positive.',
          icon: 'Hand',
        },
        {
          title: 'Par contact',
          text: 'Un objet chargé touché par un conducteur neutre lui transmet une partie de sa charge : les deux portent alors des charges de même signe.',
          icon: 'Merge',
        },
        {
          title: 'Par influence',
          text: 'Sans contact, un objet chargé approché d’un conducteur provoque un déplacement de ses électrons : les charges se répartissent, le conducteur reste globalement neutre et est attiré.',
          icon: 'Magnet',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Conducteurs et isolants',
      content: [
        {
          type: 'p',
          text: 'Dans un **conducteur** (métaux, graphite), des électrons libres peuvent se déplacer dans tout le matériau. Dans un **isolant** (verre, plastique, air sec), les charges restent localisées là où elles ont été déposées.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : nombre d’électrons transférés',
      content: [
        {
          type: 'p',
          text: r`Une règle frottée porte une charge $q = -3{,}2\ \text{nC}$. Le nombre d’électrons gagnés est $n = \dfrac{|q|}{e} = \dfrac{3{,}2\times10^{-9}}{1{,}60\times10^{-19}} = 2{,}0\times10^{10}$ électrons.`,
        },
      ],
    },

    { type: 'h2', text: '2. La loi de Coulomb' },
    {
      type: 'p',
      text: 'En 1785, Charles-Augustin de Coulomb mesure avec une balance de torsion la force qui s’exerce entre deux petites sphères chargées. Il établit la loi qui porte son nom.',
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Loi de Coulomb',
      content: [
        {
          type: 'p',
          text: r`Deux corps ponctuels A et B, de charges $q_A$ et $q_B$, séparés d’une distance $d$, exercent l’un sur l’autre des forces électrostatiques opposées, portées par la droite (AB), de valeur :`,
        },
        { type: 'math', tex: r`F_{A/B} = F_{B/A} = k\,\frac{|q_A\,q_B|}{d^2}` },
        {
          type: 'p',
          text: r`avec $F$ en newton (N), $q$ en coulomb (C), $d$ en mètre (m) et $k = 8{,}99\times10^{9}\ \text{N·m}^2\text{·C}^{-2}$ ($k = \dfrac{1}{4\pi\varepsilon_0}$).`,
        },
      ],
    },
    { type: 'p', text: r`**Forme vectorielle.** En notant $\vec u_{AB}$ le vecteur unitaire dirigé de A vers B :` },
    { type: 'math', tex: r`\vec F_{A/B} = k\,\frac{q_A\,q_B}{d^2}\,\vec u_{AB}` },
    {
      type: 'list',
      items: [
        r`si $q_A q_B > 0$ (charges de même signe), $\vec F_{A/B}$ est dans le sens de $\vec u_{AB}$ : B est repoussé — **répulsion** ;`,
        r`si $q_A q_B < 0$ (signes contraires), $\vec F_{A/B}$ est de sens opposé à $\vec u_{AB}$ : B est attiré vers A — **attraction**.`,
      ],
    },
    { type: 'svg', svg: svgCoulomb, caption: 'Forces électrostatiques réciproques entre deux charges ponctuelles.', maxWidth: 560 },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé',
      content: [
        {
          type: 'p',
          text: r`Deux charges $q_A = +2{,}0\ \text{nC}$ et $q_B = -5{,}0\ \text{nC}$ sont distantes de $d = 3{,}0$ cm.`,
        },
        {
          type: 'math',
          tex: r`F = 8{,}99\times10^{9}\times\frac{2{,}0\times10^{-9}\times5{,}0\times10^{-9}}{(3{,}0\times10^{-2})^2} = 1{,}0\times10^{-4}\ \text{N}`,
        },
        { type: 'p', text: 'Les charges sont de signes contraires : les forces sont attractives.' },
      ],
    },

    { type: 'h2', text: '3. La loi de la gravitation universelle' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Loi de la gravitation universelle (Newton, 1687)',
      content: [
        {
          type: 'p',
          text: r`Deux corps ponctuels (ou à répartition sphérique de masse) A et B, de masses $m_A$ et $m_B$, dont les centres sont séparés d’une distance $d$, s’attirent avec des forces opposées de valeur :`,
        },
        { type: 'math', tex: r`F_{A/B} = F_{B/A} = G\,\frac{m_A\,m_B}{d^2}` },
        { type: 'p', text: r`avec $G = 6{,}67\times10^{-11}\ \text{N·m}^2\text{·kg}^{-2}$, constante de gravitation universelle.` },
        { type: 'math', tex: r`\vec F_{A/B} = -G\,\frac{m_A\,m_B}{d^2}\,\vec u_{AB}` },
      ],
    },
    {
      type: 'p',
      text: r`Le signe « $-$ » traduit le caractère **toujours attractif** de la gravitation : la force exercée par A sur B est dirigée de B vers A.`,
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : attraction Terre–Lune',
      content: [
        {
          type: 'p',
          text: r`$M_T = 5{,}97\times10^{24}$ kg, $M_L = 7{,}35\times10^{22}$ kg, distance centre à centre $d = 3{,}84\times10^{8}$ m.`,
        },
        {
          type: 'math',
          tex: r`F = 6{,}67\times10^{-11}\times\frac{5{,}97\times10^{24}\times7{,}35\times10^{22}}{(3{,}84\times10^{8})^2} = 1{,}98\times10^{20}\ \text{N}`,
        },
      ],
    },

    { type: 'h2', text: '4. Analogies et comparaison des deux interactions' },
    {
      type: 'table',
      headers: ['Point commun / différence', 'Électrostatique', 'Gravitation'],
      rows: [
        ['Dépendance en distance', r`en $1/d^2$`, r`en $1/d^2$`],
        ['Portée', 'infinie', 'infinie'],
        ['Sens', 'attractive ou répulsive', 'toujours attractive'],
        ['Échelle où elle domine', 'atomes, molécules, objets du quotidien (cohésion, frottements, contact)', 'planètes, étoiles, galaxies'],
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Dans l’atome d’hydrogène',
      content: [
        { type: 'p', text: r`Distance proton–électron : $d = 5{,}3\times10^{-11}$ m ; $m_p = 1{,}67\times10^{-27}$ kg ; $m_e = 9{,}11\times10^{-31}$ kg.` },
        { type: 'math', tex: r`F_e = k\frac{e^2}{d^2} = 8{,}2\times10^{-8}\ \text{N} \qquad F_g = G\frac{m_p m_e}{d^2} = 3{,}6\times10^{-47}\ \text{N}` },
        { type: 'math', tex: r`\frac{F_e}{F_g} \approx 2\times10^{39}` },
        { type: 'p', text: 'À l’échelle atomique, la gravitation est totalement négligeable devant l’interaction électrostatique.' },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Pourquoi la gravitation domine aux grandes échelles',
      content: [
        {
          type: 'p',
          text: 'La matière est globalement **neutre** : les attractions et répulsions électriques se compensent pour des objets macroscopiques. Les masses, elles, s’ajoutent toujours : pour des corps très massifs (planètes, étoiles), la gravitation l’emporte. Ce sont aussi les interactions électriques (et l’interaction forte dans le noyau) qui assurent la **cohésion** des solides et des liquides.',
        },
      ],
    },

    { type: 'h2', text: '5. La notion de champ' },
    {
      type: 'p',
      text: 'Un **champ** est une grandeur physique définie en chaque point d’une région de l’espace. Un champ peut être **scalaire** (une valeur numérique : température, pression…) ou **vectoriel** (un vecteur en chaque point : vitesse du vent, champ électrostatique…).',
    },
    {
      type: 'p',
      text: 'L’idée de champ remplace l’« action à distance » : un corps chargé (ou massif) modifie les propriétés de l’espace qui l’entoure, et un autre corps placé dans cette région subit une force due au champ local.',
    },

    { type: 'h3', text: '5.1 Champ électrostatique' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Champ électrostatique',
      content: [
        {
          type: 'p',
          text: r`Une charge ponctuelle $q$ placée en un point M où règne un champ électrostatique $\vec E$ subit la force :`,
        },
        { type: 'math', tex: r`\vec F = q\,\vec E` },
        { type: 'p', text: r`$E$ s’exprime en V·m⁻¹ (unité équivalente : N·C⁻¹).` },
      ],
    },
    {
      type: 'list',
      items: [
        r`si $q > 0$ : $\vec F$ a le **même sens** que $\vec E$ ;`,
        r`si $q < 0$ : $\vec F$ est de **sens opposé** à $\vec E$.`,
      ],
    },
    {
      type: 'p',
      text: r`**Champ créé par une charge ponctuelle** $Q$ placée en O, en un point M tel que $OM = d$ (avec $\vec u$ unitaire de O vers M) : en comparant $\vec F = k\frac{Qq}{d^2}\vec u$ et $\vec F = q\vec E$ :`,
    },
    { type: 'math', tex: r`\vec E(M) = k\,\frac{Q}{d^2}\,\vec u \qquad E = k\,\frac{|Q|}{d^2}` },
    {
      type: 'p',
      text: r`Le champ est **radial** : sortant si $Q > 0$, entrant (dirigé vers O) si $Q < 0$. Sa valeur décroît en $1/d^2$.`,
    },
    { type: 'h3', text: '5.2 Le condensateur plan' },
    {
      type: 'p',
      text: r`Un **condensateur plan** est formé de deux plaques métalliques parallèles (armatures) séparées d’une distance $d$ par un isolant (air, vide). Lorsqu’on applique une tension $U$ entre elles, l’une se charge positivement, l’autre négativement.`,
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Champ dans un condensateur plan',
      content: [
        { type: 'p', text: 'Entre les armatures (loin des bords), le champ électrostatique est **uniforme** (même direction, même sens, même valeur en tout point) :' },
        {
          type: 'list',
          items: [
            'direction : perpendiculaire aux armatures ;',
            'sens : de l’armature positive vers l’armature négative ;',
            r`valeur : $E = \dfrac{U}{d}$ avec $U$ en volt (V), $d$ en mètre (m), $E$ en V·m⁻¹.`,
          ],
        },
      ],
    },
    { type: 'svg', svg: svgCondensateur, caption: 'Champ électrostatique uniforme entre les armatures d’un condensateur plan.', maxWidth: 560 },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : électron dans un condensateur',
      content: [
        { type: 'p', text: r`$U = 200$ V, $d = 2{,}0$ cm. $E = \dfrac{200}{2{,}0\times10^{-2}} = 1{,}0\times10^{4}\ \text{V·m}^{-1}$.` },
        {
          type: 'p',
          text: r`Force subie par un électron : $F = eE = 1{,}60\times10^{-19}\times1{,}0\times10^{4} = 1{,}6\times10^{-15}$ N, dirigée vers l’armature positive (sens opposé à $\vec E$). Son poids, $m_e g = 8{,}9\times10^{-30}$ N, est totalement négligeable.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'L’expérience de Millikan (1909)',
      content: [
        {
          type: 'p',
          text: 'Robert Millikan immobilise de fines gouttelettes d’huile chargées dans le champ d’un condensateur plan : à l’équilibre, la force électrostatique compense le poids. Il mesure ainsi des charges qui sont toujours des multiples entiers d’une même valeur : la charge élémentaire $e$.',
        },
      ],
    },

    { type: 'h3', text: '5.3 Champ de gravitation' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Champ de gravitation',
      content: [
        { type: 'p', text: r`Un corps de masse $m$ placé en un point où règne un champ de gravitation $\vec{\mathcal G}$ subit la force :` },
        { type: 'math', tex: r`\vec F = m\,\vec{\mathcal G}` },
        { type: 'p', text: r`$\mathcal G$ s’exprime en N·kg⁻¹ (équivalent à m·s⁻²).` },
      ],
    },
    { type: 'p', text: r`Le champ créé par un astre sphérique de masse $M$ et de centre O, en un point à la distance $d$ de O ($d \geq R$) :` },
    { type: 'math', tex: r`\vec{\mathcal G} = -G\,\frac{M}{d^2}\,\vec u \qquad \mathcal G = G\,\frac{M}{d^2}` },
    {
      type: 'p',
      text: r`Le champ est **radial** et **centripète** (toujours dirigé vers le centre de l’astre). À l’altitude $h$ au-dessus de la Terre : $\mathcal G(h) = \dfrac{G M_T}{(R_T+h)^2}$.`,
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Champ de pesanteur et poids',
      content: [
        {
          type: 'p',
          text: r`Au voisinage de la surface terrestre, le champ de pesanteur $\vec g$ se confond (aux effets de la rotation de la Terre près) avec le champ de gravitation : $g_0 = \dfrac{G M_T}{R_T^2} = \dfrac{6{,}67\times10^{-11}\times5{,}97\times10^{24}}{(6{,}37\times10^{6})^2} = 9{,}81\ \text{N·kg}^{-1}$.`,
        },
        { type: 'p', text: r`Le **poids** d’un objet est alors $\vec P = m\,\vec g$ : verticale, vers le bas, $P = mg$.` },
        {
          type: 'p',
          text: 'Sur une zone de quelques kilomètres, $\\vec g$ peut être considéré comme **uniforme** (lignes de champ parallèles et verticales).',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Lieu', 'Champ de pesanteur (N·kg⁻¹)'],
      rows: [
        ['Surface de la Terre', '9,81'],
        ['Station spatiale (h = 400 km)', '8,69'],
        ['Surface de la Lune', '1,62'],
        ['Surface de Mars', '3,73'],
      ],
      caption: 'En orbite, les astronautes ne sont pas « sans poids » : ils sont en chute libre permanente.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Analogie formelle',
      content: [
        {
          type: 'table',
          headers: ['Électrostatique', 'Gravitation'],
          rows: [
            [r`charge $q$`, r`masse $m$`],
            [r`$k$`, r`$-G$`],
            [r`$\vec F = q\vec E$`, r`$\vec F = m\vec{\mathcal G}$`],
            [r`$\vec E = k\dfrac{Q}{d^2}\vec u$`, r`$\vec{\mathcal G} = -G\dfrac{M}{d^2}\vec u$`],
          ],
        },
      ],
    },

    { type: 'h2', text: '6. Lignes de champ' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Ligne de champ',
      content: [
        {
          type: 'p',
          text: 'Une **ligne de champ** est une courbe tangente en chacun de ses points au vecteur champ en ce point. Elle est orientée dans le sens du champ. Deux lignes de champ ne se croisent jamais.',
        },
      ],
    },
    {
      type: 'list',
      items: [
        'Champ créé par une charge ponctuelle ou un astre : lignes **radiales** (demi-droites issues du centre).',
        'Champ uniforme (condensateur plan, pesanteur locale) : lignes **parallèles**, de même sens, régulièrement espacées.',
        'Le **resserrement** des lignes indique un champ plus intense.',
        r`Lignes de champ électrostatique : partent des charges positives, arrivent sur les charges négatives.`,
      ],
    },
    { type: 'svg', svg: svgLignes, caption: 'Lignes de champ électrostatique (charge positive) et de gravitation (astre).', maxWidth: 580 },
    {
      type: 'steps',
      items: [
        { title: 'Repérer la source', text: 'Charge (signe ?), astre, armatures d’un condensateur, aimant.' },
        { title: 'Tracer la direction', text: 'Radiale pour une source ponctuelle, perpendiculaire aux armatures pour un condensateur.' },
        { title: 'Orienter', text: r`Sortant de $Q>0$, entrant dans $Q<0$ ; vers l’astre pour la gravitation ; de $+$ vers $-$ dans un condensateur.` },
        { title: 'Représenter le vecteur champ', text: 'Tangent à la ligne au point considéré, longueur proportionnelle à la valeur du champ (échelle à préciser).' },
      ],
    },

    { type: 'h2', text: '7. Le champ magnétique' },
    {
      type: 'p',
      text: r`Un **champ magnétique** $\vec B$ règne dans une région de l’espace où une aiguille aimantée (boussole) s’oriente dans une direction privilégiée. Il s’exprime en **tesla** (T) et se mesure avec un **teslamètre** (sonde à effet Hall).`,
    },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Aimants', text: 'Aimant droit, aimant en U : de 10⁻² T à environ 1 T (néodyme) près des pôles.', icon: 'Magnet' },
        { title: 'Courants électriques', text: 'Un fil parcouru par un courant crée un champ (Ørsted, 1820). Une bobine longue (solénoïde) crée un champ uniforme à l’intérieur.', icon: 'Zap' },
        { title: 'La Terre', text: 'Champ terrestre ≈ 5 × 10⁻⁵ T en France (composante horizontale ≈ 2 × 10⁻⁵ T). Il protège la Terre du vent solaire.', icon: 'Globe2' },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Orientation et lignes de champ magnétique',
      content: [
        {
          type: 'list',
          items: [
            r`Une aiguille aimantée s’oriente dans la direction de $\vec B$, son pôle nord indiquant le sens de $\vec B$ (axe S → N de l’aiguille).`,
            'À l’extérieur d’un aimant, les lignes de champ sortent par le pôle **nord** et entrent par le pôle **sud**.',
            'Les lignes de champ magnétique sont **fermées** sur elles-mêmes (elles se referment à l’intérieur de l’aimant).',
            'Le spectre magnétique se visualise avec de la limaille de fer.',
          ],
        },
      ],
    },
    { type: 'svg', svg: svgAimant, caption: 'Lignes de champ d’un aimant droit.', maxWidth: 560 },
    {
      type: 'table',
      headers: ['Source', 'Ordre de grandeur de B'],
      rows: [
        ['Champ magnétique terrestre', r`$5\times10^{-5}$ T`],
        ['Aimant de réfrigérateur', r`$10^{-3}$ à $10^{-2}$ T`],
        ['Aimant néodyme (au contact)', r`$\approx 1$ T`],
        ['IRM médicale', '1,5 à 3 T'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Superposition des champs',
      content: [
        {
          type: 'p',
          text: r`Lorsque plusieurs sources agissent, le champ en un point est la **somme vectorielle** des champs créés par chacune : $\vec B = \vec B_1 + \vec B_2$ (de même pour $\vec E$ et $\vec{\mathcal G}$). Une boussole placée près d’un aimant s’oriente selon le champ total (aimant + Terre).`,
        },
      ],
    },

    { type: 'h2', text: '8. Méthode : calculer une force ou un champ' },
    {
      type: 'steps',
      items: [
        { title: 'Identifier l’interaction', text: 'Électrostatique (charges) ou gravitationnelle (masses) ? Les deux peuvent coexister ; comparer les ordres de grandeur.' },
        { title: 'Convertir en unités SI', text: 'Distances en m, charges en C, masses en kg. Attention à la distance au centre pour un astre.' },
        { title: 'Appliquer la formule', text: r`$F = k|q_Aq_B|/d^2$ ou $F = Gm_Am_B/d^2$ ; $E = F/|q|$, $E = U/d$, $\mathcal G = GM/d^2$.` },
        { title: 'Caractériser le vecteur', text: 'Direction, sens (attraction/répulsion, signe de q), valeur avec le bon nombre de chiffres significatifs et l’unité.' },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Chiffres significatifs',
      content: [
        {
          type: 'p',
          text: 'Le résultat d’un calcul (produit, quotient) s’écrit avec autant de chiffres significatifs que la donnée qui en a le moins. Ex. : $d = 3{,}0$ cm (2 c.s.) → résultat à 2 c.s.',
        },
      ],
    },
  ],

  // =========================================================================
  exercices: [
    {
      id: 'pc7-ex1',
      title: 'Électrisation d’un ballon',
      difficulty: 1,
      duration: 5,
      tags: ['charge', 'quantification'],
      statement: [
        {
          type: 'p',
          text: r`Un ballon de baudruche frotté sur des cheveux acquiert une charge $q = -4{,}8\times10^{-8}$ C. Donnée : $e = 1{,}60\times10^{-19}$ C.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Le ballon a-t-il gagné ou perdu des électrons ? Justifier.',
            'Calculer le nombre d’électrons transférés.',
            'Quelle est la charge acquise par les cheveux (supposés initialement neutres et isolés) ?',
          ],
        },
      ],
      hints: ['Une charge négative correspond à un excès d’électrons.', r`$q = n\times(-e)$.`, 'La charge totale se conserve.'],
      solution: [
        { type: 'list', ordered: true, items: [
          'La charge du ballon est négative : il a **gagné** des électrons (arrachés aux cheveux).',
          r`$n = \dfrac{|q|}{e} = \dfrac{4{,}8\times10^{-8}}{1{,}60\times10^{-19}} = 3{,}0\times10^{11}$ électrons.`,
          r`Par conservation de la charge, les cheveux portent $q' = -q = +4{,}8\times10^{-8}$ C : ils ont perdu $3{,}0\times10^{11}$ électrons.`,
        ] },
      ],
    },
    {
      id: 'pc7-ex2',
      title: 'Atome d’hydrogène : comparer deux forces',
      difficulty: 1,
      duration: 10,
      tags: ['Coulomb', 'gravitation', 'comparaison'],
      statement: [
        {
          type: 'p',
          text: r`Dans l’atome d’hydrogène, l’électron est à la distance $d = 5{,}3\times10^{-11}$ m du proton. Données : $e = 1{,}60\times10^{-19}$ C ; $m_p = 1{,}67\times10^{-27}$ kg ; $m_e = 9{,}11\times10^{-31}$ kg ; $k = 8{,}99\times10^{9}$ SI ; $G = 6{,}67\times10^{-11}$ SI.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la valeur $F_e$ de la force électrostatique exercée par le proton sur l’électron. Est-elle attractive ou répulsive ?',
            'Calculer la valeur $F_g$ de la force gravitationnelle entre ces deux particules.',
            'Calculer le rapport $F_e/F_g$ et conclure.',
          ],
        },
      ],
      hints: ['Les deux charges ont pour valeur absolue e.', 'Élevez bien d au carré : d² = 2,8 × 10⁻²¹ m².'],
      solution: [
        { type: 'p', text: r`**1.** $F_e = k\dfrac{e^2}{d^2} = 8{,}99\times10^{9}\times\dfrac{(1{,}60\times10^{-19})^2}{(5{,}3\times10^{-11})^2} = 8{,}2\times10^{-8}$ N. Charges de signes contraires : force **attractive**.` },
        { type: 'p', text: r`**2.** $F_g = G\dfrac{m_p m_e}{d^2} = 6{,}67\times10^{-11}\times\dfrac{1{,}67\times10^{-27}\times9{,}11\times10^{-31}}{(5{,}3\times10^{-11})^2} = 3{,}6\times10^{-47}$ N.` },
        { type: 'p', text: r`**3.** $\dfrac{F_e}{F_g} = \dfrac{8{,}2\times10^{-8}}{3{,}6\times10^{-47}} \approx 2{,}3\times10^{39}$. L’interaction gravitationnelle est totalement négligeable à l’échelle atomique : c’est l’interaction électrostatique qui assure la cohésion de l’atome.` },
      ],
    },
    {
      id: 'pc7-ex3',
      title: 'Champ de pesanteur sur Mars',
      difficulty: 1,
      duration: 8,
      tags: ['champ de gravitation', 'poids'],
      statement: [
        { type: 'p', text: r`Mars a une masse $M = 6{,}42\times10^{23}$ kg et un rayon $R = 3{,}39\times10^{3}$ km. Le rover Perseverance a une masse $m = 1{,}03\times10^{3}$ kg. $G = 6{,}67\times10^{-11}\ \text{N·m}^2\text{·kg}^{-2}$ ; sur Terre $g = 9{,}81$ N·kg⁻¹.` },
        { type: 'list', ordered: true, items: [
          'Calculer la valeur du champ de gravitation à la surface de Mars.',
          'En déduire le poids du rover sur Mars, puis sur Terre.',
          'Représenter le vecteur champ de gravitation en un point de la surface (sans échelle) et décrire ses caractéristiques.',
        ] },
      ],
      hints: ['Convertir R en mètres.', r`$P = m\,\mathcal G$.`],
      solution: [
        { type: 'p', text: r`**1.** $\mathcal G_M = \dfrac{GM}{R^2} = \dfrac{6{,}67\times10^{-11}\times6{,}42\times10^{23}}{(3{,}39\times10^{6})^2} = 3{,}73$ N·kg⁻¹.` },
        { type: 'p', text: r`**2.** Sur Mars : $P_M = m\,\mathcal G_M = 1{,}03\times10^{3}\times3{,}73 = 3{,}84\times10^{3}$ N. Sur Terre : $P_T = 1{,}03\times10^{3}\times9{,}81 = 1{,}01\times10^{4}$ N, soit environ 2,6 fois plus. La masse, elle, est la même (1 030 kg).` },
        { type: 'p', text: '**3.** Le vecteur champ est radial (direction : droite passant par le point et le centre de Mars), dirigé vers le centre de Mars, de valeur 3,73 N·kg⁻¹.' },
      ],
    },
    {
      id: 'pc7-ex4',
      title: 'Électron dans un condensateur plan',
      difficulty: 2,
      duration: 12,
      tags: ['condensateur', 'champ uniforme'],
      statement: [
        { type: 'p', text: r`Un condensateur plan est constitué de deux armatures horizontales distantes de $d = 2{,}0$ cm. L’armature supérieure A est reliée à la borne $+$ d’un générateur, l’armature inférieure B à la borne $-$ ; $U_{AB} = 200$ V. Un électron ($m_e = 9{,}11\times10^{-31}$ kg, $q = -e$) est placé entre les armatures. $g = 9{,}81$ N·kg⁻¹.` },
        { type: 'list', ordered: true, items: [
          'Donner la direction, le sens et la valeur du champ électrostatique entre les armatures.',
          'Caractériser la force électrostatique subie par l’électron.',
          'Comparer cette force au poids de l’électron. Conclure.',
          'Même question pour un proton placé au même endroit ($m_p = 1{,}67\times10^{-27}$ kg).',
        ] },
      ],
      hints: ['Le champ va de l’armature + vers l’armature −.', r`$\vec F = q\vec E$ avec $q<0$.`],
      solution: [
        { type: 'p', text: r`**1.** Champ uniforme, vertical, dirigé de A vers B (vers le bas), $E = \dfrac{U_{AB}}{d} = \dfrac{200}{2{,}0\times10^{-2}} = 1{,}0\times10^{4}$ V·m⁻¹.` },
        { type: 'p', text: r`**2.** $\vec F = -e\vec E$ : verticale, **vers le haut** (vers l’armature positive), $F = eE = 1{,}60\times10^{-19}\times1{,}0\times10^{4} = 1{,}6\times10^{-15}$ N.` },
        { type: 'p', text: r`**3.** $P = m_e g = 9{,}11\times10^{-31}\times9{,}81 = 8{,}94\times10^{-30}$ N. $F/P \approx 1{,}8\times10^{14}$ : le poids est négligeable.` },
        { type: 'p', text: r`**4.** Le proton subit une force de même valeur $1{,}6\times10^{-15}$ N mais **vers le bas** (même sens que $\vec E$). $P_p = 1{,}67\times10^{-27}\times9{,}81 = 1{,}64\times10^{-26}$ N ; $F/P_p \approx 10^{11}$ : poids encore négligeable.` },
      ],
    },
    {
      id: 'pc7-ex5',
      title: 'Point d’équilibre entre deux charges',
      difficulty: 2,
      duration: 15,
      tags: ['Coulomb', 'vectoriel'],
      statement: [
        { type: 'p', text: r`Deux charges ponctuelles $q_A = +4{,}0$ nC et $q_B = +1{,}0$ nC sont fixées en A ($x = 0$) et B ($x = 30$ cm) sur un axe. On place une petite charge $q > 0$ en un point M d’abscisse $x$ entre A et B.` },
        { type: 'list', ordered: true, items: [
          'Représenter qualitativement les forces exercées par A et B sur la charge q.',
          'Établir l’égalité traduisant l’équilibre de q (forces de A et de B qui se compensent).',
          'En déduire la position $x$ du point d’équilibre.',
          'Le résultat dépend-il de la valeur de q ? de son signe ?',
        ] },
      ],
      hints: [r`$F_{A/M} = k\dfrac{q_A q}{x^2}$ et $F_{B/M} = k\dfrac{q_B q}{(0{,}30-x)^2}$.`, 'Prendre la racine carrée : les deux membres sont positifs.'],
      solution: [
        { type: 'p', text: r`**1.** Charges de même signe : A repousse M vers la droite (vers B), B repousse M vers la gauche (vers A).` },
        { type: 'p', text: r`**2.** Équilibre : $k\dfrac{q_A q}{x^2} = k\dfrac{q_B q}{(0{,}30-x)^2}$ soit $\dfrac{q_A}{x^2} = \dfrac{q_B}{(0{,}30-x)^2}$.` },
        { type: 'p', text: r`**3.** $\dfrac{(0{,}30-x)^2}{x^2} = \dfrac{q_B}{q_A} = \dfrac14$ donc (grandeurs positives, $0 < x < 0{,}30$) $\dfrac{0{,}30-x}{x} = \dfrac12$, d’où $0{,}60 - 2x = x$ et $x = 0{,}20$ m $= 20$ cm.` },
        { type: 'p', text: '**4.** q se simplifie : la position ne dépend ni de la valeur ni du signe de q (si q < 0, les deux forces changent de sens et se compensent toujours). On remarque que M est plus proche de la charge la plus faible.' },
      ],
    },
    {
      id: 'pc7-ex6',
      title: 'À quelle altitude le poids est-il divisé par deux ?',
      difficulty: 2,
      duration: 12,
      tags: ['champ de gravitation', 'altitude'],
      statement: [
        { type: 'p', text: r`$R_T = 6{,}37\times10^{6}$ m, $M_T = 5{,}97\times10^{24}$ kg, $G = 6{,}67\times10^{-11}$ SI.` },
        { type: 'list', ordered: true, items: [
          r`Exprimer $\mathcal G(h)$ à l’altitude $h$ puis le rapport $\dfrac{\mathcal G(h)}{\mathcal G(0)}$ en fonction de $R_T$ et $h$.`,
          'Calculer $\\mathcal G$ à bord de la Station spatiale internationale (h = 400 km).',
          'Déterminer l’altitude à laquelle le champ de gravitation vaut la moitié de sa valeur au sol.',
        ] },
      ],
      hints: [r`$\dfrac{\mathcal G(h)}{\mathcal G(0)} = \left(\dfrac{R_T}{R_T+h}\right)^2$.`],
      solution: [
        { type: 'p', text: r`**1.** $\mathcal G(h) = \dfrac{GM_T}{(R_T+h)^2}$ et $\dfrac{\mathcal G(h)}{\mathcal G(0)} = \dfrac{R_T^2}{(R_T+h)^2}$.` },
        { type: 'p', text: r`**2.** $\mathcal G = \dfrac{6{,}67\times10^{-11}\times5{,}97\times10^{24}}{(6{,}77\times10^{6})^2} = 8{,}69$ N·kg⁻¹ (89 % de la valeur au sol : l’ISS est loin d’être en « apesanteur »).` },
        { type: 'p', text: r`**3.** On veut $\dfrac{R_T^2}{(R_T+h)^2} = \dfrac12$ soit $R_T + h = \sqrt2\,R_T$ et $h = (\sqrt2 - 1)R_T = 0{,}414\times6{,}37\times10^{6} = 2{,}64\times10^{6}$ m, soit environ 2 640 km.` },
      ],
    },
    {
      id: 'pc7-ex7',
      title: 'Pendule électrostatique dans un condensateur',
      difficulty: 2,
      duration: 15,
      tags: ['condensateur', 'équilibre', 'bilan des forces'],
      statement: [
        { type: 'p', text: r`Une petite boule de masse $m = 0{,}50$ g, de charge $q = +20$ nC, est suspendue à un fil isolant entre deux armatures **verticales** d’un condensateur où règne un champ horizontal $E = 1{,}0\times10^{5}$ V·m⁻¹. À l’équilibre, le fil fait un angle $\alpha$ avec la verticale. $g = 9{,}81$ N·kg⁻¹.` },
        { type: 'list', ordered: true, items: [
          'Faire le bilan des forces s’exerçant sur la boule.',
          'Calculer la valeur du poids et celle de la force électrostatique.',
          r`Montrer que $\tan\alpha = \dfrac{qE}{mg}$ et calculer $\alpha$.`,
          'Vers quelle armature la boule est-elle déviée ?',
        ] },
      ],
      hints: ['Trois forces : poids, tension du fil, force électrostatique. À l’équilibre leur somme est nulle.', 'Dans le triangle des forces, le poids est vertical et la force électrique horizontale.'],
      solution: [
        { type: 'p', text: r`**1.** Poids $\vec P$ (vertical, vers le bas), tension $\vec T$ du fil (le long du fil, vers le point d’attache), force électrostatique $\vec F = q\vec E$ (horizontale, même sens que $\vec E$ car $q>0$).` },
        { type: 'p', text: r`**2.** $P = mg = 0{,}50\times10^{-3}\times9{,}81 = 4{,}9\times10^{-3}$ N ; $F = qE = 20\times10^{-9}\times1{,}0\times10^{5} = 2{,}0\times10^{-3}$ N.` },
        { type: 'p', text: r`**3.** À l’équilibre $\vec P + \vec T + \vec F = \vec 0$. En projetant : horizontalement $T\sin\alpha = F$, verticalement $T\cos\alpha = P$. D’où $\tan\alpha = \dfrac{F}{P} = \dfrac{qE}{mg} = \dfrac{2{,}0\times10^{-3}}{4{,}9\times10^{-3}} = 0{,}41$ et $\alpha = 22°$.` },
        { type: 'p', text: '**4.** La boule (positive) est déviée dans le sens du champ, donc vers l’armature **négative**.' },
      ],
    },
    {
      id: 'pc7-ex8',
      title: 'Boussole et aimant : superposition de champs magnétiques',
      difficulty: 2,
      duration: 10,
      tags: ['champ magnétique', 'superposition'],
      statement: [
        { type: 'p', text: r`Une boussole est placée en un point où la composante horizontale du champ magnétique terrestre vaut $B_H = 2{,}0\times10^{-5}$ T (dirigée vers le nord). On approche un aimant qui crée en ce point un champ horizontal $\vec B_a$ perpendiculaire à $\vec B_H$ (dirigé vers l’est). L’aiguille tourne alors de $\alpha = 60°$ vers l’est.` },
        { type: 'list', ordered: true, items: [
          'Selon quel champ l’aiguille s’oriente-t-elle ?',
          'Faire un schéma vectoriel et exprimer $\\tan\\alpha$ en fonction de $B_a$ et $B_H$.',
          'Calculer $B_a$ puis la valeur du champ total.',
        ] },
      ],
      hints: ['Le champ total est la somme vectorielle des deux champs.', 'Les deux vecteurs sont perpendiculaires : triangle rectangle.'],
      solution: [
        { type: 'p', text: r`**1.** L’aiguille s’oriente selon le champ **total** $\vec B = \vec B_H + \vec B_a$.` },
        { type: 'p', text: r`**2.** $\vec B_H$ vers le nord, $\vec B_a$ vers l’est : $\vec B$ est la diagonale du rectangle, et $\tan\alpha = \dfrac{B_a}{B_H}$.` },
        { type: 'p', text: r`**3.** $B_a = B_H\tan\alpha = 2{,}0\times10^{-5}\times\tan 60° = 3{,}5\times10^{-5}$ T. $B = \sqrt{B_H^2 + B_a^2} = \dfrac{B_H}{\cos\alpha} = 4{,}0\times10^{-5}$ T.` },
      ],
    },
    {
      id: 'pc7-ex9',
      title: 'Type bac — L’expérience de Millikan',
      difficulty: 3,
      duration: 30,
      tags: ['type bac', 'condensateur', 'charge élémentaire'],
      statement: [
        { type: 'p', text: 'En 1909, Robert Millikan pulvérise de fines gouttelettes d’huile entre les armatures horizontales d’un condensateur plan. Certaines gouttes sont électrisées par frottement à la sortie du pulvérisateur. En réglant la tension, il parvient à immobiliser une goutte.' },
        { type: 'p', text: r`Données : rayon de la goutte $r = 1{,}0\ \mu$m ; masse volumique de l’huile $\rho = 900$ kg·m⁻³ ; volume d’une sphère $V = \frac43\pi r^3$ ; distance entre les armatures $d = 1{,}0$ cm ; tension pour laquelle la goutte est immobile $U = 462$ V, l’armature **supérieure** étant positive ; $g = 9{,}81$ N·kg⁻¹ ; $e = 1{,}60\times10^{-19}$ C. On néglige la poussée d’Archimède.` },
        { type: 'list', ordered: true, items: [
          'Calculer la masse puis le poids de la goutte.',
          'Donner les caractéristiques du champ électrostatique entre les armatures.',
          'La goutte étant immobile, quelle relation lie les forces qui s’exercent sur elle ? En déduire le signe de sa charge.',
          r`Montrer que $|q| = \dfrac{m g d}{U}$ et calculer $|q|$.`,
          'Combien de charges élémentaires porte la goutte ? En quoi cette expérience montre-t-elle la quantification de la charge ?',
          'Si la goutte perd un électron, que se passe-t-il (U inchangée) ? Justifier qualitativement.',
        ] },
      ],
      hints: [
        r`$m = \rho\,V$ ; attention, $r = 1{,}0\times10^{-6}$ m.`,
        r`Le champ va de l’armature $+$ (en haut) vers l’armature $-$ : il est dirigé vers le bas.`,
        'Pour que la force électrique soit vers le haut alors que le champ est vers le bas, il faut q < 0.',
      ],
      solution: [
        { type: 'p', text: r`**1.** $V = \frac43\pi(1{,}0\times10^{-6})^3 = 4{,}19\times10^{-18}$ m³ ; $m = \rho V = 900\times4{,}19\times10^{-18} = 3{,}8\times10^{-15}$ kg ; $P = mg = 3{,}7\times10^{-14}$ N.` },
        { type: 'p', text: r`**2.** Champ uniforme, vertical, dirigé vers le bas (de l’armature $+$ vers l’armature $-$), $E = \dfrac{U}{d} = \dfrac{462}{1{,}0\times10^{-2}} = 4{,}6\times10^{4}$ V·m⁻¹.` },
        { type: 'p', text: r`**3.** La goutte est immobile : d’après le principe d’inertie, $\vec P + \vec F = \vec 0$. La force électrostatique est donc verticale, **vers le haut**. Or $\vec F = q\vec E$ avec $\vec E$ vers le bas : il faut $q < 0$. La goutte porte un excès d’électrons.` },
        { type: 'p', text: r`**4.** $F = P$ soit $|q|\dfrac{U}{d} = mg$, d’où $|q| = \dfrac{mgd}{U} = \dfrac{3{,}77\times10^{-15}\times9{,}81\times1{,}0\times10^{-2}}{462} = 8{,}0\times10^{-19}$ C.` },
        { type: 'p', text: r`**5.** $n = \dfrac{|q|}{e} = \dfrac{8{,}0\times10^{-19}}{1{,}60\times10^{-19}} = 5{,}0$ : la goutte porte 5 électrons excédentaires, $q = -5e$. En répétant la mesure sur de nombreuses gouttes, Millikan a toujours trouvé des multiples entiers de $e$ : la charge est **quantifiée**.` },
        { type: 'p', text: r`**6.** $|q|$ devient $4e$ : la force électrique diminue (elle ne vaut plus que 4/5 du poids) ; la somme des forces est dirigée vers le bas et la goutte se met à descendre. Pour l’immobiliser à nouveau, il faudrait augmenter $U$ jusqu’à $\frac54\times462 \approx 578$ V.` },
      ],
    },
  ],

  // =========================================================================
  representations: [
    {
      type: 'widget',
      id: 'force-field',
      props: { mode: 'electrique' },
      title: 'Loi de Coulomb et lignes de champ électrostatique',
      caption: 'Modifiez les charges et leur distance : observez le sens des forces, leur valeur en 1/d² et l’allure des lignes de champ.',
    },
    {
      type: 'widget',
      id: 'force-field',
      props: { mode: 'gravitation' },
      title: 'Gravitation universelle',
      caption: 'Une force toujours attractive, proportionnelle au produit des masses.',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      props: {
        expressions: ['a/x^2'],
        params: [{ name: 'a', min: 1, max: 10, step: 1, value: 4 }],
        xMin: 0,
        xMax: 5,
        yMin: 0,
        yMax: 10,
        editable: true,
      },
      title: 'Décroissance en 1/d²',
      caption: 'La valeur des forces de Coulomb et de gravitation varie comme a/d² : doubler la distance divise la force par 4.',
    },
    { type: 'svg', svg: svgCondensateur, caption: 'Condensateur plan : champ uniforme E = U/d.', maxWidth: 560 },
    { type: 'svg', svg: svgAimant, caption: 'Spectre magnétique d’un aimant droit.', maxWidth: 560 },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Si la distance entre deux charges est multipliée par 3, la force électrostatique est :',
          choices: ['multipliée par 3', 'divisée par 3', 'divisée par 9', 'multipliée par 9'],
          answer: 2,
          explanation: 'F est proportionnelle à 1/d² : (1/3)² = 1/9.',
        },
        {
          question: 'Une charge négative placée dans un champ électrostatique subit une force :',
          choices: ['de même sens que le champ', 'de sens opposé au champ', 'perpendiculaire au champ', 'nulle'],
          answer: 1,
          explanation: r`$\vec F = q\vec E$ avec $q<0$ : sens opposé.`,
        },
        {
          question: 'Dans un condensateur plan, U = 1 000 V et d = 5,0 mm. Le champ vaut :',
          choices: ['5,0 V·m⁻¹', '2,0 × 10² V·m⁻¹', '2,0 × 10⁵ V·m⁻¹', '5,0 × 10³ V·m⁻¹'],
          answer: 2,
          explanation: 'E = U/d = 1000 / 5,0 × 10⁻³ = 2,0 × 10⁵ V·m⁻¹.',
        },
        {
          question: 'L’unité du champ de gravitation est :',
          choices: ['N·kg⁻¹', 'N·m', 'kg·N⁻¹', 'V·m⁻¹'],
          answer: 0,
          explanation: r`$\mathcal G = F/m$ en N·kg⁻¹ (équivalent à m·s⁻²).`,
        },
        {
          question: 'Les lignes de champ de gravitation de la Terre sont :',
          choices: ['parallèles entre elles partout', 'radiales et dirigées vers le centre', 'radiales et sortantes', 'des cercles centrés sur la Terre'],
          answer: 1,
          explanation: 'Le champ est centripète : radial, vers le centre de la Terre.',
        },
        {
          question: 'Quelle interaction assure la cohésion de l’atome (électrons autour du noyau) ?',
          choices: ['Gravitationnelle', 'Électrostatique', 'Magnétique', 'Aucune'],
          answer: 1,
          explanation: 'Elle est environ 10³⁹ fois plus intense que la gravitation entre proton et électron.',
        },
        {
          question: 'À l’extérieur d’un aimant droit, les lignes de champ magnétique :',
          choices: ['vont du pôle sud au pôle nord', 'vont du pôle nord au pôle sud', 'sont radiales', 'n’existent pas'],
          answer: 1,
          explanation: 'Elles sortent par le pôle N et entrent par le pôle S.',
        },
        {
          question: 'Un objet électrisé positivement a :',
          choices: ['gagné des protons', 'perdu des protons', 'perdu des électrons', 'gagné des électrons'],
          answer: 2,
          explanation: 'Seuls les électrons se déplacent lors d’une électrisation.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Loi de Coulomb (valeur)', back: r`$F = k\dfrac{|q_Aq_B|}{d^2}$, $k = 8{,}99\times10^{9}$ N·m²·C⁻²` },
        { front: 'Loi de la gravitation universelle', back: r`$F = G\dfrac{m_Am_B}{d^2}$, $G = 6{,}67\times10^{-11}$ N·m²·kg⁻²` },
        { front: 'Charge élémentaire', back: r`$e = 1{,}60\times10^{-19}$ C ; $q = ne$, $n$ entier` },
        { front: 'Force dans un champ électrostatique', back: r`$\vec F = q\vec E$` },
        { front: 'Champ dans un condensateur plan', back: r`Uniforme, de + vers −, $E = U/d$ (V·m⁻¹)` },
        { front: 'Champ de gravitation d’un astre', back: r`$\mathcal G = \dfrac{GM}{d^2}$, radial, vers le centre` },
        { front: 'Ligne de champ', back: 'Courbe tangente en chaque point au vecteur champ, orientée dans son sens.' },
        { front: 'Unité du champ magnétique', back: 'Le tesla (T). Champ terrestre ≈ 5 × 10⁻⁵ T.' },
        { front: 'Sources de champ magnétique', back: 'Aimants, courants électriques, Terre.' },
        { front: 'Trois modes d’électrisation', back: 'Frottement, contact, influence.' },
        { front: 'Différence majeure Coulomb / gravitation', back: 'Coulomb : attractive ou répulsive ; gravitation : toujours attractive.' },
        { front: 'Champ de pesanteur au sol', back: r`$g_0 = GM_T/R_T^2 \approx 9{,}81$ N·kg⁻¹` },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque grandeur à son unité',
      pairs: [
        { left: 'Charge électrique', right: 'C' },
        { left: 'Champ électrostatique', right: 'V·m⁻¹' },
        { left: 'Champ de gravitation', right: 'N·kg⁻¹' },
        { left: 'Champ magnétique', right: 'T' },
        { left: 'Constante k', right: 'N·m²·C⁻²' },
        { left: 'Constante G', right: 'N·m²·kg⁻²' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'Dans un condensateur plan, le champ électrostatique est {{uniforme}} ; il est dirigé de l’armature {{positive|+}} vers l’armature {{négative|negative|-|−}}. Sa valeur est le quotient de la {{tension}} par la {{distance}} entre les armatures. Un électron y subit une force de sens {{opposé|oppose|contraire}} au champ.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'La force de gravitation peut être répulsive.', answer: false, explanation: 'Elle est toujours attractive.' },
        { text: 'Deux lignes de champ peuvent se croiser.', answer: false, explanation: 'En un point, le champ a une seule direction.' },
        { text: 'Le champ de gravitation diminue quand on s’éloigne de la Terre.', answer: true, explanation: r`$\mathcal G \propto 1/(R_T+h)^2$.` },
        { text: 'À bord de l’ISS, le champ de gravitation est nul.', answer: false, explanation: 'Il vaut environ 8,7 N·kg⁻¹ ; les astronautes sont en chute libre.' },
        { text: 'Un conducteur électrisé par influence reste globalement neutre.', answer: true, explanation: 'Les charges se répartissent mais aucun électron n’est apporté ni retiré.' },
      ],
    },
  ],
}

export default chapter
