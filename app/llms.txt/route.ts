import { siteUrl } from "@/lib/siteUrl";

export const dynamic = "force-static";

export function GET() {
  const content = `# MarketStar Gemini Intelligence

> An independent guide to Google Workspace and Gemini Enterprise capabilities, plan comparisons, connectors, and security controls. This site is not affiliated with Google LLC.

## Start here
- [Home](${siteUrl}/): Overview of the site's research and tools.
- [Plan comparison](${siteUrl}/compare): Compare Workspace and Gemini Enterprise plans.
- [Pricing](${siteUrl}/pricing): Review listed plan pricing and billing assumptions.
- [Feature directory](${siteUrl}/features): Browse documented capabilities by product and plan.
- [Google Workspace apps](${siteUrl}/apps): Explore Workspace applications and related capabilities.

## Enterprise research
- [Gemini Enterprise](${siteUrl}/products/gemini-enterprise): Product overview and deployment context.
- [Connectors](${siteUrl}/enterprise/connectors): Browse data connectors and their requirements.
- [Security and governance](${siteUrl}/security): Review security controls and governance topics.
- [Enterprise readiness](${siteUrl}/enterprise/readiness): Assess deployment readiness.
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
