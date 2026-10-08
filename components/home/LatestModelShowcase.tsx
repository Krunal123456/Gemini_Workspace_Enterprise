"use client";

import { useLocalizedData } from "@/lib/i18n/use-localized-data";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GeminiLogo } from "@/components/logos/GeminiLogo";

// Cycle through Google brand + Gemini colors for the spotlight glow per card index
const MODEL_SPOTLIGHTS = [
  "rgba(66,133,244,0.16)",   // Google Blue
  "rgba(167,139,250,0.18)",  // Gemini Purple
  "rgba(52,168,83,0.15)",    // Google Green
  "rgba(0,188,212,0.14)",    // Google Cloud Teal
];
const MODEL_BORDER_GLOWS = [
  "rgba(66,133,244,0.45)",
  "rgba(167,139,250,0.45)",
  "rgba(52,168,83,0.45)",
  "rgba(0,188,212,0.40)",
];

export function LatestModelShowcase() {
  const { models } = useLocalizedData();
  const { locale, href } = useLocale();
  const t = createPhraseTranslator(locale);
  const homepageGeminiModels = models.slice(0, 4);

  return (
    <section className="relative overflow-hidden border-b border-border bg-[#f3f1f8] py-20 dark:bg-[#100d18] md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <GeminiLogo className="h-7 w-7" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-800 dark:text-violet-200">
                {t("Model catalog · verified Sep 24, 2026")}
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {t("The right Gemini model for the work.")}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              {t("Compare current API model families by capability and release status. API list pricing is separate from Google Workspace and Gemini Enterprise licensing.")}
            </p>
          </div>
          <Link href={href("/models")} className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-violet-800 transition-colors hover:text-violet-600 dark:text-violet-200 dark:hover:text-white">
            {t("Full model catalog")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {homepageGeminiModels.map((model, index) => (
            <ModelCard key={model.id} model={model} index={index} t={t} spotlightColor={MODEL_SPOTLIGHTS[index % MODEL_SPOTLIGHTS.length]} borderGlowColor={MODEL_BORDER_GLOWS[index % MODEL_BORDER_GLOWS.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModelCard({
  model,
  index,
  t,
  spotlightColor,
  borderGlowColor,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any;
  index: number;
  t: (s: string) => string;
  spotlightColor: string;
  borderGlowColor: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.12 }
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.45s ease ${index * 70}ms, transform 0.45s ease ${index * 70}ms`,
      }}
    >
      <SpotlightCard
        spotlightColor={spotlightColor}
        borderGlowColor={borderGlowColor}
        enableTilt
        enableBorderBeam={false}
        className="flex min-h-[290px] flex-col rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-[0_16px_45px_-30px_rgba(124,58,237,0.25)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-[0_24px_60px_-25px_rgba(124,58,237,0.35)] dark:border-white/10 dark:bg-white/[0.04]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <GeminiLogo className="h-6 w-6 shrink-0" />
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">{model.family}</div>
              <span className="mt-1 inline-flex rounded-full bg-violet-100/80 px-2.5 py-0.5 text-[10px] font-semibold text-violet-900 border border-violet-200/50 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-200">
                {model.status}
              </span>
            </div>
          </div>
          <code className="max-w-32 break-all text-right font-mono text-[10px] leading-4 text-muted-foreground">{model.apiId}</code>
        </div>

        <h3 className="mt-5 text-xl font-bold text-foreground">{model.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{model.summary}</p>

        <div className="mt-auto pt-5">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {model.bestFor.slice(0, 2).map((useCase: string) => (
              <span key={useCase} className="rounded-full border border-slate-200/60 bg-slate-100/50 dark:border-white/10 dark:bg-white/5 px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                {useCase}
              </span>
            ))}
          </div>
          <a href={model.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-800 underline-offset-4 hover:underline dark:text-violet-200">
            {t("Model details")} <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </SpotlightCard>
    </div>
  );
}