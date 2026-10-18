import { useMemo, useRef, useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Slider } from '@/components/ui/slider'
import { Segmented } from '@/components/ui/tabs'
import { Stat, Switch } from '@/components/ui/misc'
import { Select } from '@/components/ui/input'
import { Tex } from '@/components/Tex'
import { Plot, FunctionPath, Point, PALETTE } from '@/lib/plot'
import { clamp, fmt } from '@/lib/utils'
import { Arrow, VecLabel, sciParts, sciText, texSci, FONT, MONO } from './_physique/common'

type Mode = 'electrique' | 'gravitation'
type Props = { mode?: Mode }

const K = 8.99e9 // N·m²·C⁻²
const G = 6.67e-11 // N·m²·kg⁻²
const W = 640
const H = 360

interface Body {
  label: string
  color: string
  r: number // rayon dessiné (px)
}
interface GravPreset {
  label: string
  A: Body & { exp: number; min: number; max: number; def: number; unit: string }
  B: Body & { exp: number; min: number; max: number; def: number; unit: string }
  d: { exp: number; min: number; max: number; def: number; unit: string; ppu: number }
  note: string
}

const GRAV: Record<string, GravPreset> = {
  labo: {
    label: 'Deux sphères (laboratoire)',
    A: { label: 'A', color: 'hsl(240 4% 55%)', r: 22, exp: 0, min: 1, max: 1000, def: 500, unit: 'kg' },
    B: { label: 'B', color: 'hsl(240 4% 70%)', r: 11, exp: 0, min: 1, max: 100, def: 10, unit: 'kg' },
    d: { exp: 0, min: 0.25, max: 3, def: 1, unit: 'm', ppu: 180 },
    note: 'Entre objets usuels, la force gravitationnelle est minuscule : elle n’est perceptible que si l’un des corps est astronomique.',
  },
  'terre-lune': {
    label: 'Terre – Lune',
    A: { label: 'Terre', color: PALETTE.blue, r: 20, exp: 24, min: 0.5, max: 20, def: 5.97, unit: 'kg' },
    B: { label: 'Lune', color: 'hsl(240 4% 62%)', r: 9, exp: 22, min: 1, max: 100, def: 7.35, unit: 'kg' },
    d: { exp: 8, min: 0.6, max: 9, def: 3.84, unit: 'm', ppu: 60 },
    note: 'C’est cette force qui maintient la Lune sur son orbite autour de la Terre (et qui provoque les marées).',
  },
  'soleil-terre': {
    label: 'Soleil – Terre',
    A: { label: 'Soleil', color: PALETTE.yellow, r: 28, exp: 30, min: 0.2, max: 5, def: 1.99, unit: 'kg' },
    B: { label: 'Terre', color: PALETTE.blue, r: 9, exp: 24, min: 0.5, max: 20, def: 5.97, unit: 'kg' },
    d: { exp: 11, min: 0.3, max: 3.6, def: 1.5, unit: 'm', ppu: 150 },
    note: 'Le Soleil attire la Terre… et la Terre attire le Soleil avec une force de même valeur (principe des actions réciproques).',
  },
  'terre-objet': {
    label: 'Terre – objet (poids)',
    A: { label: 'Terre', color: PALETTE.blue, r: 121, exp: 24, min: 0.5, max: 20, def: 5.97, unit: 'kg' },
    B: { label: 'objet', color: PALETTE.orange, r: 6, exp: 0, min: 0.1, max: 100, def: 1, unit: 'kg' },
    d: { exp: 6, min: 6.37, max: 24, def: 6.37, unit: 'm', ppu: 20 },
    note: 'À la surface (d = R_T ≈ 6,37 × 10⁶ m), F = m·g avec g = G·M_T/R_T² ≈ 9,8 N/kg : le poids est l’attraction gravitationnelle de la Terre.',
  },
}

const ELEC = { ppu: 20, min: 1.5, max: 28, def: 10, r: 14 }

function uniformName(e: number) {
  return e === 0 ? '' : ` (×10${String(e).replace('-', '⁻').replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+c])})`
}

type Vec = { x: number; y: number }

