import type { Chapter } from '../types'

const svgSpectreVisible = String.raw`<svg viewBox="0 0 520 150" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <defs>
    <linearGradient id="spv" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="hsl(275 100% 40%)"/>
      <stop offset="0.12" stop-color="hsl(250 100% 55%)"/>
      <stop offset="0.25" stop-color="hsl(215 100% 55%)"/>
      <stop offset="0.38" stop-color="hsl(185 100% 45%)"/>
      <stop offset="0.5" stop-color="hsl(120 90% 42%)"/>
      <stop offset="0.65" stop-color="hsl(60 100% 50%)"/>
      <stop offset="0.78" stop-color="hsl(30 100% 50%)"/>
      <stop offset="1" stop-color="hsl(0 100% 45%)"/>
    </linearGradient>
  </defs>
  <rect x="30" y="30" width="460" height="46" fill="url(#spv)" stroke="currentColor" stroke-width="1"/>
  <g stroke="currentColor" stroke-width="1">
    <line x1="30" y1="76" x2="30" y2="86"/><line x1="145" y1="76" x2="145" y2="86"/><line x1="260" y1="76" x2="260" y2="86"/>
    <line x1="375" y1="76" x2="375" y2="86"/><line x1="490" y1="76" x2="490" y2="86"/>
  </g>
  <g fill="currentColor" text-anchor="middle">
    <text x="30" y="102">400</text><text x="145" y="102">500</text><text x="260" y="102">600</text>
    <text x="375" y="102">700</text><text x="490" y="102">800</text>
    <text x="260" y="124">longueur d’onde dans le vide λ (nm)</text>
    <text x="30" y="20" text-anchor="start">UV  ◄</text>
    <text x="490" y="20" text-anchor="end">►  IR</text>
    <text x="260" y="20">domaine visible : 400 nm – 800 nm</text>
  </g>
  <text x="30" y="144" fill="currentColor" font-size="11">violet</text>
  <text x="120" y="144" fill="currentColor" font-size="11">bleu</text>
  <text x="205" y="144" fill="currentColor" font-size="11">vert</text>
  <text x="285" y="144" fill="currentColor" font-size="11">jaune</text>
  <text x="340" y="144" fill="currentColor" font-size="11">orange</text>
  <text x="430" y="144" fill="currentColor" font-size="11">rouge</text>
</svg>`

const svgAdditive = String.raw`<svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <rect x="0" y="0" width="420" height="260" fill="#000"/>
  <g style="mix-blend-mode:screen">
    <circle cx="210" cy="100" r="62" fill="#ff0000" style="mix-blend-mode:screen"/>
    <circle cx="165" cy="165" r="62" fill="#00ff00" style="mix-blend-mode:screen"/>
    <circle cx="255" cy="165" r="62" fill="#0000ff" style="mix-blend-mode:screen"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-weight="600">
    <text x="210" y="62" fill="#fff">R</text>
    <text x="118" y="190">V</text>
    <text x="302" y="190">B</text>
    <text x="210" y="140" fill="#000">Blanc</text>
    <text x="165" y="112" fill="#000">J</text>
    <text x="255" y="112" fill="#fff">M</text>
    <text x="210" y="196" fill="#000">C</text>
  </g>
  <text x="210" y="248" fill="#fff" font-size="12" text-anchor="middle">Synthèse additive : R + V + B = blanc</text>
</svg>`

const svgSoustractive = String.raw`<svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <rect x="0" y="0" width="420" height="260" fill="#fff"/>
  <circle cx="210" cy="100" r="62" fill="#00ffff" style="mix-blend-mode:multiply"/>
  <circle cx="165" cy="165" r="62" fill="#ffff00" style="mix-blend-mode:multiply"/>
  <circle cx="255" cy="165" r="62" fill="#ff00ff" style="mix-blend-mode:multiply"/>
  <g fill="#000" text-anchor="middle" font-weight="600">
    <text x="210" y="62">C</text>
    <text x="118" y="190">J</text>
    <text x="302" y="190">M</text>
    <text x="210" y="145" fill="#fff">Noir</text>
    <text x="165" y="112">V</text>
    <text x="255" y="112" fill="#fff">B</text>
    <text x="210" y="196">R</text>
  </g>
  <text x="210" y="248" fill="#000" font-size="12" text-anchor="middle">Synthèse soustractive : C + M + J = noir</text>
</svg>`

const svgOeil = String.raw`<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <g fill="none" stroke="currentColor" stroke-width="1.4">
    <ellipse cx="270" cy="120" rx="115" ry="90"/>
    <path d="M155 120 Q 130 120 120 100 M155 120 Q 130 120 120 140"/>
    <ellipse cx="190" cy="120" rx="14" ry="38"/>
    <line x1="168" y1="88" x2="168" y2="70"/><line x1="168" y1="152" x2="168" y2="170"/>
  </g>
  <g stroke="hsl(217 91% 60%)" stroke-width="1.4" fill="none">
    <line x1="40" y1="95" x2="190" y2="108"/><line x1="40" y1="145" x2="190" y2="132"/>
    <line x1="190" y1="108" x2="368" y2="120"/><line x1="190" y1="132" x2="368" y2="120"/>
  </g>
  <path d="M368 120 m-6 -18 a 34 34 0 0 1 0 36" fill="none" stroke="hsl(25 95% 53%)" stroke-width="3"/>
  <g fill="currentColor">
    <text x="30" y="30">cornée</text><line x1="100" y1="26" x2="152" y2="105" stroke="currentColor" stroke-width="0.7"/>
    <text x="130" y="210">iris (pupille)</text>
    <text x="178" y="62" text-anchor="middle">cristallin</text>
    <text x="300" y="30">rétine (cônes et bâtonnets)</text><line x1="320" y1="34" x2="372" y2="95" stroke="currentColor" stroke-width="0.7"/>
    <text x="395" y="120">fovéa</text>
    <text x="395" y="140" font-size="11">(cônes en grand nombre)</text>
    <text x="395" y="190" font-size="11">nerf optique ►</text>
  </g>
  <line x1="380" y1="170" x2="385" y2="180" stroke="currentColor" stroke-width="0.7"/>
</svg>`

const svgCones = String.raw`<svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <g stroke="currentColor" stroke-width="1" fill="none">
    <line x1="50" y1="200" x2="500" y2="200"/><line x1="50" y1="200" x2="50" y2="30"/>
  </g>
  <g stroke="currentColor" stroke-width="1">
    <line x1="50" y1="200" x2="50" y2="206"/><line x1="140" y1="200" x2="140" y2="206"/><line x1="230" y1="200" x2="230" y2="206"/>
    <line x1="320" y1="200" x2="320" y2="206"/><line x1="410" y1="200" x2="410" y2="206"/><line x1="500" y1="200" x2="500" y2="206"/>
  </g>
  <g fill="currentColor" text-anchor="middle">
    <text x="50" y="220">400</text><text x="140" y="220">500</text><text x="230" y="220">600</text><text x="320" y="220">700</text>
    <text x="275" y="240">λ (nm) — allure schématique, grandeurs relatives</text>
  </g>
  <text x="14" y="26" fill="currentColor">sensibilité</text>
  <path d="M50 200 C 70 150 90 50 110 45 C 130 40 150 120 175 200" fill="none" stroke="hsl(217 91% 60%)" stroke-width="2.4"/>
  <path d="M90 200 C 120 130 160 45 188 42 C 220 40 260 130 330 200" fill="none" stroke="hsl(142 71% 45%)" stroke-width="2.4"/>
  <path d="M110 200 C 150 150 200 70 230 50 C 260 38 290 80 340 160 C 360 190 375 200 385 200" fill="none" stroke="hsl(0 84% 60%)" stroke-width="2.4"/>
  <g font-size="12" font-weight="600">
    <text x="85" y="40" fill="hsl(217 91% 60%)">S (bleus)</text>
    <text x="168" y="32" fill="hsl(142 71% 45%)">M (verts)</text>
    <text x="255" y="48" fill="hsl(0 84% 60%)">L (rouges)</text>
  </g>
</svg>`

