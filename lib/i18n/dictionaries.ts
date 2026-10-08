import type { Locale } from "@/lib/i18n/config";

/**
 * UI dictionary for chrome-level strings (navigation, footer, shared controls).
 *
 * English is authored inline as the source of truth; Spanish mirrors it here.
 * The dictionary is passed into Header/Footer as props so those components stay
 * server-renderable instead of depending on a client context.
 */
export type Dictionary = ReturnType<typeof getDictionary>;

/**
 * Shape shared by every locale. Declared structurally (not `typeof en`) so
 * each locale supplies the same keys with its own literal string values.
 */
export type UiDictionary = {
  metadata: {
    titleDefault: string;
    keywords: string[];
  };
  nav: {
    features: string;
    models: string;
    compare: string;
    pricing: string;
    enterprise: string;
    security: string;
    articles: string;
    apps: string;
    plans: string;
    search: string;
    searchSite: string;
    searchPlaceholder: string;
    toggleMenu: string;
    theme: string;
    getStarted: string;
    language: string;
  };
  hero: {
    groundedBadge: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    body: string;
    cta: string;
    explore: string;
    statCapabilities: string;
    statPlans: string;
    statContext: string;
    statSecurity: string;
  };
  comparison: {
    kicker: string;
    heading: string;
    body: string;
    openMatrix: string;
    detail: string;
    publishedRate: string;
    storage: string;
    summary: string;
    perUser: string;
    perSeat: string;
    from: string;
    checkPricing: string;
    annualNote: string;
    startingNote: string;
    catalogView: string;
    workspacePrices: string;
    geminiPrices: string;
  };
  footer: {
    platform: string;
    enterprise: string;
    applications: string;
    allFeatures: string;
    comparePlans: string;
    apps: string;
    notebooklm: string;
    enterpriseAi: string;
    connectors: string;
    agentsMcp: string;
    securityGovernance: string;
    articles: string;
    pricing: string;
    by: string;
    blurb: string;
  };
  pages: {
    apps: {
      badge: string;
      headingLead: string;
      headingHighlight: string;
      headingTail: string;
      body: string;
      featuresCount: string;
      coreCapabilities: string;
      exploreAi: string;
      ctaHeading: string;
      ctaBody: string;
      openMatrix: string;
      browseAll: string;
    };
    plans: {
      badge: string;
      heading: string;
      headingHighlight: string;
      headingTail: string;
      body: string;
      groups: Record<string, { tag: string }>;
      groupLabels: Record<string, string>;
    };
  };
};

