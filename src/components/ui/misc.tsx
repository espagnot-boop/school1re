import { cn } from '@/lib/utils'

export function Separator({ className, vertical }: { className?: string; vertical?: boolean }) {
  return <div className={cn(vertical ? 'w-px self-stretch' : 'h-px w-full', 'bg-border', className)} />
}

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: React.ReactNode }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn('relative h-5 w-9 border transition-colors', checked ? 'bg-primary' : 'bg-muted')}
      >
        <span className={cn('absolute top-0.5 size-3.5 transition-all', checked ? 'left-[18px] bg-primary-foreground' : 'left-0.5 bg-muted-foreground')} />
      </button>
      {label}
    </label>
  )
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{children}</kbd>
}

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn('h-1.5 w-full bg-muted', className)}>
      <div className="h-full bg-primary transition-all" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  )
}

/** Tuile de valeur pour widgets : « Δ = 12 » */
export function Stat({ label, value, className, tone }: { label: React.ReactNode; value: React.ReactNode; className?: string; tone?: 'success' | 'warning' | 'destructive' | 'info' }) {
  return (
    <div className={cn('border bg-background px-3 py-2', className)}>
      <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div
        className={cn(
          'mt-0.5 font-mono text-sm tabular-nums',
          tone === 'success' && 'text-success',
          tone === 'warning' && 'text-warning',
          tone === 'destructive' && 'text-destructive',
          tone === 'info' && 'text-info',
        )}
      >
        {value}
      </div>
    </div>
  )
}
