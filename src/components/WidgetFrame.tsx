import { cn } from '@/lib/utils'

/**
 * Cadre standard d'un widget : titre + zone visuelle + panneau de contrôles.
 * Utilisé par tous les widgets pour une apparence homogène.
 */
export function WidgetFrame({
  title,
  subtitle,
  controls,
  children,
  footer,
  className,
  aside = 'right',
}: {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  controls?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  aside?: 'right' | 'bottom'
}) {
  return (
    <div className={cn('border bg-card', className)}>
      {(title || subtitle) && (
        <div className="flex items-center justify-between gap-3 border-b px-4 py-2.5">
          <div>
            {title && <div className="text-sm font-semibold">{title}</div>}
            {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">interactif</span>
        </div>
      )}
      <div className={cn('grid', controls && aside === 'right' && 'lg:grid-cols-[1fr_260px]')}>
        <div className="min-w-0 p-3">{children}</div>
        {controls && <div className={cn('flex flex-col gap-4 p-4', aside === 'right' ? 'border-t lg:border-l lg:border-t-0' : 'border-t')}>{controls}</div>}
      </div>
      {footer && <div className="border-t bg-muted/30 px-4 py-2.5 text-sm">{footer}</div>}
    </div>
  )
}
