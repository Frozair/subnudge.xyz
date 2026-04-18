# SubNudge Launch Plan 2026

Last updated: April 16, 2026

This plan is based on the current SubNudge landing page at `/Users/frozair/Dev/websites/subnudge.xyz` and the mobile app repo at `/Users/frozair/Dev/apps/subnudge`.

## 1. Landing Page Launch-Readiness Audit

### Current Assessment

- Page type: waitlist landing page.
- Primary conversion goal: collect qualified early-access leads with email + Twitch username.
- Likely traffic sources: direct outreach, X/social posts, creator Discords, Twitch creator communities, borrowed creator audiences.
- Current status: strong enough for private alpha traffic now.
- Verification: `npm run build` and `npm run lint` pass in the website repo.

### What Already Works

- The hero is specific and creator-native: "Prime subs expire quietly. Your monthly subscriber review shouldn't."
- The page has a clear single CTA above the fold through the compact waitlist form.
- The value proposition fits the mobile app scope: catch likely drop-offs, keep supporter context, and send personal nudges.
- The chips handle important positioning early: Prime-heavy audiences, manual nudges, no spam automation.
- The form qualifies waitlist leads with Twitch username, which is useful for manual alpha selection.
- The waitlist has a real backend path into Formspark, not just a static form.
- The Twitch callback route exists, so the website already supports OAuth handoff.

### Quick Wins

- Add footer links for `Privacy`, `Support`, and `Contact`. This helps trust, store review, and beta support.
- Add a compact "What happens after joining" section: `1. Join waitlist`, `2. Get an invite`, `3. Connect Twitch`, `4. Review who needs a nudge`.
- Add a "Built for" block: Twitch Affiliates/Partners, Prime-heavy channels, creators who already know many subs personally, creators using spreadsheets/Notion/memory today.
- Add a "Not built for" note: not automatic DM spam, not an analytics suite, not a replacement for real community relationships.
- Add beta expectation copy near the CTA: "Free app. Small creator cohort. Feedback-first."
- Add post-submit next step: "Want to move up the alpha list? Reply with your current subscriber follow-up workflow."
- Capture `utm_source`, `utm_medium`, `utm_campaign`, referrer, and landing path in the waitlist endpoint before broader outreach.
- Add one support email visibly on the page before private alpha invites go out.

### High-Impact Changes

- Add a simple 3-step product explanation with screenshots or icons: `Sync subscribers`, `Spot likely drop-offs`, `Send a personal nudge`.
- Add an FAQ for objections:
  - "Does SubNudge send automatic messages?" No. It keeps outreach human-in-the-loop.
  - "Does Twitch provide exact Prime expiry dates?" No. SubNudge detects likely drop-offs by comparing syncs.
  - "Is it free?" Yes for the current beta.
  - "What data do you store?" Twitch session metadata, subscriber data, and local contact notes needed for the workflow.
  - "Who is this not for?" Creators who want fully automated mass messaging.
- Add privacy and support routes before closed beta.
- Add a short demo GIF or 45-60 second walkthrough before public beta.
- Add 2-3 beta quotes after private alpha before any broad public announcement.

### Test Ideas

- Headline test:
  - Current: "Prime subs expire quietly. Your monthly subscriber review shouldn't."
  - Variant A: "Stop losing track of Twitch subscribers who need a personal nudge."
  - Variant B: "Your monthly Twitch sub review, without the spreadsheet."
  - Variant C: "Catch likely Prime drop-offs before they disappear."
- CTA test:
  - Current: "Join the creator beta"
  - Variant A: "Join the creator beta"
  - Variant B: "Get early access"
  - Variant C: "Save my beta spot"
- Form friction test:
  - Current: email + Twitch username.
  - Later test: email-only first step, Twitch username after submit.
  - Recommendation: keep email + Twitch username for alpha because lead quality matters more than volume.
- Visual test:
  - Current: phone mockup.
  - Variant: short looping demo GIF of sync -> needs attention -> nudge helper.

### Recommended Copy Updates

Hero subheadline option:

> SubNudge helps Twitch creators replace the monthly sub spreadsheet with a simple mobile review: sync active subs, spot likely drop-offs, keep supporter notes, and send personal nudges yourself.

