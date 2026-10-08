"use client";

import Link from "next/link";
import { getPlans } from "@/lib/i18n/data";
import type { Plan } from "@/types";
import { useLocale } from "@/lib/i18n/locale-context";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getFeatures } from "@/lib/i18n/features";
import { ArrowRight, ExternalLink } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const previewPlanIds = [
  "business-standard",
  "business-plus",
  "gemini-enterprise-business",
  "gemini-enterprise-standard",
] as const;


function getPriceLabel(plan: Plan, labels: ReturnType<typeof getDictionary>["comparison"]) {
  if (plan.annualPriceUSD) return `${formatCurrency(plan.annualPriceUSD)} ${labels.perUser}`;
  if (plan.startingPriceUSD) return `${labels.from} ${formatCurrency(plan.startingPriceUSD)} ${labels.perSeat}`;
  return plan.pricingNote || labels.checkPricing;
}

export default function ComparisonPreview() {
  const { locale, href } = useLocale();
  const labels = getDictionary(locale).comparison;
  const plans = getPlans(locale);
  const features = getFeatures(locale);
  const previewPlans = previewPlanIds
    .map((id) => plans.find((plan) => plan.id === id))
    .filter((plan) => plan !== undefined);
  return (
    <section className="atlas-section bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="atlas-kicker mb-3">{labels.kicker}</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {labels.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {labels.body}
            </p>
          </div>
          <Link href={href("/compare")} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90">
            {labels.openMatrix.replace("{count}", String(plans.length))} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white/70 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/60">
          <table className="min-w-[920px] w-full border-separate border-spacing-0 text-left">
            <thead>
              <tr className="bg-slate-50/80 text-xs uppercase tracking-wider text-muted-foreground dark:bg-white/[0.03]">
                <th className="sticky left-0 z-10 min-w-48 border-b border-border/80 bg-slate-50/90 px-5 py-4 font-semibold backdrop-blur dark:bg-slate-900/90">{labels.detail}</th>
                {previewPlans.map((plan) => (
                  <th key={plan.id} className="min-w-52 border-b border-border/80 px-5 py-4 align-top">
                    <span className="block text-[10px] font-semibold text-google-blue">{plan.category}</span>
                    <Link href={href(`/plans/${plan.slug}`)} className="mt-2 block text-base font-bold normal-case tracking-normal text-foreground hover:text-google-blue">{plan.name}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <th className="sticky left-0 border-b border-border/60 bg-white/80 px-5 py-5 font-semibold text-foreground backdrop-blur dark:bg-slate-950/80">{labels.publishedRate}</th>
                {previewPlans.map((plan) => (
                  <td key={plan.id} className="border-b border-border/60 px-5 py-5 align-top">
                    <span className="font-semibold text-foreground">{getPriceLabel(plan, labels)}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{plan.annualPriceUSD ? labels.annualNote : labels.startingNote}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <th className="sticky left-0 border-b border-border/60 bg-white/80 px-5 py-5 font-semibold text-foreground backdrop-blur dark:bg-slate-950/80">{labels.storage}</th>
                {previewPlans.map((plan) => (
                  <td key={plan.id} className="border-b border-border/60 px-5 py-5 align-top leading-relaxed text-muted-foreground">{plan.storage}</td>
                ))}
              </tr>
              <tr>
                <th className="sticky left-0 bg-white/80 px-5 py-5 font-semibold text-foreground backdrop-blur dark:bg-slate-950/80">{labels.summary}</th>
                {previewPlans.map((plan) => (
                  <td key={plan.id} className="px-5 py-5 align-top leading-relaxed text-muted-foreground">{plan.tagline}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl leading-relaxed">
            {labels.catalogView
              .replace("{plans}", String(plans.length))
              .replace("{features}", String(features.length))}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="https://workspace.google.com/pricing" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-google-blue hover:underline">{labels.workspacePrices} <ExternalLink className="h-3 w-3" /></a>
            <a href="https://cloud.google.com/gemini-enterprise" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-google-blue hover:underline">{labels.geminiPrices} <ExternalLink className="h-3 w-3" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
