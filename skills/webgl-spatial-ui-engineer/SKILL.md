---
name: webgl-spatial-ui-engineer
description: Build and optimize interactive Three.js/WebGL spatial products such as architecture viewers, 360 tours, plot visualizers, image-to-3D tools, shader demos, and large-scene web experiences. Use when a product needs camera/orbit controls, picking, overlays, instancing, LOD, spatial labels, large geometry, texture/material management, scene serialization, or when a visually impressive prototype must become a responsive usable product.
---

# WebGL Spatial UI Engineer

Design the product interaction and scene data model together. A good renderer with a weak spatial UI still feels broken.

## Workflow

1. Define scene scale, expected object count, geometry size, texture budget, target devices, and required interactions.
2. Separate:
   - persistent domain data;
   - render objects;
   - transient interaction state;
   - UI/overlay state.
3. Choose coordinate/unit conventions once and document them.
4. Keep object identity stable so picking, labels, availability/status, selection, and serialization do not depend on transient Three.js UUIDs.
5. Batch or instance repeated geometry where possible.
6. Use LOD/frustum/visibility strategies before reducing quality globally.
7. Load heavy assets progressively and provide visible loading/error states.
8. Keep DOM overlays synchronized with camera projection without forcing expensive layout work every frame.
9. Test mobile GPU/memory constraints early.
10. Measure frame time and memory after representative data is loaded.

## Spatial product patterns

### Plot/site visualizers

Keep availability/business metadata outside the mesh. Render status from data so changing a plot does not require regenerating geometry.

### 360/tour products

Treat panorama nodes and navigation edges as a graph. Preload likely next nodes, preserve camera orientation intentionally, and avoid blocking the UI on full-resolution textures.

### Image-to-3D / reconstruction tools

Keep derived geometry provenance and confidence data. Do not imply metric/architectural precision when the source inference cannot support it.

## Rendering quality

Use physically coherent material/light relationships. Shader effects should support legibility and depth, not hide poor geometry or camera composition.

## Verification

Test:
- representative large scene;
- resize and DPR changes;
- pointer/touch picking;
- context loss/recovery if relevant;
- mobile memory pressure;
- asset failures;
- serialization/reload of state.
