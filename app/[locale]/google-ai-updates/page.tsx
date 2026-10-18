import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Cloud,
  ExternalLink,
  Globe2,
  RefreshCw,
  Sparkles,
  Workflow,
} from "lucide-react";
import { resolveLocale, type Locale } from "@/lib/i18n/config";
import { withLocalizedAlternates } from "@/lib/seo";

type Update = {
  date: string;
  status: string;
  title: string;
  summary: string;
  engineerNote: string;
  sources: { label: string; href: string }[];
};

type PageCopy = {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  checked: string;
  caveat: string;
  apiHeading: string;
  apiIntro: string;
  enterpriseHeading: string;
  enterpriseIntro: string;
  workspaceHeading: string;
  workspaceIntro: string;
  checklistHeading: string;
  checklistIntro: string;
  checklist: string[];
  feedsHeading: string;
  feedsIntro: string;
  sourcesLabel: string;
  updates: {
    api: Update[];
    enterprise: Update[];
    workspace: Update[];
  };
};

const sourceLinks = {
  apiNotes: "https://ai.google.dev/gemini-api/docs/changelog",
  apiModels: "https://ai.google.dev/gemini-api/docs/models",
  apiDeprecations: "https://ai.google.dev/gemini-api/docs/deprecations",
  enterpriseNotes: "https://docs.cloud.google.com/gemini/enterprise/docs/release-notes",
  enterpriseLocations: "https://docs.cloud.google.com/gemini/enterprise/docs/locations",
  enterpriseFeatureControls: "https://docs.cloud.google.com/gemini/enterprise/docs/manage-web-app-features",
  enterpriseWorkflowBuilder: "https://docs.cloud.google.com/gemini/enterprise/docs/workflow-builder",
  enterpriseMcpCitations: "https://docs.cloud.google.com/gemini/enterprise/docs/connectors/custom-mcp-server/configure-citations-for-custom-mcp-data-stores",
  workspaceDrop: "https://workspace.google.com/blog/product-announcements/september-2026-workspace-feature-drop",
  workspaceAgents: "https://workspace.google.com/blog/product-announcements/less-switching-more-flow-5-new-agentic-capabilities-across-google-workspace-apps",
  workspaceSkills: "https://workspace.google.com/blog/product-announcements/teach-gemini-your-teams-know-hows-with-skills-in-google-workspace",
  gmailAiInbox: "https://workspaceupdates.googleblog.com/2026/10/gmails-ai-inbox-is-rolling-out-to-paid-Workspace-users.html",
  gmailLive: "https://workspaceupdates.googleblog.com/2026/10/gmail-live-is-rolling-out-to-paid-Workspace-users.html",
  meetNextSteps: "https://workspaceupdates.googleblog.com/2026/10/find-your-routine-next-steps-on-post-meeting-screen-in-Google-Meet.html",
  skillsRollout: "https://workspaceupdates.googleblog.com/2026/10/an-update-on-launch-of-skills-in-gemini-app-and-workspace.html",
};

