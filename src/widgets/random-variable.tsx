import { useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, Plus, RotateCcw, Trash2, Wand2 } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Plot, PALETTE } from '@/lib/plot'
import { Tex } from '@/components/Tex'
import { Button } from '@/components/ui/button'
import { Input, Label, Select } from '@/components/ui/input'
import { Stat } from '@/components/ui/misc'
import { cn, fmt } from '@/lib/utils'
import { Layer, OutlinedText, asFraction, parseNum, texNum } from './_maths2/util'

interface Props {
  values?: number[]
  probs?: number[]
}

type Row = { x: string; p: string }

/** p -> texte éditable : décimal court (≤ 4 décimales) sinon fraction si simple */
function probText(p: number): string {
  if (Math.abs(p * 1e4 - Math.round(p * 1e4)) < 1e-7) return String(Math.round(p * 1e4) / 1e4).replace('.', ',')
  const f = asFraction(p, 1000)
  if (f) return `${f[0]}/${f[1]}`
  return String(Math.round(p * 1e6) / 1e6).replace('.', ',')
}
const numText = (x: number) => String(x).replace('.', ',')

const PRESETS: { id: string; label: string; values: number[]; probs: number[]; ctx?: string }[] = [
  { id: 'jeu', label: 'Jeu de grattage (gain en €)', values: [-2, 1, 5], probs: [0.5, 0.35, 0.15], ctx: 'gain algébrique du joueur, en euros' },
  { id: 'de', label: 'Dé équilibré à 6 faces', values: [1, 2, 3, 4, 5, 6], probs: [1, 1, 1, 1, 1, 1].map((x) => x / 6), ctx: 'résultat du dé' },
  { id: 'pieces', label: 'Nombre de Pile sur 3 lancers', values: [0, 1, 2, 3], probs: [1, 3, 3, 1].map((x) => x / 8), ctx: 'nombre de Pile obtenus' },
  { id: 'roulette', label: 'Roulette : miser 1 € sur rouge', values: [-1, 1], probs: [19 / 37, 18 / 37], ctx: 'gain algébrique, en euros (18 cases rouges sur 37)' },
]

/** Valeur exacte : entier, décimal court, ou fraction (suivie d'une valeur approchée) */
function exactTex(x: number): string {
  if (Math.abs(x * 1e6 - Math.round(x * 1e6)) < 1e-6) return texNum(x, 6)
  const f = asFraction(x, 2000, 1e-9)
  if (!f) return `\\approx ${texNum(x, 4)}`
  const [p, q] = f
  return `${p < 0 ? '-' : ''}\\frac{${Math.abs(p)}}{${q}} \\approx ${texNum(x, 4)}`
}

/** probabilité exacte sans valeur approchée */
const pTex = (p: number) => exactTex(p).replace(/\\approx.*$/, '').trim() || texNum(p, 4)

const par = (x: number) => (x < 0 ? `(${texNum(x, 4)})` : texNum(x, 4))

