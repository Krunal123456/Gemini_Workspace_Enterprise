import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { applications } from "@/data/apps";
import { features } from "@/data/features";
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
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Google Workspace Applications | Gemini AI Across Every Surface",
  description: "Explore Gemini AI capabilities embedded natively into Gmail, Google Docs, Sheets, Meet, Chat, Slides, Vids, Drive, and NotebookLM.",
};

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

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-blue/10 text-google-blue text-xs font-semibold uppercase tracking-wider mb-4 border border-google-blue/20">
              <Layers className="w-3.5 h-3.5" /> Workspace Ecosystem
            </div>
            <h1 className="fluid-h1 font-extrabold tracking-tight text-foreground mb-6">
              AI native to every <span className="gradient-text">application</span> you use daily.
            </h1>
            <p className="fluid-body text-muted-foreground leading-relaxed">
              Google Workspace integrates Gemini AI directly into your collaboration workflows.
              From contextual email synthesis in Gmail to multimodal research in NotebookLM, explore how intelligence is embedded across all 9 core surfaces.
            </p>
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app) => {
              const IconComponent = iconMap[app.iconName] || Sparkles;
              const appFeatures = features.filter(
                (f) => f.application.toLowerCase() === app.id.toLowerCase() || f.application.toLowerCase() === app.name.toLowerCase()
              );

              return (
                <div
                  key={app.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-border"
                >
                  {/* Subtle top accent bar */}
                  <div
                    className="absolute top-0 inset-x-8 h-1 rounded-b-full transition-all duration-300 opacity-80 group-hover:opacity-100"
                    style={{ backgroundColor: app.accentColor }}
                  />

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 pt-2">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                        style={{ backgroundColor: `${app.accentColor}15`, color: app.accentColor }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                        {appFeatures.length} AI Features
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-google-blue transition-colors">
                      {app.name}
                    </h2>
                    <p className="text-sm font-medium text-muted-foreground/90 mb-4 leading-normal">
                      {app.tagline}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                      {app.description}
                    </p>

                    {/* Key AI Capabilities list */}
                    <div className="mb-6 space-y-2 border-t border-border/60 pt-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-foreground/80 block mb-2">
                        Core Capabilities
                      </span>
                      {app.keyAIFeatures.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Sparkles className="w-3.5 h-3.5 text-google-blue shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer link */}
                  <div className="pt-4 border-t border-border/60">
                    <Link
                      href={`/apps/${app.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-google-blue hover:text-google-blue/80 transition-colors"
                    >
                      Explore {app.name} AI
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enterprise Integration Callout */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Looking for comprehensive plan availability?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-sm sm:text-base">
            See exactly which Google Workspace edition or Gemini Enterprise plan unlocks AI capabilities inside your favorite apps.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-google-blue to-gemini-indigo text-white font-medium rounded-xl hover:shadow-lg transition-all"
            >
              Open Plan Availability Matrix
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border bg-card hover:bg-muted font-medium rounded-xl transition-all"
            >
              Browse All 89 Features
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
