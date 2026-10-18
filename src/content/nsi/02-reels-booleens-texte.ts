import type { Block, Chapter } from '../types'

/** Bloc de code Python (la première ligne vide est retirée). */
const py = (code: string, caption?: string): Block => ({
  type: 'code',
  lang: 'python',
  code: code.replace(/^\n/, '').replace(/\n\s*$/, ''),
  ...(caption ? { caption } : {}),
})

const ieeeSvg = `<svg viewBox="0 0 640 170" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif">
  <text x="320" y="20" text-anchor="middle" font-size="13" fill="currentColor">Flottant simple précision (binary32) : −6,5 = −1,101₂ × 2²</text>
  <rect x="20" y="40" width="40" height="44" fill="hsl(0 84% 60%)" fill-opacity="0.18" stroke="hsl(0 84% 60%)" stroke-width="1.5"/>
  <text x="40" y="68" text-anchor="middle" font-size="15" fill="currentColor">1</text>
  <rect x="60" y="40" width="190" height="44" fill="hsl(142 71% 45%)" fill-opacity="0.18" stroke="hsl(142 71% 45%)" stroke-width="1.5"/>
  <text x="155" y="68" text-anchor="middle" font-size="15" fill="currentColor" letter-spacing="3">10000001</text>
  <rect x="250" y="40" width="370" height="44" fill="hsl(217 91% 60%)" fill-opacity="0.18" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>
  <text x="435" y="68" text-anchor="middle" font-size="15" fill="currentColor" letter-spacing="2">10100000000000000000000</text>
  <text x="40" y="104" text-anchor="middle" font-size="12" fill="hsl(0 84% 60%)">signe</text>
  <text x="40" y="120" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">1 bit</text>
  <text x="155" y="104" text-anchor="middle" font-size="12" fill="hsl(142 71% 45%)">exposant décalé</text>
  <text x="155" y="120" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">8 bits : 2 + 127 = 129</text>
  <text x="435" y="104" text-anchor="middle" font-size="12" fill="hsl(217 91% 60%)">mantisse (partie après la virgule de 1,…)</text>
  <text x="435" y="120" text-anchor="middle" font-size="11" class="svg-muted" fill="currentColor">23 bits : 101 puis des 0</text>
  <text x="320" y="155" text-anchor="middle" font-size="13" fill="currentColor">valeur = (−1)^s × 1,m × 2^(e − 127)   →   en hexadécimal : C0D00000</text>
</svg>`

const utf8Svg = `<svg viewBox="0 0 640 230" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif">
  <text x="20" y="22" font-size="13" fill="currentColor">Plage de points de code</text>
  <text x="250" y="22" font-size="13" fill="currentColor">Octets en UTF-8 (x = bits du point de code)</text>
  <line x1="20" y1="32" x2="620" y2="32" stroke="currentColor" class="svg-grid" stroke-width="1"/>
  <text x="20" y="62" font-size="13" fill="currentColor">U+0000 – U+007F</text>
  <text x="250" y="62" font-size="13" fill="hsl(217 91% 60%)" font-family="monospace">0xxxxxxx</text>
  <text x="560" y="62" font-size="12" class="svg-muted" fill="currentColor">1 octet</text>
  <text x="20" y="102" font-size="13" fill="currentColor">U+0080 – U+07FF</text>
  <text x="250" y="102" font-size="13" fill="hsl(142 71% 45%)" font-family="monospace">110xxxxx 10xxxxxx</text>
  <text x="560" y="102" font-size="12" class="svg-muted" fill="currentColor">2 octets</text>
  <text x="20" y="142" font-size="13" fill="currentColor">U+0800 – U+FFFF</text>
  <text x="250" y="142" font-size="13" fill="hsl(25 95% 53%)" font-family="monospace">1110xxxx 10xxxxxx 10xxxxxx</text>
  <text x="560" y="142" font-size="12" class="svg-muted" fill="currentColor">3 octets</text>
  <text x="20" y="182" font-size="13" fill="currentColor">U+10000 – U+10FFFF</text>
  <text x="250" y="182" font-size="13" fill="hsl(263 70% 60%)" font-family="monospace">11110xxx 10xxxxxx 10xxxxxx 10xxxxxx</text>
  <text x="560" y="182" font-size="12" class="svg-muted" fill="currentColor">4 octets</text>
  <text x="20" y="218" font-size="12" class="svg-muted" fill="currentColor">Exemples : A (U+0041) → 41 ; é (U+00E9) → C3 A9 ; € (U+20AC) → E2 82 AC ; 😀 (U+1F600) → F0 9F 98 80</text>
</svg>`

