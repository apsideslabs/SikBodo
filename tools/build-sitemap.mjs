#!/usr/bin/env node
/**
 * tools/build-sitemap.mjs
 *
 * Generates sitemap.xml at the repository root from the top-level .html files.
 *
 * Run from the repository root:
 *
 *     node tools/build-sitemap.mjs
 *
 * For each page it reads the <title> and the <meta name="description"> and records the
 * file's modification time as <lastmod> (YYYY-MM-DD, UTC).
 *
 * Note on shape: the sitemap protocol (sitemaps.org) defines only loc, lastmod,
 * changefreq and priority inside <url>. There is no title or description element, so
 * those values are emitted as XML comments within each <url> entry. This keeps the
 * document schema-valid while preserving the metadata for anyone reading the file.
 *
 * 404.html is excluded: it must never be indexed.
 *
 * Uses only node:fs and node:path.
 */

import fs from 'node:fs';
import path from 'node:path';

/** Canonical site base URL. Every <loc> is built from this. */
const BASE_URL = 'https://apsideslabs.github.io/SikBodo/';

/** Pages that must never appear in the sitemap. */
const EXCLUDED = new Set(['404.html']);

const NAMED_ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  mdash: '\u2014',
  ndash: '\u2013',
  hellip: '\u2026',
  lsquo: '\u2018',
  rsquo: '\u2019',
  ldquo: '\u201C',
  rdquo: '\u201D',
  copy: '\u00A9',
  reg: '\u00AE',
  trade: '\u2122',
  middot: '\u00B7',
  deg: '\u00B0',
  times: '\u00D7',
};

/**
 * Walk up from `startDir` until a directory containing index.html is found.
 * Falls back to `startDir` if no such directory exists.
 * @param {string} startDir
 * @returns {string} absolute path to the repository root
 */
function findRepoRoot(startDir) {
  const fallback = path.resolve(startDir);
  let dir = fallback;
  for (;;) {
    if (fs.existsSync(path.join(dir, 'index.html'))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return fallback;
    dir = parent;
  }
}

/**
 * Decode the handful of HTML entities that realistically appear in titles and
 * meta descriptions, including numeric character references.
 * @param {string} input
 * @returns {string}
 */
function decodeEntities(input) {
  return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (whole, body) => {
    if (body[0] === '#') {
      const isHex = body[1] === 'x' || body[1] === 'X';
      const code = Number.parseInt(body.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      if (!Number.isFinite(code)) return whole;
      try {
        return String.fromCodePoint(code);
      } catch {
        return whole;
      }
    }
    const named = NAMED_ENTITIES[body.toLowerCase()];
    return named === undefined ? whole : named;
  });
}

/**
 * Read the document <title>, collapsing whitespace.
 * @param {string} html
 * @returns {string}
 */
function readTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match) return '';
  return decodeEntities(match[1].replace(/\s+/g, ' ').trim());
}

/**
 * Read a <meta name="..." content="..."> value, tolerating either quote style and
 * any attribute order within the tag.
 * @param {string} html
 * @param {string} name lower-case meta name, e.g. "description"
 * @returns {string}
 */
function readMeta(html, name) {
  const metaRe = /<meta\b[^>]*>/gi;
  let match;
  while ((match = metaRe.exec(html)) !== null) {
    const tag = match[0];
    const nameMatch = tag.match(/\bname\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
    if (!nameMatch) continue;
    const attrName = (nameMatch[1] ?? nameMatch[2] ?? '').toLowerCase();
    if (attrName !== name) continue;
    const contentMatch = tag.match(/\bcontent\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
    if (!contentMatch) return '';
    return decodeEntities((contentMatch[1] ?? contentMatch[2] ?? '').replace(/\s+/g, ' ').trim());
  }
  return '';
}

/** Format a Date as YYYY-MM-DD in UTC. */
function formatDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Escape a string for use in XML character data. */
function xmlEscape(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Make a string safe to embed inside an XML comment. */
function commentSafe(value) {
  return value.replace(/--/g, '- -').replace(/[\r\n]+/g, ' ').trim();
}

function main() {
  const root = findRepoRoot(process.cwd());

  const pages = fs
    .readdirSync(root)
    .filter((name) => name.toLowerCase().endsWith('.html') && !EXCLUDED.has(name))
    .sort((a, b) => {
      if (a === 'index.html') return -1;
      if (b === 'index.html') return 1;
      return a.localeCompare(b);
    });

  if (pages.length === 0) {
    console.error('build-sitemap: no .html files found at the repository root.');
    process.exit(1);
  }

  const entries = pages.map((name) => {
    const full = path.join(root, name);
    const html = fs.readFileSync(full, 'utf8');
    return {
      loc: name === 'index.html' ? BASE_URL : BASE_URL + name,
      lastmod: formatDate(fs.statSync(full).mtime),
      title: readTitle(html),
      description: readMeta(html, 'description'),
    };
  });

  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  for (const entry of entries) {
    lines.push('  <url>');
    lines.push(`    <loc>${xmlEscape(entry.loc)}</loc>`);
    lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    const meta = [entry.title, entry.description].filter(Boolean).join(' - ');
    if (meta !== '') lines.push(`    <!-- ${commentSafe(meta)} -->`);
    lines.push('  </url>');
  }
  lines.push('</urlset>');
  lines.push('');

  const outFile = path.join(root, 'sitemap.xml');
  fs.writeFileSync(outFile, lines.join('\n'), 'utf8');

  console.log(`build-sitemap: wrote ${entries.length} URL(s) to sitemap.xml`);
}

main();
