export interface GeminiModel {
  id: string;
  name: string;
  apiId: string;
  status: "GA" | "Stable" | "Preview";
  family: string;
  summary: string;
  bestFor: string[];
  apiPricing?: {
    inputUsd: number;
    outputUsd: number;
    context: string;
    inputAbove200kUsd?: number;
    outputAbove200kUsd?: number;
  };
  pricingNote?: string;
  source: string;
}

export const latestGeminiModels: GeminiModel[] = [
  {
    id: "gemini-3.8-flash",
    name: "Gemini 3.8 Flash",
    apiId: "gemini-3.8-flash",
    status: "GA",
    family: "Flagship Flash",
    summary: "Google's most intelligent Flash model, built for long-horizon software engineering, autonomous agents, and complex enterprise workflows.",
    bestFor: ["Agent workflows", "Complex coding", "Long-running tasks"],
    apiPricing: { inputUsd: 0.75, outputUsd: 3.75, context: "1M-token context" },
    pricingNote: "Introductory API pricing through Dec 31, 2026",
    source: "https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash",
  },
  {
    id: "gemini-3.1-pro-preview",
    name: "Gemini 3.1 Pro",
    apiId: "gemini-3.1-pro-preview",
    status: "Preview",
    family: "Advanced reasoning",
    summary: "Google's Pro preview for multimodal understanding, complex problem solving, and precise multi-step tool use.",
    bestFor: ["Deep analysis", "Multimodal reasoning", "Agentic tool use"],
    apiPricing: { inputUsd: 2, outputUsd: 12, inputAbove200kUsd: 4, outputAbove200kUsd: 18, context: "1M context · tiered above 200K prompt tokens" },
    pricingNote: "$2 input / $12 output through 200K prompt tokens; $4 / $18 above 200K",
    source: "https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview",
  },
  {
    id: "gemini-3.1-flash-lite",
    name: "Gemini 3.1 Flash-Lite",
    apiId: "gemini-3.1-flash-lite",
    status: "Stable",
    family: "Cost-efficient scale",
    summary: "A cost-efficient current model for high-volume agent tasks, translation, and straightforward data processing.",
    bestFor: ["High-volume tasks", "Translation", "Data processing"],
    apiPricing: { inputUsd: 0.25, outputUsd: 1.5, context: "See model documentation" },
    source: "https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-lite",
  },
  {
    id: "gemini-3.8-live",
    name: "Gemini 3.8 Live",
    apiId: "gemini-3.8-live",
    status: "Stable",
    family: "Real-time audio",
    summary: "The current low-latency audio-to-audio model for live dialogue and voice agents, with an extended-thinking variant available.",
    bestFor: ["Voice agents", "Live dialogue", "Audio interaction"],
    pricingNote: "Real-time audio pricing varies by modality; see official pricing",
    source: "https://ai.google.dev/gemini-api/docs/models/gemini-3.8-live",
  },
  {
    id: "gemini-3.7-flash",
    name: "Gemini 3.7 Flash",
    apiId: "gemini-3.7-flash",
    status: "Stable",
    family: "Previous-generation Flash",
    summary: "A supported Flash model for everyday coding, agentic tool use, and reliable multi-step execution.",
    bestFor: ["Everyday coding", "Tool use", "Multi-step execution"],
    apiPricing: { inputUsd: 0.75, outputUsd: 3.75, context: "See model documentation" },
    pricingNote: "Introductory API pricing through Dec 31, 2026",
    source: "https://ai.google.dev/gemini-api/docs/models/gemini-3.7-flash",
  },
];

export const homepageGeminiModels = latestGeminiModels.slice(0, 4);