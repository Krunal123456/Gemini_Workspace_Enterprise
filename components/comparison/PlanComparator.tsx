"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { plans } from '@/data/plans';
import { Check, Minus, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function PlanComparator() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultSelected = ['business-standard', 'ai-expanded', 'gemini-enterprise-standard'];

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
  }, [selectedPlanIds]);

  const availableToAdd = useMemo(() => {
    return plans.filter(p => !selectedPlanIds.includes(p.id));
  }, [selectedPlanIds]);

  if (!isMounted) return null;

  const comparisonSections = [
    {
      title: 'Overview & Pricing',
      rows: [
        { label: 'Monthly Price', getValue: (p: (typeof plans)[number]) => p.monthlyPriceUSD ? `$${p.monthlyPriceUSD}` : 'Contact Sales' },
        { label: 'Annual Price', getValue: (p: (typeof plans)[number]) => p.annualPriceUSD ? `$${p.annualPriceUSD}` : 'Contact Sales' },
        { label: 'Storage', getValue: (p: (typeof plans)[number]) => p.storage },
        { label: 'Meeting Size', getValue: (p: (typeof plans)[number]) => p.participantLimit ? `${p.participantLimit} participants` : 'N/A' },
      ]
    },
    {
      title: 'AI & Workspace',
      rows: [
        { label: 'AI in Workspace', getValue: (p: (typeof plans)[number]) => p.coreCapabilities.generativeAI },
        { label: 'Model access', getValue: (p: (typeof plans)[number]) => p.coreCapabilities.modelAccess },
        { label: 'Deep Research', getValue: (p: (typeof plans)[number]) => p.coreCapabilities.deepResearch },
        { label: 'NotebookLM access', getValue: (p: (typeof plans)[number]) => p.coreCapabilities.notebookLMAccess },
      ]
    },
    {
      title: 'Grounding & Connectors',
      rows: [
        { label: 'Grounding', getValue: (p: (typeof plans)[number]) => p.coreCapabilities.grounding },
        { label: 'Connectors', getValue: (p: (typeof plans)[number]) => p.coreCapabilities.connectors },
        { label: 'Agents & MCP', getValue: (p: (typeof plans)[number]) => p.coreCapabilities.agentsAndMCP },
        { label: 'Audit logging', getValue: (p: (typeof plans)[number]) => p.coreCapabilities.auditLogging },
      ]
    },
    {
      title: 'Security & Governance',
      rows: [
        { label: 'Security level', getValue: (p: (typeof plans)[number]) => p.coreCapabilities.securityLevel },
        { label: 'Workspace governance', getValue: (p: (typeof plans)[number]) => p.id.includes('enterprise') || p.id.includes('business') || p.id.includes('frontline') ? 'Admin controls included' : 'Base plan controls' },
        { label: 'Enterprise DLP / zero trust', getValue: (p: (typeof plans)[number]) => p.id.includes('enterprise-plus') || p.id.includes('gemini-enterprise') ? 'Yes' : p.id.includes('enterprise-standard') ? 'Standard' : 'Varies' },
        { label: 'Compliance posture', getValue: (p: (typeof plans)[number]) => p.id.includes('enterprise-plus') || p.id.includes('gemini-enterprise-plus') ? 'Highest' : p.id.includes('enterprise') || p.id.includes('gemini-enterprise') ? 'Strong' : 'Standard' },
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-muted/50 rounded-xl border border-border">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-muted-foreground">Select up to 4 plans to compare</h3>
          <div className="flex flex-wrap gap-2">
            {selectedPlans.map(plan => (
              <div key={plan.id} className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-full text-sm text-foreground">
                <span>{plan.name}</span>
                {selectedPlanIds.length > 2 && (
                  <button onClick={() => removePlan(plan.id)} className="hover:text-google-red transition-colors text-muted-foreground">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            {selectedPlanIds.length < 4 && (
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-1.5 border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground rounded-full text-sm transition-all">
                  <Plus className="w-3 h-3" /> Add Plan
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 max-h-60 overflow-y-auto bg-card border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2 flex flex-col gap-1">
                  {availableToAdd.map(plan => (
                    <button
                      key={plan.id}
                      onClick={() => addPlan(plan.id)}
                      className="text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                    >
                      {plan.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <span className="text-sm font-medium text-foreground">Show Differences Only</span>
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
      <div className="overflow-x-auto border border-border rounded-xl">
        <table className="w-full text-sm text-left table-fixed">
          <thead className="bg-muted sticky top-0 z-20 border-b border-border">
            <tr>
              <th className="px-6 py-6 w-1/4 sticky left-0 bg-muted z-30 shadow-[1px_0_0_0_hsl(var(--border))]">
                <div className="text-lg font-semibold text-foreground">Plan Features</div>
              </th>
              {selectedPlans.map(plan => (
                <th key={plan.id} className="px-6 py-6 text-center border-l border-border/50">
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">{plan.category}</span>
                    <span className="text-xl font-bold text-foreground">{plan.name}</span>
                    <Link
                      href={`/plans/${plan.id}`}
                      className="px-4 py-2 mt-2 bg-foreground text-background hover:bg-foreground/90 rounded-lg text-sm font-medium transition-colors w-full text-center"
                    >
                      View Details
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
                  <tr className="bg-muted/40">
                    <td colSpan={selectedPlans.length + 1} className="px-6 py-4 font-semibold text-google-blue sticky left-0">
                      {section.title}
                    </td>
                  </tr>
                  {visibleRows.map((row, rIdx) => (
                    <tr key={`${sIdx}-${rIdx}`} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground sticky left-0 bg-background/95 backdrop-blur-sm shadow-[1px_0_0_0_hsl(var(--border))] z-10">
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
                              <span className="text-foreground/80">{val as string}</span>
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
