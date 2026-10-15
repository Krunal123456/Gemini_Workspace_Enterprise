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
  "gemini-business-addon": {
    name: "Gemini Business",
    shortName: "Gemini Business",
    tagline:
      "Asistencia de IA generativa en Documentos, Gmail, Drive, Presentaciones, Hojas de cálculo y Meet.",
    description:
      "Gemini Business es una suscripción complementaria para Google Workspace que integra Gemini en los flujos de trabajo diarios: redacción en Gmail y Documentos, generación visual de presentaciones en Slides, organización de datos en Sheets y mejoras de audio y fondos en Meet, con protección de datos de nivel empresarial.",
    idealFor:
      "Pequeñas y medianas empresas y equipos que desean adoptar IA generativa en las aplicaciones principales de Workspace con protecciones de datos comerciales.",
    storage: "Hereda el almacenamiento base de Workspace",
    highlightedFeatures: [
      "Asistencia de Gemini en Gmail y Documentos ('Ayúdame a escribir', borradores y resúmenes)",
      "Gemini en Hojas de cálculo de Google (generación inteligente de tablas, estructuración de datos, plantillas)",
      "Gemini en Presentaciones de Google (generación de imágenes originales y elementos visuales)",
      "Gemini en Google Meet (iluminación de estudio, sonido de estudio, fondos de IA personalizados)",
      "Protección de datos comerciales: los datos de tu empresa nunca se usan para entrenar modelos",
      "Acceso a la app independiente de Gemini (gemini.google.com) con protecciones de Workspace",
    ],
  },
  "gemini-enterprise-addon": {
    name: "Complemento Gemini Enterprise",
    shortName: "Gemini Ent Add-on",
    tagline:
      "IA generativa sin restricciones, subtítulos traducidos en más de 1.000 combinaciones lingüísticas y acceso prioritario.",
    description:
      "Gemini Enterprise es el complemento principal de IA para Google Workspace. Proporciona capacidades completas y sin restricciones de IA generativa en todas las aplicaciones de Workspace, subtítulos traducidos en Google Meet en más de 1.000 combinaciones lingüísticas, automatización de 'Tomar notas por mí', Studio Look & Sound y acceso prioritario a los modelos más avanzados.",
    idealFor:
      "Grandes empresas, usuarios avanzados y equipos globales que requieren un uso de IA sin restricciones, traducción de reuniones multilingüe y notas automáticas avanzadas.",
    storage: "Hereda el almacenamiento base de Workspace",
    highlightedFeatures: [
      "IA generativa sin restricciones en todas las aplicaciones de Workspace (Gmail, Docs, Sheets, Slides, Drive, Meet, Chat)",
      "'Tomar notas por mí' en Google Meet (documentación automatizada de reuniones y tareas en Docs)",
      "Subtítulos traducidos en tiempo real en Google Meet en más de 1.000 combinaciones de idiomas (69+ idiomas)",
      "Iluminación, sonido e imagen de estudio completos en Google Meet",
      "Acceso prioritario total a los últimos modelos de Gemini con los límites de uso más altos",
      "Soberanía de datos empresarial, controles administrativos avanzados y cero entrenamiento con datos de clientes",
    ],
  },
  "ai-meetings-messaging": {
    name: "AI Meetings and Messaging",
    shortName: "AI Meetings & Msg",
    tagline:
      "Notas inteligentes de reuniones, subtítulos multilingües en tiempo real y resúmenes de chat.",
    description:
      "El complemento Google Workspace AI Meetings and Messaging mejora Google Meet y Google Chat con funciones especializadas de IA: documentación automatizada 'Tomar notas por mí', subtítulos traducidos en tiempo real en más de 1.000 combinaciones de idiomas, imagen y sonido de estudio y resúmenes de conversaciones bajo demanda en Chat.",
    idealFor:
      "Organizaciones que buscan mejorar la colaboración global, la documentación de reuniones y la productividad en chats sin necesidad de licencias completas de redacción de IA para todos los empleados.",
    storage: "Hereda el almacenamiento base de Workspace",
    highlightedFeatures: [
      "'Tomar notas por mí' en Google Meet (captura notas, resúmenes y tareas directamente en Google Docs)",
      "Subtítulos traducidos en tiempo real en Google Meet en más de 69 idiomas (1.000+ combinaciones de idiomas)",
      "Imagen, iluminación y sonido de estudio en Google Meet",
      "Fondos de estudio generados por IA y mejoras de audio adaptativo",
      "Resúmenes de conversaciones y resúmenes de puesta al día bajo demanda en Google Chat",
      "Traducción automática de mensajes en línea en Google Chat",
    ],
  },
  "ai-security": {
    name: "AI Security",
    shortName: "AI Security",
    tagline:
      "Clasificación automatizada de datos confidenciales, DLP en Drive y cumplimiento normativo.",
    description:
      "El complemento Google Workspace AI Security equipa a los equipos de seguridad de TI con modelos de aprendizaje automático que preservan la privacidad para clasificar, etiquetar y proteger automáticamente documentos confidenciales en Google Drive, evitando la filtración de datos y garantizando el cumplimiento de normativas.",
    idealFor:
      "Equipos de operaciones de seguridad, CISOs, responsables de cumplimiento y organizaciones reguladas que buscan gobernanza automatizada de datos y DLP en Drive.",
    storage: "Hereda el almacenamiento base de Workspace",
    highlightedFeatures: [
      "Clasificación automática de datos confidenciales en todo el repositorio de Google Drive",
      "Etiquetas de datos impulsadas por IA (confidencial, PII, registros financieros, propiedad intelectual)",
      "Integración con las reglas de Prevención de Pérdida de Datos (DLP) de Google Workspace",
      "Evaluación continua tanto de archivos existentes como de los creados o subidos recientemente",
      "Arquitectura de modelos que preserva la privacidad: la evaluación se ejecuta localmente dentro de los límites de seguridad del cliente",
      "Integración con cifrado del lado del cliente (CSE) y reglas de acceso condicional",
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
  "google-voice-starter": {
    name: "Google Voice Starter",
    shortName: "Voice Starter",
    tagline:
      "Telefonía en la nube con transcripción de buzón de voz por IA para hasta 10 usuarios.",
    description:
      "Google Voice Starter proporciona números de teléfono comerciales basados en la nube con transcripción automática de voz a texto de mensajes de voz, desvío de llamadas e integración nativa con Google Meet, Calendar y Gmail.",
    idealFor:
      "Pequeñas empresas, emprendedores y equipos de hasta 10 usuarios que necesitan telefonía profesional y transcripción de voz sin hardware PBX.",
    storage: "Hereda el almacenamiento base de Workspace",
    highlightedFeatures: [
      "Hasta 10 usuarios y números de teléfono nacionales",
      "Transcripción de mensajes de voz impulsada por IA enviada directamente a Gmail",
      "Desvío de llamadas, transferencia y modo No molestar según calendario",
      "Integración con horarios laborales de Google Calendar",
      "Puente de llamadas de voz integrado con Google Meet",
      "Informes centralizados de uso y actividad en la consola de administración",
    ],
  },
  "google-voice-standard": {
    name: "Google Voice Standard",
    shortName: "Voice Standard",
    tagline:
      "Telefonía empresarial en la nube con operadora automática multinivel, teléfonos de escritorio y eDiscovery.",
    description:
      "Google Voice Standard ofrece funciones integrales de telefonía empresarial para Google Workspace con usuarios ilimitados, operadora automática multinivel (IVR), grupos de timbre, compatibilidad con teléfonos de escritorio y ATA, y eDiscovery de Google Vault.",
    idealFor:
      "Empresas en crecimiento y equipos que necesitan usuarios ilimitados, árboles telefónicos IVR automatizados, enrutamiento de llamadas y archivado para cumplimiento normativo.",
    storage: "Hereda el almacenamiento base de Workspace",
    highlightedFeatures: [
      "Usuarios y ubicaciones nacionales ilimitados",
      "Operadora automática multinivel (árbol telefónico automatizado / IVR)",
      "Grupos de timbre (distribución de llamadas para ventas y soporte)",
      "Compatibilidad con teléfonos de escritorio SIP / ATA y auriculares",
      "Retención, búsqueda y eDiscovery en Google Vault para registros de llamadas y mensajes",
      "Transcripción de buzón de voz por IA, filtrado de spam y grabación de llamadas",
    ],
  },
  "google-voice-premier": {
    name: "Google Voice Premier",
    shortName: "Voice Premier",
    tagline:
      "Sistema telefónico global en la nube con sedes internacionales, grabación automática y analítica en BigQuery.",
    description:
      "Google Voice Premier está diseñado para organizaciones multinacionales. Admite sedes internacionales ilimitadas, grabación centralizada automática de llamadas, telemetría avanzada y exportación directa a BigQuery para calidad y auditoría de llamadas.",
    idealFor:
      "Grandes corporaciones y empresas multinacionales que requieren cumplimiento telefónico internacional, grabación automática y analítica avanzada con BigQuery.",
    storage: "Hereda el almacenamiento base de Workspace",
    highlightedFeatures: [
      "Usuarios y ubicaciones nacionales e internacionales ilimitados",
      "Grabación automática y centralizada de llamadas con gobernanza de cumplimiento",
      "Analítica avanzada de telefonía y exportación automatizada de auditoría a BigQuery",
      "Operadoras automáticas multinivel, grupos de timbre y portabilidad numérica internacional",
      "eDiscovery en Google Vault, retenciones legales y políticas de retención empresarial",
      "Implementación global en teléfonos de escritorio, auriculares y aplicaciones móviles",
    ],
  },
  "appsheet-core": {
    name: "AppSheet Core",
    shortName: "AppSheet Core",
    tagline:
      "Desarrollo de aplicaciones empresariales sin código con asistencia de IA Gemini y conexión de datos de Workspace.",
    description:
      "AppSheet Core permite a cualquier persona crear aplicaciones móviles y web personalizadas sin escribir código, conectadas directamente con Google Sheets, Google Drive y bases de datos. Incluye el asistente Gemini en AppSheet para generación de apps en lenguaje natural y flujos automatizados.",
    idealFor:
      "Equipos de operaciones, personal de campo y analistas de negocio que desean automatizar flujos y crear herramientas internas sin recursos de ingeniería (incluido sin coste adicional en Enterprise Plus).",
    storage: "Hereda el almacenamiento base de Workspace",
    highlightedFeatures: [
      "Crea aplicaciones web y móviles sin programar",
      "Conexión directa a Google Sheets, Google Drive y fuentes en la nube",
      "Creación de aplicaciones y esquemas en lenguaje natural con asistencia de Gemini",
      "Notificaciones automatizadas, alertas por correo y activadores de flujos",
      "Captura de datos sin conexión con sincronización automática en segundo plano",
      "Incluido sin cargo adicional en Google Workspace Enterprise Plus",
    ],
  },
  "workspace-additional-storage": {
    name: "Almacenamiento Adicional de Workspace",
    shortName: "Almacenamiento Extra",
    tagline:
      "Incrementos de 10 TB de almacenamiento agrupado en la nube para Google Drive, Gmail y Google Fotos.",
    description:
      "El Almacenamiento Adicional de Google Workspace permite a las organizaciones agregar incrementos de 10 TB de almacenamiento agrupado a su dominio sin necesidad de actualizar las licencias individuales de los usuarios. Los administradores pueden asignar o agrupar el espacio dinámicamente.",
    idealFor:
      "Empresas y equipos creativos, científicos o de ingeniería con uso intensivo de datos que requieren gran almacenamiento en Google Drive sin cambiar los tipos de licencia de los usuarios.",
    storage: "10 TB de almacenamiento agrupado por licencia adicional",
    highlightedFeatures: [
      "Incremento de 10 TB de almacenamiento agrupado por licencia de suscripción",
      "Compartido dinámicamente entre todos los usuarios del dominio de Workspace",
      "Compatible con Google Drive, unidades compartidas, Gmail y Google Fotos",
      "Gestión desde la consola de administración con cuotas por usuario y unidad organizativa",
      "Aprovisionamiento instantáneo sin interrupción de las cuentas de usuario activas",
      "Acumulable: adquiere múltiples bloques de 10 TB según el crecimiento de la organización",
    ],
  },
};
