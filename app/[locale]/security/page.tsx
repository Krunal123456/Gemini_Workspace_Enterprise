import {
  getPlans,
  getSecurityLayers,
} from "@/lib/i18n/data";
import { resolveLocale, type Locale } from "@/lib/i18n/config";
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
} from "lucide-react";

import { createPhraseTranslator, type PhraseTranslator } from "@/lib/i18n/translate";
const governanceControls = (t: PhraseTranslator) => [
  {
    title: t("Data residency"),
    icon: Database,
    description: t("Google Workspace Enterprise Data Regions can apply policy settings to supported services."),
    detail: t("Confirm which data, services, and regions are covered by your selected edition and configuration."),
  },
  {
    title: t("DLP"),
    icon: FileCheck,
    description: t("Workspace administrators can configure DLP policies for supported apps and content."),
    detail: t("Check which content types and AI surfaces are covered by your policies and selected edition."),
  },
  {
    title: t("CMEK"),
    icon: Key,
    description: t("Customer-managed or client-side encryption is available for supported services and editions."),
    detail: t("Confirm supported apps, data types, regions, and administrative prerequisites before relying on it."),
  },
  {
    title: t("VPC Service Controls"),
    icon: ShieldCheck,
    description: t("VPC Service Controls define service perimeters for supported Google Cloud resources."),
    detail: t("Confirm whether the Gemini service and workflows you plan to use are supported inside your perimeter."),
  },
  {
    title: t("Audit logs"),
    icon: Activity,
    description: t("Workspace and Google Cloud products expose audit logs with different event coverage."),
    detail: t("Check which events are available, how to export them, and the retention period for your service."),
  },
  {
    title: t("Retention"),
    icon: Building2,
    description: t("Google Vault policies apply to supported Workspace services and data."),
    detail: t("Check whether the specific AI inputs, outputs, and files you care about are covered by Vault."),
  },
  {
    title: t("Access policies"),
    icon: UserCheck,
    description: t("Workspace and Google Cloud provide access controls for supported services and resources."),
    detail: t("Verify which administrators, users, connectors, and AI features are governed by each policy."),
  },
  {
    title: t("Model Armor"),
    icon: Lock,
    description: t("Model Armor can screen Gemini Enterprise prompts and responses using administrator-configured templates."),
    detail: t("It is supported on all Gemini Enterprise editions at no additional cost. It must be configured, can add latency, and does not mask PII."),
  },
];

