# Local color coherence: seam, adjacent materials, lighting, and blend decisions

The montage must **share environmental illumination** with its surroundings. That does *not* mean every object must match its neighbor's RGB average. A green plant next to a cream wall should remain green, but its shade, reflected warmth, contrast, focus and contact with the wall must agree with the scene.

## Identify the kind of seam first

| Seam type | Goal | Appropriate reference |
| --- | --- | --- |
| **Continuous surface** (patched wall/road/sky) | luminance, chroma, gradient and texture must continue through boundary | intact same surface immediately on both sides and farther along gradient |
| **Object against background** (person/tree/product) | distinct material color, but coherent light/shadow and edge contamination | same-depth, similarly illuminated scene objects; shadow/highlight split on neighboring surfaces |
| **Transparent/reflective** (glass, wet ground, water) | correct transmission/reflection and mixed color, not opaque match | geometry + adjacent reflected and transmitted scene |
| **Partially occluded** (subject behind rail/foliage) | correct depth and matte edge with preserved foreground | unedited rail/foliage texture and nearby occlusion |
| **Composite from differing cameras/grades** | global tone curve and white balance coherent, local contrasts retained | same semantic materials, neutral patches and expected depth plane |

## Six-step local matching workflow

1. **Sample within the correct depth/material plane.** Mark small reference ROIs on the original plate: highlight, midtone, shadow, and neighboring intact segments. Avoid sampling across mixed materials, occlusion, blown highlights or clip shadows. Note where reference is unknown.
2. **Inspect the boundary spatially.** Compare narrow inside/outside strips at multiple locations—not only whole-image histograms. Look for discontinuous lightness, hue cast, texture, blur, and brightness *direction*. A wall may naturally darken left→right; matching both sides to one mean flattens it.
3. **Match physical lighting first.** Decide ambient vs direct illumination, key direction, shadow density/softness and color of bounce. Then correct exposure/white point and highlight/midtone/shadow color locally with clipped and spatially masked adjustments.
4. **For continuous surfaces, match boundary plus gradient.** Use same-surface samples on each side and follow existing perspective/texture. Reconstruct structure first; tune luminance and chroma so the repair flows across the edge. Clone/patch may be preferable to color grading a generative fill with invented joints.
5. **For distinct subjects, preserve identity while unifying scene response.** Keep intrinsic skin, paint, leaf or brand colors. Match relative highlight/shadow warmth, black level, saturation at depth, local contrast and texture/noise. Add contact and bounce where surfaces meet; mask any color spill to the appropriate region.
6. **Verify at seam and at normal viewing size.** Inspect tight crops at several seam locations, light/dark matte checks, full-frame fit and 100%. Toggle each adjustment to ensure the change improved integration without shifting unrelated content.

## Photoshop color paths

- **Clipped Curves / Color Balance / Hue-Saturation / masked gradients**: preferred when the subject and adjacent surface need different correction amounts or directions.
- **Match Color (RGB only)**: Photoshop supports source and target layer/selection statistics, Luminance, Color Intensity, Fade and Neutralize. Use a *representative same-material selection*, not “Merged whole image” by default. The menu `Image > Adjustments > Match Color` edits a pixel target: duplicate where needed and keep original. It is an aid, not boundary-aware edge repair.
- **Harmonize**: useful for a subject's overall light/color/shadow when available and authorized; Adobe documents a pixel-layer requirement. Evaluate against a manually controlled version, and do not assume Harmonize preserves product identity or perfects foreground occlusion.
- **Blend If, blend modes, masked dodge/burn**: useful for constrained highlights/shadows, but blindly increasing feather/opacity can create mud and halos.
- **Global LUT/grade**: last. A uniform grade cannot repair local adjacent mismatch when the underlying patch/subject has different light.

## Diagnostic decision table

| Symptom | Likely cause | Next action |
| --- | --- | --- |
| Clear border on wall patch | opposite edge gradients / white balance mismatch | sample wall on both sides; masked curves/color + structure repair |
| Yellow room light, blue inserted chair | wrong ambient cast / highlights | local temperature and shadow/highlight correction, preserve chair material |
| Green rim around tree against sunset sky | source spill / poor matte | decontaminate edge pixels and refine mask; don't warm entire tree first |
| Person appears too saturated/sharp in hazy distance | wrong depth/focus/image formation | selective desaturation, contrast, haze, blur/grain matching |
| Object is correct color but floats | absent contact shadow / light bounce | build bounded shadow and nearby reflected light before color grading |
| Product loses brand color after “Match Color” | overaggressive whole-layer statistics | revert; use lower-strength clipped/selected adjustment with protected label/colors |
| Blur or tint leaks onto adjacent protected background | mask extends outside target | tighten mask, verify full feather reach, compare protected-area difference |

## Measuring vs perceiving

If image-analysis libraries or Photoshop sampling tools are available, compare **matched color-managed ROIs** using lightness/chroma and robust local statistics (e.g. medians), plus texture/gradient continuity. A color distance such as ΔE can be useful for **the same physical material under comparable light**, not for a person against a wall or a naturally shadowed gradient. Do not invent numerical ΔE/PSNR/SSIM results or claim objective quality from a single statistic.

Visual review remains necessary because physically different surfaces can legitimately be different colors. No same-material comparison available? Infer light direction/ambient cast from other scene objects, label confidence accordingly, and keep the adjustment editable.
