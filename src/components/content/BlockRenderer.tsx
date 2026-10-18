import { Suspense, Component, type ReactNode } from 'react'
import { AlertTriangle, BookMarked, Lightbulb, Pin, Sparkles, Wrench, ScrollText, FlaskConical, Bookmark } from 'lucide-react'
import type { Block, CalloutVariant } from '@/content/types'
import { RichText } from './RichText'
import { Tex } from '@/components/Tex'
import { Cloze, Flashcards, Matching, Ordering, Qcm, Reveal, TrueFalse } from './Interactive'
import { CodeBlock } from './CodeBlock'
import { DynamicIcon } from '@/components/SubjectIcon'
import { getWidget } from '@/widgets'
import { cn } from '@/lib/utils'

const CALLOUTS: Record<CalloutVariant, { label: string; icon: typeof Pin; cls: string }> = {
  definition: { label: 'Définition', icon: BookMarked, cls: 'border-l-[hsl(217_91%_60%)] [--c:217_91%_60%]' },
  theorem: { label: 'Théorème', icon: Sparkles, cls: 'border-l-[hsl(263_70%_60%)] [--c:263_70%_60%]' },
  property: { label: 'Propriété', icon: Pin, cls: 'border-l-[hsl(263_70%_60%)] [--c:263_70%_60%]' },
  example: { label: 'Exemple', icon: FlaskConical, cls: 'border-l-[hsl(142_71%_45%)] [--c:142_71%_45%]' },
  method: { label: 'Méthode', icon: Wrench, cls: 'border-l-[hsl(173_80%_40%)] [--c:173_80%_40%]' },
  warning: { label: 'Attention', icon: AlertTriangle, cls: 'border-l-[hsl(0_84%_60%)] [--c:0_84%_60%]' },
  tip: { label: 'Astuce', icon: Lightbulb, cls: 'border-l-[hsl(45_93%_47%)] [--c:45_93%_47%]' },
  remember: { label: 'À retenir', icon: Bookmark, cls: 'border-l-[hsl(25_95%_53%)] [--c:25_95%_53%]' },
  history: { label: 'Histoire', icon: ScrollText, cls: 'border-l-[hsl(30_40%_50%)] [--c:30_40%_50%]' },
}

class WidgetBoundary extends Component<{ id: string; children: ReactNode }, { err: boolean }> {
  state = { err: false }
  static getDerivedStateFromError() {
    return { err: true }
  }
  render() {
    if (this.state.err)
      return <div className="border border-dashed p-4 text-sm text-muted-foreground">Le module interactif « {this.props.id} » n'a pas pu s'afficher.</div>
    return this.props.children
  }
}

function WidgetBlock({ id, props, title, caption }: { id: string; props?: Record<string, unknown>; title?: string; caption?: string }) {
  const W = getWidget(id)
  return (
    <figure className="my-6">
      {title && (
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <span className="size-1.5 bg-foreground" />
          <RichText text={title} />
        </div>
      )}
      {W ? (
        <WidgetBoundary id={id}>
          <Suspense fallback={<div className="flex h-64 items-center justify-center border bg-dots font-mono text-xs text-muted-foreground">chargement du module…</div>}>
            <W {...(props ?? {})} />
          </Suspense>
        </WidgetBoundary>
      ) : (
        <div className="flex h-40 items-center justify-center border border-dashed bg-dots font-mono text-xs text-muted-foreground">module « {id} » bientôt disponible</div>
      )}
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          <RichText text={caption} />
        </figcaption>
      )}
    </figure>
  )
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  if (!Array.isArray(blocks)) return null
  return (
    <>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </>
  )
}

