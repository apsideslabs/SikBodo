<div align="center">

<img src="assets/og-cover.svg" alt="SikBodo — an academic-grade platform for learning Bodo" width="820">

# SikBodo · बरʼ

**An academic-grade, self-contained platform for learning Bodo (बरʼ, Boro)** — the Tibeto-Burman language of the Bodo people of Assam, India.

[![version](https://img.shields.io/badge/version-1.2.0-48871c?style=flat-square)](CHANGELOG.md)
[![license](https://img.shields.io/badge/license-MIT-0f766e?style=flat-square)](LICENSE)
[![dependencies](https://img.shields.io/badge/runtime%20dependencies-0-b45309?style=flat-square)](#-design-constraints)
[![build](https://img.shields.io/badge/build%20step-none-6d28d9?style=flat-square)](#-design-constraints)
[![offline](https://img.shields.io/badge/works-offline-15803d?style=flat-square)](#-getting-started)
[![Pages](https://img.shields.io/badge/GitHub%20Pages-live-3730a3?style=flat-square)](https://apsideslabs.github.io/SikBodo/)
[![CI](https://img.shields.io/badge/CI-validate%20%2B%20secret%20scan-0f766e?style=flat-square)](.github/workflows/ci.yml)
[![icons](https://img.shields.io/badge/icons-Lucide%20ISC-6d28d9?style=flat-square)](assets/icons.svg)
[![PRs](https://img.shields.io/badge/PRs-welcome-15803d?style=flat-square)](CONTRIBUTING.md)
[![contributors](https://img.shields.io/badge/contributors-wanted-b45309?style=flat-square)](CONTRIBUTORS.md)

**[Open the live site →](https://apsideslabs.github.io/SikBodo/)**

</div>

---

## Contents

- [What this is](#what-this-is)
- [Features](#features)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Install & updates](#install--updates)
- [Gamification](#gamification)
- [The display panel](#the-display-panel)
- [Content model](#content-model)
- [Design constraints](#design-constraints)
- [Accuracy statement](#accuracy-statement)
- [Accessibility](#accessibility)
- [Contributing](#contributing)
- [Security](#security)
- [Roadmap](#roadmap)
- [Licence](#licence)
- [Credits](#credits)

---

## What this is

SikBodo is a complete course in Bodo that runs entirely in the browser. It is built for people who
want to actually learn the language rather than sample it: a graded curriculum, a descriptive grammar
reference, a model verb with its tense, aspect and negative forms, the Devanagari-based script and its
sounds, a searchable dictionary, real dialogues, spaced practice and a phrase translator.

It is deliberately **not** a web app in the usual sense. There is no server, no framework, no bundler,
no package manager and no third-party runtime dependency. The files in this repository are exactly the
files the browser executes. Clone it, open `index.html`, and it works — including offline.

> **On the name.** Bodo is the language's common English name; the people and the language call
> themselves **बरʼ** (*Boro*). The language is a member of the Tibeto-Burman family — quite unrelated to
> Assamese, which shares its region — and it has been written in Devanagari since 1975.

---

## Features

| Page | What it does |
| --- | --- |
| [`lessons.html`](lessons.html) | **15 lessons** across Basic · Elementary · Intermediate · Advanced, with per-lesson progress saved locally |
| [`progress.html`](progress.html) | **Progress & study record** — your XP, mastery rank, streak, saved words, a 15-rank ladder and 18 unlockable trophies, built entirely on this device |
| [`script.html`](script.html) | **Script & sounds** — the varnamala chart of every letter as it is read aloud, then the vowels and consonants with a pronunciation guide, a character inspector, and the sounds Bodo reads differently |
| [`grammar.html`](grammar.html) | **Grammar reference** — 16 sections: words, sentences, parts of speech, word order, nouns and plurals, classifiers, case markers, pronouns, honorifics, the verb, negation, questions, adjectives, numerals, word formation, coordination and register |
| [`verbs.html`](verbs.html) | **Verb tables** — a model verb's present/past/future paradigm, the negative, the imperative, the aspect markers, and ten common verbs |
| [`numbers.html`](numbers.html) | **Numbers & time** — the ten digits, 1–100 and the pattern above them, the ordinals, time words, the days of the week, and the shared solar months |
| [`dictionary.html`](dictionary.html) | **280 words** in the Devanagari script with romanisation and English, plus live search and 20 category filters (including Colours, Fruits & vegetables, Animals, Birds, Food, Festivals, Family and kinship, Verbs and Pronouns) |
| [`idioms.html`](idioms.html) | **Idioms & proverbs** — a starter set of Bodo sayings, each with its literal image and its real meaning |
| [`phrases.html`](phrases.html) | **84 phrases** grouped by setting: greetings, introductions, the market, food, travel, health, the classroom, the phone, the bank, festivals and more |
| [`conversations.html`](conversations.html) | **14 dialogues** with English, Bodo and pronunciation side by side, each with a spoken-language note |
| [`reading.html`](reading.html) | **Reading & writing** — 7 graded passages from two-line beginners' texts to a short essay, each with a romanisation, an English rendering and comprehension questions, plus a guide to writing |
| [`quiz.html`](quiz.html) | **Flashcards** in both directions with a running score |
| [`translator.html`](translator.html) | **English → Bodo** phrasebook lookup with a word-by-word fallback and coverage score |
| [`culture.html`](culture.html) | **Language & community** — speakers, the script and the script movement, tone and the vowel /ɯ/, dialects, Bathouism and the festivals, and the literature |
| [`contribute.html`](contribute.html) | **Contribute** — what you can add, why it matters, and step-by-step routes including one that needs no code |
| [`resources.html`](resources.html) | **Sources, corpora and a twelve-week study plan** |
| [`about.html`](about.html) | Contents, credits, licence and a full accuracy statement |

**Interface-wide:** white and dark themes, a comfortable reading mode, adjustable font family, text
size, page zoom, colour warmth, tint intensity, six accent palettes, high-contrast mode, a generated
on-this-page column, keyboard navigation and a print stylesheet.

---

## Architecture

SikBodo is a **no-build static site**. Content is data, the interface is generated at runtime from
that data, and the visual system is four stylesheets driven by design tokens.

```mermaid
flowchart LR
    A["index.html<br/><small>static shell</small>"] --> B["js/data/*.js<br/><small>content modules</small>"]
    B --> C["js/data/index.js<br/><small>merges into window.SKB</small>"]
    C --> D["js/app.js<br/><small>boot()</small>"]
    D --> E["js/ui/chrome.js<br/><small>header + footer + nav</small>"]
    D --> F["js/ui/sidebar.js<br/><small>grouped nav + progress</small>"]
    D --> G["js/ui/panel.js<br/><small>display controls</small>"]
    D --> H["js/render/*.js<br/><small>page renderers</small>"]
    H --> I["#page-body"]
    I --> J["js/ui/toc.js<br/><small>on-this-page column</small>"]
    K["js/core/prefs.js"] -.->|CSS custom properties| L(["&lt;html&gt;<br/>data-theme / data-reading / data-font"])
    G --> K
    L -.-> M["css/tokens.css<br/><small>all components react</small>"]

    classDef data fill:#eef7e3,stroke:#48871c,color:#1b2e12
    classDef ui fill:#e6f4f1,stroke:#0f766e,color:#0b3b36
    classDef core fill:#fdf3e3,stroke:#b45309,color:#5a3a05
    class B,C data
    class E,F,G,H,I,J ui
    class K,L,M core
```

### The two rules that keep it honest

1. **Content is data, never markup.** Every lesson, word, phrase and dialogue lives in a plain object
   under `js/data/`. Adding an entry is a one-line change; no page needs touching.
2. **The interface is generated, the headings are static.** Each page carries its own `<h1>` and lede in
   HTML — good for search engines and for the CI skeleton check — while everything below is rendered
   from data.

---

## Project structure

```
SikBodo/
├── index.html · lessons.html · progress.html · script.html · grammar.html
├── verbs.html · numbers.html · dictionary.html · idioms.html · phrases.html
├── conversations.html · quiz.html · translator.html
├── culture.html · resources.html · contribute.html · about.html · 404.html
│
├── css/
│   ├── tokens.css          # colour, type, space, shape, themes
│   ├── layout.css          # header, sidebar, prose column, TOC, footer
│   ├── components.css      # every component + the display panel
│   ├── motion.css          # entrance and micro-interaction timings
│   └── print.css           # print stylesheet
│
├── js/
│   ├── app.js              # boot: icons → prefs → chrome → page → TOC
│   ├── core/
│   │   ├── store.js        # localStorage + the gamified mastery engine
│   │   │                   #   (XP, 15 ranks, streaks, saved words, profile)
│   │   ├── update.js       # service worker + the update banner (PWA)
│   │   ├── install.js      # install offer, app mode, display-mode stamp
│   │   ├── prefs.js        # display preferences engine
│   │   └── icons.js        # generated icon helper (Lucide sprite, inlined)
│   ├── data/
│   │   ├── meta.js         # site metadata, facts, credits
│   │   ├── lessons.js      # 15 lessons
│   │   ├── script.js       # vowels, consonants, notes
│   │   ├── grammar.js      # grammar reference sections
│   │   ├── verbs.js        # persons, tenses, negation, imperative, aspect
│   │   ├── numbers.js      # numerals, pattern, time words
│   │   ├── dictionary.js   # 200 entries
│   │   ├── phrases.js      # 84 phrases by setting
│   │   ├── dialogues.js    # 14 conversations
│   │   ├── reading.js      # graded passages + writing guide
│   │   ├── idioms.js       # idioms and proverbs
│   │   ├── culture.js      # background sections
│   │   ├── resources.js    # external sources, study plan
│   │   ├── contribute.js   # contribution guide content
│   │   └── index.js        # merges everything into window.SKB
│   ├── ui/
│   │   ├── chrome.js       # navigation model, header, footer
│   │   ├── sidebar.js      # grouped navigation + progress card
│   │   ├── mobilenav.js    # mobile bottom bar
│   │   ├── panel.js        # the floating display panel
│   │   ├── toc.js          # on-this-page column with scroll spy
│   │   └── motion.js       # scroll-reveal and stat count-up
│   └── render/
│       ├── renderers.js    # the static content pages
│       └── interactive.js  # quiz and translator
│
├── assets/
│   ├── favicon.svg · logo.svg · logo-mark.svg · icon-maskable.svg · og-cover.svg
│   ├── icon-192.png · icon-512.png · icon-maskable-512.png · apple-touch-icon.png
│   └── icons.svg           # Lucide sprite (ISC)
│
├── docs/
│   ├── ARCHITECTURE.md     # runtime design in depth
│   ├── CONTENT-GUIDE.md    # how to add content
│   ├── ACCESSIBILITY.md    # commitments and test checklist
│   ├── UPDATES.md          # install, offline and the update flow
│   └── ROADMAP.md          # what is planned and what is not
│
├── tools/
│   ├── check-links.mjs     # dependency-free internal link checker
│   └── build-sitemap.mjs   # regenerates sitemap.xml from the pages
│
├── .github/
│   ├── workflows/ci.yml    # validation + secret scanning
│   ├── ISSUE_TEMPLATE/     # bug report, feature request
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── dependabot.yml
│
├── CONTRIBUTING.md · SECURITY.md · CODE_OF_CONDUCT.md
├── CHANGELOG.md · CONTRIBUTORS.md · LICENSE · README.md
├── sw.js · version.json · manifest.webmanifest
├── robots.txt · sitemap.xml · _headers
└── .nojekyll · .gitignore
```

---

## Getting started

**Open it.** Double-click `index.html`. Everything works from the file system, offline, with no install.

**Or serve it** (recommended — clipboard features behave better over HTTP):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

**Or clone and deploy your own:**

```bash
git clone https://github.com/apsideslabs/SikBodo.git
cd SikBodo
# push to your own repo, then: Settings → Pages → Deploy from a branch → main / root
```

### Repo checks

```bash
node tools/check-links.mjs     # verify every internal link resolves
node tools/build-sitemap.mjs   # regenerate sitemap.xml after adding a page
node --check js/app.js         # syntax-check any file
```

CI runs all of these on every push, plus a dependency-free secret scan.

---

## Install & updates

SikBodo is a **Progressive Web App**. Open the live site and install it like an app:

| Platform | How to install |
| --- | --- |
| Android / Chrome | An **Install app** prompt, or ⋮ → *Add to Home screen* |
| Desktop Chrome / Edge | An **install** icon in the address bar |
| iPhone / iPad (Safari) | **Share → Add to Home Screen** |

Installed, it opens full-screen, works **offline** (a service worker caches the whole app), and shows an
**update notice** when a new release is deployed. A small **Updates** button at the bottom-left checks on
demand and reports *“You're up to date”*, *“Update available”*, or a friendly offline message.

The notice appears **only in the installed app** — never on the plain website. Full detail, including
how to test it locally, is in [`docs/UPDATES.md`](docs/UPDATES.md).

---

## Gamification

The platform is a **language studio**, not a static reader. Everything below is computed on the
device and stored in `localStorage` — there is no account and nothing is uploaded.

- **XP.** Each completed lesson is worth 50 XP; the Quiz Arena adds bonus XP. A live HUD in the header
  shows your level ring, total XP and current day-streak on every page.
- **15 ranks**, from *Initiate* to *Bodo Laureate*, each with its own XP threshold, a focus line and
  the milestone that unlocks it. The ladder is drawn on the Progress page and in the sidebar card.
- **A day-streak.** Opening the platform on consecutive days rolls a streak forward, with a best-streak
  record kept — the classic habit mechanic, stored on the device.
- **A daily goal.** Each day tracks the XP you have earned against a 50 XP target, shown as a
  percentage on the home dashboard.
- **18 trophies** plus a **milestone badge strip** on the home page — lesson tiers, XP clubs, streak
  milestones and vocabulary goals — each with an earned / locked state.
- **Saved words.** Every dictionary row carries a star; starred words are collected on the Progress
  page and can be filtered in the Dictionary.
- **A learner profile** with an editable name, and **export / import of the whole study record** as
  JSON, so progress survives a cleared browser.
- The rank and trophy definitions live in `js/core/store.js` and the Progress renderer; the
  content is Bodo and the rank titles are English.

## The display panel

The round **Aa** button in the bottom-right corner opens the display panel. Every control writes a CSS
custom property or a `data-` attribute on `<html>`, so the whole interface reacts without any
per-component JavaScript.

| Control | Range | How it is applied |
| --- | --- | --- |
| Theme | White · Dark · Auto | `data-theme` swaps the entire token set |
| Reading mode | Off · Comfortable | Paper-toned palette, serif, wider leading |
| Font | Sans · Serif · Mono | `data-font` reassigns `--font` |
| Text size | 85 – 150 % | Root `font-size: calc(16px * var(--text-scale))` |
| Page zoom | 80 – 140 % | `zoom` on `body` |
| Warmth | −100 (cool) … +100 (warm) | A tint overlay's colour |
| Tint intensity | 0 – 100 | The overlay's opacity |
| Accent colour | 6 palettes | Rewrites `--brand`, `--brand-ink`, `--brand-soft` |
| Contrast | Normal · High | `data-contrast` strengthens borders and text |
| On-this-page column | Show · Hide | Rebuilds the right-hand TOC |

Preferences persist in `localStorage` under `sikbodo.prefs`. **White is the default theme.**

---

## Content model

All content lives in `js/data/`. The shapes are small and documented in full in
[`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md).

```js
// a dictionary entry
{ en: "water", bo: "दै", rom: "dwi", cat: "Food & drink" }

// a phrase
{ en: "Thank you", bo: "साबायखर", rom: "sabaikhor", cat: "Greetings & courtesy" }

// a lesson
{ level: "Basic", n: 1, title: "What is Bodo?", summary: "…", body: "<p>…</p>" }
```

**Two invariants, enforced by review:**

1. Every Bodo string is written in the **Devanagari script**.
2. Every Bodo string carries a **romanisation**, because the script does not show tone and learners
   need the sound as well as the spelling.

The romanisation used across the project, without exception: **`w`** for the high central vowel /ɯ/,
**`j`** for the sound /z/, **`y`** for /j/, and **`ph`, `th`, `kh`** for the aspirated stops. So
नों is *nwng*, जों is *jwng*, and दै is *dwi*.

---

## Design constraints

These are deliberate and load-bearing. Features that break them are out of scope.

| Constraint | Consequence |
| --- | --- |
| **No build step** | `.html`, `.css` and `.js` are served verbatim. Editing a file and pushing *is* the release. |
| **No runtime dependencies** | No npm, no CDN, no web fonts fetched at runtime. Icons are inlined; typefaces resolve from system fonts. |
| **Works offline** | Everything functions from `file://` or with the network unplugged. Once installed, a service worker caches the whole app. |
| **Installable** | A Progressive Web App: installable to a home screen, with an in-app update notice — see [`docs/UPDATES.md`](docs/UPDATES.md). |
| **No tracking** | No analytics, no telemetry, no cookies. The only stored state is your display preferences, lesson progress and update dismissals, in your own browser. |
| **No accounts** | A static site cannot authenticate anyone, so it does not pretend to. |
| **Accessible by default** | Semantic headings, visible focus, WCAG AA contrast, keyboard operation — see [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md). |

---

## Accuracy statement

> **Read this before trusting anything in the platform.**

Bodo is a well-documented but comparatively **lower-resource** language. It has several regional
varieties — Western, Eastern and Southern — and the Mech variety of West Bengal and Nepal is close kin;
this project describes the **Standard (Western) Bodo** used around Kokrajhar unless a note says
otherwise. It was compiled from public learner resources, dictionaries and published descriptions of
Bodo grammar. It was **not** produced by, or verified with, a native speaker.

Bodo also presents two difficulties that this platform can only partly solve. First, it is **tonal**,
and ordinary Devanagari spelling does not mark tone, so tone is described but not written. Second, the
**romanisation varies** between sources, so numbers and some words appear in more than one spelling;
where sources disagreed, the more widely repeated form was kept and the uncertainty is flagged in
place. The verb tables model the system rather than asserting that every derived form is attested, and
the idioms and proverbs are a deliberately small starter set that must be checked with speakers.

Treat SikBodo as a **learning scaffold**. Confirm details with speakers, and if you are a speaker,
please [open an issue](https://github.com/apsideslabs/SikBodo/issues/new?template=bug_report.md) —
corrections from the community are the single most valuable contribution to this project.

---

## Accessibility

Semantic heading order (one `h1`, no skipped levels), a skip link, visible focus rings, ARIA on the
display panel (`role="dialog"`, `aria-pressed`, `aria-expanded`), WCAG 2.1 AA contrast targets, a
minimum text size of 1rem, `prefers-reduced-motion` support, full keyboard operation and a print
stylesheet. The manual test checklist is in [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md).

---

## Contributing

Contributions are welcome — especially content corrections from Bodo speakers and teachers. Please read
[`CONTRIBUTING.md`](CONTRIBUTING.md) and [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md) first.

The short version: run `node tools/check-links.mjs` before opening a pull request, keep every Bodo
string in the Devanagari script **with** a romanisation, add no emoji (the project uses the Lucide sprite),
and do not invent Bodo forms — flag uncertainty instead.

---

## Security

This is a static site with no server, no user accounts, no data collection and no third-party scripts.
The threat model, the controls that apply, and how to report a problem are in
[`SECURITY.md`](SECURITY.md). The repository has GitHub **secret scanning** and **push protection**
enabled, and CI runs a dependency-free secret scan on every push.

---

## Roadmap

Planned: audio pronunciation, spaced-repetition review, a larger verified dictionary, tone-marked
entries, and growing the reading material. Explicitly **not** planned: ads, tracking, telemetry,
accounts, CDNs and a build step. Full detail in [`docs/ROADMAP.md`](docs/ROADMAP.md).

---

## Licence

[MIT](LICENSE) © 2026 The Study Cipher.

---

## Credits

| Component | Attribution |
| --- | --- |
| Icons | [Lucide](https://lucide.dev) v1.49.0 — ISC Licence, bundled as an inline SVG sprite |
| Typefaces | Inter and Noto Sans Devanagari, referenced by name and resolved from system fonts |
| Language data | Compiled from public Bodo learner resources, dictionaries and published Bodo linguistics — see [`resources.html`](resources.html) and [`about.html`](about.html) |

<div align="center">
<sub>Built as a study resource. <strong>जों बरʼ राव सोलों!</strong> — let us learn Bodo.</sub>
</div>
