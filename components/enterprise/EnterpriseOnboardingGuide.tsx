"use client";

import { useState, useEffect, useMemo, useId } from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  Download,
  Terminal,
  RefreshCw,
  Info,
  Laptop,
  ArrowRight,
} from "lucide-react";
import { onboardingSteps, workspaceBusinessSteps } from "@/data/onboardingSteps";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";

interface EnterpriseOnboardingGuideProps {
  initialEdition?: "business" | "standard" | "plus";
  allowedModes?: "business-only" | "cloud-only" | "all";
}

export function EnterpriseOnboardingGuide({
  initialEdition = "business",
  allowedModes = "all",
}: EnterpriseOnboardingGuideProps = {}) {
  const { locale, href } = useLocale();
  const t = createPhraseTranslator(locale);
  const checklistId = useId();

  // Edition selection: 'business' | 'standard' | 'plus'
  const [selectedEdition, setSelectedEdition] = useState<"business" | "standard" | "plus">(
    allowedModes === "cloud-only" && initialEdition === "business" ? "standard" : initialEdition
  );
  // Organization status for GCP tiers: 'org' or 'no-org'
  const [orgStatus, setOrgStatus] = useState<"org" | "no-org">("org");

  useEffect(() => {
    if (allowedModes === "business-only" && selectedEdition !== "business") {
      setSelectedEdition("business");
      setActiveStepIndex(0);
    }

    if (allowedModes === "cloud-only" && selectedEdition === "business") {
      setSelectedEdition("standard");
      setActiveStepIndex(0);
    }
  }, [allowedModes, selectedEdition]);
  // Active step index
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  // Completed subtasks tracked by task ID
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  // Clipboard copy state tracker
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Active steps dataset depending on edition
  const currentSteps = useMemo(() => {
    return selectedEdition === "business" ? workspaceBusinessSteps : onboardingSteps;
  }, [selectedEdition]);

  // Load saved progress from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gemini_enterprise_onboarding_progress");
      if (saved) {
        setCompletedTasks(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  // Handle switching editions safely
  const handleEditionChange = (edition: "business" | "standard" | "plus") => {
    setSelectedEdition(edition);
    setActiveStepIndex(0);
  };

  // Save progress changes
  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const next = { ...prev, [taskId]: !prev[taskId] };
      try {
        localStorage.setItem("gemini_enterprise_onboarding_progress", JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const resetProgress = () => {
    if (window.confirm(t("Reset all onboarding checklist progress?"))) {
      setCompletedTasks({});
      try {
        localStorage.removeItem("gemini_enterprise_onboarding_progress");
      } catch {
        // Ignore
      }
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2200);
    } catch {
      // Fallback
    }
  };

  // Calculate overall completion statistics for current active steps
  const totalSubtasks = useMemo(() => {
    return currentSteps.reduce((acc, step) => acc + step.subtasks.length, 0);
  }, [currentSteps]);

  const completedCount = useMemo(() => {
    const currentTaskIds = new Set(
      currentSteps.flatMap((step) => step.subtasks.map((task) => task.id))
    );
    return Object.entries(completedTasks).filter(([id, done]) => done && currentTaskIds.has(id)).length;
  }, [completedTasks, currentSteps]);

  const progressPercent = Math.min(100, Math.round((completedCount / totalSubtasks) * 100));

  const safeStepIndex = Math.min(activeStepIndex, currentSteps.length - 1);
  const activeStep = currentSteps[safeStepIndex] || currentSteps[0];

  // Export checklist as Markdown summary
  const exportChecklistMarkdown = () => {
    let md = `# Gemini Enterprise (${selectedEdition.toUpperCase()}) Onboarding Checklist\n`;
    if (selectedEdition === "business") {
      md += `Management Console: Google Workspace Admin Console (admin.google.com)\n`;
      md += `Base Platform: Google Workspace Domain Verified\n`;
    } else {
      md += `Management Console: Google Cloud Console (console.cloud.google.com)\n`;
      md += `Organization Hierarchy: ${orgStatus === "org" ? "Domain Organization Node" : "No Organization (Standalone / Migration Required)"}\n`;
    }
    md += `Overall Progress: ${completedCount} / ${totalSubtasks} tasks completed (${progressPercent}%)\n\n`;

    currentSteps.forEach((step) => {
      md += `## Step ${step.stepNumber}: ${step.title}\n`;
      md += `${step.summary}\n\n`;
      step.subtasks.forEach((task) => {
        const isDone = completedTasks[task.id] ? "[x]" : "[ ]";
        md += `- ${isDone} **${task.title}**\n  ${task.description}\n`;
        if (task.consolePath) {
          md += `  *Console Path: ${task.consolePath}*\n`;
        }
        if (task.cliCommand) {
          md += `  \`\`\`bash\n  ${task.cliCommand.replace(/\n/g, "\n  ")}\n  \`\`\`\n`;
        }
      });
      md += "\n";
    });

    copyToClipboard(md, "export-md");
  };

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* Top Configuration & Control Bar */}
      <div className="mb-10 rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-md shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-google-blue/20 bg-google-blue/10 px-3 py-1 text-xs font-semibold text-google-blue">
              <Sparkles className="h-3.5 w-3.5" />
              {t("Interactive Deployment Guide")}
            </div>
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {t("Configure Onboarding Parameters")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("Tailor instructions, quota expectations, and console click paths to your edition.")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Edition Controls depending on allowedModes */}
            {allowedModes === "business-only" ? (
              <div className="rounded-xl border border-google-blue/30 bg-google-blue/10 px-3.5 py-2 text-xs font-semibold text-google-blue flex items-center gap-1.5">
                <Laptop className="h-3.5 w-3.5" />
                Business Edition (Google Workspace)
              </div>
            ) : allowedModes === "cloud-only" ? (
              <div className="rounded-xl border border-border bg-muted/30 p-1">
                <div className="flex items-center gap-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => handleEditionChange("standard")}
                    className={`rounded-lg px-3.5 py-2 transition-all ${
                      selectedEdition === "standard"
                        ? "bg-google-blue text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Standard (30 GiB)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEditionChange("plus")}
                    className={`rounded-lg px-3.5 py-2 transition-all ${
                      selectedEdition === "plus"
                        ? "bg-google-blue text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Plus (75 GiB)
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-muted/30 p-1">
                <div className="flex items-center gap-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => handleEditionChange("business")}
                    className={`rounded-lg px-3.5 py-2 transition-all flex items-center gap-1.5 ${
                      selectedEdition === "business"
                        ? "bg-google-blue text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Laptop className="h-3.5 w-3.5" />
                    Business (Workspace)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEditionChange("standard")}
                    className={`rounded-lg px-3.5 py-2 transition-all ${
                      selectedEdition === "standard"
                        ? "bg-google-blue text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Standard (GCP)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEditionChange("plus")}
                    className={`rounded-lg px-3.5 py-2 transition-all ${
                      selectedEdition === "plus"
                        ? "bg-google-blue text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Plus (GCP)
                  </button>
                </div>
              </div>
            )}

            {/* Org Hierarchy Switcher (for GCP) or Workspace Badge (for Business) */}
            {selectedEdition === "business" ? (
              <div className="inline-flex items-center gap-2 rounded-xl border border-google-blue/30 bg-google-blue/10 px-3.5 py-2 text-xs font-semibold text-google-blue">
                <Laptop className="h-3.5 w-3.5" />
                {t("admin.google.com Admin Console")}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-muted/30 p-1">
                <div className="flex items-center gap-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setOrgStatus("org")}
                    className={`rounded-lg px-3 py-2 transition-all ${
                      orgStatus === "org"
                        ? "bg-foreground text-background shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Building2 className="inline mr-1.5 h-3.5 w-3.5" />
                    In Organization
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrgStatus("no-org")}
                    className={`rounded-lg px-3 py-2 transition-all ${
                      orgStatus === "no-org"
                        ? "bg-amber-600 text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <AlertTriangle className="inline mr-1.5 h-3.5 w-3.5" />
                    No Organization
                  </button>
                </div>
              </div>
            )}

            {/* Cross-Link navigation button */}
            {allowedModes === "business-only" && (
              <Link
                href={href("/enterprise/onboarding/cloud")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold text-google-blue hover:bg-muted transition-all"
              >
                <span>{t("Standard & Plus (Cloud) Guide")}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}

            {allowedModes === "cloud-only" && (
              <Link
                href={href("/enterprise/onboarding/business")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold text-google-blue hover:bg-muted transition-all"
              >
                <span>{t("Business (Workspace) Guide")}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}

            {/* Export & Reset */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={exportChecklistMarkdown}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-all"
                title="Copy markdown checklist to clipboard"
              >
                {copiedId === "export-md" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-google-green" />
                    {t("Copied!")}
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" />
                    {t("Export Checklist")}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetProgress}
                className="rounded-lg border border-border/60 p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                title="Reset progress"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 border-t border-border/50 pt-5">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
            <span>
              {t("Overall Implementation Progress")}: {completedCount} / {totalSubtasks} {t("subtasks completed")}
            </span>
            <span className="text-foreground font-bold">{progressPercent}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-muted/60 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-google-blue via-gemini-indigo to-gemini-purple transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Dynamic Context Alerts */}
        {selectedEdition === "business" && (
          <div className="mt-4 rounded-xl border border-google-blue/30 bg-google-blue/5 p-4 text-xs leading-relaxed text-muted-foreground flex items-start gap-3">
            <Info className="h-5 w-5 shrink-0 text-google-blue mt-0.5" />
            <div>
              <span className="font-bold text-foreground">
                Gemini Enterprise – Business Edition (Google Workspace Associated):{" "}
              </span>
              {t(
                "Managed centrally via the Google Workspace Admin console (admin.google.com). Features 25 GiB pooled storage and data indexing per seat, up to 300 seats, native grounding across Gmail, Docs, Sheets, and Drive, plus Gemini Notebook. Requires no Google Cloud infrastructure or GCP project setup."
              )}
            </div>
          </div>
        )}

        {selectedEdition !== "business" && orgStatus === "no-org" && (
          <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <p className="font-bold mb-1">
                {t("Action Required: Standalone Google Cloud Account Detected ('No organization')")}
              </p>
              <p>
                {t(
                  "While you can enable APIs and link billing on standalone projects, enterprise features such as directory-synced group licensing, centralized policy constraints, and domain-wide Gemini Enterprise deployments require an Organization Node. It is highly recommended to register your corporate domain with Cloud Identity Free before enterprise license distribution."
                )}
              </p>
            </div>
          </div>
        )}

        {selectedEdition === "plus" && (
          <div className="mt-4 rounded-xl border border-google-blue/30 bg-google-blue/5 p-4 text-xs leading-relaxed text-muted-foreground flex items-start gap-3">
            <Info className="h-5 w-5 shrink-0 text-google-blue mt-0.5" />
            <div>
              <span className="font-bold text-foreground">Gemini Enterprise Plus Edition: </span>
              {t(
                "Includes 75 GiB per user pooled storage and indexing, full third-party connector access, priority access to latest Gemini models, Agent Marketplace, and high-assurance governance guardrails on Google Cloud."
              )}
            </div>
          </div>
        )}

        {selectedEdition === "standard" && (
          <div className="mt-4 rounded-xl border border-border/70 bg-muted/20 p-4 text-xs leading-relaxed text-muted-foreground flex items-start gap-3">
            <Info className="h-5 w-5 shrink-0 text-google-blue mt-0.5" />
            <div>
              <span className="font-bold text-foreground">Gemini Enterprise Standard Edition: </span>
              {t(
                "Includes 30 GiB per user pooled storage and indexing, full data connector ecosystem, priority model access, and core agent governance tools on Google Cloud at $30/seat/month."
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Two-Column Workflow Container */}
      <div className="grid gap-8 lg:grid-cols-[340px_1fr] items-start">
        {/* Left Step Navigation Sidebar */}
        <aside className="sticky top-24 rounded-2xl border border-border bg-card/40 p-4 backdrop-blur-sm shadow-sm space-y-1">
          <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
            <span>{t("Onboarding Steps")}</span>
            <span className="text-[10px] text-google-blue font-semibold uppercase">
              {selectedEdition === "business" ? "Workspace" : "Cloud"}
            </span>
          </div>

          <div className="space-y-1">
            {currentSteps.map((step, idx) => {
              const isActive = idx === safeStepIndex;
              const stepCompleted = step.subtasks.every((t) => completedTasks[t.id]);
              const stepDoneCount = step.subtasks.filter((t) => completedTasks[t.id]).length;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`w-full text-left rounded-xl px-3.5 py-3 transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-google-blue text-white shadow-md font-semibold"
                      : "text-foreground hover:bg-muted/60"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isActive
                          ? "bg-white text-google-blue"
                          : stepCompleted
                          ? "bg-google-green text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {stepCompleted ? <Check className="h-3.5 w-3.5" /> : step.stepNumber}
                    </span>
                    <span className="truncate text-sm">{step.shortTitle}</span>
                  </div>

                  <span
                    className={`text-xs ml-2 ${
                      isActive ? "text-white/80" : "text-muted-foreground"
                    }`}
                  >
                    {stepDoneCount}/{step.subtasks.length}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Active Step Detailed Workspace */}
        <main className="space-y-8 rounded-2xl border border-border bg-card/60 p-6 sm:p-8 backdrop-blur-sm shadow-sm">
          {/* Active Step Header */}
          <div className="border-b border-border pb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-google-blue/20 bg-google-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-google-blue">
                {t("Step")} {activeStep.stepNumber} {t("of")} {currentSteps.length}
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <button
                  type="button"
                  disabled={safeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="rounded-lg border border-border px-3 py-1.5 hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  {t("Previous")}
                </button>
                <button
                  type="button"
                  disabled={safeStepIndex === currentSteps.length - 1}
                  onClick={() =>
                    setActiveStepIndex((prev) => Math.min(currentSteps.length - 1, prev + 1))
                  }
                  className="rounded-lg border border-border px-3 py-1.5 hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  {t("Next")}
                </button>
              </div>
            </div>

            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {activeStep.title}
            </h1>
            <p className="mt-2 text-sm text-google-blue font-semibold">{activeStep.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {activeStep.summary}
            </p>
          </div>

          {/* Subtasks Action Checklist */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-google-blue" />
              {t("Required Implementation Subtasks")}
            </h3>

            <div className="space-y-4">
              {activeStep.subtasks.map((task) => {
                const isChecked = Boolean(completedTasks[task.id]);

                return (
                  <div
                    key={task.id}
                    className={`rounded-xl border p-5 transition-all ${
                      isChecked
                        ? "border-google-green/40 bg-google-green/5 dark:bg-google-green/10"
                        : "border-border bg-card/80 hover:border-border/90"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <button
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-border transition-colors hover:border-google-blue"
                        aria-label={`Mark ${task.title} as completed`}
                      >
                        {isChecked ? (
                          <Check className="h-4 w-4 text-google-green font-bold" />
                        ) : (
                          <div className="h-3 w-3 rounded-sm bg-transparent" />
                        )}
                      </button>

                      <div className="flex-1 space-y-3 min-w-0">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4
                              className={`text-sm font-semibold tracking-tight ${
                                isChecked
                                  ? "line-through text-muted-foreground"
                                  : "text-foreground"
                              }`}
                            >
                              {task.title}
                            </h4>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {task.description}
                          </p>
                        </div>

                        {/* Console Click Path */}
                        {task.consolePath && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2 border border-border/50">
                            <span className="font-semibold text-foreground shrink-0">
                              {t("Console Path")}:
                            </span>
                            <code className="text-xs text-google-blue break-all">
                              {task.consolePath}
                            </code>
                          </div>
                        )}

                        {/* Org vs No-Org Note */}
                        {task.orgVsNoOrgNote && orgStatus === "no-org" && selectedEdition !== "business" && (
                          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-900 dark:text-amber-200">
                            <span className="font-bold">{t("Hierarchy Note")}: </span>
                            {task.orgVsNoOrgNote}
                          </div>
                        )}

                        {/* Standard vs Plus / Business Note */}
                        {task.standardVsPlusNote && (
                          <div className="rounded-lg border border-google-blue/20 bg-google-blue/5 p-3 text-xs text-muted-foreground">
                            <span className="font-semibold text-foreground">
                              {t("Edition Specifics")}:{" "}
                            </span>
                            {task.standardVsPlusNote}
                          </div>
                        )}

                        {/* Note callout */}
                        {task.notes && (
                          <div className="rounded-lg border border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground">
                            <span className="font-semibold text-foreground">{t("Note")}: </span>
                            {task.notes}
                          </div>
                        )}

                        {/* Copyable CLI Command (for GCP workflows) */}
                        {task.cliCommand && (
                          <div className="relative mt-2 rounded-xl border border-border/80 bg-zinc-950 p-4 text-xs font-mono text-zinc-100 dark:bg-black/80">
                            <div className="flex items-center justify-between pb-2 text-[11px] text-zinc-400 border-b border-zinc-800 mb-2">
                              <span className="flex items-center gap-1.5">
                                <Terminal className="h-3.5 w-3.5 text-google-green" />
                                Google Cloud CLI (gcloud)
                              </span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(task.cliCommand!, task.id)}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-300 hover:text-white transition-colors"
                              >
                                {copiedId === task.id ? (
                                  <>
                                    <Check className="h-3 w-3 text-google-green" />
                                    <span>{t("Copied!")}</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3 w-3" />
                                    <span>{t("Copy")}</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="overflow-x-auto whitespace-pre leading-relaxed text-zinc-200">
                              {task.cliCommand}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* IAM Role Governance Matrix (Shown on GCP Step 4 or if present) */}
          {activeStep.iamRoles && (
            <div className="mt-8 space-y-4 rounded-xl border border-border bg-card/40 p-5">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-google-green" />
                {t("IAM Role Reference Matrix")}
              </h3>
              <p className="text-xs text-muted-foreground">
                {t(
                  "Assign least-privilege roles to service agents, administrators, and knowledge workers."
                )}
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                      <th className="py-2.5 px-3">{t("Persona")}</th>
                      <th className="py-2.5 px-3">{t("IAM Role Identifier")}</th>
                      <th className="py-2.5 px-3">{t("Role Title")}</th>
                      <th className="py-2.5 px-3">{t("Purpose & Scope")}</th>
                      <th className="py-2.5 px-3">{t("Status")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {activeStep.iamRoles.map((role) => (
                      <tr key={role.role} className="hover:bg-muted/20">
                        <td className="py-2.5 px-3 font-semibold text-foreground">{role.persona}</td>
                        <td className="py-2.5 px-3 font-mono text-google-blue">{role.role}</td>
                        <td className="py-2.5 px-3 text-foreground">{role.title}</td>
                        <td className="py-2.5 px-3 text-muted-foreground leading-relaxed">
                          {role.purpose}
                        </td>
                        <td className="py-2.5 px-3">
                          {role.isMandatory ? (
                            <span className="rounded-full bg-google-blue/10 px-2 py-0.5 text-[10px] font-bold text-google-blue">
                              {t("Mandatory")}
                            </span>
                          ) : (
                            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                              {t("Optional")}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Troubleshooting Section */}
          {activeStep.commonTroubleshooting && (
            <div className="mt-8 space-y-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                {t("Common Pitfalls & Resolutions")}
              </h4>
              <div className="space-y-3">
                {activeStep.commonTroubleshooting.map((item, idx) => (
                  <div key={idx} className="text-xs">
                    <span className="font-semibold text-amber-900 dark:text-amber-200">
                      • {item.issue}:{" "}
                    </span>
                    <span className="text-muted-foreground">{item.resolution}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Citations & Official References */}
          <div className="mt-8 border-t border-border pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-1.5">
              <ExternalLink className="h-3.5 w-3.5" />
              {t("Official Documentation Citations")}
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {activeStep.citations.map((cite) => (
                <a
                  key={cite.url}
                  href={cite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-border bg-card/50 p-3.5 transition-all hover:border-google-blue/50 hover:bg-muted/30"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-google-blue group-hover:underline">
                    <span>{cite.label}</span>
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                    {cite.description}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Step Navigation Bar */}
          <div className="flex items-center justify-between border-t border-border pt-6">
            {safeStepIndex > 0 ? (
              <button
                type="button"
                onClick={() => setActiveStepIndex((prev) => prev - 1)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                ← {currentSteps[safeStepIndex - 1].shortTitle}
              </button>
            ) : (
              <div />
            )}

            {safeStepIndex < currentSteps.length - 1 && (
              <button
                type="button"
                onClick={() => setActiveStepIndex((prev) => prev + 1)}
                className="inline-flex items-center gap-2 rounded-xl bg-google-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-google-blue/90 shadow-sm transition-all"
              >
                {t("Continue to")} {currentSteps[safeStepIndex + 1].shortTitle} →
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
