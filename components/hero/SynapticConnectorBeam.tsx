"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Database, 
  Mail, 
  FileText, 
  Table, 
  Sparkles, 
  Workflow, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck,
  Server,
  Terminal,
  Activity,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SourceNode {
  id: string;
  name: string;
  category: string;
  color: string;
  icon: React.ElementType;
}

const SOURCES: SourceNode[] = [
  { id: "drive", name: "Google Drive & Docs", category: "Workspace Context", color: "#4285F4", icon: FileText },
  { id: "gmail", name: "Gmail & Calendar", category: "Communications", color: "#EA4335", icon: Mail },
  { id: "salesforce", name: "Salesforce CRM", category: "Customer Data", color: "#00A1E0", icon: Database },
  { id: "bigquery", name: "BigQuery Lakehouse", category: "Data Warehouse", color: "#34A853", icon: Table },
  { id: "mcp", name: "Custom MCP Gateway", category: "Private VPC Tools", color: "#8B5CF6", icon: Terminal },
];

const OUTCOMES = [
  { id: "synthesis", label: "Executive Briefings & Strategy", icon: Sparkles, color: "#8B5CF6" },
  { id: "code", label: "Autonomous Code & Migrations", icon: Workflow, color: "#3B82F6" },
  { id: "translation", label: "Real-time Meet Cross-lingual", icon: Activity, color: "#10B981" },
  { id: "audit", label: "Immutable Security Audit SIEM", icon: ShieldCheck, color: "#F59E0B" },
];

export function SynapticConnectorBeam() {
  const [activeSource, setActiveSource] = useState<string>("drive");

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="synapse-badge mb-3">
          <span>✦</span>
          <span>Synaptic Connective Architecture</span>
        </div>
        <h2 className="fluid-h2 font-bold tracking-tight text-foreground">
          How data flows through the <span className="gradient-text">Synapse Engine</span>
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mt-2">
          From disconnected corporate data lakes to real-time grounded reasoning with zero public model training.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Data Sources */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground px-2 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-google-blue" />
            01 · In-Tenant Data Sources
          </p>
          {SOURCES.map((source) => {
            const Icon = source.icon;
            const isSelected = activeSource === source.id;
            return (
              <button
                key={source.id}
                onClick={() => setActiveSource(source.id)}
                className={cn(
                  "w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between group",
                  isSelected
                    ? "bg-card border-violet-500 shadow-lg shadow-violet-500/10 scale-[1.02]"
                    : "bg-card/70 border-border hover:border-border/80 hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${source.color}15`,
                      borderColor: `${source.color}35`,
                      color: source.color,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-google-blue transition-colors">
                      {source.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">{source.category}</p>
                  </div>
                </div>
                <div className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  isSelected ? "bg-violet-500 scale-125" : "bg-border group-hover:bg-muted-foreground"
                )} />
              </button>
            );
          })}
        </div>

        {/* Center: Gemini Synaptic Reasoner Core */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center py-6">
          <div className="relative flex items-center justify-center w-56 h-56">
            {/* Concentric Pulsing Rings */}
            <motion.div
              className="absolute inset-0 rounded-full border border-violet-500/20"
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-cyan-500/25"
              animate={{ scale: [1.15, 1, 1.15], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-violet-600/25 via-indigo-600/25 to-cyan-500/25 blur-xl" />

            {/* Core Orb */}
            <div className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-800 flex flex-col items-center justify-center text-white shadow-[0_0_50px_rgba(139,92,246,0.6)] border border-white/25">
              <Sparkles className="w-8 h-8 text-cyan-200 animate-pulse" />
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest mt-1 text-cyan-100">
                Synapse
              </span>
              <span className="text-[9px] font-mono text-violet-200">2M Tokens</span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-xs font-mono font-semibold text-violet-600 dark:text-violet-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Zero-Training Contract Verified
            </span>
          </div>
        </div>

        {/* Right Column: Outcomes & Action Endpoints */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground px-2 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            03 · Grounded Enterprise Outputs
          </p>
          {OUTCOMES.map((outcome) => {
            const Icon = outcome.icon;
            return (
              <div
                key={outcome.id}
                className="p-4 rounded-xl border border-border bg-card/70 hover:bg-card hover:border-violet-500/40 transition-all flex items-center gap-3.5 shadow-sm"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: `${outcome.color}15`,
                    borderColor: `${outcome.color}35`,
                    color: outcome.color,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground">{outcome.label}</h4>
                  <p className="text-[11px] font-mono text-muted-foreground">ACL-verified output</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