Beta expectation line:

> Free app for Twitch creators who want a cleaner monthly follow-up workflow. No automatic spam. Just better timing and context.

What happens next:

> Join the waitlist with your Twitch username. If you are a fit for the first alpha cohort, you will get a TestFlight or Google Play invite plus a short setup guide.

FAQ answer for expiry accuracy:

> Twitch does not expose exact Prime expiry dates in the way creators usually want. SubNudge compares subscriber syncs over time to flag likely drop-offs and help you review them manually.

## 2. Private Alpha Outreach and Email Sequence

### Outreach Strategy

- Goal: recruit 10-15 private alpha testers from a list of 30-40 likely-fit creators.
- Best-fit creators: Twitch creators with Prime-heavy audiences, 20+ recurring subs, manual tracking habits, and enough relationship with their community to send personal follow-ups.
- Ask: try the free alpha and give candid feedback.
- Promise: help them make their monthly subscriber review less chaotic, without automating spammy outreach.
- Main CTA for cold/warm outreach: join waitlist or reply directly.
- Main CTA for accepted testers: install the app and complete first Twitch sync.

### Manual Outreach Message

Subject: Quick question about your Twitch sub workflow

Hey [Name],

I am building SubNudge, a free mobile app for Twitch creators who still track subscribers, Prime renewals, or follow-ups in spreadsheets, Notion, or memory.

It connects to Twitch, syncs your current subs, helps spot likely drop-offs, and keeps the actual nudge human. No automatic spam.

I am inviting the first 10-15 creators into a private alpha and would love your honest feedback if this sounds useful.

Want me to send you an early invite?

CTA: Reply "yes" or join at https://subnudge.xyz

### Follow-Up 1

Subject: Worth testing for one monthly sub review?

Hey [Name],

Wanted to follow up once on SubNudge.

The idea is simple: if you already have a monthly moment where you check subs, notice who dropped, and decide who to personally message, SubNudge is meant to make that workflow cleaner on your phone.

The alpha is free. I am mostly looking for creators who will tell me what is confusing, missing, or not worth keeping.

If you want in, reply here or join the waitlist:
https://subnudge.xyz

### Follow-Up 2

Subject: Closing the first SubNudge alpha batch

Hey [Name],

I am closing the first small SubNudge alpha batch this week so I can keep feedback manageable.

No pressure if now is not the right time. But if tracking subs or Prime drop-offs is already a recurring headache, I think you would be a strong fit for the first group.

Want an invite before I lock the first batch?

CTA: Reply "yes" and I will send the install link.

## Alpha Invite Sequence

### Sequence Overview

- Sequence name: SubNudge Private Alpha Invite
- Trigger: creator is accepted into private alpha.
- Goal: get the creator to install, connect Twitch, complete first sync, and send feedback.
- Length: 5 emails over 7 days.
- Exit condition: creator completes first sync and submits feedback, or asks to stop receiving alpha emails.

### Email 1: Invite and Install

Send: Immediately after acceptance.

Subject: You are invited to the SubNudge alpha

Preview: Here is your private install link and what to test first.

Body:

Hey [Name],

You are in the first SubNudge alpha group. Thanks for being willing to test something early.

Your first job is simple:

1. Install SubNudge.
2. Connect Twitch.
3. Run your first subscriber sync.
4. Tell me where anything feels confusing.

SubNudge is free during alpha. It is also intentionally human-in-the-loop: it helps you spot likely follow-up moments, but it does not mass-message your community.

CTA: Install SubNudge -> [TestFlight or Google Play testing link]

### Email 2: First Sync Setup

Send: 1 day after invite if first sync is not confirmed, or 1 day after invite for everyone if tracking is manual.

Subject: The only thing to do first in SubNudge

Preview: Connect Twitch, sync once, then look for who needs attention.

Body:

Hey [Name],

For this first alpha, please do not worry about exploring every screen.

The key flow I need tested is:

Connect Twitch -> Sync subscribers -> Open Needs Attention -> Review who you might personally follow up with.

If Twitch auth or sync feels even slightly weird, reply with what happened. Screenshots are helpful, but a rough description is enough.

CTA: Open SubNudge -> [app link]

### Email 3: What To Look For

