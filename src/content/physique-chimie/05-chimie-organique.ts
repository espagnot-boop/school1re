import type { Chapter } from '../types'

/* ------------------------------------------------------------------ */
/*  Outils de dessin SVG                                               */
/* ------------------------------------------------------------------ */

const FONT = 'font-family="Geist, sans-serif"'
const BLUE = 'hsl(217 91% 60%)'
const RED = 'hsl(0 84% 60%)'
const GREEN = 'hsl(142 71% 45%)'
const ORANGE = 'hsl(25 95% 53%)'
const VIOLET = 'hsl(263 70% 60%)'
const f1 = (v: number) => v.toFixed(1)

type Pt = [number, number]

function tx(x: number, y: number, s: string, size = 12, fill = 'currentColor', anchor = 'middle', weight = '400'): string {
  return `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${anchor}" dominant-baseline="central" font-size="${size}" font-weight="${weight}" fill="${fill}" ${FONT}>${s}</text>`
}

function line(a: Pt, b: Pt, color = 'currentColor', w = 1.8, g1 = 0, g2 = 0, offset = 0): string {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const L = Math.hypot(dx, dy)
  const ux = dx / L
  const uy = dy / L
  const nx = -uy * offset
  const ny = ux * offset
  return `<line x1="${f1(a[0] + ux * g1 + nx)}" y1="${f1(a[1] + uy * g1 + ny)}" x2="${f1(b[0] - ux * g2 + nx)}" y2="${f1(b[1] - uy * g2 + ny)}" stroke="${color}" stroke-width="${w}" stroke-linecap="square"/>`
}

/** Points d'une chaîne en zigzag (formule topologique). */
function zig(x0: number, y0: number, n: number, dx = 30, dy = 17, firstUp = false): Pt[] {
  const pts: Pt[] = []
  for (let i = 0; i < n; i++) pts.push([x0 + i * dx, y0 + ((i % 2 === 0) === firstUp ? -dy / 2 : dy / 2)])
  return pts
}

interface Sub {
  at: number // indice du sommet porteur
  to: Pt // position de l'étiquette (ou du sommet si label vide)
  label?: string
  order?: 1 | 2
  color?: string
}

/** Formule topologique : squelette + substituants (hétéroatomes, ramifications). */
function topo(pts: Pt[], subs: Sub[] = [], color = 'currentColor'): string {
  let s = ''
  for (let i = 0; i < pts.length - 1; i++) s += line(pts[i], pts[i + 1], color)
  for (const b of subs) {
    const a = pts[b.at]
    const c = b.color ?? 'currentColor'
    const g2 = b.label ? 9 : 0
    if (b.order === 2) {
      s += line(a, b.to, c, 1.6, 0, g2, -2.6) + line(a, b.to, c, 1.6, 0, g2, 2.6)
    } else {
      s += line(a, b.to, c, 1.8, 0, g2)
    }
    if (b.label) s += tx(b.to[0] + (b.label.length > 1 ? (b.to[0] >= a[0] ? 6 : -6) : 0), b.to[1], b.label, 14, c, 'middle', '600')
  }
  return s
}

/* ------------------------------------------------------------------ */
/*  Spectres IR stylisés                                               */
/* ------------------------------------------------------------------ */

interface Band {
  c: number // centre (cm-1)
  w: number // demi-largeur
  d: number // profondeur (en % de transmittance)
}

const FINGER: Band[] = [
  { c: 1460, w: 12, d: 30 },
  { c: 1380, w: 10, d: 22 },
  { c: 1250, w: 14, d: 15 },
  { c: 960, w: 12, d: 15 },
  { c: 860, w: 10, d: 12 },
  { c: 740, w: 12, d: 14 },
]

function irSvg(id: string, title: string, bands: Band[], labels: { s: number; text: string; color?: string }[], height = 250): string {
  const X0 = 56
  const X1 = 620
  const Y0 = 34
  const Y1 = height - 46
  const x = (s: number) => X0 + ((4000 - s) / (4000 - 500)) * (X1 - X0)
  const y = (t: number) => Y1 - (t / 100) * (Y1 - Y0)
  const all = [...bands, ...FINGER]
  const pts: string[] = []
  for (let s = 4000; s >= 500; s -= 4) {
    let t = 94
    for (const b of all) t -= b.d * Math.exp(-(((s - b.c) / b.w) ** 2))
    pts.push(`${f1(x(s))},${f1(y(Math.max(t, 2)))}`)
  }
  let g = `<svg viewBox="0 0 640 ${height}" xmlns="http://www.w3.org/2000/svg" aria-labelledby="${id}"><title id="${id}">${title}</title>`
  // zone d'empreinte digitale
  g += `<rect x="${f1(x(1500))}" y="${Y0}" width="${f1(x(500) - x(1500))}" height="${Y1 - Y0}" fill="currentColor" class="svg-muted" opacity="0.08"/>`
  g += tx((x(1500) + x(500)) / 2, Y0 + 10, 'empreinte digitale', 10, 'currentColor')
  // grille et axes
  for (const s of [4000, 3500, 3000, 2500, 2000, 1500, 1000, 500]) {
    g += `<line x1="${f1(x(s))}" y1="${Y0}" x2="${f1(x(s))}" y2="${Y1}" class="svg-grid" stroke-width="0.6"/>`
    g += tx(x(s), Y1 + 12, String(s), 10)
  }
  for (const t of [0, 50, 100]) {
    g += `<line x1="${X0}" y1="${f1(y(t))}" x2="${X1}" y2="${f1(y(t))}" class="svg-grid" stroke-width="0.6"/>`
    g += tx(X0 - 6, y(t), String(t), 10, 'currentColor', 'end')
  }
  g += `<rect x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}" fill="none" stroke="currentColor" stroke-width="1"/>`
  g += tx((X0 + X1) / 2, Y1 + 30, 'nombre d’onde σ (cm⁻¹)', 11)
  g += `<text x="16" y="${(Y0 + Y1) / 2}" transform="rotate(-90 16 ${(Y0 + Y1) / 2})" text-anchor="middle" font-size="11" fill="currentColor" ${FONT}>T (%)</text>`
  g += tx(X0, 16, title, 12, 'currentColor', 'start', '700')
  g += `<polyline points="${pts.join(' ')}" fill="none" stroke="${BLUE}" stroke-width="1.6"/>`
  for (const l of labels) {
    let t = 94
    for (const b of all) t -= b.d * Math.exp(-(((l.s - b.c) / b.w) ** 2))
    const yy = y(Math.max(t, 2)) + 14
    g += tx(x(l.s), Math.min(yy, Y1 - 6), l.text, 11, l.color ?? RED, 'middle', '700')
  }
  g += '</svg>'
  return g
}

const IR_ALCOOL = irSvg(
  'pc05-ir-alcool',
  'Spectre IR du butan-1-ol (liquide)',
  [
    { c: 3340, w: 130, d: 62 },
    { c: 2960, w: 22, d: 55 },
    { c: 2875, w: 18, d: 40 },
    { c: 1060, w: 22, d: 60 },
  ],
  [
    { s: 3340, text: 'O–H lié (large)' },
    { s: 2930, text: 'C–H' , color: VIOLET },
    { s: 1060, text: 'C–O', color: ORANGE },
  ],
)

const IR_CETONE = irSvg(
  'pc05-ir-cetone',
  'Spectre IR de la butanone',
  [
    { c: 2980, w: 22, d: 38 },
    { c: 2940, w: 14, d: 22 },
    { c: 1715, w: 18, d: 82 },
    { c: 1170, w: 16, d: 40 },
  ],
  [
    { s: 2960, text: 'C–H', color: VIOLET },
    { s: 1715, text: 'C=O (fine, intense)' },
  ],
)

const IR_ALDEHYDE = irSvg(
  'pc05-ir-aldehyde',
  'Spectre IR du butanal',
  [
    { c: 2965, w: 22, d: 45 },
    { c: 2820, w: 14, d: 28 },
    { c: 2720, w: 14, d: 26 },
    { c: 1728, w: 18, d: 82 },
  ],
  [
    { s: 2965, text: 'C–H', color: VIOLET },
    { s: 2720, text: 'C–H ald.', color: GREEN },
    { s: 1728, text: 'C=O' },
  ],
)

const IR_ACIDE = irSvg(
  'pc05-ir-acide',
  'Spectre IR de l’acide butanoïque',
  [
    { c: 2950, w: 330, d: 48 },
    { c: 2970, w: 18, d: 18 },
    { c: 1710, w: 20, d: 84 },
    { c: 1290, w: 18, d: 38 },
    { c: 935, w: 22, d: 25 },
  ],
  [
    { s: 3150, text: 'O–H acide (très large)' },
    { s: 1710, text: 'C=O' },
  ],
)

const IR_SANS_LABEL = (id: string, title: string, bands: Band[]) => irSvg(id, title, bands, [])

/* ------------------------------------------------------------------ */
/*  Schémas                                                            */
/* ------------------------------------------------------------------ */

function writingsSvg(): string {
  let s = `<svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg">`
  // Colonnes
  const cols = [20, 120, 380, 560]
  s += tx(cols[0] + 40, 22, 'brute', 12, 'currentColor', 'middle', '700')
  s += tx(cols[1] + 120, 22, 'développée', 12, 'currentColor', 'middle', '700')
  s += tx(cols[2] + 80, 22, 'semi-développée', 12, 'currentColor', 'middle', '700')
  s += tx(cols[3] + 50, 22, 'topologique', 12, 'currentColor', 'middle', '700')
  for (const c of cols.slice(1)) s += `<line x1="${c - 10}" y1="34" x2="${c - 10}" y2="200" class="svg-grid"/>`
  // brute
  s += tx(cols[0] + 40, 120, 'C₄H₁₀O', 16, 'currentColor', 'middle', '700')
  // développée
  const y = 120
  const xs = [cols[1] + 30, cols[1] + 80, cols[1] + 130, cols[1] + 180]
  const A = (x: number, yy: number, l: string, c = 'currentColor') => tx(x, yy, l, 14, c, 'middle', '600')
  xs.forEach((x, i) => {
    s += A(x, y, 'C')
    if (i < 3) s += line([x, y], [xs[i + 1], y], 'currentColor', 1.4, 8, 8)
    // haut
    if (i === 1) {
      s += A(x, y - 40, 'O', RED) + line([x, y], [x, y - 40], RED, 1.4, 8, 8)
      s += A(x + 26, y - 40, 'H', RED) + line([x, y - 40], [x + 26, y - 40], RED, 1.4, 8, 7)
    } else {
      s += A(x, y - 36, 'H') + line([x, y], [x, y - 36], 'currentColor', 1.4, 8, 7)
    }
    s += A(x, y + 36, 'H') + line([x, y], [x, y + 36], 'currentColor', 1.4, 8, 7)
  })
  s += A(xs[0] - 34, y, 'H') + line([xs[0] - 34, y], [xs[0], y], 'currentColor', 1.4, 7, 8)
  s += A(xs[3] + 34, y, 'H') + line([xs[3], y], [xs[3] + 34, y], 'currentColor', 1.4, 8, 7)
  // semi-développée
  s += tx(cols[2] + 80, 112, 'CH₃–CH–CH₂–CH₃', 14, 'currentColor', 'middle', '600')
  s += `<line x1="${cols[2] + 48}" y1="98" x2="${cols[2] + 48}" y2="84" stroke="${RED}" stroke-width="1.4"/>`
  s += tx(cols[2] + 48, 74, 'OH', 14, RED, 'middle', '600')
  s += tx(cols[2] + 80, 150, 'ou CH₃–CH(OH)–CH₂–CH₃', 11)
  // topologique
  const p = zig(cols[3] + 8, 128, 4, 30, 20, false)
  s += topo(p, [{ at: 1, to: [p[1][0], p[1][1] - 34], label: 'OH', color: RED }])
  s += tx(340, 222, 'Le butan-2-ol écrit de quatre façons. En topologique : un sommet ou une extrémité = un atome C ; les H liés aux C ne sont pas écrits.', 11)
  s += '</svg>'
  return s
}

