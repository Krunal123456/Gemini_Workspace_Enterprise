import type { ConnectorTranslations } from "@/lib/i18n/localize";

/** Spanish overlay for `data/connectors.ts`. id/type/status stay as source. */
export const connectorsES: ConnectorTranslations = {
  jira: {
    category: "Desarrollo",
    description:
      "Fundamenta Gemini en tus incidencias de Jira, sprints activos, tableros de entrega y tickets del backlog, con sincronización de estado en tiempo real.",
    dataTypes: [
      "Épicas",
      "Historias",
      "Errores",
      "Metadatos del sprint",
      "Comentarios",
      "Campos personalizados",
    ],
    groundingCapabilities: [
      "Pedir a Gemini un resumen de los bloqueos actuales del Sprint 42",
      "Redactar notas de retrospectiva del sprint fundamentadas en incidencias cerradas",
      "Mostrar tickets históricos relacionados al clasificar nuevos defectos",
    ],
    enterpriseRequirements:
      "Requiere Gemini Enterprise Standard o Plus. Se necesita el consentimiento del administrador de Atlassian Workspace para OAuth 2.0.",
  },
  confluence: {
    category: "Productividad",
    description:
      "Indexa la documentación corporativa, los registros de decisiones de arquitectura (ADR), los documentos de requisitos de producto (PRD) y los runbooks de los equipos.",
    dataTypes: ["Espacios", "Páginas", "Entradas de blog", "Comentarios", "Adjuntos"],
    groundingCapabilities: [
      "Responder preguntas de incorporación desde los espacios de RR. HH. e Ingeniería",
      "Sintetizar políticas de varios espacios en resúmenes ejecutivos",
      "Contrastar los diseños técnicos propuestos con los estándares de arquitectura aprobados",
    ],
    enterpriseRequirements:
      "Gemini Enterprise Standard o Plus con credenciales de administrador del sitio de Atlassian Cloud.",
  },
  salesforce: {
    category: "CRM y soporte",
    description:
      "Conecta Gemini con oportunidades, cuentas, contactos, casos y objetos personalizados para impulsar a los equipos de ventas y éxito del cliente.",
    dataTypes: [
      "Oportunidades",
      "Cuentas",
      "Contactos potenciales",
      "Casos de soporte",
      "Historial de etapas",
    ],
    groundingCapabilities: [
      "Preparar a los ejecutivos comerciales para las reuniones de revisión trimestral con resúmenes de salud de la cuenta",
      "Redactar propuestas de cierre de operaciones informadas por las notas del CRM y la etapa del embudo",
      "Detectar tendencias de riesgo entre las oportunidades perdidas en el tercer trimestre",
    ],
    enterpriseRequirements:
      "Gemini Enterprise Standard o Plus. Configuración de la Connected App en Salesforce con herencia de seguridad a nivel de campo.",
  },
  sharepoint: {
    category: "Productividad",
    description:
      "Unifica la búsqueda entre Google Drive y las bibliotecas de documentos de Microsoft SharePoint sin migrar archivos.",
    dataTypes: [
      "Documentos de Word (.docx)",
      "PowerPoint (.pptx)",
      "Excel (.xlsx)",
      "PDF",
      "Listas de SharePoint",
    ],
    groundingCapabilities: [
      "Buscar en Google Drive y SharePoint a la vez desde el chat de Gemini",
      "Sintetizar contratos legales almacenados en repositorios heredados de Microsoft",
      "Comparar licitaciones almacenadas en entornos de nube híbrida",
    ],
    enterpriseRequirements:
      "Registro de aplicación empresarial de Azure AD / Entra ID con permisos de la API de Microsoft Graph.",
  },
  slack: {
    category: "Comunicación",
    description:
      "Indexa los archivos de canales públicos y los hilos de resolución de problemas del equipo para la búsqueda conversacional en toda la organización.",
    dataTypes: [
      "Canales públicos",
      "Respuestas de hilo",
      "Documentos de Canvas",
      "Elementos fijados",
    ],
    groundingCapabilities: [
      "Encontrar pasos de resolución de incidentes de producción discutidos en Slack",
      "Resumir discusiones de los grupos de trabajo técnicos",
      "Localizar expertos en la materia según la frecuencia histórica de discusión",
    ],
    enterpriseRequirements:
      "Autorización del propietario del espacio de trabajo de Slack Enterprise Grid con lista blanca de canales incluidos.",
  },
  box: {
    category: "Productividad",
    description:
      "Busca, analiza y extrae información del contenido empresarial almacenado en Box, con resultados recortados según permisos.",
    dataTypes: [
      "Notas de Box",
      "Documentos de Office",
      "PDF",
      "Cascadas de metadatos de Box",
    ],
    groundingCapabilities: [
      "Sintetizar presentaciones de directorio almacenadas en carpetas cifradas de Box",
      "Revisar contratos históricos de clientes con retención de seguridad estricta",
      "Generar listas de verificación de cumplimiento a partir de documentación regulatoria subida",
    ],
    enterpriseRequirements:
      "Autorización de Box Custom App con autenticación de servidor (Client Credentials Grant).",
  },
  notion: {
    category: "Productividad",
    description:
      "Fundamenta Gemini en los wikis de Notion de tu equipo, las hojas de ruta de producto, los seguimientos de proyectos y las bases de datos de ingeniería.",
    dataTypes: [
      "Filas de base de datos",
      "Bloques de página",
      "Tableros Kanban",
      "Tareas del sprint",
    ],
    groundingCapabilities: [
      "Extraer puntos de acción de las actualizaciones semanales de todos los equipos de producto",
      "Responder «¿en qué estado está el proyecto Alfa?» usando las bases de datos de la hoja de ruta",
      "Contrastar los RFC de ingeniería con las especificaciones de diseño en Docs",
    ],
    enterpriseRequirements:
      "Token de integración interna de Notion con permisos de acceso a páginas a nivel de espacio de trabajo.",
  },
  github: {
    category: "Desarrollo",
    description:
      "Saca a la luz las discusiones de las pull requests, la documentación en markdown, las revisiones de código y la información del rastreador de incidencias.",
    dataTypes: [
      "Repositorios",
      "README / Documentación en markdown",
      "Incidencias",
      "Resúmenes de PR",
      "Notas de la versión",
    ],
    groundingCapabilities: [
      "Explicar la razón detrás de pull requests de arquitectura concretos",
      "Redactar notas de la versión para clientes a partir de las PR cerradas del sprint actual",
      "Localizar el repositorio y la persona responsable de ingeniería de cualquier servicio",
    ],
    enterpriseRequirements:
      "Instalación de GitHub App con metadatos de repositorio en solo lectura y permisos de pull request.",
  },
  bigquery: {
    category: "Datos en la nube",
    description:
      "Descubrimiento directo de esquemas SQL y análisis de datos en lenguaje natural sobre los almacenes de datos de Google Cloud.",
    dataTypes: [
      "Esquemas de tablas",
      "Vistas",
      "Planes de ejecución SQL",
      "Consultas analíticas",
    ],
    groundingCapabilities: [
      "Convertir preguntas de negocio en inglés claro en SQL de BigQuery eficiente",
      "Analizar tendencias históricas de ventas directamente en el chat de Gemini",
      "Detectar anomalías en cohortes de retención sin escribir uniones complejas",
    ],
    enterpriseRequirements:
      "Permisos de IAM del proyecto de Google Cloud (BigQuery Data Viewer y Job User).",
  },
  mcp: {
    category: "Desarrollo",
    description:
      "Conecta Gemini Enterprise con cualquier base de datos propietaria, microservicio interno o herramienta local mediante el estándar abierto MCP.",
    dataTypes: [
      "Esquemas JSON personalizados",
      "API REST dinámicas",
      "Invocación de herramientas en vivo",
      "Bases de datos privadas",
    ],
    groundingCapabilities: [
      "Consultar de forma segura ERP internos propietarios y bases de datos heredadas",
      "Ejecutar acciones bidireccionales gobernadas mediante invocaciones de herramientas personalizadas",
      "Ofrecer comprobaciones de inventario y precios en tiempo real durante las negociaciones con clientes",
    ],
    enterpriseRequirements:
      "Disponible en Gemini Enterprise Standard y Plus. Aloja servidores MCP personalizados en Google Cloud Run o en tus instalaciones.",
  },
  "custom-connectors": {
    category: "Datos en la nube",
    description:
      "Crea canalizaciones personalizadas de ingesta por lotes o en streaming hacia el índice de Conocimiento Organizativo de Gemini Enterprise.",
    dataTypes: [
      "API de documentos",
      "Incrustaciones de vectores",
      "Esquemas de metadatos personalizados",
    ],
    groundingCapabilities: [
      "Alimentar repositorios de intranet personalizados en la fundamentación de Gemini para toda la empresa",
      "Indexar transcripciones de atención al cliente con controles de acceso de grano fino por rol",
      "Automatizar las sincronizaciones nocturnas del índice de conocimiento",
    ],
    enterpriseRequirements:
      "Requiere Gemini Enterprise Standard o Plus. Utiliza las API de ingesta de Google Cloud.",
  },
};
