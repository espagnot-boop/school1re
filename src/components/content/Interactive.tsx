import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, Check, ChevronLeft, ChevronRight, RotateCcw, Shuffle, X, Eye, Lightbulb } from 'lucide-react'
import { RichText } from './RichText'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/misc'
import { cn, shuffle } from '@/lib/utils'
import type { QcmQuestion } from '@/content/types'

function Shell({ label, title, children, right }: { label: string; title?: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="my-6 border bg-card">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 border bg-muted px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
          {title && (
            <span className="truncate text-sm font-semibold">
              <RichText text={title} />
            </span>
          )}
        </div>
        {right}
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

/* ---------------------------------- QCM ---------------------------------- */
export function Qcm({ questions }: { questions: QcmQuestion[] }) {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null))
  const done = answers.every((a) => a !== null)
  const score = answers.filter((a, i) => a === questions[i].answer).length
  const q = questions[idx]
  if (!q) return null
  const chosen = answers[idx]
  const reset = () => {
    setAnswers(questions.map(() => null))
    setIdx(0)
  }
  return (
    <Shell
      label="QCM"
      title={`${questions.length} questions`}
      right={
        <span className="font-mono text-xs text-muted-foreground">
          {answers.filter((a) => a !== null).length}/{questions.length} · score {score}
        </span>
      }
    >
      <Progress value={((idx + 1) / questions.length) * 100} className="mb-4" />
      <div className="mb-1 font-mono text-xs text-muted-foreground">Question {idx + 1}</div>
      <div className="mb-4 font-medium leading-relaxed">
        <RichText text={q.question} />
      </div>
      <div className="grid gap-2">
        {q.choices.map((c, i) => {
          const isRight = i === q.answer
          const picked = chosen === i
          return (
            <button
              key={i}
              disabled={chosen !== null}
              onClick={() => setAnswers((a) => a.map((v, j) => (j === idx ? i : v)))}
              className={cn(
                'flex items-start gap-3 border px-3 py-2.5 text-left text-sm transition-colors',
                chosen === null && 'hover:border-foreground/40 hover:bg-accent',
                chosen !== null && isRight && 'border-success bg-success/10',
                picked && !isRight && 'animate-shake border-destructive bg-destructive/10',
              )}
            >
              <span className={cn('flex size-5 shrink-0 items-center justify-center border font-mono text-[11px]', chosen !== null && isRight && 'border-success bg-success text-white', picked && !isRight && 'border-destructive bg-destructive text-white')}>
                {chosen !== null && isRight ? <Check className="size-3" /> : picked ? <X className="size-3" /> : String.fromCharCode(65 + i)}
              </span>
              <span className="min-w-0 flex-1">
                <RichText text={c} />
              </span>
            </button>
          )
        })}
      </div>
      {chosen !== null && q.explanation && (
        <div className="mt-4 border-l-2 border-info bg-info/5 px-3 py-2 text-sm">
          <RichText text={q.explanation} />
        </div>
      )}
      <div className="mt-4 flex items-center justify-between">
        <Button variant="outline" size="sm" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>
          <ChevronLeft /> Précédente
        </Button>
        {done && idx === questions.length - 1 ? (
          <div className="flex items-center gap-3">
            <span className={cn('font-mono text-sm', score / questions.length >= 0.7 ? 'text-success' : 'text-warning')}>
              {score}/{questions.length}
            </span>
            <Button size="sm" variant="outline" onClick={reset}>
              <RotateCcw /> Recommencer
            </Button>
          </div>
        ) : (
          <Button size="sm" disabled={idx === questions.length - 1} onClick={() => setIdx(idx + 1)}>
            Suivante <ChevronRight />
          </Button>
        )}
      </div>
    </Shell>
  )
}

/* ------------------------------- Flashcards ------------------------------ */
export function Flashcards({ cards }: { cards: { front: string; back: string }[] }) {
  const [order, setOrder] = useState(() => cards.map((_, i) => i))
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState<Record<number, boolean>>({})
  const card = cards[order[i]]
  if (!card) return null
  const go = (d: number) => {
    setFlipped(false)
    setI((x) => (x + d + cards.length) % cards.length)
  }
  return (
    <Shell
      label="Flashcards"
      title={`${cards.length} cartes`}
      right={
        <span className="font-mono text-xs text-muted-foreground">
          {Object.values(known).filter(Boolean).length} sues · {i + 1}/{cards.length}
        </span>
      }
    >
      <button
        onClick={() => setFlipped((f) => !f)}
        className={cn('relative flex min-h-[180px] w-full flex-col items-center justify-center border p-6 text-center transition-colors', flipped ? 'bg-primary text-primary-foreground' : 'bg-dots hover:bg-accent/50')}
      >
        <span className={cn('absolute left-3 top-2 font-mono text-[10px] uppercase tracking-widest', flipped ? 'text-primary-foreground/60' : 'text-muted-foreground')}>{flipped ? 'Réponse' : 'Question'}</span>
        <div className={cn('text-lg', !flipped && 'font-semibold')}>
          <RichText text={flipped ? card.back : card.front} />
        </div>
        {!flipped && <span className="absolute bottom-2 text-[11px] text-muted-foreground">Cliquer pour retourner</span>}
      </button>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Précédente">
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Suivante">
            <ChevronRight />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setOrder(shuffle(order, Date.now() % 9973))
              setI(0)
              setFlipped(false)
            }}
          >
            <Shuffle /> Mélanger
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setKnown((k) => ({ ...k, [order[i]]: false }))
              go(1)
            }}
          >
            <X /> À revoir
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setKnown((k) => ({ ...k, [order[i]]: true }))
              go(1)
            }}
          >
            <Check /> Je sais
          </Button>
        </div>
      </div>
    </Shell>
  )
}

