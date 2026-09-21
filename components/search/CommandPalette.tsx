"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { features } from "@/data/features";
import { plans } from "@/data/plans";
import { applications } from "@/data/apps";
import { articles } from "@/data/articles";
import { connectors } from "@/data/connectors";
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
} from "lucide-react";

type SearchResult = {
  id: string;
  type: "feature" | "app" | "plan" | "article" | "connector";
  title: string;
  description?: string;
  href: string;
  category?: string;
  icon: React.ReactNode;
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
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
        setIsOpen((prev) => !prev);
      }
      
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomEvent = () => setIsOpen(true);

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
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Search logic
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const queryTerms = debouncedQuery
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean);
    const matchesQuery = (searchableText: string) => {
      const words = searchableText.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
      return queryTerms.every((term) => words.some((word) => word.includes(term)));
    };
    const matches: SearchResult[] = [];

    // Features
    const matchedFeatures = features
      .filter((f) => matchesQuery([
        f.name,
        f.description,
        f.whatItDoes,
        f.howItWorks,
        f.application,
        f.category,
        ...f.useCases,
        ...f.capabilities,
      ].join(" ")))
      .slice(0, 5)
      .map((f) => ({
        id: f.id || f.name,
        type: "feature" as const,
        title: f.name,
        description: f.description,
        href: `/features/${f.slug || f.name.toLowerCase().replace(/\s+/g, "-")}`,
        category: f.category,
        icon: <Sparkles className="h-4 w-4 text-gemini-purple" />,
      }));
    matches.push(...matchedFeatures);

    // Apps
    const matchedApps = applications
      .filter((a) => matchesQuery([
        a.name,
        a.shortName,
        a.tagline,
        a.description,
        a.category,
        ...a.keyAIFeatures,
      ].join(" ")))
      .slice(0, 5)
      .map((a) => ({
        id: a.id || a.name,
        type: "app" as const,
        title: a.name,
        description: a.description,
        href: `/apps/${a.slug || a.name.toLowerCase().replace(/\s+/g, "-")}`,
        category: a.category,
        icon: <Layers className="h-4 w-4 text-google-blue" />,
      }));
    matches.push(...matchedApps);

    // Plans
    const matchedPlans = plans
      .filter((p) => matchesQuery([
        p.name,
        p.shortName,
        p.tagline,
        p.description,
        p.category,
        ...p.highlightedFeatures,
      ].join(" ")))
      .slice(0, 5)
      .map((p) => ({
        id: p.id || p.name,
        type: "plan" as const,
        title: p.name,
        description: p.description,
        href: `/compare#${p.id || p.name.toLowerCase().replace(/\s+/g, "-")}`,
        icon: <CreditCard className="h-4 w-4 text-google-green" />,
      }));
    matches.push(...matchedPlans);

    // Articles
    const matchedArticles = articles
      .filter((a) => matchesQuery([
        a.title,
        a.subtitle,
        a.excerpt,
        a.category,
      ].join(" ")))
      .slice(0, 5)
      .map((a) => ({
        id: a.slug,
        type: "article" as const,
        title: a.title,
        description: a.excerpt,
        href: `/articles/${a.slug || a.title.toLowerCase().replace(/\s+/g, "-")}`,
        category: a.category,
        icon: <FileText className="h-4 w-4 text-marketstar-navy" />,
      }));
    matches.push(...matchedArticles);

    // Connectors
    const matchedConnectors = connectors
      .filter((c) => matchesQuery([
        c.name,
        c.description,
        c.category,
        c.type,
        ...c.dataTypes,
        ...c.groundingCapabilities,
      ].join(" ")))
      .slice(0, 5)
      .map((c) => ({
        id: c.id || c.name,
        type: "connector" as const,
        title: c.name,
        description: c.description,
        href: `/enterprise/connectors#${c.id}`,
        category: c.category,
        icon: <Plug className="h-4 w-4 text-google-red" />,
      }));
    matches.push(...matchedConnectors);

    // Limit to max 15 total if we somehow exceed
    return matches.slice(0, 15);
  }, [debouncedQuery]);

  const groups = useMemo(() => {
    return [
      { label: "Features", type: "feature", items: results.filter((r) => r.type === "feature") },
      { label: "Applications", type: "app", items: results.filter((r) => r.type === "app") },
      { label: "Plans", type: "plan", items: results.filter((r) => r.type === "plan") },
      { label: "Articles", type: "article", items: results.filter((r) => r.type === "article") },
      { label: "Connectors", type: "connector", items: results.filter((r) => r.type === "connector") },
    ].filter((g) => g.items.length > 0);
  }, [results]);

  const handleSelect = useCallback((href: string) => {
    if (query.trim()) {
      const nextRecent = [query.trim(), ...recentSearches.filter((item) => item !== query.trim())].slice(0, 5);
      setRecentSearches(nextRecent);
      localStorage.setItem("gemini-recent-searches", JSON.stringify(nextRecent));
    }
    setIsOpen(false);
    router.push(href);
  }, [query, recentSearches, router]);

  // Keyboard navigation
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && results.length > 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex].href);
    }
  };

  const truncate = (str?: string, max = 60) => {
    if (!str) return "";
    return str.length > max ? str.substring(0, max) + "..." : str;
  };

  const getRecentFeatures = () => {
    return features
      .filter((f) => (f as any).isPopular)
      .slice(0, 4)
      .map((f) => ({
        id: f.id || f.name,
        type: "feature" as const,
        title: f.name,
        href: `/features/${f.slug || f.name.toLowerCase().replace(/\s+/g, "-")}`,
        icon: <Sparkles className="h-4 w-4 text-gemini-purple" />,
      }));
  };
  
  const recentItems = getRecentFeatures();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label="Search command palette"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="w-full max-w-2xl overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/80 shadow-[0_35px_100px_-40px_rgba(59,130,246,0.65)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75 pointer-events-auto flex flex-col max-h-[72vh]"
            >
              <div className="relative border-b border-slate-200/80 px-4 py-4 dark:border-white/10">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3 shadow-inner shadow-slate-200/50 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-none">
                  <Search className="h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Search features, apps, plans, articles..."
                    className="flex-1 bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-500 dark:text-slate-100 dark:placeholder:text-slate-400"
                    aria-expanded={results.length > 0}
                    aria-controls="command-palette-results"
                  />
                  {query && (
                    <button
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

              <div className="overflow-y-auto flex-1 p-2 space-y-4" id="command-palette-results">
                {/* Empty State / No query */}
                {!debouncedQuery && (
                  <div className="p-2">
                    {recentSearches.length > 0 && (
                      <div className="mb-5">
                        <div className="mb-2 flex items-center justify-between px-2"><h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Recent searches</h3><button type="button" onClick={() => { setRecentSearches([]); localStorage.removeItem("gemini-recent-searches"); }} className="text-xs text-google-blue hover:underline">Clear</button></div>
                        <div className="flex flex-wrap gap-2 px-2">{recentSearches.map((item) => <button key={item} type="button" onClick={() => { setQuery(item); setDebouncedQuery(item); }} className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">{item}</button>)}</div>
                      </div>
                    )}
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">
                      Popular Features
                    </h3>
                    <div className="space-y-1">
                      {recentItems.map((item, i) => (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item.href)}
                          className="w-full flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
                        >
                          <span className="mr-3 p-1 rounded-md bg-gemini-purple/10 dark:bg-gemini-purple/20">
                            {item.icon}
                          </span>
                          <span className="flex-1 font-medium">{item.title}</span>
                          <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* No results */}
                {debouncedQuery && results.length === 0 && (
                  <div className="py-14 text-center">
                    <Search className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-900 dark:text-gray-100 font-medium">No results found</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      Try searching for something else
                    </p>
                  </div>
                )}

                {/* Results List */}
                {debouncedQuery && results.length > 0 && (
                  <div className="space-y-4 pb-2">
                    {groups.map((group) => {
                      // Find absolute index of first item in this group
                      let globalItemIndex = results.findIndex((r) => r.id === group.items[0].id);

                      return (
                        <div key={group.type}>
                          <div className="flex items-center justify-between px-3 mb-2">
                            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              {group.label}
                            </h3>
                            <span className="text-xs text-gray-400 bg-gray-100 dark:bg-dark-border px-2 py-0.5 rounded-full">
                              {group.items.length}
                            </span>
                          </div>
                          <div className="space-y-1">
                            {group.items.map((item) => {
                              const isSelected = selectedIndex === globalItemIndex;
                              const currentIndex = globalItemIndex++;
                              
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => handleSelect(item.href)}
                                  onMouseEnter={() => setSelectedIndex(currentIndex)}
                                  aria-selected={isSelected}
                                  className={cn(
                                    "flex w-full items-center rounded-2xl px-3 py-3 text-left transition-all duration-200",
                                    isSelected
                                      ? "border border-blue-200 bg-blue-50/70 shadow-[0_10px_30px_-20px_rgba(59,130,246,0.7)] dark:border-blue-500/20 dark:bg-blue-500/10"
                                      : "border border-transparent hover:border-slate-200 hover:bg-slate-50/80 dark:hover:border-white/10 dark:hover:bg-slate-900/70"
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "mr-3 rounded-xl p-1.5",
                                      isSelected
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
                                  {isSelected && (
                                    <CornerDownLeft className="ml-2 h-4 w-4 shrink-0 text-slate-500 dark:text-slate-300" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
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
                    <span className="ml-1">to toggle</span>
                  </span>
                  <span className="hidden items-center gap-1 sm:flex">
                    <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-sans shadow-sm dark:border-white/10 dark:bg-slate-950">↑</kbd>
                    <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-sans shadow-sm dark:border-white/10 dark:bg-slate-950">↓</kbd>
                    <span className="ml-1">to navigate</span>
                  </span>
                  <span className="hidden items-center gap-1 sm:flex">
                    <kbd className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-sans shadow-sm dark:border-white/10 dark:bg-slate-950">
                      <CornerDownLeft className="h-3 w-3" />
                    </kbd>
                    <span className="ml-1">to select</span>
                  </span>
                </div>
                <div className="hidden items-center gap-1 text-slate-400 md:flex">
                  <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-sans shadow-sm dark:border-white/10 dark:bg-slate-950">ESC</kbd>
                  <span className="ml-1">to close</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
