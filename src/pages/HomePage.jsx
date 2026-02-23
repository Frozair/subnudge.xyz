import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import WaitlistForm from '../components/WaitlistForm'

const quickPoints = [
  'Track likely expirations',
  'Keep notes + tags per supporter',
  'Review who needs a nudge',
]

const snapshots = [
  {
    title: 'Dashboard',
    caption: 'Current app snapshot',
    src: '/snapshots/dashboard-screen.png',
    alt: 'SubNudge dashboard snapshot',
  },
  {
    title: 'Supporters',
    caption: 'List and state views',
    src: '/snapshots/supporters-states.png',
    alt: 'SubNudge supporters list snapshot',
  },
  {
    title: 'Supporter detail',
    caption: 'Notes and nudge context',
    src: '/snapshots/supporter-detail-states.png',
    alt: 'SubNudge supporter detail snapshot',
  },
]

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-clip pb-16">
      <div className="pointer-events-none absolute inset-x-0 top-[-18rem] mx-auto h-[34rem] w-[34rem] rounded-full bg-sky/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-[26rem] h-[22rem] w-[22rem] rounded-full bg-coral/20 blur-3xl" />

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-10 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12 lg:px-8 lg:pt-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
            Mobile-first creator CRM for Twitch
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]">
            Stop tracking Twitch subs in spreadsheets.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-ink/75 sm:text-lg">
            SubNudge gives you a cleaner way to review subscriber changes and send personal follow-ups.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 rounded-2xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[#0f1735]"
            >
              Join waitlist
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              to="/twitch/callback?code=test123&state=local-dev"
              className="inline-flex items-center gap-2 rounded-2xl border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:border-sky/50 hover:bg-sky/5"
            >
              Test callback route
            </Link>
          </div>

          <ul className="mt-7 grid max-w-xl gap-3 sm:grid-cols-2">
            {quickPoints.map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-2xl border border-line/90 bg-white/70 px-3 py-3 text-sm text-ink/85 shadow-panel backdrop-blur">
                <CheckCircle2 className="h-4 w-4 text-mint" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div id="waitlist" className="lg:sticky lg:top-8">
          <WaitlistForm />
        </div>
      </section>

      <section className="mx-auto mt-4 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-line bg-white/85 p-5 shadow-soft backdrop-blur sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/55">Snapshots</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">What the app already looks like</h2>
            </div>
            <p className="text-sm text-ink/65">Current internal snapshot images from the mobile app build.</p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {snapshots.map((item) => (
              <figure key={item.title} className="overflow-hidden rounded-2xl border border-line/80 bg-card/80">
                <img src={item.src} alt={item.alt} className="h-48 w-full object-cover object-top sm:h-56 lg:h-44" loading="lazy" />
                <figcaption className="flex items-center justify-between gap-2 border-t border-line/70 px-3 py-2.5">
                  <span className="text-sm font-semibold text-ink">{item.title}</span>
                  <span className="text-xs text-ink/60">{item.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-line bg-white/80 p-6 shadow-panel backdrop-blur sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/55">Next step</p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-ink">
              Join the waitlist for early access.
            </p>
            <p className="mt-1 text-sm text-ink/70">Fast page now. More details later.</p>
          </div>
          <div className="flex gap-3">
            <a
              href="#waitlist"
              className="inline-flex items-center rounded-2xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[#0f1735]"
            >
              Join waitlist
            </a>
            <Link
              to="/twitch/callback"
              className="inline-flex items-center rounded-2xl border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-sky/5"
            >
              Open callback page
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
