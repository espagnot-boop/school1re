import type { Chapter } from '../types'

const r = String.raw

// ---------------------------------------------------------------------------
// Schémas SVG
// ---------------------------------------------------------------------------

const svgMicro = `<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <defs>
    <marker id="pc8-m" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(217 91% 60%)"/></marker>
  </defs>
  <text x="130" y="20" text-anchor="middle" class="svg-fill" font-weight="600">Gaz : entités dispersées, désordonnées</text>
  <rect x="20" y="30" width="220" height="160" fill="none" stroke="currentColor" class="svg-stroke" stroke-width="2"/>
  <g fill="hsl(217 91% 60%)">
    <circle cx="50" cy="60" r="5"/><circle cx="120" cy="80" r="5"/><circle cx="200" cy="55" r="5"/>
    <circle cx="80" cy="140" r="5"/><circle cx="160" cy="130" r="5"/><circle cx="215" cy="165" r="5"/>
    <circle cx="45" cy="175" r="5"/><circle cx="130" cy="170" r="5"/>
  </g>
  <g stroke="hsl(217 91% 60%)" stroke-width="1.5" marker-end="url(#pc8-m)">
    <line x1="50" y1="60" x2="30" y2="45"/><line x1="120" y1="80" x2="150" y2="95"/><line x1="200" y1="55" x2="232" y2="40"/>
    <line x1="80" y1="140" x2="70" y2="110"/><line x1="160" y1="130" x2="190" y2="120"/><line x1="215" y1="165" x2="234" y2="182"/>
    <line x1="45" y1="175" x2="26" y2="160"/><line x1="130" y1="170" x2="110" y2="183"/>
  </g>
  <circle cx="232" cy="40" r="9" fill="none" stroke="hsl(0 84% 60%)" stroke-width="1.5" stroke-dasharray="2 2"/>
  <text x="130" y="210" text-anchor="middle" class="svg-muted" fill="currentColor" font-size="11">Chocs sur la paroi → force pressante</text>
  <text x="390" y="20" text-anchor="middle" class="svg-fill" font-weight="600">Liquide : entités proches, désordonnées</text>
  <rect x="280" y="30" width="220" height="160" fill="none" stroke="currentColor" class="svg-stroke" stroke-width="2"/>
  <g fill="hsl(142 71% 45%)">
    <circle cx="295" cy="180" r="7"/><circle cx="311" cy="178" r="7"/><circle cx="327" cy="181" r="7"/><circle cx="343" cy="177" r="7"/><circle cx="359" cy="180" r="7"/><circle cx="375" cy="178" r="7"/><circle cx="391" cy="181" r="7"/><circle cx="407" cy="178" r="7"/><circle cx="423" cy="180" r="7"/><circle cx="439" cy="177" r="7"/><circle cx="455" cy="180" r="7"/><circle cx="471" cy="178" r="7"/><circle cx="487" cy="181" r="7"/>
    <circle cx="302" cy="165" r="7"/><circle cx="319" cy="163" r="7"/><circle cx="336" cy="166" r="7"/><circle cx="352" cy="162" r="7"/><circle cx="368" cy="165" r="7"/><circle cx="384" cy="164" r="7"/><circle cx="400" cy="166" r="7"/><circle cx="416" cy="163" r="7"/><circle cx="432" cy="165" r="7"/><circle cx="448" cy="162" r="7"/><circle cx="464" cy="165" r="7"/><circle cx="480" cy="164" r="7"/>
    <circle cx="295" cy="149" r="7"/><circle cx="312" cy="148" r="7"/><circle cx="329" cy="150" r="7"/><circle cx="346" cy="147" r="7"/><circle cx="362" cy="150" r="7"/><circle cx="379" cy="148" r="7"/><circle cx="395" cy="150" r="7"/><circle cx="412" cy="147" r="7"/><circle cx="428" cy="149" r="7"/><circle cx="445" cy="148" r="7"/><circle cx="461" cy="150" r="7"/><circle cx="478" cy="147" r="7"/><circle cx="493" cy="150" r="7"/>
    <circle cx="305" cy="134" r="7"/><circle cx="330" cy="133" r="7"/><circle cx="356" cy="135" r="7"/><circle cx="381" cy="133" r="7"/><circle cx="406" cy="134" r="7"/><circle cx="433" cy="133" r="7"/><circle cx="458" cy="135" r="7"/><circle cx="484" cy="133" r="7"/>
  </g>
  <text x="390" y="210" text-anchor="middle" class="svg-muted" fill="currentColor" font-size="11">Quasi incompressible, prend la forme du récipient</text>
</svg>`

const svgColonne = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <defs>
    <marker id="pc8-z" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker>
  </defs>
  <rect x="120" y="60" width="240" height="190" fill="hsl(217 91% 60%)" opacity="0.15"/>
  <path d="M120,30 L120,250 L360,250 L360,30" fill="none" stroke="currentColor" class="svg-stroke" stroke-width="2"/>
  <line x1="120" y1="60" x2="360" y2="60" stroke="hsl(217 91% 60%)" stroke-width="2"/>
  <text x="370" y="64" class="svg-fill">surface libre : P = P₀</text>
  <line x1="60" y1="260" x2="60" y2="30" stroke="currentColor" class="svg-stroke" stroke-width="1.5" marker-end="url(#pc8-z)"/>
  <text x="48" y="28" class="svg-fill">z</text>
  <circle cx="210" cy="110" r="5" fill="hsl(0 84% 60%)"/>
  <text x="220" y="114" fill="hsl(0 84% 60%)">A (z_A, P_A)</text>
  <circle cx="270" cy="200" r="5" fill="hsl(0 84% 60%)"/>
  <text x="280" y="204" fill="hsl(0 84% 60%)">B (z_B, P_B)</text>
  <line x1="55" y1="110" x2="210" y2="110" stroke="currentColor" class="svg-muted" stroke-dasharray="3 3"/>
  <line x1="55" y1="200" x2="270" y2="200" stroke="currentColor" class="svg-muted" stroke-dasharray="3 3"/>
  <text x="28" y="114" class="svg-fill">z_A</text>
  <text x="28" y="204" class="svg-fill">z_B</text>
  <line x1="390" y1="110" x2="390" y2="200" stroke="hsl(25 95% 53%)" stroke-width="1.5"/>
  <line x1="384" y1="110" x2="396" y2="110" stroke="hsl(25 95% 53%)"/>
  <line x1="384" y1="200" x2="396" y2="200" stroke="hsl(25 95% 53%)"/>
  <text x="400" y="160" fill="hsl(25 95% 53%)">z_A − z_B</text>
  <text x="140" y="275" class="svg-fill">P_B − P_A = ρ g (z_A − z_B)</text>
  <text x="140" y="90" class="svg-muted" fill="currentColor" font-size="11">fluide de masse volumique ρ</text>
