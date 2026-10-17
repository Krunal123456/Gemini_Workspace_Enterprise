"use client";

import { useEffect } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    let disposed = false;
    let cleanupSmoothScroll: (() => void) | undefined;

    const initialize = async () => {
      const [lenisModule, gsapModule, scrollTriggerModule] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      const Lenis = lenisModule.default;
      const { gsap } = gsapModule;
      const { ScrollTrigger } = scrollTriggerModule;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        lerp: 0.1,
        duration: 1.0,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        autoRaf: false,
      });

      lenis.on("scroll", ScrollTrigger.update);
      const updateTicker = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);

      cleanupSmoothScroll = () => {
        gsap.ticker.remove(updateTicker);
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
      };
    };

    let idleCallbackId: number | undefined;
    let timerId: number | undefined;
    const idleWindow = window as Window & {
      requestIdleCallback?: Window["requestIdleCallback"];
      cancelIdleCallback?: Window["cancelIdleCallback"];
    };
    if (idleWindow.requestIdleCallback) {
      idleCallbackId = idleWindow.requestIdleCallback.call(
        window,
        () => void initialize(),
        { timeout: 2000 },
      );
    } else {
      timerId = window.setTimeout(() => void initialize(), 1000);
    }

    return () => {
      disposed = true;
      if (idleCallbackId !== undefined) idleWindow.cancelIdleCallback?.call(window, idleCallbackId);
      if (timerId !== undefined) window.clearTimeout(timerId);
      cleanupSmoothScroll?.();
    };
  }, []);

  return <>{children}</>;
}
