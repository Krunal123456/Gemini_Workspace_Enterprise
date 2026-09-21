"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Search, ArrowRight, Command, CheckCircle2, Sparkles } from "lucide-react";
import { GeminiNodeVisualizer } from "./GeminiNodeVisualizer";
import { EcosystemMarquee } from "./EcosystemMarquee";
import { GoogleWorkspaceLogo } from "@/components/logos/GoogleWorkspaceLogo";
import { features } from "@/data/features";
import { connectors } from "@/data/connectors";
import { plans } from "@/data/plans";
import { applications } from "@/data/apps";

const tabs = ["Google Workspace", "Gemini Enterprise"] as const;
const promptStates = {
  "Google Workspace": [
    "Grounding everyday work in Gmail, Drive, Docs, Sheets, and Meet context.",
    "Summarizing cross-app collaboration and surfacing the next operational action.",
    "Turning fragmented work signals into a single operational view for teams.",
  ],
  "Gemini Enterprise": [
    "Reasoning across enterprise data, documents, and workflows with governance-first orchestration.",
    "Combining research, analysis, and agentic execution for high-trust automation.",
    "Helping teams move from raw information to decisions, code, and execution.",
  ],
} as const;

const featureCount = features.length;

export function Hero() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Google Workspace");
  const [liveState, setLiveState] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const heroHeadlines = [
    "The AI operating layer for the modern enterprise.",
    "The intelligence layer for modern work.",
    "The Google-first AI stack for confident execution.",
    "AI, governance, and workflow in one trusted system.",
  ];

  useEffect(() => {
    const metrics = metricsRef.current;
    if (!metrics || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      metrics.children,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, delay: 0.45, ease: "power2.out" },
    );
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLiveState((previous) => (previous + 1) % promptStates[activeTab].length);
    }, 1800);

    return () => window.clearInterval(timer);
  }, [activeTab]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeadlineIndex((previous) => (previous + 1) % heroHeadlines.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const handleOpenSearch = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  };

  const handleSearchSubmit = (valueOverride?: string) => {
    const value = (valueOverride ?? searchQuery).trim();
    if (!value) {
      handleOpenSearch();
      return;
    }

    const normalized = value.toLowerCase();

    const connectorMatch = connectors.find((connector) => {
      const haystack = [
        connector.name,
        connector.id,
        connector.category,
        connector.description,
        connector.type,
        connector.enterpriseRequirements,
        connector.status,
        ...connector.supportedEditions,
        ...connector.groundingCapabilities,
        ...connector.dataTypes,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });

    if (connectorMatch) {
      router.push(`/enterprise/connectors?q=${encodeURIComponent(connectorMatch.id)}`);
      return;
    }

    const featureMatch = features.find((feature) => {
      const haystack = [
        feature.name,
        feature.description,
        feature.category,
        feature.application,
        ...feature.capabilities,
        ...feature.useCases,
      ].join(" ").toLowerCase();
      return haystack.includes(normalized);
    });

    if (featureMatch) {
      router.push(`/features/${featureMatch.slug}`);
      return;
    }

    const planMatch = plans.find((plan) => {
      const haystack = [plan.name, plan.shortName, plan.tagline, plan.category, ...plan.highlightedFeatures].join(" ").toLowerCase();
      return haystack.includes(normalized);
    });

    if (planMatch) {
      router.push(`/compare?tab=matrix`);
      return;
    }

    const appMatch = applications.find((app) => {
      const haystack = [app.name, app.shortName, app.tagline, app.category, ...app.keyAIFeatures].join(" ").toLowerCase();
      return haystack.includes(normalized);
    });

    if (appMatch) {
      router.push(`/apps/${appMatch.slug}`);
      return;
    }

    handleOpenSearch();
  };

  const quickSearches = ["Jira", "Salesforce", "NotebookLM", "Deep Research", "DLP", "Gemini Enterprise"];
  const typedPrompts = ["Workspace", "Gemini", "Jira", "Security", "Connectors"];
  const [typedIndex, setTypedIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPrompt = typedPrompts[typedIndex];
    const speed = isDeleting ? 45 : typedLength >= currentPrompt.length ? 1200 : 90;

    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        const nextLength = typedLength + 1;
        setTypedLength(nextLength);

        if (nextLength >= currentPrompt.length) {
          setIsDeleting(true);
        }
      } else {
        const nextLength = typedLength - 1;
        setTypedLength(nextLength);

        if (nextLength <= 0) {
          setIsDeleting(false);
          setTypedIndex((previous) => (previous + 1) % typedPrompts.length);
        }
      }
    }, speed);

    return () => window.clearTimeout(timeout);
  }, [typedLength, typedIndex, isDeleting]);

  const typedSearchPrompt = searchQuery ? "" : `Search ${typedPrompts[typedIndex].slice(0, typedLength)}|`;

  return (
    <section className="mesh-shell relative w-full overflow-hidden pt-24 pb-20 md:pt-28 md:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(96,165,250,0.18),transparent_22%),radial-gradient(circle_at_80%_10%,rgba(52,211,153,0.12),transparent_20%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.12),transparent_32%)]" />
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative z-10 flex flex-col items-start">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-[680px] text-4xl font-black leading-[0.88] tracking-[-0.08em] text-slate-900 sm:text-5xl lg:text-[5rem] dark:text-white"
            >
              <motion.span
                key={headlineIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="block bg-gradient-to-r from-blue-700 via-blue-500 to-emerald-500 bg-clip-text text-transparent dark:from-[#dbeafe] dark:via-[#93c5fd] dark:to-[#34d399]"
              >
                {heroHeadlines[headlineIndex]}
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300"
            >
              Unify Google Workspace, Gemini, enterprise data, and governance into one system that discovers insight, automates work, and scales confidently across teams.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 w-full max-w-xl"
            >
              <motion.div
                animate={{
                  boxShadow: isSearchFocused
                    ? "0 0 0 1px rgba(96,165,250,0.75), 0 20px 45px -30px rgba(59,130,246,0.7)"
                    : "0 18px 40px -30px rgba(96,165,250,0.55)",
                }}
                className="group relative flex min-h-[72px] w-full items-center overflow-hidden rounded-full border border-slate-200 bg-white/85 px-3 py-3 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/35 dark:border-white/10 dark:bg-slate-900/60"
              >
                <Search className="pointer-events-none absolute left-5 h-5 w-5 text-slate-500 transition-colors group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-300" />

                <div className="flex w-full items-center overflow-hidden pl-10 pr-16">
                  <div className="flex min-w-0 flex-1 items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          handleSearchSubmit();
                        }
                      }}
                      placeholder={searchQuery ? "" : typedSearchPrompt}
                      className="h-10 w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-500 sm:text-base dark:text-slate-200 dark:placeholder:text-slate-400"
                      aria-label="Search Workspace capabilities"
                    />
                  </div>
                </div>

                <div className="absolute right-3 flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-950/90 dark:text-slate-200">
                  <Command className="h-3 w-3" />
                  <span>K</span>
                </div>
              </motion.div>
            </motion.div>

            <div className="mt-4 flex w-full flex-wrap items-center gap-2">
              {quickSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setSearchQuery(item);
                    handleSearchSubmit(item);
                  }}
                  className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-blue-400/40 hover:text-blue-700 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:text-blue-200"
                >
                  {item}
                </button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex w-full flex-wrap items-center gap-4"
            >
              <Link
                href="/features"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-500/40 bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(59,130,246,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-400"
              >
                Explore {featureCount} features
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/30 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
              >
                Compare plans
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="relative"
          >
            <div className="luxury-panel relative overflow-hidden rounded-[30px] border border-slate-200/80 p-3 shadow-[0_40px_120px_-40px_rgba(96,165,250,0.6)] dark:border-white/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.22),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(52,211,153,0.14),transparent_18%)]" />
              <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white/90 dark:border-white/10 dark:bg-slate-950/80">
                <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-1 shadow-sm dark:border-white/10 dark:bg-white/5">
                      <GoogleWorkspaceLogo className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{activeTab}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-200">
                    live
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3 dark:border-white/10">
                  <div className="flex gap-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={[
                          "rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
                          activeTab === tab ? "bg-blue-500/15 text-blue-700 ring-1 ring-blue-400/30 dark:bg-blue-500/20 dark:text-blue-100 dark:ring-blue-400/30" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200",
                        ].join(" ")}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
                    context-aware
                  </div>
                </div>

                <div className="space-y-4 p-4">
                  <div className="rounded-[24px] border border-blue-200/40 bg-[linear-gradient(135deg,#0F172A_0%,#0F172A_20%,#0B1A2D_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <div className="mb-3 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.24em] text-slate-400">
                      <span>AI overview</span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-[9px] font-medium text-emerald-300">
                        <CheckCircle2 className="h-3 w-3" /> operational
                      </span>
                    </div>

                    <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
                      <div className="space-y-3">
                        <p className="text-sm font-medium leading-6 text-slate-100">{promptStates[activeTab][liveState]}</p>
                        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Primary value</span>
                          <span className="text-sm font-semibold text-white">
                            {activeTab === "Google Workspace" ? "Grounded collaboration" : "Enterprise reasoning"}
                          </span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                        <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-slate-400">
                          {activeTab === "Google Workspace" ? "Core apps" : "Core use cases"}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(activeTab === "Google Workspace"
                            ? ["Gmail", "Docs", "Drive", "Sheets", "Meet"]
                            : ["Research", "Analysis", "Agents", "Security", "Automation"]
                          ).map((item) => (
                            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-slate-200">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {(activeTab === "Google Workspace"
                      ? [
                          { label: "Grounded search", value: "High" },
                          { label: "Control visibility", value: "Strong" },
                          { label: "Team adoption", value: "Scalable" },
                        ]
                      : [
                          { label: "Reasoning depth", value: "High" },
                          { label: "Automation scope", value: "Broad" },
                          { label: "Governance", value: "Enterprise-ready" },
                        ]
                    ).map((item) => (
                      <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm transition-colors duration-200 hover:border-blue-300 hover:bg-blue-50/60 dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/5">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{item.label}</div>
                        <div className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[20px] border border-slate-200 bg-gradient-to-r from-white via-slate-50 to-blue-50 p-3 dark:border-white/10 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950/40">
                    <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                      <span>Product stack</span>
                      <span>Enterprise fit</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {[
                        { title: "Workspace", detail: "Collaboration, docs and communication" },
                        { title: "Gemini", detail: "Reasoning, content and automation" },
                        { title: "Security", detail: "Access controls and governance" },
                      ].map((block) => (
                        <div key={block.title} className="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">{block.title}</div>
                          <div className="mt-2 text-[11px] leading-5 text-slate-600 dark:text-slate-300">{block.detail}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          ref={metricsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-5 border-t border-slate-200/80 pt-8 text-center sm:justify-between sm:text-left dark:border-white/10"
        >
          {[
            { value: featureCount, label: "features indexed" },
            { value: "11", label: "commercial plans" },
            { value: "9", label: "core apps" },
            { value: "100%", label: "grounded & secure" },
          ].map((item) => (
            <div key={item.label} className="metric-card min-w-[132px] rounded-2xl border border-slate-200/80 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <span className="block text-3xl font-black tracking-[-0.06em] text-slate-900 dark:text-white">{item.value}</span>
              <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-16 w-full border-y border-white/5 bg-white/[0.02]">
        <EcosystemMarquee />
      </div>
    </section>
  );
}
