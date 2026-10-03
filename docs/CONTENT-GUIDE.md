# Content Guide

This guide explains how to add or edit content in SikBodo. All teachable content is
plain JavaScript data under `js/data/`; there is no CMS, no database and no build step.
If you can edit a JavaScript object literal, you can contribute content.

> Conventions used below: angle-bracketed values such as `<Bodo in the Devanagari script>` are
> **type annotations describing the field**, not literal content to paste. Live examples
> of every record type are in the corresponding `js/data/*.js` file.

## Scope

| In scope | Out of scope |
| --- | --- |
| Lessons, dictionary entries, phrases, dialogues | Page markup, CSS, renderer code |
| Grammar, verbs, numbers, culture, resources, contribute records | Site chrome and navigation wiring |
| Romanisation and accuracy notes | Anything under `js/render/`, `js/ui/`, `js/core/` |

If your change alters how content is *displayed*, that is a code change, not a content
change, and belongs in `docs/ARCHITECTURE.md` territory.

## Content modules

Each module is a classic script under `js/data/` that defines a value on the shared
namespace. `js/data/index.js` merges them all into `window.SKB`.

| Module | File | Holds |
| --- | --- | --- |
| Meta | `js/data/meta.js` | Site name, version, description, facts, credits |
| Lessons | `js/data/lessons.js` | Ordered lessons |
| Script | `js/data/script.js` | Vowels, consonants, notes |
| Grammar | `js/data/grammar.js` | Grammar reference sections |
| Verbs | `js/data/verbs.js` | Persons, tenses, negation, imperative, aspect, common verbs |
| Numbers | `js/data/numbers.js` | Digits, numerals, ordinals, days, months, time words |
| Dictionary | `js/data/dictionary.js` | English ⇄ Bodo lexicon entries |
| Phrases | `js/data/phrases.js` | Short everyday phrases |
| Dialogues | `js/data/dialogues.js` | Multi-turn conversations |
| Reading | `js/data/reading.js` | Graded passages and a writing guide |
| Idioms | `js/data/idioms.js` | Idioms (জতুৱা ঠাঁচ) and proverbs (ফকৰা-যোজনা) |
| Culture | `js/data/culture.js` | Cultural context notes |
| Resources | `js/data/resources.js` | External references, study plan, and the `sources` list shown on About |
| Contribute | `js/data/contribute.js` | The contribution guide content |

Adding a new module means creating the file **and** adding its symbol to the merge in
`js/data/index.js`. If it is not merged, it is invisible to the app.

## Shared conventions

Every content record that pairs an English gloss with Bodo uses the same three field
names, regardless of module:

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `en` | string | yes | English gloss or prompt |
| `bo` | string | yes | The Bodo text, **always in the Devanagari script** |
| `rom` | string | yes | The romanised pronunciation of `bo` |
| `cat` | string | where grouping applies | Category used for filtering and display |

The field is named `bo` for historical reasons (it was `bodo` in the reference project); in
this project it holds the **Bodo** text. Do not rename it — every renderer reads it.

Module-specific records extend this base. When editing an existing module, the
authoritative shape is the file itself — read it before adding a record.

## Lesson records

A lesson is one ordered unit of study.

```js
// js/data/lessons.js — one lesson record
{
  level:   '<level band>',   // string — "Basic" | "Elementary" | "Intermediate" | "Advanced"
  n:       <number>,         // number — the lesson's position within the whole course
  title:   '<title>',        // string — short English title shown in listings
  summary: '<summary>',      // string — one-line preview shown before the lesson opens
  body:    '<html>',         // string — an HTML fragment rendered into the prose column
}
```

Rules:

- `n` is unique and drives ordering; do not renumber existing lessons to insert a new one —
  append with the next number.
- `body` is authored HTML (paragraphs, lists, tables). It is trusted project content, not
  user input. Do not put `<h1>` in `body`: the page owns the single `<h1>`, and lessons
  start at `<h2>`.
