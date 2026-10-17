import { MetadataRoute } from "next";
import { features } from "@/data/features";
import { applications } from "@/data/apps";
import { plans } from "@/data/plans";
import { articles } from "@/data/articles";
import { connectors } from "@/data/connectors";
import { siteUrl } from "@/lib/siteUrl";
import { htmlLang, locales } from "@/lib/i18n/config";

const staticRoutes = [
  "",
  "/features",
  "/apps",
  "/products/gemini",
  "/products/notebooklm",
  "/products/gemini-enterprise",
  "/products/workspace-studio",
  "/products/google-labs",
  "/products/developer-tools",
  "/plans",
  "/pricing",
  "/models",
  "/compare",
  "/mindmap",
  "/enterprise",
  "/enterprise/onboarding",
  "/enterprise/onboarding/business",
  "/enterprise/onboarding/cloud",
  "/enterprise/readiness",
  "/enterprise/connector-detector",
  "/enterprise/connectors",
  "/enterprise/agents",
  "/security",
  "/articles",
  "/google-ai-updates",
  "/about",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;

  const localizedUrl = (route: string, locale: (typeof locales)[number]) => {
    const prefix = locale === "en" ? "" : `/${locale}`;
    return `${baseUrl}${prefix}${route}`;
  };

  const alternatesFor = (route: string) => ({
    languages: {
      ...Object.fromEntries(
        locales.map((locale) => [htmlLang(locale), localizedUrl(route, locale)]),
      ),
      "x-default": localizedUrl(route, "en"),
    },
  });

  return locales.flatMap((locale) => {
    const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
      url: localizedUrl(route, locale),
      alternates: alternatesFor(route),
      changeFrequency: "weekly",
      priority: route === "" ? 1.0 : 0.8,
    }));

    const featureRoutes: MetadataRoute.Sitemap = features.map((f) => ({
      url: localizedUrl(`/features/${f.slug}`, locale),
      alternates: alternatesFor(`/features/${f.slug}`),
      changeFrequency: "monthly",
      priority: f.isPopular ? 0.9 : 0.7,
    }));

    const appRoutes: MetadataRoute.Sitemap = applications.map((a) => ({
      url: localizedUrl(`/apps/${a.slug}`, locale),
      alternates: alternatesFor(`/apps/${a.slug}`),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    const connectorRoutes: MetadataRoute.Sitemap = connectors.map((connector) => ({
      url: localizedUrl(`/enterprise/connectors/${connector.id}`, locale),
      alternates: alternatesFor(`/enterprise/connectors/${connector.id}`),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    const planRoutes: MetadataRoute.Sitemap = plans.map((p) => ({
      url: localizedUrl(`/plans/${p.slug}`, locale),
      alternates: alternatesFor(`/plans/${p.slug}`),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
      url: localizedUrl(`/articles/${a.slug}`, locale),
      alternates: alternatesFor(`/articles/${a.slug}`),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    return [
      ...routes,
      ...featureRoutes,
      ...appRoutes,
      ...connectorRoutes,
      ...planRoutes,
      ...articleRoutes,
    ];
  });
}
