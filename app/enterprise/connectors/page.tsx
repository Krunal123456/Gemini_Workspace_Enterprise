import React, { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { connectors } from "@/data/connectors";
import { googleCloudConnectors } from "@/data/googleCloudConnectors";
import { GoogleCloudConnectorCatalog } from "@/components/enterprise/GoogleCloudConnectorCatalog";
import { GoogleCloudLogo } from "@/components/logos/GoogleCloudLogo";
import { Database, ArrowLeft, ChevronRight } from "lucide-react";
import { ConnectorSearchList } from "@/components/enterprise/ConnectorSearchList";

export const metadata: Metadata = {
  title: "Enterprise Connectors | Gemini & Google Cloud Integration Connectors",
  description: "Explore curated Gemini Enterprise grounding connectors and the full Google Cloud Integration Connectors catalogue.",
};

export default function ConnectorsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Breadcrumb Header */}
      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/enterprise"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Enterprise Architecture
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 border-b border-border/60 bg-muted/10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-blue/10 text-google-blue text-xs font-semibold uppercase tracking-wider mb-4 border border-google-blue/20">
              <Database className="w-3.5 h-3.5" /> Enterprise Connectors Hub
            </div>
            <h1 className="fluid-h1 font-extrabold tracking-tight text-foreground mb-6">
              Connect Gemini to your <span className="gradient-text">single source</span> of truth.
            </h1>
            <p className="fluid-body text-muted-foreground leading-relaxed">
              Gemini Enterprise enables grounded retrieval across third-party software, data warehouses, and custom tools. Every query is filtered through your organization's user permissions and authentication tokens.
            </p>
            <Link
              href="/enterprise/connector-detector"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-google-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-google-blue/90"
            >
              Check connector readiness <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Connectors Grid */}
      <Suspense fallback={<div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 text-sm text-muted-foreground">Loading connectors…</div>}>
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
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Browse the full integration catalogue.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              These connectors are available through Google Cloud Integration Connectors. Listing a connector here does not mean it is automatically enabled for Gemini Enterprise; deployment, permissions, region, and connector availability must be verified in Google Cloud.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">{googleCloudConnectors.length} catalogued connectors from the Google Cloud documentation.</p>
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
            href="/compare"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-google-blue to-gemini-indigo text-white font-medium rounded-xl hover:shadow-lg transition-all"
          >
            Compare Plans Now
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
