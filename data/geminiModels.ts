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
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    apiId: "gemini-2.5-pro",
    status: "GA",
    family: "Flagship Reasoning",
    summary: "Google's most capable model for complex reasoning, advanced coding, mathematics, and multimodal problem solving with up to 2M context.",
    bestFor: ["Deep analysis", "Complex software engineering", "Multimodal STEM reasoning"],
    apiPricing: { inputUsd: 1.25, outputUsd: 5.0, inputAbove200kUsd: 2.50, outputAbove200kUsd: 10.0, context: "2M-token context · tiered above 128K prompt tokens" },
    pricingNote: "$1.25 / $5.00 per 1M tokens up to 128k; $2.50 / $10.00 above 128k",
    source: "https://ai.google.dev/gemini-api/docs/models/gemini-v2",
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    apiId: "gemini-2.5-flash",
    status: "GA",
    family: "Flagship Flash",
    summary: "Google's next-generation Flash model optimized for frontier intelligence, sub-second speed, long-horizon software engineering, and high-scale agents.",
    bestFor: ["Agent workflows", "Rapid coding", "High-frequency enterprise tasks"],
    apiPricing: { inputUsd: 0.15, outputUsd: 0.60, inputAbove200kUsd: 0.30, outputAbove200kUsd: 1.20, context: "1M-token context · tiered above 128K prompt tokens" },
    pricingNote: "$0.15 / $0.60 per 1M tokens up to 128k; $0.30 / $1.20 above 128k",
    source: "https://ai.google.dev/gemini-api/docs/models/gemini-v2",
  },
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    apiId: "gemini-2.0-flash",
    status: "GA",
    family: "Real-time Multimodal",
    summary: "High-speed, sub-second latency multimodal model with native text, audio, image, and video understanding built for interactive applications.",
    bestFor: ["Low-latency apps", "Real-time multimodal", "Enterprise agents"],
    apiPricing: { inputUsd: 0.10, outputUsd: 0.40, context: "1M-token context" },
    pricingNote: "High-throughput default API pricing with audio/video token support",
    source: "https://ai.google.dev/gemini-api/docs/models/gemini-v2",
  },
  {
    id: "gemini-2.0-flash-thinking",
    name: "Gemini 2.0 Flash Thinking",
    apiId: "gemini-2.0-flash-thinking-exp",
    status: "Preview",
    family: "Autonomous Reasoning",
    summary: "Experimental reasoning model that outputs visible step-by-step thinking traces before generating its solution for complex logic and math.",
    bestFor: ["Multi-step logic", "Mathematical proofs", "Code verification"],
    apiPricing: { inputUsd: 0.15, outputUsd: 0.60, context: "1M-token context" },
    pricingNote: "Includes transparent chain-of-thought token generation",
    source: "https://ai.google.dev/gemini-api/docs/models/gemini-v2",
  },
  {
    id: "gemini-2.0-flash-lite",
    name: "Gemini 2.0 Flash-Lite",
    apiId: "gemini-2.0-flash-lite",
    status: "GA",
    family: "Cost-efficient Scale",
    summary: "Google's most cost-efficient high-speed model designed for massive-volume enterprise pipelines, summarization, and data extraction.",
    bestFor: ["High-volume tasks", "Document parsing", "Cost-sensitive scale"],
    apiPricing: { inputUsd: 0.075, outputUsd: 0.30, context: "1M-token context" },
    pricingNote: "$0.075 input / $0.30 output per 1M tokens",
    source: "https://ai.google.dev/gemini-api/docs/models/gemini-v2",
  },
  {
    id: "gemini-multimodal-live",
    name: "Gemini Live API",
    apiId: "gemini-2.0-flash-realtime",
    status: "GA",
    family: "Real-time Audio & Vision",
    summary: "Low-latency bidirectional audio and video streaming API enabling real-time voice agents, visual workspace assistants, and instant dialogue.",
    bestFor: ["Voice agents", "Live audio dialogue", "Screen/video interaction"],
    pricingNote: "Billed per multimodal audio/video stream minute and token quotas",
    source: "https://ai.google.dev/gemini-api/docs/multimodal-live",
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    apiId: "gemini-1.5-pro",
    status: "Stable",
    family: "Deep Context Workhorse",
    summary: "Established enterprise production workhorse with a 2M-token context window for ingesting full codebases, hours of audio, and massive multi-doc archives.",
    bestFor: ["Repository analysis", "Long video understanding", "Document archives"],
    apiPricing: { inputUsd: 1.25, outputUsd: 5.0, inputAbove200kUsd: 2.50, outputAbove200kUsd: 10.0, context: "2M-token context window" },
    pricingNote: "Standard enterprise tier with long-context caching support",
    source: "https://ai.google.dev/gemini-api/docs/models/gemini-1.5-pro",
  },
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    apiId: "gemini-1.5-flash",
    status: "Stable",
    family: "High-throughput Workhorse",
    summary: "Fast and versatile multimodal model for high-frequency lightweight tasks, classification, and summarization at high volume.",
    bestFor: ["Everyday classification", "Chat interfaces", "High RPS pipelines"],
    apiPricing: { inputUsd: 0.075, outputUsd: 0.30, inputAbove200kUsd: 0.15, outputAbove200kUsd: 0.60, context: "1M-token context window" },
    source: "https://ai.google.dev/gemini-api/docs/models/gemini-1.5-flash",
  },
];

export const homepageGeminiModels = latestGeminiModels.slice(0, 4);