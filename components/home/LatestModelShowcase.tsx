"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GeminiLogo } from "@/components/logos/GeminiLogo";
import { homepageGeminiModels } from "@/data/geminiModels";

function RevealModelCard({ children, delay }: { children: ReactNode; delay: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const [motionReady, setMotionReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    setMotionReady(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      data-motion-ready={motionReady}
      data-visible={isVisible}
      style={{ transitionDelay: `${delay}ms` }}
      className="model-reveal group flex min-h-[286px] flex-col border-t-2 border-violet-500/70 bg-white p-5 shadow-[0_16px_45px_-34px_rgba(43,26,75,0.42)] transition-shadow hover:shadow-[0_22px_54px_-34px_rgba(43,26,75,0.55)] dark:bg-white/[0.04]"
    >
      {children}
    </article>
  );
}

export function LatestModelShowcase() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-[#f3f1f8] py-20 dark:bg-[#100d18] md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <GeminiLogo className="h-7 w-7" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-800 dark:text-violet-200">
                Model catalog · verified Sep 24, 2026
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              The right Gemini model for the work.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Compare current API model families by capability and release status. API list pricing is separate from Google Workspace and Gemini Enterprise licensing.
            </p>
          </div>
          <Link href="/models" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-violet-800 transition-colors hover:text-violet-600 dark:text-violet-200 dark:hover:text-white">
            Full model catalog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {homepageGeminiModels.map((model, index) => (
            <RevealModelCard key={model.id} delay={index * 70}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <GeminiLogo className="h-6 w-6 shrink-0" />
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">{model.family}</div>
                    <span className="mt-1 inline-flex rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-900 dark:bg-violet-300/15 dark:text-violet-100">
                      {model.status}
                    </span>
                  </div>
                </div>
                <code className="max-w-32 break-all text-right font-mono text-[10px] leading-4 text-muted-foreground">{model.apiId}</code>
              </div>

              <h3 className="mt-6 text-xl font-bold text-foreground">{model.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{model.summary}</p>

              <div className="mt-auto pt-5">
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {model.bestFor.slice(0, 2).map((useCase) => (
                    <span key={useCase} className="rounded-full border border-border px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                      {useCase}
                    </span>
                  ))}
                </div>
                <a href={model.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-800 underline-offset-4 hover:underline dark:text-violet-200">
                  Model details <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </RevealModelCard>
          ))}
        </div>
      </div>
    </section>
  );
}