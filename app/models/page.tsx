"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, Cpu, ExternalLink, ShieldCheck, Sparkles, TrendingDown, Zap } from "lucide-react";
import { GeminiLogo } from "@/components/logos/GeminiLogo";
import { latestGeminiModels } from "@/data/geminiModels";

const workloadRows = [
  { workload: "Complex reasoning and multimodal analysis", model: "Gemini 3.1 Pro (Preview)", note: "Pro-family reasoning; preview endpoint" },
  { workload: "Long-running code and agent workflows", model: "Gemini 3.8 Flash (GA)", note: "Current flagship Flash model" },
  { workload: "High-volume, cost-sensitive processing", model: "Gemini 3.1 Flash-Lite", note: "Cost-efficient stable model" },
  { workload: "Real-time voice interaction", model: "Gemini 3.8 Live", note: "Low-latency audio-to-audio" },
];

const pricingRows = latestGeminiModels.flatMap((model) => model.apiPricing ? [{
  model: model.name,
  useCase: model.summary,
  input: model.apiPricing.inputUsd,
  output: model.apiPricing.outputUsd,
  inputAbove200k: model.apiPricing.inputAbove200kUsd,
  outputAbove200k: model.apiPricing.outputAbove200kUsd,
  context: model.apiPricing.context,
  pricingNote: model.pricingNote,
  source: model.source,
}] : []);

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

