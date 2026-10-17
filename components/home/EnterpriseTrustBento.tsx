"use client";

import Link from "next/link";
import { ArrowUpRight, Database, FileCheck2, LockKeyhole, ShieldCheck } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const TRUST_PILLARS = [
  {
    id: "data",
    icon: ShieldCheck,
    title: "Customer data stays yours.",
    body: "Workspace terms restrict training on customer data for Workspace Generative AI Services without prior permission or instruction.",
    meta: "Contract terms · Workspace AI",
    source: "https://workspace.google.com/terms/service-terms/",
    sourceLabel: "Read Workspace terms",
  },
  {
    id: "grounding",
    icon: Database,
    title: "Ground work in the right context.",
    body: "Use Workspace content, connected data sources, and eligible enterprise connectors to bring relevant context into a task.",
    meta: "Drive · Docs · approved sources",
    href: "/enterprise/connectors",
    sourceLabel: "Explore connectors",
  },
  {
    id: "admin",
    icon: LockKeyhole,
    title: "Controls belong in the workflow.",
    body: "Explore identity, access, data protection, retention, and audit controls. Specific features depend on edition and configuration.",
    meta: "Admin controls · edition dependent",
    href: "/security",
    sourceLabel: "Review security layers",
  },
  {
    id: "review",
    icon: FileCheck2,
    title: "Keep people in control.",
    body: "Review generated work, verify source material, and define approval steps before an agent acts across systems.",
    meta: "Agents · review · approvals",
    href: "/enterprise/agents",
    sourceLabel: "Explore agent guidance",
  },
];

export function EnterpriseTrustBento() {
  const { locale, href } = useLocale();
  const t = createPhraseTranslator(locale);

  return (
    <section id="enterprise" data-tour="enterprise" className="relative overflow-hidden border-b border-white/10 bg-[#0b223a] py-20 text-white md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-end">
          <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{t("Intelligence with boundaries.")}</h2>
          <p className="max-w-xl text-sm leading-7 text-blue-100/75 md:justify-self-end">
            {t("Data use, control availability, and agent permissions depend on the Workspace service, edition, configuration, and applicable agreement. Follow the primary sources for your deployment.")}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {TRUST_PILLARS.map(({ id, icon: Icon, title, body, meta, href: hrefOverride, source, sourceLabel }, index) => {
            const destination = source ?? href(hrefOverride ?? "/security");
            const accent = index === 2 ? "text-emerald-200 border-emerald-300/20 bg-emerald-300/10" : "text-blue-200 border-blue-300/20 bg-blue-300/10";

            return (
              <SpotlightCard
                key={id}
                spotlightColor={index === 2 ? "rgba(52,168,83,0.15)" : "rgba(66,133,244,0.15)"}
                borderGlowColor={index === 2 ? "rgba(52,168,83,0.35)" : "rgba(66,133,244,0.35)"}
                enableTilt={false}
                enableBorderBeam={false}
                className="flex min-h-[250px] flex-col rounded-2xl border border-white/12 bg-white/[0.045] p-6 shadow-sm transition-colors duration-200 hover:border-blue-300/45 hover:bg-white/[0.075] sm:p-7"
              >
                <div className="flex h-full flex-col">
                  <span className={`mb-6 flex h-11 w-11 items-center justify-center rounded-xl border ${accent}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="max-w-sm text-lg font-semibold leading-snug text-white">{t(title)}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-blue-100/70">{t(body)}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/12 pt-5">
                    <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-blue-100/55">{t(meta)}</span>
                    <Link
                      href={destination}
                      target={source ? "_blank" : undefined}
                      rel={source ? "noreferrer" : undefined}
                      className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-white transition-colors hover:text-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b223a]"
                    >
                      {t(sourceLabel)}<ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
