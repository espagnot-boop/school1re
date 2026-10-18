import type { Chapter } from '../types'

const svgComplexe =
  '<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">' +
  '<defs><marker id="ar4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>' +
  // panel 1
  '<g transform="translate(30,10)">' +
  '<path d="M0 90 h35 l15 32 l15 -32 h35 v80 h-100 z" fill="hsl(217 91% 60% / 0.25)" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>' +
  '<polygon points="35,40 65,40 50,72" fill="hsl(25 95% 53% / 0.7)" stroke="hsl(25 95% 53%)" stroke-width="1.5"/>' +
  '<text x="50" y="30" text-anchor="middle" fill="currentColor">substrat S</text>' +
  '<text x="50" y="145" text-anchor="middle" fill="currentColor">enzyme E</text>' +
  '<text x="50" y="195" text-anchor="middle" font-weight="600" fill="currentColor">E + S</text>' +
  '</g>' +
  '<line x1="150" y1="120" x2="240" y2="120" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar4)"/>' +
  // panel 2
  '<g transform="translate(260,10)">' +
  '<path d="M0 90 h35 l15 32 l15 -32 h35 v80 h-100 z" fill="hsl(217 91% 60% / 0.25)" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>' +
  '<polygon points="35,90 65,90 50,122" fill="hsl(25 95% 53% / 0.8)" stroke="hsl(25 95% 53%)" stroke-width="1.5"/>' +
  '<text x="50" y="60" text-anchor="middle" fill="currentColor">site actif occupé</text>' +
  '<line x1="50" y1="66" x2="50" y2="94" stroke="currentColor" stroke-width="1" marker-end="url(#ar4)"/>' +
  '<text x="50" y="195" text-anchor="middle" font-weight="600" fill="currentColor">complexe ES</text>' +
  '</g>' +
  '<line x1="380" y1="120" x2="470" y2="120" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar4)"/>' +
  // panel 3
  '<g transform="translate(490,10)">' +
  '<path d="M0 90 h35 l15 32 l15 -32 h35 v80 h-100 z" fill="hsl(217 91% 60% / 0.25)" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>' +
  '<polygon points="17,76 32,76 32,108" fill="hsl(142 71% 45% / 0.7)" stroke="hsl(142 71% 45%)" stroke-width="1.5"/>' +
  '<polygon points="68,76 83,76 68,108" fill="hsl(263 70% 60% / 0.7)" stroke="hsl(263 70% 60%)" stroke-width="1.5"/>' +
  '<text x="50" y="50" text-anchor="middle" fill="currentColor">produits P1 + P2</text>' +
  '<text x="50" y="195" text-anchor="middle" font-weight="600" fill="currentColor">E + P1 + P2</text>' +
  '</g>' +
  '<text x="320" y="230" text-anchor="middle" fill="currentColor" opacity="0.7">L’enzyme n’est pas consommée : elle est retrouvée intacte à la fin.</text>' +
  '</svg>'

const svgTpH =
  '<svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">' +
  // left plot
  '<g stroke="currentColor" fill="none" stroke-width="1.2"><line x1="50" y1="200" x2="290" y2="200"/><line x1="50" y1="200" x2="50" y2="30"/></g>' +
  '<path d="M50 198 C 100 180, 140 70, 175 52 L 190 56 C 200 100 205 165 215 198" fill="none" stroke="hsl(217 91% 60%)" stroke-width="2.5"/>' +
  '<line x1="175" y1="52" x2="175" y2="200" stroke="currentColor" stroke-dasharray="4 3" opacity="0.5"/>' +
  '<text x="170" y="216" text-anchor="middle" fill="currentColor">T opt ≈ 37 °C</text>' +
  '<text x="290" y="216" text-anchor="end" fill="currentColor">température (°C)</text>' +
  '<text x="54" y="24" fill="currentColor">Vi</text>' +
  '<text x="120" y="130" fill="currentColor" font-size="11" transform="rotate(-50 120 130)">agitation ↑</text>' +
  '<text x="222" y="130" fill="hsl(0 84% 60%)" font-size="11">dénaturation</text>' +
  '<text x="170" y="244" text-anchor="middle" fill="currentColor" font-weight="600">Enzyme humaine (T)</text>' +
  // right plot
  '<g stroke="currentColor" fill="none" stroke-width="1.2"><line x1="350" y1="200" x2="610" y2="200"/><line x1="350" y1="200" x2="350" y2="30"/></g>' +
  '<path d="M356 198 C 372 180, 380 70, 388 52 C 398 62, 410 150, 432 198" fill="none" stroke="hsl(0 84% 60%)" stroke-width="2.5"/>' +
  '<path d="M440 198 C 460 180, 475 70, 490 52 C 502 62, 516 150, 538 198" fill="none" stroke="hsl(142 71% 45%)" stroke-width="2.5"/>' +
  '<line x1="388" y1="52" x2="388" y2="200" stroke="currentColor" stroke-dasharray="4 3" opacity="0.5"/>' +
  '<line x1="490" y1="52" x2="490" y2="200" stroke="currentColor" stroke-dasharray="4 3" opacity="0.5"/>' +
  '<text x="388" y="216" text-anchor="middle" fill="currentColor">pH 2</text>' +
  '<text x="490" y="216" text-anchor="middle" fill="currentColor">pH 8</text>' +
  '<text x="610" y="216" text-anchor="end" fill="currentColor">pH</text>' +
  '<text x="354" y="24" fill="currentColor">Vi</text>' +
  '<text x="372" y="46" fill="hsl(0 84% 60%)" font-size="11">pepsine</text>' +
  '<text x="500" y="46" fill="hsl(142 71% 45%)" font-size="11">trypsine</text>' +
  '<text x="480" y="244" text-anchor="middle" fill="currentColor" font-weight="600">Deux enzymes digestives (pH)</text>' +
  '</svg>'

const svgVoie =
  '<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">' +
  '<defs><marker id="ar4b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>' +
  '<g fill="hsl(217 91% 60% / 0.12)" stroke="hsl(217 91% 60%)" stroke-width="1.3">' +
  '<rect x="10" y="80" width="130" height="44"/><rect x="200" y="80" width="130" height="44"/><rect x="390" y="80" width="130" height="44"/><rect x="560" y="80" width="110" height="44"/></g>' +
  '<g fill="currentColor" text-anchor="middle">' +
  '<text x="75" y="107">Phénylalanine</text><text x="265" y="107">Tyrosine</text><text x="455" y="107">DOPA</text><text x="615" y="107">Mélanine</text></g>' +
  '<g stroke="currentColor" stroke-width="1.5"><line x1="142" y1="102" x2="198" y2="102" marker-end="url(#ar4b)"/><line x1="332" y1="102" x2="388" y2="102" marker-end="url(#ar4b)"/><line x1="522" y1="102" x2="558" y2="102" marker-end="url(#ar4b)"/></g>' +
  '<g fill="hsl(25 95% 53%)" text-anchor="middle" font-weight="600"><text x="170" y="70">enzyme E1</text><text x="360" y="70">enzyme E2</text><text x="540" y="70">E3, E4…</text></g>' +
  '<g fill="currentColor" text-anchor="middle" font-size="11" opacity="0.8"><text x="170" y="56">(phénylalanine hydroxylase)</text><text x="360" y="56">(tyrosinase)</text></g>' +
  '<g stroke="hsl(0 84% 60%)" stroke-width="3"><line x1="158" y1="92" x2="182" y2="112"/><line x1="182" y1="92" x2="158" y2="112"/></g>' +
  '<text x="170" y="150" text-anchor="middle" fill="hsl(0 84% 60%)" font-size="11">E1 déficiente : phénylcétonurie</text>' +
  '<text x="75" y="165" text-anchor="middle" fill="hsl(0 84% 60%)" font-size="11">accumulation (toxique)</text>' +
  '<path d="M75 128 V175" stroke="hsl(0 84% 60%)" stroke-width="1.5" marker-end="url(#ar4b)" fill="none"/>' +
  '<text x="360" y="150" text-anchor="middle" fill="currentColor" font-size="11">E2 déficiente : albinisme</text>' +
  '<text x="340" y="215" text-anchor="middle" fill="currentColor" opacity="0.7">Chaque étape d’une voie métabolique est catalysée par une enzyme spécifique.</text>' +
  '</svg>'

