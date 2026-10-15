#!/usr/bin/env node
/**
 * Reports `t("...")` / `tp("...")` keys used in components that have no entry
 * in phrasesES, so untranslated copy is visible instead of silently falling
 * back to English.
 *
 *   node scripts/report-missing-phrases.mjs
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["app", "components"];
const PHRASES = "lib/i18n/phrases.es.ts";

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (/\.(ts|tsx)$/.test(full)) files.push(full);
  }
  return files;
}

// Existing keys: every string literal appearing as an object key in phrasesES.
const phraseSource = readFileSync(join(ROOT, PHRASES), "utf8");
// Keys sit on their own line, so anchor on line start and resolve escapes so
// `it\'s` on both sides compares equal.
const KEY_LINE = /^\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)')\s*:/gm;
// Call sites may spell punctuation either literally or as a \uXXXX escape, so
// normalize both sides. Only `\"`, `\'` and `\\` are real escapes to collapse.
const normalize = (raw) =>
  raw
    .replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\\(["'\\])/g, "$1");

const known = new Set(
  [...phraseSource.matchAll(KEY_LINE)].map((m) => normalize(m[1] ?? m[2])),
);

const CALL = /\b(?:t|tp)\(\s*"((?:[^"\\]|\\.)*)"/g;
const missing = new Map();

for (const dir of SCAN_DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const src = readFileSync(file, "utf8");
    for (const m of src.matchAll(CALL)) {
      const key = normalize(m[1]);
      // `t("nav.searchSite")` is a dictionary key, not a phrase-table entry.
      if (key.includes(".")) continue;
      if (known.has(key)) continue;
      if (!missing.has(key)) missing.set(key, []);
      missing.get(key).push(file.replace(`${ROOT}/`, ""));
    }
  }
}

if (missing.size === 0) {
  console.log("✓ every t()/tp() key has a Spanish entry");
  process.exit(0);
}

for (const [key, files] of [...missing].sort()) {
  console.log(`${key}\n    ${files.join("\n    ")}`);
}
console.log(`\n${missing.size} key(s) missing from phrasesES`);
