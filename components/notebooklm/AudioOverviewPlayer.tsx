"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Headphones,
  FileText,
  Share2,
  CheckCircle2,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-context";
import { createPhraseTranslator } from "@/lib/i18n/translate";

interface TranscriptSegment {
  id: string;
  speaker: string;
  role: string;
  avatarBg: string;
  timestamp: string;
  seconds: number;
  text: string;
  citation?: {
    sourceTitle: string;
    sourcePage: string;
    excerpt: string;
  };
}

const transcriptSegments: TranscriptSegment[] = [
  {
    id: "seg-1",
    speaker: "Alex (AI Host)",
    role: "Research & Systems",
    avatarBg: "from-blue-500 to-indigo-600",
    timestamp: "00:04",
    seconds: 4,
    text: "Welcome to this NotebookLM Deep Dive. Today we're unpacking Google's Gemini 3.0 frontier architecture and how its 4-million token multimodal context changes enterprise knowledge synthesis.",
    citation: {
      sourceTitle: "Google_Gemini_3_Frontier_Architecture.pdf",
      sourcePage: "Page 4, Section 2.1",
      excerpt: "Gemini 3.0 expands native multimodal context to 4M+ tokens with integrated autonomous planning and associative recall.",
    },
  },
  {
    id: "seg-2",
    speaker: "Sarah (AI Host)",
    role: "Enterprise Architecture",
    avatarBg: "from-violet-500 to-fuchsia-600",
    timestamp: "00:22",
    seconds: 22,
    text: "Right! What's really fascinating here is the associative retrieval. Instead of doing shallow vector chunking, Gemini 3.0 Pro holds full corporate codebases and decades of contracts in active neural memory.",
    citation: {
      sourceTitle: "Enterprise_Knowledge_Retrieval_Benchmark.pdf",
      sourcePage: "Page 12, Table 3",
      excerpt: "Direct associative in-context synthesis eliminates chunk fragmentation errors in complex legal cross-referencing.",
    },
  },
  {
    id: "seg-3",
    speaker: "Alex (AI Host)",
    role: "Research & Systems",
    avatarBg: "from-blue-500 to-indigo-600",
    timestamp: "00:48",
    seconds: 48,
    text: "And for high-frequency interactive agents, Gemini 3.0 Flash achieves sub-100ms response cycles, making real-time tool calling feel instantaneous across Google Workspace and private VPC databases.",
    citation: {
      sourceTitle: "Gemini_3_Flash_Latency_Specs.pdf",
      sourcePage: "Page 7, Chart 1",
      excerpt: "Sub-100ms time-to-first-token enable continuous autonomous tool invocation loops without user latency bottlenecks.",
    },
  },
  {
    id: "seg-4",
    speaker: "Sarah (AI Host)",
    role: "Enterprise Architecture",
    avatarBg: "from-violet-500 to-fuchsia-600",
    timestamp: "01:15",
    seconds: 75,
    text: "Crucially for security teams, every citation is strictly grounded. If information isn't in your uploaded enterprise documents or IAM scope, NotebookLM will not hallucinate external assumptions.",
    citation: {
      sourceTitle: "Google_Workspace_Security_Whitepaper.pdf",
      sourcePage: "Page 19, Section 4.3",
      excerpt: "Strict source-only bounding enforces deterministic provenance with full verification traces for compliance audits.",
    },
  },
];

