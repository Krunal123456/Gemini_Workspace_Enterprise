"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Sparkles,
  Search,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Send,
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  Star,
  FileText,
  AlertCircle,
  RefreshCw,
  Zap,
  Bot,
  UserCheck,
} from "lucide-react";

interface SearchPreset {
  query: string;
  answer: string;
  sourceThread: {
    sender: string;
    subject: string;
    date: string;
  };
}

const SEARCH_PRESETS: SearchPreset[] = [
  {
    query: "Find the Q3 budget spreadsheet Jason emailed last week",
    answer: "Found in thread from Jason Miller on Oct 8: 'Attached is the finalized Q3_Budget_Variance_v4.xlsx. Total OPEX variance is +2.4% with marketing reallocations approved.'",
    sourceThread: {
      sender: "jason.miller@company.com",
      subject: "Final Q3 Budget Breakdown & Variance Sheet",
      date: "Oct 8, 2026",
    },
  },
  {
    query: "What is my flight confirmation for the Chicago conference?",
    answer: "United Airlines confirmation #UA-9821X4: Flight UA 412 departing SFO 08:35 AM arriving ORD 02:45 PM on Monday, Oct 26. Hotel reservation at Hyatt Regency Chicago attached.",
    sourceThread: {
      sender: "reservations@united.com",
      subject: "E-Ticket Confirmation - San Francisco to Chicago (ORD)",
      date: "Oct 12, 2026",
    },
  },
  {
    query: "Which contracts are pending legal signature by Friday?",
    answer: "1 contract pending: Acme Global Master Service Agreement (MSA) requires General Counsel signature before 5:00 PM Friday. Docusign envelope #DOC-8821 routed to legal@company.com.",
    sourceThread: {
      sender: "docusign@company.com",
      subject: "ACTION REQUIRED: Acme Global Enterprise MSA Signature",
      date: "Oct 14, 2026",
    },
  },
];

