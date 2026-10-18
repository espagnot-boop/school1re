import type { Chapter } from '../types'

const r = String.raw

const FONT = 'font-family="Geist, sans-serif"'

const svgSpectro = `<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
  <defs>
    <marker id="pc1-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker>
    <linearGradient id="pc1-rainbow" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="hsl(270 80% 60%)"/><stop offset="0.2" stop-color="hsl(230 85% 60%)"/>
      <stop offset="0.4" stop-color="hsl(142 71% 45%)"/><stop offset="0.6" stop-color="hsl(55 95% 55%)"/>
      <stop offset="0.8" stop-color="hsl(25 95% 53%)"/><stop offset="1" stop-color="hsl(0 84% 60%)"/>
    </linearGradient>
  </defs>
  <rect x="10" y="10" width="660" height="180" fill="none" stroke="currentColor" stroke-dasharray="4 4" opacity="0.5"/>
  <!-- lampe -->
  <circle cx="60" cy="100" r="22" fill="none" stroke="currentColor"/>
  <path d="M50,100 q5,-12 10,0 q5,12 10,0" fill="none" stroke="hsl(25 95% 53%)" stroke-width="2"/>
  <text x="60" y="142" text-anchor="middle">Source</text>
  <text x="60" y="156" text-anchor="middle" class="svg-muted" fill="currentColor" opacity="0.7">lumière blanche</text>
  <line x1="84" y1="100" x2="150" y2="100" stroke="currentColor" stroke-width="2" marker-end="url(#pc1-arr)"/>
  <!-- monochromateur -->
  <polygon points="160,130 200,60 240,130" fill="none" stroke="currentColor"/>
  <path d="M220,96 L290,78 M220,96 L290,114" stroke="url(#pc1-rainbow)" stroke-width="3"/>
  <rect x="290" y="70" width="6" height="22" fill="currentColor"/>
  <rect x="290" y="104" width="6" height="22" fill="currentColor"/>
  <text x="225" y="150" text-anchor="middle">Monochromateur</text>
  <text x="225" y="164" text-anchor="middle" opacity="0.7">(réseau / prisme + fente)</text>
  <line x1="298" y1="98" x2="380" y2="98" stroke="hsl(142 71% 45%)" stroke-width="3" marker-end="url(#pc1-arr)"/>
  <text x="338" y="88" text-anchor="middle">I₀, λ fixée</text>
  <!-- cuve -->
  <rect x="390" y="62" width="40" height="72" fill="hsl(263 70% 60%)" fill-opacity="0.25" stroke="currentColor"/>
  <line x1="390" y1="148" x2="430" y2="148" stroke="currentColor" marker-start="url(#pc1-arr)" marker-end="url(#pc1-arr)"/>
  <text x="410" y="164" text-anchor="middle">ℓ (souvent 1 cm)</text>
  <text x="410" y="54" text-anchor="middle">Cuve + solution</text>
  <line x1="432" y1="98" x2="510" y2="98" stroke="hsl(142 71% 45%)" stroke-width="1.5" marker-end="url(#pc1-arr)"/>
  <text x="470" y="88" text-anchor="middle">I &lt; I₀</text>
  <!-- détecteur -->
  <rect x="515" y="74" width="34" height="48" fill="none" stroke="currentColor"/>
  <line x1="522" y1="80" x2="522" y2="116" stroke="currentColor"/>
  <text x="532" y="142" text-anchor="middle">Détecteur</text>
  <line x1="549" y1="98" x2="575" y2="98" stroke="currentColor"/>
  <!-- affichage -->
  <rect x="578" y="78" width="80" height="40" fill="none" stroke="currentColor"/>
  <text x="618" y="103" text-anchor="middle" font-size="14">A = 0,482</text>
  <text x="618" y="142" text-anchor="middle">Affichage</text>
  <text x="340" y="214" text-anchor="middle" font-size="13">A = log(I₀ / I) : plus la solution absorbe, plus I est faible et plus A est grande.</text>
</svg>`

const svgSpectre = `<svg viewBox="0 0 560 290" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
  <defs><linearGradient id="pc1-vis" x1="0" x2="1"><stop offset="0" stop-color="hsl(270 80% 60%)"/><stop offset="0.17" stop-color="hsl(230 85% 60%)"/><stop offset="0.38" stop-color="hsl(142 71% 45%)"/><stop offset="0.55" stop-color="hsl(55 95% 55%)"/><stop offset="0.68" stop-color="hsl(25 95% 53%)"/><stop offset="1" stop-color="hsl(0 84% 60%)"/></linearGradient></defs>
  <line x1="60" y1="240" x2="530" y2="240" stroke="currentColor"/>
  <line x1="60" y1="240" x2="60" y2="20" stroke="currentColor"/>
  <rect x="60" y="244" width="450" height="8" fill="url(#pc1-vis)"/>
  <text x="60" y="268" text-anchor="middle">400</text><text x="172" y="268" text-anchor="middle">500</text>
  <text x="285" y="268" text-anchor="middle">600</text><text x="397" y="268" text-anchor="middle">700</text>
  <text x="510" y="268" text-anchor="middle">800</text>
  <text x="540" y="284" text-anchor="end">λ (nm)</text>
  <text x="30" y="30" text-anchor="middle">A</text>
  <text x="50" y="244" text-anchor="end">0</text>
  <line x1="56" y1="60" x2="64" y2="60" stroke="currentColor"/><text x="50" y="64" text-anchor="end">1,0</text>
  <path d="M60,232 C120,230 150,226 180,200 C215,165 230,62 260,60 C290,58 305,150 340,205 C370,232 450,236 510,236" fill="none" stroke="hsl(217 91% 60%)" stroke-width="2.5"/>
  <line x1="260" y1="60" x2="260" y2="240" stroke="currentColor" stroke-dasharray="4 4"/>
  <text x="262" y="50" text-anchor="middle">λmax ≈ 580 nm</text>
  <text x="380" y="110" font-size="12">absorbe le jaune</text>
  <text x="380" y="126" font-size="12">→ solution bleu-violet</text>
  <text x="300" y="20" text-anchor="middle" font-size="13">Spectre d’absorption A = f(λ) d’une espèce colorée</text>
</svg>`

const svgCercle = `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
  <g transform="translate(160 160)">
    <path d="M0,0 L0,-120 A120,120 0 0 1 103.9,-60 Z" fill="hsl(0 84% 60%)"/>
    <path d="M0,0 L103.9,-60 A120,120 0 0 1 103.9,60 Z" fill="hsl(55 95% 55%)"/>
    <path d="M0,0 L103.9,60 A120,120 0 0 1 0,120 Z" fill="hsl(142 71% 45%)"/>
    <path d="M0,0 L0,120 A120,120 0 0 1 -103.9,60 Z" fill="hsl(185 80% 50%)"/>
    <path d="M0,0 L-103.9,60 A120,120 0 0 1 -103.9,-60 Z" fill="hsl(230 85% 60%)"/>
    <path d="M0,0 L-103.9,-60 A120,120 0 0 1 0,-120 Z" fill="hsl(300 75% 60%)"/>
    <circle r="120" fill="none" stroke="currentColor"/>
    <circle r="38" class="svg-bg" fill="hsl(var(--background))" stroke="currentColor"/>
    <text x="0" y="-4" text-anchor="middle" font-size="11" fill="currentColor">couleurs</text>
    <text x="0" y="11" text-anchor="middle" font-size="11" fill="currentColor">opposées =</text>
    <text x="0" y="26" text-anchor="middle" font-size="10" fill="currentColor">complémentaires</text>
    <text x="52" y="-82" text-anchor="middle" fill="#111">Rouge</text>
    <text x="96" y="4" text-anchor="middle" fill="#111">Jaune</text>
    <text x="52" y="90" text-anchor="middle" fill="#111">Vert</text>
    <text x="-52" y="90" text-anchor="middle" fill="#111">Cyan</text>
    <text x="-90" y="4" text-anchor="middle" fill="#fff">Bleu</text>
    <text x="-52" y="-82" text-anchor="middle" fill="#111">Magenta</text>
  </g>
</svg>`

