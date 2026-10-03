#!/usr/bin/env node
/**
 * tools/check-links.mjs
 *
 * Dependency-free internal link checker for the SikBodo static site.
 *
 * Run from the repository root:
 *
 *     node tools/check-links.mjs
 *
 * What it does:
 *   1. Finds the repository root by walking up from this script's own location
 *      until it finds a directory that contains index.html.
 *   2. Recursively collects every .html file (skipping .git and node_modules).
 *   3. Extracts every href="..." and src="..." attribute value.
 *   4. Ignores non-local targets: absolute URLs (any scheme such as http:, https:,
 *      mailto:, tel:, data:, javascript:), protocol-relative //host targets, and
 *      same-page "#anchor" targets. A bare "?query" with no path is also ignored.
 *   5. Resolves each remaining local target relative to the file that referenced it
 *      (root-absolute "/path" targets resolve against the repository root) and checks
 *      that it exists on disk. A link to a directory must resolve to a directory that
 *      contains an index.html.
 *   6. Checks that every page in the canonical navigation set (PAGE_INVENTORY, which
 *      mirrors the navigation built by js/ui/chrome.js) exists at the root.
 *
 * Exit status: 0 when everything resolves, 1 when any problem is found.
 *
 * Uses only node:fs, node:path and node:url.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Directories that are never scanned for HTML. */
const SKIP_DIRS = new Set(['.git', 'node_modules']);

/**
 * The canonical page set. This mirrors the navigation that js/ui/chrome.js builds,
 * so a page missing from here means a navigation link points at nothing.
 */
const PAGE_INVENTORY = [
  'index.html',
  'lessons.html',
  'script.html',
  'progress.html',
  'grammar.html',
  'verbs.html',
  'numbers.html',
  'dictionary.html',
  'idioms.html',
  'phrases.html',
  'conversations.html',
  'reading.html',
  'culture.html',
  'quiz.html',
  'translator.html',
  'resources.html',
  'contribute.html',
  'about.html',
  '404.html',
];

/** Matches href="..." / src="..." in either quote style. */
const ATTR_RE = /\b(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;

/** Any scheme ("http:", "mailto:", ...) or a protocol-relative "//host" target. */
const NON_LOCAL_RE = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/**
 * Walk up from `startDir` until a directory containing index.html is found.
 * @param {string} startDir
 * @returns {string} absolute path to the repository root
 */
function findRepoRoot(startDir) {
  let dir = path.resolve(startDir);
  for (;;) {
    if (fs.existsSync(path.join(dir, 'index.html'))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error(
        `Could not find the repository root: no index.html in any ancestor of ${startDir}`,
      );
    }
    dir = parent;
  }
}

/**
 * Recursively collect .html files under `root`.
 * @param {string} root
 * @returns {string[]} sorted absolute paths
 */
function collectHtmlFiles(root) {
  const found = [];
  const stack = [root];
  while (stack.length > 0) {
    const dir = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      continue; // unreadable directory: skip rather than crash
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name)) continue;
        stack.push(full);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
        found.push(full);
      }
    }
  }
  return found.sort();
}

/**
 * Extract every href/src attribute value from an HTML string.
 * @param {string} html
 * @returns {string[]}
 */
function extractTargets(html) {
  const targets = [];
  let match;
  ATTR_RE.lastIndex = 0;
  while ((match = ATTR_RE.exec(html)) !== null) {
    targets.push(match[1] ?? match[2] ?? '');
  }
  return targets;
}

/**
 * Decide whether a raw attribute value should be skipped entirely.
 * @param {string} raw
 * @returns {boolean}
 */
function isIgnorable(raw) {
  const value = raw.trim();
  if (value === '') return true;
  if (value.startsWith('#')) return true; // same-page anchor
  if (NON_LOCAL_RE.test(value)) return true; // absolute or non-local
  return false;
}

/**
 * Resolve a local target to an absolute filesystem path.
 * @param {string} refFile absolute path of the file containing the reference
 * @param {string} raw the raw attribute value
 * @param {string} root repository root (for root-absolute "/path" targets)
 * @returns {string|null} absolute path, or null if there is no path component
 */
function resolveLocal(refFile, raw, root) {
  const withoutQuery = raw.trim().split(/[?#]/, 1)[0];
  if (withoutQuery === '') return null; // e.g. "?q=..." with no path
  let decoded = withoutQuery;
  try {
    decoded = decodeURIComponent(withoutQuery);
  } catch {
    // Leave malformed percent-escapes as-is; the existence check will report them.
  }
  if (decoded.startsWith('/')) {
    return path.resolve(root, decoded.replace(/^\/+/, ''));
  }
  return path.resolve(path.dirname(refFile), decoded);
}

/** Render a path relative to the root for reporting. */
function rel(root, target) {
  const value = path.relative(root, target);
  return value === '' ? '.' : value;
}

function main() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const root = findRepoRoot(scriptDir);

  const htmlFiles = collectHtmlFiles(root);
  const problems = [];
  let checked = 0;

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const source = rel(root, file);
    for (const raw of extractTargets(html)) {
      if (isIgnorable(raw)) continue;
      const target = resolveLocal(file, raw, root);
      if (target === null) continue;
      checked += 1;
      const shown = raw.trim();

      if (!fs.existsSync(target)) {
        problems.push(`${source}: "${shown}" -> missing ${rel(root, target)}`);
        continue;
      }
      if (fs.statSync(target).isDirectory() && !fs.existsSync(path.join(target, 'index.html'))) {
        problems.push(
          `${source}: "${shown}" -> directory without index.html (${rel(root, target)})`,
        );
      }
    }
  }

  // Canonical navigation set.
  for (const page of PAGE_INVENTORY) {
    if (!fs.existsSync(path.join(root, page))) {
      problems.push(`navigation: canonical page "${page}" is missing from the repository root`);
    }
  }

  console.log(
    `check-links: scanned ${htmlFiles.length} HTML file(s), checked ${checked} local link(s).`,
  );

  if (problems.length > 0) {
    console.error(`\ncheck-links: ${problems.length} broken reference(s):\n`);
    for (const problem of problems) console.error(`  - ${problem}`);
    console.error('\ncheck-links: FAILED');
    process.exit(1);
  }

  console.log('check-links: OK - all local links resolve.');
  process.exit(0);
}

main();
