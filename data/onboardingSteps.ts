export interface OnboardingCitation {
  label: string;
  url: string;
  description: string;
}

export interface IAMRoleItem {
  persona: string;
  role: string;
  title: string;
  purpose: string;
  isMandatory: boolean;
}

export interface OnboardingSubtask {
  id: string;
  title: string;
  description: string;
  consolePath?: string;
  cliCommand?: string;
  notes?: string;
  standardVsPlusNote?: string;
  orgVsNoOrgNote?: string;
}

export interface OnboardingStep {
  id: string;
  stepNumber: number;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  subtasks: OnboardingSubtask[];
  iamRoles?: IAMRoleItem[];
  citations: OnboardingCitation[];
  commonTroubleshooting?: { issue: string; resolution: string }[];
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: "step-1-org-project",
    stepNumber: 1,
    title: "Google Cloud Hierarchy & Project Provisioning",
    shortTitle: "Org & Project",
    tagline: "Verify whether the account is in an Organization or 'No organization', and provision the project container.",
    summary:
      "Before deploying Gemini Enterprise, an administrator must inspect Google Cloud resource hierarchy. Organizations provide centralized domain IAM policies and directory synchronization, whereas 'No organization' accounts are unmanaged and require domain binding for full enterprise governance.",
    subtasks: [
      {
        id: "1-1-check-org",
        title: "Inspect Organization Hierarchy in Google Cloud Console",
        description:
          "Open the Google Cloud Console and click the project/organization drop-down in the top navigation bar. Verify if the account is under an Organization node (e.g., yourcompany.com) or indicates 'No organization'.",
        consolePath: "Google Cloud Console > Top Navigation Bar > Select from dropdown",
        orgVsNoOrgNote:
          "If in 'No organization', the account was created as a standalone Google Account. Enterprise license distribution and domain directory sync require linking your domain to Cloud Identity (Free or Premium) or Google Workspace.",
        cliCommand: "gcloud organizations list",
      },
      {
        id: "1-2-create-project",
        title: "Create or Select a Dedicated Gemini Enterprise Project",
        description:
          "Isolate enterprise AI workloads, Agent Builder applications, and connectors in a dedicated Google Cloud project (e.g., gemini-enterprise-prod) to maintain clear IAM boundaries and billing attribution.",
        consolePath: "Google Cloud Console > IAM & Admin > Manage Resources > Create Project",
        cliCommand:
          "gcloud projects create gemini-enterprise-prod \\\n  --name=\"Gemini Enterprise Production\" \\\n  --set-as-default",
        notes:
          "Ensure Project ID is globally unique. If working within an Organization, specify --organization=ORGANIZATION_ID or --folder=FOLDER_ID.",
      },
      {
        id: "1-3-verify-admin-permissions",
        title: "Verify Project Ownership & Admin Permissions",
        description:
          "Confirm that your administrative account holds 'roles/resourcemanager.projectIamAdmin' and 'roles/resourcemanager.organizationAdmin' (if in an Organization).",
        cliCommand: "gcloud projects get-iam-policy gemini-enterprise-prod",
      },
    ],
    citations: [
      {
        label: "Google Cloud Resource Hierarchy",
        url: "https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy",
        description: "Official guide on Organization nodes, Folders, and Project structures.",
      },
      {
        label: "Creating and Managing Organizations",
        url: "https://cloud.google.com/resource-manager/docs/creating-managing-organization",
        description: "Step-by-step guidance on setting up Cloud Identity or Google Workspace as the Organization root.",
      },
      {
        label: "Gemini Enterprise Prerequisites",
        url: "https://docs.cloud.google.com/gemini/enterprise/docs/prerequisites",
        description: "Google Cloud prerequisites for Gemini Enterprise account activation.",
      },
    ],
    commonTroubleshooting: [
      {
        issue: "Organization node is missing / Showing 'No organization'",
        resolution:
          "Sign up for Cloud Identity Free with your company domain (or use existing Google Workspace admin credentials). Then migrate your existing project to the organization node using 'gcloud beta projects move'.",
      },
      {
        issue: "Project creation quota exceeded",
        resolution:
          "Request a project quota increase in Google Cloud Console under IAM & Admin > Quotas, or delete unused sandbox projects.",
      },
    ],
  },
  {
    id: "step-2-billing",
    stepNumber: 2,
    title: "Cloud Billing Discovery, Assignment & Budget Alerts",
    shortTitle: "Billing Setup",
    tagline: "Locate active billing accounts, link billing to the project, and establish budget guardrails.",
    summary:
      "Gemini Enterprise subscriptions and underlying compute/storage/indexing resources require an active Google Cloud Billing Account. Admins must verify billing account ownership and link it to the dedicated project.",
    subtasks: [
      {
        id: "2-1-locate-billing",
        title: "Locate and Verify Billing Account Permissions",
        description:
          "Navigate to the Cloud Billing console. Confirm you possess 'roles/billing.admin' or 'roles/billing.user' on the billing account.",
        consolePath: "Google Cloud Console > Billing > My Billing Accounts",
        cliCommand: "gcloud billing accounts list",
        orgVsNoOrgNote:
          "In organizations, billing accounts are centrally managed by finance admins. In 'No organization', personal or corporate credit card billing accounts are directly bound to the project.",
      },
      {
        id: "2-2-link-billing",
        title: "Link the Billing Account to the Gemini Enterprise Project",
        description:
          "Attach the verified Cloud Billing Account to your Gemini Enterprise project so APIs and subscriptions can be provisioned.",
        consolePath: "Google Cloud Console > Billing > Account Management > Link a Project",
        cliCommand:
          "# Replace with your Billing Account ID (format: XXXXXX-XXXXXX-XXXXXX)\ngcloud billing projects link gemini-enterprise-prod \\\n  --billing-account=012345-6789AB-CDEF01",
      },
      {
        id: "2-3-budget-alerts",
        title: "Establish Budgets & Spending Threshold Notifications",
        description:
          "Create a monthly budget with automated alerts at 50%, 80%, and 100% of forecasted usage to monitor pooled storage indexing overages and API operations.",
        consolePath: "Google Cloud Console > Billing > Budgets & alerts > Create budget",
        notes:
          "Both Standard and Plus editions include pooled indexing quotas (30 GiB and 75 GiB per user). Additional ingestion beyond pooled capacity is billed per GiB-month.",
      },
    ],
    citations: [
      {
        label: "Modify Project Billing Settings",
        url: "https://cloud.google.com/billing/docs/how-to/modify-project",
        description: "Official documentation on linking, unlinking, and updating Cloud Billing accounts on projects.",
      },
      {
        label: "Gemini Enterprise Quotas and Overages",
        url: "https://docs.cloud.google.com/gemini/enterprise/docs/quotas-and-overages",
        description: "Official guide on pooled indexing thresholds, API rates, and overage billing mechanics.",
      },
    ],
    commonTroubleshooting: [
      {
        issue: "Error: User is not authorized to link project to billing account",
        resolution:
          "Request 'Billing Account User' (roles/billing.user) role on the billing account and 'Project Billing Manager' (roles/resourcemanager.projectBillingManager) on the target project.",
      },
    ],
  },
  {
    id: "step-3-enable-apis",
    stepNumber: 3,
    title: "Enable Required Service APIs",
    shortTitle: "Enable APIs",
    tagline: "Activate all required core, discovery, agent platform, and storage APIs.",
    summary:
      "Gemini Enterprise relies on a suite of integrated Google Cloud APIs: Cloud AI Companion (Gemini assistant), Discovery Engine (Agent Search & Conversation), Vertex AI (foundation models), Resource Manager, Service Usage, and underlying data connectors.",
    subtasks: [
      {
        id: "3-1-enable-core-apis",
        title: "Enable Cloud AI Companion and Discovery Engine APIs",
        description:
          "Enable the primary Gemini Enterprise and Agent Platform endpoints required for enterprise chat, agents, and data grounding.",
        consolePath: "Google Cloud Console > APIs & Services > Library > Search API names",
        cliCommand:
          "gcloud services enable \\\n  cloudaicompanion.googleapis.com \\\n  discoveryengine.googleapis.com \\\n  aiplatform.googleapis.com",
      },
      {
        id: "3-2-enable-management-apis",
        title: "Enable Identity, Resource & Governance APIs",
        description:
          "Enable Cloud Resource Manager, Service Usage, and IAM APIs for policy evaluation and license lifecycle orchestration.",
        cliCommand:
          "gcloud services enable \\\n  cloudresourcemanager.googleapis.com \\\n  serviceusage.googleapis.com \\\n  iam.googleapis.com",
      },
      {
        id: "3-3-enable-data-apis",
        title: "Enable Data Source APIs (GCS, BigQuery, Drive)",
        description:
          "Activate storage and analytics APIs corresponding to the internal enterprise repositories you intend to connect.",
        cliCommand:
          "gcloud services enable \\\n  storage.googleapis.com \\\n  bigquery.googleapis.com \\\n  logging.googleapis.com \\\n  monitoring.googleapis.com",
      },
      {
        id: "3-4-verify-services",
        title: "Verify All Required Services Are Active",
        description: "Execute a verification check to ensure no API activation is in a pending or failed state.",
        cliCommand:
          "gcloud services list --enabled --filter=\"name:(cloudaicompanion OR discoveryengine OR aiplatform)\"",
      },
    ],
    citations: [
      {
        label: "Enabling APIs in Google Cloud",
        url: "https://cloud.google.com/service-usage/docs/enable-disable",
        description: "Google Cloud documentation for enabling APIs via console and gcloud CLI.",
      },
      {
        label: "Discovery Engine API Overview",
        url: "https://cloud.google.com/generative-ai-app-builder/docs/apis",
        description: "API specifications for Discovery Engine, Agent Search, and data stores.",
      },
      {
        label: "Cloud AI Companion API Documentation",
        url: "https://cloud.google.com/gemini/docs/overview",
        description: "Reference guide for cloudaicompanion.googleapis.com and Gemini for Google Cloud services.",
      },
    ],
    commonTroubleshooting: [
      {
        issue: "API enablement times out or fails with PERMISSION_DENIED",
        resolution:
          "Confirm 'roles/serviceusage.serviceUsageAdmin' is granted on the project and verify Cloud Billing is active.",
      },
    ],
  },
  {
    id: "step-4-iam-roles",
    stepNumber: 4,
    title: "Configure IAM Roles & Access Governance",
    shortTitle: "IAM & Roles",
    tagline: "Assign least-privilege IAM roles for Administrators, Data Engineers, and End Users.",
    summary:
      "Security best practices require establishing dedicated roles for administering Gemini Enterprise, curating data stores, and granting user chat access without granting broad Project Owner rights.",
    iamRoles: [
      {
        persona: "Gemini Enterprise Administrator",
        role: "roles/cloudaicompanion.admin",
        title: "Cloud AI Companion Admin",
        purpose: "Administers Gemini assistant settings, prompt policies, and tenant-wide configurations.",
        isMandatory: true,
      },
      {
        persona: "Gemini Enterprise Administrator",
        role: "roles/discoveryengine.admin",
        title: "Discovery Engine Admin",
        purpose: "Full administrative control over Agent Builder apps, data stores, search engines, and connectors.",
        isMandatory: true,
      },
      {
        persona: "Gemini Enterprise Administrator",
        role: "roles/discoveryengine.agentspaceAdmin",
        title: "Gemini Enterprise Admin",
        purpose: "High-level administrative authority over the Gemini Enterprise Agent Platform and agent registry.",
        isMandatory: true,
      },
      {
        persona: "Data & Ingestion Engineer",
        role: "roles/discoveryengine.editor",
        title: "Discovery Engine Editor",
        purpose: "Creates and modifies data stores, schedules sync jobs, and edits schema mappings.",
        isMandatory: false,
      },
      {
        persona: "Data & Ingestion Engineer",
        role: "roles/storage.objectViewer",
        title: "Storage Object Viewer",
        purpose: "Enables Discovery Engine service accounts to read unstructured files in Cloud Storage buckets.",
        isMandatory: false,
      },
      {
        persona: "Data & Ingestion Engineer",
        role: "roles/bigquery.dataViewer",
        title: "BigQuery Data Viewer",
        purpose: "Allows data stores to query structured BigQuery tables/views for grounding.",
        isMandatory: false,
      },
      {
        persona: "End User / Knowledge Worker",
        role: "roles/cloudaicompanion.user",
        title: "Cloud AI Companion User",
        purpose: "Permits end-users to query Gemini, interact with apps, and view grounded responses.",
        isMandatory: true,
      },
      {
        persona: "End User / Knowledge Worker",
        role: "roles/discoveryengine.viewer",
        title: "Discovery Engine Viewer",
        purpose: "Allows users to submit search queries and receive grounded citations.",
        isMandatory: true,
      },
    ],
    subtasks: [
      {
        id: "4-1-assign-admin-roles",
        title: "Grant Administrator Roles to Lead Admins",
        description:
          "Bind 'roles/cloudaicompanion.admin' and 'roles/discoveryengine.admin' to designated administrator identities.",
        consolePath: "Google Cloud Console > IAM & Admin > IAM > Grant Access",
        cliCommand:
          "gcloud projects add-iam-policy-binding gemini-enterprise-prod \\\n  --member=\"user:admin@yourcompany.com\" \\\n  --role=\"roles/cloudaicompanion.admin\"\n\ngcloud projects add-iam-policy-binding gemini-enterprise-prod \\\n  --member=\"user:admin@yourcompany.com\" \\\n  --role=\"roles/discoveryengine.admin\"",
      },
      {
        id: "4-2-assign-user-group",
        title: "Bind End-User Roles to Google Group",
        description:
          "Bind 'roles/cloudaicompanion.user' to a centralized Google Workspace or Cloud Identity group (e.g., gemini-users@yourcompany.com) rather than individual accounts.",
        cliCommand:
          "gcloud projects add-iam-policy-binding gemini-enterprise-prod \\\n  --member=\"group:gemini-users@yourcompany.com\" \\\n  --role=\"roles/cloudaicompanion.user\"",
      },
    ],
    citations: [
      {
        label: "Gemini for Google Cloud Access Control",
        url: "https://cloud.google.com/gemini/docs/access-control",
        description: "Official guide on roles/cloudaicompanion predefined roles and permissions.",
      },
      {
        label: "Agent Search & Discovery Engine Access Control",
        url: "https://cloud.google.com/generative-ai-app-builder/docs/access-control",
        description: "Predefined roles for Discovery Engine administrators, editors, and search viewers.",
      },
    ],
  },
  {
    id: "step-5-licensing",
    stepNumber: 5,
    title: "Gemini Enterprise Subscriptions & License Distribution",
    shortTitle: "Distribute Licenses",
    tagline: "Purchase tier, distribute licenses to project & region, and assign users.",
    summary:
      "Gemini Enterprise licenses (Standard or Plus) are purchased at the Billing Account level. Administrators distribute seat allocations to specific Google Cloud projects and multi-regions (US, EU, or Global), then assign users either manually or via automatic just-in-time provisioning.",
    subtasks: [
      {
        id: "5-1-choose-edition",
        title: "Select Edition: Gemini Enterprise Standard vs. Plus",
        description:
          "Choose between Standard ($30/seat/month, 30 GiB pooled indexing/user) or Plus ($30+/seat/month, 75 GiB pooled indexing/user with high-assurance governance and advanced compliance).",
        standardVsPlusNote:
          "Standard: 30 GiB/user pooled indexing, full data connectors, Agent Marketplace, priority model access. Plus: 75 GiB/user pooled indexing, enterprise-grade compliance guardrails, and premium support eligibility.",
        consolePath: "Google Cloud Console > Gemini Enterprise > Subscription",
      },
      {
        id: "5-2-distribute-to-project",
        title: "Distribute License Allocation to Project & Location",
        description:
          "In the Gemini Enterprise console, allocate licenses from your billing account pool to 'gemini-enterprise-prod' in your target multi-region (US, EU, or Global).",
        consolePath: "Google Cloud Console > Gemini Enterprise > Manage Subscriptions > Distribute Licenses",
        notes:
          "Licenses are strictly scoped to a project and a location. If your users operate across US and EU data residency zones, separate license pools must be allocated to each location.",
      },
      {
        id: "5-3-assign-users",
        title: "Configure Automatic or Manual User Assignment",
        description:
          "Choose user license assignment mode: 'Assign licenses automatically' provisions a license on first user sign-in. Alternatively, specify email addresses manually.",
        consolePath: "Google Cloud Console > Gemini Enterprise > Manage users > Assign licenses automatically",
        notes:
          "Automatic assignment prevents administrative bottleneck during enterprise rollouts. When seat pool is depleted, administrators receive alert notifications to increase allocation.",
      },
    ],
    citations: [
      {
        label: "Distribute and Assign Gemini Enterprise Licenses",
        url: "https://docs.cloud.google.com/gemini/enterprise/docs/distribute-licenses",
        description: "Official Google Cloud step-by-step documentation on distributing licenses to projects and users.",
      },
      {
        label: "Gemini Enterprise Public Pricing & Editions",
        url: "https://cloud.google.com/gemini-enterprise",
        description: "Editions comparison, starting price per seat, and feature inclusions.",
      },
      {
        label: "Gemini Enterprise Edition Details & Limits",
        url: "https://docs.cloud.google.com/gemini/enterprise/docs/editions",
        description: "Technical specifications of Business, Standard, and Plus tiers.",
      },
    ],
    commonTroubleshooting: [
      {
        issue: "'Edit turned off' banner appears on Manage Users page",
        resolution:
          "This indicates subscription settings cannot be altered directly on this view. Navigate to Billing > Subscriptions or contact your Google Account Manager if purchased via offline master order form.",
      },
    ],
  },
  {
    id: "step-6-create-app",
    stepNumber: 6,
    title: "Create Gemini Enterprise / Agent Builder App",
    shortTitle: "Create App",
    tagline: "Provision Search engines and Conversational Agents with data residency controls.",
    summary:
      "Apps are the user-facing and API-facing containers in Gemini Enterprise Agent Platform. Admins select between Search (enterprise document retrieval) or Chat (conversational AI agent) and set data residency and engine tiering.",
    subtasks: [
      {
        id: "6-1-navigate-agent-builder",
        title: "Navigate to Agent Builder / AI Applications Console",
        description:
          "Open the Agent Builder (Discovery Engine) console to start the application provisioning wizard.",
        consolePath: "Google Cloud Console > Agent Builder (or Discovery Engine) > Apps",
      },
      {
        id: "6-2-select-app-type",
        title: "Select Application Type: Search vs. Chat",
        description:
          "Select 'Search' for direct question answering, semantic search, and citation snippet extraction. Select 'Chat' for interactive multi-turn conversational agents with workflow actions.",
        consolePath: "Agent Builder > Create App > Choose Search or Chat",
      },
      {
        id: "6-3-configure-app-settings",
        title: "Configure Application Name, Enterprise Tier & Region",
        description:
          "Provide an App Name (e.g., 'Corporate-Knowledge-Assistant'), company name, and select the location (matching your license multi-region: global, us, or eu). Select Enterprise Edition.",
        notes:
          "Enterprise Edition enables advanced search tuning, third-party connectors, website search, and expanded indexing quotas.",
      },
    ],
    citations: [
      {
        label: "Create a Search App in Agent Builder",
        url: "https://cloud.google.com/generative-ai-app-builder/docs/create-engine-search",
        description: "Official guide on configuring Search applications and ranking configurations.",
      },
      {
        label: "Create a Chat App in Agent Builder",
        url: "https://cloud.google.com/generative-ai-app-builder/docs/create-engine-chat",
        description: "Step-by-step instructions for multi-turn conversational enterprise agents.",
      },
      {
        label: "Gemini Enterprise Agent Platform Rebranding Guide",
        url: "https://cloud.google.com/gemini/enterprise/docs/name-changes",
        description: "Reference guide for product transitions from Vertex AI Search to Agent Search.",
      },
    ],
  },
  {
    id: "step-7-data-stores",
    stepNumber: 7,
    title: "Create Data Stores & Ingest Enterprise Data",
    shortTitle: "Data Stores",
    tagline: "Connect Cloud Storage, BigQuery, Web Crawlers, Drive, and 3rd-Party SaaS connectors.",
    summary:
      "Data stores house the indexing schemas, vector embeddings, and access control rules for enterprise knowledge. Gemini Enterprise supports both Ingestion (caching & vector indexing) and Federation (real-time query dispatch to third-party endpoints).",
    subtasks: [
      {
        id: "7-1-gcs-data-store",
        title: "Connect Cloud Storage (Unstructured Documents)",
        description:
          "Create an unstructured data store pointing to your Cloud Storage bucket (PDF, DOCX, PPTX, HTML, TXT). Select Layout-based digital chunking to preserve tables and headings.",
        consolePath: "Agent Builder > Data Stores > Create Data Store > Cloud Storage",
        cliCommand:
          "# Ensure Discovery Engine service account has storage viewer rights\ngsutil iam ch serviceAccount:service-PROJECT_NUMBER@gcp-sa-discoveryengine.iam.gserviceaccount.com:objectViewer gs://company-docs-bucket",
      },
      {
        id: "7-2-bigquery-data-store",
        title: "Connect BigQuery (Structured Data)",
        description:
          "Import tables or views for structured data search. Configure field mappings for title, key metrics, and text content with daily or streaming sync.",
        consolePath: "Agent Builder > Data Stores > Create Data Store > BigQuery",
      },
      {
        id: "7-3-web-crawl-data-store",
        title: "Configure Website / Intranet Crawl Data Store",
        description:
          "Index corporate knowledge bases, documentation hubs, or intranets. Add root URL patterns and verify domain ownership via Google Search Console.",
        consolePath: "Agent Builder > Data Stores > Create Data Store > Website",
      },
      {
        id: "7-4-connectors-saas",
        title: "Attach Third-Party Connectors (Jira, Salesforce, Confluence, ServiceNow, Drive)",
        description:
          "Configure standard connectors. Choose between Ingestion mode (indexed for rapid retrieval) and Federated mode (real-time API search). Provide OAuth 2.0 or Service Account credentials.",
        consolePath: "Agent Builder > Connectors > Select Provider",
        standardVsPlusNote:
          "Standard and Plus editions include access to the full third-party connector ecosystem with ACL identity mapping.",
        notes:
          "When using federated search, user queries are dispatched in real-time to the third-party endpoint and are subject to that provider's privacy terms.",
      },
      {
        id: "7-5-attach-to-app",
        title: "Attach Data Stores to the Enterprise App",
        description:
          "Select the newly provisioned data stores and attach them to your Search or Chat app. Monitor the initial indexing job in the Activity panel.",
        consolePath: "Agent Builder > Apps > Select App > Data Stores > Attach Data Store",
      },
    ],
    citations: [
      {
        label: "Create a Data Store Overview",
        url: "https://cloud.google.com/generative-ai-app-builder/docs/create-data-store",
        description: "Official guide on data store types, supported MIME types, and chunking options.",
      },
      {
        label: "Connectors in Gemini Enterprise",
        url: "https://cloud.google.com/gemini/enterprise/agent-search/docs/connectors",
        description: "Complete catalog of third-party connectors, federated vs ingested search, and ACL sync.",
      },
      {
        label: "Grounding with Agent Search",
        url: "https://cloud.google.com/gemini/enterprise/agent-search/docs/grounding",
        description: "Technical instructions for grounding Gemini model responses with indexed enterprise data stores.",
      },
    ],
    commonTroubleshooting: [
      {
        issue: "Ingestion fails with 0 documents indexed from Cloud Storage",
        resolution:
          "Check Cloud Storage bucket permissions. Grant 'Storage Object Viewer' (roles/storage.objectViewer) to the automatically generated Discovery Engine service agent.",
      },
      {
        issue: "Website crawler reports domain verification required",
        resolution:
          "Verify the domain in Google Search Console using DNS TXT record, HTML tag, or Google Analytics verification.",
      },
    ],
  },
  {
    id: "step-8-verification",
    stepNumber: 8,
    title: "Grounding Verification, Audit Logs & Production Rollout",
    shortTitle: "Testing & Rollout",
    tagline: "Test citations, verify prompt protections, configure audit logs, and embed widgets.",
    summary:
      "Verify that Gemini answers are strictly grounded in your enterprise documents with interactive citation chips. Review Cloud Logging audit records and deploy the interface to end-users via web link or embedded portal widget.",
    subtasks: [
      {
        id: "8-1-preview-test-grounding",
        title: "Test In-Console Search and Chat Preview",
        description:
          "Navigate to the Preview tab in your App. Ask questions requiring proprietary internal knowledge. Verify answer accuracy, source attribution chips, and document snippet viewer.",
        consolePath: "Agent Builder > Apps > [Your App] > Preview",
      },
      {
        id: "8-2-verify-privacy-audit",
        title: "Verify Audit Logging & Enterprise Data Isolation",
        description:
          "Inspect Cloud Logging for 'cloudaicompanion.googleapis.com' and 'discoveryengine.googleapis.com'. Confirm that enterprise prompts and stored documents are protected by Google Cloud Enterprise terms.",
        consolePath: "Google Cloud Console > Logging > Logs Explorer",
        cliCommand:
          "gcloud logging read \"protoPayload.serviceName=(cloudaicompanion.googleapis.com OR discoveryengine.googleapis.com)\" \\\n  --limit=10",
      },
      {
        id: "8-3-deploy-widget",
        title: "Deploy Web UI / Intranet Integration",
        description:
          "Copy the provided Search/Chat widget HTML/JavaScript snippet or direct URL to embed the AI assistant into internal employee portals, Salesforce, ServiceNow, or corporate intranets.",
        consolePath: "Agent Builder > Apps > [Your App] > Integration > Widget",
      },
    ],
    citations: [
      {
        label: "Integrate Search Widget in Web Applications",
        url: "https://cloud.google.com/generative-ai-app-builder/docs/widget",
        description: "Instructions for embedding search and chat widgets with user authentication.",
      },
      {
        label: "Gemini Enterprise Privacy & Security Controls",
        url: "https://cloud.google.com/gemini-enterprise",
        description: "Enterprise privacy commitments: customer data is never used to train foundation models.",
      },
      {
        label: "Cloud Logging for Generative AI Apps",
        url: "https://cloud.google.com/generative-ai-app-builder/docs/audit-logging",
        description: "Configuring Cloud Audit Logs for access, data modifications, and user query compliance.",
      },
    ],
  },
];