Send: 2 days after invite.

Subject: What I am hoping you notice

Preview: The best alpha feedback is usually about confusion, not feature requests.

Body:

Hey [Name],

When you use SubNudge, I am especially looking for three things:

1. Did the app make it obvious what to do next?
2. Did the Needs Attention list match how you think about real subscribers?
3. Did the suggested nudge workflow feel personal, or awkward?

You do not need polished feedback. A sentence like "I expected X but saw Y" is perfect.

CTA: Send feedback -> [feedback form or mailto link]

### Email 4: Feedback Call Ask

Send: 4 days after invite.

Subject: Can I watch you use SubNudge for 15 minutes?

Preview: I am trying to catch the rough edges before opening the beta.

Body:

Hey [Name],

Would you be open to a quick 15-minute feedback call?

I am trying to watch a few creators go through the app before expanding beyond the private alpha. The goal is not a formal interview. I just want to see where the flow is unclear and what parts do or do not match your real monthly routine.

If you are up for it, grab any time here:

CTA: Book a 15-minute feedback call -> [calendar link]

### Email 5: One Question After First Use

Send: 7 days after invite.

Subject: One honest question about SubNudge

Preview: Would you use this again next month?

Body:

Hey [Name],

One honest question:

Would you use SubNudge again during your next monthly subscriber review?

If yes, what made it useful?

If no, what would need to change before it felt worth opening again?

That answer is more useful than a long review. I am using this first alpha to decide what to fix before opening the beta.

CTA: Reply with yes/no and why.

## Waitlist Welcome Sequence

Use this for creators who join the landing-page waitlist before receiving an install invite.

### Email 1: Waitlist Confirmation

Send: Immediately after waitlist signup.

Subject: You are on the SubNudge waitlist

Preview: Thanks for joining. Here is what happens next.

Body:

Hey [Name],

Thanks for joining the SubNudge waitlist.

I am starting with a small alpha group of Twitch creators who already have a manual subscriber follow-up workflow. If your channel is a fit for the next batch, I will send an install invite and a short setup guide.

In the meantime, one question:

How do you currently track subs or Prime drop-offs?

CTA: Reply with your current workflow.

### Email 2: Problem Framing

Send: 2 days after signup.

Subject: The spreadsheet problem SubNudge is built around

Preview: SubNudge is for the monthly review most creator tools ignore.

Body:

Most Twitch tools focus on alerts, overlays, dashboards, or analytics.

SubNudge is aimed at a smaller but annoying workflow: the monthly moment where you try to remember who renewed, who disappeared, who you know personally, and who might deserve a human follow-up.

The goal is not to automate relationships. The goal is to make the manual review easier.

CTA: Tell me what your current review looks like -> [reply]

### Email 3: Invite When Ready

Send: When the next beta batch opens.

Subject: Your SubNudge beta invite is ready

Preview: Install the app and run your first Twitch sync.

Body:

Hey [Name],

Your SubNudge beta invite is ready.

Start here:

1. Install the app.
2. Connect Twitch.
3. Run your first sync.
4. Review the Needs Attention list.

This beta is free. The tradeoff is that I want direct feedback on what feels useful, confusing, or missing.

CTA: Install SubNudge -> [testing link]

## 3. Dated Launch Checklist

### Phase 0: Final Alpha Prep

Dates: April 16-April 21, 2026

- Confirm Formspark production config works by submitting a real waitlist test.
- Add privacy and support pages to `subnudge.xyz`.
- Add UTM/referrer capture to the waitlist API before outreach begins.
- Add "What happens next" and "Who this is for" sections to the landing page.
- Create a private alpha tracker with creator name, Twitch username, platform, invite status, install status, first sync status, feedback status, and severity notes.
- Prepare TestFlight and Google Play testing links.
- Run app release gates: Android assemble, iOS simulator Kotlin compile, and snapshot checks if UI changed.
- Smoke test OAuth callback through `https://www.subnudge.xyz/twitch/callback`.
- Draft the 30-40 creator outreach list.
- Confirm the waitlist welcome email sends through Resend.
- Define success metrics before the first invite goes out.

Go/no-go for alpha on April 21:

