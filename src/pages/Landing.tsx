import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, FileText, GraduationCap, KeyRound, Layers, MousePointerClick, NotebookPen, PenLine, Sparkles, Target, Moon, Sigma,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Logo, LogoMark, APP_NAME } from '@/components/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'
import { InviteDialog } from '@/components/InviteDialog'
import { DynamicIcon } from '@/components/SubjectIcon'
import { Tex } from '@/components/Tex'
import { SUBJECTS } from '@/content/subjects'
import { allChapters, chaptersOf } from '@/content'
import { useProfile } from '@/hooks/useProfile'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

function useStats() {
  return useMemo(() => {
    const chs = allChapters()
    const exercices = chs.reduce((n, c) => n + (c.exercices?.length ?? 0), 0)
    const interactifs = chs.reduce((n, c) => n + (c.representations?.length ?? 0), 0)
    return { matieres: SUBJECTS.length, chapitres: chs.length, exercices, interactifs }
  }, [])
}

/* Mini parabole animée pour l'aperçu du hero */
function HeroPlot() {
  const [t, setT] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const loop = (now: number) => {
      setT((now - start) / 1000)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  const a = 0.6 + 0.5 * Math.sin(t * 0.8)
  const b = -1.2 * Math.cos(t * 0.5)
  const c = -1.5 + Math.sin(t * 0.6)
  const W = 320, H = 200
  const sx = (x: number) => ((x + 4) / 8) * W
  const sy = (y: number) => H - ((y + 3) / 7) * H
  let d = ''
  for (let i = 0; i <= 80; i++) {
    const x = -4 + (8 * i) / 80
    const y = a * x * x + b * x + c
    d += `${i ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`
  }
  const delta = b * b - 4 * a * c
  const roots = delta >= 0 ? [(-b - Math.sqrt(delta)) / (2 * a), (-b + Math.sqrt(delta)) / (2 * a)] : []
  const xv = -b / (2 * a)
  const yv = a * xv * xv + b * xv + c
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full border bg-background">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={'v' + i} x1={sx(-4 + i)} x2={sx(-4 + i)} y1={0} y2={H} className="stroke-border" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={'h' + i} y1={sy(-3 + i)} y2={sy(-3 + i)} x1={0} x2={W} className="stroke-border" />
        ))}
        <line x1={0} x2={W} y1={sy(0)} y2={sy(0)} className="stroke-foreground" strokeWidth={1.2} />
        <line y1={0} y2={H} x1={sx(0)} x2={sx(0)} className="stroke-foreground" strokeWidth={1.2} />
        <path d={d} fill="none" stroke="hsl(217 91% 60%)" strokeWidth={2.5} />
        {roots.map((r, i) => (
          <rect key={i} x={sx(r) - 4} y={sy(0) - 4} width={8} height={8} fill="hsl(0 84% 60%)" />
        ))}
        <rect x={sx(xv) - 4} y={sy(yv) - 4} width={8} height={8} className="fill-foreground" />
      </svg>
      <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-[11px]">
        {[
          ['a', a],
          ['b', b],
          ['c', c],
        ].map(([k, v]) => (
          <div key={k as string} className="border px-2 py-1.5">
            <div className="flex justify-between text-muted-foreground">
              <span>{k}</span>
              <span className="text-foreground">{(v as number).toFixed(2)}</span>
            </div>
            <div className="mt-1 h-1 bg-muted">
              <div className="h-full bg-foreground" style={{ width: `${(((v as number) + 2.5) / 5) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between border bg-muted/40 px-3 py-2 text-xs">
        <span>
          <Tex>{'\\Delta = b^2-4ac'}</Tex>
        </span>
        <span className={cn('font-mono', delta >= 0 ? 'text-success' : 'text-destructive')}>
          {delta.toFixed(2)} · {delta > 0 ? '2 racines' : delta === 0 ? '1 racine' : 'aucune racine'}
        </span>
      </div>
    </div>
  )
}

function AppPreview() {
  const tabs = ['Fiche', 'Cours', 'Exercices', 'Représentation']
  return (
    <div className="relative border bg-card shadow-[12px_12px_0_0_hsl(var(--foreground)/0.08)]">
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <div className="flex gap-1.5">
          <span className="size-2.5 border bg-muted" />
          <span className="size-2.5 border bg-muted" />
          <span className="size-2.5 border bg-muted" />
        </div>
        <div className="mx-auto border bg-background px-3 py-0.5 font-mono text-[10px] text-muted-foreground">premiere-classe.fr/maths/second-degre</div>
      </div>
      <div className="grid grid-cols-[120px_1fr] text-xs sm:grid-cols-[150px_1fr]">
        <div className="hidden flex-col gap-0.5 border-r p-2 sm:flex">
          {SUBJECTS.slice(0, 9).map((s, i) => (
            <div key={s.id} className={cn('flex items-center gap-2 px-2 py-1.5', i === 5 ? 'bg-accent font-medium' : 'text-muted-foreground')}>
              <span className="size-2" style={{ background: `hsl(${s.hue} 70% 55%)` }} />
              <span className="truncate">{s.name}</span>
            </div>
          ))}
        </div>
        <div className="col-span-2 min-w-0 p-4 sm:col-span-1">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Maths · Chapitre 1</div>
          <div className="mt-1 text-base font-semibold">Second degré</div>
          <div className="mt-3 inline-flex border bg-muted/40 p-0.5">
            {tabs.map((t, i) => (
              <span key={t} className={cn('px-2 py-1 text-[11px]', i === 3 ? 'bg-background font-medium shadow-[0_0_0_1px_hsl(var(--border))]' : 'text-muted-foreground')}>
                {t}
              </span>
            ))}
          </div>
          <div className="mt-3">
            <HeroPlot />
          </div>
        </div>
      </div>
    </div>
  )
}

const TOPICS = [
  'Second degré', 'Suites', 'Dérivation', 'Exponentielle', 'Produit scalaire', 'Tableau d’avancement', 'Loi de Beer-Lambert', 'Lentilles minces', 'Énergie mécanique',
  'Réplication de l’ADN', 'Immunité', 'Lithosphère', 'Complément à deux', 'Tri par insertion', 'k plus proches voisins', 'Révolution française', 'La Grande Guerre',
  'Métropolisation', 'La Chine', 'Poésie', 'Théâtre', 'Dissertation', 'Subjuntivo', 'Present perfect', 'Faire société',
]

const FEATURES = [
  { icon: FileText, title: 'Fiches', text: 'L’essentiel de chaque chapitre sur un ou deux écrans : définitions, formules, dates, méthodes. Parfait la veille d’un contrôle.', tag: '01' },
  { icon: BookOpen, title: 'Cours', text: 'Des cours complets et rédigés, avec démonstrations, exemples corrigés, pièges à éviter et schémas soignés.', tag: '02' },
  { icon: PenLine, title: 'Exercices', text: 'Des exercices gradués de l’application au type bac, avec indices progressifs et corrigés détaillés.', tag: '03' },
  { icon: MousePointerClick, title: 'Représentations', text: 'Traceurs de fonctions, simulations physiques, ADN, tris animés, QCM, flashcards, textes à trous… On manipule pour comprendre.', tag: '04' },
]

const FAQ = [
  { q: 'C’est conforme au programme ?', a: 'Oui. Les chapitres suivent les programmes officiels de Première générale (Bulletin officiel) pour le tronc commun et les spécialités, avec le vocabulaire et les notations attendus.' },
  { q: 'Comment obtenir un code d’invitation ?', a: 'Pendant l’accès anticipé, le code Hello27 est ouvert à tous. Clique sur « Commencer », il est proposé directement dans la fenêtre.' },
  { q: 'Mes spécialités ne sont pas toutes là ?', a: 'Nous couvrons pour l’instant Mathématiques, Physique-Chimie, SVT, NSI et Anglais monde contemporain. Tu pourras modifier tes choix à tout moment.' },
  { q: 'Il faut créer un compte ?', a: 'Non. Ta progression, tes favoris et tes préférences (mode sombre inclus) sont enregistrés localement sur ton appareil.' },
  { q: 'Ça marche sur téléphone ?', a: 'Oui, toute l’interface et les modules interactifs sont pensés pour mobile, tablette et ordinateur.' },
]

export default function Landing() {
  const [open, setOpen] = useState(false)
  const stats = useStats()
  const { profile } = useProfile()
  const navigate = useNavigate()
  const start = () => (profile.unlocked ? navigate(profile.onboarded ? '/app' : '/app/bienvenue') : setOpen(true))
  const tronc = SUBJECTS.filter((s) => s.category === 'tronc')
  const spe = SUBJECTS.filter((s) => s.category === 'specialite')

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="container flex h-14 items-center justify-between gap-4">
          <Link to="/" aria-label={APP_NAME}>
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#matieres" className="hover:text-foreground">Matières</a>
            <a href="#fonctionnalites" className="hover:text-foreground">Fonctionnalités</a>
            <a href="#methode" className="hover:text-foreground">Méthode</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button onClick={start} size="sm" className="h-9">
              Commencer <ArrowRight />
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr]">
          <div className="animate-slide-up">
            <Badge variant="outline" className="gap-2 bg-background py-1 normal-case tracking-normal">
              <span className="size-1.5 bg-success" /> Rentrée 2026 · Programme officiel de Première
            </Badge>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Toute la Première.
              <br />
              <span className="text-muted-foreground">Rangée au carré.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Fiches, cours, exercices corrigés et représentations interactives pour les {stats.matieres} matières de Première générale — tronc commun et spécialités. Un seul endroit pour réviser toute l’année.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={start}>
                Commencer gratuitement <ArrowRight />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('matieres')?.scrollIntoView({ behavior: 'smooth' })}>
                Voir les matières
              </Button>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-4 border">
              {[
                [stats.matieres, 'matières'],
                [stats.chapitres, 'chapitres'],
                [stats.exercices, 'exercices'],
                [stats.interactifs, 'modules'],
              ].map(([v, l], i) => (
                <div key={l as string} className={cn('px-3 py-3', i > 0 && 'border-l')}>
                  <div className="font-mono text-2xl font-semibold tabular-nums">{v}</div>
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="animate-fade-in">
            <AppPreview />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="overflow-hidden border-b bg-muted/30 py-3">
        <div className="flex w-max animate-marquee gap-3">
          {[...TOPICS, ...TOPICS].map((t, i) => (
            <span key={i} className="flex items-center gap-3 whitespace-nowrap font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <span className="size-1 bg-muted-foreground" />
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* MATIÈRES */}
      <section id="matieres" className="border-b">
        <div className="container py-20">
          <SectionTitle kicker="Matières" title="Le tronc commun et tes spécialités" text="Choisis tes trois spécialités au démarrage : ton espace n’affiche que ce que tu étudies vraiment." />
          {[
            { label: 'Tronc commun', list: tronc },
            { label: 'Spécialités', list: spe },
          ].map((g) => (
            <div key={g.label} className="mt-10">
              <div className="mb-3 flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{g.label}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-5">
                {g.list.map((s) => {
                  const n = chaptersOf(s.id).length
                  return (
                    <button key={s.id} onClick={start} className="group relative flex flex-col bg-card p-5 text-left transition-colors hover:bg-accent/60">
                      <span className="absolute inset-x-0 top-0 h-0.5 scale-x-0 transition-transform group-hover:scale-x-100" style={{ background: `hsl(${s.hue} 70% 55%)` }} />
                      <div className="flex items-start justify-between">
                        <span className="flex size-10 items-center justify-center border" style={{ color: `hsl(${s.hue} 70% 50%)`, background: `hsl(${s.hue} 70% 55% / 0.08)` }}>
                          <DynamicIcon name={s.icon} className="size-5" />
                        </span>
                        <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <div className="mt-4 font-semibold">{s.name}</div>
                      <div className="mt-1 line-clamp-3 text-xs text-muted-foreground">{s.description}</div>
                      <div className="mt-4 font-mono text-[11px] text-muted-foreground">
                        {n > 0 ? `${n} chapitres` : 'en préparation'} · {s.hours}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FONCTIONNALITÉS */}
      <section id="fonctionnalites" className="border-b bg-muted/20">
        <div className="container py-20">
          <SectionTitle kicker="Fonctionnalités" title="Quatre façons d’apprendre chaque chapitre" text="Chaque chapitre est découpé de la même manière, pour que tu saches toujours où trouver ce dont tu as besoin." />
          <div className="mt-12 grid gap-px border bg-border md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex flex-col bg-card p-6">
                <div className="flex items-center justify-between">
                  <f.icon className="size-5" />
                  <span className="font-mono text-xs text-muted-foreground">{f.tag}</span>
                </div>
                <div className="mt-8 text-lg font-semibold">{f.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-px grid gap-px border border-t-0 bg-border lg:grid-cols-3">
            <div className="bg-card p-6 lg:col-span-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sigma className="size-4" /> Formules en LaTeX, schémas vectoriels
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {['e^{a+b}=e^a\\times e^b', '\\vec u\\cdot\\vec v = \\|\\vec u\\|\\,\\|\\vec v\\|\\cos\\theta', 'E=h\\nu=\\dfrac{hc}{\\lambda}'].map((f) => (
                  <div key={f} className="flex h-20 items-center justify-center border bg-background bg-dots px-2">
                    <Tex>{f}</Tex>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card p-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Moon className="size-4" /> Mode clair & sombre
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Révise le soir sans te brûler les yeux. Ton choix est mémorisé.</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="border bg-white p-3">
                  <div className="h-1.5 w-10 bg-zinc-900" />
                  <div className="mt-2 h-1 w-14 bg-zinc-300" />
                  <div className="mt-1 h-1 w-8 bg-zinc-300" />
                </div>
                <div className="border bg-zinc-950 p-3">
                  <div className="h-1.5 w-10 bg-zinc-100" />
                  <div className="mt-2 h-1 w-14 bg-zinc-700" />
                  <div className="mt-1 h-1 w-8 bg-zinc-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MÉTHODE */}
      <section id="methode" className="border-b">
        <div className="container py-20">
          <SectionTitle kicker="Méthode" title="Prêt en trente secondes" text="Pas de compte, pas d’e-mail. Un code, tes spécialités, et c’est parti." />
          <div className="mt-12 grid gap-px border bg-border md:grid-cols-3">
            {[
              { icon: KeyRound, t: 'Entre ton code', d: 'Clique sur « Commencer » et saisis ton code d’invitation. Pas de code ? Hello27 est là pour toi.' },
              { icon: Layers, t: 'Choisis tes spécialités', d: 'Sélectionne tes 3 spécialités de Première. Le tronc commun est inclus automatiquement.' },
              { icon: Target, t: 'Révise chapitre par chapitre', d: 'Fiche, cours, exercices, représentations : suis ta progression et marque les chapitres maîtrisés.' },
            ].map((s, i) => (
              <div key={s.t} className="relative bg-card p-6">
                <span className="font-mono text-5xl font-bold text-muted/80">{String(i + 1).padStart(2, '0')}</span>
                <s.icon className="absolute right-6 top-6 size-5" />
                <div className="mt-4 font-semibold">{s.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-b">
        <div className="container grid gap-10 py-20 lg:grid-cols-[1fr_1.4fr]">
          <SectionTitle kicker="FAQ" title="Questions fréquentes" text="Une autre question ? Le plus simple est encore d’essayer." />
          <div className="divide-y border">
            {FAQ.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-b bg-primary text-primary-foreground">
        <div className="container relative flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
          <div>
            <GraduationCap className="size-8" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Ta Première commence ici.</h2>
            <p className="mt-2 max-w-lg opacity-70">Toutes les matières, tout le programme, une seule interface carrée et efficace.</p>
          </div>
          <Button size="lg" variant="secondary" onClick={start}>
            Commencer <ArrowRight />
          </Button>
        </div>
      </section>

      <footer className="container flex flex-col items-center justify-between gap-4 py-8 text-xs text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <LogoMark className="size-4" /> {APP_NAME} · {new Date().getFullYear()} · Fait pour les élèves de Première
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Check className="size-3" /> Programme officiel
          </span>
          <span className="flex items-center gap-1">
            <NotebookPen className="size-3" /> Contenus pédagogiques originaux
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="size-3" /> Sans publicité
          </span>
        </div>
      </footer>

      <InviteDialog open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

function SectionTitle({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return (
    <div className="max-w-2xl">
      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">/ {kicker}</div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 text-muted-foreground">{text}</p>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium hover:bg-accent/50">
        {q}
        <ChevronDown className={cn('size-4 shrink-0 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <p className="animate-fade-in px-5 pb-4 text-sm text-muted-foreground">{a}</p>}
    </div>
  )
}
