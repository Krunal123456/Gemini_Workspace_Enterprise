"use client";

import React, { useState } from "react";
import { Share2, Check, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ActionButtons({ 
  featureName, 
  documentationUrl 
}: { 
  featureName: string;
  documentationUrl?: string; 
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {documentationUrl && (
        <a 
          href={documentationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Official Documentation
          <ExternalLink className="h-4 w-4" />
        </a>
      )}

      <Link 
        href="/compare"
        className={cn(
          "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted",
          !documentationUrl && "bg-primary text-primary-foreground hover:bg-primary/90 border-transparent hover:border-transparent"
        )}
      >
        Compare Plans
      </Link>

      <button
        onClick={handleShare}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
        title="Share Feature"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-green-500" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </>
        )}
      </button>
    </div>
  );
}
