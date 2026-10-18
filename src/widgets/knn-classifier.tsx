import { useMemo, useRef, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Segmented } from '@/components/ui/tabs'
import { Stat, Switch } from '@/components/ui/misc'
import { Tex } from '@/components/Tex'
import { PALETTE } from '@/lib/plot'
import { fmt } from '@/lib/utils'
import { rng } from './_nsi2/player'

interface Props {
  k?: number
}
interface Pt {
  x: number
  y: number
  c: number
}
const XM = 15
const YM = 10
const SC = 40 // pixels par unité
const COLORS = [PALETTE.blue, PALETTE.red, PALETTE.green]
const NAMES = ['A', 'B', 'C']

function cloud(r: () => number, cx: number, cy: number, s: number, c: number, m: number): Pt[] {
  return Array.from({ length: m }, () => {
    const u = Math.sqrt(-2 * Math.log(1 - r()))
    const a = 2 * Math.PI * r()
    return { x: Math.min(XM - 0.3, Math.max(0.3, cx + s * u * Math.cos(a))), y: Math.min(YM - 0.3, Math.max(0.3, cy + s * u * Math.sin(a))), c }
  })
}
function preset(name: string): Pt[] {
  const r = rng(5)
  if (name === 'deux') return [...cloud(r, 4.5, 6.5, 1.3, 0, 12), ...cloud(r, 10, 3.5, 1.3, 1, 12)]
  if (name === 'trois') return [...cloud(r, 3.5, 7, 1.1, 0, 9), ...cloud(r, 11, 7, 1.1, 1, 9), ...cloud(r, 7.5, 2.5, 1.1, 2, 9)]
  if (name === 'melange') return [...cloud(r, 6.5, 5, 2, 0, 14), ...cloud(r, 8.5, 5, 2, 1, 14)]
  return []
}

