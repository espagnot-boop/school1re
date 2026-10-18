import { useEffect, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Tex } from '@/components/Tex'
import { Button } from '@/components/ui/button'
import { Segmented } from '@/components/ui/tabs'
import { Stat } from '@/components/ui/misc'
import { PALETTE } from '@/lib/plot'
import { cn } from '@/lib/utils'
import { PHYS, fmtSig, rgbCss, sci, sciTex, texSig, wavelengthCss, wavelengthDomain, wavelengthName, wavelengthRGB } from './_chimie/chem'

type Atom = 'hydrogene' | 'mercure' | 'sodium'

interface Props {
  atom?: Atom
}

interface Level {
  E: number // eV
  label: string
  sub?: string
}
interface AtomDef {
  name: string
  levels: Level[]
  /** raies effectivement observées (indices haut → bas) ; null = toutes */
  lines: [number, number][] | null
  note: string
}

const H_LEVELS: Level[] = [1, 2, 3, 4, 5, 6].map((n) => ({ E: -13.6 / (n * n), label: `n = ${n}`, sub: n === 1 ? 'fondamental' : undefined }))

const ATOMS: Record<Atom, AtomDef> = {
  hydrogene: {
    name: 'Hydrogène',
    levels: [...H_LEVELS, { E: 0, label: 'n → ∞', sub: 'ionisation' }],
    lines: null,
    note: 'Série de Lyman (vers n = 1) : UV ; série de Balmer (vers n = 2) : 4 raies visibles (656, 486, 434, 410 nm) ; série de Paschen (vers n = 3) : IR.',
  },
  mercure: {
    name: 'Mercure',
    levels: [
      { E: -10.438, label: '6s² ¹S₀', sub: 'fondamental' },
      { E: -5.77, label: '6p ³P₀' },
      { E: -5.551, label: '6p ³P₁' },
      { E: -4.977, label: '6p ³P₂' },
      { E: -3.734, label: '6p ¹P₁' },
      { E: -2.707, label: '7s ³S₁' },
      { E: -1.593, label: '6d ¹D₂' },
      { E: 0, label: 'ionisation' },
    ],
    lines: [
      [2, 0],
      [4, 0],
      [5, 1],
      [5, 2],
      [5, 3],
      [6, 4],
    ],
    note: 'Diagramme simplifié (7 niveaux). Raies intenses : 253,7 nm et 184,9 nm (UV, lampes germicides), 404,7 nm (violet), 435,8 nm (bleu), 546,1 nm (vert), 579 nm (jaune).',
  },
  sodium: {
    name: 'Sodium',
    levels: [
      { E: -5.139, label: '3s', sub: 'fondamental' },
      { E: -3.036, label: '3p' },
      { E: -1.948, label: '4s' },
      { E: -1.522, label: '3d' },
      { E: -1.386, label: '4p' },
      { E: -1.023, label: '5s' },
      { E: -0.855, label: '4d' },
      { E: 0, label: 'ionisation' },
    ],
    lines: [
      [1, 0],
      [4, 0],
      [3, 1],
      [2, 1],
      [5, 1],
      [6, 1],
    ],
    note: 'Diagramme simplifié. La transition 3p → 3s donne le célèbre doublet jaune (589,0 et 589,6 nm, le niveau 3p étant en réalité dédoublé) des lampes à vapeur de sodium.',
  },
}

const lambdaNm = (dE: number) => PHYS.hc_eVnm / dE

