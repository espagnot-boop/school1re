import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, KeyRound, Loader2, Sparkles } from 'lucide-react'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { LogoMark } from '@/components/Logo'
import { INVITE_CODE, useProfile } from '@/hooks/useProfile'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'checking' | 'error' | 'success'

export function InviteDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const inputRef = useRef<HTMLInputElement>(null)
  const { profile, update } = useProfile()
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      setStatus('idle')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!code.trim() || status === 'checking' || status === 'success') return
    setStatus('checking')
    setTimeout(() => {
      if (code.trim().toUpperCase() === INVITE_CODE) {
        setStatus('success')
        update({ unlocked: true })
        setTimeout(() => {
          onClose()
          navigate(profile.onboarded ? '/app' : '/app/bienvenue')
        }, 900)
      } else {
        setStatus('error')
      }
    }, 900)
  }

  const fill = () => {
    setCode('Hello27')
    setStatus('idle')
    inputRef.current?.focus()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={submit}>
        <div className="border-b bg-grid p-6">
          <LogoMark className="size-8" />
          <h2 className="mt-4 text-xl font-semibold tracking-tight">Entre ton code d'invitation</h2>
          <p className="mt-1 text-sm text-muted-foreground">Première Classe est en accès anticipé. Un code suffit pour débloquer toutes les matières.</p>
        </div>
        <div className="p-6">
          <label htmlFor="invite" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Code d'invitation
          </label>
          <div className={cn('mt-2 flex items-center border transition-colors focus-within:border-foreground', status === 'error' && 'animate-shake border-destructive', status === 'success' && 'border-success')}>
            <KeyRound className="ml-3 size-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              id="invite"
              value={code}
              autoComplete="off"
              spellCheck={false}
              onChange={(e) => {
                setCode(e.target.value)
                if (status === 'error') setStatus('idle')
              }}
              placeholder="XXXXXXX"
              className="h-12 w-full bg-transparent px-3 font-mono text-lg uppercase tracking-[0.3em] outline-none placeholder:text-muted-foreground/40"
            />
            {status === 'checking' && <Loader2 className="mr-3 size-4 animate-spin text-muted-foreground" />}
            {status === 'success' && <CheckCircle2 className="mr-3 size-4 text-success" />}
          </div>
          <div className="mt-2 h-5 text-xs">
            {status === 'error' && <span className="text-destructive">Code invalide. Vérifie l'orthographe ou utilise le code ci-dessous.</span>}
            {status === 'checking' && <span className="text-muted-foreground">Vérification du code…</span>}
            {status === 'success' && <span className="text-success">Code valide — bienvenue en Première Classe !</span>}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 border border-dashed bg-muted/30 px-3 py-2.5">
            <div className="text-sm">
              <span className="text-muted-foreground">Tu n'en as pas ?</span> <span className="font-medium">Utilise celui-ci :</span>
            </div>
            <button type="button" onClick={fill} className="group inline-flex items-center gap-1.5 border bg-background px-2.5 py-1 font-mono text-sm font-semibold transition-colors hover:bg-primary hover:text-primary-foreground">
              <Sparkles className="size-3.5" />
              Hello27
            </button>
          </div>

          <Button type="submit" size="lg" className="mt-5 w-full" disabled={!code.trim() || status === 'checking' || status === 'success'}>
            {status === 'checking' ? (
              <>
                <Loader2 className="animate-spin" /> Vérification…
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle2 /> Accès débloqué
              </>
            ) : (
              <>
                Valider <ArrowRight />
              </>
            )}
          </Button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Appuie sur <kbd className="border bg-muted px-1 font-mono">Entrée</kbd> pour valider
          </p>
        </div>
      </form>
    </Dialog>
  )
}
