import type { Chapter } from '../types'

const r = String.raw

const FONT = 'font-family="Geist, sans-serif"'
const BLUE = 'hsl(217 91% 60%)'
const RED = 'hsl(0 84% 60%)'
const GREEN = 'hsl(142 71% 45%)'
const ORANGE = 'hsl(25 95% 53%)'

interface Five { min: number; q1: number; med: number; q3: number; max: number }

/** Boîtes à moustaches horizontales sur un axe [lo ; hi] */
function boxplots(rows: { label: string; d: Five; color: string }[], lo: number, hi: number, step = 2): string {
  const L = 70, W = 400, rowH = 56
  const H = rows.length * rowH + 40
  const X = (v: number) => +(L + ((v - lo) / (hi - lo)) * W).toFixed(1)
  let s = `<svg viewBox="0 0 500 ${H}" role="img" aria-label="Boîtes à moustaches">`
  for (let v = lo; v <= hi; v += step) {
    s += `<line x1="${X(v)}" y1="8" x2="${X(v)}" y2="${H - 28}" stroke="currentColor" opacity="0.1"/>`
    s += `<text x="${X(v)}" y="${H - 12}" text-anchor="middle" font-size="11" fill="currentColor" ${FONT}>${v}</text>`
  }
  s += `<line x1="${L}" y1="${H - 28}" x2="${L + W}" y2="${H - 28}" stroke="currentColor"/>`
  rows.forEach((row, i) => {
    const cy = 30 + i * rowH
    const { min, q1, med, q3, max } = row.d
    s += `<text x="${L - 8}" y="${cy + 4}" text-anchor="end" font-size="12" fill="currentColor" ${FONT}>${row.label}</text>`
    s += `<line x1="${X(min)}" y1="${cy}" x2="${X(q1)}" y2="${cy}" stroke="currentColor" stroke-width="1.5"/>`
    s += `<line x1="${X(q3)}" y1="${cy}" x2="${X(max)}" y2="${cy}" stroke="currentColor" stroke-width="1.5"/>`
    s += `<line x1="${X(min)}" y1="${cy - 8}" x2="${X(min)}" y2="${cy + 8}" stroke="currentColor" stroke-width="1.5"/>`
    s += `<line x1="${X(max)}" y1="${cy - 8}" x2="${X(max)}" y2="${cy + 8}" stroke="currentColor" stroke-width="1.5"/>`
    s += `<rect x="${X(q1)}" y="${cy - 14}" width="${+(X(q3) - X(q1)).toFixed(1)}" height="28" fill="${row.color}" fill-opacity="0.25" stroke="${row.color}" stroke-width="1.5"/>`
    s += `<line x1="${X(med)}" y1="${cy - 14}" x2="${X(med)}" y2="${cy + 14}" stroke="${row.color}" stroke-width="3"/>`
  })
  s += `</svg>`
  return s
}

/** Boîte annotée : valeurs 8 ; 10 ; 12 ; 15 ; 18 */
function annotatedBox(): string {
  const lo = 6, hi = 20, L = 40, W = 420
  const X = (v: number) => +(L + ((v - lo) / (hi - lo)) * W).toFixed(1)
  let s = `<svg viewBox="0 0 500 170" role="img" aria-label="Boîte à moustaches annotée">`
  for (let v = lo; v <= hi; v += 2) {
    s += `<line x1="${X(v)}" y1="30" x2="${X(v)}" y2="115" stroke="currentColor" opacity="0.1"/>`
    s += `<text x="${X(v)}" y="132" text-anchor="middle" font-size="11" fill="currentColor" ${FONT}>${v}</text>`
  }
  s += `<line x1="${L}" y1="115" x2="${L + W}" y2="115" stroke="currentColor"/>`
  const cy = 72
  s += `<line x1="${X(8)}" y1="${cy}" x2="${X(10)}" y2="${cy}" stroke="currentColor" stroke-width="1.5"/>`
  s += `<line x1="${X(15)}" y1="${cy}" x2="${X(18)}" y2="${cy}" stroke="currentColor" stroke-width="1.5"/>`
  s += `<line x1="${X(8)}" y1="${cy - 10}" x2="${X(8)}" y2="${cy + 10}" stroke="currentColor" stroke-width="1.5"/>`
  s += `<line x1="${X(18)}" y1="${cy - 10}" x2="${X(18)}" y2="${cy + 10}" stroke="currentColor" stroke-width="1.5"/>`
  s += `<rect x="${X(10)}" y="${cy - 20}" width="${+(X(15) - X(10)).toFixed(1)}" height="40" fill="${BLUE}" fill-opacity="0.25" stroke="${BLUE}" stroke-width="1.5"/>`
  s += `<line x1="${X(12)}" y1="${cy - 20}" x2="${X(12)}" y2="${cy + 20}" stroke="${RED}" stroke-width="3"/>`
  const lab: [number, string][] = [[8, 'min = 8'], [10, 'Q1 = 10'], [12, 'médiane = 12'], [15, 'Q3 = 15'], [18, 'max = 18']]
  lab.forEach(([v, t], i) => {
    const y = i % 2 === 0 ? 24 : 44
    s += `<text x="${X(v)}" y="${y}" text-anchor="middle" font-size="12" fill="currentColor" ${FONT}>${t}</text>`
  })
  s += `<line x1="${X(10)}" y1="150" x2="${X(15)}" y2="150" stroke="${GREEN}"/>`
  s += `<line x1="${X(10)}" y1="145" x2="${X(10)}" y2="155" stroke="${GREEN}"/>`
  s += `<line x1="${X(15)}" y1="145" x2="${X(15)}" y2="155" stroke="${GREEN}"/>`
  s += `<text x="${(X(10) + X(15)) / 2}" y="166" text-anchor="middle" font-size="12" fill="${GREEN}" ${FONT}>écart interquartile = 5</text>`
  s += `</svg>`
  return s
}

