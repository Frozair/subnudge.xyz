import { Sparkles } from 'lucide-react'
import SiteFooter from '../components/SiteFooter'
import WaitlistForm from '../components/WaitlistForm'

const NEXT_STEPS = [
  'Join the waitlist',
  'Get an invite',
  'Connect Twitch',
  'Review who needs a nudge',
]

const BUILT_FOR = [
  'Twitch Affiliates and Partners',
  'Prime-heavy audiences',
  'Creators who know many subscribers personally',
  'Creators using spreadsheets, Notion, or memory today',
]

const NOT_BUILT_FOR = [
  'Automatic DM spam',
  'A full analytics suite',
  'Replacing real community relationships',
]

const FAQS = [
  {
    question: 'Does SubNudge send automatic messages?',
    answer:
      'No. SubNudge is human-in-the-loop. It helps you review likely follow-up moments, then you decide if and how to send a manual nudge.',
  },
  {
    question: 'Does Twitch provide exact Prime expiry dates?',
    answer:
      'No. SubNudge compares subscriber syncs over time to flag likely changes for your monthly subscriber review.',
  },
  {
    question: 'Is it free?',
    answer:
      'Yes. SubNudge is a free app. The beta cohort is small and feedback-first, and a donation/support link may appear later, but the core app is not paid.',
  },
  {
    question: 'What data do you store?',
    answer:
      'For the waitlist, email, Twitch username, and signup attribution. In the app, SubNudge stores the Twitch and subscriber details needed for review, plus notes you add.',
  },
  {
    question: 'Who is this not for?',
    answer:
      'Creators looking for mass messaging, broad analytics dashboards, or a replacement for personal community relationships.',
  },
]

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-clip pb-12">
      <div className="pointer-events-none absolute inset-x-0 top-[-16rem] mx-auto h-[34rem] w-[34rem] rounded-full bg-sky/35 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] top-[8rem] h-[20rem] w-[20rem] rounded-full bg-coral/25 blur-3xl" />
      <div className="pointer-events-none absolute left-[-6rem] top-[22rem] h-[16rem] w-[16rem] rounded-full bg-[#0e1634]/10 blur-3xl" />

      <section className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <div className="rounded-[2rem] border border-line/80 bg-white/82 p-4 shadow-soft backdrop-blur sm:p-6 lg:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
              <Sparkles className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
              Twitch subscriber tracker beta
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-[3.15rem]">
                Prime subs expire quietly.
                <span className="mt-1 block text-[#0e1634]">Your monthly subscriber review shouldn&apos;t.</span>
              </h1>
              <p className="mt-4 max-w-md text-base leading-7 text-ink/70 sm:text-lg">
                SubNudge is a Twitch subscriber tracker for Prime-heavy audiences: replace spreadsheet chaos, catch likely drop-offs, keep supporter context, and decide on manual nudges yourself.
              </p>

              <div
                id="waitlist"
                className="mt-6 max-w-md scroll-mt-6 rounded-[1.4rem] border border-coral/20 bg-gradient-to-br from-white to-card/70 p-1 shadow-[0_14px_40px_rgba(18,26,53,0.10)]"
              >
                <WaitlistForm compact />
              </div>
              <p className="mt-3 max-w-md text-sm font-medium text-ink/70">
                Free app for creators doing a monthly subscriber review. Small beta cohort. Feedback-first.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink/65">
                <span className="rounded-full border border-line bg-white/75 px-3 py-1.5">Prime-heavy audiences</span>
                <span className="rounded-full border border-line bg-white/75 px-3 py-1.5">Manual nudges</span>
                <span className="rounded-full border border-line bg-white/75 px-3 py-1.5">Human-in-the-loop</span>
                <span className="rounded-full border border-line bg-white/75 px-3 py-1.5">No spam automation</span>
              </div>
            </div>

            <div className="relative lg:pt-3">
              <img
                src="/device-shells/subnudge-current-people.png"
                alt="SubNudge mobile app preview showing a Twitch subscriber review list with manual follow-up actions"
                className="mx-auto block h-auto max-h-[31rem] w-full max-w-[15rem] rounded-[2rem] border border-ink/10 shadow-[0_22px_70px_rgba(18,26,53,0.22)] sm:max-h-[35rem] sm:max-w-[17rem] lg:max-h-[39rem] lg:max-w-[18rem]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-4 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-[1.4rem] border border-white/10 bg-[#0b1230] p-3 shadow-[0_20px_60px_rgba(11,18,48,0.22)] sm:grid-cols-3 sm:p-4">
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Review gap</p>
            <p className="mt-1 text-sm font-medium text-white">Prime subs drop monthly. Missed follow-ups compound.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">SubNudge value</p>
            <p className="mt-1 text-sm font-medium text-white">Spot likely drop-offs and review who needs a nudge.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Monthly review</p>
            <p className="mt-1 text-sm font-medium text-white">Keep it personal with notes, tags, and manual nudges.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-5 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.4rem] border border-line/80 bg-white/78 p-5 shadow-panel backdrop-blur sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/55">What happens next</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {NEXT_STEPS.map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-2xl border border-line/80 bg-card/70 p-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm font-semibold text-ink">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.4rem] border border-line/80 bg-white/78 p-5 shadow-panel backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">Built for</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/75">
                {BUILT_FOR.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.4rem] border border-line/80 bg-white/78 p-5 shadow-panel backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">Not built for</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/75">
                {NOT_BUILT_FOR.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-5 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[1.4rem] border border-line/80 bg-card/82 p-5 shadow-panel backdrop-blur sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/55">FAQ</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Clear beta expectations</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-ink/65">
              A narrow workflow for creators who want to replace spreadsheet chaos without automating relationships.
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {FAQS.map((item) => (
              <article key={item.question} className="rounded-2xl border border-line/70 bg-white/72 p-4">
                <h3 className="text-base font-semibold text-ink">{item.question}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 rounded-[1.4rem] border border-line/80 bg-white/78 p-5 shadow-panel backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/55">Private beta</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Ready to replace spreadsheet chaos?</h2>
          </div>
          <a
            href="#waitlist"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[#0f1735]"
          >
            Join the waitlist
          </a>
        </div>
      </section>

      <SiteFooter className="mt-8" />
    </main>
  )
}
