import { defaultLocale, type Locale } from "@/lib/i18n/config";

/**
 * Prefixes an internal href with the active locale, preserving query and hash.
 *
 * Deliberately kept free of React so it can be imported from both server and
 * client components (importing it from a `"use client"` module would make it
 * unusable during server rendering).
 */
export function localizeHref(locale: Locale, path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;

  const hashIndex = path.indexOf("#");
  const pathAndQuery = hashIndex === -1 ? path : path.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : path.slice(hashIndex);

  const normalized =
    locale === defaultLocale ? pathAndQuery : `/${locale}${pathAndQuery}`;

  return `${normalized}${hash}`;
}
