import type { Locale } from "@/lib/i18n/config";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { localizeAll, localizeArticles, localizeByKey } from "@/lib/i18n/localize";

import { applications } from "@/data/apps";
import { articles } from "@/data/articles";
import { categories } from "@/data/categories";
import { connectors } from "@/data/connectors";
import { plans } from "@/data/plans";
import { securityLayers } from "@/data/security";

import { appsES } from "@/data/translations/apps.es";
import { articlesES } from "@/data/translations/articles.es";
import { connectorsES } from "@/data/translations/connectors.es";
import { plansES } from "@/data/translations/plans.es";
import { planCoreCapabilityPhrasesES } from "@/data/translations/planCapabilities.es";
import type { Plan } from "@/types";
import { categoriesES, securityLayersES } from "@/data/translations/security.es";

/**
 * Locale-aware data accessors.
 *
 * English data files remain the single source of truth for structure and logic
 * values (ids, slugs, categories, statuses). Spanish is applied as an overlay
 * at read time, so no page needs to branch on the locale for content.
 */

export function getApplications(locale: Locale) {
  return localizeAll(applications, appsES, locale);
}

export function getApplicationBySlug(slug: string, locale: Locale) {
  return getApplications(locale).find((app) => app.slug === slug);
}

export function getPlans(locale: Locale) {
  const localized = localizeAll(plans, plansES, locale);
  if (locale === "en") return localized;
  return localized.map((plan) => ({
    ...plan,
    coreCapabilities: Object.fromEntries(
      Object.entries(plan.coreCapabilities).map(([key, value]) => [
        key,
        planCoreCapabilityPhrasesES[value] ?? value,
      ]),
    ) as Plan["coreCapabilities"],
  }));
}

export function getPlanBySlug(slug: string, locale: Locale) {
  return getPlans(locale).find((plan) => plan.slug === slug);
}

export function getConnectors(locale: Locale) {
  return localizeAll(connectors, connectorsES, locale);
}

export function getConnectorBySlug(slug: string, locale: Locale) {
  return getConnectors(locale).find((connector) => connector.id === slug);
}

export function getSecurityLayers(locale: Locale) {
  return localizeAll(securityLayers, securityLayersES, locale);
}

export function getCategories(locale: Locale) {
  return localizeAll(categories, categoriesES, locale);
}

export function getArticles(locale: Locale) {
  return localizeArticles(articles, articlesES, locale);
}

export function getArticleBySlug(slug: string, locale: Locale) {
  return getArticles(locale).find((article) => article.slug === slug);
}

export function getCategoryById(id: string, locale: Locale) {
  return getCategories(locale).find((category) => category.id === id);
}

/** Raw, unlocalized counts used for metrics that must not shift with locale. */
export const counts = {
  applications: applications.length,
  plans: plans.length,
  connectors: connectors.length,
  securityLayers: securityLayers.length,
  articles: articles.length,
};

export { localizeByKey };

/**
 * Resolves a raw `[locale]` route param into a supported Locale.
 * Falls back to English so a malformed URL never throws.
 */
export function resolveLocale(raw: string | undefined): Locale {
  const candidate = raw ?? "";
  return isLocale(candidate) ? candidate : defaultLocale;
}
