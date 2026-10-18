/** Scansion approchée d'un vers français (heuristiques pédagogiques, pas un phonétiseur complet). */
export type DiMode = 'auto' | 'dierese' | 'synerese'
export interface Syl {
  text: string
  mute: boolean
  clitic: boolean
  dier: boolean
  counted: boolean
  reason: string
}
export interface Glide {
  kind: 'dierese' | 'synerese'
  text: string
}
export interface Word {
  raw: string
  base: string
  syls: Syl[]
  glides: Glide[]
}
export interface Verse {
  words: Word[]
  total: number
  /** position (nombre de syllabes comptées) après laquelle on place la césure */
  cesure: number | null
  cesureNote: string
  meter: string
  wordEnds: number[]
  feminine: boolean
  notes: string[]
}

const CLITICS = new Set(['je', 'me', 'te', 'se', 'le', 'ce', 'de', 'ne', 'que'])
const NONVERB_ENT = new Set(['souvent', 'present', 'absent', 'content', 'parent', 'argent', 'serpent', 'sergent', 'accent', 'talent', 'orient', 'client', 'patient', 'ardent', 'violent', 'innocent', 'evident', 'prudent', 'different', 'excellent', 'apparent', 'recent', 'element', 'moment', 'comment', 'vraiment', 'dedans', 'tellement', 'maintenant', 'tourment', 'firmament', 'sentiment'])
const VERB_MENT = new Set(['aiment', 'ferment', 'dorment', 'mentent', 'sement', 'gemment', 'charment', 'forment', 'germent', 'calment', 'blament', 'estiment', 'nomment', 'comptent'])
const ASPIRATED = /^(haut|hach|hai[nr]|hal[eot]|ham|han[cgt]|har[dfgnpsi]|has|hat|hav|heaume|hennir|heros|heron|herse|hetre|heurt|hibou|hier[ao]|his[st]|hoc|hol|homard|hongr|honte|hoquet|hors|hotte|hou[lbsx]|hub|hue|huit|hurl|hutte|hussard|hasard|hache|hamac|hameau|handicap|harem|hareng|haricot|harnais|hardi|hurler|housse|houle|houx|hamster|hiss)/
const OBS = new Set(['b', 'c', 'd', 'f', 'g', 'p', 't', 'v', 'ch', 'ph', 'th'])

