import { Fragment, useEffect, useRef, useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Label } from '@/components/ui/input'
import { Segmented } from '@/components/ui/tabs'
import { PALETTE } from '@/lib/plot'
import { cn } from '@/lib/utils'
import { PlayerBar, usePlayer } from './_nsi2/player'
import { PROGRAMS, type Val } from './_nsi2/programs'

type Id = 'somme' | 'max' | 'tri_selection' | 'dichotomie' | 'factorielle'
interface Props {
  program?: Id
}

const KW = new Set(['def', 'for', 'in', 'while', 'if', 'elif', 'else', 'return'])
const BUILTIN = new Set(['range', 'len', 'print'])

function highlight(line: string) {
  const toks = line.match(/\s+|[A-Za-z_][A-Za-z_0-9]*|\d+|\/\/|==|<=|>=|!=|./g) ?? []
  return toks.map((t, i) => {
    let color: string | undefined
    if (KW.has(t)) color = PALETTE.violet
    else if (BUILTIN.has(t)) color = PALETTE.teal
    else if (/^\d+$/.test(t)) color = PALETTE.orange
    else if (/^(==|<=|>=|!=|\/\/|[+\-*<>=])$/.test(t)) color = PALETTE.pink
    return (
      <span key={i} style={color ? { color } : undefined} className={KW.has(t) ? 'font-semibold' : undefined}>
        {t}
      </span>
    )
  })
}

const show = (v: Val) => (Array.isArray(v) ? '[' + v.join(', ') + ']' : String(v))
const same = (a?: Val, b?: Val) => a !== undefined && b !== undefined && show(a) === show(b)

export default function PythonTracer({ program = 'somme' }: Props) {
  const [id, setId] = useState<string>(PROGRAMS[program] ? program : 'somme')
  const prog = PROGRAMS[id]
  const p = usePlayer(prog.steps.length, 1000)
  const st = prog.steps[p.i]
  const prev = p.i > 0 ? prog.steps[p.i - 1] : undefined
  const lineRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    lineRef.current?.scrollIntoView?.({ block: 'nearest' })
  }, [p.i, id])

  const arr = prog.array ? (st.vars[prog.array] as number[] | undefined) : undefined
  const vars = Object.entries(st.vars)
  const derived = prog.derived?.(st.vars) ?? []

  return (
    <WidgetFrame
      title="Exécution pas à pas d'un programme Python"
      subtitle="La flèche indique la prochaine ligne à exécuter ; les variables sont celles avant son exécution"
      controls={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Programme</Label>
            <Segmented
              value={id}
              onChange={(v) => {
                setId(v)
                p.reset()
              }}
              options={Object.values(PROGRAMS).map((x) => ({ value: x.id, label: x.label }))}
              className="flex-wrap"
            />
          </div>
          <PlayerBar p={p} />
          <input
            type="range"
            min={0}
            max={p.last}
            value={p.i}
            onChange={(e) => {
              p.stop()
              p.setI(Number(e.target.value))
            }}
            aria-label="Étape"
            className="pc-range h-5 w-full cursor-pointer appearance-none bg-transparent"
            style={{ ['--pct' as string]: `${(p.i / Math.max(1, p.last)) * 100}%` }}
          />
          <div className="font-mono text-xs tabular-nums text-muted-foreground">
            étape {p.i + 1} / {prog.steps.length}
          </div>
          <div>
            <Label>Sortie (console)</Label>
            <pre className="mt-1.5 min-h-[2.5rem] border bg-background p-2 font-mono text-xs">
              {st.out.length ? st.out.join('\n') : <span className="text-muted-foreground">(rien affiché)</span>}
            </pre>
          </div>
        </>
      }
      footer={<span>{st.note}</span>}
    >
      <div className="flex flex-col gap-3">
        <div className="overflow-x-auto border bg-background py-2 font-mono text-[13px] leading-6">
          {prog.code.map((l, i) => {
            const cur = i + 1 === st.line
            return (
              <div
                key={i}
                ref={cur ? lineRef : undefined}
                className={cn('flex whitespace-pre pr-3', cur && 'bg-warning/15')}
                style={cur ? { boxShadow: `inset 3px 0 0 ${PALETTE.orange}` } : undefined}
              >
                <span className="w-6 shrink-0 select-none text-right text-muted-foreground">{i + 1}</span>
                <span className="w-5 shrink-0 select-none text-center" style={{ color: PALETTE.orange }}>
                  {cur ? '▶' : ''}
                </span>
                <span>{l ? highlight(l) : ' '}</span>
              </div>
            )
          })}
        </div>

        {arr && (
          <div className="overflow-x-auto border bg-background p-3">
            <div className="flex w-max gap-0">
              {arr.map((v, i) => {
                const ptrs = prog.pointers.filter((n) => st.vars[n] === i)
                return (
                  <div key={i} className="flex w-11 flex-col items-center">
                    <div className="font-mono text-[10px] text-muted-foreground">{i}</div>
                    <div
                      className={cn('flex h-9 w-full items-center justify-center border font-mono text-sm', ptrs.length ? 'bg-primary/10 font-semibold' : '')}
                      style={ptrs.length ? { borderColor: PALETTE.orange } : undefined}
                    >
                      {v}
                    </div>
                    <div className="h-8 text-center font-mono text-[10px] leading-3" style={{ color: PALETTE.orange }}>
                      {ptrs.map((n) => (
                        <Fragment key={n}>
                          ↑{n}
                          <br />
                        </Fragment>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="border bg-background">
          <div className="border-b px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Variables</div>
          {vars.length === 0 && derived.length === 0 ? (
            <div className="px-3 py-2 text-xs text-muted-foreground">Aucune variable locale pour l'instant (code hors fonction).</div>
          ) : (
            <table className="w-full font-mono text-sm">
              <tbody>
                {vars.map(([k, v]) => {
                  const changed = !same(v, prev?.vars[k])
                  return (
                    <tr key={k} className="border-b last:border-b-0">
                      <td className="w-1/3 px-3 py-1 text-muted-foreground">{k}</td>
                      <td className={cn('px-3 py-1', changed && prev && 'bg-warning/15 font-semibold')}>{show(v)}</td>
                    </tr>
                  )
                })}
                {derived.map(([k, v]) => (
                  <tr key={k} className="border-b italic last:border-b-0">
                    <td className="w-1/3 px-3 py-1 text-muted-foreground">{k}</td>
                    <td className="px-3 py-1">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </WidgetFrame>
  )
}
