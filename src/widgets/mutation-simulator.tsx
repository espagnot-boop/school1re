import { useMemo, useState } from 'react'
import { Dices, RotateCcw } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { Segmented } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Stat } from '@/components/ui/misc'
import { cn } from '@/lib/utils'
import { AMINO, CLASS_COLOR, cleanDna, codonToAa, toRna, translateFromStart } from './_svt/genetics'

interface Props {
  sequence?: string
}

type Kind = 'sub' | 'ins' | 'del'
type EffectKey = 'none' | 'silent' | 'missense' | 'nonsense' | 'stoploss' | 'start' | 'frameshift' | 'inframe' | 'noncoding'

const DEFAULT_SEQ = 'ATGGTGCACCTGACTCCTGAGGAGAAGTAA'
const BASE_COLOR: Record<string, string> = { A: 'hsl(142 71% 45%)', T: 'hsl(0 84% 60%)', C: 'hsl(217 91% 60%)', G: 'hsl(25 95% 53%)' }

interface Mutation {
  kind: Kind
  pos: number // 1-based
  base: string
  count: number
}

function applyMutation(seq: string, m: Mutation): string {
  const i = m.pos - 1
  if (m.kind === 'sub') return seq.slice(0, i) + m.base + seq.slice(i + 1)
  if (m.kind === 'ins') return seq.slice(0, i) + m.base.repeat(m.count) + seq.slice(i)
  return seq.slice(0, i) + seq.slice(i + m.count)
}

interface Effect {
  key: EffectKey
  label: string
  tone: 'success' | 'warning' | 'destructive' | 'info' | undefined
  text: string
}

function classify(orig: string, mut: string, m: Mutation): Effect {
  if (orig === mut) return { key: 'none', label: 'Aucun changement', tone: undefined, text: 'La séquence est identique à l’originale (la base choisie est déjà celle en place).' }
  const o = translateFromStart(orig)
  const t = translateFromStart(mut)
  const codingEnd = o.start >= 0 ? o.start + o.codons.length * 3 : -1
  const inCoding = o.start >= 0 && m.pos - 1 + (m.kind === 'ins' ? 0 : m.count - 1) >= o.start && m.pos - 1 < codingEnd
  if (o.start < 0) return { key: 'noncoding', label: 'Pas de gène', tone: undefined, text: 'La séquence d’origine ne contient pas de codon AUG : il n’y a pas de protéine à comparer.' }
  const upstream = m.kind === 'ins' ? m.pos - 1 <= o.start : m.pos - 1 + (m.kind === 'del' ? m.count : 1) <= o.start
  const expectedStart = upstream ? o.start + (m.kind === 'ins' ? m.count : m.kind === 'del' ? -m.count : 0) : o.start
  if (t.start !== expectedStart) {
    return {
      key: 'start',
      label: 'Perte du codon d’initiation',
      tone: 'destructive',
      text: 'Le codon AUG initiateur est modifié : le ribosome ne démarre plus la traduction au bon endroit (voire pas du tout). La protéine normale n’est pas produite.',
    }
  }
  const same = o.aas.join('') === t.aas.join('') && o.stopped === t.stopped
  if (m.kind === 'sub') {
    if (same) {
      return inCoding
        ? { key: 'silent', label: 'Mutation silencieuse', tone: 'success', text: 'Le codon muté code le même acide aminé (le code génétique est redondant) : la séquence de la protéine est inchangée.' }
        : { key: 'noncoding', label: 'Hors région codante', tone: 'success', text: 'La mutation est située en dehors de la région traduite : la protéine n’est pas modifiée.' }
    }
    const d = o.aas.findIndex((a, i) => a !== t.aas[i])
    const dd = d < 0 ? Math.min(o.aas.length, t.aas.length) : d
    if (t.aas[dd] === '*') {
      return {
        key: 'nonsense',
        label: 'Mutation non-sens',
        tone: 'destructive',
        text: `Un codon stop apparaît au codon n° ${dd + 1} : la traduction s’arrête prématurément. Protéine tronquée (${dd} acides aminés au lieu de ${o.aas.filter((a) => a !== '*').length}), le plus souvent non fonctionnelle.`,
      }
    }
    if (o.aas[dd] === '*') {
      return {
        key: 'stoploss',
        label: 'Perte du codon stop',
        tone: 'warning',
        text: 'Le codon stop est transformé en codon d’acide aminé : la traduction se poursuit au-delà de la fin normale et la protéine est allongée.',
      }
    }
    const a = AMINO[o.aas[dd]]
    const b = AMINO[t.aas[dd]]
    const sameClass = a.cls === b.cls
    return {
      key: 'missense',
      label: 'Mutation faux-sens',
      tone: 'warning',
      text: `Un acide aminé est remplacé : ${a.abbr} → ${b.abbr} (position ${dd + 1} à partir de Met). ${
        sameClass ? 'Les deux acides aminés ont des propriétés voisines : l’effet est souvent modéré.' : 'Les propriétés chimiques changent (charge, polarité) : la structure et la fonction peuvent être altérées.'
      }${a.letter === 'E' && b.letter === 'V' ? ' C’est le type de substitution (GAG → GTG) à l’origine de la drépanocytose (hémoglobine S).' : ''}`,
    }
  }
  // insertion / délétion
  if (same) return { key: 'noncoding', label: 'Sans effet sur la protéine', tone: 'success', text: 'La séquence protéique reste identique (modification en dehors de la région traduite).' }
  if (m.count % 3 === 0) {
    const dn = t.aas.length - o.aas.length
    return {
      key: 'inframe',
      label: 'Cadre de lecture conservé',
      tone: 'warning',
      text: `${m.kind === 'ins' ? 'Insertion' : 'Délétion'} de ${m.count} nucléotides (multiple de 3) : le cadre de lecture est conservé. ${
        dn > 0 ? `${dn} acide(s) aminé(s) en plus` : dn < 0 ? `${-dn} acide(s) aminé(s) en moins` : 'Le nombre d’acides aminés est conservé'
      }, le reste de la protéine est inchangé (un acide aminé peut être modifié à la jonction).`,
    }
  }
  const d = o.aas.findIndex((a, i) => a !== t.aas[i])
  return {
    key: 'frameshift',
    label: 'Décalage du cadre de lecture',
    tone: 'destructive',
    text: `${m.kind === 'ins' ? 'Insertion' : 'Délétion'} de ${m.count} nucléotide${m.count > 1 ? 's' : ''} (non multiple de 3) : tous les codons situés en aval sont lus dans un autre cadre à partir du codon n° ${(d < 0 ? 0 : d) + 1}. ${
      t.stopped ? `Un codon stop apparaît ${t.aas.length < o.aas.length ? 'plus tôt' : 'plus tard'} : la protéine est ${t.aas.length < o.aas.length ? 'raccourcie' : 'modifiée'}` : 'Aucun stop n’est atteint dans la séquence'
    } et sa séquence est profondément modifiée.`,
  }
}

