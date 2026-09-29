import type { FeatureTranslation } from "@/lib/i18n/localize";

/**
 * Spanish overlay for `data/features.ts`, keyed by the stable `slug`.
 *
 * Only `name` is translated here. It is the highest-value field in the
 * catalog: it appears on feature cards, filter chips, the command palette,
 * search results and detail-page headings, so covering it localizes most of the
 * visible catalog surface.
 *
 * `category` is deliberately NOT overwritten — those values are slug-like
 * ("gmail", "meet") and drive filtering. Their display labels live in
 * `featureCategoryLabels` below.
 */
export const featuresES: Record<string, FeatureTranslation> = {
  "gemini-chat": { name: "Chat" },
  "gemini-slide-generation-in-gemini-app": {
    name: "Generación de diapositivas en la app Gemini",
  },
  "gemini-gemini-in-chrome": { name: "Gemini en Chrome" },
  "gemini-connectors": { name: "Conectores" },
  "gemini-grounded-responses": { name: "Respuestas fundamentadas" },
  "gemini-web-grounding": { name: "Fundamentación web" },
  "gemini-ground-with-google-search": { name: "Fundamentar con Google Search" },
  "gemini-priority-access-to-latest-gemini-models": {
    name: "Acceso prioritario a los últimos modelos Gemini",
  },
  "gemini-generate-media-images-and-videos": {
    name: "Generar contenido multimedia (imágenes y vídeos)",
  },
  "gemini-deep-research": { name: "Investigación profunda" },
  "gemini-enterprise-platform-stored-organisational-knowledge": {
    name: "Conocimiento organizativo almacenado",
  },
  "gemini-enterprise-platform-custom-mcp-server-connectors": {
    name: "Conectores de servidores MCP personalizados",
  },
  "gemini-enterprise-platform-custom-built-connectors": {
    name: "Conectores creados a medida",
  },
  "gemini-enterprise-platform-cloud-audit-logging": {
    name: "Registro de auditoría en Cloud",
  },
  "gemini-enterprise-platform-agents": { name: "Agentes" },

  "gmail-help-me-write": { name: "Ayúdame a escribir (Gmail)" },
  "gmail-email-summaries-side-panel": { name: "Resúmenes de correo (panel lateral)" },
  "gmail-contextual-smart-replies": { name: "Respuestas inteligentes contextuales" },
  "gmail-smart-compose": { name: "Redacción inteligente" },

  "docs-help-me-write": { name: "Ayúdame a escribir (Docs)" },
  "docs-document-summaries": { name: "Resúmenes de documentos" },
  "docs-help-me-create-an-image": { name: "Ayúdame a crear una imagen" },
  "docs-side-panel": { name: "Panel lateral (Docs)" },

  "workspace-enterprise-search": { name: "Búsqueda empresarial de Workspace" },
  "sheets-side-panel": { name: "Panel lateral (Sheets)" },
  "sheets-enhanced-smart-fill": { name: "Smart Fill mejorado" },

  "meet-take-notes-for-me": { name: "Toma notas por mí" },
  "meet-studio-sound-look-lighting": {
    name: "Sonido, imagen e iluminación de estudio",
  },
  "meet-translated-captions": { name: "Subtítulos traducidos" },
  "meet-adaptive-audio": { name: "Audio adaptable" },
  "meet-generate-background": { name: "Generar fondo" },
  "meet-watermarking": { name: "Marca de agua" },
  "meet-speech-translation-real-time": {
    name: "Traducción de voz (en tiempo real)",
  },
  "meet-ask-gemini-in-meet": { name: "Pregunta a Gemini en Meet" },
  "meet-attendance-tracking": { name: "Registro de asistencia" },

  "chat-side-panel": { name: "Panel lateral (Google Chat)" },
  "chat-summarise-conversations": { name: "Resumir conversaciones" },
  "chat-automatic-translation": { name: "Traducción automática" },

  "calendar-ai-scheduling-assistant": { name: "Asistente de agenda con IA" },
  "forms-ai-form-builder": { name: "Creador de formularios con IA" },
  "forms-response-analytics": { name: "Analítica de respuestas" },
  "tasks-ai-prioritization": { name: "Priorización de tareas con IA" },
  "keep-ai-note-summaries": { name: "Resúmenes de notas con IA" },
  "appsheet-ai-app-generation": { name: "Generación de apps con IA" },
  "admin-ai-usage-governance-dashboard": {
    name: "Panel de gobernanza del uso de IA",
  },

  "slides-side-panel": { name: "Panel lateral (Slides)" },
  "slides-generate-an-image-nano-banana-pro": {
    name: "Generar una imagen (Nano Banana Pro)",
  },
  "slides-remove-image-backgrounds": { name: "Eliminar fondos de imágenes" },

  "vids-full-access-to-ai-features": {
    name: "Acceso completo a las funciones de IA (Google Vids)",
  },
  "vids-avatar-generation": { name: "Generación de avatares" },
  "vids-video-generation-veo-3-1": { name: "Generación de vídeo (Veo 3.1)" },
  "vids-music-generation-in-vids": { name: "Generación de música en Vids" },

  "drive-side-panel": { name: "Panel lateral (Google Drive)" },
  "drive-analyse-pdfs": { name: "Analizar PDF" },
  "drive-audio-overviews-for-pdfs": { name: "Resúmenes de audio para PDF" },
  "drive-ai-classification-in-drive": { name: "Clasificación con IA en Drive" },

  "notebooklm-base-limits": { name: "Límites de NotebookLM" },
  "notebooklm-audio-overviews-notebooks-queries-sources-per-notebook": {
    name: "Resúmenes de audio (consultas de cuaderno)",
  },
  "notebooklm-notebooks": { name: "Cuadernos" },
  "notebooklm-sources-per-notebook": { name: "Fuentes por cuaderno" },
  "notebooklm-add-data-sources": { name: "Añadir fuentes de datos" },
  "notebooklm-chats": { name: "Chats" },
  "notebooklm-audio-overviews": { name: "Resúmenes de audio" },
  "notebooklm-video-overviews": { name: "Resúmenes de vídeo" },
  "notebooklm-cinematic-video-overviews": {
    name: "Resúmenes en vídeo cinematográficos",
  },
  "notebooklm-reports": { name: "Informes" },
  "notebooklm-flashcards": { name: "Tarjetas" },
  "notebooklm-quizzes": { name: "Cuestionarios" },
  "notebooklm-mind-maps": { name: "Mapas mentales" },
  "notebooklm-deep-research": { name: "Investigación profunda (NotebookLM)" },
  "notebooklm-data-tables": { name: "Tablas de datos" },
  "notebooklm-infographics": { name: "Infografías" },
  "notebooklm-slide-decks-and-revisions": {
    name: "Presentaciones y revisiones",
  },
  "notebooklm-chat-customisation": { name: "Personalización del chat" },
  "notebooklm-advanced-sharing-and-notebook-analytics": {
    name: "Uso compartido avanzado y analítica de cuadernos",
  },
  "notebooklm-watermark-removal": { name: "Eliminación de marca de agua" },
  "notebooklm-chat-with-published-notebooks": {
    name: "Chat con cuadernos publicados",
  },
  "notebooklm-create-and-publish-notebooks": {
    name: "Crear y publicar cuadernos",
  },
  "notebooklm-usage-audit-logging": {
    name: "Registro de auditoría de uso (NotebookLM)",
  },
  "notebooklm-model-armor": { name: "Model Armor (NotebookLM)" },

  "workspace-studio-flow-executions-per-month": {
    name: "Ejecuciones de flujo al mes",
  },
  "google-labs-flow-credits-per-month": {
    name: "Créditos de flujo al mes",
  },

  "google-labs-whisk-image-to-video": { name: "Whisk (imagen a vídeo)" },
  "google-labs-project-mariner-us-only": { name: "Project Mariner (solo EE. UU.)" },
  "google-labs-antigravity": { name: "Antigravity" },

  "developer-tools-gemini-cli": { name: "Gemini CLI" },
  "developer-tools-gemini-code-assist": { name: "Gemini Code Assist" },

  "security-gemini-app-with-enterprise-grade-data-protection": {
    name: "App Gemini con protección de datos de nivel empresarial",
  },
  "security-vault-ediscovery": { name: "Vault (eDiscovery)" },
  "security-dlp": { name: "DLP (prevención de pérdida de datos)" },
  "security-context-aware-access": {
    name: "Acceso consciente del contexto (confianza cero)",
  },
  "security-data-regions-basic-single-policy": {
    name: "Regiones de datos (básicas, una sola política)",
  },
  "security-enterprise-data-regions-per-ou-policies": {
    name: "Regiones de datos empresariales (políticas por OU)",
  },
  "security-client-side-encryption": {
    name: "Cifrado del lado del cliente (CSE)",
  },
  "security-gemini-ai-security-protections": {
    name: "Protecciones de seguridad de Gemini AI",
  },
  "security-vault-dlp-data-regions-cover-labs-services": {
    name: "Vault, DLP y regiones de datos cubren los servicios de Labs",
  },
  "security-model-armor": { name: "Model Armor" },
  "security-enterprise-grade-security-and-compliance": {
    name: "Seguridad y cumplimiento de nivel empresarial",
  },
  "security-data-residency": { name: "Residencia de datos" },
  "security-customer-managed-encryption-keys-cmek": {
    name: "Claves de cifrado gestionadas por el cliente (CMEK)",
  },
  "security-vpc-service-controls": { name: "VPC Service Controls (VPC-SC)" },
  "security-hipaa-compliance": { name: "Cumplimiento de HIPAA" },
};

/**
 * Display labels for the slug-like `category` field.
 *
 * Filtering still matches on the raw slugs; these are render-time labels only.
 */
export const featureCategoryLabels: Record<string, string> = {
  gemini: "Gemini",
  gmail: "Gmail",
  docs: "Docs",
  sheets: "Sheets",
  meet: "Meet",
  chat: "Google Chat",
  calendar: "Calendar",
  forms: "Forms",
  tasks: "Tasks",
  keep: "Keep",
  appsheet: "AppSheet",
  admin: "Administración",
  slides: "Slides",
  vids: "Vids",
  drive: "Drive",
  notebooklm: "NotebookLM",
  studio: "Workspace Studio",
  labs: "Google Labs",
  "developer-tools": "Herramientas de desarrollo",
  security: "Seguridad",
};
