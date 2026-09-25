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
  { name: "Features", href: "/features" },
  { name: "Models", href: "/models" },
  { name: "Compare", href: "/compare" },
  { name: "Pricing", href: "/pricing" },
  { name: "Enterprise", href: "/enterprise" },
  { name: "Security", href: "/security" },
  { name: "Articles", href: "/articles" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appsDropdownOpen, setAppsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
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
        "fixed inset-x-0 top-4 z-50 transition-all duration-300",
        scrolled ? "opacity-100" : "opacity-100"
      )}
      onKeyDown={handleKeyDown}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "relative flex items-center justify-between gap-4 rounded-full border border-slate-200/80 bg-white/75 px-4 py-3 shadow-[0_20px_50px_-25px_rgba(30,64,175,0.28)] backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-slate-950/70",
          scrolled && "border-blue-200/90 bg-white/85 dark:border-blue-500/20 dark:bg-slate-950/80"
        )}>
          <Link href="/" className="flex items-center gap-3 outline-none focus-visible:ring-2 ring-primary rounded-full">
            <MarketStarLogo className="h-6 w-auto text-slate-900 dark:text-white" />
            <div className="hidden h-5 w-px bg-slate-300 dark:bg-white/10 sm:block" />
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-600 dark:text-slate-300 md:block">
              Gemini Intelligence
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1 lg:flex dark:border-white/10 dark:bg-white/[0.02]">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200",
                    isActive ? "text-violet-800 dark:text-violet-200" : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  )}
                >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-violet-500/10 dark:bg-violet-300/10"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAppsDropdownOpen(!appsDropdownOpen)}
                aria-expanded={appsDropdownOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                Apps
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", appsDropdownOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {appsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-full mt-3 w-[520px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_30px_90px_-35px_rgba(96,165,250,0.45)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/90"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {apps.map((app) => (
                        <Link
                          key={app.name}
                          href={app.href}
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

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              onClick={handleSearchClick}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-600 transition-colors hover:border-blue-400/30 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-300 dark:hover:text-white"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Link
                href="/compare"
                className="inline-flex items-center justify-center rounded-full border border-violet-800 bg-violet-700 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_-12px_rgba(124,58,237,0.75)] transition-all duration-300 hover:translate-y-[-1px] hover:bg-violet-600 hover:shadow-[0_14px_28px_-12px_rgba(124,58,237,0.8)]"
              >
                Launch Workspace
              </Link>
            </motion.div>
          </div>

          <button
            className="lg:hidden p-2 text-slate-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 bg-muted border-transparent focus:bg-background focus:border-primary rounded-lg text-sm transition-colors outline-none"
                onClick={handleSearchClick}
                readOnly
              />
            </div>
            
            <nav className="flex flex-col gap-4">
              <Link href="/features" className="text-lg font-medium text-foreground py-2 border-b">Features</Link>
              <Link href="/products/gemini" className="text-lg font-medium text-foreground py-2 border-b">Gemini</Link>
              <Link href="/products/notebooklm" className="text-lg font-medium text-foreground py-2 border-b">NotebookLM</Link>
              <Link href="/products/gemini-enterprise" className="text-lg font-medium text-foreground py-2 border-b">Gemini Enterprise</Link>
              <Link href="/compare" className="text-lg font-medium text-foreground py-2 border-b">Compare</Link>
              
              <div className="py-2 border-b">
                <span className="text-lg font-medium text-foreground block mb-4">Apps</span>
                <div className="grid grid-cols-3 gap-4">
                  {apps.map((app) => (
                    <Link
                      key={app.name}
                      href={app.href}
                      className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted/50"
                    >
                      <app.icon className={cn("w-6 h-6", app.color)} />
                      <span className="text-xs font-medium">{app.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link href="/enterprise" className="text-lg font-medium text-foreground py-2 border-b">Enterprise</Link>
              <Link href="/security" className="text-lg font-medium text-foreground py-2 border-b">Security</Link>
              <Link href="/articles" className="text-lg font-medium text-foreground py-2 border-b">Articles</Link>

              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-sm font-medium text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
            </nav>
            
            <Link
              href="/compare"
              className="w-full py-3 text-center text-sm font-medium text-white bg-gradient-to-r from-[#4A47F6] to-[#8C52FF] rounded-lg mt-2"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
