"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Database,
  FileCheck2,
  LockKeyhole,
  ScanEye,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const ACCENT_CLASSES: Record<string, string> = {
  violet: "text-violet-200",
  blue: "text-blue-200",
  green: "text-emerald-200",
  gold: "text-amber-200",
  coral: "text-rose-200",
};

// Per-accent radial spotlight color (cursor glow fill)
const SPOTLIGHT_COLORS: Record<string, string> = {
  violet: "rgba(167,139,250,0.18)",
  blue:   "rgba(66,133,244,0.18)",
  green:  "rgba(52,168,83,0.18)",
  gold:   "rgba(251,188,5,0.14)",
  coral:  "rgba(234,67,53,0.16)",
};

// Per-accent specular border glow color
const BORDER_GLOW_COLORS: Record<string, string> = {
  violet: "rgba(167,139,250,0.45)",
  blue:   "rgba(66,133,244,0.45)",
  green:  "rgba(52,168,83,0.45)",
  gold:   "rgba(251,188,5,0.40)",
  coral:  "rgba(234,67,53,0.40)",
};

const TRUST_PILLARS = [
  {
    id: "data",
    icon: ShieldCheck,
    title: "Customer data stays yours.",
    body: "Workspace terms restrict training on customer data for Workspace Generative AI Services without prior permission or instruction.",
    meta: "Contract terms · Workspace AI",
    source: "https://workspace.google.com/terms/service-terms/",
    sourceLabel: "Read Workspace terms",
    accent: "violet",
  },
  {
    id: "grounding",
    icon: Database,
    title: "Ground work in the right context.",
    body: "Use Workspace content, connected data sources, and eligible enterprise connectors to bring relevant context into a task.",
    meta: "Drive · Docs · approved sources",
    href: "/enterprise/connectors",
    sourceLabel: "Explore connectors",
    accent: "blue",
  },
  {
    id: "admin",
    icon: LockKeyhole,
    title: "Controls belong in the workflow.",
    body: "Explore identity, access, data protection, retention, and audit controls. Specific features depend on edition and configuration.",
    meta: "Admin controls · edition dependent",
    href: "/security",
    sourceLabel: "Review security layers",
    accent: "green",
  },
  {
    id: "review",
    icon: FileCheck2,
    title: "Keep a person in the loop.",
    body: "Review generated drafts, verify source material, and authorize actions before an agent changes external systems.",
    meta: "Draft · verify · approve",
    href: "/enterprise/agents",
    sourceLabel: "Explore agent controls",
    accent: "gold",
  },
  {
    id: "models",
    icon: ScanEye,
    title: "Choose a model for the task.",
    body: "Compare current Gemini model families by release status and use case, then check availability for your deployment.",
    meta: "Gemini model catalog",
    href: "/models",
    sourceLabel: "Compare models",
    accent: "coral",
  },
  {
    id: "orchestration",
    icon: Workflow,
    title: "Connect tools with guardrails.",
    body: "MCP and agent workflows can coordinate across systems when permissions, scope, and human supervision are configured.",
    meta: "MCP · agents · approvals",
    href: "/enterprise/agents",
    sourceLabel: "Explore orchestration",
    accent: "violet",
  },
];

export function EnterpriseTrustBento() {
  const { locale, href } = useLocale();
  const t = createPhraseTranslator(locale);
  return (
    <section className="relative overflow-hidden border-b border-border bg-background py-20 text-foreground dark:bg-[#08090f] dark:text-white md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-end">
          <div>
            <p className="mb-3 text-xs font-mono font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">{t("Designed for enterprise reality")}</p>
            <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl text-foreground">{t("Intelligence with boundaries.")}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground md:justify-self-end">
            {t("Data use, control availability, and agent permissions depend on the Workspace service, edition, configuration, and applicable agreement. Follow the primary sources for your deployment.")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {TRUST_PILLARS.map(({ id, icon: Icon, title, body, meta, href: hrefOverride, source, sourceLabel, accent }) => {
            // External sources stay absolute; internal paths pick up the locale prefix.
            const destination = source ?? (hrefOverride ? href(hrefOverride) : href("/security"));
            return (
              <SpotlightCard
                key={id}
                spotlightColor={SPOTLIGHT_COLORS[accent]}
                borderGlowColor={BORDER_GLOW_COLORS[accent]}
                enableTilt
                enableBorderBeam={false}
                className="min-h-[260px] rounded-3xl border border-border/80 bg-card p-6 sm:p-7 shadow-sm hover:border-violet-500/30 hover:shadow-md transition-all duration-300 dark:bg-white/[0.03] dark:border-white/10"
              >
                <div className="flex h-full flex-col">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-muted/60 dark:border-white/15 dark:bg-white/[0.06] ${ACCENT_CLASSES[accent]}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    {id === "orchestration" ? <Bot className="h-4 w-4 text-muted-foreground" /> : <ShieldCheck className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <h3 className="max-w-sm text-xl font-bold leading-snug text-foreground">{t(title)}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{t(body)}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-border/60 dark:border-white/10">
                    <span className="text-[10px] font-mono font-medium uppercase tracking-[0.11em] text-muted-foreground">{t(meta)}</span>
                    <Link
                      href={destination}
                      target={source ? "_blank" : undefined}
                      rel={source ? "noreferrer" : undefined}
                      className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-foreground hover:text-google-blue dark:text-white dark:hover:text-violet-300 transition-colors"
                    >
                      {t(sourceLabel)}<ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}