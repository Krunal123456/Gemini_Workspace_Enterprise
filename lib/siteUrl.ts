const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const productionSiteUrl = "https://googleworkspacegemini.vercel.app";

// Keep public production canonicals anchored to the user-confirmed domain,
// even if an older NEXT_PUBLIC_SITE_URL remains in the deployment settings.
export const siteUrl =
  process.env.NODE_ENV === "production"
    ? productionSiteUrl
    : configuredSiteUrl
      ? new URL(configuredSiteUrl).origin
      : productionSiteUrl;
