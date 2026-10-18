import { useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Plot, Segment, PALETTE, type PlotCtx } from '@/lib/plot'
import { Tex } from '@/components/Tex'
import { Button } from '@/components/ui/button'
import { Segmented } from '@/components/ui/tabs'
import { Stat, Switch } from '@/components/ui/misc'
import { cn, fmt } from '@/lib/utils'
import { Handle, Layer, OutlinedText, fracTex, nearest, snap, sqrtTex, texNum } from './_maths2/util'

interface Props {
  u?: [number, number]
  v?: [number, number]
}

type Vec = [number, number]
type Mode = 'coord' | 'norme' | 'projection' | 'polar'

const X_MAX = 6.3
const Y_MAX = 4.5

const isVec = (a: unknown): a is Vec => Array.isArray(a) && a.length === 2 && a.every((x) => typeof x === 'number' && Number.isFinite(x))
const clampVec = ([x, y]: Vec): Vec => [Math.max(-X_MAX + 0.3, Math.min(X_MAX - 0.3, x)), Math.max(-Y_MAX + 0.3, Math.min(Y_MAX - 0.3, y))]

/** nombre entre parenthèses s'il est négatif */
const par = (x: number) => (x < 0 ? `(${fracTex(x, 4)})` : fracTex(x, 4))

/** position d'étiquette : milieu du vecteur décalé perpendiculairement (côté side) */
function labelAt(a: Vec, side: number): Vec {
  const n = Math.hypot(a[0], a[1]) || 1
  return [a[0] / 2 - (side * 0.5 * a[1]) / n, a[1] / 2 + (side * 0.5 * a[0]) / n + 0.15]
}

/** norme exacte si possible */
const normTex = (n2: number) => sqrtTex(n2) ?? `\\approx ${texNum(Math.sqrt(n2), 3)}`

function VecLabel({ p, at, name, color }: { p: PlotCtx; at: Vec; name: string; color: string }) {
  const X = p.sx(at[0])
  const Y = p.sy(at[1])
  return (
    <g style={{ pointerEvents: 'none' }}>
      <OutlinedText x={X} y={Y} fill={color} size={14} weight={700} italic anchor="middle">
        {name}
      </OutlinedText>
      <path d={`M${X - 6},${Y - 13} L${X + 6},${Y - 13} M${X + 3},${Y - 16} L${X + 6},${Y - 13} L${X + 3},${Y - 10}`} stroke={color} strokeWidth={1.3} fill="none" />
    </g>
  )
}

