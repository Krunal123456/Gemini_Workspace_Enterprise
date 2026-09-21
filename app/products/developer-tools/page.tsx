import { Metadata } from "next";
import { ProductCapabilityHub } from "@/components/products/ProductCapabilityHub";

export const metadata: Metadata = {
  title: "Gemini Developer Tools & Plan Availability | Gemini Intelligence",
  description: "Explore Gemini CLI and Gemini Code Assist availability across AI Ultra and Gemini Enterprise plans.",
};

export default function DeveloperToolsProductPage() {
  return <ProductCapabilityHub eyebrow="Developer tools" title="Bring Gemini into the developer workflow." description="Compare Gemini CLI and Gemini Code Assist availability across AI add-ons and Gemini Enterprise editions." filterKey="developer-tools" />;
}
