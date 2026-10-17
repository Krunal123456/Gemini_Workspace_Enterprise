"use client";

import Image from "next/image";
import Link from "next/link";
import { GeminiLogo } from "@/components/logos/GeminiLogo";
import { GoogleCloudLogo } from "@/components/logos/GoogleCloudLogo";
import { GoogleWorkspaceLogo } from "@/components/logos/GoogleWorkspaceLogo";
import { useLocale } from "@/lib/i18n/locale-context";
import { ArrowUpRight } from "lucide-react";

export function CloudEcosystemScene() {
  const { href, locale } = useLocale();

  return (
    <div className="cloud-atlas" aria-label={locale === "es" ? "Ecosistema de Google Workspace, Gemini y Google Cloud" : "Google Workspace, Gemini, and Google Cloud ecosystem"}>
      <svg className="cloud-atlas-routes" viewBox="0 0 640 530" fill="none" aria-hidden="true">
        <path className="atlas-route atlas-route-workspace" d="M318 263C276 220 238 184 198 164" />
        <path className="atlas-route atlas-route-gemini" d="M337 263C389 256 433 253 487 252" />
        <path className="atlas-route atlas-route-cloud" d="M314 281C286 326 276 368 279 419" />
        <circle className="atlas-route-end atlas-route-end-workspace" cx="198" cy="164" r="5" />
        <circle className="atlas-route-end atlas-route-end-gemini" cx="487" cy="252" r="5" />
        <circle className="atlas-route-end atlas-route-end-cloud" cx="279" cy="419" r="5" />
        <circle className="atlas-route-hub" cx="327" cy="272" r="5" />
      </svg>

      <div className="cloud-atlas-sun" aria-hidden="true" />
      <div className="cloud-atlas-orbit cloud-atlas-orbit-one" aria-hidden="true" />
      <div className="cloud-atlas-orbit cloud-atlas-orbit-two" aria-hidden="true" />

      <span className="atlas-route-label atlas-route-label-workspace">{locale === "es" ? "IA en Workspace" : "AI in Workspace"}</span>
      <span className="atlas-route-label atlas-route-label-enterprise">{locale === "es" ? "Agentes empresariales" : "Enterprise agents"}</span>

      <Link href={href("/apps")} className="atlas-brand atlas-brand-workspace" aria-label={locale === "es" ? "Explorar aplicaciones de Google Workspace" : "Explore Google Workspace apps"}>
        <GoogleWorkspaceLogo className="h-11 w-11 shrink-0" />
        <span className="atlas-brand-label">
          <Image src="/brand/google-wordmark.svg" alt="Google" width={74} height={24} className="h-[15px] w-auto" />
          <span>{locale === "es" ? "Workspace" : "Workspace"}</span>
          <span className="atlas-brand-action">{locale === "es" ? "Explorar aplicaciones" : "Explore apps"}<ArrowUpRight aria-hidden="true" /></span>
        </span>
      </Link>

      <Link href={href("/products/gemini")} className="atlas-brand atlas-brand-gemini" aria-label={locale === "es" ? "Explorar Gemini para Workspace" : "Explore Gemini for Workspace"}>
        <span className="atlas-gemini-mark"><GeminiLogo className="h-10 w-10" /></span>
        <span className="atlas-brand-label">
          <span className="atlas-product-name">Gemini</span>
          <span>{locale === "es" ? "IA de Workspace" : "Workspace AI"}</span>
          <span className="atlas-brand-action">{locale === "es" ? "Explorar Gemini" : "Explore Gemini"}<ArrowUpRight aria-hidden="true" /></span>
        </span>
      </Link>

      <Link href={href("/products/gemini-enterprise")} className="atlas-brand atlas-brand-cloud" aria-label={locale === "es" ? "Explorar Gemini Enterprise en Google Cloud" : "Explore Gemini Enterprise on Google Cloud"}>
        <GoogleCloudLogo className="h-10 w-12 shrink-0" />
        <span className="atlas-brand-label">
          <span className="atlas-product-name">Google Cloud</span>
          <span>Gemini Enterprise</span>
          <span className="atlas-brand-action">{locale === "es" ? "Explorar Enterprise" : "Explore Enterprise"}<ArrowUpRight aria-hidden="true" /></span>
        </span>
      </Link>

      <div className="atlas-center-note">
        <span className="atlas-center-dot" />
        <span>{locale === "es" ? "Un ecosistema conectado" : "One connected ecosystem"}</span>
      </div>
    </div>
  );
}
