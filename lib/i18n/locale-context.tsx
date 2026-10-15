"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  defaultLocale,
  htmlLang,
  localeLabels,
  localeShortLabels,
  locales,
  stripLocaleFromPathname,
  type Locale,
} from "@/lib/i18n/config";
import { localizeHref } from "@/lib/i18n/href";
import { createPhraseTranslator, type PhraseTranslator } from "@/lib/i18n/translate";
export type Translate = (key: TranslationKey) => string;

export type TranslationKey =
  | "nav.features"
  | "nav.models"
  | "nav.compare"
  | "nav.pricing"
  | "nav.enterprise"
  | "nav.security"
  | "nav.articles"
  | "nav.apps"
  | "nav.search"
  | "nav.searchSite"
  | "nav.toggleMenu"
  | "nav.menu.searchPlaceholder"
  | "nav.menu.theme"
  | "nav.getStarted"
  | "nav.plans"
  | "common.viewAll"
  | "common.readMore"
  | "common.readTime"
  | "common.learnMore"
  | "common.loading"
  | "common.search"
  | "common.close";

type LocaleContextValue = {
  locale: Locale;
  locales: readonly Locale[];
  defaultLocale: Locale;
  labels: Record<Locale, string>;
  shortLabels: Record<Locale, string>;
  htmlLang: string;
  setLocale: (next: Locale) => void;
  /** Prefixes an internal href with the active locale, preserving query/hash. */
  href: (path: string) => string;
  t: Translate;
  /**
   * Sentence-level translation for inline copy. Keyed by the exact English
   * source string, so English inline literals stay the source of truth and
   * untranslated strings simply fall through unchanged.
   */
  tp: PhraseTranslator;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value = useMemo<LocaleContextValue>(() => {
    const setLocale = (next: Locale) => {
      // Explicitly set cookie so immediate request and server middleware reflect the new language
      document.cookie = `site-locale=${next}; path=/; max-age=31536000; SameSite=Lax`;
      const { pathname, search, hash } = window.location;
      const cleanPath = stripLocaleFromPathname(pathname) || "/";
      let targetPath: string;
      if (next === defaultLocale) {
        targetPath = cleanPath;
      } else {
        targetPath = cleanPath === "/" ? `/${next}` : `/${next}${cleanPath}`;
      }
      window.location.href = `${targetPath}${search}${hash}`;
    };

    const href = (path: string) => localizeHref(locale, path);

    return {
      locale,
      locales,
      defaultLocale,
      labels: localeLabels,
      shortLabels: localeShortLabels,
      htmlLang: htmlLang(locale),
      setLocale,
      href,
      t: (key) => translate(key, locale),
      tp: createPhraseTranslator(locale),
    };
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}


export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (context) return context;
  return createFallbackValue(defaultLocale);
}

/** Server-safe value builder — no React context required. */
export function createLocaleValue(locale: Locale): LocaleContextValue {
  return createFallbackValue(locale);
}

function createFallbackValue(locale: Locale): LocaleContextValue {
  return {
    locale,
    locales,
    defaultLocale,
    labels: localeLabels,
    shortLabels: localeShortLabels,
    htmlLang: htmlLang(locale),
    setLocale: () => {},
    href: (path: string) => localizeHref(locale, path),
    t: (key) => translate(key, locale),
    tp: createPhraseTranslator(locale),
  };
}

const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    "nav.features": "Features",
    "nav.models": "Models",
    "nav.compare": "Compare",
    "nav.pricing": "Pricing",
    "nav.enterprise": "Enterprise",
    "nav.security": "Security",
    "nav.articles": "Articles",
    "nav.apps": "Apps",
    "nav.search": "Search",
    "nav.searchSite": "Search the site",
    "nav.toggleMenu": "Toggle mobile menu",
    "nav.menu.searchPlaceholder": "Search...",
    "nav.menu.theme": "Theme",
    "nav.getStarted": "Get Started",
    "nav.plans": "Plans",
    "common.viewAll": "View all",
    "common.readMore": "Read more",
    "common.readTime": "min read",
    "common.learnMore": "Learn more",
    "common.loading": "Loading...",
    "common.search": "Search",
    "common.close": "Close",
  },
  es: {
    "nav.features": "Funciones",
    "nav.models": "Modelos",
    "nav.compare": "Comparar",
    "nav.pricing": "Precios",
    "nav.enterprise": "Empresas",
    "nav.security": "Seguridad",
    "nav.articles": "Artículos",
    "nav.apps": "Apps",
    "nav.search": "Buscar",
    "nav.searchSite": "Buscar en el sitio",
    "nav.toggleMenu": "Alternar menú móvil",
    "nav.menu.searchPlaceholder": "Buscar...",
    "nav.menu.theme": "Tema",
    "nav.getStarted": "Empezar",
    "nav.plans": "Planes",
    "common.viewAll": "Ver todo",
    "common.readMore": "Leer más",
    "common.readTime": "min de lectura",
    "common.learnMore": "Saber más",
    "common.loading": "Cargando...",
    "common.search": "Buscar",
    "common.close": "Cerrar",
  },
};

export function translate(key: TranslationKey, locale: Locale): string {
  return translations[locale]?.[key] ?? translations[defaultLocale][key] ?? key;
}
