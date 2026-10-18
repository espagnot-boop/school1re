import type { Block, Chapter } from '../types'

const r = String.raw
const P = (text: string): Block => ({ type: 'p', text })
const H2 = (text: string): Block => ({ type: 'h2', text })
const H3 = (text: string): Block => ({ type: 'h3', text })
const M = (tex: string): Block => ({ type: 'math', tex })

const chapter: Chapter = {
  id: 'proportions-evolutions',
  subject: 'maths-tc',
  order: 2,
  title: 'Proportions et évolutions',
  theme: 'Proportions et pourcentages',
  summary:
    'Proportion et pourcentage, pourcentage de pourcentage, taux d’évolution et coefficient multiplicateur, évolutions successives, évolution réciproque et indices.',
  duration: '3 semaines',
  objectives: [
    'Calculer et interpréter une proportion, un pourcentage ; calculer un pourcentage de pourcentage.',
    'Passer d’un taux d’évolution à un coefficient multiplicateur et inversement.',
    'Calculer une valeur finale, une valeur initiale ou un taux d’évolution.',
    'Déterminer le taux global d’évolutions successives et le taux d’évolution réciproque.',
    'Utiliser des indices de base 100 et calculer un taux entre deux indices.',
  ],
  keywords: [
    'proportion',
    'pourcentage',
    'taux d’évolution',
    'coefficient multiplicateur',
    'évolutions successives',
    'évolution réciproque',
    'indice',
  ],

  fiche: [
    H2('L’essentiel'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Proportion',
      content: [
        P(r`Si une partie $A$ compte $n_A$ éléments dans une population de $n$ éléments, la **proportion** de $A$ est $p=\dfrac{n_A}{n}$ avec $0\le p\le1$.`),
        P(r`En pourcentage : $p=0{,}35=35\ \%$. Prendre $t\ \%$ d’une quantité $=$ la multiplier par $\dfrac{t}{100}$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Pourcentage de pourcentage',
      content: [
        P(r`Si $A\subset B\subset E$ : $p_{A/E}=p_{A/B}\times p_{B/E}$.`),
        P(r`Exemple : $30\ \%$ de $60\ \%$ $=0{,}3\times0{,}6=0{,}18=18\ \%$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Taux d’évolution et coefficient multiplicateur',
      content: [
        M(r`t=\frac{V_F-V_I}{V_I}\qquad CM=1+t=\frac{V_F}{V_I}\qquad V_F=CM\times V_I`),
        P(r`Hausse de $8\ \%$ : $CM=1{,}08$. Baisse de $15\ \%$ : $CM=0{,}85$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Évolutions successives et réciproque',
      content: [
        P(r`Les coefficients **se multiplient** : $CM_{global}=CM_1\times CM_2\times\cdots$. ==Les taux ne s’additionnent pas.==`),
        P(r`Évolution réciproque : $CM'=\dfrac{1}{CM}$. Hausse de $25\ \%$ $\leftrightarrow$ baisse de $20\ \%$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Indices',
      content: [
        P(r`Indice base 100 : $I_t=100\times\dfrac{V_t}{V_0}$. Taux entre deux indices : $\dfrac{I_2}{I_1}-1$.`),
      ],
    },
  ],

  cours: [
    H2('1. Proportions et pourcentages'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Proportion',
      content: [
        P(r`Soit une population $E$ de $n$ éléments et une sous-population $A$ de $n_A$ éléments. La **proportion** de $A$ dans $E$ est le nombre $p=\dfrac{n_A}{n}$. C’est un nombre compris entre $0$ et $1$, que l’on peut écrire en **pourcentage** : $p=\dfrac{t}{100}$ ou $t\ \%$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        P(r`Dans une classe de $30$ élèves, il y a $18$ filles. La proportion de filles est $\dfrac{18}{30}=0{,}6=60\ \%$.`),
        P(r`Réciproquement : $60\ \%$ de $30$ élèves, c’est $0{,}6\times30=18$ élèves.`),
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Trois questions types',
      content: [
        {
          type: 'list',
          items: [
            r`**Calculer une proportion** : $p=\dfrac{\text{effectif de la partie}}{\text{effectif total}}$.`,
            r`**Calculer une partie** : $\text{partie}=p\times\text{total}$.`,
            r`**Calculer le total** : $\text{total}=\dfrac{\text{partie}}{p}$ (ex. : $42$ élèves représentent $35\ \%$, donc total $=\dfrac{42}{0{,}35}=120$).`,
          ],
        },
      ],
    },
    H3('Pourcentage de pourcentage'),
    {
      type: 'callout',
      variant: 'property',
      title: 'Propriété',
      content: [
        P(r`Si $A$ est une partie de $B$, elle-même partie de $E$ : la proportion de $A$ dans $E$ est le **produit** de la proportion de $A$ dans $B$ par la proportion de $B$ dans $E$.`),
        M(r`p_{A/E}=p_{A/B}\times p_{B/E}`),
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      content: [
        P(r`Dans un lycée de $1500$ élèves, $60\ \%$ sont demi-pensionnaires, et parmi eux $30\ \%$ sont en Première. La proportion d’élèves demi-pensionnaires en Première est $0{,}6\times0{,}3=0{,}18=18\ \%$, soit $0{,}18\times1500=270$ élèves.`),
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Attention',
      content: [
        P(r`On ne peut pas additionner ni comparer des pourcentages qui portent sur des **populations de référence différentes** (« $20\ \%$ des filles » n’est pas « $20\ \%$ de la classe »).`),
      ],
    },

    H2('2. Évolution : taux et coefficient multiplicateur'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Taux d’évolution',
      content: [
        P(r`Lorsqu’une quantité passe d’une valeur initiale $V_I$ à une valeur finale $V_F$, son **taux d’évolution** est`),
        M(r`t=\frac{V_F-V_I}{V_I}`),
        P(r`Si $t>0$ c’est une hausse, si $t<0$ une baisse. Le **coefficient multiplicateur** est $CM=1+t=\dfrac{V_F}{V_I}$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Lien taux – coefficient',
      content: [
        M(r`V_F=CM\times V_I=(1+t)\,V_I`),
        {
          type: 'table',
          headers: ['Évolution', 'Taux $t$', 'Coefficient $CM$'],
          rows: [
            ['Hausse de 8 %', r`$+0{,}08$`, r`$1{,}08$`],
            ['Baisse de 15 %', r`$-0{,}15$`, r`$0{,}85$`],
            ['Hausse de 100 %', r`$+1$`, r`$2$`],
            ['Baisse de 100 %', r`$-1$`, r`$0$`],
            ['Hausse de 40 %', r`$+0{,}4$`, r`$1{,}4$`],
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples résolus',
      content: [
        P(r`**Taux** : un prix passe de $80$ € à $92$ € : $t=\dfrac{92-80}{80}=\dfrac{12}{80}=0{,}15$, soit $+15\ \%$.`),
        P(r`**Valeur finale** : $45$ € augmenté de $12\ \%$ : $45\times1{,}12=50{,}40$ €.`),
        P(r`**Valeur initiale** : après une hausse de $25\ \%$, un prix vaut $150$ €. $V_I=\dfrac{150}{1{,}25}=120$ €.`),
        P(r`**Baisse** : $85$ € diminué de $30\ \%$ : $85\times0{,}7=59{,}50$ €.`),
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Identifier', text: r`Repérer la valeur initiale, la valeur finale ou le taux, et ce qu’on cherche.` },
        { title: 'Coefficient', text: r`Écrire $CM=1+t$ (ou $CM=\dfrac{V_F}{V_I}$).` },
        { title: 'Calculer', text: r`$V_F=CM\times V_I$ ; $V_I=\dfrac{V_F}{CM}$ ; $t=CM-1$.` },
        { title: 'Conclure', text: 'Rédiger une phrase avec l’unité et le sens de l’évolution (hausse ou baisse).' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Piège : retrouver la valeur initiale',
      content: [
        P(r`Après une hausse de $25\ \%$ on ne retrouve **pas** la valeur initiale en retirant $25\ \%$ : $150\times0{,}75=112{,}5\neq120$. Il faut **diviser** par $1{,}25$.`),
      ],
    },

    H2('3. Évolutions successives et évolution réciproque'),
    {
      type: 'callout',
      variant: 'property',
      title: 'Évolutions successives',
      content: [
        P(r`Si une quantité subit successivement deux évolutions de coefficients $CM_1$ et $CM_2$, le coefficient global est $CM=CM_1\times CM_2$ et le taux global est $t=CM-1$.`),
        P(r`==On ne somme pas les taux.==`),
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples',
      content: [
        P(r`Hausse de $20\ \%$ puis baisse de $20\ \%$ : $1{,}2\times0{,}8=0{,}96$ : baisse globale de $4\ \%$ (et non $0\ \%$).`),
        P(r`Trois hausses de $5\ \%$ : $1{,}05^3=1{,}157625$ : hausse globale d’environ $15{,}76\ \%$ (et non $15\ \%$).`),
        P(r`Remise de $30\ \%$ puis de $10\ \%$ : $0{,}7\times0{,}9=0{,}63$ : remise globale de $37\ \%$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Évolution réciproque',
      content: [
        P(r`L’évolution **réciproque** d’une évolution de coefficient $CM$ est celle qui permet de revenir à la valeur de départ. Son coefficient est $CM'=\dfrac1{CM}$.`),
      ],
    },
    {
      type: 'table',
      headers: ['Évolution', 'Coefficient', 'Réciproque', 'Taux de la réciproque'],
      rows: [
        ['Hausse de 25 %', r`$1{,}25$`, r`$\dfrac1{1{,}25}=0{,}8$`, 'baisse de 20 %'],
        ['Baisse de 20 %', r`$0{,}8$`, r`$\dfrac1{0{,}8}=1{,}25$`, 'hausse de 25 %'],
        ['Hausse de 50 %', r`$1{,}5$`, r`$\dfrac1{1{,}5}\approx0{,}667$`, 'baisse d’environ 33,3 %'],
        ['Baisse de 10 %', r`$0{,}9$`, r`$\dfrac1{0{,}9}\approx1{,}111$`, 'hausse d’environ 11,1 %'],
      ],
    },
    {
      type: 'widget',
      id: 'percent-evolution',
      title: 'Explorer les évolutions successives',
      caption: 'Modifier les taux : observer le coefficient global, le taux global et l’évolution réciproque.',
      props: { rates: [20, -20] },
    },

    H2('4. Indices'),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Indice de base 100',
      content: [
        P(r`Pour comparer l’évolution d’une grandeur $V$ à une date de référence $t_0$, on définit l’**indice** : $I_t=100\times\dfrac{V_t}{V_0}$. À la date de référence, l’indice vaut $100$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Taux entre deux indices',
      content: [
        M(r`t=\frac{I_2-I_1}{I_1}=\frac{I_2}{I_1}-1`),
        P(r`Les valeurs sont proportionnelles aux indices : $\dfrac{V_2}{V_1}=\dfrac{I_2}{I_1}$.`),
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      content: [
        P(r`Un loyer a pour indice $108$ en 2018 et $126$ en 2023 (base 100 en 2015). Entre 2018 et 2023 : $\dfrac{126}{108}-1\approx0{,}1667$, soit environ $+16{,}7\ \%$. Si le loyer 2018 est $540$ €, celui de 2023 est $540\times\dfrac{126}{108}=630$ €.`),
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Indice et taux',
      content: [
        P(r`Un indice de $108$ signifie $+8\ \%$ **par rapport à la base**. Entre deux dates quelconques, il faut faire le rapport des indices : on ne soustrait pas les indices pour obtenir un pourcentage.`),
      ],
    },
    {
      type: 'svg',
      caption: 'Schéma : un taux de +20 % correspond à un coefficient 1,2 ; la réciproque revient en multipliant par 1/1,2.',
      svg: `<svg viewBox="0 0 520 130" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
<rect x="30" y="40" width="110" height="46" fill="none" stroke="currentColor" stroke-width="1.5"/>
<rect x="360" y="40" width="130" height="46" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="85" y="68" text-anchor="middle" fill="currentColor">V initiale</text>
<text x="425" y="68" text-anchor="middle" fill="currentColor">V finale</text>
<path d="M145 52 C 220 10, 300 10, 355 52" fill="none" stroke="hsl(142 71% 45%)" stroke-width="2"/>
<path d="M355 76 C 300 120, 220 120, 145 76" fill="none" stroke="hsl(0 84% 60%)" stroke-width="2"/>
<text x="250" y="22" text-anchor="middle" fill="currentColor">× CM = 1 + t</text>
<text x="250" y="124" text-anchor="middle" fill="currentColor">× 1/CM (réciproque)</text>
</svg>`,
    },
  ],

  exercices: [
    {
      id: 'prop-qcm-flash',
      title: 'QCM d’automatismes : pourcentages',
      difficulty: 1,
      duration: 10,
      tags: ['QCM', 'automatismes'],
      statement: [
        P('Sans calculatrice :'),
        {
          type: 'qcm',
          questions: [
            { question: r`$20\ \%$ de $150$ :`, choices: ['20', '30', '15', '75'], answer: 1 },
            { question: r`Prix $200$ € avec une remise de $10\ \%$ :`, choices: ['180 €', '190 €', '210 €', '20 €'], answer: 0 },
            { question: r`Coefficient multiplicateur d’une hausse de $8\ \%$ :`, choices: ['0,08', '1,8', '1,08', '0,92'], answer: 2 },
            { question: r`Coefficient multiplicateur d’une baisse de $15\ \%$ :`, choices: ['0,15', '0,85', '1,15', '-0,15'], answer: 1 },
            { question: r`Un prix passe de $50$ à $60$ : le taux d’évolution est`, choices: ['+10 %', '+16,7 %', '+20 %', '+60 %'], answer: 2 },
            { question: r`Un prix augmente de $50\ \%$ puis diminue de $50\ \%$. Au total :`, choices: ['inchangé', 'baisse de 25 %', 'hausse de 25 %', 'baisse de 50 %'], answer: 1 },
            { question: r`$25\ \%$ de $40\ \%$ :`, choices: ['65 %', '15 %', '10 %', '1 %'], answer: 2 },
            { question: r`$CM=1{,}4$ correspond à`, choices: ['une hausse de 14 %', 'une hausse de 40 %', 'une hausse de 140 %', 'une baisse de 40 %'], answer: 1 },
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          items: [
            r`$0{,}2\times150=30$.`,
            r`$200\times0{,}9=180$ €.`,
            r`$1+0{,}08=1{,}08$.`,
            r`$1-0{,}15=0{,}85$.`,
            r`$\dfrac{60-50}{50}=0{,}2=20\ \%$.`,
            r`$1{,}5\times0{,}5=0{,}75$ : baisse de $25\ \%$.`,
            r`$0{,}25\times0{,}4=0{,}10=10\ \%$.`,
            r`$CM=1+t$ donc $t=0{,}4=40\ \%$.`,
          ],
        },
      ],
    },
    {
      id: 'prop-proportion',
      title: 'Proportions et pourcentage de pourcentage',
      difficulty: 1,
      duration: 12,
      tags: ['proportion'],
      statement: [
        P('1. Dans une classe de $30$ élèves, il y a $18$ filles. Quelle est la proportion de filles ? L’exprimer en pourcentage.'),
        P('2. Dans un lycée de $1500$ élèves, $60\\ \\%$ sont demi-pensionnaires, et parmi eux $30\\ \\%$ sont en Première. Quelle proportion des élèves du lycée sont demi-pensionnaires et en Première ? Combien d’élèves cela représente-t-il ?'),
        P('3. $42$ élèves choisissent l’option théâtre, ce qui représente $35\\ \\%$ des élèves d’un niveau. Combien y a-t-il d’élèves dans ce niveau ?'),
      ],
      hints: [r`Pourcentage de pourcentage : on multiplie les proportions.`],
      solution: [
        P(r`1. $p=\dfrac{18}{30}=0{,}6=60\ \%$.`),
        P(r`2. $p=0{,}6\times0{,}3=0{,}18=18\ \%$. Effectif : $0{,}18\times1500=270$ élèves.`),
        P(r`3. Total $=\dfrac{42}{0{,}35}=120$ élèves. Vérification : $0{,}35\times120=42$.`),
      ],
    },
    {
      id: 'prop-taux-evolution',
      title: 'Taux d’évolution et valeur finale',
      difficulty: 1,
      duration: 12,
      tags: ['taux d’évolution'],
      statement: [
        P('1. Calculer le taux d’évolution de $80$ à $92$, puis de $250$ à $200$.'),
        P('2. Un article à $45$ € augmente de $12\\ \\%$. Quel est son nouveau prix ?'),
        P('3. Un article à $85$ € baisse de $30\\ \\%$. Quel est son nouveau prix ?'),
        P('4. Après une hausse de $25\\ \\%$, un prix est de $150$ €. Quel était le prix initial ?'),
      ],
      hints: [r`$t=\dfrac{V_F-V_I}{V_I}$ ; $V_I=\dfrac{V_F}{CM}$.`],
      solution: [
        P(r`1. $\dfrac{92-80}{80}=0{,}15$ : hausse de $15\ \%$. $\dfrac{200-250}{250}=-0{,}2$ : baisse de $20\ \%$.`),
        P(r`2. $45\times1{,}12=50{,}40$ €.`),
        P(r`3. $85\times0{,}7=59{,}50$ €.`),
        P(r`4. $V_I=\dfrac{150}{1{,}25}=120$ €. Vérification : $120\times1{,}25=150$.`),
      ],
    },
    {
      id: 'prop-coefficients',
      title: 'Coefficients multiplicateurs',
      difficulty: 1,
      duration: 8,
      tags: ['coefficient multiplicateur'],
      statement: [
        P('Donner le coefficient multiplicateur associé à :'),
        { type: 'list', ordered: true, items: ['une hausse de $8\\ \\%$', 'une baisse de $15\\ \\%$', 'une hausse de $100\\ \\%$', 'une baisse de $2{,}5\\ \\%$'] },
        P('Donner le taux d’évolution associé au coefficient : $1{,}4$ ; $0{,}93$ ; $0{,}5$ ; $1{,}003$.'),
      ],
      solution: [
        P(r`1. $1{,}08$ ; 2. $0{,}85$ ; 3. $2$ ; 4. $1-0{,}025=0{,}975$.`),
        P(r`$1{,}4\to+40\ \%$ ; $0{,}93\to-7\ \%$ ; $0{,}5\to-50\ \%$ ; $1{,}003\to+0{,}3\ \%$.`),
      ],
    },
    {
      id: 'prop-successives',
      title: 'Évolutions successives',
      difficulty: 2,
      duration: 15,
      tags: ['évolutions successives'],
      statement: [
        P('1. Un prix augmente de $20\\ \\%$ puis diminue de $20\\ \\%$. Quel est le taux d’évolution global ?'),
        P('2. Un article à $200$ € subit une hausse de $10\\ \\%$ puis une baisse de $10\\ \\%$. Quel est son prix final ?'),
        P('3. Trois hausses successives de $5\\ \\%$ : taux global (arrondi à $0{,}01\\ \\%$) ?'),
        P('4. La population d’une ville varie de $+2\\ \\%$, puis $-3\\ \\%$, puis $+4\\ \\%$ au cours de trois années. Calculer le taux global, arrondi à $0{,}1\\ \\%$.'),
      ],
      hints: ['Multiplier les coefficients, pas additionner les taux.'],
      solution: [
        P(r`1. $1{,}2\times0{,}8=0{,}96$ : baisse de $4\ \%$.`),
        P(r`2. $1{,}1\times0{,}9=0{,}99$, donc $200\times0{,}99=198$ € (baisse de $1\ \%$).`),
        P(r`3. $1{,}05^3=1{,}157625$ : hausse d’environ $15{,}76\ \%$.`),
        P(r`4. $1{,}02\times0{,}97\times1{,}04=0{,}9894\times1{,}04=1{,}028976$ : hausse d’environ $2{,}9\ \%$.`),
      ],
    },
    {
      id: 'prop-reciproque',
      title: 'Évolutions réciproques',
      difficulty: 2,
      duration: 12,
      tags: ['évolution réciproque'],
      statement: [
        P('Un prix augmente de $25\\ \\%$.'),
        P('1. De quel pourcentage doit-il baisser ensuite pour retrouver sa valeur initiale ?'),
        P('2. Même question après une baisse de $20\\ \\%$, puis après une hausse de $50\\ \\%$, puis après une baisse de $10\\ \\%$ (arrondir à $0{,}1\\ \\%$).'),
        P('3. Un élève affirme : « après une hausse de $25\\ \\%$, une baisse de $25\\ \\%$ ramène au prix de départ ». Qu’en penser ?'),
      ],
      hints: [r`$CM'=\dfrac1{CM}$.`],
      solution: [
        P(r`1. $\dfrac1{1{,}25}=0{,}8$ : baisse de $20\ \%$.`),
        P(r`2. Après $-20\ \%$ : $\dfrac1{0{,}8}=1{,}25$, hausse de $25\ \%$. Après $+50\ \%$ : $\dfrac1{1{,}5}\approx0{,}667$, baisse d’environ $33{,}3\ \%$. Après $-10\ \%$ : $\dfrac1{0{,}9}\approx1{,}111$, hausse d’environ $11{,}1\ \%$.`),
        P(r`3. Faux : $1{,}25\times0{,}75=0{,}9375$, soit une baisse globale de $6{,}25\ \%$. Les pourcentages ne sont pas appliqués à la même base.`),
      ],
    },
    {
      id: 'prop-indices',
      title: 'Indices',
      difficulty: 2,
      duration: 15,
      tags: ['indices'],
      statement: [
        P('Un loyer a pour indice $108$ en 2018 et $126$ en 2023 (base $100$ en 2015).'),
        P('1. Quel est le taux d’évolution entre 2015 et 2018 ?'),
        P('2. Quel est le taux d’évolution entre 2018 et 2023 (arrondi à $0{,}1\\ \\%$) ?'),
        P('3. Le loyer en 2018 est de $540$ €. Quel est le loyer en 2023 ? Et en 2015 ?'),
      ],
      hints: [r`$\dfrac{V_2}{V_1}=\dfrac{I_2}{I_1}$.`],
      solution: [
        P(r`1. L’indice passe de $100$ à $108$ : $+8\ \%$.`),
        P(r`2. $\dfrac{126}{108}-1=0{,}1666\ldots$ : environ $+16{,}7\ \%$.`),
        P(r`3. $540\times\dfrac{126}{108}=5\times126=630$ € en 2023. En 2015 : $540\times\dfrac{100}{108}=500$ €.`),
      ],
    },
    {
      id: 'prop-soldes',
      title: 'Soldes, TVA et pouvoir d’achat (type contrôle)',
      difficulty: 3,
      duration: 25,
      tags: ['évolutions successives', 'modélisation', 'contrôle'],
      statement: [
        P('**Partie A — Soldes.** Un manteau coûte $80$ €. Le magasin applique une remise de $30\\ \\%$, puis une remise supplémentaire de $10\\ \\%$ sur le prix déjà soldé.'),
        { type: 'list', ordered: true, items: ['Calculer le prix final.', 'Quelle est la remise globale ? Est-elle égale à $40\\ \\%$ ? Comparer avec une remise unique de $40\\ \\%$.'] },
        P('**Partie B — TVA.** Un produit coûte $120$ € hors taxes ; la TVA est de $20\\ \\%$.'),
        { type: 'list', ordered: true, items: ['Calculer le prix TTC.', 'Un autre produit coûte $90$ € TTC. Quel est son prix hors taxes ?'] },
        P('**Partie C — Pouvoir d’achat.** Un salaire augmente de $3\\ \\%$ alors que les prix augmentent de $5\\ \\%$. Le pouvoir d’achat varie comme le rapport salaire / prix. Quelle est son évolution (arrondi à $0{,}1\\ \\%$) ?'),
      ],
      hints: ['Remises successives : multiplier les coefficients.', 'Prix HT $=\\dfrac{\\text{TTC}}{1{,}2}$.'],
      solution: [
        P(r`**A.1.** $80\times0{,}7\times0{,}9=80\times0{,}63=50{,}40$ €.`),
        P(r`**A.2.** $CM=0{,}63$, donc remise globale de $37\ \%$, inférieure à $40\ \%$. Une remise unique de $40\ \%$ donnerait $80\times0{,}6=48$ €, plus avantageuse.`),
        P(r`**B.1.** $120\times1{,}2=144$ € TTC.`),
        P(r`**B.2.** $\dfrac{90}{1{,}2}=75$ € HT. Vérification : $75\times1{,}2=90$.`),
        P(r`**C.** Coefficient : $\dfrac{1{,}03}{1{,}05}\approx0{,}98095$ : le pouvoir d’achat baisse d’environ $1{,}9\ \%$.`),
      ],
    },
    {
      id: 'prop-taux-annuel',
      title: 'Taux annuel constant',
      difficulty: 3,
      duration: 15,
      tags: ['évolutions successives', 'taux moyen'],
      statement: [
        P('Un prix est multiplié par $1{,}331$ en trois ans, avec le même taux d’évolution $t$ chaque année.'),
        P('1. Quel coefficient annuel $c$ vérifie $c^3=1{,}331$ ? (Tester $c=1{,}1$.)'),
        P('2. En déduire $t$.'),
        P('3. Si le prix initial est $1000$ €, calculer le prix après chacune des trois années.'),
      ],
      solution: [
        P(r`1. $1{,}1^2=1{,}21$ et $1{,}21\times1{,}1=1{,}331$ : $c=1{,}1$ convient.`),
        P(r`2. $t=c-1=0{,}1$ : hausse de $10\ \%$ par an.`),
        P(r`3. Année 1 : $1100$ € ; année 2 : $1210$ € ; année 3 : $1331$ €.`),
      ],
    },
  ],

  representations: [
    {
      type: 'widget',
      id: 'percent-evolution',
      title: 'Évolutions successives et réciproque',
      caption: 'Essayer +50 % puis -50 % ; +10 % puis +10 % ; observer que les taux ne s’additionnent pas.',
      props: { rates: [10, 10] },
    },
    {
      type: 'qcm',
      questions: [
        { question: r`Un prix passe de $40$ € à $50$ €. Le taux d’évolution est :`, choices: ['+10 %', '+20 %', '+25 %', '+80 %'], answer: 2, explanation: r`$\dfrac{50-40}{40}=0{,}25$.` },
        { question: r`Après une hausse de $20\ \%$, un prix vaut $60$ €. Le prix initial était :`, choices: ['48 €', '50 €', '52 €', '72 €'], answer: 1, explanation: r`$\dfrac{60}{1{,}2}=50$.` },
        { question: r`Hausse de $10\ \%$ puis baisse de $10\ \%$ :`, choices: ['aucune variation', 'baisse de 1 %', 'hausse de 1 %', 'baisse de 10 %'], answer: 1, explanation: r`$1{,}1\times0{,}9=0{,}99$.` },
        { question: r`La réciproque d’une baisse de $50\ \%$ est :`, choices: ['hausse de 50 %', 'hausse de 100 %', 'hausse de 200 %', 'hausse de 25 %'], answer: 1, explanation: r`$\dfrac1{0{,}5}=2$ : doublement.` },
        { question: r`Indice $100$ en 2010 et $120$ en 2020 : évolution :`, choices: ['+12 %', '+20 %', '+120 %', '+1,2 %'], answer: 1 },
        { question: r`Coefficient global de $+20\ \%$ puis $+30\ \%$ :`, choices: ['1,5', '1,50', '1,56', '1,6'], answer: 2, explanation: r`$1{,}2\times1{,}3=1{,}56$ : $+56\ \%$.` },
        { question: r`$30\ \%$ de $50\ \%$ vaut :`, choices: ['80 %', '20 %', '15 %', '150 %'], answer: 2 },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: r`Deux hausses successives de $10\ \%$ font une hausse de $20\ \%$.`, answer: false, explanation: r`$1{,}1^2=1{,}21$ : $21\ \%$.` },
        { text: r`Une baisse de $20\ \%$ suivie d’une hausse de $20\ \%$ ramène à la valeur initiale.`, answer: false, explanation: r`$0{,}8\times1{,}2=0{,}96$.` },
        { text: r`Un coefficient multiplicateur de $0{,}9$ correspond à une baisse de $10\ \%$.`, answer: true },
        { text: r`Pour retrouver la valeur initiale après une hausse de $25\ \%$, on baisse de $20\ \%$.`, answer: true, explanation: r`$1{,}25\times0{,}8=1$.` },
        { text: r`Un indice de $85$ en base $100$ signifie une baisse de $15\ \%$ par rapport à la base.`, answer: true },
        { text: r`Une proportion peut être supérieure à $1$.`, answer: false, explanation: 'Une proportion d’une partie dans un tout est comprise entre 0 et 1.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text:
        'Le coefficient multiplicateur d’une baisse de 20 % est {{0,8|0.8}}. Une hausse de 25 % a pour coefficient {{1,25|1.25}}. ' +
        'Pour des évolutions successives, on {{multiplie}} les coefficients. Le coefficient de l’évolution réciproque est l’{{inverse}} du coefficient. ' +
        'Pour calculer un taux, on divise la variation par la valeur {{initiale}}.',
    },
    {
      type: 'matching',
      title: 'Associer évolution et coefficient',
      pairs: [
        { left: 'Hausse de 5 %', right: '1,05' },
        { left: 'Baisse de 5 %', right: '0,95' },
        { left: 'Hausse de 50 %', right: '1,5' },
        { left: 'Baisse de 50 %', right: '0,5' },
        { left: 'Doublement', right: '2' },
      ],
    },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Valeur finale en fonction de la valeur initiale',
      caption: 'Les droites $y=CM\\times x$ : la pente est le coefficient multiplicateur (hausse de 25 %, baisse de 20 %).',
      props: { expressions: ['1.25x', '0.8x', 'x'], xMin: 0, xMax: 100, yMin: 0, yMax: 140, editable: true },
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Proportion de A dans E', back: r`$p=\dfrac{n_A}{n_E}$, comprise entre 0 et 1.` },
        { front: 'Pourcentage de pourcentage', back: r`On multiplie les proportions : $p_{A/E}=p_{A/B}\times p_{B/E}$.` },
        { front: 'Taux d’évolution', back: r`$t=\dfrac{V_F-V_I}{V_I}$` },
        { front: 'Coefficient multiplicateur', back: r`$CM=1+t=\dfrac{V_F}{V_I}$` },
        { front: 'Retrouver la valeur initiale', back: r`$V_I=\dfrac{V_F}{CM}$` },
        { front: 'Évolutions successives', back: r`$CM=CM_1\times CM_2\times\cdots$ ; les taux ne s’additionnent pas.` },
        { front: 'Évolution réciproque', back: r`$CM'=\dfrac1{CM}$` },
        { front: 'Hausse de 25 %, réciproque ?', back: 'Baisse de 20 %.' },
        { front: 'Indice base 100', back: r`$I_t=100\times\dfrac{V_t}{V_0}$` },
        { front: 'Taux entre deux indices', back: r`$\dfrac{I_2}{I_1}-1$` },
      ],
    },
  ],
}

export default chapter
