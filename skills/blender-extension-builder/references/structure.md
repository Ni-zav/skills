# Extension Structure

Use this before creating, splitting, or reorganizing a Blender extension.

## Pick The Smallest Shape

Use a single-file extension when it has a few operators or one panel:

```text
my_extension/
  blender_manifest.toml
  __init__.py
```

Use a multi-module extension when it has multiple UI areas, persistent state, preferences, import/export code, or bundled assets:

```text
my_extension/
  blender_manifest.toml
  __init__.py
  operators.py
  panels.py
  properties.py
  preferences.py
  icons/
  assets/
```

Use subpackages only when a module is becoming a mixed bag:

```text
my_extension/
  __init__.py
  blender_manifest.toml
  ui/
    __init__.py
    panels.py
  ops/
    __init__.py
    import_scene.py
  data/
    presets.json
```

Avoid creating framework-style folders (`core`, `services`, `managers`) unless the code already proves the need.

## Root Files

Required for add-on extensions:
- `blender_manifest.toml`
- `__init__.py`

Recommended root responsibilities:
- `__init__.py`: import modules, hold `classes`, define `register()` and `unregister()` orchestration
- `operators.py`: `bpy.types.Operator` classes and action code
- `panels.py`: `bpy.types.Panel`, `Menu`, `UIList` drawing only
- `properties.py`: `PropertyGroup` classes and property attach/detach helpers
- `preferences.py`: `AddonPreferences` and settings UI

## Naming

- Folder name should match or closely mirror manifest `id`.
- Manifest `id` should use lowercase letters, digits, and underscores.
- Operator namespaces should match the extension id, for example `my_extension.do_thing`.
- Class names should use a unique uppercase prefix, for example `MYEXT_OT_do_thing` and `MYEXT_PT_panel`.
- `bl_idname` values are API. Do not rename them casually after users may have keymaps or scripts referring to them.

## Module Registration Pattern

For multi-module add-ons, either keep one central `classes` tuple in `__init__.py`, or let each module expose `register()` and `unregister()`.

Central tuple is best for small/medium add-ons:

```python
from .operators import MYEXT_OT_do_thing
from .panels import MYEXT_PT_panel

classes = (
    MYEXT_OT_do_thing,
    MYEXT_PT_panel,
)
```

Module delegation is best when modules own side effects such as keymaps or handlers:

```python
from . import operators, panels, properties

modules = (properties, operators, panels)


def register():
    for module in modules:
        module.register()


def unregister():
    for module in reversed(modules):
        module.unregister()
```

Do not mix both patterns randomly. If using modules, each module must clean up its own side effects.

## Assets And Data Files

- Keep runtime assets inside the extension folder.
- Resolve files relative to `__file__`, not the process working directory.
- Include assets in `[build].paths` if using an allow-list.
- Exclude generated output, local caches, previous ZIPs, `.git`, virtual environments, and test captures.

Example path helper:

```python
from pathlib import Path

ADDON_DIR = Path(__file__).resolve().parent
PRESETS_PATH = ADDON_DIR / "assets" / "presets.json"
```

## Preferences

Use `AddonPreferences` for settings that apply globally to the add-on. Use scene/object properties for data that belongs to a blend file.

```python
class MYEXT_preferences(bpy.types.AddonPreferences):
    bl_idname = __package__ or __name__

    api_url: bpy.props.StringProperty(name="API URL")

    def draw(self, context):
        self.layout.prop(self, "api_url")
```

Avoid storing secrets in plain add-on preferences unless the user explicitly accepts that tradeoff.

## Structure Review

Before finishing, confirm:
- package root is the build source directory
- no extra parent folder will be added inside the ZIP
- module imports are package-relative (`from . import operators`)
- runtime assets are included by build rules
- UI code does not own business logic
- side-effect modules have explicit cleanup