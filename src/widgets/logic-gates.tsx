import { useEffect, useMemo, useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Button } from '@/components/ui/button'
import { Input, Label, Select } from '@/components/ui/input'
import { Segmented } from '@/components/ui/tabs'
import { Stat, Switch } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { PALETTE } from '@/lib/plot'
import { cn } from '@/lib/utils'
import { evalBool, parseBool, subExpressions, toPython, toTex, variables, type BinOp, type BNode } from './_nsi1/boolean'

interface Props {
  /** Expression booléenne : syntaxe Python (and, or, not, ^), française (ET, OU, NON) ou symbolique (&, |, ~) */
  expression?: string
}

const PRESETS: { label: string; expr: string }[] = [
  { label: '(A et non B) ou C', expr: '(A and not B) or C' },
  { label: 'OU exclusif', expr: 'A xor B' },
  { label: 'NON-ET', expr: 'not (A and B)' },
  { label: 'De Morgan', expr: 'not A or not B' },
  { label: 'Multiplexeur', expr: '(A and not S) or (B and S)' },
  { label: 'Demi-additionneur : somme', expr: 'A xor B' },
  { label: 'Additionneur : somme', expr: 'A xor B xor C' },
  { label: 'Additionneur : retenue', expr: '(A and B) or (C and (A xor B))' },
  { label: 'Majorité', expr: '(A and B) or (A and C) or (B and C)' },
  { label: 'Implication', expr: 'not A or B' },
]

const ON = PALETTE.blue
const OFF = PALETTE.muted

// ---------------------------------------------------------------- dessin des portes
type GateKind = BinOp | 'not'

function gatePath(kind: GateKind, x: number, top: number, w: number, h: number): string[] {
  const bot = top + h
  const mid = top + h / 2
  const paths: string[] = []
  if (kind === 'not') {
    paths.push(`M${x},${top} L${x + w},${mid} L${x},${bot} Z`)
  } else if (kind === 'and' || kind === 'nand') {
    const r = h / 2
    const flat = Math.max(4, w - r)
    paths.push(`M${x},${top} L${x + flat},${top} A${r},${r} 0 0 1 ${x + flat},${bot} L${x},${bot} Z`)
  } else {
    const off = kind === 'xor' ? 6 : 0
    const bx = x + off
    paths.push(`M${bx},${top} Q${bx + w * 0.55},${top} ${x + w},${mid} Q${bx + w * 0.55},${bot} ${bx},${bot} Q${bx + w * 0.28},${mid} ${bx},${top} Z`)
    if (kind === 'xor') paths.push(`M${x},${top} Q${x + w * 0.28},${mid} ${x},${bot}`)
  }
  return paths
}
const hasBubble = (k: GateKind) => k === 'not' || k === 'nand' || k === 'nor'
const GATE_FR: Record<GateKind, string> = { and: 'ET', or: 'OU', xor: 'XOR', nand: 'NON-ET', nor: 'NON-OU', not: 'NON' }

function GateIcon({ kind, value, inputs }: { kind: GateKind; value: boolean; inputs: boolean[] }) {
  const w = kind === 'not' ? 34 : 46
  const h = 36
  const x = 22
  const top = 8
  const pins = kind === 'not' ? [top + h / 2] : [top + 10, top + h - 10]
  return (
    <svg viewBox="0 0 110 52" className="w-full max-w-[160px]">
      {pins.map((py, i) => (
        <line key={i} x1={2} y1={py} x2={x + (kind === 'or' || kind === 'nor' ? 6 : kind === 'xor' ? 4 : 0)} y2={py} stroke={inputs[i] ? ON : OFF} strokeWidth={2} />
      ))}
      {gatePath(kind, x, top, w, h).map((d, i) => (
        <path key={i} d={d} fill={i === 0 ? 'hsl(var(--card))' : 'none'} stroke={PALETTE.fg} strokeWidth={1.5} />
      ))}
      {hasBubble(kind) && <circle cx={x + w + 4} cy={top + h / 2} r={4} fill="hsl(var(--card))" stroke={PALETTE.fg} strokeWidth={1.5} />}
      <line x1={x + w + (hasBubble(kind) ? 8 : 0)} y1={top + h / 2} x2={108} y2={top + h / 2} stroke={value ? ON : OFF} strokeWidth={2} />
    </svg>
  )
}

// ---------------------------------------------------------------- mise en page du circuit
interface LNode {
  node: BNode
  x: number
  y: number
  w: number
  h: number
  children: LNode[]
  outX: number
  pinY: number[]
}