export default function RandomVariable({ values, probs }: Props) {
  const initial: Row[] = useMemo(() => {
    if (Array.isArray(values) && Array.isArray(probs) && values.length > 0 && values.length === probs.length && values.every(Number.isFinite) && probs.every(Number.isFinite)) {
      return values.map((x, i) => ({ x: numText(x), p: probText(probs[i]) }))
    }
    const d = PRESETS[0]
    return d.values.map((x, i) => ({ x: numText(x), p: probText(d.probs[i]) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [rows, setRows] = useState<Row[]>(initial)
  const [preset, setPreset] = useState<string>(Array.isArray(values) && Array.isArray(probs) ? 'custom' : 'jeu')

  // ---------- Analyse de la loi ----------
  const parsed = rows.map((r) => ({ x: parseNum(r.x), p: parseNum(r.p) }))
  const badX = parsed.map((r, i) => !Number.isFinite(r.x) || parsed.findIndex((s) => s.x === r.x) !== i)
  const badP = parsed.map((r) => !Number.isFinite(r.p) || r.p < 0 || r.p > 1)
  const sumP = parsed.reduce((s, r) => s + (Number.isFinite(r.p) ? r.p : 0), 0)
  const sumOk = Math.abs(sumP - 1) < 1e-6
  const valid = rows.length > 0 && !badX.some(Boolean) && !badP.some(Boolean) && sumOk
  const law = valid ? parsed.map((r, i) => ({ ...r, i })).sort((a, b) => a.x - b.x) : []
  const E = law.reduce((s, r) => s + r.x * r.p, 0)
  const E2 = law.reduce((s, r) => s + r.x * r.x * r.p, 0)
  const V = Math.max(0, law.reduce((s, r) => s + r.p * (r.x - E) ** 2, 0))
  const sigma = Math.sqrt(V)
  const lawKey = valid ? law.map((r) => `${r.x}:${r.p}`).join('|') : 'invalid'

  // ---------- Simulation ----------
  const sim = useRef({ counts: [] as number[], n: 0, sum: 0, sumSq: 0, hist: [] as [number, number][] })
  const [, setTick] = useState(0)
  const [playing, setPlaying] = useState(false)
  const lawRef = useRef(law)
  lawRef.current = law

  const resetSim = () => {
    sim.current = { counts: lawRef.current.map(() => 0), n: 0, sum: 0, sumSq: 0, hist: [] }
    setTick((t) => t + 1)
  }
  useEffect(() => {
    resetSim()
    setPlaying(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lawKey])

  const draw = (k: number) => {
    const L = lawRef.current
    if (!L.length) return
    const s = sim.current
    const cum: number[] = []
    let acc = 0
    for (const r of L) cum.push((acc += r.p))
    for (let t = 0; t < k; t++) {
      const u = Math.random() * acc
      let j = cum.findIndex((c) => u < c)
      if (j < 0) j = L.length - 1
      const x = L[j].x
      s.counts[j] = (s.counts[j] ?? 0) + 1
      s.n++
      s.sum += x
      s.sumSq += x * x
      s.hist.push([s.n, s.sum / s.n])
      if (s.hist.length > 800) s.hist = s.hist.filter((_, i) => i % 2 === 0 || i === s.hist.length - 1)
    }
    setTick((t) => t + 1)
  }

  useEffect(() => {
    if (!playing) return
    let raf = 0
    const step = () => {
      if (sim.current.n >= 200000) {
        setPlaying(false)
        return
      }
      const n = sim.current.n
      draw(n < 100 ? 1 : n < 1000 ? 5 : n < 10000 ? 40 : 200)
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing])

  const s = sim.current
  const mean = s.n ? s.sum / s.n : NaN
  const empVar = s.n ? Math.max(0, s.sumSq / s.n - mean * mean) : NaN

  // ---------- Édition ----------
  const update = (i: number, k: keyof Row, v: string) => {
    setPreset('custom')
    setRows((rs) => rs.map((r, j) => (j === i ? { ...r, [k]: v } : r)))
  }
  const addRow = () => {
    setPreset('custom')
    setRows((rs) => {
      const xs = rs.map((r) => parseNum(r.x)).filter(Number.isFinite)
      const next = xs.length ? Math.max(...xs) + 1 : 0
      return [...rs, { x: numText(next), p: '0' }]
    })
  }
  const removeRow = (i: number) => {
    setPreset('custom')
    setRows((rs) => (rs.length > 1 ? rs.filter((_, j) => j !== i) : rs))
  }
  const completeLast = () => {
    setPreset('custom')
    setRows((rs) => {
      const others = rs.slice(0, -1).reduce((a, r) => a + (Number.isFinite(parseNum(r.p)) ? parseNum(r.p) : 0), 0)
      const rest = 1 - others
      if (rest < -1e-9) return rs
      const txt = probText(Math.max(0, rest))
      return rs.map((r, j) => (j === rs.length - 1 ? { ...r, p: txt } : r))
    })
  }
  const applyPreset = (id: string) => {
    setPreset(id)
    const p = PRESETS.find((q) => q.id === id)
    if (p) setRows(p.values.map((x, i) => ({ x: numText(x), p: probText(p.probs[i]) })))
  }
  const ctx = PRESETS.find((p) => p.id === preset)?.ctx

  // ---------- Formules ----------
  const short = law.length <= 6
  const eTex = valid
    ? short
      ? `E(X) = ${law.map((r) => `${par(r.x)}\\times ${pTex(r.p)}`).join(' + ')} ${exactTex(E).startsWith('\\approx') ? '' : '='} ${exactTex(E)}`
      : `E(X) = \\sum_{i} x_i\\,p_i ${exactTex(E).startsWith('\\approx') ? '' : '='} ${exactTex(E)}`
    : ''
  const vTex = valid ? `V(X) = E(X^2) - E(X)^2 = ${texNum(E2, 4)} - ${par(E)}^2 ${exactTex(V).startsWith('\\approx') ? '' : '='} ${exactTex(V)}` : ''
  const vDefTex = valid ? (short ? `V(X) = \\sum_i p_i\\,(x_i - E(X))^2 = ${law.map((r) => `${pTex(r.p)}(${texNum(r.x, 3)} ${E >= 0 ? '-' : '+'} ${texNum(Math.abs(E), 3)})^2`).join(' + ')}` : `V(X) = \\sum_i p_i\\,(x_i - E(X))^2`) : ''

  const interp = (() => {
    if (!valid) return null
    let t = `Sur un grand nombre de répétitions, la valeur moyenne de X se rapproche de E(X) ≈ ${fmt(E, 3)} (loi des grands nombres) ; l’écart type σ ≈ ${fmt(sigma, 3)} mesure la dispersion autour de cette moyenne.`
    if (preset === 'jeu' || preset === 'roulette') {
      t += Math.abs(E) < 1e-9 ? ' Le jeu est équitable.' : E > 0 ? ' E(X) > 0 : le jeu est favorable au joueur.' : ' E(X) < 0 : le jeu est défavorable au joueur (favorable à l’organisateur).'
    }
    return t
  })()

  // ---------- Graphiques ----------
  const xs = law.map((r) => r.x)
  const xmin = xs.length ? Math.min(...xs) : 0
  const xmax = xs.length ? Math.max(...xs) : 1
  const span = Math.max(1, xmax - xmin)
  const gaps = xs.slice(1).map((x, i) => x - xs[i])
  const minGap = gaps.length ? Math.min(...gaps) : 1
  const bw = Math.min(minGap, span) * 0.28
  const freqs = law.map((_, j) => (s.n ? (s.counts[j] ?? 0) / s.n : 0))
  const pmax = Math.max(0.05, ...law.map((r) => r.p), ...freqs)
  const pad = span * 0.12 + bw

  const controls = (
    <>
      <div className="flex flex-col gap-1">
        <Label>Exemple</Label>
        <Select value={preset} onChange={(e) => applyPreset(e.target.value)}>
          {preset === 'custom' && <option value="custom">Loi personnalisée</option>}
          {PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <div className="mb-1 grid grid-cols-[1fr_1fr_28px] gap-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          <span>
            <Tex>{'x_i'}</Tex>
          </span>
          <span>
            <Tex>{'P(X = x_i)'}</Tex>
          </span>
          <span />
        </div>
        <div className="flex flex-col gap-1">
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_28px] gap-1">
              <Input value={r.x} onChange={(e) => update(i, 'x', e.target.value)} inputMode="decimal" className={cn('h-8 font-mono', badX[i] && 'border-destructive')} aria-label={`valeur ${i + 1}`} />
              <Input value={r.p} onChange={(e) => update(i, 'p', e.target.value)} inputMode="decimal" className={cn('h-8 font-mono', badP[i] && 'border-destructive')} aria-label={`probabilité ${i + 1}`} />
              <Button size="icon" variant="ghost" className="h-8 w-7" onClick={() => removeRow(i)} disabled={rows.length <= 1} aria-label="Supprimer">
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-1.5 grid grid-cols-2 gap-1">
          <Button size="xs" variant="outline" onClick={addRow} disabled={rows.length >= 10}>
            <Plus /> Valeur
          </Button>
          <Button size="xs" variant="outline" onClick={completeLast} title="La dernière probabilité devient 1 − (somme des autres)">
            <Wand2 /> Compléter
          </Button>
        </div>
        <div className={cn('mt-1.5 font-mono text-xs', sumOk ? 'text-success' : 'text-destructive')}>
          Σ p = {fmt(sumP, 6)} {sumOk ? '✓' : '≠ 1'}
        </div>
        <div className="mt-0.5 text-[11px] text-muted-foreground">Fractions acceptées : 1/6, 3/8…</div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Stat label="E(X)" value={valid ? fmt(E, 4) : '—'} tone="info" />
        <Stat label="V(X)" value={valid ? fmt(V, 4) : '—'} />
        <Stat label="σ(X)" value={valid ? fmt(sigma, 4) : '—'} />
        <Stat label="E(X²)" value={valid ? fmt(E2, 4) : '—'} />
      </div>
    </>
  )

  return (
    <WidgetFrame
      title="Variable aléatoire réelle"
      subtitle={ctx ? `X = ${ctx}` : 'Éditez la loi de probabilité, puis simulez des tirages'}
      controls={controls}
      footer={interp ?? <span className="text-destructive">Loi invalide : valeurs distinctes, probabilités entre 0 et 1 et de somme égale à 1.</span>}
    >
      {valid ? (
        <div className="flex flex-col gap-3">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr>
                  <th className="border bg-muted/40 px-2 py-1 text-left">
                    <Tex>{'x_i'}</Tex>
                  </th>
                  {law.map((r) => (
                    <td key={r.i} className="border px-2 py-1 text-center font-mono tabular-nums">
                      {fmt(r.x, 4)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className="border bg-muted/40 px-2 py-1 text-left">
                    <Tex>{'P(X=x_i)'}</Tex>
                  </th>
                  {law.map((r) => (
                    <td key={r.i} className="border px-2 py-1 text-center">
                      <Tex>{pTex(r.p)}</Tex>
                    </td>
                  ))}
                </tr>
                {s.n > 0 && (
                  <tr>
                    <th className="border bg-muted/40 px-2 py-1 text-left text-xs font-medium" style={{ color: PALETTE.orange }}>
                      fréquence
                    </th>
                    {law.map((r, j) => (
                      <td key={r.i} className="border px-2 py-1 text-center font-mono text-xs tabular-nums" style={{ color: PALETTE.orange }}>
                        {fmt(freqs[j], 3)}
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="min-w-0">
              <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Diagramme en bâtons {s.n > 0 && '— loi (bleu) vs fréquences (orange)'}</div>
              <Plot xMin={xmin - pad} xMax={xmax + pad} yMin={-pmax * 0.12} yMax={pmax * 1.2} width={420} height={260}>
                <Layer>
                  {(p) => (
                    <g>
                      <rect x={p.sx(E - sigma)} y={0} width={Math.max(0, p.sx(E + sigma) - p.sx(E - sigma))} height={p.height} fill={PALETTE.violet} opacity={0.08} />
                      {law.map((r, j) => (
                        <g key={r.i}>
                          <rect x={p.sx(r.x - (s.n ? bw : bw / 2))} y={p.sy(r.p)} width={p.sx(r.x + (s.n ? 0 : bw / 2)) - p.sx(r.x - (s.n ? bw : bw / 2))} height={Math.max(0, p.sy(0) - p.sy(r.p))} fill={PALETTE.blue} opacity={0.85} />
                          {s.n > 0 && <rect x={p.sx(r.x)} y={p.sy(freqs[j])} width={p.sx(r.x + bw) - p.sx(r.x)} height={Math.max(0, p.sy(0) - p.sy(freqs[j]))} fill={PALETTE.orange} opacity={0.85} />}
                        </g>
                      ))}
                      <line x1={p.sx(E)} x2={p.sx(E)} y1={0} y2={p.height} stroke={PALETTE.red} strokeWidth={1.8} strokeDasharray="5 3" />
                      <OutlinedText x={p.sx(E) + 4} y={14} fill={PALETTE.red} size={11}>
                        E(X)
                      </OutlinedText>
                      {sigma > 1e-9 && (
                        <OutlinedText x={p.sx(E + sigma) - 3} y={p.height - 6} anchor="end" fill={PALETTE.violet} size={10} weight={500}>
                          E ± σ
                        </OutlinedText>
                      )}
                    </g>
                  )}
                </Layer>
              </Plot>
            </div>
            <div className="min-w-0">
              <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Moyenne des n premiers tirages</div>
              <Plot xMin={0} xMax={Math.max(10, s.n)} yMin={xmin - span * 0.1} yMax={xmax + span * 0.1} width={420} height={260}>
                <Layer>
                  {(p) => {
                    let d = ''
                    s.hist.forEach(([n, m], i) => {
                      d += `${i ? 'L' : 'M'}${p.sx(n).toFixed(1)},${p.sy(m).toFixed(1)}`
                    })
                    return (
                      <g>
                        <line x1={0} x2={p.width} y1={p.sy(E)} y2={p.sy(E)} stroke={PALETTE.red} strokeWidth={1.8} strokeDasharray="5 3" />
                        <OutlinedText x={p.width - 6} y={p.sy(E) - 6} anchor="end" fill={PALETTE.red} size={11}>
                          E(X)
                        </OutlinedText>
                        <path d={d} fill="none" stroke={PALETTE.orange} strokeWidth={1.8} />
                        {s.n === 0 && (
                          <OutlinedText x={p.width / 2} y={p.height / 2 - 20} anchor="middle" fill={PALETTE.muted} size={12} weight={500}>
                            Lancez une simulation →
                          </OutlinedText>
                        )}
                      </g>
                    )
                  }}
                </Layer>
              </Plot>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Simuler</span>
            {[1, 10, 100, 1000].map((k) => (
              <Button key={k} size="xs" variant="outline" onClick={() => draw(k)}>
                +{k}
              </Button>
            ))}
            <Button size="xs" variant={playing ? 'default' : 'outline'} onClick={() => setPlaying((v) => !v)}>
              {playing ? <Pause /> : <Play />} {playing ? 'Pause' : 'Lecture'}
            </Button>
            <Button size="xs" variant="ghost" onClick={() => { setPlaying(false); resetSim() }}>
              <RotateCcw /> Effacer
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat label="n tirages" value={s.n.toLocaleString('fr-FR')} />
            <Stat label="moyenne x̄" value={s.n ? fmt(mean, 4) : '—'} tone="warning" />
            <Stat label="|x̄ − E(X)|" value={s.n ? fmt(Math.abs(mean - E), 4) : '—'} tone={s.n && Math.abs(mean - E) < 0.05 * Math.max(1, sigma) ? 'success' : undefined} />
            <Stat label="écart type observé" value={s.n ? fmt(Math.sqrt(empVar), 4) : '—'} />
          </div>

          <div className="flex flex-col gap-1.5 text-sm">
            <div className="overflow-x-auto border bg-background px-3 py-1.5">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Espérance</div>
              <Tex>{eTex}</Tex>
            </div>
            <div className="overflow-x-auto border bg-background px-3 py-1.5">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Variance et écart type</div>
              <Tex>{vDefTex}</Tex>
              <div className="mt-1">
                <Tex>{vTex}</Tex>
                <span className="ml-3">
                  <Tex>{`\\sigma(X) = \\sqrt{V(X)} \\approx ${texNum(sigma, 4)}`}</Tex>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center gap-2 border border-dashed bg-dots p-4 text-center text-sm text-muted-foreground">
          <span>La loi saisie n’est pas une loi de probabilité.</span>
          <span className="text-xs">
            Somme actuelle : <span className="font-mono">{fmt(sumP, 6)}</span> — utilisez « Compléter » pour ajuster la dernière probabilité.
          </span>
        </div>
      )}
    </WidgetFrame>
  )
}
