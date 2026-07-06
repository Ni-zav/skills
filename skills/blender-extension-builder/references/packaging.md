# Blender Extension Packaging

Use this when validating, building, installing, or publishing Blender extensions.

Official references:
- https://docs.blender.org/manual/en/latest/advanced/extensions/getting_started.html
- https://docs.blender.org/manual/en/latest/advanced/command_line/extension_arguments.html

## Commands

`-c` is Blender's short alias for `--command`. It consumes the remaining arguments and implies background mode.

Validate a source directory:

```bash
blender --command extension validate /path/to/extension
```

Validate a ZIP:

```bash
blender --command extension validate /path/to/my_extension-0.1.0.zip
```

Build from a source directory:

```bash
blender --command extension build --source-dir /path/to/extension --output-dir /path/to/dist
```

Build to an exact file path:

```bash
blender --command extension build --source-dir /path/to/extension --output-filepath /path/to/dist/my_extension-0.1.0.zip
```

Short alias variant:

```bash
blender -c extension build --source-dir /path/to/extension --output-dir /path/to/dist
```

## Build Options

Useful flags:
- `--source-dir`: directory containing `blender_manifest.toml`; defaults to current directory.
- `--output-dir`: package output directory; defaults to current directory.
- `--output-filepath`: exact ZIP output path; defaults to `{id}-{version}.zip`.
- `--valid-tags`: JSON file containing custom valid tags, or an empty path to disable tag validation.
- `--split-platforms`: build one package per platform, useful for large platform-specific wheels.
- `--verbose`: include more build output.

## Stop Rules

Stop and fix before continuing when:
- manifest validation fails
- registration smoke test fails
- build creates a ZIP missing runtime files
- package contains `.git`, caches, test fixtures, local virtualenvs, or previous ZIPs
- bundled wheels are referenced but absent
- code requires network/files/clipboard but manifest permissions do not declare it

## Registration Smoke Test

For simple single-file packages:

```bash
blender --background --factory-startup --python-expr "import importlib.util, pathlib; p=pathlib.Path(r'/path/to/extension/__init__.py'); spec=importlib.util.spec_from_file_location('smoke_ext', p); m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); m.register(); m.unregister(); print('OK')"
```

For packages with relative imports, put the extension parent on `sys.path` and import by folder name:

```bash
blender --background --factory-startup --python-expr "import sys, importlib; sys.path.insert(0, r'/path/to/parent'); m=importlib.import_module('my_extension'); m.register(); m.unregister(); print('OK')"
```

If the folder name is not a valid Python identifier, fix the folder/id before packaging.

## Windows Notes

Prefer quoted absolute paths for paths containing spaces. If Blender writes warnings about a user extension cache while still returning exit code 0, treat that as environment noise unless validation/build itself failed.