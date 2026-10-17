"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { WorkspaceGeminiWordmark } from "@/components/logos/WorkspaceGeminiWordmark";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Mail,
  FileText,
  Table,
  Video,
  MessageSquare,
  Presentation,
  Clapperboard,
  HardDrive,
  BookOpen,
  Phone,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { PwaInstallAction } from "@/components/pwa/PwaInstallAction";
import { useLocale } from "@/lib/i18n/locale-context";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const apps = [
  { name: "Gmail", icon: Mail, href: "/apps/gmail", color: "text-red-500" },
  { name: "Docs", icon: FileText, href: "/apps/docs", color: "text-blue-500" },
  { name: "Sheets", icon: Table, href: "/apps/sheets", color: "text-green-500" },
  { name: "Meet", icon: Video, href: "/apps/meet", color: "text-teal-500" },
  { name: "Google Voice", icon: Phone, href: "/apps/voice", color: "text-emerald-500" },
  { name: "Chat", icon: MessageSquare, href: "/apps/chat", color: "text-green-600" },
  { name: "Slides", icon: Presentation, href: "/apps/slides", color: "text-yellow-500" },
  { name: "Vids", icon: Clapperboard, href: "/apps/vids", color: "text-indigo-500" },
  { name: "Drive", icon: HardDrive, href: "/apps/drive", color: "text-blue-600" },
  { name: "NotebookLM", icon: BookOpen, href: "/apps/notebooklm", color: "text-purple-500" },
];

const navItems = [
  { key: "features", href: "/features", show: "" },
  { key: "plans", href: "/plans", show: "" },
  { key: "compare", href: "/compare", show: "" },
  { key: "mindmap", href: "/mindmap", show: "hidden xl:flex" },
  { key: "models", href: "/models", show: "hidden xl:flex" },
  { key: "pricing", href: "/pricing", show: "hidden xl:flex" },
  { key: "enterprise", href: "/enterprise", show: "hidden 2xl:flex" },
  { key: "articles", href: "/articles", show: "hidden 2xl:flex" },
  { key: "updates", href: "/google-ai-updates", show: "hidden 2xl:flex" },
] as const;

type NavLabels = Dictionary["nav"];

