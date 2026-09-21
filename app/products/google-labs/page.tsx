import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Code2, Rocket, Sparkles } from "lucide-react";
import { ProductCapabilityHub } from "@/components/products/ProductCapabilityHub";

export const metadata: Metadata = {
  title: "Google Labs AI Capabilities & Plan Availability | Gemini Intelligence",
  description: "Explore Flow, Whisk, Project Mariner, and Antigravity availability through Google Labs and AI Ultra.",
};

export default function GoogleLabsProductPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/20 py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-google-blue">Google Labs spotlight</p>
              <h1 className="max-w-3xl text-4xl font-black tracking-[-0.08em] text-foreground sm:text-5xl">Antigravity is the frontier coding agent for enterprise experimentation.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                Antigravity brings autonomous software development patterns into a practical enterprise setting: codebase inspection, refactoring, testing, and multi-step execution with high trust and operational oversight.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/features/google-labs-antigravity" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90">
                  Open Antigravity feature page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-[30px] border border-border bg-card/90 p-6 shadow-[0_30px_80px_-40px_rgba(59,130,246,0.4)]">
              <div className="mb-5 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Antigravity
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                  Example use
                </span>
              </div>

              <div className="grid gap-3">
                {[
                  { icon: <Bot className="h-4 w-4 text-blue-600" />, title: "What it is", text: "An agentic coding assistant that operates across repositories, tasks, and terminal workflows." },
                  { icon: <Code2 className="h-4 w-4 text-violet-600" />, title: "What it does", text: "Refactors code, generates tests, and handles multi-file changes with broader repository context." },
                  { icon: <Rocket className="h-4 w-4 text-emerald-600" />, title: "What it is used for", text: "Code modernization, migration, quality automation, and developer velocity at enterprise scale." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border bg-background p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                      {item.icon}
                      {item.title}
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductCapabilityHub eyebrow="Google Labs" title="Track the frontier experiences attached to AI Ultra." description="Explore Google Labs capabilities including Flow, Whisk, Project Mariner, and Antigravity, with transparent plan availability." filterKey="google-labs" />
    </>
  );
}
