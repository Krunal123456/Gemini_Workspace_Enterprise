import type { Feature } from "@/types";
import type { Locale } from "@/lib/i18n/config";
import type { FeatureTranslation } from "@/lib/i18n/localize";
import { localizeByKey } from "@/lib/i18n/localize";
import { features } from "@/data/features";
import { featuresES } from "@/data/translations/features.es";
import { featureProseES } from "@/data/translations/featureProse.es";
import { featureProseES2 } from "@/data/translations/featureProse2.es";
import { featureProseES3 } from "@/data/translations/featureProse3.es";
import { featureProseES4 } from "@/data/translations/featureProse4.es";
import { featureProseES5 } from "@/data/translations/featureProse5.es";
import { featureProseES6 } from "@/data/translations/featureProse6.es";

/**
 * Spanish copy is split across files by catalog section so translators can work
 * through it in batches. Merged here so `getFeatures` stays a single call.
 */
const FEATURE_TRANSLATION_BATCHES: Record<string, FeatureTranslation>[] = [
  featuresES,
  featureProseES,
  featureProseES2,
  featureProseES3,
  featureProseES4,
  featureProseES5,
  featureProseES6,
];

/**
 * Merges the per-slug overlays field by field.
 *
 * A shallow `{...a, ...b}` would drop the Spanish `name` whenever a prose batch
 * also defines an entry for the same slug, so the maps are combined one field
 * at a time instead.
 */
function mergeFeatureTranslations(
  locale: Locale,
): Record<string, FeatureTranslation> {
  if (locale === "en") return {};
  const merged: Record<string, FeatureTranslation> = {};
  for (const map of FEATURE_TRANSLATION_BATCHES) {
    for (const [slug, value] of Object.entries(map)) {
      merged[slug] = { ...merged[slug], ...value };
    }
  }
  return merged;
}

/**
 * Locale-aware accessor for the feature catalog.
 *
 * Feature records carry the bulk of user-visible copy (name, description,
 * whatItDoes, howItWorks), so they use the same overlay treatment as
 * apps/plans/connectors. `slug` is the stable key.
 */
export function getFeatures(locale: Locale): Feature[] {
  return localizeByKey(features, mergeFeatureTranslations(locale), locale, "slug");
}

export function getFeatureBySlug(slug: string, locale: Locale): Feature | undefined {
  return getFeatures(locale).find((feature) => feature.slug === slug);
}

export function getFeatureCount(): number {
  return features.length;
}
