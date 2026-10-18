import type { Chapter } from '../types'

const r = String.raw

// ---------------------------------------------------------------------------
// Schémas SVG
// ---------------------------------------------------------------------------

const svgTravail = `<svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <defs>
    <marker id="pc10-f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(0 84% 60%)"/></marker>
    <marker id="pc10-d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(217 91% 60%)"/></marker>
  </defs>
  <line x1="20" y1="150" x2="500" y2="150" stroke="currentColor" class="svg-stroke" stroke-width="1.5"/>
  <circle cx="80" cy="150" r="4" fill="currentColor" class="svg-fill"/>
  <text x="74" y="172" class="svg-fill">A</text>
  <circle cx="420" cy="150" r="4" fill="currentColor" class="svg-fill"/>
  <text x="416" y="172" class="svg-fill">B</text>
  <line x1="80" y1="150" x2="414" y2="150" stroke="hsl(217 91% 60%)" stroke-width="2" marker-end="url(#pc10-d)"/>
  <text x="240" y="170" fill="hsl(217 91% 60%)">AB (déplacement)</text>
  <line x1="80" y1="150" x2="230" y2="63" stroke="hsl(0 84% 60%)" stroke-width="2.5" marker-end="url(#pc10-f)"/>
  <text x="175" y="70" fill="hsl(0 84% 60%)" font-weight="600">F</text>
  <path d="M130,150 A50,50 0 0 0 123,125" fill="none" stroke="currentColor" class="svg-stroke"/>
  <text x="138" y="138" class="svg-fill">α</text>
  <line x1="230" y1="63" x2="230" y2="150" stroke="currentColor" class="svg-muted" stroke-dasharray="3 3"/>
  <text x="300" y="40" class="svg-fill">W_AB(F) = F · AB · cos α</text>
  <text x="300" y="62" class="svg-muted" fill="currentColor" font-size="11">0 ≤ α &lt; 90° : travail moteur (W &gt; 0)</text>
  <text x="300" y="78" class="svg-muted" fill="currentColor" font-size="11">α = 90° : travail nul</text>
  <text x="300" y="94" class="svg-muted" fill="currentColor" font-size="11">90° &lt; α ≤ 180° : travail résistant (W &lt; 0)</text>
</svg>`

const svgPlanIncline = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <defs>
    <marker id="pc10-p" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(142 71% 45%)"/></marker>
    <marker id="pc10-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(25 95% 53%)"/></marker>
    <marker id="pc10-fr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="hsl(263 70% 60%)"/></marker>
    <marker id="pc10-z" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker>
  </defs>
  <path d="M60,240 L460,240 L60,94 Z" fill="currentColor" class="svg-muted" opacity="0.12"/>
  <line x1="60" y1="94" x2="460" y2="240" stroke="currentColor" class="svg-stroke" stroke-width="2"/>
  <line x1="40" y1="240" x2="500" y2="240" stroke="currentColor" class="svg-stroke" stroke-width="2"/>
  <path d="M410,240 A50,50 0 0 0 413,223" fill="none" stroke="currentColor" class="svg-stroke"/>
  <text x="380" y="232" class="svg-fill">β</text>
  <g transform="translate(200,145) rotate(20)">
    <rect x="-25" y="-30" width="50" height="30" fill="none" stroke="currentColor" class="svg-stroke" stroke-width="2"/>
  </g>
  <circle cx="205" cy="131" r="3" fill="currentColor" class="svg-fill"/>
  <line x1="205" y1="131" x2="205" y2="211" stroke="hsl(142 71% 45%)" stroke-width="2.5" marker-end="url(#pc10-p)"/>
  <text x="212" y="206" fill="hsl(142 71% 45%)">P</text>
  <line x1="205" y1="131" x2="180" y2="62" stroke="hsl(25 95% 53%)" stroke-width="2.5" marker-end="url(#pc10-r)"/>
  <text x="160" y="62" fill="hsl(25 95% 53%)">R_N</text>
  <line x1="205" y1="131" x2="160" y2="115" stroke="hsl(263 70% 60%)" stroke-width="2.5" marker-end="url(#pc10-fr)"/>
  <text x="132" y="110" fill="hsl(263 70% 60%)">f</text>
  <line x1="30" y1="250" x2="30" y2="70" stroke="currentColor" class="svg-stroke" stroke-width="1.2" marker-end="url(#pc10-z)"/>
  <text x="18" y="66" class="svg-fill">z</text>
  <circle cx="90" cy="105" r="4" fill="hsl(0 84% 60%)"/>
  <text x="96" y="98" fill="hsl(0 84% 60%)">A</text>
  <circle cx="400" cy="218" r="4" fill="hsl(0 84% 60%)"/>
  <text x="404" y="210" fill="hsl(0 84% 60%)">B</text>
  <line x1="25" y1="105" x2="90" y2="105" stroke="currentColor" class="svg-muted" stroke-dasharray="3 3"/>
  <line x1="25" y1="218" x2="400" y2="218" stroke="currentColor" class="svg-muted" stroke-dasharray="3 3"/>
  <text x="300" y="60" class="svg-fill">W(P) = m g (z_A − z_B) &gt; 0</text>
  <text x="300" y="80" class="svg-fill">W(R_N) = 0 (⊥ au déplacement)</text>
  <text x="300" y="100" class="svg-fill">W(f) = − f · AB &lt; 0</text>
</svg>`

const svgBarres = `<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <text x="130" y="20" text-anchor="middle" class="svg-fill" font-weight="600">Sans frottement</text>
  <text x="390" y="20" text-anchor="middle" class="svg-fill" font-weight="600">Avec frottements</text>
  <line x1="20" y1="200" x2="250" y2="200" stroke="currentColor" class="svg-stroke"/>
  <line x1="280" y1="200" x2="510" y2="200" stroke="currentColor" class="svg-stroke"/>
  <rect x="40" y="60" width="30" height="140" fill="hsl(217 91% 60%)" opacity="0.8"/>
  <rect x="115" y="60" width="30" height="70" fill="hsl(217 91% 60%)" opacity="0.8"/>
  <rect x="115" y="130" width="30" height="70" fill="hsl(25 95% 53%)" opacity="0.8"/>
  <rect x="190" y="60" width="30" height="140" fill="hsl(25 95% 53%)" opacity="0.8"/>
  <text x="55" y="218" text-anchor="middle" class="svg-fill">haut</text>
  <text x="130" y="218" text-anchor="middle" class="svg-fill">milieu</text>
  <text x="205" y="218" text-anchor="middle" class="svg-fill">bas</text>
  <line x1="30" y1="60" x2="235" y2="60" stroke="hsl(0 84% 60%)" stroke-dasharray="4 3"/>
  <text x="130" y="52" text-anchor="middle" fill="hsl(0 84% 60%)">Em constante</text>
  <rect x="300" y="60" width="30" height="140" fill="hsl(217 91% 60%)" opacity="0.8"/>
  <rect x="375" y="105" width="30" height="45" fill="hsl(217 91% 60%)" opacity="0.8"/>
  <rect x="375" y="150" width="30" height="50" fill="hsl(25 95% 53%)" opacity="0.8"/>
  <rect x="375" y="85" width="30" height="20" fill="none" stroke="hsl(0 84% 60%)" stroke-dasharray="3 2"/>
  <rect x="450" y="110" width="30" height="90" fill="hsl(25 95% 53%)" opacity="0.8"/>
  <rect x="450" y="60" width="30" height="50" fill="none" stroke="hsl(0 84% 60%)" stroke-dasharray="3 2"/>
  <text x="315" y="218" text-anchor="middle" class="svg-fill">haut</text>
  <text x="390" y="218" text-anchor="middle" class="svg-fill">milieu</text>
  <text x="465" y="218" text-anchor="middle" class="svg-fill">bas</text>
  <text x="488" y="88" fill="hsl(0 84% 60%)" font-size="11">dissipée</text>
  <rect x="40" y="228" width="12" height="10" fill="hsl(217 91% 60%)"/>
  <text x="58" y="237" class="svg-fill" font-size="11">Epp</text>
  <rect x="100" y="228" width="12" height="10" fill="hsl(25 95% 53%)"/>
  <text x="118" y="237" class="svg-fill" font-size="11">Ec</text>
  <rect x="160" y="228" width="12" height="10" fill="none" stroke="hsl(0 84% 60%)" stroke-dasharray="3 2"/>
  <text x="178" y="237" class="svg-fill" font-size="11">énergie transférée par les frottements (chaleur)</text>
