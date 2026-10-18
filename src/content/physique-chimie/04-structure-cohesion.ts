import type { Chapter } from '../types'

/* ------------------------------------------------------------------ */
/*  Petits outils de dessin SVG (schémas de Lewis, molécules)          */
/* ------------------------------------------------------------------ */

const FONT = 'font-family="Geist, sans-serif"'
const BLUE = 'hsl(217 91% 60%)'
const RED = 'hsl(0 84% 60%)'
const GREEN = 'hsl(142 71% 45%)'
const ORANGE = 'hsl(25 95% 53%)'
const VIOLET = 'hsl(263 70% 60%)'

const f1 = (v: number) => v.toFixed(1)

/** Symbole d'atome centré en (x, y). */
function at(x: number, y: number, s: string, fill = 'currentColor', size = 16): string {
  return `<text x="${f1(x)}" y="${f1(y)}" text-anchor="middle" dominant-baseline="central" font-size="${size}" font-weight="600" fill="${fill}" ${FONT}>${s}</text>`
}

/** Petit texte (étiquette, charge partielle…). */
function tx(x: number, y: number, s: string, size = 12, fill = 'currentColor', anchor = 'middle', weight = '400'): string {
  return `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${anchor}" dominant-baseline="central" font-size="${size}" font-weight="${weight}" fill="${fill}" ${FONT}>${s}</text>`
}

/** Liaison simple, double ou triple entre deux atomes (traits raccourcis aux extrémités). */
function bd(x1: number, y1: number, x2: number, y2: number, order = 1, g1 = 10, g2 = g1, color = 'currentColor'): string {
  const dx = x2 - x1
  const dy = y2 - y1
  const L = Math.hypot(dx, dy)
  const ux = dx / L
  const uy = dy / L
  const nx = -uy
  const ny = ux
  const ax = x1 + ux * g1
  const ay = y1 + uy * g1
  const bx = x2 - ux * g2
  const by = y2 - uy * g2
  const offs = order === 1 ? [0] : order === 2 ? [-2.6, 2.6] : [-4.2, 0, 4.2]
  return offs
    .map(
      (o) =>
        `<line x1="${f1(ax + nx * o)}" y1="${f1(ay + ny * o)}" x2="${f1(bx + nx * o)}" y2="${f1(by + ny * o)}" stroke="${color}" stroke-width="1.6"/>`,
    )
    .join('')
}

/** Doublet non liant : petit trait placé autour de l'atome, dans la direction deg (0° = droite, 90° = haut). */
function lp(x: number, y: number, deg: number, r = 12, color = 'currentColor'): string {
  const t = (deg * Math.PI) / 180
  const cx = x + r * Math.cos(t)
  const cy = y - r * Math.sin(t)
  const px = Math.sin(t)
  const py = Math.cos(t)
  return `<line x1="${f1(cx - 5.5 * px)}" y1="${f1(cy - 5.5 * py)}" x2="${f1(cx + 5.5 * px)}" y2="${f1(cy + 5.5 * py)}" stroke="${color}" stroke-width="1.8"/>`
}

/** Lacune électronique : petit rectangle vide. */
function gap(x: number, y: number, deg: number, r = 14): string {
  const t = (deg * Math.PI) / 180
  const cx = x + r * Math.cos(t)
  const cy = y - r * Math.sin(t)
  return `<rect x="${f1(cx - 4)}" y="${f1(cy - 6)}" width="8" height="12" fill="none" stroke="${ORANGE}" stroke-width="1.4"/>`
}

/** Liaison en coin plein (vers l'avant, représentation de Cram). */
function wedge(x1: number, y1: number, x2: number, y2: number, g1 = 10, g2 = 10): string {
  const dx = x2 - x1
  const dy = y2 - y1
  const L = Math.hypot(dx, dy)
  const ux = dx / L
  const uy = dy / L
  const ax = x1 + ux * g1
  const ay = y1 + uy * g1
  const bx = x2 - ux * g2
  const by = y2 - uy * g2
  const nx = -uy * 4
  const ny = ux * 4
  return `<polygon points="${f1(ax)},${f1(ay)} ${f1(bx + nx)},${f1(by + ny)} ${f1(bx - nx)},${f1(by - ny)}" fill="currentColor"/>`
}

/** Liaison en coin hachuré (vers l'arrière, représentation de Cram). */
function hashed(x1: number, y1: number, x2: number, y2: number, g1 = 10, g2 = 10): string {
  const dx = x2 - x1
  const dy = y2 - y1
  const L = Math.hypot(dx, dy)
  const ux = dx / L
  const uy = dy / L
  const ax = x1 + ux * g1
  const ay = y1 + uy * g1
  const len = L - g1 - g2
  let s = ''
  for (let i = 1; i <= 6; i++) {
    const k = (i / 6) * len
    const w = 0.7 * i
    const cx = ax + ux * k
    const cy = ay + uy * k
    s += `<line x1="${f1(cx - uy * w)}" y1="${f1(cy + ux * w)}" x2="${f1(cx + uy * w)}" y2="${f1(cy - ux * w)}" stroke="currentColor" stroke-width="1.3"/>`
  }
  return s
}

/** Molécule d'eau stylisée : O (rouge) en (x, y), les deux H dans la direction deg. */
function water(x: number, y: number, deg: number): string {
  const t = (deg * Math.PI) / 180
  const a1 = t + (52 * Math.PI) / 180
  const a2 = t - (52 * Math.PI) / 180
  const h1x = x + 13 * Math.cos(a1)
  const h1y = y - 13 * Math.sin(a1)
  const h2x = x + 13 * Math.cos(a2)
  const h2y = y - 13 * Math.sin(a2)
  return (
    `<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(h1x)}" y2="${f1(h1y)}" stroke="currentColor" stroke-width="1.2"/>` +
    `<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(h2x)}" y2="${f1(h2y)}" stroke="currentColor" stroke-width="1.2"/>` +
    `<circle cx="${f1(x)}" cy="${f1(y)}" r="6.5" fill="${RED}"/>` +
    `<circle cx="${f1(h1x)}" cy="${f1(h1y)}" r="4" class="svg-card" stroke="currentColor" stroke-width="1"/>` +
    `<circle cx="${f1(h2x)}" cy="${f1(h2y)}" r="4" class="svg-card" stroke="currentColor" stroke-width="1"/>`
  )
}

/* ------------------------------------------------------------------ */
/*  Schémas                                                            */
/* ------------------------------------------------------------------ */

function lewisPanel(): string {
  const W = 130
  const H = 112
  const cells: { label: string; draw: (cx: number, cy: number) => string }[] = [
    { label: 'H₂', draw: (cx, cy) => at(cx - 16, cy, 'H') + at(cx + 16, cy, 'H') + bd(cx - 16, cy, cx + 16, cy, 1, 8) },
    {
      label: 'O₂',
      draw: (cx, cy) =>
        at(cx - 17, cy, 'O') + at(cx + 17, cy, 'O') + bd(cx - 17, cy, cx + 17, cy, 2, 9) +
        lp(cx - 17, cy, 135) + lp(cx - 17, cy, 225) + lp(cx + 17, cy, 45) + lp(cx + 17, cy, -45),
    },
    {
      label: 'N₂',
      draw: (cx, cy) =>
        at(cx - 17, cy, 'N') + at(cx + 17, cy, 'N') + bd(cx - 17, cy, cx + 17, cy, 3, 9) + lp(cx - 17, cy, 180) + lp(cx + 17, cy, 0),
    },
    {
      label: 'HCl',
      draw: (cx, cy) =>
        at(cx - 22, cy, 'H') + at(cx + 14, cy, 'Cl') + bd(cx - 22, cy, cx + 14, cy, 1, 8, 13) +
        lp(cx + 14, cy, 90, 13) + lp(cx + 14, cy, 270, 13) + lp(cx + 14, cy, 0, 16),
    },
    {
      label: 'H₂O',
      draw: (cx, cy) =>
        at(cx, cy - 8, 'O') + at(cx - 26, cy + 16, 'H') + at(cx + 26, cy + 16, 'H') +
        bd(cx, cy - 8, cx - 26, cy + 16, 1, 9, 8) + bd(cx, cy - 8, cx + 26, cy + 16, 1, 9, 8) +
        lp(cx, cy - 8, 135) + lp(cx, cy - 8, 45),
    },
    {
      label: 'NH₃',
      draw: (cx, cy) =>
        at(cx, cy, 'N') + at(cx - 30, cy, 'H') + at(cx + 30, cy, 'H') + at(cx, cy + 30, 'H') +
        bd(cx, cy, cx - 30, cy, 1, 9, 8) + bd(cx, cy, cx + 30, cy, 1, 9, 8) + bd(cx, cy, cx, cy + 30, 1, 9, 8) + lp(cx, cy, 90),
    },
    {
      label: 'CH₄',
      draw: (cx, cy) =>
        at(cx, cy, 'C') + at(cx - 30, cy, 'H') + at(cx + 30, cy, 'H') + at(cx, cy + 29, 'H') + at(cx, cy - 29, 'H') +
        bd(cx, cy, cx - 30, cy, 1, 9, 8) + bd(cx, cy, cx + 30, cy, 1, 9, 8) + bd(cx, cy, cx, cy + 29, 1, 9, 8) + bd(cx, cy, cx, cy - 29, 1, 9, 8),
    },
    {
      label: 'CO₂',
      draw: (cx, cy) =>
        at(cx - 34, cy, 'O') + at(cx, cy, 'C') + at(cx + 34, cy, 'O') + bd(cx - 34, cy, cx, cy, 2, 9) + bd(cx, cy, cx + 34, cy, 2, 9) +
        lp(cx - 34, cy, 135) + lp(cx - 34, cy, 225) + lp(cx + 34, cy, 45) + lp(cx + 34, cy, -45),
    },
    { label: 'H⁺ (lacune)', draw: (cx, cy) => at(cx - 6, cy, 'H') + tx(cx + 4, cy - 12, '+', 13) + gap(cx - 6, cy, 0, 17) },
    {
      label: 'H₃O⁺',
      draw: (cx, cy) =>
        at(cx, cy, 'O') + at(cx - 30, cy, 'H') + at(cx + 30, cy, 'H') + at(cx, cy + 30, 'H') +
        bd(cx, cy, cx - 30, cy, 1, 9, 8) + bd(cx, cy, cx + 30, cy, 1, 9, 8) + bd(cx, cy, cx, cy + 30, 1, 9, 8) + lp(cx, cy, 90) +
        tx(cx + 14, cy - 15, '+', 13, RED, 'middle', '700'),
    },
    { label: 'Na⁺', draw: (cx, cy) => at(cx, cy, 'Na') + tx(cx + 17, cy - 12, '+', 13, RED, 'middle', '700') },
    {
      label: 'NH₄⁺',
      draw: (cx, cy) =>
        at(cx, cy, 'N') + at(cx - 30, cy, 'H') + at(cx + 30, cy, 'H') + at(cx, cy + 29, 'H') + at(cx, cy - 29, 'H') +
        bd(cx, cy, cx - 30, cy, 1, 9, 8) + bd(cx, cy, cx + 30, cy, 1, 9, 8) + bd(cx, cy, cx, cy + 29, 1, 9, 8) + bd(cx, cy, cx, cy - 29, 1, 9, 8) +
        tx(cx + 15, cy - 15, '+', 13, RED, 'middle', '700'),
    },
    {
      label: 'Cl⁻',
      draw: (cx, cy) =>
        at(cx, cy, 'Cl') + lp(cx, cy, 0, 16) + lp(cx, cy, 180, 16) + lp(cx, cy, 90, 13) + lp(cx, cy, 270, 13) +
        tx(cx + 22, cy - 18, '−', 14, BLUE, 'middle', '700'),
    },
    {
      label: 'HO⁻',
      draw: (cx, cy) =>
        at(cx - 18, cy, 'H') + at(cx + 14, cy, 'O') + bd(cx - 18, cy, cx + 14, cy, 1, 8, 9) +
        lp(cx + 14, cy, 90) + lp(cx + 14, cy, 270) + lp(cx + 14, cy, 0) + tx(cx + 30, cy - 16, '−', 14, BLUE, 'middle', '700'),
    },
    {
      label: 'O²⁻',
      draw: (cx, cy) =>
        at(cx, cy, 'O') + lp(cx, cy, 0) + lp(cx, cy, 180) + lp(cx, cy, 90) + lp(cx, cy, 270) + tx(cx + 22, cy - 17, '2−', 12, BLUE, 'middle', '700'),
    },
  ]
  let s = `<svg viewBox="0 0 ${5 * W} ${3 * H}" xmlns="http://www.w3.org/2000/svg">`
  cells.forEach((c, i) => {
    const col = i % 5
    const row = Math.floor(i / 5)
    const x0 = col * W
    const y0 = row * H
    s += `<rect x="${x0 + 3}" y="${y0 + 3}" width="${W - 6}" height="${H - 6}" fill="none" class="svg-grid" stroke-width="1"/>`
    s += c.draw(x0 + W / 2, y0 + 44)
    s += tx(x0 + W / 2, y0 + H - 14, c.label, 12, 'currentColor', 'middle', '600')
  })
  s += '</svg>'
  return s
}

