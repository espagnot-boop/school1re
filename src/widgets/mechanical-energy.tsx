import { useEffect, useRef, useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Slider } from '@/components/ui/slider'
import { Segmented } from '@/components/ui/tabs'
import { Stat } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { Plot, PALETTE, usePlot } from '@/lib/plot'
import { clamp, fmt } from '@/lib/utils'
import { Arrow, PlayControls, useAnimationFrame, texNum, FONT, MONO } from './_physique/common'

type Scenario = 'chute' | 'plan' | 'pendule'
type Props = { scenario?: Scenario; mass?: number; friction?: number }

const g = 9.81
const SW = 600
const SH = 300

interface Sim {
  t: number
  s: number // chute : z ; plan : abscisse curviligne ; pendule : θ (rad)
  v: number // vitesse algébrique (m/s) ; pendule : ω (rad/s)
  dist: number // distance parcourue (m)
  done: boolean
  stuck: boolean
  hist: { t: number; ec: number; ep: number; em: number }[]
  ghosts: { s: number }[]
  lastGhost: number
  msg: string
}

const COLORS = { ec: PALETTE.blue, ep: PALETTE.orange, em: PALETTE.violet, diss: PALETTE.red }

export default function MechanicalEnergy({ scenario: sc0 = 'chute', mass = 1, friction = 0 }: Props) {
  const [sc, setSc] = useState<Scenario>(['chute', 'plan', 'pendule'].includes(sc0) ? sc0 : 'chute')
  const [m, setM] = useState(clamp(mass, 0.1, 5))
  const [f, setF] = useState(clamp(friction, 0, 5))
  const [h0, setH0] = useState(10)
  const [v0, setV0] = useState(0)
  const [hp, setHp] = useState(2)
  const [alpha, setAlpha] = useState(30)
  const [L, setL] = useState(1)
  const [th0, setTh0] = useState(40)
  const [speed, setSpeed] = useState(0.5)
  const [playing, setPlaying] = useState(false)
  const [, setTick] = useState(0)

  const a = (alpha * Math.PI) / 180
  const Lr = hp / Math.sin(a) // longueur de la pente
  const Lf = Math.max(Lr * Math.cos(a) * 1.2, 2) // longueur du plat

  const init = (): Sim => ({
    t: 0,
    s: sc === 'chute' ? h0 : sc === 'plan' ? 0 : (th0 * Math.PI) / 180,
    v: sc === 'chute' ? v0 : 0,
    dist: 0,
    done: false,
    stuck: false,
    hist: [],
    ghosts: [],
    lastGhost: -1,
    msg: '',
  })
  const sim = useRef<Sim>(init())

  const height = (s: number) => (sc === 'chute' ? s : sc === 'plan' ? (s < Lr ? hp - s * Math.sin(a) : 0) : L * (1 - Math.cos(s)))
  const speedOf = (v: number) => (sc === 'pendule' ? Math.abs(v) * L : Math.abs(v))
  const energies = (S: Sim) => {
    const vv = speedOf(S.v)
    const ec = 0.5 * m * vv * vv
    const ep = m * g * height(S.s)
    return { ec, ep, em: ec + ep }
  }

  const reset = () => {
    sim.current = init()
    const e = energies(sim.current)
    sim.current.hist.push({ t: 0, ...e })
    sim.current.ghosts.push({ s: sim.current.s })
    sim.current.lastGhost = 0
    setTick((x) => x + 1)
  }
  useEffect(() => {
    reset()
    setPlaying(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sc, m, f, h0, v0, hp, alpha, L, th0])

  // accélération « motrice » (sans frottement) selon la coordonnée
  const drive = (s: number) => (sc === 'chute' ? -g : sc === 'plan' ? (s < Lr ? g * Math.sin(a) : 0) : (-g * Math.sin(s)) / L)
  const fric = sc === 'pendule' ? f / m / L : f / m // en unité de la coordonnée

  const step = (S: Sim, dt: number) => {
    if (S.done) return
    const d = drive(S.s)
    if (S.v === 0) {
      // départ possible ? (frottement statique modélisé par f)
      if (Math.abs(d) <= fric + 1e-12) {
        S.done = true
        S.stuck = true
        S.msg =
          sc === 'plan' && S.s < Lr
            ? 'Le frottement compense la composante du poids le long de la pente : le solide reste immobile.'
            : sc === 'chute'
              ? 'Le frottement compense le poids : le solide reste immobile.'
              : S.t > 0
                ? 'Le pendule s’est immobilisé : toute l’énergie mécanique « perdue » a été dissipée en énergie thermique.'
                : 'Le frottement compense la composante du poids : le pendule reste immobile.'
        return
      }
      const dir = Math.sign(d)
      const acc = d - dir * fric
      const nv = acc * dt
      const ds = 0.5 * nv * dt
      S.v = nv
      S.s += ds
      S.dist += Math.abs(ds) * (sc === 'pendule' ? L : 1)
    } else {
      const sv = Math.sign(S.v)
      const acc = d - sv * fric
      let nv = S.v + acc * dt
      if (Math.sign(nv) !== sv) {
        // la vitesse s'annule pendant le pas
        nv = 0
      }
      const ds = 0.5 * (S.v + nv) * dt
      S.v = nv
      S.s += ds
      S.dist += Math.abs(ds) * (sc === 'pendule' ? L : 1)
    }
    S.t += dt
    // fin de mouvement
    if (sc === 'chute' && S.s <= 0) {
      S.s = 0
      S.done = true
      S.msg = `Arrivée au sol à ${fmt(Math.abs(S.v), 2)} m/s.`
    }
    if (sc === 'plan') {
      if (S.s >= Lr + Lf) {
        S.s = Lr + Lf
        S.done = true
        S.msg = `Fin de piste atteinte à ${fmt(Math.abs(S.v), 2)} m/s.`
      } else if (S.s >= Lr && S.v === 0) {
        S.done = true
        S.msg = `Le solide s’arrête sur le plan horizontal après ${fmt(S.s - Lr, 2)} m : son énergie mécanique a été entièrement dissipée.`
      }
    }
    if (sc === 'pendule' && f === 0 && S.t > 60) {
      S.done = true
      S.msg = 'Sans frottement, les oscillations se poursuivraient indéfiniment.'
    }
  }

  useAnimationFrame((dt) => {
    const S = sim.current
    const simDt = dt * speed
    const n = Math.max(1, Math.ceil(simDt / 0.0005))
    for (let i = 0; i < n && !S.done; i++) step(S, simDt / n)
    S.hist.push({ t: S.t, ...energies(S) })
    if (S.hist.length > 4000) S.hist = S.hist.filter((_, i) => i % 2 === 0)
    if (S.t - S.lastGhost >= 0.1) {
      S.ghosts.push({ s: S.s })
      S.lastGhost = S.t
      if (S.ghosts.length > 60) S.ghosts.shift()
    }
    if (S.done) setPlaying(false)
    setTick((x) => (x + 1) % 1e6)
  }, playing)

  const S = sim.current
  const E = energies(S)
  const E0 = S.hist[0] ?? E
  const Wf = -f * S.dist
  const z0 = height(sc === 'chute' ? h0 : sc === 'plan' ? 0 : (th0 * Math.PI) / 180)
  const z = height(S.s)
  const WP = m * g * (z0 - z)
  const vNow = speedOf(S.v)
  const EmMax = Math.max(E0.em, 1e-6)

  // ---------- scène ----------
  let scene: React.ReactNode = null
  if (sc === 'chute') {
    const apex = h0 + (v0 > 0 ? (v0 * v0) / (2 * g) : 0)
    const zTop = Math.max(apex, 1) * 1.08
    const ground = SH - 30
    const ppm = (ground - 20) / zTop
    const X = 300
    const Y = (zz: number) => ground - zz * ppm
    const vy = S.v
    scene = (
      <>
        <rect x={0} y={ground} width={SW} height={30} fill="hsl(var(--muted))" />
        <line x1={0} x2={SW} y1={ground} y2={ground} stroke={PALETTE.fg} strokeWidth={1.5} />
        {/* règle */}
        <line x1={120} x2={120} y1={Y(0)} y2={Y(zTop / 1.08)} stroke={PALETTE.fg} />
        {Array.from({ length: 6 }, (_, i) => (zTop / 1.08) * (i / 5)).map((zz, i) => (
          <g key={i}>
            <line x1={114} x2={120} y1={Y(zz)} y2={Y(zz)} stroke={PALETTE.fg} />
            <text x={110} y={Y(zz) + 4} fontSize={10} textAnchor="end" fill={PALETTE.muted} fontFamily={MONO}>
              {fmt(zz, 1)} m
            </text>
          </g>
        ))}
        <text x={124} y={16} fontSize={11} fill={PALETTE.muted} fontFamily={FONT}>
          z (Epp = 0 au sol)
        </text>
        {S.ghosts.map((gh, i) => (
          <circle key={i} cx={X} cy={Y(gh.s) - 10} r={10} fill="none" stroke={PALETTE.muted} strokeWidth={0.8} opacity={0.5} />
        ))}
        <circle cx={X} cy={Y(z) - 10} r={10} fill={PALETTE.orange} stroke={PALETTE.fg} />
        <Arrow x1={X} y1={Y(z) - 10} x2={X} y2={Y(z) - 10 - vy * 6} color={PALETTE.blue} width={2.5} />
        <text x={X + 16} y={Y(z) - 10 - vy * 3} fontSize={12} fill={PALETTE.blue} fontFamily={FONT} fontStyle="italic">
          v = {fmt(vNow, 2)} m/s
        </text>
        <line x1={X + 40} x2={X + 120} y1={Y(z) - 10} y2={Y(z) - 10} stroke={PALETTE.muted} strokeDasharray="3 3" />
        <text x={X + 124} y={Y(z) - 6} fontSize={11} fill={PALETTE.muted} fontFamily={MONO}>
          z = {fmt(z, 2)} m
        </text>
      </>
    )
  } else if (sc === 'plan') {
    const wTot = Lr * Math.cos(a) + Lf
    const ppm = Math.min(520 / wTot, 220 / hp)
    const x0 = 40
    const ground = SH - 30
    const top = ground - hp * ppm
    const xB = x0 + Lr * Math.cos(a) * ppm
    const pos = (s: number) => (s < Lr ? { x: x0 + s * Math.cos(a) * ppm, y: top + s * Math.sin(a) * ppm, ang: alpha } : { x: xB + (s - Lr) * ppm, y: ground, ang: 0 })
    const p = pos(S.s)
    const bs = 22
    const ang = p.ang
    const vx = Math.abs(S.v) * (ang ? Math.cos(a) : 1)
    const vy = Math.abs(S.v) * (ang ? Math.sin(a) : 0)
    // centre du bloc : décalé perpendiculairement à la surface
    const nx = ang ? Math.sin(a) : 0
    const ny = ang ? -Math.cos(a) : -1
    const cx = p.x + nx * (bs / 2)
    const cy = p.y + ny * (bs / 2)
    scene = (
      <>
        <path d={`M${x0},${top} L${xB},${ground} L${SW - 10},${ground} L${SW - 10},${ground + 30} L${x0},${ground + 30} Z`} fill="hsl(var(--muted))" />
        <path d={`M${x0},${top} L${xB},${ground} L${xB + Lf * ppm},${ground}`} fill="none" stroke={PALETTE.fg} strokeWidth={1.8} />
        <line x1={xB + Lf * ppm} x2={xB + Lf * ppm} y1={ground - 30} y2={ground} stroke={PALETTE.red} strokeWidth={2} />
        <path d={`M${xB - 40},${ground} A40,40 0 0 0 ${xB - 40 * Math.cos(a)},${ground - 40 * Math.sin(a)}`} fill="none" stroke={PALETTE.muted} />
        <text x={xB - 58} y={ground - 6} fontSize={11} fill={PALETTE.muted} fontFamily={FONT}>
          α
        </text>
        <line x1={x0 - 8} x2={x0 - 8} y1={top} y2={ground} stroke={PALETTE.muted} strokeDasharray="3 3" />
        <text x={x0 - 4} y={top - 8} fontSize={11} fill={PALETTE.muted} fontFamily={MONO}>
          h = {fmt(hp, 2)} m
        </text>
        {S.ghosts.map((gh, i) => {
          const q = pos(gh.s)
          return <circle key={i} cx={q.x} cy={q.y} r={2} fill={PALETTE.muted} opacity={0.6} />
        })}
        <g transform={`rotate(${ang} ${cx} ${cy})`}>
          <rect x={cx - bs / 2} y={cy - bs / 2} width={bs} height={bs} fill={PALETTE.orange} stroke={PALETTE.fg} />
        </g>
        <Arrow x1={cx} y1={cy} x2={cx + vx * 12} y2={cy + vy * 12} color={PALETTE.blue} width={2.5} />
        {f > 0 && !S.stuck && Math.abs(S.v) > 0 && <Arrow x1={p.x} y1={p.y} x2={p.x - (ang ? Math.cos(a) : 1) * (10 + f * 8)} y2={p.y - (ang ? Math.sin(a) : 0) * (10 + f * 8)} color={PALETTE.red} width={2} />}
        <text x={SW - 14} y={20} fontSize={11} textAnchor="end" fill={PALETTE.muted} fontFamily={FONT}>
          Epp = 0 sur le plan horizontal
        </text>
      </>
    )
  } else {
    const px = SW / 2
    const py = 26
    const ppm = 210 / L
    const posP = (th: number) => ({ x: px + L * ppm * Math.sin(th), y: py + L * ppm * Math.cos(th) })
    const b = posP(S.s)
    const thA = (th0 * Math.PI) / 180
    const lowY = py + L * ppm
    // vitesse tangentielle
    const vt = S.v * L
    const tx = Math.cos(S.s)
    const ty = -Math.sin(S.s)
    scene = (
      <>
        <rect x={px - 40} y={py - 8} width={80} height={8} fill="hsl(var(--muted))" stroke={PALETTE.fg} />
        <line x1={px} x2={px} y1={py} y2={lowY + 20} stroke={PALETTE.muted} strokeDasharray="4 4" />
        <path d={`M${posP(-thA).x},${posP(-thA).y} A${L * ppm},${L * ppm} 0 0 0 ${posP(thA).x},${posP(thA).y}`} fill="none" stroke={PALETTE.muted} strokeDasharray="2 4" />
        <line x1={px - 160} x2={px + 160} y1={lowY + 12} y2={lowY + 12} stroke={PALETTE.muted} strokeWidth={0.8} />
        <text x={px + 164} y={lowY + 16} fontSize={10} fill={PALETTE.muted} fontFamily={FONT}>
          Epp = 0
        </text>
        {S.ghosts.map((gh, i) => {
          const q = posP(gh.s)
          return <circle key={i} cx={q.x} cy={q.y} r={2} fill={PALETTE.muted} opacity={0.6} />
        })}
        <line x1={px} y1={py} x2={b.x} y2={b.y} stroke={PALETTE.fg} strokeWidth={1.4} />
        <circle cx={b.x} cy={b.y} r={12} fill={PALETTE.orange} stroke={PALETTE.fg} />
        <Arrow x1={b.x} y1={b.y} x2={b.x + vt * tx * 25} y2={b.y + vt * ty * 25} color={PALETTE.blue} width={2.5} />
        <line x1={b.x + 16} x2={b.x + 70} y1={b.y} y2={b.y} stroke={PALETTE.muted} strokeDasharray="3 3" />
        <line x1={b.x + 60} x2={b.x + 60} y1={b.y} y2={lowY + 12} stroke={PALETTE.green} strokeWidth={1.2} />
        <text x={b.x + 66} y={(b.y + lowY + 12) / 2 + 4} fontSize={11} fill={PALETTE.green} fontFamily={MONO}>
          z = {fmt(z, 3)} m
        </text>
        <text x={14} y={20} fontSize={11} fill={PALETTE.muted} fontFamily={MONO}>
          θ = {fmt((S.s * 180) / Math.PI, 1)}°
        </text>
      </>
    )
  }

  // ---------- barres ----------
  const bars = [
    { k: 'Ec', v: E.ec, c: COLORS.ec },
    { k: 'Epp', v: E.ep, c: COLORS.ep },
    { k: 'Em', v: E.em, c: COLORS.em },
    { k: 'dissipée', v: Math.max(0, E0.em - E.em), c: COLORS.diss },
  ]
  const BH = 200
  const tMax = Math.max(1, S.t * 1.05, S.hist.length ? S.hist[S.hist.length - 1].t : 0)
  const polyline = (key: 'ec' | 'ep' | 'em', ctx: { sx: (x: number) => number; sy: (y: number) => number }) =>
    S.hist.map((h) => `${ctx.sx(h.t).toFixed(1)},${ctx.sy(h[key]).toFixed(1)}`).join(' ')
  const yMaxE = EmMax * 1.15

  const controls = (
    <>
      <Segmented
        value={sc}
        onChange={setSc}
        options={[
          { value: 'chute', label: 'Chute' },
          { value: 'plan', label: 'Plan incliné' },
          { value: 'pendule', label: 'Pendule' },
        ]}
      />
      <Slider label="masse m" value={m} min={0.1} max={5} step={0.1} digits={1} unit="kg" onChange={setM} />
      {sc === 'chute' && (
        <>
          <Slider label="hauteur initiale" value={h0} min={1} max={30} step={0.5} digits={1} unit="m" onChange={setH0} />
          <Slider label="vitesse initiale (vers le haut > 0)" value={v0} min={-10} max={15} step={0.5} digits={1} unit="m/s" onChange={setV0} />
        </>
      )}
      {sc === 'plan' && (
        <>
          <Slider label="hauteur de départ" value={hp} min={0.5} max={5} step={0.1} digits={1} unit="m" onChange={setHp} />
          <Slider label="inclinaison α" value={alpha} min={10} max={70} step={1} digits={0} unit="°" onChange={setAlpha} />
        </>
      )}
      {sc === 'pendule' && (
        <>
          <Slider label="longueur ℓ" value={L} min={0.3} max={3} step={0.1} digits={1} unit="m" onChange={setL} />
          <Slider label="angle initial θ₀" value={th0} min={5} max={85} step={1} digits={0} unit="°" onChange={setTh0} />
        </>
      )}
      <Slider label="frottements f (force constante)" value={f} min={0} max={5} step={0.05} digits={2} unit="N" onChange={setF} />
      <Slider label="vitesse de lecture" value={speed} min={0.1} max={1} step={0.05} digits={2} unit="×" onChange={setSpeed} />
      <PlayControls
        playing={playing}
        onToggle={() => {
          if (sim.current.done) reset()
          setPlaying((p) => !p)
        }}
        onReset={() => {
          setPlaying(false)
          reset()
        }}
      />
      <div className="grid grid-cols-2 gap-2">
        <Stat label="t" value={`${fmt(S.t, 2)} s`} />
        <Stat label="v" value={`${fmt(vNow, 2)} m/s`} />
        <Stat label="Ec" value={`${fmt(E.ec, 2)} J`} />
        <Stat label="Epp" value={`${fmt(E.ep, 2)} J`} />
        <Stat label="Em = Ec + Epp" value={`${fmt(E.em, 2)} J`} tone="info" />
        <Stat label="W(f) = −f·d" value={`${fmt(Wf, 2)} J`} tone={Wf < 0 ? 'destructive' : undefined} />
      </div>
    </>
  )

  return (
    <WidgetFrame
      title="Énergie mécanique"
      subtitle="Énergies cinétique, potentielle de pesanteur et mécanique — avec ou sans frottements"
      controls={controls}
      footer={
        <div className="space-y-1">
          <Tex display>{String.raw`\Delta E_c = W(\vec P) + W(\vec f) \;:\; ${texNum(E.ec - E0.ec, 2)} \approx ${texNum(WP, 2)} + (${texNum(Wf, 2)})\ \text{J}`}</Tex>
          <Tex display>{String.raw`\Delta E_m = W(\vec f) \;:\; ${texNum(E.em - E0.em, 2)} \approx ${texNum(Wf, 2)}\ \text{J}`}</Tex>
          <p className="text-muted-foreground">
            {S.msg ||
              (f === 0
                ? 'Sans frottement, l’énergie mécanique se conserve : l’énergie potentielle de pesanteur se convertit en énergie cinétique et inversement.'
                : 'Avec frottements, l’énergie mécanique diminue : sa variation est égale au travail (négatif) des forces de frottement, l’énergie étant dissipée sous forme thermique.')}
          </p>
        </div>
      }
    >
      <svg viewBox={`0 0 ${SW} ${SH}`} className="h-auto w-full select-none border bg-background">
        {scene}
      </svg>
      <div className="mt-3 grid gap-3 sm:grid-cols-[150px_1fr]">
        <svg viewBox={`0 0 150 ${BH + 40}`} className="h-auto w-full border bg-background">
          {bars.map((b, i) => {
            const hgt = (BH - 10) * clamp(b.v / (EmMax * 1.05), 0, 1)
            const x = 10 + i * 34
            return (
              <g key={b.k}>
                <rect x={x} y={BH - hgt} width={26} height={hgt} fill={b.c} opacity={0.85} />
                <text x={x + 13} y={BH + 14} textAnchor="middle" fontSize={10} fill={PALETTE.fg} fontFamily={FONT}>
                  {b.k === 'dissipée' ? 'Q' : b.k}
                </text>
                <text x={x + 13} y={BH + 28} textAnchor="middle" fontSize={8.5} fill={PALETTE.muted} fontFamily={MONO}>
                  {fmt(b.v, 1)}
                </text>
              </g>
            )
          })}
          <line x1={4} x2={146} y1={BH} y2={BH} stroke={PALETTE.fg} />
        </svg>
        <div>
          <Plot xMin={0} xMax={tMax} yMin={0} yMax={yMaxE} height={200} xLabel="t (s)" yLabel="E (J)">
            <EnergyCurves poly={polyline} />
          </Plot>
          <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
            <Legend c={COLORS.ec} t="Ec" />
            <Legend c={COLORS.ep} t="Epp" />
            <Legend c={COLORS.em} t="Em" />
            <span>Q : énergie dissipée (transfert thermique)</span>
          </div>
        </div>
      </div>
    </WidgetFrame>
  )
}

function EnergyCurves({ poly }: { poly: (k: 'ec' | 'ep' | 'em', ctx: { sx: (x: number) => number; sy: (y: number) => number }) => string }) {
  const ctx = usePlot()
  return (
    <g fill="none" strokeWidth={2}>
      <polyline points={poly('ep', ctx)} stroke={COLORS.ep} />
      <polyline points={poly('ec', ctx)} stroke={COLORS.ec} />
      <polyline points={poly('em', ctx)} stroke={COLORS.em} strokeWidth={2.5} />
    </g>
  )
}
function Legend({ c, t }: { c: string; t: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-block h-0.5 w-4" style={{ background: c }} /> {t}
    </span>
  )
}
