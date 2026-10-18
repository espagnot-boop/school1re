import { useMemo, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/input'
import { Progress, Stat } from '@/components/ui/misc'
import { cn, fmt } from '@/lib/utils'

/* Réseau trophique d'une lisière forestière tempérée (modèle qualitatif).
   Une flèche va de l'être vivant mangé vers celui qui le mange (sens du flux de matière et d'énergie). */

interface Sp {
  id: string
  name: string
  kind: string
  level: 1 | 2 | 3 | 4 | 0
  x: number
  y: number
  eats: string[]
}

const SPECIES: Sp[] = [
  { id: 'herbes', name: 'Herbes', kind: 'producteur', level: 1, x: 150, y: 368, eats: [] },
  { id: 'chene', name: 'Chêne', kind: 'producteur', level: 1, x: 420, y: 368, eats: [] },
  { id: 'criquet', name: 'Criquet', kind: 'herbivore', level: 2, x: 60, y: 272, eats: ['herbes'] },
  { id: 'chenille', name: 'Chenille', kind: 'herbivore', level: 2, x: 195, y: 272, eats: ['chene'] },
  { id: 'lapin', name: 'Lapin', kind: 'herbivore', level: 2, x: 335, y: 272, eats: ['herbes'] },
  { id: 'souris', name: 'Souris', kind: 'granivore', level: 2, x: 480, y: 272, eats: ['herbes', 'chene'] },
  { id: 'mesange', name: 'Mésange', kind: 'insectivore', level: 3, x: 110, y: 176, eats: ['chenille', 'criquet'] },
  { id: 'grenouille', name: 'Grenouille', kind: 'insectivore', level: 3, x: 250, y: 176, eats: ['criquet', 'chenille'] },
  { id: 'serpent', name: 'Couleuvre', kind: 'carnivore', level: 3, x: 400, y: 176, eats: ['souris', 'grenouille'] },
  { id: 'renard', name: 'Renard', kind: 'carnivore', level: 4, x: 270, y: 80, eats: ['lapin', 'souris', 'grenouille'] },
  { id: 'buse', name: 'Buse', kind: 'carnivore', level: 4, x: 470, y: 80, eats: ['lapin', 'serpent', 'souris'] },
]
const DECOMP = { id: 'decomp', name: 'Décomposeurs', kind: 'champignons, bactéries, vers' }
const BY_ID: Record<string, Sp> = Object.fromEntries(SPECIES.map((s) => [s.id, s]))
const PREDATORS: Record<string, string[]> = {}
SPECIES.forEach((s) => s.eats.forEach((p) => (PREDATORS[p] ||= []).push(s.id)))

const LEVEL_COLOR: Record<number, string> = {
  1: 'hsl(142 71% 45%)',
  2: 'hsl(45 93% 47%)',
  3: 'hsl(217 91% 60%)',
  4: 'hsl(263 70% 60%)',
  0: 'hsl(25 40% 45%)',
}
const LEVEL_NAME: Record<number, string> = { 1: 'Producteurs', 2: 'Consommateurs I', 3: 'Consommateurs II', 4: 'Consommateurs III' }

interface Result {
  gone: Set<string>
  cascade: string[]
  eff: Record<string, number>
}

function analyse(removed: Set<string>, noDecomp: boolean): Result {
  const gone = new Set(removed)
  const cascade: string[] = []
  let changed = true
  while (changed) {
    changed = false
    for (const s of SPECIES) {
      if (gone.has(s.id) || s.eats.length === 0) continue
      if (s.eats.every((p) => gone.has(p))) {
        gone.add(s.id)
        cascade.push(s.id)
        changed = true
      }
    }
  }
  const eff: Record<string, number> = {}
  SPECIES.forEach((s) => (eff[s.id] = gone.has(s.id) ? -1 : 0))
  for (let it = 0; it < 40; it++) {
    for (const s of SPECIES) {
      if (gone.has(s.id)) continue
      const res = s.eats.length ? s.eats.reduce((a, p) => a + eff[p], 0) / s.eats.length : noDecomp ? -0.6 : 0
      const preds = PREDATORS[s.id] ?? []
      const pr = preds.length ? preds.reduce((a, p) => a + eff[p], 0) / preds.length : 0
      const nv = Math.max(-1, Math.min(1, 0.8 * res - 0.8 * pr))
      eff[s.id] = 0.5 * eff[s.id] + 0.5 * nv
    }
  }
  return { gone, cascade, eff }
}

const trend = (e: number, gone: boolean): 'gone' | 'up' | 'down' | 'stable' => (gone ? 'gone' : e > 0.12 ? 'up' : e < -0.12 ? 'down' : 'stable')

const SERVICES: { name: string; text: string; ids: string[]; decomp?: boolean }[] = [
  { name: 'Production de matière organique', text: 'Photosynthèse : base de tout le réseau, stockage du carbone', ids: ['herbes', 'chene'] },
  { name: 'Régulation des insectes', text: 'Les insectivores limitent les chenilles et criquets', ids: ['mesange', 'grenouille'] },
  { name: 'Régulation des rongeurs', text: 'Les prédateurs limitent souris et lapins (cultures, maladies)', ids: ['renard', 'buse', 'serpent'] },
  { name: 'Recyclage de la matière', text: 'Minéralisation : retour des sels minéraux aux producteurs', ids: [], decomp: true },
]

const PRESETS: { label: string; ids: string[]; decomp?: boolean }[] = [
  { label: 'Sans grands prédateurs', ids: ['renard', 'buse'] },
  { label: 'Sans insectivores', ids: ['mesange', 'grenouille'] },
  { label: 'Sans herbes', ids: ['herbes'] },
  { label: 'Sans souris', ids: ['souris'] },
]

export default function FoodWeb() {
  const [removed, setRemoved] = useState<Set<string>>(new Set())
  const [noDecomp, setNoDecomp] = useState(false)
  const [last, setLast] = useState<string | null>(null)

  const res = useMemo(() => analyse(removed, noDecomp), [removed, noDecomp])
  const toggle = (id: string) => {
    setLast(id)
    setRemoved((r) => {
      const n = new Set(r)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }
  const reset = () => {
    setRemoved(new Set())
    setNoDecomp(false)
    setLast(null)
  }
  const present = SPECIES.length - res.gone.size

  // explications
  const lines: { tone: 'up' | 'down' | 'gone'; text: string }[] = []
  removed.forEach((id) => {
    const sp = BY_ID[id]
    ;(PREDATORS[id] ?? []).forEach((p) => {
      if (res.gone.has(p)) lines.push({ tone: 'gone', text: `${BY_ID[p].name} : plus aucune proie disponible, disparition (extinction secondaire).` })
      else lines.push({ tone: 'down', text: `${BY_ID[p].name} perd une proie (${sp.name.toLowerCase()}) : tendance à la baisse.` })
    })
    sp.eats.forEach((p) => {
      if (!res.gone.has(p)) lines.push({ tone: 'up', text: `${BY_ID[p].name} n’a plus ce prédateur (${sp.name.toLowerCase()}) : tendance à la hausse.` })
    })
  })
  const lastSp = last ? BY_ID[last] : null

  const levelOf = (id: string) => (res.gone.has(id) ? 0 : Math.max(0.1, Math.min(1.25, 1 + 0.8 * res.eff[id])))
  const svcLevel = (s: (typeof SERVICES)[number]) => (s.decomp ? (noDecomp ? 0 : 1) : s.ids.reduce((a, id) => a + levelOf(id), 0) / s.ids.length)

  return (
    <WidgetFrame
      title="Réseau trophique"
      subtitle="Cliquez sur une espèce pour la faire disparaître et observez les effets en cascade"
      controls={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Retirer une espèce</Label>
            <div className="grid grid-cols-2 gap-1">
              {SPECIES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggle(s.id)}
                  className={cn(
                    'flex items-center gap-1.5 border px-2 py-1 text-left text-xs',
                    res.gone.has(s.id) ? 'bg-destructive/10 text-muted-foreground line-through' : 'hover:bg-accent',
                    removed.has(s.id) && 'border-destructive',
                  )}
                >
                  <span className="inline-block size-2 shrink-0" style={{ background: LEVEL_COLOR[s.level] }} />
                  {s.name}
                </button>
              ))}
              <button
                onClick={() => {
                  setLast('decomp')
                  setNoDecomp((v) => !v)
                }}
                className={cn('col-span-2 flex items-center gap-1.5 border px-2 py-1 text-left text-xs', noDecomp ? 'border-destructive bg-destructive/10 line-through' : 'hover:bg-accent')}
              >
                <span className="inline-block size-2 shrink-0" style={{ background: LEVEL_COLOR[0] }} />
                {DECOMP.name}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Scénarios</Label>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <Button
                  key={p.label}
                  size="xs"
                  variant="outline"
                  onClick={() => {
                    setRemoved(new Set(p.ids))
                    setNoDecomp(false)
                    setLast(p.ids[0])
                  }}
                >
                  {p.label}
                </Button>
              ))}
              <Button size="xs" variant="ghost" onClick={reset}>
                <RotateCcw /> Réinitialiser
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Stat label="Espèces présentes" value={`${present} / ${SPECIES.length}`} tone={present === SPECIES.length ? 'success' : present > 7 ? 'warning' : 'destructive'} />
            <Stat label="Extinctions secondaires" value={res.cascade.length} tone={res.cascade.length ? 'destructive' : undefined} />
          </div>
        </>
      }
      footer={
        <div className="space-y-1.5 text-xs leading-relaxed">
          {lines.length === 0 && !noDecomp && <p className="text-muted-foreground">Aucune perturbation : le réseau est en équilibre dynamique. Retirez une espèce pour voir les conséquences.</p>}
          {lines.slice(0, 7).map((l, i) => (
            <p key={i} className={l.tone === 'gone' ? 'text-destructive' : l.tone === 'up' ? 'text-success' : 'text-warning'}>
              {l.tone === 'up' ? '▲ ' : l.tone === 'down' ? '▼ ' : '✕ '}
              {l.text}
            </p>
          ))}
          {noDecomp && <p className="text-destructive">✕ Sans décomposeurs, la matière organique morte s’accumule et les sels minéraux ne sont plus recyclés : les producteurs déclinent à terme.</p>}
          {lastSp && last !== 'decomp' && (
            <p className="text-muted-foreground">
              <b>{lastSp.name}</b> ({lastSp.kind}) — {lastSp.eats.length ? `se nourrit de : ${lastSp.eats.map((e) => BY_ID[e].name.toLowerCase()).join(', ')}` : 'produit sa matière organique par photosynthèse'} ;{' '}
              {PREDATORS[lastSp.id] ? `est mangé(e) par : ${PREDATORS[lastSp.id].map((e) => BY_ID[e].name.toLowerCase()).join(', ')}.` : 'n’a pas de prédateur dans ce réseau.'}
            </p>
          )}
          <p className="text-muted-foreground">
            Modèle qualitatif simplifié : ▲ tendance à augmenter, ▼ tendance à diminuer. Dans la réalité, l’ampleur des effets dépend des effectifs, des régimes alimentaires de rechange et des autres facteurs du milieu.
          </p>
        </div>
      }
    >
      <div className="space-y-3">
        <div className="border bg-background">
          <svg viewBox="0 0 640 456" className="w-full" fontFamily="Geist, sans-serif">
            <defs>
              <marker id="fw-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" className="svg-fill" />
              </marker>
              <marker id="fw-arrow-dim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="hsl(var(--muted-foreground))" />
              </marker>
            </defs>
            {/* niveaux */}
            {[1, 2, 3, 4].map((l) => {
              const y = { 1: 368, 2: 272, 3: 176, 4: 80 }[l]!
              return (
                <g key={l}>
                  <rect x="0" y={y - 40} width="640" height="80" fill={LEVEL_COLOR[l]} opacity="0.06" />
                  <text x="6" y={y - 28} fontSize="9" fontWeight="600" fill={LEVEL_COLOR[l]}>{LEVEL_NAME[l]}</text>
                </g>
              )
            })}
            {/* flèches */}
            {SPECIES.flatMap((s) =>
              s.eats.map((p) => {
                const a = BY_ID[p]
                const dead = res.gone.has(p) || res.gone.has(s.id)
                const dx = s.x - a.x
                const dy = s.y - a.y
                const len = Math.hypot(dx, dy)
                const ux = dx / len
                const uy = dy / len
                // départ/arrivée sur les bords des rectangles
                const edge = (ux2: number, uy2: number) => Math.min(48 / Math.max(Math.abs(ux2), 1e-6), 17 / Math.max(Math.abs(uy2), 1e-6))
                const e = edge(ux, uy)
                const x1 = a.x + ux * e
                const y1 = a.y + uy * e
                const x2 = s.x - ux * (e + 3)
                const y2 = s.y - uy * (e + 3)
                return (
                  <line
                    key={`${p}-${s.id}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={dead ? 'hsl(var(--muted-foreground))' : 'hsl(var(--foreground))'}
                    strokeWidth={dead ? 1 : 1.5}
                    strokeDasharray={dead ? '3 4' : undefined}
                    opacity={dead ? 0.35 : 0.75}
                    markerEnd={dead ? 'url(#fw-arrow-dim)' : 'url(#fw-arrow)'}
                  />
                )
              }),
            )}
            {/* décomposeurs */}
            <g onClick={() => { setLast('decomp'); setNoDecomp((v) => !v) }} className="cursor-pointer">
              <rect x="40" y="410" width="560" height="32" fill={noDecomp ? 'hsl(var(--muted))' : 'hsl(25 40% 45% / 0.25)'} stroke={LEVEL_COLOR[0]} strokeWidth="1.8" opacity={noDecomp ? 0.5 : 1} />
              <text x="320" y="424" textAnchor="middle" fontSize="11" fontWeight="700" className="svg-fill" textDecoration={noDecomp ? 'line-through' : undefined}>
                {DECOMP.name}
              </text>
              <text x="320" y="436" textAnchor="middle" fontSize="8.5" className="svg-muted">{DECOMP.kind} : matière organique morte → matière minérale</text>
            </g>
            {['herbes', 'chene'].map((id) => (
              <g key={id} opacity={noDecomp ? 0.3 : 0.8}>
                <line x1={BY_ID[id].x} y1="410" x2={BY_ID[id].x} y2={BY_ID[id].y + 19} stroke={LEVEL_COLOR[0]} strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#fw-arrow)" />
                <text x={BY_ID[id].x + 5} y="398" fontSize="8" className="svg-muted">sels minéraux, CO₂</text>
              </g>
            ))}
            <text x="632" y="398" textAnchor="end" fontSize="8" className="svg-muted">Tout organisme mort ou déchet → décomposeurs</text>
            {/* espèces */}
            {SPECIES.map((s) => {
              const gone = res.gone.has(s.id)
              const t = trend(res.eff[s.id], gone)
              const col = LEVEL_COLOR[s.level]
              const ring = t === 'up' ? 'hsl(142 71% 45%)' : t === 'down' ? 'hsl(25 95% 53%)' : t === 'gone' ? 'hsl(0 84% 60%)' : col
              return (
                <g key={s.id} onClick={() => toggle(s.id)} className="cursor-pointer" opacity={gone ? 0.55 : 1}>
                  <rect x={s.x - 48} y={s.y - 17} width="96" height="34" fill={gone ? 'hsl(var(--muted))' : `color-mix(in srgb, ${col} 22%, hsl(var(--card)))`} stroke={ring} strokeWidth={t === 'stable' ? 1.5 : 3} />
                  <text x={s.x} y={s.y - 1} textAnchor="middle" fontSize="12" fontWeight="700" className="svg-fill" textDecoration={gone ? 'line-through' : undefined}>
                    {s.name}
                  </text>
                  <text x={s.x} y={s.y + 11} textAnchor="middle" fontSize="8.5" className="svg-muted">
                    {gone ? (removed.has(s.id) ? 'retiré(e)' : 'disparu(e)') : s.kind}
                  </text>
                  {(t === 'up' || t === 'down') && (
                    <g transform={`translate(${s.x + 48} ${s.y - 17})`}>
                      <circle r="9" fill={t === 'up' ? 'hsl(142 71% 45%)' : 'hsl(25 95% 53%)'} />
                      <path d={t === 'up' ? 'M-4 2 L0 -3 L4 2 Z' : 'M-4 -2 L0 3 L4 -2 Z'} fill="#fff" />
                    </g>
                  )}
                  {gone && (
                    <g stroke="hsl(0 84% 60%)" strokeWidth="2">
                      <line x1={s.x - 48} y1={s.y - 17} x2={s.x + 48} y2={s.y + 17} />
                      <line x1={s.x + 48} y1={s.y - 17} x2={s.x - 48} y2={s.y + 17} />
                    </g>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1"><span className="inline-block size-3 bg-success" /> tendance à augmenter</span>
          <span className="inline-flex items-center gap-1"><span className="inline-block size-3 bg-warning" /> tendance à diminuer</span>
          <span className="inline-flex items-center gap-1"><span className="inline-block size-3 bg-destructive" /> disparue</span>
          <span>Flèche : « est mangé par » (flux de matière et d’énergie)</span>
        </div>

        <div className="border bg-muted/20 p-3">
          <div className="mb-2 text-xs font-semibold">Services écosystémiques rendus</div>
          <div className="grid gap-2 sm:grid-cols-2">
            {SERVICES.map((s) => {
              const lv = svcLevel(s)
              const pct = Math.min(100, lv * 100)
              return (
                <div key={s.name} className="border bg-background p-2">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span>{s.name}</span>
                    <span className={cn('font-mono', lv < 0.4 ? 'text-destructive' : lv < 0.85 ? 'text-warning' : 'text-success')}>{fmt(pct, 0)} %</span>
                  </div>
                  <Progress value={pct} className="my-1" />
                  <div className="text-[11px] text-muted-foreground">{s.text}</div>
                </div>
              )
            })}
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">
            Biodiversité : {present} espèces sur {SPECIES.length} : plus un réseau est diversifié, plus il est résilient (chaque consommateur dispose de plusieurs sources de nourriture).
          </div>
        </div>
      </div>
    </WidgetFrame>
  )
}
