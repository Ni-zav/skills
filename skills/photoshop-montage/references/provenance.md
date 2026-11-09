# Provenance

Last researched: 2026-11-09. Verify versions, tools and feature credits before live use.

## Primary Photoshop documentation

- Adobe Photoshop UXP API, DOM, batchPlay and `executeAsModal`: https://developer.adobe.com/photoshop/uxp/ps_reference and https://developer.adobe.com/photoshop/uxp/ps_reference/media/batchplay/
- Adobe, Combine images in Photoshop (selections, layers, masks): https://helpx.adobe.com/photoshop/desktop/crop-resize-transform/transform-manipulate-reshape/combine-images-in-photoshop.html
- Adobe, Refine selections (edge-view modes, modes and tools): https://helpx.adobe.com/photoshop/desktop/make-selections/refine-modify-selections/refine-your-selection-and-mask.html
- Adobe, Edit and refine layer masks (black/white/gray): https://helpx.adobe.com/photoshop/desktop/create-masks/layer-masks/edit-and-refine-layer-masks.html
- Adobe, Create embedded Smart Objects: https://helpx.adobe.com/photoshop/desktop/create-manage-layers/smart-objects/create-embedded-smart-objects.html
- Adobe, Match Color in different images (RGB-only): https://helpx.adobe.com/photoshop/desktop/adjust-color/selective-color-adjustments/match-color-in-different-images.html
- Adobe, Blend objects with Harmonize (pixel-layer requirement and matching lighting/shadows): https://helpx.adobe.com/photoshop/desktop/repair-retouch/remove-objects-fill-space/blend-subjects-with-harmonize.html
- Adobe, Match color in a composite: https://www.adobe.com/learn/photoshop/web/match-color-tones-composite

## External implementations reviewed — tool interface inspiration only

- Photoshop-MCP-IMT README and current tool catalog: https://github.com/Immersive-Media-Technologies/photoshop-mcp-imt and https://github.com/Immersive-Media-Technologies/photoshop-mcp-imt/blob/main/docs/available-tools.md
- Photoshop-MCP-IMT skill router and its eight references (including selection-masking, retouch, combos, gotchas, generative, batch): https://github.com/Immersive-Media-Technologies/photoshop-mcp-imt/tree/main/skills/ps

IMT's README documents Photoshop 2024–2026 with macOS/Windows transports, but this skill **has not run Photoshop or IMT live**. APIs and individual features may behave differently by build, user permissions, OS, modal state or MCP server. The Adobe documentation is authoritative on Photoshop behavior; live `ps_catalog` and state readback are authoritative for the configured server. Credit costs and AI model options are deliberately not frozen here.

## Original synthesis and boundaries

The montage production sequence (asset fit → composition → geometry → matte/occlusion → light/contact → local tone/atmosphere → layered finish → visual evidence), protected-detail contract, material-specific matte rubric, P0/P1/P2 stop gates, recipe routing and editable-layer architecture were authored for Ni-zav's portable skill catalog. Architecture renders are a **common sample plate**, not a narrow trigger; 3D modeling, CAD interchange and WebGL remain separate skills.

No third-party skill text, scripts, images, or proprietary assets were intentionally copied into this skill. Upstream sources were researched for capabilities, limitations and workflow ideas, then independently synthesized. This skill ships **no executable plugin or MCP server** and does not claim to control Photoshop without a separately connected integration.
