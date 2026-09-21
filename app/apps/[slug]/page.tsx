import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { applications } from "@/data/apps";
import { features } from "@/data/features";
import { plans } from "@/data/plans";
import {
  Mail,
  FileText,
  Table,
  Video,
  MessageSquare,
  Presentation,
  Clapperboard,
  HardDrive,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Building2,
  ExternalLink,
  Layers,
} from "lucide-react";

interface AppDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const iconMap: Record<string, React.ElementType> = {
  Mail,
  FileText,
  Table,
  Video,
  MessageSquare,
  Presentation,
  Clapperboard,
  HardDrive,
  BookOpen,
};

export async function generateStaticParams() {
  return applications.map((app) => ({
    slug: app.slug,
  }));
}

export async function generateMetadata({ params }: AppDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = applications.find((a) => a.slug === slug);

  if (!app) {
    return {
      title: "Application Not Found | Gemini Intelligence",
    };
  }

  return {
    title: `${app.name} AI Capabilities & Gemini Features | Gemini Intelligence`,
    description: app.description,
  };
}

export default async function AppDetailPage({ params }: AppDetailPageProps) {
  const { slug } = await params;
  const app = applications.find((a) => a.slug === slug);

  if (!app) {
    notFound();
  }

  const IconComponent = iconMap[app.iconName] || Sparkles;

  // Find all features belonging to this application
  const appFeatures = features.filter(
    (f) =>
      f.application.toLowerCase() === app.id.toLowerCase() ||
      f.application.toLowerCase() === app.name.toLowerCase() ||
      (app.id === "gemini" && f.application === "gemini")
  );

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all Applications
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-border/60 bg-gradient-to-b from-muted/30 to-background">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
                  style={{ backgroundColor: `${app.accentColor}15`, color: app.accentColor }}
                >
                  <IconComponent className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Google Workspace App
                  </span>
                  <h1 className="fluid-h2 font-extrabold tracking-tight text-foreground">
                    Gemini in {app.name}
                  </h1>
                </div>
              </div>

              <p className="fluid-body text-muted-foreground mb-6 leading-relaxed">
                {app.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-xs font-semibold border border-border">
                  <Sparkles className="w-3.5 h-3.5 text-google-blue" />
                  {appFeatures.length} AI Features Indexed
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-xs font-semibold border border-border">
                  <ShieldCheck className="w-3.5 h-3.5 text-google-green" />
                  Enterprise Data Protection
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-xs font-semibold border border-border">
                  <Building2 className="w-3.5 h-3.5 text-gemini-purple" />
                  {app.category}
                </span>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="flex flex-col gap-3 min-w-[240px] bg-card border border-border p-6 rounded-2xl shadow-sm">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Plan Availability
              </span>
              <p className="text-xs text-muted-foreground leading-normal">
                Compare edition limits and see which Google Workspace or Gemini Enterprise plans include {app.name} AI.
              </p>
              <Link
                href="/compare"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-google-blue to-gemini-indigo text-white text-sm font-medium rounded-xl hover:shadow transition-all"
              >
                Compare In Matrix
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Enterprise Value Grid */}
      <section className="py-16 border-b border-border/60 bg-muted/10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Overview Card */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-google-blue" />
                How AI Works in {app.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {app.overview}
              </p>
            </div>

            {/* Enterprise Value Card */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gemini-purple" />
                Enterprise Strategic Value
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {app.enterpriseValue}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Catalog for this App */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-google-blue block mb-2">
                Feature Catalog
              </span>
              <h2 className="fluid-h3 font-bold text-foreground">
                All {app.name} AI Capabilities ({appFeatures.length})
              </h2>
            </div>
            <Link
              href={`/compare`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-google-blue hover:underline"
            >
              See full 11-plan availability matrix
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appFeatures.map((feat) => (
              <Link
                key={feat.slug}
                href={`/features/${feat.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-google-blue/50"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                      {feat.category}
                    </span>
                    {feat.isPopular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                        Popular
                      </span>
                    )}
                    {feat.isNew && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                        New
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-google-blue transition-colors">
                    {feat.name}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                    {feat.description}
                  </p>

                  {/* Capabilities */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {feat.capabilities?.slice(0, 3).map((cap, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-google-blue">
                  <span>Inspect feature</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
