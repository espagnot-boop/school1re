/** Verbes anglais : liste des irréguliers + générateur de temps et d'aspects. */

export interface IrregularVerb {
  base: string
  pret: string[]
  pp: string[]
  fr: string
}

// [base, prétérit(s), participe(s) passé(s), traduction] ; « / » sépare les variantes (BrE en premier)
const RAW: [string, string, string, string][] = [
  ['arise', 'arose', 'arisen', 'survenir'],
  ['awake', 'awoke', 'awoken', 'se réveiller'],
  ['be', 'was/were', 'been', 'être'],
  ['bear', 'bore', 'borne', 'supporter, porter'],
  ['beat', 'beat', 'beaten', 'battre'],
  ['become', 'became', 'become', 'devenir'],
  ['begin', 'began', 'begun', 'commencer'],
  ['bend', 'bent', 'bent', 'plier, se pencher'],
  ['bet', 'bet', 'bet', 'parier'],
  ['bind', 'bound', 'bound', 'lier, relier'],
  ['bite', 'bit', 'bitten', 'mordre'],
  ['bleed', 'bled', 'bled', 'saigner'],
  ['blow', 'blew', 'blown', 'souffler'],
  ['break', 'broke', 'broken', 'casser'],
  ['breed', 'bred', 'bred', 'élever (des animaux)'],
  ['bring', 'brought', 'brought', 'apporter'],
  ['broadcast', 'broadcast', 'broadcast', 'diffuser'],
  ['build', 'built', 'built', 'construire'],
  ['burn', 'burnt/burned', 'burnt/burned', 'brûler'],
  ['burst', 'burst', 'burst', 'éclater'],
  ['buy', 'bought', 'bought', 'acheter'],
  ['cast', 'cast', 'cast', 'jeter, distribuer (des rôles)'],
  ['catch', 'caught', 'caught', 'attraper'],
  ['choose', 'chose', 'chosen', 'choisir'],
  ['cling', 'clung', 'clung', 's’accrocher'],
  ['come', 'came', 'come', 'venir'],
  ['cost', 'cost', 'cost', 'coûter'],
  ['creep', 'crept', 'crept', 'ramper'],
  ['cut', 'cut', 'cut', 'couper'],
  ['deal', 'dealt', 'dealt', 'traiter, distribuer'],
  ['dig', 'dug', 'dug', 'creuser'],
  ['do', 'did', 'done', 'faire'],
  ['draw', 'drew', 'drawn', 'dessiner, tirer'],
  ['dream', 'dreamt/dreamed', 'dreamt/dreamed', 'rêver'],
  ['drink', 'drank', 'drunk', 'boire'],
  ['drive', 'drove', 'driven', 'conduire'],
  ['eat', 'ate', 'eaten', 'manger'],
  ['fall', 'fell', 'fallen', 'tomber'],
  ['feed', 'fed', 'fed', 'nourrir'],
  ['feel', 'felt', 'felt', 'ressentir, se sentir'],
  ['fight', 'fought', 'fought', 'se battre, combattre'],
  ['find', 'found', 'found', 'trouver'],
  ['flee', 'fled', 'fled', 'fuir'],
  ['fly', 'flew', 'flown', 'voler (dans les airs)'],
  ['forbid', 'forbade', 'forbidden', 'interdire'],
  ['forecast', 'forecast', 'forecast', 'prévoir (la météo)'],
  ['foresee', 'foresaw', 'foreseen', 'prévoir'],
  ['forget', 'forgot', 'forgotten', 'oublier'],
  ['forgive', 'forgave', 'forgiven', 'pardonner'],
  ['freeze', 'froze', 'frozen', 'geler'],
  ['get', 'got', 'got/gotten', 'obtenir, devenir'],
  ['give', 'gave', 'given', 'donner'],
  ['go', 'went', 'gone', 'aller'],
  ['grind', 'ground', 'ground', 'moudre'],
  ['grow', 'grew', 'grown', 'grandir, cultiver'],
  ['hang', 'hung', 'hung', 'accrocher, pendre'],
  ['have', 'had', 'had', 'avoir'],
  ['hear', 'heard', 'heard', 'entendre'],
  ['hide', 'hid', 'hidden', 'cacher'],
  ['hit', 'hit', 'hit', 'frapper'],
  ['hold', 'held', 'held', 'tenir'],
  ['hurt', 'hurt', 'hurt', 'blesser, faire mal'],
  ['keep', 'kept', 'kept', 'garder'],
  ['kneel', 'knelt/kneeled', 'knelt/kneeled', 's’agenouiller'],
  ['know', 'knew', 'known', 'savoir, connaître'],
  ['lay', 'laid', 'laid', 'poser, étendre'],
  ['lead', 'led', 'led', 'mener, diriger'],
  ['lean', 'leant/leaned', 'leant/leaned', 's’appuyer, se pencher'],
  ['leap', 'leapt/leaped', 'leapt/leaped', 'bondir'],
  ['learn', 'learnt/learned', 'learnt/learned', 'apprendre'],
  ['leave', 'left', 'left', 'quitter, partir, laisser'],
  ['lend', 'lent', 'lent', 'prêter'],
  ['let', 'let', 'let', 'laisser, permettre'],
  ['lie', 'lay', 'lain', 'être allongé'],
  ['light', 'lit', 'lit', 'allumer'],
  ['lose', 'lost', 'lost', 'perdre'],
  ['make', 'made', 'made', 'fabriquer, faire'],
  ['mean', 'meant', 'meant', 'signifier, vouloir dire'],
  ['meet', 'met', 'met', 'rencontrer'],
  ['mislead', 'misled', 'misled', 'induire en erreur'],
  ['mistake', 'mistook', 'mistaken', 'se tromper, confondre'],
  ['misunderstand', 'misunderstood', 'misunderstood', 'mal comprendre'],
  ['overcome', 'overcame', 'overcome', 'surmonter'],
  ['overtake', 'overtook', 'overtaken', 'dépasser, doubler'],
  ['pay', 'paid', 'paid', 'payer'],
  ['put', 'put', 'put', 'mettre, poser'],
  ['quit', 'quit', 'quit', 'quitter, arrêter'],
  ['read', 'read', 'read', 'lire'],
  ['rid', 'rid', 'rid', 'débarrasser'],
  ['ride', 'rode', 'ridden', 'aller à cheval / à vélo'],
  ['ring', 'rang', 'rung', 'sonner'],
  ['rise', 'rose', 'risen', 's’élever, se lever'],
  ['run', 'ran', 'run', 'courir, diriger'],
  ['say', 'said', 'said', 'dire'],
  ['see', 'saw', 'seen', 'voir'],
  ['seek', 'sought', 'sought', 'chercher'],
  ['sell', 'sold', 'sold', 'vendre'],
  ['send', 'sent', 'sent', 'envoyer'],
  ['set', 'set', 'set', 'fixer, placer'],
  ['sew', 'sewed', 'sewn/sewed', 'coudre'],
  ['shake', 'shook', 'shaken', 'secouer'],
  ['shed', 'shed', 'shed', 'verser (des larmes), perdre'],
  ['shine', 'shone', 'shone', 'briller'],
  ['shoot', 'shot', 'shot', 'tirer (avec une arme)'],
  ['show', 'showed', 'shown', 'montrer'],
  ['shrink', 'shrank', 'shrunk', 'rétrécir'],
  ['shut', 'shut', 'shut', 'fermer'],
  ['sing', 'sang', 'sung', 'chanter'],
  ['sink', 'sank', 'sunk', 'couler, sombrer'],
  ['sit', 'sat', 'sat', 'être assis'],
  ['sleep', 'slept', 'slept', 'dormir'],
  ['slide', 'slid', 'slid', 'glisser'],
  ['smell', 'smelt/smelled', 'smelt/smelled', 'sentir (une odeur)'],
  ['sow', 'sowed', 'sown/sowed', 'semer'],
  ['speak', 'spoke', 'spoken', 'parler'],
  ['spell', 'spelt/spelled', 'spelt/spelled', 'épeler'],
  ['spend', 'spent', 'spent', 'dépenser, passer (du temps)'],
  ['spill', 'spilt/spilled', 'spilt/spilled', 'renverser'],
  ['spin', 'spun', 'spun', 'tourner, filer'],
  ['spit', 'spat', 'spat', 'cracher'],
  ['split', 'split', 'split', 'fendre, diviser'],
  ['spoil', 'spoilt/spoiled', 'spoilt/spoiled', 'gâcher, gâter'],
  ['spread', 'spread', 'spread', 'répandre, se propager'],
  ['spring', 'sprang', 'sprung', 'jaillir, bondir'],
  ['stand', 'stood', 'stood', 'être debout'],
  ['steal', 'stole', 'stolen', 'voler (dérober)'],
  ['stick', 'stuck', 'stuck', 'coller, planter'],
  ['sting', 'stung', 'stung', 'piquer'],
  ['stink', 'stank', 'stunk', 'puer'],
  ['strike', 'struck', 'struck', 'frapper, faire grève'],
  ['strive', 'strove', 'striven', 's’efforcer'],
  ['swear', 'swore', 'sworn', 'jurer'],
  ['sweep', 'swept', 'swept', 'balayer'],
  ['swell', 'swelled', 'swollen', 'gonfler, enfler'],
  ['swim', 'swam', 'swum', 'nager'],
  ['swing', 'swung', 'swung', 'se balancer'],
  ['take', 'took', 'taken', 'prendre'],
  ['teach', 'taught', 'taught', 'enseigner'],
  ['tear', 'tore', 'torn', 'déchirer'],
  ['tell', 'told', 'told', 'dire, raconter'],
  ['think', 'thought', 'thought', 'penser'],
  ['throw', 'threw', 'thrown', 'jeter, lancer'],
  ['tread', 'trod', 'trodden', 'marcher sur, fouler'],
  ['understand', 'understood', 'understood', 'comprendre'],
  ['undertake', 'undertook', 'undertaken', 'entreprendre'],
  ['upset', 'upset', 'upset', 'contrarier, bouleverser'],
  ['wake', 'woke', 'woken', 'se réveiller'],
  ['wear', 'wore', 'worn', 'porter (un vêtement)'],
  ['weep', 'wept', 'wept', 'pleurer'],
  ['win', 'won', 'won', 'gagner'],
  ['wind', 'wound', 'wound', 'enrouler, remonter'],
  ['withdraw', 'withdrew', 'withdrawn', 'retirer'],
  ['write', 'wrote', 'written', 'écrire'],
]

