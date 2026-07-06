---
name: blender-extension-builder
description: Build, audit, convert, package, publish, and validate Blender 4.2+ extension add-ons. Use when creating Blender extensions from scratch, converting legacy bl_info add-ons to blender_manifest.toml, designing extension folder/module structure, implementing bpy register/unregister lifecycle, packaging with blender --command extension build or blender -c extension build, validating extension ZIPs, testing add-on registration, publishing extension repositories, or working with Blender operators, panels, preferences, handlers, timers, keymaps, permissions, wheels, and extension packaging structure.
---

# Blender Extension Builder

Use this skill to create or repair Blender extension add-ons that install cleanly, register cleanly, package correctly, and are ready for local use or publishing.

## Workflow

1. Classify the task: new extension, legacy add-on conversion, repair, packaging, or publishing.
2. Inspect the target folder before editing. Find `blender_manifest.toml`, legacy `bl_info`, `__init__.py`, submodules, keymaps, handlers, timers, preview collections, bundled assets, and existing ZIP/build output.
3. Choose the smallest structure that fits. Read `references/structure.md` before creating or reorganizing files.
4. If converting a legacy add-on, read `references/legacy-conversion.md` before touching imports or metadata.
5. Edit the manifest first. Read `references/manifest.md` when touching `blender_manifest.toml`.
6. Keep registration deterministic. Read `references/lifecycle.md` when touching classes, properties, keymaps, handlers, timers, previews, or reload behavior.
7. Verify with the ladder in `references/verification.md`. Do not stop at source validation when code changed.
8. If publishing or hosting packages, read `references/publishing.md`.

## Quick Start

For a new minimal add-on extension, copy `assets/minimal-addon-extension/`, then rename:

- manifest `id`, `name`, `tagline`, `maintainer`, and `version`
- Python class prefixes
- operator `bl_idname` namespace
- panel labels and category

Then run:

```bash
python skills/blender-extension-builder/scripts/check_extension.py /path/to/extension
blender --command extension validate /path/to/extension
blender --background --factory-startup --python-expr "import sys, importlib; sys.path.insert(0, r'/path/to/parent'); m=importlib.import_module('extension_folder'); m.register(); m.unregister(); print('OK')"
blender --command extension build --source-dir /path/to/extension --output-dir /path/to/dist
```

## Non-Negotiables

- Keep `blender_manifest.toml` at the extension root and package from that root.
- Use `schema_version = "1.0.0"` and `blender_version_min` of at least `4.2.0`.
- Do not leave empty optional manifest values. Remove optional keys instead.
- Keep `id` Python-safe: lowercase letters, digits, and underscores.
- Keep `tagline` at 64 characters or less and do not end it with punctuation.
- Declare only permissions the code really uses, with short reasons.
- Register classes in dependency order and unregister them in reverse order.
- Clean up everything registered outside class registration: keymaps, handlers, timers, draw handlers, properties, preview collections, msgbus subscriptions, and temporary globals.
- Do not mutate scene data, preferences, external files, or network state from `Panel.draw`.
- Do not rely on the user's startup file or enabled add-ons during tests. Use `--factory-startup` for registration smoke tests.
- Prefer `blender --command extension validate` and `blender --command extension build`; `-c` is the short alias for `--command`.

## Reference Selection

- Read `references/structure.md` for single-file vs multi-module layout, naming, assets, icons, and package boundaries.
- Read `references/legacy-conversion.md` for `bl_info` migration, import repair, and old ZIP layout traps.
- Read `references/manifest.md` for manifest fields, TOML templates, permissions, wheels, platforms, and build include/exclude rules.
- Read `references/lifecycle.md` for register/unregister structure, class lists, handlers, keymaps, properties, previews, and hot-reload-safe cleanup.
- Read `references/verification.md` for static checks, Blender validation, smoke tests, package validation, and install tests.
- Read `references/publishing.md` for extension platform readiness, third-party repository generation, versioning, and release artifacts.
- Read `references/packaging.md` for command syntax and build flags when only packaging is in scope.

## Done Criteria

- `scripts/check_extension.py` passes for the extension directory.
- `blender --command extension validate <extension-dir-or-zip>` passes.
- A background registration smoke test passes for add-on code changes.
- `blender --command extension build --source-dir <extension-dir> --output-dir <dist-dir>` creates the expected ZIP when packaging is requested.
- The built ZIP validates when a package is produced.