"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ArrowDown, Clock3, Layers3, ListChecks, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { features } from "@/data/features";
import { plans } from "@/data/plans";
import { securityLayers } from "@/data/security";

const METRICS = [
  { value: features.length, suffix: "+", label: "Workspace and Gemini capabilities indexed", icon: ListChecks },
  { value: plans.length, suffix: "", label: "Plan editions mapped for comparison", icon: Layers3 },
  { value: securityLayers.length, suffix: "", label: "Security and governance layers catalogued", icon: ShieldCheck },
  { value: 1, suffix: "M", label: "Input-token context for Gemini 3.8 Flash API", icon: Workflow },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(reduceMotion ? value : 0);
  const rounded = useTransform(count, (current) => String(Math.round(current)));

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.15, ease: "easeOut" });
    return controls.stop;
  }, [count, isInView, reduceMotion, value]);

  return <span ref={ref}><motion.span>{rounded}</motion.span>{suffix}</span>;
}

export function WorkspaceProofMetrics() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-y border-border bg-[#f1eef7] py-16 dark:bg-[#100d18] md:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-9 grid gap-4 md:grid-cols-[1fr_0.65fr] md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-violet-800 dark:text-violet-200">The intelligence index</p>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight text-foreground sm:text-4xl">Grounded in the details that matter.</h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-muted-foreground md:justify-self-end">Live catalog counts, not productivity estimates. Model context applies to the cited Gemini API model, not every Workspace plan.</p>
        </div>
        <div className="grid border-y border-violet-950/10 dark:border-white/10 sm:grid-cols-2 xl:grid-cols-4">
          {METRICS.map(({ value, suffix, label, icon: Icon }, index) => (
            <motion.div key={label} data-spotlight whileHover={reduceMotion ? undefined : { rotateX: -3, rotateY: 3, y: -2 }} transition={{ duration: 0.2, ease: "easeOut" }} style={{ perspective: 900, transformStyle: "preserve-3d" }} className="spotlight-surface relative flex min-h-36 items-center gap-4 border-b border-violet-950/10 p-5 dark:border-white/10 sm:nth-[2n]:border-l xl:border-b-0 xl:nth-[2n]:border-l-0 xl:nth-[n+2]:border-l">
              <Icon className="h-5 w-5 shrink-0 text-violet-800 dark:text-violet-200" />
              <div>
                <p className="text-3xl font-bold tabular-nums text-foreground"><CountUp value={value} suffix={suffix} /></p>
                <p className="mt-1 max-w-52 text-xs leading-5 text-muted-foreground">{label}</p>
              </div>
              <span className="absolute right-4 top-4 font-mono text-[9px] text-muted-foreground/60">0{index + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CinematicWorkspaceCTA() {
  const reduceMotion = useReducedMotion();
  const statusRef = useRef<HTMLParagraphElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const handleExplore = async () => {
    const target = document.querySelector("#playground");
    target?.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth", block: "start" });

    if (!reduceMotion) {
      const { default: confetti } = await import("canvas-confetti");
      confetti({ particleCount: 42, spread: 58, startVelocity: 27, scalar: 0.72, origin: { y: 0.7 }, colors: ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#9333EA"] });
    }

    if (statusRef.current) statusRef.current.textContent = "Interactive preview is ready.";
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { if (statusRef.current) statusRef.current.textContent = ""; }, 3000);
  };

  return (
    <section className="relative overflow-hidden bg-[#0b0912] py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_115%,rgba(124,58,237,0.3),transparent_48%),radial-gradient(ellipse_at_8%_18%,rgba(66,133,244,0.12),transparent_32%)]" />
      <div className="relative mx-auto max-w-[1100px] px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center border border-violet-200/20 bg-violet-200/10 text-violet-100"><Clock3 className="h-5 w-5" /></div>
        <h2 className="mx-auto max-w-4xl text-3xl font-bold leading-tight sm:text-4xl lg:text-6xl">Ready to shape your enterprise AI workflow?</h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">Explore plan availability, governance controls, and an interactive Gemini workflow preview.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" data-magnetic onClick={handleExplore} className="inline-flex min-h-12 items-center justify-center gap-2 bg-violet-300 px-6 text-sm font-semibold text-[#160c22] transition-colors hover:bg-white"><Sparkles className="h-4 w-4" />Try the interactive preview<ArrowDown className="h-4 w-4" /></button>
          <Link href="/compare" className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 bg-white/[0.035] px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"><Layers3 className="h-4 w-4" />Compare Workspace plans</Link>
        </div>
        <p ref={statusRef} className="mt-4 min-h-5 text-xs text-violet-200" role="status" aria-live="polite" />
      </div>
    </section>
  );
}