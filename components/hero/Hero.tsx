"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { SynapseSessionAssembler } from "./SynapseSessionAssembler";
import { EcosystemMarquee } from "./EcosystemMarquee";
import { features } from "@/data/features";
import { connectors } from "@/data/connectors";
import { plans } from "@/data/plans";
import { securityLayers } from "@/data/security";
import { SynapseCanvas } from "@/components/canvas/SynapseCanvas";

const featureCount = features.length;

export function Hero() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");

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
    <section className="synapse-stage relative w-full overflow-hidden bg-[#090610] pt-28 pb-16 text-white synapse-ambient synapse-grid md:pt-32 md:pb-20">
      <SynapseCanvas />
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
            <span className="font-bold">Google Workspace + Gemini Enterprise</span>
            <span className="opacity-40">✦</span>
            <span className="font-normal text-white/70">Grounded in your data</span>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { delayChildren: 0.08, staggerChildren: 0.075 } } }}
            className="text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] text-balance sm:text-6xl lg:text-[3.75rem] xl:text-[4.5rem]"
          >
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">Google</motion.span>{" "}
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">Workspace,</motion.span>
            <span className="block gemini-spectrum">
              <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">reimagined</motion.span>{" "}
              <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">by</motion.span>{" "}
              <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">AI.</motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Bring Gemini into the flow of your work: grounded in Workspace context, connected to your tools, and governed for your organization. Explore {featureCount} capabilities, plans, models, and enterprise controls.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex w-full max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/compare"
              data-magnetic
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-violet-300 px-6 py-3.5 text-sm font-semibold text-[#160c22] transition-colors hover:bg-white sm:w-auto"
            >
              <Sparkles className="h-4 w-4" />
              Compare 11 Enterprise Plans
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              onClick={() => document.querySelector("#playground")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" })}
              data-magnetic
              className="group inline-flex min-h-12 items-center justify-between gap-3 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              <span className="flex items-center gap-2 text-white/70 group-hover:text-white">
                <Play className="h-4 w-4 text-violet-300" />
                <span>Try the interactive preview</span>
              </span>
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
                {plans.length}
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
                {securityLayers.length}
              </div>
              <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-white/50">
                Security layers mapped
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
