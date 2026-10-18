import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'glouton-knn',
  subject: 'nsi',
  order: 9,
  title: 'Algorithmes gloutons et k plus proches voisins',
  theme: 'Algorithmique',
  summary:
    'Algorithmes gloutons (rendu de monnaie, sac à dos, choix d’activités) : principe, optimalité ou non de la solution obtenue ; algorithme des k plus proches voisins : distance, classification, choix de k.',
  duration: '3 semaines',
  objectives: [
    'Résoudre un problème d’optimisation grâce à un algorithme glouton (rendu de monnaie, sac à dos).',
    'Comprendre qu’un algorithme glouton fait à chaque étape un choix localement optimal, sans retour en arrière, et ne fournit pas toujours une solution optimale.',
    'Exhiber un contre-exemple montrant qu’une stratégie gloutonne n’est pas optimale.',
    'Écrire un algorithme qui prédit la classe d’un élément en fonction de la classe majoritaire de ses k plus proches voisins.',
    'Calculer des distances (euclidienne, de Manhattan) et comprendre l’influence du choix de k et de la normalisation des données.',
  ],
  keywords: [
    'optimisation',
    'glouton',
    'choix local',
    'solution optimale',
    'rendu de monnaie',
    'système canonique',
    'sac à dos',
    'ratio valeur/masse',
    'k plus proches voisins',
    'kNN',
    'distance euclidienne',
    'distance de Manhattan',
    'classification',
    'apprentissage automatique',
    'normalisation',
  ],

  // ===================================================================
  // FICHE
  // ===================================================================
  fiche: [
    { type: 'h2', text: '1. Algorithmes gloutons' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Principe',
      content: [
        {
          type: 'p',
          text: 'Pour un **problème d’optimisation** (maximiser ou minimiser une quantité), un algorithme **glouton** construit la solution étape par étape en faisant à chaque fois le **choix qui semble le meilleur sur le moment** (optimum local), **sans jamais revenir en arrière**. Il est simple et rapide, mais ==la solution obtenue n’est pas toujours optimale==.',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Problème', 'Choix glouton', 'Optimal ?'],
      rows: [
        ['Rendu de monnaie', 'rendre la plus grande pièce $\\leqslant$ somme restante', 'oui pour l’euro (système **canonique**) ; non pour $\\{1, 3, 4\\}$ et 6 : $4+1+1$ au lieu de $3+3$'],
        ['Sac à dos (objets entiers)', 'prendre les objets par **valeur/masse** décroissante tant qu’ils rentrent', 'non en général (contre-exemple ci-dessous)'],
        ['Choix d’activités', 'prendre l’activité compatible qui **finit le plus tôt**', 'oui (démontrable)'],
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Contre-exemple du sac à dos',
      content: [
        {
          type: 'p',
          text: 'Capacité 10 kg ; A (6 kg, 30 €), B (5 kg, 20 €), C (5 kg, 20 €). Le glouton (ratio ou valeur) prend A puis plus rien ne rentre : **30 €**. Or B + C = 10 kg et **40 €**.',
        },
      ],
    },
    {
      type: 'code',
      lang: 'python',
      code: `def rendu_monnaie(somme, pieces):
    """pieces triées par valeurs décroissantes, contenant 1."""
    rendu = []
    for p in pieces:
        while somme >= p:
            rendu.append(p)
            somme = somme - p
    return rendu

rendu_monnaie(263, [200, 100, 50, 20, 10, 5, 2, 1])   # [200, 50, 10, 2, 1]`,
    },
    { type: 'h2', text: '2. k plus proches voisins (kNN)' },
    {
      type: 'steps',
      items: [
        { title: 'Données', text: 'Un jeu d’exemples **étiquetés** (caractéristiques + classe connue).' },
        { title: 'Distances', text: 'Calculer la distance entre le nouvel élément et **chaque** exemple.' },
        { title: 'Voisins', text: 'Garder les $k$ exemples les plus proches (tri par distance croissante).' },
        { title: 'Vote', text: 'Prédire la **classe majoritaire** parmi ces $k$ voisins.' },
      ],
    },
    {
      type: 'keyvalue',
      items: [
        { key: 'Distance euclidienne', value: '$d = \\sqrt{(x_A - x_B)^2 + (y_A - y_B)^2}$' },
        { key: 'Distance de Manhattan', value: '$d = |x_A - x_B| + |y_A - y_B|$' },
        { key: 'Choix de k', value: 'impair pour 2 classes (évite les égalités) ; $k$ trop petit → sensible au bruit ; $k$ trop grand → prédit toujours la classe la plus fréquente' },
        { key: 'Normalisation', value: 'ramener les caractéristiques à des échelles comparables (sinon la plus grande écrase les autres)' },
        { key: 'Coût', value: 'une prédiction demande $n$ calculs de distance + un tri' },
      ],
    },
  ],

  // ===================================================================
  // COURS
  // ===================================================================
  cours: [
    { type: 'h2', text: 'Partie A — Les algorithmes gloutons' },
    { type: 'h3', text: '1. Problèmes d’optimisation' },
    {
      type: 'p',
      text: 'Un **problème d’optimisation** consiste à choisir, parmi un ensemble de solutions possibles (dites **admissibles**, car elles respectent les contraintes), une solution qui **maximise** ou **minimise** une certaine quantité : rendre la monnaie avec le moins de pièces, remplir un sac avec la plus grande valeur possible, trouver le plus court chemin, planifier le plus d’activités…',
    },
    {
      type: 'p',
      text: 'La méthode naïve, qui consiste à **essayer toutes les solutions** (recherche exhaustive ou « force brute »), est souvent impraticable : pour le problème du sac à dos avec $n$ objets, il y a $2^n$ façons de choisir les objets ; avec $n = 60$, cela fait plus de $10^{18}$ possibilités.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Algorithme glouton',
      content: [
        {
          type: 'p',
          text: 'Un algorithme **glouton** construit une solution pas à pas ; à chaque étape, il fait le **choix localement optimal** (celui qui paraît le meilleur à cet instant, selon un critère fixé), puis passe au sous-problème restant **sans remettre en cause** les choix précédents.',
        },
      ],
    },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Avantages', text: 'Simple à concevoir et à programmer ; très rapide (souvent un tri puis un parcours) ; fournit toujours une solution admissible.', icon: 'Zap' },
        { title: 'Limite', text: 'L’optimum local ne mène pas toujours à l’optimum global : la solution peut être **non optimale**. Il faut le démontrer au cas par cas, ou exhiber un contre-exemple.', icon: 'AlertTriangle' },
      ],
    },

    { type: 'h3', text: '2. Le rendu de monnaie' },
    {
      type: 'p',
      text: '**Problème** : rendre une somme $S$ avec un système de pièces (et billets) donné, en utilisant **le moins de pièces possible**. On suppose disposer d’autant de pièces de chaque valeur que nécessaire.',
    },
    {
      type: 'p',
      text: '**Stratégie gloutonne** : tant que la somme restante n’est pas nulle, rendre la **plus grande pièce** dont la valeur ne dépasse pas la somme restante.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Rendre 2,63 € avec le système de l’euro',
      content: [
        {
          type: 'p',
          text: 'On travaille en centimes pour éviter les flottants : $S = 263$ et les valeurs sont 200, 100, 50, 20, 10, 5, 2, 1 (centimes).',
        },
        {
          type: 'table',
          headers: ['Somme restante', 'Plus grande pièce possible', 'Reste'],
          rows: [
            ['263', '200 (2 €)', '63'],
            ['63', '50 (50 c)', '13'],
            ['13', '10 (10 c)', '3'],
            ['3', '2 (2 c)', '1'],
            ['1', '1 (1 c)', '0'],
          ],
        },
        { type: 'p', text: 'On rend **5 pièces** : 2 € + 50 c + 10 c + 2 c + 1 c. C’est bien le minimum possible.' },
      ],
    },
    {
      type: 'code',
      lang: 'python',
      code: `def rendu_monnaie(somme, pieces):
    """Rend la somme (entier, en centimes) avec l'algorithme glouton.
    Préconditions : somme >= 0 ; pieces est triée par valeurs décroissantes
    et contient la valeur 1 (pour pouvoir toujours finir).
    Renvoie la liste des pièces rendues.
    """
    rendu = []
    i = 0
    while somme > 0:
        if pieces[i] <= somme:
            rendu.append(pieces[i])      # on rend la pièce
            somme = somme - pieces[i]
        else:
            i = i + 1                    # pièce trop grande : on passe à la suivante
    return rendu

EURO = [200, 100, 50, 20, 10, 5, 2, 1]
print(rendu_monnaie(263, EURO))   # [200, 50, 10, 2, 1]
print(rendu_monnaie(80, EURO))    # [50, 20, 10]`,
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Terminaison',
      content: [
        {
          type: 'p',
          text: 'À chaque tour, soit `somme` diminue (d’au moins 1), soit `i` augmente de 1. La quantité `somme + (len(pieces) - i)` est donc un **variant** : entier positif strictement décroissant. De plus, comme la dernière pièce vaut 1, l’indice `i` ne dépasse jamais `len(pieces) - 1` tant que `somme > 0`.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Le glouton n’est pas toujours optimal',
      content: [
        {
          type: 'p',
          text: 'Avec le système de pièces $\\{1, 3, 4\\}$ et la somme 6, le glouton rend $4 + 1 + 1$ (**3 pièces**), alors que $3 + 3$ n’en utilise que **2**. Autre exemple historique : l’ancien système britannique (avant 1971) comportait des pièces de 1, 3, 6, 12, 24 et 30 pence ; pour 48 pence, le glouton rend $30 + 12 + 6$ (3 pièces) au lieu de $24 + 24$ (2 pièces).',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Système canonique',
      content: [
        {
          type: 'p',
          text: 'Un système de pièces est dit **canonique** lorsque l’algorithme glouton donne une solution optimale **pour toute somme**. Les systèmes monétaires usuels (euro, dollar…) sont canoniques ; $\\{1, 3, 4\\}$ ne l’est pas. Pour un système non canonique, on peut trouver l’optimum par **programmation dynamique** (au programme de Terminale).',
        },
      ],
    },

    { type: 'h3', text: '3. Le problème du sac à dos' },
    {
      type: 'p',
      text: '**Problème** : un sac supporte une masse maximale $M$ (la **capacité**). On dispose d’objets ayant chacun une **masse** et une **valeur**. Quels objets emporter (chaque objet est pris entièrement ou pas du tout) pour que la **valeur totale soit maximale**, sans dépasser la capacité ?',
    },
    {
      type: 'p',
      text: 'Plusieurs critères gloutons sont possibles : prendre d’abord les objets les plus **précieux**, ou les plus **légers**, ou ceux ayant le meilleur **rapport valeur/masse** (valeur par kilogramme). Ce dernier est le plus naturel.',
    },
    {
      type: 'steps',
      items: [
        { title: 'Calculer les ratios', text: 'Pour chaque objet, calculer $r = \\dfrac{\\text{valeur}}{\\text{masse}}$.' },
        { title: 'Trier', text: 'Trier les objets par ratio décroissant.' },
        { title: 'Remplir', text: 'Parcourir les objets dans cet ordre ; ajouter chaque objet au sac s’il rentre encore (masse $\\leqslant$ capacité restante), sinon passer au suivant.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : capacité 15 kg',
      content: [
        {
          type: 'table',
          headers: ['Objet', 'Masse (kg)', 'Valeur (€)', 'Ratio (€/kg)'],
          rows: [
            ['A', '12', '48', '4'],
            ['B', '5', '25', '5'],
            ['C', '5', '24', '4,8'],
            ['D', '4', '16', '4'],
            ['E', '3', '9', '3'],
          ],
        },
        {
          type: 'list',
          items: [
            '**Glouton par valeur** : A (12 kg) ; restent 3 kg : B, C, D ne rentrent pas, E oui → A + E = 15 kg, **57 €**.',
            '**Glouton par ratio** : B (5 kg), C (10 kg) ; A ne rentre pas ; D (14 kg) ; E ne rentre pas → B + C + D, **65 €**.',
            '**Glouton par masse** : E (3 kg), D (7 kg), B (12 kg) ; C et A ne rentrent plus → **50 €**.',
          ],
        },
        {
          type: 'p',
          text: 'En examinant tous les choix possibles, on vérifie que 65 € est ici la valeur maximale : le glouton par ratio est optimal **sur cet exemple**. Le choix du critère est donc déterminant.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Contre-exemple : le glouton par ratio n’est pas toujours optimal',
      content: [
        {
          type: 'p',
          text: 'Capacité 10 kg ; A (6 kg, 30 €, ratio 5), B (5 kg, 20 €, ratio 4), C (5 kg, 20 €, ratio 4). Le glouton prend A (6 kg) ; il reste 4 kg, ni B ni C ne rentrent : **30 €**. Pourtant B + C pèsent 10 kg et valent **40 €**. Le choix « local » de A, très rentable, empêche une meilleure combinaison.',
        },
      ],
    },
    {
      type: 'code',
      lang: 'python',
      code: `def sac_a_dos_glouton(objets, capacite):
    """objets : liste de triplets (nom, masse, valeur), masses > 0.
    Renvoie la liste des noms choisis par le glouton « meilleur ratio ».
    """
    # liste de (ratio, nom, masse) puis tri par ratio décroissant
    candidats = []
    for (nom, masse, valeur) in objets:
        candidats.append((valeur / masse, nom, masse))
    candidats = sorted(candidats, reverse=True)

    choisis = []
    reste = capacite
    for (ratio, nom, masse) in candidats:
        if masse <= reste:
            choisis.append(nom)
            reste = reste - masse
    return choisis

objets = [("A", 12, 48), ("B", 5, 25), ("C", 5, 24), ("D", 4, 16), ("E", 3, 9)]
print(sac_a_dos_glouton(objets, 15))   # ['B', 'C', 'D']`,
      caption: '`sorted` trie les triplets selon leur premier élément (le ratio), puis le deuxième en cas d’égalité.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Coût du glouton',
      content: [
        {
          type: 'p',
          text: 'Le glouton effectue un tri ($O(n \\log n)$ avec `sorted`) puis un seul parcours ($O(n)$) : il est très rapide. La recherche exhaustive, elle, examine $2^n$ sous-ensembles. Pour $n = 30$ objets : environ $10^9$ sous-ensembles contre une trentaine d’étapes. On accepte souvent une solution « bonne » mais pas forcément optimale en échange de cette rapidité.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Variante fractionnaire',
      content: [
        {
          type: 'p',
          text: 'Si l’on peut emporter des **fractions** d’objets (de la farine, du sable…), le glouton par ratio, qui complète le sac avec une fraction du dernier objet, est **toujours optimal**. C’est la contrainte « tout ou rien » qui rend le problème difficile.',
        },
      ],
    },

    { type: 'h3', text: '4. Un glouton optimal : le choix d’activités' },
    {
      type: 'p',
      text: '**Problème** : une salle peut accueillir une activité à la fois. Connaissant l’heure de début et de fin de chaque activité demandée, comment en programmer **le plus grand nombre** ?',
    },
    {
      type: 'p',
      text: '**Glouton** : trier les activités par **heure de fin croissante**, puis choisir à chaque fois la première activité qui commence après la fin de la dernière activité choisie. On peut démontrer que cette stratégie est **optimale** : finir le plus tôt possible laisse le maximum de temps pour la suite. En revanche, choisir l’activité qui **commence** le plus tôt n’est pas optimal (elle peut durer toute la journée).',
    },
    {
      type: 'code',
      lang: 'python',
      code: `def choix_activites(activites):
    """activites : liste de couples (debut, fin). Renvoie une liste
    d'activités deux à deux compatibles, de taille maximale."""
    par_fin = sorted(activites, key=lambda a: a[1])   # tri par heure de fin
    choisies = []
    fin_derniere = -1
    for (debut, fin) in par_fin:
        if debut >= fin_derniere:
            choisies.append((debut, fin))
            fin_derniere = fin
    return choisies

print(choix_activites([(8, 10), (9, 12), (10, 11), (11, 14), (12, 13)]))
# [(8, 10), (10, 11), (12, 13)]`,
    },
    {
      type: 'svg',
      svg: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="11">
  <line x1="40" y1="175" x2="460" y2="175" stroke="currentColor"/>
  <g fill="currentColor" text-anchor="middle">
    <text x="40" y="190">8 h</text><text x="110" y="190">9 h</text><text x="180" y="190">10 h</text>
    <text x="250" y="190">11 h</text><text x="320" y="190">12 h</text><text x="390" y="190">13 h</text><text x="460" y="190">14 h</text>
  </g>
  <rect x="40" y="20" width="140" height="22" fill="hsl(142 71% 45%)" fill-opacity="0.35" stroke="hsl(142 71% 45%)"/>
  <text x="110" y="35" text-anchor="middle" fill="currentColor">8 h – 10 h ✓</text>
  <rect x="110" y="50" width="210" height="22" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>
  <text x="215" y="65" text-anchor="middle" fill="currentColor">9 h – 12 h</text>
  <rect x="180" y="80" width="70" height="22" fill="hsl(142 71% 45%)" fill-opacity="0.35" stroke="hsl(142 71% 45%)"/>
  <text x="215" y="95" text-anchor="middle" fill="currentColor">10 h – 11 h ✓</text>
  <rect x="250" y="110" width="210" height="22" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>
  <text x="355" y="125" text-anchor="middle" fill="currentColor">11 h – 14 h</text>
  <rect x="320" y="140" width="70" height="22" fill="hsl(142 71% 45%)" fill-opacity="0.35" stroke="hsl(142 71% 45%)"/>
  <text x="355" y="155" text-anchor="middle" fill="currentColor">12 h – 13 h ✓</text>
</svg>`,
      caption: 'Choix d’activités par fin au plus tôt : 3 activités compatibles (en vert).',
      maxWidth: 520,
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Méthode : étudier un algorithme glouton',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Identifier la quantité à optimiser et les contraintes.',
            'Choisir un **critère** de choix local (plus grande pièce, meilleur ratio, fin la plus tôt…).',
            'Programmer : en général un **tri** selon ce critère, puis un **parcours**.',
            'Se demander si la solution est optimale : chercher un **contre-exemple** sur de petites données, ou une démonstration.',
          ],
        },
      ],
    },

    { type: 'divider' },

    // ===================== kNN
    { type: 'h2', text: 'Partie B — L’algorithme des k plus proches voisins' },
    { type: 'h3', text: '5. Classer à partir d’exemples' },
    {
      type: 'p',
      text: 'L’algorithme des **k plus proches voisins** (en anglais *k nearest neighbors*, **kNN**) est un algorithme d’**apprentissage automatique** (*machine learning*) **supervisé** : à partir d’un ensemble d’exemples dont on connaît la **classe** (on dit qu’ils sont **étiquetés**), il prédit la classe d’un nouvel élément.',
    },
    {
      type: 'p',
      text: '**Idée** : « dis-moi qui sont tes voisins, je te dirai qui tu es ». Un élément ressemble probablement aux éléments dont il est proche. On mesure la ressemblance par une **distance** entre les caractéristiques.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples d’applications',
      content: [
        {
          type: 'list',
          items: [
            'Reconnaître l’espèce d’une fleur à partir de la longueur et de la largeur de ses pétales (jeu de données **Iris**, publié par Ronald Fisher en 1936 : 150 fleurs de 3 espèces).',
            'Reconnaître un chiffre manuscrit à partir des pixels de son image.',
            'Recommander un film à partir des goûts d’utilisateurs proches.',
          ],
        },
      ],
    },
    { type: 'h3', text: '6. Distances' },
    {
      type: 'p',
      text: 'Chaque élément est décrit par des **caractéristiques** numériques, vues comme les coordonnées d’un point. Pour deux caractéristiques, on se place dans le plan ; pour plus, le principe est le même avec plus de coordonnées.',
    },
    {
      type: 'table',
      headers: ['Distance', 'Formule pour $A(x_A ; y_A)$, $B(x_B ; y_B)$', 'Exemple $A(1 ; 2)$, $B(4 ; 6)$'],
      rows: [
        ['euclidienne (« à vol d’oiseau »)', '$\\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$', '$\\sqrt{9 + 16} = 5$'],
        ['de Manhattan (« en suivant les rues »)', '$|x_B - x_A| + |y_B - y_A|$', '$3 + 4 = 7$'],
      ],
    },
    {
      type: 'code',
      lang: 'python',
      code: `from math import sqrt

def distance_euclidienne(a, b):
    """a et b sont des tuples de même longueur (coordonnées)."""
    s = 0
    for i in range(len(a)):
        s = s + (a[i] - b[i]) ** 2
    return sqrt(s)

def distance_manhattan(a, b):
    s = 0
    for i in range(len(a)):
        s = s + abs(a[i] - b[i])
    return s

print(distance_euclidienne((1, 2), (4, 6)))   # 5.0
print(distance_manhattan((1, 2), (4, 6)))     # 7`,
    },
    { type: 'h3', text: '7. L’algorithme' },
    {
      type: 'steps',
      items: [
        { title: 'Entrées', text: 'Un ensemble de $n$ exemples étiquetés, un nouvel élément $P$, un entier $k \\leqslant n$.' },
        { title: 'Calcul des distances', text: 'Pour chaque exemple, calculer sa distance à $P$ ; ranger les couples (distance, classe) dans une liste.' },
        { title: 'Sélection', text: 'Trier cette liste par distance croissante et garder les $k$ premiers.' },
        { title: 'Vote majoritaire', text: 'Compter les classes parmi ces $k$ voisins et renvoyer la plus fréquente.' },
      ],
    },
    {
      type: 'code',
      lang: 'python',
      code: `from math import sqrt

def distance(a, b):
    return sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)

def knn(donnees, p, k):
    """donnees : liste de triplets (x, y, classe) ; p : couple (x, y).
    Renvoie la classe majoritaire parmi les k plus proches voisins de p.
    Précondition : 1 <= k <= len(donnees).
    """
    assert 1 <= k <= len(donnees)
    # 1. distances
    liste = []
    for (x, y, classe) in donnees:
        liste.append((distance((x, y), p), classe))
    # 2. les k plus proches
    voisins = sorted(liste)[:k]
    # 3. vote majoritaire
    effectifs = {}
    for (d, classe) in voisins:
        if classe in effectifs:
            effectifs[classe] = effectifs[classe] + 1
        else:
            effectifs[classe] = 1
    meilleure = None
    for classe in effectifs:
        if meilleure is None or effectifs[classe] > effectifs[meilleure]:
            meilleure = classe
    return meilleure`,
      caption: 'Le dictionnaire `effectifs` associe à chaque classe son nombre de voisins. `sorted(liste)[:k]` garde les k premiers couples.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Application',
      content: [
        {
          type: 'p',
          text: 'Exemples : A(1 ; 1) rouge, B(3 ; 5) bleu, C(4 ; 2) bleu, D(5 ; 4) bleu, E(2 ; 3) rouge, F(6 ; 3) rouge. Nouveau point P(3 ; 3).',
        },
        {
          type: 'table',
          headers: ['Point', 'Classe', 'Distance à P', 'Rang'],
          rows: [
            ['E(2 ; 3)', 'rouge', '$\\sqrt{1} = 1$', '1'],
            ['C(4 ; 2)', 'bleu', '$\\sqrt{2} \\approx 1{,}41$', '2'],
            ['B(3 ; 5)', 'bleu', '$\\sqrt{4} = 2$', '3'],
            ['D(5 ; 4)', 'bleu', '$\\sqrt{5} \\approx 2{,}24$', '4'],
            ['A(1 ; 1)', 'rouge', '$\\sqrt{8} \\approx 2{,}83$', '5'],
            ['F(6 ; 3)', 'rouge', '$\\sqrt{9} = 3$', '6'],
          ],
        },
        {
          type: 'list',
          items: [
            '$k = 1$ : le plus proche voisin est E → **rouge**.',
            '$k = 3$ : E, C, B → 1 rouge, 2 bleus → **bleu**.',
            '$k = 5$ : E, C, B, D, A → 2 rouges, 3 bleus → **bleu**.',
          ],
        },
        { type: 'p', text: 'La prédiction **dépend du choix de $k$**.' },
      ],
    },
    {
      type: 'svg',
      svg: `<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="11">
  <g stroke="currentColor" stroke-opacity="0.15">
    <line x1="40" y1="20" x2="40" y2="220"/><line x1="80" y1="20" x2="80" y2="220"/><line x1="120" y1="20" x2="120" y2="220"/>
    <line x1="160" y1="20" x2="160" y2="220"/><line x1="200" y1="20" x2="200" y2="220"/><line x1="240" y1="20" x2="240" y2="220"/>
    <line x1="280" y1="20" x2="280" y2="220"/>
    <line x1="40" y1="220" x2="280" y2="220"/><line x1="40" y1="180" x2="280" y2="180"/><line x1="40" y1="140" x2="280" y2="140"/>
    <line x1="40" y1="100" x2="280" y2="100"/><line x1="40" y1="60" x2="280" y2="60"/><line x1="40" y1="20" x2="280" y2="20"/>
  </g>
  <g fill="currentColor" text-anchor="middle">
    <text x="40" y="236">0</text><text x="80" y="236">1</text><text x="120" y="236">2</text><text x="160" y="236">3</text>
    <text x="200" y="236">4</text><text x="240" y="236">5</text><text x="280" y="236">6</text>
    <text x="30" y="184">1</text><text x="30" y="144">2</text><text x="30" y="104">3</text><text x="30" y="64">4</text><text x="30" y="24">5</text>
  </g>
  <circle cx="160" cy="100" r="40" fill="none" stroke="hsl(263 70% 60%)" stroke-dasharray="4 3"/>
  <circle cx="160" cy="100" r="80" fill="none" stroke="hsl(263 70% 60%)" stroke-opacity="0.5" stroke-dasharray="2 3"/>
  <g fill="hsl(0 84% 60%)">
    <circle cx="80" cy="180" r="6"/><circle cx="120" cy="100" r="6"/><circle cx="280" cy="100" r="6"/>
  </g>
  <g fill="hsl(217 91% 60%)">
    <rect x="154" y="14" width="12" height="12"/><rect x="194" y="134" width="12" height="12"/><rect x="234" y="54" width="12" height="12"/>
  </g>
  <g fill="currentColor">
    <text x="88" y="176">A</text><text x="108" y="94">E</text><text x="272" y="92">F</text>
    <text x="170" y="24">B</text><text x="210" y="148">C</text><text x="250" y="56">D</text>
  </g>
  <path d="M154 94 L166 106 M166 94 L154 106" stroke="currentColor" stroke-width="2"/>
  <text x="168" y="92" fill="currentColor">P</text>
  <text x="300" y="250" text-anchor="end" fill="currentColor" font-size="10">● rouge   ■ bleu</text>
</svg>`,
      caption: 'Le point P(3 ; 3) et ses voisins. Cercles de rayon 1 et 2 : à $k = 1$, P est rouge ; à $k = 3$, il est bleu.',
      maxWidth: 380,
    },
    { type: 'h3', text: '8. Choisir k et préparer les données' },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'k trop petit', text: 'Avec $k = 1$, la prédiction dépend d’un seul exemple : un exemple mal étiqueté ou atypique (bruit) suffit à la fausser.', icon: 'ZoomIn' },
        { title: 'k trop grand', text: 'Avec $k = n$, on prédit toujours la classe la plus fréquente de tout le jeu de données, quel que soit le point : la proximité ne compte plus.', icon: 'ZoomOut' },
        { title: 'k impair', text: 'Avec deux classes, un $k$ impair évite les égalités dans le vote. Sinon, il faut une règle de départage (par exemple la classe du plus proche voisin).', icon: 'Scale' },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Évaluer un choix de k',
      content: [
        {
          type: 'p',
          text: 'On sépare les données étiquetées en un **jeu d’entraînement** (les exemples) et un **jeu de test**. Pour chaque élément du jeu de test, on prédit sa classe avec kNN et on la compare à sa vraie classe. On retient la valeur de $k$ qui donne le plus fort **taux de réussite** sur le jeu de test.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Attention aux échelles : normaliser',
      content: [
        {
          type: 'p',
          text: 'Si une caractéristique est l’âge (entre 15 et 80 ans) et une autre le revenu annuel (entre 10 000 et 100 000 €), la distance est presque entièrement déterminée par le revenu : l’âge est ignoré. On **normalise** donc chaque caractéristique, par exemple en la ramenant dans $[0 ; 1]$ :',
        },
        { type: 'math', tex: 'x\' = \\dfrac{x - x_{\\min}}{x_{\\max} - x_{\\min}}' },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Coût et limites',
      content: [
        {
          type: 'list',
          items: [
            'Il n’y a pas de phase d’apprentissage : on garde tous les exemples. Mais chaque prédiction calcule $n$ distances et trie : coût de l’ordre de $n \\log n$ — c’est lent sur de très gros jeux de données.',
            'La qualité dépend fortement des données : exemples **représentatifs**, en nombre suffisant, correctement étiquetés. Des données biaisées donnent des prédictions biaisées.',
            'kNN fonctionne aussi en **régression** : on prédit alors une valeur numérique, par exemple la **moyenne** des valeurs des $k$ voisins.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Lire des données dans un fichier CSV',
      content: [
        {
          type: 'p',
          text: 'En pratique, les exemples sont souvent stockés dans un fichier CSV (une ligne par exemple, valeurs séparées par des virgules). On peut les charger ainsi :',
        },
        {
          type: 'code',
          lang: 'python',
          code: `import csv

donnees = []
with open("iris.csv", newline="") as f:
    lecteur = csv.DictReader(f)          # la 1re ligne donne les noms des colonnes
    for ligne in lecteur:
        donnees.append((float(ligne["petal_length"]),
                        float(ligne["petal_width"]),
                        ligne["species"]))`,
        },
      ],
    },
  ],

  // ===================================================================
  // EXERCICES
  // ===================================================================
  exercices: [
    {
      id: 'gk-ex1',
      title: 'Rendu de monnaie en euros',
      difficulty: 1,
      duration: 10,
      tags: ['glouton', 'rendu de monnaie'],
      statement: [
        { type: 'p', text: 'On utilise les valeurs (en euros) 50, 20, 10, 5, 2, 1.' },
        { type: 'p', text: '1. Appliquer l’algorithme glouton pour rendre 87 €. Combien de billets et pièces sont rendus ?' },
        { type: 'p', text: '2. Même question pour 48 €.' },
        { type: 'p', text: '3. Pourquoi est-il préférable, en Python, de travailler en centimes plutôt qu’en euros avec des flottants ?' },
      ],
      hints: ['À chaque étape : la plus grande valeur qui ne dépasse pas la somme restante.'],
      solution: [
        {
          type: 'p',
          text: '1. $87 = 50 + 20 + 10 + 5 + 2$ : 87 − 50 = 37, 37 − 20 = 17, 17 − 10 = 7, 7 − 5 = 2, 2 − 2 = 0. **5** billets et pièces.',
        },
        {
          type: 'p',
          text: '2. $48 = 20 + 20 + 5 + 2 + 1$ : 48 − 20 = 28, 28 − 20 = 8, 8 − 5 = 3, 3 − 2 = 1, 1 − 1 = 0. **5** éléments.',
        },
        {
          type: 'p',
          text: '3. Les flottants sont des valeurs approchées : par exemple `0.1 + 0.2` ne vaut pas exactement `0.3`. Des soustractions successives de `0.1`, `0.2`… peuvent laisser un reste comme `1e-17` au lieu de 0, et la boucle `while somme > 0` ne se comporterait pas comme prévu. Les calculs sur les entiers (centimes) sont exacts.',
        },
      ],
    },
    {
      id: 'gk-ex2',
      title: 'Un système non canonique',
      difficulty: 1,
      duration: 10,
      tags: ['glouton', 'contre-exemple'],
      statement: [
        { type: 'p', text: 'Un pays imaginaire utilise des pièces de 1, 3 et 4 unités.' },
        { type: 'p', text: '1. Appliquer l’algorithme glouton pour rendre 6, puis 10 unités.' },
        { type: 'p', text: '2. Trouver dans chaque cas une solution utilisant moins de pièces. Que peut-on conclure ?' },
        { type: 'p', text: '3. Avec les pièces 1, 6 et 10, trouver une somme pour laquelle le glouton n’est pas optimal.' },
      ],
      hints: ['Essayer des sommes proches de 12 pour la question 3.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Somme 6 : glouton $4 + 1 + 1$ (3 pièces). Somme 10 : glouton $4 + 4 + 1 + 1$ (4 pièces).',
            '$6 = 3 + 3$ (2 pièces) et $10 = 4 + 3 + 3$ (3 pièces). Le glouton ne donne pas toujours le nombre minimal de pièces : le système $\\{1, 3, 4\\}$ **n’est pas canonique**. Un seul contre-exemple suffit à le prouver.',
            'Somme 12 : le glouton rend $10 + 1 + 1$ (3 pièces) alors que $6 + 6$ n’en utilise que 2.',
          ],
        },
      ],
    },
    {
      id: 'gk-ex3',
      title: 'Programmer le rendu de monnaie',
      difficulty: 2,
      duration: 20,
      tags: ['glouton', 'programmation'],
      statement: [
        { type: 'p', text: '1. Écrire une fonction `rendu(somme, pieces)` qui renvoie la **liste** des pièces rendues par l’algorithme glouton (`pieces` est triée par ordre décroissant et contient 1).' },
        { type: 'p', text: '2. Écrire une fonction `rendu_compact(somme, pieces)` qui renvoie plutôt une liste de couples `(pièce, nombre)` en utilisant `//` et `%`, sans boucle `while`. Exemple : `rendu_compact(87, [50, 20, 10, 5, 2, 1])` renvoie `[(50, 1), (20, 1), (10, 1), (5, 1), (2, 1)]`.' },
        { type: 'p', text: '3. Écrire des tests pour les deux fonctions.' },
      ],
      hints: ['Le nombre de pièces de valeur `p` à rendre est `somme // p` ; il reste ensuite `somme % p`.', 'Ne pas ajouter les couples dont le nombre est 0.'],
      solution: [
        {
          type: 'code',
          lang: 'python',
          code: `def rendu(somme, pieces):
    resultat = []
    for p in pieces:
        while somme >= p:
            resultat.append(p)
            somme = somme - p
    return resultat

def rendu_compact(somme, pieces):
    resultat = []
    for p in pieces:
        nb = somme // p
        if nb > 0:
            resultat.append((p, nb))
        somme = somme % p
    return resultat

P = [50, 20, 10, 5, 2, 1]
assert rendu(87, P) == [50, 20, 10, 5, 2]
assert rendu(48, P) == [20, 20, 5, 2, 1]
assert rendu(0, P) == []
assert rendu_compact(87, P) == [(50, 1), (20, 1), (10, 1), (5, 1), (2, 1)]
assert rendu_compact(48, P) == [(20, 2), (5, 1), (2, 1), (1, 1)]
assert rendu_compact(6, [4, 3, 1]) == [(4, 1), (1, 2)]   # non optimal !`,
        },
        {
          type: 'p',
          text: 'La version compacte effectue un seul passage par valeur de pièce (une division euclidienne) : son coût ne dépend pas de la somme, contrairement à la première qui fait un tour de `while` par pièce rendue.',
        },
      ],
    },
    {
      id: 'gk-ex4',
      title: 'Sac à dos : comparer des critères gloutons',
      difficulty: 2,
      duration: 20,
      tags: ['glouton', 'sac à dos'],
      statement: [
        { type: 'p', text: 'Un randonneur peut porter **15 kg**. Il hésite entre les objets suivants :' },
        {
          type: 'table',
          headers: ['Objet', 'A', 'B', 'C', 'D', 'E'],
          rows: [
            ['Masse (kg)', '12', '5', '5', '4', '3'],
            ['Valeur', '48', '25', '24', '16', '9'],
          ],
        },
        { type: 'p', text: '1. Appliquer le glouton « valeur décroissante ». Valeur obtenue ?' },
        { type: 'p', text: '2. Calculer les ratios valeur/masse et appliquer le glouton « ratio décroissant ».' },
        { type: 'p', text: '3. Appliquer le glouton « masse croissante ».' },
        { type: 'p', text: '4. Montrer que la solution du 2 est optimale. Le glouton par ratio est-il optimal pour toutes les données ?' },
      ],
      hints: ['Ratios : 4 ; 5 ; 4,8 ; 4 ; 3.', 'Pour la question 4, distinguer les sacs qui contiennent A et ceux qui ne le contiennent pas.'],
      solution: [
        { type: 'p', text: '1. Ordre A, B, C, D, E. A (12 kg) ; il reste 3 kg : B, C, D ne rentrent pas, E (3 kg) oui. Sac {A, E} : 15 kg, **57**.' },
        { type: 'p', text: '2. Ordre B (5), C (4,8), A (4), D (4), E (3). B → 5 kg, C → 10 kg, A (12 kg) ne rentre pas, D → 14 kg, E (3 kg) ne rentre pas. Sac {B, C, D} : 14 kg, **65**.' },
        { type: 'p', text: '3. Ordre E (3), D (4), B (5), C (5), A (12). E → 3 kg, D → 7 kg, B → 12 kg, C (17 kg) non, A non. Sac {E, D, B} : 12 kg, **50**.' },
        {
          type: 'p',
          text: '4. Si le sac contient A (12 kg), il ne reste que 3 kg : seul E peut s’ajouter, valeur au plus 57. Sinon, on choisit parmi B, C, D, E (17 kg au total, trop lourd) : il faut en retirer au moins un. Retirer E donne 65 (14 kg), retirer D donne 58, retirer C donne 50, retirer B donne 49. Le maximum est donc **65** : la solution du glouton par ratio est optimale ici. Mais ce n’est pas vrai en général : avec une capacité de 10 kg et les objets (6 kg, 30), (5 kg, 20), (5 kg, 20), le glouton par ratio obtient 30 alors que l’optimum vaut 40.',
        },
      ],
    },
    {
      id: 'gk-ex5',
      title: 'Programmer le sac à dos glouton',
      difficulty: 2,
      duration: 25,
      tags: ['glouton', 'sac à dos', 'tri'],
      statement: [
        { type: 'p', text: 'Les objets sont donnés sous forme de liste de triplets `(nom, masse, valeur)`.' },
        { type: 'p', text: '1. Écrire une fonction `tri_par_ratio(objets)` qui renvoie une **nouvelle** liste des objets triés par ratio valeur/masse décroissant, à l’aide d’un **tri par insertion** (sans `sorted`).' },
        { type: 'p', text: '2. Écrire une fonction `glouton(objets, capacite)` qui renvoie le couple `(liste des noms choisis, valeur totale)`.' },
        { type: 'p', text: '3. Tester sur les données de l’exercice précédent.' },
      ],
      hints: ['Copier la liste avec `list(objets)` pour ne pas modifier l’original.', 'Le ratio d’un objet `o` est `o[2] / o[1]`.'],
      solution: [
        {
          type: 'code',
          lang: 'python',
          code: `def ratio(objet):
    nom, masse, valeur = objet
    return valeur / masse

def tri_par_ratio(objets):
    t = list(objets)                      # copie : pas d'effet de bord
    for i in range(1, len(t)):
        cle = t[i]
        j = i - 1
        while j >= 0 and ratio(t[j]) < ratio(cle):   # ordre décroissant
            t[j + 1] = t[j]
            j = j - 1
        t[j + 1] = cle
    return t

def glouton(objets, capacite):
    choisis = []
    total = 0
    reste = capacite
    for (nom, masse, valeur) in tri_par_ratio(objets):
        if masse <= reste:
            choisis.append(nom)
            total = total + valeur
            reste = reste - masse
    return (choisis, total)

objets = [("A", 12, 48), ("B", 5, 25), ("C", 5, 24), ("D", 4, 16), ("E", 3, 9)]
assert [o[0] for o in tri_par_ratio(objets)] == ["B", "C", "A", "D", "E"]
assert glouton(objets, 15) == (["B", "C", "D"], 65)
assert glouton(objets, 2) == ([], 0)
assert glouton([("A", 6, 30), ("B", 5, 20), ("C", 5, 20)], 10) == (["A"], 30)  # non optimal`,
        },
        {
          type: 'p',
          text: 'A et D ont le même ratio (4) : le tri par insertion étant **stable** (on ne décale que si le ratio est strictement plus petit), A reste avant D. Le coût est dominé par le tri, quadratique dans le pire cas ; le remplissage est linéaire.',
        },
      ],
    },
    {
      id: 'gk-ex6',
      title: 'kNN à la main',
      difficulty: 1,
      duration: 15,
      tags: ['kNN', 'distance'],
      statement: [
        { type: 'p', text: 'On dispose des exemples suivants (deux caractéristiques $x$ et $y$, deux classes ▲ et ●) :' },
        {
          type: 'table',
          headers: ['Point', 'A', 'B', 'C', 'D', 'E'],
          rows: [
            ['$(x ; y)$', '(1 ; 4)', '(2 ; 1)', '(4 ; 4)', '(5 ; 2)', '(3 ; 0)'],
            ['Classe', '▲', '●', '▲', '▲', '●'],
          ],
        },
        { type: 'p', text: '1. Calculer les distances euclidiennes entre $P(3 ; 2)$ et chacun des points.' },
        { type: 'p', text: '2. Prédire la classe de $P$ pour $k = 1$, $k = 3$ et $k = 5$.' },
        { type: 'p', text: '3. Refaire la question 2 avec la distance de Manhattan. Que remarque-t-on ?' },
      ],
      hints: ['On peut comparer les carrés des distances : l’ordre est le même.'],
      solution: [
        {
          type: 'table',
          headers: ['Point', 'Classe', '$d^2$', 'Distance euclidienne', 'Manhattan'],
          rows: [
            ['A(1 ; 4)', '▲', '$4 + 4 = 8$', '$\\approx 2{,}83$', '4'],
            ['B(2 ; 1)', '●', '$1 + 1 = 2$', '$\\approx 1{,}41$', '2'],
            ['C(4 ; 4)', '▲', '$1 + 4 = 5$', '$\\approx 2{,}24$', '3'],
            ['D(5 ; 2)', '▲', '$4 + 0 = 4$', '$2$', '2'],
            ['E(3 ; 0)', '●', '$0 + 4 = 4$', '$2$', '2'],
          ],
        },
        {
          type: 'list',
          items: [
            'Ordre (euclidien) : B (1,41), puis D et E à égalité (2), C (2,24), A (2,83).',
            '$k = 1$ : B → **●**.',
            '$k = 3$ : B, D, E → 2 ●, 1 ▲ → **●**.',
            '$k = 5$ : tous les points → 3 ▲, 2 ● → **▲**.',
          ],
        },
        {
          type: 'p',
          text: '3. Avec Manhattan, B, D et E sont tous à distance 2 : pour $k = 1$, il y a **égalité** entre trois voisins, la prédiction dépend de la règle de départage (● si l’on prend B, ▲ si l’on prend D). Pour $k = 3$, on obtient les mêmes voisins B, D, E → ●. Pour $k = 5$ → ▲. Le choix de la distance peut modifier le classement des voisins.',
        },
      ],
    },
    {
      id: 'gk-ex7',
      title: 'Programmer kNN',
      difficulty: 2,
      duration: 25,
      tags: ['kNN', 'programmation'],
      statement: [
        { type: 'p', text: 'Les exemples sont stockés dans une liste de triplets `(x, y, classe)`.' },
        { type: 'p', text: '1. Écrire une fonction `distance(a, b)` (distance euclidienne entre deux couples).' },
        { type: 'p', text: '2. Écrire une fonction `k_plus_proches(donnees, p, k)` qui renvoie la liste des classes des `k` plus proches voisins de `p`.' },
        { type: 'p', text: '3. Écrire une fonction `classe_majoritaire(classes)` qui renvoie la classe la plus fréquente d’une liste (sans dictionnaire).' },
        { type: 'p', text: '4. En déduire `predire(donnees, p, k)` et la tester sur les données de l’exercice précédent.' },
      ],
      hints: [
        'Construire la liste des couples `(distance, classe)` puis la trier avec `sorted`.',
        'Pour la classe majoritaire, on peut compter chaque classe avec `classes.count(c)`, ou réutiliser une fonction `nb_occurrences`.',
      ],
      solution: [
        {
          type: 'code',
          lang: 'python',
          code: `from math import sqrt

def distance(a, b):
    return sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)

def k_plus_proches(donnees, p, k):
    assert 1 <= k <= len(donnees)
    couples = []
    for (x, y, classe) in donnees:
        couples.append((distance((x, y), p), classe))
    couples = sorted(couples)            # tri par distance croissante
    resultat = []
    for i in range(k):
        resultat.append(couples[i][1])
    return resultat

def classe_majoritaire(classes):
    meilleure = classes[0]
    for c in classes:
        if classes.count(c) > classes.count(meilleure):
            meilleure = c
    return meilleure

def predire(donnees, p, k):
    return classe_majoritaire(k_plus_proches(donnees, p, k))

donnees = [(1, 4, "triangle"), (2, 1, "rond"), (4, 4, "triangle"),
           (5, 2, "triangle"), (3, 0, "rond")]
assert predire(donnees, (3, 2), 1) == "rond"
assert predire(donnees, (3, 2), 3) == "rond"
assert predire(donnees, (3, 2), 5) == "triangle"`,
        },
        {
          type: 'p',
          text: 'Remarque : D et E sont à égale distance de P. `sorted` départage alors les couples selon le second élément (ordre alphabétique : "rond" avant "triangle") ; cela ne change rien ici puisque pour $k = 3$ les deux sont retenus. `classes.count(c)` parcourt toute la liste : `classe_majoritaire` est de coût quadratique en $k$, ce qui reste négligeable car $k$ est petit.',
        },
      ],
    },
    {
      id: 'gk-ex8',
      title: 'Choix de k et normalisation',
      difficulty: 3,
      duration: 25,
      tags: ['kNN', 'normalisation', 'choix de k'],
      statement: [
        {
          type: 'p',
          text: 'Une banque veut prédire si un client remboursera un prêt (classe « oui » / « non ») à partir de son **âge** (en années) et de son **revenu mensuel** (en euros). Exemples : U(25 ; 1 500) non, V(30 ; 3 000) oui, W(60 ; 1 600) oui, X(45 ; 3 100) oui, Y(22 ; 1 700) non. Nouveau client : Z(58 ; 1 800).',
        },
        { type: 'p', text: '1. Calculer les distances euclidiennes « brutes » de Z aux exemples et prédire la classe avec $k = 1$. Quelle caractéristique domine le calcul ?' },
        { type: 'p', text: '2. Normaliser les deux caractéristiques dans $[0 ; 1]$ (âges entre 22 et 60, revenus entre 1 500 et 3 100), puis refaire la prédiction avec $k = 1$.' },
        { type: 'p', text: '3. Que se passe-t-il si l’on choisit $k = 5$ ? Pourquoi choisir $k$ impair ici ?' },
      ],
      hints: [
        'Normalisation : $x\' = \\dfrac{x - x_{\\min}}{x_{\\max} - x_{\\min}}$.',
        'Pour comparer les distances, les carrés suffisent.',
      ],
      solution: [
        {
          type: 'table',
          headers: ['Client', 'Classe', 'Écart d’âge', 'Écart de revenu', '$d^2$ brute', '$d$ brute'],
          rows: [
            ['U(25 ; 1 500)', 'non', '33', '300', '$1\\,089 + 90\\,000 = 91\\,089$', '$\\approx 301{,}8$'],
            ['V(30 ; 3 000)', 'oui', '28', '1 200', '$784 + 1\\,440\\,000 = 1\\,440\\,784$', '$\\approx 1\\,200{,}3$'],
            ['W(60 ; 1 600)', 'oui', '2', '200', '$4 + 40\\,000 = 40\\,004$', '$\\approx 200{,}0$'],
            ['X(45 ; 3 100)', 'oui', '13', '1 300', '$169 + 1\\,690\\,000 = 1\\,690\\,169$', '$\\approx 1\\,300{,}1$'],
            ['Y(22 ; 1 700)', 'non', '36', '100', '$1\\,296 + 10\\,000 = 11\\,296$', '$\\approx 106{,}3$'],
          ],
        },
        {
          type: 'p',
          text: '1. Le plus proche voisin est Y (22 ans !) → prédiction « non ». Les écarts de revenu (des centaines d’euros) écrasent les écarts d’âge (quelques dizaines) : l’âge ne compte presque pas, alors que Z ressemble surtout à W (âge 60 et revenu proche).',
        },
        {
          type: 'p',
          text: '2. Âge normalisé : $(a - 22) / 38$ ; revenu normalisé : $(r - 1\\,500) / 1\\,600$. Z devient $(36/38 ; 300/1\\,600) \\approx (0{,}947 ; 0{,}188)$.',
        },
        {
          type: 'table',
          headers: ['Client', 'Coordonnées normalisées', '$d^2$ à Z'],
          rows: [
            ['U', '$(0{,}079 ; 0)$', '$0{,}754 + 0{,}035 \\approx 0{,}789$'],
            ['V', '$(0{,}211 ; 0{,}938)$', '$0{,}543 + 0{,}563 \\approx 1{,}105$'],
            ['W', '$(1 ; 0{,}063)$', '$0{,}003 + 0{,}016 \\approx 0{,}018$'],
            ['X', '$(0{,}605 ; 1)$', '$0{,}117 + 0{,}660 \\approx 0{,}777$'],
            ['Y', '$(0 ; 0{,}125)$', '$0{,}898 + 0{,}004 \\approx 0{,}901$'],
          ],
        },
        {
          type: 'p',
          text: 'Le plus proche voisin est maintenant **W** → prédiction « oui ». La normalisation donne le même poids aux deux caractéristiques et change la prédiction.',
        },
        {
          type: 'p',
          text: '3. Avec $k = 5 = n$, on utilise tous les exemples : 3 « oui » contre 2 « non », la prédiction est toujours « oui », quel que soit le client : la proximité ne joue plus aucun rôle. Avec deux classes, un $k$ impair garantit qu’il n’y a jamais d’égalité dans le vote.',
        },
      ],
    },
    {
      id: 'gk-ex9',
      title: 'Planning d’une salle (type bac)',
      difficulty: 3,
      duration: 30,
      tags: ['type bac', 'glouton', 'optimalité'],
      statement: [
        { type: 'p', text: 'Une salle de spectacle reçoit les demandes de réservation suivantes (heure de début, heure de fin) :' },
        {
          type: 'code',
          lang: 'python',
          code: `demandes = [(7, 15), (8, 9), (8, 10), (9, 12), (10, 11), (11, 14), (12, 13), (13, 15)]`,
        },
        { type: 'p', text: 'Deux réservations sont compatibles si l’une finit avant (ou au moment où) l’autre commence. On veut accepter **le plus grand nombre** de réservations compatibles.' },
        { type: 'p', text: '1. Stratégie 1 : choisir à chaque fois la réservation compatible qui **commence le plus tôt**. Combien de réservations obtient-on ?' },
        { type: 'p', text: '2. Stratégie 2 : choisir à chaque fois la réservation compatible qui **finit le plus tôt**. Combien en obtient-on ?' },
        { type: 'p', text: '3. Écrire une fonction `planning(demandes)` mettant en œuvre la stratégie 2. On triera les demandes par heure de fin à l’aide d’un tri par sélection.' },
        { type: 'p', text: '4. Expliquer pourquoi la stratégie 2 est un algorithme glouton et pourquoi la stratégie 1 n’est pas optimale.' },
      ],
      hints: ['Trier d’abord les demandes selon le critère choisi.', 'Garder en mémoire l’heure de fin de la dernière réservation acceptée.'],
      solution: [
        {
          type: 'p',
          text: '1. La demande qui commence le plus tôt est (7, 15) ; elle occupe la salle jusqu’à 15 h et toutes les autres sont incompatibles : **1 seule** réservation.',
        },
        {
          type: 'p',
          text: '2. Tri par fin : (8, 9), (8, 10), (10, 11), (9, 12), (12, 13), (11, 14), (7, 15), (13, 15). On prend (8, 9) ; (8, 10) commence avant 9 : non ; (10, 11) oui ; (9, 12) non ; (12, 13) oui ; (11, 14) non ; (7, 15) non ; (13, 15) oui. On obtient **4** réservations : (8, 9), (10, 11), (12, 13), (13, 15).',
        },
        {
          type: 'code',
          lang: 'python',
          code: `def tri_par_fin(t):
    t = list(t)
    n = len(t)
    for i in range(n - 1):
        i_min = i
        for j in range(i + 1, n):
            if t[j][1] < t[i_min][1]:
                i_min = j
        t[i], t[i_min] = t[i_min], t[i]
    return t

def planning(demandes):
    acceptees = []
    fin_derniere = 0                 # heure de fin de la dernière réservation acceptée
    for (debut, fin) in tri_par_fin(demandes):
        if debut >= fin_derniere:
            acceptees.append((debut, fin))
            fin_derniere = fin
    return acceptees

demandes = [(7, 15), (8, 9), (8, 10), (9, 12), (10, 11), (11, 14), (12, 13), (13, 15)]
assert planning(demandes) == [(8, 9), (10, 11), (12, 13), (13, 15)]`,
        },
        {
          type: 'p',
          text: '4. La stratégie 2 construit la solution pas à pas en faisant à chaque étape le choix qui paraît le meilleur (libérer la salle le plus tôt possible), sans jamais revenir sur une réservation acceptée : c’est un algorithme **glouton**. On peut démontrer qu’il est optimal (ici, une recherche exhaustive confirme que 4 est le maximum). La question 1 fournit un **contre-exemple** à la stratégie 1 : 1 réservation au lieu de 4.',
        },
        {
          type: 'p',
          text: 'Remarque : le tri par sélection n’étant pas stable, l’ordre des demandes ayant la même heure de fin, (7, 15) et (13, 15), n’est pas garanti ; cela ne change pas le résultat car aucune des deux ne peut être ajoutée avant l’autre.',
        },
      ],
    },
    {
      id: 'gk-ex10',
      title: 'Glouton ou force brute ?',
      difficulty: 3,
      duration: 30,
      tags: ['glouton', 'sac à dos', 'complexité'],
      statement: [
        { type: 'p', text: 'On veut comparer le glouton à la recherche exhaustive pour le sac à dos.' },
        { type: 'p', text: '1. Combien de sous-ensembles d’objets faut-il examiner pour $n = 10$, $n = 20$, $n = 40$ objets ?' },
        { type: 'p', text: '2. Un ordinateur examine $10^9$ sous-ensembles par seconde. Estimer la durée de la recherche exhaustive pour $n = 40$ et $n = 60$.' },
        { type: 'p', text: '3. Pour de petites valeurs de $n$, on peut énumérer les sous-ensembles à l’aide de l’écriture binaire des entiers de $0$ à $2^n - 1$ (le bit $i$ indique si l’objet $i$ est pris). Écrire une fonction `meilleur_sac(objets, capacite)` qui renvoie la valeur maximale.' },
      ],
      hints: ['Chaque objet est pris ou non : $2^n$ possibilités.', 'Le bit $i$ de l’entier `code` vaut `(code // 2**i) % 2`.'],
      solution: [
        {
          type: 'p',
          text: '1. $2^{10} = 1\\,024$ ; $2^{20} = 1\\,048\\,576$ (environ un million) ; $2^{40} \\approx 1{,}1 \\times 10^{12}$.',
        },
        {
          type: 'p',
          text: '2. Pour $n = 40$ : $\\frac{1{,}1 \\times 10^{12}}{10^9} \\approx 1\\,100$ s, soit environ 18 minutes. Pour $n = 60$ : $2^{60} \\approx 1{,}15 \\times 10^{18}$, soit $1{,}15 \\times 10^{9}$ s, environ **36 ans**. Le glouton, lui, ne demande qu’un tri et un parcours.',
        },
        {
          type: 'code',
          lang: 'python',
          code: `def meilleur_sac(objets, capacite):
    """objets : liste de couples (masse, valeur). Recherche exhaustive."""
    n = len(objets)
    meilleure_valeur = 0
    for code in range(2 ** n):          # chaque entier code un sous-ensemble
        masse_totale = 0
        valeur_totale = 0
        for i in range(n):
            if (code // 2 ** i) % 2 == 1:   # bit i à 1 : objet i pris
                masse_totale = masse_totale + objets[i][0]
                valeur_totale = valeur_totale + objets[i][1]
        if masse_totale <= capacite and valeur_totale > meilleure_valeur:
            meilleure_valeur = valeur_totale
    return meilleure_valeur

assert meilleur_sac([(6, 30), (5, 20), (5, 20)], 10) == 40   # le glouton donne 30
assert meilleur_sac([(12, 48), (5, 25), (5, 24), (4, 16), (3, 9)], 15) == 65`,
        },
        {
          type: 'p',
          text: 'Cette fonction donne toujours l’optimum mais son coût est **exponentiel** ($n \\times 2^n$ opérations) : elle n’est utilisable que pour quelques dizaines d’objets au plus. C’est tout l’intérêt des algorithmes gloutons : une solution rapide, parfois non optimale.',
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
      id: 'knn-classifier',
      props: { k: 3 },
      title: 'Classifieur des k plus proches voisins',
      caption: 'Déplacer le nouveau point et faire varier k : observer les voisins retenus et le vote majoritaire.',
    },
    {
      type: 'widget',
      id: 'knn-classifier',
      props: { k: 1 },
      title: 'kNN avec k = 1',
      caption: 'Avec un seul voisin, la prédiction est très sensible aux points isolés : comparer avec k = 3 ou 5.',
    },
    {
      type: 'svg',
      svg: `<svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <text x="130" y="20" text-anchor="middle" fill="currentColor" font-size="13">Glouton : 30 €</text>
  <text x="390" y="20" text-anchor="middle" fill="currentColor" font-size="13">Optimal : 40 €</text>
  <rect x="60" y="30" width="140" height="150" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <rect x="320" y="30" width="140" height="150" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <rect x="60" y="90" width="140" height="90" fill="hsl(25 95% 53%)" fill-opacity="0.35" stroke="hsl(25 95% 53%)"/>
  <text x="130" y="140" text-anchor="middle" fill="currentColor">A : 6 kg, 30 €</text>
  <text x="130" y="65" text-anchor="middle" fill="currentColor" font-size="11">4 kg libres : B, C trop lourds</text>
  <rect x="320" y="105" width="140" height="75" fill="hsl(217 91% 60%)" fill-opacity="0.3" stroke="hsl(217 91% 60%)"/>
  <rect x="320" y="30" width="140" height="75" fill="hsl(142 71% 45%)" fill-opacity="0.3" stroke="hsl(142 71% 45%)"/>
  <text x="390" y="147" text-anchor="middle" fill="currentColor">B : 5 kg, 20 €</text>
  <text x="390" y="72" text-anchor="middle" fill="currentColor">C : 5 kg, 20 €</text>
  <text x="260" y="195" text-anchor="middle" fill="currentColor" font-size="11">Capacité 10 kg</text>
</svg>`,
      caption: 'Contre-exemple : le choix glouton de l’objet au meilleur ratio (A) empêche la meilleure combinaison.',
      maxWidth: 560,
    },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Qu’est-ce qui caractérise un algorithme glouton ?',
          choices: [
            'Il essaie toutes les solutions possibles',
            'Il fait à chaque étape le choix localement optimal, sans revenir en arrière',
            'Il donne toujours la solution optimale',
            'Il utilise toujours une boucle while',
          ],
          answer: 1,
        },
        {
          question: 'Avec les pièces 1, 3, 4, combien de pièces le glouton rend-il pour 6 ?',
          choices: ['2', '3', '4', '6'],
          answer: 1,
          explanation: '$4 + 1 + 1$ : 3 pièces, alors que $3 + 3$ en utilise 2.',
        },
        {
          question: 'Un système de pièces est canonique si…',
          choices: [
            'il contient la pièce de 1',
            'le glouton donne une solution optimale pour toute somme',
            'ses valeurs sont des puissances de 2',
            'il est utilisé par une banque centrale',
          ],
          answer: 1,
        },
        {
          question: 'Distance euclidienne entre $A(1 ; 1)$ et $B(4 ; 5)$ ?',
          choices: ['5', '7', '25', '$\\sqrt{7}$'],
          answer: 0,
          explanation: '$\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$ (la distance de Manhattan vaut 7).',
        },
        {
          question: 'Pourquoi choisit-on souvent un k impair pour une classification à deux classes ?',
          choices: ['Pour aller plus vite', 'Pour éviter les égalités dans le vote', 'Parce que k pair est interdit', 'Pour normaliser les données'],
          answer: 1,
        },
        {
          question: 'Si k est égal au nombre total d’exemples, kNN prédit…',
          choices: ['la classe du plus proche voisin', 'toujours la classe la plus fréquente du jeu de données', 'une classe au hasard', 'une erreur'],
          answer: 1,
        },
        {
          question: 'Pourquoi normaliser les caractéristiques avant d’appliquer kNN ?',
          choices: [
            'Pour que la caractéristique ayant les plus grandes valeurs ne domine pas la distance',
            'Pour réduire le nombre d’exemples',
            'Pour rendre k impair',
            'Ce n’est jamais utile',
          ],
          answer: 0,
        },
        {
          question: 'Pour le sac à dos avec $n$ objets, combien de sous-ensembles la recherche exhaustive examine-t-elle ?',
          choices: ['$n$', '$n^2$', '$2^n$', '$n!$'],
          answer: 2,
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Problème d’optimisation', back: 'Trouver, parmi les solutions admissibles, une solution qui maximise ou minimise une quantité.' },
        { front: 'Algorithme glouton', back: 'À chaque étape, choix localement optimal, sans retour en arrière.' },
        { front: 'Glouton du rendu de monnaie', back: 'Rendre la plus grande pièce qui ne dépasse pas la somme restante.' },
        { front: 'Système canonique', back: 'Système de pièces pour lequel le glouton est optimal pour toute somme (ex. : euro).' },
        { front: 'Contre-exemple de rendu de monnaie', back: 'Pièces {1, 3, 4}, somme 6 : glouton 4+1+1 (3 pièces), optimal 3+3 (2 pièces).' },
        { front: 'Glouton du sac à dos', back: 'Trier par ratio valeur/masse décroissant, ajouter chaque objet s’il rentre.' },
        { front: 'Le glouton du sac à dos est-il optimal ?', back: 'Non en général (objets entiers) ; oui pour la version fractionnaire.' },
        { front: 'Choix d’activités optimal', back: 'Prendre l’activité compatible qui finit le plus tôt.' },
        { front: 'kNN : principe', back: 'Prédire la classe majoritaire parmi les k exemples les plus proches.' },
        { front: 'Distance euclidienne', back: '$\\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$' },
        { front: 'Distance de Manhattan', back: '$|x_B - x_A| + |y_B - y_A|$' },
        { front: 'k trop petit / trop grand', back: 'Trop petit : sensible au bruit. Trop grand : prédit la classe majoritaire globale.' },
        { front: 'Normalisation min-max', back: '$x\' = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}} \\in [0 ; 1]$' },
        { front: 'Apprentissage supervisé', back: 'Apprentissage à partir d’exemples dont on connaît la classe (étiquetés).' },
      ],
    },
    {
      type: 'ordering',
      title: 'Étapes de l’algorithme kNN',
      items: [
        'Disposer d’exemples étiquetés et d’un nouvel élément',
        'Calculer la distance du nouvel élément à chaque exemple',
        'Trier les exemples par distance croissante',
        'Garder les k premiers',
        'Compter les classes de ces k voisins',
        'Renvoyer la classe majoritaire',
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque problème à une stratégie gloutonne',
      pairs: [
        { left: 'Rendu de monnaie', right: 'Plus grande pièce inférieure ou égale au reste' },
        { left: 'Sac à dos', right: 'Meilleur rapport valeur/masse' },
        { left: 'Planning d’une salle', right: 'Activité qui finit le plus tôt' },
        { left: 'Plus proche voisin (k = 1)', right: 'Classe de l’exemple le plus proche' },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Un algorithme glouton revient sur ses choix s’ils se révèlent mauvais.', answer: false },
        { text: 'Le glouton du rendu de monnaie est optimal avec les pièces et billets en euros.', answer: true, explanation: 'Le système de l’euro est canonique.' },
        { text: 'Un seul contre-exemple suffit à montrer qu’un glouton n’est pas optimal.', answer: true },
        { text: 'L’algorithme kNN nécessite de connaître la classe des exemples.', answer: true, explanation: 'C’est un apprentissage supervisé.' },
        { text: 'Avec kNN, changer k ne peut pas changer la prédiction.', answer: false },
        { text: 'La distance de Manhattan entre (0 ; 0) et (3 ; 4) vaut 5.', answer: false, explanation: 'Elle vaut 3 + 4 = 7 ; c’est la distance euclidienne qui vaut 5.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'Un algorithme {{glouton}} fait à chaque étape un choix localement {{optimal}}, sans revenir en arrière. Avec le système euro, qui est {{canonique}}, il donne toujours le nombre minimal de pièces. L’algorithme des {{k}} plus proches voisins prédit la classe {{majoritaire}} parmi les voisins les plus proches ; il faut souvent {{normaliser}} les caractéristiques avant de calculer les distances.',
    },
  ],
}

export default chapter
