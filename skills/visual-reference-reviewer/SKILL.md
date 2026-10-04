---
name: visual-reference-reviewer
description: Review and direct visual implementation against one or more reference images or an established design language. Use when the user says a result is flat, generic, soulless, not close to references, visually inconsistent, overlapping, lacking depth/material detail, or asks for a makeover, pixel-level critique, design QA, or implementation guidance that must preserve a specific visual concept rather than merely satisfy a feature checklist.
---

# Visual Reference Reviewer

Judge pixels and visual relationships, not task completion.

## Review order

1. **Composition and silhouette** — major masses, balance, focal area, empty space, cropping, and overall density.
2. **Hierarchy** — what is read first, second, and third at the real display size.
3. **Depth and material** — layering, occlusion, normals, highlights, shadows, bevels, texture scale, atmospheric separation, and perceived thickness.
4. **Typography** — scale, weight, tracking, alignment, baseline, contrast, and relationship to the theme.
5. **Color system** — dominant/secondary/accent roles, local contrast, temperature, and whether accents are intentional.
6. **Functional completeness** — indicators, states, labels, data widgets, hit areas, and required platform information.
7. **Microdetail** — borders, separators, grain, small lighting cues, icon consistency, and edge quality.

Do not start with microdetail while the composition is still wrong.

## Reference decomposition

Before changing code, write a compact reference model:

- visual thesis in one sentence;
- 3–5 dominant shapes or layers;
- focal point and reading path;
- depth strategy;
- material vocabulary;
- type system;
- color roles;
- repeated motif;
- information density.

The goal is not to copy isolated decorations. Reproduce the system that makes the reference coherent.

## Severity

- **P0 concept mismatch**: wrong composition, visual language, hierarchy, or depth model.
- **P1 quality blocker**: overlap, unreadable text, inconsistent material, weak contrast, missing indicator/state.
- **P2 polish**: spacing, texture scale, tiny alignment, secondary highlight.

Fix P0 before P1; fix P1 before P2.

## Implementation direction

Translate critique into measurable code changes: layer order, z/depth value, asset scale, padding, text box, normal intensity, roughness/specular response, shadow radius, geometry thickness, or animation amplitude. Avoid feedback such as "make it nicer" without an implementation consequence.

If code-native/vector/shader assets already define the design, improve those instead of replacing them with unrelated generated imagery.

## Verification

- render at the final target resolution;
- inspect at 100% scale and thumbnail scale;
- compare reference and result side by side;
- use overlays/difference views when geometry should align;
- check all dynamic states, not only the hero screenshot;
- explicitly list remaining P0/P1 issues.

A result does not pass because it is technically complete. It passes when the dominant visual system survives comparison to the references.
