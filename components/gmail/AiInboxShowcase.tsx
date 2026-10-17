import Link from "next/link";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";

const sources = [
  {
    title: "Gmail: more personalized and proactive assistance",
    href: "https://workspace.google.com/blog/product-announcements/more-personalized-and-proactive-assistance-in-gmail-coming-to-business-customers",
  },
  {
    title: "June 2026 Workspace feature update",
    href: "https://workspace.google.com/blog/product-announcements/june-2026-workspace-feature-drop",
  },
];

export function AiInboxShowcase() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="rounded-xl bg-red-500/10 p-3 text-red-600"><Mail aria-hidden="true" /></span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Gmail with Gemini</p>
          <h2 className="mt-1 text-2xl font-bold text-foreground">AI assistance in Gmail</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Google has announced AI Overviews for email threads and personalized Help me write. Availability depends on the feature rollout, account, and subscription; check Google’s current release notes before planning a rollout.
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <article className="rounded-xl border border-border p-4">
          <Sparkles aria-hidden="true" className="mb-3 h-5 w-5 text-red-600" />
          <h3 className="font-semibold">Thread summaries</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">AI Overviews can summarize long email conversations so people can review the discussion more quickly.</p>
        </article>
        <article className="rounded-xl border border-border p-4">
          <Sparkles aria-hidden="true" className="mb-3 h-5 w-5 text-red-600" />
          <h3 className="font-semibold">Writing help with context</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">Help me write can use relevant personal context to assist with drafting. Review generated text before sending.</p>
        </article>
      </div>
      <p className="mt-5 text-xs text-muted-foreground">Rollout and eligibility vary. This independent guide is not an availability guarantee.</p>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {sources.map((source) => <Link className="inline-flex items-center gap-1 text-google-blue hover:underline" href={source.href} key={source.href} target="_blank" rel="noreferrer">{source.title}<ArrowUpRight className="h-3.5 w-3.5" /></Link>)}
      </div>
    </section>
  );
}
