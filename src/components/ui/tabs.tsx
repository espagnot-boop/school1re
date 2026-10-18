import { cn } from '@/lib/utils'

export function Tabs<T extends string>({
  value,
  onChange,
  items,
  className,
}: {
  value: T
  onChange: (v: T) => void
  items: { value: T; label: React.ReactNode; icon?: React.ReactNode; count?: number }[]
  className?: string
}) {
  return (
    <div className={cn('inline-flex border bg-muted/40 p-0.5', className)} role="tablist">
      {items.map((it) => (
        <button
          key={it.value}
          role="tab"
          aria-selected={value === it.value}
          onClick={() => onChange(it.value)}
          className={cn(
            'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground [&_svg]:size-4',
            value === it.value && 'bg-background text-foreground shadow-[0_0_0_1px_hsl(var(--border))]',
          )}
        >
          {it.icon}
          <span>{it.label}</span>
          {it.count !== undefined && <span className="font-mono text-[10px] text-muted-foreground">{it.count}</span>}
        </button>
      ))}
    </div>
  )
}

/** Petit sélecteur segmenté pour widgets */
export function Segmented<T extends string>({ value, onChange, options, className }: { value: T; onChange: (v: T) => void; options: { value: T; label: React.ReactNode }[]; className?: string }) {
  return (
    <div className={cn('inline-flex border', className)}>
      {options.map((o, i) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn('px-2.5 py-1 text-xs font-medium transition-colors', i > 0 && 'border-l', value === o.value ? 'bg-primary text-primary-foreground' : 'hover:bg-accent')}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
