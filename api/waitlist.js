import { validateWaitlistPayload } from '../src/lib/validation.js'

const WAITLIST_SOURCE = 'subnudge.xyz-waitlist'
const WAITLIST_VERSION = 2
const DEFAULT_TO_EMAIL = 'subnudge@frozair.xyz'

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

function readJsonBody(request) {
  if (typeof request.body === 'string') {
    return JSON.parse(request.body)
  }

  if (!request.body || typeof request.body !== 'object' || Array.isArray(request.body)) {
    throw new Error('Invalid JSON payload.')
  }

  return request.body
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ ok: false, message: 'Method not allowed.' })
  }

  let payload

  try {
    payload = readJsonBody(request)
  } catch {
    return response.status(400).json({ ok: false, message: 'Invalid JSON payload.' })
  }

  const result = validateWaitlistPayload(payload)
  if (!result.isValid) {
    return response.status(400).json({
      ok: false,
      errors: result.errors,
      message: 'Please correct the highlighted fields.',
    })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.WAITLIST_FROM_EMAIL
  const toEmail = process.env.WAITLIST_TO_EMAIL || DEFAULT_TO_EMAIL

  if (!resendApiKey || !fromEmail) {
    console.error('Waitlist delivery is not configured. Missing RESEND_API_KEY or WAITLIST_FROM_EMAIL.')
    return response.status(503).json({
      ok: false,
      message: 'Waitlist delivery is not configured yet.',
    })
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
    return response.status(502).json({
      ok: false,
      message: 'We could not save your waitlist spot. Please try again in a moment.',
    })
  }

  const delivery = await resendResponse.json().catch(() => null)

  return response.status(200).json({
    ok: true,
    submission,
    deliveryId: delivery?.id ?? null,
  })
}
