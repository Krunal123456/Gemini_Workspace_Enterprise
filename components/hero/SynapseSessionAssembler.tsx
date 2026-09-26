"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Terminal, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Lock, 
  ExternalLink,
  ChevronRight,
  Activity,
  Zap,
  GitBranch
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Scenario {
  id: string;
  tabLabel: string;
  query: string;
  model: string;
  sourceTags: { label: string; type: "drive" | "salesforce" | "bigquery" | "mcp" }[];
  steps: {
    label: string;
    status: "done" | "active" | "waiting";
    latency: string;
  }[];
  output: string;
  citations: { id: string; name: string; type: string; metric: string }[];
  telemetry: {
    tokens: string;
    speed: string;
    ttft: string;
    compliance: string;
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "deep-research",
    tabLabel: "Deep Research Synthesis",
    query: "Summarize an account review using selected Drive notes, a BigQuery workbook, and CRM context.",
    model: "Gemini 3.1 Pro · Preview · 1M Context",
    sourceTags: [
      { label: "Google Drive notes", type: "drive" },
      { label: "BigQuery workbook", type: "bigquery" },
      { label: "Salesforce CRM", type: "salesforce" },
    ],
    steps: [
      { label: "Check access to the selected source material", status: "done", latency: "Demo" },
      { label: "Compare relevant notes and CRM context", status: "done", latency: "Demo" },
      { label: "Separate sourced facts from open questions", status: "done", latency: "Demo" },
      { label: "Prepare a summary draft for human review", status: "done", latency: "Demo" },
    ],
    output: "This local simulation would summarize account themes, identify which source supports each finding, and surface gaps for review. Any numerical conclusion should be calculated from the organization's selected source data and checked before sharing.",
    citations: [
      { id: "c1", name: "account-review-notes.docx", type: "Google Drive", metric: "Example source" },
      { id: "c2", name: "renewal-workbook.csv", type: "BigQuery", metric: "Example source" },
      { id: "c3", name: "crm-account-summary.txt", type: "Salesforce", metric: "Example source" },
    ],
    telemetry: {
      tokens: "Sample flow",
      speed: "No API request",
      ttft: "Local demo",
      compliance: "No files uploaded",
    },
  },
  {
    id: "mcp-agent",
    tabLabel: "Autonomous MCP Tool Agent",
    query: "Preview a supervised workflow that reviews an issue, checks an approved data source, and drafts a team update.",
    model: "Gemini 3.8 Flash · GA · MCP Orchestrator",
    sourceTags: [
      { label: "Jira Software MCP", type: "mcp" },
      { label: "PostgreSQL VPC Gateway", type: "mcp" },
      { label: "Google Chat API", type: "drive" },
    ],
    steps: [
      { label: "Review the request and configured permissions", status: "done", latency: "Demo" },
      { label: "Read from the approved connector scope", status: "done", latency: "Demo" },
      { label: "Prepare a proposed action for review", status: "done", latency: "Demo" },
      { label: "Wait for an authorized person to approve", status: "done", latency: "Demo" },
    ],
    output: "This local simulation previews a supervised workflow. In a configured deployment, connector scope, permissions, and human approval requirements must be set by the organization before any external action is enabled.",
    citations: [
      { id: "c4", name: "issue-summary.txt", type: "Issue tracker", metric: "Example source" },
      { id: "c5", name: "approved-data-source", type: "Connector", metric: "Example source" },
      { id: "c6", name: "team-update-draft.docx", type: "Google Docs", metric: "Draft only" },
    ],
    telemetry: {
      tokens: "Sample flow",
      speed: "No API request",
      ttft: "Local demo",
      compliance: "No external actions",
    },
  },
  {
    id: "security-audit",
    tabLabel: "Model Armor & Guardrails",
    query: "Preview how a governed workflow can surface policy checks and questions for a reviewer.",
    model: "Gemini 3.8 Flash · Model Armor Stack",
    sourceTags: [
      { label: "Cloud DLP Ruleset", type: "drive" },
      { label: "Model Armor Filter", type: "bigquery" },
      { label: "Google Vault Audit", type: "salesforce" },
    ],
    steps: [
      { label: "Inspect the configured policy scope", status: "done", latency: "Demo" },
      { label: "Flag content for the configured review path", status: "done", latency: "Demo" },
      { label: "Surface applicable admin controls", status: "done", latency: "Demo" },
      { label: "Prepare an example audit summary", status: "done", latency: "Demo" },
    ],
    output: "This local example is not a compliance assessment. Production safeguards depend on the Workspace edition, enabled services, organization policies, and applicable agreement. Have your administrator validate control coverage for the intended workflow.",
    citations: [
      { id: "c7", name: "data-protection-policy", type: "Admin policy", metric: "Example source" },
      { id: "c8", name: "retention-guidance.docx", type: "Workspace", metric: "Example source" },
      { id: "c9", name: "review-summary.txt", type: "Audit preview", metric: "Example only" },
    ],
    telemetry: {
      tokens: "Sample flow",
      speed: "No API request",
      ttft: "Local demo",
      compliance: "Admin review required",
    },
  },
];