/** Diagramme de répartition pour le tableau croisé (barres 100 %) */
function stackedBars(): string {
  const rows = [
    { l: 'Filles (120)', a: 70, },
    { l: 'Garçons (100)', a: 55 },
    { l: 'Ensemble (220)', a: (139 / 220) * 100 },
  ]
  const L = 110, W = 340
  let s = `<svg viewBox="0 0 500 190" role="img" aria-label="Répartition demi-pensionnaires et externes">`
  rows.forEach((row, i) => {
    const y = 20 + i * 48
    const w1 = (row.a / 100) * W
    s += `<text x="${L - 8}" y="${y + 20}" text-anchor="end" font-size="12" fill="currentColor" ${FONT}>${row.l}</text>`
    s += `<rect x="${L}" y="${y}" width="${w1.toFixed(1)}" height="28" fill="${BLUE}" fill-opacity="0.45" stroke="${BLUE}"/>`
    s += `<rect x="${L + w1}" y="${y}" width="${(W - w1).toFixed(1)}" height="28" fill="${ORANGE}" fill-opacity="0.45" stroke="${ORANGE}"/>`
    s += `<text x="${L + w1 / 2}" y="${y + 19}" text-anchor="middle" font-size="12" fill="currentColor" ${FONT}>${row.a.toFixed(1).replace('.', ',')} %</text>`
    s += `<text x="${L + w1 + (W - w1) / 2}" y="${y + 19}" text-anchor="middle" font-size="12" fill="currentColor" ${FONT}>${(100 - row.a).toFixed(1).replace('.', ',')} %</text>`
  })
  s += `<rect x="${L}" y="166" width="12" height="12" fill="${BLUE}" fill-opacity="0.45" stroke="${BLUE}"/><text x="${L + 18}" y="177" font-size="12" fill="currentColor" ${FONT}>demi-pensionnaires</text>`
  s += `<rect x="${L + 160}" y="166" width="12" height="12" fill="${ORANGE}" fill-opacity="0.45" stroke="${ORANGE}"/><text x="${L + 178}" y="177" font-size="12" fill="currentColor" ${FONT}>externes</text>`
  s += `</svg>`
  return s
}

/** Graphique tronqué : 102 vs 105 avec axe à partir de 100, et même graphique honnête */
function misleading(): string {
  const bar = (x: number, v: number, base: number, top: number, c: string, lab: string) => {
    const h = ((v - base) / (top - base)) * 110
    return `<rect x="${x}" y="${140 - h}" width="50" height="${h}" fill="${c}" fill-opacity="0.5" stroke="${c}"/><text x="${x + 25}" y="${134 - h}" text-anchor="middle" font-size="11" fill="currentColor" ${FONT}>${v}</text><text x="${x + 25}" y="156" text-anchor="middle" font-size="11" fill="currentColor" ${FONT}>${lab}</text>`
  }
  let s = `<svg viewBox="0 0 500 190" role="img" aria-label="Graphique tronqué et graphique honnête">`
  s += `<text x="120" y="14" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor" ${FONT}>Axe tronqué (départ à 100)</text>`
  s += `<line x1="40" y1="140" x2="200" y2="140" stroke="currentColor"/><line x1="40" y1="25" x2="40" y2="140" stroke="currentColor"/>`
  s += `<text x="34" y="144" text-anchor="end" font-size="10" fill="currentColor" ${FONT}>100</text><text x="34" y="35" text-anchor="end" font-size="10" fill="currentColor" ${FONT}>106</text>`
  s += bar(65, 102, 100, 106, RED, '2022') + bar(135, 105, 100, 106, RED, '2023')
  s += `<text x="380" y="14" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor" ${FONT}>Axe complet (départ à 0)</text>`
  s += `<line x1="300" y1="140" x2="460" y2="140" stroke="currentColor"/><line x1="300" y1="25" x2="300" y2="140" stroke="currentColor"/>`
  s += `<text x="294" y="144" text-anchor="end" font-size="10" fill="currentColor" ${FONT}>0</text><text x="294" y="35" text-anchor="end" font-size="10" fill="currentColor" ${FONT}>110</text>`
  s += bar(325, 102, 0, 110, GREEN, '2022') + bar(395, 105, 0, 110, GREEN, '2023')
  s += `</svg>`
  return s
}