export const IRREGULARS: IrregularVerb[] = RAW.map(([base, pret, pp, fr]) => ({ base, pret: pret.split('/'), pp: pp.split('/'), fr }))
const IRR_MAP = new Map(IRREGULARS.map((v) => [v.base, v]))
export const findIrregular = (b: string) => IRR_MAP.get(b.trim().toLowerCase())

// ---------------------------------------------------------------- orthographe des verbes réguliers
const STRESS_FINAL = new Set([
  'admit', 'commit', 'permit', 'omit', 'submit', 'emit', 'transmit', 'regret', 'prefer', 'refer', 'occur', 'deter', 'confer', 'infer', 'transfer', 'incur',
  'recur', 'control', 'patrol', 'compel', 'expel', 'propel', 'rebel', 'repel', 'equip', 'acquit', 'abhor', 'allot', 'excel', 'enrol', 'distil', 'fulfil',
  'instil', 'extol', 'outwit', 'embed', 'forget', 'begin', 'upset', 'kidnap', 'worship', 'handicap',
])
const vowels = 'aeiou'

function doubles(v: string): boolean {
  const n = v.length
  if (n < 3) return false
  const last = v[n - 1]
  const prev = v[n - 2]
  const prev2 = v[n - 3]
  if (vowels.includes(last) || 'wxy'.includes(last)) return false
  if (!vowels.includes(prev)) return false
  if (vowels.includes(prev2) && !(prev2 === 'u' && v[n - 4] === 'q')) return false // rain, look ; mais quit
  if (STRESS_FINAL.has(v)) return true
  // anglais britannique : travel → travelled, cancel → cancelled
  if (last === 'l') return true
  // monosyllabe ?
  const groups = v.replace(/qu/g, 'q').match(/[aeiouy]+/g) ?? []
  return groups.length === 1
}

