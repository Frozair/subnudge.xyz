import { WAITLIST_ATTRIBUTION_FIELDS, validateWaitlistPayload } from '../src/lib/validation.js'

const WAITLIST_SOURCE = 'subnudge.xyz-waitlist'
const WAITLIST_VERSION = 3
const DEFAULT_FORMSPARK_FORM_ID = 'IEoVxm2QN'
const DEFAULT_WELCOME_FROM_NAME = 'SubNudge'
const FORMSPARK_ENDPOINT_BASE = 'https://submit-form.com'
const RESEND_EMAIL_ENDPOINT = 'https://api.resend.com/emails'

function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

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

function getFormsparkEndpoint() {
  const customEndpoint = process.env.FORMSPARK_ACTION_URL?.trim() || process.env.FORMSPARK_ENDPOINT_URL?.trim()
  if (customEndpoint) {
    return customEndpoint
  }

  const formId = process.env.FORMSPARK_FORM_ID?.trim() || DEFAULT_FORMSPARK_FORM_ID
  return `${FORMSPARK_ENDPOINT_BASE}/${encodeURIComponent(formId)}`
}

function getFormsparkPayload(submission) {
  const attribution = submission.attribution ?? {}
  const payload = {
    email: submission.email,
    twitchUsername: submission.twitchUsername,
    submittedAt: submission.submittedAt,
    source: submission.source,
    version: submission.version,
    _email: {
      subject: `New SubNudge waitlist signup: @${submission.twitchUsername}`,
    },
  }

  for (const field of WAITLIST_ATTRIBUTION_FIELDS) {
    payload[field] = attribution[field] ?? ''
  }

  return payload
}

function formatSender(name, email) {
  const trimmedEmail = email.trim()
  const trimmedName = typeof name === 'string' ? name.trim() : ''

  if (!trimmedName) {
    return trimmedEmail
  }

  return `${trimmedName.replaceAll('<', '').replaceAll('>', '')} <${trimmedEmail}>`
}

function buildWelcomeEmail(submission) {
  const twitchUsername = submission.twitchUsername
  const escapedUsername = escapeHtml(twitchUsername)

  const html = `
    <p>Hey @${escapedUsername},</p>
    <p>You are on the SubNudge waitlist.</p>
    <p>
      I am starting with a small group of Twitch creators who already do some kind of monthly subscriber
      review manually: spreadsheets, Notion, memory, or a lot of "wait, did they renew?" checking.
    </p>
    <p>
      If your channel is a fit for the next private alpha batch, I will send an invite and setup guide.
    </p>
    <p>
      One quick question if you want to reply:<br />
      How do you currently track Prime drop-offs or subscriber follow-ups?
    </p>
    <p>- SubNudge</p>
  `

  const text = [
    `Hey @${twitchUsername},`,
    '',
    'You are on the SubNudge waitlist.',
    '',
    'I am starting with a small group of Twitch creators who already do some kind of monthly subscriber review manually: spreadsheets, Notion, memory, or a lot of "wait, did they renew?" checking.',
    '',
    'If your channel is a fit for the next private alpha batch, I will send an invite and setup guide.',
    '',
    'One quick question if you want to reply:',
    'How do you currently track Prime drop-offs or subscriber follow-ups?',
    '',
    '- SubNudge',
  ].join('\n')

  return {
    subject: 'You are on the SubNudge waitlist',
    html,
    text,
  }
}

async function submitToFormspark(submission) {
  const endpoint = getFormsparkEndpoint()
  const formsparkResponse = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(getFormsparkPayload(submission)),
  })

  if (!formsparkResponse.ok) {
    const errorDetails = await formsparkResponse.text().catch(() => '')
    console.error('Waitlist Formspark submission failed.', formsparkResponse.status, errorDetails)
    return { ok: false, status: formsparkResponse.status }
  }

  const formsparkResult = await formsparkResponse.json().catch(() => null)
  return { ok: true, result: formsparkResult }
}

async function sendWelcomeEmail(submission) {
  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.WAITLIST_WELCOME_FROM_EMAIL
  const fromName = process.env.WAITLIST_WELCOME_FROM_NAME || DEFAULT_WELCOME_FROM_NAME
  const replyToEmail = process.env.WAITLIST_WELCOME_REPLY_TO_EMAIL

  if (!resendApiKey) {
    return { skipped: true, reason: 'missing-api-key' }
  }

  if (!isValidEmail(fromEmail)) {
    console.error('Waitlist welcome email is not configured. Missing WAITLIST_WELCOME_FROM_EMAIL.')
    return { skipped: true, reason: 'missing-sender' }
  }

  const welcomeEmail = buildWelcomeEmail(submission)
  const body = {
    from: formatSender(fromName, fromEmail),
    to: [submission.email],
    subject: welcomeEmail.subject,
    html: welcomeEmail.html,
    text: welcomeEmail.text,
    tags: [
      { name: 'category', value: 'waitlist_welcome' },
      { name: 'source', value: 'subnudge_xyz' },
    ],
  }

  if (isValidEmail(replyToEmail)) {
    body.reply_to = replyToEmail.trim()
  }

  try {
    const welcomeResponse = await fetch(RESEND_EMAIL_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!welcomeResponse.ok) {
      const errorDetails = await welcomeResponse.text().catch(() => '')
      console.error('Waitlist welcome email failed.', welcomeResponse.status, errorDetails)
      return { skipped: false, ok: false }
    }

    const welcomeResult = await welcomeResponse.json().catch(() => null)
    return { skipped: false, ok: true, messageId: welcomeResult?.id ?? null }
  } catch (error) {
    console.error('Waitlist welcome email failed.', error)
    return { skipped: false, ok: false }
  }
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

  const submission = buildSubmission(result.normalized)
  const formsparkResult = await submitToFormspark(submission)

  if (!formsparkResult.ok) {
    return response.status(502).json({
      ok: false,
      message: 'We could not save your waitlist spot. Please try again in a moment.',
    })
  }

  const welcomeEmailResult = await sendWelcomeEmail(submission)

  return response.status(200).json({
    ok: true,
    submission,
    formsparkSent: true,
    formsparkId: formsparkResult.result?.id ?? null,
    welcomeEmailSent: welcomeEmailResult.ok === true,
    welcomeEmailId: welcomeEmailResult.messageId ?? null,
  })
}
