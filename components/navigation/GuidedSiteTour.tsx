"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/lib/i18n/locale-context";

type TourStep = {
  id: string;
  title: string;
  description: string;
};

const tourCopy = {
  en: {
    title: "A quick tour of the site",
    close: "Close guided tour",
    skip: "Skip tour",
    back: "Back",
    next: "Next",
    finish: "Finish",
    steps: [
      {
        id: "intro",
        title: "Start with the overview",
        description: "This site brings Workspace and Gemini capabilities, plans, models, and rollout guidance together.",
      },
      {
        id: "compare",
        title: "Compare plans",
        description: "Start here to see which Workspace and Gemini capabilities are included across plans.",
      },
      {
        id: "workflow",
        title: "See Workspace workflows",
        description: "Explore practical examples of Gemini helping with email, documents, analysis, and meetings.",
      },
      {
        id: "models",
        title: "Explore Gemini models",
        description: "Review current model families, capabilities, and release status for API use.",
      },
      {
        id: "enterprise",
        title: "Plan an enterprise rollout",
        description: "Find deployment, governance, connector, and readiness guidance for your organization.",
      },
      {
        id: "research",
        title: "Read the latest research",
        description: "Browse product explainers and updates to support your evaluation.",
      },
    ] satisfies TourStep[],
  },
  es: {
    title: "Un recorrido rápido por el sitio",
    close: "Cerrar recorrido guiado",
    skip: "Omitir recorrido",
    back: "Atrás",
    next: "Siguiente",
    finish: "Finalizar",
    steps: [
      {
        id: "intro",
        title: "Empieza con la descripción general",
        description: "Este sitio reúne capacidades, planes, modelos y orientación de implementación de Workspace y Gemini.",
      },
      {
        id: "compare",
        title: "Compara planes",
        description: "Empieza aquí para ver qué capacidades de Workspace y Gemini incluye cada plan.",
      },
      {
        id: "workflow",
        title: "Explora flujos de Workspace",
        description: "Descubre ejemplos prácticos de Gemini en correo, documentos, análisis y reuniones.",
      },
      {
        id: "models",
        title: "Explora modelos Gemini",
        description: "Consulta las familias de modelos, sus capacidades y su disponibilidad para API.",
      },
      {
        id: "enterprise",
        title: "Planifica una implementación empresarial",
        description: "Encuentra orientación sobre implementación, gobernanza, conectores y preparación.",
      },
      {
        id: "research",
        title: "Lee las últimas investigaciones",
        description: "Consulta explicaciones de productos y novedades para apoyar tu evaluación.",
      },
    ] satisfies TourStep[],
  },
} as const;

type Spotlight = { top: number; left: number; width: number; height: number };

