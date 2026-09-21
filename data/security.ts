import { SecurityLayer } from "@/types";

export const securityLayers: SecurityLayer[] = [
  {
    id: "layer-1-identity",
    level: 1,
    name: "Identity & Authentication",
    tagline: "Uncompromising enterprise single sign-on and adaptive multi-factor security.",
    description: "The perimeter begins with user identity. Robust authentication protocols ensure that only verified enterprise personnel can interact with AI models and corporate data repositories.",
    capabilities: [
      {
        name: "Cloud Identity Premium",
        description: "Automated user provisioning, SAML 2.0 / OIDC single sign-on, and directory sync with Microsoft Entra ID / Active Directory.",
        plansSupported: ["Enterprise Standard", "Enterprise Plus", "Gemini Enterprise Plus"],
        isEnterpriseOnly: true,
      },
      {
        name: "Titan Security Key & FIDO2 Enforcement",
        description: "Hardware-backed phishing-resistant multi-factor authentication (MFA) that completely mitigates credential interception.",
        plansSupported: ["Business Standard", "Business Plus", "Enterprise Standard", "Enterprise Plus", "All Gemini Enterprise"],
        isEnterpriseOnly: false,
      },
      {
        name: "Automated Suspicious Login Challenge",
        description: "Machine-learning driven login anomaly detection that blocks compromised sessions before AI interactions occur.",
        plansSupported: ["All Plans"],
        isEnterpriseOnly: false,
      },
    ],
  },
  {
    id: "layer-2-access",
    level: 2,
    name: "Zero-Trust Context-Aware Access",
    tagline: "Granular access decisions based on device posture, network location, and user role.",
    description: "Context-Aware Access (CAA) enforces zero-trust principles across all Workspace applications and Gemini interfaces. Access is dynamically granted or restricted based on device health, operating system patch levels, and physical geography.",
    capabilities: [
      {
        name: "Context-Aware Access (CAA)",
        description: "Enforce zero-trust policies: allow Gemini access only from company-managed laptops running authorized OS builds on corporate VPNs.",
        plansSupported: ["Enterprise Plus", "Gemini Enterprise Plus"],
        isEnterpriseOnly: true,
      },
      {
        name: "Advanced Endpoint Management",
        description: "Enforce device encryption, screen lock timeouts, remote wipe, and app whitelisting on iOS and Android devices.",
        plansSupported: ["Business Plus", "Enterprise Standard", "Enterprise Plus", "All Gemini Enterprise"],
        isEnterpriseOnly: false,
      },
      {
        name: "Session Length & Idle Timeout Controls",
        description: "Automatically terminate Gemini chat sessions when browser tabs remain inactive in unmanaged environments.",
        plansSupported: ["Enterprise Standard", "Enterprise Plus", "All Gemini Enterprise"],
        isEnterpriseOnly: true,
      },
    ],
  },
  {
    id: "layer-3-data",
    level: 3,
    name: "Data Protection & Encryption",
    tagline: "Military-grade encryption at rest, in transit, and customer-held cryptographic keys.",
    description: "Your corporate data is never mixed with public models. Data is encrypted in transit and at rest using AES-256, with support for customer-managed keys (CMEK) and browser-side encryption (CSE).",
    capabilities: [
      {
        name: "Customer-Managed Encryption Keys (CMEK)",
        description: "Control your own encryption keys via Google Cloud KMS or external HSMs. Revoke keys at will to render cloud data immediately unreadable.",
        plansSupported: ["Enterprise Plus", "Gemini Enterprise Plus"],
        isEnterpriseOnly: true,
      },
      {
        name: "Client-Side Encryption (CSE)",
        description: "Encrypt Google Docs, Sheets, and Slides in the user's browser before data ever touches Google servers, giving total sovereign control.",
        plansSupported: ["Enterprise Plus"],
        isEnterpriseOnly: true,
      },
      {
        name: "Enterprise Data Regions (Per-OU Policies)",
        description: "Geographically constrain stored data and AI model execution to specific regions (e.g. European Union, United States) at the organizational unit level.",
        plansSupported: ["Enterprise Plus", "Gemini Enterprise Plus"],
        isEnterpriseOnly: true,
      },
      {
        name: "Data Loss Prevention (DLP)",
        description: "Scan documents, emails, and chat messages in real time for sensitive information (PII, credit card numbers, health data) and block external leakage.",
        plansSupported: ["Enterprise Standard", "Enterprise Plus", "Gemini Enterprise Standard", "Gemini Enterprise Plus"],
        isEnterpriseOnly: true,
      },
    ],
  },
  {
    id: "layer-4-ai",
    level: 4,
    name: "AI Safety & Model Armor",
    tagline: "Dedicated model safeguards preventing prompt injection, hallucinations, and data exfiltration.",
    description: "Enterprise Gemini includes a comprehensive AI firewall layer. User prompts and returned responses pass through active safety filters and Model Armor inspection pipelines.",
    capabilities: [
      {
        name: "Model Armor AI Security Protections",
        description: "Active real-time detection and neutralization of adversarial jailbreaks, indirect prompt injection attacks, and sensitive data leakage in model completions.",
        plansSupported: ["Enterprise Plus", "Gemini Enterprise Standard", "Gemini Enterprise Plus"],
        isEnterpriseOnly: true,
      },
      {
        name: "Zero Data Training Guarantee",
        description: "Contractual commitment that customer prompts, generated responses, and uploaded documents are never used to train Google's foundation models.",
        plansSupported: ["All Workspace Plans", "All AI Add-ons", "All Gemini Enterprise Plans"],
        isEnterpriseOnly: false,
      },
      {
        name: "Watermarking (SynthID)",
        description: "Imperceptible digital watermarking embedded into all generated images (Imagen) and videos (Veo) for provenance and verification.",
        plansSupported: ["All Plans with Image/Video Generation"],
        isEnterpriseOnly: false,
      },
    ],
  },
  {
    id: "layer-5-governance",
    level: 5,
    name: "Information Governance & Vault",
    tagline: "Comprehensive eDiscovery, legal holds, and automated retention lifecycle policies.",
    description: "Ensure enterprise legal preparedness. Google Vault retains and discovers messages and files across Workspace and Gemini interactions according to statutory compliance mandates.",
    capabilities: [
      {
        name: "Google Vault eDiscovery",
        description: "Retain, hold, search, and export data from Gmail, Drive, Chat, Meet recordings, and Gemini interactions for legal and compliance discovery.",
        plansSupported: ["Business Plus", "Enterprise Standard", "Enterprise Plus", "Gemini Enterprise Standard", "Gemini Enterprise Plus"],
        isEnterpriseOnly: false,
      },
      {
        name: "Automated Data Retention & Disposal Policies",
        description: "Establish custom retention rules by department or team, automatically scrubbing expired communications to limit liability.",
        plansSupported: ["Business Plus", "Enterprise Standard", "Enterprise Plus"],
        isEnterpriseOnly: false,
      },
      {
        name: "Information Barriers",
        description: "Prevent unauthorized internal collaboration and cross-talk between conflicting business divisions (e.g., investment banking vs advisory).",
        plansSupported: ["Enterprise Plus"],
        isEnterpriseOnly: true,
      },
    ],
  },
  {
    id: "layer-6-compliance",
    level: 6,
    name: "Compliance & Industry Certifications",
    tagline: "Audited conformance with the world's most rigorous regulatory benchmarks.",
    description: "Google Workspace and Gemini Enterprise maintain continuous compliance with international data protection laws, sovereign privacy frameworks, and healthcare regulations.",
    capabilities: [
      {
        name: "HIPAA Compliance (Business Associate Agreement)",
        description: "Execute Google's Business Associate Agreement (BAA) to safely handle Protected Health Information (PHI) within Gemini-assisted workflows.",
        plansSupported: ["All Workspace Business & Enterprise Plans", "All Gemini Enterprise Plans"],
        isEnterpriseOnly: false,
      },
      {
        name: "SOC 1, SOC 2, and SOC 3 Compliance",
        description: "Independently audited AICPA trust services criteria for security, availability, processing integrity, and confidentiality.",
        plansSupported: ["All Plans"],
        isEnterpriseOnly: false,
      },
      {
        name: "ISO/IEC 27001, 27017, and 27018 Certifications",
        description: "Global standard certification for cloud information security management and personal data protection in public clouds.",
        plansSupported: ["All Plans"],
        isEnterpriseOnly: false,
      },
      {
        name: "GDPR & EU Model Contract Clauses",
        description: "Comprehensive European data protection compliance ensuring lawful cross-border data processing and subject access request compliance.",
        plansSupported: ["All Plans"],
        isEnterpriseOnly: false,
      },
    ],
  },
  {
    id: "layer-7-audit",
    level: 7,
    name: "Audit Logging & Threat Telemetry",
    tagline: "High-resolution operational observability with BigQuery and SIEM streaming.",
    description: "Every action, query, prompt, and administrative modification produces an immutable audit record. Export telemetry directly into Google Cloud BigQuery, Chronicle, Splunk, or Datadog.",
    capabilities: [
      {
        name: "Google Cloud Audit Logging for Gemini Enterprise",
        description: "Stream high-fidelity audit events for every user interaction, connector sync, and agent execution to Google Cloud Logging.",
        plansSupported: ["Gemini Enterprise Business", "Gemini Enterprise Standard", "Gemini Enterprise Plus"],
        isEnterpriseOnly: true,
      },
      {
        name: "BigQuery Log Streaming",
        description: "Export full Workspace and Gemini audit logs into BigQuery in real time for custom security analytics, dashboards, and threat hunting.",
        plansSupported: ["Enterprise Standard", "Enterprise Plus", "All Gemini Enterprise Plans"],
        isEnterpriseOnly: true,
      },
      {
        name: "Security Investigation Tool (SIT)",
        description: "Admin console forensics interface to identify security issues, triage compromised accounts, and revoke malicious sharing links domain-wide.",
        plansSupported: ["Enterprise Plus"],
        isEnterpriseOnly: true,
      },
      {
        name: "VPC Service Controls (VPC-SC)",
        description: "Define a secure perimeter around Google Cloud resources and Gemini data to mitigate data exfiltration risks.",
        plansSupported: ["Enterprise Plus", "Gemini Enterprise Plus"],
        isEnterpriseOnly: true,
      },
    ],
  },
];
