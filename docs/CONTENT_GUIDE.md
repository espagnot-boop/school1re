# Guide de contribution — Première Classe

Site de révision pour TOUTE la classe de Première générale (France, programme en vigueur, bac 2027).
Stack : Vite + React 18 + TypeScript + Tailwind 3 (style shadcn/ui, **coins carrés, radius 0**), KaTeX, lucide-react.
Mode clair ET sombre : n'utilisez jamais de couleurs codées en dur pour le texte/fond, utilisez les classes Tailwind
`bg-background text-foreground bg-card bg-muted text-muted-foreground border` etc., ou `PALETTE` de `@/lib/plot`.

> ⚠️ Plusieurs agents travaillent en parallèle dans ce dépôt. **N'écrivez QUE les fichiers qui vous sont attribués.**
> Ne modifiez pas `src/content/types.ts`, `package.json`, ni les fichiers d'autres agents. **Pas de `git commit`, pas de `npm install`.**
> Vérifiez votre travail avec `npx tsc --noEmit -p tsconfig.app.json` (ignorez les erreurs dans des fichiers qui ne sont pas les vôtres).

---

## 1. Agents « contenu » : un fichier par chapitre

Emplacement : `src/content/<subjectId>/<NN>-<slug>.ts` (ex. `src/content/maths/02-second-degre.ts`).
Le chargement est automatique (`import.meta.glob`), rien à enregistrer ailleurs.

```ts
import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'second-degre',
  subject: 'maths',
  order: 2,
  title: 'Second degré',
  theme: 'Algèbre',
  summary: 'Forme canonique, discriminant, racines, signe et factorisation d’un trinôme.',
  duration: '3 semaines',
  objectives: ['Déterminer la forme canonique…', '…'],
  keywords: ['trinôme', 'discriminant'],
  fiche: [ /* Block[] */ ],
  cours: [ /* Block[] */ ],
  exercices: [ /* Exercise[] */ ],
  representations: [ /* Block[] */ ],
}
export default chapter
```

Types exacts : lire `src/content/types.ts` (Block, Exercise, Chapter…).

### Texte riche
Tous les champs `text`, `items`, cellules de `table`, `question`, `choices`, `hints`, `front/back`… acceptent :
`$…$` (LaTeX inline), `$$…$$` (LaTeX display), `**gras**`, `*italique*`, `` `code` ``, `==surligné==`, `\n`.

**Échappement LaTeX** : dans une chaîne TS normale il faut doubler les antislashs : `'$\\frac{1}{2}$'`.
Le plus simple : utilisez `String.raw` → ``String.raw`$\frac{1}{2}$` `` (attention : n'écrivez jamais `${` dans un template literal ;
écrivez `$ {` ou utilisez une chaîne classique). Pour le bloc `math`, `tex` ne contient PAS de `$`.

### Exigences de qualité (IMPORTANT)
- Conforme au **programme officiel de Première** (BO), vocabulaire officiel, notations françaises (virgule décimale, `]a ; b[`).
- **Exactitude absolue** : vérifiez chaque calcul, chaque date, chaque formule. Un élève révise avec ça.
- `fiche` : l'essentiel à retenir, dense, structuré (h2/h3, callouts `definition`/`property`/`remember`, tableaux, formules). ~1–2 écrans.
- `cours` : cours complet et pédagogique : définitions, propriétés, démonstrations (au programme), exemples rédigés, méthodes (`steps`), pièges (`warning`), schémas SVG. C'est la partie la plus longue (typiquement 40–90 blocs).
- `exercices` : **au moins 6** par chapitre (8+ pour les matières scientifiques), difficulté croissante 1→3, dont au moins un « type bac / E3C / contrôle ».
  Corrigés **détaillés** et rédigés comme attendu d'un élève. `hints` = 1–3 indices progressifs.
- `representations` : la partie visuelle/interactive. Au moins 4 blocs parmi : `widget` (voir catalogue §3), `svg` (schéma fait main),
  `qcm` (5–10 questions), `flashcards` (8–20 cartes), `cloze`, `matching`, `ordering`, `truefalse`, `timeline`, `reveal`.
  Utilisez les widgets du catalogue pertinents pour votre chapitre (passez des `props` adaptées).
- Langues (anglais, espagnol, AMC) : le contenu « cours » est dans la langue étudiée, avec les consignes/explications méthodologiques en français si utile.

### SVG faits main (`{ type: 'svg', svg: '<svg …>' }`)
- Toujours un `viewBox`, pas de `width/height` fixes (ou `width="100%"`).
- Couleurs compatibles clair/sombre : `stroke="currentColor"`, `fill="currentColor"`, ou classes CSS `svg-stroke`, `svg-fill`, `svg-muted`,
  `svg-bg`, `svg-card`, `svg-grid`. Pour des couleurs d'accent : `hsl(217 91% 60%)` (bleu), `hsl(0 84% 60%)` (rouge),
  `hsl(142 71% 45%)` (vert), `hsl(25 95% 53%)` (orange), `hsl(263 70% 60%)` (violet) — lisibles dans les deux thèmes.
