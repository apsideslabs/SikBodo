<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.svg">
  <img src="assets/logo.svg" alt="SikBodo — a free, offline platform for learning Bodo" width="440">
</picture>

# SikBodo

**A free, offline, dependency-free platform for learning Bodo (बरʼ · Boro)** — the Tibeto-Burman
language of the Bodo people of Assam, India.

**15 lessons · 16 grammar sections · a 348-word dictionary · 107 phrases · 14 dialogues · an interactive practice arena** — all running in the browser, with no build step and no runtime dependencies.

[![Live site](https://img.shields.io/badge/live%20site-open-48871c?style=flat-square&logo=githubpages&logoColor=white)](https://apsideslabs.github.io/SikBodo/)
[![Version](https://img.shields.io/badge/version-1.6.2-48871c?style=flat-square)](CHANGELOG.md)
[![Licence](https://img.shields.io/badge/licence-MIT-0f766e?style=flat-square)](LICENSE)
[![Runtime dependencies](https://img.shields.io/badge/runtime%20dependencies-0-b45309?style=flat-square)](#design-constraints)
[![Build step](https://img.shields.io/badge/build%20step-none-6d28d9?style=flat-square)](#design-constraints)

[![CI](https://img.shields.io/badge/CI-validate%20%2B%20secret%20scan-0f766e?style=flat-square)](.github/workflows/ci.yml)
[![Offline](https://img.shields.io/badge/works-offline-15803d?style=flat-square)](#install--updates)
[![PWA](https://img.shields.io/badge/installable-PWA-3730a3?style=flat-square)](#install--updates)
[![Accessibility](https://img.shields.io/badge/accessibility-WCAG%202.1%20AA-0f766e?style=flat-square)](docs/ACCESSIBILITY.md)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-15803d?style=flat-square)](CONTRIBUTING.md)
[![Contributors wanted](https://img.shields.io/badge/contributors-wanted-b45309?style=flat-square)](CONTRIBUTORS.md)

<sub><b>Topics:</b>
<code>bodo</code> <code>boro</code> <code>brx</code> <code>tibeto-burman</code> <code>bodo-language</code>
<code>language-learning</code> <code>assam</code> <code>northeast-india</code> <code>devanagari</code>
<code>education</code> <code>offline-first</code> <code>pwa</code> <code>static-site</code>
<code>vanilla-js</code> <code>no-dependencies</code> <code>github-pages</code></sub>

**[Open the live site →](https://apsideslabs.github.io/SikBodo/)** · **[Read the docs →](docs/)** · **[Contribute →](CONTRIBUTING.md)**

</div>

---

## Contents

- [Overview](#overview)
- [At a glance](#at-a-glance)
- [Features](#features)
- [Architecture](#architecture)
- [How a page is built](#how-a-page-is-built)
- [Curriculum](#curriculum)
- [Feature map](#feature-map)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Install & updates](#install--updates)
- [Progress & gamification](#progress--gamification)
- [The display panel](#the-display-panel)
- [Content model](#content-model)
- [Discoverability & SEO](#discoverability--seo)
- [Design constraints](#design-constraints)
- [Accuracy statement](#accuracy-statement)
- [Accessibility](#accessibility)
- [Contributing](#contributing)
- [Security](#security)
- [Roadmap](#roadmap)
- [Release history](#release-history)
- [Licence](#licence)
- [Credits](#credits)

---

## Overview

SikBodo is a complete course in Bodo that runs entirely in the browser. It is built for people who
want to actually learn the language rather than sample it: a graded curriculum, a descriptive grammar
reference, a model verb with its tense, aspect and negative forms, the Devanagari-based script and its
sounds, a searchable dictionary, real dialogues, spaced practice and a phrase translator.

It is deliberately **not** a web app in the usual sense. There is no server, no framework, no bundler,
no package manager and no third-party runtime dependency. The files in this repository are exactly the
files the browser executes. Clone it, open `index.html`, and it works — including offline.

> **On the name.** Bodo is the language's common English name; the people and the language call
> themselves **बरʼ** (*Boro*). The language belongs to the Tibeto-Burman family — quite unrelated to
> Assamese, which shares its region — and it has been written in Devanagari since 1975.

---

## At a glance

| | |
| --- | --- |
| **Language taught** | Bodo / Boro · ISO 639-3 [`brx`](https://iso639-3.sil.org/code/brx) |
| **Script** | Devanagari, with romanisation throughout |
| **Curriculum** | 15 lessons across four levels |
| **Grammar** | 16 reference sections |
| **Dictionary** | 348 words · 21 categories |
| **Phrases** | 107 across 16 settings |
| **Dialogues** | 14, with side-by-side English and pronunciation |
| **Reading** | 7 graded passages |
| **Practice** | 5 scored exercise modes |
| **Progress** | XP · 15 ranks · 18 trophies · day-streaks |
| **Pages** | 19, plus a 404 |
| **Runtime dependencies** | none |
| **Build step** | none |
| **Offline** | yes — installable PWA |
| **Licence** | MIT |

---

## Features

| Page | What it does |
| --- | --- |
| [`lessons.html`](lessons.html) | **15 lessons** across Basic · Elementary · Intermediate · Advanced, with per-lesson progress saved locally |
| [`progress.html`](progress.html) | **Progress & study record** — XP, mastery rank, streak, saved words, a 15-rank ladder and 18 unlockable trophies, built entirely on this device |
| [`script.html`](script.html) | **Script & sounds** — the varnamala chart of every letter as it is read aloud, then the vowels and consonants with a pronunciation guide, a character inspector, and the sounds Bodo reads differently |
| [`grammar.html`](grammar.html) | **Grammar reference** — 16 sections: words, sentences, parts of speech, word order, nouns and plurals, classifiers, case markers, pronouns, honorifics, the verb, negation, questions, adjectives, numerals, word formation, coordination and register |
| [`verbs.html`](verbs.html) | **Verb tables** — a model verb's present/past/future paradigm, the negative, the imperative, the aspect markers, and ten common verbs |
| [`numbers.html`](numbers.html) | **Numbers & time** — the ten digits, 1–100 and the pattern above them, the ordinals, time words, the days of the week, and the shared solar months |
| [`dictionary.html`](dictionary.html) | **348 words** in the Devanagari script with romanisation and English, plus live search and 21 category filters (including Colours, Fruits & vegetables, Animals, Birds, Food, Festivals, Family and kinship, Verbs and Pronouns) |
| [`idioms.html`](idioms.html) | **Idioms & proverbs** — a starter set of Bodo sayings, each with its literal image and its real meaning |
| [`phrases.html`](phrases.html) | **107 phrases** grouped by setting: greetings, introductions, a daily routine, the market, food, travel, health, the classroom, the phone, the bank, festivals and more |
| [`conversations.html`](conversations.html) | **14 dialogues** with English, Bodo and pronunciation side by side, each with a spoken-language note |
| [`reading.html`](reading.html) | **Reading & writing** — 7 graded passages from two-line beginners' texts to a short essay, each with a romanisation, an English rendering and comprehension questions, plus a guide to writing |
| [`quiz.html`](quiz.html) | **Practice Arena** — five scored exercise modes (mixed, multiple choice, listening, spelling, flashcards) with instant feedback, a running score and streak, and XP for correct answers |
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
flowchart TB
  subgraph data["Content — js/data/*.js"]
    direction LR
    A1["lessons · grammar · script<br/>verbs · numbers"]
    A2["dictionary · phrases<br/>dialogues · reading"]
    A3["idioms · culture<br/>resources · contribute"]
  end

  A1 --> IDX
  A2 --> IDX
  A3 --> IDX
  IDX["js/data/index.js<br/>merges into window.SKB"] --> APP["js/app.js<br/>boot()"]

  subgraph shell["Shell — js/ui/*"]
    direction LR
    B1["chrome.js<br/>header · footer · nav"]
    B2["sidebar.js · mobilenav.js"]
    B3["panel.js<br/>display controls"]
  end

  subgraph render["Renderers — js/render/*"]
    direction LR
    C1["renderers.js<br/>content pages"]
    C2["interactive.js<br/>arena · translator"]
  end

  APP --> B1
  APP --> B2
  APP --> B3
  APP --> C1
  APP --> C2
  B1 --> BODY["#page-body"]
  B2 --> BODY
  B3 --> BODY
  C1 --> BODY
  C2 --> BODY
  BODY --> TOC["js/ui/toc.js<br/>on-this-page column"]

  subgraph core["Core — js/core/*"]
    direction LR
    E1["store.js<br/>XP · ranks · streaks"]
    E2["prefs.js<br/>display engine"]
    E3["sfx.js · speech.js<br/>sound"]
  end

  E2 -.->|CSS custom properties| HTMLNODE["html element<br/>data-theme · data-font"]
  HTMLNODE -.-> TOK["css/tokens.css"]
  TOK -.-> ALL["every component reacts"]

  classDef data fill:#eef7e3,stroke:#48871c,color:#1b2e12
  classDef ui fill:#e6f4f1,stroke:#0f766e,color:#0b3b36
  classDef core fill:#fdf3e3,stroke:#b45309,color:#5a3a05
  class A1,A2,A3,IDX data
  class B1,B2,B3,C1,C2,BODY,TOC ui
  class E1,E2,E3,HTMLNODE,TOK,ALL core
```

### The two rules that keep it honest

1. **Content is data, never markup.** Every lesson, word, phrase and dialogue lives in a plain object
   under `js/data/`. Adding an entry is a one-line change; no page needs touching.
2. **The interface is generated, the headings are static.** Each page carries its own `<h1>` and lede in
   HTML — good for search engines and for the CI skeleton check — while everything below is rendered
   from data.

---

## How a page is built

There is no server render and no hydration step. Every page follows the same short sequence:

```mermaid
sequenceDiagram
  autonumber
  participant B as Browser
  participant A as app.js
  participant D as js/data/index.js
  participant R as js/ui + js/render
  participant S as localStorage
  B->>A: open any page
  A->>A: boot()
  A->>D: read content into window.SKB
  A->>S: restore display preferences
  A->>R: build header, sidebar, panel
  R->>B: render into #page-body
  A->>R: build the on-this-page column
  B->>A: learner interacts
  A->>S: save XP, streak, saved words
```

---

## Curriculum

The 15 lessons are graded into four levels. Each level assumes the one before it, and the Practice
Arena draws on everything unlocked so far.

```mermaid
flowchart LR
  A["Basic<br/>lessons 1–4"] --> B["Elementary<br/>lessons 5–8"] --> C["Intermediate<br/>lessons 9–12"] --> D["Advanced<br/>lessons 13–15"]
  A --> P
  B --> P
  C --> P
  D --> P
  P["Practice Arena<br/>XP · streaks · ranks"]
```

---

## Feature map

```mermaid
mindmap
  root((SikBodo))
    Learn
      15 graded lessons
      16 grammar sections
      Verb tables
      Script and sounds
    Practise
      Practice Arena
      Multiple choice
      Listening
      Spelling
      Flashcards
    Reference
      348-word dictionary
      107 phrases
      14 dialogues
      Idioms and proverbs
    Track
      XP and 15 ranks
      18 trophies
      Day streaks
      Saved words
```

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
│   │   ├── prefs.js        # display preferences engine
│   │   ├── sfx.js          # WebAudio interface tones
│   │   ├── speech.js       # text-to-speech pronunciation
│   │   ├── icons.js        # generated icon helper (Lucide sprite, inlined)
│   │   ├── update.js       # service worker + the update banner (PWA)
│   │   ├── install.js      # install offer, app mode, display-mode stamp
│   │   └── splash.js       # splash screen for the installed app
│   ├── data/
│   │   ├── meta.js         # site metadata, facts, credits
│   │   ├── lessons.js      # 15 lessons
│   │   ├── script.js       # vowels, consonants, notes
│   │   ├── grammar.js      # 16 grammar reference sections
│   │   ├── verbs.js        # persons, tenses, negation, imperative, aspect
│   │   ├── numbers.js      # numerals, pattern, time words, months
│   │   ├── dictionary.js   # 348 entries
│   │   ├── phrases.js      # 107 phrases by setting
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
│   │   ├── motion.js       # scroll-reveal and stat count-up
│   │   └── update.js       # the Updates button
│   └── render/
│       ├── renderers.js    # the static content pages
│       └── interactive.js  # practice arena and translator
│
├── assets/
│   ├── logo.svg · logo-dark.svg · logo-mark.svg · splash-logo.svg
│   ├── favicon.svg · og-cover.svg · apsides-labs.svg · icon-maskable.svg
│   ├── icon-192.png · icon-512.png · icon-maskable-512.png · apple-touch-icon.png
│   └── icons.svg           # Lucide sprite (ISC)
│
├── docs/
│   ├── ARCHITECTURE.md     # runtime design in depth
│   ├── CONTENT-GUIDE.md    # how to add content
│   ├── ACCESSIBILITY.md    # commitments and test checklist
│   ├── UPDATES.md          # install, offline and the update flow
│   ├── SEO.md              # discoverability: what is automated, what is manual
│   └── ROADMAP.md          # what is planned and what is not
│
├── tools/
│   ├── check-links.mjs     # dependency-free internal link checker
│   ├── build-sitemap.mjs   # regenerates sitemap.xml from the pages
│   └── build-pwa.mjs       # regenerates icons and the manifest
│
├── .github/
│   ├── workflows/ci.yml        # validation + secret scanning
│   ├── workflows/indexnow.yml  # submits URLs to IndexNow on each push
│   ├── ISSUE_TEMPLATE/         # bug report, feature request
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── dependabot.yml
│
├── CONTRIBUTING.md · SECURITY.md · CODE_OF_CONDUCT.md
├── CHANGELOG.md · CONTRIBUTORS.md · LICENSE · README.md
├── sw.js · version.json · manifest.webmanifest · metadata.json
├── robots.txt · sitemap.xml · llms.txt · _headers
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

## Progress & gamification

The platform is a **language studio**, not a static reader. Everything below is computed on the
device and stored in `localStorage` — there is no account and nothing is uploaded.

- **XP.** Each completed lesson is worth 50 XP; every correct answer in the Practice Arena adds more. A live HUD in the header
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

---

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

## Discoverability & SEO

Every page carries a unique title and description, a canonical URL, Open Graph and Twitter card tags, and
a `robots` directive. Each page also ships **JSON-LD structured data** (`schema.org`) in a single `@graph`:
a `BreadcrumbList`, plus a page entity — `WebSite` and `Organization` on the home page, and `Course`,
`LearningResource`, `DefinedTermSet`, `Quiz`, `Article`, `CollectionPage` or `WebPage` as appropriate —
linked to the site and marked `inLanguage: en` and `about: Bodo (brx)`. `sitemap.xml` lists every page with
`lastmod`, `changefreq` and `priority`; `robots.txt` points at it. No third-party scripts, so nothing blocks
crawling.

For AI discovery, `llms.txt` gives crawlers a plain-language summary of the platform, and
`.github/workflows/indexnow.yml` submits every URL to the **IndexNow** protocol (Bing, Yandex, Seznam,
Naver) on each push to `main`. `docs/SEO.md` records what is automated and what still needs the owner's
login — Search Console, a custom domain and backlinks.

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

Shipped: audio pronunciation (browser speech, approximate), an interactive practice engine, a 348-word
dictionary. Planned: spaced-repetition review, a larger verified dictionary, tone-marked entries, and
growing the reading material. Explicitly **not** planned: ads, tracking, telemetry, accounts, CDNs and a
build step. Full detail in [`docs/ROADMAP.md`](docs/ROADMAP.md).

---

## Release history

```mermaid
timeline
  title SikBodo releases
  1.0.0 : Ported from Luitra : full Bodo content set
  1.1.0 : Header HUD : streaks and daily goal
  1.2.0 : Real logo : dictionary to 280 words
  1.3.0 : Visual overhaul of every page
  1.4.0 : Practice Arena : sound and speech
  1.5.0 : 348 words : JSON-LD SEO
  1.6.0 : README and docs overhaul
```

The full, itemised list is in [`CHANGELOG.md`](CHANGELOG.md).

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
