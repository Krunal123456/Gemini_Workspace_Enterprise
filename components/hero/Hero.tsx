"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Layers } from "lucide-react";
import { EcosystemMarquee } from "./EcosystemMarquee";
import { CinematicMotionBackground } from "./CinematicMotionBackground";
import { useLocalizedData } from "@/lib/i18n/use-localized-data";
import { useLocale } from "@/lib/i18n/locale-context";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Hero({ labels }: { labels?: Dictionary["hero"] }) {
  const { features, applications, connectors, plans, models } = useLocalizedData();
  const featureCount = features.length;
  const { locale, href } = useLocale();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");

  const quickSearches =
    locale === "es"
      ? [
          "Investigación profunda",
          "Conector Salesforce",
          "Indexación de 25 GiB",
          "Model Armor",
          "NotebookLM",
          "Google Vids",
        ]
      : [
          "Deep Research",
          "Salesforce Connector",
          "25 GiB Pooled Quota",
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

    const connectorMatch = connectors.find(
      (connector) =>
        connector.name.toLowerCase().includes(normalized) ||
        connector.id.toLowerCase().includes(normalized)
    );
    if (connectorMatch) {
      router.push(`/enterprise/connectors?q=${encodeURIComponent(connectorMatch.id)}`);
      return;
    }

    const featureMatch = features.find(
      (feature) =>
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
    <section className="relative w-full overflow-hidden bg-background text-foreground dark:bg-[#070810] dark:text-white pt-28 pb-16 md:pt-32 md:pb-24 border-b border-border">
      {/* 60fps GPU-Composited Cinematic Motion Background supporting Light & Dark themes */}
      <CinematicMotionBackground />

      <div className="container relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          {/* Left Hero Narrative Column */}
          <div className="max-w-3xl lg:pt-4 space-y-6">
            {/* Live Intelligence Pill */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex flex-wrap items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-xl text-violet-800 dark:text-violet-200"
            >
              <span className="flex h-2 w-2 rounded-full bg-google-green animate-pulse" />
              <span className="inline-flex shrink-0 items-center rounded-full bg-slate-900/10 dark:bg-white px-1.5 py-0.5">
                <Image
                  src="/brand/google-workspace-wordmark.png"
                  alt="Google Workspace"
                  width={960}
                  height={124}
                  priority
                  className="block h-auto w-20 sm:w-24"
                />
              </span>
              <span className="opacity-40">+</span>
              <span className="font-bold">Gemini Enterprise</span>
              <span className="hidden font-mono text-[10px] uppercase tracking-wider opacity-60 sm:inline">
                · Reference Architecture
              </span>
            </motion.div>

            {/* Kinetic Hero Headline */}
            <motion.h1
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { delayChildren: 0.05, staggerChildren: 0.06 } },
              }}
              className="text-4xl font-extrabold leading-[1.04] tracking-[-0.035em] text-balance sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] text-foreground"
            >
              <motion.span
                variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                className="inline-block"
              >
                Google
              </motion.span>{" "}
              <motion.span
                variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                className="inline-block"
              >
                Workspace AI,
              </motion.span>
              <br />
              <span className="text-foreground">
                <motion.span
                  variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                  className="inline-block"
                >
                  Engineered for
                </motion.span>{" "}
                <motion.span
                  variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                  className="inline-block"
                >
                  Enterprise Scale.
                </motion.span>
              </span>
            </motion.h1>

            {/* Value Proposition Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl"
            >
              {locale === "es"
                ? `Compara ${featureCount}+ capacidades de IA, planes de Google Workspace y funciones de Gemini Enterprise. Revisa precios, almacenamiento, aplicaciones y controles para elegir la opción adecuada.`
                : `Explore ${featureCount}+ AI capabilities, Google Workspace plans, and Gemini Enterprise features. Compare pricing, storage, apps, and controls to find the right fit.`}
            </motion.p>

            {/* Action Station */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                href={href("/compare")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-google-blue to-gemini-purple px-6 py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <Sparkles className="h-4 w-4" />
                <span>{locale === "es" ? "Comparar Planes y Cuotas" : "Compare Plans & Quotas"}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={href("/mindmap")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border/80 bg-card/60 px-5 py-3.5 text-sm font-semibold text-foreground backdrop-blur-xl hover:bg-muted/70 transition-all dark:border-white/15 dark:bg-white/[0.05] dark:text-white"
              >
                <Layers className="h-4 w-4 text-google-blue" />
                <span>{locale === "es" ? "Mapa Mental de Arquitectura" : "Interactive Mind Map"}</span>
              </Link>
            </motion.div>

            {/* Quick Queries Filter Chips */}
            <div className="pt-2">
              <span className="mr-2 text-xs font-mono text-muted-foreground block sm:inline mb-2 sm:mb-0">
                {locale === "es" ? "Búsquedas frecuentes:" : "Quick lookups:"}
              </span>
              <div className="inline-flex flex-wrap items-center gap-1.5">
                {quickSearches.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSearchQuery(item);
                      handleSearchSubmit(item);
                    }}
                    className="rounded-full border border-border/70 bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground transition-all hover:border-google-blue/40 hover:text-foreground dark:border-white/10 dark:bg-white/[0.02] dark:text-white/60 dark:hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Real-Time Glass Metric Ribbon */}
        <div className="mt-16 rounded-3xl border border-border/80 bg-card/70 p-6 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.03]">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            <div className="space-y-1">
              <div className="font-mono text-3xl font-extrabold text-foreground">{featureCount}+</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {labels?.statCapabilities ?? (locale === "es" ? "Capacidades de IA" : "Capabilities Indexed")}
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-3xl font-extrabold text-amber-600 dark:text-amber-300">{plans.length}</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {labels?.statPlans ?? (locale === "es" ? "Planes y Ediciones" : "Plans & Editions")}
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-3xl font-extrabold text-google-blue">
                {applications.length}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {locale === "es" ? "Aplicaciones Workspace" : "Workspace App Surfaces"}
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-3xl font-extrabold text-violet-700 dark:text-violet-300">
                {models.length}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {locale === "es" ? "Modelos Gemini API" : "Gemini Models (4 Argon)"}
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-3xl font-extrabold text-google-green">100%</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {locale === "es" ? "Privacidad Contractual" : "Customer Data Isolation"}
              </div>
            </div>
          </div>
        </div>

        {/* Ecosystem Marquee */}
        <div className="mt-12 border-t border-border/70 dark:border-white/10 pt-8">
          <EcosystemMarquee />
        </div>
      </div>
    </section>
  );
}
