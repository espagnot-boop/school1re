import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { Stat } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { PALETTE } from '@/lib/plot'
import { cn, fmt } from '@/lib/utils'
import { texNum } from './_maths1/expr'
import { Interpretation } from './_maths1/ui'

interface Props {
  /** taux en pourcentage (ex. [10, -20] pour +10 % puis −20 %) ; des décimaux tous < 1 en valeur absolue (ex. [0.1, -0.2]) sont aussi acceptés */
  rates?: number[]
  initial?: number
  title?: string
}

const MAX = 8
const pct = (t: number, d = 2) => `${t > 0 ? '+' : t < 0 ? '−' : ''}${fmt(Math.abs(t), d)} %`
const texPct = (t: number, d = 2) => `${t > 0 ? '+' : t < 0 ? '-' : ''}${texNum(Math.abs(t), d)}\\,\\%`

function normRates(r?: number[]) {
  const v = (r ?? []).filter((x) => typeof x === 'number' && Number.isFinite(x))
  if (!v.length) return [10, -20]
  const fractions = v.every((x) => Math.abs(x) < 1) && v.some((x) => x !== 0)
  return v.slice(0, MAX).map((x) => Math.max(-99, +(fractions ? x * 100 : x).toFixed(4)))
}

export default function PercentEvolution({ rates: r0, initial = 100, title }: Props) {
  const [rates, setRates] = useState<number[]>(() => normRates(r0))
  const [v0, setV0] = useState(initial > 0 ? initial : 100)
  const [v0Text, setV0Text] = useState(String(initial > 0 ? initial : 100).replace('.', ','))

  const cms = rates.map((t) => 1 + t / 100)
  const values = cms.reduce<number[]>((acc, c) => [...acc, acc[acc.length - 1] * c], [v0])
  const cm = cms.reduce((p, c) => p * c, 1)
  const T = (cm - 1) * 100
  const sumRates = rates.reduce((s, t) => s + t, 0)
  const tRec = cm > 0 ? (1 / cm - 1) * 100 : NaN
  const tMoy = cm > 0 ? (Math.pow(cm, 1 / rates.length) - 1) * 100 : NaN
  const n = rates.length

  const setRate = (i: number, v: number) => setRates((rs) => rs.map((t, j) => (j === i ? v : t)))

  // ---------- graphique en barres (SVG) ----------
  const W = 560
  const H = 280
  const top = 34
  const bottom = 40
  const vMax = Math.max(...values) * 1.08
  const slot = (W - 20) / values.length
  const bw = Math.min(64, slot * 0.55)
  const bx = (i: number) => 10 + slot * i + (slot - bw) / 2
  const by = (v: number) => H - bottom - (v / vMax) * (H - top - bottom)

  const cmTex = cms.map((c) => texNum(c, 4)).join(' \\times ')

  return (
    <WidgetFrame
      title={title ?? 'Évolutions successives'}
      subtitle="Coefficients multiplicateurs, taux global, taux réciproque, indices"
      footer={
        <Interpretation>
          {n === 1 ? (
            <>
              Une évolution de {pct(rates[0])} revient à multiplier par <Tex>{`CM = 1 ${rates[0] < 0 ? '-' : '+'} \\frac{${texNum(Math.abs(rates[0]), 2)}}{100} = ${texNum(cms[0], 4)}`}</Tex>. Pour revenir à la
              valeur de départ, il faut une évolution de {pct(tRec)} (et non {pct(-rates[0])}) : on divise par {fmt(cm, 4)}.
            </>
          ) : (
            <>
              Les taux <strong>ne s’additionnent pas</strong> : leur somme vaut {pct(sumRates)}, mais l’évolution globale est de <strong>{pct(T)}</strong> car on multiplie les coefficients (
              <Tex>{`${cmTex} \\approx ${texNum(cm, 4)}`}</Tex>). Ces {n} évolutions équivalent à {n} évolutions identiques de {pct(tMoy)} (taux moyen) ; pour revenir à la valeur initiale, il faudrait une
              évolution de {pct(tRec)}.
            </>
          )}
        </Interpretation>
      }
      controls={
        <>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pe-v0">Valeur initiale V₀</Label>
            <Input
              id="pe-v0"
              inputMode="decimal"
              value={v0Text}
              onChange={(e) => {
                setV0Text(e.target.value)
                const v = parseFloat(e.target.value.replace(',', '.').replace(/\s/g, ''))
                if (Number.isFinite(v) && v > 0) setV0(v)
              }}
              className={cn('font-mono', !(parseFloat(v0Text.replace(',', '.')) > 0) && 'border-destructive')}
            />
            {!(parseFloat(v0Text.replace(',', '.')) > 0) && <span className="text-xs text-destructive">Entrez un nombre strictement positif.</span>}
          </div>
          <div className="flex flex-col gap-3">
            <Label>Évolutions successives</Label>
            {rates.map((t, i) => (
              <div key={i} className="flex items-end gap-2">
                <Slider
                  className="flex-1"
                  label={
                    <span>
                      Étape {i + 1} <span className="font-mono text-[10px]">(CM = {fmt(cms[i], 4)})</span>
                    </span>
                  }
                  value={t}
                  min={Math.min(-90, Math.floor(t))}
                  max={Math.max(200, Math.ceil(t))}
                  step={0.5}
                  digits={2}
                  unit="%"
                  onChange={(v) => setRate(i, v)}
                />
                {rates.length > 1 && (
                  <button type="button" onClick={() => setRates((rs) => rs.filter((_, j) => j !== i))} className="mb-0.5 border p-1 text-muted-foreground hover:bg-accent hover:text-foreground" aria-label={`Supprimer l’étape ${i + 1}`}>
                    <X className="size-3" />
                  </button>
                )}
              </div>
            ))}
            {rates.length < MAX && (
              <Button variant="outline" size="sm" onClick={() => setRates((rs) => [...rs, 10])}>
                <Plus /> Ajouter une évolution
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Button variant="ghost" size="xs" onClick={() => setRates([10, -10])}>
              +10 % puis −10 %
            </Button>
            <Button variant="ghost" size="xs" onClick={() => setRates([50, -50])}>
              +50 % puis −50 %
            </Button>
            <Button variant="ghost" size="xs" onClick={() => setRates([2, 2, 2, 2, 2])}>
              5 × +2 %
            </Button>
          </div>
        </>
      }
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full select-none border bg-background" role="img" aria-label="Valeurs successives">
        <line x1={0} x2={W} y1={by(v0)} y2={by(v0)} stroke={PALETTE.muted} strokeDasharray="5 4" strokeWidth={1} />
        <text x={W - 6} y={by(v0) - 5} textAnchor="end" fontSize={10} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
          niveau initial
        </text>
        <line x1={0} x2={W} y1={H - bottom} y2={H - bottom} stroke={PALETTE.fg} strokeWidth={1.25} />
        {values.map((v, i) => {
          const up = i > 0 && v >= values[i - 1]
          const color = i === 0 ? PALETTE.muted : up ? PALETTE.green : PALETTE.red
          return (
            <g key={i} fontFamily="Geist Mono, monospace">
              <rect x={bx(i)} y={by(v)} width={bw} height={H - bottom - by(v)} fill={color} opacity={i === 0 ? 0.5 : 0.85} />
              <text x={bx(i) + bw / 2} y={by(v) - 6} textAnchor="middle" fontSize={11} fill={PALETTE.fg}>
                {fmt(v, 2)}
              </text>
              <text x={bx(i) + bw / 2} y={H - bottom + 15} textAnchor="middle" fontSize={11} fill={PALETTE.fg} fontFamily="Geist, sans-serif">
                {`V${'₀₁₂₃₄₅₆₇₈'[i]}`}
              </text>
              <text x={bx(i) + bw / 2} y={H - bottom + 30} textAnchor="middle" fontSize={9.5} fill={PALETTE.muted}>
                indice {fmt((v / v0) * 100, 1)}
              </text>
              {i > 0 && (
                <g>
                  <path
                    d={`M${bx(i - 1) + bw + 3},${top - 8} Q${(bx(i - 1) + bw + bx(i)) / 2},${top - 22} ${bx(i) - 3},${top - 8}`}
                    fill="none"
                    stroke={color}
                    strokeWidth={1.25}
                  />
                  <path d={`M${bx(i) - 9},${top - 12} L${bx(i) - 3},${top - 8} L${bx(i) - 10},${top - 5}`} fill="none" stroke={color} strokeWidth={1.25} />
                  <text x={(bx(i - 1) + bw + bx(i)) / 2} y={top - 1} textAnchor="middle" fontSize={10} fill={color}>
                    ×{fmt(cms[i - 1], 3)}
                  </text>
                </g>
              )}
            </g>
          )
        })}
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Stat label="CM global" value={fmt(cm, 4)} />
        <Stat label="Taux global" value={pct(T)} tone={T > 0 ? 'success' : T < 0 ? 'destructive' : undefined} />
        <Stat label="Somme des taux (piège)" value={pct(sumRates)} tone="warning" />
        <Stat label="Taux réciproque" value={pct(tRec)} />
        <Stat label={`Taux moyen (${n} étape${n > 1 ? 's' : ''})`} value={pct(tMoy)} />
        <Stat label={`Valeur finale V${'₀₁₂₃₄₅₆₇₈'[n]}`} value={fmt(values[n], 2)} />
      </div>

      <div className="mt-3 flex flex-col gap-1.5 overflow-x-auto border bg-muted/20 p-3 text-sm">
        <Tex>{`CM_{\\text{global}} = ${cms.map((_, i) => `CM_{${i + 1}}`).join(' \\times ')} = ${cmTex} ${Math.abs(cm - +cm.toFixed(4)) < 1e-12 ? '=' : '\\approx'} ${texNum(cm, 4)}`}</Tex>
        <Tex>{`T = (CM - 1) \\times 100 = ${texPct(T)} \\qquad V_{${n}} = V_0 \\times CM = ${texNum(v0, 2)} \\times ${texNum(cm, 4)} = ${texNum(values[n], 2)}`}</Tex>
        <Tex>{`t_{\\text{réciproque}} = \\left(\\dfrac{1}{CM} - 1\\right) \\times 100 = ${texPct(tRec)} \\qquad t_{\\text{moyen}} = \\left(CM^{1/${n}} - 1\\right) \\times 100 = ${texPct(tMoy)}`}</Tex>
      </div>

      <div className="mt-3 overflow-x-auto border">
        <table className="w-full border-collapse text-xs tabular-nums">
          <thead className="bg-muted/40 text-left">
            <tr>
              {['Étape', 'Taux', 'CM', 'Valeur', 'Indice (base 100)'].map((h) => (
                <th key={h} className="border-r px-2 py-1 font-semibold last:border-r-0">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-mono">
            {values.map((v, i) => (
              <tr key={i} className="border-t">
                <td className="border-r px-2 py-1">{i === 0 ? 'départ' : i}</td>
                <td className={cn('border-r px-2 py-1', i > 0 && (rates[i - 1] >= 0 ? 'text-success' : 'text-destructive'))}>{i === 0 ? '—' : pct(rates[i - 1])}</td>
                <td className="border-r px-2 py-1">{i === 0 ? '—' : fmt(cms[i - 1], 4)}</td>
                <td className="border-r px-2 py-1">{fmt(v, 2)}</td>
                <td className="px-2 py-1">{fmt((v / v0) * 100, 2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </WidgetFrame>
  )
}
