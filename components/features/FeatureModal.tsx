"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Flame,
  Check
} from "lucide-react";
import { Feature, PlanId } from "@/types";
import { plans } from "@/data/plans";
import { cn } from "@/lib/utils";

interface FeatureModalProps {
  feature: Feature | null;
  onClose: () => void;
}

export function FeatureModal({ feature, onClose }: FeatureModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (feature) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [feature]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {feature && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-[50%] top-[50%] z-50 w-full max-w-3xl max-h-[90vh] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-2xl border bg-background shadow-2xl outline-none sm:rounded-3xl flex flex-col"
          >
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {feature.application}
                </div>
                <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {feature.category}
                </div>
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
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                {feature.name}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {feature.description}
              </p>

              <div className="grid gap-8 md:grid-cols-2 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">What It Does</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.whatItDoes}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">How It Works</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.howItWorks}
                  </p>
                </div>
              </div>

              {feature.useCases && feature.useCases.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Use Cases</h3>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {feature.useCases.map((useCase, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                        <span className="text-sm text-muted-foreground">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Availability</h3>
                <div className="overflow-x-auto rounded-xl border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 border-b">
                      <tr>
                        <th className="px-4 py-3 font-medium">Plan</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {plans.map((plan) => {
                        const availability = feature.plans[plan.id];
                        if (!availability) return null;
                        
                        return (
                          <tr key={plan.id} className="hover:bg-muted/20">
                            <td className="px-4 py-3 font-medium">{plan.name}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {availability.available ? (
                                  availability.status === "limited" ? (
                                    <AlertCircle className="h-4 w-4 text-amber-500" />
                                  ) : (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                  )
                                ) : (
                                  <XCircle className="h-4 w-4 text-muted-foreground/50" />
                                )}
                                <span className={cn(
                                  "capitalize",
                                  !availability.available && "text-muted-foreground/70"
                                )}>
                                  {availability.status.replace("_", " ")}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {availability.limit || availability.note || "-"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {(feature.enterpriseConsiderations || feature.securityConsiderations) && (
                <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900/50 dark:bg-blue-900/10 mb-6">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                        Enterprise & Security Considerations
                      </h4>
                      {feature.enterpriseConsiderations && (
                        <p className="text-sm text-blue-800/80 dark:text-blue-300/80 mb-2">
                          {feature.enterpriseConsiderations}
                        </p>
                      )}
                      {feature.securityConsiderations && (
                        <p className="text-sm text-blue-800/80 dark:text-blue-300/80">
                          {feature.securityConsiderations}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t bg-muted/20 px-6 py-4">
              <button
                onClick={onClose}
                className="text-sm font-medium hover:underline text-muted-foreground"
              >
                Close
              </button>
              <Link
                href={`/features/${feature.slug}`}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 gap-2"
              >
                View Full Page
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
