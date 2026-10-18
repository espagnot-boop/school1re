import { useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Plot, Segment, PALETTE } from '@/lib/plot'
import { Tex } from '@/components/Tex'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { Segmented } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Stat, Switch } from '@/components/ui/misc'
import { fmt } from '@/lib/utils'
import { Handle, Layer, OutlinedText, fracTex, gcd, nearest, parseNum, snap, sqrtTex, termTex, texNum } from './_maths2/util'

interface Props {
  mode?: 'droite' | 'cercle'
}

type P2 = [number, number]
type Key = 'A' | 'B' | 'N' | 'M' | 'O' | 'P'
type LineSub = 'points' | 'normal'
type CircleSub = 'centre' | 'diametre' | 'equation'

const XM = 6.3
const YM = 4.5

const INIT: Record<Key, P2> = {
  A: [-3, -1],
  B: [2, 2],
  N: [-1, 2],
  M: [3, -2],
  O: [1, 0],
  P: [3, 2],
}

/** Ramène (a, b, c) à des entiers premiers entre eux si possible (a > 0, ou a = 0 et b > 0). */
function intCoeffs(v: number[]): number[] {
  let w = v.slice()
  for (let m = 1; m <= 24; m++) {
    if (w.every((x) => Math.abs(x * m - Math.round(x * m)) < 1e-9)) {
      w = w.map((x) => Math.round(x * m))
      const g = w.reduce((acc, x) => (x === 0 ? acc : acc === 0 ? Math.abs(x) : gcd(acc, x)), 0) || 1
      w = w.map((x) => x / g)
      break
    }
  }
  const first = w.find((x) => Math.abs(x) > 1e-12) ?? 1
  return first < 0 ? w.map((x) => -x) : w
}

/** « ax + by + c = 0 » en LaTeX */
function lineTex(a: number, b: number, c: number): string {
  let s = termTex(a, 'x', true)
  s += termTex(b, 'y', s === '')
  s += termTex(c, '', s === '')
  return `${s || '0'} = 0`
}

/** (x − a)² en LaTeX */
const sq = (v: string, a: number) => (Math.abs(a) < 1e-12 ? `${v}^2` : `(${v} ${a > 0 ? '-' : '+'} ${fracTex(Math.abs(a), 4)})^2`)

/** (x − a) en LaTeX */
const lin = (v: string, a: number) => (Math.abs(a) < 1e-12 ? v : `(${v} ${a > 0 ? '-' : '+'} ${fracTex(Math.abs(a), 4)})`)

