"use client";

import React from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { AvailabilityMatrix } from '@/components/comparison/AvailabilityMatrix';
import { PlanComparator } from '@/components/comparison/PlanComparator';
import { PricingCalculator } from '@/components/comparison/PricingCalculator';
import { cn } from '@/lib/utils';
import { Table, SplitSquareHorizontal, Calculator } from 'lucide-react';

const tabs = [
  { id: 'matrix', label: 'Availability Matrix', icon: Table },
  { id: 'compare', label: 'Side-by-Side Comparator', icon: SplitSquareHorizontal },
  { id: 'calculator', label: 'Pricing Calculator', icon: Calculator },
];

export function CompareTabs() {
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
      {/* Segmented Control */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-muted border border-border rounded-xl w-fit mx-auto lg:mx-0">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              currentTab === id
                ? "bg-background text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground hover:bg-background/60"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {currentTab === 'matrix' && <AvailabilityMatrix />}
        {currentTab === 'compare' && <PlanComparator />}
        {currentTab === 'calculator' && <PricingCalculator />}
      </div>
    </div>
  );
}
