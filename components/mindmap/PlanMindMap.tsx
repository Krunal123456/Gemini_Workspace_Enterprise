"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import {
  X,
  ArrowRight,
  CheckCircle2,
  Circle,
  Minus,
  ExternalLink,
  ChevronRight,
  Sparkles,
  HardDrive,
  Users,
  CreditCard,
  Zap,
} from "lucide-react";
import type { Plan, Feature, PlanId } from "@/types";

// ─── Colour palette per plan category ─────────────────────────────────────────
const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; glow: string; badge: string }> = {
  "Google Workspace": {
    bg: "bg-google-blue/10",
    border: "border-google-blue/40",
    text: "text-google-blue",
    glow: "#1a73e8",
    badge: "bg-google-blue/20 text-google-blue border-google-blue/30",
  },
  "AI Add-ons": {
    bg: "bg-gemini-indigo/10",
    border: "border-gemini-indigo/40",
    text: "text-gemini-indigo",
    glow: "#6366f1",
    badge: "bg-gemini-indigo/20 text-gemini-indigo border-gemini-indigo/30",
  },
  "Workspace Add-ons": {
    bg: "bg-google-green/10",
    border: "border-google-green/40",
    text: "text-google-green",
    glow: "#34a853",
    badge: "bg-google-green/20 text-google-green border-google-green/30",
  },
  "Gemini Enterprise": {
    bg: "bg-gemini-purple/10",
    border: "border-gemini-purple/40",
    text: "text-gemini-purple",
    glow: "#8b5cf6",
    badge: "bg-gemini-purple/20 text-gemini-purple border-gemini-purple/30",
  },
};

const CATEGORY_ORDER = [
  "Google Workspace",
  "AI Add-ons",
  "Workspace Add-ons",
  "Gemini Enterprise",
];

// ─── SVG layout math ──────────────────────────────────────────────────────────
interface NodeDef {
  plan: Plan;
  cx: number;
  cy: number;
  groupAngle: number; // angle from center
}

function buildLayout(plans: Plan[], W: number, H: number): NodeDef[] {
  const cx = W / 2;
  const cy = H / 2;

  // Group by category in order
  const grouped: Record<string, Plan[]> = {};
  for (const cat of CATEGORY_ORDER) grouped[cat] = [];
  for (const p of plans) {
    if (grouped[p.category]) grouped[p.category].push(p);
  }

  const nodes: NodeDef[] = [];
  const catAngles: Record<string, number> = {
    "Google Workspace": -Math.PI * 0.85,      // upper-left cluster
    "AI Add-ons": -Math.PI * 0.15,            // upper-right
    "Workspace Add-ons": Math.PI * 0.55,      // lower-right
    "Gemini Enterprise": Math.PI * 0.85,      // lower-left
  };

  const radii: Record<string, number> = {
    "Google Workspace": Math.min(W, H) * 0.30,
    "AI Add-ons": Math.min(W, H) * 0.30,
    "Workspace Add-ons": Math.min(W, H) * 0.30,
    "Gemini Enterprise": Math.min(W, H) * 0.30,
  };

  // fan spread per category
  const SPREADS: Record<string, number> = {
    "Google Workspace": Math.PI * 0.42,
    "AI Add-ons": Math.PI * 0.32,
    "Workspace Add-ons": Math.PI * 0.42,
    "Gemini Enterprise": Math.PI * 0.35,
  };

  for (const cat of CATEGORY_ORDER) {
    const catPlans = grouped[cat];
    if (!catPlans.length) continue;
    const baseAngle = catAngles[cat];
    const spread = SPREADS[cat];
    const r = radii[cat];
    const n = catPlans.length;

    catPlans.forEach((plan, i) => {
      const frac = n === 1 ? 0.5 : i / (n - 1);
      const angle = baseAngle - spread / 2 + frac * spread;
      nodes.push({
        plan,
        cx: cx + r * Math.cos(angle),
        cy: cy + r * Math.sin(angle),
        groupAngle: angle,
      });
    });
  }

  return nodes;
}

