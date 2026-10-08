import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Route, ShieldCheck } from "lucide-react";
import { ReadinessPlanner } from "@/components/enterprise/ReadinessPlanner";
import { createPhraseTranslator } from "@/lib/i18n/translate";
import { localizeHref } from "@/lib/i18n/href";
import { resolveLocale, type Locale } from "@/lib/i18n/config";

const pageCopy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Gemini Enterprise Readiness Planner | MarketStar Intelligence",
    description:
      "Build a Gemini Enterprise rollout recommendation from users, connectors, security requirements, and deployment goals.",
  },
  es: {
    title: "Planificador de preparación para Gemini Enterprise | MarketStar Intelligence",
    description:
      "Crea una recomendación de despliegue de Gemini Enterprise a partir de usuarios, conectores, requisitos de seguridad y objetivos de despliegue.",
  },
};

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return params.then(({ locale: raw }) => {
    const locale = resolveLocale(raw);
    return { ...pageCopy[locale] };
  });
}

export default async function ReadinessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const t = createPhraseTranslator(locale);
  const href = (path: string) => localizeHref(locale, path);

  return (
    <div className="min-h-screen bg-background pb-24 text-foreground">
      <div className="border-b border-border/60 bg-muted/20"><div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8"><Link href={href("/enterprise")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> {t("Back to Enterprise Architecture")}</Link></div></div>
      <section className="border-b border-border/60 bg-muted/20 py-20"><div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8"><div className="max-w-4xl"><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-google-blue/20 bg-google-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-google-blue"><Route className="h-3.5 w-3.5" /> {t("Enterprise readiness planner")}</div><h1 className="fluid-h1 font-extrabold tracking-tight">{t("Turn your AI ambition into a ")}<span className="gradient-text">{t("deployable plan")}</span>{t(".")}</h1><p className="fluid-body mt-6 max-w-3xl leading-relaxed text-muted-foreground">{t("Model rollout size, deployment shape, connector depth, and governance requirements in one guided workflow. Export the result for your architecture and procurement conversations.")}</p></div></div></section>
      <section className="py-16"><div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8"><ReadinessPlanner /></div></section>
      <section className="border-t border-border bg-muted/20 py-12"><div className="mx-auto flex max-w-4xl items-center gap-4 px-4 sm:px-6 lg:px-8"><ShieldCheck className="h-6 w-6 shrink-0 text-google-green" /><p className="text-sm leading-relaxed text-muted-foreground">{t("This planner is a decision aid based on the public catalogue. Final pricing, regional availability, permissions, and compliance requirements should be confirmed with Google Cloud and your internal security team.")}</p></div></section>
    </div>
  );
}
