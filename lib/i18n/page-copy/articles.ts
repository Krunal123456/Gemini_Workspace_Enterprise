import type { Locale } from "@/lib/i18n/config";

/** Page-level copy for the articles index. */
export const articlesPageUi: Record<
  Locale,
  {
    advisory: string;
    titleLead: string;
    titleAccent: string;
    intro: string;
    keyTakeaways: string;
    readArticle: string;
  }
> = {
  en: {
    advisory: "MarketStar Enterprise Advisory",
    titleLead: "Strategic insights on",
    titleAccent: "enterprise AI",
    intro:
      "Objective technical analyses, pricing breakdowns, and deployment frameworks written by enterprise solutions architects to help technology leaders make informed AI decisions.",
    keyTakeaways: "Key Takeaways",
    readArticle: "Read article",
  },
  es: {
    advisory: "Asesor Enterprise de MarketStar",
    titleLead: "Perspectivas estratégicas sobre la arquitectura de",
    titleAccent: "IA empresarial",
    intro:
      "Análisis técnicos objetivos, desgloses de precios y marcos de despliegue escritos por arquitectos de soluciones empresariales para ayudar a los líderes tecnológicos a tomar decisiones informadas sobre IA.",
    keyTakeaways: "Ideas clave",
    readArticle: "Leer el artículo",
  },
};
