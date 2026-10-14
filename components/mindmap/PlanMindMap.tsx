"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import {
  X,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  HardDrive,
  Users,
  CreditCard,
  Zap,
  Search,
  MousePointer2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import type { Plan, Feature, PlanId } from "@/types";

// ─── Theme ────────────────────────────────────────────────────────────────────
const CAT_THEME: Record<string, { glow: string; fill: string; text: string; tag: string; btn: string }> = {
  "Google Workspace": {
    glow: "#1a73e8",
    fill: "rgba(26,115,232,0.12)",
    text: "#1a73e8",
    tag: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    btn: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  "AI Add-ons": {
    glow: "#6366f1",
    fill: "rgba(99,102,241,0.12)",
    text: "#6366f1",
    tag: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
    btn: "bg-indigo-600 hover:bg-indigo-700 text-white",
  },
  "Workspace Add-ons": {
    glow: "#16a34a",
    fill: "rgba(22,163,74,0.12)",
    text: "#16a34a",
    tag: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    btn: "bg-green-600 hover:bg-green-700 text-white",
  },
  "Gemini Enterprise": {
    glow: "#7c3aed",
    fill: "rgba(124,58,237,0.12)",
    text: "#7c3aed",
    tag: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    btn: "bg-violet-600 hover:bg-violet-700 text-white",
  },
};

const CATEGORY_ORDER = [
  "Google Workspace",
  "AI Add-ons",
  "Workspace Add-ons",
  "Gemini Enterprise",
];

// ─── Layout ───────────────────────────────────────────────────────────────────
// Uses a fixed 1200×700 internal coordinate space.
// Nodes are positioned in 4 quadrants, each category gets its own quadrant.
const MAP_W = 1200;
const MAP_H = 700;
const CX = MAP_W / 2;
const CY = MAP_H / 2;
const CENTER_R = 50;
const NODE_W = 136;
const NODE_H = 54;
const NODE_R = 10;

// Pre-computed quadrant positions for each category
const QUADRANT_ANGLES: Record<string, { base: number; spread: number }> = {
  "Google Workspace":   { base: -2.4,  spread: 1.1 },   // upper-left
  "AI Add-ons":         { base: -0.7,  spread: 0.9 },   // upper-right
  "Workspace Add-ons":  { base:  0.7,  spread: 1.1 },   // lower-right
  "Gemini Enterprise":  { base:  2.4,  spread: 0.9 },   // lower-left
};

// Radius: push nodes further from center to avoid crowding
const RADII: Record<string, number> = {
  "Google Workspace":   290,
  "AI Add-ons":         260,
  "Workspace Add-ons":  290,
  "Gemini Enterprise":  260,
};

interface NodePos { plan: Plan; x: number; y: number }

function buildLayout(plans: Plan[]): NodePos[] {
  const grouped: Record<string, Plan[]> = {};
  for (const c of CATEGORY_ORDER) grouped[c] = [];
  for (const p of plans) if (grouped[p.category]) grouped[p.category].push(p);

  const out: NodePos[] = [];
  for (const cat of CATEGORY_ORDER) {
    const ps = grouped[cat];
    if (!ps.length) continue;
    const { base, spread } = QUADRANT_ANGLES[cat];
    const r = RADII[cat];
    const n = ps.length;
    ps.forEach((plan, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const angle = base - spread / 2 + t * spread;
      out.push({
        plan,
        x: CX + r * Math.cos(angle),
        y: CY + r * Math.sin(angle),
      });
    });
  }
  return out;
}

// ─── Status pill ──────────────────────────────────────────────────────────────
function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    yes:           "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700",
    limited:       "bg-amber-100  text-amber-700  border-amber-200  dark:bg-amber-900/40  dark:text-amber-300  dark:border-amber-700",
    higher_limits: "bg-blue-100   text-blue-700   border-blue-200   dark:bg-blue-900/40   dark:text-blue-300   dark:border-blue-700",
    custom:        "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/40 dark:text-violet-300 dark:border-violet-700",
    enterprise:    "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-700",
    no:            "bg-gray-100   text-gray-500   border-gray-200   dark:bg-gray-800      dark:text-gray-400   dark:border-gray-700",
  };
  const labels: Record<string, string> = {
    yes: "✓ Available", limited: "Limited", higher_limits: "Higher Limits",
    custom: "Custom", enterprise: "Enterprise", no: "Not included",
  };
  const s = styles[status] ?? styles.no;
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border ${s}`}>
      {labels[status] ?? status}
    </span>
  );
}

// ─── Side Panel ───────────────────────────────────────────────────────────────
function PlanPanel({ plan, features, onClose }: { plan: Plan; features: Feature[]; onClose: () => void }) {
  const theme = CAT_THEME[plan.category] ?? CAT_THEME["Google Workspace"];
  const [search, setSearch] = useState("");

  const available = features.filter(f => f.plans[plan.id as PlanId]?.available);
  const filtered  = search.trim()
    ? available.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
    : available;

  const cats = [...new Set(filtered.map(f => f.category))].sort();

  const price = plan.annualPriceUSD
    ? `$${plan.annualPriceUSD}/user/mo`
    : plan.startingPriceUSD
    ? `From $${plan.startingPriceUSD}/seat/mo`
    : plan.id === "gemini-enterprise-payg" ? "$0 seat fee" : "Contact sales";

  // Animate in
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[70] bg-black/30 backdrop-blur-[3px]"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[80] flex flex-col bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 shadow-2xl"
        style={{ width: "min(480px, 100vw)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div
          className="shrink-0 px-5 py-5 border-b border-gray-100 dark:border-gray-800"
          style={{ background: theme.fill }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold mb-2 ${theme.tag}`}>
                <CreditCard className="w-3 h-3" /> {plan.category}
              </span>
              <h2 className="text-[17px] font-extrabold text-gray-900 dark:text-white leading-snug mb-1">
                {plan.name}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                {plan.tagline}
              </p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stats row */}
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/70 dark:bg-gray-900/70 border border-gray-200/60 dark:border-gray-700/60">
              <span className="text-sm font-bold" style={{ color: theme.glow }}>{price}</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/70 dark:bg-gray-900/70 border border-gray-200/60 dark:border-gray-700/60 text-xs text-gray-500 dark:text-gray-400">
              <HardDrive className="w-3 h-3" /> {plan.storage}
            </div>
            {plan.participantLimit && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/70 dark:bg-gray-900/70 border border-gray-200/60 dark:border-gray-700/60 text-xs text-gray-500 dark:text-gray-400">
                <Users className="w-3 h-3" /> {plan.participantLimit} participants
              </div>
            )}
          </div>
        </div>

        {/* ── Highlights ── */}
        <div className="shrink-0 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> Key Entitlements
          </p>
          <ul className="space-y-1.5">
            {plan.highlightedFeatures.slice(0, 4).map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: theme.glow }} />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Feature count + search ── */}
        <div className="shrink-0 px-5 py-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: theme.fill }}>
                <Zap className="w-4 h-4" style={{ color: theme.glow }} />
              </div>
              <div>
                <div className="text-xl font-extrabold" style={{ color: theme.glow }}>{available.length}</div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500">AI features included</div>
              </div>
            </div>
            {filtered.length !== available.length && (
              <span className="text-[11px] text-gray-400">{filtered.length} shown</span>
            )}
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search features…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
              style={{ "--tw-ring-color": theme.glow } as React.CSSProperties}
            />
          </div>
        </div>

        {/* ── Feature list (scrollable) ── */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {cats.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-8">No features match "{search}"</p>
          )}
          {cats.map(cat => {
            const catFs = filtered.filter(f => f.category === cat);
            return (
              <div key={cat}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">{cat}</p>
                <div className="space-y-1">
                  {catFs.map(f => {
                    const avail = f.plans[plan.id as PlanId];
                    return (
                      <Link
                        key={f.id}
                        href={`/features/${f.slug}`}
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all group"
                      >
                        <span className="text-[12px] text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white leading-snug flex-1 min-w-0">
                          {f.name}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {avail && <StatusPill status={avail.status} />}
                          <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div className="shrink-0 px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 flex flex-col gap-2">
          <Link
            href={`/plans/${plan.slug}`}
            className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${theme.btn}`}
          >
            View Full Plan Details <ArrowRight className="w-4 h-4" />
          </Link>
          {plan.pricingUrl && (
            <a
              href={plan.pricingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
            >
              Official Pricing <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Mind Map ─────────────────────────────────────────────────────────────────
export function PlanMindMap({ plans, features }: { plans: Plan[]; features: Feature[] }) {
  const [selected, setSelected] = useState<Plan | null>(null);
  const [hovered, setHovered]   = useState<string | null>(null);

  // Viewport transform: pan + scale
  const [vp, setVp] = useState({ x: 0, y: 0, scale: 1 });
  const svgRef  = useRef<SVGSVGElement>(null);
  const panning = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Compute SVG dimensions
  const [svgSize, setSvgSize] = useState({ w: MAP_W, h: MAP_H });
  useEffect(() => {
    const el = svgRef.current?.parentElement;
    if (!el) return;
    const obs = new ResizeObserver(([e]) => {
      setSvgSize({ w: e.contentRect.width, h: e.contentRect.height });
    });
    obs.observe(el);
    setSvgSize({ w: el.clientWidth, h: el.clientHeight });
    return () => obs.disconnect();
  }, []);

  // Initial viewport: center the MAP inside the SVG
  const initVp = useCallback(() => {
    const scale = Math.min(svgSize.w / MAP_W, svgSize.h / MAP_H) * 0.90;
    setVp({
      x: (svgSize.w - MAP_W * scale) / 2,
      y: (svgSize.h - MAP_H * scale) / 2,
      scale,
    });
  }, [svgSize]);

  useEffect(() => { initVp(); }, [initVp]);

  // Pan
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as Element).closest("[data-node]")) return;
    panning.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setAttribute("style", "cursor:grabbing");
  }, []);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!panning.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setVp(v => ({ ...v, x: v.x + dx, y: v.y + dy }));
  }, []);
  const onMouseUp = useCallback((e: React.MouseEvent) => {
    panning.current = false;
    e.currentTarget.setAttribute("style", "cursor:grab");
  }, []);

  // Zoom toward cursor
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const rect  = svgRef.current!.getBoundingClientRect();
    const mx    = e.clientX - rect.left;
    const my    = e.clientY - rect.top;
    const delta = e.deltaY < 0 ? 1.12 : 0.89;
    setVp(v => {
      const ns = Math.min(3, Math.max(0.3, v.scale * delta));
      const ratio = ns / v.scale;
      return { scale: ns, x: mx - (mx - v.x) * ratio, y: my - (my - v.y) * ratio };
    });
  }, []);

  const zoom = (factor: number) =>
    setVp(v => {
      const ns = Math.min(3, Math.max(0.3, v.scale * factor));
      const ratio = ns / v.scale;
      const mx = svgSize.w / 2;
      const my = svgSize.h / 2;
      return { scale: ns, x: mx - (mx - v.x) * ratio, y: my - (my - v.y) * ratio };
    });

  const nodes  = buildLayout(plans);
  const tx     = (x: number) => vp.x + x * vp.scale;
  const ty     = (y: number) => vp.y + y * vp.scale;
  const ts     = (v: number) => v * vp.scale;

  const featureCounts = Object.fromEntries(
    plans.map(p => [p.id, features.filter(f => f.plans[p.id as PlanId]?.available).length])
  );

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-gray-950">
      {/* ── Toolbar ── */}
      <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {CATEGORY_ORDER.map(cat => (
            <div key={cat} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: CAT_THEME[cat].glow }} />
              <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">{cat}</span>
            </div>
          ))}
        </div>
        {/* Controls */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-gray-400 mr-1">{Math.round(vp.scale * 100)}%</span>
          <button onClick={() => zoom(1.2)} className="p-1.5 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Zoom in">
            <ZoomIn className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
          </button>
          <button onClick={() => zoom(1/1.2)} className="p-1.5 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Zoom out">
            <ZoomOut className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
          </button>
          <button onClick={initVp} className="px-2.5 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-[11px] font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1" title="Reset view">
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>

      {/* ── Canvas ── */}
      <div className="flex-1 overflow-hidden relative" style={{ minHeight: 0 }}>
        <svg
          ref={svgRef}
          className="w-full h-full cursor-grab select-none"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onWheel={onWheel}
        >
          <defs>
            {/* Dot grid pattern */}
            <pattern id="mm-dots" width="24" height="24" patternUnits="userSpaceOnUse"
              patternTransform={`translate(${vp.x % 24},${vp.y % 24})`}>
              <circle cx="1" cy="1" r="0.8" fill="currentColor" className="text-gray-300 dark:text-gray-700" />
            </pattern>
            {/* Glow filters */}
            {CATEGORY_ORDER.map(cat => {
              const id = cat.replace(/\s+/g, "-").toLowerCase();
              return (
                <filter key={cat} id={`mm-glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feFlood floodColor={CAT_THEME[cat].glow} floodOpacity="0.5" result="c" />
                  <feComposite in="c" in2="blur" operator="in" result="shadow" />
                  <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              );
            })}
            {/* Center glow */}
            <filter id="mm-center" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Dot grid background */}
          <rect width="100%" height="100%" fill="url(#mm-dots)" />

          {/* ── Connector lines ── */}
          {nodes.map(({ plan, x, y }) => {
            const isSel = selected?.id === plan.id;
            const isHov = hovered   === plan.id;
            const color = CAT_THEME[plan.category].glow;
            return (
              <line
                key={`l-${plan.id}`}
                x1={tx(CX)} y1={ty(CY)}
                x2={tx(x)}  y2={ty(y)}
                stroke={color}
                strokeWidth={isSel ? ts(2.5) : isHov ? ts(1.8) : ts(1)}
                strokeOpacity={isSel ? 1 : isHov ? 0.7 : 0.2}
                strokeDasharray={isSel || isHov ? "none" : `${ts(5)} ${ts(5)}`}
                style={{ transition: "stroke-opacity 0.2s, stroke-width 0.2s" }}
              />
            );
          })}

          {/* ── Plan nodes ── */}
          {nodes.map(({ plan, x, y }) => {
            const isSel    = selected?.id === plan.id;
            const isHov    = hovered   === plan.id;
            const theme    = CAT_THEME[plan.category];
            const catId    = plan.category.replace(/\s+/g, "-").toLowerCase();
            const count    = featureCounts[plan.id] ?? 0;
            const nw       = ts(NODE_W);
            const nh       = ts(NODE_H);
            const nr       = ts(NODE_R);
            const nlx      = tx(x) - nw / 2;
            const nly      = ty(y) - nh / 2;
            const fs1      = ts(11.5);
            const fs2      = ts(9);

            return (
              <g
                key={plan.id}
                data-node
                onClick={() => setSelected(isSel ? null : plan)}
                onMouseEnter={() => setHovered(plan.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
                filter={isSel || isHov ? `url(#mm-glow-${catId})` : undefined}
              >
                {/* Shadow/bg rect */}
                <rect
                  x={nlx + ts(1)} y={nly + ts(2)}
                  width={nw} height={nh} rx={nr}
                  fill={theme.glow} fillOpacity={0.08}
                />
                {/* Card */}
                <rect
                  x={nlx} y={nly}
                  width={nw} height={nh} rx={nr}
                  fill={isSel ? theme.glow : "white"}
                  className={isSel ? "" : "dark:[fill:#1f2937]"}
                  stroke={theme.glow}
                  strokeWidth={isSel ? ts(2) : isHov ? ts(1.5) : ts(0.8)}
                  strokeOpacity={isSel ? 1 : isHov ? 0.9 : 0.35}
                  style={{ transition: "fill 0.18s, stroke-width 0.18s" }}
                />
                {/* Plan name */}
                <text
                  x={tx(x)} y={nly + nh * 0.40}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={fs1} fontWeight={700}
                  fill={isSel ? "white" : "#111827"}
                  className={isSel ? "" : "dark:fill-white"}
                  style={{ transition: "fill 0.18s", fontFamily: "system-ui, sans-serif" }}
                  clipPath={`inset(0 0 0 0)`}
                >
                  {plan.shortName.length > 17 ? plan.shortName.slice(0, 16) + "…" : plan.shortName}
                </text>
                {/* Feature count */}
                <text
                  x={tx(x)} y={nly + nh * 0.72}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={fs2} fontWeight={500}
                  fill={isSel ? "rgba(255,255,255,0.85)" : theme.glow}
                  style={{ transition: "fill 0.18s", fontFamily: "system-ui, sans-serif" }}
                >
                  {count} features
                </text>
              </g>
            );
          })}

          {/* ── Center hub ── */}
          {(() => {
            const r1 = ts(CENTER_R + 10);
            const r2 = ts(CENTER_R);
            const hx = tx(CX);
            const hy = ty(CY);
            return (
              <g filter="url(#mm-center)">
                <circle cx={hx} cy={hy} r={r1} fill="none" stroke="#1a73e8" strokeWidth={ts(1)} strokeOpacity={0.15} strokeDasharray={`${ts(4)} ${ts(4)}`} />
                <circle cx={hx} cy={hy} r={r2} fill="white" className="dark:[fill:#111827]" stroke="#1a73e8" strokeWidth={ts(2)} strokeOpacity={0.5} />
                <text x={hx} y={hy - ts(9)} textAnchor="middle" dominantBaseline="middle"
                  fontSize={ts(10.5)} fontWeight={800} fill="#111827" className="dark:fill-white"
                  style={{ fontFamily: "system-ui, sans-serif" }}>Gemini</text>
                <text x={hx} y={hy + ts(5)} textAnchor="middle" dominantBaseline="middle"
                  fontSize={ts(10.5)} fontWeight={800} fill="#111827" className="dark:fill-white"
                  style={{ fontFamily: "system-ui, sans-serif" }}>Enterprise</text>
                <text x={hx} y={hy + ts(19)} textAnchor="middle" dominantBaseline="middle"
                  fontSize={ts(8.5)} fontWeight={500} fill="#1a73e8"
                  style={{ fontFamily: "system-ui, sans-serif" }}>{plans.length} plans</text>
              </g>
            );
          })()}
        </svg>

        {/* Hint pill */}
        {!selected && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-sm text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              <MousePointer2 className="w-3 h-3" />
              Click a plan to explore features
              <span className="opacity-40 mx-1">·</span>
              Scroll to zoom · Drag to pan
            </div>
          </div>
        )}
      </div>

      {/* Side panel */}
      {selected && (
        <PlanPanel
          plan={selected}
          features={features}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
