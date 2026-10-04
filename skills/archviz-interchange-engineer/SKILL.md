---
name: archviz-interchange-engineer
description: Design, implement, and test 3D/CAD/BIM interchange pipelines for architecture visualization, especially SketchUp, Blender, IFC, DXF/DWG, Revit-derived data, glTF, and custom import/export bridges. Use when geometry imports as one object, layers disappear, faces are missing, units/transforms are wrong, materials or instances are lost, a round-trip exporter is planned, or the user needs to evaluate vendor SDK versus open-source format support.
---

# Archviz Interchange Engineer

Define fidelity before choosing a parser.

## First classify the promise

A pipeline may promise:

- **viewing** — enough geometry/material data to display;
- **editable import** — useful objects, hierarchy, metadata, and transforms;
- **round trip** — export back without unacceptable semantic/data loss;
- **semantic BIM** — preserve element identity, classes, properties, relationships, and units.

Do not call a mesh-only conversion "BIM round trip".

## Fidelity matrix

For every format, explicitly decide whether to preserve:

- units and coordinate basis;
- object/group/component hierarchy;
- instance reuse;
- layers/tags/classes;
- object names and stable identifiers;
- local/world transforms;
- faces, edges, curves, holes, normals;
- materials, texture paths, UVs;
- cameras/scenes;
- BIM properties and relationships;
- hidden/visibility state.

The test fixtures should assert the fields the product promises.

## Workflow

1. Inventory the current importer/exporter and sample files.
2. Identify the format's real data model; do not force every format into the same abstraction prematurely.
3. Choose SDK/library based on the fidelity promise, license, supported versions, thread constraints, and write support.
4. Normalize units/transforms at one explicit boundary.
5. Preserve instances where possible instead of duplicating large meshes.
6. Keep semantic metadata separate from render mesh data so tessellation does not destroy identity.
7. Build golden fixtures: nested transforms, multiple layers, shared instances, material variants, curves, empty groups, and deliberately unusual units.
8. Compare import results structurally, not only visually.
9. If round-trip is claimed, export and re-import the generated file and compare the promised invariants.

Read `references/format-notes.md` before selecting a library.
