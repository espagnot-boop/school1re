/**
 * Moteur de conjugaison espagnole.
 * - verbes réguliers -ar / -er / -ir
 * - diphtongues et affaiblissements (e→ie, o→ue, u→ue, e→i), verbes en -iar/-uar accentués
 * - changements orthographiques (c→qu, g→gu, z→c, gu→gü, g→j, gu→g, c→zc, c→z, i→y)
 * - irréguliers majeurs et leurs composés (mantener, componer, prevenir, atraer, deshacer…)
 * - verbes pronominaux (irse, manifestarse…) avec enclise et accent écrit à l'impératif
 */

export type EsTense = 'pres' | 'indef' | 'imperf' | 'fut' | 'cond' | 'subj' | 'subjImp' | 'imp'
export const ES_TENSES: EsTense[] = ['pres', 'indef', 'imperf', 'fut', 'cond', 'subj', 'subjImp', 'imp']
export const ES_PERSONS = ['yo', 'tú', 'él / ella / usted', 'nosotros/as', 'vosotros/as', 'ellos / ellas / ustedes']
export const ES_PERSONS_SHORT = ['yo', 'tú', 'él', 'nosotros', 'vosotros', 'ellos']
export const ES_IMP_PERSONS = ['', 'tú', 'usted', 'nosotros', 'vosotros', 'ustedes']

export const ES_TENSE_INFO: Record<EsTense, { es: string; fr: string; tip: string }> = {
  pres: { es: 'Presente', fr: 'présent de l’indicatif', tip: 'Habitudes, vérités générales, actions présentes.' },
  indef: { es: 'Pretérito indefinido', fr: 'passé simple', tip: 'Action passée achevée et datée : ayer, en 1975, el año pasado…' },
  imperf: { es: 'Pretérito imperfecto', fr: 'imparfait', tip: 'Description, habitude ou action en cours dans le passé.' },
  fut: { es: 'Futuro', fr: 'futur simple', tip: 'Action à venir ; aussi hypothèse sur le présent (serán las diez).' },
  cond: { es: 'Condicional', fr: 'conditionnel', tip: 'Hypothèse, politesse, conseil : Si pudiera, viajaría.' },
  subj: { es: 'Presente de subjuntivo', fr: 'subjonctif présent', tip: 'Après quiero que, ojalá, para que, cuando + futur, défense (no hables).' },
  subjImp: { es: 'Imperfecto de subjuntivo', fr: 'subjonctif imparfait', tip: 'Concordance des temps et si + subjonctif imparfait → conditionnel.' },
  imp: { es: 'Imperativo', fr: 'impératif', tip: 'Ordre affirmatif ; à la forme négative : no + subjonctif présent.' },
}

type SC = 'ie' | 'ue' | 'i' | 'acc'

interface Irr {
  pres?: string[]
  presYo?: string
  presPatch?: Record<number, string>
  pret?: string[]
  pretStem?: string
  pretPatch?: Record<number, string>
  imperf?: string[]
  fut?: string
  subj?: string[]
  subjStem?: string
  impTu?: string
  impNos?: string
  impVos?: string
  noImp?: boolean
  part?: string
  ger?: string
  sc?: SC
  note?: string
  tags?: string[]
}

