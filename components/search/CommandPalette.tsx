"use client";

import { useLocalizedData } from "@/lib/i18n/use-localized-data";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Search,
  X,
  Sparkles,
  Layers,
  CreditCard,
  FileText,
  Plug,
  ArrowRight,
  Command,
  CornerDownLeft,
  Cpu,
  ShieldCheck,
} from "lucide-react";

const sitePages = [
  { id: "home", title: "Home", description: "Explore Google Workspace and Gemini capabilities, product updates, comparisons, and resources.", href: "/", keywords: "overview landing introduction" },
  { id: "features-index", title: "All features", description: "Browse the full catalog of Workspace and Gemini capabilities.", href: "/features", keywords: "capabilities directory catalog" },
  { id: "apps-index", title: "Workspace apps", description: "Explore Gemini features across Gmail, Docs, Sheets, Meet, and other applications.", href: "/apps", keywords: "applications google workspace gmail docs sheets" },
  { id: "gemini-product", title: "Gemini product guide", description: "Explore Gemini chat, research, creation, grounding, connectors, and agents.", href: "/products/gemini", keywords: "consumer workspace product" },
  { id: "notebooklm-product", title: "Gemini Notebook", description: "NotebookLM and Gemini Notebook product overview and source-grounded research.", href: "/products/notebooklm", keywords: "notebooklm sources research audio" },
  { id: "enterprise-product", title: "Gemini Enterprise product guide", description: "Enterprise search, connectors, agents, and administration.", href: "/products/gemini-enterprise", keywords: "cloud business governance enterprise" },
  { id: "workspace-studio-product", title: "Workspace Studio", description: "Workspace automation and agent workflow overview.", href: "/products/workspace-studio", keywords: "flows automation agents workspace studio" },
  { id: "google-labs-product", title: "Google Labs", description: "Experimental Google AI tools and product experiences.", href: "/products/google-labs", keywords: "experiments labs prototypes" },
  { id: "developer-tools-product", title: "Gemini developer tools", description: "Developer-oriented Google AI products, models, and tools.", href: "/products/developer-tools", keywords: "developers api code antigravity android studio" },
  { id: "models-index", title: "Gemini models and API estimator", description: "Compare model families, release status, use cases, and API price estimates.", href: "/models", keywords: "model pricing tokens api flash pro live" },
  { id: "plans-index", title: "Plans and editions", description: "Browse Google Workspace, add-on, and Gemini Enterprise plans.", href: "/plans", keywords: "subscription edition license" },
  { id: "pricing-page", title: "Pricing overview", description: "Review published Workspace and Gemini Enterprise pricing information.", href: "/pricing", keywords: "cost price billing procurement" },
  { id: "compare-page", title: "Compare plans", description: "Compare features and availability across listed plans.", href: "/compare", keywords: "matrix comparison availability included" },
  { id: "enterprise-index", title: "Enterprise overview", description: "Explore enterprise architecture, sources, and deployment guidance.", href: "/enterprise", keywords: "architecture deployment business" },
  { id: "readiness-page", title: "Enterprise readiness checklist", description: "Assess deployment readiness, governance, and implementation requirements.", href: "/enterprise/readiness", keywords: "checklist assessment readiness governance" },
  { id: "connector-detector", title: "Connector detector", description: "Explore connector discovery and source assessment.", href: "/enterprise/connector-detector", keywords: "source discovery integrations questionnaire" },
  { id: "connectors-index", title: "Enterprise connectors", description: "Browse supported data connector profiles and source requirements.", href: "/enterprise/connectors", keywords: "data source integration systems" },
  { id: "agents-page", title: "Enterprise agents", description: "Review agent patterns, workflows, and governance considerations.", href: "/enterprise/agents", keywords: "workflow builder custom tools mcp" },
  { id: "security-page", title: "Security and governance", description: "Review identity, data protection, AI safety, retention, compliance, and audit topics.", href: "/security", keywords: "privacy security model armor identity audit compliance" },
  { id: "articles-index", title: "Research and articles", description: "Read product explainers, comparisons, and current research notes.", href: "/articles", keywords: "guides reports updates research" },
  { id: "about-page", title: "About MarketStar research", description: "Learn about this product intelligence resource.", href: "/about", keywords: "about company contact" },
];

