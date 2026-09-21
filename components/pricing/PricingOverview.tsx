"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Minus, Plus, Sparkles } from "lucide-react";
import { plans } from "@/data/plans";
import { cn, formatCurrency } from "@/lib/utils";

type PricingMode = "workspace" | "standalone";

const modePlans: Record<PricingMode, string[]> = {
  workspace: ["ai-expanded", "ai-ultra"],
  standalone: ["gemini-enterprise-business", "gemini-enterprise-standard", "gemini-enterprise-plus"],
};

export function PricingOverview() {
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
      <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-google-blue">Build your estimate</p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Choose how you want to deploy Gemini.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Public list pricing is a starting point. Use the controls to model a pilot or a full organization rollout.
            </p>
          </div>
          <div className="inline-flex rounded-xl border border-border bg-muted/60 p-1" role="group" aria-label="Deployment type">
            <button
              type="button"
              onClick={() => setMode("workspace")}
              className={cn("rounded-lg px-4 py-2.5 text-sm font-semibold transition", mode === "workspace" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >
              I have Google Workspace
            </button>
            <button
              type="button"
              onClick={() => setMode("standalone")}
              className={cn("rounded-lg px-4 py-2.5 text-sm font-semibold transition", mode === "standalone" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >
              I want standalone Gemini
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-t border-border pt-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">How many seats do you need?</p>
                <p className="mt-1 text-xs text-muted-foreground">Adjust from 5 to 5,000 users.</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-1">
                <button type="button" onClick={() => updateSeats(-5)} aria-label="Remove five seats" className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"><Minus className="h-4 w-4" /></button>
                <span className="min-w-20 text-center font-mono text-lg font-bold text-foreground">{seats.toLocaleString()}</span>
                <button type="button" onClick={() => updateSeats(5)} aria-label="Add five seats" className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"><Plus className="h-4 w-4" /></button>
              </div>
            </div>
            <input type="range" min="5" max="5000" step="5" value={seats} onChange={(event) => setSeats(Number(event.target.value))} className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-google-blue" aria-label="Number of seats" />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>5</span><span>2,500</span><span>5,000</span></div>
          </div>
          <div className="inline-flex items-center rounded-xl border border-border bg-muted/60 p-1">
            <button type="button" onClick={() => setIsAnnual(true)} className={cn("rounded-lg px-4 py-2.5 text-sm font-semibold transition", isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>Annual commitment <span className="ml-1 text-xs text-google-green">Save ~17%</span></button>
            <button type="button" onClick={() => setIsAnnual(false)} className={cn("rounded-lg px-4 py-2.5 text-sm font-semibold transition", !isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>Flexible monthly</button>
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
        <div className={cn("grid gap-6", visiblePlans.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3")}>
          {visiblePlans.map((plan, index) => {
            if (!plan) return null;
            const price = getPrice(plan);
            const total = price ? price * seats : null;
            return (
              <article key={plan.id} className={cn("flex flex-col rounded-2xl border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg", index === 0 && mode === "workspace" ? "border-google-blue/50 ring-1 ring-google-blue/20" : "border-border")}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{plan.shortName}</p>
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  </div>
                  {index === 0 && <span className="rounded-full bg-google-blue/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-google-blue">Popular</span>}
                </div>
                <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">{plan.tagline}</p>
                <div className="my-6 border-y border-border py-5">
                  {price ? <><div className="flex items-baseline gap-1"><span className="text-4xl font-extrabold text-foreground">{formatCurrency(price)}</span><span className="text-xs text-muted-foreground">/ user / month</span></div><p className="mt-1 text-xs text-muted-foreground">{isAnnual ? "Annual commitment, billed annually" : "Flexible monthly billing"}</p><p className="mt-3 text-sm font-semibold text-foreground">Total: {formatCurrency(total || 0)} / month</p></> : <><span className="text-2xl font-bold text-foreground">Contact us</span><p className="mt-1 text-xs text-muted-foreground">Custom contract sizing and volume pricing</p></>}
                </div>
                <div className="mb-6 space-y-2.5">
                  {plan.highlightedFeatures.slice(0, 5).map((feature) => <div key={feature} className="flex items-start gap-2 text-sm text-foreground/90"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-google-green" /><span>{feature}</span></div>)}
                </div>
                <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-5">
                  <Link href={`/plans/${plan.slug}`} className="text-sm font-semibold text-google-blue hover:underline">View plan</Link>
                  <Link href={`/compare?tab=calculator&plan=${plan.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-google-blue">Model quote <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-[30px] border border-border bg-card p-5 shadow-[0_30px_80px_-40px_rgba(59,130,246,0.45)] sm:p-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-google-blue/20 bg-google-blue/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-google-blue">
              <Sparkles className="h-3.5 w-3.5" />
              Token pricing
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Public pricing per 1M tokens</h2>
          </div>
          <div className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            USD list pricing
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-muted/30 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Best value</p>
            <p className="mt-2 text-lg font-bold text-foreground">Gemini 2.5 Flash</p>
            <p className="mt-1 text-sm text-muted-foreground">Balanced speed, reasoning, and cost efficiency for enterprise work.</p>
          </div>
          <div className="rounded-2xl border border-border bg-muted/30 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Standard credit</p>
            <p className="mt-2 text-lg font-bold text-foreground">$10</p>
            <p className="mt-1 text-sm text-muted-foreground">Applied to the final estimated usage total.</p>
          </div>
          <div className="rounded-2xl border border-border bg-muted/30 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Plus credit</p>
            <p className="mt-2 text-lg font-bold text-foreground">$15</p>
            <p className="mt-1 text-sm text-muted-foreground">Higher-end support and additional enterprise value.</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-[24px] border border-border bg-background">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-google-blue/8 via-gemini-indigo/8 to-google-green/8 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <th className="px-4 py-3 font-medium">Model</th>
                <th className="px-4 py-3 font-medium">Input / 1M</th>
                <th className="px-4 py-3 font-medium">Output / 1M</th>
                <th className="px-4 py-3 font-medium">Usage cost</th>
                <th className="px-4 py-3 font-medium">Standard net</th>
                <th className="px-4 py-3 font-medium">Plus net</th>
              </tr>
            </thead>
            <tbody>
              {[
                { model: "Gemini 2.5 Flash", input: 0.3, output: 2.5, usage: 2.8, featured: true },
                { model: "Gemini 2.5 Pro", input: 1.25, output: 10, usage: 11.25, featured: false },
                { model: "Gemini 2.5 Flash-Lite", input: 0.1, output: 0.4, usage: 0.5, featured: false },
                { model: "GPT-4.1 mini", input: 0.4, output: 1.6, usage: 2.0, featured: false },
                { model: "Claude 3.5 Sonnet", input: 3, output: 15, usage: 18, featured: false },
                { model: "Mistral Large", input: 2, output: 6, usage: 8, featured: false },
              ].map((row) => {
                const standardNet = Math.max(0, row.usage - 10);
                const plusNet = Math.max(0, row.usage - 15);

                return (
                  <tr key={row.model} className={row.featured ? "bg-google-blue/5" : "bg-transparent"}>
                    <td className="border-t border-border px-4 py-3 font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <span>{row.model}</span>
                        {row.featured && <span className="rounded-full bg-google-blue/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-google-blue">Best value</span>}
                      </div>
                    </td>
                    <td className="border-t border-border px-4 py-3 text-google-blue">${row.input.toFixed(2)}</td>
                    <td className="border-t border-border px-4 py-3 text-google-blue">${row.output.toFixed(2)}</td>
                    <td className="border-t border-border px-4 py-3 font-medium text-foreground">${row.usage.toFixed(2)}</td>
                    <td className="border-t border-border px-4 py-3 text-google-green">${standardNet.toFixed(2)}</td>
                    <td className="border-t border-border px-4 py-3 text-google-green">${plusNet.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-2xl border border-google-blue/20 bg-google-blue/5 p-4 text-sm text-muted-foreground">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="font-semibold text-foreground">Credit logic:</span> Gemini Enterprise Standard gets a $10 free credit and Gemini Enterprise Plus gets a $15 free credit. The credit is applied at the end to the estimated usage total.
            </div>
            <div className="rounded-full border border-border bg-background px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-google-blue">
              Net = usage - credit
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {["Commitment", "Deployment", "Consolidation"].map((title, index) => (
          <div key={title} className="rounded-2xl border border-border bg-muted/30 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-google-blue/10 text-google-blue"><Sparkles className="h-5 w-5" /></div>
            <h3 className="font-bold text-foreground">{index === 0 ? "Annual contracts" : index === 1 ? "Start with a pilot" : "Consolidate your stack"}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{index === 0 ? "Annual commitments reduce the public list price and create predictable budgeting." : index === 1 ? "Decide whether AI goes to every user now or begins with a focused team." : "Compare these add-ons against the third-party AI tools your organization already funds."}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
