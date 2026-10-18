import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Play, RotateCcw, Trash2, Monitor, Smartphone } from 'lucide-react'
import { WidgetFrame } from '@/components/WidgetFrame'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/input'
import { Segmented } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/misc'
import { cn } from '@/lib/utils'

interface Props {
  html?: string
  css?: string
  js?: string
}

type Lang = 'html' | 'css' | 'js'

const DEFAULT = {
  html: `<h1>Bonjour !</h1>
<p id="message">Clique sur le bouton.</p>
<button id="bouton">Clique-moi</button>
<ul>
  <li>HTML : la <strong>structure</strong></li>
  <li>CSS : la <em>présentation</em></li>
  <li>JavaScript : le <code>comportement</code></li>
</ul>`,
  css: `body {
  font-family: system-ui, sans-serif;
  margin: 1.5rem;
  color: #18181b;
}
h1 {
  color: #2563eb;
}
button {
  padding: .5rem 1rem;
  border: 2px solid #2563eb;
  background: white;
  cursor: pointer;
}
button:hover {
  background: #2563eb;
  color: white;
}`,
  js: `let compteur = 0
const bouton = document.querySelector('#bouton')
const message = document.querySelector('#message')

bouton.addEventListener('click', () => {
  compteur = compteur + 1
  message.textContent = 'Clics : ' + compteur
  console.log('clic numéro', compteur)
})`,
}

const TEMPLATES: Record<string, { label: string; html: string; css: string; js: string }> = {
  defaut: { label: 'Bouton et compteur', ...DEFAULT },
  formulaire: {
    label: 'Formulaire (GET)',
    html: `<form id="f" action="#" method="get">
  <label for="nom">Nom :</label>
  <input type="text" id="nom" name="nom" required>
  <label for="age">Âge :</label>
  <input type="number" id="age" name="age" min="0" max="120">
  <input type="submit" value="Envoyer">
</form>
<p id="sortie"></p>`,
    css: `body { font-family: system-ui, sans-serif; margin: 1.5rem; }
form { display: grid; gap: .5rem; max-width: 260px; }
input { padding: .4rem; border: 1px solid #a1a1aa; }
input[type=submit] { background: #16a34a; color: white; border: none; cursor: pointer; }`,
    js: `const f = document.querySelector('#f')
f.addEventListener('submit', (evt) => {
  evt.preventDefault() // on n'envoie rien au serveur ici
  const donnees = new FormData(f)
  const params = new URLSearchParams(donnees).toString()
  document.querySelector('#sortie').textContent = 'URL envoyée en GET : ?' + params
  console.log(params)
})`,
  },
  flexbox: {
    label: 'Mise en page Flexbox',
    html: `<header>Mon site</header>
<nav>
  <a href="#">Accueil</a>
  <a href="#">Cours</a>
  <a href="#">Contact</a>
</nav>
<main>
  <div class="carte">1</div>
  <div class="carte">2</div>
  <div class="carte">3</div>
</main>`,
    css: `body { margin: 0; font-family: system-ui, sans-serif; }
header { background: #18181b; color: white; padding: 1rem; font-size: 1.3rem; }
nav { display: flex; gap: 1rem; padding: .5rem 1rem; background: #e4e4e7; }
nav a { color: #2563eb; text-decoration: none; }
main { display: flex; flex-wrap: wrap; gap: 1rem; padding: 1rem; }
.carte { flex: 1 1 120px; height: 80px; background: #dbeafe;
  display: flex; align-items: center; justify-content: center; font-size: 2rem; }`,
    js: `// Pas de JavaScript ici : tout est en CSS.
console.log('Nombre de cartes :', document.querySelectorAll('.carte').length)`,
  },
  dom: {
    label: 'Modifier le DOM',
    html: `<h2>Liste de courses</h2>
<input id="article" placeholder="Article…">
<button id="ajouter">Ajouter</button>
<ol id="liste"></ol>`,
    css: `body { font-family: system-ui, sans-serif; margin: 1.5rem; }
li { padding: .2rem 0; cursor: pointer; }
li.fait { text-decoration: line-through; color: #a1a1aa; }`,
    js: `const liste = document.getElementById('liste')
const champ = document.getElementById('article')

document.getElementById('ajouter').onclick = () => {
  if (champ.value === '') return
  const li = document.createElement('li')
  li.textContent = champ.value
  li.onclick = () => li.classList.toggle('fait')
  liste.appendChild(li)
  champ.value = ''
}`,
  },
  canvas: {
    label: 'Dessin (canvas)',
    html: `<canvas id="c" width="300" height="200"></canvas>`,
    css: `body { margin: 1rem; } canvas { border: 1px solid #a1a1aa; }`,
    js: `const ctx = document.getElementById('c').getContext('2d')
for (let i = 0; i < 10; i++) {
  ctx.fillStyle = 'hsl(' + i * 36 + ', 80%, 55%)'
  ctx.fillRect(20 + i * 26, 180 - i * 16, 22, i * 16)
}
console.log('10 rectangles dessinés')`,
  },
}

