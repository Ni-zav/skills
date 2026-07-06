---
name: blender-extension-builder
description: Build, audit, package, and validate Blender 4.2+ extension add-ons. Use when creating or modifying blender_manifest.toml, converting legacy Blender add-ons to extensions, implementing bpy register/unregister lifecycle, packaging with blender --command extension build or blender -c extension build, validating extension ZIPs, testing add-on registration, or working with Blender operators, panels, preferences, handlers, timers, keymaps, permissions, wheels, and extension packaging structure.
---

# Blender Extension Builder

Use this skill to create or repair Blender extension add-ons that install cleanly, register cleanly, and package with Blender's extension command.

## Workflow

1. Inspect the target folder before editing. Find `blender_manifest.toml`, `__init__.py`, submodules, keymaps, handlers, timers, preview collections, and bundled files.
2. If starting from nothing, copy `assets/minimal-addon-extension/` and rename `id`, `name`, class prefixes, operator ids, and UI labels.
3. Edit the manifest first. Read `references/manifest.md` when touching `blender_manifest.toml`.
4. Keep registration deterministic. Read `references/lifecycle.md` when touching classes, properties, keymaps, handlers, timers, previews, or reload behavior.
5. Run the local structural checker before Blender when Python is available:

```bash
python skills/blender-extension-builder/scripts/check_extension.py /path/to/extension
```

6. Verify with Blender. Read `references/packaging.md` for the current command variants and stop rules.

## Non-Negotiables

- Keep `blender_manifest.toml` at the extension root and package from that root.
- Use `schema_version = "1.0.0"` and `blender_version_min` of at least `4.2.0`.
- Do not leave empty optional manifest values. Remove optional keys instead.
- Keep `id` Python-safe: lowercase letters, digits, and underscores.
- Keep `tagline` at 64 characters or less and do not end it with punctuation.
- Declare only permissions the code really uses, with short reasons.
- Register classes in dependency order and unregister them in reverse order.
- Clean up everything registered outside class registration: keymaps, handlers, timers, draw handlers, properties, preview collections, msgbus subscriptions, and temporary globals.
- Do not mutate scene data, preferences, or external files from `Panel.draw`.
- Do not rely on the user's startup file or enabled add-ons during tests. Use `--factory-startup` for registration smoke tests.
- Prefer `blender --command extension validate` and `blender --command extension build`; `-c` is the short alias for `--command`.

## Reference Selection

- Read `references/manifest.md` for manifest fields, TOML templates, permissions, wheels, platforms, and build include/exclude rules.
- Read `references/lifecycle.md` for register/unregister structure, class lists, handlers, keymaps, properties, previews, and hot-reload-safe cleanup.
- Read `references/packaging.md` for validate/build commands, background smoke tests, output flags, and common failure handling.

## Done Criteria

- `scripts/check_extension.py` passes for the extension directory.
- `blender --command extension validate <extension-dir-or-zip>` passes.
- A background registration smoke test passes for add-on code changes.
- `blender --command extension build --source-dir <extension-dir> --output-dir <dist-dir>` creates the expected ZIP when packaging is requested.