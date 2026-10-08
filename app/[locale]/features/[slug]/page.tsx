import {
  getApplications,
  getPlans,
} from "@/lib/i18n/data";
import { defaultLocale, isLocale, resolveLocale, type Locale } from "@/lib/i18n/config";
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Sparkles, Flame, Check, Minus, Info, BadgeCheck, ExternalLink } from "lucide-react";
import { getFeatures, getFeatureBySlug } from "@/lib/i18n/features";
import { featureCategoryLabels } from "@/data/translations/features.es";
import { formatEnterpriseAvailability } from "@/lib/i18n/featureLabels";


import { cn } from "@/lib/utils";
import { ActionButtons } from "./ClientButtons";
import { PlanId } from "@/types";
import { getFeatureEvidence } from "@/lib/featureEvidence";

import { createPhraseTranslator } from "@/lib/i18n/translate";
type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateStaticParams() {
  return getFeatures("en").map((f) => ({
    slug: f.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const t = createPhraseTranslator(locale);
  const feature = getFeatureBySlug(slug, locale);
  
  if (!feature) {
    return { title: "Feature Not Found" };
  }

  return {
    title: `${feature.name} | Gemini Enterprise Intelligence`,
    description: feature.description,
    openGraph: {
      title: `${feature.name} - Gemini Enterprise Features`,
      description: feature.description,
    },
  };
}

export default async function FeatureDetailPage({ params }: Props) {
  const { slug, locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const plans = getPlans(locale);
  const t = createPhraseTranslator(locale);
  const feature = getFeatureBySlug(slug, locale);
  
  if (!feature) {
    notFound();
  }

  const appInfo = getApplications(locale).find(
    (app) => app.id === feature.application || app.name === feature.application
  );
  const isGemini = feature.application === "gemini";
  const appColor = isGemini ? "#8B5CF6" : appInfo?.accentColor || "var(--google-blue)";
  const appName = isGemini ? "Gemini" : appInfo?.shortName || appInfo?.name || (feature.application.charAt(0).toUpperCase() + feature.application.slice(1));
  const categoryLabel = featureCategoryLabels[feature.category] ?? feature.category;
  const isRedundantCategory =
    !categoryLabel ||
    categoryLabel.toLowerCase() === appName.toLowerCase() ||
    categoryLabel.toLowerCase() === feature.application.toLowerCase() ||
    (feature.category === "gemini" && isGemini);
  const evidence = getFeatureEvidence(feature);

  // Filter out features to use as related features
  const allFeatures = getFeatures(locale);
  const relatedFeatures = feature.relatedFeatures
    ? allFeatures.filter(f => feature.relatedFeatures?.includes(f.id))
    : allFeatures.filter(f => f.application === feature.application && f.id !== feature.id).slice(0, 3);

  const formatAvailability = (av: string) =>
    formatEnterpriseAvailability(av, locale);

  return (
    <main className="min-h-screen bg-background pb-20 pt-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumb / Back Link */}
        <Link 
          href="/features" 
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />{t("Back to Features Directory")}</Link>

        {/* Header Section */}
        <div className="mb-12 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-3 py-1 text-sm font-medium text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: appColor }} />
              {appName}
            </div>
            
            {!isRedundantCategory && (
              <div className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                {categoryLabel}
              </div>
            )}

            {feature.isNew && (
              <div className="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                <Sparkles className="h-3.5 w-3.5" />
                New
              </div>
            )}
            
            {feature.isPopular && (
              <div className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                <Flame className="h-3.5 w-3.5" />
                Popular
              </div>
            )}

            <div className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
              {formatAvailability(feature.enterpriseAvailability)}
            </div>
          </div>

          <section className="grid gap-4 rounded-2xl border border-border bg-muted/20 p-5 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-google-green" />
              <div><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("Source coverage")}</p><p className="mt-1 text-sm font-semibold text-foreground">{evidence.sourceCoverage}</p><p className="mt-1 text-xs text-muted-foreground">{evidence.sourceNote}</p></div>
            </div>
            <div><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("Availability notes")}</p>{evidence.availabilityNotes.length ? <ul className="mt-2 space-y-1 text-xs text-muted-foreground">{evidence.availabilityNotes.map((note) => <li key={note}>• {note}</li>)}</ul> : <p className="mt-1 text-sm text-muted-foreground">{t("See the plan matrix for edition-specific limits.")}</p>}</div>
            {evidence.restrictions.length > 0 && <div><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("Restrictions")}</p><p className="mt-1 text-sm text-muted-foreground">{evidence.restrictions.join(" · ")}</p></div>}
            {evidence.sourceUrl && <a href={evidence.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-google-blue hover:underline"><ExternalLink className="h-4 w-4" /> Open Google reference</a>}
          </section>

          <section className="rounded-2xl border border-border bg-background p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("Google references")}</p>
            <ul className="mt-3 space-y-2">
              {evidence.officialSources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-google-blue hover:underline">
                    <ExternalLink className="h-3.5 w-3.5" />
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl fluid-h2">
              {feature.name}
            </h1>
            <p className="max-w-3xl text-xl text-muted-foreground">
              {feature.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {feature.documentationUrl && <a href={feature.documentationUrl} target="_blank" rel="noreferrer" className="rounded-full border border-google-blue/20 bg-google-blue/5 px-3 py-1.5 font-semibold text-google-blue hover:underline">{t("Official documentation")}</a>}
            </div>
          </div>

          <ActionButtons 
            featureName={feature.name} 
            documentationUrl={feature.documentationUrl} 
          />
        </div>

        <section className="mb-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("Use case")}</p>
            <p className="text-sm leading-6 text-foreground">
              {feature.useCaseSummary || feature.useCases[0] || "Grounded business workflows across internal and approved external data sources."}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("Where it is used")}</p>
            <ul className="space-y-2 text-sm leading-6 text-foreground">
              {(feature.whereUsed || ["Workspace search", "Admin setup", "Business operations"])
                .slice(0, 3)
                .map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-google-blue" />
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("How to use it")}</p>
            <ol className="space-y-2 text-sm leading-6 text-foreground">
              {(feature.howToUse || [
                "Review the connector requirements in the admin console.",
                "Approve permissions and source access for the target system.",
                "Ask Gemini for a grounded answer using the connected app context.",
              ]).map((step, index) => (
                <li key={step} className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[11px] font-bold text-foreground">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content Column */}
          <div className="flex flex-col gap-10 lg:col-span-2">
            
            {/* Section 1: What It Does & How It Works */}
            <section className="flex flex-col gap-6 rounded-3xl border border-border/50 bg-muted/10 p-6 sm:p-8">
              <div>
                <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground">{t("What It Does")}</h2>
                <p className="text-muted-foreground leading-relaxed">{feature.whatItDoes}</p>
              </div>

              <div className="h-px w-full bg-border/50" />

              <div>
                <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground">{t("How It Works")}</h2>
                <p className="text-muted-foreground leading-relaxed">{feature.howItWorks}</p>
              </div>

              {(feature.includedCapabilities || feature.capabilities) && (feature.includedCapabilities || feature.capabilities).length > 0 && (
                <>
                  <div className="h-px w-full bg-border/50" />
                  <div>
                    <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">{t("Included capabilities")}</h3>
                    <div className="overflow-hidden rounded-2xl border border-border bg-background">
                      <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
                        {(feature.includedCapabilities || feature.capabilities).map((cap, i) => (
                          <div key={i} className="bg-card px-4 py-3 text-sm text-foreground">
                            {cap}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {feature.useCases && feature.useCases.length > 0 && (
                <>
                  <div className="h-px w-full bg-border/50" />
                  <div>
                    <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">{t("Key Use Cases")}</h3>
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {feature.useCases.map((useCase, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="text-sm text-foreground">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </section>

            {/* Section 2: Plan Availability Matrix */}
            <section className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">{t("Plan Availability Matrix")}</h2>
                <p className="mt-1 text-muted-foreground">{t("Cataloged availability across {n} listed plans. Unmapped entries need source review.", { n: plans.length })}</p>
              </div>

              <div className="overflow-hidden rounded-3xl border border-border/50 bg-background">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-border/50 bg-muted/30">
                        <th className="px-6 py-4 font-medium text-muted-foreground">{t("Plan Name")}</th>
                        <th className="px-6 py-4 font-medium text-muted-foreground">{t("Category")}</th>
                        <th className="px-6 py-4 font-medium text-muted-foreground">{t("Status")}</th>
                        <th className="px-6 py-4 font-medium text-muted-foreground">{t("Limits & Notes")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {getPlans(locale).map(plan => {
                        const planAvailability = feature.plans[plan.id as PlanId];
                        const isAvailable = planAvailability?.available ?? false;
                        const statusType = planAvailability?.status || (isAvailable ? "yes" : "no");
                        
                        return (
                          <tr key={plan.id} className="transition-colors hover:bg-muted/10">
                            <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">
                              {plan.name}
                            </td>
                            <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                              {plan.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {isAvailable ? (
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-500 font-medium">
                                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                    <Check className="h-3 w-3" />
                                  </div>{t("Available")}</div>
                              ) : planAvailability ? (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted">
                                    <Minus className="h-3 w-3" />
                                  </div>{t("Unavailable")}</div>
                              ) : (
                                <span className="text-xs font-medium text-amber-700 dark:text-amber-300">{t("Not mapped")}</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {!planAvailability ? (
                                <span className="text-xs text-muted-foreground">{t("Confirm with Google")}</span>
                              ) : statusType === "limited" || planAvailability?.limit ? (
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500 whitespace-nowrap">
                                    Limited: {planAvailability?.limit || "See terms"}
                                  </span>
                                  {planAvailability?.note && (
                                    <span className="text-xs text-muted-foreground">{planAvailability.note}</span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-muted-foreground">
                                  {planAvailability?.note || "-"}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="flex flex-col gap-8 lg:col-span-1">
            
            {/* Section 3: Enterprise & Security Considerations */}
            {(feature.enterpriseConsiderations || feature.securityConsiderations) && (
              <section className="flex flex-col gap-4">
                {feature.enterpriseConsiderations && (
                  <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5 dark:border-blue-900/30 dark:bg-blue-900/10">
                    <div className="mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400">
                      <Info className="h-5 w-5" />
                      <h3 className="font-bold">{t("Enterprise Considerations")}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-blue-200/70">
                      {feature.enterpriseConsiderations}
                    </p>
                  </div>
                )}

                {feature.securityConsiderations && (
                  <div className="rounded-2xl border border-green-200 bg-green-50/50 p-5 dark:border-green-900/30 dark:bg-green-900/10">
                    <div className="mb-3 flex items-center gap-2 text-green-700 dark:text-green-400">
                      <Check className="h-5 w-5" />
                      <h3 className="font-bold">{t("Security & Compliance")}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-green-200/70">
                      {feature.securityConsiderations}
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* Section 4: Related Features */}
            {relatedFeatures.length > 0 && (
              <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold tracking-tight text-foreground">{t("Related Features")}</h3>
                <div className="flex flex-col gap-3">
                  {relatedFeatures.map(rf => (
                    <Link 
                      key={rf.id}
                      href={`/features/${rf.slug}`}
                      className="group flex flex-col gap-1 rounded-2xl border border-border/50 bg-background p-4 transition-all hover:border-primary/50 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">{rf.application}</span>
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <ChevronLeft className="h-3 w-3 rotate-180" />
                        </div>
                      </div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{rf.name}</h4>
                      <p className="line-clamp-2 text-xs text-muted-foreground">{rf.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
