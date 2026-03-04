import { validateWaitlistPayload } from '../src/lib/validation.js'

const WAITLIST_SOURCE = 'subnudge.xyz-waitlist'
const WAITLIST_VERSION = 2
const DEFAULT_BREVO_LIST_ID = 3
const DEFAULT_TWITCH_ATTRIBUTE = 'TWITCH_USERNAME'

function buildSubmission(payload) {
  return {
    ...payload,
    submittedAt: new Date().toISOString(),
    source: WAITLIST_SOURCE,
    version: WAITLIST_VERSION,
  }
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

  const brevoApiKey = process.env.BREVO_API_KEY
  const brevoListIdRaw = process.env.BREVO_LIST_ID ?? String(DEFAULT_BREVO_LIST_ID)
  const brevoListId = Number.parseInt(brevoListIdRaw, 10)
  const twitchAttributeName = process.env.BREVO_TWITCH_ATTRIBUTE || DEFAULT_TWITCH_ATTRIBUTE

  if (!brevoApiKey || !Number.isInteger(brevoListId) || brevoListId <= 0) {
    console.error('Waitlist delivery is not configured. Missing BREVO_API_KEY or BREVO_LIST_ID.')
    return response.status(503).json({
      ok: false,
      message: 'Waitlist delivery is not configured yet.',
    })
  }

  const submission = buildSubmission(result.normalized)
  const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': brevoApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: submission.email,
      attributes: {
        [twitchAttributeName]: submission.twitchUsername,
      },
      listIds: [brevoListId],
      updateEnabled: true,
      emailBlacklisted: false,
    }),
  })

  if (!brevoResponse.ok) {
    const errorDetails = await brevoResponse.text().catch(() => '')
    console.error('Waitlist Brevo sync failed.', brevoResponse.status, errorDetails)
    return response.status(502).json({
      ok: false,
      message: 'We could not save your waitlist spot. Please try again in a moment.',
    })
  }

  const brevoResult = await brevoResponse.json().catch(() => null)

  return response.status(200).json({
    ok: true,
    submission,
    deliveryId: null,
    contactId: brevoResult?.id ?? null,
  })
}
