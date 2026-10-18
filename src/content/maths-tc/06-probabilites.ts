import type { Chapter } from '../types'

const r = String.raw

const FONT = 'font-family="Geist, sans-serif"'
const BLUE = 'hsl(217 91% 60%)'
const RED = 'hsl(0 84% 60%)'
const GREEN = 'hsl(142 71% 45%)'
const ORANGE = 'hsl(25 95% 53%)'

/** Arbre pondéré à deux niveaux. labels : [A, B|A, B|nonA] etc. */
function tree(opts: {
  a: string; na: string; pa: string; pna: string
  b: string; nb: string
  pbA: string; pnbA: string; pbNA: string; pnbNA: string
  leaves: string[]
}): string {
  const t = (x: number, y: number, s: string, anchor = 'middle', c = 'currentColor', w = 'normal') =>
    `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="12" font-weight="${w}" fill="${c}" ${FONT}>${s}</text>`
  let s = `<svg viewBox="0 0 520 260" role="img" aria-label="Arbre pondéré">`
  const o = [30, 130], A = [200, 65], NA = [200, 195]
  const leaf = [[390, 30], [390, 100], [390, 160], [390, 230]]
  const line = (p: number[], q: number[], c = 'currentColor') => `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${c}" stroke-width="1.4"/>`
  s += line(o, A, BLUE) + line(o, NA, BLUE)
  s += line(A, leaf[0], GREEN) + line(A, leaf[1], GREEN) + line(NA, leaf[2], ORANGE) + line(NA, leaf[3], ORANGE)
  s += `<circle cx="${o[0]}" cy="${o[1]}" r="4" fill="currentColor"/>`
  s += t(A[0] + 10, A[1] - 10, opts.a, 'middle', BLUE, '600') + t(NA[0] + 10, NA[1] + 22, opts.na, 'middle', BLUE, '600')
  s += t(100, 88, opts.pa, 'middle', BLUE) + t(100, 183, opts.pna, 'middle', BLUE)
  s += t(300, 38, opts.pbA, 'middle', GREEN) + t(300, 100, opts.pnbA, 'middle', GREEN)
  s += t(300, 168, opts.pbNA, 'middle', ORANGE) + t(300, 232, opts.pnbNA, 'middle', ORANGE)
  const lbl = [opts.b, opts.nb, opts.b, opts.nb]
  const pre = [opts.a, opts.a, opts.na, opts.na]
  leaf.forEach((p, i) => {
    s += t(p[0] + 8, p[1] + 4, `${lbl[i]}`, 'start', 'currentColor', '600')
    s += t(p[0] + 60, p[1] + 4, `${opts.leaves[i]}`, 'start')
  })
  void pre
  s += `</svg>`
  return s
}

/** Arbre numérique du dépistage */
function screeningTree(): string {
  return tree({
    a: 'M', na: 'M̄', pa: '0,01', pna: '0,99',
    b: 'T', nb: 'T̄',
    pbA: '0,99', pnbA: '0,01', pbNA: '0,05', pnbNA: '0,95',
    leaves: ['P(M∩T) = 0,0099', 'P(M∩T̄) = 0,0001', 'P(M̄∩T) = 0,0495', 'P(M̄∩T̄) = 0,9405'],
  }).replace('viewBox="0 0 520 260"', 'viewBox="0 0 560 260"')
}

/** Population de 10 000 personnes : répartition en fréquences naturelles */
function naturalFrequencies(): string {
  const t = (x: number, y: number, s: string, c = 'currentColor') =>
    `<text x="${x}" y="${y}" text-anchor="middle" font-size="12" fill="${c}" ${FONT}>${s}</text>`
  let s = `<svg viewBox="0 0 520 250" role="img" aria-label="Fréquences naturelles du dépistage">`
  s += `<rect x="170" y="10" width="180" height="34" fill="none" stroke="currentColor"/>` + t(260, 32, '10 000 personnes')
  s += `<line x1="230" y1="44" x2="120" y2="90" stroke="currentColor"/><line x1="290" y1="44" x2="400" y2="90" stroke="currentColor"/>`
  s += `<rect x="60" y="90" width="120" height="34" fill="${RED}" fill-opacity="0.2" stroke="${RED}"/>` + t(120, 112, '100 malades')
  s += `<rect x="330" y="90" width="150" height="34" fill="${BLUE}" fill-opacity="0.2" stroke="${BLUE}"/>` + t(405, 112, '9 900 non malades')
  s += `<line x1="90" y1="124" x2="55" y2="170" stroke="currentColor"/><line x1="150" y1="124" x2="185" y2="170" stroke="currentColor"/>`
  s += `<line x1="375" y1="124" x2="335" y2="170" stroke="currentColor"/><line x1="435" y1="124" x2="475" y2="170" stroke="currentColor"/>`
  s += `<rect x="5" y="170" width="100" height="44" fill="${RED}" fill-opacity="0.45" stroke="${RED}"/>` + t(55, 189, '99 positifs') + t(55, 206, '(vrais positifs)')
  s += `<rect x="140" y="170" width="90" height="44" fill="none" stroke="currentColor"/>` + t(185, 189, '1 négatif') + t(185, 206, '(faux négatif)')
  s += `<rect x="285" y="170" width="100" height="44" fill="${ORANGE}" fill-opacity="0.45" stroke="${ORANGE}"/>` + t(335, 189, '495 positifs') + t(335, 206, '(faux positifs)')
  s += `<rect x="415" y="170" width="100" height="44" fill="none" stroke="currentColor"/>` + t(465, 189, '9 405 négatifs') + t(465, 206, '(vrais négatifs)')
  s += t(260, 240, 'Parmi les 99 + 495 = 594 positifs, seuls 99 sont malades : 99 / 594 = 1/6', GREEN)
  s += `</svg>`
  return s
}

/** Diagramme de Venn pour P(A∪B) */
function venn(): string {
  let s = `<svg viewBox="0 0 420 220" role="img" aria-label="Réunion et intersection">`
  s += `<rect x="10" y="10" width="400" height="200" fill="none" stroke="currentColor"/>`
  s += `<text x="20" y="28" font-size="12" fill="currentColor" ${FONT}>Ω (30 élèves)</text>`
  s += `<circle cx="160" cy="115" r="70" fill="${BLUE}" fill-opacity="0.25" stroke="${BLUE}" stroke-width="1.5"/>`
  s += `<circle cx="250" cy="115" r="70" fill="${ORANGE}" fill-opacity="0.25" stroke="${ORANGE}" stroke-width="1.5"/>`
  s += `<text x="120" y="119" text-anchor="middle" font-size="14" fill="currentColor" ${FONT}>13</text>`
  s += `<text x="205" y="119" text-anchor="middle" font-size="14" fill="currentColor" ${FONT}>5</text>`
  s += `<text x="292" y="119" text-anchor="middle" font-size="14" fill="currentColor" ${FONT}>7</text>`
  s += `<text x="375" y="190" text-anchor="middle" font-size="14" fill="currentColor" ${FONT}>5</text>`
  s += `<text x="125" y="35" text-anchor="middle" font-size="13" font-weight="600" fill="${BLUE}" ${FONT}>A : sport (18)</text>`
  s += `<text x="285" y="35" text-anchor="middle" font-size="13" font-weight="600" fill="${ORANGE}" ${FONT}>B : musique (12)</text>`
  s += `<text x="205" y="150" text-anchor="middle" font-size="11" fill="currentColor" ${FONT}>A ∩ B</text>`
  s += `</svg>`
  return s
}

