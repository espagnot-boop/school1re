import { useEffect } from 'react'
import { useLocalState } from './useLocalState'

export type Theme = 'light' | 'dark'

const systemTheme = (): Theme => (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

export function useTheme() {
  const [stored, setStored] = useLocalState<Theme | null>('pc-theme-v', null)
  const theme: Theme = stored ?? systemTheme()
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('pc-theme', theme)
    } catch {
      /* noop */
    }
  }, [theme])
  return { theme, toggle: () => setStored(theme === 'dark' ? 'light' : 'dark'), setTheme: setStored }
}
