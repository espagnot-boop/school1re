import { Fragment, useMemo, useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Input, Label, Select } from '@/components/ui/input'
import { Segmented } from '@/components/ui/tabs'
import { Stat } from '@/components/ui/misc'
import { PALETTE } from '@/lib/plot'
import { cn } from '@/lib/utils'
import { analyzeVerse, rhyme, type DiMode } from './_nsi2/prosody'

interface Props {
  verse?: string
}

const EXAMPLES: { v: string; a: string }[] = [
  { v: 'Demain, dès l’aube, à l’heure où blanchit la campagne,', a: 'V. Hugo' },
  { v: 'Ô temps ! suspends ton vol, et vous, heures propices !', a: 'Lamartine' },
  { v: 'Le Poète est semblable au prince des nuées', a: 'Baudelaire' },
  { v: 'De la musique avant toute chose', a: 'Verlaine' },
  { v: 'Comme il pleut sur la ville', a: 'Verlaine' },
  { v: 'Mignonne, allons voir si la rose', a: 'Ronsard' },
  { v: 'Heureux qui, comme Ulysse, a fait un beau voyage,', a: 'Du Bellay' },
  { v: 'Qu’en un lieu, qu’en un jour, un seul fait accompli', a: 'Boileau' },
  { v: 'Dans l’Orient désert quel devint mon ennui', a: 'Racine' },
  { v: 'Je suis le ténébreux, le veuf, l’inconsolé,', a: 'Nerval' },
  { v: 'Le vent se lève !... il faut tenter de vivre !', a: 'Valéry' },
]
const NEXT: Record<DiMode, DiMode> = { auto: 'dierese', dierese: 'synerese', synerese: 'auto' }
const DEFAULT = 'Demain, dès l’aube, à l’heure où blanchit la campagne,'

