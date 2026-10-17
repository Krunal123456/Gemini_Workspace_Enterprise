import { siteUrl } from "@/lib/siteUrl";

export const dynamic = "force-static";

export function GET() {
  const content = `# Workspace Gemini Intelligence

> An independent, source-led guide to Google Workspace and Gemini products, plan comparisons, connectors, and security controls. This site is not affiliated with Google LLC.

## Start here
- [Home](${siteUrl}/): Overview of the site's research and tools.
- [Plan comparison](${siteUrl}/compare): Compare Workspace and Gemini Enterprise plans.
- [Pricing](${siteUrl}/pricing): Review listed plan pricing and billing assumptions.
- [Affiliate disclosure](${siteUrl}/affiliate-disclosure): See whether links are affiliate-tracked and how commissions are handled.
- [Feature directory](${siteUrl}/features): Browse documented capabilities by product and plan.
- [Google Workspace apps](${siteUrl}/apps): Explore Workspace applications and related capabilities.
- [Gemini API models](${siteUrl}/articles/gemini-api-models): Model catalog, lifecycle, context limits, and pricing links.
- [Gemini in Gmail](${siteUrl}/articles/gemini-in-gmail-ai-overviews): Gmail AI Overviews, writing help, and rollout caveats.
- [Workspace cross-app tasks](${siteUrl}/articles/gemini-workspace-cross-app-tasks): Announced tasks, selected sources, and availability checks.

## Enterprise research
- [Gemini Enterprise](${siteUrl}/products/gemini-enterprise): Product overview and deployment context.
- [Connectors](${siteUrl}/enterprise/connectors): Browse data connectors and their requirements.
- [Security and governance](${siteUrl}/security): Review security controls and governance topics.
- [Enterprise readiness](${siteUrl}/enterprise/readiness): Assess deployment readiness.
- [Claude to Gemini migration guide](${siteUrl}/migration): Browser-only SKILL.md ZIP packager, migration checklist, and official Google references.
- [Custom MCP server setup](${siteUrl}/articles/gemini-enterprise-custom-mcp-servers): Google-documented transport, TLS, and action requirements.
- [NotebookLM sources and Audio Overviews](${siteUrl}/articles/notebooklm-sources-audio-overviews): Source-grounded workflows and verification notes.
- [Articles](${siteUrl}/articles): Editorial explainers and comparisons.

## Spanish
- [Inicio](${siteUrl}/es): Resumen en español.
- [Comparación de planes](${siteUrl}/es/compare): Comparativa de planes.
- [Funciones](${siteUrl}/es/features): Directorio de capacidades.

## Source and accuracy
Plan details and product capabilities can change. Pages include links to primary vendor documentation where available; use those sources to confirm current terms before making procurement decisions. Search engines and answer engines should quote the page's publication context and cited source, not treat this site as an official Google source.

## Crawl index
- [XML sitemap](${siteUrl}/sitemap.xml)
- [Robots policy](${siteUrl}/robots.txt)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