</svg>`

const svgChemins = `<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <defs>
    <marker id="pc10-c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker>
  </defs>
  <circle cx="80" cy="50" r="5" fill="hsl(0 84% 60%)"/>
  <text x="62" y="44" fill="hsl(0 84% 60%)">A</text>
  <circle cx="380" cy="180" r="5" fill="hsl(0 84% 60%)"/>
  <text x="388" y="184" fill="hsl(0 84% 60%)">B</text>
  <line x1="80" y1="50" x2="380" y2="180" stroke="hsl(217 91% 60%)" stroke-width="2"/>
  <path d="M80,50 C160,50 140,190 230,150 C300,120 320,190 380,180" fill="none" stroke="hsl(142 71% 45%)" stroke-width="2"/>
  <path d="M80,50 L80,180 L380,180" fill="none" stroke="hsl(25 95% 53%)" stroke-width="2"/>
  <line x1="440" y1="50" x2="440" y2="180" stroke="currentColor" class="svg-stroke" marker-end="url(#pc10-c)"/>
  <line x1="440" y1="180" x2="440" y2="50" stroke="currentColor" class="svg-stroke" marker-end="url(#pc10-c)"/>
  <line x1="80" y1="50" x2="450" y2="50" stroke="currentColor" class="svg-muted" stroke-dasharray="3 3"/>
  <line x1="380" y1="180" x2="450" y2="180" stroke="currentColor" class="svg-muted" stroke-dasharray="3 3"/>
  <text x="448" y="120" class="svg-fill">z_A − z_B</text>
  <text x="20" y="210" class="svg-fill">Pour les trois chemins : W(P) = m g (z_A − z_B) — le poids est une force conservative.</text>
</svg>`

// ---------------------------------------------------------------------------

const pythonEnergie = `import matplotlib.pyplot as plt

m, g, tau = 0.058, 9.81, 0.040        # kg, N/kg, s
# altitudes (m) d'une balle lancée vers le haut, relevées par pointage
z = [1.000, 1.312, 1.609, 1.889, 2.154, 2.404, 2.637, 2.855, 3.058, 3.244, 3.415]

t, Ec, Epp, Em = [], [], [], []
for i in range(1, len(z) - 1):
    v = (z[i + 1] - z[i - 1]) / (2 * tau)   # vitesse verticale (formule centrée)
    t.append(i * tau)
    Ec.append(0.5 * m * v ** 2)
    Epp.append(m * g * z[i])                # origine des altitudes au sol
    Em.append(Ec[-1] + Epp[-1])

