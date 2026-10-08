import { MetadataRoute } from "next";
import { features } from "@/data/features";
import { applications } from "@/data/apps";
import { plans } from "@/data/plans";
import { articles } from "@/data/articles";
import { connectors } from "@/data/connectors";
import { siteUrl } from "@/lib/siteUrl";
import { locales } from "@/lib/i18n/config";

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
  "/about",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;

  return locales.flatMap((locale) => {
    // English is the default locale and serves unprefixed canonical URLs.
    const prefix = locale === "en" ? "" : `/${locale}`;

    const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
      url: `${baseUrl}${prefix}${route}`,
      changeFrequency: "weekly",
      priority: route === "" ? 1.0 : 0.8,
    }));

    const featureRoutes: MetadataRoute.Sitemap = features.map((f) => ({
      url: `${baseUrl}${prefix}/features/${f.slug}`,
      changeFrequency: "monthly",
      priority: f.isPopular ? 0.9 : 0.7,
    }));

    const appRoutes: MetadataRoute.Sitemap = applications.map((a) => ({
      url: `${baseUrl}${prefix}/apps/${a.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    const connectorRoutes: MetadataRoute.Sitemap = connectors.map((connector) => ({
      url: `${baseUrl}${prefix}/enterprise/connectors/${connector.id}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    const planRoutes: MetadataRoute.Sitemap = plans.map((p) => ({
      url: `${baseUrl}${prefix}/plans/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
      url: `${baseUrl}${prefix}/articles/${a.slug}`,
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
