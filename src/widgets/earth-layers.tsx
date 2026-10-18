import { useState } from 'react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Slider } from '@/components/ui/slider'
import { Segmented } from '@/components/ui/tabs'
import { Switch, Stat } from '@/components/ui/misc'
import { Label } from '@/components/ui/input'
import { fmt } from '@/lib/utils'

/* Valeurs approximatives inspirées du modèle PREM (Preliminary Reference Earth Model). */
const RT = 6371
const MOHO = 30
const GUTENBERG = 2891
const LEHMANN = 5150

type Pt = [number, number]
const VP: Pt[] = [[0, 5.8], [30, 6.8], [30, 8.1], [80, 8.0], [220, 8.55], [400, 8.9], [400, 9.13], [670, 10.27], [670, 10.75], [1000, 11.4], [2000, 12.8], [2891, 13.72], [2891, 8.06], [3500, 8.9], [4500, 9.9], [5150, 10.36], [5150, 11.03], [6371, 11.26]]
const VS: Pt[] = [[0, 3.2], [30, 3.9], [30, 4.5], [80, 4.4], [220, 4.64], [400, 4.77], [400, 4.93], [670, 5.57], [670, 5.95], [1000, 6.3], [2000, 6.9], [2891, 7.26], [2891, 0], [5150, 0], [5150, 3.5], [6371, 3.67]]
const TEMP: Pt[] = [[0, 15], [30, 550], [100, 1300], [400, 1500], [670, 1700], [2891, 3500], [5150, 5000], [6371, 5400]]
const PRES: Pt[] = [[0, 0], [30, 0.9], [100, 3.2], [400, 13.4], [670, 23.8], [2891, 135.8], [5150, 328.9], [6371, 363.9]]

function interp(pts: Pt[], d: number): number {
  for (let i = 0; i < pts.length - 1; i++) {
    const [d0, v0] = pts[i]
    const [d1, v1] = pts[i + 1]
    if (d1 > d0 && d >= d0 && d <= d1) {
      // à une discontinuité, on prend la valeur du côté profond
      return v0 + ((v1 - v0) * (d - d0)) / (d1 - d0)
    }
  }
  return pts[pts.length - 1][1]
}
function interpDeep(pts: Pt[], d: number): number {
  // même chose mais, à profondeur égale à une discontinuité, renvoie la valeur profonde
  for (let i = pts.length - 2; i >= 0; i--) {
    const [d0, v0] = pts[i]
    const [d1, v1] = pts[i + 1]
    if (d1 > d0 && d >= d0 && d <= d1) return v0 + ((v1 - v0) * (d - d0)) / (d1 - d0)
  }
  return pts[0][1]
}

interface Layer {
  name: string
  from: number
  to: number
  fill: string
  state: string
  comp: string
}
const LAYERS: Layer[] = [
  { name: 'Croûte', from: 0, to: MOHO, fill: 'hsl(25 40% 40% / 0.85)', state: 'solide', comp: 'granite, gneiss (continentale) ; basalte, gabbro (océanique)' },
  { name: 'Manteau supérieur', from: MOHO, to: 670, fill: 'hsl(25 95% 53% / 0.55)', state: 'solide (péridotite), faiblement ductile vers 100-250 km', comp: 'péridotite (olivine, pyroxènes)' },
  { name: 'Manteau inférieur', from: 670, to: GUTENBERG, fill: 'hsl(8 80% 50% / 0.6)', state: 'solide', comp: 'péridotite sous forme de minéraux de haute pression' },
  { name: 'Noyau externe', from: GUTENBERG, to: LEHMANN, fill: 'hsl(45 93% 47% / 0.65)', state: 'liquide', comp: 'alliage fer-nickel liquide' },
  { name: 'Graine (noyau interne)', from: LEHMANN, to: RT, fill: 'hsl(45 100% 75% / 0.85)', state: 'solide', comp: 'alliage fer-nickel solide' },
]
const layerAt = (d: number) => LAYERS.find((l) => d < l.to) ?? LAYERS[LAYERS.length - 1]

type Chart = 'vitesses' | 'temperature'