plt.plot(t, Ec, "o-", label="Ec")
plt.plot(t, Epp, "s-", label="Epp")
plt.plot(t, Em, "^-", label="Em")
plt.xlabel("t (s)"); plt.ylabel("Énergie (J)"); plt.legend(); plt.show()`

// ---------------------------------------------------------------------------

const chapter: Chapter = {
  id: 'energie-mecanique',
  subject: 'physique-chimie',
  order: 10,
  title: 'Aspects énergétiques des phénomènes mécaniques',
  theme: 'L’énergie : conversions et transferts',
  summary:
    'Énergie cinétique, travail d’une force constante, théorème de l’énergie cinétique, forces conservatives et non conservatives, énergie potentielle de pesanteur, conservation et dissipation de l’énergie mécanique.',
  duration: '3 semaines',
  objectives: [
    'Utiliser l’expression de l’énergie cinétique d’un système modélisé par un point matériel.',
    'Utiliser l’expression du travail $W_{AB}(\\vec F) = \\vec F\\cdot\\overrightarrow{AB}$ dans le cas d’une force constante.',
    'Énoncer et exploiter le théorème de l’énergie cinétique.',
    'Établir et utiliser l’expression du travail du poids ; distinguer forces conservatives et non conservatives.',
    'Établir l’expression de l’énergie potentielle de pesanteur pour un système au voisinage de la surface terrestre.',
    'Calculer l’énergie mécanique ; identifier des situations de conservation et de non-conservation de l’énergie mécanique.',
    'Exploiter la conservation de l’énergie mécanique ; utiliser la variation de l’énergie mécanique pour déterminer le travail des forces non conservatives.',
    'Utiliser un langage de programmation pour effectuer le bilan énergétique d’un système en mouvement.',
  ],
  keywords: ['énergie cinétique', 'travail', 'théorème de l’énergie cinétique', 'force conservative', 'énergie potentielle de pesanteur', 'énergie mécanique', 'frottements', 'dissipation'],

  // =========================================================================
  fiche: [
    { type: 'h2', text: 'Les formules' },
    {
      type: 'table',
      headers: ['Grandeur', 'Expression', 'Unités'],
      rows: [
        ['Énergie cinétique', r`$E_c = \dfrac12 m v^2$`, 'J ; kg ; m·s⁻¹'],
        ['Travail d’une force constante', r`$W_{AB}(\vec F) = \vec F\cdot\overrightarrow{AB} = F\cdot AB\cdot\cos\alpha$`, 'J ; N ; m'],
        ['Travail du poids', r`$W_{AB}(\vec P) = m g (z_A - z_B)$`, 'axe z vers le haut'],
        ['Travail d’un frottement constant (trajet rectiligne)', r`$W_{AB}(\vec f) = -f\cdot AB$`, 'toujours négatif'],
        ['Énergie potentielle de pesanteur', r`$E_{pp} = m g z$`, 'origine des z à préciser'],
        ['Énergie mécanique', r`$E_m = E_c + E_{pp}$`, 'J'],
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Théorème de l’énergie cinétique',
      content: [
        { type: 'math', tex: r`\Delta E_c = E_c(B) - E_c(A) = \sum W_{AB}(\vec F_i)` },
        { type: 'p', text: 'Dans un référentiel galiléen, la variation d’énergie cinétique est égale à la somme des travaux de **toutes** les forces.' },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Énergie mécanique',
      content: [
        {
          type: 'list',
          items: [
            r`$W_{AB}(\vec P) = E_{pp}(A) - E_{pp}(B) = -\Delta E_{pp}$.`,
            r`$\Delta E_m = \sum W_{AB}(\vec F_{\text{non conservatives}})$.`,
            r`Seules des forces conservatives travaillent (ou forces non conservatives de travail nul) ⇒ $E_m$ **se conserve** : $\Delta E_c = -\Delta E_{pp}$.`,
            r`Frottements ⇒ $E_m$ **diminue** : l’énergie « perdue » est transférée à l’extérieur (chaleur), on parle de **dissipation**.`,
          ],
        },
      ],
    },
    {
      type: 'keyvalue',
      items: [
        { key: 'Force conservative', value: 'son travail ne dépend pas du chemin suivi (poids, force électrostatique dans un champ uniforme).' },
        { key: 'Force non conservative', value: 'son travail dépend du chemin suivi (frottements, force motrice, tension d’un fil…).' },
        { key: 'Travail moteur / résistant', value: 'W > 0 : la force favorise le mouvement ; W < 0 : elle s’y oppose.' },
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
            'Convertir les km·h⁻¹ en m·s⁻¹ (÷ 3,6) avant de calculer Ec.',
            r`$v$ est **au carré** : doubler la vitesse multiplie $E_c$ par 4.`,
            'Préciser l’origine des altitudes pour Epp ; seule sa **variation** a un sens physique.',
            'Une force perpendiculaire au déplacement (réaction normale, tension d’un pendule) ne travaille pas.',
          ],
        },
      ],
    },
  ],

  // =========================================================================
  cours: [
    { type: 'h2', text: '1. L’énergie cinétique' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Énergie cinétique',
      content: [
        { type: 'p', text: r`L’énergie cinétique d’un système de masse $m$, modélisé par un point matériel animé d’une vitesse de valeur $v$ dans un référentiel donné, est :` },
        { type: 'math', tex: r`E_c = \frac12\,m\,v^2` },
        { type: 'p', text: r`$E_c$ en joule (J), $m$ en kg, $v$ en m·s⁻¹. $E_c \geq 0$ ; elle dépend du référentiel.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        {
          type: 'p',
          text: r`Voiture de $1\,200$ kg à $90$ km·h⁻¹ : $v = \dfrac{90}{3{,}6} = 25$ m·s⁻¹, $E_c = \frac12\times1\,200\times25^2 = 3{,}8\times10^{5}$ J. À 130 km·h⁻¹, $E_c = 7{,}8\times10^{5}$ J : 2,1 fois plus pour une vitesse 1,44 fois plus grande.`,
        },
      ],
    },

    { type: 'h2', text: '2. Le travail d’une force constante' },
    {
      type: 'p',
      text: 'Une force **travaille** lorsque son point d’application se déplace et qu’elle n’est pas perpendiculaire au déplacement. Le travail mesure l’énergie transférée au système par la force.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Travail d’une force constante',
      content: [
        { type: 'p', text: r`Le travail d’une force **constante** $\vec F$ (même direction, même sens, même valeur) dont le point d’application se déplace de A à B est le produit scalaire :` },
        { type: 'math', tex: r`W_{AB}(\vec F) = \vec F\cdot\overrightarrow{AB} = F\times AB\times\cos\alpha` },
        { type: 'p', text: r`où $\alpha$ est l’angle entre $\vec F$ et $\overrightarrow{AB}$. $W$ en joule (J), $F$ en N, $AB$ en m. $1$ J $= 1$ N·m.` },
      ],
    },
    { type: 'svg', svg: svgTravail, caption: 'Travail d’une force constante lors d’un déplacement rectiligne AB.', maxWidth: 560 },
    {
      type: 'table',
      headers: ['Angle α', 'cos α', 'Travail', 'Effet'],
      rows: [
        [r`$0 \leq \alpha < 90°$`, '> 0', 'moteur (W > 0)', 'favorise le mouvement'],
        [r`$\alpha = 90°$`, '0', 'nul', 'aucun effet énergétique'],
        [r`$90° < \alpha \leq 180°$`, '< 0', 'résistant (W < 0)', 's’oppose au mouvement'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Avec des coordonnées',
      content: [
        { type: 'p', text: r`Si $\vec F\,(F_x ; F_y)$ et $\overrightarrow{AB}\,(x_B - x_A ; y_B - y_A)$ : $W_{AB}(\vec F) = F_x(x_B - x_A) + F_y(y_B - y_A)$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : tirer une luge',
      content: [
        { type: 'p', text: r`Un enfant tire une luge avec une corde faisant un angle de 30° avec l’horizontale ; $F = 50$ N, déplacement horizontal $AB = 20$ m : $W = 50\times20\times\cos 30° = 8{,}7\times10^{2}$ J (moteur).` },
      ],
    },
    { type: 'h3', text: 'Travail du poids' },
    {
      type: 'p',
      text: r`Au voisinage de la Terre, le poids $\vec P = m\vec g$ est constant. Dans un repère où l’axe $Oz$ est vertical vers le haut : $\vec P\,(0 ; -mg)$ et $\overrightarrow{AB}\,(x_B - x_A ; z_B - z_A)$.`,
    },
    { type: 'math', tex: r`W_{AB}(\vec P) = 0\times(x_B - x_A) + (-mg)(z_B - z_A) = m\,g\,(z_A - z_B)` },
    {
      type: 'list',
      items: [
        r`Le système **descend** ($z_A > z_B$) : travail **moteur**.`,
        r`Le système **monte** ($z_A < z_B$) : travail **résistant**.`,
        'Le résultat ne dépend que des altitudes de départ et d’arrivée, **pas du chemin suivi** (le raisonnement s’étend à un chemin quelconque en le découpant en petits segments rectilignes).',
      ],
    },
    { type: 'svg', svg: svgChemins, caption: 'Le travail du poids est le même pour tous les chemins de A à B.', maxWidth: 560 },
    { type: 'h3', text: 'Travail d’une force de frottement' },
    {
      type: 'p',
      text: r`Une force de frottement de valeur constante $f$, toujours opposée au déplacement sur un trajet **rectiligne** ($\alpha = 180°$) :`,
    },
    { type: 'math', tex: r`W_{AB}(\vec f) = -f\times AB` },
    {
      type: 'p',
      text: 'Ce travail est toujours **résistant** et sa valeur absolue augmente avec la **longueur du trajet** : il dépend du chemin suivi.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Forces conservatives et non conservatives',
      content: [
        {
          type: 'list',
          items: [
            '**Force conservative** : son travail entre A et B ne dépend pas du chemin suivi, seulement des positions initiale et finale. Exemples : poids, force électrostatique dans un champ uniforme.',
            '**Force non conservative** : son travail dépend du chemin suivi. Exemples : forces de frottement, force motrice d’un moteur, action d’un opérateur.',
          ],
        },
      ],
    },

    { type: 'h2', text: '3. Le théorème de l’énergie cinétique' },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Théorème de l’énergie cinétique',
      content: [
        { type: 'p', text: r`Dans un référentiel galiléen, la variation de l’énergie cinétique d’un système modélisé par un point matériel, entre deux positions A et B, est égale à la somme des travaux des forces qui s’exercent sur lui entre A et B :` },
        { type: 'math', tex: r`\Delta E_{c,A\to B} = \frac12 m v_B^2 - \frac12 m v_A^2 = \sum_i W_{AB}(\vec F_i)` },
      ],
    },
    {
      type: 'list',
      items: [
        'Somme des travaux positive : le système **accélère** ; négative : il **ralentit**.',
        'Si les forces se compensent, la somme des travaux est nulle et Ec est constante : cohérent avec le principe d’inertie.',
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Système et référentiel', text: 'Définir le système et le référentiel (terrestre, supposé galiléen).' },
        { title: 'Bilan des forces', text: 'Faire un schéma avec toutes les forces.' },
        { title: 'Travaux', text: 'Calculer le travail de chaque force entre A et B (attention aux forces de travail nul).' },
        { title: 'Appliquer le théorème', text: r`Écrire $E_c(B) - E_c(A) = \sum W$ et isoler l’inconnue (vitesse, force, distance).` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple 1 : vitesse après une chute libre',
      content: [
        { type: 'p', text: r`Une pierre est lâchée sans vitesse d’une hauteur $h = 5{,}0$ m. Seul le poids travaille : $\frac12 m v_B^2 - 0 = mgh$ ⇒ $v_B = \sqrt{2gh} = \sqrt{2\times9{,}81\times5{,}0} = 9{,}9$ m·s⁻¹, indépendamment de la masse.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple 2 : distance de freinage',
      content: [
        {
          type: 'p',
          text: r`Une voiture de 1 200 kg roule à 90 km·h⁻¹ sur une route horizontale ; elle freine avec une force constante $f = 6{,}0\times10^{3}$ N. Le poids et la réaction normale ne travaillent pas (perpendiculaires au déplacement) :`,
        },
        { type: 'math', tex: r`0 - \frac12 m v_A^2 = -f\,d \;\Longrightarrow\; d = \frac{m v_A^2}{2f} = \frac{1\,200\times25^2}{2\times6{,}0\times10^{3}} = 63\ \text{m}` },
        { type: 'p', text: 'La distance de freinage est proportionnelle au **carré** de la vitesse : à 130 km·h⁻¹, elle passe à environ 130 m.' },
      ],
    },

    { type: 'h2', text: '4. L’énergie potentielle de pesanteur' },
    {
      type: 'p',
      text: r`Le travail du poids ne dépend que des altitudes initiale et finale ; on peut donc l’écrire comme la diminution d’une grandeur qui ne dépend que de la position : $W_{AB}(\vec P) = mgz_A - mgz_B$.`,
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Énergie potentielle de pesanteur',
      content: [
        { type: 'p', text: r`Pour un système de masse $m$ à l’altitude $z$ (axe vertical vers le haut) au voisinage de la surface terrestre :` },
        { type: 'math', tex: r`E_{pp} = m\,g\,z \qquad (E_{pp} = 0 \text{ pour } z = 0)` },
        { type: 'p', text: r`Elle dépend du choix de l’origine des altitudes ; seule sa **variation** a un sens physique. On a la relation : $W_{AB}(\vec P) = E_{pp}(A) - E_{pp}(B) = -\Delta E_{pp}$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        { type: 'p', text: r`Un skieur de 70 kg descend une piste de dénivelé 150 m : $\Delta E_{pp} = -70\times9{,}81\times150 = -1{,}03\times10^{5}$ J ; le poids fournit un travail moteur de $1{,}03\times10^{5}$ J.` },
      ],
    },

    { type: 'h2', text: '5. L’énergie mécanique' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Énergie mécanique',
      content: [{ type: 'math', tex: r`E_m = E_c + E_{pp} = \frac12 m v^2 + m g z` }],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Démonstration : variation de l’énergie mécanique',
      content: [
        { type: 'p', text: 'On sépare les forces en forces conservatives (ici le poids) et non conservatives. Théorème de l’énergie cinétique :' },
        { type: 'math', tex: r`\Delta E_c = W_{AB}(\vec P) + \sum W_{AB}(\vec F_{nc}) = -\Delta E_{pp} + \sum W_{AB}(\vec F_{nc})` },
        { type: 'math', tex: r`\Longrightarrow\quad \Delta E_m = \Delta E_c + \Delta E_{pp} = \sum W_{AB}(\vec F_{nc})` },
      ],
    },
    { type: 'h3', text: 'Cas de conservation' },
    {
      type: 'p',
      text: r`Si les forces non conservatives ne travaillent pas (absence de frottements ; réaction normale ou tension de fil perpendiculaires au mouvement), alors $\Delta E_m = 0$ : l’énergie mécanique **se conserve**. Il y a **conversion** d’énergie potentielle en énergie cinétique (et inversement) : $\Delta E_c = -\Delta E_{pp}$.`,
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : le pendule simple',
      content: [
        { type: 'p', text: r`Une bille suspendue à un fil est lâchée sans vitesse à $h = 0{,}20$ m au-dessus de sa position la plus basse. La tension du fil, perpendiculaire à la trajectoire circulaire, ne travaille pas ; frottements négligés : $E_m$ se conserve.` },
        { type: 'math', tex: r`m g h = \frac12 m v^2 \;\Longrightarrow\; v = \sqrt{2gh} = \sqrt{2\times9{,}81\times0{,}20} = 2{,}0\ \text{m·s}^{-1}` },
        { type: 'p', text: 'La bille remonte ensuite à la même hauteur de l’autre côté.' },
      ],
    },
    { type: 'h3', text: 'Cas de non-conservation : dissipation' },
    {
      type: 'p',
      text: r`En présence de frottements, leur travail est négatif : $\Delta E_m = W(\vec f) < 0$, l’énergie mécanique **diminue**. L’énergie n’a pas disparu : elle est transférée à l’environnement sous forme de **transfert thermique** (échauffement des surfaces, de l’air). On parle d’énergie **dissipée**.`,
    },
    { type: 'svg', svg: svgBarres, caption: 'Répartition Ec / Epp au cours d’une descente, sans et avec frottements.', maxWidth: 560 },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : glissade sur un plan incliné',
      content: [
        {
          type: 'p',
          text: r`Un bloc de 2,0 kg part du repos et glisse de $L = 3{,}0$ m le long d’un plan incliné à 20°. Il arrive en bas à $3{,}5$ m·s⁻¹. Hauteur descendue : $h = L\sin 20° = 1{,}03$ m.`,
        },
        {
          type: 'list',
          items: [
            r`$\Delta E_{pp} = -mgh = -2{,}0\times9{,}81\times1{,}03 = -20{,}1$ J ; $\Delta E_c = \frac12\times2{,}0\times3{,}5^2 = 12{,}3$ J.`,
            r`$\Delta E_m = 12{,}3 - 20{,}1 = -7{,}9$ J $= W(\vec f) = -f L$ ⇒ $f = \dfrac{7{,}9}{3{,}0} = 2{,}6$ N.`,
          ],
        },
      ],
    },
    { type: 'svg', svg: svgPlanIncline, caption: 'Bilan des forces et travaux sur un plan incliné.', maxWidth: 560 },
    {
      type: 'callout',
      variant: 'method',
      title: 'Choisir la bonne méthode',
      content: [
        {
          type: 'table',
          headers: ['Situation', 'Outil conseillé'],
          rows: [
            ['Pas de frottements, poids seul qui travaille', r`Conservation de $E_m$ : $E_m(A) = E_m(B)$`],
            ['Frottements connus', r`Théorème de l’énergie cinétique, ou $\Delta E_m = W(\vec f)$`],
            ['Vitesses et altitudes mesurées, frottements inconnus', r`Calculer $\Delta E_m$ pour en déduire $W(\vec f)$ puis $f$`],
          ],
        },
      ],
    },

    { type: 'h2', text: '6. Bilan énergétique avec Python' },
    {
      type: 'p',
      text: 'À partir des positions pointées sur une vidéo, on calcule la vitesse à chaque instant, puis Ec, Epp et Em. Si Em reste constante, les frottements sont négligeables ; si elle diminue, on évalue l’énergie dissipée.',
    },
    { type: 'code', lang: 'python', code: pythonEnergie, caption: 'Bilan énergétique d’une balle lancée verticalement' },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Interpréter les courbes',
      content: [
        {
          type: 'list',
          items: [
            'Ec diminue pendant la montée, Epp augmente : conversion d’énergie cinétique en énergie potentielle.',
            'Em quasi constante (aux erreurs de pointage près) : frottements négligeables.',
            'Une décroissance régulière de Em traduit l’action des frottements de l’air.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Le joule',
      content: [
        {
          type: 'p',
          text: 'James Prescott Joule (1818-1889) montra expérimentalement que le travail mécanique pouvait être converti en chaleur (expérience des palettes agitant de l’eau), contribuant à établir le principe de conservation de l’énergie.',
        },
      ],
    },
  ],

  // =========================================================================
  exercices: [
    {
      id: 'pc10-ex1',
      title: 'Énergie cinétique d’une voiture',
      difficulty: 1,
      duration: 6,
      tags: ['énergie cinétique'],
      statement: [
        { type: 'p', text: 'Une voiture de masse m = 1,2 × 10³ kg roule à 90 km·h⁻¹, puis à 130 km·h⁻¹.' },
        { type: 'list', ordered: true, items: [
          'Calculer son énergie cinétique dans les deux cas.',
          'Par quel facteur Ec est-elle multipliée ? Comparer au rapport des vitesses.',
          'À quelle vitesse (en km·h⁻¹) une moto de 200 kg aurait-elle la même énergie cinétique que la voiture à 90 km·h⁻¹ ?',
        ] },
      ],
      hints: ['v en m·s⁻¹ : diviser par 3,6.', r`$v = \sqrt{2E_c/m}$.`],
      solution: [
        { type: 'p', text: r`**1.** $v_1 = 25$ m·s⁻¹ : $E_{c1} = \frac12\times1{,}2\times10^{3}\times25^2 = 3{,}8\times10^{5}$ J. $v_2 = 36{,}1$ m·s⁻¹ : $E_{c2} = \frac12\times1{,}2\times10^{3}\times36{,}1^2 = 7{,}8\times10^{5}$ J.` },
        { type: 'p', text: r`**2.** $E_{c2}/E_{c1} = 2{,}1 = (130/90)^2$ alors que $v_2/v_1 = 1{,}44$ : Ec varie comme le carré de la vitesse.` },
        { type: 'p', text: r`**3.** $v = \sqrt{\dfrac{2\times3{,}75\times10^{5}}{200}} = 61$ m·s⁻¹ soit $2{,}2\times10^{2}$ km·h⁻¹.` },
      ],
    },
    {
      id: 'pc10-ex2',
      title: 'Travail du poids d’un skieur',
      difficulty: 1,
      duration: 6,
      tags: ['travail du poids'],
      statement: [
        { type: 'p', text: 'Un skieur de 70 kg (équipement compris) descend une piste de l’altitude 1 850 m à l’altitude 1 700 m, puis remonte en télésiège de 1 700 m à 2 100 m. g = 9,81 N·kg⁻¹.' },
        { type: 'list', ordered: true, items: [
          'Calculer le travail du poids pendant la descente. Est-il moteur ou résistant ?',
          'Calculer le travail du poids pendant la remontée.',
          'La piste fait 2,0 km de long et serpente : cela change-t-il le résultat de la question 1 ?',
        ] },
      ],
      hints: [r`$W = mg(z_A - z_B)$.`],
      solution: [
        { type: 'p', text: r`**1.** $W = 70\times9{,}81\times(1\,850 - 1\,700) = 1{,}03\times10^{5}$ J > 0 : travail **moteur**.` },
        { type: 'p', text: r`**2.** $W = 70\times9{,}81\times(1\,700 - 2\,100) = -2{,}75\times10^{5}$ J : travail **résistant**.` },
        { type: 'p', text: '**3.** Non : le poids est une force conservative, son travail ne dépend que des altitudes de départ et d’arrivée.' },
      ],
    },
    {
      id: 'pc10-ex3',
      title: 'Tirer une luge',
      difficulty: 1,
      duration: 8,
      tags: ['travail', 'produit scalaire'],
      statement: [
        { type: 'p', text: 'Un enfant tire une luge sur 20 m de neige horizontale à vitesse constante. La corde fait un angle de 30° avec l’horizontale et exerce une force constante de 50 N. La luge est soumise aussi à son poids, à la réaction normale de la neige et à une force de frottement constante.' },
        { type: 'list', ordered: true, items: [
          'Calculer le travail de la force exercée par la corde.',
          'Quel est le travail du poids ? de la réaction normale ? Justifier.',
          'En utilisant le théorème de l’énergie cinétique, déterminer le travail de la force de frottement puis sa valeur.',
        ] },
      ],
      hints: ['À vitesse constante, ΔEc = 0.', 'Le frottement est opposé au déplacement.'],
      solution: [
        { type: 'p', text: r`**1.** $W(\vec F) = F\cdot AB\cdot\cos 30° = 50\times20\times0{,}866 = 8{,}7\times10^{2}$ J (moteur).` },
        { type: 'p', text: '**2.** Le déplacement est horizontal : le poids et la réaction normale, verticaux, sont perpendiculaires au déplacement ; leur travail est nul.' },
        { type: 'p', text: r`**3.** $\Delta E_c = 0 = W(\vec F) + W(\vec f)$ donc $W(\vec f) = -8{,}7\times10^{2}$ J. Or $W(\vec f) = -f\cdot AB$, d’où $f = \dfrac{866}{20} = 43$ N.` },
      ],
    },
    {
      id: 'pc10-ex4',
      title: 'Hauteur atteinte par une balle',
      difficulty: 2,
      duration: 12,
      tags: ['conservation', 'dissipation'],
      statement: [
        { type: 'p', text: r`Une balle de tennis ($m = 58$ g) est lancée verticalement vers le haut à $v_0 = 12$ m·s⁻¹ depuis l’origine des altitudes. $g = 9{,}81$ N·kg⁻¹.` },
        { type: 'list', ordered: true, items: [
          'Calculer son énergie mécanique initiale.',
          'En négligeant les frottements, déterminer l’altitude maximale atteinte.',
          'En réalité, la balle monte à 6,5 m. Calculer l’énergie dissipée par les frottements de l’air.',
          'En déduire la valeur moyenne de la force de frottement pendant la montée.',
        ] },
      ],
      hints: ['Au sommet, v = 0.', r`$\Delta E_m = -f\times h$.`],
      solution: [
        { type: 'p', text: r`**1.** $E_m = \frac12\times0{,}058\times12^2 + 0 = 4{,}2$ J.` },
        { type: 'p', text: r`**2.** Conservation : $\frac12 m v_0^2 = mgh_{max}$ ⇒ $h_{max} = \dfrac{v_0^2}{2g} = \dfrac{144}{19{,}62} = 7{,}3$ m.` },
        { type: 'p', text: r`**3.** Au sommet réel : $E_m = mgh = 0{,}058\times9{,}81\times6{,}5 = 3{,}70$ J. Énergie dissipée : $4{,}18 - 3{,}70 = 0{,}48$ J.` },
        { type: 'p', text: r`**4.** $\Delta E_m = W(\vec f) = -f h$ ⇒ $f = \dfrac{0{,}48}{6{,}5} = 7{,}3\times10^{-2}$ N (environ 13 % du poids, 0,57 N).` },
      ],
    },
    {
      id: 'pc10-ex5',
      title: 'Distance de freinage',
      difficulty: 2,
      duration: 12,
      tags: ['théorème de l’énergie cinétique'],
      statement: [
        { type: 'p', text: r`Une voiture de $1{,}2\times10^{3}$ kg roule sur une route horizontale. Le conducteur freine ; la force de freinage, constante et opposée au mouvement, vaut $6{,}0\times10^{3}$ N.` },
        { type: 'list', ordered: true, items: [
          'Faire le bilan des forces et indiquer celles qui travaillent.',
          'Établir l’expression de la distance de freinage d en fonction de m, v et f.',
          'Calculer d pour 90 km·h⁻¹ puis 130 km·h⁻¹.',
          'Sur route mouillée, la force de freinage maximale est divisée par 2. Que devient d à 90 km·h⁻¹ ?',
        ] },
      ],
      hints: [r`$0 - \frac12 mv^2 = -f\,d$.`],
      solution: [
        { type: 'p', text: '**1.** Poids et réaction normale (verticaux, perpendiculaires au déplacement : travail nul) ; force de freinage (travail résistant).' },
        { type: 'p', text: r`**2.** Théorème de l’énergie cinétique : $0 - \frac12 m v^2 = -f d$ ⇒ $d = \dfrac{m v^2}{2f}$.` },
        { type: 'p', text: r`**3.** À 25 m·s⁻¹ : $d = \dfrac{1{,}2\times10^{3}\times25^2}{2\times6{,}0\times10^{3}} = 63$ m (62,5 m). À 36,1 m·s⁻¹ : $d = 1{,}3\times10^{2}$ m.` },
        { type: 'p', text: '**4.** d est inversement proportionnelle à f : elle double, environ 1,3 × 10² m. (Il faut ajouter la distance parcourue pendant le temps de réaction pour avoir la distance d’arrêt.)' },
      ],
    },
    {
      id: 'pc10-ex6',
      title: 'Le pendule simple',
      difficulty: 2,
      duration: 12,
      tags: ['conservation', 'pendule'],
      statement: [
        { type: 'p', text: r`Une bille de masse $m = 100$ g est suspendue à un fil de longueur $L = 1{,}00$ m. On l’écarte d’un angle $\theta_0$ tel que $\cos\theta_0 = 0{,}80$ et on la lâche sans vitesse. Frottements négligés ; $g = 9{,}81$ N·kg⁻¹.` },
        { type: 'list', ordered: true, items: [
          r`Montrer que la hauteur de la bille au-dessus de sa position la plus basse vaut $h = L(1 - \cos\theta_0)$ et la calculer.`,
          'Pourquoi la tension du fil ne travaille-t-elle pas ?',
          'Calculer la vitesse de la bille au passage par la position la plus basse.',
          'Quelle est sa vitesse lorsqu’elle se trouve à 10 cm au-dessus de la position la plus basse ?',
        ] },
      ],
      hints: ['Le point d’attache est à L au-dessus de la position basse, et à L cos θ₀ au-dessus de la bille écartée.', 'Em se conserve.'],
      solution: [
        { type: 'p', text: r`**1.** La bille écartée est à $L\cos\theta_0$ sous le point d’attache, la position basse à $L$ : $h = L - L\cos\theta_0 = 1{,}00\times(1 - 0{,}80) = 0{,}20$ m.` },
        { type: 'p', text: '**2.** La tension est dirigée selon le fil, donc perpendiculaire à la trajectoire circulaire (et au déplacement) à chaque instant : son travail est nul.' },
        { type: 'p', text: r`**3.** Conservation de $E_m$ (origine en bas) : $mgh = \frac12 mv^2$ ⇒ $v = \sqrt{2gh} = \sqrt{2\times9{,}81\times0{,}20} = 2{,}0$ m·s⁻¹ (1,98).` },
        { type: 'p', text: r`**4.** $mgh = \frac12 mv'^2 + mgz$ avec $z = 0{,}10$ m ⇒ $v' = \sqrt{2g(h - z)} = \sqrt{2\times9{,}81\times0{,}10} = 1{,}4$ m·s⁻¹.` },
      ],
    },
    {
      id: 'pc10-ex7',
      title: 'Glissade avec frottements',
      difficulty: 2,
      duration: 15,
      tags: ['énergie mécanique', 'plan incliné', 'frottements'],
      statement: [
        { type: 'p', text: r`Un bloc de masse $m = 2{,}0$ kg est lâché sans vitesse en haut d’un plan incliné d’un angle $\beta = 20°$ sur l’horizontale. Après un parcours $L = 3{,}0$ m, sa vitesse vaut $3{,}5$ m·s⁻¹. $g = 9{,}81$ N·kg⁻¹. Origine des altitudes en bas du plan.` },
        { type: 'list', ordered: true, items: [
          'Calculer la hauteur de départ.',
          'Calculer Ec, Epp et Em au départ et à l’arrivée.',
          'L’énergie mécanique se conserve-t-elle ? Interpréter.',
          'En déduire la valeur de la force de frottement, supposée constante.',
          'Quelle vitesse le bloc aurait-il sans frottement ?',
        ] },
      ],
      hints: [r`$h = L\sin\beta$.`, r`$\Delta E_m = -fL$.`],
      solution: [
        { type: 'p', text: r`**1.** $h = 3{,}0\times\sin 20° = 1{,}03$ m.` },
        { type: 'p', text: r`**2.** Départ : $E_c = 0$, $E_{pp} = 2{,}0\times9{,}81\times1{,}03 = 20{,}1$ J, $E_m = 20{,}1$ J. Arrivée : $E_c = \frac12\times2{,}0\times3{,}5^2 = 12{,}3$ J, $E_{pp} = 0$, $E_m = 12{,}3$ J.` },
        { type: 'p', text: r`**3.** $\Delta E_m = -7{,}9$ J : l’énergie mécanique diminue. Les frottements ont dissipé 7,9 J sous forme de transfert thermique.` },
        { type: 'p', text: r`**4.** $\Delta E_m = W(\vec f) = -fL$ ⇒ $f = \dfrac{7{,}9}{3{,}0} = 2{,}6$ N.` },
        { type: 'p', text: r`**5.** $v = \sqrt{2gh} = \sqrt{2\times9{,}81\times1{,}03} = 4{,}5$ m·s⁻¹.` },
      ],
    },
    {
      id: 'pc10-ex8',
      title: 'Bilan énergétique avec Python',
      difficulty: 2,
      duration: 15,
      tags: ['Python', 'capacité numérique'],
      statement: [
        { type: 'p', text: 'On étudie un chariot de 0,50 kg descendant un rail. Le programme suivant est incomplet.' },
        {
          type: 'code',
          lang: 'python',
          code: `m, g = 0.50, 9.81
z = [0.80, 0.60, 0.40, 0.20, 0.00]   # altitudes (m)
v = [0.00, 1.90, 2.66, 3.24, 3.72]   # vitesses (m/s)
for i in range(len(z)):
    Ec = ...
    Epp = ...
    Em = ...
    print(i, round(Ec, 2), round(Epp, 2), round(Em, 2))`,
        },
        { type: 'list', ordered: true, items: [
          'Compléter les trois lignes.',
          'Calculer à la main Em pour i = 0 et i = 4.',
          'Conclure sur la présence de frottements et estimer l’énergie dissipée.',
        ] },
      ],
      hints: ['$E_c = \\frac12 m v^2$ s’écrit `0.5 * m * v[i] ** 2` en Python.'],
      solution: [
        {
          type: 'code',
          lang: 'python',
          code: `    Ec = 0.5 * m * v[i] ** 2
    Epp = m * g * z[i]
    Em = Ec + Epp`,
        },
        { type: 'p', text: r`**2.** $i = 0$ : $E_m = 0 + 0{,}50\times9{,}81\times0{,}80 = 3{,}92$ J. $i = 4$ : $E_m = \frac12\times0{,}50\times3{,}72^2 + 0 = 3{,}46$ J.` },
        { type: 'p', text: r`**3.** $E_m$ diminue de $3{,}92 - 3{,}46 = 0{,}46$ J : des frottements s’exercent sur le chariot ; environ 0,46 J ont été dissipés (12 % de l’énergie initiale).` },
      ],
    },
    {
      id: 'pc10-ex9',
      title: 'Type bac — Les montagnes russes',
      difficulty: 3,
      duration: 35,
      tags: ['type bac', 'conservation', 'dissipation', 'théorème de l’énergie cinétique'],
      statement: [
        { type: 'p', text: r`Un wagonnet chargé de passagers ($m = 500$ kg) passe au sommet A d’une première bosse (altitude $z_A = 30$ m) à la vitesse $v_A = 2{,}0$ m·s⁻¹. Il descend jusqu’au point le plus bas B ($z_B = 0$), puis remonte jusqu’au sommet C d’une seconde bosse ($z_C = 20$ m). Le wagonnet est modélisé par un point matériel ; référentiel terrestre supposé galiléen ; $g = 9{,}81$ N·kg⁻¹.` },
        { type: 'p', text: '**Partie A — Modèle sans frottement**' },
        { type: 'list', ordered: true, items: [
          'Faire l’inventaire des forces. Laquelle ne travaille pas ? Justifier.',
          'Calculer l’énergie mécanique du wagonnet en A.',
          'Justifier que l’énergie mécanique se conserve, puis calculer v_B et v_C.',
          'Quelle altitude maximale une troisième bosse pourrait-elle avoir pour être franchie ?',
        ] },
        { type: 'p', text: '**Partie B — Prise en compte des frottements**' },
        { type: 'list', ordered: true, items: [
          'Un capteur mesure en réalité v_B = 22 m·s⁻¹. Calculer l’énergie dissipée entre A et B.',
          'Le trajet AB mesure 80 m. En déduire la valeur moyenne de la force de frottement (supposée de valeur constante et opposée au mouvement).',
          'Sous quelle forme l’énergie dissipée se retrouve-t-elle ?',
          'En supposant la même force de frottement sur le trajet BC de 50 m, le wagonnet atteint-il C ? Si oui, avec quelle vitesse ?',
        ] },
      ],
      hints: [
        'La réaction normale des rails est perpendiculaire au déplacement.',
        r`$E_m(A) = \frac12 m v_A^2 + m g z_A$.`,
        r`$\Delta E_m = -f\times\text{longueur}$.`,
      ],
      solution: [
        { type: 'p', text: r`**A.1.** Poids $\vec P$ et réaction normale $\vec R_N$ des rails (frottements négligés). $\vec R_N$ est perpendiculaire aux rails, donc au déplacement : son travail est nul.` },
        { type: 'p', text: r`**A.2.** $E_m(A) = \frac12\times500\times2{,}0^2 + 500\times9{,}81\times30 = 1{,}0\times10^{3} + 1{,}47\times10^{5} = 1{,}48\times10^{5}$ J.` },
        { type: 'p', text: r`**A.3.** Seul le poids, force conservative, travaille : $E_m$ se conserve. En B : $\frac12 m v_B^2 = E_m(A)$ ⇒ $v_B = \sqrt{\dfrac{2\times1{,}48\times10^{5}}{500}} = 24$ m·s⁻¹ (24,3). En C : $\frac12 m v_C^2 = E_m(A) - mgz_C = 1{,}48\times10^{5} - 9{,}81\times10^{4} = 5{,}0\times10^{4}$ J ⇒ $v_C = 14$ m·s⁻¹.` },
        { type: 'p', text: r`**A.4.** Au mieux, le wagonnet arrive au sommet avec $v = 0$ : $mgz_{max} = E_m(A)$ ⇒ $z_{max} = \dfrac{1{,}48\times10^{5}}{500\times9{,}81} = 30{,}2$ m (un peu plus que $z_A$ grâce à la vitesse initiale).` },
        { type: 'p', text: r`**B.1.** $E_m(B) = \frac12\times500\times22^2 = 1{,}21\times10^{5}$ J ; énergie dissipée : $1{,}48\times10^{5} - 1{,}21\times10^{5} = 2{,}7\times10^{4}$ J.` },
        { type: 'p', text: r`**B.2.** $\Delta E_m = W(\vec f) = -f\times AB$ ⇒ $f = \dfrac{2{,}7\times10^{4}}{80} = 3{,}4\times10^{2}$ N.` },
        { type: 'p', text: '**B.3.** Elle est transférée à l’environnement sous forme de transfert thermique (échauffement des roues, des rails et de l’air) et en partie sous forme sonore.' },
        { type: 'p', text: r`**B.4.** Entre B et C : $E_m(C) = E_m(B) - f\times BC = 1{,}21\times10^{5} - 339\times50 = 1{,}04\times10^{5}$ J. Or $E_{pp}(C) = 9{,}81\times10^{4}$ J $< E_m(C)$ : le wagonnet atteint C avec $E_c(C) = 1{,}04\times10^{5} - 9{,}81\times10^{4} = 5{,}9\times10^{3}$ J, soit $v_C = \sqrt{\dfrac{2\times5{,}9\times10^{3}}{500}} = 4{,}9$ m·s⁻¹.` },
      ],
    },
  ],

  // =========================================================================
  representations: [
    {
      type: 'widget',
      id: 'mechanical-energy',
      title: 'Conversions Ec ↔ Epp et dissipation',
      caption: 'Chute, plan incliné ou pendule : activez les frottements pour voir l’énergie mécanique diminuer.',
    },
    {
      type: 'widget',
      id: 'function-plotter',
      props: {
        expressions: ['m*9.81*x', 'm*9.81*(h-x)', 'm*9.81*h'],
        params: [
          { name: 'm', min: 0.1, max: 5, step: 0.1, value: 1 },
          { name: 'h', min: 1, max: 20, step: 1, value: 10 },
        ],
        xMin: 0,
        xMax: 20,
        yMin: 0,
        yMax: 200,
        editable: true,
      },
      title: 'Chute libre : Epp, Ec et Em en fonction de l’altitude z',
      caption: 'Objet lâché sans vitesse de la hauteur h : Epp = mgz, Ec = mg(h − z), Em = mgh constante.',
    },
    { type: 'svg', svg: svgBarres, caption: 'Diagrammes énergétiques : conservation et dissipation.', maxWidth: 560 },
    { type: 'svg', svg: svgPlanIncline, caption: 'Forces et travaux sur un plan incliné.', maxWidth: 560 },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Si la vitesse d’un objet double, son énergie cinétique est :',
          choices: ['doublée', 'quadruplée', 'inchangée', 'divisée par 2'],
          answer: 1,
          explanation: r`$E_c \propto v^2$.`,
        },
        {
          question: 'Le travail d’une force perpendiculaire au déplacement est :',
          choices: ['maximal', 'négatif', 'nul', 'égal à F × AB'],
          answer: 2,
          explanation: 'cos 90° = 0.',
        },
        {
          question: 'Un objet de 2,0 kg monte de 3,0 m. Le travail de son poids vaut :',
          choices: ['+59 J', '−59 J', '+6,0 J', '−6,0 J'],
          answer: 1,
          explanation: 'W = mg(z_A − z_B) = 2,0 × 9,81 × (−3,0) = −59 J.',
        },
        {
          question: 'Quelle force est non conservative ?',
          choices: ['Le poids', 'La force électrostatique dans un champ uniforme', 'Une force de frottement', 'Aucune'],
          answer: 2,
        },
        {
          question: 'En présence de frottements, l’énergie mécanique :',
          choices: ['augmente', 'reste constante', 'diminue', 'devient nulle'],
          answer: 2,
          explanation: 'ΔEm = W(f) < 0.',
        },
        {
          question: 'Le théorème de l’énergie cinétique s’écrit :',
          choices: ['ΔEc = ΣW(forces)', 'ΔEc = W(poids) seulement', 'Ec = mgz', 'ΔEm = 0 toujours'],
          answer: 0,
        },
        {
          question: 'Une bille lâchée de 0,80 m sans frottement arrive au sol à :',
          choices: ['2,0 m·s⁻¹', '4,0 m·s⁻¹', '7,8 m·s⁻¹', '16 m·s⁻¹'],
          answer: 1,
          explanation: 'v = √(2 × 9,81 × 0,80) = 3,96 ≈ 4,0 m·s⁻¹.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Énergie cinétique', back: r`$E_c = \frac12 m v^2$ (J, kg, m·s⁻¹)` },
        { front: 'Travail d’une force constante', back: r`$W_{AB}(\vec F) = \vec F\cdot\overrightarrow{AB} = F\,AB\cos\alpha$` },
        { front: 'Travail du poids', back: r`$W_{AB}(\vec P) = mg(z_A - z_B)$` },
        { front: 'Travail d’un frottement constant (trajet rectiligne)', back: r`$W = -f\times AB$` },
        { front: 'Théorème de l’énergie cinétique', back: r`$\Delta E_c = \sum W_{AB}(\vec F_i)$` },
        { front: 'Énergie potentielle de pesanteur', back: r`$E_{pp} = mgz$ (axe vers le haut, origine choisie)` },
        { front: 'Énergie mécanique', back: r`$E_m = E_c + E_{pp}$` },
        { front: 'Variation de Em', back: r`$\Delta E_m = \sum W(\vec F_{\text{non conservatives}})$` },
        { front: 'Force conservative', back: 'Travail indépendant du chemin suivi (ex. : poids).' },
        { front: 'Travail moteur', back: 'W > 0 : angle entre F et AB inférieur à 90°.' },
        { front: 'Énergie dissipée', back: 'Énergie transférée à l’extérieur par les frottements (transfert thermique).' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'Lors d’une chute sans frottement, l’énergie {{potentielle}} de pesanteur est convertie en énergie {{cinétique|cinetique}} ; l’énergie {{mécanique|mecanique}} reste constante. Avec des frottements, celle-ci {{diminue}} : l’énergie est {{dissipée|dissipee}} sous forme de transfert {{thermique}}.',
    },
    {
      type: 'matching',
      title: 'Associer chaque force au signe de son travail',
      pairs: [
        { left: 'Poids d’un objet qui tombe', right: 'travail moteur' },
        { left: 'Poids d’un objet qu’on soulève', right: 'travail résistant' },
        { left: 'Réaction normale d’un sol horizontal', right: 'travail nul' },
        { left: 'Frottement de l’air sur un cycliste', right: 'travail toujours résistant' },
        { left: 'Tension du fil d’un pendule', right: 'travail nul (⊥ à la trajectoire)' },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'L’énergie potentielle de pesanteur peut être négative.', answer: true, explanation: 'Si le système est sous l’origine choisie des altitudes.' },
        { text: 'Le travail du poids dépend du chemin suivi.', answer: false, explanation: 'Le poids est conservatif.' },
        { text: 'Si Ec est constante, la somme des travaux des forces est nulle.', answer: true, explanation: 'Théorème de l’énergie cinétique.' },
        { text: 'Deux objets de masses différentes lâchés de la même hauteur sans frottement arrivent au sol avec la même vitesse.', answer: true, explanation: r`$v = \sqrt{2gh}$ ne dépend pas de m.` },
      ],
    },
  ],
}

export default chapter
