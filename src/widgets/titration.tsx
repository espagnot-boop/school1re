import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, Dices, Pause, Play, RotateCcw } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Tex } from '@/components/Tex'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Label, Select } from '@/components/ui/input'
import { Segmented } from '@/components/ui/tabs'
import { Stat, Switch } from '@/components/ui/misc'
import { PALETTE } from '@/lib/plot'
import { cn } from '@/lib/utils'
import { fmtSig, formulaTex, formulaText, niceCeil, rgbCss, texSig, transmittedColor, type Band } from './_chimie/chem'

type ReactionId = 'permanganate' | 'thiosulfate' | 'acide-base'

interface Props {
  /** concentration de l'espèce titrée (mol/L) */
  cA?: number
  /** volume de solution titrée prélevé (mL) */
  vA?: number
  /** concentration du réactif titrant (mol/L) */
  cB?: number
  reaction?: ReactionId
  mode?: 'colorimetrique' | 'conductimetrique'
}

interface RDef {
  label: string
  titre: string // espèce titrée
  titrant: string
  a: number // coefficient de l'espèce titrée
  b: number // coefficient du titrant
  eq: string
  defaults: { cA: number; vA: number; cB: number }
  indicator: string
}

const REACTIONS: Record<ReactionId, RDef> = {
  permanganate: {
    label: 'Ions fer(II) par les ions permanganate',
    titre: 'Fe^2+',
    titrant: 'MnO4^-',
    a: 5,
    b: 1,
    eq: String.raw`\mathrm{MnO_4^-} + 5\,\mathrm{Fe^{2+}} + 8\,\mathrm{H^+} \longrightarrow \mathrm{Mn^{2+}} + 5\,\mathrm{Fe^{3+}} + 4\,\mathrm{H_2O}`,
    defaults: { cA: 0.1, vA: 10, cB: 0.02 },
    indicator: 'Les ions permanganate (violets) sont décolorés tant qu’il reste des ions Fe²⁺ : la persistance de la teinte rose signale l’équivalence.',
  },
  thiosulfate: {
    label: 'Diiode par les ions thiosulfate',
    titre: 'I2',
    titrant: 'S2O3^2-',
    a: 1,
    b: 2,
    eq: String.raw`\mathrm{I_2} + 2\,\mathrm{S_2O_3^{2-}} \longrightarrow 2\,\mathrm{I^-} + \mathrm{S_4O_6^{2-}}`,
    defaults: { cA: 0.01, vA: 20, cB: 0.02 },
    indicator: 'Le diiode (brun-jaune) est la seule espèce colorée : l’équivalence est repérée par la décoloration. L’empois d’amidon (bleu foncé avec I₂) rend le virage plus net.',
  },
  'acide-base': {
    label: 'Acide chlorhydrique par la soude',
    titre: 'H3O^+',
    titrant: 'HO^-',
    a: 1,
    b: 1,
    eq: String.raw`\mathrm{H_3O^+} + \mathrm{HO^-} \longrightarrow 2\,\mathrm{H_2O}`,
    defaults: { cA: 0.01, vA: 20, cB: 0.02 },
    indicator: 'Le bleu de bromothymol (BBT) est jaune en milieu acide, vert à l’équivalence (pH ≈ 7), bleu en milieu basique.',
  },
}

// Conductivités molaires ioniques à 25 °C (mS·m²·mol⁻¹)
const LAMBDA = { H3O: 34.98, HO: 19.86, Na: 5.01, Cl: 7.63 }
const V_WATER = 100 // mL d'eau ajoutés pour le suivi conductimétrique

function rng(seed: number) {
  let s = seed
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280)
}

