import { useRef, useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Slider } from '@/components/ui/slider'
import { Segmented } from '@/components/ui/tabs'
import { Stat } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { Plot, FunctionPath, Point, Segment, PALETTE } from '@/lib/plot'
import { clamp, fmt } from '@/lib/utils'
import { PlayControls, useAnimationFrame, texNum, FONT, MONO } from './_physique/common'

type Mode = 'resistance' | 'moteur' | 'generateur'
type Props = { mode?: Mode; U?: number; R?: number }

const SW = 580
const SH = 300
const L = 80,
  R_ = 440,
  T = 60,
  B = 240
const PER = 2 * (R_ - L) + 2 * (B - T)

/** position sur la boucle (sens horaire depuis le coin haut-gauche) */
function onLoop(s: number) {
  s = ((s % PER) + PER) % PER
  const w = R_ - L,
    h = B - T
  if (s < w) return { x: L + s, y: T }
  s -= w
  if (s < h) return { x: R_, y: T + s }
  s -= h
  if (s < w) return { x: R_ - s, y: B }
  s -= w
  return { x: L, y: B - s }
}

function Meter({ x, y, letter, value }: { x: number; y: number; letter: string; value: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={16} fill="hsl(var(--card))" stroke={PALETTE.fg} strokeWidth={1.5} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={PALETTE.fg} fontFamily={FONT}>
        {letter}
      </text>
      <rect x={x - 34} y={y - 42} width={68} height={18} fill="hsl(var(--background))" stroke={PALETTE.grid} />
      <text x={x} y={y - 29} textAnchor="middle" fontSize={11} fill={PALETTE.fg} fontFamily={MONO}>
        {value}
      </text>
    </g>
  )
}

