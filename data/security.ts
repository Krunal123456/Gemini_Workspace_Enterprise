import { SecurityLayer } from "@/types";

export const securityLayers: SecurityLayer[] = [
  {
    id: "identity",
    level: 1,
    name: "Identity and authentication",
    tagline: "Start with who can sign in and how their identity is verified.",
    description: "Identity settings are configured for an organization's directory and may differ across Workspace and Google Cloud products.",
    capabilities: [
      { name: "Single sign-on and multi-factor authentication", description: "Review the identity provider, login protections, and recovery paths used by the people who will access AI tools.", reviewQuestion: "Which Workspace or Cloud identity controls apply to these users?" },
      { name: "Account lifecycle", description: "Check how user provisioning, deprovisioning, and role changes are handled across the services in scope.", reviewQuestion: "How quickly are access changes reflected in each connected service?" },
    ],
  },
  {
    id: "access",
    level: 2,
    name: "Access and device policies",
    tagline: "Check how access policies apply to users, devices, and connected sources.",
    description: "Workspace and Google Cloud access features vary by product, edition, and configuration. Verify that policies cover each AI surface and data connector in the proposed deployment.",
    capabilities: [
      { name: "Role and group access", description: "Map administrator, end-user, and connector permissions to the source systems they need.", reviewQuestion: "Do source permissions carry through to AI search results?" },
      { name: "Device and context checks", description: "Identify which device posture, location, or network checks are supported for the selected service.", reviewQuestion: "Which policies can block access, and which only report or monitor it?" },
    ],
  },
  {
    id: "data-protection",
    level: 3,
    name: "Data protection and encryption",
    tagline: "Confirm which data is covered by each protection and where it applies.",
    description: "Encryption, data regions, and DLP do not automatically cover every product surface or data type. Use product documentation to confirm supported services and editions.",
    capabilities: [
      { name: "Data regions", description: "Review which stored data and services are covered by any configured data-region policy.", reviewQuestion: "Are the AI inputs, outputs, and source files in scope?" },
      { name: "DLP and encryption", description: "Confirm the supported data types, workflows, and administrative prerequisites for the controls you plan to use.", reviewQuestion: "Which AI surfaces and file types are included in the policy?" },
    ],
  },
  {
    id: "ai-safety",
    level: 4,
    name: "AI safety controls",
    tagline: "Understand what a screening control does and how it is configured.",
    description: "Google documents Model Armor screening for Gemini Enterprise. Administrators configure templates and enforcement behavior; screening can add latency and does not mask personally identifiable information.",
    capabilities: [
      { name: "Model Armor", description: "Model Armor is supported on all Gemini Enterprise editions at no additional cost and can screen prompts and responses when configured.", reviewQuestion: "Which templates, regions, enforcement mode, and failure behavior will administrators use?" },
      { name: "Prompt and response review", description: "Set policies for the kinds of content to inspect and understand when a request is blocked or allowed.", reviewQuestion: "How will teams validate screening behavior and handle false positives?" },
    ],
  },
  {
    id: "retention",
    level: 5,
    name: "Retention and discovery",
    tagline: "Check whether legal and retention policies cover the AI data you care about.",
    description: "Google Vault and other retention tools apply to supported services and data. Confirm coverage for the specific prompts, responses, files, and logs in your workflow.",
    capabilities: [
      { name: "Retention policies", description: "Review retention periods and deletion behavior for each Workspace or Cloud service in scope.", reviewQuestion: "Are the generated outputs and prompts included in the selected policy?" },
      { name: "Legal discovery", description: "Confirm which data can be held, searched, and exported, and whether additional configuration is required.", reviewQuestion: "Can the legal team locate the data required for an investigation or hold?" },
    ],
  },
  {
    id: "compliance",
    level: 6,
    name: "Compliance scope",
    tagline: "Match a compliance requirement to the exact service and intended use.",
    description: "A provider certification does not automatically make every product, configuration, or customer workflow compliant. Check the applicable functionality lists and agreements.",
    capabilities: [
      { name: "HIPAA and regulated data", description: "Google lists certain Workspace services and Gemini functionality for HIPAA-related use with the required agreement.", reviewQuestion: "Are the selected services on Google's current included-functionality list, and is the required BAA in place?" },
      { name: "Certifications and regional requirements", description: "Review the current compliance resource for the specific Google service, data location, and use case.", reviewQuestion: "Does the documented scope cover your deployment and contractual requirements?" },
    ],
  },
  {
    id: "audit",
    level: 7,
    name: "Audit and monitoring",
    tagline: "Identify the events available to administrators and how to retain them.",
    description: "Audit events and export options vary by service. Confirm event coverage, access permissions, delivery latency, and retention before treating logs as compliance evidence.",
    capabilities: [
      { name: "Audit events", description: "Review which user, administrator, connector, and agent events are recorded for each service.", reviewQuestion: "Are the events needed for your controls available and enabled?" },
      { name: "Log export", description: "Plan how relevant events will be routed, protected, and retained in your monitoring environment.", reviewQuestion: "Who can access the logs, and what is the configured retention period?" },
    ],
  },
];
