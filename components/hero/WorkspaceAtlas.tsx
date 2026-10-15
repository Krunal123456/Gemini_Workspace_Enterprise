"use client";

import { useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";
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
import { useReducedMotion } from "framer-motion";
import { useLocale } from "@/lib/i18n/locale-context";
import { useLocalizedData } from "@/lib/i18n/use-localized-data";
import type { Application, Connector, SecurityLayer } from "@/types";
import styles from "./WorkspaceAtlas.module.css";

type AtlasKind = "Workspace app" | "Connector" | "Governance";
type CatalogSource = "app" | "connector" | "security";

type AtlasNode = {
  id: string;
  name: string;
  kind: AtlasKind;
  kindLabel: string;
  description: string;
  href: string;
  icon: LucideIcon;
  source: CatalogSource;
  left: number;
  top: number;
  depth: number;
};

const NODE_LAYOUT: Array<Omit<AtlasNode, "name" | "kind" | "kindLabel" | "description" | "href">> = [
  { id: "gmail", source: "app", icon: Mail, left: 50, top: 7, depth: 22 },
  { id: "drive", source: "app", icon: HardDrive, left: 82, top: 22, depth: 6 },
  { id: "sheets", source: "app", icon: Sheet, left: 85, top: 52, depth: 18 },
  { id: "salesforce", source: "connector", icon: BriefcaseBusiness, left: 82, top: 80, depth: 8 },
  { id: "jira", source: "connector", icon: Bug, left: 50, top: 93, depth: 20 },
  { id: "bigquery", source: "connector", icon: Database, left: 18, top: 80, depth: 7 },
  { id: "ai-safety", source: "security", icon: ShieldCheck, left: 15, top: 52, depth: 18 },
  { id: "data-protection", source: "security", icon: Fingerprint, left: 18, top: 22, depth: 9 },
];

function getAtlasNode(
  layout: (typeof NODE_LAYOUT)[number],
  data: { applications: Application[]; connectors: Connector[]; securityLayers: SecurityLayer[] },
  href: (path: string) => string,
  tp: (text: string) => string,
): AtlasNode | null {
  if (layout.source === "app") {
    const app = data.applications.find((item) => item.id === layout.id);
    if (!app) return null;
    return {
      ...layout,
      name: app.shortName || app.name,
      kind: "Workspace app",
      kindLabel: tp("Workspace app"),
      description: app.tagline,
      href: href(`/apps/${app.slug}`),
    };
  }

  if (layout.source === "connector") {
    const connector = data.connectors.find((item) => item.id === layout.id);
    if (!connector) return null;
    return {
      ...layout,
      name: connector.id === "bigquery" ? "BigQuery" : connector.id === "salesforce" ? "Salesforce" : "Jira",
      kind: "Connector",
      kindLabel: tp("Connector"),
      description: connector.description,
      href: href(`/enterprise/connectors/${connector.id}`),
    };
  }

  const layer = data.securityLayers.find((item) => item.id === layout.id);
  if (!layer) return null;
  return {
    ...layout,
    name: layer.id === "ai-safety" ? "Model Armor" : layer.id === "data-protection" ? (layer.name || "Data protection") : layer.name,
    kind: "Governance",
    kindLabel: tp("Governance"),
    description: layer.tagline,
    href: href("/security"),
  };
}

const KIND_CLASS: Record<AtlasKind, string> = {
  "Workspace app": styles.workspaceNode,
  Connector: styles.connectorNode,
  Governance: styles.governanceNode,
};

export function WorkspaceAtlas() {
  const { applications, connectors, securityLayers } = useLocalizedData();
  const { href, tp } = useLocale();

  const atlasNodes = useMemo(
    () =>
      NODE_LAYOUT.map((layout) =>
        getAtlasNode(layout, { applications, connectors, securityLayers }, href, tp),
      ).filter((node): node is AtlasNode => node !== null),
    [applications, connectors, securityLayers, href, tp],
  );

  const defaultNode = atlasNodes.find((node) => node.id === "drive") ?? atlasNodes[0];
  const [activeNodeId, setActiveNodeId] = useState(defaultNode?.id ?? "");
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const activeNode = atlasNodes.find((node) => node.id === activeNodeId) ?? defaultNode;

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
          <p className={styles.eyebrow}>{tp("Workspace intelligence atlas")}</p>
          <p className={styles.headingText}>{tp("One governed ecosystem")}</p>
        </div>
        <span className={styles.liveLabel}><span />{tp("Select a node")}</span>
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
          {atlasNodes.map((node) => (
            <line
              key={node.id}
              x1="50"
              y1="50"
              x2={node.left}
              y2={node.top}
              className={`${styles.connection} ${node.source === "app" ? styles.appConnection : node.source === "connector" ? styles.connectorConnection : styles.governanceConnection} ${node.id === activeNode.id ? styles.activeConnection : ""}`}
            />
          ))}
          {/* Data-flow packets — animated circles that travel along each connector toward the Gemini core */}
          {!reduceMotion && atlasNodes.slice(0, 4).map((node, index) => {
            const packetColor =
              node.source === "app" ? "#4285F4" :
              node.source === "connector" ? "#34A853" :
              "#A78BFA";
            const dur = `${3.6 + (index * 0.6)}s`;
            const delay = `${-(index * 1.1)}s`;
            return (
              <circle
                key={`pkt-${node.id}`}
                r="0.9"
                fill={packetColor}
                opacity="0.8"
              >
                <animateMotion
                  dur={dur}
                  begin={delay}
                  repeatCount="indefinite"
                  path={`M ${node.left} ${node.top} L 50 50`}
                />
                <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.1;0.85;1" dur={dur} begin={delay} repeatCount="indefinite" />
              </circle>
            );
          })}
        </svg>

        <div className={styles.core} aria-hidden="true">
          <div className={styles.coreAura} />
          <div className={styles.coreGlass}><Sparkles /></div>
          <span className={styles.coreName}>Gemini</span>
          <span className={styles.coreCaption}>{tp("context layer")}</span>
        </div>

        {atlasNodes.map((node, index) => {
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
              aria-label={`${node.name}, ${node.kindLabel}. ${isActive ? "Selected" : "Select"}`}
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
        <span><i className={styles.connectorKey} />{tp("Connectors")}</span>
        <span><i className={styles.governanceKey} />{tp("Governance")}</span>
      </div>

      <div className={styles.detailCard} aria-live="polite" aria-atomic="true">
        <div className={`${styles.detailIcon} ${KIND_CLASS[activeNode.kind]}`}>
          <activeNode.icon aria-hidden="true" />
        </div>
        <div className={styles.detailCopy}>
          <span>{activeNode.kindLabel}</span>
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
