import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { plans } from "@/data/plans";
import { features } from "@/data/features";
import { formatCurrency } from "@/lib/utils";

const previewPlanIds = [
  "business-standard",
  "business-plus",
  "gemini-enterprise-business",
  "gemini-enterprise-standard",
] as const;

const previewPlans = previewPlanIds
  .map((id) => plans.find((plan) => plan.id === id))
  .filter((plan) => plan !== undefined);

function getPriceLabel(plan: (typeof plans)[number]) {
  if (plan.annualPriceUSD) return `${formatCurrency(plan.annualPriceUSD)} / user / month`;
  if (plan.startingPriceUSD) return `From ${formatCurrency(plan.startingPriceUSD)} / seat / month`;
  return plan.pricingNote || "Check current pricing";
}

export default function ComparisonPreview() {
  return (
    <section className="atlas-section bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="atlas-kicker mb-3">Plan comparison</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Start with the differences that shape your rollout.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Compare listed prices and storage figures, then check Google's plan pages for regional pricing and current terms.
            </p>
          </div>
          <Link href="/compare" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90">
            Open {plans.length}-plan matrix <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="min-w-[920px] w-full border-separate border-spacing-0 text-left">
            <thead>
              <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="sticky left-0 z-10 min-w-48 border-b border-border bg-muted/90 px-5 py-4 font-semibold backdrop-blur">Plan detail</th>
                {previewPlans.map((plan) => (
                  <th key={plan.id} className="min-w-52 border-b border-border px-5 py-4 align-top">
                    <span className="block text-[10px] font-semibold text-google-blue">{plan.category}</span>
                    <Link href={`/plans/${plan.slug}`} className="mt-2 block text-base font-bold normal-case tracking-normal text-foreground hover:text-google-blue">{plan.name}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <th className="sticky left-0 border-b border-border bg-card px-5 py-5 font-semibold text-foreground">Published rate</th>
                {previewPlans.map((plan) => (
                  <td key={plan.id} className="border-b border-border px-5 py-5 align-top">
                    <span className="font-semibold text-foreground">{getPriceLabel(plan)}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{plan.annualPriceUSD ? "Annual commitment rate; US list reference" : "Starting rate; confirm edition and contract price"}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <th className="sticky left-0 border-b border-border bg-card px-5 py-5 font-semibold text-foreground">Storage / indexing</th>
                {previewPlans.map((plan) => (
                  <td key={plan.id} className="border-b border-border px-5 py-5 align-top leading-relaxed text-muted-foreground">{plan.storage}</td>
                ))}
              </tr>
              <tr>
                <th className="sticky left-0 bg-card px-5 py-5 font-semibold text-foreground">Plan summary</th>
                {previewPlans.map((plan) => (
                  <td key={plan.id} className="px-5 py-5 align-top leading-relaxed text-muted-foreground">{plan.tagline}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl leading-relaxed">Catalog view: {plans.length} listed plan options · {features.length} feature entries. Features without an edition-specific mapping are marked for review in the full matrix.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="https://workspace.google.com/pricing" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-google-blue hover:underline">Workspace prices <ExternalLink className="h-3 w-3" /></a>
            <a href="https://cloud.google.com/gemini-enterprise" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-google-blue hover:underline">Gemini Enterprise prices <ExternalLink className="h-3 w-3" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
