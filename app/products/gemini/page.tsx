import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BrainCircuit, CheckCircle2, Database, ShieldCheck, Sparkles } from "lucide-react";
import { GeminiProductExplorer } from "@/components/products/GeminiProductExplorer";
import { features } from "@/data/features";

const geminiFeatureCount = features.filter((feature) => feature.application === "gemini").length;

export const metadata: Metadata = {
  title: "Gemini AI for Work | Capabilities, Plans & Enterprise Grounding",
  description: "Explore Gemini chat, research, creation, Google Workspace integrations, connectors, agents, and enterprise governance in one capability map.",
};

const pillars = [
  { icon: BrainCircuit, title: "One reasoning surface", text: "Chat, research, creation, and multimodal work in a single Gemini experience." },
  { icon: Database, title: "Grounded in your context", text: "Move from Workspace content to governed enterprise sources, connectors, and custom MCP tools." },
  { icon: ShieldCheck, title: "Built for governed adoption", text: "Compare limits, availability, permissions, and enterprise controls before you deploy." },
];

export default function GeminiProductPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-muted/60 via-background to-google-blue/5 pt-28 pb-20">
        <div className="pointer-events-none absolute -right-32 top-12 h-96 w-96 rounded-full bg-google-blue/10 blur-3xl" />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-google-blue/20 bg-google-blue/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-google-blue">
              <Sparkles className="h-3.5 w-3.5" /> Gemini product intelligence
            </div>
            <h1 className="fluid-h1 mb-7 max-w-4xl font-extrabold tracking-tight">The Gemini capability map for <span className="gradient-text">modern work</span>.</h1>
            <p className="fluid-body mb-9 max-w-2xl leading-relaxed text-muted-foreground">Understand what Gemini can do across chat, Workspace, research, media, enterprise grounding, connectors, and agents, then see which plan unlocks each capability.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="#capabilities" className="inline-flex items-center gap-2 rounded-xl bg-google-blue px-5 py-3.5 font-semibold text-white transition hover:bg-google-blue/90">Explore capabilities <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 font-semibold text-foreground transition hover:bg-muted">View pricing</Link>
              <Link href="/enterprise" className="inline-flex items-center gap-2 px-3 py-3.5 font-semibold text-google-blue hover:underline">Enterprise architecture <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
          <div className="mt-16 grid gap-4 border-t border-border/70 pt-8 sm:grid-cols-3">
            <div><span className="text-3xl font-extrabold text-foreground">{geminiFeatureCount}</span><p className="mt-1 text-sm text-muted-foreground">Gemini capabilities indexed</p></div>
            <div><span className="text-3xl font-extrabold text-foreground">10</span><p className="mt-1 text-sm text-muted-foreground">Plan tiers compared</p></div>
            <div><span className="text-3xl font-extrabold text-foreground">3</span><p className="mt-1 text-sm text-muted-foreground">Deployment paths: Workspace, add-ons, Enterprise</p></div>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return <div key={pillar.title} className="border-l-2 border-google-blue/40 pl-5"><Icon className="mb-5 h-6 w-6 text-google-blue" /><h2 className="text-lg font-bold text-foreground">{pillar.title}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.text}</p></div>;
          })}
        </div>
      </section>

      <section id="capabilities" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8"><GeminiProductExplorer /></div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16">
        <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-google-green/10 text-google-green"><CheckCircle2 className="h-6 w-6" /></div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Ready to make a plan decision?</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">Use the availability matrix for a full edition-by-edition view, or model seats and billing commitment on the pricing page.</p>
          <div className="flex flex-wrap justify-center gap-3"><Link href="/compare" className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 font-semibold text-background">Open availability matrix <ArrowRight className="h-4 w-4" /></Link><Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 font-semibold text-foreground">Calculate investment</Link></div>
        </div>
      </section>
    </div>
  );
}
