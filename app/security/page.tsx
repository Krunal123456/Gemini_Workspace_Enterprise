import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { SecurityArchitectureMap } from "@/components/security/SecurityArchitectureMap";
import {
  ShieldCheck,
  Lock,
  Key,
  FileCheck,
  Database,
  UserCheck,
  Activity,
  ArrowRight,
  Building2,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

const governanceControls = [
  {
    title: "Data residency",
    icon: Database,
    description: "Restrict customer data and model execution to approved geographies with per-OU residency policy enforcement.",
    detail: "Supports EU/US residency boundaries, region-specific storage, and multi-tenant control planes.",
  },
  {
    title: "DLP",
    icon: FileCheck,
    description: "Scan prompts, attachments, and chat content for regulated data and block leakage before it leaves the tenant.",
    detail: "Protects PII, payment data, health records, and confidential project documents with policy enforcement.",
  },
  {
    title: "CMEK",
    icon: Key,
    description: "Customer-managed encryption keeps key lifecycle ownership in your trusted security domain.",
    detail: "Integrates with KMS and HSM-backed key material for customer-controlled ciphertext rotation and revocation.",
  },
  {
    title: "VPC Service Controls",
    icon: ShieldCheck,
    description: "Define a private perimeter around Google Cloud workloads and sensitive Gemini data to reduce exfiltration risk.",
    detail: "Applies an explicit trusted boundary for data plane interactions and cloud-private access patterns.",
  },
  {
    title: "Audit logs",
    icon: Activity,
    description: "Capture immutable admin and usage events for live security review and post-incident analysis.",
    detail: "Export to BigQuery, SIEM, and Chronicle in near real time for centralized threat hunting and compliance evidence.",
  },
  {
    title: "Retention",
    icon: Building2,
    description: "Implement legal hold, data retention, and automated disposal policies aligned with regulatory mandates.",
    detail: "Works with Vault, retention rules, and classification-based lifecycle policies across Workspace and Gemini data.",
  },
  {
    title: "Access policies",
    icon: UserCheck,
    description: "Use role-based access and context-aware controls to gate AI access by trust signal, device state, and user posture.",
    detail: "Applies zero-trust flow controls and conditional access decisions for high-risk data sets.",
  },
  {
    title: "Model Armor",
    icon: Lock,
    description: "Inspect user prompts and model outputs for jailbreaks, injection attempts, and sensitive data leakage.",
    detail: "Tightly fits the AI safety layer for regulated AI deployments and protected enterprise workflows.",
  },
];

const complianceMatrix = [
  { control: 'Data residency', requirement: 'Geography-aware storage and execution', status: 'Configured via policy-driven regional controls' },
  { control: 'DLP', requirement: 'Sensitive data classification and blocking', status: 'Protects PII, PHI, PCI, and trade secrets' },
  { control: 'CMEK', requirement: 'Key ownership and revocation', status: 'Customer-managed crypto lifecycle support' },
  { control: 'VPC Service Controls', requirement: 'Private perimeter enforcement', status: 'Network boundary protection for Cloud workloads' },
  { control: 'Audit logs', requirement: 'Evidence and forensic visibility', status: 'SIEM-friendly, exportable event telemetry' },
  { control: 'Retention', requirement: 'Legal hold and disposal lifecycle', status: 'Vault-aligned retention and hold controls' },
  { control: 'Access policies', requirement: 'Conditional & zero-trust controls', status: 'Context-aware access and IAM enforcement' },
  { control: 'Model Armor', requirement: 'AI safety filtering', status: 'Prompt injection and output controls' },
  { control: 'HIPAA', requirement: 'Protected health information handling', status: 'BAA coverage and compliant workflows' },
];

export const metadata: Metadata = {
  title: "Enterprise Security & Governance | 7-Layer Defense in Depth for Gemini",
  description: "Explore the 7-layer enterprise security stack protecting Google Workspace and Gemini Enterprise: Model Armor, DLP, Google Vault, CMEK, Context-Aware Access, and zero model training on customer data.",
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <section className="relative overflow-hidden pt-28 pb-20 bg-background text-foreground border-b border-border dark:bg-dark-bg dark:text-white dark:border-dark-border">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-google-green/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-google-green/10 text-google-green text-xs font-semibold uppercase tracking-wider mb-6 border border-google-green/20">
            <ShieldCheck className="w-3.5 h-3.5" /> 7-Layer Defense in Depth
          </div>

          <h1 className="fluid-h1 font-extrabold tracking-tight text-foreground dark:text-white max-w-4xl mx-auto mb-6">
            Enterprise security that never compromises on <span className="text-google-green">privacy</span>.
          </h1>

          <p className="fluid-body text-muted-foreground dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Deploy Gemini Enterprise with total confidence. Backed by Google's global infrastructure, zero-trust context-aware access, automated DLP, Model Armor, and an ironclad contract guarantee.
          </p>

          <div className="max-w-3xl mx-auto bg-muted/50 dark:bg-white/5 border border-google-green/40 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-center gap-3 text-foreground dark:text-white font-semibold text-lg mb-2">
              <Lock className="w-5 h-5 text-google-green" />
              The Customer Data Privacy Guarantee
            </div>
            <p className="text-muted-foreground dark:text-gray-300 text-sm leading-relaxed">
              Google Workspace customer data (including prompt inputs, uploaded documents, generated drafts, and audio recordings) is <strong>NEVER used to train foundation models</strong> without your permission, nor is it shared across customer tenants. Your IP remains exclusively yours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-google-green block mb-2">Architecture Blueprint</span>
            <h2 className="fluid-h2 font-bold tracking-tight text-foreground mb-4">The 7 Layers of Enterprise AI Security</h2>
            <p className="text-muted-foreground">From hardware-backed authentication at the perimeter to immutable BigQuery audit logs at the core.</p>
          </div>

          <SecurityArchitectureMap />
        </div>
      </section>

      <section className="py-20 bg-muted/20 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-google-blue block mb-2">Admin & Governance</span>
            <h3 className="text-2xl font-bold text-foreground mb-4">Enterprise controls for regulated AI deployment</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Security teams need more than model safety — they need enforceable tenant controls, legal retention, and transparent auditability across every AI workflow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {governanceControls.map(({ title, icon: Icon, description, detail }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-google-blue/50 transition-colors">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-google-blue/10 text-google-blue">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">{title}</h4>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{description}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground/90">{detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-muted/50 px-6 py-4">
              <h4 className="text-lg font-semibold text-foreground">Governance and compliance mapping</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3 font-medium">Control</th>
                    <th className="px-6 py-3 font-medium">Requirement</th>
                    <th className="px-6 py-3 font-medium">Operational status</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceMatrix.map((row) => (
                    <tr key={row.control} className="border-t border-border">
                      <td className="px-6 py-4 font-medium text-foreground">{row.control}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.requirement}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <span className="inline-flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-google-green" />
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/20 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">Enterprise Compliance & Certifications</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Google Workspace and Gemini Enterprise maintain compliance against world-class cybersecurity standards and regulatory frameworks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
            {["HIPAA", "SOC 1 / 2 / 3", "ISO 27001", "ISO 27701", "FedRAMP", "GDPR"].map((cert) => (
              <div key={cert} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <span className="font-bold text-sm text-foreground">{cert}</span>
                <span className="text-[11px] text-google-green font-medium block mt-1">Verified</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-google-blue to-gemini-indigo text-white font-medium rounded-xl hover:shadow-lg transition-all"
            >
              Compare Security Across All 11 Plans
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
