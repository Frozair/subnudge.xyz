# subnudge.xyz

SubNudge waiting-list site and Twitch OAuth callback debug page.

## Purpose

This is a standalone Vite + React site for:

- the public waitlist landing page (`/`)
- a local/testable Twitch OAuth callback debug route (`/twitch/callback`)

The main product app lives in a separate repo at `/Users/Frozair/dev/subnudge`.

## Current Waitlist Behavior (v1)

The waitlist form is a **frontend-only stub** for now:

- validates `email` and `twitchUsername`
- stores the submission locally in `localStorage`
- shows a success state for localhost testing

No network request or email delivery is performed yet.

Future intended waitlist destination email:

- `subnudge@frozair.xyz`

## Local Development

```bash
npm install
npm run dev
```

Vite is configured to use port `3505`.

## Build

```bash
npm run build
npm run preview
```

## Callback Route Testing

Examples:

- `http://localhost:3505/twitch/callback?code=test123&state=abc`
- `http://localhost:3505/twitch/callback?error=access_denied&error_description=User%20cancelled`

## Vercel Notes

`vercel.json` includes:

- Vite build/output settings
- security headers
- an explicit rewrite for `/twitch/callback` to `/index.html`

## Git Workflow

Use `development` for commits and reserve `main` for releases.
