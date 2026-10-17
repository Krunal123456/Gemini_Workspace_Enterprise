"use client";

import Link from "next/link";
import { ArrowUp, ArrowRight, Sparkles } from "lucide-react";
import { MarketStarLogo } from "@/components/logos/MarketStarLogo";
import { localizeHref } from "@/lib/i18n/href";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type FooterLabels = Dictionary["footer"];

type FooterLink = { name: string; href: string; badge?: string };

const platformLinks: FooterLink[] = [
  { name: "allFeatures", href: "/features" },
  { name: "comparePlans", href: "/compare" },
  { name: "mindmap", href: "/mindmap" },
  { name: "models", href: "/models" },
  { name: "pricing", href: "/pricing" },
];

const enterpriseLinks: FooterLink[] = [
  { name: "Business (Workspace) Onboarding", href: "/enterprise/onboarding/business", badge: "admin.google.com" },
  { name: "Standard & Plus (Cloud) Onboarding", href: "/enterprise/onboarding/cloud", badge: "console.cloud.google.com" },
  { name: "connectors", href: "/enterprise/connectors" },
  { name: "agentsMcp", href: "/enterprise/agents" },
  { name: "securityGovernance", href: "/security" },
];

const applicationNames = [
  { name: "Gmail", href: "/apps/gmail" },
  { name: "Docs", href: "/apps/docs" },
  { name: "Sheets", href: "/apps/sheets" },
  { name: "Meet", href: "/apps/meet" },
  { name: "Drive", href: "/apps/drive" },
  { name: "NotebookLM", href: "/apps/notebooklm" },
  { name: "Slides", href: "/apps/slides" },
  { name: "Vids", href: "/apps/vids" },
];

const resourceLinks: FooterLink[] = [
  { name: "articles", href: "/articles" },
  { name: "googleAiUpdates", href: "/google-ai-updates", badge: "Oct 2026" },
  { name: "about", href: "/about" },
];

export function Footer({
  labels,
  locale,
}: {
  labels: FooterLabels;
  locale: Locale;
}) {
  const href = (path: string) => localizeHref(locale, path);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-border/80 bg-background/95 backdrop-blur-md">
      {/* Top Live Operational Telemetry Bar */}
      <div className="border-b border-border/60 bg-muted/20 py-3">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono font-semibold text-foreground">
              Workspace & Gemini Intelligence Network
            </span>
            <span className="hidden sm:inline font-mono text-emerald-600 dark:text-emerald-400">
              · 100% Operational
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="hidden md:inline text-muted-foreground">
              SOC 2 Type II · HIPAA · ISO 27001
            </span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              Zero Model Training
            </span>
          </div>
        </div>
      </div>

      {/* Main 5-Column Navigation Grid */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          {/* Brand Hub Column - Spans 2 on desktop */}
          <div className="sm:col-span-2 space-y-5">
            <div>
              <MarketStarLogo className="h-5 w-auto object-contain" withProductLine />
              <p className="mt-3 text-xs font-medium text-muted-foreground">{labels.by}</p>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              {labels.blurb ||
                "Comprehensive architecture intelligence for Google Workspace AI and Gemini Enterprise. Unbiased comparisons, quotas, and technical runbooks."}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="rounded-lg border border-border bg-card/60 px-2.5 py-1 text-[11px] font-semibold text-foreground">
                Business ($21/mo)
              </span>
              <span className="rounded-lg border border-border bg-card/60 px-2.5 py-1 text-[11px] font-semibold text-google-blue">
                Standard ($30/mo)
              </span>
              <span className="rounded-lg border border-border bg-card/60 px-2.5 py-1 text-[11px] font-semibold text-gemini-purple">
                Plus ($30+/mo)
              </span>
            </div>

            <div className="pt-2">
              <Link
                href={href("/compare")}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-google-blue to-gemini-purple px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-90 transition-all"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{labels.comparePlans}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Column 1: Platform & Architecture */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {labels.platform}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {platformLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={href(item.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name in labels
                      ? labels[item.name as keyof FooterLabels]
                      : item.name === "mindmap"
                      ? "Interactive Mind Map"
                      : item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Enterprise Runbooks */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {labels.enterprise}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {enterpriseLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={href(item.href)}
                    className="group inline-flex flex-col text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>
                      {item.name in labels ? labels[item.name as keyof FooterLabels] : item.name}
                    </span>
                    {item.badge && (
                      <span className="font-mono text-[9px] text-google-blue/80">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Workspace AI Apps */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {labels.applications}
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 text-xs">
              {applicationNames.map((app) => (
                <Link
                  key={app.name}
                  href={href(app.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors truncate"
                >
                  {app.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Governance & Updates */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Governance & Insights
            </h4>
            <ul className="space-y-2.5 text-xs">
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={href(item.href)}
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>
                      {item.name in labels ? labels[item.name as keyof FooterLabels] : item.name}
                    </span>
                    {item.badge && (
                      <span className="rounded-full bg-google-blue/10 border border-google-blue/20 px-1.5 py-0.2 text-[9px] text-google-blue font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={href("/security")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Model Armor & DLP
                </Link>
              </li>
              <li>
                <Link
                  href={href("/enterprise/readiness")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Readiness Assessment
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Back-to-Top */}
      <div className="border-t border-border/60 bg-muted/10 py-6">
        <div className="mx-auto flex max-w-[1400px] flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 text-xs text-muted-foreground">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} MarketStar Intelligence. Independent reference architecture.
            Not affiliated with Google LLC. Google Workspace &amp; Gemini are trademarks of Google LLC.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/60 px-3 py-1.5 font-semibold text-foreground hover:bg-muted transition-all"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
