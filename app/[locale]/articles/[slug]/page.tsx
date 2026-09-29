import {
  getPlans,
} from "@/lib/i18n/data";
import { getFeatures } from "@/lib/i18n/features";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getArticleBySlug, getArticles } from "@/lib/i18n/data";
import { resolveLocale } from "@/lib/i18n/config";

import {
  ArrowLeft,
  Clock,
  Calendar,
  Sparkles,
  CheckCircle2,
  Building2,
  Share2,
  ArrowRight,
  BookOpen
} from "lucide-react";

import { createPhraseTranslator } from "@/lib/i18n/translate";
interface ArticlePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

function renderCitations(text: string, sourceCount: number) {
  return text.split(/\[(\d+)\]/g).map((part, index) => {
    if (index % 2 === 0) return part;

    const sourceNumber = Number(part);
    if (!sourceNumber || sourceNumber > sourceCount) return `[${part}]`;

    return (
      <a
        key={`${part}-${index}`}
        href={`#source-${sourceNumber}`}
        className="ml-0.5 align-super text-xs font-semibold text-google-blue hover:underline"
        aria-label={`Jump to source ${sourceNumber}`}
      >
        [{sourceNumber}]
      </a>
    );
  });
}

export async function generateStaticParams() {
  return getArticles("en").map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const t = createPhraseTranslator(locale);
  const article = getArticleBySlug(slug, resolveLocale(rawLocale));

  if (!article) {
    return {
      title: "Article Not Found | Gemini Intelligence",
    };
  }

  return {
    title: `${article.title} | MarketStar Enterprise Advisory`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const features = getFeatures(locale);
  const t = createPhraseTranslator(locale);
  const plans = getPlans(locale);
  const article = getArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  // Find related features if defined
  const relatedFeatureItems = (article.relatedFeatures || [])
    .map((fid) => features.find((f) => f.id === fid || f.slug === fid))
    .filter(Boolean);

  return (
    <article className="min-h-screen bg-background text-foreground pb-24">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />{t("Back to all Articles")}</Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="pt-16 pb-12 border-b border-border/60 bg-muted/10">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">
            <span className="px-3 py-1 rounded-full bg-google-blue/10 text-google-blue border border-google-blue/20">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {new Date(article.date).toLocaleDateString(resolveLocale(rawLocale) === "es" ? "es-ES" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <h1 className="fluid-h1 font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 font-normal">
            {article.subtitle}
          </p>

          {/* Author Card */}
          <div className="flex items-center gap-4 pt-6 border-t border-border/60">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gemini-indigo to-gemini-purple flex items-center justify-center text-white font-bold text-base shadow-md">
              MS
            </div>
            <div>
              <div className="font-bold text-foreground text-sm">{article.author.name}</div>
              <div className="text-xs text-muted-foreground">
                {article.author.role} • {article.author.company}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8 py-16">
        {/* Key Takeaways Box */}
        <div className="mb-14 rounded-2xl border-2 border-google-blue/30 bg-google-blue/5 p-8 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-google-blue mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Key Executive Takeaways
          </h2>
          <ul className="space-y-3">
            {article.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-google-blue shrink-0 mt-1" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prose Body */}
        <div className="space-y-6 text-foreground/90 text-base sm:text-lg leading-relaxed font-normal">
          {article.content.map((paragraph, idx) => {
            if (paragraph.startsWith("### ")) {
              return (
                <h3
                  key={idx}
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground pt-8 pb-2 border-b border-border/60"
                >
                  {renderCitations(paragraph.replace("### ", ""), article.sources?.length ?? 0)}
                </h3>
              );
            }
            if (paragraph.startsWith("- ")) {
              return (
                <li key={idx} className="ml-6 list-disc text-muted-foreground leading-relaxed pl-1">
                  {renderCitations(paragraph.replace("- ", ""), article.sources?.length ?? 0)}
                </li>
              );
            }
            return (
              <p key={idx} className="text-muted-foreground leading-relaxed">
                {renderCitations(paragraph, article.sources?.length ?? 0)}
              </p>
            );
          })}
        </div>

        {article.sources && article.sources.length > 0 && (
          <aside className="mt-14 rounded-2xl border border-border bg-muted/20 p-6" aria-labelledby="article-sources-heading">
            <h2 id="article-sources-heading" className="text-lg font-bold text-foreground">{t("Official sources")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("Sources checked September 28, 2026. Product availability and terms can change; follow the linked Google pages for the latest details.")}</p>
            <ol className="mt-4 space-y-2">
              {article.sources.map((source, index) => (
                <li key={source.url} id={`source-${index + 1}`} className="scroll-mt-24 text-sm text-muted-foreground">
                  <span className="mr-2 font-semibold text-foreground">[{index + 1}]</span>
                  <a href={source.url} target="_blank" rel="noreferrer" className="font-medium text-google-blue hover:underline">
                    {source.title}
                  </a>
                  <span className="ml-2 text-xs">(Google)</span>
                </li>
              ))}
            </ol>
          </aside>
        )}

        {/* Related Features Section */}
        {relatedFeatureItems.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t("Features Referenced in this Guide")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedFeatureItems.map((feat) => feat && (
                <Link
                  key={feat.slug}
                  href={`/features/${feat.slug}`}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-card-hover hover:border-google-blue/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border inline-block mb-3">
                      {feat.category}
                    </span>
                    <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-google-blue transition-colors">
                      {feat.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border mt-4 flex items-center justify-between text-xs font-semibold text-google-blue">
                    <span>{t("Inspect feature")}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />{t("Back to all Articles")}</Link>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-google-blue to-gemini-indigo text-white font-medium rounded-xl hover:shadow-lg transition-all text-sm"
          >
            {t("Compare all {n} listed plans", { n: plans.length })}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
