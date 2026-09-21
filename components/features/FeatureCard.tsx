"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Flame } from "lucide-react";
import { Feature, PlanId } from "@/types";
import { cn } from "@/lib/utils";
import { applications } from "@/data/apps";

interface FeatureCardProps {
  feature: Feature;
  onSelect?: (feature: Feature) => void;
  isSelected?: boolean;
}

export function FeatureCard({ feature, onSelect, isSelected }: FeatureCardProps) {
  // Try to find the app to get its color
  const appInfo = applications.find(
    (app) => app.id === feature.application || app.name === feature.application
  );
  
  const isGeminiChat = feature.application === "gemini";
  const appColor = isGeminiChat ? "#8B5CF6" : appInfo?.accentColor || "var(--google-blue)";
  const applicationLabel = feature.application === "gemini" ? "Gemini Chat" : appInfo?.name || feature.application;
  const categoryLabel = feature.category === "gemini" ? "Chat App" : feature.category;
  
  // 5 key tiers for preview: Starter, Standard, Plus, AI Add-on, Enterprise Plus
  const previewTiers: PlanId[] = [
    "business-starter",
    "business-standard",
    "business-plus",
    "ai-ultra",
    "enterprise-plus",
  ];

  const handleSelect = (e: React.MouseEvent) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(feature);
    }
  };

  const formatEnterpriseAvailability = (av: string) => {
    switch (av) {
      case "enterprise-only":
        return "Enterprise Only";
      case "add-on":
        return "Add-on Available";
      case "all":
        return "All Plans";
      case "plus":
        return "Plus Plans";
      case "standard":
        return "Standard & Up";
      default:
        return av;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "atlas-interactive group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-background p-5 text-left transition-all duration-300 hover:-translate-y-1",
        isSelected ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/30"
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/30 px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {isGeminiChat ? <Sparkles className="atlas-icon h-3 w-3" style={{ color: appColor }} /> : <span className="h-2 w-2 rounded-full" style={{ backgroundColor: appColor }} />}
              {applicationLabel}
            </div>
            <div className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              {categoryLabel}
            </div>
          </div>
          
          {(feature.isNew || feature.isPopular) && (
            <div className="flex gap-1">
              {feature.isNew && (
                <div className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  <Sparkles className="h-3 w-3" />
                  New
                </div>
              )}
              {feature.isPopular && (
                <div className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                  <Flame className="h-3 w-3" />
                  Popular
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground line-clamp-1">
            {feature.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {feature.description}
          </p>
        </div>

        {feature.capabilities && feature.capabilities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {feature.capabilities.slice(0, 2).map((cap, i) => (
              <span
                key={i}
                className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
              >
                {cap}
              </span>
            ))}
            {feature.capabilities.length > 2 && (
              <span className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                +{feature.capabilities.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <div className="flex items-center justify-between border-t border-border/50 pt-3">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {formatEnterpriseAvailability(feature.enterpriseAvailability)}
            </span>
            <div className="flex items-center gap-1">
              {previewTiers.map((tierId) => {
                const isAvailable = feature.plans[tierId]?.available;
                return (
                  <div
                    key={tierId}
                    className={cn(
                      "h-1.5 w-4 rounded-full",
                      isAvailable ? "bg-primary" : "bg-muted"
                    )}
                    title={tierId}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {onSelect ? (
          <button
            onClick={handleSelect}
            className="flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Inspect Details
            <ArrowRight className="atlas-arrow h-4 w-4" />
          </button>
        ) : (
          <Link
            href={`/features/${feature.slug}`}
            className="flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Inspect Details
            <ArrowRight className="atlas-arrow h-4 w-4" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
