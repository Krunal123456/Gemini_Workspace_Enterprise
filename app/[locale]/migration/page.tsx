import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { SkillMigrationTool, MigrationChecklist, SkillFormatNotes } from "@/components/migration/SkillMigrationTool";
import { resolveLocale } from "@/lib/i18n/config";
import { localizeHref } from "@/lib/i18n/href";
import { withLocalizedAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return withLocalizedAlternates({
    title: locale === "es" ? "Guía para migrar de Claude a Gemini" : "Move from Claude to Gemini | Migration Guide",
    description: locale === "es"
      ? "Prepara archivos SKILL.md y paquetes ZIP para Gemini Enterprise con una herramienta local en el navegador y una lista de verificación basada en fuentes oficiales."
      : "Prepare SKILL.md files and ZIP packages for Gemini Enterprise with an in-browser tool and a Google-sourced migration checklist.",
  }, "/migration", locale);
}

export default async function MigrationPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  const es = locale === "es";
  const href = (path: string) => localizeHref(locale, path);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-muted/20 px-4 pb-10 pt-28 sm:px-6 sm:pb-12 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{es ? "Lleva tus flujos de Claude a Gemini con cuidado" : "Move useful Claude workflows to Gemini with care"}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            {es
              ? "Prepara un paquete de Skills y planifica la migración. El formato puede trasladarse; el historial, las integraciones, los permisos y el comportamiento del modelo requieren revisión por separado."
              : "Prepare a Skills package and plan the move. You can carry over instructions, but history, integrations, permissions, and model behavior need separate review."}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-google-green" />{es ? "Los archivos no salen de tu navegador" : "Files stay in your browser"}</span>
            <span>{es ? "Verificado con documentación de Google · 18 oct 2026" : "Checked against Google documentation · 18 Oct 2026"}</span>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-12 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(15rem,0.75fr)] lg:gap-14 lg:px-8">
        <div className="space-y-12">
          <SkillMigrationTool locale={locale} />
          <section aria-labelledby="migration-steps">
            <h2 id="migration-steps" className="mb-5 text-2xl font-semibold tracking-tight">{es ? "Una migración que puedes verificar" : "A migration you can verify"}</h2>
            <MigrationChecklist locale={locale} />
          </section>
          <section aria-labelledby="skill-format">
            <h2 id="skill-format" className="mb-5 text-2xl font-semibold tracking-tight">{es ? "Qué espera Gemini de un Skill" : "What Gemini expects from a Skill"}</h2>
            <SkillFormatNotes locale={locale} />
          </section>
        </div>

        <aside className="self-start border-t border-border pt-5 lg:sticky lg:top-24">
          <h2 className="text-base font-semibold">{es ? "Fuentes oficiales" : "Official references"}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{es ? "Confirma compatibilidad y acceso para tu producto y edición antes de planificar el cambio." : "Confirm compatibility and access for your product and edition before planning a rollout."}</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a className="inline-flex items-start gap-2 font-medium text-google-blue underline decoration-google-blue/30 underline-offset-4 hover:decoration-current" href="https://docs.cloud.google.com/gemini/enterprise/docs/skills" target="_blank" rel="noreferrer">{es ? "Crear y administrar Skills · Gemini Enterprise" : "Create and manage Skills · Gemini Enterprise"}<ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" /></a></li>
            <li><a className="inline-flex items-start gap-2 font-medium text-google-blue underline decoration-google-blue/30 underline-offset-4 hover:decoration-current" href="https://docs.cloud.google.com/gemini/enterprise/docs/manage-skills" target="_blank" rel="noreferrer">{es ? "Administrar Skills · documentación de Cloud" : "Manage Skills · Google Cloud documentation"}<ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" /></a></li>
            <li><a className="inline-flex items-start gap-2 font-medium text-google-blue underline decoration-google-blue/30 underline-offset-4 hover:decoration-current" href="https://support.google.com/gemini/answer/17094296" target="_blank" rel="noreferrer">{es ? "Crear y administrar Skills · Apps de Gemini" : "Create and manage Skills · Gemini Apps"}<ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" /></a></li>
          </ul>
          <div className="mt-7 border-t border-border pt-5">
            <h3 className="text-sm font-semibold">{es ? "Sigue investigando" : "Continue your research"}</h3>
            <div className="mt-3 flex flex-col items-start gap-3 text-sm">
              <Link href={href("/compare")} className="inline-flex items-center gap-1.5 font-medium hover:text-google-blue">{es ? "Comparar planes" : "Compare plans"}<ArrowRight className="h-3.5 w-3.5" /></Link>
              <Link href={href("/enterprise/readiness")} className="inline-flex items-center gap-1.5 font-medium hover:text-google-blue">{es ? "Lista de preparación empresarial" : "Enterprise readiness checklist"}<ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
          </div>
        </aside>
      </div>

      <section className="border-t border-border bg-muted/20 px-4 py-7 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-5xl text-xs leading-5 text-muted-foreground">{es ? "Guía independiente; no está afiliada a Google ni Anthropic. El conversor solo reorganiza los archivos del paquete; no verifica la calidad, seguridad o compatibilidad funcional del Skill. Las funciones de Google cambian y pueden depender de la edición, cuenta y configuración administrativa." : "Independent guide; not affiliated with Google or Anthropic. The packager only reorganizes archive files; it does not verify a Skill’s quality, safety, or functional compatibility. Google features change and may depend on edition, account, and administrator settings."}</p>
      </section>
    </main>
  );
}
