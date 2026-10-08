"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MarketStarLogo } from "@/components/logos/MarketStarLogo";
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
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { useLocale } from "@/lib/i18n/locale-context";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const apps = [
  { name: "Gmail", icon: Mail, href: "/apps/gmail", color: "text-red-500" },
  { name: "Docs", icon: FileText, href: "/apps/docs", color: "text-blue-500" },
  { name: "Sheets", icon: Table, href: "/apps/sheets", color: "text-green-500" },
  { name: "Meet", icon: Video, href: "/apps/meet", color: "text-teal-500" },
  { name: "Chat", icon: MessageSquare, href: "/apps/chat", color: "text-green-600" },
  { name: "Slides", icon: Presentation, href: "/apps/slides", color: "text-yellow-500" },
  { name: "Vids", icon: Clapperboard, href: "/apps/vids", color: "text-indigo-500" },
  { name: "Drive", icon: HardDrive, href: "/apps/drive", color: "text-blue-600" },
  { name: "NotebookLM", icon: BookOpen, href: "/apps/notebooklm", color: "text-purple-500" },
];

const navItems = [
  { key: "features", href: "/features" },
  { key: "models", href: "/models" },
  { key: "compare", href: "/compare" },
  { key: "pricing", href: "/pricing" },
  { key: "enterprise", href: "/enterprise" },
  { key: "security", href: "/security" },
  { key: "articles", href: "/articles" },
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
      setScrolled(window.scrollY > 30);
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
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-[60] transition-all duration-300",
        scrolled
          ? "top-0 py-2.5 backdrop-blur-3xl"
          : "top-4 bg-transparent"
      )}
      onKeyDown={handleKeyDown}
    >
      <div className="mx-auto max-w-[1440px] px-3 sm:px-4 lg:px-6">
        <div
          className={cn(
            "relative flex items-center justify-between gap-2 lg:gap-3 rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300",
            "border-white/70 bg-white/80 shadow-[0_12px_40px_-15px_rgba(30,64,175,0.2),0_1px_0_0_rgba(255,255,255,0.9)_inset] backdrop-blur-3xl",
            "dark:border-white/12 dark:bg-slate-950/80 dark:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.8),0_1px_0_0_rgba(255,255,255,0.08)_inset]",
            scrolled && "border-blue-300/80 bg-white/95 shadow-[0_16px_50px_-15px_rgba(59,130,246,0.3)] dark:border-blue-500/30 dark:bg-slate-950/95"
          )}
        >
          {/* Logo & Brand Pill */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href={href("/")}
              className="group flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 ring-primary shrink-0"
              aria-label="Home"
            >
              <MarketStarLogo className="h-4 w-auto shrink-0 object-contain sm:h-5 transition-transform group-hover:scale-105" />
            </Link>
            
            <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-violet-500/20 bg-violet-500/10 dark:border-violet-400/20 dark:bg-violet-400/10 backdrop-blur-md shrink-0">
              <Sparkles className="w-3 h-3 text-violet-600 dark:text-violet-300 shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-900 dark:text-violet-200 whitespace-nowrap">
                Gemini Intelligence
              </span>
            </div>
          </div>

          {/* Frosted Glass Navigation Pill List */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 rounded-full border border-slate-200/80 bg-slate-100/70 p-1 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04] shrink-0">
            {navItems.map((item) => {
              const isActive = pathname === href(item.href) || pathname.startsWith(`${href(item.href)}/`);
              return (
                <Link
                  key={item.key}
                  href={href(item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-2.5 xl:px-3 py-1 text-[11px] xl:text-xs 2xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap",
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

            {/* Apps Dropdown Button */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                onClick={() => setAppsDropdownOpen(!appsDropdownOpen)}
                aria-expanded={appsDropdownOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 rounded-full px-2.5 xl:px-3 py-1 text-[11px] xl:text-xs 2xl:text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white whitespace-nowrap"
              >
                {labels.apps}
                <ChevronDown className={cn("h-3 w-3 xl:h-3.5 xl:w-3.5 transition-transform duration-200", appsDropdownOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {appsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-1/2 top-full mt-3 w-[460px] sm:w-[500px] -translate-x-1/2 rounded-3xl border border-slate-200/90 bg-white/95 p-4 shadow-[0_30px_90px_-20px_rgba(96,165,250,0.45),0_1px_0_0_rgba(255,255,255,0.9)_inset] backdrop-blur-3xl dark:border-white/15 dark:bg-slate-950/95 dark:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85),0_1px_0_0_rgba(255,255,255,0.1)_inset] z-50"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {apps.map((app) => (
                        <Link
                          key={app.name}
                          href={href(app.href)}
                          className="group flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200/50 bg-white/60 p-3 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-500/10 hover:shadow-md dark:border-white/5 dark:bg-white/[0.03] dark:hover:border-blue-400/30 dark:hover:bg-blue-500/10"
                        >
                          <app.icon className={cn("h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:scale-110", app.color)} />
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{app.name}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Action Group: Theme, Language & Search */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <ThemeToggle className="hidden sm:flex" />
            <LocaleSwitcher className="hidden sm:flex" />
            <button
              onClick={handleSearchClick}
              aria-label={labels.searchSite}
              title={`${labels.search} (⌘K)`}
              className="flex h-7.5 w-7.5 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-700 shadow-sm backdrop-blur-xl transition-all hover:border-blue-400/40 hover:bg-white hover:text-slate-950 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.1] dark:hover:text-white"
            >
              <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="shrink-0 rounded-full p-1.5 text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue dark:text-slate-100 dark:hover:bg-white/10 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={labels.toggleMenu}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Frosted Glass Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-3 mt-3 rounded-3xl border border-white/80 bg-white/85 p-6 shadow-2xl backdrop-blur-3xl dark:border-white/15 dark:bg-slate-950/85 lg:hidden max-h-[calc(100vh-5rem)] overflow-y-auto"
          >
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={labels.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200/80 bg-white/60 text-sm shadow-sm backdrop-blur-xl outline-none transition focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 dark:border-white/10 dark:bg-white/[0.04]"
                onClick={handleSearchClick}
                readOnly
              />
            </div>

            <nav className="flex flex-col gap-2">
              <Link href={href("/features")} className="text-base font-semibold text-foreground py-2.5 border-b border-border/60">{labels.features}</Link>
              <Link href={href("/models")} className="text-base font-semibold text-foreground py-2.5 border-b border-border/60">{labels.models}</Link>
              <Link href={href("/products/gemini")} className="text-base font-semibold text-foreground py-2.5 border-b border-border/60">Gemini</Link>
              <Link href={href("/products/notebooklm")} className="text-base font-semibold text-foreground py-2.5 border-b border-border/60">NotebookLM</Link>
              <Link href={href("/products/gemini-enterprise")} className="text-base font-semibold text-foreground py-2.5 border-b border-border/60">Gemini Enterprise</Link>
              <Link href={href("/compare")} className="text-base font-semibold text-foreground py-2.5 border-b border-border/60">{labels.compare}</Link>
              <Link href={href("/pricing")} className="text-base font-semibold text-foreground py-2.5 border-b border-border/60">{labels.pricing}</Link>
              <Link href={href("/plans")} className="text-base font-semibold text-foreground py-2.5 border-b border-border/60">{labels.plans}</Link>

              <div className="py-3 border-b border-border/60">
                <span className="text-base font-semibold text-foreground block mb-3">{labels.apps}</span>
                <div className="grid grid-cols-3 gap-2.5">
                  {apps.map((app) => (
                    <Link
                      key={app.name}
                      href={href(app.href)}
                      className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border border-slate-200/60 bg-white/50 backdrop-blur-md dark:border-white/5 dark:bg-white/[0.02]"
                    >
                      <app.icon className={cn("w-5 h-5", app.color)} />
                      <span className="text-xs font-semibold text-foreground">{app.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link href={href("/enterprise")} className="text-base font-semibold text-foreground py-2.5 border-b border-border/60">{labels.enterprise}</Link>
              <Link href={href("/security")} className="text-base font-semibold text-foreground py-2.5 border-b border-border/60">{labels.security}</Link>
              <Link href={href("/articles")} className="text-base font-semibold text-foreground py-2.5 border-b border-border/60">{labels.articles}</Link>

              <div className="flex items-center justify-between py-3 border-b border-border/60">
                <span className="text-sm font-semibold text-muted-foreground">{labels.theme}</span>
                <ThemeToggle />
              </div>
            </nav>

            <div className="flex items-center justify-between py-3 border-b border-border/60">
              <span className="text-sm font-semibold text-muted-foreground">{labels.language}</span>
              <LocaleSwitcher />
            </div>

            <Link
              href={href("/compare")}
              className="mt-4 block w-full py-3.5 text-center text-sm font-bold text-white bg-gradient-to-r from-google-blue via-gemini-indigo to-gemini-purple rounded-2xl shadow-md hover:shadow-lg transition-all"
            >
              {labels.getStarted}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
