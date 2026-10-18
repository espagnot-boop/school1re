import type { Chapter, SubjectId } from './types'
import { SUBJECTS } from './subjects'

const modules = import.meta.glob<{ default: Chapter }>('./*/*.ts', { eager: true })

const all: Chapter[] = Object.entries(modules)
  .map(([path, m]) => {
    const ch = m.default
    if (!ch || !ch.id) console.warn('Chapitre invalide :', path)
    return ch
  })
  .filter(Boolean)

const bySubject = new Map<SubjectId, Chapter[]>()
for (const s of SUBJECTS) bySubject.set(s.id, [])
for (const ch of all) bySubject.get(ch.subject)?.push(ch)
for (const list of bySubject.values()) list.sort((a, b) => a.order - b.order)

export const chaptersOf = (id: SubjectId | string) => bySubject.get(id as SubjectId) ?? []
export const getChapter = (subject: string, chapter: string) => chaptersOf(subject).find((c) => c.id === chapter)
export const allChapters = () => all
