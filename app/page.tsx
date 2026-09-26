import type { Metadata } from "next";
import { ArrowRight, Sparkles } from "lucide-react";
import { Hero } from "@/components/hero/Hero";
import ComparisonPreview from "@/components/home/ComparisonPreview";
import EnterpriseSection from "@/components/home/EnterpriseSection";
import ArticlesTeaser from "@/components/home/ArticlesTeaser";
import { LatestModelShowcase } from "@/components/home/LatestModelShowcase";
import { EnterpriseTrustBento } from "@/components/home/EnterpriseTrustBento";
import { WorkspaceProofMetrics, CinematicWorkspaceCTA } from "@/components/home/WorkspaceProofAndCTA";
import { GeminiPlayground } from "@/components/sandbox/GeminiPlayground";
import { WorkflowStory } from "@/components/scroll/WorkflowStory";
import { features } from "@/data/features";

const featureCount = features.length;

export const metadata: Metadata = {
  title: "Gemini Enterprise AI Intelligence | Discover Every Google Workspace AI Capability",
  description: `Explore ${featureCount} Google Workspace and Gemini capabilities, current Gemini models, plan comparisons, enterprise connectors, and security controls.`,
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <WorkflowStory />
      <LatestModelShowcase />
      <GeminiPlayground />
      <EnterpriseTrustBento />
      <WorkspaceProofMetrics />

      <section id="compare" className="border-b border-border bg-background py-20 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <ComparisonPreview />
        </div>
      </section>

      <section id="enterprise" className="border-b border-border">
        <EnterpriseSection />
      </section>

      <section id="articles" className="border-b border-border">
        <ArticlesTeaser />
      </section>

      <CinematicWorkspaceCTA />
    </div>
  );
}
