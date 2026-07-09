---
name: obsidian-plugin-builder
description: Create, modify, package, or manually install Obsidian note-taking app plugins. Use when building local or publishable Obsidian plugins, working with manifest.json/main.js/styles.css, creating PluginSettingTab settings, handling editor-change or Markdown editor behavior, installing plugins into a vault's .obsidian/plugins folder, or choosing between a simple no-build plugin and the official TypeScript sample-plugin workflow.
---

# Obsidian Plugin Builder

## Workflow

1. Determine whether the plugin is local-only or publishable.
2. For local-only, prefer the no-build path: create a plugin folder containing `manifest.json` and `main.js`; add `styles.css` only when styling is needed.
3. For publishable or larger plugins, use Obsidian's sample plugin TypeScript workflow and build to `main.js`.
4. Install manually by copying release files to `<vault>/.obsidian/plugins/<plugin-id>/`.
5. Enable by adding the plugin id to `.obsidian/community-plugins.json` only when the user asks for installation or enablement; otherwise leave vault settings alone.
6. Verify the smallest runnable surface: syntax/load checks for generated JavaScript, focused unit checks for pure logic, and Obsidian reload/manual enable steps when UI runtime verification is not available.

## Minimal Local Plugin

Use this shape for small personal plugins:

```text
<plugin-id>/
  manifest.json
  main.js
```

Keep `manifest.json` small:

```json
{
  "id": "plugin-id",
  "name": "Plugin Name",
  "version": "0.1.0",
  "minAppVersion": "1.5.0",
  "description": "Short behavior summary.",
  "author": "Local",
  "isDesktopOnly": false
}
```

Use CommonJS in `main.js` for no-build local installs:

```js
const { Plugin } = require("obsidian");

module.exports = class MyPlugin extends Plugin {
  async onload() {
    // Register events, commands, or settings here.
  }
};
```

Use `require("obsidian")`; Obsidian provides the runtime module. Do not add npm dependencies for simple editor plugins unless the task truly needs them.

## Editor Plugins

For checklist, task-line, or markdown editing behavior:

- Register editor events with `this.registerEvent(this.app.workspace.on("editor-change", ...))`.
- Guard programmatic edits with a boolean such as `this.editing` to avoid recursive updates.
- For checkbox toggle automation, keep a per-editor `editor.getValue().split("\n")` snapshot and update only lines whose checkbox state changed. Do not stamp any line merely because it is currently checked.
- Seed snapshots from `onLayoutReady`, `active-leaf-change`, and `file-open` so the first toggle after opening a note is not missed.
- Preserve scroll around plugin-owned `replaceRange` calls with `getScrollInfo()` and `scrollTo(left, top)`; restore once immediately and once on `requestAnimationFrame`.
- Parse Markdown task lines with a conservative regex like `/^(\s*[-*]\s+\[)( |x|X)(\]\s*)(.*)$/`.
- Put format and behavior options in `PluginSettingTab` with `Setting` controls.
- Use Obsidian's exported `moment` for user-configurable date formats.

For append/remove timestamp plugins, remove only text that strictly parses with the configured format. Check the configured end or start of the task text, not the whole line.

## Settings

Use `loadData()` and `saveData()` for plugin settings:

```js
const DEFAULT_SETTINGS = { format: "YYYY-MM-DD HH:mm", position: "end" };

async onload() {
  this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  this.addSettingTab(new MySettingTab(this.app, this));
}

async saveSettings() {
  await this.saveData(this.settings);
}
```

Use dropdowns for finite options and text inputs for date formats. Sanitize saved values to known options where possible.

## Install Into A Vault

Manual install target:

```text
<vault>/.obsidian/plugins/<plugin-id>/manifest.json
<vault>/.obsidian/plugins/<plugin-id>/main.js
<vault>/.obsidian/plugins/<plugin-id>/styles.css  # optional
```

Before writing, check whether the folder already exists. Do not overwrite a user's existing plugin unless explicitly asked or after confirming it is the same plugin.

To enable the plugin, add `<plugin-id>` to `.obsidian/community-plugins.json` if it is not already present. Preserve existing plugin ids.

## Publishable Plugin

Use the official sample-plugin pattern when the user wants GitHub release, community submission, TypeScript, tests, or long-term maintenance:

- clone or copy `obsidianmd/obsidian-sample-plugin`
- edit `src/main.ts`
- run `npm i`
- run `npm run dev` or `npm run build`
- release `manifest.json`, `main.js`, and `styles.css` when present

Check official Obsidian docs or the sample plugin README when publishing rules, API names, or release requirements may have changed.