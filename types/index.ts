export type AvailabilityType = "yes" | "no" | "limited" | "higher_limits" | "custom" | "enterprise";

export interface PlanAvailability {
  available: boolean;
  status: AvailabilityType;
  note?: string;
  limit?: string;
}

export type PlanId =
  | "business-starter"
  | "business-standard"
  | "business-plus"
  | "enterprise-standard"
  | "enterprise-plus"
  | "ai-expanded"
  | "ai-ultra"
  | "gemini-enterprise-business"
  | "gemini-enterprise-standard"
  | "gemini-enterprise-plus"
  | "frontline";

export interface FeatureCitation {
  label: string;
  url: string;
}

export interface Feature {
  id: string;
  slug: string;
  name: string;
  category: string;
  application: string;
  description: string;
  whatItDoes: string;
  howItWorks: string;
  useCaseSummary?: string;
  whereUsed?: string[];
  howToUse?: string[];
  useCases: string[];
  capabilities: string[];
  includedCapabilities?: string[];
  plans: Record<PlanId, PlanAvailability>;
  enterpriseAvailability: "standard" | "plus" | "add-on" | "all" | "enterprise-only";
  enterpriseConsiderations?: string;
  securityConsiderations?: string;
  documentationUrl?: string;
  officialSources?: FeatureCitation[];
  relatedFeatures?: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

export interface Plan {
  id: PlanId;
  slug: string;
  name: string;
  shortName: string;
  type: "workspace" | "addon" | "gemini-enterprise";
  category: "Google Workspace" | "AI Add-ons" | "Gemini Enterprise";
  tagline: string;
  description: string;
  idealFor: string;
  monthlyPriceUSD?: number;
  annualPriceUSD?: number;
  currency: string;
  storage: string;
  participantLimit?: number;
  highlightedFeatures: string[];
  coreCapabilities: {
    generativeAI: string;
    modelAccess: string;
    grounding: string;
    deepResearch: string;
    notebookLMAccess: string;
    connectors: string;
    agentsAndMCP: string;
    securityLevel: string;
    auditLogging: string;
  };
}

export interface Application {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  accentColor: string;
  category: string;
  iconName: string;
  featuresCount: number;
  keyAIFeatures: string[];
  overview: string;
  enterpriseValue: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string;
  accentColor: string;
  featuresCount: number;
}

export interface Connector {
  id: string;
  name: string;
  type: "native" | "third-party" | "mcp" | "custom";
  category: "Workspace" | "Productivity" | "CRM & Support" | "Developer" | "Cloud Data" | "Communication";
  description: string;
  status: "available" | "preview" | "mcp-ready";
  supportedEditions: string[];
  icon: string;
  dataTypes: string[];
  groundingCapabilities: string[];
  enterpriseRequirements: string;
}

export interface SecurityLayer {
  id: string;
  level: number;
  name: string;
  tagline: string;
  description: string;
  capabilities: {
    name: string;
    description: string;
    plansSupported: string[];
    isEnterpriseOnly: boolean;
  }[];
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: "Gemini" | "Enterprise AI" | "Security & Governance" | "Pricing & Procurement" | "Comparisons";
  author: {
    name: string;
    role: string;
    company: string;
  };
  content: string[];
  keyTakeaways: string[];
  relatedFeatures?: string[];
  relatedArticles?: string[];
}
