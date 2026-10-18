import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, Clock, Flame, Star } from 'lucide-react'
import { DynamicIcon } from '@/components/SubjectIcon'
import { Progress } from '@/components/ui/misc'
import { Button } from '@/components/ui/button'
import { useVisibleSubjects } from '@/components/AppLayout'
import { chaptersOf, getChapter } from '@/content'
import { subjectById, type SubjectMeta } from '@/content/subjects'
import { useProfile, useProgress } from '@/hooks/useProfile'
import { cn } from '@/lib/utils'

function greeting() {
  const h = new Date().getHours()
  return h < 6 ? 'Bonne nuit' : h < 18 ? 'Bonjour' : 'Bonsoir'
}

function SubjectCard({ s }: { s: SubjectMeta }) {
  const { progress } = useProgress()
  const chs = chaptersOf(s.id)
  const mastered = chs.filter((c) => progress.mastered[`${s.id}/${c.id}`]).length
  const seen = chs.filter((c) => progress.seen[`${s.id}/${c.id}`]).length
  const pct = chs.length ? (mastered / chs.length) * 100 : 0
  return (
    <Link to={`/app/matiere/${s.id}`} className="group relative flex flex-col bg-card p-5 transition-colors hover:bg-accent/50">
      <span className="absolute inset-x-0 top-0 h-0.5" style={{ background: `hsl(${s.hue} 70% 55%)` }} />
      <div className="flex items-start justify-between">
        <span className="flex size-10 items-center justify-center border" style={{ color: `hsl(${s.hue} 70% 50%)`, background: `hsl(${s.hue} 70% 55% / 0.08)` }}>
          <DynamicIcon name={s.icon} className="size-5" />
        </span>
        <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <div className="mt-4 font-semibold">{s.name}</div>
      <div className="mt-1 text-xs text-muted-foreground">
        {chs.length} chapitres · {seen} ouverts · {mastered} maîtrisés
      </div>
      <Progress value={pct} className="mt-4" />
    </Link>
  )
}

export default function Dashboard() {
  const { profile } = useProfile()
  const { progress } = useProgress()
  const { tronc, spe } = useVisibleSubjects()

  const recent = Object.entries(progress.seen)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([k, t]) => {
      const [sid, cid] = k.split('/')
      return { s: subjectById(sid), c: getChapter(sid, cid), t }
    })
    .filter((x) => x.s && x.c)

  const favs = Object.entries(progress.favorites)
    .filter(([, v]) => v)
    .map(([k]) => {
      const [sid, cid] = k.split('/')
      return { s: subjectById(sid), c: getChapter(sid, cid) }
    })
    .filter((x) => x.s && x.c)

  const visible = [...spe, ...tronc]
  const totalCh = visible.reduce((n, s) => n + chaptersOf(s.id).length, 0)
  const totalMastered = visible.reduce((n, s) => n + chaptersOf(s.id).filter((c) => progress.mastered[`${s.id}/${c.id}`]).length, 0)
  const exDone = Object.values(progress.exercises).filter(Boolean).length

  return (
    <div className="container max-w-6xl py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Tableau de bord</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            {greeting()}
            {profile.name ? `, ${profile.name}` : ''}.
          </h1>
          <p className="mt-1 text-muted-foreground">Qu’est-ce qu’on révise aujourd’hui ?</p>
        </div>
        {recent[0] && (
          <Link
            to={`/app/matiere/${recent[0].s!.id}/${recent[0].c!.id}`}
            className="inline-flex h-9 max-w-full items-center gap-2 bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 [&_svg]:size-4"
          >
            <span className="truncate">Reprendre : {recent[0].c!.title}</span> <ArrowRight />
          </Link>
        )}
      </div>

      <div className="mt-8 grid grid-cols-2 border sm:grid-cols-4">
        {[
          { icon: BookOpen, v: totalCh, l: 'chapitres au programme' },
          { icon: CheckCircle2, v: totalMastered, l: 'chapitres maîtrisés' },
          { icon: Flame, v: exDone, l: 'exercices réussis' },
          { icon: Star, v: favs.length, l: 'favoris' },
        ].map((x, i) => (
          <div key={x.l} className={cn('p-4', i > 0 && 'border-l', i === 2 && 'border-l-0 border-t sm:border-l sm:border-t-0', i === 3 && 'border-t sm:border-t-0')}>
            <x.icon className="size-4 text-muted-foreground" />
            <div className="mt-3 font-mono text-2xl font-semibold tabular-nums">{x.v}</div>
            <div className="text-xs text-muted-foreground">{x.l}</div>
          </div>
        ))}
      </div>

      {recent.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Clock className="size-4" /> Récemment ouverts
          </h2>
          <div className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {recent.map(({ s, c }) => (
              <Link key={s!.id + c!.id} to={`/app/matiere/${s!.id}/${c!.id}`} className="flex items-center gap-3 bg-card p-4 hover:bg-accent/50">
                <span className="flex size-8 shrink-0 items-center justify-center border" style={{ color: `hsl(${s!.hue} 70% 50%)` }}>
                  <DynamicIcon name={s!.icon} className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{c!.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">{s!.name}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {favs.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Star className="size-4" /> Favoris
          </h2>
          <div className="flex flex-wrap gap-2">
            {favs.map(({ s, c }) => (
              <Link key={s!.id + c!.id} to={`/app/matiere/${s!.id}/${c!.id}`} className="border bg-card px-3 py-1.5 text-sm hover:bg-accent">
                {c!.title} <span className="text-muted-foreground">· {s!.short}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold">Mes spécialités</h2>
        {spe.length === 0 ? (
          <Link to="/app/bienvenue" className="block border border-dashed p-6 text-center text-sm text-muted-foreground hover:bg-accent/40">
            Tu n’as pas encore choisi de spécialité. Choisir maintenant →
          </Link>
        ) : (
          <div className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {spe.map((s) => (
              <SubjectCard key={s.id} s={s} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold">Tronc commun</h2>
        <div className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {tronc.map((s) => (
            <SubjectCard key={s.id} s={s} />
          ))}
        </div>
      </section>
    </div>
  )
}