export default function EnergyLevels({ atom = 'hydrogene' }: Props) {
  const [a, setA] = useState<Atom>(ATOMS[atom] ? atom : 'hydrogene')
  const A = ATOMS[a]
  const ion = A.levels.length - 1
  const [cur, setCur] = useState(a === 'hydrogene' ? 2 : 1) // niveau occupé par l'électron
  const [trans, setTrans] = useState<{ from: number; to: number } | null>(a === 'hydrogene' ? { from: 2, to: 1 } : { from: 1, to: 0 })
  const [view, setView] = useState<'emission' | 'absorption'>('emission')
  const [anim, setAnim] = useState(1)
  const raf = useRef(0)

  useEffect(() => {
    const isH = a === 'hydrogene'
    setCur(isH ? 1 : 0)
    setTrans(isH ? { from: 2, to: 1 } : ATOMS[a].lines ? { from: ATOMS[a].lines![0][0], to: ATOMS[a].lines![0][1] } : null)
    play()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a])

  function play() {
    cancelAnimationFrame(raf.current)
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1100)
      setAnim(p)
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }
  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const jump = (to: number) => {
    if (to === cur) return
    setTrans({ from: cur, to })
    setCur(to)
    play()
  }
  const setLine = (hi: number, lo: number) => {
    const emi = view === 'emission'
    setTrans(emi ? { from: hi, to: lo } : { from: lo, to: hi })
    setCur(emi ? lo : hi)
    play()
  }

  const Ef = trans ? A.levels[trans.from].E : 0
  const Et = trans ? A.levels[trans.to].E : 0
  const dE = Math.abs(Et - Ef)
  const emission = trans ? Et < Ef : true
  const ionisation = trans ? trans.to === ion : false
  const lam = dE > 0 ? lambdaNm(dE) : NaN
  const dEJ = dE * PHYS.e
  const nu = dEJ / PHYS.h
  const isObserved = (hi: number, lo: number) => A.lines === null || A.lines.some(([x, y]) => x === hi && y === lo)
  const observed = trans && !ionisation ? isObserved(Math.max(trans.from, trans.to), Math.min(trans.from, trans.to)) : true

  // Toutes les raies (pour le spectre)
  const allLines: { hi: number; lo: number; lam: number }[] = []
  for (let hi = 1; hi < ion; hi++)
    for (let lo = 0; lo < hi; lo++) if (isObserved(hi, lo)) allLines.push({ hi, lo, lam: lambdaNm(A.levels[hi].E - A.levels[lo].E) })

  // ---- Diagramme
  const W = 420
  const H = 380
  const top = 24
  const bot = 20
  const Emin = A.levels[0].E
  const Y = (E: number) => top + ((0 - E) / (0 - Emin)) * (H - top - bot)
  const xL = 70
  const xR = 290
  // positions des étiquettes sans chevauchement
  const labelY = A.levels.map((l) => Y(l.E))
  for (let i = 1; i < labelY.length; i++) if (labelY[i] > labelY[i - 1] - 12) labelY[i] = labelY[i - 1] - 12
  const eTicks = a === 'hydrogene' ? [-14, -12, -10, -8, -6, -4, -2, 0] : a === 'mercure' ? [-10, -8, -6, -4, -2, 0] : [-5, -4, -3, -2, -1, 0]

  const tx = 200
  const yF = trans ? Y(Ef) : 0
  const yT = trans ? Y(Et) : 0
  const photonColor = Number.isFinite(lam) ? wavelengthCss(lam) : PALETTE.muted
  const wave = (x0: number, y0: number, len: number, dir: 1 | -1) => {
    // onde sinusoïdale horizontale
    let d = ''
    const k = Math.max(6, Math.min(30, lam / 25))
    for (let s = 0; s <= len; s += 2) {
      const x = x0 + dir * s
      const y = y0 + 5 * Math.sin((s / k) * 2 * Math.PI)
      d += `${s === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    }
    return d
  }
  const ePos = trans ? yF + (yT - yF) * Math.min(1, anim * 1.6) : Y(A.levels[cur].E)

  const controls = (
    <>
      <Segmented
        value={a}
        onChange={setA}
        options={[
          { value: 'hydrogene', label: 'Hydrogène' },
          { value: 'mercure', label: 'Mercure' },
          { value: 'sodium', label: 'Sodium' },
        ]}
      />
      <Segmented
        value={view}
        onChange={setView}
        options={[
          { value: 'emission', label: 'Spectre d’émission' },
          { value: 'absorption', label: 'Spectre d’absorption' },
        ]}
      />
      <div>
        <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {a === 'hydrogene' ? 'Raies de Balmer (visible) et autres' : 'Raies observées'}
        </div>
        <div className="flex flex-wrap gap-1">
          {allLines
            .filter((l) => a !== 'hydrogene' || l.hi <= 5)
            .sort((x, y) => x.lam - y.lam)
            .map((l) => {
              const active = trans && Math.max(trans.from, trans.to) === l.hi && Math.min(trans.from, trans.to) === l.lo
              return (
                <button
                  key={`${l.hi}-${l.lo}`}
                  onClick={() => setLine(l.hi, l.lo)}
                  className={cn('flex items-center gap-1 border px-1.5 py-0.5 font-mono text-[11px]', active ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent')}
                >
                  <span className="inline-block size-2" style={{ background: wavelengthDomain(l.lam) === 'visible' ? wavelengthCss(l.lam) : 'transparent', border: '1px solid hsl(var(--border))' }} />
                  {fmtSig(l.lam, l.lam >= 1000 ? 4 : 3)}
                </button>
              )
            })}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Cliquez sur un niveau du diagramme : l’électron y « saute » depuis son niveau actuel.</p>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          setCur(0)
          setTrans(null)
        }}
      >
        <RotateCcw /> État fondamental
      </Button>
    </>
  )

  return (
    <WidgetFrame
      title="Niveaux d’énergie d’un atome"
      subtitle={`${A.name} — quantification de l’énergie, émission et absorption de photons`}
      controls={controls}
      footer={<span>{A.note}</span>}
    >
      <div className="flex flex-col gap-3">
        <div className="grid gap-3 md:grid-cols-[1.15fr_1fr]">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full select-none border bg-background" role="img" aria-label="Diagramme des niveaux d’énergie">
            {/* axe des énergies */}
            <line x1={40} x2={40} y1={top - 14} y2={H - bot + 4} stroke={PALETTE.fg} />
            <path d={`M36,${top - 6} L40,${top - 14} L44,${top - 6}`} fill="none" stroke={PALETTE.fg} />
            <text x={46} y={top - 8} fontSize={11} fill={PALETTE.fg} fontFamily="Geist, sans-serif">
              E (eV)
            </text>
            {eTicks.map((e) => (
              <g key={e}>
                <line x1={36} x2={40} y1={Y(e)} y2={Y(e)} stroke={PALETTE.fg} />
                <text x={33} y={Y(e) + 3} textAnchor="end" fontSize={10} fill={PALETTE.muted} fontFamily="Geist Mono, monospace">
                  {String(e).replace('-', '−')}
                </text>
              </g>
            ))}
            {/* niveaux */}
            {A.levels.map((l, i) => {
              const sel = trans && (trans.from === i || trans.to === i)
              return (
                <g key={i} className="cursor-pointer" onClick={() => jump(i)}>
                  <rect x={xL} y={Y(l.E) - 6} width={xR - xL} height={12} fill="transparent" />
                  <line
                    x1={xL}
                    x2={xR}
                    y1={Y(l.E)}
                    y2={Y(l.E)}
                    stroke={i === ion ? PALETTE.muted : PALETTE.fg}
                    strokeWidth={sel ? 2.6 : 1.6}
                    strokeDasharray={i === ion ? '5 4' : undefined}
                  />
                  <line x1={xR} x2={xR + 8} y1={Y(l.E)} y2={labelY[i]} stroke={PALETTE.muted} strokeWidth={0.6} />
                  <text x={xR + 10} y={labelY[i] + 3.5} fontSize={10.5} fill={PALETTE.fg} fontFamily="Geist, sans-serif">
                    {l.label}
                    <tspan fill={PALETTE.muted} fontFamily="Geist Mono, monospace">
                      {' '}
                      {l.E.toFixed(2).replace('.', ',').replace('-', '−')}
                    </tspan>
                    {l.sub && <tspan fill={PALETTE.muted}> · {l.sub}</tspan>}
                  </text>
                </g>
              )
            })}
            {/* zone d'ionisation */}
            <rect x={xL} y={top - 14} width={xR - xL} height={Y(0) - (top - 14)} fill={PALETTE.grid} opacity={0.4} />
            <text x={xL + 4} y={top - 4} fontSize={9} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
              E &gt; 0 : électron libre (continuum)
            </text>
            {/* transition */}
            {trans && (
              <g>
                <line x1={tx} x2={tx} y1={yF} y2={yT + (emission ? -7 : 7)} stroke={photonColor} strokeWidth={2.2} />
                <path d={emission ? `M${tx - 6},${yT - 9} L${tx},${yT} L${tx + 6},${yT - 9}` : `M${tx - 6},${yT + 9} L${tx},${yT} L${tx + 6},${yT + 9}`} fill={photonColor} stroke={photonColor} />
                {/* photon */}
                {emission ? (
                  <g opacity={anim > 0.4 ? 1 : 0}>
                    <path d={wave(tx + 8, (yF + yT) / 2, 20 + 50 * Math.max(0, anim - 0.4) / 0.6, 1)} fill="none" stroke={photonColor} strokeWidth={2} />
                  </g>
                ) : (
                  <g opacity={anim < 0.75 ? 1 : 0.25}>
                    <path d={wave(tx - 8 - 60 * (1 - Math.min(1, anim * 1.3)), (yF + yT) / 2, 50, -1)} fill="none" stroke={photonColor} strokeWidth={2} />
                  </g>
                )}
                <text x={tx + 10} y={(yF + yT) / 2 - 10} fontSize={11} fontWeight={600} fill={PALETTE.fg} fontFamily="Geist, sans-serif">
                  {Number.isFinite(lam) ? `λ = ${fmtSig(lam, lam >= 1000 ? 4 : 3)} nm` : ''}
                </text>
              </g>
            )}
            {/* électron */}
            <circle cx={tx - 30} cy={trans ? ePos : Y(A.levels[cur].E)} r={5.5} fill={PALETTE.blue} stroke="hsl(var(--background))" strokeWidth={1.5} />
            <text x={tx - 42} y={(trans ? ePos : Y(A.levels[cur].E)) + 4} textAnchor="end" fontSize={10} fill={PALETTE.blue} fontFamily="Geist, sans-serif">
              e⁻
            </text>
          </svg>

          <div className="flex flex-col gap-2">
            {trans ? (
              <>
                <div className={cn('border p-3 text-sm', emission ? 'bg-muted/20' : 'bg-muted/20')}>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{ionisation ? 'Ionisation' : trans.from === ion ? 'Recombinaison (capture d’un électron libre)' : emission ? 'Émission d’un photon' : 'Absorption d’un photon'}</div>
                  <div className="mt-1">
                    {A.levels[trans.from].label} → {A.levels[trans.to].label}
                  </div>
                  {!observed && (
                    <div className="mt-1 text-xs text-warning">
                      Transition très peu probable (interdite par des règles de sélection hors programme) : raie non observée en pratique.
                    </div>
                  )}
                  {ionisation && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      Énergie d’ionisation depuis ce niveau : {fmtSig(dE, 3)} eV ; tout photon d’énergie supérieure peut ioniser l’atome (l’excédent devient énergie cinétique de
                      l’électron).
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Stat label="E départ" value={`${A.levels[trans.from].E.toFixed(2).replace('.', ',').replace('-', '−')} eV`} />
                  <Stat label="E arrivée" value={`${A.levels[trans.to].E.toFixed(2).replace('.', ',').replace('-', '−')} eV`} />
                  <Stat label="|ΔE| photon" value={`${fmtSig(dE, 3)} eV = ${sci(dEJ, 3)} J`} tone="info" className="col-span-2" />
                  <Stat label="Fréquence ν" value={`${sci(nu, 3)} Hz`} />
                  <Stat
                    label="Longueur d’onde λ"
                    value={
                      <span className="flex items-center gap-1.5">
                        <span className="inline-block size-3 border" style={{ background: wavelengthDomain(lam) === 'visible' ? wavelengthCss(lam) : 'transparent' }} />
                        {fmtSig(lam, lam >= 1000 ? 4 : 3)} nm
                      </span>
                    }
                    tone={wavelengthDomain(lam) === 'visible' ? undefined : 'warning'}
                  />
                </div>
                <div className="border bg-background px-2 py-1 text-center text-sm">
                  Domaine : <strong>{wavelengthDomain(lam) === 'visible' ? `visible (${wavelengthName(lam)})` : wavelengthName(lam)}</strong>
                </div>
                <div className="overflow-x-auto border bg-background px-2 py-1">
                  <Tex display>{`\\lambda = \\frac{hc}{|\\Delta E|} = \\frac{6{,}63\\times10^{-34}\\times 3{,}00\\times10^{8}}{${sciTex(dEJ, 3)}} = ${sciTex(lam * 1e-9, 3)}\\ \\text{m}`}</Tex>
                </div>
              </>
            ) : (
              <div className="border bg-muted/20 p-3 text-sm text-muted-foreground">
                L’électron est dans l’état fondamental (niveau d’énergie le plus bas, état stable). Cliquez sur un niveau supérieur : l’atome doit absorber un photon d’énergie
                exactement égale à l’écart entre les niveaux.
              </div>
            )}
            {a === 'hydrogene' && (
              <div className="border bg-muted/20 px-2 py-1 text-center text-xs">
                <Tex>{String.raw`E_n = -\frac{13{,}6}{n^2}\ \text{eV}\qquad 1\ \text{eV} = 1{,}602\times10^{-19}\ \text{J}`}</Tex>
              </div>
            )}
          </div>
        </div>

        <Spectrum lines={allLines} view={view} selected={trans && !ionisation ? lam : null} />
        <p className="text-xs text-muted-foreground">
          {view === 'emission'
            ? 'Spectre d’émission : raies brillantes sur fond noir, aux longueurs d’onde des photons émis lors des désexcitations.'
            : 'Spectre d’absorption : raies noires sur le spectre continu de la lumière blanche, aux mêmes longueurs d’onde que les raies d’émission.'}{' '}
          {Number.isFinite(lam) && trans && wavelengthDomain(lam) !== 'visible' && !ionisation && (
            <span className="text-warning">La raie sélectionnée ({fmtSig(lam, lam >= 1000 ? 4 : 3)} nm) est hors du visible ({wavelengthDomain(lam)}).</span>
          )}
          {' '}Valeur utilisée : <Tex>{`hc = ${texSig(PHYS.hc_eVnm, 5)}\\ \\text{eV·nm}`}</Tex>.
        </p>
      </div>
    </WidgetFrame>
  )
}

function Spectrum({ lines, view, selected }: { lines: { lam: number }[]; view: 'emission' | 'absorption'; selected: number | null }) {
  const W = 600
  const H = 64
  const l0 = 380
  const l1 = 780
  const X = (l: number) => 10 + ((l - l0) / (l1 - l0)) * (W - 20)
  const vis = lines.filter((l) => l.lam >= l0 && l.lam <= l1)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full border bg-background" role="img" aria-label="Spectre de raies">
      <defs>
        <linearGradient id="el-rainbow" x1="0" x2="1">
          {Array.from({ length: 41 }, (_, i) => {
            const l = l0 + ((l1 - l0) * i) / 40
            const c = wavelengthRGB(l)
            return <stop key={i} offset={`${(i / 40) * 100}%`} stopColor={c ? rgbCss(c) : '#000'} />
          })}
        </linearGradient>
      </defs>
      <rect x={10} y={8} width={W - 20} height={34} fill={view === 'emission' ? '#000' : 'url(#el-rainbow)'} />
      {vis.map((l, i) => (
        <rect key={i} x={X(l.lam) - 1.5} y={8} width={3} height={34} fill={view === 'emission' ? wavelengthCss(l.lam) : '#000'} />
      ))}
      {selected !== null && selected >= l0 && selected <= l1 && (
        <path d={`M${X(selected) - 5},${50} L${X(selected)},${44} L${X(selected) + 5},${50} Z`} fill={PALETTE.fg} />
      )}
      {selected !== null && selected < l0 && (
        <text x={12} y={56} fontSize={10} fill={PALETTE.fg} fontFamily="Geist, sans-serif">
          ◂ UV : {fmtSig(selected, 3)} nm
        </text>
      )}
      {selected !== null && selected > l1 && (
        <text x={W - 12} y={56} fontSize={10} textAnchor="end" fill={PALETTE.fg} fontFamily="Geist, sans-serif">
          IR : {fmtSig(selected, selected >= 1000 ? 4 : 3)} nm ▸
        </text>
      )}
      {[400, 500, 600, 700].map((t) => (
        <text key={t} x={X(t)} y={H - 4} textAnchor="middle" fontSize={9} fill={PALETTE.muted} fontFamily="Geist Mono, monospace">
          {t} nm
        </text>
      ))}
    </svg>
  )
}
