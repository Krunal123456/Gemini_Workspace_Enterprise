export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

/** Short label used in the compact switcher button. */
export const localeShortLabels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function htmlLang(locale: Locale): string {
  return locale === "es" ? "es-ES" : "en-US";
}

/** Strips a leading /en or /es segment, returning the rest of the pathname. */
export function stripLocaleFromPathname(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    return `/${segments.slice(1).join("/")}`;
  }
  return pathname;
}

/**
 * Resolves a `[locale]` route param to a supported Locale, falling back to the
 * default instead of throwing so a stale or mistyped URL still renders.
 */
export function resolveLocale(raw: string | undefined): Locale {
  return raw && isLocale(raw) ? raw : defaultLocale;
}
