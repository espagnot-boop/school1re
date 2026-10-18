import { useMemo, useState } from 'react'
import { Shuffle } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Segmented } from '@/components/ui/tabs'
import { Stat } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { PALETTE } from '@/lib/plot'
import { cn } from '@/lib/utils'
import { PlayerBar, rng, usePlayer } from './_nsi2/player'

type Algo = 'selection' | 'insertion' | 'bulles'
interface Props {
  algorithm?: Algo
}
interface Item {
  v: number
  id: number
}
interface Frame {
  arr: Item[]
  /** 0 = non trié, 1 = définitivement placé, 2 = trié mais provisoire (insertion) */
  mask: number[]
  cmp?: [number, number]
  swap?: [number, number]
  mark?: number
  key?: number
  comps: number
  swaps: number
  text: string
}

const NAMES: Record<Algo, string> = { selection: 'Sélection', insertion: 'Insertion', bulles: 'Bulles' }

function build(algo: Algo, values: number[]): Frame[] {
  const a: Item[] = values.map((v, id) => ({ v, id }))
  const n = a.length
  const frames: Frame[] = []
  let comps = 0
  let swaps = 0
  const push = (text: string, mask: number[], extra: Partial<Frame> = {}) =>
    frames.push({ arr: a.slice(), mask, comps, swaps, text, ...extra })
  const pre = (k: number, v = 1) => Array.from({ length: n }, (_, i) => (i < k ? v : 0))
  const suf = (k: number) => Array.from({ length: n }, (_, i) => (i >= k ? 1 : 0))
  const swap = (i: number, j: number) => {
    const t = a[i]
    a[i] = a[j]
    a[j] = t
    swaps++
  }

  push('Tableau initial. Appuyez sur Lecture ou avancez pas à pas.', pre(0))

  if (algo === 'selection') {
    for (let i = 0; i < n - 1; i++) {
      let min = i
      push(`Tour ${i + 1} : on cherche le plus petit élément de t[${i}..${n - 1}]. Minimum provisoire : t[${min}] = ${a[min].v}.`, pre(i), { mark: min })
      for (let j = i + 1; j < n; j++) {
        comps++
        const better = a[j].v < a[min].v
        const old = min
        if (better) min = j
        push(
          better
            ? `t[${j}] = ${a[j].v} < t[${old}] = ${a[old].v} : nouveau minimum en ${j}.`
            : `t[${j}] = ${a[j].v} ≥ t[${old}] = ${a[old].v} : le minimum reste en ${old}.`,
          pre(i),
          { cmp: [j, old], mark: min },
        )
      }
      if (min !== i) {
        const vi = a[i].v
        const vm = a[min].v
        swap(i, min)
        push(`On échange t[${i}] = ${vi} et t[${min}] = ${vm} : ${vm} est à sa place définitive.`, pre(i + 1), { swap: [i, min] })
      } else {
        push(`Le minimum est déjà en position ${i} : pas d'échange. t[0..${i}] est définitif.`, pre(i + 1))
      }
    }
  } else if (algo === 'insertion') {
    for (let i = 1; i < n; i++) {
      push(`On insère la clé t[${i}] = ${a[i].v} dans la partie déjà triée t[0..${i - 1}].`, pre(i, 2), { key: i })
      let j = i
      while (j > 0) {
        comps++
        if (a[j - 1].v > a[j].v) {
          push(`t[${j - 1}] = ${a[j - 1].v} > clé = ${a[j].v} : on décale.`, pre(i, 2), { cmp: [j - 1, j], key: j })
          swap(j - 1, j)
          j--
          push(`La clé recule en position ${j}.`, pre(i, 2), { swap: [j, j + 1], key: j })
        } else {
          push(`t[${j - 1}] = ${a[j - 1].v} ≤ clé = ${a[j].v} : la clé est à sa place, on s'arrête.`, pre(i, 2), { cmp: [j - 1, j], key: j })
          break
        }
      }
      push(`t[0..${i}] est trié (mais pas forcément définitif : la suite peut s'y insérer).`, pre(i + 1, 2))
    }
  } else {
    for (let p = 0; p < n - 1; p++) {
      let any = false
      push(`Passage ${p + 1} : on parcourt t[0..${n - 1 - p}] en comparant les voisins.`, suf(n - p))
      for (let j = 0; j < n - 1 - p; j++) {
        comps++
        const gt = a[j].v > a[j + 1].v
        if (gt) {
          push(`t[${j}] = ${a[j].v} > t[${j + 1}] = ${a[j + 1].v} : on échange.`, suf(n - p), { cmp: [j, j + 1] })
          swap(j, j + 1)
          any = true
          push(`Après échange : le plus grand « monte » en position ${j + 1}.`, suf(n - p), { swap: [j, j + 1] })
        } else {
          push(`t[${j}] = ${a[j].v} ≤ t[${j + 1}] = ${a[j + 1].v} : on laisse.`, suf(n - p), { cmp: [j, j + 1] })
        }
      }
      if (!any) {
        push(`Aucun échange pendant ce passage : le tableau est trié, on s'arrête.`, suf(0))
        break
      }
      push(`Fin du passage ${p + 1} : t[${n - 1 - p}] = ${a[n - 1 - p].v} est à sa place définitive.`, suf(n - 1 - p))
    }
  }
  push('Tableau trié.', pre(n))
  return frames
}