const IRR: Record<string, Irr> = {
  ser: {
    pres: ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
    pret: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
    imperf: ['era', 'eras', 'era', 'éramos', 'erais', 'eran'],
    subj: ['sea', 'seas', 'sea', 'seamos', 'seáis', 'sean'],
    impTu: 'sé',
  },
  estar: {
    pres: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
    pretStem: 'estuv',
    subj: ['esté', 'estés', 'esté', 'estemos', 'estéis', 'estén'],
  },
  ir: {
    pres: ['voy', 'vas', 'va', 'vamos', 'vais', 'van'],
    pret: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
    imperf: ['iba', 'ibas', 'iba', 'íbamos', 'ibais', 'iban'],
    subj: ['vaya', 'vayas', 'vaya', 'vayamos', 'vayáis', 'vayan'],
    impTu: 've',
    impNos: 'vamos',
    ger: 'yendo',
    note: 'À l’impératif, nosotros : « vamos » (et « no vayamos » à la forme négative).',
  },
  tener: { presYo: 'tengo', sc: 'ie', pretStem: 'tuv', fut: 'tendr', impTu: 'ten' },
  hacer: { presYo: 'hago', pretStem: 'hic', fut: 'har', impTu: 'haz', part: 'hecho' },
  poder: { sc: 'ue', pretStem: 'pud', fut: 'podr', ger: 'pudiendo', note: 'L’impératif de poder est très peu usité.' },
  querer: { sc: 'ie', pretStem: 'quis', fut: 'querr' },
  decir: { presYo: 'digo', sc: 'i', pretStem: 'dij', fut: 'dir', impTu: 'di', part: 'dicho' },
  venir: { presYo: 'vengo', sc: 'ie', pretStem: 'vin', fut: 'vendr', impTu: 'ven' },
  poner: { presYo: 'pongo', pretStem: 'pus', fut: 'pondr', impTu: 'pon', part: 'puesto' },
  saber: { presYo: 'sé', subjStem: 'sep', pretStem: 'sup', fut: 'sabr' },
  dar: {
    pres: ['doy', 'das', 'da', 'damos', 'dais', 'dan'],
    pret: ['di', 'diste', 'dio', 'dimos', 'disteis', 'dieron'],
    subj: ['dé', 'des', 'dé', 'demos', 'deis', 'den'],
  },
  ver: {
    pres: ['veo', 'ves', 've', 'vemos', 'veis', 'ven'],
    pret: ['vi', 'viste', 'vio', 'vimos', 'visteis', 'vieron'],
    imperf: ['veía', 'veías', 'veía', 'veíamos', 'veíais', 'veían'],
    part: 'visto',
  },
  haber: {
    pres: ['he', 'has', 'ha', 'hemos', 'habéis', 'han'],
    subjStem: 'hay',
    pretStem: 'hub',
    fut: 'habr',
    noImp: true,
    note: 'Auxiliaire des temps composés (he hablado). Forme impersonnelle : hay (il y a), hubo, había, habrá…',
  },
  salir: { presYo: 'salgo', fut: 'saldr', impTu: 'sal' },
  traer: { presYo: 'traigo', pretStem: 'traj' },
  caer: { presYo: 'caigo' },
  valer: { presYo: 'valgo', fut: 'valdr' },
  caber: { presYo: 'quepo', pretStem: 'cup', fut: 'cabr' },
  andar: { pretStem: 'anduv' },
  oír: { pres: ['oigo', 'oyes', 'oye', 'oímos', 'oís', 'oyen'] },
  satisfacer: { presYo: 'satisfago', pretStem: 'satisfic', fut: 'satisfar', impTu: 'satisfaz', part: 'satisfecho' },
  adquirir: {
    pres: ['adquiero', 'adquieres', 'adquiere', 'adquirimos', 'adquirís', 'adquieren'],
    subj: ['adquiera', 'adquieras', 'adquiera', 'adquiramos', 'adquiráis', 'adquieran'],
    tags: ['diphtongue i → ie'],
  },
  reír: {
    pres: ['río', 'ríes', 'ríe', 'reímos', 'reís', 'ríen'],
    pret: ['reí', 'reíste', 'rio', 'reímos', 'reísteis', 'rieron'],
    subj: ['ría', 'rías', 'ría', 'riamos', 'riais', 'rían'],
    ger: 'riendo',
    note: 'Orthographe de 2010 : « rio », « riais » sans accent (monosyllabes).',
  },
  sonreír: {
    pres: ['sonrío', 'sonríes', 'sonríe', 'sonreímos', 'sonreís', 'sonríen'],
    pret: ['sonreí', 'sonreíste', 'sonrió', 'sonreímos', 'sonreísteis', 'sonrieron'],
    subj: ['sonría', 'sonrías', 'sonría', 'sonriamos', 'sonriáis', 'sonrían'],
    ger: 'sonriendo',
  },
  freír: {
    pres: ['frío', 'fríes', 'fríe', 'freímos', 'freís', 'fríen'],
    pret: ['freí', 'freíste', 'frio', 'freímos', 'freísteis', 'frieron'],
    subj: ['fría', 'frías', 'fría', 'friamos', 'friais', 'frían'],
    ger: 'friendo',
    part: 'frito',
    note: 'Participe : frito (freído existe aussi). « frio », « friais » sans accent (orthographe de 2010).',
  },
  huir: { presPatch: { 4: 'huis' }, pretPatch: { 0: 'hui' }, note: 'Huir : « hui » et « huis » s’écrivent sans accent (monosyllabes).' },
}

