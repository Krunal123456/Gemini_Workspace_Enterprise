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
  };
  pricingNote?: string;
  source: string;
}

// Curated from Google's public Gemini API model catalog and pricing page.
// Recheck temporary introductory prices and release status before publishing updates.
export const latestGeminiModels: GeminiModel[] = [
  {
    id: "gemini-4-argon",
    name: "Gemini 4 Argon",
    apiId: "gemini-4-argon",
    status: "GA",
    family: "Flagship reasoning",
    summary:
      "Google's flagship reasoning model for complex software engineering, mathematical and scientific problem solving, multi-step agents, and long outputs. It accepts text, image, video, audio, and PDF input.",
    bestFor: ["Complex reasoning", "Software engineering", "Long-decode tasks"],
    apiPricing: { inputUsd: 2, outputUsd: 10, context: "1,048,576-token context" },
    pricingNote:
      "Standard API introductory rates through Nov 30, 2026: $2 input / $10 output per 1M tokens. Rates change Dec 1, 2026. See Google's pricing page for tier and tool charges.",
    source: "https://ai.google.dev/gemini-api/docs/models/gemini-4-argon",
  },
  {
    id: "gemini-3.8-flash",
    name: "Gemini 3.8 Flash",
    apiId: "gemini-3.8-flash",
    status: "GA",
    family: "Flash reasoning",
    summary:
      "A generally available Flash model for software engineering, agent workflows, and complex enterprise tasks. Supports text, image, video, audio, and PDF input, with configurable thinking levels.",
    bestFor: ["Agent workflows", "Coding", "Multimodal tasks"],
    apiPricing: { inputUsd: 0.75, outputUsd: 3.75, context: "1,048,576-token input limit" },
    pricingNote:
      "Introductory standard API rates through Dec 31, 2026: $0.75 input / $3.75 output per 1M tokens. Standard rates change Jan 1, 2027. See Google's pricing page for tier and tool charges.",
    source: "https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash",
  },
  {
    id: "gemini-3.7-flash",
    name: "Gemini 3.7 Flash",
    apiId: "gemini-3.7-flash",
    status: "Stable",
    family: "Previous-generation Flash",
    summary:
      "A stable previous-generation model for coding, agentic workflows, and multi-step execution. Check Google's current model documentation for limits, pricing, and migration guidance.",
    bestFor: ["Existing integrations", "Coding", "Multi-step workflows"],
    source: "https://ai.google.dev/gemini-api/docs/models",
  },
  {
    id: "gemini-3.6-flash",
    name: "Gemini 3.6 Flash",
    apiId: "gemini-3.6-flash",
    status: "Stable",
    family: "Previous-generation Flash",
    summary:
      "A stable previous-generation Flash model balancing speed and multimodal capabilities for general agentic and everyday tasks. It supports a 1,048,576-token input limit and 65,536-token output limit.",
    bestFor: ["Everyday tasks", "Multimodal input", "Existing integrations"],
    apiPricing: { inputUsd: 0.75, outputUsd: 3.75, context: "1,048,576-token input limit" },
    pricingNote:
      "Introductory standard API rates through Dec 31, 2026: $0.75 input / $3.75 output per 1M tokens. Check Google's pricing page for current rates and tier details.",
    source: "https://ai.google.dev/gemini-api/docs/models/gemini-3.6-flash",
  },
  {
    id: "gemini-3.1-pro-preview",
    name: "Gemini 3.1 Pro",
    apiId: "gemini-3.1-pro-preview",
    status: "Preview",
    family: "Advanced reasoning preview",
    summary:
      "A preview model for advanced intelligence, complex problem solving, and agentic coding. Preview availability and behavior may change; confirm the current model documentation before production use.",
    bestFor: ["Complex problem solving", "Agentic coding", "Preview evaluation"],
    source: "https://ai.google.dev/gemini-api/docs/models",
  },
];

export const homepageGeminiModels = latestGeminiModels.slice(0, 4);
