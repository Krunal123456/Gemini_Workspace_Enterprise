"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Bug,
  Database,
  Fingerprint,
  HardDrive,
  Mail,
  ShieldCheck,
  Sheet,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { applications } from "@/data/apps";
import { connectors } from "@/data/connectors";
import { securityLayers } from "@/data/security";
import { useReducedMotion } from "framer-motion";
import styles from "./WorkspaceAtlas.module.css";

type AtlasKind = "Workspace app" | "Connector" | "Governance";
type CatalogSource = "app" | "connector" | "security";

type AtlasNode = {
  id: string;
  name: string;
  kind: AtlasKind;
  description: string;
  href: string;
  icon: LucideIcon;
  source: CatalogSource;
  left: number;
  top: number;
  depth: number;
};

const NODE_LAYOUT: Array<Omit<AtlasNode, "name" | "kind" | "description" | "href">> = [
  { id: "gmail", source: "app", icon: Mail, left: 50, top: 7, depth: 22 },
  { id: "drive", source: "app", icon: HardDrive, left: 82, top: 22, depth: 6 },
  { id: "sheets", source: "app", icon: Sheet, left: 85, top: 52, depth: 18 },
  { id: "salesforce", source: "connector", icon: BriefcaseBusiness, left: 82, top: 80, depth: 8 },
  { id: "jira", source: "connector", icon: Bug, left: 50, top: 93, depth: 20 },
  { id: "bigquery", source: "connector", icon: Database, left: 18, top: 80, depth: 7 },
  { id: "layer-4-ai", source: "security", icon: ShieldCheck, left: 15, top: 52, depth: 18 },
  { id: "layer-3-data", source: "security", icon: Fingerprint, left: 18, top: 22, depth: 9 },
];

function getAtlasNode(layout: (typeof NODE_LAYOUT)[number]): AtlasNode | null {
  if (layout.source === "app") {
    const app = applications.find((item) => item.id === layout.id);
    if (!app) return null;
    return {
      ...layout,
      name: app.shortName,
      kind: "Workspace app",
      description: app.tagline,
      href: `/apps/${app.slug}`,
    };
  }

  if (layout.source === "connector") {
    const connector = connectors.find((item) => item.id === layout.id);
    if (!connector) return null;
    return {
      ...layout,
      name: connector.id === "bigquery" ? "BigQuery" : connector.id === "salesforce" ? "Salesforce" : "Jira",
      kind: "Connector",
      description: connector.description,
      href: `/enterprise/connectors/${connector.id}`,
    };
  }

  const layer = securityLayers.find((item) => item.id === layout.id);
  if (!layer) return null;
  return {
    ...layout,
    name: layer.id === "layer-4-ai" ? "Model Armor" : "Data protection",
    kind: "Governance",
    description: layer.tagline,
    href: "/security",
  };
}

const ATLAS_NODES = NODE_LAYOUT.map(getAtlasNode).filter((node): node is AtlasNode => node !== null);
const DEFAULT_NODE = ATLAS_NODES.find((node) => node.id === "drive") ?? ATLAS_NODES[0];

const KIND_CLASS: Record<AtlasKind, string> = {
  "Workspace app": styles.workspaceNode,
  Connector: styles.connectorNode,
  Governance: styles.governanceNode,
};

export function WorkspaceAtlas() {
  const [activeNodeId, setActiveNodeId] = useState(DEFAULT_NODE?.id ?? "");
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const activeNode = ATLAS_NODES.find((node) => node.id === activeNodeId) ?? DEFAULT_NODE;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse" || !sceneRef.current) return;
    const bounds = sceneRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    sceneRef.current.style.setProperty("--atlas-shift-x", `${x * -10}px`);
    sceneRef.current.style.setProperty("--atlas-shift-y", `${y * -8}px`);
  };

  const handlePointerLeave = () => {
    sceneRef.current?.style.setProperty("--atlas-shift-x", "0px");
    sceneRef.current?.style.setProperty("--atlas-shift-y", "0px");
  };

  if (!activeNode) return null;

  return (
    <section className={styles.atlas} aria-label="Workspace ecosystem map">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Workspace intelligence atlas</p>
          <p className={styles.headingText}>One governed ecosystem</p>
        </div>
        <span className={styles.liveLabel}><span />Select a node</span>
      </div>

      <div
        ref={sceneRef}
        className={styles.scene}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        role="group"
        aria-label="Select a Workspace app, connector, or governance layer"
      >
        <div className={`${styles.orbit} ${styles.outerOrbit}`} aria-hidden="true" />
        <div className={`${styles.orbit} ${styles.innerOrbit}`} aria-hidden="true" />
        <div className={styles.atmosphere} aria-hidden="true" />
        <svg className={styles.connections} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {ATLAS_NODES.map((node) => (
            <line
              key={node.id}
              x1="50"
              y1="50"
              x2={node.left}
              y2={node.top}
              className={`${styles.connection} ${node.source === "app" ? styles.appConnection : node.source === "connector" ? styles.connectorConnection : styles.governanceConnection} ${node.id === activeNode.id ? styles.activeConnection : ""}`}
            />
          ))}
        </svg>

        <div className={styles.core} aria-hidden="true">
          <div className={styles.coreAura} />
          <div className={styles.coreGlass}><Sparkles /></div>
          <span className={styles.coreName}>Gemini</span>
          <span className={styles.coreCaption}>context layer</span>
        </div>

        {ATLAS_NODES.map((node, index) => {
          const Icon = node.icon;
          const isActive = node.id === activeNode.id;
          const nodeStyle = {
            left: `${node.left}%`,
            top: `${node.top}%`,
            "--node-depth": `${node.depth}px`,
            "--assembly-delay": `${index * 75}ms`,
            "--scatter-x": node.left < 50 ? "-16px" : node.left > 50 ? "16px" : "0px",
            "--scatter-y": node.top < 50 ? "-13px" : node.top > 50 ? "13px" : "0px",
          } as CSSProperties;

          return (
            <button
              key={node.id}
              type="button"
              style={nodeStyle}
              className={`${styles.node} ${KIND_CLASS[node.kind]} ${isActive ? styles.activeNode : ""}`}
              onClick={() => setActiveNodeId(node.id)}
              aria-pressed={isActive}
              aria-label={`${node.name}, ${node.kind}. ${isActive ? "Selected" : "Select"}`}
            >
              <Icon aria-hidden="true" />
              <span>{node.name}</span>
              <span className={styles.nodeSignal} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className={styles.legend} aria-label="Map categories">
        <span><i className={styles.appKey} />Workspace</span>
        <span><i className={styles.connectorKey} />Connectors</span>
        <span><i className={styles.governanceKey} />Governance</span>
      </div>

      <div className={styles.detailCard} aria-live="polite" aria-atomic="true">
        <div className={`${styles.detailIcon} ${KIND_CLASS[activeNode.kind]}`}>
          <activeNode.icon aria-hidden="true" />
        </div>
        <div className={styles.detailCopy}>
          <span>{activeNode.kind}</span>
          <h3>{activeNode.name}</h3>
          <p>{activeNode.description}</p>
        </div>
        <Link href={activeNode.href} className={styles.detailLink} aria-label={`Explore ${activeNode.name}`}>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
