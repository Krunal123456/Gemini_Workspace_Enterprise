import { NextRequest, NextResponse } from "next/server";
import { connectors } from "@/data/connectors";

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

  const query = connectors.map((connector) => `"${connector.name}"`).join(" OR ");
  const params = new URLSearchParams({
    key: apiKey,
    cx: searchEngineId,
    q: `site:${domain} (${query})`,
    num: "10",
  });

  try {
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const payload = await response.json() as { items?: GoogleSearchItem[] };
    const items = (payload.items || []).filter((item) => item.link);

    return connectors.flatMap((connector) => {
      const searchTerms = connector.id === "sharepoint" ? ["sharepoint", "onedrive"] : [connector.id];
      const evidence = items
        .filter((item) => searchTerms.some((term) => `${item.title || ""} ${item.snippet || ""} ${item.link || ""}`.toLowerCase().includes(term)))
        .map((item) => ({
          title: item.title || connector.name,
          url: item.link as string,
          snippet: item.snippet || "Public search result matched this connector name.",
        }));

      return evidence.length ? [{
        id: connector.id,
        name: connector.name,
        status: connector.status,
        category: connector.category,
        evidence,
      }] : [];
    });
  } catch {
    return null;
  }
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
      matched: googleMatches,
      source: "google_custom_search",
    });
  }

  return NextResponse.json({
    status: "manual_review",
    domain,
    matched: [],
    source: "manual_review",
    setup_required: true,
    search_links: connectors.map((connector) => ({
      id: connector.id,
      name: connector.name,
      url: `https://www.google.com/search?q=${encodeURIComponent(`site:${domain} "${connector.name}"`)}`,
    })),
  });
}
