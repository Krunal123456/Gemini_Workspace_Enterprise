import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CreditCard, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { PricingOverview } from "@/components/pricing/PricingOverview";

export const metadata: Metadata = {
  title: "Gemini Enterprise Pricing | Compare AI Plans",
  description: "Model Gemini Enterprise pricing by deployment type, seats, and billing commitment.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background pb-24 text-foreground">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top_left,_rgba(66,133,244,0.16),transparent_26%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.12),transparent_24%),linear-gradient(to_bottom,_rgba(248,250,252,0.98),_rgba(255,255,255,0.96))] pb-16 pt-24 dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),transparent_22%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),transparent_20%),linear-gradient(to_bottom,_rgba(15,23,42,0.97),_rgba(2,6,23,0.98))]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-google-blue/20 bg-google-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-google-blue">
                <CreditCard className="h-3.5 w-3.5" />
                Gemini Enterprise pricing
              </div>
              <h1 className="text-4xl font-black tracking-[-0.08em] text-foreground sm:text-5xl lg:text-6xl">
                Put advanced AI to work across your entire organization.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Compare Gemini Enterprise Standard and Plus, estimate seat-based deployment cost, and model token consumption against real-world usage patterns.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#pricing-overview" className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90">
                  View pricing
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/compare" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:border-google-blue/40 hover:text-google-blue">
                  Compare plans
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Enterprise-ready", value: "99.9%" },
                  { label: "Workspace fit", value: "Excellent" },
                  { label: "Admin control", value: "Full" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border bg-background/80 p-4 shadow-sm backdrop-blur-sm">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</div>
                    <div className="mt-2 text-2xl font-black text-foreground">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-border bg-card/90 p-6 shadow-[0_30px_80px_-40px_rgba(59,130,246,0.5)] backdrop-blur-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Recommended starting point</p>
                  <h2 className="mt-2 text-2xl font-bold text-foreground">Gemini Enterprise Standard</h2>
                </div>
                <span className="rounded-full border border-google-green/20 bg-google-green/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-google-green">
                  Best fit
                </span>
              </div>

              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-foreground">$30</span>
                  <span className="text-sm text-muted-foreground">/user/month</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Annual commitment, billed annually</p>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "Custom connectors and MCP access",
                  "Advanced Workspace integration",
                  "Enterprise governance and security controls",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-background p-3 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-google-green" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background p-3">
                  <div className="flex items-center gap-2 text-google-blue">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em]">Credit</span>
                  </div>
                  <div className="mt-2 text-2xl font-black text-foreground">$10</div>
                </div>
                <div className="rounded-2xl border border-border bg-background p-3">
                  <div className="flex items-center gap-2 text-google-green">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em]">Control</span>
                  </div>
                  <div className="mt-2 text-2xl font-black text-foreground">Full</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing-overview" className="py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8"><PricingOverview /></div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[30px] border border-border bg-card p-6 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-google-blue">Why enterprises choose it</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-foreground">A single AI layer for productivity, governance, and scale.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Deploy quickly",
                  text: "Start with a pilot team, connect Workspace apps, and expand to the rest of the company without a rip-and-replace migration.",
                },
                {
                  title: "Stay governed",
                  text: "Admin controls, policy alignment, and data boundaries help teams move faster while reducing risk for leadership.",
                },
                {
                  title: "Measure ROI",
                  text: "Use real usage patterns and token modeling to estimate cost, identify the right workload mix, and avoid overspending.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-muted/30 p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-google-blue/10 text-google-blue">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-border bg-gradient-to-br from-google-blue/8 via-background to-google-green/8 p-6 shadow-[0_30px_60px_-35px_rgba(59,130,246,0.45)] sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-google-blue">What you get</p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.05em] text-foreground">Built for decision makers</h3>
            <ul className="mt-6 space-y-3 text-sm text-foreground">
              {[
                "Workspace-native AI workflows across Docs, Sheets, Gmail, and Meet",
                "Enterprise controls aligned with compliance, security, and admin review",
                "Flexible seat models for phased rollouts and line-of-business pilots",
                "Clear token-based forecasting before large-scale deployment",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-background/70 p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-google-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/compare" className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90">
              Compare plans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-border bg-card p-6 sm:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-google-blue">FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-foreground">Common questions before rollout</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "What is the best plan for an enterprise pilot?",
                a: "Most organizations start with Gemini Enterprise Standard because it balances cost, Workspace integration, and admin controls for broad team adoption.",
              },
              {
                q: "Do I need annual commitment?",
                a: "Annual pricing is best for predictability and cost savings, while monthly billing is useful for a short pilot or phased rollout.",
              },
              {
                q: "How do tokens affect my final cost?",
                a: "Usage is modeled by input and output token consumption. The pricing table gives a practical estimate before commitment.",
              },
              {
                q: "Can I compare this to competitors?",
                a: "Yes. The full comparison view helps map pricing, model capabilities, and enterprise fit against other AI platforms.",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-2xl border border-border bg-muted/30 p-5">
                <p className="text-sm font-bold text-foreground">{item.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
