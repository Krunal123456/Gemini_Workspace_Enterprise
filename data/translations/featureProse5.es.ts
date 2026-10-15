import type { FeatureTranslation } from "@/lib/i18n/localize";

/** Spanish body copy, batch 5 (Google Labs, developer tools, security). */
export const featureProseES5: Record<string, FeatureTranslation> = {
  "google-labs-whisk-image-to-video": {
    description:
      "Anima imágenes fijas y genera clips de vídeo cortos, realistas y coherentes.",
    whatItDoes:
      "Toma cualquier fotografía o ilustración que subas y genera movimiento realista basado en la física y movimiento de cámara.",
    howItWorks:
      "Usa síntesis de movimiento basada en difusión para predecir el flujo óptico temporal a partir de un único fotograma de referencia.",
  },
  "google-labs-project-mariner-us-only": {
    description:
      "Agente experimental de navegador que ejecuta de forma autónoma tareas de investigación web y navegación de varios pasos.",
    whatItDoes:
      "Despliega un asistente de navegador autónomo por IA que navega por varios sitios web, rellena formularios, compara productos y extrae datos.",
    howItWorks:
      "Aplica visión por computadora y automatización de acciones del navegador para observar páginas web y emitir comandos nativos de clic y escritura.",
  },
  "google-labs-antigravity": {
    description:
      "Asistente de programación agéntico autónomo y plataforma de inteligencia para el trabajo en pareja que busca la productividad de los desarrolladores y la transformación de código a escala del sistema.",
    whatItDoes:
      "Permite a los ingenieros desarrollar software de forma agéntica avanzada, refactorizar código, generar pruebas y ejecutar comandos de terminal de forma autónoma en repositorios completos.",
    howItWorks:
      "Integra indexación profunda del código base con agentes de razonamiento que inspeccionan archivos, rastrean la arquitectura, ejecutan comandos de validación y proponen o ejecutan cambios verificados con supervisión humana.",
  },
  "developer-tools-gemini-cli": {
    description:
      "Interfaz de línea de comandos centrada en la terminal para los modelos Gemini, los flujos de trabajo y la automatización en la nube.",
    whatItDoes:
      "Lleva la inteligencia de Gemini directamente a la terminal para generar comandos, depurar canalizaciones y ejecutar scripts.",
    howItWorks:
      "Binario nativo y ligero que se comunica con las API de desarrollo autenticadas de Google Cloud y Workspace.",
  },
  "developer-tools-gemini-code-assist": {
    description:
      "Asistencia de programación con IA empresarial dentro de VS Code, IntelliJ y Cloud Workstations, con el contexto completo de la base de código.",
    whatItDoes:
      "Genera autocompletados de código, corrige errores, refactoriza métodos y responde preguntas de arquitectura directamente dentro de los IDE más utilizados.",
    howItWorks:
      "Usa indexación local y en la nube del repositorio para ofrecer sugerencias con contexto que cumplen las reglas de privacidad de PI empresarial.",
  },
  "security-vault-ediscovery": {
    description:
      "Conserva, bloquea, busca y exporta datos de Gmail, Drive, Chat, grabaciones de Meet e interacciones con Gemini.",
    whatItDoes:
      "Proporciona descubrimiento legal institucional y retención de registros legales en todos los mensajes de colaboración e interacciones de IA.",
    howItWorks:
      "Aplica retenciones legales inmutables y políticas de conservación, indexando metadatos para una búsqueda rápida por palabras clave y custodios.",
  },
  "security-dlp": {
    description:
      "Evita la filtración de datos sensibles en Gmail, Drive, Chat y las entradas de Gemini en tiempo real.",
    whatItDoes:
      "Detecta datos sensibles como tarjetas de crédito, números de seguridad social, historiales médicos y claves de API secretas, bloqueando automáticamente la exfiltración externa.",
    howItWorks:
      "Usa expresiones regulares preconfiguradas y personalizadas junto con detectores de aprendizaje automático para inspeccionar los mensajes salientes y los archivos subidos.",
  },
  "security-model-armor": {
    description:
      "Cortafuegos empresarial activo de IA que protege frente a inyecciones indirectas de prompts, jailbreaks y filtraciones de datos sensibles.",
    whatItDoes:
      "Ofrece una defensa empresarial avanzada frente a ataques adversarios sofisticados que intentan manipular el comportamiento del modelo o extraer datos confidenciales.",
    howItWorks:
      "Inspecciona prompts, incrustaciones de documentos y salidas del modelo mediante un proxy inteligente que neutraliza los patrones de carga útil adversaria.",
  },
  "security-data-residency": {
    description:
      "Almacenamiento geográfico garantizado de los datos de los clientes y de la inferencia de IA dentro de las jurisdicciones regulatorias especificadas.",
    whatItDoes:
      "Garantiza que tanto los datos en reposo como la ejecución del modelo de IA en tránsito cumplan las leyes nacionales y continentales de residencia.",
    howItWorks:
      "Dirige las solicitudes a zonas regionales de centros de datos de Google Cloud que cumplen los límites legales de tratamiento de datos.",
  },
  "security-vpc-service-controls": {
    description:
      "Establece un perímetro de seguridad alrededor de los recursos de Google Cloud y los datos de Gemini para mitigar los riesgos de exfiltración.",
    whatItDoes:
      "Bloquea el movimiento de datos entre los perímetros internos de Google Cloud Enterprise y los puntos finales públicos externos no autorizados.",
    howItWorks:
      "Configura perímetros de seguridad de red en la capa de recursos de la nube, aplicando políticas de límites de IP y de proyecto.",
  },
  "security-hipaa-compliance": {
    description:
      "Configuraciones de cumplimiento de HIPAA para conversaciones de Gemini que no conservan información de pacientes identificable (PHI).",
    whatItDoes:
      "Permite el procesamiento conforme a HIPAA de conversaciones que contienen información médica protegida, bajo contrato empresarial.",
    howItWorks:
      "Desactiva el historial y el registro de conversaciones en los flujos de trabajo conformes, limitando la retención de datos a la sesión.",
  },
};
