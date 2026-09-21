import { Metadata } from "next";
import { ProductCapabilityHub } from "@/components/products/ProductCapabilityHub";

export const metadata: Metadata = {
  title: "Workspace Studio Capabilities & Plan Availability | Gemini Intelligence",
  description: "Explore Workspace Studio flow execution capabilities and plan availability.",
};

export default function WorkspaceStudioProductPage() {
  return <ProductCapabilityHub eyebrow="Workspace Studio" title="Turn repeatable work into governed flows." description="Review Workspace Studio capabilities and see which Google Workspace plans include flow execution capacity." filterKey="workspace-studio" />;
}
