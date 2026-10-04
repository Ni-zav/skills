---
name: blender-large-scene-performance
description: Diagnose and optimize Blender scenes or add-ons with very high object, instance, polygon, modifier, geometry-node, material, or asset counts. Use when viewport interaction, dependency-graph evaluation, file loading, render preparation, Python batch operations, memory use, or procedural scattering becomes slow; especially for architectural scenes, hundreds of thousands of repeated objects, asset packs, or add-ons that accidentally realize or duplicate geometry.
---

# Blender Large Scene Performance

Identify whether the bottleneck is object overhead, geometry, evaluation, drawing, Python, memory, or rendering before optimizing.

## Workload inventory

Record:

- Blender version and render engine;
- object/collection count;
- unique mesh count vs instances;
- evaluated polygon/point count;
- modifiers and Geometry Nodes;
- material/texture count and texture memory;
- animation/handlers;
- viewport mode;
- RAM/VRAM;
- time for the actual slow operation.

## Optimization order

1. Remove unnecessary work.
2. Preserve instancing/shared data.
3. Reduce evaluation scope.
4. Cache/bake stable expensive results.
5. Reduce geometry/texture detail where it is not visible.
6. Optimize Python loops and Blender API access only after scene structure is sane.

## Instancing

Repeated geometry should remain instances or linked data for as long as possible. Realizing instances or making meshes single-user multiplies memory and subsequent evaluation cost.

For Geometry Nodes, perform operations before `Realize Instances` when semantics allow it. Restrict expensive operations with selections rather than processing the whole geometry.

## Object count vs geometry count

A scene can be slow with modest polygon count if it contains enormous numbers of Blender objects, depsgraph nodes, materials, or modifiers. Do not assume polygon reduction alone fixes a high-object-count scene.

When a product only needs per-instance transform/metadata, keep that data compact rather than materializing a Blender object for every item.

## Python/add-on code

- batch data creation where APIs allow;
- avoid mode switching and operators in tight loops when direct data APIs work;
- avoid repeated depsgraph-triggering updates;
- cache lookups outside hot loops;
- do not redraw/update the UI for every item in a batch;
- profile before converting Python code to lower-level extensions.

## Verification

Benchmark a representative scene and retain the fixture. Report load time, target operation time, viewport responsiveness, and memory rather than "feels faster."

Read `references/scene-performance.md` for current Blender notes.
