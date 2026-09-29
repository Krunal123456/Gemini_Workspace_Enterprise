import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { phrasesES } from "@/lib/i18n/phrases.es";

/**
 * Sentence-level translation for page copy that still lives inline in the page
 * components.
 *
 * English is the source of truth, so the lookup is keyed by the English string
 * itself. An untranslated phrase returns the English original rather than
 * failing, which keeps partial translation safe.
 *
 * Server-safe: no React, so it can be called from server components.
 */
export function createPhraseTranslator(locale: Locale) {
  const table = locale === defaultLocale ? null : phrasesES;

  return function t(phrase: string, vars?: Record<string, string | number>): string {
    let out = table?.[phrase] ?? phrase;
    if (vars) {
      for (const [key, value] of Object.entries(vars)) {
        out = out.replaceAll(`{${key}}`, String(value));
      }
    }
    return out;
  };
}

export type PhraseTranslator = ReturnType<typeof createPhraseTranslator>;
