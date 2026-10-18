import type { Chapter } from '../types'

const r = String.raw

// ---------------------------------------------------------------------------
// SVG privés à ce fichier
// ---------------------------------------------------------------------------
const FONT = 'font-family="Geist, sans-serif"'
const BLUE = 'hsl(217 91% 60%)'
const RED = 'hsl(0 84% 60%)'
const GREEN = 'hsl(142 71% 45%)'
const ORANGE = 'hsl(25 95% 53%)'

/** Nuage de points : suite arithmétique (bleu) et géométrique (orange) pour n = 0..8 */
function comparisonSvg(): string {
  const L = 50, T = 20, W = 420, H = 230
  const X = (n: number) => +(L + (n / 8) * W).toFixed(1)
  const Y = (y: number) => +(T + H - (y / 55) * H).toFixed(1)
  let s = `<svg viewBox="0 0 500 290" role="img" aria-label="Comparaison croissance linéaire et exponentielle">`
  for (const t of [0, 10, 20, 30, 40, 50]) {
    s += `<line x1="${L}" y1="${Y(t)}" x2="${L + W}" y2="${Y(t)}" stroke="currentColor" opacity="0.12"/>`
    s += `<text x="${L - 8}" y="${Y(t) + 4}" text-anchor="end" font-size="11" fill="currentColor" ${FONT}>${t}</text>`
  }
  for (let n = 0; n <= 8; n++) {
    s += `<text x="${X(n)}" y="${T + H + 18}" text-anchor="middle" font-size="11" fill="currentColor" ${FONT}>${n}</text>`
  }
  s += `<line x1="${L}" y1="${T + H}" x2="${L + W}" y2="${T + H}" stroke="currentColor"/>`
  s += `<line x1="${L}" y1="${T}" x2="${L}" y2="${T + H}" stroke="currentColor"/>`
  s += `<text x="${L + W / 2}" y="${T + H + 38}" text-anchor="middle" font-size="12" fill="currentColor" ${FONT}>rang n</text>`
  let pa = '', pg = ''
  for (let n = 0; n <= 8; n++) {
    const u = 2 + 3 * n
    const v = 2 * Math.pow(1.5, n)
    pa += `${n === 0 ? 'M' : 'L'}${X(n)},${Y(u)} `
    pg += `${n === 0 ? 'M' : 'L'}${X(n)},${Y(v)} `
  }
  s += `<path d="${pa}" fill="none" stroke="${BLUE}" stroke-width="1" stroke-dasharray="4 3"/>`
  s += `<path d="${pg}" fill="none" stroke="${ORANGE}" stroke-width="1" stroke-dasharray="4 3"/>`
  for (let n = 0; n <= 8; n++) {
    const u = 2 + 3 * n
    const v = 2 * Math.pow(1.5, n)
    s += `<circle cx="${X(n)}" cy="${Y(u)}" r="4" fill="${BLUE}"/>`
    s += `<circle cx="${X(n)}" cy="${Y(v)}" r="4" fill="${ORANGE}"/>`
  }
  s += `<text x="${X(8) - 6}" y="${Y(26) - 8}" text-anchor="end" font-size="12" fill="${BLUE}" ${FONT}>u(n) = 2 + 3n  (arithmétique)</text>`
  s += `<text x="${X(7) - 4}" y="${Y(34.2) - 6}" text-anchor="end" font-size="12" fill="${ORANGE}" ${FONT}>v(n) = 2 × 1,5^n  (géométrique)</text>`
  s += `</svg>`
  return s
}

/** Lecture d'une suite : diagramme en bâtons des 6 premiers termes de 100, +10 % */
function barsSvg(): string {
  const vals = [100, 110, 121, 133.1, 146.41, 161.05]
  const L = 40, T = 20, W = 400, H = 150
  const bw = 44
  let s = `<svg viewBox="0 0 480 220" role="img" aria-label="Évolution de 10 % par an">`
  s += `<line x1="${L}" y1="${T + H}" x2="${L + W}" y2="${T + H}" stroke="currentColor"/>`
  vals.forEach((v, i) => {
    const x = L + 12 + i * 66
    const h = (v / 170) * H
    s += `<rect x="${x}" y="${T + H - h}" width="${bw}" height="${h}" fill="${GREEN}" opacity="0.75"/>`
    s += `<text x="${x + bw / 2}" y="${T + H - h - 5}" text-anchor="middle" font-size="11" fill="currentColor" ${FONT}>${String(v).replace('.', ',')}</text>`
    s += `<text x="${x + bw / 2}" y="${T + H + 16}" text-anchor="middle" font-size="11" fill="currentColor" ${FONT}>n = ${i}</text>`
    if (i > 0) {
      s += `<text x="${x - 11}" y="${T + 12}" text-anchor="middle" font-size="11" fill="${RED}" ${FONT}>×1,1</text>`
    }
  })
  s += `<text x="${L + W / 2}" y="212" text-anchor="middle" font-size="12" fill="currentColor" ${FONT}>Chaque barre = la précédente × 1,1 : l’accroissement augmente à chaque étape</text>`
  s += `</svg>`
  return s
}

/** Schéma « ajouter » vs « multiplier » */
function mechanismSvg(): string {
  let s = `<svg viewBox="0 0 520 190" role="img" aria-label="Additionner ou multiplier">`
  s += `<text x="10" y="20" font-size="13" font-weight="600" fill="${BLUE}" ${FONT}>Suite arithmétique : on ajoute toujours la même quantité r</text>`
  const au = [3, 7, 11, 15, 19]
  au.forEach((v, i) => {
    const x = 20 + i * 100
    s += `<rect x="${x}" y="35" width="50" height="28" fill="none" stroke="currentColor"/>`
    s += `<text x="${x + 25}" y="54" text-anchor="middle" font-size="13" fill="currentColor" ${FONT}>${v}</text>`
    if (i < au.length - 1) {
      s += `<line x1="${x + 52}" y1="49" x2="${x + 98}" y2="49" stroke="${BLUE}" marker-end="url(#ar)"/>`
      s += `<text x="${x + 75}" y="30" text-anchor="middle" font-size="11" fill="${BLUE}" ${FONT}>+4</text>`
    }
  })
  s += `<text x="10" y="110" font-size="13" font-weight="600" fill="${ORANGE}" ${FONT}>Suite géométrique : on multiplie toujours par le même nombre q</text>`
  const gu = [3, 6, 12, 24, 48]
  gu.forEach((v, i) => {
    const x = 20 + i * 100
    s += `<rect x="${x}" y="125" width="50" height="28" fill="none" stroke="currentColor"/>`
    s += `<text x="${x + 25}" y="144" text-anchor="middle" font-size="13" fill="currentColor" ${FONT}>${v}</text>`
    if (i < gu.length - 1) {
      s += `<line x1="${x + 52}" y1="139" x2="${x + 98}" y2="139" stroke="${ORANGE}" marker-end="url(#ag)"/>`
      s += `<text x="${x + 75}" y="120" text-anchor="middle" font-size="11" fill="${ORANGE}" ${FONT}>×2</text>`
    }
  })
  s += `<defs>
    <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${BLUE}"/></marker>
    <marker id="ag" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${ORANGE}"/></marker>
  </defs>`
  s += `</svg>`
  return s
}

