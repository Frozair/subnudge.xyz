import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import WaitlistForm from '../components/WaitlistForm'

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-clip pb-12">
      <div className="pointer-events-none absolute inset-x-0 top-[-16rem] mx-auto h-[34rem] w-[34rem] rounded-full bg-sky/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] top-[8rem] h-[20rem] w-[20rem] rounded-full bg-coral/20 blur-3xl" />

      <section className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <div className="rounded-[2rem] border border-line/90 bg-white/80 p-4 shadow-soft backdrop-blur sm:p-6 lg:p-8">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
              <Sparkles className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
              SubNudge
            </div>
            <Link
              to="/twitch/callback?code=test123&state=local-dev"
              className="text-xs font-medium text-ink/70 underline decoration-line underline-offset-4 hover:text-ink"
            >
              Test callback route
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
                Stop doing monthly sub checks in spreadsheets.
              </h1>
              <p className="mt-4 max-w-md text-base leading-7 text-ink/70 sm:text-lg">
                A simple creator CRM for tracking changes, keeping supporter context, and sending personal nudges.
              </p>

              <div className="mt-6 max-w-md">
                <WaitlistForm compact />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink/65">
                <span className="rounded-full border border-line bg-white/70 px-3 py-1.5">Mobile-first</span>
                <span className="rounded-full border border-line bg-white/70 px-3 py-1.5">Twitch creators</span>
                <span className="rounded-full border border-line bg-white/70 px-3 py-1.5">Manual follow-ups</span>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[1.7rem] border border-line/90 bg-[#0e1634] p-3 shadow-soft sm:p-4">
                <div className="mb-3 flex items-center gap-2 px-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="ml-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">SubNudge preview</span>
                </div>

                <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/5 p-3 sm:p-4">
                  <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.18)_1px,transparent_0)] [background-size:14px_14px]" />
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
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">Supporters</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/90 p-2 shadow-panel">
                      <img
                        src="/snapshots/supporter-detail-states.png"
                        alt="Supporter detail snapshot"
                        className="h-28 w-full rounded-xl object-cover object-top sm:h-32"
                        loading="lazy"
                      />
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">Detail + notes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
