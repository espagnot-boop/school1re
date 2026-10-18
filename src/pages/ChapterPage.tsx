import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ChevronRight, Clock, Eye, EyeOff, FileText, Lightbulb, MousePointerClick, PenLine, Printer, Star, Target } from 'lucide-react'
import { Tabs, Segmented } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BlockRenderer, headingId } from '@/components/content/BlockRenderer'
import { RichText, plain } from '@/components/content/RichText'
import { DynamicIcon } from '@/components/SubjectIcon'
import { chaptersOf, getChapter, useChapter } from '@/content'
import { subjectById } from '@/content/subjects'
import type { Block, Exercise } from '@/content/types'
import { useProgress } from '@/hooks/useProfile'
import { cn } from '@/lib/utils'

type Tab = 'fiche' | 'cours' | 'exercices' | 'representations'
const TABS: Tab[] = ['fiche', 'cours', 'exercices', 'representations']

const DIFF = {
  1: { label: 'Application', cls: 'text-success border-success/40 bg-success/10' },
  2: { label: 'Entraînement', cls: 'text-warning border-warning/40 bg-warning/10' },
  3: { label: 'Approfondissement', cls: 'text-destructive border-destructive/40 bg-destructive/10' },
} as const

function ExerciseCard({ ex, index, doneKey }: { ex: Exercise; index: number; doneKey: string }) {
  const [hints, setHints] = useState(0)
  const [showSol, setShowSol] = useState(false)
  const { progress, setExercise } = useProgress()
  const done = !!progress.exercises[doneKey]
  const d = DIFF[ex.difficulty] ?? DIFF[1]
  return (
    <article id={`ex-${ex.id}`} className={cn('scroll-mt-24 border bg-card', done && 'border-success/50')}>
      <header className="flex flex-wrap items-center gap-3 border-b px-4 py-3">
        <span className="flex size-8 items-center justify-center border bg-background font-mono text-sm font-semibold">{index + 1}</span>
        <div className="min-w-0 flex-1">
          <div className="font-semibold">
            <RichText text={ex.title} />
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className={cn('inline-flex items-center gap-1 border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide', d.cls)}>
              {'■'.repeat(ex.difficulty)}
              {'□'.repeat(3 - ex.difficulty)} {d.label}
            </span>
            {ex.duration && (
              <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                <Clock className="size-3" /> {ex.duration} min
              </span>
            )}
            {ex.tags?.map((t) => (
              <span key={t} className="font-mono text-[11px] text-muted-foreground">
                #{t}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setExercise(doneKey, !done)}
          className={cn('inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-medium transition-colors', done ? 'border-success bg-success text-white' : 'hover:bg-accent')}
        >
          <Check className="size-3.5" /> {done ? 'Réussi' : 'Marquer réussi'}
        </button>
      </header>
      <div className="prose-pc px-5 py-3">
        <BlockRenderer blocks={ex.statement} />
      </div>
      {(ex.hints?.length ?? 0) > 0 && (
        <div className="border-t px-5 py-3">
          {ex.hints!.slice(0, hints).map((h, i) => (
            <div key={i} className="mb-2 flex gap-2 border-l-2 border-warning bg-warning/5 px-3 py-2 text-sm">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-warning" />
              <span>
                <span className="font-semibold">Indice {i + 1}. </span>
                <RichText text={h} />
              </span>
            </div>
          ))}
          {hints < ex.hints!.length && (
            <Button variant="ghost" size="sm" onClick={() => setHints((h) => h + 1)}>
              <Lightbulb /> {hints === 0 ? 'Besoin d’un indice ?' : 'Indice suivant'} ({hints}/{ex.hints!.length})
            </Button>
          )}
        </div>
      )}
      <div className="border-t">
        <button onClick={() => setShowSol((s) => !s)} className="flex w-full items-center justify-between px-5 py-3 text-sm font-medium hover:bg-accent/50">
          <span className="flex items-center gap-2">
            {showSol ? <EyeOff className="size-4" /> : <Eye className="size-4" />} {showSol ? 'Masquer le corrigé' : 'Voir le corrigé'}
          </span>
          <ChevronRight className={cn('size-4 transition-transform', showSol && 'rotate-90')} />
        </button>
        {showSol && (
          <div className="prose-pc animate-fade-in border-t bg-muted/20 px-5 py-3">
            <BlockRenderer blocks={ex.solution} />
          </div>
        )}
      </div>
    </article>
  )
}

function Toc({ blocks }: { blocks: Block[] }) {
  const heads = useMemo(() => (blocks ?? []).filter((b): b is Extract<Block, { type: 'h2' }> => b.type === 'h2'), [blocks])
  if (heads.length < 2) return null
  return (
    <nav className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto xl:block">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Sur cette page</div>
      <ul className="grid gap-1 border-l text-sm">
        {heads.map((h, i) => (
          <li key={i}>
            <a href={`#${headingId(h.text)}`} onClick={(e) => { e.preventDefault(); document.getElementById(headingId(h.text))?.scrollIntoView({ behavior: 'smooth' }) }} className="-ml-px block border-l border-transparent py-0.5 pl-3 text-muted-foreground hover:border-foreground hover:text-foreground">
              {plain(h.text)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function ChapterPage() {
  const { subject = '', chapter = '' } = useParams()
  const [params, setParams] = useSearchParams()
  const s = subjectById(subject)
  const meta = getChapter(subject, chapter)
  const { chapter: ch, error } = useChapter(meta)
  const { progress, markSeen, toggleMastered, toggleFavorite } = useProgress()
  const [diff, setDiff] = useState<'all' | '1' | '2' | '3'>('all')
  const key = `${subject}/${chapter}`
  const tabParam = params.get('tab') as Tab | null
  const tab: Tab = tabParam && TABS.includes(tabParam) ? tabParam : 'fiche'

  useEffect(() => {
    if (meta) markSeen(key)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, !!meta])
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [tab])

  if (!s || !meta) return <Navigate to={s ? `/app/matiere/${subject}` : '/app'} replace />
  if (!ch)
    return (
      <div className="container max-w-6xl py-8">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{meta.theme}</div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{plain(meta.title)}</h1>
        {error ? (
          <p className="mt-6 text-sm text-destructive">Impossible de charger ce chapitre. Vérifie ta connexion puis recharge la page.</p>
        ) : (
          <div className="mt-8 grid max-w-3xl gap-3">
            {[80, 95, 60, 90, 70].map((w, i) => (
              <div key={i} className="h-4 animate-pulse bg-muted" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}
      </div>
    )

  const list = chaptersOf(subject)
  const idx = list.findIndex((c) => c.id === ch.id)
  const prev = list[idx - 1]
  const next = list[idx + 1]
  const mastered = !!progress.mastered[key]
  const fav = !!progress.favorites[key]
  const exDone = ch.exercices.filter((e) => progress.exercises[`${key}/${e.id}`]).length
  const exList = diff === 'all' ? ch.exercices : ch.exercices.filter((e) => String(e.difficulty) === diff)
  const setTab = (t: Tab) => setParams(t === 'fiche' ? {} : { tab: t }, { replace: true })
  const tocBlocks = tab === 'fiche' ? ch.fiche : tab === 'cours' ? ch.cours : tab === 'representations' ? ch.representations : []

  return (
    <div>
      {/* En-tête */}
      <div className="relative border-b">
        <div className="absolute inset-y-0 left-0 w-1" style={{ background: `hsl(${s.hue} 70% 55%)` }} />
        <div className="container max-w-6xl pb-0 pt-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/app" className="hover:text-foreground">
              Accueil
            </Link>
            <ChevronRight className="size-3" />
            <Link to={`/app/matiere/${s.id}`} className="flex items-center gap-1 hover:text-foreground">
              <DynamicIcon name={s.icon} className="size-3" /> {s.name}
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground">Chapitre {ch.order}</span>
          </div>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 max-w-3xl">
              {ch.theme && <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{ch.theme}</div>}
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                <RichText text={ch.title} />
              </h1>
              <p className="mt-2 text-muted-foreground">
                <RichText text={ch.summary} />
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => toggleFavorite(key)} className={cn(fav && 'border-warning text-warning')}>
                <Star className={cn(fav && 'fill-current')} /> {fav ? 'Favori' : 'Ajouter aux favoris'}
              </Button>
              <Button size="sm" variant={mastered ? 'default' : 'outline'} onClick={() => toggleMastered(key)} className={cn(mastered && 'bg-success text-white hover:bg-success/90')}>
                <CheckCircle2 /> {mastered ? 'Maîtrisé' : 'Marquer maîtrisé'}
              </Button>
            </div>
          </div>
          {ch.objectives?.length > 0 && (
            <details className="group mt-5 max-w-3xl border bg-card">
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-2.5 text-sm font-medium">
                <Target className="size-4" /> Objectifs du programme ({ch.objectives.length})
                <ChevronRight className="ml-auto size-4 transition-transform group-open:rotate-90" />
              </summary>
              <ul className="grid gap-1.5 border-t px-4 py-3 text-sm">
                {ch.objectives.map((o, i) => (
                  <li key={i} className="flex gap-2">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                    <span>
                      <RichText text={o} />
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          )}
          <div className="scrollbar-thin -mb-px mt-6 overflow-x-auto">
            <Tabs
              value={tab}
              onChange={setTab}
              className="border-b-0"
              items={[
                { value: 'fiche', label: 'Fiche', icon: <FileText /> },
                { value: 'cours', label: 'Cours', icon: <BookOpen /> },
                { value: 'exercices', label: 'Exercices', icon: <PenLine />, count: ch.exercices.length },
                { value: 'representations', label: 'Représentation', icon: <MousePointerClick />, count: ch.representations.length },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="container max-w-6xl py-8">
        <div className={cn('grid gap-10', tab !== 'exercices' && 'xl:grid-cols-[minmax(0,1fr)_200px]')}>
          <div className="min-w-0">
            {tab === 'fiche' && (
              <div className="animate-fade-in">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <Badge variant="outline">Fiche de révision</Badge>
                  <Button variant="ghost" size="sm" onClick={() => window.print()}>
                    <Printer /> Imprimer
                  </Button>
                </div>
                <div className="prose-pc max-w-3xl border bg-card p-5 sm:p-8">
                  <BlockRenderer blocks={ch.fiche} />
                </div>
              </div>
            )}
            {tab === 'cours' && (
              <div className="prose-pc max-w-3xl animate-fade-in">
                <BlockRenderer blocks={ch.cours} />
              </div>
            )}
            {tab === 'exercices' && (
              <div className="animate-fade-in">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-mono text-foreground">{exDone}</span>/{ch.exercices.length} exercices réussis
                  </div>
                  <Segmented
                    value={diff}
                    onChange={setDiff}
                    options={[
                      { value: 'all', label: 'Tous' },
                      { value: '1', label: '■ Application' },
                      { value: '2', label: '■■ Entraînement' },
                      { value: '3', label: '■■■ Approfondissement' },
                    ]}
                  />
                </div>
                <div className="grid max-w-4xl gap-5">
                  {exList.map((ex) => (
                    <ExerciseCard key={ex.id} ex={ex} index={ch.exercices.indexOf(ex)} doneKey={`${key}/${ex.id}`} />
                  ))}
                  {exList.length === 0 && <div className="border border-dashed p-8 text-center text-sm text-muted-foreground">Aucun exercice de ce niveau.</div>}
                </div>
              </div>
            )}
            {tab === 'representations' && (
              <div className="prose-pc max-w-4xl animate-fade-in">
                <BlockRenderer blocks={ch.representations} />
              </div>
            )}

            {/* Navigation */}
            <div className="mt-12 grid max-w-4xl gap-px border bg-border sm:grid-cols-2">
              {prev ? (
                <Link to={`/app/matiere/${s.id}/${prev.id}`} className="group bg-card p-4 hover:bg-accent/50">
                  <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    <ArrowLeft className="size-3" /> Précédent
                  </div>
                  <div className="mt-1 font-medium">{plain(prev.title)}</div>
                </Link>
              ) : (
                <div className="bg-card" />
              )}
              {next ? (
                <Link to={`/app/matiere/${s.id}/${next.id}`} className="group bg-card p-4 text-right hover:bg-accent/50">
                  <div className="flex items-center justify-end gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Suivant <ArrowRight className="size-3" />
                  </div>
                  <div className="mt-1 font-medium">{plain(next.title)}</div>
                </Link>
              ) : (
                <div className="bg-card" />
              )}
            </div>
          </div>
          {tab !== 'exercices' && <Toc blocks={tocBlocks} />}
        </div>
      </div>
    </div>
  )
}