export function GuidedSiteTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [spotlight, setSpotlight] = useState<Spotlight | null>(null);
  const [pendingStart, setPendingStart] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { locale, href } = useLocale();
  const reduceMotion = useReducedMotion();
  const copy = tourCopy[locale] ?? tourCopy.en;
  const steps = useMemo(() => copy.steps as readonly TourStep[], [copy.steps]);
  const currentStep = steps[stepIndex];

  const startTour = useCallback(() => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (pathname === href("/")) {
      setStepIndex(0);
      setIsOpen(true);
      return;
    }
    setPendingStart(true);
    router.push(href("/"));
  }, [href, pathname, router]);

  const closeTour = useCallback(() => {
    setIsOpen(false);
    setSpotlight(null);
    requestAnimationFrame(() => {
      const trigger = openerRef.current?.isConnected
        ? openerRef.current
        : document.querySelector<HTMLElement>("[data-tour-trigger]");
      trigger?.focus();
    });
  }, []);

  useEffect(() => {
    const handleStart = () => startTour();
    window.addEventListener("open-getting-started-tour", handleStart);
    return () => window.removeEventListener("open-getting-started-tour", handleStart);
  }, [startTour]);

  useEffect(() => {
    if (pendingStart && pathname === href("/")) {
      setPendingStart(false);
      setStepIndex(0);
      setIsOpen(true);
    }
  }, [href, pathname, pendingStart]);

  useEffect(() => {
    if (!isOpen || !currentStep) return;

    panelRef.current?.focus();

    const container = document.querySelector<HTMLElement>(`[data-tour="${currentStep.id}"]`);
    if (!container) {
      setSpotlight(null);
      return;
    }

    container.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth", block: "center" });

    let frame = 0;
    const updateSpotlight = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const target = container.querySelector<HTMLElement>("h1, h2, h3") ?? container;
        const rect = target.getBoundingClientRect();
        const padding = 8;
        setSpotlight({
          top: Math.max(8, rect.top - padding),
          left: Math.max(8, rect.left - padding),
          width: Math.min(window.innerWidth - 16, rect.width + padding * 2),
          height: Math.min(window.innerHeight - 16, rect.height + padding * 2),
        });
      });
    };

    const settleTimer = window.setTimeout(updateSpotlight, reduceMotion ? 0 : 350);
    updateSpotlight();
    window.addEventListener("scroll", updateSpotlight, { passive: true });
    window.addEventListener("resize", updateSpotlight);
    return () => {
      window.clearTimeout(settleTimer);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateSpotlight);
      window.removeEventListener("resize", updateSpotlight);
    };
  }, [currentStep, isOpen, reduceMotion]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeTour();
      if (event.key === "ArrowRight") setStepIndex((index) => Math.min(index + 1, steps.length - 1));
      if (event.key === "ArrowLeft") setStepIndex((index) => Math.max(index - 1, 0));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeTour, isOpen, steps.length]);

  return (
    <>
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
        {isOpen && currentStep && (
          <>
            <motion.div
              className="pointer-events-none fixed inset-0 z-[80]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden="true"
            >
              {spotlight && (
                <div
                  className="absolute rounded-xl border-2 border-violet-400 shadow-[0_0_0_9999px_rgba(8,12,25,0.62),0_0_30px_rgba(139,92,246,0.45)] transition-[top,left,width,height] duration-200"
                  style={spotlight}
                />
              )}
            </motion.div>
            <motion.section
              role="region"
              aria-label={copy.title}
              aria-live="polite"
              tabIndex={-1}
              ref={panelRef}
              className="fixed bottom-4 left-1/2 z-[90] w-[min(440px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-[0_24px_70px_-20px_rgba(15,23,42,0.45)] dark:border-white/15 dark:bg-slate-950 dark:text-slate-100 sm:bottom-6 sm:p-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-violet-700 dark:text-violet-300">
                  {copy.title}
                </p>
                <button
                  type="button"
                  onClick={closeTour}
                  aria-label={copy.close}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-2" aria-label={`${stepIndex + 1} / ${steps.length}`}>
                {steps.map((step, index) => (
                  <span
                    key={step.id}
                    className={`h-1.5 flex-1 rounded-full ${index <= stepIndex ? "bg-violet-600 dark:bg-violet-400" : "bg-slate-200 dark:bg-slate-700"}`}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                {stepIndex + 1} / {steps.length}
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">{currentStep.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{currentStep.description}</p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={closeTour}
                  className="min-h-11 rounded-lg px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {copy.skip}
                </button>
                <div className="flex items-center gap-2">
                  {stepIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => setStepIndex((index) => Math.max(0, index - 1))}
                      className="inline-flex min-h-11 items-center gap-1 rounded-lg px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-slate-200 dark:hover:bg-white/10"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {copy.back}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => stepIndex === steps.length - 1 ? closeTour() : setStepIndex((index) => index + 1)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-100"
                  >
                    {stepIndex === steps.length - 1 ? copy.finish : copy.next}
                    {stepIndex < steps.length - 1 && <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </motion.section>
          </>
        )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
