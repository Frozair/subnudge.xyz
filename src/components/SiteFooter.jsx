import { Link } from 'react-router-dom'
import { SUPPORT_EMAIL } from '../lib/siteConfig'

export default function SiteFooter({ className = '' }) {
  return (
    <footer
      className={`mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 text-sm text-ink/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 ${className}`}
    >
      <p>SubNudge is a free app for Twitch creators doing manual subscriber review.</p>
      <nav aria-label="Footer links" className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link to="/privacy" className="font-medium text-ink/70 hover:text-ink">
          Privacy
        </Link>
        <Link to="/support" className="font-medium text-ink/70 hover:text-ink">
          Support
        </Link>
        <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-ink/70 hover:text-ink">
          Contact
        </a>
      </nav>
    </footer>
  )
}
