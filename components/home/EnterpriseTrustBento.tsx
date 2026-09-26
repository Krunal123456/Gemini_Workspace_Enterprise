import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Database,
  FileCheck2,
  LockKeyhole,
  ScanEye,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const ACCENT_CLASSES: Record<string, string> = {
  violet: "text-violet-200",
  blue: "text-blue-200",
  green: "text-emerald-200",
  gold: "text-amber-200",
  coral: "text-rose-200",
};

const TRUST_PILLARS = [
  {
    id: "data",
    icon: ShieldCheck,
    title: "Customer data stays yours.",
    body: "Workspace terms restrict training on customer data for Workspace Generative AI Services without prior permission or instruction.",
    meta: "Contract terms · Workspace AI",
    source: "https://workspace.google.com/terms/service-terms/",
    sourceLabel: "Read Workspace terms",
    accent: "violet",
  },
  {
    id: "grounding",
    icon: Database,
    title: "Ground work in the right context.",
    body: "Use Workspace content, connected data sources, and eligible enterprise connectors to bring relevant context into a task.",
    meta: "Drive · Docs · approved sources",
    href: "/enterprise/connectors",
    sourceLabel: "Explore connectors",
    accent: "blue",
  },
  {
    id: "admin",
    icon: LockKeyhole,
    title: "Controls belong in the workflow.",
    body: "Explore identity, access, data protection, retention, and audit controls. Specific features depend on edition and configuration.",
    meta: "Admin controls · edition dependent",
    href: "/security",
    sourceLabel: "Review security layers",
    accent: "green",
  },
  {
    id: "review",
    icon: FileCheck2,
    title: "Keep a person in the loop.",
    body: "Review generated drafts, verify source material, and authorize actions before an agent changes external systems.",
    meta: "Draft · verify · approve",
    href: "/enterprise/agents",
    sourceLabel: "Explore agent controls",
    accent: "gold",
  },
  {
    id: "models",
    icon: ScanEye,
    title: "Choose a model for the task.",
    body: "Compare current Gemini model families by release status and use case, then check availability for your deployment.",
    meta: "Gemini model catalog",
    href: "/models",
    sourceLabel: "Compare models",
    accent: "coral",
  },
  {
    id: "orchestration",
    icon: Workflow,
    title: "Connect tools with guardrails.",
    body: "MCP and agent workflows can coordinate across systems when permissions, scope, and human supervision are configured.",
    meta: "MCP · agents · approvals",
    href: "/enterprise/agents",
    sourceLabel: "Explore orchestration",
    accent: "violet",
  },
];

export function EnterpriseTrustBento() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#0b0912] py-20 text-white md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-violet-200">Designed for enterprise reality</p>
            <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Intelligence with boundaries.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/60 md:justify-self-end">
            Data use, control availability, and agent permissions depend on the Workspace service, edition, configuration, and applicable agreement. Follow the primary sources for your deployment.
          </p>
        </div>

        <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-3">
          {TRUST_PILLARS.map(({ id, icon: Icon, title, body, meta, href, source, sourceLabel, accent }) => {
            const destination = href ?? source ?? "/security";
            return (
              <article key={id} data-spotlight className="spotlight-surface group relative min-h-[252px] overflow-hidden bg-[#100d18] p-5 sm:p-7">
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-7 flex items-center justify-between gap-4">
                    <span className={`flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.035] ${ACCENT_CLASSES[accent]}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    {id === "orchestration" ? <Bot className="h-4 w-4 text-white/30" /> : <ShieldCheck className="h-4 w-4 text-white/25" />}
                  </div>
                  <h3 className="max-w-sm text-xl font-semibold leading-snug">{title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/60">{body}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                    <span className="text-[10px] font-medium uppercase tracking-[0.11em] text-white/35">{meta}</span>
                    <Link href={destination} target={source ? "_blank" : undefined} rel={source ? "noreferrer" : undefined} className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-white/75 transition-colors hover:text-violet-200">
                      {sourceLabel}<ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}