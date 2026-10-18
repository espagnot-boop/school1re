import { useLocalState } from './useLocalState'
import type { SubjectId } from '@/content/types'

export const INVITE_CODE = 'HELLO27'

export interface Profile {
  unlocked: boolean
  name: string
  specialites: SubjectId[] // 3 spécialités en Première
  onboarded: boolean
}

const DEFAULT: Profile = { unlocked: false, name: '', specialites: [], onboarded: false }

export function useProfile() {
  const [profile, setProfile] = useLocalState<Profile>('pc-profile', DEFAULT)
  return {
    profile: { ...DEFAULT, ...profile },
    update: (patch: Partial<Profile>) => setProfile((p) => ({ ...DEFAULT, ...p, ...patch })),
    reset: () => setProfile(DEFAULT),
  }
}

/** Progression : chapitres « vus » / « maîtrisés », exercices réussis */
export interface Progress {
  seen: Record<string, number> // `${subject}/${chapter}` -> timestamp
  mastered: Record<string, boolean>
  exercises: Record<string, boolean> // `${subject}/${chapter}/${exId}`
  favorites: Record<string, boolean>
}

const EMPTY_PROGRESS: Progress = { seen: {}, mastered: {}, exercises: {}, favorites: {} }

export function useProgress() {
  const [progress, setProgress] = useLocalState<Progress>('pc-progress', EMPTY_PROGRESS)
  const p: Progress = { ...EMPTY_PROGRESS, ...progress }
  return {
    progress: p,
    markSeen: (key: string) => setProgress((x) => ({ ...p, ...x, seen: { ...(x.seen ?? {}), [key]: Date.now() } })),
    toggleMastered: (key: string) => setProgress((x) => ({ ...p, ...x, mastered: { ...(x.mastered ?? {}), [key]: !x.mastered?.[key] } })),
    toggleFavorite: (key: string) => setProgress((x) => ({ ...p, ...x, favorites: { ...(x.favorites ?? {}), [key]: !x.favorites?.[key] } })),
    setExercise: (key: string, done: boolean) => setProgress((x) => ({ ...p, ...x, exercises: { ...(x.exercises ?? {}), [key]: done } })),
  }
}
