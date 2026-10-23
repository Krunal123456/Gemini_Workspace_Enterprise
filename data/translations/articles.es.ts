import type { ArticleTranslations } from "@/lib/i18n/localize";

/**
 * Spanish overlay for `data/articles.ts`.
 * Keyed by article `slug`. The `content` array is replaced wholesale and keeps
 * the same index order as the English source so the markdown renderer and the
 * `[1] [2]` citation markers stay aligned with `sources`.
 */
export const articlesES: ArticleTranslations = {
  "gemini-enterprise-deployment-checklist": {
    category: "IA empresarial",
    title: "Lista de verificación para desplegar Gemini Enterprise: planifica un piloto gobernado",
    subtitle:
      "Guía práctica para administradores sobre edición, configuración del proyecto, IAM, acceso a datos, cuotas, controles de seguridad y evaluación del piloto.",
    excerpt:
      "Usa esta lista de verificación basada en fuentes para preparar un piloto de Gemini Enterprise, confirmar acceso y licencias, conectar y autorizar almacenes de datos, entender las cuotas agrupadas y probar la calidad de búsqueda antes del despliegue.",
    readTime: "8 min de lectura",
    keyTakeaways: [
      "Confirma la edición y la documentación aplicables antes de planificar; Google mantiene Business separado de las ediciones de Cloud.",
      "Planifica el proyecto de Cloud, la facturación, la ubicación de la app y cualquier requisito de CMEK antes de crearla, ya que su ubicación no se puede cambiar después.",
      "Verifica por separado los roles de IAM, las licencias del producto, el acceso a la app y la autorización del almacén de datos durante el piloto.",
      "Las cuotas de funciones suelen agruparse por edición, proyecto y ubicación; la cuota de almacenamiento e indexación se comparte entre ediciones dentro de ese proyecto y ubicación.",
      "Usa consultas representativas y verifica los resultados con los usuarios previstos; la evaluación de calidad de búsqueda de Google no admite apps con varios almacenes de datos.",
    ],
    content: [
      "Un despliegue exitoso de Gemini Enterprise comienza con un flujo de trabajo acotado y comprobable y con límites de acceso adecuados, no con la conexión de todas las fuentes disponibles. Esta lista convierte la documentación actual de administración de Google en una secuencia para el piloto. Confirma los requisitos vigentes de edición, región y facturación de tu organización antes de comprar o desplegar en producción. [1] [2]",
      "### 1. Confirma la edición y el alcance del piloto",
      "Anota el grupo de usuarios, la tarea que el piloto debería mejorar, las fuentes de datos necesarias y cómo el equipo evaluará los resultados. Consulta la comparación de ediciones para las ediciones de Cloud incluidas en el alcance. Google señala que la documentación de Business se mantiene por separado, así que no des por hecho que todas las instrucciones de configuración de Cloud se aplican a Business. [2]",
      "Mantén el primer piloto lo bastante pequeño para probar los permisos y la calidad de las respuestas con usuarios representativos. Selecciona algunas preguntas recurrentes e identifica los documentos de origen que deberían respaldar cada respuesta. Así podrás probar la recuperación con consultas concretas en vez de depender de un prompt de demostración genérico.",
      "### 2. Prepara el proyecto, la facturación, la región y el cifrado",
      "Crea o selecciona el proyecto de Google Cloud que alojará la app y los almacenes de datos; después verifica la ruta de facturación y suscripción de la edición prevista. El pago por uso tiene requisitos de facturación y cargos de consumo propios; confirma sus condiciones actuales antes de habilitarlo. [1] [3]",
      "Elige la multirregión de la app teniendo en cuenta los requisitos de residencia de datos. La guía de creación de apps de Google indica que la ubicación no se puede cambiar después de crearla. Si la app usará claves de cifrado administradas por el cliente, registra la clave antes de crear la app; las apps creadas antes del registro no quedan protegidas por esa clave. [4]",
      "### 3. Separa el acceso de administradores, los roles de usuario y las licencias",
      "Concede a los administradores solo los roles necesarios para sus tareas. La guía de IAM de Google distingue el rol Gemini Enterprise Admin de los roles para gestionar conectores y distribuir licencias relacionadas con la facturación. Los usuarios finales también necesitan el rol de Gemini Enterprise adecuado y una licencia del producto. [5]",
      "Decide si los usuarios deben acceder a todas las apps del proyecto o solo a algunas. Para limitar el acceso a apps concretas, la guía de Google describe asignar el rol Restricted User en el proyecto y conceder el rol User en cada app autorizada; el rol restringido por sí solo no concede acceso a ninguna app. Prueba la combinación prevista con una cuenta piloto antes de invitar a un grupo más amplio. [5]",
      "### 4. Conecta las fuentes y verifica la autorización",
      "Crea la app y los almacenes de datos con los flujos de conectores admitidos y, después, conecta los almacenes necesarios a la app. Conectar un almacén no equivale a autorizar el acceso del usuario: la guía de Google requiere autorizar el almacén conectado y describe el paso de autorización de usuario en la app. Valida este paso con la identidad y los grupos que usarán el piloto. [4] [6]",
      "Prueba tanto el acceso esperado como la denegación esperada. Pide a un usuario piloto una respuesta cuya fuente esté permitida y luego prueba una pregunta similar sobre contenido al que no debería tener acceso. Revisa las fuentes y citas devueltas, no solo el texto de la respuesta.",
      "### 5. Calcula las cuotas y la exposición a cargos por exceso",
      "En las ediciones con licencia, las cuotas de funciones suelen agruparse entre los usuarios de la misma edición dentro de un proyecto y ubicación. La capacidad de almacenamiento e indexación de datos forma un grupo compartido separado para todos los usuarios y ediciones de ese proyecto y ubicación. Calcula el uso previsto de ambos grupos y vigílalos durante el piloto. [3]",
      "El pago por uso no tiene límites de cuotas de funciones, pero cobra según el consumo. Las ediciones con licencia pueden ofrecer opciones de exceso con sus propios requisitos de facturación y configuración. Consulta la documentación vigente de cuotas y facturación para la suscripción concreta, en vez de copiar un límite de otra edición o de un artículo antiguo. [3]",
      "### 6. Configura los controles de seguridad de forma deliberada",
      "Model Armor es un control opcional que debe configurar un administrador para analizar los prompts y las respuestas del asistente; no se habilita solo por comprar una edición. Google indica que puede añadir latencia y que no elimina ni enmascara información personal identificable. Elige conscientemente el modo de aplicación y el comportamiento ante fallos del servicio, y luego prueba solicitudes permitidas y bloqueadas durante el piloto. [7]",
      "### 7. Evalúa el piloto antes de ampliarlo",
      "Mantén un conjunto repetible de consultas representativas y documentos de origen esperados. La evaluación de calidad de búsqueda de Google puede generar métricas agregadas y por consulta, como recall, precisión y NDCG, y ayudar a comparar cambios de configuración a lo largo del tiempo. El método documentado no admite apps con varios almacenes de datos, así que úsalo dentro de su alcance admitido y añade comprobaciones manuales para el resto del flujo. [8]",
      "Antes del despliegue, registra qué pasó las pruebas, qué falló, qué casos de acceso se comprobaron, el uso observado de cuotas y quién se encargará de los siguientes pasos. Vuelve a verificar la matriz de ediciones, las condiciones de facturación, la autorización de las fuentes y la configuración de seguridad cuando cambie el alcance del piloto; la documentación y la disponibilidad del producto pueden cambiar.",
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
      "La documentación de ediciones de Google indica Business con 25 GiB, Standard con 30 GiB, Plus con 75 GiB y Frontline con 2 GiB de almacenamiento e indexación de datos por licencia. Estas asignaciones se agrupan por proyecto y ubicación entre los usuarios, independientemente de la edición. Esta es una cuota de indexación de Gemini Enterprise, no almacenamiento de Google Drive. [2] [3]",
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
  "gemini-api-models": {
    category: "Gemini",
    title: "Modelos de Gemini API: identificadores, límites y precios actuales",
    subtitle: "Consulta el catálogo y los precios oficiales para verificar identificadores, estado, límites de tokens y tarifas.",
    excerpt: "Comprueba el catálogo vigente de modelos Gemini y consulta los precios antes de estimar el coste de la API.",
    readTime: "7 min de lectura",
    keyTakeaways: ["Los identificadores y el estado de cada modelo Gemini API dependen de la versión; copia el identificador exacto del catálogo vigente.", "Gemini 4 Argon y Gemini 3.8 Flash documentan un contexto de 1.048.576 tokens, pero los límites de salida y las funciones varían.", "Los precios introductorios de API tienen fechas de vigencia y no son precios de suscripción de Google Workspace."],
    content: [
      "El catálogo de Gemini API cambia cuando se lanzan modelos, pasan de vista previa a disponibilidad general o llegan al final de su ciclo de vida. Usa el identificador y el estado exactos del catálogo de Google; el nombre de una familia no basta para identificar un endpoint de producción. Gemini API es un producto para desarrolladores, separado de las funciones Gemini incluidas en suscripciones de Google Workspace. [1]",
      "### Ejemplos de modelos actuales",
      "El catálogo de Google incluye Gemini 4 Argon (`gemini-4-argon`) y Gemini 3.8 Flash (`gemini-3.8-flash`) con disponibilidad general. También enumera Gemini 3.7 Flash y Gemini 3.6 Flash como estables, mientras que Gemini 3.1 Pro está en vista previa. Comprueba el catálogo antes de depender de esos estados, ya que pueden cambiar. [1]",
      "### Límites de contexto y salida",
      "Las páginas de Gemini 4 Argon y Gemini 3.8 Flash documentan un límite de contexto de 1.048.576 tokens. Eso no significa que todas las solicitudes puedan generar la misma cantidad de salida: los límites dependen del modelo, endpoint, modo de decodificación y otros parámetros. Consulta la página específica del modelo y prueba la API para tu caso. [3] [4]",
      "### Precios de API publicados",
      "A fecha del 18 de octubre de 2026, la página de precios de Google muestra tarifas introductorias estándar de 2 USD por millón de tokens de entrada y 10 USD por millón de salida para Gemini 4 Argon hasta el 30 de noviembre de 2026. Para Gemini 3.8 Flash muestra 0,75 USD por millón de entrada y 3,75 USD por millón de salida hasta el 31 de diciembre de 2026. El nivel, las herramientas y el tipo de token pueden afectar el precio; vuelve a consultar la página vigente al presupuestar. [2]",
      "### Lista práctica para elegir un modelo",
      "Elige un modelo estable cuando sea importante la previsibilidad del ciclo de vida. Compara la calidad con prompts representativos, la latencia, los límites de entrada y salida y el coste según el uso real. Fija el identificador exacto, registra la fecha y los supuestos de precio, supervisa el consumo y planifica la migración de modelos en vista previa o próximos a retirarse. [1] [2]",
      "### Separa los modelos API de los planes Workspace",
      "Los identificadores y precios de Gemini API describen el uso de la API para desarrolladores. No determinan qué funciones están incluidas en las suscripciones Business o Enterprise de Google Workspace. Para consultar la elegibilidad de los planes, usa la documentación vigente de precios y ediciones de Workspace."
    ],
  },
  "gemini-deep-research-workspace": {
    category: "IA empresarial",
    title: "Gemini Deep Research: funciones y aspectos que debes verificar",
    subtitle: "Una guía basada en fuentes sobre los flujos de investigación anunciados y sus condiciones de disponibilidad.",
    excerpt: "Google describe flujos de varios pasos entre apps de Workspace y fuentes seleccionadas por el usuario o habilitadas por un administrador.",
    readTime: "4 min de lectura",
    keyTakeaways: ["Google anunció flujos de Gemini que abarcan varias apps de Workspace.", "La disponibilidad depende del despliegue y de la cuenta."],
    content: ["Google describe flujos de varios pasos entre apps de Workspace que pueden usar fuentes elegidas por el usuario o habilitadas por un administrador. Confirma la disponibilidad en tu cuenta. [1]", "### Confirma el alcance y las fuentes", "Consulta la documentación principal, verifica la configuración y revisa los resultados frente a las fuentes originales. La disponibilidad del producto puede cambiar."],
  },
  "notebooklm-sources-audio-overviews": {
    category: "Gemini",
    title: "NotebookLM para el trabajo: fuentes, resúmenes de audio y verificación",
    subtitle: "Cómo explorar fuentes con NotebookLM y comprobar las afirmaciones importantes en el material original.",
    excerpt: "NotebookLM puede ayudar a explorar las fuentes añadidas y crear resúmenes de audio, pero las respuestas deben verificarse.",
    readTime: "4 min de lectura",
    keyTakeaways: ["Las citas ayudan a verificar las respuestas, pero no garantizan que sean correctas.", "Comprueba los datos importantes en los documentos originales."],
    content: ["NotebookLM ayuda a explorar materiales añadidos a un cuaderno y puede generar resúmenes de audio. Las respuestas pueden estar incompletas o contener errores; verifica los datos importantes en las fuentes originales. [1] [2]", "### Usa las fuentes con cuidado", "Añade materiales permitidos por las políticas de tu organización. Abre las citas y compara las respuestas con los documentos antes de compartirlas o actuar."],
  },
  "gemini-enterprise-custom-mcp-servers": {
    category: "IA empresarial",
    title: "Servidores MCP personalizados en Gemini Enterprise: requisitos de configuración",
    subtitle: "Revisa el transporte, TLS, autenticación y límites documentados por Google antes de conectar un servidor MCP.",
    excerpt: "Google documenta conexiones de servidores MCP personalizados para Gemini Enterprise; verifica los requisitos actuales antes de implementarlas.",
    readTime: "4 min de lectura",
    keyTakeaways: ["La guía vigente especifica el transporte Streamable HTTP.", "Comprueba los requisitos de TLS, red, autenticación y acciones en la documentación oficial."],
    content: ["La documentación actual de Gemini Enterprise explica cómo configurar un servidor MCP personalizado. Sigue la guía específica del producto en lugar de asumir que todos los transportes son compatibles. [1]", "### Comprueba el transporte y los requisitos", "La guía especifica Streamable HTTP, certificado TLS de confianza pública y un máximo documentado de 100 acciones por servidor. Confirma los requisitos vigentes antes de implementar. [1]"],
  },
  "gemini-workspace-cross-app-tasks": {
    category: "IA empresarial",
    title: "Tareas entre apps de Google Workspace con Gemini: qué se anunció",
    subtitle: "Conoce los flujos anunciados, las fuentes seleccionadas por el usuario y las condiciones de disponibilidad.",
    excerpt: "Google describe tareas entre apps iniciadas por el usuario. El anuncio no describe cuentas de Workspace autónomas con correo propio.",
    readTime: "4 min de lectura",
    keyTakeaways: ["Google anunció flujos entre apps bajo la dirección del usuario.", "El anuncio no indica que los agentes tengan su propia cuenta o dirección de correo."],
    content: ["Google anunció capacidades de Gemini entre apps de Workspace para tareas iniciadas por el usuario. Las fuentes pueden ser seleccionadas por el usuario o habilitadas por un administrador; el anuncio no describe agentes con cuentas de correo propias. [1]", "### Confirma el flujo y el despliegue", "Revisa las notas de lanzamiento, comprueba la disponibilidad en tu organización y verifica qué usuarios, apps y fuentes están incluidos. El despliegue puede variar. [1]"],
  },
  "gemini-in-gmail-ai-overviews": {
    category: "IA empresarial",
    title: "Gemini en Gmail: resúmenes, ayuda para redactar y disponibilidad",
    subtitle: "Un resumen basado en fuentes de la asistencia de IA anunciada para Gmail y sus condiciones de despliegue.",
    excerpt: "Google anunció resúmenes de conversaciones y ayuda personalizada para redactar. Comprueba el despliegue y la elegibilidad de tu cuenta.",
    readTime: "4 min de lectura",
    keyTakeaways: ["La disponibilidad depende del producto, la cuenta, la suscripción y el despliegue.", "Revisa las notas de lanzamiento y los controles de administración actuales."],
    content: ["Google anunció resúmenes de conversaciones de correo y ayuda personalizada para redactar en Gmail. La disponibilidad depende del producto, la cuenta y el estado del despliegue. [1] [2]", "### Resúmenes y ayuda para redactar", "Los resúmenes pueden ayudar a revisar conversaciones largas. Revisa el texto generado antes de enviarlo; el anuncio no garantiza disponibilidad universal ni un ahorro de tiempo específico. [1]"],
  },
};
