import { useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Tex } from '@/components/Tex'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Select, Label } from '@/components/ui/input'
import { Stat } from '@/components/ui/misc'
import { Badge } from '@/components/ui/badge'
import { PALETTE } from '@/lib/plot'
import { cn } from '@/lib/utils'
import { SvgFormula, equationTex, fmtSig, formulaTex, niceCeil, texSig } from './_chimie/chem'

interface Species {
  formula: string
  coef: number
  n0: number
}
interface Reaction {
  reactants: Species[]
  products: Species[]
}
interface Props {
  reaction?: Reaction
  /** unité des quantités de matière (défaut « mol ») */
  unit?: string
}

const PRESETS: { id: string; label: string; reaction: Reaction }[] = [
  {
    id: 'methane',
    label: 'Combustion du méthane',
    reaction: {
      reactants: [
        { formula: 'CH4', coef: 1, n0: 2.0 },
        { formula: 'O2', coef: 2, n0: 3.0 },
      ],
      products: [
        { formula: 'CO2', coef: 1, n0: 0 },
        { formula: 'H2O', coef: 2, n0: 0 },
      ],
    },
  },
  {
    id: 'fer-cuivre',
    label: 'Fer + ions cuivre(II)',
    reaction: {
      reactants: [
        { formula: 'Fe', coef: 1, n0: 0.05 },
        { formula: 'Cu^2+', coef: 1, n0: 0.02 },
      ],
      products: [
        { formula: 'Fe^2+', coef: 1, n0: 0 },
        { formula: 'Cu', coef: 1, n0: 0 },
      ],
    },
  },
  {
    id: 'aluminium',
    label: 'Combustion de l’aluminium',
    reaction: {
      reactants: [
        { formula: 'Al', coef: 4, n0: 0.4 },
        { formula: 'O2', coef: 3, n0: 0.4 },
      ],
      products: [{ formula: 'Al2O3', coef: 2, n0: 0 }],
    },
  },
  {
    id: 'eau',
    label: 'Synthèse de l’eau (stœchiométrique)',
    reaction: {
      reactants: [
        { formula: 'H2', coef: 2, n0: 2.0 },
        { formula: 'O2', coef: 1, n0: 1.0 },
      ],
      products: [{ formula: 'H2O', coef: 2, n0: 0 }],
    },
  },
  {
    id: 'iodure',
    label: 'Ions iodure + eau oxygénée',
    reaction: {
      reactants: [
        { formula: 'H2O2', coef: 1, n0: 1.0e-3 },
        { formula: 'I^-', coef: 2, n0: 4.0e-3 },
        { formula: 'H^+', coef: 2, n0: 5.0e-3 },
      ],
      products: [
        { formula: 'I2', coef: 1, n0: 0 },
        { formula: 'H2O', coef: 2, n0: 0 },
      ],
    },
  },
]

const SIG = 3
const coefTex = (a: number) => (a === 1 ? '' : String(a).replace('.', '{,}'))

