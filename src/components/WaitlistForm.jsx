import { useEffect, useState } from 'react'
import { CheckCircle2, LoaderCircle, Mail, Tv2 } from 'lucide-react'
import { getStoredWaitlistSubmission, saveWaitlistSubmission } from '../lib/storage'
import { validateWaitlistPayload } from '../lib/validation'

const LOCAL_WAITLIST_SOURCE = 'subnudge.xyz-waitlist-local'

function canUseLocalWaitlistFallback() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
}

function saveWaitlistSubmissionLocally(payload) {
  const record = {
    ...payload,
    submittedAt: new Date().toISOString(),
    source: LOCAL_WAITLIST_SOURCE,
    version: 1,
  }

  return saveWaitlistSubmission(record)
}

function isLocalOnlySubmission(record) {
  if (!record || typeof record !== 'object') {
    return false
  }

  return record.source === LOCAL_WAITLIST_SOURCE || record.version === 1
}

async function submitWaitlist(payload) {
  const allowLocalFallback = canUseLocalWaitlistFallback()

  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const body = await response.json().catch(() => null)

    if (!response.ok) {
      if (allowLocalFallback && response.status === 404) {
        return saveWaitlistSubmissionLocally(payload)
      }

      const error = new Error(
        typeof body?.message === 'string'
          ? body.message
          : 'We could not save your waitlist spot. Please try again.',
      )

      if (body?.errors && typeof body.errors === 'object') {
        error.fieldErrors = body.errors
      }

      throw error
    }

    if (!body?.submission || typeof body.submission !== 'object') {
      throw new Error('We could not confirm your waitlist spot. Please try again.')
    }

    return saveWaitlistSubmission(body.submission)
  } catch (error) {
    if (allowLocalFallback && error instanceof TypeError) {
      return saveWaitlistSubmissionLocally(payload)
    }

    throw error
  }
}

function formatTimestamp(value) {
  try {
    return new Date(value).toLocaleString()
  } catch {
    return value
  }
}

