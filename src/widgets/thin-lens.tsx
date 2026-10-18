import { useRef, useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Slider } from '@/components/ui/slider'
import { Stat, Switch } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { Plot, PALETTE, usePlot } from '@/lib/plot'
import { clamp, fmt } from '@/lib/utils'
import { useAnimationFrame, texNum, FONT, MONO } from './_physique/common'

type Props = { f?: number; objectDistance?: number; objectHeight?: number }

const XR = 50 // cm de part et d'autre de la lentille
const PW = 760
const PH = 360
const YR = (PH / 2) * ((2 * XR) / PW) // isotrope
const LENS_H = 19

type P2 = [number, number]

/** Prolonge le segment p→q jusqu'à l'abscisse x (droite infinie). */
function atX(p: P2, q: P2, x: number): P2 {
  const dx = q[0] - p[0]
  if (Math.abs(dx) < 1e-12) return [x, q[1]]
  return [x, p[1] + ((q[1] - p[1]) * (x - p[0])) / dx]
}

function Ray({ pts, color, dashed, flow, width = 1.6 }: { pts: P2[]; color: string; dashed?: boolean; flow?: number; width?: number }) {
  const p = usePlot()
  const d = pts.map((q, i) => `${i ? 'L' : 'M'}${p.sx(q[0]).toFixed(1)},${p.sy(q[1]).toFixed(1)}`).join(' ')
  return (
    <g fill="none">
      <path d={d} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '5 5' : undefined} opacity={dashed ? 0.75 : 1} />
      {!dashed && flow !== undefined && <path d={d} stroke={color} strokeWidth={width + 2.2} strokeDasharray="3 22" strokeDashoffset={-flow} strokeLinecap="square" opacity={0.9} />}
    </g>
  )
}

/** Flèche d'orientation au milieu d'un segment. */
function MidArrow({ a, b, color }: { a: P2; b: P2; color: string }) {
  const p = usePlot()
  const X1 = p.sx(a[0]),
    Y1 = p.sy(a[1]),
    X2 = p.sx(b[0]),
    Y2 = p.sy(b[1])
  const L = Math.hypot(X2 - X1, Y2 - Y1)
  if (L < 30) return null
  const mx = (X1 + X2) / 2,
    my = (Y1 + Y2) / 2
  const an = Math.atan2(Y2 - Y1, X2 - X1)
  return <path d={`M${mx + 6 * Math.cos(an)},${my + 6 * Math.sin(an)} L${mx - 5 * Math.cos(an - 0.55)},${my - 5 * Math.sin(an - 0.55)} L${mx - 5 * Math.cos(an + 0.55)},${my - 5 * Math.sin(an + 0.55)} Z`} fill={color} />
}

function ObjArrow({ x, h, color, dashed, label }: { x: number; h: number; color: string; dashed?: boolean; label: [string, string] }) {
  const p = usePlot()
  const X = p.sx(x)
  const Y0 = p.sy(0)
  const Y1 = p.sy(h)
  const dir = h >= 0 ? 1 : -1
  return (
    <g>
      <line x1={X} x2={X} y1={Y0} y2={Y1 + dir * 6} stroke={color} strokeWidth={3} strokeDasharray={dashed ? '5 4' : undefined} />
      <path d={`M${X},${Y1} L${X - 6},${Y1 + dir * 11} L${X + 6},${Y1 + dir * 11} Z`} fill={color} />
      <text x={X} y={Y0 + (h >= 0 ? 16 : -8)} textAnchor="middle" fontSize={13} fontWeight={600} fill={color} fontFamily={FONT}>
        {label[0]}
      </text>
      <text x={X + 8} y={Y1 + (h >= 0 ? -4 : 14)} fontSize={13} fontWeight={600} fill={color} fontFamily={FONT}>
        {label[1]}
      </text>
    </g>
  )
}

