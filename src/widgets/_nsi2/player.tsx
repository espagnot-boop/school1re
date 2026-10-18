import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react'
import { Button } from '@/components/ui/button'

/** Lecteur pas à pas : index courant, lecture automatique, navigation. */
export function usePlayer(len: number, ms: number) {
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const last = Math.max(0, len - 1)
  const i = Math.min(idx, last)

  useEffect(() => {
    if (!playing) return
    if (i >= last) {
      setPlaying(false)
      return
    }
    const t = window.setTimeout(() => setIdx(Math.min(last, i + 1)), ms)
    return () => window.clearTimeout(t)
  }, [playing, i, last, ms])

  const setI = useCallback((v: number) => setIdx(Math.max(0, Math.min(last, Math.round(v)))), [last])
  const toggle = useCallback(() => {
    if (i >= last) {
      setIdx(0)
      setPlaying(true)
    } else setPlaying((p) => !p)
  }, [i, last])
  const reset = useCallback(() => {
    setPlaying(false)
    setIdx(0)
  }, [])
  return {
    i,
    last,
    playing,
    setI,
    toggle,
    reset,
    next: () => {
      setPlaying(false)
      setIdx(Math.min(last, i + 1))
    },
    prev: () => {
      setPlaying(false)
      setIdx(Math.max(0, i - 1))
    },
    end: () => {
      setPlaying(false)
      setIdx(last)
    },
    stop: () => setPlaying(false),
  }
}

export type Player = ReturnType<typeof usePlayer>

export function PlayerBar({ p, className }: { p: Player; className?: string }) {
  return (
    <div className={'flex flex-wrap items-center gap-1.5 ' + (className ?? '')}>
      <Button size="icon" variant="outline" onClick={p.reset} aria-label="Retour au début" title="Début">
        <SkipBack />
      </Button>
      <Button size="icon" variant="outline" onClick={p.prev} disabled={p.i <= 0} aria-label="Étape précédente" title="Précédent">
        <ChevronLeft />
      </Button>
      <Button size="default" onClick={p.toggle} className="min-w-[7.5rem]" aria-label={p.playing ? 'Pause' : 'Lecture'}>
        {p.playing ? <Pause /> : p.i >= p.last ? <RotateCcw /> : <Play />}
        {p.playing ? 'Pause' : p.i >= p.last ? 'Rejouer' : 'Lecture'}
      </Button>
      <Button size="icon" variant="outline" onClick={p.next} disabled={p.i >= p.last} aria-label="Étape suivante" title="Suivant">
        <ChevronRight />
      </Button>
      <Button size="icon" variant="outline" onClick={p.end} disabled={p.i >= p.last} aria-label="Aller à la fin" title="Fin">
        <SkipForward />
      </Button>
    </div>
  )
}

/** Générateur pseudo-aléatoire déterministe (mulberry32). */
export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
