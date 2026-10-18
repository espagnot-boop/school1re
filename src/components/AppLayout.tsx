import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Home, LogOut, Menu, Search, Settings2, X, CornerDownLeft } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'
import { DynamicIcon } from '@/components/SubjectIcon'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Kbd } from '@/components/ui/misc'
import { SUBJECTS, type SubjectMeta } from '@/content/subjects'
import { allChapters, chaptersOf } from '@/content'
import { useProfile, useProgress } from '@/hooks/useProfile'
import { cn } from '@/lib/utils'

export function useVisibleSubjects(): { tronc: SubjectMeta[]; spe: SubjectMeta[] } {
  const { profile } = useProfile()
  const spe = SUBJECTS.filter((s) => s.category === 'specialite' && profile.specialites.includes(s.id))
  const tronc = SUBJECTS.filter((s) => s.category === 'tronc')
  return { tronc, spe }
}

function SubjectLink({ s, onNavigate }: { s: SubjectMeta; onNavigate?: () => void }) {
  const { progress } = useProgress()
  const chs = chaptersOf(s.id)
  const done = chs.filter((c) => progress.mastered[`${s.id}/${c.id}`]).length
  return (
    <NavLink
      to={`/app/matiere/${s.id}`}
      onClick={onNavigate}
      className={({ isActive }) => cn('group flex items-center gap-2.5 px-2.5 py-1.5 text-sm transition-colors', isActive ? 'bg-accent font-medium text-foreground' : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground')}
    >
      <span className="flex size-6 shrink-0 items-center justify-center border bg-background" style={{ color: `hsl(${s.hue} 70% 50%)` }}>
        <DynamicIcon name={s.icon} className="size-3.5" />
      </span>
      <span className="flex-1 truncate">{s.name}</span>
      {chs.length > 0 && (
        <span className="font-mono text-[10px] text-muted-foreground">
          {done}/{chs.length}
        </span>
      )}
    </NavLink>
  )
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { tronc, spe } = useVisibleSubjects()
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/app" onClick={onNavigate}>
          <Logo />
        </Link>
      </div>
      <nav className="scrollbar-thin flex-1 overflow-y-auto p-3">
        <NavLink
          to="/app"
          end
          onClick={onNavigate}
          className={({ isActive }) => cn('flex items-center gap-2.5 px-2.5 py-1.5 text-sm', isActive ? 'bg-accent font-medium' : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground')}
        >
          <Home className="size-4" /> Tableau de bord
        </NavLink>
        <div className="mb-1.5 mt-5 px-2.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Spécialités</div>
        {spe.length === 0 && (
          <Link to="/app/bienvenue" onClick={onNavigate} className="block px-2.5 py-1.5 text-xs text-muted-foreground underline">
            Choisir mes spécialités
          </Link>
        )}
        {spe.map((s) => (
          <SubjectLink key={s.id} s={s} onNavigate={onNavigate} />
        ))}
        <div className="mb-1.5 mt-5 px-2.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Tronc commun</div>
        {tronc.map((s) => (
          <SubjectLink key={s.id} s={s} onNavigate={onNavigate} />
        ))}
      </nav>
      <div className="border-t p-3">
        <NavLink to="/app/bienvenue" onClick={onNavigate} className="flex items-center gap-2.5 px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-accent/60 hover:text-foreground">
          <Settings2 className="size-4" /> Mes spécialités
        </NavLink>
      </div>
    </div>
  )
}

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const navigate = useNavigate()
  const results = useMemo(() => {
    const n = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    const query = n(q.trim())
    const list = allChapters().map((c) => ({ c, s: SUBJECTS.find((s) => s.id === c.subject)! }))
    if (!query) return list.slice(0, 12)
    return list
      .map((x) => {
        const hay = n([x.c.title, x.c.summary, x.c.theme ?? '', ...(x.c.keywords ?? []), x.s.name].join(' '))
        const score = query.split(/\s+/).every((w) => hay.includes(w)) ? (n(x.c.title).includes(query) ? 2 : 1) : 0
        return { ...x, score }
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
  }, [q])
  useEffect(() => {
    setSel(0)
  }, [q])
  useEffect(() => {
    if (open) setQ('')
  }, [open])
  const go = (i: number) => {
    const r = results[i]
    if (!r) return
    navigate(`/app/matiere/${r.c.subject}/${r.c.id}`)
    onClose()
  }
  return (
    <Dialog open={open} onClose={onClose} className="max-w-xl self-start sm:mt-[10vh]">
      <div className="flex items-center gap-2 border-b px-4">
        <Search className="size-4 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setSel((s) => Math.min(s + 1, results.length - 1))
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setSel((s) => Math.max(s - 1, 0))
            } else if (e.key === 'Enter') go(sel)
          }}
          placeholder="Rechercher un chapitre, une notion…"
          className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="max-h-[50vh] overflow-y-auto p-2">
        {results.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">Aucun résultat.</div>}
        {results.map((r, i) => (
          <button
            key={r.c.subject + r.c.id}
            onMouseEnter={() => setSel(i)}
            onClick={() => go(i)}
            className={cn('flex w-full items-center gap-3 px-3 py-2 text-left text-sm', sel === i && 'bg-accent')}
          >
            <span className="flex size-7 shrink-0 items-center justify-center border" style={{ color: `hsl(${r.s.hue} 70% 50%)` }}>
              <DynamicIcon name={r.s.icon} className="size-3.5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium">{r.c.title}</span>
              <span className="block truncate text-xs text-muted-foreground">
                {r.s.name} · {r.c.theme}
              </span>
            </span>
            {sel === i && <CornerDownLeft className="size-3.5 text-muted-foreground" />}
          </button>
        ))}
      </div>
    </Dialog>
  )
}

export default function AppLayout() {
  const [mobile, setMobile] = useState(false)
  const [search, setSearch] = useState(false)
  const { profile, update } = useProfile()
  const navigate = useNavigate()
  const loc = useLocation()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearch(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [loc.pathname])

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-card lg:block">
        <Sidebar />
      </aside>
      {mobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 animate-fade-in bg-black/50" onClick={() => setMobile(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 animate-slide-up border-r bg-card">
            <button className="absolute right-3 top-4 p-1" onClick={() => setMobile(false)} aria-label="Fermer">
              <X className="size-4" />
            </button>
            <Sidebar onNavigate={() => setMobile(false)} />
          </aside>
        </div>
      )}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobile(true)} aria-label="Menu">
            <Menu />
          </Button>
          <button onClick={() => setSearch(true)} className="flex h-9 w-full max-w-sm items-center gap-2 border bg-muted/30 px-3 text-sm text-muted-foreground transition-colors hover:bg-accent">
            <Search className="size-4" />
            <span className="flex-1 text-left">Rechercher…</span>
            <span className="hidden sm:inline">
              <Kbd>Ctrl K</Kbd>
            </span>
          </button>
          <div className="ml-auto flex items-center gap-2">
            {profile.name && <span className="hidden text-sm text-muted-foreground sm:inline">Salut {profile.name} 👋</span>}
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              title="Se déconnecter"
              aria-label="Se déconnecter"
              onClick={() => {
                update({ unlocked: false })
                navigate('/')
              }}
            >
              <LogOut />
            </Button>
          </div>
        </header>
        <main className="min-h-[calc(100vh-3.5rem)]">
          <Outlet />
        </main>
      </div>
      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </div>
  )
}
