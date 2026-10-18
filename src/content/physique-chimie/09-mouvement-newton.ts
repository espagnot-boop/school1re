import type { Chapter } from '../types'

const r = String.raw

// ---------------------------------------------------------------------------
// Schémas SVG
// ---------------------------------------------------------------------------

// Chronophotographie d'un lancer horizontal : M_i = (40 + 65 i ; 30 + 6 i²)
const svgChrono = `<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <defs>
    <marker id="pc9-v" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(217 91% 60%)"/></marker>
    <marker id="pc9-d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(0 84% 60%)"/></marker>
  </defs>
  <path d="M40,30 Q235,30 430,246" fill="none" stroke="currentColor" class="svg-muted" stroke-dasharray="3 4"/>
  <g fill="currentColor" class="svg-fill">
    <circle cx="40" cy="30" r="4"/><circle cx="105" cy="36" r="4"/><circle cx="170" cy="54" r="4"/>
    <circle cx="235" cy="84" r="4"/><circle cx="300" cy="126" r="4"/><circle cx="365" cy="180" r="4"/><circle cx="430" cy="246" r="4"/>
  </g>
  <g class="svg-fill" font-size="12">
    <text x="34" y="20">M₀</text><text x="99" y="26">M₁</text><text x="160" y="46">M₂</text>
    <text x="218" y="78">M₃</text><text x="304" y="118">M₄</text><text x="372" y="176">M₅</text><text x="438" y="246">M₆</text>
  </g>
  <line x1="235" y1="84" x2="300" y2="120" stroke="hsl(217 91% 60%)" stroke-width="2" marker-end="url(#pc9-v)"/>
  <text x="246" y="122" fill="hsl(217 91% 60%)">v₃</text>
  <line x1="365" y1="180" x2="430" y2="240" stroke="hsl(217 91% 60%)" stroke-width="2" marker-end="url(#pc9-v)"/>
  <text x="404" y="200" fill="hsl(217 91% 60%)">v₅</text>
  <line x1="300" y1="126" x2="365" y2="162" stroke="hsl(217 91% 60%)" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#pc9-v)"/>
  <text x="300" y="106" fill="hsl(217 91% 60%)" font-size="11">v₃ reporté en M₄</text>
  <line x1="300" y1="126" x2="365" y2="186" stroke="hsl(217 91% 60%)" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#pc9-v)"/>
  <text x="268" y="176" fill="hsl(217 91% 60%)" font-size="11">v₅ reporté</text>
  <line x1="365" y1="162" x2="365" y2="186" stroke="hsl(0 84% 60%)" stroke-width="2.5" marker-end="url(#pc9-d)"/>
  <text x="372" y="160" fill="hsl(0 84% 60%)" font-weight="600">Δv₄</text>
  <text x="20" y="270" class="svg-fill">Δv₄ = v₅ − v₃ : vertical, vers le bas,</text>
  <text x="20" y="288" class="svg-fill">même direction et même sens que le poids P = m g</text>
</svg>`

const svgBilan = `<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <defs>
    <marker id="pc9-f1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(142 71% 45%)"/></marker>
    <marker id="pc9-f2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(25 95% 53%)"/></marker>
    <marker id="pc9-f3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(263 70% 60%)"/></marker>
    <marker id="pc9-f4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(217 91% 60%)"/></marker>
  </defs>
  <line x1="20" y1="150" x2="500" y2="150" stroke="currentColor" class="svg-stroke" stroke-width="2"/>
  <g stroke="currentColor" class="svg-muted" stroke-width="1">
    <line x1="40" y1="150" x2="30" y2="162"/><line x1="80" y1="150" x2="70" y2="162"/><line x1="120" y1="150" x2="110" y2="162"/><line x1="160" y1="150" x2="150" y2="162"/><line x1="200" y1="150" x2="190" y2="162"/><line x1="240" y1="150" x2="230" y2="162"/><line x1="280" y1="150" x2="270" y2="162"/><line x1="320" y1="150" x2="310" y2="162"/><line x1="360" y1="150" x2="350" y2="162"/><line x1="400" y1="150" x2="390" y2="162"/><line x1="440" y1="150" x2="430" y2="162"/><line x1="480" y1="150" x2="470" y2="162"/>
  </g>
  <rect x="200" y="125" width="80" height="25" fill="none" stroke="currentColor" class="svg-stroke" stroke-width="2"/>
  <circle cx="240" cy="137" r="3" fill="currentColor" class="svg-fill"/>
  <text x="246" y="134" class="svg-fill" font-size="11">G</text>
  <line x1="240" y1="137" x2="240" y2="207" stroke="hsl(142 71% 45%)" stroke-width="2.5" marker-end="url(#pc9-f1)"/>
  <text x="248" y="200" fill="hsl(142 71% 45%)">P</text>
  <line x1="240" y1="137" x2="240" y2="67" stroke="hsl(25 95% 53%)" stroke-width="2.5" marker-end="url(#pc9-f2)"/>
  <text x="248" y="78" fill="hsl(25 95% 53%)">R_N</text>
  <line x1="240" y1="137" x2="185" y2="137" stroke="hsl(263 70% 60%)" stroke-width="2.5" marker-end="url(#pc9-f3)"/>
  <text x="160" y="128" fill="hsl(263 70% 60%)">f</text>
  <line x1="300" y1="100" x2="380" y2="100" stroke="hsl(217 91% 60%)" stroke-width="2" marker-end="url(#pc9-f4)"/>
  <text x="310" y="92" fill="hsl(217 91% 60%)">sens du mouvement (v)</text>
  <text x="20" y="30" class="svg-fill" font-weight="600">Palet glissant sur la glace</text>
  <text x="20" y="50" class="svg-muted" fill="currentColor" font-size="11">P + R_N = 0 ; ΣF = f, opposée à v : Δv opposé à v, le palet ralentit</text>
</svg>`

