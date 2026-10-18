/**
 * Données des molécules pour le widget lewis-molecules.
 * 2D : schéma de Lewis (unités = longueur de liaison, y vers le haut, angles en degrés).
 * 3D : coordonnées en ångströms (longueurs et angles expérimentaux, phase gazeuse).
 */

export type El = 'H' | 'C' | 'N' | 'O' | 'Cl'
export type V3 = [number, number, number]

export const EN: Record<El, number> = { H: 2.2, C: 2.55, N: 3.04, O: 3.44, Cl: 3.16 } // Pauling
export const VALENCE: Record<El, number> = { H: 1, C: 4, N: 5, O: 6, Cl: 7 }
export const Z: Record<El, number> = { H: 1, C: 6, N: 7, O: 8, Cl: 17 }
export const CONFIG: Record<El, string> = { H: '1s^1', C: '1s^2\\,2s^2\\,2p^2', N: '1s^2\\,2s^2\\,2p^3', O: '1s^2\\,2s^2\\,2p^4', Cl: '1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^5' }

export interface MolAtom {
  el: El
  x: number
  y: number
  /** directions des doublets non liants (degrés, 0 = droite, 90 = haut) */
  lp?: number[]
  charge?: 1 | -1
}

export interface Mol {
  id: string
  formula: string
  name: string
  atoms: MolAtom[]
  bonds: [number, number, 1 | 2 | 3][]
  xyz: V3[]
  geometry: string
  /** description de l'environnement de l'atome (ou des atomes) central(aux) */
  central?: string
  vsepr?: string
  angles: string[]
  ion?: boolean
  note: string
}

const D = Math.PI / 180
const pol = (r: number, deg: number): [number, number] => [r * Math.cos(deg * D), r * Math.sin(deg * D)]

/** Pyramide : atome central en O, n=3 voisins à la distance d avec l'angle θ entre liaisons, pointe vers +y */
function pyramid(d: number, theta: number, phi0 = 90): V3[] {
  const c = Math.cos(theta * D)
  // -r²/2 + a² = d² c ; r² + a² = d²
  const r = Math.sqrt(((1 - c) * d * d) / 1.5)
  const a = Math.sqrt(d * d - r * r)
  return [0, 120, 240].map((p) => [r * Math.cos((p + phi0) * D), -a, r * Math.sin((p + phi0) * D)] as V3)
}

// ---- Coordonnées 3D calculées
const ch4 = (d: number): V3[] => [[0, 0, 0], [0, d, 0], ...pyramid(d, 109.47)]

const ch3ohXYZ = (): V3[] => {
  const dCH = 1.09
  const xH = -dCH / 3
  const rH = dCH * Math.sqrt(8 / 9)
  const Hc = [180, 60, -60].map((p) => [xH, rH * Math.cos(p * D), rH * Math.sin(p * D)] as V3)
  const dOH = 0.96
  const a = 180 - 108.5
  return [[0, 0, 0], Hc[1], Hc[0], Hc[2], [1.43, 0, 0], [1.43 + dOH * Math.cos(a * D), dOH * Math.sin(a * D), 0]]
}

const h2o2XYZ = (): V3[] => {
  const dOO = 1.475
  const dOH = 0.95
  const ang = 94.8
  const dih = 111.5
  const h = dOO / 2
  const H1: V3 = [-h + dOH * Math.cos(ang * D), dOH * Math.sin(ang * D), 0]
  const s = dOH * Math.sin(ang * D)
  const H2: V3 = [h - dOH * Math.cos(ang * D), s * Math.cos(dih * D), s * Math.sin(dih * D)]
  return [H1, [-h, 0, 0], [h, 0, 0], H2]
}

const c2h4XYZ = (): V3[] => {
  const h = 1.339 / 2
  const a = 180 - 121.3
  const [dx, dy] = pol(1.087, a)
  return [[-h, 0, 0], [h, 0, 0], [-h - dx, dy, 0], [-h - dx, -dy, 0], [h + dx, dy, 0], [h + dx, -dy, 0]]
}

const ch2oXYZ = (): V3[] => {
  const half = 116.5 / 2
  const [sx, sy] = [Math.sin(half * D) * 1.11, -Math.cos(half * D) * 1.11]
  return [[0, 0, 0], [0, 1.21, 0], [-sx, sy, 0], [sx, sy, 0]]
}

const h2oXYZ = (): V3[] => {
  const half = 104.5 / 2
  return [[0, 0, 0], [-Math.sin(half * D) * 0.958, -Math.cos(half * D) * 0.958, 0], [Math.sin(half * D) * 0.958, -Math.cos(half * D) * 0.958, 0]]
}

const tri = (dir: number): [number, number] => pol(1, dir)

