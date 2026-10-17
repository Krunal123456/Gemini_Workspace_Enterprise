import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpenCheck, FileCheck2, ShieldCheck } from "lucide-react";
import { resolveLocale, type Locale } from "@/lib/i18n/config";
import { withLocalizedAlternates } from "@/lib/seo";

const metadataByLocale: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Google Cloud and Workspace Compliance Guide",
    description: "Explore Google Cloud and Google Workspace certifications, compliance frameworks, official reports, and product scope notes.",
  },
  es: {
    title: "Guía de cumplimiento de Google Cloud y Workspace",
    description: "Consulta certificaciones, marcos de cumplimiento, informes oficiales y notas sobre el alcance de Google Cloud y Google Workspace.",
  },
};

const groups = [
  {
    title: "Independent certifications and assurance",
    intro: "Google publishes independent audit reports and certifications for defined services, locations, and periods.",
    items: [
      ["SOC reports", "SOC 1, SOC 2, and SOC 3 reports describe controls assessed by independent auditors. Reports are available through the Compliance Reports Manager; access and service scope vary.", "https://cloud.google.com/security/compliance/soc-1-2-3"],
      ["ISO/IEC 27001", "Google lists certificates for Google Cloud and Google Workspace. The certificate can support your assessment; it does not certify your organization.", "https://cloud.google.com/security/compliance/iso-27001"],
      ["ISO/IEC 27017 and 27018", "Cloud security and protection of personally identifiable information in public clouds. Confirm the certificate and service scope in the current report.", "https://cloud.google.com/security/compliance/iso-27017"],
      ["ISO/IEC 27701", "Privacy information management certification information for Google services. Check the current scope and certificate in Google's compliance resources.", "https://cloud.google.com/security/compliance/iso-27701"],
      ["CSA STAR", "Google publishes Cloud Security Alliance STAR program information. Verify the current registry entry and applicable services.", "https://cloud.google.com/security/compliance/csa-star"],
    ],
  },
  {
    title: "Regulations and sector frameworks",
    intro: "These are shared-responsibility programs or framework support, not a blanket certification of every customer deployment.",
    items: [
      ["GDPR", "Google provides contractual terms and resources for customers subject to the EU General Data Protection Regulation. Customers remain responsible for their own processing and configuration.", "https://cloud.google.com/privacy/gdpr"],
      ["HIPAA", "Google Cloud and Workspace can support HIPAA-regulated workloads under applicable terms and a Business Associate Agreement. HHS does not certify a service as HIPAA compliant; customers retain compliance responsibilities.", "https://docs.cloud.google.com/docs/security/compliance/hipaa"],
      ["FedRAMP", "Google Cloud publishes FedRAMP authorization information for specific in-scope offerings and service boundaries. Verify the current authorization and impact level before use.", "https://cloud.google.com/security/compliance/fedramp"],
      ["PCI DSS", "Google Cloud publishes PCI DSS information for eligible services. Customers handling cardholder data must validate their own environment and responsibilities.", "https://cloud.google.com/security/compliance/pci-dss"],
      ["Regional and industry requirements", "Google's compliance catalog also covers additional country, sector, and assurance programs. Use the catalog to confirm current coverage for the exact product.", "https://cloud.google.com/security/compliance/offerings"],
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  return withLocalizedAlternates(metadataByLocale[locale], "/compliance", locale);
}

export default async function CompliancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const spanish = locale === "es";

  return (
    <main className="min-h-screen bg-background pb-24 text-foreground">
      <section className="border-b border-border bg-muted/20 pt-28 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-google-blue/20 bg-google-blue/10 px-3 py-1.5 text-xs font-semibold text-google-blue">
            <ShieldCheck className="h-4 w-4" />{spanish ? "Alcance y fuentes oficiales" : "Scope and official sources"}
          </div>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">{spanish ? "Cumplimiento y certificaciones" : "Compliance and certifications"}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
            {spanish
              ? "Una guía para encontrar los programas de cumplimiento publicados por Google Cloud y Workspace y verificar su alcance. La cobertura depende del servicio, la edición, la región, el contrato y la configuración."
              : "A guide to the compliance programs published by Google Cloud and Workspace and where to verify their scope. Coverage depends on service, edition, region, contract, and configuration."}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="https://cloud.google.com/security/compliance/offerings" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background hover:opacity-90">
              {spanish ? "Catálogo oficial de cumplimiento" : "Official compliance catalog"}<ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="https://cloud.google.com/security/compliance/compliance-reports-manager" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold hover:bg-muted">
              {spanish ? "Informes y certificados" : "Reports and certificates"}<FileCheck2 className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-14 px-4 py-14 sm:px-6 lg:px-8">
        {groups.map((group) => (
          <section key={group.title} aria-labelledby={group.title.replaceAll(" ", "-").toLowerCase()}>
            <div className="mb-6 max-w-3xl">
              <h2 id={group.title.replaceAll(" ", "-").toLowerCase()} className="text-2xl font-bold">{spanish ? (group.title.startsWith("Independent") ? "Certificaciones y auditorías independientes" : "Regulaciones y marcos sectoriales") : group.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{group.intro}</p>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {group.items.map(([title, description, url]) => (
                <li key={title} className="grid gap-2 py-5 sm:grid-cols-[minmax(12rem,0.7fr)_1.5fr] sm:gap-8 sm:py-6">
                  <h3 className="font-semibold">{title}</h3>
                  <div>
                    <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                    <a className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-google-blue underline-offset-4 hover:underline" href={url} target="_blank" rel="noreferrer">
                      {spanish ? "Ver fuente de Google" : "View Google source"}<ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <aside className="rounded-2xl border border-google-blue/20 bg-google-blue/5 p-6 sm:p-8">
          <div className="flex gap-4">
            <BookOpenCheck className="mt-1 h-6 w-6 shrink-0 text-google-blue" />
            <div>
              <h2 className="text-xl font-bold">{spanish ? "Verifica el alcance antes de afirmar cobertura" : "Verify scope before asserting coverage"}</h2>
              <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
                {spanish
                  ? "Esta página resume programas de Google; este sitio no afirma tener estas certificaciones ni certifica tu organización. No implica que cada función de Gemini Enterprise esté incluida en todos los informes. Comprueba el producto y servicio exactos en el catálogo y en los informes vigentes; para requisitos legales, consulta a tu equipo jurídico."
                  : "This page summarizes Google programs; this site does not claim to hold these certifications, and the page does not certify your organization. It does not imply every Gemini Enterprise feature is included in every report. Check the exact product and service in the current catalog and reports; consult your legal team for legal requirements."}
              </p>
              <Link href="/security" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-google-blue hover:underline">{spanish ? "Ver controles de seguridad y Model Armor" : "Review security controls and Model Armor"}<ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