/** Verbes à diphtongue / affaiblissement */
const SC_LIST: Record<SC, string[]> = {
  ie: [
    'pensar', 'empezar', 'comenzar', 'cerrar', 'despertar', 'sentar', 'recomendar', 'calentar', 'negar', 'regar', 'nevar', 'gobernar', 'atravesar',
    'confesar', 'manifestar', 'apretar', 'merendar', 'temblar', 'tropezar', 'fregar', 'sembrar', 'acertar', 'enterrar', 'despertar', 'helar', 'renegar',
    'entender', 'perder', 'defender', 'encender', 'extender', 'tender', 'ascender', 'descender', 'atender', 'pretender',
    'sentir', 'preferir', 'mentir', 'sugerir', 'divertir', 'convertir', 'advertir', 'herir', 'hervir', 'consentir', 'arrepentir', 'requerir', 'invertir',
    'referir', 'transferir', 'digerir', 'resentir', 'presentir', 'errar',
  ],
  ue: [
    'contar', 'costar', 'mostrar', 'encontrar', 'recordar', 'acostar', 'almorzar', 'probar', 'soñar', 'volar', 'sonar', 'aprobar', 'comprobar', 'colgar',
    'rogar', 'demostrar', 'renovar', 'forzar', 'esforzar', 'jugar', 'acordar', 'consolar', 'tostar', 'soltar', 'apostar', 'avergonzar',
    'volver', 'devolver', 'envolver', 'revolver', 'resolver', 'disolver', 'mover', 'remover', 'promover', 'conmover', 'llover', 'doler', 'morder', 'soler',
    'oler', 'torcer', 'cocer', 'dormir', 'morir',
  ],
  i: ['pedir', 'servir', 'repetir', 'seguir', 'conseguir', 'perseguir', 'proseguir', 'vestir', 'medir', 'despedir', 'impedir', 'elegir', 'corregir', 'competir', 'gemir', 'rendir', 'expedir'],
  acc: ['enviar', 'confiar', 'desconfiar', 'variar', 'fotografiar', 'ampliar', 'enfriar', 'espiar', 'vaciar', 'continuar', 'actuar', 'graduar', 'evaluar', 'situar', 'acentuar', 'efectuar', 'insinuar', 'reunir', 'prohibir'],
}
const SC_MAP: Record<string, SC> = {}
;(Object.keys(SC_LIST) as SC[]).forEach((k) => SC_LIST[k].forEach((v) => (SC_MAP[v] = k)))

const PART_IRR: Record<string, string> = {
  abrir: 'abierto', escribir: 'escrito', romper: 'roto', morir: 'muerto', cubrir: 'cubierto', descubrir: 'descubierto', resolver: 'resuelto', volver: 'vuelto',
  devolver: 'devuelto', envolver: 'envuelto', revolver: 'revuelto', disolver: 'disuelto', describir: 'descrito', inscribir: 'inscrito', freír: 'frito',
  imprimir: 'impreso', satisfacer: 'satisfecho', encubrir: 'encubierto', prescribir: 'prescrito', suscribir: 'suscrito',
}