- Every Bodo string inside `body` must be in the Devanagari script and must be accompanied
  by its romanisation in the surrounding markup.

## Dictionary entries

```js
// js/data/dictionary.js — one entry
{
  en:   '<English gloss>',        // string — required
  bo:   '<Bodo, in the Devanagari script>', // string — required
  rom:  '<romanisation>',         // string — required
  cat:  '<category>',             // string — required; used for filtering
  note: '<note>',                 // string — optional usage note
}
```

- One entry per sense. If an English word has two distinct Bodo translations, add two
  entries rather than cramming both into one.
- `note` is where you record register, dialect or usage caveats, and where you flag an
  uncertain form (see the accuracy policy).
- Categories in use today (21): People & family, Pronouns, Question words, Numbers & time,
  Food & drink, Home & objects, Nature & places, Body & health, Verbs, Adjectives, Colours,
  Animals, Birds, Fruits, Vegetables, Festivals, Seasons, Shapes, Directions, Function words,
  One-word expressions.

## Phrase records

```js
// js/data/phrases.js — one phrase
{
  en:  '<English phrase>',        // string — required
  bo:  '<Bodo, in the Devanagari script>', // string — required
  rom: '<romanisation>',          // string — required
  cat: '<category>',              // string — required; e.g. greetings, travel, courtesy
}
```

Phrases are short and self-contained. Anything longer than a single utterance — anything
with a turn structure — is a dialogue, not a phrase.

## Dialogue records

```js
// js/data/dialogues.js — one dialogue
{
  title:   '<title>',        // string — required
  setting: '<setting>',      // string — required; where the exchange takes place
  level:   '<level band>',   // string — required
  lines: [
    { who: '<speaker>', en: '<English>', bo: '<Bodo, in the Devanagari script>', rom: '<romanisation>' },
    // …one object per turn, in order
  ],
  note:    '<note>',         // string — optional
}
```

- `lines` is ordered; each object is one turn.
- `who` is the speaker label. Reuse the same label string for the same speaker so the
  renderer can group turns visually.
- Every line carries `en`, `bo` and `rom`. Do not leave a line with only some of the
  three.

## Module records: script, grammar, verbs, numbers, culture, resources

These modules follow the same `en` / `bo` / `rom` convention where a Bodo form is
involved, and add fields appropriate to the topic:

- **Script** — a record with `intro`, a `chart` array (the varnamala read-aloud chart, grouped by place of articulation, each item `{ l, reads }`), arrays of `vowels` and `consonants` (each `{ l, r, s }`: the letter, its romanisation, a plain-English hint), and `notes`.
- **Grammar** — a record with `intro` and `sections`; each section has an `id`, `title`,
  `summary`, an optional `table` (`{ caption, head, rows }`) and `notes`.
- **Verbs** — a record with `intro`, `caveat`, a `model` verb, a `persons` array, a `tenses`
  array (each tense carries a `cells` array aligned to `persons`), plus `negative`,
  `imperative`, `aspects` and `common` tables. Always open the file and match its exact shape.
- **Numbers** — a record with `intro`, a `digits` array (the ten Bodo numerals, `{ n, arabic, bo, rom }`), `ones`, `teens`, `tens`, `ordinals`, a `hundred` object, a `pattern` array, and `time`, `days`, `months` (the Bodo calendar) and `gregorianMonths` arrays (each `{ en, bo, rom }`), plus `notes`. Each numeral is `{ n, bo, rom }`.
- **Reading** — a record with `intro`, a `howTo` array, a `passages` array and a `writing`
  object. Each passage is `{ id, level, title, titleEn, text, rom, en, questions, note }`,
  where `text`, `rom` and `en` are parallel arrays of one paragraph each and each question is
  `{ q, qEn, a, aEn }`. `writing` holds `{ intro, table, notes }`.
- **Culture** — a record with `intro` and `sections`; each section has an `id`, `title` and a
  `body` array of paragraphs. Any Bodo term quoted in the prose must carry its
  romanisation.
