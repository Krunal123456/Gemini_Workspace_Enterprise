import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { plans } from "@/data/plans";
import { features } from "@/data/features";
import { formatCurrency } from "@/lib/utils";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
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

interface PlanDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return plans.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PlanDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const plan = plans.find((p) => p.slug === slug);

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
  const { slug } = await params;
  const plan = plans.find((p) => p.slug === slug);

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
            <ArrowLeft className="w-4 h-4" />
            Back to all Plans
          </Link>
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
                <strong className="text-foreground">Target Audience:</strong> {plan.idealFor}
              </div>
            </div>

            {/* Pricing Box */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm lg:min-w-[320px] flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                  Commercial Rate
                </span>
                {plan.annualPriceUSD ? (
                  <div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-4xl font-extrabold text-foreground">
                        {formatCurrency(plan.annualPriceUSD)}
                      </span>
                      <span className="text-sm text-muted-foreground">/ user / mo</span>
                    </div>
                    <span className="text-xs text-muted-foreground block mb-6">
                      Billed annually ({formatCurrency(plan.monthlyPriceUSD || plan.annualPriceUSD)} monthly flexible)
                    </span>
                  </div>
                ) : (
                  <div className="mb-6">
                    <span className="text-2xl font-bold text-foreground block">Enterprise Agreement</span>
                    <span className="text-xs text-muted-foreground">Custom pricing via Google or Partner</span>
                  </div>
                )}
              </div>

              <Link
                href={`/compare?tab=calculator`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-google-blue to-gemini-indigo text-white font-medium rounded-xl hover:shadow-lg transition-all text-sm text-center"
              >
                Calculate Team Investment
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Specifications Body */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Core Architecture Matrix */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-google-blue block mb-2">
            Technical Architecture
          </span>
          <h2 className="fluid-h2 font-bold text-foreground mb-8">
            Core AI & Platform Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">
                Generative AI Integration
              </span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.generativeAI}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">
                Model Checkpoint Access
              </span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.modelAccess}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">
                Grounding & Citations
              </span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.grounding}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">
                Deep Research Quota
              </span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.deepResearch}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">
                NotebookLM Access
              </span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.notebookLMAccess}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">
                Connectors & Knowledge Indexing
              </span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.connectors}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">
                Agents & Model Context Protocol (MCP)
              </span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.agentsAndMCP}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">
                Security & Model Armor
              </span>
              <p className="font-semibold text-foreground text-sm">
                {plan.coreCapabilities.securityLevel}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">
                Cloud Audit Logging
              </span>
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
              <h3 className="text-xl font-bold text-foreground">
                Highlighted Entitlements
              </h3>
              <p className="text-xs text-muted-foreground">
                {availableFeatures.length} of 89 features available in this edition
              </p>
            </div>
            <Link
              href="/compare"
              className="text-xs font-semibold text-google-blue hover:underline inline-flex items-center gap-1"
            >
              Inspect all in side-by-side matrix <ArrowRight className="w-3.5 h-3.5" />
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

        {/* Back Link & CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all Plans
          </Link>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 px-6 py-3 bg-google-blue text-white font-semibold rounded-xl hover:bg-google-blue/90 transition-all text-sm"
          >
            Compare {plan.name} in 11-Plan Matrix
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
