"use client";

import Link from "next/link";
import { ArrowUp, ArrowRight, Sparkles } from "lucide-react";
import { WorkspaceGeminiWordmark } from "@/components/logos/WorkspaceGeminiWordmark";
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
  { name: "migrationGuide", href: "/migration" },
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
  { name: "affiliateDisclosure", href: "/affiliate-disclosure" },
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
      <div className="border-b border-border/60 bg-muted/20 py-3">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <span className="font-medium text-foreground">
            Independent Google Workspace and Gemini product research
          </span>
          <span>
            Product terms change; confirm details in the linked Google sources.
          </span>
        </div>
      </div>

      {/* Main 5-Column Navigation Grid */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          {/* Brand Hub Column - Spans 2 on desktop */}
          <div className="sm:col-span-2 space-y-5">
            <div>
              <WorkspaceGeminiWordmark className="h-5 w-auto object-contain" withProductLine />
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
                      {item.name in labels
                        ? labels[item.name as keyof FooterLabels]
                        : item.name === "migrationGuide"
                        ? locale === "es" ? "Migrar de Claude a Gemini" : "Claude to Gemini migration"
                        : item.name === "affiliateDisclosure"
                        ? locale === "es" ? "Divulgación de afiliados" : "Affiliate disclosure"
                        : item.name}
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
                      {item.name in labels
                        ? labels[item.name as keyof FooterLabels]
                        : item.name === "affiliateDisclosure"
                        ? locale === "es" ? "Divulgación de afiliados" : "Affiliate disclosure"
                        : item.name}
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
            © {new Date().getFullYear()} Workspace Gemini Intelligence. Independent product research.
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