export default function WaitlistForm({ compact = false }) {
  const [form, setForm] = useState({ email: '', twitchUsername: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(null)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    const existing = getStoredWaitlistSubmission()
    if (existing) {
      setSubmitted(existing)
      setForm({
        email: existing.email ?? '',
        twitchUsername: existing.twitchUsername ?? '',
      })
    }
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setSubmitError('')
    setErrors((current) => {
      if (!current[name]) {
        return current
      }
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitted || isSubmitting) {
      return
    }

    const result = validateWaitlistPayload(form)
    if (!result.isValid) {
      setErrors(result.errors)
      return
    }

    setIsSubmitting(true)
    setErrors({})
    setSubmitError('')

    try {
      const record = await submitWaitlist(result.normalized)
      setSubmitted(record)
      setForm({
        email: record.email,
        twitchUsername: record.twitchUsername,
      })
    } catch (error) {
      if (error?.fieldErrors && typeof error.fieldErrors === 'object') {
        setErrors(error.fieldErrors)
      }

      setSubmitError(
        typeof error?.message === 'string'
          ? error.message
          : 'We could not save your waitlist spot. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const localOnlySubmission = isLocalOnlySubmission(submitted)

  return (
    <div
      className={
        compact
          ? 'rounded-3xl border border-ink/10 bg-white p-4 shadow-[0_18px_40px_rgba(18,26,53,0.14)] ring-1 ring-sky/10 sm:p-5'
          : 'rounded-3xl border border-line/80 bg-card/95 p-6 shadow-soft backdrop-blur sm:p-7'
      }
    >
      {!compact ? (
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/60">Early Access</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
            Join the SubNudge waitlist
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink/70">
            For creators who want a faster monthly follow-up workflow.
          </p>
        </div>
      ) : (
        <div className="mb-4">
          <div className="mb-2 h-1.5 w-20 rounded-full bg-gradient-to-r from-coral to-sky" />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/60">Early Access Waitlist</p>
            <p className="text-xs text-ink/55">Email + Twitch</p>
          </div>
          <p className="mt-2 text-sm font-medium text-ink/80">Get first access when SubNudge opens.</p>
        </div>
      )}

      {submitted ? (
        <div className="rounded-2xl border border-mint/40 bg-mint/10 p-4 text-sm text-ink">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-mint" aria-hidden="true" />
            <div>
              <p className="font-semibold">You&apos;re on the list.</p>
              <p className="mt-1 text-ink/75">
                {localOnlySubmission ? 'Saved locally in this browser as ' : 'Sent to the SubNudge waitlist inbox as '}
                <span className="font-medium text-ink">{submitted.email}</span> (Twitch:{' '}
                <span className="font-medium text-ink">@{submitted.twitchUsername}</span>).
              </p>
              <p className="mt-1 text-xs text-ink/60">
                Submitted: {formatTimestamp(submitted.submittedAt)}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <form className={compact ? 'mt-4 space-y-3.5' : 'mt-5 space-y-4'} onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email" className={compact ? 'sr-only' : 'mb-2 block text-sm font-medium text-ink'}>
            Email
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-line bg-white px-3 py-2.5 focus-within:border-sky focus-within:ring-2 focus-within:ring-sky/20">
            <Mail className="h-4 w-4 text-ink/45" aria-hidden="true" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@creatormail.com"
              value={form.email}
              onChange={handleChange}
              disabled={Boolean(submitted) || isSubmitting}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="w-full border-0 bg-transparent p-0 text-sm text-ink outline-none placeholder:text-ink/35"
            />
          </div>
          {errors.email ? (
            <p id="email-error" className="mt-2 text-xs text-coral">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="twitchUsername"
            className={compact ? 'sr-only' : 'mb-2 block text-sm font-medium text-ink'}
          >
            Twitch username
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-line bg-white px-3 py-2.5 focus-within:border-sky focus-within:ring-2 focus-within:ring-sky/20">
            <Tv2 className="h-4 w-4 text-ink/45" aria-hidden="true" />
            <span className="text-sm text-ink/50">@</span>
            <input
              id="twitchUsername"
              name="twitchUsername"
              type="text"
              autoComplete="off"
              placeholder="yourchannel"
              value={form.twitchUsername}
              onChange={handleChange}
              disabled={Boolean(submitted) || isSubmitting}
              aria-invalid={Boolean(errors.twitchUsername)}
              aria-describedby={errors.twitchUsername ? 'twitch-error' : undefined}
              className="w-full border-0 bg-transparent p-0 text-sm text-ink outline-none placeholder:text-ink/35"
            />
          </div>
          {errors.twitchUsername ? (
            <p id="twitch-error" className="mt-2 text-xs text-coral">
              {errors.twitchUsername}
            </p>
          ) : null}
        </div>

        {submitError ? (
          <p className="rounded-2xl border border-coral/30 bg-coral/10 px-3 py-2 text-xs text-coral">
            {submitError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={Boolean(submitted) || isSubmitting}
          className={
            compact
              ? 'inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(18,26,53,0.28)] transition hover:translate-y-[-1px] hover:bg-[#0f1735] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0'
              : 'inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[#0f1735] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0'
          }
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Saving...
            </>
          ) : submitted ? (
            localOnlySubmission ? 'Saved locally for localhost' : "You're on the waitlist"
          ) : (
            compact ? 'Protect my monthly revenue' : 'Join the waitlist'
          )}
        </button>

        {!compact ? (
          <p className="text-xs leading-5 text-ink/60">
            Delivered to the waitlist inbox on Vercel. On localhost without the API, it falls back to a browser save.
          </p>
        ) : null}
        {compact ? (
          <p className="text-[11px] leading-4 text-ink/50">
            Hosted on Vercel. Localhost falls back to an in-browser save.
          </p>
        ) : null}
      </form>
    </div>
  )
}
