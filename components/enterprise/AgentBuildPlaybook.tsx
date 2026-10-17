import Link from "next/link";
import { AgentPromptTemplate } from "@/components/enterprise/AgentPromptTemplate";

const sources = [
  ["Compare Gemini Enterprise editions", "https://docs.cloud.google.com/gemini/enterprise/docs/editions"],
  ["Gemini Enterprise Business Agent Designer", "https://support.google.com/g/answer/16540723?hl=en"],
  ["Set up Gemini Enterprise Business edition", "https://knowledge.workspace.google.com/admin/generative-ai/gemini-enterprise/add-and-set-up-gemini-enterprise-business-edition"],
  ["Create chat agents and write agent prompts", "https://docs.cloud.google.com/gemini/enterprise/docs/workflow-builder/create-chat-agent"],
  ["Workflow Builder: actions, connectors, approvals, and logs", "https://docs.cloud.google.com/gemini/enterprise/docs/workflow-builder/workflows"],
  ["Configure Gemini Enterprise app features", "https://docs.cloud.google.com/gemini/enterprise/docs/manage-web-app-features"],
  ["Build in Agent Platform with Agent Studio or ADK", "https://docs.cloud.google.com/gemini-enterprise-agent-platform/build"],
  ["Google Workspace Studio eligibility and setup", "https://support.google.com/workspace-studio/answer/16444479"],
];

const videoWalkthroughs = [
  ["Build no-code agents in the Gemini Enterprise app", "https://www.youtube.com/watch?v=yiY8soEdVUQ"],
  ["Build a social media impact agent", "https://www.youtube.com/watch?v=nIMk_Gq82vA"],
  ["Build a staff scheduling agent", "https://www.youtube.com/watch?v=S1PkHSy2R9k"],
  ["Build a brand checker agent", "https://www.youtube.com/watch?v=VtC2D5O7IcQ"],
];

const routeCards = [
  {
    title: "Google Workspace Business plans",
    label: "Workspace Studio",
    description: "Business Starter, Standard, and Plus are Google Workspace subscriptions. Build everyday flows at studio.workspace.google.com with a trigger, steps, variables, and Gemini prompts. This is separate from the Gemini Enterprise app product.",
    details: "Your Workspace admin must allow Gemini and the Workspace Studio services/steps you need. Some third-party integrations or steps can vary by account, rollout, and admin policy. Create flows in a desktop browser; active flows can run when you are away.",
    href: "https://studio.workspace.google.com",
    action: "Open Workspace Studio",
  },
  {
    title: "Gemini Enterprise app: Business edition",
    label: "Agent Designer",
    description: "This is a separate Gemini Enterprise app subscription, not the Workspace Business Standard/Plus productivity plan. Business includes 25 GiB pooled storage and indexing per user and supports custom no-code agents, subject to app controls and current availability.",
    details: "Build in business.gemini.google → Agents → Create agent → Manage your data → prompt → Preview → Create. For multi-step setup choose Proceed to Builder. Direct signups manage the team in the product; sales/partner customers also use Admin Console for service and licensing. Verify current connectors in the tenant.",
    href: "https://cloud.google.com/gemini-enterprise/business",
    action: "See Business edition",
  },
  {
    title: "Gemini Enterprise app: Standard and Plus",
    label: "Google Cloud managed",
    description: "These are Gemini Enterprise app editions administered through Google Cloud. Standard includes 30 GiB pooled storage/indexing per user; Plus includes 75 GiB. Both list the full connector ecosystem, priority access to the latest Gemini models, and enterprise-grade security/compliance.",
    details: "Enable the app features and connectors in Cloud Console, then create no-code chat agents and workflows in the Gemini Enterprise web app. Use Agent Platform's Agent Studio or ADK when you need a developer-built agent; edition, billing, region, and deployment requirements differ.",
    href: "https://docs.cloud.google.com/gemini/enterprise/docs/editions",
    action: "Compare the editions",
  },
];

const workflowSteps = [
  ["Provision and scope", "Choose the product and edition first. For the Gemini Enterprise app, create/select the Google Cloud project and app, assign licenses, and keep the app region consistent with data and Model Armor policy. For Workspace Studio, use an eligible Workspace account and have an admin allow Gemini and the required services."],
  ["Enable only needed features", "In Cloud Console, open the Gemini Enterprise app → Configurations → Feature Management. Turn on Chat agents and/or Workflows, Agent Gallery if needed, and sharing only when your governance process is ready. Model selection is a separate toggle; enabling it can expose partner models with separate usage billing."],
  ["Connect data and tools", "Connect the approved Google or third-party source to the app/data store, complete its authorization, choose sync scope and cadence, and confirm who can access the indexed data. In Workflow Builder, attach only the required connector actions to each Gemini Agent step."],
  ["Create and test in the user app", "Open Gemini Enterprise → Agents → Create agent. Start from a prompt or use the visual builder for branches, subagents, schedules, and cloud data sources. Preview normal, missing-data, permission-denied, and unsafe-input cases. Save/create or turn on only after reviewing every step."],
  ["Publish with guardrails", "Start read-only. Add a human approval before email sends, ticket changes, or other external writes. Enable the minimum sharing scope, monitor run traces/logs, define an owner and rollback path, and retest after changing connectors, prompts, or model settings."],
];