/** Composés : préfixe + verbe irrégulier */
const COMPOUNDS: Record<string, string[]> = {
  tener: ['man', 'ob', 'con', 'de', 're', 'sos', 'entre', 'abs', 'a'],
  poner: ['com', 'pro', 'su', 'im', 'ex', 'dis', 'o', 're', 'pos', 'ante', 'contra', 'descom', 'pre', 'su', 'super', 'trans', 'yuxta'],
  venir: ['con', 'inter', 'pre', 'pro', 'sobre', 'contra', 'sub', 'de', 'a'],
  traer: ['a', 'con', 'dis', 'ex', 'sus', 're', 'sub'],
  hacer: ['des'],
  decir: ['pre', 'contra', 'des'],
}
/** Impératif (tú) des composés : mantén, compón, prevén ; predice, contradice */
const COMPOUND_TU: Record<string, string> = { tener: 'tén', poner: 'pón', venir: 'vén', decir: 'dice' }

// ---------------------------------------------------------------- outils d'accentuation
const ACC: Record<string, string> = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' }
const UNACC: Record<string, string> = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }
export const stripAccents = (s: string) => s.replace(/[áéíóú]/g, (c) => UNACC[c])
const isStrong = (c: string) => 'aeoáéóíú'.includes(c) // í/ú accentués se comportent comme des voyelles fortes (hiatus)
const isVowel = (c: string) => 'aeiouáéíóúü'.includes(c)

/** Positions des voyelles regroupées en noyaux syllabiques */
function nuclei(w: string): number[][] {
  const groups: number[][] = []
  let cur: number[] = []
  for (let i = 0; i < w.length; i++) {
    const c = w[i]
    const silentU = c === 'u' && i > 0 && (w[i - 1] === 'q' || w[i - 1] === 'g') && 'eéií'.includes(w[i + 1] ?? '')
    if (isVowel(c) && !silentU) {
      if (cur.length) {
        const prev = w[cur[cur.length - 1]]
        const split = (isStrong(prev) && isStrong(c)) || 'íú'.includes(prev) || 'íú'.includes(c)
        if (split) {
          groups.push(cur)
          cur = []
        }
      }
      cur.push(i)
    } else if (cur.length) {
      groups.push(cur)
      cur = []
    }
  }
  if (cur.length) groups.push(cur)
  return groups
}

function stressChar(w: string): number {
  for (let i = 0; i < w.length; i++) if ('áéíóú'.includes(w[i])) return i
  const g = nuclei(w)
  if (g.length === 0) return -1
  const last = w[w.length - 1]
  const idx = g.length >= 2 && (isVowel(last) || last === 'n' || last === 's') ? g.length - 2 : g.length - 1
  const n = g[idx]
  const strong = n.find((i) => 'aeo'.includes(w[i]))
  return strong ?? n[n.length - 1]
}

/** Ajoute un pronom enclitique en gérant l'accent écrit : siente + se → siéntese */
export function attach(base: string, clitic: string, trim = 0): string {
  const s = stressChar(base) // accent tonique calculé sur la forme complète (sentid, sentemos)
  const plain = stripAccents(base).slice(0, base.length - trim) + clitic
  if (s < 0) return plain
  const natural = stressChar(plain)
  if (natural === s) return plain
  return plain.slice(0, s) + (ACC[plain[s]] ?? plain[s]) + plain.slice(s + 1)
}

// ---------------------------------------------------------------- conjugaison
export interface EsConj {
  inf: string
  base: string
  reflexive: boolean
  group: 'ar' | 'er' | 'ir'
  forms: Record<EsTense, string[]>
  subjImpSe: string[]
  impNeg: string[]
  ger: string
  part: string
  tags: string[]
  notes: string[]
}

