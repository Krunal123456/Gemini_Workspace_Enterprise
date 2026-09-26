"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  Mail,
  MessageSquareText,
  Presentation,
  Table2,
  Video,
} from "lucide-react";

const WORKFLOWS = [
  {
    id: "gmail",
    eyebrow: "Communication",
    title: "Clear the noise. Keep the context.",
    description: "Summarize long conversations, draft replies in your voice, and bring the relevant Drive context into Gmail.",
    icon: Mail,
    app: "Gmail",
    color: "#EA4335",
    preview: ["Q3 renewal thread", "12 messages · 4 participants", "Decision: extend the pilot into EMEA", "Next: prepare revised scope for review"],
    features: ["Thread summaries", "Context-aware drafting", "Human review before send"],
  },
  {
    id: "docs",
    eyebrow: "Creation",
    title: "Turn source material into a first draft.",
    description: "Work from selected files and meeting notes to outline, draft, and refine a document alongside your team.",
    icon: FileText,
    app: "Google Docs",
    color: "#4285F4",
    preview: ["Customer success plan", "Source set · 6 selected files", "Outline created from account goals", "Open questions kept for owner review"],
    features: ["Source-aware drafting", "Tone and length controls", "Collaborative editing"],
  },
  {
    id: "sheets",
    eyebrow: "Analysis",
    title: "Ask the table. Inspect the answer.",
    description: "Use natural language to understand a selected range, surface patterns, and build a formula you can review.",
    icon: Table2,
    app: "Google Sheets",
    color: "#34A853",
    preview: ["Regional pipeline · Q3", "Selected range · 1,240 rows", "Largest movement: West · Enterprise", "Formula suggestion ready to inspect"],
    features: ["Range-aware analysis", "Formula assistance", "Results remain editable"],
  },
  {
    id: "meet",
    eyebrow: "Collaboration",
    title: "Leave the meeting with the next steps.",
    description: "Capture notes, identify decisions, and turn an approved summary into follow-up work across Workspace.",
    icon: Video,
    app: "Google Meet",
    color: "#1A73E8",
    preview: ["Design review · 42 minutes", "Notes prepared for host review", "2 decisions · 3 open questions", "Follow-up draft ready in Google Docs"],
    features: ["Meeting notes", "Decision summaries", "Follow-up draft"],
  },
];

