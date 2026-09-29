"use client";

import React, { useState, useMemo } from 'react';
import { useLocalizedData } from '@/lib/i18n/use-localized-data';
import { useLocale } from '@/lib/i18n/locale-context';
import { createPhraseTranslator } from '@/lib/i18n/translate';
import { Check, CircleHelp, Minus, Search, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function AvailabilityMatrix() {
  const { features, plans, applications } = useLocalizedData();
  const { locale, href } = useLocale();
  const t = createPhraseTranslator(locale);
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState('All');
  const [selectedPlanGroup, setSelectedPlanGroup] = useState('All');
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>([]);
  const [differencesOnly, setDifferencesOnly] = useState(false);

  const filteredFeatures = useMemo(() => {
    return features.filter((f) => {
      const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.description.toLowerCase().includes(search.toLowerCase());
      const matchesApp = selectedApp === 'All' || f.application === selectedApp || f.application.toLowerCase() === selectedApp.toLowerCase();
      return matchesSearch && matchesApp;
    });
  }, [search, selectedApp]);

  const filteredPlans = useMemo(() => {
    const grouped = selectedPlanGroup === 'All' ? plans : plans.filter((p) => p.category === selectedPlanGroup);
    return selectedPlanIds.length > 0 ? grouped.filter((plan) => selectedPlanIds.includes(plan.id)) : grouped;
  }, [selectedPlanGroup, selectedPlanIds]);

  const visibleFeatures = useMemo(() => filteredFeatures.filter((feature) => {
    if (!differencesOnly || filteredPlans.length < 2) return true;
    const statuses = filteredPlans.map((plan) => {
      const availability = feature.plans[plan.id];
      return `${availability?.available}-${availability?.status}-${availability?.limit || ''}`;
    });
    return new Set(statuses).size > 1;
  }), [differencesOnly, filteredFeatures, filteredPlans]);

  const appMap = useMemo(() => {
    const map = applications.reduce((acc, app) => {
      acc[app.id] = app.name;
      return acc;
    }, {} as Record<string, string>);
    map.gemini = "Gemini Chat";
    return map;
  }, [applications]);

  const exportCSV = () => {
    const exportPlans = selectedPlanIds.length > 0 ? filteredPlans : plans;
    const header = ['Feature', 'Application', 'Category', ...exportPlans.map((p) => p.name)].join(',');
    const rows = visibleFeatures.map((f) => {
      const row = [
        `"${f.name.replace(/"/g, '""')}"`,
        `"${(appMap[f.application] || f.application || 'General').replace(/"/g, '""')}"`,
        `"${f.category.replace(/"/g, '""')}"`,
        ...exportPlans.map((p) => {
          const availability = f.plans[p.id];
          if (!availability || !availability.available) return '"-"';
          if (availability.limit) return `"${availability.status} (${availability.limit})"`;
          return `"${availability.status}"`;
        }),
      ];
      return row.join(',');
    });

    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'gemini-enterprise-matrix.csv');
    link.click();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("Search features...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <select
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
            className="px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-google-blue"
          >
            <option value="All">{t("All Applications")}</option>
            {applications.map((app) => (
              <option key={app.id} value={app.id}>{app.name}</option>
            ))}
          </select>

          <select
            value={selectedPlanGroup}
            onChange={(e) => setSelectedPlanGroup(e.target.value)}
            className="px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-google-blue"
          >
            <option value="All">{t("All Plan Groups")}</option>
            <option value="Google Workspace">Google Workspace</option>
            <option value="Gemini Enterprise">Gemini Enterprise</option>
            <option value="AI Add-ons">{t("AI Add-ons")}</option>
          </select>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg text-sm text-foreground transition-colors"
          >
            <Download className="w-4 h-4" />
            {t("Export CSV")}
          </button>
          <button
            onClick={() => setDifferencesOnly((value) => !value)}
            className={cn("px-4 py-2 border rounded-lg text-sm transition-colors", differencesOnly ? "border-blue-500/40 bg-blue-500/10 text-blue-800 dark:text-blue-200" : "bg-muted border-border text-foreground hover:bg-muted/80")}
          >
            {differencesOnly ? t("Showing Differences") : t("Show Differences Only")}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-muted/20 p-3">
        <span className="mr-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("Pin plans:")}</span>
        {plans.map((plan) => <button key={plan.id} type="button" onClick={() => setSelectedPlanIds((current) => current.includes(plan.id) ? current.filter((id) => id !== plan.id) : [...current, plan.id])} className={cn("rounded-full border px-3 py-1.5 text-xs font-medium transition", selectedPlanIds.includes(plan.id) ? "border-blue-500/40 bg-blue-500/10 text-blue-800 dark:text-blue-200" : "border-border text-muted-foreground hover:bg-muted")}>{plan.shortName}</button>)}
        {selectedPlanIds.length > 0 && <button type="button" onClick={() => setSelectedPlanIds([])} className="ml-auto text-xs font-semibold text-blue-800 hover:underline dark:text-blue-200">{t("Reset")}</button>}
      </div>

      <div className="relative overflow-x-auto border border-border rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-muted sticky top-0 z-10 border-b border-border shadow-sm">
            <tr>
              <th className="px-6 py-4 sticky left-0 bg-muted z-20 shadow-[1px_0_0_0_var(--tw-shadow-color)] [--tw-shadow-color:hsl(var(--border))] min-w-[300px] text-foreground">
                {t("Feature")}
              </th>
              {filteredPlans.map((plan) => (
                <th key={plan.id} className={cn("sticky top-0 px-6 py-4 min-w-[160px] text-center whitespace-nowrap", selectedPlanIds.includes(plan.id) && "bg-google-blue/10") }>
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold text-foreground">{plan.name}</span>
                    <span className="text-muted-foreground font-normal text-[10px]">{plan.category}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleFeatures.map((feature, idx) => (
              <tr
                key={feature.slug}
                className={cn(
                  "border-b border-border/50 hover:bg-muted/30 transition-colors",
                  idx === visibleFeatures.length - 1 ? 'border-none' : ''
                )}
              >
                <td className="px-6 py-4 sticky left-0 bg-background/95 backdrop-blur-sm shadow-[1px_0_0_0_hsl(var(--border))] z-10">
                  <div className="flex flex-col gap-1">
                    <Link href={href(`/features/${feature.slug}`)} className="font-medium text-foreground hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                      {feature.name}
                    </Link>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded w-fit">
                      {appMap[feature.application] || feature.application || 'General'}
                    </span>
                  </div>
                </td>
                {filteredPlans.map((plan) => {
                  const availability = feature.plans[plan.id];

                  return (
                    <td key={plan.id} className={cn("px-6 py-4 text-center", selectedPlanIds.includes(plan.id) && "bg-google-blue/5")}>
                      <div className="group relative flex justify-center items-center">
                        {!availability ? (
                          <span title={t("This feature is not mapped to this plan in the catalog. Confirm in Google's current edition guide.")}><CircleHelp className="h-4 w-4 text-amber-600" aria-label={t("Not mapped")} /></span>
                        ) : !availability.available ? (
                          <Minus className="w-5 h-5 text-muted-foreground/30" />
                        ) : availability.status === 'yes' ? (
                          <Check className="w-5 h-5 text-google-green" />
                        ) : availability.status === 'limited' ? (
                          <span className="text-xs px-2 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full font-medium dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800/60">
                            {availability.limit || t('Limited')}
                          </span>
                        ) : availability.status === 'higher_limits' ? (
                          <span className="text-xs px-2 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-full font-medium dark:bg-blue-950/40 dark:text-blue-200 dark:border-blue-800/60">
                            {availability.limit || t('Higher Limits')}
                          </span>
                        ) : availability.status === 'enterprise' || availability.status === 'custom' ? (
                          <span className="text-xs px-2 py-1 bg-violet-50 text-violet-800 border border-violet-200 rounded-full font-medium dark:bg-violet-950/40 dark:text-violet-200 dark:border-violet-800/60">
                            {availability.limit || availability.status}
                          </span>
                        ) : (
                          <Check className="w-5 h-5 text-google-green" />
                        )}

                        {availability?.note && (
                          <div role="tooltip" className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-popover text-popover-foreground border border-border rounded text-xs shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-30">
                            {availability.note}
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("Mobile comparison view")}</p>
        {visibleFeatures.map((feature) => <div key={feature.slug} className="rounded-xl border border-border bg-card p-4"><Link href={href(`/features/${feature.slug}`)} className="font-semibold text-foreground hover:text-google-blue">{feature.name}</Link><p className="mt-1 text-xs text-muted-foreground">{appMap[feature.application] || feature.application}</p><div className="mt-3 space-y-2">{filteredPlans.map((plan) => { const availability = feature.plans[plan.id]; return <div key={plan.id} className="flex items-center justify-between border-t border-border/60 pt-2 text-sm"><span className="text-muted-foreground">{plan.shortName}</span><span className={availability?.available ? "font-semibold text-google-green" : "text-muted-foreground/70"}>{availability ? (availability.available ? availability.limit || availability.note || t("Included") : t("Not included")) : t("Not mapped")}</span></div>; })}</div></div>)}
      </div>
    </div>
  );
}