function Lens({ f }: { f: number }) {
  const p = usePlot()
  const X = p.sx(0)
  const T = p.sy(LENS_H)
  const B = p.sy(-LENS_H)
  return (
    <g>
      <rect x={X - 3} y={T} width={6} height={B - T} fill={PALETTE.blue} opacity={0.12} />
      <line x1={X} x2={X} y1={T} y2={B} stroke={PALETTE.blue} strokeWidth={2.2} />
      <path d={`M${X - 8},${T + 10} L${X},${T} L${X + 8},${T + 10} M${X - 8},${B - 10} L${X},${B} L${X + 8},${B - 10}`} stroke={PALETTE.blue} strokeWidth={2.2} fill="none" />
      {[
        { x: -f, l: 'F' },
        { x: f, l: 'F′' },
      ].map((q) => (
        <g key={q.l}>
          <line x1={p.sx(q.x)} x2={p.sx(q.x)} y1={p.sy(0) - 6} y2={p.sy(0) + 6} stroke={PALETTE.fg} strokeWidth={2} />
          <text x={p.sx(q.x)} y={p.sy(0) + 19} textAnchor="middle" fontSize={13} fontWeight={600} fill={PALETTE.fg} fontFamily={FONT}>
            {q.l}
          </text>
        </g>
      ))}
      <text x={X + 6} y={p.sy(0) + 16} fontSize={13} fontWeight={600} fill={PALETTE.fg} fontFamily={FONT}>
        O
      </text>
    </g>
  )
}

function Axis() {
  const p = usePlot()
  const Y = p.sy(0)
  const ticks: number[] = []
  for (let x = -XR; x <= XR; x += 5) ticks.push(x)
  return (
    <g>
      <line x1={0} x2={p.width} y1={Y} y2={Y} stroke={PALETTE.fg} strokeWidth={1} />
      <path d={`M${p.width - 8},${Y - 4} L${p.width},${Y} L${p.width - 8},${Y + 4}`} fill="none" stroke={PALETTE.fg} />
      {ticks.map((x) => (
        <g key={x}>
          <line x1={p.sx(x)} x2={p.sx(x)} y1={Y - (x % 10 === 0 ? 3 : 2)} y2={Y + (x % 10 === 0 ? 3 : 2)} stroke={PALETTE.muted} />
          {x % 10 === 0 && x !== 0 && (
            <text x={p.sx(x)} y={p.height - 6} textAnchor="middle" fontSize={9} fill={PALETTE.muted} fontFamily={MONO}>
              {x}
            </text>
          )}
        </g>
      ))}
      <text x={p.width - 4} y={p.height - 6} textAnchor="end" fontSize={9} fill={PALETTE.muted} fontFamily={MONO}>
        cm
      </text>
      <text x={p.width - 10} y={Y - 8} textAnchor="end" fontSize={10} fill={PALETTE.muted} fontFamily={FONT}>
        sens de la lumière →
      </text>
    </g>
  )
}