const svgEtalonnage = `<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
  <line x1="60" y1="250" x2="490" y2="250" stroke="currentColor"/>
  <line x1="60" y1="250" x2="60" y2="20" stroke="currentColor"/>
  <text x="490" y="275" text-anchor="end">C (mmol·L⁻¹)</text>
  <text x="66" y="24">A</text>
  <g opacity="0.8">
    <text x="60" y="266" text-anchor="middle">0</text><text x="140" y="266" text-anchor="middle">0,5</text>
    <text x="220" y="266" text-anchor="middle">1,0</text><text x="300" y="266" text-anchor="middle">1,5</text>
    <text x="380" y="266" text-anchor="middle">2,0</text><text x="460" y="266" text-anchor="middle">2,5</text>
    <text x="52" y="254" text-anchor="end">0</text><text x="52" y="176" text-anchor="end">0,2</text>
    <text x="52" y="98" text-anchor="end">0,4</text><text x="52" y="20" text-anchor="end">0,6</text>
  </g>
  <line x1="60" y1="250" x2="470" y2="10" stroke="hsl(217 91% 60%)" stroke-width="2"/>
  <g fill="hsl(0 84% 60%)">
    <circle cx="140" cy="203.2" r="4"/><circle cx="220" cy="156" r="4"/><circle cx="300" cy="110" r="4"/>
    <circle cx="380" cy="62" r="4"/><circle cx="460" cy="16" r="4"/>
  </g>
  <line x1="60" y1="90" x2="333" y2="90" stroke="hsl(142 71% 45%)" stroke-dasharray="5 4"/>
  <line x1="333" y1="90" x2="333" y2="250" stroke="hsl(142 71% 45%)" stroke-dasharray="5 4"/>
  <circle cx="333" cy="90" r="5" fill="none" stroke="hsl(142 71% 45%)" stroke-width="2"/>
  <text x="340" y="244" fill="hsl(142 71% 45%)">Cs ≈ 1,71</text>
  <text x="70" y="84" fill="hsl(142 71% 45%)">As = 0,410</text>
  <text x="300" y="160" fill="hsl(217 91% 60%)">A = k·C (droite passant par O)</text>
</svg>`