function ModelCostCalculator() {
  const [selectedModel, setSelectedModel] = useState("Gemini 3.8 Flash");
  const [inputTokens, setInputTokens] = useState(750000);
  const [outputTokens, setOutputTokens] = useState(250000);

  const geminiBaseline = useMemo(
    () => pricingRows.find((model) => model.model === "Gemini 3.8 Flash") ?? pricingRows.find((model) => model.model.startsWith("Gemini")) ?? pricingRows[0],
    [],
  );

  const selected = useMemo(
    () => pricingRows.find((model) => model.model === selectedModel) ?? geminiBaseline,
    [geminiBaseline, selectedModel],
  );

  const calculateTotal = (model: (typeof pricingRows)[number]) => {
    const usesHigherProTier = model.model === "Gemini 3.1 Pro" && inputTokens > 200000;
    const inputRate = usesHigherProTier ? model.inputAbove200k ?? model.input : model.input;
    const outputRate = usesHigherProTier ? model.outputAbove200k ?? model.output : model.output;
    const inputCost = (inputTokens / 1_000_000) * inputRate;
    const outputCost = (outputTokens / 1_000_000) * outputRate;
    return inputCost + outputCost;
  };

  const selectedInputCost = (inputTokens / 1_000_000) * (selected.model === "Gemini 3.1 Pro" && inputTokens > 200000 ? selected.inputAbove200k ?? selected.input : selected.input);
  const selectedOutputCost = (outputTokens / 1_000_000) * (selected.model === "Gemini 3.1 Pro" && inputTokens > 200000 ? selected.outputAbove200k ?? selected.output : selected.output);
  const selectedCost = calculateTotal(selected);
  const geminiCost = calculateTotal(geminiBaseline);

  const comparisonRows = pricingRows.map((model) => ({
    ...model,
    total: calculateTotal(model),
    deltaVsGemini: calculateTotal(model) - geminiCost,
  }));

  return (
    <div className="rounded-[30px] border border-border bg-card/90 p-6 shadow-[0_30px_80px_-40px_rgba(59,130,246,0.45)]">
      <div className="mb-6 flex items-center gap-3">
        <BarChart3 className="h-5 w-5 text-google-blue" />
        <h3 className="text-2xl font-bold text-foreground">Gemini API estimator · per 1M tokens</h3>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5 rounded-2xl border border-border bg-background p-5">
          <div>
            <label htmlFor="model-cost-model" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Model</label>
            <select
              id="model-cost-model"
              value={selectedModel}
              onChange={(event) => setSelectedModel(event.target.value)}
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none ring-0 focus:border-google-blue"
            >
              {pricingRows.map((model) => (
                <option key={model.model} value={model.model}>
                  {model.model}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
              <label htmlFor="model-input-tokens">Input tokens</label>
              <span className="font-mono text-foreground">{inputTokens.toLocaleString()}</span>
            </div>
            <input
              id="model-input-tokens"
              type="range"
              min="50000"
              max="5000000"
              step="50000"
              value={inputTokens}
              onChange={(event) => setInputTokens(Number(event.target.value))}
              className="h-2 w-full accent-google-blue"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
              <label htmlFor="model-output-tokens">Output tokens</label>
              <span className="font-mono text-foreground">{outputTokens.toLocaleString()}</span>
            </div>
            <input
              id="model-output-tokens"
              type="range"
              min="10000"
              max="2000000"
              step="10000"
              value={outputTokens}
              onChange={(event) => setOutputTokens(Number(event.target.value))}
              className="h-2 w-full accent-google-blue"
            />
          </div>

          <div className="rounded-2xl border border-google-blue/20 bg-google-blue/5 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-google-blue">Estimated usage</div>
            <div className="mt-3 text-3xl font-black text-foreground">{formatMoney(selectedCost)}</div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {selected.pricingNote ?? "Current Google API list pricing; excludes tools, discounts, caching, and taxes."}
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
              <div className="rounded-xl border border-border bg-background p-2">
                <div className="font-medium text-muted-foreground">Input</div>
                <div className="mt-1 font-semibold text-foreground">{formatMoney(selectedInputCost)}</div>
              </div>
              <div className="rounded-xl border border-border bg-background p-2">
                <div className="font-medium text-muted-foreground">Output</div>
                <div className="mt-1 font-semibold text-foreground">{formatMoney(selectedOutputCost)}</div>
              </div>
              <div className="rounded-xl border border-border bg-background p-2">
                <div className="font-medium text-muted-foreground">Estimated total</div>
                <div className="mt-1 font-semibold text-foreground">{formatMoney(selectedCost)}</div>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-background p-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between gap-3">
                <span>Gemini 3.8 Flash baseline</span>
                <span className="font-semibold text-foreground">{formatMoney(geminiCost)}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingDown className="h-4 w-4 text-google-green" />
              {selected.model === geminiBaseline.model
                ? "This model is the current Flash cost baseline."
                : `${formatMoney(Math.abs(selectedCost - geminiCost))} ${selectedCost >= geminiCost ? "above" : "below"} the Gemini 3.8 Flash estimate.`}
            </div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">API list-price estimate only. Workspace and Gemini Enterprise licensing, caching, tools, discounts, and taxes are not included.</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-muted/40 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Model</th>
                  <th className="px-4 py-3 font-medium">Input</th>
                  <th className="px-4 py-3 font-medium">Output</th>
                  <th className="px-4 py-3 font-medium">Cost</th>
                  <th className="px-4 py-3 font-medium">Delta</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((model) => (
                  <tr key={model.model} className="border-t border-border">
                    <td className="px-4 py-3 font-medium text-foreground">{model.model}</td>
                    <td className="px-4 py-3 text-muted-foreground">{formatMoney(model.input)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{formatMoney(model.output)}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{formatMoney(model.total)}</td>
                    <td className={`px-4 py-3 font-medium ${model.deltaVsGemini <= 0 ? "text-google-green" : "text-amber-600"}`}>
                      {model.deltaVsGemini <= 0 ? `${formatMoney(Math.abs(model.deltaVsGemini))} cheaper` : `${formatMoney(model.deltaVsGemini)} higher`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ModelsPage() {
  return (
    <main className="min-h-screen bg-background pb-20 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground">
          <Link href="/" className="inline-flex items-center gap-2 hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Models</span>
        </div>

        <div className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-200">
            <Sparkles className="h-3.5 w-3.5" />
            Model stack
          </div>
          <h1 className="text-4xl font-black tracking-[-0.08em] text-foreground sm:text-5xl lg:text-6xl">
            Gemini models for the modern enterprise stack.
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
            The right model depends on the work: advanced reasoning, agentic coding, cost-efficient throughput, or real-time voice. Release status and model IDs below follow Google's public catalog; API prices are separate from Workspace and Gemini Enterprise licensing.
          </p>
        </div>

        <div className="mb-5 flex items-center gap-2 text-xs text-muted-foreground">
          <GeminiLogo className="h-5 w-5" />
          <span>Google Gemini API models · catalog checked Sep 24, 2026</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {latestGeminiModels.map((model) => (
            <article key={model.id} className="border-t-2 border-violet-500/70 bg-card p-6 shadow-[0_18px_48px_-40px_rgba(43,26,75,0.5)]">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <GeminiLogo className="h-7 w-7 shrink-0" />
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{model.family}</div>
                    <h2 className="mt-1 text-2xl font-bold text-foreground">{model.name}</h2>
                  </div>
                </div>
                <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-900 dark:bg-violet-300/15 dark:text-violet-100">{model.status}</span>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">{model.summary}</p>
              <code className="mt-4 block overflow-wrap-anywhere rounded-md bg-muted/60 px-3 py-2 font-mono text-xs text-foreground">{model.apiId}</code>
              <div className="mt-4 flex flex-wrap gap-2">
                {model.bestFor.map((item) => <span key={item} className="rounded-full border border-border px-2.5 py-1 text-[10px] font-medium text-muted-foreground">{item}</span>)}
              </div>
              {model.apiPricing && <p className="mt-5 text-sm font-semibold text-foreground">${model.apiPricing.inputUsd.toFixed(2)} input / ${model.apiPricing.outputUsd.toFixed(2)} output per 1M tokens</p>}
              {model.pricingNote && <p className="mt-1 text-xs leading-5 text-muted-foreground">{model.pricingNote}</p>}
              <a href={model.source} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-800 underline-offset-4 hover:underline dark:text-violet-200">
                Official model details <ExternalLink className="h-3 w-3" />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <ModelCostCalculator />
        </div>

        <section className="mt-14 border-t border-border bg-card/70 py-8">
          <div className="mb-6 flex items-center gap-3">
            <Cpu className="h-5 w-5 text-violet-700 dark:text-violet-200" />
            <h3 className="text-2xl font-bold text-foreground">Model fit by workload</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">Workload</th>
                  <th className="pb-2 pr-4 font-medium">Model</th>
                  <th className="pb-2 font-medium">Fit</th>
                </tr>
              </thead>
              <tbody>
                {workloadRows.map((row) => (
                  <tr key={row.workload} className="rounded-2xl bg-slate-50 dark:bg-slate-900/70">
                    <td className="rounded-l-2xl border border-r-0 border-slate-200 px-4 py-3 font-medium text-foreground dark:border-white/10">{row.workload}</td>
                    <td className="border border-r-0 border-slate-200 px-4 py-3 text-foreground dark:border-white/10">{row.model}</td>
                    <td className="rounded-r-2xl border border-slate-200 px-4 py-3 text-muted-foreground dark:border-white/10">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: <Zap className="h-5 w-5 text-blue-600" />,
              title: "Speed-first AI",
              text: "Use the lighter Flash variants when your goal is instant interaction and throughput at scale.",
            },
            {
              icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
              title: "Trust-first deployment",
              text: "Gemini is especially compelling in Workspace-heavy environments where policy, governance, and integration matter.",
            },
            {
              icon: <Sparkles className="h-5 w-5 text-violet-600" />,
              title: "Best overall fit",
              text: "The strongest enterprise story is a blended stack: deep reasoning for expert work, Flash for scale, and governance at the platform layer.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[24px] border border-border bg-card/80 p-5">
              <div className="mb-3 inline-flex rounded-full border border-border bg-background p-2">{item.icon}</div>
              <h4 className="text-xl font-bold text-foreground">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </section>

        <div className="mt-14 rounded-[28px] border border-border bg-muted/20 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-800 dark:text-violet-200">Official references</p>
              <h3 className="mt-2 text-2xl font-bold text-foreground">Model status and pricing</h3>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
              <a href="https://ai.google.dev/gemini-api/docs/models" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 hover:border-violet-500/40">
                Google model catalog <ExternalLink className="h-3 w-3" />
              </a>
              <a href="https://ai.google.dev/gemini-api/docs/pricing" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 hover:border-violet-500/40">
                Google API pricing <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <Link href="/compare" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-400/30 hover:bg-blue-100 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-200 dark:hover:bg-blue-500/15">
            Compare plans and model access
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
