"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Calendar,
  FileText,
  Table,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bot,
  UserCheck,
  Building2,
  Workflow,
  Search,
  Zap,
  ExternalLink,
  ChevronRight,
  Send,
  Lock,
  Layers,
} from "lucide-react";

interface AgentRole {
  id: string;
  name: string;
  email: string;
  department: string;
  avatarColor: string;
  description: string;
  sampleSubject: string;
  sampleInbound: string;
  sampleSender: string;
  autonomousSteps: {
    tool: string;
    action: string;
    system: "Workspace" | "External" | "Security";
  }[];
  sampleOutput: {
    type: "email" | "doc" | "calendar" | "sheet";
    title: string;
    summary: string;
  };
  humanApprovalRequired: string;
}

const AGENT_ROLES: AgentRole[] = [
  {
    id: "project-ops",
    name: "Project Operations Agent",
    email: "pm-agent@yourcompany.com",
    department: "Engineering & Product",
    avatarColor: "from-blue-600 to-indigo-600",
    description: "Monitors project correspondence, synchronizes sprint milestones across Jira and Google Sheets, and drafts status reports.",
    sampleSender: "sarah.lead@yourcompany.com",
    sampleSubject: "Weekly Sprint Status & Blockers Audit",
    sampleInbound: "Hey @pm-agent, can you audit all in-flight deliverables for the Q4 Enterprise Launch? Pull blocker tickets from Jira, check the team's updates in the Project Tracker Sheet, and prepare an executive briefing doc for tomorrow's 10 AM standup.",
    autonomousSteps: [
      { tool: "Jira MCP Server", action: "Queries active sprint board for issues tagged 'Blocker' or 'At Risk'", system: "External" },
      { tool: "Google Sheets API", action: "Pulls resource allocation and deadline dates from Q4 Tracker Sheet", system: "Workspace" },
      { tool: "Google Docs API", action: "Compiles formatted status briefing document with risk mitigation tables", system: "Workspace" },
      { tool: "Google Calendar API", action: "Attaches generated brief to tomorrow's 10:00 AM Standup invite", system: "Workspace" },
    ],
    sampleOutput: {
      type: "email",
      title: "Re: Weekly Sprint Status & Blockers Audit",
      summary: "I have audited our Q4 Sprint (18 completed, 4 in progress, 2 blockers). The 2 blockers relate to SSO certificate rotation (#ENG-402) and billing tier testing (#ENG-419). I created the executive briefing in your Shared Drive and attached it to tomorrow's 10:00 AM calendar invite.",
    },
    humanApprovalRequired: "Reassigning engineer sprint assignments or altering release ship dates in Jira.",
  },
  {
    id: "sales-rfp",
    name: "Sales RFP & Proposal Specialist",
    email: "rfp-agent@yourcompany.com",
    department: "Revenue & Commercial",
    avatarColor: "from-purple-600 to-pink-600",
    description: "Receives customer RFPs via email, analyzes questionnaire sheets, grounds answers against historical winning bids, and drafts proposals.",
    sampleSender: "jason.sales@yourcompany.com (Fwd from client)",
    sampleSubject: "Fwd: Enterprise Security & Compliance RFP (Due Oct 30)",
    sampleInbound: "Fwd: Attached is the 80-question security questionnaire from Acme Global. Can you draft our responses using our SOC 2 and ISO 27001 approved answers, highlight any questions needing legal review, and update the deal stage in Salesforce?",
    autonomousSteps: [
      { tool: "Gmail Parser", action: "Extracts attached .xlsx questionnaire and categorizes questions into Security, Legal, Architecture", system: "Workspace" },
      { tool: "NotebookLM Grounding", action: "Retrieves approved answers from SOC 2, HIPAA, and ISO 27001 Drive repository", system: "Workspace" },
      { tool: "Google Sheets API", action: "Populates 74 of 80 answers with confidence scores and source document citations", system: "Workspace" },
      { tool: "Salesforce Connector", action: "Logs RFP receipt, sets Opportunity stage to 'RFP In Review', and links draft sheet", system: "External" },
    ],
    sampleOutput: {
      type: "sheet",
      title: "Completed: Acme_Global_RFP_Response_Draft.xlsx",
      summary: "74 of 80 questions answered with 98%+ confidence grounded in our 2026 SOC 2 report. 6 custom questions flagged in amber for Legal review (data residency in Switzerland). Salesforce opportunity updated with target completion date.",
    },
    humanApprovalRequired: "Submitting the finalized RFP document to external clients and agreeing to non-standard legal indemnities.",
  },
  {
    id: "customer-triage",
    name: "Customer Support & Triage Lead",
    email: "support-agent@yourcompany.com",
    department: "Customer Experience",
    avatarColor: "from-emerald-600 to-teal-600",
    description: "Ingests inbound support emails, categorizes severity, resolves tier-1 technical inquiries using documentation, and escalates complex bugs.",
    sampleSender: "customer-admin@clientcorp.com",
    sampleSubject: "URGENT: SAML SSO Login Error 401 for Marketing Team",
    sampleInbound: "Our marketing department is getting a 401 Unauthorized loop when attempting to log into Google Workspace via Okta today. Other departments are fine. Can you help resolve this ASAP?",
    autonomousSteps: [
      { tool: "Workspace Admin SDK", action: "Inspects SAML SSO configuration and recently modified OU sign-in policies", system: "Workspace" },
      { tool: "Cloud Logging API", action: "Identifies expired IdP certificate mismatch specific to the Marketing Org Unit", system: "Security" },
      { tool: "ServiceNow / Zendesk", action: "Creates high-priority incident #INC-8921 and assigns to Identity Operations team", system: "External" },
      { tool: "Gmail Draft Generator", action: "Prepares response with exact certificate renewal steps for the client admin", system: "Workspace" },
    ],
    sampleOutput: {
      type: "email",
      title: "Re: URGENT: SAML SSO Login Error 401 for Marketing Team",
      summary: "Identified issue: The Okta SAML signing certificate for your Marketing OU expired at 08:00 UTC. Your company's Primary OU is using the new cert. To fix immediately: upload your 2026 cert to Admin Console > Security > Authentication > SSO. Incident #INC-8921 created for tracking.",
    },
    humanApprovalRequired: "Changing tenant-wide authentication policies or granting administrative privileges.",
  },
  {
    id: "finance-reconciliation",
    name: "Finance & Invoice Auditor",
    email: "finance-agent@yourcompany.com",
    department: "Accounting & Finance",
    avatarColor: "from-amber-600 to-orange-600",
    description: "Ingests vendor invoices and employee expense receipts, parses line items into Google Sheets, and cross-references ERP purchase orders.",
    sampleSender: "billing@cloud-vendor.com",
    sampleSubject: "Invoice #INV-2026-9810 - Monthly Cloud Services",
    sampleInbound: "Please find attached your monthly service invoice for September 2026 ($24,850.00). Payment due net-30 per contract terms. Remittance details included in the attached PDF.",
    autonomousSteps: [
      { tool: "Document AI & Vision", action: "Parses PDF invoice: extracts PO #PO-8812, line items, tax, and remit details", system: "Workspace" },
      { tool: "NetSuite / SAP Connector", action: "Validates against active Purchase Order PO-8812 and verifies approved budget ceiling", system: "External" },
      { tool: "Google Sheets API", action: "Appends validated transaction to Monthly Ledger Sheet with categorization tags", system: "Workspace" },
      { tool: "Approval Routing", action: "Drafts one-click approval email to Head of Infrastructure for signature", system: "Security" },
    ],
    sampleOutput: {
      type: "email",
      title: "Invoice #INV-2026-9810 Processed & Ready for Sign-Off",
      summary: "Invoice matches Purchase Order PO-8812 (Variance: $0.00, within approved $25k budget). Line items parsed into Q3 Ledger. One-click approval button sent to VP Infrastructure for payment release.",
    },
    humanApprovalRequired: "Executing bank wire transfers, ACH releases, or overriding purchase order ceilings.",
  },
  {
    id: "hr-onboarding",
    name: "People Ops & Onboarding Navigator",
    email: "onboarding-agent@yourcompany.com",
    department: "People & Workplace",
    avatarColor: "from-cyan-600 to-blue-600",
    description: "Welcomes new employees via email, schedules 1-on-1 intro sessions on Google Calendar, and answers company policy questions.",
    sampleSender: "alex.newhire@yourcompany.com",
    sampleSubject: "First Day Questions: Healthcare Enrollment & Equipment",
    sampleInbound: "Hi @onboarding-agent! Today is my first day on the design team. Where do I select my healthcare benefits, and what is our home office equipment reimbursement policy?",
    autonomousSteps: [
      { tool: "Google Drive Scoping", action: "Reads 2026 Employee Handbook & Benefits Guide in HR Shared Drive", system: "Workspace" },
      { tool: "Google Calendar API", action: "Checks Alex's calendar and schedules 30-min Benefits Q&A with HR rep", system: "Workspace" },
      { tool: "Workday / BambooHR", action: "Verifies Alex's enrollment deadline (30 days from hire date: Nov 14)", system: "External" },
      { tool: "Gmail Reply", action: "Composes warm onboarding response with direct portal links and reimbursement rules", system: "Workspace" },
    ],
    sampleOutput: {
      type: "email",
      title: "Welcome Alex! Here are your Benefits & Equipment details",
      summary: "Welcome to the team! Your benefits enrollment portal is at benefits.internal (deadline: Nov 14). Home office equipment reimbursement is $750 via Expensify under 'Home Setup'. I also scheduled a 1-on-1 intro with your HR partner for tomorrow at 2:30 PM.",
    },
    humanApprovalRequired: "Approving non-standard compensation exceptions or modifying statutory employee records.",
  },
];

