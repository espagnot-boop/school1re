import { useEffect, useMemo, useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { Segmented } from '@/components/ui/tabs'
import { Stat, Switch } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { cn } from '@/lib/utils'

interface Props {
  /** Valeur initiale (entier, éventuellement négatif → complément à deux) */
  value?: number
  /** Nombre de bits : 4, 8, 16 ou 32 (défaut 8) */
  bits?: number
}

const WIDTHS = [4, 8, 16, 32] as const
type Width = (typeof WIDTHS)[number]
type View = 'bits' | 'methode' | 'ops'
type Op = 'add' | 'sub' | 'and' | 'or' | 'xor'

const pow2 = (n: number) => 2 ** n
const mod = (x: number, m: number) => ((x % m) + m) % m
const toSigned = (u: number, n: number) => (u >= pow2(n - 1) ? u - pow2(n) : u)
const bitsOf = (u: number, n: number) => Array.from({ length: n }, (_, i) => Math.floor(u / pow2(n - 1 - i)) % 2)
const binStr = (u: number, n: number) => u.toString(2).padStart(n, '0')
const hexStr = (u: number, n: number) => u.toString(16).toUpperCase().padStart(Math.ceil(n / 4), '0')
const group = (s: string, k = 4) => s.replace(new RegExp(`(.{${k}})(?=.)`, 'g'), '$1 ')
const minus = (x: number) => (x < 0 ? '−' + Math.abs(x) : String(x))

function bestWidth(v: number, wanted?: number): Width {
  const start = WIDTHS.find((w) => w === wanted) ?? 8
  for (const w of WIDTHS) {
    if (w < start) continue
    if ((v >= 0 && v < pow2(w)) || (v < 0 && v >= -pow2(w - 1))) return w
  }
  return 32
}

function BitRow({ u, n, signed, onToggle, highlight }: { u: number; n: number; signed: boolean; onToggle?: (pos: number) => void; highlight?: boolean[] }) {
  const b = bitsOf(u, n)
  return (
    <div className="flex flex-wrap justify-center gap-y-3">
      {Array.from({ length: n / 4 }, (_, g) => (
        <div key={g} className="flex border-r border-dashed border-border px-1.5 last:border-r-0">
          {b.slice(g * 4, g * 4 + 4).map((bit, j) => {
            const i = g * 4 + j
            const pos = n - 1 - i
            const isSign = signed && pos === n - 1
            const weight = isSign ? '−2' : '2'
            return (
              <div key={i} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => onToggle?.(pos)}
                  disabled={!onToggle}
                  aria-label={`bit ${pos} = ${bit}`}
                  className={cn(
                    'flex items-center justify-center border font-mono font-semibold transition-colors',
                    n === 32 ? 'h-8 w-6 text-sm' : n === 16 ? 'h-10 w-8 text-base' : 'h-12 w-10 text-lg',
                    bit ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:bg-accent',
                    isSign && 'ring-1 ring-inset ring-warning',
                    highlight?.[i] && 'outline outline-2 outline-info',
                    !onToggle && 'cursor-default',
                  )}
                >
                  {bit}
                </button>
                <span className={cn('mt-1 font-mono text-[9px] tabular-nums text-muted-foreground', isSign && 'text-warning')}>
                  {weight}
                  <sup>{pos}</sup>
                </span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

/** Champ de saisie qui n'écrase pas la frappe en cours */
function NumField({ label, value, onCommit, prefix, mono = true, placeholder }: { label: string; value: string; onCommit: (s: string) => boolean; prefix?: string; mono?: boolean; placeholder?: string }) {
  const [txt, setTxt] = useState(value)
  const [err, setErr] = useState(false)
  const [focus, setFocus] = useState(false)
  useEffect(() => {
    if (!focus) {
      setTxt(value)
      setErr(false)
    }
  }, [value, focus])
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <div className="flex items-stretch">
        {prefix && <span className="flex items-center border border-r-0 bg-muted px-2 font-mono text-xs text-muted-foreground">{prefix}</span>}
        <Input
          value={txt}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setFocus(false)
          }}
          onChange={(e) => {
            setTxt(e.target.value)
            setErr(!onCommit(e.target.value))
          }}
          className={cn(mono && 'font-mono', err && 'border-destructive focus-visible:ring-destructive')}
        />
      </div>
    </div>
  )
}

export default function BaseConverter({ value = 45, bits }: Props) {
  const init = Number.isFinite(value) ? Math.trunc(value) : 45
  const [n, setN] = useState<Width>(() => bestWidth(init, bits))
  const [u, setU] = useState(() => mod(init, pow2(bestWidth(init, bits))))
  const [signed, setSigned] = useState(init < 0)
  const [view, setView] = useState<View>('bits')
  const [op, setOp] = useState<Op>('add')
  const [bU, setBU] = useState(() => mod(init < 0 ? 5 : 20, pow2(bestWidth(init, bits))))

  const M = pow2(n)
  const s = toSigned(u, n)
  const shown = signed ? s : u

  const changeWidth = (w: Width) => {
    // on conserve la valeur (signée ou non) si elle tient, sinon on tronque
    const v = signed ? s : u
    setU(mod(v, pow2(w)))
    setBU(mod(signed ? toSigned(bU, n) : bU, pow2(w)))
    setN(w)
  }

  const toggle = (pos: number) => setU((x) => (Math.floor(x / pow2(pos)) % 2 ? x - pow2(pos) : x + pow2(pos)))

  const parseDec = (str: string, allowNeg: boolean): number | null => {
    const t = str.trim().replace(/[−–]/g, '-').replace(/\s/g, '')
    if (!/^-?\d+$/.test(t)) return null
    const v = parseInt(t, 10)
    if (!allowNeg && v < 0) return null
    if (allowNeg ? v < -pow2(n - 1) || v >= pow2(n - 1) : v >= M) return null
    return v
  }
  const commitDec = (str: string) => {
    const v = parseDec(str, false)
    if (v === null) return false
    setU(v)
    return true
  }
  const commitSigned = (str: string) => {
    const v = parseDec(str, true)
    if (v === null) return false
    setU(mod(v, M))
    return true
  }
  const commitBase = (str: string, base: 2 | 16) => {
    const t = str.replace(/\s|_/g, '').replace(/^0[bx]/i, '')
    const re = base === 2 ? /^[01]+$/ : /^[0-9a-f]+$/i
    if (!re.test(t)) return false
    const v = parseInt(t, base)
    if (!(v < M)) return false
    setU(v)
    return true
  }

  // --- décomposition en puissances de 2
  const b = bitsOf(u, n)
  const terms = b.map((bit, i) => (bit ? n - 1 - i : -1)).filter((p) => p >= 0)
  const decompTex = (() => {
    if (terms.length === 0) return '0'
    const parts = terms.map((p) => (signed && p === n - 1 ? `-2^{${p}}` : `2^{${p}}`))
    const vals = terms.map((p) => (signed && p === n - 1 ? `-${pow2(p)}` : `${pow2(p)}`))
    const join = (arr: string[]) => arr.join(' + ').replace(/\+ -/g, '- ').replace(/^-/, '-')
    return `${join(parts)} = ${join(vals)} = ${shown}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1\\,')
  })()

  // --- complément à deux de la valeur courante (−x)
  const inv = M - 1 - u
  const neg = mod(inv + 1, M)

  // --- divisions successives
  const divisions = useMemo(() => {
    const rows: { q: number; r: number; d: number }[] = []
    let x = u
    if (x === 0) return [{ d: 0, q: 0, r: 0 }]
    while (x > 0 && rows.length < 40) {
      rows.push({ d: x, q: Math.floor(x / 2), r: x % 2 })
      x = Math.floor(x / 2)
    }
    return rows
  }, [u])
  const divisions16 = useMemo(() => {
    const rows: { q: number; r: number; d: number }[] = []
    let x = u
    if (x === 0) return [{ d: 0, q: 0, r: 0 }]
    while (x > 0) {
      rows.push({ d: x, q: Math.floor(x / 16), r: x % 16 })
      x = Math.floor(x / 16)
    }
    return rows
  }, [u])

  // --- opérations
  const opRes = useMemo(() => {
    const A = u
    const B = bU
    let raw = 0
    let r = 0
    switch (op) {
      case 'add':
        raw = A + B
        break
      case 'sub':
        raw = A + mod(M - B, M) // A + (−B) en complément à deux
        break
      case 'and':
      case 'or':
      case 'xor': {
        const ba = bitsOf(A, n)
        const bb = bitsOf(B, n)
        const out = ba.map((x, i) => (op === 'and' ? x & bb[i] : op === 'or' ? x | bb[i] : x ^ bb[i]))
        raw = out.reduce((acc, x) => acc * 2 + x, 0)
        break
      }
    }
    r = mod(raw, M)
    // retenues (pour l'addition binaire posée)
    const addB = op === 'sub' ? mod(M - B, M) : B
    const carries: number[] = new Array(n + 1).fill(0)
    if (op === 'add' || op === 'sub') {
      let c = 0
      for (let p = 0; p < n; p++) {
        const x = (Math.floor(A / pow2(p)) % 2) + (Math.floor(addB / pow2(p)) % 2) + c
        c = x >= 2 ? 1 : 0
        carries[p + 1] = c
      }
    }
    const carryOut = carries[n] === 1
    const sA = toSigned(A, n)
    const sB = toSigned(addB, n)
    const sR = toSigned(r, n)
    const trueSigned = op === 'add' ? sA + toSigned(B, n) : sA - toSigned(B, n)
    const signedOverflow = (op === 'add' || op === 'sub') && (trueSigned < -pow2(n - 1) || trueSigned > pow2(n - 1) - 1)
    // carries index: carries[p] = retenue entrant dans la colonne p
    return { r, addB, carries, carryOut, signedOverflow, sR }
  }, [u, bU, op, n, M])

  const quick = (
    <div className="grid grid-cols-3 gap-1.5">
      <Button size="xs" variant="outline" onClick={() => setU((x) => mod(x + 1, M))}>
        +1
      </Button>
      <Button size="xs" variant="outline" onClick={() => setU((x) => mod(x - 1, M))}>
        −1
      </Button>
      <Button size="xs" variant="outline" onClick={() => setU((x) => M - 1 - x)} title="Inverser tous les bits">
        NON
      </Button>
      <Button size="xs" variant="outline" onClick={() => setU((x) => mod(x * 2, M))} title="Décalage à gauche (× 2)">
        ≪ 1
      </Button>
      <Button size="xs" variant="outline" onClick={() => setU((x) => Math.floor(x / 2))} title="Décalage logique à droite (÷ 2)">
        ≫ 1
      </Button>
      <Button size="xs" variant="outline" onClick={() => setU(neg)} title="Opposé en complément à deux">
        −x
      </Button>
      <Button size="xs" variant="outline" onClick={() => setU(0)}>
        0
      </Button>
      <Button size="xs" variant="outline" onClick={() => setU(M - 1)}>
        max
      </Button>
      <Button size="xs" variant="outline" onClick={() => setU(Math.floor(Math.random() * M))}>
        hasard
      </Button>
    </div>
  )

  const controls = (
    <>
      <div className="flex flex-col gap-1.5">
        <Label>Nombre de bits</Label>
        <Segmented value={String(n) as `${Width}`} onChange={(v) => changeWidth(Number(v) as Width)} options={WIDTHS.map((w) => ({ value: String(w) as `${Width}`, label: String(w) }))} />
      </div>
      <Switch checked={signed} onChange={setSigned} label="Entier relatif (complément à deux)" />
      <NumField label="Décimal (naturel)" value={String(u)} onCommit={commitDec} placeholder={`0 … ${M - 1}`} />
      <NumField label="Décimal signé (C2)" value={minus(s)} onCommit={commitSigned} placeholder={`${-pow2(n - 1)} … ${pow2(n - 1) - 1}`} />
      <NumField label="Binaire" prefix="0b" value={group(binStr(u, n))} onCommit={(t) => commitBase(t, 2)} />
      <NumField label="Hexadécimal" prefix="0x" value={hexStr(u, n)} onCommit={(t) => commitBase(t, 16)} />
      <div className="flex flex-col gap-1.5">
        <Label>Actions</Label>
        {quick}
      </div>
    </>
  )

  const hex = hexStr(u, n)
  const bin = binStr(u, n)

  return (
    <WidgetFrame
      title="Convertisseur de bases"
      subtitle={`Entiers sur ${n} bits : binaire, décimal, hexadécimal, complément à deux`}
      controls={controls}
      footer={
        signed ? (
          <span>
            En complément à deux sur {n} bits, le bit de poids fort compte pour <b>−2<sup>{n - 1}</sup></b> : on code les entiers de <b>{minus(-pow2(n - 1))}</b> à <b>{pow2(n - 1) - 1}</b>.
            {u >= pow2(n - 1) && (
              <>
                {' '}
                Ici le bit de signe vaut 1 : le mot {group(bin)} code {minus(s)} (et non {u}), car {u} − 2<sup>{n}</sup> = {minus(s)}.
              </>
            )}
          </span>
        ) : (
          <span>
            Sur {n} bits, on code les entiers naturels de 0 à 2<sup>{n}</sup> − 1 = {M - 1}. Un chiffre hexadécimal correspond exactement à 4 bits.
          </span>
        )
      }
    >
      <div className="flex flex-col gap-4">
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: 'bits', label: 'Bits' },
            { value: 'methode', label: 'Méthodes' },
            { value: 'ops', label: 'Opérations' },
          ]}
          className="self-start"
        />

        {view === 'bits' && (
          <>
            <BitRow u={u} n={n} signed={signed} onToggle={toggle} />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Stat label="Décimal" value={u.toLocaleString('fr-FR')} />
              <Stat label="Signé (C2)" value={s.toLocaleString('fr-FR').replace('-', '−')} tone={s < 0 ? 'warning' : undefined} />
              <Stat label="Hexadécimal" value={'0x' + hex} tone="info" />
              <Stat label="Bits à 1" value={terms.length} />
            </div>
            <div className="overflow-x-auto border bg-background p-3 text-sm">
              <Tex>{`(${group(bin).replace(/ /g, '\\,')})_2 = ${decompTex}`}</Tex>
            </div>
            <div className="flex flex-wrap items-end justify-center gap-1 font-mono text-xs">
              {hex.split('').map((h, i) => (
                <div key={i} className="flex flex-col items-center border">
                  <span className="px-2 py-1 text-muted-foreground">{bin.slice(i * 4, i * 4 + 4)}</span>
                  <span className="w-full border-t bg-muted px-2 py-1 text-center text-sm font-semibold text-info">{h}</span>
                </div>
              ))}
            </div>
            {signed && (
              <div className="border bg-background p-3 text-sm">
                <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Opposé par complément à deux</div>
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-xs sm:text-sm">
                  <span className="text-muted-foreground">x</span>
                  <span>
                    {group(bin)} <span className="text-muted-foreground">({minus(s)})</span>
                  </span>
                  <span className="text-muted-foreground">inverser</span>
                  <span>{group(binStr(inv, n))}</span>
                  <span className="text-muted-foreground">+ 1</span>
                  <span className="font-semibold">
                    {group(binStr(neg, n))} <span className="font-normal text-muted-foreground">({minus(toSigned(neg, n))})</span>
                  </span>
                </div>
                {s === -pow2(n - 1) && <p className="mt-2 text-xs text-warning">Cas particulier : {minus(s)} n'a pas d'opposé représentable sur {n} bits (on retombe sur lui-même).</p>}
              </div>
            )}
          </>
        )}

        {view === 'methode' && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border bg-background p-3">
              <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Décimal → binaire : divisions par 2</div>
              <table className="w-full font-mono text-xs tabular-nums">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="py-1 text-left font-normal">dividende</th>
                    <th className="text-left font-normal">quotient</th>
                    <th className="text-right font-normal">reste</th>
                  </tr>
                </thead>
                <tbody>
                  {divisions.map((d, i) => (
                    <tr key={i} className="border-t">
                      <td className="py-0.5">{d.d} ÷ 2</td>
                      <td>{d.q}</td>
                      <td className="text-right font-semibold text-info">{d.r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-xs text-muted-foreground">
                On lit les restes <b>de bas en haut</b> : {u} = ({u.toString(2)})<sub>2</sub>
              </p>
            </div>
            <div className="border bg-background p-3">
              <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Décimal → hexadécimal : divisions par 16</div>
              <table className="w-full font-mono text-xs tabular-nums">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="py-1 text-left font-normal">dividende</th>
                    <th className="text-left font-normal">quotient</th>
                    <th className="text-right font-normal">reste</th>
                  </tr>
                </thead>
                <tbody>
                  {divisions16.map((d, i) => (
                    <tr key={i} className="border-t">
                      <td className="py-0.5">{d.d} ÷ 16</td>
                      <td>{d.q}</td>
                      <td className="text-right font-semibold text-info">
                        {d.r}
                        {d.r > 9 && <span className="text-muted-foreground"> = {d.r.toString(16).toUpperCase()}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-xs text-muted-foreground">
                Restes de bas en haut : {u} = ({u.toString(16).toUpperCase()})<sub>16</sub>
              </p>
            </div>
            <div className="border bg-background p-3 text-sm md:col-span-2">
              <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Hexadécimal → décimal</div>
              <div className="overflow-x-auto">
                <Tex>
                  {`(${u.toString(16).toUpperCase()})_{16} = ${u
                    .toString(16)
                    .toUpperCase()
                    .split('')
                    .map((c, i, arr) => `${parseInt(c, 16)}\\times 16^{${arr.length - 1 - i}}`)
                    .join(' + ')} = ${u}`}
                </Tex>
              </div>
            </div>
          </div>
        )}

        {view === 'ops' && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-end gap-3">
              <Segmented
                value={op}
                onChange={setOp}
                options={[
                  { value: 'add', label: 'A + B' },
                  { value: 'sub', label: 'A − B' },
                  { value: 'and', label: 'A ET B' },
                  { value: 'or', label: 'A OU B' },
                  { value: 'xor', label: 'A XOR B' },
                ]}
              />
              <div className="w-40">
                <NumField
                  label={signed ? 'B (décimal signé)' : 'B (décimal)'}
                  value={signed ? minus(toSigned(bU, n)) : String(bU)}
                  onCommit={(t) => {
                    const v = parseDec(t, signed)
                    if (v === null) return false
                    setBU(mod(v, M))
                    return true
                  }}
                />
              </div>
            </div>
            <div className="overflow-x-auto border bg-background p-3">
              <table className="mx-auto font-mono text-sm tabular-nums">
                <tbody>
                  {(op === 'add' || op === 'sub') && (
                    <tr className="text-[10px] text-warning">
                      <td className="pr-3 text-right text-muted-foreground">retenues</td>
                      {Array.from({ length: n }, (_, i) => {
                        const p = n - 1 - i
                        return (
                          <td key={i} className={cn('w-5 text-center', i % 4 === 0 && i > 0 && 'pl-2')}>
                            {opRes.carries[p] ? '1' : ''}
                          </td>
                        )
                      })}
                    </tr>
                  )}
                  <tr>
                    <td className="pr-3 text-right text-muted-foreground">A</td>
                    {bitsOf(u, n).map((x, i) => (
                      <td key={i} className={cn('w-5 text-center', i % 4 === 0 && i > 0 && 'pl-2')}>
                        {x}
                      </td>
                    ))}
                    <td className="pl-3 text-xs text-muted-foreground">{signed ? minus(s) : u}</td>
                  </tr>
                  <tr>
                    <td className="pr-3 text-right text-muted-foreground">{op === 'add' ? '+ B' : op === 'sub' ? '+ (−B)' : op === 'and' ? 'ET B' : op === 'or' ? 'OU B' : 'XOR B'}</td>
                    {bitsOf(op === 'sub' ? opRes.addB : bU, n).map((x, i) => (
                      <td key={i} className={cn('w-5 text-center', i % 4 === 0 && i > 0 && 'pl-2')}>
                        {x}
                      </td>
                    ))}
                    <td className="pl-3 text-xs text-muted-foreground">{signed || op === 'sub' ? minus(toSigned(op === 'sub' ? opRes.addB : bU, n)) : bU}</td>
                  </tr>
                  <tr className="border-t-2 border-foreground font-semibold">
                    <td className="pr-3 text-right text-muted-foreground">=</td>
                    {bitsOf(opRes.r, n).map((x, i) => (
                      <td key={i} className={cn('w-5 pt-1 text-center', i % 4 === 0 && i > 0 && 'pl-2')}>
                        {x}
                      </td>
                    ))}
                    <td className="pl-3 text-xs">{signed || op === 'sub' ? minus(opRes.sR) : opRes.r}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Stat label="Résultat (naturel)" value={opRes.r} />
              <Stat label="Résultat (C2)" value={minus(opRes.sR)} />
              {(op === 'add' || op === 'sub') && (
                <>
                  <Stat label="Retenue sortante" value={opRes.carryOut ? 'oui' : 'non'} tone={opRes.carryOut ? 'warning' : undefined} />
                  <Stat label="Dépassement signé" value={opRes.signedOverflow ? 'oui' : 'non'} tone={opRes.signedOverflow ? 'destructive' : 'success'} />
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {op === 'sub' && <>La soustraction se fait en ajoutant l'opposé : on calcule le complément à deux de B puis on additionne ; la retenue finale est ignorée. </>}
              {(op === 'add' || op === 'sub') &&
                (opRes.signedOverflow ? (
                  <span className="text-destructive">
                    Dépassement de capacité : le vrai résultat ne tient pas sur {n} bits en complément à deux (on obtient un résultat de signe incohérent).
                  </span>
                ) : opRes.carryOut && op === 'add' ? (
                  <span className="text-warning">La retenue sortante est perdue : pour des entiers naturels, le résultat est faux (il est calculé modulo 2<sup>{n}</sup> = {M}).</span>
                ) : (
                  <>Le résultat tient sur {n} bits.</>
                ))}
              {(op === 'and' || op === 'or' || op === 'xor') && <>Opération bit à bit : chaque colonne est calculée indépendamment, sans retenue.</>}
            </p>
          </div>
        )}
      </div>
    </WidgetFrame>
  )
}
