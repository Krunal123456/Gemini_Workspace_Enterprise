"use client";

import React, { useMemo, useState } from "react";
import { BarChart3, TrendingDown } from "lucide-react";
import { latestGeminiModels } from "@/data/geminiModels";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";

const pricingRows = latestGeminiModels.flatMap((model) =>
  model.apiPricing
    ? [
        {
          model: model.name,
          useCase: model.summary,
          input: model.apiPricing.inputUsd,
          output: model.apiPricing.outputUsd,
          inputAbove200k: model.apiPricing.inputAbove200kUsd,
          outputAbove200k: model.apiPricing.outputAbove200kUsd,
          context: model.apiPricing.context,
          pricingNote: model.pricingNote,
          source: model.source,
        },
      ]
    : [],
);

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

export function ModelCostCalculator() {
  const { locale } = useLocale();
  const t = createPhraseTranslator(locale);
  const [selectedModel, setSelectedModel] = useState("Gemini 2.5 Flash");
  const [inputTokens, setInputTokens] = useState(750000);
  const [outputTokens, setOutputTokens] = useState(250000);

  const geminiBaseline = useMemo(
    () =>
      pricingRows.find((model) => model.model === "Gemini 2.5 Flash") ??
      pricingRows.find((model) => model.model.includes("Flash")) ??
      pricingRows[0],
    [],
  );

  const selected = useMemo(
    () =>
      pricingRows.find((model) => model.model === selectedModel) ??
      geminiBaseline,
    [geminiBaseline, selectedModel],
  );

  const calculateTotal = (model: (typeof pricingRows)[number]) => {
    const usesHigherTier =
      (model.model.includes("Pro") || model.model.includes("2.5")) && inputTokens > 128000;
    const inputRate = usesHigherTier && model.inputAbove200k
      ? model.inputAbove200k
      : model.input;
    const outputRate = usesHigherTier && model.outputAbove200k
      ? model.outputAbove200k
      : model.output;
    const inputCost = (inputTokens / 1_000_000) * inputRate;
    const outputCost = (outputTokens / 1_000_000) * outputRate;
    return inputCost + outputCost;
  };

  const selectedInputCost =
    (inputTokens / 1_000_000) *
    ((selected.model.includes("Pro") || selected.model.includes("2.5")) && inputTokens > 128000 && selected.inputAbove200k
      ? selected.inputAbove200k
      : selected.input);
  const selectedOutputCost =
    (outputTokens / 1_000_000) *
    ((selected.model.includes("Pro") || selected.model.includes("2.5")) && inputTokens > 128000 && selected.outputAbove200k
      ? selected.outputAbove200k
      : selected.output);
  const selectedCost = calculateTotal(selected);
  const geminiCost = calculateTotal(geminiBaseline);

  const comparisonRows = pricingRows.map((model) => ({
    ...model,
    total: calculateTotal(model),
    deltaVsGemini: calculateTotal(model) - geminiCost,
  }));

  return (
    <div className="rounded-[30px] border border-white/40 dark:border-white/10 bg-white/75 dark:bg-slate-900/60 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_30px_80px_-30px_rgba(99,102,241,0.25)] dark:shadow-[0_30px_90px_-30px_rgba(0,0,0,0.7)]">
      <div className="mb-6 flex items-center gap-3">
        <BarChart3 className="h-5 w-5 text-google-blue" />
        <h3 className="text-2xl font-bold text-foreground">
          {t("Gemini API estimator · per 1M tokens")}
        </h3>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5 rounded-2xl border border-border/80 bg-background/80 backdrop-blur-xl p-5 shadow-sm">
          <div>
            <label
              htmlFor="model-cost-model"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground"
            >
              Model
            </label>
            <select
              id="model-cost-model"
              value={selectedModel}
              onChange={(event) => setSelectedModel(event.target.value)}
              className="w-full rounded-xl border border-border/80 bg-card/90 backdrop-blur px-3 py-2.5 text-sm text-foreground outline-none ring-0 focus:border-google-blue focus:ring-1 focus:ring-google-blue/40 transition-all"
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
              <label htmlFor="model-input-tokens">{t("Input tokens")}</label>
              <span className="font-mono text-foreground">
                {inputTokens.toLocaleString()}
              </span>
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
              <label htmlFor="model-output-tokens">{t("Output tokens")}</label>
              <span className="font-mono text-foreground">
                {outputTokens.toLocaleString()}
              </span>
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

          <div className="rounded-2xl border border-google-blue/20 bg-google-blue/5 backdrop-blur-md p-4">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-google-blue">
              {t("Estimated usage")}
            </div>
            <div className="mt-3 text-3xl font-black text-foreground">
              {formatMoney(selectedCost)}
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {selected.pricingNote ??
                "Current Google API list pricing; excludes tools, discounts, caching, and taxes."}
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
              <div className="rounded-xl border border-border/80 bg-background/80 p-2">
                <div className="font-medium text-muted-foreground">Input</div>
                <div className="mt-1 font-semibold text-foreground">
                  {formatMoney(selectedInputCost)}
                </div>
              </div>
              <div className="rounded-xl border border-border/80 bg-background/80 p-2">
                <div className="font-medium text-muted-foreground">Output</div>
                <div className="mt-1 font-semibold text-foreground">
                  {formatMoney(selectedOutputCost)}
                </div>
              </div>
              <div className="rounded-xl border border-border/80 bg-background/80 p-2">
                <div className="font-medium text-muted-foreground">
                  {t("Estimated total")}
                </div>
                <div className="mt-1 font-semibold text-foreground">
                  {formatMoney(selectedCost)}
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-border/80 bg-background/80 p-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between gap-3">
                <span>{t("Gemini 2.5 Flash baseline")}</span>
                <span className="font-semibold text-foreground">
                  {formatMoney(geminiCost)}
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingDown className="h-4 w-4 text-google-green" />
              {selected.model === geminiBaseline.model
                ? "This model is the current Flash cost baseline."
                : `${formatMoney(Math.abs(selectedCost - geminiCost))} ${selectedCost >= geminiCost ? "above" : "below"} the Gemini 2.5 Flash estimate.`}
            </div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              API list-price estimate only. Workspace and Gemini Enterprise
              licensing, caching, tools, discounts, and taxes are not included.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/80 bg-background/60 backdrop-blur-xl">
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
                    <td className="px-4 py-3 font-medium text-foreground">
                      {model.model}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatMoney(model.input)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatMoney(model.output)}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {formatMoney(model.total)}
                    </td>
                    <td
                      className={`px-4 py-3 font-medium ${model.deltaVsGemini <= 0 ? "text-green-800 dark:text-green-300" : "text-amber-800 dark:text-amber-300"}`}
                    >
                      {model.deltaVsGemini <= 0
                        ? `${formatMoney(Math.abs(model.deltaVsGemini))} cheaper`
                        : `${formatMoney(model.deltaVsGemini)} higher`}
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
