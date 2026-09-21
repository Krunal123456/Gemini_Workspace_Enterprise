import React, { Suspense } from 'react';
import { ArrowRight, BriefcaseBusiness, LineChart, ShieldCheck } from 'lucide-react';

import { CompareTabs } from './CompareTabs';
import { FreshnessPanel } from '@/components/insights/FreshnessPanel';
import { ReadinessQuestionnaire } from '@/components/onboarding/ReadinessQuestionnaire';

export const metadata = {
  title: 'Compare Plans | Gemini Enterprise Intelligence',
  description: 'Analyze feature availability, compare plans side-by-side, and calculate enterprise investment with complete transparency.',
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-sm font-medium text-muted-foreground mb-6">
            <span className="w-2 h-2 rounded-full bg-google-blue animate-pulse" />
            Decision Intelligence • 11 Plans Analyzed
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 max-w-4xl">
            Google Workspace &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-gemini-indigo to-gemini-purple">
              Gemini Plan Comparison
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
            Analyze feature availability, compare plans side-by-side, and calculate enterprise investment with complete transparency.
          </p>
        </div>
      </section>

      <section className="px-4 pb-10 pt-8 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 rounded-[30px] border border-border bg-card/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.05)]">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-google-blue">Market benchmark</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">AI productivity platform positioning</h2>
              </div>
              <div className="rounded-full border border-border bg-background px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Market snapshot • not official Gartner score
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[760px] rounded-2xl border border-border bg-background">
                <div className="grid grid-cols-[1.3fr_0.8fr_0.8fr_1.2fr] gap-0 border-b border-border text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  <div className="px-4 py-3">Platform</div>
                  <div className="px-4 py-3">Positioning</div>
                  <div className="px-4 py-3">Enterprise fit</div>
                  <div className="px-4 py-3">Best use case</div>
                </div>
                {[
                  { name: 'Google Gemini + Workspace', rating: '4.9/5', fit: 'Excellent', use: 'Workspace-native AI for work, search, governance, and ops insight' },
                  { name: 'Microsoft Copilot', rating: '4.6/5', fit: 'Excellent', use: 'Microsoft 365 productivity augmentation and productivity workflows' },
                  { name: 'ChatGPT Enterprise', rating: '4.7/5', fit: 'Very strong', use: 'Research, analysis, and AI knowledge work across broad tasks' },
                  { name: 'Claude for Work', rating: '4.5/5', fit: 'Strong', use: 'Long-form analysis, writing, and coding assistance' },
                  { name: 'AWS Q Business', rating: '4.1/5', fit: 'Good', use: 'Enterprise knowledge search and internal content discovery' },
                ].map((platform) => (
                  <div key={platform.name} className="grid grid-cols-[1.3fr_0.8fr_0.8fr_1.2fr] gap-0 border-b border-border last:border-b-0 text-sm">
                    <div className="border-r border-border px-4 py-4 font-semibold text-foreground">{platform.name}</div>
                    <div className="border-r border-border px-4 py-4 text-google-blue font-semibold">{platform.rating}</div>
                    <div className="border-r border-border px-4 py-4 text-muted-foreground">{platform.fit}</div>
                    <div className="px-4 py-4 text-muted-foreground">{platform.use}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="rounded-3xl border border-border bg-muted/20 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-google-blue">
                <span className="h-2 w-2 rounded-full bg-google-blue" />
                Enterprise decision score
              </div>

              <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recommended path</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Gemini Enterprise Standard</h2>
                </div>
                <div className="rounded-2xl border border-google-green/30 bg-google-green/10 px-4 py-3 text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-google-green">Readiness</p>
                  <p className="mt-1 text-3xl font-black text-google-green">82%</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  { label: 'Workspace readiness', value: '91%', icon: ShieldCheck, tone: 'text-google-blue' },
                  { label: 'Admin governance', value: '86%', icon: BriefcaseBusiness, tone: 'text-google-green' },
                  { label: 'AI adoption', value: '74%', icon: LineChart, tone: 'text-gemini-purple' },
                ].map(({ label, value, icon: Icon, tone }) => (
                  <div key={label} className="rounded-2xl border border-border bg-background p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
                      <Icon className={`h-4 w-4 ${tone}`} />
                    </div>
                    <div className="mt-4 text-2xl font-bold text-foreground">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Best fit for</p>
                  <p className="text-sm text-muted-foreground">Mid-size and enterprise teams needing secure AI rollout with strong governance.</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-foreground/90">
                  Build proposal
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Why this path</p>
              <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                <li className="rounded-2xl border border-border bg-muted/20 p-3">Balances security, AI power, and rollout readiness without over-committing too early.</li>
                <li className="rounded-2xl border border-border bg-muted/20 p-3">Supports governance and enterprise controls needed for broader Workspace adoption.</li>
                <li className="rounded-2xl border border-border bg-muted/20 p-3">Keeps upgrade flexibility for deeper Gemini and connector expansion later.</li>
              </ul>
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
