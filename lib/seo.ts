import {
  defaultLocale,
  htmlLang,
  locales,
  type Locale,
} from "@/lib/i18n/config";

export function localizedAlternates(pathname: string, locale: Locale) {
  const cleanPath = `/${pathname.split("/").filter(Boolean).join("/")}`.replace(/\/$/, "");
  const pathForLocale = (targetLocale: Locale) => {
    const localePrefix = targetLocale === defaultLocale ? "" : `/${targetLocale}`;
    return `${localePrefix}${cleanPath}` || "/";
  };

  return {
    canonical: pathForLocale(locale),
    languages: {
      ...Object.fromEntries(
        locales.map((targetLocale) => [htmlLang(targetLocale), pathForLocale(targetLocale)]),
      ),
      "x-default": pathForLocale(defaultLocale),
    },
  };
}