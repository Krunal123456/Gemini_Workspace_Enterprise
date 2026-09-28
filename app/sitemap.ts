import { MetadataRoute } from "next";
import { features } from "@/data/features";
import { applications } from "@/data/apps";
import { plans } from "@/data/plans";
import { articles } from "@/data/articles";
import { connectors } from "@/data/connectors";
import { siteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;
  // Static core routes
  const routes = [
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
    "/enterprise/readiness",
    "/enterprise/connector-detector",
    "/enterprise/connectors",
    "/enterprise/agents",
    "/security",
    "/articles",
    "/about",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic feature routes
  const featureRoutes = features.map((f) => ({
    url: `${baseUrl}/features/${f.slug}`,
    changeFrequency: "monthly" as const,
    priority: f.isPopular ? 0.9 : 0.7,
  }));

  // Dynamic app routes
  const appRoutes = applications.map((a) => ({
    url: `${baseUrl}/apps/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const connectorRoutes = connectors.map((connector) => ({
    url: `${baseUrl}/enterprise/connectors/${connector.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic plan routes
  const planRoutes = plans.map((p) => ({
    url: `${baseUrl}/plans/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic article routes
  const articleRoutes = articles.map((a) => ({
    url: `${baseUrl}/articles/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...routes, ...featureRoutes, ...appRoutes, ...connectorRoutes, ...planRoutes, ...articleRoutes];
}