function slug(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\$[^$]*\$/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
export const headingId = slug

export function BlockView({ block: b }: { block: Block }) {
  switch (b.type) {
    case 'h2':
      return (
        <h2 id={slug(b.text)} className="mb-3 mt-10 scroll-mt-24 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
          <RichText text={b.text} />
        </h2>
      )
    case 'h3':
      return (
        <h3 id={slug(b.text)} className="mb-2 mt-7 scroll-mt-24 text-base font-semibold">
          <RichText text={b.text} />
        </h3>
      )
    case 'p':
      return (
        <p className="my-3">
          <RichText text={b.text} />
        </p>
      )
    case 'math':
      return (
        <div className="my-4 overflow-x-auto border-y border-dashed py-2">
          <Tex display>{b.tex}</Tex>
        </div>
      )
    case 'list': {
      const L = b.ordered ? 'ol' : 'ul'
      return (
        <L className={cn('my-3 grid gap-1.5 pl-1', b.ordered ? '[counter-reset:li]' : '')}>
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-3">
              {b.ordered ? <span className="mt-0.5 shrink-0 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span> : <span className="mt-[0.65em] size-1.5 shrink-0 bg-foreground/70" />}
              <span className="min-w-0 flex-1">
                <RichText text={it} />
              </span>
            </li>
          ))}
        </L>
      )
    }
    case 'callout': {
      const c = CALLOUTS[b.variant] ?? CALLOUTS.remember
      const I = c.icon
      return (
        <div className={cn('my-5 border border-l-[3px] bg-[hsl(var(--c)/0.05)]', c.cls)}>
          <div className="flex items-center gap-2 px-4 pt-3 text-sm font-semibold">
            <I className="size-4 text-[hsl(var(--c))]" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[hsl(var(--c))]">{c.label}</span>
            {b.title && (
              <span>
                — <RichText text={b.title} />
              </span>
            )}
          </div>
          <div className="px-4 pb-3 [&>*:first-child]:mt-2 [&>*:last-child]:mb-0">
            <BlockRenderer blocks={b.content} />
          </div>
        </div>
      )
    }
    case 'table':
      return (
        <figure className="my-5">
          <div className="overflow-x-auto border">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/60">
                  {b.headers.map((h, i) => (
                    <th key={i} className="border-b border-r px-3 py-2 text-left font-semibold last:border-r-0">
                      <RichText text={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, i) => (
                  <tr key={i} className="border-b last:border-b-0 even:bg-muted/20">
                    {r.map((c, j) => (
                      <td key={j} className="border-r px-3 py-2 align-top last:border-r-0">
                        <RichText text={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.caption && (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground">
              <RichText text={b.caption} />
            </figcaption>
          )}
        </figure>
      )
    case 'code':
      return <CodeBlock code={b.code} lang={b.lang} caption={b.caption} />
    case 'svg':
      return (
        <figure className="my-6">
          <div className="flex justify-center border bg-background bg-grid p-4 text-foreground">
            <div className="w-full [&_svg]:h-auto [&_svg]:w-full" style={{ maxWidth: b.maxWidth ?? 640 }} dangerouslySetInnerHTML={{ __html: b.svg }} />
          </div>
          {b.caption && (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground">
              <RichText text={b.caption} />
            </figcaption>
          )}
        </figure>
      )
    case 'quote':
      return (
        <blockquote className="my-5 border-l-2 border-foreground pl-4">
          <p className="font-serif text-[17px] italic leading-relaxed">
            <RichText text={b.text} />
          </p>
          {(b.author || b.source) && (
            <footer className="mt-1.5 text-xs text-muted-foreground">
              — {b.author}
              {b.source && <>, <em>{b.source}</em></>}
            </footer>
          )}
        </blockquote>
      )
    case 'timeline':
      return (
        <div className="my-6 border-l pl-0">
          {b.events.map((e, i) => (
            <div key={i} className="relative grid gap-1 pb-4 pl-6 last:pb-0 sm:grid-cols-[110px_1fr] sm:gap-4">
              <span className="absolute -left-[5px] top-1.5 size-[9px] border-2 border-foreground bg-background" />
              <div className="font-mono text-sm font-semibold tabular-nums">{e.date}</div>
              <div>
                <div className="font-medium">
                  <RichText text={e.title} />
                </div>
                {e.text && (
                  <div className="text-sm text-muted-foreground">
                    <RichText text={e.text} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )
    case 'keyvalue':
      return (
        <dl className="my-5 divide-y border">
          {b.items.map((it, i) => (
            <div key={i} className="grid gap-1 px-4 py-2.5 sm:grid-cols-[200px_1fr] sm:gap-4">
              <dt className="text-sm font-semibold">
                <RichText text={it.key} />
              </dt>
              <dd className="text-sm text-muted-foreground">
                <RichText text={it.value} />
              </dd>
            </div>
          ))}
        </dl>
      )
    case 'steps':
      return (
        <ol className="my-5 grid gap-0 border">
          {b.items.map((s, i) => (
            <li key={i} className="grid grid-cols-[44px_1fr] border-b last:border-b-0">
              <div className="flex items-start justify-center border-r bg-muted/40 pt-3 font-mono text-sm font-semibold">{i + 1}</div>
              <div className="px-4 py-3">
                <div className="font-semibold">
                  <RichText text={s.title} />
                </div>
                <div className="mt-0.5 text-sm text-muted-foreground">
                  <RichText text={s.text} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      )
    case 'grid':
      return (
        <div className={cn('my-5 grid gap-px border bg-border', b.columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
          {b.items.map((it, i) => (
            <div key={i} className="bg-card p-4">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                {it.icon && <DynamicIcon name={it.icon} className="size-4" />}
                <RichText text={it.title} />
              </div>
              <div className="text-sm text-muted-foreground">
                <RichText text={it.text} />
              </div>
            </div>
          ))}
        </div>
      )
    case 'divider':
      return <hr className="my-8 border-dashed" />
    case 'qcm':
      return <Qcm questions={b.questions} />
    case 'flashcards':
      return <Flashcards cards={b.cards} />
    case 'cloze':
      return <Cloze title={b.title} text={b.text} />
    case 'matching':
      return <Matching title={b.title} pairs={b.pairs} />
    case 'ordering':
      return <Ordering title={b.title} items={b.items} />
    case 'truefalse':
      return <TrueFalse title={b.title} statements={b.statements} />
    case 'reveal':
      return (
        <Reveal title={b.title}>
          <BlockRenderer blocks={b.content} />
        </Reveal>
      )
    case 'widget':
      return <WidgetBlock id={b.id} props={b.props} title={b.title} caption={b.caption} />
    default:
      return null
  }
}
