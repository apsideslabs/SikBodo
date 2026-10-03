# Changelog

All notable changes to **SikBodo — Bodo Learning Platform**.
This project follows [Semantic Versioning](https://semver.org/).

## [1.6.1] — 2026-10-03

### Fixed

- **The in-app update button now actually updates.** In the installed PWA the "new version" banner
  appeared, but tapping it did nothing: the app never asked the browser to re-check `sw.js`, so no new
  worker was ever *waiting* to take over — and the fallback reload was answered from the cache, which
  serves the old page. The update flow now forces a `registration.update()` check, waits for the new
  worker to install, promotes it with `SKIP_WAITING`, and reloads onto the new cache on
  `controllerchange`. Verified end to end: with the fix the reload lands on the freshly deployed build;
  with the old code it re-serves the cached one.
- **Old caches are purged again.** The service worker's activation step deleted caches named `luitra-*`
  — a leftover from the port — instead of `sikbodo-*`, so stale caches accumulated across releases.
- The worker now accepts the `SKIP_WAITING` message as either a bare string or an object, and the
  precache list is regenerated so it once more matches the files on disk (it had drifted: the sound,
  speech and dark-logo files were missing).

## [1.6.0] — 2026-10-03

### Documentation & presentation

- **Rewrote the README** as a structured, professional landing page: the real logo (theme-aware via a
  `<picture>` element, with a new `assets/logo-dark.svg` variant for dark mode), a title and tagline, an
  organised badge set, a topics line, an **At a glance** fact table, a full table of contents, and a
  documented project tree.
- **Added five Mermaid diagrams** — the runtime architecture, the page-boot sequence, the curriculum
  ladder, a feature mindmap, and a release timeline. All five are validated to parse.
- Corrected stale details in the docs (the dictionary is 348 words, not 200) and recorded the new
  discoverability files.

## [1.5.0] — 2026-10-03

### Added

- **More content.** The dictionary grew from 280 to **348 words** (21 categories) with a researched second
  pass — more animals (ox, buffalo, sheep, tortoise, fox, wolf, lion, monkey, donkey, crocodile, bear),
  more house words, verbs (open, close, wear, win, break, jump, pull, swim …) and adjectives. The phrasebook
  grew from 84 to **107 phrases** with a new **Daily routine** set and a **Language & learning** set.

- **SEO.** Every page now ships **JSON-LD structured data** — a `BreadcrumbList` plus a typed page entity
  (`WebSite` + `Organization` on the home page; `Course`, `LearningResource`, `DefinedTermSet`, `Quiz`,
  `Article`, `CollectionPage`, `WebApplication` or `WebPage` elsewhere), all `inLanguage: en` and
  `about: Bodo`. Added **Twitter card** tags, `og:url`, `og:locale`, `og:image` dimensions and alt text, and
  a `robots` directive. The sitemap now carries `lastmod`, `changefreq` and `priority`.

## [1.4.0] — 2026-10-03

### Added

- **A real interactive learning loop.** The Quiz page is now a **Practice Arena** — an exercise engine with
  five scored modes: **mixed**, **multiple choice** (both directions), **listening**, **spelling** and
  **flashcards**. Every answer gets instant feedback, a running score and streak, and XP is awarded for
  what you get right, with a results screen at the end.

- **Sound.** `js/core/sfx.js` implements the sound-effect engine that the rest of the code already called
  (`AX.sfx.correct()`, `.wrong()`, `.tap()`, `.complete()` …) but which never existed — synthesised with the
  Web Audio API, no audio files, gated by the existing header toggle.

- **Pronunciation.** `js/core/speech.js` plays Bodo with the browser's built-in speech synthesis, with a
  speaker button on every dictionary word, phrase, dialogue line, script letter, number and the word of
  the day. Bodo has no dedicated voice, so an Indic voice reads the Devanagari as an approximation — the
  Practice Arena says so plainly.

- **Practice hooks everywhere** — a "Practise these words" action on every lesson, and practice CTAs on
  the home page. The nav item is relabelled **Practice**.

## [1.3.0] — 2026-10-03

### Changed

- **A visual overhaul of every page — no more plain tables.** Each page now opens on a decorated hero
  band (a soft brand gradient over a subtle leaf motif), and the reference content has been rebuilt so
  it reads as a designed product rather than a document:
  - **Tables** gained tinted headers, zebra rows, hover highlighting and an emphasised Bodo column.
  - **Reference sections** are now cards; grammar sections are numbered.
  - **The dictionary** is a card grid, with the Bodo word as the hero of each card.
  - **Phrases** are grouped cards, not tables.
  - **Conversations** are chat bubbles, alternating by speaker.
  - A contrast pass on the romanisation lines and category pills for readability.

## [1.2.0] — 2026-10-03

### Added

- **The supplied SikBodo logo is now the brand.** The header shows the given vector artwork — the open
  book with leaves and the *SIKBODO* wordmark — drawn inline and recoloured through CSS variables so it
  reads correctly in both light and dark themes. The app icons, favicon, splash and social card are all
  rebuilt from the same artwork's mark, not a substitute.

- **A gamified home page.** Below the study-record dashboard the home page now carries a **learning
  path** (the next lesson as a hero card, with the following lessons listed), a **word of the day** card
  with reveal-and-save, a **daily practice** card (streak, goal and best-streak), and a **study &
  research** band linking to reading, sources, culture and the lexicon.

### Changed

- **The dictionary grew from 200 to 280 words** — a full colour set, a new *Fruits & vegetables*
  category, more body parts, animals, nature, verbs and adjectives, all with romanisation.

## [1.1.0] — 2026-10-03

### Added

- **A professional wordmark.** The header brand is now a wide *SikBodo* wordmark (a green sprout mark
  plus type), drawn inline so it stays crisp and inherits the text colour in both themes — no plate,
  no squashing. The supplied **BODO** logo remains the source of the mark and the app icons.

- **A richer header HUD.** A level ring with the level number inside, the running XP, and a flame with
  the current day-streak replace the old text pill.

- **A day-streak and daily-goal engine** in `js/core/store.js`. Opening the platform on consecutive
  days advances the streak; each day tracks XP earned against a 50 XP goal.

- **A gamified home dashboard** — a level ring, XP progress to the next rank, a continue-learning
  button, and four live tiles (XP, day-streak, daily goal, words saved).

- **A milestone badge strip** on the home page, and a **directory grid** of tone-coloured cards
  replacing the plain list.

### Changed

- The header logo is larger and no longer needs a light plate in dark theme.
- Primary buttons carry a subtle gradient and glow; the home page reads as a study studio rather than
  a static page.

## [1.0.0] — 2026-10-03

### Added

- **The platform itself.** A complete, free, offline course and reference for learning Bodo
  (बरʼ, Boro), a Tibeto-Burman language of Assam. Eighteen pages, a single global content
  layer (`window.SKB`), and a shared chrome injected at runtime.

- **A fifteen-lesson graded curriculum** across Basic, Elementary, Intermediate and Advanced,
  with per-lesson progress saved to `localStorage`.

- **A script & sounds reference** built on the Devanagari alphabet as Bodo uses it: the
  varnamala chart, the vowels and consonants with pronunciation hints, a click-to-inspect
  character panel, and notes on the vowel /ɯ/, tone, and the letters Bodo reads differently
  from Hindi.

- **A grammar reference** in sixteen sections — word order, nouns and plurals, classifiers,
  case markers, pronouns (including the inclusive/exclusive "we"), honorifics, the verb,
  negation, questions, numerals, word formation and register.

- **A verb reference** with a model verb's present/past/future paradigm, the negative, the
  imperative, the aspect markers, and ten common verbs.

- **Numbers & time** — the ten digits, one to a hundred and the pattern above them, the
  ordinals, time words, the days of the week, and the shared solar months.

- **A 200-word dictionary** in the Devanagari script with romanisation and English, live
  search, twenty category filters, and star-to-save.

- **84 phrases**, **14 dialogues**, **7 graded reading passages**, and a starter set of
  **idioms and proverbs**.

- **A gamified study record** — XP, a fifteen-rank ladder from *Initiate* to *Bodo Laureate*,
  streaks, eighteen trophies, saved words, an editable profile, and export/import of the
  whole record as JSON.

- **A display panel** with light/dark/system themes, reading mode, font and text-size
  controls, page zoom, warmth and tint, six accent palettes (defaulting to Bodo green),
  high-contrast mode, and an on-this-page column.

- **A Progressive Web App** — a service worker for offline use, real PNG icons generated from
  the Bodo mark, a launch splash for the installed app, an install banner, and an in-app
  update notice.

- **Tooling** — a dependency-free internal link checker and sitemap generator, and CI that
  syntax-checks all JavaScript, validates page structure and scans for committed secrets.

### Notes

- The content is compiled from public Bodo learner resources, dictionaries and published
  linguistics. It has **not** been verified by a native speaker; tone and some romanisations
  vary between sources. Corrections from speakers are the most valuable contribution — see
  [`CONTRIBUTING.md`](CONTRIBUTING.md).