/* --------------------------------- Cloze -------------------------------- */
const norm = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, "'")
    .replace(/\s+/g, ' ')

export function Cloze({ title, text }: { title?: string; text: string }) {
  const parts = useMemo(() => text.split(/(\{\{[^}]+\}\})/g), [text])
  const blanks = parts.filter((p) => p.startsWith('{{'))
  const [values, setValues] = useState<string[]>(() => blanks.map(() => ''))
  const [checked, setChecked] = useState(false)
  const [revealed, setRevealed] = useState(false)
  let b = -1
  const answersOf = (p: string) => p.slice(2, -2).split('|')
  const correct = blanks.map((p, i) => answersOf(p).some((a) => norm(a) === norm(values[i])))
  const score = correct.filter(Boolean).length
  return (
    <Shell label="Texte à trous" title={title} right={checked ? <span className="font-mono text-xs">{score}/{blanks.length}</span> : undefined}>
      <div className="leading-[2.4]">
        {parts.map((p, i) => {
          if (!p.startsWith('{{')) return <RichText key={i} text={p} />
          b++
          const j = b
          const ans = answersOf(p)[0]
          return (
            <input
              key={i}
              value={revealed ? ans : values[j]}
              onChange={(e) => {
                setChecked(false)
                setValues((v) => v.map((x, k) => (k === j ? e.target.value : x)))
              }}
              style={{ width: `${Math.max(5, ans.length + 2)}ch` }}
              className={cn(
                'mx-1 border-b-2 bg-muted/50 px-1.5 py-0.5 text-center font-medium outline-none focus:border-foreground',
                checked && (correct[j] ? 'border-success bg-success/10 text-success' : 'border-destructive bg-destructive/10 text-destructive'),
              )}
              aria-label={`Trou ${j + 1}`}
            />
          )
        })}
      </div>
      <div className="mt-4 flex gap-2">
        <Button size="sm" onClick={() => setChecked(true)}>
          <Check /> Vérifier
        </Button>
        <Button size="sm" variant="outline" onClick={() => setRevealed((r) => !r)}>
          <Eye /> {revealed ? 'Masquer' : 'Voir les réponses'}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setValues(blanks.map(() => ''))
            setChecked(false)
            setRevealed(false)
          }}
        >
          <RotateCcw />
        </Button>
      </div>
    </Shell>
  )
}

/* -------------------------------- Matching ------------------------------- */
export function Matching({ title, pairs }: { title?: string; pairs: { left: string; right: string }[] }) {
  const rights = useMemo(() => shuffle(pairs.map((_, i) => i), pairs.length * 7 + 3), [pairs])
  const [selLeft, setSelLeft] = useState<number | null>(null)
  const [matched, setMatched] = useState<Record<number, number>>({}) // left -> right index
  const [wrong, setWrong] = useState<number | null>(null)
  const usedRight = new Set(Object.values(matched))
  const pickRight = (r: number) => {
    if (selLeft === null || usedRight.has(r)) return
    if (r === selLeft) {
      setMatched((m) => ({ ...m, [selLeft]: r }))
      setSelLeft(null)
    } else {
      setWrong(r)
      setTimeout(() => setWrong(null), 400)
    }
  }
  const complete = Object.keys(matched).length === pairs.length
  return (
    <Shell
      label="Associer"
      title={title}
      right={
        <span className="font-mono text-xs text-muted-foreground">
          {Object.keys(matched).length}/{pairs.length}
          {complete && ' ✓'}
        </span>
      }
    >
      <p className="mb-3 text-xs text-muted-foreground">Sélectionne un élément à gauche puis son correspondant à droite.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="grid content-start gap-2">
          {pairs.map((p, i) => (
            <button
              key={i}
              disabled={matched[i] !== undefined}
              onClick={() => setSelLeft(i)}
              className={cn('border px-3 py-2 text-left text-sm transition-colors', matched[i] !== undefined ? 'border-success/50 bg-success/10 text-success' : selLeft === i ? 'border-foreground bg-accent' : 'hover:bg-accent')}
            >
              <RichText text={p.left} />
            </button>
          ))}
        </div>
        <div className="grid content-start gap-2">
          {rights.map((r) => (
            <button
              key={r}
              disabled={usedRight.has(r)}
              onClick={() => pickRight(r)}
              className={cn('border px-3 py-2 text-left text-sm transition-colors', usedRight.has(r) ? 'border-success/50 bg-success/10 text-success' : wrong === r ? 'animate-shake border-destructive bg-destructive/10' : 'hover:bg-accent')}
            >
              <RichText text={pairs[r].right} />
            </button>
          ))}
        </div>
      </div>
      {complete && (
        <div className="mt-3 flex items-center justify-between text-sm text-success">
          <span>Bravo, tout est associé !</span>
          <Button size="sm" variant="outline" onClick={() => setMatched({})}>
            <RotateCcw /> Rejouer
          </Button>
        </div>
      )}
    </Shell>
  )
}