export default function LineCircleGeometry({ mode: mode0 = 'droite' }: Props) {
  const [mode, setMode] = useState<'droite' | 'cercle'>(mode0 === 'cercle' ? 'cercle' : 'droite')
  const [lineSub, setLineSub] = useState<LineSub>('points')
  const [circleSub, setCircleSub] = useState<CircleSub>('centre')
  const [pts, setPts] = useState<Record<Key, P2>>(INIT)
  const [integer, setInteger] = useState(true)
  const [showM, setShowM] = useState(true)
  const [showTangent, setShowTangent] = useState(false)
  const [D, setD] = useState('-4')
  const [E, setE] = useState('2')
  const [F, setF] = useState('-4')
  const drag = useRef<Key | null>(null)

  const { A, B, N, M, O, P } = pts

  const visible: Key[] =
    mode === 'droite'
      ? lineSub === 'points'
        ? ['A', 'B']
        : ['A', 'N']
      : circleSub === 'centre'
        ? ['O', 'P']
        : circleSub === 'diametre'
          ? ['A', 'B']
          : []
  if (showM) visible.push('M')

  const onPointer = (x: number, y: number, kind: 'down' | 'move' | 'up') => {
    if (kind === 'up') {
      drag.current = null
      return
    }
    if (kind === 'down') {
      const h = Object.fromEntries(visible.map((k) => [k, pts[k]])) as Record<Key, P2>
      drag.current = nearest(h, x, y, 0.8)
    }
    const k = drag.current
    if (!k) return
    const st = integer ? 1 : 0.1
    let q: P2 = [Math.max(-XM + 0.3, Math.min(XM - 0.3, snap(x, st))), Math.max(-YM + 0.3, Math.min(YM - 0.3, snap(y, st)))]
    q = [+q[0].toFixed(2), +q[1].toFixed(2)]
    setPts((s) => {
      // empêche A = B (droite / diamètre) et Ω = P
      const other = k === 'A' ? s.B : k === 'B' ? s.A : k === 'O' ? s.P : k === 'P' ? s.O : null
      if (other && Math.abs(other[0] - q[0]) < 1e-9 && Math.abs(other[1] - q[1]) < 1e-9) return s
      if (k === 'N' && Math.abs(s.A[0] - q[0]) < 1e-9 && Math.abs(s.A[1] - q[1]) < 1e-9) return s
      return { ...s, [k]: q }
    })
  }

  // ---------- DROITE ----------
  let lineInfo: null | {
    a: number
    b: number
    c: number
    u: P2
    n: P2
    raw: string
    simple: string
    reduced: string
    val: number
    H: P2
    dist: number
  } = null
  if (mode === 'droite') {
    let a: number, b: number, u: P2, n: P2
    if (lineSub === 'points') {
      u = [B[0] - A[0], B[1] - A[1]]
      a = u[1]
      b = -u[0]
      n = [a, b]
    } else {
      n = [N[0] - A[0], N[1] - A[1]]
      a = n[0]
      b = n[1]
      u = [-b, a]
    }
    const c = -(a * A[0] + b * A[1])
    const raw = lineTex(a, b, c)
    const [ia, ib, ic] = intCoeffs([a, b, c])
    const simple = lineTex(ia, ib, ic)
    const reduced =
      Math.abs(b) > 1e-12
        ? `y = ${(() => {
            const m = -a / b
            const p = -c / b
            let s = Math.abs(m) < 1e-12 ? '' : termTex(m, 'x', true)
            s += Math.abs(p) < 1e-12 ? '' : termTex(p, '', s === '')
            return s || '0'
          })()}`
        : `x = ${fracTex(-c / a, 12)}`
    const val = a * M[0] + b * M[1] + c
    const n2 = a * a + b * b
    const H: P2 = [M[0] - (val * a) / n2, M[1] - (val * b) / n2]
    lineInfo = { a, b, c, u, n, raw, simple, reduced, val, H, dist: Math.abs(val) / Math.sqrt(n2) }
  }

  // ---------- CERCLE ----------
  let circ: null | { cx: number; cy: number; r2: number; kind: 'cercle' | 'point' | 'vide' } = null
  if (mode === 'cercle') {
    if (circleSub === 'centre') circ = { cx: O[0], cy: O[1], r2: (P[0] - O[0]) ** 2 + (P[1] - O[1]) ** 2, kind: 'cercle' }
    else if (circleSub === 'diametre') circ = { cx: (A[0] + B[0]) / 2, cy: (A[1] + B[1]) / 2, r2: ((B[0] - A[0]) ** 2 + (B[1] - A[1]) ** 2) / 4, kind: 'cercle' }
    else {
      const d = parseNum(D)
      const e = parseNum(E)
      const f = parseNum(F)
      if ([d, e, f].every(Number.isFinite)) {
        const r2 = (d * d) / 4 + (e * e) / 4 - f
        circ = { cx: -d / 2, cy: -e / 2, r2, kind: Math.abs(r2) < 1e-12 ? 'point' : r2 > 0 ? 'cercle' : 'vide' }
      }
    }
  }
  const r = circ && circ.r2 > 0 ? Math.sqrt(circ.r2) : 0
  const developed = circ ? (() => {
    let s = 'x^2 + y^2'
    s += termTex(-2 * circ.cx, 'x', false)
    s += termTex(-2 * circ.cy, 'y', false)
    s += termTex(circ.cx ** 2 + circ.cy ** 2 - circ.r2, '', false)
    return `${s} = 0`
  })() : ''
  const OM2 = circ ? (M[0] - circ.cx) ** 2 + (M[1] - circ.cy) ** 2 : 0
  const posM = circ && circ.kind === 'cercle' ? (Math.abs(OM2 - circ.r2) < 1e-9 ? 'sur' : OM2 < circ.r2 ? 'intérieur' : 'extérieur') : null
  const MAMB = (A[0] - M[0]) * (B[0] - M[0]) + (A[1] - M[1]) * (B[1] - M[1])

  // tangente en P (mode centre)
  const tangent = mode === 'cercle' && circleSub === 'centre' ? (() => {
    const a = P[0] - O[0]
    const b = P[1] - O[1]
    const c = -(a * P[0] + b * P[1])
    const [ia, ib, ic] = intCoeffs([a, b, c])
    return { a, b, c, tex: lineTex(ia, ib, ic) }
  })() : null

  const drawLine = (a: number, b: number, c: number, color: string, w = 2, dashed = false, key?: string) => {
    // deux points éloignés de la droite ax + by + c = 0
    const n2 = a * a + b * b
    const x0 = (-a * c) / n2
    const y0 = (-b * c) / n2
    const L = 40 / Math.sqrt(n2)
    return <Segment key={key} x1={x0 - L * b} y1={y0 + L * a} x2={x0 + L * b} y2={y0 - L * a} color={color} width={w} dashed={dashed} />
  }

  const reset = () => setPts(INIT)

  const controls = (
    <>
      <Segmented
        value={mode}
        onChange={(v) => setMode(v)}
        className="flex w-full [&>button]:flex-1"
        options={[
          { value: 'droite', label: 'Droite' },
          { value: 'cercle', label: 'Cercle' },
        ]}
      />
      {mode === 'droite' ? (
        <div>
          <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Droite définie par</div>
          <Segmented<LineSub>
            value={lineSub}
            onChange={setLineSub}
            className="flex w-full [&>button]:flex-1"
            options={[
              { value: 'points', label: 'A et B' },
              { value: 'normal', label: 'A et n' },
            ]}
          />
        </div>
      ) : (
        <div>
          <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Cercle défini par</div>
          <Segmented<CircleSub>
            value={circleSub}
            onChange={setCircleSub}
            className="flex w-full [&>button]:flex-1"
            options={[
              { value: 'centre', label: 'Centre' },
              { value: 'diametre', label: 'Diamètre' },
              { value: 'equation', label: 'Équation' },
            ]}
          />
        </div>
      )}
      {mode === 'cercle' && circleSub === 'equation' && (
        <div className="flex flex-col gap-2">
          <Tex className="text-sm">{'x^2+y^2+Dx+Ey+F=0'}</Tex>
          <div className="grid grid-cols-3 gap-2">
            {([['D', D, setD], ['E', E, setE], ['F', F, setF]] as const).map(([n, val, set]) => (
              <div key={n} className="flex flex-col gap-1">
                <Label>{n}</Label>
                <Input value={val} onChange={(e) => set(e.target.value)} inputMode="decimal" className={Number.isFinite(parseNum(val)) ? '' : 'border-destructive'} />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Switch checked={integer} onChange={setInteger} label="Coordonnées entières" />
        <Switch checked={showM} onChange={setShowM} label="Point test M" />
        {mode === 'cercle' && circleSub === 'centre' && <Switch checked={showTangent} onChange={setShowTangent} label="Tangente en P" />}
      </div>
      {mode === 'droite' && lineInfo && (
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Vecteur directeur u" value={<Tex>{`(${fracTex(lineInfo.u[0], 10)}\\,;\\,${fracTex(lineInfo.u[1], 10)})`}</Tex>} />
          <Stat label="Vecteur normal n" value={<Tex>{`(${fracTex(lineInfo.n[0], 10)}\\,;\\,${fracTex(lineInfo.n[1], 10)})`}</Tex>} />
          <Stat label="Pente" value={Math.abs(lineInfo.b) > 1e-12 ? <Tex>{fracTex(-lineInfo.a / lineInfo.b, 12)}</Tex> : '— (verticale)'} />
          {showM && <Stat label="Distance M–d" value={<Tex>{sqrtTex(lineInfo.dist ** 2) ?? texNum(lineInfo.dist, 3)}</Tex>} tone={lineInfo.dist < 1e-9 ? 'success' : undefined} />}
        </div>
      )}
      {mode === 'cercle' && circ && (
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Centre Ω" value={<Tex>{`(${fracTex(circ.cx, 4)}\\,;\\,${fracTex(circ.cy, 4)})`}</Tex>} />
          <Stat label="Rayon" value={circ.kind === 'cercle' ? <Tex>{sqrtTex(circ.r2) ?? texNum(r, 3)}</Tex> : '—'} tone={circ.kind === 'vide' ? 'destructive' : undefined} />
          {showM && circ.kind === 'cercle' && <Stat label="ΩM²  vs  r²" value={<Tex>{`${fracTex(OM2, 4)} ${posM === 'sur' ? '=' : posM === 'intérieur' ? '<' : '>'} ${fracTex(circ.r2, 4)}`}</Tex>} tone={posM === 'sur' ? 'success' : undefined} />}
          {showM && circleSub === 'diametre' && <Stat label="MA · MB" value={<Tex>{fracTex(MAMB, 4)}</Tex>} tone={Math.abs(MAMB) < 1e-9 ? 'success' : undefined} />}
        </div>
      )}
      <Button size="sm" variant="ghost" onClick={reset}>
        <RotateCcw /> Réinitialiser les points
      </Button>
    </>
  )

  // ---------- Pied : équations & interprétation ----------
  let footer: React.ReactNode = null
  if (mode === 'droite' && lineInfo) {
    const L = lineInfo
    footer = (
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <span>
            Équation cartésienne : <Tex>{L.simple}</Tex>
          </span>
          <span>
            Équation réduite : <Tex>{L.reduced}</Tex>
          </span>
        </div>
        {showM && (
          <div className="text-muted-foreground">
            En M : <Tex>{`${fracTex(L.a, 10)}\\times${M[0] < 0 ? `(${fracTex(M[0], 10)})` : fracTex(M[0], 10)} + ${L.b < 0 ? `(${fracTex(L.b, 10)})` : fracTex(L.b, 10)}\\times${M[1] < 0 ? `(${fracTex(M[1], 10)})` : fracTex(M[1], 10)} + ${L.c < 0 ? `(${fracTex(L.c, 10)})` : fracTex(L.c, 10)} = ${fracTex(L.val, 10)}`}</Tex>{' '}
            {Math.abs(L.val) < 1e-9 ? '→ les coordonnées vérifient l’équation : M ∈ d.' : '≠ 0 → M ∉ d. H est le projeté orthogonal de M sur d.'}
          </div>
        )}
      </div>
    )
  } else if (mode === 'cercle') {
    footer = circ ? (
      <div className="flex flex-col gap-1">
        {circ.kind === 'cercle' ? (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Tex>{`${sq('x', circ.cx)} + ${sq('y', circ.cy)} = ${fracTex(circ.r2, 4)}`}</Tex>
            <span className="text-muted-foreground">⟺</span>
            <Tex>{developed}</Tex>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Tex>{`${sq('x', circ.cx)} + ${sq('y', circ.cy)} = ${fracTex(circ.r2, 4)}`}</Tex>
            <Badge variant={circ.kind === 'vide' ? 'destructive' : 'warning'}>{circ.kind === 'vide' ? 'ensemble vide' : 'un seul point Ω'}</Badge>
          </div>
        )}
        <div className="text-muted-foreground">
          {circleSub === 'equation' && (
            <>
              Mise sous forme canonique : <Tex>{`x^2 ${termTex(-2 * circ.cx, 'x', false) || '+ 0x'} = ${sq('x', circ.cx)} - ${fracTex(circ.cx ** 2, 4)}`}</Tex>{' '}
              (de même en y).{' '}
              {circ.kind === 'cercle'
                ? `Le membre de droite est strictement positif : c'est un cercle.`
                : circ.kind === 'point'
                  ? 'Le membre de droite est nul : l’ensemble est réduit au point Ω.'
                  : 'Le membre de droite est négatif : aucun point ne vérifie l’équation.'}
            </>
          )}
          {circleSub === 'diametre' && (
            <>
              <Tex>{'M \\in \\mathcal{C} \\iff \\overrightarrow{MA}\\cdot\\overrightarrow{MB} = 0'}</Tex> :{' '}
              <Tex>{`${lin('x', A[0])}${lin('x', B[0])} + ${lin('y', A[1])}${lin('y', B[1])} = 0`}</Tex>
              {showM && (Math.abs(MAMB) < 1e-9 ? ' — ici MA·MB = 0 : le triangle AMB est rectangle en M.' : ' — ici MA·MB ≠ 0 : M n’est pas sur le cercle.')}
            </>
          )}
          {circleSub === 'centre' && (
            <>
              <Tex>{'M(x;y) \\in \\mathcal{C} \\iff \\Omega M^2 = r^2'}</Tex>
              {showTangent && tangent && (
                <>
                  {' '}
                  — Tangente en P (normale <Tex>{'\\overrightarrow{\\Omega P}'}</Tex>) : <Tex>{tangent.tex}</Tex>
                </>
              )}
            </>
          )}
          {showM && posM && <> M est {posM === 'sur' ? 'sur le cercle' : posM === 'intérieur' ? 'à l’intérieur du disque' : 'à l’extérieur du cercle'}.</>}
        </div>
      </div>
    ) : (
      <span className="text-destructive">Saisissez des nombres valides pour D, E et F (ex. -4, 1/2, 2,5).</span>
    )
  }

  return (
    <WidgetFrame
      title={mode === 'droite' ? 'Équation cartésienne d’une droite' : 'Équation d’un cercle'}
      subtitle="Faites glisser les points (souris ou doigt)"
      controls={controls}
      footer={footer}
    >
      <Plot xMin={-XM} xMax={XM} yMin={-YM} yMax={YM} width={560} height={400} xStep={1} yStep={1} onPointer={onPointer}>
        {mode === 'droite' && lineInfo && (
          <>
            {drawLine(lineInfo.a, lineInfo.b, lineInfo.c, PALETTE.blue, 2.2)}
            <Segment x1={A[0]} y1={A[1]} x2={A[0] + lineInfo.u[0]} y2={A[1] + lineInfo.u[1]} color={PALETTE.green} width={2.5} arrow />
            <Segment x1={A[0]} y1={A[1]} x2={A[0] + lineInfo.n[0]} y2={A[1] + lineInfo.n[1]} color={PALETTE.violet} width={2.5} arrow />
            {showM && lineInfo.dist > 1e-9 && <Segment x1={M[0]} y1={M[1]} x2={lineInfo.H[0]} y2={lineInfo.H[1]} color={PALETTE.muted} dashed />}
            <Layer>
              {(p) => {
                const L = lineInfo!
                const nu = Math.hypot(L.u[0], L.u[1])
                const e: P2 = [L.u[0] / nu, L.u[1] / nu]
                const f: P2 = [L.n[0] / nu, L.n[1] / nu]
                const s = 0.3
                const ra = `M${p.sx(A[0] + e[0] * s)},${p.sy(A[1] + e[1] * s)} L${p.sx(A[0] + (e[0] + f[0]) * s)},${p.sy(A[1] + (e[1] + f[1]) * s)} L${p.sx(A[0] + f[0] * s)},${p.sy(A[1] + f[1] * s)}`
                const tip = (v: P2): P2 => [A[0] + v[0], A[1] + v[1]]
                const ut = tip(L.u)
                const nt = tip(L.n)
                return (
                  <g>
                    <path d={ra} fill="none" stroke={PALETTE.fg} strokeWidth={1.1} />
                    {lineSub === 'normal' || Math.hypot(L.u[0], L.u[1]) > 0 ? (
                      <OutlinedText x={p.sx(lineSub === 'points' ? (A[0] + ut[0]) / 2 : ut[0]) + 6} y={p.sy(lineSub === 'points' ? (A[1] + ut[1]) / 2 : ut[1]) + 16} fill={PALETTE.green} size={13} weight={700} italic>
                        u
                      </OutlinedText>
                    ) : null}
                    <OutlinedText x={p.sx(nt[0]) + 8} y={p.sy(nt[1]) - 6} fill={PALETTE.violet} size={13} weight={700} italic>
                      n
                    </OutlinedText>
                    <OutlinedText x={p.sx(XM) - 8} y={(() => {
                      // étiquette « d » près du bord droit
                      if (Math.abs(L.b) < 1e-12) return 16
                      const yy = (-L.c - L.a * (XM - 0.6)) / L.b
                      return Math.max(14, Math.min(p.height - 6, p.sy(yy) - 8))
                    })()} anchor="end" fill={PALETTE.blue} size={13} weight={700}>
                      d
                    </OutlinedText>
                    {showM && lineInfo!.dist > 1e-9 && (
                      <>
                        <circle cx={p.sx(L.H[0])} cy={p.sy(L.H[1])} r={3.5} fill={PALETTE.fg} />
                        <OutlinedText x={p.sx(L.H[0]) + 7} y={p.sy(L.H[1]) + 15} size={12}>H</OutlinedText>
                      </>
                    )}
                  </g>
                )
              }}
            </Layer>
            <Handle x={A[0]} y={A[1]} color={PALETTE.fg} label="A" dx={-16} dy={16} />
            {lineSub === 'points' ? <Handle x={B[0]} y={B[1]} color={PALETTE.fg} label="B" /> : <Handle x={N[0]} y={N[1]} color={PALETTE.violet} r={5} />}
          </>
        )}

        {mode === 'cercle' && circ && (
          <>
            <Layer>
              {(p) => {
                const R = r * (p.sx(1) - p.sx(0))
                return (
                  <g>
                    {circ!.kind === 'cercle' && <circle cx={p.sx(circ!.cx)} cy={p.sy(circ!.cy)} r={R} fill={PALETTE.blue} fillOpacity={0.07} stroke={PALETTE.blue} strokeWidth={2.2} />}
                    <circle cx={p.sx(circ!.cx)} cy={p.sy(circ!.cy)} r={3.5} fill={PALETTE.blue} />
                    <OutlinedText x={p.sx(circ!.cx) - 8} y={p.sy(circ!.cy) + 16} anchor="end" fill={PALETTE.blue} size={12} weight={700}>Ω</OutlinedText>
                    {circleSub === 'diametre' && showM && (
                      <g stroke={PALETTE.orange} strokeWidth={1.4}>
                        <line x1={p.sx(M[0])} y1={p.sy(M[1])} x2={p.sx(A[0])} y2={p.sy(A[1])} />
                        <line x1={p.sx(M[0])} y1={p.sy(M[1])} x2={p.sx(B[0])} y2={p.sy(B[1])} />
                      </g>
                    )}
                    {circleSub === 'diametre' && showM && Math.abs(MAMB) < 1e-9 && (() => {
                      const a: P2 = [A[0] - M[0], A[1] - M[1]]
                      const b: P2 = [B[0] - M[0], B[1] - M[1]]
                      const na = Math.hypot(...a)
                      const nb = Math.hypot(...b)
                      if (na < 1e-9 || nb < 1e-9) return null
                      const s = 0.3
                      const p1: P2 = [M[0] + (a[0] / na) * s, M[1] + (a[1] / na) * s]
                      const p2: P2 = [p1[0] + (b[0] / nb) * s, p1[1] + (b[1] / nb) * s]
                      const p3: P2 = [M[0] + (b[0] / nb) * s, M[1] + (b[1] / nb) * s]
                      return <path d={`M${p.sx(p1[0])},${p.sy(p1[1])} L${p.sx(p2[0])},${p.sy(p2[1])} L${p.sx(p3[0])},${p.sy(p3[1])}`} fill="none" stroke={PALETTE.fg} strokeWidth={1.2} />
                    })()}
                  </g>
                )
              }}
            </Layer>
            {circleSub === 'centre' && (
              <>
                <Segment x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} color={PALETTE.blue} width={1.5} dashed />
                {showTangent && tangent && drawLine(tangent.a, tangent.b, tangent.c, PALETTE.green, 2, false, 'tg')}
                <Handle x={O[0]} y={O[1]} color={PALETTE.blue} r={5} />
                <Handle x={P[0]} y={P[1]} color={PALETTE.fg} label="P" />
              </>
            )}
            {circleSub === 'diametre' && (
              <>
                <Segment x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} color={PALETTE.blue} width={1.5} />
                <Handle x={A[0]} y={A[1]} color={PALETTE.fg} label="A" dx={-16} dy={16} />
                <Handle x={B[0]} y={B[1]} color={PALETTE.fg} label="B" />
              </>
            )}
          </>
        )}
        {showM && <Handle x={M[0]} y={M[1]} color={PALETTE.orange} label="M" />}
      </Plot>
      {mode === 'droite' && lineInfo && (
        <div className="mt-3 grid gap-1.5 text-sm">
          <div className="border bg-background px-3 py-1.5">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Propriété</span>
            <div>
              <Tex>{'ax+by+c=0'}</Tex> a pour vecteur directeur <Tex>{'\\vec u(-b\\,;\\,a)'}</Tex> et pour vecteur normal <Tex>{'\\vec n(a\\,;\\,b)'}</Tex>.
            </div>
          </div>
          <div className="overflow-x-auto border bg-background px-3 py-1.5">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Méthode</span>
            <div>
              {lineSub === 'points' ? (
                <>
                  <Tex>{`M(x;y)\\in d \\iff \\det(\\overrightarrow{AM},\\overrightarrow{AB})=0 \\iff ${lin('x', A[0])}\\times${lineInfo.u[1] < 0 ? `(${fracTex(lineInfo.u[1], 10)})` : fracTex(lineInfo.u[1], 10)} - ${lin('y', A[1])}\\times${lineInfo.u[0] < 0 ? `(${fracTex(lineInfo.u[0], 10)})` : fracTex(lineInfo.u[0], 10)} = 0`}</Tex>
                </>
              ) : (
                <>
                  <Tex>{`M(x;y)\\in d \\iff \\overrightarrow{AM}\\cdot\\vec n=0 \\iff ${fracTex(lineInfo.n[0], 10)}${lin('x', A[0])} + ${lineInfo.n[1] < 0 ? `(${fracTex(lineInfo.n[1], 10)})` : fracTex(lineInfo.n[1], 10)}${lin('y', A[1])} = 0`}</Tex>
                </>
              )}
              {' '}
              <span className="text-muted-foreground">soit</span> <Tex>{lineInfo.raw}</Tex>
              {lineInfo.raw !== lineInfo.simple && (
                <>
                  {' '}
                  <span className="text-muted-foreground">ou, en simplifiant,</span> <Tex>{lineInfo.simple}</Tex>
                </>
              )}
              .
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Une droite admet une infinité d’équations cartésiennes, toutes proportionnelles. Pente : {Math.abs(lineInfo.b) > 1e-12 ? fmt(-lineInfo.a / lineInfo.b, 3) : 'non définie (droite parallèle à l’axe des ordonnées)'}.
          </div>
        </div>
      )}
    </WidgetFrame>
  )
}
