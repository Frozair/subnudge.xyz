import { validateWaitlistPayload } from '../src/lib/validation.js'

const WAITLIST_SOURCE = 'subnudge.xyz-waitlist'
const WAITLIST_VERSION = 2
const DEFAULT_TO_EMAIL = 'subnudge@frozair.xyz'

function jsonResponse(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...headers,
    },
  })
}

function buildSubmission(payload) {
  return {
    ...payload,
    submittedAt: new Date().toISOString(),
    source: WAITLIST_SOURCE,
    version: WAITLIST_VERSION,
  }
}

function buildWaitlistEmail(submission) {
  return [
    'New SubNudge waitlist submission',
    '',
    `Email: ${submission.email}`,
    `Twitch: @${submission.twitchUsername}`,
    `Submitted: ${submission.submittedAt}`,
    `Source: ${submission.source}`,
    `Version: ${submission.version}`,
  ].join('\n')
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return jsonResponse(
      { ok: false, message: 'Method not allowed.' },
      405,
      { Allow: 'POST' },
    )
  }

  let payload

  try {
    payload = await request.json()
  } catch {
    return jsonResponse({ ok: false, message: 'Invalid JSON payload.' }, 400)
  }

  const result = validateWaitlistPayload(payload)
  if (!result.isValid) {
    return jsonResponse(
      {
        ok: false,
        errors: result.errors,
        message: 'Please correct the highlighted fields.',
      },
      400,
    )
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.WAITLIST_FROM_EMAIL
  const toEmail = process.env.WAITLIST_TO_EMAIL || DEFAULT_TO_EMAIL

  if (!resendApiKey || !fromEmail) {
    console.error('Waitlist delivery is not configured. Missing RESEND_API_KEY or WAITLIST_FROM_EMAIL.')
    return jsonResponse(
      {
        ok: false,
        message: 'Waitlist delivery is not configured yet.',
      },
      503,
    )
  }

  const submission = buildSubmission(result.normalized)
  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `New SubNudge waitlist submission: @${submission.twitchUsername}`,
      text: buildWaitlistEmail(submission),
    }),
  })

  if (!resendResponse.ok) {
    const errorDetails = await resendResponse.text().catch(() => '')
    console.error('Waitlist email delivery failed.', resendResponse.status, errorDetails)
    return jsonResponse(
      {
        ok: false,
        message: 'We could not save your waitlist spot. Please try again in a moment.',
      },
      502,
    )
  }

  const delivery = await resendResponse.json().catch(() => null)

  return jsonResponse({
    ok: true,
    submission,
    deliveryId: delivery?.id ?? null,
  })
}
