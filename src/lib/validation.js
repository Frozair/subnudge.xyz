const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeTwitchUsername(value) {
  return value.trim().replace(/^@+/, '').replace(/\s+/g, '')
}

export function validateWaitlistPayload({ email, twitchUsername }) {
  const normalizedEmail = email.trim().toLowerCase()
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
    },
    isValid: Object.keys(errors).length === 0,
  }
}
