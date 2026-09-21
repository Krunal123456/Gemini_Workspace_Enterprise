"use client";

import { useState } from "react";
import { Activity, CheckCircle2, Database, FileCheck, Key, Lock, ShieldCheck, UserCheck } from "lucide-react";
import { securityLayers } from "@/data/security";

const icons = [UserCheck, Lock, Database, ShieldCheck, Key, FileCheck, Activity];

export function SecurityArchitectureMap() {
  const [selectedId, setSelectedId] = useState(securityLayers[0].id);
  const selected = securityLayers.find((layer) => layer.id === selectedId) || securityLayers[0];
  const SelectedIcon = icons[selected.level - 1] || ShieldCheck;

  return <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]"><div className="space-y-2" role="tablist" aria-label="Security architecture layers">{securityLayers.map((layer) => { const Icon = icons[layer.level - 1] || ShieldCheck; return <button key={layer.id} type="button" onClick={() => setSelectedId(layer.id)} role="tab" aria-selected={selected.id === layer.id} className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${selected.id === layer.id ? "border-google-green bg-google-green/10 shadow-sm" : "border-border bg-card hover:bg-muted"}`}><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${selected.id === layer.id ? "bg-google-green text-white" : "bg-muted text-muted-foreground"}`}><Icon className="h-5 w-5" /></span><span><span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Layer {layer.level}</span><span className="block text-sm font-bold text-foreground">{layer.name}</span></span></button>; })}</div><section className="atlas-card rounded-2xl p-6 sm:p-8" role="tabpanel"><div className="flex items-start gap-4 border-b border-border pb-6"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-google-green/10 text-google-green"><SelectedIcon className="h-6 w-6" /></span><div><p className="atlas-kicker">Layer {selected.level} control map</p><h3 className="mt-1 text-2xl font-bold text-foreground">{selected.name}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{selected.tagline}</p></div></div><p className="mt-6 text-sm leading-relaxed text-muted-foreground">{selected.description}</p><div className="mt-7 grid gap-4 md:grid-cols-2">{selected.capabilities.map((capability) => <div key={capability.name} className="rounded-xl border border-border bg-muted/20 p-4"><div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-google-green" /><h4 className="text-sm font-bold text-foreground">{capability.name}</h4></div><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{capability.description}</p><p className="mt-3 border-t border-border/60 pt-3 text-[11px] text-muted-foreground"><strong className="text-foreground">Supported plans:</strong> {capability.plansSupported.join(", ")}</p></div>)}</div></section></div>;
}
