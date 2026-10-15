"use client";

import { useEffect, useRef } from "react";

export function CloudCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const halo = haloRef.current;
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!cursor || !dot || !halo || coarsePointer.matches || reducedMotion.matches) return;

    const target = { x: -100, y: -100 };
    const dotPosition = { x: -100, y: -100 };
    const haloPosition = { x: -100, y: -100 };
    let active = false;
    let frame = 0;

    const render = () => {
      frame = 0;
      if (!active) return;

      const ease = 0.32;
      dotPosition.x += (target.x - dotPosition.x) * ease;
      dotPosition.y += (target.y - dotPosition.y) * ease;
      haloPosition.x += (target.x - haloPosition.x) * 0.16;
      haloPosition.y += (target.y - haloPosition.y) * 0.16;

      cursor.style.transform = `translate3d(${dotPosition.x}px, ${dotPosition.y}px, 0)`;
      halo.style.transform = `translate3d(${haloPosition.x - dotPosition.x - 20}px, ${haloPosition.y - dotPosition.y - 20}px, 0)`;

      const dx = target.x - dotPosition.x;
      const dy = target.y - dotPosition.y;
      const hx = target.x - haloPosition.x;
      const hy = target.y - haloPosition.y;

      if (Math.abs(dx) + Math.abs(dy) > 0.3 || Math.abs(hx) + Math.abs(hy) > 0.3) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const updatePosition = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      active = true;
      cursor.style.opacity = "1";

      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const hideCursor = () => {
      active = false;
      cursor.style.opacity = "0";
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    window.addEventListener("pointermove", updatePosition, { passive: true });
    window.addEventListener("pointerleave", hideCursor, { passive: true });
    coarsePointer.addEventListener("change", hideCursor);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", updatePosition);
      window.removeEventListener("pointerleave", hideCursor);
      coarsePointer.removeEventListener("change", hideCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="cursor-root pointer-events-none fixed left-0 top-0 z-[100] hidden opacity-0 md:block"
    >
      <div ref={haloRef} className="cursor-halo" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