export function thirdPerson(v: string): string {
  if (v === 'be') return 'is'
  if (v === 'have') return 'has'
  if (/(s|x|z|ch|sh|o)$/.test(v)) return v + 'es'
  if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ies'
  return v + 's'
}

export function ingForm(v: string): string {
  if (v === 'be') return 'being'
  if (/ie$/.test(v)) return v.slice(0, -2) + 'ying'
  if (/(ee|ye|oe)$/.test(v)) return v + 'ing'
  if (/[^aeiou]e$/.test(v) || /ue$/.test(v)) return v.slice(0, -1) + 'ing'
  if (/(panic|picnic|mimic|traffic)$/.test(v)) return v + 'king'
  if (doubles(v)) return v + v[v.length - 1] + 'ing'
  return v + 'ing'
}

export function edForm(v: string): string {
  if (/e$/.test(v)) return v + 'd'
  if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ied'
  if (/(panic|picnic|mimic|traffic)$/.test(v)) return v + 'ked'
  if (doubles(v)) return v + v[v.length - 1] + 'ed'
  return v + 'ed'
}

export interface EnForms {
  base: string
  s3: string
  pret: string
  pretAll: string[]
  pp: string
  ppAll: string[]
  ing: string
  irregular: boolean
  fr?: string
}

export function enForms(input: string): EnForms | null {
  const v = input.trim().toLowerCase().replace(/^to\s+/, '')
  if (!/^[a-z]+$/.test(v)) return null
  const irr = IRR_MAP.get(v)
  const pretAll = irr ? irr.pret : [edForm(v)]
  const ppAll = irr ? irr.pp : [edForm(v)]
  return { base: v, s3: thirdPerson(v), pret: pretAll[0], pretAll, pp: ppAll[0], ppAll, ing: ingForm(v), irregular: !!irr, fr: irr?.fr }
}

