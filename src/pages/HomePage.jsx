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
              <div className="rounded-[1.7rem] border border-white/10 bg-[#0b1230] p-3 shadow-[0_30px_70px_rgba(11,18,48,0.32)] sm:p-4">
                <div className="mb-3 flex items-center gap-2 px-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="ml-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">SubNudge preview</span>
                </div>

                <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/5 p-3 sm:p-4">
                  <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.18)_1px,transparent_0)] [background-size:14px_14px]" />
                  <div className="absolute right-4 top-4 rotate-[-4deg] rounded-xl border border-coral/40 bg-coral/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-panel">
                    No spreadsheet night
                  </div>
                  <div className="relative rounded-2xl border border-line/50 bg-card/95 p-2 shadow-panel">
                    <img
                      src="/snapshots/dashboard-screen.png"
                      alt="SubNudge dashboard snapshot"
                      className="h-[18rem] w-full rounded-xl object-cover object-top sm:h-[22rem] lg:h-[24rem]"
                    />
                  </div>

                  <div className="relative mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/90 p-2 shadow-panel">
                      <img
                        src="/snapshots/supporters-states.png"
                        alt="Supporters states snapshot"
                        className="h-28 w-full rounded-xl object-cover object-top sm:h-32"
                        loading="lazy"
                      />
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">Who needs attention</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/90 p-2 shadow-panel">
                      <img
                        src="/snapshots/supporter-detail-states.png"
                        alt="Supporter detail snapshot"
                        className="h-28 w-full rounded-xl object-cover object-top sm:h-32"
                        loading="lazy"
                      />
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">Notes + follow-up context</p>
                    </div>
                  </div>
                </div>
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