export function CoworkerAgentShowcase() {
  const [selectedRole, setSelectedRole] = useState<AgentRole>(AGENT_ROLES[0]);

  return (
    <div className="space-y-12">
      {/* ── Keynote Announcement Eyebrow ─────────────────────────────────────── */}
      <div className="rounded-3xl border border-primary/30 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Google "Gemini at Work" Keynote
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
              AI Coworkers with Their Own Email Identities (@yourcompany.com)
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Announced by Alphabet CEO Sundar Pichai and Google Cloud CEO Thomas Kurian: Gemini agents
              are evolving from reactive chat boxes into persistent, addressable coworkers with their own
              company email inbox, Google Calendar, and organizational responsibilities.
            </p>
          </div>
          <Link
            href="/articles/gemini-workspace-coworker-agents-individual-email"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shrink-0"
          >
            <span>Read Architecture Article</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Role Selector Tabs ─────────────────────────────────────────────────── */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-google-blue block mb-1">
            Explore 5 Enterprise Coworker Archetypes
          </span>
          <h2 className="text-2xl font-bold text-foreground">
            How Coworker Agents Operate Across Departments
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select an autonomous role below to see its email address, inbound triggering, autonomous tool
            execution, and human-in-the-loop governance.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {AGENT_ROLES.map((role) => {
            const isSelected = selectedRole.id === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? "border-primary bg-card shadow-md ring-2 ring-primary/30"
                    : "border-border/80 bg-card/60 hover:bg-card hover:border-border text-muted-foreground"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg bg-gradient-to-br ${role.avatarColor} text-white flex items-center justify-center font-bold text-xs mb-2 shadow-sm`}
                >
                  <Bot className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-foreground leading-snug line-clamp-1">
                  {role.name}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono mt-0.5 truncate w-full">
                  {role.email.split("@")[0]}@…
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Interactive Live Simulation Card ──────────────────────────────────── */}
      <div className="rounded-3xl border border-border bg-card shadow-xl overflow-hidden">
        {/* Agent Profile Header */}
        <div className="p-6 border-b border-border/80 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedRole.avatarColor} text-white flex items-center justify-center shadow-md`}
            >
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-foreground">{selectedRole.name}</h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Agent
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <span className="font-mono text-primary font-semibold">{selectedRole.email}</span>
                <span>•</span>
                <span>{selectedRole.department}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Admin-Provisioned OU:</span>
            <span className="font-mono bg-muted px-2 py-1 rounded-md text-foreground font-semibold">
              /Agents/{selectedRole.department.split(" ")[0]}
            </span>
          </div>
        </div>

        {/* 2-Column Workflow Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
          {/* Left Column: The Triggering Inbound Email */}
          <div className="p-6 space-y-4 bg-background/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-500" /> Inbound Trigger: Email Received
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">Via Gmail / Workspace</span>
            </div>

            {/* Email Container Mock */}
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm space-y-3">
              <div className="space-y-1 text-xs border-b border-border/60 pb-3">
                <div className="flex">
                  <span className="w-16 font-semibold text-muted-foreground">From:</span>
                  <span className="text-foreground font-mono">{selectedRole.sampleSender}</span>
                </div>
                <div className="flex">
                  <span className="w-16 font-semibold text-muted-foreground">To:</span>
                  <span className="text-primary font-mono font-semibold">{selectedRole.email}</span>
                </div>
                <div className="flex">
                  <span className="w-16 font-semibold text-muted-foreground">Subject:</span>
                  <span className="text-foreground font-bold">{selectedRole.sampleSubject}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                {selectedRole.sampleInbound}
              </p>
            </div>

            {/* Multi-step Autonomous Execution Flow */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5 text-purple-500" /> Autonomous Multi-Step Execution
              </span>

              <div className="space-y-2">
                {selectedRole.autonomousSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl border border-border/60 bg-card text-xs"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="font-bold text-foreground">{step.tool}</span>
                        <span
                          className={`text-[9.5px] font-semibold px-1.5 py-0.2 rounded ${
                            step.system === "Workspace"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                              : step.system === "Security"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                          }`}
                        >
                          {step.system}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-[11px] leading-relaxed">
                        {step.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Automated Output & Human Safeguard */}
          <div className="p-6 space-y-5 bg-background/50 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-emerald-500" /> Completed Autonomous Output
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Executed
                </span>
              </div>

              {/* Output Result Card */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4.5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    {selectedRole.sampleOutput.type === "email" ? (
                      <Mail className="w-4 h-4" />
                    ) : selectedRole.sampleOutput.type === "sheet" ? (
                      <Table className="w-4 h-4" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-foreground">
                    {selectedRole.sampleOutput.title}
                  </h4>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedRole.sampleOutput.summary}
                </p>

                <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span>Audit Event: AGENT_EXEC_COMPLETED</span>
                  <span>ID: #9821-4A</span>
                </div>
              </div>

              {/* Human in the loop Policy Callout */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
                  <UserCheck className="w-4 h-4" />
                  <span>Admin Human-in-the-Loop Threshold</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground font-medium">Automatic Sign-Off Required: </strong>
                  {selectedRole.humanApprovalRequired} The agent generates draft artifacts and alerts the
                  human manager via email before executing external mutations.
                </p>
              </div>
            </div>

            {/* Step-by-step Setup Guide Link */}
            <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Supported on Gemini Enterprise & Add-ons</span>
              <Link
                href="/compare"
                className="text-primary font-bold hover:underline flex items-center gap-1"
              >
                <span>Check Plan Matrix</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── 5-Step How to Use & Deploy Architecture ──────────────────────────── */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-google-blue block mb-1">
            Enterprise Deployment Architecture
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-foreground">
            How to Set Up & Deploy Coworker Agents in Google Workspace
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Coworker agents follow Google Cloud Identity security, Organizational Unit (OU) policy
            isolation, and Model Context Protocol (MCP) tool integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="rounded-2xl border border-border bg-background p-4 space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h4 className="text-xs font-bold text-foreground">Provision Identity</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              In Google Workspace Admin, create the agent profile with a dedicated email address
              (@yourcompany.com) in an isolated Organizational Unit (OU).
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-4 space-y-2">
            <span className="w-6 h-6 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-xs flex items-center justify-center">
              2
            </span>
            <h4 className="text-xs font-bold text-foreground">Scope Drive & Sources</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Add the agent as a viewer or editor only to department-specific Shared Drives and
              NotebookLM sources. It cannot read across unauthorized OUs.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-4 space-y-2">
            <span className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center">
              3
            </span>
            <h4 className="text-xs font-bold text-foreground">Attach MCP Tools</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Connect corporate endpoints (Salesforce, Jira, BigQuery, NetSuite) via standard Model
              Context Protocol (MCP) servers with scoped OAuth credentials.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-4 space-y-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center justify-center">
              4
            </span>
            <h4 className="text-xs font-bold text-foreground">Define Approval Gates</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Configure human-in-the-loop triggers for high-stakes mutations (external emails, financial
              updates, code deployments) with one-click manager sign-off.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-4 space-y-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center">
              5
            </span>
            <h4 className="text-xs font-bold text-foreground">Audit & Iterate</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Every action is attributed to the agent's service principal in Cloud Logging and Workspace
              audit reports with full prompt and tool parameter logging.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