export const workspaceBusinessSteps: OnboardingStep[] = [
  {
    id: "ws-step-1-procurement",
    stepNumber: 1,
    title: "Google Workspace Domain & Subscription Procurement",
    shortTitle: "Workspace Setup",
    tagline: "Purchase Gemini Enterprise – Business edition (up to 300 seats, 25 GiB pooled indexing) in Google Admin console.",
    summary:
      "Gemini Enterprise Business edition is an add-on or platform subscription associated directly with your Google Workspace domain. Administrators purchase seats through the Google Workspace Admin console (admin.google.com) or an authorized Google Workspace partner.",
    subtasks: [
      {
        id: "ws-1-1-verify-workspace-domain",
        title: "Verify Google Workspace Base Domain & Super Admin Access",
        description:
          "Log into admin.google.com with your Super Administrator account. Verify your Google Workspace base edition (Business Starter, Business Standard, Business Plus, or Enterprise).",
        consolePath: "Google Workspace Admin Console (admin.google.com) > Account > Domains",
        notes:
          "Domain verification is mandatory for Google Workspace services. Subscriptions cannot be attached to unverified personal Google accounts.",
      },
      {
        id: "ws-1-2-purchase-subscription",
        title: "Procure Gemini Enterprise – Business Edition",
        description:
          "Navigate to Billing > Subscriptions > Add or upgrade a subscription. Select 'Gemini Enterprise – Business edition' ($21/seat/month). Choose your seat count (between 1 and 300 seats).",
        consolePath: "Admin console > Billing > Subscriptions > Add or upgrade a subscription",
        standardVsPlusNote:
          "Business Edition stays in the Google Workspace Admin console and is capped at 300 seats with 25 GiB pooled storage and indexing per user. If you later need >300 seats or stricter cloud governance, review Standard or Plus as an upgrade path without changing the core Workspace provisioning flow.",
      },
      {
        id: "ws-1-3-check-pooled-quotas",
        title: "Review Team Pooled Quotas (25 GiB per Paid Seat)",
        description:
          "Review pooled team allowances. Total indexing storage and daily content generation queries are pooled across all purchased seats (e.g., 50 seats = 1,250 GiB pooled indexing).",
        consolePath: "Admin console > Billing > Subscriptions > Gemini Enterprise – Business",
      },
    ],
    citations: [
      {
        label: "Purchase Gemini for Google Workspace Subscriptions",
        url: "https://support.google.com/a/answer/13623623",
        description: "Official Google Workspace administrator guide for purchasing add-on subscriptions.",
      },
      {
        label: "Gemini Enterprise Public Pricing & Editions",
        url: "https://cloud.google.com/gemini-enterprise",
        description: "Public pricing table, $21/seat/mo starting tier, and 300 seat limit specifications.",
      },
    ],
    commonTroubleshooting: [
      {
        issue: "Subscription is not visible under 'Add or upgrade a subscription'",
        resolution:
          "If your Google Workspace domain is managed by a Google Cloud / Workspace Partner or reseller, contact your reseller to add Gemini Enterprise Business licenses to your contract.",
      },
      {
        issue: "Cannot exceed 300 seats",
        resolution:
          "The Business edition has a hard cap of 300 seats. For organizations requiring 301+ seats, upgrade to Gemini Enterprise Standard or Plus.",
      },
    ],
  },
  {
    id: "ws-step-2-service-status",
    stepNumber: 2,
    title: "Configure Generative AI Service Status & OU Scoping",
    shortTitle: "Service Status",
    tagline: "Turn Service Status to ON for the domain, specific Organizational Units (OUs), or Access Groups.",
    summary:
      "All Gemini Enterprise settings in Google Workspace are centralized under 'Generative AI'. Even after assigning a license, Gemini features remain inactive until the administrator explicitly turns the Service Status to ON for the target Organizational Unit (OU) or group.",
    subtasks: [
      {
        id: "ws-2-1-navigate-genai-menu",
        title: "Access the Centralized Generative AI Menu",
        description:
          "In the Google Workspace Admin console, navigate to Generative AI > Gemini Enterprise. Google centralizes all generative AI controls and prompt settings here.",
        consolePath: "Google Admin Console > Generative AI > Gemini Enterprise",
        notes:
          "In older console versions, this was under Apps > Additional Google services > Gemini. It is now unified under Generative AI.",
      },
      {
        id: "ws-2-2-select-ou-scope",
        title: "Select Scoping: Entire Domain vs. Pilot Organizational Unit",
        description:
          "Choose your rollout scope in the left Organizational Units tree: select the root domain to enable for all licensed users, or select a sub-OU (e.g. /Pilot, /Sales, /Marketing) for a phased deployment.",
        consolePath: "Admin console > Generative AI > Gemini Enterprise > Organizational Units",
      },
      {
        id: "ws-2-3-enable-service-status",
        title: "Set Service Status to 'ON'",
        description:
          "Set the Service Status to 'ON for everyone' in the selected OU and click 'Save'. Changes typically propagate across Workspace within minutes.",
        consolePath: "Admin console > Generative AI > Gemini Enterprise > Service status > ON",
      },
    ],
    citations: [
      {
        label: "Turn Gemini On or Off for Users",
        url: "https://support.google.com/a/answer/13623624",
        description: "Official guide on configuring service status across organizational units and access groups.",
      },
      {
        label: "Centralized Generative AI Settings in Admin Console",
        url: "https://support.google.com/a/answer/14089851",
        description: "Reference guide for managing generative AI policies and tenant controls.",
      },
    ],
    commonTroubleshooting: [
      {
        issue: "Users with licenses cannot see the Gemini side panel in Docs or Gmail",
        resolution:
          "Verify that the user's specific Organizational Unit has Service Status set to ON. Also verify that their Workspace language is set to a supported language (English US recommended for newest features).",
      },
    ],
  },
  {
    id: "ws-step-3-assign-licenses",
    stepNumber: 3,
    title: "Distribute & Assign Licenses to Users",
    shortTitle: "Assign Licenses",
    tagline: "Assign seats via Google Admin directory, bulk CSV upload, or OU auto-assignment.",
    summary:
      "Unlike Google Cloud Console project-level allocation, Google Workspace licenses are assigned directly to user identities in the Workspace directory. Admins can assign licenses individually, upload a batch CSV, or automate assignment by department/OU.",
    subtasks: [
      {
        id: "ws-3-1-individual-assignment",
        title: "Assign Licenses Individually via Directory > Users",
        description:
          "Navigate to Directory > Users. Click on the target user, scroll to the 'Licenses' section, toggle 'Gemini Enterprise – Business edition' to ON, and save.",
        consolePath: "Admin console > Directory > Users > [User Name] > Licenses",
      },
      {
        id: "ws-3-2-bulk-csv-assignment",
        title: "Bulk License Assignment via CSV File",
        description:
          "For larger teams, click 'Bulk update users' in Directory > Users. Download the CSV template, set the Gemini Enterprise license column to 'TRUE' for eligible email addresses, and upload.",
        consolePath: "Admin console > Directory > Users > Bulk update users > Upload CSV",
      },
      {
        id: "ws-3-3-auto-assign-ou",
        title: "Configure Automatic License Provisioning by OU",
        description:
          "In Billing > Subscriptions > Gemini Enterprise – Business, enable 'Auto-assign licenses' for specific OUs so new employees joining the department receive a license automatically.",
        consolePath: "Admin console > Billing > Subscriptions > Auto-assign rules",
      },
    ],
    citations: [
      {
        label: "Assign Gemini Licenses to Users",
        url: "https://support.google.com/a/answer/13623625",
        description: "Official step-by-step instructions for assigning add-on licenses in Google Workspace.",
      },
      {
        label: "Auto-assign Licenses by Organizational Unit",
        url: "https://support.google.com/a/answer/6211843",
        description: "Configuring automated license assignment rules for Google Workspace add-ons.",
      },
    ],
  },
  {
    id: "ws-step-4-apps-notebooklm",
    stepNumber: 4,
    title: "Core Workspace Apps & Gemini Notebook Integration",
    shortTitle: "Apps & Notebook",
    tagline: "Activate Gemini across Gmail, Docs, Sheets, Meet, Drive, and configure Gemini Notebook.",
    summary:
      "Gemini Enterprise Business seamlessly integrates into daily Workspace workflows. Users gain generative writing, summarization, and data structuring across Docs, Sheets, and Gmail, alongside Gemini Notebook for grounded research.",
    subtasks: [
      {
        id: "ws-4-1-verify-workspace-apps",
        title: "Verify Gemini Assistance in Gmail, Docs, Sheets & Meet",
        description:
          "Confirm 'Help me write' appears in Gmail and Docs, 'Help me organize' is enabled in Google Sheets, and studio lighting/sound is accessible in Google Meet.",
        consolePath: "Google Workspace Apps (mail.google.com, docs.google.com, sheets.google.com)",
      },
      {
        id: "ws-4-2-configure-gemini-notebook",
        title: "Set Up Gemini Notebook for Source-Grounded Workspaces",
        description:
          "Verify user access to Gemini Notebook. Users can create secure, source-backed notebooks, upload corporate PDFs and briefs, and generate synthesis with exact source citations.",
        consolePath: "Gemini Notebook (notebooklm.google.com or admin console > Generative AI)",
        notes:
          "Gemini Notebook provides enterprise data protections: uploaded notes and sources remain private to the user's Workspace tenant.",
      },
      {
        id: "ws-4-3-drive-docs-permissions",
        title: "Review Drive & Docs Sharing and Export Controls",
        description:
          "Ensure that Google Drive external sharing policies align with enterprise requirements. Gemini respects all existing file permissions and folder-level access control lists (ACLs).",
        consolePath: "Admin console > Apps > Google Workspace > Drive and Docs > Sharing settings",
      },
    ],
    citations: [
      {
        label: "Gemini Features in Google Workspace",
        url: "https://support.google.com/a/answer/13623626",
        description: "Complete list of generative AI capabilities across Gmail, Docs, Sheets, and Meet.",
      },
      {
        label: "Gemini Notebook for Teams",
        url: "https://support.google.com/a/answer/14138120",
        description: "Using Gemini Notebook for team knowledge synthesis with enterprise privacy controls.",
      },
    ],
  },
  {
    id: "ws-step-5-connectors",
    stepNumber: 5,
    title: "Connect Segment-Relevant Data Sources",
    shortTitle: "Data Connectors",
    tagline: "Connect Google Workspace Drive, Microsoft 365, Jira, GitHub, and Slack.",
    summary:
      "Gemini Enterprise Business includes access to segment-relevant data connectors. Admins can ground AI interactions in Google Drive files as well as external repositories like Jira, Slack, and Microsoft 365 without complex infrastructure setup.",
    subtasks: [
      {
        id: "ws-5-1-native-workspace-grounding",
        title: "Validate Native Google Workspace Grounding",
        description:
          "Google Workspace files (Docs, Sheets, Slides, Drive PDFs) are automatically groundable by users with permission. Test that search respects user-level permissions.",
        consolePath: "Gemini App / Side Panel > @Drive search",
      },
      {
        id: "ws-5-2-configure-segment-connectors",
        title: "Configure Third-Party Connectors (Jira, GitHub, Slack, M365)",
        description:
          "In the Gemini Enterprise admin panel, configure segment connectors for Jira issues, GitHub pull requests, Slack channels, or Microsoft 365 documents.",
        consolePath: "Admin console > Generative AI > Connectors",
        notes:
          "Connectors in Business edition require no custom VPC or cloud firewall rules—they authenticate securely via OAuth 2.0 or service credentials.",
      },
    ],
    citations: [
      {
        label: "Gemini Enterprise Connectors",
        url: "https://cloud.google.com/gemini/enterprise/agent-search/docs/connectors",
        description: "Official guide on connectors, data ingestion, and search federation.",
      },
    ],
  },
  {
    id: "ws-step-6-governance-upgrade",
    stepNumber: 6,
    title: "Data Governance, Audit Logs & Escalation to Standard/Plus",
    shortTitle: "Governance & Scale",
    tagline: "Enforce data protection, review Admin Audit Logs, and plan the upgrade path for >300 seats.",
    summary:
      "Ensure adherence to enterprise privacy standards: prompts and Workspace data are never used to train foundation models. Monitor usage in Admin Audit Logs and understand the migration path to Standard/Plus when scaling.",
    subtasks: [
      {
        id: "ws-6-1-verify-privacy-commitments",
        title: "Confirm Enterprise Privacy & Zero Model Training Guarantees",
        description:
          "Review Google Workspace's contractual privacy protections: your company's data, customer emails, documents, and Gemini prompts are never used to train foundation models.",
        consolePath: "Google Workspace Data Protection Terms & Compliance Center",
      },
      {
        id: "ws-6-2-review-admin-audit-logs",
        title: "Monitor License & Service Activity in Audit Logs",
        description:
          "Navigate to Reporting > Audit and investigation > Admin log events to track license assignments, service status toggles, and administrative configuration changes.",
        consolePath: "Admin console > Reporting > Audit and investigation > Admin log events",
      },
      {
        id: "ws-6-3-evaluate-upgrade-triggers",
        title: "Evaluate Triggers for Upgrading to Standard or Plus",
        description:
          "If your organization exceeds 300 seats, requires >25 GiB pooled indexing, or needs Google Cloud infrastructure controls (VPC Service Controls, CMEK, custom fine-tuning), plan the transition to Gemini Enterprise Standard or Plus. Business onboarding remains Admin-console based; the Cloud tier only applies when you need the enhanced Google Cloud governance layer.",
        consolePath: "Google Cloud Console (console.cloud.google.com/gemini) for Standard/Plus only",
        standardVsPlusNote:
          "Standard ($30/seat/mo, 30 GiB pooled) and Plus (75 GiB pooled) unlock unlimited seats, Agent Marketplace, and Google Cloud project-level governance for organizations that outgrow the Business Workspace model.",
      },
    ],
    citations: [
      {
        label: "Google Workspace Gemini Privacy and Data Protection",
        url: "https://workspace.google.com/terms/dpa_terms.html",
        description: "Official contractual privacy guarantees, SOC 2/3, ISO 27001, and HIPAA compliance.",
      },
      {
        label: "Google Workspace Admin Audit Logs",
        url: "https://support.google.com/a/answer/45795",
        description: "Tracking administrative events, license modifications, and security policies.",
      },
      {
        label: "Gemini Enterprise Edition Details & Comparison",
        url: "https://docs.cloud.google.com/gemini/enterprise/docs/editions",
        description: "Comparison matrix between Business, Standard, and Plus editions.",
      },
    ],
  },
];

