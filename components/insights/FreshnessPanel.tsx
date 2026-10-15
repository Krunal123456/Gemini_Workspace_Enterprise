"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";

const sources = [
  {
    title: "Google Workspace pricing",
    description: "Current plan rates and regional offers",
    href: "https://workspace.google.com/pricing",
  },
  {
    title: "Gemini Enterprise editions",
    description: "Edition limits, connector access, and pooled storage",
    href: "https://docs.cloud.google.com/gemini/enterprise/docs/editions",
  },
  {
    title: "AI Expanded Access",
    description: "Eligible Workspace plans and feature limits",
    href: "https://knowledge.workspace.google.com/admin/generative-ai/workspace-with-gemini/ai-expanded-access",
  },
];

export function FreshnessPanel() {
  const { locale } = useLocale();
  const t = createPhraseTranslator(locale);
  return (
    <section className="atlas-card rounded-2xl border p-6 sm:p-8">
      <div>
        <p className="atlas-kicker mb-2">{t("Source notes")}</p>
        <h2 className="text-2xl font-bold text-foreground">{t("Confirm changing details with Google")}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {t("Plans, regional prices, quotas, and feature availability can change. Use these Google pages to confirm details for your location and subscription before making a purchase decision.")}
        </p>
      </div>

      <ul className="mt-6 divide-y divide-border border-y border-border">
        {sources.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 py-4"
            >
              <span>
                <span className="block font-semibold text-foreground group-hover:text-google-blue">{t(source.title)}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{t(source.description)}</span>
              </span>
              <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-google-blue">
                Open <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-google-blue" />
        This catalog is a research aid. Confirm edition-specific entitlements and contract terms with Google or your reseller.
      </p>
    </section>
  );
}
