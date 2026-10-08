"use client";

import { useMemo } from "react";
import { useLocale } from "@/lib/i18n/locale-context";
import {
  getApplications,
  getArticles,
  getCategories,
  getConnectors,
  getPlans,
  getSecurityLayers,
} from "@/lib/i18n/data";
import { features as rawFeatures } from "@/data/features";
import { getFeatures } from "@/lib/i18n/features";
import { latestGeminiModels } from "@/data/geminiModels";

/**
 * Locale-aware data access for client components.
 *
 * Shared components previously imported `@/data/*` directly, which bypassed the
 * Spanish overlays entirely — so the Spanish routes rendered English data
 * copy. This hook funnels every consumer through the same accessors the server
 * pages use.
 */
export function useLocalizedData() {
  const { locale } = useLocale();

  return useMemo(
    () => ({
      locale,
      features: getFeatures(locale),
      applications: getApplications(locale),
      plans: getPlans(locale),
      connectors: getConnectors(locale),
      articles: getArticles(locale),
      categories: getCategories(locale),
      securityLayers: getSecurityLayers(locale),
      models: latestGeminiModels,
    }),
    [locale],
  );
}

export { rawFeatures };
