"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Database, Bot, Network } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";

const connectors = [
  { name: "Jira" },
  { name: "Confluence" },
  { name: "Salesforce" },
  { name: "GitHub" },
  { name: "Slack" },
  { name: "BigQuery" },
  { name: "Notion" },
  { name: "SharePoint" },
];

export default function EnterpriseSection() {
  const { locale, href } = useLocale();
  const t = createPhraseTranslator(locale);
  return (
    <section className="atlas-section py-24 bg-background text-foreground dark:bg-[#07090e] dark:text-white relative overflow-hidden border-b border-border">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gemini-cyan/10 dark:bg-gemini-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gemini-purple/10 dark:bg-gemini-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-google-blue dark:text-gemini-cyan font-bold tracking-widest text-xs uppercase mb-3 font-mono">
            {t("Enterprise Architecture")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 text-foreground">
            {t("Beyond standard chat: Connectors, Agents & MCP")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {t("Explore connected data sources, agent workflows, and governance topics. Check each feature's current edition requirements and service terms before rollout.")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Pillar 1 */}
          <div className="group relative rounded-3xl bg-card border border-border/70 p-8 shadow-sm transition-all duration-300 hover:border-google-blue/40 hover:shadow-md dark:bg-white/[0.03] dark:border-white/10">
            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-google-blue/10 dark:bg-gemini-cyan/15 mb-6 text-google-blue dark:text-gemini-cyan border border-google-blue/20 dark:border-gemini-cyan/25">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{t("Enterprise Grounding & Connectors")}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {t("Gemini Enterprise documents permission-aware search. Connector support, indexing, and permission behavior depend on your source and configuration.")}
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="group relative rounded-3xl bg-card border border-border/70 p-8 shadow-sm transition-all duration-300 hover:border-gemini-purple/40 hover:shadow-md dark:bg-white/[0.03] dark:border-white/10">
            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gemini-purple/10 dark:bg-gemini-purple/15 mb-6 text-gemini-purple border border-gemini-purple/20 dark:border-gemini-purple/25">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{t("Model Context Protocol (MCP)")}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {t("Review the supported MCP options for your Gemini product and edition before connecting private APIs, databases, or custom tools.")}
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="group relative rounded-3xl bg-card border border-border/70 p-8 shadow-sm transition-all duration-300 hover:border-amber-500/40 hover:shadow-md dark:bg-white/[0.03] dark:border-white/10">
            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 mb-6 text-amber-600 dark:text-amber-300 border border-amber-500/20 dark:border-amber-500/25">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{t("Autonomous Enterprise Agents")}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {t("Plan agent workflows around approved tools, source permissions, and human review. Available actions depend on edition and configuration.")}
              </p>
            </div>
          </div>
        </div>

        {/* Connector Grid */}
        <div className="bg-card/70 dark:bg-white/[0.03] border border-border/70 dark:border-white/10 rounded-3xl p-8 mb-12 shadow-sm backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{t("Connector examples")}</h3>
              <p className="text-muted-foreground text-sm">{t("Confirm current edition support, regional availability, and administrator setup for each source.")}</p>
            </div>
            <Link href={href("/enterprise/connectors")} className="text-sm font-semibold text-google-blue dark:text-gemini-cyan hover:underline flex items-center gap-1.5 transition-colors">
              {t("View all connectors")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {connectors.map((connector) => (
              <div key={connector.name} className="flex items-center gap-3 bg-muted/40 hover:bg-muted/70 dark:bg-white/[0.05] dark:hover:bg-white/[0.09] border border-border/60 dark:border-white/10 rounded-xl py-2 px-3.5 transition-all duration-200">
                <div className="font-semibold text-sm text-foreground">{connector.name}</div>
                <span className="rounded-full bg-background/80 dark:bg-white/10 border border-border/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {t("Example")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href={href("/enterprise")} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-google-blue to-gemini-indigo text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-google-blue/25 transition-all">
            {t("Explore the Deep Architectural Guide")}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
