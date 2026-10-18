import type { SubjectId } from './types'

export interface SubjectMeta {
  id: SubjectId
  name: string
  short: string
  category: 'tronc' | 'specialite'
  /** teinte HSL (0-360) utilisée pour l'accent de la matière */
  hue: number
  icon: string // nom d'icône lucide (voir components/SubjectIcon)
  description: string
  hours: string
}

export const SUBJECTS: SubjectMeta[] = [
  { id: 'francais', name: 'Français', short: 'FR', category: 'tronc', hue: 350, icon: 'BookOpen', hours: '4 h / sem.', description: 'Poésie, littérature d’idées, roman, théâtre, méthodes du bac de français (écrit & oral).' },
  { id: 'histoire-geo', name: 'Histoire-Géographie', short: 'HG', category: 'tronc', hue: 30, icon: 'Landmark', hours: '3 h / sem.', description: 'De la Révolution française à la Grande Guerre ; métropolisation, production, espaces ruraux, Chine.' },
  { id: 'anglais', name: 'Anglais', short: 'EN', category: 'tronc', hue: 210, icon: 'Languages', hours: 'LVA', description: 'Les 8 axes culturels du cycle terminal, grammaire, vocabulaire et méthodologie.' },
  { id: 'espagnol', name: 'Espagnol', short: 'ES', category: 'tronc', hue: 45, icon: 'MessageSquareText', hours: 'LVB', description: 'Ejes culturales, gramática esencial, vocabulario y méthodologie de l’expression.' },
  { id: 'maths-tc', name: 'Maths (tronc commun)', short: 'MA', category: 'tronc', hue: 160, icon: 'Percent', hours: '1 h 30 / sem.', description: 'Enseignement de mathématiques du tronc commun : automatismes, évolutions, fonctions, suites, probabilités.' },
  { id: 'maths', name: 'Mathématiques', short: 'M', category: 'specialite', hue: 221, icon: 'Sigma', hours: '4 h / sem.', description: 'Second degré, suites, dérivation, exponentielle, trigonométrie, produit scalaire, probabilités.' },
  { id: 'physique-chimie', name: 'Physique-Chimie', short: 'PC', category: 'specialite', hue: 262, icon: 'Atom', hours: '4 h / sem.', description: 'Matière et transformations, mouvement et interactions, énergie, ondes et signaux.' },
  { id: 'svt', name: 'SVT', short: 'SV', category: 'specialite', hue: 142, icon: 'Dna', hours: '4 h / sem.', description: 'ADN et expression génétique, enzymes, géologie de la lithosphère, écosystèmes, immunité.' },
  { id: 'nsi', name: 'NSI', short: 'IN', category: 'specialite', hue: 190, icon: 'Cpu', hours: '4 h / sem.', description: 'Représentation des données, Python, algorithmique, Web, architecture et réseaux.' },
  { id: 'amc', name: 'Anglais, monde contemporain', short: 'AM', category: 'specialite', hue: 0, icon: 'Globe2', hours: '4 h / sem.', description: 'LLCER AMC : savoirs & innovation, représentations, faire société — en anglais.' },
]

export const subjectById = (id: string) => SUBJECTS.find((s) => s.id === id)
