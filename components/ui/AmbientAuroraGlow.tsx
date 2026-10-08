"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AmbientAuroraGlowProps {
  className?: string;
  variant?: "hero" | "subtle" | "violet" | "blue" | "emerald";
}

export function AmbientAuroraGlow({ className, variant = "hero" }: AmbientAuroraGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {variant === "hero" && (
        <>
          <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 h-[600px] w-[850px] rounded-full bg-gradient-to-tr from-blue-600/20 via-violet-600/20 to-pink-500/15 blur-[120px] dark:from-blue-600/25 dark:via-purple-600/25 dark:to-pink-600/15" />
          <div className="absolute top-[20%] right-[-10%] h-[450px] w-[450px] rounded-full bg-cyan-500/15 blur-[100px] dark:bg-cyan-500/20" />
          <div className="absolute top-[40%] left-[-10%] h-[400px] w-[400px] rounded-full bg-purple-600/15 blur-[110px] dark:bg-purple-600/20" />
        </>
      )}

      {variant === "violet" && (
        <>
          <div className="absolute top-0 right-1/4 h-[400px] w-[600px] rounded-full bg-gradient-to-br from-violet-600/20 via-purple-500/15 to-transparent blur-[110px] dark:from-violet-600/25 dark:via-purple-500/20" />
          <div className="absolute bottom-0 left-1/4 h-[350px] w-[500px] rounded-full bg-gradient-to-tr from-indigo-600/15 via-blue-500/10 to-transparent blur-[100px]" />
        </>
      )}

      {variant === "blue" && (
        <>
          <div className="absolute top-0 left-1/3 h-[450px] w-[600px] rounded-full bg-gradient-to-br from-blue-600/20 via-cyan-500/15 to-transparent blur-[110px] dark:from-blue-600/25 dark:via-cyan-500/20" />
        </>
      )}

      {variant === "emerald" && (
        <>
          <div className="absolute top-0 right-1/3 h-[400px] w-[550px] rounded-full bg-gradient-to-br from-emerald-600/20 via-teal-500/15 to-transparent blur-[110px] dark:from-emerald-600/25 dark:via-teal-500/20" />
        </>
      )}

      {variant === "subtle" && (
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 h-[450px] w-[700px] rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent blur-[100px]" />
      )}
    </div>
  );
}
