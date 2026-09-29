import type {
  CategoryTranslations,
  SecurityLayerTranslations,
} from "@/lib/i18n/localize";

/** Spanish overlay for `data/security.ts`. id/level stay as source keys. */
export const securityLayersES: SecurityLayerTranslations = {
  identity: {
    name: "Identidad y autenticación",
    tagline:
      "Empieza por quién puede iniciar sesión y cómo se verifica su identidad.",
    description:
      "La configuración de identidad se define para el directorio de una organización y puede variar entre los productos de Workspace y Google Cloud.",
    capabilities: [
      {
        name: "Inicio de sesión único y autenticación multifactor",
        description:
          "Revisa el proveedor de identidad, las protecciones de acceso y las vías de recuperación que usarán las personas que accederán a las herramientas de IA.",
        reviewQuestion:
          "¿Qué controles de identidad de Workspace o Cloud se aplican a estos usuarios?",
      },
      {
        name: "Ciclo de vida de la cuenta",
        description:
          "Comprueba cómo se gestionan el alta, la baja y los cambios de rol en todos los servicios incluidos.",
        reviewQuestion:
          "¿Con qué rapidez se reflejan los cambios de acceso en cada servicio conectado?",
      },
    ],
  },
  access: {
    name: "Políticas de acceso y dispositivos",
    tagline:
      "Comprueba cómo se aplican las políticas de acceso a los usuarios, los dispositivos y las fuentes conectadas.",
    description:
      "Las funciones de acceso de Workspace y Google Cloud varían según el producto, la edición y la configuración. Verifica que las políticas cubran cada superficie de IA y cada conector de datos del despliegue propuesto.",
    capabilities: [
      {
        name: "Acceso por roles y grupos",
        description:
          "Asigna los permisos de administrador, usuario final y conectores a los sistemas de origen que necesitan.",
        reviewQuestion:
          "¿Los permisos de origen se trasladan a los resultados de búsqueda de IA?",
      },
      {
        name: "Comprobaciones de dispositivo y contexto",
        description:
          "Identifica qué comprobaciones de postura del dispositivo, ubicación o red admite el servicio seleccionado.",
        reviewQuestion:
          "¿Qué políticas pueden bloquear el acceso y cuáles solo lo informan o supervisan?",
      },
    ],
  },
  "data-protection": {
    name: "Protección de datos y cifrado",
    tagline: "Confirma qué datos cubre cada protección y dónde se aplica.",
    description:
      "El cifrado, las regiones de datos y el DLP no cubren automáticamente todas las superficies de producto ni todos los tipos de datos. Usa la documentación del producto para confirmar los servicios y ediciones admitidos.",
    capabilities: [
      {
        name: "Regiones de datos",
        description:
          "Revisa qué datos almacenados y qué servicios cubre cualquier política de región de datos configurada.",
        reviewQuestion:
          "¿Quedan dentro del alcance las entradas, las salidas y los archivos de origen de IA?",
      },
      {
        name: "DLP y cifrado",
        description:
          "Confirma los tipos de datos, los flujos de trabajo y los requisitos administrativos admitidos por los controles que vas a usar.",
        reviewQuestion:
          "¿Qué superficies de IA y qué tipos de archivo incluye la política?",
      },
    ],
  },
  "ai-safety": {
    name: "Controles de seguridad de la IA",
    tagline:
      "Entiende qué hace un control de filtrado y cómo se configura.",
    description:
      "Google documenta el filtrado de Model Armor para Gemini Enterprise. Los administradores configuran plantillas y el comportamiento de aplicación; el filtrado puede añadir latencia y no oculta información personal identificable.",
    capabilities: [
      {
        name: "Model Armor",
        description:
          "Model Armor está disponible en todas las ediciones de Gemini Enterprise sin coste adicional y puede filtrar los prompts y las respuestas cuando se configura.",
        reviewQuestion:
          "¿Qué plantillas, regiones, modo de aplicación y comportamiento ante fallos usarán los administradores?",
      },
      {
        name: "Revisión de prompts y respuestas",
        description:
          "Define políticas sobre los tipos de contenido que se inspeccionan y comprende cuándo se bloquea o se permite una solicitud.",
        reviewQuestion:
          "¿Cómo validarán los equipos el comportamiento del filtrado y gestionarán los falsos positivos?",
      },
    ],
  },
  retention: {
    name: "Retención y búsqueda",
    tagline:
      "Comprueba si las políticas legales y de retención cubren los datos de IA que te importan.",
    description:
      "Google Vault y otras herramientas de retención se aplican a servicios y datos admitidos. Confirma la cobertura de los prompts, las respuestas, los archivos y los registros concretos de tu flujo de trabajo.",
    capabilities: [
      {
        name: "Políticas de retención",
        description:
          "Revisa los periodos de retención y el comportamiento de eliminación de cada servicio de Workspace o Cloud incluido.",
        reviewQuestion:
          "¿La política seleccionada incluye las salidas generadas y los prompts?",
      },
      {
        name: "Descubrimiento legal",
        description:
          "Confirma qué datos se pueden conservar, buscar y exportar, y si hace falta una configuración adicional.",
        reviewQuestion:
          "¿Puede el equipo legal localizar los datos que necesita para una investigación o una retención?",
      },
    ],
  },
  compliance: {
    name: "Alcance del cumplimiento",
    tagline:
      "Asocia cada requisito de cumplimiento con el servicio exacto y el uso previsto.",
    description:
      "Una certificación del proveedor no convierte automáticamente en compatible cualquier producto, configuración o flujo de trabajo del cliente. Consulta las listas de funcionalidad aplicables y los acuerdos vigentes.",
    capabilities: [
      {
        name: "HIPAA y datos regulados",
        description:
          "Google enumera ciertos servicios de Workspace y funcionalidades de Gemini para usos relacionados con HIPAA con el acuerdo requerido.",
        reviewQuestion:
          "¿Los servicios seleccionados figuran en la lista vigente de funcionalidades incluidas de Google y está en vigor el BAA necesario?",
      },
      {
        name: "Certificaciones y requisitos regionales",
        description:
          "Revisa el recurso de cumplimiento vigente para el servicio de Google, la ubicación de los datos y el caso de uso concretos.",
        reviewQuestion:
          "¿El alcance documentado cubre tu despliegue y tus requisitos contractuales?",
      },
    ],
  },
  audit: {
    name: "Auditoría y supervisión",
    tagline:
      "Identifica los eventos disponibles para los administradores y cómo conservarlos.",
    description:
      "Los eventos de auditoría y las opciones de exportación varían según el servicio. Confirma la cobertura de eventos, los permisos de acceso, la latencia de entrega y la retención antes de tratar los registros como evidencia de cumplimiento.",
    capabilities: [
      {
        name: "Eventos de auditoría",
        description:
          "Revisa qué eventos de usuario, administrador, conector y agente se registran en cada servicio.",
        reviewQuestion:
          "¿Están disponibles y habilitados los eventos que necesitas para tus controles?",
      },
      {
        name: "Exportación de registros",
        description:
          "Planifica cómo se enrutan, protegen y conservan los eventos relevantes en tu entorno de supervisión.",
        reviewQuestion:
          "¿Quién puede acceder a los registros y cuál es el periodo de retención configurado?",
      },
    ],
  },
};

