"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { googleCloudConnectors, GoogleCloudConnectorGroup } from "@/data/googleCloudConnectors";

const groups: (GoogleCloudConnectorGroup | "All")[] = ["All", "Google services", "Other applications"];

export function GoogleCloudConnectorCatalog() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<GoogleCloudConnectorGroup | "All">("All");
  const filteredConnectors = useMemo(() => googleCloudConnectors.filter((connector) => {
    const matchesQuery = connector.name.toLowerCase().includes(query.toLowerCase().trim());
    const matchesGroup = group === "All" || connector.group === group;
    return matchesQuery && matchesGroup;
  }), [group, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Google Cloud connectors..." className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none focus:border-google-blue focus:ring-2 focus:ring-google-blue/20" />
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Connector groups">
          {groups.map((item) => <button key={item} type="button" onClick={() => setGroup(item)} className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${group === item ? "border-google-blue bg-google-blue/10 text-google-blue" : "border-border bg-background text-muted-foreground hover:bg-muted"}`}>{item}</button>)}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">Showing <span className="font-semibold text-foreground">{filteredConnectors.length}</span> of {googleCloudConnectors.length} Google Cloud Integration Connectors.</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredConnectors.map((connector) => <div key={`${connector.group}-${connector.name}`} className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-google-blue/50 hover:shadow-sm"><span>{connector.name}</span><span className="mt-1 block text-[11px] font-normal text-muted-foreground">{connector.group}</span></div>)}
      </div>
      {filteredConnectors.length === 0 && <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No connectors match your search.</div>}
    </div>
  );
}
