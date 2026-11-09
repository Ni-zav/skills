# Lighting, contact, shadows, reflections

The object must be lit by the scene it appears in. A perfectly masked object with the wrong light remains an obvious paste.

## Read the plate

- Is the light hard sun, clouded daylight, studio softbox, practical interior lighting, neon, moonlight, or a mix?
- Locate key direction from multiple reliable **cast shadows**, not one ambiguous highlight.
- Check shadow length, edge softness, temperature, ambient fill, reflected/bounce light, atmospheric contrast and specular direction.
- Compare subject highlights and terminator with the surface receiving its shadow.

## Separate light components

1. **Subject local match:** exposure, local contrast, directional dodge/burn, color cast on highlights versus shadows. Use clipping masks and reversible adjustment layers.
2. **Contact shadow:** tight and darkest where feet, wheels, leaves, product base or furniture meet the receiver; generally softens/spreads away. It is not a uniform oval under everything.
3. **Cast shadow:** coherent direction and projected form on **actual receiving surfaces**. Follow the ground plane, walls, steps or corners as needed. Longer distance usually means softer/less opaque penumbra, adjusted to source light size.
4. **Occlusion/AO:** use sparingly in crevices/intersections; avoid outlining the whole subject with black.
5. **Bounce and light spill:** tint nearby surfaces subtly where reflective or colored objects share illumination; preserve scene's physical cues.
6. **Reflection:** depends on material roughness, angle, scene surroundings and surface curvature. It is optional and should not be pasted in just to look “premium.”

## Practical Photoshop construction

- Place each shadow below its caster but over its receiving plate, mask it to the receiver, use a plausible opacity/blend mode, and refine with blur/gradient as required.
- For contact shadows, paint or construct a dark localized shape on a separate layer, use gentle masked falloff, then compare to existing contacts in the plate.
- For cast shadows, use a masked darkened silhouette (or an actual shadow pass), transform it along the ground/wall, and vary opacity/softness with distance. Preserve underlying material texture.
- For glazing, water, polished metal or wet surfaces, separate reflected highlights and transmitted pixels; **reflections should not cover protected design elements inaccurately**.
- If a supplied render includes aligned shadow, reflection, AO or light passes, preserve and adjust them rather than drawing substitute physical effects blindly.

## Harmonize is an aid, not a verdict

Photoshop Harmonize can produce an image-layer variation matching subject lighting and tone, but it may still need bespoke shadow geometry, material correction, occlusion and art-direction review. Adobe documents a **pixel-layer** requirement: duplicate/rasterize only the working insertion copy if necessary, keep the original Smart Object. Harmonize may be UI-only in the selected MCP setup and can consume credits; check live availability and approval.

## Check

At thumbnail scale: does the object belong to the scene? At 100%: inspect contact edges, separate light sources and shadow receivers. Compare with and without each contact/cast layer to catch over-darkening.
