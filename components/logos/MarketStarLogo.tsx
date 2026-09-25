import React from "react";

export function MarketStarLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="MarketStar Logo"
    >
      <text
        x="0"
        y="24"
        fill="currentColor"
        fontSize="22"
        fontWeight="700"
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="-0.02em"
      >
        MarketStar
      </text>
    </svg>
  );
}
