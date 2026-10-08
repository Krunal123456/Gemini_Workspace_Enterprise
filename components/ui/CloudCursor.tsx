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

      const magneticTarget = document.elementFromPoint(target.x, target.y)?.closest<HTMLElement>("[data-magnetic]");
      let aimX = target.x;
      let aimY = target.y;
      if (magneticTarget) {
        const bounds = magneticTarget.getBoundingClientRect();
        aimX += (bounds.left + bounds.width / 2 - target.x) * 0.16;
        aimY += (bounds.top + bounds.height / 2 - target.y) * 0.16;
        cursor.dataset.magnetic = "true";
      } else {
        delete cursor.dataset.magnetic;
      }

      const ease = reducedMotion.matches ? 1 : 0.24;
      dotPosition.x += (aimX - dotPosition.x) * ease;
      dotPosition.y += (aimY - dotPosition.y) * ease;
      haloPosition.x += (target.x - haloPosition.x) * (reducedMotion.matches ? 1 : 0.12);
      haloPosition.y += (target.y - haloPosition.y) * (reducedMotion.matches ? 1 : 0.12);

      cursor.style.transform = `translate3d(${dotPosition.x}px, ${dotPosition.y}px, 0)`;
      dot.style.transform = `translate3d(${aimX - dotPosition.x - 3}px, ${aimY - dotPosition.y - 3}px, 0)`;
      halo.style.transform = `translate3d(${haloPosition.x - dotPosition.x - 20}px, ${haloPosition.y - dotPosition.y - 20}px, 0)`;

      if (Math.abs(aimX - dotPosition.x) + Math.abs(aimY - dotPosition.y) > 0.4 || Math.abs(target.x - haloPosition.x) + Math.abs(target.y - haloPosition.y) > 0.4) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const updatePosition = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      active = true;
      cursor.style.opacity = "1";

      const spotlight = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>("[data-spotlight]");
      if (spotlight) {
        const bounds = spotlight.getBoundingClientRect();
        spotlight.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
        spotlight.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
      }

      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const hideCursor = () => {
      active = false;
      cursor.style.opacity = "0";
      delete cursor.dataset.magnetic;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    window.addEventListener("pointermove", updatePosition);
    window.addEventListener("pointerleave", hideCursor);
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
