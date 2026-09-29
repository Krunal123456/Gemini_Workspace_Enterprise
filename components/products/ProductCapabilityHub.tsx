"use client";

import { useLocalizedData } from "@/lib/i18n/use-localized-data";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, Sparkles } from "lucide-react";

type ProductCapabilityHubProps = {
  title: string;
  description: string;
  filterKey: "notebooklm" | "gemini-enterprise" | "workspace-studio" | "google-labs" | "developer-tools";
  eyebrow: string;
};

export function ProductCapabilityHub({ title, description, filterKey, eyebrow }: ProductCapabilityHubProps) {
  const { features, plans } = useLocalizedData();
  const { locale, href } = useLocale();
  const t = createPhraseTranslator(locale);
  const productFeatures = useMemo(() => features.filter((feature) => {
    if (filterKey === "notebooklm") return feature.application === "notebooklm";
    if (filterKey === "gemini-enterprise") return feature.application === "gemini" && (feature.id.includes("enterprise-platform") || feature.id === "gemini-connectors" || feature.id === "gemini-grounded-responses");
    return feature.id.startsWith(`${filterKey}-`);
  }), [filterKey, features]);
  const [selectedPlanId, setSelectedPlanId] = useState("enterprise-standard");
  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId) || plans[0];

  return (
    <div className="min-h-screen bg-background pb-24 text-foreground">
      <section className="border-b border-border/60 bg-muted/20 py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-google-blue">{t(eyebrow)}</p>
          <h1 className="fluid-h1 max-w-4xl font-extrabold tracking-tight">{t(title)}</h1>
          <p className="fluid-body mt-6 max-w-3xl leading-relaxed text-muted-foreground">{t(description)}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-google-blue">{t("Availability explorer")}</p>
              <h2 className="text-2xl font-bold tracking-tight">{t("{count} capabilities indexed", { count: productFeatures.length })}</h2>
            </div>
            <label className="flex flex-col gap-2 text-xs font-semibold text-muted-foreground sm:min-w-64">
              {t("Show availability for")}
              <select value={selectedPlanId} onChange={(event) => setSelectedPlanId(event.target.value)} className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground outline-none focus:border-google-blue focus:ring-2 focus:ring-google-blue/20">
                {plans.map((plan) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}
              </select>
            </label>
          </div>

          <div className="mb-8 flex flex-wrap gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-google-green" /> {t("Included")}</span>
            <span className="inline-flex items-center gap-2"><Circle className="h-4 w-4 text-google-blue" /> {t("Limited or elevated limits")}</span>
            <span className="font-medium text-foreground">{selectedPlan.name}</span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {productFeatures.map((feature) => {
              const availability = feature.plans[selectedPlan.id];
              const included = availability?.available;
              const limited = availability?.status === "limited" || availability?.status === "higher_limits";
              return (
                <Link key={feature.id} href={href(`/features/${feature.slug}`)} className="group flex min-h-56 flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-google-blue/50 hover:shadow-lg">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-google-blue/10 text-google-blue"><Sparkles className="h-5 w-5" /></div>
                    <span className={included ? "rounded-full bg-google-green/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-google-green" : "rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground"}>{included ? (limited ? t("Limited") : t("Included")) : availability ? t("Not included") : t("Not mapped")}</span>
                  </div>
                  <h3 className="font-bold text-foreground group-hover:text-google-blue">{feature.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-xs font-semibold text-google-blue">{t("Open feature")} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
