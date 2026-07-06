# Blender Extension Manifest

Use this when creating or editing `blender_manifest.toml`.

Official references:
- https://docs.blender.org/manual/en/latest/advanced/extensions/getting_started.html
- https://docs.blender.org/manual/en/latest/advanced/command_line/extension_arguments.html

## Required Shape

`blender_manifest.toml` must live at the package root. For an add-on extension, that root normally also contains `__init__.py`.

Required fields:

```toml
schema_version = "1.0.0"
id = "my_extension"
version = "0.1.0"
name = "My Extension"
tagline = "Short useful description"
maintainer = "Developer Name"
type = "add-on"
blender_version_min = "4.2.0"
license = ["SPDX:GPL-3.0-or-later"]
```

Rules:
- `id`: Use lowercase letters, digits, and underscores. Avoid hyphens because it becomes part of Python import/package naming.
- `version`: Use semantic versioning.
- `type`: Use `"add-on"` or `"theme"`.
- `tagline`: Keep it at 64 characters or less and do not end with punctuation.
- `license`: Use SPDX ids prefixed with `SPDX:`.
- `blender_version_min`: Use at least `4.2.0` for Blender extensions.
- Optional fields must not be present with empty strings or empty arrays.

## Optional Fields

Add only when real:

```toml
website = "https://example.com"
tags = ["3D View", "Import-Export"]
blender_version_max = "5.1.0"
copyright = ["2026 Developer Name"]
platforms = ["windows-x64", "macos-arm64", "linux-x64"]
wheels = ["./wheels/package-1.0.0-py3-none-any.whl"]
```

Platform values accepted by Blender docs:
- `windows-x64`
- `windows-arm64`
- `macos-x64`
- `macos-arm64`
- `linux-x64`

## Permissions

Declare permissions only for resources the extension actually uses:

```toml
[permissions]
files = "Import and export project files"
network = "Sync assets with the project server"
clipboard = "Copy generated command text"
```

Allowed permission keys:
- `files`
- `network`
- `clipboard`
- `camera`
- `microphone`

Permission reasons should be short, specific, 64 characters or less, and should not end with punctuation. If using network access, code should check Blender's online-access state before making network calls.

## Build Table

Most extensions can omit `[build]`; Blender supplies default excludes. Add it only for real packaging control.

```toml
[build]
paths_exclude_pattern = [
  "__pycache__/",
  ".git",
  "*.zip",
  ".venv/",
  "dist/",
]
```

Use `paths` only when the package needs a strict allow-list:

```toml
[build]
paths = [
  "blender_manifest.toml",
  "__init__.py",
  "icons/",
]
```

Do not set `paths` and `paths_exclude_pattern` together. Do not declare `[build.generated]`; it is reserved.

## Review Checklist

- Manifest exists at the extension root.
- Required keys are present and non-empty.
- `id` is import-safe and matches the package identity.
- Tagline is short and punctuation-free at the end.
- Licenses use SPDX format.
- Permissions match actual code paths.
- Bundled wheels are relative paths and are included in the build.
- Build excludes do not accidentally exclude runtime assets.