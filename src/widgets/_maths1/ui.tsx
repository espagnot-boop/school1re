import { AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Tex } from '@/components/Tex'
import { usePlot } from '@/lib/plot'
import { cn } from '@/lib/utils'

/** Champ de saisie d'expression avec aperçu KaTeX et message d'erreur. */
export function ExprField({
  value,
  onChange,
  error,
  tex,
  prefix,
  color,
  placeholder,
  label,
  onRemove,
  disabled,
}: {
  value: string
  onChange: (v: string) => void
  error?: string | null
  tex?: string | null
  prefix?: string
  color?: string
  placeholder?: string
  label?: React.ReactNode
  onRemove?: () => void
  disabled?: boolean
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && <div className="text-xs font-medium text-muted-foreground">{label}</div>}
      <div className="flex items-stretch">
        {color && <span className="w-1.5 shrink-0" style={{ background: color }} aria-hidden />}
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          disabled={disabled}
          aria-invalid={!!error}
          className={cn('font-mono', error && 'border-destructive focus-visible:ring-destructive')}
        />
        {onRemove && (
          <button type="button" onClick={onRemove} className="border border-l-0 px-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Supprimer">
            ✕
          </button>
        )}
      </div>
      {error ? (
        <div className="flex items-start gap-1 text-xs text-destructive">
          <AlertCircle className="mt-0.5 size-3 shrink-0" />
          <span>{error}</span>
        </div>
      ) : tex ? (
        <div className="min-h-[1.5rem] overflow-x-auto text-sm">
          <Tex>{(prefix ? prefix + ' = ' : '') + tex}</Tex>
        </div>
      ) : null}
    </div>
  )
}

/** Poignée ronde déplaçable (cercle = géométrie, autorisé). */
export function Handle({ x, y, color, label, active, dx = 8, dy = -8 }: { x: number; y: number; color: string; label?: string; active?: boolean; dx?: number; dy?: number }) {
  const p = usePlot()
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null
  const X = p.sx(x)
  const Y = p.sy(y)
  if (X < -20 || X > p.width + 20 || Y < -20 || Y > p.height + 20) return null
  return (
    <g style={{ cursor: 'grab' }}>
      <circle cx={X} cy={Y} r={active ? 13 : 10} fill={color} opacity={0.18} />
      <circle cx={X} cy={Y} r={5.5} fill={color} stroke="hsl(var(--background))" strokeWidth={2} />
      {label && (
        <text x={X + dx} y={Y + dy} fontSize={12} fill={color} fontWeight={600} fontFamily="Geist, sans-serif" style={{ paintOrder: 'stroke' }} stroke="hsl(var(--background))" strokeWidth={3}>
          {label}
        </text>
      )}
    </g>
  )
}

/** Étiquette texte placée en coordonnées mathématiques. */
export function PlotText({ x, y, children, color = 'hsl(var(--foreground))', anchor = 'start', dx = 0, dy = 0, size = 11 }: { x: number; y: number; children: React.ReactNode; color?: string; anchor?: 'start' | 'middle' | 'end'; dx?: number; dy?: number; size?: number }) {
  const p = usePlot()
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null
  return (
    <text x={p.sx(x) + dx} y={p.sy(y) + dy} textAnchor={anchor} fontSize={size} fill={color} fontFamily="Geist, sans-serif" style={{ paintOrder: 'stroke' }} stroke="hsl(var(--background))" strokeWidth={3}>
      {children}
    </text>
  )
}

/** Phrase d'interprétation (pied de widget). */
export function Interpretation({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 leading-relaxed">
      <span className="mt-1.5 size-1.5 shrink-0 bg-foreground" aria-hidden />
      <div>{children}</div>
    </div>
  )
}

/** Distance en pixels SVG entre deux points math, pour la détection de poignée. */
export function pxDist(p: { xMin: number; xMax: number; yMin: number; yMax: number; width: number; height: number }, x1: number, y1: number, x2: number, y2: number) {
  const kx = p.width / (p.xMax - p.xMin)
  const ky = p.height / (p.yMax - p.yMin)
  return Math.hypot((x1 - x2) * kx, (y1 - y2) * ky)
}

/** Arrondi à un pas (évite 0.30000000004). */
export function snap(v: number, step: number) {
  const r = Math.round(v / step) * step
  const d = Math.max(0, -Math.floor(Math.log10(step)) + 1)
  return +r.toFixed(d)
}
