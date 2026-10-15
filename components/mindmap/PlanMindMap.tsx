"use client";

import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
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
  Maximize2,
  Minimize2,
  Layers,
  Network,
  Shield,
  Briefcase,
  Bot,
  Filter,
} from "lucide-react";
import type { Plan, Feature, PlanId } from "@/types";

// ─── Visual Tokens for Categories ─────────────────────────────────────────────
interface CategoryStyle {
  glow: string;
  fill: string;
  border: string;
  text: string;
  badge: string;
  btn: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  "Google Workspace": {
    glow: "#1a73e8",
    fill: "rgba(26, 115, 232, 0.12)",
    border: "#1a73e8",
    text: "#1a73e8",
    badge: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
    btn: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20",
    icon: Briefcase,
    description: "Core productivity, custom business email, and integrated Gemini assistance.",
  },
  "Gemini Enterprise": {
    glow: "#7c3aed",
    fill: "rgba(124, 58, 237, 0.12)",
    border: "#7c3aed",
    text: "#7c3aed",
    badge: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
    btn: "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20",
    icon: Bot,
    description: "Standalone, dedicated AI enterprise licenses with advanced model reasoning.",
  },
  "AI Add-ons": {
    glow: "#4f46e5",
    fill: "rgba(79, 70, 229, 0.12)",
    border: "#4f46e5",
    text: "#4f46e5",
    badge: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
    btn: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20",
    icon: Sparkles,
    description: "Add-on licenses attaching directly to existing Workspace tenants.",
  },
  "Workspace Add-ons": {
    glow: "#059669",
    fill: "rgba(5, 150, 105, 0.12)",
    border: "#059669",
    text: "#059669",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
    btn: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20",
    icon: Shield,
    description: "Cloud telephony, no-code automation, and pooled storage extensions.",
  },
};

const CATEGORIES = [
  "Google Workspace",
  "Gemini Enterprise",
  "AI Add-ons",
  "Workspace Add-ons",
];

// ─── Mind Map Coordinate Geometry (Fixed Virtual Space: 1600 × 950) ───────────
const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 950;
const CENTER_NODE = { x: 800, y: 475, w: 250, h: 76 };

interface PlanNodePos {
  plan: Plan;
  x: number; // center x
  y: number; // center y
  w: number;
  h: number;
  side: "left" | "right";
  categoryKey: string;
}

interface CategoryNodePos {
  key: string;
  x: number;
  y: number;
  w: number;
  h: number;
  side: "left" | "right";
}

const CATEGORY_POSITIONS: Record<string, CategoryNodePos> = {
  "Google Workspace":  { key: "Google Workspace",  x: 500,  y: 240, w: 200, h: 48, side: "left"  },
  "Workspace Add-ons": { key: "Workspace Add-ons", x: 500,  y: 710, w: 200, h: 48, side: "left"  },
  "Gemini Enterprise": { key: "Gemini Enterprise", x: 1100, y: 240, w: 200, h: 48, side: "right" },
  "AI Add-ons":        { key: "AI Add-ons",        x: 1100, y: 710, w: 200, h: 48, side: "right" },
};

