import { useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Plot, FunctionPath, Segment, PALETTE } from '@/lib/plot'
import { Tex } from '@/components/Tex'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Stat, Switch } from '@/components/ui/misc'
import { fmt } from '@/lib/utils'
import { Handle, Layer, OutlinedText, gcd, texNum } from './_maths2/util'

interface Props {
  /** angle initial en radians */
  angle?: number
}

const PI = Math.PI
const TAU = 2 * PI
const T_MIN = -4 * PI
const T_MAX = 4 * PI

/** k (en douzièmes de π) est-il un angle remarquable (multiple de π/6 ou de π/4) ? */
const isRemarkableK = (k: number) => k % 2 === 0 || k % 3 === 0

/** Si t = kπ/12 avec k remarquable, renvoie k. */
function remarkableK(t: number): number | null {
  const k = (t * 12) / PI
  const r = Math.round(k)
  if (Math.abs(k - r) > 1e-7) return null
  return isRemarkableK(Math.abs(r)) ? r : null
}

/** LaTeX de kπ/12 simplifié */
function piTex(k: number): string {
  if (k === 0) return '0'
  const g = gcd(k, 12)
  const n = Math.abs(k / g)
  const d = 12 / g
  const s = k < 0 ? '-' : ''
  const num = n === 1 ? '\\pi' : `${n}\\pi`
  return d === 1 ? `${s}${num}` : `${s}\\frac{${num}}{${d}}`
}

/** Libellé texte court (SVG) de kπ/12 */
function piLabel(k: number): string {
  if (k === 0) return '0'
  const g = gcd(k, 12)
  const n = Math.abs(k / g)
  const d = 12 / g
  const s = k < 0 ? '−' : ''
  const num = n === 1 ? 'π' : `${n}π`
  return d === 1 ? `${s}${num}` : `${s}${num}/${d}`
}

const EXACT: [number, string][] = [
  [0, '0'],
  [0.5, '\\frac{1}{2}'],
  [Math.SQRT2 / 2, '\\frac{\\sqrt{2}}{2}'],
  [Math.sqrt(3) / 2, '\\frac{\\sqrt{3}}{2}'],
  [1, '1'],
]
function exactTex(v: number): string | null {
  for (const [val, tex] of EXACT) {
    if (Math.abs(Math.abs(v) - val) < 1e-9) return val === 0 ? '0' : (v < 0 ? '-' : '') + tex
  }
  return null
}

const QUICK = [0, 2, 3, 4, 6, 8, 9, 10, 12] // en douzièmes de π

