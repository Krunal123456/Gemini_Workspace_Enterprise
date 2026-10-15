import { Metadata } from "next";
import { ProductCapabilityHub } from "@/components/products/ProductCapabilityHub";
import { productHubCopy } from "@/lib/i18n/page-copy/products";
import { resolveLocale } from "@/lib/i18n/config";
import { withLocalizedAlternates } from "@/lib/seo";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return params.then(({ locale: raw }) => {
    const locale = resolveLocale(raw);
    const copy = productHubCopy[locale]["developer-tools"];
    return withLocalizedAlternates({
      title: copy.metadataTitle,
      description: copy.metadataDescription,
    }, "/products/developer-tools", locale);
  });
}

export default async function DeveloperToolsProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const copy = productHubCopy[resolveLocale(raw)]["developer-tools"];
  return (
    <ProductCapabilityHub
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      filterKey="developer-tools"
    />
  );
}