export default function ScalarProduct({ u: u0, v: v0 }: Props) {
  const initU: Vec = isVec(u0) ? clampVec(u0) : [4, 1]
  const initV: Vec = isVec(v0) ? clampVec(v0) : [1, 3]
  const [u, setU] = useState<Vec>(initU)
  const [v, setV] = useState<Vec>(initV)
  const [mode, setMode] = useState<Mode>('projection')
  const [grid, setGrid] = useState(true)
  const drag = useRef<'u' | 'v' | null>(null)

  const place = (x: number, y: number): Vec => clampVec(grid ? [snap(x, 0.5), snap(y, 0.5)] : [x, y])

  const onPointer = (x: number, y: number, kind: 'down' | 'move' | 'up') => {
    if (kind === 'up') {
      drag.current = null
      return
    }
    if (kind === 'down') drag.current = nearest({ u, v }, x, y, 0.9)
    if (drag.current === 'u') setU(place(x, y))
    else if (drag.current === 'v') setV(place(x, y))
  }

  const dot = u[0] * v[0] + u[1] * v[1]
  const nu2 = u[0] ** 2 + u[1] ** 2
  const nv2 = v[0] ** 2 + v[1] ** 2
  const nu = Math.sqrt(nu2)
  const nv = Math.sqrt(nv2)
  const w: Vec = [u[0] + v[0], u[1] + v[1]]
  const nw2 = w[0] ** 2 + w[1] ** 2
  const nonNull = nu > 1e-9 && nv > 1e-9
  const cosT = nonNull ? Math.max(-1, Math.min(1, dot / (nu * nv))) : NaN
  const theta = nonNull ? Math.acos(cosT) : NaN
  const thetaDeg = (theta * 180) / Math.PI
  const ortho = Math.abs(dot) < 1e-9
  const det = u[0] * v[1] - u[1] * v[0]
  const colin = Math.abs(det) < 1e-9
  // projeté orthogonal H de l'extrémité de v sur la droite (O, u)
  const kH = nu2 > 1e-12 ? dot / nu2 : 0
  const H: Vec = [kH * u[0], kH * u[1]]
  const OH = Math.abs(kH) * nu

  const dotTex = fracTex(dot, 4)
  const tone = ortho ? 'info' : dot > 0 ? 'success' : 'destructive'

  const interp = !nonNull
    ? 'Un des vecteurs est nul : le produit scalaire est nul.'
    : ortho
      ? 'Produit scalaire nul : les vecteurs sont orthogonaux (angle droit, H est en O).'
      : colin
        ? dot > 0
          ? 'Vecteurs colinéaires de même sens : u·v = ‖u‖ × ‖v‖.'
          : 'Vecteurs colinéaires de sens contraires : u·v = −‖u‖ × ‖v‖.'
        : dot > 0
          ? 'Produit scalaire positif : l’angle est aigu, H est du même côté que u.'
          : 'Produit scalaire négatif : l’angle est obtus, H est du côté opposé à u.'

  const formulas: { id: Mode; label: string; tex: string }[] = [
    {
      id: 'coord',
      label: 'Coordonnées (repère orthonormé)',
      tex: `\\vec u\\cdot\\vec v = xx' + yy' = ${par(u[0])}\\times${par(v[0])} + ${par(u[1])}\\times${par(v[1])} = ${dotTex}`,
    },
    {
      id: 'norme',
      label: 'Normes et angle',
      tex: nonNull
        ? `\\vec u\\cdot\\vec v = \\|\\vec u\\|\\,\\|\\vec v\\|\\cos(\\vec u,\\vec v) = ${sqrtTex(nu2) ?? texNum(nu, 3)}\\times ${sqrtTex(nv2) ?? texNum(nv, 3)}\\times\\cos\\theta = ${dotTex}\\quad(\\theta \\approx ${texNum(thetaDeg, 1)}^\\circ)`
        : `\\vec u\\cdot\\vec v = 0 \\text{ (vecteur nul)}`,
    },
    {
      id: 'projection',
      label: 'Projection orthogonale',
      tex: `\\vec u\\cdot\\vec v = \\vec u\\cdot\\overrightarrow{OH} = ${ortho ? '0' : `${dot > 0 ? '' : '-'}\\|\\vec u\\|\\times OH = ${dot > 0 ? '' : '-'}${sqrtTex(nu2) ?? texNum(nu, 3)}\\times ${sqrtTex(OH * OH) ?? texNum(OH, 3)} = ${dotTex}`}`,
    },
    {
      id: 'polar',
      label: 'Identité de polarisation',
      tex: `\\vec u\\cdot\\vec v = \\tfrac12\\left(\\|\\vec u+\\vec v\\|^2-\\|\\vec u\\|^2-\\|\\vec v\\|^2\\right) = \\tfrac12\\left(${fracTex(nw2, 4)} - ${fracTex(nu2, 4)} - ${fracTex(nv2, 4)}\\right) = ${dotTex}`,
    },
  ]

  const controls = (
    <>
      <div>
        <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Construction affichée</div>
        <Segmented<Mode>
          value={mode}
          onChange={setMode}
          className="flex w-full [&>button]:flex-1"
          options={[
            { value: 'coord', label: 'Coord.' },
            { value: 'norme', label: 'Angle' },
            { value: 'projection', label: 'Projeté' },
            { value: 'polar', label: 'u+v' },
          ]}
        />
      </div>
      <Switch checked={grid} onChange={setGrid} label="Aimanter à la grille (pas 0,5)" />
      <div className="grid grid-cols-2 gap-2">
        <Stat label="u · v" value={<Tex>{dotTex}</Tex>} tone={tone} />
        <Stat label="Angle (u, v)" value={nonNull ? `${fmt(thetaDeg, 1)}°` : '—'} />
        <Stat label="‖u‖" value={<Tex>{normTex(nu2)}</Tex>} />
        <Stat label="‖v‖" value={<Tex>{normTex(nv2)}</Tex>} />
        <Stat label="cos θ" value={nonNull ? fmt(cosT, 4) : '—'} />
        <Stat label="OH" value={<Tex>{normTex(OH * OH)}</Tex>} />
      </div>
      <div>
        <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Configurations</div>
        <div className="grid grid-cols-2 gap-1">
          <Button size="xs" variant="outline" onClick={() => { setU([3, 1]); setV([-1, 3]) }}>Orthogonaux</Button>
          <Button size="xs" variant="outline" onClick={() => { setU([2, 1]); setV([4, 2]) }}>Colinéaires</Button>
          <Button size="xs" variant="outline" onClick={() => { setU([4, 0]); setV([-2, 3]) }}>Angle obtus</Button>
          <Button size="xs" variant="outline" onClick={() => { setU(initU); setV(initV) }}>
            <RotateCcw /> Départ
          </Button>
        </div>
      </div>
    </>
  )

  return (
    <WidgetFrame
      title="Produit scalaire"
      subtitle="Déplacez les extrémités des vecteurs u et v (souris ou doigt)"
      controls={controls}
      footer={
        <span>
          <Tex>{`\\vec u\\begin{pmatrix}${fracTex(u[0], 2)}\\\\${fracTex(u[1], 2)}\\end{pmatrix},\\ \\vec v\\begin{pmatrix}${fracTex(v[0], 2)}\\\\${fracTex(v[1], 2)}\\end{pmatrix}`}</Tex>{' '}
          — {interp}
        </span>
      }
    >
      <Plot xMin={-X_MAX} xMax={X_MAX} yMin={-Y_MAX} yMax={Y_MAX} width={560} height={400} xStep={1} yStep={1} onPointer={onPointer}>
        <Layer>
          {(p) => {
            const O = { x: p.sx(0), y: p.sy(0) }
            const els: React.ReactNode[] = []
            // droite (O, u)
            if (nu > 1e-9 && (mode === 'projection' || mode === 'norme')) {
              const L = 30
              els.push(<line key="du" x1={p.sx(-L * u[0])} y1={p.sy(-L * u[1])} x2={p.sx(L * u[0])} y2={p.sy(L * u[1])} stroke={PALETTE.blue} strokeOpacity={0.35} strokeWidth={1} />)
            }
            if (mode === 'norme' && nonNull) {
              const a1 = Math.atan2(u[1], u[0])
              let da = Math.atan2(v[1], v[0]) - a1
              while (da > Math.PI) da -= 2 * Math.PI
              while (da < -Math.PI) da += 2 * Math.PI
              const r = 34
              const n = 40
              let d = `M${O.x},${O.y}`
              for (let i = 0; i <= n; i++) {
                const a = a1 + (da * i) / n
                d += `L${O.x + r * Math.cos(a)},${O.y - r * Math.sin(a)}`
              }
              d += 'Z'
              const am = a1 + da / 2
              els.push(
                <g key="ang">
                  <path d={d} fill={PALETTE.orange} fillOpacity={0.18} stroke={PALETTE.orange} strokeWidth={1.2} />
                  <OutlinedText x={O.x + (r + 16) * Math.cos(am)} y={O.y - (r + 16) * Math.sin(am) + 4} anchor="middle" fill={PALETTE.orange} size={12}>
                    θ
                  </OutlinedText>
                </g>,
              )
            }
            if (mode === 'coord') {
              for (const [vec, col] of [[u, PALETTE.blue], [v, PALETTE.red]] as [Vec, string][]) {
                els.push(
                  <g key={'c' + col} stroke={col} strokeDasharray="4 3" strokeWidth={1.2} opacity={0.8}>
                    <line x1={p.sx(vec[0])} y1={p.sy(vec[1])} x2={p.sx(vec[0])} y2={O.y} />
                    <line x1={p.sx(vec[0])} y1={p.sy(vec[1])} x2={O.x} y2={p.sy(vec[1])} />
                  </g>,
                )
              }
            }
            if (mode === 'polar') {
              els.push(
                <g key="par" stroke={PALETTE.muted} strokeDasharray="5 4" strokeWidth={1.2}>
                  <line x1={p.sx(u[0])} y1={p.sy(u[1])} x2={p.sx(w[0])} y2={p.sy(w[1])} />
                  <line x1={p.sx(v[0])} y1={p.sy(v[1])} x2={p.sx(w[0])} y2={p.sy(w[1])} />
                </g>,
              )
            }
            // angle droit
            if (ortho && nonNull) {
              const e1: Vec = [u[0] / nu, u[1] / nu]
              const e2: Vec = [v[0] / nv, v[1] / nv]
              const s = 0.35
              const P1 = [p.sx(e1[0] * s), p.sy(e1[1] * s)]
              const P2 = [p.sx((e1[0] + e2[0]) * s), p.sy((e1[1] + e2[1]) * s)]
              const P3 = [p.sx(e2[0] * s), p.sy(e2[1] * s)]
              els.push(<path key="rt" d={`M${P1[0]},${P1[1]} L${P2[0]},${P2[1]} L${P3[0]},${P3[1]}`} fill="none" stroke={PALETTE.fg} strokeWidth={1.3} />)
            }
            return <g>{els}</g>
          }}
        </Layer>
        {mode === 'projection' && nu > 1e-9 && (
          <>
            <Segment x1={v[0]} y1={v[1]} x2={H[0]} y2={H[1]} color={PALETTE.muted} dashed />
            {OH > 1e-9 && <Segment x1={0} y1={0} x2={H[0]} y2={H[1]} color={PALETTE.green} width={4} />}
          </>
        )}
        {mode === 'polar' && (w[0] !== 0 || w[1] !== 0) && <Segment x1={0} y1={0} x2={w[0]} y2={w[1]} color={PALETTE.violet} width={2.2} arrow />}
        {nu > 1e-9 && <Segment x1={0} y1={0} x2={u[0]} y2={u[1]} color={PALETTE.blue} width={2.6} arrow />}
        {nv > 1e-9 && <Segment x1={0} y1={0} x2={v[0]} y2={v[1]} color={PALETTE.red} width={2.6} arrow />}
        <Layer>
          {(p) => (
            <g>
              {nu > 1e-9 && <VecLabel p={p} at={labelAt(u, det >= 0 ? -1 : 1)} name="u" color={PALETTE.blue} />}
              {nv > 1e-9 && <VecLabel p={p} at={labelAt(v, det >= 0 ? 1 : -1)} name="v" color={PALETTE.red} />}
              {mode === 'polar' && (w[0] !== 0 || w[1] !== 0) && <VecLabel p={p} at={labelAt(w, det >= 0 ? -1 : 1)} name="u+v" color={PALETTE.violet} />}
              <OutlinedText x={p.sx(0) - 6} y={p.sy(0) + 15} anchor="end" size={12}>O</OutlinedText>
              {mode === 'projection' && nu > 1e-9 && (
                <>
                  <circle cx={p.sx(H[0])} cy={p.sy(H[1])} r={4} fill={PALETTE.green} />
                  <OutlinedText x={p.sx(H[0]) + 8} y={p.sy(H[1]) + 16} fill={PALETTE.green} size={12} weight={700}>H</OutlinedText>
                </>
              )}
            </g>
          )}
        </Layer>
        <Handle x={u[0]} y={u[1]} color={PALETTE.blue} />
        <Handle x={v[0]} y={v[1]} color={PALETTE.red} />
      </Plot>
      <div className="mt-3 flex flex-col gap-1.5">
        {formulas.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setMode(f.id)}
            className={cn('flex flex-col items-start gap-0.5 overflow-x-auto border px-3 py-1.5 text-left transition-colors', mode === f.id ? 'border-foreground/40 bg-muted/60' : 'bg-background hover:bg-muted/30')}
          >
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{f.label}</span>
            <Tex className="text-sm">{f.tex}</Tex>
          </button>
        ))}
      </div>
    </WidgetFrame>
  )
}