/** Cote algébrique de O vers x, à la hauteur y (en cm). */
function Measure({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  const p = usePlot()
  const X0 = p.sx(0)
  const X1 = p.sx(clamp(x, -XR, XR))
  const Y = p.sy(y)
  if (Math.abs(X1 - X0) < 10) return null
  const s = Math.sign(X1 - X0)
  return (
    <g stroke={color} fill={color}>
      <line x1={X0} x2={X1} y1={Y} y2={Y} strokeWidth={1.2} />
      <path d={`M${X1},${Y} l${-s * 7},-3.5 l0,7 Z`} stroke="none" />
      <line x1={X0} x2={X0} y1={Y - 4} y2={Y + 4} />
      <text x={(X0 + X1) / 2} y={Y - 4} textAnchor="middle" fontSize={11} stroke="none" fontFamily={MONO}>
        {label}
      </text>
    </g>
  )
}

export default function ThinLens({ f: f0 = 10, objectDistance = 25, objectHeight = 4 }: Props) {
  const [f, setF] = useState(clamp(Math.abs(f0) || 10, 2, 20))
  const [xA, setXA] = useState(-clamp(Math.abs(objectDistance) || 25, 0.5, 48))
  const [h, setH] = useState(clamp(objectHeight || 4, -12, 12))
  const [rays, setRays] = useState({ r1: true, r2: true, r3: true })
  const [measures, setMeasures] = useState(true)
  const [flowOn, setFlowOn] = useState(true)
  const [flow, setFlow] = useState(0)
  useAnimationFrame((dt) => setFlow((v) => (v + dt * 40) % 2500), flowOn)

  const atInf = Math.abs(xA + f) < 0.05
  const xI = atInf ? Infinity : (f * xA) / (f + xA) // OA'
  const gamma = atInf ? Infinity : xI / xA
  const hI = gamma * h
  const real = !atInf && xI > 0
  const virt = !atInf && xI < 0
  const C = 100 / f // dioptries (f en cm)

  const B: P2 = [xA, h]
  const I: P2 = [0, h]
  const O: P2 = [0, 0]
  const Fp: P2 = [f, 0]
  const Fo: P2 = [-f, 0]
  const yJ = atInf ? NaN : (h * f) / (xA + f)
  const J: P2 = [0, yJ]
  const far = XR + 15
  const Bi: P2 = [xI, hI]

  const c1 = PALETTE.red
  const c2 = PALETTE.green
  const c3 = PALETTE.violet

  // drag
  const dragMode = useRef<null | 'obj' | 'focus'>(null)
  const onPointer = (x: number, y: number, kind: 'down' | 'move' | 'up') => {
    if (kind === 'up') {
      dragMode.current = null
      return
    }
    if (kind === 'down') {
      if (Math.abs(x - f) < 3 && Math.abs(y) < 3) dragMode.current = 'focus'
      else if (x < -0.5) dragMode.current = 'obj'
      else dragMode.current = null
    }
    if (dragMode.current === 'obj') {
      setXA(Math.round(clamp(x, -48, -0.5) * 2) / 2)
      let hh = Math.round(clamp(y, -12, 12) * 2) / 2
      if (Math.abs(hh) < 1) hh = hh < 0 ? -1 : 1
      setH(hh)
    } else if (dragMode.current === 'focus') setF(Math.round(clamp(x, 2, 20) * 2) / 2)
  }

  const nature = atInf
    ? 'image rejetée à l’infini'
    : `${real ? 'réelle' : 'virtuelle'}, ${gamma > 0 ? 'droite' : 'renversée'}, ${Math.abs(gamma) > 1 ? 'agrandie' : Math.abs(gamma) < 1 ? 'réduite' : 'même taille'}`
  const inFrame = !atInf && Math.abs(xI) <= XR && Math.abs(hI) <= YR

  const controls = (
    <>
      <Slider label="distance focale f′ = OF′" value={f} min={2} max={20} step={0.5} digits={1} unit="cm" onChange={setF} />
      <Slider label="position de l’objet OA" value={xA} min={-48} max={-0.5} step={0.5} digits={1} unit="cm" onChange={setXA} />
      <Slider label="taille de l’objet AB" value={h} min={-12} max={12} step={0.5} digits={1} unit="cm" onChange={(v) => setH(Math.abs(v) < 1 ? (v < 0 ? -1 : 1) : v)} />
      <div className="flex flex-col gap-2">
        <Switch checked={rays.r1} onChange={(v) => setRays((r) => ({ ...r, r1: v }))} label={<span style={{ color: c1 }}>Rayon parallèle à l’axe → passe par F′</span>} />
        <Switch checked={rays.r2} onChange={(v) => setRays((r) => ({ ...r, r2: v }))} label={<span style={{ color: c2 }}>Rayon passant par O → non dévié</span>} />
        <Switch checked={rays.r3} onChange={(v) => setRays((r) => ({ ...r, r3: v }))} label={<span style={{ color: c3 }}>Rayon passant par F → émerge parallèle</span>} />
        <Switch checked={measures} onChange={setMeasures} label="Mesures algébriques" />
        <Switch checked={flowOn} onChange={setFlowOn} label="Animer la lumière" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Stat label="OA" value={`${fmt(xA, 1)} cm`} />
        <Stat label="OA′" value={atInf ? '∞' : `${fmt(xI, 1)} cm`} tone={real ? 'success' : virt ? 'warning' : undefined} />
        <Stat label="vergence C = 1/f′" value={`${fmt(C, 1)} δ`} />
        <Stat label="γ = OA′/OA" value={atInf ? '∞' : fmt(gamma, 2)} />
        <Stat label="A′B′" value={atInf ? '∞' : `${fmt(hI, 1)} cm`} />
        <Stat label="AB" value={`${fmt(h, 1)} cm`} />
        <Stat label="Image" value={nature} className="col-span-2" />
      </div>
    </>
  )

  return (
    <WidgetFrame
      title="Lentille mince convergente"
      subtitle="Faites glisser l’objet (B) ou le foyer F′ — tracé des trois rayons particuliers"
      controls={controls}
      footer={
        <div className="space-y-1">
          {atInf ? (
            <Tex display>{String.raw`\overline{OA} = -f' \;\Rightarrow\; \frac{1}{\overline{OA'}} = \frac{1}{f'} + \frac{1}{\overline{OA}} = 0 \;:\; \text{image à l'infini}`}</Tex>
          ) : (
            <>
              <Tex display>{String.raw`\frac{1}{\overline{OA'}} - \frac{1}{\overline{OA}} = \frac{1}{\overline{OF'}} \;\Rightarrow\; \overline{OA'} = \frac{1}{\frac{1}{${texNum(f, 1)}} + \frac{1}{${texNum(xA, 1)}}} = ${texNum(xI, 1)}\ \text{cm}`}</Tex>
              <Tex display>{String.raw`\gamma = \frac{\overline{A'B'}}{\overline{AB}} = \frac{\overline{OA'}}{\overline{OA}} = \frac{${texNum(xI, 1)}}{${texNum(xA, 1)}} = ${texNum(gamma, 2)} \quad\Rightarrow\quad \overline{A'B'} = ${texNum(hI, 1)}\ \text{cm}`}</Tex>
            </>
          )}
          <p className="text-muted-foreground">
            {atInf
              ? 'L’objet est dans le plan focal objet : les rayons émergents sont parallèles entre eux, l’image est rejetée à l’infini (principe de l’œil au repos).'
              : real
                ? `Objet situé avant F : l’image est réelle (les rayons émergents se croisent réellement en B′), on peut la recueillir sur un écran. ${gamma < 0 ? 'γ < 0 : elle est renversée.' : ''}`
                : 'Objet entre F et O : les rayons émergents divergent ; ce sont leurs prolongements (en pointillés) qui se coupent en B′. L’image est virtuelle, droite et agrandie : c’est le principe de la loupe. Elle ne peut pas être recueillie sur un écran.'}
            {!atInf && !inFrame && ' (L’image sort du cadre.)'}
          </p>
        </div>
      }
    >
      <Plot xMin={-XR} xMax={XR} yMin={-YR} yMax={YR} width={PW} height={PH} axes={false} xStep={5} yStep={5} onPointer={onPointer}>
        <Axis />
        <Lens f={f} />

        {/* Rayon 1 : parallèle à l'axe */}
        {rays.r1 && (
          <g>
            <Ray pts={[B, I, atX(I, Fp, far)]} color={c1} flow={flowOn ? flow : undefined} />
            <MidArrow a={B} b={I} color={c1} />
            <MidArrow a={I} b={atX(I, Fp, Math.min(far, XR))} color={c1} />
            {(virt || atInf) && <Ray pts={[I, virt ? atX(I, Fp, Math.max(xI - 5, -far)) : atX(I, Fp, -far)]} color={c1} dashed width={1.2} />}
          </g>
        )}
        {/* Rayon 2 : par le centre optique */}
        {rays.r2 && (
          <g>
            <Ray pts={[B, O, atX(B, O, far)]} color={c2} flow={flowOn ? flow : undefined} />
            <MidArrow a={B} b={O} color={c2} />
            <MidArrow a={O} b={atX(B, O, Math.min(far, XR))} color={c2} />
            {virt && <Ray pts={[O, atX(B, O, Math.max(xI - 5, -far))]} color={c2} dashed width={1.2} />}
          </g>
        )}
        {/* Rayon 3 : par le foyer objet F */}
        {rays.r3 && !atInf && Math.abs(yJ) < 4 * YR && (
          <g>
            <Ray pts={[B, J, [far, yJ]]} color={c3} flow={flowOn ? flow : undefined} />
            <MidArrow a={B} b={J} color={c3} />
            <MidArrow a={J} b={[Math.min(far, XR), yJ]} color={c3} />
            {xA > -f && <Ray pts={[Fo, B]} color={c3} dashed width={1.1} />}
            {virt && <Ray pts={[J, [Math.max(xI - 5, -far), yJ]]} color={c3} dashed width={1.2} />}
          </g>
        )}

        {/* mesures algébriques */}
        {measures && (
          <g>
            <Measure x={xA} y={-YR + 6} label={`OA = ${fmt(xA, 1)}`} color={PALETTE.orange} />
            {!atInf && <Measure x={xI} y={-YR + 3} label={`OA′ = ${fmt(xI, 1)}`} color={real ? PALETTE.teal : PALETTE.pink} />}
            <Measure x={f} y={-YR + 9} label={`OF′ = ${fmt(f, 1)}`} color={PALETTE.muted} />
          </g>
        )}

        <ObjArrow x={xA} h={h} color={PALETTE.orange} label={['A', 'B']} />
        {!atInf && inFrame && <ObjArrow x={xI} h={hI} color={real ? PALETTE.teal : PALETTE.pink} dashed={virt} label={['A′', 'B′']} />}
        <DragHint x={f} />
      </Plot>
    </WidgetFrame>
  )
}

function DragHint({ x }: { x: number }) {
  const p = usePlot()
  return <rect x={p.sx(x) - 7} y={p.sy(0) - 7} width={14} height={14} fill="transparent" stroke={PALETTE.muted} strokeDasharray="2 2" style={{ cursor: 'ew-resize' }} />
}
