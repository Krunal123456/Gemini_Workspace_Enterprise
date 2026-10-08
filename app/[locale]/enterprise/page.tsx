import {
  getConnectors,
} from "@/lib/i18n/data";
import { resolveLocale, type Locale } from "@/lib/i18n/config";
import { localizeHref } from "@/lib/i18n/href";

import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { 
  Building2, 
  Database, 
  Network, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Boxes, 
  Terminal, 
  Workflow, 
  CheckCircle2, 
  Lock,
  Server,
  Layers,
  FileCheck,
  Search,
  Route,
  FileCheck2,
  Laptop
} from "lucide-react";


import { createPhraseTranslator } from "@/lib/i18n/translate";
export const metadata: Metadata = {
  title: "Enterprise AI Architecture | Gemini Enterprise, Connectors & MCP",
  description: "Review Gemini Enterprise connectors, agents, MCP options, and product-specific security controls using current Google documentation.",
};

export default async function EnterprisePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const href = (path: string) => localizeHref(locale, path);
  const t = createPhraseTranslator(locale);
  const connectors = getConnectors(locale);
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-border bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(66,133,244,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.18),transparent_70%)]">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-gemini-indigo/15 via-gemini-purple/15 to-google-blue/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-google-blue/10 text-google-blue text-xs font-semibold uppercase tracking-wider mb-6 border border-google-blue/20 shadow-sm">
            <Building2 className="w-3.5 h-3.5" /> {t("Enterprise Grade AI")}
          </div>

          <h1 className="fluid-h1 font-extrabold tracking-tight text-foreground max-w-4xl mx-auto mb-6">
            {t("Architected for enterprise scale, ")}
            <span className="gradient-text">{t("grounding")}</span> {t("& governance.")}
          </h1>

          <p className="fluid-body text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            {t("Gemini Enterprise can ground work in Google and third-party sources with administrative and identity controls.")} {t("Available connectors, permissions, and behavior depend on the edition, source, and configuration.")}
          </p>

          {/* Quick Action Navigation Grid */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 max-w-4xl mx-auto">
            <Link
              href={href("/enterprise/onboarding/business")}
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-google-blue via-gemini-indigo to-gemini-purple text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-google-blue/20 transition-all text-sm shadow-sm"
            >
              <Laptop className="w-4 h-4" />{t("Business (Workspace) Onboarding")}<ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={href("/enterprise/onboarding/cloud")}
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-google-blue/30 bg-card hover:bg-muted text-foreground font-semibold rounded-xl transition-all shadow-sm text-sm"
            >
              <FileCheck2 className="w-4 h-4 text-google-blue" />{t("Standard & Plus (Cloud) Onboarding")}<ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={href("/enterprise/readiness")}
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-all shadow-sm text-sm"
            >
              <Route className="w-4 h-4 text-google-blue" />{t("Build readiness plan")}
            </Link>
            <Link
              href={href("/enterprise/connector-detector")}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-border bg-card hover:bg-muted text-foreground font-semibold rounded-xl transition-all shadow-sm text-sm"
            >
              <Search className="w-4 h-4 text-google-green" />{t("Connector readiness check")}</Link>
            <Link
              href={href("/enterprise/connectors")}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-google-blue via-gemini-indigo to-gemini-purple text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-google-blue/20 transition-all text-sm shadow-sm"
            >
              <Database className="w-4 h-4" />
              Explore 11 Connectors
            </Link>
            <Link
              href={href("/enterprise/agents")}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-border bg-card hover:bg-muted text-foreground font-semibold rounded-xl transition-all shadow-sm text-sm"
            >
              <Terminal className="w-4 h-4 text-gemini-purple" />
              Model Context Protocol (MCP)
            </Link>
            <Link
              href={href("/security")}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-muted-foreground hover:text-foreground font-semibold transition-colors text-sm"
            >
              <ShieldCheck className="w-4 h-4" />{t("Security & Governance")}</Link>
          </div>
        </div>
      </section>

      {/* 3 Pillars of Enterprise AI */}
      <section className="py-24 border-b border-border bg-background">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-google-blue block mb-2">{t("Foundational Principles")}</span>
            <h2 className="fluid-h2 font-bold tracking-tight text-foreground mb-4">{t("The 3 Pillars of Gemini Enterprise")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("Enterprise readiness depends on source permissions, administrator configuration, and the documented controls for the edition you choose.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-8 shadow-[0_16px_40px_-25px_rgba(0,0,0,0.06)] backdrop-blur-2xl flex flex-col justify-between hover:shadow-lg hover:border-google-blue/50 transition-all duration-300 dark:border-white/10 dark:bg-slate-950/60">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-google-blue/10 text-google-blue flex items-center justify-center mb-6 border border-google-blue/20">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{t("Enterprise Grounding")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {t("Connector availability varies by edition and setup. Test permission-aware retrieval with your selected sources, representative accounts, and real access rules before rollout.")}
                </p>
              </div>
              <Link
                href={href("/enterprise/connectors")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-google-blue hover:underline pt-4 border-t border-border/60"
              >{t("View Supported Connectors")}<ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-8 shadow-[0_16px_40px_-25px_rgba(0,0,0,0.06)] backdrop-blur-2xl flex flex-col justify-between hover:shadow-lg hover:border-gemini-purple/50 transition-all duration-300 dark:border-white/10 dark:bg-slate-950/60">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gemini-purple/10 text-gemini-purple flex items-center justify-center mb-6 border border-gemini-purple/20">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Model Context Protocol (MCP)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  MCP and agent capabilities depend on the Gemini product, edition, and configuration. Verify Google's current supported options and test integrations with least-privilege credentials.
                </p>
              </div>
              <Link
                href={href("/enterprise/agents")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gemini-purple hover:underline pt-4 border-t border-border/60"
              >{t("Learn About MCP & Agents")}<ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-8 shadow-[0_16px_40px_-25px_rgba(0,0,0,0.06)] backdrop-blur-2xl flex flex-col justify-between hover:shadow-lg hover:border-google-green/50 transition-all duration-300 dark:border-white/10 dark:bg-slate-950/60">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-google-green/10 text-google-green flex items-center justify-center mb-6 border border-google-green/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{t("Data Terms & Model Armor")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Google documents product-specific data protections for Gemini Enterprise. Model Armor is available across its editions at no extra cost, but administrators must enable and configure it.
                </p>
              </div>
              <Link
                href={href("/security")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-google-green hover:underline pt-4 border-t border-border/60"
              >{t("Review Security Topics")}<ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Connectors Snapshot Grid */}
      <section className="py-24 bg-muted/30 border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-google-blue block mb-2">{t("Knowledge Integration")}</span>
              <h2 className="fluid-h2 font-bold text-foreground">{t("Connector Examples")}</h2>
            </div>
            <Link
              href={href("/enterprise/connectors")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-google-blue hover:underline"
            >{t("See all connector specifications")}<ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {connectors.slice(0, 8).map((c) => (
              <div
                key={c.id}
                className="rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-[0_16px_40px_-25px_rgba(0,0,0,0.06)] backdrop-blur-2xl hover:border-google-blue/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between dark:border-white/10 dark:bg-slate-950/60"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100/80 text-muted-foreground border border-slate-200/60 dark:bg-white/[0.04] dark:border-white/10">
                      {c.category}
                    </span>
                    <span className="text-[11px] font-bold uppercase text-google-blue bg-google-blue/10 px-2 py-0.5 rounded-full border border-google-blue/20">{t("Example")}</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{c.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                    {c.description}
                  </p>
                </div>
                <div className="text-[11px] text-muted-foreground font-medium border-t border-border/60 pt-3 mt-auto">{t("Verify edition support, region, and setup with Google")}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MarketStar Advisory Banner */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4 border border-white/15">
                <Building2 className="w-3.5 h-3.5" /> MarketStar Advisory
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">{t("Deploying Gemini Enterprise across your organization?")}</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                MarketStar helps Fortune 500 and high-growth enterprises design custom connectors, configure MCP environments, and architect secure data governance boundaries.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 relative z-10">
              <Link
                href={href("/compare")}
                className="px-6 py-3.5 bg-white text-slate-950 font-semibold rounded-xl hover:bg-slate-100 transition-all text-sm shadow-md"
              >{t("Plan Comparison")}</Link>
              <Link
                href={href("/articles")}
                className="px-6 py-3.5 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all text-sm"
              >{t("Read Strategic Insights")}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
