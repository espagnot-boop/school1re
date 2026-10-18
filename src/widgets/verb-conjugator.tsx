import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, Eye, EyeOff, RefreshCw, X } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { Segmented } from '@/components/ui/tabs'
import { Stat, Switch } from '@/components/ui/misc'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  ES_IMP_PERSONS,
  ES_IRREGULAR_LIST,
  ES_PERSONS,
  ES_PERSONS_SHORT,
  ES_SUGGESTIONS,
  ES_TENSES,
  ES_TENSE_INFO,
  conjugateEs,
  stripAccents,
  type EsTense,
} from './_nsi1/spanish'
import { EN_SUGGESTIONS, EN_TENSES, IRREGULARS, SUBJECTS, enForms, sentence, type Sentence, type Subject, type Voice } from './_nsi1/english'

interface Props {
  lang?: 'es' | 'en'
  verb?: string
}

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[’']/g, "'")

// ============================================================== ESPAGNOL
function EsTable({ verb, highlight }: { verb: string; highlight: boolean }) {
  const c = useMemo(() => conjugateEs(verb), [verb])
  const plain = useMemo(() => conjugateEs(verb, { plain: true }), [verb])
  if (!c) return <p className="text-sm text-destructive">Infinitif non reconnu : il doit se terminer par -ar, -er ou -ir (éventuellement suivi de -se).</p>
  const diff = (t: EsTense, i: number) => highlight && plain && stripAccents(c.forms[t][i]) !== stripAccents(plain.forms[t][i])
  const diffAcc = (t: EsTense, i: number) => highlight && plain && c.forms[t][i] !== plain.forms[t][i]
  const compoundAux = ['he', 'has', 'ha', 'hemos', 'habéis', 'han']
  const partOnly = c.part
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xl font-semibold">{c.inf}</span>
        <Badge variant="outline">-{c.group}</Badge>
        {c.tags.length === 0 && <Badge variant="success">régulier</Badge>}
        {c.tags.map((t) => (
          <Badge key={t} variant={t === 'irrégulier' ? 'destructive' : 'warning'}>
            {t}
          </Badge>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Stat label="Gerundio" value={c.ger} />
        <Stat label="Participio" value={c.part} />
        <Stat label="Pretérito perfecto" value={`${c.reflexive ? 'me ' : ''}he ${partOnly}`} />
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {ES_TENSES.map((t) => {
          const info = ES_TENSE_INFO[t]
          const isImp = t === 'imp'
          return (
            <div key={t} className="border bg-background">
              <div className="border-b px-3 py-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold">{info.es}</span>
                  <span className="text-[11px] text-muted-foreground">{info.fr}</span>
                </div>
                <div className="text-[11px] text-muted-foreground">{info.tip}</div>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {(isImp ? [1, 2, 3, 4, 5] : [0, 1, 2, 3, 4, 5]).map((i) => (
                    <tr key={i} className="border-t first:border-t-0">
                      <td className="w-[38%] px-3 py-1 text-xs text-muted-foreground">{isImp ? ES_IMP_PERSONS[i] : ES_PERSONS[i]}</td>
                      <td className={cn('px-2 py-1 font-medium', diff(t, i) ? 'text-warning' : diffAcc(t, i) ? 'text-info' : '')}>
                        {c.forms[t][i]}
                        {t === 'subjImp' && <span className="ml-2 text-xs font-normal text-muted-foreground">/ {c.subjImpSe[i]}</span>}
                      </td>
                      {isImp && <td className="px-2 py-1 text-xs text-muted-foreground">{c.impNeg[i]}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
      {highlight && (
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-warning">En orange</span> : formes qui s’écartent du modèle régulier (irrégularité, diphtongue, changement orthographique).{' '}
          <span className="font-medium text-info">En bleu</span> : seul l’accent écrit diffère.
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        Temps composés : <b>haber</b> conjugué + participe invariable ({compoundAux.slice(0, 3).map((a) => `${a} ${c.part}`).join(', ')}…). Impératif négatif : no + subjonctif présent.
      </p>
      {c.notes.length > 0 && (
        <ul className="list-disc pl-5 text-xs text-muted-foreground">
          {c.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

type Pool = 'irr' | 'all' | 'verb'

function EsQuiz({ verb }: { verb: string }) {
  const [tenses, setTenses] = useState<EsTense[]>(['pres', 'indef', 'imperf', 'subj'])
  const [pool, setPool] = useState<Pool>('irr')
  const [q, setQ] = useState<{ verb: string; tense: EsTense; person: number; answer: string; alt: string[] } | null>(null)
  const [ans, setAns] = useState('')
  const [res, setRes] = useState<'ok' | 'accent' | 'ko' | null>(null)
  const [score, setScore] = useState({ ok: 0, total: 0, streak: 0 })
  const inp = useRef<HTMLInputElement>(null)

  const next = () => {
    const verbs = pool === 'irr' ? ES_IRREGULAR_LIST : pool === 'all' ? ES_SUGGESTIONS : [verb]
    const ts = tenses.length ? tenses : ES_TENSES
    for (let k = 0; k < 50; k++) {
      const v = verbs[Math.floor(Math.random() * verbs.length)]
      const t = ts[Math.floor(Math.random() * ts.length)]
      const c = conjugateEs(v)
      if (!c) continue
      const person = t === 'imp' ? 1 + Math.floor(Math.random() * 5) : Math.floor(Math.random() * 6)
      const a = c.forms[t][person]
      if (!a || a === '—') continue
      setQ({ verb: v, tense: t, person, answer: a, alt: t === 'subjImp' ? [c.subjImpSe[person]] : [] })
      setAns('')
      setRes(null)
      requestAnimationFrame(() => inp.current?.focus())
      return
    }
  }
  useEffect(next, [pool, tenses.join(), verb]) // eslint-disable-line react-hooks/exhaustive-deps

  const check = () => {
    if (!q || res) return
    const a = norm(ans)
    const goods = [q.answer, ...q.alt].map(norm)
    let r: 'ok' | 'accent' | 'ko' = 'ko'
    if (goods.includes(a)) r = 'ok'
    else if (goods.map(stripAccents).includes(stripAccents(a))) r = 'accent'
    setRes(r)
    setScore((s) => ({ ok: s.ok + (r === 'ok' ? 1 : 0), total: s.total + 1, streak: r === 'ok' ? s.streak + 1 : 0 }))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1">
        {ES_TENSES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTenses((ts) => (ts.includes(t) ? ts.filter((x) => x !== t) : [...ts, t]))}
            className={cn('border px-2 py-1 text-xs', tenses.includes(t) ? 'bg-primary text-primary-foreground' : 'hover:bg-accent')}
          >
            {ES_TENSE_INFO[t].es}
          </button>
        ))}
      </div>
      <Segmented
        value={pool}
        onChange={setPool}
        options={[
          { value: 'irr', label: '25 irréguliers' },
          { value: 'all', label: 'Verbes variés' },
          { value: 'verb', label: `Seulement « ${verb} »` },
        ]}
        className="self-start"
      />
      {q && (
        <div className="border bg-background p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">
            {ES_TENSE_INFO[q.tense].es} <span className="normal-case">({ES_TENSE_INFO[q.tense].fr})</span>
          </div>
          <div className="mt-1 text-lg">
            <b>{q.verb}</b> → <span className="text-muted-foreground">{q.tense === 'imp' ? `${ES_IMP_PERSONS[q.person]} (affirmatif)` : ES_PERSONS[q.person]}</span>
          </div>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              if (res) next()
              else check()
            }}
          >
            <Input
              ref={inp}
              value={ans}
              onChange={(e) => setAns(e.target.value)}
              placeholder="Ta réponse…"
              autoCapitalize="off"
              autoComplete="off"
              spellCheck={false}
              className={cn('font-medium', res === 'ok' && 'border-success', res === 'ko' && 'border-destructive', res === 'accent' && 'border-warning')}
            />
            <Button type="submit">{res ? 'Suivant' : 'Valider'}</Button>
          </form>
          <div className="mt-1 flex flex-wrap gap-1">
            {['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü'].map((ch) => (
              <button key={ch} type="button" className="h-7 w-7 border text-sm hover:bg-accent" onClick={() => setAns((a) => a + ch)}>
                {ch}
              </button>
            ))}
          </div>
          {res && (
            <div className={cn('mt-3 flex items-center gap-2 text-sm', res === 'ok' ? 'text-success' : res === 'accent' ? 'text-warning' : 'text-destructive')}>
              {res === 'ok' ? <Check className="size-4" /> : <X className="size-4" />}
              {res === 'ok' ? 'Correct !' : res === 'accent' ? 'Presque : attention à l’accent écrit.' : 'Non.'} Réponse : <b>{q.answer}</b>
              {q.alt.length > 0 && <span className="text-muted-foreground">(ou {q.alt.join(', ')})</span>}
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-3 gap-2">
        <Stat label="Score" value={`${score.ok} / ${score.total}`} tone="info" />
        <Stat label="Réussite" value={score.total ? `${Math.round((100 * score.ok) / score.total)} %` : '—'} />
        <Stat label="Série" value={score.streak} tone={score.streak >= 5 ? 'success' : undefined} />
      </div>
    </div>
  )
}

// ============================================================== ANGLAIS
function EnTenses({ verb }: { verb: string }) {
  const f = useMemo(() => enForms(verb), [verb])
  const [subj, setSubj] = useState<Subject>('he')
  const [type, setType] = useState<Sentence>('aff')
  const [voice, setVoice] = useState<Voice>('active')
  const [contr, setContr] = useState(false)
  if (!f) return <p className="text-sm text-destructive">Saisis un verbe anglais à la base verbale (ex. go, play, remember).</p>
  const groups: { id: (typeof EN_TENSES)[number]['group']; label: string }[] = [
    { id: 'present', label: 'Présent' },
    { id: 'past', label: 'Passé' },
    { id: 'future', label: 'Futur' },
    { id: 'conditional', label: 'Conditionnel' },
  ]
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xl font-semibold">to {f.base}</span>
        <Badge variant={f.irregular ? 'destructive' : 'success'}>{f.irregular ? 'irrégulier' : 'régulier'}</Badge>
        {f.fr && <span className="text-sm text-muted-foreground">{f.fr}</span>}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        <Stat label="Base verbale" value={f.base} />
        <Stat label="3e pers. (V-s)" value={f.s3} />
        <Stat label="Prétérit" value={f.pretAll.join(' / ')} tone={f.irregular ? 'warning' : undefined} />
        <Stat label="Participe passé" value={f.ppAll.join(' / ')} tone={f.irregular ? 'warning' : undefined} />
        <Stat label="V-ing" value={f.ing} />
      </div>
      {f.base === 'lie' && <p className="text-xs text-muted-foreground">Attention : lie, lay, lain = être allongé ; lie, lied, lied = mentir (régulier).</p>}
      <div className="flex flex-wrap items-center gap-2">
        <Segmented value={subj} onChange={setSubj} options={SUBJECTS.map((s) => ({ value: s, label: s }))} />
        <Segmented
          value={type}
          onChange={setType}
          options={[
            { value: 'aff', label: 'affirmative' },
            { value: 'neg', label: 'négative' },
            { value: 'int', label: 'interrogative' },
          ]}
        />
        <Segmented
          value={voice}
          onChange={setVoice}
          options={[
            { value: 'active', label: 'actif' },
            { value: 'passive', label: 'passif' },
          ]}
        />
        <Switch checked={contr} onChange={setContr} label="contractions" />
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.id} className="border bg-background">
            <div className="border-b px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{g.label}</div>
            {EN_TENSES.filter((t) => t.group === g.id).map((t) => {
              const s = sentence(t.id, subj, f, voice, type, contr)
              return (
                <div key={t.id} className="border-t px-3 py-1.5 first:border-t-0" title={t.tip}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs font-medium">{t.en}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{voice === 'passive' ? 'be (au temps voulu) + V-en' : t.form}</span>
                  </div>
                  <div className={cn('text-sm', s ? 'font-medium' : 'text-muted-foreground')}>{s ?? '— (forme inusitée)'}</div>
                  <div className="text-[11px] text-muted-foreground">{t.tip}</div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      {voice === 'passive' && <p className="text-xs text-muted-foreground">Le passif (be + participe passé) n’a de sens qu’avec un verbe transitif : The museum was created in 1793.</p>}
    </div>
  )
}

type Hide = 'none' | 'base' | 'pret' | 'pp' | 'fr'

function EnIrregulars({ onPick }: { onPick: (v: string) => void }) {
  const [q, setQ] = useState('')
  const [hide, setHide] = useState<Hide>('none')
  const [shown, setShown] = useState<Set<string>>(new Set())
  useEffect(() => setShown(new Set()), [hide])
  const list = IRREGULARS.filter((v) => {
    const s = norm(q)
    if (!s) return true
    return v.base.includes(s) || v.pret.some((x) => x.includes(s)) || v.pp.some((x) => x.includes(s)) || v.fr.toLowerCase().includes(s)
  })
  const cell = (key: string, col: Hide, text: string) => {
    if (hide !== col || shown.has(key)) return text
    return (
      <button type="button" className="border border-dashed px-2 text-muted-foreground hover:bg-accent" onClick={() => setShown((s) => new Set(s).add(key))}>
        ?
      </button>
    )
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Chercher (anglais ou français)…" className="max-w-xs" />
        <span className="text-xs text-muted-foreground">Masquer :</span>
        <Segmented
          value={hide}
          onChange={setHide}
          options={[
            { value: 'none', label: 'rien' },
            { value: 'base', label: 'base' },
            { value: 'pret', label: 'prétérit' },
            { value: 'pp', label: 'participe' },
            { value: 'fr', label: 'français' },
          ]}
        />
      </div>
      <div className="max-h-[440px] overflow-auto border">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-muted text-left text-xs text-muted-foreground">
            <tr>
              <th className="px-3 py-1.5 font-medium">Base verbale</th>
              <th className="px-3 py-1.5 font-medium">Prétérit</th>
              <th className="px-3 py-1.5 font-medium">Participe passé</th>
              <th className="px-3 py-1.5 font-medium">Français</th>
            </tr>
          </thead>
          <tbody>
            {list.map((v) => (
              <tr key={v.base} className="border-t hover:bg-accent/50">
                <td className="px-3 py-1 font-medium">
                  {hide === 'base' && !shown.has(v.base + 'b') ? (
                    cell(v.base + 'b', 'base', v.base)
                  ) : (
                    <button type="button" className="hover:underline" onClick={() => onPick(v.base)} title="Voir les temps de ce verbe">
                      {v.base}
                    </button>
                  )}
                </td>
                <td className="px-3 py-1">{cell(v.base + 'p', 'pret', v.pret.join(' / '))}</td>
                <td className="px-3 py-1">{cell(v.base + 'pp', 'pp', v.pp.join(' / '))}</td>
                <td className="px-3 py-1 text-muted-foreground">{cell(v.base + 'f', 'fr', v.fr)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">
        {list.length} verbe{list.length > 1 ? 's' : ''} affiché{list.length > 1 ? 's' : ''} sur {IRREGULARS.length}. Variantes : la forme britannique en -t (learnt) est donnée avant la forme en -ed (learned), plus
        courante en américain ; gotten est américain.
      </p>
    </div>
  )
}

function matches(answer: string, allowed: string[]): boolean {
  const parts = norm(answer)
    .split(/\s*(?:\/|,|\bor\b|\s)\s*/)
    .filter(Boolean)
  const ok = allowed.map((a) => a.toLowerCase())
  return parts.length > 0 && parts.every((p) => ok.includes(p))
}

function EnQuiz() {
  const [dir, setDir] = useState<'forms' | 'fr'>('forms')
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * IRREGULARS.length))
  const [a, setA] = useState({ base: '', pret: '', pp: '' })
  const [done, setDone] = useState<null | { base: boolean; pret: boolean; pp: boolean }>(null)
  const [score, setScore] = useState({ ok: 0, total: 0, streak: 0 })
  const first = useRef<HTMLInputElement>(null)
  const v = IRREGULARS[idx]
  const next = () => {
    let n = idx
    while (n === idx) n = Math.floor(Math.random() * IRREGULARS.length)
    setIdx(n)
    setA({ base: '', pret: '', pp: '' })
    setDone(null)
    requestAnimationFrame(() => first.current?.focus())
  }
  const check = () => {
    const r = { base: dir === 'forms' || norm(a.base) === v.base, pret: matches(a.pret, v.pret), pp: matches(a.pp, v.pp) }
    setDone(r)
    const all = r.base && r.pret && r.pp
    setScore((s) => ({ ok: s.ok + (all ? 1 : 0), total: s.total + 1, streak: all ? s.streak + 1 : 0 }))
  }
  const field = (k: 'base' | 'pret' | 'pp', label: string, sol: string, withRef: boolean) => (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <Input
        ref={withRef ? first : undefined}
        value={a[k]}
        onChange={(e) => setA((x) => ({ ...x, [k]: e.target.value }))}
        disabled={!!done}
        autoCapitalize="off"
        autoComplete="off"
        spellCheck={false}
        className={cn(done && (done[k] ? 'border-success' : 'border-destructive'))}
      />
      {done && !done[k] && <span className="text-xs text-destructive">→ {sol}</span>}
    </div>
  )
  return (
    <div className="flex flex-col gap-4">
      <Segmented
        value={dir}
        onChange={(d) => {
          setDir(d)
          next()
        }}
        options={[
          { value: 'forms', label: 'Base → prétérit, participe' },
          { value: 'fr', label: 'Français → les 3 formes' },
        ]}
        className="self-start"
      />
      <form
        className="border bg-background p-4"
        onSubmit={(e) => {
          e.preventDefault()
          if (done) next()
          else check()
        }}
      >
        <div className="text-lg">
          {dir === 'forms' ? (
            <>
              <b>to {v.base}</b> <span className="text-sm text-muted-foreground">({v.fr})</span>
            </>
          ) : (
            <b>{v.fr}</b>
          )}
        </div>
        <div className={cn('mt-3 grid gap-2', dir === 'fr' ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
          {dir === 'fr' && field('base', 'Base verbale', v.base, true)}
          {field('pret', 'Prétérit', v.pret.join(' / '), dir === 'forms')}
          {field('pp', 'Participe passé', v.pp.join(' / '), false)}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <Button type="submit">{done ? 'Suivant' : 'Valider'}</Button>
          {done && (
            <span className={cn('text-sm', done.base && done.pret && done.pp ? 'text-success' : 'text-destructive')}>
              {done.base && done.pret && done.pp ? 'Parfait !' : `${v.base} – ${v.pret.join('/')} – ${v.pp.join('/')}`}
            </span>
          )}
        </div>
      </form>
      <div className="grid grid-cols-3 gap-2">
        <Stat label="Score" value={`${score.ok} / ${score.total}`} tone="info" />
        <Stat label="Réussite" value={score.total ? `${Math.round((100 * score.ok) / score.total)} %` : '—'} />
        <Stat label="Série" value={score.streak} tone={score.streak >= 5 ? 'success' : undefined} />
      </div>
    </div>
  )
}

// ============================================================== WIDGET
type EsMode = 'conj' | 'quiz'
type EnMode = 'temps' | 'irreg' | 'quiz'

export default function VerbConjugator({ lang: lang0 = 'es', verb: verb0 }: Props) {
  const [lang, setLang] = useState<'es' | 'en'>(lang0 === 'en' ? 'en' : 'es')
  const defVerb = (l: 'es' | 'en') => (verb0 && l === lang0 ? verb0 : l === 'es' ? 'tener' : 'go')
  const [verbs, setVerbs] = useState({ es: lang0 === 'es' ? verb0 ?? 'tener' : 'tener', en: lang0 === 'en' ? verb0 ?? 'go' : 'go' })
  const [draft, setDraft] = useState(verbs[lang])
  const [esMode, setEsMode] = useState<EsMode>('conj')
  const [enMode, setEnMode] = useState<EnMode>('temps')
  const [highlight, setHighlight] = useState(true)

  useEffect(() => {
    setVerbs((v) => ({ ...v, [lang0 === 'en' ? 'en' : 'es']: defVerb(lang0 === 'en' ? 'en' : 'es') }))
    setLang(lang0 === 'en' ? 'en' : 'es')
  }, [lang0, verb0]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => setDraft(verbs[lang]), [lang, verbs])

  const verb = verbs[lang]
  const setVerb = (v: string) => {
    const clean = v.trim().toLowerCase()
    if (!clean) return
    setVerbs((x) => ({ ...x, [lang]: clean }))
  }
  // mise à jour à la frappe si le verbe est reconnu
  useEffect(() => {
    const t = setTimeout(() => {
      const d = draft.trim().toLowerCase()
      if (!d || d === verbs[lang]) return
      const ok = lang === 'es' ? !!conjugateEs(d) : !!enForms(d)
      if (ok) setVerbs((x) => ({ ...x, [lang]: d }))
    }, 350)
    return () => clearTimeout(t)
  }, [draft, lang]) // eslint-disable-line react-hooks/exhaustive-deps

  const suggestions = lang === 'es' ? ES_SUGGESTIONS : EN_SUGGESTIONS
  const chips = lang === 'es' ? ['ser', 'estar', 'ir', 'tener', 'hacer', 'decir', 'poder', 'pedir', 'dormir', 'jugar', 'hablar', 'comer', 'vivir', 'irse'] : EN_SUGGESTIONS.slice(0, 14)
  const showVerbInput = lang === 'es' || enMode === 'temps'
  const listId = `verbs-${lang}`

  const controls = (
    <>
      <div className="flex flex-col gap-1.5">
        <Label>Langue</Label>
        <Segmented
          value={lang}
          onChange={setLang}
          options={[
            { value: 'es', label: 'Español' },
            { value: 'en', label: 'English' },
          ]}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Mode</Label>
        {lang === 'es' ? (
          <Segmented
            value={esMode}
            onChange={setEsMode}
            options={[
              { value: 'conj', label: 'Conjugaison' },
              { value: 'quiz', label: 'Quiz' },
            ]}
          />
        ) : (
          <Segmented
            value={enMode}
            onChange={setEnMode}
            options={[
              { value: 'temps', label: 'Temps' },
              { value: 'irreg', label: 'Irréguliers' },
              { value: 'quiz', label: 'Quiz' },
            ]}
          />
        )}
      </div>
      {showVerbInput && (
        <div className="flex flex-col gap-1.5">
          <Label>{lang === 'es' ? 'Infinitivo' : 'Base verbale'}</Label>
          <form
            className="flex gap-1"
            onSubmit={(e) => {
              e.preventDefault()
              setVerb(draft)
            }}
          >
            <Input value={draft} onChange={(e) => setDraft(e.target.value)} list={listId} autoCapitalize="off" autoComplete="off" spellCheck={false} />
            <Button type="submit" size="icon" variant="outline" aria-label="Conjuguer">
              <RefreshCw />
            </Button>
          </form>
          <datalist id={listId}>
            {suggestions.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
          <div className="flex flex-wrap gap-1">
            {chips.map((c) => (
              <button key={c} type="button" onClick={() => setVerbs((x) => ({ ...x, [lang]: c }))} className={cn('border px-1.5 py-0.5 text-xs', verb === c ? 'bg-primary text-primary-foreground' : 'hover:bg-accent')}>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
      {lang === 'es' && esMode === 'conj' && (
        <Switch checked={highlight} onChange={setHighlight} label={highlight ? <span className="inline-flex items-center gap-1"><Eye className="size-3.5" /> irrégularités surlignées</span> : <span className="inline-flex items-center gap-1"><EyeOff className="size-3.5" /> sans surlignage</span>} />
      )}
    </>
  )

  return (
    <WidgetFrame
      title={lang === 'es' ? 'Conjugador español' : 'English verbs'}
      subtitle={lang === 'es' ? 'Réguliers -ar / -er / -ir, irréguliers, diphtongues, pronominaux' : 'Temps et aspects, verbes irréguliers, quiz'}
      controls={controls}
      footer={
        lang === 'es' ? (
          <span>
            Espagnol : le pronom sujet est souvent omis (<i>{ES_PERSONS_SHORT[0]} tengo</i> → <i>tengo</i>). Le subjonctif imparfait se forme sur la 3e personne du pluriel de l’indéfini
            (tuvieron → tuviera).
          </span>
        ) : (
          <span>
            Anglais : un temps = un temps grammatical (présent / prétérit) + éventuellement un aspect (be + V-ing, have + V-en). Le futur et le conditionnel passent par les modaux will et would.
          </span>
        )
      }
    >
      {lang === 'es' ? (
        esMode === 'conj' ? (
          <EsTable verb={verb} highlight={highlight} />
        ) : (
          <EsQuiz verb={verb} />
        )
      ) : enMode === 'temps' ? (
        <EnTenses verb={verb} />
      ) : enMode === 'irreg' ? (
        <EnIrregulars
          onPick={(v) => {
            setVerbs((x) => ({ ...x, en: v }))
            setEnMode('temps')
          }}
        />
      ) : (
        <EnQuiz />
      )}
    </WidgetFrame>
  )
}
