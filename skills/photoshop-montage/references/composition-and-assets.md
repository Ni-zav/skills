# Composition planning and asset fit

## Before editing pixels

Create a compact montage brief:

| Field | Record |
| --- | --- |
| Main plate | base file, pixel size, color mode, profile, crop, resolution |
| Insertions | source file and subject, pixel quality, transparency, permissions |
| Locked detail | people/identity, geometry, typography/signage, textures or product features that must survive |
| Composition | target viewing format, focal point, attention path, negative space and scale hierarchy |
| Camera | eye level, horizon, vanishing directions, lens feel, tilt and depth of field |
| Environment | key-light direction, shadow softness, weather, time-of-day and reflections |
| Deliverables | PSD, web/print profile, aspect ratios, preview crops and exact output path |

If source images conflict in camera angle, lighting or focus, state whether that can be repaired without visibly distorting the subject. Reject an implausible insertion rather than relying on color grading to camouflage it.

## Design the picture, not just the insertion

1. Identify primary subject, supporting subjects and the empty space needed around them.
2. Rough in their **bounding silhouettes** and compare at thumbnail size.
3. Establish depth planes: backplate, behind-subject scenery, inserted subject, partially covering foreground, finishing overlays.
4. Match relative scale using scene anchors: doors, paving modules, furniture, human height, wheel diameter, known product measurements. Treat unknown measurements as estimates, not facts.
5. Choose a compositional crop early, but keep an untouched full-size plate for revisions.
6. Mark areas that need bespoke matte work: glass, hair, foliage, thin wires, motion blur and shadow receivers.

## Render/photo mixed-source special cases

These are common in architecture visualization but not exclusive to it:

- A 3D render can be a **plate**, not a 3D model to edit. Its geometry/camera are protected unless the user requests otherwise.
- If passes are supplied (object/material IDs, Z/depth, normals, ambient occlusion, shadow, emission, reflection), use them to create accurate selections and controllable effects. A pass only helps when aligned to the beauty plate with the same camera, crop, frame and resolution.
- Use depth to tune haze and contrast subtly; never assume a Z pass is linear or normalized without inspecting its encoding.
- If the render lacks passes, use selection/masks and photographed ground-plane cues; do not fabricate a “depth pass” and claim precision.
- For adding people/trees/cars to a render, align horizon, contact point, sun and blur before detailed masking. Preserve facade lines, windows, materials, furniture and other approved design intent.
- Correct image defects (blown sky, local reflection, empty foreground, unintegrated entourage) as image layers; don't silently solve 3D-scene problems by repainting architectural geometry.

## Asset source hierarchy

Prefer a compatible user-provided source with usable detail and lighting. Then choose an authorized photographed asset or a user-approved generated element. Exclude low-resolution/overcompressed sources if edge fidelity cannot survive the target crop. If matching a product, a person or a real building, don't invent identifying details.

## Useful checkpoints

Save a quick **layout preview** before deep cutting. If the composition, camera or scale is wrong, correct it now; perfect hair masking cannot rescue a wrong silhouette or impossible perspective.
