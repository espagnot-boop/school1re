import type { Chapter } from '../types'

// ---------------------------------------------------------------------------
// Schémas SVG
// ---------------------------------------------------------------------------

const SVG_TABLE = `<svg viewBox="0 0 640 300" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <rect x="40" y="60" width="560" height="180" fill="none" stroke="currentColor"/>
  <rect x="40" y="60" width="560" height="30" fill="hsl(217 91% 60% / 0.18)" stroke="hsl(217 91% 60%)"/>
  <g stroke="currentColor" stroke-width="0.6">
    <line x1="100" y1="60" x2="100" y2="240"/>
    <line x1="200" y1="60" x2="200" y2="240"/>
    <line x1="310" y1="60" x2="310" y2="240"/>
    <line x1="390" y1="60" x2="390" y2="240"/>
    <line x1="500" y1="60" x2="500" y2="240"/>
    <line x1="40" y1="120" x2="600" y2="120"/>
    <line x1="40" y1="150" x2="600" y2="150"/>
    <line x1="40" y1="180" x2="600" y2="180"/>
    <line x1="40" y1="210" x2="600" y2="210"/>
  </g>
  <rect x="40" y="120" width="560" height="30" fill="hsl(142 71% 45% / 0.15)" stroke="hsl(142 71% 45%)"/>
  <rect x="390" y="60" width="110" height="180" fill="hsl(25 95% 53% / 0.12)" stroke="hsl(25 95% 53%)"/>
  <g fill="currentColor">
    <text x="70" y="80" text-anchor="middle" font-weight="600">id</text>
    <text x="150" y="80" text-anchor="middle" font-weight="600">prenom</text>
    <text x="255" y="80" text-anchor="middle" font-weight="600">nom</text>
    <text x="350" y="80" text-anchor="middle" font-weight="600">classe</text>
    <text x="445" y="80" text-anchor="middle" font-weight="600">naissance</text>
    <text x="550" y="80" text-anchor="middle" font-weight="600">moyenne</text>
    <text x="70" y="110" text-anchor="middle">1</text><text x="150" y="110" text-anchor="middle">Inès</text><text x="255" y="110" text-anchor="middle">Martin</text><text x="350" y="110" text-anchor="middle">1G2</text><text x="445" y="110" text-anchor="middle">2009-03-14</text><text x="550" y="110" text-anchor="middle">14.5</text>
    <text x="70" y="140" text-anchor="middle">2</text><text x="150" y="140" text-anchor="middle">Hugo</text><text x="255" y="140" text-anchor="middle">Bernard</text><text x="350" y="140" text-anchor="middle">1G1</text><text x="445" y="140" text-anchor="middle">2008-11-02</text><text x="550" y="140" text-anchor="middle">11.25</text>
    <text x="70" y="170" text-anchor="middle">3</text><text x="150" y="170" text-anchor="middle">Léa</text><text x="255" y="170" text-anchor="middle">Petit</text><text x="350" y="170" text-anchor="middle">1G2</text><text x="445" y="170" text-anchor="middle">2009-07-30</text><text x="550" y="170" text-anchor="middle">16</text>
    <text x="70" y="200" text-anchor="middle">4</text><text x="150" y="200" text-anchor="middle">Noah</text><text x="255" y="200" text-anchor="middle">Durand</text><text x="350" y="200" text-anchor="middle">1G3</text><text x="445" y="200" text-anchor="middle">2009-01-19</text><text x="550" y="200" text-anchor="middle">9.75</text>
    <text x="320" y="230" text-anchor="middle" opacity="0.6">…</text>
  </g>
  <g font-size="12">
    <text x="40" y="40" fill="hsl(217 91% 60%)">descripteurs (en-tête) → clés des dictionnaires</text>
    <line x1="120" y1="45" x2="120" y2="60" stroke="hsl(217 91% 60%)"/>
    <text x="445" y="262" text-anchor="middle" fill="hsl(25 95% 53%)">une colonne = un descripteur</text>
    <text x="445" y="278" text-anchor="middle" fill="hsl(25 95% 53%)">(toutes les valeurs d’un même type)</text>
    <text x="40" y="262" fill="hsl(142 71% 45%)">une ligne = un enregistrement</text>
    <text x="40" y="278" fill="hsl(142 71% 45%)">= un dictionnaire Python</text>
  </g>
</svg>`

const SVG_CSV_TO_PYTHON = `<svg viewBox="0 0 680 250" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <defs><marker id="arT" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect x="20" y="40" width="200" height="150" fill="none" stroke="currentColor"/>
  <text x="120" y="30" text-anchor="middle" fill="currentColor" font-weight="600">fichier eleves.csv (texte)</text>
  <g font-family="monospace" font-size="11" fill="currentColor">
    <text x="30" y="65" fill="hsl(217 91% 60%)">id,prenom,classe</text>
    <text x="30" y="88">1,Inès,1G2</text>
    <text x="30" y="111">2,Hugo,1G1</text>
    <text x="30" y="134">3,Léa,1G2</text>
  </g>
  <line x1="230" y1="115" x2="300" y2="115" stroke="currentColor" marker-end="url(#arT)"/>
  <text x="265" y="105" text-anchor="middle" fill="currentColor" font-size="11">DictReader</text>
  <rect x="310" y="40" width="350" height="150" fill="none" stroke="currentColor"/>
  <text x="485" y="30" text-anchor="middle" fill="currentColor" font-weight="600">table Python (liste de dictionnaires)</text>
  <g font-family="monospace" font-size="11" fill="currentColor">
    <text x="320" y="65">[</text>
    <text x="330" y="88">{'id': '1', 'prenom': 'Inès', 'classe': '1G2'},</text>
    <text x="330" y="111">{'id': '2', 'prenom': 'Hugo', 'classe': '1G1'},</text>
    <text x="330" y="134">{'id': '3', 'prenom': 'Léa', 'classe': '1G2'}</text>
    <text x="320" y="157">]</text>
  </g>
  <text x="340" y="220" fill="hsl(0 84% 60%)">⚠ toutes les valeurs lues sont des chaînes (str) : '1' et non 1</text>
  <text x="340" y="238" fill="currentColor" opacity="0.7">table[1]['prenom'] → 'Hugo'</text>
</svg>`

const SVG_JOINTURE = `<svg viewBox="0 0 680 280" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <defs><marker id="arJ" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <text x="110" y="24" text-anchor="middle" fill="currentColor" font-weight="600">eleves</text>
  <rect x="20" y="34" width="180" height="120" fill="none" stroke="currentColor"/>
  <rect x="20" y="34" width="50" height="120" fill="hsl(263 70% 60% / 0.15)" stroke="hsl(263 70% 60%)"/>
  <g fill="currentColor"><text x="45" y="54" text-anchor="middle" font-weight="600">id</text><text x="135" y="54" text-anchor="middle" font-weight="600">prenom</text>
  <text x="45" y="80" text-anchor="middle">1</text><text x="135" y="80" text-anchor="middle">Inès</text>
  <text x="45" y="104" text-anchor="middle">2</text><text x="135" y="104" text-anchor="middle">Hugo</text>
  <text x="45" y="128" text-anchor="middle">3</text><text x="135" y="128" text-anchor="middle">Léa</text></g>
  <text x="330" y="24" text-anchor="middle" fill="currentColor" font-weight="600">notes</text>
  <rect x="240" y="34" width="180" height="120" fill="none" stroke="currentColor"/>
  <rect x="240" y="34" width="50" height="120" fill="hsl(263 70% 60% / 0.15)" stroke="hsl(263 70% 60%)"/>
  <g fill="currentColor"><text x="265" y="54" text-anchor="middle" font-weight="600">id</text><text x="320" y="54" text-anchor="middle" font-weight="600">matiere</text><text x="390" y="54" text-anchor="middle" font-weight="600">note</text>
  <text x="265" y="80" text-anchor="middle">1</text><text x="320" y="80" text-anchor="middle">NSI</text><text x="390" y="80" text-anchor="middle">17</text>
  <text x="265" y="104" text-anchor="middle">3</text><text x="320" y="104" text-anchor="middle">NSI</text><text x="390" y="104" text-anchor="middle">12</text>
  <text x="265" y="128" text-anchor="middle">9</text><text x="320" y="128" text-anchor="middle">NSI</text><text x="390" y="128" text-anchor="middle">8</text></g>
  <line x1="420" y1="95" x2="470" y2="95" stroke="currentColor" marker-end="url(#arJ)"/>
  <text x="445" y="85" text-anchor="middle" fill="currentColor" font-size="11">id = id</text>
  <text x="565" y="24" text-anchor="middle" fill="currentColor" font-weight="600">jointure</text>
  <rect x="480" y="34" width="180" height="96" fill="none" stroke="hsl(142 71% 45%)"/>
  <g fill="currentColor" font-size="11"><text x="495" y="54" font-weight="600">id prenom matiere note</text>
  <text x="495" y="80">1  Inès   NSI   17</text>
  <text x="495" y="104">3  Léa    NSI   12</text></g>
  <g font-size="11">
    <text x="20" y="190" fill="currentColor">• Hugo (id 2) n’a aucune note → absent du résultat.</text>
    <text x="20" y="210" fill="currentColor">• La note de l’id 9 ne correspond à aucun élève → incohérence à signaler (clé « orpheline »).</text>
    <text x="20" y="230" fill="currentColor">• Seules les lignes dont la clé commune existe dans les DEUX tables sont fusionnées.</text>
    <text x="20" y="258" fill="hsl(263 70% 60%)">clé commune (descripteur partagé) = « colonne de jointure »</text>
  </g>
</svg>`

