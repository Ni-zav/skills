---
name: photoshop-montage
description: Plan, execute, and critically inspect editable Adobe Photoshop photomontages and photo composites with layers, masks, perspective, occlusion, realistic light, shadows, color matching, and retouching. Use when adding or replacing people, objects, vegetation, skies, products, signs, scenery, or 3D-render elements in a photograph or render; when a composite looks pasted-on; or when an MCP agent must turn a visual brief into a verified layered PSD. Not for 3D modeling, CAD interchange, or generic image generation.
---

# Photoshop Montage

Make separate sources read as **one believable scene**, and leave a repairable Photoshop document. This is a Photoshop **editing** skill, not a scene-modeling or generative-image persona. The same checks apply to photography, product imagery, film stills, interiors, exteriors, render post-production, advertising, and mixed-media composites.

## Route the work

1. Read `references/composition-and-assets.md` to decide whether the sources can plausibly fit, what must stay unchanged, and how to order the image.
2. If making or changing a cutout, read `references/masking-and-occlusion.md`; if placing objects on planes or in depth, read `references/perspective-and-placement.md`.
3. For integration, read `references/lighting-shadows-reflections.md` and `references/color-atmosphere-and-finish.md`. For removals, generated regions, or repairs, read `references/removal-replacement-and-retouch.md`.
4. When connected to Photoshop via MCP, **always** read `references/mcp-photoshop-execution.md` before editing. Use `references/recipes.md` for task-shaped examples and `references/quality-gates.md` for the final inspection.

## Preflight and editing contract

- Establish source files/paths, which is the base image, output dimensions/crop, intended focal point, reference/look, required exports, and whether the PSD must remain editable. Derive missing noncritical choices from the visual brief; ask only for truly missing source assets or authorization.
- Identify **protected elements**: logos, product details, building geometry, faces, signage, dimensions, furniture layout, artwork, brand colors, or other factual content that must not drift. Do not quietly redraw or generatively replace them.
- Record uncertainties that affect realism: lens/camera height, horizon, vanishing points, apparent subject scale, light direction/time of day, contact surface, occluders, expected blur/grain, and whether insertion sources are licensed/usable.
- Check actual tool availability, document state, and permissions. **A skill cannot install Photoshop or conjure an MCP connection**. If Photoshop is unavailable, provide an executable layer plan and precise manual handoff; do not claim files were edited.

## Montage workflow — in this order

1. **Safeguard.** Duplicate or Save As a working PSD before modifying. Keep the original, source crops, and any current user work untouched. Name and group all new elements; prefer Smart Objects, masks, and clipped adjustments. Make pixel copies only where a feature needs them.
2. **Block composition.** Place all major subjects at rough sizes and depth order before fine cutouts. Judge silhouette, scale and visual hierarchy at thumbnail size; reject implausible camera/light matches early.
3. **Fit geometry.** Align horizon, vanishing directions, ground contacts and plane perspective; check proportions before warping. A four-corner transform is for a **plane**, not the shape of a person/tree.
4. **Construct mattes and occlusion.** Build masks, not erasures. Split foreground occluders onto their own layers as needed. Refine soft, hard, translucent and motion-blurred edges differently; inspect on light and dark backgrounds.
5. **Integrate lighting.** Match key direction, softness, exposure, white balance, shadow length/direction, contact darkening and bounce. Add scene-appropriate reflections only when the material and camera warrant them. A generic drop shadow is **not** an adequate ground shadow.
6. **Unify image formation.** Match tonal range, saturation, local contrast, haze, lens softness, noise/grain, sharpening and depth of field **per depth plane**. Apply the final global grade after local corrections.
7. **Inspect and iterate.** Export a preview and examine at thumbnail, fit-to-screen, 100%, and critical crops. Check `references/quality-gates.md`; fix physical/structural flaws before polishing. Do not accept “tool call succeeded” as visual quality evidence.
8. **Deliver.** Save a layered PSD and a separately exported review image; verify readable/exported files, layer names, dimensions, and visible result. State any manual handoff, credits spent, unresolved visual risks, and features not verified live.

## Working layer architecture

Use intelligible names rather than anonymous `Layer 42 copy`. Adapt this stack to the actual document:

- `00_BASE_LOCKED` — untouched base image and original references, kept recoverable.
- `10_PLACEMENT` — embedded/linked Smart Objects for inserted assets; named by subject and source.
- `20_MATTES_OCCLUSION` — subject masks and duplicated foreground occluder pieces.
- `30_CONTACT_LIGHT` — separate cast/contact shadows, highlights, bounce and reflections with their own masks.
- `40_LOCAL_MATCH` — clipped Curves, color balance, exposure, saturation, selective depth effects.
- `50_GLOBAL_FINISH` — coherent final grade, careful grain/sharpen, presentation-only finishing.

A clean PSD is not defined by a specific stack order: verify actual z-order and clipping relationships. Keep shadows under their casters and occluders above what they hide.

## Hard rules

- **No unrequested replacement.** Removing an object does not authorize changing adjacent geometry, faces, product identity or architectural details.
- **No blanket AI pass.** Prefer sourced pixels, selective masked corrections and local Photoshop tools; use generative fills for constrained gaps only, preserving protected regions. Obtain approval before a cloud/credit-spending step or uploading sensitive imagery.
- **No automatic rasterization of the master.** Rasterize a duplicate when required (e.g. Harmonize operates on pixel layers), retaining the editable source.
- **No invented tool support.** Inspect the live Photoshop MCP catalog and operation schema before calls; a UI-only step gets an explicit handoff, not a fabricated API.
- **No quality claims without pixels.** If no frame can be examined, report only structural/tool verification.
- **No model changes.** Correct photo/render post-production only; route mesh geometry, asset interchange, materials and camera rendering to a 3D skill.

## Done means

The composite passes the **geometry → silhouette/matte → occlusion → lighting/contact → tone/texture → final delivery** gates; the PSD remains reparable; a reviewer can identify original, insertions, corrections and exports; and limitations are explicit. If any P0 failure in `references/quality-gates.md` remains, do not call the montage finished.
