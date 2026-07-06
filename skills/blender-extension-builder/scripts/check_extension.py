#!/usr/bin/env python3
"""Basic structural checks for a Blender extension source directory."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

try:
    import tomllib
except ModuleNotFoundError:  # pragma: no cover
    print("Python 3.11+ is required for tomllib", file=sys.stderr)
    sys.exit(2)


REQUIRED_FIELDS = {
    "schema_version",
    "id",
    "version",
    "name",
    "tagline",
    "maintainer",
    "type",
    "blender_version_min",
    "license",
}
ALLOWED_TYPES = {"add-on", "theme"}
ALLOWED_PERMISSIONS = {"files", "network", "clipboard", "camera", "microphone"}


def parse_version(value: str) -> tuple[int, int, int]:
    parts = value.split(".")
    if len(parts) < 2:
        raise ValueError(value)
    padded = (parts + ["0", "0"])[:3]
    return tuple(int(part) for part in padded)


def is_empty(value: object) -> bool:
    return value == "" or value == []


def validate(root: Path) -> list[str]:
    errors: list[str] = []
    manifest_path = root / "blender_manifest.toml"
    if not manifest_path.exists():
        return [f"Missing manifest: {manifest_path}"]

    try:
        manifest = tomllib.loads(manifest_path.read_text(encoding="utf-8"))
    except Exception as exc:
        return [f"Invalid TOML: {exc}"]

    missing = sorted(REQUIRED_FIELDS - manifest.keys())
    if missing:
        errors.append(f"Missing required field(s): {', '.join(missing)}")

    for key, value in manifest.items():
        if is_empty(value):
            errors.append(f"Field {key!r} is empty; remove optional empty fields")

    if manifest.get("schema_version") != "1.0.0":
        errors.append('schema_version must be "1.0.0"')

    extension_id = manifest.get("id", "")
    if not isinstance(extension_id, str) or not re.fullmatch(r"[a-z0-9_]+", extension_id):
        errors.append("id must use lowercase letters, digits, and underscores only")

    version = manifest.get("version", "")
    if not isinstance(version, str) or not re.fullmatch(r"\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?", version):
        errors.append("version must look like semantic versioning, for example 0.1.0")

    extension_type = manifest.get("type")
    if extension_type not in ALLOWED_TYPES:
        errors.append('type must be "add-on" or "theme"')

    tagline = manifest.get("tagline", "")
    if isinstance(tagline, str):
        if len(tagline) > 64:
            errors.append("tagline must be 64 characters or less")
        if tagline.endswith((".", "!", "?", ",", ";", ":")):
            errors.append("tagline must not end with punctuation")
    else:
        errors.append("tagline must be a string")

    try:
        if parse_version(str(manifest.get("blender_version_min", "0.0.0"))) < (4, 2, 0):
            errors.append("blender_version_min must be at least 4.2.0")
    except ValueError:
        errors.append("blender_version_min must be a version string")

    licenses = manifest.get("license")
    if not isinstance(licenses, list) or not licenses:
        errors.append("license must be a non-empty list")
    elif any(not isinstance(item, str) or not item.startswith("SPDX:") for item in licenses):
        errors.append("license entries must start with SPDX:")

    permissions = manifest.get("permissions", {})
    if permissions:
        if not isinstance(permissions, dict):
            errors.append("permissions must be a table")
        else:
            unknown = sorted(set(permissions) - ALLOWED_PERMISSIONS)
            if unknown:
                errors.append(f"Unknown permission(s): {', '.join(unknown)}")
            for key, reason in permissions.items():
                if not isinstance(reason, str) or not reason:
                    errors.append(f"Permission {key!r} must have a short reason")
                    continue
                if len(reason) > 64:
                    errors.append(f"Permission {key!r} reason must be 64 characters or less")
                if reason.endswith((".", "!", "?", ",", ";", ":")):
                    errors.append(f"Permission {key!r} reason must not end with punctuation")

    build = manifest.get("build", {})
    if isinstance(build, dict):
        if "paths" in build and "paths_exclude_pattern" in build:
            errors.append("build.paths and build.paths_exclude_pattern cannot both be set")
        if "generated" in build:
            errors.append("build.generated is reserved and must not be declared")
    elif build:
        errors.append("build must be a table")

    if extension_type == "add-on":
        init_path = root / "__init__.py"
        if not init_path.exists():
            errors.append("add-on extensions should contain __init__.py at the source root")
        else:
            init_text = init_path.read_text(encoding="utf-8")
            if "def register(" not in init_text:
                errors.append("__init__.py must define register()")
            if "def unregister(" not in init_text:
                errors.append("__init__.py must define unregister()")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("path", nargs="?", default=".", help="Extension source directory")
    args = parser.parse_args()

    root = Path(args.path).resolve()
    if not root.is_dir():
        print(f"Not a directory: {root}", file=sys.stderr)
        return 2

    errors = validate(root)
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1

    print(f"OK: {root}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())