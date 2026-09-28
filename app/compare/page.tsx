import React, { Suspense } from 'react';

import { CompareTabs } from './CompareTabs';
import { FreshnessPanel } from '@/components/insights/FreshnessPanel';
import { ReadinessQuestionnaire } from '@/components/onboarding/ReadinessQuestionnaire';
import { plans } from '@/data/plans';
import { features } from '@/data/features';

export const metadata = {
  title: 'Compare Plans | Gemini Enterprise Intelligence',
  description: 'Compare listed Workspace and Gemini Enterprise plan details, feature notes, and editable rollout assumptions.',
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-sm font-medium text-muted-foreground mb-6">
            <span className="w-2 h-2 rounded-full bg-google-blue animate-pulse" />
            Workspace + Gemini Enterprise · {plans.length} listed plan options
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 max-w-4xl">
            Google Workspace &{" "}
            <span className="text-google-blue">
              Gemini Plan Comparison
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
            Explore the current catalog, compare plan notes, and model a rollout using assumptions you can adjust.
          </p>
        </div>
      </section>

      <section className="px-4 pb-10 pt-8 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 grid gap-8 rounded-[30px] border border-border bg-card p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-google-blue">Comparison scope</p>
              <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-foreground">Compare plan details against your requirements.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                The matrix organizes listed plan options and feature notes. It is a research aid, not a vendor ranking or a substitute for Google's current edition documentation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:min-w-[280px]">
              <div className="rounded-2xl border border-border bg-background p-4">
                <span className="text-3xl font-bold tracking-tight text-foreground">{plans.length}</span>
                <span className="mt-1 block text-xs text-muted-foreground">listed plan options</span>
              </div>
              <div className="rounded-2xl border border-border bg-background p-4">
                <span className="text-3xl font-bold tracking-tight text-foreground">{features.length}</span>
                <span className="mt-1 block text-xs text-muted-foreground">feature catalog entries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with Tabs */}
      <section className="py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<div className="h-96 flex items-center justify-center text-muted-foreground">Loading comparison tools...</div>}>
            <CompareTabs />
          </Suspense>

          <div className="mt-12 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <FreshnessPanel />
            <ReadinessQuestionnaire />
          </div>
        </div>
      </section>
    </div>
  );
}
