"use client";

import React, { useState } from "react";
import { Shield, ChevronDown, Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { securityLayers } from "@/data/security";

export default function SecurityPreview() {
  const [activeLayerId, setActiveLayerId] = useState<string | null>(securityLayers[0]?.id || null);

  const toggleLayer = (id: string) => {
    setActiveLayerId(activeLayerId === id ? null : id);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 bg-blue-500/10 text-blue-500 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Shield className="w-4 h-4" /> Defense in Depth
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
            7-Layer Enterprise Security Stack
          </h2>
          <div className="bg-card border-2 border-green-500/70 rounded-xl p-4 shadow-sm inline-block">
            <p className="text-green-600 dark:text-green-400 font-medium flex items-center gap-2 text-lg">
              <Lock className="w-5 h-5" />
              Google Workspace customer data is NEVER used to train Gemini models. Your IP remains yours.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Stack Visualization */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-2">
            {securityLayers.map((layer, index) => {
              const isActive = activeLayerId === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className={cn(
                    "w-full text-left px-6 py-4 rounded-lg border-2 transition-all duration-200 relative group flex items-center justify-between",
                    isActive
                      ? "border-blue-500 bg-blue-500/10 shadow-md z-10 scale-105"
                      : "border-border bg-card hover:border-blue-400/50 hover:bg-muted/50"
                  )}
                  style={{ zIndex: isActive ? 20 : 10 - index }}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                      isActive
                        ? "bg-blue-500 text-white"
                        : "bg-muted text-muted-foreground group-hover:bg-blue-500/15 group-hover:text-blue-500"
                    )}>
                      {layer.level}
                    </div>
                    <div>
                      <div className={cn(
                        "font-bold",
                        isActive ? "text-blue-500" : "text-foreground/80 group-hover:text-foreground"
                      )}>
                        {layer.name}
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={cn(
                    "w-5 h-5 transition-opacity",
                    isActive ? "text-blue-500" : "text-muted-foreground opacity-0 group-hover:opacity-100"
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
                <div key={`detail-${layer.id}`} className="bg-card rounded-2xl border border-border shadow-xl p-8 h-full animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="inline-block px-3 py-1 bg-muted rounded-full text-xs font-bold text-muted-foreground tracking-wider uppercase mb-4">
                    Layer {layer.level}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{layer.name}</h3>
                  <p className="text-xl text-blue-500 font-medium mb-4">{layer.tagline}</p>
                  <p className="text-muted-foreground mb-8">{layer.description}</p>

                  <h4 className="font-semibold text-foreground uppercase tracking-wider text-sm mb-4 border-b border-border pb-2">
                    Key Capabilities
                  </h4>

                  <div className="space-y-6">
                    {layer.capabilities.map((cap, idx) => (
                      <div key={idx} className="flex gap-4">
                        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-bold text-foreground">{cap.name}</h5>
                            {cap.isEnterpriseOnly && (
                              <span className="bg-purple-500/15 text-purple-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                                Enterprise Exclusive
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
                          {cap.plansSupported && cap.plansSupported.length > 0 && (
                            <div className="mt-2 text-xs text-muted-foreground/70">
                              <span className="font-semibold">Supported plans:</span> {cap.plansSupported.join(", ")}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
