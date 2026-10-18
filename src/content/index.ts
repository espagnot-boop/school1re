import { useEffect, useState } from 'react'
import index from 'virtual:chapter-index'
import type { Chapter, SubjectId } from './types'
import { SUBJECTS } from './subjects'
import { withReload } from '@/lib/lazy-import'

/** Métadonnées d'un chapitre, disponibles immédiatement (voir le plugin chapter-index de vite.config.ts). */
export interface ChapterMeta {
  file: string
  id: string
  subject: SubjectId
  order: number
  title: string
  theme?: string
  summary: string
  duration?: string
  keywords: string[]
  nExercices: number
  nRepresentations: number
}

// Contenu complet : un chunk par chapitre, chargé à la demande
const loaders = import.meta.glob<{ default: Chapter }>('./*/*.ts')

const all = (index as ChapterMeta[]).filter((c) => c.id && c.subject)

const bySubject = new Map<SubjectId, ChapterMeta[]>()
for (const s of SUBJECTS) bySubject.set(s.id, [])
for (const ch of all) bySubject.get(ch.subject)?.push(ch)
for (const list of bySubject.values()) list.sort((a, b) => a.order - b.order)

export const chaptersOf = (id: SubjectId | string) => bySubject.get(id as SubjectId) ?? []
export const getChapter = (subject: string, chapter: string) => chaptersOf(subject).find((c) => c.id === chapter)
export const allChapters = () => all

const cache = new Map<string, Chapter>()

export function loadChapter(meta: ChapterMeta): Promise<Chapter> {
  const hit = cache.get(meta.file)
  if (hit) return Promise.resolve(hit)
  return withReload(loaders[meta.file])().then((m) => {
    cache.set(meta.file, m.default)
    return m.default
  })
}

/** Charge le contenu complet d'un chapitre ; `undefined` pendant le chargement. */
export function useChapter(meta: ChapterMeta | undefined) {
  const [state, setState] = useState<{ file?: string; chapter?: Chapter; error?: boolean }>({})
  useEffect(() => {
    if (!meta) return
    let alive = true
    const hit = cache.get(meta.file)
    if (hit) setState({ file: meta.file, chapter: hit })
    else
      loadChapter(meta).then(
        (chapter) => alive && setState({ file: meta.file, chapter }),
        () => alive && setState({ file: meta.file, error: true }),
      )
    return () => {
      alive = false
    }
  }, [meta])
  if (!meta || state.file !== meta.file) return { chapter: meta ? cache.get(meta.file) : undefined, error: false }
  return { chapter: state.chapter, error: !!state.error }
}
