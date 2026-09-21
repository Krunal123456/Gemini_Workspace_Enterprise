"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  FileText,
  Table,
  Video,
  Presentation,
  HardDrive,
  BookOpen,
  MessageSquare,
  Clapperboard,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppNode {
  id: string;
  name: string;
  color: string;
  icon: React.ElementType;
  angle: number;
  features: string[];
}

const APP_NODES: AppNode[] = [
  { id: "gmail", name: "Gmail", color: "#EA4335", icon: Mail, angle: -90, features: ["Help me write", "Smart reply & summarize"] },
  { id: "docs", name: "Docs", color: "#34A853", icon: FileText, angle: -50, features: ["Generate text & refine", "Rewrite & proofread"] },
  { id: "sheets", name: "Sheets", color: "#109D59", icon: Table, angle: -10, features: ["Help me organize", "Formula generation"] },
  { id: "meet", name: "Meet", color: "#4285F4", icon: Video, angle: 30, features: ["Take notes for me", "Real-time translation"] },
  { id: "slides", name: "Slides", color: "#FBBC04", icon: Presentation, angle: 70, features: ["Generate images", "Presentation structure"] },
  { id: "drive", name: "Drive", color: "#4285F4", icon: HardDrive, angle: 110, features: ["Summarize documents", "Semantic search"] },
  { id: "notebooklm", name: "NotebookLM", color: "#7C3AED", icon: BookOpen, angle: 150, features: ["Audio Overviews", "Source grounding"] },
  { id: "chat", name: "Chat", color: "#34A853", icon: MessageSquare, angle: 190, features: ["Summarize threads", "Smart compose"] },
  { id: "vids", name: "Vids", color: "#4F46E5", icon: Clapperboard, angle: 230, features: ["Generate storyboards", "Video scripts"] },
];

export function GeminiNodeVisualizer({ className }: { className?: string }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [radius, setRadius] = useState(180);

  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth < 640 ? 120 : window.innerWidth < 1024 ? 150 : 180);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={cn("relative flex items-center justify-center min-h-[360px] sm:min-h-[460px] w-full", className)}>
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-64 h-64 sm:w-96 sm:h-96 bg-gemini-purple/20 rounded-full blur-[80px] sm:blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-[500px] aspect-square flex items-center justify-center">
        {/* Core Gemini Node */}
        <motion.div
          className="absolute z-20 flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-[#1B0165] to-[#4F46E5] rounded-full shadow-[0_0_40px_rgba(79,70,229,0.5)] border border-white/10"
          animate={{
            boxShadow: [
              "0 0 40px rgba(79,70,229,0.5)",
              "0 0 80px rgba(79,70,229,0.8)",
              "0 0 40px rgba(79,70,229,0.5)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-blue-200" />
        </motion.div>

        {/* Satellite Nodes */}
        {APP_NODES.map((node) => {
          const angleRad = (node.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;
          const isHovered = hoveredNode === node.id;
          const isDimmed = hoveredNode !== null && hoveredNode !== node.id;

          return (
            <React.Fragment key={node.id}>
              {/* Connecting Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                <line
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${x}px)`}
                  y2={`calc(50% + ${y}px)`}
                  stroke={isHovered ? node.color : "currentColor"}
                  strokeWidth={isHovered ? 2 : 1}
                  className={cn(
                    "transition-all duration-300",
                    isHovered ? "opacity-100" : isDimmed ? "opacity-10" : "opacity-20 text-muted-foreground"
                  )}
                  strokeDasharray="4 4"
                />
                {isHovered && (
                  <motion.circle
                    r="3"
                    fill={node.color}
                    initial={{ cx: "50%", cy: "50%", opacity: 0 }}
                    animate={{
                      cx: `calc(50% + ${x}px)`,
                      cy: `calc(50% + ${y}px)`,
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </svg>

              {/* Node Icon */}
              <motion.div
                className={cn(
                  "absolute z-30 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 backdrop-blur-md border cursor-pointer transition-all duration-300",
                  isHovered ? "scale-110 shadow-lg border-transparent" : isDimmed ? "opacity-40 scale-95 border-border" : "border-border/60 hover:border-muted-foreground"
                )}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  ...(isHovered ? { borderColor: node.color, boxShadow: `0 0 20px ${node.color}40` } : {}),
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                whileHover={{ scale: 1.15 }}
              >
                <node.icon
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  style={{ color: isHovered ? node.color : "currentColor" }}
                />

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 w-48 sm:w-56 p-3 rounded-xl bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl z-50 pointer-events-none left-1/2 -translate-x-1/2"
                    >
                      <div className="font-semibold text-sm mb-2 flex items-center gap-2" style={{ color: node.color }}>
                        <node.icon className="w-4 h-4" />
                        {node.name}
                      </div>
                      <ul className="space-y-1.5">
                        {node.features.map((feature, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <Sparkles className="w-3 h-3 mt-0.5 opacity-70" style={{ color: node.color }} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
