import { cn, fmt } from '@/lib/utils'

/** Curseur carré avec label + valeur. */
export function Slider({
  label,
  value,
  min,
  max,
  step = 0.1,
  onChange,
  unit,
  digits = 2,
  className,
}: {
  label?: React.ReactNode
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  unit?: string
  digits?: number
  className?: string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label !== undefined && (
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-muted-foreground">{label}</span>
          <span className="font-mono tabular-nums">
            {fmt(value, digits)}
            {unit ? ` ${unit}` : ''}
          </span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="pc-range h-5 w-full cursor-pointer appearance-none bg-transparent"
        style={{ ['--pct' as string]: `${pct}%` }}
      />
    </div>
  )
}
