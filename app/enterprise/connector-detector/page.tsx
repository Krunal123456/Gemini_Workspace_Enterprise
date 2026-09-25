import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";
import { ConnectorDetector } from "@/components/enterprise/ConnectorDetector";

export const metadata: Metadata = {
  title: "Gemini Enterprise Connector Detector | Readiness Check",
  description: "Match your company's tools to Gemini Enterprise connectors with an instant readiness check.",
};

export default function ConnectorDetectorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/enterprise" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Enterprise Architecture
          </Link>
        </div>
      </div>

      <section className="border-b border-border bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.12),transparent_70%)] py-20 text-foreground">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gemini-cyan/20 bg-gemini-cyan/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gemini-cyan">
              <Building2 className="h-3.5 w-3.5" /> Gemini Enterprise readiness
            </div>
            <h1 className="fluid-h1 mb-6 font-extrabold tracking-tight text-foreground">
              Are you ready to deploy <span className="gradient-text">Gemini Enterprise?</span>
            </h1>
            <p className="fluid-body max-w-2xl leading-relaxed text-muted-foreground">
              Match the tools your team uses to Gemini Enterprise connectors for an instant readiness check.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <ConnectorDetector />
        </div>
      </section>
    </div>
  );
}
