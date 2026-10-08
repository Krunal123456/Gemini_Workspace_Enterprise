"use client";

import { useLocalizedData } from "@/lib/i18n/use-localized-data";

import React, { useState } from "react";
import { Shield, ChevronDown, Lock, CircleHelp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SecurityPreview() {
  const { securityLayers } = useLocalizedData();
  const [activeLayerId, setActiveLayerId] = useState<string | null>(securityLayers[0]?.id || null);

  const toggleLayer = (id: string) => {
    setActiveLayerId(activeLayerId === id ? null : id);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 bg-blue-500/10 text-blue-500 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Shield className="w-4 h-4" /> Security review
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
            Security decisions need product-specific answers.
          </h2>
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm inline-block">
            <p className="text-foreground font-medium flex items-center gap-2 text-sm sm:text-base">
              <Lock className="w-5 h-5" />
              Google describes distinct data protections for Workspace with Gemini and Gemini Enterprise. Check the terms for the service you use.
            </p>
            <div className="mt-3 flex flex-wrap gap-4 pl-8 text-xs font-semibold">
              <a href="https://workspace.google.com/security/ai-privacy/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-google-blue hover:underline">Workspace AI privacy <ArrowRight className="h-3 w-3" /></a>
              <a href="https://cloud.google.com/gemini-enterprise" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-google-blue hover:underline">Gemini Enterprise privacy <ArrowRight className="h-3 w-3" /></a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Stack Visualization */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-2.5">
            {securityLayers.map((layer, index) => {
              const isActive = activeLayerId === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className={cn(
                    "w-full text-left px-6 py-4 rounded-2xl border transition-all duration-200 relative group flex items-center justify-between backdrop-blur-xl",
                    isActive
                      ? "border-blue-500/80 bg-blue-500/15 shadow-[0_8px_30px_rgba(59,130,246,0.25)] z-10 scale-[1.02]"
                      : "border-slate-200/60 bg-white/60 dark:border-white/10 dark:bg-white/[0.03] hover:border-blue-400/40 hover:bg-white/80 dark:hover:bg-white/[0.06]"
                  )}
                  style={{ zIndex: isActive ? 20 : 10 - index }}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                      isActive
                        ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                        : "bg-muted text-muted-foreground group-hover:bg-blue-500/15 group-hover:text-blue-500"
                    )}>
                      {layer.level}
                    </div>
                    <div>
                      <div className={cn(
                        "font-bold text-sm sm:text-base",
                        isActive ? "text-blue-600 dark:text-blue-400" : "text-foreground/80 group-hover:text-foreground"
                      )}>
                        {layer.name}
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={cn(
                    "w-5 h-5 transition-transform duration-200",
                    isActive ? "text-blue-500 rotate-180" : "text-muted-foreground opacity-40 group-hover:opacity-100"
                  )} />
                </button>
              );
            })}
          </div>

          {/* Detailed View */}
          <div className="lg:col-span-7">
            {securityLayers.map((layer) => {
              if (activeLayerId !== layer.id) return null;

              return (
                <div key={`detail-${layer.id}`} className="glass-panel rounded-3xl p-8 sm:p-10 h-full animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 tracking-wider uppercase mb-4">
                    Topic {layer.level}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{layer.name}</h3>
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-4">{layer.tagline}</p>
                  <p className="text-muted-foreground leading-relaxed mb-8">{layer.description}</p>

                  <h4 className="font-semibold text-foreground uppercase tracking-wider text-xs mb-4 border-b border-border/60 pb-2">
                    Questions to validate
                  </h4>

                  <ul className="space-y-3">
                    {layer.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200/50 bg-white/40 dark:border-white/5 dark:bg-white/[0.02]">
                        <CircleHelp className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/90 font-medium leading-relaxed">{cap.reviewQuestion || cap.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
