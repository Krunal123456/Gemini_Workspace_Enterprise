#!/usr/bin/env node
/**
 * verify-rendered — run the mechanical half of Decision Pipeline step 12
 * against a rendered page, in light and dark, at 390px and 1280px.
 *
 *   node scripts/verify-rendered.mjs <url> [--json] [--width 390,1280]
 *
 * Exits 1 when any check fails, so it can gate a deploy. The checks are the
 * scriptable subset of references/live-audit-snippets.md and Quality Gates 3–7;
 * the judgement-based ones (state coverage, hierarchy, copy) stay with the
 * reviewer.
 *
 * Requires Playwright, which ships with the browsers it drives:
 *   npx playwright install chromium
 */

import { chromium } from "playwright";

const HELP = `usage: node scripts/verify-rendered.mjs <url> [--json] [--width 390,1280]`;

// 44x44 CSS px is the Gate 5 minimum; 390px is the Gate 5 base viewport.
const MIN_TOUCH_TARGET = 44;
const DEFAULT_WIDTHS = [390, 1280];
const VIEWPORT_HEIGHT = 900;

function parseArgs(argv) {
  const args = { url: null, json: false, widths: DEFAULT_WIDTHS };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--json") args.json = true;
    else if (a === "--width") {
      const raw = argv[++i] || "";
      const ns = raw.split(",").map((n) => parseInt(n.trim(), 10)).filter(Number.isFinite);
      if (!ns.length) throw new Error(`--width needs numbers, got "${raw}"`);
      args.widths = ns;
    } else if (a === "-h" || a === "--help") args.help = true;
    else if (!args.url) args.url = a;
  }
  return args;
}