const complianceMatrix = (t: PhraseTranslator) => [
  { control: t("Data residency"), requirement: t("Which services and data are covered by the selected region policy?") },
  { control: t("DLP"), requirement: t("Which AI surfaces and content types are covered by the configured policies?") },
  { control: t("CMEK / client-side encryption"), requirement: t("Which editions, services, and data types support the required key controls?") },
  { control: t("VPC Service Controls"), requirement: t("Is the exact Gemini service integration supported inside the perimeter?") },
  { control: t("Audit logs"), requirement: t("Which events are available, exportable, and retained for this product?") },
  { control: t("Retention"), requirement: t("Are the relevant AI inputs, outputs, and files covered by Vault policies?") },
  { control: t("Access policies"), requirement: t("Which users, admins, connectors, and AI features does each policy govern?") },
  { control: t("Model Armor"), requirement: t("Are prompt and response templates configured, and what is the failure behavior?") },
  { control: t("HIPAA"), requirement: t("Are the selected services on the included-functionality list, and is a BAA in place?") },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const t = createPhraseTranslator(locale);
  return {
    title: t("Gemini Enterprise Security & Governance Guide"),
    description: t("Review Google Workspace and Gemini Enterprise security controls, edition requirements, configuration questions, and official privacy documentation."),
  };
}

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const t = createPhraseTranslator(locale);
  const securityLayers = getSecurityLayers(locale);
  const plans = getPlans(locale);
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <section className="relative overflow-hidden pt-28 pb-20 bg-background text-foreground border-b border-border">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-google-green/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-google-green/10 text-google-green text-xs font-semibold uppercase tracking-wider mb-6 border border-google-green/20">
            <ShieldCheck className="w-3.5 h-3.5" /> {t("Product controls and configuration")}
          </div>

          <h1 className="fluid-h1 font-extrabold tracking-tight text-foreground max-w-4xl mx-auto mb-6">
            {t("Understand the security controls available for ")}
            <span className="text-google-green">{t("your setup")}</span>.
          </h1>

          <p className="fluid-body text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            {t("Review the controls Google documents for Workspace with Gemini and Gemini Enterprise.")} {t("Availability depends on product, edition, region, and administrator configuration.")}
          </p>

          <div className="max-w-3xl mx-auto bg-muted/50 border border-google-green/40 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-center gap-3 text-foreground font-semibold text-lg mb-2">
              <Lock className="w-5 h-5 text-google-green" />{t("Read the applicable data protection terms")}</div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("Google states that Workspace data used with Gemini is not reviewed by humans or used to train generative AI models outside your domain without permission. For Gemini Enterprise Business, Standard, and Plus, Google says customer data is not used to train Google models or models for other customers. Review the governing terms for your service and subscription.")}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold">
              <a href="https://workspace.google.com/security/ai-privacy/" target="_blank" rel="noreferrer" className="text-google-blue hover:underline">{t("Workspace AI privacy")}</a>
              <a href="https://cloud.google.com/gemini-enterprise" target="_blank" rel="noreferrer" className="text-google-blue hover:underline">{t("Gemini Enterprise privacy")}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-google-green block mb-2">{t("Architecture Blueprint")}</span>
            <h2 className="fluid-h2 font-bold tracking-tight text-foreground mb-4">{t("A seven-part security review")}</h2>
            <p className="text-muted-foreground">{t("A conceptual map of controls to review. The services, editions, and configurations that support each control vary.")}</p>
          </div>

          <SecurityArchitectureMap />
        </div>
      </section>

      <section className="py-20 bg-muted/20 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-google-blue block mb-2">{t("Admin & Governance")}</span>
            <h3 className="text-2xl font-bold text-foreground mb-4">{t("Enterprise controls for regulated AI deployment")}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("Security teams should verify how identity, data access, retention, and audit controls apply to each AI workflow.")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {governanceControls(t).map(({ title, icon: Icon, description, detail }) => (
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
              <h4 className="text-lg font-semibold text-foreground">{t("Questions to validate before rollout")}</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3 font-medium">{t("Control")}</th>
                    <th className="px-6 py-3 font-medium">{t("Confirm for your service and edition")}</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceMatrix(t).map((row) => (
                    <tr key={row.control} className="border-t border-border">
                      <td className="px-6 py-4 font-medium text-foreground">{row.control}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.requirement}</td>
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
            <h3 className="text-2xl font-bold text-foreground mb-4">{t("Check Google's compliance documentation")}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Certification and regulatory coverage applies to specific Google services and use cases. Confirm the scope in Google's current documentation and your contract.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Workspace AI privacy", "https://workspace.google.com/security/ai-privacy/"],
              ["Gemini Enterprise editions", "https://docs.cloud.google.com/gemini/enterprise/docs/editions"],
              ["Model Armor setup", "https://docs.cloud.google.com/gemini/enterprise/docs/enable-model-armor"],
              ["HIPAA included functionality", "https://knowledge.workspace.google.com/admin/compliance/hipaa-compliance-with-google-workspace-and-cloud-identity"],
            ].map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" className="rounded-xl border border-border bg-card p-4 shadow-sm transition hover:border-google-blue/40 hover:bg-muted/40">
                <span className="block font-bold text-sm text-foreground">{label}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-google-blue">{t("Open Google source")}<ArrowRight className="h-3 w-3" /></span>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/compare" className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90">
              {t("Compare {n} listed plans", { n: plans.length })} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
