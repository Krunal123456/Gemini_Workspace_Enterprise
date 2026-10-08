"use client";

import { useLocalizedData } from "@/lib/i18n/use-localized-data";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, Sparkles } from "lucide-react";

export function GeminiProductExplorer() {
  const { features, plans } = useLocalizedData();
  const { locale, href } = useLocale();
  const t = createPhraseTranslator(locale);
  const geminiFeatures = features.filter((feature) => feature.application === "gemini");
  const planOptions = plans;
  const [selectedPlanId, setSelectedPlanId] = useState("enterprise-standard");
  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId) || plans[0];
  const groupedFeatures = useMemo(() => [
    { label: t("Gemini workspace"), items: geminiFeatures.filter((feature) => !feature.id.includes("enterprise-platform")) },
    { label: t("Gemini Enterprise"), items: geminiFeatures.filter((feature) => feature.id.includes("enterprise-platform")) },
  ], [geminiFeatures, t]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-google-blue">{t("Show availability for")}</p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">{t("Explore the Gemini capability map")}</h2>
        </div>
        <label className="flex flex-col gap-2 text-xs font-semibold text-muted-foreground sm:min-w-64">
          {t("Plan tier")}
          <select
            value={selectedPlanId}
            onChange={(event) => setSelectedPlanId(event.target.value)}
            className="rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 text-sm font-medium text-foreground backdrop-blur-xl outline-none transition focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 dark:border-white/10 dark:bg-white/[0.04]"
          >
            {planOptions.map((plan) => <option key={plan.id} value={plan.id} className="bg-background text-foreground">{plan.name}</option>)}
          </select>
        </label>
      </div>

      <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-google-green" /> {t("Included")}</span>
        <span className="inline-flex items-center gap-2"><Circle className="h-4 w-4 text-google-blue" /> {t("Limited or higher limits")}</span>
        <span className="font-semibold text-foreground">{selectedPlan.name}</span>
      </div>

      <div className="space-y-12">
        {groupedFeatures.map((group) => (
          <div key={group.label}>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-google-blue">{t("Capability group")}</p>
                <h3 className="text-xl font-bold text-foreground">{group.label}</h3>
              </div>
              <span className="text-xs text-muted-foreground">{t("{count} capabilities", { count: group.items.length })}</span>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((feature) => {
                const availability = feature.plans[selectedPlan.id];
                const included = availability?.available;
                const isLimited = availability?.status === "limited" || availability?.status === "higher_limits";
                return (
                  <Link
                    key={feature.id}
                    href={href(`/features/${feature.slug}`)}
                    className="group flex min-h-56 flex-col rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-[0_16px_40px_-25px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-google-blue/50 hover:shadow-[0_24px_50px_-20px_rgba(66,133,244,0.22)] dark:border-white/10 dark:bg-slate-950/60"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-google-blue/10 text-google-blue"><Sparkles className="h-5 w-5" /></div>
                      <span className={included ? "rounded-full bg-google-green/10 border border-google-green/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-google-green" : "rounded-full bg-slate-100/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground"}>
                        {included ? (isLimited ? t("Limited") : t("Included")) : availability ? t("Not included") : t("Not mapped")}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-foreground group-hover:text-google-blue transition-colors">{feature.name}</h4>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-5 text-xs font-semibold text-google-blue">{t("Open capability")} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
