# Research Basis — October 2026

This file records why the repository is shaped the way it is and which fast-moving domain sources should be rechecked when skills are refreshed.

## Agent Skills

Primary references:

- Open Agent Skills specification: https://github.com/Open-Dot-Agents/SKILL.md
- Anthropic public skills: https://github.com/anthropics/skills
- OpenAI Skills guide: https://developers.openai.com/api/docs/guides/tools-skills
- OpenAI skill creator reference: https://github.com/openai/skills/tree/main/skills/.system/skill-creator
- OpenAI `agents/openai.yaml` fields: https://github.com/openai/skills/blob/main/skills/.system/skill-creator/references/openai_yaml.md
- OpenAI, "Rethinking skills and prompts for GPT-6 Astra": https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra

Repository policy derived from these sources:

- discovery quality lives mostly in `name` + `description`;
- keep the activated skill concise and use progressive disclosure;
- do not duplicate generic model knowledge;
- put deep or volatile material in references;
- prefer deterministic scripts for fragile/repetitive operations;
- maintain realistic eval prompts, especially for triggering and task quality;
- keep host-specific metadata outside the portable skill body.

## Cloudflare

Recheck before editing `cloudflare-edge-operator`:

- Workers best practices: https://developers.cloudflare.com/workers/best-practices/workers-best-practices/
- Wrangler docs: https://developers.cloudflare.com/workers/wrangler/
- D1 best practices: https://developers.cloudflare.com/d1/best-practices/

As of October 2026, Cloudflare recommends Workers Static Assets for new static/full-stack projects, current compatibility dates, generated binding types, service bindings rather than internal REST calls, and first-class observability.

## Unreal Pixel Streaming

Recheck before editing `pixel-streaming-operator`:

- Pixel Streaming overview: https://dev.epicgames.com/documentation/en-us/unreal-engine/pixel-streaming-in-unreal-engine
- Infrastructure: https://dev.epicgames.com/documentation/unreal-engine/pixel-streaming-infrastructure
- Hosting/networking: https://dev.epicgames.com/documentation/unreal-engine/hosting-and-networking-guide-for-pixel-streaming-in-unreal-engine

Important current facts: the infrastructure is maintained separately from the engine, the Signalling Web Server remains mandatory, TURN is often necessary across difficult NATs, and the old Matchmaker path is deprecated from UE 5.5 onward.

## Huawei watch faces

Recheck before editing `huawei-watch-face-engineer`:

- Huawei Watch Face codelab: https://developer.huawei.com/consumer/en/codelab/theme-Watchface/
- Theme Studio Pro expressions: https://developer.huawei.com/consumer/en/doc/content/expressions-0000002678032923
- DoF effect: https://developer.huawei.com/consumer/en/doc/content/depth-of-field-pro-0000001633846453

Theme Studio Pro features and device/spec-version limits change, so the skill must distinguish stable design principles from version-specific capabilities.

## Android custom views

Recheck before editing `android-custom-ui-performance`:

- Android custom-view optimization: https://developer.android.com/develop/ui/views/layout/custom-views/optimizing-view

The durable rule is simple: hot drawing paths should avoid allocations and unnecessary invalidation/layout work; measure frame behavior instead of guessing.

## Search / dynamic sites

Recheck before editing `seo-dynamic-web`:

- Developer SEO guide: https://developers.google.com/search/docs/fundamentals/get-started-developers
- JavaScript SEO basics: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Structured data with JavaScript: https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript
- Sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

Prefer server/static rendering for index-critical content where practical. Validate what crawlers receive, not only what a hydrated browser displays.

## Maintenance rule

When a task depends on a fast-moving API, product limit, CLI flag, format version, or publishing requirement, the skill should tell the agent to verify the current official source instead of freezing a transient fact into permanent instructions.
