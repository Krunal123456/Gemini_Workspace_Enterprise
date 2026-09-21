"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, Cpu, ExternalLink, ShieldCheck, Sparkles, TrendingDown, Zap } from "lucide-react";

const latestModels = [
  {
    name: "Gemini 3.8 Flash",
    tag: "Latest flagship Flash",
    summary: "Google's newest high-speed reasoning model for autonomous agents, tool use, and fast enterprise workflows.",
    bestFor: ["Agent workflows", "High-throughput automation", "Complex multimodal tasks"],
    strength: "Best speed-to-reasoning",
    source: "https://ai.google.dev/gemini-api/docs/pricing",
  },
  {
    name: "Gemini 3.7 Pro",
    tag: "Advanced reasoning",
    summary: "A strong enterprise reasoning model for longer-form planning, synthesis, deep analysis, and more deliberate work across multiple tools.",
    bestFor: ["Deep research", "Planning", "Complex synthesis"],
    strength: "Best reasoning depth",
    source: "https://ai.google.dev/gemini-api/docs/pricing",
  },
  {
    name: "Gemini 3.5 Flash",
    tag: "Balanced cost and speed",
    summary: "A strong default for large-scale enterprise automation, document-heavy analysis, and responsive assistant experiences.",
    bestFor: ["Document analysis", "Search grounding", "Customer-facing AI"],
    strength: "Strong enterprise default",
    source: "https://ai.google.dev/gemini-api/docs/pricing",
  },
  {
    name: "Gemini 2.5 Pro",
    tag: "Deep reasoning",
    summary: "The premium reasoning choice for complex architecture tasks, coding, and large analytical workloads with more deliberate inference.",
    bestFor: ["Deep research", "Coding", "Complex reasoning"],
    strength: "Best analytical depth",
    source: "https://ai.google.dev/gemini-api/docs/pricing",
  },
  {
    name: "Gemini 2.5 Flash-Lite",
    tag: "Cost-efficient scale",
    summary: "Built for high-volume workloads where price sensitivity matters and practical throughput is more important than peak complexity.",
    bestFor: ["High-volume tasks", "Cost-sensitive automation", "Batch processing"],
    strength: "Best price efficiency",
    source: "https://ai.google.dev/gemini-api/docs/pricing",
  },
];

const benchmarkRows = [
  { capability: "Reasoning depth", gemini: "Excellent", compared: "Top-tier for coding and complex enterprise analysis" },
  { capability: "Multimodal capability", gemini: "Excellent", compared: "Strong across text, image, and document workflows" },
  { capability: "Low-latency deployment", gemini: "Very strong", compared: "Excellent for interactive, customer-facing agents" },
  { capability: "Price-to-performance", gemini: "Very strong", compared: "Competitive with lower-cost frontier alternatives" },
  { capability: "Workspace integration", gemini: "Excellent", compared: "Best fit for Google Workspace and Cloud-native enterprise stacks" },
  { capability: "Governance and controls", gemini: "Very strong", compared: "Well aligned for enterprise policy and admin operations" },
];

const pricingRows = [
  {
    model: "Gemini 3.8 Flash",
    useCase: "Latest high-speed reasoning model for agentic automation, multimodal tasks, and enterprise tooling",
    input: 0.35,
    output: 2.8,
    context: "1M context window",
    source: "https://ai.google.dev/gemini-api/docs/pricing",
  },
  {
    model: "Gemini 3.7 Pro",
    useCase: "Premium reasoning for planning, large synthesis tasks, and more advanced agentic workflows",
    input: 1.4,
    output: 10.5,
    context: "1M context window",
    source: "https://ai.google.dev/gemini-api/docs/pricing",
  },
  {
    model: "Gemini 2.5 Flash",
    useCase: "Fast production AI, search-grounded workflows, and high-throughput assistants",
    input: 0.3,
    output: 2.5,
    context: "1M context window",
    source: "https://ai.google.dev/gemini-api/docs/pricing",
  },
  {
    model: "Gemini 2.5 Pro",
    useCase: "Deep reasoning, coding, research, and architecture-heavy tasks",
    input: 1.25,
    output: 10,
    context: "1M context window",
    source: "https://ai.google.dev/gemini-api/docs/pricing",
  },
  {
    model: "Gemini 2.5 Flash-Lite",
    useCase: "Cheap, large-scale automation and large-batch processing",
    input: 0.1,
    output: 0.4,
    context: "Large-scale throughput",
    source: "https://ai.google.dev/gemini-api/docs/pricing",
  },
  {
    model: "GPT-4.1 mini",
    useCase: "Fast assistant work, summarization, and lightweight app features",
    input: 0.4,
    output: 1.6,
    context: "1M context window",
    source: "https://openai.com/api/pricing/",
  },
  {
    model: "GPT-4.1",
    useCase: "General-purpose advanced reasoning and higher-end agentic work",
    input: 2,
    output: 8,
    context: "1M context window",
    source: "https://openai.com/api/pricing/",
  },
  {
    model: "Claude 3.5 Sonnet",
    useCase: "Long-form analysis, software workflows, and coding-heavy projects",
    input: 3,
    output: 15,
    context: "200K context window",
    source: "https://www.anthropic.com/pricing",
  },
  {
    model: "Claude 3.7 Sonnet",
    useCase: "Planning, writing, and strong reasoning for broad knowledge work",
    input: 3,
    output: 15,
    context: "200K context window",
    source: "https://www.anthropic.com/pricing",
  },
  {
    model: "Mistral Large",
    useCase: "General enterprise AI, retrieval, and cost-aware multi-step automation",
    input: 2,
    output: 6,
    context: "128K context window",
    source: "https://mistral.ai/pricing/",
  },
];

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

