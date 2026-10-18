import { useEffect, useMemo, useState } from 'react'
import { Play, Pause, RotateCcw, StepForward, Shuffle } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { Segmented } from '@/components/ui/tabs'
import { Stat } from '@/components/ui/misc'
import { cn } from '@/lib/utils'
import {
  AMINO,
  CLASS_COLOR,
  CLASS_LABEL,
  RNA_BASES,
  cleanDna,
  codonToAa,
  complementDna,
  toRna,
  type AaClass,
} from './_svt/genetics'

interface Props {
  /** Séquence ADN du brin NON transcrit (codant), écrite 5'→3'. */
  dna?: string
}

const DEFAULT_DNA = 'ATGACCCATGGCAAGTTTGGATAA'
const BASE_COLOR: Record<string, string> = {
  A: 'hsl(142 71% 45%)',
  T: 'hsl(0 84% 60%)',
  U: 'hsl(0 84% 60%)',
  C: 'hsl(217 91% 60%)',
  G: 'hsl(25 95% 53%)',
}
const CW = 24

function randomCoding(): string {
  const bases = 'ACGT'
  const n = 4 + Math.floor(Math.random() * 4)
  let s = 'ATG'
  for (let i = 0; i < n; i++) {
    let c = ''
    do {
      c = bases[Math.floor(Math.random() * 4)] + bases[Math.floor(Math.random() * 4)] + bases[Math.floor(Math.random() * 4)]
    } while (['TAA', 'TAG', 'TGA'].includes(c))
    s += c
  }
  return s + ['TAA', 'TAG', 'TGA'][Math.floor(Math.random() * 3)]
}

