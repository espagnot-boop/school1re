import { useEffect, useMemo, useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { Segmented } from '@/components/ui/tabs'
import { Stat } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { cn } from '@/lib/utils'
import {
  SPEC,
  decompToRat,
  decompose,
  exactDecimal,
  fracSteps,
  fromBits,
  parseDecimalRat,
  pythonRepr,
  rAdd,
  rDiv,
  rMul,
  rSub,
  rat,
  ratToDec,
  ratToSci,
  roundTo,
  shortest,
  toBits,
  type Fmt,
  type Rat,
} from './_nsi1/ieee'

interface Props {
  /** Valeur initiale (défaut 0,1) */
  value?: number
}

type View = 'decomp' | 'methode' | 'somme'

const COLORS = {
  sign: '0 84% 60%',
  exp: '217 91% 60%',
  frac: '142 71% 45%',
}

const PRESETS = ['0.1', '0.2', '0.1 + 0.2', '0.3', '-6.5', '1/3', '1', '2.5e-3', '16777217', '1e16 + 1']

const fr = (s: string) => s.replace('-', '−').replace('.', ',')

interface Parsed {
  x: number
  exact: Rat | null
  label: string
}

const NUM = String.raw`[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:[eE][+-]?\d+)?`

function parseInput(src: string, f: Fmt): Parsed | null {
  const t = src.trim().replace(/[−–]/g, '-').replace(/\s+/g, ' ')
  const low = t.toLowerCase()
  if (['inf', '+inf', 'infinity', 'infini', '+infini', '∞'].includes(low)) return { x: Infinity, exact: null, label: '+∞' }
  if (['-inf', '-infinity', '-infini', '-∞'].includes(low)) return { x: -Infinity, exact: null, label: '−∞' }
  if (low === 'nan') return { x: NaN, exact: null, label: 'NaN' }
  const single = new RegExp(`^${NUM}$`)
  if (single.test(t)) {
    const r = parseDecimalRat(t)
    if (!r) return null
    const x = roundTo(Number(t.replace(',', '.')), f)
    return { x, exact: r, label: t }
  }
  const m = new RegExp(`^(${NUM}) ?([+\\-*/×÷]) ?(${NUM})$`).exec(t)
  if (m) {
    const A = parseDecimalRat(m[1])
    const B = parseDecimalRat(m[3])
    if (!A || !B) return null
    const a = roundTo(Number(m[1].replace(',', '.')), f)
    const b = roundTo(Number(m[3].replace(',', '.')), f)
    const op = m[2]
    let x: number
    let exact: Rat | null
    if (op === '+') {
      x = a + b
      exact = rAdd(A, B)
    } else if (op === '-') {
      x = a - b
      exact = rSub(A, B)
    } else if (op === '*' || op === '×') {
      x = a * b
      exact = rMul(A, B)
    } else {
      x = a / b
      exact = B.n === 0n ? null : rDiv(A, B)
    }
    return { x: roundTo(x, f), exact, label: t }
  }
  return null
}

function SciTex({ r, digits = 4 }: { r: Rat; digits?: number }) {
  const s = ratToSci(r, digits)
  if (!s) return <Tex>0</Tex>
  const m = s.mant.replace(',', '{,}')
  return <Tex>{`${s.neg ? '-' : ''}${s.exp === 0 ? m : `${m} \\times 10^{${s.exp}}`}`}</Tex>
}

function LongNumber({ s, max = 90 }: { s: string; max?: number }) {
  const [open, setOpen] = useState(false)
  const long = s.length > max
  return (
    <span className="break-all font-mono text-xs">
      {long && !open ? s.slice(0, max) + '…' : s}
      {long && (
        <button type="button" className="ml-2 text-[11px] text-info underline-offset-2 hover:underline" onClick={() => setOpen(!open)}>
          {open ? 'réduire' : `tout afficher (${s.replace(/[^0-9]/g, '').length} chiffres)`}
        </button>
      )}
    </span>
  )
}

function BitsView({ bits, f, onToggle, compact }: { bits: bigint; f: Fmt; onToggle?: (i: number) => void; compact?: boolean }) {
  const { exp, frac } = SPEC[f]
  const total = 1 + exp + frac
  const arr = Array.from({ length: total }, (_, i) => Number((bits >> BigInt(total - 1 - i)) & 1n))
  const part = (i: number) => (i === 0 ? 'sign' : i <= exp ? 'exp' : 'frac')
  const groups: { key: 'sign' | 'exp' | 'frac'; label: string; from: number; to: number }[] = [
    { key: 'sign', label: 's', from: 0, to: 1 },
    { key: 'exp', label: `exposant (${exp} bits)`, from: 1, to: 1 + exp },
    { key: 'frac', label: `mantisse (${frac} bits)`, from: 1 + exp, to: total },
  ]
  const cell = f === 32 ? (compact ? 'h-6 w-[18px] text-[11px]' : 'h-8 w-[22px] text-xs') : compact ? 'h-5 w-[13px] text-[10px]' : 'h-7 w-[15px] text-[11px]'
  return (
    <div className="flex flex-wrap items-end gap-x-2 gap-y-2">
      {groups.map((g) => (
        <div key={g.key} className="flex flex-col">
          {!compact && (
            <span className="mb-1 text-[10px] font-medium uppercase tracking-wide" style={{ color: `hsl(${COLORS[g.key]})` }}>
              {g.label}
            </span>
          )}
          <div className="flex flex-wrap">
            {arr.slice(g.from, g.to).map((b, j) => {
              const i = g.from + j
              const c = COLORS[part(i)]
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!onToggle}
                  onClick={() => onToggle?.(total - 1 - i)}
                  title={`bit ${total - 1 - i}`}
                  className={cn('flex items-center justify-center border-y border-r font-mono font-semibold first:border-l', cell, !onToggle && 'cursor-default')}
                  style={{
                    background: b ? `hsl(${c})` : `hsl(${c} / 0.1)`,
                    color: b ? 'white' : `hsl(${c})`,
                    borderColor: `hsl(${c} / 0.5)`,
                  }}
                >
                  {b}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function FloatIEEE754({ value = 0.1 }: Props) {
  const init = typeof value === 'number' ? pythonRepr(value).replace(/\.0$/, '').replace('nan', 'NaN') : '0.1'
  const [src, setSrc] = useState(init)
  const [f, setF] = useState<Fmt>(64)
  const [view, setView] = useState<View>('decomp')
  useEffect(() => setSrc(init), [init])

  const parsed = useMemo(() => parseInput(src, f), [src, f])
  const [lastOk, setLastOk] = useState<Parsed | null>(null)
  useEffect(() => {
    if (parsed) setLastOk(parsed)
  }, [parsed])
  const cur = parsed ?? lastOk ?? { x: roundTo(0.1, f), exact: rat(1n, 10n), label: '0.1' }
  const x = roundTo(cur.x, f)

  const { exp, frac, bias } = SPEC[f]
  const d = decompose(x, f)
  const bits = toBits(x, f)
  const finite = d.kind !== 'inf' && d.kind !== 'nan'
  const stored = finite ? decompToRat(d) : null
  const exactStr = finite ? (d.sign ? '-' : '') + exactDecimal(d.m, d.k) : d.kind === 'inf' ? (d.sign ? '−∞' : '+∞') : 'NaN'
  const err = stored && cur.exact ? rSub(stored, cur.exact) : null
  const relErr = err && cur.exact && cur.exact.n !== 0n ? rDiv(err, cur.exact) : null
  const fracBin = d.F.toString(2).padStart(frac, '0')
  const fracTrim = fracBin.replace(/0+$/, '')
  const lead = d.kind === 'normal' ? '1' : '0'
  const eReal = d.kind === 'normal' ? d.E - bias : 1 - bias
  const ulpExp = eReal - frac

  const toggle = (pos: number) => {
    const nb = bits ^ (1n << BigInt(pos))
    const nx = fromBits(nb, f)
    setSrc(Number.isNaN(nx) ? 'NaN' : !Number.isFinite(nx) ? (nx > 0 ? 'inf' : '-inf') : shortest(nx, f))
  }

  const changeFmt = (nf: Fmt) => setF(nf)

  // --- méthode des multiplications successives
  const method = useMemo(() => {
    const r = cur.exact
    if (!r) return null
    const absN = r.n < 0n ? -r.n : r.n
    const ip = absN / r.d
    const fs = fracSteps(r, 40)
    return { ip, ...fs }
  }, [cur.exact])

  // --- 0,1 + 0,2
  const sum = useMemo(() => {
    const a = roundTo(0.1, f)
    const b = roundTo(0.2, f)
    const s = roundTo(a + b, f)
    const c = roundTo(0.3, f)
    const ex = (v: number) => {
      const dd = decompose(v, f)
      return exactDecimal(dd.m, dd.k)
    }
    return { a, b, s, c, ea: ex(a), eb: ex(b), es: ex(s), ec: ex(c), equal: s === c }
  }, [f])

  const controls = (
    <>
      <div className="flex flex-col gap-1.5">
        <Label>Format</Label>
        <Segmented
          value={String(f) as '32' | '64'}
          onChange={(v) => changeFmt(Number(v) as Fmt)}
          options={[
            { value: '32', label: 'simple (32 bits)' },
            { value: '64', label: 'double (64 bits)' },
          ]}
        />
        <p className="text-[11px] text-muted-foreground">Python utilise toujours le format double (64 bits) pour ses <code>float</code>.</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Nombre ou calcul</Label>
        <Input value={src} onChange={(e) => setSrc(e.target.value)} className={cn('font-mono', !parsed && 'border-destructive')} spellCheck={false} />
        {!parsed && <p className="text-xs text-destructive">Saisie non reconnue (ex. 0,1 · -6.5 · 1/3 · 0.1 + 0.2 · 1e-3 · inf).</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Exemples</Label>
        <div className="flex flex-wrap gap-1">
          {PRESETS.map((p) => (
            <Button key={p} size="xs" variant="outline" onClick={() => setSrc(p)} className="font-mono">
              {fr(p).replace(/\./g, ',')}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Valeurs particulières</Label>
        <div className="flex flex-wrap gap-1">
          <Button size="xs" variant="outline" onClick={() => setSrc('-0')}>
            −0
          </Button>
          <Button size="xs" variant="outline" onClick={() => setSrc(shortest(fromBits(1n, f), f))}>
            plus petit dénormalisé
          </Button>
          <Button size="xs" variant="outline" onClick={() => setSrc(shortest(fromBits(1n << BigInt(frac), f), f))}>
            plus petit normalisé
          </Button>
          <Button size="xs" variant="outline" onClick={() => setSrc(shortest(fromBits(((1n << BigInt(exp)) - 2n) << BigInt(frac) | ((1n << BigInt(frac)) - 1n), f), f))}>
            maximum
          </Button>
          <Button size="xs" variant="outline" onClick={() => setSrc('inf')}>
            +∞
          </Button>
          <Button size="xs" variant="outline" onClick={() => setSrc('NaN')}>
            NaN
          </Button>
        </div>
      </div>
    </>
  )

  const kindLabel = { zero: 'zéro', subnormal: 'dénormalisé', normal: 'normalisé', inf: 'infini', nan: 'NaN (pas un nombre)' }[d.kind]

  return (
    <WidgetFrame
      title="Flottants IEEE 754"
      subtitle={`Format ${f === 32 ? 'simple précision : 1 + 8 + 23 bits' : 'double précision : 1 + 11 + 52 bits'} — biais ${bias}`}
      controls={controls}
      footer={
        err && err.n !== 0n ? (
          <span>
            <b>{fr(cur.label).replace(/\./g, ',')}</b> n'est pas représentable exactement : le flottant stocké est le plus proche parmi ceux de la forme{' '}
            <Tex>{`m \\times 2^{k}`}</Tex>. Son écriture binaire est infinie ou trop longue, la mantisse est arrondie à {frac} bits.
          </span>
        ) : err ? (
          <span>
            Ce nombre est <b className="text-success">représentable exactement</b> : c'est une somme finie de puissances de 2 qui tient dans les {frac + 1} bits significatifs.
          </span>
        ) : (
          <span>
            Valeur spéciale : exposant stocké à {exp === 8 ? '255' : '2047'} (tous les bits à 1). {d.kind === 'nan' ? 'NaN est le résultat de 0/0 ou inf − inf ; NaN ≠ NaN.' : 'Résultat d’un dépassement de capacité.'}
          </span>
        )
      }
    >
      <div className="flex flex-col gap-4">
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: 'decomp', label: 'Décomposition' },
            { value: 'methode', label: 'Conversion en binaire' },
            { value: 'somme', label: '0,1 + 0,2 ≠ 0,3 ?' },
          ]}
          className="self-start"
        />

        {view === 'decomp' && (
          <>
            <BitsView bits={bits} f={f} onToggle={toggle} />
            <div className="font-mono text-[11px] text-muted-foreground">
              hexa : 0x{bits.toString(16).toUpperCase().padStart(f / 4, '0')} · cliquez sur un bit pour le basculer
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Stat label="Signe s" value={`${d.sign} (${d.sign ? 'négatif' : 'positif'})`} />
              <Stat label="Exposant stocké E" value={`${d.E}`} tone="info" />
              <Stat label={`Exposant réel E − ${bias}`} value={finite && d.kind !== 'zero' ? fr(String(eReal)) : '—'} />
              <Stat label="Catégorie" value={kindLabel} tone={d.kind === 'normal' ? 'success' : 'warning'} />
            </div>
            {finite && d.kind !== 'zero' && (
              <div className="overflow-x-auto border bg-background p-3 text-sm">
                <Tex display>
                  {`x = (-1)^{${d.sign}} \\times ${lead}{,}${fracTrim || '0'}_{2} \\times 2^{${d.kind === 'normal' ? `${d.E} - ${bias}` : `1 - ${bias}`}} = ${d.sign ? '-' : ''}${lead}{,}${fracTrim.length > 24 ? fracTrim.slice(0, 24) + '\\ldots' : fracTrim || '0'}_{2} \\times 2^{${eReal}}`}
                </Tex>
                {d.kind === 'subnormal' && <p className="text-xs text-warning">Nombre dénormalisé (E = 0) : pas de « 1 » implicite, l'exposant est fixé à 1 − {bias} = {1 - bias}.</p>}
              </div>
            )}
            <div className="grid gap-2">
              <div className="border bg-background px-3 py-2">
                <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Valeur exacte réellement stockée</div>
                <LongNumber s={fr(exactStr)} />
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="border bg-background px-3 py-2">
                  <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{f === 64 ? 'Python affiche' : 'Affichage le plus court'}</div>
                  <code className="font-mono text-sm">{f === 64 ? pythonRepr(x) : shortest(x, f)}</code>
                </div>
                <div className="border bg-background px-3 py-2">
                  <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Erreur d'arrondi</div>
                  {err ? <SciTex r={err} /> : <span className="text-sm text-muted-foreground">—</span>}
                  {relErr && relErr.n !== 0n && (
                    <div className="text-[11px] text-muted-foreground">
                      relative : <SciTex r={relErr} digits={3} />
                    </div>
                  )}
                </div>
                <div className="border bg-background px-3 py-2">
                  <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Écart au flottant suivant</div>
                  {finite ? <Tex>{`2^{${ulpExp}} \\approx ${(() => {
                    const s = ratToSci(ulpExp >= 0 ? rat(1n << BigInt(ulpExp)) : rat(1n, 1n << BigInt(-ulpExp)), 3)!
                    return `${s.mant.replace(',', '{,}')}${s.exp ? ` \\times 10^{${s.exp}}` : ''}`
                  })()}`}</Tex> : <span className="text-sm text-muted-foreground">—</span>}
                </div>
              </div>
            </div>
          </>
        )}

        {view === 'methode' && (
          <>
            {!method ? (
              <p className="text-sm text-muted-foreground">Saisissez un nombre fini pour voir sa conversion.</p>
            ) : (
              <>
                <p className="text-sm">
                  Partie entière : <b className="font-mono">{method.ip.toString()}</b> = <span className="font-mono">({method.ip.toString(2)})₂</span>. Partie décimale : on la{' '}
                  <b>multiplie par 2</b> ; la partie entière obtenue (0 ou 1) donne le bit suivant, on recommence avec la partie décimale.
                </p>
                <div className="max-h-[360px] overflow-auto border">
                  <table className="w-full font-mono text-xs tabular-nums">
                    <thead className="sticky top-0 bg-muted text-muted-foreground">
                      <tr>
                        <th className="px-2 py-1 text-left font-normal">étape</th>
                        <th className="px-2 py-1 text-left font-normal">calcul</th>
                        <th className="px-2 py-1 text-right font-normal">bit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {method.steps.map((s, i) => {
                        const inPeriod = method.period && i >= method.period[0] && i < method.period[1]
                        const prod = rat(s.before.n * 2n, s.before.d)
                        return (
                          <tr key={i} className={cn('border-t', inPeriod && 'bg-info/10')}>
                            <td className="px-2 py-0.5 text-muted-foreground">{i + 1}</td>
                            <td className="px-2 py-0.5">
                              {fr(ratToDec(s.before, 14)).replace(/\./g, ',')} × 2 = {fr(ratToDec(prod, 14)).replace(/\./g, ',')}
                            </td>
                            <td className="px-2 py-0.5 text-right font-semibold text-info">{s.bit}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="overflow-x-auto border bg-background p-3 text-sm">
                  {method.terminated ? (
                    <span>
                      Le développement s'arrête : <span className="font-mono">({method.ip.toString(2)},{method.steps.map((s) => s.bit).join('') || '0'})₂</span> est une écriture binaire{' '}
                      <b className="text-success">finie</b>.
                    </span>
                  ) : method.period ? (
                    <span>
                      On retombe sur une partie décimale déjà rencontrée : le développement est <b className="text-warning">périodique, donc infini</b> :{' '}
                      <span className="font-mono">
                        ({method.ip.toString(2)},{method.steps.slice(0, method.period[0]).map((s) => s.bit).join('')}
                        <span className="border-t border-foreground">{method.steps.slice(method.period[0], method.period[1]).map((s) => s.bit).join('')}</span>
                        …)₂
                      </span>
                      . Il faut donc l'arrondir pour le stocker sur {frac} bits de mantisse.
                    </span>
                  ) : (
                    <span>Le développement est long (au moins {method.steps.length} bits) : il sera arrondi.</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Un décimal <Tex>{'\\frac{p}{10^n}'}</Tex> a une écriture binaire finie si et seulement si, une fois la fraction simplifiée, son dénominateur est une puissance de 2.
                </p>
              </>
            )}
          </>
        )}

        {view === 'somme' && (
          <>
            <div className="overflow-x-auto border bg-background p-3 font-mono text-xs sm:text-sm">
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                <span className="text-muted-foreground">fl(0,1)</span>
                <span className="break-all">{fr(sum.ea)}</span>
                <span className="text-muted-foreground">fl(0,2)</span>
                <span className="break-all">{fr(sum.eb)}</span>
                <span className="text-muted-foreground">fl(0,1 + 0,2)</span>
                <span className={cn('break-all font-semibold', sum.equal ? 'text-success' : 'text-destructive')}>{fr(sum.es)}</span>
                <span className="text-muted-foreground">fl(0,3)</span>
                <span className={cn('break-all font-semibold', sum.equal ? 'text-success' : 'text-destructive')}>{fr(sum.ec)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">fl(0,1 + 0,2)</span>
              <BitsView bits={toBits(sum.s, f)} f={f} compact />
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">fl(0,3)</span>
              <BitsView bits={toBits(sum.c, f)} f={f} compact />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Stat label={f === 64 ? '0.1 + 0.2 (Python)' : '0,1 + 0,2 (32 bits)'} value={f === 64 ? pythonRepr(sum.s) : shortest(sum.s, f)} />
              <Stat label="0.1 + 0.2 == 0.3" value={sum.equal ? 'True' : 'False'} tone={sum.equal ? 'success' : 'destructive'} />
            </div>
            <p className="text-sm">
              {sum.equal ? (
                <>
                  En simple précision, les erreurs d'arrondi se compensent ici <b>par chance</b> et l'égalité est vraie. Passez en 64 bits : elle devient fausse ! Il ne faut jamais tester
                  l'égalité de deux flottants avec <code>==</code>.
                </>
              ) : (
                <>
                  0,1 et 0,2 sont chacun arrondis, puis la somme est arrondie à son tour : le résultat diffère de fl(0,3) d'un écart minuscule (dernier bit de mantisse). On compare donc deux
                  flottants avec une tolérance : <code>abs(a - b) &lt; 1e-9</code> ou <code>math.isclose(a, b)</code>.
                </>
              )}
            </p>
          </>
        )}
      </div>
    </WidgetFrame>
  )
}
