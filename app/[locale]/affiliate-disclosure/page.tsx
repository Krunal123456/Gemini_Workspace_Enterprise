import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { resolveLocale, type Locale } from "@/lib/i18n/config";
import { createPhraseTranslator } from "@/lib/i18n/translate";
import { withLocalizedAlternates } from "@/lib/seo";
import { googleWorkspaceReferralUrl, officialWorkspacePricingUrl } from "@/lib/affiliate";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  return withLocalizedAlternates({
    title: "Affiliate Disclosure | Workspace Gemini Intelligence",
    description: "How Workspace Gemini Intelligence handles potential Google Workspace referral links and editorial independence.",
  }, "/affiliate-disclosure", locale);
}

export default async function AffiliateDisclosurePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const t = createPhraseTranslator(locale);

  return (
    <div className="min-h-screen bg-background pb-24 pt-28 text-foreground">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("Affiliate disclosure")}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {googleWorkspaceReferralUrl
            ? t("Some Workspace links on this site use an approved referral URL. If you buy through one, this site may receive a commission at no extra cost to you.")
            : t("This site does not currently have an active tracked Google Workspace referral link. Pricing links go directly to Google and do not earn this site a commission.")}
        </p>

        <section className="mt-10 border-y border-border py-7">
          <h2 className="text-xl font-semibold">{t("Editorial independence")}</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {t("Referral eligibility does not determine plan rankings, feature descriptions, or recommendations. Google controls program approval, country eligibility, commission terms, and payment. Always check Google's current terms before applying or purchasing.")}
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-muted/20 p-6">
          <h2 className="text-xl font-semibold">{t("Google Workspace referral programs")}</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {t("Google currently lists a referral program for smaller referral volumes and an affiliate program intended for higher-volume publishers. Enrollment and approval are required before tracked recommendations can earn commissions.")}
          </p>
          <a href="https://workspace.google.com/refer/" target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:opacity-90">
            {t("Review Google's program options")} <ExternalLink className="h-4 w-4" />
          </a>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={googleWorkspaceReferralUrl || officialWorkspacePricingUrl} target="_blank" rel={googleWorkspaceReferralUrl ? "sponsored nofollow noreferrer" : "noreferrer"} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold hover:border-google-blue/50 hover:text-google-blue">
            {googleWorkspaceReferralUrl ? t("View Workspace plans") : t("Open Google's pricing page")} <ExternalLink className="h-4 w-4" />
          </a>
          <Link href="/pricing" className="inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-google-blue hover:underline">
            {t("Compare plans on this site")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
