import { ArrowRight, BellRing, ClipboardList, Sparkles, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import WaitlistForm from '../components/WaitlistForm'

const painPoints = [
  'Check Twitch subs and compare against last month by hand',
  'Guess who probably expired (especially Prime-heavy audiences)',
  'Track contact notes in spreadsheets, Notion, or DMs',
  'Remember who you already nudged and who still needs a follow-up',
]

const outcomes = [
  {
    title: 'Sync and compare',
    body: 'See who is active now and who likely dropped off based on list diffs, without pretending to know exact Twitch expiry timestamps.',
    icon: ClipboardList,
  },
  {
    title: 'Keep context with each supporter',
    body: 'Store Discord handles, notes, and tags so follow-ups stay personal instead of turning into generic blasts.',
    icon: UsersRound,
  },
  {
    title: 'Run a monthly nudge review',
    body: 'Open a focused “Needs Attention” list and work through it manually when you are ready.',
    icon: BellRing,
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
            Track subscriber changes and send better follow-ups without the spreadsheet ritual.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-ink/75 sm:text-lg">
            SubNudge is built for creators who know their supporters personally and want a cleaner monthly workflow for manual, human-in-the-loop nudges.
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

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {painPoints.map((item) => (
              <div key={item} className="rounded-2xl border border-line/90 bg-white/70 p-4 shadow-panel backdrop-blur">
                <p className="text-sm leading-6 text-ink/80">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="waitlist" className="lg:sticky lg:top-8">
          <WaitlistForm />
        </div>
      </section>

      <section className="mx-auto mt-4 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-3xl border border-line bg-white/85 p-5 shadow-soft backdrop-blur sm:p-6 lg:grid-cols-3">
          {outcomes.map(({ title, body, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-line/70 bg-card/80 p-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky/10 text-sky">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-3 text-base font-semibold tracking-tight text-ink">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink/70">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-3xl border border-line bg-[#0b132a] p-6 text-white shadow-soft sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Who it&apos;s for</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Small to mid Twitch creators with real relationships to their supporters
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              SubNudge is especially useful when your audience includes a lot of Prime subs and your retention workflow depends on personal reminders, not fully automated campaigns.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold">Current monthly loop (what SubNudge replaces)</p>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-white/80">
              <li>1. Check/export current subscribers</li>
              <li>2. Update spreadsheet manually</li>
              <li>3. Guess who expired</li>
              <li>4. DM or text supporters manually</li>
              <li>5. Repeat next month</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-line bg-white/80 p-6 shadow-panel backdrop-blur sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/55">Next step</p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-ink">
              Get early access before Twitch connect and sync flows go live.
            </p>
            <p className="mt-1 text-sm text-ink/70">Local waitlist stub for now. Callback route is ready for OAuth redirect tests.</p>
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
