import Image from "next/image";
import { cn } from "@/lib/utils";

interface MarketStarLogoProps {
  /** Sizing utilities for the wordmark image itself. */
  className?: string;
  /** Render the "Gemini Intelligence" product line inside the lockup. */
  withProductLine?: boolean;
  /** Extra classes for the outer lockup plate. */
  wrapperClassName?: string;
}

/**
 * MarketStar brand lockup.
 *
 * The wordmark is white-on-transparent, so it always sits on the dark brand
 * plate. With `withProductLine`, the product name is set as a tracked-out
 * sub-line under a hairline rule *inside* that same plate — one object, one
 * container, so the header stays a clean capsule instead of stacking badges.
 */
export function MarketStarLogo({
  className = "h-5 w-auto object-contain",
  withProductLine = false,
  wrapperClassName,
}: MarketStarLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 flex-col overflow-hidden rounded-md bg-gradient-to-br from-slate-900 to-slate-800 shadow-sm ring-1 ring-black/10",
        wrapperClassName,
      )}
    >
      <span className="flex items-center justify-center px-2.5 pb-0.5 pt-1">
        <Image
          src="/brand/marketstar-logo.png"
          alt="MarketStar"
          width={349}
          height={47}
          className={className}
          priority
        />
      </span>

      {withProductLine && (
        <>
          <span aria-hidden="true" className="mx-2 h-px shrink-0 bg-white/15" />
          <span className="flex items-center gap-1.5 px-2 pb-1 pt-0.5">
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-r from-transparent to-white/25"
            />
            <span
              className={cn(
                "whitespace-nowrap text-[7.5px] font-semibold uppercase leading-none sm:text-[8px]",
                "tracking-[0.18em] -mr-[0.18em]",
                "text-white/85",
              )}
            >
              Gemini<span className="text-violet-300"> Intelligence</span>
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-l from-transparent to-white/25"
            />
          </span>
        </>
      )}
    </span>
  );
}
