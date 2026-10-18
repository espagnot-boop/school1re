/** Code génétique standard (ARNm → acides aminés), ordre U C A G. */
const BASES = ['U', 'C', 'A', 'G'] as const
const AA_STRING = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG'

export type AaClass = 'apolaire' | 'polaire' | 'basique' | 'acide' | 'stop'

export interface AminoAcid {
  letter: string
  abbr: string
  name: string
  cls: AaClass
}

export const AMINO: Record<string, AminoAcid> = {
  F: { letter: 'F', abbr: 'Phe', name: 'Phénylalanine', cls: 'apolaire' },
  L: { letter: 'L', abbr: 'Leu', name: 'Leucine', cls: 'apolaire' },
  S: { letter: 'S', abbr: 'Ser', name: 'Sérine', cls: 'polaire' },
  Y: { letter: 'Y', abbr: 'Tyr', name: 'Tyrosine', cls: 'polaire' },
  C: { letter: 'C', abbr: 'Cys', name: 'Cystéine', cls: 'polaire' },
  W: { letter: 'W', abbr: 'Trp', name: 'Tryptophane', cls: 'apolaire' },
  P: { letter: 'P', abbr: 'Pro', name: 'Proline', cls: 'apolaire' },
  H: { letter: 'H', abbr: 'His', name: 'Histidine', cls: 'basique' },
  Q: { letter: 'Q', abbr: 'Gln', name: 'Glutamine', cls: 'polaire' },
  R: { letter: 'R', abbr: 'Arg', name: 'Arginine', cls: 'basique' },
  I: { letter: 'I', abbr: 'Ile', name: 'Isoleucine', cls: 'apolaire' },
  M: { letter: 'M', abbr: 'Met', name: 'Méthionine', cls: 'apolaire' },
  T: { letter: 'T', abbr: 'Thr', name: 'Thréonine', cls: 'polaire' },
  N: { letter: 'N', abbr: 'Asn', name: 'Asparagine', cls: 'polaire' },
  K: { letter: 'K', abbr: 'Lys', name: 'Lysine', cls: 'basique' },
  V: { letter: 'V', abbr: 'Val', name: 'Valine', cls: 'apolaire' },
  A: { letter: 'A', abbr: 'Ala', name: 'Alanine', cls: 'apolaire' },
  D: { letter: 'D', abbr: 'Asp', name: 'Aspartate', cls: 'acide' },
  E: { letter: 'E', abbr: 'Glu', name: 'Glutamate', cls: 'acide' },
  G: { letter: 'G', abbr: 'Gly', name: 'Glycine', cls: 'apolaire' },
  '*': { letter: '*', abbr: 'Stop', name: 'Codon stop', cls: 'stop' },
}

export const CLASS_COLOR: Record<AaClass, string> = {
  apolaire: 'hsl(45 93% 47%)',
  polaire: 'hsl(173 80% 40%)',
  basique: 'hsl(217 91% 60%)',
  acide: 'hsl(0 84% 60%)',
  stop: 'hsl(var(--foreground))',
}
export const CLASS_LABEL: Record<AaClass, string> = {
  apolaire: 'apolaire (hydrophobe)',
  polaire: 'polaire neutre',
  basique: 'basique (+)',
  acide: 'acide (−)',
  stop: 'stop',
}

/** Codon ARN (3 lettres A,C,G,U) → lettre d'acide aminé ('*' = stop), ou '' si invalide. */
export function codonToAa(codon: string): string {
  if (codon.length !== 3) return ''
  const i = BASES.indexOf(codon[0] as never)
  const j = BASES.indexOf(codon[1] as never)
  const k = BASES.indexOf(codon[2] as never)
  if (i < 0 || j < 0 || k < 0) return ''
  return AA_STRING[16 * i + 4 * j + k]
}

export const RNA_BASES = BASES

export function complementDna(b: string): string {
  return b === 'A' ? 'T' : b === 'T' ? 'A' : b === 'C' ? 'G' : b === 'G' ? 'C' : b
}
export const toRna = (dna: string) => dna.replace(/T/g, 'U')

/** Garde uniquement A, T, C, G (majuscules). */
export function cleanDna(s: string, max = 120): string {
  return s.toUpperCase().replace(/U/g, 'T').replace(/[^ATCG]/g, '').slice(0, max)
}

/** Traduction d'un brin codant (ADN, 5'→3') à partir du premier ATG. */
export function translateFromStart(dna: string): { start: number; codons: string[]; aas: string[]; stopped: boolean } {
  const start = dna.indexOf('ATG')
  if (start < 0) return { start: -1, codons: [], aas: [], stopped: false }
  const codons: string[] = []
  const aas: string[] = []
  let stopped = false
  for (let i = start; i + 3 <= dna.length; i += 3) {
    const c = toRna(dna.slice(i, i + 3))
    const aa = codonToAa(c)
    codons.push(c)
    aas.push(aa)
    if (aa === '*') {
      stopped = true
      break
    }
  }
  return { start, codons, aas, stopped }
}
