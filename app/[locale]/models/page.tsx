import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, ExternalLink, Sparkles, Zap } from "lucide-react";
import type { Metadata } from "next";
import { GeminiLogo } from "@/components/logos/GeminiLogo";
import { latestGeminiModels } from "@/data/geminiModels";
import { ModelCostCalculator } from "@/components/models/ModelCostCalculator";
import { createPhraseTranslator } from "@/lib/i18n/translate";
import { resolveLocale, type Locale } from "@/lib/i18n/config";

const workloadRows = [
  { workload: "Complex reasoning, software engineering & multimodal STEM", model: "Gemini 2.5 Pro (GA)", note: "Flagship 2M-token reasoning model" },
  { workload: "Long-horizon agent workflows & high-frequency coding", model: "Gemini 2.5 Flash (GA)", note: "Next-gen flagship Flash with sub-second speed" },
  { workload: "Real-time voice agents & live video interaction", model: "Gemini Live API (GA)", note: "Low-latency bidirectional audio/video" },
  { workload: "High-volume, cost-sensitive processing & extraction", model: "Gemini 2.0 Flash-Lite (GA)", note: "$0.075/1M input cost-efficient scale" },
  { workload: "Step-by-step logic, math & code verification", model: "Gemini 2.0 Flash Thinking (Preview)", note: "Transparent chain-of-thought reasoning" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const t = createPhraseTranslator(locale);
  return {
    title: t("Gemini Models Catalog & Pricing Comparison"),
    description: t("Compare current Gemini model families by capability, token limits, and API pricing."),
  };
}

export default async function ModelsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const t = createPhraseTranslator(locale);

  return (
    <main className="min-h-screen bg-background pb-20 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground">
          <Link href="/" className="inline-flex items-center gap-2 hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />{t("Home")}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{t("Models")}</span>
        </div>

        <div className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 dark:border-blue-400/20 dark:bg-blue-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-200 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />{t("Model stack")}
          </div>
          <h1 className="text-4xl font-black tracking-[-0.08em] text-foreground sm:text-5xl lg:text-6xl">{t("Gemini models for the modern enterprise stack.")}</h1>
          <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
            {t("The right model depends on the work: advanced reasoning, agentic coding, cost-efficient throughput, or real-time voice. Release status and model IDs below follow Google's public catalog; API prices are separate from Workspace and Gemini Enterprise licensing.")}
          </p>
        </div>

        <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <GeminiLogo className="h-5 w-5" />
          <span>{t("Google Gemini API models · latest production catalog")}</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {latestGeminiModels.map((model) => (
            <article key={model.id} className="group relative overflow-hidden rounded-2xl border border-white/40 dark:border-white/10 bg-white/75 dark:bg-slate-900/60 backdrop-blur-2xl p-6 sm:p-7 shadow-[0_20px_50px_-25px_rgba(99,102,241,0.15)] dark:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-violet-500/40 hover:shadow-[0_30px_70px_-20px_rgba(99,102,241,0.25)] flex flex-col justify-between">
              <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl group-hover:bg-violet-500/15 transition-all duration-500" />
              
              <div>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <GeminiLogo className="h-7 w-7 shrink-0" />
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{model.family}</div>
                      <h2 className="mt-1 text-2xl font-bold text-foreground">{model.name}</h2>
                    </div>
                  </div>
                  <span className="rounded-full bg-violet-100/80 border border-violet-200/50 px-2.5 py-1 text-xs font-semibold text-violet-900 dark:bg-violet-300/15 dark:border-violet-400/20 dark:text-violet-100 backdrop-blur-sm">{model.status}</span>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">{model.summary}</p>
                <code className="mt-4 block overflow-wrap-anywhere rounded-xl bg-muted/50 border border-border/50 px-3 py-2 font-mono text-xs text-foreground">{model.apiId}</code>
                <div className="mt-4 flex flex-wrap gap-2">
                  {model.bestFor.map((item) => (
                    <span key={item} className="rounded-full border border-border/80 bg-background/50 backdrop-blur-xs px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-border/60 pt-5">
                {model.apiPricing && (
                  <p className="text-sm font-semibold text-foreground">
                    ${model.apiPricing.inputUsd.toFixed(2)} input / ${model.apiPricing.outputUsd.toFixed(2)} output per 1M tokens
                  </p>
                )}
                {model.pricingNote && <p className="mt-1 text-xs leading-5 text-muted-foreground">{model.pricingNote}</p>}
                <a href={model.source} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 dark:text-violet-300 underline-offset-4 hover:underline">
                  {t("Official model details")}<ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <ModelCostCalculator />
        </div>

        <section className="mt-14 rounded-3xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl p-6 sm:p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <Cpu className="h-5 w-5 text-violet-700 dark:text-violet-200" />
            <h3 className="text-2xl font-bold text-foreground">{t("Model fit by workload")}</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">{t("Workload")}</th>
                  <th className="pb-2 pr-4 font-medium">Model</th>
                  <th className="pb-2 font-medium">Fit</th>
                </tr>
              </thead>
              <tbody>
                {workloadRows.map((row) => (
                  <tr key={row.workload} className="rounded-2xl bg-slate-50/80 dark:bg-slate-950/50 backdrop-blur-md">
                    <td className="rounded-l-2xl border border-r-0 border-slate-200/80 px-4 py-3 font-medium text-foreground dark:border-white/10">{row.workload}</td>
                    <td className="border border-r-0 border-slate-200/80 px-4 py-3 text-foreground dark:border-white/10 font-semibold">{row.model}</td>
                    <td className="rounded-r-2xl border border-slate-200/80 px-4 py-3 text-muted-foreground dark:border-white/10">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
              title: "Speed-first AI",
              text: "Use the lighter Flash variants when your goal is instant interaction and throughput at scale.",
            },
            {
              icon: <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
              title: "Trust-first deployment",
              text: "Gemini is especially compelling in Workspace-heavy environments where policy, governance, and integration matter.",
            },
            {
              icon: <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400" />,
              title: "Best overall fit",
              text: "The strongest enterprise story is a blended stack: deep reasoning for expert work, Flash for scale, and governance at the platform layer.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl p-6 shadow-sm">
              <div className="mb-3 inline-flex rounded-xl border border-border/80 bg-background/80 p-2.5 shadow-xs">{item.icon}</div>
              <h4 className="text-xl font-bold text-foreground">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </section>

        <div className="mt-14 rounded-3xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl p-6 sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-800 dark:text-violet-200">{t("Official references")}</p>
              <h3 className="mt-2 text-2xl font-bold text-foreground">{t("Model status and pricing")}</h3>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
              <a href="https://ai.google.dev/gemini-api/docs/models" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-background/80 backdrop-blur px-3 py-1.5 hover:border-violet-500/40">{t("Google model catalog")}<ExternalLink className="h-3 w-3" />
              </a>
              <a href="https://ai.google.dev/gemini-api/docs/pricing" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-background/80 backdrop-blur px-3 py-1.5 hover:border-violet-500/40">{t("Google API pricing")}<ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <Link href="/compare" className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 dark:border-blue-400/20 dark:bg-blue-500/10 px-6 py-3.5 text-sm font-semibold text-blue-700 dark:text-blue-200 transition hover:bg-blue-100 dark:hover:bg-blue-500/20 backdrop-blur-md shadow-sm">
            Compare plans and model access
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
