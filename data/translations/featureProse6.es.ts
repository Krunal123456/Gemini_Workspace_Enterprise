import type { FeatureTranslation } from "@/lib/i18n/localize";

/** Spanish body copy, batch 6 (enterprise platform, NotebookLM limits & sharing, security governance). */
export const featureProseES6: Record<string, FeatureTranslation> = {
  "gemini-slide-generation-in-gemini-app": {
    description:
      "Genera diapositivas directamente desde la aplicación web y móvil de Gemini.",
    whatItDoes:
      "Convierte ideas, briefings o notas de investigación en presentaciones estructuradas de Google Slides sin salir de la interfaz de chat.",
    howItWorks:
      "Genera esquemas de diapositivas, imágenes sugeridas y notas del ponente, y exporta automáticamente una presentación totalmente editable a Google Drive.",
  },
  "gemini-priority-access-to-latest-gemini-models": {
    description:
      "Obtén acceso prioritario a los últimos modelos de Gemini mediante complementos de IA o Gemini Enterprise Standard y Plus.",
    whatItDoes:
      "Garantiza una inferencia de baja latencia y una posición prioritaria en la cola de cómputo, incluso durante las horas punta de tráfico internacional.",
    howItWorks:
      "Dirige las solicitudes a clústeres de cómputo empresariales dedicados con SLA de rendimiento aprovisionados.",
  },
  "gemini-generate-media-images-and-videos": {
    description:
      "Genera imágenes y vídeos en las experiencias de Gemini admitidas, con límites más altos en los complementos de IA y en las ediciones de Gemini Enterprise.",
    whatItDoes:
      "Crea imágenes fotorrealistas y estilizadas mediante Imagen y clips de vídeo sintéticos mediante Veo a partir de prompts de texto.",
    howItWorks:
      "Los modelos generativos de difusión sintetizan el contenido con una marca de agua digital SynthID imperceptible para la trazabilidad empresarial.",
  },
  "gemini-enterprise-platform-stored-organisational-knowledge": {
    description:
      "Almacenamiento de indexación agrupada para el conocimiento organizativo disponible en Gemini Enterprise.",
    whatItDoes:
      "Proporciona almacenamiento vectorial en la nube que indexa documentos empresariales de Google Drive y de conectores de terceros para hacer búsquedas en toda la organización.",
    howItWorks:
      "El almacenamiento se agrupa entre todos los usuarios del tenant (por ejemplo, 75 GiB por usuario en Plus), lo que permite gráficos de conocimiento masivos sin cuotas individuales.",
  },
  "gemini-enterprise-platform-custom-mcp-server-connectors": {
    description:
      "Conecta Gemini Enterprise con conectores de servidores MCP (Model Context Protocol) personalizados.",
    whatItDoes:
      "Permite que los agentes de Gemini interactúen con bases de datos corporativas propias, microservicios internos y herramientas privadas mediante el estándar abierto MCP.",
    howItWorks:
      "Se conecta de forma segura a endpoints MCP alojados por el cliente o en Cloud Run, realizando descubrimiento de esquemas y ejecución gobernada de herramientas.",
  },
  "gemini-enterprise-platform-custom-built-connectors": {
    description:
      "Crea conectores personalizados para Gemini Enterprise con las API de ingesta de Google Cloud.",
    whatItDoes:
      "Permite que los equipos de desarrollo empresariales escriban canalizaciones de ingesta a medida que alimentan almacenes de datos propios en el índice de Gemini Enterprise.",
    howItWorks:
      "Usa API de Google Cloud autenticadas con definiciones de esquema personalizadas y endpoints de envío de documentos.",
  },
  "gemini-enterprise-platform-cloud-audit-logging": {
    description:
      "Registro de auditoría en la nube para Gemini Enterprise, integrado con Google Cloud Logging.",
    whatItDoes:
      "Registra un registro de auditoría inmutable y a prueba de manipulaciones de cada prompt de usuario, consulta de búsqueda en conectores y cambio de configuración administrativa.",
    howItWorks:
      "Envía telemetría de auditoría estructurada en JSON directamente a Google Cloud Logging y Cloud Monitoring, con soporte de exportación a BigQuery.",
  },
  "notebooklm-audio-overviews-notebooks-queries-sources-per-notebook": {
    description:
      "Límites ampliados de resúmenes de audio, número total de cuadernos, consultas diarias y fuentes por cuaderno.",
    whatItDoes:
      "Proporciona umbrales operativos más altos para investigadores empresariales que gestionan grandes bibliotecas de documentos.",
    howItWorks:
      "Aplica cuotas de nivel superior en capacidad de inferencia, generación e indexación vectorial.",
  },
  "notebooklm-cinematic-video-overviews": {
    description:
      "Resúmenes en vídeo de alta producción con gráficos en movimiento y transiciones cinematográficas.",
    whatItDoes:
      "Eleva los resúmenes en vídeo estándar a explicadores de vídeo de calidad de emisión con tipografía cinética dinámica.",
    howItWorks:
      "Aplica plantillas de diseño de movimiento avanzadas para formatear automáticamente cifras, estadísticas y conclusiones.",
  },
  "notebooklm-slide-decks-and-revisions": {
    description:
      "Convierte los cuadernos de investigación en presentaciones completas de Google Slides con seguimiento automatizado de revisiones.",
    whatItDoes:
      "Transforma la investigación sintetizada de tu cuaderno en una presentación editable con notas del ponente.",
    howItWorks:
      "Mapea los hallazgos principales a esquemas de diapositivas, generando viñetas, sugerencias visuales y citas.",
  },
  "notebooklm-advanced-sharing-and-notebook-analytics": {
    description:
      "Comparte cuadernos con permisos granulares (ver/editar) y supervisa la analítica de engagement de los lectores.",
    whatItDoes:
      "Permite la colaboración del equipo sobre cuadernos de investigación compartidos, mientras se rastrea qué fuentes y consultas exploran más los lectores.",
    howItWorks:
      "Integra los controles de uso compartido de Google Workspace con paneles de telemetría integrados para los propietarios de los cuadernos.",
  },
  "notebooklm-chat-with-published-notebooks": {
    description:
      "Permite que los compañeros y los lectores públicos conversen con cuadernos publicados de solo lectura.",
    whatItDoes:
      "Convierte un cuaderno en un micrositio conversacional interactivo que los visitantes pueden consultar sin editar las fuentes.",
    howItWorks:
      "Renderiza una interfaz de chat segura y de solo lectura vinculada a los materiales de origen aprobados por el publicador.",
  },
  "notebooklm-create-and-publish-notebooks": {
    description:
      "Publica cuadernos en la web o en tu dominio con URL personalizadas y listas de control de acceso.",
    whatItDoes:
      "Permite que los autores de la organización desplieguen colecciones de conocimiento depuradas en su dominio o en internet pública.",
    howItWorks:
      "Genera un punto de distribución autenticado que respeta las políticas de uso compartido del tenant.",
  },
  "notebooklm-usage-audit-logging": {
    description:
      "Registro de auditoría administrativo completo de todas las subidas de documentos y consultas de usuario de NotebookLM.",
    whatItDoes:
      "Garantiza que los equipos jurídicos y de seguridad tengan visibilidad completa de qué documentos se suben y qué preguntas se hacen.",
    howItWorks:
      "Envía eventos de auditoría inmutables a la consola de administración de Google Workspace y a Google Cloud Logging.",
  },
  "workspace-studio-flow-executions-per-month": {
    description:
      "Límites documentados por Google para el número de flujos, pasos por flujo y ejecuciones diarias de Workspace Studio.",
    whatItDoes:
      "Workspace Studio permite crear flujos que automatizan tareas entre aplicaciones de Workspace. Google documenta un máximo de 25 flujos y 20 pasos por flujo.",
    howItWorks:
      "Se aplica un límite diario de ejecuciones a todos los flujos del usuario. La ayuda actual de Google no publica cuotas mensuales por edición.",
  },
  "google-labs-flow-credits-per-month": {
    description:
      "Créditos de cómputo mensuales para flujos de trabajo de IA experimentales y pruebas de modelos de frontera.",
    whatItDoes:
      "Asigna cuotas de cómputo de sandbox para probar herramientas experimentales de Google Labs de vanguardia antes de su lanzamiento general.",
    howItWorks:
      "Proporciona saldos de crédito medidos que se renuevan mensualmente por cuenta empresarial con licencia.",
  },
  "security-gemini-app-with-enterprise-grade-data-protection": {
    description:
      "Las cuentas comerciales de Workspace que cumplen los requisitos reciben las protecciones de datos que Google describe para Gemini. La protección depende de la cuenta y la edición.",
    whatItDoes:
      "Describe el tratamiento que Google indica para los prompts y el contenido generado en experiencias Gemini aptas de Workspace.",
    howItWorks:
      "Google indica que el contenido de Workspace apto no se revisa por personas ni se usa para entrenar modelos fuera del dominio del cliente sin permiso. Esto no significa retención cero.",
  },
  "security-context-aware-access": {
    description:
      "Aplica controles de acceso dinámico de confianza cero basados en la identidad del usuario, la salud de seguridad del dispositivo, la IP y la ubicación.",
    whatItDoes:
      "Bloquea el acceso a las apps de Workspace y a Gemini cuando los usuarios se conectan desde dispositivos personales no gestionados, sistemas operativos obsoletos o países no autorizados.",
    howItWorks:
      "Evalúa los atributos de contexto en tiempo real en cada inicio de sesión y renovación de token de sesión, aplicando los principios de Google BeyondCorp Zero Trust.",
  },
  "security-data-regions-basic-single-policy": {
    description:
      "Data Regions de Workspace puede cubrir determinados servicios y datos en ediciones aptas. La cobertura varía según el servicio, el tipo y estado de los datos, la edición y la versión.",
    whatItDoes:
      "Permite a los administradores aplicar políticas de ubicación geográfica a los datos de Workspace que Google identifica como cubiertos.",
    howItWorks:
      "Consulta las tablas de servicios, tipos de datos y ediciones cubiertos; una política no cubre automáticamente todos los datos de Workspace o Gemini.",
  },
  "security-enterprise-data-regions-per-ou-policies": {
    description:
      "Define políticas granulares de región geográfica de datos por unidad organizativa (por ejemplo, UE para la filial europea y EE. UU. para la sede central).",
    whatItDoes:
      "Permite que las corporaciones multinacionales asignen políticas de residencia de datos distintas a distintas filiales dentro de un mismo tenant.",
    howItWorks:
      "Aplica restricciones de residencia de datos de forma selectiva a grupos y unidades organizativas (OU) concretas en la consola de administración de Google.",
  },
  "security-client-side-encryption": {
    description:
      "El cifrado del lado del cliente de Workspace es una opción administrada para datos y ediciones compatibles. Verifica la cobertura actual por servicio antes de depender de ella.",
    whatItDoes:
      "Permite a organizaciones aptas usar un servicio de claves externo para contenido cifrado compatible.",
    howItWorks:
      "La cobertura depende del servicio, el tipo de contenido, la edición y la configuración. No presupongas que cubre todos los archivos, el procesamiento de Gemini o las llamadas de Meet.",
  },
  "security-gemini-ai-security-protections": {
    description:
      "Filtros de seguridad de IA en varias capas que mitigan alucinaciones, prompts maliciosos y filtraciones de datos no autorizadas.",
    whatItDoes:
      "Inspecciona las consultas del usuario y las respuestas generadas en tiempo real para filtrar contenido dañino, toxicidad y acceso no autorizado al sistema.",
    howItWorks:
      "Ejecuta clasificadores de seguridad automatizados antes y después de la inferencia del modelo para hacer cumplir las directrices de uso empresarial.",
  },
  "security-vault-dlp-data-regions-cover-labs-services": {
    description:
      "La cobertura de Vault, DLP y Data Regions se limita a los servicios y datos que Google documenta. No se presupone cobertura de funciones experimentales de Labs.",
    whatItDoes:
      "Señala que los administradores deben verificar los controles y términos de cada función de Labs antes de habilitarla con datos administrados.",
    howItWorks:
      "Revisa los términos, controles de administrador y tablas de cobertura de cada servicio; no asumas que las políticas se heredan automáticamente.",
  },
  "security-enterprise-grade-security-and-compliance": {
    description:
      "Google publica certificaciones y atestaciones de sus servicios. Los informes y compromisos aplicables dependen del servicio, la configuración y el contrato; una certificación no hace que la implementación del cliente cumpla automáticamente.",
    whatItDoes:
      "Ofrece documentación para evaluar la postura de seguridad y cumplimiento de los servicios de Google.",
    howItWorks:
      "Google publica materiales de cumplimiento y el cliente debe verificar su alcance y configurar su propio entorno y procesos.",
  },
  "security-customer-managed-encryption-keys-cmek": {
    description:
      "Gestiona tus propias claves de cifrado mediante Google Cloud KMS para proteger los datos empresariales almacenados y los índices de IA.",
    whatItDoes:
      "Da a los administradores la posibilidad de revocar al instante el acceso criptográfico a los datos almacenados, haciendo que todos los archivos y índices de IA resulten ilegibles.",
    howItWorks:
      "Se integra con Google Cloud Key Management Service (KMS) o con HSM externos mediante Cloud EKM.",
  },
};