/** Lignes de champ par intégration RK2 (coordonnées pixels). */
function fieldLines(bodies: { p: Vec; s: number; r: number }[], mode: Mode) {
  const field = (x: number, y: number) => {
    let ex = 0,
      ey = 0
    for (const b of bodies) {
      const dx = x - b.p.x,
        dy = y - b.p.y
      const r2 = dx * dx + dy * dy
      const r3 = Math.pow(r2, 1.5) + 1e-9
      ex += (b.s * dx) / r3
      ey += (b.s * dy) / r3
    }
    return { ex, ey }
  }
  const lines: { pts: Vec[]; arrows: { x: number; y: number; a: number }[] }[] = []
  const smax = Math.max(...bodies.map((b) => Math.abs(b.s)), 1e-30)
  const anyPos = bodies.some((b) => b.s > 0)
  bodies.forEach((src, si) => {
    if (src.s === 0) return
    const n = mode === 'electrique' ? Math.max(3, Math.round((18 * Math.abs(src.s)) / 50)) : Math.max(5, Math.round((18 * Math.abs(src.s)) / smax))
    // sens d'intégration : +1 = dans le sens du champ
    const dir = src.s > 0 ? 1 : -1
    const otherIdx = bodies.findIndex((_, j) => j !== si)
    const other = bodies[otherIdx]
    const baseAng = other ? Math.atan2(other.p.y - src.p.y, other.p.x - src.p.x) : 0
    for (let k = 0; k < n; k++) {
      const ang = baseAng + ((k + 0.5) * 2 * Math.PI) / n
      let x = src.p.x + (src.r + 2) * Math.cos(ang)
      let y = src.p.y + (src.r + 2) * Math.sin(ang)
      const pts: Vec[] = [{ x, y }]
      let endedOn: number | null = null
      const h = 3
      for (let step = 0; step < 1200; step++) {
        const f1 = field(x, y)
        const n1 = Math.hypot(f1.ex, f1.ey)
        if (n1 < 1e-14) break
        const mx = x + ((dir * f1.ex) / n1) * h * 0.5
        const my = y + ((dir * f1.ey) / n1) * h * 0.5
        const f2 = field(mx, my)
        const n2 = Math.hypot(f2.ex, f2.ey)
        if (n2 < 1e-14) break
        x += ((dir * f2.ex) / n2) * h
        y += ((dir * f2.ey) / n2) * h
        pts.push({ x, y })
        if (x < -30 || x > W + 30 || y < -30 || y > H + 30) break
        let hit = false
        bodies.forEach((b, j) => {
          if (j !== si && Math.hypot(x - b.p.x, y - b.p.y) < b.r) {
            hit = true
            endedOn = j
          }
        })
        if (hit) break
      }
      // ligne issue d'une charge négative qui aboutit sur une charge positive : déjà tracée
      if (mode === 'electrique' && dir < 0 && anyPos && endedOn !== null && bodies[endedOn].s > 0) continue
      if (pts.length < 4) continue
      // flèches dans le sens réel du champ
      const arrows: { x: number; y: number; a: number }[] = []
      const marks = pts.length > 160 ? [0.3, 0.7] : [0.5]
      for (const m of marks) {
        const i = Math.floor(pts.length * m)
        const p = pts[i]
        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) continue
        const f = field(p.x, p.y)
        arrows.push({ x: p.x, y: p.y, a: Math.atan2(f.ey, f.ex) })
      }
      lines.push({ pts, arrows })
    }
  })
  return lines
}

