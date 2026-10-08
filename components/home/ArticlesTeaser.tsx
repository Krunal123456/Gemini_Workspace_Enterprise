"use client";
import React from "react";
import { getArticles } from "@/lib/i18n/data";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";

import Link from "next/link";
import { ArrowRight, Sparkles, Clock, Calendar } from "lucide-react";

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
              {t("Expert analysis on enterprise AI procurement, deployment architectures, and security governance from the MarketStar Enterprise Advisory Group.")}
            </p>
          </div>
          <Link href={href("/articles")} className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 transition-colors dark:text-blue-300 dark:hover:text-blue-200">
            {t("View all articles")} <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <Link
              key={article.slug}
              href={href(`/articles/${article.slug}`)}
              className="group flex flex-col h-full rounded-3xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl shadow-sm hover:shadow-xl hover:border-violet-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="p-7 sm:p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span className="bg-violet-500/10 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-500/20 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
                  {article.subtitle}
                </p>

                <div className="bg-slate-50/70 dark:bg-slate-950/40 border border-border/50 rounded-2xl p-5 mb-6 backdrop-blur-sm">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                    {t("Key Takeaways")}
                  </h4>
                  <ul className="space-y-2">
                    {article.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                        <span className="text-violet-500 mt-0.5 shrink-0 font-bold">•</span>
                        <span className="line-clamp-2">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-5 border-t border-border/60">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(article.date).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-tr from-google-blue to-gemini-indigo text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      MS
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{article.author.name}</div>
                      <div className="text-xs text-muted-foreground">{article.author.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
