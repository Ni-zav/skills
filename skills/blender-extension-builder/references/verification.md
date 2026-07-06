# Verification Ladder

Use this before declaring a Blender extension task done.

## 1. Static Skill Checker

Run the bundled structural checker from the skills repo:

```bash
python skills/blender-extension-builder/scripts/check_extension.py /path/to/extension
```

This catches common manifest, naming, permission, build-table, and `register()`/`unregister()` issues. It does not replace Blender validation.

## 2. Python Syntax Checks

For pure Python modules outside Blender-only imports, run compile checks:

```bash
python -m py_compile /path/to/extension/__init__.py
```

If modules import `bpy` at top level, `py_compile` still parses syntax but may not cover runtime registration behavior. Blender remains the source of truth.

## 3. Blender Manifest Validation

Validate source directory:

```bash
blender --command extension validate /path/to/extension
```

Validate built ZIP:

```bash
blender --command extension validate /path/to/dist/my_extension-0.1.0.zip
```

A source validation pass means metadata parses. It does not prove the add-on registers.

## 4. Register/Unregister Smoke Test

Run from a clean factory startup. For packages with valid folder names:

```bash
blender --background --factory-startup --python-expr "import sys, importlib; sys.path.insert(0, r'/path/to/parent'); m=importlib.import_module('my_extension'); m.register(); m.unregister(); print('OK')"
```

For a single `__init__.py` without relative imports:

```bash
blender --background --factory-startup --python-expr "import importlib.util, pathlib; p=pathlib.Path(r'/path/to/extension/__init__.py'); spec=importlib.util.spec_from_file_location('smoke_ext', p); m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); m.register(); m.unregister(); print('OK')"
```

Use the package import version when the extension uses `from . import ...`.

## 5. Build Package

```bash
blender --command extension build --source-dir /path/to/extension --output-dir /path/to/dist
```

Then validate the ZIP. If ZIP validation fails after source validation passed, inspect build include/exclude rules.

## 6. Optional Isolated Install Test

For release-level confidence, test installation with isolated user config/extensions directories so the user's real Blender profile is untouched.

PowerShell example:

```powershell
$env:BLENDER_USER_CONFIG = "$PWD\.tmp-blender\config"
$env:BLENDER_USER_EXTENSIONS = "$PWD\.tmp-blender\extensions"
blender --command extension install-file --enable ".\dist\my_extension-0.1.0.zip"
```

Only do this when the user wants install-level testing. Clean up temporary folders after confirming paths are inside the workspace.

## 7. UI/Behavior Test

If the task affects UI, operators, import/export, file IO, or scene changes, create the smallest Blender script that exercises the behavior. Examples:
- call the operator with a prepared context
- create a temporary object and run the operator
- import/export a tiny fixture file
- instantiate property groups and check defaults

Do not rely only on manual UI observation when a small script can check behavior.

## Common Failure Signals

- `Class already registered`: unregister order or duplicate registration problem
- `missing bl_rna`: unregistering an unregistered class or wrong order
- `attempted relative import with no known parent package`: smoke test imported file instead of package
- `manifest value cannot be empty`: remove optional empty manifest fields
- built ZIP missing files: `[build].paths` allow-list is too narrow
- install works only in the user's profile: hidden dependency on enabled add-ons or startup file

## Minimum Done Matrix

- Manifest-only change: static checker plus Blender source validation
- Code registration/UI change: static checker plus source validation plus register/unregister smoke test
- Packaging change: source validation plus build plus ZIP validation
- Release/publish change: full ladder through ZIP validation, and isolated install when feasible