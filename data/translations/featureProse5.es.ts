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
      "Google Vault admite retención, bloqueos, búsqueda y exportación para datos de Workspace elegibles. La cobertura de servicios e interacciones con Gemini depende de la documentación actual y la edición de la cuenta.",
    whatItDoes:
      "Ayuda a las organizaciones elegibles a gestionar la retención y el eDiscovery de los tipos de datos de Workspace cubiertos por Vault.",
    howItWorks:
      "Los administradores configuran reglas de retención y bloqueos para los servicios compatibles y después buscan o exportan los datos correspondientes.",
  },
  "security-dlp": {
    description:
      "Google Workspace DLP aplica reglas de administrador a servicios y contenidos compatibles. La cobertura y las acciones varían; no garantiza proteger todas las solicitudes o flujos de Gemini.",
    whatItDoes:
      "Permite que los administradores definan reglas de protección de datos para servicios de Workspace compatibles y revisen sus coincidencias.",
    howItWorks:
      "Las reglas utilizan condiciones y detectores compatibles, con acciones y herramientas de investigación específicas por servicio.",
  },
  "security-model-armor": {
    description:
      "Google Cloud Model Armor es un servicio de seguridad que se configura por separado para inspeccionar solicitudes y respuestas compatibles. No viene incluido automáticamente en los planes de Workspace o Gemini Enterprise.",
    whatItDoes:
      "Ofrece filtros configurables para interacciones de IA compatibles; la protección depende de la integración, la política y la cobertura del servicio.",
    howItWorks:
      "Las solicitudes deben pasar por una integración y filtros configurados de Model Armor. No protege automáticamente todas las experiencias ni flujos de Gemini.",
  },
  "security-data-residency": {
    description:
      "Los controles de residencia pueden aplicarse a servicios y tipos de datos concretos; no son una garantía general para toda inferencia de IA.",
    whatItDoes:
      "Ayuda a los administradores a seleccionar ubicaciones geográficas para los datos elegibles cuando Google ofrece ese control.",
    howItWorks:
      "La cobertura depende del producto, servicio, edición, estado de los datos, región y contrato.",
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
      "Las organizaciones que manejan información médica protegida deben confirmar el BAA aplicable de Google, los servicios cubiertos, la edición y la configuración antes de usar Workspace con PHI.",
    whatItDoes:
      "Dirige a los administradores a los requisitos del BAA y la guía de implementación de Google. Usar Workspace no hace que una organización cumpla HIPAA automáticamente.",
    howItWorks:
      "La cobertura depende de las condiciones del BAA y los servicios incluidos; el cliente sigue siendo responsable de sus obligaciones y configuración.",
  },
};