const chapter: Chapter = {
  id: 'composition-systeme',
  subject: 'physique-chimie',
  order: 1,
  title: 'Composition d’un système chimique',
  theme: 'Constitution et transformations de la matière',
  summary:
    'Déterminer une quantité de matière (solide, liquide, gaz, soluté), préparer une solution par dissolution ou dilution, et doser une espèce colorée par spectrophotométrie grâce à la loi de Beer-Lambert.',
  duration: '3 semaines',
  objectives: [
    'Déterminer la masse molaire d’une espèce à partir des masses molaires atomiques.',
    'Déterminer une quantité de matière à partir d’une masse, d’un volume de liquide (masse volumique) ou d’un volume de gaz (volume molaire).',
    'Exploiter la relation entre concentration en quantité de matière, concentration en masse et masse molaire.',
    'Préparer une solution par dissolution ou par dilution ; calculer un facteur de dilution.',
    'Expliquer ou prévoir la couleur d’une espèce en solution à partir de son spectre d’absorption (couleurs complémentaires).',
    'Déterminer la concentration d’un soluté à partir de données expérimentales relatives à l’absorbance (loi de Beer-Lambert, courbe d’étalonnage).',
    'Capacité expérimentale : réaliser un dosage par étalonnage à l’aide d’un spectrophotomètre.',
  ],
  keywords: [
    'mole',
    'constante d’Avogadro',
    'masse molaire',
    'quantité de matière',
    'masse volumique',
    'volume molaire',
    'concentration',
    'dilution',
    'absorbance',
    'Beer-Lambert',
    'spectrophotométrie',
    'courbe d’étalonnage',
  ],

  // ------------------------------------------------------------------ FICHE
  fiche: [
    { type: 'h2', text: 'La quantité de matière' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Mole et constante d’Avogadro',
      content: [
        {
          type: 'p',
          text: r`Une **mole** contient $N_A = 6{,}02\times10^{23}$ entités. La quantité de matière $n$ (en mol) d'un échantillon de $N$ entités vaut $n = \dfrac{N}{N_A}$.`,
        },
      ],
    },
    {
      type: 'table',
      headers: ['Situation', 'Relation', 'Unités'],
      rows: [
        ['Toute espèce (solide…)', r`$n = \dfrac{m}{M}$`, 'mol ; g ; g·mol⁻¹'],
        ['Liquide pur', r`$n = \dfrac{\rho \times V}{M}$`, 'ρ en g·mL⁻¹, V en mL'],
        ['Gaz', r`$n = \dfrac{V}{V_m}$`, r`$V_m \approx 24{,}0\ \mathrm{L\cdot mol^{-1}}$ (20 °C, 1 bar)`],
        ['Soluté en solution', r`$n = C \times V$`, 'mol·L⁻¹ ; L'],
      ],
    },
    {
      type: 'p',
      text: r`**Masse molaire moléculaire** : somme des masses molaires atomiques. Ex. $M(\mathrm{C_6H_{12}O_6}) = 6\times12{,}0+12\times1{,}0+6\times16{,}0 = 180\ \mathrm{g\cdot mol^{-1}}$.`,
    },
    { type: 'h2', text: 'Concentrations et dilution' },
    {
      type: 'math',
      tex: r`C = \frac{n_{\text{soluté}}}{V_{\text{solution}}}\qquad C_m = \frac{m_{\text{soluté}}}{V_{\text{solution}}}\qquad C_m = C \times M`,
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Dilution : conservation de la quantité de soluté',
      content: [
        { type: 'math', tex: r`C_0 \times V_0 = C_1 \times V_1 \qquad F = \frac{C_0}{C_1} = \frac{V_1}{V_0} > 1` },
        { type: 'p', text: 'Matériel : **pipette jaugée** (prélever $V_0$) + **fiole jaugée** (volume final $V_1$).' },
      ],
    },
    { type: 'h2', text: 'Spectrophotométrie' },
    {
      type: 'list',
      items: [
        'Une solution colorée **absorbe** une partie du spectre visible ; sa couleur perçue est la **couleur complémentaire** de la couleur la plus absorbée (diamétralement opposée sur le cercle chromatique).',
        r`Spectre d'absorption : $A = f(\lambda)$. On travaille à $\lambda_{\max}$ (sensibilité maximale).`,
        'L’absorbance $A$ est **sans unité**, positive, additive (somme des contributions des espèces absorbantes).',
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Loi de Beer-Lambert',
      content: [
        { type: 'math', tex: r`A = \varepsilon \times \ell \times C = k \times C` },
        {
          type: 'p',
          text: r`$\varepsilon$ : coefficient d'absorption molaire (L·mol⁻¹·cm⁻¹), dépend de l'espèce, de $\lambda$, du solvant, de la température ; $\ell$ : épaisseur traversée (cm) ; $C$ en mol·L⁻¹. Valable pour des solutions **diluées** (en pratique $A \lesssim 1{,}5$).`,
        },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Gamme étalon', text: 'Préparer des solutions de concentrations connues (dilutions d’une solution mère).' },
        { title: 'Mesures', text: 'Régler λ = λ_max, faire le « blanc » avec le solvant, mesurer A pour chaque solution.' },
        { title: 'Courbe', text: 'Tracer A = f(C) : droite passant par l’origine → loi de Beer-Lambert vérifiée, pente k.' },
        { title: 'Lecture', text: 'Mesurer A de la solution inconnue et en déduire C = A/k (graphiquement ou par calcul).' },
      ],
    },
  ],

  // ------------------------------------------------------------------ COURS
  cours: [
    { type: 'h2', text: '1. Compter les entités chimiques : la mole' },
    {
      type: 'p',
      text: 'Un échantillon de matière, même minuscule, contient un nombre gigantesque d’entités (atomes, molécules, ions). Une goutte d’eau (0,05 mL) contient environ $1{,}7\\times10^{21}$ molécules ! Pour manipuler des nombres raisonnables, les chimistes regroupent les entités par « paquets » : la **mole**.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Mole, constante d’Avogadro',
      content: [
        {
          type: 'p',
          text: r`La **mole** (symbole mol) est l'unité de quantité de matière du Système international. Une mole contient exactement $6{,}022\,140\,76\times10^{23}$ entités élémentaires. Ce nombre, rapporté à une mole, définit la **constante d'Avogadro** : $N_A = 6{,}02\times10^{23}\ \mathrm{mol^{-1}}$.`,
        },
        { type: 'math', tex: r`n = \frac{N}{N_A}\qquad\text{avec } n \text{ en mol, } N \text{ sans unité, } N_A \text{ en mol}^{-1}` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        {
          type: 'p',
          text: r`Un échantillon contient $N = 3{,}01\times10^{22}$ atomes de fer. Sa quantité de matière est $n = \dfrac{3{,}01\times10^{22}}{6{,}02\times10^{23}} = 5{,}00\times10^{-2}\ \mathrm{mol}$.`,
        },
      ],
    },
    { type: 'h2', text: '2. Masse molaire et quantité de matière d’un solide' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Masse molaire',
      content: [
        {
          type: 'p',
          text: r`La **masse molaire** $M$ d'une espèce est la masse d'une mole de cette espèce, en $\mathrm{g\cdot mol^{-1}}$. La **masse molaire atomique** d'un élément est donnée par la classification périodique (ex. $M(\mathrm{C}) = 12{,}0$, $M(\mathrm{H}) = 1{,}0$, $M(\mathrm{O}) = 16{,}0\ \mathrm{g\cdot mol^{-1}}$).`,
        },
        {
          type: 'p',
          text: 'La **masse molaire moléculaire** (ou d’un composé ionique) est la somme des masses molaires atomiques de tous les atomes de la formule.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Calculs de masses molaires',
      content: [
        {
          type: 'list',
          items: [
            r`Eau $\mathrm{H_2O}$ : $M = 2\times1{,}0 + 16{,}0 = 18{,}0\ \mathrm{g\cdot mol^{-1}}$.`,
            r`Dioxyde de carbone $\mathrm{CO_2}$ : $M = 12{,}0 + 2\times16{,}0 = 44{,}0\ \mathrm{g\cdot mol^{-1}}$.`,
            r`Éthanol $\mathrm{C_2H_6O}$ : $M = 2\times12{,}0 + 6\times1{,}0 + 16{,}0 = 46{,}0\ \mathrm{g\cdot mol^{-1}}$.`,
            r`Permanganate de potassium $\mathrm{KMnO_4}$ : $M = 39{,}1 + 54{,}9 + 4\times16{,}0 = 158{,}0\ \mathrm{g\cdot mol^{-1}}$.`,
            r`Sulfate de cuivre pentahydraté $\mathrm{CuSO_4,5H_2O}$ : $M = 63{,}5 + 32{,}1 + 4\times16{,}0 + 5\times18{,}0 = 249{,}6\ \mathrm{g\cdot mol^{-1}}$ (on n'oublie pas l'eau d'hydratation !).`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Quantité de matière à partir de la masse',
      content: [
        { type: 'math', tex: r`n = \frac{m}{M}\qquad n\ (\mathrm{mol}),\ m\ (\mathrm{g}),\ M\ (\mathrm{g\cdot mol^{-1}})` },
        { type: 'p', text: 'Cette relation est valable pour tout échantillon d’espèce pure dont on connaît la masse (solide pesé, liquide pesé…).' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé',
      content: [
        {
          type: 'p',
          text: r`Quelle quantité de matière de saccharose $\mathrm{C_{12}H_{22}O_{11}}$ y a-t-il dans un morceau de sucre de $m = 5{,}60\ \mathrm{g}$ ?\n$M = 12\times12{,}0 + 22\times1{,}0 + 11\times16{,}0 = 144 + 22 + 176 = 342\ \mathrm{g\cdot mol^{-1}}$.\n$n = \dfrac{m}{M} = \dfrac{5{,}60}{342} = 1{,}64\times10^{-2}\ \mathrm{mol}$.`,
        },
      ],
    },
    { type: 'h2', text: '3. Quantité de matière d’un liquide : la masse volumique' },
    {
      type: 'p',
      text: 'Il est souvent plus pratique de mesurer le **volume** d’un liquide (éprouvette, pipette) que sa masse. On passe du volume à la masse grâce à la masse volumique.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Masse volumique et densité',
      content: [
        { type: 'math', tex: r`\rho = \frac{m}{V}\qquad\Longrightarrow\qquad m = \rho\times V\qquad\Longrightarrow\qquad n = \frac{\rho \times V}{M}` },
        {
          type: 'p',
          text: r`$\rho$ s'exprime en $\mathrm{g\cdot mL^{-1}}$, $\mathrm{g\cdot cm^{-3}}$ ou $\mathrm{kg\cdot m^{-3}}$ ($1\ \mathrm{g\cdot mL^{-1}} = 1\,000\ \mathrm{kg\cdot m^{-3}}$). La **densité** d'un liquide par rapport à l'eau est $d = \dfrac{\rho}{\rho_{\text{eau}}}$, sans unité, avec $\rho_{\text{eau}} = 1{,}00\ \mathrm{g\cdot mL^{-1}}$ : numériquement, $\rho$ (en g·mL⁻¹) $= d$.`,
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
          text: r`On prélève $V = 10{,}0\ \mathrm{mL}$ d'éthanol ($\rho = 0{,}789\ \mathrm{g\cdot mL^{-1}}$, $M = 46{,}0\ \mathrm{g\cdot mol^{-1}}$).\n$m = \rho V = 0{,}789\times10{,}0 = 7{,}89\ \mathrm{g}$, puis $n = \dfrac{7{,}89}{46{,}0} = 0{,}172\ \mathrm{mol}$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Piège des unités',
      content: [
        {
          type: 'p',
          text: 'Vérifiez la cohérence : si ρ est en g·mL⁻¹, le volume doit être en mL pour obtenir une masse en g. Si ρ est donnée en kg·m⁻³, convertissez d’abord (ex. 789 kg·m⁻³ = 0,789 g·mL⁻¹).',
        },
      ],
    },
    { type: 'h2', text: '4. Quantité de matière d’un gaz : le volume molaire' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Volume molaire',
      content: [
        {
          type: 'p',
          text: r`Le **volume molaire** $V_m$ est le volume occupé par une mole de gaz. Il **ne dépend pas de la nature du gaz**, mais seulement de la température et de la pression (loi d'Avogadro-Ampère).`,
        },
        { type: 'math', tex: r`n = \frac{V}{V_m}\qquad n\ (\mathrm{mol}),\ V\ (\mathrm{L}),\ V_m\ (\mathrm{L\cdot mol^{-1}})` },
        {
          type: 'list',
          items: [
            r`À 0 °C et $1{,}013\times10^{5}\ \mathrm{Pa}$ : $V_m = 22{,}4\ \mathrm{L\cdot mol^{-1}}$.`,
            r`À 20 °C et $1{,}013\times10^{5}\ \mathrm{Pa}$ : $V_m \approx 24{,}0\ \mathrm{L\cdot mol^{-1}}$ (valeur la plus utilisée).`,
          ],
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
          text: r`Un ballon contient $V = 3{,}6\ \mathrm{L}$ d'hélium à 20 °C : $n = \dfrac{3{,}6}{24{,}0} = 0{,}15\ \mathrm{mol}$. Le même volume de dioxygène, dans les mêmes conditions, contiendrait aussi $0{,}15\ \mathrm{mol}$ de molécules.`,
        },
      ],
    },
    { type: 'h2', text: '5. Solutions : concentrations' },
    {
      type: 'p',
      text: 'Une **solution** est obtenue en dissolvant un ou plusieurs **solutés** (solides, liquides ou gaz) dans un **solvant** (l’eau pour une solution aqueuse).',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Concentration en quantité de matière (concentration molaire)',
      content: [
        { type: 'math', tex: r`C = \frac{n_{\text{soluté}}}{V_{\text{solution}}}\qquad C\ (\mathrm{mol\cdot L^{-1}}),\ n\ (\mathrm{mol}),\ V\ (\mathrm{L})` },
        {
          type: 'p',
          text: r`La concentration d'une espèce X se note aussi $[\mathrm{X}]$. Attention : $V$ est le volume de la **solution**, pas celui du solvant.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Concentration en masse (vue en Seconde)',
      content: [
        { type: 'math', tex: r`C_m = \frac{m_{\text{soluté}}}{V_{\text{solution}}}\qquad C_m\ (\mathrm{g\cdot L^{-1}})` },
        {
          type: 'p',
          text: 'Ne pas confondre concentration en masse $C_m$ (masse de soluté par litre de solution) et masse volumique $\\rho$ (masse de solution par unité de volume de solution).',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Lien entre les deux concentrations',
      content: [
        { type: 'math', tex: r`C_m = \frac{m}{V} = \frac{n\times M}{V} = C\times M` },
        {
          type: 'p',
          text: r`Exemple : le sérum physiologique contient $9{,}0\ \mathrm{g\cdot L^{-1}}$ de chlorure de sodium ($M = 58{,}5\ \mathrm{g\cdot mol^{-1}}$) : $C = \dfrac{9{,}0}{58{,}5} = 0{,}15\ \mathrm{mol\cdot L^{-1}}$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Concentration d’un ion apporté par un solide ionique',
      content: [
        {
          type: 'p',
          text: r`Le chlorure de fer(III) $\mathrm{FeCl_3}$ se dissout selon $\mathrm{FeCl_3(s)} \to \mathrm{Fe^{3+}(aq)} + 3\,\mathrm{Cl^-(aq)}$. Pour une concentration apportée $C$ en soluté : $[\mathrm{Fe^{3+}}] = C$ et $[\mathrm{Cl^-}] = 3C$.`,
        },
      ],
    },
    { type: 'h2', text: '6. Préparer une solution' },
    { type: 'h3', text: '6.1 Par dissolution d’un solide' },
    {
      type: 'steps',
      items: [
        { title: 'Calculer la masse à peser', text: 'm = n × M = C × V × M (ou m = C_m × V).' },
        { title: 'Peser', text: 'Peser m dans une coupelle (ou un verre de montre) sur une balance tarée.' },
        { title: 'Introduire', text: 'Verser le solide dans une fiole jaugée de volume V à l’aide d’un entonnoir ; rincer coupelle et entonnoir à l’eau distillée dans la fiole.' },
        { title: 'Dissoudre', text: 'Remplir la fiole aux trois quarts d’eau distillée, boucher et agiter jusqu’à dissolution complète.' },
        { title: 'Ajuster et homogénéiser', text: 'Compléter jusqu’au trait de jauge (bas du ménisque sur le trait), boucher et retourner plusieurs fois.' },
      ],
    },
    { type: 'h3', text: '6.2 Par dilution d’une solution mère' },
    {
      type: 'p',
      text: 'Diluer une solution, c’est lui ajouter du solvant : la **quantité de soluté ne change pas**, mais le volume augmente, donc la concentration diminue.',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Relation de dilution',
      content: [
        { type: 'math', tex: r`n_{\text{prélevé}} = n_{\text{fille}}\quad\Longleftrightarrow\quad C_0\times V_0 = C_1\times V_1` },
        { type: 'math', tex: r`F = \frac{C_0}{C_1} = \frac{V_1}{V_0}` },
        {
          type: 'p',
          text: r`$C_0$, $V_0$ : concentration de la solution mère et volume prélevé ; $C_1$, $V_1$ : concentration et volume de la solution fille. Le **facteur de dilution** $F$ est sans unité et supérieur à 1.`,
        },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Calculer V₀', text: 'V₀ = C₁V₁/C₀ = V₁/F.' },
        { title: 'Prélever', text: 'Verser un peu de solution mère dans un bécher ; prélever V₀ avec une pipette jaugée munie d’une propipette (jamais directement dans le flacon).' },
        { title: 'Transférer', text: 'Verser le prélèvement dans une fiole jaugée de volume V₁.' },
        { title: 'Compléter', text: 'Ajouter de l’eau distillée aux trois quarts, agiter, compléter jusqu’au trait de jauge, homogénéiser.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        {
          type: 'p',
          text: r`On veut $V_1 = 50{,}0\ \mathrm{mL}$ de solution à $C_1 = 2{,}0\times10^{-2}\ \mathrm{mol\cdot L^{-1}}$ à partir d'une solution mère à $C_0 = 0{,}10\ \mathrm{mol\cdot L^{-1}}$.\n$F = \dfrac{0{,}10}{2{,}0\times10^{-2}} = 5{,}0$, donc $V_0 = \dfrac{50{,}0}{5{,}0} = 10{,}0\ \mathrm{mL}$ : pipette jaugée de 10,0 mL et fiole jaugée de 50,0 mL.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Verrerie de précision',
      content: [
        {
          type: 'p',
          text: 'Pour une solution de concentration précise, on utilise de la verrerie **jaugée** (pipette jaugée, fiole jaugée). Le bécher et l’éprouvette graduée ne sont pas assez précis.',
        },
      ],
    },
    { type: 'h2', text: '7. Couleur d’une solution et spectre d’absorption' },
    {
      type: 'p',
      text: 'La lumière blanche contient toutes les radiations visibles (environ 400 nm à 800 nm). Une solution **colorée** absorbe certaines radiations et transmet les autres : l’œil perçoit la superposition des radiations **transmises**.',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Couleur perçue et couleurs complémentaires',
      content: [
        {
          type: 'p',
          text: 'Si une espèce absorbe principalement **une seule** bande de couleur, la couleur perçue est la **couleur complémentaire** de la couleur absorbée : elles sont diamétralement opposées sur le cercle chromatique.',
        },
      ],
    },
    { type: 'svg', svg: svgCercle, caption: 'Cercle chromatique simplifié : une solution qui absorbe le rouge apparaît cyan (bleu-vert), une solution qui absorbe le bleu apparaît jaune…', maxWidth: 320 },
    {
      type: 'table',
      headers: ['Domaine absorbé (nm)', 'Couleur absorbée', 'Couleur perçue', 'Exemple'],
      rows: [
        ['400 – 435', 'violet', 'jaune-vert', '—'],
        ['435 – 490', 'bleu', 'jaune-orangé', 'diiode, ions chromate'],
        ['490 – 560', 'vert', 'magenta (pourpre)', r`ion permanganate $\mathrm{MnO_4^-}$ ($\lambda_{\max} \approx 525$ nm)`],
        ['560 – 590', 'jaune', 'bleu-violet', '—'],
        ['590 – 620', 'orange', 'bleu', 'bleu brillant E133 (≈ 630 nm)'],
        ['620 – 800', 'rouge', 'bleu-vert (cyan)', r`ion $\mathrm{Cu^{2+}}$ hydraté ($\lambda_{\max} \approx 800$ nm)`],
      ],
      caption: 'Correspondance (approximative) entre la couleur absorbée et la couleur perçue.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Spectre d’absorption',
      content: [
        {
          type: 'p',
          text: r`Le **spectre d'absorption** d'une espèce est la courbe $A = f(\lambda)$. La longueur d'onde du maximum, $\lambda_{\max}$, renseigne sur la couleur absorbée. Une espèce **incolore** n'absorbe pas dans le visible.`,
        },
      ],
    },
    { type: 'svg', svg: svgSpectre, caption: 'Allure d’un spectre d’absorption : maximum vers 580 nm (jaune) → solution bleu-violet.' },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Spectre à plusieurs bandes',
      content: [
        {
          type: 'p',
          text: 'Si une espèce absorbe dans plusieurs domaines (ex. bleu et rouge pour la chlorophylle, qui apparaît verte), il faut raisonner avec la synthèse soustractive : la couleur perçue est celle des radiations transmises.',
        },
      ],
    },
    { type: 'h2', text: '8. Absorbance et spectrophotomètre' },
    {
      type: 'p',
      text: 'Un **spectrophotomètre** envoie sur la solution une lumière monochromatique de longueur d’onde choisie et compare l’intensité lumineuse transmise $I$ à l’intensité incidente $I_0$.',
    },
    { type: 'svg', svg: svgSpectro, caption: 'Principe d’un spectrophotomètre UV-visible.' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Absorbance',
      content: [
        { type: 'math', tex: r`A = \log\left(\frac{I_0}{I}\right)` },
        {
          type: 'p',
          text: 'L’absorbance $A$ est une grandeur **sans unité**, positive. $A = 0$ : aucune absorption ; $A = 1$ : seulement 10 % de la lumière est transmise ; $A = 2$ : 1 % transmis.',
        },
        {
          type: 'p',
          text: 'Elle est **additive** : si plusieurs espèces absorbent à la longueur d’onde de travail, $A = A_1 + A_2 + \\dots$',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Faire le « blanc »',
      content: [
        {
          type: 'p',
          text: 'Avant toute mesure, on place dans l’appareil une cuve remplie de **solvant** (souvent de l’eau distillée) et on règle $A = 0$. On élimine ainsi l’absorption due à la cuve et au solvant.',
        },
      ],
    },
    { type: 'h2', text: '9. Loi de Beer-Lambert' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Loi de Beer-Lambert',
      content: [
        {
          type: 'p',
          text: 'Pour une solution suffisamment diluée d’une espèce colorée, à une longueur d’onde donnée, l’absorbance est **proportionnelle** à la concentration de l’espèce :',
        },
        { type: 'math', tex: r`A = \varepsilon\times\ell\times C` },
        {
          type: 'list',
          items: [
            r`$\varepsilon$ : coefficient d'absorption molaire, en $\mathrm{L\cdot mol^{-1}\cdot cm^{-1}}$ ; il dépend de l'espèce, de $\lambda$, du solvant et de la température ;`,
            r`$\ell$ : longueur de solution traversée (largeur de la cuve), en cm ;`,
            r`$C$ : concentration en quantité de matière, en $\mathrm{mol\cdot L^{-1}}$.`,
          ],
        },
        { type: 'p', text: 'Pour une espèce, une cuve et une longueur d’onde données : $A = k\\times C$ avec $k = \\varepsilon\\ell$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Domaine de validité',
      content: [
        {
          type: 'list',
          items: [
            r`Solutions **diluées** (typiquement $C < 10^{-2}\ \mathrm{mol\cdot L^{-1}}$) : au-delà, la courbe $A = f(C)$ s'infléchit.`,
            'Lumière **monochromatique** ; solution limpide (pas de précipité, pas de diffusion).',
            'En pratique, mesures fiables pour $A$ entre environ 0,1 et 1,5 : une solution trop absorbante doit être **diluée** avant la mesure.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Pourquoi choisir λ = λ_max ?',
      content: [
        {
          type: 'p',
          text: 'À $\\lambda_{\\max}$, $\\varepsilon$ est maximal : pour une même variation de concentration, la variation d’absorbance est la plus grande (meilleure **sensibilité**), et une petite erreur sur le réglage de λ modifie peu A (le spectre est « plat » au sommet).',
        },
      ],
    },
    { type: 'h2', text: '10. Dosage par étalonnage spectrophotométrique' },
    {
      type: 'p',
      text: 'Un **dosage** consiste à déterminer la concentration d’une espèce dans une solution. Le dosage **par étalonnage** compare une grandeur physique mesurée sur la solution inconnue (ici l’absorbance) à celle de solutions étalons. Il est non destructif.',
    },
    {
      type: 'steps',
      items: [
        { title: 'Choisir λ', text: 'Tracer (ou consulter) le spectre de l’espèce et se placer à λ_max.' },
        { title: 'Préparer la gamme étalon', text: 'Par dilutions successives d’une solution mère, préparer 5 à 6 solutions de concentrations connues encadrant la concentration recherchée.' },
        { title: 'Mesurer', text: 'Faire le blanc puis mesurer l’absorbance de chaque solution étalon (toujours la même cuve, même λ).' },
        { title: 'Tracer la courbe d’étalonnage', text: 'A = f(C) : si les points sont alignés avec l’origine, la loi de Beer-Lambert est vérifiée. Modéliser par A = kC (régression linéaire).' },
        { title: 'Exploiter', text: 'Mesurer A_S de la solution inconnue. Lire graphiquement C_S ou calculer C_S = A_S/k. Tenir compte d’une éventuelle dilution préalable.' },
      ],
    },
    { type: 'svg', svg: svgEtalonnage, caption: 'Courbe d’étalonnage : la concentration inconnue est lue à l’aide de l’absorbance mesurée.' },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé',
      content: [
        {
          type: 'p',
          text: r`La courbe d'étalonnage d'une solution de permanganate de potassium à 525 nm est une droite passant par l'origine de pente $k = 2{,}30\times10^{3}\ \mathrm{L\cdot mol^{-1}}$. Une solution inconnue a une absorbance $A_S = 0{,}690$.\nD'après la loi de Beer-Lambert : $C_S = \dfrac{A_S}{k} = \dfrac{0{,}690}{2{,}30\times10^{3}} = 3{,}00\times10^{-4}\ \mathrm{mol\cdot L^{-1}}$.\nAvec $\ell = 1{,}00$ cm : $\varepsilon = \dfrac{k}{\ell} = 2{,}30\times10^{3}\ \mathrm{L\cdot mol^{-1}\cdot cm^{-1}}$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Penser à la dilution',
      content: [
        {
          type: 'p',
          text: 'Si la solution commerciale a été diluée d’un facteur $F$ avant la mesure (car trop absorbante), la concentration de la solution d’origine vaut $C_{\\text{origine}} = F\\times C_{\\text{mesurée}}$.',
        },
      ],
    },
    { type: 'h2', text: '11. Bilan : choisir la bonne relation' },
    {
      type: 'table',
      headers: ['Je connais…', 'Je calcule…', 'Relation'],
      rows: [
        ['un nombre d’entités N', 'n', r`$n = N/N_A$`],
        ['une masse m d’espèce pure', 'n', r`$n = m/M$`],
        ['un volume V de liquide pur et ρ', 'n', r`$n = \rho V / M$`],
        ['un volume V de gaz', 'n', r`$n = V/V_m$`],
        ['C et V d’une solution', 'n de soluté', r`$n = C\times V$`],
        ['C_m et M', 'C', r`$C = C_m/M$`],
        ['une absorbance A', 'C', r`$C = A/(\varepsilon\ell)$`],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Chiffres significatifs',
      content: [
        {
          type: 'p',
          text: 'Le résultat d’un calcul (produit ou quotient) s’écrit avec le **même nombre de chiffres significatifs** que la donnée qui en a le moins. Gardez les valeurs non arrondies dans la calculatrice pour les calculs intermédiaires.',
        },
      ],
    },
  ],

  // ------------------------------------------------------------------ EXERCICES
  exercices: [
    {
      id: 'masse-molaire-glucose',
      title: 'Masse molaire et quantité de matière',
      difficulty: 1,
      duration: 5,
      tags: ['masse molaire', 'n = m/M'],
      statement: [
        {
          type: 'p',
          text: r`Un sachet contient $m = 9{,}00\ \mathrm{g}$ de glucose $\mathrm{C_6H_{12}O_6}$.\nDonnées : $M(\mathrm{H}) = 1{,}0$ ; $M(\mathrm{C}) = 12{,}0$ ; $M(\mathrm{O}) = 16{,}0\ \mathrm{g\cdot mol^{-1}}$ ; $N_A = 6{,}02\times10^{23}\ \mathrm{mol^{-1}}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la masse molaire du glucose.',
            'En déduire la quantité de matière de glucose dans le sachet.',
            'Combien de molécules de glucose le sachet contient-il ?',
          ],
        },
      ],
      hints: ['Additionner les masses molaires atomiques de tous les atomes de la formule.', 'n = m/M puis N = n × N_A.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$M(\mathrm{C_6H_{12}O_6}) = 6\times12{,}0 + 12\times1{,}0 + 6\times16{,}0 = 72{,}0 + 12{,}0 + 96{,}0 = 180\ \mathrm{g\cdot mol^{-1}}$.`,
            r`$n = \dfrac{m}{M} = \dfrac{9{,}00}{180} = 5{,}00\times10^{-2}\ \mathrm{mol}$.`,
            r`$N = n\times N_A = 5{,}00\times10^{-2}\times6{,}02\times10^{23} = 3{,}01\times10^{22}$ molécules.`,
          ],
        },
      ],
    },
    {
      id: 'serum-physiologique',
      title: 'Concentration en masse et concentration molaire',
      difficulty: 1,
      duration: 6,
      tags: ['concentration', 'C_m = C × M'],
      statement: [
        {
          type: 'p',
          text: r`Une dosette de sérum physiologique de volume $V = 5{,}0\ \mathrm{mL}$ contient du chlorure de sodium $\mathrm{NaCl}$ à la concentration en masse $C_m = 9{,}0\ \mathrm{g\cdot L^{-1}}$.\nDonnées : $M(\mathrm{Na}) = 23{,}0$ ; $M(\mathrm{Cl}) = 35{,}5\ \mathrm{g\cdot mol^{-1}}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la masse de chlorure de sodium dans une dosette.',
            'Calculer la concentration en quantité de matière de chlorure de sodium apporté.',
            r`En déduire les concentrations des ions $\mathrm{Na^+}$ et $\mathrm{Cl^-}$ dans le sérum.`,
          ],
        },
      ],
      hints: ['Convertir le volume en litres.', 'C = C_m / M.', 'NaCl(s) → Na⁺(aq) + Cl⁻(aq).'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$m = C_m\times V = 9{,}0\times5{,}0\times10^{-3} = 4{,}5\times10^{-2}\ \mathrm{g}$ (soit 45 mg).`,
            r`$M(\mathrm{NaCl}) = 23{,}0 + 35{,}5 = 58{,}5\ \mathrm{g\cdot mol^{-1}}$, donc $C = \dfrac{C_m}{M} = \dfrac{9{,}0}{58{,}5} = 0{,}15\ \mathrm{mol\cdot L^{-1}}$.`,
            r`La dissolution s'écrit $\mathrm{NaCl(s)} \to \mathrm{Na^+(aq)} + \mathrm{Cl^-(aq)}$ : une mole de soluté donne une mole de chaque ion, donc $[\mathrm{Na^+}] = [\mathrm{Cl^-}] = 0{,}15\ \mathrm{mol\cdot L^{-1}}$.`,
          ],
        },
      ],
    },
    {
      id: 'liquide-et-gaz',
      title: 'Liquide et gaz : masse volumique et volume molaire',
      difficulty: 1,
      duration: 8,
      tags: ['masse volumique', 'volume molaire'],
      statement: [
        {
          type: 'p',
          text: r`**a.** On prélève $V = 20{,}0\ \mathrm{mL}$ d'éthanol liquide $\mathrm{C_2H_6O}$ de masse volumique $\rho = 0{,}789\ \mathrm{g\cdot mL^{-1}}$. Calculer la quantité de matière d'éthanol prélevée.\n**b.** Un flacon contient $V = 1{,}20\ \mathrm{L}$ de dioxyde de carbone gazeux à 20 °C sous 1,0 bar ($V_m = 24{,}0\ \mathrm{L\cdot mol^{-1}}$). Calculer la quantité de matière puis la masse de gaz.\nDonnées : $M(\mathrm{H}) = 1{,}0$ ; $M(\mathrm{C}) = 12{,}0$ ; $M(\mathrm{O}) = 16{,}0\ \mathrm{g\cdot mol^{-1}}$.`,
        },
      ],
      hints: ['a. m = ρ × V puis n = m/M.', 'b. n = V/V_m puis m = n × M.'],
      solution: [
        {
          type: 'p',
          text: r`**a.** $M(\mathrm{C_2H_6O}) = 2\times12{,}0 + 6\times1{,}0 + 16{,}0 = 46{,}0\ \mathrm{g\cdot mol^{-1}}$.\n$m = \rho V = 0{,}789\times20{,}0 = 15{,}8\ \mathrm{g}$ ; $n = \dfrac{m}{M} = \dfrac{15{,}78}{46{,}0} = 0{,}343\ \mathrm{mol}$.`,
        },
        {
          type: 'p',
          text: r`**b.** $n = \dfrac{V}{V_m} = \dfrac{1{,}20}{24{,}0} = 5{,}00\times10^{-2}\ \mathrm{mol}$.\n$M(\mathrm{CO_2}) = 12{,}0 + 2\times16{,}0 = 44{,}0\ \mathrm{g\cdot mol^{-1}}$ ; $m = n\times M = 5{,}00\times10^{-2}\times44{,}0 = 2{,}20\ \mathrm{g}$.`,
        },
      ],
    },
    {
      id: 'dissolution-sulfate-cuivre',
      title: 'Préparer une solution par dissolution',
      difficulty: 2,
      duration: 10,
      tags: ['dissolution', 'protocole'],
      statement: [
        {
          type: 'p',
          text: r`On souhaite préparer $V = 100{,}0\ \mathrm{mL}$ d'une solution de sulfate de cuivre de concentration $C = 0{,}100\ \mathrm{mol\cdot L^{-1}}$ à partir de cristaux de sulfate de cuivre pentahydraté $\mathrm{CuSO_4,5H_2O}$.\nDonnées ($\mathrm{g\cdot mol^{-1}}$) : H : 1,0 ; O : 16,0 ; S : 32,1 ; Cu : 63,5.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la masse molaire du sulfate de cuivre pentahydraté.',
            'Calculer la masse de cristaux à peser.',
            'Rédiger le protocole de préparation en citant la verrerie utilisée.',
          ],
        },
      ],
      hints: ['Ne pas oublier les 5 molécules d’eau dans la masse molaire.', 'm = C × V × M.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$M = 63{,}5 + 32{,}1 + 4\times16{,}0 + 5\times(2\times1{,}0 + 16{,}0) = 63{,}5 + 32{,}1 + 64{,}0 + 90{,}0 = 249{,}6\ \mathrm{g\cdot mol^{-1}}$.`,
            r`$n = C\times V = 0{,}100\times0{,}1000 = 1{,}00\times10^{-2}\ \mathrm{mol}$ ; $m = n\times M = 1{,}00\times10^{-2}\times249{,}6 = 2{,}50\ \mathrm{g}$.`,
            'Peser 2,50 g de cristaux dans une coupelle sur une balance tarée ; les introduire dans une **fiole jaugée de 100,0 mL** avec un entonnoir ; rincer coupelle et entonnoir à l’eau distillée en recueillant l’eau de rinçage dans la fiole ; remplir aux trois quarts, boucher, agiter jusqu’à dissolution ; compléter jusqu’au trait de jauge ; boucher et retourner pour homogénéiser.',
          ],
        },
      ],
    },
    {
      id: 'dilution-gamme',
      title: 'Dilution et gamme étalon',
      difficulty: 2,
      duration: 10,
      tags: ['dilution', 'facteur de dilution'],
      statement: [
        {
          type: 'p',
          text: r`On dispose d'une solution mère de permanganate de potassium à $C_0 = 0{,}200\ \mathrm{mol\cdot L^{-1}}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            r`On veut préparer $V_1 = 100{,}0\ \mathrm{mL}$ de solution fille à $C_1 = 1{,}00\times10^{-2}\ \mathrm{mol\cdot L^{-1}}$. Calculer le facteur de dilution et le volume $V_0$ à prélever.`,
            r`À partir de cette solution fille $S_1$, on prépare des solutions de $50{,}0\ \mathrm{mL}$ en prélevant $5{,}0$ ; $10{,}0$ ; $20{,}0$ et $25{,}0\ \mathrm{mL}$ de $S_1$. Calculer leurs concentrations.`,
            'Pourquoi utilise-t-on une pipette jaugée et non une éprouvette graduée ?',
          ],
        },
      ],
      hints: ['F = C₀/C₁ = V₁/V₀.', 'C = C₁ × V_prélevé / 50,0 mL.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$F = \dfrac{C_0}{C_1} = \dfrac{0{,}200}{1{,}00\times10^{-2}} = 20{,}0$ ; $V_0 = \dfrac{V_1}{F} = \dfrac{100{,}0}{20{,}0} = 5{,}00\ \mathrm{mL}$ (pipette jaugée de 5,00 mL, fiole jaugée de 100,0 mL).`,
            r`Conservation de la quantité de soluté : $C = \dfrac{C_1 V_{\text{prél}}}{50{,}0}$.\n$5{,}0$ mL → $1{,}0\times10^{-3}\ \mathrm{mol\cdot L^{-1}}$ ; $10{,}0$ mL → $2{,}00\times10^{-3}$ ; $20{,}0$ mL → $4{,}00\times10^{-3}$ ; $25{,}0$ mL → $5{,}00\times10^{-3}\ \mathrm{mol\cdot L^{-1}}$.`,
            'La pipette jaugée mesure un volume avec une incertitude bien plus faible (quelques centièmes de mL) que l’éprouvette graduée : la concentration de la solution fille est alors connue précisément.',
          ],
        },
      ],
    },
    {
      id: 'couleur-spectre',
      title: 'Couleur d’une solution et spectre',
      difficulty: 2,
      duration: 8,
      tags: ['couleur', 'spectre d’absorption'],
      statement: [
        {
          type: 'p',
          text: 'On a tracé les spectres d’absorption de trois solutions : la solution X a un maximum d’absorption à 450 nm, la solution Y à 525 nm, la solution Z à 630 nm (une seule bande pour chacune).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Donner la couleur absorbée et la couleur perçue de chaque solution.',
            'L’une de ces solutions contient des ions permanganate (violet-pourpre), une autre du colorant bleu brillant E133, la dernière du diiode (jaune-brun). Les identifier.',
            'À quelle longueur d’onde faut-il régler le spectrophotomètre pour doser le colorant E133 ? Justifier.',
          ],
        },
      ],
      hints: ['Utiliser le cercle chromatique : couleur perçue = couleur complémentaire de la couleur absorbée.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'X absorbe le **bleu** (450 nm) → elle apparaît **jaune-orangé**. Y absorbe le **vert** (525 nm) → elle apparaît **magenta/pourpre**. Z absorbe l’**orange-rouge** (630 nm) → elle apparaît **bleue**.',
            'X : diiode (jaune-brun) ; Y : ions permanganate (pourpre) ; Z : bleu brillant E133.',
            'On règle λ = 630 nm, longueur d’onde du maximum d’absorption de E133 : l’absorbance y est la plus grande, donc la mesure est la plus sensible et la moins affectée par une petite erreur de réglage.',
          ],
        },
      ],
    },
    {
      id: 'etalonnage-sulfate-cuivre',
      title: 'Exploiter une courbe d’étalonnage',
      difficulty: 2,
      duration: 15,
      tags: ['Beer-Lambert', 'étalonnage'],
      statement: [
        {
          type: 'p',
          text: 'On mesure l’absorbance de solutions étalons d’une espèce colorée à λ_max, dans une cuve de largeur ℓ = 1,00 cm :',
        },
        {
          type: 'table',
          headers: ['C (mmol·L⁻¹)', '0,50', '1,00', '1,50', '2,00', '2,50'],
          rows: [['A', '0,120', '0,241', '0,359', '0,482', '0,600']],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Montrer que ces mesures sont en accord avec la loi de Beer-Lambert.',
            'Déterminer le coefficient k de la relation A = k × C, puis le coefficient d’absorption molaire ε en L·mol⁻¹·cm⁻¹.',
            'Une solution S inconnue a une absorbance A_S = 0,410. Déterminer sa concentration.',
            'Une autre solution S’ donne A = 2,1. Que faut-il faire pour déterminer sa concentration ?',
          ],
        },
      ],
      hints: ['Calculer le rapport A/C pour chaque point.', 'ε = k/ℓ, en convertissant les mmol en mol.', 'A = 2,1 est en dehors de la gamme étalon.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Les rapports A/C valent 0,240 ; 0,241 ; 0,239 ; 0,241 ; 0,240 L·mmol⁻¹ : ils sont constants (aux erreurs de mesure près). A est donc proportionnelle à C : la courbe A = f(C) est une droite passant par l’origine, conformément à la loi de Beer-Lambert.',
            r`$k \approx 0{,}240\ \mathrm{L\cdot mmol^{-1}} = 240\ \mathrm{L\cdot mol^{-1}}$. Comme $k = \varepsilon\ell$ : $\varepsilon = \dfrac{240}{1{,}00} = 2{,}40\times10^{2}\ \mathrm{L\cdot mol^{-1}\cdot cm^{-1}}$.`,
            r`$C_S = \dfrac{A_S}{k} = \dfrac{0{,}410}{0{,}240} = 1{,}71\ \mathrm{mmol\cdot L^{-1}}$, soit $1{,}71\times10^{-3}\ \mathrm{mol\cdot L^{-1}}$ (valeur bien comprise dans la gamme étalon).`,
            'A = 2,1 dépasse largement la gamme étalon (A ≤ 0,600) et la zone de validité de la loi. Il faut **diluer** S’ d’un facteur connu (par exemple F = 5 avec pipette jaugée de 10,0 mL et fiole de 50,0 mL), mesurer l’absorbance de la solution diluée, calculer sa concentration puis multiplier par F.',
          ],
        },
      ],
    },
    {
      id: 'permanganate-epsilon',
      title: 'Loi de Beer-Lambert : calcul direct',
      difficulty: 2,
      duration: 8,
      tags: ['Beer-Lambert', 'ε'],
      statement: [
        {
          type: 'p',
          text: r`Le coefficient d'absorption molaire des ions permanganate à 525 nm vaut $\varepsilon = 2{,}3\times10^{3}\ \mathrm{L\cdot mol^{-1}\cdot cm^{-1}}$. On utilise une cuve de largeur $\ell = 1{,}0\ \mathrm{cm}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            r`Calculer l'absorbance d'une solution à $C = 2{,}0\times10^{-4}\ \mathrm{mol\cdot L^{-1}}$.`,
            'Quelle est la concentration d’une solution d’absorbance A = 0,92 ?',
            'Que devient l’absorbance de la première solution si on utilise une cuve de 2,0 cm ? si on la dilue deux fois ?',
          ],
        },
      ],
      hints: ['A = ε ℓ C.', 'A est proportionnelle à ℓ et à C.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$A = \varepsilon\ell C = 2{,}3\times10^{3}\times1{,}0\times2{,}0\times10^{-4} = 0{,}46$.`,
            r`$C = \dfrac{A}{\varepsilon\ell} = \dfrac{0{,}92}{2{,}3\times10^{3}\times1{,}0} = 4{,}0\times10^{-4}\ \mathrm{mol\cdot L^{-1}}$.`,
            'A est proportionnelle à ℓ : avec ℓ = 2,0 cm, A double et vaut 0,92. A est proportionnelle à C : diluer deux fois divise A par deux, A = 0,23.',
          ],
        },
      ],
    },
    {
      id: 'bac-colorant-e133',
      title: 'Type bac : le colorant bleu d’une boisson',
      difficulty: 3,
      duration: 25,
      tags: ['type bac', 'dosage par étalonnage', 'esprit critique'],
      statement: [
        {
          type: 'p',
          text: 'Une boisson pour sportifs de couleur bleue contient le colorant bleu brillant (E133), seule espèce colorée de la boisson. On cherche à vérifier qu’un consommateur ne risque pas de dépasser la dose journalière admissible (DJA).',
        },
        {
          type: 'keyvalue',
          items: [
            { key: 'Colorant E133', value: r`$M = 792{,}8\ \mathrm{g\cdot mol^{-1}}$ ; maximum d'absorption à 630 nm.` },
            { key: 'Étalonnage', value: r`à 630 nm, cuve $\ell = 1{,}00$ cm : droite passant par l'origine de pente $k = 1{,}30\times10^{5}\ \mathrm{L\cdot mol^{-1}}$.` },
            { key: 'Mesure', value: 'absorbance de la boisson (non diluée) : A = 0,520.' },
            { key: 'DJA', value: '6 mg par kilogramme de masse corporelle et par jour.' },
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Justifier la couleur bleue de la boisson et le choix de la longueur d’onde de travail.',
            'Comment vérifie-t-on expérimentalement que la loi de Beer-Lambert s’applique ?',
            'Déterminer la concentration en quantité de matière, puis la concentration en masse (en mg·L⁻¹) de E133 dans la boisson.',
            'Calculer le volume de boisson qu’une personne de 60 kg devrait boire chaque jour pour atteindre la DJA. Conclure.',
            'Pourquoi le « blanc » doit-il être réalisé avec de l’eau et non avec de l’air ?',
          ],
        },
      ],
      hints: [
        '630 nm correspond à l’orange-rouge.',
        'C = A/k puis C_m = C × M.',
        'Masse maximale = 6 mg/kg × 60 kg ; volume = masse / C_m.',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'E133 absorbe principalement vers 630 nm (orange-rouge) ; la couleur perçue est la couleur complémentaire, le bleu (bleu-vert). On travaille à λ_max = 630 nm pour avoir la meilleure sensibilité.',
            'On mesure les absorbances d’une gamme de solutions étalons : si la courbe A = f(C) est une droite passant par l’origine, A est proportionnelle à C et la loi de Beer-Lambert est vérifiée dans ce domaine de concentrations.',
            r`$C = \dfrac{A}{k} = \dfrac{0{,}520}{1{,}30\times10^{5}} = 4{,}00\times10^{-6}\ \mathrm{mol\cdot L^{-1}}$.\n$C_m = C\times M = 4{,}00\times10^{-6}\times792{,}8 = 3{,}17\times10^{-3}\ \mathrm{g\cdot L^{-1}} = 3{,}17\ \mathrm{mg\cdot L^{-1}}$.`,
            r`Masse maximale journalière : $m_{\max} = 6\times60 = 360\ \mathrm{mg}$. Volume correspondant : $V = \dfrac{m_{\max}}{C_m} = \dfrac{360}{3{,}17} \approx 1\times10^{2}\ \mathrm{L}$ (environ 110 L). Il est impossible de boire un tel volume chaque jour : aucun risque de dépasser la DJA.`,
            'Le blanc doit annuler l’absorption de tout ce qui n’est pas l’espèce dosée : la cuve **et le solvant** (eau). Avec de l’air, l’absorption (faible) de la cuve en plastique et de l’eau serait attribuée au colorant.',
          ],
        },
      ],
    },
  ],

  // ------------------------------------------------------------------ REPRÉSENTATIONS
  representations: [
    {
      type: 'widget',
      id: 'beer-lambert',
      title: 'Loi de Beer-Lambert interactive',
      props: { epsilon: 2300, l: 1 },
      caption: 'Faites varier la concentration en ions permanganate (ε ≈ 2,3 × 10³ L·mol⁻¹·cm⁻¹ à 525 nm) : observez la couleur et l’absorbance, puis déterminez une concentration inconnue avec la courbe d’étalonnage.',
    },
    { type: 'svg', svg: svgSpectro, caption: 'Schéma de principe du spectrophotomètre.' },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Courbe d’étalonnage A = k·C',
      props: {
        expressions: ['k*x'],
        params: [{ name: 'k', min: 0.05, max: 0.5, step: 0.01, value: 0.24 }],
        xMin: 0,
        xMax: 3,
        yMin: 0,
        yMax: 1,
        editable: true,
      },
      caption: 'x = C en mmol·L⁻¹, y = absorbance. La pente k = εℓ dépend de l’espèce et de la longueur d’onde ; avec k = 0,24, une absorbance de 0,410 correspond à C ≈ 1,71 mmol·L⁻¹.',
    },
    { type: 'svg', svg: svgCercle, caption: 'Cercle chromatique : la couleur perçue est diamétralement opposée à la couleur absorbée.', maxWidth: 320 },
    {
      type: 'qcm',
      questions: [
        {
          question: r`Quelle est la masse molaire de $\mathrm{CO_2}$ ? ($M(\mathrm{C}) = 12{,}0$ ; $M(\mathrm{O}) = 16{,}0\ \mathrm{g\cdot mol^{-1}}$)`,
          choices: ['28,0 g·mol⁻¹', '44,0 g·mol⁻¹', '32,0 g·mol⁻¹', '40,0 g·mol⁻¹'],
          answer: 1,
          explanation: r`$M = 12{,}0 + 2\times16{,}0 = 44{,}0\ \mathrm{g\cdot mol^{-1}}$.`,
        },
        {
          question: 'À 20 °C, 4,8 L de dihydrogène gazeux (V_m = 24,0 L·mol⁻¹) correspondent à :',
          choices: ['0,20 mol', '5,0 mol', '0,50 mol', '115 mol'],
          answer: 0,
          explanation: 'n = V/V_m = 4,8/24,0 = 0,20 mol.',
        },
        {
          question: 'On dilue 10 fois une solution. Sa concentration :',
          choices: ['est multipliée par 10', 'est divisée par 10', 'ne change pas', 'est divisée par 100'],
          answer: 1,
          explanation: 'C₁ = C₀/F avec F = 10. La quantité de soluté est conservée, le volume est multiplié par 10.',
        },
        {
          question: 'Pour prélever précisément 10,0 mL de solution mère, on utilise :',
          choices: ['une éprouvette graduée', 'un bécher', 'une pipette jaugée', 'une fiole jaugée'],
          answer: 2,
          explanation: 'La pipette jaugée délivre un volume précis ; la fiole jaugée sert à contenir le volume final.',
        },
        {
          question: 'Une solution absorbe essentiellement le rouge. Elle apparaît :',
          choices: ['rouge', 'jaune', 'bleu-vert (cyan)', 'magenta'],
          answer: 2,
          explanation: 'Couleur perçue = couleur complémentaire de la couleur absorbée : cyan.',
        },
        {
          question: 'L’absorbance A :',
          choices: ['s’exprime en mol·L⁻¹', 'est sans unité', 's’exprime en cm⁻¹', 's’exprime en %'],
          answer: 1,
          explanation: 'A = log(I₀/I) est un logarithme d’un rapport d’intensités : sans unité.',
        },
        {
          question: 'D’après la loi de Beer-Lambert, si on double la concentration d’une solution diluée :',
          choices: ['A est divisée par 2', 'A ne change pas', 'A double', 'A est multipliée par 4'],
          answer: 2,
          explanation: 'A = εℓC : A est proportionnelle à C.',
        },
        {
          question: 'Pour réaliser un dosage par étalonnage, on règle la longueur d’onde :',
          choices: ['au hasard', 'à λ_max de l’espèce dosée', 'à une longueur d’onde où l’espèce n’absorbe pas', 'à 800 nm toujours'],
          answer: 1,
          explanation: 'À λ_max, la sensibilité est maximale.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Constante d’Avogadro', back: r`$N_A = 6{,}02\times10^{23}\ \mathrm{mol^{-1}}$ ; $n = N/N_A$` },
        { front: 'Quantité de matière d’un solide', back: r`$n = m/M$` },
        { front: 'Quantité de matière d’un liquide pur', back: r`$n = \rho V/M$` },
        { front: 'Quantité de matière d’un gaz', back: r`$n = V/V_m$, $V_m \approx 24{,}0\ \mathrm{L\cdot mol^{-1}}$ à 20 °C` },
        { front: 'Concentration en quantité de matière', back: r`$C = n/V_{\text{solution}}$ en $\mathrm{mol\cdot L^{-1}}$` },
        { front: 'Lien entre $C_m$ et $C$', back: r`$C_m = C\times M$` },
        { front: 'Relation de dilution', back: r`$C_0V_0 = C_1V_1$ ; $F = C_0/C_1 = V_1/V_0$` },
        { front: 'Couleur perçue d’une solution', back: 'Couleur complémentaire de la couleur absorbée (opposée sur le cercle chromatique).' },
        { front: 'Absorbance', back: r`$A = \log(I_0/I)$, sans unité, additive.` },
        { front: 'Loi de Beer-Lambert', back: r`$A = \varepsilon\ell C$ ; solutions diluées, lumière monochromatique.` },
        { front: 'Unité de ε', back: 'L·mol⁻¹·cm⁻¹' },
        { front: 'Faire le blanc', back: 'Régler A = 0 avec une cuve contenant le solvant seul.' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque grandeur à son unité',
      pairs: [
        { left: 'Masse molaire M', right: 'g·mol⁻¹' },
        { left: 'Volume molaire V_m', right: 'L·mol⁻¹' },
        { left: 'Concentration C', right: 'mol·L⁻¹' },
        { left: 'Concentration en masse C_m', right: 'g·L⁻¹' },
        { left: 'Coefficient ε', right: 'L·mol⁻¹·cm⁻¹' },
        { left: 'Absorbance A', right: 'sans unité' },
      ],
    },
    {
      type: 'cloze',
      title: 'Dilution',
      text: 'Lors d’une dilution, la {{quantité de matière|quantité}} de soluté se conserve. On prélève la solution mère avec une {{pipette jaugée}} et on complète avec de l’eau distillée dans une {{fiole jaugée}}. Le facteur de dilution F est égal au rapport de la concentration de la solution {{mère}} sur celle de la solution {{fille}}.',
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre les étapes d’un dosage par étalonnage',
      items: [
        'Tracer le spectre d’absorption et repérer λ_max',
        'Préparer une gamme de solutions étalons',
        'Faire le blanc avec le solvant',
        'Mesurer l’absorbance de chaque solution étalon',
        'Tracer la courbe A = f(C) et la modéliser',
        'Mesurer l’absorbance de la solution inconnue et en déduire C',
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Le volume molaire dépend de la nature du gaz.', answer: false, explanation: 'Il ne dépend que de la température et de la pression.' },
        { text: 'La loi de Beer-Lambert est valable pour toutes les concentrations.', answer: false, explanation: 'Seulement pour des solutions suffisamment diluées.' },
        { text: 'ε dépend de la longueur d’onde.', answer: true, explanation: 'C’est précisément ce que montre le spectre d’absorption.' },
        { text: 'Une solution incolore n’absorbe pas dans le visible.', answer: true },
        { text: 'Dans C = n/V, V est le volume de solvant.', answer: false, explanation: 'V est le volume de solution.' },
      ],
    },
  ],
}

export default chapter
