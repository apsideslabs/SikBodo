# Discoverability — what is done, and what only the owner can do

This document records the search-engine and AI-discovery setup for SikBodo, so
that nothing has to be reverse-engineered later.

## What the site already ships

- **Unique title and meta description** on every page.
- **Canonical URL** on every page.
- **Open Graph and Twitter card** tags, with `og:image` dimensions and alt text.
- **`robots` directive** on every page; `noindex` on `404.html`.
- **JSON-LD structured data** (`schema.org`) on every page: a `BreadcrumbList`
  plus a typed page entity — `WebSite` and `Organization` on the home page, and
  `Course`, `LearningResource`, `DefinedTermSet`, `Quiz`, `Article`,
  `CollectionPage`, `WebApplication` or `WebPage` elsewhere — each linked to the
  site and marked `inLanguage: en` and `about: Bodo (brx)`.
- **`sitemap.xml`** listing every page with `lastmod`, `changefreq` and
  `priority`; `robots.txt` points to it.
- **`llms.txt`** at the site root — a plain-language summary for AI crawlers and
  retrieval systems.
- **`robots.txt`** allows all crawlers, including AI crawlers (GPTBot,
  PerplexityBot, Google-Extended and the rest). Nothing blocks crawling.

## What is automated

- **`.github/workflows/indexnow.yml`** submits all 18 URLs to the **IndexNow**
  protocol (Bing, Yandex, Seznam, Naver) on every push to `main`, and can be run
  by hand from the Actions tab. It waits for GitHub Pages to publish the key
  file (`<key>.txt` at the site root) before submitting, so verification passes.

## What only the owner can do (needs a login or DNS)

These are the highest-impact remaining steps, and none of them can be done from
inside the repository:

1. **Google Search Console** — add `https://apsideslabs.github.io/SikBodo/` as a
   property, verify it, and submit `sitemap.xml`. This is the single fastest way
   to get the site indexed by Google.
2. **Bing Webmaster Tools** — same idea; also lets you confirm the IndexNow
   submissions are being received.
3. **A custom domain** (for example `sikbodo.org`) — a `github.io` project
   subdomain shares its reputation with every other GitHub Pages site, so a real
   domain is worth more than any on-page tweak.
4. **Backlinks** — the GitHub repository already links to the live site, but
   links from relevant places (a Wikidata item for the platform, community
   posts, language-resource directories) are what turn "indexed" into "ranked".

## Honest expectation

The site is new and has no backlinks yet, so it will not rank for competitive
terms like "learn Bodo" for a long time. A branded search for "SikBodo" should
surface it once Google and Bing have indexed it. AI assistants (ChatGPT, Gemini,
Perplexity, AI Overviews) draw on the same search indexes, so their coverage
will follow — and lag — the search engines'.
