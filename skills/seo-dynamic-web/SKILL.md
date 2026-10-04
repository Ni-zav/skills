---
name: seo-dynamic-web
description: Engineer technical SEO for JavaScript-heavy and dynamically sourced websites, especially Next.js-style sites backed by Supabase/CMS data, localized architecture/portfolio pages, image-heavy project stories, and Cloudflare deployments. Use when pages are not indexed, dynamic content lacks metadata, localization creates duplicate URLs, sitemap/canonical/robots behavior is unclear, structured data is needed, or the browser shows content that crawlers may not receive in rendered/indexable HTML.
---

# SEO for Dynamic Web

Optimize the content that crawlers can discover and understand, not only client-side pixels.

## Workflow

1. List indexable page types and their canonical URL pattern.
2. Inspect the actual initial/server-rendered HTML for a representative page.
3. Ensure each important page has:
   - unique title and description;
   - crawlable internal links;
   - canonical URL;
   - intended robots behavior;
   - meaningful visible text in the DOM;
   - image alt/context where images carry content.
4. Generate sitemap entries from the same canonical content source used by the site.
5. For localized pages, define locale URL strategy and alternate relationships consistently.
6. Add structured data only when it truthfully represents visible page content.
7. Verify response status, rendered HTML, canonical, robots, sitemap, and structured data.
8. Use Search Console/Rich Results/URL inspection when available to validate what Google sees.

## Rendering

Prefer server-side/static rendering or equivalent indexable HTML for content whose discoverability matters. Client rendering can work, but it increases the number of failure modes and other crawlers may not execute JavaScript.

Do not create a separate bot-only content version unless there is a justified compatibility workaround; divergent crawler/user content creates maintenance and policy risk.

## Dynamic content

If project stories, services, locations, or portfolios come from Supabase/CMS:

- expose stable public URLs;
- render key text and metadata from the same data record;
- update `lastmod` only when meaningful content changes;
- avoid accidental indexing of preview/admin/query-parameter variants;
- keep deleted content status behavior intentional.

## Verification

Read `references/search-notes.md` before fixing indexing problems or structured data.
