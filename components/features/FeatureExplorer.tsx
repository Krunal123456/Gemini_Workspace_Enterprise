"use client";

import { useLocalizedData } from "@/lib/i18n/use-localized-data";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Filter,
  ArrowRight,
  Sparkles,
  LayoutGrid,
  List,
  PenLine,
  Table as TableIcon,
  Video,
  BookOpen,
  Bot,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import { Feature, PlanId } from "@/types";
import { cn } from "@/lib/utils";
import { formatEnterpriseAvailability } from "@/lib/i18n/featureLabels";

import { FeatureCard } from "./FeatureCard";
import { FeatureModal } from "./FeatureModal";

type QuickToggle = "all" | "enterprise-only" | "popular" | "new";
type GoalCategory = "all" | "writing" | "data" | "meetings" | "research" | "automation" | "security";
type ViewLayout = "grid" | "table";
type SortOption = "recommended" | "name" | "app";

interface FeatureExplorerProps {
  viewMode?: "modal" | "link";
}

const goalProfiles: { id: GoalCategory; label: string; icon: React.ElementType; color: string }[] = [
  { id: "all", label: "All Capabilities", icon: Sparkles, color: "text-violet-500" },
  { id: "writing", label: "Writing & Email", icon: PenLine, color: "text-red-500" },
  { id: "data", label: "Data & Sheets", icon: TableIcon, color: "text-amber-500" },
  { id: "meetings", label: "Meetings & Voice", icon: Video, color: "text-emerald-500" },
  { id: "research", label: "Research & NotebookLM", icon: BookOpen, color: "text-blue-500" },
  { id: "automation", label: "Agents & Workflows", icon: Bot, color: "text-indigo-500" },
  { id: "security", label: "Security & Governance", icon: ShieldCheck, color: "text-slate-500" },
];

