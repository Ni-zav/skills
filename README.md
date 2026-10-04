# Ni-zav Skills

Portable Agent Skills for the domains and workflows I actually use.

This repository is deliberately **not** a pile of generic personas such as "TypeScript expert" or "senior reviewer". Modern coding agents already know the basics. The useful middle layer is reusable operating judgment: how to localize failures, prove a release, execute a migration, benchmark honestly, evaluate a dependency, or harden an integration. Niche skills then add domain knowledge that would otherwise be rediscovered project by project.

## Design rules

A skill belongs here when at least one of these is true:

- the task has domain-specific traps that a general coding model routinely misses;
- a repeatable operating method prevents agents from shortcutting into plausible-but-unverified work;
- current external documentation must be checked in a predictable way;
- success requires a concrete verification ladder, not just plausible code;
- the skill preserves hard-won knowledge from real projects;
- scripts, fixtures, references, or quality rubrics materially improve the result.

A skill does **not** belong here just because a technology exists.

## Catalog

### General operating skills

These are intentionally general, but each adds a procedure rather than a persona.

- `failure-localization` — find the first incorrect boundary and prove root cause before fixing symptoms.
- `release-readiness-operator` — convert "ready" into explicit build, integration, failure, install, recovery, docs, and release gates.
- `migration-executor` — migrate APIs, frameworks, platforms, schemas, or infrastructure with compatibility windows and rollback.
- `performance-benchmark-engineer` — design representative benchmarks, profile bottlenecks, control variance, and verify end-user improvement.
- `oss-adoption-evaluator` — evaluate open-source dependencies by capability, maintenance, security, license, integration cost, and exit risk.
- `integration-contract-hardening` — make APIs/webhooks/queues safe under retries, duplicates, reordering, partial failure, and reconciliation.
- `research-to-implementation` — turn technical research into a justified decision, implementation, verification, and durable repo knowledge.
- `visual-reference-reviewer` — judge visual implementation by composition, hierarchy, depth, material, typography, color, and functional completeness.
- `skill-library-curator` — keep this library useful as it grows by auditing overlap, trigger quality, provenance, and baseline value.

### Cloud, web, and product infrastructure

- `cloudflare-edge-operator` — Workers, Static Assets, Pages migration, R2, D1, Queues, Workflows, bindings, Wrangler, observability, and deployment debugging.
- `seo-dynamic-web` — technical SEO for dynamic/JavaScript sites, localization, metadata, structured data, crawlability, sitemaps, canonicals, and rendered-content verification.
- `webgl-spatial-ui-engineer` — Three.js/WebGL spatial products such as plot viewers, image-to-3D tools, 360 tours, architecture viewers, and large interactive scenes.
- `pixel-streaming-operator` — Unreal Pixel Streaming signalling, WebRTC, STUN/TURN, SFU, reverse proxy/tunnel, and production diagnostics.

### 3D, CAD, realtime, and generative media

- `blender-extension-builder` — Blender extension packaging, lifecycle, validation, and publishing.
- `blender-large-scene-performance` — object/instance/geometry/depsgraph/Python bottlenecks in very large Blender scenes.
- `archviz-interchange-engineer` — SketchUp/Blender/IFC/DXF/DWG-style interchange, fidelity, units, transforms, instances, metadata, and round-trip QA.
- `comfyui-workflow-engineer` — reproducible ComfyUI graphs, custom nodes, API execution, model iteration, dependencies, and VRAM behavior.
- `reverse-engineering-product-teardown` — evidence-driven black-box/product architecture analysis for interoperability and independent implementation.

### Device, vision, and interface engineering

- `android-custom-ui-performance` — Java/View/Canvas Android interfaces where frame time, allocations, geometry caching, gestures, and lifecycle correctness matter.
- `computer-vision-document-pipeline` — capture, page detection, editable boundaries, perspective correction, OCR coordinate integrity, projects, and PDF export.
- `huawei-watch-face-engineer` — Theme Studio Pro watch faces, qualification-ready design systems, expressions, depth, AOD, packaging, and device verification.

### Personal knowledge systems

- `obsidian-plugin-builder` — local or publishable Obsidian plugins.
- `obsidian-vault-architect` — durable vault information architecture, schemas, migrations, links, attachments, and automation boundaries.
- `personal-knowledge-ingestion` — capture links, notes, receipts, attendance, and structured inputs from chat/web into a durable vault.

The generated machine-readable catalog is in `skills.json`; the human scan view is `DASHBOARD.md`.

## Install

```bash
npx skills@latest add Ni-zav/skills
```

Or clone and install local copies:

```bash
npm run install:codex
npm run install:claude
```

Install one local skill:

```bash
node scripts/skills.mjs install --target codex --skill failure-localization
```

## Authoring workflow

1. Decide whether the missing value is truly reusable domain/process knowledge.
2. Search the existing catalog for overlap.
3. Put discovery triggers and useful boundary language in the frontmatter `description`.
4. Keep `SKILL.md` procedural and compact.
5. Put volatile facts and deep domain material in `references/`.
6. Add deterministic helpers only when they save repeated code or prevent fragile mistakes.
7. Add realistic trigger/task prompts in `evals/evals.json`.
8. Compare the skill's expected behavior with what a strong baseline agent would already do.
9. Run:

```bash
npm run dashboard
npm run validate
```

See `.agents/skill-authoring.md` and use `skill-library-curator` for library-level review.

## Originality and provenance

Every skill has a required `references/provenance.md` describing primary sources, external inspirations, and the original synthesis contributed by this library. See `PROVENANCE.md` for the index.

This repository uses public standards and engineering principles as research input, but the skill workflows and wording are authored for this library and its recurring use cases. Do not wholesale-copy third-party skills into this repository. When a public skill has a useful principle, extract the principle, verify it against primary sources where possible, adapt it to this catalog's boundaries, and evaluate whether it adds value over the base model.

## Compatibility

The repository follows the open Agent Skills shape: a required `SKILL.md`, plus optional `references/`, `scripts/`, `assets/`, `evals/`, and host metadata under `agents/`.

The canonical skill content should remain host-neutral. Host-specific UI or tool metadata belongs under `agents/`.

## Research basis

See `RESEARCH.md` for current standards and fast-moving domain references, `PROVENANCE.md` for per-skill source lineage, and `DOGFOOD.md` for the usage/evaluation loop.
