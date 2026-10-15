import type { FeatureTranslation } from "@/lib/i18n/localize";

/** Spanish body copy, batch 3 (Gemini core platform features). */
export const featureProseES3: Record<string, FeatureTranslation> = {
  "gemini-chat": {
    description:
      "Usa la interfaz de chat de Gemini en Workspace y Gemini Enterprise, con modelos, límites, fundamentación y herramientas de creación específicos de cada edición.",
    whatItDoes:
      "Ofrece una superficie de inteligencia conversacional potenciada por los últimos modelos multimodales de Google para investigar, redactar, programar y sintetizar.",
    howItWorks:
      "Los usuarios escriben directamente a Gemini desde el navegador o la app móvil. El motor dirige las consultas al punto de control del modelo más adecuado, respetando los límites de protección de datos del tenant.",
  },
  "gemini-gemini-in-chrome": {
    description:
      "Usa Gemini dentro de Chrome para flujos de trabajo de navegación empresarial y síntesis de la página activa.",
    whatItDoes:
      "Integra la inteligencia conversacional directamente en la barra de direcciones y el panel lateral de Google Chrome para resumir páginas web y contrastar información.",
    howItWorks:
      "Lee el DOM de la pestaña activa del navegador (con controles de permisos empresariales) para extraer información, comparar especificaciones de proveedores y redactar resúmenes.",
  },
  "gemini-connectors": {
    description:
      "Conecta Gemini con fuentes de datos empresariales aprobadas, desde los conectores limitados de la app Gemini hasta el conjunto mejorado de Gemini Enterprise.",
    whatItDoes:
      "Permite que Gemini consulte herramientas empresariales de terceros como Jira, Confluence, Salesforce, SharePoint y Box.",
    howItWorks:
      "Los conectores indexan de forma segura los metadatos y archivos remotos en el Conocimiento Organizativo, respetando los permisos y las listas de control de acceso de cada origen.",
  },
  "gemini-grounded-responses": {
    description:
      "Fundamenta las respuestas de Gemini en el contenido de Workspace y, con Gemini Enterprise, en fuentes empresariales de terceros aprobadas.",
    whatItDoes:
      "Ancla las respuestas del modelo en documentación corporativa fáctica, con citas en las que se puede hacer clic y citas textuales.",
    howItWorks:
      "Usa generación aumentada por recuperación (RAG) para incorporar los pasajes internos relevantes en la ventana de contexto del modelo antes de sintetizar la respuesta.",
  },
  "gemini-web-grounding": {
    description:
      "Fundamenta las respuestas de Gemini con información web actual en las ediciones que lo admiten.",
    whatItDoes:
      "Recupera datos web externos en directo y actualizados para responder preguntas sobre eventos de última hora, mercados financieros y tendencias del sector.",
    howItWorks:
      "Ejecuta una recuperación web en tiempo real durante la inferencia para complementar el conocimiento interno.",
  },
  "gemini-ground-with-google-search": {
    description:
      "Usa la fundamentación con Google Search en Gemini y en las ediciones de Gemini Enterprise que la admiten.",
    whatItDoes:
      "Aplica el índice web orgánico de Google Search para verificar afirmaciones y enriquecer las respuestas del modelo con resultados de búsqueda citados.",
    howItWorks:
      "Aprovecha la infraestructura de clasificación de búsqueda de Google para seleccionar las fuentes web de mayor autoridad.",
  },
  "gemini-deep-research": {
    description:
      "Crea informes de investigación extensos y con fuentes en Gemini, y usa el agente de Investigación Profunda en Gemini Enterprise.",
    whatItDoes:
      "Despliega un agente de investigación autónomo que recorre decenas de fuentes, sintetiza contraargumentos y compila informes de más de 10 páginas con citas.",
    howItWorks:
      "Realiza consultas de búsqueda iterativas de varios pasos, analiza documentos web y empresariales de formato largo, y redacta un informe de nivel ejecutivo con citas.",
  },
  "gemini-enterprise-platform-agents": {
    description:
      "Crea, usa, gobierna y obtiene agentes en Gemini Enterprise.",
    whatItDoes:
      "Permite desplegar agentes de IA autónomos especializados que encadenan razonamientos, consultan API corporativas y completan flujos de trabajo operativos complejos.",
    howItWorks:
      "Los agentes aprovechan prompts de sistema, herramientas MCP adjuntas y el Conocimiento Organizativo para actuar de forma autónoma bajo permisos estrictos de administrador.",
  },
  "notebooklm-notebooks": {
    description:
      "Crea y organiza cuadernos de investigación dedicados a distintos proyectos y clientes.",
    whatItDoes:
      "Proporciona espacios de trabajo modulares para mantener las fuentes, los chats y las conclusiones generadas estrictamente segregados por asunto.",
    howItWorks:
      "Cada cuaderno opera con una base de datos vectorial y un contenedor de contexto aislados.",
  },
  "notebooklm-sources-per-notebook": {
    description:
      "Sube y adjunta hasta 50 fuentes por cuaderno entre PDF, Docs, Slides y URLs.",
    whatItDoes:
      "Permite una fundamentación con múltiples fuentes sobre decenas de documentos complementarios a la vez.",
    howItWorks:
      "Extrae el texto completo y los gráficos de cada fuente, construyendo un índice de citas integrado.",
  },
  "notebooklm-add-data-sources": {
    description:
      "Conecta archivos de Google Drive, PDF, archivos de texto, texto copiado, URLs web y transcripciones de YouTube.",
    whatItDoes:
      "Amplía las modalidades de entrada para ingerir enlaces web externos y transcripciones de vídeo junto a archivos locales.",
    howItWorks:
      "Analiza URLs y pistas de subtítulos de vídeo en tiempo real, convirtiéndolas en material de origen consultable.",
  },
  "notebooklm-chats": {
    description:
      "Preguntas y respuestas conversacionales fundamentadas estrictamente en las fuentes de tu cuaderno.",
    whatItDoes:
      "Permite explorar de forma conversacional los materiales subidos, sin alucinaciones sin fundamentar.",
    howItWorks:
      "Aplica restricciones estrictas de temperatura y recuperación para que las respuestas deriven exclusivamente del texto citado de las fuentes.",
  },
};
