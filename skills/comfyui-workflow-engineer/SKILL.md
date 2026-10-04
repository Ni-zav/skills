---
name: comfyui-workflow-engineer
description: Build, repair, automate, version, and package reproducible ComfyUI workflows and custom nodes. Use when workflows have missing custom nodes, model/checkpoint iteration, image-edit/reference pipelines, API execution, custom Python nodes, metadata/reproducibility problems, VRAM constraints, or when a visual node graph needs to become a maintainable automated generation pipeline.
---

# ComfyUI Workflow Engineer

Treat a workflow as executable provenance, not just a screenshot of connected nodes.

## Workflow inventory

Capture:

- ComfyUI version/commit or distribution;
- workflow JSON;
- model/checkpoint/VAE/LoRA names and preferably hashes;
- custom-node repositories and versions/commits;
- input assets;
- seeds and sampling settings;
- output dimensions;
- external API dependencies;
- GPU/VRAM environment.

## Repair workflow

1. Load the workflow and enumerate missing/failed node types.
2. Determine whether each node belongs to core, a custom node, frontend-only extension, or API service.
3. Inspect server startup logs before assuming a missing node is an absent package; imports may be failing.
4. Restore the minimum compatible dependencies.
5. Replace abandoned/custom nodes with core equivalents when the semantic behavior is simple enough.
6. Run one minimal path before restoring the whole graph.
7. Save a known-working workflow and dependency manifest.

## Reproducibility

Do not claim a seed alone reproduces an image. Model revision, node implementation, sampler/scheduler, input images, dimensions, and sometimes runtime/library versions also affect results.

Preserve workflow JSON with output assets when possible.

## API automation

ComfyUI uses a client/server model and can execute workflows through its API. Keep UI-only features out of automation-critical paths. A custom node that requires direct browser/server UI interaction may not work through API execution.

Design API workflows with explicit input/output nodes and stable node identifiers/interfaces.

## VRAM and throughput

Measure peak VRAM and end-to-end time with the real model chain. Avoid loading redundant models simultaneously where lifecycle/unloading can reduce memory pressure.

For batch/checkpoint iteration, separate workflow structure from the variable model/prompt/seed matrix so experiments are reproducible.

## Custom nodes

Keep computation in server-side Python unless UI behavior is truly required. Make node input/output contracts narrow and deterministic. Avoid hiding global state that makes graph results depend on execution history.

Read `references/comfyui-notes.md` when building custom/API nodes.