export function AgentBuildPlaybook({ href }: { href: (path: string) => string }) {
  return (
    <>
      <section className="border-b border-border bg-muted/20 py-20" aria-labelledby="agent-types">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 id="agent-types" className="fluid-h2 font-bold text-foreground">First choose which Google agent product you mean.</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">“Workspace Business,” “Gemini Enterprise Business,” and “Gemini Enterprise Standard/Plus” are different subscriptions and admin surfaces. Their agent builders overlap, but they are not interchangeable.</p>
          </div>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {routeCards.map((card) => (
              <article key={card.title} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className="w-fit rounded-full bg-google-blue/10 px-3 py-1 text-xs font-semibold text-google-blue">{card.label}</span>
                <h3 className="mt-4 text-lg font-bold text-foreground">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.description}</p>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">{card.details}</p>
                <a href={card.href} target="_blank" rel="noreferrer" className="mt-auto pt-5 text-sm font-semibold text-google-blue hover:underline">{card.action} ↗</a>
              </article>
            ))}
          </div>
          <p className="mt-5 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 text-sm leading-6 text-muted-foreground">
            Workspace Studio is a separate first-party flow builder for Google Workspace accounts. It is not the Gemini Enterprise app Workflow Builder. Feature visibility depends on edition, rollout, admin settings, region, and connected-app permissions; verify what appears in your tenant before buying or promising a workflow.
          </p>
        </div>
      </section>

      <section className="py-20" aria-labelledby="agent-capabilities">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div>
            <h2 id="agent-capabilities" className="fluid-h2 font-bold text-foreground">What an agent can actually do</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">A chat agent answers a user with its instructions, selected model, connected data, and tools. A workflow agent adds a trigger and a sequence of steps. Depending on the product and enabled connectors, that sequence can search records, draft content, route work, call an action, ask for human review, or stop when a condition is not met.</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">An agent is not automatically authorized to every system, and “connected” does not mean every action is safe. Search/read actions can be enabled individually; in Gemini Enterprise Workflow Builder, write actions are controlled at the connector level and should be paired with their required lookup actions.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={href("/enterprise/connectors")} className="rounded-full bg-google-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Connector setup guide</Link>
              <Link href={href("/enterprise/onboarding/business")} className="rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">Business app onboarding</Link>
              <Link href={href("/enterprise/onboarding/cloud")} className="rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">Standard / Plus onboarding</Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Find and summarize", "Search approved Drive, Gmail, Jira, CRM, or other connected records; return evidence and links."],
              ["Draft and route", "Prepare replies, summaries, reports, and assignments for a person to review."],
              ["Automate a sequence", "Use triggers, schedules, steps, conditions, loops, variables, and existing agents where the builder supports them."],
              ["Take a controlled action", "Create/update/send through enabled connector actions. Require a human approval for consequential changes."],
            ].map(([title, description]) => <div key={title} className="rounded-2xl border border-border bg-card p-5"><h3 className="font-semibold text-foreground">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p></div>)}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/20 py-20" aria-labelledby="build-steps">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <h2 id="build-steps" className="fluid-h2 font-bold text-foreground">Build a Gemini Enterprise no-code agent</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">The user-facing builder lives inside the Gemini Enterprise web app. Cloud Console is where an administrator creates/configures the app, enables features, connects data, and applies governance. For a code-built agent, use Agent Platform instead (below).</p>
          <ol className="mt-8 space-y-4">
            {workflowSteps.map(([title, description], index) => <li key={title} className="grid gap-3 rounded-2xl border border-border bg-card p-5 sm:grid-cols-[52px_1fr] sm:gap-5"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-google-blue/10 text-sm font-bold text-google-blue">{String(index + 1).padStart(2, "0")}</span><div><h3 className="font-semibold text-foreground">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p></div></li>)}
          </ol>
          <div className="mt-8 rounded-2xl border border-google-blue/20 bg-google-blue/5 p-5">
            <h3 className="font-semibold text-foreground">Cloud Console feature path</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Google Cloud Console → Gemini Enterprise → select your app → <strong>Configurations → Feature Management</strong>. Enable <em>Chat agents</em> and/or <em>Workflows</em>; use <em>Agent Gallery</em> and agent-sharing controls only if needed. The exact controls and model availability depend on your edition, region, and current rollout.</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">In the web app, open <strong>Agents → Create agent</strong>. Describe the job, data it may use, sequence, output, and boundaries. Preview it; for Cloud sources such as BigQuery, Cloud Storage, or Cloud SQL, use the designer and connect the data source explicitly. A prompt cannot provision or enable those Cloud data stores for you.</p>
          </div>
          <div className="mt-5 rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">Business edition uses Agent Designer</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">For a direct signup, open <strong>business.gemini.google → Agents → Create agent</strong>, choose <strong>Manage your data</strong>, enter the task prompt, then submit, preview, and create. Choose <strong>Proceed to Builder</strong> for instructions, model, knowledge files, tools, subagents, starter prompts, and schedules. For sales/partner provisioned teams, an administrator also enables the service and assigns licenses in Admin Console. The Business app itself is where users build agents.</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Before sharing, review attached sources: recipients may query the agent’s connected sources or uploaded files through it even when they cannot open those sources directly.</p>
          </div>
        </div>
      </section>

      <section className="py-20" aria-labelledby="agent-prompt">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <h2 id="agent-prompt" className="fluid-h2 font-bold text-foreground">A prompt that gives the builder a useful first draft</h2>
          <p className="mt-4 mb-7 max-w-3xl text-sm leading-7 text-muted-foreground">Tell it the job, trigger, approved data, ordered steps, permitted actions, safety boundaries, output format, and how to handle uncertainty. Then inspect the generated configuration manually; a prompt is not an access-control policy.</p>
          <AgentPromptTemplate />
        </div>
      </section>

      <section className="border-y border-border bg-muted/20 py-20" aria-labelledby="cloud-console-agents">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <h2 id="cloud-console-agents" className="fluid-h2 font-bold text-foreground">When you specifically want an agent built in Google Cloud</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Gemini Enterprise Agent Platform is the developer platform, distinct from no-code agents in the Gemini Enterprise app. Start in Google Cloud Console’s Agent Platform and Agent Studio for a visual build, or use the Agent Development Kit (ADK) for a code-first agent. Connect grounding, data, models, tools, identity, deployment, evaluation, and monitoring deliberately. ADK/full-code agents can be registered with Gemini Enterprise for centralized discovery/governance where supported; they are not the same thing as a Workflow Builder agent.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5"><h3 className="font-semibold text-foreground">Use Agent Studio when</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">You need a visual developer workflow for building, testing, deploying, and managing agents on Agent Platform.</p></div>
            <div className="rounded-2xl border border-border bg-card p-5"><h3 className="font-semibold text-foreground">Use ADK or another framework when</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">You need version-controlled code, custom tools, application logic, framework choice, or deeper control over runtime and deployment.</p></div>
          </div>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">Standard and Plus list AI developer tools and access to externally built agents in Google's edition comparison. Billing, enabled APIs, IAM, region, quotas, and exact runtime costs still need to be checked for your Cloud project.</p>
          <a className="mt-4 inline-flex text-sm font-semibold text-google-blue hover:underline" href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/build" target="_blank" rel="noreferrer">Open Agent Platform build documentation ↗</a>
        </div>
      </section>

      <section className="py-20" aria-labelledby="agent-sources">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <h2 id="agent-sources" className="fluid-h2 font-bold text-foreground">Official setup references</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {sources.map(([label, url]) => <a key={url} href={url} target="_blank" rel="noreferrer" className="rounded-xl border border-border bg-card p-4 text-sm font-medium text-foreground transition hover:border-google-blue/40 hover:text-google-blue">{label}<span className="ml-2 text-google-blue">↗</span></a>)}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16" aria-labelledby="agent-videos">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <h2 id="agent-videos" className="text-2xl font-bold text-foreground">Google agent walkthrough videos</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Official demos for no-code agent building and example workflows. Google notes that interface details may change as features roll out.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">{videoWalkthroughs.map(([label, url]) => <a key={url} href={url} target="_blank" rel="noreferrer" className="rounded-xl border border-border bg-card p-4 text-sm font-semibold text-google-blue hover:border-google-blue/40">{label} ↗</a>)}</div>
          <a href="https://cloud.google.com/gemini-enterprise/resources" target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold text-google-blue hover:underline">Browse Google’s Gemini learning hub ↗</a>
        </div>
      </section>
    </>
  );
}
