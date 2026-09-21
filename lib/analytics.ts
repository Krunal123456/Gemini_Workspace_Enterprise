export type AnalyticsEvent =
  | { name: "feature_view"; properties: { featureId: string; featureName: string; category: string } }
  | { name: "feature_search"; properties: { query: string; resultsCount: number } }
  | { name: "plan_compare"; properties: { planIds: string[]; comparisonType: "matrix" | "comparator" } }
  | { name: "filter_used"; properties: { filterType: string; filterValue: string } }
  | { name: "article_open"; properties: { articleSlug: string; articleTitle: string } }
  | { name: "cta_click"; properties: { ctaLabel: string; destination: string; section: string } }
  | { name: "export_data"; properties: { exportFormat: "csv" | "pdf"; dataset: string } };

export function trackEvent(event: AnalyticsEvent): void {
  // Graceful telemetry layer — works client-side and can bind to GA4, PostHog, or Segment
  if (typeof window !== "undefined") {
    // Dispatch custom DOM event for any attached tracking listeners
    window.dispatchEvent(
      new CustomEvent("ai_intel_telemetry", {
        detail: event,
      })
    );

    // If Google Analytics gtag is present
    if (typeof (window as unknown as { gtag?: Function }).gtag === "function") {
      (window as unknown as { gtag: Function }).gtag("event", event.name, event.properties);
    }
  }
}