function geometryPanel(): string {
  let s = `<svg viewBox="0 0 660 230" xmlns="http://www.w3.org/2000/svg">`
  // CH4 tétraédrique
  {
    const cx = 80
    const cy = 100
    s += at(cx, cy, 'C')
    s += at(cx, cy - 40, 'H') + bd(cx, cy, cx, cy - 40, 1, 9, 8)
    s += at(cx - 38, cy + 20, 'H') + bd(cx, cy, cx - 38, cy + 20, 1, 9, 8)
    s += at(cx + 26, cy + 34, 'H') + wedge(cx, cy, cx + 26, cy + 34, 9, 9)
    s += at(cx + 42, cy + 4, 'H') + hashed(cx, cy, cx + 42, cy + 4, 9, 9)
    s += tx(cx, 168, 'CH₄ : tétraédrique', 12, 'currentColor', 'middle', '600')
    s += tx(cx, 186, '4 doublets liants', 11, 'currentColor')
    s += tx(cx, 202, 'angle HCH ≈ 109,5°', 11, BLUE)
  }
  // NH3 pyramidale
  {
    const cx = 245
    const cy = 100
    s += at(cx, cy, 'N') + lp(cx, cy, 90, 13)
    s += at(cx - 38, cy + 20, 'H') + bd(cx, cy, cx - 38, cy + 20, 1, 9, 8)
    s += at(cx + 26, cy + 34, 'H') + wedge(cx, cy, cx + 26, cy + 34, 9, 9)
    s += at(cx + 42, cy + 4, 'H') + hashed(cx, cy, cx + 42, cy + 4, 9, 9)
    s += tx(cx, 168, 'NH₃ : pyramidale', 12, 'currentColor', 'middle', '600')
    s += tx(cx, 186, '3 liants + 1 non liant', 11, 'currentColor')
    s += tx(cx, 202, 'angle HNH ≈ 107°', 11, BLUE)
  }
  // H2O coudée
  {
    const cx = 410
    const cy = 92
    s += at(cx, cy, 'O') + lp(cx, cy, 120, 13) + lp(cx, cy, 60, 13)
    s += at(cx - 32, cy + 30, 'H') + bd(cx, cy, cx - 32, cy + 30, 1, 9, 8)
    s += at(cx + 32, cy + 30, 'H') + bd(cx, cy, cx + 32, cy + 30, 1, 9, 8)
    s += `<path d="M ${cx - 13} ${cy + 12} A 18 18 0 0 0 ${cx + 13} ${cy + 12}" fill="none" stroke="${BLUE}" stroke-width="1.2"/>`
    s += tx(cx, 168, 'H₂O : coudée', 12, 'currentColor', 'middle', '600')
    s += tx(cx, 186, '2 liants + 2 non liants', 11, 'currentColor')
    s += tx(cx, 202, 'angle HOH ≈ 104,5°', 11, BLUE)
  }
  // CO2 linéaire
  {
    const cx = 575
    const cy = 100
    s += at(cx - 40, cy, 'O') + at(cx, cy, 'C') + at(cx + 40, cy, 'O')
    s += bd(cx - 40, cy, cx, cy, 2, 9) + bd(cx, cy, cx + 40, cy, 2, 9)
    s += lp(cx - 40, cy, 135) + lp(cx - 40, cy, 225) + lp(cx + 40, cy, 45) + lp(cx + 40, cy, -45)
    s += tx(cx, 168, 'CO₂ : linéaire', 12, 'currentColor', 'middle', '600')
    s += tx(cx, 186, '2 « directions » autour de C', 11, 'currentColor')
    s += tx(cx, 202, 'angle OCO = 180°', 11, BLUE)
  }
  s += tx(330, 222, 'Cram : trait plein = dans le plan ; coin plein = vers l’avant ; coin hachuré = vers l’arrière', 11, 'currentColor')
  s += '</svg>'
  return s
}

function polaritySvg(): string {
  let s = `<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">`
  // H2O polaire
  const cx = 160
  const cy = 80
  s += at(cx, cy, 'O') + lp(cx, cy, 120, 13) + lp(cx, cy, 60, 13)
  s += at(cx - 44, cy + 44, 'H') + bd(cx, cy, cx - 44, cy + 44, 1, 9, 8)
  s += at(cx + 44, cy + 44, 'H') + bd(cx, cy, cx + 44, cy + 44, 1, 9, 8)
  s += tx(cx + 18, cy - 20, '2δ⁻', 12, BLUE, 'start', '700')
  s += tx(cx - 60, cy + 58, 'δ⁺', 12, RED, 'middle', '700')
  s += tx(cx + 60, cy + 58, 'δ⁺', 12, RED, 'middle', '700')
  // barycentres
  s += `<circle cx="${cx}" cy="${cy + 44}" r="3.5" fill="${RED}"/>` + tx(cx, cy + 58, 'G⁺', 11, RED, 'middle', '700')
  s += `<circle cx="${cx}" cy="${cy}" r="3.5" fill="${BLUE}" opacity="0.9"/>`
  s += `<line x1="${cx - 70}" y1="${cy + 44}" x2="${cx + 70}" y2="${cy + 44}" class="svg-grid" stroke-dasharray="3 3"/>`
  s += tx(cx - 80, cy - 4, 'G⁻ (sur O)', 11, BLUE, 'end', '700')
  s += `<line x1="${cx - 78}" y1="${cy - 4}" x2="${cx - 8}" y2="${cy}" stroke="${BLUE}" stroke-width="0.8"/>`
  s += tx(cx, 186, 'H₂O : G⁺ ≠ G⁻ → molécule POLAIRE', 12, 'currentColor', 'middle', '700')
  // CO2 apolaire
  const dx = 470
  const dy = 100
  s += at(dx - 52, dy, 'O') + at(dx, dy, 'C') + at(dx + 52, dy, 'O')
  s += bd(dx - 52, dy, dx, dy, 2, 9) + bd(dx, dy, dx + 52, dy, 2, 9)
  s += lp(dx - 52, dy, 135) + lp(dx - 52, dy, 225) + lp(dx + 52, dy, 45) + lp(dx + 52, dy, -45)
  s += tx(dx - 52, dy - 28, 'δ⁻', 12, BLUE, 'middle', '700') + tx(dx + 52, dy - 28, 'δ⁻', 12, BLUE, 'middle', '700')
  s += tx(dx, dy - 28, '2δ⁺', 12, RED, 'middle', '700')
  s += tx(dx, dy + 30, 'G⁺ = G⁻ (sur C)', 11, VIOLET, 'middle', '700')
  s += tx(dx, 186, 'CO₂ : liaisons polarisées mais G⁺ = G⁻ → APOLAIRE', 12, 'currentColor', 'middle', '700')
  s += tx(320, 210, 'χ(O) = 3,44 > χ(C) = 2,55 > χ(H) = 2,20', 11, 'currentColor')
  s += '</svg>'
  return s
}

function hydrogenBondSvg(): string {
  let s = `<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg">`
  // molécule 1
  const m = [
    { O: [90, 110], H1: [62, 136], H2: [128, 116] },
    { O: [220, 100], H1: [216, 62], H2: [258, 126] },
    { O: [350, 120], H1: [330, 154], H2: [388, 108] },
    { O: [480, 100], H1: [470, 62], H2: [508, 128] },
  ]
  for (const w of m) {
    s += at(w.O[0], w.O[1], 'O', RED, 15)
    s += at(w.H1[0], w.H1[1], 'H', 'currentColor', 14) + bd(w.O[0], w.O[1], w.H1[0], w.H1[1], 1, 9, 7)
    s += at(w.H2[0], w.H2[1], 'H', 'currentColor', 14) + bd(w.O[0], w.O[1], w.H2[0], w.H2[1], 1, 9, 7)
  }
  const hb = [
    [128, 116, 220, 100],
    [258, 126, 350, 120],
    [388, 108, 480, 100],
  ]
  for (const [x1, y1, x2, y2] of hb) {
    s += bd(x1, y1, x2, y2, 1, 8, 10, GREEN).replace('stroke-width="1.6"', 'stroke-width="2" stroke-dasharray="3 3"')
  }
  s += tx(174, 90, 'pont H', 11, GREEN, 'middle', '700')
  s += tx(304, 104, 'pont H', 11, GREEN, 'middle', '700')
  s += tx(434, 88, 'pont H', 11, GREEN, 'middle', '700')
  s += tx(280, 186, 'O–H ··· O : un H lié à O (ou N, F) interagit avec un doublet non liant d’un O voisin', 12, 'currentColor')
  s += tx(280, 206, 'liaison covalente O–H ≈ 460 kJ/mol  ≫  pont hydrogène ≈ 20 kJ/mol', 11, 'currentColor')
  s += '</svg>'
  return s
}

function naclSvg(): string {
  let s = `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg">`
  const x0 = 50
  const y0 = 30
  const d = 38
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      const x = x0 + i * d
      const y = y0 + j * d
      if (i < 5) s += `<line x1="${x}" y1="${y}" x2="${x + d}" y2="${y}" class="svg-grid" stroke-width="1"/>`
      if (j < 5) s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + d}" class="svg-grid" stroke-width="1"/>`
    }
  }
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      const x = x0 + i * d
      const y = y0 + j * d
      if ((i + j) % 2 === 0) {
        s += `<circle cx="${x}" cy="${y}" r="14" fill="${GREEN}" opacity="0.85"/>` + tx(x, y, 'Cl⁻', 10, 'currentColor', 'middle', '700')
      } else {
        s += `<circle cx="${x}" cy="${y}" r="8" fill="${VIOLET}"/>` + tx(x, y, '+', 11, 'white', 'middle', '700')
      }
    }
  }
  const lx = 300
  s += `<circle cx="${lx + 12}" cy="50" r="14" fill="${GREEN}" opacity="0.85"/>` + tx(lx + 36, 50, 'ion chlorure Cl⁻ (gros)', 12, 'currentColor', 'start')
  s += `<circle cx="${lx + 12}" cy="86" r="8" fill="${VIOLET}"/>` + tx(lx + 36, 86, 'ion sodium Na⁺ (petit)', 12, 'currentColor', 'start')
  s += tx(lx, 126, 'Chaque ion est entouré d’ions de signe opposé :', 12, 'currentColor', 'start')
  s += tx(lx, 144, 'attractions électrostatiques (Coulomb) fortes', 12, 'currentColor', 'start', '700')
  s += tx(lx, 162, '→ solide dur, T(fusion) = 801 °C', 12, 'currentColor', 'start')
  s += tx(lx, 190, 'Électriquement neutre : autant de Na⁺', 12, 'currentColor', 'start')
  s += tx(lx, 208, 'que de Cl⁻ → formule statistique NaCl', 12, 'currentColor', 'start')
  s += tx(145, 242, 'Coupe d’un cristal de chlorure de sodium (modèle)', 11, 'currentColor')
  s += '</svg>'
  return s
}

function solvationSvg(): string {
  let s = `<svg viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg">`
  // Cation : O tournés vers l'ion => H vers l'extérieur
  const c = [140, 110]
  s += `<circle cx="${c[0]}" cy="${c[1]}" r="12" fill="${VIOLET}"/>` + tx(c[0], c[1], 'Na⁺', 10, 'white', 'middle', '700')
  for (let k = 0; k < 6; k++) {
    const a = (k * 60 * Math.PI) / 180
    const x = c[0] + 36 * Math.cos(a)
    const y = c[1] - 36 * Math.sin(a)
    s += water(x, y, k * 60)
  }
  // Anion : un H tourné vers l'ion
  const an = [400, 110]
  s += `<circle cx="${an[0]}" cy="${an[1]}" r="15" fill="${GREEN}" opacity="0.85"/>` + tx(an[0], an[1], 'Cl⁻', 10, 'currentColor', 'middle', '700')
  for (let k = 0; k < 6; k++) {
    const a = (k * 60 * Math.PI) / 180
    const x = an[0] + 46 * Math.cos(a)
    const y = an[1] - 46 * Math.sin(a)
    // l'un des H pointe vers l'ion : on oriente la bissectrice à 52° de la direction de l'ion
    s += water(x, y, k * 60 + 180 + 52)
  }
  s += tx(140, 186, 'Cation hydraté : O (δ⁻) vers l’ion', 12, 'currentColor', 'middle', '600')
  s += tx(400, 186, 'Anion hydraté : H (δ⁺) vers l’ion', 12, 'currentColor', 'middle', '600')
  s += tx(280, 214, 'Solvatation (hydratation) : les molécules d’eau polaires entourent chaque ion', 11, 'currentColor')
  s += '</svg>'
  return s
}

function decantationSvg(): string {
  const body = 'M 125 52 L 125 72 C 68 104, 66 196, 141 252 L 145 300 L 155 300 L 159 252 C 234 196, 232 104, 175 72 L 175 52 Z'
  let s = `<svg viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg">`
  s += `<defs><clipPath id="pc04-ampoule"><path d="${body}"/></clipPath></defs>`
  // liquides
  s += `<rect x="60" y="112" width="180" height="62" fill="${VIOLET}" opacity="0.45" clip-path="url(#pc04-ampoule)"/>`
  s += `<rect x="60" y="174" width="180" height="130" fill="${BLUE}" opacity="0.22" clip-path="url(#pc04-ampoule)"/>`
  s += `<line x1="80" y1="174" x2="220" y2="174" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" clip-path="url(#pc04-ampoule)"/>`
  s += `<line x1="80" y1="112" x2="220" y2="112" stroke="currentColor" stroke-width="0.8" clip-path="url(#pc04-ampoule)"/>`
  s += `<path d="${body}" fill="none" stroke="currentColor" stroke-width="1.8"/>`
  // bouchon
  s += `<rect x="128" y="36" width="44" height="18" fill="none" stroke="currentColor" stroke-width="1.6"/>`
  // robinet
  s += `<rect x="128" y="302" width="44" height="10" fill="none" stroke="currentColor" stroke-width="1.6"/>`
  s += `<rect x="146" y="300" width="8" height="14" class="svg-muted" fill="currentColor" opacity="0.4"/>`
  s += `<line x1="145" y1="314" x2="146" y2="346" stroke="currentColor" stroke-width="1.6"/><line x1="155" y1="314" x2="154" y2="346" stroke="currentColor" stroke-width="1.6"/>`
  // bécher
  s += `<path d="M 105 352 L 105 392 L 195 392 L 195 352" fill="none" stroke="currentColor" stroke-width="1.6"/>`
  s += `<rect x="106" y="372" width="88" height="19" fill="${BLUE}" opacity="0.22"/>`
  // support
  s += `<line x1="40" y1="20" x2="40" y2="396" stroke="currentColor" stroke-width="2"/><line x1="40" y1="160" x2="84" y2="160" stroke="currentColor" stroke-width="2"/>`
  s += `<circle cx="150" cy="168" r="0" />`
  // légendes
  const L = (y: number, x: number, txt: string, txt2?: string) => {
    let r = `<line x1="${x}" y1="${y}" x2="290" y2="${y}" stroke="currentColor" stroke-width="0.8"/>` + tx(296, y, txt, 12, 'currentColor', 'start', '600')
    if (txt2) r += tx(296, y + 16, txt2, 11, 'currentColor', 'start')
    return r
  }
  s += L(44, 172, 'bouchon (on dégaze robinet en haut)')
  s += L(142, 214, 'phase organique (moins dense, ici en haut)', 'ex. cyclohexane d = 0,78 + diiode (violet)')
  s += L(220, 212, 'phase aqueuse (d = 1,00)', 'solution appauvrie en soluté')
  s += L(307, 172, 'robinet')
  s += L(380, 195, 'on recueille la phase inférieure')
  s += tx(296, 120, 'La phase la plus dense est en bas.', 11, ORANGE, 'start', '700')
  s += '</svg>'
  return s
}