const copy: Record<Locale, PageCopy> = {
  en: {
    title: "Google AI Release Updates for Customer Engineers",
    description:
      "A source-led engineering brief on current Gemini API, Gemini Enterprise, and Google Workspace updates, availability, migration impact, and rollout checks.",
    eyebrow: "Customer engineering brief · 18 October 2026",
    heading: "Google AI updates, translated into engineering actions.",
    intro:
      "A practical digest of recent official Google announcements for teams evaluating, deploying, or supporting Gemini. Each item includes the operational detail to verify before you promise availability or change a production integration.",
    checked: "Sources reviewed through October 16, 2026",
    caveat:
      "Release announcements are not tenant-level availability guarantees. Confirm account eligibility, region, edition, billing, administrator controls, API model IDs, and current terms in the linked source before customer commitments.",
    apiHeading: "Gemini API and models",
    apiIntro:
      "Model lifecycle changes need immediate attention: model names, routing behavior, cost, and supported features can change independently of Workspace or Gemini Enterprise subscriptions.",
    enterpriseHeading: "Gemini Enterprise on Google Cloud",
    enterpriseIntro:
      "Treat app availability, AI developer tools, Workflow Builder, connectors, and regional processing as separate capabilities. Several recent launches require an administrator to enable a control.",
    workspaceHeading: "Google Workspace and Gemini",
    workspaceIntro:
      "Recent announcements expand Gmail’s Gemini assistance, automate Meet follow-ups, and update the rollout timeline for Workspace skills. Validate edition eligibility, language and region limits, and tenant rollout before promising availability.",
    checklistHeading: "Customer rollout checklist",
    checklistIntro:
      "Before a demo, pilot, migration, or production change, capture these facts for the customer’s exact setup.",
    checklist: [
      "Identify the product surface: Gemini API, Workspace with Gemini, Gemini Enterprise, AI developer tools, or a combination. Their licensing, controls, and release schedules are not interchangeable.",
      "Record the exact API model ID and lifecycle state. Test replacement IDs, output quality, tool behavior, latency, token limits, and price in a staging project before switching traffic.",
      "For Gemini Enterprise, confirm edition, app location, supported region, data residency and ML processing commitments, invoiced billing eligibility, subscription, and any required feature toggle.",
      "For third-party models and connectors, confirm administrator enablement, supported regions, usage-based charges, user authorization, source permissions, and data handling with the customer’s security owner.",
      "For Workspace features, confirm the edition, admin Beta or feature settings, enabled Workspace Intelligence sources, data access boundaries, and the actual rollout state for the user cohort.",
      "Run a representative test set covering allowed and denied data, citations, tool actions, failure paths, latency, and cost. Record the source documentation and date used for acceptance.",
      "Set a review owner and re-check official release notes before go-live and at regular intervals. Preview, staged rollout, and GA labels can still have region or account restrictions.",
    ],
    feedsHeading: "Primary update feeds",
    feedsIntro:
      "Use Google’s changelogs as the source of truth. This page is a curated digest, not a replacement for release notes, product documentation, contracts, or a customer-specific availability check.",
    sourcesLabel: "Official Google sources",
    updates: {
      api: [
        {
          date: "Oct 13, 2026",
          status: "Generally available",
          title: "Gemini 4 Argon is available through the Gemini API",
          summary:
            "Google lists `gemini-4-argon` as GA for complex coding, agentic, mathematics, and science work. Google’s announcement describes a 1M unified input/output token limit. The published introductory API rate is $2 per million input tokens and $10 per million output tokens; cached-input pricing and current terms should be checked directly before quoting.",
          engineerNote:
            "Use the exact model ID. Validate long-output continuation handling, limits, rate availability, latency, and price against the API model guide and pricing page for the target project.",
          sources: [
            { label: "API release notes", href: sourceLinks.apiNotes },
            { label: "Gemini model catalogue", href: sourceLinks.apiModels },
            { label: "Google announcement", href: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/" },
          ],
        },
        {
          date: "Oct 8, 2026",
          status: "Deprecation and automatic routing",
          title: "Gemini 3.7 Flash and Gemini 3.5 Flash API IDs are deprecated",
          summary:
            "Google says requests to `gemini-3.7-flash` are automatically routed to Gemini 3.8 Flash, and requests to `gemini-3.5-flash` are routed to Gemini 3.6 Flash. Google recommends updating the model string rather than relying on the compatibility routing.",
          engineerNote:
            "Search code, environment configuration, evaluation fixtures, and logs for both legacy IDs. Pin the intended replacement explicitly and rerun quality, structured-output, function-calling, latency, and cost checks.",
          sources: [
            { label: "API release notes", href: sourceLinks.apiNotes },
            { label: "Model deprecations", href: sourceLinks.apiDeprecations },
          ],
        },
        {
          date: "Oct 6, 2026",
          status: "Generally available · predecessor deprecated",
          title: "Nano Banana 2.1 adds an image model and replaces an older endpoint",
          summary:
            "Google released `gemini-nano-banana-2.1` for image generation and conversational editing. Google says `gemini-3.1-flash-image` is deprecated, with no shutdown date announced in the release note.",
          engineerNote:
            "Treat the old endpoint as migration work even without a shutdown date. Compare prompt adherence, editing consistency, text rendering, supported aspect ratios, resolution, latency, and current image pricing.",
          sources: [
            { label: "API release notes", href: sourceLinks.apiNotes },
            { label: "Gemini model catalogue", href: sourceLinks.apiModels },
            { label: "Model deprecations", href: sourceLinks.apiDeprecations },
          ],
        },
        {
          date: "Sep 15–22, 2026",
          status: "Generally available",
          title: "New Live voice and text-to-speech model families",
          summary:
            "The API catalogue now includes Gemini 3.8 Live, Gemini 3.8 Live Extended Thinking, Gemini 3.8 Flash TTS, and Gemini 3.8 Flash-Lite TTS. Google positions them for low-latency voice agents, higher-reasoning live audio, expressive speech generation, and high-throughput speech workloads.",
          engineerNote:
            "Choose the model by interaction pattern, then validate streaming/session behavior, voice consent requirements, supported languages, latency, and audio billing using the model-specific guides.",
          sources: [
            { label: "API release notes", href: sourceLinks.apiNotes },
            { label: "Gemini model catalogue", href: sourceLinks.apiModels },
          ],
        },
        {
          date: "Jun 1, 2026 · API lifecycle notice",
          status: "Shut down",
          title: "Gemini 2.0 Flash and Flash-Lite API models are no longer available",
          summary:
            "Google’s API changelog lists `gemini-2.0-flash` and `gemini-2.0-flash-lite` among models shut down on June 1, 2026. The Gemini API lifecycle is separate from model availability inside Google Workspace or Gemini Enterprise.",
          engineerNote:
            "Remove these IDs from active catalogues and examples. If a customer still depends on them, verify the actual endpoint behavior and migrate to a currently supported model from the official list; do not infer API status from product UI availability.",
          sources: [
            { label: "API release notes", href: sourceLinks.apiNotes },
            { label: "Model deprecations", href: sourceLinks.apiDeprecations },
          ],
        },
      ],
      enterprise: [
        {
          date: "Oct 16, 2026",
          status: "Generally available",
          title: "Custom MCP data stores can map citations",
          summary:
            "Gemini Enterprise can display source citation chips for answers that use custom MCP server tools when `citation_mappings` is configured through the REST API.",
          engineerNote:
            "Include citation identifiers and source URLs in the MCP response design. Test that each generated citation resolves to the intended customer-authorized source and remains useful in the UI.",
          sources: [
            { label: "Configure MCP citations", href: sourceLinks.enterpriseMcpCitations },
            { label: "Gemini Enterprise release notes", href: sourceLinks.enterpriseNotes },
          ],
        },
        {
          date: "Oct 15, 2026",
          status: "Generally available · administrator enabled · usage billed",
          title: "Claude Opus 5.5 and Sonnet 5.5 can be enabled in the Gemini Enterprise app",
          summary:
            "Administrators can enable the third-party models in Feature Management. Google lists availability in the global location and US/EU multi-regions, with pay-as-you-go charges.",
          engineerNote:
            "Confirm model toggles, supported location, Cloud Billing and spend controls, customer policy approval, and model-specific data terms. Do not present this as included quota or as available in every in-country region.",
          sources: [
            { label: "Enable third-party models", href: "https://docs.cloud.google.com/gemini/enterprise/docs/manage-web-app-features#enable-third-party-models" },
            { label: "Gemini Enterprise release notes", href: sourceLinks.enterpriseNotes },
          ],
        },
        {
          date: "Oct 13–14, 2026",
          status: "Generally available · feature controls apply",
          title: "Gemini 4 Argon reaches the Enterprise app and Workflow Builder",
          summary:
            "Google announced Argon for the Gemini Enterprise web and mobile apps, AI developer tools, and Workflow Builder. The release notes state web/mobile availability is off by default, with the toggle default changing on October 27; developer-tool behavior depends on whether the administrator uses the default or a custom model list.",
          engineerNote:
            "Check the relevant product surface separately. Confirm the customer’s app region, model availability control, AI developer tools model list, and rollout date; don’t assume enabling the model in one surface enables it everywhere.",
          sources: [
            { label: "Gemini Enterprise release notes", href: sourceLinks.enterpriseNotes },
            { label: "Manage web app features", href: sourceLinks.enterpriseFeatureControls },
            { label: "Data residency and locations", href: sourceLinks.enterpriseLocations },
          ],
        },
        {
          date: "Oct 16, 2026",
          status: "New Workflow Builder integrations",
          title: "Workflows can connect to Jira and Confluence Data Center",
          summary:
            "Google added Workflow Builder connections to Confluence Data Center and Jira Data Center for searching data and automating actions. On October 13, Google also announced Workflow Builder connections for Microsoft Teams, Notion, and Salesforce.",
          engineerNote:
            "Verify connector type, customer-hosted instance reachability, authentication, supported actions, and the user’s effective source permissions. A Workflow Builder integration is not proof that a separate assistant connector is configured.",
          sources: [
            { label: "Workflow Builder overview", href: sourceLinks.enterpriseWorkflowBuilder },
            { label: "Gemini Enterprise release notes", href: sourceLinks.enterpriseNotes },
          ],
        },
        {
          date: "Oct 14, 2026",
          status: "Generally available · regional data commitments",
          title: "Gemini 3.8 Flash is available in the United Kingdom region",
          summary:
            "Google lists UK availability in `europe-west2`, with in-region data residency at rest and machine-learning processing. The web-app model is on by default for that UK region; administrators can manage its availability.",
          engineerNote:
            "Check the app’s actual location and the current regional limitations before making a data-residency statement. Do not generalize the UK launch to other in-country locations.",
          sources: [
            { label: "Data residency and locations", href: sourceLinks.enterpriseLocations },
            { label: "Gemini Enterprise release notes", href: sourceLinks.enterpriseNotes },
          ],
        },
      ],
      workspace: [
        {
          date: "Oct 15, 2026",
          status: "Rolling out · US English only · Starter rollout later",
          title: "Gmail AI Inbox expands to paid Workspace users",
          summary:
            "AI Inbox highlights suggested to-dos and summarizes priority work updates across email conversations. Google lists Business Starter, Standard, and Plus, Enterprise Starter, Standard, and Plus, AI Pro for Education, and Frontline Plus; the initial rollout is limited to users in the US with English (US). Google says the Starter-edition rollout will follow in the coming months.",
          engineerNote:
            "Check the user’s edition, US location, and English (US) language setting. Do not assume immediate Business Starter access during the staged rollout; Google says Starter users are scheduled for a later rollout.",
          sources: [
            { label: "Google Workspace Updates announcement", href: sourceLinks.gmailAiInbox },
          ],
        },
        {
          date: "Oct 15, 2026",
          status: "Rolling out · mobile · US English only",
          title: "Gmail Live brings inbox-aware voice search to Workspace mobile",
          summary:
            "Gmail Live lets eligible users ask spoken questions about their inbox and hear synthesized answers, with an email source card at each conversational turn and selectable voices. Google lists Business Starter, Standard, and Plus, Enterprise Starter, Standard, and Plus, Frontline Plus, Nonprofits, and several Gemini or AI add-ons. Availability is currently limited to the US with English (US).",
          engineerNote:
            "Verify the user has Gemini in Workspace access, a supported Android or iOS device, US availability, and English (US). Microphone permission is required; existing smart features and personalization settings apply.",
          sources: [
            { label: "Google Workspace Updates announcement", href: sourceLinks.gmailLive },
          ],
        },
        {
          date: "Oct 13, 2026",
          status: "Gemini app rollout underway · Workspace rollout delayed",
          title: "Google updates the rollout timeline for Gemini Skills",
          summary:
            "Skills in the Gemini app have started rolling out, with completion expected by mid-November; skill sharing and Google Drive integration are planned for later. The previously announced Workspace Skills rollout dates are delayed while Google works on a safe and reliable launch, and a new timeline has not been confirmed.",
          engineerNote:
            "Treat Gemini app Skills and Workspace Skills as separate rollouts. Do not plan a Workspace deployment against the old October 12 or October 19 dates; check Google’s announcement for a revised schedule.",
          sources: [
            { label: "Google Workspace Updates announcement", href: sourceLinks.skillsRollout },
            { label: "Original Skills announcement", href: "https://workspaceupdates.googleblog.com/2026/09/skills-gemini-app-workspace.html" },
          ],
        },
        {
          date: "Oct 12, 2026",
          status: "Rolling out · Business Standard/Plus and Enterprise Standard/Plus",
          title: "Google Meet adds Gemini-powered post-meeting routines",
          summary:
            "When “Take notes for me” is enabled during a meeting, users can run follow-up routines from the post-meeting screen, initially drafting a Gmail follow-up or adding action items to Google Tasks. Google says the feature is on by default for eligible organizations and can be disabled by admins at the domain, OU, or group level through Workspace Studio Admin settings or the Take Notes for Me setting.",
          engineerNote:
            "Confirm the edition is Business Standard/Plus, Enterprise Standard/Plus, or AI Pro for Education. Test the Notes setting and the domain/OU/group policy; the current routines require notes to be enabled in the meeting.",
          sources: [
            { label: "Google Workspace Updates announcement", href: sourceLinks.meetNextSteps },
          ],
        },
        {
          date: "Oct 2, 2026",
          status: "Rolling out · tenant availability varies",
          title: "Workspace Drop: image editing, Sheets canvas, Vids summaries, and Drive classification",
          summary:
            "Google announced Google Pics for object-level image editing, text changes, crop and upscale; Sheets canvas for turning sheet data into interactive mini-apps; Vids summaries generated from Docs, PDFs, and Word files; and Gemini-based Drive data classification. The update also covers cross-app help through Workspace Intelligence and Ask Gemini in Chat.",
          engineerNote:
            "Treat each capability as a separate rollout check. Confirm the customer’s edition and admin settings, source access, output review needs, and whether the feature is actually visible in the tenant before proposing a workflow.",
          sources: [
            { label: "September Workspace feature drop", href: sourceLinks.workspaceDrop },
            { label: "Workspace release announcements", href: "https://workspace.google.com/whatsnew/" },
          ],
        },
        {
          date: "Sep 17, 2026",
          status: "Admin Beta setting required",
          title: "Workspace skills can capture reusable team knowledge",
          summary:
            "Google describes reusable skills built from team rules, templates, and reference files, with collaboration in Docs and management/testing through Workspace Studio. Google says organizations need the Gemini Beta setting enabled in the Admin console for access.",
          engineerNote:
            "For pilots, establish ownership, review and update cadence, approved reference material, sharing boundaries, and tests for generated output. Skills encode instructions; they do not grant data access or replace user authorization.",
          sources: [
            { label: "Skills in Workspace announcement", href: sourceLinks.workspaceSkills },
            { label: "Google Workspace release announcements", href: "https://workspace.google.com/whatsnew/" },
          ],
        },
        {
          date: "Sep 10, 2026",
          status: "Rolling out · supported plans listed by Google",
          title: "Cross-app agentic tasks arrive across Workspace surfaces",
          summary:
            "Google announced tasks such as creating presentations from Chat, building spreadsheets from Drive, drafting emails in Docs, turning email threads into briefs, and converting Docs into editable slide decks. The announcement lists Business Standard, Business Plus, Enterprise Standard, Enterprise Plus, Google AI Pro/Ultra, and Google AI Pro for Education as rollout audiences.",
          engineerNote:
            "Confirm the exact app and action is enabled for the user cohort. Review selected or administrator-enabled Workspace Intelligence sources, user permissions, approval steps for sending or scheduling, and the resulting files before expanding the workflow.",
          sources: [
            { label: "Five Workspace agentic capabilities", href: sourceLinks.workspaceAgents },
            { label: "September Workspace feature drop", href: sourceLinks.workspaceDrop },
          ],
        },
      ],
    },
  },
  es: {
    title: "Actualizaciones de Google AI para ingenieros de clientes",
    description:
      "Resumen técnico, basado en fuentes oficiales, de las novedades de Gemini API, Gemini Enterprise y Google Workspace, con disponibilidad, migración y verificaciones de despliegue.",
    eyebrow: "Informe para ingeniería de clientes · 18 de octubre de 2026",
    heading: "Novedades de Google AI, convertidas en acciones de ingeniería.",
    intro:
      "Resumen práctico de anuncios oficiales recientes de Google para equipos que evalúan, implementan o dan soporte a Gemini. Cada elemento incluye detalles operativos que conviene verificar antes de prometer disponibilidad o cambiar una integración en producción.",
    checked: "Fuentes revisadas hasta el 16 de octubre de 2026",
    caveat:
      "Un anuncio de lanzamiento no garantiza disponibilidad en cada cuenta. Antes de comprometerse con un cliente, confirme en la fuente vinculada la elegibilidad, región, edición, facturación, controles de administrador, ID de modelo de API y condiciones vigentes.",
    apiHeading: "Gemini API y modelos",
    apiIntro:
      "Los cambios en el ciclo de vida de los modelos requieren atención inmediata: nombres, enrutamiento, coste y funciones compatibles pueden cambiar de forma independiente de las suscripciones de Workspace o Gemini Enterprise.",
    enterpriseHeading: "Gemini Enterprise en Google Cloud",
    enterpriseIntro:
      "Considere por separado la disponibilidad en la aplicación, las herramientas para desarrolladores de IA, Workflow Builder, los conectores y el procesamiento regional. Varios lanzamientos recientes requieren que un administrador habilite un control.",
    workspaceHeading: "Google Workspace y Gemini",
    workspaceIntro:
      "Los anuncios recientes amplían la asistencia de Gemini en Gmail, automatizan el seguimiento de reuniones y actualizan el calendario de lanzamiento de las habilidades de Workspace. Valide la edición, el idioma, la región y el despliegue en la organización.",
    checklistHeading: "Lista de verificación para el despliegue",
    checklistIntro:
      "Antes de una demostración, piloto, migración o cambio en producción, registre estos datos para la configuración exacta del cliente.",
    checklist: [
      "Identifique la superficie: Gemini API, Workspace con Gemini, Gemini Enterprise, herramientas para desarrolladores de IA o una combinación. Sus licencias, controles y calendarios de lanzamiento no son intercambiables.",
      "Registre el ID exacto del modelo de API y su estado de ciclo de vida. Pruebe los ID de reemplazo, calidad, herramientas, latencia, límites de tokens y precio en un proyecto de prueba antes de cambiar el tráfico.",
      "Para Gemini Enterprise, confirme edición, ubicación de la aplicación, región compatible, compromisos de residencia de datos y procesamiento de ML, elegibilidad de facturación, suscripción y controles de funciones requeridos.",
      "Para modelos y conectores de terceros, confirme habilitación del administrador, regiones compatibles, cargos por uso, autorización de usuarios, permisos de origen y tratamiento de datos con el responsable de seguridad del cliente.",
      "Para funciones de Workspace, confirme edición, configuración Beta o de administrador, fuentes de Workspace Intelligence habilitadas, límites de acceso a datos y estado real del despliegue para el grupo de usuarios.",
      "Ejecute pruebas representativas de datos permitidos y denegados, citas, acciones de herramientas, errores, latencia y coste. Registre la fuente y la fecha empleadas para la aceptación.",
      "Asigne una persona responsable de revisar las notas oficiales antes de salir a producción y periódicamente. Las etiquetas Preview, despliegue gradual y GA aún pueden tener restricciones de región o cuenta.",
    ],
    feedsHeading: "Fuentes oficiales de novedades",
    feedsIntro:
      "Use los registros de cambios de Google como fuente de verdad. Esta página es un resumen seleccionado, no sustituye las notas de lanzamiento, la documentación del producto, los contratos ni la comprobación de disponibilidad específica del cliente.",
    sourcesLabel: "Fuentes oficiales de Google",
    updates: {
      api: [
        {
          date: "13 oct 2026",
          status: "Disponibilidad general",
          title: "Gemini 4 Argon está disponible mediante Gemini API",
          summary:
            "Google indica que `gemini-4-argon` está en GA para tareas complejas de programación, agentes, matemáticas y ciencia. El anuncio describe un límite unificado de 1 millón de tokens de entrada/salida. El precio introductorio publicado para la API es de 2 USD por millón de tokens de entrada y 10 USD por millón de salida; verifique el precio de entrada en caché y las condiciones vigentes antes de cotizar.",
          engineerNote:
            "Use el ID exacto del modelo. Valide la continuación de salidas largas, límites, disponibilidad de cuota, latencia y precio en la guía de modelos y la página de precios para el proyecto de destino.",
          sources: [
            { label: "Notas de lanzamiento de la API", href: sourceLinks.apiNotes },
            { label: "Catálogo de modelos Gemini", href: sourceLinks.apiModels },
            { label: "Anuncio de Google", href: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/" },
          ],
        },
        {
          date: "8 oct 2026",
          status: "Obsolescencia y enrutamiento automático",
          title: "Los ID de Gemini 3.7 Flash y Gemini 3.5 Flash para API están obsoletos",
          summary:
            "Google indica que las solicitudes a `gemini-3.7-flash` se enrutan automáticamente a Gemini 3.8 Flash y las de `gemini-3.5-flash` a Gemini 3.6 Flash. Google recomienda actualizar el nombre del modelo en lugar de depender del enrutamiento de compatibilidad.",
          engineerNote:
            "Busque ambos ID antiguos en código, configuración, pruebas de evaluación y registros. Fije explícitamente el reemplazo previsto y repita las pruebas de calidad, salida estructurada, llamadas a funciones, latencia y coste.",
          sources: [
            { label: "Notas de lanzamiento de la API", href: sourceLinks.apiNotes },
            { label: "Obsolescencias de modelos", href: sourceLinks.apiDeprecations },
          ],
        },
        {
          date: "6 oct 2026",
          status: "Disponibilidad general · predecesor obsoleto",
          title: "Nano Banana 2.1 incorpora un modelo de imágenes y sustituye un endpoint anterior",
          summary:
            "Google lanzó `gemini-nano-banana-2.1` para generación y edición conversacional de imágenes. Google indica que `gemini-3.1-flash-image` está obsoleto; la nota de lanzamiento no anuncia una fecha de cierre.",
          engineerNote:
            "Trate el endpoint anterior como trabajo de migración aunque no tenga fecha de cierre. Compare seguimiento de instrucciones, coherencia de edición, renderizado de texto, relaciones de aspecto, resolución, latencia y precio actual de imágenes.",
          sources: [
            { label: "Notas de lanzamiento de la API", href: sourceLinks.apiNotes },
            { label: "Catálogo de modelos Gemini", href: sourceLinks.apiModels },
            { label: "Obsolescencias de modelos", href: sourceLinks.apiDeprecations },
          ],
        },
        {
          date: "15–22 sep 2026",
          status: "Disponibilidad general",
          title: "Nuevas familias de voz Live y texto a voz",
          summary:
            "El catálogo de la API incluye Gemini 3.8 Live, Gemini 3.8 Live Extended Thinking, Gemini 3.8 Flash TTS y Gemini 3.8 Flash-Lite TTS. Google los orienta a agentes de voz de baja latencia, audio en vivo con más razonamiento, generación expresiva de voz y cargas de voz de alto volumen.",
          engineerNote:
            "Elija el modelo según el patrón de interacción y valide streaming y sesiones, requisitos de consentimiento de voz, idiomas compatibles, latencia y facturación de audio mediante las guías específicas.",
          sources: [
            { label: "Notas de lanzamiento de la API", href: sourceLinks.apiNotes },
            { label: "Catálogo de modelos Gemini", href: sourceLinks.apiModels },
          ],
        },
        {
          date: "1 jun 2026 · ciclo de vida de la API",
          status: "Cerrado",
          title: "Los modelos Gemini 2.0 Flash y Flash-Lite de la API dejaron de estar disponibles",
          summary:
            "El registro de cambios de la API de Google incluye `gemini-2.0-flash` y `gemini-2.0-flash-lite` entre los modelos cerrados el 1 de junio de 2026. El ciclo de vida de Gemini API es independiente de la disponibilidad de modelos en Google Workspace o Gemini Enterprise.",
          engineerNote:
            "Retire estos ID de catálogos y ejemplos activos. Si un cliente todavía depende de ellos, verifique el comportamiento real del endpoint y migre a un modelo compatible del listado oficial; no deduzca el estado de la API por la interfaz del producto.",
          sources: [
            { label: "Notas de lanzamiento de la API", href: sourceLinks.apiNotes },
            { label: "Obsolescencias de modelos", href: sourceLinks.apiDeprecations },
          ],
        },
      ],
      enterprise: [
        {
          date: "16 oct 2026",
          status: "Disponibilidad general",
          title: "Los almacenes MCP personalizados pueden asignar citas",
          summary:
            "Gemini Enterprise puede mostrar chips de cita de origen en respuestas que usan herramientas de servidores MCP personalizados cuando se configura `citation_mappings` mediante la API REST.",
          engineerNote:
            "Incluya identificadores de citas y URL de origen en el diseño de la respuesta MCP. Pruebe que cada cita generada apunte a la fuente autorizada correcta y sea útil en la interfaz.",
          sources: [
            { label: "Configurar citas MCP", href: sourceLinks.enterpriseMcpCitations },
            { label: "Notas de Gemini Enterprise", href: sourceLinks.enterpriseNotes },
          ],
        },
        {
          date: "15 oct 2026",
          status: "Disponibilidad general · requiere habilitación · facturación por uso",
          title: "Se pueden habilitar Claude Opus 5.5 y Sonnet 5.5 en Gemini Enterprise",
          summary:
            "Los administradores pueden habilitar estos modelos de terceros en Feature Management. Google indica disponibilidad en la ubicación global y las multirregiones de EE. UU. y la UE, con cargos de pago por uso.",
          engineerNote:
            "Confirme los controles de modelo, la ubicación compatible, facturación y límites de gasto de Cloud, aprobación de políticas del cliente y condiciones de datos específicas del modelo. No lo presente como cuota incluida ni como disponible en toda región nacional.",
          sources: [
            { label: "Habilitar modelos de terceros", href: "https://docs.cloud.google.com/gemini/enterprise/docs/manage-web-app-features#enable-third-party-models" },
            { label: "Notas de Gemini Enterprise", href: sourceLinks.enterpriseNotes },
          ],
        },
        {
          date: "13–14 oct 2026",
          status: "Disponibilidad general · aplican controles de funciones",
          title: "Gemini 4 Argon llega a la aplicación Enterprise y Workflow Builder",
          summary:
            "Google anunció Argon para las aplicaciones web y móvil de Gemini Enterprise, las herramientas para desarrolladores de IA y Workflow Builder. Las notas indican que está desactivado por defecto en web/móvil y que el valor predeterminado del control cambia el 27 de octubre; el comportamiento en herramientas de desarrollo depende de si el administrador usa la lista de modelos predeterminada o una personalizada.",
          engineerNote:
            "Compruebe cada superficie por separado. Confirme región de la aplicación, control de disponibilidad del modelo, lista de modelos de herramientas de desarrollo y fecha de despliegue; habilitarlo en una superficie no implica que esté habilitado en todas.",
          sources: [
            { label: "Notas de Gemini Enterprise", href: sourceLinks.enterpriseNotes },
            { label: "Administrar funciones de la aplicación web", href: sourceLinks.enterpriseFeatureControls },
            { label: "Residencia de datos y ubicaciones", href: sourceLinks.enterpriseLocations },
          ],
        },
        {
          date: "16 oct 2026",
          status: "Nuevas integraciones de Workflow Builder",
          title: "Los flujos pueden conectarse a Jira y Confluence Data Center",
          summary:
            "Google añadió conexiones de Workflow Builder a Jira y Confluence Data Center para buscar datos y automatizar acciones. El 13 de octubre también anunció conexiones con Microsoft Teams, Notion y Salesforce.",
          engineerNote:
            "Verifique el tipo de conector, conectividad a instancias alojadas por el cliente, autenticación, acciones compatibles y permisos efectivos de origen del usuario. Una integración en Workflow Builder no demuestra que exista un conector separado del asistente.",
          sources: [
            { label: "Descripción general de Workflow Builder", href: sourceLinks.enterpriseWorkflowBuilder },
            { label: "Notas de Gemini Enterprise", href: sourceLinks.enterpriseNotes },
          ],
        },
        {
          date: "14 oct 2026",
          status: "Disponibilidad general · compromisos regionales de datos",
          title: "Gemini 3.8 Flash está disponible en la región del Reino Unido",
          summary:
            "Google indica disponibilidad en el Reino Unido en `europe-west2`, con residencia de datos en reposo y procesamiento de aprendizaje automático dentro de la región. El modelo de la aplicación web está activado por defecto en esa región; los administradores pueden gestionar su disponibilidad.",
          engineerNote:
            "Compruebe la ubicación real de la aplicación y las limitaciones regionales actuales antes de declarar residencia de datos. No generalice el lanzamiento del Reino Unido a otras regiones nacionales.",
          sources: [
            { label: "Residencia de datos y ubicaciones", href: sourceLinks.enterpriseLocations },
            { label: "Notas de Gemini Enterprise", href: sourceLinks.enterpriseNotes },
          ],
        },
      ],
      workspace: [
        {
          date: "15 oct 2026",
          status: "Despliegue gradual · solo EE. UU. e inglés · Starter más adelante",
          title: "AI Inbox de Gmail se amplía a usuarios de pago de Workspace",
          summary:
            "AI Inbox destaca tareas sugeridas y resume las actualizaciones de trabajo prioritarias en las conversaciones de correo. Google enumera Business Starter, Standard y Plus, Enterprise Starter, Standard y Plus, AI Pro for Education y Frontline Plus; el despliegue inicial se limita a usuarios de EE. UU. con inglés (EE. UU.). Google indica que el lanzamiento para Starter será en los próximos meses.",
          engineerNote:
            "Compruebe la edición, la ubicación en EE. UU. y el idioma inglés (EE. UU.). No presuponga acceso inmediato para Business Starter durante el despliegue gradual; Google indica que llegará más adelante.",
          sources: [
            { label: "Anuncio de Google Workspace Updates", href: sourceLinks.gmailAiInbox },
          ],
        },
        {
          date: "15 oct 2026",
          status: "Despliegue gradual · móviles · solo EE. UU. e inglés",
          title: "Gmail Live incorpora búsqueda por voz contextual en Workspace móvil",
          summary:
            "Gmail Live permite hacer preguntas habladas sobre la bandeja de entrada y escuchar respuestas sintetizadas; muestra una tarjeta con el correo fuente en cada turno y permite elegir la voz. Google enumera Business Starter, Standard y Plus, Enterprise Starter, Standard y Plus, Frontline Plus, organizaciones sin ánimo de lucro y varios complementos Gemini o AI. Por ahora, solo está disponible en EE. UU. y en inglés (EE. UU.).",
          engineerNote:
            "Verifique el acceso del usuario a Gemini en Workspace, un dispositivo Android o iOS compatible, la disponibilidad en EE. UU. y el idioma inglés (EE. UU.). Se requiere permiso para el micrófono; se aplican los ajustes de funciones inteligentes y personalización.",
          sources: [
            { label: "Anuncio de Google Workspace Updates", href: sourceLinks.gmailLive },
          ],
        },
        {
          date: "13 oct 2026",
          status: "Despliegue de Gemini app iniciado · despliegue de Workspace retrasado",
          title: "Google actualiza el calendario de lanzamiento de Gemini Skills",
          summary:
            "Las habilidades de Gemini app han comenzado a desplegarse y se espera que el lanzamiento termine a mediados de noviembre; compartir habilidades e integrarlas con Google Drive llegarán más adelante. Las fechas anunciadas anteriormente para Workspace Skills se retrasan mientras Google trabaja en un lanzamiento seguro y fiable, y todavía no hay un nuevo calendario confirmado.",
          engineerNote:
            "Trate Gemini app Skills y Workspace Skills como despliegues distintos. No planifique Workspace usando las antiguas fechas del 12 o 19 de octubre; consulte el anuncio de Google para conocer el nuevo calendario.",
          sources: [
            { label: "Anuncio de Google Workspace Updates", href: sourceLinks.skillsRollout },
            { label: "Anuncio original de Skills", href: "https://workspaceupdates.googleblog.com/2026/09/skills-gemini-app-workspace.html" },
          ],
        },
        {
          date: "12 oct 2026",
          status: "Despliegue gradual · Business Standard/Plus y Enterprise Standard/Plus",
          title: "Google Meet añade rutinas Gemini después de las reuniones",
          summary:
            "Cuando se habilita “Tomar notas por mí” durante una reunión, los usuarios pueden ejecutar rutinas de seguimiento desde la pantalla posterior: redactar un correo de Gmail o añadir tareas de acción a Google Tasks. Google indica que la función está activada por defecto en las organizaciones elegibles y que los administradores pueden desactivarla por dominio, unidad organizativa o grupo desde la configuración de administración de Workspace Studio o “Tomar notas por mí”.",
          engineerNote:
            "Confirme que la edición sea Business Standard/Plus, Enterprise Standard/Plus o AI Pro for Education. Pruebe el ajuste de notas y la política de dominio, unidad organizativa o grupo; las rutinas actuales requieren que las notas estén habilitadas durante la reunión.",
          sources: [
            { label: "Anuncio de Google Workspace Updates", href: sourceLinks.meetNextSteps },
          ],
        },
        {
          date: "2 oct 2026",
          status: "Despliegue gradual · disponibilidad variable por organización",
          title: "Novedades de Workspace: edición de imágenes, Sheets canvas, resúmenes en Vids y clasificación en Drive",
          summary:
            "Google anunció Google Pics para editar objetos, texto, recortar y ampliar imágenes; Sheets canvas para convertir datos de hojas en miniaplicaciones interactivas; resúmenes de Vids generados desde Docs, PDF y Word; y clasificación de datos en Drive basada en Gemini. La actualización también incluye tareas entre aplicaciones con Workspace Intelligence y Ask Gemini en Chat.",
          engineerNote:
            "Trate cada capacidad como una verificación de despliegue separada. Confirme edición del cliente y ajustes de administrador, acceso a fuentes, revisión de resultados y visibilidad real de la función en el entorno antes de proponer el flujo.",
          sources: [
            { label: "Novedades de Workspace de septiembre", href: sourceLinks.workspaceDrop },
            { label: "Anuncios de lanzamiento de Workspace", href: "https://workspace.google.com/whatsnew/" },
          ],
        },
        {
          date: "17 sep 2026",
          status: "Requiere la configuración Beta del administrador",
          title: "Las habilidades de Workspace permiten reutilizar conocimiento del equipo",
          summary:
            "Google describe habilidades reutilizables basadas en reglas, plantillas y archivos de referencia del equipo, con colaboración en Docs y gestión/pruebas mediante Workspace Studio. Google indica que la organización debe habilitar la configuración Gemini Beta en la consola de administración.",
          engineerNote:
            "Para pilotos, defina propietarios, frecuencia de revisión, material de referencia aprobado, límites de uso compartido y pruebas de los resultados. Las habilidades contienen instrucciones; no conceden acceso a datos ni sustituyen la autorización de usuario.",
          sources: [
            { label: "Anuncio de habilidades en Workspace", href: sourceLinks.workspaceSkills },
            { label: "Anuncios de lanzamiento de Workspace", href: "https://workspace.google.com/whatsnew/" },
          ],
        },
        {
          date: "10 sep 2026",
          status: "Despliegue gradual · Google especifica los planes compatibles",
          title: "Llegan tareas con agentes entre aplicaciones de Workspace",
          summary:
            "Google anunció tareas como crear presentaciones desde Chat, elaborar hojas desde Drive, redactar correos en Docs, convertir hilos de correo en informes y transformar Docs en presentaciones editables. El anuncio enumera Business Standard, Business Plus, Enterprise Standard, Enterprise Plus, Google AI Pro/Ultra y Google AI Pro for Education como destinatarios del despliegue.",
          engineerNote:
            "Confirme que la aplicación y acción exactas estén habilitadas para el grupo. Revise las fuentes seleccionadas o habilitadas por el administrador en Workspace Intelligence, permisos del usuario, aprobaciones de envío o programación y archivos generados antes de ampliar el flujo.",
          sources: [
            { label: "Cinco capacidades con agentes de Workspace", href: sourceLinks.workspaceAgents },
            { label: "Novedades de Workspace de septiembre", href: sourceLinks.workspaceDrop },
          ],
        },
      ],
    },
  },
};

function UpdateSection({
  icon: Icon,
  title,
  intro,
  updates,
  sourcesLabel,
}: {
  icon: typeof Sparkles;
  title: string;
  intro: string;
  updates: Update[];
  sourcesLabel: string;
}) {
  return (
    <section className="border-t border-border py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start gap-4">
          <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-google-blue/20 bg-google-blue/10 text-google-blue">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{intro}</p>
          </div>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {updates.map((update) => (
            <article key={update.title} className="grid gap-5 py-7 md:grid-cols-[170px_minmax(0,1fr)]">
              <div className="flex flex-row flex-wrap items-center gap-2 md:block">
                <time className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{update.date}</time>
                <span className="inline-flex rounded-md border border-google-green/20 bg-google-green/10 px-2 py-1 text-[11px] font-semibold leading-4 text-google-green">{update.status}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-snug text-foreground">{update.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{update.summary}</p>
                <div className="mt-4 rounded-lg border-l-2 border-google-blue bg-muted/40 px-4 py-3">
                  <p className="text-sm leading-6 text-foreground">{update.engineerNote}</p>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{sourcesLabel}</span>
                  {update.sources.map((source) => (
                    <a
                      key={source.href}
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-google-blue underline-offset-4 hover:underline"
                    >
                      {source.label}<ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const page = copy[locale];
  return withLocalizedAlternates(
    { title: page.title, description: page.description },
    "/google-ai-updates",
    locale,
  );
}

export default async function GoogleAiUpdatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const page = copy[locale];

  return (
    <main className="min-h-screen bg-background pb-16 pt-24 text-foreground">
      <section className="border-b border-border bg-muted/20 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-google-blue/20 bg-google-blue/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-google-blue">
              <Sparkles className="h-3.5 w-3.5" />{page.eyebrow}
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">{page.heading}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{page.intro}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-2"><RefreshCw className="h-3.5 w-3.5" />{page.checked}</span>
              <span className="inline-flex items-center gap-2"><Globe2 className="h-3.5 w-3.5" />Google API · Cloud · Workspace</span>
            </div>
          </div>
          <div className="mt-8 flex max-w-4xl gap-3 rounded-lg border border-google-yellow/30 bg-google-yellow/10 p-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-google-yellow" />
            <p className="text-sm leading-6 text-foreground">{page.caveat}</p>
          </div>
          <nav aria-label={locale === "es" ? "En esta página" : "On this page"} className="mt-8 flex flex-wrap gap-2">
            {[
              ["api", page.apiHeading],
              ["enterprise", page.enterpriseHeading],
              ["workspace", page.workspaceHeading],
              ["checklist", page.checklistHeading],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} className="rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition hover:border-google-blue/50 hover:text-google-blue">{label}</a>
            ))}
          </nav>
        </div>
      </section>

      <div id="api">
        <UpdateSection icon={Sparkles} title={page.apiHeading} intro={page.apiIntro} updates={page.updates.api} sourcesLabel={page.sourcesLabel} />
      </div>
      <div id="enterprise">
        <UpdateSection icon={Cloud} title={page.enterpriseHeading} intro={page.enterpriseIntro} updates={page.updates.enterprise} sourcesLabel={page.sourcesLabel} />
      </div>
      <div id="workspace">
        <UpdateSection icon={Workflow} title={page.workspaceHeading} intro={page.workspaceIntro} updates={page.updates.workspace} sourcesLabel={page.sourcesLabel} />
      </div>

      <section id="checklist" className="border-t border-border bg-muted/20 py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-google-green/20 bg-google-green/10 text-google-green"><BookOpenCheck className="h-5 w-5" /></div>
            <h2 className="text-2xl font-bold text-foreground">{page.checklistHeading}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{page.checklistIntro}</p>
          </div>
          <ol className="space-y-3">
            {page.checklist.map((item, index) => (
              <li key={item} className="flex gap-3 rounded-lg border border-border bg-background p-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-google-green/10 text-xs font-bold text-google-green">{index + 1}</span>
                <span className="text-sm leading-6 text-foreground">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border py-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="text-xl font-bold text-foreground">{page.feedsHeading}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{page.feedsIntro}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {[
              ["Gemini API", sourceLinks.apiNotes],
              ["Gemini Enterprise", sourceLinks.enterpriseNotes],
              ["Workspace", "https://workspace.google.com/whatsnew/"],
            ].map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-2 text-xs font-semibold text-background hover:opacity-90">{label}<ExternalLink className="h-3 w-3" /></a>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link href="/models" className="inline-flex items-center gap-2 text-sm font-semibold text-google-blue hover:underline">
          <CheckCircle2 className="h-4 w-4" />{locale === "es" ? "Consultar el catálogo de modelos" : "Review the model catalogue"}<ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}