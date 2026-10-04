# Research Basis — October 2026

This file records why the repository is shaped the way it is and which fast-moving sources should be rechecked when skills are refreshed.

## Research and originality policy

Public skills are useful as examples of *principles*, not as text to copy.

The October 2026 expansion was synthesized around recurring needs in this repository owner's projects. Where a public skill demonstrated a useful pattern—progressive disclosure, evidence-first debugging, trigger evals, baseline comparison, or resource routing—the pattern was re-derived into original workflows and adapted to this catalog. Primary vendor/specification documentation is preferred for factual domain guidance.

## Agent Skills

Primary references:

- Open Agent Skills specification: https://github.com/Open-Dot-Agents/SKILL.md
- Anthropic public skills: https://github.com/anthropics/skills
- Anthropic skill creator: https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md
- OpenAI Skills guide: https://developers.openai.com/api/docs/guides/tools-skills
- OpenAI skill creator: https://github.com/openai/skills/tree/main/skills/.system/skill-creator
- OpenAI, "Rethinking skills and prompts for GPT-6 Astra": https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra

Repository policy derived from the broader ecosystem:

- discovery quality lives mostly in `name` + `description`;
- use progressive disclosure;
- do not duplicate generic model knowledge;
- encode procedures that prevent predictable shortcuts;
- put deep or volatile material in references;
- prefer deterministic scripts for fragile/repetitive operations;
- maintain realistic eval prompts;
- compare skill-assisted behavior against a capable baseline when possible;
- audit third-party skills as executable instructions before adopting them;
- keep host-specific metadata outside the portable skill body.

## Open-source adoption

- OpenSSF Scorecard: https://openssf.org/projects/scorecard/
- SPDX: https://spdx.org/licenses/

Scorecards and popularity are signals, not adoption verdicts. Capability fit, source/license inspection, maintenance, architecture, PoC evidence, and exit cost remain essential.

## External integrations

Example primary source for idempotency semantics:

- Stripe idempotent requests: https://docs.stripe.com/api/idempotent_requests

Provider behavior varies. The reusable principle is to design explicit operation/event identity, retries, duplicate handling, observability, replay, and reconciliation rather than assuming transport gives exactly-once behavior.

## Blender

- Extension/manual sources already referenced by `blender-extension-builder`
- Geometry Nodes performance: https://docs.blender.org/manual/id/dev/modeling/geometry_nodes/performance.html
- Instances: https://docs.blender.org/manual/de/5.2/modeling/geometry_nodes/instances.html
- Realize Instances: https://docs.blender.org/manual/en/5.2/modeling/geometry_nodes/instances/realize_instances.html

For large scenes, preserve instancing/shared geometry, limit evaluation scope, and benchmark the actual Blender/version/scene rather than relying on polygon count alone.

## Computer vision

- OpenCV perspective geometry: https://docs.opencv.org/doc/doxygen/html/d9/ded/group__geometry__shape.html

Document-scanning pipelines should make coordinate spaces explicit and perform the final warp from the best source image rather than accumulating transforms through preview images.

## ComfyUI

- Core docs: https://docs.comfy.org/essentials/core-concepts/links
- Custom nodes overview: https://docs.comfy.org/custom-nodes/overview

ComfyUI's client/server split matters for API automation: server-side computational nodes are naturally automatable, while direct frontend/server interaction can limit API compatibility.

## Obsidian

- Vault API: https://docs.obsidian.md/Plugins/Vault
- Plugin development: https://docs.obsidian.md/Plugins/Getting%20started/Build%20a%20plugin

Prefer Vault/FileManager APIs for plugin-side mutations and use safe read-modify-write primitives for migrations. Test destructive plugin/migration work against a separate vault/copy.

## Cloudflare

- Workers best practices: https://developers.cloudflare.com/workers/best-practices/workers-best-practices/
- Wrangler: https://developers.cloudflare.com/workers/wrangler/
- D1 best practices: https://developers.cloudflare.com/d1/best-practices/

## Unreal Pixel Streaming

- Overview: https://dev.epicgames.com/documentation/en-us/unreal-engine/pixel-streaming-in-unreal-engine
- Infrastructure: https://dev.epicgames.com/documentation/unreal-engine/pixel-streaming-infrastructure
- Hosting/networking: https://dev.epicgames.com/documentation/unreal-engine/hosting-and-networking-guide-for-pixel-streaming-in-unreal-engine

## Huawei watch faces

- Watch Face codelab: https://developer.huawei.com/consumer/en/codelab/theme-Watchface/
- Expressions: https://developer.huawei.com/consumer/en/doc/content/expressions-0000002678032923
- DoF: https://developer.huawei.com/consumer/en/doc/content/depth-of-field-pro-0000001633846453

## Android custom views

- https://developer.android.com/develop/ui/views/layout/custom-views/optimizing-view

## Search / dynamic sites

- https://developers.google.com/search/docs/fundamentals/get-started-developers
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

## Maintenance rule

When a task depends on a fast-moving API, product limit, CLI flag, format version, publishing requirement, or runtime feature, the skill should tell the agent to verify the current official source instead of freezing a transient fact into permanent instructions.