</svg>`

const svgManometre = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <rect x="30" y="80" width="130" height="110" fill="hsl(25 95% 53%)" opacity="0.12" stroke="currentColor" class="svg-stroke" stroke-width="2"/>
  <text x="95" y="140" text-anchor="middle" class="svg-fill">gaz : P_gaz</text>
  <line x1="160" y1="130" x2="230" y2="130" stroke="currentColor" class="svg-stroke" stroke-width="2"/>
  <line x1="160" y1="145" x2="215" y2="145" stroke="currentColor" class="svg-stroke" stroke-width="2"/>
  <path d="M230,130 L230,240 Q230,255 245,255 L305,255 Q320,255 320,240 L320,40" fill="none" stroke="currentColor" class="svg-stroke" stroke-width="2"/>
  <path d="M215,145 L215,245 Q215,270 240,270 L310,270 Q335,270 335,245 L335,40" fill="none" stroke="currentColor" class="svg-stroke" stroke-width="2"/>
  <path d="M215,190 L230,190 L230,240 Q230,255 245,255 L305,255 Q320,255 320,240 L320,120 L335,120 L335,245 Q335,270 310,270 L240,270 Q215,270 215,245 Z" fill="hsl(217 91% 60%)" opacity="0.45"/>
  <line x1="200" y1="190" x2="360" y2="190" stroke="currentColor" class="svg-muted" stroke-dasharray="3 3"/>
  <line x1="320" y1="120" x2="400" y2="120" stroke="currentColor" class="svg-muted" stroke-dasharray="3 3"/>
  <line x1="390" y1="120" x2="390" y2="190" stroke="hsl(0 84% 60%)" stroke-width="1.5"/>
  <line x1="384" y1="120" x2="396" y2="120" stroke="hsl(0 84% 60%)"/>
  <line x1="384" y1="190" x2="396" y2="190" stroke="hsl(0 84% 60%)"/>
  <text x="400" y="160" fill="hsl(0 84% 60%)">h</text>
  <text x="345" y="45" class="svg-fill">air libre : P₀</text>
  <circle cx="222" cy="190" r="4" fill="hsl(0 84% 60%)"/>
  <text x="170" y="210" class="svg-fill">M</text>
  <circle cx="327" cy="190" r="4" fill="hsl(0 84% 60%)"/>
  <text x="345" y="210" class="svg-fill">N</text>
  <text x="30" y="30" class="svg-fill" font-weight="600">Manomètre à tube en U (liquide de masse volumique ρ)</text>
  <text x="30" y="235" class="svg-fill">P_M = P_N</text>
  <text x="30" y="255" class="svg-fill">P_gaz = P₀ + ρ g h</text>
</svg>`

const svgForcePressante = `<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <defs>
    <marker id="pc8-f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(0 84% 60%)"/></marker>
  </defs>
  <rect x="140" y="60" width="240" height="150" fill="hsl(217 91% 60%)" opacity="0.15"/>
  <path d="M140,40 L140,210 L380,210 L380,40" fill="none" stroke="currentColor" class="svg-stroke" stroke-width="2.5"/>
  <line x1="140" y1="60" x2="380" y2="60" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>
  <g stroke="hsl(0 84% 60%)" stroke-width="2" marker-end="url(#pc8-f)">
    <line x1="170" y1="90" x2="146" y2="90"/>
    <line x1="180" y1="140" x2="146" y2="140"/>
    <line x1="190" y1="190" x2="146" y2="190"/>
    <line x1="350" y1="90" x2="374" y2="90"/>
    <line x1="340" y1="140" x2="374" y2="140"/>
    <line x1="330" y1="190" x2="374" y2="190"/>
    <line x1="230" y1="160" x2="230" y2="205"/>
    <line x1="290" y1="160" x2="290" y2="205"/>
  </g>
  <text x="400" y="100" class="svg-fill">Force pressante :</text>
  <text x="400" y="120" class="svg-fill">⊥ à la paroi,</text>
  <text x="400" y="140" class="svg-fill">du fluide vers la paroi,</text>
  <text x="400" y="160" class="svg-fill">F = P × S</text>
  <text x="20" y="100" class="svg-muted" fill="currentColor" font-size="11">plus faible</text>
  <text x="20" y="114" class="svg-muted" fill="currentColor" font-size="11">en surface</text>
  <text x="20" y="186" class="svg-muted" fill="currentColor" font-size="11">plus intense</text>
  <text x="20" y="200" class="svg-muted" fill="currentColor" font-size="11">en profondeur</text>
</svg>`

// ---------------------------------------------------------------------------

