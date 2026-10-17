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
          "Choose between Standard ($30/seat/month, 30 GiB pooled indexing/user) or Plus ($50/seat/month, 75 GiB pooled indexing/user with high-assurance governance and advanced compliance). Confirm current regional and contract pricing with Google Cloud.",
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
    id: "business-step-1-signup",
    stepNumber: 1,
    title: "Identify your Gemini Enterprise Business signup route",
    shortTitle: "Choose signup route",
    tagline: "Direct signup and sales/partner provisioning use different admin paths.",
    summary:
      "Gemini Enterprise Business edition is a Gemini Enterprise app product. It is not the same as Google Workspace Business Starter, Standard, Plus, or Workspace Studio. First check whether the team signed up directly or through Google sales/a Cloud partner; the available billing and admin workflow depends on that route.",
    subtasks: [
      {
        id: "business-1-1-check-signup-route",
        title: "Check the team signup route",
        description:
          "Open the Gemini Enterprise Business team settings page and select Team. If you see team administration there, the team signed up directly. If you are redirected to Google Admin Console Users, the organization signed up through Google sales or a Cloud partner.",
        consolePath: "https://business.gemini.google > Team",
        notes:
          "The Google Admin Console purchase and license steps apply only to the sales/partner signup route. Direct signup follows the Gemini Business team setup flow.",
      },
      {
        id: "business-1-2-confirm-edition",
        title: "Confirm edition and current subscription terms",
        description:
          "Gemini Enterprise Business currently lists 25 GiB pooled storage and data indexing per user. Confirm seat count, current price, contract, eligibility, and the included feature set with the current Google edition page or your seller before planning rollout.",
        consolePath: "Google Cloud documentation > Gemini Enterprise > Compare editions",
      },
    ],
    citations: [
      {
        label: "Google: Add and set up Gemini Enterprise Business (sales/partner route)",
        url: "https://knowledge.workspace.google.com/admin/generative-ai/gemini-enterprise/add-and-set-up-gemini-enterprise-business-edition",
        description: "Explains which signup route uses Admin Console and how to identify direct signup.",
      },
      {
        label: "Google: Compare Gemini Enterprise editions",
        url: "https://docs.cloud.google.com/gemini/enterprise/docs/editions",
        description: "Current edition feature and pooled storage comparison.",
      },
    ],
  },
  {
    id: "business-step-2-access",
    stepNumber: 2,
    title: "Enable the service and assign users",
    shortTitle: "Users & licenses",
    tagline: "Set up access using the route your organization actually purchased.",
    summary:
      "For a Google sales/partner subscription, a Workspace administrator turns the service on and assigns Gemini Enterprise Business licenses in Admin Console. For a direct signup, manage the team in Gemini Enterprise Business team settings. Do not apply one route's instructions to the other.",
    subtasks: [
      {
        id: "business-2-1-admin-setup",
        title: "Complete route-specific service and license setup",
        description:
          "Sales/partner route: follow Google’s add-and-set-up guide to enable the service and assign licenses; assign at least one license to the administrator who initializes the team. Direct route: follow the direct-signup onboarding and manage your team from its Business edition admin settings.",
        consolePath: "Admin console (sales/partner only) or business.gemini.google (direct signup)",
        notes:
          "Google says a Business edition organization cannot purchase this edition if it already has a different Gemini Enterprise plan. Check with your administrator if the subscription option is unavailable.",
      },
      {
        id: "business-2-2-initialize-team",
        title: "Initialize the Business edition workspace",
        description:
          "For the sales/partner route, the assigned admin must sign in to business.gemini.google once to initialize the environment. For direct signups, use the team setup steps shown in the product.",
        consolePath: "https://business.gemini.google",
      },
    ],
    citations: [
      {
        label: "Google: Add and set up Gemini Enterprise Business",
        url: "https://knowledge.workspace.google.com/admin/generative-ai/gemini-enterprise/add-and-set-up-gemini-enterprise-business-edition",
        description: "Admin Console enablement, license assignment, and environment initialization for the sales/partner route.",
      },
      {
        label: "Google: Get started with Gemini Enterprise Business",
        url: "https://support.google.com/g/answer/16539553?hl=en",
        description: "Direct signup and team onboarding help center.",
      },
    ],
  },
  {
    id: "business-step-3-data",
    stepNumber: 3,
    title: "Connect only the data and tools the team needs",
    shortTitle: "Connect data",
    tagline: "Configure approved sources before creating an agent that depends on them.",
    summary:
      "Business edition agents can use connectors and files that the team has enabled. Connector availability, authorization, supported actions, and data access vary. Verify a source is available in your tenant and connect it before building an agent around it.",
    subtasks: [
      {
        id: "business-3-1-choose-source",
        title: "Select approved sources and authorize them",
        description:
          "An administrator should approve the connector and its access scope. Complete the connector sign-in/authorization, test retrieval, and use the narrowest practical source scope. Review attached files and connected sources before sharing an agent.",
        consolePath: "Gemini Enterprise Business > Admin settings / Connect apps and third-party data",
        notes:
          "Sharing a Business edition agent also gives recipients a way to query its associated data sources and uploaded files through the agent. Review access before sharing.",
      },
    ],
    citations: [
      {
        label: "Google: Connect apps and third-party data for Gemini Business",
        url: "https://support.google.com/g/answer/16550932?hl=en",
        description: "Business edition connector setup and data source authorization.",
      },
      {
        label: "Workspace Gemini connector catalogue",
        url: "/enterprise/connectors",
        description: "Our sourced catalogue and notes about edition, preview, and connector setup differences.",
      },
    ],
  },
  {
    id: "business-step-4-agent",
    stepNumber: 4,
    title: "Create and test a no-code agent in Agent Designer",
    shortTitle: "Build an agent",
    tagline: "Build inside the Gemini Enterprise Business app—not in Workspace Studio or Cloud Console.",
    summary:
      "The current Business edition help names the builder Agent Designer. Start with an agent prompt, choose the connected data, preview the result, inspect its instructions and tool access, and publish only after testing. The UI can differ as Google rolls out builder updates.",
    subtasks: [
      {
        id: "business-4-1-create-chat-agent",
        title: "Create a first agent from a specific prompt",
        description:
          "Sign in at business.gemini.google > Agents > Create agent. Open Manage your data and select the approved sources. Describe the job, users, output, data boundaries, and what to do when information is missing. Submit, preview, and select Create to publish.",
        consolePath: "Gemini Enterprise Business app > Agents > Create agent",
      },
      {
        id: "business-4-2-build-multi-step",
        title: "Add flow logic only when the task needs it",
        description:
          "Select Proceed to Builder to configure the agent’s name, description, instructions, model, data/tools, knowledge files, and starter prompts. Add subagents, connectors, and schedule settings deliberately. Preview representative good, ambiguous, missing-data, and denied-access cases before selecting Create.",
        consolePath: "Agent Designer > Flow / Preview / Schedule",
      },
    ],
    citations: [
      {
        label: "Google: Create and manage Business edition agents",
        url: "https://support.google.com/g/answer/16540723?hl=en",
        description: "Current Agent Designer path, configuration fields, testing, sharing, schedules, and prompt-writing guidance.",
      },
      {
        label: "Google: Manage Business edition agents as an administrator",
        url: "https://support.google.com/g/answer/17571220?hl=en",
        description: "Admin review, permissions, preview, enable/disable, suspend, and delete workflows.",
      },
    ],
  },
  {
    id: "business-step-5-governance",
    stepNumber: 5,
    title: "Review sharing, schedules, and operating ownership",
    shortTitle: "Govern & operate",
    tagline: "Set ownership and access controls before agents become team dependencies.",
    summary:
      "Decide who can use each agent, who maintains its connectors and instructions, and how scheduled runs are checked. For Business edition schedules, user credentials expire every 14 days and need refresh; actions involving other people pause for review and approval according to the current Business help documentation.",
    subtasks: [
      {
        id: "business-5-1-share-safely",
        title: "Share only after checking attached data access",
        description:
          "Review the agent’s connected sources and uploaded knowledge files before sharing with users. Recipients can ask the agent about these associated sources, even if they cannot open the original source directly. An administrator can review agents under the team’s Manage team > Agents page.",
        consolePath: "Gemini Enterprise Business > Agents; admin: Team > Manage team > Agents",
      },
      {
        id: "business-5-2-test-and-maintain-schedules",
        title: "Test scheduled runs and refresh credentials",
        description:
          "Run a schedule in preview first. Confirm who receives or is affected by its actions. Refresh schedule credentials at least every 14 days and review failures after connector, permission, or prompt changes.",
        consolePath: "Agent Designer > Schedule; Agents > Refresh existing schedules",
      },
    ],
    citations: [
      {
        label: "Google: Create and manage Business edition agents",
        url: "https://support.google.com/g/answer/16540723?hl=en",
        description: "Business edition sharing, approvals, scheduling limits, and credential refresh instructions.",
      },
      {
        label: "Google: Manage Business edition agents as an administrator",
        url: "https://support.google.com/g/answer/17571220?hl=en",
        description: "Administrative review and response controls for published agents.",
      },
    ],
  },
];