const END = {
  ar: {
    pres: ['o', 'as', 'a', 'amos', 'áis', 'an'],
    indef: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
    imperf: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'],
    subj: ['e', 'es', 'e', 'emos', 'éis', 'en'],
    ger: 'ando',
    part: 'ado',
  },
  er: {
    pres: ['o', 'es', 'e', 'emos', 'éis', 'en'],
    indef: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
    imperf: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
    subj: ['a', 'as', 'a', 'amos', 'áis', 'an'],
    ger: 'iendo',
    part: 'ido',
  },
  ir: {
    pres: ['o', 'es', 'e', 'imos', 'ís', 'en'],
    indef: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
    imperf: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
    subj: ['a', 'as', 'a', 'amos', 'áis', 'an'],
    ger: 'iendo',
    part: 'ido',
  },
}
const FUT = ['é', 'ás', 'á', 'emos', 'éis', 'án']
const COND = ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían']
const STRONG = ['e', 'iste', 'o', 'imos', 'isteis', 'ieron']
const BOOT = [0, 1, 2, 5]

function replaceLast(s: string, from: string, to: string): string {
  const i = s.lastIndexOf(from)
  return i < 0 ? s : s.slice(0, i) + to + s.slice(i + from.length)
}

function strongChange(stem: string, sc: SC): string {
  if (sc === 'ie') {
    const i = stem.lastIndexOf('e')
    if (i < 0) return stem
    return stem.slice(0, i) + (i === 0 ? 'ye' : 'ie') + stem.slice(i + 1)
  }
  if (sc === 'ue') {
    let i = stem.lastIndexOf('o')
    if (i < 0) i = stem.lastIndexOf('u') // jugar
    if (i < 0) return stem
    const rep = i === 0 ? 'hue' : stem[i - 1] === 'g' ? 'üe' : 'ue' // oler → huelo, avergonzar → avergüenzo
    return stem.slice(0, i) + rep + stem.slice(i + 1)
  }
  if (sc === 'i') return replaceLast(stem, 'e', 'i')
  // acc : enviar → envío, continuar → continúo, reunir → reúno, prohibir → prohíbo
  const i = Math.max(stem.lastIndexOf('i'), stem.lastIndexOf('u'))
  return i < 0 ? stem : stem.slice(0, i) + ACC[stem[i]] + stem.slice(i + 1)
}
function weakChange(stem: string): string {
  const ie = stem.lastIndexOf('e')
  const io = stem.lastIndexOf('o')
  if (ie < 0 && io < 0) return stem
  return ie > io ? stem.slice(0, ie) + 'i' + stem.slice(ie + 1) : stem.slice(0, io) + 'u' + stem.slice(io + 1)
}

/** Changements orthographiques à la jonction radical + terminaison */
function spell(stem: string, end: string, inf: string): string {
  const e0 = stripAccents(end[0] ?? '')
  const front = e0 === 'e' || e0 === 'i'
  const back = e0 === 'a' || e0 === 'o'
  const vowelStemUir = /[^gq]uir$/.test(inf) && stem.endsWith('u')
  const vowelStem = /[aeo]$/.test(stem) && /(er|ir|ír)$/.test(inf)
  let s = stem
  let e = end
  if (front && e0 === 'e') {
    if (inf.endsWith('car') && s.endsWith('c')) s = s.slice(0, -1) + 'qu'
    else if (inf.endsWith('guar') && s.endsWith('gu')) s = s.slice(0, -2) + 'gü'
    else if (inf.endsWith('gar') && s.endsWith('g')) s = s + 'u'
    else if (inf.endsWith('zar') && s.endsWith('z')) s = s.slice(0, -1) + 'c'
  }
  if (back) {
    if (/g(er|ir)$/.test(inf) && s.endsWith('g')) s = s.slice(0, -1) + 'j'
    else if (/guir$/.test(inf) && s.endsWith('gu')) s = s.slice(0, -1)
    else if (/c(er|ir)$/.test(inf) && s.endsWith('c')) {
      const prev = s[s.length - 2] ?? ''
      if (isVowel(prev) && !['mecer', 'cocer'].some((x) => inf.endsWith(x))) s = s.slice(0, -1) + 'zc'
      else s = s.slice(0, -1) + 'z'
    }
  }
  // i → y entre voyelles : leyó, cayeron, construyo, huyendo
  if (vowelStemUir && 'aeo'.includes(e0)) s = s + 'y'
  if ((vowelStem || vowelStemUir) && e[0] === 'i' && isVowel(e[1] ?? '')) e = 'y' + e.slice(1)
  // í écrit en hiatus : leíste, caímos, oído
  if (vowelStem && e[0] === 'i' && !isVowel(e[1] ?? '')) e = 'í' + e.slice(1)
  return s + e
}

