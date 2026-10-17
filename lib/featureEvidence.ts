import { Feature } from "@/types";

export type FeatureEvidence = {
  sourceUrl?: string;
  sourceLabel: string;
  sourceCoverage: "Feature-specific source" | "Product-level source";
  sourceNote: string;
  sourceReviewedAt?: string;
  availabilityNotes: string[];
  restrictions: string[];
  officialSources: Array<{ label: string; url: string }>;
};

const GEMINI_PRODUCT_URL = "https://workspace.google.com/products/gemini/?exp=none";
const WORKSPACE_HOME_URL = "https://workspace.google.com/";
const NOTEBOOKLM_URL = "https://notebooklm.google.com/";
const WORKSPACE_PRICING_URL = "https://workspace.google.com/pricing";

const appDocumentation: Record<string, { label: string; url: string }> = {
  gmail: { label: "Gmail Help Center", url: "https://support.google.com/mail/?hl=en" },
  docs: { label: "Google Docs Editors Help", url: "https://support.google.com/docs/?hl=en" },
  sheets: { label: "Google Sheets Help", url: "https://support.google.com/docs/?hl=en" },
  slides: { label: "Google Slides Help", url: "https://support.google.com/docs/?hl=en" },
  drive: { label: "Google Drive Help", url: "https://support.google.com/drive/?hl=en" },
  meet: { label: "Google Meet Help", url: "https://support.google.com/meet/?hl=en" },
  chat: { label: "Google Chat Help", url: "https://support.google.com/chat/?hl=en" },
  calendar: { label: "Google Calendar Help", url: "https://support.google.com/calendar/?hl=en" },
  forms: { label: "Google Forms Help", url: "https://support.google.com/docs/?hl=en" },
  keep: { label: "Google Keep Help", url: "https://support.google.com/keep/?hl=en" },
  tasks: { label: "Google Tasks Help", url: "https://support.google.com/tasks/?hl=en" },
  voice: { label: "Google Voice Help", url: "https://support.google.com/voice/?hl=en" },
  notebooklm: { label: "NotebookLM Help Center", url: "https://support.google.com/notebooklm/?hl=en" },
  studio: { label: "Google Workspace Studio Help", url: "https://support.google.com/workspace-studio/?hl=en" },
  appsheet: { label: "AppSheet Help Center", url: "https://support.google.com/appsheet/?hl=en" },
  "developer-tools": { label: "Google AI for Developers", url: "https://ai.google.dev/gemini-api/docs" },
};

