import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, GitBranch, LayoutGrid, ArrowLeftRight } from "lucide-react";
import { getPlans } from "@/lib/i18n/data";
import { getFeatures } from "@/lib/i18n/features";
import { resolveLocale, type Locale } from "@/lib/i18n/config";
import { PlanMindMap } from "@/components/mindmap/PlanMindMap";

export const metadata: Metadata = {
  title: "Plan Mind Map | Gemini Enterprise AI Intelligence",
  description:
    "Explore all 20 Google Workspace and Gemini Enterprise plans in an interactive mind map. Click any plan to instantly browse its AI features.",
};

export default async function MindMapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const plans   = getPlans(locale);
  const features = getFeatures(locale);

  return (
    // Full-height page — no scroll, canvas fills remaining space
    <div className="flex flex-col bg-gray-50 dark:bg-gray-950" style={{ height: "100dvh" }}>

      {/* ── Page header bar ── */}
      <div className="shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pt-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mb-3">
            <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/plans" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Plans</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Mind Map</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[11px] font-semibold">
                  <GitBranch className="w-3 h-3" /> Interactive
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Plan Ecosystem{" "}
                <span className="gradient-text">Mind Map</span>
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {plans.length} plans · Click any node to explore features · Scroll to zoom · Drag to pan
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/plans"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                <LayoutGrid className="w-3.5 h-3.5" /> All Plans
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" /> Compare
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mind map canvas fills all remaining space ── */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <PlanMindMap plans={plans} features={features} />
      </div>
    </div>
  );
}