/* -------------------------------- Ordering ------------------------------- */
export function Ordering({ title, items }: { title?: string; items: string[] }) {
  const initial = useMemo(() => {
    let s = shuffle(items.map((_, i) => i), items.length * 13 + 5)
    if (s.every((v, i) => v === i) && s.length > 1) s = [...s.slice(1), s[0]]
    return s
  }, [items])
  const [order, setOrder] = useState(initial)
  const [checked, setChecked] = useState(false)
  const move = (i: number, d: number) => {
    const j = i + d
    if (j < 0 || j >= order.length) return
    setChecked(false)
    setOrder((o) => {
      const n = o.slice()
      ;[n[i], n[j]] = [n[j], n[i]]
      return n
    })
  }
  const ok = order.every((v, i) => v === i)
  return (
    <Shell label="Remettre dans l'ordre" title={title}>
      <ol className="grid gap-2">
        {order.map((v, i) => (
          <li key={v} className={cn('flex items-center gap-2 border px-2 py-1.5 text-sm', checked && (v === i ? 'border-success/60 bg-success/10' : 'border-destructive/60 bg-destructive/10'))}>
            <span className="w-6 text-center font-mono text-xs text-muted-foreground">{i + 1}</span>
            <span className="flex-1">
              <RichText text={items[v]} />
            </span>
            <Button size="icon" variant="ghost" className="size-7" onClick={() => move(i, -1)} aria-label="Monter">
              <ArrowUp />
            </Button>
            <Button size="icon" variant="ghost" className="size-7" onClick={() => move(i, 1)} aria-label="Descendre">
              <ArrowDown />
            </Button>
          </li>
        ))}
      </ol>
      <div className="mt-3 flex items-center gap-3">
        <Button size="sm" onClick={() => setChecked(true)}>
          <Check /> Vérifier
        </Button>
        <Button size="sm" variant="ghost" onClick={() => { setOrder(initial); setChecked(false) }}>
          <RotateCcw />
        </Button>
        {checked && <span className={cn('text-sm', ok ? 'text-success' : 'text-destructive')}>{ok ? 'Parfait, ordre correct !' : 'Pas encore : les éléments en rouge sont mal placés.'}</span>}
      </div>
    </Shell>
  )
}

/* ------------------------------- True/False ------------------------------ */
export function TrueFalse({ title, statements }: { title?: string; statements: { text: string; answer: boolean; explanation?: string }[] }) {
  const [ans, setAns] = useState<(boolean | null)[]>(() => statements.map(() => null))
  const score = ans.filter((a, i) => a === statements[i].answer).length
  return (
    <Shell label="Vrai ou faux" title={title} right={<span className="font-mono text-xs text-muted-foreground">{score}/{statements.length}</span>}>
      <div className="grid gap-2">
        {statements.map((s, i) => {
          const a = ans[i]
          const right = a !== null && a === s.answer
          return (
            <div key={i} className={cn('border p-3', a !== null && (right ? 'border-success/50 bg-success/5' : 'border-destructive/50 bg-destructive/5'))}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1 text-sm">
                  <RichText text={s.text} />
                </div>
                <div className="flex shrink-0">
                  {[true, false].map((v) => (
                    <button
                      key={String(v)}
                      disabled={a !== null}
                      onClick={() => setAns((x) => x.map((y, j) => (j === i ? v : y)))}
                      className={cn('border px-3 py-1 text-xs font-medium', !v && '-ml-px', a === v ? (right ? 'bg-success text-white' : 'bg-destructive text-white') : 'hover:bg-accent')}
                    >
                      {v ? 'Vrai' : 'Faux'}
                    </button>
                  ))}
                </div>
              </div>
              {a !== null && (
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className={cn('font-semibold', right ? 'text-success' : 'text-destructive')}>{right ? 'Exact.' : `Non : c'est ${s.answer ? 'vrai' : 'faux'}.`}</span> {s.explanation && <RichText text={s.explanation} />}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <Button size="sm" variant="ghost" className="mt-3" onClick={() => setAns(statements.map(() => null))}>
        <RotateCcw /> Recommencer
      </Button>
    </Shell>
  )
}

/* --------------------------------- Reveal -------------------------------- */
export function Reveal({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="my-4 border">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium hover:bg-accent">
        <span className="flex items-center gap-2">
          <Lightbulb className="size-4 text-warning" />
          <RichText text={title} />
        </span>
        <span className="font-mono text-xs text-muted-foreground">{open ? 'masquer' : 'révéler'}</span>
      </button>
      {open && <div className="animate-fade-in border-t px-4 py-2">{children}</div>}
    </div>
  )
}
