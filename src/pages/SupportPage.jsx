import { Link } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter'
import { SUPPORT_EMAIL } from '../lib/siteConfig'

const ISSUE_DETAILS = [
  'Your Twitch username',
  'Device and platform',
  'What you expected to happen',
  'What actually happened',
  'A screenshot or screen recording if one is easy to share',
]

const PRIORITY_AREAS = [
  'Twitch connection or callback issues',
  'Subscriber sync problems',
  'Unexpected missing or incorrect subscriber review data',
  'Privacy, deletion, or data access questions',
]

export default function SupportPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip pb-12">
      <div className="pointer-events-none absolute inset-x-0 top-[-14rem] mx-auto h-[30rem] w-[30rem] rounded-full bg-sky/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-[10rem] h-[18rem] w-[18rem] rounded-full bg-coral/18 blur-3xl" />

      <section className="mx-auto w-full max-w-4xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <Link to="/" className="text-sm font-semibold text-ink/65 hover:text-ink">
          Back to SubNudge
        </Link>

        <div className="mt-5 rounded-[1.4rem] border border-line/80 bg-white/82 p-5 shadow-soft backdrop-blur sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/55">Support</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Help for SubNudge beta testers
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink/70">
            SubNudge is in a small feedback-first beta. If something breaks, feels confusing, or makes the
            monthly subscriber review harder than it should be, send the details to support.
          </p>

          <div className="mt-6 rounded-2xl border border-mint/35 bg-mint/10 p-4">
            <p className="text-sm font-semibold text-ink">Contact</p>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="mt-1 inline-flex text-lg font-semibold text-ink hover:text-sky">
              {SUPPORT_EMAIL}
            </a>
            <p className="mt-2 text-sm leading-6 text-ink/68">
              Use this address for beta feedback, bug reports, privacy requests, and account or waitlist questions.
            </p>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <section className="rounded-2xl border border-line/70 bg-card/72 p-4">
              <h2 className="text-lg font-semibold text-ink">What To Include</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/72">
                {ISSUE_DETAILS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-line/70 bg-card/72 p-4">
              <h2 className="text-lg font-semibold text-ink">Beta Priorities</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/72">
                {PRIORITY_AREAS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-4 rounded-2xl border border-line/70 bg-white/72 p-4">
            <h2 className="text-lg font-semibold text-ink">A Note On The Beta</h2>
            <p className="mt-2 text-sm leading-6 text-ink/72">
              The first cohort is intentionally small so support can stay personal. SubNudge helps creators review
              subscriber changes and decide on manual nudges; it is not automatic outreach or a full analytics suite.
            </p>
          </section>
        </div>
      </section>

      <SiteFooter className="mt-8" />
    </main>
  )
}