// ---------------------------------------------------------------- temps et aspects
export type Subject = 'I' | 'you' | 'he' | 'she' | 'it' | 'we' | 'they'
export const SUBJECTS: Subject[] = ['I', 'you', 'he', 'she', 'it', 'we', 'they']
export type Sentence = 'aff' | 'neg' | 'int'
export type Voice = 'active' | 'passive'

export interface EnTense {
  id: string
  en: string
  fr: string
  form: string
  tip: string
  group: 'present' | 'past' | 'future' | 'conditional'
}

export const EN_TENSES: EnTense[] = [
  { id: 'presSimple', en: 'Present simple', fr: 'présent simple', form: 'V / V-s', tip: 'Habitude, vérité générale, état : She works in London.', group: 'present' },
  { id: 'presCont', en: 'Present continuous', fr: 'présent en be + V-ing', form: 'be + V-ing', tip: 'Action en cours, projet proche : I am writing.', group: 'present' },
  { id: 'presPerf', en: 'Present perfect', fr: 'present perfect', form: 'have + V-en', tip: 'Bilan présent d’un fait passé : since, for, ever, already, yet, just.', group: 'present' },
  { id: 'presPerfCont', en: 'Present perfect continuous', fr: 'present perfect en be + V-ing', form: 'have been + V-ing', tip: 'Activité commencée dans le passé qui dure encore : I have been waiting for an hour.', group: 'present' },
  { id: 'pret', en: 'Preterite (simple past)', fr: 'prétérit', form: 'V-ed / 2e colonne', tip: 'Fait passé daté, coupé du présent : yesterday, ago, in 1969, last year.', group: 'past' },
  { id: 'pastCont', en: 'Past continuous', fr: 'prétérit en be + V-ing', form: 'was/were + V-ing', tip: 'Action en cours à un moment du passé : I was reading when…', group: 'past' },
  { id: 'pastPerf', en: 'Past perfect', fr: 'past perfect (plus-que-parfait)', form: 'had + V-en', tip: 'Antériorité dans le passé : When I arrived, they had left.', group: 'past' },
  { id: 'pastPerfCont', en: 'Past perfect continuous', fr: 'past perfect en be + V-ing', form: 'had been + V-ing', tip: 'Activité qui durait avant un repère passé.', group: 'past' },
  { id: 'usedTo', en: 'Used to', fr: 'habitude passée révolue', form: 'used to + V', tip: 'Habitude ou état passé qui n’existe plus : I used to live in Spain.', group: 'past' },
  { id: 'will', en: 'Future (will)', fr: 'futur avec will', form: 'will + V', tip: 'Prédiction, décision immédiate, promesse.', group: 'future' },
  { id: 'goingTo', en: 'Be going to', fr: 'futur proche', form: 'be going to + V', tip: 'Intention ou conséquence prévisible : It’s going to rain.', group: 'future' },
  { id: 'futCont', en: 'Future continuous', fr: 'futur en be + V-ing', form: 'will be + V-ing', tip: 'Action en cours à un moment du futur.', group: 'future' },
  { id: 'futPerf', en: 'Future perfect', fr: 'futur antérieur', form: 'will have + V-en', tip: 'Action achevée avant un repère futur : By 2030, we will have built…', group: 'future' },
  { id: 'cond', en: 'Conditional', fr: 'conditionnel présent', form: 'would + V', tip: 'Hypothèse : If I had time, I would travel.', group: 'conditional' },
  { id: 'condPerf', en: 'Conditional perfect', fr: 'conditionnel passé', form: 'would have + V-en', tip: 'Hypothèse irréelle passée : If I had known, I would have come.', group: 'conditional' },
]

