import { useMemo, useState } from 'react'
import { Dices, Eye } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Tex } from '@/components/Tex'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Segmented } from '@/components/ui/tabs'
import { Stat, Switch } from '@/components/ui/misc'
import { Badge } from '@/components/ui/badge'
import { PALETTE } from '@/lib/plot'
import { cn } from '@/lib/utils'

type Family = 'alcane' | 'alcool' | 'aldehyde' | 'cetone' | 'acide'

interface Props {
  family?: Family
  /** nombre d'atomes de carbone de la chaîne principale */
  n?: number
}

const PREFIX = ['', 'méth', 'éth', 'prop', 'but', 'pent', 'hex']

const FAMILIES: Record<Family, { label: string; group: string; groupName: string; tex: string; suffix: string; min: number; color: string }> = {
  alcane: { label: 'Alcane', group: '—', groupName: 'aucun (C et H seulement)', tex: '\\mathrm{C_nH_{2n+2}}', suffix: '-ane', min: 1, color: PALETTE.muted },
  alcool: { label: 'Alcool', group: '–OH', groupName: 'hydroxyle', tex: '\\mathrm{-\\overset{|}{\\underset{|}{C}}-OH}', suffix: '-ol', min: 1, color: PALETTE.blue },
  aldehyde: { label: 'Aldéhyde', group: '–CHO', groupName: 'carbonyle (en bout de chaîne)', tex: '\\mathrm{-C\\overset{\\Large O}{\\diagup\\!\\!\\!\\!\\diagdown}H}', suffix: '-al', min: 1, color: PALETTE.orange },
  cetone: { label: 'Cétone', group: 'C=O', groupName: 'carbonyle (dans la chaîne)', tex: '\\mathrm{C-\\underset{\\| \\atop O}{C}-C}', suffix: '-one', min: 3, color: PALETTE.violet },
  acide: { label: 'Acide carboxylique', group: '–COOH', groupName: 'carboxyle', tex: '\\mathrm{-C\\overset{O}{\\lessgtr}OH}', suffix: 'acide …-oïque', min: 1, color: PALETTE.red },
}

const GROUP_TEX: Record<Family, string> = {
  alcane: '\\mathrm{C-H,\\ C-C}',
  alcool: '\\mathrm{C-OH}',
  aldehyde: '\\mathrm{-CH{=}O}',
  cetone: '\\mathrm{C-CO-C}',
  acide: '\\mathrm{-CO-OH}',
}

interface Mol {
  family: Family
  n: number
  g: number // position du groupe (1..n), 0 si alcane
  m: number // position du méthyle (0 = aucun)
}

/** Renumérotation : indice le plus bas au groupe caractéristique, puis au substituant */
function canonical(mol: Mol): Mol {
  const { family, n, g, m } = mol
  if (family === 'aldehyde' || family === 'acide') return mol
  const alt = { ...mol, g: g ? n + 1 - g : 0, m: m ? n + 1 - m : 0 }
  if (family === 'alcane') return alt.m && alt.m < m ? alt : mol
  if (alt.g < g) return alt
  if (alt.g === g && alt.m && m && alt.m < m) return alt
  return mol
}

function nameOf(mol0: Mol): string {
  const mol = canonical(mol0)
  const { family, n, g, m } = mol
  const p = PREFIX[n]
  const sub = m ? `${m}-méthyl` : ''
  switch (family) {
    case 'alcane':
      return `${sub}${p}ane`
    case 'alcool':
      return n <= 2 && !m ? `${p}anol` : `${sub}${p}an-${g}-ol`
    case 'aldehyde':
      return `${sub}${p}anal`
    case 'cetone':
      return (n === 3 || n === 4) && !m ? `${p}anone` : `${sub}${p}an-${g}-one`
    case 'acide':
      return `acide ${sub}${p}anoïque`
  }
}

