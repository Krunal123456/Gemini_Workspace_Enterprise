/**
 * Sentence-level Spanish copy for page-level chrome that still lives inline in
 * the page components.
 *
 * These are keyed by the exact English source string, so a page can render
 * `t("Comparison scope")` instead of an inline literal. English is the source
 * of truth: `translatePhrase` returns the key itself when no Spanish entry
 * exists, so an untranslated string degrades to English rather than breaking.
 */
export const phrasesES: Record<string, string> = {
  // ---- breadcrumbs / generic ----
  "Home": "Inicio",
  "Features": "Funciones",
  "Models": "Modelos",
  "Compare": "Comparar",
  "Pricing": "Precios",
  "Enterprise": "Empresas",
  "Security": "Seguridad",
  "Articles": "Artículos",
  "Plans": "Planes",
  "Apps": "Apps",
  "Applications": "Aplicaciones",
  "Workspace app": "App de Workspace",
  "Connector": "Conector",
  "Governance": "Gobernanza",
  "Workspace intelligence atlas": "Atlas de inteligencia de Workspace",
  "One governed ecosystem": "Un ecosistema gobernado",
  "Select a node": "Selecciona un nodo",
  "context layer": "capa de contexto",
  "Example": "Ejemplo",
  "Loading comparison tools...": "Cargando herramientas de comparación...",
  "Loading connectors…": "Cargando conectores…",

  // ---- features index ----
  "Google Workspace & Gemini AI Features Directory":
    "Directorio de funciones de IA de Google Workspace y Gemini",
  "Comprehensive Directory • {n} AI Capabilities":
    "Directorio completo · {n} capacidades de IA",
  "Google Workspace & Gemini AI Features":
    "Funciones de IA de Google Workspace y Gemini",
  "Search, filter, and inspect every generative AI feature across Gmail, Docs, Sheets, Meet, NotebookLM, Vids, and the Gemini Enterprise Chat App.":
    "Busca, filtra e inspecciona cada función de IA generativa en Gmail, Docs, Sheets, Meet, NotebookLM, Vids y la app de chat de Gemini Enterprise.",
  "Export Features": "Exportar funciones",
  "Filter by:": "Filtrar por:",
  "All": "Todas",
  "Enterprise Exclusive": "Exclusivo de empresas",
  "Loading feature catalog...": "Cargando el catálogo de funciones...",

  // ---- feature detail ----
  "Back to Features Directory": "Volver al directorio de funciones",
  "Inspect feature": "Inspeccionar función",
  "Google Workspace App": "App de Google Workspace",
  "What It Does": "Qué hace",
  "How It Works": "Cómo funciona",
  "Included capabilities": "Capacidades incluidas",
  "Key Use Cases": "Casos de uso principales",
  "Use case": "Caso de uso",
  "Where it is used": "Dónde se utiliza",
  "How to use it": "Cómo usarla",
  "Plan Availability Matrix": "Matriz de disponibilidad por plan",
  "Plan Name": "Nombre del plan",
  "Category": "Categoría",
  "Status": "Estado",
  "Limits & Notes": "Límites y notas",
  "Available": "Disponible",
  "Unavailable": "No disponible",
  "Not mapped": "Sin asignar",
  "Confirm with Google": "Confirma con Google",
  "Enterprise Considerations": "Consideraciones empresariales",
  "Security & Compliance": "Seguridad y cumplimiento",
  "Related Features": "Funciones relacionadas",
  "Source coverage": "Cobertura de fuentes",
  "Availability notes": "Notas de disponibilidad",
  "Restrictions": "Restricciones",
  "Open Google reference": "Abrir la referencia de Google",
  "Google references": "Referencias de Google",
  "Official documentation": "Documentación oficial",
  "See the plan matrix for edition-specific limits.":
    "Consulta la matriz de planes para conocer los límites por edición.",

  // ---- apps index / detail ----
  "Back to all Applications": "Volver a todas las aplicaciones",
  "Feature Catalog": "Catálogo de funciones",
  "Compare In Matrix": "Comparar en la matriz",
  "Plan Availability": "Disponibilidad por plan",
  "Enterprise Data Protection": "Protección de datos empresarial",
  "Enterprise Strategic Value": "Valor estratégico empresarial",
  "Loading application...": "Cargando la aplicación...",

  // ---- articles ----
  "Back to all Articles": "Volver a todos los artículos",
  "Key Executive Takeaways": "Conclusiones clave para directivos",
  "Features Referenced in this Guide": "Funciones mencionadas en esta guía",
  "Official sources": "Fuentes oficiales",
  "Read article": "Leer el artículo",
  "Key Takeaways": "Ideas clave",
  "min read": "min de lectura",

  // ---- plans detail ----
  "Back to all Plans": "Volver a todos los planes",
  "Commercial Rate": "Tarifa comercial",
  "Starting at": "Desde",
  "Target Audience:": "Público objetivo:",
  "Highlighted Entitlements": "Préstamos destacados",
  "Core AI & Platform Capabilities": "Capacidades principales de IA y plataforma",
  "Technical Architecture": "Arquitectura técnica",
  "Generative AI Integration": "Integración de IA generativa",
  "Grounding & Citations": "Fundamentación y citas",
  "Model Checkpoint Access": "Acceso a puntos de control del modelo",
  "Deep Research Quota": "Cuota de investigación profunda",
  "Gemini Notebook access": "Acceso a Gemini Notebook",
  "Security & administration": "Seguridad y administración",
  "Audit & activity records": "Registros de auditoría y actividad",
  "Official plan references": "Referencias oficiales del plan",
  "Model a rollout scenario": "Modela un escenario de despliegue",
  "Inspect all in side-by-side matrix": "Inspecciona todo en la matriz lado a lado",

  // ---- compare ----
  "listed plan options": "opciones de plan publicadas",
  "The matrix organizes listed plan options and feature notes. It is a research aid, not a vendor ranking or a substitute for Google's current edition documentation.":
    "La matriz organiza las opciones de plan publicadas y las notas de las funciones. Es una ayuda de investigación, no una clasificación de proveedores ni un sustituto de la documentación de ediciones actual de Google.",
  "This platform brings together {features} catalog entries and {plans} currently listed plan options, with side-by-side comparisons and planning tools. Coverage and source detail vary by feature, so check the linked Google documentation before making a purchasing or compliance decision.":
    "Esta plataforma reúne {features} entradas de catálogo y {plans} opciones de plan publicadas actualmente, con comparativas lado a lado y herramientas de planificación. La cobertura y el detalle de las fuentes varían según la función, así que consulta la documentación de Google enlazada antes de tomar una decisión de compra o de cumplimiento.",
  "Workspace + Gemini Enterprise · {n} listed plan options":
    "Workspace + Gemini Enterprise · {n} opciones de plan publicadas",
  "Explore the current catalog, compare plan notes, and model a rollout using assumptions you can adjust.":
    "Explora el catálogo actual, compara las notas de los planes y modela un despliegue con supuestos que puedes ajustar.",
  "Comparison scope": "Alcance de la comparación",
  "Compare plan details against your requirements.":
    "Compara los detalles de los planes con tus requisitos.",
  "Gemini Plan Comparison": "Comparativa de planes de Gemini",
  "The matrix organizes listed plan options":
    "La matriz organiza las opciones de plan publicadas",

  // ---- security ----
  "Product controls and configuration": "Controles y configuración del producto",
  "Google Workspace integrates Gemini AI directly into your collaboration workflows. From contextual email assistance in Gmail to research in NotebookLM, explore Gemini capabilities across {n} Workspace app surfaces.":
    "Google Workspace integra Gemini IA directamente en tus flujos de trabajo colaborativos. Desde la asistencia contextual en el correo de Gmail hasta la investigación en NotebookLM, explora las capacidades de Gemini en {n} superficies de aplicaciones de Workspace.",
  "The right model depends on the work: advanced reasoning, agentic coding, cost-efficient throughput, or real-time voice. Release status and model IDs below follow Google's public catalog; API prices are separate from Workspace and Gemini Enterprise licensing.":
    "El modelo adecuado depende del trabajo: razonamiento avanzado, programación con agentes, rendimiento rentable o voz en tiempo real. El estado de lanzamiento y los IDs de modelo que siguen siguen el catálogo público de Google; los precios de la API son independientes de las licencias de Workspace y Gemini Enterprise.",
  "Back to connector catalogue": "Volver al catálogo de conectores",
  "Open Agent Standards": "Estándares abiertos de agentes",
  "Model Context Protocol (MCP) & ": "Model Context Protocol (MCP) y ",
  "Open standard architecture for secure tool calling, private database grounding, and multi-step organizational workflows. Gemini Enterprise bridges conversational reasoning with your internal systems through standardized MCP servers.":
    "Arquitectura estándar abierta para invocación segura de herramientas, fundamentación en bases de datos privadas y flujos de trabajo organizativos de varios pasos. Gemini Enterprise conecta el razonamiento conversacional con tus sistemas internos mediante servidores MCP estandarizados.",
  "Cataloged availability across {n} listed plans. Unmapped entries need source review.":
    "Disponibilidad catalogada en {n} planes publicados. Las entradas sin asignar requieren revisar las fuentes.",
  "Compare edition limits and see which Google Workspace or Gemini Enterprise plans include {app} AI.":
    "Compara los límites por edición y consulta qué planes de Google Workspace o Gemini Enterprise incluyen la IA de {app}.",
  "See all {n} listed plans": "Ver los {n} planes publicados",
  "Compare all {n} listed plans": "Compara los {n} planes publicados",
  "Compare {n} listed plans": "Compara los {n} planes publicados",
  "Compare {plan} in the {n}-Plan Matrix": "Compara {plan} en la matriz de {n} planes",
  "Enterprise connectors & indexing": "Conectores empresariales e indexación",
  "Workspace context and data sources": "Contexto de Workspace y fuentes de datos",
  "These connectors are available through Google Cloud Integration Connectors. Listing a connector here does not mean it is automatically enabled for Gemini Enterprise; deployment, permissions, region, and connector availability must be verified in Google Cloud.":
    "Estos conectores están disponibles a través de Google Cloud Integration Connectors. Aparecer un conector aquí no significa que esté habilitado automáticamente para Gemini Enterprise; el despliegue, los permisos, la región y la disponibilidad deben verificarse en Google Cloud.",
  "{n} catalogued connectors from the Google Cloud documentation.":
    "{n} conectores catalogados de la documentación de Google Cloud.",
  "Verify which administrators, users, connectors, and AI features are governed by each policy.":
    "Verifica qué administradores, usuarios, conectores y funciones de IA rige cada política.",
  "Which users, admins, connectors, and AI features does each policy govern?":
    "¿Qué usuarios, administradores, conectores y funciones de IA rige cada política?",
  "Custom connector and MCP access": "Acceso a conectores personalizados y MCP",
  "Gemini plans the execution sequence, evaluates available MCP schemas, and generates structured tool-call arguments.":
    "Gemini planifica la secuencia de ejecución, evalúa los esquemas MCP disponibles y genera argumentos estructurados para las llamadas a herramientas.",
  "Match the tools your team uses to Gemini Enterprise connectors for an instant readiness check.":
    "Relaciona las herramientas que usa tu equipo con los conectores de Gemini Enterprise para una comprobación instantánea de preparación.",
  // ---- security review table ----
  "Data residency": "Residencia de datos",
  "Google Workspace Enterprise Data Regions can apply policy settings to supported services.":
    "Google Workspace Enterprise Data Regions puede aplicar la configuración de políticas a los servicios admitidos.",
  "Confirm which data, services, and regions are covered by your selected edition and configuration.":
    "Confirma qué datos, servicios y regiones cubre la edición y la configuración que has seleccionado.",
  "DLP": "DLP",
  "Workspace administrators can configure DLP policies for supported apps and content.":
    "Los administradores de Workspace pueden configurar políticas de DLP para las apps y el contenido admitidos.",
  "Check which content types and AI surfaces are covered by your policies and selected edition.":
    "Comprueba qué tipos de contenido y qué superficies de IA cubren tus políticas y la edición seleccionada.",
  "CMEK": "CMEK",
  "Customer-managed or client-side encryption is available for supported services and editions.":
    "El cifrado gestionado por el cliente o del lado del cliente está disponible para los servicios y ediciones admitidos.",
  "Confirm supported apps, data types, regions, and administrative prerequisites before relying on it.":
    "Confirma las apps, los tipos de datos, las regiones y los requisitos administrativos admitidos antes de depender de ello.",
  "Model Armor": "Model Armor",
  "Model Armor can screen Gemini Enterprise prompts and responses using administrator-configured templates.":
    "Model Armor puede filtrar los prompts y las respuestas de Gemini Enterprise mediante plantillas configuradas por el administrador.",
  "It is supported on all Gemini Enterprise editions at no additional cost. It must be configured, can add latency, and does not mask PII.":
    "Está admitido en todas las ediciones de Gemini Enterprise sin coste adicional. Debe configurarse, puede añadir latencia y no oculta información personal identificable.",
  "VPC Service Controls": "VPC Service Controls",
  "VPC Service Controls define service perimeters for supported Google Cloud resources.":
    "VPC Service Controls define perímetros de servicio para los recursos de Google Cloud admitidos.",
  "Confirm whether the Gemini service and workflows you plan to use are supported inside your perimeter.":
    "Confirma si el servicio de Gemini y los flujos de trabajo que planeas usar están admitidos dentro de tu perímetro.",
  "Retention": "Retención",
  "Google Vault policies apply to supported Workspace services and data.":
    "Las políticas de Google Vault se aplican a los servicios y datos de Workspace admitidos.",
  "Check whether the specific AI inputs, outputs, and files you care about are covered by Vault.":
    "Comprueba si Vault cubre las entradas, salidas y archivos de IA concretos que te importan.",
  "Audit logs": "Registros de auditoría",
  "Workspace and Google Cloud products expose audit logs with different event coverage.":
    "Los productos de Workspace y Google Cloud ofrecen registros de auditoría con una cobertura de eventos diferente.",
  "Check which events are available, how to export them, and the retention period for your service.":
    "Comprueba qué eventos están disponibles, cómo exportarlos y el periodo de retención de tu servicio.",
  "Access policies": "Políticas de acceso",
  "Workspace and Google Cloud provide access controls for supported services and resources.":
    "Workspace y Google Cloud ofrecen controles de acceso para los servicios y recursos admitidos.",
  "Are the relevant AI inputs, outputs, and files covered by Vault policies?":
    "¿Las políticas de Vault cubren las entradas, salidas y archivos de IA relevantes?",
  "Are prompt and response templates configured, and what is the failure behavior?":
    "¿Están configuradas las plantillas de prompts y respuestas y cuál es el comportamiento ante fallos?",
  "Gemini Enterprise Security & Governance Guide":
    "Guía de seguridad y gobernanza de Gemini Enterprise",
  "Review Google Workspace and Gemini Enterprise security controls, edition requirements, configuration questions, and official privacy documentation.":
    "Revisa los controles de seguridad de Google Workspace y Gemini Enterprise, los requisitos por edición, las preguntas de configuración y la documentación oficial de privacidad.",
  "Control": "Control",
  "Confirm for your service and edition": "Confirma para tu servicio y edición",
  "Check Google's compliance documentation": "Consulta la documentación de cumplimiento de Google",
  "Open Google source": "Abrir la fuente de Google",

  "Annual contracts": "Contratos anuales",
  "Start with a pilot": "Empieza con un piloto",
  "Consolidate your stack": "Consolida tu stack",
  "your setup": "tu configuración",
  "Understand the security controls available for ":
    "Comprende los controles de seguridad disponibles para ",
  "Architected for enterprise scale, ": "Diseñado para la escala empresarial, ",
  "grounding": "fundamentación",
  "& governance.": "y la gobernanza.",
  "Seven parts of the blueprint, ordered from identity to audit.":
    "Siete partes del plano, ordenadas de la identidad a la auditoría",
  "MarketStar is a premier global enterprise go-to-market partner. We designed this intelligence platform to give technology leaders, architects, and procurement officers total transparency into Google Workspace AI capabilities, plans, connectors, and security controls.":
    "MarketStar es un socio global premier de go-to-market empresarial. Diseñamos esta plataforma de inteligencia para que los líderes tecnológicos, los arquitectos y los responsables de compras tengan total transparencia sobre las capacidades de IA de Google Workspace, los planes, los conectores y los controles de seguridad.",
  "As Google continues to add AI capabilities across Workspace and Gemini Enterprise, procurement teams need clear information about which features belong to each edition and what limits apply.":
    "A medida que Google sigue añadiendo capacidades de IA en Workspace y Gemini Enterprise, los equipos de compras necesitan información clara sobre qué funciones pertenecen a cada edición y qué límites se aplican.",
  "Feature notes link to Google product and technical documentation where available. Source coverage varies by entry.":
    "Las notas de las funciones enlazan a la documentación de producto y técnica de Google cuando está disponible. La cobertura de fuentes varía según la entrada.",
  "We highlight governance and privacy controls described in Google's documentation. Contract terms and compliance scope depend on the service and subscription.":
    "Destacamos los controles de gobernanza y privacidad descritos en la documentación de Google. Las condiciones contractuales y el alcance del cumplimiento dependen del servicio y la suscripción.",
  "MarketStar provides full-lifecycle deployment advisory, from initial pilot sizing and ROI justification to global domain rollout.":
    "MarketStar ofrece asesoría de despliegue de ciclo completo, desde el dimensionamiento inicial del piloto y la justificación del ROI hasta el despliegue global de dominios.",
  "Understand the security controls available for your setup.":
    "Comprende los controles de seguridad disponibles para tu configuración.",
  "Review the controls Google documents for Workspace with Gemini and Gemini Enterprise.":
    "Revisa los controles que Google documenta para Workspace con Gemini y Gemini Enterprise.",
  "Availability depends on product, edition, region, and administrator configuration.":
    "La disponibilidad depende del producto, la edición, la región y la configuración del administrador.",
  "Read the applicable data protection terms":
    "Consulta las condiciones de protección de datos aplicables",
  "Workspace AI privacy": "Privacidad de la IA en Workspace",
  "Gemini Enterprise privacy": "Privacidad en Gemini Enterprise",
  "Architecture Blueprint": "Plano de la arquitectura",
  "A seven-part security review": "Una revisión de seguridad en siete partes",
  "A conceptual map of controls to review. The services, editions, and configurations that support each control vary.":
    "Un mapa conceptual de los controles que debes revisar. Los servicios, las ediciones y las configuraciones que admiten cada control varían.",
  "Admin & Governance": "Administración y gobernanza",
  "Enterprise controls for regulated AI deployment":
    "Controles empresariales para el despliegue de IA regulado",
  "Questions to validate before rollout": "Preguntas que debes validar antes del despliegue",
  "Enterprise Grade AI": "IA de nivel empresarial",
  "Architected for enterprise scale, grounding & governance.":
    "Diseñado para la escala empresarial, la fundamentación y la gobernanza.",
  "Gemini Enterprise can ground work in Google and third-party sources with administrative and identity controls.":
    "Gemini Enterprise puede fundamentar el trabajo en fuentes de Google y de terceros con controles administrativos y de identidad.",
  "Available connectors, permissions, and behavior depend on the edition, source, and configuration.":
    "Los conectores, permisos y comportamientos disponibles dependen de la edición, el origen y la configuración.",
  "Build readiness plan": "Crear un plan de preparación",
  "The 3 Pillars of Gemini Enterprise": "Los 3 pilares de Gemini Enterprise",
  "Foundational Principles": "Principios fundamentales",
  "Enterprise Grounding": "Fundamentación empresarial",
  "Knowledge Integration": "Integración del conocimiento",
  "Connector Examples": "Ejemplos de conectores",
  "Plan Comparison": "Comparativa de planes",
  "Security & Governance": "Seguridad y gobernanza",
  "Connector readiness check": "Comprobación de preparación de conectores",
  "Data Terms & Model Armor": "Condiciones de datos y Model Armor",
  "Explore {n} Connectors": "Explora {n} conectores",
  "See all connector specifications": "Ver todas las especificaciones de conectores",
  "Learn About MCP & Agents": "Más sobre MCP y agentes",
  "View Supported Connectors": "Ver los conectores admitidos",
  "Review Security Topics": "Revisar los temas de seguridad",
  "Read Strategic Insights": "Leer perspectivas estratégicas",
  "Deploying Gemini Enterprise across your organization?":
    "¿Vas a desplegar Gemini Enterprise en toda tu organización?",
  "Compare Enterprise Editions": "Comparar ediciones empresariales",
  "Verify edition support, region, and setup with Google":
    "Verifica con Google el soporte por edición, la región y la configuración",

  // ---- connectors / agents ----
  "Gemini Enterprise enables grounded retrieval across third-party software, data warehouses, and custom tools. Every query is filtered through your organization's user permissions and authentication tokens.":
    "Gemini Enterprise permite la recuperación fundamentada en software de terceros, almacenes de datos y herramientas personalizadas. Cada consulta se filtra según los permisos de usuario de tu organización y sus tokens de autenticación.",
  "Sources checked September 28, 2026. Product availability and terms can change; follow the linked Google pages for the latest details.":
    "Fuentes consultadas el 28 de septiembre de 2026. La disponibilidad del producto y sus condiciones pueden cambiar; consulta las páginas de Google enlazadas para ver los detalles más recientes.",
  "Google states that Workspace data used with Gemini is not reviewed by humans or used to train generative AI models outside your domain without permission. For Gemini Enterprise Business, Standard, and Plus, Google says customer data is not used to train Google models or models for other customers. Review the governing terms for your service and subscription.":
    "Google afirma que los datos de Workspace utilizados con Gemini no son revisados por personas ni se usan para entrenar modelos de IA generativa fuera de tu dominio sin permiso. Para Gemini Enterprise Business, Standard y Plus, Google indica que los datos de los clientes no se utilizan para entrenar modelos de Google ni modelos de otros clientes. Revisa las condiciones aplicables a tu servicio y suscripción.",
  "Security teams should verify how identity, data access, retention, and audit controls apply to each AI workflow.":
    "Los equipos de seguridad deben verificar cómo se aplican los controles de identidad, acceso a datos, retención y auditoría a cada flujo de trabajo de IA.",
  "Enterprise readiness depends on source permissions, administrator configuration, and the documented controls for the edition you choose.":
    "La preparación empresarial depende de los permisos de origen, la configuración del administrador y los controles documentados de la edición que elijas.",
  "Connector availability varies by edition and setup. Test permission-aware retrieval with your selected sources, representative accounts, and real access rules before rollout.":
    "La disponibilidad de los conectores varía según la edición y la configuración. Prueba la recuperación consciente de permisos con tus orígenes, cuentas representativas y reglas de acceso reales antes del despliegue.",
  "Summarize long email threads in the Gmail side panel and extract action items.":
    "Resume los hilos de correo largos en el panel lateral de Gmail y extrae los puntos de acción.",
  "Enterprise Connectors Hub": "Centro de conectores empresariales",
  "Connect Gemini to your": "Conecta Gemini con tus",
  "Browse the full integration catalogue.":
    "Explora el catálogo completo de integraciones.",
  "Check connector readiness": "Comprueba la preparación del conector",
  "Compare Plans Now": "Compara los planes ahora",
  "Back to Enterprise Architecture": "Volver a la arquitectura empresarial",
  "System Architecture": "Arquitectura del sistema",
  "User Query & Intent": "Consulta e intención del usuario",
  "Grounded Synthesis": "Síntesis fundamentada",
  "Multi-Step Reasoning Workflows": "Flujos de razonamiento en varios pasos",
  "Autonomous Agents": "Agentes autónomos",
  "Model Context Protocol (MCP) &": "Model Context Protocol (MCP) y",
  "Secure MCP Gateway": "Puerta de enlace MCP segura",
  "Custom Local & Remote MCP Servers":
    "Servidores MCP locales y remotos personalizados",
  "Standard JSON-RPC protocol compliance":
    "Cumplimiento del protocolo JSON-RPC estándar",
  "How Gemini Orchestrates MCP Tools":
    "Cómo Gemini orquesta herramientas MCP",
  "Automatic schema discovery and typing in Gemini prompts":
    "Descubrimiento y tipado automático de esquemas en los prompts de Gemini",
  "Granular capability gating by department and organizational unit (OU)":
    "Control granular de capacidades por departamento y unidad organizativa (OU)",
  "Comprehensive audit trails written to Cloud Logging":
    "Registros de auditoría completos escritos en Cloud Logging",
  "Human-in-the-loop approval step before external state mutation":
    "Paso de aprobación humana antes de modificar el estado externo",
  "Compatible with Gemini Enterprise Plus standalone editions":
    "Compatible con las ediciones independientes Gemini Enterprise Plus",
  "View Pre-Built Connectors": "Ver los conectores prediseñados",
  "Gemini 2.5 Reasoner": "Gemini 2.5 Reasoner",

  // ---- models ----
  "Gemini Models Catalog & Pricing Comparison":
    "Catálogo de modelos Gemini y comparación de precios",
  "Model stack": "Stack de modelos",
  "Gemini models for the modern enterprise stack.":
    "Modelos de Gemini para el stack empresarial moderno.",
  "The right model depends on the work: advanced reasoning, agentic coding, cost-efficient throughput, or real-time voice.":
    "El modelo adecuado depende del trabajo: razonamiento avanzado, programación con agentes, rendimiento rentable o voz en tiempo real.",
  "Release status and model IDs below follow Google's public catalog; API prices are separate from Workspace and Gemini Enterprise licensing.":
    "El estado de lanzamiento y los IDs de modelo que siguen siguen el catálogo público de Google; los precios de la API son independientes de las licencias de Workspace y Gemini Enterprise.",
  "Model status and pricing": "Estado y precios de los modelos",
  "Google Gemini API models · catalog checked Sep 24, 2026":
    "Modelos de la API de Google Gemini · catálogo verificado el 24 de septiembre de 2026",
  "Model fit by workload": "Adecuación del modelo por carga de trabajo",
  "Workload": "Carga de trabajo",
  "Gemini API estimator · per 1M tokens":
    "Estimador de la API de Gemini · por 1M de tokens",
  "Estimated usage": "Uso estimado",
  "Input tokens": "Tokens de entrada",
  "Output tokens": "Tokens de salida",
  "Gemini 3.8 Flash baseline": "Referencia de Gemini 3.8 Flash",
  "Estimated total": "Total estimado",
  "Google API pricing": "Precios de la API de Google",
  "Official references": "Referencias oficiales",
  "Official model details": "Detalles oficiales del modelo",
  "Google model catalog": "Catálogo de modelos de Google",

  "Source notes": "Notas de fuentes",
  "Plans, regional prices, quotas, and feature availability can change. Use these Google pages to confirm details for your location and subscription before making a purchase decision.":
    "Los planes, los precios regionales, las cuotas y la disponibilidad de funciones pueden cambiar. Usa estas páginas de Google para confirmar los detalles de tu ubicación y suscripción antes de tomar una decisión de compra.",
  "Google Workspace pricing": "Precios de Google Workspace",
  "Gemini Enterprise editions": "Ediciones de Gemini Enterprise",
  "AI Expanded Access": "AI Expanded Access",
  "Compare these side-by-side to see how editions differ in limits, connectors, and storage.":
    "Compara estasELS lado a lado para ver cómo difieren las ediciones en límites, conectores y almacenamiento.".replace("ELS", "ediciones"),
  "Every tool execution passes through tenant identity, permission checks, and policy boundaries before reaching a live system.":
    "Cada ejecución de herramienta pasa por la identidad del tenant, las comprobaciones de permisos y los límites de las políticas antes de llegar a un sistema real.",
  "The enterprise MCP gateway verifies the user's OAuth tokens, enforces ACL policies, and safely executes approved tools.":
    "La puerta de enlace MCP empresarial verifica los tokens OAuth del usuario, aplica las políticas de ACL y ejecuta de forma segura las herramientas aprobadas.",
  "Results are returned with verifiable citations, structured tabular output, or completed transactional writes back to the source system.":
    "Los resultados se devuelven con citas verificables, salida tabular estructurada o escrituras transaccionales completadas de vuelta al sistema de origen.",
  "Developers can build custom MCP servers in TypeScript or Python using standard SDKs. Host them on Cloud Run or on-premises infrastructure.":
    "Los desarrolladores pueden crear servidores MCP personalizados en TypeScript o Python con SDK estándar. Alójalos en Cloud Run o en tu propia infraestructura.",
  "This catalog is a research aid. Confirm edition-specific entitlements and contract terms with Google before making a purchase decision.":
    "Este catálogo es una ayuda de investigación. Confirma con Google los derechos por edición y las condiciones contractuales antes de tomar una decisión de compra.",
  "Annual commitment rate per user per month; billing cadence depends on your subscription terms.":
    "Tarifa con compromiso anual por usuario y mes; la cadencia de facturación depende de las condiciones de tu suscripción.",
  "Checked September 28, 2026. Pricing, feature access, and limits can change; use these Google pages for current terms.":
    "Consultado el 28 de septiembre de 2026. Los precios, el acceso a funciones y los límites pueden cambiar; usa estas páginas de Google para ver las condiciones actuales.",
  "MCP and agent capabilities depend on the Gemini product, edition, and configuration. Verify Google documentation for your specific setup.":
    "Las capacidades de MCP y de los agentes dependen del producto, la edición y la configuración de Gemini. Verifica la documentación de Google para tu configuración concreta.",
  "Google documents product-specific data protections for Gemini Enterprise. Model Armor is available on all editions at no additional cost.":
    "Google documenta protecciones de datos específicas de producto para Gemini Enterprise. Model Armor está disponible en todas las ediciones sin coste adicional.",
  "MarketStar helps Fortune 500 and high-growth enterprises design custom connectors, configure MCP environments, and prepare for measurable AI adoption.":
    "MarketStar ayuda a empresas Fortune 500 y de alto crecimiento a diseñar conectores personalizados, configurar entornos MCP y prepararse para una adopción de IA medible.",
  "See exactly which Google Workspace edition or Gemini Enterprise plan unlocks AI capabilities inside your favorite apps.":
    "Consulta exactamente qué edición de Google Workspace o plan de Gemini Enterprise desbloquea las capacidades de IA en tus aplicaciones favoritas.",
  "Check the side-by-side plan comparison tool to see how Gemini Enterprise Standard and Gemini Enterprise Plus differ in quotas and connector access.":
    "Consulta la herramienta de comparativa de planes lado a lado para ver en qué se diferencian Gemini Enterprise Standard y Gemini Enterprise Plus en cuotas y acceso a conectores.",
  "Certification and regulatory coverage applies to specific Google services and use cases. Confirm your exact service, data location, and intended use with Google.":
    "La certificación y la cobertura regulatoria se aplican a servicios y casos de uso concretos de Google. Confirma con Google tu servicio exacto, la ubicación de los datos y el uso previsto.",
  "Enterprise agents don't just output text; they complete workflows across systems. From reconciling financial records in BigQuery to provisioning new employees in the HRIS, agents act autonomously within defined boundaries.":
    "Los agentes empresariales no solo generan texto: completan flujos de trabajo entre sistemas. Desde conciliar registros financieros en BigQuery hasta dar de alta a nuevos empleados en el RR. HH., los agentes actúan de forma autónoma dentro de límites definidos.",
  "WORKSPACE AUTOMATION AND AGENTS": "AUTOMATIZACIÓN Y AGENTES DE WORKSPACE",
  "Confirm changing details with Google": "Confirma los cambios con Google",
  "Current plan rates and regional offers": "Tarifas de plan actuales y ofertas regionales",
  "Edition limits, connector access, and pooled storage":
    "Límites por edición, acceso a conectores y almacenamiento agrupado",
  "Eligible Workspace plans and feature limits":
    "Planes de Workspace elegibles y límites de funciones",
  "Which services and data are covered by the selected region policy?":
    "¿Qué servicios y datos cubre la política de región seleccionada?",
  "Which AI surfaces and content types are covered by the configured policies?":
    "¿Qué superficies de IA y qué tipos de contenido cubren las políticas configuradas?",
  "Which editions, services, and data types support the required key management and rotation policies?":
    "¿Qué ediciones, servicios y tipos de datos admiten las políticas de gestión y rotación de claves requeridas?",
  "Is the exact Gemini service integration supported inside the perimeter?":
    "¿La integración exacta del servicio de Gemini está admitida dentro del perímetro?",
  "Which events are available, exportable, and retained for this product?":
    "¿Qué eventos están disponibles, son exportables y se conservan para este producto?",
  "Are the selected services on the included-functionality list, and is a BAA in place?":
    "¿Los servicios seleccionados figuran en la lista de funcionalidades incluidas y está en vigor el BAA?",
  "Identity and Access Management": "Gestión de identidades y acceso",
  "The employee inputs a multi-step objective": "El empleado introduce un objetivo de varios pasos",
  "Plans that scale with your rollout": "Planes que se adaptan a tu despliegue",
  "Enterprise governance and security controls":
    "Controles empresariales de gobernanza y seguridad",
  "Model Gemini Enterprise pricing by deployment type, seats, and billing commitment.":
    "Modela los precios de Gemini Enterprise según el tipo de despliegue, los puestos y el compromiso de facturación.",
  "Start with a pilot team, connect Workspace apps, and expand to the rest of the company without a rip-and-replace migration.":
    "Empieza con un equipo piloto, conecta las apps de Workspace y amplía al resto de la empresa sin una migración de reemplazo total.",
  "Admin controls, policy alignment, and data boundaries help teams move faster while reducing risk for leadership.":
    "Los controles de administrador, la alineación de políticas y los límites de datos ayudan a los equipos a avanzar más rápido reduciendo el riesgo para el equipo directivo.",
  "Use real usage patterns and token modeling to estimate cost, identify the right workload mix, and avoid overspending.":
    "Usa patrones de uso reales y modelado de tokens para estimar el coste, identificar la mezcla de cargas adecuada y evitar el gasto excesivo.",
  "Workspace-native AI workflows across Docs, Sheets, Gmail, and Meet":
    "Flujos de trabajo de IA nativos de Workspace en Docs, Sheets, Gmail y Meet",
  "Enterprise controls aligned with compliance, security, and admin review":
    "Controles empresariales alineados con el cumplimiento, la seguridad y la revisión del administrador",
  "Flexible seat models for phased rollouts and line-of-business pilots":
    "Modelos de puestos flexibles para despliegues por fases y pilotos por área de negocio",
  "Clear token-based forecasting before large-scale deployment":
    "Previsiones claras basadas en tokens antes del despliegue a gran escala",
  "What is the best plan for an enterprise pilot?":
    "¿Cuál es el mejor plan para un piloto empresarial?",
  "Most organizations start with Gemini Enterprise Standard because it balances cost, Workspace integration, and admin controls for broad team adoption.":
    "La mayoría de las organizaciones empiezan con Gemini Enterprise Standard porque equilibra el coste, la integración con Workspace y los controles de administrador para una adopción amplia en el equipo.",
  "Annual pricing is best for predictability and cost savings, while monthly billing is useful for a short pilot or phased rollout.":
    "El precio anual es la mejor opción para la previsibilidad y el ahorro, mientras que la facturación mensual resulta útil para un piloto breve o un despliegue por fases.",
  "Usage is modeled by input and output token consumption. The pricing table gives a practical estimate before commitment.":
    "El uso se modela según el consumo de tokens de entrada y salida. La tabla de precios ofrece una estimación práctica antes del compromiso.",
  "Yes. The full comparison view helps map pricing, model capabilities, and enterprise fit against other AI platforms.":
    "Sí. La vista de comparación completa ayuda a mapear los precios, las capacidades de los modelos y la idoneidad empresarial frente a otras plataformas de IA.",
  "API token rates are separate from Workspace and Gemini Enterprise subscriptions. Rates can depend on tier and project setup; confirm current pricing in the linked model documentation.":
    "Las tarifas de tokens de la API son independientes de las suscripciones a Workspace y Gemini Enterprise. Las tarifas pueden depender del nivel y de la configuración del proyecto; confirma los precios actuales en la documentación del modelo enlazada.",
  "Displayed rates are USD list references. Check the linked model documentation for current rates and billing tiers.":
    "Las tarifas mostradas son referencias de la lista en USD. Consulta la documentación del modelo enlazada para ver las tarifas y los niveles de facturación actuales.",
  "Annual commitments reduce the public list price and create predictable budgeting.":
    "Los compromisos anuales reducen el precio de lista público y permiten una presupuestación predecible.",
  "Decide whether AI goes to every user now or begins with a focused team.":
    "Decide si la IA se despliega ahora para todos los usuarios o comienza con un equipo concreto.",
  "Compare these add-ons against the third-party AI tools your organization already funds.":
    "Compara estos complementos con las herramientas de IA de terceros que tu organización ya financia.",
  "Learn how Gemini Enterprise implements the open Model Context Protocol (MCP) to safely interface with corporate APIs, databases, and multi-step reasoning agents.":
    "Descubre cómo Gemini Enterprise implementa el Model Context Protocol (MCP) abierto para interfacing de forma segura con API corporativas, bases de datos y agentes de razonamiento de varios pasos.",
  "Analyze customer churn in Salesforce and create a Jira remediation epic":
    "Analiza el abandono de clientes en Salesforce y crea una épica de remediación en Jira",
  // ---- pricing ----
  "Compare Gemini Enterprise Standard and Plus, estimate seat-based deployment cost, and model token consumption against real-world usage patterns.":
    "Compara Gemini Enterprise Standard y Plus, estima el coste de despliegue por puesto y modela el consumo de tokens frente a patrones de uso reales.",
  "Build your estimate": "Crea tu estimación",
  "Choose how you want to deploy Gemini.":
    "Elige cómo quieres desplegar Gemini.",
  "Public list pricing is a starting point. Use the controls to model a pilot or a full organization rollout.":
    "El precio de lista público es un punto de partida. Usa los controles para modelar un piloto o un despliegue en toda la organización.",
  "Adjust from 5 to 5,000 users.": "Ajusta de 5 a 5.000 usuarios.",
  "Advanced Workspace integration": "Integración avanzada con Workspace",
  "Gemini Enterprise pricing": "Precios de Gemini Enterprise",
  "Put advanced AI to work across your entire organization.":
    "Lleva la IA avanzada a toda tu organización.",
  "Built for decision makers": "Pensado para quienes deciden",
  "A single AI layer for productivity, governance, and scale.":
    "Una única capa de IA para productividad, gobernanza y escala.",
  "What you get": "Lo que obtienes",
  "Why enterprises choose it": "Por qué lo eligen las empresas",
  "Best fit": "Ideal para",
  "Recommended starting point": "Punto de partida recomendado",
  "View pricing": "Ver precios",
  "Annual commitment, billed annually": "Compromiso anual, facturado anualmente",
  "Common questions before rollout": "Preguntas habituales antes del despliegue",

  // ---- about ----
  "MarketStar Enterprise Advisory": "Asesor Enterprise de MarketStar",
  "Empowering organizations to master": "Ayudamos a las organizaciones a dominar",
  "Premier Enterprise GTM & AI Acceleration Partner":
    "Socio premier empresarial de GTM y aceleración de IA",
  "Google Workspace Commercial Ecosystem": "Ecosistema comercial de Google Workspace",
  "Google Cloud Infrastructure & Model Foundation":
    "Infraestructura de Google Cloud y base de modelos",
  "Why We Built This Platform": "Por qué creamos esta plataforma",
  "Clarity in an era of rapid AI expansion":
    "Claridad en una era de rápida expansión de la IA",
  "Explore Plan Matrix": "Explorar la matriz de planes",
  "Directory of {n} Features": "Directorio de {n} funciones",
  "Independent Technical Transparency": "Transparencia técnica independiente",
  "Enterprise Privacy & Governance First":
    "Privacidad y gobernanza empresarial ante todo",
  "Ecosystem Go-To-Market Expertise":
    "Experiencia en go-to-market del ecosistema",

  // ---- home: latest model showcase ----
  "Model catalog · verified Sep 24, 2026":
    "Catálogo de modelos · verificado el 24 de septiembre de 2026",
  "The right Gemini model for the work.":
    "El modelo de Gemini adecuado para el trabajo.",
  "Compare current API model families by capability and release status. API list pricing is separate from Google Workspace and Gemini Enterprise licensing.":
    "Compara las familias de modelos de API actuales por capacidad y estado de lanzamiento. Los precios de lista de la API son independientes de las licencias de Google Workspace y Gemini Enterprise.",
  "Full model catalog": "Catálogo completo de modelos",
  "Model details": "Detalles del modelo",

  // ---- home: enterprise trust bento ----
  "Designed for enterprise reality": "Diseñado para la realidad empresarial",
  "Intelligence with boundaries.": "Inteligencia con límites.",
  "Data use, control availability, and agent permissions depend on the Workspace service, edition, configuration, and applicable agreement. Follow the primary sources for your deployment.":
    "El uso de datos, la disponibilidad de controles y los permisos de los agentes dependen del servicio de Workspace, la edición, la configuración y el contrato aplicable. Consulta las fuentes primarias de tu despliegue.",
  "Customer data stays yours.": "Los datos de tus clientes siguen siendo tuyos.",
  "Workspace terms restrict training on customer data for Workspace Generative AI Services without prior permission or instruction.":
    "Las condiciones de Workspace restringen el entrenamiento con datos de clientes en los servicios de IA generativa de Workspace sin permiso ni instrucción previa.",
  "Contract terms · Workspace AI": "Condiciones del contrato · IA de Workspace",
  "Read Workspace terms": "Leer las condiciones de Workspace",
  "Ground work in the right context.":
    "Fundamenta el trabajo en el contexto adecuado.",
  "Use Workspace content, connected data sources, and eligible enterprise connectors to bring relevant context into a task.":
    "Usa el contenido de Workspace, las fuentes de datos conectadas y los conectores empresariales elegibles para llevar el contexto relevante a una tarea.",
  "Drive · Docs · approved sources": "Drive · Docs · fuentes aprobadas",
  "Explore connectors": "Explorar los conectores",
  "Controls belong in the workflow.":
    "Los controles deben estar en el flujo de trabajo.",
  "Explore identity, access, data protection, retention, and audit controls. Specific features depend on edition and configuration.":
    "Explora los controles de identidad, acceso, protección de datos, retención y auditoría. Las funciones concretas dependen de la edición y de la configuración.",
  "Admin controls · edition dependent":
    "Controles de administrador · dependen de la edición",
  "Review security layers": "Revisar las capas de seguridad",
  "Keep a person in the loop.": "Mantén a una persona en el bucle.",
  "Review generated drafts, verify source material, and authorize actions before an agent changes external systems.":
    "Revisa los borradores generados, verifica el material de origen y autoriza las acciones antes de que un agente modifique sistemas externos.",
  "Draft · verify · approve": "Redactar · verificar · aprobar",
  "Explore agent controls": "Explorar los controles de agentes",
  "Choose a model for the task.":
    "Elige un modelo para la tarea.",
  "Compare current Gemini model families by release status and use case, then check availability for your deployment.":
    "Compara las familias de modelos de Gemini actuales por estado de lanzamiento y caso de uso, y después comprueba la disponibilidad para tu despliegue.",
  "Gemini model catalog": "Catálogo de modelos de Gemini",
  "Compare models": "Comparar los modelos",
  "Connect tools with guardrails.":
    "Conecta herramientas con límites de seguridad.",
  "MCP and agent workflows can coordinate across systems when permissions, scope, and human supervision are configured.":
    "Los flujos de MCP y de agentes pueden coordinarse entre sistemas cuando se configuran los permisos, el alcance y la supervisión humana.",
  "MCP · agents · approvals": "MCP · agentes · aprobaciones",
  "Explore orchestration": "Explorar la orquestación",

  // ---- home: workflow story ----
  "Workspace tools, connected": "Herramientas de Workspace, conectadas",
  "How Gemini moves work forward.": "Cómo Gemini impulsa el trabajo.",
  "From the first message to a reviewed next step, Gemini brings AI into the Workspace tools your teams already use.":
    "Desde el primer mensaje hasta el siguiente paso revisado, Gemini incorpora la IA a las herramientas de Workspace que tus equipos ya usan.",
  "Scroll to follow": "Desplázate para seguir",
  "Ready": "Listo",
  "Workspace preview": "Vista previa de Workspace",
  "Illustrative interface": "Interfaz ilustrativa",
  "Review before sharing": "Revisa antes de compartir",
  "Communication": "Comunicación",
  "Clear the noise. Keep the context.": "Quita el ruido. Conserva el contexto.",
  "Summarize long conversations, draft replies in your voice, and bring the relevant Drive context into Gmail.":
    "Resume conversaciones largas, redacta respuestas con tu tono y lleva el contexto relevante de Drive a Gmail.",
  "Q3 renewal thread": "Hilo de renovación del T3",
  "12 messages · 4 participants": "12 mensajes · 4 participantes",
  "Decision: extend the pilot into EMEA": "Decisión: ampliar el piloto a EMEA",
  "Next: prepare revised scope for review": "Siguiente: preparar el alcance revisado",
  "Thread summaries": "Resúmenes de hilos",
  "Context-aware drafting": "Redacción con contexto",
  "Human review before send": "Revisión humana antes de enviar",
  "Creation": "Creación",
  "Turn source material into a first draft.":
    "Convierte el material de origen en un primer borrador.",
  "Work from selected files and meeting notes to outline, draft, and refine a document alongside your team.":
    "Trabaja a partir de archivos seleccionados y notas de reunión para crear un esquema, redactar y perfeccionar un documento junto a tu equipo.",
  "Customer success plan": "Plan de éxito del cliente",
  "Source set · 6 selected files": "Conjunto de fuentes · 6 archivos seleccionados",
  "Outline created from account goals": "Esquema creado a partir de los objetivos de la cuenta",
  "Open questions kept for owner review": "Preguntas abiertas reservadas para la revisión del responsable",
  "Source-aware drafting": "Redacción consciente de las fuentes",
  "Tone and length controls": "Controles de tono y extensión",
  "Collaborative editing": "Edición colaborativa",
  "Analysis": "Análisis",
  "Ask the table. Inspect the answer.": "Pregunta a la tabla. Inspecciona la respuesta.",
  "Use natural language to understand a selected range, surface patterns, and build a formula you can review.":
    "Usa lenguaje natural para entender un rango seleccionado, detectar patrones y construir una fórmula que puedas revisar.",
  "Regional pipeline · Q3": "Cartera regional · T3",
  "Selected range · 1,240 rows": "Rango seleccionado · 1.240 filas",
  "Largest movement: West · Enterprise": "Mayor movimiento: Oeste · Enterprise",
  "Formula suggestion ready to inspect": "Sugerencia de fórmula lista para inspeccionar",
  "Range-aware analysis": "Análisis consciente del rango",
  "Formula assistance": "Asistencia con fórmulas",
  "Results remain editable": "Los resultados siguen siendo editables",
  "Collaboration": "Colaboración",
  "Leave the meeting with the next steps.":
    "Sal de la reunión con los siguientes pasos.",
  "Capture notes, identify decisions, and turn an approved summary into follow-up work across Workspace.":
    "Captura notas, identifica decisiones y convierte un resumen aprobado en tareas de seguimiento en todo Workspace.",
  "Design review · 42 minutes": "Revisión de diseño · 42 minutos",
  "Notes prepared for host review": "Notas preparadas para la revisión del anfitrión",
  "2 decisions · 3 open questions": "2 decisiones · 3 preguntas abiertas",
  "Follow-up draft ready in Google Docs": "Borrador de seguimiento listo en Google Docs",
  "Meeting notes": "Notas de la reunión",
  "Decision summaries": "Resúmenes de decisiones",
  "Follow-up draft": "Borrador de seguimiento",

  // ---- home: proof metrics & CTA ----
  "The intelligence index": "El índice de inteligencia",
  "Grounded in the details that matter.":
    "Fundamentado en los detalles que importan.",
  "Live catalog counts, not productivity estimates. Model context applies to the cited Gemini API model, not every Workspace plan.":
    "Recuentos reales del catálogo, no estimaciones de productividad. El contexto del modelo se aplica al modelo de API de Gemini citado, no a todos los planes de Workspace.",
  "Workspace and Gemini capabilities indexed": "Capacidades de Workspace y Gemini indexadas",
  "Plan editions mapped for comparison": "Ediciones de plan mapeadas para comparar",
  "Security and governance layers catalogued": "Capas de seguridad y gobernanza catalogadas",
  "Input-token context for Gemini 3.8 Flash API": "Contexto de tokens de entrada para la API de Gemini 3.8 Flash",
  "Ready to shape your enterprise AI workflow?":
    "¿Listo para definir tu flujo de trabajo de IA empresarial?",
  "Explore plan availability and governance controls for Gemini in Workspace.":
    "Explora la disponibilidad por plan y los controles de gobernanza de Gemini en Workspace.",
  "Compare Workspace plans": "Compara los planes de Workspace",

  // ---- home: enterprise section ----
  "Enterprise Architecture": "Arquitectura empresarial",
  "Beyond standard chat: Connectors, Agents & MCP":
    "Más allá del chat estándar: conectores, agentes y MCP",
  "Explore connected data sources, agent workflows, and governance topics. Check each feature's current edition requirements and service terms before rollout.":
    "Explora las fuentes de datos conectadas, los flujos de agentes y los temas de gobernanza. Comprueba los requisitos de edición y las condiciones de servicio vigentes de cada función antes del despliegue.",
  "Enterprise Grounding & Connectors": "Fundamentación empresarial y conectores",
  "Gemini Enterprise documents permission-aware search. Connector support, indexing, and permission behavior depend on your source and configuration.":
    "Gemini Enterprise documenta una búsqueda consciente de permisos. La compatibilidad de los conectores, la indexación y el comportamiento de los permisos dependen de tu origen y configuración.",
  "Model Context Protocol (MCP)": "Model Context Protocol (MCP)",
  "Review the supported MCP options for your Gemini product and edition before connecting private APIs, databases, or custom tools.":
    "Revisa las opciones de MCP admitidas para tu producto y edición de Gemini antes de conectar API privadas, bases de datos o herramientas personalizadas.",
  "Autonomous Enterprise Agents": "Agentes empresariales autónomos",
  "Plan agent workflows around approved tools, source permissions, and human review. Available actions depend on edition and configuration.":
    "Diseña los flujos de los agentes en torno a herramientas aprobadas, permisos de origen y revisión humana. Las acciones disponibles dependen de la edición y de la configuración.",
  "Connector examples": "Ejemplos de conectores",
  "Confirm current edition support, regional availability, and administrator setup for each source.":
    "Confirma la compatibilidad con la edición actual, la disponibilidad regional y la configuración del administrador para cada origen.",
  "View all connectors": "Ver todos los conectores",
  "Explore the Deep Architectural Guide": "Explora la guía de arquitectura profunda",

  // ---- home: articles teaser ----
  "Strategic Insights": "Perspectivas estratégicas",
  "Expert analysis on enterprise AI procurement, deployment architectures, and security governance from the MarketStar Enterprise Advisory Group.":
    "Análisis experto sobre compras de IA empresarial, arquitecturas de despliegue y gobernanza de seguridad del Grupo Asesor Enterprise de MarketStar.",
  "View all articles": "Ver todos los artículos",

  // ---- comparison: availability matrix ----
  "Search features...": "Buscar funciones...",
  "All Applications": "Todas las aplicaciones",
  "All Plan Groups": "Todos los grupos de plan",
  "AI Add-ons": "Complementos de IA",
  "Export CSV": "Exportar CSV",
  "Showing Differences": "Mostrando diferencias",
  "Show Differences Only": "Mostrar solo diferencias",
  "Pin plans:": "Fijar planes:",
  "Reset": "Restablecer",
  "Feature": "Función",
  "Limited": "Limitado",
  "Higher Limits": "Límites más altos",
  "Mobile comparison view": "Vista de comparación en móvil",
  "Included": "Incluida",
  "Not included": "No incluida",
  "This feature is not mapped to this plan in the catalog. Confirm in Google's current edition guide.":
    "Esta función no está asignada a este plan en el catálogo. Confírmalo en la guía de ediciones vigente de Google.",

  // ---- comparison: plan comparator ----
  "Overview & Pricing": "Resumen y precios",
  "Flexible rate / user / month": "Tarifa flexible / usuario / mes",
  "Annual commitment rate / user / month": "Tarifa con compromiso anual / usuario / mes",
  "Storage": "Almacenamiento",
  "Meeting Size": "Tamaño de la reunión",
  "{count} participants": "{count} participantes",
  "AI & Workspace": "IA y Workspace",
  "Grounding & Connectors": "Fundamentación y conectores",
  "Select up to 4 plans to compare": "Selecciona hasta 4 planes para comparar",
  "Add Plan": "Añadir plan",
  "Plan Features": "Funciones del plan",

  // ---- comparison: tabs ----
  "Availability Matrix": "Matriz de disponibilidad",
  "Side-by-Side Comparator": "Comparador lado a lado",
  "Pricing Calculator": "Calculadora de precios",

  // ---- comparison: pricing calculator ----
  "Rollout scenario": "Escenario de despliegue",
  "Model a controlled pilot before committing to the full organization.":
    "Modela un piloto controlado antes de comprometer a toda la organización.",
  "Pilot rollout": "Despliegue piloto",
  "Full rollout": "Despliegue completo",
  "users": "usuarios",
  "month": "mes",
  "Pilot seats:": "Puestos del piloto:",
  "Pilot seats": "Puestos del piloto",
  "Organization Size": "Tamaño de la organización",
  "Adjust the number of user licenses needed.":
    "Ajusta el número de licencias de usuario necesarias.",
  "seats": "puestos",
  "Seat segmentation": "Segmentación de puestos",
  "Model who is actually using the platform across the org.":
    "Modela quién está usando realmente la plataforma en toda la organización.",
  "Knowledge workers": "Trabajadores del conocimiento",
  "Managers": "Responsables",
  "Executives": "Directivos",
  "Select Plan": "Seleccionar plan",
  "Select a plan to see its published rate or pricing note.":
    "Selecciona un plan para ver su tarifa publicada o su nota de precios.",
  "Flexible monthly": "Mensual flexible",
  "Annual commitment": "Compromiso anual",
  "rate": "tarifa",
  "N/A": "N/D",
  "Adoption assumptions": "Supuestos de adopción",
  "Illustrative inputs only. Measure time saved and adoption in your own pilot before using these outputs as a forecast.":
    "Solo entradas ilustrativas. Mide el tiempo ahorrado y la adopción en tu propio piloto antes de usar estos resultados como pronóstico.",
  "Adoption:": "Adopción:",
  "Adoption rate": "Tasa de adopción",
  "Hours saved/user:": "Horas ahorradas/usuario:",
  "Hours saved per user": "Horas ahorradas por usuario",
  "Hourly value:": "Valor por hora:",
  "Hourly value": "Valor por hora",
  "Investment Summary": "Resumen de la inversión",
  "Per User / Month": "Por usuario / mes",
  "Not published": "No publicado",
  "Annual commitment rate per user/month": "Tarifa con compromiso anual por usuario/mes",
  "Flexible monthly rate": "Tarifa mensual flexible",
  "Not available": "No disponible",
  "Monthly Total": "Total mensual",
  "Annual Total": "Total anual",
  "Estimated annual value": "Valor anual estimado",
  "Estimated ROI Impact": "Impacto estimado en el ROI",
  "Time Saved": "Tiempo ahorrado",
  "hrs/mo": "h/mes",
  "mo": "mes",
  "months": "meses",
  "Value Generated": "Valor generado",
  "Est. Efficiency ROI": "ROI de eficiencia est.",
  "Break-even": "Punto de equilibrio",
  "Scenario note": "Nota del escenario",
  "Export Scenario Summary": "Exportar el resumen del escenario",
  "Scenario comparison": "Comparación de escenarios",
  "Pilot vs full rollout economics": "Economía del piloto frente al despliegue completo",
  "Value-focused planning": "Planificación orientada al valor",
  "Pilot": "Piloto",
  "Phased": "Por fases",
  "Investment": "Inversión",
  "Monthly value": "Valor mensual",
  "pricing unavailable": "precio no disponible",
  "{plan} has no fixed per-seat price in this calculator, so cost-based ROI is not available. Use Google's current quote or usage estimate.":
    "{plan} no tiene un precio fijo por puesto en esta calculadora, por lo que no se puede calcular el ROI basado en costes. Usa la cotización o la estimación de uso vigente de Google.",
  "Under these editable assumptions, modeled value is higher than the listed software rate. Validate actual adoption and time saved in a pilot.":
    "Con estos supuestos editables, el valor modelado es superior a la tarifa de software publicada. Valida la adopción real y el tiempo ahorrado en un piloto.",
  "Use this scenario as a starting point, then validate adoption and measured time saved before estimating organization-wide value.":
    "Usa este escenario como punto de partida y después valida la adopción y el tiempo ahorrado medido antes de estimar el valor para toda la organización.",

  // ---- features explorer ----
  "Search features, capabilities, use cases...": "Busca funciones, capacidades o casos de uso...",
  "Popular Only": "Solo populares",
  "New Capabilities": "Capacidades nuevas",
  "All Apps": "Todas las apps",
  "All Categories": "Todas las categorías",
  "Showing {shown} of {total} features": "Mostrando {shown} de {total} funciones",
  "No features found": "No se encontraron funciones",
  "We couldn't find any features matching your current filters and search criteria.":
    "No encontramos funciones que coincidan con tus filtros y criterios de búsqueda actuales.",
  "Reset All Filters": "Restablecer todos los filtros",
  "View All {count} Features in Catalog": "Ver las {count} funciones del catálogo",

  // ---- feature modal ----
  "New": "Nuevo",
  "Popular": "Popular",
  "Close": "Cerrar",
  "Availability": "Disponibilidad",
  "Plan": "Plan",
  "Details": "Detalles",
  "Use Cases": "Casos de uso",
  "not mapped": "sin asignar",
  "Confirm in Google edition guide": "Confírmalo en la guía de ediciones de Google",
  "Enterprise & Security Considerations": "Consideraciones empresariales y de seguridad",
  "View Full Page": "Ver la página completa",

  // ---- product explorers ----
  "Show availability for": "Mostrar disponibilidad para",
  "Plan tier": "Nivel del plan",
  "Explore the Gemini capability map": "Explora el mapa de capacidades de Gemini",
  "Capability group": "Grupo de capacidades",
  "{count} capabilities": "{count} capacidades",
  "Limited or higher limits": "Límites reducidos o más altos",
  "Limited or elevated limits": "Límites reducidos o ampliados",
  "Open capability": "Abrir la capacidad",
  "Open feature": "Abrir la función",
  "Availability explorer": "Explorador de disponibilidad",
  "{count} capabilities indexed": "{count} capacidades indexadas",
  "Gemini workspace": "Gemini en Workspace",
  "Gemini Enterprise": "Gemini Enterprise",

  // ---- enterprise: connector catalog ----
  "Search Google Cloud connectors...": "Busca conectores de Google Cloud...",
  "Connector groups": "Grupos de conectores",
  "Google services": "Servicios de Google",
  "Other applications": "Otras aplicaciones",
  "Showing {shown} of {total} Google Cloud Integration Connectors.":
    "Mostrando {shown} de {total} conectores de Google Cloud Integration.",
  "No connectors match your search.": "Ningún conector coincide con tu búsqueda.",

  // ---- enterprise: connector detector ----
  "Readiness check": "Comprobación de preparación",
  "Find out which of your tools connect to Gemini Enterprise.":
    "Descubre qué herramientas tuyas se conectan a Gemini Enterprise.",
  "Enter a company domain to search public Google results for evidence of the tools your team may use. This is an indicative signal, not proof of an active integration.":
    "Introduce el dominio de una empresa para buscar en los resultados públicos de Google pruebas de las herramientas que puede usar tu equipo. Es una señal indicativa, no una prueba de que exista una integración activa.",
  "Company domain": "Dominio de la empresa",
  "Check readiness": "Comprobar preparación",
  "Checking...": "Comprobando...",
  "Public search checks require server-side Google Search credentials. A search result is only an indicative signal, not proof that a connector is configured.":
    "Las comprobaciones de búsqueda pública requieren credenciales de Google Search en el servidor. Un resultado de búsqueda es solo una señal indicativa, no una prueba de que un conector esté configurado.",
  "Your readiness summary appears here": "Tu resumen de preparación aparecerá aquí",
  "No account access or sensitive information is required.":
    "No se requiere acceso a cuentas ni información sensible.",
  "Checked domain": "Dominio comprobado",
  "Connector signal found.": "Señal de conector encontrada.",
  "These tools are represented in the Gemini Enterprise catalog.":
    "Estas herramientas están representadas en el catálogo de Gemini Enterprise.",
  "Evidence:": "Evidencia:",
  "{status} connector": "conector {status}",
  "Google Search setup required.": "Se requiere configurar Google Search.",
  "Manual review recommended.": "Se recomienda una revisión manual.",
  "Add the server-side Google Search credentials to show public company signals here.":
    "Añade las credenciales de Google Search en el servidor para mostrar aquí las señales públicas de la empresa.",
  "No connector signal was found in the public results.":
    "No se encontró ninguna señal de conector en los resultados públicos.",
  "Search Google manually:": "Busca en Google manualmente:",
  "Review the full connector catalog to identify the systems your team wants to ground in Gemini Enterprise.":
    "Revisa el catálogo completo de conectores para identificar los sistemas en los que tu equipo quiere fundamentar Gemini Enterprise.",
  "View connector specifications": "Ver las especificaciones de los conectores",
  "Unable to check this domain.": "No se ha podido comprobar este dominio.",

  // ---- security architecture map ----
  "Topic {level}": "Tema {level}",

  // ---- readiness planner ----
  "Enterprise readiness planner": "Planificador de preparación empresarial",
  "Turn your AI ambition into a ": "Convierte tu ambición en IA en un ",
  "deployable plan": "plan desplegable",
  "Model rollout size, deployment shape, connector depth, and governance requirements in one guided workflow. Export the result for your architecture and procurement conversations.":
    "Modela el tamaño del despliegue, la forma de despliegue, la profundidad de los conectores y los requisitos de gobernanza en un único flujo guiado. Exporta el resultado para tus conversaciones de arquitectura y compras.",
  "This planner is a decision aid based on the public catalogue. Final pricing, regional availability, permissions, and compliance requirements should be confirmed with Google Cloud and your internal security team.":
    "Este planificador es una ayuda para la decisión basada en el catálogo público. Los precios finales, la disponibilidad regional, los permisos y los requisitos de cumplimiento deben confirmarse con Google Cloud y con tu equipo interno de seguridad.",

  // ---- search palette ----
  "Search everything: features, plans, sources, models, guides...":
    "Busca en todo: funciones, planes, fuentes, modelos, guías...",
  "Search all site content": "Buscar en todo el contenido del sitio",
  "Clear search": "Borrar la búsqueda",
  "Searching the site…": "Buscando en el sitio…",
  "No results found": "No se encontraron resultados",
  "Try a product or topic such as Gmail, pricing, security, or connectors.":
    "Prueba con un producto o tema como Gmail, precios, seguridad o conectores.",
  "Recent searches": "Búsquedas recientes",
  "Clear": "Borrar",
  "Popular features": "Funciones populares",
  "Popular Features": "Funciones populares",
  "to toggle": "para activar o desactivar",
  "to navigate": "para navegar",
  "to select": "para seleccionar",
  "to close": "para cerrar",

  // ---- security page controls & questions ----
  "HIPAA": "HIPAA",
  "CMEK / client-side encryption": "CMEK / cifrado del lado del cliente",
  "Which editions, services, and data types support the required key controls?":
    "¿Qué ediciones, servicios y tipos de datos admiten los controles de claves requeridos?",

  // ---- security architecture map ----
  ".": ".",
  "Security review topic": "Tema de revisión de seguridad",
  "Security review topics": "Temas de revisión de seguridad",
  "Security and governance": "Seguridad y gobernanza",
  "Security & governance": "Seguridad y gobernanza",
  "Connectors": "Conectores",
  "Gemini models": "Modelos de Gemini",
  "Site pages": "Páginas del sitio",
  "Site page": "Página del sitio",
  "Inspect Details": "Inspeccionar detalles",

  // ---- enterprise agents page ----
  "Agentes autónomos": "Agentes autónomos",

  // ---- pricing page ----
  "Gemini Enterprise Pricing | Compare AI Plans":
    "Precios de Gemini Enterprise | Compara los planes de IA",

  // ---- customer onboarding guide ----
  "Customer Onboarding Guide": "Guía de incorporación de clientes",
  "Administrator Onboarding Runbook": "Manual de incorporación para administradores",
  "Customer Onboarding for ": "Incorporación de clientes para ",
  " Standard & Plus": " Standard y Plus",
  "An end-to-end operational guide for Google Cloud and Workspace administrators. Verify organization hierarchies, assign billing, enable required APIs, configure least-privilege IAM roles, distribute user licenses, create enterprise apps, and connect grounded data stores with official documentation citations.":
    "Una guía operativa integral para administradores de Google Cloud y Workspace. Verifique jerarquías de organizaciones, asigne facturación, habilite las APIs requeridas, configure roles IAM de mínimo privilegio, distribuya licencias de usuario, cree aplicaciones empresariales y conecte almacenes de datos basados en documentación oficial.",
  "Configure Onboarding Parameters": "Configurar parámetros de incorporación",
  "Tailor instructions, quota expectations, and hierarchy warnings to your environment.":
    "Adapte las instrucciones, las expectativas de cuotas y las advertencias de jerarquía a su entorno.",
  "Interactive Deployment Guide": "Guía interactiva de despliegue",
  "Overall Implementation Progress": "Progreso general de implementación",
  "subtasks completed": "subtareas completadas",
  "Export Checklist": "Exportar lista de verificación",
  "Reset all onboarding checklist progress?": "¿Restablecer todo el progreso de la lista de verificación de incorporación?",
  "Copied!": "¡Copiado!",
  "Copy": "Copiar",
  "Console Path": "Ruta de la consola",
  "Hierarchy Note": "Nota de jerarquía",
  "Edition Specifics": "Detalles de la edición",
  "Required Implementation Subtasks": "Subtareas de implementación requeridas",
  "IAM Role Reference Matrix": "Matriz de referencia de roles IAM",
  "Assign least-privilege roles to service agents, administrators, and knowledge workers.":
    "Asigne roles de mínimo privilegio a agentes de servicio, administradores y usuarios finales.",
  "Persona": "Perfil / Rol funcional",
  "IAM Role Identifier": "Identificador de rol IAM",
  "Role Title": "Título del rol",
  "Purpose & Scope": "Propósito y alcance",
  "Mandatory": "Obligatorio",
  "Optional": "Opcional",
  "Common Pitfalls & Resolutions": "Dificultades comunes y soluciones",
  "Official Google Cloud Documentation Citations": "Citas de documentación oficial de Google Cloud",
  "Official Documentation Citations": "Citas de documentación oficial",
  "Continue to": "Continuar a",
  "Previous": "Anterior",
  "Next": "Siguiente",
  "Onboarding Steps": "Pasos de incorporación",

  // ---- Workspace Business Edition Onboarding ----
  "Business (Workspace), Standard & Plus (Cloud)": "Business (Workspace), Standard y Plus (Cloud)",
  "An end-to-end operational guide for Google Workspace and Google Cloud administrators. Manage Google Workspace Admin Console settings for Business edition (up to 300 seats, 25 GiB pooled indexing), or configure Google Cloud Console projects, billing, APIs, IAM, and Discovery Engine data stores for Standard and Plus editions.":
    "Una guía operativa integral para administradores de Google Workspace y Google Cloud. Administre la consola de Google Workspace para la edición Business (hasta 300 licencias, 25 GiB de indexación agrupada), o configure proyectos, facturación, APIs, roles IAM y almacenes de Discovery Engine en Google Cloud Console para Standard y Plus.",
  "Tailor instructions, quota expectations, and console click paths to your edition.":
    "Adapte las instrucciones, las expectativas de cuotas y las rutas de consola a su edición.",
  "Business (Workspace)": "Business (Workspace)",
  "Standard (GCP)": "Standard (GCP)",
  "Plus (GCP)": "Plus (GCP)",
  "Google Workspace Domain": "Dominio de Google Workspace",
  "Managed centrally via the Google Workspace Admin console (admin.google.com). Features 25 GiB pooled storage and data indexing per seat, up to 300 seats, native grounding across Gmail, Docs, Sheets, and Drive, plus Gemini Notebook. Requires no Google Cloud infrastructure or GCP project setup.":
    "Gestionado de forma centralizada a través de la consola de administración de Google Workspace (admin.google.com). Ofrece 25 GiB de almacenamiento e indexación agrupados por usuario, hasta 300 usuarios, conexión nativa con Gmail, Docs, Sheets y Drive, además de Gemini Notebook. No requiere configuración de infraestructura en Google Cloud.",
};

