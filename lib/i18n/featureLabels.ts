import { defaultLocale, type Locale } from "@/lib/i18n/config";

/**
 * Display labels for the `enterpriseAvailability` enum.
 *
 * The raw values ("enterprise-only", "add-on", "all", "plus", "standard") are
 * logic keys stored in `data/features.ts` and must never be translated in
 * place, so both the feature detail page and FeatureCard render them through
 * this lookup instead.
 */
type AvailabilityLabels = Record<Locale, Record<string, string>>;

const LABELS: AvailabilityLabels = {
  en: {
    "enterprise-only": "Enterprise Only",
    "add-on": "Available with Add-on",
    "all": "All Plans",
    plus: "Plus Plans Only",
    standard: "Standard & Up",
  },
  es: {    "enterprise-only": "Solo empresas",
    "add-on": "Disponible con complemento",
    all: "Todos los planes",
    plus: "Solo planes Plus",
    standard: "Standard e superiores",
  },
};

export function formatEnterpriseAvailability(
  value: string,
  locale: Locale,
): string {
  const table = LABELS[locale] ?? LABELS[defaultLocale];
  return table[value] ?? value;
}
