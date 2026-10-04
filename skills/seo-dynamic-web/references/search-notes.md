# Dynamic Search Notes

Checked: 2026-10-04.

Primary sources:

- https://developers.google.com/search/docs/fundamentals/get-started-developers
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies

Durable guidance:

- Google can render JavaScript, but server-side/pre-rendered HTML reduces complexity and helps other crawlers that may not execute JS.
- Important content should be textually visible in the DOM and each piece of public content should have a crawlable URL.
- Use ordinary crawlable `<a>` links for discovery.
- Generate sitemaps from canonical URLs.
- JSON-LD is the recommended structured-data format, but markup must match visible page content.
- Use Rich Results Test and URL Inspection/rendered HTML to verify what Google sees.
- Dynamic rendering is a workaround, not the preferred long-term architecture.

Do not diagnose indexing from browser appearance alone.
