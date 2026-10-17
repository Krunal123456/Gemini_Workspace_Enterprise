import Link from "next/link";
import { ArrowUpRight, Cable, ShieldCheck } from "lucide-react";

const source = "https://docs.cloud.google.com/gemini/enterprise/docs/connectors/custom-mcp-server/set-up-custom-mcp-server";

export function CoworkerAgentShowcase() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="rounded-xl bg-google-blue/10 p-3 text-google-blue"><Cable aria-hidden="true" /></span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Documented integration</p>
          <h2 className="mt-1 text-2xl font-bold text-foreground">Connect Gemini Enterprise to custom tools</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Gemini Enterprise documents custom Model Context Protocol (MCP) server connections for exposing tools to the assistant. This is an integration setup, not an independently provisioned Workspace user or email account.
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <article className="rounded-xl border border-border p-4">
          <Cable aria-hidden="true" className="mb-3 h-5 w-5 text-google-blue" />
          <h3 className="font-semibold">Transport and action limits</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">The current setup guide specifies Streamable HTTP transport and documents a maximum of 100 actions per server.</p>
        </article>
        <article className="rounded-xl border border-border p-4">
          <ShieldCheck aria-hidden="true" className="mb-3 h-5 w-5 text-google-blue" />
          <h3 className="font-semibold">Check deployment requirements</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">Review authentication, TLS certificate, network egress, and administrator configuration requirements in Google’s setup guide before implementation.</p>
        </article>
      </div>
      <Link className="mt-5 inline-flex items-center gap-1 text-sm text-google-blue hover:underline" href={source} target="_blank" rel="noreferrer">Read Google’s custom MCP server guide<ArrowUpRight className="h-3.5 w-3.5" /></Link>
    </section>
  );
}
