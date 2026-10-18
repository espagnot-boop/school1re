import type { Block, Chapter } from '../types'

const r = String.raw
const P = (text: string): Block => ({ type: 'p', text })
const H2 = (text: string): Block => ({ type: 'h2', text })
const H3 = (text: string): Block => ({ type: 'h3', text })
const M = (tex: string): Block => ({ type: 'math', tex })

const chapter: Chapter = {
  id: 'automatismes',
  subject: 'maths-tc',
  order: 1,
  title: 'Automatismes',
  theme: 'Automatismes',
  summary:
    'Calcul numérique et littéral, fractions, puissances, priorités, développer et factoriser, équations et inéquations du premier degré, conversions, ordres de grandeur et notation scientifique.',
  duration: '3 semaines (travail régulier toute l’année)',
  objectives: [
    'Calculer avec des fractions, des puissances et respecter les priorités opératoires.',
    'Développer, factoriser et réduire une expression littérale simple (identités remarquables).',
    'Résoudre une équation ou une inéquation du premier degré.',
    'Passer d’une unité à une autre (durées, vitesses, aires, volumes, contenances).',
    'Utiliser la notation scientifique et estimer un ordre de grandeur.',
    'Répondre vite et juste à des questions de calcul mental et d’estimation (automatismes).',
  ],
  keywords: [
    'fraction',
    'puissance',
    'priorités opératoires',
    'identités remarquables',
    'équation',
    'inéquation',
    'conversion',
    'notation scientifique',
    'ordre de grandeur',
  ],

  fiche: [
    H2('Les réflexes à connaître'),
    {
      type: 'callout',
      variant: 'remember',
      title: 'Priorités opératoires',
      content: [
        P(r`On calcule dans l’ordre : **parenthèses**, puis **puissances**, puis **multiplications et divisions** (de gauche à droite), enfin **additions et soustractions**.`),
        P(r`Exemple : $3+4\times 5=23$ mais $(3+4)\times 5=35$. Attention : $-3^2=-9$ alors que $(-3)^2=9$.`),
      ],
    },
    {
      type: 'table',
      headers: ['Fractions', 'Puissances (a ≠ 0)'],
      rows: [
        [r`$\dfrac{a}{b}+\dfrac{c}{b}=\dfrac{a+c}{b}$ (même dénominateur)`, r`$a^m\times a^n=a^{m+n}$`],
        [r`$\dfrac{a}{b}\times\dfrac{c}{d}=\dfrac{ac}{bd}$`, r`$\dfrac{a^m}{a^n}=a^{m-n}$`],
        [r`$\dfrac{a}{b}\div\dfrac{c}{d}=\dfrac{a}{b}\times\dfrac{d}{c}$`, r`$(a^m)^n=a^{mn}$`],
        [r`$\dfrac{ka}{kb}=\dfrac{a}{b}$ (simplifier)`, r`$a^{-n}=\dfrac{1}{a^n}$, $a^0=1$`],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Identités remarquables',
      content: [
        M(r`(a+b)^2=a^2+2ab+b^2\qquad (a-b)^2=a^2-2ab+b^2\qquad (a-b)(a+b)=a^2-b^2`),
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Équations et inéquations du 1er degré',
      content: [
        P(r`On regroupe les $x$ d’un côté, les nombres de l’autre, puis on divise par le coefficient de $x$.`),
        P(r`==Pour une inéquation, on change le sens de l’inégalité quand on multiplie ou divise par un nombre négatif.==`),
      ],
    },
    {
      type: 'table',
      headers: ['Conversion', 'Règle'],
      rows: [
        ['km/h → m/s', r`diviser par $3{,}6$ (ex. $72\ \text{km/h}=20\ \text{m/s}$)`],
        ['m² → cm²', r`multiplier par $10^4$ ; m³ → L : multiplier par $1000$`],
        ['heures décimales', r`$0{,}75\ \text{h}=45\ \text{min}$ ; $2\ \text{h}\ 15=2{,}25\ \text{h}$`],
        ['notation scientifique', r`$a\times10^n$ avec $1\le a<10$ et $n\in\mathbb Z$`],
      ],
    },
  ],

  cours: [
    H2('1. Calcul numérique'),
    H3('Priorités opératoires'),
    P(r`Quand une expression contient plusieurs opérations, on suit toujours le même ordre. Les calculatrices le respectent aussi, mais il faut savoir le faire à la main.`),
    {
      type: 'steps',
      items: [
        { title: 'Parenthèses', text: r`On calcule d’abord l’intérieur des parenthèses (en commençant par les plus intérieures).` },
        { title: 'Puissances', text: r`Puis les puissances et les racines carrées.` },
        { title: 'Multiplications et divisions', text: r`Ensuite, de gauche à droite.` },
        { title: 'Additions et soustractions', text: r`Enfin, de gauche à droite.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé',
      content: [
        M(r`12-3\times(4-6)^2 \div 2 = 12-3\times(-2)^2\div 2 = 12-3\times 4\div 2 = 12-12\div 2 = 12-6=6`),
        P(r`Attention au signe : $-3^2=-(3\times3)=-9$ alors que $(-3)^2=9$.`),
      ],
    },
    H3('Fractions'),
    P(r`Une fraction $\dfrac{a}{b}$ (avec $b\neq0$) est le quotient de $a$ par $b$. On ne change pas sa valeur en multipliant ou en divisant numérateur et dénominateur par un même nombre non nul.`),
    {
      type: 'callout',
      variant: 'method',
      title: 'Additionner deux fractions',
      content: [
        P(r`On met au même dénominateur (le plus petit multiple commun si possible), puis on additionne les numérateurs.`),
        M(r`\frac{2}{3}+\frac{3}{4}=\frac{8}{12}+\frac{9}{12}=\frac{17}{12}`),
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Multiplier, diviser',
      content: [
        M(r`\frac{5}{6}\times\frac{9}{10}=\frac{45}{60}=\frac{3}{4}\qquad\qquad \frac{2/5}{4/15}=\frac{2}{5}\times\frac{15}{4}=\frac{30}{20}=\frac{3}{2}`),
        P(r`Diviser par une fraction, c’est multiplier par son **inverse**.`),
      ],
    },
    H3('Puissances'),
    P(r`Pour un entier $n\ge1$, $a^n=a\times a\times\cdots\times a$ ($n$ facteurs). Par convention $a^0=1$ et $a^{-n}=\dfrac1{a^n}$ (pour $a\neq0$).`),
    {
      type: 'callout',
      variant: 'property',
      title: 'Règles de calcul',
      content: [
        M(r`a^m\times a^n=a^{m+n}\qquad \frac{a^m}{a^n}=a^{m-n}\qquad (a^m)^n=a^{mn}\qquad (ab)^n=a^nb^n`),
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples',
      content: [
        M(r`2^5\times2^{-3}=2^2=4\qquad \frac{(3^2)^3}{3^4}=\frac{3^6}{3^4}=3^2=9\qquad \left(\frac23\right)^{-2}=\left(\frac32\right)^2=\frac94`),
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
            r`$2^3\times2^4=2^7$ et non $2^{12}$ : on **additionne** les exposants.`,
            r`$(a+b)^2\neq a^2+b^2$ : il manque le double produit $2ab$.`,
            r`$\dfrac12+\dfrac13\neq\dfrac25$ : on n’additionne jamais les dénominateurs.`,
          ],
        },
      ],
    },

    H2('2. Calcul littéral'),
    H3('Développer et réduire'),
    P(r`**Développer**, c’est transformer un produit en somme. On utilise la distributivité : $k(a+b)=ka+kb$ et $(a+b)(c+d)=ac+ad+bc+bd$.`),
    {
      type: 'callout',
      variant: 'property',
      title: 'Identités remarquables',
      content: [
        M(r`(a+b)^2=a^2+2ab+b^2`),
        M(r`(a-b)^2=a^2-2ab+b^2`),
        M(r`(a-b)(a+b)=a^2-b^2`),
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Développements',
      content: [
        M(r`(x+3)^2=x^2+6x+9\qquad(2x-1)^2=4x^2-4x+1\qquad(x-5)(x+5)=x^2-25`),
        M(r`3(2x-4)+x(x+1)=6x-12+x^2+x=x^2+7x-12`),
      ],
    },
    P(r`Vérification express : pour $x=1$, $(x+3)^2=16$ et $x^2+6x+9=1+6+9=16$. Tester une valeur simple permet de repérer une erreur.`),
    H3('Factoriser'),
    P(r`**Factoriser**, c’est transformer une somme en produit. Trois réflexes dans l’ordre : chercher un **facteur commun**, reconnaître une **identité remarquable**, sinon... on ne factorise pas (à ce niveau).`),
    {
      type: 'callout',
      variant: 'example',
      title: 'Factorisations',
      content: [
        M(r`4x^2+12x=4x(x+3)\qquad x^2-49=(x-7)(x+7)\qquad 9x^2-6x+1=(3x-1)^2`),
        M(r`(x+2)^2-9=\big((x+2)-3\big)\big((x+2)+3\big)=(x-1)(x+5)`),
      ],
    },

    H2('3. Équations et inéquations du premier degré'),
    {
      type: 'callout',
      variant: 'method',
      title: 'Résoudre une équation $ax+b=cx+d$',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Développer', text: r`Supprimer parenthèses et dénominateurs (en multipliant les deux membres par le même nombre).` },
            { title: 'Regrouper', text: r`Les termes en $x$ d’un côté, les constantes de l’autre.` },
            { title: 'Isoler', text: r`Diviser par le coefficient de $x$ (non nul).` },
            { title: 'Vérifier', text: r`Remplacer $x$ par la solution dans l’énoncé de départ.` },
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples',
      content: [
        M(r`5x+2=2x-10\iff 3x=-12\iff x=-4`),
        M(r`\frac{2x-1}{3}=\frac{x+4}{2}\iff 2(2x-1)=3(x+4)\iff 4x-2=3x+12\iff x=14`),
        P(r`Vérification : $\dfrac{27}{3}=9$ et $\dfrac{18}{2}=9$.`),
      ],
    },
    H3('Inéquations'),
    {
      type: 'callout',
      variant: 'property',
      title: 'Règle fondamentale',
      content: [
        P(r`On peut ajouter ou soustraire un même nombre aux deux membres. On peut multiplier ou diviser par un même nombre **strictement positif**. Si on multiplie ou divise par un nombre **strictement négatif**, ==on change le sens de l’inégalité==.`),
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples',
      content: [
        M(r`-2x+5\ge 11\iff -2x\ge 6\iff x\le -3\qquad S=\,]-\infty\,;-3]`),
        M(r`4x-3<2x+7\iff 2x<10\iff x<5\qquad S=\,]-\infty\,;5[`),
      ],
    },
    {
      type: 'svg',
      caption: r`Représentation sur une droite graduée : $S=]-\infty\,;5[$ (crochet tourné vers l’extérieur : 5 exclu) et $S=]-\infty\,;-3]$ (crochet vers l’intérieur : -3 inclus).`,
      svg: `<svg viewBox="0 0 520 150" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<line x1="20" y1="40" x2="500" y2="40" class="svg-stroke" stroke="currentColor" stroke-width="1.5"/>
<line x1="20" y1="110" x2="500" y2="110" class="svg-stroke" stroke="currentColor" stroke-width="1.5"/>
<g fill="currentColor" text-anchor="middle">
<text x="100" y="62">-3</text><text x="260" y="62">0</text><text x="420" y="62">5</text>
<text x="100" y="132">-3</text><text x="260" y="132">0</text><text x="420" y="132">5</text>
</g>
<line x1="20" y1="40" x2="420" y2="40" stroke="hsl(217 91% 60%)" stroke-width="5"/>
<circle cx="420" cy="40" r="5" fill="hsl(217 91% 60%)" class="svg-bg"/>
<text x="430" y="25" fill="currentColor">x &lt; 5</text>
<line x1="20" y1="110" x2="100" y2="110" stroke="hsl(0 84% 60%)" stroke-width="5"/>
<circle cx="100" cy="110" r="5" fill="hsl(0 84% 60%)"/>
<text x="120" y="95" fill="currentColor">x ≤ -3</text>
</svg>`,
    },

    H2('4. Conversions et grandeurs'),
    {
      type: 'table',
      headers: ['Grandeur', 'Conversions utiles'],
      rows: [
        ['Durées', r`$1\ \text{h}=60\ \text{min}=3600\ \text{s}$ ; $3{,}5\ \text{h}=3\ \text{h}\ 30\ \text{min}$`],
        ['Vitesse', r`$1\ \text{m/s}=3{,}6\ \text{km/h}$ : $72\ \text{km/h}=20\ \text{m/s}$ ; $15\ \text{m/s}=54\ \text{km/h}$`],
        ['Aires', r`$1\ \text{m}^2=10^4\ \text{cm}^2$ ; $1\ \text{km}^2=10^6\ \text{m}^2$`],
        ['Volumes', r`$1\ \text{m}^3=1000\ \text{L}$ ; $1\ \text{L}=1\ \text{dm}^3=1000\ \text{cm}^3$ ; $1\ \text{mL}=1\ \text{cm}^3$`],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Aires et volumes',
      content: [
        P(r`Quand la longueur est multipliée par $k$, l’aire est multipliée par $k^2$ et le volume par $k^3$. C’est pourquoi $1\ \text{m}=100\ \text{cm}$ mais $1\ \text{m}^2=100^2=10\,000\ \text{cm}^2$.`),
      ],
    },
    P(r`Formule à retenir : $v=\dfrac{d}{t}$, donc $d=v\times t$ et $t=\dfrac{d}{v}$ (avec des unités cohérentes).`),

    H2('5. Notation scientifique et ordres de grandeur'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Notation scientifique',
      content: [
        P(r`Un nombre décimal positif s’écrit en **notation scientifique** sous la forme $a\times10^n$ où $1\le a<10$ et $n$ est un entier relatif.`),
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      content: [
        M(r`45\,000\,000=4{,}5\times10^7\qquad 0{,}00032=3{,}2\times10^{-4}`),
        M(r`(3\times10^5)\times(2\times10^{-2})=6\times10^3\qquad \frac{6\times10^8}{3\times10^3}=2\times10^5`),
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Ordre de grandeur',
      content: [
        P(r`On arrondit chaque nombre à un nombre « simple » (un chiffre significatif) puis on calcule de tête.`),
        P(r`Exemple : $49\times21\approx50\times20=1000$ (valeur exacte : $1029$).`),
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'La lumière du Soleil',
      content: [
        P(r`Distance Terre-Soleil : $1{,}5\times10^8$ km ; vitesse de la lumière : $3\times10^5$ km/s. Durée du trajet : $t=\dfrac{1{,}5\times10^8}{3\times10^5}=0{,}5\times10^3=500$ s, soit environ $8$ min $20$ s.`),
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Automatismes : s’entraîner chaque semaine',
      content: [
        P(r`Les questions « flash » (calculer 20 % de 150, simplifier une fraction, convertir 2,5 L en mL…) doivent se faire en moins d’une minute. Utilisez les QCM de l’onglet Représentations régulièrement.`),
      ],
    },
  ],

  exercices: [
    {
      id: 'auto-qcm-flash',
      title: 'QCM d’automatismes (flash)',
      difficulty: 1,
      duration: 10,
      tags: ['QCM', 'automatismes'],
      statement: [
        P('Sans calculatrice, choisir la bonne réponse.'),
        {
          type: 'qcm',
          questions: [
            { question: r`$7+3\times2=\;?$`, choices: ['20', '13', '12', '17'], answer: 1 },
            { question: r`$\dfrac14+\dfrac16=\;?$`, choices: [r`$\dfrac{2}{10}$`, r`$\dfrac{5}{12}$`, r`$\dfrac{1}{10}$`, r`$\dfrac{5}{24}$`], answer: 1 },
            { question: r`$10^4\times10^{-7}=\;?$`, choices: [r`$10^{-3}$`, r`$10^{-28}$`, r`$10^{3}$`, r`$10^{11}$`], answer: 0 },
            { question: r`Solution de $2x+3=11$ :`, choices: ['$x=7$', '$x=4$', '$x=5$', '$x=14$'], answer: 1 },
            { question: r`$0{,}6$ L en cL :`, choices: ['6 cL', '60 cL', '600 cL', '0,06 cL'], answer: 1 },
            { question: r`Un ordre de grandeur de $49\times21$ :`, choices: ['100', '1 000', '10 000', '500'], answer: 1 },
            { question: r`$x^2\times x^3=\;?$`, choices: [r`$x^5$`, r`$x^6$`, r`$2x^5$`, r`$x^{9}$`], answer: 0 },
            { question: r`$(-4)^2=\;?$`, choices: ['-16', '16', '-8', '8'], answer: 1 },
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          items: [
            r`$7+3\times2=7+6=13$ (la multiplication est prioritaire).`,
            r`$\dfrac14+\dfrac16=\dfrac{3}{12}+\dfrac{2}{12}=\dfrac5{12}$.`,
            r`$10^4\times10^{-7}=10^{4-7}=10^{-3}$.`,
            r`$2x=8$ donc $x=4$.`,
            r`$1\ \text{L}=100\ \text{cL}$ donc $0{,}6\ \text{L}=60\ \text{cL}$.`,
            r`$49\times21\approx50\times20=1000$.`,
            r`$x^2\times x^3=x^{2+3}=x^5$.`,
            r`$(-4)^2=(-4)\times(-4)=16$.`,
          ],
        },
      ],
    },
    {
      id: 'auto-fractions',
      title: 'Calculs avec des fractions',
      difficulty: 1,
      duration: 10,
      tags: ['fractions'],
      statement: [
        P('Calculer et donner le résultat sous forme de fraction irréductible :'),
        {
          type: 'list',
          ordered: true,
          items: [
            r`$A=\dfrac23+\dfrac34$`,
            r`$B=\dfrac56\times\dfrac9{10}$`,
            r`$C=\dfrac{2/5}{4/15}$`,
            r`$D=\dfrac12-\dfrac13$`,
          ],
        },
      ],
      hints: ['Pour additionner, mettre au même dénominateur.', 'Diviser par une fraction, c’est multiplier par son inverse.'],
      solution: [
        P(r`$A=\dfrac{8}{12}+\dfrac{9}{12}=\dfrac{17}{12}$ (irréductible car 17 est premier).`),
        P(r`$B=\dfrac{5\times9}{6\times10}=\dfrac{45}{60}=\dfrac{3}{4}$ (on divise par 15).`),
        P(r`$C=\dfrac25\times\dfrac{15}{4}=\dfrac{30}{20}=\dfrac32$.`),
        P(r`$D=\dfrac36-\dfrac26=\dfrac16$.`),
      ],
    },
    {
      id: 'auto-puissances-priorites',
      title: 'Puissances et priorités',
      difficulty: 1,
      duration: 10,
      tags: ['puissances', 'priorités'],
      statement: [
        P('Calculer sans calculatrice :'),
        {
          type: 'list',
          ordered: true,
          items: [
            r`$2^5\times2^{-3}$`,
            r`$\dfrac{(3^2)^3}{3^4}$`,
            r`$5\times10^{-3}\times10^{5}$`,
            r`$\left(\dfrac23\right)^{-2}$`,
            r`$18-6\div3$ et $2\times(5-8)^2$`,
            r`$-3^2$ et $(-3)^2$`,
            r`$12-3\times(4-6)$`,
          ],
        },
      ],
      hints: [r`$a^{-n}=\dfrac1{a^n}$.`, 'Respecter les priorités : parenthèses, puissances, ×÷, +−.'],
      solution: [
        P(r`1. $2^{5-3}=2^2=4$.`),
        P(r`2. $\dfrac{3^6}{3^4}=3^2=9$.`),
        P(r`3. $5\times10^{-3+5}=5\times10^2=500$.`),
        P(r`4. $\left(\dfrac32\right)^2=\dfrac94$.`),
        P(r`5. $18-6\div3=18-2=16$ ; $2\times(-3)^2=2\times9=18$.`),
        P(r`6. $-3^2=-9$ ; $(-3)^2=9$.`),
        P(r`7. $12-3\times(-2)=12+6=18$.`),
      ],
    },
    {
      id: 'auto-developper-factoriser',
      title: 'Développer et factoriser',
      difficulty: 2,
      duration: 15,
      tags: ['calcul littéral', 'identités remarquables'],
      statement: [
        P('**Partie A.** Développer et réduire :'),
        {
          type: 'list',
          ordered: true,
          items: [
            r`$(x+3)^2$`,
            r`$(2x-1)^2$`,
            r`$(x-5)(x+5)$`,
            r`$3(2x-4)+x(x+1)$`,
          ],
        },
        P('**Partie B.** Factoriser :'),
        {
          type: 'list',
          ordered: true,
          items: [
            r`$x^2-49$`,
            r`$4x^2+12x$`,
            r`$9x^2-6x+1$`,
            r`$(x+2)^2-9$`,
          ],
        },
      ],
      hints: ['Reconnaître $a^2\\pm2ab+b^2$ ou $a^2-b^2$.', 'Pour $(x+2)^2-9$, écrire $9=3^2$.'],
      solution: [
        P(r`**A.** 1. $x^2+6x+9$. 2. $(2x)^2-2\times2x\times1+1=4x^2-4x+1$. 3. $x^2-25$. 4. $6x-12+x^2+x=x^2+7x-12$.`),
        P(r`**B.** 1. $x^2-7^2=(x-7)(x+7)$. 2. Facteur commun $4x$ : $4x(x+3)$. 3. $(3x)^2-2\times3x\times1+1^2=(3x-1)^2$. 4. $(x+2)^2-3^2=(x+2-3)(x+2+3)=(x-1)(x+5)$.`),
        P(r`Vérification de B.4 pour $x=1$ : $(1+2)^2-9=0$ et $(1-1)(1+5)=0$.`),
      ],
    },
    {
      id: 'auto-equations',
      title: 'Équations et inéquations',
      difficulty: 2,
      duration: 15,
      tags: ['équations', 'inéquations'],
      statement: [
        P('Résoudre dans $\\mathbb R$ :'),
        {
          type: 'list',
          ordered: true,
          items: [
            r`$3x-7=11$`,
            r`$5x+2=2x-10$`,
            r`$\dfrac{2x-1}{3}=\dfrac{x+4}{2}$`,
            r`$3(x-2)=2(x+1)$`,
            r`$-2x+5\ge11$`,
            r`$4x-3<2x+7$`,
          ],
        },
      ],
      hints: ['Pour 3., multiplier par 6 ou faire le produit en croix.', 'En 5., diviser par $-2$ change le sens.'],
      solution: [
        P(r`1. $3x=18$, $x=6$.`),
        P(r`2. $3x=-12$, $x=-4$.`),
        P(r`3. $2(2x-1)=3(x+4)$, $4x-2=3x+12$, $x=14$.`),
        P(r`4. $3x-6=2x+2$, $x=8$ (vérif. : $3\times6=18=2\times9$).`),
        P(r`5. $-2x\ge6$, donc $x\le-3$ : $S=]-\infty\,;-3]$.`),
        P(r`6. $2x<10$, donc $x<5$ : $S=]-\infty\,;5[$.`),
      ],
    },
    {
      id: 'auto-conversions',
      title: 'Conversions',
      difficulty: 1,
      duration: 10,
      tags: ['conversions', 'unités'],
      statement: [
        P('Effectuer les conversions :'),
        {
          type: 'list',
          ordered: true,
          items: [
            r`$3{,}5$ h en heures et minutes`,
            r`$2$ h $45$ min en heures décimales`,
            r`$72$ km/h en m/s et $15$ m/s en km/h`,
            r`$2{,}5$ L en mL et en cm³`,
            r`$0{,}35$ m² en cm²`,
            r`$45$ min en heures`,
          ],
        },
      ],
      hints: [r`$1\ \text{m/s}=3{,}6\ \text{km/h}$.`, r`$1\ \text{m}^2=10^4\ \text{cm}^2$.`],
      solution: [
        P(r`1. $0{,}5\ \text{h}=30$ min donc $3{,}5\ \text{h}=3\ \text{h}\ 30$.`),
        P(r`2. $45$ min $=\dfrac{45}{60}=0{,}75$ h donc $2{,}75$ h.`),
        P(r`3. $72\div3{,}6=20$ m/s ; $15\times3{,}6=54$ km/h.`),
        P(r`4. $2{,}5\ \text{L}=2500\ \text{mL}=2500\ \text{cm}^3$.`),
        P(r`5. $0{,}35\times10\,000=3500\ \text{cm}^2$.`),
        P(r`6. $\dfrac{45}{60}=0{,}75$ h.`),
      ],
    },
    {
      id: 'auto-notation-scientifique',
      title: 'Notation scientifique et ordres de grandeur',
      difficulty: 2,
      duration: 15,
      tags: ['notation scientifique', 'ordre de grandeur'],
      statement: [
        P('1. Écrire en notation scientifique : $45\\,000\\,000$ et $0{,}00032$.'),
        P('2. Calculer et donner le résultat en notation scientifique : $(3\\times10^5)\\times(2\\times10^{-2})$ et $\\dfrac{6\\times10^8}{3\\times10^3}$.'),
        P('3. La Terre est à environ $1{,}5\\times10^8$ km du Soleil et la lumière se propage à $3\\times10^5$ km/s. Quel temps met la lumière du Soleil pour nous parvenir ? Donner le résultat en minutes et secondes.'),
        P('4. Donner un ordre de grandeur de $49\\times21$ puis de $\\dfrac{3{,}9\\times 10^4}{2{,}1\\times10^2}$.'),
      ],
      hints: ['Pour la division, diviser les nombres puis soustraire les exposants.', 'Convertir 500 s en minutes.'],
      solution: [
        P(r`1. $45\,000\,000=4{,}5\times10^7$ ; $0{,}00032=3{,}2\times10^{-4}$.`),
        P(r`2. $(3\times2)\times10^{5-2}=6\times10^3$ ; $\dfrac{6}{3}\times10^{8-3}=2\times10^5$.`),
        P(r`3. $t=\dfrac{1{,}5\times10^8}{3\times10^5}=0{,}5\times10^3=500$ s. Or $500=8\times60+20$ : environ $8$ min $20$ s.`),
        P(r`4. $49\times21\approx50\times20=1000$. $\dfrac{3{,}9\times10^4}{2{,}1\times10^2}\approx\dfrac{4\times10^4}{2\times10^2}=2\times10^2=200$ (valeur exacte $\approx185{,}7$).`),
      ],
    },
    {
      id: 'auto-abonnements',
      title: 'Choisir le meilleur tarif (type contrôle)',
      difficulty: 3,
      duration: 20,
      tags: ['équation', 'inéquation', 'modélisation', 'contrôle'],
      statement: [
        P('Une piscine propose deux formules :'),
        {
          type: 'list',
          items: [
            '**Formule A** : abonnement annuel de $12$ € puis $2{,}50$ € par entrée.',
            '**Formule B** : sans abonnement, $4{,}50$ € par entrée.',
          ],
        },
        P('Soit $x$ le nombre d’entrées dans l’année.'),
        {
          type: 'list',
          ordered: true,
          items: [
            'Exprimer en fonction de $x$ le prix $A(x)$ de la formule A et le prix $B(x)$ de la formule B.',
            'Pour quel nombre d’entrées les deux formules coûtent-elles le même prix ?',
            'À partir de combien d’entrées la formule A est-elle strictement plus avantageuse ?',
            'Un nageur vient 10 fois dans l’année. Quelle formule choisir ? Quelle économie réalise-t-il ?',
          ],
        },
      ],
      hints: ['Écrire $A(x)=12+2{,}5x$.', 'Résoudre $A(x)<B(x)$.'],
      solution: [
        P(r`1. $A(x)=12+2{,}5x$ et $B(x)=4{,}5x$.`),
        P(r`2. $A(x)=B(x)\iff12+2{,}5x=4{,}5x\iff12=2x\iff x=6$. Pour $6$ entrées, les deux formules coûtent $27$ €.`),
        P(r`3. $A(x)<B(x)\iff12<2x\iff x>6$. La formule A est plus avantageuse à partir de $7$ entrées.`),
        P(r`4. Pour $x=10$ : $A(10)=12+25=37$ € et $B(10)=45$ €. On choisit A et on économise $8$ €.`),
      ],
    },
    {
      id: 'auto-rectangle',
      title: 'Mise en équation d’un problème',
      difficulty: 3,
      duration: 15,
      tags: ['équation', 'modélisation'],
      statement: [
        P('Un rectangle a un périmètre de $38$ cm. Sa longueur dépasse sa largeur de $5$ cm.'),
        P('1. Traduire l’énoncé par une équation d’inconnue $\\ell$ (la largeur).'),
        P('2. Résoudre l’équation et en déduire les dimensions et l’aire du rectangle.'),
        P('3. Quelle serait l’aire d’un carré de même périmètre ? Comparer.'),
      ],
      hints: [r`Périmètre : $2\times(\text{largeur}+\text{longueur})$.`],
      solution: [
        P(r`1. Longueur $=\ell+5$ ; périmètre : $2(\ell+\ell+5)=38$.`),
        P(r`2. $2\ell+5=19$, $2\ell=14$, $\ell=7$ cm. Longueur $12$ cm. Vérification : $2(7+12)=38$. Aire $=7\times12=84$ cm².`),
        P(r`3. Côté du carré : $38\div4=9{,}5$ cm, aire $9{,}5^2=90{,}25$ cm², supérieure à $84$ cm² : à périmètre égal, le carré a la plus grande aire.`),
      ],
    },
  ],

  representations: [
    {
      type: 'qcm',
      questions: [
        { question: r`$2^3\times2^4=\;?$`, choices: [r`$2^7$`, r`$2^{12}$`, r`$4^7$`, r`$4^{12}$`], answer: 0, explanation: 'On additionne les exposants : 3 + 4 = 7.' },
        { question: r`$\dfrac{1}{2}+\dfrac{1}{3}=\;?$`, choices: [r`$\dfrac25$`, r`$\dfrac56$`, r`$\dfrac16$`, r`$\dfrac23$`], answer: 1, explanation: r`$\dfrac36+\dfrac26=\dfrac56$.` },
        { question: r`$(x+4)^2=\;?$`, choices: [r`$x^2+16$`, r`$x^2+4x+16$`, r`$x^2+8x+16$`, r`$x^2+8x+4$`], answer: 2, explanation: r`$(a+b)^2=a^2+2ab+b^2$ avec $a=x$, $b=4$.` },
        { question: r`Factoriser $x^2-9$ :`, choices: [r`$(x-3)^2$`, r`$(x-9)(x+1)$`, r`$(x-3)(x+3)$`, r`$x(x-9)$`], answer: 2 },
        { question: r`Solution de $4x-8=2x+6$ :`, choices: ['$x=1$', '$x=7$', '$x=-1$', '$x=14$'], answer: 1, explanation: r`$2x=14$ donc $x=7$.` },
        { question: r`Solution de $-3x<9$ :`, choices: ['$x<-3$', '$x>-3$', '$x<3$', '$x>3$'], answer: 1, explanation: 'On divise par -3 : le sens change.' },
        { question: r`$54$ km/h en m/s :`, choices: ['15', '194,4', '5,4', '30'], answer: 0, explanation: r`$54\div3{,}6=15$.` },
        { question: r`$0{,}0045$ en notation scientifique :`, choices: [r`$4{,}5\times10^{3}$`, r`$4{,}5\times10^{-3}$`, r`$45\times10^{-4}$`, r`$0{,}45\times10^{-2}$`], answer: 1, explanation: r`Seule $4{,}5\times10^{-3}$ a un facteur entre 1 et 10.` },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: r`$(a+b)^2=a^2+b^2$`, answer: false, explanation: r`Il manque $2ab$.` },
        { text: r`$-3^2=-9$`, answer: true, explanation: r`L’exposant s’applique à 3 seul.` },
        { text: r`$\dfrac12+\dfrac13=\dfrac25$`, answer: false, explanation: r`$\dfrac12+\dfrac13=\dfrac56$.` },
        { text: r`$10^{-2}=0{,}01$`, answer: true },
        { text: 'Multiplier les deux membres d’une inéquation par un nombre négatif conserve le sens de l’inégalité.', answer: false, explanation: 'Le sens est inversé.' },
        { text: r`$2^3\times2^4=2^{12}$`, answer: false, explanation: r`$2^3\times2^4=2^7$.` },
        { text: r`$0{,}0045=4{,}5\times10^{-3}$`, answer: true },
        { text: r`$(x+2)(x-2)=x^2-4$`, answer: true },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter les automatismes',
      text:
        'Pour passer de km/h à m/s, on divise par {{3,6|3.6}}. Un quart de 80 vaut {{20}}. ' +
        'L’écriture scientifique de 7 200 est 7,2 × 10^{{3}}. Multiplier par un nombre {{négatif}} change le sens d’une inégalité. ' +
        '1 m³ correspond à {{1000|1 000}} litres. Diviser par une fraction revient à multiplier par son {{inverse}}.',
    },
    {
      type: 'matching',
      title: 'Associer expression développée et factorisée',
      pairs: [
        { left: r`$x^2-9$`, right: r`$(x-3)(x+3)$` },
        { left: r`$x^2+6x+9$`, right: r`$(x+3)^2$` },
        { left: r`$x^2-6x+9$`, right: r`$(x-3)^2$` },
        { left: r`$4x^2-1$`, right: r`$(2x-1)(2x+1)$` },
        { left: r`$x^2+3x$`, right: r`$x(x+3)$` },
      ],
    },
    {
      type: 'ordering',
      title: 'Résoudre $5x+2=2x-10$ : remettre les étapes dans l’ordre',
      items: [
        r`$5x+2=2x-10$`,
        r`$5x-2x=-10-2$`,
        r`$3x=-12$`,
        r`$x=\dfrac{-12}{3}$`,
        r`$x=-4$`,
      ],
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Résolution graphique de $3x-7=11$',
      caption: 'L’abscisse du point d’intersection des deux droites est la solution de l’équation (x = 6).',
      props: { expressions: ['3x-7', '11'], xMin: -2, xMax: 10, yMin: -10, yMax: 20, editable: true },
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Ordre des priorités opératoires', back: 'Parenthèses, puissances, × et ÷ (de gauche à droite), puis + et −.' },
        { front: r`$a^m\times a^n$`, back: r`$a^{m+n}$` },
        { front: r`$\dfrac{a^m}{a^n}$`, back: r`$a^{m-n}$` },
        { front: r`$a^{-n}$`, back: r`$\dfrac1{a^n}$` },
        { front: r`$(a+b)^2$`, back: r`$a^2+2ab+b^2$` },
        { front: r`$(a-b)^2$`, back: r`$a^2-2ab+b^2$` },
        { front: r`$(a-b)(a+b)$`, back: r`$a^2-b^2$` },
        { front: 'Diviser par une fraction', back: 'Multiplier par son inverse.' },
        { front: 'km/h → m/s', back: r`Diviser par $3{,}6$.` },
        { front: '1 m³ en litres', back: '1 000 L.' },
        { front: 'Notation scientifique', back: r`$a\times10^n$ avec $1\le a<10$, $n$ entier relatif.` },
        { front: 'Inéquation et nombre négatif', back: 'Multiplier ou diviser par un négatif inverse le sens de l’inégalité.' },
      ],
    },
  ],
}

export default chapter
