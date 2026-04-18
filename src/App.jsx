import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PrivacyPage from './pages/PrivacyPage'
import SupportPage from './pages/SupportPage'
import TwitchCallbackPage from './pages/TwitchCallbackPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/twitch/callback" element={<TwitchCallbackPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
