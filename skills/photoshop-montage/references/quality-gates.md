# Photomontage acceptance gates

“Looks good” is not evidence. Inspect **before/after**, individual inserts, composite at thumbnail/fit, **100%**, and critical crops. If tools are unavailable, mark gates `not verified` rather than assuming pass.

| Gate | Passing evidence | Common reject |
| --- | --- | --- |
| Target recognition | exact intended object instance and subpart confirmed on full image plus crop | wrong subject or whole part removed |
| Authorized footprint | visible CHANGE mask excludes KEEP/PROTECT; only agreed EFFECT spill allowed | overwide selection, inverted mask, vanished neighbors |
| Adjacent color | matched material/light/depth cues and seam gradient without tint spill | abrupt wall patch, mismatched inserted object cast |
| Concept/composition | focal subject, crop, depth order and visual thesis agree with brief | wrong viewpoint, clutter, broken hierarchy |
| Geometry | horizon, scale, perspective and contact agree with plate | giant people, floating objects, impossible plane |
| Matte | clean solid/hair/glass edges on both dark and light backgrounds | halos, sawtooth, lost holes, opaque glass |
| Occlusion | all foreground/back intersections physically consistent | object on top of a railing it should be behind |
| Lighting | key direction/color, exposure, shadow softness agree | subject lit from opposite side |
| Contact/cast | caster touches receiver and cast shadow follows surface | floating feet, generic dark oval, duplicated shadow |
| Color/depth | local WB, contrast, haze, blur and saturation match depth plane | pasted-on saturation/overly sharp distance |
| Texture/focus | inserted grain, resolution and optical characteristics plausible | noisy cutout in clean render, oversharpened border |
| Protected detail | no unauthorized modifications to text, identity, building/product geometry | changed sign, distorted face, invented windows |
| Editability | base recoverable, named working layers/masks, no hidden destructive flatten | exported JPEG only, missing PSD, untraceable source |
| Export | intended crop, color profile, alpha, size and files checked | color shift, wrong dimensions, missing deliverable |

## Severity / stop policy

- **P0 — cannot approve:** incorrect target/part; unauthorized deletion or changes outside edit contract; inverted/overwide mask; geometry or perspective contradiction; wrong object identity/critical detail; obvious cutout; broken foreground occlusion; missing PSD when editable handoff requested; destructive overwrite of unique source.
- **P1 — must repair for professional finish:** boundary color/brightness gradient discontinuity, subject-to-adjacent lighting mismatch, protected-region color spill, wrong contact/cast shadow, edge halo or matte loss visible at intended size, wrong local color/blur, glare/reflection mismatch, noticeable texture repetition.
- **P2 — optional polish:** small microcontrast inconsistency, fine texture/grain, minor secondary shadow/reflection tuning, unobtrusive compositional adjustments.

Fix P0 before P1. After each P0/P1 repair, compare again; mask repairs can expose lighting differences and color corrections can reveal a halo.

## Evidence ladder

1. **Tool state** — active document, dimensions, layer names/order, saved-copy existence.
2. **Target and mask preview** — full frame plus enlarged target-part/neighbor crop and visible selection overlay before editing. Boundaries, components and selection polarity must be checked.
3. **Preview pixels** — at minimum: full frame, subject/ground-contact crop and edge crop; before/after toggle with consistent profile/crop.
4. **Protected-area diff** — difference overlay/heatmap or controlled before/after comparison to confirm no unexpected change outside authorized CHANGE/EFFECT, including related shadows and protected lines.
5. **Local color check** — inspect comparable nearby materials, seam gradient and shadow/highlight cast at several contact locations, not only global histogram.
6. **View modes** — on black and white for the mask; on the actual base for light/occlusion.
7. **Deliverable** — re-open exported preview/PSD when supported, confirm expected format/profile/dimensions.
8. **Human review** — for likeness/identity-critical work, high-value product images, legal/regulated portrayals or physically ambiguous composites.

## Output checklist

Provide:
- link/path to layered PSD and final rendered preview **only if they were actually created and verified**;
- summary of inserted/replaced/removed elements and source assets used;
- protected elements maintained and any material compromises;
- completed gates including scoped target, local adjacency and protected-area difference, open P0/P1, tasks handed to UI/human;
- credit/cloud actions performed (or explicitly not performed).

## Prompt self-test

Ask: “If I hide all overlays, can I still reconstruct the original? If I hide the subject, are there phantom shadows? If I turn off the global grade, does the subject still match the plate? If I inspect 100% crops, does a seam appear?” A composite should be editable and coherent at each layer of inspection.
