import type {
  Application,
  Article,
  Category,
  Connector,
  Plan,
  SecurityLayer,
} from "@/types";
import type { Locale } from "@/lib/i18n/config";

/**
 * Spanish overlays for data entities.
 *
 * English is the source of truth in `data/*.ts`. Each overlay is keyed by the
 * entity's stable identifier so that ids, slugs, categories, statuses and
 * other logic-bearing values are never duplicated or re-keyed — only the
 * human-readable strings are localized.
 *
 * Missing entries fall back to the English source string, so partial
 * translation degrades gracefully.
 */

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends readonly unknown[]
    ? T[K]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

export type AppTranslation = DeepPartial<
  Pick<Application, "tagline" | "description" | "overview" | "enterpriseValue"> & {
    keyAIFeatures: string[];
    category: string;
  }
>;

export type PlanTranslation = DeepPartial<
  Pick<
    Plan,
    "tagline" | "description" | "idealFor" | "storage" | "pricingNote"
  > & { highlightedFeatures: string[] }
>;

export type ConnectorTranslation = DeepPartial<
  Pick<Connector, "description" | "enterpriseRequirements"> & {
    dataTypes: string[];
    groundingCapabilities: string[];
    category: string;
  }
>;

export type SecurityLayerTranslation = DeepPartial<
  Omit<SecurityLayer, "id" | "level" | "capabilities"> & {
    capabilities: { name: string; description: string; reviewQuestion: string }[];
  }
>;

export type ArticleTranslation = DeepPartial<
  Omit<Article, "slug" | "date" | "category" | "content" | "keyTakeaways"> & {
    content: string[];
    keyTakeaways: string[];
    category: string;
  }
>;

export type CategoryTranslation = DeepPartial<
  Omit<Category, "id" | "name"> & { name: string }
>;

export type FeatureTranslation = {
  name?: string;
  description?: string;
  whatItDoes?: string;
  howItWorks?: string;
  useCaseSummary?: string;
};

export type AppTranslations = Record<string, AppTranslation>;
export type PlanTranslations = Record<string, PlanTranslation>;
export type ConnectorTranslations = Record<string, ConnectorTranslation>;
export type SecurityLayerTranslations = Record<string, SecurityLayerTranslation>;
export type ArticleTranslations = Record<string, ArticleTranslation>;
export type CategoryTranslations = Record<string, CategoryTranslation>;

/**
 * Applies an overlay to a base entity, field by field.
 * Strings are replaced wholesale; string arrays are replaced wholesale when
 * provided, so array order stays authoritative and untranslated items are not
 * silently reordered.
 */
function applyOverlay<T extends object, O extends object>(
  base: T,
  overlay: O | undefined,
): T {
  if (!overlay) return base;
  const result: T = { ...base };

  for (const [key, value] of Object.entries(overlay) as [keyof T, unknown][]) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      if (value.length > 0) {
        (result as Record<string, unknown>)[key as string] = value;
      }
      continue;
    }
    if (value && typeof value === "object") {
      const baseValue = (base as Record<string, unknown>)[key as string];
      (result as Record<string, unknown>)[key as string] = {
        ...(Array.isArray(baseValue) ? baseValue : (baseValue as object)),
        ...(value as object),
      };
      continue;
    }
    (result as Record<string, unknown>)[key as string] = value;
  }

  return result;
}

/**
 * Applies a locale overlay to base entities.
 *
 * `O` is intentionally allowed to be wider than `T` for enum-like fields such
 * as `category`: the base union models the English source values, while a
 * translation supplies a display string for the active locale. Only those
 * display fields widen; the returned object is still typed as `T`.
 */
export function localizeAll<T extends { id: string }, O extends object>(
  items: readonly T[],
  translations: Record<string, O> | undefined,
  locale: Locale,
): T[] {
  if (locale === "en" || !translations) return items as T[];
  return items.map((item) => applyOverlay(item, translations[item.id]));
}

export function localizeArticles(
  items: readonly Article[],
  translations: ArticleTranslations | undefined,
  locale: Locale,
): Article[] {
  if (locale === "en" || !translations) return items as Article[];
  return items.map((item) =>
    applyOverlay(item, translations[item.slug]),
  );
}

export function localizeByKey<T extends object, K extends string & keyof T>(
  items: readonly T[],
  translations: Record<string, object> | undefined,
  locale: Locale,
  key: K,
): T[] {
  if (locale === "en" || !translations) return items as T[];
  return items.map((item) =>
    applyOverlay(item, translations[String(item[key])]),
  );
}
