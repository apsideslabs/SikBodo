# Roadmap

This roadmap describes where SikBodo is going and, just as importantly, where it is
not. It is deliberately conservative: everything listed here is intended to be achievable
within the project's hard constraint of being a self-contained static site with no build
step and no runtime dependencies.

Current release: **1.5.0**.

## Guiding constraints

Every item below has to survive these constraints, which do not change:

- No build step, no bundler, no runtime dependencies.
- Static hosting on GitHub Pages from `main`.
- No server, no database, no accounts.
- Accessibility (WCAG 2.1 AA) and content accuracy are requirements, not goals.

Anything that cannot be delivered inside these constraints is either reshaped or moved to
"Explicitly not planned".

## Status: what v1 already does

- Fifteen pages covering lessons, script, grammar, verbs, numbers, dictionary, phrases,
  conversations, culture, a quiz, a translator aid, resources and about.
- A single global content layer (`window.SKB`) merged from `js/data/*.js`.
- A shared chrome injected at runtime, plus generated sidebar and table of contents.
- A display panel with light/dark/system themes, text scaling, line-height and
  reduced-motion preferences.
- Tooling: an internal link checker and a sitemap generator, both dependency-free.
- An installable **Progressive Web App** (v1.2): a service worker for offline use, real PNG
  icons, and an in-app update notice.
- CI that syntax-checks all JavaScript, validates page structure and scans for committed
  secrets.

## v1.x — incremental releases on the current architecture

These are refinements that fit the existing static architecture and need no new
infrastructure.

### Audio pronunciation

- Ship small audio clips for high-value content: the script inventory, core numbers, and
  the most common dictionary entries and phrases.
- Playback is a native `<audio>` element driven by the existing romanisation column; a
  play control appears beside entries that have a clip.
- Constraints: clips are committed as files and served statically; total size is watched,
  and clips are added selectively rather than for every entry.
- Accessibility: playback controls are real buttons with accessible names and do not
  autoplay.

### Spaced-repetition review

- A review mode that resurfaces items a learner has already seen, scheduled by a simple
  Leitner-style interval system.
- State lives in the browser (a single preferences-style store), consistent with the
  existing `js/core/prefs.js` approach; there is no server-side scheduling.
- Scope: dictionary entries, phrases and numbers first; dialogues later.
- Accessibility: review sessions are fully keyboard-operable and announce progress.

### Quality and polish

- Expand the automated checks as content grows (for example, verifying that every
  dictionary entry has both an Devanagari script form and a romanisation).
- Tighten the print stylesheet as new components are added.
- Keep the manual accessibility checklist current.

## v1.2 — offline support via a Progressive Web App — SHIPPED

Delivered in **v1.2.0**. The platform is now installable and works offline.

- **Service worker** (`sw.js`) — precaches the app shell; network-first for navigations,
  stale-while-revalidate for assets, network-only for `version.json`. Shipped.
- **Web app manifest** with real PNG icons — installable to a home screen. Shipped.
- **Cache versioning** — the cache name carries the version, so a new release drops the
  previous release's assets cleanly. Shipped.
- **Update notice** — the installed app reports a waiting service worker, a newer
  `version.json`, and the newest GitHub release, and offers to reload. Shipped.

Remaining for a later release:

- A "what's new" screen that renders the release notes inside the app rather than linking out.
- An opt-out for the GitHub release check, for anyone who wants zero external requests.

### Explicitly out of scope: user accounts

A static site has no server to authenticate against. Supporting accounts would require
either a backend (which contradicts the project's constraints) or a third-party identity
service (which introduces tracking and a dependency). Accounts are therefore **not part of
v2**, and are not planned at any point while the site remains static. Progress stays
local to the learner's browser.

## Content goals

Content is the point of the project, and these targets are about breadth and quality
rather than features.

- **Expand the dictionary toward 300 entries**, prioritising everyday vocabulary and
  cross-referencing entries from lessons and dialogues.
- **Add more dialogues** across levels, covering everyday situations and keeping every
  line complete with Devanagari script, romanisation and an English gloss.
- **Grow the verbs module** with a wider range of citation forms and their inflections.
- **Broaden the culture notes** so learners meet the language in context.
- **Accuracy over volume.** Every addition follows the accuracy policy in
  `docs/CONTENT-GUIDE.md`: never invent Bodo, prefer widely attested forms, and flag
  uncertainty rather than presenting a guess as settled.

## Explicitly not planned

These are decisions, not omissions. They are recorded so that contributors do not propose
them again in good faith.

| Not planned | Why |
| --- | --- |
| Advertising | The platform is free and unmonetised; ads would degrade the reading experience and the project's credibility as a study resource. |
| Tracking and analytics | Learner behaviour is not collected. No third-party scripts, pixels or beacons. |
| Telemetry | No usage data is transmitted anywhere, ever. |
| User accounts and server-side sync | Impossible on a static host without a backend or a third-party identity service; see v12. |
| Runtime dependencies and CDNs | Everything is served from the repository; nothing is fetched from a CDN at runtime. |
| A build step or framework migration | The no-build architecture is a feature: what is committed is what runs, and the site can be served from any static host. |

## How the roadmap is maintained

- Items move from "v1.x" and "v2" into "Status" when they ship, with the release that
  delivered them.
- Anything that turns out to require a backend, an account system or a build step is
  re-scoped or moved to "Explicitly not planned" rather than quietly dropped.
- The roadmap describes intent, not a schedule. There are no dates, because there is no
  team to hold to them.