function familiesSvg(): string {
  let s = `<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg">`
  const items: { x: number; name: string; fam: string; group: string; draw: (x: number) => string; col: string }[] = [
    {
      x: 85,
      name: 'propan-1-ol',
      fam: 'alcool',
      group: 'hydroxyle –OH',
      col: RED,
      draw: (x) => {
        const p = zig(x - 45, 100, 3, 30, 20, false)
        return topo(p, [{ at: 2, to: [p[2][0] + 28, p[2][1] - 14], label: 'OH', color: RED }])
      },
    },
    {
      x: 255,
      name: 'propanal',
      fam: 'aldéhyde',
      group: 'carbonyle en bout',
      col: GREEN,
      draw: (x) => {
        const p = zig(x - 45, 100, 3, 30, 20, false)
        return topo(p, [{ at: 2, to: [p[2][0] + 26, p[2][1] - 14], label: 'O', order: 2, color: GREEN }])
      },
    },
    {
      x: 425,
      name: 'propanone',
      fam: 'cétone',
      group: 'carbonyle interne',
      col: BLUE,
      draw: (x) => {
        const p = zig(x - 30, 104, 3, 30, 20, false)
        return topo(p, [{ at: 1, to: [p[1][0], p[1][1] - 34], label: 'O', order: 2, color: BLUE }])
      },
    },
    {
      x: 595,
      name: 'acide propanoïque',
      fam: 'acide carboxylique',
      group: 'carboxyle –COOH',
      col: ORANGE,
      draw: (x) => {
        const p = zig(x - 50, 104, 3, 30, 20, true)
        return topo(p, [
          { at: 2, to: [p[2][0], p[2][1] - 32], label: 'O', order: 2, color: ORANGE },
          { at: 2, to: [p[2][0] + 28, p[2][1] + 14], label: 'OH', color: ORANGE },
        ])
      },
    },
  ]
  for (const it of items) {
    s += `<rect x="${it.x - 80}" y="30" width="160" height="186" fill="none" class="svg-grid"/>`
    s += tx(it.x, 46, it.fam.toUpperCase(), 12, it.col, 'middle', '700')
    s += it.draw(it.x)
    s += tx(it.x, 160, it.name, 12, 'currentColor', 'middle', '600')
    s += tx(it.x, 180, it.group, 11, it.col, 'middle', '600')
  }
  s += tx(85, 200, 'suffixe -ol', 11) + tx(255, 200, 'suffixe -al', 11) + tx(425, 200, 'suffixe -one', 11) + tx(595, 200, 'acide …-oïque', 11)
  s += '</svg>'
  return s
}

function branchedSvg(): string {
  let s = `<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg">`
  // 2-méthylbutane
  {
    const p = zig(40, 100, 4, 32, 22, false)
    s += topo(p, [{ at: 1, to: [p[1][0], p[1][1] - 34] }])
    p.forEach((q, i) => (s += tx(q[0], q[1] + (i % 2 ? 14 : -14), String(i + 1), 10, BLUE, 'middle', '700')))
    s += tx(90, 168, '2-méthylbutane', 12, 'currentColor', 'middle', '600')
    s += tx(90, 184, 'C₅H₁₂', 11)
  }
  // 3-méthylbutan-2-ol
  {
    const p = zig(210, 100, 4, 32, 22, false)
    s += topo(p, [
      { at: 1, to: [p[1][0], p[1][1] - 34], label: 'OH', color: RED },
      { at: 2, to: [p[2][0], p[2][1] + 30] },
    ])
    s += tx(260, 168, '3-méthylbutan-2-ol', 12, 'currentColor', 'middle', '600')
    s += tx(260, 184, 'C₅H₁₂O', 11)
  }
  // 2,2-diméthylpropanal
  {
    const p = zig(385, 100, 3, 32, 22, false)
    s += topo(p, [
      { at: 1, to: [p[1][0] - 12, p[1][1] - 34] },
      { at: 1, to: [p[1][0] + 12, p[1][1] - 34] },
      { at: 2, to: [p[2][0] + 28, p[2][1] - 14], label: 'O', order: 2, color: GREEN },
    ])
    s += tx(430, 168, '2,2-diméthylpropanal', 12, 'currentColor', 'middle', '600')
    s += tx(430, 184, 'C₅H₁₀O', 11)
  }
  // acide 2-méthylbutanoïque
  {
    const p = zig(545, 108, 4, 30, 22, true)
    s += topo(p, [
      { at: 0, to: [p[0][0] - 14, p[0][1] - 28], label: 'O', order: 2, color: ORANGE },
      { at: 0, to: [p[0][0] - 26, p[0][1] + 16], label: 'HO', color: ORANGE },
      { at: 1, to: [p[1][0], p[1][1] + 32] },
    ])
    s += tx(590, 168, 'acide 2-méthylbutanoïque', 12, 'currentColor', 'middle', '600')
    s += tx(590, 184, 'C₅H₁₀O₂', 11)
  }
  s += tx(340, 18, 'Formules topologiques de molécules ramifiées (numérotation de la chaîne principale indiquée pour la 1ʳᵉ)', 11)
  s += '</svg>'
  return s
}

function refluxSvg(): string {
  let s = `<svg viewBox="0 0 560 420" xmlns="http://www.w3.org/2000/svg">`
  // chauffe-ballon
  s += `<path d="M 110 330 L 110 300 Q 170 360 230 300 L 230 330 Z" fill="${ORANGE}" opacity="0.25" stroke="currentColor" stroke-width="1.4"/>`
  s += `<rect x="100" y="330" width="140" height="30" fill="none" stroke="currentColor" stroke-width="1.6"/>`
  // support élévateur
  s += `<path d="M 110 360 L 230 395 M 230 360 L 110 395" stroke="currentColor" stroke-width="1.2"/><rect x="95" y="395" width="150" height="8" fill="none" stroke="currentColor" stroke-width="1.4"/>`
  // ballon
  s += `<path d="M 160 236 L 160 258 A 46 46 0 1 0 180 258 L 180 236" fill="none" stroke="currentColor" stroke-width="1.8"/>`
  s += `<path d="M 128 310 A 46 46 0 0 0 212 310 Q 170 296 128 310 Z" fill="${BLUE}" opacity="0.3"/>`
  s += `<circle cx="160" cy="318" r="2.5" fill="currentColor"/><circle cx="176" cy="322" r="2.5" fill="currentColor"/><circle cx="168" cy="314" r="2" fill="currentColor"/>`
  // réfrigérant à eau (droit)
  s += `<rect x="154" y="60" width="32" height="170" fill="none" stroke="currentColor" stroke-width="1.6"/>`
  s += `<rect x="164" y="40" width="12" height="200" fill="none" stroke="currentColor" stroke-width="1.4"/>`
  s += `<rect x="155" y="61" width="9" height="168" fill="${BLUE}" opacity="0.18"/><rect x="176" y="61" width="9" height="168" fill="${BLUE}" opacity="0.18"/>`
  // entrée/sortie d'eau
  s += `<line x1="186" y1="210" x2="230" y2="210" stroke="currentColor" stroke-width="1.6"/><line x1="186" y1="80" x2="230" y2="80" stroke="currentColor" stroke-width="1.6"/>`
  s += `<polygon points="196,205 186,210 196,215" fill="${BLUE}"/><polygon points="220,75 230,80 220,85" fill="${BLUE}"/>`
  // gouttes qui retombent
  s += `<circle cx="170" cy="150" r="2" fill="${BLUE}"/><circle cx="170" cy="175" r="2" fill="${BLUE}"/><circle cx="170" cy="200" r="2" fill="${BLUE}"/>`
  // potence
  s += `<line x1="60" y1="30" x2="60" y2="403" stroke="currentColor" stroke-width="2"/><line x1="60" y1="140" x2="154" y2="140" stroke="currentColor" stroke-width="1.6"/><line x1="60" y1="250" x2="160" y2="250" stroke="currentColor" stroke-width="1.6"/>`
  // légendes
  const L = (x: number, y: number, t1: string, t2?: string) => {
    let r = `<line x1="${x}" y1="${y}" x2="300" y2="${y}" stroke="currentColor" stroke-width="0.7"/>` + tx(306, y, t1, 12, 'currentColor', 'start', '600')
    if (t2) r += tx(306, y + 15, t2, 11, 'currentColor', 'start')
    return r
  }
  s += L(230, 80, 'sortie d’eau (en haut)')
  s += L(186, 130, 'réfrigérant à eau', 'les vapeurs s’y condensent et retombent')
  s += L(230, 210, 'entrée d’eau (en bas)')
  s += L(212, 290, 'ballon : mélange réactionnel')
  s += L(176, 320, 'grains de pierre ponce', 'ébullition régulière')
  s += L(240, 345, 'chauffe-ballon')
  s += L(232, 390, 'support élévateur', 'pour retirer vite le chauffage')
  s += tx(280, 16, 'Montage de chauffage à reflux', 13, 'currentColor', 'middle', '700')
  s += '</svg>'
  return s
}

function ccmSvg(): string {
  let s = `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">`
  // plaque
  s += `<rect x="60" y="30" width="200" height="200" fill="none" stroke="currentColor" stroke-width="1.6"/>`
  s += `<line x1="60" y1="200" x2="260" y2="200" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3"/>`
  s += `<line x1="60" y1="55" x2="260" y2="55" stroke="${BLUE}" stroke-width="1" stroke-dasharray="4 3"/>`
  const lanes = [
    { x: 100, label: 'A', spots: [120] },
    { x: 160, label: 'B', spots: [120, 165] },
    { x: 220, label: 'P', spots: [90] },
  ]
  for (const l of lanes) {
    s += `<circle cx="${l.x}" cy="200" r="2" fill="currentColor"/>` + tx(l.x, 216, l.label, 12, 'currentColor', 'middle', '700')
    for (const y of l.spots) s += `<ellipse cx="${l.x}" cy="${y}" rx="8" ry="6" fill="${VIOLET}" opacity="0.7"/>`
  }
  s += `<ellipse cx="160" cy="90" rx="8" ry="6" fill="${VIOLET}" opacity="0.7"/>`
  s += tx(268, 55, 'front du solvant', 11, BLUE, 'start')
  s += tx(268, 200, 'ligne de dépôt', 11, 'currentColor', 'start')
  // explication
  s += tx(300, 100, 'A : réactif pur ; P : produit pur de référence', 12, 'currentColor', 'start')
  s += tx(300, 120, 'B : produit brut synthétisé', 12, 'currentColor', 'start')
  s += tx(300, 150, 'B contient P (même hauteur)', 12, GREEN, 'start', '700')
  s += tx(300, 170, 'mais aussi du réactif A restant', 12, RED, 'start', '700')
  s += tx(300, 190, 'et une impureté → produit à purifier.', 12, 'currentColor', 'start')
  s += tx(300, 220, 'Rapport frontal : Rf = h(tache) / h(front)', 12, 'currentColor', 'start', '600')
  s += '</svg>'
  return s
}

