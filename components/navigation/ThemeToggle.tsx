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
    return <div className={cn("h-8 w-24 bg-muted/50 animate-pulse rounded-full", className)} />;
  }

  return (
    <div
      className={cn(
        "flex items-center p-0.5 bg-muted/60 dark:bg-muted/40 rounded-full border border-border backdrop-blur-sm shadow-sm",
        className
      )}
      role="radiogroup"
      aria-label="Theme selector"
    >
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "p-1.5 rounded-full transition-all duration-200 text-xs flex items-center justify-center",
          theme === "light"
            ? "bg-background text-foreground shadow-sm scale-105"
            : "text-muted-foreground hover:text-foreground hover:bg-background/40"
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
          "p-1.5 rounded-full transition-all duration-200 text-xs flex items-center justify-center",
          theme === "system"
            ? "bg-background text-foreground shadow-sm scale-105"
            : "text-muted-foreground hover:text-foreground hover:bg-background/40"
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
          "p-1.5 rounded-full transition-all duration-200 text-xs flex items-center justify-center",
          theme === "dark"
            ? "bg-background text-foreground shadow-sm scale-105"
            : "text-muted-foreground hover:text-foreground hover:bg-background/40"
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
