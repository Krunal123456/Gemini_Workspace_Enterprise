import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Users, 
  Globe2, 
  ArrowRight,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { MarketStarLogo } from "@/components/logos/MarketStarLogo";
import { GoogleCloudLogo } from "@/components/logos/GoogleCloudLogo";
import { GoogleWorkspaceLogo } from "@/components/logos/GoogleWorkspaceLogo";

export const metadata: Metadata = {
  title: "About | MarketStar Gemini Enterprise AI Intelligence",
  description: "Learn about the Gemini Enterprise Intelligence platform created by MarketStar, Google Cloud ecosystem partner guiding global enterprises in AI deployment.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 bg-muted/20 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-blue/10 text-google-blue text-xs font-semibold uppercase tracking-wider mb-4 border border-google-blue/20">
              <Building2 className="w-3.5 h-3.5" /> MarketStar Enterprise Advisory
            </div>
            <h1 className="fluid-h1 font-extrabold tracking-tight text-foreground mb-6">
              Empowering organizations to master <span className="gradient-text">Gemini Enterprise</span>.
            </h1>
            <p className="fluid-body text-muted-foreground leading-relaxed">
              MarketStar is a premier global enterprise go-to-market partner. We designed this intelligence platform to give technology leaders, architects, and procurement officers total transparency into Google Workspace AI capabilities, plans, connectors, and security controls.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Alignment & Attribution */}
      <section className="py-16 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-3 p-6 rounded-2xl bg-card border border-border">
              <MarketStarLogo className="h-7 w-auto text-foreground" />
              <span className="text-xs text-muted-foreground">
                Premier Enterprise GTM & AI Acceleration Partner
              </span>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3 p-6 rounded-2xl bg-card border border-border">
              <GoogleWorkspaceLogo className="h-7 w-auto" />
              <span className="text-xs text-muted-foreground">
                Google Workspace Commercial Ecosystem
              </span>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3 p-6 rounded-2xl bg-card border border-border">
              <GoogleCloudLogo className="h-7 w-auto" />
              <span className="text-xs text-muted-foreground">
                Google Cloud Infrastructure & Model Foundation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Purpose */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-google-blue block mb-2">
                Why We Built This Platform
              </span>
              <h2 className="fluid-h2 font-bold text-foreground mb-6">
                Clarity in an era of rapid AI expansion
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                <p>
                  As Google continuously delivers breakout innovations — from 2M token context windows and NotebookLM Audio Overviews to Model Armor and Veo 3.1 video synthesis — enterprise procurement teams frequently struggle to understand which features belong to which plan.
                </p>
                <p>
                  This platform bridges the information gap. We meticulously catalog all 89 AI features across all 11 Google Workspace and Gemini Enterprise editions, providing side-by-side matrices, ROI calculators, and architectural blueprints with zero ambiguity.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/compare"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-google-blue text-white font-semibold rounded-xl hover:bg-google-blue/90 transition-all text-sm"
                >
                  Explore Plan Matrix <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border bg-card hover:bg-muted text-foreground font-semibold rounded-xl transition-all text-sm"
                >
                  Directory of 89 Features
                </Link>
              </div>
            </div>

            {/* Strategic Pillars */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-2 font-bold text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-google-green" />
                  Independent Technical Transparency
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every feature limit, quota, and storage ceiling is indexed directly from commercial documentation and technical releases.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-2 font-bold text-foreground">
                  <ShieldCheck className="w-5 h-5 text-google-blue" />
                  Enterprise Privacy & Governance First
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We emphasize tenant boundary isolation, compliance standards (HIPAA, SOC 2/3), and the contractual guarantee that customer data is never trained upon.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-2 font-bold text-foreground">
                  <Globe2 className="w-5 h-5 text-gemini-purple" />
                  Ecosystem Go-To-Market Expertise
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  MarketStar provides full-lifecycle deployment advisory, from initial pilot sizing and ROI justification to global domain rollout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
