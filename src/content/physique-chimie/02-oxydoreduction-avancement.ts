import type { Chapter } from '../types'

const r = String.raw

const FONT = 'font-family="Geist, sans-serif"'

const svgZincCuivre = `<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
  <defs><marker id="pc2-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
  <!-- état initial -->
  <text x="150" y="22" text-anchor="middle" font-size="13">État initial</text>
  <path d="M70,60 L70,240 L230,240 L230,60" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <rect x="71" y="100" width="158" height="139" fill="hsl(217 91% 60%)" fill-opacity="0.35"/>
  <rect x="140" y="40" width="20" height="170" fill="hsl(220 10% 60%)" stroke="currentColor"/>
  <text x="150" y="34" text-anchor="middle">lame de zinc Zn(s)</text>
  <text x="150" y="262" text-anchor="middle">solution bleue de Cu²⁺(aq) + SO₄²⁻(aq)</text>
  <!-- flèche -->
  <line x1="260" y1="150" x2="370" y2="150" stroke="currentColor" stroke-width="1.5" marker-end="url(#pc2-arr)"/>
  <text x="315" y="140" text-anchor="middle">quelques heures</text>
  <!-- état final -->
  <text x="490" y="22" text-anchor="middle" font-size="13">État final</text>
  <path d="M410,60 L410,240 L570,240 L570,60" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <rect x="411" y="100" width="158" height="139" fill="hsl(217 91% 60%)" fill-opacity="0.06"/>
  <rect x="480" y="40" width="20" height="170" fill="hsl(220 10% 60%)" stroke="currentColor"/>
  <rect x="476" y="100" width="4" height="110" fill="hsl(25 80% 45%)"/>
  <rect x="500" y="100" width="4" height="110" fill="hsl(25 80% 45%)"/>
  <text x="530" y="160" fill="hsl(25 80% 45%)">dépôt de Cu(s)</text>
  <text x="490" y="262" text-anchor="middle">solution décolorée : Zn²⁺(aq) + SO₄²⁻(aq)</text>
  <!-- transfert -->
  <g transform="translate(150 150)">
    <circle cx="-30" cy="20" r="11" fill="none" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>
    <text x="-30" y="24" text-anchor="middle" font-size="9">Cu²⁺</text>
    <path d="M-2,8 C-10,-2 -20,0 -24,10" fill="none" stroke="hsl(0 84% 60%)" stroke-width="1.5" marker-end="url(#pc2-arr)"/>
    <text x="-14" y="-6" text-anchor="middle" fill="hsl(0 84% 60%)" font-size="11">2 e⁻</text>
  </g>
</svg>`

const svgTransfert = `<svg viewBox="0 0 600 170" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="13">
  <defs><marker id="pc2-arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
  <rect x="20" y="40" width="200" height="70" fill="none" stroke="hsl(142 71% 45%)" stroke-width="1.5"/>
  <text x="120" y="68" text-anchor="middle">Réducteur Red₂</text>
  <text x="120" y="90" text-anchor="middle" font-size="11">cède des électrons → est oxydé</text>
  <rect x="380" y="40" width="200" height="70" fill="none" stroke="hsl(0 84% 60%)" stroke-width="1.5"/>
  <text x="480" y="68" text-anchor="middle">Oxydant Ox₁</text>
  <text x="480" y="90" text-anchor="middle" font-size="11">capte des électrons → est réduit</text>
  <line x1="225" y1="75" x2="372" y2="75" stroke="currentColor" stroke-width="2" marker-end="url(#pc2-arr2)"/>
  <text x="300" y="65" text-anchor="middle">n e⁻</text>
  <text x="300" y="145" text-anchor="middle">Ox₁ + Red₂ → Red₁ + Ox₂ : transfert d’électrons du réducteur d’un couple vers l’oxydant d’un autre couple</text>
</svg>`

const svgBarres = `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
  <text x="280" y="20" text-anchor="middle" font-size="13">CH₄ + 2 O₂ → CO₂ + 2 H₂O : quantités (mol) en fonction de x</text>
  <line x1="60" y1="220" x2="520" y2="220" stroke="currentColor"/>
  <line x1="60" y1="220" x2="60" y2="40" stroke="currentColor"/>
  <text x="520" y="240" text-anchor="end">x (mol)</text>
  <text x="66" y="44">n (mol)</text>
  <text x="60" y="236" text-anchor="middle">0</text><text x="460" y="236" text-anchor="middle">0,40</text>
  <text x="260" y="236" text-anchor="middle">0,20</text>
  <text x="54" y="224" text-anchor="end">0</text><text x="54" y="144" text-anchor="end">0,40</text><text x="54" y="64" text-anchor="end">0,80</text>
  <line x1="60" y1="120" x2="460" y2="200" stroke="hsl(217 91% 60%)" stroke-width="2"/>
  <text x="466" y="200" fill="hsl(217 91% 60%)">CH₄ : 0,50 − x</text>
  <line x1="60" y1="60" x2="460" y2="220" stroke="hsl(0 84% 60%)" stroke-width="2"/>
  <text x="380" y="176" fill="hsl(0 84% 60%)">O₂ : 0,80 − 2x</text>
  <line x1="60" y1="220" x2="460" y2="140" stroke="hsl(142 71% 45%)" stroke-width="2"/>
  <text x="466" y="140" fill="hsl(142 71% 45%)">CO₂ : x</text>
  <line x1="60" y1="220" x2="460" y2="60" stroke="hsl(25 95% 53%)" stroke-width="2"/>
  <text x="466" y="60" fill="hsl(25 95% 53%)">H₂O : 2x</text>
  <line x1="460" y1="40" x2="460" y2="220" stroke="currentColor" stroke-dasharray="4 4"/>
  <text x="456" y="36" text-anchor="end">x_max = 0,40 mol (O₂ épuisé)</text>
</svg>`

