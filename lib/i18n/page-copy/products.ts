import type { Locale } from "@/lib/i18n/config";

/**
 * Page-level copy for the `/products/*` routes.
 *
 * `/products/gemini` renders its own bespoke hero, so it gets its own record
 * rather than a `ProductCapabilityHub` shape. Everything lives here because each
 * page needs its own title, description, and hero strings, and the metadata has
 * to stay in sync with what the page actually renders.
 */

/** Copy consumed by the shared `ProductCapabilityHub` hero. */
export type ProductHubCopy = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  description: string;
};

export const productHubCopy: Record<
  Locale,
  Record<string, ProductHubCopy>
> = {
  en: {
    "developer-tools": {
      metadataTitle:
        "Gemini Developer Tools & Plan Availability | Gemini Intelligence",
      metadataDescription:
        "Explore Gemini developer tools and their availability across current Workspace and Gemini Enterprise plans.",
      eyebrow: "Developer tools",
      title: "Bring Gemini into the developer workflow.",
      description:
        "Compare Gemini CLI and Gemini Code Assist availability across AI add-ons and Gemini Enterprise editions.",
    },
    "gemini-enterprise": {
      metadataTitle:
        "Gemini Enterprise Capabilities & Plan Availability | Gemini Intelligence",
      metadataDescription:
        "Explore Gemini Enterprise knowledge grounding, connectors, MCP, agents, audit logging, and Model Armor capabilities.",
      eyebrow: "Gemini Enterprise product intelligence",
      title: "A governed reasoning layer for your organisation.",
      description:
        "Map enterprise grounding, stored organisational knowledge, connectors, MCP tools, agents, audit logging, and security capabilities to the plan that supports them.",
    },
    "google-labs": {
      metadataTitle:
        "Google Labs AI Capabilities & Plan Availability | Gemini Intelligence",
      metadataDescription:
        "Explore selected Google Labs projects and their documented availability.",
      eyebrow: "Google Labs",
      title: "Explore selected Google Labs capabilities.",
      description:
        "Browse catalog notes for selected Google Labs projects. Availability can change and is not necessarily tied to a Workspace plan.",
    },
    notebooklm: {
      metadataTitle:
        "NotebookLM Capabilities & Plan Availability | Gemini Intelligence",
      metadataDescription:
        "Explore NotebookLM research, source grounding, audio and video overviews, study tools, sharing, and enterprise governance.",
      eyebrow: "NotebookLM product intelligence",
      title: "Turn source material into structured understanding.",
      description:
        "Explore NotebookLM notebooks, source grounding, Audio and Video Overviews, research outputs, study tools, sharing, and enterprise controls by plan.",
    },
    "workspace-studio": {
      metadataTitle:
        "Workspace Studio Capabilities & Plan Availability | Gemini Intelligence",
      metadataDescription:
        "Explore Workspace Studio flow execution capabilities and plan availability.",
      eyebrow: "Workspace Studio",
      title: "Turn repeatable work into governed flows.",
      description:
        "Review Workspace Studio capabilities and see which Google Workspace plans include flow execution capacity.",
    },
  },
  es: {
    "developer-tools": {
      metadataTitle:
        "Herramientas de desarrollo de Gemini y disponibilidad por plan | Gemini Intelligence",
      metadataDescription:
        "Explora las herramientas de desarrollo de Gemini y su disponibilidad en los planes actuales de Workspace y Gemini Enterprise.",
      eyebrow: "Herramientas de desarrollo",
      title: "Integra Gemini en el flujo de trabajo de desarrollo.",
      description:
        "Compara la disponibilidad de Gemini CLI y Gemini Code Assist en los complementos de IA y las ediciones de Gemini Enterprise.",
    },
    "gemini-enterprise": {
      metadataTitle:
        "Capacidades de Gemini Enterprise y disponibilidad por plan | Gemini Intelligence",
      metadataDescription:
        "Explora la fundamentación del conocimiento, los conectores, MCP, los agentes, los registros de auditoría y Model Armor en Gemini Enterprise.",
      eyebrow: "Inteligencia de producto Gemini Enterprise",
      title: "Una capa de razonamiento gobernada para tu organización.",
      description:
        "Relaciona la fundamentación empresarial, el conocimiento organizativo almacenado, los conectores, las herramientas MCP, los agentes, los registros de auditoría y las capacidades de seguridad con el plan que los admite.",
    },
    "google-labs": {
      metadataTitle:
        "Capacidades de IA de Google Labs y disponibilidad por plan | Gemini Intelligence",
      metadataDescription:
        "Explora una selección de proyectos de Google Labs y su disponibilidad documentada.",
      eyebrow: "Google Labs",
      title: "Explora una selección de capacidades de Google Labs.",
      description:
        "Consulta las notas del catálogo de una selección de proyectos de Google Labs. La disponibilidad puede cambiar y no está necesariamente vinculada a un plan de Workspace.",
    },
    notebooklm: {
      metadataTitle:
        "Capacidades de NotebookLM y disponibilidad por plan | Gemini Intelligence",
      metadataDescription:
        "Explora la investigación en NotebookLM, la fundamentación en fuentes, los resúmenes de audio y vídeo, las herramientas de estudio, el uso compartido y la gobernanza empresarial.",
      eyebrow: "Inteligencia de producto NotebookLM",
      title: "Convierte el material de origen en comprensión estructurada.",
      description:
        "Explora los cuadernos de NotebookLM, la fundamentación en fuentes, los resúmenes de audio y vídeo, los resultados de investigación, las herramientas de estudio, el uso compartido y los controles empresariales por plan.",
    },
    "workspace-studio": {
      metadataTitle:
        "Capacidades de Workspace Studio y disponibilidad por plan | Gemini Intelligence",
      metadataDescription:
        "Explora las capacidades de ejecución de flujos de Workspace Studio y su disponibilidad por plan.",
      eyebrow: "Workspace Studio",
      title: "Convierte el trabajo repetitivo en flujos gobernados.",
      description:
        "Revisa las capacidades de Workspace Studio y descubre qué planes de Google Workspace incluyen capacidad de ejecución de flujos.",
    },
  },
};