export function AudioOverviewPlayer() {
  const { locale } = useLocale();
  const t = createPhraseTranslator(locale);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 1.5 | 2>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeCitation, setActiveCitation] = useState<TranscriptSegment["citation"] | null>(null);
  const [copied, setCopied] = useState(false);

  const totalDuration = 105; // 1 min 45 sec

  const activeSegmentIndex = transcriptSegments.reduce((acc, seg, idx) => {
    return currentTime >= seg.seconds ? idx : acc;
  }, 0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, totalDuration]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSeek = (seconds: number) => {
    setCurrentTime(seconds);
    if (!isPlaying) setIsPlaying(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/50 dark:border-white/10 bg-white/80 dark:bg-slate-900/75 p-6 sm:p-8 shadow-[0_30px_90px_-25px_rgba(99,102,241,0.25)] dark:shadow-[0_30px_90px_-25px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
      {/* Background Aurora Orb */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-tr from-pink-500/15 to-purple-500/10 blur-3xl" />

      {/* Header Info */}
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-500 text-white shadow-lg shadow-violet-500/30">
            <Headphones className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-300/60 bg-violet-50/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/15 dark:text-violet-200">
                <Radio className="h-3 w-3 animate-pulse text-violet-600 dark:text-violet-400" />
                {t("Audio Overview AI Simulation")}
              </span>
              <span className="text-xs text-muted-foreground">· 2 AI Hosts</span>
            </div>
            <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {t("Gemini 3.0 & Enterprise Long-Context Deep Dive")}
            </h3>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur-md transition hover:border-violet-500/40 hover:text-foreground"
          >
            {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
            {copied ? t("Copied!") : t("Share Overview")}
          </button>
        </div>
      </div>

      {/* Visualizer & Controls */}
      <div className="relative z-10 my-6 rounded-2xl border border-border/60 bg-slate-50/70 dark:bg-slate-950/60 p-5 backdrop-blur-xl">
        {/* Animated Soundwave Visualizer */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 h-16 sm:h-20 mb-4 px-2">
          {[
            18, 34, 52, 28, 65, 82, 45, 90, 70, 38, 95, 60, 42, 78, 85, 30, 68,
            92, 50, 75, 40, 88, 62, 35, 80, 55, 25, 70, 48, 86, 32, 64, 45, 90,
            60, 38, 72, 50, 85, 30, 68, 95, 40, 78, 55, 30, 65, 45,
          ].map((height, i) => {
            const isBarActive = isPlaying;
            return (
              <motion.div
                key={i}
                animate={
                  isBarActive
                    ? {
                        height: [
                          `${Math.max(12, height * 0.3)}%`,
                          `${height}%`,
                          `${Math.max(15, height * 0.5)}%`,
                        ],
                      }
                    : { height: "14%" }
                }
                transition={{
                  duration: 0.6 + (i % 5) * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: (i % 7) * 0.08,
                }}
                className={cn(
                  "w-1 sm:w-1.5 rounded-full transition-colors duration-200",
                  (currentTime / totalDuration) * 48 >= i
                    ? "bg-gradient-to-t from-violet-600 via-indigo-500 to-blue-400 dark:from-violet-400 dark:to-cyan-400"
                    : "bg-slate-300/80 dark:bg-slate-800"
                )}
              />
            );
          })}
        </div>

        {/* Progress Bar & Timers */}
        <div className="space-y-2">
          <div className="relative h-2 w-full cursor-pointer rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-violet-600 to-blue-500"
              style={{ width: `${(currentTime / totalDuration) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
        </div>

        {/* Audio Controls Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/30 transition hover:scale-105 active:scale-95"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </button>

            <button
              onClick={() => setCurrentTime(0)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition hover:border-violet-500/40 hover:text-foreground"
              title="Restart"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition hover:border-violet-500/40 hover:text-foreground"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-4 w-4 text-red-500" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 rounded-xl border border-border/80 bg-background/60 p-1 backdrop-blur-md">
            {([1, 1.25, 1.5, 2] as const).map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-bold transition",
                  playbackSpeed === spd
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Interactive Transcript */}
      <div className="relative z-10 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {t("Interactive Source-Grounded Transcript")}
        </h4>

        <div className="space-y-3">
          {transcriptSegments.map((segment, idx) => {
            const isActive = idx === activeSegmentIndex;
            return (
              <div
                key={segment.id}
                onClick={() => handleSeek(segment.seconds)}
                className={cn(
                  "group relative cursor-pointer rounded-2xl border p-4 transition-all duration-200",
                  isActive
                    ? "border-violet-500/50 bg-violet-50/60 shadow-md dark:border-violet-400/30 dark:bg-violet-950/30"
                    : "border-border/60 bg-background/50 hover:border-border hover:bg-background/80"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        "h-7 w-7 rounded-full bg-gradient-to-tr flex items-center justify-center text-[10px] font-bold text-white shadow-sm",
                        segment.avatarBg
                      )}
                    >
                      {segment.speaker[0]}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-foreground">{segment.speaker}</span>
                      <span className="ml-2 text-[10px] text-muted-foreground">{segment.role}</span>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-muted-foreground group-hover:text-violet-600 dark:group-hover:text-violet-400">
                    {segment.timestamp}
                  </span>
                </div>

                <p className="mt-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {segment.text}
                </p>

                {segment.citation && (
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCitation(segment.citation ?? null);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200/80 bg-blue-50/80 dark:border-blue-400/20 dark:bg-blue-500/10 px-2.5 py-1 text-[11px] font-semibold text-blue-700 dark:text-blue-300 transition hover:bg-blue-100 dark:hover:bg-blue-500/20"
                    >
                      <FileText className="h-3 w-3" />
                      <span>{t("Verified Source: {title}", { title: segment.citation.sourceTitle })}</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Grounded Citation Modal Popup */}
      <AnimatePresence>
        {activeCitation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setActiveCitation(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full rounded-3xl border border-white/40 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-2xl"
            >
              <div className="flex items-center gap-2.5 text-violet-600 dark:text-violet-400">
                <FileText className="h-5 w-5" />
                <h4 className="font-bold text-foreground">{activeCitation.sourceTitle}</h4>
              </div>
              <p className="mt-1 text-xs text-muted-foreground font-mono">{activeCitation.sourcePage}</p>

              <div className="mt-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 p-4">
                <p className="text-xs italic text-slate-700 dark:text-slate-300 leading-relaxed">
                  &ldquo;{activeCitation.excerpt}&rdquo;
                </p>
              </div>

              <button
                onClick={() => setActiveCitation(null)}
                className="mt-5 w-full rounded-xl bg-violet-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-violet-700"
              >
                {t("Close Citation Preview")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
