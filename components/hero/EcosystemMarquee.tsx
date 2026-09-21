"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Database,
  Link2,
  Code,
  Zap,
  Briefcase,
  Share2,
  Shield,
  Search,
  Cloud,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MarqueeItem {
  name: string;
  type: string;
  icon: React.ElementType;
}

const ITEMS: MarqueeItem[] = [
  { name: "Google Workspace", type: "Native", icon: Database },
  { name: "Gemini Enterprise", type: "Native", icon: Zap },
  { name: "Google Cloud", type: "Cloud", icon: Cloud },
  { name: "MarketStar", type: "Partner", icon: Briefcase },
  { name: "Salesforce", type: "MCP Ready", icon: Link2 },
  { name: "Jira", type: "MCP Ready", icon: Code },
  { name: "Confluence", type: "MCP Ready", icon: Share2 },
  { name: "SharePoint", type: "MCP Ready", icon: Database },
  { name: "Slack", type: "MCP Ready", icon: Link2 },
  { name: "Box", type: "MCP Ready", icon: Database },
  { name: "GitHub", type: "MCP Ready", icon: Code },
  { name: "BigQuery", type: "Native", icon: Database },
  { name: "Model Context Protocol", type: "MCP Ready", icon: Shield },
];

// Duplicate items to ensure smooth infinite scroll
const MARQUEE_ITEMS = [...ITEMS, ...ITEMS];

export function EcosystemMarquee({ className }: { className?: string }) {
  return (
    <div className={cn("w-full overflow-hidden flex flex-col gap-4 py-8 relative", className)}>
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex w-fit group">
        <motion.div
          className="flex gap-4 pr-4"
          animate={{ x: "-50%" }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {MARQUEE_ITEMS.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex-shrink-0 bg-muted/30 backdrop-blur-sm border border-border/60 group-hover:border-gemini-purple/30 px-5 py-2.5 rounded-full flex items-center gap-3 transition-colors duration-300 hover:!border-gemini-purple/60 hover:bg-muted/50 cursor-default"
            >
              <div className="p-1.5 bg-background rounded-full shadow-sm border border-border/50">
                <item.icon className="w-4 h-4 text-foreground/80" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none">{item.name}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-1">
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
