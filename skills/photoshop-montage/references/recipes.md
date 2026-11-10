# Montage recipes: five production scenarios

These are **procedures**, not assertions that a tool has executed or that an image will pass automatically. For each scenario begin with a backed-up PSD, make a `scene-understanding-and-edit-contract.md` target/keep/protect map, use material-specific `local-color-coherence.md`, and end with `quality-gates.md`.

## 1. Insert a person or object into a photographed/rendered scene

1. Choose a source with matching camera height, lens feel, light and resolution; mark locked elements in the plate.
2. Rough-position by foot/contact point and scene anchors; check silhouette and scale.
3. Isolate subject, preserve original source, refine fringe and missing internal holes.
4. Place rear/intermediate/foreground occluders in correct z-order (e.g. rail in front of feet).
5. Build localized contact plus separate cast shadow following scene key and receiver.
6. Compare target insertion with nearby materials at the same depth and illumination; match relative exposure/temperature/contrast, shadow color, focus, edge spill and grain without forcing different materials to have the same average color.
7. Inspect face/hair/shoes/ground joint and any facade/furniture overlaps at 100%.

For trees/vegetation: validate internal sky holes, per-leaf translucency, shadow density, repeated silhouettes and depth-specific saturation. Never let foliage cutouts cover protected signage or geometry accidentally.

## 2. Replace a sign/screen/packaging on a perspective plane

1. Identify all four target plane corners in the image and the physical frame boundary.
2. Place the flat source as its own Smart Object where possible.
3. Use a four-corner perspective operation with verified `tl/tr/br/bl` pixel coordinates (the IMT `distort_layer` route when available); confirm rasterization trade-off.
4. Mask into the receiver without covering its frame/fasteners.
5. Preserve plausible substrate lighting, glare, texture, existing occluding objects, edge blur, and reflected highlights.
6. Review typography legibility, corner alignment, seam continuity and no mirrored content.

If the target is curved, don't pretend a planar homography solves it; use a supported warp/displacement workflow or manual handoff.

## 3. Put a product into a different environment

1. Preserve brand mark, form, product color and critical labeling as protected content.
2. Select source matching desired view; separate product matte from any old floor shadow.
3. Place and scale on the destination support plane; check weight and real contact.
4. Build contact/cast shadow, reflected/bounce light and environment-consistent highlights.
5. Sample and match local environment lighting on product highlights/shadows and the support surface; avoid matching intrinsic product color to table RGB. Match tonal range and sharpen/soften selectively. Optionally prepare a **duplicate pixel layer** for Harmonize in Photoshop UI, then compare against the controlled manual composite.
6. Export editable master plus e-commerce/social previews without silently altering identity.

## 4. Replace a sky and shift the scene toward a reference mood

1. Select sky with transparent/window/tree-edge refinements and preserve original plate.
2. Place new sky at reasonable horizon/cloud-scale perspective.
3. Match distant haze and horizon luminance; fix spill/reflection in glass and reflective materials.
4. Adjust foreground key/ambient contrast and warmth/coolness **locally**; a sunset sky above unchanged noon shadows is an obvious mismatch.
5. Preserve landscape/building shape and approved material/color intent. If the light cannot be matched with photo retouch alone, state the limitation instead of inventing geometry.
6. Inspect silhouette fringe, sky through openings, shadow continuity, reflective areas and final grade.

## 5. Remove distraction and reconstruct background

1. Duplicate or create a clean retouch layer.
2. Identify exact distraction instance **and subpart**, then mark read-only context/KEEP/PROTECT. Preview the target mask overlay and its polarity, with the *minimum repair footprint*; no generic Select Subject.
3. Use content-aware/healing for simple scenes; for planar grids, clone/pattern-align deliberate geometry instead of random fill.
4. Only escalate to restricted generative fill when authorized and source reconstruction fails.
5. Validate straight lines, vanishing, repeated textures, **same-material seam color gradient and illumination** across both sides, continuity behind objects and no phantom windows/doors/people.
6. Compare full-frame and protected-area before/after diff: if the distraction is gone **but adjacent parts vanish or change**, revert and narrow scope. Keep repair isolated for a before/after toggle.

## 6. Local wall/floor patch has a visible color seam

1. Identify the single surface being repaired; mark intact material to left/right (and across any illumination gradient) as **read-only reference**.
2. Compare seam strips and patch interior; determine if mismatch is geometry/texture, brightness gradient, white balance or compressed/noisy detail.
3. Fix geometry/texture continuity before color. Apply a **masked localized correction** informed by same-material intact ROIs rather than a whole-frame Match Color.
4. Inspect both sides, far and near perspectives, and the full photo. Keep neighboring furniture/people/signage protected.
5. Toggle local adjustment; reject if the seam still pops out or neighboring materials were tinted.

## Common handoff text

```text
Prepared: <PSD + named layer/mask>
Manual step needed: <specific Photoshop operation and exact region>
Do not alter: <protected plate content>
Return with: <working PSD or saved document state>
I will then verify: <mask edge/contact/lighting/color/output checks>
```

For bulk variants, preserve one verified layered master and create variants via copies/artboards; don't repeatedly destructively recompose the same only source.
