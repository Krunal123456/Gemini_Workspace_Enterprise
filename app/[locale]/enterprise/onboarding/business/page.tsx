import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Laptop,
  ShieldCheck,
  Users,
} from "lucide-react";
import { EnterpriseOnboardingGuide } from "@/components/enterprise/EnterpriseOnboardingGuide";
import { createPhraseTranslator } from "@/lib/i18n/translate";
import { localizeHref } from "@/lib/i18n/href";
import { resolveLocale, type Locale } from "@/lib/i18n/config";

const pageCopy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Gemini Enterprise Business Edition Onboarding Guide (Google Workspace) | MarketStar Intelligence",
    description:
      "Step-by-step administrator onboarding blueprint for Gemini Enterprise – Business edition: Google Workspace Admin console setup (admin.google.com), Generative AI service status, OU scoping, license distribution, 25 GiB pooled indexing, and Gemini Notebook.",
  },
  es: {
    title: "Guía de incorporación de Gemini Enterprise Business (Google Workspace) | MarketStar Intelligence",
    description:
      "Manual de incorporación para administradores de Gemini Enterprise – Business edition: configuración en la consola de Google Workspace (admin.google.com), estado del servicio de IA generativa, unidades organizativas, distribución de licencias e indexación agrupada de 25 GiB.",
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

export default async function BusinessOnboardingPage({
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
            href={href("/enterprise/onboarding/cloud")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-google-blue hover:underline"
          >
            {t("Standard & Plus (Cloud) Onboarding")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/60 bg-muted/20 py-20 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(66,133,244,0.12),transparent_70%)]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-google-blue/20 bg-google-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-google-blue">
              <Laptop className="h-3.5 w-3.5" />
              {t("Google Workspace Admin Console Guide")}
            </div>

            <h1 className="fluid-h1 font-extrabold tracking-tight">
              {t("Customer Onboarding for ")}
              <span className="gradient-text">{t("Gemini Enterprise")}</span>
              <br className="hidden sm:inline" />
              <span className="text-xl sm:text-2xl font-bold text-muted-foreground ml-0 sm:ml-2">
                {t("Business Edition (Google Workspace Associated)")}
              </span>
            </h1>

            <p className="fluid-body mt-6 max-w-3xl leading-relaxed text-muted-foreground">
              {t(
                "An operational deployment guide for Google Workspace administrators. Procure licenses through admin.google.com, configure Generative AI service status, scope deployments by Organizational Unit (OU), assign licenses to users, enable Gemini in Gmail, Docs, Sheets, and Meet, and configure source-grounded Gemini Notebooks with 25 GiB pooled storage and indexing per user (up to 300 seats)."
              )}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-lg border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground">
                <Building2 className="inline mr-1.5 h-3.5 w-3.5 text-google-blue" />
                Google Workspace Admin Console (admin.google.com)
              </span>
              <span className="rounded-lg border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground">
                <Users className="inline mr-1.5 h-3.5 w-3.5 text-google-green" />
                Up to 300 Seats ($21/seat/mo)
              </span>
              <span className="rounded-lg border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground">
                <ShieldCheck className="inline mr-1.5 h-3.5 w-3.5 text-gemini-purple" />
                25 GiB Pooled Indexing & Zero Model Training
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Onboarding Runbook */}
      <section className="py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <EnterpriseOnboardingGuide allowedModes="business-only" initialEdition="business" />
        </div>
      </section>

      {/* Upgrade Banner */}
      <section className="border-t border-border bg-muted/20 py-12">
        <div className="mx-auto flex max-w-4xl flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <div>
            <h4 className="text-sm font-bold text-foreground">
              {t("Need more than 300 seats, VPC Service Controls, or CMEK?")}
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("Explore Gemini Enterprise Standard (30 GiB) and Plus (75 GiB) on Google Cloud Console.")}
            </p>
          </div>
          <Link
            href={href("/enterprise/onboarding/cloud")}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-xs font-semibold text-background hover:opacity-90 transition-all shrink-0"
          >
            {t("View Standard & Plus Onboarding")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