const strip = (c: string) => {
  const s = c.toLowerCase()
  if (s === 'œ' || s === 'æ') return 'e'
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
}
const isVowelLetter = (b: string) => 'aeiouy'.includes(b) && b.length === 1
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/œ/g, 'oe').replace(/[’']/g, '')

interface Nuc {
  s: number
  e: number
  dier: boolean
  mute: boolean
  clitic: boolean
}

export function analyzeWord(raw: string, mode: DiMode): Word {
  const ch = [...raw]
  const n = ch.length
  const b = ch.map(strip)
  const accent = ch.map((c) => /[éèêë]/i.test(c))
  const dia = ch.map((c) => /[ëïüöä]/i.test(c))
  const real = (i: number) => i >= 0 && i < n && /\p{L}/u.test(ch[i])
  const prevReal = (i: number) => {
    for (let j = i - 1; j >= 0; j--) if (real(j)) return j
    return -1
  }
  const nextReal = (i: number) => {
    for (let j = i + 1; j < n; j++) if (real(j)) return j
    return -1
  }
  const base = b.filter((_, i) => real(i)).join('')
  // types : V voyelle, C consonne, A apostrophe, M e muet final
  const t: string[] = ch.map((c, i) => (!real(i) ? 'A' : isVowelLetter(b[i]) ? 'V' : 'C'))
  for (let i = 0; i < n; i++) {
    if (t[i] !== 'V') continue
    const p = prevReal(i)
    const q = nextReal(i)
    if (b[i] === 'u') {
      if (p >= 0 && b[p] === 'q') t[i] = 'C'
      else if (p >= 0 && b[p] === 'g' && q >= 0 && 'eiy'.includes(b[q]) && !dia[i]) t[i] = 'C'
    } else if (b[i] === 'y') {
      const pv = p >= 0 && t[p] === 'V'
      const nv = q >= 0 && isVowelLetter(b[q]) && b[q] !== 'y'
      if ((pv && nv) || (p < 0 && nv)) t[i] = 'C'
    } else if (b[i] === 'e' && !accent[i] && p >= 0 && (b[p] === 'g' || b[p] === 'j') && q >= 0 && 'aou'.includes(b[q])) {
      t[i] = 'C'
    }
  }
  const hasEarlierV = (i: number) => t.slice(0, i).includes('V')
  // e muet final
  let clitic = false
  let lastIdx = -1
  for (let i = n - 1; i >= 0; i--) if (real(i)) { lastIdx = i; break }
  const isE = (i: number) => i >= 0 && b[i] === 'e' && !accent[i] && !dia[i] && t[i] === 'V'
  if (CLITICS.has(base)) {
    const k = ch.findIndex((_, i) => isE(i))
    if (k >= 0) {
      t[k] = 'M'
      clitic = true
    }
  } else if (lastIdx >= 0) {
    let k = -1
    if (isE(lastIdx)) k = lastIdx
    else if (b[lastIdx] === 's' && isE(prevReal(lastIdx))) k = prevReal(lastIdx)
    else if (b[lastIdx] === 't' && b[prevReal(lastIdx)] === 'n' && isE(prevReal(prevReal(lastIdx)))) {
      const nt = norm(raw)
      const ends = (set: Set<string>) => [...set].some((x) => nt.endsWith(x))
      const isVerb = !ends(NONVERB_ENT) && (ends(VERB_MENT) || !/ment$/.test(nt))
      if (isVerb) k = prevReal(prevReal(lastIdx))
    }
    if (k >= 0 && hasEarlierV(k)) t[k] = 'M'
  }
  // e « interne » muet après voyelle (gaiement, jouera)
  for (let i = 1; i < n; i++) {
    if (t[i] !== 'V' || b[i] !== 'e' || accent[i] || dia[i]) continue
    const p = prevReal(i)
    if (p < 0 || t[p] !== 'V' || p !== i - 1) continue
    const c1 = nextReal(i)
    if (c1 < 0 || t[c1] !== 'C' || b[c1] === 'h') continue
    const v2 = nextReal(c1)
    if (v2 >= 0 && (t[v2] === 'V' || t[v2] === 'M')) t[i] = 'C'
  }
  // noyaux
  const nuclei: Nuc[] = []
  const glides: Glide[] = []
  let i = 0
  const two = ['ou', 'au', 'eu', 'ai', 'ei', 'oi', 'ui']
  while (i < n) {
    if (t[i] === 'M') {
      nuclei.push({ s: i, e: i + 1, dier: false, mute: true, clitic })
      i++
      continue
    }
    if (t[i] !== 'V') {
      i++
      continue
    }
    // run
    const units: { s: number; e: number; l: string }[] = []
    let j = i
    while (j < n && (t[j] === 'V' || t[j] === 'A')) {
      if (t[j] === 'A') {
        j++
        continue
      }
      const lt = (k: number) => {
        let r = ''
        let c = 0
        for (let x = j; x < n && c < k; x++) {
          if (t[x] === 'A') continue
          if (t[x] !== 'V') return ''
          if (c > 0 && dia[x]) return ''
          r += b[x] === 'y' ? 'i' : b[x]
          c++
        }
        return c === k ? r : ''
      }
      const l3 = lt(3)
      const l2 = lt(2)
      let len = 1
      if (l3 === 'eau' || l3 === 'oui') len = 3
      else if (l2 && two.includes(l2)) len = 2
      // longueur en caractères (avec éventuelles apostrophes)
      let e = j
      let c = 0
      while (e < n && c < len) {
        if (t[e] !== 'A') c++
        e++
      }
      units.push({ s: j, e, l: ch.slice(j, e).map((_, x) => (b[j + x] === 'y' ? 'i' : b[j + x])).join('').replace(/[^a-z]/g, '') })
      j = e
    }
    // fusion des glissantes
    let cur = { s: units[0].s, e: units[0].e, dier: false }
    for (let u = 1; u < units.length; u++) {
      const u1 = units[u - 1]
      const u2 = units[u]
      let split = true
      if ((u1.l === 'i' || u1.l === 'u' || u1.l === 'ou') && !dia[u2.s]) {
        const pre = base.slice(0, [...ch.slice(0, u1.s)].filter((_, x) => real(x)).length)
        const rem = [...ch.slice(u1.s)].filter((_, x) => real(u1.s + x)).map((_, x) => b[u1.s + x]).join('')
        const hasBefore = t.slice(0, u1.s).includes('V')
        let want: boolean
        if (mode === 'dierese') want = true
        else if (mode === 'synerese') want = false
        else {
          const p2 = pre.slice(-2)
          const lastTwo = pre.slice(-3).endsWith('ch') || pre.endsWith('ph') || pre.endsWith('th') ? pre.slice(-2) : pre.slice(-1)
          const cluster = (OBS.has(lastTwo) && false) || (/[lr]$/.test(pre) && OBS.has(pre.slice(-3, -1)) && /[bcdfgptv]|ch|ph|th/.test(pre.slice(-2, -1)))
          void p2
          const lex = /(orient|client|patient)/.test(norm(raw)) && u1.l === 'i'
          want =
            u1.l === 'u' ||
            cluster ||
            lex ||
            (u1.l === 'i' && hasBefore && /^io(n|ns)$/.test(rem) && /[tsxngrc]$/.test(pre)) ||
            (u1.l === 'i' && hasBefore && /^ien/.test(rem) && /c$/.test(pre)) ||
            (u1.l === 'i' && hasBefore && /^ieu(x|se|ses)$/.test(rem) && /[crtg]$/.test(pre))
        }
        split = want
        glides.push({ kind: want ? 'dierese' : 'synerese', text: ch.slice(u1.s, u2.e).join('') })
      }
      if (split) {
        nuclei.push({ s: cur.s, e: cur.e, dier: nuclei.length > 0 && false, mute: false, clitic: false })
        cur = { s: u2.s, e: u2.e, dier: glides.length > 0 && glides[glides.length - 1].kind === 'dierese' && /^(i|u|ou)$/.test(u1.l) && !dia[u2.s] ? true : false }
      } else {
        cur.e = u2.e
      }
    }
    nuclei.push({ s: cur.s, e: cur.e, dier: cur.dier, mute: false, clitic: false })
    i = j
  }
  nuclei.sort((a, c) => a.s - c.s)
  // frontières
  const starts: number[] = [0]
  for (let k = 0; k + 1 < nuclei.length; k++) {
    const from = nuclei[k].e
    const to = nuclei[k + 1].s
    const gs: { s: number; l: string }[] = []
    for (let x = from; x < to; x++) {
      if (t[x] === 'A') continue
      const l = b[x]
      const last = gs[gs.length - 1]
      if (last && ((last.l === 'c' || last.l === 'p' || last.l === 't' || last.l === 's') && l === 'h')) last.l += 'h'
      else if (last && last.l === 'g' && l === 'n') last.l = 'gn'
      else if (last && (last.l === 'q' || last.l === 'g') && l === 'u') last.l += 'u'
      else if (last && l === 'e' && t[x] === 'C') last.l += 'e'
      else gs.push({ s: x, l })
    }
    let at = from
    if (gs.length === 1) at = gs[0].s
    else if (gs.length >= 2) {
      const a = gs[gs.length - 2].l
      const z = gs[gs.length - 1].l
      at = OBS.has(a) && (z === 'l' || z === 'r') ? gs[gs.length - 2].s : gs[gs.length - 1].s
    }
    starts.push(at)
  }
  const syls: Syl[] = nuclei.map((nu, k) => ({
    text: ch.slice(starts[k], k + 1 < nuclei.length ? starts[k + 1] : n).join(''),
    mute: nu.mute,
    clitic: nu.clitic,
    dier: nu.dier,
    counted: true,
    reason: '',
  }))
  return { raw, base, syls, glides }
}

const NAMES: Record<number, string> = { 1: 'monosyllabe', 2: 'dissyllabe', 3: 'trisyllabe', 4: 'tétrasyllabe', 5: 'pentasyllabe', 6: 'hexasyllabe', 7: 'heptasyllabe', 8: 'octosyllabe', 9: 'ennéasyllabe', 10: 'décasyllabe', 11: 'hendécasyllabe', 12: 'alexandrin' }

export function analyzeVerse(text: string, mode: DiMode, overrides: Record<number, DiMode> = {}): Verse {
  const toks = text.match(/[\p{L}’']+/gu) ?? []
  const words = toks.map((w, i) => analyzeWord(w, overrides[i] ?? mode))
  const notes: string[] = []
  let total = 0
  const wordEnds: number[] = []
  words.forEach((w, wi) => {
    const next = words[wi + 1]
    for (const s of w.syls) {
      if (s.mute) {
        if (!next) {
          s.counted = s.clitic
          s.reason = s.clitic ? 'monosyllabe en fin de vers : compté' : 'e muet en fin de vers : non compté'
        } else {
          const nb = next.base
          const vowel = /^[aeiouy]/.test(nb) || (nb.startsWith('h') && !ASPIRATED.test(nb))
          s.counted = !vowel
          s.reason = vowel ? 'élision devant voyelle ou h muet : non compté' : 'e muet devant consonne (ou h aspiré) : compté'
        }
        const label = s.text.trim()
        notes.push(`« ${w.raw} » : ${s.counted ? 'le e muet compte pour une syllabe' : 'le e muet ne compte pas'} — ${s.reason.split(' : ')[0]}.`)
      }
      if (s.counted) total++
    }
    const lastCounted = [...w.syls].reverse().find((s) => s.counted)
    if (lastCounted) wordEnds.push(total)
  })
  const cnt = (...a: number[]) => a.some((x) => wordEnds.includes(x))
  let cesure: number | null = null
  let cesureNote = ''
  const flat = words.flatMap((w) => w.syls.filter((s) => s.counted).map((s) => ({ s, w })))
  if (total === 12) {
    cesure = 6
    const at = flat[5]
    if (cnt(6)) {
      cesureNote = at.s.mute ? 'Césure après la 6e syllabe, sur un e muet compté (césure dite lyrique : irrégulière en versification classique).' : 'Césure à l’hémistiche (6 + 6) : coupe en fin de mot, elle est régulière.'
      if (cnt(4) && cnt(8)) cesureNote += ' Les coupes en 4 et 8 donnent aussi un rythme ternaire (4 + 4 + 4, trimètre romantique).'
    } else cesureNote = 'La 6e syllabe tombe au milieu d’un mot : pas de coupe à l’hémistiche (vers irrégulier, ou effet voulu).'
  } else if (total === 10) {
    cesure = cnt(4) ? 4 : cnt(5) ? 5 : 4
    cesureNote = cnt(4) ? 'Décasyllabe coupé 4 + 6.' : cnt(5) ? 'Décasyllabe coupé 5 + 5.' : 'Décasyllabe : aucune coupe nette en 4 ou en 5.'
  }
  return { words, total, cesure, cesureNote, meter: NAMES[total] ?? (total > 12 ? `vers de ${total} syllabes (plus long que l’alexandrin)` : 'vers vide'), wordEnds, feminine: false, notes }
}

/** Rime : clé phonétique approchée de la fin du vers. */
function rimeTokens(verse: Verse): { toks: string[]; fem: boolean } | null {
  const w = verse.words[verse.words.length - 1]
  if (!w) return null
  const fem = w.syls.some((s) => s.mute && !s.clitic)
  let s = norm(w.raw)
  if (fem) s = s.replace(/(e|es|ent)$/, '')
  else s = s.replace(/(?<=[^aeiouy])[sxtdz]+$/, '').replace(/(?<=[aeiouy])[sx]$/, '')
  s = s
    .replace(/(er|ez)$/, 'E')
    .replace(/eau|au|ô/g, 'o')
    .replace(/oeu|eu/g, 'ø')
    .replace(/ou/g, 'u')
    .replace(/oi/g, 'wa')
    .replace(/ain|ein|in|im|un/g, 'ẽ')
    .replace(/an|am|en|em/g, 'ã')
    .replace(/on|om/g, 'õ')
    .replace(/ai|ei/g, 'e')
    .replace(/ph/g, 'f')
    .replace(/qu|k|c(?=[aouàâlrt]|$)/g, 'k')
    .replace(/ss|ç|c(?=[eiy])/g, 's')
    .replace(/gn/g, 'ɲ')
    .replace(/ch/g, 'ʃ')
    .replace(/y/g, 'i')
    .replace(/(.)\1/g, '$1')
    .replace(/h/g, '')
  return { toks: [...s], fem }
}
export function rhyme(v1: Verse, v2: Verse): string {
  const a = rimeTokens(v1)
  const b = rimeTokens(v2)
  if (!a || !b) return ''
  const vow = 'aeiouyEøoãẽõ'
  const tail = (x: string[]) => {
    let k = x.length - 1
    while (k >= 0 && !vow.includes(x[k])) k--
    return x.slice(Math.max(0, k)).join('')
  }
  if (a.fem !== b.fem) return 'Un vers a une terminaison féminine (e muet) et l’autre masculine : ils ne peuvent pas rimer ensemble.'
  if (tail(a.toks) !== tail(b.toks)) return 'Les sonorités finales ne semblent pas identiques : pas de rime (selon cette analyse approchée).'
  let L = 0
  while (L < a.toks.length && L < b.toks.length && a.toks[a.toks.length - 1 - L] === b.toks[b.toks.length - 1 - L]) L++
  const rich = L <= 1 ? 'pauvre (1 son commun)' : L === 2 ? 'suffisante (2 sons communs)' : `riche (${L} sons communs ou plus)`
  return `Rime ${a.fem ? 'féminine' : 'masculine'}, ${rich}.`
}
