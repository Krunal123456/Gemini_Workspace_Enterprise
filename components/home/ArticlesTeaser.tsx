import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Clock, Calendar } from "lucide-react";
import { articles } from "@/data/articles";

export default function ArticlesTeaser() {
  const featuredArticles = articles.slice(0, 3);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border pb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Strategic Insights
            </h2>
            <p className="text-lg text-muted-foreground">
              Expert analysis on enterprise AI procurement, deployment architectures, and security governance from the MarketStar Enterprise Advisory Group.
            </p>
          </div>
          <Link href="/articles" className="inline-flex items-center text-blue-500 font-semibold hover:text-blue-400 transition-colors">
            View all articles <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group flex flex-col h-full bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-blue-400/40 transition-all duration-300 overflow-hidden"
            >
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="bg-muted text-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-500 transition-colors">
                  {article.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-6 flex-grow">
                  {article.subtitle}
                </p>

                <div className="bg-muted/50 rounded-xl p-5 mb-6">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-blue-500" />
                    Key Takeaways
                  </h4>
                  <ul className="space-y-2">
                    {article.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5 shrink-0">•</span>
                        <span className="line-clamp-2">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/15 text-blue-500 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
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
