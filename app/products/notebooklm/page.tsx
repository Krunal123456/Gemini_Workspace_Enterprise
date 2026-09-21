import { Metadata } from "next";
import { ProductCapabilityHub } from "@/components/products/ProductCapabilityHub";

export const metadata: Metadata = {
  title: "NotebookLM Capabilities & Plan Availability | Gemini Intelligence",
  description: "Explore NotebookLM research, source grounding, audio and video overviews, study tools, sharing, and enterprise governance.",
};

export default function NotebookLMProductPage() {
  return <ProductCapabilityHub eyebrow="NotebookLM product intelligence" title="Turn source material into structured understanding." description="Explore NotebookLM notebooks, source grounding, Audio and Video Overviews, research outputs, study tools, sharing, and enterprise controls by plan." filterKey="notebooklm" />;
}
