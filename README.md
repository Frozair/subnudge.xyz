# subnudge.xyz

SubNudge waiting-list site and Twitch OAuth callback handoff page.

## Purpose

This is a standalone Vite + React site for:

- the public waitlist landing page (`/`)
- a Twitch OAuth callback route (`/twitch/callback`) that hands off to the native app

The main product app lives in a separate repo at `/Users/Frozair/dev/subnudge`.

## Current Waitlist Behavior (v2)

The waitlist form now posts to a Vercel function at `/api/waitlist`.

- the client validates `email` and `twitchUsername`
- the server re-validates the payload before delivery
- the Vercel function syncs the contact to Brevo
- successful submissions are still cached in `localStorage` so repeat visitors see the saved state
- local `vite` development falls back to a browser-only save when `/api/waitlist` is unavailable

Brevo list defaults:

- `BREVO_LIST_ID=3`

Required environment variables for deployed waitlist sync:

- `BREVO_API_KEY`

Optional environment variable:

- `BREVO_LIST_ID` (defaults to `3`)
- `BREVO_TWITCH_ATTRIBUTE` (defaults to `TWITCH_USERNAME`)

Brevo requirement:

- create a Text contact attribute named `TWITCH_USERNAME` (or set `BREVO_TWITCH_ATTRIBUTE` to your existing attribute key)

## Local Development

```bash
npm install
npm run dev
```

Vite is configured to use port `3505`.

`npm run dev` serves the frontend only. If you submit the form in local Vite dev, the app falls back to `localStorage` because the Vercel function is not running.

## Build

```bash
npm run build
npm run preview
```

## Callback Route Testing

Examples (these will attempt to deep-link into the SubNudge app while preserving params):

- `http://localhost:3505/twitch/callback?code=test123&state=abc`
- `http://localhost:3505/twitch/callback?error=access_denied&error_description=User%20cancelled`

## Vercel Notes

`vercel.json` includes:

- Vite build/output settings
- security headers
- an explicit rewrite for `/twitch/callback` to `/index.html`

For production waitlist sync, add the environment variables above in the Vercel project settings.

## Git Workflow

Use `development` for commits and reserve `main` for releases.
