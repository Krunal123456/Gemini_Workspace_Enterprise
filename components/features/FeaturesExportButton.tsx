"use client";

import React from "react";
import { Download } from "lucide-react";
import type { Feature } from "@/types";

interface FeaturesExportButtonProps {
  features: Feature[];
  label: string;
}

export function FeaturesExportButton({ features, label }: FeaturesExportButtonProps) {
  const handleExportCSV = () => {
    const headers = ["Name", "Application", "Category", "Enterprise Availability", "Supported Plans"];
    const rows = features.map((f) => {
      const supportedPlans = Object.entries(f.plans)
        .filter(([_, availability]) => availability.available)
        .map(([planId]) => planId)
        .join(", ");

      return [
        f.name.replace(/,/g, " "),
        f.application === "gemini" ? "Gemini Chat" : f.application,
        f.category,
        f.enterpriseAvailability,
        supportedPlans,
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "gemini-enterprise-features.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExportCSV}
      className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-secondary px-6 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    >
      <Download className="h-4 w-4" />
      {label}
    </button>
  );
}
