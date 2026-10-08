"use client";

import { useLocalizedData } from "@/lib/i18n/use-localized-data";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { Clock3, Layers3, ListChecks, ShieldCheck, Workflow } from "lucide-react";

const buildMetrics = (features: unknown[], plans: unknown[], securityLayers: unknown[]) => [
  { value: features.length, suffix: "+", label: "Workspace and Gemini capabilities indexed", icon: ListChecks },
  { value: plans.length, suffix: "", label: "Plan editions mapped for comparison", icon: Layers3 },
  { value: securityLayers.length, suffix: "", label: "Security and governance layers catalogued", icon: ShieldCheck },
  { value: 2, suffix: "M", label: "Input-token context for Gemini 2.5 Pro API", icon: Workflow },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(reduceMotion ? value : 0);
  const rounded = useTransform(count, (current) => String(Math.round(current)));

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.15, ease: "easeOut" });
    return controls.stop;
  }, [count, isInView, reduceMotion, value]);

  return <span ref={ref}><motion.span>{rounded}</motion.span>{suffix}</span>;
}

export function WorkspaceProofMetrics() {
  const { features, plans, securityLayers } = useLocalizedData();
  const { locale } = useLocale();
  const t = createPhraseTranslator(locale);
  const METRICS = buildMetrics(features, plans, securityLayers);
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-border bg-background/50 py-16 backdrop-blur-md md:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-9 grid gap-4 md:grid-cols-[1fr_0.65fr] md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-violet-800 dark:text-violet-200">{t("The intelligence index")}</p>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight text-foreground sm:text-4xl">{t("Grounded in the details that matter.")}</h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-muted-foreground md:justify-self-end">{t("Live catalog counts, not productivity estimates. Model context applies to the cited Gemini API model, not every Workspace plan.")}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {METRICS.map(({ value, suffix, label, icon: Icon }, index) => (
            <motion.div
              key={label}
              data-spotlight
              whileHover={reduceMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group relative flex min-h-36 items-center gap-4 rounded-2xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 p-6 backdrop-blur-2xl shadow-sm hover:shadow-md hover:border-violet-400/40 dark:hover:border-violet-500/30 transition-all duration-300"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20 backdrop-blur-sm">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold tabular-nums text-foreground"><CountUp value={value} suffix={suffix} /></p>
                <p className="mt-1 max-w-52 text-xs leading-5 text-muted-foreground">{t(label)}</p>
              </div>
              <span className="absolute right-4 top-4 font-mono text-[10px] font-semibold text-muted-foreground/50">0{index + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CinematicWorkspaceCTA() {
  const { locale, href } = useLocale();
  const t = createPhraseTranslator(locale);
  return (
    <section className="relative overflow-hidden bg-[#0b0912] py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_115%,rgba(124,58,237,0.3),transparent_48%),radial-gradient(ellipse_at_8%_18%,rgba(66,133,244,0.12),transparent_32%)]" />
      <div className="relative mx-auto max-w-[1100px] px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/15 bg-white/[0.04] p-8 sm:p-12 md:p-16 backdrop-blur-2xl shadow-[0_30px_90px_-30px_rgba(124,58,237,0.35)]">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-200/25 bg-violet-500/15 text-violet-200 backdrop-blur-md shadow-inner">
            <Clock3 className="h-6 w-6" />
          </div>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{t("Ready to shape your enterprise AI workflow?")}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">{t("Explore plan availability and governance controls for Gemini in Workspace.")}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={href("/compare")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-violet-300/40 bg-violet-600/30 px-8 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:bg-violet-600/50 hover:border-violet-300/60"
            >
              <Layers3 className="h-4 w-4" />{t("Compare Workspace plans")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
