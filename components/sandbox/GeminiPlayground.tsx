"use client";

import { useEffect, useRef, useState, type DragEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  Check,
  Clipboard,
  Code2,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Shield,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MODES = [
  { id: "research", label: "Chat & research", icon: MessageSquare },
  { id: "multimodal", label: "Multimodal", icon: ImageIcon },
  { id: "workflow", label: "Workflow", icon: Code2 },
  { id: "grounding", label: "Grounding", icon: Shield },
] as const;

type Mode = (typeof MODES)[number]["id"];

const SUGGESTIONS: Record<Mode, string[]> = {
  research: ["Summarize an account review", "Draft a project update", "Find decisions in meeting notes"],
  multimodal: ["Describe this campaign slide", "Extract themes from a chart", "Compare two product mockups"],
  workflow: ["Prepare a weekly sales brief", "Route a support escalation", "Build a launch checklist"],
  grounding: ["Answer using approved policies", "Compare the latest QBRs", "Cite the source for each finding"],
};

const RESPONSES: Record<Mode, (prompt: string, files: string[]) => string> = {
  research: (prompt, files) => `I would start by grouping the material around the question: “${prompt}”.\n\n${files.length ? `I found ${files.length} demo source${files.length === 1 ? "" : "s"} in this session. ` : ""}A grounded answer should separate confirmed points from open questions, summarize the relevant decisions, and link each finding back to its source.\n\n**Suggested next step**\nReview the cited source passages before sharing this summary.`,
  multimodal: (prompt, files) => `For “${prompt}”, Gemini can reason across text and supported visual inputs in one request.\n\n${files.length ? `Demo attachment${files.length === 1 ? "" : "s"}: ${files.join(", ")}. ` : "Add a demo file to see a simulated source reference. "}A useful review would identify visible labels, compare the main elements, and flag anything that needs a human check.\n\n**Review note**\nThis local playground simulates the response. It does not send files to Google or another service.`,
  workflow: (prompt, files) => `Workflow preview for “${prompt}”\n\n1. Gather approved context${files.length ? ` from ${files.join(", ")}` : " from the selected Workspace sources"}.\n2. Draft the requested output for review.\n3. Pause for an authorized person before any external action.\n\n\`\`\`text\nAction mode: preview only\nApproval required: true\nExternal changes: none\n\`\`\``,
  grounding: (prompt, files) => `Grounded-answer preview for “${prompt}”.\n\n**Evidence available**\n${files.length ? files.map((file) => `- ${file} (demo attachment)`).join("\n") : "- No demo files attached; connect an approved source in a configured deployment."}\n\n**Response policy**\nSeparate supported facts from inference, cite the source material, and say when the available context is insufficient.\n\nThis is a front-end simulation, not a live Gemini connection.`,
};

function splitResponse(text: string) {
  return text.match(/[\s\S]{1,8}/g) ?? [text];
}

export function GeminiPlayground() {
  const [mode, setMode] = useState<Mode>("research");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const responseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => () => {
    if (responseTimer.current) clearTimeout(responseTimer.current);
  }, []);

  const addFiles = (files: FileList | File[]) => {
    const accepted = Array.from(files)
      .filter((file) => /\.(pdf|csv|xlsx|docx|txt)$/i.test(file.name))
      .map((file) => file.name);

    if (accepted.length === 0) {
      setError("Choose a PDF, spreadsheet, document, or text file for the local demo.");
      return;
    }

    setError("");
    setAttachments((current) => [...new Set([...current, ...accepted])].slice(0, 4));
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files.length) addFiles(event.dataTransfer.files);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = prompt.trim();
    if (!question || isStreaming) return;

    if (responseTimer.current) clearTimeout(responseTimer.current);
    setError("");
    setResponse("");
    setIsStreaming(true);
    const chunks = splitResponse(RESPONSES[mode](question, attachments));
    let index = 0;

    const streamNext = () => {
      index += 1;
      setResponse(chunks.slice(0, index).join(""));
      if (index >= chunks.length) {
        setIsStreaming(false);
        responseTimer.current = null;
        return;
      }
      responseTimer.current = setTimeout(streamNext, 18);
    };

    responseTimer.current = setTimeout(streamNext, 120);
  };

  const handleCopy = async () => {
    if (!response) return;
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setError("Clipboard access is unavailable in this browser.");
    }
  };

  return (
    <section id="playground" className="relative overflow-hidden border-y border-white/10 bg-[#0b0912] py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_18%,rgba(124,58,237,0.15),transparent_38%),radial-gradient(ellipse_at_8%_88%,rgba(66,133,244,0.10),transparent_34%)]" />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-violet-200">
              <Sparkles className="h-4 w-4" /> Interactive preview
            </div>
            <h2 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Ask work a better question.</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-white/65 lg:justify-self-end">
            Explore how a governed Gemini workflow can respond to a prompt. This is a local front-end simulation, not a live model call; demo files stay in your browser and are never uploaded.
          </p>
        </div>

        <div data-spotlight className="spotlight-surface relative overflow-hidden border border-white/12 bg-[#100d18] shadow-[0_35px_100px_-50px_rgba(0,0,0,0.9)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Playground modes">
              {MODES.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={mode === id}
                  onClick={() => { setMode(id); setResponse(""); setError(""); }}
                  className={cn("inline-flex min-h-10 items-center gap-2 px-3 text-xs font-medium transition-colors", mode === id ? "bg-white/10 text-white" : "text-white/55 hover:bg-white/5 hover:text-white")}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{label.split(" ")[0]}</span>
                </button>
              ))}
            </div>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Demo mode
            </span>
          </div>

          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            <div className="border-b border-white/10 p-4 sm:p-6 lg:border-b-0 lg:border-r">
              <div
                onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
                onDragOver={(event) => event.preventDefault()}
                onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setIsDragging(false); }}
                onDrop={handleDrop}
                className={cn("mb-5 border border-dashed p-4 transition-colors", isDragging ? "border-violet-300 bg-violet-300/10" : "border-white/15 bg-white/[0.025]")}
              >
                <div className="flex items-start gap-3">
                  <Upload className="mt-0.5 h-4 w-4 shrink-0 text-violet-200" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white">Add local demo context</p>
                    <p className="mt-1 text-[11px] leading-5 text-white/50">Drop PDF, CSV, XLSX, DOCX, or TXT files. Names only; nothing is uploaded.</p>
                  </div>
                  <button type="button" onClick={() => fileInput.current?.click()} className="min-h-10 shrink-0 border border-white/15 px-3 text-xs font-semibold text-white/75 transition-colors hover:bg-white/10">Browse</button>
                  <input ref={fileInput} type="file" accept=".pdf,.csv,.xlsx,.docx,.txt" multiple className="sr-only" onChange={(event) => { if (event.target.files) addFiles(event.target.files); event.target.value = ""; }} />
                </div>
                {attachments.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Demo attachments">
                    {attachments.map((file) => (
                      <li key={file} className="inline-flex max-w-full items-center gap-1.5 border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-white/75">
                        <FileText className="h-3.5 w-3.5 shrink-0 text-violet-200" />
                        <span className="truncate">{file}</span>
                        <button type="button" aria-label={`Remove ${file}`} onClick={() => setAttachments((current) => current.filter((name) => name !== file))} className="ml-1 text-white/45 hover:text-white"><X className="h-3 w-3" /></button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">Try a prompt</p>
              <div className="mb-5 flex flex-wrap gap-2">
                {SUGGESTIONS[mode].map((suggestion) => (
                  <button key={suggestion} type="button" onClick={() => setPrompt(suggestion)} className="min-h-9 border border-white/10 px-3 py-1.5 text-left text-[11px] text-white/65 transition-colors hover:border-violet-300/40 hover:text-white">{suggestion}</button>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <label htmlFor="gemini-demo-prompt" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">Your prompt</label>
                <textarea
                  id="gemini-demo-prompt"
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Ask a question about your work..."
                  rows={4}
                  maxLength={500}
                  className="w-full resize-y border border-white/12 bg-black/25 p-3 text-sm leading-6 text-white outline-none placeholder:text-white/35 focus:border-violet-300/70 focus:ring-2 focus:ring-violet-300/20"
                />
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-[10px] text-white/40">{prompt.length}/500</span>
                  <button type="submit" disabled={!prompt.trim() || isStreaming} className="inline-flex min-h-11 items-center gap-2 bg-violet-300 px-4 text-xs font-bold text-[#170d23] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-45">
                    {isStreaming ? "Thinking" : "Run preview"}
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </div>
              </form>
              {error && <p role="alert" className="mt-3 text-xs text-rose-300">{error}</p>}
            </div>

            <div className="min-h-[400px] p-4 sm:p-6" role="tabpanel" aria-label={MODES.find((item) => item.id === mode)?.label}>
              <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">Response preview</p>
                  <p className="mt-1 text-xs text-white/70">Gemini Enterprise · grounded workflow</p>
                </div>
                <button type="button" onClick={handleCopy} disabled={!response || isStreaming} aria-label="Copy response" title="Copy response" className="inline-flex h-10 w-10 items-center justify-center border border-white/10 text-white/55 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35">
                  {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={`${mode}-${response ? "response" : "empty"}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} aria-live="polite">
                  {response ? (
                    <div className="whitespace-pre-wrap text-sm leading-7 text-white/80">
                      {response.split(/(```[\s\S]*?```|\*\*.*?\*\*)/g).map((part, index) => {
                        if (part.startsWith("```") && part.endsWith("```")) return <pre key={index} className="my-3 overflow-x-auto border border-white/10 bg-black/35 p-3 font-mono text-xs leading-6 text-emerald-200">{part.slice(3, -3).replace(/^text\n/, "")}</pre>;
                        if (part.startsWith("**") && part.endsWith("**")) return <strong key={index} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
                        return <span key={index}>{part}</span>;
                      })}
                      {isStreaming && <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-violet-300" aria-label="Generating" />}
                    </div>
                  ) : (
                    <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center border border-violet-300/20 bg-violet-300/10 text-violet-200"><Sparkles className="h-5 w-5" /></div>
                      <p className="max-w-xs text-sm font-medium text-white/75">Your response will appear here.</p>
                      <p className="mt-2 max-w-xs text-xs leading-5 text-white/45">Choose a prompt suggestion or write your own to run the local simulation.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}