const chapter: Chapter = {
  id: 'reels-booleens-texte',
  subject: 'nsi',
  order: 2,
  title: 'Flottants, booléens et texte',
  theme: 'Représentation des données',
  summary:
    'Représentation approximative des réels par les flottants (IEEE 754), valeurs booléennes et opérateurs logiques, codage des caractères (ASCII, ISO-8859-1, Unicode et UTF-8).',
  duration: '3 semaines',
  objectives: [
    'Calculer sur quelques exemples la représentation de nombres réels : 0,1 ; 0,25 ou 1/3.',
    'Comprendre que les flottants sont des approximations et ne jamais tester l’égalité de deux flottants.',
    'Dresser la table d’une expression booléenne ; utiliser les opérateurs `and`, `or`, `not` et le ou exclusif.',
    'Comprendre le caractère séquentiel (paresseux) de l’évaluation de `and` et `or`.',
    'Identifier l’intérêt des différents systèmes d’encodage ; convertir un fichier texte dans différents formats d’encodage.',
  ],
  keywords: [
    'flottant',
    'IEEE 754',
    'mantisse',
    'exposant',
    'booléen',
    'table de vérité',
    'De Morgan',
    'évaluation paresseuse',
    'ASCII',
    'ISO-8859-1',
    'Unicode',
    'UTF-8',
  ],

  // =====================================================================
  // FICHE
  // =====================================================================
  fiche: [
    { type: 'h2', text: 'Nombres réels : les flottants' },
    {
      type: 'list',
      items: [
        'Partie fractionnaire en binaire : poids $2^{-1} = 0{,}5$, $2^{-2} = 0{,}25$, $2^{-3} = 0{,}125$… Ex. $5{,}75 = 101{,}11_2$.',
        'Méthode : multiplier la partie fractionnaire par 2, noter la partie entière (0 ou 1), recommencer avec la nouvelle partie fractionnaire. Les bits se lisent **de haut en bas**.',
        'Seuls les nombres de la forme $\\frac{k}{2^p}$ ont une écriture binaire finie. $0{,}1 = 0{,}0\\underline{0011}\\,\\underline{0011}\\dots_2$ est infini et périodique : il est **arrondi**.',
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Norme IEEE 754',
      content: [
        {
          type: 'math',
          tex: String.raw`x = (-1)^s \times 1{,}m \times 2^{\,e - \text{biais}}`,
        },
        {
          type: 'table',
          headers: ['Format', 'Signe s', 'Exposant e', 'Mantisse m', 'Biais'],
          rows: [
            ['simple (32 bits)', '1', '8', '23', '127'],
            ['double (64 bits) = `float` Python', '1', '11', '52', '1 023'],
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ne jamais tester l’égalité de deux flottants',
      content: [
        py(String.raw`
>>> 0.1 + 0.2
0.30000000000000004
>>> 0.1 + 0.2 == 0.3
False
>>> abs((0.1 + 0.2) - 0.3) < 1e-9    # comparaison avec une tolérance
True
`),
      ],
    },
    { type: 'h2', text: 'Booléens' },
    {
      type: 'table',
      headers: ['`a`', '`b`', '`not a`', '`a and b`', '`a or b`', '`a ^ b` (xor)'],
      rows: [
        ['False', 'False', 'True', 'False', 'False', 'False'],
        ['False', 'True', 'True', 'False', 'True', 'True'],
        ['True', 'False', 'False', 'False', 'True', 'True'],
        ['True', 'True', 'False', 'True', 'True', 'False'],
      ],
    },
    {
      type: 'list',
      items: [
        'Priorités : `not` > `and` > `or`. Notations : $\\overline{a}$ ou $\\neg a$, $a \\cdot b$ ou $a \\wedge b$, $a + b$ ou $a \\vee b$, $a \\oplus b$.',
        '**Lois de De Morgan** : $\\overline{a \\cdot b} = \\overline{a} + \\overline{b}$ et $\\overline{a + b} = \\overline{a} \\cdot \\overline{b}$.',
        '**Évaluation paresseuse** (séquentielle) : dans `a and b`, si `a` est faux, `b` n’est pas évalué ; dans `a or b`, si `a` est vrai, `b` n’est pas évalué. Ex. `x != 0 and 1 / x > 2` ne provoque jamais de division par zéro.',
      ],
    },
    { type: 'h2', text: 'Texte' },
    {
      type: 'table',
      headers: ['Codage', 'Taille', 'Contenu'],
      rows: [
        ['ASCII (1963)', '7 bits, 128 caractères', 'Lettres non accentuées, chiffres, ponctuation, contrôle. `A` = 65, `a` = 97, `0` = 48, espace = 32.'],
        ['ISO-8859-1 (Latin-1)', '8 bits, 256 caractères', 'ASCII + accents d’Europe de l’Ouest (`é` = E9). Pas de `€`, ni de `œ`.'],
        ['Unicode', 'points de code U+0000 à U+10FFFF', 'Tous les systèmes d’écriture (plus de 150 000 caractères), symboles, emojis.'],
        ['UTF-8', '1 à 4 octets par caractère', 'Encodage d’Unicode compatible ASCII ; le plus utilisé sur le Web.'],
      ],
    },
    py(String.raw`
ord('A'), chr(97)       # (65, 'a')
'é'.encode('utf-8')     # b'\xc3\xa9'  (2 octets)
b'\xc3\xa9'.decode('latin-1')   # 'Ã©'  : mauvais décodage (mojibake)
`),
  ],

  // =====================================================================
  // COURS
  // =====================================================================
  cours: [
    // ---------------------------------------------------------------
    { type: 'h2', text: '1. Représentation approximative des nombres réels' },
    { type: 'h3', text: '1.1 Écriture binaire d’un nombre à virgule' },
    {
      type: 'p',
      text: 'Comme en base 10, les chiffres situés après la virgule ont des poids qui sont des puissances **négatives** de la base. En base 2 :',
    },
    {
      type: 'math',
      tex: String.raw`101{,}11_2 = 1\times 2^2 + 0 \times 2^1 + 1 \times 2^0 + 1 \times 2^{-1} + 1 \times 2^{-2} = 4 + 1 + 0{,}5 + 0{,}25 = 5{,}75`,
    },
    {
      type: 'table',
      headers: ['$2^{-1}$', '$2^{-2}$', '$2^{-3}$', '$2^{-4}$', '$2^{-5}$'],
      rows: [['0,5', '0,25', '0,125', '0,062 5', '0,031 25']],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Convertir la partie fractionnaire en binaire',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Multiplier par 2', text: 'Multiplier la partie fractionnaire $f$ par 2.' },
            { title: 'Noter la partie entière', text: 'La partie entière (0 ou 1) est le bit suivant après la virgule.' },
            { title: 'Recommencer', text: 'Recommencer avec la nouvelle partie fractionnaire, jusqu’à obtenir 0 (ou repérer une période).' },
          ],
        },
        {
          type: 'p',
          text: 'Exemple $0{,}375$ : $0{,}375 \\times 2 = \\mathbf{0}{,}75$ ; $0{,}75 \\times 2 = \\mathbf{1}{,}5$ ; $0{,}5 \\times 2 = \\mathbf{1}{,}0$. Donc $0{,}375 = 0{,}011_2$ (vérification : $0{,}25 + 0{,}125$). ✔',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: '0,1 n’a pas d’écriture binaire finie',
      content: [
        {
          type: 'table',
          headers: ['Calcul', 'Bit', 'Calcul', 'Bit'],
          rows: [
            ['0,1 × 2 = 0,2', '0', '0,6 × 2 = 1,2', '1'],
            ['0,2 × 2 = 0,4', '0', '0,2 × 2 = 0,4', '0  ← on retrouve 0,2'],
            ['0,4 × 2 = 0,8', '0', '…', '…'],
            ['0,8 × 2 = 1,6', '1', '', ''],
          ],
        },
        {
          type: 'p',
          text: 'On obtient $0{,}1 = 0{,}0\\,0011\\,0011\\,0011\\dots_2$ : le motif $0011$ se répète indéfiniment. Avec un nombre fini de bits, l’ordinateur ne peut stocker qu’une **valeur approchée** de $0{,}1$.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Quels nombres ont une écriture binaire finie ?',
      content: [
        {
          type: 'p',
          text: 'Un nombre a une écriture binaire finie si et seulement si il s’écrit $\\frac{k}{2^p}$ avec $k$ entier et $p$ entier naturel. Ainsi $0{,}25 = \\frac{1}{4}$ et $0{,}375 = \\frac{3}{8}$ sont exacts, mais pas $0{,}1 = \\frac{1}{10}$ ni $\\frac{1}{3} = 0{,}010101\\dots_2$. C’est l’analogue de $\\frac13 = 0{,}333\\dots$ en base 10.',
        },
      ],
    },

    { type: 'h3', text: '1.2 Virgule flottante et norme IEEE 754' },
    {
      type: 'p',
      text: 'Pour représenter à la fois de très grands et de très petits nombres, on utilise une **notation scientifique en base 2** : $-6{,}5 = -110{,}1_2 = -1{,}101_2 \\times 2^2$. On fait « flotter » la virgule pour n’avoir qu’un seul chiffre 1 devant elle. On stocke alors trois informations : le **signe**, l’**exposant** et la **mantisse** (les chiffres après la virgule).',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Format IEEE 754 (normalisé)',
      content: [
        { type: 'math', tex: String.raw`x = (-1)^s \times 1{,}m \times 2^{\,e - \text{biais}}` },
        {
          type: 'list',
          items: [
            '$s$ : bit de signe (0 = positif, 1 = négatif).',
            '$e$ : exposant **décalé**, stocké comme un entier naturel ; on lui retranche un biais (127 en simple précision, 1 023 en double précision) pour obtenir l’exposant réel, qui peut ainsi être négatif.',
            '$m$ : mantisse, les bits **après** la virgule. Le « 1, » initial n’est pas stocké (bit implicite) : on gagne un bit de précision.',
          ],
        },
        {
          type: 'table',
          headers: ['Format', 'Total', 'Signe', 'Exposant', 'Mantisse', 'Biais', 'Chiffres décimaux significatifs'],
          rows: [
            ['simple précision (binary32)', '32 bits', '1', '8', '23', '127', 'environ 7'],
            ['double précision (binary64)', '64 bits', '1', '11', '52', '1 023', 'environ 15 à 16'],
          ],
        },
      ],
    },
    {
      type: 'svg',
      svg: ieeeSvg,
      maxWidth: 680,
      caption: 'Les trois champs d’un flottant 32 bits, sur l’exemple de −6,5.',
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Coder un réel en simple précision',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Signe', text: '$s = 0$ si $x \\ge 0$, $s = 1$ sinon. On continue avec $|x|$.' },
            { title: 'Binaire', text: 'Écrire $|x|$ en binaire (partie entière + partie fractionnaire).' },
            { title: 'Normaliser', text: 'Écrire $|x| = 1{,}m \\times 2^E$ en déplaçant la virgule.' },
            { title: 'Exposant', text: 'Calculer $e = E + 127$ et l’écrire sur 8 bits.' },
            { title: 'Mantisse', text: 'Recopier $m$ et compléter à droite par des 0 jusqu’à 23 bits (ou arrondir).' },
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : −6,5',
      content: [
        {
          type: 'list',
          items: [
            'Négatif : $s = 1$.',
            '$6{,}5 = 110{,}1_2 = 1{,}101_2 \\times 2^2$, donc $E = 2$ et $m = 101$.',
            '$e = 2 + 127 = 129 = 10000001_2$.',
            'Mot de 32 bits : `1 10000001 10100000000000000000000`, soit `C0D00000` en hexadécimal.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Décodage : que vaut 0x41540000 ?',
      content: [
        {
          type: 'p',
          text: '`41540000` = `0100 0001 0101 0100 0000…` : $s = 0$, $e = 10000010_2 = 130$, donc $E = 130 - 127 = 3$ ; $m = 10101000\\dots$. Valeur : $1{,}10101_2 \\times 2^3 = 1101{,}01_2 = 8 + 4 + 1 + 0{,}25 = 13{,}25$.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Valeurs spéciales (pour la culture)',
      content: [
        {
          type: 'p',
          text: 'Les exposants « tout à 0 » et « tout à 1 » sont réservés : zéro (il existe $+0$ et $-0$), les nombres dénormalisés (très proches de 0), $+\\infty$, $-\\infty$ et `NaN` (*Not a Number*, résultat d’une opération indéfinie). En Python, `1e308 * 10` donne `inf`.',
        },
      ],
    },

    { type: 'h3', text: '1.3 Conséquences pratiques' },
    {
      type: 'p',
      text: 'En Python, le type `float` est un flottant **double précision** (64 bits). Comme $0{,}1$, $0{,}2$ et $0{,}3$ sont tous arrondis, et que le résultat de l’addition est lui aussi arrondi, les erreurs ne se compensent pas :',
    },
    py(String.raw`
>>> 0.1 + 0.2
0.30000000000000004
>>> 0.1 + 0.2 == 0.3
False
>>> 0.1 * 3
0.30000000000000004
>>> 0.5 + 0.25 == 0.75     # nombres dyadiques : calcul exact
True
>>> s = 0
>>> for i in range(10):
...     s = s + 0.1
>>> s
0.9999999999999999
>>> 2**53 + 1.0 == 2**53     # au-delà de 2**53, tous les entiers ne sont plus représentables
True
`),
    {
      type: 'callout',
      variant: 'warning',
      title: 'Règles de bonne conduite',
      content: [
        {
          type: 'list',
          items: [
            'Ne **jamais** utiliser `==` entre deux flottants issus de calculs. Comparer avec une tolérance : `abs(a - b) < 1e-9`, ou `math.isclose(a, b)`.',
            'Ne pas utiliser un flottant comme compteur de boucle (`while x != 1:` avec `x += 0.1` ne s’arrête jamais !).',
            'Pour de l’argent, compter en centimes avec des entiers.',
            'L’addition de flottants n’est pas toujours associative : `(0.1 + 0.2) + 0.3` vaut `0.6000000000000001` mais `0.1 + (0.2 + 0.3)` vaut `0.6`.',
          ],
        },
      ],
    },
    py(String.raw`
def presque_egal(a, b, eps=1e-9):
    return abs(a - b) < eps

print(presque_egal(0.1 + 0.2, 0.3))   # True
`),
    {
      type: 'callout',
      variant: 'history',
      title: 'Missile Patriot (1991)',
      content: [
        {
          type: 'p',
          text: 'L’horloge des batteries Patriot comptait en dixièmes de seconde, et 0,1 était stocké sur 24 bits avec une petite erreur d’arrondi (environ $9{,}5 \\times 10^{-8}$). Après 100 heures de fonctionnement, l’erreur cumulée atteignait environ 0,34 s : à Dhahran, un missile Scud n’a pas été intercepté, causant la mort de 28 soldats.',
        },
      ],
    },

    // ---------------------------------------------------------------
    { type: 'h2', text: '2. Les booléens' },
    {
      type: 'p',
      text: 'Un **booléen** est une valeur qui ne peut prendre que deux états : vrai ou faux (notés aussi 1 et 0). Ils portent le nom de George Boole (1815–1864). En Python, le type `bool` a deux valeurs : `True` et `False`. Ce sont les résultats des comparaisons (`==`, `!=`, `<`, `<=`, `>`, `>=`, `in`) et les conditions des `if` et `while`.',
    },
    py(String.raw`
>>> 3 < 5
True
>>> type(3 == 4)
<class 'bool'>
>>> 'a' in 'chat'
True
>>> True + True        # en Python, True vaut 1 et False vaut 0
2
`),
    { type: 'h3', text: '2.1 Opérateurs booléens' },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'NON — `not a`', text: 'Vrai si et seulement si `a` est faux. Notation $\\overline{a}$ ou $\\neg a$.', icon: 'ToggleLeft' },
        { title: 'ET — `a and b`', text: 'Vrai si et seulement si `a` **et** `b` sont vrais. Notation $a \\cdot b$ ou $a \\wedge b$.', icon: 'Link' },
        { title: 'OU — `a or b`', text: 'Vrai si **au moins un** des deux est vrai (ou inclusif). Notation $a + b$ ou $a \\vee b$.', icon: 'GitMerge' },
        { title: 'OU EXCLUSIF — `a ^ b`', text: 'Vrai si **exactement un** des deux est vrai. Notation $a \\oplus b$. Sur des booléens, `a != b` donne le même résultat.', icon: 'Split' },
      ],
    },
    {
      type: 'table',
      headers: ['a', 'b', 'NON a', 'a ET b', 'a OU b', 'a XOR b'],
      rows: [
        ['0', '0', '1', '0', '0', '0'],
        ['0', '1', '1', '0', '1', '1'],
        ['1', '0', '0', '0', '1', '1'],
        ['1', '1', '0', '1', '1', '0'],
      ],
      caption: 'Tables de vérité des opérateurs de base (0 = faux, 1 = vrai).',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Priorités en Python',
      content: [
        {
          type: 'p',
          text: '`not` est prioritaire sur `and`, lui-même prioritaire sur `or`. Ainsi `a or not b and c` se lit `a or ((not b) and c)`. En cas de doute, **mettre des parenthèses**.',
        },
      ],
    },
    { type: 'h3', text: '2.2 Table de vérité d’une expression' },
    {
      type: 'callout',
      variant: 'method',
      title: 'Dresser une table de vérité',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Lister les entrées', text: 'Avec $k$ variables, il y a $2^k$ lignes. On les énumère comme on compte en binaire : 000, 001, 010…' },
            { title: 'Colonnes intermédiaires', text: 'Ajouter une colonne par sous-expression, de la plus simple à la plus complexe.' },
            { title: 'Remplir', text: 'Remplir ligne par ligne avec les tables des opérateurs.' },
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Table de $(a \\text{ and not } b) \\text{ or } c$',
      content: [
        {
          type: 'table',
          headers: ['a', 'b', 'c', 'not b', 'a and not b', '(a and not b) or c'],
          rows: [
            ['0', '0', '0', '1', '0', '0'],
            ['0', '0', '1', '1', '0', '1'],
            ['0', '1', '0', '0', '0', '0'],
            ['0', '1', '1', '0', '0', '1'],
            ['1', '0', '0', '1', '1', '1'],
            ['1', '0', '1', '1', '1', '1'],
            ['1', '1', '0', '0', '0', '0'],
            ['1', '1', '1', '0', '0', '1'],
          ],
        },
      ],
    },
    py(String.raw`
print("a     b     c     résultat")
for a in [False, True]:
    for b in [False, True]:
        for c in [False, True]:
            print(a, b, c, (a and not b) or c)
`, 'Générer la table de vérité avec trois boucles imbriquées'),
    {
      type: 'callout',
      variant: 'property',
      title: 'Lois de l’algèbre de Boole',
      content: [
        {
          type: 'table',
          headers: ['Loi', 'Forme ET', 'Forme OU'],
          rows: [
            ['Élément neutre', '$a \\cdot 1 = a$', '$a + 0 = a$'],
            ['Élément absorbant', '$a \\cdot 0 = 0$', '$a + 1 = 1$'],
            ['Complément', '$a \\cdot \\overline{a} = 0$', '$a + \\overline{a} = 1$'],
            ['Double négation', '$\\overline{\\overline{a}} = a$', ''],
            ['Distributivité', '$a \\cdot (b + c) = a\\cdot b + a \\cdot c$', '$a + b \\cdot c = (a + b)\\cdot(a + c)$'],
            ['**De Morgan**', '$\\overline{a \\cdot b} = \\overline{a} + \\overline{b}$', '$\\overline{a + b} = \\overline{a} \\cdot \\overline{b}$'],
          ],
        },
        {
          type: 'p',
          text: 'Exemple de De Morgan : « il n’est pas vrai qu’il fait beau **et** chaud » équivaut à « il ne fait pas beau **ou** il ne fait pas chaud ». En Python, `not (x > 0 and x < 10)` équivaut à `x <= 0 or x >= 10`.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Démontrer une égalité booléenne',
      content: [
        {
          type: 'p',
          text: 'Deux expressions sont égales si elles ont la **même table de vérité** : il suffit de vérifier les $2^k$ cas. Par exemple, $a \\oplus b = (a \\cdot \\overline{b}) + (\\overline{a} \\cdot b)$ se vérifie sur les 4 lignes.',
        },
      ],
    },
    { type: 'h3', text: '2.3 Évaluation paresseuse (séquentielle)' },
    {
      type: 'p',
      text: 'En Python, les opérateurs `and` et `or` évaluent leurs opérandes **de gauche à droite** et **s’arrêtent dès que le résultat est connu** :',
    },
    {
      type: 'list',
      items: [
        '`a and b` : si `a` est faux, le résultat est faux quel que soit `b`, donc `b` **n’est pas évalué**.',
        '`a or b` : si `a` est vrai, le résultat est vrai quel que soit `b`, donc `b` **n’est pas évalué**.',
      ],
    },
    py(String.raw`
def f():
    print("f est appelée")
    return True

>>> False and f()     # f n'est pas appelée
False
>>> True and f()      # f est appelée
f est appelée
True
>>> True or f()       # f n'est pas appelée
True
`),
    {
      type: 'callout',
      variant: 'example',
      title: 'Utilité : protéger une opération',
      content: [
        py(String.raw`
x = 0
if x != 0 and 10 / x > 1:      # aucune erreur : 10 / x n'est jamais calculé
    print("grand")

t = []
if len(t) > 0 and t[0] == 5:   # pas d'IndexError sur une liste vide
    print("commence par 5")

i = 0
while i < len(t) and t[i] != 5:   # l'ordre des conditions est essentiel
    i = i + 1
`),
        {
          type: 'p',
          text: 'Si l’on inversait les conditions (`10 / x > 1 and x != 0`), on obtiendrait une `ZeroDivisionError`. Contrairement à la logique mathématique, `and` n’est donc **pas commutatif** du point de vue de l’exécution.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Pour aller plus loin',
      content: [
        {
          type: 'p',
          text: 'Python considère comme « faux » : `False`, `0`, `0.0`, `\'\'`, `[]`, `{}`, `None`. Tout le reste est « vrai ». Et `and`/`or` renvoient en réalité **l’un des opérandes** : `3 and 5` vaut `5`, `0 or \'a\'` vaut `\'a\'`. Les opérateurs bit à bit `&`, `|`, `^` appliqués à des entiers agissent sur chaque bit, sans évaluation paresseuse.',
        },
      ],
    },

    // ---------------------------------------------------------------
    { type: 'h2', text: '3. Représentation du texte' },
    {
      type: 'p',
      text: 'Pour stocker un texte, on associe à chaque caractère un **numéro** (point de code), puis on code ce numéro en binaire. Un **jeu de caractères** est la table caractère ↔ numéro ; un **encodage** décrit la façon d’écrire ces numéros en octets.',
    },
    { type: 'h3', text: '3.1 ASCII' },
    {
      type: 'p',
      text: 'L’**ASCII** (*American Standard Code for Information Interchange*, 1963) code **128 caractères** sur **7 bits** (en pratique, un octet dont le bit de poids fort vaut 0) : 33 caractères de contrôle (retour à la ligne = 10, tabulation = 9…), l’espace (32), les chiffres, les lettres latines majuscules et minuscules **sans accent** et la ponctuation.',
    },
    {
      type: 'table',
      headers: ['Caractère', 'Décimal', 'Hexadécimal', 'Binaire'],
      rows: [
        ['espace', '32', '20', '0100000'],
        ['`0` … `9`', '48 … 57', '30 … 39', '0110000 …'],
        ['`A` … `Z`', '65 … 90', '41 … 5A', '1000001 …'],
        ['`a` … `z`', '97 … 122', '61 … 7A', '1100001 …'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Astuces de l’ASCII',
      content: [
        {
          type: 'list',
          items: [
            'Minuscule = majuscule + 32 (un seul bit diffère, celui de poids 32).',
            'La valeur d’un chiffre : `ord(c) - ord(\'0\')`, ex. `ord(\'7\') - 48 = 7`.',
            'L’ordre alphabétique des majuscules correspond à l’ordre des codes : `\'A\' < \'B\'` vaut `True`. Mais `\'Z\' < \'a\'` vaut aussi `True` !',
          ],
        },
      ],
    },
    py(String.raw`
>>> ord('A')          # point de code d'un caractère
65
>>> chr(97)           # caractère d'un point de code
'a'
>>> chr(ord('c') - 32)
'C'
`),
    { type: 'h3', text: '3.2 ISO-8859-1 (Latin-1)' },
    {
      type: 'p',
      text: 'L’ASCII ne permet pas d’écrire « élève » ou « niño ». Les normes **ISO-8859** utilisent le 8ᵉ bit : 256 caractères, dont les 128 premiers sont ceux de l’ASCII. **ISO-8859-1** (Latin-1) couvre les langues d’Europe de l’Ouest : `é` = 233 (E9), `è` = 232 (E8), `ç` = 231 (E7), `à` = 224 (E0).',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Limites',
      content: [
        {
          type: 'list',
          items: [
            'Il manque des caractères français : `œ`, `Œ`, `Ÿ` et le symbole `€` (ajoutés dans ISO-8859-15, Latin-9).',
            'Il existe une quinzaine de variantes incompatibles (ISO-8859-5 pour le cyrillique, ISO-8859-7 pour le grec…) : l’octet E9 vaut `é` en Latin-1 mais `щ` en ISO-8859-5. Impossible de mélanger plusieurs alphabets dans un même texte.',
            'Rien pour le chinois, le japonais, l’arabe… qui ont des milliers de caractères.',
          ],
        },
      ],
    },
    { type: 'h3', text: '3.3 Unicode et UTF-8' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Unicode',
      content: [
        {
          type: 'p',
          text: '**Unicode** (1991) est un jeu de caractères universel : il attribue à chaque caractère de chaque écriture un **point de code** unique, noté `U+` suivi de 4 à 6 chiffres hexadécimaux, de U+0000 à U+10FFFF (plus d’un million de places possibles ; plus de 150 000 caractères attribués). Ex. `A` = U+0041, `é` = U+00E9, `€` = U+20AC, `😀` = U+1F600. Les 256 premiers points de code coïncident avec ISO-8859-1.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'UTF-8',
      content: [
        {
          type: 'p',
          text: '**UTF-8** (Ken Thompson et Rob Pike, 1992) est un encodage d’Unicode à **longueur variable** : chaque caractère occupe 1, 2, 3 ou 4 octets. Les caractères ASCII occupent 1 octet identique à leur code ASCII : un texte ASCII est donc aussi un texte UTF-8 valide. C’est l’encodage de la très grande majorité des pages Web (plus de 98 %).',
        },
      ],
    },
    { type: 'svg', svg: utf8Svg, maxWidth: 680, caption: 'Principe de l’encodage UTF-8 : les premiers bits indiquent le nombre d’octets, les octets de continuation commencent par 10.' },
    {
      type: 'callout',
      variant: 'example',
      title: 'Encoder « é » (U+00E9) en UTF-8',
      content: [
        {
          type: 'list',
          items: [
            '$\\text{E9}_{16} = 233$ est entre U+0080 et U+07FF : il faut **2 octets** `110xxxxx 10xxxxxx` (11 bits disponibles).',
            'En binaire sur 11 bits : $\\text{E9} = 000\\,1110\\,1001 \\to$ `00011` | `101001`.',
            'Octets : `110` + `00011` = `11000011` = **C3** ; `10` + `101001` = `10101001` = **A9**.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Le « mojibake » : Ã© au lieu de é',
      content: [
        {
          type: 'p',
          text: 'Si un fichier écrit en UTF-8 est lu comme du Latin-1, chaque octet est interprété séparément : C3 donne `Ã` et A9 donne `©`. « élève » devient « Ã©lÃ¨ve ». Inversement, un fichier Latin-1 lu en UTF-8 provoque des erreurs (souvent affichées �). Il faut donc toujours **connaître l’encodage** d’un fichier texte (balise `<meta charset="utf-8">` en HTML, paramètre `encoding` en Python).',
        },
      ],
    },
    py(String.raw`
>>> s = 'Noël €'
>>> len(s)                    # nombre de caractères
6
>>> b = s.encode('utf-8')     # chaîne -> octets
>>> b
b'No\xc3\xabl \xe2\x82\xac'
>>> len(b)                    # nombre d'octets : 1+1+2+1+1+3
9
>>> b.decode('utf-8')         # octets -> chaîne
'Noël €'
>>> 'é'.encode('utf-8').decode('latin-1')
'Ã©'
>>> 'Noël'.encode('latin-1')  # 1 octet par caractère
b'No\xebl'
>>> '€'.encode('latin-1')     # impossible : € n'existe pas en Latin-1
UnicodeEncodeError: 'latin-1' codec can't encode character '€' ...
`),
    py(String.raw`
# Convertir un fichier texte de Latin-1 vers UTF-8
with open('ancien.txt', 'r', encoding='latin-1') as f:
    contenu = f.read()
with open('nouveau.txt', 'w', encoding='utf-8') as f:
    f.write(contenu)
`, 'Conversion d’encodage d’un fichier'),
    {
      type: 'table',
      headers: ['', 'ASCII', 'ISO-8859-1', 'UTF-8'],
      rows: [
        ['Nombre de caractères', '128', '256', 'tout Unicode (≈ 1,1 million de places)'],
        ['Taille d’un caractère', '7 bits (1 octet)', '1 octet', '1 à 4 octets'],
        ['`é`', 'impossible', 'E9', 'C3 A9'],
        ['`€`', 'impossible', 'impossible', 'E2 82 AC'],
        ['Compatible ASCII', '—', 'oui', 'oui'],
      ],
      caption: 'Comparaison des trois encodages au programme.',
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'À retenir',
      content: [
        {
          type: 'list',
          items: [
            'Les flottants sont des **approximations** : $0{,}1$ n’est pas représentable exactement. Jamais de `==` entre flottants.',
            'IEEE 754 : signe, exposant décalé, mantisse ; $x = (-1)^s \\times 1{,}m \\times 2^{e - \\text{biais}}$.',
            '`and` et `or` sont paresseux : le second opérande n’est évalué que si nécessaire.',
            'De Morgan : `not (a and b)` = `(not a) or (not b)` ; `not (a or b)` = `(not a) and (not b)`.',
            'ASCII ⊂ ISO-8859-1 ⊂ Unicode ; UTF-8 encode Unicode sur 1 à 4 octets, compatible ASCII.',
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
      id: 'binaire-virgule',
      title: 'Nombres à virgule en binaire',
      difficulty: 1,
      duration: 10,
      tags: ['flottants', 'conversion'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Convertir $110{,}011_2$ en décimal.',
            'Convertir $5{,}75$ et $0{,}625$ en binaire.',
            'Montrer que $0{,}2$ n’a pas d’écriture binaire finie et donner ses 8 premiers bits après la virgule.',
          ],
        },
      ],
      hints: ['Les poids après la virgule sont 0,5 ; 0,25 ; 0,125…', 'Pour la partie fractionnaire, multiplier par 2 de façon répétée.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '$110{,}011_2 = 4 + 2 + 0{,}25 + 0{,}125 = 6{,}375$.',
            '$5 = 101_2$ ; $0{,}75 \\times 2 = 1{,}5$ (1), $0{,}5 \\times 2 = 1$ (1) : $5{,}75 = 101{,}11_2$. Pour $0{,}625$ : $1{,}25$ (1), $0{,}5$ (0), $1{,}0$ (1) : $0{,}625 = 0{,}101_2$.',
            '$0{,}2 \\times 2 = 0{,}4$ (0) ; $0{,}8$ (0) ; $1{,}6$ (1) ; $0{,}6 \\times 2 = 1{,}2$ (1) ; $0{,}2 \\times 2 = 0{,}4$ (0) : on retrouve $0{,}2$, le calcul boucle. $0{,}2 = 0{,}\\underline{0011}\\,\\underline{0011}\\dots_2$, soit `0,00110011…`. Autre argument : $0{,}2 = \\frac15$ ne s’écrit pas $\\frac{k}{2^p}$.',
          ],
        },
      ],
    },
    {
      id: 'ieee-codage',
      title: 'Coder et décoder en simple précision',
      difficulty: 2,
      duration: 20,
      tags: ['IEEE 754', 'flottants'],
      statement: [
        { type: 'p', text: 'On utilise le format IEEE 754 simple précision (1 bit de signe, 8 bits d’exposant avec un biais de 127, 23 bits de mantisse).' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Coder $5{,}75$. Donner le résultat en hexadécimal.',
            'Coder $-0{,}156\\,25$ (on remarquera que $0{,}156\\,25 = \\frac{5}{32}$).',
            'Quel nombre est codé par `C1200000` ?',
          ],
        },
      ],
      hints: [
        '$5{,}75 = 101{,}11_2$ : déplacer la virgule pour obtenir $1{,}…$.',
        '$\\frac{5}{32} = \\frac{101_2}{2^5} = 0{,}00101_2$.',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '$5{,}75 = 101{,}11_2 = 1{,}0111_2 \\times 2^2$. $s = 0$, $e = 129 = 10000001$, $m = 0111\\,0\\dots0$. Mot : `0 10000001 01110000000000000000000` = `0100 0000 1011 1000 0…` = **40B80000**.',
            '$0{,}15625 = 0{,}00101_2 = 1{,}01_2 \\times 2^{-3}$. $s = 1$, $e = -3 + 127 = 124 = 01111100$, $m = 01\\,0\\dots0$. Mot : `1 01111100 01000000000000000000000` = `1011 1110 0010 0000…` = **BE200000**.',
            '`C1200000` = `1100 0001 0010 0000 …` : $s = 1$, $e = 10000010 = 130$ donc $E = 3$, $m = 01\\,0\\dots$. Valeur : $-1{,}01_2 \\times 2^3 = -1010_2 = $ **−10**.',
          ],
        },
        py(String.raw`
import struct
print(struct.pack('>f', 5.75).hex())       # 40b80000
print(struct.pack('>f', -0.15625).hex())   # be200000
print(struct.unpack('>f', bytes.fromhex('c1200000'))[0])   # -10.0
`, 'Vérification (hors programme) avec le module struct'),
      ],
    },
    {
      id: 'egalite-flottants',
      title: 'Le piège de l’égalité',
      difficulty: 2,
      duration: 15,
      tags: ['flottants', 'programmation', 'boucle'],
      statement: [
        { type: 'p', text: 'On considère le programme suivant :' },
        py(String.raw`
x = 0
n = 0
while x != 1:
    x = x + 0.1
    n = n + 1
print(n)
`),
        {
          type: 'list',
          ordered: true,
          items: [
            'Que devrait afficher ce programme si les calculs étaient exacts ? Que se passe-t-il réellement ?',
            'Corriger ce programme pour qu’il affiche 10, de deux façons différentes.',
          ],
        },
      ],
      hints: ['Après 10 tours, `x` vaut `0.9999999999999999`.', 'Une solution compare avec une tolérance, l’autre évite les flottants.'],
      solution: [
        {
          type: 'p',
          text: '1. Il devrait afficher 10. Mais $0{,}1$ est stocké de façon approchée et les erreurs d’arrondi s’accumulent : après 10 tours, `x` vaut `0.9999999999999999`, qui est différent de 1. La condition `x != 1` reste vraie, puis `x` dépasse 1 : **la boucle ne s’arrête jamais**.',
        },
        py(String.raw`
# Solution 1 : condition avec une tolérance (ou une inégalité)
x = 0
n = 0
while abs(x - 1) > 1e-9:
    x = x + 0.1
    n = n + 1
print(n)    # 10

# Solution 2 : compter avec des entiers (dixièmes)
d = 0       # nombre de dixièmes
n = 0
while d != 10:
    d = d + 1
    n = n + 1
print(n)    # 10
`),
        {
          type: 'p',
          text: 'Remarque : `while x < 1` ne conviendrait pas non plus, car `0.9999999999999999 < 1` est vrai : on ferait un 11ᵉ tour. La comparaison avec une tolérance est la méthode sûre.',
        },
      ],
    },
    {
      id: 'table-verite',
      title: 'Tables de vérité et De Morgan',
      difficulty: 1,
      duration: 15,
      tags: ['booléens', 'table de vérité'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Dresser la table de vérité de `not (a or b)` et de `(not a) and (not b)`. Conclure.',
            'Dresser la table de vérité de `a or b and not c` (attention aux priorités).',
            'Simplifier l’expression Python `not (x >= 0 and x <= 100)`.',
          ],
        },
      ],
      hints: ['`and` est prioritaire sur `or`.', 'Utiliser la loi de De Morgan, puis remplacer `not (x >= 0)` par `x < 0`.'],
      solution: [
        {
          type: 'table',
          headers: ['a', 'b', 'a or b', 'not (a or b)', 'not a', 'not b', '(not a) and (not b)'],
          rows: [
            ['0', '0', '0', '**1**', '1', '1', '**1**'],
            ['0', '1', '1', '**0**', '1', '0', '**0**'],
            ['1', '0', '1', '**0**', '0', '1', '**0**'],
            ['1', '1', '1', '**0**', '0', '0', '**0**'],
          ],
        },
        { type: 'p', text: 'Les deux colonnes en gras sont identiques : c’est la **loi de De Morgan** $\\overline{a + b} = \\overline{a}\\cdot\\overline{b}$.' },
        { type: 'p', text: '2. L’expression se lit `a or (b and (not c))` :' },
        {
          type: 'table',
          headers: ['a', 'b', 'c', 'not c', 'b and not c', 'a or (b and not c)'],
          rows: [
            ['0', '0', '0', '1', '0', '0'],
            ['0', '0', '1', '0', '0', '0'],
            ['0', '1', '0', '1', '1', '1'],
            ['0', '1', '1', '0', '0', '0'],
            ['1', '0', '0', '1', '0', '1'],
            ['1', '0', '1', '0', '0', '1'],
            ['1', '1', '0', '1', '1', '1'],
            ['1', '1', '1', '0', '0', '1'],
          ],
        },
        { type: 'p', text: '3. Par De Morgan : `not (x >= 0) or not (x <= 100)`, c’est-à-dire `x < 0 or x > 100`.' },
      ],
    },
    {
      id: 'xor-programme',
      title: 'Programmer le ou exclusif',
      difficulty: 2,
      duration: 15,
      tags: ['booléens', 'programmation', 'fonctions'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire une fonction `xor(a, b)` qui renvoie le ou exclusif de deux booléens en n’utilisant **que** `and`, `or` et `not`.',
            'Écrire une fonction `table(f)` qui affiche la table de vérité d’une fonction booléenne `f` à deux arguments.',
            'Vérifier que `xor(a, b)` est égal à `(a or b) and not (a and b)` pour toutes les valeurs.',
          ],
        },
      ],
      hints: ['$a \\oplus b$ est vrai quand « a et pas b » ou « b et pas a ».', 'Une fonction peut être passée en paramètre à une autre fonction.'],
      solution: [
        py(String.raw`
def xor(a, b):
    return (a and not b) or (not a and b)

def table(f):
    for a in [False, True]:
        for b in [False, True]:
            print(int(a), int(b), int(f(a, b)))

table(xor)
# 0 0 0
# 0 1 1
# 1 0 1
# 1 1 0

for a in [False, True]:
    for b in [False, True]:
        assert xor(a, b) == ((a or b) and not (a and b)) == (a != b)
`),
        {
          type: 'p',
          text: 'Les deux formules donnent la même table (0, 1, 1, 0) : elles sont donc équivalentes. On remarque aussi que pour des booléens, `xor(a, b)` est simplement `a != b`.',
        },
      ],
    },
    {
      id: 'paresseuse',
      title: 'Prévoir l’évaluation paresseuse',
      difficulty: 2,
      duration: 15,
      tags: ['booléens', 'évaluation paresseuse'],
      statement: [
        { type: 'p', text: 'Pour chacune des instructions suivantes, dire ce qui s’affiche (ou si une erreur se produit).' },
        py(String.raw`
def test(n):
    print("test", n)
    return n > 2

print(test(1) and test(5))        # (a)
print(test(5) or test(1))         # (b)
print(test(5) and test(1))        # (c)
t = [3, 8, 1]
i = 3
print(i < len(t) and t[i] > 0)    # (d)
print(t[i] > 0 and i < len(t))    # (e)
`),
      ],
      hints: ['`test(1)` renvoie `False`, `test(5)` renvoie `True`.', 'Dans (d), `i < len(t)` vaut `False`.'],
      solution: [
        {
          type: 'list',
          items: [
            '(a) affiche `test 1` puis `False` : le premier opérande est faux, `test(5)` n’est pas appelé.',
            '(b) affiche `test 5` puis `True` : le premier opérande est vrai, `test(1)` n’est pas appelé.',
            '(c) affiche `test 5`, `test 1`, puis `False` : il faut évaluer les deux.',
            '(d) affiche `False` : `3 < 3` est faux, donc `t[3]` n’est jamais évalué.',
            '(e) provoque une `IndexError: list index out of range` : `t[3]` est évalué en premier et n’existe pas.',
          ],
        },
      ],
    },
    {
      id: 'ascii-cesar',
      title: 'Chiffrement de César',
      difficulty: 2,
      duration: 20,
      tags: ['texte', 'ASCII', 'programmation', 'ord', 'chr'],
      statement: [
        {
          type: 'p',
          text: 'Le chiffrement de César décale chaque lettre de l’alphabet d’un nombre fixe de rangs $k$ : avec $k = 3$, A devient D, B devient E… et X devient A (on « boucle »).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quels sont les codes ASCII de `A` et `Z` ? Quelle est la position (de 0 à 25) de la lettre de code $c$ ?',
            'Écrire une fonction `cesar(texte, k)` qui chiffre un texte écrit en **majuscules** ; les autres caractères (espaces, ponctuation) sont laissés inchangés.',
            'Comment déchiffrer ? Déchiffrer `\'VDOXW\'` sachant que $k = 3$.',
          ],
        },
      ],
      hints: [
        'Position = `ord(c) - 65` ; on la décale puis on prend le reste modulo 26.',
        'Tester si un caractère est une majuscule : `\'A\' <= c <= \'Z\'`.',
      ],
      solution: [
        { type: 'p', text: '1. `A` = 65 et `Z` = 90. La position d’une lettre de code $c$ est $c - 65$.' },
        py(String.raw`
def cesar(texte, k):
    resultat = ''
    for c in texte:
        if 'A' <= c <= 'Z':
            pos = (ord(c) - 65 + k) % 26   # % 26 : on revient à A après Z
            resultat = resultat + chr(65 + pos)
        else:
            resultat = resultat + c
    return resultat

assert cesar('XYZ', 3) == 'ABC'
assert cesar('BONJOUR NSI', 3) == 'ERQMRXU QVL'
print(cesar('VDOXW', -3))   # SALUT
`),
        {
          type: 'p',
          text: '3. Pour déchiffrer, on décale de $-k$ (ou de $26 - k$) : `cesar(\'VDOXW\', -3)` donne `\'SALUT\'`. En Python, `-1 % 26` vaut 25, donc les décalages négatifs fonctionnent.',
        },
      ],
    },
    {
      id: 'utf8-octets',
      title: 'Compter les octets en UTF-8',
      difficulty: 3,
      duration: 25,
      tags: ['Unicode', 'UTF-8', 'programmation'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Combien d’octets occupe la chaîne « Noël € » en UTF-8 ? en ISO-8859-1 ?',
            'Encoder à la main le caractère `ç` (U+00E7) en UTF-8.',
            'Un fichier contient les octets `43 61 66 C3 A9`. Le décoder en UTF-8, puis en ISO-8859-1.',
            'Écrire une fonction `nb_octets_utf8(texte)` qui calcule la taille en UTF-8 d’une chaîne **sans utiliser** `encode`, à l’aide de `ord` et des plages de points de code.',
          ],
        },
      ],
      hints: [
        'Plages : jusqu’à 0x7F → 1 octet ; jusqu’à 0x7FF → 2 ; jusqu’à 0xFFFF → 3 ; au-delà → 4.',
        'E7 en binaire sur 11 bits : 000 1110 0111.',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'En UTF-8 : N, o, l, espace : 1 octet chacun ; `ë` (U+00EB) : 2 octets ; `€` (U+20AC) : 3 octets. Total : $4 + 2 + 3 = 9$ octets. En ISO-8859-1, c’est **impossible** : le caractère `€` n’existe pas dans ce jeu.',
            '$\\text{E7} = 000\\,1110\\,0111$ sur 11 bits → `00011` | `100111`. Octets : `110 00011` = **C3**, `10 100111` = **A7**. Donc `ç` = `C3 A7`.',
            '43 = `C`, 61 = `a`, 66 = `f` (ASCII). En UTF-8, `C3 A9` forme un seul caractère : `é` → « Café ». En ISO-8859-1, chaque octet est un caractère : C3 = `Ã`, A9 = `©` → « CafÃ© ».',
          ],
        },
        py(String.raw`
def nb_octets_utf8(texte):
    total = 0
    for c in texte:
        p = ord(c)
        if p <= 0x7F:
            total = total + 1
        elif p <= 0x7FF:
            total = total + 2
        elif p <= 0xFFFF:
            total = total + 3
        else:
            total = total + 4
    return total

for s in ['Noël €', 'abc', 'é', '😀', 'Ελληνικά', '日本語']:
    assert nb_octets_utf8(s) == len(s.encode('utf-8'))
print(nb_octets_utf8('Noël €'))   # 9
`),
      ],
    },
    {
      id: 'type-bac-donnees',
      title: 'Type bac : un capteur et un fichier journal',
      difficulty: 3,
      duration: 30,
      tags: ['type bac', 'flottants', 'booléens', 'encodage'],
      statement: [
        {
          type: 'p',
          text: 'Une station météo enregistre les températures dans un fichier texte et déclenche une alarme selon certaines conditions.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Un élève calcule la moyenne de `[20.1, 20.2]` et teste `moyenne == 20.15`. Il obtient `False`. Expliquer, et proposer un test correct.',
            'L’alarme doit sonner si la température `t` est inférieure à 0 ou supérieure à 35, **sauf** si le capteur est en maintenance (booléen `maintenance`). Écrire l’expression booléenne `alarme`.',
            'Donner la négation de l’expression `t < 0 or t > 35` sans utiliser `not`.',
            'Le fichier journal, écrit en UTF-8, contient « Température : −3,5 °C ». Ouvert dans un logiciel réglé en ISO-8859-1, il affiche « TempÃ©rature ». Expliquer l’affichage pour le `é`.',
            'Écrire une fonction `premiere_negative(mesures)` qui renvoie l’indice de la première mesure strictement négative de la liste, ou −1 s’il n’y en a pas. On utilisera une boucle `while` dont la condition exploite l’évaluation paresseuse.',
          ],
        },
      ],
      hints: [
        'Ni 20.1, ni 20.2, ni 20.15 ne sont représentables exactement.',
        'Pour la question 3, utiliser De Morgan.',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Les nombres 20,1, 20,2 et 20,15 n’ont pas d’écriture binaire finie : ils sont arrondis, et le calcul de la moyenne ajoute des erreurs d’arrondi. Le résultat n’est donc pas forcément exactement le flottant le plus proche de 20,15. Test correct : `abs(moyenne - 20.15) < 1e-9`.',
            '`alarme = (t < 0 or t > 35) and not maintenance`. Les parenthèses sont indispensables : sans elles, `and` serait prioritaire.',
            'Par De Morgan : `not (t < 0 or t > 35)` = `not (t < 0) and not (t > 35)` = `t >= 0 and t <= 35` (soit `0 <= t <= 35`).',
            '`é` (U+00E9) est encodé en UTF-8 par les deux octets C3 A9. Un logiciel en ISO-8859-1 lit un caractère par octet : C3 = `Ã` et A9 = `©`. (Le signe moins « − » U+2212 et le degré « ° » sont aussi altérés.)',
          ],
        },
        py(String.raw`
def premiere_negative(mesures):
    i = 0
    while i < len(mesures) and mesures[i] >= 0:
        i = i + 1
    if i < len(mesures):
        return i
    return -1

assert premiere_negative([2.5, 1.0, -3.5, 4.0]) == 2
assert premiere_negative([1.0, 2.0]) == -1
assert premiere_negative([]) == -1
`),
        {
          type: 'p',
          text: 'Quand `i` atteint `len(mesures)`, la condition `i < len(mesures)` est fausse et, grâce à l’évaluation paresseuse de `and`, `mesures[i]` n’est **pas** évalué : pas d’`IndexError`. Si l’on écrivait les deux conditions dans l’autre ordre, le programme planterait pour une liste sans valeur négative (ou vide).',
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
      id: 'float-ieee754',
      props: { value: 0.1 },
      title: 'Explorer la norme IEEE 754',
      caption: 'Observez le signe, l’exposant et la mantisse de 0,1 : la mantisse est tronquée, d’où l’erreur de 0,1 + 0,2.',
    },
    {
      type: 'widget',
      id: 'float-ieee754',
      props: { value: -6.5 },
      title: 'Un nombre exactement représentable : −6,5',
      caption: '−6,5 = −1,101₂ × 2² : la mantisse se termine par des 0, il n’y a aucune erreur d’arrondi.',
    },
    {
      type: 'widget',
      id: 'logic-gates',
      props: { expression: '(A and not B) or C' },
      title: 'Portes logiques et table de vérité',
      caption: 'Modifiez les entrées et observez la sortie du circuit ; comparez avec la table de vérité du cours.',
    },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Que vaut `0.1 + 0.2 == 0.3` en Python ?',
          choices: ['`True`', '`False`', 'Une erreur', 'Cela dépend de l’ordinateur'],
          answer: 1,
          explanation: '0,1 et 0,2 sont arrondis en binaire ; la somme vaut `0.30000000000000004`.',
        },
        {
          question: 'Lequel de ces nombres est représenté **exactement** par un flottant ?',
          choices: ['0,1', '0,2', '0,375', '1/3'],
          answer: 2,
          explanation: '$0{,}375 = \\frac38 = 0{,}011_2$ est de la forme $\\frac{k}{2^p}$.',
        },
        {
          question: 'Combien de bits d’exposant dans un flottant double précision (64 bits) ?',
          choices: ['8', '11', '23', '52'],
          answer: 1,
          explanation: '1 bit de signe, 11 bits d’exposant, 52 bits de mantisse.',
        },
        {
          question: 'Que vaut `not (True and False) or False` ?',
          choices: ['`True`', '`False`'],
          answer: 0,
          explanation: '`True and False` = `False`, `not False` = `True`, `True or False` = `True`.',
        },
        {
          question: 'Selon De Morgan, `not (a or b)` est équivalent à :',
          choices: ['`not a or not b`', '`not a and not b`', '`a and b`', '`not a and b`'],
          answer: 1,
        },
        {
          question: 'Avec `x = 0`, que fait `x == 0 or 1 / x > 1` ?',
          choices: ['`ZeroDivisionError`', 'Renvoie `True`', 'Renvoie `False`', 'Boucle infinie'],
          answer: 1,
          explanation: '`x == 0` est vrai, donc `or` n’évalue pas `1 / x`.',
        },
        {
          question: 'Combien de caractères le code ASCII permet-il de représenter ?',
          choices: ['127', '128', '255', '256'],
          answer: 1,
          explanation: '7 bits : $2^7 = 128$ caractères (codes 0 à 127).',
        },
        {
          question: 'Combien d’octets occupe le caractère « é » en UTF-8 ?',
          choices: ['1', '2', '3', '4'],
          answer: 1,
          explanation: 'U+00E9 est dans la plage U+0080–U+07FF : 2 octets (C3 A9).',
        },
        {
          question: 'Que renvoie `chr(ord(\'a\') + 2)` ?',
          choices: ["`'b'`", "`'c'`", '`99`', "`'C'`"],
          answer: 1,
          explanation: '`ord(\'a\')` = 97 ; `chr(99)` = `\'c\'`.',
        },
        {
          question: 'Un texte s’affiche « Ã©tÃ© ». Quel est le problème le plus probable ?',
          choices: ['Fichier ASCII lu en UTF-8', 'Fichier UTF-8 lu en ISO-8859-1', 'Fichier ISO-8859-1 lu en ISO-8859-1', 'Erreur de flottant'],
          answer: 1,
          explanation: '« été » en UTF-8 donne C3 A9 74 C3 A9, et C3 A9 est lu « Ã© » en Latin-1.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Pourquoi 0,1 + 0,2 ≠ 0,3 en machine ?', back: '0,1 et 0,2 n’ont pas d’écriture binaire finie : ils sont arrondis.' },
        { front: 'Formule d’un flottant IEEE 754', back: '$(-1)^s \\times 1{,}m \\times 2^{e - \\text{biais}}$' },
        { front: 'Répartition des 32 bits (simple précision)', back: '1 signe + 8 exposant (biais 127) + 23 mantisse' },
        { front: 'Répartition des 64 bits (double précision)', back: '1 signe + 11 exposant (biais 1 023) + 52 mantisse' },
        { front: 'Comment comparer deux flottants ?', back: '`abs(a - b) < 1e-9` (ou `math.isclose(a, b)`)' },
        { front: 'Lois de De Morgan', back: '`not (a and b)` = `not a or not b` ; `not (a or b)` = `not a and not b`' },
        { front: 'Priorité des opérateurs booléens', back: '`not` > `and` > `or`' },
        { front: 'Évaluation paresseuse de `a and b`', back: 'Si `a` est faux, `b` n’est pas évalué.' },
        { front: 'Évaluation paresseuse de `a or b`', back: 'Si `a` est vrai, `b` n’est pas évalué.' },
        { front: 'Table du XOR', back: 'Vrai si exactement une des deux entrées est vraie : 0 1 1 0.' },
        { front: 'Codes ASCII de A, a, 0, espace', back: '65, 97, 48, 32' },
        { front: 'ISO-8859-1', back: '8 bits, 256 caractères : ASCII + accents d’Europe de l’Ouest. Pas de €.' },
        { front: 'Unicode', back: 'Jeu universel : un point de code U+XXXX par caractère, de U+0000 à U+10FFFF.' },
        { front: 'UTF-8', back: 'Encodage d’Unicode sur 1 à 4 octets, compatible ASCII.' },
        { front: '`\'é\'.encode(\'utf-8\')`', back: "`b'\\xc3\\xa9'`" },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque caractère à son encodage UTF-8',
      pairs: [
        { left: '`A` (U+0041)', right: '41' },
        { left: '`é` (U+00E9)', right: 'C3 A9' },
        { left: '`€` (U+20AC)', right: 'E2 82 AC' },
        { left: '`😀` (U+1F600)', right: 'F0 9F 98 80' },
        { left: 'espace (U+0020)', right: '20' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'Un flottant IEEE 754 est constitué d’un bit de {{signe}}, d’un {{exposant}} et d’une {{mantisse}}. En Python, le type float utilise {{64}} bits. Le nombre 0,1 n’a pas d’écriture binaire {{finie}}. Dans « a and b », si a est {{faux|False}}, b n’est pas évalué. Le code ASCII utilise {{7|sept}} bits ; l’encodage {{UTF-8|utf8}} code les caractères Unicode sur 1 à 4 octets.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: '`0.5 + 0.25 == 0.75` vaut `True`.', answer: true, explanation: 'Ces trois nombres sont des sommes de puissances de 2 : ils sont exacts.' },
        { text: 'Le bit de signe vaut 1 pour un nombre positif.', answer: false, explanation: '0 = positif, 1 = négatif.' },
        { text: '`not a and b` signifie `not (a and b)`.', answer: false, explanation: '`not` est prioritaire : c’est `(not a) and b`.' },
        { text: 'Un fichier ASCII est aussi un fichier UTF-8 valide.', answer: true, explanation: 'UTF-8 code les 128 premiers caractères comme l’ASCII.' },
        { text: 'En UTF-8, tous les caractères occupent 2 octets.', answer: false, explanation: 'De 1 à 4 octets selon le point de code.' },
        { text: '`True or (1 / 0 > 1)` provoque une erreur.', answer: false, explanation: 'Évaluation paresseuse : la division n’est pas évaluée.' },
      ],
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre les étapes du codage IEEE 754 de −6,5',
      items: [
        'Signe négatif : s = 1',
        'Écrire 6,5 en binaire : 110,1',
        'Normaliser : 1,101 × 2²',
        'Exposant décalé : 2 + 127 = 129 = 10000001',
        'Mantisse : 101 suivi de 20 zéros',
        'Mot final : C0D00000',
      ],
    },
  ],
}

export default chapter
