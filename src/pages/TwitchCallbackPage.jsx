import { useEffect, useRef, useState } from 'react'

const DEEP_LINK_BASE = 'subnudge://oauth/callback'
const FALLBACK_MESSAGE_DELAY_MS = 1200

function getDeepLinkTarget() {
  if (typeof window === 'undefined') {
    return DEEP_LINK_BASE
  }

  return `${DEEP_LINK_BASE}${window.location.search}${window.location.hash}`
}

export default function TwitchCallbackPage() {
  const [showFallbackHint, setShowFallbackHint] = useState(false)
  const hasAttemptedRedirectRef = useRef(false)
  const target = getDeepLinkTarget()

  useEffect(() => {
    if (typeof window === 'undefined' || hasAttemptedRedirectRef.current) {
      return undefined
    }

    hasAttemptedRedirectRef.current = true

    const timeoutId = window.setTimeout(() => {
      setShowFallbackHint(true)
    }, FALLBACK_MESSAGE_DELAY_MS)

    try {
      window.location.replace(target)
    } catch {
      // If the browser blocks the scheme redirect, keep the manual link visible.
    }

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [target])

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-sky/15 to-transparent" />

      <section className="w-full max-w-lg rounded-3xl border border-line bg-white/90 p-6 text-center shadow-panel sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/55">Twitch OAuth</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Returning to SubNudge...</h1>
        <p className="mt-3 text-sm leading-6 text-ink/70">
          We&apos;re handing this sign-in callback back to the app now.
        </p>

        <a
          href={target}
          className="mt-6 inline-flex items-center justify-center rounded-2xl border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-sky/5"
        >
          Open SubNudge
        </a>

        {showFallbackHint ? (
          <p className="mt-4 text-sm text-ink/70">If the app didn&apos;t open, tap the link above.</p>
        ) : null}
      </section>
    </main>
  )
}