const chapter: Chapter = {
  id: 'statistiques',
  subject: 'maths-tc',
  order: 5,
  title: 'Statistiques',
  theme: 'Statistiques',
  summary:
    'Tableaux croisés d’effectifs, fréquences marginales et conditionnelles, indicateurs de position et de dispersion (moyenne, médiane, quartiles, écart type), boîtes à moustaches et esprit critique devant les données.',
  duration: '3 semaines',
  objectives: [
    'Lire et compléter un tableau croisé d’effectifs.',
    'Calculer des fréquences marginales et des fréquences conditionnelles.',
    'Calculer et interpréter la moyenne, la médiane, les quartiles, l’écart interquartile et l’écart type d’une série.',
    'Construire et lire une boîte à moustaches ; comparer deux séries.',
    'Mesurer l’effet d’un changement de variable affine sur la moyenne et l’écart type.',
    'Exercer son esprit critique : échantillon, corrélation et causalité, représentation trompeuse.',
  ],
  keywords: ['tableau croisé', 'fréquence marginale', 'fréquence conditionnelle', 'moyenne', 'médiane', 'quartiles', 'écart type', 'boîte à moustaches', 'esprit critique'],

  // =========================================================================
  fiche: [
    { type: 'h2', text: 'L’essentiel en statistiques' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Tableau croisé d’effectifs',
      content: [
        { type: 'p', text: 'Il croise **deux caractères** observés sur la même population. Les totaux en marge donnent les **effectifs marginaux**.' },
        { type: 'p', text: r`**Fréquence marginale** : part d’une modalité dans la population totale. **Fréquence conditionnelle** : part d’une modalité **à l’intérieur d’un sous-groupe**. Par exemple « parmi les filles, la proportion de demi-pensionnaires » $= \dfrac{\text{filles demi-pensionnaires}}{\text{filles}}$.` },
      ],
    },
    {
      type: 'table',
      headers: ['Indicateur', 'Définition', 'Rôle'],
      rows: [
        ['Moyenne $\\bar{x}$', 'somme des valeurs divisée par l’effectif', 'position (sensible aux valeurs extrêmes)'],
        ['Médiane $Me$', 'partage la série en deux moitiés de même effectif', 'position (**robuste**)'],
        ['Quartiles $Q_1$, $Q_3$', 'au moins 25 % des valeurs sont $\\leq Q_1$ ; au moins 75 % sont $\\leq Q_3$', 'position et dispersion'],
        ['Écart interquartile', '$Q_3 - Q_1$', 'dispersion (50 % centraux)'],
        ['Étendue', 'max $-$ min', 'dispersion (sensible aux extrêmes)'],
        ['Écart type $\\sigma$', r`$\sigma = \sqrt{\dfrac{\sum n_i (x_i - \bar{x})^2}{N}}$`, 'dispersion autour de la moyenne'],
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Comment trouver la médiane et les quartiles (série de $N$ valeurs rangées)',
      content: [
        {
          type: 'list',
          items: [
            r`**Médiane** : si $N$ est impair, c’est la valeur centrale ; si $N$ est pair, c’est la moyenne des deux valeurs centrales.`,
            r`**$Q_1$** : la valeur de rang $\lceil N/4 \rceil$ (on arrondit $N/4$ à l’entier supérieur).`,
            r`**$Q_3$** : la valeur de rang $\lceil 3N/4 \rceil$.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Effet d’un changement affine $y = a x + b$',
      content: [
        { type: 'p', text: r`$\bar{y} = a\,\bar{x} + b$ et $\sigma_y = |a|\,\sigma_x$. Ajouter une constante **décale** les valeurs mais ne change pas la dispersion.` },
      ],
    },
    { type: 'svg', svg: annotatedBox(), caption: 'Boîte à moustaches de la série 8 ; 10 ; 10 ; 12 ; 12 ; 12 ; 14 ; 15 ; 16 ; 18.', maxWidth: 560 },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Esprit critique',
      content: [
        {
          type: 'list',
          items: [
            '**Corrélation ≠ causalité** : deux grandeurs qui évoluent ensemble n’ont pas forcément de lien de cause à effet.',
            'Vérifier **qui** a été interrogé (échantillon représentatif ?) et **combien** de personnes.',
            'Regarder l’**échelle** des axes : un axe tronqué amplifie les écarts.',
            'Une moyenne seule cache la dispersion et les valeurs extrêmes.',
          ],
        },
      ],
    },
  ],

  // =========================================================================
  cours: [
    { type: 'h2', text: '1. Tableaux croisés d’effectifs' },
    {
      type: 'p',
      text: 'Lorsqu’on étudie **deux caractères** sur la même population (par exemple le sexe et le régime de cantine pour des élèves d’un lycée), on regroupe les effectifs dans un **tableau croisé** (ou tableau à double entrée).',
    },
    {
      type: 'table',
      caption: 'Effectifs d’un lycée de 220 élèves (exemple utilisé dans tout le chapitre)',
      headers: ['', 'Demi-pensionnaires', 'Externes', 'Total'],
      rows: [
        ['Filles', '84', '36', '120'],
        ['Garçons', '55', '45', '100'],
        ['Total', '139', '81', '220'],
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Effectifs marginaux et effectif total',
      content: [
        {
          type: 'p',
          text: 'Les **effectifs marginaux** sont les totaux de chaque ligne et de chaque colonne (dans les marges du tableau). Ici : 120 filles, 100 garçons, 139 demi-pensionnaires, 81 externes. Le coin en bas à droite est l’**effectif total** : 220.',
        },
        { type: 'p', text: 'Contrôle : somme des totaux de lignes = somme des totaux de colonnes = effectif total ($120+100 = 139+81 = 220$).' },
      ],
    },

    { type: 'h2', text: '2. Fréquences marginales et conditionnelles' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Fréquence marginale',
      content: [
        { type: 'p', text: r`C’est la fréquence d’une modalité dans **toute la population** : $\dfrac{\text{effectif marginal}}{\text{effectif total}}$.` },
        { type: 'p', text: r`Exemples : part de filles $= \dfrac{120}{220} \approx 54{,}5\,\%$ ; part de demi-pensionnaires $= \dfrac{139}{220} \approx 63{,}2\,\%$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Fréquence conditionnelle',
      content: [
        { type: 'p', text: r`C’est la fréquence d’une modalité **à l’intérieur d’un sous-groupe** : l’effectif du sous-groupe devient le nouveau « total ».` },
        { type: 'p', text: r`Parmi les filles, la part de demi-pensionnaires est $\dfrac{84}{120} = 70\,\%$. Parmi les garçons : $\dfrac{55}{100} = 55\,\%$. Parmi les demi-pensionnaires, la part de filles est $\dfrac{84}{139} \approx 60{,}4\,\%$.` },
      ],
    },
    { type: 'svg', svg: stackedBars(), caption: 'Les fréquences conditionnelles de la demi-pension chez les filles et chez les garçons : 70 % contre 55 %.', maxWidth: 560 },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ne pas confondre les deux sens !',
      content: [
        { type: 'p', text: r`« Parmi les filles, 70 % sont demi-pensionnaires » n’a **rien à voir** avec « parmi les demi-pensionnaires, 60,4 % sont des filles ». Le sous-groupe de référence (le dénominateur) change tout. Commence toujours par repérer la phrase « parmi… ».` },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Méthode',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Repérer la population de référence', text: 'Dans la question, « parmi les… » ou « chez les… » désigne le sous-groupe : son effectif est le dénominateur.' },
            { title: 'Lire le numérateur', text: 'C’est l’effectif de la case qui croise le sous-groupe et la modalité demandée.' },
            { title: 'Calculer et interpréter', text: 'Diviser, convertir en pourcentage, et rédiger une phrase de conclusion.' },
          ],
        },
      ],
    },

    { type: 'h2', text: '3. Indicateurs de position' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Moyenne',
      content: [
        { type: 'p', text: r`Pour une série de $N$ valeurs $x_1, \dots, x_N$ : $\bar{x} = \dfrac{x_1 + x_2 + \dots + x_N}{N}$. Pour une série regroupée (valeur $x_i$ d’effectif $n_i$) : $\bar{x} = \dfrac{\sum n_i x_i}{N}$ (**moyenne pondérée**).` },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Médiane et quartiles',
      content: [
        { type: 'p', text: r`Série rangée par ordre croissant. La **médiane** $Me$ partage la série en deux groupes de même effectif : au moins 50 % des valeurs sont $\leq Me$ et au moins 50 % sont $\geq Me$.` },
        { type: 'p', text: r`Le **premier quartile** $Q_1$ est la plus petite valeur de la série telle qu’**au moins 25 %** des valeurs lui soient inférieures ou égales. Le **troisième quartile** $Q_3$ est la plus petite valeur telle qu’**au moins 75 %** des valeurs lui soient inférieures ou égales.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : dix notes',
      content: [
        { type: 'p', text: r`Série rangée ($N=10$) : $8\ ;\ 10\ ;\ 10\ ;\ 12\ ;\ 12\ ;\ 12\ ;\ 14\ ;\ 15\ ;\ 16\ ;\ 18$.` },
        {
          type: 'list',
          items: [
            r`Moyenne : $\dfrac{8+10+10+12+12+12+14+15+16+18}{10} = \dfrac{127}{10} = 12{,}7$.`,
            r`Médiane : $N$ pair, on prend la moyenne des 5e et 6e valeurs : $\dfrac{12+12}{2} = 12$.`,
            r`$Q_1$ : $\frac{N}{4} = 2{,}5$, on arrondit à 3, donc $Q_1$ est la 3e valeur : $Q_1 = 10$.`,
            r`$Q_3$ : $\frac{3N}{4} = 7{,}5$, on arrondit à 8, donc $Q_3$ est la 8e valeur : $Q_3 = 15$.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Moyenne ou médiane ?',
      content: [
        { type: 'p', text: 'La moyenne tient compte de **toutes** les valeurs, y compris les valeurs extrêmes : un seul très gros salaire tire la moyenne vers le haut. La médiane est **robuste** : elle ne change presque pas si une valeur extrême évolue. Pour des salaires ou des prix de l’immobilier, la médiane est souvent plus parlante.' },
      ],
    },

    { type: 'h2', text: '4. Indicateurs de dispersion' },
    {
      type: 'p',
      text: 'Deux séries peuvent avoir la même moyenne et pourtant être très différentes : l’une très groupée autour de la moyenne, l’autre très étalée. Les indicateurs de dispersion mesurent cet étalement.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Étendue et écart interquartile',
      content: [
        { type: 'p', text: r`**Étendue** $= x_{\max} - x_{\min}$ (ici $18 - 8 = 10$). **Écart interquartile** $= Q_3 - Q_1$ (ici $15 - 10 = 5$) : il mesure la dispersion des 50 % de valeurs centrales et ignore les valeurs extrêmes.` },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Variance et écart type',
      content: [
        { type: 'p', text: r`La **variance** est la moyenne des carrés des écarts à la moyenne : $$V = \frac{(x_1 - \bar{x})^2 + \dots + (x_N - \bar{x})^2}{N}.$$` },
        { type: 'p', text: r`L’**écart type** est $\sigma = \sqrt{V}$ ; il s’exprime dans la même unité que les valeurs.` },
        { type: 'p', text: r`Forme pratique : $V = \dfrac{\sum x_i^2}{N} - \bar{x}^2$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Écart type des dix notes',
      content: [
        { type: 'p', text: r`$\sum x_i^2 = 64 + 100 + 100 + 144 + 144 + 144 + 196 + 225 + 256 + 324 = 1\,697$. Donc $V = \dfrac{1697}{10} - 12{,}7^2 = 169{,}7 - 161{,}29 = 8{,}41$ et $\sigma = \sqrt{8{,}41} = 2{,}9$.` },
        { type: 'p', text: r`Interprétation : les notes s’écartent typiquement d’environ 2,9 points de la moyenne 12,7. En pratique, on utilise la calculatrice ou Python.` },
      ],
    },
    {
      type: 'code',
      lang: 'python',
      caption: 'Calculer moyenne et écart type en Python',
      code: `from math import sqrt

notes = [8, 10, 10, 12, 12, 12, 14, 15, 16, 18]
N = len(notes)
moyenne = sum(notes) / N
variance = sum((x - moyenne) ** 2 for x in notes) / N
print(moyenne)       # 12.7
print(sqrt(variance))  # environ 2.9`,
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Changement affine',
      content: [
        { type: 'p', text: r`Si l’on remplace chaque valeur $x$ par $y = a x + b$ : $\bar{y} = a\bar{x} + b$ et $\sigma_y = |a|\,\sigma_x$.` },
        { type: 'p', text: r`Exemple : si chaque note de la série précédente est augmentée de 1 point, la moyenne devient $13{,}7$ mais l’écart type reste $2{,}9$. Si toutes les notes sont multipliées par $1{,}1$, la moyenne devient $13{,}97$ et l’écart type $3{,}19$.` },
      ],
    },

    { type: 'h2', text: '5. Boîtes à moustaches' },
    {
      type: 'p',
      text: 'La **boîte à moustaches** résume une série par cinq valeurs : le minimum, $Q_1$, la médiane, $Q_3$ et le maximum. La « boîte » va de $Q_1$ à $Q_3$ et contient 50 % des données environ ; le trait central est la médiane ; les « moustaches » vont jusqu’au minimum et au maximum.',
    },
    { type: 'svg', svg: annotatedBox(), caption: 'Lecture d’une boîte à moustaches.', maxWidth: 560 },
    {
      type: 'svg',
      svg: boxplots(
        [
          { label: 'Classe A', d: { min: 4, q1: 9, med: 12, q3: 14, max: 18 }, color: BLUE },
          { label: 'Classe B', d: { min: 7, q1: 10, med: 11, q3: 12, max: 15 }, color: ORANGE },
        ],
        2,
        20,
      ),
      caption: 'Comparer deux classes : la classe A est plus dispersée ; la classe B est plus homogène.',
      maxWidth: 560,
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Comparer deux séries',
      content: [
        {
          type: 'list',
          items: [
            'Comparer les **positions** : médianes (ou moyennes).',
            'Comparer les **dispersions** : écarts interquartiles, étendues, écarts types.',
            'Conclure **dans le contexte** : « les résultats de la classe B sont plus réguliers, ceux de la classe A sont plus contrastés ».',
          ],
        },
      ],
    },

    { type: 'h2', text: '6. Esprit critique devant les données' },
    {
      type: 'grid',
      columns: 2,
      items: [
        { icon: 'Users', title: 'L’échantillon', text: 'Un sondage mené uniquement auprès des visiteurs d’une salle de sport ne dit rien sur la population française. Un échantillon doit être **représentatif** et suffisamment grand.' },
        { icon: 'Link2', title: 'Corrélation et causalité', text: 'Les ventes de glaces et le nombre de noyades augmentent ensemble en été : l’une ne cause pas l’autre, c’est la **chaleur** qui explique les deux.' },
        { icon: 'BarChart3', title: 'Représentations trompeuses', text: 'Un axe qui ne démarre pas à zéro, des échelles différentes ou une surface proportionnelle à un rayon peuvent exagérer les écarts.' },
        { icon: 'Scale', title: 'Moyenne et dispersion', text: 'Une moyenne de 2 950 € peut cacher que 9 salariés sur 10 gagnent moins de 2 200 €. Il faut regarder la médiane et la dispersion.' },
      ],
    },
    { type: 'svg', svg: misleading(), caption: 'Mêmes données (102 puis 105) : l’axe tronqué donne l’impression que la valeur a été multipliée par 2,5 alors qu’elle n’augmente que de 2,9 %.', maxWidth: 580 },
    {
      type: 'callout',
      variant: 'example',
      title: 'Quand les pourcentages se contredisent (paradoxe de Simpson)',
      content: [
        { type: 'p', text: 'Il peut arriver qu’un traitement A soit meilleur que B dans chaque catégorie de patients, mais que B semble meilleur sur l’ensemble ! Cela vient d’une répartition très différente des catégories dans les deux groupes. Moralité : **toujours regarder les effectifs et les fréquences conditionnelles**, pas seulement le pourcentage global.' },
        { type: 'p', text: 'Cet effet est étudié dans l’exercice « Deux traitements » de ce chapitre.' },
      ],
    },
  ],

  // =========================================================================
  exercices: [
    {
      id: 'tableau-croise-complet',
      title: 'Compléter un tableau croisé',
      difficulty: 1,
      duration: 12,
      tags: ['tableau croisé', 'fréquences'],
      statement: [
        { type: 'p', text: 'Un club de sport compte 400 adhérents. Parmi eux, 240 sont mineurs et 180 pratiquent un sport individuel. On sait que 90 mineurs pratiquent un sport individuel.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Compléter le tableau croisé ci-dessous.',
            'Calculer la fréquence marginale des adhérents qui pratiquent un sport collectif.',
            'Calculer la fréquence conditionnelle de la pratique d’un sport collectif parmi les mineurs, puis parmi les adultes. Commenter.',
          ],
        },
        {
          type: 'table',
          headers: ['', 'Sport collectif', 'Sport individuel', 'Total'],
          rows: [['Mineurs', '', '90', '240'], ['Adultes', '', '', ''], ['Total', '', '180', '400']],
        },
      ],
      hints: ['Commence par les totaux : adultes = 400 − 240.', 'Complète ligne par ligne en utilisant les totaux.'],
      solution: [
        { type: 'p', text: r`**1.** Adultes : $400 - 240 = 160$. Mineurs en sport collectif : $240 - 90 = 150$. Adultes en sport individuel : $180 - 90 = 90$. Adultes en sport collectif : $160 - 90 = 70$. Total sport collectif : $400 - 180 = 220$ (contrôle : $150 + 70 = 220$).` },
        {
          type: 'table',
          headers: ['', 'Sport collectif', 'Sport individuel', 'Total'],
          rows: [['Mineurs', '150', '90', '240'], ['Adultes', '70', '90', '160'], ['Total', '220', '180', '400']],
        },
        { type: 'p', text: r`**2.** $\dfrac{220}{400} = 0{,}55$ : **55 %** des adhérents pratiquent un sport collectif.` },
        { type: 'p', text: r`**3.** Parmi les mineurs : $\dfrac{150}{240} = 0{,}625$, soit **62,5 %**. Parmi les adultes : $\dfrac{70}{160} = 0{,}4375$, soit **43,75 %**. Les mineurs pratiquent proportionnellement davantage un sport collectif que les adultes.` },
      ],
    },
    {
      id: 'indicateurs-effectifs',
      title: 'Indicateurs d’une série regroupée',
      difficulty: 1,
      duration: 15,
      tags: ['moyenne', 'médiane', 'quartiles', 'écart type'],
      statement: [
        { type: 'p', text: 'Les notes d’un contrôle dans une classe de 20 élèves sont données dans le tableau.' },
        {
          type: 'table',
          headers: ['Note', '6', '8', '10', '12', '14', '16'],
          rows: [['Effectif', '2', '3', '5', '6', '3', '1']],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la moyenne.',
            'Déterminer la médiane, $Q_1$ et $Q_3$.',
            r`Calculer l’écart type (arrondi au centième) et interpréter.`,
            'Quel pourcentage d’élèves a obtenu au moins 12 ?',
          ],
        },
      ],
      hints: ['Effectifs cumulés : 2 ; 5 ; 10 ; 16 ; 19 ; 20.', 'Variance = moyenne des carrés − carré de la moyenne.'],
      solution: [
        { type: 'p', text: r`**1.** $\bar{x} = \dfrac{6\times 2 + 8\times 3 + 10\times 5 + 12\times 6 + 14\times 3 + 16\times 1}{20} = \dfrac{12 + 24 + 50 + 72 + 42 + 16}{20} = \dfrac{216}{20} = 10{,}8$.` },
        { type: 'p', text: r`**2.** Effectifs cumulés croissants : 2 ; 5 ; 10 ; 16 ; 19 ; 20. $N = 20$ est pair : la médiane est la moyenne des 10e et 11e valeurs. La 10e vaut 10 (cumul 10) et la 11e vaut 12, donc $Me = \dfrac{10+12}{2} = 11$. Pour $Q_1$ : $\frac{20}{4} = 5$, c’est la 5e valeur : $Q_1 = 8$. Pour $Q_3$ : $\frac{3\times 20}{4} = 15$, c’est la 15e valeur : $Q_3 = 12$.` },
        { type: 'p', text: r`**3.** $\sum n_i x_i^2 = 2\times 36 + 3\times 64 + 5\times 100 + 6\times 144 + 3\times 196 + 256 = 72 + 192 + 500 + 864 + 588 + 256 = 2\,472$. $V = \dfrac{2472}{20} - 10{,}8^2 = 123{,}6 - 116{,}64 = 6{,}96$, donc $\sigma = \sqrt{6{,}96} \approx 2{,}64$. Les notes s’écartent en moyenne d’environ 2,6 points de la moyenne 10,8.` },
        { type: 'p', text: r`**4.** Élèves ayant au moins 12 : $6 + 3 + 1 = 10$ sur 20, soit **50 %** (cohérent avec la médiane comprise entre 10 et 12).` },
      ],
    },
    {
      id: 'inscriptions-reseaux',
      title: 'Utilisation des réseaux sociaux',
      difficulty: 2,
      duration: 15,
      tags: ['tableau croisé', 'fréquences conditionnelles'],
      statement: [
        { type: 'p', text: 'Dans un lycée de 600 élèves, on interroge tous les élèves pour savoir s’ils utilisent les réseaux sociaux plus de 2 heures par jour.' },
        {
          type: 'table',
          headers: ['', 'Plus de 2 h par jour', 'Moins de 2 h par jour', 'Total'],
          rows: [['Seconde', '132', '88', '220'], ['Première', '110', '90', '200'], ['Terminale', '90', '90', '180'], ['Total', '332', '268', '600']],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quelle est la fréquence marginale des élèves utilisant les réseaux plus de 2 h par jour ?',
            'Calculer, pour chaque niveau, la fréquence conditionnelle de l’usage de plus de 2 h par jour. Que constate-t-on ?',
            'Parmi les élèves qui utilisent les réseaux plus de 2 h par jour, quelle est la part d’élèves de Terminale ? Pourquoi ce résultat n’est-il pas contradictoire avec la question 2 ?',
          ],
        },
      ],
      hints: ['Dénominateur : l’effectif du sous-groupe cité après « parmi ».'],
      solution: [
        { type: 'p', text: r`**1.** $\dfrac{332}{600} \approx 0{,}553$ : environ **55,3 %**.` },
        { type: 'p', text: r`**2.** Seconde : $\dfrac{132}{220} = 0{,}60$ soit 60 %. Première : $\dfrac{110}{200} = 0{,}55$ soit 55 %. Terminale : $\dfrac{90}{180} = 0{,}50$ soit 50 %. La proportion d’utilisateurs intensifs **diminue** avec le niveau : 60 %, 55 %, 50 %.` },
        { type: 'p', text: r`**3.** $\dfrac{90}{332} \approx 0{,}271$ soit environ **27,1 %**. Il s’agit d’un autre sous-groupe (celui des utilisateurs intensifs, effectif 332) : la Terminale est le plus petit niveau en effectif (180 élèves) et utilise moins les réseaux, elle pèse donc moins dans ce groupe. Les deux phrases répondent à deux questions différentes.` },
      ],
    },
    {
      id: 'boites-comparaison',
      title: 'Comparer deux classes avec des boîtes à moustaches',
      difficulty: 2,
      duration: 15,
      tags: ['boîte à moustaches', 'comparaison'],
      statement: [
        { type: 'p', text: 'On donne les boîtes à moustaches des notes (sur 20) de deux classes de Première à un même devoir.' },
        {
          type: 'svg',
          svg: boxplots(
            [
              { label: 'Classe A', d: { min: 4, q1: 9, med: 12, q3: 14, max: 18 }, color: BLUE },
              { label: 'Classe B', d: { min: 7, q1: 10, med: 11, q3: 12, max: 15 }, color: ORANGE },
            ],
            2,
            20,
          ),
          maxWidth: 560,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Lire la médiane, les quartiles et l’étendue de chaque classe.',
            'Calculer l’écart interquartile de chaque classe.',
            'Comparer les deux classes en une phrase pour la position et une phrase pour la dispersion.',
            'Peut-on affirmer que « au moins la moitié des élèves de la classe A ont eu plus de 12 » ? Et « un quart de la classe B a eu moins de 10 » ?',
          ],
        },
      ],
      hints: ['La médiane est le trait épais dans la boîte.'],
      solution: [
        { type: 'p', text: r`**1.** Classe A : $\min = 4$, $Q_1 = 9$, $Me = 12$, $Q_3 = 14$, $\max = 18$, étendue $= 18 - 4 = 14$. Classe B : $\min = 7$, $Q_1 = 10$, $Me = 11$, $Q_3 = 12$, $\max = 15$, étendue $= 15 - 7 = 8$.` },
        { type: 'p', text: r`**2.** Écart interquartile : A : $14 - 9 = 5$ ; B : $12 - 10 = 2$.` },
        { type: 'p', text: r`**3.** Position : la médiane de A (12) est légèrement supérieure à celle de B (11), les deux classes ont des niveaux comparables. Dispersion : la classe A est beaucoup plus dispersée (EI de 5 contre 2) : B est homogène, A est contrastée.` },
        { type: 'p', text: r`**4.** Pour A, la médiane vaut 12 donc au moins la moitié des élèves ont **au plus** 12 et au moins la moitié ont **au moins** 12. L’affirmation « plus de 12 » (strictement) n’est donc pas garantie ; en revanche « au moins 12 » l’est. Pour B, $Q_1 = 10$ signifie qu’au moins 25 % des notes sont $\leq 10$ : « un quart environ a eu 10 ou moins » est correct, mais « strictement moins de 10 » ne peut pas se lire sur le graphique.` },
      ],
    },
    {
      id: 'changement-affine',
      title: 'Effet d’un changement de barème',
      difficulty: 2,
      duration: 12,
      tags: ['moyenne', 'écart type', 'changement affine'],
      statement: [
        { type: 'p', text: r`Les notes d’un devoir ont pour moyenne $12{,}7$ et pour écart type $2{,}9$. Le professeur décide de modifier les notes.` },
        {
          type: 'list',
          ordered: true,
          items: [
            'Il ajoute 1 point bonus à chaque note. Quelles sont la nouvelle moyenne et le nouvel écart type ?',
            'Il multiplie finalement chaque note initiale par $1{,}1$ (sans le point bonus). Mêmes questions.',
            'Il applique $y = 1{,}1x + 1$ à chaque note. Mêmes questions.',
          ],
        },
      ],
      hints: [r`Pour $y = ax + b$ : $\bar{y} = a\bar{x} + b$ et $\sigma_y = |a|\,\sigma_x$.`],
      solution: [
        { type: 'p', text: r`**1.** $a = 1$, $b = 1$ : moyenne $12{,}7 + 1 = 13{,}7$ ; écart type inchangé : $2{,}9$ (on décale toutes les notes sans modifier leur écart).` },
        { type: 'p', text: r`**2.** $a = 1{,}1$, $b = 0$ : moyenne $12{,}7\times 1{,}1 = 13{,}97$ ; écart type $2{,}9\times 1{,}1 = 3{,}19$ (les notes sont plus étalées).` },
        { type: 'p', text: r`**3.** Moyenne : $1{,}1\times 12{,}7 + 1 = 14{,}97$ ; écart type : $1{,}1\times 2{,}9 = 3{,}19$ (le « $+1$ » ne change pas l’écart type).` },
      ],
    },
    {
      id: 'salaires-aberrants',
      title: 'Moyenne, médiane et valeur extrême',
      difficulty: 2,
      duration: 15,
      tags: ['robustesse', 'esprit critique'],
      statement: [
        { type: 'p', text: r`Une petite entreprise compte 10 salariés. Leurs salaires mensuels nets (en €) sont : $1\,400$ ; $1\,500$ ; $1\,500$ ; $1\,600$ ; $1\,700$ ; $1\,800$ ; $1\,900$ ; $2\,000$ ; $2\,100$ ; $14\,000$.` },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer la moyenne et la médiane.',
            'Déterminer $Q_1$ et $Q_3$.',
            'Quel est l’indicateur le plus représentatif du salaire « typique » ? Justifier.',
            'La direction affirme : « le salaire moyen est de 2 950 €, c’est un bon salaire ». Que répondre ?',
          ],
        },
      ],
      hints: ['Série déjà rangée, N = 10.'],
      solution: [
        { type: 'p', text: r`**1.** Somme : $1400+1500+1500+1600+1700+1800+1900+2000+2100+14000 = 29\,500$, donc moyenne $= 2\,950$ €. $N = 10$ : médiane = moyenne des 5e et 6e valeurs $= \dfrac{1700+1800}{2} = 1\,750$ €.` },
        { type: 'p', text: r`**2.** $\frac{N}{4} = 2{,}5 \to 3$e valeur : $Q_1 = 1\,500$ €. $\frac{3N}{4} = 7{,}5 \to 8$e valeur : $Q_3 = 2\,000$ €.` },
        { type: 'p', text: r`**3.** La médiane (1 750 €) est plus représentative : elle n’est pas influencée par le salaire extrême de 14 000 €.` },
        { type: 'p', text: r`**4.** La moyenne est tirée vers le haut par **un seul** salaire très élevé : 9 salariés sur 10 gagnent **moins** que la moyenne (le plus élevé d’entre eux gagne 2 100 €). Sans le salaire de 14 000 €, la moyenne des 9 autres serait $\dfrac{15\,500}{9} \approx 1\,722$ €. L’affirmation est trompeuse : il faut aussi donner la médiane et la dispersion.` },
      ],
    },
    {
      id: 'esprit-critique',
      title: 'Lire un graphique avec esprit critique',
      difficulty: 2,
      duration: 15,
      tags: ['esprit critique', 'représentation'],
      statement: [
        { type: 'p', text: 'Une entreprise présente son chiffre d’affaires (en milliers d’euros) à gauche. Le même jeu de données est présenté à droite avec un axe commençant à 0.' },
        { type: 'svg', svg: misleading(), maxWidth: 580 },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quel est le taux d’évolution du chiffre d’affaires entre 2022 et 2023 (valeurs 102 et 105) ?',
            'Quel graphique est trompeur ? Pourquoi ?',
            'Une étude montre que « les villes ayant plus de pompiers ont plus d’incendies graves ». Peut-on conclure que les pompiers provoquent les incendies ? Proposer une explication.',
            'Un sondage en ligne sur un site de jeux vidéo conclut que « 90 % des jeunes jouent tous les jours ». Quelle critique peut-on formuler ?',
          ],
        },
      ],
      hints: ['Taux d’évolution = (valeur finale − valeur initiale) / valeur initiale.'],
      solution: [
        { type: 'p', text: r`**1.** $\dfrac{105 - 102}{102} \approx 0{,}0294$ : environ **+2,9 %**.` },
        { type: 'p', text: r`**2.** Le graphique de gauche est trompeur : l’axe démarre à 100, la barre de 2023 est environ 2,5 fois plus haute que celle de 2022 ($5/2$) alors que l’augmentation est de seulement 2,9 %. Le graphique de droite (axe à 0) montre des barres quasiment identiques.` },
        { type: 'p', text: r`**3.** Non : c’est une **corrélation** sans causalité. Un facteur commun explique les deux : la **taille de la ville**. Les grandes villes ont plus de pompiers et plus d’incendies (en valeur absolue).` },
        { type: 'p', text: r`**4.** L’échantillon n’est pas représentatif : les visiteurs d’un site de jeux vidéo sont, par construction, des joueurs. Il y a aussi un biais d’auto-sélection (seuls ceux qui répondent sont comptés) et on ignore l’effectif.` },
      ],
    },
    {
      id: 'deux-traitements',
      title: 'Type contrôle : deux traitements (paradoxe de Simpson)',
      difficulty: 3,
      duration: 25,
      tags: ['type bac', 'fréquences conditionnelles', 'esprit critique'],
      statement: [
        { type: 'p', text: 'Deux traitements A et B contre les calculs rénaux ont été testés. Les patients sont classés selon la taille de leur calcul (petit ou gros). Les résultats (nombre de patients guéris / nombre de patients traités) sont :' },
        {
          type: 'table',
          headers: ['', 'Traitement A', 'Traitement B'],
          rows: [['Petits calculs', '81 guéris sur 87', '234 guéris sur 270'], ['Gros calculs', '192 guéris sur 263', '55 guéris sur 80'], ['Ensemble', '273 guéris sur 350', '289 guéris sur 350']],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculer le taux de guérison global de chaque traitement. Quel traitement semble le meilleur ?',
            'Calculer les taux de guérison de chaque traitement pour les petits calculs, puis pour les gros calculs (arrondir à 0,1 %).',
            'Que constate-t-on ? Proposer une explication à l’aide des effectifs.',
            'Quel traitement conseiller à un patient dont on sait que le calcul est gros ? Et pour un petit ?',
          ],
        },
      ],
      hints: ['Regarde combien de patients à gros calculs reçoivent A, puis B.'],
      solution: [
        { type: 'p', text: r`**1.** A : $\dfrac{273}{350} = 0{,}78$ soit **78 %**. B : $\dfrac{289}{350} \approx 0{,}826$ soit environ **82,6 %**. Globalement, B semble meilleur.` },
        { type: 'p', text: r`**2.** Petits calculs : A : $\dfrac{81}{87} \approx 93{,}1\,\%$ ; B : $\dfrac{234}{270} \approx 86{,}7\,\%$. Gros calculs : A : $\dfrac{192}{263} \approx 73{,}0\,\%$ ; B : $\dfrac{55}{80} = 68{,}75\,\% \approx 68{,}8\,\%$.` },
        { type: 'p', text: r`**3.** A est meilleur dans **chaque** catégorie, alors que B semble meilleur globalement. Explication : le traitement A a été donné majoritairement à des cas difficiles (263 gros calculs sur 350, soit 75 %), alors que B a surtout été donné à des cas faciles (270 petits sur 350, soit environ 77 %). Les groupes ne sont pas comparables, d’où l’inversion des pourcentages globaux.` },
        { type: 'p', text: r`**4.** Dans les deux cas, on conseille le traitement **A** : il a le meilleur taux de guérison pour les petits comme pour les gros calculs. Le taux global est trompeur, il faut comparer des groupes de même nature.` },
      ],
    },
    {
      id: 'python-stats',
      title: 'Programmer des indicateurs',
      difficulty: 3,
      duration: 20,
      tags: ['python', 'écart type'],
      statement: [
        { type: 'p', text: 'On considère le programme suivant.' },
        {
          type: 'code',
          lang: 'python',
          code: `from math import sqrt

def indicateurs(liste):
    n = len(liste)
    moyenne = sum(liste) / n
    ecarts = 0
    for x in liste:
        ecarts = ecarts + (x - moyenne) ** 2
    return moyenne, sqrt(ecarts / n)

print(indicateurs([8, 10, 10, 12, 12, 12, 14, 15, 16, 18]))
print(indicateurs([11, 12, 12, 13]))`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Que calcule la fonction `indicateurs` ?',
            'Quelle valeur renvoie `indicateurs([11, 12, 12, 13])` ? Détailler le calcul.',
            'Comparer avec la première série : que dire des deux dispersions ?',
          ],
        },
      ],
      hints: ['Pour la 2e liste, n = 4 et la moyenne vaut 12.'],
      solution: [
        { type: 'p', text: r`**1.** Elle renvoie le couple (moyenne, écart type) de la liste : « ecarts » accumule les carrés des écarts à la moyenne, qu’on divise par $n$ pour obtenir la variance, puis on prend la racine carrée.` },
        { type: 'p', text: r`**2.** Moyenne $= \dfrac{11+12+12+13}{4} = 12$. Carrés des écarts : $1 + 0 + 0 + 1 = 2$. Variance $= \dfrac{2}{4} = 0{,}5$ ; écart type $= \sqrt{0{,}5} \approx 0{,}71$. La fonction renvoie (12.0, 0.7071…).` },
        { type: 'p', text: r`**3.** La première série a un écart type de 2,9 ; la seconde de 0,71 : la seconde série est donc beaucoup plus concentrée autour de sa moyenne. (Les deux séries ont la même médiane, 12 ; leurs moyennes sont 12,7 et 12.)` },
      ],
    },
  ],

  // =========================================================================
  representations: [
    {
      type: 'svg',
      svg: annotatedBox(),
      caption: 'Cinq nombres résument la série : min, Q1, médiane, Q3, max.',
      maxWidth: 560,
    },
    {
      type: 'svg',
      svg: boxplots(
        [
          { label: 'Série 1', d: { min: 8, q1: 10, med: 12, q3: 15, max: 18 }, color: BLUE },
          { label: 'Série 2', d: { min: 4, q1: 8, med: 12, q3: 16, max: 20 }, color: ORANGE },
          { label: 'Série 3', d: { min: 10, q1: 11, med: 12, q3: 13, max: 14 }, color: GREEN },
        ],
        2,
        20,
      ),
      caption: 'Trois séries de même médiane (12) mais de dispersions très différentes.',
      maxWidth: 560,
    },
    { type: 'svg', svg: stackedBars(), caption: 'Fréquences conditionnelles : on compare des proportions à l’intérieur de chaque groupe.', maxWidth: 560 },
    {
      type: 'widget',
      id: 'random-variable',
      props: { values: [6, 8, 10, 12, 14, 16], probs: [0.1, 0.15, 0.25, 0.3, 0.15, 0.05] },
      title: 'Distribution et dispersion',
      caption: 'La série des notes du contrôle sous forme de loi : modifie les probabilités et observe l’espérance (moyenne) et l’écart type.',
    },
    {
      type: 'qcm',
      questions: [
        { question: 'Dans un tableau croisé, une fréquence conditionnelle se calcule en divisant l’effectif d’une case par…', choices: ['l’effectif total', 'l’effectif marginal du sous-groupe considéré', 'le nombre de cases', 'la somme des effectifs de la case'], answer: 1, explanation: 'Le dénominateur est l’effectif du sous-groupe « parmi lequel » on raisonne.' },
        { question: r`La médiane de la série $3\ ;\ 5\ ;\ 7\ ;\ 9\ ;\ 20$ est…`, choices: ['$7$', '$8$', '$9$', '$12$'], answer: 0, explanation: 'Série de 5 valeurs : la 3e valeur vaut 7. La moyenne, elle, vaut 8,8.' },
        { question: r`Pour la série $2\ ;\ 4\ ;\ 6\ ;\ 8$, la médiane est…`, choices: ['$4$', '$5$', '$6$', '$20$'], answer: 1, explanation: r`$N=4$ pair : moyenne des 2e et 3e valeurs, $\frac{4+6}{2}=5$.` },
        { question: r`On ajoute 5 à toutes les valeurs d’une série. L’écart type…`, choices: ['augmente de 5', 'est multiplié par 5', 'ne change pas', 'devient nul'], answer: 2, explanation: 'Un décalage ne modifie pas la dispersion.' },
        { question: r`On multiplie toutes les valeurs par 3. L’écart type…`, choices: ['ne change pas', 'augmente de 3', 'est multiplié par 3', 'est multiplié par 9'], answer: 2, explanation: r`$\sigma_y = |a|\,\sigma_x$ avec $a=3$.` },
        { question: 'L’écart interquartile vaut…', choices: [r`$\max - \min$`, r`$Q_3 - Q_1$`, r`$Q_3 - Me$`, r`$\bar{x} - Me$`], answer: 1, explanation: 'Il mesure l’étalement des 50 % de valeurs centrales.' },
        { question: 'Pour des salaires avec une valeur extrême très élevée, l’indicateur le plus robuste est…', choices: ['la moyenne', 'la médiane', 'l’étendue', 'le maximum'], answer: 1, explanation: 'La médiane n’est pratiquement pas affectée par les valeurs extrêmes.' },
        { question: 'Deux variables corrélées entre elles…', choices: ['sont forcément liées par une relation de cause à effet', 'peuvent dépendre d’un troisième facteur', 'ont forcément la même moyenne', 'ont forcément le même écart type'], answer: 1, explanation: 'Corrélation n’implique pas causalité.' },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Au moins 50 % des valeurs d’une série sont inférieures ou égales à la médiane.', answer: true, explanation: 'C’est la définition de la médiane.' },
        { text: 'La moyenne d’une série est toujours une valeur de la série.', answer: false, explanation: 'Par exemple la moyenne de 1 et 2 est 1,5.' },
        { text: 'Deux séries de même moyenne ont le même écart type.', answer: false, explanation: 'La moyenne ne dit rien sur la dispersion.' },
        { text: 'La boîte à moustaches contient environ 50 % des valeurs.', answer: true, explanation: 'Elle va de Q1 à Q3.' },
        { text: 'Un écart type peut être négatif.', answer: false, explanation: 'C’est une racine carrée : il est toujours positif ou nul.' },
        { text: 'Un écart type nul signifie que toutes les valeurs sont égales.', answer: true, explanation: 'Tous les écarts à la moyenne sont nuls.' },
        { text: 'Si 30 % des garçons et 30 % des filles sont externes, alors 30 % de la population est externe.', answer: true, explanation: 'La fréquence marginale est une moyenne pondérée des fréquences conditionnelles, toutes égales à 30 %.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Vocabulaire',
      text: r`La {{médiane|mediane}} partage une série en deux groupes de même effectif. Le premier {{quartile}} est la plus petite valeur telle qu’au moins {{25}} % des valeurs lui soient inférieures ou égales. L’écart {{interquartile}} vaut $Q_3 - Q_1$. L’{{écart type|ecart type}} mesure la dispersion autour de la {{moyenne}}.`,
    },
    {
      type: 'matching',
      title: 'Associer indicateur et rôle',
      pairs: [
        { left: 'Moyenne', right: 'Position, sensible aux valeurs extrêmes' },
        { left: 'Médiane', right: 'Position, robuste' },
        { left: 'Écart interquartile', right: 'Dispersion des 50 % centraux' },
        { left: 'Écart type', right: 'Dispersion autour de la moyenne' },
        { left: 'Étendue', right: 'Écart entre la plus grande et la plus petite valeur' },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Fréquence marginale', back: 'Part d’une modalité dans la population **totale**.' },
        { front: 'Fréquence conditionnelle', back: 'Part d’une modalité dans un **sous-groupe** : l’effectif du sous-groupe est le dénominateur.' },
        { front: 'Formule de la moyenne pondérée', back: r`$\bar{x} = \dfrac{\sum n_i x_i}{N}$` },
        { front: 'Définition de la médiane', back: 'Valeur qui partage la série en deux groupes de même effectif.' },
        { front: 'Définition de $Q_1$', back: 'Plus petite valeur telle qu’au moins 25 % des valeurs soient inférieures ou égales.' },
        { front: 'Formule de la variance', back: r`$V = \dfrac{\sum n_i (x_i - \bar{x})^2}{N} = \dfrac{\sum n_i x_i^2}{N} - \bar{x}^2$` },
        { front: 'Écart type', back: r`$\sigma = \sqrt{V}$` },
        { front: 'Effet de $y = ax+b$', back: r`$\bar{y} = a\bar{x} + b$ et $\sigma_y = |a|\,\sigma_x$` },
        { front: 'Corrélation et causalité', back: 'Une corrélation n’est pas une preuve de cause à effet : un troisième facteur peut expliquer les deux.' },
        { front: 'Comment repérer un graphique trompeur ?', back: 'Axe tronqué, échelles différentes, échantillon non représentatif, effectifs cachés.' },
      ],
    },
  ],
}

export default chapter