function detectGroup(inf: string): 'ar' | 'er' | 'ir' | null {
  if (inf.endsWith('ar')) return 'ar'
  if (inf.endsWith('er')) return 'er'
  if (inf.endsWith('ir') || inf.endsWith('ír')) return 'ir'
  return null
}

interface Opts {
  plain?: boolean
}

function conjBase(inf: string, opts: Opts = {}): Omit<EsConj, 'reflexive' | 'base' | 'inf'> | null {
  const group = detectGroup(inf)
  if (!group) return null
  const plain = !!opts.plain
  const tags: string[] = []
  const notes: string[] = []

  // composés de verbes irréguliers
  if (!plain) {
    for (const [b, prefixes] of Object.entries(COMPOUNDS)) {
      if (inf !== b && inf.endsWith(b) && prefixes.includes(inf.slice(0, -b.length))) {
        const pre = inf.slice(0, -b.length)
        const c = conjBase(b)!
        const map = (a: string[]) => a.map((f) => (f ? pre + f : f))
        const forms = Object.fromEntries(Object.entries(c.forms).map(([k, v]) => [k, map(v)])) as Record<EsTense, string[]>
        if (COMPOUND_TU[b]) forms.imp[1] = pre + COMPOUND_TU[b]
        return {
          group: c.group,
          forms,
          subjImpSe: map(c.subjImpSe),
          impNeg: c.impNeg.map((f) => (f ? f.replace(/^no /, 'no ' + pre) : f)),
          ger: pre + c.ger,
          part: pre + c.part,
          tags: [`se conjugue comme ${b}`],
          notes: COMPOUND_TU[b] ? [`Impératif (tú) : ${pre}${COMPOUND_TU[b]}${b === 'decir' ? '' : ', avec accent écrit'}.`] : [],
        }
      }
    }
  }

  const irr: Irr = plain ? {} : { ...(IRR[inf] ?? {}) }
  const isIrr = !plain && !!IRR[inf]
  if (isIrr) tags.push('irrégulier')
  if (irr.note) notes.push(irr.note)
  if (irr.tags) tags.push(...irr.tags)
  const stem = stripAccents(inf.slice(0, -2))
  const ducir = !plain && inf.endsWith('ducir')
  if (ducir && !irr.pretStem) {
    irr.pretStem = stem.slice(0, -1) + 'j'
    tags.push('-ducir : zc / j')
  }
  const sc: SC | undefined = plain ? undefined : irr.sc ?? SC_MAP[inf]
  if (sc && !isIrr) tags.push(sc === 'ie' ? 'diphtongue e → ie' : sc === 'ue' ? (inf === 'jugar' ? 'diphtongue u → ue' : 'diphtongue o → ue') : sc === 'i' ? 'affaiblissement e → i' : 'accent écrit (í / ú)')
  if (!plain && !isIrr) {
    if (inf.endsWith('car')) tags.push('c → qu devant e')
    else if (inf.endsWith('guar')) tags.push('gu → gü devant e')
    else if (inf.endsWith('gar')) tags.push('g → gu devant e')
    else if (inf.endsWith('zar')) tags.push('z → c devant e')
    else if (/guir$/.test(inf)) tags.push('gu → g devant a, o')
    else if (/g(er|ir)$/.test(inf)) tags.push('g → j devant a, o')
    else if (/[aeiou]c(er|ir)$/.test(inf) && !['mecer', 'cocer'].some((x) => inf.endsWith(x))) tags.push('c → zc devant a, o')
    else if (/c(er|ir)$/.test(inf)) tags.push('c → z devant a, o')
    else if (/[^gq]uir$/.test(inf)) tags.push('i → y (huyo, huyó)')
    else if (/[aeo](er|ir|ír)$/.test(inf)) tags.push('i → y (leyó), í écrit (leíste)')
  }
  const weakIr = group === 'ir' && (sc === 'ie' || sc === 'ue' || sc === 'i')
  if (weakIr && sc !== 'i' && !isIrr) tags.push(sc === 'ie' ? 'e → i (3e pers. passé, gérondif)' : 'o → u (3e pers. passé, gérondif)')

  const E = END[group]
  const join = (s: string, e: string) => (plain ? s + e : spell(s, e, inf))

  // présent
  let pres = irr.pres?.slice() ?? E.pres.map((e, p) => join(sc && BOOT.includes(p) ? strongChange(stem, sc) : stem, e))
  if (!irr.pres && irr.presYo) pres[0] = irr.presYo
  if (irr.presPatch) Object.entries(irr.presPatch).forEach(([i, f]) => (pres[+i] = f))

  // indéfini
  let indef: string[]
  if (irr.pret) indef = irr.pret.slice()
  else if (irr.pretStem) {
    const ps = irr.pretStem
    indef = STRONG.map((e, p) => {
      if (p === 5 && ps.endsWith('j')) return ps + 'eron'
      if (p === 2 && ps.endsWith('c')) return ps.slice(0, -1) + 'zo' // hizo
      return ps + e
    })
  } else indef = E.indef.map((e, p) => join(weakIr && (p === 2 || p === 5) ? weakChange(stem) : stem, e))
  if (irr.pretPatch) Object.entries(irr.pretPatch).forEach(([i, f]) => (indef[+i] = f))

  // imparfait
  const imperf = irr.imperf?.slice() ?? E.imperf.map((e) => join(stem, e))

  // futur / conditionnel
  const futStem = irr.fut ?? stripAccents(inf)
  const fut = FUT.map((e) => futStem + e)
  const cond = COND.map((e) => futStem + e)

  // subjonctif présent
  let subj: string[]
  if (irr.subj) subj = irr.subj.slice()
  else {
    const yoStem = irr.subjStem ?? (irr.presYo && irr.presYo.endsWith('o') ? irr.presYo.slice(0, -1) : null) ?? (irr.pres && irr.pres[0].endsWith('o') ? irr.pres[0].slice(0, -1) : null)
    subj = E.subj.map((e, p) => {
      if (yoStem) return yoStem + e
      let s = stem
      if (sc && BOOT.includes(p)) s = strongChange(stem, sc)
      else if (weakIr) s = sc === 'i' ? strongChange(stem, 'i') : weakChange(stem)
      return join(s, e)
    })
  }

  // subjonctif imparfait (-ra / -se) à partir de la 3e pers. du pluriel de l'indéfini
  const root = indef[5].replace(/ron$/, '')
  const accRoot = root.slice(0, -1) + (ACC[root[root.length - 1]] ?? root[root.length - 1])
  const subjImp = ['ra', 'ras', 'ra', 'ramos', 'rais', 'ran'].map((e, p) => (p === 3 ? accRoot : root) + e)
  const subjImpSe = ['se', 'ses', 'se', 'semos', 'seis', 'sen'].map((e, p) => (p === 3 ? accRoot : root) + e)

  // impératif
  const vosFinal = irr.impVos ?? inf.slice(0, -1) + 'd' // hablad, comed, vivid, oíd, reíd
  const imp = irr.noImp ? ['', '—', '—', '—', '—', '—'] : ['', irr.impTu ?? pres[2], subj[2], irr.impNos ?? subj[3], vosFinal, subj[5]]
  const impNeg = irr.noImp ? ['', '—', '—', '—', '—', '—'] : ['', `no ${subj[1]}`, `no ${subj[2]}`, `no ${subj[3]}`, `no ${subj[4]}`, `no ${subj[5]}`]

  // formes nominales
  const ger = irr.ger ?? (plain ? stem + E.ger : spell(weakIr ? weakChange(stem) : stem, E.ger, inf))
  let part = irr.part ?? (!plain ? PART_IRR[inf] : undefined)
  if (!part && !plain) {
    if (inf.endsWith('scribir')) part = inf.replace(/scribir$/, 'scrito')
    else if (inf.endsWith('cubrir')) part = inf.replace(/cubrir$/, 'cubierto')
    else if (inf.endsWith('olver')) part = inf.replace(/olver$/, 'uelto')
  }
  if (!part) part = plain ? stem + E.part : spell(stem, E.part, inf)
  if (!plain && stripAccents(part) !== stem + E.part && !tags.length) tags.push('participe irrégulier')

  return { group, forms: { pres, indef, imperf, fut, cond, subj, subjImp, imp }, subjImpSe, impNeg, ger, part, tags, notes }
}

