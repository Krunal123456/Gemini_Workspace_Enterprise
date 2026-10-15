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
      "Orquestación automatizada de flujos de trabajo generativos de IA en varios pasos y cuotas mensuales de ejecución.",
    whatItDoes:
      "Construye y activa flujos de trabajo autónomos entre varias apps (por ejemplo, «Cuando un cliente envíe un RFP por Gmail, resúmelo en Docs, avisa a Slack y regístralo en Sheets»).",
    howItWorks:
      "Lienzo visual de flujo de trabajo con arrastrar y soltar que ejecuta lógica sin servidor conectada a las API de Workspace.",
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
      "Garantía contractual de que los prompts, documentos y salidas generadas de los clientes empresariales nunca se utilizan para entrenar modelos.",
    whatItDoes:
      "Proporciona un perímetro de IA soberano y seguro que garantiza que los datos corporativos confidenciales permanecen aislados dentro del límite de nube del cliente.",
    howItWorks:
      "Todas las solicitudes se rigen por las condiciones empresariales de Google Cloud, sin revisión humana ni retención para el entrenamiento de modelos.",
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
      "Elige una ubicación geográfica (EE. UU. o Europa) para los datos de Workspace y Gemini en reposo cubiertos.",
    whatItDoes:
      "Garantiza que los datos principales del cliente en reposo residan dentro de un límite geográfico específico para cumplir los requisitos básicos de residencia de datos.",
    howItWorks:
      "Restringe las asignaciones de almacenamiento en la red global de centros de datos de Google a los territorios designados.",
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
      "Cifra Google Docs, Sheets, Slides, archivos de Drive y llamadas de Meet en el navegador antes de que los datos lleguen a los servidores de Google.",
    whatItDoes:
      "Garantiza que Google nunca tenga acceso a las claves criptográficas necesarias para descifrar tus archivos, lo que te brinda soberanía total.",
    howItWorks:
      "Se integra con servicios de identidad y gestión de claves (KMS) de terceros gestionados por el cliente mediante las API criptográficas estándar del navegador.",
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
      "La gobernanza empresarial, el eDiscovery y las protecciones de residencia se extienden por completo a las herramientas experimentales de IA de Google Labs.",
    whatItDoes:
      "Permite que las organizaciones empresariales prueben herramientas innovadoras de Google Labs sin renunciar al cumplimiento y la retención institucionales.",
    howItWorks:
      "Aplica la herencia de políticas empresariales a los endpoints de Labs y al historial de interacción del usuario.",
  },
  "security-enterprise-grade-security-and-compliance": {
    description:
      "Certificaciones completas de cumplimiento, incluidas SOC 1/2/3, ISO 27001/27017/27018 y alineación con el RGPD.",
    whatItDoes:
      "Satisface los estándares de auditores independientes de terceros sobre seguridad de datos en la nube, confidencialidad y resiliencia operativa.",
    howItWorks:
      "Mantiene auditorías de certificación independientes continuas y publica informes SOC mediante el Compliance Reports Manager de Google Cloud.",
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