export function WorkflowStory() {
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const progress = progressRef.current;
    if (!root || !progress) return;

    gsap.registerPlugin(ScrollTrigger);
    const desktopMotion = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let cleanupAnimation = () => {};

    const setupAnimation = () => {
      cleanupAnimation();
      if (!desktopMotion.matches) {
        delete root.dataset.gsapReady;
        return;
      }

      root.dataset.gsapReady = "true";
      const panels = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".workflow-panel"));
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          pin: root.querySelector(".workflow-stage"),
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (trigger) => {
            gsap.set(progress, { scaleY: trigger.progress });
          },
        },
      });

      panels.forEach((panel, index) => {
        if (index === 0) {
          gsap.set(panel, { autoAlpha: 1, y: 0, scale: 1 });
          return;
        }

        gsap.set(panel, { autoAlpha: 0, y: 44, scale: 1.025 });
        timeline
          .to(panels[index - 1], { autoAlpha: 0.18, y: -38, scale: 0.96, duration: 0.75 }, index - 1)
          .to(panel, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8 }, index - 1);
      });

      timeline.eventCallback("onUpdate", () => {
        const activeIndex = Math.min(panels.length - 1, Math.floor((timeline.progress() * (panels.length - 1)) + 0.12));
        stepRefs.current.forEach((step, index) => {
          if (!step) return;
          step.dataset.active = String(index === activeIndex);
          if (index === activeIndex) step.setAttribute("aria-current", "step");
          else step.removeAttribute("aria-current");
        });
      });

      const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      cleanupAnimation = () => {
        cancelAnimationFrame(refreshFrame);
        timeline.scrollTrigger?.kill();
        timeline.kill();
        delete root.dataset.gsapReady;
      };
    };

    setupAnimation();
    desktopMotion.addEventListener("change", setupAnimation);
    return () => {
      desktopMotion.removeEventListener("change", setupAnimation);
      cleanupAnimation();
    };
  }, []);

  return (
    <section ref={rootRef} className="workflow-story relative border-y border-white/10 bg-[#0b0912] text-white">
      <div className="workflow-stage mx-auto grid max-w-[1440px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12 lg:py-16">
        <div className="workflow-intro max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-violet-200">Workspace tools, connected</p>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">How Gemini moves work forward.</h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
            From the first message to a reviewed next step, Gemini brings AI into the Workspace tools your teams already use.
          </p>

          <ol className="mt-9 grid gap-2 sm:grid-cols-2 lg:grid-cols-1" aria-label="Workflow steps">
            {WORKFLOWS.map((workflow, index) => {
              const Icon = workflow.icon;
              return (
                <li key={workflow.id} ref={(element) => { stepRefs.current[index] = element; }} data-active={index === 0} aria-current={index === 0 ? "step" : undefined} className="workflow-step flex min-h-12 items-center gap-3 border-b border-white/10 py-3 text-sm text-white/45 transition-colors data-[active=true]:text-white">
                  <span className="flex h-8 w-8 items-center justify-center border border-white/10 bg-white/[0.03] text-white/70"><Icon className="h-4 w-4" /></span>
                  <span className="flex-1">{workflow.app}</span>
                  <span className="h-1 w-1 rounded-full bg-violet-300 opacity-0 data-[active=true]:opacity-100" />
                </li>
              );
            })}
          </ol>

          <div className="mt-8 hidden items-center gap-3 lg:flex" aria-hidden="true">
            <div className="h-24 w-px overflow-hidden bg-white/10"><div ref={progressRef} className="h-full origin-top scale-y-0 bg-violet-300" /></div>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">Scroll to follow</span>
          </div>
        </div>

        <div className="workflow-stack relative grid min-h-[490px] gap-5 sm:min-h-[520px]">
          {WORKFLOWS.map((workflow) => {
            const Icon = workflow.icon;
            return (
              <article key={workflow.id} data-spotlight className="workflow-panel spotlight-surface relative flex min-h-[430px] flex-col overflow-hidden border border-white/12 bg-[#13101b] p-5 shadow-[0_35px_90px_-55px_rgba(0,0,0,0.8)] sm:p-7" style={{ "--workflow-accent": workflow.color } as React.CSSProperties}>
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-[0.08] blur-[65px]" style={{ backgroundColor: workflow.color }} />
                <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.035]" style={{ color: workflow.color }}><Icon className="h-5 w-5" /></span>
                    <div><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/45">{workflow.eyebrow}</p><p className="mt-1 text-sm font-semibold text-white">{workflow.app}</p></div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-white/45"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Ready</span>
                </div>

                <div className="relative grid flex-1 gap-7 py-7 md:grid-cols-[1fr_0.9fr] md:items-center">
                  <div>
                    <h3 className="max-w-md text-2xl font-bold leading-tight sm:text-3xl">{workflow.title}</h3>
                    <p className="mt-4 max-w-md text-sm leading-6 text-white/60">{workflow.description}</p>
                    <ul className="mt-6 grid gap-2">
                      {workflow.features.map((feature) => <li key={feature} className="flex items-center gap-2 text-xs text-white/70"><span className="h-1 w-1 rounded-full" style={{ backgroundColor: workflow.color }} />{feature}</li>)}
                    </ul>
                  </div>

                  <div className="border border-white/10 bg-black/25 p-4">
                    <div className="mb-5 flex items-center justify-between gap-3"><span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">Workspace preview</span><span className="text-[10px] text-white/35">Illustrative interface</span></div>
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3"><Icon className="h-4 w-4" style={{ color: workflow.color }} /><span className="text-xs font-medium text-white/75">{workflow.preview[0]}</span></div>
                    <p className="mt-3 text-[10px] text-white/40">{workflow.preview[1]}</p>
                    <div className="mt-4 space-y-2">
                      {workflow.preview.slice(2).map((line, index) => <div key={line} className="flex gap-2 text-xs leading-5 text-white/70"><span className="font-mono text-violet-200/75">0{index + 1}</span><span>{line}</span></div>)}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] text-white/40"><span>Review before sharing</span><ArrowRight className="h-3.5 w-3.5" /></div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}