- `font-family="Geist, sans-serif"`, tailles 11–14. Schémas sobres, angles droits, traits fins : style « blueprint ».

### Icônes pour `grid` items
`icon` = nom d'icône lucide-react en PascalCase (ex. `'Atom'`, `'BookOpen'`, `'Lightbulb'`, `'FlaskConical'`, `'Scale'`, `'Globe2'`).

---

## 2. Agents « widgets » : composants interactifs

Un fichier par widget : `src/widgets/<id>.tsx`, `export default function Xxx(props: Props) { … }`.
Le registre est automatique (lazy import). Les helpers privés vont dans `src/widgets/_<votre-groupe>/…` (dossier commençant par `_`).

À utiliser (déjà fournis, ne pas modifier) :
- `@/components/WidgetFrame` → `<WidgetFrame title subtitle controls footer>` cadre standard (zone visuelle à gauche, contrôles à droite).
- `@/components/ui/slider` (`Slider`), `@/components/ui/button` (`Button`), `@/components/ui/input` (`Input`, `Textarea`, `Label`, `Select`),
  `@/components/ui/tabs` (`Segmented`), `@/components/ui/misc` (`Stat`, `Switch`, `Progress`), `@/components/ui/badge`.
- `@/components/Tex` → `<Tex>{String.raw`\frac{a}{b}`}</Tex>`, `<Tex display>…</Tex>`.
- `@/lib/plot` → `<Plot xMin xMax yMin yMax onPointer>`, `FunctionPath`, `Point`, `Segment`, `Line`, `usePlot`, `PALETTE`, `SERIES`,
  `compile(expr, params)` (parseur d'expressions sûr, gère `2x`, `x^2`, `sin`, `exp`, `ln`, paramètres).
- `@/lib/utils` → `cn`, `fmt(x, digits)` (format français), `clamp`.

Règles :
- Tous les props sont **optionnels** avec des valeurs par défaut sensées (le widget doit marcher avec `props = {}`).
- Responsive (mobile → desktop), SVG en `viewBox` + `w-full`. Aucune dépendance npm nouvelle.
- Clair/sombre via variables CSS (`hsl(var(--foreground))`, etc.) ou `PALETTE`. Coins carrés (pas de `rounded-*`, sauf cercles géométriques).
- Pédagogique : afficher les valeurs calculées (`Stat`), les formules (`Tex`), une phrase d'interprétation.
- Animations via `requestAnimationFrame` avec bouton lecture/pause si besoin ; nettoyer dans `useEffect`.
- Libellés en français.

## 3. Catalogue des widgets (id → props)

### Maths
| id | props (tous optionnels) | rôle |
|---|---|---|
| `function-plotter` | `expressions?: string[]` (ex. `['x^2','2x+1']`), `params?: {name,min,max,step,value}[]`, `xMin,xMax,yMin,yMax`, `editable?: boolean`(def. true), `showDerivative?: boolean` | Traceur de courbes multiples, saisie libre, curseurs de paramètres, tableau de valeurs |
| `second-degre` | `a,b,c` initiaux | Curseurs a,b,c : parabole, Δ, racines, sommet, forme canonique/factorisée, tableau de signe |
| `tangent-explorer` | `expression?: string`, `a?: number` | Sécante → tangente (h → 0), nombre dérivé, équation de la tangente |
| `suite-explorer` | `kind?: 'arithmetique'\|'geometrique'\|'recurrence'`, `u0`, `r`, `q`, `expression?` (pour uₙ₊₁ = f(uₙ)) | Termes, nuage de points, somme des termes, toile d'araignée pour la récurrence |
| `exponential-explorer` | `k?: number` | eˣ, e^{kx}, tangentes, propriétés algébriques, approximation d'Euler |
| `percent-evolution` | `rates?: number[]` | Évolutions successives, coefficient multiplicateur, taux global/réciproque, indices |
| `trig-circle` | `angle?: number` (rad) | Cercle trigonométrique, enroulement de la droite, cos/sin, angles remarquables, courbes sin/cos liées |
| `scalar-product` | `u?: [number,number]`, `v?: [number,number]` | Vecteurs déplaçables, produit scalaire (3 formules), projection, angle, orthogonalité |
| `line-circle-geometry` | `mode?: 'droite'\|'cercle'` | Équations cartésiennes, vecteur directeur/normal, cercle centre-rayon, points déplaçables |
| `probability-tree` | `pA?, pBsachantA?, pBsachantNonA?` | Arbre pondéré, probabilités totales, P_B(A) (inversion), tableau croisé |
| `random-variable` | `values?: number[]`, `probs?: number[]` | Loi de probabilité éditable, E(X), V(X), σ, diagramme en bâtons, simulation |

### Chimie
| `advancement-table` | `reaction?: {reactants:{formula,coef,n0}[], products:{formula,coef,n0}[]}` | Tableau d'avancement, curseur x, réactif limitant, xmax, barres de quantités |
| `beer-lambert` | `epsilon?, l?` | Concentration → absorbance, couleur de la solution, courbe d'étalonnage, détermination d'une concentration inconnue |
| `lewis-molecules` | `molecule?: string` (ex. 'H2O','CO2','NH3','CH4','HCl','O2','N2','C2H4','CH3OH') | Schéma de Lewis, doublets liants/non liants, géométrie (VSEPR), polarité, électronégativités |
| `titration` | `cA?, vA?, cB?` | Titrage (colorimétrique/conductimétrique) : burette, volume versé, équivalence, quantités |
| `organic-families` | — | Familles (alcool, aldéhyde, cétone, acide carboxylique…), groupe caractéristique, nomenclature, bandes IR |

### Physique
| `force-field` | `mode?: 'electrique'\|'gravitation'` | Loi de Coulomb / gravitation universelle, vecteurs force, lignes de champ |
| `fluid-pressure` | `fluid?: 'eau'\|'huile'\|'mercure'` | Pression vs profondeur, P = P₀ + ρgh, loi de Mariotte (PV = cte) |
| `mechanical-energy` | — | Chute/plan incliné/pendule : Ec, Epp, Em, frottements, théorème de l'énergie cinétique |
| `wave-simulator` | `lambda?, T?` | Onde progressive sinusoïdale, période/longueur d'onde/célérité, retard, double périodicité |
| `thin-lens` | `f?: number`, `objectDistance?: number` | Lentille mince convergente, tracé de rayons, relation de conjugaison, grandissement |
| `color-synthesis` | `mode?: 'additive'\|'soustractive'` | Synthèse additive RVB / soustractive CMJ, couleur perçue, filtres |
| `energy-levels` | `atom?: 'hydrogene'\|'mercure'\|'sodium'` | Diagramme de niveaux, transitions, photon émis/absorbé, λ = hc/ΔE, spectre |
| `electric-power` | — | Circuit : U, I, R, P = UI, effet Joule, énergie, rendement d'un convertisseur |
| `newton-motion` | — | Mouvement, vecteurs vitesse/variation de vitesse, ΣF = m·Δv/Δt, chronophotographie |

### SVT
| `dna-transcription` | `dna?: string` | Brin ADN → ARNm → codons → acides aminés (code génétique complet), ribosome |
| `mitosis-stages` | — | Cycle cellulaire, interphase/réplication, prophase→télophase, quantité d'ADN |
| `mutation-simulator` | `sequence?: string` | Substitution/insertion/délétion, effet sur la protéine (silencieuse, faux-sens, non-sens, décalage) |
| `enzyme-kinetics` | — | Vitesse vs [S], température, pH, complexe enzyme-substrat, dénaturation |
| `earth-layers` | — | Coupe du globe (croûtes, manteau, noyau), discontinuités, vitesses des ondes P/S, géotherme, lithosphère/asthénosphère |
| `immune-response` | — | Réponse innée/adaptative, LB/LT, anticorps, réponse primaire vs secondaire (mémoire, vaccination) |
| `food-web` | — | Réseau trophique, retirer une espèce, effets en cascade, services écosystémiques |

### NSI
| `base-converter` | `value?: number`, `bits?: number` | Bits cliquables, binaire/décimal/hexa, complément à deux, opérations |
| `logic-gates` | `expression?: string` | Portes ET/OU/NON/XOR, table de vérité, circuit, expression booléenne |
| `sort-visualizer` | `algorithm?: 'selection'\|'insertion'\|'bulles'` | Tri pas à pas, comparaisons/échanges, invariant, complexité |
| `binary-search` | `size?: number` | Recherche dichotomique vs séquentielle, nombre d'étapes, log₂ n |
| `knn-classifier` | `k?: number` | Points étiquetés, nouveau point, k plus proches voisins, distances |
| `html-playground` | `html?: string`, `css?: string`, `js?: string` | Éditeur HTML/CSS/JS + aperçu iframe (sandbox) |
| `float-ieee754` | `value?: number` | Flottant 32/64 bits : signe/exposant/mantisse, 0.1 + 0.2 ≠ 0.3 |
| `python-tracer` | `program?: 'somme'\|'max'\|'tri_selection'\|'dichotomie'\|'factorielle'` | Exécution pas à pas d'un programme Python prédéfini : ligne courante, variables |

### Lettres / langues
| `verb-conjugator` | `lang?: 'es'\|'en'`, `verb?: string` | Espagnol : présent, passé simple (indefinido), imparfait, futur, conditionnel, subjonctif présent/imparfait, impératif (réguliers + principaux irréguliers) ; Anglais : temps et aspects, verbes irréguliers |
| `syllable-counter` | `verse?: string` | Comptage des syllabes d'un vers (e muet, diérèse/synérèse, élision), césure, rimes |