- Landing page captures waitlist submissions.
- Privacy/support path exists or support email is clearly visible.
- Android and iOS test installs are available.
- Twitch auth and first sync work on at least one real device.

### Phase 1: Private Alpha

Dates: April 22-May 5, 2026

- April 22: invite the first 3-5 trusted creators.
- April 23-April 25: personally monitor install, auth, sync, and first-review issues.
- April 27: invite the next 5 creators if no severe auth/sync blockers appear.
- April 29-May 1: run at least 3 feedback calls.
- May 4: summarize top issues, top unclear moments, and strongest value language from creators.
- May 5: decide whether to move into closed beta.

Alpha success targets:

- 70%+ of invited creators install.
- 80%+ of installers connect Twitch successfully.
- 80%+ of connected creators complete first sync.
- At least 5 creators give written or call feedback.
- At least 3 creators say they would use it again next month.
- No unresolved high-severity auth, data-loss, or privacy bugs.

### Phase 2: Closed Beta

Dates: May 6-May 26, 2026

- Expand from 10-15 creators to 30-50 creators.
- Update landing page with the clearest alpha language.
- Add first testimonial snippets if alpha users give permission.
- Add FAQ and beta expectations to reduce support questions.
- Start light rented-channel promotion: X posts, relevant creator communities, and soft Discord/community mentions where appropriate.
- Ask 2-3 creator friends or micro-influencers to share the waitlist if they genuinely like the app.
- Send waitlist invite batch once per week rather than all at once.
- Track activation by cohort.
- Publish a simple changelog or "alpha fixes" note by May 20.
- Decide on public beta readiness by May 26.

Closed beta success targets:

- 30+ creators invited.
- 20+ installs.
- 15+ completed first syncs.
- 8+ creators complete a meaningful Needs Attention review.
- 3+ usable testimonials or quotes.
- Landing page waitlist conversion is directionally healthy for warm traffic.

### Phase 3: Public Beta

Dates: June 2-June 15, 2026

- Change the primary CTA from waitlist-only to beta access if install links are ready.
- Add store/testing badges or clear platform-specific install instructions.
- Publish a short demo video or GIF.
- Announce public beta to the email list.
- Post 3-5 social/community updates focused on the creator workflow, not generic app hype.
- Reach out to borrowed-channel partners with a concise "free app for Twitch creators" angle.
- Monitor support daily for auth, sync, and data confusion.
- Keep Product Hunt as optional, not primary.

Public beta success targets:

- 100+ waitlist signups total or a strong warm-channel conversion signal.
- 50+ beta installs.
- Auth/sync support issues are manageable.
- Clear evidence that creators understand the manual, non-spam positioning.

### Phase 4: Full Free Launch

Dates: June 16-June 30, 2026

- Only proceed if beta activation and support quality are strong.
- Open general availability through production store listings if store review is complete.
- Add testimonials, screenshots, FAQ, privacy, support, and install links to the website.
- Send launch announcement to the email list.
- Publish a launch post: "A free mobile CRM for Twitch creators who still manage subscriber follow-ups manually."
- Consider Product Hunt only if the install path is public, the page is polished, and you can engage all day.
- Follow up with all beta users and ask for one specific public quote or private feedback note.

Full launch go/no-go:

- No known high-severity auth/sync blockers.
- Privacy and support pages are live.
- Store/testing install path is simple.
- At least 10 creators have completed the core monthly review workflow.
- At least 5 creators say they would use SubNudge again next month.

## Launch Metrics

- Landing page conversion rate by traffic source.
- Waitlist submissions by `utm_source`.
- Outreach reply rate.
- Invite-to-install rate.
- Install-to-Twitch-connect rate.
- Connect-to-first-sync completion rate.
- First sync-to-Needs Attention review rate.
- Feedback response rate.
- Number of creators who say they would use it again next month.
- Top 5 support issues by frequency and severity.

## Positioning Guardrails

- Say: "manual nudges", "human-in-the-loop", "monthly subscriber review", "Prime-heavy audiences", "replace spreadsheet chaos".
- Avoid: "automated DMs", "guaranteed revenue recovery", "exact Prime expiry tracking", "growth hack", "spam".
- Keep the promise narrow: SubNudge helps creators review subscriber changes and follow up personally.
