import { useMemo, useState } from 'react'
import { Dices, Eye } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Tex } from '@/components/Tex'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Input, Label, Select } from '@/components/ui/input'
import { Segmented } from '@/components/ui/tabs'
import { Stat, Switch } from '@/components/ui/misc'
import { PALETTE } from '@/lib/plot'
import { cn } from '@/lib/utils'
import { fmtSig, niceCeil, rgbCss, texSig, transmittedColor, wavelengthCss, wavelengthName, wavelengthRGB } from './_chimie/chem'

interface Props {
  /** coefficient d'absorption molaire (L·mol⁻¹·cm⁻¹) */
  epsilon?: number
  /** largeur de la cuve (cm) */
  l?: number
  /** longueur d'onde de travail (nm) */
  lambda?: number
  /** nom de l'espèce colorée */
  species?: string
}

interface Preset {
  id: string
  label: string
  species: string
  epsilon: number
  lambda: number
  width: number // largeur de la bande d'absorption (nm)
}

const PRESETS: Preset[] = [
  { id: 'mno4', label: 'Permanganate (MnO₄⁻) — 525 nm', species: 'ions permanganate MnO₄⁻', epsilon: 2.3e3, lambda: 525, width: 45 },
  { id: 'e133', label: 'Bleu brillant E133 — 630 nm', species: 'bleu brillant E133', epsilon: 1.3e5, lambda: 630, width: 50 },
  { id: 'cu', label: 'Ions cuivre(II) Cu²⁺ — 800 nm', species: 'ions cuivre(II) Cu²⁺', epsilon: 12, lambda: 800, width: 140 },
  { id: 'e102', label: 'Tartrazine E102 — 427 nm', species: 'tartrazine E102', epsilon: 2.7e4, lambda: 427, width: 45 },
]

/** Choisit une unité lisible pour une échelle de concentrations en mol/L */
function concUnit(cMax: number): { f: number; u: string; tex: string } {
  if (cMax < 1e-4) return { f: 1e6, u: 'µmol/L', tex: '\\mu\\text{mol·L}^{-1}' }
  if (cMax < 0.1) return { f: 1e3, u: 'mmol/L', tex: '\\text{mmol·L}^{-1}' }
  return { f: 1, u: 'mol/L', tex: '\\text{mol·L}^{-1}' }
}

function rng(seed: number) {
  let s = seed
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280)
}

