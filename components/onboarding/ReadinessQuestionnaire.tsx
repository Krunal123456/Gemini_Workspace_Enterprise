"use client";

import { useMemo, useState } from "react";

const steps = [
  { id: "workspace", title: "Do you use Google Workspace?" },
  { id: "users", title: "How many users?" },
  { id: "tools", title: "Which tools do you use?" },
  { id: "connectors", title: "Do you need third-party connectors?" },
  { id: "agents", title: "Do you need agents or MCP?" },
  { id: "security", title: "What security requirements apply?" },
] as const;

export function ReadinessQuestionnaire() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const current = steps[index];
  const progress = useMemo(() => ((index + 1) / steps.length) * 100, [index]);

  const next = (value: string) => {
    const entry = { ...answers, [current.id]: value };
    setAnswers(entry);
    if (index < steps.length - 1) {
      setIndex(index + 1);
    }
  };

  const reset = () => {
    setAnswers({});
    setIndex(0);
  };

  const recommendations = [
    "Existing Google Workspace deployment with a narrow pilot is the lowest-risk path.",
    "Secure enterprise grounding and AI governance should be validated before broad rollout.",
    "Focus on permissions, security, and connector coverage before scaling to all users.",
  ];

  return (
    <section className="atlas-card rounded-2xl p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4"><div><p className="atlas-kicker mb-2">Guided onboarding</p><h2 className="text-2xl font-bold text-foreground">Recommended AI rollout questionnaire</h2></div><span className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Step {index + 1}/{steps.length}</span></div>
      <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-google-blue transition-all" style={{ width: `${progress}%` }} /></div>
      <div className="mt-8">
        <p className="text-lg font-semibold text-foreground">{current.title}</p>
        {current.id === "workspace" && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => next("Yes")} className="rounded-xl border border-border bg-background p-4 text-left font-medium hover:border-google-blue">Yes, we already use Workspace</button>
            <button type="button" onClick={() => next("No")} className="rounded-xl border border-border bg-background p-4 text-left font-medium hover:border-google-blue">No, we are evaluating a new rollout</button>
          </div>
        )}
        {current.id === "users" && (
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {['1-50', '51-500', '501-5000', '5000+'].map((option) => <button key={option} type="button" onClick={() => next(option)} className="rounded-xl border border-border bg-background p-4 text-left font-medium hover:border-google-blue">{option}</button>)}
          </div>
        )}
        {current.id === "tools" && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {['Gmail', 'Docs', 'Drive', 'Jira', 'Salesforce', 'Slack', 'GitHub', 'BigQuery', 'SharePoint'].map((option) => <button key={option} type="button" onClick={() => next(option)} className="rounded-xl border border-border bg-background p-4 text-left font-medium hover:border-google-blue">{option}</button>)}
          </div>
        )}
        {current.id === "connectors" && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => next("Yes")} className="rounded-xl border border-border bg-background p-4 text-left font-medium hover:border-google-blue">Yes, we need connectors</button>
            <button type="button" onClick={() => next("No")} className="rounded-xl border border-border bg-background p-4 text-left font-medium hover:border-google-blue">No, start with Workspace only</button>
          </div>
        )}
        {current.id === "agents" && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => next("Yes, agents")} className="rounded-xl border border-border bg-background p-4 text-left font-medium hover:border-google-blue">Yes, agents</button>
            <button type="button" onClick={() => next("Yes, MCP")} className="rounded-xl border border-border bg-background p-4 text-left font-medium hover:border-google-blue">Yes, MCP</button>
            <button type="button" onClick={() => next("Both")} className="rounded-xl border border-border bg-background p-4 text-left font-medium hover:border-google-blue">Both</button>
            <button type="button" onClick={() => next("No") } className="rounded-xl border border-border bg-background p-4 text-left font-medium hover:border-google-blue">No</button>
          </div>
        )}
        {current.id === "security" && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {['HIPAA / health data', 'GDPR / EU controls', 'DLP and segmentation', 'CMEK / encryption', 'SOC 2 / audit evidence', 'Mission-critical compliance'].map((option) => <button key={option} type="button" onClick={() => next(option)} className="rounded-xl border border-border bg-background p-4 text-left font-medium hover:border-google-blue">{option}</button>)}
          </div>
        )}
      </div>

      {index === steps.length - 1 && Object.keys(answers).length > 0 && (
        <div className="mt-8 rounded-2xl border border-google-blue/20 bg-google-blue/5 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-google-blue">Suggested next move</p>
          <ul className="mt-3 space-y-2 text-sm text-foreground">
            {recommendations.map((item) => <li key={item}>• {item}</li>)}
          </ul>
          <button type="button" onClick={reset} className="mt-5 rounded-lg border border-google-blue/30 bg-white px-3 py-2 text-sm font-semibold text-google-blue">Restart questionnaire</button>
        </div>
      )}
    </section>
  );
}
