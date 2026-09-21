import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { plans } from "@/data/plans";
import { formatCurrency } from "@/lib/utils";
import { 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Layers, 
  HardDrive, 
  Users,
  ChevronRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Google Workspace & Gemini Enterprise Plans | 11 Editions Compared",
  description: "Explore all 11 commercial editions across Google Workspace, AI Add-ons (Expanded, Ultra), and standalone Gemini Enterprise (Business, Standard, Plus, Frontline).",
};

export default function PlansPage() {
  const categories = [
    { name: "Gemini Enterprise", tag: "Standalone Governed AI Platform" },
    { name: "AI Add-ons", tag: "Enhance Existing Workspace Plans" },
    { name: "Google Workspace", tag: "Foundational Collaboration Suites" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-24 pb-16 border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-blue/10 text-google-blue text-xs font-semibold uppercase tracking-wider mb-4 border border-google-blue/20">
              <CreditCard className="w-3.5 h-3.5" /> Commercial Licensing
            </div>
            <h1 className="fluid-h1 font-extrabold tracking-tight text-foreground mb-6">
              Every plan, edition & tier <span className="gradient-text">clearly structured</span>.
            </h1>
            <p className="fluid-body text-muted-foreground leading-relaxed">
              Understand the pricing, storage allowances, Deep Research quotas, and enterprise connector rights across all 11 Google Workspace and Gemini Enterprise editions.
            </p>
          </div>
        </div>
      </section>

      {/* Plan Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 space-y-20">
          {categories.map((cat) => {
            const catPlans = plans.filter((p) => p.category === cat.name);

            return (
              <div key={cat.name}>
                <div className="mb-8 border-b border-border/60 pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{cat.name}</h2>
                    <p className="text-sm text-muted-foreground">{cat.tag}</p>
                  </div>
                  <Link
                    href={`/compare`}
                    className="text-xs font-semibold text-google-blue hover:underline inline-flex items-center gap-1"
                  >
                    Compare in matrix <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {catPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="group rounded-2xl border border-border bg-card p-8 shadow-sm flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-1 transition-all"
                    >
                      <div>
                        {/* Plan Header */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                            {plan.shortName}
                          </span>
                          {plan.id === "gemini-enterprise-plus" && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gemini-indigo/10 text-gemini-indigo border border-gemini-indigo/20">
                              Flagship
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-google-blue transition-colors">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                          {plan.tagline}
                        </p>

                        {/* Price Display */}
                        <div className="mb-6 p-4 rounded-xl bg-muted/30 border border-border/60">
                          {plan.annualPriceUSD ? (
                            <div>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-extrabold text-foreground">
                                  {formatCurrency(plan.annualPriceUSD)}
                                </span>
                                <span className="text-xs text-muted-foreground">/ user / mo</span>
                              </div>
                              <span className="text-[11px] text-muted-foreground">
                                Annual commitment ({formatCurrency(plan.monthlyPriceUSD || plan.annualPriceUSD)} billed monthly)
                              </span>
                            </div>
                          ) : (
                            <div>
                              <span className="text-2xl font-bold text-foreground">Enterprise Pricing</span>
                              <span className="text-[11px] text-muted-foreground block">
                                Custom contract sizing & volume tiering
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Storage & Participant Limits */}
                        <div className="space-y-2 mb-6 text-xs text-muted-foreground border-b border-border/60 pb-4">
                          <div className="flex items-center gap-2">
                            <HardDrive className="w-4 h-4 text-google-blue shrink-0" />
                            <span>{plan.storage}</span>
                          </div>
                          {plan.participantLimit && (
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-google-green shrink-0" />
                              <span>{plan.participantLimit} video call participants</span>
                            </div>
                          )}
                        </div>

                        {/* Highlights */}
                        <div className="space-y-2 mb-6">
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                            Key Entitlements
                          </span>
                          {plan.highlightedFeatures.slice(0, 4).map((h, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-foreground/90">
                              <CheckCircle2 className="w-3.5 h-3.5 text-google-green shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer link */}
                      <div className="pt-4 border-t border-border flex items-center justify-between">
                        <Link
                          href={`/plans/${plan.slug}`}
                          className="text-xs font-semibold text-google-blue group-hover:underline inline-flex items-center gap-1"
                        >
                          View plan specs
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/compare?tab=calculator`}
                          className="text-xs font-medium text-muted-foreground hover:text-foreground"
                        >
                          Calculate ROI
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