function brute(mol: Mol): string {
  const c = mol.n + (mol.m ? 1 : 0)
  const h = mol.family === 'alcane' || mol.family === 'alcool' ? 2 * c + 2 : 2 * c
  const o = mol.family === 'alcane' ? 0 : mol.family === 'acide' ? 2 : 1
  const part = (s: string, k: number) => (k === 0 ? '' : k === 1 ? s : `${s}_{${k}}`)
  return `\\mathrm{${part('C', c)}${part('H', h)}${part('O', o)}}`
}

/** Formule semi-développée (LaTeX), chaîne écrite de Cₙ à C₁ */
function semiDev(mol: Mol): string {
  const { family, n, g, m } = mol
  const parts: string[] = []
  for (let i = n; i >= 1; i--) {
    let cNeighbors = (i > 1 ? 1 : 0) + (i < n ? 1 : 0) + (m === i ? 1 : 0)
    let subs = ''
    let core = 'C'
    let oBonds = 0
    if (family === 'alcool' && g === i) {
      oBonds = 1
      if (i === 1 || i === n) {
        // OH en bout : écrit à la suite
      }
    }
    if ((family === 'aldehyde' || family === 'acide') && i === 1) {
      parts.push(family === 'aldehyde' ? (n === 1 ? 'HCHO' : `${m === 1 ? '' : ''}CHO`) : n === 1 ? 'HCOOH' : 'COOH')
      continue
    }
    if (family === 'cetone' && g === i) oBonds = 2
    const hs = 4 - cNeighbors - oBonds
    core += hs === 0 ? '' : hs === 1 ? 'H' : `H_${hs}`
    if (m === i) subs += '(CH_3)'
    if (family === 'alcool' && g === i) {
      if (n === 1) {
        parts.push('CH_3OH')
        continue
      }
      if (i === 1) {
        parts.push(core + subs + '{-}OH')
        continue
      }
      subs += '(OH)'
    }
    if (family === 'cetone' && g === i) core = 'CO'
    if (family === 'alcane' && n === 1) core = 'CH_4'
    parts.push(core + subs)
    cNeighbors = 0
  }
  return `\\mathrm{${parts.join('{-}')}}`
}

// ---------------------------------------------------------------------------
// Spectres IR (schématiques mais réalistes)
// ---------------------------------------------------------------------------

interface IRBand {
  s: number // nombre d'onde (cm⁻¹)
  w: number // largeur
  d: number // profondeur (0–1)
  label?: string
}
function irBands(f: Family): IRBand[] {
  const ch: IRBand[] = [
    { s: 2960, w: 18, d: 0.7, label: 'C–H' },
    { s: 2930, w: 15, d: 0.55 },
    { s: 2875, w: 14, d: 0.45 },
    { s: 1460, w: 14, d: 0.35 },
    { s: 1380, w: 10, d: 0.25 },
  ]
  switch (f) {
    case 'alcane':
      return [...ch, { s: 725, w: 12, d: 0.15 }]
    case 'alcool':
      return [...ch, { s: 3340, w: 120, d: 0.75, label: 'O–H lié' }, { s: 1050, w: 25, d: 0.7, label: 'C–O' }]
    case 'aldehyde':
      return [...ch, { s: 2820, w: 12, d: 0.3 }, { s: 2720, w: 12, d: 0.3, label: 'C–H ald.' }, { s: 1730, w: 18, d: 0.9, label: 'C=O' }]
    case 'cetone':
      return [...ch, { s: 1715, w: 18, d: 0.92, label: 'C=O' }, { s: 1360, w: 12, d: 0.35 }, { s: 1170, w: 18, d: 0.35 }]
    case 'acide':
      return [...ch, { s: 3000, w: 330, d: 0.6, label: 'O–H acide' }, { s: 1710, w: 20, d: 0.92, label: 'C=O' }, { s: 1290, w: 22, d: 0.45 }, { s: 940, w: 25, d: 0.3 }]
  }
}

