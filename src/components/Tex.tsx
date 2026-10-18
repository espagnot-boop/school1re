import katex from 'katex'
import 'katex/dist/katex.min.css'
import { memo, useMemo } from 'react'
import { cn } from '@/lib/utils'

/** Rendu LaTeX via KaTeX. <Tex>{'\\frac{a}{b}'}</Tex> ou <Tex display>…</Tex> */
export const Tex = memo(function Tex({ children, display = false, className }: { children: string; display?: boolean; className?: string }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(children, { displayMode: display, throwOnError: false, strict: 'ignore', trust: false })
    } catch {
      return children
    }
  }, [children, display])
  return <span className={cn(display && 'block', className)} dangerouslySetInnerHTML={{ __html: html }} />
})
