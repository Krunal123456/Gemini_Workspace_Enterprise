"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; radius: number; color: string };

const COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#A78BFA"];

export function SynapseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = canvas?.parentElement;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !stage || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const pointer = { x: -2000, y: -2000 };
    const particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frameId = 0;
    let isInView = false;
    let previousScroll = window.scrollY;
    let scrollVelocity = 0;

    const resize = () => {
      const bounds = stage.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = coarsePointer.matches ? 18 : Math.min(54, Math.max(28, Math.round(width / 24)));
      particles.length = 0;
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.16,
          radius: 0.8 + Math.random() * 1.5,
          color: COLORS[index % COLORS.length],
        });
      }
      draw(false);
    };

    const draw = (animate: boolean) => {
      context.clearRect(0, 0, width, height);
      const connectionRadius = coarsePointer.matches ? 100 : 145;

      particles.forEach((particle, index) => {
        if (animate && !coarsePointer.matches) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < 120) {
            const force = ((120 - distance) / 120) * 0.09;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
          particle.vx += Math.max(-0.06, Math.min(0.06, scrollVelocity * 0.000035));
          particle.vx *= 0.992;
          particle.vy *= 0.992;
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < -8) particle.x = width + 8;
          if (particle.x > width + 8) particle.x = -8;
          if (particle.y < -8) particle.y = height + 8;
          if (particle.y > height + 8) particle.y = -8;
        }

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next];
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (distance < connectionRadius) {
            const proximity = 1 - distance / connectionRadius;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(182, 165, 255, ${proximity * 0.11})`;
            context.lineWidth = 0.65;
            context.stroke();
          }
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `${particle.color}A8`;
        context.fill();
      });
    };

    const animate = () => {
      if (document.hidden) {
        frameId = 0;
        return;
      }
      draw(true);
      scrollVelocity *= 0.88;
      frameId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (isInView && !reduceMotion.matches && !coarsePointer.matches && !document.hidden && frameId === 0) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const stop = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      draw(false);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = stage.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    };
    const onPointerLeave = () => { pointer.x = -2000; pointer.y = -2000; };
    const onScroll = () => {
      const current = window.scrollY;
      scrollVelocity = current - previousScroll;
      previousScroll = current;
    };
    const onPreferenceChange = () => reduceMotion.matches || coarsePointer.matches ? stop() : start();
    const onVisibilityChange = () => document.hidden ? stop() : start();

    const observer = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;
      if (isInView) start();
      else stop();
    }, { rootMargin: "80px" });
    observer.observe(stage);
    visibilityObserver.observe(stage);
    resize();
    start();

    stage.addEventListener("pointermove", onPointerMove, { passive: true });
    stage.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    reduceMotion.addEventListener("change", onPreferenceChange);
    coarsePointer.addEventListener("change", onPreferenceChange);

    return () => {
      stop();
      observer.disconnect();
      visibilityObserver.disconnect();
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reduceMotion.removeEventListener("change", onPreferenceChange);
      coarsePointer.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] opacity-60" />;
}