interface LogLine {
  level: 'log' | 'warn' | 'error' | 'info'
  text: string
}

const BRIDGE = `<script>(function(){
  var send = function(level, args){
    try {
      var text = Array.prototype.map.call(args, function(a){
        if (typeof a === 'string') return a;
        try { return JSON.stringify(a); } catch(e) { return String(a); }
      }).join(' ');
      parent.postMessage({ __pcPlayground: true, level: level, text: text }, '*');
    } catch (e) {}
  };
  ['log','info','warn','error'].forEach(function(l){
    var orig = console[l];
    console[l] = function(){ send(l, arguments); if (orig) orig.apply(console, arguments); };
  });
  window.addEventListener('error', function(e){ send('error', [e.message + (e.lineno ? ' (ligne ' + e.lineno + ')' : '')]); });
  window.addEventListener('unhandledrejection', function(e){ send('error', ['Promesse rejetée : ' + e.reason]); });
  document.addEventListener('click', function(e){
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (a && a.getAttribute('href').charAt(0) !== '#') { e.preventDefault(); send('info', ['Lien vers ' + a.getAttribute('href') + ' (navigation désactivée dans l’aperçu)']); }
  });
})();<\/script>`

function buildDoc(html: string, css: string, js: string) {
  const safeJs = js.replace(/<\/script/gi, '<\\/script')
  const safeCss = css.replace(/<\/style/gi, '<\\/style')
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
${BRIDGE}
<style>${safeCss}</style></head>
<body>
${html}
<script>
try {
${safeJs}
} catch (e) { console.error(e && e.name ? e.name + ' : ' + e.message : String(e)) }
<\/script>
</body></html>`
}

function CodeEditor({ value, onChange, lang }: { value: string; onChange: (v: string) => void; lang: Lang }) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const gutter = useRef<HTMLDivElement>(null)
  const lines = value.split('\n').length
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault()
      const ta = e.currentTarget
      const s = ta.selectionStart
      const en = ta.selectionEnd
      const next = value.slice(0, s) + '  ' + value.slice(en)
      onChange(next)
      requestAnimationFrame(() => {
        if (ref.current) ref.current.selectionStart = ref.current.selectionEnd = s + 2
      })
    }
  }
  return (
    <div className="flex h-[320px] border bg-background font-mono text-[13px] leading-5">
      <div ref={gutter} className="select-none overflow-hidden border-r bg-muted/50 px-2 py-2 text-right text-muted-foreground" aria-hidden>
        {Array.from({ length: lines }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onScroll={(e) => {
          if (gutter.current) gutter.current.scrollTop = e.currentTarget.scrollTop
        }}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        aria-label={`Code ${lang.toUpperCase()}`}
        className="min-w-0 flex-1 resize-none whitespace-pre bg-transparent px-3 py-2 outline-none"
        style={{ tabSize: 2 }}
      />
    </div>
  )
}

export default function HtmlPlayground({ html, css, js }: Props) {
  const initial = useMemo(
    () => ({
      html: html ?? DEFAULT.html,
      css: css ?? (html !== undefined ? '' : DEFAULT.css),
      js: js ?? (html !== undefined ? '' : DEFAULT.js),
    }),
    [html, css, js],
  )
  const [code, setCode] = useState(initial)
  const [tab, setTab] = useState<Lang>('html')
  const [auto, setAuto] = useState(true)
  const [doc, setDoc] = useState(() => buildDoc(initial.html, initial.css, initial.js))
  const [runId, setRunId] = useState(0)
  const [logs, setLogs] = useState<LogLine[]>([])
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const frame = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    setCode(initial)
  }, [initial])

  const run = useCallback(() => {
    setLogs([])
    setDoc(buildDoc(code.html, code.css, code.js))
    setRunId((r) => r + 1)
  }, [code])

  useEffect(() => {
    if (!auto) return
    const t = setTimeout(run, 450)
    return () => clearTimeout(t)
  }, [code, auto, run])

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (!frame.current || e.source !== frame.current.contentWindow) return
      const d = e.data as { __pcPlayground?: boolean; level?: LogLine['level']; text?: string }
      if (!d || !d.__pcPlayground) return
      setLogs((l) => [...l.slice(-199), { level: d.level ?? 'log', text: String(d.text ?? '') }])
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])

  const counts = { html: code.html.length, css: code.css.length, js: code.js.length }
  const nErr = logs.filter((l) => l.level === 'error').length

  return (
    <WidgetFrame
      title="Bac à sable HTML / CSS / JavaScript"
      subtitle="Modifiez le code : l'aperçu se met à jour automatiquement"
      aside="bottom"
      footer={
        <span className="text-muted-foreground">
          Le <b className="text-foreground">HTML</b> décrit la structure (balises), le <b className="text-foreground">CSS</b> la mise en forme (sélecteurs, propriétés), le{' '}
          <b className="text-foreground">JavaScript</b> s'exécute côté client et réagit aux événements. L'aperçu est isolé (iframe « sandbox »).
        </span>
      }
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value=""
            onChange={(e) => {
              const t = TEMPLATES[e.target.value]
              if (t) setCode({ html: t.html, css: t.css, js: t.js })
            }}
            className="h-8 text-xs"
          >
            <option value="">Modèles…</option>
            {Object.entries(TEMPLATES).map(([k, t]) => (
              <option key={k} value={k}>
                {t.label}
              </option>
            ))}
          </Select>
          <Button size="sm" onClick={run}>
            <Play /> Exécuter
          </Button>
          <Button size="sm" variant="outline" onClick={() => setCode(initial)} title="Revenir au code de départ">
            <RotateCcw /> Réinitialiser
          </Button>
          <Switch checked={auto} onChange={setAuto} label="Mise à jour auto" />
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-2">
            <Segmented
              value={tab}
              onChange={setTab}
              options={(['html', 'css', 'js'] as Lang[]).map((l) => ({
                value: l,
                label: (
                  <span className="font-mono">
                    {l === 'js' ? 'JS' : l.toUpperCase()}
                    <span className="ml-1 text-[10px] opacity-60">{counts[l]}</span>
                  </span>
                ),
              }))}
              className="self-start"
            />
            <CodeEditor key={tab} value={code[tab]} onChange={(v) => setCode((c) => ({ ...c, [tab]: v }))} lang={tab} />
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Aperçu</span>
              <div className="flex border">
                <button type="button" onClick={() => setDevice('desktop')} className={cn('p-1.5', device === 'desktop' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent')} aria-label="Largeur ordinateur">
                  <Monitor className="size-3.5" />
                </button>
                <button type="button" onClick={() => setDevice('mobile')} className={cn('border-l p-1.5', device === 'mobile' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent')} aria-label="Largeur téléphone">
                  <Smartphone className="size-3.5" />
                </button>
              </div>
            </div>
            <div className="flex h-[320px] justify-center border bg-muted/40">
              <iframe
                key={runId}
                ref={frame}
                title="Aperçu du code"
                sandbox="allow-scripts"
                srcDoc={doc}
                className={cn('h-full border-0 bg-white', device === 'mobile' ? 'w-[360px] max-w-full border-x' : 'w-full')}
              />
            </div>
          </div>
        </div>

        <div className="border bg-background">
          <div className="flex items-center justify-between border-b px-3 py-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Console {logs.length > 0 && <span className="font-mono">({logs.length})</span>}
              {nErr > 0 && <span className="ml-2 text-destructive">{nErr} erreur{nErr > 1 ? 's' : ''}</span>}
            </span>
            <Button size="xs" variant="ghost" onClick={() => setLogs([])} aria-label="Vider la console">
              <Trash2 />
            </Button>
          </div>
          <div className="max-h-[140px] min-h-[52px] overflow-auto px-3 py-1.5 font-mono text-xs">
            {logs.length === 0 ? (
              <span className="text-muted-foreground">Les messages de console.log() s'affichent ici.</span>
            ) : (
              logs.map((l, i) => (
                <div
                  key={i}
                  className={cn(
                    'whitespace-pre-wrap break-all border-b border-dashed py-0.5 last:border-b-0',
                    l.level === 'error' && 'text-destructive',
                    l.level === 'warn' && 'text-warning',
                    l.level === 'info' && 'text-info',
                  )}
                >
                  {l.level === 'error' ? '✕ ' : l.level === 'warn' ? '⚠ ' : '› '}
                  {l.text}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </WidgetFrame>
  )
}
