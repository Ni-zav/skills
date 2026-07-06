# Legacy Add-On Conversion

Use this when converting an old Blender add-on with `bl_info` into a Blender 4.2+ extension.

## Conversion Flow

1. Inspect the old package layout and identify the real add-on root.
2. Keep the Python package importable before changing behavior.
3. Translate `bl_info` into `blender_manifest.toml`.
4. Replace old install assumptions with extension-root packaging.
5. Run source validation, registration smoke test, build, and ZIP validation.

## Translate bl_info

Common mapping:

```python
bl_info = {
    "name": "My Add-on",
    "author": "Developer",
    "version": (1, 2, 3),
    "blender": (4, 2, 0),
    "description": "Short description",
    "doc_url": "https://example.com",
    "category": "3D View",
}
```

Becomes:

```toml
schema_version = "1.0.0"
id = "my_addon"
version = "1.2.3"
name = "My Add-on"
tagline = "Short description"
maintainer = "Developer"
type = "add-on"
website = "https://example.com"
tags = ["3D View"]
blender_version_min = "4.2.0"
license = ["SPDX:GPL-3.0-or-later"]
```

Rules:
- Convert version tuples to semver strings.
- Convert `blender` to `blender_version_min`.
- Use `doc_url`, `tracker_url`, or project homepage as `website` only when non-empty.
- Do not copy empty `warning`, `wiki_url`, or legacy-only fields.
- Choose a real SPDX license; do not guess for proprietary code.

## Import Repair

Legacy add-ons often work as loose scripts but fail as packages. Fix imports to be explicit.

Bad:

```python
import operators
from utils import load_icon
```

Good:

```python
from . import operators
from .utils import load_icon
```

If modules need development reloads, keep reload logic in `__init__.py` only. Do not scatter `importlib.reload()` through modules.

## Old ZIP Layout Traps

Blender extension build expects the manifest at the source root. Avoid these shapes:

```text
my_addon.zip
  my_addon/
    blender_manifest.toml
    __init__.py
```

when the built package accidentally adds another parent folder. Build from the folder that directly contains `blender_manifest.toml`.

Also remove or exclude:
- old release ZIPs
- screenshots and docs not needed at runtime
- `.git`, `.github`, `.vscode`
- local logs and backup files
- `__pycache__`, `.pytest_cache`, `.mypy_cache`

## API Modernization Checks

While converting, look for:
- deprecated context overrides
- old `bpy.utils.register_module` usage
- panel categories or space types no longer valid
- keymap registration that assumes `wm.keyconfigs.addon` exists
- handlers appended without duplicate checks
- custom properties not deleted on unregister
- file/network/clipboard usage requiring manifest permissions

Do not rewrite working Blender logic just because it is old. Fix compatibility issues and packaging issues first.

## Compatibility Choice

If the user needs one codebase for legacy add-on ZIP and extension ZIP, keep compatibility explicit and tested. Otherwise prefer the extension format only; dual packaging doubles verification work.

## Conversion Done Criteria

- `bl_info` is removed or left only for intentionally supported legacy installs.
- `blender_manifest.toml` contains all required extension metadata.
- Package-relative imports work under `--factory-startup`.
- `register()` then `unregister()` runs without leaked classes or handlers.
- Built ZIP validates.