function soapSvg(): string {
  let s = `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">`
  // ion carboxylate isolé
  let zz = 'M 30 60'
  for (let i = 1; i <= 9; i++) zz += ` L ${30 + i * 18} ${i % 2 ? 48 : 60}`
  s += `<path d="${zz}" fill="none" stroke="${ORANGE}" stroke-width="2"/>`
  s += `<circle cx="${30 + 9 * 18 + 14}" cy="48" r="12" fill="${BLUE}" opacity="0.85"/>` + tx(30 + 9 * 18 + 14, 48, 'COO⁻', 8, 'white', 'middle', '700')
  s += tx(100, 86, 'queue lipophile (hydrophobe)', 11, ORANGE, 'middle', '700')
  s += tx(100, 102, 'longue chaîne carbonée', 11, 'currentColor')
  s += tx(206, 86, 'tête hydrophile', 11, BLUE, 'middle', '700')
  s += tx(206, 102, '(chargée)', 11, 'currentColor')
  s += tx(120, 130, 'ion carboxylate R–COO⁻ (avec Na⁺ : savon)', 12, 'currentColor', 'middle', '600')
  // micelle
  const cx = 440
  const cy = 130
  s += `<circle cx="${cx}" cy="${cy}" r="38" fill="${ORANGE}" opacity="0.18"/>`
  s += tx(cx, cy, 'graisse', 11, ORANGE, 'middle', '700')
  for (let k = 0; k < 14; k++) {
    const a = (k * 360) / 14
    const t = (a * Math.PI) / 180
    const hx = cx + 84 * Math.cos(t)
    const hy = cy - 84 * Math.sin(t)
    // queue en zigzag vers le centre
    let p = `M ${f1(hx - 10 * Math.cos(t))} ${f1(hy + 10 * Math.sin(t))}`
    for (let i = 1; i <= 4; i++) {
      const rr = 74 - i * 9
      const off = i % 2 ? 4 : -4
      const px = cx + rr * Math.cos(t) + off * Math.sin(t)
      const py = cy - rr * Math.sin(t) + off * Math.cos(t)
      p += ` L ${f1(px)} ${f1(py)}`
    }
    s += `<path d="${p}" fill="none" stroke="${ORANGE}" stroke-width="1.6"/>`
    s += `<circle cx="${f1(hx)}" cy="${f1(hy)}" r="7" fill="${BLUE}" opacity="0.85"/>`
  }
  s += tx(cx, 236, 'Micelle dans l’eau : têtes vers l’eau,', 12, 'currentColor', 'middle', '600')
  s += tx(cx, 252, 'queues piégeant la graisse au centre', 12, 'currentColor', 'middle', '600')
  s += `<rect x="20" y="160" width="250" height="80" fill="none" class="svg-grid"/>`
  s += tx(30, 176, 'Ex. : stéarate de sodium', 12, 'currentColor', 'start', '700')
  s += tx(30, 196, 'CH₃–(CH₂)₁₆–COO⁻ + Na⁺', 12, 'currentColor', 'start')
  s += tx(30, 216, 'Caractère AMPHIPHILE : une partie', 11, 'currentColor', 'start')
  s += tx(30, 232, 'hydrophile + une partie lipophile', 11, 'currentColor', 'start')
  s += '</svg>'
  return s
}

function interactionsScaleSvg(): string {
  let s = `<svg viewBox="0 0 620 170" xmlns="http://www.w3.org/2000/svg">`
  s += `<line x1="40" y1="90" x2="590" y2="90" stroke="currentColor" stroke-width="1.6"/>`
  s += `<polygon points="590,85 600,90 590,95" fill="currentColor"/>`
  s += tx(600, 112, 'énergie d’interaction (kJ/mol, échelle log)', 11, 'currentColor', 'end')
  const items = [
    { x: 90, label: 'Van der Waals', val: '≈ 1 à 10', col: VIOLET },
    { x: 230, label: 'pont hydrogène', val: '≈ 10 à 40', col: GREEN },
    { x: 390, label: 'interaction ionique', val: '≈ 100 à 1000', col: ORANGE },
    { x: 530, label: 'liaison covalente', val: '≈ 150 à 950', col: BLUE },
  ]
  for (const it of items) {
    s += `<rect x="${it.x - 55}" y="44" width="110" height="30" fill="${it.col}" opacity="0.18" stroke="${it.col}"/>`
    s += tx(it.x, 59, it.label, 12, 'currentColor', 'middle', '700')
    s += `<line x1="${it.x}" y1="74" x2="${it.x}" y2="90" stroke="${it.col}" stroke-width="1.4"/>`
    s += tx(it.x, 136, it.val, 12, it.col, 'middle', '700')
  }
  s += tx(310, 24, 'Interactions INTERmoléculaires (faibles)  ←→  liaisons au sein des entités et cristaux ioniques (fortes)', 11, 'currentColor')
  s += tx(310, 160, 'Ordres de grandeur indicatifs : plus l’interaction est forte, plus la température de changement d’état est élevée.', 11, 'currentColor')
  s += '</svg>'
  return s
}

/* ------------------------------------------------------------------ */
/*  Chapitre                                                           */
/* ------------------------------------------------------------------ */

const r = String.raw

