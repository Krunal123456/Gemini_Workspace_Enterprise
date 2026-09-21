"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Database,
  Globe2,
  Search,
  ShieldCheck,
} from "lucide-react";

type DetectorResult = {
  domain: string;
  ge_band: string;
  source: string;
  setup_required?: boolean;
  search_links?: { id: string; name: string; url: string }[];
  matched: { id: string; name: string; status: string; category: string; evidence?: { title: string; url: string; snippet: string }[] }[];
};

export function ConnectorDetector() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<DetectorResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/connector-detector/status?domain=${encodeURIComponent(domain)}`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to check this domain.");
      setResult(payload);
      setDomain(payload.domain);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to check this domain.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const hasMatches = Boolean(result?.matched.length);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-google-blue/20 bg-google-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-google-blue">
            <ShieldCheck className="h-3.5 w-3.5" /> Readiness check
          </div>
          <h2 className="fluid-h2 mb-4 font-bold tracking-tight">
            Find out which of your tools connect to Gemini Enterprise.
          </h2>
          <p className="max-w-xl leading-relaxed text-muted-foreground">
            Enter a company domain to search public Google results for evidence of the tools your team may use. This is an indicative signal, not proof of an active integration.
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            <label htmlFor="company-domain" className="mb-2 block text-xs font-bold uppercase tracking-wider text-foreground/70">
              Company domain
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Globe2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="company-domain"
                  type="text"
                  value={domain}
                  onChange={(event) => setDomain(event.target.value)}
                  placeholder="yourcompany.com"
                  className="h-14 w-full rounded-xl border border-border bg-background pl-12 pr-4 text-base outline-none transition focus:border-google-blue focus:ring-2 focus:ring-google-blue/20"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-google-blue px-6 font-semibold text-white transition hover:bg-google-blue/90 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!domain.trim() || isLoading}
              >
                <Search className="h-4 w-4" />
                {isLoading ? "Checking..." : "Check readiness"}
              </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Try <button type="button" onClick={() => setDomain("acme.atlassian.net")} className="font-semibold text-google-blue hover:underline">acme.atlassian.net</button> for a sample match.
            </p>
          </form>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          {!result ? (
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Database className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-foreground">Your readiness summary appears here</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                No account access or sensitive information is required.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Checked domain</p>
                  <h3 className="mt-1 break-all text-xl font-bold text-foreground">{result.domain}</h3>
                </div>
                <div className="rounded-full bg-google-green/10 px-3 py-1 text-sm font-bold text-google-green">
                  {result.matched.length} match{result.matched.length === 1 ? "" : "es"}
                </div>
              </div>

              {hasMatches ? (
                <div className="pt-5">
                  <div className="mb-4 flex items-start gap-3 rounded-xl bg-google-green/10 p-4 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-google-green" />
                    <p><strong>Connector signal found.</strong> These tools are represented in the Gemini Enterprise catalog.</p>
                  </div>
                  <div className="space-y-3">
                    {result.matched.map((connector) => (
                      <div key={connector.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/70 px-4 py-3">
                        <div>
                          <p className="font-semibold text-foreground">{connector.name}</p>
                          <p className="text-xs text-muted-foreground">{connector.status} connector</p>
                          {connector.evidence?.[0] && (
                            <a href={connector.evidence[0].url} target="_blank" rel="noreferrer" className="mt-1 block max-w-md truncate text-xs text-google-blue hover:underline">
                              Evidence: {connector.evidence[0].title}
                            </a>
                          )}
                        </div>
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-google-green" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="pt-5">
                  <div className="mb-4 flex items-start gap-3 rounded-xl bg-amber-500/10 p-4 text-sm text-foreground">
                    <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <p><strong>{result.setup_required ? "Google Search setup required." : "Manual review recommended."}</strong> {result.setup_required ? "Add the server-side Google Search credentials to show public company signals here." : "No connector signal was found in the public results."}</p>
                  </div>
                  {result.setup_required && result.search_links && (
                    <div className="mb-5">
                      <p className="mb-3 text-sm font-semibold text-foreground">Search Google manually:</p>
                      <div className="flex flex-wrap gap-2">
                        {result.search_links.map((searchLink) => (
                          <a key={searchLink.id} href={searchLink.url} target="_blank" rel="noreferrer" className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-google-blue transition hover:border-google-blue/50 hover:bg-google-blue/5">
                            {searchLink.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Review the full connector catalog to identify the systems your team wants to ground in Gemini Enterprise.
                  </p>
                </div>
              )}

              <Link href="/enterprise/connectors" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-google-blue hover:underline">
                View connector specifications <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
          {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
