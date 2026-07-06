# Publishing And Repositories

Use this when preparing a Blender extension release, publishing to Blender's Extension Platform, or hosting a third-party extension repository.

## Release Readiness

Before publishing, confirm:
- manifest `version` is bumped and matches the ZIP filename expectation
- `tagline` is short and punctuation-free
- license is accurate and SPDX-formatted
- permissions are minimal and explained
- wheels and platform restrictions are accurate
- package excludes local caches, VCS files, old ZIPs, test files, and secrets
- source directory and built ZIP both validate
- register/unregister smoke test passes

## Artifact Naming

Blender build defaults to:

```text
{id}-{version}.zip
```

Use exact output paths for repeatable release scripts:

```bash
blender --command extension build --source-dir ./my_extension --output-filepath ./dist/my_extension-0.2.0.zip
```

Do not hand-zip releases unless Blender's build command cannot express the package. Hand-built ZIPs often contain the wrong parent folder.

## Extension Platform Notes

For Blender's Extension Platform, keep metadata user-facing:
- `name`: complete public name
- `tagline`: concise benefit, not an internal codename
- `website`: docs/support/source URL when available
- `tags`: use recognized Blender extension tags
- `license`: match the actual code and bundled assets

If publishing proprietary/internal add-ons, verify platform and license expectations before assuming public distribution is allowed.

## Third-Party Static Repository

Blender can generate a static repository index for hosted packages:

```bash
blender --command extension server-generate --repo-dir /path/to/repo --html
```

A repository directory should contain built extension ZIPs. Optional `blender_repo.toml` can provide repository-level config such as blocklist entries.

Example blocklist config:

```toml
schema_version = "1.0.0"

[[blocklist]]
id = "old_extension"
reason = "Replaced by new_extension"
```

Use static hosting for the generated files when a private marketplace is needed.

## Versioning

Use semantic versioning:
- patch: bug fix, packaging fix, small UI correction
- minor: new operator, new panel, new import/export support
- major: breaking operator ids, data model, preferences, or file format behavior

Avoid changing operator `bl_idname`, property names, or stored scene data names in patch releases.

## Release Checklist

1. Update manifest version.
2. Regenerate or update any bundled docs/assets needed at runtime.
3. Run the verification ladder from `references/verification.md`.
4. Build into `dist/` or a release folder.
5. Validate the built ZIP.
6. Inspect ZIP contents if build rules changed.
7. Generate repository index if hosting a third-party repository.
8. Record the exact Blender version used for release validation.

## What Not To Ship

Do not ship:
- credentials, tokens, `.env` files
- `.git`, `.github`, `.vscode`, editor metadata
- `__pycache__`, `.pytest_cache`, `.mypy_cache`
- previous ZIP releases inside the package
- large source assets not used at runtime
- local logs or debug captures
- temporary install/test folders