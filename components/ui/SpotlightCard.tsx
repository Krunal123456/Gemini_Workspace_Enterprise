"use client";

import React, { useRef, useState, useCallback, type MouseEvent } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderGlowColor?: string;
  enableTilt?: boolean;
  enableBorderBeam?: boolean;
}

/**
 * Ultra-premium card component featuring:
 * 1. Cursor-tracking radial spotlight glow
 * 2. Subtle spring-loaded 3D tilt physics
 * 3. Sweeping specular gradient border beam
 * 4. Frosted acrylic glassmorphism
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(167, 139, 250, 0.14)",
  borderGlowColor = "rgba(147, 197, 253, 0.3)",
  enableTilt = false,
  enableBorderBeam = false,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState<{ rotateX: number; rotateY: number }>({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCoords({ x, y });

      if (enableTilt && !reduceMotion) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;
        setTilt({ rotateX, rotateY });
      }
    },
    [enableTilt, reduceMotion],
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered && enableTilt && !reduceMotion ? tilt.rotateX : 0,
        rotateY: isHovered && enableTilt && !reduceMotion ? tilt.rotateY : 0,
        transformPerspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-slate-950/60 dark:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)]",
        "hover:shadow-[0_30px_70px_-20px_rgba(99,102,241,0.18)] dark:hover:shadow-[0_30px_80px_-20px_rgba(139,92,246,0.22)]",
        "hover:border-slate-300 dark:hover:border-white/20",
        className,
      )}
      {...props}
    >
      {/* Specular Radial Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle Specular Border Highlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, ${borderGlowColor}, transparent 80%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
        aria-hidden="true"
      />

      {/* Animated Perimeter Border Beam */}
      {enableBorderBeam && (
        <div
          className="pointer-events-none absolute -inset-px overflow-hidden rounded-2xl"
          aria-hidden="true"
        >
          <div className="absolute -inset-[100%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(168,85,247,0.7)_360deg)] opacity-40" />
        </div>
      )}

      {/* Internal Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
