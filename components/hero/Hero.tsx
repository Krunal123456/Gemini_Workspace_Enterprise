"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { CloudEcosystemScene } from "@/components/home/CloudEcosystemScene";
import { CinematicMotionBackground } from "./CinematicMotionBackground";
import { useLocalizedData } from "@/lib/i18n/use-localized-data";
import { useLocale } from "@/lib/i18n/locale-context";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Hero({ labels }: { labels?: Dictionary["hero"] }) {
  const { features, applications, plans, models, connectors } = useLocalizedData();
  const featureCount = features.length;
  const { locale, href } = useLocale();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");

  const quickSearches =
    locale === "es"
      ? ["Investigación profunda", "Conector Salesforce", "Model Armor", "NotebookLM"]
      : ["Deep Research", "Salesforce Connector", "Model Armor", "NotebookLM"];

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
    const connectorMatch = connectors.find(
      (connector) =>
        connector.name.toLowerCase().includes(normalized) ||
        connector.id.toLowerCase().includes(normalized)
    );
    if (connectorMatch) {
      router.push(href(`/enterprise/connectors?q=${encodeURIComponent(connectorMatch.id)}`));
      return;
    }

    const featureMatch = features.find(
      (feature) =>
        feature.name.toLowerCase().includes(normalized) ||
        feature.description.toLowerCase().includes(normalized)
    );
    if (featureMatch) {
      router.push(href(`/features/${featureMatch.slug}`));
      return;
    }

    router.push(href(`/features?search=${encodeURIComponent(value)}`));
  };

  return (
    <section className="hero-surface relative isolate w-full overflow-hidden border-b border-border text-foreground">
      <CinematicMotionBackground />
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 pb-12 pt-28 sm:px-6 md:pb-14 md:pt-36 lg:px-8">
        <div className="grid items-center gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-0">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-[650px] pb-5 lg:pb-12"
          >
            <h1 className="max-w-[680px] text-[2.7rem] font-bold leading-[1.02] tracking-[-0.045em] text-balance text-[#102a43] dark:text-white sm:text-6xl xl:text-[4.5rem]">
              {locale === "es" ? (
                <>Google Workspace y Gemini, <span className="hero-title-accent">con claridad.</span></>
              ) : (
                <>Google Workspace and Gemini, <span className="hero-title-accent">made clear.</span></>
              )}
            </h1>

            <p className="mt-6 max-w-[560px] text-base leading-7 text-[#425d78] dark:text-slate-300 sm:text-lg sm:leading-8">
              {locale === "es"
                ? `Una guía independiente para comparar planes, revisar ${featureCount} capacidades y entender Gemini Enterprise y Google Cloud.`
                : `An independent guide to compare plans, check ${featureCount} capabilities, and understand Gemini Enterprise and Google Cloud.`}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={href("/compare")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1769d2] px-6 text-sm font-semibold text-white shadow-[0_12px_26px_-12px_rgba(23,105,210,.55)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#1558b0] hover:shadow-[0_18px_30px_-12px_rgba(23,105,210,.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769d2] focus-visible:ring-offset-2"
              >
                {locale === "es" ? "Comparar planes" : "Compare plans"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={href("/apps")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#bbd4ed] bg-white/65 px-5 text-sm font-semibold text-[#183b5b] transition hover:border-[#8db7e3] hover:bg-white dark:border-white/20 dark:bg-slate-900/55 dark:text-white dark:hover:bg-slate-800"
              >
                {locale === "es" ? "Explorar aplicaciones" : "Explore Workspace apps"}
              </Link>
            </div>

            <div className="mt-7 flex max-w-xl flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleOpenSearch}
                className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#c8daeb] bg-white/55 px-3.5 text-xs font-semibold text-[#35536f] transition hover:border-[#82b3e4] hover:bg-white dark:border-white/15 dark:bg-white/[0.06] dark:text-slate-200"
              >
                <Search className="h-3.5 w-3.5 text-[#1769d2]" />
                {locale === "es" ? "Buscar en la guía" : "Search the guide"}
                <kbd className="rounded border border-[#c8daeb] bg-white/70 px-1.5 py-0.5 text-[10px] font-medium text-[#5b7187] dark:border-white/15 dark:bg-white/10 dark:text-slate-300">⌘K</kbd>
              </button>
              <span className="px-1 text-xs text-[#5b7187] dark:text-slate-400">{locale === "es" ? "Prueba:" : "Try:"}</span>
              {quickSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setSearchQuery(item);
                    handleSearchSubmit(item);
                  }}
                  className="min-h-8 rounded-full border border-[#c8daeb]/80 bg-white/35 px-3 text-xs font-medium text-[#42617e] transition hover:border-[#82b3e4] hover:bg-white/75 hover:text-[#174b7a] dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:bg-white/10"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[680px] lg:ml-auto"
          >
            <CloudEcosystemScene />
          </motion.div>
        </div>

        <div className="hero-index mt-5 grid grid-cols-2 divide-x divide-[#b9cfe4]/70 border-t border-[#b9cfe4]/70 pt-5 dark:divide-white/10 dark:border-white/10 sm:grid-cols-4">
          <IndexStat value={featureCount} label={labels?.statCapabilities ?? (locale === "es" ? "capacidades catalogadas" : "capabilities indexed")} />
          <IndexStat value={plans.length} label={labels?.statPlans ?? (locale === "es" ? "planes comparables" : "plans to compare")} />
          <IndexStat value={applications.length} label={locale === "es" ? "aplicaciones Workspace" : "Workspace apps"} />
          <IndexStat value={models.length} label={locale === "es" ? "modelos Gemini API" : "Gemini API models"} />
        </div>
      </div>
    </section>
  );
}

function IndexStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline gap-2 px-4 first:pl-0 sm:px-6">
      <span className="text-2xl font-semibold tracking-tight text-[#163d60] dark:text-white sm:text-[1.75rem]">{value}</span>
      <span className="max-w-32 text-[11px] leading-4 text-[#5b7187] dark:text-slate-400 sm:text-xs">{label}</span>
    </div>
  );
}
