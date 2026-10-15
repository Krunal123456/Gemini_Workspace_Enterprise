import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  GitBranch,
  LayoutGrid,
  ArrowLeftRight,
  Sparkles,
  Layers,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
  Users,
} from "lucide-react";
import { getPlans } from "@/lib/i18n/data";
import { getFeatures } from "@/lib/i18n/features";
import { resolveLocale, type Locale } from "@/lib/i18n/config";
import { PlanMindMap } from "@/components/mindmap/PlanMindMap";
import { withLocalizedAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  return withLocalizedAlternates({
    title: "Plan Mind Map | Gemini Enterprise AI Intelligence",
    description:
      "Explore the comprehensive visual architecture of all 20 Google Workspace and Gemini Enterprise plans. Discover plan connections, capabilities, and feature entitlements.",
  }, "/mindmap", locale);
}

export default async function MindMapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const plans = getPlans(locale);
  const features = getFeatures(locale);

  return (
    <main className="min-h-screen bg-background text-foreground pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
        <nav
          className="mb-6 flex items-center text-sm text-muted-foreground"
          aria-label="Breadcrumbs"
        >
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1.5 opacity-60" />
          <Link href="/plans" className="hover:text-foreground transition-colors">
            Plans
          </Link>
          <ChevronRight className="h-4 w-4 mx-1.5 opacity-60" />
          <span className="text-foreground font-semibold">Mind Map</span>
        </nav>

        {/* ── Hero Section ────────────────────────────────────────────────────── */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-8">
          <div className="max-w-3xl">
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <GitBranch className="h-3.5 w-3.5" />
              <span>Interactive Architecture • 20 Plans Across 4 Tiers</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl fluid-h1 mb-4">
              Google Workspace & Gemini{" "}
              <span className="gradient-text">Ecosystem Mind Map</span>
            </h1>
            <p className="text-base text-muted-foreground md:text-lg leading-relaxed">
              Explore how core Google Workspace editions, dedicated Gemini Enterprise tiers,
              and AI add-ons connect together. Click any plan node to inspect all included AI
              capabilities, quotas, and licensing rules.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/plans"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition-all shadow-sm"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Catalog View</span>
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-md"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              <span>Compare Matrix</span>
            </Link>
          </div>
        </div>

        {/* ── Interactive Mind Map Viewer ─────────────────────────────────────── */}
        <div className="mb-14">
          <PlanMindMap plans={plans} features={features} />
        </div>

        {/* ── Architecture Guide Cards ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">
              4 Structural Plan Tiers
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The Google Cloud portfolio divides into foundational Google Workspace (email/office),
              standalone Gemini Enterprise, attachable AI Add-ons (Gemini Business/Enterprise),
              and specialized Workspace Add-ons (Voice, AppSheet).
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">
              Context & Model Grounding
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Higher tiers unlock Gemini 2.5 Pro / Flash with large context windows (up to 2M tokens),
              custom fine-tuning, grounded enterprise search over Drive, and NotebookLM Enterprise grounding.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">
              Enterprise Data Governance
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Customer data is never used to train foundational AI models without consent. Enterprise Plus
              and Gemini Enterprise include advanced DLP, audit logging exports, and customer-managed keys (CMEK).
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