const svgCas = `<svg viewBox="0 0 540 200" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <defs>
    <marker id="pc9-cv" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(217 91% 60%)"/></marker>
    <marker id="pc9-cf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(0 84% 60%)"/></marker>
  </defs>
  <g class="svg-fill" fill="currentColor">
    <circle cx="20" cy="60" r="3"/><circle cx="50" cy="60" r="3"/><circle cx="80" cy="60" r="3"/><circle cx="110" cy="60" r="3"/><circle cx="140" cy="60" r="3"/>
    <circle cx="200" cy="60" r="3"/><circle cx="210" cy="60" r="3"/><circle cx="228" cy="60" r="3"/><circle cx="254" cy="60" r="3"/><circle cx="288" cy="60" r="3"/><circle cx="330" cy="60" r="3"/>
    <circle cx="380" cy="60" r="3"/><circle cx="422" cy="60" r="3"/><circle cx="456" cy="60" r="3"/><circle cx="482" cy="60" r="3"/><circle cx="500" cy="60" r="3"/><circle cx="510" cy="60" r="3"/>
  </g>
  <line x1="80" y1="60" x2="110" y2="60" stroke="hsl(217 91% 60%)" stroke-width="2" marker-end="url(#pc9-cv)"/>
  <text x="80" y="100" text-anchor="middle" class="svg-fill">Δv = 0 ⇒ ΣF = 0</text>
  <text x="80" y="118" text-anchor="middle" class="svg-muted" fill="currentColor" font-size="11">rectiligne uniforme</text>
  <line x1="254" y1="60" x2="286" y2="60" stroke="hsl(217 91% 60%)" stroke-width="2" marker-end="url(#pc9-cv)"/>
  <line x1="254" y1="75" x2="274" y2="75" stroke="hsl(0 84% 60%)" stroke-width="2.5" marker-end="url(#pc9-cf)"/>
  <text x="265" y="100" text-anchor="middle" class="svg-fill">Δv et ΣF dans le sens de v</text>
  <text x="265" y="118" text-anchor="middle" class="svg-muted" fill="currentColor" font-size="11">rectiligne accéléré</text>
  <line x1="456" y1="60" x2="480" y2="60" stroke="hsl(217 91% 60%)" stroke-width="2" marker-end="url(#pc9-cv)"/>
  <line x1="456" y1="75" x2="436" y2="75" stroke="hsl(0 84% 60%)" stroke-width="2.5" marker-end="url(#pc9-cf)"/>
  <text x="450" y="100" text-anchor="middle" class="svg-fill">Δv et ΣF opposés à v</text>
  <text x="450" y="118" text-anchor="middle" class="svg-muted" fill="currentColor" font-size="11">rectiligne ralenti</text>
  <text x="270" y="160" text-anchor="middle" class="svg-fill">Dans tous les cas : Δv a la direction et le sens de ΣF</text>
  <text x="270" y="180" text-anchor="middle" class="svg-muted" fill="currentColor" font-size="11">(mouvement curviligne : ΣF « tourne » le vecteur vitesse vers l’intérieur de la courbe)</text>
</svg>`

// ---------------------------------------------------------------------------

const pythonCode = `import matplotlib.pyplot as plt

tau = 0.050          # durée entre deux images (s)
m = 0.10             # masse de la balle (kg)
# Positions relevées par pointage (m)
x = [0.000, 0.075, 0.150, 0.225, 0.300, 0.375, 0.450, 0.525]
y = [0.600, 0.588, 0.551, 0.490, 0.404, 0.293, 0.159, -0.001]

# Vitesses (formule centrée) aux points 1 à n-2
vx, vy = [0.0] * len(x), [0.0] * len(x)
for i in range(1, len(x) - 1):
    vx[i] = (x[i + 1] - x[i - 1]) / (2 * tau)
    vy[i] = (y[i + 1] - y[i - 1]) / (2 * tau)

# Variations de vitesse aux points 2 à n-3, et m*Δv/Δt
for i in range(2, len(x) - 2):
    dvx = vx[i + 1] - vx[i - 1]
    dvy = vy[i + 1] - vy[i - 1]
    Fx, Fy = m * dvx / (2 * tau), m * dvy / (2 * tau)
    print(f"point {i} : m*Δv/Δt = ({Fx:.2f} ; {Fy:.2f}) N")
    plt.quiver(x[i], y[i], dvx, dvy, color="red", angles="xy", scale_units="xy", scale=2)
    plt.quiver(x[i], y[i], vx[i], vy[i], color="blue", angles="xy", scale_units="xy", scale=10)

plt.plot(x, y, "ko")
plt.axis("equal")
plt.title("Vecteurs vitesse (bleu) et variation de vitesse (rouge)")
plt.show()`

// ---------------------------------------------------------------------------