function synthesisFlowSvg(): string {
  let s = `<svg viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg">`
  const steps = [
    { t: 'Transformation', d: ['réactifs + solvant', '(+ catalyseur)', 'chauffage à reflux'], c: ORANGE },
    { t: 'Isolement', d: ['séparer le produit', 'filtration, extraction', 'liquide-liquide…'], c: BLUE },
    { t: 'Purification', d: ['éliminer impuretés', 'recristallisation,', 'lavage, distillation'], c: VIOLET },
    { t: 'Analyse', d: ['identité et pureté', 'CCM, T_fusion, IR,', 'indice de réfraction'], c: GREEN },
  ]
  steps.forEach((st, i) => {
    const x = 10 + i * 170
    s += `<rect x="${x}" y="20" width="150" height="110" fill="${st.c}" opacity="0.12" stroke="${st.c}" stroke-width="1.4"/>`
    s += tx(x + 75, 40, `${i + 1}. ${st.t}`, 13, 'currentColor', 'middle', '700')
    st.d.forEach((l, k) => (s += tx(x + 75, 68 + k * 18, l, 11)))
    if (i < 3) s += `<polygon points="${x + 154},70 ${x + 166},75 ${x + 154},80" fill="currentColor"/>`
  })
  s += '</svg>'
  return s
}

/* ------------------------------------------------------------------ */
/*  Chapitre                                                           */
/* ------------------------------------------------------------------ */

const r = String.raw

