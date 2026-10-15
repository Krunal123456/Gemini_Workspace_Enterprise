"use client";

import { useLocalizedData } from "@/lib/i18n/use-localized-data";
import { useLocale } from "@/lib/i18n/locale-context";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { createPhraseTranslator } from "@/lib/i18n/translate";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Check, Minus, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const DEFAULT_SELECTED = ['business-standard', 'ai-expanded', 'gemini-enterprise-standard'];

function PlanComparatorInner() {
  const { plans } = useLocalizedData();
  const { locale, href } = useLocale();
  const t = createPhraseTranslator(locale);
  const comparisonLabels = getDictionary(locale).comparison;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultSelected = DEFAULT_SELECTED;

  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>([]);
  const [showDiffOnly, setShowDiffOnly] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const plansParam = searchParams.get('plans');
    if (plansParam) {
      setSelectedPlanIds(plansParam.split(','));
    } else {
      setSelectedPlanIds(defaultSelected);
    }
  }, [searchParams]);

  const updateUrl = (newIds: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newIds.length > 0) {
      params.set('plans', newIds.join(','));
    } else {
      params.delete('plans');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const addPlan = (planId: string) => {
    if (selectedPlanIds.length < 4 && !selectedPlanIds.includes(planId)) {
      const newIds = [...selectedPlanIds, planId];
      setSelectedPlanIds(newIds);
      updateUrl(newIds);
    }
  };

  const removePlan = (planId: string) => {
    if (selectedPlanIds.length > 2) {
      const newIds = selectedPlanIds.filter(id => id !== planId);
      setSelectedPlanIds(newIds);
      updateUrl(newIds);
    }
  };

  const selectedPlans = useMemo(() => {
    return selectedPlanIds.map(id => plans.find(p => p.id === id)).filter(Boolean) as typeof plans;
  }, [selectedPlanIds, plans]);

  const availableToAdd = useMemo(() => {
    return plans.filter(p => !selectedPlanIds.includes(p.id));
  }, [selectedPlanIds, plans]);

  if (!isMounted) return null;

  const comparisonSections = [
    {
      title: t('Overview & Pricing'),
      rows: [
        { label: t('Flexible rate / user / month'), getValue: (p: (typeof plans)[number]) => p.monthlyPriceUSD ? `$${p.monthlyPriceUSD} ${comparisonLabels.perUser}` : p.startingPriceUSD ? `${comparisonLabels.from} $${p.startingPriceUSD} ${comparisonLabels.perUser}` : p.pricingNote || comparisonLabels.checkPricing },
        { label: t('Annual commitment rate / user / month'), getValue: (p: (typeof plans)[number]) => p.annualPriceUSD ? `$${p.annualPriceUSD} ${comparisonLabels.perUser}` : p.startingPriceUSD ? `${comparisonLabels.from} $${p.startingPriceUSD} ${comparisonLabels.perUser}` : p.pricingNote || comparisonLabels.checkPricing },
        { label: t('Storage'), getValue: (p: (typeof plans)[number]) => p.storage },
        { label: t('Meeting Size'), getValue: (p: (typeof plans)[number]) => p.participantLimit ? t('{count} participants', { count: p.participantLimit }) : t('N/A') },
      ]
    },
    {
      title: t('AI & Workspace'),
      rows: [
        { label: t('AI in Workspace'), getValue: (p: (typeof plans)[number]) => p.coreCapabilities.generativeAI },
        { label: t('Model access'), getValue: (p: (typeof plans)[number]) => p.coreCapabilities.modelAccess },
        { label: t('Deep Research'), getValue: (p: (typeof plans)[number]) => p.coreCapabilities.deepResearch },
        { label: t('NotebookLM access'), getValue: (p: (typeof plans)[number]) => p.coreCapabilities.notebookLMAccess },
      ]
    },
    {
      title: t('Grounding & Connectors'),
      rows: [
        { label: t('Grounding'), getValue: (p: (typeof plans)[number]) => p.coreCapabilities.grounding },
        { label: t('Connectors'), getValue: (p: (typeof plans)[number]) => p.coreCapabilities.connectors },
        { label: t('Agents & MCP'), getValue: (p: (typeof plans)[number]) => p.coreCapabilities.agentsAndMCP },
        { label: t('Audit logging'), getValue: (p: (typeof plans)[number]) => p.coreCapabilities.auditLogging },
      ]
    },
    {
      title: t('Security & Governance'),
      rows: [
        { label: t('Security level'), getValue: (p: (typeof plans)[number]) => p.coreCapabilities.securityLevel },
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl rounded-3xl border border-white/40 dark:border-white/10 shadow-sm">
        <div className="flex flex-col gap-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("Select up to 4 plans to compare")}</h3>
          <div className="flex flex-wrap gap-2">
            {selectedPlans.map(plan => (
              <div key={plan.id} className="flex items-center gap-2 px-3.5 py-1.5 bg-background/80 backdrop-blur border border-border/80 rounded-full text-sm font-medium text-foreground shadow-xs">
                <span>{plan.name}</span>
                {selectedPlanIds.length > 2 && (
                  <button onClick={() => removePlan(plan.id)} className="hover:text-google-red transition-colors text-muted-foreground">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
            {selectedPlanIds.length < 4 && (
              <div className="relative group">
                <button className="flex items-center gap-1.5 px-3.5 py-1.5 border border-dashed border-border/80 text-muted-foreground hover:text-foreground hover:border-violet-500 rounded-full text-sm font-medium transition-all bg-background/40 backdrop-blur">
                  <Plus className="w-3.5 h-3.5" /> {t("Add Plan")}
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 max-h-60 overflow-y-auto bg-card/95 backdrop-blur-2xl border border-border/80 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2 flex flex-col gap-1">
                  {availableToAdd.map(plan => (
                    <button
                      key={plan.id}
                      onClick={() => addPlan(plan.id)}
                      className="text-left px-3 py-2 text-sm font-medium text-foreground hover:bg-violet-500/10 hover:text-violet-600 rounded-xl transition-colors"
                    >
                      {plan.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <span className="text-sm font-medium text-foreground">{t("Show Differences Only")}</span>
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showDiffOnly}
              onChange={(e) => setShowDiffOnly(e.target.checked)}
            />
            <div className="w-11 h-6 bg-muted border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-google-blue" />
          </div>
        </label>
      </div>

      {/* Comparison Matrix */}
      <div className="overflow-x-auto border border-white/40 dark:border-white/10 rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl shadow-[0_20px_50px_-25px_rgba(99,102,241,0.15)] dark:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)]">
        <table className="w-full text-sm text-left table-fixed">
          <thead className="bg-muted/60 backdrop-blur-md sticky top-0 z-20 border-b border-border/60">
            <tr>
              <th className="px-6 py-6 w-1/4 sticky left-0 bg-background/90 backdrop-blur-xl z-30 shadow-[1px_0_0_0_hsl(var(--border))]">
                <div className="text-lg font-semibold text-foreground">{t("Plan Features")}</div>
              </th>
              {selectedPlans.map(plan => (
                <th key={plan.id} className="px-6 py-6 text-center border-l border-border/50">
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">{plan.category}</span>
                    <span className="text-xl font-bold text-foreground">{plan.name}</span>
                    <Link
                      href={href(`/plans/${plan.id}`)}
                      className="px-4 py-2 mt-2 bg-gradient-to-r from-google-blue to-gemini-indigo text-white hover:opacity-90 rounded-xl text-sm font-semibold transition-all w-full text-center shadow-xs"
                    >
                      {comparisonLabels.detail}
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {comparisonSections.map((section, sIdx) => {
              const visibleRows = section.rows.filter(row => {
                if (!showDiffOnly) return true;
                const values = selectedPlans.map((p) => String(row.getValue(p)));
                return new Set(values).size > 1;
              });

              if (visibleRows.length === 0) return null;

              return (
                <React.Fragment key={section.title}>
                  <tr className="bg-muted/40 backdrop-blur-xs">
                    <td colSpan={selectedPlans.length + 1} className="px-6 py-4 font-semibold text-google-blue sticky left-0">
                      {section.title}
                    </td>
                  </tr>
                  {visibleRows.map((row, rIdx) => (
                    <tr key={`${sIdx}-${rIdx}`} className="hover:bg-violet-500/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground sticky left-0 bg-background/90 backdrop-blur-xl shadow-[1px_0_0_0_hsl(var(--border))] z-10">
                        {row.label}
                      </td>
                      {selectedPlans.map(plan => {
                        const val = row.getValue(plan);
                        return (
                          <td key={`${plan.id}-${rIdx}`} className="px-6 py-4 text-center border-l border-border/50">
                            {typeof val === 'boolean' ? (
                              val
                                ? <Check className="w-5 h-5 text-google-green mx-auto" />
                                : <Minus className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                            ) : (
                              <span className="text-foreground/85 font-medium">{val as string}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Self-contained export — Suspense boundary included so useSearchParams never throws in Next.js 15. */
export function PlanComparator() {
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-sm text-muted-foreground animate-pulse">Loading comparator…</div>}>
      <PlanComparatorInner />
    </Suspense>
  );
}
