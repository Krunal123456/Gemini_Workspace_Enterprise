import { Metadata } from "next";
import { ProductCapabilityHub } from "@/components/products/ProductCapabilityHub";
import { productHubCopy } from "@/lib/i18n/page-copy/products";
import { resolveLocale } from "@/lib/i18n/config";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return params.then(({ locale: raw }) => {
    const copy = productHubCopy[resolveLocale(raw)]["gemini-enterprise"];
    return {
      title: copy.metadataTitle,
      description: copy.metadataDescription,
    };
  });
}

export default async function GeminiEnterpriseProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const copy = productHubCopy[resolveLocale(raw)]["gemini-enterprise"];
  return (
    <ProductCapabilityHub
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      filterKey="gemini-enterprise"
    />
  );
}