const SVG_CONCAT = `<svg viewBox="0 0 600 200" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <defs><marker id="arC" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <text x="90" y="22" text-anchor="middle" fill="currentColor" font-weight="600">table A</text>
  <rect x="20" y="30" width="140" height="22" fill="hsl(217 91% 60% / 0.18)" stroke="hsl(217 91% 60%)"/>
  <rect x="20" y="52" width="140" height="44" fill="none" stroke="currentColor"/>
  <text x="90" y="46" text-anchor="middle" fill="currentColor">nom | ville</text>
  <text x="90" y="80" text-anchor="middle" fill="currentColor">2 lignes</text>
  <text x="90" y="122" text-anchor="middle" fill="currentColor" font-weight="600">table B</text>
  <rect x="20" y="130" width="140" height="22" fill="hsl(217 91% 60% / 0.18)" stroke="hsl(217 91% 60%)"/>
  <rect x="20" y="152" width="140" height="33" fill="none" stroke="currentColor"/>
  <text x="90" y="146" text-anchor="middle" fill="currentColor">nom | ville</text>
  <text x="90" y="174" text-anchor="middle" fill="currentColor">3 lignes</text>
  <line x1="175" y1="105" x2="300" y2="105" stroke="currentColor" marker-end="url(#arC)"/>
  <text x="238" y="95" text-anchor="middle" fill="currentColor" font-size="11">A + B</text>
  <text x="400" y="42" text-anchor="middle" fill="currentColor" font-weight="600">concaténation</text>
  <rect x="320" y="50" width="160" height="22" fill="hsl(217 91% 60% / 0.18)" stroke="hsl(217 91% 60%)"/>
  <rect x="320" y="72" width="160" height="88" fill="none" stroke="hsl(142 71% 45%)"/>
  <text x="400" y="66" text-anchor="middle" fill="currentColor">nom | ville</text>
  <text x="400" y="120" text-anchor="middle" fill="currentColor">5 lignes</text>
  <text x="400" y="185" text-anchor="middle" fill="currentColor" font-size="11">mêmes descripteurs obligatoires</text>
</svg>`

// ---------------------------------------------------------------------------
// Codes Python réutilisés
// ---------------------------------------------------------------------------

const CODE_LECTURE = `import csv

def charger(nom_fichier, separateur=','):
    """Renvoie la table contenue dans un fichier CSV
    sous forme d'une liste de dictionnaires."""
    with open(nom_fichier, newline='', encoding='utf-8') as f:
        lecteur = csv.DictReader(f, delimiter=separateur)
        return list(lecteur)

eleves = charger('eleves.csv')
print(len(eleves))      # 6  (nombre d'enregistrements, l'en-tête n'est pas compté)
print(eleves[0])
# {'id': '1', 'prenom': 'Inès', 'nom': 'Martin', 'classe': '1G2',
#  'naissance': '2009-03-14', 'moyenne': '14.5'}`

const CODE_CONVERSION = `def convertir(table):
    """Convertit en place les colonnes numériques (modifie la table)."""
    for ligne in table:
        ligne['id'] = int(ligne['id'])
        ligne['moyenne'] = float(ligne['moyenne'])

convertir(eleves)
print(eleves[0]['moyenne'] + 1)   # 15.5  (et non une erreur de type)`

const CODE_RECHERCHE = `# Toutes les lignes vérifiant un critère : compréhension de liste
premiere_g2 = [e for e in eleves if e['classe'] == '1G2']

# Critère composé (logique propositionnelle : and, or, not)
bons_g2 = [e['prenom'] for e in eleves
           if e['classe'] == '1G2' and e['moyenne'] >= 15]
print(bons_g2)    # ['Léa']

g1_ou_fragiles = [e['prenom'] for e in eleves
                  if e['classe'] == '1G1' or e['moyenne'] < 10]
print(g1_ou_fragiles)   # ['Hugo', 'Noah', 'Chloé']

# Projection : ne garder que certaines colonnes
projection = [{'prenom': e['prenom'], 'moyenne': e['moyenne']} for e in eleves]`

const CODE_TRI = `# sorted renvoie une NOUVELLE liste triée ; la table d'origine est inchangée
par_moyenne = sorted(eleves, key=lambda e: e['moyenne'], reverse=True)
print([e['prenom'] for e in par_moyenne])
# ['Léa', 'Adam', 'Inès', 'Chloé', 'Hugo', 'Noah']

# Tri par date : le format AAAA-MM-JJ se trie correctement comme une chaîne
par_age = sorted(eleves, key=lambda e: e['naissance'])
print([e['prenom'] for e in par_age])
# ['Hugo', 'Adam', 'Noah', 'Inès', 'Chloé', 'Léa']

# list.sort() trie EN PLACE et renvoie None
eleves.sort(key=lambda e: e['nom'])`

const CODE_TRI_MULTI = `# Tri selon deux critères : classe croissante, puis moyenne décroissante.
# Méthode 1 : deux tris successifs (le tri de Python est STABLE),
# en commençant par le critère SECONDAIRE.
t = sorted(eleves, key=lambda e: e['moyenne'], reverse=True)
t = sorted(t, key=lambda e: e['classe'])

# Méthode 2 : une clé tuple (on « inverse » la moyenne avec un signe -)
t = sorted(eleves, key=lambda e: (e['classe'], -e['moyenne']))

print([(e['classe'], e['prenom']) for e in t])
# [('1G1', 'Chloé'), ('1G1', 'Hugo'), ('1G2', 'Léa'),
#  ('1G2', 'Inès'), ('1G3', 'Adam'), ('1G3', 'Noah')]`

const CODE_JOINTURE = `def jointure(table1, table2, cle):
    """Fusionne les lignes de table1 et table2 ayant la même valeur
    pour le descripteur commun cle."""
    resultat = []
    for l1 in table1:
        for l2 in table2:
            if l1[cle] == l2[cle]:
                nouvelle = dict(l1)    # copie, pour ne pas modifier table1
                nouvelle.update(l2)    # ajoute les colonnes de l2
                resultat.append(nouvelle)
    return resultat

notes = [{'id': 1, 'matiere': 'NSI', 'note': 17},
         {'id': 3, 'matiere': 'NSI', 'note': 12},
         {'id': 1, 'matiere': 'Maths', 'note': 13},
         {'id': 9, 'matiere': 'NSI', 'note': 8}]

for l in jointure(eleves, notes, 'id'):
    print(l['prenom'], l['matiere'], l['note'])
# Inès NSI 17
# Inès Maths 13
# Léa NSI 12`

const CODE_INDEX = `# Indexer une table par une clé : dictionnaire {valeur de clé: ligne}
index = {e['id']: e for e in eleves}
print(index[3]['prenom'])     # 'Léa'  — accès direct, sans parcours

# Jointure plus efficace grâce à l'index : un seul parcours de notes
def jointure_index(table1, table2, cle):
    index = {l[cle]: l for l in table1}   # suppose la clé unique dans table1
    resultat = []
    for l2 in table2:
        if l2[cle] in index:
            nouvelle = dict(index[l2[cle]])
            nouvelle.update(l2)
            resultat.append(nouvelle)
    return resultat`

const CODE_ECRITURE = `import csv

def sauvegarder(table, nom_fichier, descripteurs):
    with open(nom_fichier, 'w', newline='', encoding='utf-8') as f:
        ecrivain = csv.DictWriter(f, fieldnames=descripteurs)
        ecrivain.writeheader()        # écrit la ligne d'en-tête
        ecrivain.writerows(table)     # écrit toutes les lignes

sauvegarder(eleves, 'copie.csv',
            ['id', 'prenom', 'nom', 'classe', 'naissance', 'moyenne'])`

const CODE_COHERENCE = `def doublons(table, cle):
    """Renvoie la liste des valeurs de cle apparaissant plusieurs fois."""
    vus = set()
    repetes = []
    for ligne in table:
        v = ligne[cle]
        if v in vus and v not in repetes:
            repetes.append(v)
        vus.add(v)
    return repetes

def lignes_incompletes(table):
    """Lignes ayant au moins une valeur vide."""
    return [l for l in table if any(v.strip() == '' for v in l.values())]

def est_note_valide(texte):
    """Vérifie qu'une chaîne représente une note entre 0 et 20."""
    try:
        x = float(texte)
    except ValueError:
        return False
    return 0 <= x <= 20`

// ---------------------------------------------------------------------------

