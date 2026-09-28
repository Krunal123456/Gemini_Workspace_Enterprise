import Link from "next/link";
import { Sparkles } from "lucide-react";

const platformLinks = [
  { name: "All Features", href: "/features" },
  { name: "Compare Plans", href: "/compare" },
  { name: "Applications", href: "/apps" },
  { name: "NotebookLM", href: "/apps/notebooklm" },
  { name: "Enterprise AI", href: "/enterprise" },
];

const enterpriseLinks = [
  { name: "Connectors", href: "/enterprise/connectors" },
  { name: "Agents & MCP", href: "/enterprise/agents" },
  { name: "Security & Governance", href: "/security" },
  { name: "Articles", href: "/articles" },
  { name: "Pricing", href: "/pricing#pricing-overview" },
];

const applicationLinks = [
  { name: "Gmail", href: "/apps/gmail" },
  { name: "Google Docs", href: "/apps/docs" },
  { name: "Google Sheets", href: "/apps/sheets" },
  { name: "Google Meet", href: "/apps/meet" },
  { name: "Google Chat", href: "/apps/chat" },
  { name: "Google Slides", href: "/apps/slides" },
  { name: "Google Vids", href: "/apps/vids" },
  { name: "Google Drive", href: "/apps/drive" },
];

export function Footer() {
  return (
    <footer className="w-full bg-muted/30 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        {/* Main content py-16, grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1 - Brand */}
          <div className="flex flex-col space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-gemini-purple" />
                <h3 className="text-lg font-semibold text-foreground">Gemini Intelligence</h3>
              </div>
              <p className="text-sm font-medium text-muted-foreground">by MarketStar</p>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The definitive intelligence platform for Google Workspace & Gemini AI capabilities.
            </p>
          </div>

          {/* Column 2 - Platform */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
              Platform
            </h4>
            <ul className="space-y-4">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 inline-block hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Enterprise */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
              Enterprise
            </h4>
            <ul className="space-y-4">
              {enterpriseLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 inline-block hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Applications */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
              Applications
            </h4>
            <ul className="space-y-4">
              {applicationLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 inline-block hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-border py-6">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            © 2025 MarketStar. All rights reserved. Google Workspace and Gemini are trademarks of Google LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}
