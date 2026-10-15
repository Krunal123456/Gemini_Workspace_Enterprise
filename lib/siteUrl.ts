const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = configuredSiteUrl
  ? new URL(configuredSiteUrl).origin
  : "https://gemini-intelligence.marketstar.com";
