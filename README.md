# subnudge.xyz

SubNudge waiting-list site and Twitch OAuth callback handoff page.

## Purpose

This is a standalone Vite + React site for:

- the public waitlist landing page (`/`)
- practical beta trust pages (`/privacy` and `/support`)
- a Twitch OAuth callback route (`/twitch/callback`) that hands off to the native app

The main product app lives in a separate repo at `/Users/Frozair/dev/subnudge`.

## Current Waitlist Behavior (v4)

The waitlist form now posts to a Vercel function at `/api/waitlist`.

- the client validates `email` and `twitchUsername`
- the client captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, referrer, and landing path
- the server re-validates the payload before delivery
- the Vercel function submits the signup to Formspark
- optional Resend welcome emails can confirm that creators are on the waitlist
- welcome-email failures are logged but do not fail the signup when Formspark accepted the submission
- successful submissions are still cached in `localStorage` so repeat visitors see the saved state
- local `vite` development falls back to a browser-only save when `/api/waitlist` is unavailable

Formspark defaults:

- `FORMSPARK_FORM_ID=IEoVxm2QN`

Required environment variables for deployed waitlist sync:

- None when using the default Formspark form ID above.

Optional environment variables:

- `FORMSPARK_FORM_ID` (defaults to `IEoVxm2QN`)
- `FORMSPARK_ACTION_URL` (overrides the default `https://submit-form.com/{form-id}` endpoint)
- `RESEND_API_KEY` (enables welcome emails)
- `WAITLIST_WELCOME_FROM_EMAIL` (required when `RESEND_API_KEY` is set)
- `WAITLIST_WELCOME_FROM_NAME` (defaults to `SubNudge`)
- `WAITLIST_WELCOME_REPLY_TO_EMAIL` (optional reply-to address for waitlist welcome emails)

Formspark requirement:

- confirm the Formspark form `IEoVxm2QN` exists and has notification/export settings configured as desired
- team notification emails should be configured in the Formspark dashboard

Resend requirement:

- create a Resend API key and set `RESEND_API_KEY`
- verify the sender domain or sender email used by `WAITLIST_WELCOME_FROM_EMAIL`

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
- explicit rewrites for `/privacy`, `/support`, and `/twitch/callback` to `/index.html`

For production waitlist sync and welcome email delivery, add the environment variables above in the Vercel project settings.

## Production Setup Checklist

- Confirm the Formspark form ID is `IEoVxm2QN`, or set `FORMSPARK_FORM_ID` / `FORMSPARK_ACTION_URL` in Vercel Production.
- Configure Formspark notification recipients and exports in the Formspark dashboard.
- Create a Resend API key and set `RESEND_API_KEY` in Vercel Production if welcome emails should send automatically.
- Verify the sender domain or sender email used by `WAITLIST_WELCOME_FROM_EMAIL` in Resend.
- Set `WAITLIST_WELCOME_FROM_EMAIL`, `WAITLIST_WELCOME_FROM_NAME`, and optionally `WAITLIST_WELCOME_REPLY_TO_EMAIL`.
- Redeploy after any Vercel env changes.
- Test in an incognito window with a unique email address and a URL containing UTM parameters.

Support email:

- The site currently uses `support@subnudge.xyz` from `src/lib/siteConfig.js`; update that constant if the real support address is different.

## Git Workflow

Use `development` for commits and reserve `main` for releases.
