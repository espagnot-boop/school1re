import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'destructive'
const variants: Record<Variant, string> = {
  default: 'bg-primary text-primary-foreground border-transparent',
  secondary: 'bg-secondary text-secondary-foreground border-transparent',
  outline: 'text-foreground',
  success: 'border-success/40 text-success bg-success/10',
  warning: 'border-warning/40 text-warning bg-warning/10',
  destructive: 'border-destructive/40 text-destructive bg-destructive/10',
}
export function Badge({ className, variant = 'default', ...p }: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return <span className={cn('inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wide', variants[variant], className)} {...p} />
}
