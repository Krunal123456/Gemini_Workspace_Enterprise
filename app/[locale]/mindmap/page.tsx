import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, GitBranch } from "lucide-react";
import { getPlans } from "@/lib/i18n/data";
import { getFeatures } from "@/lib/i18n/features";
import { resolveLocale, type Locale } from "@/lib/i18n/config";
import { PlanMindMap } from "@/components/mindmap/PlanMindMap";

export const metadata: Metadata = {
  title: "Plan Mind Map | Gemini Enterprise AI Intelligence",
  description:
    "Explore the full Google Workspace and Gemini Enterprise plan ecosystem as an interactive mind map. Click any plan node to see which AI features are available.",
};

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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Page Header */}
      <div className="border-b border-border/60 bg-muted/20 pt-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/plans" className="hover:text-foreground transition-colors">Plans</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Mind Map</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-blue/10 text-google-blue text-xs font-semibold uppercase tracking-wider mb-3 border border-google-blue/20">
                <GitBranch className="w-3.5 h-3.5" />
                Interactive Mind Map
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-2">
                Plan Ecosystem{" "}
                <span className="gradient-text">Mind Map</span>
              </h1>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Visualise all {plans.length} Google Workspace and Gemini Enterprise plans in one interactive canvas.{" "}
                <strong className="text-foreground">Click any plan node</strong> to instantly explore its available AI features and capabilities.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              <Link
                href="/plans"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all"
              >
                All Plans
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-google-blue text-white text-sm font-semibold hover:bg-google-blue/90 transition-all"
              >
                Compare Plans
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mind Map Canvas — fills remaining viewport */}
      <div className="flex-1" style={{ height: "calc(100vh - 200px)", minHeight: 560 }}>
        <PlanMindMap plans={plans} features={features} />
      </div>
    </div>
  );
}
