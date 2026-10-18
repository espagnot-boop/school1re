import type { Chapter } from '../types'

const r = String.raw

/* ------------------------------------------------------------------ */
/* Schémas SVG                                                          */
/* ------------------------------------------------------------------ */

const FONT = 'font-family="Geist, sans-serif"'
const BLUE = 'hsl(217 91% 60%)'
const RED = 'hsl(0 84% 60%)'
const GREEN = 'hsl(142 71% 45%)'
const ORANGE = 'hsl(25 95% 53%)'

const arrowDefs = `<defs>
<marker id="ae-arr-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${BLUE}"/></marker>
<marker id="ae-arr-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${RED}"/></marker>
<marker id="ae-arr-g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${GREEN}"/></marker>
<marker id="ae-arr-o" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${ORANGE}"/></marker>
<marker id="ae-arr-k" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker>
</defs>`

/** Circuit : générateur réel (E, r) + conducteur ohmique R, ampèremètre en série, voltmètre en dérivation. */
const svgCircuit = `<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="13">
${arrowDefs}
<g fill="none" stroke="currentColor" stroke-width="1.6">
  <!-- fils -->
  <path d="M80 70 H200"/>
  <path d="M250 70 H360"/>
  <path d="M440 70 H460 V230 H80 V170"/>
  <path d="M80 130 V70"/>
  <!-- pile : deux traits -->
  <line x1="62" y1="130" x2="98" y2="130" stroke-width="2"/>
  <line x1="70" y1="142" x2="90" y2="142" stroke-width="4"/>
  <path d="M80 142 V170"/>
  <!-- ampèremètre -->
  <circle cx="225" cy="70" r="25"/>
  <!-- résistance -->
  <rect x="360" y="58" width="80" height="24"/>
  <!-- voltmètre en dérivation sur R -->
  <path d="M360 70 V20 H382"/>
  <path d="M418 20 H440 V70"/>
</g>
<circle cx="400" cy="20" r="18" fill="none" stroke="currentColor" stroke-width="1.6"/>
<text x="225" y="75" text-anchor="middle" font-size="15" fill="currentColor">A</text>
<text x="400" y="25" text-anchor="middle" font-size="14" fill="currentColor">V</text>
<text x="400" y="104" text-anchor="middle" fill="currentColor">R</text>
<text x="30" y="128" fill="currentColor">+</text>
<text x="30" y="152" fill="currentColor">−</text>
<text x="110" y="145" fill="currentColor">(E, r)</text>
<!-- intensité -->
<line x1="120" y1="70" x2="170" y2="70" stroke="${RED}" stroke-width="2" marker-end="url(#ae-arr-r)"/>
<text x="140" y="60" fill="${RED}">I</text>
<!-- tension aux bornes de R (convention récepteur : flèche opposée au courant) -->
<line x1="440" y1="125" x2="362" y2="125" stroke="${BLUE}" stroke-width="2" marker-end="url(#ae-arr-b)"/>
<text x="395" y="145" fill="${BLUE}">U_R</text>
<!-- tension aux bornes du générateur (convention générateur : même sens que I) -->
<line x1="40" y1="190" x2="40" y2="92" stroke="${GREEN}" stroke-width="2" marker-end="url(#ae-arr-g)"/>
<text x="12" y="200" fill="${GREEN}">U_PN</text>
<text x="260" y="270" text-anchor="middle" fill="currentColor" font-size="12" class="svg-muted">Le courant sort par la borne + du générateur et circule dans le sens conventionnel (+ vers −) à l'extérieur.</text>
</svg>`

/** Modèle de la source réelle : source idéale E en série avec r. */
const svgSourceReelle = `<svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="13">
${arrowDefs}
<rect x="60" y="30" width="250" height="110" fill="none" stroke="currentColor" stroke-dasharray="5 4" stroke-width="1" class="svg-muted"/>
<text x="185" y="22" text-anchor="middle" fill="currentColor" class="svg-muted" font-size="12">source réelle (modèle)</text>
<g fill="none" stroke="currentColor" stroke-width="1.6">
  <path d="M20 85 H90"/>
  <circle cx="115" cy="85" r="25"/>
  <path d="M90 85 H140"/>
  <path d="M140 85 H200"/>
  <rect x="200" y="73" width="60" height="24"/>
  <path d="M260 85 H360"/>
</g>
<circle cx="20" cy="85" r="4" fill="currentColor"/>
<circle cx="360" cy="85" r="4" fill="currentColor"/>
<text x="12" y="110" fill="currentColor">N</text>
<text x="355" y="110" fill="currentColor">P</text>
<text x="115" y="130" text-anchor="middle" fill="currentColor">source idéale E</text>
<text x="230" y="65" text-anchor="middle" fill="currentColor">r</text>
<!-- flèche E -->
<line x1="95" y1="160" x2="135" y2="160" stroke="${GREEN}" stroke-width="2" marker-end="url(#ae-arr-g)"/>
<text x="140" y="165" fill="${GREEN}">E</text>
<!-- flèche rI -->
<line x1="255" y1="160" x2="205" y2="160" stroke="${ORANGE}" stroke-width="2" marker-end="url(#ae-arr-o)"/>
<text x="180" y="165" fill="${ORANGE}">rI</text>
<!-- I -->
<line x1="290" y1="85" x2="335" y2="85" stroke="${RED}" stroke-width="2" marker-end="url(#ae-arr-r)"/>
<text x="305" y="75" fill="${RED}">I</text>
<!-- U_PN -->
<line x1="25" y1="185" x2="355" y2="185" stroke="${BLUE}" stroke-width="2" marker-end="url(#ae-arr-b)"/>
<text x="400" y="190" fill="${BLUE}">U_PN = E − rI</text>
</svg>`

/** Caractéristique U = f(I) d'une source réelle (E = 6,0 V ; r = 4,0 Ω). */
const svgCaracteristique = (() => {
  // axes : origine (60, 240), 1 A -> 250 px (I max 1,6 A -> 400 px), 1 V -> 30 px
  const X = (i: number) => 60 + i * 250
  const Y = (u: number) => 240 - u * 30
  const grid: string[] = []
  for (let i = 0; i <= 16; i += 2) grid.push(`<line x1="${X(i / 10)}" y1="${Y(0)}" x2="${X(i / 10)}" y2="${Y(7)}" class="svg-grid" stroke="currentColor" stroke-opacity="0.12"/>`)
  for (let u = 0; u <= 7; u++) grid.push(`<line x1="${X(0)}" y1="${Y(u)}" x2="${X(1.6)}" y2="${Y(u)}" class="svg-grid" stroke="currentColor" stroke-opacity="0.12"/>`)
  const ticksX = [0, 0.4, 0.8, 1.2, 1.6].map((i) => `<text x="${X(i)}" y="${Y(0) + 18}" text-anchor="middle" fill="currentColor" font-size="11">${String(i).replace('.', ',')}</text>`)
  const ticksY = [0, 2, 4, 6].map((u) => `<text x="${X(0) - 10}" y="${Y(u) + 4}" text-anchor="end" fill="currentColor" font-size="11">${u}</text>`)
  const pts = [0, 0.2, 0.4, 0.6, 0.8, 1.0].map((i) => `<circle cx="${X(i)}" cy="${Y(6 - 4 * i)}" r="3.5" fill="${BLUE}"/>`)
  return `<svg viewBox="0 0 520 290" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
${arrowDefs}
${grid.join('')}
<line x1="${X(0)}" y1="${Y(0)}" x2="${X(1.65)}" y2="${Y(0)}" stroke="currentColor" stroke-width="1.4" marker-end="url(#ae-arr-k)"/>
<line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(7.4)}" stroke="currentColor" stroke-width="1.4" marker-end="url(#ae-arr-k)"/>
${ticksX.join('')}${ticksY.join('')}
<text x="${X(1.6)}" y="${Y(0) + 36}" text-anchor="end" fill="currentColor">I (A)</text>
<text x="${X(0) + 8}" y="${Y(7.2)}" fill="currentColor">U_PN (V)</text>
<line x1="${X(0)}" y1="${Y(6)}" x2="${X(1.5)}" y2="${Y(0)}" stroke="${BLUE}" stroke-width="2"/>
${pts.join('')}
<text x="${X(0) + 8}" y="${Y(6) - 8}" fill="${GREEN}">E = 6,0 V (ordonnée à l'origine)</text>
<text x="${X(1.5)}" y="${Y(0) - 10}" text-anchor="middle" fill="${RED}">I_cc = 1,5 A</text>
<path d="M${X(0.4)} ${Y(4.4)} H${X(0.8)} V${Y(2.8)}" fill="none" stroke="${ORANGE}" stroke-dasharray="4 3" stroke-width="1.5"/>
<text x="${X(0.82)}" y="${Y(3.7)}" fill="${ORANGE}">pente = −r = −4,0 Ω</text>
</svg>`
})()

