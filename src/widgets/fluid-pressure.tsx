import { useRef, useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Slider } from '@/components/ui/slider'
import { Segmented } from '@/components/ui/tabs'
import { Stat, Switch } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { Plot, FunctionPath, Point, Segment, PALETTE } from '@/lib/plot'
import { clamp, fmt } from '@/lib/utils'
import { Arrow, PlayControls, useAnimationFrame, texNum, FONT, MONO } from './_physique/common'

type Fluid = 'eau' | 'huile' | 'mercure'
type Props = { fluid?: Fluid; mode?: 'hydrostatique' | 'mariotte' }

const FLUIDS: Record<Fluid, { label: string; rho: number; color: string }> = {
  eau: { label: 'Eau', rho: 1000, color: 'hsl(205 85% 55%)' },
  huile: { label: 'Huile', rho: 920, color: 'hsl(45 90% 50%)' },
  mercure: { label: 'Mercure', rho: 13600, color: 'hsl(220 8% 62%)' },
}
const g = 9.81
const HMAX = 10 // m

/* ------------------------------------------------------------------ */
/* Statique des fluides                                                */
/* ------------------------------------------------------------------ */

function PressureCube({ x, y, P, Pmax, color, label }: { x: number; y: number; P: number; Pmax: number; color: string; label: string }) {
  const s = 9
  const L = 8 + (26 * P) / Pmax
  return (
    <g>
      <rect x={x - s} y={y - s} width={2 * s} height={2 * s} fill="hsl(var(--background))" stroke={PALETTE.fg} strokeWidth={1.2} />
      <Arrow x1={x} y1={y - s - L} x2={x} y2={y - s - 1} color={color} width={2} head={7} />
      <Arrow x1={x} y1={y + s + L} x2={x} y2={y + s + 1} color={color} width={2} head={7} />
      <Arrow x1={x - s - L} y1={y} x2={x - s - 1} y2={y} color={color} width={2} head={7} />
      <Arrow x1={x + s + L} y1={y} x2={x + s + 1} y2={y} color={color} width={2} head={7} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill={PALETTE.fg} fontFamily={FONT}>
        {label}
      </text>
    </g>
  )
}

