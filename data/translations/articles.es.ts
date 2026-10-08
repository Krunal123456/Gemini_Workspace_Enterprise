import type { ArticleTranslations } from "@/lib/i18n/localize";

/**
 * Spanish overlay for `data/articles.ts`.
 * Keyed by article `slug`. The `content` array is replaced wholesale and keeps
 * the same index order as the English source so the markdown renderer and the
 * `[1] [2]` citation markers stay aligned with `sources`.
 */
export const articlesES: ArticleTranslations = {
  "gemini-3-architecture-agentic-scale": {
    category: "Modelos y arquitectura",
    title: "Arquitectura neuronal de Gemini 3.0 y 4.0: agentes autónomos y contexto extenso",
    subtitle:
      "Cómo la hoja de ruta de modelos frontera de Google transforma los flujos de trabajo empresariales con orquestación multi-agente, ventanas de contexto de más de 4M y cómputo de razonamiento profundo.",
    excerpt:
      "Explora los avances arquitectónicos de Gemini 3.0 Pro, Gemini 3.0 Flash, Gemini 3.0 Deep Think y el motor agéntico visionario Gemini 4 para la automatización empresarial.",
    readTime: "8 min de lectura",
    keyTakeaways: [
      "Gemini 3.0 Pro amplía el contexto multimodal nativo a más de 4 millones de tokens con planificación autónoma y ejecución de herramientas.",
      "Gemini 3.0 Flash logra ciclos de respuesta inferiores a 100 ms, diseñados para bucles de agentes autónomos e invocación continua de herramientas.",
      "Gemini 3.0 Deep Think introduce cómputo de razonamiento dinámico y verificación formal para la máxima precisión en matemáticas y código.",
      "El motor agéntico Gemini 4 sienta las bases para enjambres departamentales autónomos y aprendizaje organizacional continuo.",
    ],
    content: [
      "La hoja de ruta de modelos de Google representa una transición generacional desde asistentes conversacionales de un solo turno hacia sistemas agénticos autónomos y auto-orquestados. Con Gemini 3.0 y el motor agéntico Gemini 4, las organizaciones acceden a arquitecturas de razonamiento diseñadas para planificar flujos de trabajo de múltiples pasos, escribir y verificar código en tiempo real y coordinar enjambres de agentes especializados en aplicaciones empresariales. [1] [2]",
      "### Gemini 3.0 Pro: razonamiento frontera y más de 4M de contexto multimodal",
      "Sobre la base de Gemini 2.5, Gemini 3.0 Pro amplía la ventana de contexto frontera a más de 4 millones de tokens multimodales. Esto permite que bases de código corporativas completas, décadas de registros contractuales o cientos de horas de grabaciones de reuniones se mantengan en la memoria de trabajo activa. [1]",
      "### Gemini 3.0 Flash: ejecución de agentes en menos de 100 ms",
      "Para flujos de trabajo empresariales de alta frecuencia, Gemini 3.0 Flash ofrece mejoras de latencia sin precedentes. Con latencias de respuesta inferiores a 100 milisegundos y llamadas a funciones nativas, actúa como un motor cognitivo ultrarrápido para atención al cliente automatizada y sincronización de datos. [2]",
      "### Gemini 3.0 Deep Think: razonamiento dinámico y verificación formal",
      "El modelado financiero complejo, la criptografía y la ingeniería de software crítica no admiten alucinaciones. Gemini 3.0 Deep Think asigna presupuestos computacionales dinámicos en tiempo de inferencia, generando pasos de verificación interna y demostraciones matemáticas antes de presentar recomendaciones finales. [3]",
      "### Mirando hacia el futuro: motor agéntico Gemini 4",
      "La investigación de Google DeepMind para Gemini 4 explora memoria departamental persistente, aprendizaje adaptativo continuo y coordinación de agentes autónomos bajo estrictas reglas de gobernanza empresarial. [4]",
    ],
  },
  "deep-research-gemini-enterprise": {
    category: "IA empresarial",
    title: "Investigación profunda en Gemini Enterprise: inteligencia multisectorial autónoma",
    subtitle:
      "Cómo la síntesis de investigación automatizada en múltiples pasos explora cientos de fuentes internas y externas para generar informes ejecutivos exhaustivos.",
    excerpt:
      "Un análisis detallado de Gemini Deep Research: cómo formula planes de investigación, recupera documentación contrastada y compila informes con citas verificables.",
    readTime: "7 min de lectura",
    keyTakeaways: [
      "Deep Research explora, lee y analiza de forma autónoma cientos de documentos corporativos, bases de datos y fuentes web.",
      "Genera informes completos con citas directas y trazabilidad de procedencia.",
      "Respeta los controles de acceso empresariales: nunca se accede a documentos fuera de los permisos del usuario.",
      "Reduce flujos de trabajo estratégicos de días de lectura manual a minutos de síntesis automatizada.",
    ],
    content: [
      "Los analistas empresariales y directores de estrategia pasan horas buscando en documentos dispersos y estudios de mercado. Gemini Deep Research automatiza este ciclo formulando planes de investigación estructurados, consultando repositorios de conocimiento conectados y compilando informes con citas exhaustivas. [1] [2]",
      "### La arquitectura del grafo de investigación",
      "Cuando un usuario ejecuta una consulta de Deep Research, Gemini genera un plan estructurado: identifica subpreguntas, localiza conjuntos de datos en Google Drive, BigQuery, Salesforce y la web pública, lee los textos completos y sintetiza los hallazgos en secciones analíticas claras. [1]",
      "### Fundamentación empresarial y límites de permisos",
      "En Gemini Enterprise, Deep Research respeta estrictamente los controles de acceso basados en identidad. Cada documento recuperado pasa por las credenciales OAuth o roles IAM del usuario, evitando fugas de datos entre departamentos. [3]",
      "### Citas verificadas y procedencia",
      "Cada afirmación se vincula a notas al pie numéricas que conducen al archivo, diapositiva o fila de origen original, proporcionando transparencia total para auditorías y decisiones directivas. [2]",
    ],
  },
  "notebooklm-enterprise-grounding": {
    category: "NotebookLM",
    title: "NotebookLM Enterprise: resúmenes de audio, conocimiento de equipo y fundamentación",
    subtitle:
      "Transforma la documentación organizativa compleja en podcasts interactivos de IA, asistentes de investigación fundamentados y resúmenes ejecutivos.",
    excerpt:
      "Descubre cómo NotebookLM Enterprise permite la colaboración en equipo sobre archivos PDF, crea resúmenes de audio con presentadores de IA y elimina alucinaciones mediante citas estrictas.",
    readTime: "6 min de lectura",
    keyTakeaways: [
      "NotebookLM fundamenta las respuestas exclusivamente en los archivos de origen proporcionados.",
      "Los resúmenes de audio interactivos generan debates estilo podcast entre dos presentadores de IA.",
      "NotebookLM Enterprise proporciona controles de administración, cuadernos compartidos de equipo y cumplimiento DLP.",
      "Las etiquetas de citas en el texto permiten verificar datos de forma inmediata hasta la página exacta.",
    ],
    content: [
      "NotebookLM ha redefinido cómo los profesionales interactúan con manuales técnicos complejos y documentación legal. Al combinar la arquitectura Gemini 2.5 Pro con fundamentación estricta en fuentes, NotebookLM actúa como un socio de investigación experto. [1]",
      "### Resúmenes de audio: podcasts de IA a partir de documentos",
      "Una de las funciones más destacadas de NotebookLM son los resúmenes de audio. Con un solo clic, se genera una conversación natural entre dos presentadores de IA que resumen puntos clave y conectan ideas en lenguaje claro. [2]",
      "### Colaboración y seguridad empresarial",
      "Con NotebookLM Enterprise, los equipos pueden crear cuadernos de proyectos compartidos y aplicar políticas de retención de datos corporativas sin que la información se use para entrenar modelos públicos. [3]",
    ],
  },
  "mcp-model-context-protocol-enterprise": {
    category: "IA empresarial",
    title: "Model Context Protocol (MCP) en Gemini Enterprise: integración de herramientas abiertas",
    subtitle:
      "Cómo el estándar abierto Model Context Protocol estandariza la conexión de herramientas empresariales, bases de datos privadas y agentes personalizados.",
    excerpt:
      "Aprende cómo Google Gemini Enterprise utiliza el estándar abierto Model Context Protocol (MCP) para conectar microservicios internos, bases de datos SQL y GitHub sin bloqueos propietarios.",
    readTime: "7 min de lectura",
    keyTakeaways: [
      "MCP proporciona un estándar universal abierto para conectar LLM con herramientas y datos externos.",
      "Gemini Enterprise admite servidores MCP personalizados para consultar bases de datos y API internas de forma segura.",
      "Los equipos de seguridad pueden auditar y aplicar permisos de privilegio mínimo en todas las llamadas de herramientas MCP.",
      "Elimina conectores frágiles al estandarizar esquemas, prompts y recursos.",
    ],
    content: [
      "Conectar modelos de lenguaje con el software interno de la empresa requería wrappers y SDK propietarios. El Model Context Protocol (MCP) resuelve este desafío estableciendo un estándar abierto y universal para exponer herramientas y recursos a los asistentes de IA. [1] [2]",
      "### Cómo implementa MCP Gemini Enterprise",
      "En Gemini Enterprise Standard y Plus, los administradores pueden registrar servidores MCP privados en su VPC o infraestructura local para interactuar con bases de datos PostgreSQL, GitHub Actions o Datadog con lenguaje natural. [1]",
      "### Seguridad, autenticación y auditoría",
      "Cada interacción MCP se autentica con tokens corporativos y se registra en Google Cloud Audit Logs, permitiendo definir permisos de solo lectura o requerir aprobación humana para acciones críticas. [3]",
    ],
  },
  "gemini-workspace-vs-gemini-enterprise": {
    category: "Comparativas",
    title: "Gemini en Workspace frente a Gemini Enterprise: una comparación práctica",
    subtitle:
      "Comprende dónde funciona cada producto, cómo se conecta a los datos y qué debes verificar antes de elegir un despliegue.",
    excerpt:
      "Compara las capacidades de Gemini en Google Workspace con la app independiente Gemini Enterprise, incluidos los flujos entre apps, los conectores, los compromisos de privacidad y las comprobaciones de despliegue.",
    readTime: "7 min de lectura",
    keyTakeaways: [
      "Gemini en Workspace incorpora la IA a herramientas como Gmail, Drive, Docs, Sheets y Slides; las capacidades y el despliegue pueden variar según el plan de Workspace.",
      "Gemini Enterprise es un servicio independiente de Google Cloud con búsqueda empresarial por ediciones, conectores, agentes y cuotas.",
      "Algunos nuevos flujos de trabajo agénticos de Workspace anunciados en septiembre de 2026 se despliegan en planes concretos; la disponibilidad puede variar según la cuenta.",
      "Los compromisos de privacidad de Workspace de Google y los controles de Gemini Enterprise se aplican a sus respectivos productos; revisa los términos y la configuración de cada servicio.",
    ],
    content: [
      "Las dos ofertas pueden convivir, pero cubren partes distintas de la configuración de IA de una organización. Gemini en Workspace está integrado en las apps de productividad. Gemini Enterprise es un servicio independiente para la búsqueda empresarial y los flujos de trabajo con agentes sobre las fuentes de datos configuradas. [1] [2]",
      "### Gemini en Workspace: IA en el trabajo diario",
      "Las funciones de Workspace acercan la IA al correo, los documentos, las hojas de cálculo, las reuniones y los archivos. En septiembre de 2026, Google describió nuevas tareas entre apps que pueden usar el contexto de Workspace seleccionado o habilitado por el administrador para crear documentos, hojas de cálculo, presentaciones y gestionar tareas. Google indica que estas capacidades se despliegan para los clientes de Business Standard, Business Plus, Enterprise Standard y Enterprise Plus; consulta los detalles de las versiones de Workspace y la configuración de administrador para saber si están disponibles en tu cuenta. [1]",
      "Google también anunció las habilidades reutilizables de Workspace: instrucciones que capturan prácticas, formatos o plantillas de equipo para tareas repetidas. Son útiles para evaluar cuando se necesitan resultados consistentes, pero no sustituyen la revisión de permisos ni del trabajo generado. [2]",
      "### Gemini Enterprise: búsqueda y agentes entre fuentes",
      "Gemini Enterprise tiene su propia matriz de ediciones, conectores, cuotas agrupadas y controles de administrador. Business, Standard, Plus, de pago por uso y Frontline difieren en el acceso a conectores, las capacidades incluidas y las reglas de facturación o cuotas. Que un conector aparezca en la lista no significa que esté configurado o licenciado en un entorno de cliente concreto. [3] [4]",
      "Una división práctica consiste en empezar por la superficie de trabajo del usuario y las fuentes aprobadas. Si la tarea está dentro de Workspace, comienza por sus capacidades incluidas o habilitadas. Si las personas necesitan un único asistente sobre un conjunto más amplio de sistemas de Google y de terceros, compara las ediciones de Gemini Enterprise y la configuración exacta de conectores. Un despliegue combinado puede ser adecuado cuando existen ambas necesidades.",
      "### Comprobaciones de privacidad, acceso y despliegue",
      "Google afirma que no utiliza los datos de los clientes de Workspace para entrenar ni mejorar los modelos generativos subyacentes fuera de Workspace sin permiso. Revisa el acuerdo de Workspace aplicable y los controles de administrador, y evalúa Gemini Enterprise frente a sus propios términos de Cloud, permisos de origen, configuración regional y requisitos de auditoría. [5]",
      "Antes del despliegue, confirma qué funciones están disponibles en tu tenant, qué usuarios y sistemas de origen entran en el alcance, si se conservan los permisos de origen y qué revisión humana necesitan las salidas con consecuencias. Los anuncios de producto describen la disponibilidad de forma general; no confirman la habilitación para una organización concreta.",
    ],
  },
  "gemini-enterprise-pricing": {
    category: "Precios y adquisiciones",
    title:
      "Ediciones de Gemini Enterprise, señales de precio y planificación de cuotas",
    subtitle:
      "Una guía basada en fuentes sobre los precios públicos de partida, las diferencias entre ediciones, la indexación agrupada y las advertencias actuales de compra.",
    excerpt:
      "Consulta lo que Google publica actualmente sobre las ediciones de Gemini Enterprise, las señales de precio de lista, el almacenamiento y la indexación agrupados, y las distintas notas de disponibilidad del pago por uso.",
    readTime: "7 min de lectura",
    keyTakeaways: [
      "La página pública de Gemini Enterprise de Google indica Business desde 21 USD y Standard / Plus desde 30 USD por usuario y mes; son precios de partida, no una cotización completa.",
      "La página de marketing de Google indica que Business está disponible para hasta 300 puestos, mientras que la tabla técnica de ediciones indica de 1 a 500 usuarios; confirma la elegibilidad y las condiciones contractuales con Google.",
      "Standard y Plus tienen 30 GiB y 75 GiB por usuario respectivamente para almacenamiento e indexación, agrupados por proyecto y ubicación entre ediciones.",
      "El pago por uso no tiene coste por puesto y sí cargos por consumo, pero las páginas oficiales describen condiciones de elegibilidad y despliegue distintas. Verifica el acceso antes de presupuestar.",
    ],
    content: [
      "La planificación de costes de Gemini Enterprise necesita algo más que multiplicar un precio público por el número de usuarios. Las ediciones difieren en la funcionalidad incluida y las cuotas agrupadas, y las reglas de facturación pueden depender de la región, el contrato y la elegibilidad. La página de producto de Google indica Business desde 21 USD por usuario y mes y Standard / Plus desde 30 USD; solicita una cotización vigente para la edición, la moneda y las condiciones que piensas comprar. [1]",
      "### Ediciones por puesto y cuotas de datos indexados",
      "La documentación de ediciones de Google indica Business con 25 GiB por usuario, Standard con 30 GiB, Plus con 75 GiB y Frontline con 2 GiB para almacenamiento e indexación de datos. Estas capacidades se agrupan por proyecto y ubicación entre los usuarios, independientemente de la edición. Esta es una cuota de indexación de Gemini Enterprise, no almacenamiento de Google Drive. [2] [3]",
      "Otras cuotas de funciones se agrupan por separado dentro de cada edición, en un proyecto y una ubicación. Por ejemplo, Google documenta grupos de consultas de asistente distintos para Standard y Plus; los límites reales dependen de la tabla de cuotas vigente y de los puestos licenciados. Evita tratar la asignación de un puesto individual como un tope personal estricto. [3]",
      "La página de marketing de Google describe actualmente la oferta Business como de hasta 300 puestos, mientras que la documentación de comparación de ediciones indica de 1 a 500 usuarios de Business. Estas páginas oficiales no coinciden. Usa la cotización comercial y las condiciones de suscripción para establecer el límite real de tu compra. [1] [2]",
      "### Pago por uso: cargos por consumo y elegibilidad",
      "La edición de pago por uso no tiene coste por puesto y cobra por los recursos utilizados. La documentación de ediciones y cuotas describe una cuenta de Cloud Billing con factura y una suscripción activa mensual, con un mínimo de un puesto. La página pública de producto describe actualmente un despliegue gradual a un grupo limitado de clientes y un perfil de organización de 20 o más puestos; también indica que Gemini Notebook no está incluido actualmente. Confirma la elegibilidad con Google Cloud antes de planificar una migración. [1] [3] [4]",
      "Google anunció la disponibilidad general del pago por uso el 1 de agosto de 2026, al tiempo que señaló un despliegue gradual. En términos de compras, la disponibilidad general no significa disponibilidad inmediata para todas las cuentas. [4]",
      "### Una secuencia práctica de dimensionamiento",
      "Primero identifica los flujos de trabajo y las fuentes de datos, luego asigna usuarios a ediciones y comprueba las tablas completas de funciones y cuotas. Estima el volumen de orígenes indexados por separado del almacenamiento de Workspace, ten en cuenta los grupos compartidos y valida los requisitos de conectores y administradores en un piloto. Vuelve a comprobar los precios, la disponibilidad y las condiciones contractuales de Google justo antes de comprar.",
    ],
  },
  "what-is-gemini-enterprise": {
    category: "IA empresarial",
    title: "¿Qué es Gemini Enterprise? Fundamentos de producto, datos y gobernanza",
    subtitle:
      "Una visión fundamentada del servicio independiente Gemini Enterprise, sus conectores, su modelo de cuotas y sus controles de administrador.",
    excerpt:
      "Comprende Gemini Enterprise como un servicio de Google Cloud para la búsqueda empresarial y los agentes, con conectores de datos por edición, cuotas compartidas y controles de seguridad configurables.",
    readTime: "6 min de lectura",
    keyTakeaways: [
      "Gemini Enterprise es un producto distinto de Google Cloud con varias ediciones y diferentes derechos de acceso a conectores, agentes y seguridad.",
      "Su cuota de datos indexados se agrupa por proyecto y ubicación, y sus cuotas de sistema también dependen de la edición y del modo de facturación.",
      "Model Armor puede filtrar los prompts y las respuestas cuando un administrador lo configura; no se habilita solo porque la organización tenga una licencia.",
      "La implementación adecuada depende de los permisos de datos, los conectores, la residencia, los grupos de usuarios y los controles operativos.",
    ],
    content: [
      "Gemini Enterprise es la oferta de Google de búsqueda empresarial, asistente y agentes, prestada a través de Google Cloud. Su documentación de producto y ediciones describe capacidades para conectar datos de la organización, fundamentar respuestas, construir o usar agentes y gestionar el acceso. El conjunto exacto de funciones depende de la edición contratada y de la configuración. [1]",
      "### Tres partes que debes evaluar",
      "La capa de modelo y asistente gestiona los prompts y las respuestas de los usuarios. Las notas de la versión de Google indican la disponibilidad de modelos y el despliegue por región y por controles de administrador, por lo que que un modelo exista no garantiza que esté disponible en todos los tenants o ubicaciones. [2]",
      "La capa de fundamentación consta de las fuentes de datos de Google y de terceros configuradas. El acceso por edición difiere: la documentación distingue los conectores seleccionados del ecosistema completo de conectores de datos. Los administradores aún deben configurar cada fuente y comprobar qué permisos y contenido expone. [1]",
      "La capa de cuotas y administración fija el uso agrupado y la capacidad de indexación. La cuota de almacenamiento e indexación se comparte entre los usuarios de un proyecto y ubicación, en todas las ediciones, mientras que muchas otras cuotas de funciones se separan por edición. [3]",
      "### Model Armor y controles de seguridad",
      "Google documenta Model Armor para Gemini Enterprise como un control de filtrado configurable para los prompts y las respuestas del asistente, admitido en todas las ediciones sin coste adicional. Un administrador debe configurarlo. El filtrado puede añadir latencia; no oculta información personal identificable, y los modos de aplicación y de fallo seleccionados afectan a cómo se gestionan las solicitudes. [4]",
      "### Cómo planificar un despliegue",
      "Empieza nombrando las tareas, los usuarios y los sistemas de origen. Comprueba qué conectores y acciones están realmente disponibles en la edición seleccionada, cómo se gestionarán los permisos de origen, qué compromisos regionales y contractuales aplican y qué eventos pueden auditar los administradores. Prueba el flujo previsto con usuarios representativos y valida las citas y la calidad de las salidas frente al material de origen antes de ampliar el acceso.",
    ],
  },
  "google-workspace-gemini-updates-2026": {
    category: "Gemini",
    title: "Google Workspace con Gemini: nuevas capacidades anunciadas en 2026",
    subtitle:
      "Las tareas entre apps, las habilidades reutilizables y los flujos de creación están llevando la IA más allá de la asistencia a un solo documento.",
    excerpt:
      "Una instantánea con citas de los anuncios de Workspace con Gemini de septiembre y julio de 2026, con el alcance del despliegue, las habilidades reutilizables de equipo, las tareas entre apps y las comprobaciones de privacidad.",
    readTime: "5 min de lectura",
    keyTakeaways: [
      "Google anunció tareas agénticas entre apps en Workspace en septiembre de 2026, con la disponibilidad en Chat descrita como prevista para las semanas siguientes.",
      "Las habilidades de Google Workspace son prompts y referencias reutilizables pensados para captar el conocimiento del equipo en tareas repetibles.",
      "Los anuncios de julio cubrieron la generación de presentaciones y creación de contenido contextual en Slides, Docs y Vids.",
      "Los anuncios describen el despliegue previsto; verifica la disponibilidad del tenant y la elegibilidad del plan.",
    ],
    content: [
      "Los anuncios de Google Workspace de septiembre de 2026 describen a Gemini avanzando desde la asistencia app por app hacia tareas integrales que abarcan múltiples herramientas de productividad. [1]",
      "Google indicó que estas capacidades se desplegaban para clientes de Business Standard, Business Plus, Enterprise Standard y Enterprise Plus. [1]",
      "### Habilidades reutilizables de equipo",
      "Google anunció las habilidades de Workspace el 16 de septiembre. Una habilidad es un prompt reutilizable que guía a Gemini con reglas de equipo, plantillas y archivos de referencia. [2]",
      "### Flujos de creación en Docs, Slides y Vids",
      "La edición de Workspace Drop de julio de Google describió la creación de presentaciones editables usando archivos y presentaciones existentes de Workspace como contexto. [3]",
      "### Qué deben verificar los administradores y los equipos",
      "Antes de adoptar un flujo de trabajo, verifica el plan admitido, la disponibilidad regional, el alcance de las fuentes conectadas y los controles de administrador. [4]",
    ],
  },
};