const COL = 96
const ROW = 46
const LEAF_W = 46

function layout(root: BNode) {
  let leafIdx = 0
  const height = (n: BNode): number => (n.k === 'not' ? 1 + height(n.a) : n.k === 'bin' ? 1 + Math.max(...n.args.map(height)) : 0)
  const H = height(root)
  const build = (n: BNode): LNode => {
    if (n.k === 'var' || n.k === 'const') {
      const y = 20 + ROW / 2 + leafIdx++ * ROW
      return { node: n, x: 10, y, w: LEAF_W, h: 28, children: [], outX: 10 + LEAF_W, pinY: [] }
    }
    const kids = n.k === 'not' ? [build(n.a)] : n.args.map(build)
    const hgt = height(n)
    const k = kids.length
    const gh = n.k === 'not' ? 30 : Math.max(36, k * 18)
    const gw = n.k === 'not' ? 30 : Math.max(46, gh / 2 + 22)
    const x = 10 + LEAF_W + 40 + (hgt - 1) * COL
    const y = (kids[0].y + kids[k - 1].y) / 2
    const pinY = n.k === 'not' ? [y] : kids.map((_, i) => y - gh / 2 + (gh / k) * (i + 0.5))
    return { node: n, x, y, w: gw, h: gh, children: kids, outX: x + gw + (n.k === 'not' || (n.k === 'bin' && hasBubble(n.op)) ? 8 : 0), pinY }
  }
  const tree = build(root)
  return { tree, width: 10 + LEAF_W + 40 + Math.max(0, H - 1) * COL + 70 + 70, height: Math.max(80, 20 + leafIdx * ROW + 10), H }
}

function Circuit({ expr, env, onToggle }: { expr: BNode; env: Record<string, boolean>; onToggle: (v: string) => void }) {
  const L = useMemo(() => layout(expr), [expr])
  const els: React.ReactNode[] = []
  let key = 0
  const draw = (ln: LNode) => {
    const v = evalBool(ln.node, env)
    if (ln.node.k === 'var' || ln.node.k === 'const') {
      const name = ln.node.k === 'var' ? ln.node.name : ln.node.v ? '1' : '0'
      const isVar = ln.node.k === 'var'
      els.push(
        <g key={key++} onClick={isVar ? () => onToggle(name) : undefined} className={cn(isVar && 'cursor-pointer')}>
          <rect x={ln.x} y={ln.y - ln.h / 2} width={ln.w} height={ln.h} fill={v ? ON : 'hsl(var(--background))'} stroke={PALETTE.fg} strokeWidth={1.2} />
          <text x={ln.x + ln.w / 2} y={ln.y + 4.5} textAnchor="middle" fontSize={13} fontFamily="Geist Mono, monospace" fontWeight={600} fill={v ? 'white' : PALETTE.fg}>
            {isVar ? `${name}=${v ? 1 : 0}` : name}
          </text>
        </g>,
      )
      return
    }
    const kind: GateKind = ln.node.k === 'not' ? 'not' : ln.node.op
    // fils d'entrée
    ln.children.forEach((c, i) => {
      draw(c)
      const cv = evalBool(c.node, env)
      const py = ln.pinY[i]
      const inset = kind === 'or' || kind === 'nor' ? 6 : kind === 'xor' ? 4 : 0
      const midX = ln.x - 14 - (ln.children.length > 2 ? i * 5 : i * 6)
      els.push(<path key={key++} d={`M${c.outX},${c.y} L${midX},${c.y} L${midX},${py} L${ln.x + inset},${py}`} fill="none" stroke={cv ? ON : OFF} strokeWidth={cv ? 2.2 : 1.6} />)
    })
    const top = ln.y - ln.h / 2
    gatePath(kind, ln.x, top, ln.w, ln.h).forEach((d, i) =>
      els.push(<path key={key++} d={d} fill={i === 0 ? 'hsl(var(--card))' : 'none'} stroke={v ? ON : PALETTE.fg} strokeWidth={1.6} />),
    )
    if (hasBubble(kind)) els.push(<circle key={key++} cx={ln.x + ln.w + 4} cy={ln.y} r={4} fill="hsl(var(--card))" stroke={v ? ON : PALETTE.fg} strokeWidth={1.6} />)
    if (kind !== 'not')
      els.push(
        <text key={key++} x={ln.x + ln.w * 0.42 + (kind === 'xor' ? 4 : 0)} y={ln.y + 3.5} textAnchor="middle" fontSize={9.5} fontFamily="Geist, sans-serif" fontWeight={600} fill={PALETTE.muted}>
          {GATE_FR[kind]}
        </text>,
      )
  }
  draw(L.tree)
  const out = evalBool(expr, env)
  const ox = L.tree.outX
  const endX = ox + 50
  return (
    <svg viewBox={`0 0 ${Math.max(L.width, endX + 60)} ${L.height}`} className="w-full" style={{ maxHeight: 420 }}>
      {els}
      <line x1={ox} y1={L.tree.y} x2={endX} y2={L.tree.y} stroke={out ? ON : OFF} strokeWidth={2.4} />
      <rect x={endX} y={L.tree.y - 15} width={50} height={30} fill={out ? PALETTE.green : 'hsl(var(--background))'} stroke={PALETTE.fg} strokeWidth={1.2} />
      <text x={endX + 25} y={L.tree.y + 5} textAnchor="middle" fontSize={13} fontFamily="Geist Mono, monospace" fontWeight={700} fill={out ? 'white' : PALETTE.fg}>
        S={out ? 1 : 0}
      </text>
    </svg>
  )
}