const svgCmj = String.raw`<svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <rect x="20" y="20" width="60" height="100" fill="#fff" stroke="currentColor"/>
  <text x="50" y="140" text-anchor="middle" fill="currentColor">lumière</text>
  <text x="50" y="156" text-anchor="middle" fill="currentColor">blanche</text>
  <g fill="currentColor">
    <path d="M85 70 h 40" stroke="currentColor" stroke-width="1.4"/><path d="M125 70 l-7 -4 v8 z"/>
  </g>
  <rect x="130" y="15" width="22" height="110" fill="#00ffff" opacity="0.85" stroke="currentColor"/>
  <text x="141" y="140" text-anchor="middle" fill="currentColor">filtre</text>
  <text x="141" y="156" text-anchor="middle" fill="currentColor">cyan</text>
  <path d="M152 70 h 80" stroke="hsl(217 91% 60%)" stroke-width="3"/>
  <path d="M152 58 h 80" stroke="hsl(142 71% 45%)" stroke-width="3"/>
  <text x="195" y="50" text-anchor="middle" fill="currentColor" font-size="11">V + B transmis</text>
  <path d="M130 82 h -6" stroke="hsl(0 84% 60%)" stroke-width="3"/>
  <text x="141" y="177" text-anchor="middle" fill="hsl(0 84% 60%)" font-size="11">R absorbé</text>
  <rect x="240" y="15" width="22" height="110" fill="#ffff00" opacity="0.85" stroke="currentColor"/>
  <text x="251" y="140" text-anchor="middle" fill="currentColor">filtre</text>
  <text x="251" y="156" text-anchor="middle" fill="currentColor">jaune</text>
  <path d="M262 58 h 90" stroke="hsl(142 71% 45%)" stroke-width="3"/>
  <text x="305" y="50" text-anchor="middle" fill="currentColor" font-size="11">V transmis</text>
  <text x="251" y="177" text-anchor="middle" fill="hsl(217 91% 60%)" font-size="11">B absorbé</text>
  <rect x="360" y="35" width="70" height="50" fill="#00cc00" stroke="currentColor"/>
  <text x="395" y="105" text-anchor="middle" fill="currentColor">lumière verte</text>
  <text x="395" y="122" text-anchor="middle" fill="currentColor" font-size="11">(cyan + jaune)</text>
</svg>`

const svgObjet = String.raw`<svg viewBox="0 0 520 230" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <g stroke="currentColor" stroke-width="1.4" fill="none">
    <circle cx="60" cy="40" r="16"/>
  </g>
  <g stroke="currentColor" stroke-width="1">
    <line x1="60" y1="14" x2="60" y2="6"/><line x1="60" y1="66" x2="60" y2="74"/><line x1="34" y1="40" x2="26" y2="40"/><line x1="86" y1="40" x2="94" y2="40"/>
  </g>
  <text x="60" y="95" text-anchor="middle" fill="currentColor">lumière blanche</text>
  <text x="60" y="110" text-anchor="middle" fill="currentColor" font-size="11">(R + V + B)</text>
  <g stroke-width="3">
    <line x1="85" y1="48" x2="215" y2="110" stroke="hsl(0 84% 60%)"/>
    <line x1="85" y1="52" x2="215" y2="118" stroke="hsl(142 71% 45%)"/>
    <line x1="85" y1="56" x2="215" y2="126" stroke="hsl(217 91% 60%)"/>
  </g>
  <rect x="215" y="105" width="140" height="30" fill="hsl(0 84% 60%)" stroke="currentColor"/>
  <text x="285" y="124" text-anchor="middle" fill="#fff" font-weight="600">objet rouge</text>
  <g stroke="hsl(0 84% 60%)" stroke-width="3" fill="none">
    <line x1="300" y1="105" x2="400" y2="40"/><line x1="320" y1="105" x2="420" y2="52"/>
  </g>
  <text x="440" y="36" fill="hsl(0 84% 60%)" font-size="12" font-weight="600">R diffusé</text>
  <text x="440" y="52" fill="currentColor" font-size="11">(vers l’œil)</text>
  <text x="285" y="160" text-anchor="middle" fill="currentColor" font-size="11">V et B absorbés</text>
  <text x="285" y="180" text-anchor="middle" fill="currentColor" font-size="11">par l’objet (non renvoyés)</text>
</svg>`

