const configuredReferralUrl = process.env.NEXT_PUBLIC_GOOGLE_WORKSPACE_REFERRAL_URL?.trim();

/** Only accept a secure, explicitly configured Google referral URL. */
export const googleWorkspaceReferralUrl = (() => {
  if (!configuredReferralUrl) return undefined;
  try {
    const url = new URL(configuredReferralUrl);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
})();

export const officialWorkspacePricingUrl = "https://workspace.google.com/pricing";
