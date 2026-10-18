import { useCallback, useEffect, useState } from 'react'

const listeners = new Map<string, Set<(v: unknown) => void>>()

function read<T>(key: string, initial: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? initial : (JSON.parse(raw) as T)
  } catch {
    return initial
  }
}

/** useState persistant et synchronisé entre composants (localStorage). */
export function useLocalState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => read(key, initial))
  useEffect(() => {
    const set = listeners.get(key) ?? new Set()
    const fn = (v: unknown) => setValue(v as T)
    set.add(fn)
    listeners.set(key, set)
    return () => void set.delete(fn)
  }, [key])
  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = read(key, initial)
      const v = typeof next === 'function' ? (next as (p: T) => T)(prev) : next
      try {
        localStorage.setItem(key, JSON.stringify(v))
      } catch {
        /* stockage indisponible */
      }
      listeners.get(key)?.forEach((l) => l(v))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  )
  return [value, update] as const
}