function computeMindMapLayout(plans: Plan[]): {
  planNodes: PlanNodePos[];
  categoryNodes: CategoryNodePos[];
} {
  const planNodes: PlanNodePos[] = [];
  const categoryNodes = Object.values(CATEGORY_POSITIONS);

  const grouped: Record<string, Plan[]> = {};
  for (const c of CATEGORIES) grouped[c] = [];
  for (const p of plans) {
    if (grouped[p.category]) grouped[p.category].push(p);
  }

  const CARD_W = 224;
  const CARD_H = 56;

  // Google Workspace (Top-Left) -> 5 plans
  const gwPlans = grouped["Google Workspace"] || [];
  gwPlans.forEach((plan, i) => {
    planNodes.push({
      plan,
      x: 190,
      y: 80 + i * 80, // 80, 160, 240, 320, 400
      w: CARD_W,
      h: CARD_H,
      side: "left",
      categoryKey: "Google Workspace",
    });
  });

  // Workspace Add-ons (Bottom-Left) -> 5 plans
  const waPlans = grouped["Workspace Add-ons"] || [];
  waPlans.forEach((plan, i) => {
    planNodes.push({
      plan,
      x: 190,
      y: 550 + i * 80, // 550, 630, 710, 790, 870
      w: CARD_W,
      h: CARD_H,
      side: "left",
      categoryKey: "Workspace Add-ons",
    });
  });

  // Gemini Enterprise (Top-Right) -> 5 plans
  const gePlans = grouped["Gemini Enterprise"] || [];
  gePlans.forEach((plan, i) => {
    planNodes.push({
      plan,
      x: 1410,
      y: 80 + i * 80, // 80, 160, 240, 320, 400
      w: CARD_W,
      h: CARD_H,
      side: "right",
      categoryKey: "Gemini Enterprise",
    });
  });

  // AI Add-ons (Bottom-Right) -> 5 plans
  const aiPlans = grouped["AI Add-ons"] || [];
  aiPlans.forEach((plan, i) => {
    planNodes.push({
      plan,
      x: 1410,
      y: 550 + i * 80, // 550, 630, 710, 790, 870
      w: CARD_W,
      h: CARD_H,
      side: "right",
      categoryKey: "AI Add-ons",
    });
  });

  return { planNodes, categoryNodes };
}

