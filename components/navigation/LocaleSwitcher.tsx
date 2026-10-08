"use client";

import { useState, useRef, useEffect, useTransition, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

interface LocaleOption {
  code: Locale;
  label: string;
  nativeLabel: string;
  shortLabel: string;
}

const languageOptions: LocaleOption[] = [
  { code: "en", label: "English", nativeLabel: "English", shortLabel: "EN" },
  { code: "es", label: "Spanish", nativeLabel: "Español", shortLabel: "ES" },
];

/**
 * Dropdown language switcher for the header & mobile menu.
 * High-definition frosted glass design.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption =
    languageOptions.find((opt) => opt.code === locale) ?? languageOptions[0];

  const handleSelect = (code: Locale) => {
    setIsOpen(false);
    if (code === locale) return;
    startTransition(() => {
      setLocale(code);
    });
  };

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    },
    [],
  );

  return (
    <div
      className={cn("relative inline-flex items-center", className)}
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isPending}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Language selector. Current language: ${currentOption.nativeLabel}`}
        className={cn(
          "flex h-8 sm:h-9 items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/70 px-2.5 sm:px-3 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-xl transition-all duration-200 hover:border-violet-400/40 hover:bg-white hover:text-slate-950 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.1] dark:hover:text-white shrink-0",
          isOpen && "border-violet-400/50 bg-white shadow-md dark:border-white/20 dark:bg-white/[0.1]",
          isPending && "opacity-70 cursor-wait",
        )}
      >
        <Globe className="h-3.5 w-3.5 shrink-0 text-violet-600 dark:text-violet-400" />
        <span className="text-xs font-bold tracking-wider">
          {currentOption.shortLabel}
        </span>
        <ChevronDown
          className={cn(
            "h-3 w-3 shrink-0 text-slate-400 transition-transform duration-200",
            isOpen && "rotate-180 text-violet-600 dark:text-violet-300",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="menu"
            aria-orientation="vertical"
            className="absolute right-0 top-full mt-2 min-w-[160px] origin-top-right rounded-2xl border border-slate-200/90 bg-white/90 p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15),0_1px_0_0_rgba(255,255,255,0.9)_inset] backdrop-blur-2xl dark:border-white/15 dark:bg-slate-950/90 dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8),0_1px_0_0_rgba(255,255,255,0.1)_inset] z-50"
          >
            <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Language / Idioma
            </div>
            {languageOptions.map((option) => {
              const isActive = option.code === locale;
              return (
                <button
                  key={option.code}
                  type="button"
                  role="menuitem"
                  onClick={() => handleSelect(option.code)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold transition-all duration-150",
                    isActive
                      ? "bg-violet-500/15 text-violet-900 font-bold dark:bg-violet-400/20 dark:text-violet-100"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-white",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span>{option.nativeLabel}</span>
                    <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">
                      ({option.shortLabel})
                    </span>
                  </div>
                  {isActive && (
                    <Check className="h-3.5 w-3.5 shrink-0 text-violet-600 dark:text-violet-300" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
