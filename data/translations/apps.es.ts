import type { AppTranslations } from "@/lib/i18n/localize";

/**
 * Spanish overlay for `data/apps.ts`.
 * Only display strings are localized; id, slug, accentColor, iconName and
 * featuresCount remain the English source values because they drive routing
 * and rendering logic.
 */
export const appsES: AppTranslations = {
  gmail: {
    category: "Comunicación",
    tagline:
      "Creación inteligente de correos, redacción contextual y resumen de varios hilos.",
    description:
      "Gemini en Gmail transforma la comunicación laboral al llevar la asistencia de IA directamente a tu bandeja de entrada. Desde redactar propuestas complejas hasta ponerte al día con largas conversaciones con clientes desde el móvil, la IA de Gmail reduce el trabajo de la bandeja de entrada sin perder tu voz auténtica.",
    keyAIFeatures: [
      "Ayúdame a escribir",
      "Resúmenes de correo (panel lateral)",
      "Respuestas inteligentes contextuales",
    ],
    overview:
      "La IA de Gmail funciona en la web y en el móvil, y utiliza el contexto de la correspondencia anterior para redactar respuestas, resumir cadenas con varios destinatarios y destacar los puntos de acción urgentes.",
    enterpriseValue:
      "Reduce el tiempo dedicado a redactar correos repetitivos en torno a un 35% y garantiza comunicaciones pulidas y alineadas con la marca, con plena protección de DLP y privacidad de datos empresariales.",
  },
  docs: {
    category: "Creación de contenido",
    tagline:
      "Escritura colaborativa, síntesis automática e ilustraciones generativas.",
    description:
      "Gemini en Google Docs actúa como un colaborador de investigación y edición siempre presente. Convierte la investigación no estructurada en briefings bien definidos, ajusta el tono y la extensión, y crea imágenes a medida dentro del propio lienzo.",
    keyAIFeatures: [
      "Ayúdame a escribir",
      "Resúmenes de documentos",
      "Ayúdame a crear una imagen",
      "Razonamiento en el panel lateral",
    ],
    overview:
      "Con el panel lateral de Gemini, Docs puede contrastar varios archivos de Google Drive, resumir respuestas de RFP de 50 páginas y generar al instante resúmenes ejecutivos a medida.",
    enterpriseValue:
      "Acelera la entrega de propuestas, estandariza la calidad de la documentación en los equipos globales y elimina el bloqueo del escritor.",
  },
  sheets: {
    category: "Análisis de datos",
    tagline:
      "Análisis de datos en lenguaje natural, lógica de fórmulas automática y mejor detección de patrones.",
    description:
      "Gemini en Google Sheets aporta inteligencia de datos semántica a las hojas de cálculo sin necesidad de SQL complejo ni expresiones regulares anidadas. Limpia exportaciones de CRM desordenadas, genera columnas de clasificación y pide cálculos personalizados en lenguaje claro.",
    keyAIFeatures: [
      "Análisis en el panel lateral",
      "Smart Fill mejorado",
      "Función AI",
    ],
    overview:
      "El Smart Fill mejorado detecta patrones de varias variables para normalizar direcciones, extraer sentimientos o formatear fechas automáticamente. La nueva función =AI() permite transformaciones generativas celda a celda bajo demanda.",
    enterpriseValue:
      "Permite que los perfiles no técnicos ejecuten depuración de datos avanzada, categorización y modelado de escenarios sin apoyo especializado de ingeniería de datos.",
  },
  meet: {
    category: "Videoconferencias",
    tagline:
      "Transcripción automática de reuniones, audio y vídeo de calidad de estudio y traducción en directo entre idiomas.",
    description:
      "Gemini en Google Meet revoluciona el trabajo híbrido. La IA puede capturar puntos de acción en tiempo real, generar iluminación de estudio profesional en cámaras básicas, traducir el audio en directo entre decenas de idiomas y responder preguntas sobre lo que te perdiste si te incorporaste tarde.",
    keyAIFeatures: [
      "Toma notas por mí",
      "Sonido, imagen e iluminación de estudio",
      "Subtítulos traducidos",
      "Audio adaptable",
      "Traducción de voz (en tiempo real)",
      "Pregunta a Gemini en Meet",
    ],
    overview:
      "Elimina la toma de notas manual con «Toma notas por mí», que guarda las notas y las transcripciones directamente en Google Docs con tareas de seguimiento automatizadas.",
    enterpriseValue:
      "Fomenta una colaboración global e inclusiva, salva las barreras de idioma entre filiales internacionales y evita que se pierda alguna decisión tras la llamada.",
  },
  chat: {
    category: "Mensajería de equipo",
    tagline:
      "Resumen de hilos, traducción automática entre idiomas y búsqueda de conocimiento del espacio de trabajo.",
    description:
      "Gemini en Google Chat evita que los equipos de alto ritmo pierdan el contexto en los espacios con tanta actividad. Ponte al día con más de 100 mensajes sin leer mediante resúmenes estructurados y colabora con equipos internacionales con traducción integrada sin fisuras.",
    keyAIFeatures: [
      "Panel lateral",
      "Resumir conversaciones",
      "Traducción automática",
    ],
    overview:
      "El panel lateral de Gemini en Chat ofrece un asistente permanente que puede localizar archivos, responder consultas de procedimiento y resumir bajo demanda las salas de incidentes activas.",
    enterpriseValue:
      "Reduce la fricción de la coordinación asíncrona y evita la fatiga por notificaciones en los canales de ingeniería y soporte con mucho tráfico.",
  },
  calendar: {
    category: "Agendado",
    tagline:
      "Asistencia de IA para agendar, preparación de reuniones y optimización del tiempo de los directivos.",
    description:
      "Gemini en Google Calendar ayuda a los equipos a reducir el coste de las reuniones, detectando conflictos, redactando órdenes del día y generando planes de seguimiento a partir de datos de proyecto dispersos.",
    keyAIFeatures: [
      "Asistente de agenda con IA",
      "Preparación de órdenes del día",
      "Optimización de conflictos de reunión",
    ],
    overview:
      "La IA de Calendar puede convertir un conjunto de notas de proyecto, restricciones de agenda y disponibilidad de los interesados en un plan de reunión limpio con puntos del orden del día y orientación sobre la asignación del tiempo.",
    enterpriseValue:
      "Mejora la productividad de los líderes al reducir la fricción de la agenda y garantizar que las reuniones de alto valor se preparen con contexto y acciones de seguimiento claras.",
  },
  forms: {
    category: "Feedback y recogida",
    tagline:
      "Generación inteligente de cuestionarios e inteligencia sobre respuestas para la feedback operativa.",
    description:
      "Gemini en Google Forms ayuda a los equipos a crear formularios de recogida precisos, enriquecer el diseño de las encuestas y resumir grandes conjuntos de respuestas sin trabajo de análisis manual.",
    keyAIFeatures: [
      "Creador de formularios con IA",
      "Resumen de respuestas",
      "Extracción de conclusiones",
    ],
    overview:
      "A partir de un briefing breve, Gemini puede redactar un formulario bien estructurado, añadir lógica de ramificación y presentar las conclusiones de las respuestas en lenguaje claro.",
    enterpriseValue:
      "Agiliza las encuestas a empleados, los ciclos de feedback de clientes y los flujos de recogida operativa, al tiempo que mejora la calidad de las respuestas y la rapidez de las conclusiones.",
  },
  tasks: {
    category: "Gestión del trabajo",
    tagline:
      "Clasificación y priorización con IA, y planificación de flujos de trabajo personales.",
    description:
      "Gemini en Google Tasks convierte notas, correos e hilos de chat dispersos en flujos de trabajo diarios estructurados, con orientación sobre prioridades y seguimientos.",
    keyAIFeatures: [
      "Planificación de tareas con IA",
      "Priorización",
      "Recomendación de acciones",
    ],
    overview:
      "La IA puede identificar tareas ocultas en conversaciones largas, priorizarlas por urgencia e impacto y convertirlas en listas de tareas accionables.",
    enterpriseValue:
      "Reduce el ruido operativo y ayuda a los equipos a convertir la comunicación fragmentada en planes listos para ejecutar.",
  },
  keep: {
    category: "Notas y conocimiento",
    tagline:
      "Captura de notas con IA, síntesis rápida y extracción de acciones a partir de ideas dispersas.",
    description:
      "Gemini en Google Keep ayuda a los equipos a capturar ideas, convertir notas en puntos de acción y resumir flujos de pensamiento sueltos en objetos de conocimiento más claros y útiles.",
    keyAIFeatures: [
      "Resúmenes de notas con IA",
      "Extracción de acciones",
      "Agrupación de ideas",
    ],
    overview:
      "La IA de Keep puede tomar un conjunto de notas o fragmentos de reunión y convertirlos en planes, resúmenes y listas de próximos pasos para ejecutarlos más rápido.",
    enterpriseValue:
      "Ayuda a los trabajadores del conocimiento a convertir pensamientos fugaces en resultados estructurados y operativos sin perder el contexto ni el impulso.",
  },
  appsheet: {
    category: "Aplicaciones a medida",
    tagline:
      "Generación de aplicaciones empresariales sin código y construcción automatizada de procesos con IA.",
    description:
      "La IA de AppSheet permite que los equipos describan un proceso de negocio en lenguaje natural y generen una aplicación operativa funcionando, conectada a los datos de Google Workspace.",
    keyAIFeatures: [
      "Generación de apps con IA",
      "Automatización de flujos de trabajo",
      "Diseño de procesos mediante prompts",
    ],
    overview:
      "Los usuarios pueden definir un flujo de trabajo o una necesidad operativa en lenguaje natural, y AppSheet usa la IA para generar apps, formularios y lógica de procesos que encajan con las operaciones empresariales.",
    enterpriseValue:
      "Extiende Workspace más allá de la colaboración y hacia la automatización operativa low-code, sin necesidad de grandes proyectos de software a medida.",
  },
  admin: {
    category: "Seguridad y gobernanza",
    tagline:
      "Gobernanza de la adopción de IA, analítica del tenant y visibilidad de las políticas empresariales.",
    description:
      "Las herramientas de gobernanza de Gemini Enterprise dan a los administradores la visibilidad, los controles y los informes necesarios para escalar la IA de forma segura en toda la organización.",
    keyAIFeatures: [
      "Paneles de uso de IA",
      "Aplicación de políticas",
      "Gobernanza de prompts y accesos",
    ],
    overview:
      "Los administradores pueden supervisar los patrones de uso de la IA, definir políticas de aprobación, inspeccionar los controles de acceso y garantizar que cada grupo de usuarios opere dentro de su perfil de riesgo aprobado.",
    enterpriseValue:
      "Hace que la adopción de IA sea medible, conforme a las políticas y gobernable operativamente en todos los despliegues de Workspace y Gemini.",
  },
  slides: {
    category: "Presentaciones",
    tagline:
      "Visualización de conceptos, creación de imágenes generativas y estilado automático de presentaciones.",
    description:
      "Gemini en Google Slides traduce las estrategias de negocio abstractas en narrativas visuales impactantes. Genera ilustraciones propias sin regalías con Imagen, elimina el fondo de las fotos con un clic y convierte documentos densos en esquemas de diapositivas.",
    keyAIFeatures: [
      "Panel lateral",
      "Generar una imagen (Nano Banana Pro)",
      "Eliminar fondos de imágenes",
    ],
    overview:
      "Los diseñadores y equipos de marketing pueden generar imágenes de stock alineadas con la marca, limpiar maquetas de producto y construir diseños de diapositivas usando el panel contextual de Gemini.",
    enterpriseValue:
      "Reduce drásticamente la dependencia de bancos de imágenes externos y agencias de diseño gráfico para propuestas comerciales y presentaciones de directorio rutinarias.",
  },
  vids: {
    category: "Creación de vídeo",
    tagline:
      "Generación de vídeo con IA, narración con voz sintética y edición automatizada de storyboards.",
    description:
      "Google Vids lleva la creación de vídeo con IA generativa al conjunto empresarial. Combinando la síntesis de vídeo Veo 3.1, locuciones con IA, avatares digitales y medios con licencia, Vids hace que producir vídeo sea tan accesible como escribir un documento.",
    keyAIFeatures: [
      "Acceso completo a las funciones de IA",
      "Generación de avatares",
      "Generación de vídeo (Veo 3.1)",
      "Generación de música en Vids",
    ],
    overview:
      "Los usuarios aportan un prompt o un Google Doc, y Vids construye automáticamente un storyboard, escribe un guion, elige el material de apoyo adecuado y renderiza un vídeo multimedia completo.",
    enterpriseValue:
      "Permite a los equipos de comunicación interna, incorporación de personal y ventas crear vídeos de formación y actualización de calidad de estudio en minutos en lugar de semanas.",
  },
  drive: {
    category: "Almacenamiento en la nube",
    tagline:
      "Comprensión profunda de PDF, síntesis de audio y clasificación automatizada de archivos empresariales.",
    description:
      "Gemini en Google Drive transforma el almacenamiento pasivo en la nube en un índice activo de inteligencia corporativa. Consulta miles de PDF, escucha briefings de audio generados a partir de documentos técnicos complejos y automatiza el etiquetado de metadatos.",
    keyAIFeatures: [
      "Panel lateral",
      "Analizar PDF",
      "Resúmenes de audio para PDF",
      "Clasificación con IA en Drive",
    ],
    overview:
      "Directamente desde la ventana de vista previa de Drive, Gemini puede analizar fichas técnicas de más de 100 páginas, extraer estados financieros de escaneos y generar resúmenes en audio estilo pódcast para revisarlos en el móvil.",
    enterpriseValue:
      "Libera los datos oscuros atrapados en PDF estáticos y documentos escaneados, mejorando la auditoría de cumplimiento y la velocidad de recuperación del conocimiento en toda la plantilla.",
  },
  notebooklm: {
    category: "Investigación y síntesis",
    tagline:
      "Tu asistente de investigación con IA personalizado y basado en tus fuentes, con resúmenes de audio y vídeo.",
    description:
      "NotebookLM es el entorno de investigación destacado de Google: piensa exclusivamente con los materiales que subes. Con soporte para hasta 50 fuentes por cuaderno, fundamentación profunda con citas, resúmenes interactivos de audio y vídeo, mapas mentales y protecciones empresariales de Model Armor, NotebookLM transforma la información en bruto en dominio estructurado.",
    keyAIFeatures: [
      "Cuadernos y fuentes",
      "Resúmenes de audio",
      "Resúmenes de vídeo",
      "Mapas mentales",
      "Cuestionarios y tarjetas",
      "Investigación profunda",
      "Model Armor",
    ],
    overview:
      "Sube PDF, Google Docs, Slides, URLs web y transcripciones de YouTube. NotebookLM los sintetiza sin riesgo de alucinaciones hacia datos web sin fundamentar, citando números de página concretos para cada afirmación.",
    enterpriseValue:
      "Permite a los equipos de estrategia, los asesores jurídicos y los directivos dominar la literatura compleja, auditar contratos y generar resúmenes ejecutivos con rastros de auditoría verificables.",
  },
};