export default function BeerLambert({ epsilon, l, lambda, species }: Props) {
  const presets = useMemo<Preset[]>(() => {
    if (epsilon === undefined && lambda === undefined) return PRESETS
    const lam = lambda ?? 525
    return [
      { id: 'props', label: `${species ?? 'Solution étudiée'} — ${lam} nm`, species: species ?? 'espèce colorée', epsilon: epsilon ?? 2.3e3, lambda: lam, width: 45 },
      ...PRESETS,
    ]
  }, [epsilon, lambda, species])

  const [pid, setPid] = useState(presets[0].id)
  const pre = presets.find((p) => p.id === pid) ?? presets[0]
  const l0 = l ?? 1
  const [L, setL] = useState(l0)
  // Échelle des concentrations : A ≈ 2 au maximum pour la cuve initiale
  const cMax = niceCeil(2 / (pre.epsilon * l0))
  const unit = concUnit(cMax)
  const [cRel, setCRel] = useState(0.4) // fraction de cMax
  const c = cRel * cMax
  const A = pre.epsilon * L * c
  const T = Math.pow(10, -A)

  const [tab, setTab] = useState<'mesure' | 'etalonnage'>('mesure')
  const [seed, setSeed] = useState(7)
  const cx = useMemo(() => {
    const r = rng(seed)
    r()
    return (0.12 + 0.7 * r()) * cMax
  }, [seed, cMax])
  const Ax = Math.round(pre.epsilon * L * cx * 1000) / 1000
  const [guess, setGuess] = useState('')
  const [reveal, setReveal] = useState(false)
  const [construct, setConstruct] = useState(true)

  // Couleur perçue (bande d'absorption gaussienne centrée sur λmax)
  const sol = transmittedColor([{ lambda: pre.lambda, width: pre.width, A: Math.min(A, 6) }])
  const solX = transmittedColor([{ lambda: pre.lambda, width: pre.width, A: Math.min(Ax, 6) }])
  const beam = wavelengthRGB(pre.lambda)
  const beamCss = beam ? rgbCss(beam) : PALETTE.muted
  const absorbedName = pre.lambda > 750 ? 'rouge (et proche infrarouge)' : wavelengthName(pre.lambda)

  const choose = (id: string) => {
    setPid(id)
    setCRel(0.4)
    setGuess('')
    setReveal(false)
  }

  // Étalons : 5 solutions régulièrement espacées
  const standards = [1, 2, 3, 4, 5].map((k) => {
    const ck = (k * cMax) / 6
    return { c: ck, A: Math.round(pre.epsilon * L * ck * 1000) / 1000 }
  })
  // Régression linéaire passant par l'origine : k = Σ(cA)/Σ(c²)
  const kFit = standards.reduce((s, p) => s + p.c * p.A, 0) / standards.reduce((s, p) => s + p.c * p.c, 0)

  const guessVal = parseFloat(guess.replace(',', '.'))
  const guessMol = Number.isFinite(guessVal) ? guessVal / unit.f : NaN
  const err = Number.isFinite(guessMol) ? Math.abs(guessMol - cx) / cx : NaN

  // ---- Schéma du spectrophotomètre
  const SW = 560
  const SH = 190
  const beamY = 92
  const cuvX = 268
  const cuvW = 40 + 22 * Math.min(L, 4)
  const outI = Math.max(0.04, T)

  const cuvette = (fill: [number, number, number], x: number, w: number, label?: string) => (
    <g>
      <rect x={x - 2} y={42} width={w + 4} height={110} fill="none" stroke={PALETTE.fg} strokeWidth={1.5} />
      <rect x={x} y={56} width={w} height={94} fill={rgbCss(fill)} />
      <line x1={x} x2={x + w} y1={56} y2={56} stroke={PALETTE.fg} strokeOpacity={0.4} />
      {label && (
        <text x={x + w / 2} y={170} textAnchor="middle" fontSize={11} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
          {label}
        </text>
      )}
    </g>
  )

  // ---- Graphe A = f(c)
  const GW = 560
  const GH = 300
  const gl = 50
  const gb = 36
  const gt = 14
  const gr = 14
  const yTop = niceCeil(Math.max(pre.epsilon * L * cMax, 0.5) * 1.05)
  const X = (cv: number) => gl + ((GW - gl - gr) * cv) / cMax
  const Y = (av: number) => gt + (GH - gt - gb) * (1 - av / yTop)
  const xt = [0, 0.2, 0.4, 0.6, 0.8, 1].map((k) => k * cMax)
  const yt = Array.from({ length: 6 }, (_, k) => (k * yTop) / 5)

  const controls = (
    <>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="bl-preset">Espèce colorée</Label>
        <Select id="bl-preset" value={pid} onChange={(e) => choose(e.target.value)}>
          {presets.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </Select>
      </div>
      <Slider
        label="Concentration c"
        value={c * unit.f}
        min={0}
        max={cMax * unit.f}
        step={(cMax * unit.f) / 200}
        digits={Math.max(0, 2 - Math.floor(Math.log10(cMax * unit.f)))}
        unit={unit.u}
        onChange={(v) => setCRel(v / (cMax * unit.f))}
      />
      <Slider label="Largeur de cuve ℓ" value={L} min={0.2} max={5} step={0.1} digits={1} unit="cm" onChange={setL} />
      <div className="border bg-background p-2 text-xs text-muted-foreground">
        <Tex>{`\\varepsilon = ${texSig(pre.epsilon, 2)}\\ \\text{L·mol}^{-1}\\text{·cm}^{-1}`}</Tex>
        <div className="mt-1">
          Mesure à <span className="font-mono text-foreground">λ = {pre.lambda} nm</span> ({absorbedName}), longueur d’onde du maximum d’absorption.
        </div>
      </div>
      <Segmented
        value={tab}
        onChange={setTab}
        options={[
          { value: 'mesure', label: 'Mesure' },
          { value: 'etalonnage', label: 'Dosage par étalonnage' },
        ]}
      />
    </>
  )

  return (
    <WidgetFrame
      title="Loi de Beer-Lambert"
      subtitle="Absorbance d’une solution colorée : A = ε · ℓ · c"
      controls={controls}
      footer={
        tab === 'mesure' ? (
          <span>
            La solution absorbe surtout le <strong>{absorbedName}</strong> ({pre.lambda} nm) : elle prend la couleur complémentaire. A est{' '}
            <strong>proportionnelle</strong> à c et à ℓ : doubler la concentration double l’absorbance
            {A > 1.5 ? (
              <span className="text-warning"> — attention, au-delà de A ≈ 1,5 la loi n’est plus vérifiée expérimentalement (solution trop concentrée : diluer).</span>
            ) : (
              '.'
            )}
          </span>
        ) : (
          <span>
            On mesure l’absorbance de solutions étalons, on trace A = f(c) : une droite passant par l’origine. L’absorbance de la solution inconnue, reportée sur la
            droite, donne sa concentration.
          </span>
        )
      }
    >
      <div className="flex flex-col gap-3">
        {tab === 'mesure' ? (
          <>
            <svg viewBox={`0 0 ${SW} ${SH}`} className="h-auto w-full border bg-background" role="img" aria-label="Spectrophotomètre">
              <defs>
                <linearGradient id="bl-beam-out" x1="0" x2="1">
                  <stop offset="0%" stopColor={beamCss} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={beamCss} stopOpacity={0.9 * outI} />
                </linearGradient>
              </defs>
              {/* source */}
              <rect x={20} y={beamY - 22} width={54} height={44} fill="none" stroke={PALETTE.fg} strokeWidth={1.5} />
              <text x={47} y={beamY + 4} textAnchor="middle" fontSize={11} fill={PALETTE.fg} fontFamily="Geist, sans-serif">
                source
              </text>
              {/* monochromateur */}
              <path d={`M110,${beamY - 26} L140,${beamY + 22} L80,${beamY + 22} Z`} transform={`translate(${30},0)`} fill="none" stroke={PALETTE.fg} strokeWidth={1.5} />
              <text x={140} y={beamY + 40} textAnchor="middle" fontSize={10} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
                monochromateur
              </text>
              <line x1={74} x2={118} y1={beamY} y2={beamY} stroke={PALETTE.muted} strokeWidth={3} strokeDasharray="2 2" />
              {/* faisceau incident */}
              <line x1={160} x2={cuvX - 2} y1={beamY} y2={beamY} stroke={beamCss} strokeWidth={6} opacity={0.9} />
              <text x={(160 + cuvX) / 2} y={beamY - 10} textAnchor="middle" fontSize={11} fill={PALETTE.fg} fontFamily="Geist, sans-serif">
                I₀ · {pre.lambda} nm
              </text>
              {/* faisceau dans la cuve */}
              {cuvette(sol, cuvX, cuvW, `cuve ℓ = ${fmtSig(L, 2)} cm`)}
              <rect x={cuvX} y={beamY - 3} width={cuvW} height={6} fill="url(#bl-beam-out)" />
              {/* faisceau transmis */}
              <line x1={cuvX + cuvW + 2} x2={470} y1={beamY} y2={beamY} stroke={beamCss} strokeWidth={6} opacity={0.9 * outI} />
              <text x={(cuvX + cuvW + 470) / 2} y={beamY - 10} textAnchor="middle" fontSize={11} fill={PALETTE.fg} fontFamily="Geist, sans-serif">
                I = {fmtSig(100 * T, 3)} % I₀
              </text>
              {/* détecteur */}
              <rect x={470} y={beamY - 30} width={70} height={60} fill="none" stroke={PALETTE.fg} strokeWidth={1.5} />
              <text x={505} y={beamY - 12} textAnchor="middle" fontSize={10} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
                détecteur
              </text>
              <text x={505} y={beamY + 12} textAnchor="middle" fontSize={15} fill={PALETTE.fg} fontFamily="Geist Mono, monospace" fontWeight={600}>
                {A.toFixed(3).replace('.', ',')}
              </text>
              <text x={505} y={beamY + 25} textAnchor="middle" fontSize={9} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
                absorbance
              </text>
            </svg>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Stat label="Concentration c" value={`${fmtSig(c * unit.f, 3)} ${unit.u}`} />
              <Stat label="Absorbance A" value={A.toFixed(3).replace('.', ',')} tone={A > 1.5 ? 'warning' : 'info'} />
              <Stat label="Transmittance T" value={`${fmtSig(100 * T, 3)} %`} />
              <Stat
                label="Couleur perçue"
                value={
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-4 border" style={{ background: rgbCss(sol) }} />
                    <span className="text-xs">compl. du {absorbedName}</span>
                  </span>
                }
              />
            </div>
            <div className="overflow-x-auto border bg-background px-3 py-2 text-center">
              <Tex display>{`A = \\varepsilon\\,\\ell\\,c = ${texSig(pre.epsilon, 2)} \\times ${texSig(L, 2)} \\times ${texSig(c, 3)} = ${texSig(A, 3)}`}</Tex>
              <div className="text-xs text-muted-foreground">
                <Tex>{String.raw`\varepsilon \text{ en L·mol}^{-1}\text{·cm}^{-1},\ \ \ell \text{ en cm},\ \ c \text{ en mol·L}^{-1},\ \ A \text{ sans unité} ;\quad T = \frac{I}{I_0} = 10^{-A}`}</Tex>
              </div>
            </div>
          </>
        ) : (
          <>
            <svg viewBox={`0 0 ${GW} ${GH}`} className="h-auto w-full border bg-background" role="img" aria-label="Courbe d’étalonnage">
              {xt.map((v) => (
                <g key={'x' + v}>
                  <line x1={X(v)} x2={X(v)} y1={gt} y2={Y(0)} stroke={PALETTE.grid} />
                  <text x={X(v)} y={Y(0) + 14} textAnchor="middle" fontSize={10} fill={PALETTE.muted} fontFamily="Geist Mono, monospace">
                    {fmtSig(v * unit.f, 2)}
                  </text>
                </g>
              ))}
              {yt.map((v) => (
                <g key={'y' + v}>
                  <line x1={gl} x2={GW - gr} y1={Y(v)} y2={Y(v)} stroke={PALETTE.grid} />
                  <text x={gl - 5} y={Y(v) + 3} textAnchor="end" fontSize={10} fill={PALETTE.muted} fontFamily="Geist Mono, monospace">
                    {fmtSig(v, 2)}
                  </text>
                </g>
              ))}
              <line x1={gl} x2={GW - gr} y1={Y(0)} y2={Y(0)} stroke={PALETTE.fg} />
              <line x1={gl} x2={gl} y1={gt} y2={Y(0)} stroke={PALETTE.fg} />
              <text x={GW - gr} y={GH - 4} textAnchor="end" fontSize={11} fill={PALETTE.fg} fontFamily="Geist, sans-serif">
                c ({unit.u})
              </text>
              <text x={gl + 6} y={gt + 10} fontSize={11} fill={PALETTE.fg} fontFamily="Geist, sans-serif">
                A
              </text>
              {/* droite modélisée */}
              <line x1={X(0)} y1={Y(0)} x2={X(cMax)} y2={Y(kFit * cMax)} stroke={PALETTE.blue} strokeWidth={2} />
              {/* zone de non-linéarité */}
              {yTop > 1.5 && <rect x={gl} y={gt} width={GW - gl - gr} height={Y(1.5) - gt} fill={PALETTE.orange} opacity={0.07} />}
              {yTop > 1.5 && (
                <text x={GW - gr - 4} y={Y(1.5) - 4} textAnchor="end" fontSize={9} fill={PALETTE.orange} fontFamily="Geist, sans-serif">
                  A &gt; 1,5 : écart possible à la linéarité
                </text>
              )}
              {standards.map((p, i) => (
                <g key={i}>
                  <rect x={X(p.c) - 4} y={Y(p.A) - 4} width={8} height={8} fill={PALETTE.blue} />
                  <text x={X(p.c) - 7} y={Y(p.A) - 7} textAnchor="end" fontSize={10} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
                    S{i + 1}
                  </text>
                </g>
              ))}
              {/* inconnue */}
              {construct && (
                <g stroke={PALETTE.red} strokeDasharray="5 4" strokeWidth={1.5}>
                  <line x1={gl} x2={X(Ax / kFit)} y1={Y(Ax)} y2={Y(Ax)} />
                  <line x1={X(Ax / kFit)} x2={X(Ax / kFit)} y1={Y(Ax)} y2={Y(0)} />
                </g>
              )}
              <rect x={gl - 4} y={Y(Ax) - 4} width={8} height={8} fill={PALETTE.red} transform={`rotate(45 ${gl} ${Y(Ax)})`} />
              <text x={gl + 8} y={Y(Ax) - 6} fontSize={11} fill={PALETTE.red} fontFamily="Geist, sans-serif" fontWeight={600}>
                Aₓ = {Ax.toFixed(3).replace('.', ',')}
              </text>
              {construct && reveal && (
                <text x={X(Ax / kFit) + 5} y={Y(0) - 6} fontSize={11} fill={PALETTE.red} fontFamily="Geist, sans-serif" fontWeight={600}>
                  cₓ
                </text>
              )}
            </svg>

            <div className="grid gap-3 md:grid-cols-[1fr_1fr]">
              <div className="overflow-x-auto border">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border-b border-r px-2 py-1 text-left font-medium">Solution</th>
                      {standards.map((_, i) => (
                        <th key={i} className="border-b border-r px-2 py-1 font-medium last:border-r-0">
                          S{i + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    <tr>
                      <td className="border-b border-r px-2 py-1 font-sans">c ({unit.u})</td>
                      {standards.map((p, i) => (
                        <td key={i} className="border-b border-r px-2 py-1 text-center last:border-r-0">
                          {fmtSig(p.c * unit.f, 3)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border-r px-2 py-1 font-sans">A</td>
                      {standards.map((p, i) => (
                        <td key={i} className="border-r px-2 py-1 text-center last:border-r-0">
                          {p.A.toFixed(3).replace('.', ',')}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border-r border-t px-2 py-1 font-sans">teinte</td>
                      {standards.map((p, i) => (
                        <td key={i} className="border-r border-t px-1 py-1 last:border-r-0">
                          <div className="mx-auto h-4 w-6 border" style={{ background: rgbCss(transmittedColor([{ lambda: pre.lambda, width: pre.width, A: p.A }])) }} />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col gap-2 border bg-muted/20 p-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-8 border" style={{ background: rgbCss(solX) }} title="solution inconnue" />
                  <div className="text-sm">
                    Solution inconnue : <span className="font-mono">Aₓ = {Ax.toFixed(3).replace('.', ',')}</span>
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor="bl-guess">Votre cₓ ({unit.u})</Label>
                    <Input id="bl-guess" inputMode="decimal" value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="ex. 0,35" />
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setReveal(true)}>
                    <Eye /> Corrigé
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setSeed((s) => s + 1)
                      setGuess('')
                      setReveal(false)
                    }}
                    title="Nouvel échantillon"
                  >
                    <Dices />
                  </Button>
                </div>
                {Number.isFinite(err) && (
                  <div className={cn('text-xs font-medium', err < 0.03 ? 'text-success' : err < 0.1 ? 'text-warning' : 'text-destructive')}>
                    {err < 0.03 ? 'Bravo, lecture correcte' : err < 0.1 ? 'Proche, affinez la lecture' : 'Non : reprenez la construction graphique'} (écart {fmtSig(100 * err, 2)} %)
                  </div>
                )}
                <Switch checked={construct} onChange={setConstruct} label="Construction graphique" />
                {reveal && (
                  <div className="text-xs">
                    <Tex>{`c_x = \\frac{A_x}{k} = \\frac{${texSig(Ax, 3)}}{${texSig(kFit, 3)}} = ${texSig(Ax / kFit, 3)}\\ \\text{mol·L}^{-1}`}</Tex>
                    <div className="mt-1 text-muted-foreground">
                      avec k = ε·ℓ, coefficient directeur de la droite d’étalonnage ({fmtSig(kFit, 3)} L/mol).
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        <div className="flex h-3 w-full" aria-hidden>
          {Array.from({ length: 60 }, (_, i) => {
            const lam = 380 + (400 * i) / 59
            return <div key={i} className="h-full flex-1" style={{ background: wavelengthCss(lam), opacity: Math.abs(lam - pre.lambda) < pre.width ? 1 : 0.35 }} />
          })}
        </div>
        <div className="-mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">
          <span>380 nm</span>
          <span>bande absorbée (vive) ≈ {pre.lambda} nm</span>
          <span>780 nm</span>
        </div>
      </div>
    </WidgetFrame>
  )
}
