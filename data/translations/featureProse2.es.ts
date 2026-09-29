import type { FeatureTranslation } from "@/lib/i18n/localize";

/** Spanish body copy, batch 2 (forms, tasks, keep, appsheet, admin, slides, vids, drive, notebooklm). */
export const featureProseES2: Record<string, FeatureTranslation> = {
  "forms-ai-form-builder": {
    description:
      "Genera formularios de recogida, encuestas y cuestionarios de feedback completos a partir de un prompt breve o de un briefing de negocio.",
    whatItDoes:
      "Redacta un flujo de preguntas limpio, ramificaciones lógicas y criterios de puntuación sin exigir trabajo manual de diseño de formularios a los equipos de operaciones.",
    howItWorks:
      "Convierte objetivos en lenguaje natural en estructura de formulario, tipos de respuesta y lógica de validación, preservando la gobernanza del tenant y las normas de etiquetado de campos.",
  },
  "forms-response-analytics": {
    description:
      "Resume grandes conjuntos de respuestas, detecta temas de sentimiento y extrae conclusiones accionables de los resultados de las encuestas.",
    whatItDoes:
      "Convierte los envíos brutos del formulario en informes ejecutivos concisos con las principales tendencias, anomalías y acciones recomendadas.",
    howItWorks:
      "Aplica resumen en lenguaje natural y agrupamiento sobre datos de encuesta anónimos o propiedad de la empresa para destacar temas y puntos de fricción.",
  },
  "tasks-ai-prioritization": {
    description:
      "Convierte hilos de correo, notas de chat y comentarios de proyecto en tareas priorizadas y planes de acción.",
    whatItDoes:
      "Identifica elementos de trabajo, distingue las tareas urgentes del ruido de poco valor y construye un calendario de ejecución limpio para empleados y responsables.",
    howItWorks:
      "Lee el contexto del proyecto, las fechas límite y la urgencia de las comunicaciones para convertir ideas sin estructurar en una agenda diaria o un backlog de tareas.",
  },
  "keep-ai-note-summaries": {
    description:
      "Convierte notas aproximadas, listas de comprobación y volcados de ideas en resúmenes concisos y próximos pasos accionables.",
    whatItDoes:
      "Reformula notas personales o de equipo desordenadas en planes limpios, resúmenes de reuniones y acciones de seguimiento.",
    howItWorks:
      "Analiza el contenido de las notas, identifica temas y los transforma en resúmenes estructurados con listas de acciones opcionales.",
  },
  "appsheet-ai-app-generation": {
    description:
      "Describe un flujo de trabajo en inglés claro y genera una app de AppSheet funcionando conectada a los datos de Workspace.",
    whatItDoes:
      "Acelera la creación de apps departamentales para aprobaciones, seguimiento o inspecciones sin un ciclo completo de ingeniería de aplicaciones.",
    howItWorks:
      "Genera modelos de datos, formularios, reglas de flujo de trabajo y andamiaje de interfaz a partir de una especificación basada en prompts y de las fuentes existentes de Workspace.",
  },
  "admin-ai-usage-governance-dashboard": {
    description:
      "Supervisa los patrones de adopción de IA, el cumplimiento de políticas y el uso de funciones en los tenants de Workspace y Gemini Enterprise.",
    whatItDoes:
      "Da a los administradores una visión clara de quién usa la IA, qué herramientas se están adoptando y dónde persisten vacíos de gobernanza o de formación.",
    howItWorks:
      "Agrega eventos, señales de seguridad e historial de acceso por usuario en una capa unificada de gobernanza e informes de IA.",
  },
  "slides-side-panel": {
    description:
      "Genera ideas de diapositivas, resume presentaciones y busca contenido de Drive dentro de Slides.",
    whatItDoes:
      "Asiste a los creadores de presentaciones con recomendaciones de estructura, esquemas y extracción de contenido desde Docs.",
    howItWorks:
      "Panel lateral contextual que contrasta los prompts del usuario con las diapositivas activas y los archivos de Drive.",
  },
  "slides-generate-an-image-nano-banana-pro": {
    description:
      "Genera imágenes de presentación a medida en alta resolución con modelos avanzados de generación de imágenes.",
    whatItDoes:
      "Genera ilustraciones propias, conceptos de fondo abstractos y recursos gráficos directamente sobre los lienzos de las diapositivas.",
    howItWorks:
      "Usa Imagen 3 y canalizaciones de difusión optimizadas para renderizar visuales sin regalías basados en las descripciones de las diapositivas.",
  },
  "slides-remove-image-backgrounds": {
    description:
      "Elimina al instante los fondos de las imágenes con IA directamente en Google Slides.",
    whatItDoes:
      "Aísla logotipos, fotos de producto y retratos con transparencia nítida con una sola acción del menú contextual.",
    howItWorks:
      "Ejecuta segmentación semántica asistida por el cliente para identificar los sujetos en primer plano y eliminar los píxeles del fondo.",
  },
  "vids-full-access-to-ai-features": {
    description:
      "Acceso completo a la creación generativa de vídeo, la escritura de guiones y la edición automatizada de Google Vids.",
    whatItDoes:
      "Desbloquea el estudio de vídeo con IA de extremo a extremo en Google Workspace para crear vídeos automatizados a partir de documentos.",
    howItWorks:
      "Convierte prompts y Google Docs en storyboards animados con medios de stock y pistas de música sin regalías.",
  },
  "vids-avatar-generation": {
    description:
      "Genera avatares sintéticos de presentadores de vídeo para narrar guiones en Google Vids.",
    whatItDoes:
      "Renderiza presentadores digitales realistas que leen tu guion con sincronización labial y expresiones faciales naturales.",
    howItWorks:
      "Aplica difusión generativa y rigging facial neuronal para animar avatares directamente a partir de texto o de audio de locución.",
  },
  "vids-video-generation-veo-3-1": {
    description:
      "Genera clips de vídeo cinematográficos en alta definición con el modelo generativo de vídeo Veo 3.1 de Google.",
    whatItDoes:
      "Genera material de apoyo en 1080p a partir de descripciones de texto para cubrir escenas donde no existe material de stock.",
    howItWorks:
      "Veo 3.1 entiende movimientos de cámara cinematográficos (panorámicos, inclinaciones, zooms) y física para generar clips coherentes de 5 a 10 segundos.",
  },
  "vids-music-generation-in-vids": {
    description:
      "Genera música instrumental a medida, acorde al ambiente, para tus vídeos.",
    whatItDoes:
      "Produce fondos musicales a medida que se ajustan a la duración, el tempo y el estado de ánimo del vídeo, sin problemas de derechos de autor.",
    howItWorks:
      "La síntesis de audio neuronal genera una pista sonora continua calibrada según las transiciones de escena de tu línea de tiempo.",
  },
  "drive-side-panel": {
    description:
      "Haz preguntas sobre los archivos, busca en los documentos y extrae conclusiones en Google Drive.",
    whatItDoes:
      "Actúa como un motor central de búsqueda de conocimiento en todos los archivos de Drive, resumiendo documentos sin abrirlos.",
    howItWorks:
      "Consulta el índice de Google Drive de forma semántica, analizando el contenido de los archivos y generando resúmenes sintetizados en el panel lateral.",
  },
  "drive-analyse-pdfs": {
    description:
      "Extrae datos, compara cláusulas y haz preguntas detalladas sobre los documentos PDF de Drive.",
    whatItDoes:
      "Analiza PDF complejos de varias columnas, tablas, contratos legales y formularios escaneados directamente en la vista previa de Google Drive.",
    howItWorks:
      "Usa comprensión documental multimodal para leer con precisión texto, diagramas vectoriales y tablas financieras.",
  },
  "drive-audio-overviews-for-pdfs": {
    description:
      "Genera resúmenes de audio conversacionales al estilo pódcast directamente a partir de los PDF de Google Drive.",
    whatItDoes:
      "Convierte whitepapers, informes anuales y documentos de investigación extensos en discusiones de audio conversacionales atractivas de 10 minutos.",
    howItWorks:
      "Usa el motor de generación de voz de Audio Overviews de NotebookLM directamente dentro del panel de vista previa de Drive.",
  },
  "drive-ai-classification-in-drive": {
    description:
      "Clasifica y etiqueta automáticamente los archivos empresariales con etiquetas de DLP y metadatos de cumplimiento.",
    whatItDoes:
      "Analiza los archivos corporativos automáticamente para aplicar etiquetas como «Confidencial», «PII» o «Restringido» sin etiquetado manual.",
    howItWorks:
      "Aplica modelos de clasificación de aprendizaje automático entrenados con las políticas de datos de la organización para evaluar el contenido de forma continua.",
  },
  "notebooklm-base-limits": {
    description:
      "Acceso básico al asistente de investigación de Google fundamentado en tus fuentes, con notas, citas y síntesis de documentos.",
    whatItDoes:
      "Da acceso a la aplicación web de NotebookLM con fundamentación en fuentes y citas.",
    howItWorks:
      "Los usuarios suben sus fuentes de investigación y el modelo crea un índice localizado que fundamenta todas las interacciones posteriores.",
  },
};
