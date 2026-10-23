"use client";

import { useEffect, useRef } from "react";
import { GeminiLogo } from "@/components/logos/GeminiLogo";

export function CloudCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(pointer: fine)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!cursor || !finePointer.matches || coarsePointer.matches) return;

    const target = { x: -100, y: -100 };
    const position = { x: -100, y: -100 };
    let active = false;
    let frame = 0;

    const setPosition = (x: number, y: number) => {
      cursor.style.transform = `translate3d(${x - 12}px, ${y}px, 0)`;
    };

    const getPointerPosition = (event: PointerEvent) => {
      const viewport = window.visualViewport;
      return {
        x: event.clientX - (viewport?.offsetLeft ?? 0),
        y: event.clientY - (viewport?.offsetTop ?? 0),
      };
    };

    const render = () => {
      frame = 0;
      if (!active) return;

      if (reducedMotion.matches) {
        position.x = target.x;
        position.y = target.y;
      } else {
        position.x += (target.x - position.x) * 0.42;
        position.y += (target.y - position.y) * 0.42;
      }
      setPosition(position.x, position.y);

      if (!reducedMotion.matches && Math.abs(target.x - position.x) + Math.abs(target.y - position.y) > 0.3) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const updatePosition = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const pointer = getPointerPosition(event);
      target.x = pointer.x;
      target.y = pointer.y;
      if (!active) {
        position.x = target.x;
        position.y = target.y;
      }
      active = true;
      cursor.style.opacity = "1";

      if (reducedMotion.matches) {
        position.x = target.x;
        position.y = target.y;
        setPosition(position.x, position.y);
      } else if (!frame) {
        frame = window.requestAnimationFrame(render);
      }
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
      className="cursor-root pointer-events-none fixed left-0 top-0 z-[100] opacity-0"
    >
      <GeminiLogo className="gemini-cursor-mark h-6 w-6" />
    </div>
  );
}
