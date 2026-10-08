import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { resolveLocale, type Locale } from "@/lib/i18n/config";
import { getFeatures, getFeatureCount } from "@/lib/i18n/features";
import ComparisonPreview from "@/components/home/ComparisonPreview";
import EnterpriseSection from "@/components/home/EnterpriseSection";
import ArticlesTeaser from "@/components/home/ArticlesTeaser";
import { LatestModelShowcase } from "@/components/home/LatestModelShowcase";
import { EnterpriseTrustBento } from "@/components/home/EnterpriseTrustBento";
import { WorkspaceProofMetrics, CinematicWorkspaceCTA } from "@/components/home/WorkspaceProofAndCTA";
import { WorkflowStory } from "@/components/scroll/WorkflowStory";

const featureCount = getFeatureCount();

const homeMetadata: Record<Locale, { title: string; description: string }> = {
  en: {
    title:
      "Gemini Enterprise AI Intelligence | Discover Every Google Workspace AI Capability",
    description: `Explore ${featureCount} Google Workspace and Gemini capabilities, current Gemini models, plan comparisons, enterprise connectors, and security controls.`,
  },
  es: {
    title:
      "Gemini Enterprise AI Intelligence | Descubre todas las capacidades de IA de Google Workspace",
    description: `Explora ${featureCount} capacidades de Google Workspace y Gemini, los modelos actuales de Gemini, comparativas de planes, conectores empresariales y controles de seguridad.`,
  },
};

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return params.then(({ locale: raw }) => {
    return { ...homeMetadata[resolveLocale(raw)] };
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const features = getFeatures(locale);
  return (
    <div className="flex min-h-screen flex-col">
      <Hero labels={getDictionary(locale).hero} />
      <WorkflowStory />
      <LatestModelShowcase />
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
