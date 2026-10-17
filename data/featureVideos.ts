import type { FeatureCitation } from "@/types";

/** Official Google videos that directly explain a feature or its Workspace product family. */
const videos = {
  gmail: { label: "Google Workspace: Gmail in the Gemini era", url: "https://www.youtube.com/watch?v=mp0KGyzD9DI" },
  workspace: { label: "Google Workspace: Docs, Drive, Sheets and Slides with Gemini", url: "https://www.youtube.com/watch?v=o5Ur1pm4oDA" },
  sheets: { label: "Google Workspace: Gemini in Google Sheets demo", url: "https://www.youtube.com/watch?v=J0NsBA6o8IA" },
  drive: { label: "Google Workspace: AI Overviews and knowledge in Drive", url: "https://www.youtube.com/watch?v=gS0i6xzaHuc" },
  meet: { label: "Google Workspace: Take notes and catch up in Google Meet with Gemini", url: "https://www.youtube.com/watch?v=Z43hV4xzqqE" },
  meetBackground: { label: "Google Workspace: Create a custom background in Meet with Gemini", url: "https://www.youtube.com/watch?v=bGcbmG7QwHE" },
  slides: { label: "Google Workspace: Gemini in Google Slides", url: "https://www.youtube.com/watch?v=XPKRsOsBwns" },
  vids: { label: "Google Workspace: How to use Google Vids", url: "https://www.youtube.com/watch?v=P5zzhsjDy7A" },
  notebook: { label: "Google: NotebookLM walkthrough", url: "https://www.youtube.com/watch?v=AmKZCo5Dtn0" },
  notebookVideo: { label: "Google: Introducing NotebookLM Video Overviews", url: "https://www.youtube.com/watch?v=KA_pExdDSUo" },
  studio: { label: "Google Workspace: Introducing Workspace Studio", url: "https://www.youtube.com/watch?v=UMz7Vak-vXE" },
  agents: { label: "Google Cloud: Build no-code agents in Gemini Enterprise", url: "https://www.youtube.com/watch?v=yiY8soEdVUQ" },
  connectors: { label: "Google Cloud: Connect enterprise data sources", url: "https://www.youtube.com/watch?v=f2MrZ5DHbKg" },
} satisfies Record<string, FeatureCitation>;

const byExactId: Record<string, FeatureCitation[]> = {
  "meet-generate-background": [videos.meetBackground],
  "slides-side-panel": [videos.slides],
  "notebooklm-video-overviews": [videos.notebookVideo, videos.notebook],
  "gemini-enterprise-platform-agents": [videos.agents],
  "gemini-enterprise-custom-no-code-agents": [videos.agents],
  "gemini-enterprise-use-custom-no-code-agents": [videos.agents],
  "gemini-enterprise-platform-custom-built-connectors": [videos.connectors],
  "gemini-enterprise-platform-custom-mcp-server-connectors": [videos.connectors],
};

const byPrefix: Array<[string, FeatureCitation[]]> = [
  ["gmail-", [videos.gmail]],
  ["docs-", [videos.workspace]],
  ["sheets-", [videos.sheets, videos.workspace]],
  ["slides-", [videos.slides, videos.workspace]],
  ["drive-", [videos.drive, videos.workspace]],
  ["meet-", [videos.meet]],
  ["vids-", [videos.vids]],
  ["notebooklm-", [videos.notebook]],
  ["workspace-studio-", [videos.studio]],
  ["gemini-enterprise-platform-agent-", [videos.agents]],
  ["gemini-enterprise-custom-no-code-", [videos.agents]],
  ["gemini-enterprise-use-custom-no-code-", [videos.agents]],
];

export function getFeatureVideos(id: string): FeatureCitation[] {
  const related = byExactId[id] ?? byPrefix.find(([prefix]) => id.startsWith(prefix))?.[1] ?? [];
  return [...new Map(related.map((video) => [video.url, video])).values()];
}
