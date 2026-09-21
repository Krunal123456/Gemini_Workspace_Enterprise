"use client";

import React from "react";
import Link from "next/link";
import { Download, ChevronRight } from "lucide-react";
import { FeatureExplorer } from "@/components/features/FeatureExplorer";
import { features } from "@/data/features";

export default function FeaturesPage() {
  const handleExportCSV = () => {
    const headers = ["Name", "Application", "Category", "Enterprise Availability", "Supported Plans"];
    const rows = features.map(f => {
      const supportedPlans = Object.entries(f.plans)
        .filter(([_, availability]) => availability.available)
        .map(([planId]) => planId)
        .join(", ");
      
      return [
        f.name.replace(/,/g, " "),
        f.application === "gemini" ? "Gemini Chat" : f.application,
        f.category,
        f.enterpriseAvailability,
        supportedPlans
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
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
    <main className="min-h-screen bg-background pb-20 pt-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground font-medium">Features</span>
        </div>

        {/* Hero Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Comprehensive Directory • {features.length} AI Capabilities
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl fluid-h1">
              Google Workspace & Gemini AI Features
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Search, filter, and inspect every generative AI feature across Gmail, Docs, Sheets, Meet, NotebookLM, Vids, and the Gemini Enterprise Chat App.
            </p>
          </div>
          
          <button 
            onClick={handleExportCSV}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-secondary px-6 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Export Features
          </button>
        </div>

        {/* Explorer */}
        <FeatureExplorer viewMode="link" />
      </div>
    </main>
  );
}