export function Header({ labels }: { labels: NavLabels }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appsDropdownOpen, setAppsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { href } = useLocale();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setAppsDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAppsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setAppsDropdownOpen(false);
      setMobileMenuOpen(false);
    }
  }, []);

  const handleSearchClick = () => {
    setMobileMenuOpen(false);
    setAppsDropdownOpen(false);
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  const handleGetStartedClick = () => {
    setMobileMenuOpen(false);
    setAppsDropdownOpen(false);
    window.dispatchEvent(new CustomEvent("open-getting-started-tour"));
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-[60] transition-all duration-300",
        scrolled ? "top-0 py-2 backdrop-blur-3xl" : "top-3 sm:top-4 bg-transparent"
      )}
      onKeyDown={handleKeyDown}
    >
      <div className="mx-auto max-w-[1440px] px-3 sm:px-4 lg:px-6">
        <div
          className={cn(
            "relative flex h-14 items-center justify-between rounded-full px-3 sm:px-4 md:px-5 transition-all duration-300 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-3",
            scrolled ? "liquid-glass-strong" : "liquid-glass"
          )}
        >
          {/* Brand Lockup - Left Aligned */}
          <div className="flex min-w-0 items-center gap-2 xl:gap-3">
            <Link
              href={href("/")}
              className="group flex shrink-0 items-center rounded-xl outline-none focus-visible:ring-2 ring-primary"
              aria-label="Workspace Gemini Intelligence home"
            >
              <WorkspaceGeminiWordmark
                className="h-5 w-auto shrink-0 object-contain sm:h-6"
                withProductLine
                wrapperClassName="rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            <button
              type="button"
              onClick={handleSearchClick}
              aria-label={labels.searchSite}
              aria-haspopup="dialog"
              aria-keyshortcuts="Control+K Meta+K"
              title={`${labels.search} (⌘K)`}
              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition-colors hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 sm:inline-flex dark:border-white/20 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Search className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              <span className="sr-only">{labels.searchPlaceholder}</span>
            </button>
          </div>

          {/* Desktop Frosted Glass Navigation Pill List - Dead Centered */}
          <div className="hidden lg:flex min-w-0 items-center justify-center pointer-events-auto">
            <nav className="flex items-center gap-0.5 xl:gap-1 rounded-full border border-slate-200/80 bg-slate-100/70 p-1 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04] shrink-0 h-9">
              {navItems.map((item) => {
                const isActive =
                  pathname === href(item.href) || pathname.startsWith(`${href(item.href)}/`);
                return (
                  <Link
                    key={item.key}
                    href={href(item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-2.5 xl:px-3 py-1 text-[11px] xl:text-xs 2xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap items-center",
                      item.show || "flex",
                      isActive
                        ? "text-violet-900 dark:text-violet-100 font-bold"
                        : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-violet-300/60 bg-white shadow-sm dark:border-violet-400/30 dark:bg-violet-500/25 dark:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />
                    )}
                    <span className="relative z-10">{labels[item.key]}</span>
                  </Link>
                );
              })}

              {/* Apps Dropdown */}
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  onClick={() => setAppsDropdownOpen(!appsDropdownOpen)}
                  aria-expanded={appsDropdownOpen}
                  aria-haspopup="true"
                  aria-controls="header-apps-menu"
                  className="flex items-center gap-1 rounded-full px-2.5 xl:px-3 py-1 text-[11px] xl:text-xs 2xl:text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white whitespace-nowrap"
                >
                  {labels.apps}
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 xl:h-3.5 xl:w-3.5 transition-transform duration-200",
                      appsDropdownOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {appsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      id="header-apps-menu"
                      className="absolute left-auto right-0 top-full z-50 mt-3 w-[500px] rounded-2xl border border-slate-200/90 bg-white p-4 shadow-[0_24px_64px_-24px_rgba(15,23,42,0.35)] dark:border-white/15 dark:bg-slate-950"
                    >
                      <div className="mb-3 flex items-center justify-between gap-3 border-b border-slate-200/70 pb-3 dark:border-white/10">
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">Workspace apps</p>
                          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Explore Gemini across your everyday tools.</p>
                        </div>
                        <Link
                          href={href("/apps")}
                          onClick={() => setAppsDropdownOpen(false)}
                          className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-violet-300 dark:hover:bg-violet-500/10"
                        >
                          Browse all
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {apps.map((app) => (
                          <Link
                            key={app.name}
                            href={href(app.href)}
                            onClick={() => setAppsDropdownOpen(false)}
                            className="group flex min-h-16 min-w-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200/70 bg-slate-50/70 px-2 py-2.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-violet-400/40 dark:hover:bg-violet-500/10"
                          >
                            <app.icon
                              className={cn(
                                "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                                app.color
                              )}
                            />
                            <span className="w-full truncate text-[11px] font-semibold leading-tight text-slate-800 dark:text-slate-200">
                              {app.name}
                            </span>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-200/70 px-1 pt-3 text-[11px] font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Explore</span>
                        <Link href={href("/models")} className="hover:text-violet-600 dark:hover:text-white transition-colors">
                          {labels.models}
                        </Link>
                        <Link href={href("/pricing")} className="hover:text-violet-600 dark:hover:text-white transition-colors">
                          {labels.pricing}
                        </Link>
                        <Link href={href("/mindmap")} className="hover:text-violet-600 dark:hover:text-white transition-colors">
                          {labels.mindmap}
                        </Link>
                        <Link href={href("/enterprise")} className="hover:text-violet-600 dark:hover:text-white transition-colors">
                          {labels.enterprise}
                        </Link>
                        <Link href={href("/articles")} className="hover:text-violet-600 dark:hover:text-white transition-colors">
                          {labels.articles}
                        </Link>
                        <Link href={href("/google-ai-updates")} className="hover:text-violet-600 dark:hover:text-white transition-colors">
                          {labels.updates}
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </div>

          {/* Action Group: Desktop & Mobile Controls - Far Right - Aligned to h-8.5 */}
          <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2 lg:justify-self-end">
            {/* Desktop Theme Toggle: Sleek Compact 1-Click Pill */}
            <ThemeToggle className="hidden lg:flex" compact />

            {/* Desktop Locale Switcher */}
            <LocaleSwitcher className="hidden lg:flex" />

            {/* Primary CTA - "Get Started" (Shown on tablet and desktop >= 768px so mobile NEVER crosses) */}
            <button
              type="button"
              onClick={handleGetStartedClick}
              data-tour-trigger
              className="hidden md:inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-slate-950 px-4 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-100"
            >
              <span>{labels.getStarted}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" />
            </button>

            {/* Mobile Pinned Right Action Capsule: Search + Menu (NEVER Centered!) */}
            <div className="flex shrink-0 items-center gap-0.5 rounded-full border border-slate-200/80 bg-white/70 p-0.5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] lg:hidden">
              <button
                onClick={handleSearchClick}
                aria-label={labels.searchSite}
                aria-haspopup="dialog"
                aria-keyshortcuts="Control+K Meta+K"
                title={`${labels.search} (⌘K)`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-200/60 dark:text-slate-200 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
              >
                <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={labels.toggleMenu}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-200/60 dark:text-slate-200 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
              >
                {mobileMenuOpen ? (
                  <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                ) : (
                  <Menu className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Frosted Glass Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-3 mt-2 max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-3xl border border-white/80 bg-white/95 p-5 shadow-2xl backdrop-blur-3xl dark:border-white/15 dark:bg-slate-950/95 lg:hidden"
          >
            {/* Mobile Search Bar inside Drawer */}
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-500" />
              <input
                type="text"
                placeholder={labels.searchPlaceholder}
                className="w-full pl-10 pr-12 py-2.5 rounded-2xl border border-slate-200/80 bg-slate-50/80 text-sm shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/[0.04]"
                onClick={handleSearchClick}
                readOnly
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-muted-foreground uppercase">
                ⌘K
              </span>
            </div>

            {/* Primary Mobile Quick CTA */}
            <button
              type="button"
              onClick={handleGetStartedClick}
              data-tour-trigger
              className="mb-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-100"
            >
              <span>{labels.getStarted}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <nav className="flex flex-col gap-1 text-sm font-semibold">
              <Link
                href={href("/features")}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-muted/60 text-foreground"
              >
                <span>{labels.features}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
              <Link
                href={href("/plans")}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-muted/60 text-foreground"
              >
                <span>{labels.plans}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
              <Link
                href={href("/mindmap")}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-muted/60 text-foreground"
              >
                <span>{labels.mindmap}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
              <Link
                href={href("/compare")}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-muted/60 text-foreground"
              >
                <span>{labels.compare}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
              <Link
                href={href("/models")}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-muted/60 text-foreground"
              >
                <span>{labels.models}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
              <Link
                href={href("/pricing")}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-muted/60 text-foreground"
              >
                <span>{labels.pricing}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
              <Link
                href={href("/enterprise")}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-muted/60 text-foreground"
              >
                <span>{labels.enterprise}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
              <Link
                href={href("/articles")}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-muted/60 text-foreground"
              >
                <span>{labels.articles}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
              <Link
                href={href("/google-ai-updates")}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-muted/60 text-foreground"
              >
                <span>{labels.updates}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>

              {/* Workspace Apps Grid in Mobile Menu */}
              <div className="my-2 rounded-2xl border border-border/60 bg-muted/20 p-3">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2.5">
                  {labels.apps}
                </span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {apps.map((app) => (
                    <Link
                      key={app.name}
                      href={href(app.href)}
                      className="flex min-h-11 min-w-0 items-center gap-2 rounded-xl border border-border/50 bg-background/80 px-2.5 py-2 text-left transition-all hover:border-violet-500/40 hover:bg-violet-500/5"
                    >
                      <app.icon className={cn("h-4 w-4 shrink-0", app.color)} />
                      <span className="min-w-0 truncate text-[11px] font-semibold text-foreground">
                        {app.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Controls Footer in Mobile Menu */}
              <div className="flex items-center justify-between py-2 px-3 border-t border-border/60 mt-1">
                <span className="text-xs font-semibold text-muted-foreground">{labels.theme}</span>
                <ThemeToggle />
              </div>

              <div className="flex items-center justify-between py-2 px-3 border-t border-border/60">
                <span className="text-xs font-semibold text-muted-foreground">{labels.language}</span>
                <LocaleSwitcher />
              </div>

            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <PwaInstallAction open={mobileMenuOpen} />
    </header>
  );
}
