# Contributing to SikBodo

Thank you for considering a contribution. This project exists to make Bodo learnable, and the most
valuable contributions come from **speakers and teachers of Bodo** — corrections, dialect notes and
missing vocabulary.

By taking part you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md).

---

## The most useful contribution: a correction

If a word, phrase or translation is wrong, please
[open an issue](https://github.com/apsideslabs/SikBodo/issues/new?template=bug_report.md) with:

1. the **page and entry** (for example, "Dictionary → Water");
2. what is currently shown;
3. what it should be, **in Devanagari script**, with a romanisation if you have one;
4. your **dialect or region** — Bodo varies across the Bodoland region and beyond (Kokrajhar,
   Baksa, Chirang, Udalguri, Bongaigaon and elsewhere), and a form that is standard in one area
   can differ in another;
5. a source, or a note that you are a speaker, if you are comfortable saying so.

You do not need to write any code to contribute this.

---

## Working on the code

### Setup

There is no build step and no dependency installation. Clone the repository and open a file.

```bash
git clone https://github.com/apsideslabs/SikBodo.git
cd SikBodo
python3 -m http.server 8000     # optional, but recommended for clipboard features
```

### Before you open a pull request

```bash
node tools/check-links.mjs      # every internal link must resolve
node tools/build-sitemap.mjs    # run this only if you added or renamed a page
node --check js/<file>.js       # syntax-check every JavaScript file you touched
```

CI runs the same checks, plus an HTML skeleton validation and a secret scan. A pull request that fails
CI will not be reviewed until it passes.

---

## Rules for content

These are enforced in review, because they are what keep the platform trustworthy.

| Rule | Why |
|---|---|
| **Every Bodo string is Devanagari script** | It is the official script and the one learners will meet in print. |
| **Every Bodo string carries a romanisation** | Devanagari script does not represent Bodo's sound system exactly; learners need both. |
| **`w` is the vowel /ɯ/** | In this project's romanisation, `w` is the high central vowel /ɯ/ (as in नों *nwng*, जों *jwng*, दै *dwi*), `j` is the sound /z/, `y` is /j/, and `ph`, `th`, `kh` are the aspirated stops. |
| **Never invent a form** | If you are unsure, say so in a `note` field or in the page text. A flagged gap is better than a confident error. |
| **Name your variety** | Bodo has several dialects. Say which one a form comes from when it is not the widely repeated one. |
| **No emoji** | The project uses the Lucide SVG sprite in `assets/icons.svg`. Emoji render inconsistently and carry no weight. |
| **No new runtime dependencies** | No npm packages, no CDNs, no web fonts fetched at runtime. See the constraints table in the README. |

The full field-by-field reference for every content type is in
[`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md).

---

## Accessibility is not optional

Any interface change must preserve:

- one `<h1>` per page, with headings in a descending, unbroken order;
- a visible focus state on every interactive element;
- keyboard operation of everything, including the display panel (`Esc` closes it);
- WCAG 2.1 AA contrast (4.5:1 for body text);
- a minimum text size of `1rem`.

See [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md) for the manual test checklist.

---

## Pull requests

- One logical change per pull request.
- Describe **what** changed and **why**, using the pull request template.
- Include before/after screenshots for anything visual.
- Reference the issue it closes, if there is one.

## Commit messages

Short imperative subject, then a blank line and an explanation of the reasoning if it is not obvious.

```
Add the dative suffix example to the grammar reference

The case table listed -loi without an example, which made it hard to
distinguish from the locative -t for learners.
```

## Releasing

There is no build step, so a release is a version bump plus a changelog entry. Because the
version is written by hand in three places, **bump all three together** — CI fails if they
disagree:

| File | What to change |
| --- | --- |
| `js/data/meta.js` | `"version"` |
| `version.json` | `"version"` |
| `sw.js` | `const VERSION` (this also names the cache, so a bump is what makes the browser notice a new release) |

Then add a `CHANGELOG.md` entry, push, and publish a release tag matching the version
(`v1.2.0`). The installed app will pick the new version up through the update notice.

## Licence

By contributing, you agree that your contribution is licensed under the
[MIT Licence](LICENSE) that covers this project.
