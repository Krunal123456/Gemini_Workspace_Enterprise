# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Enterprise buyers and procurement teams, IT and Google Workspace administrators, and technical evaluators. The homepage should serve these audiences equally while making plan comparison the clearest first action.

## Product Purpose

MarketStar's Gemini Intelligence site helps organizations evaluate Google Workspace and Gemini offerings and plan adoption. Success means a visitor can understand relevant product differences, compare plans, and continue into the appropriate feature, pricing, model, connector, security, or readiness detail.

## Positioning

A product-led intelligence hub that brings structured feature, model, plan, pricing, connector, and deployment information together with comparison and readiness tools. It is a MarketStar resource, not an official Google product or a statement of Google endorsement.

## Operating Context

Visitors use the site while researching product fit, procurement, security and governance, regional or edition availability, and rollout planning. They may need to move between high-level explanation and detailed product data. Product availability, price, limits, and controls can depend on service, edition, region, subscription, and administrator configuration.

## Capabilities and Constraints

- The site includes product and feature discovery, model information, plan and pricing comparisons, connector discovery, security guidance, onboarding, readiness planning, and research articles.
- The primary homepage action is plan comparison.
- Preserve existing routes and working tools during the homepage redesign.
- Keep English and Spanish experiences available.
- Present Google product claims with relevant official sources and distinguish Gemini API, Google Workspace with Gemini, and Gemini Enterprise.
- Do not invent customers, testimonials, benchmarks, prices, plan entitlements, availability, or Google endorsement. State uncertainty and link to the current primary source where product details may change.
- Existing implementation uses Next.js App Router, React, TypeScript, and Tailwind CSS.

## Brand Commitments

The current product is presented as MarketStar Gemini Intelligence. Preserve the product name and existing brand assets during this homepage redesign; visual expression remains open for the redesign direction.

## Evidence on Hand

- Structured product data is maintained in `data/` for features, applications, plans, models, connectors, and articles.
- Existing interactive comparison, pricing, discovery, readiness, onboarding, and security experiences are part of the product and must remain reachable.
- The site has English and Spanish locale routes.
- Existing logos and brand assets are in `components/logos/` and `public/brand/`.
- No verified customer testimonials, customer logos, or performance benchmarks were confirmed for use as homepage proof. Do not fabricate them.

## Product Principles

- Help visitors make a concrete evaluation decision rather than browse undirected marketing claims.
- Distinguish products and plans precisely; do not imply that features or controls carry across offerings.
- Ground time-sensitive claims in official sources and make relevant caveats visible.
- Keep detailed tools and information reachable without overwhelming the first visit.
- Preserve the existing working routes and localized experience.