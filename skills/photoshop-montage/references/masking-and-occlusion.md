# Masks, difficult edges, and occlusion

## Choose a matte by material, not by habit

| Subject boundary | First pass | Refine / failure mode |
| --- | --- | --- |
| Solid rigid object | Object/subject selection, pen path when needed | hard edges, anti-aliasing, no visible original background fringe |
| Hair, fur, leaves | Select and Mask / object-aware refine, hand-painted matte | preserve strands and holes; avoid a cardboard outline |
| Fine rails, spokes, wires | multiple targeted selections or paths | avoid disappearing thin structures and false holes |
| Glass, netting, veils | partial-opacity mask and separate color/reflection adjustment | not binary; retain transmitted light, tint, plausible reflections |
| Fog, smoke, motion | soft alpha and depth-shaped transition | do not over-feather every edge |
| Shadows | independent semi-transparent shadow layer | do not include the original cutout's baked background shadow |
| Glowing/emissive area | isolated light spill plus source | avoid opaque cutouts and uniform neon halos |

## Non-destructive matte sequence

1. Preserve the untouched source or Smart Object; isolate a working copy where required.
2. Use Select Subject, Object Selection, a path or a relevant channel as the **first mask**, not the final answer.
3. Create a layer mask; inspect it alone and against a **light**, **dark**, and **scene-colored** backing.
4. Fix missing interiors, ragged edges, halo contamination, inappropriate feather and color spill. Refine Hair/Select and Mask is a UI handoff when unavailable through MCP.
5. If the subject crosses depth planes, **separate foreground occluders** (e.g., railing in front of a person, leaves crossing furniture) from the base image using their own masks/layers.
6. Confirm the pixel alpha is the one actually used by the visible layer; don't assume a bounding-box readback proves a high-quality mask.

## Edges: what to inspect

- Bright fringe around dark subjects; green/blue sky spill on hair, vegetation or transparent material.
- Hard cutouts on soft-focus subjects; soft-edged cutouts for sharp rigid geometry.
- Lost internal holes (tree branches, furniture legs, window openings).
- False tangencies: an edge of an inserted person touching a doorframe or railing with no convincing depth order.
- Background color/pixels showing through at 100%.
- Repeated foliage contours or cut-and-paste shape silhouettes.

**Feather is not a universal fix.** Use local radius/edge refinement appropriate to source sharpness and final viewing distance. Large uniform feathers often create a glowing outline.

## Occlusion logic

Write the depth relation as an explicit stack: `far background < inserted object < near railing`. A real subject may require multiple masked components when it crosses foreground/background objects. Avoid global layer order fixes that break other intersections. For vegetation and crowds, alternate occluder layers only when the visual depth calls for it.

## MCP vs manual handoff

- Where supported, Photoshop-MCP-IMT exposes `select_subject`, `get_selection_bounds`, `create_layer_mask`, `apply_gradient_mask`, and `recipe remove_background`. Verify exact schemas with `ps_catalog`.
- Complex edge painting, Refine Hair, Select and Mask, and fine transparency usually require the UI; tell the operator the layer/mask to edit, the viewing mode and the specific region.
- Some MCP layer listings omit mask internals. Verify using real preview frames and toggling relevant layers, not just `ps_get_layers`.

Sources and capability caveats: `provenance.md` and `mcp-photoshop-execution.md`.