// ─── Feature availability pill ────────────────────────────────────────────────
function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    yes: "bg-google-green/15 text-google-green border-google-green/30",
    limited: "bg-google-yellow/15 text-google-yellow border-google-yellow/30",
    higher_limits: "bg-google-blue/15 text-google-blue border-google-blue/30",
    custom: "bg-gemini-purple/15 text-gemini-purple border-gemini-purple/30",
    enterprise: "bg-gemini-indigo/15 text-gemini-indigo border-gemini-indigo/30",
    no: "bg-muted text-muted-foreground border-border",
  };
  const label: Record<string, string> = {
    yes: "Available",
    limited: "Limited",
    higher_limits: "Higher Limits",
    custom: "Custom",
    enterprise: "Enterprise",
    no: "Not included",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${map[status] ?? map.no}`}>
      {label[status] ?? status}
    </span>
  );
}

// ─── Side panel ───────────────────────────────────────────────────────────────
function PlanPanel({
  plan,
  features,
  onClose,
}: {
  plan: Plan;
  features: Feature[];
  onClose: () => void;
}) {
  const colors = CATEGORY_COLORS[plan.category] ?? CATEGORY_COLORS["Google Workspace"];
  const availableFeatures = features.filter((f) => f.plans[plan.id as PlanId]?.available);
  const categories = [...new Set(availableFeatures.map((f) => f.category))].sort();

  // price display
  const priceDisplay = plan.annualPriceUSD
    ? `$${plan.annualPriceUSD}/user/mo`
    : plan.startingPriceUSD
    ? `From $${plan.startingPriceUSD}/seat/mo`
    : plan.id === "gemini-enterprise-payg"
    ? "$0 seat fee"
    : "Contact sales";

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex flex-col w-full max-w-[480px] bg-background border-l border-border shadow-2xl">
      {/* Header */}
      <div className={`p-6 border-b border-border ${colors.bg}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${colors.badge} mb-3`}>
              <CreditCard className="w-3 h-3" />
              {plan.category}
            </span>
            <h2 className="text-xl font-extrabold text-foreground mb-1 leading-tight">{plan.name}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{plan.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Price + storage */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${colors.border} bg-background`}>
            <span className={`text-base font-extrabold ${colors.text}`}>{priceDisplay}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <HardDrive className="w-3.5 h-3.5" />
            <span>{plan.storage}</span>
          </div>
          {plan.participantLimit && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span>{plan.participantLimit} participants</span>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {/* Key highlights */}
        <div className="p-6 border-b border-border/60">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Key Entitlements
          </h3>
          <ul className="space-y-2">
            {plan.highlightedFeatures.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                <CheckCircle2 className="w-4 h-4 text-google-green shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Feature count stat */}
        <div className="px-6 py-4 border-b border-border/60 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.bg} border ${colors.border}`}>
            <Zap className={`w-5 h-5 ${colors.text}`} />
          </div>
          <div>
            <div className={`text-2xl font-extrabold ${colors.text}`}>{availableFeatures.length}</div>
            <div className="text-xs text-muted-foreground">AI features available on this plan</div>
          </div>
        </div>

        {/* Features by category */}
        <div className="p-6 space-y-6">
          {categories.map((cat) => {
            const catFeatures = availableFeatures.filter((f) => f.category === cat);
            return (
              <div key={cat}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">{cat}</h4>
                <div className="space-y-2">
                  {catFeatures.slice(0, 6).map((f) => {
                    const avail = f.plans[plan.id as PlanId];
                    return (
                      <Link
                        key={f.id}
                        href={`/features/${f.slug}`}
                        className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-muted/50 border border-transparent hover:border-border transition-all group"
                      >
                        <span className="text-sm text-foreground/90 group-hover:text-foreground transition-colors leading-tight">{f.name}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          {avail && <StatusPill status={avail.status} />}
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                      </Link>
                    );
                  })}
                  {catFeatures.length > 6 && (
                    <p className="text-xs text-muted-foreground pl-3">
                      +{catFeatures.length - 6} more features
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border bg-muted/20 flex flex-col gap-3">
        <Link
          href={`/plans/${plan.slug}`}
          className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-semibold text-sm text-white transition-all ${
            plan.category === "Google Workspace"
              ? "bg-google-blue hover:bg-google-blue/90"
              : plan.category === "AI Add-ons"
              ? "bg-gemini-indigo hover:bg-gemini-indigo/90"
              : plan.category === "Workspace Add-ons"
              ? "bg-google-green hover:bg-google-green/90"
              : "bg-gemini-purple hover:bg-gemini-purple/90"
          }`}
        >
          View Full Plan Details <ArrowRight className="w-4 h-4" />
        </Link>
        {plan.pricingUrl && (
          <a
            href={plan.pricingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl font-medium text-sm border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all"
          >
            Official Pricing <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Main Mind Map component ──────────────────────────────────────────────────
export function PlanMindMap({ plans, features }: { plans: Plan[]; features: Feature[] }) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const svgRef = useRef<SVGSVGElement>(null);
  const isPanning = useRef(false);
  const lastPan = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ w: 1400, h: 800 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDimensions({
          w: containerRef.current.clientWidth || 1400,
          h: Math.max(containerRef.current.clientHeight, 600),
        });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const W = dimensions.w;
  const H = dimensions.h;
  const nodes = buildLayout(plans, W, H);

  const CENTER_R = 56;
  const NODE_W = 130;
  const NODE_H = 52;
  const NODE_R = 12;

  // Pan handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as SVGElement).closest("[data-plan-node]")) return;
    isPanning.current = true;
    lastPan.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning.current) return;
    setPan((p) => ({
      x: p.x + (e.clientX - lastPan.current.x),
      y: p.y + (e.clientY - lastPan.current.y),
    }));
    lastPan.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseUp = useCallback(() => { isPanning.current = false; }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => Math.min(2, Math.max(0.4, s - e.deltaY * 0.001)));
  }, []);

  const resetView = () => { setPan({ x: 0, y: 0 }); setScale(1); };

  // Category legend
  const categoryGroups = CATEGORY_ORDER.map((cat) => ({
    cat,
    plans: plans.filter((p) => p.category === cat),
    colors: CATEGORY_COLORS[cat],
  }));

  const cx = W / 2;
  const cy = H / 2;

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Legend + controls bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-3">
          {categoryGroups.map(({ cat, colors }) => (
            <div key={cat} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full border ${colors.border}`} style={{ background: colors.glow }} />
              <span className="text-xs text-muted-foreground font-medium">{cat}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {Math.round(scale * 100)}% zoom
          </span>
          <button
            onClick={() => setScale((s) => Math.min(2, s + 0.15))}
            className="px-2 py-1 text-xs border border-border rounded-md hover:bg-muted transition-colors"
          >+</button>
          <button
            onClick={() => setScale((s) => Math.max(0.4, s - 0.15))}
            className="px-2 py-1 text-xs border border-border rounded-md hover:bg-muted transition-colors"
          >−</button>
          <button
            onClick={resetView}
            className="px-2.5 py-1 text-xs border border-border rounded-md hover:bg-muted transition-colors text-muted-foreground"
          >Reset</button>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ minHeight: 500 }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onWheel={onWheel}
        >
          <defs>
            {/* Glow filters */}
            {CATEGORY_ORDER.map((cat) => {
              const color = CATEGORY_COLORS[cat].glow;
              const id = cat.replace(/\s+/g, "-").toLowerCase();
              return (
                <filter key={cat} id={`glow-${id}`} x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feFlood floodColor={color} floodOpacity="0.6" result="color" />
                  <feComposite in="color" in2="blur" operator="in" result="shadow" />
                  <feMerge>
                    <feMergeNode in="shadow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              );
            })}
            {/* Center glow */}
            <filter id="center-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Background pattern */}
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.06" />
            </pattern>
          </defs>

          {/* Background dots */}
          <rect width="100%" height="100%" fill="url(#dots)" className="text-foreground" />

          <g transform={`translate(${pan.x},${pan.y}) scale(${scale}) translate(${(1 / scale - 1) * (W / 2)},${(1 / scale - 1) * (H / 2)})`}>

            {/* Connection lines */}
            {nodes.map(({ plan, cx: nx, cy: ny }) => {
              const isHovered = hoveredId === plan.id;
              const isSelected = selectedPlan?.id === plan.id;
              const color = CATEGORY_COLORS[plan.category].glow;
              return (
                <line
                  key={`line-${plan.id}`}
                  x1={cx}
                  y1={cy}
                  x2={nx}
                  y2={ny}
                  stroke={color}
                  strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.2}
                  strokeOpacity={isSelected ? 0.9 : isHovered ? 0.7 : 0.25}
                  strokeDasharray={isSelected || isHovered ? "none" : "4 4"}
                  style={{ transition: "all 0.2s ease" }}
                />
              );
            })}

            {/* Plan nodes */}
            {nodes.map(({ plan, cx: nx, cy: ny }) => {
              const isHovered = hoveredId === plan.id;
              const isSelected = selectedPlan?.id === plan.id;
              const colors = CATEGORY_COLORS[plan.category];
              const catId = plan.category.replace(/\s+/g, "-").toLowerCase();
              const featureCount = features.filter((f) => f.plans[plan.id as PlanId]?.available).length;

              return (
                <g
                  key={plan.id}
                  data-plan-node="true"
                  transform={`translate(${nx - NODE_W / 2},${ny - NODE_H / 2})`}
                  onClick={() => setSelectedPlan(isSelected ? null : plan)}
                  onMouseEnter={() => setHoveredId(plan.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ cursor: "pointer" }}
                  filter={isSelected || isHovered ? `url(#glow-${catId})` : undefined}
                >
                  {/* Card background */}
                  <rect
                    width={NODE_W}
                    height={NODE_H}
                    rx={NODE_R}
                    fill={isSelected ? colors.glow : "var(--card)"}
                    stroke={colors.glow}
                    strokeWidth={isSelected ? 2.5 : isHovered ? 1.5 : 0.8}
                    strokeOpacity={isSelected ? 1 : isHovered ? 0.8 : 0.4}
                    style={{ transition: "all 0.2s ease" }}
                  />

                  {/* Plan short name */}
                  <text
                    x={NODE_W / 2}
                    y={NODE_H / 2 - 7}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill={isSelected ? "white" : "var(--foreground)"}
                    style={{ transition: "fill 0.2s ease", fontFamily: "var(--font-sans)" }}
                  >
                    {plan.shortName.length > 16 ? plan.shortName.slice(0, 15) + "…" : plan.shortName}
                  </text>

                  {/* Feature count badge */}
                  <text
                    x={NODE_W / 2}
                    y={NODE_H / 2 + 9}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={9.5}
                    fill={isSelected ? "rgba(255,255,255,0.8)" : colors.glow}
                    style={{ transition: "fill 0.2s ease", fontFamily: "var(--font-sans)" }}
                  >
                    {featureCount} features
                  </text>
                </g>
              );
            })}

            {/* Center hub */}
            <g transform={`translate(${cx},${cy})`} filter="url(#center-glow)">
              {/* Outer ring */}
              <circle r={CENTER_R + 8} fill="none" stroke="#1a73e8" strokeWidth={1} strokeOpacity={0.2} strokeDasharray="4 4" />
              <circle r={CENTER_R} fill="var(--card)" stroke="#1a73e8" strokeWidth={2} strokeOpacity={0.6} />
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                y={-10}
                fontSize={11}
                fontWeight={800}
                fill="var(--foreground)"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Gemini
              </text>
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                y={6}
                fontSize={11}
                fontWeight={800}
                fill="var(--foreground)"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Enterprise
              </text>
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                y={20}
                fontSize={8.5}
                fill="#1a73e8"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {plans.length} plans
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Instruction hint */}
      {!selectedPlan && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 border border-border shadow-md backdrop-blur-sm text-xs text-muted-foreground">
            <Circle className="w-3 h-3" />
            Click any plan node to explore its features
            <Minus className="w-3 h-3 mx-1 opacity-40" />
            Scroll to zoom • Drag to pan
          </div>
        </div>
      )}

      {/* Side panel overlay */}
      {selectedPlan && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            onClick={() => setSelectedPlan(null)}
          />
          <PlanPanel
            plan={selectedPlan}
            features={features}
            onClose={() => setSelectedPlan(null)}
          />
        </>
      )}
    </div>
  );
}
