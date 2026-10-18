import type { Block, Chapter } from '../types'

/** Bloc de code Python (la première ligne vide est retirée). */
const py = (code: string, caption?: string): Block => ({
  type: 'code',
  lang: 'python',
  code: code.replace(/^\n/, '').replace(/\n\s*$/, ''),
  ...(caption ? { caption } : {}),
})

const aliasSvg = `<svg viewBox="0 0 640 230" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif">
  <defs>
    <marker id="nsi3-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <text x="160" y="22" text-anchor="middle" font-size="13" fill="currentColor">b = a  (alias : même objet)</text>
  <text x="480" y="22" text-anchor="middle" font-size="13" fill="currentColor">c = a.copy()  (copie : nouvel objet)</text>
  <line x1="320" y1="10" x2="320" y2="220" stroke="currentColor" class="svg-grid" stroke-width="1" stroke-dasharray="4 4"/>
  <rect x="20" y="60" width="50" height="30" fill="none" stroke="currentColor"/>
  <text x="45" y="80" text-anchor="middle" font-size="14" fill="currentColor">a</text>
  <rect x="20" y="140" width="50" height="30" fill="none" stroke="currentColor"/>
  <text x="45" y="160" text-anchor="middle" font-size="14" fill="currentColor">b</text>
  <rect x="160" y="95" width="40" height="40" fill="hsl(217 91% 60%)" fill-opacity="0.15" stroke="hsl(217 91% 60%)"/>
  <rect x="200" y="95" width="40" height="40" fill="hsl(217 91% 60%)" fill-opacity="0.15" stroke="hsl(217 91% 60%)"/>
  <rect x="240" y="95" width="40" height="40" fill="hsl(217 91% 60%)" fill-opacity="0.15" stroke="hsl(217 91% 60%)"/>
  <text x="180" y="120" text-anchor="middle" font-size="14" fill="currentColor">1</text>
  <text x="220" y="120" text-anchor="middle" font-size="14" fill="currentColor">2</text>
  <text x="260" y="120" text-anchor="middle" font-size="14" fill="currentColor">3</text>
  <path d="M70 75 L156 108" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nsi3-arrow)"/>
  <path d="M70 155 L156 124" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nsi3-arrow)"/>
  <text x="220" y="160" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">une seule liste en mémoire</text>
  <rect x="340" y="60" width="50" height="30" fill="none" stroke="currentColor"/>
  <text x="365" y="80" text-anchor="middle" font-size="14" fill="currentColor">a</text>
  <rect x="340" y="140" width="50" height="30" fill="none" stroke="currentColor"/>
  <text x="365" y="160" text-anchor="middle" font-size="14" fill="currentColor">c</text>
  <rect x="480" y="55" width="40" height="40" fill="hsl(217 91% 60%)" fill-opacity="0.15" stroke="hsl(217 91% 60%)"/>
  <rect x="520" y="55" width="40" height="40" fill="hsl(217 91% 60%)" fill-opacity="0.15" stroke="hsl(217 91% 60%)"/>
  <rect x="560" y="55" width="40" height="40" fill="hsl(217 91% 60%)" fill-opacity="0.15" stroke="hsl(217 91% 60%)"/>
  <text x="500" y="80" text-anchor="middle" font-size="14" fill="currentColor">1</text>
  <text x="540" y="80" text-anchor="middle" font-size="14" fill="currentColor">2</text>
  <text x="580" y="80" text-anchor="middle" font-size="14" fill="currentColor">3</text>
  <rect x="480" y="135" width="40" height="40" fill="hsl(142 71% 45%)" fill-opacity="0.15" stroke="hsl(142 71% 45%)"/>
  <rect x="520" y="135" width="40" height="40" fill="hsl(142 71% 45%)" fill-opacity="0.15" stroke="hsl(142 71% 45%)"/>
  <rect x="560" y="135" width="40" height="40" fill="hsl(142 71% 45%)" fill-opacity="0.15" stroke="hsl(142 71% 45%)"/>
  <text x="500" y="160" text-anchor="middle" font-size="14" fill="currentColor">1</text>
  <text x="540" y="160" text-anchor="middle" font-size="14" fill="currentColor">2</text>
  <text x="580" y="160" text-anchor="middle" font-size="14" fill="currentColor">3</text>
  <path d="M390 75 L476 75" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nsi3-arrow)"/>
  <path d="M390 155 L476 155" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nsi3-arrow)"/>
  <text x="540" y="205" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">deux listes indépendantes</text>
  <text x="160" y="205" text-anchor="middle" font-size="12" fill="hsl(0 84% 60%)">b[0] = 9 modifie aussi a</text>
</svg>`

const matriceSvg = `<svg viewBox="0 0 560 220" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif">
  <text x="280" y="20" text-anchor="middle" font-size="13" fill="currentColor">m = [[1, 2, 3], [4, 5, 6]]   →   m[i][j] : ligne i, colonne j</text>
  <text x="180" y="52" text-anchor="middle" font-size="12" class="svg-muted" fill="currentColor">j = 0</text>
  <text x="240" y="52" text-anchor="middle" font-size="12" class="svg-muted" fill="currentColor">j = 1</text>
  <text x="300" y="52" text-anchor="middle" font-size="12" class="svg-muted" fill="currentColor">j = 2</text>
  <text x="110" y="95" text-anchor="middle" font-size="12" class="svg-muted" fill="currentColor">i = 0 → m[0]</text>
  <text x="110" y="155" text-anchor="middle" font-size="12" class="svg-muted" fill="currentColor">i = 1 → m[1]</text>
  <rect x="150" y="65" width="60" height="50" fill="none" stroke="currentColor"/>
  <rect x="210" y="65" width="60" height="50" fill="none" stroke="currentColor"/>
  <rect x="270" y="65" width="60" height="50" fill="none" stroke="currentColor"/>
  <rect x="150" y="125" width="60" height="50" fill="none" stroke="currentColor"/>
  <rect x="210" y="125" width="60" height="50" fill="hsl(25 95% 53%)" fill-opacity="0.25" stroke="hsl(25 95% 53%)" stroke-width="2"/>
  <rect x="270" y="125" width="60" height="50" fill="none" stroke="currentColor"/>
  <text x="180" y="95" text-anchor="middle" font-size="15" fill="currentColor">1</text>
  <text x="240" y="95" text-anchor="middle" font-size="15" fill="currentColor">2</text>
  <text x="300" y="95" text-anchor="middle" font-size="15" fill="currentColor">3</text>
  <text x="180" y="155" text-anchor="middle" font-size="15" fill="currentColor">4</text>
  <text x="240" y="155" text-anchor="middle" font-size="15" fill="currentColor">5</text>
  <text x="300" y="155" text-anchor="middle" font-size="15" fill="currentColor">6</text>
  <text x="440" y="145" text-anchor="middle" font-size="13" fill="hsl(25 95% 53%)">m[1][1] = 5</text>
  <path d="M390 141 L336 148" stroke="hsl(25 95% 53%)" stroke-width="1.3"/>
  <text x="280" y="205" text-anchor="middle" font-size="12" class="svg-muted" fill="currentColor">len(m) = 2 lignes ; len(m[0]) = 3 colonnes</text>
</svg>`

