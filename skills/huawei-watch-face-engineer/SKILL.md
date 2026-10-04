---
name: huawei-watch-face-engineer
description: Design, implement, package, and quality-review Huawei watch faces in Theme Studio Pro, including qualification submissions, 466x466 assets, widgets, expressions, animation, depth/DoF, AOD, data variables, preview/export, and reference-driven visual systems. Use when building Huawei Health watch faces, preparing designer qualification pieces, recreating or improving digital watch-face references, fixing flat/basic designs, adding depth/material/shader-like visual treatment, or validating HWT-ready deliverables.
---

# Huawei Watch Face Engineer

Treat a watch face as a compact visual system with strict platform constraints, not a dashboard squeezed into a circle.

## Workflow

1. Identify target device family, resolution, specification version, and Theme Studio Pro features available for that target.
2. Decompose the design:
   - hero time treatment;
   - secondary data;
   - decorative/material layers;
   - interaction or animation;
   - AOD strategy.
3. Build visual hierarchy at real watch size before adding detail.
4. Use code/vector/raster assets consistently. Do not mix unrelated surface treatments just to appear detailed.
5. Where supported, use depth, layer motion, expressions, sequence frames, or video as part of the design concept—not as decoration added afterward.
6. Keep text and indicators inside safe visual zones and test dynamic values that are wider/taller than the preview default.
7. Create AOD as a deliberate reduced composition rather than a dim screenshot.
8. Generate preview image/video, export, and test on device when hardware is available.
9. Run the visual-reference review before qualification handoff.

## Qualification-quality bar

A submission should demonstrate authorship and system thinking:

- coherent theme and type system;
- meaningful functional widgets;
- distinct compositions across the set;
- polished depth/material treatment where appropriate;
- no overlaps across realistic data states;
- preview assets that actually show the finished design.

Five variations of the same flat template are weaker than a smaller set of clearly differentiated design concepts.

## Platform drift

Expressions, supported properties, animation limits, and spec versions change. Read `references/theme-studio-pro.md` and recheck current Huawei documentation before relying on a version-specific capability.