export function SynapseSessionAssembler() {
  const [activeId, setActiveId] = useState<string>("deep-research");
  const [assembledStep, setAssembledStep] = useState(4);
  const [isTyping, setIsTyping] = useState(false);

  const scenario = SCENARIOS.find((s) => s.id === activeId) || SCENARIOS[0];

  useEffect(() => {
    setAssembledStep(0);
    setIsTyping(true);

    const stepTimers: NodeJS.Timeout[] = [];
    for (let i = 1; i <= 4; i++) {
      const timer = setTimeout(() => {
        setAssembledStep(i);
        if (i === 4) setIsTyping(false);
      }, i * 320);
      stepTimers.push(timer);
    }

    return () => {
      stepTimers.forEach(clearTimeout);
    };
  }, [activeId]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Session Switcher Pills - 21st.dev / ScrollTide style */}
      <div className="flex items-center justify-center gap-2 mb-6 flex-wrap px-2">
        {SCENARIOS.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={cn(
                "relative px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2",
                isActive
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30 scale-105"
                  : "bg-card/80 text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
              )}
            >
              <span className={cn(
                "w-1.5 h-1.5 rounded-full transition-all",
                isActive ? "bg-white animate-pulse" : "bg-muted-foreground/50"
              )} />
              {s.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Main Floating Glass Session Card */}
      <div className="synapse-card rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500">
        <span className="card-glow" aria-hidden="true" />

        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/80 bg-muted/40 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-[11px] text-muted-foreground hidden sm:inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
              local-preview://gemini-enterprise
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/30">
              <Sparkles className="w-3 h-3" />
              {scenario.model}
            </span>
            <span className="font-mono text-[10px] text-amber-700 dark:text-amber-300 font-semibold hidden md:inline">SIMULATED · NO MODEL CALL</span>
          </div>
        </div>

        {/* Query Input Strip */}
        <div className="p-5 md:p-7 border-b border-border/60 bg-card/40">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-violet-500/10 text-violet-500 flex items-center justify-center shrink-0 mt-0.5 border border-violet-500/20">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                Example Organization Prompt
              </p>
              <p className="text-base md:text-lg font-medium text-foreground tracking-tight leading-relaxed">
                "{scenario.query}"
              </p>

              {/* Source tags */}
              <div className="flex flex-wrap items-center gap-2 mt-3.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Sample context:
                </span>
                {scenario.sourceTags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-muted text-foreground/90 border border-border"
                  >
                    <Database className="w-3 h-3 text-google-blue" />
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Mid-Frame Reasoning Assembly */}
        <div className="p-5 md:p-7 space-y-6">
          {/* Assembling Steps */}
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-violet-500" />
                Workflow Preview Steps
              </p>
              <span className="text-[11px] font-mono text-violet-500 font-semibold">
                {assembledStep}/4 steps compiled
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {scenario.steps.map((step, idx) => {
                const isRevealed = idx < assembledStep;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ 
                      opacity: isRevealed ? 1 : 0.35, 
                      y: isRevealed ? 0 : 4 
                    }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "p-3 rounded-xl border text-xs font-mono flex items-start justify-between gap-3 transition-colors",
                      isRevealed 
                        ? "bg-muted/60 border-violet-500/30 text-foreground" 
                        : "bg-muted/20 border-border/40 text-muted-foreground"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-violet-500 shrink-0">
                        0{idx + 1}
                      </span>
                      <span className="leading-relaxed">{step.label}</span>
                    </div>
                    {isRevealed && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
                        <CheckCircle2 className="h-3 w-3" /> Ready
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Synthesized Output Stream */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 via-background to-blue-500/5 border border-violet-500/25 shadow-inner"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                    Illustrative Response
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                    Example only · verify sources
                </span>
              </div>

              <p className="text-sm md:text-base text-foreground leading-relaxed font-sans mb-4">
                {scenario.output}
              </p>

              {/* Verified Citations List */}
              <div className="pt-3.5 border-t border-border/70">
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Example source labels · not connected
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {scenario.citations.map((cite) => (
                    <div
                      key={cite.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-border text-xs font-mono text-foreground hover:border-violet-500/50 transition-colors shadow-sm cursor-default"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-google-green shrink-0" />
                      <span className="font-semibold text-google-blue">{cite.name}</span>
                      <span className="text-[10px] text-muted-foreground">({cite.metric})</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Telemetry Status Bar */}
        <div className="px-5 py-3 border-t border-border/80 bg-muted/40 text-[11px] font-mono text-muted-foreground flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Local simulation
            </span>
            <span>{scenario.telemetry.tokens}</span>
            <span className="hidden sm:inline">Speed: {scenario.telemetry.speed}</span>
          </div>

          <div className="flex items-center gap-1.5 text-foreground/80 font-medium">
            <Lock className="w-3.5 h-3.5 text-google-green" />
            <span>{scenario.telemetry.compliance}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
