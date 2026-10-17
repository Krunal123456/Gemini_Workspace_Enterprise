"use client";

import { useLocale } from "@/lib/i18n/locale-context";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CinematicWorkspaceCTA() {
  const { locale, href } = useLocale();
  return (
    <section className="border-b border-border bg-[#eaf5ff] py-16 text-[#102a43] dark:bg-[#0b223a] dark:text-white md:py-20">
      <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-4 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">{locale === "es" ? "De la evaluación a un plan de implementación." : "Move from product research to a rollout plan."}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#425d78] dark:text-blue-100/75 sm:text-base">
            {locale === "es" ? "Usa la evaluación de preparación para revisar edición, acceso, datos, seguridad y objetivos del piloto antes de configurar." : "Use the readiness assessment to map edition, access, data, security, and pilot questions before setup."}
          </p>
        </div>
        <Link
          href={href("/enterprise/readiness")}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1769d2] px-6 text-sm font-semibold text-white shadow-[0_12px_26px_-12px_rgba(23,105,210,.55)] transition hover:-translate-y-0.5 hover:bg-[#1558b0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769d2] focus-visible:ring-offset-2"
        >
          {locale === "es" ? "Revisar preparación" : "Check deployment readiness"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
