"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ArrowRight, 
  Command, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Database, 
  Terminal,
  Activity,
  Cpu,
  Boxes,
  Zap,
  CheckCircle2
} from "lucide-react";
import { SynapseSessionAssembler } from "./SynapseSessionAssembler";
import { EcosystemMarquee } from "./EcosystemMarquee";
import { features } from "@/data/features";
import { connectors } from "@/data/connectors";
import { plans } from "@/data/plans";
import { applications } from "@/data/apps";

const featureCount = features.length;

export function Hero() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const quickSearches = [
    "Deep Research",
    "Model Context Protocol",
    "Salesforce Grounding",
    "Model Armor",
    "NotebookLM",
    "Google Vids",
  ];

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  const handleSearchSubmit = (valueOverride?: string) => {
    const value = (valueOverride ?? searchQuery).trim();
    if (!value) {
      handleOpenSearch();
      return;
    }

    const normalized = value.toLowerCase();

    const connectorMatch = connectors.find((connector) =>
      connector.name.toLowerCase().includes(normalized) ||
      connector.id.toLowerCase().includes(normalized)
    );
    if (connectorMatch) {
      router.push(`/enterprise/connectors?q=${encodeURIComponent(connectorMatch.id)}`);
      return;
    }

    const featureMatch = features.find((feature) =>
      feature.name.toLowerCase().includes(normalized) ||
      feature.description.toLowerCase().includes(normalized)
    );
    if (featureMatch) {
      router.push(`/features/${featureMatch.slug}`);
      return;
    }

    router.push(`/features?search=${encodeURIComponent(value)}`);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#090610] pt-28 pb-16 text-white synapse-ambient synapse-grid md:pt-32 md:pb-20">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-64 left-[42%] h-[38rem] w-[48rem] -translate-x-1/2 rounded-full bg-violet-700/25 blur-[150px]" />
        <div className="absolute right-[-12rem] top-[28rem] h-[28rem] w-[28rem] rounded-full bg-fuchsia-700/10 blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="max-w-2xl lg:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="synapse-badge mb-7"
          >
            <span className="h-2 w-2 rounded-full bg-violet-300" />
            <span className="font-bold">Enterprise intelligence</span>
            <span className="opacity-40">✦</span>
            <span className="font-normal text-white/70">Grounded in your data</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] text-balance sm:text-6xl lg:text-[3.75rem] xl:text-[4.5rem]"
          >
            Systems that{" "}
            <span className="block text-violet-300">
              answer first.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Search, compare, and connect Google&apos;s enterprise AI capabilities, with grounded answers and governance in view. Explore {featureCount} features, 11 plans, and enterprise connectors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex w-full max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/compare"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-violet-300 px-6 py-3.5 text-sm font-semibold text-[#160c22] transition-colors hover:bg-white sm:w-auto"
            >
              <Sparkles className="h-4 w-4" />
              Compare 11 Enterprise Plans
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              onClick={handleOpenSearch}
              className="group inline-flex min-h-12 items-center justify-between gap-3 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              <span className="flex items-center gap-2 text-white/70 group-hover:text-white">
                <Search className="h-4 w-4 text-violet-300" />
                <span>Search {featureCount} features...</span>
              </span>
              <kbd className="hidden items-center gap-0.5 rounded border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/60 sm:inline-flex">
                <Command className="h-3 w-3" />K
              </kbd>
            </button>
          </motion.div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-mono text-white/45">Explore</span>
            {quickSearches.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setSearchQuery(item);
                  handleSearchSubmit(item);
                }}
                className="rounded-full border border-white/10 px-3 py-1.5 text-left text-xs font-mono text-white/65 transition-colors hover:border-violet-300/40 hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-white/15 pt-6">
            <div>
              <div className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {featureCount}+
              </div>
              <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-white/50">
                Capabilities indexed
              </div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold tracking-tight text-violet-300 sm:text-3xl">
                11
              </div>
              <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-white/50">
                Plans compared
              </div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                1M
              </div>
              <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-white/50">
                Token context window
              </div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                0%
              </div>
              <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-white/50">
                Customer data training
              </div>
            </div>
          </div>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="dark min-w-0 lg:pt-4"
          >
            <SynapseSessionAssembler />
          </motion.div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-7">
          <EcosystemMarquee />
        </div>
      </div>
    </section>
  );
}
