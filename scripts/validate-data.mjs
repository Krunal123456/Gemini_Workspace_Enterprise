import { features } from "../data/features.ts";
import { plans } from "../data/plans.ts";
import { applications } from "../data/apps.ts";
import { categories } from "../data/categories.ts";

console.log("🔍 Validating Enterprise AI Data Architecture...");

const seenFeatureIds = new Set();
const seenFeatureSlugs = new Set();
let errors = 0;

console.log(`✓ Total Features: ${features.length}`);

const validPlanIds = new Set(plans.map((p) => p.id));
console.log(`✓ Total Plans: ${plans.length}`);

const validCategoryIds = new Set(categories.map((c) => c.id));
console.log(`✓ Total Categories: ${categories.length}`);

console.log(`✓ Total Core Apps: ${applications.length}`);

for (const feature of features) {
  if (!feature.id || seenFeatureIds.has(feature.id)) {
    console.error(`❌ Duplicate or empty feature ID: ${feature.id}`);
    errors++;
  }
  seenFeatureIds.add(feature.id);

  if (!feature.slug || seenFeatureSlugs.has(feature.slug)) {
    console.error(`❌ Duplicate or empty feature slug: ${feature.slug}`);
    errors++;
  }
  seenFeatureSlugs.add(feature.slug);

  if (!feature.name || !feature.description) {
    console.error(`❌ Feature ${feature.id} missing name or description`);
    errors++;
  }

  // Check category
  if (!validCategoryIds.has(feature.category)) {
    console.error(`❌ Feature ${feature.id} has invalid category: ${feature.category}`);
    errors++;
  }

  // Check plans
  for (const planId of Object.keys(feature.plans)) {
    if (!validPlanIds.has(planId)) {
      console.error(`❌ Feature ${feature.id} references unknown plan ID: ${planId}`);
      errors++;
    }
  }
}

if (errors === 0) {
  console.log("✅ All data integrity checks passed perfectly! 0 errors detected.");
} else {
  console.error(`❌ Found ${errors} validation errors!`);
  process.exit(1);
}