export default function ForceField({ mode: mode0 = 'electrique' }: Props) {
  const [mode, setMode] = useState<Mode>(mode0 === 'gravitation' ? 'gravitation' : 'electrique')
  const [qA, setQA] = useState(30)
  const [qB, setQB] = useState(-20)
  const [presetKey, setPresetKey] = useState<keyof typeof GRAV>('terre-lune')
  const preset = GRAV[presetKey]
  const [mA, setMA] = useState(preset.A.def)
  const [mB, setMB] = useState(preset.B.def)
  const [showLines, setShowLines] = useState(true)
  const [showVec, setShowVec] = useState(true)

  const ppu = mode === 'electrique' ? ELEC.ppu : preset.d.ppu
  const rA = mode === 'electrique' ? ELEC.r : preset.A.r
  const rB = mode === 'electrique' ? ELEC.r : preset.B.r
  const ax0 = mode === 'gravitation' && presetKey === 'terre-objet' ? 140 : 160
  const initPos = (dUnits: number, ppu_: number, axStart: number) => ({
    A: { x: axStart, y: H / 2 },
    B: { x: Math.min(axStart + dUnits * ppu_, W - 20), y: H / 2 },
  })
  const [pos, setPos] = useState(() => (mode0 === 'gravitation' ? initPos(GRAV['terre-lune'].d.def, GRAV['terre-lune'].d.ppu, 160) : initPos(ELEC.def, ELEC.ppu, 160)))

  const switchMode = (m: Mode) => {
    setMode(m)
    if (m === 'electrique') setPos(initPos(ELEC.def, ELEC.ppu, 160))
    else setPos(initPos(preset.d.def, preset.d.ppu, presetKey === 'terre-objet' ? 140 : 160))
  }
  const switchPreset = (k: keyof typeof GRAV) => {
    const p = GRAV[k]
    setPresetKey(k)
    setMA(p.A.def)
    setMB(p.B.def)
    setPos(initPos(p.d.def, p.d.ppu, k === 'terre-objet' ? 140 : 160))
  }

  const dPx = Math.hypot(pos.B.x - pos.A.x, pos.B.y - pos.A.y)
  const dUnits = dPx / ppu
  const dMin = mode === 'electrique' ? ELEC.min : preset.d.min
  const dMax = mode === 'electrique' ? ELEC.max : preset.d.max
  const dSI = mode === 'electrique' ? dUnits * 1e-2 : dUnits * 10 ** preset.d.exp
  const mAkg = mA * 10 ** preset.A.exp
  const mBkg = mB * 10 ** preset.B.exp

  const Fsigned = mode === 'electrique' ? (K * qA * 1e-9 * qB * 1e-9) / (dSI * dSI) : (-G * mAkg * mBkg) / (dSI * dSI) // >0 : répulsive
  const F = Math.abs(Fsigned)
  const Fref = mode === 'electrique' ? (K * (25e-9) ** 2) / 0.1 ** 2 : (G * preset.A.def * 10 ** preset.A.exp * preset.B.def * 10 ** preset.B.exp) / (preset.d.def * 10 ** preset.d.exp) ** 2
  const fieldAtB = mode === 'electrique' ? (K * Math.abs(qA) * 1e-9) / (dSI * dSI) : (G * mAkg) / (dSI * dSI)

  // ---- drag ----
  const svgRef = useRef<SVGSVGElement>(null)
  const drag = useRef<null | 'A' | 'B'>(null)
  const toSvg = (e: React.PointerEvent) => {
    const r = svgRef.current!.getBoundingClientRect()
    return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H }
  }
  const moveBody = (which: 'A' | 'B', p: Vec) => {
    setPos((old) => {
      const me = which === 'A' ? rA : rB
      let x = clamp(p.x, me * 0.3 + 4, W - 4)
      let y = clamp(p.y, 12, H - 12)
      const other = which === 'A' ? old.B : old.A
      let dx = x - other.x,
        dy = y - other.y
      let d = Math.hypot(dx, dy)
      const minPx = Math.max(dMin * ppu, rA + rB + 2)
      const maxPx = dMax * ppu
      if (d < 1e-6) {
        dx = 1
        dy = 0
        d = 1
      }
      const dd = clamp(d, minPx, maxPx)
      x = other.x + (dx / d) * dd
      y = other.y + (dy / d) * dd
      return which === 'A' ? { A: { x, y }, B: old.B } : { A: old.A, B: { x, y } }
    })
  }
  const setDistance = (du: number) => {
    setPos((old) => {
      let ux = (old.B.x - old.A.x) / (dPx || 1)
      let uy = (old.B.y - old.A.y) / (dPx || 1)
      const px = du * ppu
      const cx = (old.A.x + old.B.x) / 2
      const cy = (old.A.y + old.B.y) / 2
      let A = { x: cx - (ux * px) / 2, y: cy - (uy * px) / 2 }
      let B = { x: cx + (ux * px) / 2, y: cy + (uy * px) / 2 }
      const inside = (p: Vec) => p.x >= 4 && p.x <= W - 4 && p.y >= 10 && p.y <= H - 10
      if (!inside(A) || !inside(B)) {
        ux = 1
        uy = 0
        const left = clamp(W / 2 - px / 2, 10, W - 10 - px)
        A = { x: Math.max(left, rA * 0.3 + 4), y: H / 2 }
        B = { x: A.x + px, y: H / 2 }
      }
      return { A, B }
    })
  }

  const bodies = useMemo(
    () =>
      mode === 'electrique'
        ? [
            { p: pos.A, s: qA, r: rA },
            { p: pos.B, s: qB, r: rB },
          ]
        : [
            { p: pos.A, s: -mAkg, r: rA },
            { p: pos.B, s: -mBkg, r: rB },
          ],
    [mode, pos, qA, qB, mAkg, mBkg, rA, rB],
  )
  const lines = useMemo(() => (showLines ? fieldLines(bodies, mode) : []), [bodies, mode, showLines])

  // vecteurs force
  const ux = (pos.B.x - pos.A.x) / dPx
  const uy = (pos.B.y - pos.A.y) / dPx
  const Lraw = (55 * F) / Fref
  const L = Math.min(Lraw, 170)
  const capped = Lraw > 170
  const sgn = Fsigned >= 0 ? 1 : -1 // F_A/B = sgn·F·u_AB
  const FonB = { x: pos.B.x + sgn * ux * L, y: pos.B.y + sgn * uy * L }
  const FonA = { x: pos.A.x - sgn * ux * L, y: pos.A.y - sgn * uy * L }

  const chargeColor = (q: number) => (q > 0 ? PALETTE.red : q < 0 ? PALETTE.blue : 'hsl(var(--muted-foreground))')

  // Courbe F(d)
  const { e: fe } = sciParts(F || Fref)
  const scale = 10 ** fe
  const fOfD = (du: number) => {
    const ds = mode === 'electrique' ? du * 1e-2 : du * 10 ** preset.d.exp
    return mode === 'electrique' ? (K * Math.abs(qA * qB) * 1e-18) / (ds * ds) / scale : (G * mAkg * mBkg) / (ds * ds) / scale
  }
  const yMaxPlot = Math.max(F / scale, 1e-9) * 3.2

  const dUnitLabel = mode === 'electrique' ? 'cm' : preset.d.exp === 0 ? 'm' : `${uniformName(preset.d.exp).trim().slice(1, -1)} m`
  const attractive = mode === 'gravitation' || Fsigned < 0
  const nul = F === 0

  const controls = (
    <>
      <Segmented
        value={mode}
        onChange={switchMode}
        options={[
          { value: 'electrique', label: 'Électrique' },
          { value: 'gravitation', label: 'Gravitation' },
        ]}
      />
      {mode === 'electrique' ? (
        <>
          <Slider label={<Tex>{'q_A'}</Tex>} value={qA} min={-50} max={50} step={1} digits={0} unit="nC" onChange={setQA} />
          <Slider label={<Tex>{'q_B'}</Tex>} value={qB} min={-50} max={50} step={1} digits={0} unit="nC" onChange={setQB} />
        </>
      ) : (
        <>
          <Select value={presetKey} onChange={(e) => switchPreset(e.target.value as keyof typeof GRAV)} aria-label="Situation">
            {Object.entries(GRAV).map(([k, p]) => (
              <option key={k} value={k}>
                {p.label}
              </option>
            ))}
          </Select>
          <Slider
            label={<span>m<sub>A</sub> ({preset.A.label}){uniformName(preset.A.exp)}</span>}
            value={mA}
            min={preset.A.min}
            max={preset.A.max}
            step={(preset.A.max - preset.A.min) / 200}
            unit="kg"
            onChange={setMA}
          />
          <Slider
            label={<span>m<sub>B</sub> ({preset.B.label}){uniformName(preset.B.exp)}</span>}
            value={mB}
            min={preset.B.min}
            max={preset.B.max}
            step={(preset.B.max - preset.B.min) / 200}
            unit="kg"
            onChange={setMB}
          />
        </>
      )}
      <Slider
        label={
          <span>
            distance d{mode === 'gravitation' ? uniformName(preset.d.exp) : ''}
          </span>
        }
        value={clamp(dUnits, dMin, dMax)}
        min={dMin}
        max={dMax}
        step={(dMax - dMin) / 300}
        unit={mode === 'electrique' ? 'cm' : 'm'}
        onChange={setDistance}
      />
      <div className="flex flex-col gap-2">
        <Switch checked={showLines} onChange={setShowLines} label="Lignes de champ" />
        <Switch checked={showVec} onChange={setShowVec} label="Vecteurs force" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Stat label="d" value={`${sciText(dSI)} m`} />
        <Stat label="F" value={`${sciText(F)} N`} tone={nul ? undefined : attractive ? 'info' : 'destructive'} />
        <Stat label={mode === 'electrique' ? 'E créé par A en B' : 'g créé par A en B'} value={`${sciText(fieldAtB)} ${mode === 'electrique' ? 'V/m' : 'N/kg'}`} className="col-span-2" />
        <Stat label="Nature" value={nul ? 'aucune' : attractive ? 'attractive' : 'répulsive'} className="col-span-2" />
      </div>
    </>
  )

  return (
    <WidgetFrame
      title={mode === 'electrique' ? 'Loi de Coulomb' : 'Loi de la gravitation universelle'}
      subtitle="Faites glisser A ou B pour déplacer les corps"
      controls={controls}
      footer={
        <div className="space-y-1">
          {mode === 'electrique' ? (
            <Tex display>{String.raw`F_{A/B} = F_{B/A} = k\,\frac{|q_A\,q_B|}{d^2} = 8{,}99\times10^{9} \times \frac{${texSci(Math.abs(qA * 1e-9))} \times ${texSci(Math.abs(qB * 1e-9))}}{(${texSci(dSI)})^2} = ${texSci(F)}\ \text{N}`}</Tex>
          ) : (
            <Tex display>{String.raw`F_{A/B} = F_{B/A} = G\,\frac{m_A\,m_B}{d^2} = 6{,}67\times10^{-11} \times \frac{${texSci(mAkg)} \times ${texSci(mBkg)}}{(${texSci(dSI)})^2} = ${texSci(F)}\ \text{N}`}</Tex>
          )}
          <p className="text-muted-foreground">
            {mode === 'electrique'
              ? nul
                ? 'Une des charges est nulle : aucune interaction électrostatique.'
                : `Charges de ${qA * qB > 0 ? 'même signe : elles se repoussent' : 'signes contraires : elles s’attirent'}. Les deux forces ont même direction (la droite AB), même valeur, et des sens opposés. Si d double, F est divisée par 4 (loi en 1/d²).`
              : `${preset.note} Si d double, F est divisée par 4.`}
            {capped && showVec ? ' (Longueur des flèches plafonnée.)' : ''}
          </p>
        </div>
      }
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full touch-none select-none border bg-background"
        onPointerMove={(e) => {
          if (!drag.current) return
          moveBody(drag.current, toSvg(e))
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerLeave={() => (drag.current = null)}
      >
        <defs>
          <pattern id="ff-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0 L0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.6" />
          </pattern>
          <clipPath id="ff-clip">
            <rect x="0" y="0" width={W} height={H} />
          </clipPath>
        </defs>
        <rect width={W} height={H} fill="url(#ff-grid)" opacity={0.6} />
        <g clipPath="url(#ff-clip)">
          {lines.map((l, i) => (
            <g key={i}>
              <polyline points={l.pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')} fill="none" stroke={PALETTE.muted} strokeWidth={1} opacity={0.75} />
              {l.arrows.map((a, j) => (
                <path
                  key={j}
                  d={`M${a.x + 5 * Math.cos(a.a)},${a.y + 5 * Math.sin(a.a)} L${a.x - 4 * Math.cos(a.a - 0.6)},${a.y - 4 * Math.sin(a.a - 0.6)} L${a.x - 4 * Math.cos(a.a + 0.6)},${a.y - 4 * Math.sin(a.a + 0.6)} Z`}
                  fill={PALETTE.muted}
                />
              ))}
            </g>
          ))}
        </g>

        {/* cote de distance */}
        <line x1={pos.A.x} y1={pos.A.y} x2={pos.B.x} y2={pos.B.y} stroke={PALETTE.fg} strokeWidth={0.8} strokeDasharray="3 4" opacity={0.6} />
        <text
          x={(pos.A.x + pos.B.x) / 2 - uy * 14}
          y={(pos.A.y + pos.B.y) / 2 + ux * 14 + 4}
          textAnchor="middle"
          fontSize={11}
          fontFamily={MONO}
          fill={PALETTE.muted}
        >
          d = {fmt(dUnits, 2)} {dUnitLabel}
        </text>

        {/* corps */}
        {(['A', 'B'] as const).map((k) => {
          const p = pos[k]
          const r = k === 'A' ? rA : rB
          const isE = mode === 'electrique'
          const q = k === 'A' ? qA : qB
          const color = isE ? chargeColor(q) : k === 'A' ? preset.A.color : preset.B.color
          const label = isE ? k : k === 'A' ? preset.A.label : preset.B.label
          const sub = isE ? `${q > 0 ? '+' : ''}${q} nC` : `${sciText(k === 'A' ? mAkg : mBkg)} kg`
          return (
            <g
              key={k}
              style={{ cursor: 'grab' }}
              onPointerDown={(e) => {
                ;(e.target as Element).setPointerCapture?.(e.pointerId)
                drag.current = k
              }}
            >
              <circle cx={p.x} cy={p.y} r={Math.max(r, 12) + 6} fill="transparent" />
              <circle cx={p.x} cy={p.y} r={r} fill={color} fillOpacity={isE ? 0.9 : 0.85} stroke={PALETTE.fg} strokeWidth={1} />
              {isE && (
                <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize={16} fontWeight={700} fill="white" fontFamily={FONT}>
                  {q > 0 ? '+' : q < 0 ? '−' : '0'}
                </text>
              )}
              <text x={p.x} y={p.y + Math.min(r, 40) + 16} textAnchor="middle" fontSize={12} fontWeight={600} fill={PALETTE.fg} fontFamily={FONT}>
                {label}
              </text>
              <text x={p.x} y={p.y + Math.min(r, 40) + 29} textAnchor="middle" fontSize={10} fill={PALETTE.muted} fontFamily={MONO}>
                {sub}
              </text>
            </g>
          )
        })}

        {showVec && !nul && (
          <g pointerEvents="none">
            <Arrow x1={pos.B.x} y1={pos.B.y} x2={FonB.x} y2={FonB.y} color={PALETTE.green} width={2.5} />
            <Arrow x1={pos.A.x} y1={pos.A.y} x2={FonA.x} y2={FonA.y} color={PALETTE.orange} width={2.5} />
            <VecLabel x={FonB.x + 6} y={FonB.y - 8} name="F" sub="A/B" color={PALETTE.green} />
            <VecLabel x={FonA.x + 6} y={FonA.y - 8} name="F" sub="B/A" color={PALETTE.orange} />
          </g>
        )}
        <text x={8} y={16} fontSize={10} fill={PALETTE.muted} fontFamily={MONO}>
          {mode === 'electrique' ? 'lignes de champ électrostatique' : 'lignes de champ de gravitation'} · tailles des corps non à l’échelle
        </text>
      </svg>

      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Valeur de la force en fonction de d (F en ×10<sup>{fe}</sup> N)
          </span>
          <span className="font-mono">F ∝ 1/d²</span>
        </div>
        <Plot xMin={0} xMax={dMax * 1.02} yMin={0} yMax={yMaxPlot} height={150} xLabel={`d (${dUnitLabel})`} yLabel="F">
          <FunctionPath f={fOfD} from={dMin * 0.6} color={PALETTE.violet} />
          {!nul && <Point x={dUnits} y={F / scale} color={PALETTE.green} label="" />}
        </Plot>
      </div>
    </WidgetFrame>
  )
}
