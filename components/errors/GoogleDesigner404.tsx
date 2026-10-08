"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowLeft,
  Home,
  Search,
  Cpu,
  Layers,
  ShieldCheck,
  CreditCard,
  FileText,
  Compass,
  CornerDownLeft,
} from "lucide-react";
import { GeminiLogo } from "@/components/logos/GeminiLogo";
import { MarketStarLogo } from "@/components/logos/MarketStarLogo";
import { AmbientAuroraGlow } from "@/components/ui/AmbientAuroraGlow";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";

const quickSuggestions = [
  { label: "Gemini 3.0 & 4.0 Models", href: "/models", icon: Cpu, color: "text-violet-600 dark:text-violet-400" },
  { label: "Workspace Apps (Gmail, Docs, Sheets)", href: "/apps", icon: Layers, color: "text-google-blue" },
  { label: "Pricing & Editions Comparison", href: "/compare", icon: CreditCard, color: "text-google-green" },
  { label: "Security & Enterprise Governance", href: "/security", icon: ShieldCheck, color: "text-google-yellow" },
  { label: "Deep Research & Architecture Notes", href: "/articles", icon: FileText, color: "text-google-red" },
];

export function GoogleDesigner404() {
  const { locale, href } = useLocale();
  const t = createPhraseTranslator(locale);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isReRouting, setIsReRouting] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.dispatchEvent(new CustomEvent("open-command-palette"));
    } else {
      router.push(href("/"));
    }
  };

  const handleTriggerCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  const handleGeminiReroute = () => {
    setIsReRouting(true);
    setTimeout(() => {
      setIsReRouting(false);
      router.push(href("/models"));
    }, 1000);
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center px-4 py-16 overflow-hidden">
      <AmbientAuroraGlow variant="hero" />

      {/* Background Decorative Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl rounded-[36px] border border-white/60 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 p-8 sm:p-12 shadow-[0_30px_100px_-30px_rgba(66,133,244,0.3)] dark:shadow-[0_30px_100px_-30px_rgba(0,0,0,0.8)] backdrop-blur-3xl"
      >
        {/* Top Google & MarketStar Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <MarketStarLogo className="h-5 w-auto shrink-0" />
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5">
              <GeminiLogo className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Google Workspace Intelligence
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-google-blue" />
            <span className="h-2.5 w-2.5 rounded-full bg-google-red" />
            <span className="h-2.5 w-2.5 rounded-full bg-google-yellow" />
            <span className="h-2.5 w-2.5 rounded-full bg-google-green" />
          </div>
        </div>

        {/* 404 Hero Display */}
        <div className="my-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300">
            <Sparkles className="h-3.5 w-3.5" />
            {t("404 · Quantum Coordinate Not Found")}
          </div>

          <h1 className="mt-4 text-5xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-google-blue via-violet-600 to-gemini-purple bg-clip-text text-transparent">
              404.
            </span>{" "}
            <span className="text-foreground">{t("That’s an error.")}</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t("The requested URL was not found on this server. That’s all we know.")}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t("Or perhaps the Gemini reasoning engine predicted a destination that hasn't materialized in our vector space yet.")}
          </p>
        </div>

        {/* Google AI Search Resolver Input */}
        <form onSubmit={handleSearchSubmit} className="relative mb-8">
          <div className="group relative flex items-center rounded-2xl border border-slate-200 bg-white/90 px-4 py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-300 focus-within:border-google-blue focus-within:ring-4 focus-within:ring-google-blue/15 dark:border-white/10 dark:bg-slate-900/90">
            <Search className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-google-blue" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Search everything or ask Gemini to resolve this destination...")}
              className="ml-3 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={handleTriggerCommandPalette}
              className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 px-2 py-1 text-[11px] font-mono text-slate-500 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400 hover:text-foreground"
            >
              <span>⌘K</span>
            </button>
            <button
              type="submit"
              className="ml-2 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-google-blue to-violet-600 text-white shadow-md transition hover:scale-105"
            >
              <CornerDownLeft className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Quick Navigation Hub Suggestions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-google-blue" />
              {t("Recommended Google AI Destinations")}
            </h2>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {quickSuggestions.map((item) => (
              <Link
                key={item.href}
                href={href(item.href)}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200/60 bg-white/50 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-white hover:shadow-md dark:border-white/5 dark:bg-white/[0.02] dark:hover:border-violet-400/30 dark:hover:bg-white/[0.06]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-violet-50 dark:group-hover:bg-violet-950/40 transition-colors">
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <span className="text-xs font-semibold text-foreground group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                  {t(item.label)}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 dark:border-white/10 pt-6">
          <Link
            href={href("/")}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <Home className="h-3.5 w-3.5" />
            {t("Return to Home")}
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t("Go Back")}
            </button>

            <button
              onClick={handleGeminiReroute}
              disabled={isReRouting}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-google-blue via-indigo-600 to-gemini-purple px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition hover:opacity-95 disabled:opacity-75"
            >
              <Sparkles className={`h-3.5 w-3.5 ${isReRouting ? "animate-spin" : ""}`} />
              {isReRouting ? t("Synthesizing Path...") : t("Gemini Neural Reroute")}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
