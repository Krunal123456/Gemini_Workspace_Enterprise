"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Database, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { GeminiLogo } from "@/components/logos/GeminiLogo";
import { GoogleCloudLogo } from "@/components/logos/GoogleCloudLogo";
import { MarketStarLogo } from "@/components/logos/MarketStarLogo";
import { SalesforceLogo } from "@/components/logos/SalesforceLogo";
import { JiraLogo } from "@/components/logos/JiraLogo";
import { ConfluenceLogo } from "@/components/logos/ConfluenceLogo";
import { SharePointLogo } from "@/components/logos/SharePointLogo";
import { SlackLogo } from "@/components/logos/SlackLogo";
import { BoxLogo } from "@/components/logos/BoxLogo";
import { GitHubLogo } from "@/components/logos/GitHubLogo";

interface MarqueeItem {
  name: string;
  type: string;
  icon?: React.ElementType;
  logo?: React.ComponentType<{ className?: string }>;
  image?: string;
}

const ITEMS: MarqueeItem[] = [
  { name: "Google Workspace", type: "Native", image: "/brand/workspace-app-icons.png" },
  { name: "Gemini Enterprise", type: "Native", logo: GeminiLogo },
  { name: "Google Cloud", type: "Cloud", logo: GoogleCloudLogo },
  { name: "MarketStar", type: "Partner", logo: MarketStarLogo },
  { name: "Salesforce", type: "MCP Ready", logo: SalesforceLogo },
  { name: "Jira", type: "MCP Ready", logo: JiraLogo },
  { name: "Confluence", type: "MCP Ready", logo: ConfluenceLogo },
  { name: "SharePoint", type: "MCP Ready", logo: SharePointLogo },
  { name: "Slack", type: "MCP Ready", logo: SlackLogo },
  { name: "Box", type: "MCP Ready", logo: BoxLogo },
  { name: "GitHub", type: "MCP Ready", logo: GitHubLogo },
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
              {item.image ? (
                <div className="relative h-6 w-[126px] shrink-0 overflow-hidden" aria-hidden="true">
                  <Image
                    src={item.image}
                    alt=""
                    width={691}
                    height={361}
                    className="absolute left-0 top-0 h-auto w-full max-w-none -translate-y-[40.72%]"
                  />
                </div>
              ) : item.logo ? (
                <item.logo className="h-6 w-auto max-w-[80px] object-contain" />
              ) : item.icon ? (
                <div className="rounded-full border border-border/50 bg-background p-1.5">
                  <item.icon className="h-4 w-4 text-foreground/80" />
                </div>
              ) : null}
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none">{item.name}</span>
                <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold mt-1">
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
