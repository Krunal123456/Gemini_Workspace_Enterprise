import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Hero } from "@/components/hero/Hero";
import { SynapticConnectorBeam } from "@/components/hero/SynapticConnectorBeam";
import ComparisonPreview from "@/components/home/ComparisonPreview";
import EnterpriseSection from "@/components/home/EnterpriseSection";
import SecurityPreview from "@/components/home/SecurityPreview";
import ArticlesTeaser from "@/components/home/ArticlesTeaser";
import { LatestModelShowcase } from "@/components/home/LatestModelShowcase";
import { features } from "@/data/features";

const featureCount = features.length;

export const metadata: Metadata = {
  title: "Gemini Enterprise AI Intelligence | Discover Every Google Workspace AI Capability",
  description: `The definitive intelligence platform for Google Workspace & Gemini AI. Explore ${featureCount} features, compare 11 plans, discover enterprise connectors, MCP, and security governance.`,
};

export default function HomePage() {
  const narrative = [
    {
      step: "01",
      title: "Discover",
      description: "Search across Workspace data, Drive files, Docs, chats, and external enterprise systems through one grounded intelligence layer.",
      accent: "from-[#4285F4]/18 via-[#4285F4]/8 to-transparent",
    },
    {
      step: "02",
      title: "Connect",
      description: "Link Gmail, Meet, Docs, Sheets, Drive, and Gemini through source-aware workflows built for operational speed and enterprise trust.",
      accent: "from-[#34A853]/18 via-[#34A853]/8 to-transparent",
    },
    {
      step: "03",
      title: "Govern",
      description: "Apply admin controls, security guardrails, audit visibility, and policy-safe orchestration before scale-up begins.",
      accent: "from-[#1A73E8]/18 via-[#1A73E8]/8 to-transparent",
    },
    {
      step: "04",
      title: "Scale",
      description: "Roll out with measurable ROI, adoption metrics, and a deployment path designed for mature enterprise transformation.",
      accent: "from-[#FBBC04]/18 via-[#FBBC04]/8 to-transparent",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Hero />

      <section className="relative overflow-hidden border-b border-border bg-background py-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.10),_transparent_25%)]" />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="atlas-kicker">Enterprise trust</span>
              <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Built for the operating realities of global teams.
              </h2>
            </div>
            <Link href="/compare" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-semibold text-foreground transition-all hover:border-blue-400/30 hover:text-blue-700">
              Compare enterprise fit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { value: "11", label: "plan editions mapped", detail: "From basic Workspace AI to enterprise-grade Gemini deployments." },
              { value: "89", label: "capabilities indexed", detail: "Product, admin, security, and adoption pathways covered in one place." },
              { value: "24/7", label: "operational clarity", detail: "Built to help teams assess fit, governance, and rollout confidence." },
              { value: "100%", label: "source-aware structure", detail: "Features and comparisons stay organized for enterprise buying teams." },
            ].map((item, index) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-border bg-card/80 p-5 shadow-[0_18px_60px_-35px_rgba(59,130,246,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="text-3xl font-black tracking-[-0.08em] text-foreground">{item.value}</div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{item.label}</div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LatestModelShowcase />

      <section className="relative overflow-hidden border-b border-border bg-background py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(66,133,244,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.12),_transparent_30%)]" />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center md:text-left">
            <span className="atlas-kicker">Why teams switch</span>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              From scattered apps to a single AI operating system.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                title: "Context-rich answers",
                text: "Grounded responses pull from Workspace activity, files, and enterprise systems to reduce guesswork and boost accuracy.",
                tags: ["Drive", "Docs", "Chats"],
              },
              {
                title: "Decision-grade workflows",
                text: "Move from raw data to board-ready summaries, procurement insight, pipeline analysis, and operational recommendations.",
                tags: ["Meet", "Sheets", "Reporting"],
              },
              {
                title: "Secure by default",
                text: "Govern usage, preserve compliance, and enforce admin controls before the broader rollout across teams and departments.",
                tags: ["Policies", "Audit", "Access"],
              },
            ].map((item) => (
              <div key={item.title} className="luxury-panel relative overflow-hidden rounded-[28px] border border-border bg-card/80 p-6 shadow-[0_28px_80px_-40px_rgba(30,64,175,0.45)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.12),transparent_32%)]" />
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-200">
                    Signal
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="luxury-panel relative overflow-hidden rounded-[30px] border border-border bg-card/90 p-6 shadow-[0_35px_100px_-42px_rgba(59,130,246,0.45)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.14),transparent_22%),radial-gradient(circle_at_80%_80%,rgba(52,211,153,0.12),transparent_26%)]" />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Operating model</span>
                    <h3 className="mt-2 text-2xl font-semibold text-foreground">Workspace intelligence stack</h3>
                  </div>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                    Active
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Research grounding", width: "92%" },
                    { label: "Workflow automation", width: "84%" },
                    { label: "Policy governance", width: "89%" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        <span>{item.label}</span>
                        <span>{item.width}</span>
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-emerald-400" style={{ width: item.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { value: "74%", label: "Workflow automation uplift" },
                { value: "2.3x", label: "Faster decision cycles" },
                { value: "100%", label: "Audit visibility for governance" },
              ].map((item) => (
                <div key={item.label} className="luxury-panel rounded-[28px] border border-border bg-card/80 p-5">
                  <div className="text-4xl font-black tracking-[-0.08em] text-foreground">{item.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border bg-background py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(66,133,244,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.12),_transparent_30%)]" />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 text-center md:text-left">
            <span className="atlas-kicker">Platform architecture</span>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Turn fragmented productivity into an AI operating layer.
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              One platform for discovery, connection, governance, and scale — built for teams that need clarity, speed, and enterprise confidence.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-5">
              {narrative.map((item, index) => (
                <div
                  key={item.step}
                  className="group relative overflow-hidden rounded-[28px] border border-border bg-card/85 p-5 shadow-[0_22px_60px_-35px_rgba(15,23,42,0.3)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/25 hover:shadow-[0_28px_80px_-38px_rgba(59,130,246,0.32)]"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.accent}`} />
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background text-sm font-bold text-foreground shadow-sm">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Flow</span>
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="story-card-visual relative overflow-hidden rounded-[32px] border border-border bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 p-6 shadow-[0_30px_80px_-35px_rgba(66,133,244,0.28)] dark:from-[#101827] dark:via-[#1f2937] dark:to-[#111827]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(66,133,244,0.26),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(52,168,83,0.20),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(26,115,232,0.14),transparent_30%)]" />
              <div className="relative flex h-full flex-col justify-between gap-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-300">
                    AI system map
                  </span>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                    Live
                  </span>
                </div>

                <div className="relative flex min-h-[340px] items-center justify-center">
                  <div className="absolute h-52 w-52 rounded-full border border-slate-200 bg-white/50 blur-2xl dark:border-white/10 dark:bg-white/5" />
                  <div className="absolute h-72 w-72 rounded-full border border-dashed border-slate-300/80 dark:border-white/10" />
                  <div className="absolute h-44 w-44 rounded-full border border-dashed border-indigo-300/40 dark:border-indigo-300/20" />

                  <div className="relative flex flex-wrap items-center justify-center gap-3">
                    {[
                      "Workspace",
                      "Gemini",
                      "Drive",
                      "Meet",
                      "Docs",
                      "Connectors",
                      "Security",
                      "Agents",
                    ].map((item, idx) => (
                      <div
                        key={item}
                        className="rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs font-medium text-slate-700 shadow-[0_0_18px_rgba(59,130,246,0.10)] dark:border-white/10 dark:bg-white/6 dark:text-slate-100"
                        style={{ transform: `translateY(${idx % 2 === 0 ? -8 : 8}px)` }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Grounded search", value: "96%" },
                    { label: "Policy-safe orchestration", value: "87%" },
                    { label: "Adoption readiness", value: "82%" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white/75 p-3 dark:border-white/10 dark:bg-white/5">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{stat.label}</div>
                      <div className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature catalogue teaser; the full explorer lives on /features */}
      <section id="features" className="border-b border-border bg-muted/20 py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-google-blue">Feature intelligence</span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">One catalogue. Every Gemini capability.</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">The complete {featureCount}-feature explorer is organized by product, application, category, plan, and availability.</p>
            </div>
            <Link href="/features" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-foreground px-5 py-3.5 text-sm font-semibold text-background transition hover:opacity-90">Open full feature catalogue <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Link href="/products/gemini" className="atlas-card atlas-reveal group rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-sm"><span className="text-sm font-bold text-foreground group-hover:text-google-blue">Gemini Chat</span><span className="mt-2 block text-sm text-muted-foreground">Chat, grounding, research, and creation.</span></Link>
            <Link href="/products/notebooklm" className="atlas-card atlas-reveal group rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-sm [animation-delay:100ms]"><span className="text-sm font-bold text-foreground group-hover:text-google-blue">NotebookLM</span><span className="mt-2 block text-sm text-muted-foreground">Source-grounded research and study tools.</span></Link>
            <Link href="/products/gemini-enterprise" className="atlas-card atlas-reveal group rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-sm [animation-delay:200ms]"><span className="text-sm font-bold text-foreground group-hover:text-google-blue">Gemini Enterprise</span><span className="mt-2 block text-sm text-muted-foreground">Connectors, agents, MCP, and governance.</span></Link>
          </div>
        </div>
      </section>

      {/* Plan Availability & Comparison Preview */}
      <section id="compare" className="py-24 bg-background border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <ComparisonPreview />
        </div>
      </section>

      {/* Enterprise Capabilities, MCP & Connectors (Dark Mode) */}
      <section id="enterprise">
        <EnterpriseSection />
      </section>

      {/* 7-Layer Enterprise Security Stack */}
      <section id="security" className="border-t border-border">
        <SecurityPreview />
      </section>

      {/* Strategic Articles & Partner Intelligence */}
      <section id="articles" className="border-t border-border">
        <ArticlesTeaser />
      </section>

      {/* Global Call to Action */}
      <section id="cta" className="py-24 bg-muted/40 relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-10 md:p-16 text-center border border-[#4285F4]/20 shadow-2xl dark:from-[#101827] dark:via-[#1f2937] dark:to-[#111827]">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#4285F4]/12 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#34A853]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4285F4]/10 text-[#dbeafe] text-sm font-medium mb-6 border border-[#4285F4]/20">
                <Sparkles className="w-4 h-4 text-[#8ab4f8]" />
                Enterprise Procurement & Advisory
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
                Ready to architect your organization's Gemini AI roadmap?
              </h2>

              <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                Explore full availability across all 11 plans, test the {featureCount}-feature interactive matrix, or schedule a strategic planning session with our enterprise advisors.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/compare"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                >
                  Open Availability Matrix
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/features"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  Browse Feature Directory
                </Link>
              </div>

              <p className="mt-8 text-xs text-slate-400 tracking-wide">
                Backed by MarketStar Enterprise Advisory • Official Google Cloud Ecosystem Partner
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
