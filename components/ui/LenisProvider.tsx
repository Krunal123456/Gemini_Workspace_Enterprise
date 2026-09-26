"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let rafId = 0;

    const stop = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
      if (!lenis) return;
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenis = null;
    };

    const start = () => {
      if (motionPreference.matches || lenis) return;
      lenis = new Lenis({ lerp: 0.08, duration: 1.1, smoothWheel: true, touchMultiplier: 1.1 });
      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    const syncMotionPreference = () => motionPreference.matches ? stop() : start();
    start();
    motionPreference.addEventListener("change", syncMotionPreference);

    return () => {
      motionPreference.removeEventListener("change", syncMotionPreference);
      stop();
    };
  }, []);

  return <>{children}</>;
}
