import { useMemo, useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { Segmented } from '@/components/ui/tabs'
import { Stat } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { PALETTE } from '@/lib/plot'
import { fmt } from '@/lib/utils'
import { PlayerBar, rng, usePlayer } from './_nsi2/player'
import { Slider } from '@/components/ui/slider'

interface Props {
  size?: number
}

interface DFrame {
  lo: number
  hi: number
  mid: number | null
  found: number | null
  text: string
}

const SIZES = [8, 16, 32, 64, 128, 256]

function dichotomy(arr: number[], x: number): DFrame[] {
  const out: DFrame[] = [{ lo: 0, hi: arr.length - 1, mid: null, found: null, text: `Zone de recherche : t[0..${arr.length - 1}] (${arr.length} éléments).` }]
  let g = 0
  let d = arr.length - 1
  while (g <= d) {
    const m = Math.floor((g + d) / 2)
    if (arr[m] === x) {
      out.push({ lo: g, hi: d, mid: m, found: m, text: `m = ${m} : t[${m}] = ${arr[m]} = ${x}. Trouvé !` })
      return out
    }
    if (arr[m] < x) {
      out.push({ lo: g, hi: d, mid: m, found: null, text: `m = ${m} : t[${m}] = ${arr[m]} < ${x}, on garde la moitié droite : g ← ${m + 1}.` })
      g = m + 1
    } else {
      out.push({ lo: g, hi: d, mid: m, found: null, text: `m = ${m} : t[${m}] = ${arr[m]} > ${x}, on garde la moitié gauche : d ← ${m - 1}.` })
      d = m - 1
    }
  }
  out.push({ lo: g, hi: d, mid: null, found: null, text: `g = ${g} > d = ${d} : zone vide, ${x} n'est pas dans le tableau.` })
  return out
}

interface SFrame {
  idx: number | null
  found: number | null
  text: string
}
function sequential(arr: number[], x: number): SFrame[] {
  const out: SFrame[] = [{ idx: null, found: null, text: 'On part du début du tableau.' }]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) {
      out.push({ idx: i, found: i, text: `t[${i}] = ${arr[i]} = ${x}. Trouvé !` })
      return out
    }
    out.push({ idx: i, found: null, text: `t[${i}] = ${arr[i]} ≠ ${x}, on continue.` })
  }
  out.push({ idx: null, found: null, text: `Tout le tableau a été parcouru : ${x} est absent.` })
  return out
}

type CellState = 'out' | 'in' | 'mid' | 'found' | 'visited' | 'current'