const chapter: Chapter = {
  id: 'couleurs',
  subject: 'physique-chimie',
  order: 14,
  title: 'Couleurs : synthèses, objets et vision',
  theme: 'Ondes et signaux',
  summary:
    'Synthèse additive (RVB) et soustractive (CMJ), couleurs complémentaires, absorption, diffusion et transmission, filtres, vision par les cônes, écrans et impression.',
  duration: '2 semaines',
  objectives: [
    'Relier la couleur d’une lumière à sa longueur d’onde dans le vide et connaître le domaine visible (400 nm – 800 nm).',
    'Prévoir le résultat d’une synthèse additive (RVB) et d’une synthèse soustractive (CMJ).',
    'Connaître les couleurs complémentaires et les situer sur un cercle chromatique.',
    'Interpréter la couleur d’un objet éclairé en termes de diffusion, d’absorption et de transmission.',
    'Prévoir la couleur d’une lumière après traversée d’un ou plusieurs filtres.',
    'Décrire le principe de la vision des couleurs (cônes S, M, L ; bâtonnets) et expliquer la trichromie.',
    'Expliquer le fonctionnement d’un écran (pixels RVB) et d’une impression (CMJN).',
    'Associer la couleur perçue d’une espèce colorée à la longueur d’onde de sa bande d’absorption.',
  ],
  keywords: [
    'synthèse additive',
    'synthèse soustractive',
    'RVB',
    'CMJ',
    'couleur complémentaire',
    'absorption',
    'diffusion',
    'transmission',
    'filtre',
    'cônes',
    'bâtonnets',
    'pixel',
    'quadrichromie',
  ],

  // ------------------------------------------------------------------ FICHE
  fiche: [
    { type: 'h2', text: 'Lumière et couleur' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'À retenir',
      content: [
        {
          type: 'list',
          items: [
            String.raw`Le **domaine visible** va d’environ $400\ \text{nm}$ (violet) à $800\ \text{nm}$ (rouge) dans le vide.`,
            String.raw`Une lumière **monochromatique** a une seule longueur d’onde ; une lumière **polychromatique** en contient plusieurs. La lumière blanche contient toutes les radiations visibles.`,
            String.raw`Trois couleurs primaires suffisent à reproduire la quasi-totalité des couleurs perçues, car l’œil possède **trois types de cônes**.`,
          ],
        },
      ],
    },
    { type: 'h2', text: 'Les deux synthèses' },
    {
      type: 'table',
      headers: ['', 'Synthèse additive', 'Synthèse soustractive'],
      rows: [
        ['Principe', 'On **ajoute** des lumières colorées', 'On **retire** (absorbe) des radiations à la lumière blanche'],
        ['Primaires', 'Rouge, Vert, Bleu (RVB)', 'Cyan, Magenta, Jaune (CMJ)'],
        ['Secondaires', 'R+V = jaune ; V+B = cyan ; R+B = magenta', 'C+M = bleu ; C+J = vert ; M+J = rouge'],
        ['Les trois', 'R+V+B = **blanc**', 'C+M+J = **noir**'],
        ['Applications', 'Écrans, projecteurs, scènes', 'Filtres, peintures, encres, impression'],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Couleurs complémentaires',
      content: [
        {
          type: 'p',
          text: String.raw`Deux couleurs sont **complémentaires** si leur synthèse additive donne du blanc : rouge–cyan, vert–magenta, bleu–jaune. Un filtre d’une couleur absorbe sa complémentaire.`,
        },
      ],
    },
    { type: 'h2', text: 'Couleur d’un objet' },
    {
      type: 'list',
      items: [
        String.raw`Un objet **diffuse** (renvoie dans toutes les directions) certaines radiations et **absorbe** les autres : sa couleur est celle de la lumière diffusée.`,
        String.raw`Objet **blanc** : diffuse tout. Objet **noir** : absorbe tout. Objet **gris** : absorbe une partie de toutes les radiations.`,
        String.raw`Un objet n’est jamais « de couleur » en soi : sa couleur dépend de la lumière qui l’éclaire. Un objet rouge éclairé en lumière verte paraît **noir**.`,
        String.raw`Une espèce chimique **absorbe** autour d’une longueur d’onde $\lambda_{\max}$ et paraît de la **couleur complémentaire** de la radiation absorbée.`,
      ],
    },
    { type: 'h2', text: 'Vision et écrans' },
    {
      type: 'list',
      items: [
        String.raw`Rétine : **cônes** S, M, L (vision des couleurs, forte lumière, concentrés dans la fovéa) et **bâtonnets** (vision nocturne, pas de couleurs).`,
        String.raw`Écran : chaque pixel = 3 sous-pixels R, V, B d’intensités réglables. 8 bits par couleur primaire : $256^3 = 16\,777\,216$ couleurs.`,
        String.raw`Impression : encres C, M, J + noir (K) = **quadrichromie CMJN**, en points de trame minuscules.`,
      ],
    },
  ],

  // ------------------------------------------------------------------ COURS
  cours: [
    { type: 'h2', text: '1. La lumière colorée' },
    {
      type: 'p',
      text: String.raw`La lumière visible est une onde électromagnétique. Chaque radiation visible est caractérisée par sa **longueur d’onde dans le vide** $\lambda$, comprise entre $400\ \text{nm}$ (violet) et $800\ \text{nm}$ (rouge), soit $4{,}00\times10^{-7}\ \text{m}$ à $8{,}00\times10^{-7}\ \text{m}$. Les couleurs de l’arc-en-ciel se succèdent quand $\lambda$ augmente : violet, bleu, vert, jaune, orange, rouge.`,
    },
    {
      type: 'svg',
      svg: svgSpectreVisible,
      caption: 'Le spectre de la lumière visible : couleur associée à chaque domaine de longueurs d’onde (valeurs approximatives des limites entre couleurs).',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Lumière monochromatique et polychromatique',
      content: [
        {
          type: 'p',
          text: String.raw`Une lumière **monochromatique** est constituée d’une seule radiation (une seule longueur d’onde) : c’est le cas d’un laser. Une lumière **polychromatique** est la superposition de plusieurs radiations. La **lumière blanche** (Soleil, lampe à incandescence) contient toutes les radiations du domaine visible ; un prisme ou un réseau la décompose en un spectre continu.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Piège : couleur et longueur d’onde',
      content: [
        {
          type: 'p',
          text: String.raw`Lorsque la lumière change de milieu (air, eau, verre), sa **longueur d’onde change** mais sa **fréquence** reste la même. La couleur perçue est liée à la fréquence : la couleur ne change pas en passant dans l’eau. Par convention, on repère une radiation par sa longueur d’onde **dans le vide**.`,
        },
      ],
    },

    { type: 'h2', text: '2. La vision des couleurs' },
    { type: 'h3', text: 'L’œil, un récepteur de lumière' },
    {
      type: 'p',
      text: String.raw`L’œil se comporte comme un système optique : la **cornée** et le **cristallin** (lentille convergente de focale variable) forment sur la **rétine** une image réelle et renversée de l’objet observé. L’**iris** règle le diamètre de la **pupille** et donc la quantité de lumière qui entre. La rétine contient les cellules photoréceptrices, qui convertissent la lumière en signaux nerveux transmis au cerveau par le nerf optique.`,
    },
    { type: 'svg', svg: svgOeil, caption: 'Schéma simplifié de l’œil : l’image se forme sur la rétine ; la fovéa est la zone la plus riche en cônes.' },
    { type: 'h3', text: 'Cônes et bâtonnets' },
    {
      type: 'table',
      headers: ['Photorécepteur', 'Rôle', 'Conditions', 'Localisation'],
      rows: [
        ['**Cônes** (environ 6 millions)', 'Vision des couleurs, bonne acuité', 'Éclairement fort (vision diurne)', 'Concentrés dans la fovéa'],
        ['**Bâtonnets** (environ 120 millions)', 'Vision en noir et blanc, très sensibles', 'Faible éclairement (vision nocturne)', 'Périphérie de la rétine'],
      ],
    },
    {
      type: 'p',
      text: String.raw`Il existe **trois types de cônes**, sensibles à des domaines de longueurs d’onde différents : les cônes **S** (« short », sensibles surtout au bleu-violet, maximum vers $420\ \text{nm}$), les cônes **M** (« medium », surtout au vert, maximum vers $530\ \text{nm}$) et les cônes **L** (« long », surtout au jaune-orangé, maximum vers $560\ \text{nm}$). Les domaines de sensibilité se recouvrent largement.`,
    },
    { type: 'svg', svg: svgCones, caption: 'Sensibilités relatives (schématiques) des trois types de cônes.' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Trichromie',
      content: [
        {
          type: 'p',
          text: String.raw`La couleur perçue résulte de la **proportion** dans laquelle les trois types de cônes sont stimulés. Deux lumières de compositions spectrales différentes peuvent stimuler les cônes de la même façon et être perçues de la **même couleur**. C’est ce qui permet à un écran de reproduire un jaune en allumant simplement le rouge et le vert : les cônes L et M sont stimulés comme par une radiation jaune pure d’environ $580\ \text{nm}$.`,
        },
      ],
    },
    {
      type: 'p',
      text: String.raw`Le **daltonisme** est une anomalie héréditaire de la vision des couleurs : un type de cônes est absent ou déficient (le plus souvent L ou M), ce qui rend difficile la distinction entre rouge et vert. Si les trois types de cônes manquent, la vision est monochrome. En vision nocturne, seuls les bâtonnets fonctionnent : « la nuit, tous les chats sont gris ».`,
    },

    { type: 'h2', text: '3. Synthèse additive des couleurs' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Synthèse additive',
      content: [
        {
          type: 'p',
          text: String.raw`La **synthèse additive** consiste à superposer des lumières colorées. Les trois lumières **primaires** sont le **rouge** (R, vers $700\ \text{nm}$), le **vert** (V, vers $550\ \text{nm}$) et le **bleu** (B, vers $450\ \text{nm}$) : elles stimulent chacune principalement un type de cône.`,
        },
      ],
    },
    { type: 'svg', svg: svgAdditive, maxWidth: 380, caption: 'Synthèse additive : trois faisceaux lumineux R, V, B qui se recouvrent sur un écran noir.' },
    {
      type: 'table',
      headers: ['Superposition', 'Couleur obtenue'],
      rows: [
        ['Rouge + Vert', 'Jaune'],
        ['Vert + Bleu', 'Cyan'],
        ['Rouge + Bleu', 'Magenta'],
        ['Rouge + Vert + Bleu', 'Blanc'],
        ['Aucune lumière', 'Noir'],
      ],
      caption: 'Les couleurs secondaires de la synthèse additive sont les primaires de la synthèse soustractive.',
    },
    {
      type: 'p',
      text: String.raw`En faisant varier l’intensité de chaque primaire, on obtient une très grande variété de couleurs, et des **gris** si les trois intensités sont égales (par exemple R = V = B = 50 % donne un gris moyen).`,
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Couleurs complémentaires',
      content: [
        {
          type: 'p',
          text: String.raw`Deux lumières colorées sont **complémentaires** lorsque leur synthèse additive donne du **blanc**. On a : **rouge et cyan** (car cyan = V + B), **vert et magenta** (magenta = R + B), **bleu et jaune** (jaune = R + V).`,
        },
      ],
    },
    {
      type: 'widget',
      id: 'color-synthesis',
      props: { mode: 'additive' },
      title: 'Explorer la synthèse additive',
      caption: 'Réglez l’intensité des trois lumières primaires et observez la couleur perçue.',
    },

    { type: 'h2', text: '4. Synthèse soustractive des couleurs' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Synthèse soustractive',
      content: [
        {
          type: 'p',
          text: String.raw`La **synthèse soustractive** consiste à retirer de la lumière blanche certaines radiations en utilisant des **filtres**, des **colorants** ou des **pigments** qui les absorbent. Les trois couleurs **primaires** sont le **cyan** (C), le **magenta** (M) et le **jaune** (J). Chacune est obtenue en retirant à la lumière blanche **une** primaire de la synthèse additive.`,
        },
      ],
    },
    {
      type: 'table',
      headers: ['Matière de couleur', 'Absorbe', 'Transmet / diffuse'],
      rows: [
        ['Cyan', 'Rouge', 'Vert + Bleu'],
        ['Magenta', 'Vert', 'Rouge + Bleu'],
        ['Jaune', 'Bleu', 'Rouge + Vert'],
      ],
    },
    { type: 'svg', svg: svgSoustractive, maxWidth: 380, caption: 'Synthèse soustractive : superposition de trois colorants C, M, J sur un fond blanc.' },
    {
      type: 'table',
      headers: ['Superposition de matières', 'Radiation restante', 'Couleur obtenue'],
      rows: [
        ['Cyan + Magenta', 'Bleu seulement (R et V absorbés)', 'Bleu'],
        ['Cyan + Jaune', 'Vert seulement (R et B absorbés)', 'Vert'],
        ['Magenta + Jaune', 'Rouge seulement (V et B absorbés)', 'Rouge'],
        ['Cyan + Magenta + Jaune', 'Aucune', 'Noir'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Astuce de raisonnement',
      content: [
        {
          type: 'p',
          text: String.raw`Ne retenez pas les résultats par cœur : **décomposez toujours** chaque lumière ou chaque matière en R, V, B. Le cyan « vaut » V + B, le magenta R + B, le jaune R + V. Une matière **laisse passer ou diffuse** ses composantes et **absorbe** les autres ; il ne reste que les composantes **communes** à toutes les matières traversées.`,
        },
      ],
    },
    {
      type: 'widget',
      id: 'color-synthesis',
      props: { mode: 'soustractive' },
      title: 'Explorer la synthèse soustractive',
      caption: 'Superposez des filtres cyan, magenta et jaune devant une lumière blanche.',
    },

    { type: 'h2', text: '5. Couleur d’un objet : diffusion, absorption, transmission' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Trois phénomènes',
      content: [
        {
          type: 'list',
          items: [
            String.raw`**Absorption** : une partie de la lumière est absorbée par la matière (son énergie est transférée à la matière, qui s’échauffe, ou à des molécules).`,
            String.raw`**Diffusion** : la lumière est renvoyée dans **toutes les directions** par la surface de l’objet. C’est ce qui permet de voir un objet depuis n’importe quel point.`,
            String.raw`**Transmission** : la lumière traverse le milieu (verre, solution, filtre). Un milieu transparent transmet presque toute la lumière ; un milieu opaque n’en transmet aucune.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Couleur d’un objet opaque',
      content: [
        {
          type: 'p',
          text: String.raw`La couleur d’un objet **opaque** éclairé est celle de la lumière qu’il **diffuse** vers l’œil. Elle dépend à la fois des propriétés de l’objet (quelles radiations il absorbe) et de la **lumière incidente** (quelles radiations il reçoit). Un objet qui n’absorbe aucune radiation visible paraît blanc ; un objet qui les absorbe toutes paraît noir.`,
        },
      ],
    },
    {
      type: 'svg',
      svg: svgObjet,
      caption: 'Un objet rouge éclairé en lumière blanche : il diffuse le rouge et absorbe le vert et le bleu.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé : une banane jaune sous différentes lumières',
      content: [
        {
          type: 'p',
          text: String.raw`Une banane jaune diffuse le rouge et le vert (jaune = R + V) et absorbe le bleu.`,
        },
        {
          type: 'list',
          items: [
            String.raw`En lumière blanche (R+V+B) : elle diffuse R et V : elle paraît **jaune**.`,
            String.raw`En lumière rouge : elle diffuse R : elle paraît **rouge**.`,
            String.raw`En lumière bleue : elle absorbe B et ne diffuse rien : elle paraît **noire**.`,
            String.raw`En lumière cyan (V+B) : elle diffuse V, absorbe B : elle paraît **verte**.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Méthode : prévoir la couleur d’un objet éclairé',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Décomposer la lumière incidente', text: String.raw`Écrire la lumière en R, V, B (ex. : magenta = R + B).` },
            { title: 'Décomposer la couleur de l’objet', text: String.raw`Déterminer les radiations que l’objet diffuse en lumière blanche (ex. : objet jaune diffuse R + V).` },
            { title: 'Prendre l’intersection', text: String.raw`L’objet ne peut diffuser que les radiations qu’il **reçoit ET** qu’il est capable de diffuser : ici R.` },
            { title: 'Conclure', text: String.raw`Nommer la couleur de la lumière diffusée (ici : rouge). S’il ne reste rien, l’objet paraît noir.` },
          ],
        },
      ],
    },

    { type: 'h2', text: '6. Filtres colorés' },
    {
      type: 'p',
      text: String.raw`Un **filtre coloré** est un milieu transparent qui **transmet** certaines radiations et **absorbe** les autres. Un filtre **cyan** transmet V et B et absorbe R ; un filtre **rouge** transmet R et absorbe V et B (donc un filtre rouge est « le contraire » d’un filtre cyan pour le rouge).`,
    },
    {
      type: 'table',
      headers: ['Filtre', 'Transmet', 'Absorbe'],
      rows: [
        ['Rouge', 'R', 'V, B'],
        ['Vert', 'V', 'R, B'],
        ['Bleu', 'B', 'R, V'],
        ['Cyan', 'V, B', 'R'],
        ['Magenta', 'R, B', 'V'],
        ['Jaune', 'R, V', 'B'],
      ],
    },
    {
      type: 'svg',
      svg: svgCmj,
      caption: 'Deux filtres successifs, cyan puis jaune : seul le vert est transmis par les deux.',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Un filtre ne crée pas de lumière',
      content: [
        {
          type: 'p',
          text: String.raw`Un filtre ne peut que **retirer** des radiations. Un filtre rouge éclairé en lumière verte ne laisse rien passer : la lumière en sortie est **noire** (absente). Un filtre jaune ne peut pas « rendre jaune » une lumière bleue.`,
        },
      ],
    },

    { type: 'h2', text: '7. Pigments, colorants et espèces colorées' },
    {
      type: 'p',
      text: String.raw`Les **colorants** (solubles dans le milieu) et les **pigments** (insolubles, sous forme de fines particules en suspension) sont des espèces chimiques colorées. Elles absorbent certaines radiations visibles et paraissent de la couleur de la lumière restante, soit la **couleur complémentaire** de la radiation absorbée.`,
    },
    {
      type: 'table',
      headers: ['Radiation absorbée (λ)', 'Couleur de la radiation absorbée', 'Couleur perçue de l’espèce'],
      rows: [
        ['400 – 435 nm', 'Violet', 'Jaune-vert'],
        ['435 – 480 nm', 'Bleu', 'Jaune-orangé'],
        ['480 – 500 nm', 'Bleu-vert', 'Rouge-orangé'],
        ['500 – 560 nm', 'Vert', 'Magenta (pourpre)'],
        ['560 – 580 nm', 'Jaune-vert', 'Violet'],
        ['580 – 610 nm', 'Jaune à orange', 'Bleu'],
        ['610 – 800 nm', 'Rouge', 'Cyan (bleu-vert)'],
      ],
      caption: 'Correspondances approximatives ; elles se retrouvent par le raisonnement sur les complémentaires.',
    },
    {
      type: 'p',
      text: String.raw`Cette correspondance se lit sur le **spectre d’absorption** d’une solution (absorbance en fonction de $\lambda$) : la **bande d’absorption** donne les radiations absorbées, et donc, par complémentarité, la couleur perçue. La concentration d’une espèce colorée se détermine par spectrophotométrie (loi de Beer-Lambert, vue en chimie).`,
    },

    { type: 'h2', text: '8. Écrans et impression' },
    { type: 'h3', text: 'Les écrans : synthèse additive' },
    {
      type: 'p',
      text: String.raw`Un écran couleur (LCD, OLED…) est une mosaïque de **pixels**. Chaque pixel est constitué de **trois sous-pixels** émettant du rouge, du vert et du bleu. L’intensité de chaque sous-pixel est codée, le plus souvent sur **8 bits** (valeurs de 0 à 255). Les sous-pixels sont trop petits pour être distingués à distance normale : l’œil fait la synthèse additive.`,
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Codage RVB sur 24 bits',
      content: [
        {
          type: 'list',
          items: [
            String.raw`$(255\,;\,0\,;\,0)$ : rouge ; $(0\,;\,255\,;\,0)$ : vert ; $(0\,;\,0\,;\,255)$ : bleu.`,
            String.raw`$(255\,;\,255\,;\,0)$ : jaune ; $(0\,;\,255\,;\,255)$ : cyan ; $(255\,;\,0\,;\,255)$ : magenta.`,
            String.raw`$(255\,;\,255\,;\,255)$ : blanc ; $(0\,;\,0\,;\,0)$ : noir ; $(128\,;\,128\,;\,128)$ : gris moyen.`,
            String.raw`Nombre de couleurs : $256\times256\times256 = 2^{24} = 16\,777\,216$.`,
          ],
        },
      ],
    },
    { type: 'h3', text: 'L’impression : synthèse soustractive' },
    {
      type: 'p',
      text: String.raw`Une imprimante dépose sur un papier blanc de minuscules points d’encres **cyan, magenta et jaune** (et **noir**, K, pour obtenir un vrai noir profond et économiser de l’encre : c’est la **quadrichromie CMJN**). Chaque encre absorbe une partie de la lumière blanche avant que le papier ne la diffuse. Les points sont si petits que l’œil mélange leurs effets. Le papier blanc joue un rôle essentiel : il **diffuse** toutes les radiations que les encres ne retiennent pas.`,
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Écran ou imprimante ?',
      content: [
        {
          type: 'p',
          text: String.raw`**Écran** : source de lumière, synthèse **additive**, primaires R, V, B, fond noir. **Impression** : matière qui absorbe, synthèse **soustractive**, primaires C, M, J (+ K), fond blanc (papier). C’est pourquoi une image peut avoir des couleurs légèrement différentes à l’écran et sur papier.`,
        },
      ],
    },
    {
      type: 'widget',
      id: 'wave-simulator',
      title: 'Rappel : longueur d’onde et période',
      caption: 'Chaque radiation monochromatique est une onde de période T et de longueur d’onde λ (λ = c·T dans le vide pour la lumière). On y revient dans le chapitre suivant.',
    },
  ],

  // ------------------------------------------------------------------ EXERCICES
  exercices: [
    {
      id: 'couleurs-ex1',
      title: 'Synthèses élémentaires',
      difficulty: 1,
      duration: 8,
      tags: ['synthèse additive', 'synthèse soustractive'],
      statement: [
        { type: 'p', text: String.raw`Donner la couleur obtenue dans chacun des cas :` },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Superposition sur un écran blanc de lumières rouge et verte.`,
            String.raw`Superposition de lumières verte et bleue.`,
            String.raw`Superposition de lumières rouge, verte et bleue d’égales intensités.`,
            String.raw`Lumière blanche traversant successivement un filtre magenta puis un filtre jaune.`,
            String.raw`Lumière blanche traversant successivement des filtres cyan, magenta et jaune.`,
            String.raw`Quelle est la couleur complémentaire du bleu ? du magenta ?`,
          ],
        },
      ],
      hints: [String.raw`Décomposez chaque couleur en R, V, B.`],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`R + V : synthèse additive, on obtient du **jaune**.`,
            String.raw`V + B : on obtient du **cyan**.`,
            String.raw`R + V + B : on obtient du **blanc** (lumière blanche si les intensités sont égales).`,
            String.raw`Le filtre magenta transmet R et B (absorbe V). Le filtre jaune transmet R et V (absorbe B). Seul **R** traverse les deux : lumière **rouge**.`,
            String.raw`Cyan : R absorbé ; magenta : V absorbé ; jaune : B absorbé. Tout est absorbé : on obtient du **noir** (aucune lumière).`,
            String.raw`Complémentaire du bleu : le **jaune** (B + J = B + R + V = blanc). Complémentaire du magenta : le **vert** (M + V = R + B + V = blanc).`,
          ],
        },
      ],
    },
    {
      id: 'couleurs-ex2',
      title: 'Filtres successifs',
      difficulty: 1,
      duration: 8,
      tags: ['filtres', 'transmission'],
      statement: [
        { type: 'p', text: String.raw`Un faisceau de lumière blanche traverse un filtre cyan. Préciser la couleur de la lumière transmise puis répondre aux questions suivantes.` },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Quelles radiations (R, V, B) sont absorbées par le filtre cyan ?`,
            String.raw`La lumière issue du filtre cyan traverse ensuite un filtre jaune. Quelle est la couleur de la lumière transmise ?`,
            String.raw`Si l’on place à la place du filtre jaune un filtre rouge, que voit-on ? Justifier.`,
            String.raw`Un faisceau de lumière **rouge** traverse un filtre cyan : que voit-on derrière le filtre ? Justifier.`,
          ],
        },
      ],
      solution: [
        {
          type: 'p',
          text: String.raw`La lumière blanche contient R + V + B. Un filtre cyan transmet V + B : la lumière transmise est **cyan**.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Le filtre cyan absorbe le **rouge**.`,
            String.raw`Le filtre jaune transmet R et V et absorbe B. À l’entrée du filtre jaune il y a V + B ; il reste V : la lumière transmise est **verte**.`,
            String.raw`Le filtre rouge ne transmet que R. Or il n’y a plus de rouge après le filtre cyan : rien n’est transmis, on voit du **noir**.`,
            String.raw`Le filtre cyan absorbe le rouge ; la lumière incidente est uniquement rouge : tout est absorbé, on voit du **noir**.`,
          ],
        },
      ],
    },
    {
      id: 'couleurs-ex3',
      title: 'Objets sous différents éclairages',
      difficulty: 2,
      duration: 15,
      tags: ['diffusion', 'absorption'],
      statement: [
        {
          type: 'p',
          text: String.raw`Une pomme rouge (qui diffuse le rouge), une feuille verte (qui diffuse le vert) et une banane jaune (qui diffuse le rouge et le vert) sont éclairées successivement par une lumière rouge, verte, bleue puis jaune (jaune = R + V).`,
        },
        { type: 'p', text: String.raw`Compléter, en justifiant, le tableau des couleurs perçues.` },
        {
          type: 'table',
          headers: ['Objet', 'Lumière rouge', 'Lumière verte', 'Lumière bleue', 'Lumière jaune'],
          rows: [
            ['Pomme rouge', '?', '?', '?', '?'],
            ['Feuille verte', '?', '?', '?', '?'],
            ['Banane jaune', '?', '?', '?', '?'],
          ],
        },
      ],
      hints: [String.raw`Un objet ne diffuse que ce qu’il reçoit **et** ce qu’il est capable de diffuser.`],
      solution: [
        {
          type: 'p',
          text: String.raw`On applique la méthode : l’objet diffuse l’intersection entre les radiations reçues et celles qu’il peut diffuser ; s’il n’y en a pas, il paraît noir.`,
        },
        {
          type: 'table',
          headers: ['Objet', 'Lumière rouge', 'Lumière verte', 'Lumière bleue', 'Lumière jaune (R+V)'],
          rows: [
            ['Pomme rouge (diffuse R)', 'rouge', 'noire', 'noire', 'rouge'],
            ['Feuille verte (diffuse V)', 'noire', 'verte', 'noire', 'verte'],
            ['Banane jaune (diffuse R, V)', 'rouge', 'verte', 'noire', 'jaune'],
          ],
        },
        {
          type: 'p',
          text: String.raw`Exemple de justification : la pomme sous lumière jaune reçoit R + V, ne peut diffuser que R : elle paraît rouge. La feuille sous lumière rouge reçoit R, absorbe R (elle ne diffuse que V) : elle paraît noire.`,
        },
      ],
    },
    {
      id: 'couleurs-ex4',
      title: 'Couleur d’une espèce chimique',
      difficulty: 2,
      duration: 12,
      tags: ['absorption', 'complémentaires', 'spectre'],
      statement: [
        {
          type: 'p',
          text: String.raw`On étudie trois solutions dont les spectres d’absorption présentent chacun une unique bande, de maximum $\lambda_{\max}$ :`,
        },
        {
          type: 'list',
          items: [
            String.raw`Solution A : $\lambda_{\max} = 450\ \text{nm}$.`,
            String.raw`Solution B : $\lambda_{\max} = 525\ \text{nm}$.`,
            String.raw`Solution C : $\lambda_{\max} = 700\ \text{nm}$.`,
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Quelle est la couleur de la radiation absorbée par chaque solution ?`,
            String.raw`En déduire la couleur de chaque solution en lumière blanche.`,
            String.raw`Quelle est la couleur d’une solution A éclairée par une lumière bleue de longueur d’onde 450 nm ?`,
          ],
        },
      ],
      hints: [String.raw`La couleur perçue est la complémentaire de la couleur absorbée.`],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`450 nm : **bleu** ; 525 nm : **vert** ; 700 nm : **rouge**.`,
            String.raw`La solution paraît de la couleur complémentaire de la radiation absorbée : A absorbe le bleu, elle paraît **jaune** (jaune-orangé) ; B absorbe le vert, elle paraît **magenta** ; C absorbe le rouge, elle paraît **cyan**.`,
            String.raw`La solution A absorbe fortement la radiation à 450 nm : elle ne transmet presque rien de cette lumière bleue. Elle paraît **noire** (ou très sombre).`,
          ],
        },
      ],
    },
    {
      id: 'couleurs-ex5',
      title: 'Écran : codage RVB et taille d’une image',
      difficulty: 2,
      duration: 12,
      tags: ['écran', 'pixel', 'codage'],
      statement: [
        {
          type: 'p',
          text: String.raw`Dans un codage RVB à 8 bits par couleur primaire, chaque pixel est décrit par un triplet $(R\,;\,V\,;\,B)$ de valeurs entières comprises entre 0 et 255.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Quelle couleur correspond aux triplets $(255\,;\,255\,;\,0)$, $(0\,;\,255\,;\,255)$ et $(128\,;\,128\,;\,128)$ ?`,
            String.raw`Combien de couleurs différentes peut-on coder ?`,
            String.raw`Une image Full HD contient $1\,920\times1\,080$ pixels. Calculer le nombre de pixels, puis la taille en octets de l’image non compressée (1 pixel = 3 octets), en mégaoctets (1 Mo = $10^6$ octets).`,
            String.raw`Pourquoi un pixel de l’écran paraît-il jaune alors qu’il n’émet pas de lumière jaune ?`,
          ],
        },
      ],
      hints: [String.raw`$2^{24} = 16\,777\,216$.`],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`$(255\,;\,255\,;\,0)$ : R et V à fond, B éteint : **jaune**. $(0\,;\,255\,;\,255)$ : V et B : **cyan**. $(128\,;\,128\,;\,128)$ : les trois primaires à intensité moyenne : **gris moyen**.`,
            String.raw`Chaque primaire a $2^8 = 256$ niveaux, donc $256^3 = 2^{24} = 16\,777\,216$ couleurs (environ 16,8 millions).`,
            String.raw`Nombre de pixels : $1\,920\times1\,080 = 2\,073\,600$. Taille : $2\,073\,600\times3 = 6\,220\,800$ octets, soit environ **$6{,}22\ \text{Mo}$**.`,
            String.raw`Les sous-pixels rouge et vert sont allumés ; l’œil, qui ne distingue pas les sous-pixels, stimule ses cônes L et M comme le ferait une lumière jaune : c’est la synthèse additive.`,
          ],
        },
      ],
    },
    {
      id: 'couleurs-ex6',
      title: 'Éclairage de scène',
      difficulty: 2,
      duration: 15,
      tags: ['diffusion', 'synthèse additive'],
      statement: [
        {
          type: 'p',
          text: String.raw`Sur une scène de théâtre, un acteur porte un costume jaune, un autre un costume bleu, un troisième un costume blanc. Le régisseur éclaire la scène avec un projecteur de lumière **magenta**.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Quelles radiations (R, V, B) émet le projecteur magenta ?`,
            String.raw`De quelle couleur apparaît chaque costume ?`,
            String.raw`Le régisseur ajoute un second projecteur de lumière verte. Comment les trois costumes apparaissent-ils maintenant ?`,
            String.raw`Quelle couleur de projecteur faudrait-il pour que le costume jaune paraisse noir ?`,
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Magenta = rouge + bleu (R + B).`,
            String.raw`Costume jaune (diffuse R, V) : reçoit R + B, diffuse R : **rouge**. Costume bleu (diffuse B) : reçoit R + B, diffuse B : **bleu**. Costume blanc : diffuse tout : **magenta**.`,
            String.raw`La lumière devient R + V + B = blanche. Costume jaune : diffuse R + V : **jaune**. Costume bleu : **bleu**. Costume blanc : **blanc**. Les costumes retrouvent leur couleur en lumière blanche.`,
            String.raw`Le jaune diffuse R et V et absorbe B : il paraît noir s’il ne reçoit que du **bleu**. Il faut un projecteur de lumière **bleue**.`,
          ],
        },
      ],
    },
    {
      id: 'couleurs-ex7',
      title: 'Imprimante et quadrichromie',
      difficulty: 2,
      duration: 12,
      tags: ['impression', 'synthèse soustractive'],
      statement: [
        {
          type: 'p',
          text: String.raw`Une imprimante couleur utilise des encres cyan, magenta et jaune déposées sur du papier blanc éclairé en lumière blanche.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Pour imprimer une zone verte, quelles encres faut-il superposer ? Justifier en indiquant les radiations absorbées.`,
            String.raw`Même question pour une zone rouge.`,
            String.raw`Quelle zone paraît noire si les trois encres sont superposées ? Pourquoi les imprimantes ont-elles une cartouche noire supplémentaire ?`,
            String.raw`Pourquoi ne peut-on pas imprimer sur du papier noir pour obtenir des couleurs vives ?`,
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Vert = seule composante V diffusée : il faut absorber R et B. L’encre **cyan** absorbe R, l’encre **jaune** absorbe B : on superpose **cyan + jaune**.`,
            String.raw`Rouge : absorber V et B. L’encre **magenta** absorbe V, la **jaune** absorbe B : **magenta + jaune**.`,
            String.raw`Cyan + magenta + jaune absorbent R, V et B : la zone paraît **noire** (en pratique un brun foncé, car les encres ne sont pas parfaites). La cartouche noire (K) fournit un noir profond, économise les trois autres encres et donne des textes nets.`,
            String.raw`Le papier noir **absorbe** toutes les radiations : il ne diffuse rien, les encres (qui ne font que retirer des radiations) ne peuvent donc rien faire apparaître. Le papier blanc, qui diffuse tout, est indispensable à une synthèse soustractive.`,
          ],
        },
      ],
    },
    {
      id: 'couleurs-ex8',
      title: 'Type bac : un vitrail bleu et un colorant',
      difficulty: 3,
      duration: 25,
      tags: ['type bac', 'absorption', 'photon', 'filtre'],
      statement: [
        {
          type: 'p',
          text: String.raw`Un artisan verrier colore un verre avec un oxyde métallique. Le spectre d’absorption du verre obtenu présente une large bande entre $580\ \text{nm}$ et $700\ \text{nm}$, avec un maximum d’absorption vers $620\ \text{nm}$. Il est quasiment transparent pour les radiations de longueurs d’onde inférieures à $520\ \text{nm}$.`,
        },
        {
          type: 'p',
          text: String.raw`Données : $h = 6{,}63\times10^{-34}\ \text{J·s}$ ; $c = 3{,}00\times10^{8}\ \text{m·s}^{-1}$ ; $1\ \text{eV} = 1{,}60\times10^{-19}\ \text{J}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Quel est le domaine des longueurs d’onde du spectre visible dans le vide ? Quelles couleurs le verre absorbe-t-il ? Quelles couleurs transmet-il ?`,
            String.raw`En déduire la couleur du verre vu par transmission en lumière blanche. Justifier à l’aide de la notion de couleur complémentaire.`,
            String.raw`Le vitrail est éclairé par derrière par un projecteur de lumière **rouge** ($\lambda = 650\ \text{nm}$). Que voit-on ? Justifier.`,
            String.raw`Calculer la fréquence $\nu$ d’une radiation de longueur d’onde $\lambda = 450\ \text{nm}$ transmise par le verre. Puis calculer l’énergie $E$ d’un photon de cette radiation, en joules puis en électronvolts.`,
            String.raw`Des visiteurs regardent le vitrail à la lumière d’un projecteur de lumière **cyan** (V + B), puis à la lumière d’un projecteur **jaune** (R + V). Décrire dans chaque cas la lumière transmise.`,
          ],
        },
      ],
      hints: [
        String.raw`Les radiations de 580 nm à 700 nm correspondent à jaune-orange-rouge.`,
        String.raw`$\nu = c/\lambda$ et $E = h\nu$.`,
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Le domaine visible dans le vide va de **400 nm à 800 nm**. Le verre absorbe de 580 nm à 700 nm : du **jaune** (vers 580 nm) à l’**orange** et au **rouge**. Il transmet les radiations inférieures à 520 nm : **violet, bleu**, et le vert-bleu.`,
            String.raw`Les radiations transmises sont violet-bleu-vert-bleu : le verre paraît **bleu** (bleu-cyan). C’est bien la couleur complémentaire des radiations absorbées (rouge-orangé absorbé ↔ bleu-cyan perçu).`,
            String.raw`Le verre absorbe fortement les radiations vers 650 nm (dans la bande 580–700 nm). Il ne transmet quasiment rien d’une lumière rouge : on voit du **noir** (ou presque).`,
            String.raw`$\nu = \dfrac{c}{\lambda} = \dfrac{3{,}00\times10^{8}}{450\times10^{-9}} = 6{,}67\times10^{14}\ \text{Hz}$. $E = h\nu = 6{,}63\times10^{-34}\times6{,}67\times10^{14} = 4{,}42\times10^{-19}\ \text{J}$, soit $E = \dfrac{4{,}42\times10^{-19}}{1{,}60\times10^{-19}} = 2{,}76\ \text{eV}$.`,
            String.raw`Lumière cyan (V + B) : le verre transmet B et le vert-bleu, donc la lumière transmise est **bleue à bleu-cyan** (le vert à plus de 520 nm est partiellement atténué). Lumière jaune (R + V) : R est absorbé par le verre, V dans sa partie de grande longueur d’onde est atténué : la lumière transmise est très faible, de teinte verdâtre très sombre ; le vitrail paraît **presque noir**.`,
          ],
        },
      ],
    },
    {
      id: 'couleurs-ex9',
      title: 'Pourquoi un écran « jaune » n’est pas un jaune spectral',
      difficulty: 3,
      duration: 20,
      tags: ['vision', 'cônes', 'trichromie'],
      statement: [
        {
          type: 'p',
          text: String.raw`Deux sources éclairent un même écran blanc : la source 1 émet une radiation monochromatique de longueur d’onde $580\ \text{nm}$ ; la source 2 émet simultanément une radiation rouge de $650\ \text{nm}$ et une radiation verte de $540\ \text{nm}$ d’intensités convenablement réglées. Un observateur les perçoit toutes deux **jaunes**.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Quels types de cônes sont majoritairement stimulés par la source 1 ? par la source 2 ?`,
            String.raw`Expliquer pourquoi l’observateur perçoit la même couleur.`,
            String.raw`On place devant les deux sources un filtre qui ne transmet que les radiations de longueurs d’onde supérieures à $600\ \text{nm}$. Que voit-on pour chaque source ?`,
            String.raw`Un daltonien ne possède pas de cônes M. Quel type de confusion de couleurs peut-on attendre ?`,
          ],
        },
      ],
      hints: [String.raw`Raisonnez en termes de stimulation des cônes (L, M, S), non de longueurs d’onde.`],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`La radiation à 580 nm se situe entre les maxima de sensibilité des cônes M (≈ 530 nm) et L (≈ 560 nm) : elle stimule majoritairement les cônes **L et M**. La source 2 stimule les cônes L (par le rouge à 650 nm) et M (par le vert à 540 nm) : **L et M** également.`,
            String.raw`La couleur perçue ne dépend que des **proportions** de stimulation des trois types de cônes. Si les deux sources stimulent L, M (et S) dans les mêmes proportions, le cerveau reçoit la même information : même couleur perçue. Ces lumières sont dites métamères.`,
            String.raw`Le filtre transmet la radiation à 650 nm (donc le rouge de la source 2) mais bloque celle à 540 nm. Source 1 : la radiation à 580 nm est absorbée, **plus de lumière** (noir). Source 2 : seul le rouge à 650 nm passe, on voit du **rouge**. Les deux sources, indiscernables à l’œil nu, sont devenues discernables : elles n’ont pas la même composition spectrale.`,
            String.raw`Sans cônes M, le cerveau ne peut comparer que les signaux des cônes L et S : le daltonien confond des couleurs qui stimulent L de la même façon, typiquement le **rouge et le vert** (confusion rouge-vert).`,
          ],
        },
      ],
    },
  ],

  // ------------------------------------------------------------------ REPRESENTATIONS
  representations: [
    { type: 'h2', text: 'Visualiser et s’entraîner' },
    { type: 'widget', id: 'color-synthesis', props: { mode: 'additive' }, title: 'Synthèse additive RVB' },
    { type: 'widget', id: 'color-synthesis', props: { mode: 'soustractive' }, title: 'Synthèse soustractive CMJ et filtres' },
    { type: 'svg', svg: svgSpectreVisible, caption: 'Le spectre visible et les couleurs associées.' },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Quelle couleur obtient-on en superposant des lumières rouge et bleue de même intensité ?',
          choices: ['Jaune', 'Cyan', 'Magenta', 'Blanc'],
          answer: 2,
          explanation: 'R + B = magenta en synthèse additive.',
        },
        {
          question: 'Un filtre jaune transmet :',
          choices: ['le bleu uniquement', 'le rouge et le vert', 'le vert et le bleu', 'le rouge et le bleu'],
          answer: 1,
          explanation: 'Jaune = R + V ; il absorbe le bleu.',
        },
        {
          question: 'Un objet vert, éclairé uniquement en lumière rouge, paraît :',
          choices: ['vert', 'rouge', 'noir', 'jaune'],
          answer: 2,
          explanation: 'Il ne diffuse que le vert, qu’il ne reçoit pas : il paraît noir.',
        },
        {
          question: 'La couleur complémentaire du cyan est :',
          choices: ['le rouge', 'le vert', 'le bleu', 'le jaune'],
          answer: 0,
          explanation: 'Cyan + rouge = V + B + R = blanc.',
        },
        {
          question: 'Les cônes de la rétine sont responsables :',
          choices: ['de la vision nocturne', 'de la vision des couleurs', 'du réglage de la pupille', 'de la mise au point'],
          answer: 1,
          explanation: 'Les cônes (S, M, L) permettent la vision des couleurs ; les bâtonnets, la vision nocturne.',
        },
        {
          question: 'Une solution dont le maximum d’absorption est à 520 nm (vert) paraît :',
          choices: ['verte', 'magenta', 'jaune', 'cyan'],
          answer: 1,
          explanation: 'Elle paraît de la couleur complémentaire du vert : magenta.',
        },
        {
          question: 'Combien de couleurs peut-on coder en RVB avec 8 bits par primaire ?',
          choices: ['256', '65 536', '16 777 216', '1 024'],
          answer: 2,
          explanation: '256³ = 2²⁴ = 16 777 216.',
        },
        {
          question: 'Pourquoi imprime-t-on sur du papier blanc ?',
          choices: [
            'Parce qu’il émet de la lumière',
            'Parce qu’il diffuse toutes les radiations que les encres n’absorbent pas',
            'Parce qu’il absorbe le rouge',
            'Parce qu’il est moins cher',
          ],
          answer: 1,
          explanation: 'Les encres soustraient des radiations ; le papier blanc diffuse le reste vers l’œil.',
        },
      ],
    },
    {
      type: 'matching',
      title: 'Associer synthèse et résultat',
      pairs: [
        { left: 'Rouge + Vert (lumières)', right: 'Jaune' },
        { left: 'Vert + Bleu (lumières)', right: 'Cyan' },
        { left: 'Cyan + Magenta (filtres)', right: 'Bleu' },
        { left: 'Cyan + Jaune (filtres)', right: 'Vert' },
        { left: 'Magenta + Jaune (filtres)', right: 'Rouge' },
        { left: 'Cyan + Magenta + Jaune (filtres)', right: 'Noir' },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Un objet rouge est toujours rouge, quel que soit l’éclairage.', answer: false, explanation: 'Sous une lumière verte, il paraît noir.' },
        { text: 'Un filtre cyan absorbe le rouge.', answer: true, explanation: 'Il transmet V et B.' },
        { text: 'Le blanc d’un écran est obtenu en éteignant tous les pixels.', answer: false, explanation: 'Éteindre tous les pixels donne du noir ; le blanc est R + V + B allumés.' },
        { text: 'Une lumière monochromatique contient plusieurs longueurs d’onde.', answer: false, explanation: 'Une seule : c’est ce qui la définit.' },
        { text: 'Les bâtonnets permettent de voir les couleurs.', answer: false, explanation: 'Ils servent à la vision nocturne en nuances de gris.' },
        { text: 'Deux lumières de compositions spectrales différentes peuvent être perçues de la même couleur.', answer: true, explanation: 'Trichromie : seule compte la stimulation des trois types de cônes.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Texte à trous',
      text: String.raw`En synthèse {{additive}}, on superpose des lumières R, V et B pour obtenir du {{blanc}}. En synthèse {{soustractive}}, on retire des radiations à la lumière blanche à l’aide de {{filtres|colorants|pigments}} de couleur cyan, {{magenta}} et jaune. Un objet qui diffuse toute la lumière paraît {{blanc}} ; un objet qui absorbe toute la lumière paraît {{noir}}.`,
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Domaine des longueurs d’onde du visible (dans le vide)', back: String.raw`De $400\ \text{nm}$ (violet) à $800\ \text{nm}$ (rouge).` },
        { front: 'Primaires de la synthèse additive', back: 'Rouge, Vert, Bleu (RVB). R + V + B = blanc.' },
        { front: 'Primaires de la synthèse soustractive', back: 'Cyan, Magenta, Jaune (CMJ). C + M + J = noir.' },
        { front: 'Couleurs complémentaires', back: 'Rouge–cyan, vert–magenta, bleu–jaune : leur synthèse additive donne du blanc.' },
        { front: 'Que transmet un filtre magenta ?', back: 'Le rouge et le bleu ; il absorbe le vert.' },
        { front: 'Comment prévoir la couleur d’un objet éclairé ?', back: 'Intersection entre les radiations reçues et celles que l’objet diffuse ; sinon noir.' },
        { front: 'Cônes ou bâtonnets : vision des couleurs ?', back: 'Cônes (S, M, L), en lumière forte, concentrés dans la fovéa.' },
        { front: 'Couleur perçue d’une espèce qui absorbe vers 450 nm', back: 'Jaune-orangé : couleur complémentaire de la radiation absorbée (bleu).' },
        { front: 'Nombre de couleurs en RVB 24 bits', back: String.raw`$2^{24} = 16\,777\,216$.` },
        { front: 'Pourquoi le noir en plus en CMJN ?', back: 'Pour un noir profond, des textes nets, et pour économiser les encres couleur.' },
      ],
    },
    {
      type: 'reveal',
      title: 'Pourquoi le ciel est-il bleu ? (ouverture)',
      content: [
        {
          type: 'p',
          text: String.raw`Les molécules de l’atmosphère **diffusent** la lumière du Soleil, et beaucoup plus les petites longueurs d’onde (bleu, violet) que les grandes (rouge). Nous recevons surtout du bleu diffusé dans toutes les directions : le ciel paraît bleu. Au coucher du Soleil, la lumière traverse une grande épaisseur d’atmosphère : le bleu a été diffusé hors du faisceau direct, il reste surtout du rouge-orangé.`,
        },
      ],
    },
  ],
}

export default chapter
