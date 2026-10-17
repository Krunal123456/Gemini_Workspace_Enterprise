"use client";

import { useEffect, useRef } from "react";
import { GeminiLogo } from "@/components/logos/GeminiLogo";

export function CloudCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!cursor || coarsePointer.matches || reducedMotion.matches) return;

    const target = { x: -100, y: -100 };
    const position = { x: -100, y: -100 };
    let active = false;
    let frame = 0;

    const render = () => {
      frame = 0;
      if (!active) return;

      position.x += (target.x - position.x) * 0.42;
      position.y += (target.y - position.y) * 0.42;
      cursor.style.transform = `translate3d(${position.x - 12}px, ${position.y - 12}px, 0)`;

      if (Math.abs(target.x - position.x) + Math.abs(target.y - position.y) > 0.3) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const updatePosition = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      if (!active) {
        position.x = target.x;
        position.y = target.y;
        cursor.style.transform = `translate3d(${position.x - 12}px, ${position.y - 12}px, 0)`;
      }
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
      <GeminiLogo className="gemini-cursor-mark h-6 w-6" />
    </div>
  );
}
