"use client";

import { useEffect, useState } from "react";

export function CloudCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    const updatePosition = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY, visible: true });
    };

    const hideCursor = () => setPosition((prev) => ({ ...prev, visible: false }));

    window.addEventListener("pointermove", updatePosition);
    window.addEventListener("pointerleave", hideCursor);

    return () => {
      window.removeEventListener("pointermove", updatePosition);
      window.removeEventListener("pointerleave", hideCursor);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-50 hidden md:block transition-opacity duration-200 ${position.visible ? "opacity-100" : "opacity-0"}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div className="cloud-cursor" />
      <div className="cloud-cursor-ring" />
    </div>
  );
}
