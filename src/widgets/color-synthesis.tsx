import { useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Tex } from '@/components/Tex'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Segmented } from '@/components/ui/tabs'
import { Stat } from '@/components/ui/misc'
import { PALETTE } from '@/lib/plot'
import { cn } from '@/lib/utils'

type Mode = 'additive' | 'soustractive' | 'objet'

interface Props {
  mode?: 'additive' | 'soustractive' | 'objet'
}

type RGB = [number, number, number]
const css = (c: RGB) => `rgb(${c.map((v) => Math.round(255 * Math.max(0, Math.min(1, v)))).join(', ')})`

/** Nom de la couleur perçue (approché) */
function colorName([r, g, b]: RGB): string {
  const mx = Math.max(r, g, b)
  const mn = Math.min(r, g, b)
  if (mx < 0.06) return 'noir'
  if (mx - mn < 0.12 * mx) return mx > 0.9 ? 'blanc' : 'gris'
  const on = [r, g, b].map((v) => v - mn > 0.55 * (mx - mn))
  const pale = mn > 0.35 * mx ? ' pâle' : ''
  const dark = mx < 0.45 ? ' sombre' : ''
  let n = ''
  if (on[0] && on[1] && !on[2]) n = Math.abs(r - g) < 0.25 * mx ? 'jaune' : r > g ? 'orangé' : 'jaune-vert'
  else if (on[1] && on[2] && !on[0]) n = Math.abs(g - b) < 0.25 * mx ? 'cyan' : g > b ? 'vert-cyan' : 'bleu-cyan'
  else if (on[0] && on[2] && !on[1]) n = Math.abs(r - b) < 0.25 * mx ? 'magenta' : r > b ? 'rose / rouge-magenta' : 'violet'
  else if (on[0]) n = g - mn > 0.25 * (mx - mn) ? 'orangé' : b - mn > 0.25 * (mx - mn) ? 'rouge-rose' : 'rouge'
  else if (on[1]) n = r - mn > 0.25 * (mx - mn) ? 'vert-jaune' : b - mn > 0.25 * (mx - mn) ? 'vert d’eau' : 'vert'
  else n = r - mn > 0.25 * (mx - mn) ? 'bleu-violet' : g - mn > 0.25 * (mx - mn) ? 'bleu azur' : 'bleu'
  return n + pale + dark
}

const PRIMARIES = [
  { key: 'R', name: 'rouge', c: [1, 0, 0] as RGB, comp: 'cyan', band: '≈ 600 – 780 nm' },
  { key: 'V', name: 'vert', c: [0, 1, 0] as RGB, comp: 'magenta', band: '≈ 500 – 600 nm' },
  { key: 'B', name: 'bleu', c: [0, 0, 1] as RGB, comp: 'jaune', band: '≈ 400 – 500 nm' },
]

const OBJECTS: { name: string; d: RGB }[] = [
  { name: 'blanc', d: [1, 1, 1] },
  { name: 'rouge', d: [1, 0, 0] },
  { name: 'vert', d: [0, 1, 0] },
  { name: 'bleu', d: [0, 0, 1] },
  { name: 'jaune', d: [1, 1, 0] },
  { name: 'cyan', d: [0, 1, 1] },
  { name: 'magenta', d: [1, 0, 1] },
  { name: 'noir', d: [0, 0, 0] },
]

