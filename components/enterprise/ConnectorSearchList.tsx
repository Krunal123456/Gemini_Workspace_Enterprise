"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getConnectors } from "@/lib/i18n/data";
import { useLocale } from "@/lib/i18n/locale-context";
import { CheckCircle2, ChevronRight, Search } from "lucide-react";

function ConnectorSearchListInner() {
  const searchParams = useSearchParams();
  const { locale, href } = useLocale();
  const [query, setQuery] = useState("");

  const connectors = useMemo(() => getConnectors(locale), [locale]);

  useEffect(() => {
    const param = searchParams.get("q");
    if (param) {
      setQuery(param);
    }
  }, [searchParams]);

  const filteredConnectors = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return connectors;

    return connectors.filter((connector) => {
      const haystack = [
        connector.name,
        connector.id,
        connector.category,
        connector.description,
        connector.status,
        connector.enterpriseRequirements,
        connector.supportedEditions.join(" "),
        connector.groundingCapabilities.join(" "),
        connector.dataTypes.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-google-blue">Find a connector</p>
            <p className="text-sm text-muted-foreground">Search by name, category, product, or supported data type.</p>
          </div>

          <label className="relative block w-full max-w-md">
            <span className="sr-only">Search connectors</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search connectors, e.g. jira"
              className="w-full rounded-2xl border border-slate-200/80 bg-white/70 py-3 pl-11 pr-4 text-sm text-foreground shadow-sm backdrop-blur-xl outline-none transition focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 dark:border-white/10 dark:bg-white/[0.04]"
            />
          </label>
        </div>

        {filteredConnectors.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200/80 bg-white/40 p-12 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.02]">
            <p className="text-lg font-semibold text-foreground">No connectors match your search.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try a different keyword like Jira, Salesforce, SharePoint, or BigQuery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredConnectors.map((connector) => (
              <div
                key={connector.id}
                id={connector.id}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/70 p-8 shadow-[0_16px_40px_-25px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-google-blue/50 hover:shadow-[0_24px_50px_-20px_rgba(66,133,244,0.22)] dark:border-white/10 dark:bg-slate-950/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100/80 text-muted-foreground border border-slate-200/60 dark:bg-white/[0.04] dark:border-white/10">
                      {connector.category}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-google-blue/10 text-google-blue border border-google-blue/20">
                      {connector.status}
                    </span>
                  </div>

                  <Link href={href(`/enterprise/connectors/${connector.id}`)} className="group/title inline-flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-foreground mb-3 group-hover/title:text-google-blue">{connector.name}</h2>
                    <ChevronRight className="mb-2 h-5 w-5 text-muted-foreground transition group-hover/title:translate-x-1" />
                  </Link>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{connector.description}</p>

                  <div className="mb-6 space-y-2 border-t border-border/60 pt-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                      Grounding Capabilities
                    </h3>
                    {connector.groundingCapabilities.map((cap, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-google-green shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6 border-t border-border/60 pt-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                      Supported Data Types
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {connector.dataTypes.map((dt, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100/70 dark:bg-white/[0.04] text-muted-foreground border border-slate-200/50 dark:border-white/5"
                        >
                          {dt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-4 space-y-2">
                  <div className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Required Plan:</strong>{" "}
                    {connector.supportedEditions.join(", ")}
                  </div>
                  <div className="text-xs text-muted-foreground/80 leading-normal">
                    <strong className="text-foreground">Prerequisites:</strong>{" "}
                    {connector.enterpriseRequirements}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function ConnectorSearchList() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 text-sm text-muted-foreground animate-pulse">Loading connectors…</div>}>
      <ConnectorSearchListInner />
    </Suspense>
  );
}