const chapter: Chapter = {
  id: 'chimie-organique',
  subject: 'physique-chimie',
  order: 5,
  title: 'Structure des entités organiques et synthèses',
  theme: 'Constitution et transformations de la matière',
  summary:
    'Formules brutes, développées, semi-développées et topologiques ; groupes caractéristiques, familles et nomenclature ; spectroscopie infrarouge ; étapes et rendement d’une synthèse.',
  duration: '3 semaines',
  objectives: [
    'Exploiter les formules brute, développée, semi-développée et topologique d’une espèce organique.',
    'Identifier les squelettes carbonés saturés (linéaires ou ramifiés) et distinguer des isomères.',
    'Identifier les groupes caractéristiques et les familles : alcool, aldéhyde, cétone, acide carboxylique.',
    'Justifier le nom associé à la formule semi-développée de molécules simples possédant un seul groupe caractéristique, et inversement.',
    'Exploiter, à partir de valeurs de référence, un spectre d’absorption infrarouge.',
    'Identifier dans un protocole les étapes de transformation, d’isolement, de purification et d’analyse ; justifier les choix de méthodes.',
    'Schématiser et légender un montage de chauffage à reflux.',
    'Déterminer le rendement d’une synthèse à partir d’un protocole et de données expérimentales.',
  ],
  keywords: [
    'formule brute', 'formule semi-développée', 'formule topologique', 'isomère', 'alcane', 'squelette carboné', 'groupe caractéristique',
    'hydroxyle', 'carbonyle', 'carboxyle', 'alcool', 'aldéhyde', 'cétone', 'acide carboxylique', 'nomenclature', 'spectroscopie infrarouge',
    'nombre d’onde', 'transmittance', 'reflux', 'CCM', 'rendement',
  ],

  /* ================================================================ */
  fiche: [
    { type: 'h2', text: '1. Écrire une molécule organique' },
    {
      type: 'table',
      headers: ['Formule', 'Ce qu’elle montre', 'Ex. : éthanol'],
      rows: [
        ['brute', 'nature et nombre des atomes', 'C₂H₆O'],
        ['développée', 'toutes les liaisons', 'toutes les liaisons C–H, C–C, C–O, O–H dessinées'],
        ['semi-développée', 'liaisons sauf celles avec H', 'CH₃–CH₂–OH'],
        ['topologique', 'squelette en zigzag ; C et H des C non écrits ; hétéroatomes écrits', 'zigzag de 2 segments terminé par OH'],
      ],
    },
    {
      type: 'list',
      items: [
        '**Isomères** : même formule brute, formules semi-développées différentes (ex. C₄H₁₀ : butane et 2-méthylpropane).',
        'Squelette **saturé** : uniquement des liaisons simples C–C. Alcane : CₙH₂ₙ₊₂.',
      ],
    },
    { type: 'h2', text: '2. Familles et nomenclature' },
    {
      type: 'table',
      headers: ['Famille', 'Groupe caractéristique', 'Formule générale (saturée)', 'Nom', 'Exemple'],
      rows: [
        ['alcool', 'hydroxyle –OH sur un C tétraédrique', 'CₙH₂ₙ₊₂O', 'alcan**-x-ol**', 'propan-2-ol CH₃–CH(OH)–CH₃'],
        ['aldéhyde', 'carbonyle C=O en **bout** de chaîne : –CHO', 'CₙH₂ₙO', 'alcan**al** (C n°1)', 'propanal CH₃–CH₂–CHO'],
        ['cétone', 'carbonyle C=O **dans** la chaîne', 'CₙH₂ₙO', 'alcan**-x-one**', 'butanone CH₃–CO–CH₂–CH₃'],
        ['acide carboxylique', 'carboxyle –COOH', 'CₙH₂ₙO₂', 'acide alcan**oïque** (C n°1)', 'acide éthanoïque CH₃–COOH'],
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Chaîne principale', text: 'La plus longue chaîne carbonée **contenant** le C du groupe caractéristique → préfixe : méth (1), éth (2), prop (3), but (4), pent (5), hex (6), hept (7), oct (8).' },
        { title: 'Numérotation', text: 'Le C portant le groupe caractéristique reçoit le plus petit numéro possible (C n°1 pour aldéhyde et acide).' },
        { title: 'Ramifications', text: 'Préfixes méthyl-, éthyl-… précédés de leur numéro (di-, tri- si répétés), par ordre alphabétique.' },
        { title: 'Nom', text: 'ramifications + chaîne + suffixe : 3-méthylbutan-2-ol.' },
      ],
    },
    { type: 'h2', text: '3. Spectroscopie infrarouge' },
    {
      type: 'table',
      headers: ['Liaison', 'σ (cm⁻¹)', 'Aspect'],
      rows: [
        ['O–H alcool libre (gaz, dilué)', '3580 – 3670', 'fine'],
        ['O–H alcool lié (liquide, ponts H)', '3200 – 3400', 'forte, **large**'],
        ['O–H acide carboxylique', '2500 – 3200', 'forte, **très large**'],
        ['C–H (C tétraédrique)', '2800 – 3000', 'forte'],
        ['C–H aldéhyde', '2700 – 2900', 'moyenne, souvent 2 bandes'],
        ['C=O aldéhyde, cétone', '1650 – 1730', 'forte, **fine**'],
        ['C=O acide carboxylique', '1680 – 1710', 'forte'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'À retenir',
      content: [{ type: 'p', text: 'Axe horizontal : nombre d’onde $\\sigma = 1/\\lambda$ (cm⁻¹), **décroissant** de gauche à droite. Une bande = une baisse de transmittance. On exploite surtout $\\sigma > 1500$ cm⁻¹ ; en dessous : empreinte digitale.' }],
    },
    { type: 'h2', text: '4. Synthèse et rendement' },
    {
      type: 'list',
      items: [
        'Étapes : **transformation** (souvent chauffage à reflux) → **isolement** (filtration, extraction) → **purification** (recristallisation, lavage, distillation) → **analyse** (CCM, températures de changement d’état, IR).',
        'Le **reflux** accélère la réaction (température élevée) sans perte de matière (les vapeurs se condensent et retombent).',
      ],
    },
    { type: 'math', tex: r`\eta = \frac{n_{\text{produit obtenu}}}{n_{\text{max}}} = \frac{m_{\text{obtenue}}}{m_{\text{max}}} \qquad 0 \leq \eta \leq 1` },
    {
      type: 'p',
      text: '$n_{max}$ : quantité de produit obtenue si la transformation était totale, calculée avec le **réactif limitant** et les nombres stœchiométriques.',
    },
  ],

  /* ================================================================ */
  cours: [
    { type: 'h2', text: 'I. Représenter une molécule organique' },
    {
      type: 'p',
      text: 'Une **espèce organique** est constituée de molécules dont le squelette est formé d’atomes de **carbone** liés entre eux et à des atomes d’**hydrogène**, avec souvent des atomes d’oxygène, d’azote… (hétéroatomes). Le carbone forme 4 liaisons, l’hydrogène 1, l’oxygène 2 (voir chapitre précédent, schémas de Lewis).',
    },
    { type: 'h3', text: '1. Les différentes formules' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Formule brute', value: 'indique la nature et le nombre de chaque type d’atome : C₄H₁₀O. Elle ne dit rien de l’enchaînement.' },
        { key: 'Formule développée', value: 'représente toutes les liaisons entre atomes (dans le plan, sans les doublets non liants).' },
        { key: 'Formule semi-développée', value: 'comme la développée, mais les liaisons avec les atomes H ne sont pas représentées : CH₃–CH(OH)–CH₂–CH₃.' },
        { key: 'Formule topologique', value: 'la chaîne carbonée est une ligne brisée ; chaque extrémité ou sommet est un atome de carbone ; les H portés par les C ne sont pas écrits ; les hétéroatomes (O, N…) et les H qu’ils portent sont écrits.' },
      ],
    },
    { type: 'svg', svg: writingsSvg(), caption: 'Quatre écritures du butan-2-ol.' },
    {
      type: 'callout',
      variant: 'method',
      title: 'Passer d’une formule topologique à la formule brute',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Compter les C', text: 'Un C à chaque sommet et à chaque extrémité de segment (sauf extrémité portant un hétéroatome écrit).' },
            { title: 'Compléter les H', text: 'Chaque C forme 4 liaisons : nombre de H = 4 − nombre de liaisons dessinées (une double compte pour 2).' },
            { title: 'Ajouter les hétéroatomes', text: 'Compter les O, N… et les H qui leur sont liés.' },
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple',
      content: [
        { type: 'p', text: 'Zigzag de 4 sommets avec « OH » sur le 2ᵉ : C1 (1 liaison dessinée → 3 H), C2 (3 liaisons → 1 H), C3 (2 liaisons → 2 H), C4 (1 liaison → 3 H), plus le H du groupe OH : 3 + 1 + 2 + 3 + 1 = 10 H. Formule brute : C₄H₁₀O (butan-2-ol).' },
      ],
    },
    { type: 'h3', text: '2. Squelettes carbonés saturés' },
    {
      type: 'p',
      text: 'Un squelette carboné est **saturé** lorsque toutes les liaisons carbone–carbone sont **simples**. Il peut être **linéaire** (chaque C lié à au plus deux autres C) ou **ramifié** (au moins un C lié à trois ou quatre C). Les hydrocarbures saturés non cycliques sont les **alcanes**, de formule générale CₙH₂ₙ₊₂.',
    },
    {
      type: 'table',
      headers: ['n', 'Préfixe', 'Alcane linéaire', 'Formule brute', 'Groupe alkyle'],
      rows: [
        ['1', 'méth-', 'méthane', 'CH₄', 'méthyl –CH₃'],
        ['2', 'éth-', 'éthane', 'C₂H₆', 'éthyl –CH₂–CH₃'],
        ['3', 'prop-', 'propane', 'C₃H₈', 'propyl'],
        ['4', 'but-', 'butane', 'C₄H₁₀', 'butyl'],
        ['5', 'pent-', 'pentane', 'C₅H₁₂', 'pentyl'],
        ['6', 'hex-', 'hexane', 'C₆H₁₄', 'hexyl'],
        ['7', 'hept-', 'heptane', 'C₇H₁₆', 'heptyl'],
        ['8', 'oct-', 'octane', 'C₈H₁₈', 'octyl'],
      ],
    },
    { type: 'h3', text: '3. Isomérie' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Isomères',
      content: [{ type: 'p', text: 'Des **isomères** sont des espèces chimiques de **même formule brute** mais de **formules semi-développées (ou topologiques) différentes**. Ce sont des espèces différentes, aux propriétés physiques et chimiques différentes.' }],
    },
    {
      type: 'list',
      items: [
        'C₄H₁₀ : butane CH₃–CH₂–CH₂–CH₃ ($T_{éb} = -1$ °C) et 2-méthylpropane CH₃–CH(CH₃)–CH₃ ($T_{éb} = -12$ °C) : isomères de chaîne.',
        'C₃H₈O : propan-1-ol CH₃–CH₂–CH₂–OH et propan-2-ol CH₃–CH(OH)–CH₃ : isomères de position du groupe –OH.',
        'C₃H₆O : propanal CH₃–CH₂–CHO et propanone CH₃–CO–CH₃ : isomères de fonction (aldéhyde / cétone).',
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Même molécule, dessins différents',
      content: [{ type: 'p', text: 'CH₃–CH₂–CH₂–CH₃ et une chaîne de 4 C « coudée » dessinée en équerre représentent la même molécule (le butane) : seul compte l’enchaînement des atomes, pas la forme du dessin. Avant de conclure à deux isomères, toujours chercher la plus longue chaîne.' }],
    },

    { type: 'h2', text: 'II. Groupes caractéristiques et familles' },
    {
      type: 'p',
      text: 'Un **groupe caractéristique** est un groupe d’atomes comportant au moins un hétéroatome, qui confère des propriétés particulières aux molécules qui le possèdent. Les espèces possédant le même groupe caractéristique forment une **famille fonctionnelle**.',
    },
    { type: 'svg', svg: familiesSvg(), caption: 'Les quatre familles au programme (chaînes à 3 atomes de carbone).' },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Alcool : groupe hydroxyle', text: '–OH lié à un atome de carbone **tétraédrique** (lié à 4 atomes). Ex. : éthanol CH₃–CH₂–OH (boissons alcoolisées, biocarburant).', icon: 'Wine' },
        { title: 'Aldéhyde : groupe carbonyle terminal', text: 'C=O dont le C est lié à au moins un H : –CHO, toujours en bout de chaîne. Ex. : éthanal CH₃–CHO ; méthanal HCHO (formol).', icon: 'FlaskConical' },
        { title: 'Cétone : groupe carbonyle interne', text: 'C=O dont le C est lié à deux atomes de carbone. Ex. : propanone CH₃–CO–CH₃ (acétone, dissolvant).', icon: 'Droplet' },
        { title: 'Acide carboxylique : groupe carboxyle', text: '–COOH : un C portant à la fois =O et –OH, en bout de chaîne. Ex. : acide éthanoïque CH₃–COOH (vinaigre), acide méthanoïque HCOOH (fourmis).', icon: 'TestTube' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ne pas confondre',
      content: [
        {
          type: 'list',
          items: [
            'Le –OH d’un acide carboxylique (porté par un C=O) n’est **pas** un groupe hydroxyle d’alcool : –COOH forme un seul groupe, le carboxyle.',
            'Aldéhyde et cétone possèdent tous deux le groupe carbonyle C=O : c’est sa **position** (bout ou intérieur de chaîne) qui les distingue.',
            'En semi-développée, on écrit –CHO (aldéhyde) et non –COH, pour éviter la confusion avec un alcool.',
          ],
        },
      ],
    },

    { type: 'h2', text: 'III. Nomenclature' },
    {
      type: 'p',
      text: 'Les règles de l’**UICPA** (Union internationale de chimie pure et appliquée) associent à chaque formule semi-développée un nom unique, et réciproquement. Au programme : les molécules à squelette saturé possédant **un seul** groupe caractéristique.',
    },
    { type: 'h3', text: '1. Nommer un alcane ramifié' },
    {
      type: 'steps',
      items: [
        { title: 'Chercher la chaîne principale', text: 'C’est la chaîne carbonée la plus longue ; elle donne le nom de l’alcane de base.' },
        { title: 'Repérer les ramifications', text: 'Ce sont des groupes alkyles : méthyl –CH₃, éthyl –C₂H₅…' },
        { title: 'Numéroter', text: 'Numéroter la chaîne principale de façon que les ramifications aient les plus petits numéros possibles.' },
        { title: 'Écrire le nom', text: 'Numéro(s) + nom de la ramification (préfixe di-, tri- si plusieurs identiques ; ordre alphabétique si différentes), puis nom de la chaîne principale.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples',
      content: [
        {
          type: 'list',
          items: [
            'CH₃–CH(CH₃)–CH₂–CH₃ : chaîne principale de 4 C (butane), un méthyl. Numérotation par la gauche → méthyl en 2 (par la droite il serait en 3) : **2-méthylbutane**.',
            'CH₃–C(CH₃)₂–CH₃ : 3 C, deux méthyl sur le C2 : **2,2-diméthylpropane**.',
            'CH₃–CH(CH₃)–CH(C₂H₅)–CH₂–CH₃ : la chaîne la plus longue compte 5 C (elle passe par l’éthyl) : **3-éthyl-2-méthylpentane** (éthyl avant méthyl par ordre alphabétique).',
          ],
        },
      ],
    },
    { type: 'svg', svg: branchedSvg(), caption: 'Quelques molécules ramifiées en écriture topologique.' },
    { type: 'h3', text: '2. Nommer une molécule possédant un groupe caractéristique' },
    {
      type: 'steps',
      items: [
        { title: 'Identifier la famille', text: 'Elle donne la terminaison (suffixe) : -ol, -al, -one, acide …-oïque.' },
        { title: 'Chaîne principale', text: 'La plus longue chaîne **contenant** le carbone fonctionnel (celui qui porte –OH, ou le C du C=O, ou le C du –COOH).' },
        { title: 'Numéroter', text: 'Le carbone fonctionnel doit avoir le plus petit numéro. Pour un aldéhyde ou un acide, c’est toujours le C n°1 (on ne l’écrit pas dans le nom).' },
        { title: 'Écrire le nom', text: 'Ramifications (numéro + nom) + nom de l’alcane dont on retire le « e » final + numéro du C fonctionnel + suffixe.' },
      ],
    },
    {
      type: 'table',
      headers: ['Formule semi-développée', 'Famille', 'Nom'],
      rows: [
        ['CH₃–OH', 'alcool', 'méthanol'],
        ['CH₃–CH₂–CH₂–OH', 'alcool', 'propan-1-ol'],
        ['CH₃–CH(OH)–CH₃', 'alcool', 'propan-2-ol'],
        ['CH₃–C(CH₃)(OH)–CH₃', 'alcool', '2-méthylpropan-2-ol'],
        ['CH₃–CH(CH₃)–CH₂–CH₂–OH', 'alcool', '3-méthylbutan-1-ol'],
        ['H–CHO', 'aldéhyde', 'méthanal'],
        ['CH₃–CH₂–CH₂–CHO', 'aldéhyde', 'butanal'],
        ['CH₃–CH(CH₃)–CHO', 'aldéhyde', '2-méthylpropanal'],
        ['CH₃–CO–CH₃', 'cétone', 'propanone'],
        ['CH₃–CO–CH₂–CH₂–CH₃', 'cétone', 'pentan-2-one'],
        ['CH₃–CH₂–CO–CH₂–CH₃', 'cétone', 'pentan-3-one'],
        ['CH₃–CO–CH(CH₃)–CH₃', 'cétone', '3-méthylbutan-2-one'],
        ['H–COOH', 'acide carboxylique', 'acide méthanoïque'],
        ['CH₃–COOH', 'acide carboxylique', 'acide éthanoïque'],
        ['CH₃–CH₂–CH(CH₃)–COOH', 'acide carboxylique', 'acide 2-méthylbutanoïque'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Pourquoi « butanone » sans numéro ?',
      content: [{ type: 'p', text: 'Dans une chaîne de 4 C, le carbonyle d’une cétone ne peut être qu’en position 2 (en position 1, ce serait un aldéhyde ; la position 3 se renumérote en 2). Le numéro est donc superflu : butanone, propanone. De même, on dit propanal, acide propanoïque (C n°1 obligatoire).' }],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Du nom à la formule',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Lire la fin du nom', text: '« pentan-3-one » : chaîne de 5 C, cétone sur le C3.' },
            { title: 'Écrire la chaîne et la numéroter', text: 'C1–C2–C3–C4–C5.' },
            { title: 'Placer groupe et ramifications', text: 'C=O sur C3.' },
            { title: 'Compléter avec les H', text: 'Chaque C a 4 liaisons : CH₃–CH₂–CO–CH₂–CH₃. Vérifier la formule brute : C₅H₁₀O = CₙH₂ₙO.' },
          ],
        },
      ],
    },

    { type: 'h2', text: 'IV. Spectroscopie infrarouge' },
    { type: 'h3', text: '1. Principe' },
    {
      type: 'p',
      text: 'Les liaisons d’une molécule ne sont pas rigides : elles **vibrent** (élongation, déformation). Une liaison donnée absorbe le rayonnement infrarouge pour des fréquences qui lui sont propres. Un spectrophotomètre IR envoie sur l’échantillon un rayonnement IR (longueurs d’onde de 2,5 à 25 µm environ) et mesure la **transmittance** $T$ (en %) : fraction du rayonnement transmise.',
    },
    {
      type: 'list',
      items: [
        'En abscisse : le **nombre d’onde** $\\sigma = \\dfrac{1}{\\lambda}$, exprimé en **cm⁻¹**, porté par valeurs **décroissantes** (de 4000 à 400–500 cm⁻¹).',
        'En ordonnée : la transmittance $T$ ; une **bande d’absorption** se traduit par un « creux » vers le bas ($T$ faible = forte absorption).',
        'Chaque bande est caractérisée par sa position $\\sigma$, son intensité (forte, moyenne, faible) et sa largeur (fine, large).',
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Conversion',
      content: [{ type: 'p', text: 'Pour $\\sigma = 1715$ cm⁻¹ : $\\lambda = \\dfrac{1}{\\sigma} = \\dfrac{1}{1715\\ \\text{cm}^{-1}} = 5{,}83 \\times 10^{-4}$ cm $= 5{,}83$ µm : on est bien dans l’infrarouge.' }],
    },
    { type: 'h3', text: '2. Table de référence' },
    {
      type: 'table',
      headers: ['Liaison', 'Famille', 'Nombre d’onde (cm⁻¹)', 'Intensité / forme'],
      rows: [
        ['O–H libre', 'alcool (phase gazeuse ou solution diluée)', '3580 – 3670', 'forte, fine'],
        ['O–H lié', 'alcool (liquide, solide)', '3200 – 3400', 'forte, large'],
        ['O–H', 'acide carboxylique', '2500 – 3200', 'forte à moyenne, très large'],
        ['N–H', 'amine, amide', '3100 – 3500', 'moyenne'],
        ['C–H', 'C tétraédrique (alcanes…)', '2800 – 3000', 'forte'],
        ['C–H', 'aldéhyde (–CHO)', '2700 – 2900', 'moyenne (souvent 2 bandes)'],
        ['C=O', 'aldéhyde, cétone', '1650 – 1730', 'forte, fine'],
        ['C=O', 'acide carboxylique', '1680 – 1710', 'forte'],
        ['C=O', 'ester', '1700 – 1740', 'forte'],
        ['C=C', 'alcène', '1625 – 1685', 'moyenne'],
        ['C–O', 'alcool, acide, ester', '1050 – 1450', 'forte'],
      ],
      caption: 'Les valeurs exactes varient légèrement selon les tables fournies : toujours utiliser celle de l’énoncé.',
    },
    { type: 'h3', text: '3. Lire un spectre' },
    { type: 'svg', svg: IR_ALCOOL, caption: 'Alcool : large bande O–H lié vers 3300 cm⁻¹ (ponts hydrogène), pas de bande C=O.' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Effet des ponts hydrogène sur la bande O–H',
      content: [{ type: 'p', text: 'Dans un alcool liquide, les groupes O–H sont engagés dans des **ponts hydrogène** de forces variées : la liaison O–H est affaiblie et la bande est **déplacée vers les faibles nombres d’onde** (3200–3400 cm⁻¹) et **élargie**. En phase gazeuse, sans pont H, la bande O–H « libre » est fine vers 3600 cm⁻¹.' }],
    },
    { type: 'svg', svg: IR_ALDEHYDE, caption: 'Aldéhyde : bande C=O fine et intense vers 1730 cm⁻¹ et bandes C–H aldéhydique vers 2720 et 2820 cm⁻¹.' },
    { type: 'svg', svg: IR_CETONE, caption: 'Cétone : bande C=O vers 1715 cm⁻¹, ni bande O–H ni bande C–H aldéhydique.' },
    { type: 'svg', svg: IR_ACIDE, caption: 'Acide carboxylique : bande O–H très large (2500–3200 cm⁻¹) qui chevauche les C–H, et bande C=O vers 1710 cm⁻¹.' },
    {
      type: 'steps',
      items: [
        { title: 'Ne regarder d’abord que σ > 1500 cm⁻¹', text: 'La zone en dessous (empreinte digitale) est trop complexe à interpréter ; elle sert à comparer avec un spectre de référence.' },
        { title: 'Chercher une bande C=O vers 1700 cm⁻¹', text: 'Présente → aldéhyde, cétone ou acide. Absente → ni aldéhyde, ni cétone, ni acide.' },
        { title: 'Chercher une bande O–H', text: 'Large vers 3200–3400 → alcool ; très large 2500–3200 avec C=O → acide carboxylique.' },
        { title: 'Distinguer aldéhyde et cétone', text: 'Bandes C–H aldéhydique vers 2700–2900 cm⁻¹ (souvent un épaulement vers 2720) → aldéhyde.' },
      ],
    },

    { type: 'h2', text: 'V. Synthèse d’une espèce chimique organique' },
    {
      type: 'p',
      text: 'Une **synthèse** consiste à fabriquer une espèce chimique par une ou plusieurs transformations chimiques. Elle permet de produire des espèces naturelles (arômes, médicaments) à moindre coût, ou des espèces artificielles. Un protocole de synthèse comporte quatre grandes étapes.',
    },
    { type: 'svg', svg: synthesisFlowSvg(), caption: 'Les quatre étapes d’une synthèse.' },
    { type: 'h3', text: '1. Transformation : le chauffage à reflux' },
    {
      type: 'p',
      text: 'Les réactions organiques sont souvent **lentes**. La température étant un facteur cinétique, on chauffe le mélange réactionnel. Pour éviter de perdre des réactifs, des produits ou du solvant par évaporation, on utilise un **réfrigérant** placé verticalement : les vapeurs se condensent sur ses parois froides et **retombent** dans le ballon.',
    },
    { type: 'svg', svg: refluxSvg(), caption: 'Montage de chauffage à reflux (à savoir schématiser et légender).' },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Points de sécurité et de bonne pratique',
      content: [
        {
          type: 'list',
          items: [
            'L’eau entre **par le bas** du réfrigérant et sort par le haut, pour qu’il soit entièrement rempli.',
            'Le montage n’est **jamais fermé** (risque de surpression).',
            'Grains de pierre ponce : régularisent l’ébullition.',
            'Le support élévateur permet d’ôter rapidement le chauffe-ballon.',
            'Manipuler sous hotte, avec blouse, gants et lunettes ; lire les pictogrammes de sécurité.',
          ],
        },
      ],
    },
    {
      type: 'p',
      text: 'Un **catalyseur** (ex. acide sulfurique pour la synthèse d’un ester) peut aussi être ajouté pour accélérer la réaction sans être consommé. On utilise souvent un des réactifs **en excès** pour consommer entièrement l’autre, plus coûteux.',
    },
    { type: 'h3', text: '2. Isolement du produit' },
    {
      type: 'table',
      headers: ['Situation', 'Technique', 'Principe'],
      rows: [
        ['Produit solide dans un liquide', '**filtration** sous vide (Büchner)', 'le solide reste sur le filtre ; l’aspiration accélère'],
        ['Produit solide peu soluble à froid', 'refroidissement (bain eau-glace) puis filtration', 'la solubilité diminue quand T baisse : le produit précipite'],
        ['Produit en solution ou liquide non miscible à l’eau', '**extraction liquide-liquide**, décantation', 'différence de solubilité, solvants non miscibles'],
        ['Ajout d’eau salée', 'relargage', 'le produit organique est moins soluble dans l’eau salée que dans l’eau'],
      ],
    },
    { type: 'h3', text: '3. Purification' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Lavage', value: 'Phase organique agitée avec de l’eau ou une solution aqueuse (ex. hydrogénocarbonate de sodium pour éliminer un acide) dans l’ampoule à décanter.' },
        { key: 'Séchage', value: 'Élimination des traces d’eau d’une phase organique avec un desséchant anhydre (sulfate de magnésium), puis filtration.' },
        { key: 'Recristallisation', value: 'Pour un solide : dissolution à chaud dans un minimum de solvant, puis refroidissement ; le produit recristallise pur, les impuretés (plus solubles ou en faible quantité) restent en solution.' },
        { key: 'Distillation', value: 'Pour un liquide : séparation des constituants d’après leurs températures d’ébullition.' },
      ],
    },
    { type: 'h3', text: '4. Analyse : identité et pureté' },
    {
      type: 'list',
      items: [
        '**Température de fusion** (banc Kofler) d’un solide : comparée à la valeur tabulée ; une impureté abaisse et étale la fusion.',
        '**Température d’ébullition** ou **indice de réfraction** (réfractomètre) d’un liquide.',
        '**Chromatographie sur couche mince (CCM)** : comparaison avec des références ; une espèce pure ne donne qu’une seule tache.',
        '**Spectroscopie IR** : présence des bandes attendues pour le produit, disparition de celles du réactif.',
      ],
    },
    { type: 'svg', svg: ccmSvg(), caption: 'Exploitation d’une chromatographie sur couche mince après révélation.' },
    {
      type: 'callout',
      variant: 'method',
      title: 'Justifier le choix d’une méthode',
      content: [{ type: 'p', text: 'On s’appuie sur les **propriétés physico-chimiques** des espèces données dans un tableau : état physique à la température de travail, solubilités dans l’eau et dans les solvants (à chaud, à froid), densités, températures de changement d’état, pictogrammes. Ex. : « le produit est un solide peu soluble dans l’eau froide : on l’isole par refroidissement puis filtration sous vide ».' }],
    },

    { type: 'h2', text: 'VI. Rendement d’une synthèse' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Rendement',
      content: [
        { type: 'p', text: 'Le **rendement** $\\eta$ d’une synthèse est le quotient de la quantité de matière de produit effectivement obtenue par la quantité maximale de produit que l’on pourrait obtenir si la transformation était totale (avancement maximal) :' },
        { type: 'math', tex: r`\eta = \frac{n_{\text{exp}}}{n_{\text{max}}} = \frac{m_{\text{exp}}}{m_{\text{max}}}` },
        { type: 'p', text: 'C’est une grandeur sans unité, comprise entre 0 et 1, souvent exprimée en pourcentage.' },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Écrire l’équation de la réaction', text: 'Ajustée.' },
        { title: 'Calculer les quantités initiales des réactifs', text: '$n = \\dfrac{m}{M}$ ; pour un liquide $m = \\rho \\times V$ ; pour une solution $n = c \\times V$.' },
        { title: 'Déterminer le réactif limitant et $x_{max}$', text: 'Pour une équation $aA + bB \\to cC + \\dots$ : comparer $n_A/a$ et $n_B/b$ ; le plus petit donne $x_{max}$.' },
        { title: 'En déduire $n_{max}$ du produit', text: '$n_{max}(C) = c \\times x_{max}$, puis $m_{max} = n_{max} \\times M(C)$.' },
        { title: 'Calculer le rendement', text: '$\\eta = m_{exp}/m_{max}$.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé : synthèse de l’arôme de banane',
      content: [
        { type: 'p', text: 'L’éthanoate de 3-méthylbutyle (arôme de banane, $M = 130$ g·mol⁻¹) est synthétisé à partir de 30,0 mL d’acide éthanoïque ($\\rho = 1{,}05$ g·mL⁻¹, $M = 60{,}0$ g·mol⁻¹) et de 20,0 mL de 3-méthylbutan-1-ol ($\\rho = 0{,}81$ g·mL⁻¹, $M = 88{,}0$ g·mol⁻¹) :' },
        { type: 'math', tex: r`\mathrm{C_2H_4O_2} + \mathrm{C_5H_{12}O} \longrightarrow \mathrm{C_7H_{14}O_2} + \mathrm{H_2O}` },
        { type: 'p', text: '$n_{acide} = \\dfrac{1{,}05 \\times 30{,}0}{60{,}0} = 0{,}525$ mol ; $n_{alcool} = \\dfrac{0{,}81 \\times 20{,}0}{88{,}0} = 0{,}184$ mol.' },
        { type: 'p', text: 'Coefficients tous égaux à 1 : l’alcool est limitant, $x_{max} = 0{,}184$ mol, donc $m_{max} = 0{,}184 \\times 130 = 23{,}9$ g.' },
        { type: 'p', text: 'On obtient 15,0 g d’ester : $\\eta = \\dfrac{15{,}0}{23{,}9} = 0{,}63$, soit **63 %**.' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Pourquoi le rendement est-il inférieur à 100 % ?',
      content: [
        {
          type: 'list',
          items: [
            'La transformation peut être **non totale** (équilibre, cas de l’estérification) ou trop lente.',
            '**Pertes** lors des transferts, de l’isolement (produit resté dans les phases aqueuses, sur les parois) et de la purification (recristallisation).',
            '**Réactions parasites** formant d’autres produits.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Chimie verte',
      content: [{ type: 'p', text: 'Améliorer le rendement, utiliser des catalyseurs, limiter les solvants dangereux et les déchets, économiser l’énergie : ce sont quelques principes de la **chimie verte**, qui vise à réduire l’impact des synthèses sur l’environnement et la santé.' }],
    },
  ],

  /* ================================================================ */
  exercices: [
    {
      id: 'pc05-ex1',
      title: 'Formules et isomères de C₄H₁₀ et C₅H₁₂',
      difficulty: 1,
      duration: 10,
      tags: ['formules', 'isomérie', 'alcanes'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Vérifier que C₄H₁₀ et C₅H₁₂ sont des formules brutes d’alcanes.',
            'Écrire les formules semi-développées et topologiques des deux isomères de formule C₄H₁₀ et les nommer.',
            'Il existe trois isomères de formule C₅H₁₂. Écrire leurs formules semi-développées et les nommer.',
            'Classer ces trois isomères par température d’ébullition croissante et justifier (voir chapitre précédent).',
          ],
        },
      ],
      hints: ['Formule générale d’un alcane : CₙH₂ₙ₊₂.', 'Pour C₅H₁₂ : chaîne principale de 5, 4 ou 3 carbones.'],
      solution: [
        { type: 'p', text: '1. Pour $n = 4$ : $2n + 2 = 10$ ✓. Pour $n = 5$ : $2n + 2 = 12$ ✓. Ce sont des alcanes.' },
        { type: 'p', text: '2. **Butane** CH₃–CH₂–CH₂–CH₃ (topologique : zigzag de 4 sommets, 3 segments) et **2-méthylpropane** CH₃–CH(CH₃)–CH₃ (topologique : un sommet central relié à 3 segments, forme en « Y »).' },
        { type: 'p', text: '3. **Pentane** CH₃–CH₂–CH₂–CH₂–CH₃ ; **2-méthylbutane** CH₃–CH(CH₃)–CH₂–CH₃ ; **2,2-diméthylpropane** CH₃–C(CH₃)₂–CH₃.' },
        { type: 'p', text: '4. Plus une molécule est ramifiée, plus elle est compacte, plus sa surface de contact avec ses voisines est faible, donc plus les interactions de Van der Waals sont faibles : 2,2-diméthylpropane (10 °C) < 2-méthylbutane (28 °C) < pentane (36 °C).' },
      ],
    },
    {
      id: 'pc05-ex2',
      title: 'Reconnaître les familles',
      difficulty: 1,
      duration: 10,
      tags: ['groupes caractéristiques', 'familles'],
      statement: [
        { type: 'p', text: 'Pour chaque espèce, entourer le groupe caractéristique, le nommer et donner la famille.' },
        {
          type: 'list',
          items: [
            'a) CH₃–CH₂–CH₂–CHO (odeur de beurre rance)',
            'b) CH₃–CH(OH)–CH₂–CH₃',
            'c) CH₃–CH₂–COOH',
            'd) CH₃–CO–CH₂–CH₂–CH₃',
            'e) HO–CH₂–CH₃',
            'f) H–CHO',
          ],
        },
      ],
      hints: ['–CHO : carbonyle en bout de chaîne.', 'Un –OH porté par un C qui porte aussi un =O appartient au groupe carboxyle.'],
      solution: [
        {
          type: 'table',
          headers: ['Espèce', 'Groupe', 'Famille', 'Nom (bonus)'],
          rows: [
            ['a', 'carbonyle terminal –CHO', 'aldéhyde', 'butanal'],
            ['b', 'hydroxyle –OH', 'alcool', 'butan-2-ol'],
            ['c', 'carboxyle –COOH', 'acide carboxylique', 'acide propanoïque'],
            ['d', 'carbonyle interne C=O', 'cétone', 'pentan-2-one'],
            ['e', 'hydroxyle –OH', 'alcool', 'éthanol'],
            ['f', 'carbonyle terminal', 'aldéhyde', 'méthanal'],
          ],
        },
        { type: 'p', text: 'Remarque : HO–CH₂–CH₃ et CH₃–CH₂–OH représentent la même molécule (éthanol).' },
      ],
    },
    {
      id: 'pc05-ex3',
      title: 'Nommer des molécules',
      difficulty: 2,
      duration: 15,
      tags: ['nomenclature'],
      statement: [
        { type: 'p', text: 'Nommer les espèces suivantes en justifiant (chaîne principale, numérotation).' },
        {
          type: 'list',
          items: [
            'a) CH₃–CH₂–CH(CH₃)–CH₂–OH',
            'b) CH₃–CH(CH₃)–CH₂–CHO',
            'c) CH₃–CH(CH₃)–CO–CH₃',
            'd) CH₃–CH(CH₃)–CH(CH₃)–COOH',
            'e) (CH₃)₃C–OH',
            'f) CH₃–CH(C₂H₅)–CH₂–CH₂–CH₃ (alcane)',
          ],
        },
      ],
      hints: ['Le carbone fonctionnel doit avoir le plus petit numéro.', 'Pour f), chercher la plus longue chaîne : elle passe par l’éthyl.'],
      solution: [
        { type: 'p', text: 'a) Chaîne de 4 C contenant le C porteur de –OH ; numérotation à partir de CH₂OH (C1) ; méthyl en C2 : **2-méthylbutan-1-ol**.' },
        { type: 'p', text: 'b) Aldéhyde, C1 = CHO ; chaîne de 4 C ; méthyl sur C3 : **3-méthylbutanal**.' },
        { type: 'p', text: 'c) Cétone, chaîne de 4 C. En numérotant à partir de la droite : C1 = CH₃, C2 = C=O, C3 = CH(CH₃) : **3-méthylbutan-2-one** (l’autre sens donnerait la cétone en 3 : moins bien).' },
        { type: 'p', text: 'd) Acide, C1 = COOH ; chaîne de 4 C ; méthyl sur C2 et C3 : **acide 2,3-diméthylbutanoïque**.' },
        { type: 'p', text: 'e) Le C central porte –OH et trois CH₃ : chaîne principale de 3 C, OH en 2, méthyl en 2 : **2-méthylpropan-2-ol**.' },
        { type: 'p', text: 'f) La chaîne la plus longue a 6 C (CH₃ de l’éthyl–CH₂–CH–CH₂–CH₂–CH₃) ; la ramification restante est le méthyl du C portant l’éthyl. En numérotant depuis l’extrémité de l’ancien éthyl, il est en position 3 (en 4 dans l’autre sens) : **3-méthylhexane** (et non « 2-éthylpentane »).' },
      ],
    },
    {
      id: 'pc05-ex4',
      title: 'Du nom à la formule',
      difficulty: 2,
      duration: 15,
      tags: ['nomenclature', 'formules'],
      statement: [
        { type: 'p', text: 'Écrire la formule semi-développée, la formule topologique et la formule brute des espèces suivantes ; préciser leur famille.' },
        {
          type: 'list',
          items: ['a) 3-méthylbutan-2-ol', 'b) 2,2-diméthylpropanal', 'c) pentan-3-one', 'd) acide 2-méthylpropanoïque', 'e) 2-méthylpentan-3-ol'],
        },
      ],
      hints: ['Commencer par écrire la chaîne principale numérotée.', 'Vérifier les formules générales : CₙH₂ₙ₊₂O, CₙH₂ₙO, CₙH₂ₙO₂.'],
      solution: [
        { type: 'p', text: 'a) CH₃–CH(OH)–CH(CH₃)–CH₃ ; topologique : zigzag de 4 sommets, OH sur le 2ᵉ, un segment (méthyl) sur le 3ᵉ ; C₅H₁₂O ; alcool.' },
        { type: 'p', text: 'b) (CH₃)₃C–CHO ou CH₃–C(CH₃)₂–CHO ; C₅H₁₀O ; aldéhyde.' },
        { type: 'p', text: 'c) CH₃–CH₂–CO–CH₂–CH₃ ; topologique : zigzag de 5 sommets, =O sur le sommet central ; C₅H₁₀O ; cétone.' },
        { type: 'p', text: 'd) CH₃–CH(CH₃)–COOH ; C₄H₈O₂ ; acide carboxylique.' },
        { type: 'p', text: 'e) CH₃–CH(CH₃)–CH(OH)–CH₂–CH₃ ; C₆H₁₄O ; alcool. Vérification : $2 \\times 6 + 2 = 14$ ✓.' },
        { type: 'svg', svg: branchedSvg(), caption: 'Formules topologiques de a), b) et de deux autres exemples.' },
      ],
    },
    {
      id: 'pc05-ex5',
      title: 'Isomères de fonction de C₄H₈O',
      difficulty: 2,
      duration: 15,
      tags: ['isomérie', 'IR'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Montrer qu’une espèce de formule C₄H₈O à squelette saturé non cyclique peut être un aldéhyde ou une cétone.',
            'Écrire les formules semi-développées et nommer les trois isomères carbonylés (aldéhydes et cétones) de formule C₄H₈O.',
            'On dispose du spectre IR de l’un d’eux : bande intense à 1715 cm⁻¹, bandes vers 2880–2980 cm⁻¹, aucune bande vers 2720 cm⁻¹ ni au-delà de 3000 cm⁻¹. Identifier l’espèce.',
          ],
        },
      ],
      hints: ['Formule générale des aldéhydes et cétones saturés : CₙH₂ₙO.', 'Comment distinguer en IR un aldéhyde d’une cétone ?'],
      solution: [
        { type: 'p', text: '1. Pour $n = 4$, $2n = 8$ : C₄H₈O est de la forme CₙH₂ₙO, formule générale des aldéhydes et cétones à chaîne saturée (un seul O, engagé dans un C=O).' },
        { type: 'p', text: '2. **Butanal** CH₃–CH₂–CH₂–CHO ; **2-méthylpropanal** CH₃–CH(CH₃)–CHO ; **butanone** CH₃–CO–CH₂–CH₃.' },
        { type: 'p', text: '3. La bande à 1715 cm⁻¹ révèle une liaison C=O. L’absence de bande C–H aldéhydique (vers 2700–2900 cm⁻¹, notamment l’épaulement vers 2720) indique que ce n’est pas un aldéhyde : il s’agit de la **butanone**, seule cétone de formule C₄H₈O. (Pas de bande O–H : ce n’est ni un alcool, ni un acide.)' },
      ],
    },
    {
      id: 'pc05-ex6',
      title: 'Identifier trois flacons par spectroscopie IR',
      difficulty: 2,
      duration: 20,
      tags: ['IR'],
      statement: [
        { type: 'p', text: 'Trois flacons A, B et C ont perdu leurs étiquettes. Ils contiennent du butan-1-ol, de la butanone et de l’acide butanoïque. On enregistre leurs spectres IR (phase liquide).' },
        {
          type: 'svg',
          svg: IR_SANS_LABEL('pc05-ir-A', 'Spectre du flacon A', [
            { c: 2950, w: 330, d: 48 },
            { c: 2970, w: 18, d: 18 },
            { c: 1710, w: 20, d: 84 },
            { c: 1290, w: 18, d: 38 },
            { c: 935, w: 22, d: 25 },
          ]),
        },
        {
          type: 'svg',
          svg: IR_SANS_LABEL('pc05-ir-B', 'Spectre du flacon B', [
            { c: 3340, w: 130, d: 62 },
            { c: 2960, w: 22, d: 55 },
            { c: 2875, w: 18, d: 40 },
            { c: 1060, w: 22, d: 60 },
          ]),
        },
        {
          type: 'svg',
          svg: IR_SANS_LABEL('pc05-ir-C', 'Spectre du flacon C', [
            { c: 2980, w: 22, d: 38 },
            { c: 2940, w: 14, d: 22 },
            { c: 1715, w: 18, d: 82 },
            { c: 1170, w: 16, d: 40 },
          ]),
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire les formules semi-développées des trois espèces et entourer leurs groupes caractéristiques.',
            'Attribuer chaque spectre à une espèce en justifiant à l’aide de la table du cours.',
            'Pourquoi la bande O–H du spectre B est-elle large ? À quel nombre d’onde l’observerait-on en phase gazeuse ?',
          ],
        },
      ],
      hints: ['Chercher d’abord la bande C=O vers 1700 cm⁻¹.', 'Une bande O–H très large qui « mange » les C–H est caractéristique des acides.'],
      solution: [
        { type: 'p', text: '1. Butan-1-ol CH₃–CH₂–CH₂–CH₂–OH (hydroxyle) ; butanone CH₃–CO–CH₂–CH₃ (carbonyle) ; acide butanoïque CH₃–CH₂–CH₂–COOH (carboxyle).' },
        { type: 'p', text: '2. **A** : bande C=O intense vers 1710 cm⁻¹ et très large bande O–H de 2500 à 3200 cm⁻¹ : **acide butanoïque**. **B** : large bande vers 3200–3400 cm⁻¹ (O–H lié) et pas de bande C=O : **butan-1-ol**. **C** : bande C=O fine vers 1715 cm⁻¹ sans bande O–H : **butanone**.' },
        { type: 'p', text: '3. Dans le liquide, les molécules d’alcool sont liées par des ponts hydrogène, de longueurs et d’énergies variées : la bande O–H est élargie et déplacée vers 3200–3400 cm⁻¹. En phase gazeuse (molécules isolées), on observerait une bande O–H libre, fine, vers 3580–3670 cm⁻¹.' },
      ],
    },
    {
      id: 'pc05-ex7',
      title: 'Rendement de la synthèse d’un arôme',
      difficulty: 2,
      duration: 15,
      tags: ['rendement', 'synthèse'],
      statement: [
        { type: 'p', text: 'On synthétise l’éthanoate de benzyle (odeur de jasmin, $M = 150$ g·mol⁻¹) selon l’équation : C₂H₄O₂ + C₇H₈O → C₉H₁₀O₂ + H₂O.' },
        { type: 'p', text: 'On introduit 10,0 mL d’alcool benzylique C₇H₈O ($\\rho = 1{,}04$ g·mL⁻¹ ; $M = 108$ g·mol⁻¹), 15,0 mL d’acide éthanoïque ($\\rho = 1{,}05$ g·mL⁻¹ ; $M = 60{,}0$ g·mol⁻¹) et quelques gouttes d’acide sulfurique concentré. Après 1 h de chauffage à reflux, isolement et purification, on obtient 9,80 g d’ester.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quel est le rôle de l’acide sulfurique ? Celui du chauffage à reflux ?',
            'Calculer les quantités de matière initiales des réactifs.',
            'Déterminer le réactif limitant et la masse maximale d’ester.',
            'Calculer le rendement de la synthèse.',
            'Proposer une raison pour laquelle le rendement n’est pas égal à 100 %.',
          ],
        },
      ],
      hints: ['$m = \\rho \\times V$.', 'Tous les nombres stœchiométriques valent 1.'],
      solution: [
        { type: 'p', text: '1. L’acide sulfurique est un **catalyseur** : il accélère la réaction sans être consommé. Le chauffage accélère la transformation (la température est un facteur cinétique) ; le reflux évite les pertes de matière par évaporation.' },
        { type: 'p', text: '2. $n_{alcool} = \\dfrac{1{,}04 \\times 10{,}0}{108} = \\dfrac{10{,}4}{108} = 9{,}63 \\times 10^{-2}$ mol ; $n_{acide} = \\dfrac{1{,}05 \\times 15{,}0}{60{,}0} = \\dfrac{15{,}75}{60{,}0} = 0{,}263$ mol.' },
        { type: 'p', text: '3. Coefficients égaux à 1 : $n_{alcool} < n_{acide}$, l’**alcool benzylique est limitant**, $x_{max} = 9{,}63 \\times 10^{-2}$ mol. $m_{max} = 9{,}63 \\times 10^{-2} \\times 150 = 14{,}4$ g.' },
        { type: 'p', text: '4. $\\eta = \\dfrac{9{,}80}{14{,}4} = 0{,}68$, soit **68 %**.' },
        { type: 'p', text: '5. L’estérification est une transformation **non totale** (limitée) ; s’y ajoutent des pertes lors des transferts, des lavages et de la purification.' },
      ],
    },
    {
      id: 'pc05-ex8',
      title: 'Oxydation du butan-1-ol (type bac)',
      difficulty: 3,
      duration: 30,
      tags: ['synthèse', 'IR', 'rendement', 'type bac'],
      statement: [
        { type: 'p', text: 'On oxyde le butan-1-ol par les ions permanganate en milieu acide. Équation de la réaction :' },
        { type: 'math', tex: r`5\,\mathrm{C_4H_{10}O} + 4\,\mathrm{MnO_4^-} + 12\,\mathrm{H^+} \longrightarrow 5\,\mathrm{C_4H_8O_2} + 4\,\mathrm{Mn^{2+}} + 11\,\mathrm{H_2O}` },
        { type: 'p', text: 'Protocole : dans un ballon, introduire 5,0 mL de butan-1-ol ($\\rho = 0{,}81$ g·mL⁻¹ ; $M = 74{,}0$ g·mol⁻¹), puis une solution acidifiée de permanganate de potassium en excès. Chauffer à reflux 30 min. Après refroidissement, extraire le produit organique au dichlorométhane, sécher la phase organique, évaporer le solvant puis distiller. On recueille 3,10 g d’un liquide ($M = 88{,}0$ g·mol⁻¹).' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Écrire la formule semi-développée du butan-1-ol. Le produit C₄H₈O₂ appartient à la famille des acides carboxyliques : écrire sa formule semi-développée et le nommer.',
            'Vérifier que l’équation est ajustée (éléments et charges).',
            'Identifier dans le protocole les étapes de transformation, d’isolement, de purification.',
            'Faire le schéma légendé du montage utilisé pour la transformation.',
            'Calculer le rendement de la synthèse.',
            'Le spectre IR du liquide obtenu présente une bande très large entre 2500 et 3200 cm⁻¹ et une bande forte vers 1710 cm⁻¹. Ces observations confirment-elles la nature du produit ? Que conclure sur la présence éventuelle de butan-1-ol restant ?',
          ],
        },
      ],
      hints: ['Le permanganate est en excès : le réactif limitant est l’alcool.', '$n_{max}(\\text{acide}) = n_0(\\text{alcool})$ car les coefficients sont égaux (5 et 5).', 'Une bande O–H d’alcool (3200–3400) serait-elle discernable sous la bande de l’acide ?'],
      solution: [
        { type: 'p', text: '1. Butan-1-ol : CH₃–CH₂–CH₂–CH₂–OH. Produit : CH₃–CH₂–CH₂–COOH, **acide butanoïque** (le C de l’ancien –CH₂OH devient le C du –COOH, n°1).' },
        { type: 'p', text: '2. C : 20 = 20 ; H : 50 + 12 = 62 et 40 + 22 = 62 ; O : 5 + 16 = 21 et 10 + 11 = 21 ; Mn : 4 = 4. Charges : $4 \\times (-1) + 12 \\times (+1) = +8$ et $4 \\times (+2) = +8$. L’équation est ajustée.' },
        { type: 'p', text: '3. **Transformation** : chauffage à reflux du mélange. **Isolement** : extraction liquide-liquide au dichlorométhane. **Purification** : séchage de la phase organique, évaporation du solvant puis distillation.' },
        { type: 'svg', svg: refluxSvg(), caption: '4. Montage de chauffage à reflux.' },
        { type: 'p', text: '5. $n_0(\\text{alcool}) = \\dfrac{\\rho V}{M} = \\dfrac{0{,}81 \\times 5{,}0}{74{,}0} = \\dfrac{4{,}05}{74{,}0} = 5{,}47 \\times 10^{-2}$ mol. Le permanganate est en excès, l’alcool est limitant : $5\\,x_{max} = n_0$ et $n_{max}(\\text{acide}) = 5\\,x_{max} = 5{,}47 \\times 10^{-2}$ mol. $m_{max} = 5{,}47 \\times 10^{-2} \\times 88{,}0 = 4{,}82$ g. $\\eta = \\dfrac{3{,}10}{4{,}82} = 0{,}64$, soit **64 %**.' },
        { type: 'p', text: '6. La bande très large 2500–3200 cm⁻¹ (O–H d’acide carboxylique) et la bande C=O vers 1710 cm⁻¹ sont caractéristiques d’un acide carboxylique : la nature du produit est confirmée. En revanche, la bande O–H d’un alcool (3200–3400 cm⁻¹) serait en partie masquée par la bande de l’acide : l’IR seul ne permet pas d’exclure des traces d’alcool. Une CCM ou la mesure de la température d’ébullition (164 °C pour l’acide butanoïque, 118 °C pour le butan-1-ol) permettrait de contrôler la pureté.' },
      ],
    },
    {
      id: 'pc05-ex9',
      title: 'Synthèse de l’aspirine (type bac)',
      difficulty: 3,
      duration: 35,
      tags: ['synthèse', 'protocole', 'CCM', 'rendement', 'type bac'],
      statement: [
        { type: 'p', text: 'L’aspirine (acide acétylsalicylique) est synthétisée à partir d’acide salicylique et d’anhydride éthanoïque selon : C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + C₂H₄O₂.' },
        {
          type: 'table',
          headers: ['Espèce', 'M (g·mol⁻¹)', 'État à 20 °C', 'T_fusion', 'Solubilité dans l’eau'],
          rows: [
            ['acide salicylique', '138', 'solide', '159 °C', 'faible à froid, bonne à chaud'],
            ['anhydride éthanoïque', '102', 'liquide (ρ = 1,08 g·mL⁻¹)', '—', 'réagit avec l’eau'],
            ['aspirine', '180', 'solide', '135 °C', 'très faible à froid, bonne à chaud'],
            ['acide éthanoïque', '60,0', 'liquide', '—', 'totale'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Étape 1 : dans un ballon sec, introduire 3,00 g d’acide salicylique, 7,0 mL d’anhydride éthanoïque et 3 gouttes d’acide sulfurique ; chauffer à reflux à 60 °C pendant 20 min.',
            'Étape 2 : verser le mélange refroidi dans 50 mL d’eau glacée ; des cristaux apparaissent ; filtrer sous vide sur Büchner et rincer à l’eau glacée.',
            'Étape 3 : dissoudre les cristaux dans un minimum d’eau chaude, laisser refroidir lentement puis dans un bain de glace ; filtrer, sécher.',
            'Étape 4 : mesurer la température de fusion au banc Kofler et réaliser une CCM.',
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Associer chaque étape à : transformation, isolement, purification, analyse.',
            'Justifier l’utilisation d’eau **glacée** à l’étape 2.',
            'Nommer la technique de l’étape 3 et expliquer son principe.',
            'Montrer que l’acide salicylique est le réactif limitant et calculer la masse maximale d’aspirine.',
            'On obtient 2,90 g d’aspirine sèche. Calculer le rendement.',
            'Le produit fond à 134–135 °C. Sur la CCM, le dépôt du produit donne une seule tache à la même hauteur que l’aspirine de référence, et aucune à la hauteur de l’acide salicylique. Conclure.',
          ],
        },
      ],
      hints: ['$n = m/M$ et $n = \\rho V / M$.', 'La solubilité de l’aspirine dépend fortement de la température.'],
      solution: [
        { type: 'p', text: '1. Étape 1 : transformation ; étape 2 : isolement ; étape 3 : purification ; étape 4 : analyse.' },
        { type: 'p', text: '2. L’aspirine est très peu soluble dans l’eau froide : l’eau glacée la fait précipiter et limite les pertes lors du rinçage. L’acide éthanoïque formé et l’anhydride restant (qui réagit avec l’eau) sont éliminés dans le filtrat.' },
        { type: 'p', text: '3. C’est une **recristallisation** : l’aspirine, soluble à chaud, est dissoute dans un minimum d’eau chaude ; en refroidissant, sa solubilité diminue et elle recristallise, tandis que les impuretés, en faible quantité, restent dissoutes.' },
        { type: 'p', text: '4. $n(\\text{acide salicylique}) = \\dfrac{3{,}00}{138} = 2{,}17 \\times 10^{-2}$ mol ; $n(\\text{anhydride}) = \\dfrac{1{,}08 \\times 7{,}0}{102} = \\dfrac{7{,}56}{102} = 7{,}4 \\times 10^{-2}$ mol. Coefficients égaux à 1 : l’acide salicylique est limitant ; $x_{max} = 2{,}17 \\times 10^{-2}$ mol et $m_{max} = 2{,}17 \\times 10^{-2} \\times 180 = 3{,}91$ g.' },
        { type: 'p', text: '5. $\\eta = \\dfrac{2{,}90}{3{,}91} = 0{,}74$, soit **74 %**.' },
        { type: 'p', text: '6. La température de fusion mesurée correspond à celle de l’aspirine (135 °C) et la fusion est nette ; la CCM ne montre qu’une tache, à la hauteur de la référence, et plus d’acide salicylique : le produit est de l’**aspirine pure** (aux précisions des méthodes près).' },
      ],
    },
  ],

  /* ================================================================ */
  representations: [
    {
      type: 'widget',
      id: 'organic-families',
      title: 'Explorer les familles organiques',
      caption: 'Groupes caractéristiques, nomenclature et bandes IR associées.',
    },
    { type: 'svg', svg: familiesSvg(), caption: 'Les quatre familles du programme.' },
    { type: 'svg', svg: IR_ACIDE, caption: 'Spectre stylisé d’un acide carboxylique : la signature la plus facile à reconnaître.' },
    { type: 'svg', svg: refluxSvg(), caption: 'Le montage à reflux légendé.' },
    {
      type: 'matching',
      title: 'Associer chaque molécule à son nom',
      pairs: [
        { left: 'CH₃–CH(OH)–CH₃', right: 'propan-2-ol' },
        { left: 'CH₃–CH₂–CHO', right: 'propanal' },
        { left: 'CH₃–CO–CH₂–CH₃', right: 'butanone' },
        { left: 'CH₃–CH₂–COOH', right: 'acide propanoïque' },
        { left: 'CH₃–CH(CH₃)–CH₃', right: '2-méthylpropane' },
        { left: 'CH₃–CH₂–CO–CH₂–CH₃', right: 'pentan-3-one' },
      ],
    },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Quelle est la formule brute d’une molécule dont la formule topologique est un zigzag de 5 sommets terminé par OH ?',
          choices: ['C₅H₁₀O', 'C₅H₁₂O', 'C₆H₁₄O', 'C₅H₁₁O'],
          answer: 1,
          explanation: 'Pentan-1-ol : 5 C, alcool saturé CₙH₂ₙ₊₂O → C₅H₁₂O.',
        },
        {
          question: 'Le groupe –CHO est caractéristique des :',
          choices: ['alcools', 'aldéhydes', 'cétones', 'acides carboxyliques'],
          answer: 1,
          explanation: 'Carbonyle en bout de chaîne.',
        },
        {
          question: 'Le nom correct de CH₃–CH₂–CH(OH)–CH₃ est :',
          choices: ['butan-3-ol', 'butan-2-ol', '2-hydroxybutane', 'butanol-2'],
          answer: 1,
          explanation: 'Le C porteur de –OH doit avoir le plus petit numéro : numérotation par la droite.',
        },
        {
          question: 'Propanal et propanone sont :',
          choices: ['la même molécule', 'des isomères', 'de la même famille', 'de formules brutes différentes'],
          answer: 1,
          explanation: 'Même formule brute C₃H₆O, formules semi-développées différentes.',
        },
        {
          question: 'Sur un spectre IR, une bande forte et fine vers 1715 cm⁻¹ signale :',
          choices: ['une liaison O–H', 'une liaison C=O', 'une liaison C–H', 'une liaison C–O'],
          answer: 1,
          explanation: 'Liaison C=O : 1650–1730 cm⁻¹ (aldéhyde, cétone), 1680–1710 (acide).',
        },
        {
          question: 'Dans un montage à reflux, l’eau du réfrigérant :',
          choices: ['entre par le haut', 'entre par le bas', 'n’est pas nécessaire', 'est dans le ballon'],
          answer: 1,
          explanation: 'Entrée par le bas pour remplir complètement le réfrigérant.',
        },
        {
          question: 'Le rendement d’une synthèse est :',
          choices: ['$n_{max}/n_{exp}$', '$n_{exp}/n_{max}$', '$m_{réactif}/m_{produit}$', 'toujours égal à 1'],
          answer: 1,
          explanation: 'η = quantité obtenue / quantité maximale, entre 0 et 1.',
        },
        {
          question: 'La recristallisation est une étape de :',
          choices: ['transformation', 'isolement', 'purification', 'analyse'],
          answer: 2,
          explanation: 'Elle élimine les impuretés d’un solide.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Formule topologique', back: 'Chaîne en zigzag ; chaque sommet/extrémité = un C ; H des C non écrits ; hétéroatomes écrits.' },
        { front: 'Isomères', back: 'Même formule brute, formules semi-développées différentes.' },
        { front: 'Formule générale d’un alcane', back: 'CₙH₂ₙ₊₂' },
        { front: 'Groupe hydroxyle', back: '–OH lié à un C tétraédrique : famille des alcools, suffixe -ol.' },
        { front: 'Aldéhyde', back: 'Groupe carbonyle en bout de chaîne –CHO ; suffixe -al ; C n°1.' },
        { front: 'Cétone', back: 'Groupe carbonyle C=O à l’intérieur de la chaîne ; suffixe -one.' },
        { front: 'Acide carboxylique', back: 'Groupe carboxyle –COOH ; « acide …-oïque » ; C n°1.' },
        { front: 'Règle de numérotation', back: 'Le C porteur du groupe caractéristique reçoit le plus petit numéro.' },
        { front: 'Nombre d’onde', back: 'σ = 1/λ, en cm⁻¹ ; axe IR gradué de 4000 à 500 cm⁻¹ (décroissant).' },
        { front: 'Bande O–H alcool lié', back: '3200–3400 cm⁻¹, forte et large (ponts hydrogène).' },
        { front: 'Bande O–H acide', back: '2500–3200 cm⁻¹, très large.' },
        { front: 'Bande C=O', back: '≈ 1650–1730 cm⁻¹, forte et fine.' },
        { front: 'Rôle du chauffage à reflux', back: 'Accélérer la réaction (T élevée) sans perte de matière (vapeurs condensées).' },
        { front: 'Quatre étapes d’une synthèse', back: 'Transformation, isolement, purification, analyse.' },
        { front: 'Rendement', back: 'η = n_exp / n_max = m_exp / m_max (n_max calculé avec le réactif limitant).' },
      ],
    },
    {
      type: 'cloze',
      title: 'Nomenclature',
      text: 'Pour nommer une molécule, on cherche la chaîne carbonée la plus {{longue}} contenant le groupe caractéristique. Le carbone fonctionnel reçoit le plus {{petit}} numéro. Ainsi CH₃–CH₂–CH₂–CHO est le {{butanal}}, CH₃–CO–CH₃ est la {{propanone}} et CH₃–COOH est l’acide {{éthanoïque}}. Un alcool a un nom terminé par {{-ol|ol}}.',
    },
    {
      type: 'ordering',
      title: 'Ordonner les étapes d’une synthèse',
      items: [
        'Introduire les réactifs et le catalyseur dans le ballon',
        'Chauffer à reflux',
        'Refroidir et isoler le produit brut (filtration ou extraction)',
        'Purifier (recristallisation, lavage, distillation)',
        'Analyser : CCM, température de fusion, spectre IR',
        'Calculer le rendement',
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Dans une formule topologique, les atomes d’hydrogène liés à un oxygène sont écrits.', answer: true, explanation: 'Seuls les H liés aux C sont omis : on écrit –OH.' },
        { text: 'Le pentan-4-ol est un nom correct.', answer: false, explanation: 'On numérote dans l’autre sens : pentan-2-ol.' },
        { text: 'Un spectre IR sans bande vers 1700 cm⁻¹ ne peut pas être celui d’une cétone.', answer: true, explanation: 'Toute cétone possède une liaison C=O.' },
        { text: 'Un rendement de 115 % prouve une synthèse excellente.', answer: false, explanation: 'Impossible : le produit est sans doute humide ou impur.' },
        { text: 'L’éthanol et le méthoxyméthane sont isomères.', answer: true, explanation: 'Même formule brute C₂H₆O.' },
      ],
    },
    {
      type: 'reveal',
      title: 'Défi : un spectre sans bande O–H ni C=O',
      content: [
        { type: 'p', text: 'Une espèce de formule C₄H₁₀O présente un spectre IR sans bande O–H (ni vers 3300, ni vers 3600 cm⁻¹) et sans bande C=O. Ce ne peut être ni un alcool ni un composé carbonylé : l’atome O est donc lié à deux C (C–O–C). C’est un éther, par exemple l’éthoxyéthane CH₃–CH₂–O–CH₂–CH₃ (l’« éther » des anciens anesthésistes) — famille hors programme, mais le raisonnement est au programme !' },
      ],
    },
  ],
}

export default chapter
