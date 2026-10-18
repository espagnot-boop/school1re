import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { buildSync } from 'esbuild'
import fs from 'node:fs'
import path from 'node:path'

const CONTENT_DIR = path.resolve(__dirname, 'src/content')
const INDEX_ID = 'virtual:chapter-index'

/**
 * Index léger des chapitres (titres, résumés, compteurs) calculé au build.
 * Le contenu complet de chaque chapitre est ensuite chargé à la demande,
 * ce qui évite d'embarquer les ~80 chapitres dans le bundle initial.
 */
function chapterIndex(): Plugin {
  const files = () =>
    fs
      .readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .flatMap((d) => fs.readdirSync(path.join(CONTENT_DIR, d.name)).filter((f) => f.endsWith('.ts')).map((f) => `${d.name}/${f}`))
      .sort()

  return {
    name: 'chapter-index',
    resolveId: (id) => (id === INDEX_ID ? '\0' + INDEX_ID : null),
    load(id) {
      if (id !== '\0' + INDEX_ID) return null
      const meta = files().map((rel) => {
        const abs = path.join(CONTENT_DIR, rel)
        this.addWatchFile(abs)
        const { outputFiles } = buildSync({ entryPoints: [abs], bundle: true, write: false, format: 'cjs', platform: 'node', logLevel: 'silent' })
        const mod = { exports: {} as { default?: Record<string, any> } }
        new Function('module', 'exports', 'require', outputFiles[0].text)(mod, mod.exports, () => ({}))
        const ch = mod.exports.default ?? {}
        return {
          file: `./${rel}`,
          id: ch.id,
          subject: ch.subject,
          order: ch.order,
          title: ch.title,
          theme: ch.theme,
          summary: ch.summary,
          duration: ch.duration,
          keywords: ch.keywords ?? [],
          nExercices: ch.exercices?.length ?? 0,
          nRepresentations: ch.representations?.length ?? 0,
        }
      })
      return `export default ${JSON.stringify(meta)}`
    },
    handleHotUpdate({ file, server }) {
      if (file.startsWith(CONTENT_DIR + path.sep) && path.dirname(file) !== CONTENT_DIR) {
        const mod = server.moduleGraph.getModuleById('\0' + INDEX_ID)
        if (mod) server.moduleGraph.invalidateModule(mod)
      }
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), chapterIndex()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: { chunkSizeWarningLimit: 1500 },
})
