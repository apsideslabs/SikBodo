# Changelog

All notable changes to **SikBodo — Bodo Learning Platform**.
This project follows [Semantic Versioning](https://semver.org/).

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