// ---------------------------------------------------------------- widget
type View = 'circuit' | 'table' | 'portes'

export default function LogicGates({ expression = '(A and not B) or C' }: Props) {
  const [src, setSrc] = useState(expression)
  const [view, setView] = useState<View>('circuit')
  const [env, setEnv] = useState<Record<string, boolean>>({})
  const [inter, setInter] = useState(true)
  const [cmp, setCmp] = useState('')
  const [gA, setGA] = useState(true)
  const [gB, setGB] = useState(false)

  useEffect(() => setSrc(expression), [expression])

  const parsed = useMemo(() => {
    try {
      const e = parseBool(src)
      const vars = variables(e)
      if (vars.length > 6) return { err: 'Au plus 6 variables (64 lignes dans la table).' as string }
      return { e, vars: vars.slice().sort((a, b) => a.localeCompare(b)) }
    } catch (err) {
      return { err: (err as Error).message }
    }
  }, [src])

  const [last, setLast] = useState<{ e: BNode; vars: string[] } | null>(null)
  useEffect(() => {
    if ('e' in parsed && parsed.e) setLast({ e: parsed.e, vars: parsed.vars! })
  }, [parsed])
  const cur = useMemo(() => ('e' in parsed && parsed.e ? { e: parsed.e, vars: parsed.vars! } : last), [parsed, last])
  const error = 'err' in parsed ? parsed.err : null

  const cmpParsed = useMemo(() => {
    if (!cmp.trim()) return null
    try {
      return { e: parseBool(cmp) }
    } catch (err) {
      return { err: (err as Error).message }
    }
  }, [cmp])

  const rows = useMemo(() => {
    if (!cur) return []
    const n = cur.vars.length
    return Array.from({ length: 2 ** n }, (_, r) => {
      const e: Record<string, boolean> = {}
      cur.vars.forEach((v, i) => (e[v] = Math.floor(r / 2 ** (n - 1 - i)) % 2 === 1))
      return e
    })
  }, [cur])

  const subs = useMemo(() => (cur ? subExpressions(cur.e).slice(0, -1) : []), [cur])
  const full: Record<string, boolean> = {}
  cur?.vars.forEach((v) => (full[v] = !!env[v]))
  const output = cur ? evalBool(cur.e, full) : false
  const ones = cur ? rows.filter((r) => evalBool(cur.e, r)).length : 0

  const mintermsTex = useMemo(() => {
    if (!cur) return ''
    const ms = rows.filter((r) => evalBool(cur.e, r)).map((r) => cur.vars.map((v) => (r[v] ? v : `\\overline{${v}}`)).join(''))
    if (ms.length === 0) return '0'
    if (ms.length === rows.length) return '1'
    if (ms.length > 8) return null
    return ms.join(' + ')
  }, [cur, rows])

  const equivalence = useMemo(() => {
    if (!cur || !cmpParsed || !('e' in cmpParsed) || !cmpParsed.e) return null
    const e2 = cmpParsed.e
    const allVars = Array.from(new Set([...cur.vars, ...variables(e2)])).sort()
    if (allVars.length > 8) return { ok: false, msg: 'Trop de variables.' }
    const n = allVars.length
    for (let r = 0; r < 2 ** n; r++) {
      const e: Record<string, boolean> = {}
      allVars.forEach((v, i) => (e[v] = Math.floor(r / 2 ** (n - 1 - i)) % 2 === 1))
      if (evalBool(cur.e, e) !== evalBool(e2, e))
        return { ok: false, msg: `Non équivalentes : pour ${allVars.map((v) => `${v} = ${e[v] ? 1 : 0}`).join(', ')}, la 1re vaut ${evalBool(cur.e, e) ? 1 : 0} et la 2de vaut ${evalBool(e2, e) ? 1 : 0}.` }
    }
    return { ok: true, msg: 'Équivalentes : les deux expressions ont la même table de vérité.' }
  }, [cur, cmpParsed])

  const toggle = (v: string) => setEnv((e) => ({ ...e, [v]: !e[v] }))
  const setRow = (r: Record<string, boolean>) => setEnv((e) => ({ ...e, ...r }))
  const rowActive = (r: Record<string, boolean>) => cur?.vars.every((v) => r[v] === !!env[v])

  const controls = (
    <>
      <div className="flex flex-col gap-1.5">
        <Label>Expression</Label>
        <Input value={src} onChange={(e) => setSrc(e.target.value)} className={cn('font-mono', error && 'border-destructive')} spellCheck={false} />
        {error ? <p className="text-xs text-destructive">{error}</p> : <p className="text-[11px] text-muted-foreground">and / or / not / xor, ET / OU / NON, &amp; | ~ ^. Priorités : not, puis and, puis xor, puis or.</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Exemples</Label>
        <Select value="" onChange={(e) => e.target.value && setSrc(e.target.value)}>
          <option value="">Choisir…</option>
          {PRESETS.map((p) => (
            <option key={p.label} value={p.expr}>
              {p.label}
            </option>
          ))}
        </Select>
      </div>
      {cur && (
        <div className="flex flex-col gap-1.5">
          <Label>Entrées</Label>
          <div className="flex flex-wrap gap-1.5">
            {cur.vars.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => toggle(v)}
                className={cn('min-w-[52px] border px-2 py-1.5 font-mono text-sm font-semibold transition-colors', env[v] ? 'border-transparent bg-info text-white' : 'bg-background hover:bg-accent')}
              >
                {v} = {env[v] ? 1 : 0}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <Label>Comparer avec…</Label>
        <Input value={cmp} onChange={(e) => setCmp(e.target.value)} placeholder="ex. not (not A and B) and C" className="font-mono" spellCheck={false} />
        {cmpParsed && 'err' in cmpParsed && <p className="text-xs text-destructive">{cmpParsed.err}</p>}
        {equivalence && <p className={cn('text-xs', equivalence.ok ? 'text-success' : 'text-warning')}>{equivalence.msg}</p>}
      </div>
    </>
  )

  return (
    <WidgetFrame
      title="Portes logiques"
      subtitle="Circuit, table de vérité et expression booléenne"
      controls={controls}
      footer={
        cur ? (
          <span>
            Avec les entrées {cur.vars.map((v) => `${v} = ${env[v] ? 1 : 0}`).join(', ')}, la sortie vaut <b className={output ? 'text-success' : ''}>{output ? '1 (True)' : '0 (False)'}</b>. La fonction vaut 1 sur{' '}
            {ones} ligne{ones > 1 ? 's' : ''} sur {rows.length}.
          </span>
        ) : (
          'Saisissez une expression.'
        )
      }
    >
      <div className="flex flex-col gap-3">
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: 'circuit', label: 'Circuit' },
            { value: 'table', label: 'Table de vérité' },
            { value: 'portes', label: 'Les portes' },
          ]}
          className="self-start"
        />

        {cur && view !== 'portes' && (
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="overflow-x-auto border bg-background px-3 py-2">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Python</div>
              <code className="font-mono text-sm">S = {toPython(cur.e)}</code>
            </div>
            <div className="overflow-x-auto border bg-background px-3 py-2">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Notation algébrique</div>
              <Tex>{`S = ${toTex(cur.e)}`}</Tex>
            </div>
          </div>
        )}

        {cur && view === 'circuit' && (
          <>
            <div className="overflow-x-auto border bg-background p-2">
              <Circuit expr={cur.e} env={full} onToggle={toggle} />
            </div>
            <p className="text-xs text-muted-foreground">Cliquez sur une entrée pour la basculer. Les fils bleus transportent un 1, les fils gris un 0.</p>
          </>
        )}

        {cur && view === 'table' && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Switch checked={inter} onChange={setInter} label="Colonnes intermédiaires" />
              <div className="flex gap-2">
                <Stat label="Lignes" value={rows.length} />
                <Stat label="S = 1" value={ones} tone="info" />
              </div>
            </div>
            <div className="max-h-[420px] overflow-auto border">
              <table className="w-full border-collapse text-center font-mono text-sm tabular-nums">
                <thead className="sticky top-0 bg-muted">
                  <tr>
                    {cur.vars.map((v) => (
                      <th key={v} className="border-b px-3 py-1.5 font-semibold">
                        {v}
                      </th>
                    ))}
                    {inter &&
                      subs.map((s, i) => (
                        <th key={i} className="whitespace-nowrap border-b border-l px-3 py-1.5 font-normal text-muted-foreground">
                          <Tex>{toTex(s)}</Tex>
                        </th>
                      ))}
                    <th className="border-b border-l-2 border-l-foreground px-3 py-1.5 font-semibold">S</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => {
                    const s = evalBool(cur.e, r)
                    return (
                      <tr key={i} onClick={() => setRow(r)} className={cn('cursor-pointer border-t hover:bg-accent', rowActive(r) && 'bg-info/15 hover:bg-info/20')}>
                        {cur.vars.map((v) => (
                          <td key={v} className="px-3 py-1">
                            {r[v] ? 1 : 0}
                          </td>
                        ))}
                        {inter &&
                          subs.map((sx, j) => (
                            <td key={j} className="border-l px-3 py-1 text-muted-foreground">
                              {evalBool(sx, r) ? 1 : 0}
                            </td>
                          ))}
                        <td className={cn('border-l-2 border-l-foreground px-3 py-1 font-semibold', s && 'text-success')}>{s ? 1 : 0}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {mintermsTex !== null && (
              <div className="overflow-x-auto border bg-background px-3 py-2 text-sm">
                <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Forme normale disjonctive (somme des lignes où S = 1)</div>
                <Tex>{`S = ${mintermsTex}`}</Tex>
              </div>
            )}
          </>
        )}

        {view === 'portes' && (
          <>
            <div className="flex items-center gap-2">
              <Button size="xs" variant={gA ? 'default' : 'outline'} onClick={() => setGA(!gA)} className="font-mono">
                A = {gA ? 1 : 0}
              </Button>
              <Button size="xs" variant={gB ? 'default' : 'outline'} onClick={() => setGB(!gB)} className="font-mono">
                B = {gB ? 1 : 0}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {(['not', 'and', 'or', 'xor', 'nand', 'nor'] as GateKind[]).map((k) => {
                const f = (a: boolean, b: boolean) =>
                  k === 'not' ? !a : k === 'and' ? a && b : k === 'or' ? a || b : k === 'xor' ? a !== b : k === 'nand' ? !(a && b) : !(a || b)
                const py = { not: 'not A', and: 'A and B', or: 'A or B', xor: 'A ^ B', nand: 'not (A and B)', nor: 'not (A or B)' }[k]
                const tex = { not: '\\overline{A}', and: 'A \\cdot B', or: 'A + B', xor: 'A \\oplus B', nand: '\\overline{A \\cdot B}', nor: '\\overline{A + B}' }[k]
                const combos: [boolean, boolean][] = k === 'not' ? [[false, false], [true, false]] : [[false, false], [false, true], [true, false], [true, true]]
                return (
                  <div key={k} className="flex flex-col gap-1 border bg-background p-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold">{GATE_FR[k]}</span>
                      <Tex className="text-xs">{tex}</Tex>
                    </div>
                    <GateIcon kind={k} value={f(gA, gB)} inputs={[gA, gB]} />
                    <code className="font-mono text-[11px] text-muted-foreground">{py}</code>
                    <table className="w-full text-center font-mono text-xs">
                      <thead>
                        <tr className="text-muted-foreground">
                          <th className="font-normal">A</th>
                          {k !== 'not' && <th className="font-normal">B</th>}
                          <th className="font-normal">S</th>
                        </tr>
                      </thead>
                      <tbody>
                        {combos.map(([a, b], i) => (
                          <tr key={i} className={cn('border-t', a === gA && (k === 'not' || b === gB) && 'bg-info/15')}>
                            <td>{a ? 1 : 0}</td>
                            {k !== 'not' && <td>{b ? 1 : 0}</td>}
                            <td className="font-semibold">{f(a, b) ? 1 : 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Lois de De Morgan : <Tex>{'\\overline{A \\cdot B} = \\overline{A} + \\overline{B}'}</Tex> et <Tex>{'\\overline{A + B} = \\overline{A} \\cdot \\overline{B}'}</Tex>. En Python, <code>and</code> et{' '}
              <code>or</code> sont évalués paresseusement (court-circuit).
            </p>
          </>
        )}
      </div>
    </WidgetFrame>
  )
}
