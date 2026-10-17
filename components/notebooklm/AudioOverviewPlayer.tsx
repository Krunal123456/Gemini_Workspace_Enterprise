import Link from "next/link";
import { ArrowUpRight, Headphones, NotebookPen } from "lucide-react";

export function AudioOverviewPlayer() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="rounded-xl bg-google-blue/10 p-3 text-google-blue"><Headphones aria-hidden="true" /></span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">NotebookLM</p>
          <h2 className="mt-1 text-2xl font-bold text-foreground">Audio Overviews from your notebook sources</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            NotebookLM can turn notebook materials into an audio overview. Treat generated audio as a summary: check important details and conclusions in the original sources.
          </p>
        </div>
      </div>
      <div className="mt-6 rounded-xl border border-border bg-background p-4">
        <div className="flex items-start gap-3">
          <NotebookPen aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-google-blue" />
          <p className="text-sm leading-6 text-muted-foreground">This page explains the feature; it is not a sample recording or a reproduction of NotebookLM output. Product availability and controls can vary by account.</p>
        </div>
        <Link className="mt-4 inline-flex items-center gap-1 text-sm text-google-blue hover:underline" href="https://notebooklm.google.com/" target="_blank" rel="noreferrer">Explore NotebookLM<ArrowUpRight className="h-3.5 w-3.5" /></Link>
      </div>
    </section>
  );
}
