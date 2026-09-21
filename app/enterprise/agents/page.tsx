import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { 
  Terminal, 
  ArrowLeft, 
  ArrowRight, 
  Workflow, 
  Cpu, 
  Network, 
  Lock, 
  CheckCircle2, 
  Layers, 
  Boxes,
  ShieldCheck,
  Server,
  Zap
} from "lucide-react";

export const metadata: Metadata = {
  title: "Model Context Protocol (MCP) & Enterprise AI Agents | Gemini Intelligence",
  description: "Learn how Gemini Enterprise implements the open Model Context Protocol (MCP) to safely interface with corporate APIs, databases, and multi-step reasoning agents.",
};

export default function AgentsAndMcpPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Breadcrumb Header */}
      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/enterprise"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Enterprise Architecture
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 bg-dark-bg text-white border-b border-dark-border">
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-gemini-purple/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gemini-purple/20 text-gemini-purple text-xs font-semibold uppercase tracking-wider mb-4 border border-gemini-purple/30">
              <Terminal className="w-3.5 h-3.5" /> Open Agent Standards
            </div>
            <h1 className="fluid-h1 font-extrabold tracking-tight text-white mb-6">
              Model Context Protocol (MCP) & <span className="gradient-text">Autonomous Agents</span>
            </h1>
            <p className="fluid-body text-gray-400 leading-relaxed mb-8">
              Open standard architecture for secure tool calling, private database grounding, and multi-step organizational workflows. Gemini Enterprise bridges conversational reasoning with your internal systems through standardized MCP servers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/compare"
                className="px-6 py-3 bg-gradient-to-r from-gemini-indigo to-gemini-purple text-white font-semibold rounded-xl hover:shadow-lg transition-all text-sm"
              >
                Compare Enterprise Editions
              </Link>
              <Link
                href="/enterprise/connectors"
                className="px-6 py-3 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all text-sm"
              >
                View Pre-Built Connectors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Flow Diagram */}
      <section className="py-20 border-b border-border bg-muted/10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-google-blue block mb-2">
              System Architecture
            </span>
            <h2 className="fluid-h2 font-bold text-foreground">
              How Gemini Orchestrates MCP Tools
            </h2>
            <p className="text-muted-foreground mt-2">
              Every tool execution passes through tenant identity, permission checks, and policy boundaries before touching external APIs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm relative">
              <div className="w-10 h-10 rounded-lg bg-google-blue/10 text-google-blue flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h3 className="font-bold text-foreground mb-2">User Query & Intent</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The employee inputs a multi-step objective (e.g., "Analyze customer churn in Salesforce and create a Jira remediation epic").
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm relative">
              <div className="w-10 h-10 rounded-lg bg-gemini-purple/10 text-gemini-purple flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h3 className="font-bold text-foreground mb-2">Gemini 2.5 Reasoner</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Gemini plans the execution sequence, evaluates available MCP schemas, and generates structured tool-call arguments.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm relative">
              <div className="w-10 h-10 rounded-lg bg-gemini-cyan/10 text-gemini-cyan flex items-center justify-center font-bold mb-4">
                03
              </div>
              <h3 className="font-bold text-foreground mb-2">Secure MCP Gateway</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The enterprise MCP gateway verifies the user's OAuth tokens, enforces ACL policies, and safely executes tool calls against internal endpoints.
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm relative">
              <div className="w-10 h-10 rounded-lg bg-google-green/10 text-google-green flex items-center justify-center font-bold mb-4">
                04
              </div>
              <h3 className="font-bold text-foreground mb-2">Grounded Synthesis</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Results are returned with verifiable citations, structured tabular output, or completed transaction receipts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Agent Capabilities */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-google-blue/10 text-google-blue flex items-center justify-center mb-6">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Multi-Step Reasoning Workflows
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Enterprise agents don't just output text; they complete workflows across systems. From reconciling procurement POs in ERP to updating CRM opportunities and sending team notifications in Google Chat, agents operate autonomously within predefined guardrails.
              </p>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-google-green" /> Human-in-the-loop approval step before external state mutation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-google-green" /> Comprehensive audit trails written to Cloud Logging
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-google-green" /> Granular capability gating by department and organizational unit (OU)
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-gemini-purple/10 text-gemini-purple flex items-center justify-center mb-6">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Custom Local & Remote MCP Servers
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Developers can build custom MCP servers in TypeScript or Python using standard SDKs. Host them inside your Google Cloud VPC or on-premise infrastructure, exposing internal databases and microservices without exposing sensitive keys to clients.
              </p>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-google-green" /> Standard JSON-RPC protocol compliance
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-google-green" /> Automatic schema discovery and typing in Gemini prompts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-google-green" /> Compatible with Gemini Enterprise Plus standalone editions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
