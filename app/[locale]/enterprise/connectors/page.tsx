import {
  getConnectors,
} from "@/lib/i18n/data";
import { defaultLocale, isLocale, resolveLocale, type Locale } from "@/lib/i18n/config";
import React, { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";

import { googleCloudConnectors } from "@/data/googleCloudConnectors";
import { GoogleCloudConnectorCatalog } from "@/components/enterprise/GoogleCloudConnectorCatalog";
import { GoogleCloudLogo } from "@/components/logos/GoogleCloudLogo";
import { Database, ArrowLeft, ChevronRight } from "lucide-react";
import { ConnectorSearchList } from "@/components/enterprise/ConnectorSearchList";

import { createPhraseTranslator } from "@/lib/i18n/translate";
import { localizeHref } from "@/lib/i18n/href";
import { withLocalizedAlternates } from "@/lib/seo";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  return withLocalizedAlternates({
    title: "Enterprise Connectors | Gemini & Google Cloud Integration Connectors",
    description: "Explore curated Gemini Enterprise grounding connectors and the full Google Cloud Integration Connectors catalogue.",
  }, "/enterprise/connectors", locale);
}

export default async function ConnectorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const t = createPhraseTranslator(locale);
  const href = (path: string) => localizeHref(locale, path);
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Breadcrumb Header */}
      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href={href("/enterprise")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />{t("Back to Enterprise Architecture")}</Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 border-b border-border/60 bg-muted/10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-blue/10 text-google-blue text-xs font-semibold uppercase tracking-wider mb-4 border border-google-blue/20">
              <Database className="w-3.5 h-3.5" /> Enterprise Connectors Hub
            </div>
            <h1 className="fluid-h1 font-extrabold tracking-tight text-foreground mb-6">{t("Connect Gemini to your")}<span className="gradient-text">single source</span> of truth.
            </h1>
            <p className="fluid-body text-muted-foreground leading-relaxed">
              {t("Connect approved data sources and tools to Gemini Enterprise. Authentication, synchronization, permission behavior, regions, and available actions vary by connector, app, and subscription—check the provider setup before promising a workflow.")}
            </p>
            <Link
              href={href("/enterprise/connector-detector")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-google-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-google-blue/90"
            >{t("Check connector readiness")}<ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/40 py-16" aria-labelledby="connector-paths">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 id="connector-paths" className="text-3xl font-bold tracking-tight text-foreground">Two connector paths serve different jobs</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">A data-store connector grounds app search and answers. A Workflow Builder connector gives a specific agent step tools to search or change records. They are related, but they are not the same setup.</p>
          </div>
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground">Add a connector to an agent action</h3>
              <ol className="mt-4 list-inside list-decimal space-y-2 text-sm leading-6 text-muted-foreground">
                <li>Open the Gemini Enterprise web app and edit the workflow.</li>
                <li>Select the Gemini Agent step, then find the connector under Connected apps.</li>
                <li>Switch it on and complete the requested authorization if prompted.</li>
                <li>Expand it and enable only the needed Search For Data actions; set query filters and test them.</li>
                <li>Leave Add Or Update Data off until read-only tests pass. It is a connector-level permission; enable its supporting lookup/search actions and add human review for changes.</li>
              </ol>
              <a className="mt-5 inline-flex text-sm font-semibold text-google-blue hover:underline" href="https://docs.cloud.google.com/gemini/enterprise/docs/workflow-builder/workflows#configure_agent_node_connectors_and_actions" target="_blank" rel="noreferrer">Google: Configure connectors and actions ↗</a>
              <a className="mt-3 inline-flex text-sm font-semibold text-google-blue hover:underline" href="https://www.youtube.com/watch?v=f2MrZ5DHbKg" target="_blank" rel="noreferrer">Google video: Getting started with connectors ↗</a>
            </article>
            <article className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground">Connect a data store to the app</h3>
              <ol className="mt-4 list-inside list-decimal space-y-2 text-sm leading-6 text-muted-foreground">
                <li>In Google Cloud Console, select the Gemini Enterprise project and app.</li>
                <li>Choose the Google or third-party source and follow its app-specific authorization/setup.</li>
                <li>For third-party sources, choose the entities and synchronization frequency that fit the use case.</li>
                <li>Attach the data store to the app, verify user access and source coverage, then evaluate search answers before launch.</li>
              </ol>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">A catalogue entry does not mean that the connector is provisioned, enabled for every edition, or available in every region. Check the provider-specific Google documentation and the feature/preview status.</p>
              <a className="mt-5 inline-flex text-sm font-semibold text-google-blue hover:underline" href="https://docs.cloud.google.com/gemini/enterprise/docs/apps-data-stores" target="_blank" rel="noreferrer">Google: Apps and data stores ↗</a>
            </article>
          </div>
        </div>
      </section>

      {/* Connectors Grid */}
      <Suspense fallback={<div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 text-sm text-muted-foreground">{t("Loading connectors\u2026")}</div>}>
        <ConnectorSearchList />
      </Suspense>

      {/* Google Cloud Integration Connectors Catalogue */}
      <section className="border-t border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-google-blue/20 bg-google-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-google-blue">
              <GoogleCloudLogo className="h-5 w-auto" />
              Google Cloud Integration Connectors
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{t("Browse the full integration catalogue.")}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("These connectors are available through Google Cloud Integration Connectors. Listing a connector here does not mean it is automatically enabled for Gemini Enterprise; deployment, permissions, region, and connector availability must be verified in Google Cloud.")}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">{t("{n} catalogued connectors from the Google Cloud documentation.", { n: googleCloudConnectors.length })}</p>
          </div>
          <GoogleCloudConnectorCatalog />
        </div>
      </section>

      {/* Plan Availability CTA */}
      <section className="py-16 bg-muted/20 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Verify which plans unlock enterprise connectors
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-sm">
            Check the side-by-side plan comparison tool to see how Gemini Enterprise Standard and Gemini Enterprise Plus compare.
          </p>
          <Link
            href={href("/compare")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-google-blue to-gemini-indigo text-white font-medium rounded-xl hover:shadow-lg transition-all"
          >{t("Compare Plans Now")}<ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