export default function AdvancementTable({ reaction, unit = 'mol' }: Props) {
  const presets = useMemo(() => {
    const valid = reaction && Array.isArray(reaction.reactants) && reaction.reactants.length > 0 && Array.isArray(reaction.products)
    return valid ? [{ id: 'props', label: 'Réaction étudiée', reaction: reaction! }, ...PRESETS] : PRESETS
  }, [reaction])

  const [presetId, setPresetId] = useState(presets[0].id)
  const preset = presets.find((p) => p.id === presetId) ?? presets[0]
  const [n0R, setN0R] = useState<number[]>(() => preset.reaction.reactants.map((s) => s.n0))
  const [x, setX] = useState(0)
  const [playing, setPlaying] = useState(false)

  const choose = (id: string) => {
    const p = presets.find((q) => q.id === id) ?? presets[0]
    setPresetId(p.id)
    setN0R(p.reaction.reactants.map((s) => s.n0))
    setX(0)
    setPlaying(false)
  }

  const R = preset.reaction.reactants.map((s, i) => ({ ...s, n0: n0R[i] ?? s.n0 }))
  const P = preset.reaction.products
  const all = [...R.map((s) => ({ ...s, reactant: true })), ...P.map((s) => ({ ...s, reactant: false }))]

  // Avancement maximal et réactif(s) limitant(s)
  const ratios = R.map((s) => s.n0 / s.coef)
  const xmax = Math.max(0, Math.min(...ratios))
  const tol = 1e-9 * Math.max(1e-12, ...ratios.map(Math.abs))
  const limiting = R.map((_, i) => Math.abs(ratios[i] - xmax) <= tol + 1e-12 * xmax)
  const stoich = limiting.every(Boolean)
  const xc = Math.min(x, xmax)
  const n = (s: Species & { reactant: boolean }, xv: number) => (s.reactant ? s.n0 - s.coef * xv : s.n0 + s.coef * xv)

  // Animation 0 → xmax
  const raf = useRef<number>()
  const last = useRef<number>()
  const xRef = useRef(0)
  xRef.current = xc
  useEffect(() => {
    if (!playing) return
    const step = (t: number) => {
      const dt = last.current === undefined ? 0 : (t - last.current) / 1000
      last.current = t
      const nv = Math.min(xmax, xRef.current + (xmax * dt) / 3)
      xRef.current = nv
      setX(nv)
      if (nv >= xmax) {
        setPlaying(false)
        return
      }
      raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
      last.current = undefined
    }
  }, [playing, xmax])

  const yMax = niceCeil(Math.max(1e-12, ...all.map((s) => Math.max(n(s, 0), n(s, xmax)))))
  const fmtN = (v: number) => fmtSig(Math.abs(v) < 1e-12 * yMax ? 0 : v, SIG)
  const texN = (v: number) => texSig(Math.abs(v) < 1e-12 * yMax ? 0 : v, SIG)

  const limitingNames = R.filter((_, i) => limiting[i]).map((s) => s.formula)
  const excess = R.filter((_, i) => !limiting[i])

  // ---- Diagramme en barres
  const W = 560
  const H = 250
  const padL = 44
  const padB = 38
  const padT = 22
  const plotH = H - padB - padT
  const slot = (W - padL - 10) / all.length
  const bw = Math.min(56, slot * 0.55)
  const yPx = (v: number) => padT + plotH * (1 - v / yMax)

  // ---- Courbes n(x)
  const GW = 560
  const GH = 210
  const gl = 44
  const gb = 26
  const gt = 12
  const gx = (v: number) => gl + ((GW - gl - 12) * v) / Math.max(xmax, 1e-15)
  const gy = (v: number) => gt + (GH - gt - gb) * (1 - v / yMax)
  const color = (s: (typeof all)[number], i: number) =>
    s.reactant ? (limiting[i] ? PALETTE.red : [PALETTE.blue, PALETTE.violet, PALETTE.teal][i % 3]) : [PALETTE.green, PALETTE.orange, PALETTE.pink][(i - R.length) % 3]

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((k) => k * yMax)

  const controls = (
    <>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="adv-preset">Réaction</Label>
        <Select id="adv-preset" value={presetId} onChange={(e) => choose(e.target.value)}>
          {presets.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Quantités initiales</div>
        {R.map((s, i) => {
          const base = preset.reaction.reactants[i].n0
          const max = niceCeil(Math.max(base, 1e-12) * 2.5)
          return (
            <Slider
              key={presetId + i}
              label={
                <span>
                  n₀(<Tex>{formulaTex(s.formula)}</Tex>)
                </span>
              }
              value={s.n0}
              min={0}
              max={max}
              step={max / 200}
              digits={Math.max(0, -Math.floor(Math.log10(max / 200)))}
              unit={unit}
              onChange={(v) => {
                const nn = n0R.slice()
                nn[i] = v
                setN0R(nn)
                setX((xv) => Math.min(xv, Math.min(...R.map((r, j) => (j === i ? v : r.n0) / r.coef))))
              }}
            />
          )
        })}
      </div>
      <Slider
        label="Avancement x"
        value={xc}
        min={0}
        max={Math.max(xmax, 1e-12)}
        step={Math.max(xmax, 1e-12) / 200}
        digits={Math.max(0, -Math.floor(Math.log10(Math.max(xmax, 1e-12) / 200)))}
        unit={unit}
        onChange={(v) => {
          setPlaying(false)
          setX(v)
        }}
      />
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            if (xc >= xmax) setX(0)
            setPlaying((p) => !p)
          }}
          disabled={xmax <= 0}
        >
          {playing ? <Pause /> : <Play />}
          {playing ? 'Pause' : 'Faire réagir'}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setPlaying(false)
            setX(0)
          }}
        >
          <RotateCcw /> x = 0
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setX(xmax)} disabled={xmax <= 0}>
          x = x<sub>max</sub>
        </Button>
      </div>
    </>
  )

  const stateLabel = xc <= 0 ? 'État initial' : xc >= xmax - 1e-15 ? 'État final' : 'En cours'

  return (
    <WidgetFrame
      title="Tableau d’avancement"
      subtitle="Évolution des quantités de matière au cours d’une transformation totale"
      controls={controls}
      footer={
        <span>
          {xmax <= 0 ? (
            <>Un réactif est absent : la transformation ne peut pas avoir lieu.</>
          ) : stoich ? (
            <>
              Mélange <strong>stœchiométrique</strong> : tous les réactifs sont entièrement consommés à l’état final (x<sub>max</sub> = {fmtN(xmax)} {unit}).
            </>
          ) : (
            <>
              Le réactif limitant est{' '}
              {limitingNames.map((f, i) => (
                <span key={f}>
                  {i > 0 && ' et '}
                  <Tex>{formulaTex(f)}</Tex>
                </span>
              ))}{' '}
              : il est entièrement consommé quand x = x<sub>max</sub> = {fmtN(xmax)} {unit}.{' '}
              {excess.length > 0 && (
                <>
                  Il reste alors{' '}
                  {excess.map((s, i) => (
                    <span key={s.formula}>
                      {i > 0 && ', '}
                      {fmtN(s.n0 - s.coef * xmax)} {unit} de <Tex>{formulaTex(s.formula)}</Tex>
                    </span>
                  ))}{' '}
                  (en excès).
                </>
              )}
            </>
          )}
        </span>
      }
    >
      <div className="flex flex-col gap-3">
        <div className="overflow-x-auto border bg-background px-3 py-2 text-center">
          <Tex display>{equationTex(R, P)}</Tex>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {/* Barres */}
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full border bg-background" role="img" aria-label="Quantités de matière">
            <text x={8} y={14} fontSize={11} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
              n ({unit}) — {stateLabel.toLowerCase()}
            </text>
            {ticks.map((t) => (
              <g key={t}>
                <line x1={padL} x2={W - 6} y1={yPx(t)} y2={yPx(t)} stroke={PALETTE.grid} />
                <text x={padL - 5} y={yPx(t) + 3} fontSize={10} textAnchor="end" fill={PALETTE.muted} fontFamily="Geist Mono, monospace">
                  {fmtSig(t, 2)}
                </text>
              </g>
            ))}
            <line x1={padL} x2={padL} y1={padT} y2={H - padB} stroke={PALETTE.fg} />
            {R.length > 0 && P.length > 0 && (
              <line
                x1={padL + slot * R.length}
                x2={padL + slot * R.length}
                y1={padT - 6}
                y2={H - padB + 30}
                stroke={PALETTE.muted}
                strokeDasharray="3 3"
              />
            )}
            {all.map((s, i) => {
              const cx = padL + slot * (i + 0.5)
              const v = Math.max(0, n(s, xc))
              const vEnd = Math.max(0, n(s, xmax))
              const v0 = n(s, 0)
              const col = color(s, i)
              return (
                <g key={i}>
                  <rect x={cx - bw / 2} y={yPx(v)} width={bw} height={yPx(0) - yPx(v)} fill={col} fillOpacity={0.85} />
                  <rect x={cx - bw / 2} y={yPx(v0)} width={bw} height={yPx(0) - yPx(v0)} fill="none" stroke={col} strokeDasharray="4 3" strokeOpacity={0.7} />
                  <line x1={cx - bw / 2 - 4} x2={cx + bw / 2 + 4} y1={yPx(vEnd)} y2={yPx(vEnd)} stroke={col} strokeWidth={2} />
                  <text x={cx} y={yPx(v) - 5} fontSize={11} textAnchor="middle" fill={PALETTE.fg} fontFamily="Geist Mono, monospace">
                    {fmtN(v)}
                  </text>
                  <SvgFormula f={s.formula} x={cx} y={H - padB + 18} size={13} />
                  {s.reactant && limiting[i] && !stoich && (
                    <text x={cx} y={H - padB + 32} fontSize={9} textAnchor="middle" fill={PALETTE.red} fontFamily="Geist, sans-serif" fontWeight={600}>
                      LIMITANT
                    </text>
                  )}
                </g>
              )
            })}
            <text x={W - 8} y={14} fontSize={10} textAnchor="end" fill={PALETTE.muted} fontFamily="Geist, sans-serif">
              ┅ initial · ━ final
            </text>
          </svg>

          {/* Courbes n(x) */}
          <svg viewBox={`0 0 ${GW} ${GH}`} className="h-auto w-full border bg-background" role="img" aria-label="Quantités en fonction de l’avancement">
            {ticks.map((t) => (
              <g key={t}>
                <line x1={gl} x2={GW - 12} y1={gy(t)} y2={gy(t)} stroke={PALETTE.grid} />
                <text x={gl - 5} y={gy(t) + 3} fontSize={10} textAnchor="end" fill={PALETTE.muted} fontFamily="Geist Mono, monospace">
                  {fmtSig(t, 2)}
                </text>
              </g>
            ))}
            <line x1={gl} x2={GW - 12} y1={gy(0)} y2={gy(0)} stroke={PALETTE.fg} />
            <line x1={gl} x2={gl} y1={gt} y2={gy(0)} stroke={PALETTE.fg} />
            <text x={GW - 12} y={GH - 6} fontSize={11} textAnchor="end" fill={PALETTE.fg} fontFamily="Geist, sans-serif">
              x ({unit})
            </text>
            <text x={gl} y={GH - 6} fontSize={10} textAnchor="middle" fill={PALETTE.muted} fontFamily="Geist Mono, monospace">
              0
            </text>
            {xmax > 0 && (
              <>
                <text x={gx(xmax)} y={GH - 6} fontSize={10} textAnchor="end" fill={PALETTE.muted} fontFamily="Geist Mono, monospace">
                  xmax = {fmtN(xmax)}
                </text>
                {all.map((s, i) => (
                  <g key={i}>
                    <line x1={gx(0)} y1={gy(n(s, 0))} x2={gx(xmax)} y2={gy(Math.max(0, n(s, xmax)))} stroke={color(s, i)} strokeWidth={2} />
                    <SvgFormula f={s.formula} x={gx(xmax) - 4} y={gy(Math.max(0, n(s, xmax))) - 5} size={11} anchor="end" fill={color(s, i)} />
                  </g>
                ))}
                <line x1={gx(xc)} x2={gx(xc)} y1={gt} y2={gy(0)} stroke={PALETTE.fg} strokeDasharray="4 3" />
                {all.map((s, i) => (
                  <rect key={'p' + i} x={gx(xc) - 3} y={gy(Math.max(0, n(s, xc))) - 3} width={6} height={6} fill={color(s, i)} />
                ))}
              </>
            )}
          </svg>
        </div>

        {/* Tableau d'avancement */}
        <div className="overflow-x-auto border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="border-b border-r px-2 py-1.5 text-left text-xs font-medium">État</th>
                <th className="border-b border-r px-2 py-1.5 text-xs font-medium">Avancement</th>
                {all.map((s, i) => (
                  <th key={i} className={cn('border-b px-2 py-1.5', i < all.length - 1 && 'border-r')}>
                    <Tex>{`${coefTex(s.coef)}\\,${formulaTex(s.formula)}`}</Tex>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              {[
                { label: 'Initial', xv: 0, sym: '0', active: xc <= 0 },
                { label: 'En cours', xv: xc, sym: 'x', active: xc > 0 && xc < xmax },
                { label: 'Final', xv: xmax, sym: 'x_{\\max}', active: xc >= xmax && xmax > 0 },
              ].map((row) => (
                <tr key={row.label} className={cn(row.active && 'bg-primary/5')}>
                  <td className="border-b border-r px-2 py-1.5 font-sans text-xs font-medium">
                    {row.label}
                    {row.active && <span className="ml-1 text-muted-foreground">◂</span>}
                  </td>
                  <td className="border-b border-r px-2 py-1.5 text-center">
                    <Tex>{row.sym === 'x' ? `x = ${texN(xc)}` : row.sym === '0' ? '0' : `x_{\\max} = ${texN(xmax)}`}</Tex>
                  </td>
                  {all.map((s, i) => {
                    const sign = s.reactant ? '-' : '+'
                    const c = coefTex(s.coef)
                    const lit =
                      row.sym === '0'
                        ? texN(s.n0)
                        : `${s.n0 === 0 && !s.reactant ? '' : texN(s.n0) + ' ' + sign + ' '}${c}${row.sym}`
                    const val = n(s, row.xv)
                    const zero = Math.abs(val) < 1e-12 * yMax
                    return (
                      <td key={i} className={cn('border-b px-2 py-1.5 text-center', i < all.length - 1 && 'border-r')}>
                        <div>
                          <Tex>{lit}</Tex>
                        </div>
                        {row.sym !== '0' && (
                          <div className={cn('mt-0.5 text-[11px]', zero && s.reactant ? 'font-semibold text-destructive' : 'text-muted-foreground')}>
                            = {fmtN(val)} {unit}
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Avancement x" value={`${fmtN(xc)} ${unit}`} />
          <Stat label="x max" value={`${fmtN(xmax)} ${unit}`} tone="info" />
          <Stat
            label="Réactif limitant"
            value={
              stoich ? (
                'aucun (stœchio.)'
              ) : (
                <span className="flex flex-wrap gap-1">
                  {limitingNames.map((f) => (
                    <Tex key={f}>{formulaTex(f)}</Tex>
                  ))}
                </span>
              )
            }
            tone={stoich ? 'success' : 'destructive'}
          />
          <Stat label="Progression" value={xmax > 0 ? `${Math.round((100 * xc) / xmax)} %` : '—'} />
        </div>

        <div className="flex flex-col gap-2 border bg-muted/20 p-3 text-sm">
          <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Recherche de x<sub>max</sub></div>
          <div className="flex flex-wrap items-center gap-2">
            {R.map((s, i) => (
              <Badge key={i} variant={limiting[i] ? 'destructive' : 'outline'} className="normal-case">
                <Tex>{`\\frac{n_0(${formulaTex(s.formula)})}{${s.coef}} = ${texN(ratios[i])}`}</Tex>
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            On suppose chaque réactif limitant à tour de rôle : <Tex>{String.raw`n_0 - a\,x_{\max} = 0 \Rightarrow x_{\max} = \frac{n_0}{a}`}</Tex>. La plus petite
            valeur est la bonne : <Tex>{`x_{\\max} = ${texN(xmax)}\\ \\text{${unit}}`}</Tex>.
          </p>
        </div>
      </div>
    </WidgetFrame>
  )
}
