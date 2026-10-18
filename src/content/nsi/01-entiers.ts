import type { Block, Chapter } from '../types'

/** Bloc de code Python (String.raw conseillé ; la première ligne vide est retirée). */
const py = (code: string, caption?: string): Block => ({
  type: 'code',
  lang: 'python',
  code: code.replace(/^\n/, '').replace(/\n\s*$/, ''),
  ...(caption ? { caption } : {}),
})

const chapter: Chapter = {
  id: 'entiers',
  subject: 'nsi',
  order: 1,
  title: 'Représentation des entiers',
  theme: 'Représentation des données',
  summary:
    'Bases 2, 10 et 16, conversions, bits et octets, entiers naturels sur n bits, addition binaire, entiers relatifs en complément à deux et dépassement de capacité.',
  duration: '2 à 3 semaines',
  objectives: [
    'Passer de la représentation d’une base dans une autre (bases 2, 10 et 16).',
    'Évaluer le nombre de bits nécessaires à l’écriture en base 2 d’un entier, de la somme ou du produit de deux nombres entiers.',
    'Utiliser le complément à 2 pour représenter les entiers relatifs sur n bits.',
    'Effectuer une addition binaire et repérer un dépassement de capacité.',
    'Utiliser les fonctions Python `bin`, `hex`, `int` pour vérifier une conversion.',
  ],
  keywords: [
    'binaire',
    'hexadécimal',
    'bit',
    'octet',
    'base',
    'complément à deux',
    'dépassement',
    'poids fort',
    'poids faible',
  ],

  // =====================================================================
  // FICHE
  // =====================================================================
  fiche: [
    { type: 'h2', text: 'Écriture d’un entier dans une base b' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Base b',
      content: [
        {
          type: 'p',
          text: String.raw`Un entier naturel s'écrit $(a_{k-1}\dots a_1a_0)_b$ avec des chiffres $0 \le a_i < b$ : $$N = a_{k-1}b^{k-1} + \dots + a_1 b + a_0 = \sum_{i=0}^{k-1} a_i\, b^i$$`,
        },
      ],
    },
    {
      type: 'table',
      headers: ['Base', 'Chiffres', 'Préfixe Python', 'Exemple (= 42)'],
      rows: [
        ['2 (binaire)', '0, 1', '`0b`', '`0b101010`'],
        ['10 (décimal)', '0 à 9', '—', '`42`'],
        ['16 (hexadécimal)', '0–9 puis A=10, B=11, C=12, D=13, E=14, F=15', '`0x`', '`0x2A`'],
      ],
    },
    { type: 'h2', text: 'Conversions' },
    {
      type: 'list',
      items: [
        '**Base b → base 10** : on développe $\\sum a_i b^i$. Ex. $1101_2 = 8+4+0+1 = 13$ ; $2\\text{A}_{16} = 2\\times16+10 = 42$.',
        '**Base 10 → base b** : divisions euclidiennes successives par b ; on lit les restes **de bas en haut** (le premier reste est le chiffre de poids faible).',
        '**Binaire ↔ hexadécimal** : 1 chiffre hexa = 4 bits (un *quartet*). On groupe les bits par 4 en partant de la droite. Ex. $1101\\,0110_2 = \\text{D6}_{16}$.',
      ],
    },
    { type: 'h2', text: 'Bits, octets, entiers naturels sur n bits' },
    {
      type: 'callout',
      variant: 'property',
      title: 'À connaître',
      content: [
        {
          type: 'list',
          items: [
            '1 **octet** = 8 bits ; 1 octet = 2 chiffres hexadécimaux.',
            'Sur $n$ bits : $2^n$ valeurs, entiers naturels de $0$ à $2^n - 1$ (8 bits : 0 à 255 ; 16 bits : 0 à 65 535).',
            'Un entier $N \\ge 1$ s’écrit sur $k$ bits avec $2^{k-1} \\le N < 2^k$.',
            'Somme de deux entiers de $n$ bits : au plus $n+1$ bits. Produit d’un entier de $n$ bits par un entier de $m$ bits : au plus $n+m$ bits.',
            '$2^{10} = 1024$ ; 1 ko = 1 000 octets, 1 Kio = 1 024 octets.',
          ],
        },
      ],
    },
    { type: 'h2', text: 'Addition binaire' },
    {
      type: 'p',
      text: 'Comme en base 10, colonne par colonne de droite à gauche : $0+0=0$, $0+1=1$, $1+1=10_2$ (on pose 0, retenue 1), $1+1+1=11_2$ (on pose 1, retenue 1).',
    },
    { type: 'h2', text: 'Entiers relatifs : complément à deux' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Complément à 2 sur n bits',
      content: [
        {
          type: 'list',
          items: [
            'Un entier $x \\ge 0$ est codé comme d’habitude ; un entier $x < 0$ est codé par l’entier naturel $2^n + x$ (= $2^n - |x|$).',
            'Intervalle représentable : $[-2^{n-1}\\,;\\,2^{n-1}-1]$. Sur 8 bits : de $-128$ à $127$.',
            'Le bit de poids fort vaut 1 ⟺ le nombre est négatif.',
            '**Méthode rapide** : coder $|x|$ sur $n$ bits, inverser tous les bits, ajouter 1. Ex. $-5$ : $00000101 \\to 11111010 \\to 11111011$.',
            'Décodage : si le bit de poids fort vaut 1, valeur $= (\\text{valeur naturelle}) - 2^n$. Ex. $10110110_2 = 182 - 256 = -74$.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Dépassement de capacité',
      content: [
        {
          type: 'p',
          text: 'Sur $n$ bits, les calculs se font **modulo** $2^n$ : la retenue finale est perdue. Sur 8 bits non signés, $200 + 100$ donne $44$. En complément à deux, $100 + 50$ donne $-106$ : additionner deux positifs donne un négatif ⟹ dépassement. En Python, les entiers `int` sont de taille arbitraire : pas de dépassement.',
        },
      ],
    },
    py(String.raw`
bin(42)          # '0b101010'
hex(42)          # '0x2a'
int('101010', 2) # 42
int('2A', 16)    # 42
-5 & 0xFF        # 251 : code de -5 en complément à 2 sur 8 bits
`),
  ],

  // =====================================================================
  // COURS
  // =====================================================================
  cours: [
    { type: 'h2', text: '1. Pourquoi le binaire ?' },
    {
      type: 'p',
      text: 'Un ordinateur manipule des signaux électriques qui ne prennent, de façon fiable, que **deux états** : tension basse ou haute, transistor bloqué ou passant, zone d’un disque aimantée dans un sens ou dans l’autre. On les note 0 et 1. Une information élémentaire à deux états s’appelle un **bit** (*binary digit*).',
    },
    {
      type: 'p',
      text: 'Toute donnée (nombre, texte, image, son, programme) est finalement codée par une suite de bits. Ce chapitre étudie le cas des **entiers** ; le suivant traitera des nombres réels, des booléens et du texte.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Bit, octet, mot',
      content: [
        {
          type: 'keyvalue',
          items: [
            { key: 'Bit', value: 'Chiffre binaire, 0 ou 1. Plus petite unité d’information.' },
            { key: 'Octet', value: 'Groupe de 8 bits (*byte* en anglais). C’est l’unité d’adressage de la mémoire.' },
            { key: 'Mot', value: 'Nombre de bits traités d’un coup par le processeur : 32 ou 64 bits sur les machines actuelles.' },
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Un peu d’histoire',
      content: [
        {
          type: 'p',
          text: 'Leibniz décrit l’arithmétique binaire en 1703. George Boole formalise l’algèbre logique en 1854. Claude Shannon montre en 1937 que les circuits à relais réalisent cette algèbre, et c’est lui qui popularise le mot « bit » en 1948.',
        },
      ],
    },

    { type: 'h2', text: '2. Numération de position en base b' },
    {
      type: 'p',
      text: 'En base 10, l’écriture $2\\,026$ signifie $2\\times 10^3 + 0\\times 10^2 + 2\\times 10^1 + 6\\times 10^0$ : chaque chiffre a un **poids** qui dépend de sa position. Ce principe se généralise à toute base $b \\ge 2$.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Écriture en base b',
      content: [
        {
          type: 'p',
          text: String.raw`Soit $b \ge 2$ un entier. Tout entier naturel $N$ s'écrit de manière **unique** sous la forme $$N = a_{k-1}b^{k-1} + a_{k-2}b^{k-2} + \dots + a_1 b + a_0$$ où les chiffres $a_i$ vérifient $0 \le a_i \le b-1$ et $a_{k-1} \ne 0$ (si $N \neq 0$). On note $N = (a_{k-1}\dots a_1 a_0)_b$ ou $a_{k-1}\dots a_0{}_b$.`,
        },
        {
          type: 'p',
          text: 'Le chiffre $a_0$ (à droite) est le chiffre de **poids faible**, $a_{k-1}$ (à gauche) celui de **poids fort**.',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Décimal', 'Binaire', 'Hexadécimal', 'Décimal', 'Binaire', 'Hexadécimal'],
      rows: [
        ['0', '0000', '0', '8', '1000', '8'],
        ['1', '0001', '1', '9', '1001', '9'],
        ['2', '0010', '2', '10', '1010', 'A'],
        ['3', '0011', '3', '11', '1011', 'B'],
        ['4', '0100', '4', '12', '1100', 'C'],
        ['5', '0101', '5', '13', '1101', 'D'],
        ['6', '0110', '6', '14', '1110', 'E'],
        ['7', '0111', '7', '15', '1111', 'F'],
      ],
      caption: 'Les 16 quartets : table à connaître (ou à savoir reconstruire très vite).',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Puissances de 2 à connaître',
      content: [
        {
          type: 'table',
          headers: ['$2^0$', '$2^1$', '$2^2$', '$2^3$', '$2^4$', '$2^5$', '$2^6$', '$2^7$', '$2^8$', '$2^{10}$', '$2^{16}$'],
          rows: [['1', '2', '4', '8', '16', '32', '64', '128', '256', '1 024', '65 536']],
        },
      ],
    },

    { type: 'h2', text: '3. Conversions' },
    { type: 'h3', text: '3.1 D’une base b vers la base 10' },
    {
      type: 'p',
      text: 'On applique directement la définition : on multiplie chaque chiffre par la puissance de b correspondant à sa position, puis on additionne.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples',
      content: [
        {
          type: 'math',
          tex: String.raw`101101_2 = 1\times 2^5 + 0\times 2^4 + 1\times 2^3 + 1\times 2^2 + 0\times 2^1 + 1\times 2^0 = 32+8+4+1 = 45`,
        },
        {
          type: 'math',
          tex: String.raw`\text{BEEF}_{16} = 11\times 16^3 + 14\times 16^2 + 14\times 16 + 15 = 45\,056 + 3\,584 + 224 + 15 = 48\,879`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Méthode de Horner (plus rapide)',
      content: [
        {
          type: 'p',
          text: 'On lit les chiffres de gauche à droite : on part de 0 et, pour chaque chiffre, on multiplie le résultat par b puis on ajoute le chiffre. Pour $101101_2$ : $0 \\to 1 \\to 2 \\to 5 \\to 11 \\to 22 \\to 45$.',
        },
      ],
    },
    py(String.raw`
def vers_decimal(chiffres, b):
    """chiffres : liste des chiffres, poids fort en premier."""
    n = 0
    for c in chiffres:
        n = n * b + c      # schéma de Horner
    return n

print(vers_decimal([1, 0, 1, 1, 0, 1], 2))   # 45
print(vers_decimal([11, 14, 14, 15], 16))    # 48879
`, 'Conversion base b → décimal par la méthode de Horner'),

    { type: 'h3', text: '3.2 De la base 10 vers une base b' },
    {
      type: 'steps',
      items: [
        { title: 'Diviser', text: 'Effectuer la division euclidienne de N par b : $N = b \\times q + r$ avec $0 \\le r < b$.' },
        { title: 'Noter le reste', text: 'Le reste $r$ est le chiffre de poids faible de l’écriture cherchée.' },
        { title: 'Recommencer', text: 'Recommencer avec le quotient $q$ à la place de N, jusqu’à obtenir un quotient nul.' },
        { title: 'Lire', text: 'Lire les restes **du dernier au premier** (de bas en haut).' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Convertir 45 en binaire',
      content: [
        {
          type: 'table',
          headers: ['Division', 'Quotient', 'Reste'],
          rows: [
            ['45 = 2 × 22 + 1', '22', '**1** (poids faible)'],
            ['22 = 2 × 11 + 0', '11', '**0**'],
            ['11 = 2 × 5 + 1', '5', '**1**'],
            ['5 = 2 × 2 + 1', '2', '**1**'],
            ['2 = 2 × 1 + 0', '1', '**0**'],
            ['1 = 2 × 0 + 1', '0', '**1** (poids fort)'],
          ],
        },
        { type: 'p', text: 'Lecture de bas en haut : $45 = 101101_2$. On vérifie : $32 + 8 + 4 + 1 = 45$. ✔' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Convertir 2 026 en hexadécimal',
      content: [
        {
          type: 'list',
          items: [
            '$2\\,026 = 16 \\times 126 + 10$ → reste 10 = **A**',
            '$126 = 16 \\times 7 + 14$ → reste 14 = **E**',
            '$7 = 16 \\times 0 + 7$ → reste **7**',
          ],
        },
        { type: 'p', text: 'Donc $2\\,026 = \\text{7EA}_{16}$. Vérification : $7 \\times 256 + 14 \\times 16 + 10 = 1\\,792 + 224 + 10 = 2\\,026$. ✔' },
      ],
    },
    py(String.raw`
def vers_base(n, b):
    """Renvoie la chaîne des chiffres de n (entier naturel) en base b (2 <= b <= 16)."""
    symboles = "0123456789ABCDEF"
    if n == 0:
        return "0"
    resultat = ""
    while n > 0:
        r = n % b                       # reste : chiffre de poids faible
        resultat = symboles[r] + resultat  # on l'ajoute à GAUCHE
        n = n // b                      # quotient
    return resultat

print(vers_base(45, 2))     # 101101
print(vers_base(2026, 16))  # 7EA
`, 'Divisions successives : on construit la chaîne de droite à gauche'),
    {
      type: 'callout',
      variant: 'warning',
      title: 'Piège classique',
      content: [
        {
          type: 'p',
          text: 'Lire les restes dans l’ordre où on les obtient donne l’écriture **à l’envers** ($101101$ est un palindrome, mais $6 = 110_2$ donnerait $011$ !). Le premier reste est toujours le chiffre des unités.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Autre méthode : soustraire les puissances de 2',
      content: [
        {
          type: 'p',
          text: 'Pour 45 : la plus grande puissance de 2 inférieure ou égale est 32, reste 13 ; puis 8, reste 5 ; puis 4, reste 1 ; puis 1. Donc $45 = 32+8+4+1$ : bits à 1 aux positions 5, 3, 2, 0 → $101101_2$.',
        },
      ],
    },

    { type: 'h3', text: '3.3 Entre binaire et hexadécimal' },
    {
      type: 'p',
      text: 'Comme $16 = 2^4$, chaque chiffre hexadécimal correspond exactement à **4 bits**. La conversion se fait donc chiffre par chiffre, sans calcul.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples',
      content: [
        {
          type: 'list',
          items: [
            '$110101101011_2$ : on groupe par 4 depuis la droite : $1101\\;0110\\;1011$ → D, 6, B → $\\text{D6B}_{16}$.',
            '$\\text{A7}_{16}$ : A = 1010, 7 = 0111 → $10100111_2$.',
            '$10111_2$ : on complète à gauche par des 0 : $0001\\;0111$ → $17_{16}$ (= 23 en décimal).',
          ],
        },
      ],
    },
    {
      type: 'p',
      text: 'C’est pour cela que l’hexadécimal est omniprésent en informatique : il est compact (un octet = 2 chiffres hexa, de 00 à FF) et se lit directement en binaire. On le retrouve dans les couleurs HTML (`#FF8000`), les adresses mémoire, les adresses MAC, les codes Unicode (U+00E9)…',
    },
    {
      type: 'svg',
      maxWidth: 640,
      caption: 'Un octet = 8 bits = 2 quartets = 2 chiffres hexadécimaux. Ici 1101 0110₂ = D6₁₆ = 214.',
      svg: `<svg viewBox="0 0 640 200" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif">
<text x="75.0" y="22" text-anchor="middle" font-size="12" class="svg-muted" fill="currentColor">128</text>
<rect x="44" y="32" width="62" height="44" fill="hsl(217 91% 60%)" fill-opacity="0.2" stroke="currentColor" stroke-width="1.2"/>
<text x="75.0" y="61" text-anchor="middle" font-size="16" fill="currentColor">1</text>
<text x="145.0" y="22" text-anchor="middle" font-size="12" class="svg-muted" fill="currentColor">64</text>
<rect x="114" y="32" width="62" height="44" fill="hsl(217 91% 60%)" fill-opacity="0.2" stroke="currentColor" stroke-width="1.2"/>
<text x="145.0" y="61" text-anchor="middle" font-size="16" fill="currentColor">1</text>
<text x="215.0" y="22" text-anchor="middle" font-size="12" class="svg-muted" fill="currentColor">32</text>
<rect x="184" y="32" width="62" height="44" fill="none" fill-opacity="0.2" stroke="currentColor" stroke-width="1.2"/>
<text x="215.0" y="61" text-anchor="middle" font-size="16" fill="currentColor">0</text>
<text x="285.0" y="22" text-anchor="middle" font-size="12" class="svg-muted" fill="currentColor">16</text>
<rect x="254" y="32" width="62" height="44" fill="hsl(217 91% 60%)" fill-opacity="0.2" stroke="currentColor" stroke-width="1.2"/>
<text x="285.0" y="61" text-anchor="middle" font-size="16" fill="currentColor">1</text>
<text x="355.0" y="22" text-anchor="middle" font-size="12" class="svg-muted" fill="currentColor">8</text>
<rect x="324" y="32" width="62" height="44" fill="none" fill-opacity="0.2" stroke="currentColor" stroke-width="1.2"/>
<text x="355.0" y="61" text-anchor="middle" font-size="16" fill="currentColor">0</text>
<text x="425.0" y="22" text-anchor="middle" font-size="12" class="svg-muted" fill="currentColor">4</text>
<rect x="394" y="32" width="62" height="44" fill="hsl(217 91% 60%)" fill-opacity="0.2" stroke="currentColor" stroke-width="1.2"/>
<text x="425.0" y="61" text-anchor="middle" font-size="16" fill="currentColor">1</text>
<text x="495.0" y="22" text-anchor="middle" font-size="12" class="svg-muted" fill="currentColor">2</text>
<rect x="464" y="32" width="62" height="44" fill="hsl(217 91% 60%)" fill-opacity="0.2" stroke="currentColor" stroke-width="1.2"/>
<text x="495.0" y="61" text-anchor="middle" font-size="16" fill="currentColor">1</text>
<text x="565.0" y="22" text-anchor="middle" font-size="12" class="svg-muted" fill="currentColor">1</text>
<rect x="534" y="32" width="62" height="44" fill="none" fill-opacity="0.2" stroke="currentColor" stroke-width="1.2"/>
<text x="565.0" y="61" text-anchor="middle" font-size="16" fill="currentColor">0</text>
<path d="M44 88 V96 H316 V88" fill="none" stroke="hsl(25 95% 53%)" stroke-width="1.5"/>
<text x="180.0" y="116" text-anchor="middle" font-size="13" fill="currentColor">quartet fort : 1101 = 8+4+1 = 13</text>
<text x="180.0" y="140" text-anchor="middle" font-size="14" fill="hsl(25 95% 53%)">chiffre hexa D</text>
<path d="M324 88 V96 H596 V88" fill="none" stroke="hsl(25 95% 53%)" stroke-width="1.5"/>
<text x="460.0" y="116" text-anchor="middle" font-size="13" fill="currentColor">quartet faible : 0110 = 4+2 = 6</text>
<text x="460.0" y="140" text-anchor="middle" font-size="14" fill="hsl(25 95% 53%)">chiffre hexa 6</text>
<path d="M44 156 V164 H596 V156" fill="none" stroke="hsl(142 71% 45%)" stroke-width="1.5"/>
<text x="320" y="186" text-anchor="middle" font-size="13" fill="currentColor">1 octet : 128 + 64 + 16 + 4 + 2 = 214 = D6 (hexa)</text>
</svg>`,
    },

    { type: 'h3', text: '3.4 En Python' },
    py(String.raw`
>>> bin(45)              # binaire, sous forme de chaîne
'0b101101'
>>> hex(2026)            # hexadécimal
'0x7ea'
>>> int('101101', 2)     # chaîne en base 2 -> entier
45
>>> int('7EA', 16)
2026
>>> 0b101101 + 0x10      # littéraux binaires et hexadécimaux
61
>>> format(45, '08b')    # binaire sur 8 bits, complété par des 0
'00101101'
>>> format(214, '02X')   # hexadécimal majuscule sur 2 chiffres
'D6'
`),

    { type: 'h2', text: '4. Entiers naturels sur n bits' },
    {
      type: 'p',
      text: 'En machine, un entier est stocké sur un nombre **fixe** de bits : 8, 16, 32 ou 64. Avec $n$ bits, on dispose de $2 \\times 2 \\times \\dots \\times 2 = 2^n$ combinaisons.',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Intervalle des entiers naturels sur n bits',
      content: [
        {
          type: 'p',
          text: 'Sur $n$ bits on représente les entiers naturels de $0$ à $2^n - 1$. Le plus grand, $11\\dots1_2$ ($n$ fois 1), vaut $2^{n-1} + \\dots + 2 + 1 = 2^n - 1$.',
        },
        {
          type: 'table',
          headers: ['n', 'Nombre de valeurs', 'Plus grand entier'],
          rows: [
            ['8', '256', '255'],
            ['16', '65 536', '65 535'],
            ['32', '4 294 967 296', '4 294 967 295'],
            ['64', '$2^{64} \\approx 1{,}8 \\times 10^{19}$', '$2^{64}-1$'],
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Nombre de bits nécessaires',
      content: [
        {
          type: 'p',
          text: String.raw`Un entier $N \ge 1$ s'écrit avec exactement $k$ bits (sans 0 inutile à gauche) si et seulement si $$2^{k-1} \le N < 2^k$$ Ex. $2^{10} = 1\,024 \le 2\,026 < 2\,048 = 2^{11}$, donc 2 026 s'écrit sur **11 bits** ($11111101010_2$).`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Taille d’une somme et d’un produit',
      content: [
        {
          type: 'list',
          items: [
            'Si $a$ et $b$ s’écrivent sur $n$ bits, alors $a, b \\le 2^n - 1$ donc $a + b \\le 2^{n+1} - 2 < 2^{n+1}$ : la somme tient sur **$n+1$ bits**.',
            'Si $a$ s’écrit sur $n$ bits et $b$ sur $m$ bits, alors $a < 2^n$, $b < 2^m$ donc $ab < 2^{n+m}$ : le produit tient sur **$n+m$ bits**.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'ko ou Kio ?',
      content: [
        {
          type: 'p',
          text: 'Dans le Système international, 1 ko (kilooctet) = $10^3$ = 1 000 octets, 1 Mo = $10^6$ octets, 1 Go = $10^9$ octets. Les préfixes binaires (CEI) sont : 1 Kio (kibioctet) = $2^{10}$ = 1 024 octets, 1 Mio = $2^{20}$ octets, 1 Gio = $2^{30}$ octets. Un disque « 1 To » contient environ 0,91 Tio.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Multiplier ou diviser par 2',
      content: [
        {
          type: 'p',
          text: 'Ajouter un 0 à droite d’une écriture binaire multiplie par 2 (comme ajouter un 0 en base 10 multiplie par 10). Supprimer le bit de droite donne le quotient de la division par 2. En Python : `n << 1` vaut `2 * n` et `n >> 1` vaut `n // 2`.',
        },
      ],
    },

    { type: 'h2', text: '5. Addition binaire' },
    {
      type: 'table',
      headers: ['a', 'b', 'retenue entrante', 'bit posé', 'retenue sortante'],
      rows: [
        ['0', '0', '0', '0', '0'],
        ['0', '1', '0', '1', '0'],
        ['1', '1', '0', '0', '1'],
        ['1', '1', '1', '1', '1'],
      ],
      caption: 'Règles de l’addition bit à bit (les cas symétriques sont identiques).',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Calculer 1011₂ + 0110₂',
      content: [
        py(String.raw`
  retenues :  1 1 1
              1 0 1 1      (11)
          +   0 1 1 0      ( 6)
          -----------
            1 0 0 0 1      (17)
`),
        {
          type: 'p',
          text: 'Colonne des unités : $1+0 = 1$. Puis $1+1 = 10_2$ : on pose 0, retenue 1. Puis $0+1+1 = 10_2$ : on pose 0, retenue 1. Puis $1+0+1 = 10_2$ : on pose 0 et la retenue 1 forme un 5ᵉ bit. Résultat : $10001_2 = 17 = 11 + 6$. ✔',
        },
      ],
    },
    {
      type: 'p',
      text: 'On remarque que deux nombres de 4 bits ont donné une somme de 5 bits, conformément à la propriété « somme sur $n+1$ bits ».',
    },

    { type: 'h2', text: '6. Dépassement de capacité (entiers naturels)' },
    {
      type: 'p',
      text: 'Si le résultat doit être stocké sur $n$ bits seulement, le $(n+1)$-ième bit (la dernière retenue) est **perdu** : le résultat obtenu est le reste de la division du vrai résultat par $2^n$. On parle de **dépassement de capacité** (*overflow*).',
    },
    {
      type: 'callout',
      variant: 'example',
      title: '200 + 100 sur 8 bits',
      content: [
        {
          type: 'p',
          text: '$200 = 11001000_2$ et $100 = 01100100_2$. La somme vaut $300 = 1\\,00101100_2$ : 9 bits. Sur 8 bits on ne garde que $00101100_2 = 44$, et $300 - 256 = 44$.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Des bugs célèbres',
      content: [
        {
          type: 'list',
          items: [
            'Ariane 5 (vol 501, 1996) : une valeur flottante 64 bits convertie en entier signé 16 bits a provoqué une erreur, puis l’autodestruction du lanceur une quarantaine de secondes après le décollage.',
            'Le « bug de l’an 2038 » : de nombreux systèmes comptent les secondes depuis le 1ᵉʳ janvier 1970 sur un entier signé de 32 bits, qui déborde le 19 janvier 2038 (à 3 h 14 min 7 s UTC, la valeur atteint $2^{31}-1$).',
            'Le jeu Pac-Man : le niveau est stocké sur un octet ; au niveau 256, l’écran devient illisible.',
          ],
        },
      ],
    },

    { type: 'h2', text: '7. Entiers relatifs : le complément à deux' },
    {
      type: 'p',
      text: 'Comment coder un signe avec des bits ? L’idée naïve (« bit de signe + valeur absolue ») pose deux problèmes : il y a deux zéros ($+0$ et $-0$), et l’addition usuelle ne marche plus ($1 + (-1)$ ne donne pas 0). Les ordinateurs utilisent donc le **complément à deux**.',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Pourquoi pas « signe + valeur absolue » ?',
      content: [
        {
          type: 'p',
          text: 'Sur 8 bits, $+1 = 00000001$ et $-1$ serait $10000001$. En additionnant normalement : $00000001 + 10000001 = 10000010$, qui se lirait $-2$. Faux !',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Complément à deux sur n bits',
      content: [
        {
          type: 'p',
          text: String.raw`On représente les entiers relatifs $x$ tels que $-2^{n-1} \le x \le 2^{n-1} - 1$. Le code de $x$ est l'écriture binaire sur $n$ bits de l'entier naturel : $$\text{code}(x) = \begin{cases} x & \text{si } x \ge 0 \\ 2^n + x & \text{si } x < 0 \end{cases}$$ Autrement dit, le code de $x$ est $x$ modulo $2^n$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Propriétés',
      content: [
        {
          type: 'list',
          items: [
            'Les positifs commencent par 0, les négatifs par 1 : le bit de poids fort indique le signe.',
            'Un seul zéro : $00000000$. Sur 8 bits : $127 = 01111111$, $-1 = 11111111$, $-128 = 10000000$.',
            'L’intervalle n’est pas symétrique : $-128$ est codable sur 8 bits mais pas $+128$.',
            'L’addition binaire habituelle (en ignorant la retenue finale) donne directement le bon résultat, tant qu’il reste dans l’intervalle. Le processeur n’a pas besoin d’un circuit de soustraction : $a - b = a + (-b)$.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Coder un entier négatif x sur n bits',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Valeur absolue', text: 'Écrire $|x|$ en binaire sur $n$ bits.' },
            { title: 'Inverser', text: 'Remplacer chaque 0 par 1 et chaque 1 par 0 (complément à 1).' },
            { title: 'Ajouter 1', text: 'Ajouter 1 au résultat (en binaire).' },
          ],
        },
        {
          type: 'p',
          text: 'Exemple : $-20$ sur 8 bits. $20 = 00010100$ → inversé $11101011$ → $+1$ : $11101100$. Vérification : $11101100_2 = 236 = 256 - 20$. ✔',
        },
        {
          type: 'p',
          text: '**Astuce** : on peut aussi recopier les bits de $|x|$ de droite à gauche jusqu’au premier 1 inclus, puis inverser tous les bits suivants.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Pourquoi « inverser puis ajouter 1 » fonctionne',
      content: [
        {
          type: 'p',
          text: String.raw`Si $a$ est un entier sur $n$ bits et $\bar a$ son inversé bit à bit, alors $a + \bar a = 11\dots1_2 = 2^n - 1$. Donc $\bar a + 1 = 2^n - a$ : c'est exactement le code de $-a$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Décoder un mot de n bits en complément à deux',
      content: [
        {
          type: 'list',
          items: [
            'Si le bit de poids fort vaut 0 : lecture habituelle.',
            'Sinon : valeur $=$ (valeur en binaire naturel) $- 2^n$. Exemple : $10110110_2 = 182$, donc il code $182 - 256 = -74$.',
            'Méthode équivalente : le bit de poids fort a le poids $-2^{n-1}$ au lieu de $+2^{n-1}$. $10110110 \\to -128 + 32 + 16 + 4 + 2 = -74$.',
            'Ou encore : inverser et ajouter 1 donne la valeur absolue. $10110110 \\to 01001001 \\to 01001010 = 74$.',
          ],
        },
      ],
    },
    {
      type: 'svg',
      maxWidth: 520,
      caption: 'Sur 4 bits, les 16 codes forment une « roue » : en ajoutant 1 à 0111 (+7), on tombe sur 1000 (−8). C’est le dépassement.',
      svg: `<svg viewBox="0 0 520 440" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif">
<circle cx="260" cy="220" r="150" fill="none" stroke="currentColor" stroke-width="1" class="svg-grid"/>
<circle cx="289.3" cy="72.9" r="5" fill="hsl(217 91% 60%)"/>
<text x="296.7" y="39.6" text-anchor="middle" font-size="12" fill="currentColor">0000</text>
<text x="283.8" y="105.3" text−anchor="middle" font−size="14" fill="hsl(217 91% 60%)">0</text>
<circle cx="343.3" cy="95.3" r="5" fill="hsl(217 91% 60%)"/>
<text x="364.4" y="67.7" text-anchor="middle" font-size="12" fill="currentColor">0001</text>
<text x="327.8" y="123.6" text−anchor="middle" font−size="14" fill="hsl(217 91% 60%)">+1</text>
<circle cx="384.7" cy="136.7" r="5" fill="hsl(217 91% 60%)"/>
<text x="416.3" y="119.6" text-anchor="middle" font-size="12" fill="currentColor">0010</text>
<text x="361.4" y="157.2" text−anchor="middle" font−size="14" fill="hsl(217 91% 60%)">+2</text>
<circle cx="407.1" cy="190.7" r="5" fill="hsl(217 91% 60%)"/>
<text x="444.4" y="187.3" text-anchor="middle" font-size="12" fill="currentColor">0011</text>
<text x="379.7" y="201.2" text−anchor="middle" font−size="14" fill="hsl(217 91% 60%)">+3</text>
<circle cx="407.1" cy="249.3" r="5" fill="hsl(217 91% 60%)"/>
<text x="444.4" y="260.7" text-anchor="middle" font-size="12" fill="currentColor">0100</text>
<text x="379.7" y="248.8" text−anchor="middle" font−size="14" fill="hsl(217 91% 60%)">+4</text>
<circle cx="384.7" cy="303.3" r="5" fill="hsl(217 91% 60%)"/>
<text x="416.3" y="328.4" text-anchor="middle" font-size="12" fill="currentColor">0101</text>
<text x="361.4" y="292.8" text−anchor="middle" font−size="14" fill="hsl(217 91% 60%)">+5</text>
<circle cx="343.3" cy="344.7" r="5" fill="hsl(217 91% 60%)"/>
<text x="364.4" y="380.3" text-anchor="middle" font-size="12" fill="currentColor">0110</text>
<text x="327.8" y="326.4" text−anchor="middle" font−size="14" fill="hsl(217 91% 60%)">+6</text>
<circle cx="289.3" cy="367.1" r="5" fill="hsl(217 91% 60%)"/>
<text x="296.7" y="408.4" text-anchor="middle" font-size="12" fill="currentColor">0111</text>
<text x="283.8" y="344.7" text−anchor="middle" font−size="14" fill="hsl(217 91% 60%)">+7</text>
<circle cx="230.7" cy="367.1" r="5" fill="hsl(0 84% 60%)"/>
<text x="223.3" y="408.4" text-anchor="middle" font-size="12" fill="currentColor">1000</text>
<text x="236.2" y="344.7" text−anchor="middle" font−size="14" fill="hsl(0 84% 60%)">−8</text>
<circle cx="176.7" cy="344.7" r="5" fill="hsl(0 84% 60%)"/>
<text x="155.6" y="380.3" text-anchor="middle" font-size="12" fill="currentColor">1001</text>
<text x="192.2" y="326.4" text−anchor="middle" font−size="14" fill="hsl(0 84% 60%)">−7</text>
<circle cx="135.3" cy="303.3" r="5" fill="hsl(0 84% 60%)"/>
<text x="103.7" y="328.4" text-anchor="middle" font-size="12" fill="currentColor">1010</text>
<text x="158.6" y="292.8" text−anchor="middle" font−size="14" fill="hsl(0 84% 60%)">−6</text>
<circle cx="112.9" cy="249.3" r="5" fill="hsl(0 84% 60%)"/>
<text x="75.6" y="260.7" text-anchor="middle" font-size="12" fill="currentColor">1011</text>
<text x="140.3" y="248.8" text−anchor="middle" font−size="14" fill="hsl(0 84% 60%)">−5</text>
<circle cx="112.9" cy="190.7" r="5" fill="hsl(0 84% 60%)"/>
<text x="75.6" y="187.3" text-anchor="middle" font-size="12" fill="currentColor">1100</text>
<text x="140.3" y="201.2" text−anchor="middle" font−size="14" fill="hsl(0 84% 60%)">−4</text>
<circle cx="135.3" cy="136.7" r="5" fill="hsl(0 84% 60%)"/>
<text x="103.7" y="119.6" text-anchor="middle" font-size="12" fill="currentColor">1101</text>
<text x="158.6" y="157.2" text−anchor="middle" font−size="14" fill="hsl(0 84% 60%)">−3</text>
<circle cx="176.7" cy="95.3" r="5" fill="hsl(0 84% 60%)"/>
<text x="155.6" y="67.7" text-anchor="middle" font-size="12" fill="currentColor">1110</text>
<text x="192.2" y="123.6" text−anchor="middle" font−size="14" fill="hsl(0 84% 60%)">−2</text>
<circle cx="230.7" cy="72.9" r="5" fill="hsl(0 84% 60%)"/>
<text x="223.3" y="39.6" text-anchor="middle" font-size="12" fill="currentColor">1111</text>
<text x="236.2" y="105.3" text−anchor="middle" font−size="14" fill="hsl(0 84% 60%)">−1</text>
<text x="260" y="210" text-anchor="middle" font-size="13" fill="currentColor">+1 = un cran dans</text>
<text x="260" y="228" text-anchor="middle" font-size="13" fill="currentColor">le sens horaire</text>
<line x1="260" y1="350" x2="260" y2="390" stroke="hsl(25 95% 53%)" stroke-width="2" stroke-dasharray="4 3"/>
<text x="260" y="430" text-anchor="middle" font-size="12" fill="hsl(25 95% 53%)">frontière de dépassement : +7 → −8</text>
<text x="40" y="30" font-size="12" fill="hsl(217 91% 60%)">● positifs (bit fort 0)</text>
<text x="360" y="30" font-size="12" fill="hsl(0 84% 60%)">● négatifs (bit fort 1)</text>
</svg>`,
    },
    {
      type: 'table',
      headers: ['Code (4 bits)', 'Naturel', 'Complément à 2', 'Code (4 bits)', 'Naturel', 'Complément à 2'],
      rows: [
        ['0000', '0', '0', '1000', '8', '−8'],
        ['0001', '1', '1', '1001', '9', '−7'],
        ['0010', '2', '2', '1010', '10', '−6'],
        ['0011', '3', '3', '1011', '11', '−5'],
        ['0100', '4', '4', '1100', '12', '−4'],
        ['0101', '5', '5', '1101', '13', '−3'],
        ['0110', '6', '6', '1110', '14', '−2'],
        ['0111', '7', '7', '1111', '15', '−1'],
      ],
      caption: 'Les 16 mots de 4 bits, interprétés en binaire naturel ou en complément à deux.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Addition en complément à deux : 7 + (−5) sur 8 bits',
      content: [
        py(String.raw`
        0 0 0 0 0 1 1 1     (  7)
    +   1 1 1 1 1 0 1 1     ( -5)
    -------------------
      1 0 0 0 0 0 0 1 0     -> on ignore le 9e bit : 00000010 = 2
`),
        { type: 'p', text: 'On obtient bien $2$. La retenue finale est ignorée : elle ne signale **pas** une erreur en complément à deux.' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Dépassement en complément à deux',
      content: [
        {
          type: 'p',
          text: 'Il y a dépassement lorsque le vrai résultat sort de $[-2^{n-1} ; 2^{n-1}-1]$. On le détecte facilement : **deux nombres de même signe donnent un résultat de signe opposé**. (L’addition de deux nombres de signes contraires ne déborde jamais.)',
        },
        {
          type: 'p',
          text: 'Exemple sur 8 bits : $100 + 50$. $01100100 + 00110010 = 10010110$, qui commence par 1 : il code $150 - 256 = -106$. Deux positifs ont donné un « négatif » : dépassement.',
        },
      ],
    },
    { type: 'h3', text: 'En Python' },
    {
      type: 'p',
      text: 'Les entiers Python (`int`) ont une **précision arbitraire** : `2**100` se calcule exactement, il n’y a jamais de dépassement. `bin(-5)` renvoie `\'-0b101\'` (signe + valeur absolue), pas le complément à deux. Pour l’obtenir sur $n$ bits, on calcule $x$ modulo $2^n$ :',
    },
    py(String.raw`
def code_c2(x, n):
    """Code de x en complément à deux sur n bits (chaîne de n caractères)."""
    assert -2**(n - 1) <= x < 2**(n - 1), "x non représentable sur n bits"
    if x < 0:
        x = 2**n + x
    return format(x, '0' + str(n) + 'b')

def decode_c2(mot):
    """Valeur de la chaîne binaire mot interprétée en complément à deux."""
    n = len(mot)
    v = int(mot, 2)
    if mot[0] == '1':     # bit de poids fort à 1 : nombre négatif
        v = v - 2**n
    return v

print(code_c2(-20, 8))         # 11101100
print(decode_c2('10110110'))   # -74
print(-5 % 256, -5 & 0xFF)     # 251 251
`),
    {
      type: 'callout',
      variant: 'remember',
      title: 'À retenir',
      content: [
        {
          type: 'list',
          items: [
            'Base b → 10 : somme des $a_i b^i$ (ou Horner). 10 → base b : divisions successives, restes lus de bas en haut.',
            '1 chiffre hexa = 4 bits. 1 octet = 8 bits = 2 chiffres hexa.',
            'Sur $n$ bits : naturels de $0$ à $2^n-1$ ; relatifs (complément à 2) de $-2^{n-1}$ à $2^{n-1}-1$.',
            'Négatif : inverser les bits de $|x|$ puis ajouter 1. Bit de poids fort = signe.',
            'Dépassement : le résultat est calculé modulo $2^n$.',
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
      id: 'conversions-de-base',
      title: 'Conversions de base',
      difficulty: 1,
      duration: 10,
      tags: ['conversion', 'binaire', 'hexadécimal'],
      statement: [
        { type: 'p', text: 'Sans calculatrice, effectuer les conversions suivantes en détaillant la méthode.' },
        {
          type: 'list',
          ordered: true,
          items: ['$110010_2$ en décimal.', '$77$ en binaire.', '$\\text{C3}_{16}$ en décimal puis en binaire.', '$1011101_2$ en hexadécimal.'],
        },
      ],
      hints: [
        'Pour 1, écrire les poids 32, 16, 8, 4, 2, 1 sous chaque bit.',
        'Pour 2, faire les divisions successives par 2, ou chercher les puissances de 2 qui composent 77.',
        'Pour 4, grouper les bits par 4 en partant de la droite.',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '$110010_2 = 32 + 16 + 2 = 50$.',
            '$77 = 64 + 13 = 64 + 8 + 4 + 1$ : bits à 1 aux positions 6, 3, 2, 0. Donc $77 = 1001101_2$. (Divisions : 77→38 r1, 38→19 r0, 19→9 r1, 9→4 r1, 4→2 r0, 2→1 r0, 1→0 r1 ; lecture de bas en haut : 1001101.)',
            '$\\text{C3}_{16} = 12 \\times 16 + 3 = 195$. En binaire, C = 1100 et 3 = 0011, d’où $11000011_2$ (vérification : $128+64+2+1 = 195$).',
            '$1011101_2 = 101\\;1101 = 0101\\;1101 \\to 5\\,\\text{D}$, donc $\\text{5D}_{16}$ (= 93).',
          ],
        },
        py(String.raw`
>>> int('110010', 2), bin(77), int('C3', 16), bin(0xC3), hex(0b1011101)
(50, '0b1001101', 195, '0b11000011', '0x5d')
`, 'Vérification en Python'),
      ],
    },
    {
      id: 'combien-de-bits',
      title: 'Combien de bits ?',
      difficulty: 1,
      duration: 10,
      tags: ['bits', 'puissances de 2'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Quel est le plus grand entier naturel représentable sur 12 bits ?',
            'Combien de bits faut-il au minimum pour écrire 1 000 en binaire ? et 1 024 ?',
            'Une image utilise 256 niveaux de gris par pixel. Combien de bits par pixel faut-il ?',
            '$a$ s’écrit sur 10 bits et $b$ sur 6 bits. Sur combien de bits au plus s’écrit $a \\times b$ ? et $a + b$ ?',
          ],
        },
      ],
      hints: ['Utiliser l’encadrement $2^{k-1} \\le N < 2^k$.', '$2^{10} = 1024$.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '$2^{12} - 1 = 4\\,096 - 1 = 4\\,095$.',
            '$2^9 = 512 \\le 1\\,000 < 1\\,024 = 2^{10}$ : **10 bits**. Pour 1 024 $= 2^{10}$ : $2^{10} \\le 1\\,024 < 2^{11}$, donc **11 bits** ($10000000000_2$, un 1 suivi de dix 0).',
            '$256 = 2^8$ valeurs : **8 bits** (1 octet) par pixel.',
            '$a < 2^{10}$ et $b < 2^6$ donc $ab < 2^{16}$ : au plus **16 bits**. Pour la somme : $b < 2^6 \\le 2^{10}$ donc $a + b < 2^{11}$ : au plus **11 bits**.',
          ],
        },
      ],
    },
    {
      id: 'addition-binaire',
      title: 'Additions binaires et dépassement',
      difficulty: 1,
      duration: 10,
      tags: ['addition', 'dépassement'],
      statement: [
        { type: 'p', text: 'Les entiers sont des entiers naturels codés sur 8 bits.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Poser l’addition $10110101_2 + 01101110_2$.',
            'Convertir les deux opérandes et le résultat en décimal. Que constate-t-on ?',
          ],
        },
      ],
      hints: ['Attention aux colonnes où l’on additionne 1 + 1 + retenue.'],
      solution: [
        py(String.raw`
 retenues : 1 1 1 1 1 1
              1 0 1 1 0 1 0 1    (181)
          +   0 1 1 0 1 1 1 0    (110)
          -------------------
            1 0 0 1 0 0 0 1 1    (291 sur 9 bits)
`),
        {
          type: 'p',
          text: '$10110101_2 = 128+32+16+4+1 = 181$ et $01101110_2 = 64+32+8+4+2 = 110$. La vraie somme est $291$, qui nécessite 9 bits. Sur 8 bits, on ne garde que $00100011_2 = 35$, et $291 - 256 = 35$ : il y a **dépassement de capacité** (la retenue sortante est perdue).',
        },
      ],
    },
    {
      id: 'complement-a-deux',
      title: 'Complément à deux',
      difficulty: 2,
      duration: 15,
      tags: ['complément à deux', 'relatifs'],
      statement: [
        { type: 'p', text: 'On travaille en complément à deux sur 8 bits.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quel est l’intervalle des entiers représentables ?',
            'Coder $-1$, $-37$, $-128$ et $64$.',
            'Quels entiers sont codés par $11111110$, $10000001$ et $01111111$ ?',
            'Peut-on coder $128$ ? Pourquoi ?',
          ],
        },
      ],
      hints: [
        'Pour coder un négatif : coder la valeur absolue, inverser, ajouter 1.',
        'Pour décoder un mot commençant par 1 : retrancher 256 à sa valeur en binaire naturel.',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '$[-2^7 ; 2^7 - 1] = [-128 ; 127]$.',
            '$-1$ : $00000001 \\to 11111110 \\to$ **11111111**. $-37$ : $37 = 00100101 \\to 11011010 \\to$ **11011011** (vérif. $219 = 256 - 37$). $-128$ : code $256 - 128 = 128 =$ **10000000**. $64 =$ **01000000**.',
            '$11111110_2 = 254$, donc $254 - 256 = -2$. $10000001_2 = 129$, donc $-127$. $01111111_2$ commence par 0 : c’est $127$.',
            'Non : $128 > 127$. Son écriture $10000000$ commence par 1 et serait lue $-128$.',
          ],
        },
      ],
    },
    {
      id: 'programme-vers-base',
      title: 'Programmer la conversion décimal → binaire',
      difficulty: 2,
      duration: 20,
      tags: ['programmation', 'Python', 'boucle while'],
      statement: [
        {
          type: 'p',
          text: 'Écrire une fonction `binaire(n)` qui prend un entier naturel `n` et renvoie la **chaîne** de son écriture binaire (sans préfixe), sans utiliser `bin` ni `format`. Par exemple `binaire(13)` renvoie `\'1101\'` et `binaire(0)` renvoie `\'0\'`.',
        },
        { type: 'p', text: 'Écrire ensuite une fonction `decimal(s)` qui fait la conversion inverse, sans utiliser `int(s, 2)`.' },
      ],
      hints: [
        'Utiliser `n % 2` (reste) et `n // 2` (quotient) dans une boucle `while n > 0`.',
        'Ajouter chaque nouveau chiffre à gauche de la chaîne : `str(r) + s`.',
        'Pour `decimal`, utiliser le schéma de Horner : `v = 2 * v + int(c)`.',
      ],
      solution: [
        py(String.raw`
def binaire(n):
    if n == 0:
        return '0'
    s = ''
    while n > 0:
        s = str(n % 2) + s   # le reste est le bit de poids faible
        n = n // 2
    return s

def decimal(s):
    v = 0
    for c in s:              # on lit de gauche (poids fort) à droite
        v = 2 * v + int(c)
    return v

# tests
assert binaire(13) == '1101'
assert binaire(0) == '0'
assert decimal('101101') == 45
for k in range(1000):
    assert decimal(binaire(k)) == k
    assert binaire(k) == bin(k)[2:]
`),
        {
          type: 'p',
          text: 'Pour `binaire(13)` : $13 \\% 2 = 1$, s = "1", n = 6 ; $6 \\% 2 = 0$, s = "01", n = 3 ; $3 \\% 2 = 1$, s = "101", n = 1 ; $1 \\% 2 = 1$, s = "1101", n = 0 : fin. Le cas `n == 0` doit être traité à part, sinon la boucle ne s’exécute pas et on renverrait la chaîne vide.',
        },
      ],
    },
    {
      id: 'hexa-couleurs',
      title: 'Couleurs HTML en hexadécimal',
      difficulty: 2,
      duration: 15,
      tags: ['hexadécimal', 'octet', 'programmation'],
      statement: [
        {
          type: 'p',
          text: 'En HTML/CSS, une couleur s’écrit `#RRVVBB` : trois octets en hexadécimal pour les composantes rouge, verte et bleue (de 0 à 255).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quelles sont les composantes de `#FF8000` ? Quelle est cette couleur ?',
            'Écrire en hexadécimal la couleur (rouge 18, vert 52, bleu 86).',
            'Combien de couleurs différentes peut-on coder ainsi ?',
            'Écrire une fonction `vers_rvb(code)` qui prend une chaîne comme `\'#FF8000\'` et renvoie le tuple `(255, 128, 0)`.',
          ],
        },
      ],
      hints: ['$\\text{80}_{16} = 8 \\times 16 = 128$.', 'Utiliser les tranches de chaîne `code[1:3]` et `int(…, 16)`.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'FF = 255, 80 = 128, 00 = 0 : rouge au maximum, vert à moitié, pas de bleu : c’est un **orange**.',
            '$18 = 16 + 2 = \\text{12}_{16}$, $52 = 3 \\times 16 + 4 = \\text{34}_{16}$, $86 = 5 \\times 16 + 6 = \\text{56}_{16}$ : `#123456`.',
            '3 octets = 24 bits, donc $2^{24} = 16\\,777\\,216$ couleurs.',
          ],
        },
        py(String.raw`
def vers_rvb(code):
    r = int(code[1:3], 16)
    v = int(code[3:5], 16)
    b = int(code[5:7], 16)
    return (r, v, b)

assert vers_rvb('#FF8000') == (255, 128, 0)
assert vers_rvb('#123456') == (18, 52, 86)
`),
      ],
    },
    {
      id: 'programme-c2',
      title: 'Programmer le complément à deux',
      difficulty: 3,
      duration: 25,
      tags: ['programmation', 'complément à deux', 'listes'],
      statement: [
        {
          type: 'p',
          text: 'On représente un mot de $n$ bits par une liste Python de 0 et de 1, bit de poids fort en premier : `[0, 0, 0, 1, 0, 1, 0, 0]` représente 20 sur 8 bits.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire `inverser(bits)` qui renvoie une **nouvelle** liste où chaque bit est inversé.',
            'Écrire `ajouter_un(bits)` qui renvoie la liste représentant le mot + 1 sur le même nombre de bits (la retenue finale éventuelle est perdue).',
            'En déduire `oppose(bits)` qui renvoie le code de l’opposé, et vérifier sur 20 et sur −128. Que se passe-t-il pour −128 ?',
          ],
        },
      ],
      hints: [
        'Pour `ajouter_un`, parcourir la liste de droite à gauche avec `range(len(bits) - 1, -1, -1)` en propageant une retenue.',
        'Un 1 plus une retenue 1 donne 0 et la retenue continue ; un 0 plus une retenue 1 donne 1 et la retenue s’arrête.',
      ],
      solution: [
        py(String.raw`
def inverser(bits):
    return [1 - b for b in bits]

def ajouter_un(bits):
    res = bits.copy()            # on ne modifie pas la liste reçue
    i = len(res) - 1
    while i >= 0 and res[i] == 1:
        res[i] = 0               # 1 + 1 = 10 : on pose 0, la retenue continue
        i = i - 1
    if i >= 0:
        res[i] = 1               # 0 + 1 = 1 : la retenue s'arrête
    return res                   # si i < 0, la retenue finale est perdue

def oppose(bits):
    return ajouter_un(inverser(bits))

vingt = [0, 0, 0, 1, 0, 1, 0, 0]
print(oppose(vingt))             # [1, 1, 1, 0, 1, 1, 0, 0]  (code de -20)
print(oppose(oppose(vingt)))     # [0, 0, 0, 1, 0, 1, 0, 0]  (on retrouve 20)
m128 = [1, 0, 0, 0, 0, 0, 0, 0]
print(oppose(m128))              # [1, 0, 0, 0, 0, 0, 0, 0]  !
`),
        {
          type: 'p',
          text: 'Pour $-128$ : inverser donne $01111111$ (127), ajouter 1 donne $10000000$, c’est-à-dire de nouveau $-128$. En effet $+128$ n’est pas représentable sur 8 bits : le calcul de l’opposé **déborde**. C’est la conséquence de l’asymétrie de l’intervalle $[-128 ; 127]$.',
        },
      ],
    },
    {
      id: 'type-bac-capteur',
      title: 'Type bac : un capteur de température',
      difficulty: 3,
      duration: 30,
      tags: ['type bac', 'complément à deux', 'hexadécimal', 'dépassement'],
      statement: [
        {
          type: 'p',
          text: 'Un capteur transmet chaque mesure de température, en degrés Celsius arrondis à l’unité, sous la forme d’un **octet** interprété en complément à deux.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quelles températures peut-on transmettre ?',
            'Le capteur envoie successivement les octets (en hexadécimal) `0x17`, `0xFB` et `0x80`. Quelles températures cela représente-t-il ?',
            'Donner l’octet (en hexadécimal) envoyé pour $-12$ °C.',
            'Un programme embarqué calcule l’écart entre deux mesures, $a - b$, sur 8 bits en complément à deux. Que donne-t-il pour $a = 100$ et $b = -40$ ? Expliquer.',
            'Écrire une fonction Python `temperature(octet)` qui prend un entier entre 0 et 255 et renvoie la température correspondante.',
          ],
        },
      ],
      hints: [
        'Un octet commençant par un chiffre hexa ≥ 8 a son bit de poids fort à 1.',
        'Pour la question 4, le vrai résultat est 140. Est-il dans l’intervalle ?',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'De $-128$ °C à $127$ °C (256 valeurs).',
            '`0x17` $= 23$ (bit de poids fort à 0) : **23 °C**. `0xFB` $= 251 \\ge 128$ : $251 - 256 =$ **−5 °C**. `0x80` $= 128$ : $128 - 256 =$ **−128 °C** (valeur extrême, probablement un code d’erreur du capteur).',
            '$256 - 12 = 244 = 15 \\times 16 + 4 = \\text{F4}_{16}$ : l’octet `0xF4` (binaire $11110100$).',
            'Le vrai résultat $100 - (-40) = 140$ dépasse 127 : **dépassement**. Le processeur calcule $140$ modulo 256, soit l’octet $10001100$, qui se lit $140 - 256 = -116$. Le programme affiche un écart de −116 °C au lieu de 140 °C.',
          ],
        },
        py(String.raw`
def temperature(octet):
    assert 0 <= octet <= 255
    if octet >= 128:        # bit de poids fort à 1
        return octet - 256
    return octet

assert temperature(0x17) == 23
assert temperature(0xFB) == -5
assert temperature(0x80) == -128
assert temperature(0xF4) == -12
`),
      ],
    },
    {
      id: 'nombre-de-bits-programme',
      title: 'Nombre de bits d’un entier',
      difficulty: 2,
      duration: 15,
      tags: ['programmation', 'boucle', 'puissances de 2'],
      statement: [
        {
          type: 'p',
          text: 'Écrire une fonction `nb_bits(n)` qui renvoie le nombre de bits nécessaires pour écrire l’entier naturel $n \\ge 1$ en binaire, **sans** convertir en chaîne. Vérifier que `nb_bits(1000)` vaut 10 et `nb_bits(1024)` vaut 11. Comparer avec la méthode Python `n.bit_length()`.',
        },
      ],
      hints: ['Diviser `n` par 2 (division entière) tant qu’il est non nul, en comptant les divisions.'],
      solution: [
        py(String.raw`
def nb_bits(n):
    k = 0
    while n > 0:
        n = n // 2     # supprime le bit de poids faible
        k = k + 1
    return k

assert nb_bits(1) == 1
assert nb_bits(1000) == 10
assert nb_bits(1024) == 11
for n in range(1, 5000):
    assert nb_bits(n) == n.bit_length() == len(bin(n)) - 2
`),
        {
          type: 'p',
          text: 'Chaque division entière par 2 supprime exactement un bit (le dernier). On compte donc les bits jusqu’à ce qu’il n’en reste plus. Cela correspond au $k$ tel que $2^{k-1} \\le n < 2^k$.',
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
      id: 'base-converter',
      props: { value: 45, bits: 8 },
      title: 'Convertisseur de bases',
      caption: 'Cliquez sur les bits pour les basculer et observez les écritures décimale, hexadécimale et en complément à deux.',
    },
    {
      type: 'widget',
      id: 'base-converter',
      props: { value: 236, bits: 8 },
      title: 'Complément à deux : le code de −20',
      caption: '11101100 vaut 236 en binaire naturel et −20 en complément à deux. Inversez les bits puis ajoutez 1 pour retrouver 20.',
    },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Que vaut $1011_2$ en décimal ?',
          choices: ['9', '11', '13', '1011'],
          answer: 1,
          explanation: '$8 + 0 + 2 + 1 = 11$.',
        },
        {
          question: 'Quelle est l’écriture hexadécimale de $11111111_2$ ?',
          choices: ['`EE`', '`FF`', '`F0`', '`100`'],
          answer: 1,
          explanation: '1111 = F, donc FF (= 255).',
        },
        {
          question: 'Quel est le plus grand entier naturel codable sur 10 bits ?',
          choices: ['1 000', '1 023', '1 024', '511'],
          answer: 1,
          explanation: '$2^{10} - 1 = 1\\,023$.',
        },
        {
          question: 'En complément à deux sur 8 bits, quel est le code de $-1$ ?',
          choices: ['`10000001`', '`11111110`', '`11111111`', '`00000001`'],
          answer: 2,
          explanation: '$256 - 1 = 255 = 11111111_2$.',
        },
        {
          question: 'En complément à deux sur 8 bits, que représente `10000000` ?',
          choices: ['$0$', '$128$', '$-0$', '$-128$'],
          answer: 3,
          explanation: '$128 - 256 = -128$.',
        },
        {
          question: 'Que renvoie `int(\'1F\', 16)` en Python ?',
          choices: ['`31`', '`15`', '`116`', '`\'0x1f\'`'],
          answer: 0,
          explanation: '$1 \\times 16 + 15 = 31$.',
        },
        {
          question: 'On additionne deux entiers naturels de 12 bits. Sur combien de bits au plus s’écrit la somme ?',
          choices: ['12', '13', '24', '144'],
          answer: 1,
          explanation: 'La somme de deux entiers de $n$ bits tient sur $n+1$ bits.',
        },
        {
          question: 'Sur 8 bits en complément à deux, on calcule $120 + 10$. On obtient :',
          choices: ['$130$', '$-126$', '$2$', 'une erreur'],
          answer: 1,
          explanation: '$130 > 127$ : dépassement. $130 - 256 = -126$.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Combien de bits dans un octet ?', back: '8 bits (= 2 chiffres hexadécimaux).' },
        { front: 'Intervalle des entiers naturels sur $n$ bits', back: '$[0 ; 2^n - 1]$' },
        { front: 'Intervalle du complément à deux sur $n$ bits', back: '$[-2^{n-1} ; 2^{n-1} - 1]$' },
        { front: 'Convertir de base 10 en base 2', back: 'Divisions successives par 2 ; lire les restes de bas en haut.' },
        { front: 'Binaire → hexadécimal', back: 'Grouper les bits par 4 depuis la droite ; chaque groupe donne un chiffre hexa.' },
        { front: 'Coder $-x$ en complément à deux', back: 'Coder $x$, inverser tous les bits, ajouter 1. (Code $= 2^n - x$.)' },
        { front: '$2^{10}$', back: '1 024' },
        { front: 'Que vaut A, B, C, D, E, F en hexadécimal ?', back: '10, 11, 12, 13, 14, 15' },
        { front: '`bin(10)` en Python', back: "`'0b1010'` (une chaîne)" },
        { front: 'Comment repérer un dépassement en complément à deux ?', back: 'Deux opérandes de même signe donnent un résultat de signe opposé.' },
        { front: 'Les `int` Python peuvent-ils déborder ?', back: 'Non, ils ont une précision arbitraire.' },
        { front: 'Différence ko / Kio', back: '1 ko = 1 000 octets ; 1 Kio = 1 024 octets.' },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque écriture à sa valeur décimale',
      pairs: [
        { left: '$101_2$', right: '5' },
        { left: '$\\text{1A}_{16}$', right: '26' },
        { left: '$11111111_2$ (naturel)', right: '255' },
        { left: '$11111111_2$ (complément à 2)', right: '−1' },
        { left: '$\\text{64}_{16}$', right: '100' },
        { left: '$10000000_2$ (complément à 2)', right: '−128' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter',
      text: 'Pour convertir un entier en base 2, on effectue des divisions successives par {{2|deux}} et on lit les {{restes}} de bas en haut. Un chiffre hexadécimal correspond à {{4|quatre}} bits. Sur 8 bits, on code les entiers naturels de 0 à {{255}}, et en complément à deux de {{-128|−128}} à {{127}}. Pour coder un nombre négatif, on inverse les bits de sa valeur absolue puis on ajoute {{1|un}}.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: '$\\text{10}_{16} = 10$', answer: false, explanation: '$\\text{10}_{16} = 16$.' },
        { text: 'Un nombre binaire terminé par 0 est pair.', answer: true, explanation: 'Le bit de poids faible a le poids 1 ; tous les autres poids sont pairs.' },
        { text: 'En complément à deux, il y a deux représentations de zéro.', answer: false, explanation: 'Un seul zéro : 00…0. C’est l’un des avantages par rapport à « signe + valeur absolue ».' },
        { text: 'Le produit de deux entiers de 8 bits tient toujours sur 16 bits.', answer: true, explanation: '$a, b < 2^8 \\Rightarrow ab < 2^{16}$.' },
        { text: 'Ajouter un 0 à droite d’un nombre binaire le multiplie par 2.', answer: true },
        { text: '`bin(-5)` renvoie le complément à deux de −5.', answer: false, explanation: 'Il renvoie `\'-0b101\'` : signe et valeur absolue.' },
      ],
    },
    {
      type: 'reveal',
      title: 'Défi : pourquoi les informaticiens confondent Halloween et Noël ?',
      content: [
        { type: 'p', text: 'Parce que **Oct 31 = Dec 25** : $31_8 = 3 \\times 8 + 1 = 25_{10}$. (Octal = base 8.)' },
      ],
    },
  ],
}

export default chapter
