import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'langages-programmation',
  subject: 'nsi',
  order: 7,
  title: 'Langages et programmation',
  theme: 'Langages et programmation',
  summary:
    'Constructions élémentaires de Python (variables, conditions, boucles, fonctions), spécification, préconditions et assertions, tests, documentation, mise au point, bibliothèques et diversité des langages.',
  duration: '4 semaines',
  objectives: [
    'Mettre en évidence un corpus de constructions élémentaires : séquences, affectation, conditionnelles, boucles bornées et non bornées, appels de fonction.',
    'Prototyper une fonction, décrire ses préconditions et postconditions (spécification).',
    'Vérifier une précondition à l’aide d’une assertion (`assert`).',
    'Écrire une documentation (docstring) et des jeux de tests pour une fonction.',
    'Utiliser des jeux de tests, repérer et corriger les erreurs (mise au point) ; connaître les pièges des flottants et des effets de bord.',
    'Utiliser la documentation d’une bibliothèque (`math`, `random`…) et importer des modules.',
    'Repérer, dans un nouveau langage, les traits communs et les traits particuliers à ce langage (diversité et unité des langages).',
  ],
  keywords: [
    'variable',
    'affectation',
    'type',
    'if',
    'for',
    'while',
    'range',
    'fonction',
    'return',
    'spécification',
    'précondition',
    'postcondition',
    'assert',
    'docstring',
    'test',
    'bogue',
    'module',
    'import',
    'paradigme',
    'compilé',
    'interprété',
  ],

  // ===================================================================
  // FICHE
  // ===================================================================
  fiche: [
    { type: 'h2', text: '1. Constructions élémentaires' },
    {
      type: 'table',
      headers: ['Construction', 'Syntaxe Python', 'À retenir'],
      rows: [
        ['Affectation', '`x = 3`', 'on évalue la droite, puis on range la valeur dans `x`'],
        ['Conditionnelle', '`if … :` / `elif … :` / `else :`', 'un seul bloc exécuté ; indentation = 4 espaces'],
        ['Boucle bornée', '`for i in range(a, b, p) :`', '`i` prend $a, a+p, \\dots$ **strictement avant** $b$'],
        ['Boucle non bornée', '`while condition :`', 'tant que la condition est vraie ; attention à la terminaison'],
        ['Fonction', '`def f(x) :` … `return y`', '`return` renvoie une valeur et **termine** la fonction'],
        ['Assertion', '`assert condition, "message"`', 'lève `AssertionError` si la condition est fausse'],
      ],
    },
    {
      type: 'keyvalue',
      items: [
        { key: '`int`', value: 'entier (taille arbitraire) : `7`, `-12`' },
        { key: '`float`', value: 'flottant (valeur approchée) : `3.14`, `1e-3`' },
        { key: '`bool`', value: '`True` / `False` ; opérateurs `and`, `or`, `not`' },
        { key: '`str`', value: 'chaîne de caractères : `"NSI"`, `len("NSI")` vaut 3' },
        { key: '`//` et `%`', value: 'quotient et reste de la division euclidienne : `17 // 5` → 3, `17 % 5` → 2' },
        { key: '`**`', value: 'puissance : `2 ** 10` → 1024' },
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
            '`=` affecte, `==` compare.',
            '`range(n)` va de 0 à $n-1$ : il y a $n$ tours.',
            '`print` **affiche**, `return` **renvoie** : une fonction sans `return` renvoie `None`.',
            '`0.1 + 0.2 == 0.3` vaut `False` : on ne teste jamais l’égalité de deux flottants.',
            'Une boucle `while` dont la condition reste toujours vraie ne s’arrête jamais.',
          ],
        },
      ],
    },
    { type: 'h2', text: '2. Spécifier, documenter, tester' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Spécification d’une fonction',
      content: [
        {
          type: 'list',
          items: [
            '**Prototype** (signature) : nom, paramètres et leur type, type de la valeur renvoyée.',
            '**Précondition** : ce qui doit être vrai sur les paramètres *avant* l’appel.',
            '**Postcondition** : ce qui est garanti sur le résultat *après* l’appel.',
          ],
        },
      ],
    },
    {
      type: 'code',
      lang: 'python',
      code: `def moyenne(notes: list) -> float:
    """Renvoie la moyenne des nombres de la liste notes.
    Précondition : notes est une liste non vide de nombres.
    """
    assert len(notes) > 0, "la liste ne doit pas être vide"
    total = 0
    for note in notes:
        total = total + note
    return total / len(notes)

assert moyenne([10, 12, 14]) == 12      # test
assert moyenne([7]) == 7                # test d'un cas limite`,
      caption: 'Prototype annoté, docstring, assertion de précondition et tests.',
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Tests',
      content: [
        {
          type: 'p',
          text: 'Un test compare le résultat obtenu au résultat attendu. On teste les **cas généraux** et les **cas limites** (liste vide ou d’un seul élément, valeurs négatives, zéro, bornes). ==Un test réussi ne prouve pas que le programme est correct== ; un test qui échoue prouve qu’il y a un bogue.',
        },
      ],
    },
    { type: 'h2', text: '3. Bibliothèques et langages' },
    {
      type: 'list',
      items: [
        '`import math` puis `math.sqrt(2)` ; `from random import randint` puis `randint(1, 6)` (1 et 6 **inclus**).',
        '`help(fonction)` affiche la docstring ; `dir(module)` liste le contenu d’un module.',
        '**Langage compilé** (C, Rust) : traduit une fois en code machine. **Interprété** (Python, JavaScript) : exécuté par un programme interprète (Python compile en fait vers un *bytecode* exécuté par une machine virtuelle).',
        '**Paradigmes** : impératif (instructions qui modifient l’état), fonctionnel (fonctions sans effet de bord), objet (objets avec attributs et méthodes). Python est multi-paradigme.',
        'Unité des langages : ils partagent les mêmes constructions de base (affectation, séquence, test, boucle, fonction).',
      ],
    },
  ],

  // ===================================================================
  // COURS
  // ===================================================================
  cours: [
    { type: 'h2', text: 'Introduction : qu’est-ce qu’un programme ?' },
    {
      type: 'p',
      text: 'Un **algorithme** est une suite finie et non ambiguë d’instructions permettant de résoudre un problème. Un **programme** est la traduction d’un algorithme dans un **langage de programmation**, c’est-à-dire un langage formel, à la syntaxe stricte, qui peut être exécuté par une machine. En NSI, le langage de référence est **Python** (version 3).',
    },
    {
      type: 'p',
      text: 'Quel que soit le langage, on retrouve un petit nombre de **constructions élémentaires** : la séquence d’instructions, l’affectation, l’instruction conditionnelle, les boucles et l’appel de fonctions. Ce chapitre les étudie en détail, puis montre comment écrire des programmes **fiables** : spécifier, documenter, tester, déboguer.',
    },

    // ---------- Variables
    { type: 'h2', text: '1. Variables, types et affectation' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Variable et affectation',
      content: [
        {
          type: 'p',
          text: 'Une **variable** est un nom qui désigne une valeur stockée en mémoire. L’**affectation** `x = expression` se lit « `x` reçoit la valeur de l’expression » : Python **évalue d’abord** l’expression de droite, **puis** associe le résultat au nom `x`.',
        },
      ],
    },
    {
      type: 'code',
      lang: 'python',
      code: `a = 5          # a reçoit 5
b = a + 2      # on évalue a + 2 = 7, puis b reçoit 7
a = a * 3      # on évalue a * 3 = 15, puis a reçoit 15 (b vaut toujours 7)
a, b = b, a    # affectation multiple : échange des valeurs -> a = 7, b = 15`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'L’affectation n’est pas une égalité mathématique',
      content: [
        {
          type: 'p',
          text: '`x = x + 1` n’a aucun sens en mathématiques mais est très courant en programmation : la nouvelle valeur de `x` est l’ancienne augmentée de 1 (on dit qu’on **incrémente** `x`). On écrit aussi `x += 1`.',
        },
      ],
    },
    { type: 'h3', text: 'Les types de base' },
    {
      type: 'table',
      headers: ['Type', 'Exemples', 'Opérations usuelles'],
      rows: [
        ['`int` (entier)', '`0`, `42`, `-7`, `2**100`', '`+ - * // % **` ; les entiers Python n’ont pas de limite de taille'],
        ['`float` (flottant)', '`3.5`, `-0.1`, `1e6`', '`+ - * / **` ; valeur **approchée** (norme IEEE 754)'],
        ['`bool` (booléen)', '`True`, `False`', '`and`, `or`, `not` ; résultats de `== != < <= > >=`'],
        ['`str` (chaîne)', '`"Bonjour"`, `\'a\'`, `""`', 'concaténation `+`, répétition `*`, `len(s)`, `s[i]`'],
        ['`list` (tableau)', '`[3, 1, 4]`, `[]`', '`len(t)`, `t[i]`, `t.append(x)` (voir chapitre sur les tableaux)'],
      ],
    },
    {
      type: 'p',
      text: 'La fonction `type(valeur)` donne le type d’une valeur. Les fonctions `int()`, `float()`, `str()` convertissent : `int("12")` vaut `12`, `str(3.5)` vaut `"3.5"`, `int(3.9)` vaut `3` (troncature).',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Division : trois opérateurs',
      content: [
        {
          type: 'list',
          items: [
            '`17 / 5` vaut `3.4` : division décimale, toujours un `float`.',
            '`17 // 5` vaut `3` : quotient de la division euclidienne.',
            '`17 % 5` vaut `2` : reste de la division euclidienne ($17 = 5 \\times 3 + 2$).',
            'Test de parité : `n % 2 == 0` est vrai si et seulement si `n` est pair.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Les flottants sont approchés',
      content: [
        {
          type: 'p',
          text: 'Les flottants sont codés en binaire sur 64 bits ; $0{,}1$ n’a pas d’écriture binaire finie et est donc arrondi. Ainsi `0.1 + 0.2` vaut `0.30000000000000004` et `0.1 + 0.2 == 0.3` vaut `False`. Pour comparer deux flottants, on teste plutôt `abs(x - y) < 1e-9`.',
        },
      ],
    },
    { type: 'h3', text: 'Entrées et sorties' },
    {
      type: 'code',
      lang: 'python',
      code: `nom = input("Comment t'appelles-tu ? ")   # input renvoie TOUJOURS une chaîne
age = int(input("Quel âge as-tu ? "))      # conversion nécessaire pour calculer
print("Bonjour", nom, "! Dans 10 ans tu auras", age + 10, "ans.")
print(f"{nom} a {age} ans.")              # f-string : valeurs insérées entre accolades`,
    },

    // ---------- Conditions
    { type: 'h2', text: '2. Instructions conditionnelles' },
    {
      type: 'p',
      text: 'L’instruction `if` exécute un bloc d’instructions seulement si une **condition** (expression booléenne) est vraie. Les blocs sont délimités par l’**indentation** (4 espaces) et la ligne d’en-tête se termine par `:`.',
    },
    {
      type: 'code',
      lang: 'python',
      code: `def mention(note):
    if note >= 16:
        return "Très bien"
    elif note >= 14:
        return "Bien"
    elif note >= 12:
        return "Assez bien"
    elif note >= 10:
        return "Passable"
    else:
        return "Non admis"`,
      caption: 'Les conditions sont testées dans l’ordre : dès qu’une est vraie, son bloc est exécuté et les suivantes sont ignorées.',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Opérateurs booléens et évaluation paresseuse',
      content: [
        {
          type: 'table',
          headers: ['`a`', '`b`', '`a and b`', '`a or b`', '`not a`'],
          rows: [
            ['`True`', '`True`', '`True`', '`True`', '`False`'],
            ['`True`', '`False`', '`False`', '`True`', '`False`'],
            ['`False`', '`True`', '`False`', '`True`', '`True`'],
            ['`False`', '`False`', '`False`', '`False`', '`True`'],
          ],
        },
        {
          type: 'p',
          text: 'Python évalue `and` et `or` **de gauche à droite** et s’arrête dès que le résultat est connu (évaluation *paresseuse* ou *en court-circuit*). Ainsi `i < len(t) and t[i] == 0` ne provoque jamais d’erreur d’indice : si `i < len(t)` est faux, `t[i]` n’est pas évalué.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Année bissextile',
      content: [
        {
          type: 'p',
          text: 'Une année est bissextile si elle est divisible par 4 mais pas par 100, ou si elle est divisible par 400. En une seule expression booléenne :',
        },
        {
          type: 'code',
          lang: 'python',
          code: `def est_bissextile(annee):
    return (annee % 4 == 0 and annee % 100 != 0) or annee % 400 == 0

# 2024 -> True, 1900 -> False, 2000 -> True, 2027 -> False`,
        },
      ],
    },

    // ---------- Boucles
    { type: 'h2', text: '3. Boucles bornées : `for`' },
    {
      type: 'p',
      text: 'Une boucle **bornée** répète un bloc un nombre de fois **connu à l’avance**. En Python, `for variable in séquence:` parcourt les éléments d’une séquence : un `range`, une chaîne, une liste…',
    },
    {
      type: 'table',
      headers: ['Appel', 'Valeurs prises', 'Nombre de tours'],
      rows: [
        ['`range(5)`', '0, 1, 2, 3, 4', '5'],
        ['`range(2, 6)`', '2, 3, 4, 5', '4'],
        ['`range(1, 10, 3)`', '1, 4, 7', '3'],
        ['`range(10, 0, -2)`', '10, 8, 6, 4, 2', '5'],
        ['`range(3, 3)`', 'aucune', '0'],
      ],
      caption: '`range(début, fin, pas)` : la valeur `fin` n’est jamais atteinte.',
    },
    {
      type: 'code',
      lang: 'python',
      code: `# Somme des entiers de 1 à n
def somme(n):
    s = 0
    for i in range(1, n + 1):
        s = s + i
    return s

# Parcours d'une chaîne caractère par caractère
def nb_voyelles(mot):
    compteur = 0
    for lettre in mot:
        if lettre in "aeiouy":
            compteur = compteur + 1
    return compteur

print(somme(100))            # 5050
print(nb_voyelles("python")) # 2 (y et o)`,
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Faire une trace d’exécution',
      content: [
        {
          type: 'p',
          text: 'Pour comprendre une boucle, on dresse un **tableau de suivi** : une colonne par variable, une ligne par tour de boucle. Exemple avec `somme(4)` :',
        },
        {
          type: 'table',
          headers: ['Étape', '`i`', '`s`'],
          rows: [
            ['initialisation', '—', '0'],
            ['tour 1', '1', '1'],
            ['tour 2', '2', '3'],
            ['tour 3', '3', '6'],
            ['tour 4', '4', '10'],
          ],
        },
        { type: 'p', text: 'La fonction renvoie 10. On vérifie avec la formule $\\frac{n(n+1)}{2} = \\frac{4 \\times 5}{2} = 10$.' },
      ],
    },
    {
      type: 'p',
      text: 'Les boucles peuvent être **imbriquées** : pour chaque tour de la boucle externe, la boucle interne est exécutée entièrement.',
    },
    {
      type: 'code',
      lang: 'python',
      code: `for i in range(1, 4):
    ligne = ""
    for j in range(1, 4):
        ligne = ligne + str(i * j) + " "
    print(ligne)
# 1 2 3
# 2 4 6
# 3 6 9`,
      caption: 'Table de multiplication : 3 × 3 = 9 exécutions du corps de la boucle interne.',
    },

    { type: 'h2', text: '4. Boucles non bornées : `while`' },
    {
      type: 'p',
      text: 'Une boucle **non bornée** répète un bloc **tant qu’une condition est vraie** ; le nombre de tours n’est pas connu à l’avance. La condition est testée **avant** chaque tour : si elle est fausse dès le départ, le corps n’est jamais exécuté.',
    },
    {
      type: 'svg',
      svg: `<svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <rect x="140" y="10" width="140" height="34" fill="none" stroke="currentColor"/>
  <text x="210" y="32" text-anchor="middle" fill="currentColor">initialisation</text>
  <line x1="210" y1="44" x2="210" y2="70" stroke="currentColor"/>
  <polygon points="205,64 210,72 215,64" fill="currentColor"/>
  <polygon points="210,72 290,105 210,138 130,105" fill="none" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>
  <text x="210" y="109" text-anchor="middle" fill="currentColor">condition ?</text>
  <line x1="210" y1="138" x2="210" y2="170" stroke="currentColor"/>
  <polygon points="205,164 210,172 215,164" fill="currentColor"/>
  <text x="218" y="158" fill="hsl(142 71% 45%)">vraie</text>
  <rect x="140" y="172" width="140" height="34" fill="none" stroke="currentColor"/>
  <text x="210" y="194" text-anchor="middle" fill="currentColor">corps de la boucle</text>
  <polyline points="140,189 70,189 70,105 128,105" fill="none" stroke="currentColor"/>
  <polygon points="122,100 130,105 122,110" fill="currentColor"/>
  <line x1="290" y1="105" x2="370" y2="105" stroke="currentColor"/>
  <polygon points="364,100 372,105 364,110" fill="currentColor"/>
  <text x="300" y="97" fill="hsl(0 84% 60%)">fausse</text>
  <text x="380" y="109" fill="currentColor">suite</text>
  <text x="210" y="240" text-anchor="middle" fill="currentColor" font-size="12">La condition est réévaluée après chaque exécution du corps.</text>
</svg>`,
      caption: 'Organigramme d’une boucle `while`.',
      maxWidth: 480,
    },
    {
      type: 'code',
      lang: 'python',
      code: `def nb_chiffres(n):
    """Renvoie le nombre de chiffres de l'entier n >= 1 en base 10."""
    compteur = 0
    while n > 0:
        n = n // 10          # on retire le chiffre des unités
        compteur = compteur + 1
    return compteur

print(nb_chiffres(2027))   # 4`,
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Terminaison et variant de boucle',
      content: [
        {
          type: 'p',
          text: 'Pour prouver qu’une boucle `while` **termine**, on exhibe un **variant de boucle** : une quantité **entière**, **positive** (tant que la boucle s’exécute) et qui **décroît strictement** à chaque tour. Une suite d’entiers naturels strictement décroissante ne peut pas être infinie, donc la boucle s’arrête.',
        },
        {
          type: 'p',
          text: 'Dans `nb_chiffres`, $n$ est un variant : c’est un entier, il est strictement positif dans la boucle, et $n // 10 < n$ pour $n \\geqslant 1$.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Boucle infinie',
      content: [
        {
          type: 'code',
          lang: 'python',
          code: `i = 0
while i < 10:
    print(i)
# oubli de i = i + 1 : i vaut toujours 0, la condition reste vraie -> boucle infinie`,
        },
        { type: 'p', text: 'Dans un terminal ou un IDE, on interrompt un programme bloqué avec **Ctrl + C**.' },
      ],
    },
    {
      type: 'table',
      headers: ['', '`for`', '`while`'],
      rows: [
        ['Nombre de tours', 'connu à l’avance', 'inconnu, dépend d’une condition'],
        ['Terminaison', 'garantie (parcours d’une séquence finie)', 'à démontrer (variant)'],
        ['Exemple typique', 'parcourir un tableau, répéter $n$ fois', 'attendre un événement, diviser jusqu’à 0, recherche'],
      ],
      caption: 'Toute boucle `for` peut s’écrire avec un `while`, mais pas l’inverse en général.',
    },

    // ---------- Fonctions
    { type: 'h2', text: '5. Fonctions' },
    {
      type: 'p',
      text: 'Une **fonction** est un bloc d’instructions nommé et réutilisable. Elle reçoit des **paramètres** et peut **renvoyer** une valeur avec `return`. On la **définit** une fois avec `def`, puis on l’**appelle** autant de fois que nécessaire avec des **arguments**.',
    },
    {
      type: 'code',
      lang: 'python',
      code: `def aire_rectangle(longueur, largeur):   # définition : paramètres longueur, largeur
    return longueur * largeur

a = aire_rectangle(4, 2.5)   # appel : arguments 4 et 2.5 -> a vaut 10.0
print(aire_rectangle(3, 3))  # 9`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: '`print` n’est pas `return`',
      content: [
        {
          type: 'code',
          lang: 'python',
          code: `def carre_affiche(x):
    print(x * x)        # affiche, ne renvoie rien (None)

def carre(x):
    return x * x        # renvoie la valeur

y = carre_affiche(3)    # affiche 9, mais y vaut None
z = carre(3) + 1        # z vaut 10`,
        },
        {
          type: 'p',
          text: 'Dès qu’une instruction `return` est exécutée, la fonction **s’arrête** : les instructions suivantes du corps ne sont pas exécutées.',
        },
      ],
    },
    { type: 'h3', text: 'Portée des variables' },
    {
      type: 'p',
      text: 'Une variable affectée **dans** une fonction est **locale** : elle n’existe que pendant l’exécution de la fonction et n’est pas visible à l’extérieur. Une variable définie au niveau principal du programme est **globale** ; une fonction peut la lire, mais une affectation dans la fonction crée une nouvelle variable locale du même nom.',
    },
    {
      type: 'code',
      lang: 'python',
      code: `x = 10            # variable globale

def f():
    x = 5         # variable LOCALE, distincte du x global
    return x * 2

print(f())        # 10
print(x)          # 10 : le x global n'a pas été modifié`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Bonne pratique',
      content: [
        {
          type: 'p',
          text: 'Une fonction bien écrite ne dépend que de ses **paramètres** et communique son résultat par `return`. On évite d’utiliser des variables globales dans les fonctions : le code est plus lisible, plus facile à tester et à réutiliser.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Effet de bord sur une liste',
      content: [
        {
          type: 'p',
          text: 'Une liste passée en argument n’est **pas copiée** : si la fonction la modifie (`t.append(…)`, `t[i] = …`), la modification est visible après l’appel. C’est un **effet de bord**. Il faut le signaler dans la documentation, ou travailler sur une copie (`t2 = list(t)`).',
        },
        {
          type: 'code',
          lang: 'python',
          code: `def ajoute_zero(t):
    t.append(0)

notes = [12, 15]
ajoute_zero(notes)
print(notes)    # [12, 15, 0] : la liste d'origine a été modifiée`,
        },
      ],
    },

    // ---------- Spécification
    { type: 'h2', text: '6. Spécification d’une fonction' },
    {
      type: 'p',
      text: 'Avant d’écrire une fonction, on précise **ce qu’elle fait** (et non comment elle le fait) : c’est sa **spécification**. Elle constitue un contrat entre celui qui écrit la fonction et celui qui l’utilise.',
    },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Prototype', text: 'Nom, paramètres (et leurs types), type renvoyé. Ex. `maximum(t: list) -> int`.', icon: 'FileSignature' },
        { title: 'Précondition', text: 'Conditions sur les entrées que l’appelant doit respecter. Ex. « `t` est une liste non vide d’entiers ».', icon: 'LogIn' },
        { title: 'Postcondition', text: 'Propriété garantie sur le résultat. Ex. « renvoie un élément de `t` supérieur ou égal à tous les autres ».', icon: 'LogOut' },
      ],
    },
    {
      type: 'p',
      text: 'Python permet d’**annoter** les types dans le prototype (`def f(x: int) -> bool:`). Ces annotations sont purement informatives : Python ne les vérifie pas à l’exécution, mais elles documentent le code et sont exploitées par les éditeurs et des outils comme `mypy`.',
    },
    { type: 'h3', text: 'Vérifier une précondition avec `assert`' },
    {
      type: 'p',
      text: 'L’instruction `assert condition, "message"` ne fait rien si la condition est vraie ; sinon elle **interrompt** le programme en levant une erreur `AssertionError` accompagnée du message. On l’utilise pour vérifier les préconditions : un appel incorrect est détecté immédiatement, avec un message clair, au lieu de produire un résultat faux plus loin.',
    },
    {
      type: 'code',
      lang: 'python',
      code: `def maximum(t: list) -> int:
    """Renvoie le plus grand élément de la liste t.
    Précondition : t est une liste non vide d'entiers.
    Postcondition : le résultat appartient à t et est >= à chaque élément de t.
    """
    assert len(t) > 0, "maximum d'une liste vide"
    m = t[0]
    for x in t:
        if x > m:
            m = x
    return m

maximum([3, 8, 2])   # 8
maximum([])          # AssertionError: maximum d'une liste vide`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Assertion ou test `if` ?',
      content: [
        {
          type: 'p',
          text: 'Une assertion sert à détecter une **erreur de programmation** (un appel qui ne respecte pas le contrat). Pour gérer une situation normale prévue (une saisie utilisateur incorrecte, par exemple), on utilise un `if` et on traite le cas. Les assertions peuvent être désactivées (option `python -O`) : elles ne doivent jamais être indispensables au fonctionnement du programme.',
        },
      ],
    },

    // ---------- Documentation
    { type: 'h2', text: '7. Documenter son code' },
    {
      type: 'p',
      text: 'La **docstring** est une chaîne entre triples guillemets placée **juste après** la ligne `def`. Elle décrit la fonction : rôle, paramètres, valeur renvoyée, préconditions, effets de bord. Elle est accessible avec `help(nom_fonction)`. Les **commentaires** (`# …`) expliquent un point délicat du code ; ils ne remplacent pas des noms de variables bien choisis.',
    },
    {
      type: 'code',
      lang: 'python',
      code: `def est_premier(n: int) -> bool:
    """Indique si l'entier n est un nombre premier.

    Paramètre : n, entier.
    Renvoie : True si n est premier, False sinon.

    >>> est_premier(7)
    True
    >>> est_premier(1)
    False
    >>> est_premier(21)
    False
    """
    if n < 2:
        return False
    d = 2
    while d * d <= n:          # inutile d'aller au-delà de la racine de n
        if n % d == 0:
            return False
        d = d + 1
    return True

help(est_premier)   # affiche la docstring`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Le module `doctest`',
      content: [
        {
          type: 'p',
          text: 'Les exemples `>>>` d’une docstring peuvent être exécutés automatiquement : `import doctest` puis `doctest.testmod()` compare chaque résultat obtenu au résultat écrit. Rien ne s’affiche si tout est correct.',
        },
      ],
    },

    // ---------- Tests
    { type: 'h2', text: '8. Tester un programme' },
    {
      type: 'p',
      text: 'Un **jeu de tests** est un ensemble d’appels dont on connaît le résultat attendu. On l’écrit souvent **avant** ou **en même temps** que la fonction. En Python, le plus simple est une suite d’assertions :',
    },
    {
      type: 'code',
      lang: 'python',
      code: `def test_maximum():
    assert maximum([3, 8, 2]) == 8         # cas général
    assert maximum([5]) == 5               # un seul élément
    assert maximum([-4, -2, -9]) == -2     # uniquement des négatifs
    assert maximum([1, 7, 7]) == 7         # maximum répété
    assert maximum([9, 1, 2]) == 9         # maximum en première position
    assert maximum([1, 2, 9]) == 9         # maximum en dernière position
    print("Tous les tests sont passés")

test_maximum()`,
    },
    {
      type: 'steps',
      items: [
        { title: 'Cas général', text: 'Un ou deux exemples « typiques » dont on calcule le résultat à la main.' },
        { title: 'Cas limites', text: 'Liste vide ou à un élément, chaîne vide, 0, nombres négatifs, première et dernière position, bornes d’un intervalle.' },
        { title: 'Cas particuliers', text: 'Valeurs répétées, liste déjà triée ou triée à l’envers, élément absent…' },
        { title: 'Relancer les tests', text: 'Après chaque modification du code, on relance tous les tests (tests de non-régression).' },
      ],
    },
    {
      type: 'quote',
      text: 'Program testing can be used to show the presence of bugs, but never to show their absence.',
      author: 'Edsger W. Dijkstra',
      source: 'Notes on Structured Programming, 1970',
    },
    {
      type: 'p',
      text: 'Autrement dit : les tests ne couvrent qu’un nombre fini de cas. Pour être **certain** qu’un algorithme est correct, il faut une **preuve** (par exemple à l’aide d’un invariant de boucle, voir le chapitre sur les tris).',
    },

    // ---------- Mise au point
    { type: 'h2', text: '9. Mise au point (débogage)' },
    {
      type: 'p',
      text: 'Un **bogue** (*bug*) est une erreur dans un programme. On distingue trois grandes familles :',
    },
    {
      type: 'table',
      headers: ['Type d’erreur', 'Quand ?', 'Exemples'],
      rows: [
        ['Erreur de **syntaxe**', 'avant l’exécution', '`:` oublié, parenthèse non fermée, mauvaise indentation (`SyntaxError`, `IndentationError`)'],
        ['Erreur d’**exécution**', 'pendant l’exécution (le programme plante)', 'division par zéro (`ZeroDivisionError`), indice hors limites (`IndexError`), variable inconnue (`NameError`), `"3" + 2` (`TypeError`)'],
        ['Erreur de **logique**', 'le programme tourne mais le résultat est faux', 'mauvaise borne de `range`, `<` au lieu de `<=`, initialisation incorrecte'],
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Lire un message d’erreur',
      content: [
        {
          type: 'code',
          lang: 'text',
          code: `Traceback (most recent call last):
  File "notes.py", line 7, in <module>
    print(moyenne([]))
  File "notes.py", line 4, in moyenne
    return total / len(notes)
ZeroDivisionError: division by zero`,
        },
        {
          type: 'p',
          text: 'On lit **de bas en haut** : la dernière ligne donne le **type** et la **cause** de l’erreur ; les lignes au-dessus indiquent le fichier et le **numéro de ligne** où elle s’est produite, puis l’enchaînement des appels qui y a mené.',
        },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Reproduire', text: 'Trouver un appel (un test) qui met l’erreur en évidence.' },
        { title: 'Localiser', text: 'Lire le message d’erreur ; ajouter des `print` des variables à des endroits clés, ou utiliser le débogueur pas à pas de l’IDE (Thonny, VS Code…).' },
        { title: 'Comprendre', text: 'Faire une trace à la main et comparer avec les valeurs affichées.' },
        { title: 'Corriger et retester', text: 'Corriger, puis relancer **tous** les tests, y compris celui qui révélait l’erreur.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Un bogue classique',
      content: [
        {
          type: 'code',
          lang: 'python',
          code: `def maximum_bogue(t):
    m = 0              # ERREUR : initialisation arbitraire
    for x in t:
        if x > m:
            m = x
    return m

maximum_bogue([3, 8, 2])     # 8 : le test passe...
maximum_bogue([-4, -2, -9])  # 0 : faux ! 0 n'est même pas dans la liste`,
        },
        {
          type: 'p',
          text: 'Correction : initialiser `m` avec le premier élément `t[0]`. Ce bogue n’est révélé que par un test avec des valeurs négatives : d’où l’importance des cas limites.',
        },
      ],
    },

    // ---------- Bibliothèques
    { type: 'h2', text: '10. Utiliser des bibliothèques' },
    {
      type: 'p',
      text: 'Une **bibliothèque** (ou **module**) est un ensemble de fonctions déjà écrites et testées. La **bibliothèque standard** de Python est livrée avec le langage ; d’autres (comme `matplotlib`, `pandas`) s’installent séparément. Il est essentiel de savoir lire leur **documentation**.',
    },
    {
      type: 'code',
      lang: 'python',
      code: `import math                        # importe le module entier
print(math.sqrt(16))               # 4.0
print(math.pi)                     # 3.141592653589793
print(math.floor(3.7), math.ceil(3.2))   # 3 4

from random import randint, random # importe seulement certaines fonctions
de = randint(1, 6)                 # entier aléatoire entre 1 et 6 INCLUS
x = random()                       # flottant aléatoire dans [0 ; 1[

import turtle as t                 # alias
t.forward(100)`,
    },
    {
      type: 'table',
      headers: ['Module', 'Fonctions utiles'],
      rows: [
        ['`math`', '`sqrt`, `pi`, `floor`, `ceil`, `cos`, `sin`, `log`, `exp`, `gcd`'],
        ['`random`', '`randint(a, b)`, `random()`, `choice(liste)`, `shuffle(liste)`'],
        ['`time`', '`time()` (mesurer une durée), `sleep(s)`'],
        ['`turtle`', 'dessin : `forward`, `left`, `right`, `penup`, `pendown`'],
        ['`matplotlib.pyplot`', 'tracer des graphiques : `plot`, `show` (à installer)'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Explorer un module',
      content: [
        {
          type: 'p',
          text: '`dir(math)` liste les noms définis dans le module ; `help(math.sqrt)` affiche la documentation d’une fonction. La documentation officielle se trouve sur docs.python.org (en français).',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Éviter `from module import *`',
      content: [
        {
          type: 'p',
          text: 'Cette forme importe tous les noms du module et peut **écraser** silencieusement des noms existants (par exemple une variable `e` ou `pi` du programme). On préfère `import math` ou un import explicite des fonctions utiles.',
        },
      ],
    },

    // ---------- Diversité des langages
    { type: 'h2', text: '11. Diversité et unité des langages' },
    {
      type: 'p',
      text: 'Il existe des centaines de langages de programmation. Ils diffèrent par leur syntaxe, leur mode d’exécution, leur typage et leur paradigme, mais partagent les **mêmes constructions de base**. Voici la même fonction « somme des entiers de 1 à $n$ » dans trois langages :',
    },
    {
      type: 'code',
      lang: 'python',
      code: `def somme(n):
    s = 0
    for i in range(1, n + 1):
        s = s + i
    return s`,
      caption: 'Python : blocs délimités par l’indentation, typage dynamique.',
    },
    {
      type: 'code',
      lang: 'c',
      code: `int somme(int n) {
    int s = 0;
    for (int i = 1; i <= n; i++) {
        s = s + i;
    }
    return s;
}`,
      caption: 'C : blocs entre accolades, instructions terminées par `;`, types déclarés (typage statique), langage compilé.',
    },
    {
      type: 'code',
      lang: 'javascript',
      code: `function somme(n) {
    let s = 0;
    for (let i = 1; i <= n; i++) {
        s = s + i;
    }
    return s;
}`,
      caption: 'JavaScript : syntaxe proche du C, typage dynamique, exécuté par le navigateur web.',
    },
    {
      type: 'table',
      headers: ['Critère', 'Variantes', 'Exemples'],
      rows: [
        ['Exécution', '**compilé** (traduit en code machine avant exécution) / **interprété** (exécuté par un interprète)', 'C, Rust, Go / Python, JavaScript, PHP'],
        ['Typage', '**statique** (types vérifiés avant l’exécution) / **dynamique** (types connus à l’exécution)', 'C, Java, OCaml / Python, JavaScript'],
        ['Paradigme', '**impératif**, **fonctionnel**, **objet**, logique', 'C (impératif), Haskell (fonctionnel), Java (objet), Prolog (logique)'],
        ['Niveau', '**bas niveau** (proche de la machine) / **haut niveau**', 'assembleur / Python'],
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Paradigmes de programmation',
      content: [
        {
          type: 'list',
          items: [
            '**Impératif** : le programme est une suite d’instructions qui modifient l’état de la mémoire (affectations, boucles).',
            '**Fonctionnel** : le programme est une composition de fonctions, sans modification d’état (pas d’affectation, récursivité plutôt que boucles).',
            '**Orienté objet** : le programme manipule des objets regroupant des données (attributs) et des comportements (méthodes).',
          ],
        },
        { type: 'p', text: 'Python, JavaScript ou OCaml sont **multi-paradigmes** : ils permettent plusieurs styles.' },
      ],
    },
    {
      type: 'timeline',
      events: [
        { date: '1843', title: 'Ada Lovelace', text: 'Publie un algorithme destiné à la machine analytique de Babbage : considéré comme le premier programme.' },
        { date: '1957', title: 'Fortran', text: 'John Backus (IBM) : premier langage de haut niveau largement diffusé, pour le calcul scientifique.' },
        { date: '1958', title: 'Lisp', text: 'John McCarthy : langage fonctionnel, pionnier de l’intelligence artificielle.' },
        { date: '1959', title: 'COBOL', text: 'Langage de gestion, inspiré des travaux de Grace Hopper.' },
        { date: '1970', title: 'Pascal', text: 'Niklaus Wirth : langage conçu pour l’enseignement de la programmation structurée.' },
        { date: '1972', title: 'C', text: 'Dennis Ritchie (Bell Labs) : langage du système Unix, encore omniprésent.' },
        { date: '1991', title: 'Python', text: 'Guido van Rossum : langage lisible, aujourd’hui l’un des plus utilisés au monde.' },
        { date: '1995', title: 'Java et JavaScript', text: 'Java (Sun Microsystems) et JavaScript (Brendan Eich, Netscape) : le Web devient programmable.' },
        { date: '2015', title: 'Rust 1.0', text: 'Langage compilé axé sur la sûreté de la mémoire.' },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Unité des langages',
      content: [
        {
          type: 'p',
          text: 'Face à un nouveau langage, on cherche comment s’écrivent : l’affectation, la conditionnelle, les boucles bornée et non bornée, la définition et l’appel d’une fonction, les tableaux. Une fois ces traits communs repérés, on identifie les **traits particuliers** (typage, gestion de la mémoire, syntaxe des blocs…).',
        },
      ],
    },
  ],

  // ===================================================================
  // EXERCICES
  // ===================================================================
  exercices: [
    {
      id: 'lp-ex1',
      title: 'Suivre des affectations',
      difficulty: 1,
      duration: 5,
      tags: ['affectation', 'trace'],
      statement: [
        { type: 'p', text: 'Qu’affiche le programme suivant ? Justifier par un tableau de suivi des variables.' },
        {
          type: 'code',
          lang: 'python',
          code: `x = 3
y = 5
x = x + y
y = x - y
x = x - y
print(x, y)`,
        },
      ],
      hints: ['Une affectation utilise les valeurs **actuelles** des variables.', 'Faire une ligne par instruction.'],
      solution: [
        {
          type: 'table',
          headers: ['Instruction', '`x`', '`y`'],
          rows: [
            ['`x = 3`', '3', '—'],
            ['`y = 5`', '3', '5'],
            ['`x = x + y`', '8', '5'],
            ['`y = x - y`', '8', '3'],
            ['`x = x - y`', '5', '3'],
          ],
        },
        {
          type: 'p',
          text: 'Le programme affiche `5 3` : il **échange** les valeurs de `x` et `y` sans variable auxiliaire. En Python, on écrirait plus simplement `x, y = y, x`.',
        },
      ],
    },
    {
      id: 'lp-ex2',
      title: 'Boucles `for` et `range`',
      difficulty: 1,
      duration: 10,
      tags: ['for', 'range'],
      statement: [
        { type: 'p', text: '1. Donner la liste des valeurs prises par `i` dans chacune des boucles : `for i in range(6)`, `for i in range(2, 11, 3)`, `for i in range(5, 0, -1)`.' },
        { type: 'p', text: '2. Écrire une fonction `somme_carres(n)` qui renvoie $1^2 + 2^2 + \\dots + n^2$. Vérifier que `somme_carres(4)` vaut 30.' },
        { type: 'p', text: '3. Écrire une fonction `table(n)` qui affiche la table de multiplication de `n` de 1 à 10 sous la forme `7 x 3 = 21`.' },
      ],
      hints: ['La borne de fin de `range` est exclue.', 'Pour aller jusqu’à $n$ inclus : `range(1, n + 1)`.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '`range(6)` : 0, 1, 2, 3, 4, 5 (6 valeurs). `range(2, 11, 3)` : 2, 5, 8 (11 serait la suivante mais est exclue). `range(5, 0, -1)` : 5, 4, 3, 2, 1.',
            'On accumule les carrés dans une variable initialisée à 0.',
          ],
        },
        {
          type: 'code',
          lang: 'python',
          code: `def somme_carres(n):
    s = 0
    for k in range(1, n + 1):
        s = s + k ** 2
    return s

assert somme_carres(4) == 30    # 1 + 4 + 9 + 16 = 30
assert somme_carres(0) == 0     # cas limite : boucle jamais exécutée

def table(n):
    for k in range(1, 11):
        print(n, "x", k, "=", n * k)

table(7)   # 7 x 1 = 7 ... 7 x 10 = 70`,
        },
        { type: 'p', text: '`table` ne renvoie rien (elle **affiche**) : c’est une fonction à effet de bord, qui renvoie `None`.' },
      ],
    },
    {
      id: 'lp-ex3',
      title: 'Conditions : année bissextile et jours du mois',
      difficulty: 1,
      duration: 15,
      tags: ['if', 'booléens'],
      statement: [
        { type: 'p', text: 'Une année est bissextile si elle est divisible par 4 mais pas par 100, ou si elle est divisible par 400.' },
        { type: 'p', text: '1. Écrire une fonction `est_bissextile(annee)` qui renvoie un booléen. Tester avec 2024, 1900, 2000 et 2027.' },
        { type: 'p', text: '2. Écrire une fonction `nb_jours(mois, annee)` qui renvoie le nombre de jours du mois (numéroté de 1 à 12). Ajouter une assertion vérifiant que `mois` est entre 1 et 12.' },
      ],
      hints: ['« divisible par 4 » se teste avec `annee % 4 == 0`.', 'Avril, juin, septembre et novembre ont 30 jours.'],
      solution: [
        {
          type: 'code',
          lang: 'python',
          code: `def est_bissextile(annee):
    return (annee % 4 == 0 and annee % 100 != 0) or annee % 400 == 0

assert est_bissextile(2024) == True
assert est_bissextile(1900) == False   # divisible par 100 mais pas par 400
assert est_bissextile(2000) == True    # divisible par 400
assert est_bissextile(2027) == False

def nb_jours(mois, annee):
    """Renvoie le nombre de jours du mois donné (1 à 12) de l'année."""
    assert 1 <= mois <= 12, "mois invalide"
    if mois == 2:
        if est_bissextile(annee):
            return 29
        else:
            return 28
    elif mois in [4, 6, 9, 11]:
        return 30
    else:
        return 31

assert nb_jours(2, 2024) == 29
assert nb_jours(2, 2027) == 28
assert nb_jours(11, 2027) == 30
assert nb_jours(12, 2027) == 31`,
        },
        {
          type: 'p',
          text: 'Python autorise les comparaisons enchaînées : `1 <= mois <= 12` équivaut à `1 <= mois and mois <= 12`. L’expression booléenne de `est_bissextile` étant déjà un booléen, il est inutile d’écrire `if … : return True else: return False`.',
        },
      ],
    },
    {
      id: 'lp-ex4',
      title: 'Boucle `while` : la suite de Syracuse',
      difficulty: 2,
      duration: 15,
      tags: ['while', 'terminaison'],
      statement: [
        {
          type: 'p',
          text: 'On part d’un entier $n \\geqslant 1$. Tant que $n \\neq 1$ : si $n$ est pair, on le divise par 2 ; sinon on le remplace par $3n + 1$.',
        },
        { type: 'p', text: '1. Calculer à la main les termes obtenus à partir de $n = 6$.' },
        { type: 'p', text: '2. Écrire une fonction `temps_de_vol(n)` qui renvoie le nombre d’étapes nécessaires pour atteindre 1.' },
        { type: 'p', text: '3. Peut-on exhiber un variant de boucle pour prouver la terminaison ? Commenter.' },
      ],
      hints: ['On ne connaît pas le nombre de tours à l’avance : boucle `while`.', 'Utiliser `n // 2` pour garder un entier.'],
      solution: [
        {
          type: 'p',
          text: '1. $6 \\to 3 \\to 10 \\to 5 \\to 16 \\to 8 \\to 4 \\to 2 \\to 1$ : il faut **8 étapes**.',
        },
        {
          type: 'code',
          lang: 'python',
          code: `def temps_de_vol(n):
    """Nombre d'étapes de la suite de Syracuse partant de n pour atteindre 1.
    Précondition : n entier >= 1.
    """
    assert n >= 1
    etapes = 0
    while n != 1:
        if n % 2 == 0:
            n = n // 2
        else:
            n = 3 * n + 1
        etapes = etapes + 1
    return etapes

assert temps_de_vol(6) == 8
assert temps_de_vol(1) == 0
assert temps_de_vol(27) == 111`,
        },
        {
          type: 'p',
          text: '3. $n$ n’est **pas** un variant : il augmente quand il est impair. En fait, personne ne sait démontrer que cette boucle termine pour tout $n$ : c’est la **conjecture de Syracuse** (ou de Collatz), vérifiée par ordinateur pour des valeurs gigantesques mais toujours non démontrée. C’est un exemple frappant de boucle `while` dont la terminaison n’est pas garantie.',
        },
      ],
    },
    {
      id: 'lp-ex5',
      title: 'Spécification et assertions',
      difficulty: 2,
      duration: 15,
      tags: ['spécification', 'assert', 'docstring'],
      statement: [
        { type: 'p', text: 'On veut écrire une fonction `moyenne_ponderee(notes, coefs)` qui renvoie la moyenne des notes pondérée par les coefficients.' },
        { type: 'p', text: '1. Rédiger le prototype annoté et une docstring précisant les préconditions.' },
        { type: 'p', text: '2. Écrire la fonction en vérifiant les préconditions par des assertions.' },
        { type: 'p', text: '3. Proposer trois tests, dont un cas limite.' },
      ],
      hints: [
        'Que se passe-t-il si les deux listes n’ont pas la même longueur ? Si la somme des coefficients est nulle ?',
        'Moyenne pondérée : $\\dfrac{\\sum n_i c_i}{\\sum c_i}$.',
      ],
      solution: [
        {
          type: 'code',
          lang: 'python',
          code: `def moyenne_ponderee(notes: list, coefs: list) -> float:
    """Renvoie la moyenne des notes pondérée par les coefficients.

    Préconditions :
      - notes et coefs sont deux listes de nombres de même longueur ;
      - les coefficients sont positifs et leur somme est strictement positive.
    Postcondition : le résultat est compris entre la plus petite et la plus grande note.
    """
    assert len(notes) == len(coefs), "les listes doivent avoir la même longueur"
    somme_coefs = 0
    somme_produits = 0
    for i in range(len(notes)):
        assert coefs[i] >= 0, "coefficient négatif"
        somme_coefs = somme_coefs + coefs[i]
        somme_produits = somme_produits + notes[i] * coefs[i]
    assert somme_coefs > 0, "la somme des coefficients doit être non nulle"
    return somme_produits / somme_coefs

assert moyenne_ponderee([10, 16], [1, 1]) == 13
assert moyenne_ponderee([12, 18], [2, 1]) == 14     # (24 + 18) / 3
assert moyenne_ponderee([15], [4]) == 15           # un seul élément`,
        },
        {
          type: 'p',
          text: 'L’appel `moyenne_ponderee([12], [0])` lève `AssertionError: la somme des coefficients doit être non nulle` au lieu d’une `ZeroDivisionError` peu explicite. Remarque : les tests ci-dessus comparent des flottants avec `==`, ce qui fonctionne ici car les résultats sont exacts ; en général on préfère `abs(resultat - attendu) < 1e-9`.',
        },
      ],
    },
    {
      id: 'lp-ex6',
      title: 'Débogage : trouver et corriger les erreurs',
      difficulty: 2,
      duration: 15,
      tags: ['mise au point', 'erreurs'],
      statement: [
        { type: 'p', text: 'La fonction suivante doit renvoyer le nombre d’occurrences de `valeur` dans la liste `t`. Elle contient plusieurs erreurs. Les identifier (syntaxe, exécution, logique) et les corriger.' },
        {
          type: 'code',
          lang: 'python',
          code: `def compte(t, valeur)
    for i in range(1, len(t) + 1):
        if t[i] = valeur:
            nb = nb + 1
    return nb`,
        },
      ],
      hints: ['Il y a deux erreurs de syntaxe.', 'Que vaut `nb` au premier passage ? Quels sont les indices valides d’une liste de longueur $n$ ?'],
      solution: [
        {
          type: 'list',
          items: [
            '**Syntaxe** : il manque `:` à la fin de la ligne `def`.',
            '**Syntaxe** : `=` (affectation) au lieu de `==` (comparaison) dans le `if`.',
            '**Exécution** : `nb` n’est jamais initialisée → `UnboundLocalError` (variable locale utilisée avant affectation).',
            '**Exécution / logique** : les indices vont de 0 à `len(t) - 1` ; avec `range(1, len(t) + 1)`, le premier élément est oublié et `t[len(t)]` provoque une `IndexError`.',
          ],
        },
        {
          type: 'code',
          lang: 'python',
          code: `def compte(t, valeur):
    nb = 0
    for i in range(len(t)):
        if t[i] == valeur:
            nb = nb + 1
    return nb

assert compte([1, 3, 1, 1], 1) == 3
assert compte([1, 3, 1, 1], 5) == 0
assert compte([], 2) == 0
assert compte([4, 2], 4) == 1      # vérifie que le 1er élément est compté`,
        },
        { type: 'p', text: 'On peut aussi parcourir directement les éléments : `for x in t: if x == valeur: …`.' },
      ],
    },
    {
      id: 'lp-ex7',
      title: 'Bibliothèques : simulation de lancers de dés',
      difficulty: 2,
      duration: 20,
      tags: ['random', 'math', 'import'],
      statement: [
        { type: 'p', text: '1. À l’aide du module `random`, écrire une fonction `lancer()` qui simule le lancer d’un dé équilibré à 6 faces.' },
        { type: 'p', text: '2. Écrire une fonction `frequence_six(n)` qui simule `n` lancers et renvoie la fréquence d’apparition du 6. Vers quelle valeur doit-elle tendre quand `n` est grand ?' },
        { type: 'p', text: '3. À l’aide du module `math`, écrire `distance(xa, ya, xb, yb)` qui renvoie la distance entre deux points du plan.' },
      ],
      hints: ['`randint(a, b)` renvoie un entier entre `a` et `b` **inclus**.', '$AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$.'],
      solution: [
        {
          type: 'code',
          lang: 'python',
          code: `from random import randint
import math

def lancer():
    return randint(1, 6)

def frequence_six(n):
    assert n > 0
    nb_six = 0
    for _ in range(n):
        if lancer() == 6:
            nb_six = nb_six + 1
    return nb_six / n

print(frequence_six(100000))   # environ 0.1667

def distance(xa, ya, xb, yb):
    return math.sqrt((xb - xa) ** 2 + (yb - ya) ** 2)

assert distance(0, 0, 3, 4) == 5.0`,
        },
        {
          type: 'p',
          text: 'D’après la loi des grands nombres, la fréquence tend vers la probabilité $\\frac{1}{6} \\approx 0{,}167$. Le nom `_` est une convention pour une variable de boucle inutilisée. Le résultat de `frequence_six` étant aléatoire, on ne peut pas le tester avec `==` : on vérifie seulement qu’il est proche de $1/6$ pour $n$ grand.',
        },
      ],
    },
    {
      id: 'lp-ex8',
      title: 'Portée des variables et effets de bord',
      difficulty: 2,
      duration: 10,
      tags: ['fonction', 'portée'],
      statement: [
        { type: 'p', text: 'Prévoir l’affichage de ce programme, puis expliquer.' },
        {
          type: 'code',
          lang: 'python',
          code: `n = 1
t = [1, 2]

def f(n, t):
    n = n + 10
    t.append(n)
    return n

r = f(n, t)
print(n, t, r)`,
        },
      ],
      hints: ['Le paramètre `n` de `f` est une variable locale.', 'Une liste passée en paramètre n’est pas copiée.'],
      solution: [
        { type: 'p', text: 'Le programme affiche `1 [1, 2, 11] 11`.' },
        {
          type: 'list',
          items: [
            'Dans `f`, `n` est un **paramètre**, donc une variable **locale** initialisée à 1. L’affectation `n = n + 10` donne 11 à ce `n` local ; le `n` global vaut toujours 1.',
            'Le paramètre `t` désigne **la même liste** que la variable globale `t`. `t.append(11)` modifie cette liste : c’est un **effet de bord**, visible après l’appel.',
            '`f` renvoie 11, donc `r` vaut 11.',
          ],
        },
      ],
    },
    {
      id: 'lp-ex9',
      title: 'Nombres premiers : spécifier, programmer, tester',
      difficulty: 3,
      duration: 30,
      tags: ['type bac', 'while', 'tests', 'docstring'],
      statement: [
        { type: 'p', text: 'Un entier $n \\geqslant 2$ est premier s’il n’a pas d’autre diviseur positif que 1 et lui-même.' },
        { type: 'p', text: '1. Écrire une fonction `est_premier(n)` documentée (docstring) qui renvoie `True` si `n` est premier. On pourra s’arrêter dès que $d^2 > n$ : justifier.' },
        { type: 'p', text: '2. Écrire un jeu de tests comportant au moins un cas limite.' },
        { type: 'p', text: '3. Écrire une fonction `premiers_jusqua(n)` qui renvoie la liste des nombres premiers inférieurs ou égaux à `n`. Que renvoie `premiers_jusqua(30)` ?' },
        { type: 'p', text: '4. Justifier la terminaison de la boucle `while` de `est_premier`.' },
      ],
      hints: [
        'Si $n = a \\times b$ avec $2 \\leqslant a \\leqslant b$, alors $a^2 \\leqslant n$.',
        'Les cas $n = 0$ et $n = 1$ doivent renvoyer `False`.',
        'Pour la terminaison, considérer la quantité $n - d$.',
      ],
      solution: [
        {
          type: 'p',
          text: '1. Si $n$ n’est pas premier, $n = a \\times b$ avec $2 \\leqslant a \\leqslant b$ ; alors $a \\times a \\leqslant a \\times b = n$, donc $n$ possède un diviseur $a$ tel que $a^2 \\leqslant n$. Il suffit donc de chercher un diviseur $d$ tant que $d^2 \\leqslant n$.',
        },
        {
          type: 'code',
          lang: 'python',
          code: `def est_premier(n: int) -> bool:
    """Renvoie True si l'entier n est premier, False sinon."""
    if n < 2:
        return False
    d = 2
    while d * d <= n:
        if n % d == 0:
            return False      # diviseur trouvé : on s'arrête
        d = d + 1
    return True

# 2. Jeu de tests
assert est_premier(0) == False     # cas limites
assert est_premier(1) == False
assert est_premier(2) == True      # plus petit nombre premier
assert est_premier(9) == False     # carré d'un premier : teste la borne d * d <= n
assert est_premier(97) == True
assert est_premier(91) == False    # 91 = 7 x 13

# 3.
def premiers_jusqua(n):
    resultat = []
    for k in range(2, n + 1):
        if est_premier(k):
            resultat.append(k)
    return resultat

assert premiers_jusqua(30) == [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`,
        },
        {
          type: 'p',
          text: 'Le test `est_premier(9)` est important : avec la condition `d * d < n` (inégalité stricte), la boucle s’arrêterait à $d = 3$ sans tester 3, et 9 serait déclaré premier à tort.',
        },
        {
          type: 'p',
          text: '4. Dans la boucle, $d^2 \\leqslant n$ donc $d \\leqslant n$ (car $d \\geqslant 1$). La quantité $n - d$ est un **entier positif** qui **diminue de 1** à chaque tour (car $d$ augmente de 1) : c’est un variant de boucle, donc la boucle termine (au plus $\\sqrt{n}$ tours environ).',
        },
      ],
    },
    {
      id: 'lp-ex10',
      title: 'Palindromes (type bac)',
      difficulty: 3,
      duration: 25,
      tags: ['type bac', 'chaînes', 'while'],
      statement: [
        { type: 'p', text: 'Un **palindrome** est un mot qui se lit de la même façon dans les deux sens, comme « kayak » ou « radar ».' },
        { type: 'p', text: '1. Écrire une fonction `inverse(mot)` qui renvoie le mot écrit à l’envers, en utilisant une boucle `for`.' },
        { type: 'p', text: '2. En déduire une fonction `est_palindrome(mot)`.' },
        { type: 'p', text: '3. Écrire une seconde version `est_palindrome2(mot)` avec une boucle `while` et deux indices `g` et `d` qui se rapprochent, s’arrêtant dès qu’une différence est trouvée. Quel est l’intérêt de cette version ?' },
        { type: 'p', text: '4. Donner un jeu de tests commun aux deux versions.' },
      ],
      hints: ['On peut construire la chaîne inversée en ajoutant chaque lettre **devant** le résultat.', 'Comparer `mot[g]` et `mot[d]` avec `g = 0` et `d = len(mot) - 1` au départ.'],
      solution: [
        {
          type: 'code',
          lang: 'python',
          code: `def inverse(mot):
    resultat = ""
    for lettre in mot:
        resultat = lettre + resultat   # la lettre est placée devant
    return resultat

def est_palindrome(mot):
    return mot == inverse(mot)

def est_palindrome2(mot):
    g = 0
    d = len(mot) - 1
    while g < d:
        if mot[g] != mot[d]:
            return False               # arrêt dès la première différence
        g = g + 1
        d = d - 1
    return True

for f in [est_palindrome, est_palindrome2]:
    assert f("kayak") == True
    assert f("radar") == True
    assert f("abba") == True       # longueur paire
    assert f("python") == False
    assert f("a") == True          # un caractère
    assert f("") == True           # chaîne vide
    assert f("ab") == False

assert inverse("NSI") == "ISN"`,
        },
        {
          type: 'p',
          text: '3. La seconde version n’effectue au plus que $n/2$ comparaisons et s’arrête dès la première différence : pour « python », un seul tour suffit (« p » ≠ « n »). La première construit toujours tout le mot inversé. La boucle termine car $d - g$ est un entier qui diminue de 2 à chaque tour et la boucle s’arrête dès qu’il devient $\\leqslant 0$.',
        },
        { type: 'p', text: 'Remarque : en Python, `mot[::-1]` renvoie aussi le mot inversé, mais il faut savoir écrire la boucle.' },
      ],
    },
  ],

  // ===================================================================
  // REPRÉSENTATIONS
  // ===================================================================
  representations: [
    {
      type: 'widget',
      id: 'python-tracer',
      props: { program: 'somme' },
      title: 'Exécution pas à pas : une boucle for',
      caption: 'Observer la ligne courante et l’évolution des variables à chaque tour de boucle.',
    },
    {
      type: 'widget',
      id: 'python-tracer',
      props: { program: 'factorielle' },
      title: 'Exécution pas à pas : une fonction',
      caption: 'Suivre l’appel d’une fonction, ses variables locales et la valeur renvoyée.',
    },
    {
      type: 'svg',
      svg: `<svg viewBox="0 0 520 230" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="13">
  <rect x="10" y="20" width="130" height="60" fill="none" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>
  <text x="75" y="45" text-anchor="middle" fill="currentColor">Précondition</text>
  <text x="75" y="64" text-anchor="middle" fill="currentColor" font-size="11">vérifiée par assert</text>
  <line x1="140" y1="50" x2="190" y2="50" stroke="currentColor"/>
  <polygon points="184,45 192,50 184,55" fill="currentColor"/>
  <rect x="192" y="10" width="136" height="80" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="260" y="40" text-anchor="middle" fill="currentColor">def f(x) :</text>
  <text x="260" y="58" text-anchor="middle" fill="currentColor" font-size="11">"""docstring"""</text>
  <text x="260" y="76" text-anchor="middle" fill="currentColor" font-size="11">corps</text>
  <line x1="328" y1="50" x2="378" y2="50" stroke="currentColor"/>
  <polygon points="372,45 380,50 372,55" fill="currentColor"/>
  <rect x="380" y="20" width="130" height="60" fill="none" stroke="hsl(142 71% 45%)" stroke-width="1.5"/>
  <text x="445" y="45" text-anchor="middle" fill="currentColor">Postcondition</text>
  <text x="445" y="64" text-anchor="middle" fill="currentColor" font-size="11">garantie sur return</text>
  <rect x="120" y="140" width="280" height="60" fill="none" stroke="hsl(25 95% 53%)" stroke-width="1.5" stroke-dasharray="5 3"/>
  <text x="260" y="165" text-anchor="middle" fill="currentColor">Tests : assert f(entrée) == attendu</text>
  <text x="260" y="185" text-anchor="middle" fill="currentColor" font-size="11">cas généraux + cas limites</text>
  <line x1="260" y1="140" x2="260" y2="92" stroke="currentColor" stroke-dasharray="3 3"/>
  <polygon points="255,98 260,90 265,98" fill="currentColor"/>
</svg>`,
      caption: 'Le contrat d’une fonction : spécification (pré/postconditions), documentation et tests.',
      maxWidth: 560,
    },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Combien de fois le corps de `for i in range(3, 12, 2):` est-il exécuté ?',
          choices: ['4', '5', '9', '10'],
          answer: 1,
          explanation: '`i` prend les valeurs 3, 5, 7, 9, 11 : 5 tours (12 est exclu).',
        },
        {
          question: 'Que vaut `17 // 5 + 17 % 5` ?',
          choices: ['3', '5', '5.4', '2'],
          answer: 1,
          explanation: '`17 // 5` vaut 3 et `17 % 5` vaut 2 : la somme vaut 5.',
        },
        {
          question: 'Que renvoie une fonction Python qui se termine sans instruction `return` ?',
          choices: ['0', 'une erreur', '`None`', 'la dernière valeur calculée'],
          answer: 2,
          explanation: 'Sans `return`, une fonction renvoie la valeur spéciale `None`.',
        },
        {
          question: 'Que se passe-t-il à l’exécution de `assert 2 + 2 == 5, "calcul faux"` ?',
          choices: ['Rien', 'Affiche « calcul faux » et continue', 'Lève une `AssertionError` et interrompt le programme', 'Renvoie `False`'],
          answer: 2,
          explanation: 'La condition est fausse : `assert` lève `AssertionError: calcul faux`.',
        },
        {
          question: 'Que vaut `0.1 + 0.2 == 0.3` en Python ?',
          choices: ['`True`', '`False`', 'Une erreur', '`None`'],
          answer: 1,
          explanation: 'Les flottants sont approchés : `0.1 + 0.2` vaut `0.30000000000000004`.',
        },
        {
          question: 'Après `x = 4` puis `while x > 0: x = x - 3`, que vaut `x` ?',
          choices: ['0', '1', '-2', 'La boucle ne termine pas'],
          answer: 2,
          explanation: '`x` passe de 4 à 1 (1 > 0, on continue) puis à -2 ; la condition devient fausse.',
        },
        {
          question: 'Quelle affirmation sur les tests est correcte ?',
          choices: [
            'Si tous les tests passent, le programme est correct.',
            'Un test qui échoue montre la présence d’un bogue (dans le programme ou dans le test).',
            'Il est inutile de tester les cas limites.',
            'Un test se fait uniquement avec `print`.',
          ],
          answer: 1,
          explanation: 'Les tests montrent la présence de bogues, jamais leur absence (Dijkstra).',
        },
        {
          question: 'Lequel de ces langages est généralement **compilé** en code machine ?',
          choices: ['Python', 'JavaScript', 'C', 'PHP'],
          answer: 2,
          explanation: 'Le C est compilé ; Python, JavaScript et PHP sont exécutés par un interprète (éventuellement via un bytecode ou une compilation à la volée).',
        },
        {
          question: 'Après `from random import randint`, quelles valeurs peut renvoyer `randint(1, 6)` ?',
          choices: ['1 à 5', '0 à 6', '1 à 6', '0 à 5'],
          answer: 2,
          explanation: 'Contrairement à `range`, `randint(a, b)` inclut les deux bornes.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Affectation `x = x + 1`', back: 'On évalue `x + 1` avec l’ancienne valeur, puis `x` reçoit le résultat (incrémentation).' },
        { front: 'Valeurs de `range(a, b)`', back: '$a, a+1, \\dots, b-1$ : la borne $b$ est exclue ; $b - a$ valeurs.' },
        { front: 'Boucle bornée vs non bornée', back: '`for` : nombre de tours connu à l’avance. `while` : répète tant qu’une condition est vraie.' },
        { front: 'Variant de boucle', back: 'Quantité entière, positive, strictement décroissante à chaque tour : prouve la terminaison.' },
        { front: 'Précondition', back: 'Condition sur les paramètres qui doit être vraie avant l’appel de la fonction.' },
        { front: 'Postcondition', back: 'Propriété garantie sur le résultat (ou l’état) après l’appel.' },
        { front: '`assert condition, "msg"`', back: 'Ne fait rien si la condition est vraie, sinon lève `AssertionError: msg`.' },
        { front: 'Docstring', back: 'Chaîne entre `"""` juste après `def` ; documente la fonction ; affichée par `help()`.' },
        { front: 'Cas limites à tester', back: 'Liste vide / à un élément, 0, négatifs, première et dernière position, bornes.' },
        { front: 'Variable locale', back: 'Variable affectée dans une fonction : n’existe que pendant l’appel, invisible à l’extérieur.' },
        { front: 'Effet de bord', back: 'Modification d’un état extérieur à la fonction (liste passée en paramètre, affichage, variable globale).' },
        { front: '`import math` vs `from math import sqrt`', back: '1er cas : on écrit `math.sqrt(2)`. 2e cas : on écrit directement `sqrt(2)`.' },
        { front: 'Compilé / interprété', back: 'Compilé : traduit en code machine avant exécution (C). Interprété : exécuté par un interprète (Python).' },
        { front: 'Trois paradigmes', back: 'Impératif (instructions modifiant l’état), fonctionnel (fonctions sans effet de bord), objet (objets, méthodes).' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque erreur à son type',
      pairs: [
        { left: '`if x = 3:`', right: '`SyntaxError`' },
        { left: '`t = [1, 2]` puis `t[2]`', right: '`IndexError`' },
        { left: '`10 / 0`', right: '`ZeroDivisionError`' },
        { left: '`"3" + 2`', right: '`TypeError`' },
        { left: '`print(totl)` (faute de frappe)', right: '`NameError`' },
        { left: '`assert len(t) > 0` avec `t = []`', right: '`AssertionError`' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter la fonction et sa spécification',
      text: 'Pour définir une fonction on utilise le mot-clé {{def}}. Le résultat est transmis à l’appelant par l’instruction {{return}}. La chaîne de documentation placée sous l’en-tête s’appelle la {{docstring}}. Une condition que doivent vérifier les paramètres avant l’appel est une {{précondition|precondition}} ; on peut la vérifier avec l’instruction {{assert}}. Pour prouver qu’une boucle while termine, on utilise un {{variant}} de boucle.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: '`for i in range(10)` exécute 10 tours, avec `i` de 1 à 10.', answer: false, explanation: '10 tours, mais `i` va de 0 à 9.' },
        { text: 'Une boucle `while` peut ne jamais exécuter son corps.', answer: true, explanation: 'Si la condition est fausse dès le départ.' },
        { text: 'Les annotations de type (`x: int`) sont vérifiées par Python à l’exécution.', answer: false, explanation: 'Elles sont purement informatives.' },
        { text: 'Une variable affectée dans une fonction est locale à cette fonction.', answer: true },
        { text: 'Toute boucle `for` peut être réécrite avec une boucle `while`.', answer: true },
        { text: 'Un programme qui passe tous ses tests est forcément correct.', answer: false, explanation: 'Les tests ne couvrent qu’un nombre fini de cas.' },
        { text: 'Python, C et JavaScript possèdent tous des boucles, des conditionnelles et des fonctions.', answer: true, explanation: 'C’est l’unité des langages.' },
      ],
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre une démarche de mise au point',
      items: [
        'Écrire un test qui reproduit le bogue',
        'Lire le message d’erreur (de bas en haut)',
        'Localiser la ligne fautive (print, débogueur)',
        'Comprendre l’erreur avec une trace à la main',
        'Corriger le code',
        'Relancer tous les tests',
      ],
    },
  ],
}

export default chapter