export default function SyllableCounter({ verse }: Props) {
  const [text, setText] = useState(verse && verse.trim() ? verse : DEFAULT)
  const [mode, setMode] = useState<DiMode>('auto')
  const [over, setOver] = useState<Record<number, DiMode>>({})
  const [other, setOther] = useState('')

  const v = useMemo(() => analyzeVerse(text, mode, over), [text, mode, over])
  const v2 = useMemo(() => (other.trim() ? analyzeVerse(other, 'auto') : null), [other])
  const rime = v2 && v.words.length && v2.words.length ? rhyme(v, v2) : ''

  // numérotation des syllabes comptées
  let counter = 0
  const cells = v.words.map((w, wi) => ({
    w,
    wi,
    syl: w.syls.map((s) => ({ s, n: s.counted ? ++counter : 0 })),
  }))
  const diffs = v.words.flatMap((w, wi) => w.glides.map((g) => ({ ...g, wi, raw: w.raw })))
  const sel = EXAMPLES.some((e) => e.v === text) ? text : ''
  const ok = v.total > 0

  const setVerse = (t: string) => {
    setText(t)
    setOver({})
  }

  return (
    <WidgetFrame
      title="Compter les syllabes d'un vers"
      subtitle="Scansion approchée : e muet, élision, diérèse, césure"
      controls={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Exemples (domaine public)</Label>
            <Select value={sel} onChange={(e) => e.target.value && setVerse(e.target.value)} aria-label="Exemples de vers">
              <option value="">Vers personnalisé…</option>
              {EXAMPLES.map((e) => (
                <option key={e.v} value={e.v}>
                  {e.a} — {e.v.length > 30 ? e.v.slice(0, 30) + '…' : e.v}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Diérèse / synérèse</Label>
            <Segmented
              value={mode}
              onChange={(m) => {
                setMode(m)
                setOver({})
              }}
              options={[
                { value: 'auto', label: 'Auto' },
                { value: 'dierese', label: 'Toujours diérèse' },
                { value: 'synerese', label: 'Jamais' },
              ]}
            />
            <span className="text-xs text-muted-foreground">Cliquez sur un mot souligné pour forcer diérèse ou synérèse.</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Stat label="Syllabes" value={ok ? v.total : '—'} tone={v.total === 12 ? 'success' : undefined} />
            <Stat label="Mètre" value={ok ? v.meter : '—'} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Rime avec un autre vers (facultatif)</Label>
            <Input value={other} onChange={(e) => setOther(e.target.value)} placeholder="ex. Mignonne, allons voir si la rose" />
          </div>
        </>
      }
      footer={
        ok ? (
          <div className="flex flex-col gap-1">
            <div>
              Ce vers compte <b>{v.total}</b> syllabes : c'est un <b>{v.meter}</b>.
            </div>
            {v.cesureNote && <div className="text-xs">{v.cesureNote}</div>}
            {rime && <div className="text-xs">{rime}</div>}
            <div className="text-xs text-muted-foreground">Analyse automatique approchée : vérifiez toujours avec les règles du cours (liste de diérèses, h aspirés et finales en -ent verbales sont traitées par heuristiques).</div>
          </div>
        ) : (
          <span>Saisissez un vers pour lancer l'analyse.</span>
        )
      }
    >
      <div className="flex flex-col gap-4">
        <Input value={text} onChange={(e) => setVerse(e.target.value)} aria-label="Vers à scander" className="h-11 text-base" placeholder="Saisissez un vers…" />

        <div className="overflow-x-auto pb-1">
          <div className="flex w-max min-w-full flex-wrap items-start gap-x-3 gap-y-5 pt-5">
            {cells.map(({ w, wi, syl }) => {
              const can = w.glides.length > 0
              const forced = over[wi]
              return (
                <div key={wi} className="flex flex-col items-start">
                  <div className="flex items-start">
                    {syl.map(({ s, n }, si) => {
                      return (
                        <Fragment key={si}>
                          <div className="flex flex-col items-center" title={s.reason || (s.dier ? 'diérèse' : undefined)}>
                            <div
                              className={cn(
                                'min-w-[2.2rem] border px-1.5 py-1 text-center font-mono text-sm',
                                s.mute && s.counted && 'border-dashed bg-warning/10',
                                s.mute && !s.counted && 'border-dashed text-muted-foreground line-through opacity-60',
                                !s.mute && 'bg-background',
                                si > 0 && '-ml-px',
                              )}
                              style={s.dier ? { borderLeft: `3px solid ${PALETTE.violet}` } : undefined}
                            >
                              {s.text}
                            </div>
                            <div className={cn('mt-0.5 font-mono text-[11px] tabular-nums', n ? 'font-semibold' : 'text-muted-foreground')} style={n && s.mute ? { color: PALETTE.orange } : undefined}>
                              {n || '–'}
                            </div>
                          </div>
                          {v.cesure !== null && n === v.cesure && (
                            <CesureMark />
                          )}
                        </Fragment>
                      )
                    })}
                  </div>
                  {can && (
                    <button
                      type="button"
                      onClick={() => setOver((o) => ({ ...o, [wi]: NEXT[forced ?? mode] }))}
                      className="mt-0.5 border-b border-dotted text-[10px] uppercase tracking-wide hover:text-foreground"
                      style={{ color: PALETTE.violet, borderColor: PALETTE.violet }}
                      title="Cliquer pour basculer diérèse / synérèse"
                    >
                      {w.glides.map((g) => (g.kind === 'dierese' ? 'diérèse' : 'synérèse')).join(' · ')}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><span className="inline-block h-3 w-5 border bg-background" /> syllabe</span>
          <span className="inline-flex items-center gap-1.5"><span className="inline-block h-3 w-5 border border-dashed bg-warning/10" /> e muet compté</span>
          <span className="inline-flex items-center gap-1.5"><span className="inline-block h-3 w-5 border border-dashed opacity-60" /> e muet non compté</span>
          <span className="inline-flex items-center gap-1.5"><span className="inline-block h-3 w-1" style={{ background: PALETTE.violet }} /> diérèse</span>
        </div>

        {(v.notes.length > 0 || diffs.length > 0) && (
          <ul className="list-disc space-y-0.5 pl-5 text-xs text-muted-foreground">
            {diffs.map((g, i) => (
              <li key={'g' + i}>
                « {g.text} » dans « {g.raw} » : {g.kind === 'dierese' ? 'diérèse (les deux voyelles forment deux syllabes)' : 'synérèse (les deux voyelles ne forment qu’une syllabe)'}.
              </li>
            ))}
            {v.notes.map((n, i) => (
              <li key={'n' + i}>{n}</li>
            ))}
          </ul>
        )}
      </div>
    </WidgetFrame>
  )
}

function CesureMark() {
  return (
    <div className="relative mx-1.5 flex w-0 flex-col items-center self-stretch" aria-label="césure">
      <span className="absolute -top-4 whitespace-nowrap text-[9px] font-semibold uppercase tracking-widest" style={{ color: PALETTE.red }}>
        césure
      </span>
      <span className="h-[2.4rem] border-l-2" style={{ borderColor: PALETTE.red }} />
    </div>
  )
}