// ─── Status Pill Component ────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    yes: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
    limited: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
    higher_limits: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
    custom: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
    enterprise: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
    no: "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  };
  const labels: Record<string, string> = {
    yes: "Available",
    limited: "Limited Access",
    higher_limits: "Higher Limits",
    custom: "Custom Entitlement",
    enterprise: "Enterprise Core",
    no: "Not Included",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${styles[status] ?? styles.no}`}>
      {labels[status] ?? status}
    </span>
  );
}

// ─── Plan Side Drawer Component ───────────────────────────────────────────────
function PlanDrawer({
  plan,
  features,
  onClose,
}: {
  plan: Plan;
  features: Feature[];
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const style = CATEGORY_STYLES[plan.category] ?? CATEGORY_STYLES["Google Workspace"];

  const availableFeatures = useMemo(() => {
    return features.filter((f) => f.plans[plan.id as PlanId]?.available);
  }, [features, plan.id]);

  const featureCategories = useMemo(() => {
    const set = new Set(availableFeatures.map((f) => f.category));
    return Array.from(set).sort();
  }, [availableFeatures]);

  const filteredFeatures = useMemo(() => {
    return availableFeatures.filter((f) => {
      const matchesSearch =
        search === "" ||
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase());
      const matchesCat = activeCategory === "all" || f.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [availableFeatures, search, activeCategory]);

  const priceText = plan.annualPriceUSD
    ? `$${plan.annualPriceUSD}/user/mo`
    : plan.startingPriceUSD
    ? `From $${plan.startingPriceUSD}/seat/mo`
    : plan.id === "gemini-enterprise-payg"
    ? "$0 seat fee (PAYG)"
    : "Contact Sales";

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="relative z-10 flex h-full w-full max-w-[540px] flex-col border-l border-border bg-card shadow-2xl text-card-foreground"
        role="dialog"
        aria-label={`${plan.name} features and plan details`}
      >
        {/* Header */}
        <div
          className="relative shrink-0 border-b border-border p-6"
          style={{ background: style.fill }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style.badge}`}>
                  <CreditCard className="h-3 w-3" />
                  {plan.category}
                </span>
                {plan.type && (
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {plan.type}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {plan.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {plan.tagline}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0"
              aria-label="Close feature drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div className="rounded-xl border border-border/80 bg-background/80 p-2.5 backdrop-blur-sm">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Pricing
              </span>
              <span className="text-sm font-bold text-foreground truncate block" style={{ color: style.glow }}>
                {priceText}
              </span>
            </div>

            <div className="rounded-xl border border-border/80 bg-background/80 p-2.5 backdrop-blur-sm">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Storage
              </span>
              <span className="text-sm font-bold text-foreground truncate block">
                {plan.storage}
              </span>
            </div>

            <div className="rounded-xl border border-border/80 bg-background/80 p-2.5 backdrop-blur-sm col-span-2 sm:col-span-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                AI Features
              </span>
              <span className="text-sm font-bold text-foreground flex items-center gap-1">
                <Zap className="h-3.5 w-3.5" style={{ color: style.glow }} />
                {availableFeatures.length} included
              </span>
            </div>
          </div>
        </div>

        {/* Highlighted bullets */}
        {plan.highlightedFeatures?.length > 0 && (
          <div className="shrink-0 border-b border-border p-4 bg-muted/20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Key Entitlements
            </h3>
            <ul className="space-y-1.5">
              {plan.highlightedFeatures.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-foreground/90">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Feature search & category filter */}
        <div className="shrink-0 border-b border-border p-4 space-y-3 bg-background">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder={`Search ${availableFeatures.length} features on this plan...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-muted/40 pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors whitespace-nowrap ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All ({availableFeatures.length})
            </button>
            {featureCategories.map((cat) => {
              const count = availableFeatures.filter((f) => f.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredFeatures.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              No features match your search query.
            </div>
          ) : (
            filteredFeatures.map((feat) => {
              const avail = feat.plans[plan.id as PlanId];
              return (
                <Link
                  key={feat.id}
                  href={`/features/${feat.slug}`}
                  className="group block rounded-xl border border-border/60 bg-card p-3.5 transition-all hover:border-primary/40 hover:bg-muted/40 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          {feat.category}
                        </span>
                        {avail && <StatusBadge status={avail.status} />}
                      </div>
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {feat.name}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {feat.description}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="shrink-0 border-t border-border bg-muted/30 p-4 space-y-2">
          <Link
            href={`/plans/${plan.slug}`}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all shadow-md ${style.btn}`}
          >
            <span>View Complete {plan.name} Page</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          {plan.pricingUrl && (
            <a
              href={plan.pricingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <span>Google Official Pricing & Documentation</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </aside>
    </div>
  );
}

// ─── Main Plan Mind Map Component ─────────────────────────────────────────────
export function PlanMindMap({
  plans,
  features,
}: {
  plans: Plan[];
  features: Feature[];
}) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"mindmap" | "tree">("mindmap");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // SVG Pan & Zoom state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const { planNodes, categoryNodes } = useMemo(() => {
    return computeMindMapLayout(plans);
  }, [plans]);

  // Feature counts map
  const featureCountByPlan = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of plans) {
      map[p.id] = features.filter((f) => f.plans[p.id as PlanId]?.available).length;
    }
    return map;
  }, [plans, features]);

  // Reset viewport to fit container
  const resetViewport = useCallback(() => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    if (clientWidth === 0 || clientHeight === 0) return;

    const scaleX = clientWidth / CANVAS_WIDTH;
    const scaleY = clientHeight / CANVAS_HEIGHT;
    const fitScale = Math.min(scaleX, scaleY) * 0.94;

    const initialZoom = Math.max(0.45, Math.min(fitScale, 1.15));
    const initialPanX = (clientWidth - CANVAS_WIDTH * initialZoom) / 2;
    const initialPanY = (clientHeight - CANVAS_HEIGHT * initialZoom) / 2;

    setZoom(initialZoom);
    setPan({ x: initialPanX, y: initialPanY });
  }, []);

  useEffect(() => {
    resetViewport();
    window.addEventListener("resize", resetViewport);
    return () => window.removeEventListener("resize", resetViewport);
  }, [resetViewport]);

  // Pan interaction
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only drag when clicking background
    if ((e.target as Element).closest("[data-clickable]")) return;
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Zoom interaction
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    const zoomDelta = e.deltaY < 0 ? 1.1 : 0.91;
    setZoom((currZoom) => {
      const nextZoom = Math.max(0.35, Math.min(2.5, currZoom * zoomDelta));
      const factor = nextZoom / currZoom;
      setPan((p) => ({
        x: cursorX - (cursorX - p.x) * factor,
        y: cursorY - (cursorY - p.y) * factor,
      }));
      return nextZoom;
    });
  }, []);

  const adjustZoom = (deltaFactor: number) => {
    if (!containerRef.current) return;
    const cx = containerRef.current.clientWidth / 2;
    const cy = containerRef.current.clientHeight / 2;
    setZoom((currZoom) => {
      const nextZoom = Math.max(0.35, Math.min(2.5, currZoom * deltaFactor));
      const factor = nextZoom / currZoom;
      setPan((p) => ({
        x: cx - (cx - p.x) * factor,
        y: cy - (cy - p.y) * factor,
      }));
      return nextZoom;
    });
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Filter matching
  const isPlanHighlighted = (plan: Plan) => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesName = plan.name.toLowerCase().includes(query) || plan.shortName.toLowerCase().includes(query);
      const matchesHighlight = plan.highlightedFeatures.some((h) => h.toLowerCase().includes(query));
      return matchesName || matchesHighlight;
    }
    if (selectedCategory !== "all") {
      return plan.category === selectedCategory;
    }
    return true;
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col w-full bg-slate-50/70 dark:bg-slate-950/80 border border-border/80 rounded-3xl overflow-hidden shadow-xl transition-all ${
        isFullscreen ? "h-screen w-screen rounded-none border-0" : "h-[740px] sm:h-[780px]"
      }`}
    >
      {/* ── Toolbar ──────────────────────────────────────────────────────────── */}
      <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-border bg-card/90 backdrop-blur-md z-10">
        {/* Left: View Mode Toggle & Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View switcher */}
          <div className="inline-flex rounded-xl bg-muted p-1 border border-border">
            <button
              onClick={() => setViewMode("mindmap")}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "mindmap"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Network className="h-3.5 w-3.5" />
              <span>Mind Map</span>
            </button>
            <button
              onClick={() => setViewMode("tree")}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "tree"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Category Tree</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-border">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
                selectedCategory === "all"
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All Plans ({plans.length})
            </button>
            {CATEGORIES.map((cat) => {
              const style = CATEGORY_STYLES[cat];
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(isSelected ? "all" : cat)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all border ${
                    isSelected
                      ? `${style.badge} font-bold ring-2 ring-primary/40`
                      : "border-border/60 bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: style.glow }}
                  />
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Search & Canvas Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Filter Search */}
          <div className="relative w-36 sm:w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Find plan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-background/80 pl-8 pr-2.5 py-1 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Zoom & Canvas controls (only in mindmap mode) */}
          {viewMode === "mindmap" && (
            <div className="flex items-center gap-1 bg-muted/60 rounded-xl p-1 border border-border">
              <button
                onClick={() => adjustZoom(1.2)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-card hover:text-foreground transition-all"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => adjustZoom(0.83)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-card hover:text-foreground transition-all"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={resetViewport}
                className="p-1 rounded-lg text-muted-foreground hover:bg-card hover:text-foreground transition-all"
                title="Reset View"
                aria-label="Reset View"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-1 rounded-lg text-muted-foreground hover:bg-card hover:text-foreground transition-all hidden sm:flex"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                aria-label="Toggle Fullscreen"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Content View Area ────────────────────────────────────────────────── */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        {viewMode === "mindmap" ? (
          /* SVG Canvas */
          <svg
            ref={svgRef}
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            <defs>
              {/* Subtle background grid pattern */}
              <pattern
                id="mindmap-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
                patternTransform={`translate(${pan.x % 40},${pan.y % 40})`}
              >
                <circle cx="2" cy="2" r="1" className="fill-slate-300 dark:fill-slate-700/60" />
              </pattern>

              {/* Glowing filters per category */}
              {CATEGORIES.map((cat) => {
                const style = CATEGORY_STYLES[cat];
                const id = cat.replace(/\s+/g, "-").toLowerCase();
                return (
                  <filter key={cat} id={`glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor={style.glow} floodOpacity="0.4" />
                  </filter>
                );
              })}
            </defs>

            {/* Background grid */}
            <rect width="100%" height="100%" fill="url(#mindmap-grid)" />

            {/* Transformed Content Group */}
            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* 1. Connector Paths: Center to Category Nodes */}
              {categoryNodes.map((catNode) => {
                const style = CATEGORY_STYLES[catNode.key];
                const isSelected = selectedCategory === "all" || selectedCategory === catNode.key;
                const isHovered = hoveredNodeId === catNode.key;

                // Center node anchor point
                const startX = catNode.side === "left" ? CENTER_NODE.x - CENTER_NODE.w / 2 : CENTER_NODE.x + CENTER_NODE.w / 2;
                const startY = CENTER_NODE.y;

                // Category node anchor point
                const endX = catNode.side === "left" ? catNode.x + catNode.w / 2 : catNode.x - catNode.w / 2;
                const endY = catNode.y;

                // Smooth S-Curve
                const midX = (startX + endX) / 2;
                const pathD = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;

                return (
                  <path
                    key={`c-cat-${catNode.key}`}
                    d={pathD}
                    fill="none"
                    stroke={style.glow}
                    strokeWidth={isHovered ? 3.5 : isSelected ? 2.5 : 1.5}
                    strokeOpacity={isHovered ? 0.9 : isSelected ? 0.6 : 0.2}
                    strokeDasharray={isSelected ? "none" : "6,6"}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* 2. Connector Paths: Category Nodes to Plan Nodes */}
              {planNodes.map((pNode) => {
                const catNode = CATEGORY_POSITIONS[pNode.categoryKey];
                const style = CATEGORY_STYLES[pNode.categoryKey];
                const isHighlighted = isPlanHighlighted(pNode.plan);
                const isHovered = hoveredNodeId === pNode.plan.id || hoveredNodeId === pNode.categoryKey;
                const isSelected = selectedPlan?.id === pNode.plan.id;

                // Category anchor point
                const startX = catNode.side === "left" ? catNode.x - catNode.w / 2 : catNode.x + catNode.w / 2;
                const startY = catNode.y;

                // Plan anchor point
                const endX = pNode.side === "left" ? pNode.x + pNode.w / 2 : pNode.x - pNode.w / 2;
                const endY = pNode.y;

                // Smooth S-Curve
                const midX = (startX + endX) / 2;
                const pathD = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;

                return (
                  <path
                    key={`c-plan-${pNode.plan.id}`}
                    d={pathD}
                    fill="none"
                    stroke={style.glow}
                    strokeWidth={isSelected ? 3.5 : isHovered ? 2.5 : isHighlighted ? 1.8 : 1}
                    strokeOpacity={isSelected ? 1 : isHovered ? 0.8 : isHighlighted ? 0.5 : 0.15}
                    className="transition-all duration-200"
                  />
                );
              })}

              {/* 3. Central Root Node */}
              <g
                transform={`translate(${CENTER_NODE.x - CENTER_NODE.w / 2}, ${CENTER_NODE.y - CENTER_NODE.h / 2})`}
                className="cursor-default"
              >
                {/* Halo */}
                <rect
                  width={CENTER_NODE.w}
                  height={CENTER_NODE.h}
                  rx="24"
                  className="fill-blue-500/10 dark:fill-blue-400/10 stroke-primary/30"
                  strokeWidth="2"
                />
                {/* Node Box */}
                <rect
                  x="4"
                  y="4"
                  width={CENTER_NODE.w - 8}
                  height={CENTER_NODE.h - 8}
                  rx="20"
                  className="fill-card stroke-primary/60 dark:stroke-primary/40 shadow-xl"
                  strokeWidth="2"
                />
                <text
                  x={CENTER_NODE.w / 2}
                  y={CENTER_NODE.h / 2 - 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground font-extrabold text-[15px]"
                  style={{ fontFamily: "var(--font-sans), system-ui" }}
                >
                  Google Workspace & Gemini
                </text>
                <text
                  x={CENTER_NODE.w / 2}
                  y={CENTER_NODE.h / 2 + 13}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-primary font-bold text-[11px] tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-sans), system-ui" }}
                >
                  20 Enterprise Plans Catalog
                </text>
              </g>

              {/* 4. Category Nodes (The 4 Main Branches) */}
              {categoryNodes.map((catNode) => {
                const style = CATEGORY_STYLES[catNode.key];
                const isSelected = selectedCategory === "all" || selectedCategory === catNode.key;
                const isHovered = hoveredNodeId === catNode.key;
                const IconComponent = style.icon;

                return (
                  <g
                    key={catNode.key}
                    data-clickable="true"
                    transform={`translate(${catNode.x - catNode.w / 2}, ${catNode.y - catNode.h / 2})`}
                    onClick={() => setSelectedCategory(selectedCategory === catNode.key ? "all" : catNode.key)}
                    onMouseEnter={() => setHoveredNodeId(catNode.key)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className="cursor-pointer transition-transform duration-200"
                    filter={isHovered ? `url(#glow-${catNode.key.replace(/\s+/g, "-").toLowerCase()})` : undefined}
                  >
                    <rect
                      width={catNode.w}
                      height={catNode.h}
                      rx="16"
                      fill={isHovered ? style.glow : "var(--card)"}
                      stroke={style.glow}
                      strokeWidth={isHovered ? 2.5 : isSelected ? 2 : 1}
                      strokeOpacity={isSelected ? 0.9 : 0.4}
                      className="transition-colors duration-200"
                    />
                    <text
                      x={catNode.w / 2}
                      y={catNode.h / 2 - 4}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isHovered ? "#ffffff" : "var(--foreground)"}
                      fontSize="13"
                      fontWeight="700"
                      className="transition-colors duration-200"
                      style={{ fontFamily: "var(--font-sans), system-ui" }}
                    >
                      {catNode.key}
                    </text>
                    <text
                      x={catNode.w / 2}
                      y={catNode.h / 2 + 12}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isHovered ? "rgba(255,255,255,0.85)" : style.glow}
                      fontSize="9.5"
                      fontWeight="600"
                      className="transition-colors duration-200 uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-sans), system-ui" }}
                    >
                      5 Plan Options
                    </text>
                  </g>
                );
              })}

              {/* 5. Plan Nodes (Leaf Cards) */}
              {planNodes.map((pNode) => {
                const plan = pNode.plan;
                const isSelected = selectedPlan?.id === plan.id;
                const isHovered = hoveredNodeId === plan.id;
                const isHighlighted = isPlanHighlighted(plan);
                const style = CATEGORY_STYLES[plan.category];
                const catId = plan.category.replace(/\s+/g, "-").toLowerCase();
                const featureCount = featureCountByPlan[plan.id] ?? 0;

                const priceStr = plan.annualPriceUSD
                  ? `$${plan.annualPriceUSD}/mo`
                  : plan.startingPriceUSD
                  ? `From $${plan.startingPriceUSD}`
                  : plan.id === "gemini-enterprise-payg"
                  ? "PAYG $0"
                  : "Contact";

                return (
                  <g
                    key={plan.id}
                    data-clickable="true"
                    transform={`translate(${pNode.x - pNode.w / 2}, ${pNode.y - pNode.h / 2})`}
                    onClick={() => setSelectedPlan(plan)}
                    onMouseEnter={() => setHoveredNodeId(plan.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className="cursor-pointer transition-all duration-200"
                    filter={isSelected || isHovered ? `url(#glow-${catId})` : undefined}
                    opacity={isHighlighted ? 1 : 0.35}
                  >
                    {/* Background shadow/card */}
                    <rect
                      width={pNode.w}
                      height={pNode.h}
                      rx="14"
                      fill={isSelected ? style.glow : "var(--card)"}
                      stroke={style.glow}
                      strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                      strokeOpacity={isSelected ? 1 : isHovered ? 0.9 : 0.4}
                      className="transition-all duration-200"
                    />

                    {/* Plan Short Name */}
                    <text
                      x="14"
                      y={pNode.h / 2 - 8}
                      dominantBaseline="middle"
                      fill={isSelected ? "#ffffff" : "var(--foreground)"}
                      fontSize="12.5"
                      fontWeight="700"
                      className="transition-colors duration-200"
                      style={{ fontFamily: "var(--font-sans), system-ui" }}
                    >
                      {plan.name.length > 22 ? plan.name.slice(0, 21) + "…" : plan.name}
                    </text>

                    {/* Subtitle Line: Price + Feature Count */}
                    <text
                      x="14"
                      y={pNode.h / 2 + 11}
                      dominantBaseline="middle"
                      fill={isSelected ? "rgba(255,255,255,0.85)" : "var(--muted-foreground)"}
                      fontSize="10"
                      fontWeight="500"
                      style={{ fontFamily: "var(--font-sans), system-ui" }}
                    >
                      <tspan fontWeight="700" fill={isSelected ? "#ffffff" : style.glow}>
                        {priceStr}
                      </tspan>
                      <tspan dx="8">·</tspan>
                      <tspan dx="8">{featureCount} features</tspan>
                    </text>

                    {/* Right click arrow indicator */}
                    <g transform={`translate(${pNode.w - 24}, ${pNode.h / 2 - 7})`}>
                      <circle
                        cx="7"
                        cy="7"
                        r="8"
                        fill={isSelected ? "rgba(255,255,255,0.2)" : style.fill}
                      />
                      <path
                        d="M 5 4 L 9 7 L 5 10"
                        fill="none"
                        stroke={isSelected ? "#ffffff" : style.glow}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>
        ) : (
          /* ── Hierarchical Tree List Mode ──────────────────────────────────── */
          <div className="h-full overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="max-w-5xl mx-auto space-y-6">
              {CATEGORIES.map((cat) => {
                if (selectedCategory !== "all" && selectedCategory !== cat) return null;
                const catPlans = plans.filter((p) => p.category === cat);
                const style = CATEGORY_STYLES[cat];

                return (
                  <div
                    key={cat}
                    className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ background: style.glow }}
                          />
                          <h3 className="text-lg font-bold text-foreground">
                            {cat}
                          </h3>
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${style.badge}`}>
                            {catPlans.length} Plans
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {style.description}
                        </p>
                      </div>
                    </div>

                    {/* Plans Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {catPlans.map((plan) => {
                        const count = featureCountByPlan[plan.id] ?? 0;
                        const price = plan.annualPriceUSD
                          ? `$${plan.annualPriceUSD}/user/mo`
                          : plan.startingPriceUSD
                          ? `From $${plan.startingPriceUSD}/seat/mo`
                          : plan.id === "gemini-enterprise-payg"
                          ? "$0 fee"
                          : "Sales";

                        return (
                          <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan)}
                            className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-background/80 p-4 transition-all hover:border-primary hover:shadow-md cursor-pointer"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                  {plan.name}
                                </h4>
                                <span className="text-xs font-extrabold" style={{ color: style.glow }}>
                                  {price}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                                {plan.tagline}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
                              <span>{plan.storage}</span>
                              <span className="font-semibold text-foreground flex items-center gap-1 group-hover:text-primary">
                                <Zap className="h-3 w-3" style={{ color: style.glow }} />
                                {count} Features
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Canvas Helpful Hint Pill (Only in Mind Map mode) */}
        {viewMode === "mindmap" && !selectedPlan && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/90 border border-border shadow-md backdrop-blur-md text-[11px] text-muted-foreground whitespace-nowrap">
              <MousePointer2 className="h-3 w-3 text-primary animate-pulse" />
              <span>Click any plan node to inspect features</span>
              <span className="opacity-40">·</span>
              <span>Scroll to zoom</span>
              <span className="opacity-40">·</span>
              <span>Drag to pan</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Slide-out Feature Drawer ─────────────────────────────────────────── */}
      {selectedPlan && (
        <PlanDrawer
          plan={selectedPlan}
          features={features}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}