const chapter: Chapter = {
  id: 'suites',
  subject: 'maths-tc',
  order: 4,
  title: 'Suites',
  theme: 'Suites',
  summary:
    'Suites arithmétiques (croissance linéaire) et géométriques (croissance exponentielle) : définition, terme général, représentation, comparaison et applications aux placements et aux populations.',
  duration: '3 semaines',
  objectives: [
    'Calculer des termes d’une suite définie par une formule explicite ou par une relation de récurrence.',
    'Reconnaître une suite arithmétique ou géométrique et en donner la raison.',
    'Exprimer $u_n$ en fonction de $n$ pour une suite arithmétique ou géométrique.',
    'Associer croissance linéaire et suite arithmétique, croissance exponentielle et suite géométrique.',
    'Traduire une évolution en pourcentage par un coefficient multiplicateur $q = 1 + \\frac{t}{100}$.',
    'Comparer deux modèles d’évolution et déterminer un seuil à l’aide d’un tableur ou d’un programme Python.',
  ],
  keywords: ['suite', 'terme général', 'récurrence', 'raison', 'arithmétique', 'géométrique', 'croissance linéaire', 'croissance exponentielle', 'intérêts composés', 'seuil'],

  // =========================================================================
  fiche: [
    { type: 'h2', text: 'L’essentiel sur les suites' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Suite numérique',
      content: [
        {
          type: 'p',
          text: r`Une **suite** $(u_n)$ associe à chaque entier naturel $n$ (le **rang**) un nombre $u_n$ (le **terme** de rang $n$). On la définit soit par une **formule explicite** $u_n = f(n)$, soit par une **relation de récurrence** $u_{n+1} = f(u_n)$ avec un premier terme $u_0$.`,
        },
      ],
    },
    {
      type: 'table',
      headers: ['', 'Suite arithmétique', 'Suite géométrique'],
      rows: [
        ['Principe', 'on **ajoute** toujours $r$', 'on **multiplie** toujours par $q$'],
        ['Récurrence', '$u_{n+1} = u_n + r$', '$u_{n+1} = q \\times u_n$'],
        ['Terme général', '$u_n = u_0 + n\\,r$', '$u_n = u_0 \\times q^n$'],
        ['Représentation', 'points **alignés**', 'points sur une courbe qui « décolle » ou « s’écrase »'],
        ['Croissance', '**linéaire** (accroissement constant)', '**exponentielle** (taux constant)'],
        ['Sens de variation', 'croissante si $r > 0$, décroissante si $r < 0$', 'si $u_0 > 0$ : croissante si $q > 1$, décroissante si $0 < q < 1$'],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Pourcentages et coefficient multiplicateur',
      content: [
        {
          type: 'p',
          text: r`Une augmentation de $t\,\%$ à chaque étape correspond à $q = 1 + \frac{t}{100}$ ; une baisse de $t\,\%$ à $q = 1 - \frac{t}{100}$. Exemples : $+5\,\% \to q = 1{,}05$ ; $-20\,\% \to q = 0{,}8$.`,
        },
        { type: 'p', text: 'Une évolution **à taux constant** donne une suite **géométrique** ; une évolution **d’une quantité constante** donne une suite **arithmétique**.' },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Comment reconnaître le type de suite ?',
      content: [
        {
          type: 'list',
          items: [
            r`Calculer $u_1 - u_0$, $u_2 - u_1$, … : tous égaux ? $\Rightarrow$ arithmétique.`,
            r`Calculer $\frac{u_1}{u_0}$, $\frac{u_2}{u_1}$, … : tous égaux ? $\Rightarrow$ géométrique.`,
            'Sinon, la suite n’est ni arithmétique ni géométrique.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'À retenir',
      content: [
        {
          type: 'list',
          items: [
            'Arithmétique = ajouter = droite = linéaire. Géométrique = multiplier = exponentielle.',
            'Sur le long terme, une croissance exponentielle ($q>1$) finit **toujours** par dépasser une croissance linéaire.',
            'Pour trouver un **seuil** (premier $n$ tel que $u_n > A$) : tableur, ou boucle `while` en Python.',
          ],
        },
      ],
    },
  ],

  // =========================================================================
  cours: [
    { type: 'h2', text: '1. Qu’est-ce qu’une suite ?' },
    {
      type: 'p',
      text: 'Une suite est une **liste infinie de nombres rangés dans un ordre précis** : un premier terme, un deuxième, un troisième… Elle sert à modéliser un phénomène qui évolue **étape par étape** : le capital d’un compte épargne année après année, la population d’une ville chaque 1er janvier, le nombre d’abonnés d’une chaîne chaque mois.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Définition et notations',
      content: [
        {
          type: 'p',
          text: r`Une suite numérique $(u_n)$ est une fonction qui, à tout entier naturel $n$, associe un réel noté $u_n$.`,
        },
        {
          type: 'list',
          items: [
            r`$n$ est le **rang** (ou l’indice), $u_n$ est le **terme de rang $n$**.`,
            r`$u_0$ est le terme initial (on peut aussi commencer à $u_1$).`,
            r`$u_{n+1}$ est le terme **suivant** $u_n$ ; $u_{n-1}$ est le terme **précédent**.`,
          ],
        },
        { type: 'p', text: r`Attention : $u_{n+1}$ n’est **pas** « $u_n + 1$ » en général !` },
      ],
    },
    { type: 'h3', text: 'Deux façons de définir une suite' },
    {
      type: 'grid',
      columns: 2,
      items: [
        {
          icon: 'Calculator',
          title: 'Formule explicite',
          text: r`$u_n$ s’exprime directement en fonction de $n$. Exemple : $u_n = 3n + 2$. Pour obtenir $u_{10}$ : $u_{10} = 3\times 10 + 2 = 32$, sans calculer les termes précédents.`,
        },
        {
          icon: 'Repeat',
          title: 'Relation de récurrence',
          text: r`On donne $u_0$ et la règle pour passer d’un terme au suivant. Exemple : $u_0 = 5$ et $u_{n+1} = 2u_n - 1$. Alors $u_1 = 9$, $u_2 = 17$, $u_3 = 33$… Il faut calculer de proche en proche.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Calculer des termes',
      content: [
        { type: 'p', text: r`Soit $(v_n)$ définie par $v_0 = 4$ et $v_{n+1} = v_n^2 - 3$.` },
        { type: 'p', text: r`$v_1 = 4^2 - 3 = 13$ ; $v_2 = 13^2 - 3 = 166$. La suite grandit très vite.` },
        { type: 'p', text: r`Soit $w_n = n^2 - 4n$. Alors $w_0 = 0$, $w_1 = -3$, $w_2 = -4$, $w_3 = -3$, $w_4 = 0$ : la suite est d’abord décroissante, puis croissante.` },
      ],
    },

    { type: 'h2', text: '2. Suites arithmétiques : la croissance linéaire' },
    { type: 'svg', svg: mechanismSvg(), caption: 'Arithmétique : on ajoute 4 à chaque étape. Géométrique : on multiplie par 2 à chaque étape.', maxWidth: 560 },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Suite arithmétique',
      content: [
        {
          type: 'p',
          text: r`Une suite $(u_n)$ est **arithmétique** s’il existe un réel $r$, appelé **raison**, tel que pour tout entier $n$ : $$u_{n+1} = u_n + r.$$`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Terme général',
      content: [
        {
          type: 'p',
          text: r`Si $(u_n)$ est arithmétique de premier terme $u_0$ et de raison $r$, alors pour tout $n$ : $$u_n = u_0 + n\,r.$$ Plus généralement, $u_n = u_p + (n - p)\,r$.`,
        },
      ],
    },
    {
      type: 'p',
      text: r`**Pourquoi ?** Chaque passage d’un terme au suivant ajoute $r$. Pour aller de $u_0$ à $u_n$ on fait $n$ passages, donc on ajoute $n$ fois $r$ : $u_n = u_0 + r + r + \dots + r = u_0 + n\,r$.`,
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé',
      content: [
        { type: 'p', text: r`Un abonnement démarre avec 800 abonnés et gagne 150 abonnés par mois. Le nombre d’abonnés au bout de $n$ mois est une suite arithmétique : $u_0 = 800$, $r = 150$, donc $u_n = 800 + 150n$.` },
        { type: 'p', text: r`Au bout d’un an : $u_{12} = 800 + 150\times 12 = 2\,600$. Pour atteindre 2 000 abonnés : $800 + 150n = 2000 \iff n = 8$ mois.` },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Représentation et sens de variation',
      content: [
        {
          type: 'list',
          items: [
            r`Les points $(n\,;\,u_n)$ sont **alignés** : ils sont sur la droite d’équation $y = u_0 + r\,x$ (de pente $r$).`,
            r`Si $r > 0$ la suite est **croissante** ; si $r < 0$ elle est **décroissante** ; si $r = 0$ elle est constante.`,
            'On parle de **croissance linéaire** : l’accroissement est le même à chaque étape.',
          ],
        },
      ],
    },

    { type: 'h2', text: '3. Suites géométriques : la croissance exponentielle' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Suite géométrique',
      content: [
        {
          type: 'p',
          text: r`Une suite $(u_n)$ est **géométrique** s’il existe un réel $q$, appelé **raison**, tel que pour tout entier $n$ : $$u_{n+1} = q \times u_n.$$`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Terme général',
      content: [
        {
          type: 'p',
          text: r`Si $(u_n)$ est géométrique de premier terme $u_0$ et de raison $q$, alors pour tout $n$ : $$u_n = u_0 \times q^n.$$ Plus généralement, $u_n = u_p \times q^{\,n-p}$.`,
        },
      ],
    },
    {
      type: 'p',
      text: r`**Pourquoi ?** Pour aller de $u_0$ à $u_n$ on multiplie $n$ fois par $q$ : $u_n = u_0 \times q \times q \times \dots \times q = u_0\, q^n$.`,
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Sens de variation (cas $u_0 > 0$)',
      content: [
        {
          type: 'table',
          headers: ['Raison $q$', 'Comportement de $(u_n)$'],
          rows: [
            ['$q > 1$', 'croissante, et **sans limite** : elle dépasse tout nombre fixé'],
            ['$q = 1$', 'constante'],
            ['$0 < q < 1$', 'décroissante, se rapproche de $0$'],
            ['$q < 0$', 'signe qui alterne (suite « en zigzag »), ni croissante ni décroissante'],
          ],
        },
        { type: 'p', text: r`Si $u_0 < 0$, les sens de variation sont inversés.` },
      ],
    },
    { type: 'svg', svg: barsSvg(), caption: 'Capital de 100 € placé à 10 % par an : chaque année l’augmentation est plus grande que la précédente (10 €, 11 €, 12,10 €…).', maxWidth: 560 },

    { type: 'h2', text: '4. Évolutions en pourcentage' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Lien taux – raison',
      content: [
        {
          type: 'p',
          text: r`Augmenter une quantité de $t\,\%$ revient à la multiplier par $1 + \frac{t}{100}$ ; la diminuer de $t\,\%$ revient à la multiplier par $1 - \frac{t}{100}$. Une évolution de **taux constant** donne donc une suite **géométrique** de raison $q = 1 \pm \frac{t}{100}$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Intérêts composés',
      content: [
        { type: 'p', text: r`On place 1 200 € à 2,5 % par an, intérêts capitalisés (les intérêts rapportent eux-mêmes des intérêts). Le capital est multiplié par $1{,}025$ chaque année : $C_n = 1200 \times 1{,}025^n$.` },
        { type: 'p', text: r`Après 5 ans : $C_5 = 1200 \times 1{,}025^5 \approx 1\,357{,}69$ €.` },
        { type: 'p', text: r`À **intérêts simples** (2,5 % du capital initial, soit 30 €, versés chaque année) le capital serait une suite arithmétique : $S_n = 1200 + 30n$, donc $S_5 = 1\,350$ €. La différence (7,69 €) vient des intérêts des intérêts.` },
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
            r`Deux hausses successives de $10\,\%$ ne font **pas** $+20\,\%$ mais $1{,}1^2 = 1{,}21$, soit $+21\,\%$.`,
            r`Une baisse de $20\,\%$ suivie d’une hausse de $20\,\%$ ne ramène **pas** à la valeur de départ : $0{,}8 \times 1{,}2 = 0{,}96$.`,
            r`Dans $u_n = u_0\,q^n$, l’exposant est $n$ et **pas** $n+1$ si l’on part de $u_0$.`,
            r`$u_0 q^n \neq (u_0 q)^n$ : la puissance ne porte que sur $q$.`,
          ],
        },
      ],
    },

    { type: 'h2', text: '5. Comparer croissance linéaire et exponentielle' },
    { type: 'svg', svg: comparisonSvg(), caption: 'Au début, la suite arithmétique est devant ; vers n = 6 la suite géométrique la dépasse, puis l’écart se creuse.', maxWidth: 580 },
    {
      type: 'p',
      text: r`Avec $u_n = 2 + 3n$ et $v_n = 2\times 1{,}5^n$ : en $n = 5$, $u_5 = 17$ et $v_5 \approx 15{,}2$ ; en $n = 6$, $u_6 = 20$ et $v_6 \approx 22{,}8$. À partir de $n = 6$ la suite géométrique reste au-dessus. Plus $n$ grandit, plus l’écart explose.`,
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Message clé',
      content: [
        { type: 'p', text: r`Toute croissance exponentielle ($q > 1$, $u_0>0$) finit par **dépasser** toute croissance linéaire, même si elle part de plus bas ou démarre lentement. C’est ce qui rend les épidémies, les dettes à intérêts composés ou les « chaînes » si difficiles à intuiter.` },
      ],
    },

    { type: 'h2', text: '6. Déterminer un seuil' },
    {
      type: 'callout',
      variant: 'method',
      title: 'Chercher le plus petit $n$ tel que $u_n$ dépasse un seuil',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Modéliser', text: r`Identifier le type de suite et écrire $u_0$, la raison, et la formule de $u_n$.` },
            { title: 'Tester à la main ou au tableur', text: 'Calculer quelques termes et repérer entre quels rangs le seuil est franchi.' },
            { title: 'Utiliser un algorithme', text: 'Une boucle `while` calcule les termes un à un tant que le seuil n’est pas atteint.' },
            { title: 'Conclure par une phrase', text: 'Répondre dans le contexte : « C’est au bout de … années que … ».' },
          ],
        },
      ],
    },
    {
      type: 'code',
      lang: 'python',
      caption: 'Combien d’années pour que 1 200 € placés à 2,5 % dépassent 1 500 € ? (réponse : 10)',
      code: `capital = 1200
n = 0
while capital <= 1500:
    capital = capital * 1.025
    n = n + 1
print(n)`,
    },
    {
      type: 'code',
      lang: 'python',
      caption: 'Calculer les 6 premiers termes d’une suite géométrique',
      code: `u = 100
for n in range(6):
    print(n, u)
    u = u * 1.1`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Au tableur',
      content: [
        {
          type: 'p',
          text: 'Colonne A : les rangs $0, 1, 2, \\dots$ ; en B2 le premier terme ; en B3 la formule `=B2*1,025` (géométrique) ou `=B2+30` (arithmétique), puis **étirer vers le bas**. Un nuage de points permet ensuite de visualiser la croissance.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Le grain de blé sur l’échiquier',
      content: [
        {
          type: 'p',
          text: r`Selon la légende, l’inventeur du jeu d’échecs demanda un grain de blé sur la première case, 2 sur la deuxième, 4 sur la troisième… en doublant à chaque case. Sur la case 64, il y aurait $2^{63}$ grains, soit environ $9{,}2\times 10^{18}$ : bien plus que ce que le royaume pouvait produire. Un exemple célèbre de croissance exponentielle.`,
        },
      ],
    },
  ],

  // =========================================================================
  exercices: [
    {
      id: 'reconnaitre',
      title: 'Reconnaître une suite arithmétique ou géométrique',
      difficulty: 1,
      duration: 10,
      tags: ['reconnaissance'],
      statement: [
        { type: 'p', text: 'Pour chacune des listes suivantes (premiers termes d’une suite), dire si la suite semble arithmétique, géométrique ou ni l’une ni l’autre. Donner la raison le cas échéant.' },
        {
          type: 'list',
          ordered: true,
          items: ['$5\\ ;\\ 8\\ ;\\ 11\\ ;\\ 14\\ ;\\ \\dots$', '$3\\ ;\\ 6\\ ;\\ 12\\ ;\\ 24\\ ;\\ \\dots$', '$100\\ ;\\ 90\\ ;\\ 81\\ ;\\ 72{,}9\\ ;\\ \\dots$', '$1\\ ;\\ 2\\ ;\\ 4\\ ;\\ 7\\ ;\\ \\dots$'],
        },
      ],
      hints: ['Calcule les différences entre termes consécutifs, puis les quotients.'],
      solution: [
        { type: 'p', text: r`**1.** Différences : $8-5 = 3$, $11-8 = 3$, $14-11 = 3$. Elles sont constantes : suite **arithmétique** de raison $r = 3$.` },
        { type: 'p', text: r`**2.** Différences : $3$, $6$, $12$ (non constantes). Quotients : $\frac{6}{3} = 2$, $\frac{12}{6} = 2$, $\frac{24}{12} = 2$. Suite **géométrique** de raison $q = 2$.` },
        { type: 'p', text: r`**3.** Quotients : $\frac{90}{100} = 0{,}9$, $\frac{81}{90} = 0{,}9$, $\frac{72{,}9}{81} = 0{,}9$. Suite **géométrique** de raison $q = 0{,}9$ (baisse de $10\,\%$ à chaque étape).` },
        { type: 'p', text: r`**4.** Différences : $1$, $2$, $3$ : pas constantes. Quotients : $2$, $2$, $\frac{7}{4} = 1{,}75$ : pas constants. La suite n’est **ni arithmétique ni géométrique**.` },
      ],
    },
    {
      id: 'terme-general',
      title: 'Calculer un terme grâce à la formule explicite',
      difficulty: 1,
      duration: 10,
      tags: ['terme général'],
      statement: [
        { type: 'list', ordered: true, items: [r`$(u_n)$ est arithmétique, $u_0 = 4$ et $r = -2{,}5$. Calculer $u_{10}$.`, r`$(v_n)$ est géométrique, $v_0 = 500$ et $q = 1{,}02$. Calculer $v_{10}$ (arrondir au centième).`, r`$(w_n)$ est arithmétique avec $w_3 = 11$ et $w_7 = 27$. Déterminer la raison et $w_0$.`] },
      ],
      hints: [r`Pour une suite arithmétique : $u_n = u_0 + nr$. Pour une géométrique : $v_n = v_0 q^n$.`, r`Pour la 3, utilise $w_7 = w_3 + 4r$.`],
      solution: [
        { type: 'p', text: r`**1.** $u_{10} = u_0 + 10 r = 4 + 10\times(-2{,}5) = 4 - 25 = -21$.` },
        { type: 'p', text: r`**2.** $v_{10} = 500 \times 1{,}02^{10}$. Or $1{,}02^{10} \approx 1{,}2190$ donc $v_{10} \approx 609{,}50$.` },
        { type: 'p', text: r`**3.** $w_7 = w_3 + (7-3)\,r$, donc $27 = 11 + 4r$, d’où $4r = 16$ et $r = 4$. Puis $w_0 = w_3 - 3r = 11 - 12 = -1$. Vérification : $w_7 = -1 + 7\times 4 = 27$.` },
      ],
    },
    {
      id: 'epargne',
      title: 'Livret d’épargne à intérêts composés',
      difficulty: 2,
      duration: 15,
      tags: ['placement', 'pourcentage'],
      statement: [
        { type: 'p', text: r`Camille place 1 200 € sur un livret rémunéré à $2{,}5\,\%$ par an, les intérêts étant ajoutés au capital chaque année. On note $C_n$ le capital après $n$ années.` },
        { type: 'list', ordered: true, items: ['Quel est le coefficient multiplicateur annuel ? Quelle est la nature de la suite $(C_n)$ ?', 'Exprimer $C_n$ en fonction de $n$ et calculer $C_5$ (arrondi au centime).', 'Si les intérêts étaient « simples » (30 € par an), quel serait le capital après 5 ans ? Comparer.', 'Au bout de combien d’années le capital dépasse-t-il 1 500 € ? (Utiliser le tableur ou une calculatrice.)'] },
      ],
      hints: [r`Augmenter de $2{,}5\,\%$, c’est multiplier par $1 + 0{,}025$.`, 'Pour la question 4, calcule $C_9$ puis $C_{10}$.'],
      solution: [
        { type: 'p', text: r`**1.** $1 + \frac{2{,}5}{100} = 1{,}025$. Le capital est multiplié par la même valeur chaque année : $(C_n)$ est **géométrique** de raison $q = 1{,}025$ et de premier terme $C_0 = 1200$.` },
        { type: 'p', text: r`**2.** $C_n = 1200\times 1{,}025^n$. Donc $C_5 = 1200 \times 1{,}025^5 \approx 1200 \times 1{,}1314 \approx 1\,357{,}69$ €.` },
        { type: 'p', text: r`**3.** À intérêts simples, le capital augmente de 30 € chaque année (suite arithmétique) : $1200 + 5\times 30 = 1\,350$ €. L’écart est de $1\,357{,}69 - 1\,350 = 7{,}69$ € en faveur des intérêts composés.` },
        { type: 'p', text: r`**4.** $C_9 = 1200\times 1{,}025^9 \approx 1\,498{,}64$ (< 1 500) et $C_{10} = 1200\times 1{,}025^{10} \approx 1\,536{,}10$ (> 1 500). Le capital dépasse 1 500 € **au bout de 10 ans**.` },
      ],
    },
    {
      id: 'population',
      title: 'Population d’une ville et d’un village',
      difficulty: 2,
      duration: 15,
      tags: ['population', 'pourcentage'],
      statement: [
        { type: 'list', ordered: true, items: [r`Une ville compte 20 000 habitants et sa population augmente de $1{,}5\,\%$ par an. On note $P_n$ le nombre d’habitants $n$ années plus tard. Donner la nature de la suite, la formule de $P_n$ et la population estimée dans 10 ans (arrondie à l’unité).`, r`Un village compte 5 000 habitants et sa population diminue de $3\,\%$ par an. On note $V_n$ sa population après $n$ années. Donner $V_n$ et dire si la suite est croissante ou décroissante.`, 'Compléter le programme Python pour trouver au bout de combien d’années le village aura perdu la moitié de sa population (moins de 2 500 habitants).'] },
        { type: 'code', lang: 'python', code: `v = 5000\nn = 0\nwhile ...:\n    v = ...\n    n = n + 1\nprint(n)` },
      ],
      hints: [r`Une baisse de $3\,\%$ correspond à $q = 1 - 0{,}03 = 0{,}97$.`, 'La condition de la boucle est « tant que la population est encore supérieure ou égale à 2 500 ».'],
      solution: [
        { type: 'p', text: r`**1.** Taux constant : suite **géométrique** de raison $1{,}015$, $P_0 = 20000$. $P_n = 20000\times 1{,}015^n$. $P_{10} = 20000\times 1{,}015^{10} \approx 20000\times 1{,}1605 \approx 23\,211$ habitants.` },
        { type: 'p', text: r`**2.** $q = 0{,}97$, donc $V_n = 5000\times 0{,}97^n$. Comme $0 < q < 1$ et $V_0 > 0$, la suite est **décroissante**.` },
        { type: 'code', lang: 'python', code: `v = 5000\nn = 0\nwhile v >= 2500:\n    v = v * 0.97\n    n = n + 1\nprint(n)` },
        { type: 'p', text: r`On obtient $n = 23$. Vérification : $5000\times 0{,}97^{22} \approx 2\,559$ (encore $\geq 2500$) et $5000\times 0{,}97^{23} \approx 2\,480$ (< 2 500). Le village passe sous les 2 500 habitants au bout de **23 ans**.` },
      ],
    },
    {
      id: 'deux-termes',
      title: 'Retrouver une suite à partir de deux termes',
      difficulty: 2,
      duration: 12,
      tags: ['terme général', 'raison'],
      statement: [
        { type: 'list', ordered: true, items: [r`$(u_n)$ est géométrique à termes positifs avec $u_2 = 18$ et $u_4 = 162$. Déterminer $q$ puis $u_0$.`, r`En déduire $u_6$.`, r`$(v_n)$ est arithmétique avec $v_5 = 3$ et $v_{12} = -18$. Déterminer $r$ et $v_0$.`] },
      ],
      hints: [r`$u_4 = u_2 \times q^2$.`, r`Pour $q$ positive, $q^2 = 9$ donne $q = 3$.`],
      solution: [
        { type: 'p', text: r`**1.** $u_4 = u_2\times q^{2}$, donc $q^2 = \frac{162}{18} = 9$. La suite étant à termes positifs, $q > 0$ donc $q = 3$. Puis $u_2 = u_0 q^2$ donne $u_0 = \frac{18}{9} = 2$.` },
        { type: 'p', text: r`**2.** $u_6 = u_4 \times q^2 = 162\times 9 = 1\,458$. (Contrôle : $2\times 3^6 = 2\times 729 = 1\,458$.)` },
        { type: 'p', text: r`**3.** $v_{12} = v_5 + 7r$, donc $-18 = 3 + 7r$, d’où $7r = -21$ et $r = -3$. Puis $v_0 = v_5 - 5r = 3 + 15 = 18$. Vérification : $v_{12} = 18 + 12\times(-3) = -18$.` },
      ],
    },
    {
      id: 'vehicule',
      title: 'Décote d’un véhicule',
      difficulty: 2,
      duration: 12,
      tags: ['décroissance', 'seuil'],
      statement: [
        { type: 'p', text: r`Un véhicule neuf coûte 18 000 € et perd $15\,\%$ de sa valeur chaque année. On note $V_n$ sa valeur après $n$ années.` },
        { type: 'list', ordered: true, items: ['Quelle est la nature de la suite $(V_n)$ ? Donner l’expression de $V_n$.', 'Calculer la valeur du véhicule après 3 ans.', 'Au bout de combien d’années sa valeur devient-elle inférieure à la moitié de sa valeur d’achat (9 000 €) ?'] },
      ],
      hints: [r`Baisse de $15\,\%$ : $q = 0{,}85$.`],
      solution: [
        { type: 'p', text: r`**1.** Baisse à taux constant : suite **géométrique** de raison $q = 1 - 0{,}15 = 0{,}85$ et $V_0 = 18000$. $V_n = 18000\times 0{,}85^n$.` },
        { type: 'p', text: r`**2.** $V_3 = 18000\times 0{,}85^3 = 18000\times 0{,}614125 = 11\,054{,}25$ €.` },
        { type: 'p', text: r`**3.** $V_4 = 18000 \times 0{,}85^4 \approx 9\,396{,}11$ € (encore supérieur à 9 000) et $V_5 \approx 7\,986{,}70$ € (inférieur). C’est donc **au bout de 5 ans** que la valeur passe sous 9 000 €. Attention : en 4 ans, la perte n’est pas $4\times 15 = 60\,\%$ mais seulement $1 - 0{,}85^4 \approx 47{,}8\,\%$.` },
      ],
    },
    {
      id: 'simple-compose',
      title: 'Type bac : intérêts simples contre intérêts composés',
      difficulty: 3,
      duration: 25,
      tags: ['type bac', 'comparaison', 'tableur', 'python'],
      statement: [
        { type: 'p', text: r`Léa et Hugo placent chacun 800 € le même jour. Léa choisit un placement à **intérêts simples** de $3\,\%$ par an (chaque année, elle reçoit $3\,\%$ du capital **initial**). Hugo choisit un placement à **intérêts composés** de $3\,\%$ par an. On note $L_n$ et $H_n$ leurs capitaux respectifs après $n$ années.` },
        {
          type: 'list',
          ordered: true,
          items: [
            'Montrer que $(L_n)$ est arithmétique et que $(H_n)$ est géométrique. Donner leurs expressions.',
            'Calculer $L_{20}$ et $H_{20}$ (arrondir au centime). Que remarque-t-on ?',
            'Comparer $L_2$ et $H_2$. Au bout de combien d’années Hugo a-t-il, pour la première fois, strictement plus que Léa ?',
            'Écrire un programme Python qui affiche le premier $n$ tel que $H_n \\geq 1\\,000$ €.',
          ],
        },
      ],
      hints: ['Chaque année Léa gagne $0{,}03\\times 800 = 24$ €.', 'Calcule $H_1$ et $L_1$ : sont-ils égaux ?'],
      solution: [
        { type: 'p', text: r`**1.** Chaque année Léa gagne $3\,\% \times 800 = 24$ € : $L_{n+1} = L_n + 24$. $(L_n)$ est arithmétique de raison $24$, $L_0 = 800$ : $L_n = 800 + 24n$. Hugo voit son capital multiplié par $1{,}03$ : $H_{n+1} = 1{,}03\,H_n$. $(H_n)$ est géométrique de raison $1{,}03$, $H_0 = 800$ : $H_n = 800\times 1{,}03^n$.` },
        { type: 'p', text: r`**2.** $L_{20} = 800 + 24\times 20 = 1\,280$ € et $H_{20} = 800\times 1{,}03^{20} \approx 1\,444{,}89$ €. Au bout de 20 ans, les intérêts composés donnent environ 165 € de plus.` },
        { type: 'p', text: r`**3.** $L_1 = 824$ et $H_1 = 800\times 1{,}03 = 824$ : égaux la première année. $L_2 = 848$ et $H_2 = 800\times 1{,}03^2 = 848{,}72$ : Hugo a plus. C’est donc **à partir de la 2e année** que Hugo a strictement plus que Léa, et l’écart ne fait que croître ensuite.` },
        { type: 'p', text: r`**4.** Programme pour atteindre 1 000 € côté Hugo :` },
        { type: 'code', lang: 'python', code: `h = 800\nn = 0\nwhile h < 1000:\n    h = h * 1.03\n    n = n + 1\nprint(n)` },
        { type: 'p', text: r`Résultat : $n = 8$ ($H_7 \approx 983{,}90$ ; $H_8 \approx 1\,013{,}42$). Hugo dépasse 1 000 € au bout de **8 ans**. Léa, elle, y parvient en $800 + 24n \geq 1000 \iff n \geq 8{,}33$, donc au bout de 9 ans.` },
      ],
    },
    {
      id: 'salaires',
      title: 'Type bac : deux propositions de salaire',
      difficulty: 3,
      duration: 25,
      tags: ['type bac', 'comparaison', 'seuil'],
      statement: [
        { type: 'p', text: r`Une entreprise propose deux contrats. **Contrat A** : salaire mensuel de départ 1 800 €, augmenté de 60 € chaque année. **Contrat B** : salaire de départ 1 700 €, augmenté de $3\,\%$ chaque année. On note $a_n$ et $b_n$ les salaires mensuels la $n$-ième année après l’embauche ($n = 0$ : année d’embauche).` },
        {
          type: 'list',
          ordered: true,
          items: [
            'Donner la nature de $(a_n)$ et de $(b_n)$ et exprimer $a_n$ et $b_n$ en fonction de $n$.',
            'Calculer $a_{10}$ et $b_{10}$ (arrondir au centime). Quel contrat est le plus avantageux au bout de 10 ans ?',
            'On souhaite connaître la première année où le contrat B dépasse le contrat A. Écrire un programme Python répondant à la question.',
            'À l’aide d’un tableur ou de la calculatrice, déterminer cette année et commenter.',
          ],
        },
      ],
      hints: [r`Pour B, $q = 1{,}03$.`, 'Dans la boucle, mets à jour A et B en même temps à chaque tour.'],
      solution: [
        { type: 'p', text: r`**1.** $(a_n)$ est **arithmétique** ($+60$ par an) : $a_n = 1800 + 60n$. $(b_n)$ est **géométrique** de raison $1{,}03$ : $b_n = 1700\times 1{,}03^n$.` },
        { type: 'p', text: r`**2.** $a_{10} = 1800 + 600 = 2\,400$ € et $b_{10} = 1700\times 1{,}03^{10} \approx 2\,284{,}66$ €. Après 10 ans, le contrat A est plus avantageux.` },
        { type: 'code', lang: 'python', code: `a = 1800\nb = 1700\nn = 0\nwhile b <= a:\n    a = a + 60\n    b = b * 1.03\n    n = n + 1\nprint(n)` },
        { type: 'p', text: r`**4.** On trouve $n = 18$. Vérification : $a_{17} = 2\,820$ et $b_{17} \approx 2\,809{,}84$ (A devant) ; $a_{18} = 2\,880$ et $b_{18} \approx 2\,894{,}14$ (B devant). **C’est la 18e année après l’embauche** que le contrat B dépasse le contrat A. Ensuite l’écart augmente de plus en plus vite : sur une carrière longue, la croissance exponentielle finit par l’emporter ; sur une courte durée, la linéaire est meilleure.` },
      ],
    },
    {
      id: 'tableur-python',
      title: 'Lire et écrire un programme Python',
      difficulty: 1,
      duration: 10,
      tags: ['python'],
      statement: [
        { type: 'code', lang: 'python', code: `u = 5\nfor n in range(4):\n    u = 2 * u + 1\nprint(u)` },
        { type: 'list', ordered: true, items: ['Quelle valeur affiche ce programme ? Détailler les étapes.', 'Écrire un programme qui calcule le terme $u_{15}$ de la suite arithmétique de premier terme $u_0 = 7$ et de raison $4$, sans utiliser la formule explicite.'] },
      ],
      hints: ['La boucle `for n in range(4)` s’exécute 4 fois.'],
      solution: [
        { type: 'p', text: r`**1.** Départ $u = 5$. Tour 1 : $2\times 5 + 1 = 11$. Tour 2 : $2\times 11 + 1 = 23$. Tour 3 : $2\times 23 + 1 = 47$. Tour 4 : $2\times 47 + 1 = 95$. Le programme affiche **95**. (Cette suite n’est ni arithmétique ni géométrique.)` },
        { type: 'code', lang: 'python', code: `u = 7\nfor n in range(15):\n    u = u + 4\nprint(u)` },
        { type: 'p', text: r`Il affiche $67$, ce que confirme la formule : $u_{15} = 7 + 15\times 4 = 67$.` },
      ],
    },
  ],

  // =========================================================================
  representations: [
    {
      type: 'widget',
      id: 'suite-explorer',
      props: { kind: 'arithmetique', u0: 2, r: 3 },
      title: 'Suite arithmétique : croissance linéaire',
      caption: 'Fais varier $u_0$ et la raison $r$ : les points restent toujours alignés.',
    },
    {
      type: 'widget',
      id: 'suite-explorer',
      props: { kind: 'geometrique', u0: 2, q: 1.5 },
      title: 'Suite géométrique : croissance exponentielle',
      caption: 'Essaie $q = 1{,}5$, puis $q = 0{,}8$, puis $q = 1$ : observe le sens de variation.',
    },
    { type: 'svg', svg: comparisonSvg(), caption: 'Linéaire contre exponentielle : la suite géométrique finit par dépasser la suite arithmétique.', maxWidth: 580 },
    {
      type: 'widget',
      id: 'function-plotter',
      props: { expressions: ['2+3x', '2*1.5^x'], xMin: 0, xMax: 10, yMin: 0, yMax: 60 },
      title: 'Les deux modèles en courbes',
      caption: 'Droite et courbe exponentielle : trouve où elles se croisent.',
    },
    {
      type: 'qcm',
      questions: [
        { question: r`La suite $u_n = 5 + 3n$ est…`, choices: ['arithmétique de raison 3', 'arithmétique de raison 5', 'géométrique de raison 3', 'ni arithmétique ni géométrique'], answer: 0, explanation: r`$u_{n+1} - u_n = 3$ : constante, donc arithmétique de raison $3$.` },
        { question: r`La suite $v_n = 4\times 2^n$ vérifie $v_3 = $`, choices: ['$32$', '$24$', '$64$', '$14$'], answer: 0, explanation: r`$v_3 = 4\times 2^3 = 4\times 8 = 32$.` },
        { question: 'Augmenter de 8 % chaque année revient à multiplier par…', choices: ['$1{,}8$', '$1{,}08$', '$0{,}92$', '$0{,}08$'], answer: 1, explanation: r`$1 + 8/100 = 1{,}08$.` },
        { question: 'Une baisse de 25 % chaque mois correspond à la raison…', choices: ['$-0{,}25$', '$0{,}25$', '$0{,}75$', '$1{,}25$'], answer: 2, explanation: r`$1 - 0{,}25 = 0{,}75$.` },
        { question: r`Les points $(n\,;\,u_n)$ d’une suite arithmétique sont…`, choices: ['alignés', 'sur une parabole', 'sur une courbe exponentielle', 'répartis au hasard'], answer: 0, explanation: r`Ils sont sur la droite $y = u_0 + r x$.` },
        { question: r`$(u_n)$ géométrique, $u_0 = 10$, $q = 0{,}5$. La suite est…`, choices: ['croissante', 'décroissante', 'constante', 'alternée'], answer: 1, explanation: r`$u_0>0$ et $0<q<1$ : décroissante.` },
        { question: 'Deux augmentations successives de 10 % équivalent à une augmentation globale de…', choices: ['20 %', '21 %', '22 %', '11 %'], answer: 1, explanation: r`$1{,}1\times 1{,}1 = 1{,}21$, soit $+21\,\%$.` },
        { question: r`Dans une suite arithmétique, $u_4 = 9$ et $u_9 = 24$. La raison est…`, choices: ['$2$', '$3$', '$5$', '$15$'], answer: 1, explanation: r`$u_9 = u_4 + 5r \Rightarrow 24 = 9 + 5r \Rightarrow r = 3$.` },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter les définitions',
      text: r`Une suite est {{arithmétique|arithmetique}} lorsqu’on {{ajoute}} toujours le même nombre appelé {{raison}}. Elle est {{géométrique|geometrique}} lorsqu’on {{multiplie}} toujours par le même nombre. Une évolution à taux constant correspond à une croissance {{exponentielle}}, tandis qu’un accroissement constant correspond à une croissance {{linéaire|lineaire}}.`,
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: r`Si $q > 1$ et $u_0 > 0$, la suite géométrique $u_n = u_0 q^n$ est croissante.`, answer: true, explanation: r`Chaque terme est plus grand que le précédent car on multiplie par un nombre supérieur à 1.` },
        { text: 'Deux hausses de 50 % successives donnent une hausse de 100 %.', answer: false, explanation: r`$1{,}5^2 = 2{,}25$ : hausse de $125\,\%$.` },
        { text: r`Une suite arithmétique de raison négative est décroissante.`, answer: true, explanation: r`On ajoute à chaque fois un nombre négatif.` },
        { text: 'Une suite géométrique de raison 1 est aussi arithmétique.', answer: true, explanation: r`Elle est constante : $u_{n+1} = u_n + 0$.` },
        { text: r`$u_{n+1}$ est toujours égal à $u_n + 1$.`, answer: false, explanation: r`$u_{n+1}$ est le terme de rang $n+1$, sans lien direct avec $u_n + 1$ en général.` },
        { text: 'Une croissance exponentielle finit toujours par dépasser une croissance linéaire.', answer: true, explanation: r`Si $q > 1$ et $u_0 > 0$, $u_0 q^n$ dépasse tout nombre fixé, donc finit par dépasser toute droite.` },
      ],
    },
    {
      type: 'matching',
      title: 'Associer situation et modèle',
      pairs: [
        { left: 'Un forfait : +20 € ajoutés chaque mois', right: 'suite arithmétique, croissance linéaire' },
        { left: 'Intérêts composés à 2 % par an', right: 'suite géométrique de raison 1,02' },
        { left: 'Une population perd 5 % par an', right: 'suite géométrique de raison 0,95' },
        { left: 'Une plante grandit de 3 cm par semaine', right: 'suite arithmétique de raison 3' },
        { left: 'Nombre de partages qui double chaque heure', right: 'suite géométrique de raison 2' },
      ],
    },
    {
      type: 'ordering',
      title: 'Méthode : déterminer un seuil avec Python',
      items: ['Définir le premier terme et un compteur n = 0', 'Écrire la boucle while avec la condition « seuil pas encore atteint »', 'Dans la boucle, calculer le terme suivant', 'Dans la boucle, augmenter le compteur n de 1', 'Afficher n après la boucle'],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Définition d’une suite arithmétique', back: r`$u_{n+1} = u_n + r$ : on ajoute toujours la même raison $r$.` },
        { front: 'Terme général d’une suite arithmétique', back: r`$u_n = u_0 + n\,r$` },
        { front: 'Définition d’une suite géométrique', back: r`$u_{n+1} = q\,u_n$ : on multiplie toujours par la même raison $q$.` },
        { front: 'Terme général d’une suite géométrique', back: r`$u_n = u_0\times q^n$` },
        { front: 'Coefficient multiplicateur d’une hausse de $t\,\%$', back: r`$1 + \frac{t}{100}$` },
        { front: 'Coefficient multiplicateur d’une baisse de $t\,\%$', back: r`$1 - \frac{t}{100}$` },
        { front: 'Croissance linéaire : quelle suite ?', back: 'Arithmétique : accroissement constant, points alignés.' },
        { front: 'Croissance exponentielle : quelle suite ?', back: r`Géométrique de raison $q>1$ : taux de variation constant.` },
        { front: 'Comment reconnaître une suite géométrique ?', back: r`Les quotients $\frac{u_{n+1}}{u_n}$ sont tous égaux.` },
        { front: 'Comment trouver un seuil ?', back: 'Boucle while en Python ou tableur : on calcule les termes jusqu’à franchir le seuil.' },
      ],
    },
    {
      type: 'widget',
      id: 'suite-explorer',
      props: { kind: 'recurrence', u0: 1, expression: '0.5*x+3' },
      title: 'Aller plus loin : une récurrence qui ne ressemble à aucune des deux',
      caption: 'Pour $u_{n+1} = 0{,}5\\,u_n + 3$ la suite n’est ni arithmétique ni géométrique : elle se stabilise.',
    },
  ],
}

export default chapter
