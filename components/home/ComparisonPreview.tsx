"use client";

import React from "react";
import Link from "next/link";
import { Check, Minus, Info, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureStatus = "included" | "limited" | "none";

interface FeatureRow {
  name: string;
  tooltip: string;
  businessStandard: { status: FeatureStatus; text?: string };
  enterprisePlus: { status: FeatureStatus; text?: string };
  aiExpanded: { status: FeatureStatus; text?: string };
  geminiEnterprisePlus: { status: FeatureStatus; text?: string };
}

const features: FeatureRow[] = [
  {
    name: "Gemini Chat in Workspace",
    tooltip: "Gmail, Docs, Sheets, Meet integration",
    businessStandard: { status: "none" },
    enterprisePlus: { status: "none" },
    aiExpanded: { status: "included" },
    geminiEnterprisePlus: { status: "included" },
  },
  {
    name: "Deep Research Reports Quota",
    tooltip: "Automated synthesis of complex topics",
    businessStandard: { status: "none" },
    enterprisePlus: { status: "none" },
    aiExpanded: { status: "limited", text: "Standard Quota" },
    geminiEnterprisePlus: { status: "included", text: "Highest Quota" },
  },
  {
    name: "NotebookLM Source Limits",
    tooltip: "Audio/Video Overviews & source capacity",
    businessStandard: { status: "limited", text: "Standard Limits" },
    enterprisePlus: { status: "limited", text: "Standard Limits" },
    aiExpanded: { status: "included", text: "Expanded Limits" },
    geminiEnterprisePlus: { status: "included", text: "Enterprise Limits" },
  },
  {
    name: "Enterprise Third-Party Connectors",
    tooltip: "Salesforce, Jira, Confluence, etc.",
    businessStandard: { status: "none" },
    enterprisePlus: { status: "none" },
    aiExpanded: { status: "none" },
    geminiEnterprisePlus: { status: "included" },
  },
  {
    name: "Model Context Protocol (MCP)",
    tooltip: "Custom Agents & API Extensibility",
    businessStandard: { status: "none" },
    enterprisePlus: { status: "none" },
    aiExpanded: { status: "none" },
    geminiEnterprisePlus: { status: "included" },
  },
  {
    name: "Veo 3.1 & Video Generation",
    tooltip: "Video generation in Google Vids",
    businessStandard: { status: "none" },
    enterprisePlus: { status: "none" },
    aiExpanded: { status: "included" },
    geminiEnterprisePlus: { status: "included" },
  },
  {
    name: "Real-Time Speech Translation",
    tooltip: "Cross-Language Translation in Meet",
    businessStandard: { status: "none" },
    enterprisePlus: { status: "included", text: "Included (69+ languages)" },
    aiExpanded: { status: "included" },
    geminiEnterprisePlus: { status: "included" },
  },
  {
    name: "Enterprise Security",
    tooltip: "Model Armor & Cloud Audit Logging",
    businessStandard: { status: "none" },
    enterprisePlus: { status: "limited", text: "Audit Logging Only" },
    aiExpanded: { status: "none" },
    geminiEnterprisePlus: { status: "included", text: "Full Stack Protection" },
  },
];

export default function ComparisonPreview() {
  return (
    <section className="atlas-section py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="atlas-kicker mb-3">Decision intelligence</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Compare Enterprise AI Capabilities
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Understand the critical differences between standard Workspace plans, AI Add-ons, and the flagship Gemini Enterprise standalone platform.
          </p>
        </div>

        <div className="overflow-x-auto pb-8">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr>
                <th className="w-1/4 pb-8 pl-4 pr-4 align-bottom">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Features</span>
                </th>

                {/* Business Standard */}
                <th className="w-[18%] pb-8 px-4 align-bottom">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-muted-foreground uppercase">Google Workspace</span>
                    <span className="text-xl font-bold text-foreground">Business Standard</span>
                    <span className="text-sm text-muted-foreground">\$14/user/mo</span>
                  </div>
                </th>

                {/* Enterprise Plus */}
                <th className="w-[18%] pb-8 px-4 align-bottom">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-muted-foreground uppercase">Google Workspace</span>
                    <span className="text-xl font-bold text-foreground">Enterprise Plus</span>
                    <span className="text-sm text-muted-foreground">Contact Sales</span>
                  </div>
                </th>

                {/* AI Expanded Access */}
                <th className="w-[18%] pb-8 px-4 align-bottom">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-muted-foreground uppercase">Add-on</span>
                    <span className="text-xl font-bold text-foreground">AI Expanded Access</span>
                    <span className="text-sm text-muted-foreground">\$20/user/mo</span>
                  </div>
                </th>

                {/* Gemini Enterprise Plus */}
                <th className="w-[22%] px-6 align-bottom relative bg-gemini-spark/5 rounded-t-2xl border-x border-t border-gemini-spark/20">
                  <div className="mb-3 flex justify-center">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gemini-spark px-3 py-1 text-xs font-bold whitespace-nowrap text-white shadow-md">
                    <Sparkles className="w-3 h-3" /> Recommended for Enterprise
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 pb-8">
                    <span className="text-sm font-semibold text-gemini-spark uppercase">Standalone Flagship</span>
                    <span className="text-xl font-bold text-foreground">Gemini Enterprise Plus</span>
                    <span className="text-sm text-muted-foreground">\$50/user/mo</span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {features.map((feature, idx) => (
                <tr key={idx} className="atlas-row hover:bg-muted/40 transition-colors">
                  <td className="py-4 pl-4 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{feature.name}</span>
                      <div className="group relative cursor-help">
                        <Info className="w-4 h-4 text-muted-foreground/60" />
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-popover text-popover-foreground text-xs rounded py-1 px-2 text-center z-10 shadow-lg border border-border">
                          {feature.tooltip}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-popover" />
                        </div>
                      </div>
                    </div>
                  </td>

                  <StatusCell status={feature.businessStandard.status} text={feature.businessStandard.text} />
                  <StatusCell status={feature.enterprisePlus.status} text={feature.enterprisePlus.text} />
                  <StatusCell status={feature.aiExpanded.status} text={feature.aiExpanded.text} />
                  <StatusCell status={feature.geminiEnterprisePlus.status} text={feature.geminiEnterprisePlus.text} highlight={true} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <Link href="/compare" className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-foreground/90 transition-colors shadow-sm">
            Open Full 11-Plan Availability Matrix (94 Features)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatusCell({ status, text, highlight = false }: { status: FeatureStatus; text?: string; highlight?: boolean }) {
  return (
    <td className={cn("py-4 px-4 text-center", highlight && "bg-gemini-spark/5 border-x border-gemini-spark/20 last:rounded-b-2xl last:border-b")}>
      <div className="flex items-center justify-center">
        {status === "included" && (
          <div className="flex items-center gap-1 text-green-500">
            <div className="w-6 h-6 rounded-full bg-green-500/15 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            {text && <span className="text-sm font-medium ml-1">{text}</span>}
          </div>
        )}
        {status === "limited" && (
          <div className="flex items-center gap-1 text-yellow-500">
            <div className="px-2 py-1 bg-yellow-500/15 rounded text-xs font-semibold whitespace-nowrap">
              {text || "Limited"}
            </div>
          </div>
        )}
        {status === "none" && (
          <div className="text-muted-foreground/30 flex justify-center">
            <Minus className="w-5 h-5 stroke-[3]" />
          </div>
        )}
      </div>
    </td>
  );
}
