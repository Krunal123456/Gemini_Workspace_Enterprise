"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { AvailabilityMatrix } from '@/components/comparison/AvailabilityMatrix';
import { PlanComparator } from '@/components/comparison/PlanComparator';
import { PricingCalculator } from '@/components/comparison/PricingCalculator';
import { cn } from '@/lib/utils';
import { Table, SplitSquareHorizontal, Calculator } from 'lucide-react';
import { useLocale } from '@/lib/i18n/locale-context';
import { createPhraseTranslator } from '@/lib/i18n/translate';

const tabs = [
  {
    id: 'matrix',
    label: 'Availability Matrix',
    desc: 'Full catalog matrix (200+)',
    icon: Table,
  },
  {
    id: 'compare',
    label: 'Side-by-Side Comparator',
    desc: 'Head-to-head plan specs',
    icon: SplitSquareHorizontal,
  },
  {
    id: 'calculator',
    label: 'Pricing Calculator',
    desc: 'Seat & ROI budgeter',
    icon: Calculator,
  },
];

/** Loading skeleton shared by all tab panels */
function TabSkeleton() {
  return (
    <div className="h-96 flex items-center justify-center text-muted-foreground text-sm animate-pulse">
      Loading…
    </div>
  );
}

/**
 * Inner component that reads useSearchParams().
 * Must be rendered inside a <Suspense> boundary — Next.js 15 requirement.
 */
function CompareTabsInner() {
  const { locale } = useLocale();
  const t = createPhraseTranslator(locale);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get('tab') || 'matrix';

  const setTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Enhanced Segmented Control */}
      <div className="grid gap-2 sm:grid-cols-3 p-1.5 bg-muted/60 border border-border/80 rounded-2xl w-full max-w-4xl mx-auto lg:mx-0">
        {tabs.map(({ id, label, desc, icon: Icon }) => {
          const isActive = currentTab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 border",
                isActive
                  ? "bg-card text-foreground shadow-sm border-border/80 ring-1 ring-border/40"
                  : "bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:bg-card/40"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-lg shrink-0 transition-colors",
                  isActive
                    ? "bg-google-blue/10 text-google-blue"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-tight truncate">
                  {t(label)}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5 truncate">
                  {t(desc)}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tab Content — each panel wrapped in its own Suspense */}
      <div className="min-h-[600px]">
        {currentTab === 'matrix' && (
          <Suspense fallback={<TabSkeleton />}>
            <AvailabilityMatrix />
          </Suspense>
        )}
        {currentTab === 'compare' && (
          <Suspense fallback={<TabSkeleton />}>
            <PlanComparator />
          </Suspense>
        )}
        {currentTab === 'calculator' && (
          <Suspense fallback={<TabSkeleton />}>
            <PricingCalculator />
          </Suspense>
        )}
      </div>
    </div>
  );
}

/**
 * Public export — wraps CompareTabsInner in Suspense so useSearchParams
 * never throws "uncached promise" in Next.js 15.
 */
export function CompareTabs() {
  return (
    <Suspense
      fallback={
        <div className="h-96 flex items-center justify-center text-muted-foreground">
          Loading comparison tools…
        </div>
      }
    >
      <CompareTabsInner />
    </Suspense>
  );
}