function Grid({ arr, state, onPick, target }: { arr: number[]; state: (i: number) => CellState; onPick: (i: number) => void; target: number }) {
  const n = arr.length
  const cols = n <= 16 ? n : n <= 64 ? 16 : 32
  const rows = Math.ceil(n / cols)
  const cw = 640 / cols
  const ch = n <= 64 ? Math.min(46, cw) : Math.min(22, cw)
  const showVal = n <= 64
  const H = rows * ch + 2
  const style = (s: CellState) => {
    switch (s) {
      case 'out':
        return { fill: 'hsl(var(--muted))', op: 0.45, stroke: 'hsl(var(--border))' }
      case 'in':
        return { fill: 'hsl(var(--background))', op: 1, stroke: 'hsl(var(--border))' }
      case 'mid':
        return { fill: PALETTE.orange, op: 1, stroke: PALETTE.orange }
      case 'found':
        return { fill: PALETTE.green, op: 1, stroke: PALETTE.green }
      case 'current':
        return { fill: PALETTE.orange, op: 1, stroke: PALETTE.orange }
      default:
        return { fill: 'hsl(var(--muted))', op: 0.8, stroke: 'hsl(var(--border))' }
    }
  }
  return (
    <svg viewBox={`0 0 640 ${H}`} className="w-full" role="img" aria-label="Tableau trié">
      {arr.map((v, i) => {
        const s = style(state(i))
        const x = (i % cols) * cw
        const y = Math.floor(i / cols) * ch
        const st = state(i)
        const strong = st === 'mid' || st === 'found' || st === 'current'
        return (
          <g key={i} onClick={() => onPick(i)} style={{ cursor: 'pointer' }}>
            <title>{`t[${i}] = ${v}`}</title>
            <rect x={x + 0.5} y={y + 0.5} width={cw - 1} height={ch - 1} fill={s.fill} fillOpacity={s.op} stroke={v === target ? 'hsl(var(--foreground))' : s.stroke} strokeWidth={v === target ? 1.8 : 1} />
            {showVal && (
              <text x={x + cw / 2} y={y + ch / 2 + 4} textAnchor="middle" fontSize={cols > 16 ? 9 : 12} fontFamily="Geist, monospace" fill={strong ? 'hsl(0 0% 100%)' : 'hsl(var(--foreground))'} fillOpacity={st === 'out' || st === 'visited' ? 0.5 : 1}>
                {v}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

export default function BinarySearch({ size = 64 }: Props) {
  const sz = Math.max(4, Math.min(1024, Math.round(size) || 64))
  const [n, setN] = useState(sz)
  const [seed, setSeed] = useState(3)
  const [targetIdx, setTargetIdx] = useState<number | null>(Math.floor(sz * 0.7))
  const [absentV, setAbsentV] = useState<number | null>(null)
  const [speed, setSpeed] = useState(3)

  // tableau trié de valeurs distinctes (pas irréguliers pour que des valeurs absentes existent)
  const arr = useMemo(() => {
    const r = rng(11)
    let v = 2
    return Array.from({ length: n }, () => {
      v += 2 + Math.floor(r() * 3)
      return v
    })
  }, [n])

  const target = absentV !== null ? absentV : arr[Math.min(targetIdx ?? 0, n - 1)]
  const dF = useMemo(() => dichotomy(arr, target), [arr, target])
  const sF = useMemo(() => sequential(arr, target), [arr, target])
  const total = Math.max(dF.length, sF.length)
  const p = usePlayer(total, 1100 / speed)
  const d = dF[Math.min(p.i, dF.length - 1)]
  const s = sF[Math.min(p.i, sF.length - 1)]

  const dCount = Math.min(p.i, dF.length - 1) // nombre de comparaisons réalisées (étape 0 = aucune)
  const sCount = Math.min(p.i, sF.length - 1)
  const dTotal = dF.length - 1
  const sTotal = sF.length - 1
  const worst = Math.floor(Math.log2(n)) + 1

  const pick = (i: number) => {
    setAbsentV(null)
    setTargetIdx(i)
    p.reset()
  }
  const resetWith = (fn: () => void) => {
    fn()
    p.reset()
  }

  const dState = (i: number): CellState => {
    if (d.found === i) return 'found'
    if (d.mid === i) return 'mid'
    return i >= d.lo && i <= d.hi ? 'in' : 'out'
  }
  const sState = (i: number): CellState => {
    if (s.found === i) return 'found'
    if (s.idx === i) return 'current'
    if (s.idx !== null && i < s.idx) return 'visited'
    if (s.idx === null && p.i > 0 && sF[sF.length - 1].found === null) return 'visited'
    return 'in'
  }

  const sizes = SIZES.includes(n) ? SIZES : [...SIZES, n].sort((a, b) => a - b)

  return (
    <WidgetFrame
      title="Recherche dichotomique et recherche séquentielle"
      subtitle="Même tableau trié, même valeur cherchée, même nombre d'étapes affiché"
      controls={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Taille du tableau</Label>
            <Segmented
              value={String(n)}
              onChange={(v) =>
                resetWith(() => {
                  const k = Number(v)
                  setN(k)
                  setAbsentV(null)
                  setTargetIdx(Math.floor(k * 0.7))
                })
              }
              options={sizes.map((k) => ({ value: String(k), label: String(k) }))}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Valeur cherchée</Label>
            <Input
              type="number"
              value={target}
              onChange={(e) => {
                const v = Number(e.target.value)
                if (!Number.isFinite(v)) return
                const k = arr.indexOf(v)
                resetWith(() => {
                  if (k >= 0) {
                    setAbsentV(null)
                    setTargetIdx(k)
                  } else setAbsentV(Math.round(v))
                })
              }}
              aria-label="Valeur cherchée"
              className="font-mono"
            />
            <div className="flex flex-wrap gap-1.5">
              <Button size="xs" variant="outline" onClick={() => pick(0)}>
                Premier
              </Button>
              <Button size="xs" variant="outline" onClick={() => pick(n - 1)}>
                Dernier
              </Button>
              <Button
                size="xs"
                variant="outline"
                onClick={() => {
                  setSeed((x) => x + 1)
                  pick(Math.floor(rng(seed * 97 + n)() * n))
                }}
              >
                Au hasard
              </Button>
              <Button
                size="xs"
                variant="outline"
                onClick={() =>
                  resetWith(() => {
                    setAbsentV(arr[Math.floor(n / 3)] + 1 === arr[Math.floor(n / 3) + 1] ? arr[Math.floor(n / 3)] - 1 : arr[Math.floor(n / 3)] + 1)
                  })
                }
              >
                Absente
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">Vous pouvez aussi cliquer sur une case.</span>
          </div>
          <Slider label="Vitesse" value={speed} min={1} max={10} step={1} digits={0} onChange={setSpeed} />
          <div className="grid grid-cols-2 gap-2">
            <Stat label="Dichotomie" value={`${dCount} / ${dTotal}`} tone="success" />
            <Stat label="Séquentielle" value={`${sCount} / ${sTotal}`} tone="warning" />
            <Stat label="Pire cas dicho." value={worst} />
            <Stat label="Pire cas séq." value={n} />
          </div>
          <div className="text-xs leading-relaxed text-muted-foreground">
            Pour <Tex>{`n = ${n}`}</Tex> : <Tex>{String.raw`\lfloor \log_2 n \rfloor + 1`}</Tex> = {worst} comparaisons au plus (<Tex>{String.raw`\log_2 ${n}`}</Tex> ≈ {fmt(Math.log2(n), 2)}), contre {n} pour le parcours séquentiel.
          </div>
        </>
      }
      footer={
        <div className="flex flex-col gap-1">
          <div>
            <span className="font-semibold" style={{ color: PALETTE.green }}>Dichotomie : </span>
            {d.text}
          </div>
          <div>
            <span className="font-semibold" style={{ color: PALETTE.orange }}>Séquentielle : </span>
            {s.text}
          </div>
          {p.i >= p.last && (
            <div className="mt-1 text-xs text-muted-foreground">
              Bilan : {dTotal} comparaison{dTotal > 1 ? 's' : ''} contre {sTotal}. À chaque tour, la dichotomie divise la zone de recherche par deux : le nombre d'étapes croît comme <Tex>{String.raw`\log_2 n`}</Tex>, la recherche séquentielle comme <Tex>n</Tex>.
            </div>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div>
          <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2 text-xs">
            <span className="font-semibold">Recherche dichotomique</span>
            <span className="font-mono text-muted-foreground">
              g = {d.lo} · d = {d.hi}
              {d.mid !== null ? ` · m = ${d.mid}` : ''} · {Math.max(0, d.hi - d.lo + 1)} cases restantes
            </span>
          </div>
          <Grid arr={arr} state={dState} onPick={pick} target={target} />
        </div>
        <div>
          <div className="mb-1 flex items-baseline justify-between gap-2 text-xs">
            <span className="font-semibold">Recherche séquentielle</span>
            <span className="font-mono text-muted-foreground">i = {s.idx ?? '—'}</span>
          </div>
          <Grid arr={arr} state={sState} onPick={pick} target={target} />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <PlayerBar p={p} />
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            étape {p.i}/{p.last}
          </span>
        </div>
      </div>
    </WidgetFrame>
  )
}