function FlowBar({ total, parts, unit = 'W' }: { total: number; parts: { label: string; v: number; c: string }[]; unit?: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Bilan de puissance</span>
        <span className="font-mono">
          {fmt(total, 2)} {unit} reçus
        </span>
      </div>
      <div className="flex h-6 w-full border bg-muted/40">
        {parts.map((p) => (
          <div
            key={p.label}
            className="flex h-full items-center justify-center overflow-hidden whitespace-nowrap text-[10px] font-medium text-white"
            style={{ width: `${total > 0 ? clamp((100 * p.v) / total, 0, 100) : 0}%`, background: p.c }}
            title={p.label}
          >
            {total > 0 && p.v / total > 0.15 ? p.label : ''}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
        {parts.map((p) => (
          <span key={p.label} className="inline-flex items-center gap-1">
            <span className="inline-block size-2" style={{ background: p.c }} /> {p.label} : {fmt(p.v, 2)} {unit}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ElectricPower({ mode: mode0 = 'resistance', U: U0 = 12, R: R0 = 20 }: Props) {
  const [mode, setMode] = useState<Mode>(['resistance', 'moteur', 'generateur'].includes(mode0) ? mode0 : 'resistance')
  // conducteur ohmique
  const [U, setU] = useState(clamp(U0, 0, 24))
  const [R, setR] = useState(clamp(R0, 1, 100))
  const [dtMin, setDtMin] = useState(60)
  // moteur
  const [Um, setUm] = useState(12)
  const [Im, setIm] = useState(1)
  const [rm, setRm] = useState(2)
  // générateur réel
  const [E, setE] = useState(12)
  const [rg, setRg] = useState(1.5)
  const [Rl, setRl] = useState(6)

  const [playing, setPlaying] = useState(true)
  const sRef = useRef(0)
  const rot = useRef(0)
  const [, setTick] = useState(0)

  // ---------- calculs ----------
  let I = 0,
    Uc = 0,
    Precu = 0,
    Putile = 0,
    PJ = 0,
    eta = 0
  let ImEff = Im
  if (mode === 'resistance') {
    I = U / R
    Uc = U
    Precu = U * I
    PJ = R * I * I
    Putile = 0
  } else if (mode === 'moteur') {
    ImEff = Math.min(Im, Um / rm)
    I = ImEff
    Uc = Um
    Precu = Um * I
    PJ = rm * I * I
    Putile = Math.max(0, Precu - PJ)
    eta = Precu > 0 ? Putile / Precu : 0
  } else {
    I = E / (Rl + rg)
    Uc = E - rg * I
    Precu = E * I // puissance électrique produite (convertie à partir de l'énergie chimique)
    PJ = rg * I * I
    Putile = Uc * I // fournie au circuit extérieur
    eta = E > 0 ? Uc / E : 0
  }
  const dtS = dtMin * 60
  const energyJ = (mode === 'resistance' ? Precu : Precu) * dtS
  const Pmax = mode === 'resistance' ? (24 * 24) / 1 : 72

  useAnimationFrame((dt) => {
    sRef.current += dt * 70 * I
    rot.current += dt * (mode === 'moteur' ? 4 * Putile : 0)
    setTick((t) => (t + 1) % 1e6)
  }, playing)

  const nDots = 36
  const dots = Array.from({ length: nDots }, (_, i) => onLoop(sRef.current + (i * PER) / nDots))
  const glow = clamp(Math.sqrt(PJ / (mode === 'resistance' ? 60 : 20)), 0, 1)

  const component = () => {
    const cx = R_
    const cy = (T + B) / 2
    if (mode === 'moteur') {
      const blocked = Putile < 1e-6 && I > 0
      return (
        <g>
          <circle cx={cx} cy={cy} r={24} fill="hsl(var(--card))" stroke={PALETTE.fg} strokeWidth={2} />
          <g transform={`rotate(${(rot.current * 180) / Math.PI} ${cx} ${cy})`}>
            {[0, 1, 2].map((k) => (
              <line key={k} x1={cx} y1={cy} x2={cx + 15 * Math.cos((k * 2 * Math.PI) / 3)} y2={cy + 15 * Math.sin((k * 2 * Math.PI) / 3)} stroke={PALETTE.blue} strokeWidth={3} />
            ))}
          </g>
          <circle cx={cx} cy={cy} r={24} fill={PALETTE.red} opacity={glow * 0.35} />
          <text x={cx - 34} y={cy + 5} textAnchor="end" fontSize={14} fontWeight={700} fill={PALETTE.fg} fontFamily={FONT}>
            M
          </text>
          {blocked && (
            <text x={cx - 34} y={cy + 22} textAnchor="end" fontSize={10} fill={PALETTE.red} fontFamily={FONT}>
              bloqué
            </text>
          )}
        </g>
      )
    }
    return (
      <g>
        <rect x={cx - 11} y={cy - 32} width={22} height={64} fill="hsl(var(--card))" stroke={PALETTE.fg} strokeWidth={2} />
        <rect x={cx - 11} y={cy - 32} width={22} height={64} fill={PALETTE.orange} opacity={glow * 0.85} />
        <text x={cx - 20} y={cy + 5} textAnchor="end" fontSize={13} fontWeight={700} fill={PALETTE.fg} fontFamily={FONT}>
          R
        </text>
        {glow > 0.15 &&
          [0, 1, 2].map((k) => (
            <path
              key={k}
              d={`M${cx + 18 + k * 7},${cy + 20} q4,-10 0,-20 q-4,-10 0,-20`}
              fill="none"
              stroke={PALETTE.red}
              strokeWidth={1.2}
              opacity={glow * (0.5 + 0.5 * Math.sin(sRef.current / 20 + k))}
            />
          ))}
      </g>
    )
  }

  const generator = () => {
    const cx = L
    const cy = (T + B) / 2
    return (
      <g>
        <rect x={cx - 26} y={cy - 30} width={52} height={60} fill="hsl(var(--card))" />
        <line x1={cx - 20} x2={cx + 20} y1={cy - 6} y2={cy - 6} stroke={PALETTE.fg} strokeWidth={3} />
        <line x1={cx - 11} x2={cx + 11} y1={cy + 6} y2={cy + 6} stroke={PALETTE.fg} strokeWidth={5} />
        <line x1={cx} x2={cx} y1={cy - 30} y2={cy - 6} stroke={PALETTE.fg} strokeWidth={2} />
        <line x1={cx} x2={cx} y1={cy + 6} y2={cy + 30} stroke={PALETTE.fg} strokeWidth={2} />
        <text x={cx + 26} y={cy - 10} fontSize={13} fontWeight={700} fill={PALETTE.red} fontFamily={FONT}>
          +
        </text>
        <text x={cx + 26} y={cy + 20} fontSize={13} fontWeight={700} fill={PALETTE.blue} fontFamily={FONT}>
          −
        </text>
        {mode === 'generateur' && (
          <g>
            <rect x={cx - 9} y={cy + 36} width={18} height={30} fill="hsl(var(--card))" stroke={PALETTE.fg} strokeWidth={1.5} />
            <rect x={cx - 9} y={cy + 36} width={18} height={30} fill={PALETTE.orange} opacity={glow * 0.8} />
            <text x={cx - 14} y={cy + 56} textAnchor="end" fontSize={11} fill={PALETTE.fg} fontFamily={FONT}>
              r
            </text>
            <rect x={cx - 34} y={cy - 40} width={68} height={112} fill="none" stroke={PALETTE.muted} strokeDasharray="4 3" />
          </g>
        )}
        <text x={cx - 32} y={cy + 4} textAnchor="end" fontSize={12} fill={PALETTE.fg} fontFamily={MONO}>
          {mode === 'generateur' ? `E = ${fmt(E, 1)} V` : `${fmt(Uc, 1)} V`}
        </text>
      </g>
    )
  }

  const controls = (
    <>
      <Segmented
        value={mode}
        onChange={setMode}
        options={[
          { value: 'resistance', label: 'Effet Joule' },
          { value: 'moteur', label: 'Moteur' },
          { value: 'generateur', label: 'Générateur réel' },
        ]}
      />
      {mode === 'resistance' && (
        <>
          <Slider label="tension U" value={U} min={0} max={24} step={0.5} digits={1} unit="V" onChange={setU} />
          <Slider label="résistance R" value={R} min={1} max={100} step={1} digits={0} unit="Ω" onChange={setR} />
          <Slider label="durée Δt" value={dtMin} min={1} max={600} step={1} digits={0} unit="min" onChange={setDtMin} />
        </>
      )}
      {mode === 'moteur' && (
        <>
          <Slider label="tension U" value={Um} min={1} max={24} step={0.5} digits={1} unit="V" onChange={setUm} />
          <Slider label="intensité I" value={Im} min={0.1} max={3} step={0.05} digits={2} unit="A" onChange={setIm} />
          <Slider label="résistance interne r" value={rm} min={0.2} max={10} step={0.1} digits={1} unit="Ω" onChange={setRm} />
          <Slider label="durée Δt" value={dtMin} min={1} max={600} step={1} digits={0} unit="min" onChange={setDtMin} />
        </>
      )}
      {mode === 'generateur' && (
        <>
          <Slider label="force électromotrice E" value={E} min={1} max={24} step={0.5} digits={1} unit="V" onChange={setE} />
          <Slider label="résistance interne r" value={rg} min={0.1} max={5} step={0.1} digits={1} unit="Ω" onChange={setRg} />
          <Slider label="résistance de charge R" value={Rl} min={0.5} max={50} step={0.5} digits={1} unit="Ω" onChange={setRl} />
          <Slider label="durée Δt" value={dtMin} min={1} max={600} step={1} digits={0} unit="min" onChange={setDtMin} />
        </>
      )}
      <PlayControls playing={playing} onToggle={() => setPlaying((p) => !p)} />
      <div className="grid grid-cols-2 gap-2">
        <Stat label="U" value={`${fmt(Uc, 2)} V`} />
        <Stat label="I" value={`${fmt(I, 3)} A`} />
        {mode === 'resistance' && (
          <>
            <Stat label="P = U·I" value={`${fmt(Precu, 2)} W`} tone="info" />
            <Stat label="P_J = R·I²" value={`${fmt(PJ, 2)} W`} tone="destructive" />
          </>
        )}
        {mode === 'moteur' && (
          <>
            <Stat label="P reçue = U·I" value={`${fmt(Precu, 2)} W`} tone="info" />
            <Stat label="P_J = r·I²" value={`${fmt(PJ, 2)} W`} tone="destructive" />
            <Stat label="P mécanique" value={`${fmt(Putile, 2)} W`} tone="success" />
            <Stat label="rendement η" value={`${fmt(eta * 100, 1)} %`} />
          </>
        )}
        {mode === 'generateur' && (
          <>
            <Stat label="P = E·I (convertie)" value={`${fmt(Precu, 2)} W`} tone="info" />
            <Stat label="P_J = r·I²" value={`${fmt(PJ, 2)} W`} tone="destructive" />
            <Stat label="P fournie = U·I" value={`${fmt(Putile, 2)} W`} tone="success" />
            <Stat label="rendement η = U/E" value={`${fmt(eta * 100, 1)} %`} />
          </>
        )}
        <Stat label={`énergie en ${fmt(dtMin, 0)} min`} value={`${fmt(energyJ / 1000, 1)} kJ = ${fmt(energyJ / 3600, 2)} Wh`} className="col-span-2" />
      </div>
    </>
  )

  let footer: React.ReactNode
  if (mode === 'resistance')
    footer = (
      <>
        <Tex display>{String.raw`I = \frac{U}{R} = ${texNum(I, 3)}\ \text{A} \qquad P = U\,I = R\,I^2 = \frac{U^2}{R} = ${texNum(Precu, 2)}\ \text{W} \qquad \mathcal{E} = P\,\Delta t = ${texNum(energyJ, 0)}\ \text{J}`}</Tex>
        <p className="text-muted-foreground">
          Dans un conducteur ohmique, toute l’énergie électrique reçue est convertie en énergie thermique (effet Joule). À tension fixée, diviser R par 2 double I et donc
          la puissance. 1 Wh = 3 600 J.
        </p>
      </>
    )
  else if (mode === 'moteur')
    footer = (
      <>
        <Tex display>{String.raw`P_{\text{reçue}} = U I = ${texNum(Precu, 2)}\ \text{W} = P_{\text{méca}} + P_J \quad\text{avec}\quad P_J = r I^2 = ${texNum(PJ, 2)}\ \text{W} \qquad \eta = \frac{P_{\text{utile}}}{P_{\text{reçue}}} = ${texNum(eta, 3)}`}</Tex>
        <p className="text-muted-foreground">
          Le moteur convertit l’énergie électrique en énergie mécanique utile, mais une partie est dissipée par effet Joule dans ses bobinages : le rendement est
          toujours inférieur à 1.{ImEff < Im ? ' Ici l’intensité est limitée à U/r : le moteur est bloqué, toute la puissance est dissipée.' : ''}
        </p>
      </>
    )
  else
    footer = (
      <>
        <Tex display>{String.raw`I = \frac{E}{R + r} = ${texNum(I, 3)}\ \text{A} \qquad U = E - r I = ${texNum(Uc, 2)}\ \text{V} \qquad E I = U I + r I^2 : ${texNum(Precu, 2)} = ${texNum(Putile, 2)} + ${texNum(PJ, 2)}\ \text{W}`}</Tex>
        <p className="text-muted-foreground">
          Un générateur réel se modélise par une source idéale de tension E en série avec une résistance interne r : la tension à ses bornes diminue quand il débite.
          La puissance fournie au circuit est maximale quand R = r (rendement alors de 50 %).
        </p>
      </>
    )

  return (
    <WidgetFrame title="Puissance et énergie électriques" subtitle="Circuit en série — points : sens conventionnel du courant" controls={controls} footer={<div className="space-y-1">{footer}</div>}>
      <svg viewBox={`0 0 ${SW} ${SH}`} className="h-auto w-full select-none border bg-background">
        {/* fils */}
        <rect x={L} y={T} width={R_ - L} height={B - T} fill="none" stroke={PALETTE.fg} strokeWidth={2} />
        {/* voltmètre en dérivation */}
        <path d={`M${R_},${T + 30} L${R_ + 80},${T + 30} L${R_ + 80},${B - 30} L${R_},${B - 30}`} fill="none" stroke={PALETTE.muted} strokeWidth={1.4} />
        <circle cx={R_} cy={T + 30} r={3} fill={PALETTE.fg} />
        <circle cx={R_} cy={B - 30} r={3} fill={PALETTE.fg} />
        {/* porteurs */}
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={3} fill={PALETTE.yellow} opacity={I > 0 ? 0.95 : 0.25} />
        ))}
        {generator()}
        {component()}
        <Meter x={(L + R_) / 2} y={T} letter="A" value={`${fmt(I, 3)} A`} />
        <Meter x={R_ + 80} y={(T + B) / 2 + 30} letter="V" value={`${fmt(Uc, 2)} V`} />
        <text x={(L + R_) / 2} y={B + 26} textAnchor="middle" fontSize={11} fill={PALETTE.muted} fontFamily={FONT}>
          {mode === 'resistance' ? 'conducteur ohmique : énergie électrique → énergie thermique' : mode === 'moteur' ? 'moteur : énergie électrique → mécanique + thermique' : 'pile/générateur réel (E, r) alimentant une résistance R'}
        </text>
        <text x={(L + R_) / 2} y={B + 44} textAnchor="middle" fontSize={10} fill={PALETTE.muted} fontFamily={MONO}>
          P/Pmax ≈ {fmt(Math.min(1, Precu / Pmax) * 100, 0)} %
        </text>
      </svg>

      <div className="mt-3">
        {mode === 'resistance' && <FlowBar total={Precu} parts={[{ label: 'thermique (Joule)', v: PJ, c: PALETTE.red }]} />}
        {mode === 'moteur' && (
          <FlowBar
            total={Precu}
            parts={[
              { label: 'mécanique (utile)', v: Putile, c: PALETTE.green },
              { label: 'thermique (Joule)', v: PJ, c: PALETTE.red },
            ]}
          />
        )}
        {mode === 'generateur' && (
          <>
            <FlowBar
              total={Precu}
              parts={[
                { label: 'fournie au circuit', v: Putile, c: PALETTE.green },
                { label: 'Joule interne', v: PJ, c: PALETTE.red },
              ]}
            />
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <div className="mb-1 text-xs text-muted-foreground">Caractéristique U = E − r·I</div>
                <Plot xMin={0} xMax={(E / rg) * 1.05} yMin={0} yMax={E * 1.15} height={200} width={360} xLabel="I (A)" yLabel="U (V)">
                  <FunctionPath f={(i) => E - rg * i} from={0} to={E / rg} color={PALETTE.violet} />
                  <Segment x1={I} y1={0} x2={I} y2={Uc} dashed color={PALETTE.muted} width={1} />
                  <Point x={I} y={Uc} color={PALETTE.red} label="" />
                </Plot>
              </div>
              <div>
                <div className="mb-1 text-xs text-muted-foreground">Puissance fournie en fonction de R</div>
                <Plot xMin={0} xMax={50} yMin={0} yMax={((E * E) / (4 * rg)) * 1.2} height={200} width={360} xLabel="R (Ω)" yLabel="P (W)">
                  <FunctionPath f={(r) => (r * E * E) / ((r + rg) * (r + rg))} from={0} to={50} color={PALETTE.green} />
                  <Segment x1={rg} y1={0} x2={rg} y2={(E * E) / (4 * rg)} dashed color={PALETTE.muted} width={1} />
                  <Point x={Rl} y={Putile} color={PALETTE.red} label="" />
                </Plot>
              </div>
            </div>
          </>
        )}
      </div>
    </WidgetFrame>
  )
}
