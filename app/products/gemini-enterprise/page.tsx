import { Metadata } from "next";
import { ProductCapabilityHub } from "@/components/products/ProductCapabilityHub";

export const metadata: Metadata = {
  title: "Gemini Enterprise Capabilities & Plan Availability | Gemini Intelligence",
  description: "Explore Gemini Enterprise knowledge grounding, connectors, MCP, agents, audit logging, and Model Armor capabilities.",
};

export default function GeminiEnterpriseProductPage() {
  return <ProductCapabilityHub eyebrow="Gemini Enterprise product intelligence" title="A governed reasoning layer for your organisation." description="Map enterprise grounding, stored organisational knowledge, connectors, MCP tools, agents, audit logging, and security capabilities to the plan that supports them." filterKey="gemini-enterprise" />;
}