/** Spanish overlay for `data/categories.ts`. id stays the source key. */
export const categoriesES: CategoryTranslations = {
  gemini: {
    description:
      "App de chat autónoma y empresarial de Gemini, con razonamiento multimodal, investigación profunda y fundamentación.",
  },
  gmail: {
    description:
      "Redacción generativa, resumen contextual de correos y respuestas inteligentes con IA en Gmail.",
  },
  docs: {
    description:
      "Ayúdame a escribir, resumen de documentos, ilustración generativa y razonamiento en el panel lateral.",
  },
  sheets: {
    description:
      "Smart Fill mejorado, asistencia con fórmulas, panel lateral de Gemini y funciones de IA generativa.",
  },
  meet: {
    description:
      "Traducción de voz en tiempo real, «Toma notas por mí», iluminación y sonido de estudio, y fondos con IA.",
  },
  chat: {
    description:
      "Resumen de hilos, traducción automática entre idiomas y panel lateral de IA de Workspace.",
  },
  calendar: {
    description:
      "Agendado con IA, preparación de órdenes del día y optimización del calendario en los flujos de reunión.",
  },
  forms: {
    description:
      "Diseño de encuestas con IA, redacción automatizada de formularios y síntesis inteligente de respuestas.",
  },
  tasks: {
    description:
      "Creación de tareas con IA, priorización y seguimiento de acciones a partir de correos, chats y documentos.",
  },
  keep: {
    description:
      "Resumen de notas con IA, captura de ideas y extracción de acciones de notas personales y de equipo.",
  },
  appsheet: {
    description:
      "Creación de apps asistida por IA, automatización de flujos de trabajo y orquestación de procesos de negocio personalizados.",
  },
  admin: {
    name: "Administración y gobernanza",
    description:
      "Gobernanza del uso de IA, controles de políticas y analítica organizacional en Workspace y Gemini Enterprise.",
  },
  slides: {
    description:
      "Imágenes generativas con Imagen, generación de esquemas de diapositivas y eliminación automática de fondos.",
  },
  vids: {
    description:
      "Generación de vídeo empresarial con Veo 3.1, locución con IA, generación de avatares y música sin regalías.",
  },
  drive: {
    description:
      "Análisis profundo de PDF, generación de resúmenes en audio de documentos y clasificación inteligente de archivos.",
  },
  notebooklm: {
    description:
      "Asistente de investigación basado en tus fuentes, con resúmenes de audio y vídeo, mapas mentales, cuestionarios y Model Armor.",
  },
  studio: {
    description:
      "Orquestación automatizada de flujos de trabajo generativos de IA en varios pasos y cuotas mensuales de ejecución.",
  },
  labs: {
    description:
      "Capacidades experimentales de IA de frontera, como Whisk, Project Mariner y Antigravity.",
  },
  "developer-tools": {
    name: "Herramientas de desarrollo",
    description:
      "Gemini CLI y Gemini Code Assist para inteligencia en el terminal y generación de código en el IDE.",
  },
  security: {
    name: "Seguridad y gobernanza",
    description:
      "Protección de datos de nivel empresarial, eDiscovery de Vault, DLP, CMEK, VPC-SC y Model Armor.",
  },
};
