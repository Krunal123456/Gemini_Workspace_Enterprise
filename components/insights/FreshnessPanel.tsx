"use client";

const changes = [
  { date: "2026-09-22", title: "Gemini Enterprise environment refreshed", detail: "Grounding and connector signals reviewed for enterprise readiness." },
  { date: "2026-08-12", title: "NotebookLM enterprise workflow updates", detail: "Research and source-grounding guidance revised for hybrid teams." },
  { date: "2026-07-10", title: "Google Workspace AI pricing refresh", detail: "Price and plan availability checks updated across all editions." },
  { date: "2026-06-04", title: "MCP and agent governance notes revised", detail: "Enterprise security and access patterns updated for MCP rollout guidance." },
];

export function FreshnessPanel() {
  return (
    <section className="atlas-card rounded-2xl border p-6 sm:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="atlas-kicker mb-2">Content freshness</p>
          <h2 className="text-2xl font-bold text-foreground">Verified and current</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border bg-muted/50 px-3 py-1.5">Verified September 2026</span>
          <span className="rounded-full border border-border bg-muted/50 px-3 py-1.5">Source updated</span>
          <span className="rounded-full border border-border bg-muted/50 px-3 py-1.5">Pricing last checked</span>
          <span className="rounded-full border border-border bg-muted/50 px-3 py-1.5">Feature status changed</span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {changes.map((item) => (
          <div key={item.date} className="rounded-xl border border-border bg-muted/20 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-wider text-google-blue">{item.date}</p>
              <span className="rounded-full bg-google-green/10 px-2 py-1 text-[10px] font-semibold uppercase text-google-green">Updated</span>
            </div>
            <p className="mt-3 text-sm font-semibold text-foreground">{item.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