export default function ColorSynthesis({ mode = 'additive' }: Props) {
  const [m, setM] = useState<Mode>(mode === 'soustractive' || mode === 'objet' ? mode : 'additive')
  const [rgb, setRgb] = useState<RGB>([1, 1, 0])
  const [cmy, setCmy] = useState<RGB>([0, 1, 1]) // absorption des filtres cyan, magenta, jaune
  const [light, setLight] = useState<RGB>([1, 1, 1])
  const [obj, setObj] = useState(1)

  const presetsAdd: { label: string; v: RGB }[] = [
    { label: 'R + V', v: [1, 1, 0] },
    { label: 'V + B', v: [0, 1, 1] },
    { label: 'R + B', v: [1, 0, 1] },
    { label: 'R + V + B', v: [1, 1, 1] },
    { label: 'Orange', v: [1, 0.5, 0] },
  ]
  const presetsSub: { label: string; v: RGB }[] = [
    { label: 'M + J', v: [0, 1, 1] },
    { label: 'C + J', v: [1, 0, 1] },
    { label: 'C + M', v: [1, 1, 0] },
    { label: 'C + M + J', v: [1, 1, 1] },
    { label: 'aucun', v: [0, 0, 0] },
  ]

  let result: RGB
  if (m === 'additive') result = rgb
  else if (m === 'soustractive') result = [1 - cmy[0], 1 - cmy[1], 1 - cmy[2]]
  else result = [light[0] * OBJECTS[obj].d[0], light[1] * OBJECTS[obj].d[1], light[2] * OBJECTS[obj].d[2]]
  const name = colorName(result)

  const W = 360
  const H = 300
  const cR = 78
  const centers = [
    [W / 2, H / 2 - 42],
    [W / 2 - 48, H / 2 + 38],
    [W / 2 + 48, H / 2 + 38],
  ]

  const controls = (
    <>
      <Segmented
        value={m}
        onChange={setM}
        options={[
          { value: 'additive', label: 'Additive' },
          { value: 'soustractive', label: 'Soustractive' },
          { value: 'objet', label: 'Objet éclairé' },
        ]}
      />
      {m === 'additive' && (
        <>
          {PRIMARIES.map((p, i) => (
            <Slider
              key={p.key}
              label={<span style={{ color: css(p.c) }}>■ Lumière {p.name}</span>}
              value={Math.round(rgb[i] * 100)}
              min={0}
              max={100}
              step={1}
              digits={0}
              unit="%"
              onChange={(v) => {
                const n = rgb.slice() as RGB
                n[i] = v / 100
                setRgb(n)
              }}
            />
          ))}
          <div className="flex flex-wrap gap-1">
            {presetsAdd.map((p) => (
              <Button key={p.label} size="xs" variant="outline" onClick={() => setRgb(p.v)}>
                {p.label}
              </Button>
            ))}
          </div>
        </>
      )}
      {m === 'soustractive' && (
        <>
          {[
            { n: 'cyan', c: [0, 1, 1] as RGB, abs: 'rouge' },
            { n: 'magenta', c: [1, 0, 1] as RGB, abs: 'vert' },
            { n: 'jaune', c: [1, 1, 0] as RGB, abs: 'bleu' },
          ].map((f, i) => (
            <Slider
              key={f.n}
              label={
                <span>
                  <span style={{ color: css(f.c) }}>■</span> Filtre {f.n} <span className="text-[10px]">(absorbe le {f.abs})</span>
                </span>
              }
              value={Math.round(cmy[i] * 100)}
              min={0}
              max={100}
              step={1}
              digits={0}
              unit="%"
              onChange={(v) => {
                const n = cmy.slice() as RGB
                n[i] = v / 100
                setCmy(n)
              }}
            />
          ))}
          <div className="flex flex-wrap gap-1">
            {presetsSub.map((p) => (
              <Button key={p.label} size="xs" variant="outline" onClick={() => setCmy(p.v)}>
                {p.label}
              </Button>
            ))}
          </div>
        </>
      )}
      {m === 'objet' && (
        <>
          <div>
            <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Lumière incidente</div>
            <div className="flex gap-1">
              {PRIMARIES.map((p, i) => (
                <button
                  key={p.key}
                  onClick={() => {
                    const n = light.slice() as RGB
                    n[i] = n[i] ? 0 : 1
                    setLight(n)
                  }}
                  className={cn('flex-1 border px-2 py-1 text-xs', light[i] ? 'text-white' : 'bg-background text-muted-foreground')}
                  style={light[i] ? { background: css(p.c.map((v) => v * 0.85) as RGB) } : undefined}
                >
                  {p.key}
                </button>
              ))}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Lumière : <strong className="text-foreground">{colorName(light)}</strong>
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Objet (couleur en lumière blanche)</div>
            <div className="grid grid-cols-4 gap-1">
              {OBJECTS.map((o, i) => (
                <button
                  key={o.name}
                  onClick={() => setObj(i)}
                  className={cn('flex flex-col items-center gap-0.5 border px-1 py-1 text-[10px]', obj === i && 'ring-2 ring-ring')}
                >
                  <span className="block h-3 w-full border" style={{ background: css(o.d) }} />
                  {o.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )

  return (
    <WidgetFrame
      title="Synthèse des couleurs"
      subtitle={m === 'additive' ? 'Superposition de lumières colorées (écrans, projecteurs)' : m === 'soustractive' ? 'Filtres et pigments : soustraction de lumière à partir du blanc' : 'Couleur perçue = lumière diffusée par l’objet'}
      controls={controls}
      footer={
        m === 'additive' ? (
          <span>
            Synthèse <strong>additive</strong> : R + V = jaune, V + B = cyan, R + B = magenta, R + V + B = blanc. Deux couleurs dont la superposition donne du blanc sont
            <strong> complémentaires</strong> (ex. jaune et bleu).
          </span>
        ) : m === 'soustractive' ? (
          <span>
            Un filtre <strong>absorbe</strong> sa couleur complémentaire et transmet le reste : cyan = blanc − rouge, magenta = blanc − vert, jaune = blanc − bleu. C + M + J
            superposés = noir.
          </span>
        ) : (
          <span>
            Un objet <strong>diffuse</strong> les lumières de sa couleur et absorbe les autres. Éclairé par une lumière qu’il absorbe totalement, il paraît noir.
          </span>
        )
      }
    >
      <div className="flex flex-col gap-3">
        <div className="grid gap-3 md:grid-cols-[1fr_1fr]">
          {m === 'objet' ? (
            <ObjectScene light={light} obj={OBJECTS[obj].d} result={result} />
          ) : (
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full border" style={{ background: m === 'additive' ? '#000' : '#fff' }} role="img" aria-label="Superposition des couleurs">
              <g style={{ isolation: 'isolate' }}>
                {(m === 'additive'
                  ? PRIMARIES.map((p, i) => css(p.c.map((v) => v * rgb[i]) as RGB))
                  : [
                      css([1 - cmy[0], 1, 1]),
                      css([1, 1 - cmy[1], 1]),
                      css([1, 1, 1 - cmy[2]]),
                    ]
                ).map((col, i) => (
                  <circle key={i} cx={centers[i][0]} cy={centers[i][1]} r={cR} fill={col} style={{ mixBlendMode: m === 'additive' ? 'screen' : 'multiply' }} />
                ))}
              </g>
              <g fontFamily="Geist, sans-serif" fontSize={12} fontWeight={600}>
                {(m === 'additive' ? ['R', 'V', 'B'] : ['C', 'M', 'J']).map((t, i) => (
                  <text
                    key={t}
                    x={centers[i][0] + (i === 0 ? 0 : i === 1 ? -40 : 40)}
                    y={centers[i][1] + (i === 0 ? -42 : 40)}
                    textAnchor="middle"
                    fill={m === 'additive' ? '#fff' : '#111'}
                    opacity={0.8}
                  >
                    {t}
                  </text>
                ))}
              </g>
              <text x={8} y={H - 8} fontSize={10} fill={m === 'additive' ? '#aaa' : '#555'} fontFamily="Geist, sans-serif">
                {m === 'additive' ? 'écran noir éclairé par 3 projecteurs' : 'filtres superposés devant une lumière blanche'}
              </text>
            </svg>
          )}
          <div className="flex flex-col gap-2">
            <div className="flex items-stretch gap-3 border bg-background p-3">
              <div className="h-20 w-20 shrink-0 border" style={{ background: css(result) }} />
              <div className="flex flex-col justify-center">
                <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Couleur perçue</div>
                <div className="text-lg font-semibold">{name}</div>
                <div className="font-mono text-xs text-muted-foreground">
                  R {Math.round(result[0] * 100)} % · V {Math.round(result[1] * 100)} % · B {Math.round(result[2] * 100)} %
                </div>
              </div>
            </div>
            {m === 'soustractive' && <FilterBeam cmy={cmy} />}
            {m === 'additive' && (
              <div className="grid grid-cols-3 gap-2">
                {PRIMARIES.map((p, i) => (
                  <Stat key={p.key} label={`${p.name}`} value={`${Math.round(rgb[i] * 100)} %`} />
                ))}
              </div>
            )}
            <div className="border bg-muted/20 p-3 text-xs">
              <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Couleurs complémentaires</div>
              <div className="grid grid-cols-3 gap-2">
                {PRIMARIES.map((p) => (
                  <div key={p.key} className="flex items-center gap-1.5">
                    <span className="inline-block size-3 border" style={{ background: css(p.c) }} />
                    <span>{p.name}</span>
                    <span className="text-muted-foreground">↔</span>
                    <span className="inline-block size-3 border" style={{ background: css(p.c.map((v) => 1 - v) as RGB) }} />
                    <span>{p.comp}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-muted-foreground">
                <Tex>{m === 'soustractive' ? String.raw`\text{transmis} = \text{blanc} - \text{absorbé}` : m === 'objet' ? String.raw`\text{perçu} = \text{incident} \cap \text{diffusé par l'objet}` : String.raw`\text{R} + \text{V} + \text{B} = \text{blanc}`}</Tex>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex h-3 w-full" aria-hidden>
            <div className="h-full flex-[100]" style={{ background: 'linear-gradient(to right, #6a00ff, #0040ff 40%, #00a0ff 90%, #00ffc0)' }} />
            <div className="h-full flex-[100]" style={{ background: 'linear-gradient(to right, #00ff60, #80ff00 50%, #ffe000 80%, #ff9000)' }} />
            <div className="h-full flex-[180]" style={{ background: 'linear-gradient(to right, #ff6000, #ff0000 30%, #b00000 80%, #600000)' }} />
          </div>
          <div className="mt-1 flex font-mono text-[10px] text-muted-foreground">
            <span className="flex-[100]">400 nm · domaine « bleu »</span>
            <span className="flex-[100]">500 nm · « vert »</span>
            <span className="flex-[180]">600 nm · « rouge » → 780 nm</span>
          </div>
        </div>
      </div>
    </WidgetFrame>
  )
}

/** Faisceau blanc (3 composantes) traversant les filtres */
function FilterBeam({ cmy }: { cmy: RGB }) {
  const W = 360
  const H = 120
  const ys = [32, 60, 88]
  const cols = ['rgb(255,40,40)', 'rgb(40,200,40)', 'rgb(60,90,255)']
  const fx = [120, 180, 240]
  const fcol = ['rgb(0,220,220)', 'rgb(230,0,230)', 'rgb(240,220,0)']
  // intensité de chaque composante après chaque filtre
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full border bg-background" role="img" aria-label="Filtres traversés par la lumière">
      <text x={8} y={14} fontSize={10} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
        lumière blanche = R + V + B
      </text>
      {fx.map((x, k) => (
        <g key={k}>
          <rect x={x - 6} y={18} width={12} height={88} fill={fcol[k]} opacity={0.15 + 0.6 * cmy[k]} stroke={PALETTE.fg} strokeOpacity={0.4} />
          <text x={x} y={H - 2} textAnchor="middle" fontSize={10} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
            {['C', 'M', 'J'][k]}
          </text>
        </g>
      ))}
      {ys.map((y, i) => {
        // composante i absorbée par le filtre i (cyan absorbe R, magenta V, jaune B)
        const after = 1 - cmy[i]
        const xa = fx[i] - 6
        return (
          <g key={i}>
            <line x1={20} x2={xa} y1={y} y2={y} stroke={cols[i]} strokeWidth={4} />
            <line x1={xa + 12} x2={330} y1={y} y2={y} stroke={cols[i]} strokeWidth={4} opacity={after} />
            <path d={`M330,${y - 5} L340,${y} L330,${y + 5} Z`} fill={cols[i]} opacity={Math.max(0.08, after)} />
            {after < 0.05 && (
              <text x={xa + 20} y={y + 4} fontSize={10} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
                absorbé
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

function ObjectScene({ light, obj, result }: { light: RGB; obj: RGB; result: RGB }) {
  const W = 360
  const H = 300
  const cols = ['rgb(255,40,40)', 'rgb(40,200,40)', 'rgb(60,90,255)']
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full border bg-background" role="img" aria-label="Objet éclairé">
      {/* source */}
      <rect x={20} y={30} width={60} height={36} fill={css(light)} stroke={PALETTE.fg} />
      <text x={50} y={84} textAnchor="middle" fontSize={10} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
        source
      </text>
      {/* rayons incidents */}
      {[0, 1, 2].map((i) =>
        light[i] ? <line key={'i' + i} x1={80} y1={44 + i * 6} x2={170 + i * 10} y2={200} stroke={cols[i]} strokeWidth={3} /> : null,
      )}
      {/* objet */}
      <rect x={140} y={200} width={100} height={60} fill={css(result)} stroke={PALETTE.fg} />
      <text x={190} y={278} textAnchor="middle" fontSize={10} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
        objet ({colorName(obj)} en lumière blanche)
      </text>
      {/* rayons diffusés vers l'œil */}
      {[0, 1, 2].map((i) =>
        light[i] && obj[i] ? <line key={'d' + i} x1={210 + i * 8} y1={200} x2={300} y2={70 + i * 6} stroke={cols[i]} strokeWidth={3} /> : null,
      )}
      {[0, 1, 2].map((i) =>
        light[i] && !obj[i] ? (
          <text key={'a' + i} x={190} y={190 - i * 12} textAnchor="middle" fontSize={9} fill={cols[i]} fontFamily="Geist, sans-serif">
            {['R', 'V', 'B'][i]} absorbé
          </text>
        ) : null,
      )}
      {/* œil */}
      <g transform="translate(320,72)">
        <path d="M-18,0 Q0,-14 18,0 Q0,14 -18,0 Z" fill="none" stroke={PALETTE.fg} strokeWidth={1.5} />
        <circle r={5} fill={PALETTE.fg} />
      </g>
      <text x={320} y={100} textAnchor="middle" fontSize={10} fill={PALETTE.muted} fontFamily="Geist, sans-serif">
        œil
      </text>
    </svg>
  )
}
