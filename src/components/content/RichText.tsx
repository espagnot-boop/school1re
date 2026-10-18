import { Fragment, memo, type ReactNode } from 'react'
import { Tex } from '@/components/Tex'

/**
 * Texte riche : $…$ / $$…$$ (KaTeX), **gras**, *italique*, `code`, ==surligné==, \n.
 * Les maths sont extraites en premier pour que * et _ à l'intérieur ne soient pas interprétés.
 */
type Tok = { kind: 'text'; v: string } | { kind: 'math'; v: string; display: boolean }

function splitMath(src: string): Tok[] {
  const out: Tok[] = []
  let i = 0
  let buf = ''
  while (i < src.length) {
    const c = src[i]
    if (c === '\\' && src[i + 1] === '$') {
      buf += '$'
      i += 2
      continue
    }
    if (c === '$') {
      const display = src[i + 1] === '$'
      const open = display ? 2 : 1
      const close = src.indexOf(display ? '$$' : '$', i + open)
      if (close > i + open - 1) {
        if (buf) out.push({ kind: 'text', v: buf })
        buf = ''
        out.push({ kind: 'math', v: src.slice(i + open, close), display })
        i = close + open
        continue
      }
    }
    buf += c
    i++
  }
  if (buf) out.push({ kind: 'text', v: buf })
  return out
}

const INLINE = /(\*\*[^*]+?\*\*|==[^=]+?==|`[^`]+?`|\*[^*\s][^*]*?\*|\n)/g

function renderInline(text: string, keyBase: string): ReactNode[] {
  const parts = text.split(INLINE)
  return parts.map((p, i) => {
    const k = keyBase + i
    if (!p) return null
    if (p === '\n') return <br key={k} />
    if (p.startsWith('**') && p.endsWith('**') && p.length > 4) return <strong key={k} className="font-semibold">{renderInline(p.slice(2, -2), k + 'b')}</strong>
    if (p.startsWith('==') && p.endsWith('==') && p.length > 4) return <mark key={k} className="bg-yellow-300/40 px-0.5 text-inherit dark:bg-yellow-400/25">{p.slice(2, -2)}</mark>
    if (p.startsWith('`') && p.endsWith('`') && p.length > 2) return <code key={k} className="border bg-muted px-1 py-0.5 font-mono text-[0.85em]">{p.slice(1, -1)}</code>
    if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return <em key={k}>{p.slice(1, -1)}</em>
    return <Fragment key={k}>{p}</Fragment>
  })
}

export const RichText = memo(function RichText({ text }: { text: string }) {
  if (typeof text !== 'string') return null
  const toks = splitMath(text)
  return (
    <>
      {toks.map((t, i) =>
        t.kind === 'math' ? (
          <Tex key={i} display={t.display}>
            {t.v}
          </Tex>
        ) : (
          <Fragment key={i}>{renderInline(t.v, 't' + i + '-')}</Fragment>
        ),
      )}
    </>
  )
})

/** Texte brut sans balisage (pour recherche / titres) */
export function plain(text: string) {
  return (text ?? '').replace(/\$\$?([^$]*)\$\$?/g, '$1').replace(/[*=`]/g, '')
}
