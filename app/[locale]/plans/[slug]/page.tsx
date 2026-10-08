import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPlanBySlug, getPlans } from "@/lib/i18n/data";
import { resolveLocale, type Locale } from "@/lib/i18n/config";
import { getFeatures } from "@/lib/i18n/features";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  HardDrive,
  Users,
  CreditCard,
  ShieldCheck,
  Building2,
  Terminal,
  Database,
  Cpu
} from "lucide-react";

import { createPhraseTranslator } from "@/lib/i18n/translate";
interface PlanDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getPlans("en").map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PlanDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const t = createPhraseTranslator(locale);
  const plan = getPlanBySlug(slug, resolveLocale(rawLocale));

  if (!plan) {
    return {
      title: "Plan Not Found | Gemini Intelligence",
    };
  }

  return {
    title: `${plan.name} AI Capabilities & Pricing | Gemini Intelligence`,
    description: plan.description,
  };
}

export default async function PlanDetailPage({ params }: PlanDetailPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const features = getFeatures(locale);
  const t = createPhraseTranslator(locale);
  const plan = getPlanBySlug(slug, locale);
  const plans = getPlans(locale);

  if (!plan) {
    notFound();
  }

  // Count available features for this plan
  const availableFeatures = features.filter((f) => f.plans[plan.id]?.available);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />{t("Back to all Plans")}</Link>
        </div>
      </div>

      {/* Hero Header */}
      <header className="pt-16 pb-14 border-b border-border/60 bg-muted/10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-blue/10 text-google-blue text-xs font-semibold uppercase tracking-wider mb-4 border border-google-blue/20">
                <CreditCard className="w-3.5 h-3.5" /> {plan.category}
              </div>
              <h1 className="fluid-h1 font-extrabold tracking-tight text-foreground mb-4">
                {plan.name}
              </h1>
              <p className="fluid-body text-muted-foreground leading-relaxed mb-6">
                {plan.tagline}
              </p>
              <div className="text-xs text-muted-foreground">
                <strong className="text-foreground">{t("Target Audience:")}</strong> {plan.idealFor}
              </div>
            </div>

            {/* Pricing Box */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm lg:min-w-[320px] flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">{t("Commercial Rate")}</span>
                {plan.annualPriceUSD ? (
                  <div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-4xl font-extrabold text-foreground">
                        {formatCurrency(plan.annualPriceUSD)}
                      </span>
                      <span className="text-sm text-muted-foreground">/ user / mo</span>
                    </div>
                    <span className="text-xs text-muted-foreground block mb-6">
                      {t("Annual commitment rate per user per month; billing cadence depends on your subscription terms.")}
                    </span>
                  </div>
                ) : plan.startingPriceUSD ? (
                  <div className="mb-6">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("Starting at")}</span>
                    <span className="text-4xl font-extrabold text-foreground">{formatCurrency(plan.startingPriceUSD)}</span>
                    <span className="text-sm text-muted-foreground">/ seat / month</span>
                    <span className="mt-2 block text-xs text-muted-foreground">{plan.pricingNote}</span>
                  </div>
                ) : (
                  <div className="mb-6">
                    <span className="text-2xl font-bold text-foreground block">{plan.id === "gemini-enterprise-payg" ? "$0 seat fee" : "Contact Google"}</span>
                    <span className="text-xs text-muted-foreground">{plan.pricingNote || "Confirm current pricing with Google or your reseller."}</span>
                  </div>
                )}
              </div>

              <Link
                href={`/compare?tab=calculator&plan=${plan.id}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-google-blue to-gemini-indigo text-white font-medium rounded-xl hover:shadow-lg transition-all text-sm text-center"
              >{t("Model a rollout scenario")}<ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Specifications Body */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Core Architecture Matrix */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-google-blue block mb-2">{t("Technical Architecture")}</span>
          <h2 className="fluid-h2 font-bold text-foreground mb-8">{t("Core AI & Platform Capabilities")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">{t("Generative AI Integration")}</span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.generativeAI}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">{t("Model Checkpoint Access")}</span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.modelAccess}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">{t("Grounding & Citations")}</span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.grounding}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">{t("Deep Research Quota")}</span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.deepResearch}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">{t("Gemini Notebook access")}</span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.notebookLMAccess}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">
                {t(plan.type === "gemini-enterprise" ? "Enterprise connectors & indexing" : "Workspace context and data sources")}
              </span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.connectors}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">
                {plan.type === "gemini-enterprise" ? "Agents & Model Context Protocol (MCP)" : "Workspace automation and agents"}
              </span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.agentsAndMCP}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">{t("Security & administration")}</span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.securityLevel}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">{t("Audit & activity records")}</span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.auditLogging}
              </p>
            </div>
          </div>
        </div>

        {/* Feature Summary */}
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-border/60">
            <div>
              <h3 className="text-xl font-bold text-foreground">{t("Highlighted Entitlements")}</h3>
              <p className="text-xs text-muted-foreground">
                {availableFeatures.length} of {features.length} catalog features marked available in this edition
              </p>
            </div>
            <Link
              href="/compare"
              className="text-xs font-semibold text-google-blue hover:underline inline-flex items-center gap-1"
            >{t("Inspect all in side-by-side matrix")}<ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {plan.highlightedFeatures.map((hf, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                <CheckCircle2 className="w-4 h-4 text-google-green shrink-0 mt-0.5" />
                <span>{hf}</span>
              </div>
            ))}
          </div>
        </div>

        {plan.officialSources && plan.officialSources.length > 0 && (
          <aside className="rounded-2xl border border-border bg-muted/20 p-6" aria-labelledby="plan-sources-heading">
            <h2 id="plan-sources-heading" className="text-lg font-bold text-foreground">{t("Official plan references")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Checked September 28, 2026. Pricing, feature access, and limits can change; use these Google pages for current purchase details.</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {plan.officialSources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-google-blue hover:underline">
                    {source.label}<ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Back Link & CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />{t("Back to all Plans")}</Link>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 px-6 py-3 bg-google-blue text-white font-semibold rounded-xl hover:bg-google-blue/90 transition-all text-sm"
          >
            {t("Compare {plan} in the {n}-Plan Matrix", { plan: plan.name, n: plans.length })}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
