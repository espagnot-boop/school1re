import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { RichText } from './RichText'

const KW: Record<string, string[]> = {
  python: ['def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or', 'import', 'from', 'as', 'True', 'False', 'None', 'break', 'continue', 'pass', 'lambda', 'assert', 'class', 'with', 'try', 'except', 'raise', 'global', 'is'],
  js: ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'document', 'new', 'true', 'false', 'null', 'addEventListener', 'class', 'this'],
  javascript: ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'document', 'new', 'true', 'false', 'null', 'addEventListener', 'class', 'this'],
  sql: ['SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'JOIN', 'ON', 'AND', 'OR'],
  bash: ['cd', 'ls', 'mkdir', 'rm', 'cp', 'mv', 'chmod', 'cat', 'echo', 'pwd', 'sudo', 'touch', 'grep'],
}
const BUILTINS = ['print', 'len', 'range', 'int', 'float', 'str', 'list', 'dict', 'input', 'abs', 'max', 'min', 'sum', 'sorted', 'append', 'open', 'round', 'type', 'bin', 'hex', 'ord', 'chr', 'bool', 'tuple', 'enumerate', 'zip', 'console', 'log']

function highlight(code: string, lang: string) {
  const kws = new Set(KW[lang] ?? KW.python)
  const re = /(#[^\n]*|\/\/[^\n]*|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b|<\/?[a-zA-Z][a-zA-Z0-9-]*|[^\w\s])/g
  const out: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  const isMarkup = lang === 'html' || lang === 'xml'
  while ((m = re.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index))
    const t = m[0]
    let cls = ''
    if ((t.startsWith('#') && !isMarkup && lang !== 'css') || t.startsWith('//')) cls = 'text-muted-foreground italic'
    else if (t.startsWith('"') || t.startsWith("'")) cls = 'text-[hsl(142_60%_38%)] dark:text-[hsl(142_60%_60%)]'
    else if (/^\d/.test(t)) cls = 'text-[hsl(25_90%_48%)] dark:text-[hsl(25_95%_62%)]'
    else if (t.startsWith('<')) cls = 'text-[hsl(0_70%_50%)] dark:text-[hsl(0_80%_68%)]'
    else if (kws.has(t)) cls = 'text-[hsl(263_70%_55%)] dark:text-[hsl(263_80%_72%)] font-medium'
    else if (BUILTINS.includes(t)) cls = 'text-[hsl(217_85%_52%)] dark:text-[hsl(217_91%_70%)]'
    out.push(cls ? <span key={k++} className={cls}>{t}</span> : t)
    last = m.index + t.length
  }
  if (last < code.length) out.push(code.slice(last))
  return out
}

export function CodeBlock({ code, lang, caption }: { code: string; lang: string; caption?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <figure className="my-5">
      <div className="border bg-muted/30">
        <div className="flex items-center justify-between border-b px-3 py-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{lang}</span>
          <button
            className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
            onClick={() => {
              navigator.clipboard?.writeText(code)
              setCopied(true)
              setTimeout(() => setCopied(false), 1200)
            }}
          >
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />} {copied ? 'copié' : 'copier'}
          </button>
        </div>
        <pre className="scrollbar-thin overflow-x-auto p-3 font-mono text-[13px] leading-6">
          <code>{highlight(code.replace(/\n$/, ''), lang.toLowerCase())}</code>
        </pre>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          <RichText text={caption} />
        </figcaption>
      )}
    </figure>
  )
}