const is3 = (s: Subject) => s === 'he' || s === 'she' || s === 'it'
const bePres = (s: Subject) => (s === 'I' ? 'am' : is3(s) ? 'is' : 'are')
const bePast = (s: Subject) => (s === 'I' || is3(s) ? 'was' : 'were')
const havePres = (s: Subject) => (is3(s) ? 'has' : 'have')

/** Chaîne verbale : [auxiliaire fini, reste…] ; doSupport = forme simple sans auxiliaire */
interface Chain {
  finite: string
  rest: string[]
  doSupport?: { do: string; base: string }
}

function chain(t: string, s: Subject, f: EnForms, voice: Voice): Chain | null {
  const isBe = f.base === 'be'
  const P = voice === 'passive'
  const main = (form: 'base' | 'ing' | 'pp') => (P ? null : form === 'base' ? f.base : form === 'ing' ? f.ing : f.pp)
  // au passif, le verbe lexical est toujours au participe passé et « be » porte le temps
  switch (t) {
    case 'presSimple':
      if (P) return { finite: bePres(s), rest: [f.pp] }
      if (isBe) return { finite: bePres(s), rest: [] }
      return { finite: is3(s) ? f.s3 : f.base, rest: [], doSupport: { do: is3(s) ? 'does' : 'do', base: f.base } }
    case 'presCont':
      return P ? { finite: bePres(s), rest: ['being', f.pp] } : { finite: bePres(s), rest: [main('ing')!] }
    case 'presPerf':
      return P ? { finite: havePres(s), rest: ['been', f.pp] } : { finite: havePres(s), rest: [main('pp')!] }
    case 'presPerfCont':
      return P || isBe ? null : { finite: havePres(s), rest: ['been', f.ing] }
    case 'pret':
      if (P) return { finite: bePast(s), rest: [f.pp] }
      if (isBe) return { finite: bePast(s), rest: [] }
      return { finite: f.pret, rest: [], doSupport: { do: 'did', base: f.base } }
    case 'pastCont':
      return P ? { finite: bePast(s), rest: ['being', f.pp] } : { finite: bePast(s), rest: [f.ing] }
    case 'pastPerf':
      return P ? { finite: 'had', rest: ['been', f.pp] } : { finite: 'had', rest: [f.pp] }
    case 'pastPerfCont':
      return P || isBe ? null : { finite: 'had', rest: ['been', f.ing] }
    case 'usedTo':
      return { finite: 'used', rest: P ? ['to', 'be', f.pp] : ['to', f.base], doSupport: { do: 'did', base: ['use', 'to', ...(P ? ['be', f.pp] : [f.base])].join(' ') } }
    case 'will':
      return { finite: 'will', rest: P ? ['be', f.pp] : [f.base] }
    case 'goingTo':
      return { finite: bePres(s), rest: P ? ['going', 'to', 'be', f.pp] : ['going', 'to', f.base] }
    case 'futCont':
      return P || isBe ? null : { finite: 'will', rest: ['be', f.ing] }
    case 'futPerf':
      return { finite: 'will', rest: P ? ['have', 'been', f.pp] : ['have', f.pp] }
    case 'cond':
      return { finite: 'would', rest: P ? ['be', f.pp] : [f.base] }
    case 'condPerf':
      return { finite: 'would', rest: P ? ['have', 'been', f.pp] : ['have', f.pp] }
  }
  return null
}

