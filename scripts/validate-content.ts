/**
 * Vérifie tout le contenu : champs obligatoires, widgets existants, LaTeX compilable (KaTeX), $ appariés.
 * Usage : npm run validate
 */
import katex from 'katex'
import fs from 'node:fs'
import path from 'node:path'
import type { Block, Chapter } from '../src/content/types'

const root = process.cwd()
const widgets = new Set(fs.readdirSync(path.join(root, 'src/widgets')).filter((f) => f.endsWith('.tsx')).map((f) => f.slice(0, -4)))
const problems: string[] = []
let mathCount = 0

function checkTex(tex: string, where: string, display = false) {
  mathCount++
  try {
    katex.renderToString(tex.replace(/\u00B7/g, '\u22C5'), { throwOnError: true, displayMode: display, strict: 'ignore' })
  } catch (e) {
    problems.push(`[latex] ${where}: ${(e as Error).message.split('\n')[0]} :: ${tex.slice(0, 80)}`)
  }
}

function checkText(text: unknown, where: string) {
  if (typeof text !== 'string') {
    problems.push(`[type] ${where}: texte attendu, reçu ${typeof text}`)
    return
  }
  // extrait $$..$$ puis $..$ (en ignorant \$)
  const src = text.replace(/\\\$/g, '')
  let i = 0
  while (i < src.length) {
    if (src[i] === '$') {
      const d = src[i + 1] === '$'
      const o = d ? 2 : 1
      const end = src.indexOf(d ? '$$' : '$', i + o)
      if (end < 0) {
        problems.push(`[dollar] ${where}: $ non fermé :: ${text.slice(Math.max(0, i - 20), i + 40)}`)
        return
      }
      checkTex(src.slice(i + o, end), where, d)
      i = end + o
    } else i++
  }
}

function walk(blocks: Block[] | undefined, where: string) {
  if (!Array.isArray(blocks)) {
    problems.push(`[type] ${where}: Block[] attendu`)
    return
  }
  blocks.forEach((b, i) => {
    const w = `${where}[${i}:${(b as any)?.type}]`
    switch (b?.type) {
      case 'h2': case 'h3': case 'p': checkText(b.text, w); break
      case 'math': checkTex(b.tex, w, true); break
      case 'list': b.items.forEach((t, j) => checkText(t, `${w}.${j}`)); break
      case 'callout': walk(b.content, w); break
      case 'reveal': checkText(b.title, w); walk(b.content, w); break
      case 'table': [...b.headers, ...b.rows.flat()].forEach((t, j) => checkText(t, `${w}.${j}`)); break
      case 'quote': checkText(b.text, w); break
      case 'timeline': b.events.forEach((e, j) => { checkText(e.title, `${w}.${j}`); if (e.text) checkText(e.text, `${w}.${j}`) }); break
      case 'keyvalue': b.items.forEach((e, j) => { checkText(e.key, `${w}.${j}`); checkText(e.value, `${w}.${j}`) }); break
      case 'steps': case 'grid': b.items.forEach((e, j) => { checkText(e.title, `${w}.${j}`); checkText(e.text, `${w}.${j}`) }); break
      case 'qcm':
        b.questions.forEach((q, j) => {
          checkText(q.question, `${w}.q${j}`)
          q.choices.forEach((c) => checkText(c, `${w}.q${j}`))
          if (!(q.answer >= 0 && q.answer < q.choices.length)) problems.push(`[qcm] ${w}.q${j}: answer hors limites`)
          if (q.explanation) checkText(q.explanation, `${w}.q${j}`)
        })
        break
      case 'flashcards': b.cards.forEach((c, j) => { checkText(c.front, `${w}.${j}`); checkText(c.back, `${w}.${j}`) }); break
      case 'cloze': checkText(b.text.replace(/\{\{[^}]*\}\}/g, '___'), w); if (!/\{\{/.test(b.text)) problems.push(`[cloze] ${w}: aucun trou`); break
      case 'matching': b.pairs.forEach((p, j) => { checkText(p.left, `${w}.${j}`); checkText(p.right, `${w}.${j}`) }); break
      case 'ordering': b.items.forEach((t, j) => checkText(t, `${w}.${j}`)); break
      case 'truefalse': b.statements.forEach((s, j) => checkText(s.text, `${w}.${j}`)); break
      case 'widget': if (!widgets.has(b.id)) problems.push(`[widget] ${w}: widget inconnu « ${b.id} »`); break
      case 'svg': if (!/<svg[\s>]/.test(b.svg) || !/viewBox/.test(b.svg)) problems.push(`[svg] ${w}: svg invalide ou sans viewBox`); break
      case 'code': case 'divider': break
      default: problems.push(`[type] ${w}: type de bloc inconnu`)
    }
  })
}

// Chapitres injectés par le script de lancement (voir run-validate.sh)
declare const __CHAPTERS__: Record<string, { default: Chapter }>
const files = Object.keys(__CHAPTERS__)
const ids = new Set<string>()
let ex = 0
for (const f of files) {
  const ch: Chapter = __CHAPTERS__[f].default
  const w = f
  if (!ch?.id || !ch.subject || !ch.title) { problems.push(`[meta] ${w}: id/subject/title manquant`); continue }
  const key = ch.subject + '/' + ch.id
  if (ids.has(key)) problems.push(`[meta] ${w}: id dupliqué ${key}`)
  ids.add(key)
  if (!f.startsWith(ch.subject + '/')) problems.push(`[meta] ${w}: subject « ${ch.subject} » ne correspond pas au dossier`)
  checkText(ch.title, w + '.title'); checkText(ch.summary, w + '.summary')
  ;(ch.objectives ?? []).forEach((o, i) => checkText(o, `${w}.objectives.${i}`))
  walk(ch.fiche, w + '.fiche'); walk(ch.cours, w + '.cours'); walk(ch.representations, w + '.representations')
  const exIds = new Set<string>()
  ;(ch.exercices ?? []).forEach((e, i) => {
    ex++
    if (exIds.has(e.id)) problems.push(`[exo] ${w}: id d'exercice dupliqué ${e.id}`)
    exIds.add(e.id)
    checkText(e.title, `${w}.ex${i}.title`)
    walk(e.statement, `${w}.ex${i}.statement`); walk(e.solution, `${w}.ex${i}.solution`)
    ;(e.hints ?? []).forEach((h) => checkText(h, `${w}.ex${i}.hint`))
  })
}
console.log(`${files.length} chapitres, ${ex} exercices, ${mathCount} formules, ${widgets.size} widgets`)
const byKind = problems.reduce<Record<string, number>>((m, p) => ((m[p.split(']')[0] + ']'] = (m[p.split(']')[0] + ']'] ?? 0) + 1), m), {})
console.log(byKind)
for (const p of problems) console.log(p)
process.exit(problems.length ? 1 : 0)
