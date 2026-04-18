const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DEFAULT_ATTRIBUTION_LIMIT = 500

export const WAITLIST_ATTRIBUTION_FIELDS = Object.freeze([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'referrer',
  'landingPath',
])

const ATTRIBUTION_LIMITS = {
  utm_source: 120,
  utm_medium: 120,
  utm_campaign: 180,
  utm_content: 180,
  utm_term: 180,
  referrer: 500,
  landingPath: 500,
}

export function normalizeTwitchUsername(value) {
  return typeof value === 'string' ? value.trim().replace(/^@+/, '').replace(/\s+/g, '') : ''
}

function normalizeAttributionValue(value, maxLength = DEFAULT_ATTRIBUTION_LIMIT) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().slice(0, maxLength)
}

export function normalizeWaitlistAttribution(payload = {}) {
  const attribution =
    payload?.attribution && typeof payload.attribution === 'object' && !Array.isArray(payload.attribution)
      ? payload.attribution
      : {}

  return WAITLIST_ATTRIBUTION_FIELDS.reduce((normalized, field) => {
    normalized[field] = normalizeAttributionValue(attribution[field] ?? payload?.[field], ATTRIBUTION_LIMITS[field])
    return normalized
  }, {})
}

export function validateWaitlistPayload(payload = {}) {
  const { email = '', twitchUsername = '' } = payload ?? {}
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''
  const normalizedTwitchUsername = normalizeTwitchUsername(twitchUsername)
  const errors = {}

  if (!normalizedEmail) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(normalizedEmail)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!normalizedTwitchUsername) {
    errors.twitchUsername = 'Twitch username is required.'
  } else if (normalizedTwitchUsername.length < 3) {
    errors.twitchUsername = 'Twitch username must be at least 3 characters.'
  } else if (normalizedTwitchUsername.length > 25) {
    errors.twitchUsername = 'Twitch username must be 25 characters or fewer.'
  } else if (!/^[A-Za-z0-9_]+$/.test(normalizedTwitchUsername)) {
    errors.twitchUsername = 'Use letters, numbers, or underscores only.'
  }

  return {
    errors,
    normalized: {
      email: normalizedEmail,
      twitchUsername: normalizedTwitchUsername,
      attribution: normalizeWaitlistAttribution(payload),
    },
    isValid: Object.keys(errors).length === 0,
  }
}
