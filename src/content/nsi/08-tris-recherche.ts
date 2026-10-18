import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'tris-recherche',
  subject: 'nsi',
  order: 8,
  title: 'Parcours, tris et recherche dichotomique',
  theme: 'Algorithmique',
  summary:
    'Parcours séquentiel d’un tableau (maximum, moyenne, occurrences), tris par sélection et par insertion (invariants, terminaison, coût quadratique) et recherche dichotomique dans un tableau trié (correction, coût logarithmique).',
  duration: '4 semaines',
  objectives: [
    'Écrire un algorithme de recherche d’une occurrence, d’un extremum, de calcul d’une moyenne par parcours séquentiel ; savoir que son coût est linéaire.',
    'Écrire un algorithme de tri par sélection et de tri par insertion.',
    'Décrire un invariant de boucle qui prouve la correction des tris par insertion et par sélection.',
    'Justifier la terminaison de ces algorithmes ; montrer que leur coût est quadratique dans le pire cas.',
    'Écrire un algorithme de recherche dichotomique dans un tableau trié.',
    'Montrer la terminaison de la recherche dichotomique à l’aide d’un variant de boucle ; connaître son coût logarithmique.',
  ],
  keywords: [
    'parcours séquentiel',
    'maximum',
    'moyenne',
    'occurrence',
    'tri par sélection',
    'tri par insertion',
    'invariant de boucle',
    'variant',
    'terminaison',
    'correction',
    'complexité',
    'coût linéaire',
    'coût quadratique',
    'dichotomie',
    'logarithme',
  ],

  // ===================================================================
  // FICHE
  // ===================================================================
  fiche: [
    { type: 'h2', text: '1. Parcours séquentiel — coût linéaire $O(n)$' },
    {
      type: 'code',
      lang: 'python',
      code: `def maximum(t):            # t non vide
    m = t[0]
    for x in t:
        if x > m:
            m = x
    return m

def moyenne(t):            # t non vide
    s = 0
    for x in t:
        s = s + x
    return s / len(t)

def nb_occurrences(t, v):
    nb = 0
    for x in t:
        if x == v:
            nb = nb + 1
    return nb`,
    },
    { type: 'p', text: 'Chaque élément est examiné une fois : pour un tableau de taille $n$, le nombre d’opérations est proportionnel à $n$.' },
    { type: 'h2', text: '2. Tris — coût quadratique $O(n^2)$' },
    {
      type: 'table',
      headers: ['', 'Tri par sélection', 'Tri par insertion'],
      rows: [
        ['Principe', 'on cherche le minimum de la partie non triée et on l’échange avec le 1er élément non trié', 'on insère chaque élément à sa place dans la partie gauche déjà triée'],
        ['Invariant (après le tour $i$)', '`t[0..i]` est trié et contient les $i+1$ plus petits éléments, à leur place définitive', '`t[0..i]` est trié (il contient les $i+1$ premiers éléments initiaux)'],
        ['Comparaisons', 'toujours $\\frac{n(n-1)}{2}$', 'pire cas (ordre décroissant) $\\frac{n(n-1)}{2}$ ; meilleur cas (déjà trié) $n-1$'],
        ['Coût', 'quadratique dans tous les cas', 'quadratique dans le pire cas, linéaire si déjà trié'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Prouver un algorithme',
      content: [
        {
          type: 'list',
          items: [
            '**Terminaison** : boucles `for` → terminent ; boucle `while` → un **variant** (entier positif strictement décroissant).',
            '**Correction** : un **invariant** de boucle, vrai avant la boucle, conservé par chaque tour ; à la sortie il donne le résultat.',
            'Coût quadratique : doubler $n$ multiplie le temps par environ **4**.',
          ],
        },
      ],
    },
    { type: 'h2', text: '3. Recherche dichotomique — coût logarithmique' },
    {
      type: 'code',
      lang: 'python',
      code: `def recherche_dicho(t, v):   # t TRIÉ dans l'ordre croissant
    g, d = 0, len(t) - 1
    while g <= d:
        m = (g + d) // 2
        if t[m] == v:
            return m
        elif t[m] < v:
            g = m + 1
        else:
            d = m - 1
    return -1                   # v absent`,
    },
    {
      type: 'list',
      items: [
        '**Précondition** : le tableau est **trié**.',
        '**Variant** : $d - g + 1$ (taille de la zone de recherche), au moins divisée par 2 à chaque tour.',
        '**Invariant** : si `v` est dans `t`, il est dans `t[g..d]`.',
        'Nombre de tours au plus $\\lfloor \\log_2 n \\rfloor + 1$ : environ **20** pour $n = 10^6$ (contre $10^6$ en séquentiel).',
      ],
    },
    {
      type: 'table',
      headers: ['$n$', 'séquentiel (pire cas)', 'dichotomie (pire cas)', 'tri sélection ($\\frac{n(n-1)}{2}$)'],
      rows: [
        ['10', '10', '4', '45'],
        ['1 000', '1 000', '10', '499 500'],
        ['1 000 000', '1 000 000', '20', '≈ $5 \\times 10^{11}$'],
      ],
    },
  ],

  // ===================================================================
  // COURS
  // ===================================================================
  cours: [
    { type: 'h2', text: 'Introduction' },
    {
      type: 'p',
      text: 'Rechercher une information dans une grande quantité de données et trier ces données sont deux des tâches les plus fréquentes en informatique : moteurs de recherche, annuaires, bases de données, classements… Ce chapitre étudie les algorithmes fondamentaux sur les **tableaux** (listes Python), en se posant pour chacun trois questions : **termine-t-il ?** **est-il correct ?** **combien coûte-t-il ?**',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Coût (complexité en temps)',
      content: [
        {
          type: 'p',
          text: 'Le **coût** d’un algorithme est le nombre d’opérations élémentaires (comparaisons, affectations…) qu’il effectue, exprimé en fonction de la taille $n$ des données. On s’intéresse surtout au **pire cas** et à **l’ordre de grandeur** quand $n$ devient grand.',
        },
        {
          type: 'table',
          headers: ['Coût', 'Notation', 'Si $n$ double…', 'Exemple'],
          rows: [
            ['constant', '$O(1)$', 'temps inchangé', 'accéder à `t[i]`'],
            ['logarithmique', '$O(\\log n)$', '+ 1 étape', 'recherche dichotomique'],
            ['linéaire', '$O(n)$', 'temps × 2', 'parcours séquentiel'],
            ['quadratique', '$O(n^2)$', 'temps × 4', 'tris par sélection et insertion'],
          ],
        },
      ],
    },

    // ----- Parcours séquentiel
    { type: 'h2', text: '1. Parcours séquentiel d’un tableau' },
    {
      type: 'p',
      text: 'Un **parcours séquentiel** examine les éléments d’un tableau **un par un**, du premier au dernier. On peut parcourir les **valeurs** (`for x in t`) ou les **indices** (`for i in range(len(t))`) quand on a besoin de la position.',
    },
    { type: 'h3', text: 'Recherche d’une occurrence' },
    {
      type: 'code',
      lang: 'python',
      code: `def appartient(t, v):
    """Renvoie True si v est un élément de t, False sinon."""
    for x in t:
        if x == v:
            return True        # on s'arrête dès qu'on l'a trouvé
    return False               # on a tout parcouru sans le trouver

def indice(t, v):
    """Renvoie l'indice de la première occurrence de v dans t, ou -1 si absent."""
    for i in range(len(t)):
        if t[i] == v:
            return i
    return -1`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Erreur fréquente',
      content: [
        {
          type: 'code',
          lang: 'python',
          code: `def appartient_faux(t, v):
    for x in t:
        if x == v:
            return True
        else:
            return False   # ERREUR : on s'arrête après le 1er élément !`,
        },
        { type: 'p', text: 'On ne peut conclure « absent » qu’**après** avoir examiné tous les éléments : le `return False` doit être placé **après** la boucle.' },
      ],
    },
    { type: 'h3', text: 'Recherche d’un extremum' },
    {
      type: 'code',
      lang: 'python',
      code: `def indice_du_max(t):
    """Renvoie l'indice du plus grand élément de t (t non vide)."""
    assert len(t) > 0
    i_max = 0
    for i in range(1, len(t)):
        if t[i] > t[i_max]:
            i_max = i
    return i_max

print(indice_du_max([4, 9, 2, 9, 1]))   # 1 (première occurrence du maximum)`,
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Invariant du calcul du maximum',
      content: [
        {
          type: 'p',
          text: 'Après le tour d’indice $i$, `t[i_max]` est le maximum de `t[0..i]`. C’est vrai au départ ($i = 0$ : `t[0]` est le maximum de `t[0..0]`), et chaque tour le conserve (si `t[i]` dépasse l’ancien maximum, il devient le nouveau). À la fin, $i = n-1$ : `t[i_max]` est le maximum du tableau entier.',
        },
      ],
    },
    { type: 'h3', text: 'Calcul d’une moyenne, comptage' },
    {
      type: 'code',
      lang: 'python',
      code: `def moyenne(t):
    assert len(t) > 0, "moyenne d'un tableau vide"
    somme = 0
    for x in t:
        somme = somme + x
    return somme / len(t)

def nb_occurrences(t, v):
    nb = 0
    for x in t:
        if x == v:
            nb = nb + 1
    return nb

notes = [12, 8, 15, 12, 17]
print(moyenne(notes))            # 12.8
print(nb_occurrences(notes, 12)) # 2`,
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Coût linéaire',
      content: [
        {
          type: 'p',
          text: 'Ces algorithmes effectuent un nombre d’opérations **proportionnel à $n$** (une comparaison ou une addition par élément) : leur coût est **linéaire**. Pour la recherche d’une occurrence, le pire cas est celui où l’élément est absent ou en dernière position : $n$ comparaisons.',
        },
      ],
    },

    // ----- Tri par sélection
    { type: 'h2', text: '2. Le tri par sélection' },
    {
      type: 'p',
      text: '**Principe** : on cherche le **plus petit** élément du tableau et on l’échange avec le premier ; puis on cherche le plus petit élément parmi les suivants et on l’échange avec le deuxième, et ainsi de suite. La partie gauche, triée, grandit d’un élément à chaque étape.',
    },
    {
      type: 'code',
      lang: 'python',
      code: `def tri_selection(t):
    """Trie le tableau t dans l'ordre croissant (en place)."""
    n = len(t)
    for i in range(n - 1):
        # recherche de l'indice du minimum de t[i..n-1]
        i_min = i
        for j in range(i + 1, n):
            if t[j] < t[i_min]:
                i_min = j
        # échange de t[i] et t[i_min]
        t[i], t[i_min] = t[i_min], t[i]

t = [5, 2, 8, 1, 9]
tri_selection(t)
print(t)   # [1, 2, 5, 8, 9]`,
      caption: 'Le tri est fait « en place » : le tableau est modifié, la fonction ne renvoie rien.',
    },
    {
      type: 'table',
      headers: ['Étape', 'minimum de la partie non triée', 'Tableau après échange'],
      rows: [
        ['départ', '—', '[5, 2, 8, 1, 9]'],
        ['$i = 0$', '1 (indice 3)', '[**1**, 2, 8, 5, 9]'],
        ['$i = 1$', '2 (indice 1)', '[**1, 2**, 8, 5, 9]'],
        ['$i = 2$', '5 (indice 3)', '[**1, 2, 5**, 8, 9]'],
        ['$i = 3$', '8 (indice 3)', '[**1, 2, 5, 8**, 9]'],
      ],
      caption: 'En gras : la partie triée, définitive. Le dernier élément est automatiquement à sa place.',
    },
    {
      type: 'svg',
      svg: `<svg viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <rect x="20" y="40" width="200" height="40" fill="hsl(142 71% 45%)" fill-opacity="0.18" stroke="hsl(142 71% 45%)"/>
  <text x="120" y="65" text-anchor="middle" fill="currentColor">trié, définitif</text>
  <rect x="220" y="40" width="260" height="40" fill="none" stroke="currentColor"/>
  <text x="350" y="65" text-anchor="middle" fill="currentColor">non trié (tous ≥ partie gauche)</text>
  <text x="20" y="30" fill="currentColor" font-size="11">0</text>
  <text x="222" y="30" fill="currentColor" font-size="11">i</text>
  <text x="470" y="30" fill="currentColor" font-size="11">n−1</text>
  <rect x="380" y="40" width="30" height="40" fill="hsl(217 91% 60%)" fill-opacity="0.3" stroke="hsl(217 91% 60%)"/>
  <text x="395" y="100" text-anchor="middle" fill="hsl(217 91% 60%)" font-size="12">min</text>
  <path d="M395 108 Q 310 150 235 108" fill="none" stroke="hsl(217 91% 60%)"/>
  <polygon points="231,112 233,102 241,108" fill="hsl(217 91% 60%)"/>
  <text x="310" y="145" text-anchor="middle" fill="currentColor" font-size="11">échange avec t[i]</text>
</svg>`,
      caption: 'Tri par sélection : état du tableau au début du tour $i$.',
      maxWidth: 520,
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Terminaison et correction du tri par sélection',
      content: [
        {
          type: 'p',
          text: '**Terminaison** : l’algorithme n’utilise que des boucles `for` sur des `range` finis ; il termine donc.',
        },
        {
          type: 'p',
          text: '**Invariant** : « à la fin du tour $i$, le sous-tableau `t[0..i]` est trié et contient les $i+1$ plus petits éléments du tableau ; les éléments de `t[i+1..n-1]` leur sont tous supérieurs ou égaux. »',
        },
        {
          type: 'list',
          items: [
            '*Initialisation* : au tour $i = 0$, on place en position 0 le minimum de tout le tableau : `t[0..0]` est trié et contient le plus petit élément.',
            '*Conservation* : si l’invariant est vrai à la fin du tour $i-1$, le tour $i$ place en position $i$ le minimum de `t[i..n-1]`, qui est supérieur ou égal aux éléments de `t[0..i-1]` et inférieur ou égal aux suivants. Donc `t[0..i]` est trié et contient les $i+1$ plus petits éléments.',
            '*Conclusion* : après le dernier tour ($i = n-2$), `t[0..n-2]` est trié et contient les $n-1$ plus petits éléments ; le dernier élément est le plus grand. Le tableau entier est trié.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Coût du tri par sélection',
      content: [
        {
          type: 'p',
          text: 'Au tour $i$, la boucle interne effectue $n - 1 - i$ comparaisons. Le nombre total de comparaisons est donc, **quel que soit le tableau** :',
        },
        { type: 'math', tex: '(n-1) + (n-2) + \\dots + 2 + 1 = \\frac{n(n-1)}{2}' },
        {
          type: 'p',
          text: 'Pour $n = 5$ : $\\frac{5 \\times 4}{2} = 10$ comparaisons ; pour $n = 1000$ : $499\\,500$. Ce nombre est de l’ordre de $\\frac{n^2}{2}$ : le coût est **quadratique**. Le nombre d’échanges, lui, est au plus $n - 1$.',
        },
      ],
    },

    // ----- Tri par insertion
    { type: 'h2', text: '3. Le tri par insertion' },
    {
      type: 'p',
      text: '**Principe** : c’est la méthode du joueur de cartes qui trie sa main. La partie gauche du tableau est déjà triée ; on prend l’élément suivant et on l’**insère à sa place** dans la partie triée, en **décalant vers la droite** les éléments plus grands.',
    },
    {
      type: 'code',
      lang: 'python',
      code: `def tri_insertion(t):
    """Trie le tableau t dans l'ordre croissant (en place)."""
    for i in range(1, len(t)):
        cle = t[i]                 # élément à insérer
        j = i - 1
        # décalage vers la droite des éléments plus grands que cle
        while j >= 0 and t[j] > cle:
            t[j + 1] = t[j]
            j = j - 1
        t[j + 1] = cle             # insertion à la place libérée

t = [4, 3, 7, 1, 5]
tri_insertion(t)
print(t)   # [1, 3, 4, 5, 7]`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'L’ordre des conditions compte',
      content: [
        {
          type: 'p',
          text: 'Dans `while j >= 0 and t[j] > cle`, le test `j >= 0` doit être écrit **en premier** : grâce à l’évaluation paresseuse de `and`, `t[j]` n’est pas évalué quand $j = -1$. (En Python, `t[-1]` ne provoquerait pas d’erreur mais désignerait le dernier élément : le tri serait faux.)',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Tour', 'Élément inséré', 'Tableau après le tour', 'Comparaisons'],
      rows: [
        ['départ', '—', '[**4**, 3, 7, 1, 5]', '—'],
        ['$i = 1$', '3', '[**3, 4**, 7, 1, 5]', '1'],
        ['$i = 2$', '7', '[**3, 4, 7**, 1, 5]', '1'],
        ['$i = 3$', '1', '[**1, 3, 4, 7**, 5]', '3'],
        ['$i = 4$', '5', '[**1, 3, 4, 5, 7**]', '2'],
      ],
      caption: 'En gras : la partie triée (pas encore définitive : un élément plus petit peut encore s’y insérer).',
    },
    {
      type: 'svg',
      svg: `<svg viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <g fill="none" stroke="currentColor">
    <rect x="40" y="40" width="50" height="40"/><rect x="90" y="40" width="50" height="40"/>
    <rect x="140" y="40" width="50" height="40"/><rect x="190" y="40" width="50" height="40"/>
    <rect x="240" y="40" width="50" height="40"/><rect x="290" y="40" width="50" height="40"/>
  </g>
  <rect x="40" y="40" width="200" height="40" fill="hsl(142 71% 45%)" fill-opacity="0.15"/>
  <rect x="240" y="40" width="50" height="40" fill="hsl(217 91% 60%)" fill-opacity="0.3"/>
  <g fill="currentColor" text-anchor="middle">
    <text x="65" y="65">2</text><text x="115" y="65">5</text><text x="165" y="65">8</text>
    <text x="215" y="65">9</text><text x="265" y="65">6</text><text x="315" y="65">3</text>
  </g>
  <text x="140" y="30" text-anchor="middle" fill="currentColor" font-size="11">partie triée</text>
  <text x="265" y="30" text-anchor="middle" fill="hsl(217 91% 60%)" font-size="11">cle = 6</text>
  <path d="M265 82 Q 215 130 140 86" fill="none" stroke="hsl(217 91% 60%)"/>
  <polygon points="137,90 140,80 146,88" fill="hsl(217 91% 60%)"/>
  <text x="200" y="135" text-anchor="middle" fill="currentColor" font-size="11">9 et 8 décalés d’une case à droite, 6 inséré après 5</text>
  <text x="400" y="65" fill="currentColor" font-size="12">→ [2, 5, 6, 8, 9, 3]</text>
</svg>`,
      caption: 'Tri par insertion : insertion de l’élément d’indice 4 dans la partie triée `t[0..3]`.',
      maxWidth: 520,
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Terminaison et correction du tri par insertion',
      content: [
        {
          type: 'p',
          text: '**Terminaison** : la boucle externe est une boucle `for`. Pour la boucle interne `while`, $j + 1$ est un **variant** : c’est un entier, positif tant que la boucle tourne (car $j \\geqslant 0$), et il diminue de 1 à chaque tour. La boucle interne termine donc (au plus $i$ tours).',
        },
        {
          type: 'p',
          text: '**Invariant** : « au début du tour $i$, le sous-tableau `t[0..i-1]` est trié et contient les mêmes éléments que `t[0..i-1]` au départ. »',
        },
        {
          type: 'list',
          items: [
            '*Initialisation* : pour $i = 1$, `t[0..0]` contient un seul élément : il est trié.',
            '*Conservation* : le tour $i$ décale d’un cran vers la droite les éléments de `t[0..i-1]` strictement supérieurs à `cle`, puis place `cle` juste après le dernier élément inférieur ou égal. `t[0..i]` est alors trié.',
            '*Conclusion* : la boucle s’arrête après le tour $i = n-1$ ; l’invariant au « tour $n$ » dit que `t[0..n-1]`, c’est-à-dire le tableau entier, est trié.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Coût du tri par insertion',
      content: [
        {
          type: 'list',
          items: [
            '**Pire cas** : tableau trié dans l’ordre **décroissant**. Chaque élément doit remonter jusqu’au début : $i$ comparaisons au tour $i$, soit $1 + 2 + \\dots + (n-1) = \\frac{n(n-1)}{2}$ comparaisons : coût **quadratique**.',
            '**Meilleur cas** : tableau **déjà trié**. Une seule comparaison par tour, soit $n - 1$ comparaisons : coût **linéaire**.',
            'Le tri par insertion est donc efficace sur des tableaux **presque triés**.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Et en pratique ?',
      content: [
        {
          type: 'p',
          text: 'Python dispose de `sorted(t)` (renvoie une nouvelle liste triée) et de `t.sort()` (trie en place). Ils utilisent l’algorithme **Timsort**, de coût $O(n \\log n)$ dans le pire cas, bien plus rapide que nos tris quadratiques pour de grands tableaux. Il existe d’autres tris efficaces (tri fusion, tri rapide) étudiés en Terminale.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Mesurer le caractère quadratique',
      content: [
        {
          type: 'code',
          lang: 'python',
          code: `import time
from random import randint

for n in [1000, 2000, 4000]:
    t = [randint(0, 10**6) for _ in range(n)]
    debut = time.time()
    tri_selection(t)
    print(n, round(time.time() - debut, 3), "s")
# Les durées sont environ multipliées par 4 quand n double.`,
        },
      ],
    },

    // ----- Dichotomie
    { type: 'h2', text: '4. La recherche dichotomique' },
    {
      type: 'p',
      text: 'Dans un tableau **trié**, on peut chercher beaucoup plus vite qu’en parcourant tous les éléments. C’est le principe du jeu « plus petit / plus grand » ou de la recherche d’un mot dans un dictionnaire : on regarde **au milieu**, et selon le résultat on élimine **la moitié** de la zone de recherche.',
    },
    {
      type: 'steps',
      items: [
        { title: 'Initialiser', text: 'La zone de recherche est tout le tableau : `g = 0` et `d = len(t) - 1`.' },
        { title: 'Regarder au milieu', text: 'Tant que la zone n’est pas vide (`g <= d`), calculer `m = (g + d) // 2`.' },
        { title: 'Comparer', text: 'Si `t[m] == v`, on a trouvé : renvoyer `m`. Si `t[m] < v`, `v` ne peut être qu’à droite : `g = m + 1`. Sinon, il ne peut être qu’à gauche : `d = m - 1`.' },
        { title: 'Conclure', text: 'Si la zone devient vide (`g > d`), `v` n’est pas dans le tableau : renvoyer `-1` (ou `None`).' },
      ],
    },
    {
      type: 'code',
      lang: 'python',
      code: `def recherche_dichotomique(t, v):
    """Renvoie un indice de v dans le tableau t, ou -1 si v est absent.
    Précondition : t est trié dans l'ordre croissant.
    """
    g = 0
    d = len(t) - 1
    while g <= d:
        m = (g + d) // 2
        if t[m] == v:
            return m
        elif t[m] < v:
            g = m + 1
        else:
            d = m - 1
    return -1

t = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(recherche_dichotomique(t, 23))   # 5
print(recherche_dichotomique(t, 40))   # -1`,
    },
    {
      type: 'table',
      headers: ['Tour', '`g`', '`d`', '`m`', '`t[m]`', 'Décision'],
      rows: [
        ['1', '0', '9', '4', '16', '16 < 23 → `g = 5`'],
        ['2', '5', '9', '7', '56', '56 > 23 → `d = 6`'],
        ['3', '5', '6', '5', '23', 'trouvé, renvoie 5'],
      ],
      caption: 'Recherche de 23 : 3 tours au lieu de 6 comparaisons en séquentiel.',
    },
    {
      type: 'table',
      headers: ['Tour', '`g`', '`d`', '`m`', '`t[m]`', 'Décision'],
      rows: [
        ['1', '0', '9', '4', '16', '16 < 40 → `g = 5`'],
        ['2', '5', '9', '7', '56', '56 > 40 → `d = 6`'],
        ['3', '5', '6', '5', '23', '23 < 40 → `g = 6`'],
        ['4', '6', '6', '6', '38', '38 < 40 → `g = 7`'],
        ['fin', '7', '6', '', '', '`g > d` : renvoie -1'],
      ],
      caption: 'Recherche de 40 (absent) : 4 tours.',
    },
    {
      type: 'svg',
      svg: `<svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <g fill="none" stroke="currentColor">
    <rect x="20" y="20" width="480" height="30"/>
    <rect x="260" y="70" width="240" height="30"/>
    <rect x="260" y="120" width="96" height="30"/>
  </g>
  <rect x="212" y="20" width="48" height="30" fill="hsl(217 91% 60%)" fill-opacity="0.3"/>
  <rect x="356" y="70" width="48" height="30" fill="hsl(217 91% 60%)" fill-opacity="0.3"/>
  <rect x="260" y="120" width="48" height="30" fill="hsl(142 71% 45%)" fill-opacity="0.35"/>
  <rect x="20" y="70" width="240" height="30" fill="currentColor" fill-opacity="0.08"/>
  <rect x="20" y="120" width="240" height="30" fill="currentColor" fill-opacity="0.08"/>
  <rect x="356" y="120" width="144" height="30" fill="currentColor" fill-opacity="0.08"/>
  <g fill="currentColor" text-anchor="middle">
    <text x="236" y="40">16</text><text x="380" y="90">56</text><text x="284" y="140">23</text>
    <text x="140" y="90" font-size="11">éliminé</text>
    <text x="140" y="140" font-size="11">éliminé</text>
    <text x="428" y="140" font-size="11">éliminé</text>
  </g>
  <text x="20" y="14" fill="currentColor" font-size="11">tour 1 : 10 cases</text>
  <text x="262" y="64" fill="currentColor" font-size="11">tour 2 : 5 cases</text>
  <text x="262" y="114" fill="currentColor" font-size="11">tour 3 : 2 cases → trouvé</text>
  <text x="260" y="180" text-anchor="middle" fill="currentColor" font-size="11">À chaque tour, la zone de recherche est au moins divisée par 2.</text>
</svg>`,
      caption: 'Recherche de 23 dans un tableau trié de 10 éléments.',
      maxWidth: 560,
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Terminaison : un variant de boucle',
      content: [
        {
          type: 'p',
          text: 'La quantité $d - g + 1$ (nombre d’éléments de la zone de recherche) est un **entier**, **strictement positif** tant que la boucle tourne (car $g \\leqslant d$). À chaque tour sans succès, comme $g \\leqslant m \\leqslant d$ :',
        },
        {
          type: 'list',
          items: [
            'si `g = m + 1`, la nouvelle taille est $d - m < d - g + 1$ ;',
            'si `d = m - 1`, la nouvelle taille est $m - g < d - g + 1$.',
          ],
        },
        {
          type: 'p',
          text: 'Le variant décroît strictement (et en fait, il est au moins divisé par 2). Une suite d’entiers positifs strictement décroissante est finie : la boucle termine.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Correction : un invariant',
      content: [
        {
          type: 'p',
          text: '**Invariant** : « si `v` est présent dans `t`, alors il se trouve dans `t[g..d]` ». Il est vrai au départ (zone = tableau entier). Il est conservé : si `t[m] < v`, comme le tableau est trié, tous les éléments `t[g..m]` sont $< v$, donc `v` ne peut être que dans `t[m+1..d]` ; symétriquement si `t[m] > v`. Si la boucle s’arrête avec `g > d`, la zone est vide, donc `v` est absent : renvoyer `-1` est correct.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Coût logarithmique',
      content: [
        {
          type: 'p',
          text: 'Après $k$ tours, la zone contient au plus $\\frac{n}{2^k}$ éléments. La boucle s’arrête au plus tard quand cette taille passe sous 1, c’est-à-dire quand $2^k > n$. Le nombre de tours est donc au plus $\\lfloor \\log_2 n \\rfloor + 1$, où $\\log_2 n$ est le nombre $x$ tel que $2^x = n$.',
        },
        {
          type: 'table',
          headers: ['$n$', '$2^{10} = 1024$', '$10^6$', '$10^9$'],
          rows: [['Tours au plus (dichotomie)', '11', '20', '30']],
        },
        {
          type: 'p',
          text: 'Quand $n$ **double**, il suffit d’**un tour de plus**. C’est un coût **logarithmique**, incomparablement meilleur que le coût linéaire du parcours séquentiel. Contrepartie : le tableau doit être **trié**, et trier coûte plus cher qu’une recherche séquentielle. La dichotomie est rentable quand on effectue **de nombreuses recherches** dans le même tableau.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Pièges de la dichotomie',
      content: [
        {
          type: 'list',
          items: [
            'Écrire `while g < d` au lieu de `while g <= d` : la recherche échoue quand l’élément est dans la dernière case examinée (zone d’une seule case).',
            'Écrire `g = m` au lieu de `g = m + 1` : la zone peut ne plus diminuer (par exemple $g = 3$, $d = 4$, $m = 3$) et la boucle devient infinie.',
            'Utiliser `/` au lieu de `//` : `m` serait un flottant et `t[m]` provoquerait une `TypeError`.',
            'Appliquer la dichotomie à un tableau **non trié** : le résultat n’a aucun sens.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Un algorithme simple… et difficile à écrire',
      content: [
        {
          type: 'p',
          text: 'Dans *The Art of Computer Programming* (vol. 3), Donald Knuth rappelle que si la première recherche dichotomique a été publiée en 1946, la première version exempte de bogue n’est apparue qu’en 1962. Jon Bentley rapporte aussi qu’une grande majorité de programmeurs professionnels n’ont pas réussi à l’écrire correctement du premier coup. D’où l’intérêt des variants, invariants et tests de cas limites !',
        },
      ],
    },
  ],

  // ===================================================================
  // EXERCICES
  // ===================================================================
  exercices: [
    {
      id: 'tr-ex1',
      title: 'Minimum et indice du minimum',
      difficulty: 1,
      duration: 10,
      tags: ['parcours séquentiel', 'extremum'],
      statement: [
        { type: 'p', text: '1. Écrire une fonction `minimum(t)` qui renvoie le plus petit élément d’une liste non vide d’entiers, sans utiliser la fonction `min` de Python.' },
        { type: 'p', text: '2. Écrire une fonction `indice_min(t)` qui renvoie l’indice de la **dernière** occurrence du minimum.' },
        { type: 'p', text: '3. Quel est le nombre de comparaisons effectuées pour une liste de taille $n$ ?' },
      ],
      hints: ['Initialiser avec le premier élément, pas avec 0.', 'Pour la dernière occurrence, utiliser `<=` au lieu de `<`.'],
      solution: [
        {
          type: 'code',
          lang: 'python',
          code: `def minimum(t):
    assert len(t) > 0
    m = t[0]
    for x in t:
        if x < m:
            m = x
    return m

def indice_min(t):
    assert len(t) > 0
    i_min = 0
    for i in range(1, len(t)):
        if t[i] <= t[i_min]:     # <= : on retient la dernière occurrence
            i_min = i
    return i_min

assert minimum([4, -2, 7, -2]) == -2
assert indice_min([4, -2, 7, -2]) == 3
assert indice_min([5]) == 0`,
        },
        {
          type: 'p',
          text: '3. `indice_min` effectue une comparaison pour chaque indice de 1 à $n-1$ : $n-1$ comparaisons. (`minimum` en fait $n$, car il compare aussi `t[0]` à lui-même.) Le coût est **linéaire**.',
        },
      ],
    },
    {
      id: 'tr-ex2',
      title: 'Statistiques sur des notes',
      difficulty: 1,
      duration: 15,
      tags: ['parcours séquentiel', 'moyenne', 'occurrences'],
      statement: [
        { type: 'p', text: 'On dispose de la liste `notes = [12, 8, 15, 12, 17, 9, 12, 14]`.' },
        { type: 'p', text: '1. Écrire une fonction `moyenne(t)` et calculer la moyenne de `notes`.' },
        { type: 'p', text: '2. Écrire une fonction `nb_occurrences(t, v)` et l’utiliser pour compter les 12.' },
        { type: 'p', text: '3. Écrire une fonction `nb_au_dessus(t, seuil)` qui compte les notes **supérieures ou égales** au seuil. Combien de notes sont $\\geqslant 12$ ?' },
      ],
      hints: ['Somme des notes : 99.', 'Les trois fonctions suivent le même schéma : une variable accumulatrice et une boucle.'],
      solution: [
        {
          type: 'code',
          lang: 'python',
          code: `def moyenne(t):
    assert len(t) > 0
    s = 0
    for x in t:
        s = s + x
    return s / len(t)

def nb_occurrences(t, v):
    nb = 0
    for x in t:
        if x == v:
            nb = nb + 1
    return nb

def nb_au_dessus(t, seuil):
    nb = 0
    for x in t:
        if x >= seuil:
            nb = nb + 1
    return nb

notes = [12, 8, 15, 12, 17, 9, 12, 14]
print(moyenne(notes))            # 12.375
print(nb_occurrences(notes, 12)) # 3
print(nb_au_dessus(notes, 12))   # 6`,
        },
        {
          type: 'p',
          text: 'Somme : $12 + 8 + 15 + 12 + 17 + 9 + 12 + 14 = 99$, donc moyenne $= 99 / 8 = 12{,}375$. Trois notes valent 12. Les notes $\\geqslant 12$ sont 12, 15, 12, 17, 12, 14 : il y en a 6.',
        },
      ],
    },
    {
      id: 'tr-ex3',
      title: 'Tri par sélection à la main',
      difficulty: 1,
      duration: 10,
      tags: ['tri par sélection', 'trace'],
      statement: [
        { type: 'p', text: 'Appliquer le tri par sélection au tableau `[7, 3, 9, 1, 4, 2]`. Donner l’état du tableau après chaque tour de la boucle externe, puis le nombre total de comparaisons.' },
      ],
      hints: ['Au tour $i$, on cherche le minimum de `t[i..5]` et on l’échange avec `t[i]`.', 'Il y a $n - 1 = 5$ tours.'],
      solution: [
        {
          type: 'table',
          headers: ['Tour', 'Minimum de la partie non triée', 'Tableau'],
          rows: [
            ['départ', '—', '[7, 3, 9, 1, 4, 2]'],
            ['$i = 0$', '1 (indice 3) ↔ 7', '[1, 3, 9, 7, 4, 2]'],
            ['$i = 1$', '2 (indice 5) ↔ 3', '[1, 2, 9, 7, 4, 3]'],
            ['$i = 2$', '3 (indice 5) ↔ 9', '[1, 2, 3, 7, 4, 9]'],
            ['$i = 3$', '4 (indice 4) ↔ 7', '[1, 2, 3, 4, 7, 9]'],
            ['$i = 4$', '7 (indice 4), pas de changement', '[1, 2, 3, 4, 7, 9]'],
          ],
        },
        {
          type: 'p',
          text: 'Nombre de comparaisons : $5 + 4 + 3 + 2 + 1 = 15 = \\frac{6 \\times 5}{2}$. Remarque : le tableau est trié dès le tour $i = 3$, mais l’algorithme effectue quand même toutes ses comparaisons : le tri par sélection ne « voit » pas qu’un tableau est déjà trié.',
        },
      ],
    },
    {
      id: 'tr-ex4',
      title: 'Tri par insertion à la main',
      difficulty: 1,
      duration: 15,
      tags: ['tri par insertion', 'trace'],
      statement: [
        { type: 'p', text: '1. Appliquer le tri par insertion à `[6, 2, 5, 1, 8]` en indiquant le tableau après chaque tour et le nombre de comparaisons `t[j] > cle` effectuées.' },
        { type: 'p', text: '2. Combien de comparaisons pour `[1, 2, 3, 4, 5]` ? pour `[5, 4, 3, 2, 1]` ?' },
      ],
      hints: ['On compte une comparaison `t[j] > cle` chaque fois qu’elle est évaluée, y compris celle qui est fausse et arrête la boucle.', 'Si `j` devient -1, la comparaison `t[j] > cle` n’est pas évaluée.'],
      solution: [
        {
          type: 'table',
          headers: ['Tour', '`cle`', 'Tableau après le tour', 'Comparaisons'],
          rows: [
            ['$i = 1$', '2', '[2, 6, 5, 1, 8]', '1 (6 > 2, puis $j = -1$)'],
            ['$i = 2$', '5', '[2, 5, 6, 1, 8]', '2 (6 > 5 ; 2 > 5 faux)'],
            ['$i = 3$', '1', '[1, 2, 5, 6, 8]', '3 (6, 5, 2 > 1, puis $j = -1$)'],
            ['$i = 4$', '8', '[1, 2, 5, 6, 8]', '1 (6 > 8 faux)'],
          ],
        },
        { type: 'p', text: 'Total : $1 + 2 + 3 + 1 = 7$ comparaisons.' },
        {
          type: 'p',
          text: '2. Tableau déjà trié : une comparaison (fausse) par tour, soit $n - 1 = 4$ comparaisons (meilleur cas, linéaire). Tableau trié à l’envers : $1 + 2 + 3 + 4 = 10 = \\frac{5 \\times 4}{2}$ comparaisons (pire cas, quadratique).',
        },
      ],
    },
    {
      id: 'tr-ex5',
      title: 'Coût quadratique et temps d’exécution',
      difficulty: 2,
      duration: 15,
      tags: ['complexité'],
      statement: [
        { type: 'p', text: '1. Combien de comparaisons le tri par sélection effectue-t-il sur un tableau de 10 éléments ? de 100 ? de 1 000 ?' },
        { type: 'p', text: '2. Un ordinateur trie un tableau de 20 000 éléments par sélection en 8 secondes. Estimer le temps nécessaire pour 40 000 éléments, puis pour 200 000 éléments.' },
        { type: 'p', text: '3. Combien de tours, au plus, nécessite une recherche dichotomique dans un tableau trié de 200 000 éléments ?' },
      ],
      hints: ['$\\frac{n(n-1)}{2}$ comparaisons.', 'Si $n$ est multiplié par $k$, un coût quadratique est multiplié par environ $k^2$.', '$2^{17} = 131\\,072$ et $2^{18} = 262\\,144$.'],
      solution: [
        {
          type: 'p',
          text: '1. $\\frac{10 \\times 9}{2} = 45$ ; $\\frac{100 \\times 99}{2} = 4\\,950$ ; $\\frac{1000 \\times 999}{2} = 499\\,500$. Quand $n$ est multiplié par 10, le nombre de comparaisons est multiplié par environ 100.',
        },
        {
          type: 'p',
          text: '2. Le coût est quadratique : en multipliant $n$ par 2, le temps est multiplié par environ $2^2 = 4$, soit **32 s**. En multipliant $n$ par 10, il est multiplié par environ $10^2 = 100$, soit **800 s** (plus de 13 minutes).',
        },
        {
          type: 'p',
          text: '3. $2^{17} \\leqslant 200\\,000 < 2^{18}$, donc $\\lfloor \\log_2 200\\,000 \\rfloor = 17$ : au plus $17 + 1 = 18$ tours.',
        },
      ],
    },
    {
      id: 'tr-ex6',
      title: 'Dichotomie à la main',
      difficulty: 2,
      duration: 15,
      tags: ['dichotomie', 'trace'],
      statement: [
        { type: 'p', text: 'On considère le tableau trié `t = [3, 7, 11, 14, 19, 25, 31, 42, 50]` (indices 0 à 8).' },
        { type: 'p', text: '1. Dérouler la recherche dichotomique de 42 : donner `g`, `d`, `m` et `t[m]` à chaque tour.' },
        { type: 'p', text: '2. Même question pour 10.' },
        { type: 'p', text: '3. Combien de comparaisons `t[i] == v` aurait nécessité une recherche séquentielle de 42 ?' },
      ],
      hints: ['`m = (g + d) // 2`.', 'La recherche s’arrête quand `g > d`.'],
      solution: [
        {
          type: 'table',
          headers: ['Recherche de 42', '`g`', '`d`', '`m`', '`t[m]`', 'Décision'],
          rows: [
            ['tour 1', '0', '8', '4', '19', '19 < 42 → `g = 5`'],
            ['tour 2', '5', '8', '6', '31', '31 < 42 → `g = 7`'],
            ['tour 3', '7', '8', '7', '42', 'trouvé : renvoie 7'],
          ],
        },
        {
          type: 'table',
          headers: ['Recherche de 10', '`g`', '`d`', '`m`', '`t[m]`', 'Décision'],
          rows: [
            ['tour 1', '0', '8', '4', '19', '19 > 10 → `d = 3`'],
            ['tour 2', '0', '3', '1', '7', '7 < 10 → `g = 2`'],
            ['tour 3', '2', '3', '2', '11', '11 > 10 → `d = 1`'],
            ['fin', '2', '1', '', '', '`g > d` : renvoie -1'],
          ],
        },
        { type: 'p', text: '3. 42 est à l’indice 7 : une recherche séquentielle effectue 8 comparaisons, contre 3 tours pour la dichotomie.' },
      ],
    },
    {
      id: 'tr-ex7',
      title: 'Le tableau est-il trié ?',
      difficulty: 2,
      duration: 15,
      tags: ['parcours séquentiel', 'précondition'],
      statement: [
        { type: 'p', text: '1. Écrire une fonction `est_trie(t)` qui renvoie `True` si la liste `t` est triée dans l’ordre croissant. Quel est son coût ?' },
        { type: 'p', text: '2. Utiliser cette fonction pour vérifier la précondition de la recherche dichotomique par une assertion. Est-ce une bonne idée en termes de coût ?' },
      ],
      hints: ['Comparer chaque élément au suivant : attention au dernier indice.', 'Une liste vide ou à un élément est triée.'],
      solution: [
        {
          type: 'code',
          lang: 'python',
          code: `def est_trie(t):
    for i in range(len(t) - 1):
        if t[i] > t[i + 1]:
            return False
    return True

assert est_trie([1, 3, 3, 8]) == True
assert est_trie([1, 5, 2]) == False
assert est_trie([]) == True
assert est_trie([4]) == True

def recherche_dichotomique(t, v):
    assert est_trie(t), "le tableau doit être trié"
    g, d = 0, len(t) - 1
    while g <= d:
        m = (g + d) // 2
        if t[m] == v:
            return m
        elif t[m] < v:
            g = m + 1
        else:
            d = m - 1
    return -1`,
        },
        {
          type: 'p',
          text: '1. La boucle va jusqu’à `len(t) - 2` pour que `t[i + 1]` existe. Au pire, $n - 1$ comparaisons : coût **linéaire**.',
        },
        {
          type: 'p',
          text: '2. Vérifier la précondition coûte $n - 1$ comparaisons, alors que la recherche elle-même n’en coûte que $\\log_2 n$ environ : l’assertion fait perdre tout l’intérêt de la dichotomie ! On peut l’utiliser pendant la mise au point, mais on la retire ensuite (ou on documente simplement la précondition).',
        },
      ],
    },
    {
      id: 'tr-ex8',
      title: 'Tri par sélection décroissant et invariant',
      difficulty: 2,
      duration: 20,
      tags: ['tri par sélection', 'invariant'],
      statement: [
        { type: 'p', text: '1. Modifier le tri par sélection pour trier un tableau dans l’ordre **décroissant**.' },
        { type: 'p', text: '2. Énoncer l’invariant de la boucle externe de cette nouvelle version.' },
        { type: 'p', text: '3. Pourquoi la boucle externe peut-elle s’arrêter à $i = n - 2$ ?' },
      ],
      hints: ['On sélectionne cette fois le **maximum** de la partie non triée.'],
      solution: [
        {
          type: 'code',
          lang: 'python',
          code: `def tri_selection_decroissant(t):
    n = len(t)
    for i in range(n - 1):
        i_max = i
        for j in range(i + 1, n):
            if t[j] > t[i_max]:
                i_max = j
        t[i], t[i_max] = t[i_max], t[i]

t = [4, 9, 1, 7]
tri_selection_decroissant(t)
assert t == [9, 7, 4, 1]`,
        },
        {
          type: 'p',
          text: '2. Invariant : « à la fin du tour $i$, `t[0..i]` est trié dans l’ordre décroissant et contient les $i + 1$ plus grands éléments du tableau ; tous les éléments de `t[i+1..n-1]` leur sont inférieurs ou égaux. »',
        },
        {
          type: 'p',
          text: '3. Après le tour $i = n - 2$, d’après l’invariant, `t[0..n-2]` contient les $n - 1$ plus grands éléments, triés. Le dernier élément `t[n-1]` est donc le plus petit : il est à sa place, et le tableau entier est trié.',
        },
      ],
    },
    {
      id: 'tr-ex9',
      title: 'Première occurrence par dichotomie',
      difficulty: 3,
      duration: 25,
      tags: ['dichotomie', 'variant', 'invariant'],
      statement: [
        { type: 'p', text: 'Dans un tableau trié avec répétitions, comme `[1, 3, 3, 3, 5, 8]`, la recherche dichotomique classique renvoie **un** indice de la valeur, pas forcément le premier.' },
        { type: 'p', text: '1. Que renvoie `recherche_dichotomique([1, 3, 3, 3, 5, 8], 3)` ?' },
        { type: 'p', text: '2. Écrire une fonction `premiere_occurrence(t, v)` qui renvoie l’indice de la **première** occurrence de `v` (ou -1), en restant de coût logarithmique.' },
        { type: 'p', text: '3. Justifier sa terminaison.' },
      ],
      hints: [
        'Quand `t[m] == v`, mémoriser `m` puis continuer à chercher **à gauche**.',
        'Le variant reste $d - g + 1$.',
      ],
      solution: [
        {
          type: 'p',
          text: '1. $g = 0$, $d = 5$, $m = 2$ : `t[2] = 3`, la fonction renvoie **2**, alors que la première occurrence est à l’indice 1.',
        },
        {
          type: 'code',
          lang: 'python',
          code: `def premiere_occurrence(t, v):
    """t trié dans l'ordre croissant. Renvoie l'indice de la première
    occurrence de v dans t, ou -1 si v est absent."""
    g, d = 0, len(t) - 1
    resultat = -1
    while g <= d:
        m = (g + d) // 2
        if t[m] == v:
            resultat = m      # candidat ; il peut y en avoir un plus à gauche
            d = m - 1
        elif t[m] < v:
            g = m + 1
        else:
            d = m - 1
    return resultat

assert premiere_occurrence([1, 3, 3, 3, 5, 8], 3) == 1
assert premiere_occurrence([3, 3, 3], 3) == 0
assert premiere_occurrence([1, 2, 4], 3) == -1
assert premiere_occurrence([], 3) == -1`,
        },
        {
          type: 'p',
          text: '3. Dans tous les cas, on affecte `g = m + 1` ou `d = m - 1` avec $g \\leqslant m \\leqslant d$ : la taille $d - g + 1$ de la zone, entier positif dans la boucle, diminue strictement (elle est même au moins divisée par 2). La boucle termine, en au plus $\\lfloor \\log_2 n \\rfloor + 1$ tours.',
        },
        {
          type: 'p',
          text: 'Invariant de correction : « `resultat` vaut -1 ou est un indice où se trouve `v` ; et si `v` apparaît à un indice inférieur à `resultat` (ou n’importe où si `resultat` vaut -1), cette première occurrence est dans `t[g..d]` ».',
        },
      ],
    },
    {
      id: 'tr-ex10',
      title: 'Type bac : classement d’un tournoi',
      difficulty: 3,
      duration: 35,
      tags: ['type bac', 'tri par insertion', 'dichotomie'],
      statement: [
        { type: 'p', text: 'Les scores d’un tournoi sont stockés dans une liste de couples `(nom, points)` :' },
        {
          type: 'code',
          lang: 'python',
          code: `scores = [("Ana", 12), ("Bilal", 7), ("Chloé", 15), ("Dario", 7), ("Emma", 10)]`,
        },
        { type: 'p', text: '1. Écrire une fonction `meilleur(scores)` qui renvoie le nom du joueur ayant le plus de points.' },
        { type: 'p', text: '2. Adapter le tri par insertion pour trier `scores` par **points croissants**. Dans quel ordre apparaissent Bilal et Dario ? Justifier.' },
        { type: 'p', text: '3. Justifier que le coût de ce tri est quadratique dans le pire cas. Quel est ce pire cas ?' },
        { type: 'p', text: '4. Une fois la liste triée, écrire une fonction `a_atteint(scores_tries, p)` qui indique, par dichotomie, si un joueur a obtenu exactement `p` points.' },
      ],
      hints: [
        'Pour un couple `c = ("Ana", 12)`, `c[1]` vaut 12.',
        'Le tri par insertion ne décale que les éléments **strictement** plus grands.',
      ],
      solution: [
        {
          type: 'code',
          lang: 'python',
          code: `def meilleur(scores):
    assert len(scores) > 0
    i_max = 0
    for i in range(1, len(scores)):
        if scores[i][1] > scores[i_max][1]:
            i_max = i
    return scores[i_max][0]

def tri_insertion_points(t):
    for i in range(1, len(t)):
        cle = t[i]
        j = i - 1
        while j >= 0 and t[j][1] > cle[1]:
            t[j + 1] = t[j]
            j = j - 1
        t[j + 1] = cle

def a_atteint(scores_tries, p):
    g, d = 0, len(scores_tries) - 1
    while g <= d:
        m = (g + d) // 2
        if scores_tries[m][1] == p:
            return True
        elif scores_tries[m][1] < p:
            g = m + 1
        else:
            d = m - 1
    return False

scores = [("Ana", 12), ("Bilal", 7), ("Chloé", 15), ("Dario", 7), ("Emma", 10)]
assert meilleur(scores) == "Chloé"
tri_insertion_points(scores)
assert scores == [("Bilal", 7), ("Dario", 7), ("Emma", 10), ("Ana", 12), ("Chloé", 15)]
assert a_atteint(scores, 10) == True
assert a_atteint(scores, 11) == False`,
        },
        {
          type: 'p',
          text: '2. Bilal reste **avant** Dario : lors de l’insertion de Dario (7 points), la comparaison `t[j][1] > cle[1]` est fausse face à Bilal (7 > 7 est faux), donc Dario s’arrête juste après lui. Le tri par insertion ne change pas l’ordre relatif des éléments égaux : on dit qu’il est **stable**. (Le tri par sélection, à cause de ses échanges à distance, ne l’est pas en général.)',
        },
        {
          type: 'p',
          text: '3. Le pire cas est une liste triée par points **strictement décroissants** : l’élément d’indice $i$ est comparé aux $i$ éléments qui le précèdent. Total : $1 + 2 + \\dots + (n-1) = \\frac{n(n-1)}{2}$ comparaisons, de l’ordre de $n^2$ : coût quadratique.',
        },
        {
          type: 'p',
          text: '4. La liste triée par points permet la dichotomie sur le champ `points` ; chaque recherche coûte alors au plus $\\lfloor \\log_2 n \\rfloor + 1$ tours.',
        },
      ],
    },
  ],

  // ===================================================================
  // REPRÉSENTATIONS
  // ===================================================================
  representations: [
    {
      type: 'widget',
      id: 'sort-visualizer',
      props: { algorithm: 'selection' },
      title: 'Tri par sélection pas à pas',
      caption: 'Observer la recherche du minimum, les échanges et la partie triée définitive qui grandit.',
    },
    {
      type: 'widget',
      id: 'sort-visualizer',
      props: { algorithm: 'insertion' },
      title: 'Tri par insertion pas à pas',
      caption: 'Observer les décalages et comparer le nombre de comparaisons avec le tri par sélection.',
    },
    {
      type: 'widget',
      id: 'binary-search',
      props: { size: 64 },
      title: 'Recherche dichotomique vs séquentielle',
      caption: 'Avec 64 éléments, la dichotomie demande au plus 7 étapes ($\\log_2 64 = 6$, plus une).',
    },
    {
      type: 'widget',
      id: 'python-tracer',
      props: { program: 'tri_selection' },
      title: 'Trace du tri par sélection',
      caption: 'Suivre les variables `i`, `j`, `i_min` et l’état du tableau.',
    },
    {
      type: 'widget',
      id: 'python-tracer',
      props: { program: 'dichotomie' },
      title: 'Trace de la recherche dichotomique',
      caption: 'Vérifier que `d - g + 1` diminue à chaque tour (variant).',
    },
    {
      type: 'svg',
      svg: `<svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <line x1="50" y1="260" x2="400" y2="260" stroke="currentColor"/>
  <line x1="50" y1="260" x2="50" y2="20" stroke="currentColor"/>
  <polygon points="400,255 408,260 400,265" fill="currentColor"/>
  <polygon points="45,20 50,12 55,20" fill="currentColor"/>
  <text x="404" y="280" fill="currentColor" text-anchor="end">taille n</text>
  <text x="58" y="20" fill="currentColor">nombre d’opérations</text>
  <path d="M50 260 C 150 258 250 200 300 30" fill="none" stroke="hsl(0 84% 60%)" stroke-width="2"/>
  <text x="305" y="45" fill="hsl(0 84% 60%)">n² (tris)</text>
  <line x1="50" y1="260" x2="390" y2="110" stroke="hsl(217 91% 60%)" stroke-width="2"/>
  <text x="330" y="125" fill="hsl(217 91% 60%)">n (parcours)</text>
  <path d="M50 260 C 60 225 120 222 390 214" fill="none" stroke="hsl(142 71% 45%)" stroke-width="2"/>
  <text x="300" y="205" fill="hsl(142 71% 45%)">log₂ n (dichotomie)</text>
</svg>`,
      caption: 'Allure comparée des coûts logarithmique, linéaire et quadratique.',
      maxWidth: 460,
    },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Combien de comparaisons effectue le tri par sélection sur un tableau de 8 éléments ?',
          choices: ['8', '28', '56', '64'],
          answer: 1,
          explanation: '$\\frac{8 \\times 7}{2} = 28$, quel que soit le tableau.',
        },
        {
          question: 'Quel est le meilleur cas du tri par insertion ?',
          choices: ['Un tableau trié dans l’ordre décroissant', 'Un tableau déjà trié dans l’ordre croissant', 'Un tableau aléatoire', 'Il n’y a pas de meilleur cas'],
          answer: 1,
          explanation: 'Chaque élément est déjà à sa place : une seule comparaison par tour, coût linéaire.',
        },
        {
          question: 'Quelle est la précondition indispensable de la recherche dichotomique ?',
          choices: ['Le tableau est non vide', 'Le tableau ne contient pas de doublons', 'Le tableau est trié', 'La valeur cherchée est présente'],
          answer: 2,
          explanation: 'Sans tableau trié, éliminer une moitié n’est pas justifié.',
        },
        {
          question: 'Combien de tours au plus pour une recherche dichotomique dans un tableau de 1 000 éléments ?',
          choices: ['10', '100', '500', '1000'],
          answer: 0,
          explanation: '$2^9 = 512 \\leqslant 1000 < 1024 = 2^{10}$ : au plus $9 + 1 = 10$ tours.',
        },
        {
          question: 'Un tri quadratique trie 10 000 éléments en 2 s. Environ combien de temps pour 30 000 éléments ?',
          choices: ['6 s', '9 s', '18 s', '27 s'],
          answer: 2,
          explanation: '$n$ multiplié par 3 → temps multiplié par $3^2 = 9$ : 18 s.',
        },
        {
          question: 'Dans la recherche dichotomique, quelle quantité est un variant de boucle ?',
          choices: ['`m`', '`g`', '`d - g + 1`', '`t[m]`'],
          answer: 2,
          explanation: 'C’est un entier positif dans la boucle qui décroît strictement à chaque tour.',
        },
        {
          question: 'Quel invariant correspond au tri par sélection (à la fin du tour $i$) ?',
          choices: [
            '`t[0..i]` est trié et contient les $i+1$ premiers éléments initiaux',
            '`t[0..i]` est trié et contient les $i+1$ plus petits éléments du tableau',
            '`t[i..n-1]` est trié',
            'Le tableau entier est trié',
          ],
          answer: 1,
          explanation: 'Le premier choix est l’invariant du tri par insertion.',
        },
        {
          question: 'Quel est le coût de la recherche du maximum dans un tableau de taille $n$ ?',
          choices: ['constant', 'logarithmique', 'linéaire', 'quadratique'],
          answer: 2,
          explanation: 'Il faut examiner chaque élément une fois.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Parcours séquentiel : coût ?', back: 'Linéaire : proportionnel à $n$.' },
        { front: 'Principe du tri par sélection', back: 'Chercher le minimum de la partie non triée et l’échanger avec le premier élément non trié.' },
        { front: 'Principe du tri par insertion', back: 'Insérer chaque élément à sa place dans la partie gauche triée, en décalant les plus grands vers la droite.' },
        { front: 'Invariant du tri par sélection', back: '`t[0..i]` trié, contient les $i+1$ plus petits éléments (à leur place définitive).' },
        { front: 'Invariant du tri par insertion', back: '`t[0..i]` trié, contient les mêmes éléments que `t[0..i]` au départ.' },
        { front: 'Nombre de comparaisons du tri par sélection', back: '$\\frac{n(n-1)}{2}$ dans tous les cas.' },
        { front: 'Tri par insertion : pire et meilleur cas', back: 'Pire : ordre décroissant, $\\frac{n(n-1)}{2}$ comparaisons. Meilleur : déjà trié, $n - 1$.' },
        { front: 'Coût quadratique : $n$ × 2 ⇒ temps × ?', back: 'Environ × 4.' },
        { front: 'Variant de boucle', back: 'Entier positif strictement décroissant à chaque tour : prouve la terminaison.' },
        { front: 'Invariant de boucle', back: 'Propriété vraie avant la boucle et conservée par chaque tour : prouve la correction.' },
        { front: 'Variant de la dichotomie', back: '$d - g + 1$, taille de la zone de recherche.' },
        { front: 'Tours de dichotomie pour $n = 10^6$', back: 'Au plus 20 ($2^{20} \\approx 10^6$).' },
        { front: 'Pourquoi `while g <= d` et pas `g < d` ?', back: 'Il faut examiner aussi une zone réduite à une seule case.' },
      ],
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre les lignes du tri par insertion',
      items: [
        'for i in range(1, len(t)):',
        '    cle = t[i]',
        '    j = i - 1',
        '    while j >= 0 and t[j] > cle:',
        '        t[j + 1] = t[j]',
        '        j = j - 1',
        '    t[j + 1] = cle',
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter la recherche dichotomique',
      text: 'On initialise g = 0 et d = {{len(t) - 1|len(t)-1}}. Tant que g {{<=}} d, on calcule m = (g + d) {{//}} 2. Si t[m] est inférieur à la valeur cherchée, on pose g = {{m + 1|m+1}} ; s’il est supérieur, on pose d = {{m - 1|m-1}}. Le coût est {{logarithmique}}, à condition que le tableau soit {{trié}}.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Le tri par sélection est plus rapide sur un tableau déjà trié.', answer: false, explanation: 'Il fait toujours $\\frac{n(n-1)}{2}$ comparaisons.' },
        { text: 'Le tri par insertion est stable.', answer: true, explanation: 'Il ne décale que les éléments strictement plus grands.' },
        { text: 'Une recherche dichotomique dans un tableau de 2 000 éléments demande au plus 11 tours.', answer: true, explanation: '$2^{10} = 1024 \\leqslant 2000 < 2048$ : $10 + 1 = 11$.' },
        { text: 'La terminaison d’une boucle `for i in range(n)` doit être prouvée avec un variant.', answer: false, explanation: 'Une boucle bornée termine toujours.' },
        { text: 'Pour un tableau de taille $n$, chercher séquentiellement un élément absent demande $n$ comparaisons.', answer: true },
        { text: 'Si tous les tests d’un tri passent, il n’est pas nécessaire de prouver sa correction.', answer: false, explanation: 'Les tests ne couvrent qu’un nombre fini de cas.' },
      ],
    },
  ],
}

export default chapter
