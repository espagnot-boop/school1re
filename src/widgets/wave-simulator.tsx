import { useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Slider } from '@/components/ui/slider'
import { Segmented } from '@/components/ui/tabs'
import { Stat, Switch } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { Plot, FunctionPath, Point, Segment, PALETTE, usePlot } from '@/lib/plot'
import { clamp, fmt } from '@/lib/utils'
import { PlayControls, useAnimationFrame, texNum, FONT, MONO } from './_physique/common'

type Props = { lambda?: number; T?: number; amplitude?: number }

const XMAX = 10 // m
const A_MAX = 4 // cm (échelle verticale)

function DoubleArrow({ x1, x2, y, label, color }: { x1: number; x2: number; y: number; label: string; color: string }) {
  const p = usePlot()
  const X1 = p.sx(x1)
  const X2 = p.sx(x2)
  const Y = p.sy(y)
  if (!(X2 - X1 > 8)) return null
  return (
    <g stroke={color} fill={color}>
      <line x1={X1} x2={X2} y1={Y} y2={Y} strokeWidth={1.4} />
      <path d={`M${X1},${Y} l7,-4 l0,8 Z M${X2},${Y} l-7,-4 l0,8 Z`} stroke="none" />
      <line x1={X1} x2={X1} y1={Y - 6} y2={Y + 6} strokeWidth={1} />
      <line x1={X2} x2={X2} y1={Y - 6} y2={Y + 6} strokeWidth={1} />
      <text x={(X1 + X2) / 2} y={Y - 6} textAnchor="middle" fontSize={13} fontStyle="italic" fontFamily={FONT} stroke="none">
        {label}
      </text>
    </g>
  )
}

function Beads({ y, front, color }: { y: (x: number) => number; front: number; color: string }) {
  const p = usePlot()
  const n = 60
  return (
    <g>
      {Array.from({ length: n + 1 }, (_, i) => {
        const x = (XMAX * i) / n
        return <circle key={i} cx={p.sx(x)} cy={p.sy(y(x))} r={2.6} fill={x <= front ? color : PALETTE.muted} opacity={x <= front ? 0.9 : 0.5} />
      })}
    </g>
  )
}

function Source({ y }: { y: number }) {
  const p = usePlot()
  return (
    <g>
      <rect x={p.sx(0) - 12} y={p.sy(y) - 6} width={12} height={12} fill={PALETTE.fg} />
      <line x1={p.sx(0) - 6} x2={p.sx(0) - 6} y1={p.sy(A_MAX)} y2={p.sy(-A_MAX)} stroke={PALETTE.muted} strokeDasharray="2 3" />
      <text x={p.sx(0) - 6} y={p.sy(-A_MAX) + 14} fontSize={10} textAnchor="middle" fill={PALETTE.muted} fontFamily={FONT}>
        S
      </text>
    </g>
  )
}

function VLine({ x, color, label }: { x: number; color: string; label: string }) {
  const p = usePlot()
  return (
    <g>
      <line x1={p.sx(x)} x2={p.sx(x)} y1={8} y2={p.height} stroke={color} strokeDasharray="4 3" strokeWidth={1} />
      <text x={p.sx(x) + 4} y={p.height - 6} fontSize={11} fontWeight={600} fill={color} fontFamily={FONT}>
        {label}
      </text>
    </g>
  )
}

function TimeMarker({ t }: { t: number }) {
  const p = usePlot()
  return <line x1={p.sx(t)} x2={p.sx(t)} y1={0} y2={p.height} stroke={PALETTE.fg} strokeWidth={1} opacity={0.6} />
}