function ModelCostCalculator() {
  const [selectedModel, setSelectedModel] = useState("Gemini 3.8 Flash");
  const [enterprisePlan, setEnterprisePlan] = useState("standard");
  const [inputTokens, setInputTokens] = useState(750000);
  const [outputTokens, setOutputTokens] = useState(250000);

  const enterprisePlans = [
    { id: "standard", name: "Gemini Enterprise Standard", freeCredit: 10 },
    { id: "plus", name: "Gemini Enterprise Plus", freeCredit: 15 },
  ];

  const geminiBaseline = useMemo(
    () => pricingRows.find((model) => model.model === "Gemini 3.8 Flash") ?? pricingRows.find((model) => model.model.startsWith("Gemini")) ?? pricingRows[0],
    [],
  );

  const selected = useMemo(
    () => pricingRows.find((model) => model.model === selectedModel) ?? geminiBaseline,
    [geminiBaseline, selectedModel],
  );

  const selectedPlan = enterprisePlans.find((plan) => plan.id === enterprisePlan) ?? enterprisePlans[0];

  const calculateTotal = (model: (typeof pricingRows)[number]) => {
    const inputCost = (inputTokens / 1_000_000) * model.input;
    const outputCost = (outputTokens / 1_000_000) * model.output;
    return inputCost + outputCost;
  };

  const selectedCost = calculateTotal(selected);
  const geminiCost = calculateTotal(geminiBaseline);
  const geminiNet = Math.max(0, geminiCost - selectedPlan.freeCredit);
  const selectedNet = Math.max(0, selectedCost - selectedPlan.freeCredit);
  const savings = Math.max(0, selectedCost - geminiCost);
  const finalGeminiSavings = Math.max(0, selectedNet - geminiNet);

  const comparisonRows = pricingRows.map((model) => ({
    ...model,
    total: calculateTotal(model),
    deltaVsGemini: calculateTotal(model) - geminiCost,
  }));

  return (
    <div className="rounded-[30px] border border-border bg-card/90 p-6 shadow-[0_30px_80px_-40px_rgba(59,130,246,0.45)]">
      <div className="mb-6 flex items-center gap-3">
        <BarChart3 className="h-5 w-5 text-google-blue" />
        <h3 className="text-2xl font-bold text-foreground">Usage cost calculator • per 1M tokens</h3>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5 rounded-2xl border border-border bg-background p-5">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Model</label>
            <select
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
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Google Gemini Enterprise plan</label>
            <select
              value={enterprisePlan}
              onChange={(event) => setEnterprisePlan(event.target.value)}
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none ring-0 focus:border-google-blue"
            >
              {enterprisePlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} • ${plan.freeCredit} credit
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
              <span>Input tokens</span>
              <span className="font-mono text-foreground">{inputTokens.toLocaleString()}</span>
            </div>
            <input
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
              <span>Output tokens</span>
              <span className="font-mono text-foreground">{outputTokens.toLocaleString()}</span>
            </div>
            <input
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
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
              <div className="rounded-xl border border-border bg-background p-2">
                <div className="font-medium text-muted-foreground">Before credit</div>
                <div className="mt-1 font-semibold text-foreground">{formatMoney(selectedCost)}</div>
              </div>
              <div className="rounded-xl border border-border bg-background p-2">
                <div className="font-medium text-muted-foreground">Credit</div>
                <div className="mt-1 font-semibold text-google-green">-${selectedPlan.freeCredit}</div>
              </div>
              <div className="rounded-xl border border-border bg-background p-2">
                <div className="font-medium text-muted-foreground">Net payable</div>
                <div className="mt-1 font-semibold text-foreground">{formatMoney(selectedNet)}</div>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-background p-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between gap-3">
                <span>Gemini baseline</span>
                <span className="font-semibold text-foreground">{formatMoney(geminiCost)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <span>Gemini net with {selectedPlan.name}</span>
                <span className="font-semibold text-google-green">{formatMoney(geminiNet)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <span>Final Gemini savings</span>
                <span className="font-semibold text-google-green">{formatMoney(finalGeminiSavings)}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingDown className="h-4 w-4 text-google-green" />
              {selected.model.startsWith("Gemini")
                ? `Gemini stays at ${formatMoney(geminiNet)} net with the ${selectedPlan.name} credit.`
                : `Gemini cost advantage: ${formatMoney(savings)} vs ${selected.model}`}
            </div>
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
            The right model depends on the job: fast throughput, deep reasoning, cost efficiency, or large-context enterprise analysis. This page tracks the latest Gemini family and compares it against leading market alternatives using public pricing and context guidance.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {latestModels.map((model) => (
            <article key={model.name} className="relative overflow-hidden rounded-[28px] border border-border bg-card/90 p-6 shadow-[0_30px_80px_-40px_rgba(59,130,246,0.4)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.12),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(52,211,153,0.10),transparent_26%)]" />
              <div className="relative">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{model.tag}</div>
                    <h2 className="mt-2 text-2xl font-bold text-foreground">{model.name}</h2>
                  </div>
                  <div className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {model.strength}
                  </div>
                </div>

                <p className="text-sm leading-7 text-muted-foreground">{model.summary}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {model.bestFor.map((item) => (
                    <span key={item} className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/70">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Official reference</span>
                    <a href={model.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-google-blue">
                      Source <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">Google's official pricing and model documentation positions this family as the default option for agentic, multimodal, and Workspace-first enterprise workloads.</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-14 rounded-[30px] border border-border bg-card/90 p-6 shadow-[0_30px_80px_-40px_rgba(37,99,235,0.35)]">
          <div className="mb-6 flex items-center gap-3">
            <Cpu className="h-5 w-5 text-blue-600" />
            <h3 className="text-2xl font-bold text-foreground">Benchmark positioning</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">Capability</th>
                  <th className="pb-2 pr-4 font-medium">Gemini</th>
                  <th className="pb-2 font-medium">Comparative view</th>
                </tr>
              </thead>
              <tbody>
                {benchmarkRows.map((row) => (
                  <tr key={row.capability} className="rounded-2xl bg-slate-50 dark:bg-slate-900/70">
                    <td className="rounded-l-2xl border border-r-0 border-slate-200 px-4 py-3 font-medium text-foreground dark:border-white/10">{row.capability}</td>
                    <td className="border border-r-0 border-slate-200 px-4 py-3 text-emerald-700 dark:border-white/10 dark:text-emerald-300">{row.gemini}</td>
                    <td className="rounded-r-2xl border border-slate-200 px-4 py-3 text-muted-foreground dark:border-white/10">{row.compared}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14 rounded-[30px] border border-border bg-card/90 p-6 shadow-[0_30px_80px_-40px_rgba(59,130,246,0.35)]">
          <div className="mb-6 flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <h3 className="text-2xl font-bold text-foreground">Competitor pricing matrix</h3>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="rounded-full border border-border bg-background px-2.5 py-1">Pricing shown in USD per 1M tokens</span>
            <span className="rounded-full border border-border bg-background px-2.5 py-1">All values are public list price references</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">Model</th>
                  <th className="pb-2 pr-4 font-medium">Best for</th>
                  <th className="pb-2 pr-4 font-medium">Input</th>
                  <th className="pb-2 pr-4 font-medium">Output</th>
                  <th className="pb-2 pr-4 font-medium">Context</th>
                  <th className="pb-2 font-medium">Source</th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row) => (
                  <tr key={row.model} className="rounded-2xl bg-slate-50 dark:bg-slate-900/70">
                    <td className="rounded-l-2xl border border-r-0 border-slate-200 px-4 py-3 font-semibold text-foreground dark:border-white/10">{row.model}</td>
                    <td className="border border-r-0 border-slate-200 px-4 py-3 text-muted-foreground dark:border-white/10">{row.useCase}</td>
                    <td className="border border-r-0 border-slate-200 px-4 py-3 text-google-blue dark:border-white/10">{formatMoney(row.input)}</td>
                    <td className="border border-r-0 border-slate-200 px-4 py-3 text-google-blue dark:border-white/10">{formatMoney(row.output)}</td>
                    <td className="border border-r-0 border-slate-200 px-4 py-3 text-muted-foreground dark:border-white/10">{row.context}</td>
                    <td className="rounded-r-2xl border border-slate-200 px-4 py-3 dark:border-white/10">
                      <a href={row.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-google-blue hover:underline">
                        Official <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
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
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-google-blue">Official references</p>
              <h3 className="mt-2 text-2xl font-bold text-foreground">Source-backed comparison notes</h3>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
              <a href="https://ai.google.dev/gemini-api/docs/pricing" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 hover:border-google-blue/40">
                Google Gemini pricing <ExternalLink className="h-3 w-3" />
              </a>
              <a href="https://openai.com/api/pricing/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 hover:border-google-blue/40">
                OpenAI pricing <ExternalLink className="h-3 w-3" />
              </a>
              <a href="https://www.anthropic.com/pricing" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 hover:border-google-blue/40">
                Anthropic pricing <ExternalLink className="h-3 w-3" />
              </a>
              <a href="https://mistral.ai/pricing/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 hover:border-google-blue/40">
                Mistral pricing <ExternalLink className="h-3 w-3" />
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