const defaultGoogleSources = (feature: Feature) => {
  const app = feature.application.toLowerCase();
  const slug = feature.slug.toLowerCase();

  const appSource = appDocumentation[app];
  const workspaceEditionSources = [
    { label: "Google Workspace Business edition comparison", url: "https://knowledge.workspace.google.com/admin/getting-started/editions/compare-business-editions" },
    { label: "Google Workspace Enterprise edition comparison", url: "https://knowledge.workspace.google.com/admin/getting-started/editions/compare-enterprise-editions" },
    { label: "Google Workspace AI Expanded Access and limits", url: "https://knowledge.workspace.google.com/admin/generative-ai/workspace-with-gemini/ai-expanded-access" },
  ];
  const geminiEnterpriseEditionSource = { label: "Gemini Enterprise edition comparison", url: "https://docs.cloud.google.com/gemini/enterprise/docs/editions" };

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
    "security-gemini-app-with-enterprise-grade-data-protection": [
      { label: "Google Workspace Gemini privacy and data protections FAQ", url: "https://support.google.com/a/answer/14130944?hl=en-uk" },
      { label: "Google Workspace security and data protection", url: "https://workspace.google.com/security/" },
    ],
    "security-data-regions-basic-single-policy": [
      { label: "Google Workspace Data Regions coverage and eligibility", url: "https://knowledge.workspace.google.com/admin/compliance/data-covered-by-data-regions" },
      { label: "Compare Google Workspace editions", url: "https://knowledge.workspace.google.com/admin/getting-started/editions/compare-business-editions" },
    ],
    "security-client-side-encryption": [
      { label: "Google Workspace client-side encryption overview and supported editions", url: "https://knowledge.workspace.google.com/admin/security/client-side-encryption-user-experience-overview?hl=en" },
    ],
    "security-vpc-service-controls": [
      { label: "Secure a Gemini Enterprise app with VPC Service Controls", url: "https://docs.cloud.google.com/gemini/enterprise/docs/use-vpc-service-controls?hl=en" },
    ],
    "meet-translated-captions": [
      { label: "Supported languages for Google Workspace with Gemini", url: "https://support.google.com/meet/answer/14925782?hl=En" },
      { label: "Google Workspace AI Expanded Access and usage limits", url: "https://knowledge.workspace.google.com/admin/generative-ai/workspace-with-gemini/ai-expanded-access" },
    ],
    "security-vault-ediscovery": [
      { label: "Google Vault Help Center", url: "https://support.google.com/vault/?hl=en" },
    ],
    "security-dlp": [
      { label: "About DLP for Google Drive", url: "https://knowledge.workspace.google.com/admin/security/about-dlp-for-drive" },
      { label: "Create DLP rules for Drive", url: "https://knowledge.workspace.google.com/admin/security/create-dlp-for-drive-rules-and-custom-content-detectors" },
    ],
    "security-enterprise-grade-security-and-compliance": [
      { label: "Google Workspace security and data protection", url: "https://workspace.google.com/security/" },
    ],
    "security-hipaa-compliance": [
      { label: "Google Workspace HIPAA implementation guide", url: "https://services.google.com/fh/files/misc/gsuite_cloud_identity_hipaa_implementation_guide.pdf" },
      { label: "Google Workspace HIPAA Business Associate Addendum", url: "https://workspace.google.com/terms/2015/1/hipaa_baa/" },
    ],
  };

  if (slugSpecificSources[slug]) {
    return [...slugSpecificSources[slug], ...workspaceEditionSources, geminiEnterpriseEditionSource];
  }

  if (appSource) {
    return [appSource, ...workspaceEditionSources, geminiEnterpriseEditionSource, { label: "Google Workspace plan pricing", url: WORKSPACE_PRICING_URL }];
  }

  if (app.includes("notebook") || feature.category === "notebooklm") {
    return [
      { label: "NotebookLM", url: NOTEBOOKLM_URL },
      { label: "NotebookLM Help Center", url: "https://support.google.com/notebooklm/?hl=en" },
      { label: "Google Gemini product overview", url: GEMINI_PRODUCT_URL },
      ...workspaceEditionSources,
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
      geminiEnterpriseEditionSource,
      ...workspaceEditionSources,
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
    .filter((availability) => availability.status !== "unverified")
    .map((availability) => availability.note || availability.limit)
    .filter((note): note is string => Boolean(note));
  const restrictions = [
    feature.enterpriseAvailability === "enterprise-only" ? "Enterprise editions only" : null,
    feature.enterpriseAvailability === "plus" ? "Plus editions and supported enterprise plans" : null,
    feature.enterpriseAvailability === "add-on" ? "Requires an AI add-on or eligible base plan" : null,
  ].filter((restriction): restriction is string => Boolean(restriction));

  const suppliedSources = feature.officialSources?.length
    ? feature.officialSources
    : feature.documentationUrl
      ? [{ label: "Official Google documentation", url: feature.documentationUrl }]
      : [];
  const officialSources = [...new Map(
    [...suppliedSources, ...defaultGoogleSources(feature)].map((source) => [source.url, source]),
  ).values()];
  const hasFeatureSpecificSource = feature.sourceSpecificity === "feature";

  return {
    sourceUrl: officialSources[0]?.url,
    sourceLabel: officialSources[0]?.label ?? "Google official source",
    sourceCoverage: hasFeatureSpecificSource ? "Feature-specific source" : "Product-level source",
    sourceNote: hasFeatureSpecificSource
      ? "The linked Google page documents this capability. Edition eligibility is mapped only where the edition comparison lists it."
      : "These official links cover the broader product; they do not verify every detail of this catalog entry.",
    sourceReviewedAt: feature.sourceReviewedAt,
    availabilityNotes: [...new Set(availabilityNotes)].slice(0, 4),
    restrictions,
    officialSources,
  };
}