export default function DnaTranscription({ dna = DEFAULT_DNA }: Props) {
  const [mode, setMode] = useState<'codant' | 'transcrit'>('codant')
  const [raw, setRaw] = useState(cleanDna(dna, 60) || DEFAULT_DNA)
  const [tx, setTx] = useState(0)
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  // Brin codant (non transcrit) 5'→3'
  const coding = useMemo(() => {
    const s = cleanDna(raw, 60)
    return mode === 'codant' ? s : s.split('').map(complementDna).join('')
  }, [raw, mode])
  const N = coding.length
  const template = useMemo(() => coding.split('').map(complementDna).join(''), [coding]) // 3'→5'
  const mrna = useMemo(() => toRna(coding), [coding])

  const start = mrna.indexOf('AUG')
  const codons = useMemo(() => {
    const out: { s: number; codon: string; aa: string }[] = []
    if (start < 0) return out
    for (let i = start; i + 3 <= N; i += 3) {
      const codon = mrna.slice(i, i + 3)
      const aa = codonToAa(codon)
      out.push({ s: i, codon, aa })
      if (aa === '*') break
    }
    return out
  }, [mrna, start, N])
  const last = codons[codons.length - 1]
  const hasStop = !!last && last.aa === '*'

  // réinitialisation si la séquence change
  useEffect(() => {
    setTx(0)
    setStep(0)
    setPlaying(false)
  }, [coding])

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      if (tx < N) setTx((t) => t + 1)
      else if (step < codons.length) setStep((s) => s + 1)
      else setPlaying(false)
    }, tx < N ? 220 : 800)
    return () => clearInterval(id)
  }, [playing, tx, step, N, codons.length])

  const nextStep = () => {
    if (tx < N) setTx(N)
    else if (step < codons.length) setStep(step + 1)
  }
  const reset = () => {
    setTx(0)
    setStep(0)
    setPlaying(false)
  }
  const showAll = () => {
    setTx(N)
    setStep(codons.length)
    setPlaying(false)
  }

  const pad = 90
  const W = pad + N * CW + 20
  const cur = step > 0 ? codons[step - 1] : undefined
  const peptide = codons.slice(0, step).filter((c) => c.aa !== '*').map((c) => AMINO[c.aa].abbr)

  const rowY = { label: 16, coding: 44, bond: 62, tmpl: 84, pol: 112, mrna: 150, aa: 196 }

  return (
    <WidgetFrame
      title="De l’ADN à la protéine : transcription et traduction"
      subtitle="Brin transcrit, brin non transcrit, ARNm, codons et code génétique"
      controls={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Séquence saisie</Label>
            <Segmented
              value={mode}
              onChange={(m) => {
                setMode(m)
                setRaw(m === 'codant' ? coding : template)
              }}
              options={[
                { value: 'codant', label: 'Brin non transcrit' },
                { value: 'transcrit', label: 'Brin transcrit' },
              ]}
            />
            <Input
              value={raw}
              onChange={(e) => setRaw(cleanDna(e.target.value, 60))}
              className="font-mono uppercase tracking-widest"
              spellCheck={false}
              aria-label="Séquence d’ADN"
            />
            <div className="text-[11px] leading-snug text-muted-foreground">
              {mode === 'codant'
                ? 'Écrite 5′→3′ : elle a la même séquence que l’ARNm (T à la place de U).'
                : 'Écrite 3′→5′, base en face de base : c’est la matrice lue par l’ARN polymérase.'}
            </div>
            <div className="flex gap-2">
              <Button size="xs" variant="outline" onClick={() => setRaw(mode === 'codant' ? randomCoding() : randomCoding().split('').map(complementDna).join(''))}>
                <Shuffle /> Gène aléatoire
              </Button>
              <Button size="xs" variant="outline" onClick={() => setRaw(mode === 'codant' ? DEFAULT_DNA : DEFAULT_DNA.split('').map(complementDna).join(''))}>
                Exemple
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={() => setPlaying((p) => !p)} disabled={N === 0}>
              {playing ? <Pause /> : <Play />} {playing ? 'Pause' : 'Lecture'}
            </Button>
            <Button size="sm" variant="outline" onClick={nextStep} disabled={N === 0}>
              <StepForward /> Pas
            </Button>
            <Button size="sm" variant="outline" onClick={reset}>
              <RotateCcw />
            </Button>
          </div>
          <Button size="xs" variant="ghost" onClick={showAll}>
            Tout afficher
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Stat label="Nucléotides" value={N} />
            <Stat label="Codons lus" value={`${Math.min(step, codons.length)} / ${codons.length}`} />
            <Stat label="Codon initiateur" value={start < 0 ? 'absent' : `AUG (rang ${start + 1})`} tone={start < 0 ? 'destructive' : undefined} />
            <Stat label="Stop" value={start < 0 ? '—' : hasStop ? last.codon : 'absent'} tone={start >= 0 && !hasStop ? 'warning' : undefined} />
          </div>
        </>
      }
      footer={
        <div className="space-y-1.5 text-xs leading-relaxed">
          <p>
            <b>Brin transcrit</b> (ou brin matrice) : c’est celui que l’ARN polymérase lit, dans le sens 3′→5′. Elle synthétise l’ARNm dans le sens 5′→3′ en plaçant en face de chaque base
            la base complémentaire (A→U, T→A, C→G, G→C).
          </p>
          <p>
            <b>Brin non transcrit</b> (ou brin codant) : complémentaire du brin transcrit. Il a la même séquence que l’ARNm, à ceci près que T est remplacé par U. C’est pourquoi on lit les codons sur lui.
          </p>
          <p className="text-muted-foreground">
            Traduction : le ribosome lit l’ARNm de 5′ vers 3′, à partir du premier AUG (Met), codon par codon, jusqu’à un codon stop (UAA, UAG, UGA). Le code est universel, redondant (plusieurs codons pour un même acide aminé) mais non ambigu.
          </p>
        </div>
      }
    >
      <div className="space-y-4">
        {/* ----- Brins ----- */}
        <div className="overflow-x-auto border bg-background">
          <svg viewBox={`0 0 ${Math.max(W, 560)} 222`} style={{ minWidth: Math.max(W, 560) }} className="w-full" fontFamily="Geist, sans-serif">
            {/* étiquettes de gauche */}
            <g fontSize="10" className="svg-fill">
              <text x="6" y={rowY.coding + 4} fontWeight="600">Non transcrit</text>
              <text x="6" y={rowY.coding + 15} className="svg-muted" fontSize="9">(codant)</text>
              <text x="6" y={rowY.tmpl + 4} fontWeight="600">Transcrit</text>
              <text x="6" y={rowY.tmpl + 15} className="svg-muted" fontSize="9">(matrice)</text>
              <text x="6" y={rowY.mrna + 4} fontWeight="600">ARNm</text>
              <text x="6" y={rowY.aa + 4} fontWeight="600">Protéine</text>
            </g>
            <text x={pad - 8} y={rowY.label} textAnchor="end" fontSize="10" className="svg-muted" fontFamily="monospace">5′</text>
            <text x={pad + N * CW + 4} y={rowY.label} fontSize="10" className="svg-muted" fontFamily="monospace">3′</text>
            <line x1={pad} x2={pad + N * CW} y1={rowY.label - 3} y2={rowY.label - 3} className="svg-stroke" strokeWidth="0.8" markerEnd="url(#arr)" />
            <defs>
              <marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0 0 L8 4 L0 8 z" className="svg-fill" />
              </marker>
            </defs>

            {/* brin non transcrit 5'→3' */}
            {coding.split('').map((b, i) => (
              <g key={`c${i}`}>
                <text x={pad + i * CW + CW / 2} y={rowY.coding + 5} textAnchor="middle" fontFamily="monospace" fontSize="15" fontWeight="700" fill={BASE_COLOR[b]}>
                  {b}
                </text>
                <line x1={pad + i * CW + CW / 2} x2={pad + i * CW + CW / 2} y1={rowY.bond - 4} y2={rowY.bond + 8} className="svg-grid" strokeWidth="1.5" strokeDasharray="2 2" />
              </g>
            ))}
            {/* brin transcrit 3'→5' */}
            {template.split('').map((b, i) => (
              <text key={`t${i}`} x={pad + i * CW + CW / 2} y={rowY.tmpl + 5} textAnchor="middle" fontFamily="monospace" fontSize="15" fontWeight="700" fill={BASE_COLOR[b]}>
                {b}
              </text>
            ))}
            <text x={pad - 8} y={rowY.tmpl + 4} textAnchor="end" fontSize="10" className="svg-muted" fontFamily="monospace">3′</text>
            <text x={pad + N * CW + 4} y={rowY.tmpl + 4} fontSize="10" className="svg-muted" fontFamily="monospace">5′</text>
            <text x={pad - 8} y={rowY.coding + 4} textAnchor="end" fontSize="10" className="svg-muted" fontFamily="monospace">5′</text>
            <text x={pad + N * CW + 4} y={rowY.coding + 4} fontSize="10" className="svg-muted" fontFamily="monospace">3′</text>

            {/* ARN polymérase */}
            {tx > 0 && tx < N && (
              <g transform={`translate(${pad + tx * CW - CW / 2},${rowY.pol - 10})`}>
                <ellipse cx="0" cy="-10" rx="30" ry="22" fill="hsl(263 70% 60% / 0.25)" stroke="hsl(263 70% 60%)" strokeWidth="1.5" />
                <text x="0" y="-7" textAnchor="middle" fontSize="9" className="svg-fill">ARN pol.</text>
                <path d="M 0 12 L 0 18" className="svg-stroke" />
              </g>
            )}
            {/* ARNm en construction */}
            {mrna.split('').map((b, i) => {
              const done = i < tx
              return (
                <g key={`m${i}`}>
                  <rect x={pad + i * CW + 1} y={rowY.mrna - 12} width={CW - 2} height={22} fill={done ? 'hsl(var(--muted))' : 'transparent'} stroke={done ? 'none' : 'hsl(var(--border))'} strokeDasharray="2 2" />
                  {done && (
                    <text x={pad + i * CW + CW / 2} y={rowY.mrna + 5} textAnchor="middle" fontFamily="monospace" fontSize="15" fontWeight="700" fill={BASE_COLOR[b]}>
                      {b}
                    </text>
                  )}
                </g>
              )
            })}
            <text x={pad - 8} y={rowY.mrna + 4} textAnchor="end" fontSize="10" className="svg-muted" fontFamily="monospace">5′</text>
            <text x={pad + N * CW + 4} y={rowY.mrna + 4} fontSize="10" className="svg-muted" fontFamily="monospace">3′</text>
            {/* liaisons brin transcrit - ARNm */}
            {Array.from({ length: tx }).map((_, i) => (
              <line key={`l${i}`} x1={pad + i * CW + CW / 2} x2={pad + i * CW + CW / 2} y1={rowY.tmpl + 12} y2={rowY.mrna - 14} className="svg-grid" strokeDasharray="1 3" />
            ))}
            {/* codons + acides aminés */}
            {codons.map((c, j) => {
              const x = pad + c.s * CW
              const visible = c.s + 3 <= tx
              const translated = j < step
              const isCur = j === step - 1
              const aa = AMINO[c.aa]
              const col = CLASS_COLOR[aa.cls]
              return (
                <g key={`k${j}`} opacity={visible ? 1 : 0.15}>
                  <rect x={x + 0.5} y={rowY.mrna - 15} width={3 * CW - 1} height={28} fill="none" stroke={isCur ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'} strokeWidth={isCur ? 2.5 : 1} />
                  {translated && (
                    <g>
                      <line x1={x + 1.5 * CW} x2={x + 1.5 * CW} y1={rowY.mrna + 13} y2={rowY.aa - 14} className="svg-grid" strokeDasharray="2 2" />
                      <rect x={x + 3} y={rowY.aa - 14} width={3 * CW - 6} height={26} fill={col} fillOpacity={aa.cls === 'stop' ? 0.12 : 0.22} stroke={col} strokeWidth={isCur ? 2.5 : 1.2} />
                      <text x={x + 1.5 * CW} y={rowY.aa + 4} textAnchor="middle" fontSize="12" fontWeight="700" className="svg-fill">
                        {aa.abbr}
                      </text>
                    </g>
                  )}
                </g>
              )
            })}
            {start > 0 && (
              <text x={pad + (start * CW) / 2} y={rowY.mrna + 30} textAnchor="middle" fontSize="9" className="svg-muted">
                5′ non traduit
              </text>
            )}
            {start >= 0 && tx >= N && (
              <text x={pad + start * CW + 2} y={rowY.mrna + 30} fontSize="9" fill="hsl(142 71% 45%)" fontWeight="700">
                ▲ AUG : début de la traduction
              </text>
            )}
          </svg>
        </div>

        {start < 0 && N > 0 && (
          <div className="border border-warning/50 bg-warning/10 px-3 py-2 text-xs">
            Aucun codon AUG dans cette séquence : le ribosome ne trouve pas de codon d’initiation, la traduction ne démarre pas.
          </div>
        )}

        {/* ----- Ribosome ----- */}
        <Ribosome mrna={mrna} codons={codons} step={step} />

        {peptide.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 text-xs">
            <span className="font-medium text-muted-foreground">Chaîne polypeptidique :</span>
            {peptide.map((p, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="border bg-muted px-1.5 py-0.5 font-mono">{p}</span>
                {i < peptide.length - 1 && <span className="text-muted-foreground">–</span>}
              </span>
            ))}
            {cur?.aa === '*' && <span className="ml-2 font-semibold text-destructive">STOP : libération de la protéine</span>}
          </div>
        )}

        {/* ----- Tableau du code génétique ----- */}
        <GeneticCodeTable highlight={cur?.codon} />
      </div>
    </WidgetFrame>
  )
}

