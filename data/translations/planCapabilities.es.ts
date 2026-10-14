/**
 * Spanish overlay for the `coreCapabilities` block on each plan.
 *
 * These strings repeat heavily across plans (e.g. "See current edition
 * documentation" appears 5 times), so a single shared value map is far more
 * compact than duplicating them per plan. `applySharedPhrases` translates any
 * value it recognises and leaves the rest untouched.
 */
export const planCoreCapabilityPhrasesES: Record<string, string> = {
  "Limits vary by feature; check Google's current edition table":
    "Los límites varían según la función; consulta la tabla de ediciones actual de Google",
  "Workspace Studio availability and limits depend on current edition rules; no Gemini Enterprise MCP entitlement":
    "La disponibilidad y los límites de Workspace Studio dependen de las reglas de edición actuales; sin acceso a MCP de Gemini Enterprise",
  "Google and third-party organizational data":
    "Datos organizativos de Google y de terceros",
  "Check current edition documentation for feature-specific limits":
    "Consulta la documentación de la edición actual para los límites por función",
  "See current Gemini Enterprise documentation for logging details":
    "Consulta la documentación actual de Gemini Enterprise para los detalles de registro",
  "See current edition documentation": "Consulta la documentación de la edición actual",
  "Models and limits depend on the Gemini feature and surface":
    "Los modelos y límites dependen de la función y la superficie de Gemini",
  "Higher Gemini Notebook access; feature limits vary":
    "Acceso ampliado a Gemini Notebook; los límites de funciones varían",
  "Gemini Enterprise assistant and agent platform":
    "Asistente y plataforma de agentes de Gemini Enterprise",
  "Check Google's current Business edition comparison for event and export coverage":
    "Consulta la comparación actual de ediciones Business de Google para la cobertura de eventos y exportaciones",
  "Check current Gemini Notebook availability for this edition":
    "Consulta la disponibilidad actual de Gemini Notebook para esta edición",
  "Full data connector ecosystem": "Ecosistema completo de conectores de datos",
  "Expanded Gemini access across eligible Workspace apps and the Gemini app":
    "Acceso ampliado a Gemini en las apps de Workspace elegibles y en la app Gemini",
  "Workspace Intelligence uses enabled sources the user can access":
    "Workspace Intelligence utiliza las fuentes activadas a las que el usuario puede acceder",
  "Workspace sources are separate from the Gemini Enterprise connector ecosystem":
    "Las fuentes de Workspace son distintas del ecosistema de conectores de Gemini Enterprise",
  "Gemini features in eligible Workspace apps and the Gemini app":
    "Funciones de Gemini en las apps de Workspace elegibles y en la app Gemini",
  "Workspace Intelligence sources under administrator and user access controls":
    "Fuentes de Workspace Intelligence bajo los controles de acceso del administrador y del usuario",
  "Check Google's current Enterprise edition comparison for event and export coverage":
    "Consulta la comparación actual de ediciones Enterprise de Google para la cobertura de eventos y exportaciones",
  "Priority access to the latest Gemini models":
    "Acceso prioritario a los últimos modelos Gemini",
  "Agent Marketplace and developer tools":
    "Agent Marketplace y herramientas de desarrollo",
  "Enterprise-grade security and compliance controls":
    "Controles de seguridad y cumplimiento de nivel empresarial",
  "See current edition documentation for included controls":
    "Consulta la documentación de la edición actual para los controles incluidos",
  "Gemini in Gmail, limited Workspace app features, and the Gemini app":
    "Gemini en Gmail, funciones limitadas de las apps de Workspace y la app Gemini",
  "Standard Gemini app access; models and limits vary by feature":
    "Acceso estándar a la app Gemini; los modelos y límites varían según la función",
  "Eligible Workspace context follows feature access and user permissions":
    "El contexto elegible de Workspace depende del acceso a la función y los permisos del usuario",
  "Standard Gemini Notebook access; feature limits vary":
    "Acceso estándar a Gemini Notebook; los límites de funciones varían",
  "Workspace source access is not the Gemini Enterprise connector ecosystem":
    "El acceso a fuentes de Workspace no es el ecosistema de conectores de Gemini Enterprise",
  "Workspace security controls; some protections require domain verification":
    "Controles de seguridad de Workspace; algunas protecciones requieren verificación del dominio",
  "Enhanced security & shared drive controls":
    "Seguridad mejorada y controles de unidades compartidas",
  "Includes Google Vault and advanced endpoint management; verify current edition controls":
    "Incluye Google Vault y gestión avanzada de dispositivos; verifica los controles de la edición actual",
  "Google Cloud Search covers Google services; this is separate from Gemini Enterprise connectors":
    "Google Cloud Search cubre los servicios de Google; es distinto de los conectores de Gemini Enterprise",
  "Enterprise-grade Workspace security and management controls":
    "Controles de seguridad y gestión de Workspace de nivel empresarial",
  "Google Cloud Search integrations have separate eligibility; not the Gemini Enterprise connector ecosystem":
    "Las integraciones de Google Cloud Search tienen elegibilidad aparte; no son el ecosistema de conectores de Gemini Enterprise",
  "Advanced Workspace security and compliance controls; check the full edition matrix":
    "Controles avanzados de seguridad y cumplimiento de Workspace; consulta la matriz completa de ediciones",
  "Higher limits for selected advanced Workspace AI features":
    "Límites más altos para funciones de IA de Workspace seleccionadas",
  "See current AI Expanded Access limits":
    "Consulta los límites actuales de AI Expanded Access",
  "Uses the underlying Workspace edition's access controls":
    "Utiliza los controles de acceso de la edición de Workspace subyacente",
  "Feature-specific limits vary; check the current Google guide":
    "Los límites varían por función; consulta la guía actual de Google",
  "See current Workspace edition and add-on details":
    "Consulta los detalles actuales de la edición de Workspace y del complemento",
  "Uses the underlying Workspace edition's Workspace source access":
    "Utiliza el acceso a fuentes de Workspace de la edición subyacente",
  "Not a standalone agent platform": "No es una plataforma de agentes autónoma",
  "Uses the underlying Workspace edition's security controls":
    "Utiliza los controles de seguridad de la edición de Workspace subyacente",
  "Uses the underlying Workspace edition's admin logging":
    "Utiliza el registro de administración de la edición de Workspace subyacente",
  "Gemini model access; priority access is listed for higher editions":
    "Acceso a modelos Gemini; el acceso prioritario se incluye en ediciones superiores",
  "Select, segment-relevant connectors":
    "Conectores seleccionados relevantes para el segmento",
  "Basic agent governance and administration":
    "Gobernanza y administración básicas de agentes",
  "See the current edition comparison for included controls":
    "Consulta la comparación actual de ediciones para los controles incluidos",
  "Gemini Notebook is not currently included":
    "Gemini Notebook no está incluido actualmente",
  "Gemini Enterprise features for eligible frontline users":
    "Funciones de Gemini Enterprise para usuarios de primera línea elegibles",
  "Access to agents provisioned by an administrator":
    "Acceso a los agentes aprovisionados por un administrador",
  "Gemini in Gmail, Docs, Sheets, Slides, Drive, and Meet":
    "Gemini en Gmail, Documentos, Hojas de cálculo, Presentaciones, Drive y Meet",
  "Standard Gemini business model access with enterprise data protections":
    "Acceso estándar a modelos comerciales de Gemini con protección de datos empresarial",
  "Grounds on user Workspace files, emails, and meetings within permission boundaries":
    "Fundamentado en archivos, correos y reuniones de Workspace del usuario dentro de sus límites de permisos",
  "Standard research and drafting capabilities; subject to edition feature limits":
    "Capacidades estándar de investigación y redacción; sujetas a los límites de funciones de la edición",
  "Included with standard Gemini Notebook access; feature limits vary":
    "Incluido con acceso estándar a Gemini Notebook; los límites de funciones varían",
  "Workspace sources (Gmail, Docs, Drive, Sheets, Slides)":
    "Fuentes de Workspace (Gmail, Documentos, Drive, Hojas de cálculo, Presentaciones)",
  "Standard Workspace Studio agent access under administrator governance":
    "Acceso estándar a agentes de Workspace Studio bajo la gobernanza del administrador",
  "Workspace commercial data protection: zero customer data training, ISO/SOC certifications":
    "Protección de datos comerciales de Workspace: cero entrenamiento con datos de clientes, certificaciones ISO/SOC",
  "Standard Google Workspace admin audit logs and license tracking":
    "Registros de auditoría estándar del administrador de Google Workspace y seguimiento de licencias",
  "Full unrestricted Gemini assistance across all Google Workspace applications":
    "Asistencia completa y sin restricciones de Gemini en todas las aplicaciones de Google Workspace",
  "Priority access to frontier Gemini models with highest enterprise usage limits":
    "Acceso prioritario a modelos de frontera Gemini con los límites de uso empresarial más altos",
  "Comprehensive grounding across enterprise Workspace files, communications, and data":
    "Fundamentación integral en archivos, comunicaciones y datos de Workspace de la empresa",
  "Extended deep research limits and advanced document synthesis":
    "Límites ampliados de investigación profunda y síntesis avanzada de documentos",
  "Full Gemini Notebook access with enterprise grounding and source synthesis":
    "Acceso completo a Gemini Notebook con fundamentación empresarial y síntesis de fuentes",
  "Full Workspace source integration with advanced search grounding":
    "Integración completa de fuentes de Workspace con fundamentación de búsqueda avanzada",
  "Advanced Workspace Studio agent governance, automation flows, and customization":
    "Gobernanza avanzada de agentes de Workspace Studio, flujos de automatización y personalización",
  "Enterprise data protection, HIPAA/SOC/ISO compliance, zero customer data training":
    "Protección de datos empresariales, cumplimiento de HIPAA/SOC/ISO, cero entrenamiento con datos de clientes",
  "Comprehensive administrative logging, BigQuery export, and compliance auditing":
    "Registro administrativo integral, exportación a BigQuery y auditoría de cumplimiento",
  "Specialized meeting transcription, summarization, and chat intelligence":
    "Transcripción, resúmenes y funciones inteligentes especializadas para reuniones y chat",
  "Dedicated speech-to-text, translation, and meeting summarization models":
    "Modelos dedicados de voz a texto, traducción y resúmenes de reuniones",
  "Grounds meeting notes on live audio streams and Chat room conversation context":
    "Fundamenta las notas de reuniones en flujos de audio en directo y el contexto de las conversaciones de chat",
  "Focused on meeting recap and conversation thread synthesis":
    "Enfocado en la recopilación de reuniones y la síntesis de hilos de conversación",
  "Generated meeting notes export directly to Google Docs and Drive":
    "Las notas de reuniones generadas se exportan directamente a Google Docs y Drive",
  "Google Meet and Google Chat source integration":
    "Integración con fuentes de Google Meet y Google Chat",
  "Automated meeting note-taker agent in Google Meet":
    "Agente automatizado para tomar notas en reuniones de Google Meet",
  "Encrypted meeting audio processing with zero customer data retention for model training":
    "Procesamiento cifrado del audio de las reuniones con retención cero para entrenamiento de modelos",
  "Admin audit logging for meeting recording and automated note artifacts":
    "Registro de auditoría de administración para grabaciones de reuniones y artefactos de notas automatizados",
  "Specialized privacy-preserving classification and labeling models":
    "Modelos especializados de clasificación y etiquetado que preservan la privacidad",
  "Trained on enterprise security and data classification taxonomies":
    "Entrenados en taxonomías de seguridad empresarial y clasificación de datos",
  "Evaluates organizational Drive metadata and document content without data leakage":
    "Evalúa metadatos y contenido de documentos de Drive de la organización sin fuga de datos",
  "Continuous compliance and DLP posture analysis across organizational files":
    "Análisis continuo de cumplimiento y postura de DLP en los archivos de la organización",
  "Governs access permissions for files cited in NotebookLM or Gemini chats":
    "Gobierna los permisos de acceso para archivos citados en NotebookLM o chats de Gemini",
  "Deep integration with Google Drive, Google Vault, and Cloud Identity":
    "Integración profunda con Google Drive, Google Vault y Cloud Identity",
  "Autonomous classification rules and policy enforcement triggers":
    "Reglas autónomas de clasificación y activadores de aplicación de políticas",
  "Highest zero-trust enterprise security with client-side encryption label integration":
    "Máxima seguridad empresarial de confianza cero con integración de etiquetas de cifrado del lado del cliente",
  "Complete security investigation tool integration and BigQuery audit exports":
    "Integración completa con la herramienta de investigación de seguridad y exportaciones de auditoría a BigQuery",
};
