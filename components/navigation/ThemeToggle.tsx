"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme/ThemeProvider";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn("h-8 w-24 bg-white/40 dark:bg-white/5 animate-pulse rounded-full border border-slate-200/50 dark:border-white/10", className)} />;
  }

  return (
    <div
      className={cn(
        "flex items-center p-0.5 rounded-full border border-slate-200/80 bg-white/70 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] shrink-0",
        className
      )}
      role="radiogroup"
      aria-label="Theme selector"
    >
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "h-6.5 w-6.5 sm:h-7 sm:w-7 rounded-full transition-all duration-200 text-xs flex items-center justify-center shrink-0",
          theme === "light"
            ? "bg-white text-slate-900 shadow-sm shadow-slate-900/10 scale-105 border border-slate-200/80"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        )}
        aria-label="Light theme"
        title="Light theme"
        aria-checked={theme === "light"}
        role="radio"
      >
        <Sun className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => setTheme("system")}
        className={cn(
          "h-6.5 w-6.5 sm:h-7 sm:w-7 rounded-full transition-all duration-200 text-xs flex items-center justify-center shrink-0",
          theme === "system"
            ? "bg-white text-slate-900 shadow-sm shadow-slate-900/10 scale-105 border border-slate-200/80 dark:bg-white/20 dark:text-white dark:border-white/20"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        )}
        aria-label="System theme"
        title="System theme"
        aria-checked={theme === "system"}
        role="radio"
      >
        <Monitor className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "h-6.5 w-6.5 sm:h-7 sm:w-7 rounded-full transition-all duration-200 text-xs flex items-center justify-center shrink-0",
          theme === "dark"
            ? "bg-slate-900 text-white shadow-sm shadow-purple-500/20 scale-105 border border-white/20 dark:bg-violet-600 dark:border-violet-400/30"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        )}
        aria-label="Dark theme"
        title="Dark theme"
        aria-checked={theme === "dark"}
        role="radio"
      >
        <Moon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
