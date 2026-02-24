import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import WaitlistForm from '../components/WaitlistForm'

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-clip pb-12">
      <div className="pointer-events-none absolute inset-x-0 top-[-16rem] mx-auto h-[34rem] w-[34rem] rounded-full bg-sky/35 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] top-[8rem] h-[20rem] w-[20rem] rounded-full bg-coral/25 blur-3xl" />
      <div className="pointer-events-none absolute left-[-6rem] top-[22rem] h-[16rem] w-[16rem] rounded-full bg-[#0e1634]/10 blur-3xl" />

      <section className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <div className="rounded-[2rem] border border-line/80 bg-white/82 p-4 shadow-soft backdrop-blur sm:p-6 lg:p-8">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
              <Sparkles className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
              Twitch creator revenue guard
            </div>
            <Link
              to="/twitch/callback?code=test123&state=local-dev"
              className="text-xs font-medium text-ink/55 underline decoration-line underline-offset-4 hover:text-ink"
            >
              Test callback route
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-[3.15rem]">
                Prime subs expire quietly.
                <span className="mt-1 block text-[#0e1634]">Your recurring revenue shouldn&apos;t.</span>
              </h1>
              <p className="mt-4 max-w-md text-base leading-7 text-ink/70 sm:text-lg">
                SubNudge helps Twitch creators catch likely drop-offs, keep supporter context, and send personal nudges before viewers disappear into spreadsheet chaos.
              </p>

              <div className="mt-6 max-w-md rounded-[1.4rem] border border-coral/20 bg-gradient-to-br from-white to-card/70 p-1 shadow-[0_14px_40px_rgba(18,26,53,0.10)]">
                <WaitlistForm compact />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink/65">
                <span className="rounded-full border border-line bg-white/75 px-3 py-1.5">Prime-heavy audiences</span>
                <span className="rounded-full border border-line bg-white/75 px-3 py-1.5">Manual nudges</span>
                <span className="rounded-full border border-line bg-white/75 px-3 py-1.5">No spam automation</span>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[1.8rem] border border-line/60 bg-white/40 p-3 shadow-[0_24px_60px_rgba(18,26,53,0.08)] backdrop-blur sm:p-4">
                <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] ring-1 ring-white/40" />
                <img
                  src="/device-shells/app-preview-final.png"
                  alt="SubNudge mobile app preview"
                  className="block w-full rounded-[1.2rem] shadow-[0_26px_50px_rgba(18,26,53,0.18)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-4 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-[1.4rem] border border-white/10 bg-[#0b1230] p-3 shadow-[0_20px_60px_rgba(11,18,48,0.22)] sm:grid-cols-3 sm:p-4">
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Revenue risk</p>
            <p className="mt-1 text-sm font-medium text-white">Prime subs drop monthly. Missed follow-ups compound.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">SubNudge value</p>
            <p className="mt-1 text-sm font-medium text-white">Spot likely expirations and review who needs a nudge.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Creator-first</p>
            <p className="mt-1 text-sm font-medium text-white">Keep it personal with notes, tags, and manual outreach.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