/** Chaîne énergétique d'un convertisseur. */
const svgChaine = `<svg viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="13">
${arrowDefs}
<rect x="210" y="60" width="140" height="70" fill="none" stroke="currentColor" stroke-width="1.6"/>
<text x="280" y="92" text-anchor="middle" fill="currentColor">convertisseur</text>
<text x="280" y="110" text-anchor="middle" fill="currentColor" font-size="11" class="svg-muted">(moteur, lampe…)</text>
<line x1="30" y1="95" x2="206" y2="95" stroke="${BLUE}" stroke-width="3" marker-end="url(#ae-arr-b)"/>
<text x="40" y="82" fill="${BLUE}">énergie électrique reçue</text>
<text x="40" y="118" fill="${BLUE}" font-size="12">E_reçue = P_reçue·Δt</text>
<line x1="354" y1="95" x2="535" y2="95" stroke="${GREEN}" stroke-width="3" marker-end="url(#ae-arr-g)"/>
<text x="365" y="82" fill="${GREEN}">énergie utile</text>
<text x="365" y="118" fill="${GREEN}" font-size="12">(mécanique, lumineuse…)</text>
<line x1="280" y1="134" x2="280" y2="205" stroke="${RED}" stroke-width="2" marker-end="url(#ae-arr-r)"/>
<text x="292" y="180" fill="${RED}">pertes (transfert thermique,</text>
<text x="292" y="196" fill="${RED}">effet Joule, frottements…)</text>
<text x="280" y="35" text-anchor="middle" fill="currentColor">Conservation : E_reçue = E_utile + E_pertes   ;   η = E_utile / E_reçue &lt; 1</text>
</svg>`

/** Bilan de puissance d'une source réelle. */
const svgBilanSource = `<svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="13">
${arrowDefs}
<rect x="200" y="50" width="160" height="70" fill="none" stroke="currentColor" stroke-width="1.6"/>
<text x="280" y="82" text-anchor="middle" fill="currentColor">pile / batterie</text>
<text x="280" y="100" text-anchor="middle" fill="currentColor" font-size="11" class="svg-muted">source réelle (E, r)</text>
<line x1="30" y1="85" x2="196" y2="85" stroke="${ORANGE}" stroke-width="3" marker-end="url(#ae-arr-o)"/>
<text x="35" y="72" fill="${ORANGE}">P_totale = E·I</text>
<text x="35" y="108" fill="${ORANGE}" font-size="12">(origine chimique)</text>
<line x1="364" y1="85" x2="535" y2="85" stroke="${BLUE}" stroke-width="3" marker-end="url(#ae-arr-b)"/>
<text x="370" y="72" fill="${BLUE}">P_fournie = U_PN·I</text>
<text x="370" y="108" fill="${BLUE}" font-size="12">au reste du circuit</text>
<line x1="280" y1="124" x2="280" y2="185" stroke="${RED}" stroke-width="2" marker-end="url(#ae-arr-r)"/>
<text x="292" y="165" fill="${RED}">P_J = r·I² (effet Joule interne)</text>
<text x="280" y="30" text-anchor="middle" fill="currentColor">E·I = U_PN·I + r·I²</text>
</svg>`

/* ------------------------------------------------------------------ */

