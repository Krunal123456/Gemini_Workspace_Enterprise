import { NextRequest, NextResponse } from "next/server";
import { connectors } from "@/data/connectors";

const vendorSignals: Record<string, string[]> = {
  jira: ["atlassian.net", "jira.com"],
  confluence: ["atlassian.net", "confluence.com"],
  salesforce: ["salesforce.com"],
  sharepoint: ["sharepoint.com", "onmicrosoft.com"],
  slack: ["slack.com"],
  box: ["box.com"],
  notion: ["notion.so", "notion.site"],
  github: ["github.com"],
  bigquery: ["cloud.google.com", "googleapis.com"],
};

type GoogleSearchItem = {
  title?: string;
  link?: string;
  snippet?: string;
};

function normalizeDomain(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split(/[/?#]/)[0]
    .replace(/\.$/, "");
}

function isDomain(value: string) {
  return /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(value);
}

async function searchGoogle(domain: string) {
  const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
  if (!apiKey || !searchEngineId) return null;

  const results = await Promise.all(connectors.map(async (connector) => {
    const params = new URLSearchParams({
      key: apiKey,
      cx: searchEngineId,
      q: `site:${domain} "${connector.name}"`,
      num: "3",
    });
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;
    const payload = await response.json() as { items?: GoogleSearchItem[] };
    const evidence = (payload.items || []).filter((item) => item.link).map((item) => ({
      title: item.title || connector.name,
      url: item.link as string,
      snippet: item.snippet || "Public search result matched this connector name.",
    }));
    if (!evidence.length) return null;
    return {
      id: connector.id,
      name: connector.name,
      status: connector.status,
      category: connector.category,
      evidence,
    };
  }));

  return results.filter(Boolean);
}

export async function GET(request: NextRequest) {
  const rawDomain = request.nextUrl.searchParams.get("domain") || "";
  const domain = normalizeDomain(rawDomain);

  if (!isDomain(domain)) {
    return NextResponse.json({ error: "Enter a valid company domain." }, { status: 400 });
  }

  const googleMatches = await searchGoogle(domain);
  if (googleMatches) {
    return NextResponse.json({
      status: googleMatches.length > 0 ? "ready" : "manual_review",
      domain,
      company_name: null,
      ge_score: googleMatches.length > 0 ? Math.min(10, googleMatches.length * 2) : null,
      ge_band: googleMatches.length > 0 ? "Public signals found" : "No public signals",
      matched: googleMatches,
      coming_soon: [],
      source: "google_custom_search",
    });
  }

  const matchedIds = new Set(
    Object.entries(vendorSignals)
      .filter(([, signals]) => signals.some((signal) => domain === signal || domain.endsWith(`.${signal}`)))
      .map(([connectorId]) => connectorId),
  );

  const matched = connectors
    .filter((connector) => matchedIds.has(connector.id))
    .map((connector) => ({
      id: connector.id,
      name: connector.name,
      status: connector.status,
      category: connector.category,
    }));

  return NextResponse.json({
    status: matched.length > 0 ? "ready" : "manual_review",
    domain,
    company_name: null,
    ge_score: matched.length > 0 ? Math.min(10, matched.length * 2) : null,
    ge_band: matched.length > 0 ? "Signal found" : "Needs review",
    matched,
    coming_soon: [],
    source: "local_catalog",
    setup_required: true,
    search_links: connectors.map((connector) => ({
      id: connector.id,
      name: connector.name,
      url: `https://www.google.com/search?q=${encodeURIComponent(`site:${domain} "${connector.name}"`)}`,
    })),
  });
}