const IR_TABLE = [
  { bond: 'O–H alcool libre', range: '3580 – 3670', aspect: 'fine, moyenne', fam: ['alcool'] },
  { bond: 'O–H alcool lié', range: '3200 – 3400', aspect: 'forte, large', fam: ['alcool'] },
  { bond: 'O–H acide carboxylique', range: '2500 – 3200', aspect: 'forte, très large', fam: ['acide'] },
  { bond: 'C–H (C tétragonal)', range: '2800 – 3000', aspect: 'forte, multiple', fam: ['alcane', 'alcool', 'aldehyde', 'cetone', 'acide'] },
  { bond: 'C–H aldéhyde', range: '2700 – 2900', aspect: 'moyenne, 2 bandes', fam: ['aldehyde'] },
  { bond: 'C=O aldéhyde, cétone', range: '1650 – 1730', aspect: 'forte, fine', fam: ['aldehyde', 'cetone'] },
  { bond: 'C=O acide carboxylique', range: '1680 – 1710', aspect: 'forte, fine', fam: ['acide'] },
]

function IRSpectrum({ family, labels }: { family: Family; labels: boolean }) {
  const W = 560
  const H = 210
  const l = 36
  const r = 12
  const t = 14
  const b = 30
  const X = (s: number) => l + ((4000 - s) / (4000 - 500)) * (W - l - r)
  const Y = (T: number) => t + (H - t - b) * (1 - T / 100)
  const bands = irBands(family)
  const T = (s: number) => {
    let a = 0
    for (const bd of bands) a += bd.d * Math.exp(-(((s - bd.s) / bd.w) ** 2))
    // petite empreinte digitale
    if (s < 1500) a += 0.06 * (1 + Math.sin(s / 23)) * Math.exp(-(((s - 1000) / 400) ** 2))
    return 100 * Math.max(0.02, 1 - Math.min(0.95, a)) - 3
  }
  let d = ''
  for (let s = 4000; s >= 500; s -= 4) d += `${s === 4000 ? 'M' : 'L'}${X(s).toFixed(1)},${Y(T(s)).toFixed(1)}`
  const ticks = [4000, 3500, 3000, 2500, 2000, 1500, 1000, 500]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full border bg-background" role="img" aria-label="Spectre infrarouge">
      <rect x={X(1500)} y={t} width={X(500) - X(1500)} height={H - t - b} fill={PALETTE.grid} opacity={0.35} />
      <text x={(X(1500) + X(500)) / 2} y={t + 12} textAnchor="middle" fontSize={9} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
        empreinte digitale
      </text>
      {ticks.map((s) => (
        <g key={s}>
          <line x1={X(s)} x2={X(s)} y1={t} y2={H - b} stroke={PALETTE.grid} />
          <text x={X(s)} y={H - b + 13} textAnchor="middle" fontSize={10} fill={PALETTE.muted} fontFamily="Geist Mono, monospace">
            {s}
          </text>
        </g>
      ))}
      {[0, 50, 100].map((v) => (
        <text key={v} x={l - 4} y={Y(v) + 3} textAnchor="end" fontSize={10} fill={PALETTE.muted} fontFamily="Geist Mono, monospace">
          {v}
        </text>
      ))}
      <line x1={l} x2={W - r} y1={H - b} y2={H - b} stroke={PALETTE.fg} />
      <line x1={l} x2={l} y1={t} y2={H - b} stroke={PALETTE.fg} />
      <text x={W - r} y={H - 3} textAnchor="end" fontSize={10} fill={PALETTE.fg} fontFamily="Geist, sans-serif">
        nombre d’onde σ (cm⁻¹)
      </text>
      <text x={l + 4} y={t - 3} fontSize={10} fill={PALETTE.fg} fontFamily="Geist, sans-serif">
        T (%)
      </text>
      <path d={d} fill="none" stroke={PALETTE.blue} strokeWidth={1.6} />
      {labels &&
        bands
          .filter((bd) => bd.label)
          .map((bd) => (
            <g key={bd.label}>
              <text x={X(bd.s)} y={Y(T(bd.s)) + 14} textAnchor="middle" fontSize={10} fontWeight={600} fill={PALETTE.red} fontFamily="Geist, sans-serif">
                {bd.label}
              </text>
            </g>
          ))}
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Formule topologique
// ---------------------------------------------------------------------------

function Skeletal({ mol }: { mol: Mol }) {
  const { family, n, g, m } = mol
  const W = 360
  const H = 170
  const dx = 40
  const dy = 22
  const x0 = W / 2 - ((n - 1) * dx) / 2
  // C1 à droite pour lire « de gauche à droite » Cn … C1
  const pts = Array.from({ length: n }, (_, k) => {
    const i = n - k // numéro du carbone
    return { i, x: x0 + k * dx, y: H / 2 + (k % 2 === 0 ? dy / 2 : -dy / 2) }
  })
  const P = (i: number) => pts.find((p) => p.i === i)!
  const lines: React.ReactNode[] = []
  const labels: React.ReactNode[] = []
  const stroke = PALETTE.fg
  const seg = (x1: number, y1: number, x2: number, y2: number, key: string, double = false) => {
    if (!double) {
      lines.push(<line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={2} />)
      return
    }
    const len = Math.hypot(x2 - x1, y2 - y1)
    const px = (-(y2 - y1) / len) * 3, py = ((x2 - x1) / len) * 3
    lines.push(<line key={key + 'a'} x1={x1 + px} y1={y1 + py} x2={x2 + px} y2={y2 + py} stroke={stroke} strokeWidth={2} />)
    lines.push(<line key={key + 'b'} x1={x1 - px} y1={y1 - py} x2={x2 - px} y2={y2 - py} stroke={stroke} strokeWidth={2} />)
  }
  const atom = (x: number, y: number, t: string, key: string, color = PALETTE.red) => {
    labels.push(
      <g key={key}>
        <rect x={x - 6 * t.length} y={y - 9} width={12 * t.length} height={18} fill="hsl(var(--background))" />
        <text x={x} y={y + 5} textAnchor="middle" fontSize={15} fontWeight={600} fill={color} fontFamily="Geist, sans-serif">
          {t}
        </text>
      </g>,
    )
  }
  for (let k = 0; k < pts.length - 1; k++) seg(pts[k].x, pts[k].y, pts[k + 1].x, pts[k + 1].y, 'c' + k)
  const out = (i: number) => (P(i).y < H / 2 ? -1 : 1) // sens « extérieur » (vers le haut si sommet haut)
  // terminal : prolongement du zigzag
  const ext = (i: number, len = 1) => {
    const p = P(i)
    const isRight = i === 1
    const sx = isRight ? 1 : -1
    // le zigzag alterne : prochain point dans l'autre demi-plan
    const ny = p.y < H / 2 ? p.y + dy : p.y - dy
    return { x: p.x + sx * dx * len, y: n === 1 ? p.y - dy / 2 : ny }
  }
  // méthyle
  const subsAt = (i: number) => {
    const list: string[] = []
    if (m === i) list.push('CH3')
    if (family === 'alcool' && g === i && i !== 1 && !(i === n && n > 1 && false)) list.push('OH')
    if (family === 'cetone' && g === i) list.push('=O')
    return list
  }
  for (const p of pts) {
    let subs = subsAt(p.i)
    // OH en C1 (ou Cn) d'un alcool : prolongement
    if (family === 'alcool' && g === p.i && (p.i === 1 || (n === 1 && p.i === 1))) {
      const e = ext(1)
      seg(p.x, p.y, e.x, e.y, 'oh')
      atom(e.x, e.y, 'OH', 'oh')
      subs = subs.filter((s) => s !== 'OH')
    }
    if (n > 1 && family === 'alcool' && g === p.i && p.i === n) {
      // OH sur Cn (cas non canonique) : non utilisé après renumérotation
    }
    const o = out(p.i)
    const angles = subs.length === 1 ? [0] : [-35, 35]
    subs.forEach((sname, k) => {
      const a = (angles[k] * Math.PI) / 180
      const L = 34
      const x2 = p.x + Math.sin(a) * L
      const y2 = p.y + o * Math.cos(a) * L
      if (sname === 'CH3') seg(p.x, p.y, x2, y2, 'me' + k)
      else if (sname === 'OH') {
        seg(p.x, p.y, x2, y2, 'o' + k)
        atom(x2, y2 + o * 4, 'OH', 'oh' + k)
      } else {
        seg(p.x, p.y, x2, y2, 'co' + k, true)
        atom(x2, y2 + o * 4, 'O', 'o' + k)
      }
    })
  }
  if (family === 'aldehyde' || family === 'acide') {
    const p = P(1)
    const e = ext(1)
    // C1 : =O vers l'extérieur, H (ou OH) en prolongement
    const o = out(1)
    const ox = p.x + (n === 1 ? -20 : 0)
    seg(p.x, p.y, ox, p.y + o * 34, 'c1o', true)
    atom(ox, p.y + o * 38, 'O', 'c1o')
    if (family === 'acide') {
      seg(p.x, p.y, e.x, e.y, 'c1oh')
      atom(e.x, e.y, 'OH', 'c1oh')
    } else {
      seg(p.x, p.y, e.x, e.y, 'c1h')
      atom(e.x, e.y, 'H', 'c1h', PALETTE.fg)
    }
    if (n === 1) {
      const lft = ext(1)
      seg(p.x, p.y, 2 * p.x - lft.x, lft.y, 'c1h2')
      atom(2 * p.x - lft.x, lft.y, 'H', 'c1h2', PALETTE.fg)
    }
  }
  if (n === 1 && family === 'alcane') atom(W / 2, H / 2, 'CH₄', 'ch4', PALETTE.fg)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full border bg-background" role="img" aria-label="Formule topologique">
      {lines}
      {labels}
      {pts.length > 1 &&
        pts.map((p) => (
          <text key={'n' + p.i} x={p.x} y={p.y + (out(p.i) < 0 ? 18 : -10)} textAnchor="middle" fontSize={9} fill={PALETTE.muted} fontFamily="Geist Mono, monospace">
            {p.i}
          </text>
        ))}
    </svg>
  )
}

