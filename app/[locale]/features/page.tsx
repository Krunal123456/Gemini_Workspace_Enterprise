import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { FeatureExplorer } from "@/components/features/FeatureExplorer";
import { FeaturesExportButton } from "@/components/features/FeaturesExportButton";
import { getFeatures } from "@/lib/i18n/features";
import { createPhraseTranslator } from "@/lib/i18n/translate";
import { resolveLocale, type Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const t = createPhraseTranslator(locale);
  return {
    title: t("Google Workspace & Gemini AI Features Directory"),
    description: t("Search, filter, and inspect every generative AI feature across Gmail, Docs, Sheets, Meet, NotebookLM, Vids, and the Gemini Enterprise Chat App."),
  };
}

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const t = createPhraseTranslator(locale);
  const allFeatures = getFeatures(locale);

  return (
    <main className="min-h-screen bg-background pb-20 pt-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">{t("Home")}</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground font-medium">{t("Features")}</span>
        </div>

        {/* Hero Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {t("Comprehensive Directory • {n} AI Capabilities", { n: allFeatures.length })}
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl fluid-h1">{t("Google Workspace & Gemini AI Features")}</h1>
            <p className="text-lg text-muted-foreground md:text-xl">{t("Search, filter, and inspect every generative AI feature across Gmail, Docs, Sheets, Meet, NotebookLM, Vids, and the Gemini Enterprise Chat App.")}</p>
          </div>
          
          <FeaturesExportButton features={allFeatures} label={t("Export Features")} />
        </div>

        {/* Explorer */}
        <FeatureExplorer viewMode="link" />
      </div>
    </main>
  );
}
