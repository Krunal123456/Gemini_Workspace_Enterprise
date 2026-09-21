import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { articles } from "@/data/articles";
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  CheckCircle2,
  ChevronRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Strategic Insights & Architectural Guides | Gemini Enterprise Intelligence",
  description: "In-depth partner analysis, procurement strategies, architectural deep dives, and pricing breakdowns for Google Workspace and Gemini Enterprise.",
};

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-blue/10 text-google-blue text-xs font-semibold uppercase tracking-wider mb-4 border border-google-blue/20">
              <BookOpen className="w-3.5 h-3.5" /> MarketStar Enterprise Advisory
            </div>
            <h1 className="fluid-h1 font-extrabold tracking-tight text-foreground mb-6">
              Strategic insights on <span className="gradient-text">enterprise AI</span> architecture.
            </h1>
            <p className="fluid-body text-muted-foreground leading-relaxed">
              Objective technical analyses, pricing breakdowns, and deployment frameworks written by enterprise solutions architects to help technology leaders make informed AI decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.slug}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-google-blue/50"
              >
                <div>
                  {/* Category & Meta */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-6">
                    <span className="font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-muted text-foreground border border-border">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-foreground mb-3 leading-snug group-hover:text-google-blue transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Key Takeaways list */}
                  <div className="border-t border-border/60 pt-4 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                      Key Takeaways
                    </span>
                    <ul className="space-y-2">
                      {article.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-normal">
                          <CheckCircle2 className="w-3.5 h-3.5 text-google-green shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Author & CTA */}
                <div className="border-t border-border/60 pt-4 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground block">{article.author.name}</span>
                    <span className="text-[11px]">{article.author.role}</span>
                  </div>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-google-blue group-hover:translate-x-0.5 transition-transform"
                  >
                    Read article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
