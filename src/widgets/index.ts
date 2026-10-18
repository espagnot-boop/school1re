import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import { withReload } from '@/lib/lazy-import'

// Chaque widget = un fichier src/widgets/<id>.tsx avec `export default function …(props)`
const files = import.meta.glob<{ default: ComponentType<any> }>('./*.tsx')

const cache = new Map<string, LazyExoticComponent<ComponentType<any>>>()

export function getWidget(id: string) {
  const loader = files[`./${id}.tsx`]
  if (!loader) return null
  if (!cache.has(id)) cache.set(id, lazy(withReload(loader)))
  return cache.get(id)!
}

export const widgetIds = () => Object.keys(files).map((k) => k.slice(2, -4))