export default function EarthLayers() {
  const [depth, setDepth] = useState(150)
  const [view, setView] = useState<'globe' | 'zoom'>('globe')
  const [chart, setChart] = useState<Chart>('vitesses')
  const [exag, setExag] = useState(true)
  const [shadow, setShadow] = useState(false)
  const [rng, setRng] = useState<'all' | 'top'>('all')

  const L = layerAt(depth)
  const vp = interpDeep(VP, depth)
  const vs = interpDeep(VS, depth)
  const T = interp(TEMP, depth)
  const P = interp(PRES, depth)
  const liquid = vs === 0
  const lith = depth < 100 ? 'lithosphère (rigide)' : depth < 250 ? 'asthénosphère (ductile)' : ''

  return (
    <WidgetFrame
      title="Structure interne du globe"
      subtitle="Enveloppes, discontinuités sismiques, vitesses des ondes P et S, géotherme (valeurs approximatives du modèle PREM)"
      controls={
        <>
          <Slider label="Profondeur" value={depth} min={0} max={RT} step={view === 'zoom' ? 1 : 10} unit="km" digits={0} onChange={setDepth} />
          <div className="flex flex-wrap gap-1">
            {[0, 30, 100, 670, 2891, 5150].map((d) => (
              <button key={d} onClick={() => setDepth(d)} className="border px-1.5 py-0.5 font-mono text-[10px] hover:bg-accent">
                {d}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Vue</Label>
            <Segmented value={view} onChange={setView} options={[{ value: 'globe', label: 'Globe entier' }, { value: 'zoom', label: 'Zoom lithosphère' }]} />
          </div>
          {view === 'globe' && (
            <>
              <Switch checked={exag} onChange={setExag} label="Agrandir les 200 premiers km" />
              <Switch checked={shadow} onChange={setShadow} label="Zone d’ombre sismique" />
            </>
          )}
          <div className="grid grid-cols-2 gap-2">
            <Stat label="Couche" value={L.name} className="col-span-2" />
            <Stat label="Vp" value={`${fmt(vp, 2)} km/s`} tone="info" />
            <Stat label="Vs" value={liquid ? '0 (liquide)' : `${fmt(vs, 2)} km/s`} tone={liquid ? 'destructive' : 'info'} />
            <Stat label="Température" value={`≈ ${fmt(Math.round(T / 50) * 50, 0)} °C`} />
            <Stat label="Pression" value={`≈ ${P < 10 ? fmt(P, 1) : fmt(Math.round(P), 0)} GPa`} />
          </div>
        </>
      }
      footer={
        <div className="space-y-1 text-xs leading-relaxed">
          <p>
            <b>À {fmt(depth, 0)} km :</b> {L.name.toLowerCase()} ({L.state}) ; composition : {L.comp}.{lith ? ` Domaine de la ${lith}.` : ''} {liquid ? 'Les ondes S ne traversent pas les milieux liquides : Vs = 0.' : ''}
          </p>
          <p className="text-muted-foreground">
            Les discontinuités (brusques variations de vitesse) sont révélées par la réflexion et la réfraction des ondes sismiques : <b>Moho</b> (≈ 30 km sous les continents, ≈ 7 km sous les océans), <b>Gutenberg</b> (2 900 km,
            manteau/noyau), <b>Lehmann</b> (5 150 km, noyau externe/graine). Les ondes P (de compression) sont plus rapides que les ondes S (de cisaillement).
          </p>
        </div>
      }
    >
      <div className="space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          {view === 'globe' ? <Globe depth={depth} exag={exag} shadow={shadow} /> : <Zoom depth={depth} />}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Segmented value={chart} onChange={setChart} options={[{ value: 'vitesses', label: 'Vitesses P et S' }, { value: 'temperature', label: 'Géotherme' }]} />
              <Segmented value={rng} onChange={setRng} options={[{ value: 'all', label: '0–6 371 km' }, { value: 'top', label: '0–700 km' }]} />
            </div>
            <Profile chart={chart} depth={depth} max={rng === 'all' ? RT : 700} />
          </div>
        </div>
        {shadow && view === 'globe' && (
          <p className="border bg-muted/30 px-3 py-2 text-xs leading-relaxed">
            Depuis un séisme, les ondes <b>P</b> ne sont pas enregistrées entre 105° et 140° (zone d’ombre : réfraction à la limite manteau/noyau) ; les ondes <b>S</b> ne le sont nulle part au-delà de 105° : elles sont arrêtées par le noyau externe liquide.
            C’est ainsi que l’on a montré l’existence d’un noyau liquide.
          </p>
        )}
      </div>
    </WidgetFrame>
  )
}

/* ------------------------------------------------------------------ */

function Globe({ depth, exag, shadow }: { depth: number; exag: boolean; shadow: boolean }) {
  const C = 200
  const R = 168
  const g = (d: number) => (exag ? (d <= 200 ? (d / 200) * 0.12 : 0.12 + ((d - 200) / (RT - 200)) * 0.88) : d / RT)
  const r = (d: number) => R * (1 - g(d))
  const pt = (rad: number, deg: number) => [C + rad * Math.sin((deg * Math.PI) / 180), C - rad * Math.cos((deg * Math.PI) / 180)]
  const arc = (rad: number, a0: number, a1: number) => {
    const [x0, y0] = pt(rad, a0)
    const [x1, y1] = pt(rad, a1)
    return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${rad} ${rad} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`
  }
  const cur = r(depth)
  const labels: { t: string; d0: number; d1: number; size?: number }[] = [
    { t: 'Manteau supérieur', d0: MOHO, d1: 670, size: 8.5 },
    { t: 'Manteau inférieur', d0: 670, d1: GUTENBERG },
    { t: 'Noyau externe (liquide)', d0: GUTENBERG, d1: LEHMANN },
  ]
  const lithR = r(100)
  return (
    <div className="border bg-background">
      <svg viewBox="0 0 400 400" className="w-full" fontFamily="Geist, sans-serif">
        {LAYERS.map((l) => (
          <circle key={l.name} cx={C} cy={C} r={r(l.from)} fill={l.fill} stroke="hsl(var(--foreground))" strokeWidth="0.8" />
        ))}
        {/* masque : chaque disque recouvre le précédent -> ordre décroissant des rayons : tous dessinés dans l'ordre du plus grand au plus petit */}
        <circle cx={C} cy={C} r={lithR} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
        {labels.map((l) => {
          const rm = (r(l.d0) + r(l.d1)) / 2
          return (
            <text key={l.t} x={C} y={C - rm + 3} textAnchor="middle" fontSize={l.size ?? 10} fontWeight="600" className="svg-fill">
              {l.t}
            </text>
          )
        })}
        <text x={C} y={C + 3} textAnchor="middle" fontSize="8.5" fontWeight="600" className="svg-fill">Graine</text>
        <text x={C} y={C + 13} textAnchor="middle" fontSize="7.5" className="svg-fill">(solide)</text>

        {/* discontinuités */}
        <g fontSize="9" className="svg-fill">
          <line x1={C + r(MOHO) * 0.72} y1={C - r(MOHO) * 0.69} x2={C + R + 8 - 20} y2={C - R * 0.62} className="svg-stroke" strokeWidth="0.6" />
          <text x={C + R * 0.66 + 4} y={C - R * 0.64} fontWeight="700">Moho</text>
          <line x1={C + r(GUTENBERG) * 0.84} y1={C + r(GUTENBERG) * 0.54} x2={C + R * 0.9} y2={C + R * 0.58} className="svg-stroke" strokeWidth="0.6" />
          <text x={C + R * 0.9 - 6} y={C + R * 0.58 + 11} fontWeight="700">Gutenberg</text>
          <line x1={C + r(LEHMANN) * 0.7} y1={C + r(LEHMANN) * 0.7} x2={C + R * 0.46} y2={C + R * 0.8} className="svg-stroke" strokeWidth="0.6" />
          <text x={C + R * 0.3} y={C + R * 0.8 + 11} fontWeight="700">Lehmann</text>
          <text x={C - lithR * 0.72 - 6} y={C - lithR * 0.72 - 4} textAnchor="end" fontSize="8.5" className="svg-muted">base lithosphère</text>
        </g>

        {/* marqueur de profondeur */}
        <circle cx={C} cy={C} r={cur} fill="none" stroke="hsl(217 91% 60%)" strokeWidth="2.5" strokeDasharray="6 3" />
        <circle cx={C} cy={C - cur} r="5" fill="hsl(var(--background))" stroke="hsl(217 91% 60%)" strokeWidth="2.5" />
        <text x={C + 9} y={C - cur - 6} fontSize="10" fontWeight="700" fill="hsl(217 91% 60%)">{fmt(depth, 0)} km</text>

        {exag && <text x="8" y="392" fontSize="8.5" className="svg-muted">Échelle non respectée : 200 premiers km agrandis ×4</text>}

        {shadow && (
          <g>
            <g transform="translate(0 0)">
              <path d={arc(R + 9, 105, 140)} fill="none" stroke="hsl(0 84% 60%)" strokeWidth="6" />
              <path d={arc(R + 9, -140, -105).replace('A', 'A')} fill="none" stroke="hsl(0 84% 60%)" strokeWidth="6" transform="" />
              <path d={arc(R + 18, 105, 180)} fill="none" stroke="hsl(217 91% 60%)" strokeWidth="4" />
              <path d={arc(R + 18, -180, -105)} fill="none" stroke="hsl(217 91% 60%)" strokeWidth="4" />
            </g>
            <path d={`M${C} ${C - R} L${C} ${C - R - 14}`} className="svg-stroke" />
            <text x={C} y={C - R - 17} textAnchor="middle" fontSize="9" fontWeight="700" className="svg-fill">★ séisme</text>
            <text x="398" y="272" textAnchor="end" fontSize="8.5" fill="hsl(0 84% 60%)">ombre P</text>
            <text x="398" y="382" textAnchor="end" fontSize="8.5" fill="hsl(217 91% 60%)">pas de S</text>
          </g>
        )}
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Zoom({ depth }: { depth: number }) {
  const y0 = 28
  const sc = 0.95
  const y = (d: number) => y0 + d * sc
  const MAXD = 250
  const cols = [
    { name: 'Domaine continental', x: 20, w: 160, crust: 30, lab: 120, crustFill: 'hsl(25 40% 40% / 0.85)' },
    { name: 'Domaine océanique', x: 210, w: 160, crust: 7, lab: 80, crustFill: 'hsl(217 40% 35% / 0.85)' },
  ]
  return (
    <div className="border bg-background">
      <svg viewBox="0 0 400 300" className="w-full" fontFamily="Geist, sans-serif">
        <text x="200" y="14" textAnchor="middle" fontSize="10" fontWeight="600" className="svg-fill">Les 250 premiers km (épaisseurs moyennes indicatives)</text>
        {cols.map((c) => (
          <g key={c.name}>
            <rect x={c.x} y={y(0)} width={c.w} height={(MAXD) * sc} fill="hsl(25 95% 53% / 0.18)" />
            <rect x={c.x} y={y(c.crust)} width={c.w} height={(c.lab - c.crust) * sc} fill="hsl(25 95% 53% / 0.5)" />
            <rect x={c.x} y={y(c.lab)} width={c.w} height={(MAXD - c.lab) * sc} fill="hsl(8 80% 50% / 0.22)" />
            <rect x={c.x} y={y(0)} width={c.w} height={c.crust * sc} fill={c.crustFill} />
            <line x1={c.x} x2={c.x + c.w} y1={y(c.crust)} y2={y(c.crust)} className="svg-stroke" strokeWidth="1.5" />
            <line x1={c.x} x2={c.x + c.w} y1={y(c.lab)} y2={y(c.lab)} className="svg-stroke" strokeDasharray="4 3" strokeWidth="1.2" />
            <rect x={c.x} y={y(0)} width={c.w} height={MAXD * sc} fill="none" className="svg-stroke" strokeWidth="1" />
            <text x={c.x + c.w / 2} y={y(0) - 4} textAnchor="middle" fontSize="9.5" fontWeight="600" className="svg-fill">{c.name}</text>
            <text x={c.x + c.w / 2} y={y(c.crust / 2) + (c.crust > 15 ? 4 : -9)} textAnchor="middle" fontSize="9" fill={c.crust > 15 ? '#fff' : undefined} className={c.crust > 15 ? undefined : 'svg-fill'}>
              croûte ≈ {c.crust} km
            </text>
            <text x={c.x + c.w / 2} y={y((c.crust + c.lab) / 2) + 3} textAnchor="middle" fontSize="9.5" className="svg-fill">manteau lithosphérique</text>
            <text x={c.x + c.w / 2} y={y((c.lab + MAXD) / 2) + 3} textAnchor="middle" fontSize="9.5" className="svg-fill">asthénosphère</text>
            <text x={c.x + 4} y={y(c.crust) + (c.crust < 15 ? 11 : -3)} fontSize="9" fontWeight="700" className="svg-fill">Moho</text>
            <text x={c.x + c.w - 4} y={y(c.lab) - 3} textAnchor="end" fontSize="9" className="svg-fill">≈ {c.lab} km</text>
            <text x={c.x + c.w / 2} y={y(c.crust) + 24 > y(c.lab) ? y(c.crust) + 12 : y(c.lab) - 14} textAnchor="middle" fontSize="8" className="svg-muted" />
          </g>
        ))}
        {/* axe de profondeur */}
        {[0, 50, 100, 150, 200, 250].map((d) => (
          <g key={d}>
            <line x1="180" x2="210" y1={y(d)} y2={y(d)} className="svg-grid" strokeDasharray="2 3" />
            <text x="195" y={y(d) + 3} textAnchor="middle" fontSize="8.5" className="svg-muted">{d}</text>
          </g>
        ))}
        <text x="195" y={y(MAXD) + 14} textAnchor="middle" fontSize="8.5" className="svg-muted">km</text>
        <g>
          <rect x="20" y="272" width="10" height="8" fill="hsl(25 95% 53% / 0.5)" /><text x="34" y="279" fontSize="8.5" className="svg-fill">lithosphère (rigide) = croûte + manteau supérieur rigide</text>
          <rect x="20" y="284" width="10" height="8" fill="hsl(8 80% 50% / 0.3)" /><text x="34" y="291" fontSize="8.5" className="svg-fill">asthénosphère : ductile, légèrement fondue (zone de faible vitesse)</text>
        </g>
        {depth <= MAXD && (
          <g>
            <line x1="20" x2="370" y1={y(depth)} y2={y(depth)} stroke="hsl(217 91% 60%)" strokeWidth="2.2" strokeDasharray="6 3" />
            <text x="372" y={y(depth) + 3} fontSize="9" fontWeight="700" fill="hsl(217 91% 60%)" textAnchor="end" dy="-5">{fmt(depth, 0)} km</text>
          </g>
        )}
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Profile({ chart, depth, max }: { chart: Chart; depth: number; max: number }) {
  const W = 300
  const H = 380
  const m = { l: 44, r: 12, t: 22, b: 30 }
  const xMax = chart === 'vitesses' ? 14 : 6000
  const sx = (x: number) => m.l + (x / xMax) * (W - m.l - m.r)
  const sy = (d: number) => m.t + (Math.min(d, max) / max) * (H - m.t - m.b)
  const series: { pts: Pt[]; color: string; name: string }[] =
    chart === 'vitesses'
      ? [
          { pts: VP, color: 'hsl(217 91% 60%)', name: 'Vp' },
          { pts: VS, color: 'hsl(0 84% 60%)', name: 'Vs' },
        ]
      : [{ pts: TEMP, color: 'hsl(25 95% 53%)', name: 'T' }]
  const path = (pts: Pt[]) => {
    let d = ''
    let started = false
    const clipped = pts.filter((p) => p[0] <= max)
    // ajoute le point à la limite
    const last = clipped[clipped.length - 1]
    if (last && last[0] < max && pts.length > clipped.length) clipped.push([max, interpDeep(pts, max)])
    for (const [dd, v] of clipped) {
      d += `${started ? 'L' : 'M'}${sx(v).toFixed(1)} ${sy(dd).toFixed(1)} `
      started = true
    }
    return d
  }
  const disc = [
    { d: MOHO, n: 'Moho' },
    { d: 670, n: '670 km' },
    { d: GUTENBERG, n: 'Gutenberg' },
    { d: LEHMANN, n: 'Lehmann' },
  ].filter((x) => x.d <= max)
  const yticks = max > 1000 ? [0, 1000, 2000, 3000, 4000, 5000, 6000] : [0, 100, 200, 300, 400, 500, 600, 700]
  const xticks = chart === 'vitesses' ? [0, 2, 4, 6, 8, 10, 12, 14] : [0, 1000, 2000, 3000, 4000, 5000, 6000]
  const val = (pts: Pt[]) => interpDeep(pts, depth)
  return (
    <div className="border bg-background">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" fontFamily="Geist, sans-serif">
        <text x={(m.l + W - m.r) / 2} y="12" textAnchor="middle" fontSize="10" className="svg-fill">
          {chart === 'vitesses' ? 'Vitesse des ondes (km/s)' : 'Température (°C)'}
        </text>
        {yticks.map((d) => (
          <g key={d}>
            <line x1={m.l} x2={W - m.r} y1={sy(d)} y2={sy(d)} className="svg-grid" strokeDasharray="2 3" />
            <text x={m.l - 5} y={sy(d) + 3} textAnchor="end" fontSize="8.5" className="svg-muted">{d}</text>
          </g>
        ))}
        {xticks.map((x) => (
          <text key={x} x={sx(x)} y={H - m.b + 12} textAnchor="middle" fontSize="8.5" className="svg-muted">{x}</text>
        ))}
        <text x="10" y={(m.t + H - m.b) / 2} fontSize="9" className="svg-muted" transform={`rotate(-90 10 ${(m.t + H - m.b) / 2})`} textAnchor="middle">profondeur (km)</text>
        <line x1={m.l} x2={m.l} y1={m.t} y2={H - m.b} className="svg-stroke" />
        <line x1={m.l} x2={W - m.r} y1={m.t} y2={m.t} className="svg-stroke" />
        {/* zones */}
        {max > 1000 && <rect x={m.l} y={sy(GUTENBERG)} width={W - m.l - m.r} height={sy(LEHMANN) - sy(GUTENBERG)} fill="hsl(45 93% 47% / 0.12)" />}
        {max <= 1000 && <rect x={m.l} y={sy(100)} width={W - m.l - m.r} height={sy(250) - sy(100)} fill="hsl(8 80% 50% / 0.08)" />}
        {max <= 1000 && <text x={W - m.r - 3} y={sy(175) + 3} textAnchor="end" fontSize="8.5" className="svg-muted">asthénosphère</text>}
        {disc.map((x) => (
          <g key={x.n}>
            <line x1={m.l} x2={W - m.r} y1={sy(x.d)} y2={sy(x.d)} className="svg-stroke" strokeWidth="0.8" strokeDasharray="5 2" />
            <text x={W - m.r - 2} y={sy(x.d) - 3} textAnchor="end" fontSize="8.5" fontWeight="700" className="svg-fill">{x.n}</text>
          </g>
        ))}
        {series.map((s) => (
          <path key={s.name} d={path(s.pts)} fill="none" stroke={s.color} strokeWidth="2.4" strokeLinejoin="round" />
        ))}
        {chart === 'vitesses' && (
          <g fontSize="10" fontWeight="700">
            <text x={sx(6.3)} y={sy(max * 0.55)} fill="hsl(217 91% 60%)">Vp</text>
            <text x={sx(3.1)} y={sy(max * 0.55)} fill="hsl(0 84% 60%)">Vs</text>
          </g>
        )}
        {/* repère */}
        <line x1={m.l} x2={W - m.r} y1={sy(depth)} y2={sy(depth)} stroke="hsl(217 91% 60%)" strokeWidth="1.8" strokeDasharray="6 3" />
        {series.map((s) => (
          <circle key={s.name} cx={sx(val(s.pts))} cy={sy(depth)} r="4.5" fill="hsl(var(--background))" stroke={s.color} strokeWidth="2.4" />
        ))}
        {depth > max && <text x={m.l + 4} y={H - m.b - 4} fontSize="8.5" className="svg-muted">repère hors de la plage affichée</text>}
      </svg>
    </div>
  )
}
