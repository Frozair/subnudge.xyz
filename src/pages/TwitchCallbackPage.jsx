import { Link, useLocation } from 'react-router-dom'
import { AlertTriangle, CheckCircle2, Info, Link2 } from 'lucide-react'

function parseParamString(value) {
  const trimmed = value.startsWith('#') || value.startsWith('?') ? value.slice(1) : value
  const params = new URLSearchParams(trimmed)
  const result = {}

  for (const [key, paramValue] of params.entries()) {
    result[key] = paramValue
  }

  return result
}

function StatusCard({ kind, title, body }) {
  const config = {
    success: {
      icon: CheckCircle2,
      className: 'border-mint/40 bg-mint/10 text-ink',
      iconClass: 'text-mint',
    },
    error: {
      icon: AlertTriangle,
      className: 'border-coral/35 bg-coral/10 text-ink',
      iconClass: 'text-coral',
    },
    neutral: {
      icon: Info,
      className: 'border-sky/30 bg-sky/10 text-ink',
      iconClass: 'text-sky',
    },
  }[kind]

  const Icon = config.icon

  return (
    <div className={`rounded-2xl border p-4 ${config.className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-5 w-5 ${config.iconClass}`} aria-hidden="true" />
        <div>
          <h1 className="text-base font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm leading-6 text-ink/75">{body}</p>
        </div>
      </div>
    </div>
  )
}

export default function TwitchCallbackPage() {
  const location = useLocation()
  const rawQuery = parseParamString(location.search)
  const rawHash = parseParamString(location.hash)
  const merged = { ...rawHash, ...rawQuery }
  const callbackUrl = typeof window !== 'undefined' ? window.location.href : ''

  let status = {
    kind: 'neutral',
    title: 'Callback route is live',
    body: 'No OAuth params detected yet. This page is ready for local Twitch redirect testing.',
  }

  if (merged.error) {
    status = {
      kind: 'error',
      title: 'OAuth callback returned an error',
      body: merged.error_description || `Twitch returned error: ${merged.error}`,
    }
  } else if (merged.code) {
    status = {
      kind: 'success',
      title: 'OAuth callback code received',
      body: 'The route captured a code parameter successfully. Token exchange is not implemented in this v1 page.',
    }
  }

  const fieldOrder = ['code', 'state', 'scope', 'error', 'error_description']

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-sky/15 to-transparent" />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/55">Twitch OAuth</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-ink">Callback Debug Page</p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center rounded-2xl border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-sky/5"
        >
          Back to waitlist
        </Link>
      </div>

      <StatusCard kind={status.kind} title={status.title} body={status.body} />

      <section className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-line bg-white/90 p-5 shadow-panel">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Link2 className="h-4 w-4 text-sky" aria-hidden="true" />
            Parsed callback values
          </div>

          <dl className="mt-4 space-y-3">
            {fieldOrder.map((field) => (
              <div key={field} className="rounded-2xl border border-line/80 bg-card/90 p-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">{field}</dt>
                <dd className="mt-1 break-all font-mono text-sm text-ink">
                  {merged[field] ? merged[field] : <span className="text-ink/45">(not present)</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-5">
          <section className="rounded-3xl border border-line bg-white/90 p-5 shadow-panel">
            <h2 className="text-sm font-semibold text-ink">Raw URL</h2>
            <pre className="mt-3 whitespace-pre-wrap break-all rounded-2xl border border-line/70 bg-card/80 p-3 text-xs leading-5 text-ink">
              {callbackUrl || '(available in browser runtime only)'}
            </pre>
          </section>

          <section className="rounded-3xl border border-line bg-white/90 p-5 shadow-panel">
            <h2 className="text-sm font-semibold text-ink">Parsed query params</h2>
            <pre className="mt-3 overflow-auto rounded-2xl border border-line/70 bg-card/80 p-3 text-xs leading-5 text-ink">
              {JSON.stringify(rawQuery, null, 2)}
            </pre>
            <h2 className="mt-4 text-sm font-semibold text-ink">Parsed hash params</h2>
            <pre className="mt-3 overflow-auto rounded-2xl border border-line/70 bg-card/80 p-3 text-xs leading-5 text-ink">
              {JSON.stringify(rawHash, null, 2)}
            </pre>
          </section>

          <section className="rounded-3xl border border-line bg-white/90 p-5 shadow-panel">
            <h2 className="text-sm font-semibold text-ink">Local test examples</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink/75">
              <li>
                <Link className="underline decoration-sky/50 underline-offset-4" to="/twitch/callback?code=test123&state=abc">
                  /twitch/callback?code=test123&amp;state=abc
                </Link>
              </li>
              <li>
                <Link
                  className="underline decoration-sky/50 underline-offset-4"
                  to="/twitch/callback?error=access_denied&error_description=User%20cancelled"
                >
                  /twitch/callback?error=access_denied&amp;error_description=User%20cancelled
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  )
}
