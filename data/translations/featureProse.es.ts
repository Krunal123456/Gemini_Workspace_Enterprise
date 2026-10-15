import type { FeatureTranslation } from "@/lib/i18n/localize";

/**
 * Spanish body copy for `data/features.ts`, keyed by the stable `slug`.
 *
 * Split from the name-only map so translators can work through the catalog in
 * independent batches. `category` is never overwritten here: those values are
 * slug-like and drive filtering (see `featureCategoryLabels`).
 */
export const featureProseES: Record<string, FeatureTranslation> = {
  "gmail-help-me-write": {
    description:
      "Redacta, pule, acorta o amplía correos directamente en el compositor de Gmail con IA.",
    whatItDoes:
      "Convierte una lista rápida de ideas en correos profesionales y corteses, o adapta el tono de un borrador de informal a ejecutivo con un solo clic.",
    howItWorks:
      "Se integra de forma nativa en la ventana de redacción web y móvil de Gmail, y genera borradores a partir del contexto del prompt y del historial del hilo.",
  },
  "gmail-email-summaries-side-panel": {
    description:
      "Resume los hilos de correo largos en el panel lateral de Gmail y extrae los puntos de acción.",
    whatItDoes:
      "Sintetiza cadenas de correo con varios participantes en puntos concisos, resaltando los siguientes pasos, las preguntas sin resolver y las decisiones clave.",
    howItWorks:
      "El panel lateral de Gemini lee el historial del hilo activo y muestra un resumen estructurado sin modificar el cuerpo del correo.",
  },
  "gmail-contextual-smart-replies": {
    description:
      "Genera opciones de respuesta inteligente matizadas y contextuales a partir de todo el historial de la conversación.",
    whatItDoes:
      "Va más allá de las respuestas genéricas de tres palabras al redactar respuestas completas y conscientes de la situación, que reflejan los matices del hilo.",
    howItWorks:
      "Analiza los mensajes anteriores y sugiere respuestas completas de varias frases, adaptadas al estilo de escritura habitual del usuario.",
  },
  "gmail-smart-compose": {
    description:
      "Genera sugerencias de escritura a nivel de frase y de oración al redactar correos en Gmail.",
    whatItDoes:
      "Acelera la redacción de correos prediciendo las siguientes frases, finalizaciones y versiones concisas y pulidas de un mensaje.",
    howItWorks:
      "Usa modelado del lenguaje contextual sobre el borrador activo para sugerir la siguiente oración o frase en tiempo real.",
  },
  "docs-help-me-write": {
    description:
      "Genera borradores, reescribe secciones, cambia el tono y resume directamente en Google Docs.",
    whatItDoes:
      "Asiste en la creación de documentos desde cero o perfecciona borradores existentes con cambios de tono, ampliaciones y formato estructural.",
    howItWorks:
      "Un botón flotante interactivo y el atajo (`/`) activan el editor generativo en línea sin romper el flujo de escritura.",
  },
  "docs-document-summaries": {
    description:
      "Genera resúmenes ejecutivos de documentos e informes extensos con un solo clic.",
    whatItDoes:
      "Condensa propuestas de 50 páginas, whitepapers o fichas técnicas en un resumen ejecutivo o esquema de una página.",
    howItWorks:
      "Analiza la estructura, los encabezados y el cuerpo semántico del documento para extraer los argumentos y conclusiones principales.",
  },
  "docs-help-me-create-an-image": {
    description:
      "Genera imágenes e ilustraciones a medida directamente en Google Docs.",
    whatItDoes:
      "Genera imágenes de stock, diagramas conceptuales y cabeceras propias que se ajustan al contenido del documento mediante Imagen.",
    howItWorks:
      "Los usuarios describen la imagen y eligen estilos artísticos (fotografía, arte vectorial, boceto); la imagen se inserta directamente en el documento.",
  },
  "docs-side-panel": {
    description:
      "Contrasta archivos de Drive, haz preguntas sobre el contenido del documento y genera ideas en el panel lateral de Docs.",
    whatItDoes:
      "Mantiene un socio de pensamiento con IA permanente junto al lienzo del documento, capaz de leer archivos de Drive y responder preguntas contextuales.",
    howItWorks:
      "Hace referencia al texto del documento activo y a los documentos de Drive vinculados (`@archivo`) para sintetizar entre documentos.",
  },
  "workspace-enterprise-search": {
    description:
      "Busca en Gmail, Drive, Docs, Chat y otros recursos de Workspace con fundamentación empresarial consciente de permisos.",
    whatItDoes:
      "Permite que los empleados encuentren los archivos, hilos, documentos y decisiones correctos en toda la organización sin huntedarkar manualmente ni buscar en varias apps.",
    howItWorks:
      "Combina la indexación de Google Workspace con los límites de permisos empresariales y la clasificación de IA para devolver los grupos de respuestas más relevantes.",
  },
  "sheets-side-panel": {
    description:
      "Analiza datos de hojas de cálculo, haz preguntas sobre métricas y crea tablas dinámicas desde el panel lateral.",
    whatItDoes:
      "Traduce preguntas en lenguaje natural como «¿Qué región tuvo la mayor tasa de abandono en el segundo trimestre?» en hallazgos y gráficos de datos estructurados.",
    howItWorks:
      "Inspecciona los datos tabulares activos de la hoja, ejecuta resúmenes estadísticos y genera fórmulas y visualizaciones bajo demanda.",
  },
  "sheets-enhanced-smart-fill": {
    description:
      "Detecta patrones automáticamente, normaliza direcciones, extrae sentimientos y limpia datos desordenados de hojas de cálculo.",
    whatItDoes:
      "Amplía la finalización tradicional de patrones con razonamiento de IA, gestionando clasificaciones semánticas difusas sin regex ni fórmulas.",
    howItWorks:
      "Observa ejemplos del usuario en columnas adyacentes e infiere la regla de transformación subyacente, rellenando todo el conjunto de datos con un clic.",
  },
  "sheets-ai-function": {
    description:
      "Usa funciones de IA generativa nativas dentro de las fórmulas de Google Sheets.",
    whatItDoes:
      "Lleva la inteligencia generativa directamente a las celdas mediante `=AI(\"prompt\", [rango])`, lo que permite generar texto de forma programática en varias filas.",
    howItWorks:
      "Evalúa el prompt para cada fila durante el cálculo de la hoja y produce texto, traducción o categorización de forma dinámica.",
  },
  "meet-take-notes-for-me": {
    description:
      "Toma notas de la reunión automáticamente, resume las discusiones y registra los puntos de acción en Google Docs.",
    whatItDoes:
      "Captura el audio completo de la discusión y crea un Google Doc estructurado con resúmenes ejecutivos, decisiones tomadas y siguientes pasos asignados.",
    howItWorks:
      "Escucha mediante transcripción de voz en tiempo real y actualiza continuamente un documento colaborativo compartido enlazado en la invitación de calendario.",
  },
  "meet-studio-sound-look-lighting": {
    description:
      "Resolución de vídeo mejorada con IA, iluminación de calidad de estudio y mejora de la claridad del audio.",
    whatItDoes:
      "Mejora la captura en cámaras básicas y la iluminación deficiente de la sala, elevándola a vídeo de calidad de emisión con acústica de estudio.",
    howItWorks:
      "Usa renderizado neuronal en el dispositivo y en la nube para compensar salas oscuras, contraluz y reverberación del audio.",
  },
  "meet-translated-captions": {
    description:
      "Subtítulos cerrados traducidos en tiempo real en decenas de idiomas globales.",
    whatItDoes:
      "Permite que los participantes lean subtítulos en directo en su idioma preferido mientras los demás hablan en su lengua materna.",
    howItWorks:
      "Transmite el voz en tiempo real a través de la canalización de traducción neuronal de Google, superponiendo subtítulos de baja latencia en pantalla.",
  },
  "meet-adaptive-audio": {
    description:
      "Únete a reuniones con varios portátiles en la misma sala sin acoplamiento de micrófono ni ecos de audio.",
    whatItDoes:
      "Sincroniza varios micrófonos y altavoces en una misma sala de reuniones física para crear un sistema de audio de sala ad hoc.",
    howItWorks:
      "Detecta la posición acústica espacial entre portátiles cercanos y enruta dinámicamente el audio del hablante activo sin chirridos.",
  },
  "meet-generate-background": {
    description:
      "Crea fondos de reunión únicos generados con IA a partir de prompts de texto en Google Meet.",
    whatItDoes:
      "Sustituye los fondos reales desordenados por espacios de oficina sintéticos, escenas artísticas o fondos con la marca de la empresa.",
    howItWorks:
      "Genera imágenes fotorrealistas mediante Imagen y segmenta la silueta del usuario con alta precisión.",
  },
  "meet-watermarking": {
    description:
      "Muestra marcas de agua discretas con el correo de los asistentes en las pantallas compartidas y los vídeos para evitar fugas.",
    whatItDoes:
      "Superpone identificadores de espectador discretos y persistentes en las presentaciones confidenciales para disuadir de capturas de pantalla y grabaciones no autorizadas.",
    howItWorks:
      "Renderiza dinámicamente la dirección de correo y la marca de tiempo del asistente sobre el flujo de vídeo en el lado del cliente.",
  },
  "meet-speech-translation-real-time": {
    description:
      "Doblaje simultáneo de voz a voz durante las videollamadas.",
    whatItDoes:
      "Traduce las palabras habladas en tiempo real y vuelve a sintetizar el audio con el tono vocal del hablante en otros idiomas.",
    howItWorks:
      "Procesa el audio entrante mediante reconocimiento de voz de baja latencia, traducción neuronal automática y síntesis con clonación de voz.",
  },
  "meet-ask-gemini-in-meet": {
    description:
      "Ponte al día de lo que se ha hablado si te incorporas tarde o consulta la transcripción de la reunión en tiempo real.",
    whatItDoes:
      "Permite que quienes se incorporan tarde pregunten «¿Qué dijo Sarah sobre el presupuesto?» o «¿Qué decisiones se han tomado hasta ahora?» sin interrumpir.",
    howItWorks:
      "Consulta la transcripción activa de la llamada en memoria desde el panel lateral y ofrece respuestas privadas e instantáneas.",
  },
  "meet-attendance-tracking": {
    description:
      "Registra automáticamente en Google Sheets las horas de llegada, la duración y las direcciones de correo de los participantes.",
    whatItDoes:
      "Genera una hoja de cálculo automatizada con la duración exacta de asistencia de cada participante inmediatamente después de que termina la llamada.",
    howItWorks:
      "El servidor de reuniones registra la telemetría y envía al anfitrión un informe de asistencia estandarizado por correo y Drive.",
  },
  "chat-side-panel": {
    description:
      "Interacciona con Gemini en Google Chat para buscar documentos, redactar respuestas y resolver preguntas.",
    whatItDoes:
      "Lleva la asistencia persistente de IA a los espacios de equipo y los mensajes directos para investigar y redactar.",
    howItWorks:
      "El panel lateral se comunica con Google Drive y el historial de mensajes de Chat, y responde con enlaces a las fuentes.",
  },
  "chat-summarise-conversations": {
    description:
      "Resume los mensajes no leídos en espacios de gran volumen e hilos de conversación.",
    whatItDoes:
      "Permite que quienes vuelven de vacaciones o se apartan para una reunión se pongan al día de más de 50 mensajes en 10 segundos.",
    howItWorks:
      "Agrupa los mensajes no leídos del espacio en clusters temáticos con conclusiones con viñetas y decisiones resaltadas.",
  },
  "chat-automatic-translation": {
    description:
      "Traduce automáticamente los mensajes de chat entre varios idiomas.",
    whatItDoes:
      "Detecta los mensajes en otros idiomas dentro de los espacios de chat y ofrece una traducción integrada al instante en la lengua del usuario.",
    howItWorks:
      "Ejecuta traducción neuronal automática con detección de idioma en tiempo real.",
  },
  "calendar-ai-scheduling-assistant": {
    description:
      "Usa Gemini para encontrar franjas adecuadas, redactar órdenes del día y optimizar el calendario ante las restricciones de los interesados.",
    whatItDoes:
      "Convierte datos de agenda dispersos en un plan de calendario listo para directivos, con bloques de tiempo, esquemas del orden del día y tareas de seguimiento.",
    howItWorks:
      "Combina la disponibilidad de los asistentes, la conciencia de zonas horarias, la prioridad de la reunión y el contexto del proyecto para generar opciones y prompts de agenda recomendados.",
  },
};