function Hydrostatic({ fluid, setFluid }: { fluid: Fluid; setFluid: (f: Fluid) => void }) {
  const [hA, setHA] = useState(2)
  const [hB, setHB] = useState(7)
  const [P0hPa, setP0] = useState(1013)
  const [S, setS] = useState(10) // cm²
  const { rho, color, label } = FLUIDS[fluid]
  const P0 = P0hPa * 100
  const PA = P0 + rho * g * hA
  const PB = P0 + rho * g * hB
  const dP = PB - PA
  const Pmax = P0 + rho * g * HMAX
  const F = PB * S * 1e-4

  // tank geometry
  const TW = 320
  const TH = 340
  const top = 50
  const bottom = 320
  const ppm = (bottom - top) / HMAX
  const yOf = (h: number) => top + h * ppm
  const svgRef = useRef<SVGSVGElement>(null)
  const drag = useRef<null | 'A' | 'B'>(null)
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return
    const r = svgRef.current!.getBoundingClientRect()
    const y = ((e.clientY - r.top) / r.height) * TH
    const h = Math.round(clamp((y - top) / ppm, 0, HMAX) * 10) / 10
    drag.current === 'A' ? setHA(h) : setHB(h)
  }

  const yScale = 1e5 // bar
  return (
    <WidgetFrame
      title="Pression dans un liquide au repos"
      subtitle="Loi fondamentale de la statique des fluides — déplacez les capteurs A et B"
      controls={
        <>
          <Segmented value={fluid} onChange={setFluid} options={(Object.keys(FLUIDS) as Fluid[]).map((f) => ({ value: f, label: FLUIDS[f].label }))} />
          <Slider label="profondeur de A" value={hA} min={0} max={HMAX} step={0.1} digits={1} unit="m" onChange={setHA} />
          <Slider label="profondeur de B" value={hB} min={0} max={HMAX} step={0.1} digits={1} unit="m" onChange={setHB} />
          <Slider label={<span>pression atmosphérique P<sub>0</sub></span>} value={P0hPa} min={950} max={1050} step={1} digits={0} unit="hPa" onChange={setP0} />
          <Slider label="surface pressée S (en B)" value={S} min={1} max={100} step={1} digits={0} unit="cm²" onChange={setS} />
          <div className="grid grid-cols-2 gap-2">
            <Stat label={<span>ρ ({label.toLowerCase()})</span>} value={`${fmt(rho, 0)} kg/m³`} className="col-span-2" />
            <Stat label="P_A" value={`${fmt(PA / 100, 0)} hPa`} />
            <Stat label="P_B" value={`${fmt(PB / 100, 0)} hPa`} />
            <Stat label="P_B − P_A" value={`${fmt(dP / 100, 0)} hPa`} tone={dP > 0 ? 'info' : dP < 0 ? 'warning' : undefined} />
            <Stat label="F = P_B·S" value={`${fmt(F, F < 10 ? 2 : 0)} N`} />
          </div>
        </>
      }
      footer={
        <div className="space-y-1">
          <Tex display>{String.raw`P_B - P_A = \rho\, g\,(z_A - z_B) = ${texNum(rho, 0)} \times 9{,}81 \times ${texNum(hB - hA, 1)} = ${texNum(dP, 0)}\ \text{Pa}`}</Tex>
          <p className="text-muted-foreground">
            La pression augmente avec la profondeur : chaque mètre de {label.toLowerCase()} ajoute {fmt((rho * g) / 100, 1)} hPa.
            {fluid === 'eau' && ' Il faut environ 10 m d’eau pour ajouter l’équivalent d’une atmosphère.'}
            {fluid === 'mercure' && ' Le mercure étant 13,6 fois plus dense que l’eau, 76 cm de mercure suffisent pour une atmosphère.'} La pression ne dépend que de la
            profondeur, pas de la forme du récipient, et la force pressante est perpendiculaire à la paroi.
          </p>
        </div>
      }
    >
      <div className="grid gap-3 md:grid-cols-2">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${TW} ${TH}`}
          className="h-auto w-full touch-none select-none border bg-background"
          onPointerMove={onMove}
          onPointerUp={() => (drag.current = null)}
          onPointerLeave={() => (drag.current = null)}
        >
          <defs>
            <linearGradient id="fp-liq" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={color} stopOpacity={0.18} />
              <stop offset="1" stopColor={color} stopOpacity={0.5} />
            </linearGradient>
          </defs>
          {/* air */}
          <text x={60} y={30} fontSize={11} fill={PALETTE.muted} fontFamily={FONT}>
            air — P₀ = {fmt(P0hPa, 0)} hPa
          </text>
          {[90, 140, 190].map((x) => (
            <Arrow key={x} x1={x + 20} y1={34} x2={x + 20} y2={top - 2} color={PALETTE.muted} width={1.2} head={6} />
          ))}
          {/* liquide */}
          <rect x={40} y={top} width={220} height={bottom - top} fill="url(#fp-liq)" />
          <path d={`M40,${top - 14} L40,${bottom} L260,${bottom} L260,${top - 14}`} fill="none" stroke={PALETTE.fg} strokeWidth={2} />
          <line x1={40} x2={260} y1={top} y2={top} stroke={color} strokeWidth={1.5} />
          {/* graduations */}
          {Array.from({ length: HMAX + 1 }, (_, i) => (
            <g key={i}>
              <line x1={262} x2={i % 5 === 0 ? 274 : 268} y1={yOf(i)} y2={yOf(i)} stroke={PALETTE.fg} strokeWidth={1} />
              {i % 2 === 0 && (
                <text x={278} y={yOf(i) + 4} fontSize={10} fill={PALETTE.muted} fontFamily={MONO}>
                  {i} m
                </text>
              )}
            </g>
          ))}
          <text x={286} y={top - 18} fontSize={10} fill={PALETTE.muted} fontFamily={FONT} textAnchor="middle">
            h
          </text>
          {/* écart */}
          <line x1={70} x2={70} y1={yOf(hA)} y2={yOf(hB)} stroke={PALETTE.violet} strokeWidth={1.2} strokeDasharray="4 3" />
          <text x={76} y={(yOf(hA) + yOf(hB)) / 2 + 4} fontSize={10} fill={PALETTE.violet} fontFamily={MONO}>
            Δh = {fmt(Math.abs(hB - hA), 1)} m
          </text>
          {(['A', 'B'] as const).map((k) => {
            const h = k === 'A' ? hA : hB
            const P = k === 'A' ? PA : PB
            const cx = k === 'A' ? 135 : 205
            return (
              <g
                key={k}
                style={{ cursor: 'ns-resize' }}
                onPointerDown={(e) => {
                  ;(e.target as Element).setPointerCapture?.(e.pointerId)
                  drag.current = k
                }}
              >
                <rect x={cx - 40} y={yOf(h) - 40} width={80} height={80} fill="transparent" />
                <PressureCube x={cx} y={yOf(h)} P={P} Pmax={Pmax} color={k === 'A' ? PALETTE.green : PALETTE.red} label={k} />
              </g>
            )
          })}
          <text x={150} y={bottom + 14} fontSize={10} fill={PALETTE.muted} textAnchor="middle" fontFamily={FONT}>
            flèches : forces pressantes sur un petit cube
          </text>
        </svg>
        <div>
          <div className="mb-1 text-xs text-muted-foreground">P en fonction de la profondeur (P en bar = 10⁵ Pa)</div>
          <Plot xMin={0} xMax={HMAX} yMin={0} yMax={Math.max(2.2, (Pmax / yScale) * 1.1)} height={330} width={400} xLabel="h (m)" yLabel="P (bar)">
            {(Object.keys(FLUIDS) as Fluid[])
              .filter((f) => f !== fluid)
              .map((f) => (
                <FunctionPath key={f} f={(h) => (P0 + FLUIDS[f].rho * g * h) / yScale} color={FLUIDS[f].color} width={1} dashed />
              ))}
            <FunctionPath f={(h) => (P0 + rho * g * h) / yScale} color={color} width={2.5} />
            <Segment x1={hA} y1={0} x2={hA} y2={PA / yScale} color={PALETTE.green} dashed width={1} />
            <Segment x1={hB} y1={0} x2={hB} y2={PB / yScale} color={PALETTE.red} dashed width={1} />
            <Point x={hA} y={PA / yScale} color={PALETTE.green} label="A" />
            <Point x={hB} y={PB / yScale} color={PALETTE.red} label="B" />
          </Plot>
          <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
            {(Object.keys(FLUIDS) as Fluid[]).map((f) => (
              <span key={f} className="inline-flex items-center gap-1">
                <span className="inline-block h-0.5 w-4" style={{ background: FLUIDS[f].color }} /> {FLUIDS[f].label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </WidgetFrame>
  )
}

/* ------------------------------------------------------------------ */
/* Loi de Mariotte                                                     */
/* ------------------------------------------------------------------ */

const N_PART = 46
type Particle = { x: number; y: number; vx: number; vy: number }
function makeParticles(): Particle[] {
  let s = 7
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  return Array.from({ length: N_PART }, () => {
    const a = rnd() * Math.PI * 2
    return { x: rnd(), y: rnd(), vx: Math.cos(a), vy: Math.sin(a) }
  })
}

function Mariotte() {
  const V0 = 40 // mL
  const P0 = 1013 // hPa
  const [V, setV] = useState(40)
  const [playing, setPlaying] = useState(true)
  const [inverse, setInverse] = useState(false)
  const parts = useRef<Particle[]>(makeParticles())
  const hits = useRef<{ t: number; n: number; rate: number }>({ t: 0, n: 0, rate: 0 })
  const [, setTick] = useState(0)
  const P = (P0 * V0) / V

  // géométrie seringue
  const SW = 560
  const SH = 245
  const bx = 40 // fond de la seringue
  const by = 125
  const bh = 80
  const pxPerMl = 7.5
  const len = V * pxPerMl
  const speed = 140 // px/s (température constante => vitesse moyenne constante)

  useAnimationFrame((dt) => {
    let n = 0
    for (const p of parts.current) {
      // coordonnées en px
      let x = bx + p.x * len
      let y = by + p.y * bh
      x += p.vx * speed * dt
      y += p.vy * speed * dt
      if (x < bx + 3) {
        x = bx + 3
        p.vx = Math.abs(p.vx)
        n++
      }
      if (x > bx + len - 3) {
        x = bx + len - 3
        p.vx = -Math.abs(p.vx)
        n++
      }
      if (y < by + 3) {
        y = by + 3
        p.vy = Math.abs(p.vy)
        n++
      }
      if (y > by + bh - 3) {
        y = by + bh - 3
        p.vy = -Math.abs(p.vy)
        n++
      }
      p.x = (x - bx) / len
      p.y = (y - by) / bh
    }
    const h = hits.current
    h.t += dt
    h.n += n
    if (h.t > 0.5) {
      // chocs par seconde et par unité de longueur de paroi (∝ pression)
      const perim = 2 * (len + bh)
      const r = h.n / h.t / perim
      h.rate = h.rate ? h.rate * 0.6 + r * 0.4 : r
      h.t = 0
      h.n = 0
    }
    setTick((t) => (t + 1) % 1000000)
  }, playing)

  const clampParts = () => {
    for (const p of parts.current) p.x = clamp(p.x, 0.01, 0.99)
  }

  // jauge
  const gx = 90
  const gy = 56
  const gr = 42
  const Pmin = 0
  const PmaxG = 5000
  const ang = Math.PI * (0.75 + 1.5 * clamp((P - Pmin) / (PmaxG - Pmin), 0, 1))

  return (
    <WidgetFrame
      title="Loi de Mariotte"
      subtitle="Gaz enfermé dans une seringue, à température constante"
      controls={
        <>
          <Slider label="volume V" value={V} min={8} max={60} step={0.5} digits={1} unit="mL" onChange={(v) => { setV(v); clampParts() }} />
          <PlayControls playing={playing} onToggle={() => setPlaying((p) => !p)} onReset={() => { setV(V0); parts.current = makeParticles() }} />
          <Switch checked={inverse} onChange={setInverse} label="Tracer P en fonction de 1/V" />
          <div className="grid grid-cols-2 gap-2">
            <Stat label="V" value={`${fmt(V, 1)} mL`} />
            <Stat label="P" value={`${fmt(P, 0)} hPa`} tone="info" />
            <Stat label="P × V" value={`${fmt(P * V, 0)} hPa·mL`} className="col-span-2" />
            <Stat label="chocs sur les parois (relatif)" value={fmt(hits.current.rate * 1000, 1)} className="col-span-2" />
          </div>
        </>
      }
      footer={
        <div className="space-y-1">
          <Tex display>{String.raw`P \times V = P_0 \times V_0 = ${texNum(P0, 0)}\ \text{hPa} \times ${V0}\ \text{mL} \quad\Rightarrow\quad P = \frac{${texNum(P0 * V0, 0)}}{${texNum(V, 1)}} = ${texNum(P, 0)}\ \text{hPa}`}</Tex>
          <p className="text-muted-foreground">
            Pour une quantité de gaz fixée et à température constante, le produit P·V reste constant : diviser le volume par 2 double la pression. À l’échelle
            microscopique, les entités sont plus serrées et frappent plus souvent les parois (la vitesse moyenne, liée à la température, ne change pas).
          </p>
        </div>
      }
    >
      <svg viewBox={`0 0 ${SW} ${SH}`} className="h-auto w-full select-none border bg-background">
        {/* corps de seringue */}
        <path d={`M${bx},${by} L${bx + 60 * pxPerMl + 20},${by} M${bx},${by + bh} L${bx + 60 * pxPerMl + 20},${by + bh}`} stroke={PALETTE.fg} strokeWidth={2} />
        <path d={`M${bx},${by} L${bx},${by + bh}`} stroke={PALETTE.fg} strokeWidth={3} />
        {/* raccord vers manomètre */}
        <path d={`M${bx},${by + bh / 2} L${bx - 16},${by + bh / 2} L${bx - 16},${gy} L${gx - gr},${gy}`} fill="none" stroke={PALETTE.muted} strokeWidth={2} />
        {/* graduations */}
        {Array.from({ length: 13 }, (_, i) => i * 5).map((ml) => (
          <g key={ml}>
            <line x1={bx + ml * pxPerMl} x2={bx + ml * pxPerMl} y1={by + bh} y2={by + bh + (ml % 10 === 0 ? 8 : 4)} stroke={PALETTE.fg} strokeWidth={1} />
            {ml % 10 === 0 && (
              <text x={bx + ml * pxPerMl} y={by + bh + 20} fontSize={10} textAnchor="middle" fill={PALETTE.muted} fontFamily={MONO}>
                {ml}
              </text>
            )}
          </g>
        ))}
        <text x={bx + 60 * pxPerMl + 24} y={by + bh + 20} fontSize={10} fill={PALETTE.muted} fontFamily={MONO}>
          mL
        </text>
        {/* gaz */}
        <rect x={bx} y={by} width={len} height={bh} fill={PALETTE.blue} opacity={0.06 + 0.12 * clamp(P / 4000, 0, 1)} />
        {parts.current.map((p, i) => (
          <circle key={i} cx={bx + p.x * len} cy={by + p.y * bh} r={3} fill={PALETTE.blue} />
        ))}
        {/* piston */}
        <rect x={bx + len} y={by + 2} width={10} height={bh - 4} fill={PALETTE.fg} opacity={0.85} />
        <rect x={bx + len + 10} y={by + bh / 2 - 4} width={SW - (bx + len + 10) - 10} height={8} fill={PALETTE.muted} />
        <rect x={SW - 14} y={by + 10} width={6} height={bh - 20} fill={PALETTE.muted} />
        {/* manomètre */}
        <circle cx={gx} cy={gy} r={gr} fill="hsl(var(--card))" stroke={PALETTE.fg} strokeWidth={1.5} />
        {Array.from({ length: 11 }, (_, i) => {
          const a = Math.PI * (0.75 + (1.5 * i) / 10)
          return (
            <line key={i} x1={gx + (gr - 2) * Math.cos(a)} y1={gy + (gr - 2) * Math.sin(a)} x2={gx + (gr - (i % 5 === 0 ? 10 : 6)) * Math.cos(a)} y2={gy + (gr - (i % 5 === 0 ? 10 : 6)) * Math.sin(a)} stroke={PALETTE.fg} strokeWidth={1} />
          )
        })}
        <line x1={gx} y1={gy} x2={gx + (gr - 12) * Math.cos(ang)} y2={gy + (gr - 12) * Math.sin(ang)} stroke={PALETTE.red} strokeWidth={2} />
        <circle cx={gx} cy={gy} r={3} fill={PALETTE.fg} />
        <text x={gx} y={gy + 24} textAnchor="middle" fontSize={10} fontFamily={MONO} fill={PALETTE.fg}>
          {fmt(P, 0)} hPa
        </text>
        <text x={gx + gr + 10} y={gy + 4} fontSize={10} fontFamily={FONT} fill={PALETTE.muted}>
          manomètre (0 → 5000 hPa)
        </text>
      </svg>
      <div className="mt-3">
        {inverse ? (
          <Plot xMin={0} xMax={0.13} yMin={0} yMax={5500} height={190} xLabel="1/V (mL⁻¹)" yLabel="P (hPa)">
            <FunctionPath f={(iv) => P0 * V0 * iv} from={1 / 60} to={1 / 8} color={PALETTE.violet} />
            <FunctionPath f={(iv) => P0 * V0 * iv} from={0} to={1 / 60} color={PALETTE.violet} dashed width={1} />
            <Point x={1 / V} y={P} color={PALETTE.red} label="" />
          </Plot>
        ) : (
          <Plot xMin={0} xMax={64} yMin={0} yMax={5500} height={190} xLabel="V (mL)" yLabel="P (hPa)">
            <FunctionPath f={(v) => (P0 * V0) / v} from={8} to={60} color={PALETTE.violet} />
            <Point x={V} y={P} color={PALETTE.red} label="" />
          </Plot>
        )}
        <div className="mt-1 text-xs text-muted-foreground">
          {inverse ? 'P est proportionnelle à 1/V : droite passant par l’origine.' : 'P en fonction de V : branche d’hyperbole (P = k / V).'}
        </div>
      </div>
    </WidgetFrame>
  )
}

export default function FluidPressure({ fluid: fluid0 = 'eau', mode: mode0 = 'hydrostatique' }: Props) {
  const [mode, setMode] = useState<'hydrostatique' | 'mariotte'>(mode0 === 'mariotte' ? 'mariotte' : 'hydrostatique')
  const [fluid, setFluid] = useState<Fluid>(fluid0 in FLUIDS ? fluid0 : 'eau')
  return (
    <div className="space-y-2">
      <Segmented
        value={mode}
        onChange={setMode}
        options={[
          { value: 'hydrostatique', label: 'Pression dans un liquide' },
          { value: 'mariotte', label: 'Loi de Mariotte (gaz)' },
        ]}
      />
      {mode === 'hydrostatique' ? <Hydrostatic fluid={fluid} setFluid={setFluid} /> : <Mariotte />}
    </div>
  )
}