export default function TrigCircle({ angle = PI / 3 }: Props) {
  const [t, setT] = useState(() => (Number.isFinite(angle) ? Math.min(T_MAX, Math.max(T_MIN, angle)) : PI / 3))
  const [magnet, setMagnet] = useState(true)
  const [showLine, setShowLine] = useState(true)
  const [showAssoc, setShowAssoc] = useState(false)
  const [playing, setPlaying] = useState(false)
  const dragMode = useRef<'circle' | 'line' | null>(null)
  const tRef = useRef(t)
  tRef.current = t

  const applySnap = (v: number) => {
    v = Math.min(T_MAX, Math.max(T_MIN, v))
    if (!magnet) return v
    const k = Math.round((v * 12) / PI)
    if (isRemarkableK(Math.abs(k)) && Math.abs(v - (k * PI) / 12) < 0.06) return (k * PI) / 12
    return v
  }

  // Animation : M parcourt le cercle
  useEffect(() => {
    if (!playing) return
    let raf = 0
    let last = performance.now()
    const step = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      let next = tRef.current + dt * 0.9
      if (next > T_MAX) next = 0
      setT(next)
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  const c = Math.cos(t)
  const s = Math.sin(t)
  const k = remarkableK(t)
  const info = useMemo(() => {
    if (k === null) return null
    let kp = ((k % 24) + 24) % 24
    if (kp > 12) kp -= 24
    const turns = (k - kp) / 24
    return { k, kp, turns, cos: exactTex(Math.cos((k * PI) / 12)), sin: exactTex(Math.sin((k * PI) / 12)) }
  }, [k])

  // Mesure principale numérique
  let principal = ((t % TAU) + TAU) % TAU
  if (principal > PI) principal -= TAU
  const turnsNum = Math.round((t - principal) / TAU)

  const quadrant = (() => {
    const e = 1e-9
    if (Math.abs(s) < e) return c > 0 ? 'M est en I, sur l’axe des abscisses : sin t = 0 et cos t = 1.' : 'M est en I′(−1 ; 0) : sin t = 0 et cos t = −1.'
    if (Math.abs(c) < e) return s > 0 ? 'M est en J(0 ; 1) : cos t = 0 et sin t = 1.' : 'M est en J′(0 ; −1) : cos t = 0 et sin t = −1.'
    const q = c > 0 ? (s > 0 ? 1 : 4) : s > 0 ? 2 : 3
    const sc = c > 0 ? 'cos t > 0' : 'cos t < 0'
    const ss = s > 0 ? 'sin t > 0' : 'sin t < 0'
    return `M est dans le ${q === 1 ? '1er' : q + 'e'} quadrant : ${sc} et ${ss}.`
  })()

  const onCircle = (x: number, y: number, kind: 'down' | 'move' | 'up') => {
    if (kind === 'up') {
      dragMode.current = null
      return
    }
    if (kind === 'down') {
      setPlaying(false)
      dragMode.current = showLine && x > 1.12 ? 'line' : Math.hypot(x, y) > 0.12 ? 'circle' : null
    }
    if (dragMode.current === 'line') setT(applySnap(y))
    else if (dragMode.current === 'circle') {
      const a = Math.atan2(y, x)
      const cur = tRef.current
      setT(applySnap(a + TAU * Math.round((cur - a) / TAU)))
    }
  }

  const onCurve = (x: number, _y: number, kind: 'down' | 'move' | 'up') => {
    if (kind === 'up') return
    setPlaying(false)
    setT(applySnap(x))
  }

  // Abscisse affichée sur les courbes (ramenée dans [−2π ; 2π])
  let tc = t
  while (tc > TAU + 1e-9) tc -= TAU
  while (tc < -TAU - 1e-9) tc += TAU

  const tTex = info ? piTex(info.k) : texNum(t, 3)
  const cosTex = info?.cos ?? `\\approx ${texNum(c, 4)}`
  const sinTex = info?.sin ?? `\\approx ${texNum(s, 4)}`
  const eq = (v: string) => (v.startsWith('\\approx') ? v : `= ${v}`)

  const assoc = [
    { label: '−t', a: -t, color: PALETTE.violet },
    { label: 'π−t', a: PI - t, color: PALETTE.teal },
    { label: 'π+t', a: PI + t, color: PALETTE.pink },
    { label: 'π/2−t', a: PI / 2 - t, color: PALETTE.yellow },
  ]

  const controls = (
    <>
      <Slider label={<Tex>{'t\\ \\text{(rad)}'}</Tex>} value={t} min={T_MIN} max={T_MAX} step={0.01} digits={3} onChange={(v) => { setPlaying(false); setT(applySnap(v)) }} />
      <div>
        <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Angles remarquables</div>
        <div className="grid grid-cols-5 gap-1">
          {QUICK.map((q) => (
            <Button key={q} size="xs" variant={info?.k === q ? 'default' : 'outline'} onClick={() => { setPlaying(false); setT((q * PI) / 12) }}>
              <Tex>{piTex(q)}</Tex>
            </Button>
          ))}
          <Button size="xs" variant="outline" title="Angle opposé" onClick={() => setT((v) => Math.min(T_MAX, Math.max(T_MIN, -v)))}>
            <Tex>{'-t'}</Tex>
          </Button>
        </div>
        <div className="mt-1 grid grid-cols-3 gap-1">
          <Button size="xs" variant="outline" onClick={() => setT((v) => (v - TAU >= T_MIN - 1e-9 ? v - TAU : v))}>
            <Tex>{'t-2\\pi'}</Tex>
          </Button>
          <Button size="xs" variant="outline" onClick={() => setT((v) => (v + TAU <= T_MAX + 1e-9 ? v + TAU : v))}>
            <Tex>{'t+2\\pi'}</Tex>
          </Button>
          <Button size="xs" variant="outline" onClick={() => setPlaying((p) => !p)}>
            {playing ? <Pause /> : <Play />}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Switch checked={magnet} onChange={setMagnet} label="Aimanter aux angles remarquables" />
        <Switch checked={showLine} onChange={setShowLine} label="Droite des réels (enroulement)" />
        <Switch checked={showAssoc} onChange={setShowAssoc} label="Angles associés" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Stat label="cos t" value={<Tex>{info?.cos ?? texNum(c, 4)}</Tex>} />
        <Stat label="sin t" value={<Tex>{info?.sin ?? texNum(s, 4)}</Tex>} />
        <Stat label="Degrés" value={info ? `${info.k * 15}°` : `≈ ${fmt((t * 180) / PI, 1)}°`} />
        <Stat label="Mesure principale" value={<Tex>{info ? piTex(info.kp) : `\\approx ${texNum(principal, 3)}`}</Tex>} />
      </div>
      <Button size="sm" variant="ghost" onClick={() => { setPlaying(false); setT(PI / 3) }}>
        <RotateCcw /> Réinitialiser
      </Button>
    </>
  )

  const turnsTex = (n: number) => (n === 0 ? '' : n === 1 ? ' + 2\\pi' : n === -1 ? ' - 2\\pi' : n > 0 ? ` + ${2 * n}\\pi` : ` - ${-2 * n}\\pi`)

  return (
    <WidgetFrame
      title="Cercle trigonométrique"
      subtitle="Faites glisser M sur le cercle (ou le point t sur la droite des réels, ou sur les courbes)"
      controls={controls}
      footer={
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <Tex>{`t ${info ? '=' : '\\approx'} ${tTex}`}</Tex>
            <Tex>{`\\cos t ${eq(cosTex)}`}</Tex>
            <Tex>{`\\sin t ${eq(sinTex)}`}</Tex>
            <Tex>{`\\cos^2 t + \\sin^2 t = 1`}</Tex>
          </div>
          <div className="text-muted-foreground">
            {quadrant}{' '}
            {info ? (
              <>
                Mesure principale : <Tex>{`${piTex(info.k)} = ${piTex(info.kp)}${turnsTex(info.turns)}`}</Tex>
                {info.turns !== 0 && <> — le point M est le même que pour <Tex>{piTex(info.kp)}</Tex> (périodicité <Tex>{'2\\pi'}</Tex>).</>}
              </>
            ) : (
              turnsNum !== 0 && <>t et <Tex>{`${texNum(principal, 3)}`}</Tex> repèrent le même point M (ils diffèrent de <Tex>{`${2 * turnsNum}\\pi`}</Tex>).</>
            )}
          </div>
        </div>
      }
    >
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <Plot xMin={-1.55} xMax={2.05} yMin={-1.8} yMax={1.8} width={380} height={380} xStep={0.5} yStep={0.5} labels={false} onPointer={onCircle}>
          <Layer>
            {(p) => {
              const R = p.sx(1) - p.sx(0)
              const O = { x: p.sx(0), y: p.sy(0) }
              // arc sur le cercle de 0 à t
              const n = Math.max(2, Math.ceil(Math.abs(t) * 30))
              let arc = ''
              let spiral = ''
              for (let i = 0; i <= n; i++) {
                const a = (t * i) / n
                arc += `${i ? 'L' : 'M'}${(O.x + R * Math.cos(a)).toFixed(2)},${(O.y - R * Math.sin(a)).toFixed(2)}`
                const rr = R * (0.2 + 0.035 * Math.abs(a))
                spiral += `${i ? 'L' : 'M'}${(O.x + rr * Math.cos(a)).toFixed(2)},${(O.y - rr * Math.sin(a)).toFixed(2)}`
              }
              const rEnd = R * (0.2 + 0.035 * Math.abs(t))
              const ex = O.x + rEnd * Math.cos(t)
              const ey = O.y - rEnd * Math.sin(t)
              const dir = t >= 0 ? 1 : -1
              // tangente au spiral pour la flèche
              const tx = -Math.sin(t) * dir
              const ty = -Math.cos(t) * dir
              const ax1 = ex - 7 * tx + 4 * Math.cos(t)
              const ay1 = ey - 7 * ty - 4 * Math.sin(t)
              const ax2 = ex - 7 * tx - 4 * Math.cos(t)
              const ay2 = ey - 7 * ty + 4 * Math.sin(t)
              const ticks = Array.from({ length: 24 }, (_, i) => i - 11).filter((q) => isRemarkableK(Math.abs(q)))
              const yTop = p.yMax
              const yBot = p.yMin
              const tClamped = Math.max(yBot, Math.min(yTop, t))
              return (
                <g>
                  <circle cx={O.x} cy={O.y} r={R} fill="none" stroke={PALETTE.fg} strokeWidth={1.5} />
                  {ticks.map((q) => {
                    const a = (q * PI) / 12
                    const lab = piLabel(q)
                    return (
                      <g key={q}>
                        <line x1={O.x + 0.95 * R * Math.cos(a)} y1={O.y - 0.95 * R * Math.sin(a)} x2={O.x + 1.05 * R * Math.cos(a)} y2={O.y - 1.05 * R * Math.sin(a)} stroke={PALETTE.muted} strokeWidth={1.2} />
                        {lab && q !== 0 && (
                          <OutlinedText x={O.x + 1.2 * R * Math.cos(a)} y={O.y - 1.2 * R * Math.sin(a) + 4} anchor="middle" size={10} weight={500} fill={info && ((info.kp - q) % 24 === 0) ? PALETTE.orange : PALETTE.muted}>
                            {lab}
                          </OutlinedText>
                        )}
                      </g>
                    )
                  })}
                  {/* droite des réels tangente en I */}
                  {showLine && (
                    <g>
                      <line x1={p.sx(1)} x2={p.sx(1)} y1={0} y2={p.height} stroke={PALETTE.muted} strokeWidth={1} />
                      {[-1, 1].map((m) => (
                        <OutlinedText key={m} x={p.sx(1) + 8} y={p.sy(m) + 4} size={10} weight={500} fill={PALETTE.muted}>
                          {m === 1 ? '1' : '−1'}
                        </OutlinedText>
                      ))}
                      {[-1, 1].map((m) => (
                        <line key={'t' + m} x1={p.sx(1) - 3} x2={p.sx(1) + 3} y1={p.sy(m)} y2={p.sy(m)} stroke={PALETTE.muted} />
                      ))}
                      {[-PI / 2, PI / 2].map((m) => (
                        <g key={'p' + m}>
                          <line x1={p.sx(1) - 3} x2={p.sx(1) + 3} y1={p.sy(m)} y2={p.sy(m)} stroke={PALETTE.muted} />
                          <OutlinedText x={p.sx(1) + 8} y={p.sy(m) + 4} size={10} weight={500} fill={PALETTE.muted}>
                            {m > 0 ? 'π/2' : '−π/2'}
                          </OutlinedText>
                        </g>
                      ))}
                      <line x1={p.sx(1)} x2={p.sx(1)} y1={p.sy(0)} y2={p.sy(tClamped)} stroke={PALETTE.orange} strokeWidth={3} opacity={0.85} />
                      {Math.abs(t) <= yTop && <Handle x={1} y={t} color={PALETTE.orange} label="t" dx={10} dy={4} r={5} />}
                    </g>
                  )}
                  <path d={arc} fill="none" stroke={PALETTE.orange} strokeWidth={3.5} opacity={0.75} />
                  <path d={spiral} fill="none" stroke={PALETTE.orange} strokeWidth={1.4} />
                  {Math.abs(t) > 0.05 && <path d={`M${ax1},${ay1} L${ex},${ey} L${ax2},${ay2}`} fill="none" stroke={PALETTE.orange} strokeWidth={1.4} />}
                  {/* projections */}
                  <line x1={p.sx(c)} y1={p.sy(s)} x2={p.sx(c)} y2={p.sy(0)} stroke={PALETTE.muted} strokeDasharray="4 3" />
                  <line x1={p.sx(c)} y1={p.sy(s)} x2={p.sx(0)} y2={p.sy(s)} stroke={PALETTE.muted} strokeDasharray="4 3" />
                  <line x1={O.x} y1={O.y} x2={p.sx(c)} y2={O.y} stroke={PALETTE.blue} strokeWidth={4} />
                  <line x1={O.x} y1={O.y} x2={O.x} y2={p.sy(s)} stroke={PALETTE.red} strokeWidth={4} />
                  <line x1={O.x} y1={O.y} x2={p.sx(c)} y2={p.sy(s)} stroke={PALETTE.fg} strokeWidth={1.5} />
                  <OutlinedText x={p.sx(c / 2)} y={O.y + (s >= 0 ? 16 : -8)} anchor="middle" fill={PALETTE.blue} size={11}>cos t</OutlinedText>
                  <OutlinedText x={O.x + (c >= 0 ? -6 : 6)} y={p.sy(s / 2) + 4} anchor={c >= 0 ? 'end' : 'start'} fill={PALETTE.red} size={11}>sin t</OutlinedText>
                  <OutlinedText x={O.x - 6} y={O.y + 14} anchor="end" size={11}>O</OutlinedText>
                  <OutlinedText x={p.sx(1) - 4} y={O.y + 14} anchor="end" size={11}>I</OutlinedText>
                  <OutlinedText x={O.x - 6} y={p.sy(1) - 4} anchor="end" size={11}>J</OutlinedText>
                  {showAssoc &&
                    assoc.map((a) => (
                      <g key={a.label}>
                        <line x1={O.x} y1={O.y} x2={p.sx(Math.cos(a.a))} y2={p.sy(Math.sin(a.a))} stroke={a.color} strokeDasharray="3 3" />
                        <circle cx={p.sx(Math.cos(a.a))} cy={p.sy(Math.sin(a.a))} r={4.5} fill={a.color} />
                        <OutlinedText x={p.sx(1.13 * Math.cos(a.a))} y={p.sy(1.13 * Math.sin(a.a)) + 4} anchor="middle" fill={a.color} size={10}>
                          {a.label}
                        </OutlinedText>
                      </g>
                    ))}
                </g>
              )
            }}
          </Layer>
          <Handle x={c} y={s} color={PALETTE.orange} label="M" dx={c >= 0 ? 10 : -20} dy={s >= 0 ? -10 : 18} />
        </Plot>

        <div className="flex min-w-0 flex-col gap-2">
          <Plot xMin={-TAU - 0.35} xMax={TAU + 0.35} yMin={-1.45} yMax={1.45} width={560} height={240} xStep={PI / 2} yStep={0.5} labels={false} onPointer={onCurve}>
            <Layer>
              {(p) => (
                <g>
                  {Array.from({ length: 9 }, (_, i) => (i - 4) * 6).map((q) =>
                    q === 0 ? null : (
                      <OutlinedText key={q} x={p.sx((q * PI) / 12)} y={p.sy(0) + 14} anchor="middle" size={10} weight={500} fill={PALETTE.muted}>
                        {piLabel(q)}
                      </OutlinedText>
                    ),
                  )}
                  {[1, -1].map((v) => (
                    <OutlinedText key={v} x={p.sx(0) - 5} y={p.sy(v) + 4} anchor="end" size={10} weight={500} fill={PALETTE.muted}>
                      {v === 1 ? '1' : '−1'}
                    </OutlinedText>
                  ))}
                </g>
              )}
            </Layer>
            <FunctionPath f={Math.cos} color={PALETTE.blue} />
            <FunctionPath f={Math.sin} color={PALETTE.red} />
            <Segment x1={tc} y1={-1.45} x2={tc} y2={1.45} color={PALETTE.orange} dashed />
            <Segment x1={0} y1={c} x2={tc} y2={c} color={PALETTE.blue} dashed width={1} />
            <Segment x1={0} y1={s} x2={tc} y2={s} color={PALETTE.red} dashed width={1} />
            <Handle x={tc} y={c} color={PALETTE.blue} r={4.5} />
            <Handle x={tc} y={s} color={PALETTE.red} r={4.5} />
          </Plot>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4" style={{ background: PALETTE.blue }} /> <Tex>{'x \\mapsto \\cos x'}</Tex> (paire)</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4" style={{ background: PALETTE.red }} /> <Tex>{'x \\mapsto \\sin x'}</Tex> (impaire)</span>
            <span>Période <Tex>{'2\\pi'}</Tex> : <Tex>{'\\cos(x+2\\pi)=\\cos x'}</Tex></span>
          </div>
          {showAssoc && (
            <div className="grid grid-cols-1 gap-1 border bg-background p-2 text-xs sm:grid-cols-2">
              <Tex>{'\\cos(-t)=\\cos t,\\ \\sin(-t)=-\\sin t'}</Tex>
              <Tex>{'\\cos(\\pi-t)=-\\cos t,\\ \\sin(\\pi-t)=\\sin t'}</Tex>
              <Tex>{'\\cos(\\pi+t)=-\\cos t,\\ \\sin(\\pi+t)=-\\sin t'}</Tex>
              <Tex>{'\\cos(\\tfrac{\\pi}{2}-t)=\\sin t,\\ \\sin(\\tfrac{\\pi}{2}-t)=\\cos t'}</Tex>
            </div>
          )}
          <div className="border bg-muted/30 p-2 text-xs leading-relaxed text-muted-foreground">
            Enrouler la droite des réels sur le cercle : le réel <Tex>{'t'}</Tex> vient se placer en <b className="text-foreground">M</b>, l’arc
            <Tex>{'\\overset{\\frown}{IM}'}</Tex> a pour longueur <Tex>{'|t|'}</Tex> (le cercle mesure <Tex>{'2\\pi'}</Tex>). Les coordonnées de M sont
            <Tex>{'(\\cos t\\,;\\,\\sin t)'}</Tex>.
          </div>
        </div>
      </div>
    </WidgetFrame>
  )
}
