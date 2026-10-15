import type { FeatureTranslation } from "@/lib/i18n/localize";

/** Spanish body copy, batch 4 (NotebookLM research outputs). */
export const featureProseES4: Record<string, FeatureTranslation> = {
  "notebooklm-audio-overviews": {
    description:
      "Genera pódcastes de audio conversacionales que analizan en profundidad tus fuentes subidas, con dos presentadores de IA.",
    whatItDoes:
      "Crea discusiones de audio con dos presentadores que explican conceptos clave, debaten relaciones de compromiso y sintetizan hallazgos complejos.",
    howItWorks:
      "Sintetiza un guion de diálogo inteligente y genera habla natural con respiración, pausas y cadencia humanas.",
  },
  "notebooklm-video-overviews": {
    description:
      "Genera resúmenes en vídeo de las fuentes de tu cuaderno con ayuda visual de diapositivas.",
    whatItDoes:
      "Combina el audio conversacional de IA con tarjetas visuales sincronizadas, gráficos de datos y citas de las fuentes.",
    howItWorks:
      "Genera diapositivas visuales alineadas que avanzan a medida que la narración explica cada hito conceptual.",
  },
  "notebooklm-reports": {
    description:
      "Genera informes analíticos estructurados, guías de estudio y documentos de briefing para directivos.",
    whatItDoes:
      "Compila informes estructurados de varias páginas organizados en resúmenes ejecutivos, análisis detallados y conclusiones.",
    howItWorks:
      "Extrae los temas centrales de las fuentes y redacta un texto riguroso con citas.",
  },
  "notebooklm-flashcards": {
    description:
      "Genera automáticamente tarjetas interactivas de estudio y repaso a partir de tus fuentes.",
    whatItDoes:
      "Extrae términos clave, definiciones, fórmulas y hechos históricos en tarjetas de repaso interactivas de dos caras.",
    howItWorks:
      "Identifica pares de datos en los documentos subidos y genera mazos de estudio con repetición espaciada.",
  },
  "notebooklm-quizzes": {
    description:
      "Genera cuestionarios de opción múltiple y conceptuales con corrección y explicaciones automáticas.",
    whatItDoes:
      "Comprueba la comprensión del usuario formulando preguntas de diagnóstico que hacen referencia directa a pasajes de las fuentes.",
    howItWorks:
      "Genera preguntas de escenario complejas con explicaciones detalladas de las respuestas correctas e incorrectas.",
  },
  "notebooklm-mind-maps": {
    description:
      "Visualiza las relaciones y la jerarquía entre conceptos con mapas mentales dinámicos e interactivos.",
    whatItDoes:
      "Convierte párrafos densos y fuentes fragmentadas en un grafo de nodos interactivo que ilustra las conexiones conceptuales.",
    howItWorks:
      "Realiza extracción de relaciones entre entidades y genera estructuras de grafo jerárquicas con nodos ampliables.",
  },
  "notebooklm-deep-research": {
    description:
      "Lanza investigaciones autónomas y profundizadas de múltiples fuentes dentro de NotebookLM.",
    whatItDoes:
      "Realiza síntesis entre fuentes sobre decenas de documentos, detectando correlaciones y contradicciones sutiles.",
    howItWorks:
      "Ejecuta agentes de razonamiento iterativos de varias pasadas sobre el corpus completo de fuentes del cuaderno.",
  },
  "notebooklm-data-tables": {
    description:
      "Extrae datos tabulares estructurados a partir de PDF y fuentes de texto no estructuradas.",
    whatItDoes:
      "Encuentra números, fechas y métricas dispersos por las páginas y los organiza en tablas limpias y exportables.",
    howItWorks:
      "Un analizador multimodal de tablas reconstruye encabezados, filas y relaciones, validando la continuidad numérica.",
  },
  "notebooklm-infographics": {
    description:
      "Genera infografías visuales que resaltan estadísticas e hitos clave de las fuentes.",
    whatItDoes:
      "Traduce hallazgos complejos en carteles de resumen visual atractivos, apropiados para informes y presentaciones.",
    howItWorks:
      "Selecciona las métricas clave y los hitos históricos, y los organiza en composiciones visuales limpias con iconos.",
  },
  "notebooklm-chat-customisation": {
    description:
      "Personaliza el tono, la personalidad y la longitud de las respuestas del chat de NotebookLM.",
    whatItDoes:
      "Permite que los usuarios indiquen a NotebookLM que responda como un coach ejecutivo, un auditor técnico o un tutor amable.",
    howItWorks:
      "Inyecta las instrucciones de orientación del usuario junto con las restricciones de fundamentación en las fuentes.",
  },
  "notebooklm-watermark-removal": {
    description:
      "Elimina las marcas de agua predeterminadas de NotebookLM en los informes y presentaciones exportados de las ediciones empresariales.",
    whatItDoes:
      "Permite que los equipos empresariales apliquen su propia marca corporativa a los informes y presentaciones generados.",
    howItWorks:
      "La licencia empresarial omite automáticamente las marcas del producto en las exportaciones a PDF y Slides.",
  },
  "notebooklm-model-armor": {
    description:
      "Filtrado de seguridad activo de Model Armor que protege NotebookLM frente a inyecciones de prompts y filtraciones de datos sensibles.",
    whatItDoes:
      "Protege la investigación empresarial sensible frente a inyecciones indirectas de prompts maliciosos ocultas en los PDF subidos.",
    howItWorks:
      "Ejecuta filtros de inspección en tiempo real sobre los documentos ingeridos y los prompts del usuario antes de pasarlos al modelo.",
  },
};
