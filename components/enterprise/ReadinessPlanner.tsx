"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, ShieldCheck, Sparkles } from "lucide-react";
import { connectors } from "@/data/connectors";
import { plans } from "@/data/plans";
import { features } from "@/data/features";
import jsPDF from "jspdf";

const securityOptions = [
  { id: "standard", label: "Standard governance", detail: "Workspace controls and basic admin reporting" },
  { id: "regulated", label: "Regulated environment", detail: "DLP, retention, advanced access, or compliance requirements" },
  { id: "mission", label: "Mission-critical AI", detail: "Model Armor, CMEK, VPC-SC, SIEM, and agent governance" },
] as const;

export function ReadinessPlanner() {
  const [seats, setSeats] = useState(250);
  const [companyName, setCompanyName] = useState("");
  const [companyDomain, setCompanyDomain] = useState("");
  const [deployment, setDeployment] = useState("workspace");
  const [connectorNeed, setConnectorNeed] = useState("some");
  const [security, setSecurity] = useState<(typeof securityOptions)[number]["id"]>("regulated");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("gemini-readiness-plan");
    if (!stored) return;
    try {
      const plan = JSON.parse(stored) as { seats: number; deployment: string; connectorNeed: string; security: typeof security };
      setSeats(plan.seats);
      setDeployment(plan.deployment);
      setConnectorNeed(plan.connectorNeed);
      setSecurity(plan.security);
      setSaved(true);
    } catch {
      localStorage.removeItem("gemini-readiness-plan");
    }
  }, []);

  const recommendation = useMemo(() => {
    const planId = security === "mission" || connectorNeed === "custom"
      ? "gemini-enterprise-plus"
      : security === "regulated" || connectorNeed === "some"
        ? "gemini-enterprise-standard"
        : deployment === "workspace" ? "ai-expanded" : "gemini-enterprise-business";
    return plans.find((plan) => plan.id === planId) || plans[0];
  }, [connectorNeed, deployment, security]);

  const price = recommendation.monthlyPriceUSD || 0;
  const monthlyEstimate = price * seats;
  const matchedConnectors = connectorNeed === "none" ? [] : connectorNeed === "custom" ? connectors.filter((connector) => connector.type === "mcp" || connector.type === "custom") : connectors.filter((connector) => connector.type !== "custom").slice(0, 5);
  const readinessScore = security === "mission" ? 96 : security === "regulated" ? 84 : 72;
  const confidence = companyDomain ? "Public signal pending verification" : "Catalog recommendation";
  const connectorGaps = connectorNeed === "custom" ? "Private APIs, databases, and MCP endpoints require architecture review." : connectorNeed === "some" ? "Confirm source permissions and connector region availability." : "Third-party grounding is outside this initial scope.";
  const pilotScope = `${Math.max(5, Math.ceil(seats * 0.2))} users across IT, operations, and one knowledge-heavy business team`;

  const exportReport = () => {
    const report = [
      "GEMINI ENTERPRISE READINESS REPORT",
      "===================================",
      `Company: ${companyName || "Not provided"}`,
      `Domain: ${companyDomain || "Not provided"}`,
      `Confidence: ${confidence}`,
      `Seats: ${seats}`,
      `Deployment: ${deployment === "workspace" ? "Existing Google Workspace" : "Standalone Gemini Enterprise"}`,
      `Connector need: ${connectorNeed}`,
      `Security profile: ${security}`,
      `Recommended plan: ${recommendation.name}`,
      `Estimated monthly investment: $${monthlyEstimate.toLocaleString()}`,
      `Readiness score: ${readinessScore}/100`,
      `Connector gaps: ${connectorGaps}`,
      `Security readiness: ${security}`,
      `Suggested pilot: ${pilotScope}`,
      "",
      "Recommended rollout:",
      "1. Start with a 10-25% pilot group.",
      "2. Validate permissions and connector source quality.",
      "3. Measure adoption, time saved, and answer quality.",
      "4. Expand after governance sign-off.",
    ].join("\n");
    const url = URL.createObjectURL(new Blob([report], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "gemini-enterprise-readiness-report.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(20);
    pdf.text("Gemini Enterprise Readiness Report", 20, 24);
    pdf.setFontSize(11);
    const lines = [
      `Company: ${companyName || "Not provided"}`,
      `Domain: ${companyDomain || "Not provided"}`,
      `Recommended plan: ${recommendation.name}`,
      `Readiness score: ${readinessScore}/100`,
      `Estimated monthly investment: $${monthlyEstimate.toLocaleString()}`,
      `Confidence: ${confidence}`,
      `Security readiness: ${security}`,
      `Suggested pilot: ${pilotScope}`,
      `Connector gaps: ${connectorGaps}`,
    ];
    lines.forEach((line, index) => pdf.text(line, 20, 42 + index * 9));
    pdf.text("Generated by Gemini Enterprise Intelligence", 20, 145);
    pdf.save("gemini-enterprise-readiness-report.pdf");
  };

  const savePlan = () => {
    localStorage.setItem("gemini-readiness-plan", JSON.stringify({ seats, deployment, connectorNeed, security }));
    setSaved(true);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <div className="atlas-card rounded-2xl p-6 sm:p-8">
          <p className="atlas-kicker mb-2">Company context</p>
          <h2 className="text-2xl font-bold text-foreground">Who is this rollout for?</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input value={companyName} onChange={(event) => setCompanyName(event.target.value)} placeholder="Company name" className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-google-blue" />
            <input value={companyDomain} onChange={(event) => setCompanyDomain(event.target.value)} placeholder="company.com" className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-google-blue" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Public evidence is indicative only and should be verified before procurement.</p>
        </div>

        <div className="atlas-card rounded-2xl p-6 sm:p-8">
          <p className="atlas-kicker mb-2">Step 01 · Rollout shape</p>
          <h2 className="text-2xl font-bold text-foreground">Tell us how you plan to deploy Gemini.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => setDeployment("workspace")} className={`rounded-xl border p-4 text-left transition ${deployment === "workspace" ? "border-google-blue bg-google-blue/10" : "border-border hover:bg-muted"}`}><span className="block font-semibold text-foreground">Existing Workspace</span><span className="mt-1 block text-xs text-muted-foreground">Add AI capability to your current collaboration stack.</span></button>
            <button type="button" onClick={() => setDeployment("standalone")} className={`rounded-xl border p-4 text-left transition ${deployment === "standalone" ? "border-google-blue bg-google-blue/10" : "border-border hover:bg-muted"}`}><span className="block font-semibold text-foreground">Standalone Gemini</span><span className="mt-1 block text-xs text-muted-foreground">Build a governed AI layer across your organization.</span></button>
          </div>
          <label className="mt-7 block text-sm font-semibold text-foreground">How many users are in scope? <span className="font-mono text-google-blue">{seats.toLocaleString()}</span></label>
          <input aria-label="Users in scope" type="range" min="5" max="5000" step="5" value={seats} onChange={(event) => setSeats(Number(event.target.value))} className="mt-4 h-2 w-full accent-google-blue" />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>5 users</span><span>5,000 users</span></div>
        </div>

        <div className="atlas-card rounded-2xl p-6 sm:p-8">
          <p className="atlas-kicker mb-2">Step 02 · Architecture</p>
          <h2 className="text-2xl font-bold text-foreground">How much enterprise grounding do you need?</h2>
          <div className="mt-6 grid gap-3">
            {[{ id: "none", label: "Workspace only", detail: "No third-party sources in the first rollout." }, { id: "some", label: "Pre-built connectors", detail: "Use SaaS sources such as Jira, Salesforce, Slack, or SharePoint." }, { id: "custom", label: "Custom APIs and MCP", detail: "Connect private databases, internal tools, and agent actions." }].map((option) => <button key={option.id} type="button" onClick={() => setConnectorNeed(option.id)} className={`rounded-xl border p-4 text-left transition ${connectorNeed === option.id ? "border-google-blue bg-google-blue/10" : "border-border hover:bg-muted"}`}><span className="block font-semibold text-foreground">{option.label}</span><span className="mt-1 block text-xs text-muted-foreground">{option.detail}</span></button>)}
          </div>
        </div>

        <div className="atlas-card rounded-2xl p-6 sm:p-8">
          <p className="atlas-kicker mb-2">Step 03 · Governance</p>
          <h2 className="text-2xl font-bold text-foreground">What security bar must the rollout meet?</h2>
          <div className="mt-6 grid gap-3">
            {securityOptions.map((option) => <button key={option.id} type="button" onClick={() => setSecurity(option.id)} className={`rounded-xl border p-4 text-left transition ${security === option.id ? "border-google-blue bg-google-blue/10" : "border-border hover:bg-muted"}`}><span className="block font-semibold text-foreground">{option.label}</span><span className="mt-1 block text-xs text-muted-foreground">{option.detail}</span></button>)}
          </div>
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl bg-[#0B0F19] p-6 text-white shadow-2xl sm:p-8">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6"><div><p className="text-xs font-bold uppercase tracking-wider text-blue-300">Recommended architecture</p><h2 className="mt-2 text-2xl font-bold">{recommendation.name}</h2></div><div className="rounded-full bg-google-green/15 px-3 py-1 text-sm font-bold text-green-300">{readinessScore}/100</div></div>
          <p className="mt-5 text-sm leading-relaxed text-slate-300">{recommendation.tagline}</p>
          <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl border border-white/10 bg-white/5 p-4"><span className="block text-xs text-slate-400">Estimated monthly</span><strong className="mt-1 block text-xl">${monthlyEstimate.toLocaleString()}</strong></div><div className="rounded-xl border border-white/10 bg-white/5 p-4"><span className="block text-xs text-slate-400">Pilot scope</span><strong className="mt-1 block text-xl">{Math.max(5, Math.ceil(seats * 0.2))}</strong></div></div>
          <div className="mt-7"><p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Recommended capabilities</p><div className="space-y-2">{recommendation.highlightedFeatures.slice(0, 5).map((item) => <div key={item} className="flex items-start gap-2 text-sm text-slate-200"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />{item}</div>)}</div></div>
          {matchedConnectors.length > 0 && <div className="mt-7 border-t border-white/10 pt-6"><p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Connector direction</p><p className="text-sm text-slate-300">Plan for {matchedConnectors.slice(0, 3).map((connector) => connector.name).join(", ")}{matchedConnectors.length > 3 ? ` + ${matchedConnectors.length - 3} more` : ""}.</p></div>}
          <div className="mt-8 grid gap-3"><button type="button" onClick={savePlan} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">{saved ? "Saved to this browser" : "Save decision workspace"}</button><button type="button" onClick={exportReport} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"><Download className="h-4 w-4" /> Download text report</button><button type="button" onClick={exportPdf} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-slate-950 transition hover:bg-slate-100"><Download className="h-4 w-4" /> Download PDF report</button><Link href={`/plans/${recommendation.slug}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">View recommended plan <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </aside>
    </div>
  );
}
