import { cn } from "@/lib/utils";

interface WorkspaceGeminiWordmarkProps {
  className?: string;
  withProductLine?: boolean;
  wrapperClassName?: string;
}

/** Neutral product wordmark retained behind the existing component API. */
export function WorkspaceGeminiWordmark({
  className = "h-5 w-auto object-contain",
  withProductLine = false,
  wrapperClassName,
}: WorkspaceGeminiWordmarkProps) {
  return (
    <span className={cn("inline-flex shrink-0 flex-col rounded-md", wrapperClassName)}>
      <span className={cn("whitespace-nowrap font-semibold tracking-tight text-foreground", className)}>
        Workspace Gemini
      </span>
      {withProductLine && <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Product intelligence</span>}
    </span>
  );
}