const chapter: Chapter = {
  id: 'enzymes-metabolisme',
  subject: 'svt',
  order: 4,
  title: 'Enzymes et métabolisme',
  theme: 'Transmission, variation et expression du patrimoine génétique',
  summary:
    'Les enzymes, protéines catalytiques à site actif spécifique, accélèrent les réactions du métabolisme ; leur activité dépend de leur structure 3D, donc de la température et du pH, et de l’information génétique qui les code.',
  duration: '2 semaines',
  objectives: [
    'Définir une enzyme, un substrat, un produit, un site actif et un complexe enzyme-substrat.',
    'Expliquer la spécificité de substrat et la spécificité d’action par la structure tridimensionnelle de l’enzyme.',
    'Mesurer et exploiter une vitesse initiale de réaction.',
    'Analyser l’effet de la concentration en substrat, de la température et du pH sur l’activité enzymatique.',
    'Relier dénaturation, perte de structure 3D et perte de fonction.',
    'Définir le métabolisme et une voie métabolique ; relier gène, enzyme et phénotype (exemples : phénylcétonurie, albinisme).',
  ],
  keywords: [
    'enzyme',
    'substrat',
    'produit',
    'site actif',
    'complexe enzyme-substrat',
    'spécificité',
    'vitesse initiale',
    'température optimale',
    'pH optimal',
    'dénaturation',
    'métabolisme',
    'voie métabolique',
  ],
  fiche: [
    { type: 'h2', text: 'L’essentiel à retenir' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Enzyme',
      content: [
        {
          type: 'p',
          text: 'Une **enzyme** est un **catalyseur biologique** de nature **protéique** (quelques ARN catalytiques existent, les ribozymes). Elle **accélère** une réaction chimique sans être consommée et sans modifier son bilan.',
        },
      ],
    },
    {
      type: 'keyvalue',
      items: [
        { key: 'Substrat (S)', value: 'molécule transformée par l’enzyme.' },
        { key: 'Produit (P)', value: 'molécule formée à l’issue de la réaction.' },
        { key: 'Site actif', value: 'petite région de l’enzyme, en creux, où se lie le substrat (acides aminés de fixation et de catalyse).' },
        { key: 'Complexe enzyme-substrat (ES)', value: 'association transitoire entre enzyme et substrat dans le site actif.' },
        { key: 'Vitesse initiale (Vi)', value: 'vitesse de formation du produit au début de la réaction (pente de la tangente à l’origine).' },
      ],
    },
    { type: 'p', text: 'Mécanisme général : $$E + S \\rightleftharpoons ES \\rightarrow E + P$$' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Deux spécificités',
      content: [
        {
          type: 'list',
          items: [
            '**Spécificité de substrat** : le site actif est **complémentaire** du substrat (forme, charges) : une enzyme n’agit que sur un (ou quelques) substrat(s). Ex. lactase / lactose.',
            '**Spécificité d’action** : l’enzyme ne catalyse qu’**un type de réaction** parmi toutes les réactions possibles du substrat.',
          ],
        },
      ],
    },
    { type: 'h3', text: 'Facteurs d’activité' },
    {
      type: 'table',
      headers: ['Facteur', 'Effet sur Vi', 'Explication'],
      rows: [
        ['[S] croissante', 'Vi augmente puis atteint un **plateau** (Vmax)', 'Toutes les enzymes sont saturées de substrat.'],
        ['Température', 'Optimum (≈ 37 °C pour l’humain), puis chute brutale', 'Agitation moléculaire ↑ puis **dénaturation** irréversible.'],
        ['pH', 'Optimum propre à chaque enzyme', 'Le pH modifie les charges des acides aminés, donc la structure 3D et le site actif.'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      content: [
        {
          type: 'list',
          items: [
            'Séquence d’acides aminés (gène) → structure 3D → site actif → **fonction**. Une mutation peut modifier tout cela.',
            '**Métabolisme** = ensemble des réactions chimiques de la cellule ; une **voie métabolique** = suite de réactions, chacune catalysée par une enzyme spécifique.',
            'Un déficit en une enzyme (allèle muté) bloque une voie : accumulation du substrat, manque du produit → phénotype pathologique (phénylcétonurie, albinisme).',
          ],
        },
      ],
    },
  ],
  cours: [
    { type: 'h2', text: '1. Les enzymes, catalyseurs biologiques' },
    {
      type: 'p',
      text: 'Dans une cellule se déroulent en permanence des milliers de réactions chimiques, à une température modérée (environ 37 °C chez l’être humain) et dans l’eau. Or, hors du vivant, la plupart de ces réactions seraient extrêmement lentes dans de telles conditions. Ce sont les **enzymes** qui les rendent assez rapides pour être compatibles avec la vie.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Un exemple : la catalase',
      content: [
        {
          type: 'p',
          text: 'Le peroxyde d’hydrogène $H_2O_2$ (eau oxygénée), produit toxique du métabolisme cellulaire, se décompose : $2\\,H_2O_2 \\rightarrow 2\\,H_2O + O_2$. Cette réaction est très lente seule. En présence de **catalase** (présente dans le foie ou la pomme de terre), un dégagement vif de dioxygène (effervescence) apparaît. La catalase est présente en fin de réaction, **intacte** : elle n’est pas consommée.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Catalyseur',
      content: [
        {
          type: 'p',
          text: 'Un catalyseur est une substance qui **augmente la vitesse** d’une réaction thermodynamiquement possible, **sans apparaître dans le bilan** et sans modifier l’état final (l’équilibre) ; il abaisse la barrière énergétique (énergie d’activation) à franchir. Les enzymes sont des catalyseurs **très efficaces** (vitesse multipliée par un facteur de $10^6$ à $10^{12}$ ou plus) et **très spécifiques**.',
        },
      ],
    },
    {
      type: 'p',
      text: 'La très grande majorité des enzymes sont des **protéines**, c’est-à-dire des chaînes d’acides aminés repliées dans l’espace. Leur nom se termine souvent par le suffixe **-ase** (lactase, amylase, protéase, ADN polymérase…).',
    },

    { type: 'h2', text: '2. Substrat, site actif et complexe enzyme-substrat' },
    {
      type: 'p',
      text: 'Une enzyme est une grosse molécule comparée à son substrat. Seule une **petite région** de sa surface intervient directement dans la réaction : le **site actif**. C’est une cavité (ou un sillon) dont la forme et la distribution des charges permettent de fixer le substrat.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Site actif',
      content: [
        {
          type: 'p',
          text: 'Le **site actif** est la région de l’enzyme où se lie le substrat et où a lieu la transformation chimique. Il comprend :\n- des **acides aminés de fixation** (ils reconnaissent et maintiennent le substrat) ;\n- des **acides aminés catalytiques** (ils participent à la transformation du substrat).\nCes acides aminés, éloignés dans la séquence primaire, sont **rapprochés par le repliement** de la chaîne dans l’espace.',
        },
      ],
    },
    { type: 'svg', svg: svgComplexe, caption: 'Étapes de la catalyse : fixation du substrat dans le site actif (complexe ES), transformation, libération des produits et enzyme régénérée.' },
    {
      type: 'steps',
      items: [
        { title: 'Reconnaissance et fixation', text: 'Le substrat entre dans le site actif, complémentaire de sa forme : il se forme des liaisons faibles transitoires (liaisons hydrogène, interactions ioniques, hydrophobes) : c’est le **complexe enzyme-substrat** ES.' },
        { title: 'Catalyse', text: 'Dans ce complexe, la structure de l’enzyme et la proximité des acides aminés catalytiques facilitent la transformation chimique du substrat en produit(s).' },
        { title: 'Libération', text: 'Les produits, qui n’ont plus de complémentarité avec le site actif, sont libérés. L’enzyme est **intacte** et peut recommencer : une enzyme transforme ainsi de nombreuses molécules de substrat.' },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Du modèle « clé-serrure » à l’ajustement induit',
      content: [
        {
          type: 'p',
          text: 'En 1894, Emil Fischer proposa le modèle « clé-serrure » : le substrat s’ajuste exactement au site actif rigide. En 1958, Daniel Koshland a montré que le site actif est **souple** et se déforme légèrement à l’approche du substrat (« ajustement induit »). Les deux modèles insistent sur la **complémentarité** entre le site actif et le substrat.',
        },
      ],
    },

    { type: 'h2', text: '3. Les spécificités enzymatiques' },
    { type: 'h3', text: '3.1 Spécificité de substrat' },
    {
      type: 'p',
      text: 'Chaque enzyme ne reconnaît qu’un substrat (ou un petit groupe de substrats très proches) : la **forme et les charges du site actif** ne conviennent qu’à lui. Par exemple, la **lactase** hydrolyse le lactose en glucose et galactose, mais ne peut pas hydrolyser le saccharose, ni le maltose ; la **saccharase** (invertase) hydrolyse le saccharose mais pas le lactose. L’**amylase** hydrolyse l’amidon (chaîne de glucose) mais pas la cellulose.',
    },
    { type: 'h3', text: '3.2 Spécificité d’action' },
    {
      type: 'p',
      text: 'Un même substrat peut subir plusieurs types de réactions (hydrolyse, oxydation, isomérisation…). Une enzyme n’en catalyse **qu’une seule**. Ainsi, l’**activité** de l’enzyme est définie par le type de réaction ; c’est ce qui sert à classer les enzymes (hydrolases, oxydoréductases, isomérases, ligases…).',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ne pas confondre',
      content: [
        {
          type: 'list',
          items: [
            'La **spécificité** vient de la **complémentarité** entre le site actif et le substrat, donc de la **structure 3D**, elle-même déterminée par la **séquence d’acides aminés**, donc par le **gène**.',
            'L’enzyme n’est **pas** « utilisée » ni « détruite » : c’est le **substrat** qui est consommé.',
            'L’enzyme n’apporte pas d’énergie : elle **accélère** seulement une réaction déjà possible.',
          ],
        },
      ],
    },

    { type: 'h2', text: '4. Mesurer l’activité d’une enzyme : la vitesse initiale' },
    {
      type: 'p',
      text: 'Pour comparer l’activité d’une enzyme dans différentes conditions, on suit au cours du temps la **quantité de produit formé** (ou de substrat disparu), par exemple par colorimétrie, volume de gaz dégagé, mesure d’absorbance…',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Vitesse initiale',
      content: [
        {
          type: 'p',
          text: 'La **vitesse initiale** $V_i$ est la vitesse de formation du produit **au tout début** de la réaction. Graphiquement, c’est la **pente de la tangente à l’origine** de la courbe $[P] = f(t)$ :\n$$V_i = \\left(\\frac{\\Delta [P]}{\\Delta t}\\right)_{t \\to 0}$$\nUnité : par exemple mmol·L⁻¹·min⁻¹.',
        },
      ],
    },
    {
      type: 'p',
      text: 'Pourquoi la vitesse **diminue-t-elle** ensuite ? Parce que la quantité de substrat diminue (donc les enzymes sont moins souvent « occupées »), parce que les produits s’accumulent et, parfois, ralentissent la réaction, et que la réaction approche de son état final. On mesure donc $V_i$ **au début**, quand $[S]$ est connue et quasi constante : c’est ce qui permet de comparer des conditions différentes.',
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Méthode : déterminer une vitesse initiale',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Tracer la courbe $[P] = f(t)$.',
            'Tracer la **tangente à la courbe à l’origine**.',
            'Choisir deux points de cette droite éloignés et calculer $\\Delta [P] / \\Delta t$.',
            'Donner la valeur avec son unité.',
          ],
        },
      ],
    },

    { type: 'h2', text: '5. Influence de la concentration en substrat' },
    {
      type: 'p',
      text: 'À concentration d’enzyme constante, quand on augmente la concentration en substrat $[S]$, la vitesse initiale **augmente d’abord presque proportionnellement**, puis de moins en moins vite, jusqu’à un **plateau** appelé **vitesse maximale** $V_{max}$.',
    },
    {
      type: 'p',
      text: '**Interprétation** : à faible $[S]$, de nombreux sites actifs sont libres ; plus il y a de substrat, plus il se forme de complexes ES et plus la vitesse est grande. À forte $[S]$, **tous les sites actifs sont occupés** (enzymes saturées) : ajouter du substrat ne change plus rien, la vitesse est limitée par le nombre d’enzymes et par la vitesse de la catalyse.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Pour aller plus loin (hors programme)',
      content: [
        {
          type: 'p',
          text: 'La courbe est une hyperbole décrite par l’équation de Michaelis-Menten : $$V_i = \\frac{V_{max} [S]}{K_m + [S]}$$ où $K_m$ (constante de Michaelis) est la concentration en substrat pour laquelle $V_i = V_{max}/2$ : plus $K_m$ est faible, plus l’enzyme a une grande affinité pour son substrat.',
        },
      ],
    },
    { type: 'widget', id: 'enzyme-kinetics', title: 'Simulation : [S], température et pH', caption: 'Faire varier [S] et observer le plateau ; modifier la température et le pH pour retrouver les optimums et la dénaturation.' },

    { type: 'h2', text: '6. Influence de la température' },
    {
      type: 'p',
      text: 'Lorsque la température augmente, l’agitation moléculaire s’accroît : substrats et enzymes se rencontrent plus souvent et avec plus d’énergie ; la vitesse initiale **augmente**. Mais au-delà d’une certaine température, les liaisons faibles qui stabilisent la structure 3D de l’enzyme se rompent : la **protéine se déforme**, le site actif perd sa forme et ne reconnaît plus le substrat : l’enzyme est **dénaturée** et l’activité **chute brutalement**.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Température optimale',
      content: [
        {
          type: 'p',
          text: 'La **température optimale** est la température pour laquelle la vitesse initiale est maximale. Elle dépend de l’enzyme et de l’espèce : environ **37 °C** pour les enzymes humaines, **72 °C** pour la Taq polymérase de la bactérie thermophile *Thermus aquaticus* (utilisée en PCR).',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Situation', 'Effet', 'Réversible ?'],
      rows: [
        ['Basse température (0 °C…)', 'Agitation faible, activité très ralentie ; structure conservée', '**Oui** : l’activité réapparaît en réchauffant'],
        ['Température optimale', 'Activité maximale', '—'],
        ['Température élevée (> 50–60 °C pour beaucoup d’enzymes humaines)', 'Perte de la structure 3D : **dénaturation**', '**Non** (en général)'],
      ],
    },
    { type: 'svg', svg: svgTpH, caption: 'Effet de la température (à gauche) et du pH (à droite) sur la vitesse initiale : chaque enzyme a ses conditions optimales.' },

    { type: 'h2', text: '7. Influence du pH' },
    {
      type: 'p',
      text: 'Certains acides aminés possèdent des groupes qui se chargent ou se déchargent selon le pH (acide aspartique, lysine…). Une variation de pH modifie donc la **répartition des charges** de l’enzyme, donc les interactions qui maintiennent sa structure et celles qui fixent le substrat. Chaque enzyme a un **pH optimal** :',
    },
    {
      type: 'table',
      headers: ['Enzyme', 'Lieu d’action', 'pH optimal approximatif'],
      rows: [
        ['Pepsine', 'estomac (suc gastrique)', '≈ 2'],
        ['Amylase salivaire', 'bouche', '≈ 7'],
        ['Trypsine', 'intestin grêle (suc pancréatique)', '≈ 8'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      content: [
        {
          type: 'p',
          text: 'Les conditions optimales de chaque enzyme sont adaptées à son **milieu d’action** (pH, température). Hors de ces conditions, l’activité diminue ; en cas d’extrême (pH très éloigné, chaleur), l’enzyme est **dénaturée**.',
        },
      ],
    },

    { type: 'h2', text: '8. De la séquence du gène à l’activité de l’enzyme' },
    {
      type: 'p',
      text: 'L’enzyme étant une protéine, sa séquence d’acides aminés est codée par un **gène**. La séquence détermine le repliement, donc la forme du site actif, donc la **fonction** :',
    },
    { type: 'math', tex: '\\text{gène (ADN)} \\longrightarrow \\text{séquence d’acides aminés} \\longrightarrow \\text{structure 3D} \\longrightarrow \\text{site actif} \\longrightarrow \\text{activité enzymatique} \\longrightarrow \\text{phénotype}' },
    {
      type: 'p',
      text: 'Une **mutation** (substitution, insertion, délétion) peut modifier la séquence de l’enzyme :\n- **sans effet** (mutation silencieuse, ou acide aminé éloigné du site actif) ;\n- avec une **activité réduite ou nulle** (acide aminé du site actif modifié, repliement perturbé) ;\n- exceptionnellement, avec une activité modifiée, voire améliorée.\nLes différents **allèles** d’un gène peuvent ainsi coder des enzymes d’activités différentes : c’est un des niveaux d’explication de la **variation du phénotype**.',
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Un gène, une enzyme',
      content: [
        {
          type: 'p',
          text: 'En 1941, George Beadle et Edward Tatum ont irradié le champignon *Neurospora crassa* et obtenu des mutants incapables de synthétiser certaines molécules (par exemple un acide aminé) : chaque mutant avait une **enzyme déficiente**, due à la mutation d’**un gène**. Ils en ont déduit l’hypothèse « un gène – une enzyme » (aujourd’hui « un gène – un polypeptide »), prix Nobel 1958.',
        },
      ],
    },

    { type: 'h2', text: '9. Métabolisme et voies métaboliques' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Métabolisme',
      content: [
        {
          type: 'p',
          text: 'Le **métabolisme** est l’ensemble des réactions chimiques qui se déroulent dans une cellule ou un organisme. On distingue :\n- le **catabolisme** : dégradation de molécules complexes en molécules plus simples, avec libération d’énergie (ex. respiration, glycolyse) ;\n- l’**anabolisme** : synthèse de molécules complexes à partir de molécules simples, consommant de l’énergie (ex. synthèse de protéines, photosynthèse).',
        },
      ],
    },
    {
      type: 'p',
      text: 'Les réactions du métabolisme ne sont pas isolées : elles forment des **voies métaboliques**, suites ordonnées de réactions où le produit d’une réaction est le substrat de la suivante. **Chaque étape** est catalysée par une **enzyme spécifique**. Exemple : la **glycolyse** transforme dans le cytoplasme une molécule de glucose en deux molécules de pyruvate par dix réactions successives, chacune catalysée par une enzyme particulière.',
    },
    { type: 'svg', svg: svgVoie, caption: 'Une voie métabolique : un défaut d’une seule enzyme peut bloquer toute la voie.' },
    {
      type: 'callout',
      variant: 'example',
      title: 'La phénylcétonurie',
      content: [
        {
          type: 'p',
          text: 'Chez une personne saine, la **phénylalanine hydroxylase** (PAH) transforme la phénylalanine, acide aminé apporté par l’alimentation, en tyrosine. Dans la phénylcétonurie (maladie génétique à transmission autosomique récessive), les deux allèles du gène *PAH* sont mutés : l’enzyme est inactive ou peu active. La phénylalanine **s’accumule** dans le sang et devient toxique pour le cerveau en développement (déficience intellectuelle). Un **régime pauvre en phénylalanine**, instauré dès la naissance après dépistage néonatal, permet un développement normal : le phénotype dépend à la fois du génotype **et** de l’environnement (alimentation).',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Régulation des voies (hors programme)',
      content: [
        {
          type: 'p',
          text: 'Les voies métaboliques sont régulées : un excès de produit final peut freiner l’activité d’une enzyme située en début de voie (**rétrocontrôle négatif**), évitant de gaspiller des ressources. Certaines molécules, les **inhibiteurs**, se fixent sur l’enzyme et diminuent son activité : un inhibiteur **compétitif** ressemble au substrat et occupe le site actif.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Bilan',
      content: [
        {
          type: 'list',
          items: [
            'Une enzyme est un catalyseur protéique : spécifique, efficace, non consommé.',
            'Elle agit via son **site actif** en formant un **complexe ES**.',
            'Son activité (**Vi**) dépend de $[S]$, de la température et du pH, car ils modifient sa **structure 3D**.',
            'Le métabolisme est organisé en **voies** où chaque étape est enzymatique ; l’information génétique des enzymes explique des variations du phénotype.',
          ],
        },
      ],
    },
  ],
  exercices: [
    {
      id: 'ex-vi-graphique',
      title: 'Déterminer une vitesse initiale',
      difficulty: 1,
      duration: 10,
      tags: ['vitesse initiale', 'graphique'],
      statement: [
        {
          type: 'p',
          text: 'On suit la formation d’un produit P par une enzyme à 37 °C. La concentration en produit est mesurée au cours du temps :',
        },
        {
          type: 'table',
          headers: ['t (min)', '0', '1', '2', '3', '4', '5'],
          rows: [['[P] (mmol·L⁻¹)', '0', '2,0', '3,6', '4,8', '5,6', '6,0']],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Décrire l’évolution de $[P]$ au cours du temps.',
            'Estimer la vitesse initiale de la réaction.',
            'Proposer une explication au ralentissement observé après 3 minutes.',
          ],
        },
      ],
      hints: ['La vitesse initiale correspond au début de la réaction : regardez l’intervalle 0–1 min.', 'Calculez aussi les vitesses moyennes sur chaque intervalle pour voir leur évolution.'],
      solution: [
        { type: 'p', text: '**1.** $[P]$ augmente de plus en plus lentement et tend vers un **plateau** d’environ 6 mmol·L⁻¹.' },
        {
          type: 'p',
          text: '**2.** Sur le premier intervalle : $\\Delta [P]/\\Delta t = (2{,}0 - 0)/(1 - 0) = 2{,}0$ mmol·L⁻¹·min⁻¹. La pente de la tangente à l’origine est un peu supérieure puisque la courbe est concave ; on retient $V_i \\approx 2$ mmol·L⁻¹·min⁻¹.',
        },
        {
          type: 'p',
          text: 'Vitesses moyennes par intervalle : 2,0 ; 1,6 ; 1,2 ; 0,8 ; 0,4 mmol·L⁻¹·min⁻¹ : la vitesse **diminue** régulièrement.',
        },
        {
          type: 'p',
          text: '**3.** Le substrat est progressivement consommé : sa concentration diminue, donc les enzymes forment moins souvent des complexes ES. Il est vraisemblable que la réaction approche de la fin, le substrat étant presque épuisé (plateau).',
        },
      ],
    },
    {
      id: 'ex-lactase',
      title: 'Spécificité de la lactase',
      difficulty: 1,
      duration: 12,
      tags: ['spécificité', 'substrat'],
      statement: [
        {
          type: 'p',
          text: 'On met en présence de la lactase différents sucres, puis on recherche du glucose avec une bandelette test (positive : le glucose est présent).',
        },
        {
          type: 'table',
          headers: ['Tube', 'Contenu', 'Glucose détecté après 15 min à 37 °C'],
          rows: [
            ['1', 'lactose + lactase', 'oui'],
            ['2', 'saccharose + lactase', 'non'],
            ['3', 'maltose + lactase', 'non'],
            ['4', 'lactose + eau (sans enzyme)', 'non'],
            ['5', 'lactose + lactase chauffée 10 min à 100 °C', 'non'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quel est le rôle des tubes 4 et 5 ?',
            'Quelle propriété de l’enzyme montrent les tubes 1, 2 et 3 ? Expliquer.',
            'Interpréter le résultat du tube 5.',
          ],
        },
      ],
      hints: ['Un tube « témoin » ne contient pas un des éléments étudiés.', 'Pensez à la complémentarité site actif – substrat.'],
      solution: [
        { type: 'p', text: '**1.** Le tube 4 est un **témoin sans enzyme** : il montre que le lactose ne se transforme pas spontanément en glucose dans ces conditions, donc que la lactase est responsable de la réaction dans le tube 1. Le tube 5 est un **témoin avec enzyme inactivée** : il montre que c’est bien l’enzyme *active* qui produit le glucose.' },
        { type: 'p', text: '**2.** La lactase ne produit du glucose qu’à partir du lactose : elle présente une **spécificité de substrat**. Le saccharose et le maltose ont une forme différente de celle du lactose : ils ne sont pas complémentaires du site actif de la lactase et ne peuvent donc pas s’y fixer ni former un complexe enzyme-substrat.' },
        { type: 'p', text: '**3.** À 100 °C, la lactase est **dénaturée** : sa structure tridimensionnelle est détruite, donc son site actif perd sa forme : le lactose ne peut plus se fixer, aucune réaction n’a lieu. Cette dénaturation est irréversible : le refroidissement ne restaurerait pas l’activité.' },
      ],
    },
    {
      id: 'ex-vi-substrat',
      title: 'Vitesse initiale et concentration en substrat',
      difficulty: 2,
      duration: 15,
      tags: ['[S]', 'Vmax', 'saturation'],
      statement: [
        {
          type: 'p',
          text: 'On mesure la vitesse initiale d’une enzyme à concentration constante en enzyme, pour différentes concentrations en substrat :',
        },
        {
          type: 'table',
          headers: ['[S] (mmol·L⁻¹)', '0,5', '1', '2', '4', '8', '16', '32'],
          rows: [['Vi (µmol·min⁻¹)', '11', '20', '33', '50', '67', '80', '89']],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tracer (ou décrire) la courbe $V_i = f([S])$ et donner son allure.',
            'Expliquer pourquoi la vitesse tend vers une limite.',
            'Estimer la vitesse maximale et la concentration en substrat pour laquelle $V_i = V_{max}/2$.',
            'Que deviendrait la valeur de $V_{max}$ si on doublait la quantité d’enzyme ? Justifier.',
          ],
        },
      ],
      hints: ['Observez le rapport entre l’augmentation de [S] et celle de Vi aux faibles puis aux fortes valeurs.', 'La valeur 89 n’est pas encore tout à fait le plateau.'],
      solution: [
        { type: 'p', text: '**1.** La courbe est **croissante** : quasi linéaire aux faibles [S] (de 0,5 à 1 mmol·L⁻¹ la vitesse double presque), puis de plus en plus aplatie ; elle tend vers un **plateau** (allure d’hyperbole).' },
        { type: 'p', text: '**2.** À faible [S], beaucoup de sites actifs sont libres : plus de substrat → plus de complexes ES → vitesse plus grande. À forte [S], **tous les sites actifs sont occupés** : l’enzyme est saturée, la vitesse ne dépend plus que du nombre d’enzymes et de leur vitesse de catalyse.' },
        { type: 'p', text: '**3.** Le plateau n’est pas totalement atteint à 32 mmol·L⁻¹ (89 µmol·min⁻¹), mais on voit qu’il avoisine **100 µmol·min⁻¹** : $V_{max} \\approx 100$ µmol·min⁻¹. La moitié, 50 µmol·min⁻¹, est atteinte pour $[S] = 4$ mmol·L⁻¹ (c’est la constante de Michaelis $K_m$).' },
        { type: 'p', text: '**4.** $V_{max}$ serait **doublée** : à saturation, la vitesse est proportionnelle au nombre de sites actifs disponibles, donc à la quantité d’enzyme.' },
      ],
    },
    {
      id: 'ex-ph-enzymes',
      title: 'pH et enzymes digestives',
      difficulty: 2,
      duration: 15,
      tags: ['pH', 'digestion'],
      statement: [
        {
          type: 'p',
          text: 'On mesure l’activité relative (en % de l’activité maximale) de deux enzymes digestives en fonction du pH, à 37 °C :',
        },
        {
          type: 'table',
          headers: ['pH', '1', '2', '3', '5', '7', '8', '9', '10'],
          rows: [
            ['Pepsine', '70', '100', '60', '5', '0', '0', '0', '0'],
            ['Trypsine', '0', '0', '2', '10', '70', '100', '75', '30'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Déterminer le pH optimal de chaque enzyme.',
            'Le suc gastrique a un pH voisin de 2 et le contenu de l’intestin grêle un pH voisin de 8. Mettre en relation ces données avec le tableau.',
            'Expliquer pourquoi une variation de pH modifie l’activité d’une enzyme.',
          ],
        },
      ],
      hints: ['Cherchez la valeur 100 dans chaque ligne.', 'Pensez aux charges portées par les acides aminés et à la structure 3D.'],
      solution: [
        { type: 'p', text: '**1.** pH optimal : **2** pour la pepsine, **8** pour la trypsine (activité maximale 100 %).' },
        { type: 'p', text: '**2.** Chaque enzyme est active dans le milieu où elle agit : la pepsine a son optimum à pH 2, celui de l’estomac ; la trypsine à pH 8, celui de l’intestin grêle. Dans l’intestin, la pepsine (0 %) est inactive, et dans l’estomac la trypsine l’est aussi : les enzymes sont **adaptées à leur milieu d’action**.' },
        { type: 'p', text: '**3.** Le pH modifie l’état d’ionisation de certains acides aminés de l’enzyme (charges + ou −). Les interactions stabilisant la structure 3D, ainsi que celles qui fixent le substrat dans le site actif, sont donc modifiées : le site actif est déformé ou ne reconnaît plus le substrat. Aux pH extrêmes, l’enzyme est dénaturée.' },
      ],
    },
    {
      id: 'ex-temperature',
      title: 'Température : activité et dénaturation',
      difficulty: 2,
      duration: 20,
      tags: ['température', 'dénaturation', 'réversibilité'],
      statement: [
        {
          type: 'p',
          text: 'Une enzyme A est placée 10 minutes à différentes températures, puis on mesure sa vitesse initiale **à 37 °C** (lignes « après »), ou bien on mesure sa vitesse **à la température du traitement** (ligne « pendant »).',
        },
        {
          type: 'table',
          headers: ['Température (°C)', '0', '20', '37', '50', '60', '80'],
          rows: [
            ['Vi pendant (unités arbitraires)', '5', '50', '100', '40', '2', '0'],
            ['Vi mesurée à 37 °C après traitement', '100', '100', '100', '70', '3', '0'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Décrire les variations de Vi « pendant » en fonction de la température.',
            'Comparer les deux lignes pour 0 °C et 20 °C, puis pour 60 °C et 80 °C. Que peut-on en conclure ?',
            'Expliquer la différence de comportement à 50 °C.',
            'Pourquoi le froid permet-il de conserver des aliments alors que la chaleur (cuisson, pasteurisation) permet de les stériliser ?',
          ],
        },
      ],
      hints: ['Comparez l’activité mesurée pendant et celle retrouvée après retour à 37 °C.', '50 °C est une température où la dénaturation commence.'],
      solution: [
        { type: 'p', text: '**1.** Vi augmente de 0 °C à 37 °C (optimum : 100), puis chute fortement à 50 °C (40) et s’annule vers 60–80 °C.' },
        { type: 'p', text: '**2.** À 0 et 20 °C, l’activité mesurée *pendant* est faible mais l’enzyme retrouve **100 %** à 37 °C : la baisse d’activité est **réversible** (ralentissement, pas de dommage structural). À 60 et 80 °C, l’activité est nulle ou presque, et **ne revient pas** à 37 °C : la perte est **irréversible** : l’enzyme est dénaturée.' },
        { type: 'p', text: '**3.** À 50 °C, la dénaturation est **partielle** : une partie des molécules d’enzyme a perdu sa structure (30 % d’activité perdue de façon irréversible) ; de plus, l’agitation moléculaire dépasse l’optimum.' },
        { type: 'p', text: '**4.** Le froid ralentit les enzymes (celles des micro-organismes comme celles des aliments) sans les détruire : le développement bactérien est ralenti. La chaleur **dénature** irréversiblement les enzymes, y compris celles des micro-organismes, qui meurent.' },
      ],
    },
    {
      id: 'ex-mutation-site-actif',
      title: 'Effet d’une mutation sur une enzyme',
      difficulty: 3,
      duration: 20,
      tags: ['mutation', 'gène', 'enzyme', 'phénotype'],
      statement: [
        {
          type: 'p',
          text: 'Une enzyme E hydrolyse un substrat S. Dans la zone du gène codant son site actif, on compare la séquence de l’allèle A1 (activité normale) avec celles de deux allèles mutés :',
        },
        {
          type: 'table',
          headers: ['Allèle', 'Séquence du brin non transcrit (codons 1 à 4)', 'Activité enzymatique'],
          rows: [
            ['A1 (référence)', 'GAT GGC TTT AAA', '100 %'],
            ['A2', 'GAT GGC TTC AAA', '100 %'],
            ['A3', 'GAT GAC TTT AAA', '0 %'],
          ],
        },
        {
          type: 'p',
          text: 'Données (codons de l’ARNm) : GAU et GAC = acide aspartique ; GGC = glycine ; UUU et UUC = phénylalanine ; AAA = lysine.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Traduire les quatre premiers codons de l’allèle A1 en acides aminés (en passant par l’ARNm).',
            'Comparer A2 et A1 : type de mutation, conséquence sur la protéine, explication de l’activité normale.',
            'Comparer A3 et A1 : type de mutation et conséquence sur la protéine ; expliquer l’absence d’activité.',
            'Une personne hétérozygote A1//A3 a-t-elle probablement une activité enzymatique ? Justifier en une phrase.',
          ],
        },
      ],
      hints: ['L’ARNm est identique au brin non transcrit avec U à la place de T.', 'Un acide aminé du site actif a une fonction précise : sa modification peut tout bloquer.'],
      solution: [
        { type: 'p', text: '**1.** ARNm de A1 : GAU GGC UUU AAA → **Asp – Gly – Phe – Lys**.' },
        { type: 'p', text: '**2.** A2 : substitution d’un T par un C en troisième position du codon 3 : UUC code aussi la phénylalanine (code génétique **redondant**) → mutation **silencieuse** : protéine identique, activité normale.' },
        { type: 'p', text: '**3.** A3 : substitution G → A dans le codon 2 : GAC code l’acide aspartique au lieu de la glycine → mutation **faux-sens** : la protéine a un acide aminé différent (Asp à la place de Gly) dans la région du site actif. Ce changement de charge/taille modifie la forme et les interactions du site actif : le substrat ne s’y fixe plus ou n’est plus transformé. L’activité est nulle.' },
        { type: 'p', text: '**4.** Oui : l’allèle A1 reste fonctionnel et produit des enzymes actives ; une activité partielle (voisine de 50 %) est probable, généralement suffisante pour un phénotype normal (maladies récessives).' },
      ],
    },
    {
      id: 'ex-bac-pcu',
      title: 'Type bac : la phénylcétonurie',
      difficulty: 3,
      duration: 35,
      tags: ['type bac', 'phénylcétonurie', 'métabolisme', 'gène'],
      statement: [
        {
          type: 'p',
          text: 'La phénylcétonurie (PCU) est une maladie héréditaire du métabolisme. Chez une personne saine, la **phénylalanine** (Phe), acide aminé apporté par les protéines alimentaires, est en grande partie transformée en **tyrosine** (Tyr) dans le foie par une enzyme, la **phénylalanine hydroxylase (PAH)**, codée par un gène situé sur le chromosome 12.',
        },
        {
          type: 'table',
          caption: 'Document 1 : concentrations plasmatiques approximatives',
          headers: ['', 'Phe (µmol·L⁻¹)', 'Tyr (µmol·L⁻¹)', 'Activité PAH hépatique'],
          rows: [
            ['Personne saine', '60 à 120', '40 à 80', '100 %'],
            ['Enfant atteint non traité', '> 1 200', '20 à 40', '< 1 %'],
            ['Enfant atteint avec régime pauvre en Phe', '120 à 360', '40 à 80', '< 1 %'],
          ],
        },
        {
          type: 'p',
          text: '**Document 2** : dans l’allèle muté le plus fréquent en France, une substitution remplace l’arginine en position 408 de la PAH par un tryptophane. Cet acide aminé est éloigné du site actif dans la séquence, mais joue un rôle dans le repliement de la protéine ; la protéine produite est très instable et rapidement dégradée dans les cellules.',
        },
        {
          type: 'p',
          text: '**Document 3** : deux parents sains ont un premier enfant atteint de PCU. Le risque pour un nouvel enfant d’être atteint est de 1 sur 4.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'À partir du document 1, expliquer les concentrations en Phe et en Tyr observées chez l’enfant atteint non traité.',
            'Expliquer à l’aide du document 2 comment une mutation du gène PAH peut conduire à l’absence d’activité enzymatique alors que la mutation est éloignée du site actif.',
            'Interpréter l’effet du régime et expliquer pourquoi le phénotype dépend aussi de l’environnement.',
            'Déterminer le mode de transmission de la maladie et justifier le risque de 1/4 (document 3) par un échiquier de croisement.',
          ],
        },
      ],
      hints: [
        'Pensez à la voie Phe → Tyr et à ce qui se passe quand l’enzyme manque.',
        'Une mutation peut affecter la structure 3D globale, pas seulement le site actif.',
        'Parents sains avec enfant malade : l’allèle de la maladie est récessif ; les parents sont hétérozygotes.',
      ],
      solution: [
        { type: 'p', text: '**1.** Chez l’enfant non traité, l’activité de la PAH est quasi nulle : la transformation Phe → Tyr est bloquée. La Phe, apportée par l’alimentation, **s’accumule** (> 1 200 µmol·L⁻¹ contre 60–120 chez la personne saine) et la Tyr, dont la formation est réduite, est **plus basse** (20 à 40 µmol·L⁻¹, une partie provient de l’alimentation). La voie métabolique est interrompue à l’étape catalysée par la PAH.' },
        { type: 'p', text: '**2.** La substitution Arg → Trp modifie la séquence d’acides aminés de la PAH. Même éloignée du site actif, elle modifie des interactions qui stabilisent le repliement de la chaîne : la structure 3D est altérée, la protéine est instable et rapidement dégradée. Le site actif ne peut donc plus se former correctement, et la quantité d’enzyme fonctionnelle est quasi nulle. La séquence (donc le gène) détermine la structure et donc la fonction.' },
        { type: 'p', text: '**3.** Le régime pauvre en Phe réduit l’apport du substrat dont l’enzyme n’est plus capable de se débarrasser : la phénylalanine plasmatique reste dans des valeurs peu toxiques (120–360), alors que l’activité de la PAH est toujours nulle. Le **génotype est le même**, mais le **phénotype** (concentration de Phe, développement du cerveau) est différent : le phénotype résulte de l’interaction entre le génotype et l’environnement.' },
        {
          type: 'p',
          text: '**4.** Les parents sont sains et ont un enfant malade : l’allèle de la maladie (m) est **récessif** et les parents en portent une copie sans être atteints (**hétérozygotes**, N//m). Le gène étant sur le chromosome 12 (un autosome), la transmission est **autosomique récessive**. Échiquier :',
        },
        {
          type: 'table',
          headers: ['gamètes', 'N (1/2)', 'm (1/2)'],
          rows: [
            ['N (1/2)', 'N//N (1/4) sain', 'N//m (1/4) sain, porteur'],
            ['m (1/2)', 'm//N (1/4) sain, porteur', 'm//m (1/4) **malade**'],
          ],
        },
        { type: 'p', text: 'Probabilité d’un enfant atteint : $1/2 \\times 1/2 = 1/4$. Le risque est le même à chaque grossesse (les événements sont indépendants).' },
      ],
    },
    {
      id: 'ex-inhibiteur',
      title: 'Un inhibiteur compétitif (approfondissement)',
      difficulty: 3,
      duration: 20,
      tags: ['inhibiteur', 'site actif', 'Vmax'],
      statement: [
        {
          type: 'p',
          text: 'La succinate déshydrogénase transforme le succinate (substrat). Le malonate, de forme très voisine, est ajouté dans certains essais. On mesure la vitesse initiale :',
        },
        {
          type: 'table',
          headers: ['[succinate] (mmol·L⁻¹)', '1', '2', '4', '8', '16', '32'],
          rows: [
            ['Vi sans malonate (µmol·min⁻¹)', '20', '33', '50', '67', '80', '89'],
            ['Vi avec malonate (µmol·min⁻¹)', '8', '14', '25', '40', '57', '73'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Comparer les deux séries : que fait le malonate ?',
            'Pourquoi, avec le malonate, la vitesse se rapproche-t-elle de la valeur sans malonate quand [S] est très élevée ?',
            'Proposer un mécanisme moléculaire de l’action du malonate.',
          ],
        },
      ],
      hints: ['Comparez les rapports à faible puis à forte [S].', 'Que se passe-t-il quand il y a beaucoup plus de substrat que d’inhibiteur ?'],
      solution: [
        { type: 'p', text: '**1.** À chaque [S], Vi est plus faible avec malonate : il **ralentit** la réaction (inhibiteur) ; l’effet est fort à faible [S] (8 contre 20 pour 1 mmol·L⁻¹) et faible à forte [S] (73 contre 89).' },
        { type: 'p', text: '**2.** Quand [S] est très grande, les molécules de substrat l’emportent largement dans la compétition pour les sites actifs : presque toutes les enzymes se lient au succinate et on tend vers la même $V_{max}$.' },
        { type: 'p', text: '**3.** Le malonate, de forme proche du succinate, se fixe dans le **site actif** sans pouvoir être transformé : il entre en **compétition** avec le substrat (inhibition compétitive) et empêche transitoirement la formation de complexes ES productifs. L’inhibition est **réversible** : elle diminue quand [S] augmente.' },
      ],
    },
  ],
  representations: [
    { type: 'widget', id: 'enzyme-kinetics', title: 'Cinétique enzymatique interactive', caption: 'Modifiez [S], la température et le pH : comment la vitesse initiale change-t-elle ? À quelles conditions l’enzyme est-elle dénaturée ?' },
    { type: 'svg', svg: svgComplexe, caption: 'Schéma bilan : formation du complexe enzyme-substrat et libération des produits.' },
    { type: 'svg', svg: svgVoie, caption: 'Voie métabolique et conséquences d’un défaut enzymatique.' },
    { type: 'svg', svg: svgTpH, caption: 'Vitesse initiale en fonction de la température et du pH.' },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Une enzyme est :',
          choices: ['un catalyseur biologique, le plus souvent protéique', 'un substrat consommé par la réaction', 'un produit de réaction', 'un sucre'],
          answer: 0,
          explanation: 'Une enzyme est un catalyseur le plus souvent protéique ; elle n’est pas consommée.',
        },
        {
          question: 'Le site actif est :',
          choices: ['toute la surface de l’enzyme', 'la région de l’enzyme où se fixe et se transforme le substrat', 'le gène codant l’enzyme', 'le produit de la réaction'],
          answer: 1,
        },
        {
          question: 'Après la réaction, l’enzyme est :',
          choices: ['détruite', 'transformée en produit', 'retrouvée intacte', 'dénaturée'],
          answer: 2,
        },
        {
          question: 'La spécificité de substrat est due à :',
          choices: ['la température', 'la complémentarité entre le substrat et le site actif', 'la concentration en produit', 'la couleur du substrat'],
          answer: 1,
        },
        {
          question: 'Quand [S] devient très grande, la vitesse initiale :',
          choices: ['augmente indéfiniment', 'diminue à zéro', 'tend vers un plateau (Vmax)', 'devient négative'],
          answer: 2,
          explanation: 'Toutes les enzymes sont saturées : la vitesse est maximale.',
        },
        {
          question: 'Une enzyme humaine chauffée à 90 °C :',
          choices: ['est plus active', 'est dénaturée', 'ne change pas', 'change de substrat'],
          answer: 1,
        },
        {
          question: 'La pepsine a un pH optimal de 2. Elle agit :',
          choices: ['dans la bouche', 'dans l’estomac', 'dans l’intestin grêle', 'dans le sang'],
          answer: 1,
        },
        {
          question: 'Une voie métabolique est :',
          choices: ['une suite de réactions, chacune catalysée par une enzyme', 'une artère', 'un chemin d’une protéine dans la cellule', 'une mutation'],
          answer: 0,
        },
        {
          question: 'Dans la phénylcétonurie, on observe :',
          choices: ['trop de PAH', 'un manque de phénylalanine', 'une accumulation de phénylalanine', 'une excellente activité enzymatique'],
          answer: 2,
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Enzyme', back: 'Catalyseur biologique, le plus souvent une protéine ; accélère une réaction sans être consommée.' },
        { front: 'Substrat', back: 'Molécule sur laquelle agit l’enzyme (transformée en produit).' },
        { front: 'Site actif', back: 'Région en creux de l’enzyme qui fixe le substrat et catalyse la réaction.' },
        { front: 'Complexe enzyme-substrat', back: 'Association transitoire E–S dans le site actif.' },
        { front: 'Spécificité de substrat', back: 'Une enzyme ne reconnaît qu’un substrat (complémentarité avec le site actif).' },
        { front: 'Spécificité d’action', back: 'Une enzyme ne catalyse qu’un seul type de réaction.' },
        { front: 'Vitesse initiale', back: 'Vitesse de formation du produit au début de la réaction ; pente de la tangente à l’origine de [P] = f(t).' },
        { front: 'Dénaturation', back: 'Perte de la structure 3D (température élevée, pH extrême) : site actif détruit, perte de fonction, en général irréversible.' },
        { front: 'Température optimale (enzymes humaines)', back: 'Environ 37 °C.' },
        { front: 'Métabolisme', back: 'Ensemble des réactions chimiques d’une cellule ou d’un organisme (catabolisme + anabolisme).' },
        { front: 'Voie métabolique', back: 'Suite de réactions où chaque étape est catalysée par une enzyme spécifique.' },
        { front: 'Pourquoi un déficit enzymatique est-il génétique ?', back: 'L’enzyme est une protéine codée par un gène ; un allèle muté peut coder une enzyme non fonctionnelle.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter le texte',
      text: 'Une {{enzyme}} est un catalyseur biologique de nature {{protéique|protéine}}. Elle se fixe sur son {{substrat}} dans son {{site actif}}, formant le complexe {{enzyme-substrat}}. À {{température élevée|haute température}}, l’enzyme est {{dénaturée}} et perd sa structure {{tridimensionnelle|3D}}.',
    },
    {
      type: 'matching',
      title: 'Associer enzyme et substrat',
      pairs: [
        { left: 'Lactase', right: 'Lactose' },
        { left: 'Amylase', right: 'Amidon' },
        { left: 'Saccharase', right: 'Saccharose' },
        { left: 'Catalase', right: 'Peroxyde d’hydrogène' },
        { left: 'Pepsine', right: 'Protéines (dans l’estomac)' },
      ],
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre les étapes de la catalyse',
      items: [
        'L’enzyme et le substrat se rencontrent',
        'Le substrat se fixe dans le site actif : complexe ES',
        'Le substrat est transformé en produit(s)',
        'Les produits sont libérés',
        'L’enzyme, intacte, peut recommencer',
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Une enzyme est consommée par la réaction qu’elle catalyse.', answer: false, explanation: 'Elle est régénérée intacte.' },
        { text: 'Une enzyme dénaturée par la chaleur retrouve son activité en refroidissant.', answer: false, explanation: 'La dénaturation est en général irréversible.' },
        { text: 'À 0 °C, les enzymes sont dénaturées.', answer: false, explanation: 'Elles sont seulement ralenties ; l’effet est réversible.' },
        { text: 'Toutes les enzymes ont le même pH optimal.', answer: false, explanation: 'Pepsine pH 2, trypsine pH 8…' },
        { text: 'La séquence d’acides aminés d’une enzyme est codée par un gène.', answer: true },
        { text: 'À saturation, doubler [S] double la vitesse initiale.', answer: false, explanation: 'La vitesse est déjà à son plateau Vmax.' },
      ],
    },
  ],
}

export default chapter
