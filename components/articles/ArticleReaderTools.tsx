"use client";

import { useEffect, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";

export interface ArticleSectionLink {
  id: string;
  title: string;
}

interface ArticleReaderToolsProps {
  title: string;
  excerpt: string;
  sections: ArticleSectionLink[];
  labels: {
    contents: string;
    share: string;
    copyLink: string;
    copied: string;
    copyFailed: string;
    readingProgress: string;
  };
}

function copyTextFallback(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

export function ArticleReaderTools({
  title,
  excerpt,
  sections,
  labels,
}: ArticleReaderToolsProps) {
  const [progress, setProgress] = useState(0);
  const [copyStatus, setCopyStatus] = useState<"copied" | "failed" | null>(null);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const article = document.getElementById("article-reading-content");
        if (!article) return;

        const rect = article.getBoundingClientRect();
        const articleTop = window.scrollY + rect.top;
        const scrollRange = Math.max(1, rect.height - window.innerHeight);
        const nextProgress = Math.min(
          100,
          Math.max(0, ((window.scrollY - articleTop) / scrollRange) * 100),
        );
        setProgress(Math.round(nextProgress));
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const copyArticleLink = async () => {
    try {
      let copied = false;
      if (navigator.clipboard?.writeText) {
        copied = await Promise.race([
          navigator.clipboard.writeText(window.location.href).then(
            () => true,
            () => false,
          ),
          new Promise<boolean>((resolve) => window.setTimeout(() => resolve(false), 1000)),
        ]);
      }
      if (!copied) copied = copyTextFallback(window.location.href);
      if (!copied) throw new Error("Clipboard copy failed");
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus(null), 2000);
    } catch {
      setCopyStatus("failed");
    }
  };

  const shareArticle = async () => {
    if (!navigator.share) {
      await copyArticleLink();
      return;
    }

    try {
      await navigator.share({ title, text: excerpt, url: window.location.href });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      await copyArticleLink();
    }
  };

  return (
    <div className="mb-8">
      <div className="sticky top-16 z-40 mb-6 sm:top-20">
        <div
          className="h-1 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-label={labels.readingProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="h-full rounded-full bg-google-blue transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 border-b border-border/60 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          {sections.length > 0 && (
            <nav aria-label={labels.contents}>
              <h2 className="text-sm font-bold text-foreground">{labels.contents}</h2>
              <ol className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {sections.map((section, index) => (
                  <li key={section.id} className="min-w-0">
                    <a
                      href={`#${section.id}`}
                      className="flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-google-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue"
                    >
                      <span className="shrink-0 font-semibold tabular-nums text-google-blue">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
          <button
            type="button"
            onClick={shareArticle}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue"
          >
            <Share2 className="h-4 w-4" aria-hidden="true" />
            {labels.share}
          </button>
          <button
            type="button"
            onClick={copyArticleLink}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue"
          >
            {copyStatus === "copied" ? (
              <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            ) : (
              <Link2 className="h-4 w-4" aria-hidden="true" />
            )}
            {copyStatus === "copied" ? labels.copied : labels.copyLink}
          </button>
          <span
            className={copyStatus === "failed" ? "text-xs text-destructive" : "sr-only"}
            aria-live="polite"
          >
            {copyStatus === "failed" ? labels.copyFailed : ""}
          </span>
        </div>
      </div>
    </div>
  );
}