import { useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Tex } from '@/components/Tex'
import { Button } from '@/components/ui/button'
import { Stat, Switch } from '@/components/ui/misc'
import { Badge } from '@/components/ui/badge'
import { PALETTE } from '@/lib/plot'
import { cn, fmt } from '@/lib/utils'
import { formulaTex } from './_chimie/chem'
import { CONFIG, EN, MOLECULES, VALENCE, Z, findMolecule, type El, type Mol, type V3 } from './_chimie/molecules'

interface Props {
  /** formule de la molécule initiale (ex. 'H2O', 'CO2', 'NH3', 'CH4', 'HCl', 'O2', 'N2', 'C2H4', 'CH3OH', 'H2O2', 'HCN') */
  molecule?: string
}

const EL_COLOR: Record<El, string> = {
  H: 'hsl(220 9% 88%)',
  C: 'hsl(220 9% 32%)',
  N: PALETTE.blue,
  O: PALETTE.red,
  Cl: PALETTE.green,
}
const EL_TEXT: Record<El, string> = {
  H: PALETTE.fg,
  C: PALETTE.fg,
  N: PALETTE.blue,
  O: PALETTE.red,
  Cl: PALETTE.green,
}
const RADIUS: Record<El, number> = { H: 0.27, C: 0.38, N: 0.37, O: 0.36, Cl: 0.5 }
const POLAR_THRESHOLD = 0.4

// ---------------------------------------------------------------------------
// Analyse de la molécule
// ---------------------------------------------------------------------------

function analyse(m: Mol) {
  const bondCount = m.atoms.map(() => 0)
  const nb = m.atoms.map(() => [] as number[])
  for (const [a, b, o] of m.bonds) {
    bondCount[a] += o
    bondCount[b] += o
    nb[a].push(b)
    nb[b].push(a)
  }
  const lpCount = m.atoms.map((a) => a.lp?.length ?? 0)
  const charge = m.atoms.reduce((s, a) => s + (a.charge ?? 0), 0)
  const valence = m.atoms.reduce((s, a) => s + VALENCE[a.el], 0) - charge
  const bonding = m.bonds.reduce((s, b) => s + b[2], 0)
  const lone = lpCount.reduce((s, x) => s + x, 0)
  // charges partielles : pour chaque liaison polarisée (Δχ ≥ 0,4)
  const q = m.atoms.map(() => 0)
  const polarBonds: { a: number; b: number; d: number }[] = []
  for (const [a, b] of m.bonds) {
    const d = EN[m.atoms[a].el] - EN[m.atoms[b].el]
    if (Math.abs(d) >= POLAR_THRESHOLD) {
      q[a] -= d
      q[b] += d
      polarBonds.push({ a, b, d: Math.abs(d) })
    }
  }
  // barycentres G+ et G− (3D)
  const c = centroid(m.xyz)
  const xyz = m.xyz.map((p) => sub(p, c))
  let wp = 0, wm = 0
  let gp: V3 = [0, 0, 0], gm: V3 = [0, 0, 0]
  q.forEach((qi, i) => {
    if (qi > 1e-9) {
      wp += qi
      gp = add(gp, scale(xyz[i], qi))
    } else if (qi < -1e-9) {
      wm += -qi
      gm = add(gm, scale(xyz[i], -qi))
    }
  })
  const Gp = wp > 0 ? scale(gp, 1 / wp) : null
  const Gm = wm > 0 ? scale(gm, 1 / wm) : null
  const sep = Gp && Gm ? norm(sub(Gp, Gm)) : 0
  const polar = sep > 0.02
  return { bondCount, nb, lpCount, valence, bonding, lone, q, polarBonds, Gp, Gm, polar, charge, xyz }
}

// ---------------------------------------------------------------------------
// Vecteurs
// ---------------------------------------------------------------------------
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
const scale = (a: V3, k: number): V3 => [a[0] * k, a[1] * k, a[2] * k]
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
const norm = (a: V3) => Math.sqrt(dot(a, a))
const unit = (a: V3): V3 => {
  const n = norm(a)
  return n < 1e-12 ? [0, 0, 0] : scale(a, 1 / n)
}
const centroid = (ps: V3[]): V3 => scale(ps.reduce((s, p) => add(s, p), [0, 0, 0] as V3), 1 / ps.length)