const chapter: Chapter = {
  id: 'oxydoreduction-avancement',
  subject: 'physique-chimie',
  order: 2,
  title: 'Oxydoréduction et avancement',
  theme: 'Constitution et transformations de la matière',
  summary:
    'Couples oxydant/réducteur, demi-équations électroniques et équations d’oxydoréduction ; suivi de l’évolution d’un système grâce au tableau d’avancement : avancement maximal, réactif limitant, mélange stœchiométrique.',
  duration: '3 semaines',
  objectives: [
    'Identifier, à partir de données expérimentales, des espèces chimiques oxydantes ou réductrices.',
    'Écrire une demi-équation électronique d’un couple oxydant/réducteur donné, en milieu acide.',
    'Établir l’équation d’une réaction d’oxydoréduction à partir de deux demi-équations.',
    'Citer et justifier le caractère oxydant ou réducteur d’espèces usuelles (dioxygène, dichlore, eau de Javel, acide ascorbique, métaux…).',
    'Décrire qualitativement l’évolution des quantités de matière au cours d’une transformation.',
    'Établir un tableau d’avancement, déterminer l’avancement maximal et le réactif limitant.',
    'Déterminer la composition de l’état final ; distinguer transformation totale et non totale.',
    'Reconnaître et réaliser un mélange stœchiométrique.',
  ],
  keywords: [
    'oxydant',
    'réducteur',
    'couple Ox/Red',
    'demi-équation',
    'oxydation',
    'réduction',
    'avancement',
    'tableau d’avancement',
    'réactif limitant',
    'avancement maximal',
    'stœchiométrie',
  ],

  // ------------------------------------------------------------------ FICHE
  fiche: [
    { type: 'h2', text: 'Oxydoréduction' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Oxydant', value: 'espèce capable de **capter** un ou plusieurs électrons.' },
        { key: 'Réducteur', value: 'espèce capable de **céder** un ou plusieurs électrons.' },
        { key: 'Couple Ox/Red', value: r`relié par la demi-équation $\mathrm{Ox} + n\,e^- = \mathrm{Red}$.` },
        { key: 'Oxydation', value: 'perte d’électrons (subie par le réducteur).' },
        { key: 'Réduction', value: 'gain d’électrons (subi par l’oxydant).' },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Équilibrer une demi-équation en milieu acide',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire Ox = Red et conserver les éléments autres que O et H.',
            r`Conserver O avec des molécules $\mathrm{H_2O}$.`,
            r`Conserver H avec des ions $\mathrm{H^+}$.`,
            r`Conserver la charge avec des électrons $e^-$ (du côté de l'oxydant).`,
          ],
        },
        { type: 'math', tex: r`\mathrm{MnO_4^- + 8\,H^+ + 5\,e^- = Mn^{2+} + 4\,H_2O}` },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Équation d’oxydoréduction',
      content: [
        {
          type: 'p',
          text: r`$\mathrm{Ox_1} + \mathrm{Red_2} \to \mathrm{Red_1} + \mathrm{Ox_2}$ : on combine les deux demi-équations (multipliées si besoin) de sorte que **les électrons n'apparaissent plus** (nombre cédé = nombre capté).`,
        },
        { type: 'math', tex: r`\mathrm{MnO_4^- + 5\,Fe^{2+} + 8\,H^+ \to Mn^{2+} + 5\,Fe^{3+} + 4\,H_2O}` },
      ],
    },
    { type: 'h2', text: 'Avancement' },
    {
      type: 'table',
      headers: ['État', 'Avancement', r`$a\,\mathrm{A}$`, r`$+\ b\,\mathrm{B}$`, r`$\to c\,\mathrm{C}$`, r`$+\ d\,\mathrm{D}$`],
      rows: [
        ['initial', '$0$', r`$n_A$`, r`$n_B$`, '$0$', '$0$'],
        ['en cours', '$x$', r`$n_A - ax$`, r`$n_B - bx$`, '$cx$', '$dx$'],
        ['final', r`$x_f$`, r`$n_A - ax_f$`, r`$n_B - bx_f$`, r`$cx_f$`, r`$dx_f$`],
      ],
    },
    {
      type: 'list',
      items: [
        r`**Avancement maximal** $x_{\max}$ : plus petite des valeurs $\dfrac{n_A}{a}$ et $\dfrac{n_B}{b}$ ; le réactif correspondant est le **réactif limitant**.`,
        r`Transformation **totale** : $x_f = x_{\max}$ ; **non totale** : $x_f < x_{\max}$.`,
        r`**Mélange stœchiométrique** : $\dfrac{n_A}{a} = \dfrac{n_B}{b}$ ; tous les réactifs sont épuisés en fin de transformation totale.`,
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Oxydants et réducteurs usuels',
      content: [
        {
          type: 'p',
          text: r`Oxydants : $\mathrm{O_2}$, $\mathrm{Cl_2}$, eau de Javel $\mathrm{ClO^-}$, $\mathrm{MnO_4^-}$, $\mathrm{H_2O_2}$, $\mathrm{I_2}$. Réducteurs : métaux (Zn, Fe, Al…), $\mathrm{H_2}$, acide ascorbique (vitamine C), $\mathrm{I^-}$, $\mathrm{S_2O_3^{2-}}$, $\mathrm{Fe^{2+}}$.`,
        },
      ],
    },
  ],

  // ------------------------------------------------------------------ COURS
  cours: [
    { type: 'h2', text: '1. Une expérience introductive' },
    {
      type: 'p',
      text: 'Plongeons une lame de zinc dans une solution bleue de sulfate de cuivre. Après quelques heures, on observe : un **dépôt rougeâtre de cuivre** sur la lame, la **décoloration** de la solution (disparition des ions Cu²⁺ bleus) et l’apparition d’ions Zn²⁺ (mis en évidence par un précipité blanc avec la soude).',
    },
    { type: 'svg', svg: svgZincCuivre, caption: 'Réaction entre le zinc métallique et les ions cuivre(II).' },
    {
      type: 'p',
      text: r`Chaque atome de zinc a **perdu** deux électrons ($\mathrm{Zn} \to \mathrm{Zn^{2+}} + 2\,e^-$) et chaque ion cuivre(II) en a **gagné** deux ($\mathrm{Cu^{2+}} + 2\,e^- \to \mathrm{Cu}$). Il y a eu **transfert d'électrons** du zinc vers les ions cuivre : c'est une **réaction d'oxydoréduction**.`,
    },
    { type: 'math', tex: r`\mathrm{Zn(s) + Cu^{2+}(aq) \to Zn^{2+}(aq) + Cu(s)}` },
    { type: 'h2', text: '2. Oxydants, réducteurs et couples' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Oxydant et réducteur',
      content: [
        {
          type: 'list',
          items: [
            'Un **oxydant** est une espèce chimique capable de **capter** un ou plusieurs électrons.',
            'Un **réducteur** est une espèce chimique capable de **céder** un ou plusieurs électrons.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Couple oxydant/réducteur et demi-équation électronique',
      content: [
        {
          type: 'p',
          text: 'Un oxydant et un réducteur sont **conjugués** s’ils se transforment l’un en l’autre par gain ou perte d’électrons. Ils forment un **couple** noté **Ox/Red** (oxydant toujours écrit en premier). On lui associe une **demi-équation électronique** :',
        },
        { type: 'math', tex: r`\mathrm{Ox} + n\,e^- = \mathrm{Red}` },
        { type: 'p', text: 'Le signe « = » indique que l’échange peut se faire dans les deux sens.' },
      ],
    },
    {
      type: 'table',
      headers: ['Couple', 'Demi-équation électronique'],
      rows: [
        [r`$\mathrm{Cu^{2+}/Cu}$`, r`$\mathrm{Cu^{2+} + 2\,e^- = Cu}$`],
        [r`$\mathrm{Zn^{2+}/Zn}$`, r`$\mathrm{Zn^{2+} + 2\,e^- = Zn}$`],
        [r`$\mathrm{Fe^{2+}/Fe}$`, r`$\mathrm{Fe^{2+} + 2\,e^- = Fe}$`],
        [r`$\mathrm{Fe^{3+}/Fe^{2+}}$`, r`$\mathrm{Fe^{3+} + e^- = Fe^{2+}}$`],
        [r`$\mathrm{Ag^{+}/Ag}$`, r`$\mathrm{Ag^{+} + e^- = Ag}$`],
        [r`$\mathrm{Al^{3+}/Al}$`, r`$\mathrm{Al^{3+} + 3\,e^- = Al}$`],
        [r`$\mathrm{H^{+}/H_2}$`, r`$\mathrm{2\,H^{+} + 2\,e^- = H_2}$`],
        [r`$\mathrm{I_2/I^-}$`, r`$\mathrm{I_2 + 2\,e^- = 2\,I^-}$`],
        [r`$\mathrm{S_4O_6^{2-}/S_2O_3^{2-}}$`, r`$\mathrm{S_4O_6^{2-} + 2\,e^- = 2\,S_2O_3^{2-}}$`],
      ],
      caption: 'Quelques couples et leurs demi-équations.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Oxydation et réduction',
      content: [
        {
          type: 'list',
          items: [
            'Une **oxydation** est une **perte** d’électrons : le réducteur est oxydé (Red → Ox + n e⁻).',
            'Une **réduction** est un **gain** d’électrons : l’oxydant est réduit (Ox + n e⁻ → Red).',
          ],
        },
        { type: 'p', text: 'Moyen mnémotechnique : « **o**xydant **r**éduit, **r**éducteur **o**xydé » ; « l’oxydant gagne ».' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ne pas confondre',
      content: [
        {
          type: 'p',
          text: 'L’**oxydant** est l’espèce qui **subit une réduction** ; le **réducteur** est l’espèce qui **subit une oxydation**. Un même corps peut être oxydant dans un couple et réducteur dans un autre : c’est le cas de $\\mathrm{H_2O_2}$ (couples $\\mathrm{H_2O_2/H_2O}$ et $\\mathrm{O_2/H_2O_2}$) ou de $\\mathrm{Fe^{2+}}$ (couples $\\mathrm{Fe^{2+}/Fe}$ et $\\mathrm{Fe^{3+}/Fe^{2+}}$).',
        },
      ],
    },
    { type: 'h2', text: '3. Écrire une demi-équation électronique' },
    {
      type: 'p',
      text: 'Pour les couples faisant intervenir l’oxygène (ions oxygénés, peroxyde d’hydrogène…), il faut ajouter des molécules d’eau et des ions $\\mathrm{H^+}$ (milieu acide).',
    },
    {
      type: 'steps',
      items: [
        { title: 'Squelette', text: 'Écrire l’oxydant à gauche, le réducteur à droite, séparés par « = ». Assurer la conservation des éléments autres que O et H (coefficients).' },
        { title: 'Oxygène', text: 'Équilibrer les atomes O en ajoutant des molécules H₂O du côté qui en manque.' },
        { title: 'Hydrogène', text: 'Équilibrer les atomes H en ajoutant des ions H⁺ du côté qui en manque.' },
        { title: 'Charges', text: 'Équilibrer les charges électriques en ajoutant des électrons e⁻ (toujours du côté de l’oxydant).' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : couple MnO₄⁻/Mn²⁺',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`Squelette : $\mathrm{MnO_4^- = Mn^{2+}}$ (Mn déjà équilibré).`,
            r`4 O à gauche : $\mathrm{MnO_4^- = Mn^{2+} + 4\,H_2O}$.`,
            r`8 H à droite : $\mathrm{MnO_4^- + 8\,H^+ = Mn^{2+} + 4\,H_2O}$.`,
            r`Charges : à gauche $-1 + 8 = +7$, à droite $+2$. On ajoute 5 électrons à gauche : $\mathrm{MnO_4^- + 8\,H^+ + 5\,e^- = Mn^{2+} + 4\,H_2O}$.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : couple Cr₂O₇²⁻/Cr³⁺',
      content: [
        {
          type: 'p',
          text: r`$\mathrm{Cr_2O_7^{2-} = 2\,Cr^{3+}}$ → $\mathrm{Cr_2O_7^{2-} = 2\,Cr^{3+} + 7\,H_2O}$ → $\mathrm{Cr_2O_7^{2-} + 14\,H^+ = 2\,Cr^{3+} + 7\,H_2O}$.\nCharges : $-2 + 14 = +12$ à gauche, $2\times(+3) = +6$ à droite : on ajoute $6\,e^-$ à gauche.`,
        },
        { type: 'math', tex: r`\mathrm{Cr_2O_7^{2-} + 14\,H^+ + 6\,e^- = 2\,Cr^{3+} + 7\,H_2O}` },
      ],
    },
    {
      type: 'table',
      headers: ['Couple', 'Demi-équation (milieu acide)'],
      rows: [
        [r`$\mathrm{H_2O_2/H_2O}$`, r`$\mathrm{H_2O_2 + 2\,H^+ + 2\,e^- = 2\,H_2O}$`],
        [r`$\mathrm{O_2/H_2O_2}$`, r`$\mathrm{O_2 + 2\,H^+ + 2\,e^- = H_2O_2}$`],
        [r`$\mathrm{O_2/H_2O}$`, r`$\mathrm{O_2 + 4\,H^+ + 4\,e^- = 2\,H_2O}$`],
        [r`$\mathrm{ClO^-/Cl_2}$`, r`$\mathrm{2\,ClO^- + 4\,H^+ + 2\,e^- = Cl_2 + 2\,H_2O}$`],
        [r`$\mathrm{Cl_2/Cl^-}$`, r`$\mathrm{Cl_2 + 2\,e^- = 2\,Cl^-}$`],
        [r`$\mathrm{C_6H_6O_6/C_6H_8O_6}$ (vitamine C)`, r`$\mathrm{C_6H_6O_6 + 2\,H^+ + 2\,e^- = C_6H_8O_6}$`],
        [r`$\mathrm{SO_4^{2-}/SO_2}$`, r`$\mathrm{SO_4^{2-} + 4\,H^+ + 2\,e^- = SO_2 + 2\,H_2O}$`],
      ],
      caption: 'Demi-équations à savoir retrouver.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Vérification',
      content: [
        {
          type: 'p',
          text: 'Toujours vérifier à la fin : même nombre d’atomes de chaque élément de part et d’autre, et même charge totale de part et d’autre.',
        },
      ],
    },
    { type: 'h2', text: '4. Réaction d’oxydoréduction' },
    { type: 'svg', svg: svgTransfert, caption: 'Une réaction d’oxydoréduction est un transfert d’électrons entre deux couples.' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Réaction d’oxydoréduction',
      content: [
        {
          type: 'p',
          text: r`Une réaction d'oxydoréduction met en jeu deux couples $\mathrm{Ox_1/Red_1}$ et $\mathrm{Ox_2/Red_2}$ : l'oxydant de l'un réagit avec le réducteur de l'autre par **transfert d'électrons**. Les électrons n'existent pas libres en solution : ils **n'apparaissent jamais** dans l'équation de réaction.`,
        },
        { type: 'math', tex: r`\alpha\,\mathrm{Ox_1} + \beta\,\mathrm{Red_2} \to \alpha\,\mathrm{Red_1} + \beta\,\mathrm{Ox_2}` },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Identifier les couples', text: 'Repérer l’oxydant qui réagit (réactif) et son réducteur conjugué (produit), puis le réducteur qui réagit et son oxydant conjugué.' },
        { title: 'Écrire les demi-équations', text: 'Dans le sens de la transformation : Ox₁ + n₁ e⁻ → Red₁ et Red₂ → Ox₂ + n₂ e⁻.' },
        { title: 'Égaliser les électrons', text: 'Multiplier les demi-équations pour que le nombre d’électrons cédés soit égal au nombre d’électrons captés (PPCM de n₁ et n₂).' },
        { title: 'Additionner et simplifier', text: 'Sommer membre à membre, supprimer les électrons et simplifier les H⁺ et H₂O présents des deux côtés.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : ions permanganate et ions fer(II)',
      content: [
        { type: 'math', tex: r`\begin{aligned}\mathrm{MnO_4^- + 8\,H^+ + 5\,e^-} &\to \mathrm{Mn^{2+} + 4\,H_2O} &&(\times 1)\\ \mathrm{Fe^{2+}} &\to \mathrm{Fe^{3+} + e^-} &&(\times 5)\end{aligned}` },
        { type: 'math', tex: r`\mathrm{MnO_4^-(aq) + 5\,Fe^{2+}(aq) + 8\,H^+(aq) \to Mn^{2+}(aq) + 5\,Fe^{3+}(aq) + 4\,H_2O(\ell)}` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : diiode et ions thiosulfate',
      content: [
        { type: 'math', tex: r`\begin{aligned}\mathrm{I_2 + 2\,e^-} &\to \mathrm{2\,I^-}\\ \mathrm{2\,S_2O_3^{2-}} &\to \mathrm{S_4O_6^{2-} + 2\,e^-}\end{aligned}` },
        { type: 'math', tex: r`\mathrm{I_2(aq) + 2\,S_2O_3^{2-}(aq) \to 2\,I^-(aq) + S_4O_6^{2-}(aq)}` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : permanganate et eau oxygénée (simplification)',
      content: [
        {
          type: 'p',
          text: r`$\mathrm{MnO_4^- + 8\,H^+ + 5\,e^- \to Mn^{2+} + 4\,H_2O}$ ($\times2$) et $\mathrm{H_2O_2 \to O_2 + 2\,H^+ + 2\,e^-}$ ($\times5$).\nSomme : $\mathrm{2\,MnO_4^- + 16\,H^+ + 5\,H_2O_2 \to 2\,Mn^{2+} + 8\,H_2O + 5\,O_2 + 10\,H^+}$. On simplifie les $\mathrm{H^+}$ :`,
        },
        { type: 'math', tex: r`\mathrm{2\,MnO_4^- + 5\,H_2O_2 + 6\,H^+ \to 2\,Mn^{2+} + 5\,O_2 + 8\,H_2O}` },
      ],
    },
    { type: 'h3', text: 'Oxydants et réducteurs de la vie courante' },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Dioxygène O₂', text: 'Oxydant : corrosion du fer (rouille), combustions, respiration.', icon: 'Wind' },
        { title: 'Eau de Javel ClO⁻', text: 'Oxydant puissant : désinfection, blanchiment. Ne jamais mélanger avec un acide (dégagement de dichlore toxique).', icon: 'Droplets' },
        { title: 'Dichlore Cl₂', text: 'Oxydant : traitement de l’eau (piscines), gaz toxique.', icon: 'AlertTriangle' },
        { title: 'Eau oxygénée H₂O₂', text: 'Oxydant (antiseptique, décoloration) ; peut aussi être réducteur.', icon: 'FlaskConical' },
        { title: 'Métaux', text: 'Réducteurs : ils cèdent des électrons et donnent des cations (Zn → Zn²⁺, Fe → Fe²⁺).', icon: 'Hammer' },
        { title: 'Acide ascorbique', text: 'Vitamine C : réducteur, utilisé comme antioxydant alimentaire (E300).', icon: 'Citrus' },
      ],
    },
    { type: 'h2', text: '5. Évolution d’un système : l’avancement' },
    {
      type: 'p',
      text: 'Au cours d’une transformation chimique, les quantités de matière des réactifs diminuent et celles des produits augmentent, **dans des proportions fixées par les coefficients stœchiométriques** de l’équation.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Avancement',
      content: [
        {
          type: 'p',
          text: r`L'**avancement** $x$ (en mol) est la grandeur qui permet de décrire l'évolution des quantités de matière. Pour la réaction $a\,\mathrm{A} + b\,\mathrm{B} \to c\,\mathrm{C} + d\,\mathrm{D}$, lorsque l'avancement vaut $x$ : $ax$ mol de A et $bx$ mol de B ont été consommées, $cx$ mol de C et $dx$ mol de D ont été formées.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Tableau d’avancement : combustion du méthane',
      content: [
        {
          type: 'p',
          text: r`On fait brûler $n_0(\mathrm{CH_4}) = 0{,}50\ \mathrm{mol}$ de méthane dans $n_0(\mathrm{O_2}) = 0{,}80\ \mathrm{mol}$ de dioxygène.`,
        },
        {
          type: 'table',
          headers: ['État', 'Avancement (mol)', r`$\mathrm{CH_4}$`, r`$+\ 2\,\mathrm{O_2}$`, r`$\to\ \mathrm{CO_2}$`, r`$+\ 2\,\mathrm{H_2O}$`],
          rows: [
            ['initial', '$0$', '$0{,}50$', '$0{,}80$', '$0$', '$0$'],
            ['en cours', '$x$', '$0{,}50 - x$', '$0{,}80 - 2x$', '$x$', '$2x$'],
            ['final', r`$x_{\max} = 0{,}40$`, '$0{,}10$', '$0$', '$0{,}40$', '$0{,}80$'],
          ],
        },
        {
          type: 'p',
          text: r`Si $\mathrm{CH_4}$ est limitant : $0{,}50 - x_{\max} = 0$ donne $x_{\max} = 0{,}50$ mol. Si $\mathrm{O_2}$ est limitant : $0{,}80 - 2x_{\max} = 0$ donne $x_{\max} = 0{,}40$ mol. On retient la **plus petite** valeur : $x_{\max} = 0{,}40$ mol et le dioxygène est le réactif limitant.`,
        },
      ],
    },
    { type: 'svg', svg: svgBarres, caption: 'Évolution des quantités de matière en fonction de l’avancement : la transformation s’arrête quand un réactif est épuisé.' },
    { type: 'h2', text: '6. Avancement maximal et réactif limitant' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Réactif limitant, avancement maximal',
      content: [
        {
          type: 'p',
          text: r`Le **réactif limitant** est le réactif entièrement consommé lorsque la transformation est terminée (si elle est totale). L'**avancement maximal** $x_{\max}$ est la valeur de l'avancement pour laquelle le réactif limitant est épuisé :`,
        },
        { type: 'math', tex: r`x_{\max} = \min\left(\frac{n_{A,0}}{a}\ ;\ \frac{n_{B,0}}{b}\right)` },
        { type: 'p', text: 'L’autre réactif est dit **en excès**.' },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Équation', text: 'Écrire l’équation de réaction ajustée.' },
        { title: 'Quantités initiales', text: 'Calculer les quantités de matière initiales (n = m/M, n = CV, n = V/V_m…).' },
        { title: 'Tableau', text: 'Remplir l’état initial et l’état intermédiaire (n₀ − ax, cx…).' },
        { title: 'Hypothèses', text: 'Pour chaque réactif, résoudre n₀ − a·x_max = 0. Retenir la plus petite valeur : x_max ; identifier le réactif limitant.' },
        { title: 'État final', text: 'Remplacer x par x_max dans la ligne « en cours » ; vérifier qu’aucune quantité n’est négative.' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Erreurs classiques',
      content: [
        {
          type: 'list',
          items: [
            'Le réactif limitant n’est **pas forcément** celui qui a la plus petite quantité initiale : il faut tenir compte des coefficients (diviser par a, b).',
            'Les coefficients stœchiométriques concernent les **quantités de matière**, pas les masses ni les volumes de solution.',
            'Une espèce spectatrice (ex. SO₄²⁻) ou présente en large excès (H⁺, H₂O solvant) ne figure pas forcément dans le tableau ; on note alors « excès ».',
          ],
        },
      ],
    },
    { type: 'h2', text: '7. Transformation totale ou non totale' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Avancement final',
      content: [
        {
          type: 'list',
          items: [
            r`L'**avancement final** $x_f$ est l'avancement mesuré quand le système n'évolue plus.`,
            r`Si $x_f = x_{\max}$ : la transformation est **totale** (le réactif limitant a disparu).`,
            r`Si $x_f < x_{\max}$ : la transformation est **non totale** (tous les réactifs restent présents à l'état final ; un équilibre est atteint).`,
          ],
        },
        {
          type: 'p',
          text: 'Pour une transformation totale, on écrit l’équation avec une flèche simple « → ». Les réactions d’oxydoréduction étudiées cette année sont considérées comme totales.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Déterminer x_f expérimentalement',
      content: [
        {
          type: 'p',
          text: r`On mesure la quantité d'un produit à l'état final (volume de gaz recueilli, masse de solide, absorbance…). Ex. : si un gaz $\mathrm{G}$ de coefficient 1 est formé, $x_f = n_f(\mathrm{G}) = \dfrac{V_f(\mathrm{G})}{V_m}$, que l'on compare à $x_{\max}$.`,
        },
      ],
    },
    { type: 'h2', text: '8. Mélange stœchiométrique' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Proportions stœchiométriques',
      content: [
        {
          type: 'p',
          text: 'Les réactifs sont introduits dans les **proportions stœchiométriques** lorsque leurs quantités initiales sont dans le même rapport que leurs coefficients :',
        },
        { type: 'math', tex: r`\frac{n_{A,0}}{a} = \frac{n_{B,0}}{b}` },
        {
          type: 'p',
          text: 'Les deux réactifs sont alors **limitants simultanément** : à l’état final d’une transformation totale, il ne reste aucun réactif. Cette situation est fondamentale pour les **titrages** (équivalence, chapitre suivant).',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        {
          type: 'p',
          text: r`Pour $\mathrm{MnO_4^- + 5\,Fe^{2+} + 8\,H^+ \to Mn^{2+} + 5\,Fe^{3+} + 4\,H_2O}$, avec $n(\mathrm{Fe^{2+}}) = 1{,}0\times10^{-3}$ mol, le mélange est stœchiométrique si $n(\mathrm{MnO_4^-}) = \dfrac{1{,}0\times10^{-3}}{5} = 2{,}0\times10^{-4}$ mol (H⁺ en excès).`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'À retenir',
      content: [
        {
          type: 'list',
          items: [
            'Oxydant + n e⁻ = réducteur ; une oxydoréduction est un transfert d’électrons.',
            'Demi-équation : éléments, O (H₂O), H (H⁺), charges (e⁻).',
            r`$x_{\max}$ = plus petite des valeurs $n_{i,0}/\nu_i$ ; le réactif correspondant est limitant.`,
            r`Mélange stœchiométrique : $n_{A,0}/a = n_{B,0}/b$.`,
          ],
        },
      ],
    },
  ],

  // ------------------------------------------------------------------ EXERCICES
  exercices: [
    {
      id: 'identifier-couples',
      title: 'Identifier oxydants et réducteurs',
      difficulty: 1,
      duration: 6,
      tags: ['couples', 'vocabulaire'],
      statement: [
        { type: 'p', text: 'On considère la réaction entre le fer métallique et une solution d’ions argent :' },
        { type: 'math', tex: r`\mathrm{Fe(s) + 2\,Ag^+(aq) \to Fe^{2+}(aq) + 2\,Ag(s)}` },
        {
          type: 'list',
          ordered: true,
          items: [
            'Identifier les deux couples oxydant/réducteur mis en jeu et écrire leurs demi-équations.',
            'Quelle espèce est oxydée ? Quelle espèce est réduite ? Justifier.',
            'Combien d’électrons sont transférés lorsque 1 mol de fer réagit ?',
          ],
        },
      ],
      hints: ['Le fer devient Fe²⁺ : il perd des électrons.', 'Un couple = un oxydant et son réducteur conjugué.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`Couples $\mathrm{Fe^{2+}/Fe}$ : $\mathrm{Fe^{2+} + 2\,e^- = Fe}$ ; et $\mathrm{Ag^+/Ag}$ : $\mathrm{Ag^+ + e^- = Ag}$.`,
            r`Le fer **cède** des électrons ($\mathrm{Fe \to Fe^{2+} + 2\,e^-}$) : c'est le réducteur, il est **oxydé**. Les ions argent **captent** des électrons ($\mathrm{Ag^+ + e^- \to Ag}$) : ce sont les oxydants, ils sont **réduits**.`,
            r`Chaque atome de fer cède 2 électrons : pour 1 mol de fer, 2 mol d'électrons sont transférées (soit $2\times6{,}02\times10^{23} = 1{,}20\times10^{24}$ électrons).`,
          ],
        },
      ],
    },
    {
      id: 'demi-equations-acide',
      title: 'Équilibrer des demi-équations',
      difficulty: 2,
      duration: 12,
      tags: ['demi-équation', 'milieu acide'],
      statement: [
        { type: 'p', text: 'Écrire les demi-équations électroniques, en milieu acide, des couples suivants :' },
        {
          type: 'list',
          items: [
            r`a. $\mathrm{NO_3^-/NO}$`,
            r`b. $\mathrm{Cr_2O_7^{2-}/Cr^{3+}}$`,
            r`c. $\mathrm{O_2/H_2O}$`,
            r`d. $\mathrm{CH_3COOH/CH_3CH_2OH}$ (acide éthanoïque / éthanol)`,
          ],
        },
      ],
      hints: ['Méthode : éléments, puis O avec H₂O, puis H avec H⁺, puis charges avec e⁻.', 'd. Compter les C, puis O, puis H : l’éthanol contient 6 H, l’acide 4 H.'],
      solution: [
        {
          type: 'list',
          items: [
            r`a. $\mathrm{NO_3^- = NO + 2\,H_2O}$ → $\mathrm{NO_3^- + 4\,H^+ = NO + 2\,H_2O}$ ; charges : $+3$ à gauche, $0$ à droite → $\mathrm{NO_3^- + 4\,H^+ + 3\,e^- = NO + 2\,H_2O}$.`,
            r`b. $\mathrm{Cr_2O_7^{2-} + 14\,H^+ + 6\,e^- = 2\,Cr^{3+} + 7\,H_2O}$ (charges : $-2+14-6 = +6 = 2\times3$).`,
            r`c. $\mathrm{O_2 = 2\,H_2O}$ → $\mathrm{O_2 + 4\,H^+ = 2\,H_2O}$ → $\mathrm{O_2 + 4\,H^+ + 4\,e^- = 2\,H_2O}$.`,
            r`d. C équilibré (2 de chaque côté). O : 2 à gauche, 1 à droite → $\mathrm{CH_3COOH = CH_3CH_2OH + H_2O}$. H : 4 à gauche, 8 à droite → $\mathrm{CH_3COOH + 4\,H^+ = CH_3CH_2OH + H_2O}$. Charges : $+4$ à gauche → $\mathrm{CH_3COOH + 4\,H^+ + 4\,e^- = CH_3CH_2OH + H_2O}$.`,
          ],
        },
      ],
    },
    {
      id: 'equation-dichromate-fer',
      title: 'Établir une équation d’oxydoréduction',
      difficulty: 2,
      duration: 10,
      tags: ['équation', 'combinaison'],
      statement: [
        {
          type: 'p',
          text: r`Les ions dichromate $\mathrm{Cr_2O_7^{2-}}$ (orange) oxydent les ions fer(II) $\mathrm{Fe^{2+}}$ en milieu acide ; il se forme des ions $\mathrm{Cr^{3+}}$ (verts) et $\mathrm{Fe^{3+}}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire les deux demi-équations électroniques.',
            'En déduire l’équation de la réaction.',
            r`Écrire de même l'équation de la réaction entre les ions $\mathrm{MnO_4^-}$ et l'acide oxalique $\mathrm{H_2C_2O_4}$ (couple $\mathrm{CO_2/H_2C_2O_4}$).`,
          ],
        },
      ],
      hints: ['Le dichromate capte 6 électrons, le fer(II) en cède 1.', 'Couple CO₂/H₂C₂O₄ : 2 CO₂ + 2 H⁺ + 2 e⁻ = H₂C₂O₄.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$\mathrm{Cr_2O_7^{2-} + 14\,H^+ + 6\,e^- \to 2\,Cr^{3+} + 7\,H_2O}$ et $\mathrm{Fe^{2+} \to Fe^{3+} + e^-}$.`,
            r`On multiplie la seconde par 6 : $\mathrm{Cr_2O_7^{2-} + 6\,Fe^{2+} + 14\,H^+ \to 2\,Cr^{3+} + 6\,Fe^{3+} + 7\,H_2O}$. Vérification des charges : $-2 + 12 + 14 = +24$ ; $6 + 18 = +24$.`,
            r`$\mathrm{MnO_4^- + 8\,H^+ + 5\,e^- \to Mn^{2+} + 4\,H_2O}$ ($\times2$) ; $\mathrm{H_2C_2O_4 \to 2\,CO_2 + 2\,H^+ + 2\,e^-}$ ($\times5$). Somme et simplification des H⁺ ($16 - 10 = 6$) : $\mathrm{2\,MnO_4^- + 5\,H_2C_2O_4 + 6\,H^+ \to 2\,Mn^{2+} + 10\,CO_2 + 8\,H_2O}$.`,
          ],
        },
      ],
    },
    {
      id: 'avancement-methane',
      title: 'Premier tableau d’avancement',
      difficulty: 1,
      duration: 8,
      tags: ['tableau d’avancement', 'réactif limitant'],
      statement: [
        {
          type: 'p',
          text: r`On réalise la combustion de $0{,}30\ \mathrm{mol}$ de propane $\mathrm{C_3H_8}$ dans $1{,}20\ \mathrm{mol}$ de dioxygène : $\mathrm{C_3H_8 + 5\,O_2 \to 3\,CO_2 + 4\,H_2O}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: ['Construire le tableau d’avancement.', 'Déterminer l’avancement maximal et le réactif limitant.', 'Donner la composition du système à l’état final (transformation totale).'],
        },
      ],
      hints: ['Comparer 0,30/1 et 1,20/5.'],
      solution: [
        {
          type: 'table',
          headers: ['État', 'x (mol)', r`$\mathrm{C_3H_8}$`, r`$5\,\mathrm{O_2}$`, r`$3\,\mathrm{CO_2}$`, r`$4\,\mathrm{H_2O}$`],
          rows: [
            ['initial', '0', '0,30', '1,20', '0', '0'],
            ['en cours', 'x', '0,30 − x', '1,20 − 5x', '3x', '4x'],
            ['final', '0,24', '0,06', '0', '0,72', '0,96'],
          ],
        },
        {
          type: 'p',
          text: r`Si $\mathrm{C_3H_8}$ est limitant : $x_{\max} = 0{,}30$ mol ; si $\mathrm{O_2}$ est limitant : $1{,}20 - 5x_{\max} = 0$, $x_{\max} = 0{,}24$ mol. On retient la plus petite : $x_{\max} = 0{,}24$ mol, **le dioxygène est limitant** (bien qu'il soit initialement en plus grande quantité !).\nÉtat final : $0{,}06$ mol de propane, $0$ mol de dioxygène, $3\times0{,}24 = 0{,}72$ mol de $\mathrm{CO_2}$ et $4\times0{,}24 = 0{,}96$ mol d'eau.`,
        },
      ],
    },
    {
      id: 'zinc-cuivre',
      title: 'Zinc et ions cuivre(II)',
      difficulty: 2,
      duration: 15,
      tags: ['oxydoréduction', 'avancement', 'masses'],
      statement: [
        {
          type: 'p',
          text: r`On introduit $m = 1{,}30\ \mathrm{g}$ de poudre de zinc dans $V = 100{,}0\ \mathrm{mL}$ de solution de sulfate de cuivre de concentration $C = 0{,}100\ \mathrm{mol\cdot L^{-1}}$. La solution se décolore.\nDonnées : $M(\mathrm{Zn}) = 65{,}4$ ; $M(\mathrm{Cu}) = 63{,}5\ \mathrm{g\cdot mol^{-1}}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire l’équation de la réaction à partir des demi-équations.',
            'Calculer les quantités de matière initiales des réactifs.',
            'Déterminer x_max et le réactif limitant. La décoloration totale était-elle prévisible ?',
            'Calculer la masse de cuivre formé et la masse de zinc restant.',
            r`Calculer la concentration finale en ions $\mathrm{Zn^{2+}}$ (volume inchangé).`,
          ],
        },
      ],
      hints: ['n(Zn) = m/M ; n(Cu²⁺) = C × V.', 'Les coefficients sont tous égaux à 1.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$\mathrm{Zn \to Zn^{2+} + 2\,e^-}$ et $\mathrm{Cu^{2+} + 2\,e^- \to Cu}$ ; d'où $\mathrm{Zn(s) + Cu^{2+}(aq) \to Zn^{2+}(aq) + Cu(s)}$.`,
            r`$n_0(\mathrm{Zn}) = \dfrac{1{,}30}{65{,}4} = 1{,}99\times10^{-2}\ \mathrm{mol}$ ; $n_0(\mathrm{Cu^{2+}}) = 0{,}100\times0{,}1000 = 1{,}00\times10^{-2}\ \mathrm{mol}$.`,
            r`Coefficients égaux à 1 : $x_{\max} = \min(1{,}99\times10^{-2}\,;\,1{,}00\times10^{-2}) = 1{,}00\times10^{-2}$ mol. Les ions $\mathrm{Cu^{2+}}$ sont limitants : ils disparaissent totalement, la solution bleue se décolore, ce qui est cohérent.`,
            r`$m(\mathrm{Cu}) = x_{\max}\times M(\mathrm{Cu}) = 1{,}00\times10^{-2}\times63{,}5 = 0{,}635\ \mathrm{g}$.\n$n_f(\mathrm{Zn}) = 1{,}988\times10^{-2} - 1{,}00\times10^{-2} = 9{,}88\times10^{-3}$ mol, soit $m = 9{,}88\times10^{-3}\times65{,}4 = 0{,}646\ \mathrm{g}$.`,
            r`$[\mathrm{Zn^{2+}}]_f = \dfrac{x_{\max}}{V} = \dfrac{1{,}00\times10^{-2}}{0{,}1000} = 0{,}100\ \mathrm{mol\cdot L^{-1}}$.`,
          ],
        },
      ],
    },
    {
      id: 'aluminium-cuivre',
      title: 'Aluminium et ions cuivre : attention aux coefficients',
      difficulty: 2,
      duration: 15,
      tags: ['coefficients', 'réactif limitant'],
      statement: [
        {
          type: 'p',
          text: r`On plonge $0{,}54\ \mathrm{g}$ d'aluminium dans $200{,}0\ \mathrm{mL}$ de solution de sulfate de cuivre à $0{,}12\ \mathrm{mol\cdot L^{-1}}$.\nDonnées : $M(\mathrm{Al}) = 27{,}0$ ; $M(\mathrm{Cu}) = 63{,}5\ \mathrm{g\cdot mol^{-1}}$ ; couple $\mathrm{Al^{3+}/Al}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: ['Établir l’équation de la réaction.', 'Dresser le tableau d’avancement et déterminer le réactif limitant.', 'Calculer la masse de cuivre déposé.'],
        },
      ],
      hints: ['Al cède 3 électrons, Cu²⁺ en capte 2 : PPCM = 6.', 'Diviser chaque quantité initiale par son coefficient.'],
      solution: [
        {
          type: 'p',
          text: r`**1.** $\mathrm{Al \to Al^{3+} + 3\,e^-}$ ($\times2$) et $\mathrm{Cu^{2+} + 2\,e^- \to Cu}$ ($\times3$) : $\mathrm{2\,Al + 3\,Cu^{2+} \to 2\,Al^{3+} + 3\,Cu}$.`,
        },
        {
          type: 'p',
          text: r`**2.** $n_0(\mathrm{Al}) = \dfrac{0{,}54}{27{,}0} = 2{,}0\times10^{-2}$ mol ; $n_0(\mathrm{Cu^{2+}}) = 0{,}12\times0{,}2000 = 2{,}4\times10^{-2}$ mol.`,
        },
        {
          type: 'table',
          headers: ['État', 'x (mol)', '2 Al', '3 Cu²⁺', '2 Al³⁺', '3 Cu'],
          rows: [
            ['initial', '0', '2,0 × 10⁻²', '2,4 × 10⁻²', '0', '0'],
            ['en cours', 'x', '2,0 × 10⁻² − 2x', '2,4 × 10⁻² − 3x', '2x', '3x'],
            ['final', '8,0 × 10⁻³', '4,0 × 10⁻³', '0', '1,6 × 10⁻²', '2,4 × 10⁻²'],
          ],
        },
        {
          type: 'p',
          text: r`Hypothèse Al limitant : $x = 1{,}0\times10^{-2}$ mol ; hypothèse $\mathrm{Cu^{2+}}$ limitant : $x = 8{,}0\times10^{-3}$ mol. Donc $x_{\max} = 8{,}0\times10^{-3}$ mol et **les ions cuivre(II) sont limitants**, alors qu'ils sont initialement plus nombreux que les atomes d'aluminium.`,
        },
        {
          type: 'p',
          text: r`**3.** $n(\mathrm{Cu}) = 3x_{\max} = 2{,}4\times10^{-2}$ mol ; $m(\mathrm{Cu}) = 2{,}4\times10^{-2}\times63{,}5 = 1{,}5\ \mathrm{g}$.`,
        },
      ],
    },
    {
      id: 'stoechiometrique-iodure',
      title: 'Réaliser un mélange stœchiométrique',
      difficulty: 2,
      duration: 10,
      tags: ['stœchiométrie'],
      statement: [
        {
          type: 'p',
          text: r`L'eau oxygénée oxyde les ions iodure en milieu acide : $\mathrm{H_2O_2 + 2\,I^- + 2\,H^+ \to I_2 + 2\,H_2O}$.\nOn dispose de $V_1 = 10{,}0\ \mathrm{mL}$ d'eau oxygénée à $C_1 = 0{,}100\ \mathrm{mol\cdot L^{-1}}$ et d'une solution d'iodure de potassium à $C_2 = 0{,}200\ \mathrm{mol\cdot L^{-1}}$ (acide en excès).`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Retrouver les couples mis en jeu.',
            'Quel volume V₂ de solution d’iodure faut-il verser pour obtenir un mélange stœchiométrique ?',
            'Quelle quantité de diiode obtient-on alors ? Comment le repère-t-on visuellement ?',
          ],
        },
      ],
      hints: ['Mélange stœchiométrique : n(H₂O₂)/1 = n(I⁻)/2.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$\mathrm{H_2O_2/H_2O}$ ($\mathrm{H_2O_2 + 2\,H^+ + 2\,e^- = 2\,H_2O}$) et $\mathrm{I_2/I^-}$ ($\mathrm{I_2 + 2\,e^- = 2\,I^-}$).`,
            r`$n(\mathrm{H_2O_2}) = C_1V_1 = 0{,}100\times10{,}0\times10^{-3} = 1{,}00\times10^{-3}$ mol. Il faut $n(\mathrm{I^-}) = 2\,n(\mathrm{H_2O_2}) = 2{,}00\times10^{-3}$ mol, soit $V_2 = \dfrac{2{,}00\times10^{-3}}{0{,}200} = 1{,}00\times10^{-2}\ \mathrm{L} = 10{,}0\ \mathrm{mL}$.`,
            r`$x_{\max} = 1{,}00\times10^{-3}$ mol, donc $n(\mathrm{I_2}) = 1{,}00\times10^{-3}$ mol. Le diiode colore la solution en jaune-brun (bleu foncé en présence d'empois d'amidon).`,
          ],
        },
      ],
    },
    {
      id: 'bac-clou-acide',
      title: 'Type bac : attaque d’un clou par l’acide chlorhydrique',
      difficulty: 3,
      duration: 25,
      tags: ['type bac', 'gaz', 'transformation totale'],
      statement: [
        {
          type: 'p',
          text: r`On introduit un clou en fer de masse $m = 0{,}56\ \mathrm{g}$ dans $V = 50{,}0\ \mathrm{mL}$ d'acide chlorhydrique ($\mathrm{H^+(aq) + Cl^-(aq)}$) de concentration $C = 1{,}0\ \mathrm{mol\cdot L^{-1}}$. Un gaz se dégage ; il produit une légère détonation à l'approche d'une flamme. Le gaz est recueilli par déplacement d'eau : en fin de réaction on mesure $V_{\text{gaz}} = 0{,}24\ \mathrm{L}$ à 20 °C.\nDonnées : $M(\mathrm{Fe}) = 55{,}8\ \mathrm{g\cdot mol^{-1}}$ ; $V_m = 24{,}0\ \mathrm{L\cdot mol^{-1}}$ ; couples $\mathrm{Fe^{2+}/Fe}$ et $\mathrm{H^+/H_2}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Identifier le gaz. Écrire les demi-équations et l’équation de la réaction. Préciser l’oxydant et le réducteur.',
            'Calculer les quantités de matière initiales des réactifs.',
            'Établir le tableau d’avancement ; déterminer x_max et le réactif limitant.',
            'Calculer l’avancement final à partir du volume de gaz mesuré. La transformation est-elle totale ?',
            r`Déterminer la concentration en ions $\mathrm{Fe^{2+}}$ et en ions $\mathrm{H^+}$ à l'état final.`,
            r`Quel volume minimal d'acide aurait-il fallu pour que le clou disparaisse en réalisant un mélange stœchiométrique ?`,
          ],
        },
      ],
      hints: [
        'La « détonation » caractérise le dihydrogène.',
        'n(H⁺) = C × V ; attention au coefficient 2 devant H⁺.',
        'x_f = n(H₂) = V_gaz / V_m.',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`Le gaz est le dihydrogène $\mathrm{H_2}$. $\mathrm{Fe \to Fe^{2+} + 2\,e^-}$ et $\mathrm{2\,H^+ + 2\,e^- \to H_2}$, d'où $\mathrm{Fe(s) + 2\,H^+(aq) \to Fe^{2+}(aq) + H_2(g)}$. L'oxydant est $\mathrm{H^+}$ (il capte des électrons), le réducteur est le fer (il en cède).`,
            r`$n_0(\mathrm{Fe}) = \dfrac{0{,}56}{55{,}8} = 1{,}0\times10^{-2}$ mol ; $n_0(\mathrm{H^+}) = 1{,}0\times0{,}0500 = 5{,}0\times10^{-2}$ mol.`,
            r`Tableau : Fe : $1{,}0\times10^{-2} - x$ ; $\mathrm{H^+}$ : $5{,}0\times10^{-2} - 2x$ ; $\mathrm{Fe^{2+}}$ : $x$ ; $\mathrm{H_2}$ : $x$. Hypothèses : $x = 1{,}0\times10^{-2}$ mol (Fe) ou $x = 2{,}5\times10^{-2}$ mol ($\mathrm{H^+}$). Donc $x_{\max} = 1{,}0\times10^{-2}$ mol : **le fer est limitant**.`,
            r`$x_f = n(\mathrm{H_2}) = \dfrac{0{,}24}{24{,}0} = 1{,}0\times10^{-2}$ mol $= x_{\max}$ : la transformation est **totale**.`,
            r`$[\mathrm{Fe^{2+}}]_f = \dfrac{1{,}0\times10^{-2}}{0{,}0500} = 0{,}20\ \mathrm{mol\cdot L^{-1}}$ ; $n_f(\mathrm{H^+}) = 5{,}0\times10^{-2} - 2\times1{,}0\times10^{-2} = 3{,}0\times10^{-2}$ mol, d'où $[\mathrm{H^+}]_f = \dfrac{3{,}0\times10^{-2}}{0{,}0500} = 0{,}60\ \mathrm{mol\cdot L^{-1}}$.`,
            r`Mélange stœchiométrique : $n(\mathrm{H^+}) = 2\,n_0(\mathrm{Fe}) = 2{,}0\times10^{-2}$ mol, soit $V_{\min} = \dfrac{2{,}0\times10^{-2}}{1{,}0} = 2{,}0\times10^{-2}\ \mathrm{L} = 20\ \mathrm{mL}$.`,
          ],
        },
      ],
    },
  ],

  // ------------------------------------------------------------------ REPRÉSENTATIONS
  representations: [
    {
      type: 'widget',
      id: 'advancement-table',
      title: 'Tableau d’avancement interactif : aluminium et ions cuivre(II)',
      props: {
        reaction: {
          reactants: [
            { formula: 'Al', coef: 2, n0: 0.02 },
            { formula: 'Cu²⁺', coef: 3, n0: 0.024 },
          ],
          products: [
            { formula: 'Al³⁺', coef: 2, n0: 0 },
            { formula: 'Cu', coef: 3, n0: 0 },
          ],
        },
      },
      caption: '2 Al + 3 Cu²⁺ → 2 Al³⁺ + 3 Cu (quantités en mol). Faites varier x : le réactif limitant est Cu²⁺ (x_max = 8,0 × 10⁻³ mol) bien qu’il soit initialement le plus abondant.',
    },
    {
      type: 'widget',
      id: 'advancement-table',
      title: 'Combustion du méthane',
      props: {
        reaction: {
          reactants: [
            { formula: 'CH₄', coef: 1, n0: 0.5 },
            { formula: 'O₂', coef: 2, n0: 0.8 },
          ],
          products: [
            { formula: 'CO₂', coef: 1, n0: 0 },
            { formula: 'H₂O', coef: 2, n0: 0 },
          ],
        },
      },
      caption: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O : x_max = 0,40 mol, le dioxygène est limitant. Modifiez les quantités initiales pour réaliser un mélange stœchiométrique.',
    },
    { type: 'svg', svg: svgZincCuivre, caption: 'Transfert d’électrons du zinc vers les ions cuivre(II).' },
    { type: 'svg', svg: svgBarres, caption: 'Quantités de matière en fonction de l’avancement.' },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Un oxydant est une espèce capable de :',
          choices: ['céder des électrons', 'capter des électrons', 'céder des protons', 'capter des protons'],
          answer: 1,
          explanation: 'Ox + n e⁻ = Red : l’oxydant capte des électrons.',
        },
        {
          question: 'Dans la réaction Zn + Cu²⁺ → Zn²⁺ + Cu, le zinc :',
          choices: ['est réduit', 'est l’oxydant', 'est oxydé', 'ne réagit pas'],
          answer: 2,
          explanation: 'Zn → Zn²⁺ + 2 e⁻ : perte d’électrons, oxydation. Le zinc est le réducteur.',
        },
        {
          question: r`Combien d'électrons dans la demi-équation du couple $\mathrm{MnO_4^-/Mn^{2+}}$ ?`,
          choices: ['2', '3', '5', '8'],
          answer: 2,
          explanation: r`$\mathrm{MnO_4^- + 8\,H^+ + 5\,e^- = Mn^{2+} + 4\,H_2O}$.`,
        },
        {
          question: 'Dans une équation d’oxydoréduction, les électrons :',
          choices: ['apparaissent côté réactifs', 'apparaissent côté produits', 'n’apparaissent pas', 'apparaissent des deux côtés'],
          answer: 2,
          explanation: 'Les électrons cédés par le réducteur sont tous captés par l’oxydant.',
        },
        {
          question: 'Pour A + 3 B → 2 C avec n(A) = 2 mol et n(B) = 3 mol, le réactif limitant est :',
          choices: ['A', 'B', 'aucun (stœchiométrique)', 'C'],
          answer: 1,
          explanation: 'n(A)/1 = 2 ; n(B)/3 = 1 : B est limitant, x_max = 1 mol.',
        },
        {
          question: 'Pour A + 2 B → C, le mélange est stœchiométrique si :',
          choices: ['n(A) = n(B)', 'n(B) = 2 n(A)', 'n(A) = 2 n(B)', 'm(A) = m(B)'],
          answer: 1,
          explanation: 'n(A)/1 = n(B)/2 ⇔ n(B) = 2 n(A).',
        },
        {
          question: 'Une transformation est totale si :',
          choices: ['x_f > x_max', 'x_f = x_max', 'x_f < x_max', 'x_f = 0'],
          answer: 1,
          explanation: 'Le réactif limitant est alors entièrement consommé.',
        },
        {
          question: 'L’eau de Javel est :',
          choices: ['un réducteur', 'un oxydant', 'ni oxydant ni réducteur', 'un métal'],
          answer: 1,
          explanation: 'L’ion hypochlorite ClO⁻ est un oxydant puissant (couple ClO⁻/Cl₂ ou ClO⁻/Cl⁻).',
        },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque couple à sa demi-équation',
      pairs: [
        { left: 'Fe³⁺/Fe²⁺', right: 'Fe³⁺ + e⁻ = Fe²⁺' },
        { left: 'I₂/I⁻', right: 'I₂ + 2 e⁻ = 2 I⁻' },
        { left: 'H⁺/H₂', right: '2 H⁺ + 2 e⁻ = H₂' },
        { left: 'Al³⁺/Al', right: 'Al³⁺ + 3 e⁻ = Al' },
        { left: 'H₂O₂/H₂O', right: 'H₂O₂ + 2 H⁺ + 2 e⁻ = 2 H₂O' },
        { left: 'S₄O₆²⁻/S₂O₃²⁻', right: 'S₄O₆²⁻ + 2 e⁻ = 2 S₂O₃²⁻' },
      ],
    },
    {
      type: 'ordering',
      title: 'Ordre des étapes pour équilibrer une demi-équation en milieu acide',
      items: [
        'Écrire Ox = Red et équilibrer les éléments autres que O et H',
        'Équilibrer O avec des molécules H₂O',
        'Équilibrer H avec des ions H⁺',
        'Équilibrer les charges avec des électrons',
        'Vérifier éléments et charges',
      ],
    },
    {
      type: 'cloze',
      title: 'Vocabulaire',
      text: 'Un réducteur {{cède}} des électrons : il subit une {{oxydation}}. Un oxydant {{capte}} des électrons : il subit une {{réduction}}. Le réactif entièrement consommé est le réactif {{limitant}} ; l’avancement correspondant est l’avancement {{maximal}}.',
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Oxydant', back: 'Espèce capable de capter un ou plusieurs électrons.' },
        { front: 'Réducteur', back: 'Espèce capable de céder un ou plusieurs électrons.' },
        { front: 'Oxydation', back: 'Perte d’électrons, subie par un réducteur.' },
        { front: 'Réduction', back: 'Gain d’électrons, subi par un oxydant.' },
        { front: 'Demi-équation de MnO₄⁻/Mn²⁺', back: r`$\mathrm{MnO_4^- + 8\,H^+ + 5\,e^- = Mn^{2+} + 4\,H_2O}$` },
        { front: 'Demi-équation de I₂/I⁻', back: r`$\mathrm{I_2 + 2\,e^- = 2\,I^-}$` },
        { front: 'Demi-équation de S₄O₆²⁻/S₂O₃²⁻', back: r`$\mathrm{S_4O_6^{2-} + 2\,e^- = 2\,S_2O_3^{2-}}$` },
        { front: 'Avancement maximal', back: r`$x_{\max} = \min(n_{A,0}/a\ ;\ n_{B,0}/b)$` },
        { front: 'Réactif limitant', back: 'Réactif entièrement consommé à la fin d’une transformation totale.' },
        { front: 'Mélange stœchiométrique', back: r`$n_{A,0}/a = n_{B,0}/b$ : tous les réactifs sont épuisés à la fin.` },
        { front: 'Transformation totale', back: r`$x_f = x_{\max}$` },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Le réactif limitant est toujours celui introduit en plus petite quantité.', answer: false, explanation: 'Il faut comparer les rapports n₀/coefficient.' },
        { text: 'Dans un couple Ox/Red, on écrit toujours l’oxydant en premier.', answer: true },
        { text: 'Un métal est en général un réducteur.', answer: true, explanation: 'Il cède des électrons pour former un cation.' },
        { text: 'H₂O₂ ne peut être qu’oxydant.', answer: false, explanation: 'Il est aussi le réducteur du couple O₂/H₂O₂.' },
        { text: 'L’avancement s’exprime en mol.', answer: true },
      ],
    },
  ],
}

export default chapter
