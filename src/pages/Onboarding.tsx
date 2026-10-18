import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DynamicIcon } from '@/components/SubjectIcon'
import { SUBJECTS } from '@/content/subjects'
import { chaptersOf } from '@/content'
import type { SubjectId } from '@/content/types'
import { useProfile } from '@/hooks/useProfile'
import { cn } from '@/lib/utils'

const MAX = 3

export default function Onboarding() {
  const { profile, update } = useProfile()
  const [step, setStep] = useState(profile.onboarded ? 1 : 0)
  const [name, setName] = useState(profile.name)
  const [spe, setSpe] = useState<SubjectId[]>(profile.specialites)
  const navigate = useNavigate()
  const specialites = SUBJECTS.filter((s) => s.category === 'specialite')
  const tronc = SUBJECTS.filter((s) => s.category === 'tronc')

  const toggle = (id: SubjectId) =>
    setSpe((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : cur.length >= MAX ? cur : [...cur, id]))

  const finish = () => {
    update({ name: name.trim(), specialites: spe, onboarded: true })
    navigate('/app')
  }

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] bg-grid">
      <div className="container max-w-3xl py-12">
        <div className="mb-8 flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className={cn('h-1 flex-1', i <= step ? 'bg-foreground' : 'bg-border')} />
          ))}
        </div>

        <div className="animate-slide-up border bg-card">
          {step === 0 && (
            <div className="p-8">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Étape 1 / 3</div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight">Bienvenue en Première Classe 🎓</h1>
              <p className="mt-2 text-muted-foreground">Comment veux-tu qu’on t’appelle ? (facultatif, reste sur ton appareil)</p>
              <Input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && setStep(1)} placeholder="Ton prénom" className="mt-6 h-11 max-w-sm text-base" autoFocus />
              <div className="mt-8 flex justify-end">
                <Button onClick={() => setStep(1)}>
                  Continuer <ArrowRight />
                </Button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="p-8">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Étape 2 / 3</div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight">Choisis tes 3 spécialités</h1>
              <p className="mt-2 text-muted-foreground">En Première générale, tu suis trois enseignements de spécialité. Tu pourras changer plus tard.</p>
              <div className="mt-6 grid gap-px border bg-border sm:grid-cols-2">
                {specialites.map((s) => {
                  const on = spe.includes(s.id)
                  const disabled = !on && spe.length >= MAX
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggle(s.id)}
                      disabled={disabled}
                      className={cn('relative flex items-start gap-3 bg-card p-4 text-left transition-colors', on ? 'bg-accent' : 'hover:bg-accent/50', disabled && 'opacity-40')}
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center border bg-background" style={{ color: `hsl(${s.hue} 70% 50%)` }}>
                        <DynamicIcon name={s.icon} className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{s.name}</span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">{s.description}</span>
                        <span className="mt-2 block font-mono text-[10px] text-muted-foreground">{chaptersOf(s.id).length} chapitres</span>
                      </span>
                      <span className={cn('flex size-5 shrink-0 items-center justify-center border', on && 'border-foreground bg-foreground text-background')}>{on && <Check className="size-3" />}</span>
                    </button>
                  )
                })}
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Info className="size-3.5" />
                {spe.length}/{MAX} sélectionnées. Les autres spécialités (SES, HGGSP, HLP…) arrivent bientôt.
              </div>
              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(0)}>
                  <ArrowLeft /> Retour
                </Button>
                <Button onClick={() => setStep(2)} disabled={spe.length === 0}>
                  Continuer <ArrowRight />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-8">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Étape 3 / 3</div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight">Ton programme {name ? `, ${name}` : ''}</h1>
              <p className="mt-2 text-muted-foreground">Voici les matières de ton espace. Le tronc commun est inclus pour tout le monde.</p>
              {[
                { label: 'Spécialités', list: SUBJECTS.filter((s) => spe.includes(s.id)) },
                { label: 'Tronc commun', list: tronc },
              ].map((g) => (
                <div key={g.label} className="mt-6">
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{g.label}</div>
                  <div className="flex flex-wrap gap-2">
                    {g.list.map((s) => (
                      <span key={s.id} className="inline-flex items-center gap-2 border bg-background px-3 py-1.5 text-sm">
                        <DynamicIcon name={s.icon} className="size-3.5" />
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  <ArrowLeft /> Retour
                </Button>
                <Button onClick={finish}>
                  C’est parti <ArrowRight />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
