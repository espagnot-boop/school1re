#!/bin/sh
# Génère une entrée qui importe tous les chapitres, la compile avec esbuild (fourni par Vite) puis l'exécute
set -e
cd "$(dirname "$0")/.."
mkdir -p node_modules/.cache
ENTRY=node_modules/.cache/validate-entry.ts
{
  i=0
  echo "const m: Record<string, any> = {};"
  for f in src/content/*/*.ts; do
    rel=${f#src/content/}
    echo "import * as c$i from '../../$f'; m['$rel'] = c$i;"
    i=$((i+1))
  done
  echo "(globalThis as any).__CHAPTERS__ = m;"
  echo "await import('../../scripts/validate-content.ts')"
} > $ENTRY
npx esbuild $ENTRY --bundle --platform=node --format=esm --outfile=node_modules/.cache/validate.mjs --log-level=error --define:__CHAPTERS__=globalThis.__CHAPTERS__
node node_modules/.cache/validate.mjs "$@"
