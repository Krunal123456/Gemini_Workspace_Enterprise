"use client";

import { useLocalizedData } from "@/lib/i18n/use-localized-data";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { EcosystemMarquee } from "./EcosystemMarquee";
import { SynapseCanvas } from "@/components/canvas/SynapseCanvas";
import { WorkspaceAtlas } from "./WorkspaceAtlas";
import { useLocale } from "@/lib/i18n/locale-context";
import type { Dictionary } from "@/lib/i18n/dictionaries";


export function Hero({ labels }: { labels: Dictionary["hero"] }) {
  const { features, connectors, plans, securityLayers } = useLocalizedData();
  const featureCount = features.length;
  const { locale, href } = useLocale();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");

  const quickSearches =
    locale === "es"
      ? [
          "Investigación profunda",
          "Model Context Protocol",
          "Fundamentación en Salesforce",
          "Model Armor",
          "NotebookLM",
          "Google Vids",
        ]
      : [
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
    <section
      className="synapse-stage relative w-full overflow-hidden bg-[#090610] pt-28 pb-16 text-white synapse-ambient synapse-grid md:pt-32 md:pb-20"
      style={{ backgroundColor: "#090610" }}
    >
      <SynapseCanvas />
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Gemini violet — primary hero glow */}
        <div className="absolute -top-64 left-[42%] h-[38rem] w-[48rem] -translate-x-1/2 rounded-full bg-violet-700/25 blur-[150px]" />
        {/* Google Cloud Deep Blue — left ambient */}
        <div className="absolute -left-[10rem] top-[10rem] h-[26rem] w-[26rem] rounded-full blur-[160px]" style={{ background: "rgba(26,115,232,0.12)" }} />
        {/* Google Cloud Teal — bottom-right accent */}
        <div className="absolute bottom-[-4rem] right-[8%] h-[22rem] w-[22rem] rounded-full blur-[140px]" style={{ background: "rgba(0,188,212,0.09)" }} />
        {/* Fuchsia — far right depth */}
        <div className="absolute right-[-12rem] top-[28rem] h-[28rem] w-[28rem] rounded-full bg-fuchsia-700/10 blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-x-10 gap-y-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="max-w-2xl lg:pt-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="synapse-badge mb-7"
          >
            <span className="h-2 w-2 rounded-full bg-violet-300" />
            <span className="inline-flex shrink-0 items-center rounded-full bg-white px-1.5 py-0.5">
              <Image
                src="/brand/google-workspace-wordmark.png"
                alt="Google Workspace"
                width={960}
                height={124}
                priority
                className="block h-auto w-24 sm:w-28"
              />
            </span>
            <span className="text-white/55" aria-hidden="true">+</span>
            <span className="text-[0.625rem] font-bold text-white sm:text-xs">Gemini Enterprise</span>
            <span className="hidden font-normal text-white/70 md:inline">{labels.groundedBadge}</span>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { delayChildren: 0.08, staggerChildren: 0.075 } } }}
            className="text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-balance sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
          >
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">Google</motion.span>{" "}
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">Workspace,</motion.span>
            <span className="block gemini-spectrum">
              <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">{labels.line3}</motion.span>{" "}
              <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">{labels.line4}</motion.span>{" "}
              <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">{labels.line5}</motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {labels.body.replace("{count}", String(featureCount))}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex w-full max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href={href("/compare")}
              data-magnetic
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-violet-300 px-6 py-3.5 text-sm font-semibold text-[#160c22] transition-colors hover:bg-white sm:w-auto"
            >
              <Sparkles className="h-4 w-4" />
              {labels.cta.replace("{count}", String(plans.length))}
              <ArrowRight className="h-4 w-4" />
            </Link>

          </motion.div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-mono text-white/45">{labels.explore}</span>
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

          </div>

          <WorkspaceAtlas />

          <div className="grid grid-cols-2 gap-x-5 gap-y-6 border-t border-white/15 pt-6 lg:col-span-2">
            <div>
              <div className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {featureCount}+
              </div>
              <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-white/50">
                {labels.statCapabilities}
              </div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold tracking-tight text-violet-300 sm:text-3xl">
                {plans.length}
              </div>
              <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-white/50">
                {labels.statPlans}
              </div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                1M
              </div>
              <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-white/50">
                {labels.statContext}
              </div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {securityLayers.length}
              </div>
              <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-white/50">
                {labels.statSecurity}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-7">
          <EcosystemMarquee />
        </div>
      </div>
    </section>
  );
}
