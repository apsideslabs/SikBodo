# Install, offline and updates

SikBodo is a **Progressive Web App**. It can be installed to a device like a native app, it works
offline once installed, and — when a new release is deployed — the installed app notices and offers
to update. This document explains how all of that works and how to test it.

## Installing it as an app

| Platform | How to install |
| --- | --- |
| Android / Chrome | An **Install app** prompt appears, or use ⋮ → *Add to Home screen* |
| Desktop Chrome / Edge | An **install** icon appears in the address bar |
| iPhone / iPad (Safari) | **Share → Add to Home Screen** (iOS has no automatic prompt) |
| Desktop Safari / Firefox | Not installable as an app; use it as a normal website |

Installed, the app opens full-screen with its own icon and no browser chrome.

### What makes it installable

- **HTTPS.** GitHub Pages serves the site over HTTPS, which is required.
- **A web app manifest** (`manifest.webmanifest`) with a name, `start_url`, `scope`, `display`,
  and icons — a 192×192 and a 512×512 PNG for `any`, a 512×512 `maskable` icon, and an
  `apple-touch-icon.png`.
- **A service worker** (`sw.js`), which is what makes an installed app work offline.

## Offline behaviour

The service worker caches the whole app shell — every page, stylesheet, script and icon — under a
cache named after the version (`luitra-1.2.0`). After the first visit, the app opens and works with
the network switched off.

| Request | Strategy | Why |
| --- | --- | --- |
| Page navigations | **Network-first**, cache fallback | A new release is picked up as soon as you are online; offline you still get the cached page |
| CSS, JS, icons | **Stale-while-revalidate** | Instant from cache, quietly refreshed in the background |
| `version.json` | **Network-only** | The update check must always see the truth, never a cached value |
| `sw.js` | **Network-only** | So the browser can always detect a new worker |
| Cross-origin (GitHub API) | **Untouched** | The service worker does not interfere |

When a new worker activates, its cache name differs from the old one, so **every asset from the
previous release is dropped**. There is no half-updated state.

## App mode — the same codebase, a different shell

The website and the installed app are one repository and one set of files. There is no separate
build, no separate bundle and no duplicated markup. The only difference is that the page can tell
**which mode it is running in**, and the shell adapts to it.

The detection is in `js/ui/update.js`, which already knew about installed mode for the update
notice. At parse time — before `js/app.js` builds the header — it stamps `data-display` on `<html>`:

```html
<html data-display="standalone">   <!-- running as an installed app -->
<html data-display="browser">      <!-- running on the website -->
```

It reads two signals: `navigator.standalone` (iOS, which does not support the media query) and
`matchMedia('(display-mode: standalone | fullscreen | minimal-ui)')` (everywhere else).

### What changes

| | Website (`browser`) | Installed app (`standalone`) |
| --- | --- | --- |
| Header | brand, version, *बर' · Bodo Learning Platform* | compact app bar, an **App** badge, *Installed app · works offline* |
| Header padding | none | `env(safe-area-inset-top)` — clears a notch or status bar |
| Footer | identity, Explore and Project link columns, accuracy note, install offer | identity and the accuracy note only |
| Scrolling | default | `overscroll-behavior-y: none` — no pull-to-refresh bounce |
| Tap feedback | browser default | `-webkit-tap-highlight-color: transparent` |
| First run | — | a one-time note, dismissed with **Got it** |
| Install offer | a button (Chromium) or written instructions (Safari) | none — it is already installed |

### What does not change

Everything else. Every page renders the same content from the same `js/data/` modules, the display
panel behaves identically, and the offline behaviour is the same service worker. **App mode changes
the shell, never the content.**

### Where the styling lives

One guarded block at the end of `css/components.css`, keyed on `html[data-display="standalone"]`,
plus a single `@media (display-mode: standalone)` rule for the safe-area inset so there is no visible
jump before the scripts run.

### Testing it locally

Chromium's device emulation does not expose `display-mode` reliably, so the honest way to test is to
stub `matchMedia` before the page scripts run and check that `data-display` flips:

```js
await page.evaluateOnNewDocument(() => {
  const orig = window.matchMedia.bind(window);
  window.matchMedia = (q) => q.includes('display-mode: standalone')
    ? { matches: true, media: q, addListener(){}, removeListener(){},
        addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return false; } }
    : orig(q);
});
```

Then assert that the header carries the **App** badge, that the footer's link columns are hidden,
and that the one-time note appears exactly once.

## The update notice

> **Note (v2.0.0).** The update UI was replaced by the reference platform's design: a **top banner**
> (`#update-banner`) that appears when a newer release is deployed, and an **“App & updates”** row in
> the display panel with a real *Install app* button and a *Check for updates* action. The old
> bottom-left *Updates* button is gone. The detection logic is unchanged — a waiting service worker,
> a newer `version.json`, and the newest GitHub release.

The notice is shown **only when SikBodo is running as an installed app**. It is detected with the
`display-mode` media query (`standalone`, `fullscreen`, `minimal-ui`) or the iOS
`navigator.standalone` flag. On the plain website the module does nothing but register the service
worker — a casual reader is never interrupted.

It reports three kinds of update:

1. **A waiting service worker.** When `sw.js` changes, the browser installs a new worker that
   *waits*. The app shows *“A new version of SikBodo is ready — Reload now”*. The reload only
   happens when the reader taps; the page then posts `SKIP_WAITING` to the worker and reloads on
   `controllerchange`.
2. **`version.json`.** On launch (and on tap) the app fetches `version.json` from its own origin and
   compares it with the version it is running. If the file is newer, an update is reported.
3. **The GitHub release feed.** The app fetches
   `https://api.github.com/repos/apsideslabs/SikBodo/releases/latest` and, if the tag is newer,
   shows the release name with a link to its notes.

A small **Updates** button sits at the bottom-left of the installed app. Tapping it runs a check
and reports *“You're up to date — v1.2.0”*, *“Update available”*, or a friendly *“Could not check —
you appear to be offline”* message. Dismissing a notice remembers that version so it does not nag,
while still showing it for a later release.

### Network and privacy

This is the only thing in SikBodo that touches the network after load:

- `version.json` — **your own origin**; no data is sent.
- `api.github.com` — **GitHub's public releases API**; the request carries no user data, and it is
  rate-limited to about 60 requests/hour per IP when unauthenticated. It runs once on launch and on
  an explicit tap, never in a loop.

Nothing is tracked, and there is no third-party script. If you would rather make no external
request at all, the GitHub check can be removed and the same-origin `version.json` check kept.

## The version lives in three places

Because there is no build step, the version number is written by hand in three files, and **CI fails
if they disagree**:

| File | What it holds |
| --- | --- |
| `js/data/meta.js` | `"version": "1.2.0"` — shown in the header and footer |
| `version.json` | `"version": "1.2.0"` — read by the update check |
| `sw.js` | `const VERSION = "1.2.0";` — names the cache, and is what the browser diffs |

When you cut a release, bump all three and add a `CHANGELOG.md` entry.

## Testing it locally

```bash
python3 -m http.server 8000
# open http://localhost:8000 — a service worker only registers on
# https: or on localhost / 127.0.0.1, never on file://
```

To exercise the update notice without installing anything, force the installed state by overriding
the media query (for example in a browser console or a headless test):

```js
window.matchMedia = (q) => ({ matches: q.includes("display-mode: standalone"), addEventListener() {}, addEventListener: () => {} });
location.reload();
```

To see the "update available" path, edit `version.json` to a higher number while the app is open and
tap **Updates**.
