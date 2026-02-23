export const WAITLIST_STORAGE_KEY = 'subnudge.waitlist.submission'

export function getStoredWaitlistSubmission() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(WAITLIST_STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function saveWaitlistSubmission(submission) {
  if (typeof window === 'undefined') {
    return submission
  }

  const serialized = JSON.stringify(submission)
  window.localStorage.setItem(WAITLIST_STORAGE_KEY, serialized)
  return submission
}