const en: UiDictionary = {
  metadata: {
    titleDefault:
      "Gemini Enterprise AI Intelligence | Google Workspace AI Features & Capabilities",
    keywords: [
      "Gemini",
      "Google Workspace",
      "AI",
      "Enterprise",
      "NotebookLM",
      "Google Workspace AI",
      "Gemini Enterprise",
      "AI features",
      "plan comparison",
    ],
  },
  nav: {
    features: "Features",
    models: "Models",
    compare: "Compare",
    pricing: "Pricing",
    enterprise: "Enterprise",
    security: "Security",
    articles: "Articles",
    apps: "Apps",
    plans: "Plans",
    search: "Search",
    searchSite: "Search the site",
    searchPlaceholder: "Search...",
    toggleMenu: "Toggle mobile menu",
    theme: "Theme",
    getStarted: "Get Started",
    language: "Language",
  },
  hero: {
    groundedBadge: "Grounded in your data",
    line1: "Google",
    line2: "Workspace,",
    line3: "reimagined",
    line4: "by",
    line5: "AI.",
    body: "Bring Gemini into the flow of your work: grounded in Workspace context, connected to your tools, and governed for your organization. Explore {count} capabilities, plans, models, and enterprise controls.",
    cta: "Compare {count} Enterprise Plans",
    explore: "Explore",
    statCapabilities: "Capabilities indexed",
    statPlans: "Plans compared",
    statContext: "Largest listed context window",
    statSecurity: "Security review topics",
  },
  comparison: {
    kicker: "Plan comparison",
    heading: "Start with the differences that shape your rollout.",
    body: "Compare listed prices and storage figures, then check Google's plan pages for regional pricing and current terms.",
    openMatrix: "Open {count}-plan matrix",
    detail: "Plan detail",
    publishedRate: "Published rate",
    storage: "Storage / indexing",
    summary: "Plan summary",
    perUser: "/ user / month",
    perSeat: "/ seat / month",
    from: "From",
    checkPricing: "Check current pricing",
    annualNote: "Annual commitment rate; US list reference",
    startingNote: "Starting rate; confirm edition and contract price",
    catalogView:
      "Catalog view: {plans} listed plan options · {features} feature entries. Features without an edition-specific mapping are marked for review in the full matrix.",
    workspacePrices: "Workspace prices",
    geminiPrices: "Gemini Enterprise prices",
  },
  pages: {
    apps: {
      badge: "Workspace Ecosystem",
      headingLead: "AI native to every",
      headingHighlight: "application",
      headingTail: "you use daily.",
      body: "Google Workspace integrates Gemini AI directly into your collaboration workflows. From contextual email assistance in Gmail to research in NotebookLM, explore Gemini capabilities across {count} Workspace app surfaces.",
      featuresCount: "{count} AI Features",
      coreCapabilities: "Core Capabilities",
      exploreAi: "Explore {app} AI",
      ctaHeading: "Looking for comprehensive plan availability?",
      ctaBody: "See exactly which Google Workspace edition or Gemini Enterprise plan unlocks AI capabilities inside your favorite apps.",
      openMatrix: "Open Plan Availability Matrix",
      browseAll: "Browse All {count} Features",
    },
    plans: {
      badge: "Commercial Licensing",
      heading: "Every plan, edition & tier",
      headingHighlight: "clearly structured",
      headingTail: ".",
      body: "Compare listed plan options, storage allowances, and connector access. Prices and feature limits can vary by region, subscription, and edition; confirm current terms with Google.",
      groups: {
        "Gemini Enterprise": { tag: "Standalone Governed AI Platform" },
        "AI Add-ons": { tag: "Enhance Existing Workspace Plans" },
        "Google Workspace": { tag: "Foundational Collaboration Suites" },
      },
      groupLabels: {
        "Gemini Enterprise": "Gemini Enterprise",
        "AI Add-ons": "AI Add-ons",
        "Google Workspace": "Google Workspace",
      },
    },
  },
  footer: {
    platform: "Platform",
    enterprise: "Enterprise",
    applications: "Applications",
    allFeatures: "All Features",
    comparePlans: "Compare Plans",
    apps: "Applications",
    notebooklm: "NotebookLM",
    enterpriseAi: "Enterprise AI",
    connectors: "Connectors",
    agentsMcp: "Agents & MCP",
    securityGovernance: "Security & Governance",
    articles: "Articles",
    pricing: "Pricing",
    by: "by MarketStar",
    blurb:
      "The definitive intelligence platform for Google Workspace & Gemini AI capabilities.",
  },
};

