import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowRight, Bot, ShieldCheck } from "lucide-react";
import { AgentBuildPlaybook } from "@/components/enterprise/AgentBuildPlaybook";
import { CoworkerAgentShowcase } from "@/components/enterprise/CoworkerAgentShowcase";
import { resolveLocale } from "@/lib/i18n/config";
import { localizeHref } from "@/lib/i18n/href";
import { createPhraseTranslator } from "@/lib/i18n/translate";
import { withLocalizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const t = createPhraseTranslator(locale);
  return withLocalizedAlternates({
    title: t("Gemini Enterprise Agents: How to Build, Prompt, Connect Tools, and Govern"),
    description: t("A sourced guide to Google Workspace Studio, Gemini Enterprise Business, Standard and Plus agents, connectors, Agent Platform, example prompts, and Model Armor safeguards."),
  }, "/enterprise/agents", locale);
}

export default async function AgentsAndMcpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const t = createPhraseTranslator(locale);
  const href = (path: string) => localizeHref(locale, path);

  return (
    <div className="min-h-screen bg-background pb-24 text-foreground">
      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8">
          <Link href={href("/enterprise")} className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />{t("Back to Enterprise Architecture")}
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(66,133,244,0.14),transparent_70%)] py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-google-blue/20 bg-google-blue/10 px-3.5 py-1.5 text-xs font-semibold text-google-blue">
              <Bot className="h-4 w-4" />
              {t("Agent builder and deployment guide")}
            </div>
            <h1 className="fluid-h1 font-extrabold tracking-tight text-foreground">
              {t("Build useful Gemini agents—with clear permissions and a path to production.")}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {t("Understand what an agent can do, which product you need, where to create it, how to connect approved data, and what to test before users rely on it.")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#agent-types" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-google-blue px-5 text-sm font-semibold text-white hover:bg-blue-700">
                {t("Choose an agent builder")}<ArrowRight className="h-4 w-4" />
              </a>
              <Link href={href("/security#model-armor-guide")} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-semibold text-foreground hover:bg-muted">
                <ShieldCheck className="h-4 w-4 text-google-blue" />{t("Model Armor setup")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AgentBuildPlaybook href={href} />

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <CoworkerAgentShowcase />
        </div>
      </section>
    </div>
  );
}
