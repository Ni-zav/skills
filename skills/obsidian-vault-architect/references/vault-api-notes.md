# Obsidian Vault API Notes

Checked: 2026-10-04.

Primary docs:

- Vault API: https://docs.obsidian.md/Plugins/Vault
- Plugin development guidance: https://docs.obsidian.md/Plugins/Getting%20started/Build%20a%20plugin

Useful current guidance:

- prefer Obsidian's Vault API over raw filesystem manipulation when operating inside a plugin;
- `cachedRead()` is suitable for display/read-only use, while `read()` is appropriate when content will be modified;
- `Vault.process()` performs an atomic read-modify-save and is preferred for synchronous content transformations that must not overwrite intervening changes;
- use `FileManager.renameFile()` when moves/renames should update internal links;
- plugin development should happen in a separate test vault because mistakes can modify user files.

For large migrations, retain an external backup or versioned copy in addition to application-level safety.
