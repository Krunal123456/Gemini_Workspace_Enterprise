import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import { connectors } from "@/data/connectors";

export async function generateStaticParams() {
  return connectors.map((connector) => ({ slug: connector.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const connector = connectors.find((item) => item.id === slug);
  return { title: connector ? `${connector.name} Connector | Gemini Enterprise` : "Connector Not Found" };
}

export default async function ConnectorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const connector = connectors.find((item) => item.id === slug);
  if (!connector) notFound();

  const documentationUrl = `https://cloud.google.com/search?q=${encodeURIComponent(`${connector.name} Google Cloud Integration Connector`)}`;
  const authentication = connector.enterpriseRequirements.split(".")[1]?.trim() || "Administrator authorization and source credentials are required.";
  const operations = connector.groundingCapabilities;
  const checklist = ["Confirm the required Gemini Enterprise edition", "Create or approve the source application credentials", "Grant least-privilege access to the connector service account", "Validate ACL inheritance with a pilot user", "Run a grounded response quality check"];

  return (
    <main className="min-h-screen bg-background pb-24 pt-24 text-foreground">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Link href="/enterprise/connectors" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to connector catalogue
        </Link>
        <div className="mb-12 flex flex-col gap-5 border-b border-border pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-google-blue/20 bg-google-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-google-blue">
              {connector.category}
            </span>
            <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {connector.status}
            </span>
          </div>
          <h1 className="fluid-h1 font-extrabold tracking-tight text-foreground">{connector.name}</h1>
          <p className="max-w-3xl text-xl leading-relaxed text-muted-foreground">{connector.description}</p>
          <a href={documentationUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-google-blue hover:underline">
            Google Cloud documentation <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-foreground">Supported data types</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {connector.dataTypes.map((item) => (
                  <span key={item} className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </section>
            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-foreground">Supported operations</h2>
              <div className="mt-5 space-y-3">
                {operations.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-google-green" />
                    {item}
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-foreground">Setup checklist</h2>
              <div className="mt-5 space-y-3">
                {checklist.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-google-blue/10 text-xs font-bold text-google-blue">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>
          <aside className="space-y-6">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-xl">
              <h2 className="text-xl font-bold">Access and security</h2>
              <div className="mt-5 space-y-5 text-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Authentication</p>
                  <p className="mt-1 text-slate-200">{authentication}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Required permissions</p>
                  <p className="mt-1 text-slate-200">{connector.enterpriseRequirements}</p>
                </div>
                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-green-400" />
                    <p className="text-slate-300 text-xs leading-relaxed">Results should inherit source permissions and be validated with a least-privilege pilot.</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-google-blue">Plan availability</p>
              <div className="mt-4 space-y-2">
                {connector.supportedEditions.map((edition) => (
                  <div key={edition} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-google-green" />
                    {edition}
                  </div>
                ))}
              </div>
              <Link href="/enterprise/readiness" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-google-blue hover:underline">
                Build rollout plan <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