export function AiInboxShowcase() {
  const [activeTab, setActiveTab] = useState<"digest" | "search" | "overview" | "replies">("digest");
  const [selectedSearch, setSelectedSearch] = useState<SearchPreset>(SEARCH_PRESETS[0]);
  const [refinedTone, setRefinedTone] = useState<"default" | "formal" | "concise" | "extension">("default");

  return (
    <div className="rounded-3xl border border-red-500/20 bg-card p-6 sm:p-8 space-y-8 shadow-xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-2 border border-red-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen Gmail Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Gemini AI Inbox &amp; Proactive Intelligence
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-3xl leading-relaxed">
            Highlighted by Alphabet CEO Sundar Pichai: Gmail is evolving from a chronological email archive into an
            active intelligence assistant. Discover the Morning AI Digest, conversational search, thread overviews, and
            contextual drafting.
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap p-1 rounded-2xl bg-muted border border-border shrink-0">
          <button
            onClick={() => setActiveTab("digest")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "digest"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Morning AI Digest
          </button>
          <button
            onClick={() => setActiveTab("search")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "search"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Conversational Search
          </button>
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "overview"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Thread AI Overviews
          </button>
          <button
            onClick={() => setActiveTab("replies")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "replies"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Contextual Smart Replies
          </button>
        </div>
      </div>

      {/* ── TAB 1: Morning AI Digest ── */}
      {activeTab === "digest" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/5 via-amber-500/5 to-purple-500/5 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Good morning, Alex! Here is your AI Executive Briefing
                  </h3>
                  <span className="text-[11px] text-muted-foreground">
                    Synthesized from 42 overnight emails across 3 priority threads
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-background border border-border text-muted-foreground">
                Thursday, Oct 15
              </span>
            </div>

            {/* 3 Digest Priority Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
              <div className="rounded-xl border border-red-500/20 bg-background/90 p-4 space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> High Priority Contract
                  </span>
                  <span className="text-[10px] text-muted-foreground">Due 5:00 PM</span>
                </div>
                <h4 className="text-xs font-bold text-foreground">Acme Global MSA Finalization</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  General Counsel requested final sign-off on liability caps. Approved terms match our 2026 guidelines.
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <button className="px-2.5 py-1 rounded-lg bg-red-600 text-white font-semibold text-[10px] hover:bg-red-700 transition-all">
                    One-Click Sign
                  </button>
                  <span className="text-[10px] text-muted-foreground font-mono">Thread: #8921</span>
                </div>
              </div>

              <div className="rounded-xl border border-blue-500/20 bg-background/90 p-4 space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Meeting Prep Ready
                  </span>
                  <span className="text-[10px] text-muted-foreground">10:30 AM</span>
                </div>
                <h4 className="text-xs font-bold text-foreground">Q4 Product Review with VP</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Sarah forwarded the updated slide deck. Gemini created a 1-page summary of key launch changes.
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <button className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-semibold text-[10px] hover:bg-blue-700 transition-all">
                    View AI Brief
                  </button>
                  <span className="text-[10px] text-muted-foreground font-mono">Docs Link Ready</span>
                </div>
              </div>

              <div className="rounded-xl border border-purple-500/20 bg-background/90 p-4 space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5" /> VIP Sender
                  </span>
                  <span className="text-[10px] text-muted-foreground">08:14 AM</span>
                </div>
                <h4 className="text-xs font-bold text-foreground">Board Deck Changes from CEO</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  CEO asked for European revenue breakdown to be added to slide 8. Suggested draft reply prepared.
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <button className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-semibold text-[10px] hover:bg-purple-700 transition-all">
                    Review Draft
                  </button>
                  <span className="text-[10px] text-muted-foreground font-mono">Confidence: 99%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: Conversational Natural Language Search ── */}
      {activeTab === "search" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
              Try a Real-Life Natural Language Search Query:
            </span>

            {/* Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SEARCH_PRESETS.map((preset, idx) => {
                const isSelected = selectedSearch.query === preset.query;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedSearch(preset)}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                      isSelected
                        ? "border-red-500 bg-red-500/5 ring-2 ring-red-500/20 font-bold text-foreground"
                        : "border-border bg-card/60 text-muted-foreground hover:bg-card"
                    }`}
                  >
                    "{preset.query}"
                  </button>
                );
              })}
            </div>

            {/* Search Mockup Box */}
            <div className="rounded-2xl border border-border bg-background p-5 space-y-4 shadow-sm">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  readOnly
                  value={selectedSearch.query}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-muted/40 text-xs text-foreground font-medium"
                />
              </div>

              {/* Instant AI Grounded Answer Card */}
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Gemini Grounded Mail Answer</span>
                </div>
                <p className="text-xs text-foreground leading-relaxed">
                  {selectedSearch.answer}
                </p>
                <div className="pt-2 border-t border-red-500/20 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Source: <strong>{selectedSearch.sourceThread.subject}</strong></span>
                  <span className="font-mono">{selectedSearch.sourceThread.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: Thread AI Overviews ── */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-2xl border border-border bg-background p-5 sm:p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-border/80 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Active Thread • 18 Messages
                </span>
                <h3 className="text-base font-bold text-foreground mt-0.5">
                  Re: Cloud Migration Vendor Evaluation &amp; Contract Terms
                </h3>
              </div>
              <span className="text-xs font-mono text-muted-foreground">5 participants</span>
            </div>

            {/* The AI Overview Card placed above the thread */}
            <div className="rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-amber-500/5 p-4.5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> AI Overview (Generated in 0.4s)
                </span>
                <span className="text-[11px] text-muted-foreground">Grounded across all 18 messages</span>
              </div>

              <ul className="space-y-2 text-xs text-foreground/90">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Pricing Agreement:</strong> Vendor agreed to a 14% volume discount ($120k/yr ceiling) provided multi-year commitment is signed before Oct 31.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Data Residency:</strong> Confirmed EU-only storage in Frankfurt data center adhering to GDPR Article 28 data processing addendum.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Pending Action Item:</strong> Security review requires SOC 2 Type II report before final sign-off. Marcus will send by 2:00 PM today.</span>
                </li>
              </ul>
            </div>

            <p className="text-[11px] text-muted-foreground">
              Employees no longer need to scroll through 18 individual emails to understand the current negotiation status.
            </p>
          </div>
        </div>
      )}

      {/* ── TAB 4: Contextual Smart Replies with Refinement ── */}
      {activeTab === "replies" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-2xl border border-border bg-background p-5 sm:p-6 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Contextual Smart Replies with Custom Refinement Prompts
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Move beyond simple 3-word canned replies. Gemini drafts complete, nuanced responses and allows you to
                re-prompt in real time:
              </p>
            </div>

            {/* Prompt Refinement Controls */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-muted-foreground mr-1">Refine Draft:</span>
              <button
                onClick={() => setRefinedTone("default")}
                className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                  refinedTone === "default"
                    ? "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 font-bold"
                    : "border-border bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                Standard Contextual
              </button>
              <button
                onClick={() => setRefinedTone("formal")}
                className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                  refinedTone === "formal"
                    ? "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 font-bold"
                    : "border-border bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                "Make it more formal"
              </button>
              <button
                onClick={() => setRefinedTone("concise")}
                className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                  refinedTone === "concise"
                    ? "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 font-bold"
                    : "border-border bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                "Shorten &amp; Direct"
              </button>
              <button
                onClick={() => setRefinedTone("extension")}
                className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                  refinedTone === "extension"
                    ? "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 font-bold"
                    : "border-border bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                "Request extension to Friday"
              </button>
            </div>

            {/* Generated Reply Box */}
            <div className="rounded-2xl border border-border bg-card p-4.5 space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/60 pb-2">
                <span>To: client.director@enterprise.com</span>
                <span className="font-mono text-primary font-bold">Auto-Drafted with Gemini</span>
              </div>

              <div className="text-xs text-foreground leading-relaxed whitespace-pre-line font-sans">
                {refinedTone === "default" &&
                  "Hi David,\n\nThanks for sending over the revised contract terms. The 14% volume discount and European data residency commitments look great and match what we discussed. We are reviewing the updated DPA with legal today and anticipate having full sign-off by Thursday afternoon.\n\nBest regards,\nAlex"}
                {refinedTone === "formal" &&
                  "Dear Mr. Vance,\n\nThank you for transmitting the amended Master Service Agreement. We acknowledge the inclusion of the 14% discount schedule and Frankfurt data residency terms. Our legal counsel is currently completing its final statutory review, and we formally anticipate transmitting our signed counterpart prior to close of business Thursday.\n\nSincerely,\nAlex Morgan"}
                {refinedTone === "concise" &&
                  "David - Received. Terms and EU residency look good. Legal is doing final sign-off today; expecting signed contract to you by Thursday PM.\n\nThanks,\nAlex"}
                {refinedTone === "extension" &&
                  "Hi David,\n\nThanks for sending the revised agreement. The terms look promising, but our General Counsel requires additional time to review the indemnification clauses. Could we extend the execution deadline to Friday at 3:00 PM EST? We appreciate your flexibility.\n\nBest,\nAlex"}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">Ready to send or edit in Gmail composer</span>
                <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all shadow-sm">
                  <Send className="w-3.5 h-3.5" />
                  <span>Insert into Gmail</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="pt-4 border-t border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Included across Google Workspace Business Standard/Plus &amp; Gemini Enterprise
        </span>
        <Link
          href="/compare"
          className="text-primary font-bold hover:underline flex items-center gap-1"
        >
          <span>Compare Plan Inclusion in Matrix</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