const chapter: Chapter = {
  id: 'types-construits',
  subject: 'nsi',
  order: 3,
  title: 'Types construits : p-uplets, tableaux, dictionnaires',
  theme: 'Représentation des données',
  summary:
    'Les p-uplets (tuples), les tableaux (listes Python) avec indices, compréhensions et matrices, les dictionnaires (clés, valeurs, parcours) et la notion de mutabilité.',
  duration: '3 à 4 semaines',
  objectives: [
    'Écrire une fonction renvoyant un p-uplet de valeurs.',
    'Lire et modifier les éléments d’un tableau grâce à leurs indices.',
    'Construire un tableau par compréhension.',
    'Utiliser des tableaux de tableaux pour représenter des matrices : notation `a[i][j]`.',
    'Itérer sur les éléments d’un tableau.',
    'Construire une entrée de dictionnaire ; itérer sur les éléments d’un dictionnaire (clés, valeurs, couples).',
    'Distinguer objets mutables et non mutables ; comprendre l’effet d’une affectation `b = a` sur une liste.',
  ],
  keywords: ['tuple', 'p-uplet', 'liste', 'tableau', 'indice', 'compréhension', 'matrice', 'dictionnaire', 'clé', 'valeur', 'mutable', 'alias'],

  // =====================================================================
  // FICHE
  // =====================================================================
  fiche: [
    {
      type: 'table',
      headers: ['', 'p-uplet `tuple`', 'tableau `list`', 'dictionnaire `dict`'],
      rows: [
        ['Syntaxe', '`(3, 4)`, `(5,)`, `()`', '`[3, 4]`, `[]`', "`{'a': 1, 'b': 2}`, `{}`"],
        ['Accès', '`t[i]` (indice)', '`L[i]` (indice)', '`d[cle]` (clé)'],
        ['Indices / clés', '0 à `len(t) - 1`, ou négatifs', '0 à `len(L) - 1`, ou négatifs', 'clés non mutables (str, int, tuple…)'],
        ['Mutable ?', '**non**', '**oui**', '**oui**'],
        ['Ajout', 'impossible (on crée un nouveau tuple)', '`L.append(x)`', '`d[cle] = valeur`'],
        ['Parcours', '`for x in t`', '`for x in L` / `for i in range(len(L))`', '`for k in d`, `d.values()`, `d.items()`'],
      ],
    },
    { type: 'h2', text: 'p-uplets' },
    py(String.raw`
point = (3, 4)          # tuple
x, y = point            # dépaquetage
def min_max(t):
    return min(t), max(t)   # renvoie un tuple
`),
    { type: 'h2', text: 'Tableaux (listes)' },
    py(String.raw`
L = [5, 8, 2]
L[0]            # 5 (premier)      L[-1]  # 2 (dernier)
L[1] = 10       # modification     L.append(7)   # ajout en fin
len(L)          # 4
carres = [i * i for i in range(5)]          # [0, 1, 4, 9, 16]
pairs = [x for x in L if x % 2 == 0]        # filtrage
m = [[0] * 3 for _ in range(2)]             # matrice 2 x 3 ; m[i][j]
`),
    {
      type: 'callout',
      variant: 'warning',
      title: 'Pièges',
      content: [
        {
          type: 'list',
          items: [
            '`L[len(L)]` → `IndexError` : le dernier indice est `len(L) - 1`.',
            '`b = a` ne copie pas la liste : `a` et `b` désignent **le même objet** (alias). Copier : `b = a.copy()` ou `b = list(a)`.',
            '`[[0] * 3] * 2` crée 2 fois **la même** ligne : utiliser une compréhension.',
          ],
        },
      ],
    },
    { type: 'h2', text: 'Dictionnaires' },
    py(String.raw`
d = {'pomme': 3, 'kiwi': 5}
d['poire'] = 2          # ajout (ou modification si la clé existe)
'kiwi' in d             # True : on teste les CLÉS
d.get('fraise', 0)      # 0 : valeur par défaut si clé absente
for cle, valeur in d.items():
    print(cle, valeur)
`),
    {
      type: 'callout',
      variant: 'remember',
      title: 'Mutabilité',
      content: [
        {
          type: 'p',
          text: '**Non mutables** : `int`, `float`, `bool`, `str`, `tuple`. **Mutables** : `list`, `dict`. Une fonction qui reçoit une liste peut la modifier « en place » : la modification est visible à l’extérieur.',
        },
      ],
    },
  ],

  // =====================================================================
  // COURS
  // =====================================================================
  cours: [
    {
      type: 'p',
      text: 'Les types de base (`int`, `float`, `bool`, `str`) ne suffisent pas pour représenter des données structurées : un point du plan, la liste des notes d’une classe, un répertoire téléphonique… Python fournit des **types construits** qui regroupent plusieurs valeurs : les **p-uplets**, les **tableaux** et les **dictionnaires**.',
    },

    // ---------------------------------------------------------------
    { type: 'h2', text: '1. Les p-uplets (tuples)' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'p-uplet',
      content: [
        {
          type: 'p',
          text: 'Un **p-uplet** (ou *tuple*) est une suite **ordonnée** et **non modifiable** de $p$ valeurs, éventuellement de types différents. En Python, on l’écrit entre parenthèses, les éléments séparés par des virgules. Un couple est un 2-uplet, un triplet un 3-uplet.',
        },
      ],
    },
    py(String.raw`
>>> point = (3, 4)
>>> eleve = ('Lina', 16, 14.5)      # types différents
>>> type(point)
<class 'tuple'>
>>> eleve[0]                         # accès par indice, à partir de 0
'Lina'
>>> eleve[-1]                        # indice négatif : en partant de la fin
14.5
>>> len(eleve)
3
>>> vide = ()
>>> singleton = (5,)                 # la virgule est obligatoire
>>> type((5))                        # (5) est juste l'entier 5 entre parenthèses
<class 'int'>
>>> t = 1, 2, 3                      # les parenthèses sont facultatives
>>> t
(1, 2, 3)
`),
    { type: 'h3', text: 'Opérations sur les p-uplets' },
    py(String.raw`
>>> (1, 2) + (3,)        # concaténation : NOUVEAU tuple
(1, 2, 3)
>>> (0,) * 3             # répétition
(0, 0, 0)
>>> 16 in eleve          # test d'appartenance
True
>>> for x in point:      # parcours
...     print(x)
3
4
>>> point[0] = 10        # interdit : un tuple n'est pas mutable
TypeError: 'tuple' object does not support item assignment
`),
    { type: 'h3', text: 'Affectation multiple et dépaquetage' },
    py(String.raw`
>>> x, y = point          # dépaquetage : x = 3, y = 4
>>> nom, age, moyenne = eleve
>>> a, b = 1, 2
>>> a, b = b, a           # échange de deux variables en une ligne
>>> a, b
(2, 1)
`),
    { type: 'h3', text: 'Fonction renvoyant un p-uplet' },
    {
      type: 'p',
      text: 'Une fonction ne renvoie qu’une seule valeur… mais cette valeur peut être un p-uplet. C’est la façon naturelle de renvoyer **plusieurs résultats**.',
    },
    py(String.raw`
def division(a, b):
    """Renvoie le quotient et le reste de la division euclidienne de a par b."""
    return a // b, a % b      # équivaut à return (a // b, a % b)

q, r = division(17, 5)
print(q, r)                   # 3 2

def min_max(t):
    """Renvoie le couple (minimum, maximum) d'un tableau non vide."""
    mini = t[0]
    maxi = t[0]
    for x in t:
        if x < mini:
            mini = x
        if x > maxi:
            maxi = x
    return (mini, maxi)

print(min_max([4, -2, 9, 0]))   # (-2, 9)
`),
    {
      type: 'callout',
      variant: 'tip',
      title: 'Quand utiliser un p-uplet ?',
      content: [
        {
          type: 'p',
          text: 'Pour un petit nombre de valeurs dont la **position a un sens** et qui ne doivent pas changer : coordonnées `(x, y)`, date `(jour, mois, année)`, couleur `(r, v, b)`, résultat multiple d’une fonction. Comme il n’est pas mutable, un tuple peut servir de **clé de dictionnaire**.',
        },
      ],
    },

    // ---------------------------------------------------------------
    { type: 'h2', text: '2. Les tableaux (type list)' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Tableau',
      content: [
        {
          type: 'p',
          text: 'Un **tableau** est une suite ordonnée de valeurs, accessibles par leur **indice** (position), numérotées à partir de **0**. En Python, les tableaux sont réalisés par le type `list`, écrit entre crochets. Contrairement aux tuples, les listes sont **mutables** : on peut modifier, ajouter, supprimer des éléments. En NSI, on y range en général des éléments **de même type**.',
        },
      ],
    },
    py(String.raw`
>>> notes = [12, 15, 9, 18]
>>> notes[0]        # premier élément
12
>>> notes[3]        # dernier : indice len(notes) - 1
18
>>> notes[-1]       # autre façon d'obtenir le dernier
18
>>> notes[4]
IndexError: list index out of range
>>> notes[2] = 11   # modification
>>> notes
[12, 15, 11, 18]
>>> len(notes)
4
`),
    {
      type: 'table',
      headers: ['Élément', '12', '15', '11', '18'],
      rows: [
        ['Indice positif', '0', '1', '2', '3'],
        ['Indice négatif', '−4', '−3', '−2', '−1'],
      ],
      caption: 'Pour un tableau de longueur n, les indices valides vont de 0 à n − 1 (ou de −n à −1).',
    },
    { type: 'h3', text: '2.1 Opérations usuelles' },
    {
      type: 'table',
      headers: ['Opération', 'Exemple', 'Effet'],
      rows: [
        ['Longueur', '`len(L)`', 'nombre d’éléments'],
        ['Ajout en fin', '`L.append(x)`', 'modifie `L` en place'],
        ['Retrait du dernier', '`L.pop()`', 'renvoie et supprime le dernier élément'],
        ['Appartenance', '`x in L`', '`True` si `x` est un élément de `L`'],
        ['Concaténation', '`L1 + L2`', 'crée une **nouvelle** liste'],
        ['Répétition', '`[0] * 5`', '`[0, 0, 0, 0, 0]`'],
        ['Tranche (*slice*)', '`L[1:3]`', 'nouvelle liste des éléments d’indices 1 et 2'],
        ['Somme, min, max', '`sum(L)`, `min(L)`, `max(L)`', 'fonctions prédéfinies'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: '`append` modifie, `+` crée',
      content: [
        {
          type: 'p',
          text: '`L.append(4)` modifie `L` et renvoie `None` : écrire `L = L.append(4)` est une erreur classique, qui remplace la liste par `None` ! À l’inverse, `L + [4]` ne modifie pas `L` mais renvoie une nouvelle liste.',
        },
      ],
    },
    { type: 'h3', text: '2.2 Parcourir un tableau' },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Parcours par valeurs', text: '`for x in L:` — quand on n’a besoin que des éléments (somme, recherche d’un élément, comptage).', icon: 'List' },
        { title: 'Parcours par indices', text: '`for i in range(len(L)):` — quand on a besoin de la position (modifier `L[i]`, comparer `L[i]` et `L[i + 1]`, renvoyer un indice).', icon: 'Hash' },
      ],
    },
    py(String.raw`
def somme(t):
    s = 0
    for x in t:              # parcours par valeurs
        s = s + x
    return s

def indice_max(t):
    """Indice de la première occurrence du maximum d'un tableau non vide."""
    i_max = 0
    for i in range(1, len(t)):   # parcours par indices
        if t[i] > t[i_max]:
            i_max = i
    return i_max

def doubler(t):
    """Multiplie par 2 chaque élément de t (modification en place)."""
    for i in range(len(t)):
        t[i] = 2 * t[i]

notes = [12, 15, 11, 18]
print(somme(notes) / len(notes))   # 14.0
print(indice_max(notes))           # 3
doubler(notes)
print(notes)                       # [24, 30, 22, 36]
`),
    {
      type: 'callout',
      variant: 'warning',
      title: 'Parcours par valeurs : pas de modification',
      content: [
        {
          type: 'p',
          text: 'Dans `for x in t: x = 2 * x`, la variable `x` reçoit une copie de la valeur de chaque élément : la modifier ne change **pas** le tableau. Pour modifier les éléments, il faut passer par les indices : `t[i] = …`.',
        },
      ],
    },
    { type: 'h3', text: '2.3 Construire un tableau' },
    {
      type: 'p',
      text: 'Trois façons de construire un tableau : en extension (`[1, 2, 3]`), par ajouts successifs avec `append` dans une boucle, ou **par compréhension**.',
    },
    py(String.raw`
# Par ajouts successifs
carres = []
for i in range(6):
    carres.append(i ** 2)
# carres == [0, 1, 4, 9, 16, 25]

# Par compréhension : même résultat en une ligne
carres = [i ** 2 for i in range(6)]
`),
    {
      type: 'callout',
      variant: 'definition',
      title: 'Liste en compréhension',
      content: [
        {
          type: 'p',
          text: 'La syntaxe `[expression for variable in iterable if condition]` construit la liste des valeurs de `expression` pour chaque valeur de `variable` parcourue, en ne gardant que celles qui vérifient `condition` (partie facultative). Elle s’inspire de la notation mathématique $\\{ i^2 \\mid i \\in \\{0, \\dots, 5\\} \\}$.',
        },
      ],
    },
    py(String.raw`
>>> [3 * k for k in range(5)]
[0, 3, 6, 9, 12]
>>> notes = [12, 7, 15, 9, 18]
>>> [n for n in notes if n >= 10]          # filtrage
[12, 15, 18]
>>> [n + 1 for n in notes if n < 10]       # transformation + filtrage
[8, 10]
>>> [c.upper() for c in 'nsi']             # sur une chaîne
['N', 'S', 'I']
>>> [len(m) for m in ['le', 'chat', 'dort']]
[2, 4, 4]
>>> [x if x >= 0 else 0 for x in [3, -1, 4, -5]]   # expression conditionnelle
[3, 0, 4, 0]
`),

    { type: 'h3', text: '2.4 Tableaux de tableaux : les matrices' },
    {
      type: 'p',
      text: 'Un tableau peut contenir des tableaux. On représente ainsi une **matrice** (grille, image, plateau de jeu) comme une liste de lignes : `m[i]` est la ligne d’indice `i` et `m[i][j]` est l’élément de la ligne `i` et de la colonne `j`.',
    },
    { type: 'svg', svg: matriceSvg, maxWidth: 600, caption: 'Une matrice à 2 lignes et 3 colonnes.' },
    py(String.raw`
m = [[1, 2, 3],
     [4, 5, 6]]
print(m[1])          # [4, 5, 6]
print(m[1][1])       # 5
m[0][2] = 30         # modification d'un élément
nb_lignes = len(m)           # 2
nb_colonnes = len(m[0])      # 3

# Parcours complet avec deux boucles imbriquées
for i in range(nb_lignes):
    for j in range(nb_colonnes):
        print(m[i][j], end=' ')
    print()

# Somme de tous les éléments
total = 0
for ligne in m:
    for x in ligne:
        total = total + x
`),
    {
      type: 'callout',
      variant: 'method',
      title: 'Créer une matrice n × p remplie de zéros',
      content: [
        py(String.raw`
n, p = 3, 4
m = [[0] * p for i in range(n)]      # correct : n lignes distinctes
m = [[0 for j in range(p)] for i in range(n)]   # équivalent
`),
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Le piège de `[[0] * p] * n`',
      content: [
        py(String.raw`
>>> m = [[0] * 3] * 2      # 2 fois la MÊME ligne !
>>> m[0][0] = 1
>>> m
[[1, 0, 0], [1, 0, 0]]     # les deux « lignes » ont changé
`),
        {
          type: 'p',
          text: 'L’opérateur `*` recopie la **référence** vers la liste `[0, 0, 0]`, pas la liste elle-même : les deux lignes sont le même objet. La compréhension, elle, évalue `[0] * 3` à chaque tour et crée des lignes distinctes.',
        },
      ],
    },
    py(String.raw`
# Transposée d'une matrice par compréhension
m = [[1, 2, 3], [4, 5, 6]]
t = [[m[i][j] for i in range(len(m))] for j in range(len(m[0]))]
# t == [[1, 4], [2, 5], [3, 6]]
`),

    // ---------------------------------------------------------------
    { type: 'h2', text: '3. Les dictionnaires' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Dictionnaire',
      content: [
        {
          type: 'p',
          text: 'Un **dictionnaire** est un ensemble de couples **clé : valeur**. On n’accède pas aux valeurs par une position, mais par leur **clé**. Les clés sont **uniques** et doivent être d’un type **non mutable** (`str`, `int`, `tuple`…) ; les valeurs peuvent être quelconques. En Python, le type est `dict`, écrit entre accolades.',
        },
      ],
    },
    py(String.raw`
>>> stock = {'pomme': 12, 'kiwi': 5, 'poire': 0}
>>> stock['kiwi']             # accès par la clé
5
>>> stock['banane']
KeyError: 'banane'
>>> stock['banane'] = 7       # ajout d'une nouvelle entrée
>>> stock['pomme'] = 10       # modification (la clé existe déjà)
>>> del stock['poire']        # suppression
>>> stock
{'pomme': 10, 'kiwi': 5, 'banane': 7}
>>> len(stock)                # nombre de couples
3
>>> 'kiwi' in stock           # test sur les CLÉS
True
>>> 5 in stock                # 5 est une valeur, pas une clé
False
>>> stock.get('cerise', 0)    # valeur par défaut si la clé est absente
0
`),
    { type: 'h3', text: '3.1 Parcourir un dictionnaire' },
    {
      type: 'table',
      headers: ['Parcours', 'Syntaxe', 'Variable(s) de boucle'],
      rows: [
        ['Clés', '`for k in d:` ou `for k in d.keys():`', 'chaque clé'],
        ['Valeurs', '`for v in d.values():`', 'chaque valeur'],
        ['Couples', '`for k, v in d.items():`', 'chaque couple (clé, valeur)'],
      ],
    },
    py(String.raw`
stock = {'pomme': 10, 'kiwi': 5, 'banane': 7}

for fruit in stock:
    print(fruit, ':', stock[fruit])

total = 0
for quantite in stock.values():
    total = total + quantite
print(total)                      # 22

for fruit, quantite in stock.items():
    if quantite < 6:
        print('Commander des', fruit)
`),
    {
      type: 'callout',
      variant: 'tip',
      title: 'Ordre',
      content: [
        {
          type: 'p',
          text: 'Depuis Python 3.7, un dictionnaire conserve l’ordre d’insertion des clés lors du parcours. Mais on ne peut pas y accéder par position : `stock[0]` cherche la **clé** `0` et provoque une `KeyError`.',
        },
      ],
    },
    { type: 'h3', text: '3.2 Méthode classique : compter des occurrences' },
    py(String.raw`
def occurrences(texte):
    """Dictionnaire {caractère: nombre d'apparitions}."""
    compte = {}
    for c in texte:
        if c in compte:
            compte[c] = compte[c] + 1
        else:
            compte[c] = 1          # première rencontre
    return compte

print(occurrences('abracadabra'))
# {'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1}
`),
    {
      type: 'p',
      text: 'On peut aussi construire un dictionnaire **par compréhension** : `{x: x ** 2 for x in range(4)}` donne `{0: 0, 1: 1, 2: 4, 3: 9}`.',
    },
    { type: 'h3', text: '3.3 Structurer des données' },
    {
      type: 'p',
      text: 'On combine souvent les types construits : une **liste de dictionnaires** représente une table de données (chaque dictionnaire est un enregistrement), un dictionnaire de listes associe à chaque clé plusieurs valeurs.',
    },
    py(String.raw`
eleves = [
    {'nom': 'Lina', 'notes': [14, 16, 12]},
    {'nom': 'Tom',  'notes': [9, 11]},
]
for e in eleves:
    moyenne = sum(e['notes']) / len(e['notes'])
    print(e['nom'], moyenne)       # Lina 14.0  puis  Tom 10.0

# Un tuple peut être une clé (pas une liste)
distances = {('Paris', 'Lyon'): 465, ('Lyon', 'Marseille'): 315}
print(distances[('Paris', 'Lyon')])   # 465
`),
    {
      type: 'table',
      headers: ['Besoin', 'Structure adaptée'],
      rows: [
        ['Quelques valeurs fixes, de natures différentes (un point, une date)', 'p-uplet'],
        ['Une collection ordonnée, modifiable, de valeurs de même nature', 'tableau (liste)'],
        ['Retrouver une valeur à partir d’une étiquette (nom, identifiant)', 'dictionnaire'],
        ['Une grille, une image', 'tableau de tableaux'],
      ],
      caption: 'Choisir la bonne structure de données.',
    },

    // ---------------------------------------------------------------
    { type: 'h2', text: '4. Mutabilité, références et alias' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Mutable / non mutable',
      content: [
        {
          type: 'p',
          text: 'Un objet est **mutable** si on peut modifier son contenu après sa création. Les listes et les dictionnaires sont mutables ; les entiers, flottants, booléens, chaînes et tuples ne le sont pas (on dit aussi *immuables*).',
        },
      ],
    },
    {
      type: 'p',
      text: 'En Python, une variable est un **nom qui désigne un objet** en mémoire. L’affectation `b = a` ne copie pas l’objet : elle donne un second nom au même objet. Pour un objet non mutable, cela n’a aucune conséquence visible. Pour une liste, si, car modifier l’objet par un nom est visible par l’autre.',
    },
    py(String.raw`
>>> a = [1, 2, 3]
>>> b = a              # b est un ALIAS de a
>>> b[0] = 9
>>> a
[9, 2, 3]              # a a changé aussi !
>>> a is b             # même objet
True
>>> c = a.copy()       # ou list(a), ou a[:]
>>> c[0] = 0
>>> a, c
([9, 2, 3], [0, 2, 3])
>>> a is c
False
`),
    { type: 'svg', svg: aliasSvg, maxWidth: 680, caption: 'Alias et copie : avec b = a, il n’existe qu’une seule liste.' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Réaffecter n’est pas modifier',
      content: [
        py(String.raw`
>>> x = 5
>>> y = x
>>> y = y + 1      # crée un nouvel entier 6 et y le désigne ; x n'est pas touché
>>> x
5
>>> a = [1, 2]
>>> b = a
>>> b = b + [3]    # + crée une NOUVELLE liste : a n'est pas modifiée
>>> a, b
([1, 2], [1, 2, 3])
>>> b = a
>>> b.append(3)    # append modifie l'objet partagé
>>> a
[1, 2, 3]
`),
      ],
    },
    { type: 'h3', text: 'Listes passées en paramètre' },
    {
      type: 'p',
      text: 'Lorsqu’on passe une liste à une fonction, le paramètre est un alias de la liste de l’appelant. Une fonction peut donc **modifier en place** une liste (c’est le cas des algorithmes de tri) ; cet *effet de bord* doit être documenté.',
    },
    py(String.raw`
def ajouter_zero(t):
    t.append(0)          # modifie la liste de l'appelant

def ajouter_zero_copie(t):
    return t + [0]       # renvoie une nouvelle liste, t est intacte

L = [1, 2]
ajouter_zero(L)
print(L)                 # [1, 2, 0]
M = ajouter_zero_copie(L)
print(L, M)              # [1, 2, 0] [1, 2, 0, 0]
`),
    {
      type: 'callout',
      variant: 'warning',
      title: 'Copie superficielle',
      content: [
        {
          type: 'p',
          text: '`m.copy()` ne copie que le premier niveau : pour une matrice, les lignes restent partagées. Pour copier une matrice : `[ligne.copy() for ligne in m]` (ou `copy.deepcopy(m)`).',
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
            'Tuple : `(a, b)`, non mutable, pratique pour renvoyer plusieurs valeurs ; dépaquetage `x, y = t`.',
            'Liste : `[a, b]`, mutable, indices de 0 à `len(L) - 1`, `append`, compréhension `[f(x) for x in L if cond]`.',
            'Matrice : liste de lignes, `m[i][j]` ; la créer par compréhension.',
            'Dictionnaire : `{cle: valeur}`, accès `d[cle]`, `in` teste les clés, parcours avec `keys()`, `values()`, `items()`.',
            '`b = a` crée un alias, pas une copie. Une fonction peut modifier une liste reçue en paramètre.',
          ],
        },
      ],
    },
  ],

  // =====================================================================
  // EXERCICES
  // =====================================================================
  exercices: [
    {
      id: 'indices-prediction',
      title: 'Prévoir l’affichage : indices et tuples',
      difficulty: 1,
      duration: 10,
      tags: ['tuples', 'listes', 'indices'],
      statement: [
        { type: 'p', text: 'Donner la valeur de chaque expression, ou l’erreur produite.' },
        py(String.raw`
t = (4, 'nsi', 2.5, True)
L = [10, 20, 30, 40, 50]
t[1]            # (a)
t[-1]           # (b)
len(t)          # (c)
L[5]            # (d)
L[len(L) - 1]   # (e)
L[1:3]          # (f)
t[0] = 5        # (g)
L[0] = 5        # (h) puis afficher L
`),
      ],
      hints: ['Les indices commencent à 0.', 'Un tuple n’est pas mutable.'],
      solution: [
        {
          type: 'list',
          items: [
            '(a) `\'nsi\'` (b) `True` (c) `4`.',
            '(d) `IndexError` : `L` a 5 éléments, d’indices 0 à 4.',
            '(e) `50`, le dernier élément.',
            '(f) `[20, 30]` : indices 1 et 2 (l’indice 3 est exclu).',
            '(g) `TypeError: \'tuple\' object does not support item assignment`.',
            '(h) `L` devient `[5, 20, 30, 40, 50]`.',
          ],
        },
      ],
    },
    {
      id: 'comprehension',
      title: 'Listes en compréhension',
      difficulty: 1,
      duration: 15,
      tags: ['compréhension', 'listes'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Que valent `[2 * i + 1 for i in range(5)]` et `[c for c in \'informatique\' if c in \'aeiou\']` ?',
            'Écrire par compréhension la liste des multiples de 7 compris entre 0 et 100.',
            'Étant donné `mots = [\'chat\', \'a\', \'elephant\', \'nsi\']`, écrire par compréhension la liste des longueurs des mots de plus de 2 lettres.',
            'Réécrire la compréhension `[x * x for x in t if x > 0]` avec une boucle `for` et `append`.',
          ],
        },
      ],
      hints: ['Le dernier multiple de 7 inférieur à 100 est 98.', 'Une compréhension avec `if` correspond à un `if` dans le corps de la boucle.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '`[1, 3, 5, 7, 9]` et `[\'i\', \'o\', \'a\', \'i\', \'u\', \'e\']`.',
            '`[7 * k for k in range(15)]` (de 0 à 98) ou `[n for n in range(101) if n % 7 == 0]`.',
            '`[len(m) for m in mots if len(m) > 2]` donne `[4, 8, 3]`.',
          ],
        },
        py(String.raw`
resultat = []
for x in t:
    if x > 0:
        resultat.append(x * x)
`),
      ],
    },
    {
      id: 'fonction-tuple',
      title: 'Fonction renvoyant un p-uplet',
      difficulty: 1,
      duration: 15,
      tags: ['tuples', 'programmation', 'fonctions'],
      statement: [
        {
          type: 'p',
          text: 'Écrire une fonction `stats(notes)` qui prend un tableau non vide de notes et renvoie le triplet `(minimum, maximum, moyenne)` **sans utiliser** `min`, `max` ni `sum`. Écrire ensuite l’appel qui récupère les trois valeurs dans trois variables.',
        },
      ],
      hints: ['Initialiser le minimum et le maximum avec le premier élément.', 'Utiliser le dépaquetage : `a, b, c = stats(...)`.'],
      solution: [
        py(String.raw`
def stats(notes):
    mini = notes[0]
    maxi = notes[0]
    total = 0
    for n in notes:
        if n < mini:
            mini = n
        if n > maxi:
            maxi = n
        total = total + n
    return (mini, maxi, total / len(notes))

bas, haut, moy = stats([12, 8, 17, 15])
print(bas, haut, moy)       # 8 17 13.0
assert stats([10]) == (10, 10, 10.0)
`),
        {
          type: 'p',
          text: 'Initialiser `mini` à 0 serait une erreur : si toutes les notes sont positives, le minimum trouvé serait 0, qui n’est pas dans le tableau. On initialise donc avec un élément du tableau.',
        },
      ],
    },
    {
      id: 'parcours-tableau',
      title: 'Algorithmes de parcours',
      difficulty: 2,
      duration: 20,
      tags: ['listes', 'parcours', 'programmation'],
      statement: [
        { type: 'p', text: 'Écrire les fonctions suivantes (sans utiliser `in`, `index` ni `count` sur les listes) :' },
        {
          type: 'list',
          ordered: true,
          items: [
            '`compte(t, x)` renvoie le nombre d’occurrences de `x` dans `t`.',
            '`indice(t, x)` renvoie l’indice de la première occurrence de `x` dans `t`, ou −1 si `x` est absent.',
            '`est_croissant(t)` renvoie `True` si le tableau est trié dans l’ordre croissant (au sens large).',
          ],
        },
      ],
      hints: [
        'Pour `indice`, on a besoin des positions : parcourir avec `range(len(t))`.',
        'Pour `est_croissant`, comparer `t[i]` et `t[i + 1]` : attention à ne pas dépasser le dernier indice.',
      ],
      solution: [
        py(String.raw`
def compte(t, x):
    n = 0
    for v in t:
        if v == x:
            n = n + 1
    return n

def indice(t, x):
    for i in range(len(t)):
        if t[i] == x:
            return i          # on sort dès la première occurrence
    return -1                 # la boucle est finie : x est absent

def est_croissant(t):
    for i in range(len(t) - 1):     # i + 1 doit rester un indice valide
        if t[i] > t[i + 1]:
            return False
    return True

assert compte([1, 3, 1, 1], 1) == 3
assert indice([5, 8, 8], 8) == 1
assert indice([5, 8], 2) == -1
assert est_croissant([1, 2, 2, 7]) and not est_croissant([3, 1])
assert est_croissant([])
`),
        {
          type: 'p',
          text: 'Dans `est_croissant`, on s’arrête à `len(t) - 2` (car `range(len(t) - 1)` exclut `len(t) - 1`), sinon `t[i + 1]` provoquerait une `IndexError`. Le `return -1` de `indice` doit être **après** la boucle, pas dans un `else` à l’intérieur.',
        },
      ],
    },
    {
      id: 'alias-mutabilite',
      title: 'Alias et mutabilité',
      difficulty: 2,
      duration: 15,
      tags: ['mutabilité', 'alias', 'listes'],
      statement: [
        { type: 'p', text: 'Prévoir l’affichage de chacun des programmes suivants, en justifiant.' },
        py(String.raw`
# Programme 1
a = [1, 2, 3]
b = a
b.append(4)
print(a)

# Programme 2
a = [1, 2, 3]
b = a
b = b + [4]
print(a, b)

# Programme 3
def f(t):
    t[0] = 'X'
    t = ['Y']
    return t
L = ['a', 'b']
M = f(L)
print(L, M)

# Programme 4
m = [[0] * 2] * 2
m[1][0] = 5
print(m)
`),
      ],
      hints: ['`append` modifie l’objet ; `+` crée un nouvel objet.', 'Dans le programme 3, `t = [\'Y\']` réaffecte le nom local `t`.'],
      solution: [
        {
          type: 'list',
          items: [
            '**Programme 1** : `[1, 2, 3, 4]`. `b` est un alias de `a` ; `append` modifie l’unique liste.',
            '**Programme 2** : `[1, 2, 3] [1, 2, 3, 4]`. `b + [4]` crée une nouvelle liste, que `b` désigne désormais ; `a` n’est pas modifiée.',
            '**Programme 3** : `[\'X\', \'b\'] [\'Y\']`. `t[0] = \'X\'` modifie la liste de l’appelant (alias). Puis `t = [\'Y\']` fait désigner à `t` une nouvelle liste, sans effet sur `L`.',
            '**Programme 4** : `[[5, 0], [5, 0]]`. Les deux lignes sont le même objet.',
          ],
        },
      ],
    },
    {
      id: 'matrices',
      title: 'Manipuler des matrices',
      difficulty: 2,
      duration: 25,
      tags: ['matrices', 'tableaux de tableaux', 'programmation'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire une fonction `matrice_nulle(n, p)` qui renvoie une matrice de `n` lignes et `p` colonnes remplie de 0.',
            'Écrire une fonction `somme_colonne(m, j)` qui renvoie la somme des éléments de la colonne `j`.',
            'Écrire une fonction `diagonale(m)` qui renvoie la liste des éléments `m[i][i]` d’une matrice carrée, par compréhension.',
            'Écrire une fonction `table_multiplication(n)` qui renvoie la matrice `n × n` dont l’élément `[i][j]` vaut `(i + 1) * (j + 1)`.',
          ],
        },
      ],
      hints: ['Utiliser une compréhension pour éviter le piège des lignes partagées.', 'La colonne `j` est formée des `m[i][j]` pour `i` de 0 à `len(m) - 1`.'],
      solution: [
        py(String.raw`
def matrice_nulle(n, p):
    return [[0] * p for i in range(n)]

def somme_colonne(m, j):
    s = 0
    for i in range(len(m)):
        s = s + m[i][j]
    return s

def diagonale(m):
    return [m[i][i] for i in range(len(m))]

def table_multiplication(n):
    return [[(i + 1) * (j + 1) for j in range(n)] for i in range(n)]

m = [[1, 2, 3],
     [4, 5, 6],
     [7, 8, 9]]
assert somme_colonne(m, 1) == 15
assert diagonale(m) == [1, 5, 9]
assert table_multiplication(3) == [[1, 2, 3], [2, 4, 6], [3, 6, 9]]
z = matrice_nulle(2, 3)
z[0][0] = 1
assert z == [[1, 0, 0], [0, 0, 0]]     # les lignes sont bien indépendantes
`),
      ],
    },
    {
      id: 'dictionnaire-notes',
      title: 'Dictionnaires : un carnet de notes',
      difficulty: 2,
      duration: 20,
      tags: ['dictionnaires', 'parcours', 'programmation'],
      statement: [
        { type: 'p', text: 'On dispose du dictionnaire suivant :' },
        py(String.raw`
notes = {'Lina': 15, 'Tom': 9, 'Jade': 18, 'Noah': 12}
`),
        {
          type: 'list',
          ordered: true,
          items: [
            'Comment ajouter l’élève Inès avec la note 14 ? Comment corriger la note de Tom à 10 ?',
            'Que renvoient `\'Jade\' in notes`, `18 in notes`, `notes.get(\'Paul\')` ?',
            'Écrire une fonction `moyenne(d)` qui renvoie la moyenne des notes.',
            'Écrire une fonction `meilleur(d)` qui renvoie le couple (nom, note) de l’élève ayant la meilleure note.',
            'Écrire, par compréhension, la liste des noms des élèves ayant au moins 12.',
          ],
        },
      ],
      hints: ['`in` teste les clés.', 'Parcourir `d.items()` pour avoir à la fois le nom et la note.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '`notes[\'Inès\'] = 14` (nouvelle clé : ajout) et `notes[\'Tom\'] = 10` (clé existante : modification).',
            '`True` ; `False` (18 est une valeur, pas une clé) ; `None` (pas d’erreur avec `get`).',
          ],
        },
        py(String.raw`
def moyenne(d):
    total = 0
    for n in d.values():
        total = total + n
    return total / len(d)

def meilleur(d):
    nom_max = None
    note_max = None
    for nom, note in d.items():
        if note_max is None or note > note_max:   # évaluation paresseuse !
            nom_max = nom
            note_max = note
    return (nom_max, note_max)

notes = {'Lina': 15, 'Tom': 9, 'Jade': 18, 'Noah': 12}
print(moyenne(notes))     # 13.5
print(meilleur(notes))    # ('Jade', 18)
admis = [nom for nom in notes if notes[nom] >= 12]
print(admis)              # ['Lina', 'Jade', 'Noah']
`),
        {
          type: 'p',
          text: 'Dans `meilleur`, si `note_max` est `None` (premier tour), la comparaison `note > note_max` n’est pas évaluée grâce à l’évaluation paresseuse de `or` ; sinon elle provoquerait une `TypeError`.',
        },
      ],
    },
    {
      id: 'occurrences-mots',
      title: 'Fréquence des mots',
      difficulty: 3,
      duration: 25,
      tags: ['dictionnaires', 'chaînes', 'programmation'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire une fonction `frequences(texte)` qui renvoie un dictionnaire associant à chaque mot du texte son nombre d’apparitions. On utilisera `texte.split()`, qui renvoie la liste des mots séparés par des espaces.',
            'Écrire une fonction `plus_frequent(freq)` qui renvoie le mot le plus fréquent.',
            'Écrire une fonction `inverser(d)` qui, à partir d’un dictionnaire `{mot: nombre}`, construit le dictionnaire `{nombre: [liste des mots ayant ce nombre]}`.',
          ],
        },
      ],
      hints: [
        'Utiliser `d.get(mot, 0) + 1` pour éviter de traiter à part la première apparition.',
        'Pour `inverser`, si la clé `nombre` n’existe pas encore, l’initialiser avec une liste vide.',
      ],
      solution: [
        py(String.raw`
def frequences(texte):
    freq = {}
    for mot in texte.split():
        freq[mot] = freq.get(mot, 0) + 1
    return freq

def plus_frequent(freq):
    meilleur_mot = ''
    meilleur_nb = 0
    for mot, nb in freq.items():
        if nb > meilleur_nb:
            meilleur_mot = mot
            meilleur_nb = nb
    return meilleur_mot

def inverser(d):
    res = {}
    for mot, nb in d.items():
        if nb not in res:
            res[nb] = []
        res[nb].append(mot)
    return res

f = frequences('le chat et le chien et le rat')
print(f)                  # {'le': 3, 'chat': 1, 'et': 2, 'chien': 1, 'rat': 1}
print(plus_frequent(f))   # le
print(inverser(f))        # {3: ['le'], 1: ['chat', 'chien', 'rat'], 2: ['et']}
`),
        {
          type: 'p',
          text: 'Dans `inverser`, les valeurs du nouveau dictionnaire sont des listes (mutables) : `res[nb].append(mot)` modifie la liste stockée dans le dictionnaire, sans avoir besoin de réaffecter `res[nb]`.',
        },
      ],
    },
    {
      id: 'type-bac-cinema',
      title: 'Type bac : réservations dans une salle de cinéma',
      difficulty: 3,
      duration: 35,
      tags: ['type bac', 'matrices', 'tuples', 'dictionnaires'],
      statement: [
        {
          type: 'p',
          text: 'Une salle de cinéma de 5 rangées de 8 fauteuils est représentée par une matrice `salle` : `salle[r][f]` vaut `True` si le fauteuil `f` de la rangée `r` est réservé, `False` sinon. Les réservations sont enregistrées dans un dictionnaire `reservations` qui associe à un nom de client la **liste des tuples** `(rangée, fauteuil)` réservés.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire l’instruction qui crée la salle vide. Pourquoi ne faut-il pas écrire `[[False] * 8] * 5` ?',
            'Écrire une fonction `places_libres(salle)` qui renvoie le nombre de fauteuils libres.',
            'Écrire une fonction `reserver(salle, reservations, nom, r, f)` qui réserve le fauteuil s’il est libre et renvoie `True`, ou renvoie `False` s’il est déjà pris. Le client peut avoir déjà réservé d’autres places.',
            'Pourquoi peut-on utiliser des tuples `(r, f)` comme clés de dictionnaire, mais pas des listes `[r, f]` ?',
            'Écrire une fonction `rangee_complete(salle, r)` qui renvoie `True` si toute la rangée `r` est réservée, en une ligne, à l’aide d’une compréhension.',
          ],
        },
      ],
      hints: [
        'La fonction `reserver` modifie la matrice et le dictionnaire reçus en paramètres : ce sont des objets mutables.',
        'Pour la question 5, comparer une liste construite par compréhension avec la liste `[True] * 8`, ou compter les `False`.',
      ],
      solution: [
        py(String.raw`
salle = [[False] * 8 for r in range(5)]
`),
        {
          type: 'p',
          text: '1. Avec `[[False] * 8] * 5`, les 5 rangées seraient **le même objet** liste : réserver un fauteuil de la rangée 0 le réserverait dans toutes les rangées.',
        },
        py(String.raw`
def places_libres(salle):
    n = 0
    for rangee in salle:
        for occupe in rangee:
            if not occupe:
                n = n + 1
    return n

def reserver(salle, reservations, nom, r, f):
    if salle[r][f]:
        return False
    salle[r][f] = True
    if nom not in reservations:
        reservations[nom] = []
    reservations[nom].append((r, f))
    return True

def rangee_complete(salle, r):
    return [f for f in range(len(salle[r])) if not salle[r][f]] == []

salle = [[False] * 8 for r in range(5)]
reservations = {}
assert reserver(salle, reservations, 'Ana', 2, 3)
assert reserver(salle, reservations, 'Ana', 2, 4)
assert not reserver(salle, reservations, 'Bilal', 2, 3)   # déjà pris
assert reservations == {'Ana': [(2, 3), (2, 4)]}
assert places_libres(salle) == 38
assert not rangee_complete(salle, 2)
for f in range(8):
    reserver(salle, reservations, 'Groupe', 0, f)
assert rangee_complete(salle, 0)
`),
        {
          type: 'p',
          text: '4. Les clés d’un dictionnaire doivent être **non mutables** (hachables) : si une clé pouvait être modifiée après son insertion, le dictionnaire ne la retrouverait plus. Un tuple n’est pas mutable, une liste l’est : `{[2, 3]: \'Ana\'}` provoque `TypeError: unhashable type: \'list\'`.',
        },
        {
          type: 'p',
          text: '5. La compréhension construit la liste des fauteuils libres de la rangée ; la rangée est complète si cette liste est vide. Variante : `return salle[r] == [True] * len(salle[r])`.',
        },
      ],
    },
  ],

  // =====================================================================
  // REPRÉSENTATIONS
  // =====================================================================
  representations: [
    {
      type: 'widget',
      id: 'python-tracer',
      props: { program: 'somme' },
      title: 'Parcours d’un tableau pas à pas',
      caption: 'Suivez l’évolution de l’indice et de l’accumulateur au fil du parcours.',
    },
    {
      type: 'widget',
      id: 'python-tracer',
      props: { program: 'max' },
      title: 'Recherche du maximum',
      caption: 'Observez quand la variable du maximum est mise à jour.',
    },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Avec `L = [3, 6, 9, 12]`, que vaut `L[-2]` ?',
          choices: ['`6`', '`9`', '`12`', '`IndexError`'],
          answer: 1,
          explanation: '`L[-1]` est 12, `L[-2]` est 9.',
        },
        {
          question: 'Lequel de ces objets est un tuple à un seul élément ?',
          choices: ['`(5)`', '`[5]`', '`(5,)`', "`{5}`"],
          answer: 2,
          explanation: '`(5)` est l’entier 5 ; la virgule est indispensable.',
        },
        {
          question: 'Que vaut `[x * 2 for x in range(4) if x != 2]` ?',
          choices: ['`[0, 2, 4, 6]`', '`[0, 2, 6]`', '`[2, 6]`', '`[0, 1, 3]`'],
          answer: 1,
          explanation: 'x prend 0, 1, 3 (2 est exclu) ; les doubles sont 0, 2, 6.',
        },
        {
          question: 'Avec `m = [[1, 2], [3, 4], [5, 6]]`, que vaut `m[2][0]` ?',
          choices: ['`2`', '`3`', '`5`', '`6`'],
          answer: 2,
          explanation: 'Ligne d’indice 2 : `[5, 6]`, colonne 0 : 5.',
        },
        {
          question: 'Après `a = [1, 2]` puis `b = a` puis `b.append(3)`, que vaut `a` ?',
          choices: ['`[1, 2]`', '`[1, 2, 3]`', '`[3]`', 'Erreur'],
          answer: 1,
          explanation: '`b` est un alias de `a`.',
        },
        {
          question: 'Avec `d = {\'a\': 1, \'b\': 2}`, que renvoie `2 in d` ?',
          choices: ['`True`', '`False`', '`KeyError`', '`\'b\'`'],
          answer: 1,
          explanation: '`in` teste les clés ; 2 est une valeur.',
        },
        {
          question: 'Lequel de ces types ne peut pas être une clé de dictionnaire ?',
          choices: ['`str`', '`int`', '`tuple`', '`list`'],
          answer: 3,
          explanation: 'Une liste est mutable, donc non hachable.',
        },
        {
          question: 'Comment parcourir à la fois les clés et les valeurs d’un dictionnaire `d` ?',
          choices: ['`for k, v in d:`', '`for k, v in d.items():`', '`for k, v in d.values():`', '`for (k, v) in d.keys():`'],
          answer: 1,
        },
        {
          question: 'Quelle instruction provoque une erreur ?',
          choices: ['`t = (1, 2); t = t + (3,)`', '`t = (1, 2); t[0] = 3`', '`L = [1, 2]; L[0] = 3`', '`d = {}; d[(1, 2)] = 3`'],
          answer: 1,
          explanation: 'On ne peut pas modifier un élément d’un tuple. (La première ligne crée un nouveau tuple : c’est permis.)',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Tuple : mutable ou non ?', back: 'Non mutable.' },
        { front: 'Écrire un tuple à un élément', back: '`(5,)` — la virgule est obligatoire.' },
        { front: 'Indices valides d’une liste de longueur n', back: 'De 0 à n − 1 (ou de −n à −1).' },
        { front: 'Ajouter un élément en fin de liste', back: '`L.append(x)` (modifie L, renvoie None).' },
        { front: 'Syntaxe d’une liste en compréhension', back: '`[expr for x in iterable if condition]`' },
        { front: 'Élément ligne i, colonne j d’une matrice m', back: '`m[i][j]`' },
        { front: 'Créer une matrice n × p de zéros', back: '`[[0] * p for i in range(n)]`' },
        { front: 'Pourquoi pas `[[0] * p] * n` ?', back: 'Les n lignes seraient le même objet.' },
        { front: 'Ajouter ou modifier une entrée de dictionnaire', back: '`d[cle] = valeur`' },
        { front: '`cle in d` teste…', back: '…la présence de la clé (pas des valeurs).' },
        { front: 'Lire une valeur avec une valeur par défaut', back: '`d.get(cle, defaut)`' },
        { front: 'Parcourir les couples d’un dictionnaire', back: '`for k, v in d.items():`' },
        { front: 'Que fait `b = a` si a est une liste ?', back: 'Crée un alias : a et b désignent la même liste.' },
        { front: 'Copier une liste', back: '`a.copy()`, `list(a)` ou `a[:]`' },
        { front: 'Types mutables au programme', back: '`list` et `dict`' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque expression à sa valeur',
      pairs: [
        { left: '`[i for i in range(3)]`', right: '`[0, 1, 2]`' },
        { left: '`(1, 2) + (3,)`', right: '`(1, 2, 3)`' },
        { left: "`len({'a': 1, 'b': 2})`", right: '`2`' },
        { left: '`[[1, 2], [3, 4]][1][0]`', right: '`3`' },
        { left: '`[0] * 3`', right: '`[0, 0, 0]`' },
        { left: "`{'x': 5}.get('y', 0)`", right: '`0`' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'Un {{tuple|p-uplet}} est une séquence non mutable, alors qu’une {{liste}} est mutable. Le premier élément d’une liste L est L[{{0}}] et le dernier L[{{-1|len(L) - 1|len(L)-1}}]. Dans un dictionnaire, on accède à une valeur grâce à sa {{clé|cle}}. L’instruction b = a ne copie pas la liste : elle crée un {{alias}}.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Un tuple peut contenir des éléments de types différents.', answer: true },
        { text: '`L = L.append(5)` ajoute 5 à la liste L.', answer: false, explanation: '`append` renvoie `None` : L vaut alors `None`.' },
        { text: 'On peut accéder au premier couple d’un dictionnaire avec `d[0]`.', answer: false, explanation: '`d[0]` cherche la clé 0.' },
        { text: 'Une fonction peut modifier une liste passée en paramètre.', answer: true, explanation: 'Le paramètre est un alias de la liste de l’appelant.' },
        { text: 'Dans un dictionnaire, deux clés peuvent être égales.', answer: false, explanation: 'Les clés sont uniques ; une nouvelle affectation remplace la valeur.' },
        { text: '`for x in t: x = 0` met tous les éléments de t à 0.', answer: false, explanation: 'Il faut passer par les indices : `t[i] = 0`.' },
      ],
    },
    {
      type: 'svg',
      svg: aliasSvg,
      maxWidth: 680,
      caption: 'À gauche, un alias (deux noms, un objet) ; à droite, une copie (deux objets).',
    },
  ],
}

export default chapter