function makeData(kind: string, n: number, seed: number): number[] {
  const r = rng(seed)
  const base = Array.from({ length: n }, (_, i) => i + 1)
  if (kind === 'trie') return base
  if (kind === 'inverse') return base.reverse()
  if (kind === 'presque') {
    const a = base.slice()
    for (let k = 0; k < Math.max(1, Math.round(n / 6)); k++) {
      const i = Math.floor(r() * (n - 1))
      ;[a[i], a[i + 1]] = [a[i + 1], a[i]]
    }
    return a
  }
  const a = base.slice()
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const COMPLEXITY: Record<Algo, { best: string; worst: string; inv: string }> = {
  selection: {
    best: String.raw`\tfrac{n(n-1)}{2}`,
    worst: String.raw`\tfrac{n(n-1)}{2}`,
    inv: 'À la fin du tour i, t[0..i] contient les i+1 plus petits éléments, dans l’ordre croissant : ils sont définitivement placés.',
  },
  insertion: {
    best: String.raw`n-1`,
    worst: String.raw`\tfrac{n(n-1)}{2}`,
    inv: 'Avant d’insérer t[i], la partie t[0..i−1] est triée (mais ses éléments peuvent encore être décalés).',
  },
  bulles: {
    best: String.raw`n-1`,
    worst: String.raw`\tfrac{n(n-1)}{2}`,
    inv: 'À la fin du passage k, les k plus grands éléments sont à leur place définitive, à la fin du tableau.',
  },
}

export default function SortVisualizer({ algorithm = 'selection' }: Props) {
  const [algo, setAlgo] = useState<Algo>(algorithm)
  const [kind, setKind] = useState('alea')
  const [n, setN] = useState(10)
  const [seed, setSeed] = useState(7)
  const [speed, setSpeed] = useState(4)
  const [custom, setCustom] = useState('')
  const [useCustom, setUseCustom] = useState(false)

  const parsed = useMemo(() => {
    const nums = custom
      .split(/[\s,;]+/)
      .filter(Boolean)
      .map(Number)
    const ok = nums.length >= 2 && nums.length <= 24 && nums.every((x) => Number.isFinite(x) && Math.abs(x) < 1000)
    return ok ? nums : null
  }, [custom])

  const values = useMemo(() => (useCustom && parsed ? parsed : makeData(kind, n, seed)), [useCustom, parsed, kind, n, seed])
  const frames = useMemo(() => build(algo, values), [algo, values])
  const p = usePlayer(frames.length, 1150 / speed)
  const f = frames[p.i]
  const N = f.arr.length

  const vmax = Math.max(...values.map(Math.abs), 1)
  const vmin = Math.min(0, ...values)
  const W = 640
  const H = 270
  const top = 22
  const bottom = 26
  const bw = W / N
  const scale = (H - top - bottom) / (vmax - vmin)
  const y0 = top + (H - top - bottom) - (0 - vmin) * scale
  const bwInner = Math.max(2, bw - Math.min(6, bw * 0.2))

  const colorOf = (pos: number): string => {
    if (f.swap && (pos === f.swap[0] || pos === f.swap[1])) return PALETTE.red
    if (f.cmp && (pos === f.cmp[0] || pos === f.cmp[1])) return PALETTE.orange
    if (f.key === pos) return PALETTE.violet
    if (f.mark === pos) return PALETTE.blue
    if (f.mask[pos] === 1) return PALETTE.green
    if (f.mask[pos] === 2) return PALETTE.teal
    return 'hsl(var(--muted-foreground) / 0.45)'
  }

  const reset = () => p.reset()
  const th = COMPLEXITY[algo]
  const worst = (N * (N - 1)) / 2
  const best = algo === 'selection' ? worst : N - 1
  const done = p.i === p.last

  const legend: [string, string][] = [
    [PALETTE.orange, 'comparés'],
    [PALETTE.red, 'échangés'],
    ...(algo === 'selection' ? ([[PALETTE.blue, 'minimum provisoire']] as [string, string][]) : []),
    ...(algo === 'insertion' ? ([[PALETTE.violet, 'clé'], [PALETTE.teal, 'partie triée']] as [string, string][]) : []),
    [PALETTE.green, 'définitif'],
  ]

  return (
    <WidgetFrame
      title={`Tri par ${NAMES[algo].toLowerCase()}`}
      subtitle="Avancez pas à pas ou lancez la lecture, et surveillez les compteurs"
      controls={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Algorithme</Label>
            <Segmented
              value={algo}
              onChange={(v) => {
                setAlgo(v)
                reset()
              }}
              options={[
                { value: 'selection', label: 'Sélection' },
                { value: 'insertion', label: 'Insertion' },
                { value: 'bulles', label: 'Bulles' },
              ]}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Données</Label>
            <Segmented
              value={useCustom ? 'perso' : kind}
              onChange={(v) => {
                if (v === 'perso') {
                  setUseCustom(true)
                  if (!custom) setCustom(values.join(' '))
                } else {
                  setUseCustom(false)
                  setKind(v)
                }
                reset()
              }}
              options={[
                { value: 'alea', label: 'Aléa.' },
                { value: 'presque', label: 'Presque' },
                { value: 'inverse', label: 'Inversé' },
                { value: 'trie', label: 'Trié' },
                { value: 'perso', label: 'Perso' },
              ]}
            />
            {useCustom ? (
              <>
                <Input
                  value={custom}
                  onChange={(e) => {
                    setCustom(e.target.value)
                    reset()
                  }}
                  placeholder="ex. 5 2 9 1 7"
                  className={cn('font-mono', !parsed && 'border-destructive')}
                  aria-label="Valeurs à trier"
                />
                {!parsed && <span className="text-xs text-destructive">Entrez 2 à 24 nombres séparés par des espaces.</span>}
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Slider
                  label="Taille du tableau"
                  value={n}
                  min={4}
                  max={20}
                  step={1}
                  digits={0}
                  onChange={(v) => {
                    setN(v)
                    reset()
                  }}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSeed((s) => s + 1)
                    reset()
                  }}
                  disabled={kind !== 'alea' && kind !== 'presque'}
                >
                  <Shuffle /> Mélanger
                </Button>
              </div>
            )}
          </div>
          <Slider label="Vitesse de lecture" value={speed} min={1} max={10} step={1} digits={0} onChange={setSpeed} />
          <div className="grid grid-cols-2 gap-2">
            <Stat label="Comparaisons" value={f.comps} tone="warning" />
            <Stat label="Échanges" value={f.swaps} tone="destructive" />
          </div>
          <div className="text-xs leading-relaxed text-muted-foreground">
            <div className="mb-1 font-medium text-foreground">Nombre de comparaisons (n = {N})</div>
            <div>
              Meilleur cas : <Tex>{th.best}</Tex> = {best}
            </div>
            <div>
              Pire cas : <Tex>{th.worst}</Tex> = {worst}
            </div>
            <div className="mt-1">
              Complexité : <Tex>{String.raw`O(n^2)`}</Tex>
              {algo !== 'selection' && (
                <>
                  {' '}
                  (<Tex>{String.raw`O(n)`}</Tex> si déjà trié)
                </>
              )}
            </div>
          </div>
        </>
      }
      footer={
        <div className="flex flex-col gap-1">
          <div className="font-medium">{f.text}</div>
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Invariant : </span>
            {th.inv}
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Barres du tableau en cours de tri">
          <line x1={0} x2={W} y1={y0} y2={y0} stroke="hsl(var(--border))" />
          {f.arr.map((it, pos) => {
            const h = Math.max(2, Math.abs(it.v) * scale)
            const y = it.v >= 0 ? y0 - h : y0
            return (
              <g key={it.id} style={{ transform: `translate(${pos * bw}px, 0)`, transition: 'transform 260ms ease' }}>
                <rect x={(bw - bwInner) / 2} y={y} width={bwInner} height={h} fill={colorOf(pos)} style={{ transition: 'fill 150ms' }} />
                {N <= 16 && (
                  <text x={bw / 2} y={it.v >= 0 ? y - 5 : y + h + 12} textAnchor="middle" fontSize={12} fontFamily="Geist, monospace" fill="hsl(var(--foreground))">
                    {it.v}
                  </text>
                )}
              </g>
            )
          })}
          {f.arr.map((_, pos) => (
            <text key={pos} x={pos * bw + bw / 2} y={H - 8} textAnchor="middle" fontSize={N > 14 ? 9 : 11} fontFamily="Geist, monospace" fill="hsl(var(--muted-foreground))">
              {pos}
            </text>
          ))}
        </svg>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {legend.map(([c, l]) => (
            <span key={l} className="inline-flex items-center gap-1.5">
              <span className="inline-block size-2.5" style={{ background: c }} />
              {l}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <PlayerBar p={p} />
          <input
            type="range"
            min={0}
            max={p.last}
            value={p.i}
            onChange={(e) => {
              p.stop()
              p.setI(Number(e.target.value))
            }}
            aria-label="Étape"
            className="pc-range h-5 min-w-[8rem] flex-1 cursor-pointer appearance-none bg-transparent"
            style={{ ['--pct' as string]: `${(p.i / Math.max(1, p.last)) * 100}%` }}
          />
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            étape {p.i}/{p.last}
            {done ? ' · terminé' : ''}
          </span>
        </div>
      </div>
    </WidgetFrame>
  )
}
