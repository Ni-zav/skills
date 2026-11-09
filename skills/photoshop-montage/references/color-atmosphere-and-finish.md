# Color matching, atmosphere, texture, and final finish

## Color pipeline: local before global

1. Confirm base profile and target output (e.g. RGB/sRGB preview; print conversion separately). **Photoshop Match Color works in RGB mode**; do not silently change the entire deliverable's profile just to use it.
2. Normalize exposure and black/white endpoints of insertion relative to its depth plane, not to the full plate histogram.
3. Match neutral surfaces and color temperature. Compare highlight, midtone and shadow casts separately.
4. Adjust saturation and hue **locally**; a global LUT does not solve a subject whose greens or skin are wrong.
5. Match contrast/clarity and local dynamic range. Watch bright whites that exceed plate highlights or blacks darker than any scene shadow.
6. Set depth cues: distant haze/blueing/desaturation only to the extent supported by weather and scale.
7. Match image formation: source grain/noise size, chromatic fringing, optical softness, sharpening, compression and depth of field. Large pasted subjects may need less blur than distant small ones.
8. Apply restrained common finishing grade last. Re-evaluate critical product colors, skin, white surfaces, building materials and signage after the global grade.

## Photoshop techniques

- Clipped Curves, Exposure, Color Balance, Hue/Saturation, selective masks and gradient maps are preferable to irreversible direct pixel changes.
- Match Color can help compare two images, layers or selections; treat it as a starting point, not an automatic final grade. It is RGB-only and not necessarily exposed as a direct MCP tool.
- Adobe Harmonize can aid in matching subject color/light/shadows, but check whether the workflow requires the user to select a UI variation. It does not replace local edge and physical checks.
- A reference look is **color/contrast intent**, not authorization to regenerate the underlying subject.
- For large renders with photo insertions, keep color-grade changes consistent across passes and avoid flattening physically important local lighting.

## Image-quality checks

- 25%/fit-to-screen: cohesive dominant light, mood and depth.
- 100%: source and pasted material have similar detail/noise/sharpness at the same focal plane.
- 200% only for diagnosing halos, jaggies and subtle mask seams; do not judge overall look at that zoom.
- Small thumbnail: object still reads at correct scale and contrast, no pasted-on cutout effect.

## Delivery

Export previews at an intentional size and color profile. Keep the layered master at working resolution and export the review image separately. Inspect both on the target medium when possible; Adobe's `prepare_for_web` recipe converts to sRGB while other generic export paths may not, so validate rather than assuming all exports match.
