"use client";

import { useLocalizedData } from "@/lib/i18n/use-localized-data";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { googleCloudConnectors, GoogleCloudConnectorGroup } from "@/data/googleCloudConnectors";

const groups: (GoogleCloudConnectorGroup | "All")[] = ["All", "Google services", "Other applications"];

export function GoogleCloudConnectorCatalog() {
  const { connectors } = useLocalizedData();
  const { locale } = useLocale();
  const t = createPhraseTranslator(locale);
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
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("Search Google Cloud connectors...")}
            className="w-full rounded-2xl border border-slate-200/80 bg-white/70 py-3 pl-10 pr-4 text-sm text-foreground shadow-sm backdrop-blur-xl outline-none transition focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 dark:border-white/10 dark:bg-white/[0.04]"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={t("Connector groups")}>
          {groups.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setGroup(item)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold backdrop-blur-xl transition ${
                group === item
                  ? "border-google-blue/60 bg-google-blue/15 text-google-blue shadow-sm"
                  : "border-slate-200/60 bg-white/60 text-muted-foreground hover:bg-white/90 hover:text-foreground dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.08]"
              }`}
            >
              {t(item)}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{t("Showing {shown} of {total} Google Cloud Integration Connectors.", { shown: filteredConnectors.length, total: googleCloudConnectors.length })}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredConnectors.map((connector) => (
          <div
            key={`${connector.group}-${connector.name}`}
            className="rounded-2xl border border-slate-200/70 bg-white/60 p-4 text-sm font-medium text-foreground shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-google-blue/50 hover:bg-white/90 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
          >
            <span>{connector.name}</span>
            <span className="mt-1 block text-[11px] font-normal text-muted-foreground">{t(connector.group)}</span>
          </div>
        ))}
      </div>
      {filteredConnectors.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-200/80 bg-white/40 p-10 text-center text-sm text-muted-foreground backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.02]">
          {t("No connectors match your search.")}
        </div>
      )}
    </div>
  );
}
