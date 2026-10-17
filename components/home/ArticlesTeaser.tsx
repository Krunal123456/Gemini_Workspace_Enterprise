"use client";
import React from "react";
import { getArticles } from "@/lib/i18n/data";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";

import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";

export default function ArticlesTeaser() {
  const { locale, href } = useLocale();
  const t = createPhraseTranslator(locale);
  const articles = getArticles(locale);
  const featuredArticles = articles.slice(0, 3);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border pb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              {t("Strategic Insights")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("Independent, source-linked explainers on Google Workspace, Gemini products, pricing, and deployment.")}
            </p>
          </div>
          <Link href={href("/articles")} className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 transition-colors dark:text-blue-300 dark:hover:text-blue-200">
            {t("View all articles")} <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {featuredArticles.map((article) => (
            <Link
              key={article.slug}
              href={href(`/articles/${article.slug}`)}
              className="group flex min-h-full flex-col px-1 py-7 transition-colors first:pt-7 md:px-7 md:first:pl-0 md:last:pr-0 md:hover:bg-blue-50/50 dark:md:hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-google-blue"
            >
              <h3 className="text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-google-blue-text">
                {article.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{article.subtitle}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <span className="font-medium text-google-blue-text">{article.category}</span>
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(article.date).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{article.readTime}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {article.keyTakeaways.slice(0, 2).map((takeaway) => (
                  <li key={takeaway} className="flex items-start gap-2 text-xs leading-5 text-foreground/80">
                    <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-google-blue" />
                    <span className="line-clamp-3">{takeaway}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center justify-between gap-3 pt-7 text-xs text-muted-foreground">
                <span>{article.author.name}</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-google-blue-text group-hover:underline">
                  {t("Read article")} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
