"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    // High refresh rate (120Hz/144Hz) optimized Lenis instance
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.0,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      autoRaf: false, // We synchronize directly to gsap.ticker for true 144Hz frame lock
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis tick directly with GSAP's high-precision RAF ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0); // Disable lag smoothing so 144Hz displays never stutter or throttle

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
