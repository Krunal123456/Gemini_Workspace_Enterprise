import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    const retiredWorkspaceAddons = [
      "gemini-business-addon",
      "gemini-enterprise-addon",
      "ai-meetings-messaging",
      "ai-security",
    ];

    const retiredWorkspaceAddonRedirects = retiredWorkspaceAddons.flatMap((slug) => [
      { source: `/plans/${slug}`, destination: "/plans", permanent: true },
      { source: `/es/plans/${slug}`, destination: "/es/plans", permanent: true },
    ]);

    const renamedArticles = [
      ["gemini-3-architecture-agentic-scale", "gemini-api-models"],
      ["deep-research-gemini-enterprise", "gemini-deep-research-workspace"],
      ["notebooklm-enterprise-grounding", "notebooklm-sources-audio-overviews"],
      ["mcp-model-context-protocol-enterprise", "gemini-enterprise-custom-mcp-servers"],
      ["gemini-workspace-coworker-agents-individual-email", "gemini-workspace-cross-app-tasks"],
      ["gmail-ai-inbox-proactive-intelligence", "gemini-in-gmail-ai-overviews"],
    ];
    const articleRedirects = renamedArticles.flatMap(([oldSlug, newSlug]) => [
      { source: `/articles/${oldSlug}`, destination: `/articles/${newSlug}`, permanent: true },
      { source: `/es/articles/${oldSlug}`, destination: `/es/articles/${newSlug}`, permanent: true },
    ]);

    return [...retiredWorkspaceAddonRedirects, ...articleRedirects];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