/** Copy for the bespoke `/products/gemini` hero. */
export const geminiProductCopy: Record<
  Locale,
  {
    metadataTitle: string;
    metadataDescription: string;
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    titleTail: string;
    intro: string;
    exploreCapabilities: string;
    viewPricing: string;
    enterpriseArchitecture: string;
    capabilitiesIndexed: string;
    planTiersCompared: string;
    deploymentPaths: string;
    readyHeading: string;
    readyBody: string;
    openMatrix: string;
    calculateInvestment: string;
  }
> = {
  en: {
    metadataTitle:
      "Gemini AI for Work | Capabilities, Plans & Enterprise Grounding",
    metadataDescription:
      "Explore Gemini chat, research, creation, Google Workspace integrations, connectors, agents, and enterprise governance in one capability map.",
    eyebrow: "Gemini product intelligence",
    titleLead: "The Gemini capability map for ",
    titleAccent: "modern work",
    titleTail: ".",
    intro:
      "Understand what Gemini can do across chat, Workspace, research, media, enterprise grounding, connectors, and agents, then see which plan unlocks each capability.",
    exploreCapabilities: "Explore capabilities",
    viewPricing: "View pricing",
    enterpriseArchitecture: "Enterprise architecture",
    capabilitiesIndexed: "Gemini capabilities indexed",
    planTiersCompared: "Plan tiers compared",
    deploymentPaths: "Deployment paths: Workspace, add-ons, Enterprise",
    readyHeading: "Ready to make a plan decision?",
    readyBody:
      "Use the availability matrix for a full edition-by-edition view, or model seats and billing commitment on the pricing page.",
    openMatrix: "Open availability matrix",
    calculateInvestment: "Calculate investment",
  },
  es: {
    metadataTitle:
      "Gemini IA para el trabajo | Capacidades, planes y fundamentación empresarial",
    metadataDescription:
      "Explora el chat de Gemini, la investigación, la creación, las integraciones de Google Workspace, los conectores, los agentes y la gobernanza empresarial en un solo mapa de capacidades.",
    eyebrow: "Inteligencia de producto Gemini",
    titleLead: "El mapa de capacidades de Gemini para el ",
    titleAccent: "trabajo moderno",
    titleTail: ".",
    intro:
      "Comprende qué puede hacer Gemini en el chat, Workspace, la investigación, los medios multimedia, la fundamentación empresarial, los conectores y los agentes, y después descubre qué plan desbloquea cada capacidad.",
    exploreCapabilities: "Explora las capacidades",
    viewPricing: "Ver precios",
    enterpriseArchitecture: "Arquitectura empresarial",
    capabilitiesIndexed: "Capacidades de Gemini indexadas",
    planTiersCompared: "Niveles de plan comparados",
    deploymentPaths:
      "Vías de despliegue: Workspace, complementos, Enterprise",
    readyHeading: "¿Listo para tomar una decisión de plan?",
    readyBody:
      "Usa la matriz de disponibilidad para ver todas las ediciones una a una, o modela los puestos y el compromiso de facturación en la página de precios.",
    openMatrix: "Abrir la matriz de disponibilidad",
    calculateInvestment: "Calcular la inversión",
  },
};