const REFL = ['me', 'te', 'se', 'nos', 'os', 'se']

export function conjugateEs(input: string, opts: Opts = {}): EsConj | null {
  const inf = input.trim().toLowerCase()
  if (!/^[a-zñáéíóúü]+$/.test(inf)) return null
  const reflexive = /(ar|er|ir|ír)se$/.test(inf)
  const base = reflexive ? inf.slice(0, -2) : inf
  const c = conjBase(base, opts)
  if (!c) return null
  if (!reflexive) return { ...c, inf, base, reflexive }
  const add = (arr: string[]) => arr.map((f, p) => `${REFL[p]} ${f}`)
  const forms: Record<EsTense, string[]> = {
    pres: add(c.forms.pres),
    indef: add(c.forms.indef),
    imperf: add(c.forms.imperf),
    fut: add(c.forms.fut),
    cond: add(c.forms.cond),
    subj: add(c.forms.subj),
    subjImp: add(c.forms.subjImp),
    imp: c.forms.imp.map((f, p) => {
      if (!f || f === '—') return f
      if (p === 1) return attach(f, 'te')
      if (p === 2 || p === 5) return attach(f, 'se')
      if (p === 3) return attach(f, 'nos', f.endsWith('s') ? 1 : 0) // sentemos → sentémonos
      if (p === 4) return base === 'ir' ? 'idos' : attach(f, 'os', f.endsWith('d') ? 1 : 0) // sentad → sentaos, vestid → vestíos
      return f
    }),
  }
  const impNeg = c.impNeg.map((f, p) => (f && f !== '—' ? f.replace(/^no /, `no ${REFL[p]} `) : f))
  const notes = [...c.notes, 'Verbe pronominal : pronom avant le verbe conjugué, mais soudé à la fin de l’impératif affirmatif (avec accent écrit si nécessaire).']
  if (base === 'ir') notes.push('Irse : vete, váyase, vámonos, idos, váyanse.')
  return { ...c, inf, base, reflexive, forms, subjImpSe: add(c.subjImpSe), impNeg, ger: attach(c.ger, 'se'), notes }
}

