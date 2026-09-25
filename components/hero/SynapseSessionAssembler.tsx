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
    query: "Synthesize Q3 enterprise expansion trends across 14 Drive strategy docs, BigQuery customer cohorts, and Salesforce pipeline.",
    model: "Gemini 3.1 Pro · Preview · 1M Context",
    sourceTags: [
      { label: "Google Drive (14 files)", type: "drive" },
      { label: "BigQuery (Cohort_ARR)", type: "bigquery" },
      { label: "Salesforce CRM", type: "salesforce" },
    ],
    steps: [
      { label: "Grounded ACL check passed (Sales & Exec OU)", status: "done", latency: "3ms" },
      { label: "Cross-indexed 1.4M tokens across 14 PDF strategy briefs", status: "done", latency: "11ms" },
      { label: "Queried BigQuery enterprise retention rates (98.4%)", status: "done", latency: "8ms" },
      { label: "Synthesized executive briefing with verified citations", status: "done", latency: "14ms" },
    ],
    output: "Enterprise pipeline expansion is up 42% YoY, primarily concentrated in multi-region cloud migrations. BigQuery analysis confirms net revenue retention of 118% among accounts utilizing native Workspace connectors. Zero data leakage detected; prompt inputs isolated from public model training.",
    citations: [
      { id: "c1", name: "Q3_Strategic_Review_v4.gdoc", type: "Google Drive", metric: "99.4% confidence" },
      { id: "c2", name: "bq_enterprise_cohort_2026.sql", type: "BigQuery", metric: "Verified source" },
      { id: "c3", name: "SFDC_Opp_Stage4_Global.json", type: "Salesforce", metric: "$14.2M pipeline" },
    ],
    telemetry: {
      tokens: "2,840 tokens",
      speed: "482 tok/sec",
      ttft: "12ms",
      compliance: "Model Armor Active · Zero-Training",
    },
  },
  {
    id: "mcp-agent",
    tabLabel: "Autonomous MCP Tool Agent",
    query: "Inspect Jira sprint blocker #ENG-4892, run database diagnostic via VPC MCP server, and alert engineering leads on Google Chat.",
    model: "Gemini 3.8 Flash · GA · MCP Orchestrator",
    sourceTags: [
      { label: "Jira Software MCP", type: "mcp" },
      { label: "PostgreSQL VPC Gateway", type: "mcp" },
      { label: "Google Chat API", type: "drive" },
    ],
    steps: [
      { label: "Invoked Jira MCP server: retrieved ticket #ENG-4892 details", status: "done", latency: "5ms" },
      { label: "Executed read-only PostgreSQL schema verification over TLS", status: "done", latency: "12ms" },
      { label: "Identified index lock on partition customer_events_2026_q3", status: "done", latency: "7ms" },
      { label: "Drafted remediation pull request & dispatched Chat notification", status: "done", latency: "9ms" },
    ],
    output: "Ticket #ENG-4892 resolved to a missing index on customer_events partition table during peak ingest. Generated safe migration patch `add_index_concurrently.sql`. Alert dispatched to #core-infra with zero-privilege service account credentials.",
    citations: [
      { id: "c4", name: "jira://ticket/ENG-4892", type: "Jira MCP", metric: "Severity High" },
      { id: "c5", name: "vpc-pg-internal.corp.local", type: "VPC Gateway", metric: "TLS 1.3 Verified" },
      { id: "c6", name: "chat://space/core-infra", type: "Google Chat", metric: "Sent to 8 leads" },
    ],
    telemetry: {
      tokens: "1,920 tokens",
      speed: "510 tok/sec",
      ttft: "9ms",
      compliance: "VPC-SC Enforced · Non-mutating default",
    },
  },
  {
    id: "security-audit",
    tabLabel: "Model Armor & Guardrails",
    query: "Audit external prompt submission for prompt injection, confidential PII leakage, and regulatory adherence.",
    model: "Gemini 3.8 Flash · Model Armor Stack",
    sourceTags: [
      { label: "Cloud DLP Ruleset", type: "drive" },
      { label: "Model Armor Filter", type: "bigquery" },
      { label: "Google Vault Audit", type: "salesforce" },
    ],
    steps: [
      { label: "Scanned prompt with Model Armor heuristic sanitizer", status: "done", latency: "2ms" },
      { label: "DLP policy checked: 0 social security numbers or API keys", status: "done", latency: "4ms" },
      { label: "Verified zero-training contractual boundary for organization", status: "done", latency: "1ms" },
      { label: "Immutable audit event written to BigQuery SIEM sink", status: "done", latency: "6ms" },
    ],
    output: "Prompt validated clean under ISO 27001, SOC 2 Type II, and HIPAA compliance policies. Model Armor suppressed 1 indirect jailbreak vector in attached PDF footnote. Query execution proceeded inside isolated customer tenant environment.",
    citations: [
      { id: "c7", name: "policy://dlp/global_strict_v2", type: "Cloud DLP", metric: "Zero Violations" },
      { id: "c8", name: "vault://audit_events/20260925", type: "Google Vault", metric: "SHA-256 Hash Logged" },
      { id: "c9", name: "modelarmor://telemetry/event_8921", type: "Model Armor", metric: "Jailbreak Neutralized" },
    ],
    telemetry: {
      tokens: "840 tokens",
      speed: "640 tok/sec",
      ttft: "6ms",
      compliance: "100% Data Isolation Guarantee",
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
              synapse-session://grounded.gemini.enterprise
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/30">
              <Sparkles className="w-3 h-3" />
              {scenario.model}
            </span>
            <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hidden md:inline">
              TTFT: {scenario.telemetry.ttft}
            </span>
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
                Active Organization Prompt
              </p>
              <p className="text-base md:text-lg font-medium text-foreground tracking-tight leading-relaxed">
                "{scenario.query}"
              </p>

              {/* Source tags */}
              <div className="flex flex-wrap items-center gap-2 mt-3.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Grounded in:
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
                Live Execution Steps
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
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
                        {step.latency}
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
                  Synthesized Enterprise Intelligence
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  Grounded · ACL Filtered
                </span>
              </div>

              <p className="text-sm md:text-base text-foreground leading-relaxed font-sans mb-4">
                {scenario.output}
              </p>

              {/* Verified Citations List */}
              <div className="pt-3.5 border-t border-border/70">
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Verified In-Tenant Citations
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
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Stream Active
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
