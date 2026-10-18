import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Circle, CircleDot, Clock, FileText, PenLine, MousePointerClick } from 'lucide-react'
import { DynamicIcon } from '@/components/SubjectIcon'
import { Progress } from '@/components/ui/misc'
import { Badge } from '@/components/ui/badge'
import { chaptersOf } from '@/content'
import { subjectById } from '@/content/subjects'
import type { ChapterMeta } from '@/content'
import { useProgress } from '@/hooks/useProfile'

export default function SubjectPage() {
  const { subject = '' } = useParams()
  const s = subjectById(subject)
  const { progress } = useProgress()
  if (!s) return <Navigate to="/app" replace />
  const chs = chaptersOf(s.id)
  const mastered = chs.filter((c) => progress.mastered[`${s.id}/${c.id}`]).length

  const groups: { theme: string; list: ChapterMeta[] }[] = []
  for (const c of chs) {
    const t = c.theme ?? 'Chapitres'
    const g = groups.find((x) => x.theme === t)
    if (g) g.list.push(c)
    else groups.push({ theme: t, list: [c] })
  }

  return (
    <div>
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-grid opacity-70 [mask-image:linear-gradient(to_right,black,transparent)]" />
        <div className="absolute inset-y-0 left-0 w-1" style={{ background: `hsl(${s.hue} 70% 55%)` }} />
        <div className="container relative max-w-5xl py-10">
          <div className="flex flex-wrap items-start gap-5">
            <span className="flex size-14 items-center justify-center border bg-background" style={{ color: `hsl(${s.hue} 70% 50%)` }}>
              <DynamicIcon name={s.icon} className="size-7" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{s.category === 'tronc' ? 'Tronc commun' : 'Spécialité'}</Badge>
                <Badge variant="secondary">{s.hours}</Badge>
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">{s.name}</h1>
              <p className="mt-1 max-w-2xl text-muted-foreground">{s.description}</p>
            </div>
          </div>
          <div className="mt-6 flex max-w-md items-center gap-3">
            <Progress value={chs.length ? (mastered / chs.length) * 100 : 0} />
            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              {mastered}/{chs.length} maîtrisés
            </span>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl py-8">
        {chs.length === 0 && <div className="border border-dashed p-10 text-center text-muted-foreground">Les chapitres de cette matière arrivent très bientôt.</div>}
        {groups.map((g) => (
          <section key={g.theme} className="mb-10">
            <div className="mb-3 flex items-center gap-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{g.theme}</h2>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="divide-y border">
              {g.list.map((c) => {
                const key = `${s.id}/${c.id}`
                const isM = progress.mastered[key]
                const isS = progress.seen[key]
                return (
                  <Link key={c.id} to={`/app/matiere/${s.id}/${c.id}`} className="group grid grid-cols-[48px_1fr_auto] items-center gap-4 bg-card px-4 py-4 transition-colors hover:bg-accent/50 sm:grid-cols-[56px_1fr_auto]">
                    <span className="font-mono text-2xl font-semibold tabular-nums text-muted-foreground/60 group-hover:text-foreground">{String(c.order).padStart(2, '0')}</span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 font-semibold">
                        {isM ? <CheckCircle2 className="size-4 shrink-0 text-success" /> : isS ? <CircleDot className="size-4 shrink-0 text-muted-foreground" /> : <Circle className="size-4 shrink-0 text-muted-foreground/40" />}
                        <span className="truncate">{c.title}</span>
                      </span>
                      <span className="mt-0.5 line-clamp-2 block text-sm text-muted-foreground">{c.summary}</span>
                      <span className="mt-2 flex flex-wrap gap-3 font-mono text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="size-3" /> fiche + cours
                        </span>
                        <span className="flex items-center gap-1">
                          <PenLine className="size-3" /> {c.nExercices} exercices
                        </span>
                        <span className="flex items-center gap-1">
                          <MousePointerClick className="size-3" /> {c.nRepresentations} représentations
                        </span>
                        {c.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" /> {c.duration}
                          </span>
                        )}
                      </span>
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
