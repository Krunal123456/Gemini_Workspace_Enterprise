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

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {previewPlans.map((plan) => (
            <article key={plan.id} className="flex min-h-[300px] flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-google-blue/35 sm:p-6">
              <p className="text-xs font-medium text-google-blue-text">{plan.category}</p>
              <h3 className="mt-2 min-h-12 text-lg font-semibold leading-snug text-foreground">
                <Link href={href(`/plans/${plan.slug}`)} className="rounded-sm outline-none hover:text-google-blue focus-visible:ring-2 focus-visible:ring-google-blue">{plan.name}</Link>
              </h3>

              <div className="mt-5">
                <p className="text-xl font-semibold tracking-tight text-foreground">{getPriceLabel(plan, labels)}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{plan.annualPriceUSD ? labels.annualNote : labels.startingNote}</p>
              </div>

              <dl className="mt-5 border-t border-border pt-4">
                <dt className="text-[11px] font-semibold text-muted-foreground">{labels.storage}</dt>
                <dd className="mt-1 text-sm leading-5 text-foreground">{plan.storage}</dd>
              </dl>
              <p className="mt-3 flex-1 text-xs leading-5 text-muted-foreground">{plan.tagline}</p>
              <Link href={href(`/plans/${plan.slug}`)} className="mt-5 inline-flex min-h-10 items-center gap-1.5 border-t border-border pt-3 text-xs font-semibold text-google-blue-text hover:underline">
                {locale === "es" ? "Detalles del plan" : "Plan details"}<ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
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