/* ------------------------------------------------------------------ */

function Ribosome({ mrna, codons, step }: { mrna: string; codons: { s: number; codon: string; aa: string }[]; step: number }) {
  const idx = step - 1
  const cur = codons[idx]
  const prev = codons[idx - 1]
  const next = codons[idx + 1]
  const anticodon = cur ? cur.codon.split('').map((b) => (b === 'A' ? 'U' : b === 'U' ? 'A' : b === 'C' ? 'G' : 'C')).join('') : ''
  const slots = [prev, cur, next]
  const aaHistory = codons.slice(0, Math.max(0, idx)).filter((c) => c.aa !== '*')
  void mrna
  return (
    <div className="border bg-background">
      <svg viewBox="0 0 560 230" className="w-full" fontFamily="Geist, sans-serif">
        <text x="10" y="18" fontSize="11" fontWeight="600" className="svg-fill">Ribosome (traduction)</text>
        {cur ? (
          <>
            {/* chaîne peptidique */}
            {aaHistory.slice(-5).map((c, k, arr) => {
              const n = arr.length
              const x = 175 - (n - k) * 24
              return (
                <g key={k}>
                  <circle cx={x} cy={52 + (n - k) * 2} r="10" fill={CLASS_COLOR[AMINO[c.aa].cls]} fillOpacity="0.3" stroke={CLASS_COLOR[AMINO[c.aa].cls]} />
                  <text x={x} y={56 + (n - k) * 2} fontSize="8" textAnchor="middle" className="svg-fill">{AMINO[c.aa].abbr}</text>
                </g>
              )
            })}
            {/* grande sous-unité */}
            <path d="M 150 118 Q 150 50 280 50 Q 410 50 410 118 Z" fill="hsl(263 70% 60% / 0.22)" stroke="hsl(263 70% 60%)" strokeWidth="1.5" />
            <text x="345" y="75" fontSize="10" className="svg-fill" textAnchor="middle">grande sous-unité</text>
            {/* petite sous-unité */}
            <path d="M 170 126 L 390 126 Q 390 160 280 160 Q 170 160 170 126 Z" fill="hsl(173 80% 40% / 0.25)" stroke="hsl(173 80% 40%)" strokeWidth="1.5" />
            <text x="340" y="148" fontSize="10" className="svg-fill" textAnchor="middle">petite sous-unité</text>
            {/* ARNm */}
            <line x1="20" x2="540" y1="122" y2="122" className="svg-stroke" strokeWidth="2" />
            {slots.map((c, k) => {
              if (!c) return null
              const x = 200 + k * 80
              return (
                <g key={k}>
                  <rect x={x} y="114" width="72" height="16" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth={k === 1 ? 2 : 0.8} />
                  <text x={x + 36} y="126" textAnchor="middle" fontFamily="monospace" fontSize="12" fontWeight="700" className="svg-fill">{c.codon}</text>
                </g>
              )
            })}
            <text x="30" y="112" fontSize="10" className="svg-muted">5′</text>
            <text x="520" y="112" fontSize="10" className="svg-muted">3′</text>
            <text x="236" y="176" fontSize="9" textAnchor="middle" className="svg-muted">site P</text>
            <text x="316" y="176" fontSize="9" textAnchor="middle" className="svg-muted">site A</text>
            {/* ARNt sur le site A (codon courant) */}
            {cur.aa !== '*' ? (
              <g>
                <path d="M 316 130 L 316 190 M 300 190 L 332 190" className="svg-stroke" strokeWidth="2" fill="none" />
                <text x="316" y="204" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="700" className="svg-fill">{anticodon}</text>
                <text x="316" y="218" textAnchor="middle" fontSize="9" className="svg-muted">anticodon (3′→5′)</text>
                <circle cx="316" cy="190" r="0.1" />
                <circle cx="346" cy="198" r="11" fill={CLASS_COLOR[AMINO[cur.aa].cls]} fillOpacity="0.3" stroke={CLASS_COLOR[AMINO[cur.aa].cls]} />
                <text x="346" y="201" textAnchor="middle" fontSize="8" className="svg-fill">{AMINO[cur.aa].abbr}</text>
                <text x="372" y="202" fontSize="10" className="svg-muted">ARNt {AMINO[cur.aa].name.toLowerCase()}</text>
              </g>
            ) : (
              <g>
                <text x="316" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(0 84% 60%)">codon stop</text>
                <text x="316" y="212" textAnchor="middle" fontSize="9" className="svg-muted">facteur de terminaison : pas d’ARNt</text>
              </g>
            )}
          </>
        ) : (
          <text x="280" y="120" textAnchor="middle" fontSize="12" className="svg-muted">
            Terminez la transcription puis avancez pas à pas pour voir le ribosome lire les codons.
          </text>
        )}
      </svg>
    </div>
  )
}

