# Ni-zav Skills

Portable Agent Skills for the domains and workflows I actually use.

This repository is deliberately **not** a pile of generic personas such as "TypeScript expert" or "senior reviewer". Modern coding agents already know the basics. These skills capture the parts that are expensive to rediscover: niche domain rules, failure modes, verification ladders, release procedures, visual-quality criteria, and repeatable research workflows.

## Design rules

A skill belongs here when at least one of these is true:

- the task has domain-specific traps that a general coding model routinely misses;
- I repeat the same multi-step workflow across repositories;
- current external documentation must be checked in a predictable way;
- success requires a concrete verification ladder, not just plausible code;
- the skill preserves hard-won knowledge from real projects.

A skill does **not** belong here just because a technology exists.

## Catalog

### Research and delivery

- `research-to-implementation` — turn an ambiguous technical request into evidence, a bounded plan, implementation, verification, and durable repo documentation.
- `visual-reference-reviewer` — judge implementation against visual references by composition, depth, hierarchy, material, typography, spacing, and functional completeness.

### Cloud, web, and product infrastructure

- `cloudflare-edge-operator` — Workers, Static Assets, Pages migration, R2, D1, Queues, Workflows, bindings, Wrangler, observability, and deployment debugging.
- `seo-dynamic-web` — technical SEO for JavaScript/Next-style dynamic sites, localization, metadata, structured data, crawlability, sitemaps, canonicals, and rendered-content verification.
- `webgl-spatial-ui-engineer` — Three.js/WebGL spatial products such as plot viewers, image-to-3D tools, 360 tours, architecture viewers, and large interactive scenes.

### 3D, CAD, and realtime

- `blender-extension-builder` — Blender 4.2+ extension packaging, lifecycle, validation, and publishing.
- `archviz-interchange-engineer` — SketchUp/Blender/IFC/DXF/DWG-style interchange, geometry fidelity, units, transforms, layers, materials, naming, and round-trip QA.
- `pixel-streaming-operator` — Unreal Pixel Streaming signalling, WebRTC, STUN/TURN, SFU, frontend, reverse proxy/tunnel, ports, and production diagnostics.

### Device and interface engineering

- `android-custom-ui-performance` — Java/View/Canvas Android interfaces where frame time, allocations, geometry caching, gestures, and lifecycle correctness matter.
- `huawei-watch-face-engineer` — Huawei Theme Studio Pro watch faces, qualification-ready design systems, expressions, assets, depth, AOD, packaging, and device verification.

### Personal knowledge systems

- `obsidian-plugin-builder` — local or publishable Obsidian plugins.
- `personal-knowledge-ingestion` — capture links, notes, receipts, attendance, and lightweight structured inputs from chat/web into an Obsidian-style vault without turning the vault into an automation dump.

The generated machine-readable catalog is in `skills.json`; the human scan view is `DASHBOARD.md`.

## Install

Install the whole catalog with a compatible Agent Skills installer:

```bash
npx skills@latest add Ni-zav/skills
```

Or clone this repository and install local copies:

```bash
npm run install:codex
npm run install:claude
```

Install one local skill:

```bash
node scripts/skills.mjs install --target codex --skill cloudflare-edge-operator
```

## Authoring workflow

1. Decide whether the missing value is truly reusable domain/process knowledge.
2. Put discovery triggers in the frontmatter `description`.
3. Keep `SKILL.md` procedural and compact.
4. Put volatile facts and deep domain material in `references/`.
5. Add deterministic helpers only when they save repeated code or prevent fragile mistakes.
6. Add realistic trigger/task prompts in `evals/evals.json`.
7. Run:

```bash
npm run dashboard
npm run validate
```

See `.agents/skill-authoring.md` for the quality bar.

## Compatibility

The repository follows the open Agent Skills shape: a required `SKILL.md`, plus optional `references/`, `scripts/`, `assets/`, `evals/`, and host metadata under `agents/`.

The canonical skill content should remain host-neutral. Host-specific UI or tool metadata belongs under `agents/`.

## Research basis

See `RESEARCH.md` for the current standards and domain sources used during the October 2026 rebuild.