/** Runs in the page. Returns findings only — never mutates the document. */
function auditInPage(minTarget) {
  const out = {
    scrollWidth: document.documentElement.scrollWidth,
    invisibleText: [],
    smallTargets: [],
    imagesWithoutSize: [],
    viewportUnits: [],
    rawColorLiterals: [],
    rootTokens: {},
    tokenConflicts: [],
  };

  const label = (el) => {
    const id = el.id ? `#${el.id}` : "";
    const cls = typeof el.className === "string" && el.className
      ? `.${el.className.trim().split(/\s+/).slice(0, 2).join(".")}`
      : "";
    return `${el.tagName.toLowerCase()}${id}${cls}`;
  };

  // rgb(0, 0, 0) is opaque black; only a 4-argument rgba with alpha 0 is
  // transparent. Matching "ends in 0" would flag every black element.
  const isTransparent = (value) => {
    const m = /^rgba\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*([\d.]+)\s*\)$/.exec((value || "").trim());
    return !!m && parseFloat(m[1]) === 0;
  };
  const NON_VISUAL = new Set(["HTML", "HEAD", "TITLE", "META", "LINK", "SCRIPT", "STYLE", "BASE", "NOSCRIPT"]);

  for (const el of document.body ? document.body.querySelectorAll("*") : []) {
    if (NON_VISUAL.has(el.tagName)) continue;
    const cs = getComputedStyle(el);

    // Transparent text-fill silently overrides `color` — the dark-mode
    // invisible-heading failure that passes every static contrast check.
    const fill = cs.webkitTextFillColor || cs.getPropertyValue("-webkit-text-fill-color");
    // Only leaf text counts: a wrapper inherits the property from its child's
    // rule and would double-report the same defect.
    const ownText = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join("");
    if (isTransparent(fill) && ownText) {
      const painted = cs.backgroundImage && cs.backgroundImage !== "none";
      if (!painted && out.invisibleText.length < 20) out.invisibleText.push(label(el));
    }
  }

  const interactive = "a[href], button, input, select, textarea, [role=button], [tabindex]:not([tabindex='-1'])";
  for (const el of document.querySelectorAll(interactive)) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue; // not rendered
    if ((r.width < minTarget || r.height < minTarget) && out.smallTargets.length < 20) {
      out.smallTargets.push(`${label(el)} ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
  }

  for (const img of document.querySelectorAll("img")) {
    if ((!img.getAttribute("width") || !img.getAttribute("height")) && out.imagesWithoutSize.length < 20) {
      out.imagesWithoutSize.push(label(img) + " " + (img.currentSrc || img.src || "").slice(-60));
    }
  }

  // OKLCH-only is Gate 3. Cross-origin sheets throw on cssRules; skip those
  // rather than fail the whole run.
  // A token redefined under a different media condition is correct responsive
  // practice, not a conflict, so the walk carries the condition down with it and
  // only compares values within one context. Note that in Chromium every
  // CSSStyleRule also exposes a cssRules list for nested CSS, so "has cssRules"
  // cannot be used to recognise a grouping rule.
  const walkRules = (rules, condition) => {
    for (const rule of rules) {
      const kind = rule.constructor.name;
      if (kind === "CSSMediaRule" || kind === "CSSSupportsRule") {
        walkRules(rule.cssRules, rule.conditionText || condition);
        continue;
      }
      if (kind !== "CSSStyleRule") continue;

      const text = rule.cssText || "";
      const hit = text.match(/(?:^|[\s:(])(#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\))/);
      if (hit && out.rawColorLiterals.length < 20) {
        out.rawColorLiterals.push(text.slice(0, 90));
      }

      // A custom property declared twice with different values in the same
      // context leaves the system without a single source of truth. That is the
      // Gate 3 defect; which notation a value happens to use is not.
      if (text.startsWith(":root")) {
        for (const d of text.matchAll(/(--[\w-]+)\s*:\s*([^;}]+)/g)) {
          const key = (condition || "") + "|" + d[1];
          const value = d[2].trim();
          if (out.rootTokens[key] === undefined) {
            out.rootTokens[key] = value;
          } else if (out.rootTokens[key] !== value && out.tokenConflicts.length < 20) {
            const where = condition ? ` under ${condition}` : "";
            out.tokenConflicts.push(`${d[1]}${where}: ${out.rootTokens[key]} vs ${value}`);
          }
        }
      }

      // Computed styles resolve vh to px, so vh is only visible in the
      // authored rule text.
      if (/\b(?:min-)?height\s*:\s*[\d.]+vh\b/.test(text) && out.viewportUnits.length < 20) {
        out.viewportUnits.push(text.slice(0, 90));
      }
    }
  };

  for (const sheet of document.styleSheets) {
    try {
      walkRules(sheet.cssRules, null);
    } catch {
      // cross-origin stylesheet: nothing readable here
    }
  }

  return out;
}

const CHECKS = [
  {
    key: "horizontal-overflow",
    gate: "Gate 5",
    hard: true,
    run: (r, width) => (r.scrollWidth > width
      ? `page scrolls to ${r.scrollWidth}px in a ${width}px viewport`
      : null),
  },
  {
    key: "invisible-text",
    gate: "Gate 6",
    hard: true,
    run: (r) => (r.invisibleText.length
      ? `${r.invisibleText.length} element(s) with transparent text-fill and no paint behind it: ${r.invisibleText.slice(0, 3).join(", ")}`
      : null),
  },
  {
    key: "touch-targets",
    gate: "Gate 5",
    hard: true,
    run: (r, width) => (width <= 480 && r.smallTargets.length
      ? `${r.smallTargets.length} interactive element(s) under ${MIN_TOUCH_TARGET}px: ${r.smallTargets.slice(0, 3).join(", ")}`
      : null),
  },
  {
    key: "image-dimensions",
    gate: "Gate 7",
    hard: false,
    run: (r) => (r.imagesWithoutSize.length
      ? `${r.imagesWithoutSize.length} image(s) without width/height — CLS risk`
      : null),
  },
  {
    key: "viewport-units",
    gate: "Gate 5",
    hard: false,
    run: (r) => (r.viewportUnits.length
      ? `${r.viewportUnits.length} element(s) sized in vh instead of dvh: ${r.viewportUnits.slice(0, 3).join(", ")}`
      : null),
  },
  {
    key: "token-conflict",
    gate: "Gate 3",
    hard: true,
    run: (r) => (r.tokenConflicts.length
      ? `${r.tokenConflicts.length} custom propert(ies) declared twice with different values: `
        + r.tokenConflicts.slice(0, 3).join("; ")
      : null),
  },
  {
    key: "raw-color-literals",
    gate: "Gate 3",
    hard: false,
    run: (r) => (r.rawColorLiterals.length
      ? `${r.rawColorLiterals.length} rule(s) hold a colour literal rather than a token — confirm each is a stated exception, not drift`
      : null),
  },
];

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.url) {
    console.log(HELP);
    process.exit(args.url ? 0 : 2);
  }

  let browser;
  try {
    browser = await chromium.launch();
  } catch (err) {
    console.error(`Could not launch Chromium: ${err.message}`);
    console.error("Install it once with: npx playwright install chromium");
    process.exit(2);
  }

  const findings = [];
  try {
    for (const scheme of ["light", "dark"]) {
      for (const width of args.widths) {
        const context = await browser.newContext({
          viewport: { width, height: VIEWPORT_HEIGHT },
          colorScheme: scheme,
        });
        const page = await context.newPage();
        try {
          await page.goto(args.url, { waitUntil: "networkidle", timeout: 30000 });
        } catch (err) {
          findings.push({ mode: `${scheme}/${width}`, key: "load", gate: "-", hard: true, message: `page did not load: ${err.message}` });
          await context.close();
          continue;
        }
        const raw = await page.evaluate(auditInPage, MIN_TOUCH_TARGET);
        for (const check of CHECKS) {
          const message = check.run(raw, width);
          if (message) {
            findings.push({ mode: `${scheme}/${width}`, key: check.key, gate: check.gate, hard: check.hard, message });
          }
        }
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  const failed = findings.filter((f) => f.hard);
  const warned = findings.filter((f) => !f.hard);

  if (args.json) {
    console.log(JSON.stringify({ url: args.url, failed, warned }, null, 2));
  } else {
    console.log(`\nverify-rendered — ${args.url}\n`);
    if (!findings.length) console.log("  all checks passed in light and dark");
    for (const f of failed) console.log(`  FAIL [${f.mode}] ${f.gate} ${f.key}: ${f.message}`);
    for (const f of warned) console.log(`  WARN [${f.mode}] ${f.gate} ${f.key}: ${f.message}`);
    console.log(`\n  ${failed.length} failed, ${warned.length} warnings`);
  }

  process.exit(failed.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err.stack || String(err));
  process.exit(2);
});