/** Fluctuation : fréquence de Pile sur 100 puis 1000 lancers (illustration d'intervalles) */
function fluctuation(): string {
  const L = 60, W = 400
  const X = (p: number) => +(L + ((p - 0.3) / 0.4) * W).toFixed(1)
  let s = `<svg viewBox="0 0 520 190" role="img" aria-label="Intervalles de fluctuation">`
  for (const p of [0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7]) {
    s += `<line x1="${X(p)}" y1="20" x2="${X(p)}" y2="135" stroke="currentColor" opacity="0.1"/>`
    s += `<text x="${X(p)}" y="152" text-anchor="middle" font-size="11" fill="currentColor" ${FONT}>${String(p).replace('.', ',')}</text>`
  }
  s += `<line x1="${L}" y1="135" x2="${L + W}" y2="135" stroke="currentColor"/>`
  s += `<line x1="${X(0.5)}" y1="15" x2="${X(0.5)}" y2="135" stroke="currentColor" stroke-dasharray="4 3"/>`
  const bar = (y: number, a: number, b: number, c: string, lab: string) =>
    `<rect x="${X(a)}" y="${y}" width="${+(X(b) - X(a)).toFixed(1)}" height="22" fill="${c}" fill-opacity="0.3" stroke="${c}" stroke-width="1.5"/>` +
    `<text x="${X(0.5)}" y="${y + 16}" text-anchor="middle" font-size="12" fill="currentColor" ${FONT}>${lab}</text>`
  s += bar(30, 0.4, 0.6, BLUE, 'n = 100 : [0,4 ; 0,6]')
  s += bar(75, 0.468, 0.532, GREEN, 'n = 1000 : [0,468 ; 0,532]')
  s += `<text x="260" y="176" text-anchor="middle" font-size="12" fill="currentColor" ${FONT}>Plus l’échantillon est grand, plus l’intervalle de fluctuation est étroit (largeur 2/√n)</text>`
  s += `</svg>`
  return s
}

