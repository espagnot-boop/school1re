/**
 * Après un nouveau déploiement, les anciens chunks (noms hachés) n'existent plus :
 * un onglet resté ouvert échoue alors à charger un widget ou un chapitre.
 * On recharge la page une seule fois pour récupérer la nouvelle version.
 */
const FLAG = 'pc-chunk-reload'

export function withReload<T>(load: () => Promise<T>): () => Promise<T> {
  return () =>
    load().then(
      (m) => {
        try {
          sessionStorage.removeItem(FLAG)
        } catch {
          /* noop */
        }
        return m
      },
      (err) => {
        let reloaded = false
        try {
          reloaded = sessionStorage.getItem(FLAG) === '1'
          if (!reloaded) sessionStorage.setItem(FLAG, '1')
        } catch {
          reloaded = true
        }
        if (!reloaded) {
          window.location.reload()
          return new Promise<T>(() => {})
        }
        throw err
      },
    )
}