const chapter: Chapter = {
  id: 'donnees-en-table',
  subject: 'nsi',
  order: 4,
  title: 'Traitement de données en tables',
  theme: 'Traitement de données en tables',
  summary:
    'Importer une table depuis un fichier CSV, la représenter en Python par une liste de dictionnaires, y rechercher des lignes selon des critères, la trier selon une colonne, fusionner deux tables et vérifier la cohérence des données.',
  duration: '3 semaines',
  objectives: [
    'Importer une table depuis un fichier texte tabulé ou un fichier CSV.',
    'Représenter une table par une liste de dictionnaires (ou de p-uplets) en Python.',
    'Rechercher les lignes d’une table vérifiant des critères exprimés en logique propositionnelle.',
    'Trier une table suivant une colonne (et selon plusieurs critères).',
    'Construire une nouvelle table en combinant les données de deux tables (concaténation, jointure).',
    'Repérer les incohérences : doublons, valeurs manquantes, types ou formats erronés, clés sans correspondance.',
  ],
  keywords: [
    'CSV',
    'descripteur',
    'enregistrement',
    'liste de dictionnaires',
    'csv.DictReader',
    'sélection',
    'projection',
    'tri',
    'sorted',
    'key',
    'lambda',
    'jointure',
    'concaténation',
    'doublon',
    'cohérence',
  ],

  // =========================================================================
  // FICHE
  // =========================================================================
  fiche: [
    { type: 'h2', text: 'Vocabulaire' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Table', value: 'Ensemble de données organisées en lignes et colonnes (ex. un tableur, un fichier CSV).' },
        { key: 'Descripteur (attribut)', value: 'Nom d’une colonne, donné par la ligne d’en-tête. Toutes les valeurs d’une colonne ont le même type.' },
        { key: 'Enregistrement (ligne)', value: 'Une ligne de la table : une valeur pour chaque descripteur.' },
        { key: 'Domaine', value: 'Ensemble des valeurs possibles d’un descripteur (entier, texte, date…).' },
        { key: 'CSV', value: '*Comma-Separated Values* : fichier **texte**, une ligne par enregistrement, valeurs séparées par `,` (ou `;`, tabulation…).' },
        { key: 'Clé', value: 'Descripteur (ou groupe) dont la valeur identifie chaque ligne de façon unique (ex. `id`).' },
      ],
    },
    { type: 'h2', text: 'Représentation en Python' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Liste de dictionnaires',
      content: [
        { type: 'p', text: 'Une table = une **liste** ; chaque ligne = un **dictionnaire** dont les clés sont les descripteurs.' },
        { type: 'code', lang: 'python', code: `table = [{'prenom': 'Inès', 'moyenne': 14.5},
         {'prenom': 'Hugo', 'moyenne': 11.25}]
table[1]['prenom']   # 'Hugo'` },
      ],
    },
    { type: 'h2', text: 'Les opérations à connaître' },
    {
      type: 'table',
      headers: ['Opération', 'Code Python type'],
      rows: [
        ['Importer un CSV', '`list(csv.DictReader(f, delimiter=\';\'))`'],
        ['Convertir un type', '`ligne[\'moyenne\'] = float(ligne[\'moyenne\'])`'],
        ['Sélectionner des lignes', '`[l for l in t if l[\'classe\'] == \'1G2\' and l[\'moyenne\'] >= 15]`'],
        ['Projeter (choisir des colonnes)', '`[l[\'prenom\'] for l in t]`'],
        ['Trier selon une colonne', '`sorted(t, key=lambda l: l[\'moyenne\'], reverse=True)`'],
        ['Trier selon 2 critères', '`sorted(t, key=lambda l: (l[\'classe\'], -l[\'moyenne\']))`'],
        ['Concaténer (mêmes descripteurs)', '`t1 + t2`'],
        ['Indexer par une clé', '`{l[\'id\']: l for l in t}`'],
        ['Écrire un CSV', '`csv.DictWriter(f, fieldnames=…)` puis `writeheader()`, `writerows(t)`'],
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
            '`csv.DictReader` renvoie **toujours des chaînes** : `\'9\' > \'10\'` vaut `True` ! Convertir avec `int()` / `float()` avant de comparer ou calculer.',
            '`sorted(t)` renvoie une nouvelle liste ; `t.sort()` modifie `t` et renvoie `None`.',
            'Le tri de Python est **stable** : pour trier selon A puis B, trier d’abord selon B, puis selon A.',
            'Ouvrir avec `newline=\'\'` et `encoding=\'utf-8\'` ; bien indiquer le séparateur (`delimiter=\';\'`).',
          ],
        },
      ],
    },
    { type: 'h2', text: 'Fusion de tables' },
    {
      type: 'list',
      items: [
        '**Concaténation** : mettre bout à bout deux tables ayant **les mêmes descripteurs** → `t1 + t2`.',
        '**Jointure** : associer les lignes de deux tables ayant la **même valeur** pour un descripteur commun (ex. `id`) ; chaque ligne du résultat réunit les colonnes des deux tables.',
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Tests de cohérence avant tout traitement',
      content: [
        {
          type: 'list',
          items: [
            'Pas de **doublons** sur la clé.',
            'Pas de **valeurs manquantes** (chaînes vides).',
            'Valeurs du **bon type** et dans le **bon domaine** (note entre 0 et 20, date valide…).',
            'Pour une jointure : chaque clé référencée existe dans l’autre table (pas de clé « orpheline »).',
          ],
        },
      ],
    },
  ],

  // =========================================================================
  // COURS
  // =========================================================================
  cours: [
    { type: 'h2', text: '1. Données organisées en tables' },
    {
      type: 'p',
      text: 'Une grande partie des données manipulées par l’informatique (fichiers clients, relevés météo, données publiques ouvertes de *data.gouv.fr*, résultats d’un capteur…) se présente sous forme de **tables** : des lignes et des colonnes, comme dans un tableur. Ce chapitre montre comment importer de telles données dans un programme Python, puis les **interroger** (rechercher), les **trier**, les **combiner** et en vérifier la **cohérence**.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Table, descripteurs, enregistrements',
      content: [
        {
          type: 'list',
          items: [
            'Une **table** est une collection d’**enregistrements** (les lignes), tous décrits par les mêmes **descripteurs** (les colonnes, appelés aussi *attributs*).',
            'Chaque descripteur possède un **domaine** : l’ensemble des valeurs qu’il peut prendre (entiers, flottants, textes, dates…).',
            'Une **clé** est un descripteur dont la valeur suffit à identifier une ligne de façon unique (numéro d’élève, numéro INSEE d’une commune, ISBN d’un livre…).',
          ],
        },
      ],
    },
    { type: 'svg', svg: SVG_TABLE, caption: 'Vocabulaire d’une table : en-tête (descripteurs), lignes (enregistrements), colonnes.' },
    {
      type: 'p',
      text: 'Tout au long du chapitre on utilise une petite table fictive `eleves.csv` de 6 élèves, avec les descripteurs `id`, `prenom`, `nom`, `classe`, `naissance` et `moyenne`.',
    },

    { type: 'h2', text: '2. Le format CSV' },
    {
      type: 'p',
      text: 'Le format **CSV** (*Comma-Separated Values*, « valeurs séparées par des virgules ») est le format d’échange de tables le plus répandu. C’est un simple **fichier texte** : on peut l’ouvrir avec un éditeur de texte, un tableur ou un programme.',
    },
    {
      type: 'code',
      lang: 'text',
      caption: 'Contenu du fichier eleves.csv',
      code: `id,prenom,nom,classe,naissance,moyenne
1,Inès,Martin,1G2,2009-03-14,14.5
2,Hugo,Bernard,1G1,2008-11-02,11.25
3,Léa,Petit,1G2,2009-07-30,16
4,Noah,Durand,1G3,2009-01-19,9.75
5,Chloé,Leroy,1G1,2009-05-08,13
6,Adam,Moreau,1G3,2008-12-25,15.5`,
    },
    {
      type: 'list',
      items: [
        'La **première ligne** (en-tête) contient en général les **descripteurs**.',
        'Chaque ligne suivante est un **enregistrement** ; les valeurs sont séparées par un **séparateur**.',
        'Le séparateur est souvent la virgule, mais en France on rencontre fréquemment le **point-virgule** `;` (car la virgule sert de séparateur décimal dans les tableurs français). Un fichier « texte tabulé » utilise la tabulation.',
        'Si une valeur contient le séparateur, on l’entoure de guillemets : `"Dupont, Jean"`. Le module `csv` gère cela automatiquement.',
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Un CSV ne contient aucune information de type',
      content: [
        {
          type: 'p',
          text: 'Dans un fichier texte, `14.5` n’est qu’une suite de 4 caractères. C’est au programme de décider qu’il s’agit d’un nombre. De même, l’encodage des caractères (UTF-8, Latin-1…) n’est pas indiqué dans le fichier : un mauvais choix fait apparaître des caractères du type `InÃ¨s` à la place de `Inès`.',
        },
      ],
    },

    { type: 'h2', text: '3. Importer une table en Python' },
    { type: 'h3', text: '3.1 Avec csv.DictReader (méthode recommandée)' },
    {
      type: 'p',
      text: 'Le module standard `csv` fournit `csv.DictReader`, qui lit le fichier ligne par ligne et produit, pour chaque enregistrement, un **dictionnaire** dont les clés sont les descripteurs de l’en-tête.',
    },
    { type: 'code', lang: 'python', code: CODE_LECTURE },
    { type: 'svg', svg: SVG_CSV_TO_PYTHON, caption: 'Du fichier texte à la liste de dictionnaires.' },
    {
      type: 'list',
      items: [
        '`with open(...) as f:` ouvre le fichier et le **referme automatiquement** à la fin du bloc.',
        '`newline=\'\'` est recommandé par la documentation du module `csv` (gestion correcte des fins de ligne) ; `encoding=\'utf-8\'` évite les problèmes d’accents.',
        '`delimiter=\';\'` indique le séparateur s’il ne s’agit pas d’une virgule (`\'\\t\'` pour une tabulation).',
        '`list(...)` est indispensable : un `DictReader` se lit une seule fois et devient inutilisable une fois le fichier fermé.',
      ],
    },
    { type: 'h3', text: '3.2 Avec csv.reader : liste de listes' },
    {
      type: 'p',
      text: '`csv.reader` produit chaque ligne sous forme de **liste** de chaînes. On accède alors aux valeurs par leur **indice** de colonne, ce qui est moins lisible (`ligne[5]` au lieu de `ligne[\'moyenne\']`).',
    },
    {
      type: 'code',
      lang: 'python',
      code: `import csv
with open('eleves.csv', newline='', encoding='utf-8') as f:
    lignes = list(csv.reader(f))
entete = lignes[0]       # ['id', 'prenom', 'nom', 'classe', 'naissance', 'moyenne']
donnees = lignes[1:]     # [['1', 'Inès', 'Martin', '1G2', '2009-03-14', '14.5'], ...]
print(donnees[2][1])     # 'Léa'`,
    },
    { type: 'h3', text: '3.3 Sans module : découper soi-même' },
    {
      type: 'code',
      lang: 'python',
      code: `table = []
with open('eleves.csv', encoding='utf-8') as f:
    descripteurs = f.readline().strip().split(',')
    for ligne in f:
        valeurs = ligne.strip().split(',')
        table.append(dict(zip(descripteurs, valeurs)))`,
    },
    {
      type: 'callout',
      variant: 'tip',
      content: [
        {
          type: 'p',
          text: 'Cette méthode « à la main » est instructive mais fragile : elle échoue si une valeur contient une virgule entre guillemets. En pratique, on utilise le module `csv`.',
        },
      ],
    },
    { type: 'h3', text: '3.4 Convertir les types' },
    {
      type: 'p',
      text: 'Toutes les valeurs lues sont des **chaînes de caractères**. Avant de calculer ou de comparer des nombres, il faut les convertir :',
    },
    { type: 'code', lang: 'python', code: CODE_CONVERSION },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Comparer des chaînes ≠ comparer des nombres',
      content: [
        {
          type: 'p',
          text: 'Les chaînes se comparent dans l’**ordre lexicographique** (caractère par caractère, selon le code Unicode). Ainsi `\'9\' > \'10\'` vaut `True` car le caractère `9` est après le caractère `1`, et `sorted([\'10\', \'9\', \'100\'])` donne `[\'10\', \'100\', \'9\']`.',
        },
        {
          type: 'p',
          text: 'De même, les majuscules passent avant les minuscules et les lettres accentuées après toutes les lettres non accentuées : `sorted([\'Zoé\', \'arthur\', \'Émile\', \'bob\', \'Alice\'])` donne `[\'Alice\', \'Zoé\', \'arthur\', \'bob\', \'Émile\']`.',
        },
      ],
    },
    {
      type: 'p',
      text: 'Une autre représentation possible d’une table est une **liste de p-uplets** (tuples) : `[(1, \'Inès\', 14.5), (2, \'Hugo\', 11.25)]`. Elle est plus compacte mais oblige à retenir la position de chaque colonne. Le programme privilégie les listes de dictionnaires, plus lisibles.',
    },

    { type: 'h2', text: '4. Rechercher dans une table' },
    { type: 'h3', text: '4.1 Sélection de lignes' },
    {
      type: 'p',
      text: '**Sélectionner** (ou *filtrer*), c’est construire la sous-table des lignes qui vérifient un **critère**. Le critère est une expression booléenne, éventuellement composée avec les opérateurs logiques `and`, `or`, `not` (logique propositionnelle).',
    },
    { type: 'code', lang: 'python', code: CODE_RECHERCHE },
    {
      type: 'p',
      text: 'La version avec une boucle explicite, équivalente à une compréhension de liste :',
    },
    {
      type: 'code',
      lang: 'python',
      code: `def selection(table, critere):
    """critere est une fonction qui prend une ligne et renvoie un booléen."""
    resultat = []
    for ligne in table:
        if critere(ligne):
            resultat.append(ligne)
    return resultat

nes_en_2008 = selection(eleves, lambda e: e['naissance'][:4] == '2008')
print([e['prenom'] for e in nes_en_2008])   # ['Hugo', 'Adam']`,
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Traduire un critère en français en expression Python',
      content: [
        {
          type: 'table',
          headers: ['Critère', 'Expression'],
          rows: [
            ['élèves de 1G1 ayant au moins 12', '`e[\'classe\'] == \'1G1\' and e[\'moyenne\'] >= 12`'],
            ['élèves qui ne sont pas en 1G3', '`not e[\'classe\'] == \'1G3\'` ou `e[\'classe\'] != \'1G3\'`'],
            ['moyenne entre 10 et 14 inclus', '`10 <= e[\'moyenne\'] <= 14`'],
            ['prénom commençant par L', '`e[\'prenom\'][0] == \'L\'` ou `e[\'prenom\'].startswith(\'L\')`'],
            ['en 1G1 ou en 1G2', '`e[\'classe\'] in (\'1G1\', \'1G2\')`'],
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Priorité des opérateurs',
      content: [
        {
          type: 'p',
          text: '`and` est prioritaire sur `or` : `a or b and c` signifie `a or (b and c)`. En cas de doute, **mettre des parenthèses**.',
        },
      ],
    },
    { type: 'h3', text: '4.2 Projection : choisir des colonnes' },
    {
      type: 'p',
      text: 'La **projection** consiste à ne garder que certains descripteurs. Sélection et projection se combinent souvent : « les prénoms des élèves de 1G2 » = sélection (classe = 1G2) puis projection (prenom).',
    },
    {
      type: 'code',
      lang: 'python',
      code: `prenoms_g2 = [e['prenom'] for e in eleves if e['classe'] == '1G2']
print(prenoms_g2)    # ['Inès', 'Léa']`,
    },
    { type: 'h3', text: '4.3 Recherche d’une valeur, agrégats' },
    {
      type: 'code',
      lang: 'python',
      code: `def existe(table, descripteur, valeur):
    for ligne in table:
        if ligne[descripteur] == valeur:
            return True
    return False

moyenne_generale = sum(e['moyenne'] for e in eleves) / len(eleves)
print(round(moyenne_generale, 2))       # 13.33
meilleur = max(eleves, key=lambda e: e['moyenne'])
print(meilleur['prenom'])               # 'Léa'
effectif_g1 = len([e for e in eleves if e['classe'] == '1G1'])   # 2`,
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Coût d’une recherche',
      content: [
        {
          type: 'p',
          text: 'Une recherche dans une table non triée demande, dans le pire des cas, de parcourir **toutes les lignes** : le coût est **linéaire** en le nombre $n$ de lignes. Si la table est triée selon la colonne recherchée, une recherche **dichotomique** est possible (coût de l’ordre de $\\log_2 n$).',
        },
      ],
    },
    { type: 'h3', text: '4.4 Indexation par une clé' },
    {
      type: 'p',
      text: 'Lorsqu’on doit accéder souvent à une ligne par sa clé, on peut construire un **dictionnaire d’index** associant à chaque valeur de clé la ligne correspondante. L’accès devient alors immédiat, sans parcours.',
    },
    { type: 'code', lang: 'python', code: `index = {e['id']: e for e in eleves}
index[3]['prenom']    # 'Léa'
index[6]['classe']    # '1G3'` },
    {
      type: 'callout',
      variant: 'warning',
      content: [
        {
          type: 'p',
          text: 'Si la « clé » n’est pas unique, l’index ne conserve que la **dernière** ligne rencontrée pour chaque valeur : on perd des données sans message d’erreur. D’où l’importance de tester l’absence de doublons.',
        },
      ],
    },

    { type: 'h2', text: '5. Trier une table selon une colonne' },
    {
      type: 'p',
      text: 'Python ne sait pas comparer deux dictionnaires avec `<`. Pour trier une liste de dictionnaires, on indique **selon quelle valeur** comparer les lignes grâce au paramètre `key` : c’est une fonction qui, à une ligne, associe la valeur servant au tri.',
    },
    { type: 'code', lang: 'python', code: CODE_TRI },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Fonction lambda',
      content: [
        {
          type: 'p',
          text: '`lambda e: e[\'moyenne\']` est une **fonction anonyme** équivalente à :',
        },
        { type: 'code', lang: 'python', code: `def cle_moyenne(e):
    return e['moyenne']

sorted(eleves, key=cle_moyenne)    # même résultat` },
      ],
    },
    {
      type: 'table',
      headers: ['', '`sorted(t, key=…)`', '`t.sort(key=…)`'],
      rows: [
        ['Table d’origine', 'inchangée', 'modifiée (tri en place)'],
        ['Valeur renvoyée', 'nouvelle liste triée', '`None`'],
        ['Sens décroissant', '`reverse=True`', '`reverse=True`'],
      ],
    },
    { type: 'h3', text: 'Trier selon plusieurs critères' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Stabilité du tri',
      content: [
        {
          type: 'p',
          text: 'Un tri est **stable** s’il conserve l’ordre relatif des éléments **égaux** pour le critère de tri. Les fonctions `sorted` et `list.sort` de Python sont stables. Conséquence : pour trier selon un critère principal A puis un critère secondaire B, on trie **d’abord selon B**, **puis selon A**.',
        },
      ],
    },
    { type: 'code', lang: 'python', code: CODE_TRI_MULTI },
    {
      type: 'p',
      text: 'Avec une clé **tuple**, Python compare d’abord les premières composantes, puis en cas d’égalité les deuxièmes, etc. (ordre lexicographique sur les tuples).',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Pourquoi le format de date AAAA-MM-JJ ?',
      content: [
        {
          type: 'p',
          text: 'Avec le format international ISO 8601 (`2009-03-14`), l’ordre alphabétique des chaînes coïncide avec l’ordre chronologique. Avec le format `14/03/2009`, ce n’est plus vrai : `\'02/11/2008\' < \'14/03/2009\' < \'25/12/2008\'`.',
        },
      ],
    },
    {
      type: 'p',
      text: 'Les algorithmes de tri (sélection, insertion) étudiés dans la partie *Algorithmique* fonctionnent aussi sur des tables : il suffit de comparer `t[i][\'moyenne\']` au lieu de `t[i]`.',
    },
    {
      type: 'code',
      lang: 'python',
      code: `def tri_insertion_colonne(t, col):
    """Trie en place la table t selon la colonne col (ordre croissant)."""
    for i in range(1, len(t)):
        ligne = t[i]
        j = i
        while j > 0 and t[j - 1][col] > ligne[col]:
            t[j] = t[j - 1]
            j = j - 1
        t[j] = ligne`,
    },
    {
      type: 'p',
      text: 'Ce tri par insertion est lui aussi **stable**, car on ne décale une ligne que si elle est **strictement** plus grande (`>`).',
    },

    { type: 'h2', text: '6. Fusionner des tables' },
    { type: 'h3', text: '6.1 Concaténation' },
    {
      type: 'p',
      text: 'Deux tables ayant **exactement les mêmes descripteurs** (par exemple les inscrits de deux lycées) peuvent être mises bout à bout. En Python, avec des listes : `t = t1 + t2`.',
    },
    { type: 'svg', svg: SVG_CONCAT, caption: 'Concaténation : les lignes s’ajoutent, les colonnes restent les mêmes.' },
    {
      type: 'code',
      lang: 'python',
      code: `def concatener(t1, t2):
    assert len(t1) == 0 or len(t2) == 0 or t1[0].keys() == t2[0].keys(), \\
        'descripteurs différents'
    return t1 + t2`,
    },
    {
      type: 'callout',
      variant: 'warning',
      content: [
        {
          type: 'p',
          text: 'Après une concaténation, il faut vérifier l’absence de **doublons** : un même élève peut figurer dans les deux tables. Et les deux tables doivent utiliser les **mêmes conventions** (mêmes unités, même format de date, même orthographe des catégories).',
        },
      ],
    },
    { type: 'h3', text: '6.2 Jointure' },
    {
      type: 'p',
      text: 'Une **jointure** combine deux tables qui partagent un descripteur commun (souvent une clé). Pour chaque couple de lignes ayant la même valeur pour ce descripteur, on produit une ligne contenant les colonnes des deux tables.',
    },
    { type: 'svg', svg: SVG_JOINTURE, caption: 'Jointure des tables eleves et notes sur le descripteur id.' },
    { type: 'code', lang: 'python', code: CODE_JOINTURE },
    {
      type: 'list',
      items: [
        '`dict(l1)` crée une **copie** du dictionnaire : sans elle, `update` modifierait la table d’origine.',
        '`nouvelle.update(l2)` ajoute (ou remplace) les couples clé-valeur de `l2`.',
        'La double boucle effectue $n_1 \\times n_2$ comparaisons : pour deux tables de 10 000 lignes, cela fait 100 millions de comparaisons !',
      ],
    },
    { type: 'p', text: 'On accélère nettement la jointure en **indexant** la première table par la clé :' },
    { type: 'code', lang: 'python', code: CODE_INDEX },
    {
      type: 'p',
      text: 'Cette version ne fait qu’un parcours de chaque table (environ $n_1 + n_2$ opérations), car le test d’appartenance `in` sur un dictionnaire est quasi immédiat.',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Descripteurs de même nom',
      content: [
        {
          type: 'p',
          text: 'Si les deux tables ont un autre descripteur de même nom (par exemple `nom` qui désigne un élève dans l’une et une matière dans l’autre), `update` écrase la valeur de la première table. Il faut alors **renommer** une des colonnes avant la jointure.',
        },
      ],
    },

    { type: 'h2', text: '7. Tests de cohérence' },
    {
      type: 'p',
      text: 'Des données réelles sont souvent imparfaites : saisies manuelles, fusion de sources différentes, export défectueux… Avant d’exploiter une table, on vérifie sa **cohérence**.',
    },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Doublons', text: 'Une même clé apparaît sur plusieurs lignes (élève inscrit deux fois).', icon: 'Copy' },
        { title: 'Valeurs manquantes', text: 'Cellule vide : `\'\'` après lecture du CSV.', icon: 'CircleSlash' },
        { title: 'Type ou format', text: '`\'14,5\'` au lieu de `\'14.5\'`, date `\'31/02/2009\'` impossible.', icon: 'AlertTriangle' },
        { title: 'Domaine', text: 'Note de 25 sur 20, âge négatif, classe inexistante.', icon: 'Ruler' },
        { title: 'Clé orpheline', text: 'Une note référence un `id` d’élève qui n’existe pas.', icon: 'Unlink' },
        { title: 'Homogénéité', text: '`\'1G2\'`, `\'1g2\'` et `\'1 G2\'` désignent la même classe.', icon: 'Shuffle' },
      ],
    },
    { type: 'code', lang: 'python', code: CODE_COHERENCE },
    {
      type: 'p',
      text: 'Le bloc `try … except ValueError` intercepte l’erreur levée par `float(\'abc\')` ou `float(\'14,5\')` : la fonction renvoie alors `False` au lieu de faire planter le programme.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Les assertions',
      content: [
        {
          type: 'p',
          text: '`assert condition, \'message\'` interrompt le programme avec une `AssertionError` si la condition est fausse. C’est un moyen simple de vérifier une hypothèse : `assert doublons(eleves, \'id\') == [], \'identifiants non uniques\'`.',
        },
      ],
    },

    { type: 'h2', text: '8. Exporter une table' },
    { type: 'p', text: 'Après traitement, on sauvegarde souvent le résultat dans un nouveau fichier CSV avec `csv.DictWriter` :' },
    { type: 'code', lang: 'python', code: CODE_ECRITURE },
    {
      type: 'list',
      items: [
        '`fieldnames` fixe la liste et l’**ordre** des colonnes écrites.',
        'Si un dictionnaire contient une clé absente de `fieldnames`, `DictWriter` lève une `ValueError` ; on peut l’éviter avec le paramètre `extrasaction=\'ignore\'`.',
        'Le mode `\'w\'` **écrase** le fichier s’il existe ; le mode `\'a\'` ajoute à la fin.',
      ],
    },

    { type: 'h2', text: '9. Méthode générale' },
    {
      type: 'steps',
      items: [
        { title: 'Observer le fichier', text: 'Ouvrir le CSV dans un éditeur : séparateur, en-tête, encodage, format des nombres et des dates.' },
        { title: 'Importer', text: '`list(csv.DictReader(f, delimiter=…))` → liste de dictionnaires.' },
        { title: 'Nettoyer et vérifier', text: 'Convertir les types, détecter doublons, valeurs manquantes et valeurs hors domaine.' },
        { title: 'Interroger', text: 'Sélections, projections, tris, agrégats (somme, moyenne, maximum, comptage).' },
        { title: 'Combiner', text: 'Concaténation ou jointure avec une autre table, puis nouvelle vérification de cohérence.' },
        { title: 'Exporter / présenter', text: 'Écrire le résultat dans un CSV, ou l’afficher sous forme lisible.' },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Pour aller plus loin',
      content: [
        {
          type: 'p',
          text: 'En Terminale, les **bases de données relationnelles** et le langage **SQL** généralisent ces opérations : `SELECT … FROM … WHERE …` (sélection et projection), `ORDER BY` (tri), `JOIN` (jointure). Le modèle relationnel a été proposé par Edgar F. Codd en 1970.',
        },
      ],
    },
  ],

  // =========================================================================
  // EXERCICES
  // =========================================================================
  exercices: [
    {
      id: 'lire-csv',
      title: 'Lire un fichier CSV',
      difficulty: 1,
      duration: 10,
      tags: ['CSV', 'vocabulaire'],
      statement: [
        { type: 'p', text: 'On considère le fichier `films.csv` suivant :' },
        {
          type: 'code',
          lang: 'text',
          code: `titre;annee;duree;genre
Le Fabuleux Destin d'Amélie Poulain;2001;122;comédie
Intouchables;2011;112;comédie
La Haine;1995;98;drame
Le Grand Bleu;1988;168;drame`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quel est le séparateur ? Quels sont les descripteurs ? Combien la table compte-t-elle d’enregistrements ?',
            'Écrire les instructions qui chargent ce fichier dans une variable `films` (liste de dictionnaires).',
            'Que vaut `films[2]` ? Que vaut `films[1][\'duree\']` et quel est son type ?',
            'Que renvoie `films[0][\'duree\'] > films[3][\'duree\']` ? Pourquoi ce résultat est-il trompeur ?',
          ],
        },
      ],
      hints: [
        'Le séparateur est le caractère qui revient entre les valeurs.',
        'DictReader ne convertit rien : toutes les valeurs sont des chaînes.',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Le séparateur est le **point-virgule** `;`. Les descripteurs (ligne d’en-tête) sont `titre`, `annee`, `duree`, `genre`. Il y a **4 enregistrements** (l’en-tête ne compte pas).',
            'Voir le code ci-dessous : il faut préciser `delimiter=\';\'`.',
            '`films[2]` est le **troisième** enregistrement (les indices commencent à 0) : `{\'titre\': \'La Haine\', \'annee\': \'1995\', \'duree\': \'98\', \'genre\': \'drame\'}`. `films[1][\'duree\']` vaut `\'112\'`, de type `str`.',
            'On compare les chaînes `\'122\'` et `\'168\'` : comparaison caractère par caractère, `\'1\'` = `\'1\'`, puis `\'2\'` < `\'6\'`, donc le résultat est `False`. Ici c’est par chance le même résultat qu’avec des nombres, mais comparer `\'98\'` et `\'112\'` donnerait `\'98\' > \'112\'` vrai, alors que 98 < 112. Il faut convertir avec `int()`.',
          ],
        },
        {
          type: 'code',
          lang: 'python',
          code: `import csv
with open('films.csv', newline='', encoding='utf-8') as f:
    films = list(csv.DictReader(f, delimiter=';'))`,
        },
      ],
    },
    {
      id: 'criteres-logiques',
      title: 'Traduire des critères de recherche',
      difficulty: 1,
      duration: 15,
      tags: ['sélection', 'logique'],
      statement: [
        {
          type: 'p',
          text: 'On reprend la table `eleves` du cours (types déjà convertis : `id` entier, `moyenne` flottant) :',
        },
        {
          type: 'table',
          headers: ['id', 'prenom', 'nom', 'classe', 'naissance', 'moyenne'],
          rows: [
            ['1', 'Inès', 'Martin', '1G2', '2009-03-14', '14.5'],
            ['2', 'Hugo', 'Bernard', '1G1', '2008-11-02', '11.25'],
            ['3', 'Léa', 'Petit', '1G2', '2009-07-30', '16'],
            ['4', 'Noah', 'Durand', '1G3', '2009-01-19', '9.75'],
            ['5', 'Chloé', 'Leroy', '1G1', '2009-05-08', '13'],
            ['6', 'Adam', 'Moreau', '1G3', '2008-12-25', '15.5'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire une compréhension de liste donnant les prénoms des élèves de 1G3 ayant une moyenne supérieure ou égale à 10.',
            'Même question pour les noms des élèves nés en 2009 qui ne sont pas en 1G2.',
            'Que renvoie `[e[\'prenom\'] for e in eleves if e[\'classe\'] == \'1G1\' or e[\'classe\'] == \'1G2\' and e[\'moyenne\'] > 15]` ? Expliquer.',
          ],
        },
      ],
      hints: [
        'Pour l’année de naissance, on peut prendre les 4 premiers caractères : `e[\'naissance\'][:4]`.',
        '`and` est prioritaire sur `or`.',
      ],
      solution: [
        { type: 'p', text: '**1.**' },
        { type: 'code', lang: 'python', code: `[e['prenom'] for e in eleves if e['classe'] == '1G3' and e['moyenne'] >= 10]
# ['Adam']   (Noah a 9.75)` },
        { type: 'p', text: '**2.**' },
        { type: 'code', lang: 'python', code: `[e['nom'] for e in eleves if e['naissance'][:4] == '2009' and e['classe'] != '1G2']
# ['Durand', 'Leroy']` },
        {
          type: 'p',
          text: 'Les élèves nés en 2009 sont Inès, Léa, Noah et Chloé ; on retire Inès et Léa (1G2). Il reste Noah Durand et Chloé Leroy.',
        },
        {
          type: 'p',
          text: '**3.** `and` étant prioritaire, la condition se lit `classe == \'1G1\' or (classe == \'1G2\' and moyenne > 15)`. On obtient tous les élèves de 1G1 (Hugo, Chloé) et les élèves de 1G2 ayant plus de 15 (Léa) : `[\'Hugo\', \'Léa\', \'Chloé\']` (dans l’ordre de la table). Si l’on voulait « les élèves de 1G1 ou 1G2 ayant plus de 15 », il fallait écrire `(… or …) and e[\'moyenne\'] > 15`, ce qui donne `[\'Léa\']`.',
        },
      ],
    },
    {
      id: 'fonctions-recherche',
      title: 'Fonctions de recherche',
      difficulty: 1,
      duration: 15,
      tags: ['recherche', 'fonctions'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire une fonction `rechercher(table, descripteur, valeur)` qui renvoie la liste des lignes de `table` dont la valeur pour `descripteur` est égale à `valeur`.',
            'Écrire une fonction `compter(table, descripteur, valeur)` qui renvoie le nombre de ces lignes, **sans** construire de liste.',
            'Écrire une fonction `valeurs_distinctes(table, descripteur)` qui renvoie la liste (sans répétition) des valeurs prises par ce descripteur, dans l’ordre de première apparition.',
            'Tester sur la table `eleves` : `rechercher(eleves, \'classe\', \'1G3\')`, `compter(eleves, \'classe\', \'1G1\')`, `valeurs_distinctes(eleves, \'classe\')`.',
          ],
        },
      ],
      hints: ['Un compteur initialisé à 0 et incrémenté dans la boucle.', 'Tester `if v not in resultat` avant d’ajouter.'],
      solution: [
        {
          type: 'code',
          lang: 'python',
          code: `def rechercher(table, descripteur, valeur):
    resultat = []
    for ligne in table:
        if ligne[descripteur] == valeur:
            resultat.append(ligne)
    return resultat

def compter(table, descripteur, valeur):
    n = 0
    for ligne in table:
        if ligne[descripteur] == valeur:
            n = n + 1
    return n

def valeurs_distinctes(table, descripteur):
    resultat = []
    for ligne in table:
        v = ligne[descripteur]
        if v not in resultat:
            resultat.append(v)
    return resultat

[e['prenom'] for e in rechercher(eleves, 'classe', '1G3')]   # ['Noah', 'Adam']
compter(eleves, 'classe', '1G1')                            # 2
valeurs_distinctes(eleves, 'classe')                        # ['1G2', '1G1', '1G3']`,
        },
        {
          type: 'p',
          text: 'Chaque fonction effectue **un parcours** de la table. Remarque : `rechercher` renvoie une liste vide `[]` si aucune ligne ne convient, ce qui est plus pratique qu’une erreur.',
        },
      ],
    },
    {
      id: 'moyennes-par-classe',
      title: 'Conversion de types et agrégats par groupe',
      difficulty: 2,
      duration: 20,
      tags: ['types', 'dictionnaire', 'agrégat'],
      statement: [
        { type: 'p', text: 'La table `eleves` vient d’être chargée avec `csv.DictReader` : toutes les valeurs sont des chaînes.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Expliquer pourquoi `sum(e[\'moyenne\'] for e in eleves)` provoque une erreur. Laquelle ?',
            'Écrire une procédure `convertir(table)` qui convertit `id` en entier et `moyenne` en flottant.',
            'Écrire une fonction `moyennes_par_classe(table)` qui renvoie un dictionnaire associant à chaque classe la moyenne des moyennes de ses élèves.',
            'Donner le résultat sur la table du cours.',
          ],
        },
      ],
      hints: [
        'Utiliser deux dictionnaires : un pour les sommes, un pour les effectifs.',
        'Avant d’ajouter, vérifier si la classe est déjà une clé du dictionnaire.',
      ],
      solution: [
        {
          type: 'p',
          text: '**1.** `sum` part de l’entier `0` et lui ajoute des chaînes : `0 + \'14.5\'` provoque une `TypeError` (*unsupported operand type(s) for +: \'int\' and \'str\'*).',
        },
        {
          type: 'code',
          lang: 'python',
          code: `def convertir(table):
    for ligne in table:
        ligne['id'] = int(ligne['id'])
        ligne['moyenne'] = float(ligne['moyenne'])

def moyennes_par_classe(table):
    sommes = {}
    effectifs = {}
    for ligne in table:
        c = ligne['classe']
        if c not in sommes:
            sommes[c] = 0
            effectifs[c] = 0
        sommes[c] = sommes[c] + ligne['moyenne']
        effectifs[c] = effectifs[c] + 1
    return {c: sommes[c] / effectifs[c] for c in sommes}`,
        },
        {
          type: 'p',
          text: '**4.** 1G2 : (14,5 + 16) / 2 = 15,25 ; 1G1 : (11,25 + 13) / 2 = 12,125 ; 1G3 : (9,75 + 15,5) / 2 = 12,625. Résultat : `{\'1G2\': 15.25, \'1G1\': 12.125, \'1G3\': 12.625}` (les clés apparaissent dans l’ordre de première rencontre).',
        },
        {
          type: 'p',
          text: '`convertir` est une **procédure** : elle ne renvoie rien (`None`) mais **modifie** la table, car les dictionnaires sont des objets mutables partagés.',
        },
      ],
    },
    {
      id: 'tris-table',
      title: 'Tris selon une ou plusieurs colonnes',
      difficulty: 2,
      duration: 20,
      tags: ['tri', 'sorted', 'stabilité'],
      statement: [
        { type: 'p', text: 'On travaille sur la table `eleves` du cours (types convertis).' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire une instruction qui affiche les prénoms des élèves du plus jeune au plus âgé.',
            'Un élève écrit `classement = eleves.sort(key=lambda e: e[\'moyenne\'])` puis `print(classement[0])`. Que se passe-t-il ?',
            'Écrire une instruction qui renvoie le podium (les 3 meilleures moyennes) sous la forme `[(prénom, moyenne), …]`.',
            'Trier la table par classe (ordre croissant) puis, au sein d’une même classe, par nom (ordre alphabétique), de deux façons différentes.',
          ],
        },
      ],
      hints: [
        'Le plus jeune est né le plus tard : ordre décroissant des dates.',
        'Que renvoie la méthode `sort` ?',
        'Le découpage `[:3]` donne les 3 premiers éléments d’une liste.',
      ],
      solution: [
        { type: 'p', text: '**1.** Les dates au format AAAA-MM-JJ se comparent correctement comme des chaînes ; le plus jeune a la date la plus grande :' },
        {
          type: 'code',
          lang: 'python',
          code: `print([e['prenom'] for e in sorted(eleves, key=lambda e: e['naissance'], reverse=True)])
# ['Léa', 'Chloé', 'Inès', 'Noah', 'Adam', 'Hugo']`,
        },
        {
          type: 'p',
          text: '**2.** `eleves.sort(...)` trie `eleves` **en place** et renvoie `None`. Donc `classement` vaut `None` et `classement[0]` provoque une `TypeError: \'NoneType\' object is not subscriptable`. Il fallait écrire `classement = sorted(eleves, key=…)`.',
        },
        { type: 'p', text: '**3.**' },
        {
          type: 'code',
          lang: 'python',
          code: `podium = [(e['prenom'], e['moyenne'])
          for e in sorted(eleves, key=lambda e: e['moyenne'], reverse=True)[:3]]
# [('Léa', 16.0), ('Adam', 15.5), ('Inès', 14.5)]`,
        },
        { type: 'p', text: '**4.** Méthode des tris successifs (tri stable : critère secondaire d’abord) ou clé tuple :' },
        {
          type: 'code',
          lang: 'python',
          code: `# Méthode 1
t = sorted(eleves, key=lambda e: e['nom'])
t = sorted(t, key=lambda e: e['classe'])
# Méthode 2
t = sorted(eleves, key=lambda e: (e['classe'], e['nom']))
print([(e['classe'], e['nom']) for e in t])
# [('1G1', 'Bernard'), ('1G1', 'Leroy'), ('1G2', 'Martin'),
#  ('1G2', 'Petit'), ('1G3', 'Durand'), ('1G3', 'Moreau')]`,
        },
      ],
    },
    {
      id: 'coherence',
      title: 'Nettoyer une table incohérente',
      difficulty: 2,
      duration: 25,
      tags: ['cohérence', 'doublons', 'valeurs manquantes'],
      statement: [
        { type: 'p', text: 'Un professeur a saisi les notes d’un devoir dans `devoir.csv`, chargé tel quel (valeurs en chaînes) :' },
        {
          type: 'code',
          lang: 'python',
          code: `devoir = [{'id': '12', 'nom': 'Garnier', 'note': '15'},
          {'id': '07', 'nom': 'Roux',    'note': ''},
          {'id': '31', 'nom': 'Faure',   'note': '14,5'},
          {'id': '12', 'nom': 'Garnier', 'note': '15'},
          {'id': '25', 'nom': 'Blanc',   'note': '23'},
          {'id': '18', 'nom': 'Henry',   'note': '8.5'}]`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Repérer à la main toutes les incohérences de cette table.',
            'Écrire une fonction `doublons(table, cle)` qui renvoie la liste des valeurs de `cle` apparaissant au moins deux fois.',
            'Écrire une fonction `note_valide(texte)` qui renvoie `True` si `texte` représente un nombre compris entre 0 et 20, `False` sinon (y compris pour une chaîne vide).',
            'En déduire la liste des noms dont la note est invalide.',
          ],
        },
      ],
      hints: [
        'Il y a 4 problèmes de nature différente.',
        '`float(\'14,5\')` et `float(\'\')` lèvent une `ValueError`.',
        'Utiliser `try … except ValueError`.',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Incohérences : **doublon** (l’élève 12 Garnier apparaît deux fois) ; **valeur manquante** (note de Roux vide) ; **format** (`\'14,5\'` utilise une virgule décimale, non reconnue par `float`) ; **hors domaine** (note de 23 > 20). On peut aussi signaler que l’`id` `\'07\'` a un zéro initial : s’il est converti en entier ce sera 7, attention aux comparaisons avec d’autres tables.',
          ],
        },
        {
          type: 'code',
          lang: 'python',
          code: `def doublons(table, cle):
    vus = []
    repetes = []
    for ligne in table:
        v = ligne[cle]
        if v in vus and v not in repetes:
            repetes.append(v)
        vus.append(v)
    return repetes

def note_valide(texte):
    try:
        x = float(texte)
    except ValueError:
        return False
    return 0 <= x <= 20

doublons(devoir, 'id')                                     # ['12']
[l['nom'] for l in devoir if not note_valide(l['note'])]    # ['Roux', 'Faure', 'Blanc']`,
        },
        {
          type: 'p',
          text: 'On pourrait corriger automatiquement le format avec `texte.replace(\',\', \'.\')` avant la conversion, mais une note vide ou de 23 ne peut être corrigée que par l’humain qui a saisi les données : un programme de vérification doit **signaler** les problèmes, pas inventer des valeurs.',
        },
      ],
    },
    {
      id: 'jointure-notes',
      title: 'Concaténation et jointure',
      difficulty: 2,
      duration: 25,
      tags: ['fusion', 'jointure', 'concaténation'],
      statement: [
        { type: 'p', text: 'On dispose de deux tables (types déjà convertis) :' },
        {
          type: 'code',
          lang: 'python',
          code: `eleves = [{'id': 1, 'prenom': 'Inès'}, {'id': 2, 'prenom': 'Hugo'},
          {'id': 3, 'prenom': 'Léa'}]
notes = [{'id': 1, 'matiere': 'NSI', 'note': 17},
         {'id': 3, 'matiere': 'NSI', 'note': 12},
         {'id': 1, 'matiere': 'Maths', 'note': 13},
         {'id': 9, 'matiere': 'NSI', 'note': 8}]`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Peut-on concaténer `eleves` et `notes` ? Justifier.',
            'Écrire une fonction `jointure(t1, t2, cle)` (double boucle) et donner le résultat de `jointure(eleves, notes, \'id\')`.',
            'Combien de comparaisons `l1[cle] == l2[cle]` sont effectuées ? Et pour deux tables de 2 000 et 50 000 lignes ?',
            'Quelle ligne de `notes` n’apparaît pas dans le résultat ? Écrire une instruction qui détecte ces lignes « orphelines ».',
          ],
        },
      ],
      hints: [
        'La concaténation exige les mêmes descripteurs.',
        'Chaque ligne de t1 est comparée à chaque ligne de t2.',
        'Construire d’abord l’ensemble des `id` de la table `eleves`.',
      ],
      solution: [
        {
          type: 'p',
          text: '**1.** Non : les deux tables n’ont pas les mêmes descripteurs (`id, prenom` d’un côté, `id, matiere, note` de l’autre). La concaténation produirait une liste de lignes hétérogènes, qui n’est plus une table. Il faut une **jointure**.',
        },
        {
          type: 'code',
          lang: 'python',
          code: `def jointure(t1, t2, cle):
    resultat = []
    for l1 in t1:
        for l2 in t2:
            if l1[cle] == l2[cle]:
                nouvelle = dict(l1)
                nouvelle.update(l2)
                resultat.append(nouvelle)
    return resultat

jointure(eleves, notes, 'id')
# [{'id': 1, 'prenom': 'Inès', 'matiere': 'NSI', 'note': 17},
#  {'id': 1, 'prenom': 'Inès', 'matiere': 'Maths', 'note': 13},
#  {'id': 3, 'prenom': 'Léa', 'matiere': 'NSI', 'note': 12}]`,
        },
        {
          type: 'p',
          text: 'L’ordre du résultat suit la boucle externe (`eleves`) : les deux notes d’Inès d’abord, puis celle de Léa. Hugo (id 2) n’a pas de note : il n’apparaît pas.',
        },
        {
          type: 'p',
          text: '**3.** $3 \\times 4 = 12$ comparaisons. Pour 2 000 et 50 000 lignes : $2\\,000 \\times 50\\,000 = 100\\,000\\,000$ comparaisons, d’où l’intérêt d’indexer une des tables par un dictionnaire.',
        },
        { type: 'p', text: '**4.** La note `{\'id\': 9, …}` ne correspond à aucun élève.' },
        {
          type: 'code',
          lang: 'python',
          code: `ids_eleves = {e['id'] for e in eleves}            # ensemble {1, 2, 3}
orphelines = [n for n in notes if n['id'] not in ids_eleves]
# [{'id': 9, 'matiere': 'NSI', 'note': 8}]`,
        },
      ],
    },
    {
      id: 'export-csv',
      title: 'Produire un fichier de résultats',
      difficulty: 2,
      duration: 20,
      tags: ['écriture', 'DictWriter'],
      statement: [
        {
          type: 'p',
          text: 'À partir de la table `eleves` du cours (types convertis), on veut créer un fichier `admis.csv` contenant, **avec le séparateur `;`**, uniquement les colonnes `nom`, `prenom`, `moyenne` des élèves ayant au moins 12 de moyenne, triés par moyenne décroissante.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Construire la liste `admis` des dictionnaires à écrire.',
            'Écrire le fichier avec `csv.DictWriter`.',
            'Donner le contenu exact du fichier obtenu.',
            'Que se passerait-il si l’on passait directement les lignes complètes de `eleves` à `writerows` ?',
          ],
        },
      ],
      hints: ['Sélection, projection, tri : dans quel ordre ?', '`csv.DictWriter(f, fieldnames=[…], delimiter=\';\')`'],
      solution: [
        {
          type: 'code',
          lang: 'python',
          code: `import csv

selection = [e for e in eleves if e['moyenne'] >= 12]
selection = sorted(selection, key=lambda e: e['moyenne'], reverse=True)
admis = [{'nom': e['nom'], 'prenom': e['prenom'], 'moyenne': e['moyenne']}
         for e in selection]

with open('admis.csv', 'w', newline='', encoding='utf-8') as f:
    ecrivain = csv.DictWriter(f, fieldnames=['nom', 'prenom', 'moyenne'], delimiter=';')
    ecrivain.writeheader()
    ecrivain.writerows(admis)`,
        },
        { type: 'p', text: '**3.** Hugo (11,25) et Noah (9,75) sont exclus. Contenu du fichier :' },
        {
          type: 'code',
          lang: 'text',
          code: `nom;prenom;moyenne
Petit;Léa;16.0
Moreau;Adam;15.5
Martin;Inès;14.5
Leroy;Chloé;13.0`,
        },
        {
          type: 'p',
          text: 'Les flottants sont écrits avec `str()` : `16.0` et `13.0` (et non `16` et `13` comme dans le fichier d’origine), puisque les valeurs ont été converties en `float`.',
        },
        {
          type: 'p',
          text: '**4.** Les dictionnaires complets contiennent les clés `id`, `classe`, `naissance` qui ne figurent pas dans `fieldnames` : `DictWriter` lève une `ValueError` (*dict contains fields not in fieldnames*). On peut l’éviter avec `extrasaction=\'ignore\'`, ce qui dispense de la projection.',
        },
      ],
    },
    {
      id: 'bac-bibliotheque',
      title: 'Type bac — Gestion d’une bibliothèque',
      difficulty: 3,
      duration: 45,
      tags: ['type bac', 'synthèse', 'jointure', 'tri'],
      statement: [
        {
          type: 'p',
          text: 'Le CDI du lycée gère ses livres et ses emprunts dans deux fichiers CSV, chargés (types convertis) dans deux listes de dictionnaires :',
        },
        {
          type: 'code',
          lang: 'python',
          code: `livres = [
    {'id': 'L1', 'titre': 'Les Misérables', 'auteur': 'Hugo', 'annee': 1862},
    {'id': 'L2', 'titre': 'Germinal', 'auteur': 'Zola', 'annee': 1885},
    {'id': 'L3', 'titre': "L'Étranger", 'auteur': 'Camus', 'annee': 1942},
    {'id': 'L4', 'titre': 'Notre-Dame de Paris', 'auteur': 'Hugo', 'annee': 1831},
    {'id': 'L5', 'titre': 'La Peste', 'auteur': 'Camus', 'annee': 1947},
]
emprunts = [
    {'id': 'L3', 'lecteur': 'Sami', 'retour': '2026-11-02'},
    {'id': 'L1', 'lecteur': 'Jade', 'retour': '2026-10-25'},
    {'id': 'L7', 'lecteur': 'Tom',  'retour': '2026-10-30'},
    {'id': 'L5', 'lecteur': 'Jade', 'retour': '2026-11-10'},
]`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quel descripteur joue le rôle de clé dans `livres` ? Quel lien existe entre les deux tables ?',
            'Écrire une expression donnant les titres des livres de Hugo parus avant 1900.',
            'Écrire une expression donnant les titres de tous les livres, du plus ancien au plus récent.',
            'Écrire une fonction `verifier(livres, emprunts)` qui renvoie la liste des `id` d’emprunts ne correspondant à aucun livre. Que renvoie-t-elle ici ?',
            'Écrire une fonction `emprunts_detailles(livres, emprunts)` qui renvoie une table de dictionnaires `{\'titre\', \'lecteur\', \'retour\'}` pour chaque emprunt valide, en utilisant un dictionnaire d’index. Quel est son intérêt par rapport à une double boucle ?',
            'En déduire le prochain livre à rendre (date de retour la plus proche) et la liste des titres disponibles (non empruntés).',
          ],
        },
      ],
      hints: [
        'Une clé identifie une ligne de façon unique.',
        'Construire `index = {l[\'id\']: l for l in livres}`.',
        'Les dates au format AAAA-MM-JJ se comparent comme des chaînes.',
      ],
      solution: [
        {
          type: 'p',
          text: '**1.** La clé est `id` : chaque livre a un identifiant unique. Le descripteur `id` de `emprunts` fait **référence** à la clé de `livres` : c’est le descripteur commun qui permet la jointure.',
        },
        {
          type: 'code',
          lang: 'python',
          code: `# 2.
[l['titre'] for l in livres if l['auteur'] == 'Hugo' and l['annee'] < 1900]
# ['Les Misérables', 'Notre-Dame de Paris']

# 3.
[l['titre'] for l in sorted(livres, key=lambda l: l['annee'])]
# ['Notre-Dame de Paris', 'Les Misérables', 'Germinal', "L'Étranger", 'La Peste']

# 4.
def verifier(livres, emprunts):
    ids = [l['id'] for l in livres]
    return [e['id'] for e in emprunts if e['id'] not in ids]

verifier(livres, emprunts)     # ['L7']

# 5.
def emprunts_detailles(livres, emprunts):
    index = {l['id']: l for l in livres}
    resultat = []
    for e in emprunts:
        if e['id'] in index:
            resultat.append({'titre': index[e['id']]['titre'],
                             'lecteur': e['lecteur'],
                             'retour': e['retour']})
    return resultat`,
        },
        {
          type: 'p',
          text: 'Résultat de `emprunts_detailles` : `[{\'titre\': "L\'Étranger", \'lecteur\': \'Sami\', \'retour\': \'2026-11-02\'}, {\'titre\': \'Les Misérables\', \'lecteur\': \'Jade\', \'retour\': \'2026-10-25\'}, {\'titre\': \'La Peste\', \'lecteur\': \'Jade\', \'retour\': \'2026-11-10\'}]`. L’emprunt de `L7` est ignoré (incohérence détectée à la question 4). Avec l’index, chaque emprunt est traité en un accès direct : environ $n + m$ opérations, au lieu de $n \\times m$ comparaisons avec une double boucle.',
        },
        {
          type: 'code',
          lang: 'python',
          code: `# 6.
detail = emprunts_detailles(livres, emprunts)
prochain = min(detail, key=lambda d: d['retour'])
print(prochain['titre'])       # 'Les Misérables' (retour le 2026-10-25)

empruntes = [e['id'] for e in emprunts]
disponibles = [l['titre'] for l in livres if l['id'] not in empruntes]
# ['Germinal', 'Notre-Dame de Paris']`,
        },
        {
          type: 'p',
          text: 'Remarque : `min(…, key=…)` évite de trier toute la table pour n’en garder que le premier élément ; `sorted(detail, key=lambda d: d[\'retour\'])[0]` donnerait le même résultat.',
        },
      ],
    },
  ],

  // =========================================================================
  // REPRÉSENTATIONS
  // =========================================================================
  representations: [
    { type: 'svg', svg: SVG_TABLE, caption: 'Anatomie d’une table.' },
    { type: 'svg', svg: SVG_JOINTURE, caption: 'Principe de la jointure sur une clé commune.' },
    {
      type: 'widget',
      id: 'sort-visualizer',
      title: 'Trier une colonne pas à pas',
      caption: 'Les algorithmes de tri s’appliquent à une colonne d’une table : on compare les valeurs de cette colonne et on déplace les lignes entières.',
      props: { algorithm: 'insertion' },
    },
    {
      type: 'widget',
      id: 'python-tracer',
      title: 'Recherche du maximum',
      caption: 'Même principe que `max(table, key=lambda l: l[\'moyenne\'])` : un parcours complet en gardant le meilleur élément rencontré.',
      props: { program: 'max' },
    },
    {
      type: 'widget',
      id: 'binary-search',
      title: 'Pourquoi trier une table ?',
      caption: 'Dans une colonne triée, la recherche dichotomique est bien plus rapide que la recherche séquentielle.',
      props: { size: 64 },
    },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Que contient la variable `t` après `t = list(csv.DictReader(f))` ?',
          choices: ['Une liste de listes de chaînes', 'Une liste de dictionnaires dont les valeurs sont des chaînes', 'Une liste de dictionnaires dont les valeurs sont typées automatiquement', 'Un dictionnaire de listes'],
          answer: 1,
          explanation: 'DictReader produit un dictionnaire par ligne, les clés venant de l’en-tête ; aucune conversion de type n’est faite.',
        },
        {
          question: 'Que vaut `\'9\' < \'10\'` en Python ?',
          choices: ['`True`', '`False`', 'Une erreur', '`None`'],
          answer: 1,
          explanation: 'Comparaison lexicographique : on compare d’abord `\'9\'` et `\'1\'` ; `\'9\'` est après `\'1\'`, donc `\'9\' < \'10\'` est faux.',
        },
        {
          question: 'Quelle instruction trie la table `t` par prix décroissant sans modifier `t` ?',
          choices: ['`t.sort(key=lambda l: l[\'prix\'])`', '`sorted(t, key=lambda l: l[\'prix\'], reverse=True)`', '`sorted(t[\'prix\'], reverse=True)`', '`t.sort(reverse=True)`'],
          answer: 1,
          explanation: '`sorted` renvoie une nouvelle liste ; `reverse=True` donne l’ordre décroissant.',
        },
        {
          question: 'Pour trier selon la classe puis, à classe égale, selon le nom, avec deux tris successifs, on trie :',
          choices: ['d’abord par classe, puis par nom', 'd’abord par nom, puis par classe', 'peu importe l’ordre', 'c’est impossible avec deux tris'],
          answer: 1,
          explanation: 'Le tri est stable : le dernier tri (classe) devient le critère principal, l’ordre par nom est conservé à classe égale.',
        },
        {
          question: 'Une jointure de deux tables de 100 et 1 000 lignes par double boucle effectue :',
          choices: ['1 100 comparaisons', '100 000 comparaisons', '1 000 comparaisons', '10 comparaisons'],
          answer: 1,
          explanation: 'Chaque ligne de la première table est comparée à chaque ligne de la seconde : $100 \\times 1\\,000$.',
        },
        {
          question: 'On peut concaténer deux tables si et seulement si :',
          choices: ['elles ont le même nombre de lignes', 'elles ont les mêmes descripteurs', 'elles ont une clé commune', 'elles sont triées'],
          answer: 1,
        },
        {
          question: 'Que vaut `[e[\'nom\'] for e in t if e[\'age\'] > 17]` si `t = [{\'nom\': \'A\', \'age\': 18}, {\'nom\': \'B\', \'age\': 17}]` ?',
          choices: ['`[\'A\']`', '`[\'A\', \'B\']`', '`[18]`', '`[{\'nom\': \'A\', \'age\': 18}]`'],
          answer: 0,
          explanation: 'Sélection (age > 17 : seul A) puis projection sur `nom`.',
        },
        {
          question: 'Pourquoi indexer une table par un dictionnaire `{l[\'id\']: l for l in t}` ?',
          choices: ['Pour trier la table', 'Pour accéder directement à une ligne à partir de sa clé', 'Pour supprimer les doublons sans perte', 'Pour convertir les types'],
          answer: 1,
          explanation: 'L’accès `index[cle]` est immédiat. Attention : en cas de doublons, seule la dernière ligne est conservée.',
        },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque opération à son code',
      pairs: [
        { left: 'Sélection', right: '`[l for l in t if l[\'ville\'] == \'Lyon\']`' },
        { left: 'Projection', right: '`[l[\'nom\'] for l in t]`' },
        { left: 'Tri', right: '`sorted(t, key=lambda l: l[\'age\'])`' },
        { left: 'Concaténation', right: '`t1 + t2`' },
        { left: 'Indexation', right: '`{l[\'id\']: l for l in t}`' },
        { left: 'Agrégat', right: '`sum(l[\'prix\'] for l in t)`' },
      ],
    },
    {
      type: 'cloze',
      title: 'Importer un CSV',
      text: 'Pour lire un fichier CSV, on importe le module {{csv}}. La fonction {{DictReader|csv.DictReader}} produit un {{dictionnaire}} par ligne, dont les clés sont les {{descripteurs|attributs}} lus dans la ligne d’en-tête. Les valeurs obtenues sont toutes de type {{str|chaîne}} : il faut les convertir avec int ou {{float}} avant de calculer. Si le séparateur est un point-virgule, on précise le paramètre {{delimiter}}.',
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Un fichier CSV est un fichier texte.', answer: true },
        { text: '`t.sort()` renvoie la table triée.', answer: false, explanation: 'Elle trie en place et renvoie `None`.' },
        { text: 'Le tri de Python est stable.', answer: true },
        { text: 'Une jointure conserve toujours toutes les lignes des deux tables.', answer: false, explanation: 'Les lignes sans correspondance dans l’autre table disparaissent.' },
        { text: 'Les dates au format JJ/MM/AAAA se trient correctement comme des chaînes.', answer: false, explanation: 'Seul le format AAAA-MM-JJ a cette propriété.' },
        { text: 'Dans une table, toutes les valeurs d’une même colonne doivent avoir le même type.', answer: true },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Descripteur', back: 'Nom d’une colonne (attribut), lu dans la ligne d’en-tête.' },
        { front: 'Enregistrement', back: 'Une ligne de la table ; en Python, un dictionnaire.' },
        { front: 'CSV', back: '*Comma-Separated Values* : fichier texte, une ligne par enregistrement, valeurs séparées par un séparateur.' },
        { front: 'Lire un CSV en liste de dictionnaires', back: '`list(csv.DictReader(f, delimiter=\';\'))`' },
        { front: 'Type des valeurs lues par DictReader', back: 'Toujours `str` : convertir avec `int()` / `float()`.' },
        { front: 'Trier par une colonne', back: '`sorted(t, key=lambda l: l[\'col\'])` (nouvelle liste)' },
        { front: 'sorted vs sort', back: '`sorted` renvoie une nouvelle liste ; `.sort()` trie en place et renvoie `None`.' },
        { front: 'Tri stable', back: 'Conserve l’ordre relatif des éléments égaux → trier selon le critère secondaire d’abord.' },
        { front: 'Jointure', back: 'Fusion des lignes de deux tables ayant la même valeur pour un descripteur commun.' },
        { front: 'Concaténation', back: 'Mise bout à bout de deux tables de mêmes descripteurs : `t1 + t2`.' },
        { front: 'Clé', back: 'Descripteur dont la valeur identifie chaque ligne de façon unique.' },
        { front: '3 tests de cohérence', back: 'Doublons de clé, valeurs manquantes, valeurs hors domaine / mauvais format.' },
      ],
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre la démarche de traitement',
      items: [
        'Observer le fichier (séparateur, en-tête, encodage)',
        'Importer avec csv.DictReader',
        'Convertir les types',
        'Tester la cohérence (doublons, valeurs manquantes)',
        'Sélectionner, trier, fusionner',
        'Exporter le résultat avec csv.DictWriter',
      ],
    },
  ],
}

export default chapter
