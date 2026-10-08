import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  FileCheck2,
  HelpCircle,
  Route,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { EnterpriseOnboardingGuide } from "@/components/enterprise/EnterpriseOnboardingGuide";
import { createPhraseTranslator } from "@/lib/i18n/translate";
import { localizeHref } from "@/lib/i18n/href";
import { resolveLocale, type Locale } from "@/lib/i18n/config";

const pageCopy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Gemini Enterprise Customer Onboarding Guide (Business, Standard & Plus) | MarketStar Intelligence",
    description:
      "Step-by-step administrator onboarding blueprint for Gemini Enterprise Business (Google Workspace), Standard, and Plus: Google Admin console setup, organization hierarchy, billing assignment, API activation, IAM governance, license distribution, app creation, and data stores.",
  },
  es: {
    title: "Guía de incorporación de clientes de Gemini Enterprise (Business, Standard y Plus) | MarketStar Intelligence",
    description:
      "Plan de incorporación de administradores paso a paso para Gemini Enterprise Business (Google Workspace), Standard y Plus: consola de administración de Google, jerarquía de organización, facturación, APIs, roles IAM, licencias, aplicaciones y fuentes de datos.",
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

export default async function EnterpriseOnboardingPage({
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
        <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href={href("/enterprise")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("Back to Enterprise Architecture")}
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/60 bg-muted/20 py-20 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(66,133,244,0.12),transparent_70%)]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-google-blue/20 bg-google-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-google-blue">
              <FileCheck2 className="h-3.5 w-3.5" />
              {t("Administrator Onboarding Runbook")}
            </div>

            <h1 className="fluid-h1 font-extrabold tracking-tight">
              {t("Customer Onboarding for ")}
              <span className="gradient-text">{t("Gemini Enterprise")}</span>
              <br className="hidden sm:inline" />
              <span className="text-xl sm:text-2xl font-bold text-muted-foreground ml-0 sm:ml-2">
                {t("Business (Workspace), Standard & Plus (Cloud)")}
              </span>
            </h1>

            <p className="fluid-body mt-6 max-w-3xl leading-relaxed text-muted-foreground">
              {t(
                "An end-to-end operational guide for Google Workspace and Google Cloud administrators. Manage Google Workspace Admin Console settings for Business edition (up to 300 seats, 25 GiB pooled indexing), or configure Google Cloud Console projects, billing, APIs, IAM, and Discovery Engine data stores for Standard and Plus editions."
              )}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-lg border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground">
                <Building2 className="inline mr-1.5 h-3.5 w-3.5 text-google-blue" />
                Google Workspace Admin Console
              </span>
              <span className="rounded-lg border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground">
                <Terminal className="inline mr-1.5 h-3.5 w-3.5 text-google-green" />
                Google Cloud Console & CLI
              </span>
              <span className="rounded-lg border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground">
                <ShieldCheck className="inline mr-1.5 h-3.5 w-3.5 text-gemini-purple" />
                Business, Standard & Plus Tiers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Onboarding Runbook */}
      <section className="py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <EnterpriseOnboardingGuide />
        </div>
      </section>

      {/* Regulatory & Compliance Footnote */}
      <section className="border-t border-border bg-muted/20 py-12">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <ShieldCheck className="h-6 w-6 shrink-0 text-google-green" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t(
              "This onboarding blueprint references the latest Google Cloud documentation for Gemini Enterprise Agent Platform and Discovery Engine. Subscription commitments, regional quota allocations, and enterprise compliance terms should be finalized through your authorized Google Cloud billing account or account manager."
            )}
          </p>
        </div>
      </section>
    </div>
  );
}
