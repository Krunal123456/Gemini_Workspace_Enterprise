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
};
