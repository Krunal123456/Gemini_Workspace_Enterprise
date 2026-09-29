import type { ArticleTranslations } from "@/lib/i18n/localize";

/**
 * Spanish overlay for `data/articles.ts`.
 * Keyed by article `slug`. The `content` array is replaced wholesale and keeps
 * the same index order as the English source so the markdown renderer and the
 * `[1] [2]` citation markers stay aligned with `sources`.
 */
export const articlesES: ArticleTranslations = {
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
    title: "Google Workspace con Gemini: nuevas capacidades anunciadas en 2026",
    subtitle:
      "Las tareas entre apps, las habilidades reutilizables y los flujos de creación están llevando la IA más allá de la asistencia a un solo documento.",
    excerpt:
      "Una instantánea con citas de los anuncios de Workspace con Gemini de septiembre y julio de 2026, con el alcance del despliegue, las habilidades reutilizables de equipo, las tareas entre apps y las comprobaciones de privacidad.",
    readTime: "5 min de lectura",
    keyTakeaways: [
      "Google anunció tareas agénticas entre apps en Workspace en septiembre de 2026, con la disponibilidad en Chat descrita como prevista para las semanas siguientes.",
      "Las habilidades de Google Workspace son prompts y referencias reutilizables pensados para captar el conocimiento del equipo en tareas repetibles.",
      "Los anuncios de julio cubrieron la generación de presentaciones y la creación de contenido contextual en Slides, Docs y Vids.",
      "Los anuncios describen el despliegue y el comportamiento previsto del producto; verifica la disponibilidad en el tenant, los controles de administrador y la elegibilidad del plan.",
    ],
    content: [
      "Los anuncios de Workspace de Google de septiembre de 2026 describen a Gemini pasando de la asistencia app por app a tareas que pueden abarcar varias apps de productividad. Los nuevos flujos pueden usar los archivos, correos e hilos de chat relevantes según las fuentes seleccionadas o habilitadas por el administrador, y pueden generar artefactos como Docs, Sheets y Slides con formato. [1]",
      "Google indicó que estas capacidades se estaban desplegando en Business Standard, Business Plus, Enterprise Standard y Enterprise Plus, así como en ciertos planes personales y educativos. El anuncio no es una comprobación de habilitación por cliente; confirma lo que aparece en tu tenant de Workspace y la configuración de administrador que lo controla. [1]",
      "### Habilidades de equipo reutilizables",
      "Google anunció las habilidades de Workspace el 16 de septiembre. Una habilidad es un prompt reutilizable que guía a Gemini con reglas de equipo, plantillas y archivos de referencia. Los ejemplos de Google incluyen una voz de marca coherente, formatos de documento estándar y actualizaciones de estado. Puede ayudar a que el trabajo repetitivo sea más consistente, aunque las salidas aún deben revisarse en cuanto a corrección y permisos. [2]",
      "### Flujos de creación en Docs, Slides y Vids",
      "La edición de Workspace Drop de julio de Google describió la creación de presentaciones editables usando archivos y presentaciones existentes de Workspace como contexto, resumir y actuar sobre los comentarios de los documentos, y crear elementos visuales en Docs. También señaló que los controles de procesamiento regional de la app Gemini se estaban ampliando e identificó cambios en la disponibilidad de idiomas. El despliegue y la inclusión en el plan deben comprobarse con la información vigente de planes de Google Workspace. [3]",
      "### Qué deben verificar los administradores y los equipos",
      "Antes de adoptar un flujo de trabajo, verifica el plan admitido, la disponibilidad regional, el alcance de las fuentes conectadas, los controles de administrador y cómo revisan o aprueban los usuarios los documentos y las acciones generadas. Google afirma que los datos de los clientes de Workspace no se utilizan para entrenar ni mejorar modelos de IA generativa fuera de Workspace sin permiso; revisa todos los compromisos de privacidad y las condiciones del servicio que correspondan a tu situación. [4]",
    ],
  },
  "workspace-gemini-editions-and-limits-2026": {
    title:
      "Gemini en Google Workspace: qué incluyen las ediciones y en qué difieren los límites",
    subtitle:
      "Separa la IA dentro de las apps de Workspace de la app Gemini, de Notebook y del acceso ampliado opcional al comparar planes.",
    excerpt:
      "Una guía actualizada sobre la disponibilidad de Gemini en Workspace por plan, las fuentes de Workspace Intelligence gestionadas por el administrador y por qué los límites de uso difieren entre los productos de Gemini.",
    readTime: "5 min de lectura",
    keyTakeaways: [
      "Las tablas de funciones de Workspace de Google distinguen las funciones principales de Gemini de las funciones avanzadas, e indican la disponibilidad por edición y complemento.",
      "Gemini en las apps de Workspace, la app Gemini y Gemini Notebook tienen accesos y límites de uso distintos.",
      "Workspace Intelligence permite a los administradores controlar qué fuentes de Workspace puede buscar Gemini, y respeta los permisos de contenido existentes del usuario.",
      "Las tablas de ediciones actuales de Google contienen accesos promocionales y cambios de límites programados; vuelve a consultar la comparación oficial antes de fijar expectativas.",
    ],
    content: [
      "Google Workspace no ofrece una asignación idéntica de Gemini en todos los planes. La comparación actual de Workspace de Google separa las funciones de Gemini de las funciones avanzadas de Gemini y muestra la disponibilidad y el uso por edición Business, edición Enterprise y AI Expanded Access. Por eso, Starter, Standard, Plus y Enterprise deben compararse con la función exacta que necesita tu equipo, y no agruparse bajo una única etiqueta de «Gemini incluido». [1] [2]",
      "### Mantén distintas las superficies de Gemini",
      "Google documenta límites separados para las funciones de Gemini dentro de las apps de Workspace y para la app Gemini. Gemini Notebook también tiene sus propios niveles de acceso. Un límite en una superficie de producto no debe suponerse representativo de la asignación en otra. Consulta las tablas vigentes de funciones y uso de Google para la superficie y el plan concretos. [1] [2]",
      "### Workspace Intelligence y acceso a fuentes",
      "Workspace Intelligence puede proporcionar a Gemini contexto de Gmail, Drive y Docs (incluidos Sheets, Slides, PDF, imágenes y Vids), Calendar y Chat. Los administradores pueden activar o desactivar servicios de origen individuales; Google indica que los cambios pueden tardar hasta 48 horas. La función respeta los permisos existentes del usuario, por lo que Gemini solo debe fundamentar sus respuestas en material al que esa persona tenga acceso. [3]",
      "### Comprobaciones de plan y despliegue",
      "Antes de comprar o lanzar, confirma la edición y el complemento, la función exacta de Gemini y la superficie de producto, los límites por usuario, la configuración administrativa de fuentes, la región y el estado del despliegue, y si un acceso promocional tiene fecha de fin. La página de planes publicada puede mostrar precios o promociones temporales de funciones, mientras que las tablas del centro de ayuda describen la disponibilidad y los límites del servicio. Compara ambas cerca de la fecha de decisión. [1] [2] [4]",
      "A 28 de septiembre de 2026, las tablas de ediciones de Workspace de Google identifican algunos accesos promocionales con fechas de aplicación programada de límites, incluido Workspace Studio el 1 de octubre. Trata las asignaciones específicas de fecha como una instantánea y verifica la tabla actualizada una vez pasado el hito de política o despliegue. [1] [2]",
    ],
  },
  "gemini-enterprise-latest-updates-2026": {
    category: "IA empresarial",
    title:
      "Gemini Enterprise: actualización de la versión y el despliegue de septiembre de 2026",
    subtitle:
      "Las notas de la versión oficiales recientes cubren Gemini 3.8 Flash, los protocolos de agentes, las habilidades, el pago por uso y el soporte cambiante de conectores.",
    excerpt:
      "Sigue los cambios relevantes de Gemini Enterprise anunciados hasta septiembre de 2026 y distingue las funciones de disponibilidad general de las vistas previas y los despliegues graduales.",
    readTime: "5 min de lectura",
    keyTakeaways: [
      "Gemini 3.8 Flash pasó a estar disponible de forma general y se habilitó por defecto en la app para las regiones global, EE. UU. y UE el 23 de septiembre de 2026.",
      "El soporte para registrar agentes A2UI y A2A alcanzó la disponibilidad general en agosto; las funciones de agente de Workspace y de Cloud mantienen límites de producto separados.",
      "Las habilidades personalizadas y el pago por uso son adiciones recientes, mientras que los nuevos conectores se publican con su propio estado de vista previa o disponibilidad general.",
      "La región, los interruptores de funciones, la elegibilidad de la cuenta y la edición siguen siendo importantes; consulta las notas de la versión antes de depender de una capacidad.",
    ],
    content: [
      "Las notas de la versión de Gemini Enterprise de Google son el mejor lugar para comprobar los cambios de producto, porque etiquetan los anuncios por fecha y estado. Esta instantánea refleja las notas oficiales disponibles el 28 de septiembre de 2026; la documentación puede cambiar tras la publicación de esta guía. [1]",
      "### Septiembre: Gemini 3.8 Flash",
      "El 23 de septiembre, Google marcó Gemini 3.8 Flash como disponible de forma general y lo habilitó por defecto en la app Gemini Enterprise en las regiones global, EE. UU. y UE. Los administradores pueden gestionar la disponibilidad de los modelos. Los detalles del enrutamiento regional importan: habilitar modelos en regiones del país que no los admiten puede dirigir el tráfico al endpoint global, que tiene distintas implicaciones de residencia. [1]",
      "### Agosto: agentes, habilidades y fuentes de datos",
      "Google pasó el soporte de registro y gestión de agentes A2UI y A2A a disponibilidad general el 17 de agosto, incluido el soporte de A2UI v0.9. Por separado, las habilidades personalizadas pasaron a estar generalmente disponibles el 13 de agosto, con ajustes de administrador para habilitarlas, gestionar la disponibilidad y aprobar el uso compartido. [1]",
      "Las notas de la versión también enumeran nuevos almacenes de datos y acciones de conectores en vista previa. El estado de vista previa no equivale a disponibilidad general y puede tener restricciones de producto, región o soporte. Consulta la documentación de configuración de cada conector y la matriz de ediciones antes de diseñar en torno a una fuente. [1] [2]",
      "### Pago por uso y compras",
      "Google anunció la disponibilidad general del pago por uso el 1 de agosto, con cargos basados en las funciones consumidas en lugar de en cuotas agrupadas de licencias de usuario. El despliegue es gradual y Google exige una cuenta de Cloud Billing con factura. La página de producto sigue describiendo una disponibilidad limitada y excluye Gemini Notebook por ahora; confirma la elegibilidad y la inclusión actual con Google Cloud. [1] [3]",
      "### Cómo usar las notas de la versión con responsabilidad",
      "Para una decisión de despliegue, registra el estado de la función (disponibilidad general, vista previa o disponibilidad limitada), la superficie de producto, la edición, la región, el interruptor de administrador necesario y la documentación de origen. Vuelve a comprobar estos puntos durante las compras y antes de cada fase de despliegue; el estado de una versión puede cambiar con rapidez.",
    ],
  },
};