export function FeatureExplorer({ viewMode = "link" }: FeatureExplorerProps) {
  const { categories, plans, features, applications } = useLocalizedData();
  const { locale, href, tp } = useLocale();
  const t = createPhraseTranslator(locale);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<GoalCategory>("all");
  const [selectedApp, setSelectedApp] = useState<string>("all");
  const [selectedPlan, setSelectedPlan] = useState<string>("all");
  const [quickToggle, setQuickToggle] = useState<QuickToggle>("all");
  const [viewLayout, setViewLayout] = useState<ViewLayout>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  // App count lookup
  const appCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const f of features) {
      const appKey = f.application.toLowerCase();
      counts[appKey] = (counts[appKey] || 0) + 1;
    }
    return counts;
  }, [features]);

  // Filter Logic
  const filteredFeatures = useMemo(() => {
    let result = features.filter((feature) => {
      const q = searchQuery.trim().toLowerCase();
      const appLower = feature.application.toLowerCase();
      const catLower = feature.category.toLowerCase();
      const nameLower = feature.name.toLowerCase();
      const descLower = feature.description.toLowerCase();

      // 1. Search Query
      if (q) {
        const matchesSearch =
          nameLower.includes(q) ||
          descLower.includes(q) ||
          feature.capabilities?.some((c) => c.toLowerCase().includes(q)) ||
          feature.useCases?.some((u) => u.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // 2. Goal-Based Solution Selector
      if (selectedGoal !== "all") {
        if (selectedGoal === "writing") {
          const isWriting =
            appLower === "gmail" ||
            appLower === "docs" ||
            appLower === "chat" ||
            nameLower.includes("write") ||
            nameLower.includes("draft") ||
            nameLower.includes("summar") ||
            descLower.includes("email") ||
            descLower.includes("proposal");
          if (!isWriting) return false;
        } else if (selectedGoal === "data") {
          const isData =
            appLower === "sheets" ||
            nameLower.includes("sheet") ||
            nameLower.includes("formula") ||
            nameLower.includes("data") ||
            descLower.includes("table") ||
            descLower.includes("spreadsheet");
          if (!isData) return false;
        } else if (selectedGoal === "meetings") {
          const isMeeting =
            appLower === "meet" ||
            appLower === "voice" ||
            catLower === "meet" ||
            catLower === "voice" ||
            nameLower.includes("meeting") ||
            nameLower.includes("call") ||
            nameLower.includes("notes") ||
            nameLower.includes("voicemail") ||
            nameLower.includes("audio") ||
            nameLower.includes("translation");
          if (!isMeeting) return false;
        } else if (selectedGoal === "research") {
          const isResearch =
            appLower === "notebooklm" ||
            appLower === "drive" ||
            catLower === "notebooklm" ||
            catLower === "drive" ||
            nameLower.includes("research") ||
            nameLower.includes("overview") ||
            nameLower.includes("grounding") ||
            descLower.includes("citation") ||
            descLower.includes("pdf");
          if (!isResearch) return false;
        } else if (selectedGoal === "automation") {
          const isAuto =
            appLower === "studio" ||
            appLower === "appsheet" ||
            catLower === "studio" ||
            catLower === "appsheet" ||
            catLower === "developer-tools" ||
            nameLower.includes("agent") ||
            nameLower.includes("workflow") ||
            nameLower.includes("app") ||
            nameLower.includes("bot") ||
            nameLower.includes("connector") ||
            nameLower.includes("mcp");
          if (!isAuto) return false;
        } else if (selectedGoal === "security") {
          const isSec =
            catLower === "security" ||
            appLower === "admin" ||
            catLower === "admin" ||
            nameLower.includes("security") ||
            nameLower.includes("dlp") ||
            nameLower.includes("vault") ||
            nameLower.includes("compliance") ||
            nameLower.includes("encryption") ||
            nameLower.includes("governance") ||
            descLower.includes("hipaa");
          if (!isSec) return false;
        }
      }

      // 3. Application Filter
      if (selectedApp !== "all") {
        if (
          appLower !== selectedApp.toLowerCase() &&
          applications.find((a) => a.id === selectedApp)?.name.toLowerCase() !== appLower
        ) {
          return false;
        }
      }

      // 4. Plan Filter
      if (selectedPlan !== "all") {
        const planAvail = feature.plans[selectedPlan as PlanId];
        if (!planAvail || !planAvail.available) {
          return false;
        }
      }

      // 5. Quick Toggles
      if (quickToggle === "enterprise-only") {
        if (
          feature.enterpriseAvailability !== "enterprise-only" &&
          feature.enterpriseAvailability !== "plus"
        ) {
          return false;
        }
      } else if (quickToggle === "popular") {
        if (!feature.isPopular) return false;
      } else if (quickToggle === "new") {
        if (!feature.isNew) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "app") {
      result = [...result].sort((a, b) => a.application.localeCompare(b.application));
    } else {
      // recommended: popular & new first
      result = [...result].sort((a, b) => {
        const scoreA = (a.isPopular ? 2 : 0) + (a.isNew ? 1 : 0);
        const scoreB = (b.isPopular ? 2 : 0) + (b.isNew ? 1 : 0);
        if (scoreB !== scoreA) return scoreB - scoreA;
        return a.name.localeCompare(b.name);
      });
    }

    return result;
  }, [searchQuery, selectedGoal, selectedApp, selectedPlan, quickToggle, sortBy, features, applications]);

  const totalCount = features.length;
  const isFiltered =
    searchQuery !== "" ||
    selectedGoal !== "all" ||
    selectedApp !== "all" ||
    selectedPlan !== "all" ||
    quickToggle !== "all";

  const handleReset = () => {
    setSearchQuery("");
    setSelectedGoal("all");
    setSelectedApp("all");
    setSelectedPlan("all");
    setQuickToggle("all");
    setSortBy("recommended");
  };

  const getAppName = (appId: string) => {
    if (appId === "gemini") return "Gemini Chat";
    const found = applications.find((a) => a.id === appId || a.name.toLowerCase() === appId.toLowerCase());
    return found ? found.name : appId.charAt(0).toUpperCase() + appId.slice(1);
  };

  const getAppColor = (appId: string) => {
    if (appId === "gemini") return "#8B5CF6";
    const found = applications.find((a) => a.id === appId || a.name.toLowerCase() === appId.toLowerCase());
    return found?.accentColor || "var(--google-blue)";
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* 1. GOAL-BASED SOLUTION CHOOSER (Top Friendly Hub) */}
      <div className="rounded-3xl border border-white/50 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 backdrop-blur-2xl p-6 sm:p-7 shadow-[0_20px_50px_-25px_rgba(99,102,241,0.15)] dark:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)]">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-google-blue">
              {t("Explore by objective")}
            </p>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              {t("What would you like to achieve with Gemini AI?")}
            </h2>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {t("{n} capabilities cataloged", { n: totalCount })}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
          {goalProfiles.map((goal) => {
            const Icon = goal.icon;
            const isSelected = selectedGoal === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={cn(
                  "flex flex-col items-center justify-center text-center p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 group relative",
                  isSelected
                    ? "bg-gradient-to-b from-violet-500/15 to-google-blue/10 border-google-blue ring-1 ring-google-blue shadow-sm text-foreground"
                    : "bg-background/60 border-border/70 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-xl mb-2 transition-transform duration-200 group-hover:scale-110",
                    isSelected ? "bg-white dark:bg-slate-800 shadow-xs" : "bg-muted/50"
                  )}
                >
                  <Icon className={cn("w-4 h-4", goal.color)} />
                </div>
                <span className="text-xs font-semibold leading-tight line-clamp-1">{goal.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. REFINED SEARCH & FILTER CONTROLS */}
      <div className="rounded-3xl border border-white/50 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 backdrop-blur-2xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("Search by keyword, tool, action, or capability...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-background/80 backdrop-blur border border-border/80 rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Dropdown Filters & Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Application Dropdown */}
            <div className="relative min-w-[170px]">
              <select
                aria-label="Filter by Application"
                value={selectedApp}
                onChange={(e) => setSelectedApp(e.target.value)}
                className="w-full appearance-none px-4 py-3 pr-9 bg-background/80 backdrop-blur border border-border/80 rounded-2xl text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-google-blue transition shadow-xs"
              >
                <option value="all">📱 {t("All Applications")}</option>
                <option value="gemini">✨ Gemini Chat ({appCounts["gemini"] || 0})</option>
                {applications.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.name} ({appCounts[app.id.toLowerCase()] || 0})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Plan Compatibility Dropdown */}
            <div className="relative min-w-[170px]">
              <select
                aria-label="Filter by Plan Compatibility"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full appearance-none px-4 py-3 pr-9 bg-background/80 backdrop-blur border border-border/80 rounded-2xl text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-google-blue transition shadow-xs"
              >
                <option value="all">💳 {t("All Workspace Plans")}</option>
                <optgroup label="Core Editions">
                  <option value="business-starter">Business Starter</option>
                  <option value="business-standard">Business Standard</option>
                  <option value="business-plus">Business Plus</option>
                  <option value="enterprise-standard">Enterprise Standard</option>
                  <option value="enterprise-plus">Enterprise Plus</option>
                </optgroup>
                <optgroup label="Add-on Subscriptions">
                  <option value="gemini-business-addon">Gemini Business Add-on</option>
                  <option value="gemini-enterprise-addon">Gemini Enterprise Add-on</option>
                  <option value="ai-meetings-messaging">AI Meetings & Messaging</option>
                  <option value="ai-security">AI Security</option>
                  <option value="google-voice-standard">Google Voice</option>
                  <option value="appsheet-core">AppSheet Core</option>
                </optgroup>
                <optgroup label="Gemini Enterprise Platform">
                  <option value="gemini-enterprise-standard">Gemini Enterprise</option>
                </optgroup>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative min-w-[140px]">
              <select
                aria-label="Sort features"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full appearance-none px-4 py-3 pr-9 bg-background/80 backdrop-blur border border-border/80 rounded-2xl text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-google-blue transition shadow-xs"
              >
                <option value="recommended">⭐ {t("Recommended")}</option>
                <option value="name">🔤 {t("Name (A–Z)")}</option>
                <option value="app">📱 {t("By Application")}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* View Mode Switcher (Grid vs Table) */}
            <div className="inline-flex items-center rounded-2xl border border-border/80 bg-background/80 p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setViewLayout("grid")}
                aria-label="Grid view"
                className={cn(
                  "p-2 rounded-xl transition-all",
                  viewLayout === "grid"
                    ? "bg-google-blue text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewLayout("table")}
                aria-label="Table view"
                className={cn(
                  "p-2 rounded-xl transition-all",
                  viewLayout === "table"
                    ? "bg-google-blue text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Badges Row (All | Enterprise Exclusive | Popular | New) */}
        <div className="mt-5 pt-5 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">
              {t("Highlights:")}
            </span>
            {(
              [
                { id: "all", label: "All" },
                { id: "popular", label: "Popular" },
                { id: "new", label: "New Capabilities" },
                { id: "enterprise-only", label: "Enterprise Only" },
              ] as const
            ).map((toggle) => (
              <button
                key={toggle.id}
                onClick={() => setQuickToggle(toggle.id)}
                className={cn(
                  "rounded-full px-3.5 py-1 text-xs font-medium transition-all border",
                  quickToggle === toggle.id
                    ? "bg-foreground text-background border-foreground shadow-xs font-semibold"
                    : "bg-background/60 text-muted-foreground border-border/80 hover:bg-muted hover:text-foreground"
                )}
              >
                {toggle.label}
              </button>
            ))}
          </div>

          {/* Active Filter Indicators & Reset Button */}
          {isFiltered && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-google-red hover:underline transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t("Reset all filters")}
            </button>
          )}
        </div>
      </div>

      {/* 3. RESULTS STATUS BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground">
            {t("Showing {shown} of {total} features", {
              shown: filteredFeatures.length,
              total: totalCount,
            })}
          </p>
          {selectedGoal !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-google-blue/10 text-google-blue border border-google-blue/20">
              {goalProfiles.find((g) => g.id === selectedGoal)?.label}
              <button
                onClick={() => setSelectedGoal("all")}
                className="hover:text-google-red transition"
                aria-label="Clear goal filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedApp !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              App: {getAppName(selectedApp)}
              <button
                onClick={() => setSelectedApp("all")}
                className="hover:text-google-red transition"
                aria-label="Clear app filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedPlan !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              Plan: {plans.find((p) => p.id === selectedPlan)?.name || selectedPlan}
              <button
                onClick={() => setSelectedPlan("all")}
                className="hover:text-google-red transition"
                aria-label="Clear plan filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>

        <div className="text-xs text-muted-foreground flex items-center gap-3">
          <span>Click any card to inspect full capabilities</span>
        </div>
      </div>

      {/* 4. RESULTS VIEW (Grid or Table) */}
      {filteredFeatures.length > 0 ? (
        viewLayout === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredFeatures.map((feature) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <FeatureCard
                    feature={feature}
                    onSelect={viewMode === "modal" ? setSelectedFeature : undefined}
                    isSelected={selectedFeature?.id === feature.id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* High-Density Compact Table View */
          <div className="overflow-x-auto rounded-3xl border border-white/50 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 backdrop-blur-2xl shadow-sm">
            <table className="w-full text-left text-sm table-fixed min-w-[700px]">
              <thead className="bg-muted/50 border-b border-border/60 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4 w-2/5">{t("Feature")}</th>
                  <th className="px-4 py-4 w-1/5">{t("Application")}</th>
                  <th className="px-4 py-4 w-1/4">{t("Key Capabilities")}</th>
                  <th className="px-4 py-4 w-1/6 text-right">{t("Action")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredFeatures.map((feature) => {
                  const color = getAppColor(feature.application);
                  const appName = getAppName(feature.application);
                  return (
                    <tr
                      key={feature.id}
                      className="hover:bg-muted/30 transition-colors group"
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold text-foreground group-hover:text-google-blue transition-colors line-clamp-1">
                          {feature.name}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                          {feature.description}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-border/70 bg-background/80">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: color }}
                          />
                          <span className="truncate">{appName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {feature.capabilities?.slice(0, 2).map((cap, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-muted text-muted-foreground uppercase tracking-wide truncate max-w-[140px]"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        {viewMode === "modal" ? (
                          <button
                            onClick={() => setSelectedFeature(feature)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-google-blue hover:underline"
                          >
                            Inspect <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <Link
                            href={href(`/features/${feature.slug}`)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-google-blue hover:underline"
                          >
                            Inspect <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed rounded-3xl bg-muted/10 p-6">
          <div className="rounded-full bg-muted/60 p-4 mb-4">
            <Filter className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-2 text-foreground">
            {t("No features found")}
          </h3>
          <p className="text-muted-foreground max-w-md mb-6 text-sm">
            {t("We couldn't find any capabilities matching your current search or filters.")}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="text-xs text-muted-foreground self-center mr-1">
              Try searching:
            </span>
            {["Help me write", "Audio Overview", "Voicemail", "Smart Fill", "Model Armor"].map(
              (suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-3 py-1 rounded-full text-xs font-medium border border-border/80 bg-background hover:bg-muted text-foreground transition"
                >
                  {suggestion}
                </button>
              )
            )}
          </div>
          <button
            onClick={handleReset}
            className="rounded-full bg-google-blue px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
          >
            {t("Reset All Filters")}
          </button>
        </div>
      )}

      {/* Feature Modal */}
      <FeatureModal
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
    </div>
  );
}
