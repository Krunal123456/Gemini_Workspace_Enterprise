import { Article } from "@/types";

const editor = {
  name: "Independent Product Research",
  role: "Product research",
  company: "Independent reference",
};

export const articles: Article[] = [
  {
    slug: "gemini-enterprise-deployment-checklist",
    title: "Gemini Enterprise Deployment Checklist: Plan a Governed Pilot",
    subtitle:
      "A practical administrator guide to edition fit, project setup, IAM, data access, quotas, safety controls, and pilot evaluation.",
    excerpt:
      "Use this source-led Gemini Enterprise deployment checklist to prepare a pilot, confirm access and licensing, connect and authorize data stores, understand pooled quotas, and test search quality before rollout.",
    date: "2026-10-16",
    readTime: "8 min read",
    category: "Enterprise AI",
    author: editor,
    keyTakeaways: [
      "Confirm which edition and documentation set applies before planning; Google documents Business separately from the Cloud editions.",
      "Plan the Cloud project, billing path, app location, and any CMEK requirement before creating the app because its location cannot later be changed.",
      "Treat IAM roles, product licenses, app access, and data-store authorization as separate checks in the pilot.",
      "Feature quotas are generally pooled within edition, project, and location; storage and data-indexing quota is shared across editions in that project and location.",
      "Use representative sample queries and verify results with intended users; Google's built-in search-quality evaluation does not support apps with multiple data stores.",
    ],
    content: [
      "A successful Gemini Enterprise rollout starts with a narrow, testable workflow and the right access boundaries, not with connecting every available source. The checklist below turns Google's current administrator documentation into a pilot sequence. Confirm the latest edition, regional, and billing requirements for your organization before procurement or production rollout. [1] [2]",
      "### 1. Confirm the edition and pilot scope",
      "Write down the user group, the task the pilot should improve, the data sources required, and how the team will judge a useful result. Check the edition comparison for the Cloud editions in scope. Google notes that Business edition documentation is maintained separately, so do not assume every Cloud-edition setup instruction applies to Business. [2]",
      "Keep the first pilot small enough to test permission behavior and answer quality with representative users. Select a few recurring questions and identify the source documents that should support each answer. This gives administrators a concrete basis for testing retrieval instead of relying on a generic demo prompt.",
      "### 2. Prepare the project, billing, region, and encryption",
      "Create or select the Google Cloud project that will hold the app and data stores, then verify the billing and subscription path for the edition you plan to use. Pay-as-you-go has separate billing requirements and usage charges; check its current terms before enabling it. [1] [3]",
      "Choose the app's multi-region with your data-residency requirements in mind. Google's app-creation guide says the app location cannot be changed after creation. If the app will use customer-managed encryption keys, register the key before creating the app; apps created before key registration are not protected by that key. [4]",
      "### 3. Separate administrator access, user roles, and licenses",
      "Grant administrators only the roles needed for their work. Google's IAM guide distinguishes the Gemini Enterprise Admin role from roles used to manage connectors and billing-related license distribution. End users also need the appropriate Gemini Enterprise role and a product license. [5]",
      "Decide whether users should access every app in the project or only selected apps. For app-specific access, Google's guide describes using the Restricted User role at project level and granting the User role on each permitted app; the restricted role alone does not grant app access. Test the intended combination with a pilot account before inviting a broader group. [5]",
      "### 4. Connect sources and verify authorization",
      "Create the app and data stores using the supported connector workflow, then connect the required data stores to the app. Connecting a data store is not the same as authorizing user access: Google's guide requires authorization for the connected store, and describes the user authorization step in the app. Validate this step with the identity and groups that will use the pilot. [4] [6]",
      "Test both expected access and expected denial. Ask a pilot user a question whose answer is in an allowed source, then test a similar question against content that user should not be able to access. Review the returned sources and citations rather than judging the answer text alone.",
      "### 5. Model quotas and overage exposure",
      "For license-based editions, feature quotas are generally pooled among users of the same edition within a project and location. Storage and data-indexing capacity is a separate shared pool across all users and editions in that project and location. Model expected usage against both pools, and monitor them during the pilot. [3]",
      "Pay-as-you-go has no feature quota limits but charges for usage. License-based editions can have overage options with their own billing eligibility and settings. Check the current quota and billing documentation for the specific subscription rather than copying a limit from another edition or an older article. [3]",
      "### 6. Configure safety controls deliberately",
      "Model Armor is an optional, administrator-configured control for screening assistant prompts and responses; it is not enabled merely by purchasing an edition. Google says it can add latency and does not remove or mask personally identifiable information. Choose the enforcement and service-failure behavior intentionally, then test allowed and blocked requests in the pilot. [7]",
      "### 7. Evaluate the pilot before expanding it",
      "Keep a repeatable set of representative queries and expected source documents. Google's search-quality evaluation can report aggregate and query-level metrics such as recall, precision, and NDCG, and can help compare configuration changes over time. The documented evaluation method does not support apps with multiple data stores, so use its supported scope and add hands-on checks for the rest of your workflow. [8]",
      "Before rollout, record what passed, what failed, which access cases were tested, observed quota use, and who owns follow-up. Recheck the edition matrix, billing terms, source authorization, and safety configuration when the pilot scope changes; product documentation and availability can change.",
    ],
    sources: [
      { title: "Set up Gemini Enterprise as an administrator", url: "https://docs.cloud.google.com/gemini/enterprise/docs/before-you-begin" },
      { title: "Compare editions of Gemini Enterprise", url: "https://docs.cloud.google.com/gemini/enterprise/docs/editions" },
      { title: "Quotas and overages", url: "https://docs.cloud.google.com/gemini/enterprise/docs/quotas-and-overages" },
      { title: "Create an app", url: "https://docs.cloud.google.com/gemini/enterprise/docs/create-app" },
      { title: "IAM roles and permissions", url: "https://docs.cloud.google.com/gemini/enterprise/docs/access-control" },
      { title: "Connect a data store to an app and authorize Gemini Enterprise", url: "https://docs.cloud.google.com/gemini/enterprise/docs/connectors/connect-existing-data-store" },
      { title: "Enable Model Armor in Gemini Enterprise", url: "https://docs.cloud.google.com/gemini/enterprise/docs/enable-model-armor" },
      { title: "Evaluate search quality", url: "https://docs.cloud.google.com/gemini/enterprise/docs/evaluate-search-quality" },
    ],
    relatedFeatures: [
      "gemini-connectors",
      "gemini-enterprise-platform-agents",
      "security-model-armor",
    ],
    relatedArticles: [
      "gemini-enterprise-pricing",
      "gemini-workspace-vs-gemini-enterprise",
      "what-is-gemini-enterprise",
    ],
  },
  {
    "slug": "gemini-api-models",
    "title": "Gemini API Models: Current Model IDs, Limits, and Pricing",
    "subtitle": "Use Google’s live Gemini API catalog and pricing to verify model IDs, lifecycle status, token limits, and current rates.",
    "excerpt": "Check Google’s live catalog for current model IDs, lifecycle status, and token limits. Review pricing before estimating API costs.",
    "date": "2026-10-18",
    "readTime": "7 min read",
    "category": "Gemini",
    "author": {
      "name": "Independent Product Research",
      "role": "Editorial research",
      "company": "Independent reference"
    },
    "keyTakeaways": [
      "Gemini API model IDs and lifecycle status are version-specific; copy the exact ID from Google’s current model catalog.",
      "The currently listed Gemini 4 Argon and Gemini 3.8 Flash models each document a 1,048,576-token context limit, but output limits and supported features differ.",
      "Google publishes introductory API prices with effective dates. Model API rates are not Google Workspace subscription prices."
    ],
    "content": [
      "Google’s Gemini API catalog changes as models launch, move from preview to general availability, or reach end of life. Use the exact model ID and status from Google’s catalog when building an integration; a family name alone is not enough to identify a production endpoint. The Gemini API is a developer product and is separate from Gemini features bundled with Google Workspace subscriptions. [1]",
      "### Current model examples",
      "Google’s catalog currently lists Gemini 4 Argon (`gemini-4-argon`) and Gemini 3.8 Flash (`gemini-3.8-flash`) as generally available. Gemini 3.7 Flash and Gemini 3.6 Flash are also listed as stable, while Gemini 3.1 Pro is in preview. Check the catalog before relying on these statuses because they can change. [1]",
      "### Context and output limits",
      "The Gemini 4 Argon and Gemini 3.8 Flash model pages each document a 1,048,576-token context limit. That figure does not mean every request can produce the same amount of output: model, endpoint, decode mode, and other request constraints affect output limits. Gemini 4 Argon’s page separately describes standard synchronous output and long-decode limits. Check the model-specific page and API behavior for your use case. [3] [4]",
      "### Published API pricing snapshot",
      "As of October 18, 2026, Google’s pricing page lists introductory standard-tier rates of $2 per million input tokens and $10 per million output tokens for Gemini 4 Argon through November 30, 2026. It lists $0.75 per million input tokens and $3.75 per million output tokens for Gemini 3.8 Flash through December 31, 2026. These dated rates can depend on tier, tools, and token type; revisit the live pricing page when budgeting. [2]",
      "### A practical selection checklist",
      "Choose a stable model when lifecycle predictability matters. Compare quality on representative prompts, latency in your deployment, maximum input and output needs, and total cost for your actual token mix. Pin the exact model ID, record the date and pricing assumptions, monitor usage, and plan a migration path for preview or retiring models. [1] [2]",
      "### Keep API models separate from Workspace plans",
      "Gemini API model IDs and token prices describe developer API usage. They do not identify which Gemini features are included in Business or Enterprise Workspace subscriptions. For plan eligibility, use Google Workspace’s current pricing and edition documentation rather than extrapolating from the API catalog."
    ],
    "sources": [
      {
        "title": "Gemini API models",
        "url": "https://ai.google.dev/gemini-api/docs/models"
      },
      {
        "title": "Gemini API pricing",
        "url": "https://ai.google.dev/gemini-api/docs/pricing"
      },
      {
        "title": "Gemini 4 Argon model details",
        "url": "https://ai.google.dev/gemini-api/docs/models/gemini-4-argon"
      },
      {
        "title": "Gemini 3.8 Flash model details",
        "url": "https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash"
      }
    ]
  },
  {
    "slug": "gemini-deep-research-workspace",
    "title": "Gemini Deep Research: What It Does and What to Verify",
    "subtitle": "A source-led look at Google’s announced Workspace research workflows, selected sources, and rollout caveats.",
    "excerpt": "Google describes multi-step Gemini workflows across Workspace apps, using sources selected by the user or enabled by an administrator. Verify feature availability in your account.",
    "date": "2026-10-18",
    "readTime": "4 min read",
    "category": "Enterprise AI",
    "author": {
      "name": "Independent Product Research",
      "role": "Editorial research",
      "company": "Independent reference"
    },
    "keyTakeaways": [
      "Google describes multi-step Gemini workflows across Workspace apps, using sources selected by the user or enabled by an administrator. Verify feature availability in your account.",
      "Confirm the current feature scope and availability in Google’s documentation and your account."
    ],
    "content": [
      "Google describes multi-step Gemini workflows across Workspace apps, using sources selected by the user or enabled by an administrator. Verify feature availability in your account. [1]",
      "### What to verify",
      "Read the current primary documentation, confirm availability and configuration in your own account, and review generated output against original sources. Product details and rollout can change."
    ],
    "sources": [
      {
        "title": "Google Workspace agentic capabilities announcement",
        "url": "https://workspace.google.com/blog/product-announcements/less-switching-more-flow-5-new-agentic-capabilities-across-google-workspace-apps"
      }
    ]
  },
  {
    "slug": "notebooklm-sources-audio-overviews",
    "title": "NotebookLM for Work: Sources, Audio Overviews, and Verification",
    "subtitle": "How to use NotebookLM source-based workflows while checking important claims against original material.",
    "excerpt": "NotebookLM can help explore supplied sources and create Audio Overviews. Citations support verification but do not guarantee error-free answers.",
    "date": "2026-10-18",
    "readTime": "4 min read",
    "category": "Gemini",
    "author": {
      "name": "Independent Product Research",
      "role": "Editorial research",
      "company": "Independent reference"
    },
    "keyTakeaways": [
      "NotebookLM can help explore supplied sources and create Audio Overviews. Citations support verification but do not guarantee error-free answers.",
      "Confirm the current feature scope and availability in Google’s documentation and your account."
    ],
    "content": [
      "NotebookLM can help explore supplied sources and create Audio Overviews. Citations support verification but do not guarantee error-free answers. [1] [2]",
      "### What to verify",
      "Read the current primary documentation, confirm availability and configuration in your own account, and review generated output against original sources. Product details and rollout can change."
    ],
    "sources": [
      {
        "title": "NotebookLM",
        "url": "https://notebooklm.google.com/"
      },
      {
        "title": "Google Workspace AI privacy and security",
        "url": "https://workspace.google.com/security/ai-privacy/"
      }
    ]
  },
  {
    "slug": "gemini-enterprise-custom-mcp-servers",
    "title": "Custom MCP Servers in Gemini Enterprise: Setup Requirements",
    "subtitle": "Review Google’s documented transport, TLS, authentication, and action limits before connecting a custom MCP server.",
    "excerpt": "Google documents custom MCP server connections for Gemini Enterprise. The current setup guide specifies Streamable HTTP, publicly trusted TLS, and up to 100 actions per server.",
    "date": "2026-10-18",
    "readTime": "4 min read",
    "category": "Enterprise AI",
    "author": {
      "name": "Independent Product Research",
      "role": "Editorial research",
      "company": "Independent reference"
    },
    "keyTakeaways": [
      "Google documents custom MCP server connections for Gemini Enterprise. The current setup guide specifies Streamable HTTP, publicly trusted TLS, and up to 100 actions per server.",
      "Confirm the current feature scope and availability in Google’s documentation and your account."
    ],
    "content": [
      "Google documents custom MCP server connections for Gemini Enterprise. The current setup guide specifies Streamable HTTP, publicly trusted TLS, and up to 100 actions per server. [1]",
      "### What to verify",
      "Read the current primary documentation, confirm availability and configuration in your own account, and review generated output against original sources. Product details and rollout can change."
    ],
    "sources": [
      {
        "title": "Google custom MCP server setup guide",
        "url": "https://docs.cloud.google.com/gemini/enterprise/docs/connectors/custom-mcp-server/set-up-custom-mcp-server"
      }
    ]
  },
  {
    slug: "gemini-workspace-vs-gemini-enterprise",
    title: "Gemini in Workspace vs Gemini Enterprise: A practical comparison",
    subtitle: "Understand where the two products work, how they connect to data, and what to verify before choosing a deployment.",
    excerpt: "Compare Gemini capabilities in Google Workspace with the separate Gemini Enterprise app, including cross-app workflows, connectors, privacy commitments, and rollout checks.",
    date: "2026-09-28",
    readTime: "7 min read",
    category: "Comparisons",
    author: editor,
    keyTakeaways: [
      "Gemini in Workspace brings AI into tools such as Gmail, Drive, Docs, Sheets, and Slides; capabilities and rollout can vary by Workspace plan.",
      "Gemini Enterprise is a separate Google Cloud service with edition-based enterprise search, connectors, agents, and quotas.",
      "Some new Workspace agentic workflows announced in September 2026 are rolling out to specified plans; availability can differ by account.",
      "Google's Workspace privacy commitments and Gemini Enterprise controls apply to their respective products; review the terms and settings for each service.",
    ],
    content: [
      "The two offerings can work together, but they address different parts of an organization's AI setup. Gemini in Workspace is embedded in productivity apps. Gemini Enterprise is a separate service for enterprise search and agent workflows across configured data sources. [1] [2]",
      "### Gemini in Workspace: AI inside everyday work",
      "Workspace features put AI close to email, documents, spreadsheets, meetings, and files. In September 2026, Google described new cross-app tasks that can use selected or administrator-enabled Workspace context to create documents, spreadsheets, slides, and manage tasks. Google says these capabilities are rolling out to Business Standard, Business Plus, Enterprise Standard, and Enterprise Plus customers; check the Workspace release details and your admin settings for account availability. [1]",
      "Google also announced reusable Workspace skills: instructions that capture team practices, formats, or templates for repeated tasks. These are useful to evaluate when people need consistent outputs, but they do not replace review of permissions or generated work. [2]",
      "### Gemini Enterprise: search and agents across sources",
      "Gemini Enterprise has its own edition matrix, connectors, pooled quotas, and administrator controls. Business, Standard, Plus, Pay-as-you-go, and Frontline differ in connector access, included capabilities, and billing or quota rules. A connector being listed does not mean it is configured or licensed in a particular customer environment. [3] [4]",
      "A practical division is to start with the user's working surface and the approved sources. If the task lives inside Workspace, begin with its included or enabled capabilities. If people need one assistant over a broader set of Google and third-party systems, compare Gemini Enterprise editions and the exact connector setup. A combined deployment may be appropriate when both needs exist.",
      "### Privacy, access, and rollout checks",
      "Google states that it does not use Workspace customer data to train or improve the underlying generative AI models outside Workspace without permission. Review the applicable Workspace agreement and admin controls, and assess Gemini Enterprise against its own Cloud terms, source permissions, regional settings, and audit requirements. [5]",
      "Before rollout, confirm which features are available in your tenant, which users and source systems are in scope, whether source permissions are preserved, and what human review is needed for consequential outputs. Product announcements describe availability in general; they do not confirm enablement for a particular organization.",
    ],
    sources: [
      { title: "Less switching, more flow: agentic capabilities across Workspace apps", url: "https://workspace.google.com/blog/product-announcements/less-switching-more-flow-5-new-agentic-capabilities-across-google-workspace-apps" },
      { title: "Teach Gemini your team's know-how with skills in Google Workspace", url: "https://workspace.google.com/blog/product-announcements/teach-gemini-your-teams-know-hows-with-skills-in-google-workspace" },
      { title: "Compare editions of Gemini Enterprise", url: "https://docs.cloud.google.com/gemini/enterprise/docs/editions" },
      { title: "Quotas and overages for Gemini Enterprise", url: "https://docs.cloud.google.com/gemini/enterprise/docs/quotas-and-overages" },
      { title: "Generative AI security, compliance and privacy for Google Workspace", url: "https://workspace.google.com/security/ai-privacy/" },
    ],
    relatedFeatures: [
      "gemini-chat",
      "gemini-connectors",
      "gemini-enterprise-platform-stored-organisational-knowledge",
      "gemini-enterprise-platform-custom-mcp-server-connectors",
    ],
  },
  {
    slug: "gemini-enterprise-pricing",
    title: "Gemini Enterprise editions, pricing signals, and quota planning",
    subtitle: "A source-led guide to public starting prices, edition differences, pooled indexing, and current purchase caveats.",
    excerpt: "See what Google currently publishes about Gemini Enterprise editions, list-price signals, pooled storage and indexing, and the differing Pay-as-you-go availability notes.",
    date: "2026-09-28",
    readTime: "7 min read",
    category: "Pricing & Procurement",
    author: editor,
    keyTakeaways: [
      "Google's public Gemini Enterprise page lists Business from $21 and Standard / Plus from $30 USD per seat per month; these are starting prices, not a complete quote.",
      "Google's marketing page says Business is available for up to 300 seats, while the technical edition table says 1–500 users; confirm eligibility and contract terms with Google.",
      "Standard and Plus have 30 GiB and 75 GiB per user respectively for storage and indexing, pooled by project and location across editions.",
      "Pay-as-you-go has no seat fee and usage-based charges, but official pages describe different eligibility and rollout conditions. Verify access before budgeting.",
    ],
    content: [
      "Gemini Enterprise cost planning needs more than multiplying a public price by headcount. Editions differ in included functionality and pooled quotas, and billing rules can depend on region, contract, and eligibility. Google's product page lists Business starting at $21 USD per seat per month and Standard / Plus starting at $30; request a current quote for the edition, currency, and terms you intend to buy. [1]",
      "### Seat-based editions and indexed-data quotas",
      "Google's edition documentation lists Business at 25 GiB per user, Standard at 30 GiB, Plus at 75 GiB, and Frontline at 2 GiB for storage and data indexing. These capacities are pooled per project and location across users regardless of edition. This is a Gemini Enterprise indexing quota, not Google Drive storage. [2] [3]",
      "Other feature quotas are pooled separately within each edition in a project and location. For example, Google documents separate Standard and Plus assistant query pools; actual limits depend on the current quota table and licensed seats. Avoid treating an individual seat's allowance as a personal hard cap. [3]",
      "Google's marketing page currently describes the Business offer as up to 300 seats, while the edition comparison documentation lists 1–500 Business users. These official pages do not match. Use the sales quote and subscription terms to establish the actual cap for your purchase. [1] [2]",
      "### Pay-as-you-go: usage-based charges and eligibility",
      "The Pay-as-you-go edition has no seat fee and charges for the resources used. The edition and quota documentation describes an invoiced Cloud Billing account with an active monthly invoice, and a minimum one-seat subscription. The public product page currently describes gradual rollout to a limited customer group and an organization profile of 20 or more seats; it also says Gemini Notebook is not currently included. Confirm eligibility with Google Cloud before modeling a migration. [1] [3] [4]",
      "Google announced general availability for Pay-as-you-go on August 1, 2026, while noting a gradual rollout. In procurement terms, GA does not mean immediate availability to every account. [4]",
      "### A practical sizing sequence",
      "First identify the workflows and data sources, then map users to editions and check the complete feature and quota tables. Estimate indexed source volume separately from Workspace storage, account for shared pools, and validate connector and administrator requirements in a pilot. Recheck Google pricing, availability, and contractual terms immediately before purchase.",
    ],
    sources: [
      { title: "Gemini Enterprise app editions and public pricing", url: "https://cloud.google.com/gemini-enterprise" },
      { title: "Compare editions of Gemini Enterprise", url: "https://docs.cloud.google.com/gemini/enterprise/docs/editions" },
      { title: "Quotas and overages for Gemini Enterprise", url: "https://docs.cloud.google.com/gemini/enterprise/docs/quotas-and-overages" },
      { title: "Gemini Enterprise release notes", url: "https://docs.cloud.google.com/gemini/enterprise/docs/release-notes" },
    ],
    relatedFeatures: [
      "gemini-enterprise-platform-stored-organisational-knowledge",
      "gemini-enterprise-platform-custom-mcp-server-connectors",
      "security-model-armor",
      "security-cloud-audit-logging",
    ],
  },
  {
    slug: "what-is-gemini-enterprise",
    title: "What is Gemini Enterprise? Product, data, and governance basics",
    subtitle: "A grounded overview of the separate Gemini Enterprise service, its connectors, quota model, and administrator controls.",
    excerpt: "Understand Gemini Enterprise as a Google Cloud service for enterprise search and agents, with edition-specific data connectors, shared quotas, and configurable safety controls.",
    date: "2026-09-28",
    readTime: "6 min read",
    category: "Enterprise AI",
    author: editor,
    keyTakeaways: [
      "Gemini Enterprise is a distinct Google Cloud product with multiple editions and different connector, agent, and security entitlements.",
      "Its indexed data quota is pooled by project and location, and its system quotas also depend on edition and billing mode.",
      "Model Armor can screen prompts and responses when an administrator configures it; it is not enabled simply because the organization owns a license.",
      "The right implementation depends on data permissions, connectors, residency, user groups, and operational controls.",
    ],
    content: [
      "Gemini Enterprise is Google's enterprise search, assistant, and agent offering delivered through Google Cloud. Its product and edition documentation describes capabilities for connecting organizational data, grounding answers, building or using agents, and managing access. The exact feature set depends on the subscription edition and configuration. [1]",
      "### Three parts to evaluate",
      "The model and assistant surface handles user prompts and responses. Google release notes identify model availability and rollout by region and administrator controls, so a model's existence does not guarantee that it is available in every tenant or location. [2]",
      "The grounding layer consists of configured Google and third-party data sources. Edition access differs: the documentation distinguishes select connectors from the full data connector ecosystem. Administrators must still configure each source and check what permissions and content it exposes. [1]",
      "The quota and administration layer sets pooled usage and indexing capacity. Storage and indexing quota is shared by users in a project and location across editions, while many other feature quotas are separated by edition. [3]",
      "### Model Armor and safety controls",
      "Google documents Model Armor for Gemini Enterprise as a configurable screening control for assistant prompts and responses, supported across editions at no additional cost. An administrator must configure it. Screening can add latency; it does not mask personally identifiable information, and the selected enforcement and failure modes affect how requests are handled. [4]",
      "### Planning a deployment",
      "Start by naming the tasks, users, and source systems. Check which connectors and actions are actually available in the selected edition, how source permissions will be managed, what regional and contractual commitments apply, and which events administrators can audit. Pilot the intended workflow with representative users and validate citations and output quality against source material before expanding access.",
    ],
    sources: [
      { title: "Compare editions of Gemini Enterprise", url: "https://docs.cloud.google.com/gemini/enterprise/docs/editions" },
      { title: "Gemini Enterprise release notes", url: "https://docs.cloud.google.com/gemini/enterprise/docs/release-notes" },
      { title: "Quotas and overages for Gemini Enterprise", url: "https://docs.cloud.google.com/gemini/enterprise/docs/quotas-and-overages" },
      { title: "Enable Model Armor in Gemini Enterprise", url: "https://docs.cloud.google.com/gemini/enterprise/docs/enable-model-armor" },
    ],
    relatedFeatures: [
      "gemini-enterprise-platform-agents",
      "gemini-enterprise-platform-custom-mcp-server-connectors",
      "security-model-armor",
      "gemini-deep-research",
    ],
  },
  {
    slug: "google-workspace-gemini-updates-2026",
    title: "Google Workspace with Gemini: New capabilities announced in 2026",
    subtitle: "Cross-app tasks, reusable skills, and creation workflows are expanding Gemini beyond single-document assistance.",
    excerpt: "A cited snapshot of Workspace Gemini announcements in September and July 2026, including rollout scope, reusable team skills, cross-app tasks, and privacy checks.",
    date: "2026-09-28",
    readTime: "5 min read",
    category: "Gemini",
    author: editor,
    keyTakeaways: [
      "Google announced cross-app agentic tasks in Workspace in September 2026, with Chat availability described as coming in the following weeks.",
      "Google Workspace skills are reusable prompts and references intended to capture team know-how for repeatable tasks.",
      "July announcements covered deck generation and contextual content creation in Slides, Docs, and Vids.",
      "Announcements describe rollout and intended product behavior; verify tenant availability, admin controls, and plan eligibility.",
    ],
    content: [
      "Google's September 2026 Workspace announcements describe Gemini moving from app-by-app assistance toward tasks that can span productivity apps. The new workflows can use relevant files, emails, and chat threads based on selected or administrator-enabled sources, and can generate artifacts such as formatted Docs, Sheets, and Slides. [1]",
      "Google said these capabilities were rolling out to Business Standard, Business Plus, Enterprise Standard, and Enterprise Plus, as well as certain personal and education plans. The announcement is not a per-customer enablement check; confirm what appears in your Workspace tenant and the administrator settings that control it. [1]",
      "### Reusable team skills",
      "Google announced Workspace skills on September 16. A skill is a reusable prompt that guides Gemini with team rules, templates, and reference files. Google's examples include consistent brand voice, standard document formats, and status updates. This can help make repeated work more consistent, while outputs still need review for correctness and permissions. [2]",
      "### Creation workflows in Docs, Slides, and Vids",
      "Google's July Workspace Drop described creating editable slide presentations using existing Workspace files and decks as context, summarizing and acting on document comments, and making visuals in Docs. It also noted regional processing controls for the Gemini app were expanding and identified language availability changes. Rollout and plan inclusion should be checked against Google's live Workspace plan information. [3]",
      "### What administrators and teams should verify",
      "Before adopting a workflow, verify the supported plan, regional availability, connected source scope, administrator controls, and how users review or approve generated documents and actions. Google states that Workspace customer data is not used to train or improve generative AI models outside Workspace without permission; review the full privacy commitments and relevant service terms for your situation. [4]",
    ],
    sources: [
      { title: "Less switching, more flow: agentic capabilities across Workspace apps", url: "https://workspace.google.com/blog/product-announcements/less-switching-more-flow-5-new-agentic-capabilities-across-google-workspace-apps" },
      { title: "Teach Gemini your team's know-how with skills in Google Workspace", url: "https://workspace.google.com/blog/product-announcements/teach-gemini-your-teams-know-hows-with-skills-in-google-workspace" },
      { title: "July 2026 Workspace Drop", url: "https://workspace.google.com/blog/product-announcements/july-2026-workspace-feature-drop" },
      { title: "Generative AI security, compliance and privacy for Google Workspace", url: "https://workspace.google.com/security/ai-privacy/" },
    ],
    relatedFeatures: ["gemini-chat", "gemini-docs", "gemini-deep-research"],
  },
  {
    "slug": "gemini-workspace-cross-app-tasks",
    "title": "Gemini Cross-App Tasks in Google Workspace: What Was Announced",
    "subtitle": "Understand the announced cross-app workflows, user-selected sources, and rollout caveats.",
    "excerpt": "Google describes cross-app tasks under user direction and sources selected by users or enabled by administrators. The announcement does not describe autonomous Workspace accounts with their own email identities.",
    "date": "2026-10-18",
    "readTime": "4 min read",
    "category": "Enterprise AI",
    "author": {
      "name": "Independent Product Research",
      "role": "Editorial research",
      "company": "Independent reference"
    },
    "keyTakeaways": [
      "Google describes cross-app tasks under user direction and sources selected by users or enabled by administrators. The announcement does not describe autonomous Workspace accounts with their own email identities.",
      "Confirm the current feature scope and availability in Google’s documentation and your account."
    ],
    "content": [
      "Google describes cross-app tasks under user direction and sources selected by users or enabled by administrators. The announcement does not describe autonomous Workspace accounts with their own email identities. [1]",
      "### What to verify",
      "Read the current primary documentation, confirm availability and configuration in your own account, and review generated output against original sources. Product details and rollout can change."
    ],
    "sources": [
      {
        "title": "Google Workspace agentic capabilities announcement",
        "url": "https://workspace.google.com/blog/product-announcements/less-switching-more-flow-5-new-agentic-capabilities-across-google-workspace-apps"
      }
    ]
  },
  {
    "slug": "gemini-in-gmail-ai-overviews",
    "title": "Gemini in Gmail: AI Overviews, Writing Help, and Availability",
    "subtitle": "A grounded overview of Gmail’s announced AI assistance and rollout caveats.",
    "excerpt": "Google has announced AI Overviews for email threads and personalized Help me write. Availability depends on rollout, account, and subscription; verify current release details.",
    "date": "2026-10-18",
    "readTime": "4 min read",
    "category": "Enterprise AI",
    "author": {
      "name": "Independent Product Research",
      "role": "Editorial research",
      "company": "Independent reference"
    },
    "keyTakeaways": [
      "Google has announced AI Overviews for email threads and personalized Help me write. Availability depends on rollout, account, and subscription; verify current release details.",
      "Confirm the current feature scope and availability in Google’s documentation and your account."
    ],
    "content": [
      "Google has announced AI Overviews for email threads and personalized Help me write. Availability depends on rollout, account, and subscription; verify current release details. [1] [2]",
      "### What to verify",
      "Read the current primary documentation, confirm availability and configuration in your own account, and review generated output against original sources. Product details and rollout can change."
    ],
    "sources": [
      {
        "title": "Google Gmail AI announcement",
        "url": "https://workspace.google.com/blog/product-announcements/more-personalized-and-proactive-assistance-in-gmail-coming-to-business-customers"
      },
      {
        "title": "June 2026 Workspace feature update",
        "url": "https://workspace.google.com/blog/product-announcements/june-2026-workspace-feature-drop"
      }
    ]
  },
];

