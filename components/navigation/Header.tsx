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
      setScrolled(window.scrollY > 50);
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
          ? "top-0 bg-background py-2 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
          : "top-4 bg-transparent"
      )}
      onKeyDown={handleKeyDown}
    >
      <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8">
        <div className={cn(
          "relative flex items-center justify-between gap-2 sm:gap-3 xl:gap-4 rounded-full border border-slate-200/80 bg-white/80 px-3 sm:px-4 py-2 sm:py-2.5 shadow-[0_20px_50px_-25px_rgba(30,64,175,0.28)] backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-slate-950/70",
          scrolled && "border-blue-200/90 bg-white dark:border-blue-500/20 dark:bg-slate-950"
        )}>
          <Link href={href("/")} className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3 rounded-full outline-none focus-visible:ring-2 ring-primary">
            <MarketStarLogo className="h-4 w-auto shrink-0 object-contain sm:h-5" />
            <div className="hidden h-4 w-px bg-slate-300 dark:bg-white/10 sm:block" />
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300 xl:block">
              Gemini Intelligence
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 rounded-full border border-slate-200 bg-slate-50/80 p-0.5 xl:flex dark:border-white/10 dark:bg-white/[0.02]">
            {navItems.map((item) => {
              const isActive = pathname === href(item.href) || pathname.startsWith(`${href(item.href)}/`);
              return (
                <Link
                  key={item.key}
                  href={href(item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-200 2xl:px-3 2xl:py-1.5 2xl:text-sm whitespace-nowrap",
                    isActive ? "text-violet-800 dark:text-violet-200 font-semibold" : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  )}
                >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-violet-500/10 dark:bg-violet-300/10"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                )}
                <span className="relative z-10">{labels[item.key]}</span>
                </Link>
              );
            })}

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAppsDropdownOpen(!appsDropdownOpen)}
                aria-expanded={appsDropdownOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white 2xl:px-3 2xl:py-1.5 2xl:text-sm whitespace-nowrap"
              >
                {labels.apps}
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", appsDropdownOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {appsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-full mt-3 w-[520px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_30px_90px_-35px_rgba(96,165,250,0.45)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/90 z-50"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {apps.map((app) => (
                        <Link
                          key={app.name}
                          href={href(app.href)}
                          className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-transparent bg-slate-50/80 p-3 text-center transition-all duration-200 hover:border-blue-400/30 hover:bg-blue-500/5 dark:bg-white/[0.02]"
                        >
                          <app.icon className={cn("h-5 w-5 transition-transform duration-200 group-hover:scale-110", app.color)} />
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{app.name}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <ThemeToggle className="hidden sm:flex" />
            <LocaleSwitcher className="hidden sm:flex" />
            <button
              onClick={handleSearchClick}
              aria-label={labels.searchSite}
              title={`${labels.search} (⌘K)`}
              className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border border-slate-200/90 bg-white/80 text-slate-600 transition-colors hover:border-blue-400/30 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-300 dark:hover:text-white"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          <button
            className="shrink-0 rounded-full p-2 text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue dark:text-slate-100 dark:hover:bg-white/10 xl:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={labels.toggleMenu}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-background border-b shadow-lg p-6 flex flex-col gap-6 lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={labels.searchPlaceholder}
                className="w-full pl-9 pr-4 py-2 bg-muted border-transparent focus:bg-background focus:border-primary rounded-lg text-sm transition-colors outline-none"
                onClick={handleSearchClick}
                readOnly
              />
            </div>

            <nav className="flex flex-col gap-4">
              <Link href={href("/features")} className="text-lg font-medium text-foreground py-2 border-b">{labels.features}</Link>
              <Link href={href("/models")} className="text-lg font-medium text-foreground py-2 border-b">{labels.models}</Link>
              <Link href={href("/products/gemini")} className="text-lg font-medium text-foreground py-2 border-b">Gemini</Link>
              <Link href={href("/products/notebooklm")} className="text-lg font-medium text-foreground py-2 border-b">NotebookLM</Link>
              <Link href={href("/products/gemini-enterprise")} className="text-lg font-medium text-foreground py-2 border-b">Gemini Enterprise</Link>
              <Link href={href("/compare")} className="text-lg font-medium text-foreground py-2 border-b">{labels.compare}</Link>
              <Link href={href("/pricing")} className="text-lg font-medium text-foreground py-2 border-b">{labels.pricing}</Link>
              <Link href={href("/plans")} className="text-lg font-medium text-foreground py-2 border-b">{labels.plans}</Link>

              <div className="py-2 border-b">
                <span className="text-lg font-medium text-foreground block mb-4">{labels.apps}</span>
                <div className="grid grid-cols-3 gap-4">
                  {apps.map((app) => (
                    <Link
                      key={app.name}
                      href={href(app.href)}
                      className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted/50"
                    >
                      <app.icon className={cn("w-6 h-6", app.color)} />
                      <span className="text-xs font-medium">{app.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link href={href("/enterprise")} className="text-lg font-medium text-foreground py-2 border-b">{labels.enterprise}</Link>
              <Link href={href("/security")} className="text-lg font-medium text-foreground py-2 border-b">{labels.security}</Link>
              <Link href={href("/articles")} className="text-lg font-medium text-foreground py-2 border-b">{labels.articles}</Link>

              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-sm font-medium text-muted-foreground">{labels.theme}</span>
                <ThemeToggle />
              </div>
            </nav>

            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-sm font-medium text-muted-foreground">{labels.language}</span>
              <LocaleSwitcher />
            </div>

            <Link
              href={href("/compare")}
              className="w-full py-3 text-center text-sm font-medium text-white bg-gradient-to-r from-[#4A47F6] to-[#8C52FF] rounded-lg mt-2"
            >
              {labels.getStarted}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