type SearchType = "feature" | "app" | "plan" | "article" | "connector" | "model" | "security" | "page";

type SearchResult = {
  id: string;
  type: SearchType;
  title: string;
  description?: string;
  href: string;
  category?: string;
  icon: React.ReactNode;
  score: number;
};

type PaletteOption =
  | { kind: "result"; optionId: string; href: string; title: string }
  | { kind: "recent"; optionId: string; query: string; title: string }
  | { kind: "popular"; optionId: string; href: string; title: string };

export function CommandPalette() {
  const { features, applications, plans, articles, connectors, securityLayers, models } = useLocalizedData();
  const { locale, t, href } = useLocale();
  const tp = useMemo(() => createPhraseTranslator(locale), [locale]);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      setRecentSearches(JSON.parse(localStorage.getItem("gemini-recent-searches") || "[]"));
    } catch {
      setRecentSearches([]);
    }
  }, []);

  // Handle global shortcuts and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          setIsOpen(false);
          requestAnimationFrame(() => openerRef.current?.focus());
        } else {
          if (document.activeElement instanceof HTMLElement) {
            openerRef.current = document.activeElement;
          }
          setIsOpen(true);
        }
      }

      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
        requestAnimationFrame(() => openerRef.current?.focus());
      }
    };

    const handleCustomEvent = () => {
      if (document.activeElement instanceof HTMLElement) {
        openerRef.current = document.activeElement;
      }
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomEvent);
    };
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setSelectedIndex(0);
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  // Auto focus input
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setDebouncedQuery("");
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Search logic
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const normalizedQuery = debouncedQuery.toLowerCase().trim();
    const queryTerms = normalizedQuery.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
    const getScore = (searchableText: string, title: string) => {
      const normalizedText = searchableText.toLowerCase();
      const normalizedTitle = title.toLowerCase();
      const words = normalizedText.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
      if (!queryTerms.every((term) => words.some((word) => word.includes(term)))) return 0;

      const titleWords = normalizedTitle.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
      const titleCoverage = queryTerms.filter((term) => titleWords.some((word) => word.includes(term))).length;
      return (normalizedTitle.includes(normalizedQuery) ? 100 : 0) + titleCoverage * 10 + queryTerms.length;
    };
    const matches: SearchResult[] = [];
    const addMatches = <T,>(items: T[], getText: (item: T) => string, getResult: (item: T) => Omit<SearchResult, "score">) => {
      for (const item of items) {
        const result = getResult(item);
        const score = getScore(getText(item), result.title);
        if (score > 0) matches.push({ ...result, score });
      }
    };

    addMatches(features, (f) => [
        f.name,
        f.description,
        f.whatItDoes,
        f.howItWorks,
        f.application,
        f.category,
        f.enterpriseConsiderations,
        f.securityConsiderations,
        ...f.useCases,
        ...f.capabilities,
        ...(f.officialSources ?? []).flatMap((source) => [source.label, source.url]),
      ].join(" "), (f) => ({
        id: f.id || f.name,
        type: "feature",
        title: f.name,
        description: f.description,
        href: href(`/features/${f.slug || f.name.toLowerCase().replace(/\s+/g, "-")}`),
        category: f.category,
        icon: <Sparkles className="h-4 w-4 text-gemini-purple" />,
      }));

    addMatches(applications, (a) => [
        a.name,
        a.shortName,
        a.tagline,
        a.description,
        a.category,
        a.overview,
        a.enterpriseValue,
        ...a.keyAIFeatures,
      ].join(" "), (a) => ({
        id: a.id || a.name,
        type: "app",
        title: a.name,
        description: a.description,
        href: href(`/apps/${a.slug || a.name.toLowerCase().replace(/\s+/g, "-")}`),
        category: a.category,
        icon: <Layers className="h-4 w-4 text-google-blue" />,
      }));

    addMatches(plans, (p) => [
        p.name,
        p.shortName,
        p.tagline,
        p.description,
        p.category,
        p.idealFor,
        p.storage,
        p.pricingNote,
        ...p.highlightedFeatures,
        ...Object.values(p.coreCapabilities),
        ...(p.officialSources ?? []).flatMap((source) => [source.label, source.url]),
      ].join(" "), (p) => ({
        id: p.id || p.name,
        type: "plan",
        title: p.name,
        description: p.description,
        href: href(`/plans/${p.slug}`),
        icon: <CreditCard className="h-4 w-4 text-google-green" />,
      }));

    addMatches(articles, (a) => [
        a.title,
        a.subtitle,
        a.excerpt,
        a.category,
        a.author.name,
        a.author.company,
        ...a.keyTakeaways,
        ...a.content,
        ...(a.sources ?? []).map((source) => source.title),
      ].join(" "), (a) => ({
        id: a.slug,
        type: "article",
        title: a.title,
        description: a.excerpt,
        href: href(`/articles/${a.slug}`),
        category: a.category,
        icon: <FileText className="h-4 w-4 text-marketstar-navy" />,
      }));

    addMatches(connectors, (c) => [
        c.name,
        c.description,
        c.category,
        c.type,
        c.status,
        c.enterpriseRequirements,
        ...c.supportedEditions,
        ...c.dataTypes,
        ...c.groundingCapabilities,
      ].join(" "), (c) => ({
        id: c.id || c.name,
        type: "connector",
        title: c.name,
        description: c.description,
        href: href(`/enterprise/connectors/${c.id}`),
        category: c.category,
        icon: <Plug className="h-4 w-4 text-google-red" />,
      }));

    addMatches(models, (model) => [
      model.name,
      model.apiId,
      model.status,
      model.family,
      model.summary,
      model.pricingNote,
      ...model.bestFor,
    ].join(" "), (model) => ({
      id: model.id,
      type: "model",
      title: model.name,
      description: model.summary,
      href: href("/models"),
      category: model.status,
      icon: <Cpu className="h-4 w-4 text-gemini-purple" />,
    }));

    addMatches(securityLayers, (layer) => [
      layer.name,
      layer.tagline,
      layer.description,
      ...layer.capabilities.flatMap((capability) => [capability.name, capability.description, capability.reviewQuestion]),
    ].join(" "), (layer) => ({
      id: layer.id,
      type: "security",
      title: layer.name,
      description: layer.tagline,
      href: href("/security"),
      category: tp("Security & governance"),
      icon: <ShieldCheck className="h-4 w-4 text-google-green" />,
    }));

    addMatches(sitePages, (page) => [page.title, page.description, page.keywords].join(" "), (page) => ({
      id: page.id,
      type: "page",
      title: page.title,
      description: page.description,
      href: href(page.href),
      category: tp("Site page"),
      icon: <Search className="h-4 w-4 text-slate-500" />,
    }));

    return matches.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  }, [debouncedQuery, href, tp, features, applications, plans, articles, connectors, securityLayers, models]);

  const groups = useMemo(() => {
    const definitions: { label: string; type: SearchType }[] = [
      { label: tp("Features"), type: "feature" },
      { label: tp("Applications"), type: "app" },
      { label: tp("Plans"), type: "plan" },
      { label: tp("Articles"), type: "article" },
      { label: tp("Connectors"), type: "connector" },
      { label: tp("Gemini models"), type: "model" },
      { label: tp("Security and governance"), type: "security" },
      { label: tp("Site pages"), type: "page" },
    ];

    return definitions
      .map((group) => ({ ...group, items: results.filter((result) => result.type === group.type) }))
      .filter((group) => group.items.length > 0)
      .sort((a, b) => (b.items[0]?.score ?? 0) - (a.items[0]?.score ?? 0));
  }, [results, tp]);

  const displayedResults = useMemo(() => groups.flatMap((group) => group.items), [groups]);

  const recentItems = useMemo(() => features
    .filter((feature) => feature.isPopular)
    .slice(0, 4)
    .map((feature) => ({
      id: feature.id || feature.name,
      title: feature.name,
      href: href(`/features/${feature.slug || feature.name.toLowerCase().replace(/\s+/g, "-")}`),
      icon: <Sparkles className="h-4 w-4 text-gemini-purple" />,
    })), [features, href]);

  const isSearchPending = query.trim() !== debouncedQuery.trim();
  const activeOptions = useMemo<PaletteOption[]>(() => {
    if (isSearchPending) return [];
    if (debouncedQuery.trim()) {
      return displayedResults.map((result) => ({
        kind: "result",
        optionId: `command-option-${result.type}-${encodeURIComponent(result.id)}`,
        href: result.href,
        title: result.title,
      }));
    }

    return [
      ...recentSearches.map((search, index) => ({
        kind: "recent" as const,
        optionId: `command-option-recent-${index}`,
        query: search,
        title: search,
      })),
      ...recentItems.map((item) => ({
        kind: "popular" as const,
        optionId: `command-option-popular-${encodeURIComponent(item.id)}`,
        href: item.href,
        title: item.title,
      })),
    ];
  }, [debouncedQuery, displayedResults, isSearchPending, recentItems, recentSearches]);

  const activeOption = activeOptions[selectedIndex];

  useEffect(() => {
    if (selectedIndex >= activeOptions.length) setSelectedIndex(Math.max(0, activeOptions.length - 1));
  }, [activeOptions.length, selectedIndex]);

  const handleSelect = useCallback((href: string) => {
    if (query.trim()) {
      const nextRecent = [query.trim(), ...recentSearches.filter((item) => item !== query.trim())].slice(0, 5);
      setRecentSearches(nextRecent);
      try {
        localStorage.setItem("gemini-recent-searches", JSON.stringify(nextRecent));
      } catch {
        // Search remains usable when browser storage is unavailable.
      }
    }
    setIsOpen(false);
    router.push(href);
  }, [query, recentSearches, router]);

  // Keyboard navigation
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      if (activeOptions.length > 0) {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, activeOptions.length - 1));
      }
    } else if (e.key === "ArrowUp") {
      if (activeOptions.length > 0) {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
    } else if (e.key === "Enter" && activeOption) {
      e.preventDefault();
      if (activeOption.kind === "recent") {
        setQuery(activeOption.query);
        setDebouncedQuery(activeOption.query);
        setSelectedIndex(0);
      } else {
        handleSelect(activeOption.href);
      }
    }
  };

  const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !modalRef.current) return;
    const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>(
      'input:not([disabled]), button:not([disabled]):not([tabindex="-1"]), [href], [tabindex]:not([tabindex="-1"])'
    ));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const truncate = (str?: string, max = 60) => {
    if (!str) return "";
    return str.length > max ? str.substring(0, max) + "..." : str;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="command-palette-title"
              onKeyDown={handleDialogKeyDown}
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="w-full max-w-2xl overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/80 shadow-[0_35px_100px_-40px_rgba(59,130,246,0.65)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75 pointer-events-auto flex flex-col max-h-[72vh]"
            >
              <h2 id="command-palette-title" className="sr-only">{t("nav.searchSite")}</h2>
              <div className="relative border-b border-slate-200/80 px-4 py-4 dark:border-white/10">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3 shadow-inner shadow-slate-200/50 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-none">
                  <Search className="h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder={tp("Search everything: features, plans, sources, models, guides...")}
                    className="flex-1 bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-500 dark:text-slate-100 dark:placeholder:text-slate-400"
                    aria-label={tp("Search all site content")}
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={activeOptions.length > 0}
                    aria-controls="command-palette-options"
                    aria-activedescendant={activeOption?.optionId}
                  />
                  {query && (
                    <button
                      type="button"
                      aria-label={tp("Clear search")}
                      onClick={() => {
                        setQuery("");
                        inputRef.current?.focus();
                      }}
                      className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-y-auto flex-1 p-2 space-y-4" id="command-palette-results" aria-live="polite" aria-busy={isSearchPending}>
                {isSearchPending && (
                  <p className="px-3 py-6 text-sm text-slate-500 dark:text-slate-400" role="status">{tp("Searching the site…")}</p>
                )}

                {!isSearchPending && debouncedQuery.trim() && results.length === 0 && (
                  <div className="py-14 text-center">
                    <Search className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-900 dark:text-gray-100 font-medium">{tp("No results found")}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      {tp("Try a product or topic such as Gmail, pricing, security, or connectors.")}
                    </p>
                  </div>
                )}

                {!isSearchPending && !debouncedQuery.trim() && recentSearches.length > 0 && (
                  <div className="mb-2 flex items-center justify-between px-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{tp("Recent searches")}</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setRecentSearches([]);
                        try {
                          localStorage.removeItem("gemini-recent-searches");
                        } catch {
                          // Clearing the in-memory list still works without browser storage.
                        }
                      }}
                      className="text-xs text-google-blue hover:underline"
                    >{tp("Clear")}</button>
                  </div>
                )}

                <div id="command-palette-options" role="listbox" aria-label="Search suggestions">

                {/* Suggestions when the query is empty */}
                {!isSearchPending && !debouncedQuery.trim() && (
                  <>
                    {recentSearches.length > 0 && (
                      <div role="group" aria-label="Recent searches" className="mb-5 flex flex-wrap gap-2 px-2">
                        {recentSearches.map((item, index) => {
                          const optionIndex = index;
                          const selected = selectedIndex === optionIndex;
                          return (
                            <button
                              key={`${item}-${index}`}
                              id={`command-option-recent-${index}`}
                              type="button"
                              role="option"
                              aria-selected={selected}
                              tabIndex={-1}
                              onMouseDown={(event) => event.preventDefault()}
                              onMouseEnter={() => setSelectedIndex(optionIndex)}
                              onClick={() => { setQuery(item); setDebouncedQuery(item); setSelectedIndex(0); }}
                              className={cn(
                                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                                selected
                                  ? "border-blue-300 bg-blue-50 text-slate-800 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-slate-100"
                                  : "border-border bg-muted text-muted-foreground hover:text-foreground"
                              )}
                            >{item}</button>
                          );
                        })}
                      </div>
                    )}
                    <div role="group" aria-label={tp("Popular features")}>
                      <h3 aria-hidden="true" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">{tp("Popular Features")}</h3>
                      <div className="space-y-1" role="presentation">
                        {recentItems.map((item, index) => {
                          const optionIndex = recentSearches.length + index;
                          const selected = selectedIndex === optionIndex;
                          return (
                            <button
                              key={item.id}
                              id={`command-option-popular-${encodeURIComponent(item.id)}`}
                              type="button"
                              role="option"
                              aria-selected={selected}
                              tabIndex={-1}
                              onMouseDown={(event) => event.preventDefault()}
                              onMouseEnter={() => setSelectedIndex(optionIndex)}
                              onClick={() => handleSelect(item.href)}
                              className={cn(
                                "group flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition-colors dark:text-gray-300",
                                selected ? "bg-blue-50 dark:bg-blue-500/10" : "hover:bg-black/5 dark:hover:bg-white/5"
                              )}
                            >
                              <span className="mr-3 rounded-md bg-gemini-purple/10 p-1 dark:bg-gemini-purple/20">{item.icon}</span>
                              <span className="flex-1 font-medium">{item.title}</span>
                              <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {/* Results List */}
                {!isSearchPending && debouncedQuery.trim() && results.length > 0 && (
                    groups.map((group) => {
                      return (
                        <div key={group.type} role="group" aria-label={group.label}>
                          <div className="mb-2 flex items-center justify-between px-3">
                            <h3 aria-hidden="true" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              {group.label}
                            </h3>
                            <span aria-hidden="true" className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                              {group.items.length}
                            </span>
                          </div>
                          <div className="space-y-1" role="presentation">
                            {group.items.map((item) => {
                              const currentIndex = displayedResults.findIndex((result) => result.type === item.type && result.id === item.id);
                              const isItemSelected = selectedIndex === currentIndex;

                              return (
                                <button
                                  key={item.id}
                                  id={`command-option-${item.type}-${encodeURIComponent(item.id)}`}
                                  type="button"
                                  role="option"
                                  aria-selected={isItemSelected}
                                  tabIndex={-1}
                                  onMouseDown={(event) => event.preventDefault()}
                                  onClick={() => handleSelect(item.href)}
                                  onMouseEnter={() => setSelectedIndex(currentIndex)}
                                  className={cn(
                                    "flex w-full items-center rounded-2xl px-3 py-3 text-left transition-all duration-200",
                                    isItemSelected
                                      ? "border border-blue-200 bg-blue-50/70 shadow-[0_10px_30px_-20px_rgba(59,130,246,0.7)] dark:border-blue-500/20 dark:bg-blue-500/10"
                                      : "border border-transparent hover:border-slate-200 hover:bg-slate-50/80 dark:hover:border-white/10 dark:hover:bg-slate-900/70"
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "mr-3 rounded-xl p-1.5",
                                      isItemSelected
                                        ? "bg-white shadow-sm dark:bg-slate-900"
                                        : "bg-slate-100 dark:bg-slate-800"
                                    )}
                                  >
                                    {item.icon}
                                  </span>
                                  <div className="flex-1 overflow-hidden">
                                    <div className="flex items-center gap-2">
                                      <span className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                                        {item.title}
                                      </span>
                                      {item.category && (
                                        <span className="shrink-0 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                          {item.category}
                                        </span>
                                      )}
                                    </div>
                                    {item.description && (
                                      <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                                        {truncate(item.description)}
                                      </p>
                                    )}
                                  </div>
                                  {isItemSelected && (
                                    <CornerDownLeft className="ml-2 h-4 w-4 shrink-0 text-slate-500 dark:text-slate-300" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })
                )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-slate-200/80 bg-slate-50/80 px-4 py-3 text-xs text-slate-500 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-400">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-sans shadow-sm dark:border-white/10 dark:bg-slate-950">
                      <Command className="h-3 w-3" />
                    </kbd>
                    <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-sans shadow-sm dark:border-white/10 dark:bg-slate-950">
                      K
                    </kbd>
                    <span className="ml-1">{tp("to toggle")}</span>
                  </span>
                  <span className="hidden items-center gap-1 sm:flex">
                    <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-sans shadow-sm dark:border-white/10 dark:bg-slate-950">↑</kbd>
                    <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-sans shadow-sm dark:border-white/10 dark:bg-slate-950">↓</kbd>
                    <span className="ml-1">{tp("to navigate")}</span>
                  </span>
                  <span className="hidden items-center gap-1 sm:flex">
                    <kbd className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-sans shadow-sm dark:border-white/10 dark:bg-slate-950">
                      <CornerDownLeft className="h-3 w-3" />
                    </kbd>
                    <span className="ml-1">{tp("to select")}</span>
                  </span>
                </div>
                <div className="hidden items-center gap-1 text-slate-400 md:flex">
                  <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-sans shadow-sm dark:border-white/10 dark:bg-slate-950">ESC</kbd>
                  <span className="ml-1">{tp("to close")}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
