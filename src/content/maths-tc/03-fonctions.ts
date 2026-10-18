import type { Block, Chapter } from '../types'

const r = String.raw
const P = (text: string): Block => ({ type: 'p', text })
const H2 = (text: string): Block => ({ type: 'h2', text })
const H3 = (text: string): Block => ({ type: 'h3', text })
const M = (tex: string): Block => ({ type: 'math', tex })

const chapter: Chapter = {
  id: 'fonctions',
  subject: 'maths-tc',
  order: 3,
  title: 'Fonctions',
  theme: 'Fonctions',
  summary:
    'Lecture graphique, image et antécédent, fonctions affines, fonction carré, polynômes du second degré sous forme factorisée, tableaux de signes et de variations, résolution graphique et modélisation.',
  duration: '4 semaines',
  objectives: [
    'Lire graphiquement images, antécédents, variations, extrema et signe d’une fonction.',
    'Déterminer et utiliser l’expression d’une fonction affine, étudier son signe.',
    'Connaître la fonction carré et résoudre des équations ou inéquations avec $x^2$.',
    'Étudier un polynôme du second degré donné sous forme factorisée : racines, signe, variations, extremum.',
    'Dresser et exploiter un tableau de signes ou de variations.',
    'Résoudre graphiquement $f(x)=g(x)$ ou $f(x)<g(x)$ et modéliser une situation concrète.',
  ],
  keywords: ['fonction', 'image', 'antécédent', 'fonction affine', 'fonction carré', 'racine', 'tableau de signes', 'variations', 'parabole'],

  fiche: [
    H2('L’essentiel'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Image et antécédent',
      content: [
        P(r`Une fonction $f$ associe à tout $x$ de son ensemble de définition un unique nombre $f(x)$, **l’image** de $x$. Un **antécédent** de $y$ est un $x$ tel que $f(x)=y$ : un nombre peut avoir 0, 1 ou plusieurs antécédents.`),
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Fonction affine $f(x)=mx+p$',
      content: [
        P(r`Courbe : droite de pente $m$ et d’ordonnée à l’origine $p$. Si $m>0$ : croissante ; si $m<0$ : décroissante ; si $m=0$ : constante.`),
        P(r`Par $A$ et $B$ : $m=\dfrac{y_B-y_A}{x_B-x_A}$. Racine : $x=-\dfrac pm$. Signe de $mx+p$ : celui de $m$ après la racine, opposé avant.`),
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Fonction carré $f(x)=x^2$',
      content: [
        P(r`Décroissante sur $]-\infty\,;0]$, croissante sur $[0\,;+\infty[$, minimum $0$ en $0$. Toujours positive. Courbe : parabole symétrique par rapport à l’axe des ordonnées.`),
        P(r`$x^2=k$ : deux solutions $\pm\sqrt k$ si $k>0$, une si $k=0$, aucune si $k<0$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Forme factorisée $f(x)=a(x-x_1)(x-x_2)$',
      content: [
        P(r`Racines $x_1$ et $x_2$. Signe : **celui de $a$ à l’extérieur** des racines, **opposé à $a$ entre** les racines. Extremum en $x_0=\dfrac{x_1+x_2}{2}$ : minimum si $a>0$, maximum si $a<0$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Résolution graphique',
      content: [
        P(r`$f(x)=g(x)$ : abscisses des points d’intersection des courbes. $f(x)<g(x)$ : abscisses où $\mathcal C_f$ est en dessous de $\mathcal C_g$.`),
      ],
    },
  ],

  cours: [
    H2('1. Notion de fonction et lecture graphique'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Fonction',
      content: [
        P(r`Définir une fonction $f$ sur un ensemble $D$ (souvent un intervalle), c’est associer à chaque nombre $x$ de $D$ **un unique** nombre noté $f(x)$. On écrit $f:x\mapsto f(x)$.`),
        P(r`$f(x)$ est l’**image** de $x$. Si $f(x)=y$, on dit que $x$ est **un antécédent** de $y$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple avec $f(x)=3x-2$',
      content: [
        P(r`Image de $4$ : $f(4)=3\times4-2=10$. Image de $-1$ : $f(-1)=-5$.`),
        P(r`Antécédent de $7$ : $3x-2=7\iff x=3$. Antécédent de $0$ : $3x-2=0\iff x=\dfrac23$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Lire sur une courbe $\\mathcal C_f$',
      content: [
        {
          type: 'list',
          items: [
            r`**Image de $a$** : partir de $a$ sur l’axe des abscisses, monter ou descendre jusqu’à la courbe, lire l’ordonnée.`,
            r`**Antécédents de $b$** : partir de $b$ sur l’axe des ordonnées, tracer l’horizontale $y=b$, lire les abscisses de **tous** les points d’intersection avec la courbe.`,
            r`**Signe** : $f(x)>0$ là où la courbe est au-dessus de l’axe des abscisses.`,
            r`**Variations** : $f$ est croissante là où la courbe « monte » en allant vers la droite, décroissante là où elle « descend ».`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Variations et extremum',
      content: [
        P(r`$f$ est **croissante** sur un intervalle $I$ si, pour $a<b$ dans $I$, $f(a)\le f(b)$ ; **décroissante** si $f(a)\ge f(b)$. Un **maximum** (resp. **minimum**) est la plus grande (resp. petite) valeur prise par $f$ sur un intervalle.`),
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Tableau de valeurs',
      content: [
        P(r`Pour $f(x)=x^2+1$ :`),
        {
          type: 'table',
          headers: ['$x$', '$-2$', '$-1$', '$0$', '$1$', '$2$', '$3$'],
          rows: [['$f(x)$', '$5$', '$2$', '$1$', '$2$', '$5$', '$10$']],
        },
        P(r`Le nombre $5$ a deux antécédents : $-2$ et $2$.`),
      ],
    },

    H2('2. Fonctions affines'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Fonction affine',
      content: [
        P(r`Une fonction **affine** est définie sur $\mathbb R$ par $f(x)=mx+p$. Sa courbe est une **droite** : $m$ est le **coefficient directeur** (pente) et $p$ l’**ordonnée à l’origine** ($f(0)=p$).`),
        P(r`Si $p=0$ on parle de fonction **linéaire** : situation de proportionnalité.`),
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Variations',
      content: [
        {
          type: 'table',
          headers: ['Signe de $m$', 'Variations', 'Allure'],
          rows: [
            [r`$m>0$`, 'croissante', 'droite qui monte'],
            [r`$m<0$`, 'décroissante', 'droite qui descend'],
            [r`$m=0$`, 'constante', 'droite horizontale'],
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Déterminer $m$ et $p$ à partir de deux points',
      content: [
        P(r`Pour $A(x_A\,;y_A)$ et $B(x_B\,;y_B)$ avec $x_A\neq x_B$ :`),
        M(r`m=\frac{y_B-y_A}{x_B-x_A}\qquad\text{puis } p=y_A-m\,x_A`),
        P(r`Exemple : $A(1\,;3)$, $B(4\,;9)$ : $m=\dfrac{9-3}{4-1}=2$, $p=3-2\times1=1$ : $f(x)=2x+1$. Vérification : $f(4)=9$.`),
      ],
    },
    H3('Signe de $mx+p$ (avec $m\\neq0$)'),
    P(r`$mx+p$ s’annule en $x_0=-\dfrac pm$. Le signe est celui de $m$ pour $x>x_0$ si $m>0$ (et inversement).`),
    {
      type: 'table',
      headers: ['$x$', r`$-\infty$`, r`$-\dfrac pm$`, r`$+\infty$`],
      rows: [
        [r`signe de $mx+p$ si $m>0$`, '$-$', '$0$', '$+$'],
        [r`signe de $mx+p$ si $m<0$`, '$+$', '$0$', '$-$'],
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      content: [
        P(r`$f(x)=-3x+6$ est décroissante ($m=-3<0$), s’annule en $x=2$ : $f(x)\ge0\iff x\le2$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Astuce',
      content: [
        P(r`Une inéquation $mx+p>0$ se résout aussi avec le signe : inutile de manipuler l’inégalité si on sait lire un tableau de signes.`),
      ],
    },

    H2('3. La fonction carré'),
    {
      type: 'callout',
      variant: 'property',
      title: 'Propriétés',
      content: [
        {
          type: 'list',
          items: [
            r`$f(x)=x^2$ est définie sur $\mathbb R$ ; $f(x)\ge0$ pour tout $x$ ; $f(0)=0$.`,
            r`$f$ est décroissante sur $]-\infty\,;0]$ et croissante sur $[0\,;+\infty[$ ; minimum $0$ atteint en $0$.`,
            r`$f(-x)=f(x)$ : la courbe (parabole) est symétrique par rapport à l’axe des ordonnées.`,
          ],
        },
        {
          type: 'table',
          headers: ['$x$', r`$-\infty$`, '$0$', r`$+\infty$`],
          rows: [['$x^2$', r`$\searrow$`, '$0$', r`$\nearrow$`]],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Équations et inéquations avec $x^2$',
      content: [
        {
          type: 'list',
          items: [
            r`$x^2=25\iff x=5$ ou $x=-5$ ; $x^2=-4$ n’a **aucune** solution.`,
            r`$x^2\le9\iff-3\le x\le3$ : $S=[-3\,;3]$.`,
            r`$x^2>4\iff x<-2$ ou $x>2$ : $S=]-\infty\,;-2[\,\cup\,]2\,;+\infty[$.`,
          ],
        },
        P(r`**Comparer** deux carrés : sur $[0\,;+\infty[$ le carré conserve l’ordre ; sur $]-\infty\,;0]$ il l’inverse. Ainsi $(-3)^2>(-2)^2$ car $-3<-2\le0$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Piège',
      content: [
        P(r`$\sqrt{x^2}=|x|$ et non $x$ ; et $(-3)^2=9$ tandis que $-3^2=-9$.`),
      ],
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Comparer fonction affine et fonction carré',
      caption: 'Les courbes de $x^2$ et $x+2$ se coupent en $x=-1$ et $x=2$.',
      props: { expressions: ['x^2', 'x+2'], xMin: -4, xMax: 4, yMin: -2, yMax: 10, editable: true },
    },

    H2('4. Polynômes du second degré sous forme factorisée'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Forme factorisée',
      content: [
        P(r`Une fonction $f(x)=a(x-x_1)(x-x_2)$ avec $a\neq0$ est un **polynôme du second degré**. Les nombres $x_1$ et $x_2$ sont ses **racines** : $f(x_1)=f(x_2)=0$. Sa courbe est une **parabole**, tournée vers le haut si $a>0$, vers le bas si $a<0$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Signe et variations',
      content: [
        P(r`Pour $x_1<x_2$ :`),
        {
          type: 'table',
          headers: ['$x$', r`$-\infty$`, '$x_1$', '$x_2$', r`$+\infty$`],
          rows: [
            ['signe de $f(x)$ si $a>0$', '$+$', '$0$ $-$ $0$', '', '$+$'],
            ['signe de $f(x)$ si $a<0$', '$-$', '$0$ $+$ $0$', '', '$-$'],
          ],
        },
        P(r`L’axe de symétrie est la droite $x=x_0$ avec $x_0=\dfrac{x_1+x_2}{2}$ : $f$ y admet un extremum, un **minimum** si $a>0$ et un **maximum** si $a<0$. On calcule sa valeur par $f(x_0)$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : $f(x)=2(x-1)(x-5)$',
      content: [
        P(r`Racines $1$ et $5$ ; $a=2>0$ : $f\ge0$ à l’extérieur de $[1\,;5]$ et $f\le0$ à l’intérieur.`),
        P(r`$x_0=\dfrac{1+5}{2}=3$ ; $f(3)=2\times2\times(-2)=-8$ : minimum $-8$ en $x=3$. Contrôle : $f(0)=2\times(-1)\times(-5)=10$.`),
        {
          type: 'table',
          headers: ['$x$', r`$-\infty$`, '$3$', r`$+\infty$`],
          rows: [['$f(x)$', r`$\searrow$`, '$-8$', r`$\nearrow$`]],
        },
      ],
    },
    {
      type: 'svg',
      caption: 'Parabole de $f(x)=2(x-1)(x-5)$ : racines 1 et 5, minimum -8 en x = 3.',
      svg: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<line x1="20" y1="100" x2="380" y2="100" stroke="currentColor" stroke-width="1"/>
<line x1="60" y1="10" x2="60" y2="250" stroke="currentColor" stroke-width="1"/>
<path d="M 40 10 Q 180 330 320 10" fill="none" stroke="hsl(217 91% 60%)" stroke-width="2.5"/>
<line x1="180" y1="30" x2="180" y2="240" stroke="currentColor" stroke-dasharray="4 4" opacity=".5"/>
<circle cx="100" cy="100" r="4" fill="hsl(0 84% 60%)"/>
<circle cx="260" cy="100" r="4" fill="hsl(0 84% 60%)"/>
<circle cx="180" cy="178" r="4" fill="hsl(142 71% 45%)"/>
<g fill="currentColor"><text x="95" y="90">1</text><text x="255" y="90">5</text><text x="188" y="170">minimum (3 ; -8)</text><text x="64" y="22">y</text><text x="370" y="94">x</text></g>
<text x="280" y="50" fill="currentColor">f ≥ 0</text><text x="110" y="50" fill="currentColor">f ≥ 0</text><text x="150" y="125" fill="currentColor">f ≤ 0</text>
</svg>`,
    },
    {
      type: 'widget',
      id: 'second-degre',
      title: 'Visualiser la parabole',
      caption: 'Réglages a = 2, b = -12, c = 10 : on retrouve $2(x-1)(x-5)$. Faire varier $a$ : le sens de la parabole change.',
      props: { a: 2, b: -12, c: 10 },
    },

    H2('5. Tableaux de signes'),
    {
      type: 'callout',
      variant: 'method',
      title: 'Signe d’un produit de facteurs affines',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Racines', text: 'Chercher la valeur qui annule chaque facteur.' },
            { title: 'Tableau', text: 'Placer ces valeurs dans l’ordre croissant, une ligne par facteur plus une ligne pour le produit.' },
            { title: 'Signes', text: 'Remplir le signe de chaque facteur (règle de $mx+p$).' },
            { title: 'Produit', text: 'Appliquer la règle des signes colonne par colonne.' },
            { title: 'Conclure', text: 'Lire l’ensemble solution en respectant les crochets (inégalité large ou stricte).' },
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Résoudre $(2x-4)(x+3)\\le0$',
      content: [
        P(r`$2x-4=0\iff x=2$ ; $x+3=0\iff x=-3$.`),
        {
          type: 'table',
          headers: ['$x$', r`$-\infty$`, '$-3$', '$2$', r`$+\infty$`],
          rows: [
            ['$2x-4$', '$-$', '$-$', '$0$ puis $+$', '$+$'],
            ['$x+3$', '$-$', '$0$ puis $+$', '$+$', '$+$'],
            ['produit', '$+$', '$0$ puis $-$', '$0$ puis $+$', '$+$'],
          ],
        },
        P(r`Le produit est négatif ou nul entre les racines : $S=[-3\,;2]$.`),
      ],
    },

    H2('6. Résolution graphique et modélisation'),
    {
      type: 'callout',
      variant: 'method',
      title: 'Équations et inéquations graphiques',
      content: [
        {
          type: 'list',
          items: [
            r`$f(x)=g(x)$ : abscisses des points d’intersection de $\mathcal C_f$ et $\mathcal C_g$.`,
            r`$f(x)<g(x)$ : abscisses où $\mathcal C_f$ est strictement **en dessous** de $\mathcal C_g$.`,
            r`$f(x)=k$ : intersection avec la droite horizontale $y=k$.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : $x^2$ et $x+2$',
      content: [
        P(r`$x^2=x+2\iff x^2-x-2=0\iff(x-2)(x+1)=0\iff x=2$ ou $x=-1$. Points d’intersection $(-1\,;1)$ et $(2\,;4)$.`),
        P(r`$x^2<x+2\iff-1<x<2$ (la parabole est sous la droite entre les deux points).`),
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Modéliser une situation',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Choisir la variable', text: 'Définir $x$ avec son unité et son intervalle de validité.' },
            { title: 'Exprimer', text: 'Traduire les données par des fonctions de $x$ (coût, recette, aire, bénéfice…).' },
            { title: 'Étudier', text: 'Signe, variations, extremum, intersections.' },
            { title: 'Interpréter', text: 'Répondre à la question posée avec l’unité, dans le contexte.' },
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Bénéfice d’une entreprise',
      content: [
        P(r`Pour $x$ centaines d’objets fabriqués ($0\le x\le10$), le bénéfice en milliers d’euros est $B(x)=-x^2+8x-7=-(x-1)(x-7)$. Racines $1$ et $7$, $a=-1<0$ : bénéfice positif pour $x\in\,]1\,;7[$, maximal en $x_0=\dfrac{1+7}{2}=4$ avec $B(4)=-16+32-7=9$, soit $9\,000$ €.`),
      ],
    },
  ],

  exercices: [
    {
      id: 'fonc-image-antecedent',
      title: 'Image et antécédent',
      difficulty: 1,
      duration: 10,
      tags: ['image', 'antécédent'],
      statement: [
        P('Soit $f$ la fonction définie sur $\\mathbb R$ par $f(x)=3x-2$.'),
        { type: 'list', ordered: true, items: ['Calculer l’image de $4$ et de $-1$.', 'Déterminer l’antécédent de $7$ et de $0$.', 'Le nombre $-8$ a-t-il un antécédent ? Lequel ?'] },
      ],
      hints: ['Pour un antécédent de $b$, résoudre $f(x)=b$.'],
      solution: [
        P(r`1. $f(4)=10$ ; $f(-1)=-3-2=-5$.`),
        P(r`2. $3x-2=7\iff x=3$. $3x-2=0\iff x=\dfrac23$.`),
        P(r`3. $3x-2=-8\iff3x=-6\iff x=-2$. Vérification : $f(-2)=-8$.`),
      ],
    },
    {
      id: 'fonc-lecture-tableau',
      title: 'Lecture d’un tableau de valeurs',
      difficulty: 1,
      duration: 10,
      tags: ['lecture graphique'],
      statement: [
        P('Une fonction $f$ est donnée par le tableau :'),
        {
          type: 'table',
          headers: ['$x$', '$-2$', '$-1$', '$0$', '$1$', '$2$', '$3$'],
          rows: [['$f(x)$', '$5$', '$2$', '$1$', '$2$', '$5$', '$10$']],
        },
        { type: 'list', ordered: true, items: ['Quelle est l’image de $2$ ?', 'Quels sont les antécédents de $5$ ?', 'Quel est le minimum de $f$ sur ces valeurs, atteint pour quel $x$ ?', 'Peut-on dire que $f$ est croissante sur $[-2\\,;3]$ ?'] },
        P('(Ce tableau correspond à $f(x)=x^2+1$.)'),
      ],
      solution: [
        P(r`1. $f(2)=5$.`),
        P(r`2. $5$ a deux antécédents : $-2$ et $2$.`),
        P(r`3. Minimum $1$ atteint en $x=0$.`),
        P(r`4. Non : $f$ décroît de $-2$ à $0$ ($5\to2\to1$) puis croît.`),
      ],
    },
    {
      id: 'fonc-affine-deux-points',
      title: 'Fonction affine par deux points',
      difficulty: 2,
      duration: 12,
      tags: ['fonction affine'],
      statement: [
        P('Soit $f$ une fonction affine telle que $f(1)=3$ et $f(4)=9$.'),
        { type: 'list', ordered: true, items: ['Déterminer l’expression de $f(x)$.', 'Donner le sens de variation de $f$.', 'Étudier le signe de $f(x)$.'] },
      ],
      hints: [r`$m=\dfrac{f(4)-f(1)}{4-1}$.`],
      solution: [
        P(r`1. $m=\dfrac{9-3}{4-1}=2$. Puis $f(1)=2+p=3$ donc $p=1$ : $f(x)=2x+1$. Vérification : $f(4)=9$.`),
        P(r`2. $m=2>0$ : $f$ est strictement croissante sur $\mathbb R$.`),
        P(r`3. $2x+1=0\iff x=-\dfrac12$. $f(x)<0$ pour $x<-\dfrac12$, $f(x)>0$ pour $x>-\dfrac12$.`),
      ],
    },
    {
      id: 'fonc-signe-affine',
      title: 'Signe d’une fonction affine',
      difficulty: 1,
      duration: 8,
      tags: ['signe', 'tableau de signes'],
      statement: [
        P('Soit $f(x)=-3x+6$.'),
        { type: 'list', ordered: true, items: ['Quel est son sens de variation ?', 'Dresser son tableau de signes.', 'Résoudre $f(x)\\ge0$.'] },
      ],
      solution: [
        P(r`1. $m=-3<0$ : $f$ est décroissante.`),
        P(r`2. $-3x+6=0\iff x=2$.`),
        {
          type: 'table',
          headers: ['$x$', r`$-\infty$`, '$2$', r`$+\infty$`],
          rows: [['$-3x+6$', '$+$', '$0$', '$-$']],
        },
        P(r`3. $f(x)\ge0\iff x\le2$ : $S=]-\infty\,;2]$.`),
      ],
    },
    {
      id: 'fonc-carre',
      title: 'La fonction carré',
      difficulty: 2,
      duration: 12,
      tags: ['fonction carré'],
      statement: [
        P('Résoudre dans $\\mathbb R$ :'),
        { type: 'list', ordered: true, items: ['$x^2=25$', '$x^2=-4$', '$x^2\\le9$', '$x^2>4$'] },
        P('Comparer sans calculatrice $(-3)^2$ et $(-2)^2$, puis $\\left(\\dfrac12\\right)^2$ et $\\left(\\dfrac13\\right)^2$. Justifier avec les variations.'),
      ],
      hints: ['Utiliser la courbe de la fonction carré pour les inéquations.'],
      solution: [
        P(r`1. $S=\{-5\,;5\}$.`),
        P(r`2. Un carré est positif : pas de solution, $S=\varnothing$.`),
        P(r`3. $-3\le x\le3$ : $S=[-3\,;3]$.`),
        P(r`4. $x<-2$ ou $x>2$ : $S=]-\infty\,;-2[\,\cup\,]2\,;+\infty[$.`),
        P(r`$-3<-2\le0$ et le carré est décroissant sur $]-\infty\,;0]$, donc $(-3)^2>(-2)^2$ : $9>4$. Sur $[0\,;+\infty[$ le carré est croissant et $\dfrac12>\dfrac13$ donc $\left(\dfrac12\right)^2>\left(\dfrac13\right)^2$ : $\dfrac14>\dfrac19$.`),
      ],
    },
    {
      id: 'fonc-forme-factorisee',
      title: 'Étude d’un polynôme factorisé',
      difficulty: 2,
      duration: 18,
      tags: ['second degré', 'racines', 'variations'],
      statement: [
        P('Soit $f(x)=2(x-1)(x-5)$.'),
        { type: 'list', ordered: true, items: ['Donner les racines de $f$ et calculer $f(0)$.', 'Étudier le signe de $f(x)$.', 'Déterminer les coordonnées du sommet de la parabole.', 'Dresser le tableau de variations de $f$.'] },
      ],
      hints: ['L’abscisse du sommet est la moyenne des racines.'],
      solution: [
        P(r`1. Racines $1$ et $5$. $f(0)=2\times(-1)\times(-5)=10$.`),
        P(r`2. $a=2>0$ : $f(x)\ge0$ pour $x\le1$ ou $x\ge5$, et $f(x)\le0$ pour $1\le x\le5$.`),
        P(r`3. $x_0=\dfrac{1+5}{2}=3$ ; $f(3)=2\times2\times(-2)=-8$. Sommet $S(3\,;-8)$.`),
        {
          type: 'table',
          headers: ['$x$', r`$-\infty$`, '$3$', r`$+\infty$`],
          rows: [['$f(x)$', r`$\searrow$`, '$-8$', r`$\nearrow$`]],
        },
        P(r`4. $f$ est décroissante sur $]-\infty\,;3]$, croissante sur $[3\,;+\infty[$, de minimum $-8$.`),
      ],
    },
    {
      id: 'fonc-resolution-graphique',
      title: 'Résolution graphique : parabole et droite',
      difficulty: 2,
      duration: 15,
      tags: ['résolution graphique'],
      statement: [
        P('On considère $f(x)=x^2$ et $g(x)=x+2$.'),
        { type: 'list', ordered: true, items: ['Résoudre algébriquement $f(x)=g(x)$ en factorisant $x^2-x-2$ (vérifier que $x^2-x-2=(x-2)(x+1)$).', 'Donner les coordonnées des points d’intersection de $\\mathcal C_f$ et $\\mathcal C_g$.', 'En déduire graphiquement l’ensemble des solutions de $f(x)<g(x)$.'] },
        { type: 'widget', id: 'function-plotter', props: { expressions: ['x^2', 'x+2'], xMin: -4, xMax: 4, yMin: -2, yMax: 10 } },
      ],
      solution: [
        P(r`1. $(x-2)(x+1)=x^2+x-2x-2=x^2-x-2$ ✓. Donc $x^2=x+2\iff(x-2)(x+1)=0\iff x=2$ ou $x=-1$.`),
        P(r`2. $f(-1)=1$ et $f(2)=4$ : points $(-1\,;1)$ et $(2\,;4)$.`),
        P(r`3. La parabole est sous la droite entre les abscisses $-1$ et $2$ : $S=]-1\,;2[$.`),
      ],
    },
    {
      id: 'fonc-benefice',
      title: 'Bénéfice d’une entreprise (type contrôle)',
      difficulty: 3,
      duration: 25,
      tags: ['modélisation', 'second degré', 'contrôle'],
      statement: [
        P('Une entreprise fabrique $x$ centaines d’objets par jour, avec $0\\le x\\le10$. Son bénéfice journalier, en milliers d’euros, est $B(x)=-x^2+8x-7$.'),
        { type: 'list', ordered: true, items: ['Calculer $B(0)$ et interpréter.', 'Vérifier que $B(x)=-(x-1)(x-7)$.', 'Étudier le signe de $B(x)$ sur $[0\\,;10]$ et interpréter : pour quelles quantités l’entreprise gagne-t-elle de l’argent ?', 'Pour quelle production le bénéfice est-il maximal ? Quel est ce bénéfice ?', 'Dresser le tableau de variations de $B$ sur $[0\\,;10]$.'] },
      ],
      hints: ['Développer $-(x-1)(x-7)$.', 'Le maximum est atteint au milieu des racines.'],
      solution: [
        P(r`1. $B(0)=-7$ : sans production, l’entreprise perd $7\,000$ € (coûts fixes).`),
        P(r`2. $-(x-1)(x-7)=-(x^2-8x+7)=-x^2+8x-7$ ✓.`),
        P(r`3. Racines $1$ et $7$, $a=-1<0$ : $B(x)>0$ pour $1<x<7$, $B(x)<0$ pour $x<1$ ou $x>7$. L’entreprise gagne de l’argent si elle produit entre $100$ et $700$ objets (exclus).`),
        P(r`4. $x_0=\dfrac{1+7}{2}=4$ : $B(4)=-16+32-7=9$. Bénéfice maximal : $9\,000$ € pour $400$ objets.`),
        {
          type: 'table',
          headers: ['$x$', '$0$', '$4$', '$10$'],
          rows: [['$B(x)$', '$-7$ $\\nearrow$', '$9$', '$\\searrow$ $-27$']],
        },
        P(r`Calcul : $B(10)=-100+80-7=-27$.`),
      ],
    },
    {
      id: 'fonc-produit-signes',
      title: 'Tableaux de signes de produits',
      difficulty: 2,
      duration: 15,
      tags: ['tableau de signes'],
      statement: [
        P('Résoudre dans $\\mathbb R$ à l’aide d’un tableau de signes :'),
        { type: 'list', ordered: true, items: ['$(2x-4)(x+3)\\le0$', '$(x-1)(3-x)>0$'] },
      ],
      solution: [
        P(r`1. $2x-4=0\iff x=2$ et $x+3=0\iff x=-3$. Le coefficient dominant est $2>0$ : le produit est positif à l’extérieur de $[-3\,;2]$, négatif entre. $S=[-3\,;2]$.`),
        P(r`2. $(x-1)(3-x)=-(x-1)(x-3)$ : racines $1$ et $3$, $a=-1<0$ : positif entre les racines. $S=]1\,;3[$. Vérification : $x=2$ donne $1\times1=1>0$ ✓.`),
      ],
    },
    {
      id: 'fonc-aire-maximale',
      title: 'Aire maximale d’un enclos',
      difficulty: 3,
      duration: 20,
      tags: ['modélisation', 'second degré'],
      statement: [
        P('Un rectangle a un périmètre de $20$ m. On note $x$ sa largeur en mètres.'),
        { type: 'list', ordered: true, items: ['Dans quel intervalle varie $x$ ? Exprimer la longueur en fonction de $x$.', 'Montrer que l’aire est $A(x)=x(10-x)$.', 'Donner les racines de $A$, le tableau de variations et l’aire maximale.', 'Quelle est la forme du rectangle d’aire maximale ?'] },
      ],
      solution: [
        P(r`1. Demi-périmètre $10$ : longueur $=10-x$ ; $0<x<10$.`),
        P(r`2. $A(x)=x(10-x)=-x(x-10)$ : $a=-1$, racines $0$ et $10$.`),
        P(r`3. Sommet : $x_0=\dfrac{0+10}{2}=5$ ; $A(5)=25$ m². Maximum $25$ m² en $x=5$ ; $A$ est croissante sur $]0\,;5]$ puis décroissante sur $[5\,;10[$.`),
        P(r`4. Largeur $5$ m et longueur $10-5=5$ m : c’est un **carré**.`),
      ],
    },
  ],

  representations: [
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Fonction affine : pente et ordonnée à l’origine',
      caption: 'Modifier m et p : la droite monte si m > 0, descend si m < 0.',
      props: {
        expressions: ['m*x+p'],
        params: [
          { name: 'm', min: -4, max: 4, step: 0.5, value: 2 },
          { name: 'p', min: -5, max: 5, step: 0.5, value: 1 },
        ],
        xMin: -5,
        xMax: 5,
        yMin: -8,
        yMax: 8,
      },
    },
    {
      type: 'widget',
      id: 'second-degre',
      title: 'Parabole, racines et signe',
      caption: 'Régler a, b, c pour retrouver le signe de $f$ et l’extremum.',
      props: { a: 1, b: -4, c: 3 },
    },
    {
      type: 'qcm',
      questions: [
        { question: r`$f(x)=2x-5$. L’image de $3$ est :`, choices: ['1', '-1', '11', '6'], answer: 0, explanation: r`$2\times3-5=1$.` },
        { question: r`Antécédent de $4$ par $f(x)=2x-5$ :`, choices: ['3', '4,5', '-0,5', '13'], answer: 1, explanation: r`$2x-5=4\iff x=4{,}5$.` },
        { question: r`Une fonction affine de pente négative est :`, choices: ['croissante', 'décroissante', 'constante', 'ni l’un ni l’autre'], answer: 1 },
        { question: r`Le nombre $9$ a, par la fonction carré, :`, choices: ['aucun antécédent', 'un antécédent', 'deux antécédents', 'trois antécédents'], answer: 2, explanation: '$3$ et $-3$.' },
        { question: r`$f(x)=-(x-2)(x-6)$ admet pour extremum :`, choices: ['un minimum en 4', 'un maximum en 4', 'un maximum en 8', 'un minimum en 2'], answer: 1, explanation: r`$a=-1<0$, $x_0=\dfrac{2+6}{2}=4$ : maximum.` },
        { question: r`Signe de $(x-1)(x-3)$ pour $x=2$ :`, choices: ['positif', 'négatif', 'nul', 'impossible à dire'], answer: 1, explanation: r`$1\times(-1)=-1$.` },
        { question: r`Solution de $x^2\le16$ :`, choices: ['$[-4\\,;4]$', '$[4\\,;+\\infty[$', '$\\{-4\\,;4\\}$', '$]-\\infty\\,;4]$'], answer: 0 },
        { question: r`Courbe d’une fonction affine :`, choices: ['une parabole', 'une droite', 'une hyperbole', 'un cercle'], answer: 1 },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Un nombre a toujours exactement un antécédent par une fonction.', answer: false, explanation: 'Il peut en avoir 0, 1 ou plusieurs.' },
        { text: 'Un nombre a toujours une unique image par une fonction.', answer: true },
        { text: r`La fonction carré est croissante sur $\mathbb R$.`, answer: false, explanation: r`Elle est décroissante sur $]-\infty\,;0]$.` },
        { text: r`$x^2=-4$ n’a pas de solution réelle.`, answer: true },
        { text: r`La parabole de $f(x)=a(x-x_1)(x-x_2)$ avec $a<0$ est tournée vers le bas.`, answer: true },
        { text: r`Le signe de $a(x-x_1)(x-x_2)$ est celui de $a$ entre les racines.`, answer: false, explanation: 'Entre les racines, le signe est opposé à celui de $a$.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text:
        'Une fonction affine f(x) = mx + p est croissante si m est {{positif|strictement positif|>0}}. ' +
        'La courbe de la fonction carré est une {{parabole}}. Elle admet un {{minimum}} égal à 0 atteint en {{0|zéro}}. ' +
        'Le sommet de la parabole de f(x) = a(x − x1)(x − x2) a pour abscisse la {{moyenne}} des racines.',
    },
    {
      type: 'matching',
      title: 'Associer fonction et propriété',
      pairs: [
        { left: r`$f(x)=-2x+3$`, right: 'droite décroissante' },
        { left: r`$f(x)=x^2$`, right: 'minimum 0 en 0' },
        { left: r`$f(x)=(x-1)(x-3)$`, right: 'racines 1 et 3, minimum en 2' },
        { left: r`$f(x)=-(x-1)(x-3)$`, right: 'racines 1 et 3, maximum en 2' },
        { left: r`$f(x)=5$`, right: 'fonction constante' },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Image / antécédent', back: r`$f(x)$ est l’image de $x$ ; $x$ est un antécédent de $y$ si $f(x)=y$.` },
        { front: 'Fonction affine', back: r`$f(x)=mx+p$ ; courbe : droite, pente $m$, ordonnée à l’origine $p$.` },
        { front: 'Pente par deux points', back: r`$m=\dfrac{y_B-y_A}{x_B-x_A}$` },
        { front: 'Racine de $mx+p$', back: r`$x=-\dfrac pm$` },
        { front: 'Variations de $x^2$', back: r`Décroissante sur $]-\infty\,;0]$, croissante sur $[0\,;+\infty[$, minimum $0$.` },
        { front: r`$x^2=k$ avec $k>0$`, back: r`$x=\sqrt k$ ou $x=-\sqrt k$.` },
        { front: r`Forme factorisée $a(x-x_1)(x-x_2)$`, back: r`Racines $x_1$, $x_2$ ; sommet en $x_0=\dfrac{x_1+x_2}{2}$.` },
        { front: 'Signe du second degré factorisé', back: 'Signe de a à l’extérieur des racines, signe opposé entre les racines.' },
        { front: 'Résolution graphique f(x) < g(x)', back: 'Abscisses où la courbe de f est sous celle de g.' },
      ],
    },
  ],
}

export default chapter
