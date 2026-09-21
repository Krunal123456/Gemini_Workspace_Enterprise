"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Filter, SlidersHorizontal, ArrowRight, Sparkles } from "lucide-react";
import { Feature } from "@/types";
import { features } from "@/data/features";
import { categories } from "@/data/categories";
import { applications } from "@/data/apps";
import { cn } from "@/lib/utils";

import { FeatureCard } from "./FeatureCard";
import { FeatureModal } from "./FeatureModal";

type QuickToggle = "all" | "enterprise-only" | "popular" | "new";

interface FeatureExplorerProps {
  viewMode?: "modal" | "link";
}

export function FeatureExplorer({ viewMode = "modal" }: FeatureExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [quickToggle, setQuickToggle] = useState<QuickToggle>("all");
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const filteredFeatures = useMemo(() => {
    return features.filter((feature) => {
      // 1. Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          feature.name.toLowerCase().includes(q) ||
          feature.description.toLowerCase().includes(q) ||
          feature.capabilities?.some((c) => c.toLowerCase().includes(q)) ||
          feature.useCases?.some((u) => u.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // 2. App Filter
      if (selectedApp !== "all") {
        if (feature.application.toLowerCase() !== selectedApp.toLowerCase() && 
            applications.find(a => a.id === selectedApp)?.name !== feature.application) {
          return false;
        }
      }

      // 3. Category Filter
      if (selectedCategory !== "all") {
        if (feature.category.toLowerCase() !== selectedCategory.toLowerCase() &&
            categories.find(c => c.id === selectedCategory)?.name !== feature.category) {
          return false;
        }
      }

      // 4. Quick Toggles
      if (quickToggle === "enterprise-only") {
        if (feature.enterpriseAvailability !== "enterprise-only" && 
            feature.enterpriseAvailability !== "plus") {
          return false;
        }
      } else if (quickToggle === "popular") {
        if (!feature.isPopular) return false;
      } else if (quickToggle === "new") {
        if (!feature.isNew) return false;
      }

      return true;
    });
  }, [searchQuery, selectedApp, selectedCategory, quickToggle]);

  const totalFeaturesCount = features.length;

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Search and Filters Container */}
      <div className="flex flex-col gap-6 rounded-3xl bg-muted/30 p-4 sm:p-6 lg:p-8 border border-border/50">
        
        {/* Top row: Search & Quick Toggles */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search features, capabilities, use cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-border/50 bg-background py-3 pl-10 pr-10 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground font-medium mr-2 hidden sm:block">Filter by:</span>
            {(["all", "enterprise-only", "popular", "new"] as QuickToggle[]).map((toggle) => (
              <button
                key={toggle}
                onClick={() => setQuickToggle(toggle)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors border",
                  quickToggle === toggle
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border/50 hover:bg-muted"
                )}
              >
                {toggle === "all" && "All"}
                {toggle === "enterprise-only" && "Enterprise Exclusive"}
                {toggle === "popular" && "Popular Only"}
                {toggle === "new" && "New Capabilities"}
              </button>
            ))}
          </div>
        </div>

        {/* Application Filter Tabs */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex w-max items-center gap-2">
            <button
              onClick={() => setSelectedApp("all")}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                selectedApp === "all"
                  ? "bg-secondary text-secondary-foreground"
                  : "hover:bg-muted text-muted-foreground"
              )}
            >
              All Apps
            </button>
            <button
              onClick={() => setSelectedApp("gemini")}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2",
                selectedApp === "gemini"
                  ? "bg-secondary text-secondary-foreground"
                  : "hover:bg-muted text-muted-foreground"
              )}
            >
              <Sparkles className="h-3.5 w-3.5 text-gemini-purple" />
              Gemini Chat
            </button>
            {applications.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app.id)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2",
                  selectedApp === app.id
                    ? "bg-secondary text-secondary-foreground"
                    : "hover:bg-muted text-muted-foreground"
                )}
              >
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: app.accentColor || "var(--google-blue)" }}
                />
                {app.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex w-max items-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                selectedCategory === "all"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              )}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                  selectedCategory === cat.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm font-medium text-muted-foreground">
          Showing <span className="text-foreground">{filteredFeatures.length}</span> of {totalFeaturesCount} features
        </p>
      </div>

      {/* Feature Grid */}
      {filteredFeatures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
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
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed rounded-3xl bg-muted/10">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Filter className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-2">No features found</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            We couldn't find any features matching your current filters and search criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedApp("all");
              setSelectedCategory("all");
              setQuickToggle("all");
            }}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* View All CTA */}
      {filteredFeatures.length > 0 && (
        <div className="flex justify-center mt-8">
          <Link
            href="/features"
            className="group flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium transition-all hover:border-primary hover:text-primary shadow-sm"
          >
            View All {totalFeaturesCount} Features in Catalog
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
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