const chapter: Chapter = {
  id: 'fluide-repos',
  subject: 'physique-chimie',
  order: 8,
  title: 'Description d’un fluide au repos',
  theme: 'Mouvement et interactions',
  summary:
    'Masse volumique, pression et température d’un fluide ; force pressante ; loi de Mariotte ; loi fondamentale de la statique des fluides.',
  duration: '2 semaines',
  objectives: [
    'Expliquer qualitativement le lien entre les grandeurs macroscopiques (masse volumique, pression, température) et le comportement microscopique des entités.',
    'Exploiter la relation $F = P\\times S$ pour déterminer la force pressante exercée par un fluide sur une surface plane.',
    'Tester et utiliser la loi de Mariotte ($P\\times V$ = constante à température et quantité de matière fixées).',
    'Utiliser la loi fondamentale de la statique des fluides $P_B - P_A = \\rho\\,g\\,(z_A - z_B)$.',
    'Tester la loi fondamentale de la statique des fluides et expliquer l’influence de la profondeur sur la pression.',
    'Convertir les unités de pression (Pa, hPa, bar) et de température (°C, K).',
  ],
  keywords: ['fluide', 'masse volumique', 'pression', 'température absolue', 'force pressante', 'loi de Mariotte', 'statique des fluides', 'manomètre'],

  // =========================================================================
  fiche: [
    { type: 'h2', text: 'Grandeurs macroscopiques' },
    {
      type: 'table',
      headers: ['Grandeur', 'Définition', 'Unité SI', 'Interprétation microscopique'],
      rows: [
        ['Masse volumique', r`$\rho = \dfrac{m}{V}$`, 'kg·m⁻³', 'nombre et masse des entités par unité de volume'],
        ['Pression', r`$P = \dfrac{F}{S}$`, 'Pa (= N·m⁻²)', 'chocs des entités sur les parois'],
        ['Température absolue', r`$T(\text{K}) = \theta(°\text{C}) + 273{,}15$`, 'K', 'agitation des entités (vitesse moyenne)'],
      ],
    },
    {
      type: 'keyvalue',
      items: [
        { key: 'Pression atmosphérique normale', value: r`$P_0 = 1{,}013\times10^{5}$ Pa $= 1\,013$ hPa $\approx 1$ bar` },
        { key: '1 bar', value: r`$10^{5}$ Pa` },
        { key: 'Eau liquide', value: r`$\rho = 1{,}00\times10^{3}$ kg·m⁻³ $= 1{,}00$ kg·L⁻¹ $= 1{,}00$ g·mL⁻¹` },
        { key: 'Zéro absolu', value: r`$0$ K $= -273{,}15$ °C : agitation minimale` },
      ],
    },
    { type: 'h2', text: 'Force pressante' },
    {
      type: 'callout',
      variant: 'property',
      title: 'F = P × S',
      content: [
        {
          type: 'p',
          text: r`Un fluide à la pression $P$ exerce sur une surface plane $S$ une force pressante **perpendiculaire** à la surface, dirigée **du fluide vers la surface**, de valeur $F = P\times S$ ($F$ en N, $P$ en Pa, $S$ en m²).`,
        },
      ],
    },
    { type: 'h2', text: 'Lois' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Loi de Mariotte (gaz)',
      content: [
        { type: 'math', tex: r`P\times V = \text{constante} \quad\Longleftrightarrow\quad P_1V_1 = P_2V_2` },
        { type: 'p', text: 'Pour une **quantité de gaz fixée** à **température constante**. Valable aux faibles pressions (modèle du gaz parfait).' },
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Loi fondamentale de la statique des fluides (liquide incompressible)',
      content: [
        { type: 'math', tex: r`P_B - P_A = \rho\,g\,(z_A - z_B)` },
        { type: 'p', text: r`Axe $z$ vertical **vers le haut**. À la profondeur $h$ sous la surface libre : $P = P_0 + \rho g h$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Ordres de grandeur et conséquences',
      content: [
        {
          type: 'list',
          items: [
            'Dans l’eau, la pression augmente d’environ **1 bar tous les 10 m**.',
            'Tous les points d’un même liquide au repos situés à la **même altitude** ont la **même pression**.',
            'La pression ne dépend pas de la forme du récipient, seulement de la profondeur.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Pièges',
      content: [
        {
          type: 'list',
          items: [
            r`Conversions : $1$ cm² $= 10^{-4}$ m² ; $1$ L $= 10^{-3}$ m³ ; $1$ mL $= 10^{-6}$ m³ ; $1$ hPa $= 100$ Pa.`,
            'Dans la loi de Mariotte, V et P peuvent rester dans n’importe quelles unités (cohérentes des deux côtés).',
            'Dans la loi de la statique des fluides : unités SI obligatoires (Pa, kg·m⁻³, m).',
          ],
        },
      ],
    },
  ],

  // =========================================================================
  cours: [
    { type: 'h2', text: '1. Qu’est-ce qu’un fluide ?' },
    {
      type: 'p',
      text: 'Un **fluide** est un milieu matériel qui peut s’écouler et qui prend la forme du récipient qui le contient : ce sont les **liquides** et les **gaz**. Un fluide est **au repos** lorsqu’il ne s’écoule pas à l’échelle macroscopique.',
    },
    {
      type: 'table',
      headers: ['', 'Gaz', 'Liquide'],
      rows: [
        ['Distance entre entités', 'grande devant leur taille (état dispersé)', 'de l’ordre de leur taille (état condensé)'],
        ['Ordre', 'désordonné', 'désordonné'],
        ['Compressibilité', 'compressible', 'quasi incompressible'],
        ['Volume propre', 'non : occupe tout le volume offert', 'oui'],
        ['Masse volumique typique', 'air : 1,2 kg·m⁻³ (20 °C, 1 bar)', 'eau : 1 000 kg·m⁻³'],
      ],
    },
    { type: 'svg', svg: svgMicro, caption: 'Modèles microscopiques d’un gaz et d’un liquide.', maxWidth: 560 },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Échelles de description',
      content: [
        {
          type: 'list',
          items: [
            '**Échelle microscopique** : celle des entités (atomes, molécules, ions), de l’ordre de 10⁻¹⁰ m. Elles sont en mouvement incessant et désordonné (agitation thermique).',
            '**Échelle macroscopique** : celle de nos mesures. On décrit le fluide par des grandeurs moyennes : masse volumique, pression, température.',
          ],
        },
      ],
    },

    { type: 'h2', text: '2. La masse volumique' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Masse volumique',
      content: [
        { type: 'math', tex: r`\rho = \frac{m}{V}` },
        { type: 'p', text: r`$\rho$ en kg·m⁻³, $m$ en kg, $V$ en m³. Unités pratiques : g·mL⁻¹ = g·cm⁻³ = kg·L⁻¹ ($1$ g·mL⁻¹ $= 1\,000$ kg·m⁻³).` },
      ],
    },
    {
      type: 'p',
      text: 'Interprétation microscopique : la masse volumique dépend de la masse des entités et de leur nombre par unité de volume. Elle est environ 1 000 fois plus faible pour un gaz que pour un liquide car les entités y sont beaucoup plus espacées.',
    },
    {
      type: 'table',
      headers: ['Fluide (20 °C, 1 bar)', 'ρ (kg·m⁻³)'],
      rows: [
        ['Air', '1,2'],
        ['Huile de tournesol', '920'],
        ['Eau douce', '1 000'],
        ['Eau de mer', '1 025'],
        ['Mercure', '13 546'],
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        { type: 'p', text: r`250 mL d’huile ont une masse de 230 g : $\rho = \dfrac{230}{250} = 0{,}920$ g·mL⁻¹ $= 920$ kg·m⁻³. L’huile, moins dense que l’eau, flotte à sa surface.` },
      ],
    },

    { type: 'h2', text: '3. La pression' },
    {
      type: 'p',
      text: 'Les entités d’un fluide, en mouvement désordonné, heurtent sans cesse les parois du récipient (et tout objet immergé). Chaque choc exerce une minuscule force ; leur effet global, à l’échelle macroscopique, est une **force pressante** proportionnelle à la surface. La **pression** mesure cette action par unité de surface.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Pression',
      content: [
        { type: 'math', tex: r`P = \frac{F}{S}` },
        { type: 'p', text: r`$P$ en pascal (Pa), $F$ en newton (N), $S$ en m². $1$ Pa $= 1$ N·m⁻².` },
      ],
    },
    {
      type: 'keyvalue',
      items: [
        { key: 'hectopascal', value: '1 hPa = 100 Pa (météorologie)' },
        { key: 'bar', value: r`1 bar = $10^{5}$ Pa (pneus, plongée)` },
        { key: 'atmosphère', value: r`1 atm = $1{,}013\times10^{5}$ Pa` },
        { key: 'millimètre de mercure', value: '760 mmHg = 1 atm (médecine : tension artérielle)' },
      ],
    },
    {
      type: 'p',
      text: 'La pression se mesure avec un **manomètre** (pression relative, par rapport à l’atmosphère) ou un **pressiomètre / capteur de pression** (pression absolue). Le **baromètre** mesure la pression atmosphérique.',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Pression absolue et relative',
      content: [
        { type: 'p', text: 'Un manomètre de pneu indiquant « 2,0 bar » mesure la **surpression** par rapport à l’air extérieur : la pression absolue dans le pneu est environ 2,0 + 1,0 = 3,0 bar.' },
      ],
    },
    { type: 'h3', text: 'Facteurs microscopiques influençant la pression d’un gaz' },
    {
      type: 'list',
      items: [
        'Plus il y a d’entités dans un volume donné, plus les chocs sont nombreux : la pression augmente.',
        'Si on diminue le volume (à quantité constante), la densité d’entités augmente : la pression augmente (loi de Mariotte).',
        'Si la température augmente, les entités sont plus rapides : chocs plus fréquents et plus violents, la pression augmente.',
      ],
    },

    { type: 'h2', text: '4. La température' },
    {
      type: 'p',
      text: 'La température est liée à l’**agitation thermique** des entités : plus la température est élevée, plus leur vitesse moyenne est grande. À l’extrême, il existe une température minimale où l’agitation est minimale : le **zéro absolu**.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Température absolue',
      content: [
        { type: 'math', tex: r`T\,(\text{K}) = \theta\,(°\text{C}) + 273{,}15` },
        { type: 'p', text: 'L’unité SI est le **kelvin** (K). Une température absolue est toujours positive. Une **variation** de 1 °C est égale à une variation de 1 K.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Conversions',
      content: [
        { type: 'list', items: ['20 °C → 293,15 K ≈ 293 K', '100 °C → 373,15 K', '77 K → −196 °C (azote liquide)'] },
      ],
    },

    { type: 'h2', text: '5. La force pressante' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Caractéristiques de la force pressante',
      content: [
        {
          type: 'p',
          text: r`Un fluide à la pression $P$ exerce sur une surface plane d’aire $S$ (où la pression est uniforme) une force pressante $\vec F$ :`,
        },
        {
          type: 'list',
          items: [
            '**point d’application** : centre de la surface ;',
            '**direction** : perpendiculaire à la surface ;',
            '**sens** : du fluide vers la surface ;',
            r`**valeur** : $F = P\times S$.`,
          ],
        },
      ],
    },
    { type: 'svg', svg: svgForcePressante, caption: 'Forces pressantes exercées par un liquide sur les parois du récipient.', maxWidth: 560 },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : force de l’air sur une fenêtre',
      content: [
        {
          type: 'p',
          text: r`Fenêtre de $1{,}2$ m × $0{,}80$ m : $S = 0{,}96$ m². $F = P_0 S = 1{,}013\times10^{5}\times0{,}96 = 9{,}7\times10^{4}$ N, soit le poids d’une masse d’environ 10 tonnes ! La vitre ne casse pas car l’air exerce une force de même valeur et de sens opposé sur l’autre face : la **force pressante résultante** est nulle.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Force pressante résultante',
      content: [
        { type: 'p', text: r`Si une paroi sépare deux fluides de pressions $P_1$ et $P_2$, la force résultante a pour valeur $F = |P_1 - P_2|\times S$, dirigée vers le côté de plus basse pression.` },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Les hémisphères de Magdebourg (1654)',
      content: [
        {
          type: 'p',
          text: 'Otto von Guericke fit le vide dans une sphère formée de deux hémisphères accolés : deux attelages de chevaux ne parvinrent pas à les séparer. La pression atmosphérique, non compensée à l’intérieur, plaquait les deux moitiés l’une contre l’autre.',
        },
      ],
    },

    { type: 'h2', text: '6. Un modèle de comportement des gaz : la loi de Mariotte' },
    {
      type: 'p',
      text: 'On enferme une quantité d’air dans une seringue reliée à un capteur de pression. On fait varier le volume lentement (pour que la température reste constante) et on relève la pression.',
    },
    {
      type: 'table',
      headers: ['V (mL)', '60,0', '50,0', '40,0', '30,0', '20,0'],
      rows: [
        ['P (hPa)', '1 013', '1 216', '1 520', '2 026', '3 039'],
        ['P × V (hPa·mL)', '60 780', '60 800', '60 800', '60 780', '60 780'],
      ],
      caption: 'Le produit P × V est constant aux incertitudes près.',
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Loi de Mariotte (Boyle-Mariotte)',
      content: [
        { type: 'p', text: 'Pour une quantité de matière de gaz donnée, à température constante, le produit de la pression par le volume reste constant :' },
        { type: 'math', tex: r`P\times V = \text{constante} \qquad P_1\,V_1 = P_2\,V_2` },
      ],
    },
    {
      type: 'list',
      items: [
        r`La pression est **inversement proportionnelle** au volume : si $V$ est divisé par 2, $P$ est multipliée par 2.`,
        r`Le graphe $P = f(V)$ est une branche d’hyperbole ; le graphe $P = f(1/V)$ est une **droite passant par l’origine**.`,
        'Cette loi est un **modèle** : elle est vérifiée pour les gaz aux pressions modérées (gaz parfait), mais pas aux fortes pressions.',
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Tester la loi de Mariotte',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Mesurer', text: 'Relever des couples (V, P) avec une seringue et un capteur (éventuellement piloté par un microcontrôleur).' },
            { title: 'Calculer', text: 'Calculer P × V pour chaque mesure, ou tracer P en fonction de 1/V.' },
            { title: 'Conclure', text: 'Si P × V est constant (écart relatif de quelques %) ou si P = f(1/V) est une droite passant par l’origine, la loi est vérifiée.' },
          ],
        },
      ],
    },
    {
      type: 'code',
      lang: 'python',
      caption: 'Vérification numérique de la loi de Mariotte',
      code: `V = [60.0, 50.0, 40.0, 30.0, 20.0]       # volumes en mL
P = [1013, 1216, 1520, 2026, 3039]        # pressions en hPa

produits = [p * v for p, v in zip(P, V)]
moyenne = sum(produits) / len(produits)
for p, v, pv in zip(P, V, produits):
    ecart = abs(pv - moyenne) / moyenne * 100
    print(f"V = {v} mL  P = {p} hPa  PV = {pv:.0f}  écart = {ecart:.2f} %")`,
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : pneu de vélo',
      content: [
        {
          type: 'p',
          text: r`Une pompe contient $V_1 = 0{,}50$ L d’air à $P_1 = 1{,}0$ bar. On comprime (à température constante) jusqu’à $V_2 = 0{,}20$ L : $P_2 = \dfrac{P_1V_1}{V_2} = \dfrac{1{,}0\times0{,}50}{0{,}20} = 2{,}5$ bar.`,
        },
      ],
    },

    { type: 'h2', text: '7. Loi fondamentale de la statique des fluides' },
    {
      type: 'p',
      text: 'Lorsqu’on plonge, on ressent une pression croissante sur les tympans : la pression d’un liquide augmente avec la profondeur, car il faut « porter » le poids de la colonne de liquide située au-dessus.',
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Loi fondamentale de la statique des fluides',
      content: [
        {
          type: 'p',
          text: r`Dans un fluide **incompressible** (liquide) de masse volumique $\rho$, **au repos**, la différence de pression entre deux points A et B d’altitudes $z_A$ et $z_B$ (axe $Oz$ vertical **ascendant**) vaut :`,
        },
        { type: 'math', tex: r`P_B - P_A = \rho\,g\,(z_A - z_B)` },
        { type: 'p', text: r`$P$ en Pa, $\rho$ en kg·m⁻³, $g = 9{,}81$ N·kg⁻¹, $z$ en m.` },
      ],
    },
    { type: 'svg', svg: svgColonne, caption: 'Deux points A et B d’un liquide au repos.', maxWidth: 560 },
    {
      type: 'callout',
      variant: 'property',
      title: 'Démonstration (pour comprendre)',
      content: [
        {
          type: 'p',
          text: r`On isole un cylindre vertical de liquide, de section $S$, entre les altitudes $z_B$ (base) et $z_A$ (sommet), avec $z_A > z_B$. Il est au repos : les forces qu’il subit se compensent. Verticalement : la force pressante sur la base, $P_B S$ vers le haut ; sur le sommet, $P_A S$ vers le bas ; le poids $mg = \rho S(z_A - z_B)g$ vers le bas (les forces latérales, horizontales, se compensent entre elles).`,
        },
        { type: 'math', tex: r`P_B S = P_A S + \rho\,S\,(z_A - z_B)\,g \;\Longrightarrow\; P_B - P_A = \rho\,g\,(z_A - z_B)` },
      ],
    },
    { type: 'h3', text: 'Conséquences' },
    {
      type: 'list',
      items: [
        r`**Avec la profondeur** : si A est à la surface libre ($P_A = P_0$) et B à la profondeur $h = z_A - z_B$ : $P_B = P_0 + \rho g h$. La pression augmente **linéairement** avec la profondeur.`,
        '**Même altitude, même pression** : dans un même liquide au repos, tous les points d’un plan horizontal ont la même pression (principe des vases communicants, surface libre horizontale).',
        '**Forme du récipient** : la pression au fond ne dépend que de la hauteur de liquide, pas de la forme ni de la quantité de liquide (paradoxe hydrostatique).',
        r`Dans l’eau : $\rho g \approx 1{,}0\times10^{3}\times9{,}81 \approx 10^{4}$ Pa·m⁻¹, soit **+1 bar tous les 10 m**.`,
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : plongeur à 20 m (eau de mer)',
      content: [
        { type: 'math', tex: r`P = P_0 + \rho g h = 1{,}013\times10^{5} + 1\,025\times9{,}81\times20 = 3{,}02\times10^{5}\ \text{Pa}` },
        { type: 'p', text: 'La pression est environ 3 fois la pression atmosphérique.' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Domaine de validité',
      content: [
        {
          type: 'p',
          text: 'La loi suppose ρ constante : elle s’applique aux liquides. Pour un gaz, elle n’est valable que sur de faibles dénivellations (quelques dizaines de mètres pour l’air), car la masse volumique de l’air varie avec l’altitude.',
        },
      ],
    },
    { type: 'h3', text: 'Applications : manomètre et baromètre' },
    { type: 'svg', svg: svgManometre, caption: 'Mesure de la pression d’un gaz avec un tube en U.', maxWidth: 560 },
    {
      type: 'p',
      text: r`M et N sont dans le même liquide, à la même altitude : $P_M = P_N$. Or $P_M = P_{gaz}$ (la pression du gaz est quasi uniforme) et $P_N = P_0 + \rho g h$. Donc $P_{gaz} = P_0 + \rho g h$ : la dénivellation $h$ mesure la surpression du gaz.`,
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Le baromètre de Torricelli (1643)',
      content: [
        {
          type: 'p',
          text: r`Un tube rempli de mercure retourné sur une cuve de mercure : le mercure descend jusqu’à une hauteur $h$ telle que $P_0 = \rho_{Hg} g h$ (vide au sommet). $h = \dfrac{1{,}013\times10^{5}}{13\,546\times9{,}81} = 0{,}762$ m, soit 760 mm de mercure : d’où l’unité mmHg.`,
        },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Faire un schéma', text: 'Placer l’axe z vertical vers le haut, les points A et B, la surface libre.' },
        { title: 'Choisir le point de référence', text: 'Souvent un point de la surface libre où P = P₀.' },
        { title: 'Appliquer la loi', text: r`$P_B = P_A + \rho g (z_A - z_B)$ : B plus bas que A ⇒ $P_B > P_A$.` },
        { title: 'Vérifier les unités', text: 'Tout en SI. Ordre de grandeur : +1 bar tous les 10 m d’eau.' },
      ],
    },
  ],

  // =========================================================================
  exercices: [
    {
      id: 'pc8-ex1',
      title: 'Masse volumique d’une huile',
      difficulty: 1,
      duration: 5,
      tags: ['masse volumique'],
      statement: [
        { type: 'p', text: 'Une éprouvette vide a une masse de 85,0 g. Remplie de 250 mL d’huile, sa masse est de 315,0 g.' },
        { type: 'list', ordered: true, items: [
          'Calculer la masse volumique de l’huile en g·mL⁻¹ puis en kg·m⁻³.',
          'L’huile flotte-t-elle sur l’eau ? Justifier.',
          'Calculer la masse de 1,5 L de cette huile.',
        ] },
      ],
      hints: ['m(huile) = 315,0 − 85,0 g.', '1 g·mL⁻¹ = 1 000 kg·m⁻³.'],
      solution: [
        { type: 'p', text: r`**1.** $m = 315{,}0 - 85{,}0 = 230{,}0$ g ; $\rho = \dfrac{230{,}0}{250} = 0{,}920$ g·mL⁻¹ $= 920$ kg·m⁻³.` },
        { type: 'p', text: r`**2.** $\rho_{huile} < \rho_{eau} = 1{,}00$ g·mL⁻¹ : l’huile, moins dense, flotte sur l’eau (les deux liquides sont non miscibles).` },
        { type: 'p', text: r`**3.** $m = \rho V = 0{,}920\times1\,500 = 1{,}38\times10^{3}$ g $= 1{,}38$ kg.` },
      ],
    },
    {
      id: 'pc8-ex2',
      title: 'Conversions et interprétation microscopique',
      difficulty: 1,
      duration: 8,
      tags: ['unités', 'microscopique'],
      statement: [
        { type: 'list', ordered: true, items: [
          'Convertir en pascal : 2,5 bar ; 980 hPa ; 760 mmHg.',
          'Convertir en kelvin : 25 °C ; −18 °C. Convertir 4,2 K en °C.',
          'Un pneu est gonflé à froid. Après un long trajet, sa température augmente. Expliquer à l’échelle microscopique pourquoi la pression augmente (le volume du pneu étant à peu près constant).',
        ] },
      ],
      hints: ['760 mmHg = 1 atm = 1,013 × 10⁵ Pa.', 'T(K) = θ(°C) + 273,15.'],
      solution: [
        { type: 'p', text: r`**1.** $2{,}5$ bar $= 2{,}5\times10^{5}$ Pa ; $980$ hPa $= 9{,}80\times10^{4}$ Pa ; $760$ mmHg $= 1{,}013\times10^{5}$ Pa.` },
        { type: 'p', text: '**2.** 25 °C → 298 K (298,15 K) ; −18 °C → 255 K ; 4,2 K → −268,95 °C ≈ −269 °C (hélium liquide).' },
        { type: 'p', text: '**3.** La température traduit l’agitation des molécules d’air. Quand elle augmente, les molécules sont plus rapides : elles frappent les parois plus souvent et plus violemment. La force pressante par unité de surface, c’est-à-dire la pression, augmente.' },
      ],
    },
    {
      id: 'pc8-ex3',
      title: 'Plongée sous-marine',
      difficulty: 1,
      duration: 8,
      tags: ['statique des fluides'],
      statement: [
        { type: 'p', text: r`Un plongeur descend à 20 m sous la surface de la mer. $P_0 = 1{,}013\times10^{5}$ Pa ; $\rho_{mer} = 1{,}025\times10^{3}$ kg·m⁻³ ; $g = 9{,}81$ N·kg⁻¹.` },
        { type: 'list', ordered: true, items: [
          'Calculer la pression à 20 m de profondeur.',
          'Calculer la force pressante exercée par l’eau sur son masque, de surface 1,5 × 10² cm².',
          'À quelle profondeur la pression vaut-elle le double de la pression atmosphérique ?',
        ] },
      ],
      hints: [r`$P = P_0 + \rho g h$.`, '1 cm² = 10⁻⁴ m².', r`$2P_0 = P_0 + \rho g h$.`],
      solution: [
        { type: 'p', text: r`**1.** $P = 1{,}013\times10^{5} + 1\,025\times9{,}81\times20 = 1{,}013\times10^{5} + 2{,}01\times10^{5} = 3{,}02\times10^{5}$ Pa.` },
        { type: 'p', text: r`**2.** $S = 1{,}5\times10^{2}\times10^{-4} = 1{,}5\times10^{-2}$ m² ; $F = PS = 3{,}02\times10^{5}\times1{,}5\times10^{-2} = 4{,}5\times10^{3}$ N.` },
        { type: 'p', text: r`**3.** $\rho g h = P_0$ ⇒ $h = \dfrac{P_0}{\rho g} = \dfrac{1{,}013\times10^{5}}{1\,025\times9{,}81} = 10{,}1$ m.` },
      ],
    },
    {
      id: 'pc8-ex4',
      title: 'Hublot d’un sous-marin',
      difficulty: 2,
      duration: 12,
      tags: ['force pressante', 'résultante'],
      statement: [
        { type: 'p', text: r`Un sous-marin est immobile à 300 m de profondeur dans l’eau de mer ($\rho = 1{,}025\times10^{3}$ kg·m⁻³). À l’intérieur, l’air est maintenu à $P_0 = 1{,}013\times10^{5}$ Pa. Un hublot circulaire a un diamètre de 20,0 cm. $g = 9{,}81$ N·kg⁻¹.` },
        { type: 'list', ordered: true, items: [
          'Calculer la pression de l’eau au niveau du hublot.',
          'Calculer les forces pressantes exercées sur le hublot par l’eau puis par l’air intérieur.',
          'Caractériser la force pressante résultante. À quelle masse posée sur le hublot correspond-elle ?',
        ] },
      ],
      hints: [r`$S = \pi R^2$ avec $R = 0{,}100$ m.`, r`Résultante : $(P_{eau} - P_{air})S$.`],
      solution: [
        { type: 'p', text: r`**1.** $P_{eau} = 1{,}013\times10^{5} + 1\,025\times9{,}81\times300 = 3{,}12\times10^{6}$ Pa (environ 31 bar).` },
        { type: 'p', text: r`**2.** $S = \pi\times0{,}100^2 = 3{,}14\times10^{-2}$ m². $F_{eau} = 3{,}12\times10^{6}\times3{,}14\times10^{-2} = 9{,}80\times10^{4}$ N (vers l’intérieur) ; $F_{air} = 1{,}013\times10^{5}\times3{,}14\times10^{-2} = 3{,}18\times10^{3}$ N (vers l’extérieur).` },
        { type: 'p', text: r`**3.** Résultante : perpendiculaire au hublot, dirigée vers l’intérieur du sous-marin, $F = F_{eau} - F_{air} = 9{,}48\times10^{4}$ N. Elle équivaut au poids d’une masse $m = F/g = 9{,}7\times10^{3}$ kg, soit près de 10 tonnes : le hublot doit être très épais.` },
      ],
    },
    {
      id: 'pc8-ex5',
      title: 'Tester la loi de Mariotte',
      difficulty: 2,
      duration: 15,
      tags: ['Mariotte', 'exploitation de mesures'],
      statement: [
        { type: 'p', text: 'On enferme de l’air dans une seringue reliée à un capteur de pression. On réduit lentement le volume.' },
        { type: 'table', headers: ['V (mL)', '60,0', '50,0', '40,0', '30,0', '20,0'], rows: [['P (hPa)', '1 013', '1 216', '1 520', '2 026', '3 039']] },
        { type: 'list', ordered: true, items: [
          'Pourquoi doit-on réduire le volume lentement ? Quelle autre condition doit être respectée ?',
          'Montrer que ces mesures vérifient la loi de Mariotte.',
          'Quel graphe tracer pour obtenir une droite ? Quelle serait la valeur de son coefficient directeur ?',
          'Prévoir la pression pour V = 15,0 mL.',
        ] },
      ],
      hints: ['Calculer P × V pour chaque colonne.', 'P = cte × (1/V).'],
      solution: [
        { type: 'p', text: '**1.** Une compression rapide échauffe le gaz ; il faut opérer lentement pour que la température reste constante. La quantité de gaz doit aussi rester constante (pas de fuite).' },
        { type: 'p', text: '**2.** P × V vaut 60 780 ; 60 800 ; 60 800 ; 60 780 ; 60 780 hPa·mL : le produit est constant (écart < 0,1 %), la loi de Mariotte est vérifiée.' },
        { type: 'p', text: r`**3.** On trace $P$ en fonction de $1/V$ : droite passant par l’origine de coefficient directeur $PV \approx 6{,}08\times10^{4}$ hPa·mL.` },
        { type: 'p', text: r`**4.** $P = \dfrac{6{,}08\times10^{4}}{15{,}0} = 4{,}05\times10^{3}$ hPa $= 4{,}05\times10^{5}$ Pa.` },
      ],
    },
    {
      id: 'pc8-ex6',
      title: 'La bulle qui remonte',
      difficulty: 2,
      duration: 12,
      tags: ['Mariotte', 'statique des fluides'],
      statement: [
        { type: 'p', text: r`Un plongeur, dans un lac ($\rho = 1{,}00\times10^{3}$ kg·m⁻³), lâche à 30,0 m de profondeur une bulle d’air de volume 2,0 cm³. On suppose la température de l’eau uniforme. $P_0 = 1{,}013\times10^{5}$ Pa, $g = 9{,}81$ N·kg⁻¹.` },
        { type: 'list', ordered: true, items: [
          'Calculer la pression de l’eau à 30,0 m.',
          'Quelle loi permet de relier volume et pression de la bulle ? Justifier son utilisation.',
          'Calculer le volume de la bulle à la surface.',
          'Pourquoi un plongeur avec bouteille ne doit-il jamais remonter en bloquant sa respiration ?',
        ] },
      ],
      hints: ['La quantité d’air dans la bulle ne change pas.'],
      solution: [
        { type: 'p', text: r`**1.** $P = 1{,}013\times10^{5} + 1{,}00\times10^{3}\times9{,}81\times30{,}0 = 3{,}96\times10^{5}$ Pa.` },
        { type: 'p', text: '**2.** Loi de Mariotte : la quantité d’air est fixée et la température est constante.' },
        { type: 'p', text: r`**3.** $V_{surf} = \dfrac{P\,V}{P_0} = \dfrac{3{,}96\times10^{5}\times2{,}0}{1{,}013\times10^{5}} = 7{,}8$ cm³ : le volume est presque quadruplé.` },
        { type: 'p', text: '**4.** L’air de ses poumons, respiré sous pression en profondeur, se dilaterait de la même façon pendant la remontée : risque de surpression pulmonaire. Il doit expirer en remontant.' },
      ],
    },
    {
      id: 'pc8-ex7',
      title: 'Manomètre à tube en U',
      difficulty: 2,
      duration: 10,
      tags: ['manomètre', 'statique des fluides'],
      statement: [
        { type: 'p', text: r`Un ballon contenant un gaz est relié à un tube en U contenant de l’eau ($\rho = 1{,}00\times10^{3}$ kg·m⁻³), l’autre branche étant ouverte à l’air libre ($P_0 = 1{,}013\times10^{5}$ Pa). Le niveau de l’eau est plus haut de $h = 15{,}0$ cm dans la branche ouverte.` },
        { type: 'list', ordered: true, items: [
          'Le gaz est-il en surpression ou en dépression ? Justifier.',
          'Calculer la pression du gaz.',
          'Quelle dénivellation obtiendrait-on avec du mercure (ρ = 13 546 kg·m⁻³) ? Quel liquide est le plus adapté à de faibles écarts de pression ?',
        ] },
      ],
      hints: ['Deux points du même liquide à la même altitude ont la même pression.'],
      solution: [
        { type: 'p', text: '**1.** Le gaz repousse l’eau vers la branche ouverte : sa pression est supérieure à P₀, il est en surpression.' },
        { type: 'p', text: r`**2.** Au niveau de la surface de l’eau côté gaz (point M) et au même niveau dans l’autre branche (point N) : $P_M = P_N$. $P_{gaz} = P_M = P_0 + \rho g h = 1{,}013\times10^{5} + 1{,}00\times10^{3}\times9{,}81\times0{,}150 = 1{,}028\times10^{5}$ Pa.` },
        { type: 'p', text: r`**3.** $h' = \dfrac{\Delta P}{\rho_{Hg} g} = \dfrac{1{,}47\times10^{3}}{13\,546\times9{,}81} = 1{,}11\times10^{-2}$ m $= 1{,}11$ cm. L’eau donne une dénivellation 13,5 fois plus grande, donc plus facile à mesurer précisément : elle est mieux adaptée aux faibles écarts.` },
      ],
    },
    {
      id: 'pc8-ex8',
      title: 'Le paradoxe hydrostatique',
      difficulty: 2,
      duration: 10,
      tags: ['statique des fluides', 'raisonnement'],
      statement: [
        { type: 'p', text: 'Trois récipients de formes différentes (un cylindre étroit, un cylindre large, un vase évasé) ont un fond de même aire S = 50 cm² et sont remplis d’eau sur la même hauteur H = 20 cm.' },
        { type: 'list', ordered: true, items: [
          'Comparer les pressions au fond des trois récipients. Calculer leur valeur.',
          'Comparer les forces pressantes exercées par l’eau sur les fonds. Calculer leur valeur.',
          'Les masses d’eau sont pourtant différentes. Expliquer pourquoi ce n’est pas contradictoire.',
        ] },
      ],
      hints: ['La pression ne dépend que de la profondeur.', 'Les parois obliques exercent aussi des forces sur l’eau.'],
      solution: [
        { type: 'p', text: r`**1.** Même profondeur ⇒ même pression : $P = P_0 + \rho g H = 1{,}013\times10^{5} + 1{,}00\times10^{3}\times9{,}81\times0{,}20 = 1{,}033\times10^{5}$ Pa.` },
        { type: 'p', text: r`**2.** Même pression et même aire ⇒ même force : $F = PS = 1{,}033\times10^{5}\times50\times10^{-4} = 5{,}2\times10^{2}$ N (dont $P_0 S = 5{,}1\times10^{2}$ N dus à l’atmosphère).` },
        { type: 'p', text: '**3.** La force sur le fond n’est pas égale au poids de l’eau : les parois inclinées exercent elles aussi des forces sur le liquide (verticales en partie), qui supportent une partie du poids (vase évasé) ou poussent l’eau vers le bas (récipient se rétrécissant vers le haut).' },
      ],
    },
    {
      id: 'pc8-ex9',
      title: 'Type bac — Apnée et vérification expérimentale',
      difficulty: 3,
      duration: 30,
      tags: ['type bac', 'statique des fluides', 'Mariotte'],
      statement: [
        { type: 'p', text: '**Partie A — Tester la loi fondamentale de la statique des fluides.** Un capteur de pression est descendu dans une éprouvette d’eau salée. On mesure la pression P en fonction de la profondeur h.' },
        { type: 'table', headers: ['h (cm)', '0', '5,0', '10,0', '15,0', '20,0'], rows: [['P (hPa)', '1 013,0', '1 018,4', '1 023,8', '1 029,2', '1 034,6']] },
        { type: 'list', ordered: true, items: [
          'Écrire la loi fondamentale de la statique des fluides en fonction de P₀, ρ, g et h.',
          'Montrer que les mesures sont en accord avec cette loi.',
          'En déduire la masse volumique de l’eau salée.',
        ] },
        { type: 'p', text: r`**Partie B — L’apnéiste.** Un apnéiste remplit ses poumons à la surface ($V_0 = 6{,}0$ L d’air à $P_0 = 1{,}013\times10^{5}$ Pa) puis descend en mer ($\rho = 1{,}025\times10^{3}$ kg·m⁻³). On admet que l’air des poumons est à la pression de l’eau environnante et à température constante. $g = 9{,}81$ N·kg⁻¹.` },
        { type: 'list', ordered: true, items: [
          'Calculer la pression de l’eau à 10 m, 20 m et 30 m.',
          'En déduire le volume des poumons à ces trois profondeurs.',
          'Expliquer, à l’échelle microscopique, pourquoi la pression de l’air des poumons augmente quand leur volume diminue.',
          'Un capteur de profondeur de montre utilise la pression. Quelle profondeur indique-t-il si la pression mesurée vaut 5,04 × 10⁵ Pa ?',
        ] },
      ],
      hints: [
        'Calculer ΔP/Δh entre deux mesures successives.',
        r`Pente $= \rho g$ ; attention aux unités (hPa/cm → Pa/m).`,
        r`Mariotte : $V = P_0V_0/P$.`,
      ],
      solution: [
        { type: 'p', text: r`**A.1.** $P = P_0 + \rho g h$.` },
        { type: 'p', text: r`**A.2.** La pression augmente de 5,4 hPa tous les 5,0 cm : $P - P_0$ est proportionnelle à $h$. La courbe $P = f(h)$ est une droite d’ordonnée à l’origine $P_0 = 1\,013{,}0$ hPa : accord avec la loi.` },
        { type: 'p', text: r`**A.3.** Coefficient directeur : $\dfrac{5{,}4\ \text{hPa}}{5{,}0\ \text{cm}} = \dfrac{540\ \text{Pa}}{0{,}050\ \text{m}} = 1{,}08\times10^{4}$ Pa·m⁻¹ $= \rho g$. Donc $\rho = \dfrac{1{,}08\times10^{4}}{9{,}81} = 1{,}10\times10^{3}$ kg·m⁻³.` },
        { type: 'p', text: r`**B.1.** $P(10) = 1{,}013\times10^{5} + 1\,025\times9{,}81\times10 = 2{,}02\times10^{5}$ Pa ; $P(20) = 3{,}02\times10^{5}$ Pa ; $P(30) = 4{,}03\times10^{5}$ Pa.` },
        { type: 'p', text: r`**B.2.** $V = \dfrac{P_0V_0}{P}$ : à 10 m, $V = \dfrac{1{,}013\times10^{5}\times6{,}0}{2{,}02\times10^{5}} = 3{,}0$ L ; à 20 m, $2{,}0$ L ; à 30 m, $1{,}5$ L.` },
        { type: 'p', text: '**B.3.** Le même nombre de molécules occupe un volume plus petit : il y a plus de molécules par unité de volume, donc davantage de chocs sur une même surface de paroi par seconde. La pression augmente.' },
        { type: 'p', text: r`**B.4.** $h = \dfrac{P - P_0}{\rho g} = \dfrac{5{,}04\times10^{5} - 1{,}013\times10^{5}}{1\,025\times9{,}81} = 40{,}0$ m.` },
      ],
    },
  ],

  // =========================================================================
  representations: [
    {
      type: 'widget',
      id: 'fluid-pressure',
      props: { fluid: 'eau' },
      title: 'Pression et profondeur',
      caption: 'Faites varier la profondeur et le fluide : P = P₀ + ρgh. Testez aussi la loi de Mariotte.',
    },
    {
      type: 'widget',
      id: 'fluid-pressure',
      props: { fluid: 'mercure' },
      title: 'Avec du mercure',
      caption: 'Avec ρ = 13 546 kg·m⁻³, la pression augmente 13,5 fois plus vite qu’avec l’eau.',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      props: {
        expressions: ['1013 + r*9.81*x/100'],
        params: [{ name: 'r', min: 500, max: 14000, step: 100, value: 1000 }],
        xMin: 0,
        xMax: 30,
        yMin: 0,
        yMax: 5000,
        editable: true,
      },
      title: 'P (hPa) en fonction de la profondeur h (m)',
      caption: 'Droite de pente ρg : changez la masse volumique r (kg·m⁻³).',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      props: {
        expressions: ['c/x'],
        params: [{ name: 'c', min: 10000, max: 100000, step: 1000, value: 60800 }],
        xMin: 0,
        xMax: 80,
        yMin: 0,
        yMax: 5000,
        editable: true,
      },
      title: 'Loi de Mariotte : P (hPa) en fonction de V (mL)',
      caption: 'Hyperbole P = c/V : diviser V par 2 multiplie P par 2.',
    },
    { type: 'svg', svg: svgManometre, caption: 'Manomètre à tube en U.', maxWidth: 560 },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Une force de 50 N s’exerce uniformément sur une surface de 25 cm². La pression vaut :',
          choices: ['2,0 Pa', '2,0 × 10⁴ Pa', '1 250 Pa', '0,50 Pa'],
          answer: 1,
          explanation: 'P = 50 / (25 × 10⁻⁴) = 2,0 × 10⁴ Pa.',
        },
        {
          question: 'À température constante, on divise le volume d’un gaz par 3. Sa pression est :',
          choices: ['divisée par 3', 'inchangée', 'multipliée par 3', 'multipliée par 9'],
          answer: 2,
          explanation: 'PV = cte.',
        },
        {
          question: 'Dans l’eau, la pression augmente d’environ 1 bar tous les :',
          choices: ['1 m', '10 m', '100 m', '1 000 m'],
          answer: 1,
          explanation: 'ρgh = 1 000 × 9,81 × 10 ≈ 10⁵ Pa = 1 bar.',
        },
        {
          question: '0 °C correspond à :',
          choices: ['0 K', '273,15 K', '−273,15 K', '100 K'],
          answer: 1,
        },
        {
          question: 'La force pressante exercée par un fluide sur une paroi est :',
          choices: ['parallèle à la paroi', 'perpendiculaire à la paroi, du fluide vers la paroi', 'toujours verticale', 'perpendiculaire à la paroi, de la paroi vers le fluide'],
          answer: 1,
        },
        {
          question: 'Deux points d’un même liquide au repos ont la même pression s’ils sont :',
          choices: ['sur la même verticale', 'à la même altitude', 'à la même distance des parois', 'jamais'],
          answer: 1,
        },
        {
          question: 'À l’échelle microscopique, la pression d’un gaz est due :',
          choices: ['au poids des molécules', 'aux chocs des molécules sur les parois', 'à l’attraction entre molécules', 'à la couleur du gaz'],
          answer: 1,
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Masse volumique', back: r`$\rho = m/V$ en kg·m⁻³` },
        { front: 'Pression', back: r`$P = F/S$ en Pa (N·m⁻²)` },
        { front: '1 bar = ?', back: r`$10^{5}$ Pa` },
        { front: 'Pression atmosphérique normale', back: r`$1{,}013\times10^{5}$ Pa = 1 013 hPa` },
        { front: 'Température absolue', back: r`$T(\text{K}) = \theta(°\text{C}) + 273{,}15$` },
        { front: 'Loi de Mariotte', back: r`$PV = $ cte (n et T fixés)` },
        { front: 'Loi fondamentale de la statique des fluides', back: r`$P_B - P_A = \rho g (z_A - z_B)$, axe z vers le haut` },
        { front: 'Pression à la profondeur h', back: r`$P = P_0 + \rho g h$` },
        { front: 'Caractéristiques d’une force pressante', back: 'Perpendiculaire à la paroi, du fluide vers la paroi, F = P × S' },
        { front: 'Interprétation microscopique de la température', back: 'Agitation thermique (vitesse moyenne des entités)' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'Un fluide au repos exerce sur une paroi une force {{pressante}} perpendiculaire à celle-ci. Sa valeur est égale au produit de la {{pression}} par la {{surface|aire}}. Dans un liquide, la pression augmente {{linéairement|lineairement|proportionnellement}} avec la profondeur. Pour un gaz à température constante, le produit P × V est {{constant}} : c’est la loi de {{Mariotte|Boyle-Mariotte}}.',
    },
    {
      type: 'matching',
      title: 'Associer chaque grandeur à son instrument ou à son unité',
      pairs: [
        { left: 'Pression atmosphérique', right: 'baromètre' },
        { left: 'Surpression d’un pneu', right: 'manomètre' },
        { left: 'Température absolue', right: 'kelvin' },
        { left: 'Masse volumique', right: 'kg·m⁻³' },
        { left: 'Force pressante', right: 'newton' },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'La pression au fond d’un récipient dépend de la quantité de liquide qu’il contient.', answer: false, explanation: 'Elle ne dépend que de la hauteur de liquide (et de ρ, g, P₀).' },
        { text: 'Un liquide est quasi incompressible.', answer: true },
        { text: 'La loi de Mariotte s’applique à un gaz qu’on chauffe.', answer: false, explanation: 'Elle suppose T constante.' },
        { text: 'À 10 m sous l’eau, la pression absolue est d’environ 2 bar.', answer: true, explanation: '1 bar (atmosphère) + 1 bar (colonne d’eau).' },
      ],
    },
  ],
}

export default chapter