const chapter: Chapter = {
  id: 'probabilites',
  subject: 'maths-tc',
  order: 6,
  title: 'Probabilités',
  theme: 'Probabilités',
  summary:
    'Événements, probabilités et arbres pondérés, probabilités conditionnelles (dépistage), indépendance, simulation et fluctuation d’échantillonnage.',
  duration: '3 semaines',
  objectives: [
    'Décrire une expérience aléatoire, son univers et ses événements ; utiliser le complémentaire, la réunion et l’intersection.',
    'Calculer des probabilités dans une situation d’équiprobabilité et avec $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.',
    'Calculer et interpréter une probabilité conditionnelle $P_A(B)$.',
    'Construire un arbre pondéré et l’utiliser pour calculer des probabilités (probabilités totales).',
    'Reconnaître et tester une situation d’indépendance.',
    'Simuler une expérience aléatoire avec Python et utiliser un intervalle de fluctuation.',
  ],
  keywords: ['événement', 'probabilité', 'arbre pondéré', 'probabilité conditionnelle', 'indépendance', 'dépistage', 'simulation', 'fluctuation'],

  // =========================================================================
  fiche: [
    { type: 'h2', text: 'L’essentiel en probabilités' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Vocabulaire',
      content: [
        {
          type: 'list',
          items: [
            r`**Univers** $\Omega$ : ensemble de toutes les issues. **Événement** : partie de $\Omega$.`,
            r`**Complémentaire** $\overline{A}$ : « $A$ n’est pas réalisé ». **Intersection** $A \cap B$ : « $A$ **et** $B$ ». **Réunion** $A \cup B$ : « $A$ **ou** $B$ ».`,
            r`Équiprobabilité : $P(A) = \dfrac{\text{nombre d’issues favorables}}{\text{nombre d’issues possibles}}$.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Formules de base',
      content: [
        { type: 'list', items: [r`$0 \leq P(A) \leq 1$ ; $P(\Omega) = 1$ ; $P(\overline{A}) = 1 - P(A)$.`, r`$P(A \cup B) = P(A) + P(B) - P(A \cap B)$.`] },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Probabilité conditionnelle',
      content: [
        { type: 'p', text: r`Si $P(A) \neq 0$ : $$P_A(B) = \frac{P(A \cap B)}{P(A)}.$$ C’est la probabilité de $B$ **sachant que $A$ est réalisé**. Donc $P(A \cap B) = P(A) \times P_A(B)$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Arbre pondéré',
      content: [
        {
          type: 'list',
          items: [
            'Sur chaque branche : la probabilité (conditionnelle) correspondante.',
            '**La somme des probabilités des branches issues d’un même nœud vaut 1.**',
            'Probabilité d’un chemin : on **multiplie** le long des branches.',
            r`Probabilités totales : $P(B) = P(A\cap B) + P(\overline{A}\cap B)$ ; on **additionne** les chemins qui mènent à $B$.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Indépendance',
      content: [
        { type: 'p', text: r`$A$ et $B$ sont **indépendants** si $P(A \cap B) = P(A)\times P(B)$ (équivalent à $P_A(B) = P(B)$ quand $P(A)\neq0$). Savoir que $A$ est réalisé ne change pas la probabilité de $B$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Fluctuation et simulation',
      content: [
        {
          type: 'p',
          text: r`Pour un échantillon de taille $n \geq 25$ et une proportion $p$ comprise entre $0{,}2$ et $0{,}8$, la fréquence observée se situe dans l’**intervalle de fluctuation** $\left[p - \frac{1}{\sqrt{n}}\ ;\ p + \frac{1}{\sqrt{n}}\right]$ dans environ 95 % des cas. Hors de cet intervalle, on peut douter de la valeur de $p$ annoncée.`,
        },
      ],
    },
  ],

  // =========================================================================
  cours: [
    { type: 'h2', text: '1. Expériences aléatoires et événements' },
    {
      type: 'p',
      text: 'Une **expérience aléatoire** est une expérience dont le résultat dépend du hasard et dont on connaît toutes les issues possibles : lancer un dé, tirer une carte, interroger au hasard un élève du lycée. L’ensemble des issues est l’**univers**, noté $\\Omega$.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Événements',
      content: [
        {
          type: 'list',
          items: [
            r`Un **événement** est un ensemble d’issues (une partie de $\Omega$). Il est **réalisé** si l’issue obtenue lui appartient.`,
            r`$\overline{A}$ (**contraire** de $A$) : les issues qui ne sont pas dans $A$.`,
            r`$A \cap B$ : « $A$ **et** $B$ » ; $A \cup B$ : « $A$ **ou** $B$ » (au sens large : l’un, l’autre ou les deux).`,
            r`$A$ et $B$ sont **incompatibles** si $A \cap B = \varnothing$ : ils ne peuvent pas se réaliser en même temps.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Lancer d’un dé à 6 faces',
      content: [
        { type: 'p', text: r`$\Omega = \{1\,;2\,;3\,;4\,;5\,;6\}$. Soit $A$ : « obtenir un nombre pair » $= \{2\,;4\,;6\}$ et $B$ : « obtenir au moins 5 » $= \{5\,;6\}$.` },
        { type: 'p', text: r`$\overline{A} = \{1\,;3\,;5\}$ ; $A \cap B = \{6\}$ ; $A \cup B = \{2\,;4\,;5\,;6\}$.` },
      ],
    },

    { type: 'h2', text: '2. Probabilités' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Règles de calcul',
      content: [
        {
          type: 'list',
          items: [
            r`$P(\Omega) = 1$ et $0 \leq P(A) \leq 1$ pour tout événement $A$.`,
            r`**Équiprobabilité** (toutes les issues ont la même probabilité) : $P(A) = \dfrac{\text{card}(A)}{\text{card}(\Omega)}$.`,
            r`**Événement contraire** : $P(\overline{A}) = 1 - P(A)$.`,
            r`**Réunion** : $P(A\cup B) = P(A) + P(B) - P(A\cap B)$. Si $A$ et $B$ sont incompatibles : $P(A\cup B) = P(A)+P(B)$.`,
          ],
        },
      ],
    },
    {
      type: 'p',
      text: r`**Pourquoi la soustraction ?** Dans $P(A) + P(B)$, les issues de $A \cap B$ sont comptées **deux fois** ; on retire donc une fois $P(A \cap B)$.`,
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Deux activités dans une classe',
      content: [
        { type: 'p', text: r`Dans une classe de 30 élèves, 18 pratiquent un sport (événement $A$), 12 font de la musique ($B$) et 5 font les deux. On choisit un élève au hasard.` },
        { type: 'list', items: [r`$P(A) = \frac{18}{30} = 0{,}6$ ; $P(B) = \frac{12}{30} = 0{,}4$ ; $P(A\cap B) = \frac{5}{30} = \frac{1}{6}$.`, r`$P(A \cup B) = \frac{18+12-5}{30} = \frac{25}{30} = \frac{5}{6}$.`, r`Aucune des deux activités : $P(\overline{A\cup B}) = 1 - \frac{5}{6} = \frac{1}{6}$ (5 élèves).`] },
      ],
    },
    { type: 'svg', svg: venn(), caption: 'Diagramme de Venn : 13 élèves ne font que du sport, 5 font les deux, 7 ne font que de la musique, 5 ne font rien.', maxWidth: 480 },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Attention',
      content: [
        {
          type: 'list',
          items: [
            'L’équiprobabilité doit être **justifiée** : la somme de deux dés vaut 7 avec une probabilité de $\\frac{6}{36}$ (36 couples équiprobables) et non $\\frac{1}{11}$ (11 sommes possibles **non** équiprobables).',
            'Ne pas confondre « incompatibles » (jamais ensemble) et « indépendants » (l’un ne renseigne pas sur l’autre).',
          ],
        },
      ],
    },

    { type: 'h2', text: '3. Probabilité conditionnelle' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Définition',
      content: [
        { type: 'p', text: r`Soit $A$ un événement de probabilité non nulle. La **probabilité de $B$ sachant $A$** est $$P_A(B) = \frac{P(A\cap B)}{P(A)}.$$ On « se place dans l’univers où $A$ est réalisé » : $A$ devient le nouvel ensemble de référence.` },
        { type: 'p', text: r`On en déduit la formule de multiplication : $P(A \cap B) = P(A) \times P_A(B)$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Avec les élèves de la classe de 30',
      content: [
        { type: 'p', text: r`Sachant qu’un élève fait de la musique, la probabilité qu’il fasse du sport est $P_B(A) = \dfrac{P(A\cap B)}{P(B)} = \dfrac{5/30}{12/30} = \dfrac{5}{12}$.` },
        { type: 'p', text: r`Inversement $P_A(B) = \dfrac{5}{18} \approx 0{,}278$. Attention : $P_B(A) \neq P_A(B)$ en général !` },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ne pas inverser le conditionnement',
      content: [
        { type: 'p', text: r`$P_A(B)$ et $P_B(A)$ sont deux nombres **différents** : « parmi les musiciens, 5/12 font du sport » n’est pas « parmi les sportifs, 5/18 font de la musique ». Cette confusion est à l’origine de nombreuses erreurs d’interprétation, notamment en médecine.` },
      ],
    },

    { type: 'h2', text: '4. Arbres pondérés' },
    {
      type: 'p',
      text: 'Un **arbre pondéré** représente une expérience en plusieurs étapes. Chaque branche porte une probabilité : sur la première étape, une probabilité ordinaire ; sur la seconde, une probabilité **conditionnelle** à ce qui s’est passé avant.',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Règles de lecture',
      content: [
        {
          type: 'list',
          items: [
            r`**Règle des nœuds** : la somme des probabilités des branches qui partent d’un même nœud est 1.`,
            r`**Règle du produit** : la probabilité d’un chemin est le produit des probabilités de ses branches ($P(A\cap B) = P(A)\times P_A(B)$).`,
            r`**Règle de la somme (probabilités totales)** : la probabilité d’un événement est la somme des probabilités des chemins qui y mènent : $P(B) = P(A\cap B) + P(\overline{A}\cap B)$.`,
          ],
        },
      ],
    },
    {
      type: 'svg',
      svg: tree({
        a: 'A', na: 'Ā', pa: '0,6', pna: '0,4', b: 'D', nb: 'D̄',
        pbA: '0,02', pnbA: '0,98', pbNA: '0,05', pnbNA: '0,95',
        leaves: ['0,6×0,02 = 0,012', '0,6×0,98 = 0,588', '0,4×0,05 = 0,02', '0,4×0,95 = 0,38'],
      }),
      caption: 'Une usine : la machine A produit 60 % des pièces avec 2 % de défauts ; la machine B (Ā) produit 40 % des pièces avec 5 % de défauts.',
      maxWidth: 540,
    },
    {
      type: 'p',
      text: r`Probabilité qu’une pièce soit défectueuse : $P(D) = 0{,}6\times0{,}02 + 0{,}4\times0{,}05 = 0{,}012 + 0{,}02 = 0{,}032$. Sachant qu’une pièce est défectueuse, la probabilité qu’elle vienne de A est $P_D(A) = \dfrac{P(A\cap D)}{P(D)} = \dfrac{0{,}012}{0{,}032} = 0{,}375$.`,
    },

    { type: 'h2', text: '5. Exemple fondamental : le dépistage' },
    {
      type: 'p',
      text: r`Une maladie touche 1 % de la population ($P(M) = 0{,}01$). Un test la détecte chez 99 % des malades ($P_M(T) = 0{,}99$) mais donne un résultat positif à tort chez 5 % des personnes non malades ($P_{\overline{M}}(T) = 0{,}05$). Une personne est testée **positive**. Quelle est la probabilité qu’elle soit réellement malade ?`,
    },
    { type: 'svg', svg: screeningTree(), caption: 'Arbre du dépistage.', maxWidth: 580 },
    {
      type: 'steps',
      items: [
        { title: 'Probabilités des chemins menant à T', text: r`$P(M\cap T) = 0{,}01\times0{,}99 = 0{,}0099$ et $P(\overline{M}\cap T) = 0{,}99\times0{,}05 = 0{,}0495$.` },
        { title: 'Probabilités totales', text: r`$P(T) = 0{,}0099 + 0{,}0495 = 0{,}0594$.` },
        { title: 'Probabilité conditionnelle recherchée', text: r`$P_T(M) = \dfrac{P(M\cap T)}{P(T)} = \dfrac{0{,}0099}{0{,}0594} = \dfrac{1}{6} \approx 0{,}167$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Résultat surprenant',
      content: [
        { type: 'p', text: r`Malgré un test fiable à 99 % pour les malades, **un test positif ne signifie qu’une chance sur six d’être malade**. La raison : la maladie est rare, donc les faux positifs (5 % de 9 900 personnes saines) sont bien plus nombreux que les vrais positifs (99 % de 100 malades).` },
      ],
    },
    { type: 'svg', svg: naturalFrequencies(), caption: 'Même raisonnement en « fréquences naturelles » sur 10 000 personnes : 99 vrais positifs, 495 faux positifs.', maxWidth: 560 },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Astuce',
      content: [
        { type: 'p', text: 'Pour comprendre une situation conditionnelle, imaginer une grande population (10 000 personnes) et remplir un **tableau croisé d’effectifs** ou un arbre en effectifs. Les pourcentages deviennent des nombres de personnes, et le piège disparaît.' },
      ],
    },

    { type: 'h2', text: '6. Événements indépendants' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Indépendance',
      content: [
        { type: 'p', text: r`Deux événements $A$ et $B$ sont **indépendants** lorsque $$P(A\cap B) = P(A)\times P(B).$$ Si $P(A)\neq 0$, cela équivaut à $P_A(B) = P(B)$ : la réalisation de $A$ ne modifie pas la probabilité de $B$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Lancers répétés',
      content: [
        { type: 'p', text: r`Un joueur de basket réussit un lancer franc avec la probabilité $0{,}7$ ; les tirs sont supposés indépendants. Probabilité de réussir 3 tirs de suite : $0{,}7^3 = 0{,}343$. Probabilité de les manquer tous : $0{,}3^3 = 0{,}027$. Probabilité d’en réussir au moins un : $1 - 0{,}027 = 0{,}973$.` },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Tirages avec ou sans remise',
      content: [
        { type: 'p', text: r`Avec remise, les tirages successifs sont indépendants. **Sans remise**, ils ne le sont pas : la composition de l’urne change. Dans une urne de 3 boules rouges et 2 bleues, la probabilité de tirer deux rouges **sans remise** est $\frac{3}{5}\times\frac{2}{4} = \frac{3}{10}$ (et $\frac{3}{5}\times\frac{3}{5} = \frac{9}{25}$ avec remise).` },
      ],
    },

    { type: 'h2', text: '7. Simulation et fluctuation d’échantillonnage' },
    {
      type: 'p',
      text: 'Quand le calcul est difficile, on peut **simuler** l’expérience avec un ordinateur : on répète un grand nombre de fois l’expérience et on regarde la fréquence d’apparition d’un événement. Plus on répète, plus cette fréquence se rapproche de la probabilité : c’est la **loi des grands nombres**.',
    },
    {
      type: 'code',
      lang: 'python',
      caption: 'Simuler 1 000 lancers de pièce et calculer la fréquence de Pile',
      code: `from random import randint

n = 1000
piles = 0
for i in range(n):
    if randint(0, 1) == 1:   # 1 = Pile
        piles = piles + 1
print(piles / n)`,
    },
    {
      type: 'p',
      text: 'Deux simulations du même programme ne donnent pas exactement le même résultat : c’est la **fluctuation d’échantillonnage**.',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Intervalle de fluctuation',
      content: [
        {
          type: 'p',
          text: r`Si la proportion d’un caractère dans une population est $p$ (avec $0{,}2 \leq p \leq 0{,}8$), alors pour des échantillons de taille $n\geq 25$, la fréquence observée appartient à $\left[p - \frac{1}{\sqrt{n}}\ ;\ p+\frac{1}{\sqrt{n}}\right]$ dans environ **95 %** des cas.`,
        },
        { type: 'p', text: r`Règle de décision : si la fréquence observée est **dans** l’intervalle, on ne peut pas rejeter l’hypothèse ; si elle est **hors** de l’intervalle, on peut la rejeter avec un risque d’erreur d’environ 5 %.` },
      ],
    },
    { type: 'svg', svg: fluctuation(), caption: 'Pour une pièce équilibrée ($p = 0{,}5$) : $n=100$ donne $[0{,}4\\ ;\\ 0{,}6]$ et $n=1000$ donne environ $[0{,}468\\ ;\\ 0{,}532]$.', maxWidth: 560 },
    {
      type: 'callout',
      variant: 'example',
      title: 'La pièce est-elle truquée ?',
      content: [
        { type: 'p', text: r`On lance 100 fois une pièce : 62 Piles. $f = 0{,}62$. L’intervalle de fluctuation pour $p = 0{,}5$ et $n = 100$ est $\left[0{,}5-0{,}1\ ;\ 0{,}5+0{,}1\right] = [0{,}4\ ;\ 0{,}6]$. Comme $0{,}62 \notin [0{,}4\ ;\ 0{,}6]$, on rejette l’hypothèse « la pièce est équilibrée » (au seuil de 95 %).` },
        { type: 'p', text: r`Avec 56 Piles, $0{,}56 \in [0{,}4\ ;\ 0{,}6]$ : rien n’interdit de penser que la pièce est équilibrée.` },
      ],
    },
  ],

  // =========================================================================
  exercices: [
    {
      id: 'des-somme',
      title: 'Somme de deux dés',
      difficulty: 1,
      duration: 12,
      tags: ['équiprobabilité', 'dénombrement'],
      statement: [
        { type: 'p', text: 'On lance deux dés équilibrés à 6 faces, un rouge et un bleu, et on note la somme $S$ des deux résultats.' },
        { type: 'list', ordered: true, items: ['Combien y a-t-il d’issues possibles (couples) ? Pourquoi sont-elles équiprobables ?', r`Calculer $P(S = 7)$.`, r`Calculer $P(S \geq 10)$.`, 'Calculer la probabilité que la somme soit paire.'] },
      ],
      hints: ['Dresse un tableau à 6 lignes et 6 colonnes des sommes.'],
      solution: [
        { type: 'p', text: r`**1.** Chaque dé a 6 résultats : $6\times6 = 36$ couples. Les dés sont équilibrés et indépendants : les 36 couples sont équiprobables, chacun de probabilité $\frac{1}{36}$.` },
        { type: 'p', text: r`**2.** Sommes égales à 7 : $(1,6)$, $(2,5)$, $(3,4)$, $(4,3)$, $(5,2)$, $(6,1)$, soit 6 couples. $P(S=7) = \frac{6}{36} = \frac{1}{6}$.` },
        { type: 'p', text: r`**3.** $S\geq 10$ : $(4,6)$, $(5,5)$, $(6,4)$, $(5,6)$, $(6,5)$, $(6,6)$, soit 6 couples. $P(S\geq10) = \frac{6}{36} = \frac{1}{6}$.` },
        { type: 'p', text: r`**4.** La somme est paire si les deux résultats ont la même parité : (pair, pair) ou (impair, impair), soit $3\times3 + 3\times3 = 18$ couples. $P = \frac{18}{36} = \frac{1}{2}$.` },
      ],
    },
    {
      id: 'reunion',
      title: 'Sport et musique',
      difficulty: 1,
      duration: 12,
      tags: ['réunion', 'conditionnelle'],
      statement: [
        { type: 'p', text: 'Dans une classe de 30 élèves, 18 pratiquent un sport ($A$), 12 pratiquent la musique ($B$), et 5 pratiquent les deux. On choisit un élève au hasard.' },
        { type: 'list', ordered: true, items: [r`Calculer $P(A)$, $P(B)$ et $P(A\cap B)$.`, r`Calculer $P(A\cup B)$ et la probabilité de ne pratiquer aucune des deux activités.`, r`Calculer $P_A(B)$ et $P_B(A)$. Interpréter chacun en une phrase.`] },
      ],
      hints: [r`$P(A\cup B) = P(A)+P(B)-P(A\cap B)$.`],
      solution: [
        { type: 'p', text: r`**1.** $P(A) = \frac{18}{30} = \frac{3}{5}$ ; $P(B) = \frac{12}{30} = \frac{2}{5}$ ; $P(A\cap B) = \frac{5}{30} = \frac{1}{6}$.` },
        { type: 'p', text: r`**2.** $P(A\cup B) = \frac{18+12-5}{30} = \frac{25}{30} = \frac{5}{6}$. Aucune activité : $1 - \frac{5}{6} = \frac{1}{6}$ (soit 5 élèves).` },
        { type: 'p', text: r`**3.** $P_A(B) = \dfrac{5/30}{18/30} = \dfrac{5}{18} \approx 0{,}278$ : parmi les sportifs, environ 27,8 % font de la musique. $P_B(A) = \dfrac{5/30}{12/30} = \dfrac{5}{12} \approx 0{,}417$ : parmi les musiciens, environ 41,7 % font du sport.` },
      ],
    },
    {
      id: 'usine',
      title: 'Deux machines dans une usine',
      difficulty: 2,
      duration: 15,
      tags: ['arbre', 'probabilités totales'],
      statement: [
        { type: 'p', text: r`Dans une usine, la machine $A$ fabrique 60 % des pièces et la machine $B$ les 40 % restantes. $2\,\%$ des pièces de $A$ sont défectueuses, et $5\,\%$ de celles de $B$. On prélève une pièce au hasard. On note $D$ l’événement « la pièce est défectueuse ».` },
        { type: 'list', ordered: true, items: ['Construire l’arbre pondéré.', r`Calculer $P(D)$.`, r`Sachant que la pièce est défectueuse, quelle est la probabilité qu’elle provienne de $A$ ?`, r`Les événements $A$ et $D$ sont-ils indépendants ?`] },
      ],
      hints: [r`$P(D) = P(A\cap D) + P(B\cap D)$.`],
      solution: [
        { type: 'p', text: r`**1.** Arbre : de la racine partent $A$ (0,6) et $B$ (0,4) ; de $A$ partent $D$ (0,02) et $\overline{D}$ (0,98) ; de $B$ partent $D$ (0,05) et $\overline{D}$ (0,95).` },
        { type: 'p', text: r`**2.** $P(D) = 0{,}6\times 0{,}02 + 0{,}4\times0{,}05 = 0{,}012 + 0{,}020 = 0{,}032$.` },
        { type: 'p', text: r`**3.** $P_D(A) = \dfrac{P(A\cap D)}{P(D)} = \dfrac{0{,}012}{0{,}032} = 0{,}375$, soit 37,5 %.` },
        { type: 'p', text: r`**4.** $P(A)\times P(D) = 0{,}6\times0{,}032 = 0{,}0192 \neq 0{,}012 = P(A\cap D)$. Les événements ne sont **pas indépendants** (on a aussi $P_A(D) = 0{,}02 \neq P(D)$).` },
      ],
    },
    {
      id: 'urne',
      title: 'Tirages dans une urne',
      difficulty: 2,
      duration: 15,
      tags: ['arbre', 'sans remise', 'indépendance'],
      statement: [
        { type: 'p', text: 'Une urne contient 3 boules rouges et 2 boules bleues. On tire successivement deux boules.' },
        { type: 'list', ordered: true, items: ['On tire **sans remise**. Construire l’arbre et calculer la probabilité d’obtenir deux boules de même couleur.', 'Même question **avec remise**.', 'Dans quel cas les deux tirages sont-ils indépendants ? Justifier.'] },
      ],
      hints: ['Sans remise, la composition de l’urne change après le premier tirage.'],
      solution: [
        { type: 'p', text: r`**1.** Sans remise : $P(RR) = \frac{3}{5}\times\frac{2}{4} = \frac{6}{20} = \frac{3}{10}$ ; $P(BB) = \frac{2}{5}\times\frac{1}{4} = \frac{2}{20} = \frac{1}{10}$. Même couleur : $\frac{3}{10}+\frac{1}{10} = \frac{4}{10} = \frac{2}{5}$. (Contrôle : $P(RB)+P(BR) = \frac{3}{5}\cdot\frac{2}{4} + \frac{2}{5}\cdot\frac{3}{4} = \frac{3}{10}+\frac{3}{10} = \frac{3}{5}$ ; $\frac{3}{10}+\frac{3}{5}+\frac{1}{10} = 1$.)` },
        { type: 'p', text: r`**2.** Avec remise : $P(RR) = \frac{3}{5}\times\frac{3}{5} = \frac{9}{25}$ ; $P(BB) = \frac{2}{5}\times\frac{2}{5} = \frac{4}{25}$. Même couleur : $\frac{13}{25} = 0{,}52$.` },
        { type: 'p', text: r`**3.** Avec remise : la probabilité d’obtenir rouge au 2e tirage ($\frac{3}{5}$) ne dépend pas du 1er tirage : indépendance. Sans remise : $P_{R_1}(R_2) = \frac{2}{4} \neq P(R_2) = \frac{3}{5}$ : pas d’indépendance.` },
      ],
    },
    {
      id: 'independance',
      title: 'Tester l’indépendance',
      difficulty: 2,
      duration: 12,
      tags: ['indépendance'],
      statement: [
        { type: 'list', ordered: true, items: [r`On donne $P(A) = 0{,}4$, $P(B) = 0{,}5$ et $P(A\cap B) = 0{,}2$. Les événements $A$ et $B$ sont-ils indépendants ?`, r`On donne $P(C) = 0{,}3$, $P(D) = 0{,}5$ et $P(C\cup D) = 0{,}6$. Les événements $C$ et $D$ sont-ils indépendants ?`, 'Une classe compte 20 filles et 10 garçons. 12 filles et 6 garçons sont internes. Le sexe et l’internat sont-ils indépendants (en choisissant un élève au hasard) ?'] },
      ],
      hints: [r`Compare $P(A\cap B)$ et $P(A)\times P(B)$.`, r`Pour la 2, calcule d’abord $P(C\cap D)$.`],
      solution: [
        { type: 'p', text: r`**1.** $P(A)\times P(B) = 0{,}4\times0{,}5 = 0{,}2 = P(A\cap B)$ : **indépendants**.` },
        { type: 'p', text: r`**2.** $P(C\cap D) = P(C)+P(D)-P(C\cup D) = 0{,}3+0{,}5-0{,}6 = 0{,}2$. Or $P(C)P(D) = 0{,}15 \neq 0{,}2$ : **pas indépendants**.` },
        { type: 'p', text: r`**3.** Fille et interne : $\frac{12}{30} = 0{,}4$. $P(\text{fille}) = \frac{20}{30} = \frac{2}{3}$, $P(\text{interne}) = \frac{18}{30} = 0{,}6$. $\frac{2}{3}\times0{,}6 = 0{,}4$ : **indépendants**. (Autre lecture : 60 % des filles et 60 % des garçons sont internes.)` },
      ],
    },
    {
      id: 'depistage-ex',
      title: 'Type bac : un test de dépistage',
      difficulty: 3,
      duration: 25,
      tags: ['type bac', 'dépistage', 'conditionnelle'],
      statement: [
        { type: 'p', text: r`Dans une population, 5 % des personnes sont atteintes d’une maladie $M$. On dispose d’un test : s’il est appliqué à une personne malade, il est positif dans 90 % des cas ; s’il est appliqué à une personne non malade, il est positif dans 10 % des cas. On choisit une personne au hasard et on note $T$ l’événement « le test est positif ».` },
        {
          type: 'list',
          ordered: true,
          items: [
            'Représenter la situation par un arbre pondéré.',
            r`Calculer $P(M\cap T)$ puis $P(T)$.`,
            r`Calculer la probabilité qu’une personne dont le test est positif soit réellement malade, $P_T(M)$. Commenter.`,
            r`Calculer la probabilité qu’une personne dont le test est négatif ne soit pas malade, $P_{\overline{T}}(\overline{M})$.`,
            'Retrouver le résultat de la question 3 avec un tableau d’effectifs sur 10 000 personnes.',
          ],
        },
      ],
      hints: [r`Arbre : $M$ (0,05) puis $T$ (0,9) ; $\overline{M}$ (0,95) puis $T$ (0,1).`, r`$P_T(M) = \frac{P(M\cap T)}{P(T)}$.`],
      solution: [
        { type: 'p', text: r`**1.** Racine : $M$ (0,05) et $\overline{M}$ (0,95). De $M$ : $T$ (0,9) et $\overline{T}$ (0,1). De $\overline{M}$ : $T$ (0,1) et $\overline{T}$ (0,9).` },
        { type: 'p', text: r`**2.** $P(M\cap T) = 0{,}05\times0{,}9 = 0{,}045$. $P(\overline{M}\cap T) = 0{,}95\times0{,}1 = 0{,}095$. $P(T) = 0{,}045+0{,}095 = 0{,}14$.` },
        { type: 'p', text: r`**3.** $P_T(M) = \dfrac{0{,}045}{0{,}14} = \dfrac{9}{28} \approx 0{,}321$. Moins d’**un tiers** des personnes testées positives sont réellement malades, malgré un test plutôt fiable : la maladie est rare, donc beaucoup de faux positifs.` },
        { type: 'p', text: r`**4.** $P(\overline{M}\cap\overline{T}) = 0{,}95\times0{,}9 = 0{,}855$ ; $P(\overline{T}) = 1 - 0{,}14 = 0{,}86$. $P_{\overline{T}}(\overline{M}) = \dfrac{0{,}855}{0{,}86} = \dfrac{171}{172} \approx 0{,}994$. Un test négatif est très rassurant (99,4 %).` },
        { type: 'p', text: r`**5.** Sur 10 000 personnes : 500 malades dont $0{,}9\times500 = 450$ positifs ; 9 500 non malades dont $0{,}1\times9500 = 950$ positifs. Au total 1 400 positifs, dont 450 malades : $\frac{450}{1400} = \frac{9}{28} \approx 0{,}321$. Cohérent.` },
        {
          type: 'table',
          headers: ['', 'Malades', 'Non malades', 'Total'],
          rows: [['Test positif', '450', '950', '1 400'], ['Test négatif', '50', '8 550', '8 600'], ['Total', '500', '9 500', '10 000']],
        },
      ],
    },
    {
      id: 'option-theatre',
      title: 'Type contrôle : option théâtre au lycée',
      difficulty: 3,
      duration: 20,
      tags: ['arbre', 'conditionnelle', 'type contrôle'],
      statement: [
        { type: 'p', text: r`Dans un lycée, 55 % des élèves sont des filles. Parmi les filles, 30 % ont choisi l’option théâtre ; parmi les garçons, 10 %. On interroge un élève au hasard. On note $F$ « l’élève est une fille » et $T$ « l’élève a choisi l’option théâtre ».` },
        { type: 'list', ordered: true, items: ['Construire l’arbre pondéré.', r`Calculer la probabilité de $F\cap T$.`, r`Montrer que $P(T) = 0{,}21$.`, r`Sachant que l’élève fait du théâtre, quelle est la probabilité que ce soit une fille ?`, r`Calculer $P_{\overline{T}}(F)$ et comparer à $P(F)$.`] },
      ],
      hints: [r`Garçons : $P(\overline{F}) = 0{,}45$ et $P_{\overline{F}}(T) = 0{,}1$.`],
      solution: [
        { type: 'p', text: r`**1.** $F$ (0,55) puis $T$ (0,3) et $\overline{T}$ (0,7) ; $\overline{F}$ (0,45) puis $T$ (0,1) et $\overline{T}$ (0,9).` },
        { type: 'p', text: r`**2.** $P(F\cap T) = 0{,}55\times0{,}3 = 0{,}165$.` },
        { type: 'p', text: r`**3.** $P(T) = P(F\cap T) + P(\overline{F}\cap T) = 0{,}165 + 0{,}45\times0{,}1 = 0{,}165+0{,}045 = 0{,}21$.` },
        { type: 'p', text: r`**4.** $P_T(F) = \dfrac{0{,}165}{0{,}21} = \dfrac{11}{14} \approx 0{,}786$.` },
        { type: 'p', text: r`**5.** $P(F\cap\overline{T}) = 0{,}55\times0{,}7 = 0{,}385$ ; $P(\overline{T}) = 1 - 0{,}21 = 0{,}79$. $P_{\overline{T}}(F) = \dfrac{0{,}385}{0{,}79} \approx 0{,}487$, inférieur à $P(F) = 0{,}55$ : le sexe et le choix du théâtre ne sont pas indépendants.` },
      ],
    },
    {
      id: 'fluctuation-ex',
      title: 'Fluctuation : pièce, cartes et dé',
      difficulty: 2,
      duration: 18,
      tags: ['fluctuation', 'simulation'],
      statement: [
        { type: 'list', ordered: true, items: [r`Donner l’intervalle de fluctuation d’une fréquence de Pile pour une pièce équilibrée ($p=0{,}5$) sur $n=100$ lancers, puis sur $n=400$ lancers.`, r`On a obtenu 56 Piles sur 100 lancers, puis 224 sur 400. Que peut-on dire dans chaque cas ?`, r`On tire 400 fois une carte (avec remise) dans un jeu de 52 cartes et on obtient 112 cœurs. La proportion théorique de cœurs est $p = \frac{1}{4}$. Le jeu est-il douteux ?`, 'Écrire un programme Python simulant 400 lancers de pièce et affichant la fréquence de Pile.'] },
      ],
      hints: [r`Largeur de l’intervalle : $\pm\frac{1}{\sqrt{n}}$.`],
      solution: [
        { type: 'p', text: r`**1.** $n=100$ : $\frac{1}{\sqrt{100}} = 0{,}1$, intervalle $[0{,}4\ ;\ 0{,}6]$. $n=400$ : $\frac{1}{\sqrt{400}} = 0{,}05$, intervalle $[0{,}45\ ;\ 0{,}55]$.` },
        { type: 'p', text: r`**2.** $f = 0{,}56 \in [0{,}4\ ;\ 0{,}6]$ : on ne rejette pas l’équilibre. Sur 400 lancers, $f = \frac{224}{400} = 0{,}56 \notin [0{,}45\ ;\ 0{,}55]$ : on rejette l’hypothèse d’une pièce équilibrée (risque d’environ 5 %). Même fréquence, mais un échantillon plus grand donne un intervalle plus étroit.` },
        { type: 'p', text: r`**3.** $p = 0{,}25$ ($0{,}2\leq p\leq 0{,}8$ : l’approximation s’applique), $n=400$ : intervalle $[0{,}25-0{,}05\ ;\ 0{,}25+0{,}05] = [0{,}20\ ;\ 0{,}30]$. $f = \frac{112}{400} = 0{,}28 \in [0{,}20\ ;\ 0{,}30]$ : rien ne permet de douter du jeu.` },
        { type: 'code', lang: 'python', code: `from random import randint\n\nn = 400\npiles = 0\nfor i in range(n):\n    if randint(0, 1) == 1:\n        piles = piles + 1\nprint(piles / n)` },
      ],
    },
    {
      id: 'variable-aleatoire',
      title: 'Un jeu de dé',
      difficulty: 3,
      duration: 20,
      tags: ['loi de probabilité', 'espérance'],
      statement: [
        { type: 'p', text: r`Pour participer à un jeu, un joueur mise 2 €, puis lance un dé équilibré : s’il obtient 6, il reçoit 6 € ; s’il obtient 4 ou 5, il reçoit 2 € ; sinon il ne reçoit rien. On note $X$ le gain **net** du joueur (gain moins mise).` },
        { type: 'list', ordered: true, items: [r`Donner les valeurs prises par $X$ et sa loi de probabilité.`, r`Calculer l’espérance $E(X)$. Que signifie-t-elle ?`, 'Le jeu est-il favorable au joueur ?'] },
      ],
      hints: [r`Gain net = somme reçue − 2.`],
      solution: [
        { type: 'p', text: r`**1.** Si 1, 2 ou 3 : on perd la mise, $X=-2$, avec $P=\frac{3}{6}=\frac{1}{2}$. Si 4 ou 5 : $X = 2-2 = 0$, $P = \frac{2}{6} = \frac{1}{3}$. Si 6 : $X = 6-2 = 4$, $P=\frac{1}{6}$. (Somme : $\frac{1}{2}+\frac{1}{3}+\frac{1}{6} = 1$.)` },
        { type: 'p', text: r`**2.** $E(X) = -2\times\frac{1}{2} + 0\times\frac{1}{3} + 4\times\frac{1}{6} = -1 + \frac{2}{3} = -\frac{1}{3} \approx -0{,}33$ €. En répétant le jeu un grand nombre de fois, le joueur perd en moyenne environ 0,33 € par partie.` },
        { type: 'p', text: r`**3.** $E(X)<0$ : le jeu est **défavorable** au joueur.` },
      ],
    },
    {
      id: 'lancers-francs',
      title: 'Trois lancers francs',
      difficulty: 2,
      duration: 15,
      tags: ['arbre', 'indépendance'],
      statement: [
        { type: 'p', text: r`Une basketteuse réussit chaque lancer franc avec la probabilité $0{,}7$, indépendamment des autres. Elle tire trois lancers. Calculer la probabilité de réussir : (a) les trois ; (b) aucun ; (c) au moins un ; (d) exactement deux. Vérifier que la somme des probabilités de tous les cas ($0$, $1$, $2$, $3$ réussites) vaut 1.` },
      ],
      hints: ['Pour « exactement deux », il y a 3 chemins : RRE, RER, ERR.'],
      solution: [
        { type: 'p', text: r`(a) $0{,}7^3 = 0{,}343$. (b) $0{,}3^3 = 0{,}027$. (c) $1 - 0{,}027 = 0{,}973$. (d) 3 chemins de probabilité $0{,}7^2\times0{,}3 = 0{,}147$ chacun : $3\times0{,}147 = 0{,}441$.` },
        { type: 'p', text: r`Exactement une réussite : $3\times0{,}7\times0{,}3^2 = 3\times0{,}063 = 0{,}189$. Somme : $0{,}027+0{,}189+0{,}441+0{,}343 = 1$. ✓` },
      ],
    },
  ],

  // =========================================================================
  representations: [
    {
      type: 'widget',
      id: 'probability-tree',
      props: { pA: 0.01, pBsachantA: 0.99, pBsachantNonA: 0.05 },
      title: 'Dépistage : arbre pondéré interactif',
      caption: 'A = « malade », B = « test positif ». Fais varier la prévalence pour voir comment $P_B(A)$ change : un test positif est bien plus fiable quand la maladie est fréquente.',
    },
    { type: 'svg', svg: naturalFrequencies(), caption: 'Fréquences naturelles : 99 vrais positifs contre 495 faux positifs.', maxWidth: 560 },
    {
      type: 'widget',
      id: 'random-variable',
      props: { values: [-2, 0, 4], probs: [0.5, 0.3333, 0.1667] },
      title: 'Loi de probabilité du jeu de dé',
      caption: 'Gain net $X$ : −2, 0 ou 4 avec probabilités 1/2, 1/3, 1/6. Lance des simulations et compare la moyenne observée à $E(X) \\approx -0{,}33$.',
    },
    { type: 'svg', svg: fluctuation(), caption: 'Intervalles de fluctuation à 95 % : plus $n$ est grand, plus ils se resserrent.', maxWidth: 560 },
    {
      type: 'widget',
      id: 'function-plotter',
      props: { expressions: ['1/sqrt(x)'], xMin: 0, xMax: 400, yMin: 0, yMax: 0.3, editable: true },
      title: 'Demi-largeur de l’intervalle de fluctuation',
      caption: 'La courbe $y = \\frac{1}{\\sqrt{n}}$ donne la demi-largeur : à $n=100$ elle vaut 0,1 ; à $n=400$, 0,05. Il faut **quadrupler** l’échantillon pour diviser la marge par 2.',
    },
    {
      type: 'qcm',
      questions: [
        { question: r`$P(A)=0{,}3$, $P(B)=0{,}5$, $P(A\cap B)=0{,}1$. Alors $P(A\cup B)$ vaut…`, choices: ['$0{,}8$', '$0{,}7$', '$0{,}9$', '$0{,}15$'], answer: 1, explanation: r`$0{,}3+0{,}5-0{,}1 = 0{,}7$.` },
        { question: r`Avec les mêmes données, $P_A(B)$ vaut…`, choices: ['$\\frac{1}{3}$', '$\\frac{1}{5}$', '$0{,}1$', '$\\frac{3}{5}$'], answer: 0, explanation: r`$\frac{0{,}1}{0{,}3} = \frac{1}{3}$.` },
        { question: 'Dans un arbre pondéré, la somme des probabilités des branches issues d’un même nœud vaut…', choices: ['0', '1', 'la probabilité du nœud', '2'], answer: 1, explanation: 'On a envisagé tous les cas possibles à cette étape.' },
        { question: r`$P(A)=0{,}5$, $P_A(B)=0{,}4$. Alors $P(A\cap B)$ vaut…`, choices: ['$0{,}9$', '$0{,}1$', '$0{,}2$', '$0{,}8$'], answer: 2, explanation: r`$P(A\cap B)=P(A)\times P_A(B)=0{,}2$.` },
        { question: 'On lance deux dés équilibrés. La probabilité d’obtenir un double (deux faces identiques) est…', choices: [r`$\frac{1}{36}$`, r`$\frac{1}{6}$`, r`$\frac{1}{12}$`, r`$\frac{1}{3}$`], answer: 1, explanation: r`6 doubles sur 36 couples : $\frac{6}{36}=\frac{1}{6}$.` },
        { question: 'Les événements $A$ et $B$ sont indépendants si…', choices: [r`$A\cap B=\varnothing$`, r`$P(A\cap B)=P(A)+P(B)$`, r`$P(A\cap B)=P(A)\times P(B)$`, r`$P(A)=P(B)$`], answer: 2, explanation: 'C’est la définition. « Incompatibles » est une autre notion.' },
        { question: 'Un test positif signifie que la probabilité d’être malade dépend…', choices: ['seulement de la fiabilité du test', 'de la fiabilité du test et de la fréquence de la maladie', 'uniquement de la fréquence de la maladie', 'ni de l’un ni de l’autre'], answer: 1, explanation: 'Plus la maladie est rare, plus la proportion de faux positifs parmi les positifs est grande.' },
        { question: r`Intervalle de fluctuation pour $p=0{,}5$ et $n=900$ :`, choices: [r`$[0{,}4\ ;\ 0{,}6]$`, r`$[0{,}467\ ;\ 0{,}533]$`, r`$[0{,}45\ ;\ 0{,}55]$`, r`$[0{,}499\ ;\ 0{,}501]$`], answer: 1, explanation: r`$\frac{1}{\sqrt{900}}=\frac{1}{30}\approx0{,}033$, donc $[0{,}467\ ;\ 0{,}533]$.` },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: r`$P_A(B) = P_B(A)$ pour tous événements $A$ et $B$ de probabilités non nulles.`, answer: false, explanation: r`Les dénominateurs sont différents : $P(A)$ et $P(B)$.` },
        { text: 'Dans un arbre, on multiplie les probabilités le long d’un chemin.', answer: true, explanation: r`$P(A\cap B)=P(A)\times P_A(B)$.` },
        { text: 'Dans un arbre, on additionne les probabilités des chemins qui mènent à un même événement.', answer: true, explanation: 'Ce sont des événements incompatibles : formule des probabilités totales.' },
        { text: 'Deux événements incompatibles de probabilités non nulles sont toujours indépendants.', answer: false, explanation: r`Si $A \cap B = \varnothing$ alors $P(A\cap B) = 0 \neq P(A)P(B)$ : ils sont même **dépendants**.` },
        { text: 'Si on obtient 5 Piles de suite, la prochaine fois Face est plus probable.', answer: false, explanation: 'Les lancers sont indépendants : la pièce n’a pas de mémoire.' },
        { text: 'Deux simulations de 1 000 lancers donnent exactement la même fréquence.', answer: false, explanation: 'C’est la fluctuation d’échantillonnage.' },
        { text: 'Un test fiable à 99 % garantit qu’une personne positive est malade avec une probabilité de 99 %.', answer: false, explanation: 'Cela dépend de la prévalence : dans l’exemple du cours, la probabilité n’est que d’environ 1/6.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter le cours',
      text: r`La probabilité de $B$ sachant $A$ est $P_A(B) = \dfrac{P(A \cap B)}{P(A)}$. Dans un arbre pondéré, on {{multiplie}} le long d’un chemin et on {{additionne|ajoute}} les chemins qui mènent au même événement. La somme des probabilités des branches issues d’un nœud vaut {{1}}. Deux événements sont {{indépendants|independants}} lorsque $P(A\cap B) = P(A)\times P(B)$. La fréquence observée varie d’un échantillon à l’autre : c’est la {{fluctuation}} d’échantillonnage.`,
    },
    {
      type: 'matching',
      title: 'Associer expression et signification',
      pairs: [
        { left: r`$\overline{A}$`, right: 'A n’est pas réalisé' },
        { left: r`$A\cap B$`, right: 'A et B sont réalisés' },
        { left: r`$A\cup B$`, right: 'A ou B (ou les deux) est réalisé' },
        { left: r`$P_A(B)$`, right: 'probabilité de B sachant que A est réalisé' },
        { left: r`$P(A)\times P(B) = P(A\cap B)$`, right: 'A et B indépendants' },
      ],
    },
    {
      type: 'ordering',
      title: 'Méthode : résoudre un problème avec un arbre',
      items: ['Définir les événements avec des lettres', 'Traduire les données de l’énoncé en probabilités (conditionnelles ou non)', 'Construire l’arbre pondéré en vérifiant que chaque nœud somme à 1', 'Calculer les probabilités des chemins par multiplication', 'Additionner les chemins utiles pour obtenir les probabilités totales', 'Calculer la probabilité conditionnelle demandée par un quotient'],
    },
    {
      type: 'reveal',
      title: 'Un test négatif est-il aussi trompeur qu’un test positif ?',
      content: [
        { type: 'p', text: r`Non. Dans l’exemple du cours, $P_{\overline{T}}(\overline{M}) = \dfrac{0{,}9405}{0{,}9406} \approx 0{,}9999$ : un test négatif est presque certain d’indiquer une personne saine. C’est le test **positif** qui est difficile à interpréter quand la maladie est rare.` },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Probabilité de l’événement contraire', back: r`$P(\overline{A}) = 1 - P(A)$` },
        { front: 'Probabilité d’une réunion', back: r`$P(A\cup B) = P(A)+P(B)-P(A\cap B)$` },
        { front: 'Probabilité conditionnelle', back: r`$P_A(B) = \dfrac{P(A\cap B)}{P(A)}$` },
        { front: 'Formule de multiplication', back: r`$P(A\cap B) = P(A)\times P_A(B)$` },
        { front: 'Probabilités totales', back: r`$P(B) = P(A\cap B) + P(\overline{A}\cap B)$` },
        { front: 'Indépendance de $A$ et $B$', back: r`$P(A\cap B) = P(A)\times P(B)$, soit $P_A(B)=P(B)$.` },
        { front: 'Règle des nœuds', back: 'La somme des probabilités des branches issues d’un même nœud vaut 1.' },
        { front: 'Intervalle de fluctuation à 95 %', back: r`$\left[p-\frac{1}{\sqrt{n}}\ ;\ p+\frac{1}{\sqrt{n}}\right]$, pour $n\geq25$ et $0{,}2\leq p\leq0{,}8$.` },
        { front: 'Pourquoi un test positif est-il parfois peu informatif ?', back: 'Si la maladie est rare, les faux positifs (parmi la grande majorité de sains) sont plus nombreux que les vrais positifs.' },
        { front: 'Tirages avec ou sans remise', back: 'Avec remise : tirages indépendants. Sans remise : dépendants, la composition de l’urne change.' },
      ],
    },
  ],
}

export default chapter
