# Skills Dashboard

Generated from `skills/*/SKILL.md` by `npm run dashboard`.

| Skill | Description | Path | OpenAI metadata |
| --- | --- | --- | --- |
| `blender-extension-builder` | Build, audit, package, and validate Blender 4.2+ extension add-ons. Use when creating or modifying blender_manifest.toml, converting legacy Blender add-ons to extensions, implementing bpy register/unregister lifecycle, packaging with blender --command extension build or blender -c extension build, validating extension ZIPs, testing add-on registration, or working with Blender operators, panels, preferences, handlers, timers, keymaps, permissions, wheels, and extension packaging structure. | `skills/blender-extension-builder` | yes |

## Install

Local copy install before publishing:

```bash
npm run install:codex
npm run install:claude
```

After this repo is pushed to GitHub, compatible skill installers can use:

```bash
npx skills@latest add <owner>/<repo>
```

## Add A Skill

Create skills under `skills/<skill-name>/`. Each skill needs `SKILL.md`; add `agents/openai.yaml` for Codex UI metadata and optional `references/`, `scripts/`, or `assets/` only when they are useful.