const chapter: Chapter = {
  id: 'mouvement-newton',
  subject: 'physique-chimie',
  order: 9,
  title: 'Mouvement d’un système',
  theme: 'Mouvement et interactions',
  summary:
    'Vecteur vitesse et sa variation, principe d’inertie, relation approchée ΣF ≈ m·Δv/Δt, exploitation de chronophotographies, chute libre et traitement Python.',
  duration: '2 à 3 semaines',
  objectives: [
    'Décrire le mouvement d’un système modélisé par un point matériel : vecteur position, vecteur vitesse.',
    'Construire le vecteur vitesse et le vecteur variation de vitesse à partir d’une chronophotographie ou d’une vidéo.',
    'Utiliser la relation approchée $\\sum\\vec F \\approx m\\,\\dfrac{\\Delta\\vec v}{\\Delta t}$ pour estimer une variation de vitesse (forces connues) ou les forces (mouvement connu).',
    'Connaître et exploiter le principe d’inertie et sa contraposée.',
    'Expliquer le rôle de la masse dans la variation du vecteur vitesse.',
    'Utiliser un langage de programmation (Python) pour étudier la relation entre variation du vecteur vitesse et somme des forces.',
  ],
  keywords: ['vecteur vitesse', 'variation de vitesse', 'principe d’inertie', 'deuxième loi de Newton', 'chronophotographie', 'chute libre', 'référentiel', 'Python'],

  // =========================================================================
  fiche: [
    { type: 'h2', text: 'Décrire un mouvement' },
    {
      type: 'list',
      items: [
        '**Système** modélisé par un **point matériel** M ; mouvement étudié dans un **référentiel** (terrestre, géocentrique, héliocentrique).',
        r`**Vecteur vitesse** à la date $t_i$ (chronophotographie de durée $\tau$ entre deux images) : $\vec v_i \approx \dfrac{\overrightarrow{M_{i-1}M_{i+1}}}{2\tau}$ (ou, plus simplement, $\dfrac{\overrightarrow{M_iM_{i+1}}}{\tau}$). Tangent à la trajectoire, dans le sens du mouvement, en m·s⁻¹.`,
        r`**Vecteur variation de vitesse** : $\Delta\vec v_i = \vec v_{i+1} - \vec v_{i-1}$ entre $t_{i-1}$ et $t_{i+1}$ ($\Delta t = 2\tau$).`,
      ],
    },
    { type: 'h2', text: 'Lois du mouvement' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Principe d’inertie (1ʳᵉ loi de Newton)',
      content: [
        { type: 'p', text: r`Dans un référentiel galiléen, si $\sum\vec F = \vec 0$ (forces qui se compensent), alors le système est **immobile** ou en **mouvement rectiligne uniforme** ($\Delta\vec v = \vec 0$), et réciproquement.` },
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Relation approchée (2ᵉ loi de Newton)',
      content: [
        { type: 'math', tex: r`\sum\vec F \approx m\,\frac{\Delta\vec v}{\Delta t}` },
        { type: 'p', text: r`$\Delta\vec v$ a la **même direction** et le **même sens** que $\sum\vec F$. Pour une même force, plus la masse est grande, plus la variation de vitesse est faible (inertie).` },
      ],
    },
    {
      type: 'table',
      headers: ['Mouvement', 'Δv', 'Somme des forces'],
      rows: [
        ['Immobile ou rectiligne uniforme', r`$\vec 0$`, 'nulle (forces compensées)'],
        ['Rectiligne accéléré', 'même sens que v', 'dans le sens du mouvement'],
        ['Rectiligne ralenti', 'sens opposé à v', 'opposée au mouvement'],
        ['Curviligne', 'vers l’intérieur de la courbe', 'non nulle, vers l’intérieur'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Chute libre',
      content: [
        { type: 'p', text: r`Seul le poids agit : $m\dfrac{\Delta\vec v}{\Delta t} = m\vec g$ ⇒ $\Delta\vec v = \vec g\,\Delta t$, **vertical vers le bas**, indépendant de la masse ; $g = 9{,}81$ m·s⁻² : la vitesse verticale augmente de 9,81 m·s⁻¹ chaque seconde.` },
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
            'Une vitesse constante en valeur n’implique pas Δv = 0 : dans un virage, la **direction** change.',
            'Le vecteur vitesse n’a pas forcément le sens de la force : c’est Δv qui l’a.',
            'Mesurer les distances réelles grâce à l’**échelle** de la chronophotographie.',
          ],
        },
      ],
    },
  ],

  // =========================================================================
  cours: [
    { type: 'h2', text: '1. Décrire le mouvement d’un système' },
    { type: 'h3', text: '1.1 Système, point matériel, référentiel' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Système', value: 'objet ou ensemble d’objets dont on étudie le mouvement.' },
        { key: 'Point matériel', value: 'modélisation du système par un point (en général son centre de masse G), auquel on attribue la masse du système.' },
        { key: 'Référentiel', value: 'objet de référence par rapport auquel on décrit le mouvement, muni d’un repère d’espace et d’une horloge.' },
        { key: 'Trajectoire', value: 'ensemble des positions successives occupées par le point au cours du temps.' },
      ],
    },
    {
      type: 'p',
      text: 'Le mouvement est **relatif** : il dépend du référentiel. Le **référentiel terrestre** (lié au sol) convient pour les mouvements de courte durée au voisinage de la Terre ; le **référentiel géocentrique** pour les satellites ; le **référentiel héliocentrique** pour les planètes. Ces référentiels sont considérés comme **galiléens** (ceux où le principe d’inertie est vérifié) pour les durées étudiées.',
    },
    { type: 'h3', text: '1.2 Vecteur position et vecteur vitesse' },
    {
      type: 'p',
      text: r`Dans un repère $(O ; \vec i, \vec j)$, la position du point M est repérée par le **vecteur position** $\overrightarrow{OM} = x\,\vec i + y\,\vec j$.`,
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Vecteur vitesse moyen et instantané',
      content: [
        {
          type: 'p',
          text: r`Entre deux positions voisines $M_i$ (date $t_i$) et $M_{i+1}$ (date $t_{i+1} = t_i + \tau$), le vecteur vitesse moyen est $\dfrac{\overrightarrow{M_iM_{i+1}}}{\tau}$. Pour $\tau$ très petit, il tend vers le **vecteur vitesse instantané** $\vec v$.`,
        },
        {
          type: 'p',
          text: r`Sur une chronophotographie, on obtient une meilleure estimation de $\vec v_i$ **au point** $M_i$ avec la formule centrée :`,
        },
        { type: 'math', tex: r`\vec v_i \approx \frac{\overrightarrow{M_{i-1}M_{i+1}}}{2\tau} \qquad v_i \approx \frac{M_{i-1}M_{i+1}}{2\tau}` },
      ],
    },
    {
      type: 'list',
      items: [
        '**Point d’application** : le point M_i ;',
        '**Direction** : tangente à la trajectoire en M_i (pratiquement parallèle à la corde M_{i−1}M_{i+1}) ;',
        '**Sens** : celui du mouvement ;',
        '**Valeur** : en m·s⁻¹ ; représentée avec une échelle (ex. 1 cm ↔ 0,5 m·s⁻¹).',
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        {
          type: 'p',
          text: r`Chronophotographie avec $\tau = 40$ ms ; on mesure $M_2M_4 = 4{,}8$ cm (en distance réelle). $v_3 = \dfrac{4{,}8\times10^{-2}}{2\times0{,}040} = 0{,}60$ m·s⁻¹.`,
        },
      ],
    },
    { type: 'h3', text: '1.3 Vecteur variation de vitesse' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Variation du vecteur vitesse',
      content: [
        { type: 'p', text: r`Entre les dates $t_{i-1}$ et $t_{i+1}$, la variation du vecteur vitesse, représentée au point $M_i$, est :` },
        { type: 'math', tex: r`\Delta\vec v_i = \vec v_{i+1} - \vec v_{i-1} \qquad \Delta t = t_{i+1} - t_{i-1} = 2\tau` },
        { type: 'p', text: r`(On rencontre aussi $\Delta\vec v_i = \vec v_{i+1} - \vec v_i$ avec $\Delta t = \tau$ : l’essentiel est d’être cohérent.)` },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Tracer les vecteurs vitesse', text: r`Construire $\vec v_{i-1}$ et $\vec v_{i+1}$ avec une échelle choisie.` },
        { title: 'Reporter', text: r`Reporter ces deux vecteurs à partir du même point $M_i$ (translation, sans changer direction, sens ni longueur).` },
        { title: 'Construire la différence', text: r`$\Delta\vec v_i$ va de l’extrémité de $\vec v_{i-1}$ à l’extrémité de $\vec v_{i+1}$ (car $\vec v_{i-1} + \Delta\vec v_i = \vec v_{i+1}$).` },
        { title: 'Mesurer', text: 'Mesurer la longueur de Δv et la convertir avec l’échelle des vitesses.' },
      ],
    },
    { type: 'svg', svg: svgChrono, caption: 'Chronophotographie d’un lancer horizontal : vecteurs vitesse et construction de Δv.', maxWidth: 560 },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Lire un mouvement sur une chronophotographie',
      content: [
        {
          type: 'list',
          items: [
            'Points alignés et régulièrement espacés : mouvement **rectiligne uniforme**.',
            'Points alignés, espacements croissants : rectiligne **accéléré** ; décroissants : **ralenti**.',
            'Trajectoire courbe : mouvement **curviligne** (circulaire si arc de cercle).',
          ],
        },
      ],
    },

    { type: 'h2', text: '2. Forces et principe d’inertie' },
    {
      type: 'p',
      text: 'Une **force** modélise une action mécanique exercée sur le système. On la représente par un vecteur (point d’application, direction, sens, valeur en newton). Le **bilan des forces** consiste à recenser toutes les actions extérieures exercées sur le système.',
    },
    {
      type: 'table',
      headers: ['Force', 'Direction et sens', 'Valeur'],
      rows: [
        [r`Poids $\vec P$`, 'verticale, vers le bas', r`$P = mg$`],
        [r`Réaction normale $\vec R_N$ d’un support`, 'perpendiculaire au support, vers le système', 'déterminée par le mouvement'],
        [r`Frottements $\vec f$`, 'opposée au mouvement (vitesse relative)', 'dépend de la vitesse, des surfaces…'],
        [r`Tension $\vec T$ d’un fil`, 'le long du fil, vers le point d’attache', 'déterminée par le mouvement'],
        [r`Force électrique $q\vec E$, force pressante, poussée…`, 'voir chapitres précédents', ''],
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Principe d’inertie',
      content: [
        {
          type: 'p',
          text: r`Dans un référentiel galiléen, si les forces qui s’exercent sur un système se compensent ($\sum\vec F = \vec 0$), ou s’il n’est soumis à aucune force, alors il est **immobile** ou en **mouvement rectiligne uniforme**. Réciproquement, si le système est immobile ou en mouvement rectiligne uniforme, les forces qui s’exercent sur lui se compensent.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Contraposée',
      content: [
        {
          type: 'p',
          text: r`Si le vecteur vitesse varie (en valeur **ou** en direction), alors $\sum\vec F \neq \vec 0$ : les forces ne se compensent pas.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples',
      content: [
        {
          type: 'list',
          items: [
            'Un palet sur une table à coussin d’air horizontale, une fois lancé : poids et réaction de l’air se compensent ⇒ mouvement rectiligne uniforme.',
            'Un parachutiste à vitesse constante (vitesse limite) en ligne droite : poids et force de frottement de l’air se compensent.',
            'Une voiture qui prend un virage à 50 km/h : la direction de v change, donc les forces ne se compensent pas.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'De Galilée à Newton',
      content: [
        {
          type: 'p',
          text: 'Aristote pensait qu’un mouvement nécessite une force permanente. Galilée (début du XVIIᵉ siècle), en étudiant des billes sur des plans inclinés, comprend qu’en l’absence de frottements un corps garde sa vitesse. Newton formule le principe d’inertie et la deuxième loi dans les *Principia* (1687).',
        },
      ],
    },

    { type: 'h2', text: '3. Lien entre variation de vitesse et forces' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Relation approchée de la deuxième loi de Newton',
      content: [
        {
          type: 'p',
          text: r`Dans un référentiel galiléen, pour un système de masse $m$ (constante) modélisé par un point matériel, la somme des forces appliquées et la variation du vecteur vitesse entre deux instants voisins sont liées par :`,
        },
        { type: 'math', tex: r`\sum\vec F \approx m\,\frac{\Delta\vec v}{\Delta t}` },
        { type: 'p', text: r`$F$ en N, $m$ en kg, $\Delta v$ en m·s⁻¹, $\Delta t$ en s. L’approximation est d’autant meilleure que $\Delta t$ est petit.` },
      ],
    },
    {
      type: 'list',
      items: [
        r`$\Delta\vec v$ et $\sum\vec F$ ont **même direction** et **même sens**.`,
        r`Pour une force donnée, $\Delta v$ est **inversement proportionnelle à la masse** : un objet massif est plus difficile à mettre en mouvement, à arrêter ou à dévier (c’est l’**inertie**).`,
        r`Pour un intervalle $\Delta t$ donné, $\Delta v$ est proportionnelle à la force.`,
        r`Si $\sum\vec F = \vec 0$, alors $\Delta\vec v = \vec 0$ : on retrouve le principe d’inertie.`,
      ],
    },
    { type: 'svg', svg: svgCas, caption: 'Relation entre le sens de la somme des forces et la variation de vitesse.', maxWidth: 560 },
    { type: 'h3', text: 'Deux usages de la relation' },
    {
      type: 'grid',
      columns: 2,
      items: [
        {
          title: 'Forces connues → prévoir Δv',
          text: 'Δv ≈ (ΣF/m) Δt. Ex. : une voiture de 1 200 kg soumise à ΣF = 3,0 × 10³ N vers l’avant pendant 0,50 s gagne Δv ≈ 1,3 m·s⁻¹.',
          icon: 'ArrowRight',
        },
        {
          title: 'Mouvement connu → estimer ΣF',
          text: 'ΣF ≈ m Δv/Δt. Ex. : un ballon de 0,45 kg passant de 0 à 25 m·s⁻¹ en 10 ms subit une force moyenne d’environ 1,1 × 10³ N.',
          icon: 'ArrowLeft',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé : freinage',
      content: [
        {
          type: 'p',
          text: r`Un cycliste et son vélo ($m = 80$ kg) roulent en ligne droite. En freinant, sa vitesse passe de $8{,}0$ m·s⁻¹ à $5{,}0$ m·s⁻¹ en $1{,}5$ s. Somme des forces (supposée constante) : $\sum F \approx m\dfrac{|\Delta v|}{\Delta t} = 80\times\dfrac{3{,}0}{1{,}5} = 1{,}6\times10^{2}$ N, dirigée **vers l’arrière** (même sens que $\Delta\vec v$, opposé au mouvement).`,
        },
      ],
    },

    { type: 'h2', text: '4. Application : la chute libre' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Chute libre',
      content: [
        { type: 'p', text: 'Un système est en **chute libre** lorsqu’il n’est soumis qu’à son poids (frottements et poussée d’Archimède négligeables).' },
      ],
    },
    { type: 'math', tex: r`m\,\frac{\Delta\vec v}{\Delta t} \approx m\,\vec g \quad\Longrightarrow\quad \Delta\vec v \approx \vec g\,\Delta t` },
    {
      type: 'list',
      items: [
        r`$\Delta\vec v$ est **vertical, vers le bas**, de valeur $g\,\Delta t$ : la composante verticale de la vitesse diminue de 9,81 m·s⁻¹ par seconde (axe vers le haut).`,
        'La composante **horizontale** de la vitesse ne varie pas.',
        'Le mouvement ne dépend **pas de la masse** : dans le vide, une plume et un marteau tombent ensemble (expérience de David Scott sur la Lune, 1971).',
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : lancer horizontal',
      content: [
        {
          type: 'p',
          text: r`Une bille est lancée horizontalement à $v_0 = 3{,}0$ m·s⁻¹. Après $0{,}40$ s de chute libre : $v_x = 3{,}0$ m·s⁻¹ (inchangée) et $v_y = -9{,}81\times0{,}40 = -3{,}9$ m·s⁻¹. Valeur : $v = \sqrt{3{,}0^2 + 3{,}9^2} = 4{,}9$ m·s⁻¹.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Quand la chute n’est pas libre',
      content: [
        {
          type: 'p',
          text: 'Avec des frottements de l’air, la force de frottement augmente avec la vitesse. Quand elle compense le poids, Δv devient nul : l’objet atteint une **vitesse limite** (mouvement rectiligne uniforme, principe d’inertie). Un parachutiste en chute atteint environ 200 km/h avant ouverture.',
        },
      ],
    },

    { type: 'h2', text: '5. Exploiter une chronophotographie ou une vidéo' },
    {
      type: 'steps',
      items: [
        { title: 'Acquérir', text: 'Filmer le mouvement (caméra fixe, perpendiculaire au plan du mouvement) avec un objet étalon de longueur connue.' },
        { title: 'Pointer', text: 'Avec un logiciel de pointage (ou à la main), relever les positions (x ; y) à intervalles τ réguliers, après avoir défini l’échelle et l’origine.' },
        { title: 'Calculer les vitesses', text: r`$v_{x,i} = \dfrac{x_{i+1} - x_{i-1}}{2\tau}$, $v_{y,i} = \dfrac{y_{i+1} - y_{i-1}}{2\tau}$.` },
        { title: 'Calculer les variations', text: r`$\Delta v_{x,i} = v_{x,i+1} - v_{x,i-1}$, idem pour $y$ ; puis $m\dfrac{\Delta\vec v}{2\tau}$.` },
        { title: 'Comparer', text: 'Comparer m Δv/Δt (direction, sens, valeur) à la somme des forces attendue ; calculer un écart relatif.' },
      ],
    },
    { type: 'h2', text: '6. Utiliser Python' },
    {
      type: 'p',
      text: 'Le programme ci-dessous calcule les vecteurs vitesse et variation de vitesse d’une balle de 0,10 kg dont les positions ont été pointées toutes les 50 ms, puis affiche m·Δv/Δt pour le comparer au poids $P = mg = 0{,}98$ N.',
    },
    { type: 'code', lang: 'python', code: pythonCode, caption: 'Étude d’une chronophotographie avec Python' },
    {
      type: 'p',
      text: r`Résultat attendu : pour chaque point, $m\Delta v_x/\Delta t \approx 0$ et $m\Delta v_y/\Delta t \approx -0{,}98$ N. La somme des forces se réduit au poids : la balle est en chute libre.`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'À savoir faire en Python',
      content: [
        {
          type: 'list',
          items: [
            'Parcourir une liste avec `for i in range(1, len(x) - 1)` pour éviter les bords (pas de point avant le premier ni après le dernier).',
            'Tracer un vecteur avec `plt.quiver(x0, y0, dx, dy, angles="xy", scale_units="xy", scale=k)`.',
            'Afficher un résultat formaté avec `print(f"{valeur:.2f}")`.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Rédiger une réponse sur le mouvement',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Préciser le **système** et le **référentiel** (supposé galiléen).',
            'Faire le **bilan des forces** avec un schéma.',
            r`Écrire la relation $\sum\vec F \approx m\Delta\vec v/\Delta t$ (ou le principe d’inertie).`,
            'Exploiter : direction et sens, puis valeur numérique avec unité et chiffres significatifs.',
          ],
        },
      ],
    },
  ],

  // =========================================================================
  exercices: [
    {
      id: 'pc9-ex1',
      title: 'Vitesse sur une chronophotographie',
      difficulty: 1,
      duration: 8,
      tags: ['vecteur vitesse', 'chronophotographie'],
      statement: [
        { type: 'p', text: 'Sur une chronophotographie d’un palet glissant sur une table horizontale, les positions sont enregistrées toutes les τ = 40 ms. Les points sont alignés et on mesure, en distances réelles : M₁M₃ = 4,8 cm et M₄M₆ = 4,8 cm.' },
        { type: 'list', ordered: true, items: [
          'Calculer la valeur de la vitesse aux points M₂ et M₅.',
          'Quelle est la nature du mouvement ?',
          'Que peut-on en déduire sur les forces exercées sur le palet ?',
        ] },
      ],
      hints: [r`$v_i = \dfrac{M_{i-1}M_{i+1}}{2\tau}$.`],
      solution: [
        { type: 'p', text: r`**1.** $v_2 = \dfrac{4{,}8\times10^{-2}}{2\times0{,}040} = 0{,}60$ m·s⁻¹ ; de même $v_5 = 0{,}60$ m·s⁻¹.` },
        { type: 'p', text: '**2.** Trajectoire rectiligne et vitesse constante : mouvement **rectiligne uniforme**.' },
        { type: 'p', text: '**3.** D’après le principe d’inertie (référentiel terrestre supposé galiléen), les forces qui s’exercent sur le palet se compensent : le poids est compensé par la réaction de la table (ou de l’air pour une table à coussin d’air) et les frottements sont négligeables.' },
      ],
    },
    {
      id: 'pc9-ex2',
      title: 'Principe d’inertie : vrai ou faux ?',
      difficulty: 1,
      duration: 8,
      tags: ['principe d’inertie'],
      statement: [
        { type: 'p', text: 'Pour chaque situation, dire si les forces exercées sur le système se compensent. Justifier.' },
        { type: 'list', ordered: true, items: [
          'Un livre posé sur une table.',
          'Un parachutiste descendant verticalement à vitesse constante.',
          'Une voiture qui roule à 90 km/h constants dans un virage.',
          'Une pomme qui tombe d’un arbre.',
          'Un satellite en orbite circulaire autour de la Terre, à vitesse de valeur constante.',
        ] },
      ],
      hints: ['Le vecteur vitesse est-il constant (valeur ET direction) ?'],
      solution: [
        { type: 'list', ordered: true, items: [
          'Immobile : les forces se compensent (poids et réaction de la table).',
          'Mouvement rectiligne uniforme : les forces se compensent (poids et frottements de l’air).',
          'La direction du vecteur vitesse change : les forces **ne se compensent pas** (contraposée du principe d’inertie).',
          'La vitesse augmente : les forces ne se compensent pas (le poids l’emporte).',
          'Trajectoire circulaire : la direction de v change, les forces ne se compensent pas (la force de gravitation est dirigée vers le centre de la Terre).',
        ] },
      ],
    },
    {
      id: 'pc9-ex3',
      title: 'Accélération d’une voiture',
      difficulty: 1,
      duration: 8,
      tags: ['ΣF = mΔv/Δt', 'prévision'],
      statement: [
        { type: 'p', text: r`Une voiture de masse $m = 1{,}2\times10^{3}$ kg roule en ligne droite à 20 m·s⁻¹. Pendant $\Delta t = 0{,}50$ s, la somme des forces qui s’exercent sur elle est constante, dirigée vers l’avant, de valeur $3{,}0\times10^{3}$ N.` },
        { type: 'list', ordered: true, items: [
          'Donner la direction et le sens du vecteur variation de vitesse.',
          'Estimer la valeur de Δv. En déduire la vitesse à la fin de l’intervalle.',
          'Même question pour un camion de 12 t soumis à la même force. Conclure sur le rôle de la masse.',
        ] },
      ],
      hints: [r`$\Delta v \approx \dfrac{\sum F\times\Delta t}{m}$.`],
      solution: [
        { type: 'p', text: '**1.** Δv a la direction et le sens de ΣF : horizontal, vers l’avant.' },
        { type: 'p', text: r`**2.** $\Delta v \approx \dfrac{3{,}0\times10^{3}\times0{,}50}{1{,}2\times10^{3}} = 1{,}3$ m·s⁻¹ (1,25). La vitesse finale vaut environ $20 + 1{,}3 = 21$ m·s⁻¹.` },
        { type: 'p', text: r`**3.** $\Delta v \approx \dfrac{3{,}0\times10^{3}\times0{,}50}{12\times10^{3}} = 0{,}13$ m·s⁻¹ : dix fois plus faible. Plus la masse est grande, plus la vitesse est difficile à modifier (inertie).` },
      ],
    },
    {
      id: 'pc9-ex4',
      title: 'La frappe d’un ballon',
      difficulty: 2,
      duration: 10,
      tags: ['ΣF = mΔv/Δt', 'estimation de force'],
      statement: [
        { type: 'p', text: r`Lors d’un penalty, le ballon ($m = 0{,}45$ kg), initialement immobile, quitte le pied du joueur à $25$ m·s⁻¹. La durée du contact est $\Delta t = 10$ ms. $g = 9{,}81$ N·kg⁻¹.` },
        { type: 'list', ordered: true, items: [
          'Calculer la valeur de la variation de vitesse.',
          'Estimer la valeur de la force moyenne exercée par le pied sur le ballon (on néglige les autres forces).',
          'Comparer au poids du ballon. L’approximation précédente est-elle justifiée ?',
        ] },
      ],
      hints: ['Δv = 25 − 0.'],
      solution: [
        { type: 'p', text: r`**1.** $\Delta v = 25 - 0 = 25$ m·s⁻¹ (dans la direction du tir).` },
        { type: 'p', text: r`**2.** $F \approx m\dfrac{\Delta v}{\Delta t} = 0{,}45\times\dfrac{25}{10\times10^{-3}} = 1{,}1\times10^{3}$ N.` },
        { type: 'p', text: r`**3.** $P = 0{,}45\times9{,}81 = 4{,}4$ N : la force du pied est environ 250 fois plus grande. Il était légitime de négliger le poids pendant le contact.` },
      ],
    },
    {
      id: 'pc9-ex5',
      title: 'Lancer horizontal en chute libre',
      difficulty: 2,
      duration: 12,
      tags: ['chute libre', 'Δv = gΔt'],
      statement: [
        { type: 'p', text: r`Une bille est lancée horizontalement depuis le bord d’une table avec une vitesse $v_0 = 3{,}0$ m·s⁻¹. On la suppose en chute libre ; $g = 9{,}81$ m·s⁻². Axe $Ox$ horizontal dans le sens du lancer, $Oy$ vertical vers le haut.` },
        { type: 'list', ordered: true, items: [
          'Faire le bilan des forces et donner les caractéristiques de Δv pendant Δt = 0,40 s.',
          'En déduire les coordonnées du vecteur vitesse 0,40 s après le lancer, puis sa valeur.',
          'Calculer l’angle entre le vecteur vitesse et l’horizontale à cet instant.',
        ] },
      ],
      hints: [r`$\Delta\vec v = \vec g\,\Delta t$ : seule la composante verticale varie.`, r`$\tan\alpha = |v_y|/v_x$.`],
      solution: [
        { type: 'p', text: r`**1.** Seul le poids agit. $\Delta\vec v = \vec g\,\Delta t$ : vertical, vers le bas, de valeur $9{,}81\times0{,}40 = 3{,}9$ m·s⁻¹.` },
        { type: 'p', text: r`**2.** $v_x = 3{,}0$ m·s⁻¹ (inchangée) et $v_y = 0 - 3{,}9 = -3{,}9$ m·s⁻¹. $v = \sqrt{3{,}0^2 + 3{,}92^2} = 4{,}9$ m·s⁻¹.` },
        { type: 'p', text: r`**3.** $\tan\alpha = \dfrac{3{,}92}{3{,}0} = 1{,}3$ donc $\alpha = 53°$ sous l’horizontale.` },
      ],
    },
    {
      id: 'pc9-ex6',
      title: 'Ouverture d’un parachute',
      difficulty: 2,
      duration: 12,
      tags: ['bilan des forces', 'ΣF = mΔv/Δt'],
      statement: [
        { type: 'p', text: r`Un parachutiste équipé ($m = 80$ kg) tombe verticalement à 50 m·s⁻¹. Il ouvre son parachute : en $2{,}0$ s, sa vitesse passe à 10 m·s⁻¹, puis reste constante. $g = 9{,}81$ N·kg⁻¹. On note $\vec F$ la force exercée par l’air (sur le parachute et le parachutiste), verticale.` },
        { type: 'list', ordered: true, items: [
          'Pendant le freinage, donner le sens de Δv puis celui de la somme des forces.',
          'Estimer la valeur moyenne de la somme des forces pendant le freinage.',
          'En déduire la valeur moyenne de F.',
          'Quelle est la valeur de F lorsque la vitesse est constante ? Justifier.',
        ] },
      ],
      hints: [r`$\sum\vec F = \vec P + \vec F$.`, 'Vitesse constante en ligne droite : principe d’inertie.'],
      solution: [
        { type: 'p', text: '**1.** La vitesse (vers le bas) diminue : Δv est vertical vers le haut, donc ΣF aussi.' },
        { type: 'p', text: r`**2.** $\sum F \approx m\dfrac{|\Delta v|}{\Delta t} = 80\times\dfrac{40}{2{,}0} = 1{,}6\times10^{3}$ N, vers le haut.` },
        { type: 'p', text: r`**3.** Axe vertical vers le haut : $\sum F = F - P$, donc $F = \sum F + mg = 1{,}6\times10^{3} + 80\times9{,}81 = 2{,}4\times10^{3}$ N.` },
        { type: 'p', text: r`**4.** Mouvement rectiligne uniforme ⇒ les forces se compensent : $F = P = 7{,}8\times10^{2}$ N.` },
      ],
    },
    {
      id: 'pc9-ex7',
      title: 'Chronophotographie d’une chute libre',
      difficulty: 2,
      duration: 20,
      tags: ['chronophotographie', 'chute libre', 'mesures'],
      statement: [
        { type: 'p', text: 'Une balle de masse m = 0,10 kg est lâchée sans vitesse initiale. On relève sa position y (axe vertical orienté vers le bas, origine au point de lâcher) toutes les τ = 50 ms.' },
        { type: 'table', headers: ['Point', 'M₀', 'M₁', 'M₂', 'M₃', 'M₄', 'M₅', 'M₆'], rows: [['y (mm)', '0', '12', '49', '110', '196', '307', '441']] },
        { type: 'list', ordered: true, items: [
          r`Calculer les vitesses $v_1$ à $v_5$ (formule centrée).`,
          r`Calculer $\Delta v_2$, $\Delta v_3$ et $\Delta v_4$ puis $\dfrac{\Delta v}{\Delta t}$ pour chacun.`,
          r`Calculer $m\dfrac{\Delta v}{\Delta t}$ et comparer au poids ($g = 9{,}81$ N·kg⁻¹). Conclure.`,
        ] },
      ],
      hints: [r`$v_i = \dfrac{y_{i+1}-y_{i-1}}{2\tau}$, $2\tau = 0{,}100$ s.`, r`$\Delta v_i = v_{i+1} - v_{i-1}$, $\Delta t = 0{,}100$ s.`],
      solution: [
        { type: 'p', text: r`**1.** $v_1 = \dfrac{0{,}049 - 0}{0{,}100} = 0{,}49$ m·s⁻¹ ; $v_2 = \dfrac{0{,}110 - 0{,}012}{0{,}100} = 0{,}98$ m·s⁻¹ ; $v_3 = 1{,}47$ m·s⁻¹ ; $v_4 = 1{,}97$ m·s⁻¹ ; $v_5 = 2{,}45$ m·s⁻¹.` },
        { type: 'p', text: r`**2.** $\Delta v_2 = v_3 - v_1 = 0{,}98$ m·s⁻¹ → $9{,}8$ m·s⁻² ; $\Delta v_3 = v_4 - v_2 = 0{,}99$ m·s⁻¹ → $9{,}9$ m·s⁻² ; $\Delta v_4 = v_5 - v_3 = 0{,}98$ m·s⁻¹ → $9{,}8$ m·s⁻².` },
        { type: 'p', text: r`**3.** $m\dfrac{\Delta v}{\Delta t} \approx 0{,}10\times9{,}8 = 0{,}98$ N, vertical vers le bas (Δv > 0 sur l’axe orienté vers le bas). Le poids vaut $P = 0{,}10\times9{,}81 = 0{,}98$ N, vertical vers le bas. On a bien $\sum\vec F = \vec P \approx m\Delta\vec v/\Delta t$ : la balle est en chute libre, frottements négligeables.` },
      ],
    },
    {
      id: 'pc9-ex8',
      title: 'Programme Python à compléter',
      difficulty: 2,
      duration: 15,
      tags: ['Python', 'capacité numérique'],
      statement: [
        { type: 'p', text: 'On veut vérifier la relation ΣF ≈ m Δv/Δt pour un mobile de masse m = 0,50 kg se déplaçant selon x. Compléter les lignes marquées `...`, puis prévoir l’affichage.' },
        {
          type: 'code',
          lang: 'python',
          code: `tau = 0.10                               # s
m = 0.50                                 # kg
x = [0.000, 0.105, 0.220, 0.345, 0.480]  # m
v = []
for i in range(1, len(x) - 1):
    v.append(...)                        # vitesse au point i
dv = ...                                 # v au point 3 moins v au point 1
F = ...
print("Somme des forces :", round(F, 2), "N")`,
        },
      ],
      hints: ['La liste v contient v₁, v₂, v₃ aux indices 0, 1, 2.', 'Δt = 2τ entre les points 1 et 3.'],
      solution: [
        {
          type: 'code',
          lang: 'python',
          code: `for i in range(1, len(x) - 1):
    v.append((x[i + 1] - x[i - 1]) / (2 * tau))
dv = v[2] - v[0]
F = m * dv / (2 * tau)`,
        },
        { type: 'p', text: r`Calcul : $v_1 = \dfrac{0{,}220}{0{,}20} = 1{,}10$ m·s⁻¹ ; $v_2 = \dfrac{0{,}345 - 0{,}105}{0{,}20} = 1{,}20$ m·s⁻¹ ; $v_3 = \dfrac{0{,}480 - 0{,}220}{0{,}20} = 1{,}30$ m·s⁻¹.` },
        { type: 'p', text: r`$\Delta v = 1{,}30 - 1{,}10 = 0{,}20$ m·s⁻¹ et $F = 0{,}50\times\dfrac{0{,}20}{0{,}20} = 0{,}50$ N. Affichage : « Somme des forces : 0.5 N » (orientée dans le sens du mouvement, qui est accéléré).` },
      ],
    },
    {
      id: 'pc9-ex9',
      title: 'Type bac — Le palet de curling… sur glace',
      difficulty: 3,
      duration: 30,
      tags: ['type bac', 'chronophotographie', 'frottements', 'principe d’inertie'],
      statement: [
        { type: 'p', text: r`Un palet de masse $m = 0{,}165$ kg glisse en ligne droite sur une patinoire horizontale. Une vidéo permet de relever sa position $x$ toutes les $\tau = 0{,}10$ s. Référentiel terrestre supposé galiléen ; $g = 9{,}81$ N·kg⁻¹.` },
        { type: 'table', headers: ['Point', 'M₀', 'M₁', 'M₂', 'M₃', 'M₄', 'M₅', 'M₆'], rows: [['x (cm)', '0,00', '19,75', '39,00', '57,75', '76,00', '93,75', '111,00']] },
        { type: 'list', ordered: true, items: [
          'Décrire le mouvement du palet. Le principe d’inertie permet-il de dire si les forces se compensent ?',
          'Calculer les vitesses v₁ à v₅. Commenter.',
          r`Calculer $\Delta v_3 = v_4 - v_2$ puis $\dfrac{\Delta v_3}{\Delta t}$.`,
          'Faire le bilan des forces (schéma). Le poids et la réaction normale se compensent ; justifier.',
          'En déduire la direction, le sens et la valeur de la force de frottement f exercée par la glace.',
          'Comparer f au poids. Peut-on considérer, sur une courte durée, que le palet est « pseudo-isolé » ?',
          'En supposant f constante, estimer la durée totale du glissement et la distance parcourue jusqu’à l’arrêt.',
        ] },
      ],
      hints: [
        r`$v_i = \dfrac{x_{i+1}-x_{i-1}}{2\tau}$, avec $2\tau = 0{,}20$ s.`,
        'Mouvement horizontal : aucune variation de vitesse verticale.',
        'La vitesse diminue de la même quantité à chaque intervalle : la vitesse moyenne sur tout le glissement est la moitié de la vitesse initiale.',
      ],
      solution: [
        { type: 'p', text: '**1.** Trajectoire rectiligne ; les distances parcourues pendant chaque intervalle diminuent (19,75 ; 19,25 ; 18,75 ; …) : mouvement **rectiligne ralenti**. La vitesse varie, donc d’après la contraposée du principe d’inertie, les forces **ne se compensent pas**.' },
        { type: 'p', text: r`**2.** $v_1 = \dfrac{0{,}3900}{0{,}20} = 1{,}95$ m·s⁻¹ ; $v_2 = \dfrac{0{,}5775 - 0{,}1975}{0{,}20} = 1{,}90$ m·s⁻¹ ; $v_3 = 1{,}85$ ; $v_4 = 1{,}80$ ; $v_5 = 1{,}75$ m·s⁻¹. La vitesse diminue régulièrement de 0,05 m·s⁻¹ tous les 0,10 s.` },
        { type: 'p', text: r`**3.** $\Delta v_3 = 1{,}80 - 1{,}90 = -0{,}10$ m·s⁻¹ ; $\dfrac{\Delta v_3}{\Delta t} = \dfrac{-0{,}10}{0{,}20} = -0{,}50$ m·s⁻² : $\Delta\vec v$ est opposé au mouvement.` },
        { type: 'p', text: r`**4.** Poids $\vec P$ (vertical, vers le bas), réaction normale $\vec R_N$ (verticale, vers le haut), frottement $\vec f$ (horizontal, opposé au mouvement). Le mouvement est horizontal : la vitesse verticale reste nulle, donc la somme des forces verticales est nulle : $\vec P + \vec R_N = \vec 0$.` },
        { type: 'p', text: r`**5.** $\sum\vec F = \vec f \approx m\dfrac{\Delta\vec v}{\Delta t}$ : $\vec f$ est horizontale, opposée au mouvement, de valeur $f = 0{,}165\times0{,}50 = 8{,}3\times10^{-2}$ N.` },
        { type: 'p', text: r`**6.** $P = 0{,}165\times9{,}81 = 1{,}62$ N ; $f/P = 0{,}051$ : la force de frottement ne représente que 5 % du poids. Sur une courte durée, la vitesse varie très peu : on peut considérer que les forces se compensent presque, le palet est quasiment pseudo-isolé (mouvement presque rectiligne uniforme).` },
        { type: 'p', text: r`**7.** La vitesse initiale vaut environ $2{,}00$ m·s⁻¹ (à $t = 0$) et diminue de $0{,}50$ m·s⁻¹ par seconde : arrêt après $\dfrac{2{,}00}{0{,}50} = 4{,}0$ s. La vitesse décroissant régulièrement, la vitesse moyenne vaut $1{,}00$ m·s⁻¹, d’où une distance d’environ $1{,}00\times4{,}0 = 4{,}0$ m.` },
      ],
    },
  ],

  // =========================================================================
  representations: [
    {
      type: 'widget',
      id: 'newton-motion',
      title: 'Vecteurs vitesse, variation de vitesse et forces',
      caption: 'Choisissez un mouvement : observez la chronophotographie, les vecteurs v et Δv, et vérifiez que ΣF ≈ m·Δv/Δt.',
    },
    { type: 'svg', svg: svgChrono, caption: 'Construction du vecteur Δv sur une chronophotographie.', maxWidth: 560 },
    { type: 'svg', svg: svgBilan, caption: 'Bilan des forces sur un palet en mouvement ralenti.', maxWidth: 560 },
    {
      type: 'widget',
      id: 'function-plotter',
      props: {
        expressions: ['v0 - 9.81*x'],
        params: [{ name: 'v0', min: -10, max: 20, step: 1, value: 10 }],
        xMin: 0,
        xMax: 3,
        yMin: -20,
        yMax: 20,
        editable: true,
      },
      title: 'Chute libre : vitesse verticale en fonction du temps',
      caption: 'Axe vers le haut : vy diminue de 9,81 m·s⁻¹ chaque seconde, quelle que soit la vitesse initiale.',
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre la construction de Δv',
      items: [
        'Pointer les positions successives et définir l’échelle',
        'Calculer v(i−1) et v(i+1) avec la formule centrée',
        'Tracer ces deux vecteurs à l’échelle',
        'Les reporter à partir du point Mᵢ',
        'Tracer Δv de l’extrémité de v(i−1) à celle de v(i+1)',
        'Mesurer Δv et calculer m·Δv/Δt',
      ],
    },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Un objet se déplace en ligne droite à vitesse constante. La somme des forces qui s’exercent sur lui est :',
          choices: ['dans le sens du mouvement', 'nulle', 'opposée au mouvement', 'égale au poids'],
          answer: 1,
          explanation: 'Principe d’inertie.',
        },
        {
          question: 'Le vecteur Δv a toujours la même direction et le même sens que :',
          choices: ['le vecteur vitesse', 'le poids', 'la somme des forces', 'la trajectoire'],
          answer: 2,
        },
        {
          question: 'Une même force agit pendant la même durée sur deux objets de masses m et 2m. La variation de vitesse du second est :',
          choices: ['deux fois plus grande', 'la même', 'deux fois plus petite', 'quatre fois plus petite'],
          answer: 2,
          explanation: 'Δv = ΣF·Δt/m.',
        },
        {
          question: 'En chute libre, pendant 0,50 s, la vitesse varie de :',
          choices: ['0,50 m·s⁻¹', '4,9 m·s⁻¹ vers le bas', '9,8 m·s⁻¹ vers le bas', '19,6 m·s⁻¹'],
          answer: 1,
          explanation: 'Δv = gΔt = 9,81 × 0,50 = 4,9 m·s⁻¹.',
        },
        {
          question: 'Une voiture prend un virage à vitesse constante en valeur. Les forces :',
          choices: ['se compensent', 'ne se compensent pas', 'sont toutes nulles', 'sont dans le sens du mouvement'],
          answer: 1,
          explanation: 'La direction de v change : Δv ≠ 0.',
        },
        {
          question: 'Sur une chronophotographie (τ = 20 ms), M₄M₆ = 3,0 cm. La vitesse en M₅ vaut :',
          choices: ['0,75 m·s⁻¹', '1,5 m·s⁻¹', '0,15 m·s⁻¹', '7,5 m·s⁻¹'],
          answer: 0,
          explanation: 'v = 0,030 / 0,040 = 0,75 m·s⁻¹.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Vecteur vitesse (formule centrée)', back: r`$\vec v_i \approx \dfrac{\overrightarrow{M_{i-1}M_{i+1}}}{2\tau}$` },
        { front: 'Vecteur variation de vitesse', back: r`$\Delta\vec v_i = \vec v_{i+1} - \vec v_{i-1}$, $\Delta t = 2\tau$` },
        { front: 'Principe d’inertie', back: 'ΣF = 0 ⇔ immobile ou mouvement rectiligne uniforme (référentiel galiléen)' },
        { front: 'Relation approchée de Newton', back: r`$\sum\vec F \approx m\dfrac{\Delta\vec v}{\Delta t}$` },
        { front: 'Rôle de la masse', back: 'Plus m est grande, plus Δv est faible pour une même force (inertie).' },
        { front: 'Chute libre', back: r`Seul le poids agit ; $\Delta\vec v = \vec g\,\Delta t$, indépendant de la masse` },
        { front: 'Référentiel galiléen', back: 'Référentiel dans lequel le principe d’inertie est vérifié (terrestre, pour des durées courtes).' },
        { front: 'Contraposée du principe d’inertie', back: 'Si v varie (valeur ou direction), les forces ne se compensent pas.' },
        { front: 'Mouvement ralenti', back: 'ΣF et Δv opposés au vecteur vitesse.' },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Si un objet est en mouvement, une force s’exerce nécessairement dans le sens du mouvement.', answer: false, explanation: 'Un mouvement rectiligne uniforme ne nécessite aucune force résultante (erreur d’Aristote).' },
        { text: 'Dans le vide, une bille de plomb et une plume ont le même mouvement de chute.', answer: true },
        { text: 'Le vecteur vitesse est toujours tangent à la trajectoire.', answer: true },
        { text: 'Un satellite en orbite circulaire uniforme est soumis à des forces qui se compensent.', answer: false, explanation: 'La direction de sa vitesse change sans cesse.' },
      ],
    },
  ],
}

export default chapter