export default function WaveSimulator({ lambda = 2, T: T0 = 1, amplitude = 2 }: Props) {
  const [lambda_, setLambda] = useState(clamp(lambda, 0.5, 5))
  const [T, setT] = useState(clamp(T0, 0.2, 4))
  const [A, setA] = useState(clamp(amplitude, 0.5, 3))
  const [x1, setX1] = useState(2)
  const [x2, setX2] = useState(clamp(2 + lambda_ * 1.5, 0, XMAX))
  const [t, setTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [rate, setRate] = useState(0.5)
  const [regime, setRegime] = useState<'front' | 'permanent'>('front')
  const [showMarks, setShowMarks] = useState(true)

  useAnimationFrame((dt) => setTime((tt) => tt + dt * rate), playing)

  const v = lambda_ / T
  const front = regime === 'front' ? v * t : Infinity
  const yAt = (x: number, tt: number) => {
    if (regime === 'front' && x > v * tt) return 0
    return A * Math.sin(2 * Math.PI * (tt / T - x / lambda_))
  }
  const snap = (x: number) => yAt(x, t)

  const d = Math.abs(x2 - x1)
  const tau = d / v
  const ratio = d / lambda_
  const frac = ratio - Math.round(ratio)
  const rel =
    Math.abs(frac) < 0.02 ? 'en phase' : Math.abs(Math.abs(ratio - Math.floor(ratio)) - 0.5) < 0.02 ? 'en opposition de phase' : 'ni en phase ni en opposition'

  // crête pour la cote λ : phase t/T - x/λ = 1/4 + k
  const k0 = Math.floor(t / T - 0.25)
  let crest = lambda_ * (t / T - 0.25 - k0)
  while (crest > XMAX) crest -= lambda_
  while (crest < 0) crest += lambda_
  const crestOK = crest + lambda_ <= Math.min(XMAX, front)

  const tWin = Math.max(4 * T, 6)
  const tStart = Math.max(0, t - tWin * 0.85)
  const tEnd = tStart + tWin

  const reset = () => {
    setPlaying(false)
    setTime(0)
  }

  return (
    <WidgetFrame
      title="Onde progressive sinusoïdale"
      subtitle="Double périodicité : spatiale (λ) et temporelle (T)"
      controls={
        <>
          <Segmented
            value={regime}
            onChange={setRegime}
            options={[
              { value: 'front', label: 'Source démarrant à t = 0' },
              { value: 'permanent', label: 'Régime établi' },
            ]}
          />
          <Slider label="longueur d’onde λ" value={lambda_} min={0.5} max={5} step={0.1} digits={1} unit="m" onChange={setLambda} />
          <Slider label="période T" value={T} min={0.2} max={4} step={0.05} digits={2} unit="s" onChange={setT} />
          <Slider label="amplitude A" value={A} min={0.5} max={3} step={0.1} digits={1} unit="cm" onChange={setA} />
          <Slider label={<span>position de M<sub>1</sub></span>} value={x1} min={0} max={XMAX} step={0.05} digits={2} unit="m" onChange={setX1} />
          <Slider label={<span>position de M<sub>2</sub></span>} value={x2} min={0} max={XMAX} step={0.05} digits={2} unit="m" onChange={setX2} />
          <Slider label="vitesse de lecture" value={rate} min={0.1} max={1.5} step={0.05} digits={2} unit="×" onChange={setRate} />
          <PlayControls playing={playing} onToggle={() => setPlaying((p) => !p)} onReset={reset} />
          <Switch checked={showMarks} onChange={setShowMarks} label="Afficher λ et τ" />
          <div className="grid grid-cols-2 gap-2">
            <Stat label="t" value={`${fmt(t, 2)} s`} />
            <Stat label="f = 1/T" value={`${fmt(1 / T, 2)} Hz`} />
            <Stat label="v = λ/T" value={`${fmt(v, 2)} m/s`} tone="info" />
            <Stat label="τ = M₁M₂ / v" value={`${fmt(tau, 2)} s`} />
            <Stat label="M₁M₂ / λ" value={fmt(ratio, 2)} />
            <Stat label="M₁ et M₂" value={rel} className="col-span-2" />
          </div>
        </>
      }
      footer={
        <div className="space-y-1">
          <Tex display>{String.raw`v = \frac{\lambda}{T} = \lambda f = \frac{${texNum(lambda_, 1)}\ \text{m}}{${texNum(T, 2)}\ \text{s}} = ${texNum(v, 2)}\ \text{m·s}^{-1} \qquad \tau = \frac{M_1M_2}{v} = ${texNum(tau, 2)}\ \text{s}`}</Tex>
          <p className="text-muted-foreground">
            Le point M₂ reproduit le mouvement de M₁ avec un retard τ. Deux points distants d’un nombre entier de longueurs d’onde vibrent en phase ; distants d’un nombre
            demi-entier de λ, ils vibrent en opposition de phase. Une onde transporte de l’énergie sans transport de matière : chaque point oscille sur place.
          </p>
        </div>
      }
    >
      <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
        <span>Aspect de la corde à l’instant t = {fmt(t, 2)} s (périodicité spatiale)</span>
        <span className="font-mono">y (cm) en fonction de x (m)</span>
      </div>
      <Plot xMin={-0.5} xMax={XMAX} yMin={-A_MAX} yMax={A_MAX} height={220} xLabel="x (m)" yLabel="y (cm)">
        <Source y={snap(0)} />
        <FunctionPath f={(x) => (x < 0 ? NaN : snap(x))} color={PALETTE.blue} width={2} samples={600} />
        <Beads y={snap} front={front} color={PALETTE.blue} />
        <VLine x={x1} color={PALETTE.green} label="M₁" />
        <VLine x={x2} color={PALETTE.red} label="M₂" />
        <Point x={x1} y={snap(x1)} color={PALETTE.green} />
        <Point x={x2} y={snap(x2)} color={PALETTE.red} />
        {regime === 'front' && front < XMAX && <Segment x1={front} y1={-A_MAX * 0.7} x2={Math.min(front + 0.8, XMAX)} y2={-A_MAX * 0.7} color={PALETTE.violet} arrow />}
        {showMarks && crestOK && <DoubleArrow x1={crest} x2={crest + lambda_} y={A + 0.6} label="λ" color={PALETTE.orange} />}
      </Plot>

      <div className="mb-1 mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>Élongation des points M₁ et M₂ au cours du temps (périodicité temporelle)</span>
        <span className="font-mono">y (cm) en fonction de t (s)</span>
      </div>
      <Plot xMin={tStart} xMax={tEnd} yMin={-A_MAX} yMax={A_MAX} height={200} xLabel="t (s)" yLabel="y (cm)">
        <FunctionPath f={(tt) => yAt(x1, tt)} from={tStart} to={Math.max(tStart, t)} color={PALETTE.green} width={2} />
        <FunctionPath f={(tt) => yAt(x2, tt)} from={tStart} to={Math.max(tStart, t)} color={PALETTE.red} width={2} />
        <TimeMarker t={t} />
        {showMarks && <TauMarks x1={x1} x2={x2} v={v} T={T} A={A} lambda={lambda_} t={t} tStart={tStart} regime={regime} />}
      </Plot>
      <div className="mt-1 flex gap-4 font-mono text-[11px] text-muted-foreground">
        <span style={{ color: PALETTE.green }}>— M₁ (x = {fmt(x1, 2)} m)</span>
        <span style={{ color: PALETTE.red }}>— M₂ (x = {fmt(x2, 2)} m)</span>
      </div>
    </WidgetFrame>
  )
}

/** Cotes T et τ sur le graphe temporel. */
function TauMarks({ x1, x2, v, T, A, lambda, t, tStart, regime }: { x1: number; x2: number; v: number; T: number; A: number; lambda: number; t: number; tStart: number; regime: 'front' | 'permanent' }) {
  const p = usePlot()
  // premier maximum de M1 visible : t/T - x1/λ = 1/4 + k
  const first = (x: number) => {
    const tMin = Math.max(tStart, regime === 'front' ? x / v : -Infinity)
    const k = Math.ceil(tMin / T - x / lambda - 0.25)
    return T * (0.25 + k + x / lambda)
  }
  const m1 = first(x1)
  const xa = Math.min(x1, x2)
  const xb = Math.max(x1, x2)
  // maximum de M_b qui suit celui de M_a avec le retard τ
  const ma = first(xa)
  const mb = ma + (xb - xa) / v
  const Y = p.sy(A + 0.55)
  const Y2 = p.sy(-A - 0.55)
  const showT = m1 + T <= t
  const showTau = mb <= t && mb - ma > 0.02
  return (
    <g fontFamily={FONT} fontSize={12}>
      {showT && (
        <g stroke={PALETTE.orange} fill={PALETTE.orange}>
          <line x1={p.sx(m1)} x2={p.sx(m1 + T)} y1={Y} y2={Y} strokeWidth={1.3} />
          <path d={`M${p.sx(m1)},${Y} l7,-4 l0,8 Z M${p.sx(m1 + T)},${Y} l-7,-4 l0,8 Z`} stroke="none" />
          <text x={(p.sx(m1) + p.sx(m1 + T)) / 2} y={Y - 5} textAnchor="middle" stroke="none" fontStyle="italic">
            T
          </text>
        </g>
      )}
      {showTau && (
        <g stroke={PALETTE.violet} fill={PALETTE.violet}>
          <line x1={p.sx(ma)} x2={p.sx(ma)} y1={p.sy(A)} y2={Y2} strokeDasharray="2 3" strokeWidth={1} />
          <line x1={p.sx(mb)} x2={p.sx(mb)} y1={p.sy(A)} y2={Y2} strokeDasharray="2 3" strokeWidth={1} />
          <line x1={p.sx(ma)} x2={p.sx(mb)} y1={Y2} y2={Y2} strokeWidth={1.3} />
          <path d={`M${p.sx(mb)},${Y2} l-7,-4 l0,8 Z`} stroke="none" />
          <text x={(p.sx(ma) + p.sx(mb)) / 2} y={Y2 + 14} textAnchor="middle" stroke="none" fontStyle="italic">
            τ
          </text>
        </g>
      )}
      <text x={p.width - 6} y={14} textAnchor="end" fill={PALETTE.muted} fontSize={10} fontFamily={MONO}>
        décalage M₁ → M₂ : τ = {fmt((xb - xa) / v, 2)} s
      </text>
    </g>
  )
}