const chapter: Chapter = {
  id: 'energie-electrique',
  subject: 'physique-chimie',
  order: 11,
  title: 'Aspects énergétiques des phénomènes électriques',
  theme: "L'énergie : conversions et transferts",
  summary:
    'Porteurs de charge et intensité, tension, loi d’Ohm, modèle de la source réelle (U = E − rI), puissance P = UI, effet Joule, énergie E = P·Δt, bilans de puissance et rendement d’un convertisseur.',
  duration: '2 semaines',
  objectives: [
    'Relier intensité d’un courant continu et débit de charges électriques : $I = \\dfrac{Q}{\\Delta t}$.',
    'Identifier la nature des porteurs de charge dans un métal (électrons) et dans une solution (ions).',
    'Utiliser la loi d’Ohm $U = RI$ pour un conducteur ohmique.',
    'Modéliser une source réelle de tension continue par une source idéale $E$ en série avec une résistance $r$ : $U_{PN} = E - rI$.',
    'Tracer et exploiter la caractéristique $U = f(I)$ d’une source réelle (capacité expérimentale).',
    'Citer et exploiter $P = UI$, $P_J = RI^2$ et $E = P\\,\\Delta t$.',
    'Réaliser un bilan de puissance ou d’énergie dans un circuit.',
    'Définir et calculer le rendement d’un convertisseur ; évaluer le rendement d’un dispositif.',
  ],
  keywords: [
    'charge électrique',
    'intensité',
    'tension',
    'loi d’Ohm',
    'source réelle',
    'résistance interne',
    'force électromotrice',
    'puissance',
    'effet Joule',
    'énergie',
    'kilowattheure',
    'rendement',
    'convertisseur',
  ],

  /* ================================================================ */
  fiche: [
    { type: 'h2', text: 'Charges et courant' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Intensité du courant continu',
      content: [
        {
          type: 'p',
          text: r`L'intensité est le **débit de charges** à travers une section du conducteur : $$I = \frac{Q}{\Delta t}$$ $I$ en ampères (A), $Q$ en coulombs (C), $\Delta t$ en secondes (s). Charge élémentaire : $e = 1{,}60\times10^{-19}\ \text{C}$ ; $N$ porteurs de charge $e$ : $Q = N e$.`,
        },
      ],
    },
    {
      type: 'table',
      headers: ['Milieu', 'Porteurs de charge', 'Sens de déplacement'],
      rows: [
        ['Métal (fil de cuivre…)', 'électrons libres ($-e$)', 'opposé au sens conventionnel du courant'],
        ['Solution ionique', 'cations ($+$) et anions ($-$)', 'cations dans le sens du courant, anions en sens inverse'],
      ],
    },
    { type: 'h2', text: 'Dipôles' },
    {
      type: 'table',
      headers: ['Dipôle', 'Relation', 'Remarque'],
      rows: [
        ['Conducteur ohmique', '$U = RI$', 'convention récepteur ; $R$ en ohms (Ω)'],
        ['Source idéale de tension', '$U_{PN} = E$', '$E$ : force électromotrice (V), indépendante de $I$'],
        ['Source réelle de tension', '$U_{PN} = E - rI$', 'convention générateur ; $r$ : résistance interne'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Caractéristique d’une source réelle',
      content: [
        {
          type: 'p',
          text: r`$U_{PN} = f(I)$ est une **droite décroissante** : ordonnée à l'origine $E$ (tension à vide), coefficient directeur $-r$. Courant de court-circuit : $I_{cc} = \dfrac{E}{r}$.`,
        },
      ],
    },
    { type: 'h2', text: 'Puissance et énergie' },
    {
      type: 'table',
      headers: ['Grandeur', 'Formule', 'Unités'],
      rows: [
        ['Puissance électrique reçue ou fournie', '$P = U I$', 'W = V·A'],
        ['Effet Joule (conducteur ohmique)', '$P_J = R I^2 = \\dfrac{U^2}{R}$', 'W'],
        ['Énergie transférée', '$E = P\\,\\Delta t$', 'J (si $P$ en W, $\\Delta t$ en s) ou kWh'],
        ['Conversion', '$1\\ \\text{kWh} = 3{,}6\\times10^{6}\\ \\text{J}$', ''],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Bilan de puissance d’une source réelle',
      content: [
        { type: 'math', tex: String.raw`\underbrace{E\,I}_{\text{puissance totale}} = \underbrace{U_{PN}\,I}_{\text{fournie au circuit}} + \underbrace{r\,I^2}_{\text{effet Joule interne}}` },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Rendement d’un convertisseur',
      content: [
        {
          type: 'p',
          text: r`$$\eta = \frac{P_{\text{utile}}}{P_{\text{reçue}}} = \frac{E_{\text{utile}}}{E_{\text{reçue}}}$$ sans unité, $0 \le \eta < 1$ (souvent en %). Conservation de l'énergie : $E_{\text{reçue}} = E_{\text{utile}} + E_{\text{pertes}}$.`,
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
            'Convertir les durées en secondes (et les mA en A) avant de calculer.',
            'Les kWh sont des unités d’**énergie**, pas de puissance.',
            'Ne pas confondre la **f.é.m.** $E$ (une tension, en V) et l’**énergie** $E$ (en J) : préciser l’indice ($E_{\\text{él}}$).',
            'Un rendement est toujours strictement inférieur à 1.',
          ],
        },
      ],
    },
  ],

  /* ================================================================ */
  cours: [
    { type: 'h2', text: '1. Porteurs de charge et intensité du courant' },
    { type: 'h3', text: '1.1 La charge électrique' },
    {
      type: 'p',
      text: r`La matière contient des particules chargées : électrons (charge $-e$), protons (charge $+e$), ions. La charge électrique se mesure en **coulombs** (C). Toute charge est un multiple entier de la **charge élémentaire** $e = 1{,}60\times10^{-19}\ \text{C}$ : on dit que la charge est **quantifiée**.`,
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Porteurs de charge',
      content: [
        {
          type: 'list',
          items: [
            r`Dans un **métal**, le courant est dû au déplacement d'ensemble des **électrons libres** (ou « de conduction »).`,
            r`Dans une **solution électrolytique**, le courant est dû au déplacement des **ions** : les cations se déplacent dans le sens conventionnel du courant, les anions en sens inverse.`,
          ],
        },
      ],
    },
    {
      type: 'p',
      text: r`Le **sens conventionnel du courant** a été choisi historiquement (avant la découverte de l'électron) : à l'extérieur du générateur, le courant va de la borne $+$ vers la borne $-$. Les électrons, de charge négative, se déplacent donc en **sens inverse** du sens conventionnel.`,
    },
    { type: 'h3', text: '1.2 Intensité : un débit de charges' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Intensité d’un courant continu',
      content: [
        {
          type: 'p',
          text: r`Si une charge $Q$ (en valeur absolue) traverse une section du conducteur pendant la durée $\Delta t$, l'intensité du courant continu est : $$I = \frac{Q}{\Delta t}$$ avec $I$ en ampères (A), $Q$ en coulombs (C) et $\Delta t$ en secondes (s). Ainsi $1\ \text{A} = 1\ \text{C·s}^{-1}$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé',
      content: [
        {
          type: 'p',
          text: r`Un fil est parcouru par un courant d'intensité $I = 0{,}20\ \text{A}$ pendant $\Delta t = 5{,}0\ \text{min}$. Charge transportée : $Q = I\,\Delta t = 0{,}20 \times 300 = 60\ \text{C}$. Nombre d'électrons : $N = \dfrac{Q}{e} = \dfrac{60}{1{,}60\times10^{-19}} = 3{,}8\times10^{20}$ électrons.`,
        },
      ],
    },
    {
      type: 'p',
      text: r`L'intensité se mesure avec un **ampèremètre branché en série** (le courant doit le traverser). On entre par la borne « A » ou « mA » et on sort par la borne « COM ». Dans un circuit en série, l'intensité est la même en tout point ; à un nœud, la somme des intensités qui arrivent est égale à la somme des intensités qui repartent (**loi des nœuds**, conséquence de la conservation de la charge).`,
    },
    { type: 'h2', text: '2. Tension et loi d’Ohm' },
    {
      type: 'p',
      text: r`La **tension** $U_{AB} = V_A - V_B$ entre deux points A et B est une différence de potentiel électrique ; elle s'exprime en **volts** (V) et se mesure avec un **voltmètre branché en dérivation** (borne V du côté de A, borne COM du côté de B). On la représente par une flèche dirigée **vers A** (la pointe vers le premier point de l'indice).`,
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Conventions d’orientation',
      content: [
        {
          type: 'list',
          items: [
            r`**Convention récepteur** : flèche tension et flèche courant de sens **opposés**. Utilisée pour les récepteurs (conducteur ohmique, moteur, lampe…).`,
            r`**Convention générateur** : flèche tension et flèche courant de **même sens**. Utilisée pour les générateurs (pile, batterie…).`,
          ],
        },
      ],
    },
    { type: 'svg', svg: svgCircuit, caption: 'Circuit série : pile réelle, ampèremètre, conducteur ohmique R et voltmètre en dérivation. Flèches de tension en convention récepteur (R) et générateur (pile).', maxWidth: 620 },
    {
      type: 'callout',
      variant: 'property',
      title: 'Loi d’Ohm',
      content: [
        {
          type: 'p',
          text: r`Pour un **conducteur ohmique** en convention récepteur, la tension à ses bornes est proportionnelle à l'intensité qui le traverse : $$U = R\,I$$ $R$ est la **résistance**, en ohms (Ω). Sa caractéristique $U = f(I)$ est une droite passant par l'origine, de coefficient directeur $R$.`,
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
          text: r`Un conducteur ohmique de résistance $R = 470\ \Omega$ est soumis à une tension $U = 9{,}4\ \text{V}$. Intensité : $I = \dfrac{U}{R} = \dfrac{9{,}4}{470} = 2{,}0\times10^{-2}\ \text{A} = 20\ \text{mA}$.`,
        },
      ],
    },
    { type: 'h2', text: '3. Modèle d’une source réelle de tension continue' },
    { type: 'h3', text: '3.1 Source idéale et source réelle' },
    {
      type: 'p',
      text: r`Une **source idéale de tension** maintient entre ses bornes une tension constante $E$, quelle que soit l'intensité débitée. $E$ s'appelle la **force électromotrice** (f.é.m.), elle s'exprime en volts.`,
    },
    {
      type: 'p',
      text: r`Pour une **source réelle** (pile, batterie, alimentation), on constate expérimentalement que la tension entre ses bornes **diminue** quand l'intensité débitée augmente : une partie de l'énergie est dissipée à l'intérieur de la source.`,
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Modèle de la source réelle',
      content: [
        {
          type: 'p',
          text: r`Une source réelle de tension continue est modélisée par l'**association en série** d'une source idéale de f.é.m. $E$ et d'un conducteur ohmique de résistance $r$, appelée **résistance interne**. En convention générateur : $$U_{PN} = E - r\,I$$`,
        },
      ],
    },
    { type: 'svg', svg: svgSourceReelle, caption: 'Modèle équivalent d’une source réelle : la tension disponible est E diminuée de la chute de tension rI dans la résistance interne.', maxWidth: 620 },
    {
      type: 'list',
      items: [
        r`**À vide** ($I = 0$) : $U_{PN} = E$. On mesure donc la f.é.m. avec un voltmètre branché seul aux bornes de la source (le voltmètre ne débite pratiquement aucun courant).`,
        r`**En court-circuit** ($U_{PN} = 0$) : $I_{cc} = \dfrac{E}{r}$. Ce courant peut être très intense si $r$ est petit : danger d'échauffement (et d'incendie pour une batterie).`,
        r`Si $r$ est négligeable devant les autres résistances du circuit, la source se comporte comme une source idéale.`,
      ],
    },
    { type: 'h3', text: '3.2 Caractéristique : méthode expérimentale' },
    {
      type: 'steps',
      items: [
        { title: 'Montage', text: r`Brancher la source en série avec un ampèremètre et un rhéostat (résistance variable) ; brancher un voltmètre aux bornes de la source.` },
        { title: 'Mesures', text: r`Faire varier la résistance du rhéostat et relever plusieurs couples $(I ; U_{PN})$, en commençant par la mesure à vide.` },
        { title: 'Tracé', text: r`Tracer $U_{PN}$ en fonction de $I$ : les points sont alignés sur une droite décroissante.` },
        { title: 'Modélisation', text: r`Modéliser par une fonction affine $U_{PN} = a I + b$ : on identifie $E = b$ et $r = -a$.` },
      ],
    },
    { type: 'svg', svg: svgCaracteristique, caption: 'Caractéristique d’une pile : E = 6,0 V, r = 4,0 Ω. Points de mesure et droite modélisée.', maxWidth: 600 },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exploiter une caractéristique',
      content: [
        {
          type: 'p',
          text: r`Sur la caractéristique ci-dessus : à $I = 0$, $U_{PN} = 6{,}0\ \text{V}$ donc $E = 6{,}0\ \text{V}$. Entre $I = 0{,}40\ \text{A}$ ($U = 4{,}4\ \text{V}$) et $I = 0{,}80\ \text{A}$ ($U = 2{,}8\ \text{V}$), le coefficient directeur vaut $\dfrac{2{,}8 - 4{,}4}{0{,}80 - 0{,}40} = -4{,}0\ \Omega$, donc $r = 4{,}0\ \Omega$. Courant de court-circuit : $I_{cc} = 6{,}0 / 4{,}0 = 1{,}5\ \text{A}$.`,
        },
      ],
    },
    { type: 'h3', text: '3.3 Point de fonctionnement' },
    {
      type: 'p',
      text: r`Lorsqu'on branche la source réelle $(E, r)$ aux bornes d'un conducteur ohmique $R$, la tension est la même aux bornes des deux dipôles : $E - rI = RI$, d'où $$I = \frac{E}{R + r}$$ Graphiquement, le point de fonctionnement est l'intersection des deux caractéristiques.`,
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        {
          type: 'p',
          text: r`Pile $E = 4{,}5\ \text{V}$, $r = 1{,}5\ \Omega$ et $R = 7{,}5\ \Omega$ : $I = \dfrac{4{,}5}{9{,}0} = 0{,}50\ \text{A}$ et $U_{PN} = RI = 3{,}75\ \text{V}$ ; on vérifie $E - rI = 4{,}5 - 0{,}75 = 3{,}75\ \text{V}$.`,
        },
      ],
    },
    { type: 'h2', text: '4. Puissance et énergie électriques' },
    { type: 'h3', text: '4.1 Puissance électrique' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Puissance électrique',
      content: [
        {
          type: 'p',
          text: r`Un dipôle soumis à une tension $U$ et traversé par un courant $I$ (continus) échange avec le reste du circuit une puissance électrique : $$P = U\,I$$ $P$ en watts (W), $U$ en volts (V), $I$ en ampères (A). En convention récepteur, $P > 0$ est la puissance **reçue** ; en convention générateur, c'est la puissance **fournie**.`,
        },
      ],
    },
    {
      type: 'p',
      text: r`La puissance est un **débit d'énergie** : elle indique la quantité d'énergie transférée par seconde ($1\ \text{W} = 1\ \text{J·s}^{-1}$). La puissance indiquée sur un appareil est sa **puissance nominale**, valable sous sa tension nominale (230 V pour le secteur en France).`,
    },
    { type: 'h3', text: '4.2 Énergie électrique' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Énergie transférée',
      content: [
        {
          type: 'p',
          text: r`Pendant une durée $\Delta t$, à puissance constante : $$E_{\text{él}} = P\,\Delta t = U\,I\,\Delta t$$ En joules (J) si $P$ en W et $\Delta t$ en s ; en **kilowattheures** (kWh) si $P$ en kW et $\Delta t$ en h. $1\ \text{kWh} = 1000\ \text{W} \times 3600\ \text{s} = 3{,}6\times10^{6}\ \text{J}$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : consommation d’un radiateur',
      content: [
        {
          type: 'p',
          text: r`Un radiateur de $1{,}5\ \text{kW}$ fonctionne $4{,}0\ \text{h}$ : $E = 1{,}5 \times 4{,}0 = 6{,}0\ \text{kWh} = 6{,}0 \times 3{,}6\times10^{6} = 2{,}2\times10^{7}\ \text{J}$. À $0{,}25$ € le kWh, le coût est $1{,}50$ €.`,
        },
      ],
    },
    {
      type: 'p',
      text: r`La **capacité** d'une batterie est souvent donnée en ampères-heures (A·h) : c'est la charge qu'elle peut débiter, $Q = I\,\Delta t$ ($1\ \text{A·h} = 3600\ \text{C}$). L'énergie stockée vaut approximativement $E_{\text{él}} = U \times Q$ (par exemple $12\ \text{V} \times 50\ \text{A·h} = 600\ \text{W·h} = 0{,}60\ \text{kWh}$).`,
    },
    { type: 'h3', text: '4.3 Effet Joule' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Effet Joule',
      content: [
        {
          type: 'p',
          text: r`L'**effet Joule** est la conversion d'énergie électrique en énergie thermique dans un conducteur parcouru par un courant (dû aux « chocs » des porteurs de charge sur les ions du réseau). Pour un conducteur ohmique, toute la puissance reçue est dissipée par effet Joule : $$P_J = U I = R I^2 = \frac{U^2}{R}$$`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Démonstration',
      content: [
        {
          type: 'p',
          text: r`Avec la loi d'Ohm $U = RI$ : $P = UI = (RI)\,I = RI^2$. Et comme $I = U/R$ : $P = U \cdot \dfrac{U}{R} = \dfrac{U^2}{R}$.`,
        },
      ],
    },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Effet Joule utile', text: 'Radiateur, bouilloire, grille-pain, fer à repasser, fusible (fusion du fil en cas de surintensité).', icon: 'Flame' },
        { title: 'Effet Joule nuisible', text: 'Pertes en ligne dans les câbles, échauffement des moteurs, des chargeurs, des composants électroniques.', icon: 'ThermometerSun' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Pourquoi transporter l’électricité sous très haute tension ?',
      content: [
        {
          type: 'p',
          text: r`Pour transporter une puissance $P = UI$ donnée, augmenter $U$ permet de diminuer $I$. Les pertes par effet Joule dans les câbles de résistance $R_{\text{ligne}}$ valent $R_{\text{ligne}} I^2$ : diviser $I$ par 10 divise ces pertes par 100. D'où des lignes à 400 000 V.`,
        },
      ],
    },
    { type: 'h2', text: '5. Bilans de puissance et d’énergie' },
    {
      type: 'p',
      text: r`L'énergie se **conserve** : dans un circuit, la puissance fournie par le générateur est égale à la somme des puissances reçues par les récepteurs. Pour chaque dipôle, l'énergie reçue est intégralement convertie ou transférée sous d'autres formes.`,
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Bilan de puissance d’une source réelle',
      content: [
        {
          type: 'p',
          text: r`En multipliant $U_{PN} = E - rI$ par $I$ : $$E\,I = U_{PN}\,I + r\,I^2$$ La puissance $EI$ (d'origine chimique pour une pile) est en partie fournie au circuit ($U_{PN} I$) et en partie dissipée par effet Joule dans la source ($rI^2$).`,
        },
      ],
    },
    { type: 'svg', svg: svgBilanSource, caption: 'Diagramme de puissances d’une source réelle.', maxWidth: 620 },
    {
      type: 'callout',
      variant: 'property',
      title: 'Bilan pour un moteur',
      content: [
        {
          type: 'p',
          text: r`Un moteur reçoit la puissance électrique $P_e = UI$. Elle est convertie en puissance mécanique utile $P_m$, le reste étant perdu par effet Joule dans les bobinages ($r' I^2$) et par frottements : $$U I = P_m + r' I^2 + P_{\text{frottements}}$$`,
        },
      ],
    },
    { type: 'h2', text: '6. Rendement d’un convertisseur' },
    {
      type: 'p',
      text: r`Un **convertisseur** est un système qui convertit une forme d'énergie en une autre : moteur (électrique → mécanique), lampe (électrique → lumineuse), panneau photovoltaïque (lumineuse → électrique), batterie en charge (électrique → chimique)…`,
    },
    { type: 'svg', svg: svgChaine, caption: 'Chaîne énergétique d’un convertisseur électrique.', maxWidth: 640 },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Rendement',
      content: [
        {
          type: 'p',
          text: r`Le rendement $\eta$ (lettre grecque « êta ») d'un convertisseur est le rapport de l'énergie utile qu'il fournit à l'énergie qu'il reçoit (ou des puissances correspondantes) : $$\eta = \frac{E_{\text{utile}}}{E_{\text{reçue}}} = \frac{P_{\text{utile}}}{P_{\text{reçue}}}$$ C'est un nombre sans unité, compris entre 0 et 1, souvent exprimé en pourcentage.`,
        },
      ],
    },
    {
      type: 'table',
      headers: ['Convertisseur', 'Énergie reçue', 'Énergie utile', 'Rendement typique'],
      rows: [
        ['Moteur électrique', 'électrique', 'mécanique', '80 % à 95 %'],
        ['Lampe à incandescence', 'électrique', 'lumineuse', '≈ 5 %'],
        ['Lampe à DEL', 'électrique', 'lumineuse', '≈ 30 % à 40 %'],
        ['Panneau photovoltaïque', 'lumineuse (rayonnement)', 'électrique', '15 % à 22 %'],
        ['Radiateur électrique', 'électrique', 'thermique', '≈ 100 %'],
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Identifier', text: 'la forme d’énergie reçue et la forme d’énergie utile (ce pour quoi on a conçu l’appareil).' },
        { title: 'Calculer', text: r`les puissances (ou énergies) reçue et utile avec des unités cohérentes : $P = UI$, $E = P\Delta t$, $Q = mc\Delta\theta$…` },
        { title: 'Conclure', text: r`$\eta = P_u / P_r$ ; vérifier que $0 < \eta < 1$. Les pertes valent $P_r - P_u$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : moteur de jouet',
      content: [
        {
          type: 'p',
          text: r`Un moteur alimenté sous $U = 6{,}0\ \text{V}$ est parcouru par $I = 0{,}50\ \text{A}$ et fournit une puissance mécanique de $2{,}1\ \text{W}$. $P_r = 6{,}0 \times 0{,}50 = 3{,}0\ \text{W}$ ; $\eta = \dfrac{2{,}1}{3{,}0} = 0{,}70 = 70\ \%$. Pertes : $3{,}0 - 2{,}1 = 0{,}9\ \text{W}$ (effet Joule, frottements).`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Erreurs fréquentes',
      content: [
        {
          type: 'list',
          items: [
            r`Oublier de convertir les minutes en secondes dans $E = P\Delta t$.`,
            r`Écrire « kW/h » : l'unité correcte est le kWh (kilowatt **multiplié** par heure).`,
            r`Utiliser $RI^2$ pour un moteur entier : $RI^2$ ne représente que la partie dissipée par effet Joule.`,
            r`Trouver un rendement supérieur à 1 : il y a une erreur (inversion utile/reçue ou unités).`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Repères historiques',
      content: [
        {
          type: 'p',
          text: r`Georg Simon **Ohm** publie en 1827 la loi qui porte son nom. James Prescott **Joule** établit vers 1841 que la chaleur dégagée par un conducteur est proportionnelle à $RI^2$, et contribue à fonder le principe de conservation de l'énergie. Alessandro **Volta** avait inventé la pile en 1800.`,
        },
      ],
    },
  ],

  /* ================================================================ */
  exercices: [
    {
      id: 'ee-charge-electrons',
      title: 'Charge et nombre d’électrons',
      difficulty: 1,
      duration: 5,
      tags: ['intensité', 'charge'],
      statement: [
        {
          type: 'p',
          text: r`Un fil de cuivre est parcouru par un courant continu d'intensité $I = 0{,}50\ \text{A}$ pendant $\Delta t = 2{,}0\ \text{min}$. Donnée : $e = 1{,}60\times10^{-19}\ \text{C}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quels sont les porteurs de charge dans le cuivre ? Dans quel sens se déplacent-ils ?',
            'Calculer la charge $Q$ ayant traversé une section du fil.',
            'En déduire le nombre $N$ d’électrons correspondant.',
          ],
        },
      ],
      hints: ['$Q = I\\,\\Delta t$ avec $\\Delta t$ en secondes.', '$Q = N e$.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Dans un métal, les porteurs de charge sont les **électrons libres** ; ils se déplacent dans le sens **opposé** au sens conventionnel du courant (de la borne $-$ vers la borne $+$ à l’extérieur du générateur).',
            r`$\Delta t = 2{,}0\ \text{min} = 120\ \text{s}$, donc $Q = I\,\Delta t = 0{,}50 \times 120 = 60\ \text{C}$.`,
            r`$N = \dfrac{Q}{e} = \dfrac{60}{1{,}60\times10^{-19}} = 3{,}75\times10^{20} \approx 3{,}8\times10^{20}$ électrons.`,
          ],
        },
      ],
    },
    {
      id: 'ee-loi-ohm',
      title: 'Loi d’Ohm et puissance dissipée',
      difficulty: 1,
      duration: 6,
      tags: ['loi d’Ohm', 'effet Joule'],
      statement: [
        { type: 'p', text: r`Un conducteur ohmique de résistance $R = 220\ \Omega$ est soumis à une tension $U = 5{,}0\ \text{V}$.` },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer l’intensité du courant qui le traverse (en mA).',
            'Calculer la puissance qu’il reçoit de deux façons différentes.',
            'Sous quelle forme cette puissance est-elle convertie ? Quelle énergie est dissipée en 1,0 h ?',
          ],
        },
      ],
      hints: ['$I = U/R$.', '$P = UI$ ou $P = U^2/R$.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$I = \dfrac{U}{R} = \dfrac{5{,}0}{220} = 2{,}27\times10^{-2}\ \text{A} \approx 23\ \text{mA}$.`,
            r`$P = UI = 5{,}0 \times 2{,}27\times10^{-2} = 0{,}11\ \text{W}$ ; ou $P = \dfrac{U^2}{R} = \dfrac{25}{220} = 0{,}11\ \text{W}$ (plus précis : $0{,}114\ \text{W}$).`,
            r`Toute la puissance est convertie en **énergie thermique** par effet Joule. $E = P\,\Delta t = 0{,}114 \times 3600 = 4{,}1\times10^{2}\ \text{J}$.`,
          ],
        },
      ],
    },
    {
      id: 'ee-caracteristique',
      title: 'Exploiter la caractéristique d’une pile',
      difficulty: 1,
      duration: 8,
      tags: ['source réelle', 'caractéristique'],
      statement: [
        { type: 'p', text: 'On a relevé la tension aux bornes d’une pile en fonction de l’intensité débitée :' },
        {
          type: 'table',
          headers: ['$I$ (A)', '0', '0,20', '0,40', '0,60'],
          rows: [['$U_{PN}$ (V)', '6,0', '5,2', '4,4', '3,6']],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Justifier que la pile peut être modélisée par une source réelle de tension.',
            'Déterminer sa force électromotrice $E$ et sa résistance interne $r$.',
            'Calculer l’intensité de court-circuit. Pourquoi ne faut-il jamais court-circuiter une batterie ?',
          ],
        },
      ],
      hints: ['La tension diminue de la même quantité à chaque pas de 0,20 A.', 'Coefficient directeur $= -r$.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`Quand $I$ augmente de $0{,}20\ \text{A}$, $U_{PN}$ diminue toujours de $0{,}8\ \text{V}$ : les points sont alignés sur une **droite décroissante**, ce qui correspond au modèle $U_{PN} = E - rI$.`,
            r`À $I = 0$ : $E = 6{,}0\ \text{V}$. Coefficient directeur : $\dfrac{3{,}6 - 6{,}0}{0{,}60 - 0} = -4{,}0\ \Omega$, donc $r = 4{,}0\ \Omega$.`,
            r`$I_{cc} = \dfrac{E}{r} = \dfrac{6{,}0}{4{,}0} = 1{,}5\ \text{A}$. Pour une batterie de résistance interne très faible (quelques mΩ), $I_{cc}$ serait énorme : l'effet Joule $rI^2$ provoquerait un échauffement dangereux (incendie, explosion).`,
          ],
        },
      ],
    },
    {
      id: 'ee-point-fonctionnement',
      title: 'Pile branchée sur un conducteur ohmique : bilan',
      difficulty: 2,
      duration: 12,
      tags: ['source réelle', 'bilan de puissance', 'rendement'],
      statement: [
        {
          type: 'p',
          text: r`Une pile de f.é.m. $E = 4{,}5\ \text{V}$ et de résistance interne $r = 1{,}5\ \Omega$ alimente un conducteur ohmique de résistance $R = 7{,}5\ \Omega$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Établir l’expression de l’intensité $I$ du courant, puis la calculer.',
            'Calculer la tension $U_{PN}$ aux bornes de la pile.',
            'Calculer la puissance totale $EI$, la puissance dissipée dans la pile et la puissance fournie au conducteur ohmique. Vérifier le bilan.',
            'Définir et calculer le rendement de la pile.',
          ],
        },
      ],
      hints: ['La tension aux bornes de la pile est aussi la tension aux bornes de R.', '$E - rI = RI$.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`Les deux dipôles ont la même tension à leurs bornes : $E - rI = RI$, d'où $I = \dfrac{E}{R + r} = \dfrac{4{,}5}{7{,}5 + 1{,}5} = 0{,}50\ \text{A}$.`,
            r`$U_{PN} = E - rI = 4{,}5 - 1{,}5\times0{,}50 = 3{,}75\ \text{V} \approx 3{,}8\ \text{V}$ (vérification : $RI = 7{,}5 \times 0{,}50 = 3{,}75\ \text{V}$).`,
            r`$P_{\text{tot}} = EI = 4{,}5 \times 0{,}50 = 2{,}25\ \text{W}$ ; $P_J = rI^2 = 1{,}5 \times 0{,}50^2 = 0{,}375\ \text{W}$ ; $P_f = U_{PN} I = 3{,}75 \times 0{,}50 = 1{,}875\ \text{W}$. Bilan : $1{,}875 + 0{,}375 = 2{,}25\ \text{W}$ ✓.`,
            r`$\eta = \dfrac{P_f}{P_{\text{tot}}} = \dfrac{1{,}875}{2{,}25} = 0{,}83 = 83\ \%$ (on remarque que $\eta = U_{PN}/E$).`,
          ],
        },
      ],
    },
    {
      id: 'ee-bouilloire',
      title: 'Bouilloire électrique',
      difficulty: 2,
      duration: 12,
      tags: ['effet Joule', 'énergie', 'rendement'],
      statement: [
        {
          type: 'p',
          text: r`Une bouilloire porte l'indication « 230 V – 2 200 W ». On y chauffe $1{,}0\ \text{L}$ d'eau ($m = 1{,}0\ \text{kg}$) de $20\ ^\circ\text{C}$ à $100\ ^\circ\text{C}$ en $3{,}0\ \text{min}$. Donnée : capacité thermique massique de l'eau $c = 4{,}18\times10^{3}\ \text{J·kg}^{-1}\text{·°C}^{-1}$ ; l'énergie reçue par l'eau vaut $Q = m c \Delta\theta$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer l’intensité du courant et la résistance de l’élément chauffant.',
            'Calculer l’énergie électrique reçue par la bouilloire en joules puis en kWh.',
            'Calculer l’énergie reçue par l’eau, puis le rendement de la bouilloire. Où passe l’énergie perdue ?',
          ],
        },
      ],
      hints: ['$I = P/U$, $R = U^2/P$.', '$\\Delta t = 180$ s.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$I = \dfrac{P}{U} = \dfrac{2200}{230} = 9{,}6\ \text{A}$ ; $R = \dfrac{U^2}{P} = \dfrac{230^2}{2200} = 24\ \Omega$.`,
            r`$E_{\text{él}} = P\,\Delta t = 2200 \times 180 = 3{,}96\times10^{5}\ \text{J}$ ; en kWh : $2{,}2\ \text{kW} \times 0{,}050\ \text{h} = 0{,}11\ \text{kWh}$ (on vérifie : $3{,}96\times10^{5}/3{,}6\times10^{6} = 0{,}11$).`,
            r`$Q = m c \Delta\theta = 1{,}0 \times 4{,}18\times10^{3} \times 80 = 3{,}34\times10^{5}\ \text{J}$. $\eta = \dfrac{3{,}34\times10^{5}}{3{,}96\times10^{5}} = 0{,}84 = 84\ \%$. Les 16 % restants chauffent la bouilloire elle-même et l'air ambiant (transferts thermiques vers l'extérieur).`,
          ],
        },
      ],
    },
    {
      id: 'ee-moteur',
      title: 'Bilan de puissance d’un moteur',
      difficulty: 2,
      duration: 12,
      tags: ['moteur', 'bilan', 'rendement'],
      statement: [
        {
          type: 'p',
          text: r`Un petit moteur à courant continu est alimenté sous $U = 12\ \text{V}$ et parcouru par $I = 2{,}0\ \text{A}$. La résistance de son bobinage vaut $r' = 1{,}5\ \Omega$ et les pertes par frottements valent $2{,}0\ \text{W}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la puissance électrique reçue par le moteur.',
            'Calculer la puissance perdue par effet Joule.',
            'En déduire la puissance mécanique utile et le rendement.',
            'Calculer l’énergie mécanique fournie en 10 min et dessiner la chaîne énergétique.',
          ],
        },
      ],
      hints: ['$P_J = r\'I^2$.', '$P_m = P_e - P_J - P_{\\text{frott}}$.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$P_e = UI = 12 \times 2{,}0 = 24\ \text{W}$.`,
            r`$P_J = r' I^2 = 1{,}5 \times 2{,}0^2 = 6{,}0\ \text{W}$.`,
            r`Conservation de l'énergie : $P_m = 24 - 6{,}0 - 2{,}0 = 16\ \text{W}$ ; $\eta = \dfrac{16}{24} = 0{,}67 = 67\ \%$.`,
            r`$E_m = P_m\,\Delta t = 16 \times 600 = 9{,}6\times10^{3}\ \text{J}$. Chaîne : énergie électrique (24 W) → **moteur** → énergie mécanique (16 W) + transfert thermique (6,0 W effet Joule + 2,0 W frottements).`,
          ],
        },
      ],
    },
    {
      id: 'ee-del',
      title: 'Résistance de protection d’une DEL',
      difficulty: 2,
      duration: 10,
      tags: ['loi d’Ohm', 'puissance'],
      statement: [
        {
          type: 'p',
          text: r`Une DEL doit être traversée par un courant $I = 20\ \text{mA}$ ; la tension à ses bornes est alors $U_D = 2{,}0\ \text{V}$. On l'alimente avec une pile (supposée idéale) de $9{,}0\ \text{V}$ en plaçant en série un conducteur ohmique de protection $R$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quelle doit être la tension aux bornes de $R$ ? En déduire la valeur de $R$.',
            'Calculer la puissance reçue par la DEL, par $R$ et la puissance fournie par la pile.',
            'Pourquoi peut-on dire que ce montage a un mauvais rendement ?',
          ],
        },
      ],
      hints: ['Loi des mailles : $9{,}0 = U_R + U_D$.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`Loi des mailles : $U_R = 9{,}0 - 2{,}0 = 7{,}0\ \text{V}$ ; $R = \dfrac{U_R}{I} = \dfrac{7{,}0}{0{,}020} = 350\ \Omega$ (on choisirait la valeur normalisée $330\ \Omega$ ou $390\ \Omega$).`,
            r`$P_D = 2{,}0 \times 0{,}020 = 0{,}040\ \text{W}$ ; $P_R = 7{,}0 \times 0{,}020 = 0{,}14\ \text{W}$ ; $P_{\text{pile}} = 9{,}0 \times 0{,}020 = 0{,}18\ \text{W} = P_D + P_R$ ✓.`,
            r`Seuls $0{,}040 / 0{,}18 \approx 22\ \%$ de la puissance vont à la DEL (et la DEL n'en convertit elle-même qu'une partie en lumière) : 78 % sont dissipés par effet Joule dans $R$.`,
          ],
        },
      ],
    },
    {
      id: 'ee-deux-mesures',
      title: 'Déterminer E et r à partir de deux mesures',
      difficulty: 3,
      duration: 12,
      tags: ['source réelle', 'méthode'],
      statement: [
        {
          type: 'p',
          text: r`Une batterie de voiture débite $I_1 = 2{,}0\ \text{A}$ sous $U_1 = 11{,}6\ \text{V}$, puis $I_2 = 5{,}0\ \text{A}$ sous $U_2 = 11{,}0\ \text{V}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire le système d’équations vérifié par $E$ et $r$, et le résoudre.',
            'Calculer le rendement de la batterie pour $I_2$.',
            'La batterie débite maintenant $I_3 = 20\\ \\text{A}$. Calculer la tension à ses bornes et la puissance dissipée en son sein. Commenter.',
          ],
        },
      ],
      hints: ['$U_1 = E - rI_1$ et $U_2 = E - rI_2$ : soustraire les deux équations.', '$\\eta = U/E$.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$11{,}6 = E - 2{,}0\,r$ et $11{,}0 = E - 5{,}0\,r$. Par soustraction : $0{,}6 = 3{,}0\,r$ donc $r = 0{,}20\ \Omega$, puis $E = 11{,}6 + 2{,}0 \times 0{,}20 = 12{,}0\ \text{V}$.`,
            r`$\eta = \dfrac{U_2 I_2}{E I_2} = \dfrac{U_2}{E} = \dfrac{11{,}0}{12{,}0} = 0{,}917 \approx 92\ \%$.`,
            r`$U_3 = E - rI_3 = 12{,}0 - 0{,}20 \times 20 = 8{,}0\ \text{V}$ ; $P_J = rI_3^2 = 0{,}20 \times 20^2 = 80\ \text{W}$. La tension disponible chute fortement et la batterie s'échauffe : son rendement tombe à $8{,}0/12{,}0 \approx 67\ \%$. Une bonne batterie de démarrage doit donc avoir une résistance interne très faible (de l'ordre de $0{,}01\ \Omega$).`,
          ],
        },
      ],
    },
    {
      id: 'ee-trottinette-bac',
      title: 'Type bac — Autonomie d’une trottinette électrique',
      difficulty: 3,
      duration: 25,
      tags: ['type bac', 'énergie', 'rendement', 'batterie'],
      statement: [
        {
          type: 'p',
          text: r`Une trottinette électrique est équipée d'une batterie lithium-ion de tension $U = 36\ \text{V}$ (supposée constante) et de capacité $Q = 10\ \text{A·h}$. Son moteur reçoit une puissance électrique $P_e = 250\ \text{W}$ et son rendement vaut $\eta = 80\ \%$. Vitesse moyenne de circulation : $20\ \text{km·h}^{-1}$. Prix de l'électricité : $0{,}25$ € par kWh.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Convertir la capacité de la batterie en coulombs. Calculer l’énergie stockée en joules puis en kWh.',
            'Calculer l’intensité du courant débité par la batterie quand le moteur fonctionne.',
            'Calculer la durée de fonctionnement (autonomie) et la distance parcourue.',
            'Calculer la puissance mécanique fournie par le moteur et l’énergie dissipée en transfert thermique pendant ce trajet.',
            'Le chargeur a un rendement de 90 %. Calculer l’énergie prélevée sur le réseau pour une recharge complète et son coût.',
          ],
        },
      ],
      hints: [
        '$1$ A·h $= 3600$ C ; $E = U Q$.',
        '$\\Delta t = E/P_e$.',
        'Énergie prélevée $= E_{\\text{stockée}}/0{,}90$.',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$Q = 10 \times 3600 = 3{,}6\times10^{4}\ \text{C}$. $E = U\,Q = 36 \times 3{,}6\times10^{4} = 1{,}3\times10^{6}\ \text{J}$ (exactement $1{,}296\times10^{6}\ \text{J}$) $= \dfrac{1{,}296\times10^{6}}{3{,}6\times10^{6}} = 0{,}36\ \text{kWh}$ (soit $36\ \text{V} \times 10\ \text{A·h} = 360\ \text{W·h}$).`,
            r`$I = \dfrac{P_e}{U} = \dfrac{250}{36} = 6{,}9\ \text{A}$.`,
            r`$\Delta t = \dfrac{E}{P_e} = \dfrac{1{,}296\times10^{6}}{250} = 5{,}18\times10^{3}\ \text{s} = 1{,}44\ \text{h}$ (≈ 1 h 26 min). On retrouve $\Delta t = Q/I = 10/6{,}94 = 1{,}44\ \text{h}$. Distance : $d = v\,\Delta t = 20 \times 1{,}44 = 29\ \text{km}$.`,
            r`$P_m = \eta P_e = 0{,}80 \times 250 = 200\ \text{W}$. Pertes : $P_{\text{th}} = 250 - 200 = 50\ \text{W}$, soit $E_{\text{th}} = 50 \times 5{,}18\times10^{3} = 2{,}6\times10^{5}\ \text{J}$.`,
            r`$E_{\text{réseau}} = \dfrac{0{,}36}{0{,}90} = 0{,}40\ \text{kWh}$ ; coût $= 0{,}40 \times 0{,}25 = 0{,}10$ € pour environ 29 km.`,
          ],
        },
      ],
    },
  ],

  /* ================================================================ */
  representations: [
    {
      type: 'widget',
      id: 'electric-power',
      title: 'Simulateur : puissance, effet Joule et rendement',
      caption: 'Faites varier la tension et la résistance : observez I, P = UI, la puissance Joule, l’énergie transférée et le rendement.',
    },
    { type: 'svg', svg: svgCaracteristique, caption: 'Caractéristique U = f(I) d’une source réelle : lire E et r.', maxWidth: 600 },
    { type: 'svg', svg: svgChaine, caption: 'Chaîne énergétique et rendement.', maxWidth: 640 },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Une charge de 30 C traverse un fil en 1,0 min. L’intensité vaut :',
          choices: ['30 A', '0,50 A', '2,0 A', '1 800 A'],
          answer: 1,
          explanation: '$I = Q/\\Delta t = 30/60 = 0{,}50$ A.',
        },
        {
          question: 'Dans un fil métallique, les électrons se déplacent :',
          choices: ['dans le sens conventionnel du courant', 'en sens inverse du sens conventionnel', 'dans les deux sens', 'ils ne se déplacent pas'],
          answer: 1,
          explanation: 'Charge négative : mouvement opposé au sens conventionnel (du + vers le − à l’extérieur du générateur).',
        },
        {
          question: 'Une pile ($E = 9{,}0$ V, $r = 2{,}0\\ \\Omega$) débite 0,50 A. La tension à ses bornes vaut :',
          choices: ['9,0 V', '10 V', '8,0 V', '1,0 V'],
          answer: 2,
          explanation: '$U = E - rI = 9{,}0 - 1{,}0 = 8{,}0$ V.',
        },
        {
          question: 'La puissance dissipée par effet Joule dans $R = 10\\ \\Omega$ traversée par $I = 2{,}0$ A vaut :',
          choices: ['20 W', '40 W', '5,0 W', '200 W'],
          answer: 1,
          explanation: '$P = RI^2 = 10 \\times 4{,}0 = 40$ W.',
        },
        {
          question: 'Un appareil de 2 000 W fonctionnant 30 min consomme :',
          choices: ['1,0 kWh', '60 kWh', '4,0 kWh', '1 000 kWh'],
          answer: 0,
          explanation: '$E = 2{,}0\\ \\text{kW} \\times 0{,}50\\ \\text{h} = 1{,}0$ kWh $= 3{,}6\\times10^6$ J.',
        },
        {
          question: 'Le coefficient directeur de la caractéristique $U_{PN} = f(I)$ d’une source réelle est :',
          choices: ['$E$', '$r$', '$-r$', '$E/r$'],
          answer: 2,
          explanation: '$U_{PN} = E - rI$ : pente $-r$, ordonnée à l’origine $E$.',
        },
        {
          question: 'Un moteur reçoit 50 W et fournit 40 W mécaniques. Son rendement est :',
          choices: ['125 %', '80 %', '20 %', '10 W'],
          answer: 1,
          explanation: '$\\eta = 40/50 = 0{,}80$.',
        },
        {
          question: 'Pour diviser par 4 les pertes Joule d’une ligne transportant une puissance donnée, il faut :',
          choices: ['diviser U par 2', 'multiplier U par 2', 'multiplier U par 4', 'multiplier I par 2'],
          answer: 1,
          explanation: 'À $P$ fixée, $I = P/U$ est divisé par 2, donc $RI^2$ est divisé par 4.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Intensité et charge', back: '$I = \\dfrac{Q}{\\Delta t}$ (A, C, s)' },
        { front: 'Charge élémentaire', back: '$e = 1{,}60\\times10^{-19}$ C' },
        { front: 'Loi d’Ohm', back: '$U = RI$ (convention récepteur)' },
        { front: 'Source réelle de tension', back: '$U_{PN} = E - rI$ : source idéale $E$ en série avec $r$' },
        { front: 'Tension à vide d’une source réelle', back: '$U_{PN} = E$ (car $I = 0$)' },
        { front: 'Courant de court-circuit', back: '$I_{cc} = E/r$' },
        { front: 'Puissance électrique', back: '$P = UI$ (W)' },
        { front: 'Effet Joule', back: '$P_J = RI^2 = U^2/R$ : électrique → thermique' },
        { front: 'Énergie électrique', back: '$E = P\\,\\Delta t$ ; 1 kWh $= 3{,}6\\times10^6$ J' },
        { front: 'Bilan d’une source réelle', back: '$EI = U_{PN}I + rI^2$' },
        { front: 'Rendement', back: '$\\eta = P_{\\text{utile}}/P_{\\text{reçue}}$, sans unité, $< 1$' },
        { front: 'Capacité d’une batterie (A·h)', back: 'Charge débitable : 1 A·h = 3 600 C ; énergie ≈ $U \\times Q$' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter le bilan',
      text: 'Dans un métal, les porteurs de charge sont les {{électrons}}. L’intensité est un débit de {{charges|charge}} : $I = Q/\\Delta t$. Une source réelle est modélisée par une source idéale de f.é.m. $E$ en {{série}} avec sa résistance {{interne}}. La puissance électrique s’écrit $P = $ {{UI|U×I|U.I}} et s’exprime en {{watts|watt|W}}. La conversion d’énergie électrique en énergie thermique dans un conducteur s’appelle l’effet {{Joule}}. Le rendement est le rapport de l’énergie {{utile}} à l’énergie reçue.',
    },
    {
      type: 'matching',
      title: 'Associer chaque grandeur à son unité',
      pairs: [
        { left: 'Intensité', right: 'ampère (A)' },
        { left: 'Charge', right: 'coulomb (C)' },
        { left: 'Tension, f.é.m.', right: 'volt (V)' },
        { left: 'Résistance', right: 'ohm (Ω)' },
        { left: 'Puissance', right: 'watt (W)' },
        { left: 'Énergie', right: 'joule (J) ou kWh' },
        { left: 'Rendement', right: 'sans unité' },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'La tension aux bornes d’une pile réelle augmente quand elle débite plus de courant.', answer: false, explanation: '$U_{PN} = E - rI$ diminue quand $I$ augmente.' },
        { text: 'Le kWh est une unité d’énergie.', answer: true, explanation: '1 kWh = 3,6 MJ.' },
        { text: 'Dans un conducteur ohmique, toute l’énergie électrique reçue est convertie en énergie thermique.', answer: true },
        { text: 'Un convertisseur peut avoir un rendement de 110 %.', answer: false, explanation: 'Conservation de l’énergie : l’énergie utile est au plus égale à l’énergie reçue, et il y a toujours des pertes.' },
        { text: 'Doubler l’intensité dans une résistance double la puissance dissipée par effet Joule.', answer: false, explanation: '$P_J = RI^2$ : elle est multipliée par 4.' },
        { text: 'Un ampèremètre se branche en série.', answer: true },
      ],
    },
    {
      type: 'ordering',
      title: 'Méthode : déterminer le rendement d’un moteur (remettre dans l’ordre)',
      items: [
        'Mesurer U aux bornes du moteur et I qui le traverse',
        'Calculer la puissance électrique reçue $P_e = UI$',
        'Mesurer ou calculer la puissance mécanique utile $P_m$',
        'Calculer $\\eta = P_m / P_e$',
        'Vérifier que $0 < \\eta < 1$ et identifier les pertes',
      ],
    },
  ],
}

export default chapter
