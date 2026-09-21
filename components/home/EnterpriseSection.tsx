"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Database, Terminal, Bot, Network, Box, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const connectors = [
  { name: "Jira", status: "Native", icon: "jira" },
  { name: "Confluence", status: "Native", icon: "confluence" },
  { name: "Salesforce", status: "GA", icon: "salesforce" },
  { name: "GitHub", status: "MCP Ready", icon: "github" },
  { name: "Slack", status: "Native", icon: "slack" },
  { name: "BigQuery", status: "GA", icon: "bigquery" },
  { name: "Notion", status: "MCP Ready", icon: "notion" },
  { name: "SharePoint", status: "Native", icon: "sharepoint" },
];

export default function EnterpriseSection() {
  return (
    <section className="atlas-section py-24 bg-[#0B0F19] text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gemini-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gemini-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gemini-cyan font-bold tracking-widest text-sm uppercase mb-4">
            Enterprise Architecture
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Beyond standard chat: Connectors, Agents & MCP
          </h2>
          <p className="text-lg text-gray-400">
            Connect Gemini to your organization's entire knowledge base with enterprise-grade grounding, zero data training on customer data, and open protocol extensibility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Pillar 1 */}
          <div className="atlas-interactive atlas-card group relative rounded-2xl bg-white/5 border border-white/10 p-8 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gemini-cyan/50 transition-colors duration-300 shadow-[0_0_20px_rgba(0,0,0,0)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]" />
            <div className="relative z-10">
              <div className="atlas-icon flex h-12 w-12 items-center justify-center rounded-xl bg-gemini-cyan/20 mb-6 text-gemini-cyan">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Enterprise Grounding & Connectors</h3>
              <p className="text-gray-400 leading-relaxed">
                Secure ACL-aware retrieval across Jira, Salesforce, Confluence, SharePoint, and BigQuery. Gemini respects your internal data permissions at query time.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="atlas-interactive atlas-card group relative rounded-2xl bg-white/5 border border-white/10 p-8 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gemini-purple/50 transition-colors duration-300 shadow-[0_0_20px_rgba(0,0,0,0)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]" />
            <div className="relative z-10">
              <div className="atlas-icon flex h-12 w-12 items-center justify-center rounded-xl bg-gemini-purple/20 mb-6 text-gemini-purple">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Model Context Protocol (MCP)</h3>
              <p className="text-gray-400 leading-relaxed">
                Run local and cloud MCP servers to extend Gemini with private APIs, proprietary databases, and custom tools in a standardized framework.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="atlas-interactive atlas-card group relative rounded-2xl bg-white/5 border border-white/10 p-8 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gemini-spark/50 transition-colors duration-300 shadow-[0_0_20px_rgba(0,0,0,0)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]" />
            <div className="relative z-10">
              <div className="atlas-icon flex h-12 w-12 items-center justify-center rounded-xl bg-gemini-spark/20 mb-6 text-gemini-spark">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Autonomous Enterprise Agents</h3>
              <p className="text-gray-400 leading-relaxed">
                Trigger multi-step reasoning workflows grounded in corporate knowledge and verified citations. Build agents that act on behalf of your users safely.
              </p>
            </div>
          </div>
        </div>

        {/* Connector Grid */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Pre-built Ecosystem</h3>
              <p className="text-gray-400 text-sm">Connect Gemini to your existing SaaS stack out of the box.</p>
            </div>
            <Link href="/enterprise#connectors" className="text-sm font-medium text-gemini-cyan hover:text-gemini-cyan/80 flex items-center gap-1">
              View all connectors <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {connectors.map((connector) => (
              <div key={connector.name} className="flex items-center gap-3 bg-dark-surface/50 border border-white/10 rounded-lg py-2 px-4 hover:border-white/20 transition-colors">
                <div className="font-semibold text-sm">{connector.name}</div>
                <span className={cn(
                  "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full",
                  connector.status === "Native" ? "bg-green-500/20 text-green-400" :
                  connector.status === "GA" ? "bg-blue-500/20 text-blue-400" :
                  "bg-purple-500/20 text-purple-400"
                )}>
                  {connector.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/enterprise" className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Explore the Deep Architectural Guide
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
