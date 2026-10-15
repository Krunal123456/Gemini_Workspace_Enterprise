#!/usr/bin/env node
/**
 * Guards the translation files against corrupted characters.
 *
 * A bulk-rewrite pass in this project accidentally leaked CJK/Arabic/Cyrillic
 * fragments into Spanish strings, which is easy to miss in a 300-entry file.
 * This fails loudly instead.
 *
 *   node scripts/check-translations.mjs
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["data/translations", "lib/i18n"];
const SUSPECT = /[\u0400-\u04FF\u0600-\u06FF\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/;

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (/\.(ts|tsx)$/.test(full)) files.push(full);
  }
  return files;
}

let failures = 0;

for (const root of ROOTS) {
  for (const file of walk(root)) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (SUSPECT.test(line)) {
        failures++;
        console.error(`${file}:${i + 1}  ${line.trim().slice(0, 100)}`);
      }
    });
  }
}

if (failures > 0) {
  console.error(`\n✗ ${failures} line(s) contain non-Latin characters.`);
  process.exit(1);
}
console.log("✓ translation files contain no stray non-Latin characters");
