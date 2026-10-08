import type { PlanTranslations } from "@/lib/i18n/localize";

/**
 * Spanish overlay for `data/plans.ts`.
 * `id`, `slug`, `type` and `category` stay in English because plans are
 * filtered/grouped by those values; only display text is localized.
 */
export const plansES: PlanTranslations = {
  "business-starter": {
    tagline: "Correo corporativo y colaboración básica para equipos pequeños.",
    description:
      "Google Workspace Business Starter incluye correo corporativo y colaboración, Gemini en Gmail y acceso estándar a la app de Gemini. Las funciones de la app Gemini y la asistencia de Gemini en las apps de Workspace tienen límites y reglas de edición independientes.",
    idealFor:
      "Startups, equipos pequeños y profesionales independientes que buscan correo corporativo personalizado y herramientas cloud básicas.",
    storage: "30 GB agrupados por usuario",
    highlightedFeatures: [
      "Correo corporativo personalizado",
      "Gemini en Gmail",
      "Acceso estándar en la app Gemini con protecciones de datos de Workspace",
      "Disponibilidad limitada de Gemini en las apps de Workspace",
      "El acceso a las fuentes de Workspace Intelligence depende del administrador",
      "Videollamadas de hasta 100 participantes",
    ],
  },
  "business-standard": {
    tagline: "Más almacenamiento, grabación y productividad con IA.",
    description:
      "Google Workspace Business Standard incluye 2 TB de almacenamiento agrupado por usuario, llamadas de Meet de hasta 150 participantes con grabación y un acceso ampliado a Gemini en las apps de Workspace.",
    idealFor:
      "Organizaciones en crecimiento de 10 a 300 empleados que necesitan almacenamiento amplio, colaboración en equipo y asistencia diaria de IA.",
    storage: "2 TB agrupados por usuario",
    highlightedFeatures: [
      "2 TB de almacenamiento agrupado por usuario",
      "Videollamadas de 150 participantes con grabación",
      "Gemini en Gmail, Docs, Sheets, Slides, Meet y otras apps de Workspace elegibles",
      "Acceso ampliado a la app Gemini y a Notebook; los límites de funciones varían",
      "Unidades compartidas para tu equipo",
      "El acceso a las fuentes de Workspace Intelligence depende del administrador",
    ],
  },
  "business-plus": {
    tagline: "Seguridad avanzada, eDiscovery de cumplimiento y 5 TB de almacenamiento.",
    description:
      "Combina 5 TB de almacenamiento por usuario, videollamadas de hasta 500 participantes con registro de asistencia, eDiscovery de Google Vault y gestión avanzada de dispositivos.",
    idealFor:
      "Empresas en sectores regulados o con requisitos estrictos de cumplimiento y retención.",
    storage: "5 TB agrupados por usuario",
    highlightedFeatures: [
      "5 TB de almacenamiento agrupado por usuario",
      "Reuniones de 500 participantes con registro de asistencia",
      "eDiscovery y retención de Google Vault",
      "Gestión avanzada de dispositivos",
      "Acceso ampliado a Gemini en las apps de Workspace elegibles",
      "Acceso ampliado a la app Gemini y a Notebook; los límites de funciones varían",
    ],
  },
  "enterprise-standard": {
    tagline:
      "Gestión empresarial, almacenamiento flexible y seguridad avanzada de Workspace.",
    description:
      "Google Workspace Enterprise Standard incluye 5 TB de almacenamiento agrupado por usuario, con capacidad adicional disponible a petición, controles de seguridad empresariales, Gemini en las apps de Workspace elegibles y hasta 500 participantes en Meet.",
    idealFor:
      "Empresas medianas y grandes que requieren una gobernanza sólida de datos, controles para todo el dominio y funciones de vídeo avanzadas.",
    storage:
      "5 TB agrupados por usuario; solicita almacenamiento adicional si lo necesitas",
    highlightedFeatures: [
      "5 TB de almacenamiento agrupado por usuario; solicítalo si necesitas más",
      "Reuniones de 500 participantes y transmisión en directo",
      "Seguridad y controles de datos empresariales",
      "Funciones de Gemini en las apps de Workspace elegibles",
      "Google Cloud Search para los servicios de Google",
      "Workspace Studio (se aplican la verificación del dominio y los límites actuales)",
    ],
  },
  "enterprise-plus": {
    tagline:
      "La máxima seguridad, cumplimiento y control empresarial de Google.",
    description:
      "Google Workspace Enterprise Plus incluye controles avanzados de seguridad y cumplimiento, Gemini en las apps de Workspace elegibles, 5 TB de almacenamiento agrupado por usuario con capacidad adicional a petición y hasta 1.000 participantes en Meet.",
    idealFor:
      "Empresas globales, entidades financieras, proveedores sanitarios y organizaciones con estándares de cumplimiento de alta seguridad.",
    storage:
      "5 TB agrupados por usuario; solicite almacenamiento adicional si lo necesita",
    highlightedFeatures: [
      "Controles avanzados de seguridad y cumplimiento",
      "Reuniones de 1.000 participantes y transmisión en directo hasta 100.000 espectadores",
      "Funciones de Gemini en las apps de Workspace elegibles",
      "Integraciones de Google Cloud Search para servicios de Google y de terceros seleccionados (se aplica elegibilidad)",
      "Workspace Studio (se aplican la verificación del dominio y los límites actuales)",
      "Almacenamiento agrupado flexible; solicite más si lo necesita",
    ],
  },
  "ai-expanded": {
    tagline:
      "Mayor acceso a funciones avanzadas de IA en los planes de Workspace elegibles.",
    description:
      "AI Expanded Access es un complemento para suscripciones elegibles de Workspace Business Standard, Business Plus, Enterprise Standard y Enterprise Plus. Aumenta los límites de uso de ciertas funciones avanzadas de IA.",
    idealFor:
      "Organizaciones con una edición de Workspace elegible que necesitan límites más altos para funciones de IA seleccionadas.",
    pricingNote:
      "El precio varía según el país, la moneda y el plazo de la suscripción. Consulta la oferta local actual de Google.",
    storage: "Hereda el almacenamiento base de Workspace",
    highlightedFeatures: [
      "Límites más altos para funciones avanzadas de IA seleccionadas",
      "Acceso ampliado a las funciones elegibles de la app Gemini y de Notebook",
      "Límites más altos para funciones seleccionadas de las apps de Workspace",
      "La disponibilidad depende de una edición de Workspace elegible",
      "Las cuotas, promociones y fechas de aplicación varían",
      "Independiente de los conectores de Gemini Enterprise y de las licencias de agentes",
    ],
  },
  "gemini-enterprise-business": {
    tagline:
      "IA empresarial con búsqueda consciente de permisos y 25 GiB de indexación agrupada por usuario.",
    description:
      "Gemini Enterprise Business ofrece búsqueda empresarial, fundamentación en fuentes de la organización y gobernanza básica de agentes, con 25 GiB de almacenamiento e indexación de datos agrupados por usuario.",
    idealFor:
      "Organizaciones que buscan búsqueda empresarial consciente de permisos e IA sobre fuentes de datos empresariales aprobadas.",
    pricingNote:
      "Desde 21 USD por usuario/mes. Confirma los precios regionales y contractuales actuales con Google Cloud.",
    storage: "25 GiB por usuario, agrupados para almacenamiento e indexación de datos",
    highlightedFeatures: [
      "25 GiB de almacenamiento e indexación de datos agrupados por usuario",
      "Búsqueda empresarial consciente de permisos",
      "Fundamentación en fuentes de Google y de terceros",
      "Acceso a conectores seleccionados relevantes para el segmento",
      "Gobernanza y administración básicas de agentes",
      "Hasta 300 puestos en la oferta pública Business",
    ],
  },
  "gemini-enterprise-standard": {
    tagline:
      "Ecosistema completo de conectores, acceso prioritario a modelos y 30 GiB de indexación agrupada por usuario.",
    description:
      "Gemini Enterprise Standard incluye acceso a todo el ecosistema de conectores de datos, acceso prioritario a los últimos modelos Gemini y 30 GiB de almacenamiento e indexación de datos agrupados por usuario.",
    idealFor:
      "Organizaciones que necesitan un acceso amplio a conectores, disponibilidad prioritaria de modelos y controles empresariales.",
    pricingNote:
      "Standard y Plus empiezan en 30 USD por usuario/mes. Contacta con Google Cloud para precios por edición y por región.",
    storage: "30 GiB por usuario, agrupados para almacenamiento e indexación de datos",
    highlightedFeatures: [
      "30 GiB de almacenamiento e indexación de datos agrupados por usuario",
      "Acceso a todo el ecosistema de conectores de datos",
      "Acceso prioritario a los últimos modelos Gemini",
      "Acceso a Agent Marketplace",
      "Herramientas de desarrollo de IA",
      "Seguridad y cumplimiento de nivel empresarial",
    ],
  },
  "gemini-enterprise-plus": {
    tagline:
      "Ecosistema completo de conectores, acceso prioritario a modelos y 75 GiB de indexación agrupada por usuario.",
    description:
      "Gemini Enterprise Plus incluye el ecosistema completo de conectores, acceso prioritario a los últimos modelos Gemini, seguridad y cumplimiento de nivel empresarial y 75 GiB de almacenamiento e indexación de datos agrupados por usuario.",
    idealFor:
      "Organizaciones que necesitan una mayor capacidad de indexación agrupada y el conjunto completo de capacidades de la edición empresarial.",
    pricingNote:
      "Standard y Plus empiezan en 30 USD por usuario/mes. Contacta con Google Cloud para precios por edición y por región.",
    storage: "75 GiB por usuario, agrupados para almacenamiento e indexación de datos",
    highlightedFeatures: [
      "75 GiB de almacenamiento e indexación de datos agrupados por usuario",
      "Acceso a todo el ecosistema de conectores de datos",
      "Acceso prioritario a los últimos modelos Gemini",
      "Acceso a Agent Marketplace",
      "Herramientas de desarrollo de IA",
      "Seguridad y cumplimiento de nivel empresarial",
    ],
  },
  "gemini-enterprise-payg": {
    tagline: "Gemini Enterprise con pago por uso y sin coste por puesto.",
    description:
      "La edición de pago por uso no tiene coste por puesto y factura el uso, como tokens, memoria, cómputo y almacenamiento. Google describe actualmente la disponibilidad como un despliegue limitado; Gemini Notebook aún no está incluido.",
    idealFor:
      "Organizaciones que cumplen los requisitos del despliegue limitado de pago por uso de Google y prefieren la facturación por consumo.",
    pricingNote:
      "0 USD por puesto; se aplican cargos por uso. Despliegue limitado; consulta los términos de facturación y la elegibilidad de Google Cloud.",
    storage: "Según el uso; consulta la documentación actual de cuotas y consumo",
    highlightedFeatures: [
      "0 USD por puesto",
      "Facturación por uso de tokens, memoria, cómputo y almacenamiento",
      "Incluye las funciones de las ediciones Standard y Plus",
      "Requiere una cuenta de facturación de Google Cloud elegible",
      "Despliegue limitado",
      "Gemini Notebook no está incluido actualmente",
    ],
  },
  frontline: {
    tagline:
      "Acceso a Gemini Enterprise para equipos de primera línea, con 2 GiB de indexación agrupada por usuario.",
    description:
      "Gemini Enterprise Frontline es una edición para organizaciones con al menos 150 usuarios de Standard o Plus. Los usuarios de primera línea pueden acceder a los agentes aprovisionados por un administrador.",
    idealFor:
      "Organizaciones con suscripciones elegibles de Gemini Enterprise Standard o Plus que dan servicio a equipos de primera línea.",
    pricingNote:
      "Contacta con Google Cloud para conocer la disponibilidad y los precios actuales.",
    storage: "2 GiB por usuario, agrupados para almacenamiento e indexación de datos",
    highlightedFeatures: [
      "2 GiB de almacenamiento e indexación de datos agrupados por usuario",
      "Acceso a conectores seleccionados relevantes para el segmento",
      "Acceso a todo el ecosistema de conectores de datos",
      "Los usuarios de primera línea pueden acceder a los agentes aprovisionados por un administrador",
      "Disponible para organizaciones con al menos 150 usuarios de Standard o Plus",
      "Contacta con Google Cloud para conocer los precios y la disponibilidad actuales",
    ],
  },
};
