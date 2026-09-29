import Link from "next/link";
import { Sparkles } from "lucide-react";
import { localizeHref } from "@/lib/i18n/href";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type FooterLabels = Dictionary["footer"];

type FooterLink = { name: string; href: string };

// Product names in the Applications column are brand names, so they stay as-is.
const platformLinks: FooterLink[] = [
  { name: "allFeatures", href: "/features" },
  { name: "comparePlans", href: "/compare" },
  { name: "apps", href: "/apps" },
  { name: "notebooklm", href: "/apps/notebooklm" },
  { name: "enterpriseAi", href: "/enterprise" },
];

const enterpriseLinks: FooterLink[] = [
  { name: "connectors", href: "/enterprise/connectors" },
  { name: "agentsMcp", href: "/enterprise/agents" },
  { name: "securityGovernance", href: "/security" },
  { name: "articles", href: "/articles" },
  { name: "pricing", href: "/pricing#pricing-overview" },
];

const applicationNames = [
  "Gmail",
  "Google Docs",
  "Google Sheets",
  "Google Meet",
  "Google Chat",
  "Google Slides",
  "Google Vids",
  "Google Drive",
];

const applicationLinks: FooterLink[] = applicationNames.map((name, index) => ({
  name,
  href: `/apps/${["gmail", "docs", "sheets", "meet", "chat", "slides", "vids", "drive"][index]}`,
}));

function LinkColumn({
  heading,
  links,
  labels,
  href,
}: {
  heading: string;
  links: FooterLink[];
  labels: FooterLabels;
  href: (path: string) => string;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
        {heading}
      </h4>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={`${link.href}-${link.name}`}>
            <Link
              href={href(link.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 inline-block hover:translate-x-1"
            >
              {link.name in labels ? labels[link.name as keyof FooterLabels] : link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({
  labels,
  locale,
}: {
  labels: FooterLabels;
  locale: Locale;
}) {
  const href = (path: string) => localizeHref(locale, path);

  return (
    <footer className="w-full bg-muted/30 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="flex flex-col space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-gemini-purple" />
                <h3 className="text-lg font-semibold text-foreground">
                  Gemini Intelligence
                </h3>
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {labels.by}
              </p>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {labels.blurb}
            </p>
          </div>

          <LinkColumn
            heading={labels.platform}
            links={platformLinks}
            labels={labels}
            href={href}
          />
          <LinkColumn
            heading={labels.enterprise}
            links={enterpriseLinks}
            labels={labels}
            href={href}
          />
          <LinkColumn
            heading={labels.applications}
            links={applicationLinks}
            labels={labels}
            href={href}
          />
        </div>
      </div>
    </footer>
  );
}
