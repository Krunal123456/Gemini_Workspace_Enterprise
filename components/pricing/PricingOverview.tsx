"use client";

import { useLocalizedData } from "@/lib/i18n/use-localized-data";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Minus, Plus, Sparkles } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

type PricingMode = "workspace" | "standalone";

const modePlans: Record<PricingMode, string[]> = {
  workspace: ["business-standard", "business-plus", "ai-expanded"],
  standalone: ["gemini-enterprise-business", "gemini-enterprise-standard", "gemini-enterprise-plus", "gemini-enterprise-payg"],
};

export function PricingOverview() {
  const { models, plans } = useLocalizedData();
  const { locale } = useLocale();
  const t = createPhraseTranslator(locale);
  const [mode, setMode] = useState<PricingMode>("workspace");
  const [seats, setSeats] = useState(25);
  const [isAnnual, setIsAnnual] = useState(true);

  const visiblePlans = useMemo(
    () => modePlans[mode].map((id) => plans.find((plan) => plan.id === id)).filter(Boolean),
    [mode],
  );

  const getPrice = (plan: (typeof plans)[number]) =>
    isAnnual ? plan.annualPriceUSD : plan.monthlyPriceUSD;

  const updateSeats = (delta: number) => {
    setSeats((current) => Math.min(5000, Math.max(5, current + delta)));
  };

  return (
    <div className="space-y-16">
      <section className="rounded-3xl border border-white/40 dark:border-white/10 bg-white/75 dark:bg-slate-900/60 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_50px_-25px_rgba(99,102,241,0.15)] dark:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-google-blue">{t("Build your estimate")}</p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{t("Choose how you want to deploy Gemini.")}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t("Public list pricing is a starting point. Use the controls to model a pilot or a full organization rollout.")}
            </p>
          </div>
          <div className="inline-flex rounded-2xl border border-border/80 bg-muted/40 backdrop-blur-md p-1" role="group" aria-label="Deployment type">
            <button
              type="button"
              onClick={() => setMode("workspace")}
              className={cn("rounded-xl px-4 py-2.5 text-sm font-semibold transition-all", mode === "workspace" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >
              I have Google Workspace
            </button>
            <button
              type="button"
              onClick={() => setMode("standalone")}
              className={cn("rounded-xl px-4 py-2.5 text-sm font-semibold transition-all", mode === "standalone" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >
              I want standalone Gemini
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-t border-border/60 pt-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">How many seats do you need?</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("Adjust from 5 to 5,000 users.")}</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-background/80 backdrop-blur p-1">
                <button type="button" onClick={() => updateSeats(-5)} aria-label="Remove five seats" className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition"><Minus className="h-4 w-4" /></button>
                <span className="min-w-20 text-center font-mono text-lg font-bold text-foreground">{seats.toLocaleString()}</span>
                <button type="button" onClick={() => updateSeats(5)} aria-label="Add five seats" className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition"><Plus className="h-4 w-4" /></button>
              </div>
            </div>
            <input type="range" min="5" max="5000" step="5" value={seats} onChange={(event) => setSeats(Number(event.target.value))} className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-google-blue" aria-label="Number of seats" />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>5</span><span>2,500</span><span>5,000</span></div>
          </div>
          <div className="inline-flex items-center rounded-2xl border border-border/80 bg-muted/40 backdrop-blur-md p-1">
            <button type="button" onClick={() => setIsAnnual(true)} className={cn("rounded-xl px-4 py-2.5 text-sm font-semibold transition-all", isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>Annual commitment <span className="ml-1 text-xs text-google-green">Save ~17%</span></button>
            <button type="button" onClick={() => setIsAnnual(false)} className={cn("rounded-xl px-4 py-2.5 text-sm font-semibold transition-all", !isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>Flexible monthly</button>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-google-blue">{mode === "workspace" ? "Workspace customers" : "Standalone customers"}</p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Plans that scale with your rollout</h2>
          </div>
          <Link href="/compare" className="hidden items-center gap-2 text-sm font-semibold text-google-blue hover:underline sm:inline-flex">Compare all plans <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className={cn("grid gap-6", visiblePlans.length === 2 ? "lg:grid-cols-2" : visiblePlans.length > 3 ? "lg:grid-cols-2 xl:grid-cols-4" : "lg:grid-cols-3")}>
          {visiblePlans.map((plan, index) => {
            if (!plan) return null;
            const price = getPrice(plan);
            const total = price ? price * seats : null;
            return (
              <article key={plan.id} className={cn("flex flex-col rounded-3xl border bg-white/75 dark:bg-slate-900/60 backdrop-blur-2xl p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl", index === 0 && mode === "workspace" ? "border-google-blue/50 ring-2 ring-google-blue/20" : "border-white/50 dark:border-white/10 hover:border-google-blue/40")}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{plan.shortName}</p>
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  </div>
                </div>
                <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">{plan.tagline}</p>
                <div className="my-6 border-y border-border/60 py-5">
                  {price ? <><div className="flex items-baseline gap-1"><span className="text-4xl font-extrabold text-foreground">{formatCurrency(price)}</span><span className="text-xs text-muted-foreground">/ user / month</span></div><p className="mt-1 text-xs text-muted-foreground">{isAnnual ? "Annual commitment rate; billed per local subscription terms" : "Flexible monthly rate"}</p><p className="mt-3 text-sm font-semibold text-foreground">{formatCurrency(total || 0)} / month at {seats.toLocaleString()} seats</p></> : plan.startingPriceUSD ? <><div className="flex items-baseline gap-1"><span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Starting at</span><span className="text-4xl font-extrabold text-foreground">{formatCurrency(plan.startingPriceUSD)}</span></div><p className="mt-1 text-xs text-muted-foreground">/ seat / month · confirm with Google Cloud</p><p className="mt-3 text-sm text-muted-foreground">Edition-specific pricing may vary.</p></> : <><span className="text-xl font-bold text-foreground">{plan.id === "gemini-enterprise-payg" ? "$0 seat fee" : "See current pricing"}</span><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{plan.pricingNote}</p></>}
                </div>
                <div className="mb-6 space-y-2.5">
                  {plan.highlightedFeatures.slice(0, 5).map((feature) => <div key={feature} className="flex items-start gap-2 text-sm text-foreground/90"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-google-green" /><span>{feature}</span></div>)}
                </div>
                <div className="mt-auto flex items-center justify-between gap-4 border-t border-border/60 pt-5">
                  <Link href={`/plans/${plan.slug}`} className="text-sm font-semibold text-google-blue hover:underline">View plan</Link>
                  <Link href={`/compare?tab=calculator&plan=${plan.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-google-blue">Model quote <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-white/40 dark:border-white/10 bg-white/75 dark:bg-slate-900/60 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_50px_-25px_rgba(99,102,241,0.15)] dark:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)]">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-google-blue">Gemini API reference</p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Published model rates</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              API token rates are separate from Workspace and Gemini Enterprise subscriptions. Rates can depend on model, prompt size, modality, and billing options.
            </p>
          </div>
          <a href="https://ai.google.dev/gemini-api/docs/pricing" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-google-blue hover:underline">
            Check Google's pricing page <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/80 bg-background/70 backdrop-blur-xl">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Model</th>
                <th className="px-4 py-3 font-semibold">Input / 1M tokens</th>
                <th className="px-4 py-3 font-semibold">Output / 1M tokens</th>
                <th className="px-4 py-3 font-semibold">Pricing note</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr key={model.id} className="border-t border-border align-top">
                  <td className="border-t border-border px-4 py-4">
                    <a href={model.source} target="_blank" rel="noreferrer" className="font-semibold text-foreground hover:text-google-blue hover:underline">{model.name}</a>
                    <span className="mt-1 block text-xs text-muted-foreground">{model.status} · {model.family}</span>
                  </td>
                  <td className="border-t border-border px-4 py-4 font-mono text-foreground">{model.apiPricing ? `$${model.apiPricing.inputUsd.toFixed(2)}` : "See model pricing"}</td>
                  <td className="border-t border-border px-4 py-4 font-mono text-foreground">{model.apiPricing ? `$${model.apiPricing.outputUsd.toFixed(2)}` : "See model pricing"}</td>
                  <td className="border-t border-border px-4 py-4 text-xs leading-relaxed text-muted-foreground">{model.apiPricing?.context}{model.pricingNote ? ` · ${model.pricingNote}` : "Rates may vary by modality and usage type."}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Displayed rates are USD list references. Check the linked model documentation for current rates, input-size tiers, and other pricing conditions before estimating API spend.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {["Commitment", "Deployment", "Consolidation"].map((title, index) => (
          <div key={title} className="rounded-3xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-google-blue/10 text-google-blue border border-google-blue/20 backdrop-blur-xs"><Sparkles className="h-5 w-5" /></div>
            <h3 className="font-bold text-foreground">{index === 0 ? t("Annual contracts") : index === 1 ? t("Start with a pilot") : t("Consolidate your stack")}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{index === 0 ? t("Annual commitments reduce the public list price and create predictable budgeting.") : index === 1 ? t("Decide whether AI goes to every user now or begins with a focused team.") : t("Compare these add-ons against the third-party AI tools your organization already funds.")}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
