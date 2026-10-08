import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { EnterpriseOnboardingGuide } from "@/components/enterprise/EnterpriseOnboardingGuide";
import { createPhraseTranslator } from "@/lib/i18n/translate";
import { localizeHref } from "@/lib/i18n/href";
import { resolveLocale, type Locale } from "@/lib/i18n/config";

const pageCopy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Gemini Enterprise Standard & Plus Onboarding Guide (Google Cloud) | MarketStar Intelligence",
    description:
      "Step-by-step administrator onboarding blueprint for Gemini Enterprise Standard and Plus: Google Cloud Console setup (console.cloud.google.com), organization hierarchy check, billing account linking, API activation, IAM governance, license distribution, Agent Builder apps, and Discovery Engine data stores.",
  },
  es: {
    title: "Guía de incorporación de Gemini Enterprise Standard y Plus (Google Cloud) | MarketStar Intelligence",
    description:
      "Manual de incorporación para administradores de Gemini Enterprise Standard y Plus: configuración en Google Cloud Console (console.cloud.google.com), jerarquía de organización, vinculación de facturación, activación de APIs, roles IAM, asignación de licencias y almacenes de Discovery Engine.",
  },
};

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return params.then(({ locale: raw }) => {
    const locale = resolveLocale(raw);
    return { ...pageCopy[locale] };
  });
}

export default async function CloudOnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const t = createPhraseTranslator(locale);
  const href = (path: string) => localizeHref(locale, path);

  return (
    <div className="min-h-screen bg-background pb-28 text-foreground">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href={href("/enterprise")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("Back to Enterprise Architecture")}
          </Link>

          <Link
            href={href("/enterprise/onboarding/business")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-google-blue hover:underline"
          >
            {t("Business Edition (Workspace) Onboarding")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/60 bg-muted/20 py-20 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(66,133,244,0.12),transparent_70%)]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-google-blue/20 bg-google-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-google-blue">
              <Terminal className="h-3.5 w-3.5" />
              {t("Google Cloud Console & CLI Guide")}
            </div>

            <h1 className="fluid-h1 font-extrabold tracking-tight">
              {t("Customer Onboarding for ")}
              <span className="gradient-text">{t("Gemini Enterprise")}</span>
              <br className="hidden sm:inline" />
              <span className="text-xl sm:text-2xl font-bold text-muted-foreground ml-0 sm:ml-2">
                {t("Standard & Plus Editions (Google Cloud)")}
              </span>
            </h1>

            <p className="fluid-body mt-6 max-w-3xl leading-relaxed text-muted-foreground">
              {t(
                "An end-to-end operational guide for Google Cloud administrators. Verify organization hierarchies (Organization node vs. 'No organization'), link Cloud Billing accounts, enable required service APIs (cloudaicompanion, discoveryengine, aiplatform), configure granular IAM roles, distribute user licenses to projects and regions, create Agent Builder apps, and attach grounded data stores with official documentation citations."
              )}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-lg border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground">
                <Building2 className="inline mr-1.5 h-3.5 w-3.5 text-google-blue" />
                Org vs. No-Org Guidance
              </span>
              <span className="rounded-lg border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground">
                <Terminal className="inline mr-1.5 h-3.5 w-3.5 text-google-green" />
                Full gcloud CLI Snippets
              </span>
              <span className="rounded-lg border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground">
                <ShieldCheck className="inline mr-1.5 h-3.5 w-3.5 text-gemini-purple" />
                Standard (30 GiB) & Plus (75 GiB) Tiers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Onboarding Runbook */}
      <section className="py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <EnterpriseOnboardingGuide allowedModes="cloud-only" initialEdition="standard" />
        </div>
      </section>

      {/* Workspace Link Footer Banner */}
      <section className="border-t border-border bg-muted/20 py-12">
        <div className="mx-auto flex max-w-4xl flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <div>
            <h4 className="text-sm font-bold text-foreground">
              {t("Looking for Google Workspace setup under 300 seats?")}
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("Explore Gemini Enterprise – Business edition managed via admin.google.com with 25 GiB pooled storage per user.")}
            </p>
          </div>
          <Link
            href={href("/enterprise/onboarding/business")}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-xs font-semibold text-background hover:opacity-90 transition-all shrink-0"
          >
            {t("View Business Edition (Workspace) Guide")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
