"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  colorLight: string;
  colorDark: string;
  pulseSpeed: number;
  pulsePhase: number;
}

const PALETTE = [
  { light: "rgb(26, 115, 232)", dark: "rgb(66, 133, 244)" },    // Google Blue
  { light: "rgb(124, 58, 237)", dark: "rgb(167, 139, 250)" },   // Gemini Violet
  { light: "rgb(19, 115, 51)", dark: "rgb(52, 168, 83)" },      // Google Green
  { light: "rgb(217, 119, 6)", dark: "rgb(251, 188, 5)" },      // Amber
  { light: "rgb(147, 51, 234)", dark: "rgb(196, 181, 253)" },   // Purple
];

export function CinematicMotionBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: isMobile ? 100 : 160,
    };

    const count = isMobile ? 26 : Math.min(54, Math.max(32, Math.floor((width * height) / 26000)));
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const pColor = PALETTE[i % PALETTE.length];
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.45),
        vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.45),
        size: Math.random() * 1.8 + 1.2,
        colorLight: pColor.light,
        colorDark: pColor.dark,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const maxDistance = isMobile ? 90 : 135;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        if (!prefersReducedMotion) {
          p1.pulsePhase += p1.pulseSpeed;

          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p1.vx += Math.cos(angle) * force * 0.55;
            p1.vy += Math.sin(angle) * force * 0.55;
          }

          p1.vx *= 0.96;
          p1.vy *= 0.96;
          p1.x += p1.vx;
          p1.y += p1.vy;

          if (p1.x < -20) p1.x = width + 20;
          if (p1.x > width + 20) p1.x = -20;
          if (p1.y < -20) p1.y = height + 20;
          if (p1.y > height + 20) p1.y = -20;
        }

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < maxDistance) {
            const ratio = 1 - dist / maxDistance;
            const lineAlpha = isDark ? ratio * 0.22 : ratio * 0.16;
            ctx.beginPath();
            ctx.strokeStyle = isDark
              ? `rgba(167, 139, 250, ${lineAlpha})`
              : `rgba(99, 102, 241, ${lineAlpha})`;
            ctx.lineWidth = isDark ? 0.8 : 0.9;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw particle node
        const currentAlpha = 0.5 + 0.3 * Math.sin(p1.pulsePhase);
        const color = isDark ? p1.colorDark : p1.colorLight;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = color.replace("rgb", "rgba").replace(")", `, ${currentAlpha})`);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Light Mode: Iridescent Luminous Glows / Dark Mode: Deep Galactic Aurora */}
      <div className="absolute -top-[25%] left-[25%] h-[48rem] w-[54rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-400/12 via-indigo-400/8 to-transparent dark:from-violet-600/20 dark:via-indigo-600/15 blur-[150px] animate-pulse [animation-duration:12s]" />
      <div className="absolute -left-[10%] top-[25%] h-[36rem] w-[36rem] rounded-full bg-gradient-to-tr from-sky-400/10 via-blue-400/8 to-transparent dark:from-blue-600/15 dark:via-sky-500/10 blur-[140px] animate-pulse [animation-duration:15s]" />
      <div className="absolute -right-[15%] top-[15%] h-[42rem] w-[42rem] rounded-full bg-gradient-to-bl from-purple-400/10 via-pink-400/8 to-transparent dark:from-purple-700/15 dark:via-fuchsia-600/10 blur-[150px] animate-pulse [animation-duration:18s]" />
      <div className="absolute bottom-[-10%] right-[20%] h-[32rem] w-[32rem] rounded-full bg-gradient-to-tl from-emerald-400/10 via-teal-400/6 to-transparent dark:from-emerald-600/12 dark:via-teal-500/8 blur-[130px]" />

      {/* Grid: Dark in light mode, Light in dark mode */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.055]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 80%)",
        }}
      />

      {/* Interactive Neural Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-85" />
    </div>
  );
}
