"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Download, Share } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

declare global {
  interface WindowEventMap {
    beforeinstallprompt: InstallPromptEvent;
    appinstalled: Event;
  }
}

export function PwaInstallAction({ open }: { open: boolean }) {
  const { locale } = useLocale();
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const isSpanish = locale === "es";

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const mobile = ios || /Android|Mobile/i.test(navigator.userAgent);

    setIsInstalled(standalone);
    setIsIos(ios);
    setIsMobile(mobile);

    const handleInstallPrompt = (event: InstallPromptEvent) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const handleInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => undefined);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  if (!open || isInstalled || (!isMobile && !installPrompt)) return null;

  const handleInstall = async () => {
    if (isIos || !installPrompt) {
      setShowInstallHelp((current) => !current);
      return;
    }
    if (!installPrompt) return;

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") setIsInstalled(true);
    setInstallPrompt(null);
  };

  return (
    <div className="my-2 rounded-2xl border border-border/60 bg-muted/20 p-3">
      <button
        type="button"
        onClick={handleInstall}
        className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-2 py-1 text-left transition hover:bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
            <Download className="h-4 w-4" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-foreground">{isSpanish ? "Instalar aplicación" : "Install app"}</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">{isSpanish ? "Añadir Gemini Workspace a tu pantalla de inicio" : "Add Gemini Workspace to your home screen"}</span>
          </span>
        </span>
        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      </button>

      {showInstallHelp && (
        <p className="mt-2 flex items-start gap-2 rounded-xl bg-background/80 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
          <Share className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
          <span>
            {isIos
              ? isSpanish
                ? "En Safari, toca Compartir y luego “Añadir a pantalla de inicio”."
                : "In Safari, tap Share, then “Add to Home Screen”."
              : isSpanish
                ? "Abre el menú del navegador y elige “Instalar aplicación” o “Añadir a pantalla de inicio”."
                : "Open your browser menu and choose “Install app” or “Add to Home Screen”."}
          </span>
        </p>
      )}
    </div>
  );
}