const chapter: Chapter = {
  id: 'structure-cohesion',
  subject: 'physique-chimie',
  order: 4,
  title: 'De la structure des entités à la cohésion et à la solubilité',
  theme: 'Constitution et transformations de la matière',
  summary:
    'Schémas de Lewis, géométrie et polarité des entités ; cohésion des solides ioniques et moléculaires ; dissolution, solubilité, extraction liquide-liquide et espèces amphiphiles.',
  duration: '3 à 4 semaines',
  objectives: [
    'Établir le schéma de Lewis de molécules et d’ions mono ou polyatomiques à partir du tableau périodique (O₂, H₂, N₂, H₂O, CO₂, NH₃, CH₄, HCl, H⁺, H₃O⁺, Na⁺, NH₄⁺, Cl⁻, HO⁻, O²⁻).',
    'Interpréter la géométrie d’une entité à partir de son schéma de Lewis ; utiliser des modèles moléculaires.',
    'Identifier une lacune électronique dans un schéma de Lewis.',
    'Déterminer le caractère polarisé d’une liaison à partir de l’électronégativité des atomes.',
    'Déterminer le caractère polaire ou apolaire d’une entité à partir de sa géométrie et de la polarité de ses liaisons.',
    'Expliquer la cohésion des solides ioniques et moléculaires (interactions ioniques, de Van der Waals, pont hydrogène).',
    'Expliquer la capacité de l’eau à dissocier une espèce ionique et à solvater les ions ; écrire l’équation de dissolution avec (s) et (aq) ; calculer la concentration des ions.',
    'Expliquer ou prévoir la solubilité d’une espèce dans un solvant et la miscibilité de deux liquides.',
    'Interpréter et mettre en œuvre un protocole d’extraction liquide-liquide.',
    'Expliquer le caractère amphiphile et les propriétés lavantes d’un savon ; citer des applications des tensioactifs.',
  ],
  keywords: [
    'schéma de Lewis', 'doublet liant', 'doublet non liant', 'lacune électronique', 'règle de l’octet', 'géométrie', 'VSEPR',
    'électronégativité', 'liaison polarisée', 'molécule polaire', 'Van der Waals', 'pont hydrogène', 'solide ionique',
    'dissolution', 'solvatation', 'solubilité', 'miscibilité', 'extraction liquide-liquide', 'ampoule à décanter', 'amphiphile', 'savon', 'micelle',
  ],

  /* ================================================================ */
  fiche: [
    { type: 'h2', text: '1. Schéma de Lewis' },
    {
      type: 'list',
      items: [
        'Électrons de valence = électrons de la couche externe ; leur nombre se lit dans le tableau périodique (H : 1 ; C : 4 ; N : 5 ; O : 6 ; F, Cl : 7).',
        '**Règle du duet** (H) et **de l’octet** (C, N, O, halogènes) : en se liant, un atome tend à s’entourer de 2 (H) ou 8 électrons.',
        'Nombre de doublets = (somme des électrons de valence − charge de l’ion) / 2.',
        '**Doublet liant** = trait entre deux atomes ; **doublet non liant** = trait autour d’un seul atome.',
        '**Lacune électronique** (rectangle vide) : il manque un doublet à l’atome pour respecter l’octet/duet (H⁺, BH₃, AlCl₃).',
      ],
    },
    {
      type: 'table',
      headers: ['Atome', 'H', 'C', 'N', 'O', 'Cl'],
      rows: [
        ['Électrons de valence', '1', '4', '5', '6', '7'],
        ['Doublets liants (molécule neutre)', '1', '4', '3', '2', '1'],
        ['Doublets non liants', '0', '0', '1', '2', '3'],
      ],
      caption: 'Valences usuelles à connaître',
    },
    { type: 'h2', text: '2. Géométrie (répulsion des doublets)' },
    {
      type: 'table',
      headers: ['Autour de l’atome central', 'Disposition des doublets', 'Géométrie de la molécule', 'Exemples'],
      rows: [
        ['4 liants', 'tétraèdre', '**tétraédrique** (109,5°)', 'CH₄, NH₄⁺'],
        ['3 liants + 1 non liant', 'tétraèdre', '**pyramidale** (≈ 107°)', 'NH₃, H₃O⁺'],
        ['2 liants + 2 non liants', 'tétraèdre', '**coudée** (≈ 104,5°)', 'H₂O'],
        ['3 « directions » (ex. une double liaison + 2 simples)', 'triangle plan', '**plane trigonale** (120°)', 'CH₂O, C₂H₄, BH₃'],
        ['2 « directions »', 'linéaire', '**linéaire** (180°)', 'CO₂, HCN'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'À retenir',
      content: [{ type: 'p', text: 'Les doublets (liants ou non) se repoussent et s’écartent au maximum. Une liaison multiple compte pour **une seule direction**.' }],
    },
    { type: 'h2', text: '3. Électronégativité et polarité' },
    {
      type: 'list',
      items: [
        '**Électronégativité χ** : aptitude d’un atome à attirer les électrons d’une liaison. Elle augmente de gauche à droite et de bas en haut du tableau (F le plus électronégatif).',
        'Liaison A–B **polarisée** si $\\Delta\\chi \\geq 0{,}4$ (environ) : charge partielle $\\delta^-$ sur l’atome le plus électronégatif, $\\delta^+$ sur l’autre. C–H est considérée non polarisée ($\\Delta\\chi = 0{,}35$).',
        'Molécule **polaire** : barycentre des charges partielles positives $G^+$ ≠ barycentre des négatives $G^-$ (H₂O, NH₃, HCl). **Apolaire** si $G^+ = G^-$ (CO₂, CH₄, CCl₄) ou si aucune liaison n’est polarisée.',
      ],
    },
    { type: 'h2', text: '4. Cohésion des solides' },
    {
      type: 'table',
      headers: ['Solide', 'Entités', 'Interactions responsables', 'Exemple'],
      rows: [
        ['ionique', 'cations + anions', 'électrostatiques (fortes)', 'NaCl : $T_f = 801$ °C'],
        ['moléculaire', 'molécules', 'Van der Waals (+ ponts H si H lié à N, O, F)', 'glace, diiode, saccharose'],
      ],
    },
    {
      type: 'list',
      items: [
        '**Van der Waals** : interactions électrostatiques entre dipôles (permanents ou induits) ; plus fortes si molécules plus grosses et plus polaires.',
        '**Pont hydrogène** : H lié à un atome très électronégatif (N, O, F) attiré par un doublet non liant de N, O ou F d’une molécule voisine.',
        'Ordre de force : Van der Waals < pont H < interaction ionique ; plus la cohésion est forte, plus les températures de fusion/ébullition sont élevées.',
      ],
    },
    { type: 'h2', text: '5. Dissolution et solubilité' },
    {
      type: 'steps',
      items: [
        { title: 'Dissociation', text: 'L’eau, polaire, affaiblit les interactions entre ions et les sépare.' },
        { title: 'Solvatation (hydratation)', text: 'Chaque ion s’entoure de molécules d’eau orientées (O vers les cations, H vers les anions).' },
        { title: 'Dispersion', text: 'Les ions solvatés se répartissent dans toute la solution.' },
      ],
    },
    {
      type: 'math',
      tex: r`\text{Ex. : } \mathrm{Na_2SO_4(s)} \longrightarrow 2\,\mathrm{Na^+(aq)} + \mathrm{SO_4^{2-}(aq)} \qquad [\mathrm{Na^+}] = 2c,\ [\mathrm{SO_4^{2-}}] = c`,
    },
    {
      type: 'list',
      items: [
        '**Solubilité** $s$ (g·L⁻¹ ou mol·L⁻¹) : masse (ou quantité) maximale de soluté dissoute dans 1 L de solution saturée, à température donnée.',
        '« Qui se ressemble s’assemble » : espèces ioniques et polaires → solvants polaires (eau) ; espèces apolaires → solvants apolaires (cyclohexane). Les ponts H soluté–solvant favorisent la dissolution.',
        'Deux liquides sont **miscibles** s’ils forment un mélange homogène (eau/éthanol), **non miscibles** sinon (eau/cyclohexane).',
      ],
    },
    { type: 'h2', text: '6. Extraction liquide-liquide et amphiphiles' },
    {
      type: 'list',
      items: [
        'Solvant extracteur : **non miscible** avec le solvant initial et dans lequel l’espèce à extraire est **beaucoup plus soluble** ; si possible peu dangereux.',
        'Dans l’ampoule à décanter, la phase la plus **dense** est en **bas**.',
        '**Amphiphile** = une partie hydrophile (tête polaire/ionique, ex. COO⁻) + une partie lipophile (longue chaîne carbonée). Savons = carboxylates de sodium ou potassium ; ils forment des **micelles** qui piègent les graisses.',
      ],
    },
  ],

  /* ================================================================ */
  cours: [
    { type: 'h2', text: 'I. Le schéma de Lewis d’une entité' },
    {
      type: 'p',
      text: 'En classe de Seconde, on a vu que les atomes se lient pour acquérir une structure électronique plus stable, celle du gaz noble le plus proche. Le **schéma de Lewis** est un modèle qui représente la répartition des **électrons de valence** (ceux de la couche externe) dans une molécule ou un ion.',
    },
    { type: 'h3', text: '1. Électrons de valence et tableau périodique' },
    {
      type: 'p',
      text: 'Le nombre d’électrons de valence d’un atome se lit dans sa colonne du tableau périodique (pour les trois premières lignes, en ne comptant pas le bloc d du milieu) : colonne 1 → 1 électron, colonne 14 → 4, colonne 15 → 5, colonne 16 → 6, colonne 17 → 7, colonne 18 → 8 (sauf He : 2).',
    },
    {
      type: 'table',
      headers: ['Élément', 'Z', 'Configuration électronique', 'Électrons de valence', 'Gaz noble visé'],
      rows: [
        ['H', '1', '1s¹', '1', 'He (duet)'],
        ['C', '6', '1s² 2s² 2p²', '4', 'Ne (octet)'],
        ['N', '7', '1s² 2s² 2p³', '5', 'Ne'],
        ['O', '8', '1s² 2s² 2p⁴', '6', 'Ne'],
        ['F', '9', '1s² 2s² 2p⁵', '7', 'Ne'],
        ['Na', '11', '1s² 2s² 2p⁶ 3s¹', '1', 'Ne (en perdant 1 e⁻)'],
        ['Cl', '17', '1s² 2s² 2p⁶ 3s² 3p⁵', '7', 'Ar'],
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Règles du duet et de l’octet',
      content: [
        {
          type: 'p',
          text: 'Dans une molécule ou un ion stable, l’atome d’hydrogène est entouré de **2 électrons** (un doublet : règle du **duet**) ; les atomes C, N, O et les halogènes sont généralement entourés de **8 électrons** (quatre doublets : règle de l’**octet**).',
        },
      ],
    },
    { type: 'h3', text: '2. Doublets liants et non liants' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Liaison covalente', value: 'mise en commun d’un doublet d’électrons (un électron venant de chaque atome) entre deux atomes.' },
        { key: 'Doublet liant', value: 'doublet partagé entre deux atomes ; représenté par un trait entre les symboles.' },
        { key: 'Doublet non liant', value: 'doublet appartenant à un seul atome ; représenté par un trait placé à côté du symbole.' },
        { key: 'Liaison multiple', value: 'double (2 doublets liants, ex. O=O) ou triple (3 doublets liants, ex. N≡N).' },
      ],
    },
    {
      type: 'p',
      text: 'Un atome qui respecte l’octet et qui n’est pas chargé forme un nombre de liaisons égal au nombre d’électrons qui lui manquent pour avoir 8 électrons : C forme 4 liaisons, N en forme 3 (et garde 1 doublet non liant), O en forme 2 (et garde 2 doublets non liants), Cl en forme 1 (et garde 3 doublets non liants). H forme toujours 1 liaison.',
    },
    { type: 'h3', text: '3. Méthode pour établir un schéma de Lewis' },
    {
      type: 'steps',
      items: [
        { title: 'Compter les électrons de valence', text: 'Faire la somme $N_v$ des électrons de valence de tous les atomes. Pour un ion, **retrancher** la charge : un cation de charge $+1$ a un électron de moins, un anion $-2$ en a deux de plus.' },
        { title: 'Calculer le nombre de doublets', text: '$N_d = N_v / 2$ doublets à placer.' },
        { title: 'Écrire l’enchaînement des atomes', text: 'H est toujours en bout de chaîne ; l’atome qui forme le plus de liaisons est souvent central (C, N…).' },
        { title: 'Placer les doublets liants', text: 'Relier les atomes par des doublets liants (simples, puis doubles ou triples si nécessaire).' },
        { title: 'Compléter avec les doublets non liants', text: 'Répartir les doublets restants pour satisfaire l’octet (ou le duet).' },
        { title: 'Vérifier et placer les charges', text: 'Vérifier le total des doublets et l’octet/duet de chaque atome. Placer la charge de l’ion (en général sur l’atome qui « a perdu » ou « gagné » un électron par rapport à l’atome isolé).' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé : le dioxyde de carbone CO₂',
      content: [
        { type: 'p', text: '$N_v = 4 + 2 \\times 6 = 16$ électrons, soit $N_d = 8$ doublets. C forme 4 liaisons, chaque O en forme 2 : on écrit O=C=O (4 doublets liants). Il reste $8 - 4 = 4$ doublets non liants : deux sur chaque O. Vérification : C est entouré de 4 doublets liants (8 électrons), chaque O de 2 liants + 2 non liants (8 électrons).' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé : l’ion oxonium H₃O⁺',
      content: [
        { type: 'p', text: '$N_v = 3 \\times 1 + 6 - 1 = 8$ électrons (on retire 1 électron pour la charge $+$), soit 4 doublets. O est central et lié aux 3 H (3 doublets liants) ; il reste 1 doublet non liant sur O. L’oxygène isolé possède 6 électrons de valence ; dans H₃O⁺ il n’en « possède » plus que 5 (2 du doublet non liant + 1 par liaison) : il porte la charge $+$.' },
      ],
    },
    {
      type: 'svg',
      svg: lewisPanel(),
      caption: 'Schémas de Lewis des entités du programme. Les ions monoatomiques Na⁺ (couche externe n = 2 saturée), Cl⁻ et O²⁻ respectent l’octet.',
    },
    {
      type: 'table',
      headers: ['Entité', 'Électrons de valence', 'Doublets', 'Liants', 'Non liants'],
      rows: [
        ['H₂', '2', '1', '1', '0'],
        ['O₂', '12', '6', '2', '4'],
        ['N₂', '10', '5', '3', '2'],
        ['HCl', '8', '4', '1', '3'],
        ['H₂O', '8', '4', '2', '2'],
        ['NH₃', '8', '4', '3', '1'],
        ['CH₄', '8', '4', '4', '0'],
        ['CO₂', '16', '8', '4', '4'],
        ['H₃O⁺', '3 + 6 − 1 = 8', '4', '3', '1'],
        ['NH₄⁺', '4 + 5 − 1 = 8', '4', '4', '0'],
        ['HO⁻', '1 + 6 + 1 = 8', '4', '1', '3'],
        ['Cl⁻ ; O²⁻', '8 ; 8', '4', '0', '4'],
      ],
      caption: 'Décompte des doublets (à savoir refaire)',
    },
    { type: 'h3', text: '4. Lacune électronique' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Lacune électronique',
      content: [
        { type: 'p', text: 'Un atome présente une **lacune électronique** lorsqu’il lui manque **un doublet** pour satisfaire la règle du duet ou de l’octet. On la représente par un **rectangle vide** à côté du symbole.' },
      ],
    },
    {
      type: 'list',
      items: [
        '**H⁺** : l’ion hydrogène n’a plus aucun électron : il lui manque un doublet (duet) → une lacune.',
        '**BH₃** (borane) : B a 3 électrons de valence, il forme 3 liaisons et n’est entouré que de 6 électrons → une lacune.',
        '**AlCl₃** : même situation pour l’aluminium (3 électrons de valence).',
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Lacune et réactivité',
      content: [
        { type: 'p', text: 'Une entité possédant une lacune peut accepter un doublet non liant d’une autre entité. Ex. : H⁺ + H₂O → H₃O⁺ ; H⁺ + NH₃ → NH₄⁺ ; AlCl₃ + Cl⁻ → AlCl₄⁻. Le doublet non liant de l’eau ou de l’ammoniac devient un doublet liant.' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Pièges classiques',
      content: [
        {
          type: 'list',
          items: [
            'Oublier les doublets non liants (sur O, N, Cl…) : ils comptent dans l’octet et déterminent la géométrie.',
            'Oublier de corriger le nombre d’électrons pour un ion (−1 pour une charge +, +1 pour une charge −).',
            'Mettre un atome d’hydrogène au centre : H ne forme qu’une liaison.',
            'Ne pas vérifier le total : le nombre de doublets dessinés doit être exactement $N_v/2$.',
          ],
        },
      ],
    },

    { type: 'h2', text: 'II. Géométrie des entités' },
    {
      type: 'p',
      text: 'Le schéma de Lewis est plan, mais les molécules sont en trois dimensions. Le modèle de **répulsion des doublets** (méthode VSEPR, de l’anglais *Valence Shell Electron Pair Repulsion*) permet de prévoir la géométrie : les doublets électroniques (liants et non liants) entourant un atome central, chargés négativement, **se repoussent** et se disposent **le plus loin possible** les uns des autres.',
    },
    {
      type: 'steps',
      items: [
        { title: 'Écrire le schéma de Lewis', text: 'Repérer l’atome central.' },
        { title: 'Compter les « directions »', text: 'Compter autour de l’atome central les doublets non liants et les atomes voisins (une liaison double ou triple compte pour une seule direction).' },
        { title: 'Disposer les directions', text: '4 directions → tétraèdre ; 3 → triangle plan ; 2 → droite.' },
        { title: 'Nommer la géométrie', text: 'La forme de la molécule est donnée par la position des **atomes** seulement (les doublets non liants ne sont pas « vus »).' },
      ],
    },
    { type: 'svg', svg: geometryPanel(), caption: 'Géométrie de quelques molécules (représentation de Cram).' },
    {
      type: 'p',
      text: 'Dans CH₄, NH₃ et H₂O, l’atome central est entouré de 4 doublets disposés en tétraèdre. Les doublets non liants, plus « encombrants », repoussent davantage les doublets liants : l’angle passe de 109,5° (CH₄) à environ 107° (NH₃) puis 104,5° (H₂O).',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : le méthanal CH₂O',
      content: [
        { type: 'p', text: '$N_v = 4 + 2 + 6 = 12$, soit 6 doublets. C central forme une double liaison avec O et deux simples avec H ; O porte 2 doublets non liants. Autour de C : 3 directions (O, H, H) → molécule **plane**, angles proches de 120°. C’est aussi le cas de chaque carbone de l’éthène C₂H₄.' },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Utiliser des modèles moléculaires',
      content: [
        { type: 'p', text: 'Les modèles éclatés (boules et bâtonnets) ou compacts, ainsi que les logiciels de visualisation (ex. Avogadro, Jmol), permettent de vérifier la géométrie prévue et de mesurer les angles. Un code couleur usuel : C noir, H blanc, O rouge, N bleu, Cl vert.' },
      ],
    },

    { type: 'h2', text: 'III. Électronégativité et polarité' },
    { type: 'h3', text: '1. Électronégativité' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Électronégativité',
      content: [
        { type: 'p', text: 'L’**électronégativité** $\\chi$ (khi) d’un élément traduit l’aptitude d’un de ses atomes à **attirer vers lui les électrons** d’une liaison covalente qu’il forme avec un autre atome. C’est une grandeur sans unité (échelle de Pauling).' },
      ],
    },
    {
      type: 'table',
      headers: ['Colonne', '1', '2', '13', '14', '15', '16', '17'],
      rows: [
        ['Période 1', 'H 2,20', '', '', '', '', '', ''],
        ['Période 2', 'Li 0,98', 'Be 1,57', 'B 2,04', 'C 2,55', 'N 3,04', 'O 3,44', 'F 3,98'],
        ['Période 3', 'Na 0,93', 'Mg 1,31', 'Al 1,61', 'Si 1,90', 'P 2,19', 'S 2,58', 'Cl 3,16'],
        ['Période 4', 'K 0,82', '', '', '', '', '', 'Br 2,96'],
      ],
      caption: 'Électronégativités de Pauling (valeurs à ne pas apprendre, mais à savoir exploiter)',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Évolution dans le tableau périodique',
      content: [
        { type: 'p', text: 'L’électronégativité **augmente de gauche à droite** dans une période et **de bas en haut** dans une colonne. Le fluor est l’élément le plus électronégatif ; viennent ensuite O, puis N et Cl. Les gaz nobles, qui ne forment pratiquement pas de liaisons, ne sont pas concernés.' },
      ],
    },
    { type: 'h3', text: '2. Liaison polarisée' },
    {
      type: 'p',
      text: 'Lorsque deux atomes d’électronégativités différentes sont liés, le doublet liant est attiré par le plus électronégatif. Celui-ci porte un **excès** de charge noté $\\delta^-$ (charge partielle négative) et l’autre un **défaut** de charge $\\delta^+$. La liaison est dite **polarisée**.',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Critère pratique (lycée)',
      content: [
        { type: 'p', text: 'On considère qu’une liaison A–B est polarisée lorsque $\\Delta\\chi = |\\chi_A - \\chi_B| \\geq 0{,}4$. La liaison C–H ($\\Delta\\chi = 2{,}55 - 2{,}20 = 0{,}35$) est considérée comme **non polarisée** ; une liaison entre deux atomes identiques (H–H, Cl–Cl, C–C) n’est jamais polarisée.' },
      ],
    },
    {
      type: 'table',
      headers: ['Liaison', '$\\Delta\\chi$', 'Conclusion', 'Charges partielles'],
      rows: [
        ['C–H', '0,35', 'non polarisée', '—'],
        ['O–H', '1,24', 'polarisée', '$\\delta^-$ sur O, $\\delta^+$ sur H'],
        ['N–H', '0,84', 'polarisée', '$\\delta^-$ sur N'],
        ['C=O', '0,89', 'polarisée', '$\\delta^-$ sur O, $\\delta^+$ sur C'],
        ['H–Cl', '0,96', 'polarisée', '$\\delta^-$ sur Cl'],
        ['C–Cl', '0,61', 'polarisée', '$\\delta^-$ sur Cl'],
        ['Na / Cl', '2,23', 'très grande : transfert d’électron → ions Na⁺ et Cl⁻', '(composé ionique)'],
      ],
    },
    { type: 'h3', text: '3. Molécule polaire ou apolaire' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Entité polaire',
      content: [
        { type: 'p', text: 'Une entité est **polaire** si le barycentre $G^+$ des charges partielles positives **ne coïncide pas** avec le barycentre $G^-$ des charges partielles négatives. Elle est **apolaire** sinon (ou si elle ne comporte aucune liaison polarisée).' },
      ],
    },
    { type: 'svg', svg: polaritySvg(), caption: 'La géométrie décide : CO₂ (linéaire, symétrique) est apolaire, H₂O (coudée) est polaire.' },
    {
      type: 'steps',
      items: [
        { title: 'Repérer les liaisons polarisées', text: 'À l’aide des électronégativités ; placer $\\delta^+$ et $\\delta^-$.' },
        { title: 'Déterminer la géométrie', text: 'À partir du schéma de Lewis (méthode de répulsion des doublets).' },
        { title: 'Comparer $G^+$ et $G^-$', text: 'Si les charges sont disposées symétriquement autour du centre, $G^+ = G^-$ : apolaire. Sinon : polaire.' },
      ],
    },
    {
      type: 'table',
      headers: ['Molécule', 'Liaisons polarisées ?', 'Géométrie', 'Polarité'],
      rows: [
        ['H₂, O₂, N₂, Cl₂', 'non', 'linéaire', 'apolaire'],
        ['CH₄', 'non (C–H)', 'tétraédrique', 'apolaire'],
        ['CO₂', 'oui (C=O)', 'linéaire symétrique', '**apolaire**'],
        ['CCl₄', 'oui (C–Cl)', 'tétraédrique symétrique', '**apolaire**'],
        ['HCl', 'oui', 'linéaire', 'polaire'],
        ['H₂O', 'oui (O–H)', 'coudée', 'polaire'],
        ['NH₃', 'oui (N–H)', 'pyramidale', 'polaire'],
        ['CH₂Cl₂, CHCl₃', 'oui (C–Cl)', 'tétraèdre non symétrique', 'polaire'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Liaison polarisée ≠ molécule polaire',
      content: [{ type: 'p', text: 'Une molécule peut posséder des liaisons polarisées et être apolaire (CO₂, CCl₄) : les effets se compensent par symétrie. Il faut **toujours** raisonner sur la géométrie.' }],
    },

    { type: 'h2', text: 'IV. Cohésion des solides' },
    {
      type: 'p',
      text: 'Un solide est **cohérent** : ses entités restent liées les unes aux autres. Cette cohésion s’explique par des **interactions électrostatiques** entre entités. Leur intensité permet d’interpréter les températures de changement d’état.',
    },
    { type: 'h3', text: '1. Solides ioniques' },
    {
      type: 'p',
      text: 'Un **solide ionique** (ou cristal ionique) est constitué d’anions et de cations régulièrement disposés. Chaque ion est entouré d’ions de signe opposé : les attractions entre ions de signes opposés l’emportent sur les répulsions entre ions de même signe. Le solide est **électriquement neutre** : sa formule statistique indique la proportion des ions (NaCl, CaCl₂, Al₂O₃…).',
    },
    { type: 'svg', svg: naclSvg(), caption: 'Modèle du cristal de chlorure de sodium.' },
    {
      type: 'callout',
      variant: 'example',
      title: 'Formule statistique',
      content: [
        { type: 'p', text: 'Le chlorure de calcium contient des ions Ca²⁺ et Cl⁻ : la neutralité impose deux Cl⁻ pour un Ca²⁺ → CaCl₂. L’oxyde d’aluminium contient Al³⁺ et O²⁻ : $2 \\times (+3) + 3 \\times (-2) = 0$ → Al₂O₃.' },
      ],
    },
    { type: 'h3', text: '2. Solides moléculaires : interactions de Van der Waals' },
    {
      type: 'p',
      text: 'Un **solide moléculaire** est constitué de molécules (glace, diiode I₂, saccharose, carboglace CO₂…). Entre molécules s’exercent des **interactions de Van der Waals** : interactions électrostatiques entre dipôles permanents (molécules polaires) ou **induits** (même une molécule apolaire voit ses électrons fluctuer et crée des dipôles instantanés).',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Intensité des interactions de Van der Waals',
      content: [
        {
          type: 'list',
          items: [
            'Elles augmentent avec la **taille** des molécules (nombre d’électrons, surface de contact).',
            'Elles sont plus fortes entre molécules **polaires**.',
            'Elles sont **faibles** (quelques kJ/mol), bien moins que les liaisons covalentes.',
          ],
        },
      ],
    },
    {
      type: 'table',
      headers: ['Alcane', 'Formule', '$T_{éb}$ sous 1 bar'],
      rows: [
        ['méthane', 'CH₄', '−162 °C'],
        ['éthane', 'C₂H₆', '−89 °C'],
        ['propane', 'C₃H₈', '−42 °C'],
        ['butane', 'C₄H₁₀', '−1 °C'],
        ['pentane', 'C₅H₁₂', '36 °C'],
        ['hexane', 'C₆H₁₄', '69 °C'],
      ],
      caption: 'Plus la chaîne est longue, plus les interactions de Van der Waals sont intenses et plus la température d’ébullition est élevée.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Influence des ramifications',
      content: [{ type: 'p', text: 'À même formule brute C₅H₁₂ : pentane (36 °C) > 2-méthylbutane (28 °C) > 2,2-diméthylpropane (10 °C). Une molécule ramifiée, plus « compacte », offre moins de surface de contact : interactions plus faibles.' }],
    },
    { type: 'h3', text: '3. Le pont hydrogène (liaison hydrogène)' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Pont hydrogène',
      content: [
        { type: 'p', text: 'Un **pont hydrogène** s’établit entre un atome d’hydrogène lié à un atome **très électronégatif** (N, O ou F) — donc porteur d’une charge $\\delta^+$ marquée — et un **doublet non liant** d’un atome N, O ou F d’une autre molécule (ou d’une autre partie de la même molécule). On le représente en pointillés : O–H···O.' },
      ],
    },
    { type: 'svg', svg: hydrogenBondSvg(), caption: 'Ponts hydrogène entre molécules d’eau (les trois atomes O–H···O sont pratiquement alignés).' },
    {
      type: 'p',
      text: 'Le pont hydrogène est plus intense que les interactions de Van der Waals (≈ 10 à 40 kJ/mol) mais beaucoup moins qu’une liaison covalente. Il explique des propriétés remarquables :',
    },
    {
      type: 'list',
      items: [
        'l’eau H₂O bout à 100 °C alors que H₂S, molécule voisine plus lourde mais sans pont H, bout à −60 °C ;',
        'l’éthanol CH₃–CH₂–OH bout à 78 °C, alors que son isomère le méthoxyméthane CH₃–O–CH₃ (aucun H lié à O) bout à −24 °C ;',
        'la glace a une structure ordonnée et « aérée » imposée par les ponts H : elle est moins dense que l’eau liquide (elle flotte) ;',
        'la double hélice d’ADN est maintenue par des ponts H entre bases complémentaires.',
      ],
    },
    { type: 'svg', svg: interactionsScaleSvg(), caption: 'Ordres de grandeur des énergies d’interaction.' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Changement d’état et interactions',
      content: [{ type: 'p', text: 'Fondre ou vaporiser un solide moléculaire, c’est rompre les **interactions intermoléculaires**, pas les liaisons covalentes des molécules : l’eau vaporisée reste H₂O. C’est pourquoi les solides moléculaires fondent à basse température, contrairement aux solides ioniques.' }],
    },

    { type: 'h2', text: 'V. Dissolution d’un solide ionique dans l’eau' },
    { type: 'h3', text: '1. Le rôle de l’eau' },
    {
      type: 'p',
      text: 'L’eau est un **solvant polaire** (molécule coudée, liaisons O–H polarisées) capable de former des **ponts hydrogène**. Ces propriétés lui permettent de **dissocier** les cristaux ioniques et de **solvater** les ions.',
    },
    {
      type: 'steps',
      items: [
        { title: 'Dissociation', text: 'Les molécules d’eau, en s’orientant autour des ions de la surface du cristal, affaiblissent les interactions électrostatiques entre ions qui se séparent.' },
        { title: 'Solvatation (hydratation)', text: 'Chaque ion s’entoure d’un cortège de molécules d’eau : l’atome O ($\\delta^-$) est tourné vers les cations, un atome H ($\\delta^+$) vers les anions. On note les ions solvatés « (aq) ».' },
        { title: 'Dispersion', text: 'Les ions hydratés se répartissent uniformément dans la solution, qui devient homogène.' },
      ],
    },
    { type: 'svg', svg: solvationSvg(), caption: 'Hydratation des ions Na⁺ et Cl⁻.' },
    { type: 'h3', text: '2. Équation de dissolution' },
    {
      type: 'p',
      text: 'La dissolution est modélisée par une **équation de réaction** dans laquelle le solide est noté (s) et les ions en solution (aq). Les nombres stœchiométriques assurent la conservation des éléments et de la charge.',
    },
    { type: 'math', tex: r`\mathrm{NaCl(s)} \xrightarrow{\ \text{eau}\ } \mathrm{Na^+(aq)} + \mathrm{Cl^-(aq)}` },
    { type: 'math', tex: r`\mathrm{CuCl_2(s)} \xrightarrow{\ \text{eau}\ } \mathrm{Cu^{2+}(aq)} + 2\,\mathrm{Cl^-(aq)}` },
    { type: 'math', tex: r`\mathrm{Fe_2(SO_4)_3(s)} \xrightarrow{\ \text{eau}\ } 2\,\mathrm{Fe^{3+}(aq)} + 3\,\mathrm{SO_4^{2-}(aq)}` },
    { type: 'h3', text: '3. Concentration des ions' },
    {
      type: 'p',
      text: 'Si l’on dissout une quantité $n$ de soluté de formule $\\mathrm{X}_a\\mathrm{Y}_b$ dans un volume $V$ de solution, la **concentration en soluté apporté** est $c = n/V$. D’après l’équation de dissolution, il se forme $a\\,n$ ions X et $b\\,n$ ions Y, d’où :',
    },
    { type: 'math', tex: r`[\mathrm{X}] = a\,c \qquad [\mathrm{Y}] = b\,c \qquad \text{avec } c = \frac{n}{V} = \frac{m}{M\,V}` },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé',
      content: [
        { type: 'p', text: 'On dissout $m = 7{,}10$ g de sulfate de sodium Na₂SO₄ ($M = 142{,}1$ g·mol⁻¹) dans une fiole jaugée de 250,0 mL.' },
        { type: 'p', text: 'Équation : Na₂SO₄(s) → 2 Na⁺(aq) + SO₄²⁻(aq).' },
        { type: 'p', text: '$n = \\dfrac{m}{M} = \\dfrac{7{,}10}{142{,}1} = 5{,}00 \\times 10^{-2}$ mol ; $c = \\dfrac{n}{V} = \\dfrac{5{,}00 \\times 10^{-2}}{0{,}2500} = 0{,}200$ mol·L⁻¹.' },
        { type: 'p', text: '$[\\mathrm{Na^+}] = 2c = 0{,}400$ mol·L⁻¹ et $[\\mathrm{SO_4^{2-}}] = c = 0{,}200$ mol·L⁻¹.' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Attention',
      content: [{ type: 'p', text: 'La notation entre crochets $[\\mathrm{X}]$ désigne la concentration effective d’une espèce **présente** en solution. On n’écrit pas $[\\mathrm{Na_2SO_4}]$ : cette espèce n’existe plus en solution, on parle de concentration en soluté **apporté** $c$.' }],
    },

    { type: 'h2', text: 'VI. Solubilité et miscibilité' },
    { type: 'h3', text: '1. Solubilité' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Solubilité',
      content: [
        { type: 'p', text: 'La **solubilité** $s$ d’une espèce dans un solvant est la masse (en g·L⁻¹) ou la quantité de matière (en mol·L⁻¹) maximale de cette espèce que l’on peut dissoudre par litre de solution, à une température donnée. Au-delà, la solution est **saturée** : le solide ne se dissout plus.' },
      ],
    },
    {
      type: 'p',
      text: 'Exemple : à 20 °C, la solubilité du chlorure de sodium dans l’eau est d’environ 360 g·L⁻¹. La solubilité dépend de la température (celle de la plupart des solides augmente avec elle) et du solvant.',
    },
    { type: 'h3', text: '2. Prévoir la solubilité' },
    {
      type: 'p',
      text: 'Une espèce est d’autant plus soluble dans un solvant que les interactions **soluté–solvant** sont fortes comparées aux interactions soluté–soluté et solvant–solvant. D’où la règle empirique « **qui se ressemble s’assemble** » :',
    },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Solvants polaires', text: 'Eau, éthanol, acétone… Dissolvent les composés ioniques et les molécules polaires, surtout si des ponts H soluté–solvant sont possibles (sucres, alcools courts).', icon: 'Droplets' },
        { title: 'Solvants apolaires', text: 'Cyclohexane, heptane, toluène… Dissolvent les espèces apolaires (diiode, graisses, huiles, cires).', icon: 'Beaker' },
        { title: 'Ponts hydrogène', text: 'Un soluté qui peut former des ponts H avec l’eau (OH, NH, C=O…) y est d’autant plus soluble que sa partie carbonée est courte.', icon: 'Link' },
      ],
    },
    {
      type: 'table',
      headers: ['Alcool', 'Formule', 'Solubilité dans l’eau à 20 °C'],
      rows: [
        ['méthanol', 'CH₃OH', 'miscible en toutes proportions'],
        ['éthanol', 'C₂H₅OH', 'miscible en toutes proportions'],
        ['propan-1-ol', 'C₃H₇OH', 'miscible en toutes proportions'],
        ['butan-1-ol', 'C₄H₉OH', '≈ 70 g·L⁻¹'],
        ['pentan-1-ol', 'C₅H₁₁OH', '≈ 22 g·L⁻¹'],
      ],
      caption: 'La partie apolaire (chaîne carbonée) s’allonge : la solubilité dans l’eau diminue.',
    },
    { type: 'h3', text: '3. Miscibilité de deux liquides' },
    {
      type: 'p',
      text: 'Deux liquides sont **miscibles** s’ils forment, mélangés, une seule phase (mélange homogène) : eau et éthanol, cyclohexane et heptane. Ils sont **non miscibles** s’ils forment deux phases distinctes (eau et huile, eau et cyclohexane, eau et dichlorométhane) ; la phase la plus dense se place en dessous.',
    },

    { type: 'h2', text: 'VII. Extraction liquide-liquide' },
    {
      type: 'p',
      text: 'Extraire une espèce chimique, c’est la faire passer de son milieu d’origine (souvent une phase aqueuse) dans un autre solvant, appelé **solvant extracteur**, dans lequel elle est plus soluble.',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Choix du solvant extracteur',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Il est **non miscible** avec le solvant de départ (l’eau en général).',
            'L’espèce à extraire y est **beaucoup plus soluble** que dans le solvant de départ.',
            'Les autres espèces (impuretés) y sont peu solubles.',
            'Il présente le moins de dangers possible (toxicité, inflammabilité) et, idéalement, une température d’ébullition faible pour être éliminé facilement.',
          ],
        },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Introduction', text: 'Robinet fermé, verser la solution aqueuse puis le solvant extracteur dans l’ampoule à décanter.' },
        { title: 'Agitation et dégazage', text: 'Boucher, agiter vigoureusement en retournant l’ampoule, et **dégazer** régulièrement en ouvrant le robinet (ampoule tête en bas) pour évacuer les vapeurs.' },
        { title: 'Décantation', text: 'Replacer l’ampoule sur son support, ôter le bouchon et laisser les phases se séparer.' },
        { title: 'Séparation', text: 'Recueillir la phase inférieure dans un bécher en ouvrant le robinet, puis la phase supérieure par le haut. Identifier les phases grâce aux densités.' },
        { title: 'Séchage et élimination du solvant', text: 'Sécher la phase organique avec un desséchant (sulfate de magnésium anhydre), filtrer, puis évaporer le solvant (évaporateur rotatif).' },
      ],
    },
    { type: 'svg', svg: decantationSvg(), caption: 'Ampoule à décanter : extraction du diiode d’une solution aqueuse par le cyclohexane.' },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé : extraction du diiode',
      content: [
        { type: 'p', text: 'Le diiode I₂ est une molécule apolaire, peu soluble dans l’eau (≈ 0,3 g·L⁻¹) et très soluble dans le cyclohexane, solvant apolaire non miscible avec l’eau. Après agitation, la phase organique (cyclohexane, $d = 0{,}78$), au-dessus, se colore en violet, tandis que la phase aqueuse, en dessous, se décolore. L’éthanol, qui dissout bien le diiode, ne convient pas : il est miscible avec l’eau.' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Plusieurs extractions valent mieux qu’une',
      content: [{ type: 'p', text: 'À volume total de solvant égal, deux extractions successives avec chacune la moitié du solvant sont plus efficaces qu’une seule extraction.' }],
    },
    {
      type: 'table',
      headers: ['Solvant', 'Densité', 'Miscible avec l’eau ?', 'Polarité', 'Remarque'],
      rows: [
        ['eau', '1,00', '—', 'polaire', '—'],
        ['éthanol', '0,79', 'oui', 'polaire', 'inutilisable pour extraire d’une phase aqueuse'],
        ['acétone', '0,79', 'oui', 'polaire', 'inutilisable'],
        ['cyclohexane', '0,78', 'non', 'apolaire', 'inflammable ; phase supérieure'],
        ['éthanoate d’éthyle', '0,90', 'non (peu)', 'peu polaire', 'phase supérieure'],
        ['dichlorométhane', '1,33', 'non', 'peu polaire', 'nocif ; phase **inférieure**'],
      ],
    },

    { type: 'h2', text: 'VIII. Espèces amphiphiles, savons et tensioactifs' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Hydrophile', value: 'qui a de l’affinité pour l’eau (partie polaire ou ionique : –OH, –COOH, –COO⁻…).' },
        { key: 'Hydrophobe', value: 'qui fuit l’eau (partie apolaire).' },
        { key: 'Lipophile', value: 'qui a de l’affinité pour les corps gras (apolaires) ; en pratique une longue chaîne carbonée est hydrophobe et lipophile.' },
        { key: 'Amphiphile', value: 'qui possède à la fois une partie hydrophile et une partie lipophile.' },
      ],
    },
    {
      type: 'p',
      text: 'Un **savon** est constitué d’ions carboxylate R–COO⁻ à longue chaîne carbonée (R comportant en général 11 à 17 atomes de carbone), associés à des ions Na⁺ (savon dur) ou K⁺ (savon mou). Exemple : le stéarate de sodium CH₃–(CH₂)₁₆–COO⁻ Na⁺. Le groupe –COO⁻, chargé, est la **tête hydrophile** ; la chaîne carbonée est la **queue lipophile**.',
    },
    { type: 'svg', svg: soapSvg(), caption: 'Structure d’un ion carboxylate de savon et d’une micelle.' },
    { type: 'h3', text: 'Propriétés lavantes' },
    {
      type: 'steps',
      items: [
        { title: 'À la surface de l’eau', text: 'Les ions carboxylate se placent têtes dans l’eau et queues dans l’air : ils abaissent la tension superficielle (l’eau « mouille » mieux le tissu).' },
        { title: 'Au contact d’une salissure grasse', text: 'Les queues lipophiles pénètrent dans la graisse, les têtes restent dans l’eau.' },
        { title: 'Formation de micelles', text: 'La graisse est fragmentée et emprisonnée dans des **micelles** : sphères dont la surface est formée des têtes chargées (en contact avec l’eau) et le cœur des queues lipophiles.' },
        { title: 'Rinçage', text: 'Les micelles, chargées négativement en surface, se repoussent et restent dispersées ; elles sont entraînées par l’eau de rinçage.' },
      ],
    },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Détergents', text: 'Lessives, liquides vaisselle, shampooings, gels douche : tensioactifs de synthèse.', icon: 'Sparkles' },
        { title: 'Émulsifiants', text: 'Stabilisent une émulsion (mayonnaise : la lécithine du jaune d’œuf), crèmes cosmétiques.', icon: 'Egg' },
        { title: 'Moussants', text: 'Mousses à raser, extincteurs à mousse ; la mousse est stabilisée par des tensioactifs.', icon: 'Wind' },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Un peu d’histoire',
      content: [{ type: 'p', text: 'Le savon de Marseille est fabriqué depuis le Moyen Âge en chauffant de l’huile d’olive avec de la soude (réaction de saponification). En 1688, un édit de Colbert en réglemente la fabrication.' }],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Eau dure',
      content: [{ type: 'p', text: 'Dans une eau riche en ions calcium Ca²⁺ et magnésium Mg²⁺ (eau « dure », calcaire), les ions carboxylate forment un précipité peu soluble : le savon mousse mal et perd son efficacité. Les lessives contiennent donc d’autres tensioactifs et des adoucissants.' }],
    },
  ],

  /* ================================================================ */
  exercices: [
    {
      id: 'pc04-ex1',
      title: 'Schéma de Lewis du cyanure d’hydrogène',
      difficulty: 1,
      duration: 8,
      tags: ['Lewis', 'géométrie'],
      statement: [
        { type: 'p', text: 'Le cyanure d’hydrogène HCN est un gaz très toxique. L’enchaînement des atomes est H–C–N.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Donner le nombre d’électrons de valence de H (Z = 1), C (Z = 6) et N (Z = 7).',
            'Calculer le nombre total de doublets à placer.',
            'Établir le schéma de Lewis de HCN en vérifiant les règles du duet et de l’octet.',
            'En déduire la géométrie de la molécule.',
          ],
        },
      ],
      hints: ['C forme 4 liaisons, N en forme 3.', 'Une triple liaison compte pour une seule « direction » autour de C.'],
      solution: [
        { type: 'p', text: '1. H : 1s¹ → 1 électron de valence. C : 1s² 2s² 2p² → 4. N : 1s² 2s² 2p³ → 5.' },
        { type: 'p', text: '2. $N_v = 1 + 4 + 5 = 10$ électrons, soit $N_d = 5$ doublets.' },
        { type: 'p', text: '3. H forme une liaison simple avec C. Pour que C forme 4 liaisons, il établit une **triple liaison** avec N : H–C≡N (4 doublets liants). Il reste $5 - 4 = 1$ doublet, non liant, placé sur N. Vérification : H a 2 électrons (duet) ; C a 4 doublets liants = 8 électrons ; N a 3 liants + 1 non liant = 8 électrons (octets respectés).' },
        { type: 'math', tex: r`\mathrm{H{-}C{\equiv}N|}` },
        { type: 'p', text: '4. Autour de C, il y a 2 directions (H et N, la triple liaison comptant pour une seule) : elles s’opposent. La molécule est **linéaire** (angle HCN = 180°).' },
      ],
    },
    {
      id: 'pc04-ex2',
      title: 'Lewis, lacune et géométrie',
      difficulty: 1,
      duration: 12,
      tags: ['Lewis', 'lacune', 'géométrie'],
      statement: [
        { type: 'p', text: 'Données : B (colonne 13, 3 électrons de valence) ; P (colonne 15) ; O (colonne 16) ; H ; C.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Établir le schéma de Lewis de la phosphine PH₃ et prévoir sa géométrie.',
            'Établir le schéma de Lewis du méthanal CH₂O (C central) et prévoir sa géométrie.',
            'Établir le schéma de Lewis du borane BH₃. Quelle particularité présente l’atome de bore ?',
            'Le borane réagit avec l’ammoniac NH₃ pour former H₃B–NH₃. Expliquer la formation de la liaison B–N.',
          ],
        },
      ],
      hints: ['P est dans la même colonne que N : il se comporte de la même façon.', 'Combien d’électrons entourent B dans BH₃ ?'],
      solution: [
        { type: 'p', text: '1. PH₃ : $N_v = 5 + 3 = 8$ → 4 doublets : 3 liants P–H et 1 non liant sur P. Autour de P : 4 doublets disposés en tétraèdre dont un non liant → molécule **pyramidale** (comme NH₃).' },
        { type: 'p', text: '2. CH₂O : $N_v = 4 + 2 \\times 1 + 6 = 12$ → 6 doublets. Deux liaisons C–H, une double liaison C=O (4 doublets liants), il reste 2 doublets non liants sur O. Autour de C : 3 directions → molécule **plane trigonale** (angles ≈ 120°).' },
        { type: 'p', text: '3. BH₃ : $N_v = 3 + 3 = 6$ → 3 doublets, tous liants (B–H). Le bore n’est entouré que de 6 électrons : il lui manque un doublet pour respecter l’octet. Il présente une **lacune électronique** (rectangle vide). Géométrie plane trigonale.' },
        { type: 'p', text: '4. L’azote de NH₃ possède un doublet non liant. Il le « donne » au bore, qui possède une lacune : ce doublet devient le doublet liant B–N. Dans H₃B–NH₃, B et N respectent tous deux l’octet.' },
      ],
    },
    {
      id: 'pc04-ex3',
      title: 'Liaisons polarisées et molécules polaires',
      difficulty: 2,
      duration: 15,
      tags: ['électronégativité', 'polarité'],
      statement: [
        { type: 'p', text: 'Données (Pauling) : χ(H) = 2,20 ; χ(C) = 2,55 ; χ(N) = 3,04 ; χ(O) = 3,44 ; χ(Cl) = 3,16. On considère qu’une liaison est polarisée si Δχ ≥ 0,4.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Classer les atomes par électronégativité croissante. Ce classement est-il cohérent avec la position des éléments dans le tableau périodique ?',
            'Indiquer, pour chacune des liaisons C–H, C–Cl, N–H, O–H, si elle est polarisée et, le cas échéant, placer les charges partielles.',
            'Le tétrachlorométhane CCl₄ et le dichlorométhane CH₂Cl₂ sont tétraédriques. L’une de ces molécules est-elle polaire ? Justifier.',
            'Le trifluorure de bore BF₃ est plan triangulaire et l’ammoniac NH₃ pyramidal. Prévoir leur polarité (χ(B) = 2,04 ; χ(F) = 3,98).',
          ],
        },
      ],
      hints: ['Comparer les barycentres des charges partielles $G^+$ et $G^-$.', 'Dans CCl₄, les quatre liaisons identiques pointent vers les sommets d’un tétraèdre régulier.'],
      solution: [
        { type: 'p', text: '1. H (2,20) < C (2,55) < N (3,04) < Cl (3,16) < O (3,44). Cohérent : dans la 2ᵉ période, χ croît de C à O (de gauche à droite) ; H, situé à gauche, est peu électronégatif ; Cl (3ᵉ période, colonne 17) est moins électronégatif que F mais très électronégatif.' },
        {
          type: 'table',
          headers: ['Liaison', 'Δχ', 'Polarisée ?', 'Charges'],
          rows: [
            ['C–H', '0,35', 'non', '—'],
            ['C–Cl', '0,61', 'oui', 'C $\\delta^+$, Cl $\\delta^-$'],
            ['N–H', '0,84', 'oui', 'N $\\delta^-$, H $\\delta^+$'],
            ['O–H', '1,24', 'oui', 'O $\\delta^-$, H $\\delta^+$'],
          ],
        },
        { type: 'p', text: '3. Dans CCl₄, les 4 liaisons C–Cl sont polarisées et identiques ; le tétraèdre est régulier : le barycentre $G^-$ des quatre charges $\\delta^-$ (sur les Cl) est au centre, sur C, qui porte $G^+$. $G^+ = G^-$ : **CCl₄ est apolaire**. Dans CH₂Cl₂, seules deux liaisons sont polarisées (C–H ne l’est pas) : $G^-$ est situé entre les deux Cl, hors de C. $G^+ \\neq G^-$ : **CH₂Cl₂ est polaire**.' },
        { type: 'p', text: '4. BF₃ : 3 liaisons B–F très polarisées (Δχ = 1,94) disposées à 120° dans un plan ; par symétrie $G^-$ est au centre, sur B : **apolaire**. NH₃ : les 3 liaisons N–H polarisées pointent toutes « vers le bas » de la pyramide ; $G^+$ (barycentre des 3 H) est sous l’atome N qui porte $G^-$ : **polaire**.' },
      ],
    },
    {
      id: 'pc04-ex4',
      title: 'Préparer une solution ionique',
      difficulty: 1,
      duration: 12,
      tags: ['dissolution', 'concentration'],
      statement: [
        { type: 'p', text: 'Données : M(Cu) = 63,5 g·mol⁻¹ ; M(Cl) = 35,5 g·mol⁻¹ ; M(Al) = 27,0 g·mol⁻¹ ; M(S) = 32,1 g·mol⁻¹ ; M(O) = 16,0 g·mol⁻¹.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'On dissout 2,69 g de chlorure de cuivre(II) CuCl₂(s) dans l’eau pour obtenir 200,0 mL de solution. Écrire l’équation de dissolution puis calculer la concentration en soluté apporté et les concentrations des ions.',
            'Le sulfate d’aluminium est un solide ionique constitué d’ions Al³⁺ et SO₄²⁻. Établir sa formule statistique et écrire son équation de dissolution dans l’eau.',
            'On veut une solution de sulfate d’aluminium dans laquelle $[\\mathrm{SO_4^{2-}}] = 0{,}150$ mol·L⁻¹. Quelle masse de solide faut-il dissoudre pour obtenir 100,0 mL de solution ?',
          ],
        },
      ],
      hints: ['$M(\\mathrm{CuCl_2}) = M(\\mathrm{Cu}) + 2M(\\mathrm{Cl})$.', 'Neutralité : $2 \\times (+3) + 3 \\times (-2) = 0$.'],
      solution: [
        { type: 'p', text: '1. CuCl₂(s) → Cu²⁺(aq) + 2 Cl⁻(aq). $M(\\mathrm{CuCl_2}) = 63{,}5 + 2 \\times 35{,}5 = 134{,}5$ g·mol⁻¹.' },
        { type: 'p', text: '$n = \\dfrac{2{,}69}{134{,}5} = 2{,}00 \\times 10^{-2}$ mol ; $c = \\dfrac{2{,}00 \\times 10^{-2}}{0{,}2000} = 0{,}100$ mol·L⁻¹. D’où $[\\mathrm{Cu^{2+}}] = c = 0{,}100$ mol·L⁻¹ et $[\\mathrm{Cl^-}] = 2c = 0{,}200$ mol·L⁻¹.' },
        { type: 'p', text: '2. Neutralité électrique : 2 Al³⁺ (charge +6) pour 3 SO₄²⁻ (charge −6) → **Al₂(SO₄)₃**. Équation : Al₂(SO₄)₃(s) → 2 Al³⁺(aq) + 3 SO₄²⁻(aq).' },
        { type: 'p', text: '3. $[\\mathrm{SO_4^{2-}}] = 3c$ donc $c = 0{,}150/3 = 5{,}00 \\times 10^{-2}$ mol·L⁻¹. $n = c\\,V = 5{,}00 \\times 10^{-2} \\times 0{,}1000 = 5{,}00 \\times 10^{-3}$ mol.' },
        { type: 'p', text: '$M(\\mathrm{Al_2(SO_4)_3}) = 2 \\times 27{,}0 + 3 \\times (32{,}1 + 4 \\times 16{,}0) = 54{,}0 + 288{,}3 = 342{,}3$ g·mol⁻¹. $m = n\\,M = 5{,}00 \\times 10^{-3} \\times 342{,}3 = 1{,}71$ g.' },
      ],
    },
    {
      id: 'pc04-ex5',
      title: 'Interpréter des températures d’ébullition',
      difficulty: 2,
      duration: 15,
      tags: ['cohésion', 'pont hydrogène', 'Van der Waals'],
      statement: [
        {
          type: 'table',
          headers: ['Espèce', 'Formule', '$T_{éb}$ (°C)'],
          rows: [
            ['eau', 'H₂O', '100'],
            ['sulfure d’hydrogène', 'H₂S', '−60'],
            ['éthanol', 'CH₃–CH₂–OH', '78'],
            ['méthoxyméthane', 'CH₃–O–CH₃', '−24'],
            ['propane', 'CH₃–CH₂–CH₃', '−42'],
            ['butane', 'CH₃–CH₂–CH₂–CH₃', '−1'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Que doit-on rompre pour faire bouillir un liquide moléculaire ?',
            'Comparer le propane et le butane. Quelle interaction est en jeu ?',
            'L’éthanol et le méthoxyméthane sont isomères. Expliquer l’écart de leurs températures d’ébullition.',
            'Le soufre est situé sous l’oxygène dans le tableau périodique (χ(S) = 2,58 ; χ(H) = 2,20). Expliquer pourquoi l’eau bout à une température bien plus élevée que H₂S, pourtant plus lourde.',
          ],
        },
      ],
      hints: ['Un pont H nécessite un H lié à N, O ou F.', 'Δχ(S–H) est-il suffisant pour un pont H ?'],
      solution: [
        { type: 'p', text: '1. On rompt les **interactions intermoléculaires** (Van der Waals, ponts H) ; les liaisons covalentes au sein des molécules ne sont pas rompues.' },
        { type: 'p', text: '2. Ces alcanes sont apolaires : seules s’exercent des interactions de Van der Waals. Le butane, plus gros (plus d’électrons, plus grande surface de contact), subit des interactions plus fortes : il faut plus d’énergie pour les rompre, d’où une température d’ébullition plus élevée (−1 °C > −42 °C).' },
        { type: 'p', text: '3. Les deux molécules ont la même formule brute C₂H₆O, donc des interactions de Van der Waals comparables. Mais l’éthanol possède un H lié à O : il peut établir des **ponts hydrogène** entre ses molécules (O–H···O). Le méthoxyméthane n’a aucun H lié à O : pas de pont H entre ses molécules. La cohésion du liquide est plus forte pour l’éthanol, qui bout à plus haute température.' },
        { type: 'p', text: '4. Δχ(S–H) = 0,38 < 0,4 : la liaison S–H est très peu polarisée et S n’est pas assez électronégatif pour participer à des ponts H. L’eau, au contraire, forme jusqu’à 4 ponts H par molécule (2 H et 2 doublets non liants). Ces interactions, plus fortes que les interactions de Van der Waals (qui seules seraient plus intenses pour H₂S, plus grosse), expliquent la température d’ébullition élevée de l’eau.' },
      ],
    },
    {
      id: 'pc04-ex6',
      title: 'Solubilité et miscibilité',
      difficulty: 2,
      duration: 12,
      tags: ['solubilité', 'miscibilité'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Le glucose C₆H₁₂O₆ possède cinq groupes –OH. Expliquer sa grande solubilité dans l’eau (environ 900 g·L⁻¹ à 25 °C).',
            'On mélange de l’eau et du cyclohexane C₆H₁₂ dans un tube à essais. Qu’observe-t-on ? Dessiner le tube en précisant la position des phases (d(cyclohexane) = 0,78).',
            'La solubilité du chlorure de sodium dans l’eau est de 360 g·L⁻¹ à 20 °C. On ajoute 20 g de sel dans 50 mL d’eau. La solution est-elle saturée ? (On assimilera le volume de solution au volume d’eau.)',
            'Le chlorure de sodium est pratiquement insoluble dans le cyclohexane. Expliquer.',
          ],
        },
      ],
      hints: ['Penser aux ponts hydrogène soluté–solvant.', 'Calculer la masse maximale dissoute dans 50 mL.'],
      solution: [
        { type: 'p', text: '1. Le glucose est une molécule polaire dont les groupes –OH peuvent établir de nombreux **ponts hydrogène** avec les molécules d’eau. Les interactions soluté–solvant sont fortes : le glucose est très soluble dans l’eau.' },
        { type: 'p', text: '2. L’eau est polaire, le cyclohexane apolaire : ils sont **non miscibles**. On observe deux phases ; le cyclohexane, moins dense, forme la phase supérieure, l’eau la phase inférieure.' },
        { type: 'p', text: '3. Masse maximale dissoute dans 50 mL : $m_{max} = s \\times V = 360 \\times 0{,}050 = 18$ g. On a introduit 20 g > 18 g : environ 2 g de sel ne se dissolvent pas, la solution est **saturée**.' },
        { type: 'p', text: '4. Le cyclohexane est apolaire : il ne peut ni dissocier le cristal ionique ni solvater les ions (pas de charges partielles pour interagir avec eux). Les interactions entre ions dans le cristal restent bien plus fortes : NaCl ne se dissout pas.' },
      ],
    },
    {
      id: 'pc04-ex7',
      title: 'Extraction du diiode',
      difficulty: 2,
      duration: 20,
      tags: ['extraction', 'ampoule à décanter'],
      statement: [
        { type: 'p', text: 'On dispose de 50 mL d’une solution aqueuse brune de diiode I₂ (concentration 0,20 g·L⁻¹) et l’on souhaite extraire le diiode.' },
        {
          type: 'table',
          headers: ['', 'eau', 'éthanol', 'cyclohexane', 'dichlorométhane'],
          rows: [
            ['Solubilité de I₂ à 20 °C', '0,3 g·L⁻¹', '≈ 200 g·L⁻¹', '≈ 25 g·L⁻¹', '≈ 30 g·L⁻¹'],
            ['Densité', '1,00', '0,79', '0,78', '1,33'],
            ['Miscibilité avec l’eau', '—', 'totale', 'nulle', 'nulle'],
            ['Pictogrammes', '—', 'inflammable', 'inflammable, nocif, environnement', 'nocif (cancérogène suspecté)'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Pourquoi le diiode est-il peu soluble dans l’eau ? (La molécule I–I est formée de deux atomes identiques.)',
            'Quels solvants peuvent convenir ? Lequel faut-il éliminer et pourquoi ?',
            'On choisit le cyclohexane. Décrire le protocole d’extraction (matériel, gestes).',
            'Faire un schéma de l’ampoule après décantation : position et couleur des phases.',
            'Pourquoi le cyclohexane peut-il être préféré au dichlorométhane ? Avec le dichlorométhane, où serait la phase organique ?',
          ],
        },
      ],
      hints: ['Un solvant extracteur doit être non miscible avec l’eau.', 'La phase la plus dense est en bas.'],
      solution: [
        { type: 'p', text: '1. La liaison I–I relie deux atomes identiques : elle n’est pas polarisée, la molécule I₂ est **apolaire**. Elle interagit peu avec l’eau, solvant polaire : elle y est peu soluble.' },
        { type: 'p', text: '2. Le solvant doit être non miscible avec l’eau et dissoudre beaucoup mieux le diiode que l’eau. Cyclohexane (25 g·L⁻¹ ≫ 0,3 g·L⁻¹) et dichlorométhane conviennent. L’**éthanol est à éliminer** : bien qu’il dissolve très bien le diiode, il est miscible avec l’eau, on n’obtiendrait pas deux phases.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Robinet fermé, verser les 50 mL de solution aqueuse et environ 15 mL de cyclohexane dans une ampoule à décanter (sous la hotte, avec gants et lunettes).',
            'Boucher, agiter en retournant l’ampoule et dégazer régulièrement en ouvrant le robinet, ampoule tête en bas.',
            'Replacer l’ampoule sur son support, ôter le bouchon, laisser décanter.',
            'Recueillir la phase aqueuse inférieure dans un bécher, puis la phase organique dans un autre récipient.',
          ],
        },
        { type: 'p', text: '4. Phase supérieure : cyclohexane (d = 0,78) contenant le diiode, colorée en **violet/rose**. Phase inférieure : eau (d = 1,00), presque décolorée.' },
        { type: 'p', text: '5. Le dichlorométhane est suspecté cancérogène : le cyclohexane, bien qu’inflammable, présente moins de risques pour la santé. Avec le dichlorométhane (d = 1,33 > 1,00), la phase organique serait en **bas**.' },
      ],
    },
    {
      id: 'pc04-ex8',
      title: 'Le pouvoir lavant d’un savon (type bac)',
      difficulty: 3,
      duration: 25,
      tags: ['amphiphile', 'savon', 'micelle', 'type bac'],
      statement: [
        { type: 'p', text: 'L’oléate de sodium, constituant du savon de Marseille, a pour formule CH₃–(CH₂)₇–CH=CH–(CH₂)₇–COO⁻ Na⁺. Il est obtenu à partir de l’huile d’olive.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Le savon est un solide ionique. Écrire l’équation de sa dissolution dans l’eau (on notera RCOO⁻ l’ion oléate).',
            'Établir le schéma de Lewis du groupe carboxylate –COO⁻ sachant qu’un O est doublement lié à C et que l’autre O, lié par une simple liaison, porte la charge négative.',
            'Identifier la partie hydrophile et la partie lipophile de l’ion oléate. Justifier les termes. Comment qualifie-t-on une telle espèce ?',
            'Expliquer, schéma à l’appui, comment l’ion oléate permet d’éliminer une tache d’huile sur un tissu.',
            'Pourquoi les micelles ne se regroupent-elles pas en une seule grosse goutte ?',
            'En Bretagne, l’eau est douce ; en région parisienne, elle est riche en ions Ca²⁺. Dans quelle région le savon est-il le plus efficace ? Justifier.',
          ],
        },
      ],
      hints: ['La tête chargée –COO⁻ interagit fortement avec l’eau polaire.', 'Les micelles portent toutes des charges négatives en surface.'],
      solution: [
        { type: 'p', text: '1. RCOONa(s) → RCOO⁻(aq) + Na⁺(aq).' },
        { type: 'p', text: '2. Le carbone forme 4 liaisons : une avec la chaîne R, une double avec un O, une simple avec l’autre O. L’O doublement lié porte 2 doublets non liants ; l’O simplement lié porte **3 doublets non liants** et la charge −. Vérification de cet O : il « possède » 6 électrons non liants + 1 de la liaison = 7 électrons, soit un de plus que l’atome isolé (6) : il porte bien la charge −1 ; il est entouré de 8 électrons (octet).' },
        { type: 'p', text: '3. **Tête hydrophile** : le groupe –COO⁻, chargé, qui interagit fortement avec les molécules d’eau polaires (hydratation, ponts H avec les O). **Queue lipophile** : la longue chaîne carbonée de 17 atomes C, apolaire, qui interagit avec les corps gras (apolaires) par interactions de Van der Waals et « fuit » l’eau. L’ion possédant les deux parties est dit **amphiphile** (c’est un tensioactif).' },
        { type: 'p', text: '4. Au contact de la tache, les queues lipophiles pénètrent dans l’huile tandis que les têtes restent dans l’eau. Par agitation, l’huile se fragmente en gouttelettes entourées d’ions oléate : ce sont des **micelles** (cœur gras + queues, surface formée des têtes –COO⁻ au contact de l’eau). Elles sont dispersées dans l’eau puis évacuées au rinçage.' },
        { type: 'p', text: '5. La surface de chaque micelle est chargée négativement : les micelles se **repoussent** (répulsion électrostatique) et restent dispersées.' },
        { type: 'p', text: '6. En eau dure, les ions Ca²⁺ forment avec les ions oléate un précipité (oléate de calcium) : une partie du savon est perdue, il mousse moins. Le savon est donc plus efficace en **Bretagne** (eau douce).' },
      ],
    },
    {
      id: 'pc04-ex9',
      title: 'Extraire la caféine du thé (type bac)',
      difficulty: 3,
      duration: 30,
      tags: ['extraction', 'solubilité', 'polarité', 'type bac'],
      statement: [
        { type: 'p', text: 'Pour extraire la caféine d’une infusion de thé, on dispose des données suivantes à 25 °C :' },
        {
          type: 'table',
          headers: ['Solvant', 'Solubilité de la caféine', 'Densité', 'Miscibilité avec l’eau', 'T_éb'],
          rows: [
            ['eau', '22 g·L⁻¹ (à 25 °C) ; 180 g·L⁻¹ (à 80 °C)', '1,00', '—', '100 °C'],
            ['dichlorométhane', '≈ 140 g·L⁻¹', '1,33', 'non', '40 °C'],
            ['éthanoate d’éthyle', '≈ 25 g·L⁻¹', '0,90', 'très faible', '77 °C'],
            ['acétone', '≈ 20 g·L⁻¹', '0,79', 'totale', '56 °C'],
          ],
        },
        { type: 'p', text: 'Protocole : on fait infuser 20 g de feuilles de thé dans 200 mL d’eau bouillante, on filtre, on refroidit l’infusion et on y ajoute du carbonate de sodium. On réalise ensuite deux extractions successives avec 20 mL de solvant.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Pourquoi réaliser l’infusion dans de l’eau bouillante plutôt que froide ?',
            'Quel solvant extracteur choisir ? Justifier en utilisant tous les critères pertinents.',
            'Dans l’ampoule à décanter, la phase contenant la caféine est-elle en haut ou en bas ?',
            'Pourquoi deux extractions de 20 mL plutôt qu’une de 40 mL ?',
            'Après séchage de la phase organique, on évapore le solvant. Pourquoi est-ce facile avec ce solvant ? On obtient 0,42 g de caféine. Sachant que les feuilles de thé contiennent environ 3 % en masse de caféine, calculer le pourcentage de caféine récupérée.',
          ],
        },
      ],
      hints: ['La solubilité dépend de la température.', 'Comparer la masse obtenue à 3 % de 20 g.'],
      solution: [
        { type: 'p', text: '1. La solubilité de la caféine dans l’eau augmente fortement avec la température (180 g·L⁻¹ à 80 °C contre 22 g·L⁻¹ à 25 °C) : l’eau chaude extrait davantage de caféine des feuilles.' },
        { type: 'p', text: '2. L’acétone est éliminée : miscible avec l’eau. L’éthanoate d’éthyle ne dissout pas mieux la caféine que l’eau (25 contre 22 g·L⁻¹) : extraction peu efficace. Le **dichlorométhane** est non miscible avec l’eau et la caféine y est environ 6 fois plus soluble que dans l’eau à 25 °C : c’est le solvant le plus adapté (manipulation sous hotte, avec gants, car il est nocif).' },
        { type: 'p', text: '3. Le dichlorométhane (d = 1,33) est plus dense que l’eau : la phase organique contenant la caféine est en **bas**.' },
        { type: 'p', text: '4. À volume total égal, plusieurs extractions successives avec de petits volumes extraient une plus grande quantité de soluté qu’une seule extraction avec un grand volume.' },
        { type: 'p', text: '5. Le dichlorométhane bout à 40 °C : il s’évapore facilement, sans chauffer fortement la caféine. Masse de caféine dans les feuilles : $m = 0{,}03 \\times 20 = 0{,}6$ g. Pourcentage récupéré : $\\dfrac{0{,}42}{0{,}6} \\times 100 = 70\\ \\%$ (une partie reste dans les feuilles et dans la phase aqueuse).' },
      ],
    },
  ],

  /* ================================================================ */
  representations: [
    {
      type: 'widget',
      id: 'lewis-molecules',
      props: { molecule: 'H2O' },
      title: 'Explorer les schémas de Lewis',
      caption: 'Changez de molécule : doublets liants/non liants, géométrie, électronégativités et polarité.',
    },
    {
      type: 'widget',
      id: 'lewis-molecules',
      props: { molecule: 'CO2' },
      title: 'CO₂ : des liaisons polarisées dans une molécule apolaire',
      caption: 'Comparer avec H₂O : c’est la géométrie qui décide de la polarité.',
    },
    { type: 'svg', svg: geometryPanel(), caption: 'Les quatre géométries de base à connaître.' },
    { type: 'svg', svg: solvationSvg(), caption: 'Dissolution : hydratation des ions par les molécules d’eau polaires.' },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Combien de doublets non liants porte l’atome d’azote dans NH₃ ?',
          choices: ['0', '1', '2', '3'],
          answer: 1,
          explanation: 'N a 5 électrons de valence : 3 sont engagés dans les liaisons N–H, les 2 restants forment 1 doublet non liant.',
        },
        {
          question: 'Quelle entité présente une lacune électronique ?',
          choices: ['H₃O⁺', 'NH₄⁺', 'BH₃', 'HO⁻'],
          answer: 2,
          explanation: 'Le bore de BH₃ n’est entouré que de 6 électrons : il lui manque un doublet.',
        },
        {
          question: 'La géométrie de la molécule d’eau est :',
          choices: ['linéaire', 'coudée', 'pyramidale', 'tétraédrique'],
          answer: 1,
          explanation: '4 doublets en tétraèdre autour de O, dont 2 non liants : les atomes H–O–H forment un « V ».',
        },
        {
          question: 'Laquelle de ces molécules est apolaire ?',
          choices: ['HCl', 'NH₃', 'CCl₄', 'CH₂Cl₂'],
          answer: 2,
          explanation: 'CCl₄ : liaisons polarisées mais disposition tétraédrique symétrique, donc G⁺ = G⁻.',
        },
        {
          question: 'Un pont hydrogène peut s’établir entre deux molécules de :',
          choices: ['méthane CH₄', 'méthanol CH₃OH', 'méthoxyméthane CH₃OCH₃', 'dichlore Cl₂'],
          answer: 1,
          explanation: 'Il faut un H lié à N, O ou F : seul le méthanol possède un groupe O–H.',
        },
        {
          question: 'L’équation de dissolution du chlorure de fer(III) FeCl₃ s’écrit :',
          choices: ['FeCl₃(s) → Fe³⁺(aq) + Cl₃⁻(aq)', 'FeCl₃(s) → Fe³⁺(aq) + 3 Cl⁻(aq)', 'FeCl₃(s) → Fe⁺(aq) + 3 Cl⁻(aq)', 'FeCl₃(aq) → Fe³⁺(s) + 3 Cl⁻(s)'],
          answer: 1,
          explanation: 'Conservation des éléments et de la charge : 3 + 3 × (−1) = 0.',
        },
        {
          question: 'Pour extraire une espèce d’une solution aqueuse, on ne peut pas utiliser :',
          choices: ['le cyclohexane', 'le dichlorométhane', 'l’éthanol', 'l’éthanoate d’éthyle'],
          answer: 2,
          explanation: 'L’éthanol est miscible avec l’eau : pas de séparation en deux phases.',
        },
        {
          question: 'Dans un savon, la partie hydrophile de l’ion carboxylate est :',
          choices: ['la chaîne carbonée', 'le groupe –COO⁻', 'l’ion Na⁺', 'la double liaison C=C'],
          answer: 1,
          explanation: 'Le groupe chargé –COO⁻ interagit fortement avec l’eau.',
        },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Règle de l’octet', back: 'Dans une entité stable, C, N, O et les halogènes s’entourent de 8 électrons (4 doublets).' },
        { front: 'Doublet non liant', back: 'Doublet d’électrons de valence appartenant à un seul atome ; trait placé à côté du symbole.' },
        { front: 'Lacune électronique', back: 'Absence d’un doublet nécessaire pour l’octet/duet ; rectangle vide (H⁺, BH₃, AlCl₃).' },
        { front: 'Nombre de doublets d’un ion', back: '(somme des électrons de valence − charge) / 2. Ex. H₃O⁺ : (3 + 6 − 1)/2 = 4.' },
        { front: 'Géométrie de NH₃', back: 'Pyramidale (3 liants + 1 non liant, angle ≈ 107°).' },
        { front: 'Électronégativité', back: 'Aptitude d’un atome à attirer les électrons d’une liaison ; croît vers la droite et vers le haut du tableau.' },
        { front: 'Liaison polarisée', back: 'Liaison entre atomes tels que Δχ ≥ 0,4 environ ; δ⁻ sur le plus électronégatif.' },
        { front: 'Molécule polaire', back: 'G⁺ (barycentre des charges positives) ≠ G⁻ (barycentre des charges négatives).' },
        { front: 'Interaction de Van der Waals', back: 'Interaction électrostatique faible entre dipôles (permanents ou induits) ; croît avec la taille et la polarité.' },
        { front: 'Pont hydrogène', back: 'H lié à N, O ou F (δ⁺) attiré par un doublet non liant de N, O ou F voisin. ≈ 10–40 kJ/mol.' },
        { front: 'Trois étapes de la dissolution', back: 'Dissociation, solvatation (hydratation), dispersion.' },
        { front: 'Solubilité', back: 'Masse (ou quantité) maximale de soluté dissoute par litre de solution à une température donnée.' },
        { front: 'Critères du solvant extracteur', back: 'Non miscible avec le solvant initial ; espèce beaucoup plus soluble dedans ; peu dangereux.' },
        { front: 'Position des phases dans l’ampoule', back: 'La phase la plus dense est en bas.' },
        { front: 'Amphiphile', back: 'Espèce possédant une partie hydrophile et une partie lipophile (ex. ions carboxylate des savons).' },
        { front: 'Micelle', back: 'Agrégat sphérique d’ions amphiphiles : têtes hydrophiles vers l’eau, queues lipophiles au centre (avec la graisse).' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter le texte',
      text: 'Dans la molécule d’eau, l’atome d’oxygène est entouré de deux doublets liants et de deux doublets {{non liants}}. Ces quatre doublets se repoussent et se disposent selon un {{tétraèdre}} : la molécule est {{coudée}}. L’oxygène étant plus {{électronégatif}} que l’hydrogène, les liaisons O–H sont {{polarisées}} et, la molécule n’étant pas symétrique, elle est {{polaire}}. Entre molécules d’eau s’établissent des ponts {{hydrogène}}, ce qui explique la température d’ébullition élevée de l’eau.',
    },
    {
      type: 'matching',
      title: 'Associer chaque entité à sa géométrie',
      pairs: [
        { left: 'CH₄', right: 'tétraédrique' },
        { left: 'NH₃', right: 'pyramidale' },
        { left: 'H₂O', right: 'coudée' },
        { left: 'CO₂', right: 'linéaire' },
        { left: 'CH₂O (méthanal)', right: 'plane trigonale' },
      ],
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre les étapes d’une extraction liquide-liquide',
      items: [
        'Verser la solution et le solvant extracteur dans l’ampoule, robinet fermé',
        'Boucher, agiter et dégazer',
        'Laisser décanter, bouchon ôté',
        'Recueillir la phase inférieure puis la phase supérieure',
        'Sécher la phase organique et évaporer le solvant',
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Une molécule dont toutes les liaisons sont polarisées est forcément polaire.', answer: false, explanation: 'Contre-exemples : CO₂, CCl₄ (symétrie).' },
        { text: 'L’hydrogène est toujours placé en bout de chaîne dans un schéma de Lewis.', answer: true, explanation: 'Il ne forme qu’une liaison (duet).' },
        { text: 'Lors de l’ébullition de l’eau, des liaisons O–H sont rompues.', answer: false, explanation: 'On rompt des ponts hydrogène entre molécules ; les molécules H₂O restent intactes.' },
        { text: 'Le dichlorométhane forme la phase inférieure lors d’une extraction d’une solution aqueuse.', answer: true, explanation: 'Sa densité (1,33) est supérieure à celle de l’eau.' },
        { text: 'La solubilité d’un solide dépend de la température.', answer: true, explanation: 'En général elle augmente avec la température.' },
        { text: 'Dans un cristal ionique, les ions sont reliés par des liaisons covalentes.', answer: false, explanation: 'La cohésion est assurée par des interactions électrostatiques entre ions de signes opposés.' },
      ],
    },
    {
      type: 'reveal',
      title: 'Défi : pourquoi le sel ne se dissout-il pas dans l’huile ?',
      content: [
        { type: 'p', text: 'L’huile est un mélange d’espèces apolaires. Elle ne peut ni affaiblir les fortes interactions électrostatiques entre les ions Na⁺ et Cl⁻ du cristal, ni solvater ces ions : il n’existe pas d’interaction soluté–solvant suffisante pour compenser la rupture du cristal. Le sel reste donc solide au fond de l’huile.' },
      ],
    },
  ],
}

export default chapter
