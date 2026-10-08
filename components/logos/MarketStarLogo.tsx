import Image from "next/image";

export function MarketStarLogo({ className = "h-5 w-auto object-contain" }: { className?: string }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-md bg-slate-900 px-2.5 py-1.5 shadow-sm ring-1 ring-black/10">
      <Image
        src="/brand/marketstar-logo.png"
        alt="MarketStar"
        width={349}
        height={47}
        className={className}
      />
    </span>
  );
}