export default function KnnClassifier({ k: k0 = 3 }: Props) {
  const [pts, setPts] = useState<Pt[]>(() => preset('deux'))
  const [nc, setNc] = useState(2)
  const [tool, setTool] = useState<string>('0')
  const [k, setK] = useState(Math.max(1, Math.min(15, Math.round(k0))))
  const [test, setTest] = useState({ x: 7, y: 5 })
  const [regions, setRegions] = useState(false)
  const [rings, setRings] = useState(true)
  const svg = useRef<SVGSVGElement>(null)
  const drag = useRef(false)

  const toXY = (e: React.PointerEvent) => {
    const b = svg.current!.getBoundingClientRect()
    return { x: Math.max(0, Math.min(XM, ((e.clientX - b.left) / b.width) * XM)), y: Math.max(0, Math.min(YM, YM - ((e.clientY - b.top) / b.height) * YM)) }
  }

  const kEff = Math.max(1, Math.min(k, pts.length || 1))
  const classify = (x: number, y: number, kk: number) => {
    const ds = pts.map((p, i) => ({ i, d: Math.hypot(p.x - x, p.y - y), c: p.c })).sort((a, b) => a.d - b.d || a.i - b.i)
    const nb = ds.slice(0, kk)
    const votes = Array.from({ length: nc }, () => 0)
    nb.forEach((q) => (votes[q.c] += 1))
    const mx = Math.max(...votes)
    const tied = votes.map((v, c) => (v === mx ? c : -1)).filter((c) => c >= 0)
    const pred = tied.length === 1 ? tied[0] : nb.find((q) => tied.includes(q.c))!.c
    return { nb, votes, pred, tie: tied.length > 1 }
  }
  const res = useMemo(() => (pts.length ? classify(test.x, test.y, kEff) : null), [pts, test, kEff, nc]) // eslint-disable-line react-hooks/exhaustive-deps
  const grid = useMemo(() => {
    if (!regions || !pts.length) return []
    const out: { x: number; y: number; c: number }[] = []
    for (let i = 0; i < 45; i++) for (let j = 0; j < 30; j++) out.push({ x: i, y: j, c: classify((i + 0.5) / 3, (j + 0.5) / 3, kEff).pred })
    return out
  }, [regions, pts, kEff, nc]) // eslint-disable-line react-hooks/exhaustive-deps

  const add = (e: React.PointerEvent) => {
    if (drag.current) return
    const { x, y } = toXY(e)
    if (tool === 'del') {
      let bi = -1
      let bd = 0.5
      pts.forEach((p, i) => {
        const d = Math.hypot(p.x - x, p.y - y)
        if (d < bd) {
          bd = d
          bi = i
        }
      })
      if (bi >= 0) setPts(pts.filter((_, i) => i !== bi))
      return
    }
    setPts([...pts, { x, y, c: Number(tool) }])
  }

  const px = (x: number) => x * SC
  const py = (y: number) => (YM - y) * SC
  const kth = res ? res.nb[res.nb.length - 1].d : 0
  const nbSet = new Set(res?.nb.map((q) => q.i))

  return (
    <WidgetFrame
      title="Classification par k plus proches voisins"
      subtitle="Cliquez pour ajouter des points, glissez le point test (losange)"
      controls={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Outil au clic</Label>
            <Segmented
              value={tool}
              onChange={setTool}
              options={[
                ...Array.from({ length: nc }, (_, c) => ({ value: String(c), label: <span style={{ color: COLORS[c] }}>● {NAMES[c]}</span> })),
                { value: 'del', label: <Trash2 className="size-3.5" /> },
              ]}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Nombre de classes</Label>
            <Segmented
              value={String(nc)}
              onChange={(v) => {
                const m = Number(v)
                setNc(m)
                setPts((p) => (m < 3 ? p.filter((q) => q.c < m) : p))
                if (Number(tool) >= m) setTool('0')
              }}
              options={[
                { value: '2', label: '2' },
                { value: '3', label: '3' },
              ]}
            />
          </div>
          <Slider label={<span>Voisins <Tex>k</Tex></span>} value={k} min={1} max={15} step={1} digits={0} onChange={setK} />
          <div className="flex flex-col gap-1.5">
            <Label>Jeux de données</Label>
            <div className="flex flex-wrap gap-1.5">
              <Button size="xs" variant="outline" onClick={() => { setNc(2); setPts(preset('deux')) }}>Deux nuages</Button>
              <Button size="xs" variant="outline" onClick={() => { setNc(3); setPts(preset('trois')) }}>Trois nuages</Button>
              <Button size="xs" variant="outline" onClick={() => { setNc(2); setPts(preset('melange')) }}>Mélangés</Button>
              <Button size="xs" variant="outline" onClick={() => setPts([])}>Vider</Button>
            </div>
          </div>
          <Switch checked={rings} onChange={setRings} label="Cercle de voisinage" />
          <Switch checked={regions} onChange={setRegions} label="Zones de décision" />
          {res && (
            <div className="grid grid-cols-2 gap-2">
              <Stat label="Classe prédite" value={<span style={{ color: COLORS[res.pred] }}>{NAMES[res.pred]}</span>} />
              <Stat label="Rayon (k-ième)" value={fmt(kth, 2)} />
            </div>
          )}
        </>
      }
      footer={
        res ? (
          <div className="flex flex-col gap-1">
            <div>
              Parmi les <b>{kEff}</b> plus proches voisins :{' '}
              {res.votes.map((v, c) => (
                <span key={c} className="mr-3 font-mono" style={{ color: COLORS[c] }}>
                  {NAMES[c]} : {v}
                </span>
              ))}
              → le point test est classé <b style={{ color: COLORS[res.pred] }}>{NAMES[res.pred]}</b>
              {res.tie ? ' (égalité départagée par le voisin le plus proche)' : ''}.
            </div>
            <div className="text-xs text-muted-foreground">
              Distance euclidienne : <Tex>{String.raw`d = \sqrt{(x-x_T)^2 + (y-y_T)^2}`}</Tex>. Avec <Tex>k=1</Tex> la frontière est très découpée (risque de sur-apprentissage) ; avec <Tex>k</Tex> grand elle devient lisse mais peut ignorer de petits groupes.
            </div>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 font-mono text-xs">
              {res.nb.map((q, r) => (
                <span key={q.i} style={{ color: COLORS[q.c] }}>
                  {r + 1}. {NAMES[q.c]} (d = {fmt(q.d, 2)})
                </span>
              ))}
            </div>
          </div>
        ) : (
          <span>Ajoutez des points étiquetés pour que le classifieur ait des données.</span>
        )
      }
    >
      <svg
        ref={svg}
        viewBox={`0 0 ${XM * SC} ${YM * SC}`}
        className="w-full touch-none select-none border bg-background"
        style={{ cursor: tool === 'del' ? 'not-allowed' : 'crosshair' }}
        onPointerDown={(e) => {
          if (!drag.current) add(e)
        }}
        onPointerMove={(e) => {
          if (drag.current) setTest(toXY(e))
        }}
        onPointerUp={() => (drag.current = false)}
        onPointerLeave={() => (drag.current = false)}
      >
        {grid.map((g, i) => (
          <rect key={i} x={g.x * 13.333} y={(29 - g.y) * 13.333} width={13.4} height={13.4} fill={COLORS[g.c]} opacity={0.14} />
        ))}
        {Array.from({ length: XM + 1 }, (_, i) => (
          <line key={'x' + i} x1={px(i)} x2={px(i)} y1={0} y2={YM * SC} stroke="hsl(var(--border))" strokeWidth={0.5} />
        ))}
        {Array.from({ length: YM + 1 }, (_, i) => (
          <line key={'y' + i} x1={0} x2={XM * SC} y1={py(i)} y2={py(i)} stroke="hsl(var(--border))" strokeWidth={0.5} />
        ))}
        {res && rings && <circle cx={px(test.x)} cy={py(test.y)} r={kth * SC} fill="hsl(var(--foreground) / 0.05)" stroke="hsl(var(--foreground))" strokeDasharray="5 4" strokeWidth={1.2} />}
        {res &&
          res.nb.map((q) => (
            <line key={q.i} x1={px(test.x)} y1={py(test.y)} x2={px(pts[q.i].x)} y2={py(pts[q.i].y)} stroke={COLORS[q.c]} strokeWidth={1.4} opacity={0.8} />
          ))}
        {pts.map((p, i) => (
          <circle key={i} cx={px(p.x)} cy={py(p.y)} r={nbSet.has(i) ? 6.5 : 5} fill={COLORS[p.c]} stroke={nbSet.has(i) ? 'hsl(var(--foreground))' : 'hsl(var(--background))'} strokeWidth={nbSet.has(i) ? 2 : 1} />
        ))}
        <g
          onPointerDown={(e) => {
            e.stopPropagation()
            drag.current = true
            ;(e.currentTarget.ownerSVGElement as SVGSVGElement).setPointerCapture?.(e.pointerId)
          }}
          style={{ cursor: 'grab' }}
        >
          <circle cx={px(test.x)} cy={py(test.y)} r={20} fill="transparent" />
          <rect
            x={px(test.x) - 8}
            y={py(test.y) - 8}
            width={16}
            height={16}
            transform={`rotate(45 ${px(test.x)} ${py(test.y)})`}
            fill={res ? COLORS[res.pred] : 'hsl(var(--muted-foreground))'}
            stroke="hsl(var(--foreground))"
            strokeWidth={2.5}
          />
        </g>
      </svg>
    </WidgetFrame>
  )
}