const BASES = ['A', 'T', 'C', 'G']
const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)]

export default function MutationSimulator({ sequence }: Props) {
  const initial = cleanDna(sequence ?? DEFAULT_SEQ, 90) || DEFAULT_SEQ
  const [seqInput, setSeqInput] = useState(initial)
  const orig = cleanDna(seqInput, 90)
  const N = orig.length
  const [kind, setKind] = useState<Kind>('sub')
  const [pos, setPos] = useState(Math.min(N, 20))
  const [base, setBase] = useState('T')
  const [count, setCount] = useState(1)

  const p = Math.min(Math.max(1, pos), Math.max(1, N))
  const mutation: Mutation = { kind, pos: p, base, count: kind === 'sub' ? 1 : count }
  const mut = useMemo(() => (N ? applyMutation(orig, mutation) : ''), [orig, kind, p, base, count]) // eslint-disable-line react-hooks/exhaustive-deps
  const eff = useMemo(() => (N ? classify(orig, mut, mutation) : null), [orig, mut]) // eslint-disable-line react-hooks/exhaustive-deps
  const o = translateFromStart(orig)
  const t = translateFromStart(mut)

  const setMutation = (m: Mutation) => {
    setKind(m.kind)
    setPos(m.pos)
    setBase(m.base)
    setCount(m.count)
  }

  const findPreset = (target: EffectKey) => {
    if (o.start < 0) return
    const cands: Mutation[] = []
    const codingEnd = o.start + o.codons.length * 3
    if (target === 'frameshift' || target === 'inframe') {
      for (let i = o.start + 3; i < Math.max(o.start + 4, codingEnd - 3); i++) {
        const kd: Kind = Math.random() < 0.5 ? 'del' : 'ins'
        const c = target === 'frameshift' ? (Math.random() < 0.7 ? 1 : 2) : 3
        const m: Mutation = { kind: kd, pos: i + 1, base: pick(BASES), count: c }
        if (kd === 'del' && i + c > N) continue
        if (classify(orig, applyMutation(orig, m), m).key === target) cands.push(m)
      }
    } else {
      for (let i = o.start; i < codingEnd; i++) {
        for (const b of BASES) {
          if (b === orig[i]) continue
          const m: Mutation = { kind: 'sub', pos: i + 1, base: b, count: 1 }
          if (classify(orig, applyMutation(orig, m), m).key === target) cands.push(m)
        }
      }
    }
    if (cands.length) setMutation(pick(cands))
  }

  const reset = () => {
    setKind('sub')
    setPos(Math.min(N, 20))
    setBase(orig[Math.min(N, 20) - 1] ?? 'A')
    setCount(1)
  }

  // marques pour l'affichage
  const origMarks = new Map<number, string>()
  const mutMarks = new Map<number, string>()
  if (N) {
    if (kind === 'sub') {
      origMarks.set(p - 1, 'sub')
      mutMarks.set(p - 1, 'sub')
    } else if (kind === 'del') {
      for (let i = 0; i < count; i++) origMarks.set(p - 1 + i, 'del')
    } else {
      origMarks.set(p - 1, 'site')
      for (let i = 0; i < count; i++) mutMarks.set(p - 1 + i, 'ins')
    }
  }

  const protOrig = o.aas
  const protMut = t.aas
  const nOrig = protOrig.filter((a) => a !== '*').length
  const nMut = protMut.filter((a) => a !== '*').length

  return (
    <WidgetFrame
      title="Simulateur de mutations"
      subtitle="Modifiez la séquence d’un gène (brin non transcrit, 5′→3′) et observez les conséquences sur la protéine"
      controls={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Séquence du gène (brin non transcrit)</Label>
            <Input value={seqInput} onChange={(e) => setSeqInput(cleanDna(e.target.value, 90))} className="font-mono uppercase tracking-wider" spellCheck={false} />
            <div className="text-[11px] text-muted-foreground">Le début de la traduction est le premier ATG.</div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Type de mutation</Label>
            <Segmented
              value={kind}
              onChange={(k) => setKind(k)}
              options={[
                { value: 'sub', label: 'Substitution' },
                { value: 'ins', label: 'Insertion' },
                { value: 'del', label: 'Délétion' },
              ]}
            />
          </div>
          {N > 1 && <Slider label={kind === 'ins' ? 'Insertion avant le nucléotide n°' : 'Position (nucléotide n°)'} value={p} min={1} max={N} step={1} digits={0} onChange={setPos} />}
          {kind !== 'sub' && <Slider label={kind === 'ins' ? 'Nombre de nucléotides insérés' : 'Nombre de nucléotides supprimés'} value={count} min={1} max={3} step={1} digits={0} onChange={setCount} />}
          {kind !== 'del' && (
            <div className="flex flex-col gap-1.5">
              <Label>{kind === 'sub' ? 'Nouvelle base' : 'Base insérée'}</Label>
              <div className="flex gap-1.5">
                {BASES.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBase(b)}
                    className={cn('size-9 border font-mono text-sm font-bold', base === b ? 'bg-primary text-primary-foreground' : 'hover:bg-accent')}
                    style={base === b ? undefined : { color: BASE_COLOR[b] }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <Label>Exemples à générer</Label>
            <div className="flex flex-wrap gap-1.5">
              <Button size="xs" variant="outline" onClick={() => findPreset('silent')}>Silencieuse</Button>
              <Button size="xs" variant="outline" onClick={() => findPreset('missense')}>Faux-sens</Button>
              <Button size="xs" variant="outline" onClick={() => findPreset('nonsense')}>Non-sens</Button>
              <Button size="xs" variant="outline" onClick={() => findPreset('frameshift')}>Décalage</Button>
              <Button size="xs" variant="outline" onClick={() => findPreset('inframe')}>Indel de 3 nt</Button>
            </div>
            <div className="flex gap-1.5">
              <Button
                size="xs"
                variant="ghost"
                onClick={() => {
                  if (!N) return
                  const kd = pick<Kind>(['sub', 'sub', 'ins', 'del'])
                  setMutation({ kind: kd, pos: 1 + Math.floor(Math.random() * N), base: pick(BASES), count: kd === 'sub' ? 1 : 1 + Math.floor(Math.random() * 2) })
                }}
              >
                <Dices /> Au hasard
              </Button>
              <Button size="xs" variant="ghost" onClick={reset}>
                <RotateCcw /> Réinitialiser
              </Button>
            </div>
          </div>
        </>
      }
      footer={
        eff ? (
          <div className="flex flex-col gap-1">
            <div className="text-sm font-semibold">{eff.label}</div>
            <p className="text-xs leading-relaxed">{eff.text}</p>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">Saisissez une séquence d’ADN (A, T, C, G).</span>
        )
      }
    >
      {N === 0 ? (
        <div className="p-6 text-center text-sm text-muted-foreground">Séquence vide.</div>
      ) : (
        <div className="space-y-3">
          <SeqPanel title="Séquence normale" seq={orig} start={o.start} marks={origMarks} onPick={(i) => setPos(i + 1)} />
          <SeqPanel title="Séquence mutée" seq={mut} start={t.start} marks={mutMarks} mutated />

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat label="Effet" value={eff?.label ?? '—'} tone={eff?.tone} className="col-span-2" />
            <Stat label="Protéine normale" value={`${nOrig} aa`} />
            <Stat label="Protéine mutée" value={t.start < 0 ? 'aucune' : `${nMut} aa`} tone={nMut !== nOrig ? 'warning' : undefined} />
          </div>

          <div className="border bg-background p-2">
            <div className="mb-1 text-xs font-semibold">Comparaison des protéines</div>
            <ProteinRow label="Normale" aas={protOrig} ref_={protOrig} />
            <ProteinRow label="Mutée" aas={protMut} ref_={protOrig} />
            <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1"><span className="inline-block size-2.5 border-2 border-destructive" /> différent de la protéine normale</span>
              <span>Couleur : nature de l’acide aminé (apolaire, polaire, basique, acide)</span>
            </div>
          </div>
        </div>
      )}
    </WidgetFrame>
  )
}

function SeqPanel({ title, seq, start, marks, mutated, onPick }: { title: string; seq: string; start: number; marks: Map<number, string>; mutated?: boolean; onPick?: (i: number) => void }) {
  // groupes : bases avant l'ATG, puis codons, puis queue
  const groups: { s: number; len: number; codon: boolean }[] = []
  if (start < 0) groups.push({ s: 0, len: seq.length, codon: false })
  else {
    if (start > 0) groups.push({ s: 0, len: start, codon: false })
    let i = start
    let stopped = false
    while (i + 3 <= seq.length && !stopped) {
      groups.push({ s: i, len: 3, codon: true })
      if (codonToAa(toRna(seq.slice(i, i + 3))) === '*') stopped = true
      i += 3
    }
    if (i < seq.length) groups.push({ s: i, len: seq.length - i, codon: false })
  }
  return (
    <div className="border bg-background p-2">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-semibold">{title}</span>
        <span className="font-mono text-[10px] text-muted-foreground">5′ … 3′ · {seq.length} nt</span>
      </div>
      <div className="flex flex-wrap gap-x-1.5 gap-y-2">
        {groups.map((g) => {
          const codonRna = g.codon ? toRna(seq.slice(g.s, g.s + 3)) : ''
          const aa = g.codon ? AMINO[codonToAa(codonRna)] : null
          return (
            <div key={g.s} className="flex flex-col items-center gap-0.5">
              <div className={cn('flex', g.codon ? 'border border-foreground/40 px-0.5' : 'opacity-60')}>
                {seq
                  .slice(g.s, g.s + g.len)
                  .split('')
                  .map((b, k) => {
                    const idx = g.s + k
                    const mk = marks.get(idx)
                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={!onPick}
                        onClick={() => onPick?.(idx)}
                        title={`Nucléotide n° ${idx + 1}`}
                        className={cn(
                          'h-6 w-[18px] font-mono text-[13px] font-bold leading-6',
                          onPick && 'cursor-pointer hover:bg-accent',
                          mk === 'sub' && 'bg-warning/30 outline outline-1 outline-warning',
                          mk === 'del' && 'bg-destructive/25 line-through outline outline-1 outline-destructive',
                          mk === 'ins' && 'bg-success/30 outline outline-1 outline-success',
                          mk === 'site' && 'border-l-2 border-primary',
                        )}
                        style={{ color: BASE_COLOR[b] }}
                      >
                        {b}
                      </button>
                    )
                  })}
              </div>
              {aa ? (
                <span className="px-1 text-[10px] font-semibold" style={{ background: `color-mix(in srgb, ${CLASS_COLOR[aa.cls]} 25%, transparent)` }}>
                  {aa.abbr}
                </span>
              ) : (
                <span className="h-[15px]" />
              )}
            </div>
          )
        })}
      </div>
      {mutated && <div className="mt-1 text-[10px] text-muted-foreground">Orange : base substituée · vert : bases insérées · rouge barré (séquence normale) : bases supprimées.</div>}
    </div>
  )
}

function ProteinRow({ label, aas, ref_ }: { label: string; aas: string[]; ref_: string[] }) {
  return (
    <div className="mb-1 flex items-center gap-2">
      <span className="w-14 shrink-0 text-[11px] font-medium text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-0.5">
        {aas.length === 0 && <span className="text-xs text-muted-foreground">aucune protéine</span>}
        {aas.map((a, i) => {
          const aa = AMINO[a]
          const diff = ref_[i] !== a
          return (
            <span
              key={i}
              className={cn('flex h-6 min-w-[30px] items-center justify-center border-2 px-1 text-[10px] font-semibold', diff ? 'border-destructive' : 'border-transparent')}
              style={{ background: `color-mix(in srgb, ${CLASS_COLOR[aa.cls]} ${aa.cls === 'stop' ? 15 : 28}%, transparent)` }}
              title={aa.name}
            >
              {aa.cls === 'stop' ? 'STOP' : aa.abbr}
            </span>
          )
        })}
      </div>
    </div>
  )
}