const NEG_CONTR: Record<string, string> = {
  is: "isn't", are: "aren't", was: "wasn't", were: "weren't", has: "hasn't", have: "haven't", had: "hadn't", will: "won't", would: "wouldn't",
  do: "don't", does: "doesn't", did: "didn't",
}
const AFF_CONTR: Record<string, string> = { am: "'m", is: "'s", are: "'re", has: "'s", have: "'ve", had: "'d", will: "'ll", would: "'d" }

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** Phrase complète, ou null si la forme n'existe pas (ou très rare) */
export function sentence(t: string, s: Subject, f: EnForms, voice: Voice, type: Sentence, contracted: boolean): string | null {
  const c = chain(t, s, f, voice)
  if (!c) return null
  const subj = s
  if (type === 'aff') {
    const words = [c.finite, ...c.rest]
    if (contracted && AFF_CONTR[c.finite] && !c.doSupport && c.rest.length > 0) return cap(`${subj}${AFF_CONTR[c.finite]} ${c.rest.join(' ')}`)
    if (contracted && AFF_CONTR[c.finite] && !c.doSupport && c.rest.length === 0) return cap(`${subj}${AFF_CONTR[c.finite]}`)
    return cap(`${subj} ${words.join(' ')}`)
  }
  const fin = c.doSupport ? c.doSupport.do : c.finite
  const rest = c.doSupport ? [c.doSupport.base] : c.rest
  if (type === 'neg') {
    if (contracted) {
      if (fin === 'am') return cap(`${subj}'m not ${rest.join(' ')}`.trim())
      return cap(`${subj} ${NEG_CONTR[fin] ?? fin + ' not'} ${rest.join(' ')}`.trim())
    }
    return cap(`${subj} ${fin} not ${rest.join(' ')}`.trim())
  }
  return cap(`${fin} ${subj} ${rest.join(' ')}`.trim()) + '?'
}

export const EN_SUGGESTIONS = ['be', 'have', 'do', 'go', 'say', 'tell', 'make', 'take', 'come', 'see', 'think', 'arrive', 'remember', 'create', 'play', 'study', 'stop', 'travel', 'watch', 'try', 'build', 'forget', 'fight', 'win', 'lead', 'forgive', 'spread', 'speak', 'leave', 'write']