export const ES_IRREGULAR_LIST = [
  'ser', 'estar', 'ir', 'tener', 'hacer', 'poder', 'querer', 'decir', 'venir', 'poner', 'saber', 'dar', 'ver', 'haber', 'salir', 'traer', 'conducir',
  'pedir', 'dormir', 'sentir', 'jugar', 'volver', 'pensar', 'conocer', 'oír',
]
export const ES_SUGGESTIONS = [
  ...ES_IRREGULAR_LIST,
  'hablar', 'comer', 'vivir', 'trabajar', 'estudiar', 'aprender', 'escribir', 'leer', 'abrir', 'llegar', 'buscar', 'empezar', 'seguir', 'elegir', 'construir',
  'huir', 'caer', 'creer', 'morir', 'recordar', 'encontrar', 'preferir', 'repetir', 'servir', 'llamarse', 'levantarse', 'irse', 'sentirse', 'acostarse',
  'mantener', 'proponer', 'producir', 'traducir', 'parecer', 'desaparecer', 'ofrecer', 'enviar', 'continuar', 'reunir', 'emigrar', 'acoger',
  'denunciar', 'investigar', 'descubrir', 'soñar', 'manifestarse', 'votar', 'participar', 'expresar', 'luchar', 'olvidar', 'perder', 'entender',
]