function GeneticCodeTable({ highlight }: { highlight?: string }) {
  return (
    <div className="overflow-x-auto">
      <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
        <span className="font-semibold">Code génétique standard (64 codons de l’ARNm)</span>
        {(['apolaire', 'polaire', 'basique', 'acide', 'stop'] as AaClass[]).map((c) => (
          <span key={c} className="inline-flex items-center gap-1 text-muted-foreground">
            <span className="inline-block size-2.5" style={{ background: CLASS_COLOR[c], opacity: 0.7 }} />
            {CLASS_LABEL[c]}
          </span>
        ))}
      </div>
      <table className="w-full min-w-[520px] border-collapse text-[11px]">
        <thead>
          <tr>
            <th className="border bg-muted/50 px-1 py-1 font-medium">1<sup>re</sup> base</th>
            {RNA_BASES.map((b) => (
              <th key={b} className="border bg-muted/50 px-1 py-1 font-mono">2<sup>e</sup> base : {b}</th>
            ))}
            <th className="border bg-muted/50 px-1 py-1 font-medium">3<sup>e</sup> base</th>
          </tr>
        </thead>
        <tbody>
          {RNA_BASES.map((b1) => (
            <tr key={b1}>
              <th className="border bg-muted/50 px-1 text-center font-mono text-sm">{b1}</th>
              {RNA_BASES.map((b2) => (
                <td key={b2} className="border p-0 align-top">
                  {RNA_BASES.map((b3) => {
                    const codon = b1 + b2 + b3
                    const aa = AMINO[codonToAa(codon)]
                    const on = highlight === codon
                    return (
                      <div
                        key={b3}
                        className={cn('flex items-center justify-between gap-1 px-1.5 py-[1px] font-mono', on && 'outline outline-2 -outline-offset-2 outline-primary')}
                        style={{ background: `color-mix(in srgb, ${CLASS_COLOR[aa.cls]} ${on ? 55 : 18}%, transparent)` }}
                      >
                        <span>{codon}</span>
                        <span className={cn('font-sans', on && 'font-bold')}>{aa.abbr}</span>
                      </div>
                    )
                  })}
                </td>
              ))}
              <td className="border p-0">
                {RNA_BASES.map((b3) => (
                  <div key={b3} className="px-1.5 py-[1px] text-center font-mono text-muted-foreground">{b3}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-1 text-[11px] text-muted-foreground">AUG = Met = codon d’initiation. UAA, UAG, UGA = codons stop. 61 codons pour 20 acides aminés : le code est redondant (dégénéré).</div>
    </div>
  )
}