/** Directions 3D des doublets non liants des atomes centraux (≥ 2 voisins) */
function lonePairDirs(m: Mol, nb: number[][], xyz: V3[]): { atom: number; dir: V3 }[] {
  const out: { atom: number; dir: V3 }[] = []
  m.atoms.forEach((a, i) => {
    const k = a.lp?.length ?? 0
    if (!k || nb[i].length < 2) return
    const us = nb[i].map((j) => unit(sub(xyz[j], xyz[i])))
    const s = unit(scale(us.reduce((acc, u) => add(acc, u), [0, 0, 0] as V3), -1))
    if (k === 1) out.push({ atom: i, dir: s })
    else if (k === 2 && us.length === 2) {
      const n = unit(cross(us[0], us[1]))
      const h = 54.75 * (Math.PI / 180)
      out.push({ atom: i, dir: add(scale(s, Math.cos(h)), scale(n, Math.sin(h))) })
      out.push({ atom: i, dir: add(scale(s, Math.cos(h)), scale(n, -Math.sin(h))) })
    }
  })
  return out
}

// ---------------------------------------------------------------------------
// Composant
// ---------------------------------------------------------------------------

export default function LewisMolecules({ molecule }: Props) {
  const [id, setId] = useState(() => (findMolecule(molecule) ?? MOLECULES.find((m) => m.id === 'H2O')!).id)
  useEffect(() => {
    const f = findMolecule(molecule)
    if (f) setId(f.id)
  }, [molecule])
  const mol = MOLECULES.find((m) => m.id === id)!
  const info = useMemo(() => analyse(mol), [mol])

  const [showLp, setShowLp] = useState(true)
  const [showDelta, setShowDelta] = useState(false)
  const [showG, setShowG] = useState(true)
  const [showLp3d, setShowLp3d] = useState(true)

  // rotation 3D
  const [rot, setRot] = useState<{ yaw: number; pitch: number }>({ yaw: 0.6, pitch: 0.35 })
  const [spin, setSpin] = useState(true)
  const drag = useRef<{ x: number; y: number } | null>(null)
  useEffect(() => {
    if (!spin) return
    let raf = 0
    let last: number | undefined
    const tick = (t: number) => {
      const dt = last === undefined ? 0 : (t - last) / 1000
      last = t
      setRot((r) => ({ ...r, yaw: r.yaw + dt * 0.6 }))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [spin])

  // éléments présents (hors H si on veut) pour le récapitulatif
  const elements = Array.from(new Set(mol.atoms.map((a) => a.el)))

  const controls = (
    <>
      <div>
        <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Molécule / ion</div>
        <div className="grid grid-cols-4 gap-1">
          {MOLECULES.map((m) => (
            <button
              key={m.id}
              onClick={() => setId(m.id)}
              title={m.name}
              className={cn('border px-1 py-1 text-xs transition-colors', m.id === id ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent')}
            >
              <Tex>{formulaTex(m.formula)}</Tex>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Switch checked={showLp} onChange={setShowLp} label="Doublets non liants (Lewis)" />
        <Switch checked={showDelta} onChange={setShowDelta} label="Charges partielles δ" />
        <Switch checked={showLp3d} onChange={setShowLp3d} label="Doublets non liants (3D)" />
        <Switch checked={showG} onChange={setShowG} label="Barycentres G⁺ et G⁻" />
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setSpin((s) => !s)}>
          {spin ? <Pause /> : <Play />}
          {spin ? 'Arrêter' : 'Tourner'}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setRot({ yaw: 0.6, pitch: 0.35 })}>
          <RotateCcw /> Vue
        </Button>
      </div>
      <div className="border bg-background p-2 text-[11px] text-muted-foreground">
        Électronégativités (Pauling) :{' '}
        {(['H', 'C', 'N', 'O', 'Cl'] as El[]).map((e) => (
          <span key={e} className={cn('mr-1.5 font-mono', elements.includes(e) && 'font-semibold text-foreground')}>
            {e} {fmt(EN[e], 2)}
          </span>
        ))}
        <div className="mt-1">Liaison polarisée si Δχ ≥ 0,4.</div>
      </div>
    </>
  )

  return (
    <WidgetFrame
      title="Schémas de Lewis et géométrie des molécules"
      subtitle={`${mol.name} — ${mol.geometry}`}
      controls={controls}
      footer={<span>{mol.note}</span>}
    >
      <div className="flex flex-col gap-3">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-col">
            <div className="flex items-center justify-between border border-b-0 bg-muted/30 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              <span>Schéma de Lewis</span>
              <span className="normal-case tracking-normal">
                <Tex>{formulaTex(mol.formula)}</Tex>
              </span>
            </div>
            <LewisSvg mol={mol} info={info} showLp={showLp} showDelta={showDelta} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between border border-b-0 bg-muted/30 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              <span>Géométrie 3D</span>
              <span className="normal-case tracking-normal">faire glisser pour tourner</span>
            </div>
            <div
              className="touch-none select-none"
              onPointerDown={(e) => {
                ;(e.currentTarget as Element).setPointerCapture?.(e.pointerId)
                drag.current = { x: e.clientX, y: e.clientY }
                setSpin(false)
              }}
              onPointerMove={(e) => {
                if (!drag.current) return
                const dx = e.clientX - drag.current.x
                const dy = e.clientY - drag.current.y
                drag.current = { x: e.clientX, y: e.clientY }
                setRot((r) => ({ yaw: r.yaw + dx * 0.012, pitch: Math.max(-1.5, Math.min(1.5, r.pitch + dy * 0.012)) }))
              }}
              onPointerUp={() => (drag.current = null)}
              onPointerCancel={() => (drag.current = null)}
            >
              <Molecule3D mol={mol} info={info} yaw={rot.yaw} pitch={rot.pitch} showLp={showLp3d} showG={showG} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Électrons de valence" value={`${info.valence} e⁻ → ${info.valence / 2} doublets`} />
          <Stat label="Doublets liants" value={info.bonding} tone="info" />
          <Stat label="Doublets non liants" value={info.lone} />
          <Stat
            label="Polarité"
            value={mol.ion ? 'ion (chargé)' : info.polar ? 'polaire' : 'apolaire'}
            tone={mol.ion ? 'warning' : info.polar ? 'destructive' : 'success'}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-col gap-2 border bg-muted/20 p-3 text-sm">
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Géométrie</div>
            <div>
              <strong className="capitalize">{mol.geometry}</strong>
              {mol.vsepr && (
                <span className="ml-2 text-xs text-muted-foreground">
                  (<Tex>{`\\mathrm{${mol.vsepr}}`}</Tex>)
                </span>
              )}
            </div>
            {mol.central && <div className="text-xs text-muted-foreground">{mol.central}</div>}
            <div className="flex flex-wrap gap-1.5">
              {mol.angles.map((a) => (
                <Badge key={a} variant="outline" className="normal-case">
                  {a}
                </Badge>
              ))}
            </div>
            <div className="text-xs">
              {mol.ion ? (
                <>Ion de charge {info.charge > 0 ? '+' : '−'}e : la notion de molécule polaire ne s’applique pas.</>
              ) : info.polarBonds.length === 0 ? (
                <>Aucune liaison polarisée (Δχ &lt; 0,4) : molécule apolaire.</>
              ) : info.polar ? (
                <>Liaisons polarisées et G⁺ ≠ G⁻ : la molécule est <strong>polaire</strong>.</>
              ) : (
                <>Liaisons polarisées mais G⁺ et G⁻ confondus (symétrie) : la molécule est <strong>apolaire</strong>.</>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1.5 border bg-muted/20 p-3 text-xs">
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Atomes et règles du duet / de l’octet</div>
            {elements.map((e) => {
              const idx = mol.atoms.map((a, i) => (a.el === e ? i : -1)).filter((i) => i >= 0)
              const i0 = idx[0]
              const a0 = mol.atoms[i0]
              const around = 2 * (info.bondCount[i0] + info.lpCount[i0])
              return (
                <div key={e} className="flex flex-wrap items-baseline gap-x-2">
                  <span className="w-6 font-mono font-semibold" style={{ color: EL_TEXT[e] }}>
                    {e}
                  </span>
                  <span className="text-muted-foreground">
                    Z = {Z[e]}, <Tex>{CONFIG[e]}</Tex> : {VALENCE[e]} e⁻ de valence
                  </span>
                  <span>
                    → {info.bondCount[i0]} liaison{info.bondCount[i0] > 1 ? 's' : ''}, {info.lpCount[i0]} doublet{info.lpCount[i0] > 1 ? 's' : ''} non liant
                    {info.lpCount[i0] > 1 ? 's' : ''}
                    {a0.charge ? ' (porte la charge ⊕)' : ''} ·{' '}
                    <span className={around === (e === 'H' ? 2 : 8) ? 'text-success' : 'text-destructive'}>
                      {around} e⁻ {e === 'H' ? '(duet)' : '(octet)'} ✓
                    </span>
                  </span>
                </div>
              )
            })}
            {info.polarBonds.length > 0 && (
              <div className="mt-1 text-muted-foreground">
                Liaisons polarisées :{' '}
                {Array.from(new Set(info.polarBonds.map((p) => `${mol.atoms[p.a].el}–${mol.atoms[p.b].el} (Δχ = ${fmt(p.d, 2)})`))).join(' ; ')}
              </div>
            )}
          </div>
        </div>
      </div>
    </WidgetFrame>
  )
}

// ---------------------------------------------------------------------------
// Schéma de Lewis (2D)
// ---------------------------------------------------------------------------

function LewisSvg({ mol, info, showLp, showDelta }: { mol: Mol; info: ReturnType<typeof analyse>; showLp: boolean; showDelta: boolean }) {
  const xs = mol.atoms.map((a) => a.x)
  const ys = mol.atoms.map((a) => a.y)
  const span = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys), 1)
  const W = 360
  const H = 260
  const L = Math.min(72, 250 / (span + 1.2))
  const cx = (Math.max(...xs) + Math.min(...xs)) / 2
  const cy = (Math.max(...ys) + Math.min(...ys)) / 2
  const X = (x: number) => W / 2 + (x - cx) * L
  const Y = (y: number) => H / 2 - (y - cy) * L
  const rAtom = L * 0.2
  const lpDist = L * 0.33
  const lpLen = L * 0.24

  // directions occupées autour de chaque atome (pour placer les δ)
  const occupied = mol.atoms.map((a, i) => {
    const angs: number[] = [...(a.lp ?? [])]
    info.nb[i].forEach((j) => angs.push((Math.atan2(mol.atoms[j].y - a.y, mol.atoms[j].x - a.x) * 180) / Math.PI))
    return angs
  })
  const freeAngle = (i: number) => {
    let best = 45
    let bestD = -1
    for (let t = 0; t < 360; t += 15) {
      const d = Math.min(360, ...occupied[i].map((o) => Math.abs((((t - o) % 360) + 540) % 360 - 180)))
      // préférer le haut à égalité
      const score = d + (Math.sin((t * Math.PI) / 180) > 0 ? 0.5 : 0)
      if (score > bestD) {
        bestD = score
        best = t
      }
    }
    return best
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full border bg-background" role="img" aria-label={`Schéma de Lewis de ${mol.name}`}>
      {/* liaisons */}
      {mol.bonds.map(([a, b, o], k) => {
        const A = mol.atoms[a]
        const B = mol.atoms[b]
        const x1 = X(A.x), y1 = Y(A.y), x2 = X(B.x), y2 = Y(B.y)
        const len = Math.hypot(x2 - x1, y2 - y1)
        const ux = (x2 - x1) / len, uy = (y2 - y1) / len
        const px = -uy, py = ux
        const offs = o === 1 ? [0] : o === 2 ? [-3.5, 3.5] : [-5.5, 0, 5.5]
        const s = rAtom + 2
        return (
          <g key={k} stroke={PALETTE.fg} strokeWidth={2} strokeLinecap="square">
            {offs.map((d) => (
              <line key={d} x1={x1 + ux * s + px * d} y1={y1 + uy * s + py * d} x2={x2 - ux * s + px * d} y2={y2 - uy * s + py * d} />
            ))}
          </g>
        )
      })}
      {/* doublets non liants : tirets (convention française) */}
      {showLp &&
        mol.atoms.map((a, i) =>
          (a.lp ?? []).map((ang, k) => {
            const t = (ang * Math.PI) / 180
            const cx0 = X(a.x) + Math.cos(t) * lpDist
            const cy0 = Y(a.y) - Math.sin(t) * lpDist
            const px = -Math.sin(t), py = -Math.cos(t)
            return (
              <line
                key={`${i}-${k}`}
                x1={cx0 - (px * lpLen) / 2}
                y1={cy0 + (py * lpLen) / 2}
                x2={cx0 + (px * lpLen) / 2}
                y2={cy0 - (py * lpLen) / 2}
                stroke={PALETTE.violet}
                strokeWidth={2.4}
              />
            )
          }),
        )}
      {/* atomes */}
      {mol.atoms.map((a, i) => (
        <g key={i}>
          <text
            x={X(a.x)}
            y={Y(a.y) + 6}
            textAnchor="middle"
            fontSize={a.el === 'Cl' ? 18 : 19}
            fontWeight={600}
            fill={EL_TEXT[a.el]}
            fontFamily="Geist, sans-serif"
          >
            {a.el}
          </text>
          {a.charge && (
            <g transform={`translate(${X(a.x) + rAtom + 7},${Y(a.y) - rAtom - 7})`}>
              <circle r={7} fill="none" stroke={PALETTE.fg} strokeWidth={1.2} />
              <line x1={-4} x2={4} y1={0} y2={0} stroke={PALETTE.fg} strokeWidth={1.4} />
              {a.charge > 0 && <line x1={0} x2={0} y1={-4} y2={4} stroke={PALETTE.fg} strokeWidth={1.4} />}
            </g>
          )}
          {showDelta && Math.abs(info.q[i]) > 1e-9 && !mol.ion && (
            <text
              x={X(a.x) + Math.cos((freeAngle(i) * Math.PI) / 180) * L * 0.42}
              y={Y(a.y) - Math.sin((freeAngle(i) * Math.PI) / 180) * L * 0.42 + 4}
              textAnchor="middle"
              fontSize={12}
              fontStyle="italic"
              fontWeight={600}
              fill={info.q[i] > 0 ? PALETTE.orange : PALETTE.blue}
              fontFamily="Geist, sans-serif"
            >
              {info.q[i] > 0 ? 'δ+' : 'δ−'}
            </text>
          )}
        </g>
      ))}
      <text x={8} y={H - 8} fontSize={10} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
        — liaison (doublet liant)
      </text>
      {showLp && (
        <text x={W - 8} y={H - 8} fontSize={10} textAnchor="end" fill={PALETTE.violet} fontFamily="Geist, sans-serif">
          ▬ doublet non liant
        </text>
      )}
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Vue 3D (boules et bâtonnets, projection orthographique)
// ---------------------------------------------------------------------------

function Molecule3D({
  mol,
  info,
  yaw,
  pitch,
  showLp,
  showG,
}: {
  mol: Mol
  info: ReturnType<typeof analyse>
  yaw: number
  pitch: number
  showLp: boolean
  showG: boolean
}) {
  const W = 360
  const H = 260
  const xyz = info.xyz
  const ext = Math.max(...xyz.map((p) => norm(p)), 0.8) + 0.6
  const S = Math.min(W, H) / 2 / ext
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch)
  const R = (p: V3): V3 => {
    // rotation autour de y puis autour de x
    const x1 = cy * p[0] + sy * p[2]
    const z1 = -sy * p[0] + cy * p[2]
    const y2 = cp * p[1] - sp * z1
    const z2 = sp * p[1] + cp * z1
    return [x1, y2, z2]
  }
  const P = (p: V3) => [W / 2 + p[0] * S, H / 2 - p[1] * S] as const
  const rp = xyz.map(R)
  const lps = showLp ? lonePairDirs(mol, info.nb, xyz) : []

  type Item = { z: number; el: React.ReactNode }
  const items: Item[] = []

  mol.bonds.forEach(([a, b, o], k) => {
    const A = rp[a], B = rp[b]
    const [x1, y1] = P(A)
    const [x2, y2] = P(B)
    const len = Math.hypot(x2 - x1, y2 - y1) || 1
    const px = -(y2 - y1) / len, py = (x2 - x1) / len
    const offs = o === 1 ? [0] : o === 2 ? [-4, 4] : [-6, 0, 6]
    const w = o === 1 ? 6 : 3.5
    // demi-liaisons colorées
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
    items.push({
      z: (A[2] + B[2]) / 2 - 0.01,
      el: (
        <g key={'b' + k} strokeLinecap="butt">
          {offs.map((d) => (
            <g key={d}>
              <line x1={x1 + px * d} y1={y1 + py * d} x2={mx + px * d} y2={my + py * d} stroke={EL_COLOR[mol.atoms[a].el]} strokeWidth={w} />
              <line x1={mx + px * d} y1={my + py * d} x2={x2 + px * d} y2={y2 + py * d} stroke={EL_COLOR[mol.atoms[b].el]} strokeWidth={w} />
              <line x1={x1 + px * d} y1={y1 + py * d} x2={x2 + px * d} y2={y2 + py * d} stroke={PALETTE.fg} strokeOpacity={0.25} strokeWidth={0.8} />
            </g>
          ))}
        </g>
      ),
    })
  })

  lps.forEach((lp, k) => {
    const d = R(lp.dir)
    const c = add(rp[lp.atom], scale(d, 0.62))
    const [X, Y] = P(c)
    const ang = (Math.atan2(-d[1], d[0]) * 180) / Math.PI
    const proj = Math.hypot(d[0], d[1])
    const rx = (0.14 + 0.3 * proj) * S
    const ry = 0.2 * S
    items.push({
      z: c[2],
      el: (
        <g key={'lp' + k} transform={`translate(${X},${Y}) rotate(${ang})`}>
          <ellipse rx={rx} ry={ry} fill={PALETTE.violet} fillOpacity={0.28} stroke={PALETTE.violet} strokeOpacity={0.7} />
          <circle cx={rx * 0.25} cy={-ry * 0.35} r={2.2} fill={PALETTE.violet} />
          <circle cx={rx * 0.25} cy={ry * 0.35} r={2.2} fill={PALETTE.violet} />
        </g>
      ),
    })
  })

  rp.forEach((p, i) => {
    const el = mol.atoms[i].el
    const [X, Y] = P(p)
    const r = RADIUS[el] * S
    items.push({
      z: p[2],
      el: (
        <g key={'a' + i}>
          <circle cx={X} cy={Y} r={r} fill={`url(#lw-g-${el})`} stroke={PALETTE.fg} strokeOpacity={0.35} strokeWidth={1} />
          <text x={X} y={Y + 4} textAnchor="middle" fontSize={Math.max(9, r * 0.75)} fontWeight={600} fill={el === 'H' ? '#1f2937' : '#fff'} fontFamily="Geist, sans-serif">
            {el}
          </text>
        </g>
      ),
    })
  })
  items.sort((a, b) => a.z - b.z)

  const G = (g: V3 | null, label: string, color: string) => {
    if (!g) return null
    const [X, Y] = P(R(g))
    return (
      <g>
        <line x1={X - 6} x2={X + 6} y1={Y - 6} y2={Y + 6} stroke={color} strokeWidth={2} />
        <line x1={X - 6} x2={X + 6} y1={Y + 6} y2={Y - 6} stroke={color} strokeWidth={2} />
        <text x={X + 8} y={label === 'G⁺' ? Y - 6 : Y + 14} fontSize={11} fontWeight={700} fill={color} fontFamily="Geist, sans-serif">
          {label}
        </text>
      </g>
    )
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full cursor-grab border bg-background active:cursor-grabbing" role="img" aria-label={`Modèle 3D de ${mol.name}`}>
      <defs>
        {(Object.keys(EL_COLOR) as El[]).map((e) => (
          <radialGradient key={e} id={`lw-g-${e}`} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#fff" stopOpacity={0.85} />
            <stop offset="35%" stopColor={EL_COLOR[e]} />
            <stop offset="100%" stopColor={EL_COLOR[e]} stopOpacity={0.85} />
          </radialGradient>
        ))}
      </defs>
      {items.map((it) => it.el)}
      {showG && !mol.ion && (
        <>
          {G(info.Gp, 'G⁺', PALETTE.orange)}
          {G(info.Gm, 'G⁻', PALETTE.blue)}
        </>
      )}
      <text x={8} y={H - 8} fontSize={10} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
        {mol.angles.join(' · ')}
      </text>
    </svg>
  )
}
