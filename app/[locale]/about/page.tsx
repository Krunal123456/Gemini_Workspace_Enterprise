import {
  getPlans,
} from "@/lib/i18n/data";
import { resolveLocale, type Locale } from "@/lib/i18n/config";
import { getFeatures } from "@/lib/i18n/features";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { 
  Building2, 
  ShieldCheck, 
  Globe2, 
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { MarketStarLogo } from "@/components/logos/MarketStarLogo";
import { GoogleCloudLogo } from "@/components/logos/GoogleCloudLogo";


import { createPhraseTranslator } from "@/lib/i18n/translate";
export const metadata: Metadata = {
  title: "About | MarketStar Gemini Enterprise AI Intelligence",
  description: "Learn about the Gemini Enterprise Intelligence platform created by MarketStar, Google Cloud ecosystem partner guiding global enterprises in AI deployment.",
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const features = getFeatures(locale);
  const t = createPhraseTranslator(locale);
  const plans = getPlans(locale);
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 bg-muted/20 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-blue/10 text-google-blue text-xs font-semibold uppercase tracking-wider mb-4 border border-google-blue/20">
              <Building2 className="w-3.5 h-3.5" /> {t("MarketStar Enterprise Advisory")}
            </div>
            <h1 className="fluid-h1 font-extrabold tracking-tight text-foreground mb-6">{t("Empowering organizations to master")}<span className="gradient-text">Gemini Enterprise</span>.
            </h1>
            <p className="fluid-body text-muted-foreground leading-relaxed">
              {t("MarketStar is a premier global enterprise go-to-market partner. We designed this intelligence platform to give technology leaders, architects, and procurement officers total transparency into Google Workspace AI capabilities, plans, connectors, and security controls.")}
            </p>
          </div>
        </div>
      </section>

      {/* Brand Alignment & Attribution */}
      <section className="py-16 border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-3 p-8 rounded-3xl border border-slate-200/80 bg-white/70 shadow-[0_16px_40px_-25px_rgba(0,0,0,0.06)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/60">
              <MarketStarLogo className="h-6 w-auto object-contain" />
              <span className="text-xs text-muted-foreground">{t("Premier Enterprise GTM & AI Acceleration Partner")}</span>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3 p-8 rounded-3xl border border-slate-200/80 bg-white/70 shadow-[0_16px_40px_-25px_rgba(0,0,0,0.06)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/60">
              <Image
                src="/brand/google-workspace-wordmark.png"
                alt="Google Workspace"
                width={960}
                height={124}
                className="h-auto w-40"
              />
              <span className="text-xs text-muted-foreground">{t("Google Workspace Commercial Ecosystem")}</span>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3 p-8 rounded-3xl border border-slate-200/80 bg-white/70 shadow-[0_16px_40px_-25px_rgba(0,0,0,0.06)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/60">
              <GoogleCloudLogo className="h-7 w-auto" />
              <span className="text-xs text-muted-foreground">{t("Google Cloud Infrastructure & Model Foundation")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Purpose */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-google-blue block mb-2">{t("Why We Built This Platform")}</span>
              <h2 className="fluid-h2 font-bold text-foreground mb-6">{t("Clarity in an era of rapid AI expansion")}</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                <p>
                  {t("As Google continues to add AI capabilities across Workspace and Gemini Enterprise, procurement teams need clear information about which features belong to each edition and what limits apply.")}
                </p>
                <p>
                  {t("This platform brings together {features} catalog entries and {plans} currently listed plan options, with side-by-side comparisons and planning tools. Coverage and source detail vary by feature, so check the linked Google documentation before making a purchasing or compliance decision.", { features: features.length, plans: plans.length })}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/compare"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-google-blue via-gemini-indigo to-gemini-purple text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-google-blue/20 transition-all text-sm shadow-md"
                >
                  {t("Explore Plan Matrix")}<ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200/80 bg-white/70 hover:bg-white/90 text-foreground font-semibold rounded-2xl shadow-sm backdrop-blur-xl transition-all text-sm dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
                >
                  Directory of {features.length} Features
                </Link>
              </div>
            </div>

            {/* Strategic Pillars */}
            <div className="space-y-5">
              <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-7 shadow-[0_16px_40px_-25px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-all hover:border-google-green/40 dark:border-white/10 dark:bg-slate-950/60">
                <div className="flex items-center gap-3 mb-2 font-bold text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-google-green" />{t("Independent Technical Transparency")}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("Feature notes link to Google product and technical documentation where available. Source coverage varies by entry.")}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-7 shadow-[0_16px_40px_-25px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-all hover:border-google-blue/40 dark:border-white/10 dark:bg-slate-950/60">
                <div className="flex items-center gap-3 mb-2 font-bold text-foreground">
                  <ShieldCheck className="w-5 h-5 text-google-blue" />{t("Enterprise Privacy & Governance First")}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("We highlight governance and privacy controls described in Google's documentation. Contract terms and compliance scope depend on the service and subscription.")}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-7 shadow-[0_16px_40px_-25px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-all hover:border-gemini-purple/40 dark:border-white/10 dark:bg-slate-950/60">
                <div className="flex items-center gap-3 mb-2 font-bold text-foreground">
                  <Globe2 className="w-5 h-5 text-gemini-purple" />{t("Ecosystem Go-To-Market Expertise")}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("MarketStar provides full-lifecycle deployment advisory, from initial pilot sizing and ROI justification to global domain rollout.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