const es: UiDictionary = {
  metadata: {
    titleDefault:
      "Gemini Enterprise AI Intelligence | Funciones y capacidades de IA de Google Workspace",
    keywords: [
      "Gemini",
      "Google Workspace",
      "IA",
      "Empresarial",
      "NotebookLM",
      "IA de Google Workspace",
      "Gemini Enterprise",
      "funciones de IA",
      "comparación de planes",
    ],
  },
  nav: {
    features: "Funciones",
    models: "Modelos",
    compare: "Comparar",
    pricing: "Precios",
    enterprise: "Empresas",
    security: "Seguridad",
    articles: "Artículos",
    apps: "Apps",
    plans: "Planes",
    search: "Buscar",
    searchSite: "Buscar en el sitio",
    searchPlaceholder: "Buscar...",
    toggleMenu: "Alternar menú móvil",
    theme: "Tema",
    getStarted: "Empezar",
    language: "Idioma",
  },
  hero: {
    groundedBadge: "Fundamentado en tus datos",
    line1: "Google",
    line2: "Workspace,",
    line3: "reimaginado",
    line4: "gracias a",
    line5: "la IA.",
    body: "Integra Gemini en el flujo de tu trabajo: fundamentado en el contexto de Workspace, conectado a tus herramientas y gobernado para tu organización. Explora {count} capacidades, planes, modelos y controles empresariales.",
    cta: "Compara {count} planes empresariales",
    explore: "Explora",
    statCapabilities: "Capacidades indexadas",
    statPlans: "Planes comparados",
    statContext: "Mayor ventana de contexto publicada",
    statSecurity: "Temas de revisión de seguridad",
  },
  comparison: {
    kicker: "Comparativa de planes",
    heading: "Empieza por las diferencias que marcan tu despliegue.",
    body: "Compara los precios publicados y las cifras de almacenamiento, y consulta después las páginas de planes de Google para conocer los precios regionales y las condiciones vigentes.",
    openMatrix: "Abrir la matriz de {count} planes",
    detail: "Detalle del plan",
    publishedRate: "Tarifa publicada",
    storage: "Almacenamiento / indexación",
    summary: "Resumen del plan",
    perUser: "/ usuario / mes",
    perSeat: "/ puesto / mes",
    from: "Desde",
    checkPricing: "Consulta los precios actuales",
    annualNote: "Tarifa con compromiso anual; referencia de la lista de EE. UU.",
    startingNote: "Tarifa de partida; confirma la edición y el precio del contrato",
    catalogView:
      "Vista del catálogo: {plans} opciones de plan publicadas · {features} funciones. Las funciones sin una asignación por edición específica se marcan para revisión en la matriz completa.",
    workspacePrices: "Precios de Workspace",
    geminiPrices: "Precios de Gemini Enterprise",
  },
  pages: {
    apps: {
      badge: "Ecosistema de Workspace",
      headingLead: "IA nativa en cada",
      headingHighlight: "aplicación",
      headingTail: "que usas a diario.",
      body: "Google Workspace integra Gemini IA directamente en tus flujos de trabajo colaborativos. Desde la asistencia contextual en el correo de Gmail hasta la investigación en NotebookLM, explora las capacidades de Gemini en {count} superficies de aplicaciones de Workspace.",
      featuresCount: "{count} funciones de IA",
      coreCapabilities: "Capacidades principales",
      exploreAi: "Explora la IA de {app}",
      ctaHeading: "¿Buscas la disponibilidad completa por plan?",
      ctaBody: "Consulta exactamente qué edición de Google Workspace o plan de Gemini Enterprise desbloquea las capacidades de IA en tus aplicaciones favoritas.",
      openMatrix: "Abrir la matriz de disponibilidad por plan",
      browseAll: "Ver las {count} funciones",
    },
    plans: {
      badge: "Licencias comerciales",
      heading: "Todos los planes, ediciones y niveles",
      headingHighlight: "claramente estructurados",
      headingTail: ".",
      body: "Compara las opciones de plan publicadas, las asignaciones de almacenamiento y el acceso a conectores. Los precios y los límites de funciones pueden variar según la región, la suscripción y la edición; confirma las condiciones vigentes con Google.",
      groups: {
        "Gemini Enterprise": { tag: "Plataforma de IA autónoma y gobernada" },
        "AI Add-ons": { tag: "Mejora tus planes de Workspace existentes" },
        "Google Workspace": { tag: "Suites fundamentales de colaboración" },
      },
      groupLabels: {
        "Gemini Enterprise": "Gemini Enterprise",
        "AI Add-ons": "Complementos de IA",
        "Google Workspace": "Google Workspace",
      },
    },
  },
  footer: {
    platform: "Plataforma",
    enterprise: "Empresas",
    applications: "Aplicaciones",
    allFeatures: "Todas las funciones",
    comparePlans: "Comparar planes",
    apps: "Aplicaciones",
    notebooklm: "NotebookLM",
    enterpriseAi: "IA empresarial",
    connectors: "Conectores",
    agentsMcp: "Agentes y MCP",
    securityGovernance: "Seguridad y gobernanza",
    articles: "Artículos",
    pricing: "Precios",
    by: "de MarketStar",
    blurb:
      "La plataforma de inteligencia definitiva para las capacidades de Google Workspace y Gemini AI.",
  },
};

const dictionaries: Record<Locale, UiDictionary> = { en, es };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.en;
}