/** The three value pillars on `/products/gemini`. */
export const geminiProductPillars: Record<
  Locale,
  { title: string; text: string }[]
> = {
  en: [
    {
      title: "One reasoning surface",
      text: "Chat, research, creation, and multimodal work in a single Gemini experience.",
    },
    {
      title: "Grounded in your context",
      text: "Move from Workspace content to governed enterprise sources, connectors, and custom MCP tools.",
    },
    {
      title: "Built for governed adoption",
      text: "Compare limits, availability, permissions, and enterprise controls before you deploy.",
    },
  ],
  es: [
    {
      title: "Una única superficie de razonamiento",
      text: "Chat, investigación, creación y trabajo multimodal en una sola experiencia de Gemini.",
    },
    {
      title: "Fundamentado en tu contexto",
      text: "Pasa del contenido de Workspace a fuentes empresariales gobernadas, conectores y herramientas MCP personalizadas.",
    },
    {
      title: "Creado para una adopción gobernada",
      text: "Compara límites, disponibilidad, permisos y controles empresariales antes de desplegar.",
    },
  ],
};

/** The Antigravity spotlight section above the hub on `/products/google-labs`. */
export const googleLabsSpotlight: Record<
  Locale,
  {
    eyebrow: string;
    heading: string;
    body: string;
    cta: string;
    badge: string;
    cards: { title: string; text: string; icon: "bot" | "code" | "rocket" }[];
  }
> = {
  en: {
    eyebrow: "Google Labs spotlight",
    heading:
      "Antigravity is the frontier coding agent for enterprise experimentation.",
    body: "Antigravity brings autonomous software development patterns into a practical enterprise setting: codebase inspection, refactoring, testing, and multi-step execution with high trust and operational oversight.",
    cta: "Open Antigravity feature page",
    badge: "Example use",
    cards: [
      {
        icon: "bot",
        title: "What it is",
        text: "An agentic coding assistant that operates across repositories, tasks, and terminal workflows.",
      },
      {
        icon: "code",
        title: "What it does",
        text: "Refactors code, generates tests, and handles multi-file changes with broader repository context.",
      },
      {
        icon: "rocket",
        title: "What it is used for",
        text: "Code modernization, migration, quality automation, and developer velocity at enterprise scale.",
      },
    ],
  },
  es: {
    eyebrow: "Protagonismo de Google Labs",
    heading:
      "Antigravity es el agente de programación de vanguardia para la experimentación empresarial.",
    body: "Antigravity aporta patrones de desarrollo de software autónomo a un contexto empresarial práctico: inspección del repositorio de código, refactorización, pruebas y ejecución en varios pasos con alta confianza y supervisión operativa.",
    cta: "Abrir la página de la función Antigravity",
    badge: "Ejemplo de uso",
    cards: [
      {
        icon: "bot",
        title: "Qué es",
        text: "Un asistente de programación agéntico que opera entre repositorios, tareas y flujos de trabajo de terminal.",
      },
      {
        icon: "code",
        title: "Qué hace",
        text: "Refactoriza código, genera pruebas y gestiona cambios en varios archivos con un contexto más amplio del repositorio.",
      },
      {
        icon: "rocket",
        title: "Para qué se usa",
        text: "Modernización de código, migración, automatización de calidad y velocidad de desarrollo a escala empresarial.",
      },
    ],
  },
};