export default function Titration({ cA, vA, cB, reaction = 'permanganate', mode = 'colorimetrique' }: Props) {
  const [rid, setRid] = useState<ReactionId>(REACTIONS[reaction] ? reaction : 'permanganate')
  const R = REACTIONS[rid]
  const conc = {
    cA: cA ?? R.defaults.cA,
    vA: vA ?? R.defaults.vA,
    cB: cB ?? R.defaults.cB,
  }
  const [suivi, setSuivi] = useState<'colorimetrique' | 'conductimetrique'>(mode)
  const conducto = rid === 'acide-base' && suivi === 'conductimetrique'
  const [starch, setStarch] = useState(false)

  // Mode exercice : concentration inconnue
  const [unknown, setUnknown] = useState(false)
  const [seed, setSeed] = useState(3)
  const cTrue = useMemo(() => {
    if (!unknown) return conc.cA
    const r = rng(seed)
    r()
    return conc.cA * (0.6 + 0.8 * r())
  }, [unknown, seed, conc.cA])
  const [answer, setAnswer] = useState<number | null>(null)

  const nA = cTrue * conc.vA * 1e-3 // mol
  const VE = (R.b * nA) / (R.a * conc.cB) * 1e3 // mL
  const VEshown = (R.b * conc.cA * conc.vA) / (R.a * conc.cB) // mL (valeur attendue si connue)
  const cap = Math.max(25, niceCeil(Math.max(VE, VEshown) * 2.2 / 5) * 5)

  const [V, setV] = useState(0)
  const [playing, setPlaying] = useState(false)
  const vRef = useRef(0)
  vRef.current = V
  useEffect(() => {
    if (!playing) return
    let raf = 0
    let last: number | undefined
    const tick = (t: number) => {
      const dt = last === undefined ? 0 : (t - last) / 1000
      last = t
      // débit ralenti au voisinage de l'équivalence (comme au laboratoire)
      const near = Math.abs(vRef.current - VE) < 1.5
      const rate = (near ? 0.35 : 1.6) * (cap / 25)
      const nv = Math.min(cap, vRef.current + rate * dt)
      vRef.current = nv
      setV(nv)
      if (nv >= cap) {
        setPlaying(false)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, VE, cap])

  const reset = () => {
    setPlaying(false)
    setV(0)
    setAnswer(null)
  }
  useEffect(reset, [rid, unknown, seed])

  // ---- Chimie à V versé
  const state = (v: number) => {
    const nB = conc.cB * v * 1e-3
    const x = Math.min(nA / R.a, nB / R.b)
    const vt = conc.vA + v + (conducto ? V_WATER : 0) // mL
    return { nB, x, nAr: nA - R.a * x, nBr: nB - R.b * x, vt }
  }
  const s = state(V)
  const phase = Math.abs(V - VE) < 0.05 ? 'eq' : V < VE ? 'avant' : 'apres'

  // Couleur de la solution
  const color = (v: number): [number, number, number] => {
    const st = state(v)
    const ell = 3 // épaisseur traversée (cm)
    const bands: Band[] = []
    if (rid === 'permanganate') {
      const cMn = st.nBr / (st.vt * 1e-3)
      const cFe3 = (R.a * st.x) / (st.vt * 1e-3)
      bands.push({ lambda: 525, width: 45, A: 2300 * ell * cMn })
      bands.push({ lambda: 360, width: 60, A: 6 * ell * cFe3 })
    } else if (rid === 'thiosulfate') {
      const cI2 = st.nAr / (st.vt * 1e-3)
      if (starch) bands.push({ lambda: 590, width: 80, A: 2.0e4 * ell * cI2 })
      else bands.push({ lambda: 420, width: 70, A: 120 * ell * cI2 })
    } else {
      const ph = pH(v)
      const f = 1 / (1 + Math.pow(10, 7.1 - ph))
      bands.push({ lambda: 432, width: 45, A: 1.1 * (1 - f) })
      bands.push({ lambda: 616, width: 55, A: 1.3 * f })
    }
    return transmittedColor(bands.map((b) => ({ ...b, A: Math.min(b.A, 6) })))
  }
  function pH(v: number) {
    const st = state(v)
    const D = (st.nAr - st.nBr) / (st.vt * 1e-3) // mol/L (excès H3O+ si > 0)
    const h = (D + Math.sqrt(D * D + 4e-14)) / 2
    return -Math.log10(h)
  }
  const sigma = (v: number) => {
    // en mS/cm ; c en mol/m³ = 1000 × mol/L ; σ (mS/m) = Σ λ c → /100 pour mS/cm
    const st = state(v)
    const L = st.vt * 1e-3
    const cH = Math.max(0, st.nAr) / L * 1e3
    const cHO = Math.max(0, st.nBr) / L * 1e3
    const cNa = st.nB / L * 1e3
    const cCl = nA / L * 1e3
    return (LAMBDA.H3O * cH + LAMBDA.HO * cHO + LAMBDA.Na * cNa + LAMBDA.Cl * cCl) / 100
  }

  const sol = color(V)
  const burColor = rid === 'permanganate' ? rgbCss(transmittedColor([{ lambda: 525, width: 45, A: 2300 * 1.2 * conc.cB }])) : 'hsl(200 60% 92%)'

  // ---- SVG burette + erlenmeyer
  const BW = 220
  const BH = 360
  const tubeTop = 20
  const tubeBot = 210
  const tubeX = 100
  const tubeW = 22
  const level = tubeTop + 10 + ((tubeBot - tubeTop - 10) * V) / cap
  const flaskTop = 250
  const flaskBot = 345
  const fill = Math.min(0.92, 0.32 + (0.5 * (conc.vA + V + (conducto ? V_WATER : 0))) / (conc.vA + cap + (conducto ? V_WATER : 0)))
  const liqY = flaskBot - (flaskBot - flaskTop - 18) * fill
  const flaskHalf = (y: number) => {
    // demi-largeur de l'erlenmeyer à l'ordonnée y
    const neckBot = flaskTop + 18
    if (y < neckBot) return 11
    return 11 + ((y - neckBot) / (flaskBot - neckBot)) * 52
  }
  const grads: number[] = []
  for (let g = 0; g <= cap; g += 1) grads.push(g)

  // ---- Graphe
  const GW = 520
  const GH = 260
  const gl = 50
  const gb = 32
  const gt = 14
  const gr = 14
  const N = 120
  const curve = Array.from({ length: N + 1 }, (_, i) => (cap * i) / N)
  const yVal = (v: number) => (conducto ? sigma(v) : rid === 'acide-base' ? pH(v) : 0)
  const yMaxG = conducto ? niceCeil(Math.max(...curve.map(sigma)) * 1.05) : rid === 'acide-base' ? 14 : niceCeil(Math.max(nA, conc.cB * cap * 1e-3) * 1.05)
  const GX = (v: number) => gl + ((GW - gl - gr) * v) / cap
  const GY = (y: number) => gt + (GH - gt - gb) * (1 - y / yMaxG)
  const path = (f: (v: number) => number) => curve.map((v, i) => `${i ? 'L' : 'M'}${GX(v).toFixed(1)},${GY(f(v)).toFixed(1)}`).join('')
  const xticks = Array.from({ length: 6 }, (_, k) => (k * cap) / 5)
  const yticks = Array.from({ length: 6 }, (_, k) => (k * yMaxG) / 5)
  const graphTitle = conducto ? 'σ (mS/cm)' : rid === 'acide-base' ? 'pH' : 'n (mol)'

  const controls = (
    <>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="tit-r">Réaction support</Label>
        <Select id="tit-r" value={rid} onChange={(e) => setRid(e.target.value as ReactionId)}>
          {(Object.keys(REACTIONS) as ReactionId[]).map((k) => (
            <option key={k} value={k}>
              {REACTIONS[k].label}
            </option>
          ))}
        </Select>
      </div>
      {rid === 'acide-base' && (
        <Segmented
          value={suivi}
          onChange={(v) => {
            setSuivi(v)
            reset()
          }}
          options={[
            { value: 'colorimetrique', label: 'Colorimétrique' },
            { value: 'conductimetrique', label: 'Conductimétrique' },
          ]}
        />
      )}
      {rid === 'thiosulfate' && <Switch checked={starch} onChange={setStarch} label="Empois d’amidon" />}
      <Slider
        label="Volume versé V"
        value={V}
        min={0}
        max={cap}
        step={0.05}
        digits={2}
        unit="mL"
        onChange={(v) => {
          setPlaying(false)
          setV(v)
        }}
      />
      <div className="flex flex-wrap gap-1.5">
        <Button size="sm" variant="outline" onClick={() => setPlaying((p) => !p)}>
          {playing ? <Pause /> : <Play />}
          {playing ? 'Fermer' : 'Ouvrir le robinet'}
        </Button>
        <Button size="xs" variant="outline" onClick={() => setV((v) => Math.min(cap, +(v + 0.05).toFixed(2)))}>
          +1 goutte
        </Button>
        <Button size="xs" variant="outline" onClick={() => setV((v) => Math.min(cap, +(v + 1).toFixed(2)))}>
          +1 mL
        </Button>
        <Button size="xs" variant="ghost" onClick={reset}>
          <RotateCcw /> Vider
        </Button>
      </div>
      <div className="flex flex-col gap-2 border bg-background p-2">
        <Switch checked={unknown} onChange={setUnknown} label="Exercice : concentration inconnue" />
        {unknown && (
          <>
            <p className="text-[11px] text-muted-foreground">Arrêtez-vous au changement de couleur (ou exploitez la courbe), puis validez.</p>
            <div className="flex gap-1.5">
              <Button size="xs" onClick={() => setAnswer(V)}>
                <Check /> V<sub>E</sub> = {fmtSig(V, 3)} mL
              </Button>
              <Button size="xs" variant="ghost" onClick={() => setSeed((x) => x + 1)} title="Nouvelle solution">
                <Dices />
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  )

  const phaseText =
    phase === 'avant'
      ? `Avant l’équivalence : le titrant ${R.titrant.split('^')[0]} versé est entièrement consommé, il est le réactif limitant.`
      : phase === 'eq'
        ? 'Équivalence : les réactifs ont été introduits dans les proportions stœchiométriques, ils sont tous deux entièrement consommés.'
        : 'Après l’équivalence : toute l’espèce titrée a réagi, le titrant versé s’accumule (il est en excès).'

  return (
    <WidgetFrame
      title="Titrage"
      subtitle={R.label + (conducto ? ' — suivi conductimétrique' : ' — suivi colorimétrique')}
      controls={controls}
      footer={
        <span>
          {phaseText} {conducto ? 'L’équivalence se lit à l’intersection des deux portions de droite.' : R.indicator}
        </span>
      }
    >
      <div className="flex flex-col gap-3">
        <div className="overflow-x-auto border bg-background px-3 py-2 text-center">
          <Tex display>{R.eq}</Tex>
        </div>
        <div className="grid gap-3 md:grid-cols-[200px_1fr]">
          <svg viewBox={`0 0 ${BW} ${BH}`} className="mx-auto h-auto w-full max-w-[220px] border bg-background" role="img" aria-label="Burette et erlenmeyer">
            {/* potence */}
            <line x1={40} x2={40} y1={10} y2={BH - 8} stroke={PALETTE.muted} strokeWidth={3} />
            <line x1={40} x2={tubeX} y1={120} y2={120} stroke={PALETTE.muted} strokeWidth={3} />
            {/* burette */}
            <rect x={tubeX} y={level} width={tubeW} height={tubeBot - level} fill={burColor} />
            <rect x={tubeX} y={tubeTop} width={tubeW} height={tubeBot - tubeTop} fill="none" stroke={PALETTE.fg} strokeWidth={1.4} />
            {grads.map((g) => {
              const y = tubeTop + 10 + ((tubeBot - tubeTop - 10) * g) / cap
              const major = g % 5 === 0
              return (
                <g key={g}>
                  <line x1={tubeX + tubeW} x2={tubeX + tubeW - (major ? 9 : 5)} y1={y} y2={y} stroke={PALETTE.fg} strokeWidth={0.8} />
                  {major && (
                    <text x={tubeX + tubeW + 4} y={y + 3} fontSize={9} fill={PALETTE.muted} fontFamily="Geist Mono, monospace">
                      {g}
                    </text>
                  )}
                </g>
              )
            })}
            <line x1={tubeX - 4} x2={tubeX + tubeW + 4} y1={level} y2={level} stroke={PALETTE.fg} strokeWidth={1.5} />
            {/* robinet + pointe */}
            <path d={`M${tubeX},${tubeBot} L${tubeX + tubeW / 2 - 3},${tubeBot + 20} L${tubeX + tubeW / 2 + 3},${tubeBot + 20} L${tubeX + tubeW},${tubeBot}`} fill={burColor} stroke={PALETTE.fg} strokeWidth={1.2} />
            <rect x={tubeX - 8} y={tubeBot + 4} width={tubeW + 16} height={6} fill={playing ? PALETTE.green : PALETTE.muted} />
            <line x1={tubeX + tubeW / 2} x2={tubeX + tubeW / 2} y1={tubeBot + 20} y2={tubeBot + 30} stroke={PALETTE.fg} strokeWidth={1.2} />
            {playing && (
              <circle cx={tubeX + tubeW / 2} cy={tubeBot + 32 + ((V * 400) % 1) * (liqY - tubeBot - 34)} r={2.5} fill={burColor} stroke={PALETTE.fg} strokeWidth={0.5} />
            )}
            <SvgLabel x={tubeX + tubeW / 2} y={14} f={R.titrant} />
            {/* erlenmeyer */}
            <clipPath id="tit-flask">
              <path d={`M${tubeX + tubeW / 2 - 11},${flaskTop} L${tubeX + tubeW / 2 - 11},${flaskTop + 18} L${tubeX + tubeW / 2 - 63},${flaskBot} L${tubeX + tubeW / 2 + 63},${flaskBot} L${tubeX + tubeW / 2 + 11},${flaskTop + 18} L${tubeX + tubeW / 2 + 11},${flaskTop} Z`} />
            </clipPath>
            <rect x={tubeX + tubeW / 2 - 70} y={liqY} width={140} height={flaskBot - liqY} fill={rgbCss(sol)} clipPath="url(#tit-flask)" />
            <line x1={tubeX + tubeW / 2 - flaskHalf(liqY)} x2={tubeX + tubeW / 2 + flaskHalf(liqY)} y1={liqY} y2={liqY} stroke={PALETTE.fg} strokeOpacity={0.35} />
            <path
              d={`M${tubeX + tubeW / 2 - 11},${flaskTop} L${tubeX + tubeW / 2 - 11},${flaskTop + 18} L${tubeX + tubeW / 2 - 63},${flaskBot} L${tubeX + tubeW / 2 + 63},${flaskBot} L${tubeX + tubeW / 2 + 11},${flaskTop + 18} L${tubeX + tubeW / 2 + 11},${flaskTop}`}
              fill="none"
              stroke={PALETTE.fg}
              strokeWidth={1.5}
            />
            <rect x={tubeX + tubeW / 2 - 9} y={flaskBot - 6} width={18} height={3} fill={PALETTE.fg} opacity={0.6} />
            {/* agitateur */}
            <rect x={tubeX + tubeW / 2 - 75} y={flaskBot + 2} width={150} height={10} fill="none" stroke={PALETTE.fg} strokeWidth={1.2} />
            {conducto && (
              <g>
                <line x1={tubeX + tubeW / 2 + 40} x2={tubeX + tubeW / 2 + 30} y1={flaskTop - 25} y2={flaskBot - 18} stroke={PALETTE.fg} strokeWidth={3} />
                <text x={tubeX + tubeW / 2 + 44} y={flaskTop - 28} fontSize={9} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
                  cellule
                </text>
              </g>
            )}
            <SvgLabel x={tubeX + tubeW / 2 - 52} y={flaskTop + 4} f={R.titre} size={11} />
          </svg>

          <div className="flex flex-col gap-2">
            <svg viewBox={`0 0 ${GW} ${GH}`} className="h-auto w-full border bg-background" role="img" aria-label="Courbe de titrage">
              {xticks.map((v) => (
                <g key={'x' + v}>
                  <line x1={GX(v)} x2={GX(v)} y1={gt} y2={GY(0)} stroke={PALETTE.grid} />
                  <text x={GX(v)} y={GY(0) + 14} textAnchor="middle" fontSize={10} fill={PALETTE.muted} fontFamily="Geist Mono, monospace">
                    {fmtSig(v, 2)}
                  </text>
                </g>
              ))}
              {yticks.map((v) => (
                <g key={'y' + v}>
                  <line x1={gl} x2={GW - gr} y1={GY(v)} y2={GY(v)} stroke={PALETTE.grid} />
                  <text x={gl - 5} y={GY(v) + 3} textAnchor="end" fontSize={10} fill={PALETTE.muted} fontFamily="Geist Mono, monospace">
                    {rid === 'acide-base' && !conducto ? fmtSig(v, 2) : fmtSig(v, 2)}
                  </text>
                </g>
              ))}
              <line x1={gl} x2={GW - gr} y1={GY(0)} y2={GY(0)} stroke={PALETTE.fg} />
              <line x1={gl} x2={gl} y1={gt} y2={GY(0)} stroke={PALETTE.fg} />
              <text x={GW - gr} y={GH - 4} textAnchor="end" fontSize={11} fill={PALETTE.fg} fontFamily="Geist, sans-serif">
                V (mL)
              </text>
              <text x={gl + 6} y={gt + 11} fontSize={11} fill={PALETTE.fg} fontFamily="Geist, sans-serif">
                {graphTitle}
              </text>
              {/* courbe complète en pointillés, partie mesurée en trait plein */}
              <clipPath id="tit-clip">
                <rect x={0} y={0} width={GX(V) + 0.5} height={GH} />
              </clipPath>
              <g clipPath={unknown && answer === null ? 'url(#tit-clip)' : undefined}>
              {rid === 'acide-base' ? (
                <>
                  <path d={path(yVal)} fill="none" stroke={PALETTE.blue} strokeWidth={1} strokeDasharray="3 4" opacity={0.6} />
                  <path d={path(yVal)} fill="none" stroke={PALETTE.blue} strokeWidth={2.2} clipPath="url(#tit-clip)" />
                  <rect x={GX(V) - 4} y={GY(yVal(V)) - 4} width={8} height={8} fill={PALETTE.blue} />
                </>
              ) : (
                <>
                  <path d={path((v) => Math.max(0, state(v).nAr))} fill="none" stroke={PALETTE.red} strokeWidth={2} />
                  <path d={path((v) => Math.max(0, state(v).nBr))} fill="none" stroke={PALETTE.violet} strokeWidth={2} />
                  <rect x={GX(V) - 4} y={GY(Math.max(0, s.nAr)) - 4} width={8} height={8} fill={PALETTE.red} />
                  <rect x={GX(V) - 4} y={GY(Math.max(0, s.nBr)) - 4} width={8} height={8} fill={PALETTE.violet} />
                  <g fontSize={10} fontFamily="Geist, sans-serif">
                    <text x={GW - gr - 4} y={gt + 12} textAnchor="end" fill={PALETTE.red}>
                      ━ titré restant
                    </text>
                    <text x={GW - gr - 4} y={gt + 26} textAnchor="end" fill={PALETTE.violet}>
                      ━ titrant en excès
                    </text>
                  </g>
                </>
              )}
              </g>
              <line x1={GX(V)} x2={GX(V)} y1={gt} y2={GY(0)} stroke={PALETTE.fg} strokeDasharray="4 3" />
              {(!unknown || answer !== null) && (
                <g>
                  <line x1={GX(VE)} x2={GX(VE)} y1={gt} y2={GY(0)} stroke={PALETTE.green} strokeWidth={1.5} />
                  <text x={GX(VE) + 4} y={GY(0) - 6} fontSize={11} fontWeight={600} fill={PALETTE.green} fontFamily="Geist, sans-serif">
                    V_E = {fmtSig(VE, 3)} mL
                  </text>
                </g>
              )}
            </svg>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Stat label="Volume versé" value={`${fmtSig(V, 3)} mL`} />
              <Stat label="V équivalence" value={unknown && answer === null ? '? mL' : `${fmtSig(VE, 3)} mL`} tone="success" />
              <Stat
                label={conducto ? 'σ' : rid === 'acide-base' ? 'pH' : 'Titré restant'}
                value={conducto ? `${fmtSig(sigma(V), 3)} mS/cm` : rid === 'acide-base' ? fmtSig(pH(V), 3) : `${fmtSig(Math.max(0, s.nAr), 3)} mol`}
              />
              <Stat
                label="Couleur"
                value={
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-4 border" style={{ background: rgbCss(sol) }} />
                    <span className={cn('text-xs', phase === 'eq' ? 'text-success' : '')}>{phase === 'avant' ? 'avant éq.' : phase === 'eq' ? 'équivalence' : 'après éq.'}</span>
                  </span>
                }
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="border bg-muted/20 p-3 text-sm">
            <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Relation à l’équivalence</div>
            <Tex display>{`\\frac{n_0(${formulaTex(R.titre)})}{${R.a}} = \\frac{n_E(${formulaTex(R.titrant)})}{${R.b}} \\iff \\frac{c_A V_A}{${R.a}} = \\frac{c_B V_E}{${R.b}}`}</Tex>
            <div className="text-xs text-muted-foreground">
              <Tex>{`V_A = ${texSig(conc.vA, 3)}\\ \\text{mL},\\ c_B = ${texSig(conc.cB, 3)}\\ \\text{mol·L}^{-1}${unknown ? '' : `,\\ c_A = ${texSig(conc.cA, 3)}\\ \\text{mol·L}^{-1}`}`}</Tex>
            </div>
          </div>
          <div className="border bg-muted/20 p-3 text-sm">
            <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{unknown ? 'Votre résultat' : 'Calcul de V_E'}</div>
            {unknown ? (
              answer === null ? (
                <p className="text-xs text-muted-foreground">Repérez l’équivalence puis cliquez sur « V_E = … » pour calculer c_A.</p>
              ) : (
                <>
                  <Tex display>{`c_A = \\frac{${R.a}\\, c_B V_E}{${R.b}\\, V_A} = \\frac{${R.a} \\times ${texSig(conc.cB, 3)} \\times ${texSig(answer, 3)}}{${R.b} \\times ${texSig(conc.vA, 3)}} = ${texSig((R.a * conc.cB * answer) / (R.b * conc.vA), 3)}\\ \\text{mol·L}^{-1}`}</Tex>
                  {(() => {
                    const est = (R.a * conc.cB * answer) / (R.b * conc.vA)
                    const e = Math.abs(est - cTrue) / cTrue
                    return (
                      <div className={cn('text-xs font-medium', e < 0.02 ? 'text-success' : e < 0.06 ? 'text-warning' : 'text-destructive')}>
                        Valeur exacte : {fmtSig(cTrue, 3)} mol/L — écart {fmtSig(100 * e, 2)} %{e < 0.02 ? ' : excellent !' : e < 0.06 ? ' : correct, mais affinez au goutte à goutte.' : ' : équivalence mal repérée.'}
                      </div>
                    )
                  })()}
                </>
              )
            ) : (
              <Tex display>{`V_E = \\frac{${R.b}\\, c_A V_A}{${R.a}\\, c_B} = \\frac{${R.b} \\times ${texSig(conc.cA, 3)} \\times ${texSig(conc.vA, 3)}}{${R.a} \\times ${texSig(conc.cB, 3)}} = ${texSig(VE, 3)}\\ \\text{mL}`}</Tex>
            )}
          </div>
        </div>
      </div>
    </WidgetFrame>
  )
}

function SvgLabel({ x, y, f, size = 12 }: { x: number; y: number; f: string; size?: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={600} fill={PALETTE.fg} fontFamily="Geist, sans-serif">
      {formulaText(f)}
    </text>
  )
}
