import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, resolveLocale, type Locale } from "@/lib/i18n/config";
import { localizedAlternates } from "@/lib/seo";
import { getFeatureCount } from "@/lib/i18n/features";
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
      "Google Workspace Plans & Gemini AI Features | Plan Comparison",
    description: `Compare Google Workspace plans and Gemini Enterprise options. Explore ${featureCount} documented AI features, pricing context, plan differences, models, and enterprise capabilities.`,
  },
  es: {
    title:
      "Planes de Google Workspace y funciones de Gemini | Comparativa",
    description: `Compara los planes de Google Workspace y las opciones de Gemini Enterprise. Explora ${featureCount} funciones de IA documentadas, precios, diferencias entre planes, modelos y capacidades empresariales.`,
  },
};

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return params.then(({ locale: raw }) => {
    const locale = resolveLocale(raw);
    const metadata = homeMetadata[locale];

    return {
      ...metadata,
      alternates: localizedAlternates("/", locale),
      openGraph: {
        type: "website",
        title: metadata.title,
        description: metadata.description,
        url: locale === defaultLocale ? "/" : `/${locale}`,
      },
      twitter: {
        card: "summary",
        title: metadata.title,
        description: metadata.description,
      },
    };
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  return (
    <div className="flex min-h-screen flex-col">
      <div data-tour="intro" className="scroll-mt-28">
        <Hero labels={getDictionary(locale).hero} />
      </div>
      <section id="compare" data-tour="compare" className="scroll-mt-28 border-b border-border bg-background py-20 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <ComparisonPreview />
        </div>
      </section>

      <div data-tour="workflow" className="scroll-mt-28">
        <WorkflowStory />
      </div>
      <div data-tour="models" className="scroll-mt-28">
        <LatestModelShowcase />
      </div>
      <EnterpriseTrustBento />
      <WorkspaceProofMetrics />

      <section id="enterprise" data-tour="enterprise" className="scroll-mt-28 border-b border-border">
        <EnterpriseSection />
      </section>

      <section id="articles" data-tour="research" className="scroll-mt-28 border-b border-border">
        <ArticlesTeaser />
      </section>

      <CinematicWorkspaceCTA />
    </div>
  );
}