- **Resources** — external references. Each item needs a `name`, a `href` and a `desc`; a
  resource entry has no `bo`/`rom` because it is not a Bodo term.

Because these modules are the newest, always open the existing file and match its exact
field names before appending. Consistency within a module matters more than any single
field naming choice.

## The romanisation convention

SikBodo uses one romanisation scheme throughout. The point of the `rom` field is to let a
learner who cannot yet read the Devanagari script approximate the sound, and — because
Bodo is tonal and the script does not mark tone — to fix the pronunciation in writing.

The key mappings to internalise:

> - **`w`** is the high central vowel /ɯ/ — the sound in नों *nwng* (you), जों *jwng* (we),
>   दै *dwi* (water). English has no equivalent; do not read it as a plain "w".
> - **`j`** is the sound /z/ (as in जा *ja*), **`y`** is /j/, and **`ph`, `th`, `kh`** are
>   the aspirated stops.
> - Bodo reads several Devanagari letters differently from Hindi: श, ष and स are all *s*,
>   and च and छ are also *s*; ज and य are *z*.

Additional conventions:

- Romanisation is lowercase and unaccented.
- Keep the mapping between `bo` and `rom` one-to-one in spirit: the romanisation should
  reflect what is written, not a different word.
- Do not silently "improve" the pronunciation of an existing entry. If a romanisation is
  wrong, fix it and say so in the commit message or pull request, with a source if you
  have one.

## Script and romanisation rule

Two rules are non-negotiable and are checked in review:

1. **Every Bodo string is written in the Devanagari script.** Not in the Latin script.
   Bodo has been written in Devanagari since 1975, and it is what learners meet in print.
2. **Every Bodo entry carries a romanisation.** A `bo` without a `rom` (or vice versa) is
   an incomplete record and will be sent back in review.

This applies to dictionary entries, phrases, dialogue lines, worked examples and any Bodo
term quoted inside prose.

## Accuracy policy

The platform's value depends on its content being trustworthy. The policy is deliberately
conservative:

- **Never invent Bodo.** If you do not know a form, do not guess one. An absent entry is
  better than a fabricated one.
- **Name the variety.** Bodo has several regional varieties (Eastern/Standard, Kamrupi,
  Goalpariya). Where a form is not the widely repeated one, say which region it comes from.
- **Prefer widely attested forms.** Where variants exist, use the form with the broadest
  documented use and record the variant in `note`.
- **Flag uncertainty explicitly.** When you are unsure of a form, spelling or register,
  say so in the `note` field rather than presenting it as settled. A visible caveat is
  honest; a confident error is not.
- **No claims of verification.** Do not describe content as "verified by a native
  speaker" or similar. This project does not claim native-speaker review anywhere, and
  contributors should not imply it.

If you are proposing a correction to existing content, describe what you changed and why
in the pull request, and cite a source if you have one.

## Editing workflow

1. Open the relevant file under `js/data/` and match the existing record shape exactly.
2. Add or edit your record. Keep `en`, `bo`, `rom` present and correct; add `cat` and
   `note` where the module uses them.
3. If you created a new module, register it in the merge in `js/data/index.js`.
4. Run the repository checks from the root:
   ```bash
   node tools/check-links.mjs
   node tools/build-sitemap.mjs
   ```
5. Open the affected page in a browser and confirm the new content renders, that the
   heading order is intact, and that the romanisation column is present.

## Review checklist

Before opening a pull request that changes content:

- [ ] Every new or edited Bodo string is in the Devanagari script.
- [ ] Every new or edited Bodo string has a matching romanisation.
- [ ] `x` is used for শ / ষ / স, `w` for ৱ, `r` for ৰ and `y` for য়.
- [ ] No Bodo form was invented; uncertain forms carry a `note`.
- [ ] No claim of native-speaker verification was added.
- [ ] The record shape matches the file it was added to.
- [ ] Any new module is merged in `js/data/index.js`.
- [ ] `node tools/check-links.mjs` passes.
- [ ] The page renders correctly with a coherent heading hierarchy.
