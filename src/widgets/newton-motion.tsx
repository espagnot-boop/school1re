import { useEffect, useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Slider } from '@/components/ui/slider'
import { Segmented } from '@/components/ui/tabs'
import { Stat, Switch } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { PALETTE } from '@/lib/plot'
import { clamp, fmt } from '@/lib/utils'
import { Arrow, PlayControls, VecLabel, useAnimationFrame, texNum, FONT, MONO } from './_physique/common'

type Mode = 'uniforme' | 'chute' | 'freinage' | 'circulaire'
type Props = { mode?: Mode }

const g = 9.81
const SW = 640
const SH = 360
type V2 = { x: number; y: number }

const MODES: { value: Mode; label: string }[] = [
  { value: 'uniforme', label: 'ΣF = 0' },
  { value: 'chute', label: 'Chute / tir' },
  { value: 'freinage', label: 'Freinage' },
  { value: 'circulaire', label: 'Circulaire' },
]

export default function NewtonMotion({ mode: mode0 = 'chute' }: Props) {
  const [mode, setMode] = useState<Mode>(MODES.some((m) => m.value === mode0) ? mode0 : 'chute')
  const [m, setM] = useState(0.5)
  const [tau, setTau] = useState(0.1)
  const [v0, setV0] = useState(6)
  const [alpha, setAlpha] = useState(50)
  const [h0, setH0] = useState(1)
  const [fr, setFr] = useState(4)
  const [Rc, setRc] = useState(2)
  const [vc, setVc] = useState(3)
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [rate, setRate] = useState(0.5)
  const [sel, setSel] = useState(4)
  const [showAll, setShowAll] = useState(false)

  // valeurs par défaut adaptées à chaque situation
  useEffect(() => {
    setT(0)
    setPlaying(false)
    if (mode === 'uniforme') {
      setV0(2)
      setAlpha(15)
      setTau(0.2)
      setM(0.5)
    } else if (mode === 'chute') {
      setV0(6)
      setAlpha(50)
      setTau(0.1)
      setM(0.5)
    } else if (mode === 'freinage') {
      setV0(5)
      setM(2)
      setFr(4)
      setTau(0.2)
    } else {
      setRc(2)
      setVc(3)
      setTau(0.15)
      setM(0.5)
    }
    setSel(4)
  }, [mode])

  const a = (alpha * Math.PI) / 180
  // ---- mouvement exact ----
  let tEnd = 3
  let pos: (t: number) => V2
  let force: (t: number) => V2 // somme des forces (N)
  let forceName = ''
  if (mode === 'uniforme') {
    tEnd = 3
    pos = (tt) => ({ x: v0 * Math.cos(a) * tt, y: v0 * Math.sin(a) * tt })
    force = () => ({ x: 0, y: 0 })
    forceName = 'Les forces se compensent (palet sur table à coussin d’air : P + R = 0).'
  } else if (mode === 'chute') {
    const vy = v0 * Math.sin(a)
    tEnd = (vy + Math.sqrt(vy * vy + 2 * g * h0)) / g
    pos = (tt) => ({ x: v0 * Math.cos(a) * tt, y: h0 + vy * tt - 0.5 * g * tt * tt })
    force = () => ({ x: 0, y: -m * g })
    forceName = 'Seul le poids P = m·g agit (frottements négligés) : vertical, vers le bas.'
  } else if (mode === 'freinage') {
    const dec = fr / m
    const ts = v0 / dec
    tEnd = Math.min(ts + 0.6, 12)
    pos = (tt) => {
      const u = Math.min(tt, ts)
      return { x: v0 * u - 0.5 * dec * u * u, y: 0 }
    }
    force = (tt) => (tt < ts ? { x: -fr, y: 0 } : { x: 0, y: 0 })
    forceName = 'Le poids et la réaction normale se compensent ; reste la force de frottement f, opposée au mouvement.'
  } else {
    const w = vc / Rc
    tEnd = (2 * Math.PI) / w
    pos = (tt) => ({ x: Rc * Math.cos(w * tt), y: Rc * Math.sin(w * tt) })
    force = (tt) => ({ x: -m * vc * w * Math.cos(w * tt), y: -m * vc * w * Math.sin(w * tt) })
    forceName = 'La somme des forces est dirigée vers le centre du cercle (force centripète), de valeur m·v²/R.'
  }
  const N = Math.min(80, Math.floor(tEnd / tau + 1e-9))
  const pts = Array.from({ length: N + 1 }, (_, i) => pos(i * tau))
  const vel = (i: number): V2 => ({ x: (pts[i + 1].x - pts[i].x) / tau, y: (pts[i + 1].y - pts[i].y) / tau })
  const nVel = N // v_i défini pour i ≤ N-1
  const maxSel = Math.max(0, N - 2)
  const i = clamp(sel, 0, maxSel)

  useAnimationFrame((dt) => {
    setT((tt) => {
      const nt = tt + dt * rate
      if (nt >= tEnd) {
        setPlaying(false)
        return tEnd
      }
      return nt
    })
  }, playing)

  // ---- échelle ----
  const allX = pts.map((p) => p.x)
  const allY = pts.map((p) => p.y)
  let xmin = Math.min(...allX, 0),
    xmax = Math.max(...allX, 0.5),
    ymin = Math.min(...allY, 0),
    ymax = Math.max(...allY, 0.5)
  if (mode === 'freinage') {
    ymin = -1
    ymax = 1.5
  }
  if (mode === 'circulaire') {
    xmin = -Rc
    xmax = Rc
    ymin = -Rc
    ymax = Rc
  }
  const pad = 60
  const sc = Math.min((SW - 2 * pad) / Math.max(xmax - xmin, 1e-6), (SH - 2 * pad) / Math.max(ymax - ymin, 1e-6))
  const ox = (SW - sc * (xmax - xmin)) / 2 - sc * xmin
  const oy = (SH + sc * (ymax - ymin)) / 2 + sc * ymin
  const X = (x: number) => ox + sc * x
  const Y = (y: number) => oy - sc * y

  // vecteurs : échelles
  const vels = Array.from({ length: nVel }, (_, k) => vel(k))
  const vmax = Math.max(...vels.map((v) => Math.hypot(v.x, v.y)), 1e-6)
  const kv = 55 / vmax // px par m/s
  const dvs = vels.slice(0, -1).map((v, k) => ({ x: vels[k + 1].x - v.x, y: vels[k + 1].y - v.y }))
  const dvmax = Math.max(...dvs.map((d) => Math.hypot(d.x, d.y)), 0)
  const kdv = dvmax > 1e-9 ? 50 / dvmax : kv // px par m/s

  const vi = vels[i] ?? { x: 0, y: 0 }
  const vi1 = vels[i + 1] ?? vi
  const dv = { x: vi1.x - vi.x, y: vi1.y - vi.y }
  const Fest = { x: (m * dv.x) / tau, y: (m * dv.y) / tau }
  const Fth = force(i * tau + tau) // force « au milieu » de l'intervalle étudié
  const nF = Math.hypot(Fth.x, Fth.y)
  const nFest = Math.hypot(Fest.x, Fest.y)
  const ndv = Math.hypot(dv.x, dv.y)
  const angle = nF > 1e-9 && nFest > 1e-9 ? (Math.acos(clamp((Fth.x * Fest.x + Fth.y * Fest.y) / (nF * nFest), -1, 1)) * 180) / Math.PI : 0

  const visible = pts.filter((_, k) => k * tau <= t + 1e-9)
  const ready = (i + 2) * tau <= t + 1e-9
  const cur = pos(Math.min(t, tEnd))
  const Mi = pts[i]
  const Mi1 = pts[i + 1]

  const controls = (
    <>
      <Segmented value={mode} onChange={setMode} options={MODES} />
      <Slider label="masse m" value={m} min={0.1} max={5} step={0.1} digits={1} unit="kg" onChange={setM} />
      <Slider label="intervalle τ entre deux images" value={tau} min={0.04} max={0.4} step={0.01} digits={2} unit="s" onChange={setTau} />
      {(mode === 'uniforme' || mode === 'chute' || mode === 'freinage') && <Slider label="vitesse initiale v₀" value={v0} min={0.5} max={10} step={0.1} digits={1} unit="m/s" onChange={setV0} />}
      {(mode === 'uniforme' || mode === 'chute') && <Slider label="angle de lancement α" value={alpha} min={mode === 'chute' ? -20 : -45} max={mode === 'chute' ? 85 : 45} step={1} digits={0} unit="°" onChange={setAlpha} />}
      {mode === 'chute' && <Slider label="hauteur initiale" value={h0} min={0} max={5} step={0.1} digits={1} unit="m" onChange={setH0} />}
      {mode === 'freinage' && <Slider label="force de frottement f" value={fr} min={0.5} max={10} step={0.1} digits={1} unit="N" onChange={setFr} />}
      {mode === 'circulaire' && (
        <>
          <Slider label="rayon R" value={Rc} min={0.5} max={5} step={0.1} digits={1} unit="m" onChange={setRc} />
          <Slider label="vitesse v" value={vc} min={0.5} max={6} step={0.1} digits={1} unit="m/s" onChange={setVc} />
        </>
      )}
      <Slider label={<span>point étudié M<sub>i</sub></span>} value={i} min={0} max={maxSel} step={1} digits={0} onChange={(v) => setSel(Math.round(v))} />
      <Slider label="vitesse de lecture" value={rate} min={0.1} max={1.5} step={0.05} digits={2} unit="×" onChange={setRate} />
      <PlayControls
        playing={playing}
        onToggle={() => {
          if (t >= tEnd) setT(0)
          setPlaying((p) => !p)
        }}
        onReset={() => {
          setPlaying(false)
          setT(0)
        }}
      >
        <button className="text-xs underline-offset-4 hover:underline" onClick={() => { setPlaying(false); setT(tEnd) }}>
          tout afficher
        </button>
      </PlayControls>
      <Switch checked={showAll} onChange={setShowAll} label="Vecteurs vitesse en tous les points" />
      <div className="grid grid-cols-2 gap-2">
        <Stat label={`v${sub(i)}`} value={`${fmt(Math.hypot(vi.x, vi.y), 2)} m/s`} />
        <Stat label={`v${sub(i + 1)}`} value={`${fmt(Math.hypot(vi1.x, vi1.y), 2)} m/s`} />
        <Stat label="‖Δv‖" value={`${fmt(ndv, 3)} m/s`} />
        <Stat label="m·‖Δv‖/Δt" value={`${fmt(nFest, 2)} N`} tone="info" />
        <Stat label="‖ΣF‖ (modèle)" value={`${fmt(nF, 2)} N`} tone="success" />
        <Stat label="angle (ΣF, Δv)" value={nF > 1e-9 && ndv > 1e-9 ? `${fmt(angle, 1)}°` : '—'} />
      </div>
    </>
  )

  return (
    <WidgetFrame
      title="Deuxième loi de Newton (approchée)"
      subtitle="Chronophotographie, vecteurs vitesse et variation de vitesse"
      controls={controls}
      footer={
        <div className="space-y-1">
          <Tex display>{String.raw`\vec v_i = \frac{\overrightarrow{M_iM_{i+1}}}{\Delta t}, \quad \Delta\vec v_i = \vec v_{i+1} - \vec v_i, \qquad \sum \vec F \approx m\,\frac{\Delta \vec v}{\Delta t} \;:\; ${texNum(m, 1)} \times \frac{${texNum(ndv, 3)}}{${texNum(tau, 2)}} = ${texNum(nFest, 2)}\ \text{N}`}</Tex>
          <p className="text-muted-foreground">
            {forceName}{' '}
            {nF < 1e-9
              ? 'Comme ΣF = 0, le vecteur vitesse ne varie pas : mouvement rectiligne uniforme (principe d’inertie).'
              : 'Le vecteur Δv a la même direction et le même sens que la somme des forces, et m·Δv/Δt en donne la valeur.'}
          </p>
        </div>
      }
    >
      <svg viewBox={`0 0 ${SW} ${SH}`} className="h-auto w-full select-none border bg-background">
        <defs>
          <pattern id="nm-grid" width={sc >= 10 ? sc * (sc > 120 ? 0.5 : 1) : 40} height={sc >= 10 ? sc * (sc > 120 ? 0.5 : 1) : 40} patternUnits="userSpaceOnUse" x={ox} y={oy}>
            <path d={`M${sc >= 10 ? sc * (sc > 120 ? 0.5 : 1) : 40} 0 L0 0 0 ${sc >= 10 ? sc * (sc > 120 ? 0.5 : 1) : 40}`} fill="none" stroke="hsl(var(--border))" strokeWidth={0.6} />
          </pattern>
        </defs>
        <rect width={SW} height={SH} fill="url(#nm-grid)" />
        <text x={8} y={SH - 8} fontSize={10} fill={PALETTE.muted} fontFamily={MONO}>
          quadrillage : {sc > 120 ? '0,5 m' : '1 m'} · t = {fmt(t, 2)} s · Δt = τ = {fmt(tau, 2)} s
        </text>
        {mode === 'chute' && <line x1={0} x2={SW} y1={Y(0)} y2={Y(0)} stroke={PALETTE.fg} strokeWidth={1.5} />}
        {mode === 'freinage' && <rect x={0} y={Y(0)} width={SW} height={SH - Y(0)} fill="hsl(var(--muted))" />}
        {mode === 'circulaire' && (
          <g>
            <circle cx={X(0)} cy={Y(0)} r={Rc * sc} fill="none" stroke={PALETTE.muted} strokeDasharray="3 4" />
            <circle cx={X(0)} cy={Y(0)} r={3} fill={PALETTE.fg} />
            <text x={X(0) + 6} y={Y(0) - 6} fontSize={11} fill={PALETTE.fg} fontFamily={FONT}>
              O
            </text>
          </g>
        )}

        {/* trajectoire */}
        <polyline points={pts.map((p) => `${X(p.x)},${Y(p.y)}`).join(' ')} fill="none" stroke={PALETTE.muted} strokeWidth={0.8} strokeDasharray="2 4" opacity={0.6} />
        {/* chronophotographie */}
        {visible.map((p, k) => (
          <g key={k}>
            <circle cx={X(p.x)} cy={Y(p.y)} r={k === i || k === i + 1 ? 4.5 : 3.5} fill={k === i || k === i + 1 ? PALETTE.fg : 'hsl(var(--background))'} stroke={PALETTE.fg} strokeWidth={1.2} />
            {(k === i || k === i + 1 || k % 5 === 0) && (
              <text x={X(p.x) + 6} y={Y(p.y) + 14} fontSize={10} fill={PALETTE.muted} fontFamily={MONO}>
                M{sub(k)}
              </text>
            )}
          </g>
        ))}
        {showAll &&
          visible.slice(0, -1).map((p, k) =>
            vels[k] && (k + 1) * tau <= t + 1e-9 ? <Arrow key={k} x1={X(p.x)} y1={Y(p.y)} x2={X(p.x) + vels[k].x * kv} y2={Y(p.y) - vels[k].y * kv} color={PALETTE.blue} width={1.2} head={6} opacity={0.5} /> : null,
          )}

        {/* construction en M_i */}
        {ready && Mi && Mi1 && (
          <g>
            <Arrow x1={X(Mi.x)} y1={Y(Mi.y)} x2={X(Mi.x) + vi.x * kv} y2={Y(Mi.y) - vi.y * kv} color={PALETTE.blue} width={2.2} />
            <VecLabel x={X(Mi.x) + vi.x * kv + 4} y={Y(Mi.y) - vi.y * kv - 4} name="v" sub={String(i)} color={PALETTE.blue} />
            <Arrow x1={X(Mi1.x)} y1={Y(Mi1.y)} x2={X(Mi1.x) + vi1.x * kv} y2={Y(Mi1.y) - vi1.y * kv} color={PALETTE.teal} width={2.2} />
            <VecLabel x={X(Mi1.x) + vi1.x * kv + 4} y={Y(Mi1.y) - vi1.y * kv - 4} name="v" sub={String(i + 1)} color={PALETTE.teal} />
            {/* report de v_{i+1} en M_i (construction de Δv) */}
            <Arrow x1={X(Mi.x)} y1={Y(Mi.y)} x2={X(Mi.x) + vi1.x * kv} y2={Y(Mi.y) - vi1.y * kv} color={PALETTE.teal} width={1.2} dashed head={6} />
            {ndv > 1e-9 && (
              <>
                <Arrow x1={X(Mi.x) + vi.x * kv} y1={Y(Mi.y) - vi.y * kv} x2={X(Mi.x) + vi1.x * kv} y2={Y(Mi.y) - vi1.y * kv} color={PALETTE.orange} width={1.2} dashed head={6} />
                <Arrow x1={X(Mi.x)} y1={Y(Mi.y)} x2={X(Mi.x) + dv.x * kdv} y2={Y(Mi.y) - dv.y * kdv} color={PALETTE.orange} width={2.6} />
                <VecLabel x={X(Mi.x) + dv.x * kdv + 6} y={Y(Mi.y) - dv.y * kdv + 14} name="Δv" sub={String(i)} color={PALETTE.orange} />
              </>
            )}
            {nF > 1e-9 && (
              <>
                <Arrow x1={X(Mi.x) + 3} y1={Y(Mi.y)} x2={X(Mi.x) + 3 + ((Fth.x * tau) / m) * kdv} y2={Y(Mi.y) - ((Fth.y * tau) / m) * kdv} color={PALETTE.red} width={1.6} dashed />
                <VecLabel x={X(Mi.x) + ((Fth.x * tau) / m) * kdv - 30} y={Y(Mi.y) - ((Fth.y * tau) / m) * kdv + 4} name="ΣF" color={PALETTE.red} size={12} />
              </>
            )}
          </g>
        )}
        {!ready && (
          <text x={SW / 2} y={22} textAnchor="middle" fontSize={11} fill={PALETTE.muted} fontFamily={FONT}>
            Lancez l’animation : la construction en M{sub(i)} apparaît quand M{sub(i + 2)} est enregistré.
          </text>
        )}
        {/* mobile */}
        <circle cx={X(cur.x)} cy={Y(cur.y)} r={8} fill={PALETTE.orange} stroke={PALETTE.fg} />
      </svg>
      <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-muted-foreground">
        <span style={{ color: PALETTE.blue }}>■ v_i (échelle : {fmt(55 / kv, 2)} m/s ↔ 55 px)</span>
        <span style={{ color: PALETTE.orange }}>■ Δv_i (échelle agrandie)</span>
        <span style={{ color: PALETTE.red }}>┅ ΣF·Δt/m (même échelle que Δv)</span>
      </div>
    </WidgetFrame>
  )
}

function sub(n: number) {
  return String(n)
    .split('')
    .map((c) => '₀₁₂₃₄₅₆₇₈₉'[+c])
    .join('')
}
