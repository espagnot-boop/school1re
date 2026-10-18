/**
 * Modèle de contenu de Première Classe.
 * Chaque chapitre est un fichier `src/content/<subjectId>/<NN>-<slug>.ts`
 * qui fait `export default chapter` (type Chapter). Le chargement est automatique.
 *
 * Texte « riche » (champ `text`, items de liste, cellules de tableau, etc.) :
 *   - `$...$` math inline (KaTeX), `$$...$$` math display
 *   - `**gras**`, `*italique*`, `` `code` ``, `==surligné==`
 *   - retour à la ligne avec `\n`
 */

export type CalloutVariant =
  | 'definition'
  | 'theorem'
  | 'property'
  | 'example'
  | 'method'
  | 'warning'
  | 'tip'
  | 'remember'
  | 'history'

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'math'; tex: string } // formule centrée (sans $)
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'callout'; variant: CalloutVariant; title?: string; content: Block[] }
  | { type: 'table'; headers: string[]; rows: string[][]; caption?: string }
  | { type: 'code'; lang: string; code: string; caption?: string }
  | { type: 'svg'; svg: string; caption?: string; maxWidth?: number } // SVG inline complet (<svg ...>...</svg>)
  | { type: 'quote'; text: string; author?: string; source?: string }
  | { type: 'timeline'; events: { date: string; title: string; text?: string }[] }
  | { type: 'keyvalue'; items: { key: string; value: string }[] } // glossaire / définitions courtes
  | { type: 'steps'; items: { title: string; text: string }[] } // méthode en étapes numérotées
  | { type: 'grid'; columns: 2 | 3; items: { title: string; text: string; icon?: string }[] } // cartes
  | { type: 'divider' }
  // ---- Blocs interactifs génériques ----
  | { type: 'qcm'; questions: QcmQuestion[] }
  | { type: 'flashcards'; cards: { front: string; back: string }[] }
  | { type: 'cloze'; title?: string; text: string } // trous : « La {{photosynthèse}} produit du {{dioxygène|O2}} » (| = réponses alternatives acceptées)
  | { type: 'matching'; title?: string; pairs: { left: string; right: string }[] } // associer
  | { type: 'ordering'; title?: string; items: string[] } // items dans le BON ordre ; mélangés à l'affichage
  | { type: 'truefalse'; title?: string; statements: { text: string; answer: boolean; explanation?: string }[] }
  | { type: 'reveal'; title: string; content: Block[] } // bloc dépliable « cliquer pour révéler »
  | { type: 'widget'; id: WidgetId | string; props?: Record<string, unknown>; title?: string; caption?: string }

export interface QcmQuestion {
  question: string
  choices: string[]
  answer: number // index de la bonne réponse
  explanation?: string
}

export interface Exercise {
  id: string
  title: string
  difficulty: 1 | 2 | 3 // 1 = application, 2 = entraînement, 3 = approfondissement / type bac
  duration?: number // minutes estimées
  tags?: string[]
  statement: Block[]
  hints?: string[]
  solution: Block[]
}

export interface Chapter {
  id: string // slug unique dans la matière, ex. "second-degre"
  subject: SubjectId
  order: number // position dans la matière (1, 2, 3…)
  title: string
  theme?: string // partie du programme, ex. "Algèbre", "Thème 1 — L'Europe face aux révolutions"
  summary: string // 1–2 phrases
  duration?: string // ex. "3 semaines"
  objectives: string[] // capacités attendues du programme
  keywords?: string[]
  fiche: Block[] // fiche de révision : l'essentiel, dense, 1–2 écrans
  cours: Block[] // cours complet et détaillé
  exercices: Exercise[] // au moins 6, difficulté croissante, corrigés détaillés
  representations: Block[] // schémas SVG, widgets interactifs, cloze, matching, qcm, flashcards…
}

export type SubjectId =
  | 'francais'
  | 'histoire-geo'
  | 'espagnol'
  | 'anglais'
  | 'maths-tc'
  | 'maths'
  | 'physique-chimie'
  | 'svt'
  | 'nsi'
  | 'amc'

export type WidgetId =
  // Maths
  | 'function-plotter'
  | 'second-degre'
  | 'tangent-explorer'
  | 'suite-explorer'
  | 'exponential-explorer'
  | 'percent-evolution'
  | 'trig-circle'
  | 'scalar-product'
  | 'line-circle-geometry'
  | 'probability-tree'
  | 'random-variable'
  // Chimie
  | 'advancement-table'
  | 'beer-lambert'
  | 'lewis-molecules'
  | 'titration'
  | 'organic-families'
  // Physique
  | 'force-field'
  | 'fluid-pressure'
  | 'mechanical-energy'
  | 'wave-simulator'
  | 'thin-lens'
  | 'color-synthesis'
  | 'energy-levels'
  | 'electric-power'
  | 'newton-motion'
  // SVT
  | 'dna-transcription'
  | 'mitosis-stages'
  | 'mutation-simulator'
  | 'enzyme-kinetics'
  | 'earth-layers'
  | 'immune-response'
  | 'food-web'
  // NSI
  | 'base-converter'
  | 'logic-gates'
  | 'sort-visualizer'
  | 'binary-search'
  | 'knn-classifier'
  | 'html-playground'
  | 'float-ieee754'
  | 'python-tracer'
  // Lettres / langues
  | 'verb-conjugator'
  | 'syllable-counter'
