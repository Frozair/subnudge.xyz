import { Link } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter'
import { SUPPORT_EMAIL } from '../lib/siteConfig'

const PRIVACY_SECTIONS = [
  {
    title: 'What SubNudge Collects',
    items: [
      'Waitlist details: email address, Twitch username, signup timestamp, referrer, landing path, and UTM fields when present.',
      'Beta app details: Twitch account details and subscriber data needed to support monthly subscriber review.',
      'Creator-added details: notes, tags, and follow-up context you choose to save in the app.',
      'Support details: messages, screenshots, device details, and issue notes you send while testing.',
    ],
  },
  {
    title: 'How The Data Is Used',
    items: [
      'To manage the private alpha and beta waitlist.',
      'To help beta testers connect Twitch, review subscriber changes, and keep manual nudges organized.',
      'To troubleshoot bugs, improve the product, and understand which launch sources bring qualified creators.',
    ],
  },
  {
    title: 'What SubNudge Does Not Do',
    items: [
      'SubNudge does not send automatic messages or automatic DM spam.',
      'SubNudge does not provide exact Prime expiry tracking.',
      'SubNudge does not sell waitlist or beta tester contact details.',
    ],
  },
  {
    title: 'Service Providers',
    items: [
      'Formspark is used for waitlist submission storage and team notifications.',
      'Resend is used for optional waitlist welcome emails.',
      'Vercel hosts the website, waitlist API route, and Twitch callback route.',
      'Twitch OAuth is used by the app so creators can connect their Twitch account.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip pb-12">
      <div className="pointer-events-none absolute inset-x-0 top-[-14rem] mx-auto h-[30rem] w-[30rem] rounded-full bg-sky/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-[10rem] h-[18rem] w-[18rem] rounded-full bg-coral/18 blur-3xl" />

      <section className="mx-auto w-full max-w-4xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <Link to="/" className="text-sm font-semibold text-ink/65 hover:text-ink">
          Back to SubNudge
        </Link>

        <div className="mt-5 rounded-[1.4rem] border border-line/80 bg-white/82 p-5 shadow-soft backdrop-blur sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/55">Privacy</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            SubNudge beta privacy policy
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink/70">
            Last updated April 17, 2026. SubNudge is a free app for Twitch creators who want a cleaner,
            human-in-the-loop monthly subscriber review. This policy explains the practical data used by the
            website, waitlist, and beta app.
          </p>

          <div className="mt-6 grid gap-4">
            {PRIVACY_SECTIONS.map((section) => (
              <section key={section.title} className="rounded-2xl border border-line/70 bg-card/72 p-4">
                <h2 className="text-lg font-semibold text-ink">{section.title}</h2>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/72">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <section className="mt-4 rounded-2xl border border-line/70 bg-white/72 p-4">
            <h2 className="text-lg font-semibold text-ink">Questions Or Deletion Requests</h2>
            <p className="mt-2 text-sm leading-6 text-ink/72">
              Email{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-ink hover:text-sky">
                {SUPPORT_EMAIL}
              </a>{' '}
              to ask a privacy question, report a data concern, or request deletion of waitlist or beta data.
            </p>
          </section>
        </div>
      </section>

      <SiteFooter className="mt-8" />
    </main>
  )
}
