import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Landing from '@/pages/Landing'
import AppLayout from '@/components/AppLayout'
import Onboarding from '@/pages/Onboarding'
import Dashboard from '@/pages/Dashboard'
import SubjectPage from '@/pages/SubjectPage'
import ChapterPage from '@/pages/ChapterPage'
import { useProfile } from '@/hooks/useProfile'
import { useTheme } from '@/hooks/useTheme'

/** Bloque l'accès à l'espace tant que le code d'invitation n'a pas été validé. */
function Gate({ children }: { children: React.ReactNode }) {
  const { profile } = useProfile()
  const loc = useLocation()
  if (!profile.unlocked) return <Navigate to="/" replace />
  if (!profile.onboarded && loc.pathname !== '/app/bienvenue') return <Navigate to="/app/bienvenue" replace />
  return <>{children}</>
}

export default function App() {
  useTheme()
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/app"
          element={
            <Gate>
              <AppLayout />
            </Gate>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="bienvenue" element={<Onboarding />} />
          <Route path="matiere/:subject" element={<SubjectPage />} />
          <Route path="matiere/:subject/:chapter" element={<ChapterPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