export const MOLECULES: Mol[] = [
  {
    id: 'H2',
    formula: 'H2',
    name: 'dihydrogène',
    atoms: [
      { el: 'H', x: -0.5, y: 0 },
      { el: 'H', x: 0.5, y: 0 },
    ],
    bonds: [[0, 1, 1]],
    xyz: [[-0.37, 0, 0], [0.37, 0, 0]],
    geometry: 'linéaire',
    angles: ['d(H–H) = 74 pm'],
    note: 'Chaque hydrogène partage son unique électron : chacun est entouré de 2 électrons (règle du duet).',
  },
  {
    id: 'Cl2',
    formula: 'Cl2',
    name: 'dichlore',
    atoms: [
      { el: 'Cl', x: -0.5, y: 0, lp: [90, 180, 270] },
      { el: 'Cl', x: 0.5, y: 0, lp: [90, 0, 270] },
    ],
    bonds: [[0, 1, 1]],
    xyz: [[-0.994, 0, 0], [0.994, 0, 0]],
    geometry: 'linéaire',
    angles: ['d(Cl–Cl) = 199 pm'],
    note: 'Molécule diatomique homonucléaire : liaison non polarisée, molécule apolaire.',
  },
  {
    id: 'HCl',
    formula: 'HCl',
    name: 'chlorure d’hydrogène',
    atoms: [
      { el: 'H', x: -0.5, y: 0 },
      { el: 'Cl', x: 0.5, y: 0, lp: [90, 0, 270] },
    ],
    bonds: [[0, 1, 1]],
    xyz: [[-1.275, 0, 0], [0, 0, 0]],
    geometry: 'linéaire',
    angles: ['d(H–Cl) = 127 pm'],
    note: 'Le chlore, plus électronégatif, attire le doublet liant : la liaison est polarisée, la molécule est polaire (très soluble dans l’eau).',
  },
  {
    id: 'O2',
    formula: 'O2',
    name: 'dioxygène',
    atoms: [
      { el: 'O', x: -0.5, y: 0, lp: [125, 235] },
      { el: 'O', x: 0.5, y: 0, lp: [55, 305] },
    ],
    bonds: [[0, 1, 2]],
    xyz: [[-0.604, 0, 0], [0.604, 0, 0]],
    geometry: 'linéaire',
    angles: ['d(O=O) = 121 pm'],
    note: 'Liaison double : 2 doublets liants. Chaque oxygène porte 2 doublets non liants et respecte l’octet. (Le modèle de Lewis n’explique pas le magnétisme de O₂, hors programme.)',
  },
  {
    id: 'N2',
    formula: 'N2',
    name: 'diazote',
    atoms: [
      { el: 'N', x: -0.5, y: 0, lp: [180] },
      { el: 'N', x: 0.5, y: 0, lp: [0] },
    ],
    bonds: [[0, 1, 3]],
    xyz: [[-0.549, 0, 0], [0.549, 0, 0]],
    geometry: 'linéaire',
    angles: ['d(N≡N) = 110 pm'],
    note: 'Liaison triple très solide (945 kJ/mol) : le diazote de l’air est très peu réactif.',
  },
  {
    id: 'H2O',
    formula: 'H2O',
    name: 'eau',
    atoms: [
      { el: 'O', x: 0, y: 0, lp: [55, 125] },
      { el: 'H', x: tri(217.75)[0], y: tri(217.75)[1] },
      { el: 'H', x: tri(322.25)[0], y: tri(322.25)[1] },
    ],
    bonds: [[0, 1, 1], [0, 2, 1]],
    xyz: h2oXYZ(),
    geometry: 'coudée',
    central: 'O : 2 doublets liants + 2 doublets non liants → 4 doublets répartis selon un tétraèdre',
    vsepr: 'AX_2E_2',
    angles: ['HÔH = 104,5°'],
    note: 'Les doublets non liants repoussent davantage que les doublets liants : l’angle (104,5°) est inférieur à 109,5°. G⁺ ≠ G⁻ : molécule polaire.',
  },
  {
    id: 'NH3',
    formula: 'NH3',
    name: 'ammoniac',
    atoms: [
      { el: 'N', x: 0, y: 0, lp: [90] },
      { el: 'H', x: -1, y: 0 },
      { el: 'H', x: 1, y: 0 },
      { el: 'H', x: 0, y: -1 },
    ],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]],
    xyz: [[0, 0, 0], ...pyramid(1.012, 106.7)],
    geometry: 'pyramidale à base triangulaire',
    central: 'N : 3 doublets liants + 1 doublet non liant → 4 doublets répartis selon un tétraèdre',
    vsepr: 'AX_3E_1',
    angles: ['HN̂H ≈ 107°'],
    note: 'L’azote est au sommet de la pyramide, le doublet non liant pointe vers le haut. Molécule polaire.',
  },
  {
    id: 'CH4',
    formula: 'CH4',
    name: 'méthane',
    atoms: [
      { el: 'C', x: 0, y: 0 },
      { el: 'H', x: 0, y: 1 },
      { el: 'H', x: -1, y: 0 },
      { el: 'H', x: 1, y: 0 },
      { el: 'H', x: 0, y: -1 },
    ],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
    xyz: ch4(1.087),
    geometry: 'tétraédrique',
    central: 'C : 4 doublets liants, aucun non liant → tétraèdre régulier',
    vsepr: 'AX_4',
    angles: ['HĈH = 109,5°'],
    note: 'Le schéma de Lewis plan ne montre pas la géométrie : en réalité les 4 H occupent les sommets d’un tétraèdre. Liaisons C–H peu polarisées (Δχ = 0,35) : molécule apolaire.',
  },
  {
    id: 'CO2',
    formula: 'CO2',
    name: 'dioxyde de carbone',
    atoms: [
      { el: 'O', x: -1, y: 0, lp: [125, 235] },
      { el: 'C', x: 0, y: 0 },
      { el: 'O', x: 1, y: 0, lp: [55, 305] },
    ],
    bonds: [[0, 1, 2], [1, 2, 2]],
    xyz: [[-1.16, 0, 0], [0, 0, 0], [1.16, 0, 0]],
    geometry: 'linéaire',
    central: 'C : 2 liaisons doubles, aucun doublet non liant → 2 directions opposées',
    vsepr: 'AX_2',
    angles: ['OĈO = 180°'],
    note: 'Les liaisons C=O sont polarisées (Δχ = 0,89) mais, par symétrie, G⁺ et G⁻ sont confondus sur le carbone : molécule apolaire.',
  },
  {
    id: 'HCN',
    formula: 'HCN',
    name: 'cyanure d’hydrogène',
    atoms: [
      { el: 'H', x: -1, y: 0 },
      { el: 'C', x: 0, y: 0 },
      { el: 'N', x: 1, y: 0, lp: [0] },
    ],
    bonds: [[0, 1, 1], [1, 2, 3]],
    xyz: [[-1.066, 0, 0], [0, 0, 0], [1.156, 0, 0]],
    geometry: 'linéaire',
    central: 'C : 1 liaison simple + 1 liaison triple, aucun doublet non liant → 2 directions opposées',
    vsepr: 'AX_2',
    angles: ['HĈN = 180°'],
    note: 'La liaison C≡N est polarisée (Δχ = 0,49) et rien ne la compense : molécule polaire.',
  },
  {
    id: 'C2H4',
    formula: 'C2H4',
    name: 'éthylène (éthène)',
    atoms: [
      { el: 'C', x: -0.5, y: 0 },
      { el: 'C', x: 0.5, y: 0 },
      { el: 'H', x: -1.366, y: 0.5 },
      { el: 'H', x: -1.366, y: -0.5 },
      { el: 'H', x: 1.366, y: 0.5 },
      { el: 'H', x: 1.366, y: -0.5 },
    ],
    bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]],
    xyz: c2h4XYZ(),
    geometry: 'plane',
    central: 'Chaque C : 1 liaison double + 2 simples (3 directions) → trigonal plan',
    vsepr: 'AX_3',
    angles: ['HĈH ≈ 117°', 'HĈC ≈ 121°'],
    note: 'Les 6 atomes sont dans un même plan ; la double liaison empêche la rotation autour de l’axe C=C (isomérie Z/E pour les alcènes substitués). Molécule apolaire.',
  },
  {
    id: 'C2H2',
    formula: 'C2H2',
    name: 'acétylène (éthyne)',
    atoms: [
      { el: 'H', x: -1.5, y: 0 },
      { el: 'C', x: -0.5, y: 0 },
      { el: 'C', x: 0.5, y: 0 },
      { el: 'H', x: 1.5, y: 0 },
    ],
    bonds: [[0, 1, 1], [1, 2, 3], [2, 3, 1]],
    xyz: [[-1.666, 0, 0], [-0.603, 0, 0], [0.603, 0, 0], [1.666, 0, 0]],
    geometry: 'linéaire',
    central: 'Chaque C : 1 liaison triple + 1 simple → 2 directions opposées',
    vsepr: 'AX_2',
    angles: ['HĈC = 180°'],
    note: 'Molécule linéaire et symétrique : apolaire.',
  },
  {
    id: 'CH2O',
    formula: 'CH2O',
    name: 'méthanal (formaldéhyde)',
    atoms: [
      { el: 'C', x: 0, y: 0 },
      { el: 'O', x: 1, y: 0, lp: [55, 305] },
      { el: 'H', x: -0.5, y: 0.866 },
      { el: 'H', x: -0.5, y: -0.866 },
    ],
    bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 1]],
    xyz: ch2oXYZ(),
    geometry: 'trigonale plane',
    central: 'C : 1 liaison double + 2 simples → 3 directions dans un plan',
    vsepr: 'AX_3',
    angles: ['HĈH ≈ 116,5°', 'HĈO ≈ 122°'],
    note: 'Groupe carbonyle C=O polarisé : molécule polaire. C’est le plus simple des aldéhydes.',
  },
  {
    id: 'CH3OH',
    formula: 'CH3OH',
    name: 'méthanol',
    atoms: [
      { el: 'C', x: 0, y: 0 },
      { el: 'H', x: 0, y: 1 },
      { el: 'H', x: -1, y: 0 },
      { el: 'H', x: 0, y: -1 },
      { el: 'O', x: 1, y: 0, lp: [90, 270] },
      { el: 'H', x: 2, y: 0 },
    ],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [4, 5, 1]],
    xyz: ch3ohXYZ(),
    geometry: 'tétraédrique autour de C, coudée autour de O',
    central: 'C : 4 doublets liants (tétraèdre) ; O : 2 liants + 2 non liants (coudé)',
    vsepr: 'AX_4 \\ (\\mathrm{C}),\\ AX_2E_2\\ (\\mathrm{O})',
    angles: ['HĈH ≈ 109°', 'CÔH ≈ 108,5°'],
    note: 'Le groupe hydroxyle –OH est polarisé (O–H : Δχ = 1,24 ; C–O : Δχ = 0,89) : molécule polaire, miscible à l’eau (liaisons hydrogène).',
  },
  {
    id: 'H2O2',
    formula: 'H2O2',
    name: 'peroxyde d’hydrogène (eau oxygénée)',
    atoms: [
      { el: 'H', x: -1.5, y: 0 },
      { el: 'O', x: -0.5, y: 0, lp: [90, 270] },
      { el: 'O', x: 0.5, y: 0, lp: [90, 270] },
      { el: 'H', x: 1.5, y: 0 },
    ],
    bonds: [[0, 1, 1], [1, 2, 1], [2, 3, 1]],
    xyz: h2o2XYZ(),
    geometry: 'non plane (« livre entrouvert »)',
    central: 'Chaque O : 2 liants + 2 non liants → coudé autour de chaque O',
    vsepr: 'AX_2E_2',
    angles: ['OÔH ≈ 95°', 'angle dièdre ≈ 111°'],
    note: 'Les deux liaisons O–H ne sont pas dans le même plan : G⁺ ≠ G⁻, molécule polaire. La liaison O–O, fragile, explique son caractère oxydant et sa décomposition.',
  },
  {
    id: 'NH4+',
    formula: 'NH4^+',
    name: 'ion ammonium',
    atoms: [
      { el: 'N', x: 0, y: 0, charge: 1 },
      { el: 'H', x: 0, y: 1 },
      { el: 'H', x: -1, y: 0 },
      { el: 'H', x: 1, y: 0 },
      { el: 'H', x: 0, y: -1 },
    ],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
    xyz: ch4(1.03),
    geometry: 'tétraédrique',
    central: 'N⁺ : 4 doublets liants → tétraèdre régulier',
    vsepr: 'AX_4',
    angles: ['HN̂H = 109,5°'],
    ion: true,
    note: 'NH₃ capte un ion H⁺ grâce à son doublet non liant. L’azote, entouré de 4 doublets liants (8 e⁻) mais ne « possédant » que 4 électrons au lieu de 5, porte la charge ⊕.',
  },
  {
    id: 'H3O+',
    formula: 'H3O^+',
    name: 'ion oxonium',
    atoms: [
      { el: 'O', x: 0, y: 0, lp: [90], charge: 1 },
      { el: 'H', x: -1, y: 0 },
      { el: 'H', x: 1, y: 0 },
      { el: 'H', x: 0, y: -1 },
    ],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]],
    xyz: [[0, 0, 0], ...pyramid(0.98, 111)],
    geometry: 'pyramidale à base triangulaire',
    central: 'O⁺ : 3 doublets liants + 1 non liant → tétraèdre de doublets',
    vsepr: 'AX_3E_1',
    angles: ['HÔH ≈ 111°'],
    ion: true,
    note: 'H₂O capte un ion H⁺ : l’oxygène porte alors la charge ⊕. Cet ion est responsable de l’acidité des solutions aqueuses.',
  },
]

export const findMolecule = (q?: string): Mol | undefined => {
  if (!q) return undefined
  const norm = (s: string) =>
    s
      .replace(/[₀-₉]/g, (c) => String('₀₁₂₃₄₅₆₇₈₉'.indexOf(c)))
      .replace(/⁺/g, '+')
      .replace(/\^/g, '')
      .replace(/\s/g, '')
      .toLowerCase()
  const n = norm(q)
  return MOLECULES.find((m) => norm(m.id) === n || norm(m.formula) === n || norm(m.name).startsWith(n))
}