// ---------------------------------------------------------------------------

export default function OrganicFamilies({ family: f0 = 'alcool', n: n0 = 3 }: Props) {
  const [tab, setTab] = useState<'nom' | 'ir' | 'quiz'>('nom')
  const [family, setFamily] = useState<Family>(FAMILIES[f0] ? f0 : 'alcool')
  const [n, setN] = useState(Math.min(6, Math.max(1, Math.round(n0))))
  const [g, setG] = useState(1)
  const [m, setM] = useState(0)
  const [labels, setLabels] = useState(true)

  const nn = Math.max(n, FAMILIES[family].min)
  const gPos = family === 'alcane' ? 0 : family === 'aldehyde' || family === 'acide' ? 1 : family === 'cetone' ? Math.min(Math.max(2, g), nn - 1) : Math.min(g, nn)
  const mPossible = nn >= 3 ? Array.from({ length: nn - 2 }, (_, k) => k + 2).filter((p) => !(family === 'cetone' && p === gPos)) : []
  const mPos = mPossible.includes(m) ? m : 0
  const mol = canonical({ family, n: nn, g: gPos, m: mPos })
  const name = nameOf(mol)
  const F = FAMILIES[family]

  // quiz IR
  const fams = Object.keys(FAMILIES) as Family[]
  const [qSeed, setQSeed] = useState(2)
  const qFam = fams[(qSeed * 7 + 3) % fams.length]
  const [qAns, setQAns] = useState<Family | null>(null)

  const posOptions = family === 'cetone' ? Array.from({ length: Math.max(0, nn - 2) }, (_, k) => k + 2) : Array.from({ length: nn }, (_, k) => k + 1)

  const controls = (
    <>
      <Segmented
        value={tab}
        onChange={setTab}
        options={[
          { value: 'nom', label: 'Nomenclature' },
          { value: 'ir', label: 'Spectre IR' },
          { value: 'quiz', label: 'Quiz IR' },
        ]}
      />
      {tab !== 'quiz' && (
        <>
          <div>
            <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Famille</div>
            <div className="grid grid-cols-2 gap-1">
              {fams.map((k) => (
                <button
                  key={k}
                  onClick={() => setFamily(k)}
                  className={cn('border px-2 py-1 text-left text-xs transition-colors', family === k ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent')}
                >
                  {FAMILIES[k].label}
                </button>
              ))}
            </div>
          </div>
          <Slider label="Carbones de la chaîne principale" value={nn} min={1} max={6} step={1} digits={0} onChange={(v) => setN(Math.max(v, F.min))} />
          {(family === 'alcool' || family === 'cetone') && nn > 2 && (
            <div>
              <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Position du groupe</div>
              <div className="flex flex-wrap gap-1">
                {posOptions.map((p) => (
                  <button key={p} onClick={() => setG(p)} className={cn('w-8 border py-1 font-mono text-xs', gPos === p ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent')}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
          {mPossible.length > 0 && (
            <div>
              <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Ramification méthyle</div>
              <div className="flex flex-wrap gap-1">
                {[0, ...mPossible].map((p) => (
                  <button key={p} onClick={() => setM(p)} className={cn('min-w-8 border px-1.5 py-1 font-mono text-xs', mPos === p ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent')}>
                    {p === 0 ? 'aucune' : `C${p}`}
                  </button>
                ))}
              </div>
            </div>
          )}
          {tab === 'ir' && <Switch checked={labels} onChange={setLabels} label="Annoter les bandes" />}
        </>
      )}
    </>
  )

  return (
    <WidgetFrame
      title="Familles de composés organiques"
      subtitle="Groupes caractéristiques, nomenclature et spectroscopie infrarouge"
      controls={controls}
      footer={
        tab === 'quiz' ? (
          <span>Repérez d’abord les bandes au-delà de 1500 cm⁻¹ : large vers 3300 (O–H alcool), très large 2500–3200 (O–H acide), fine et intense vers 1700 (C=O).</span>
        ) : family === 'alcane' ? (
          <span>Les alcanes ne contiennent que des liaisons simples C–C et C–H : nom = préfixe (nombre de C) + « ane ». Les ramifications sont nommées en préfixe avec leur numéro.</span>
        ) : (
          <span>
            Famille <strong>{F.label.toLowerCase()}</strong> : groupe <strong>{F.groupName}</strong>. On numérote la chaîne principale (la plus longue contenant le groupe)
            pour donner au groupe caractéristique l’indice le plus petit ; terminaison <strong>{F.suffix}</strong>.
          </span>
        )
      }
    >
      {tab === 'quiz' ? (
        <div className="flex flex-col gap-3">
          <p className="text-sm">À quelle famille appartient la molécule dont voici le spectre IR ?</p>
          <IRSpectrum family={qFam} labels={qAns !== null} />
          <div className="flex flex-wrap gap-2">
            {fams.map((k) => (
              <Button
                key={k}
                size="sm"
                variant={qAns === null ? 'outline' : k === qFam ? 'default' : k === qAns ? 'destructive' : 'outline'}
                onClick={() => setQAns(k)}
                disabled={qAns !== null}
              >
                {FAMILIES[k].label}
              </Button>
            ))}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setQSeed((s) => s + 1 + (s % 3))
                setQAns(null)
              }}
            >
              <Dices /> Autre spectre
            </Button>
          </div>
          {qAns !== null && (
            <div className={cn('border p-3 text-sm', qAns === qFam ? 'border-success/40 bg-success/10' : 'border-destructive/40 bg-destructive/10')}>
              {qAns === qFam ? 'Bonne réponse ! ' : `Non : c’est un(e) ${FAMILIES[qFam].label.toLowerCase()}. `}
              {qFam === 'alcane' && 'Seules les bandes C–H (2800–3000 cm⁻¹) sont visibles : ni O–H, ni C=O.'}
              {qFam === 'alcool' && 'Bande forte et large vers 3200–3400 cm⁻¹ (O–H lié), pas de bande C=O.'}
              {qFam === 'aldehyde' && 'Bande C=O intense vers 1730 cm⁻¹ et deux bandes C–H aldéhyde vers 2720 et 2820 cm⁻¹.'}
              {qFam === 'cetone' && 'Bande C=O intense vers 1715 cm⁻¹, sans bande O–H ni C–H d’aldéhyde.'}
              {qFam === 'acide' && 'Bande O–H très large (2500–3200 cm⁻¹) qui chevauche les C–H, et bande C=O vers 1710 cm⁻¹.'}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border bg-background px-3 py-2">
            <div className="text-lg font-semibold">{name}</div>
            <Badge variant="outline" className="normal-case" style={{ color: F.color }}>
              {F.label}
            </Badge>
          </div>
          {tab === 'nom' ? (
            <>
              <Skeletal mol={mol} />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Stat label="Formule brute" value={<Tex>{brute(mol)}</Tex>} />
                <Stat label="Semi-développée" value={<Tex>{semiDev(mol)}</Tex>} className="sm:col-span-2" />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <Stat label="Groupe caractéristique" value={<span>{F.groupName} <Tex>{GROUP_TEX[family]}</Tex></span>} />
                <Stat label="Formule générale" value={<Tex>{family === 'alcane' ? '\\mathrm{C_nH_{2n+2}}' : family === 'alcool' ? '\\mathrm{C_nH_{2n+1}OH}' : family === 'acide' ? '\\mathrm{C_nH_{2n+1}COOH}' : '\\mathrm{C_nH_{2n}O}'}</Tex>} />
              </div>
              <NameBreakdown mol={mol} />
            </>
          ) : (
            <>
              <IRSpectrum family={family} labels={labels} />
              <div className="overflow-x-auto border">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border-b border-r px-2 py-1 text-left font-medium">Liaison</th>
                      <th className="border-b border-r px-2 py-1 font-medium">σ (cm⁻¹)</th>
                      <th className="border-b px-2 py-1 font-medium">Bande</th>
                    </tr>
                  </thead>
                  <tbody>
                    {IR_TABLE.map((r) => (
                      <tr key={r.bond} className={cn(r.fam.includes(family) && 'bg-primary/5 font-medium')}>
                        <td className="border-b border-r px-2 py-1">{r.bond}</td>
                        <td className="border-b border-r px-2 py-1 text-center font-mono">{r.range}</td>
                        <td className="border-b px-2 py-1 text-center">{r.aspect}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </WidgetFrame>
  )
}

function NameBreakdown({ mol }: { mol: Mol }) {
  const parts = useMemo(() => {
    const out: { t: string; k: string }[] = []
    if (mol.family === 'acide') out.push({ t: 'acide ', k: 'famille' })
    if (mol.m) out.push({ t: `${mol.m}-méthyl`, k: 'ramification (position)' })
    out.push({ t: `${PREFIX[mol.n]}an`, k: `${mol.n} C dans la chaîne principale` })
    const full = nameOf(mol)
    const suffix =
      mol.family === 'alcane' ? 'e' : mol.family === 'aldehyde' ? 'al' : mol.family === 'acide' ? 'oïque' : full.slice(full.indexOf(PREFIX[mol.n] + 'an') + PREFIX[mol.n].length + 2)
    out.push({ t: suffix, k: mol.family === 'alcane' ? 'alcane' : 'groupe caractéristique' })
    return out
  }, [mol])
  return (
    <div className="flex flex-wrap items-stretch gap-1 border bg-muted/20 p-2">
      {parts.map((p, i) => (
        <div key={i} className="flex flex-col items-center border bg-background px-2 py-1">
          <span className="font-mono text-sm">{p.t}</span>
          <span className="text-[10px] text-muted-foreground">{p.k}</span>
        </div>
      ))}
    </div>
  )
}
