# Skills Dashboard

Generated from `skills/*/SKILL.md` by `npm run dashboard`.

| Skill | Description | Path | OpenAI metadata |
| --- | --- | --- | --- |
| `blender-extension-builder` | Build, audit, convert, package, publish, and validate Blender 4.2+ extension add-ons. Use when creating Blender extensions from scratch, converting legacy bl_info add-ons to blender_manifest.toml, designing extension folder/module structure, implementing bpy register/unregister lifecycle, packaging with blender --command extension build or blender -c extension build, validating extension ZIPs, testing add-on registration, publishing extension repositories, or working with Blender operators, panels, preferences, handlers, timers, keymaps, permissions, wheels, and extension packaging structure. | `skills/blender-extension-builder` | yes |
| `obsidian-plugin-builder` | Create, modify, package, or manually install Obsidian note-taking app plugins. Use when building local or publishable Obsidian plugins, working with manifest.json/main.js/styles.css, creating PluginSettingTab settings, handling editor-change or Markdown editor behavior, installing plugins into a vault's .obsidian/plugins folder, or choosing between a simple no-build plugin and the official TypeScript sample-plugin workflow. | `skills/obsidian-plugin-builder` | yes |

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
