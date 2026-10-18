import { cn } from '@/lib/utils'

export const APP_NAME = 'Première Classe'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-6', className)} aria-hidden>
      <rect width="24" height="24" className="fill-foreground" />
      <rect x="5" y="5" width="6" height="14" className="fill-background" />
      <rect x="13" y="5" width="6" height="6" className="fill-background" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2 font-semibold tracking-tight', className)}>
      <LogoMark />
      <span>
        Première<span className="text-muted-foreground">Classe</span>
      </span>
    </span>
  )
}
