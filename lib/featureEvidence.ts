import { Feature } from "@/types";

export type FeatureEvidence = {
  sourceUrl?: string;
  sourceLabel: string;
  confidence: "Official source" | "Curated catalog";
  verifiedDate: string;
  availabilityNotes: string[];
  restrictions: string[];
  officialSources: Array<{ label: string; url: string }>;
};

const verifiedDate = "September 22, 2026";
const GEMINI_PRODUCT_URL = "https://workspace.google.com/products/gemini/?exp=none";
const WORKSPACE_HOME_URL = "https://workspace.google.com/";
const NOTEBOOKLM_URL = "https://notebooklm.google.com/";
const WORKSPACE_PRICING_URL = "https://workspace.google.com/pricing";

const defaultGoogleSources = (feature: Feature) => {
  const app = feature.application.toLowerCase();
  const slug = feature.slug.toLowerCase();

  const slugSpecificSources: Record<string, Array<{ label: string; url: string }>> = {
    "gemini-chat": [
      { label: "Google Gemini product overview", url: GEMINI_PRODUCT_URL },
      { label: "Google Workspace for business", url: WORKSPACE_HOME_URL },
      { label: "Google Workspace pricing", url: WORKSPACE_PRICING_URL },
    ],
    "gemini-slide-generation-in-gemini-app": [
      { label: "Google Gemini product overview", url: GEMINI_PRODUCT_URL },
      { label: "Google Slides", url: "https://workspace.google.com/products/slides/" },
    ],
    "gemini-gemini-in-chrome": [
      { label: "Google Gemini product overview", url: GEMINI_PRODUCT_URL },
      { label: "Google Chrome enterprise documentation", url: "https://support.google.com/chrome/a/answer/7610504" },
    ],
    "gemini-connectors": [
      { label: "Google Gemini product overview", url: GEMINI_PRODUCT_URL },
      { label: "Google Workspace admin help", url: "https://support.google.com/a/answer/13313134" },
      { label: "Google Workspace pricing", url: WORKSPACE_PRICING_URL },
    ],
    "gemini-grounded-responses": [
      { label: "Google Gemini product overview", url: GEMINI_PRODUCT_URL },
      { label: "Google Workspace admin help", url: "https://support.google.com/a/answer/13313134" },
    ],
    "gemini-web-grounding": [
      { label: "Google Gemini product overview", url: GEMINI_PRODUCT_URL },
      { label: "Google Search help center", url: "https://support.google.com/websearch" },
    ],
    "gemini-ground-with-google-search": [
      { label: "Google Gemini product overview", url: GEMINI_PRODUCT_URL },
      { label: "Google Search help center", url: "https://support.google.com/websearch" },
    ],
    "gemini-deep-research": [
      { label: "Google Gemini product overview", url: GEMINI_PRODUCT_URL },
      { label: "Google Workspace for business", url: WORKSPACE_HOME_URL },
    ],
    "gemini-enterprise-platform-agents": [
      { label: "Google Gemini product overview", url: GEMINI_PRODUCT_URL },
      { label: "Google Workspace admin help", url: "https://support.google.com/a/answer/13313134" },
    ],
    "gemini-enterprise-platform-cloud-audit-logging": [
      { label: "Google Gemini product overview", url: GEMINI_PRODUCT_URL },
      { label: "Google Workspace admin help", url: "https://support.google.com/a/answer/13313134" },
    ],
    "notebooklm": [
      { label: "NotebookLM", url: NOTEBOOKLM_URL },
      { label: "Google Gemini product overview", url: GEMINI_PRODUCT_URL },
    ],
    "gmail-help-me-write": [
      { label: "Google Workspace product overview", url: WORKSPACE_HOME_URL },
      { label: "Google Workspace pricing", url: WORKSPACE_PRICING_URL },
    ],
    "docs-help-me-write": [
      { label: "Google Workspace product overview", url: WORKSPACE_HOME_URL },
      { label: "Google Workspace pricing", url: WORKSPACE_PRICING_URL },
    ],
  };

  if (slugSpecificSources[slug]) {
    return slugSpecificSources[slug];
  }

  if (app.includes("notebook") || feature.category === "notebooklm") {
    return [
      { label: "NotebookLM", url: NOTEBOOKLM_URL },
      { label: "Google Gemini product overview", url: GEMINI_PRODUCT_URL },
    ];
  }

  if (app.includes("workspace") || feature.category === "workspace") {
    return [
      { label: "Google Workspace", url: WORKSPACE_HOME_URL },
      { label: "Google Workspace pricing", url: WORKSPACE_PRICING_URL },
    ];
  }

  if (app.includes("gemini") || feature.category === "gemini") {
    return [
      { label: "Google Gemini product overview", url: GEMINI_PRODUCT_URL },
      { label: "Google Workspace", url: WORKSPACE_HOME_URL },
    ];
  }

  return [
    { label: "Google Workspace", url: WORKSPACE_HOME_URL },
    { label: "Google Gemini product overview", url: GEMINI_PRODUCT_URL },
  ];
};

export function getFeatureEvidence(feature: Feature): FeatureEvidence {
  const availabilityNotes = Object.values(feature.plans)
    .map((availability) => availability.note || availability.limit)
    .filter((note): note is string => Boolean(note));
  const restrictions = [
    feature.enterpriseAvailability === "enterprise-only" ? "Enterprise editions only" : null,
    feature.enterpriseAvailability === "plus" ? "Plus editions and supported enterprise plans" : null,
    feature.enterpriseAvailability === "add-on" ? "Requires an AI add-on or eligible base plan" : null,
  ].filter((restriction): restriction is string => Boolean(restriction));

  const officialSources = feature.officialSources?.length
    ? feature.officialSources
    : feature.documentationUrl
      ? [{ label: "Official Google documentation", url: feature.documentationUrl }]
      : defaultGoogleSources(feature);

  return {
    sourceUrl: officialSources[0]?.url,
    sourceLabel: officialSources[0]?.label ?? "Google official source",
    confidence: officialSources[0]?.url ? "Official source" : "Curated catalog",
    verifiedDate,
    availabilityNotes: [...new Set(availabilityNotes)].slice(0, 4),
    restrictions,
    officialSources,
  };
}
