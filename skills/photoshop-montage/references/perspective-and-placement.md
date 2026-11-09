# Placement, perspective, geometry, and depth

## Geometry checks before any warp

1. Identify camera eye height and horizon from repeated scene lines and human-scale anchors.
2. Locate the receiving surface: ground, wall, screen, floor, table, angled panel or curved object.
3. Compare visible sides of the source and target; a 2D warp cannot reveal missing faces of a 3D object.
4. Place foot/tyre/base **contact points** on the receiver; use relative scale and receding grid/tiles to size the subject.
5. Align major vanishing lines; then adjust crop, rotation, scale and transform.
6. Check whether source focal length, vertical convergence, tilt and distortion differ from the plate.

## Choose the transform

| Problem | Appropriate approach |
| --- | --- |
| Flat sign, artwork, billboard or screen | four-corner perspective / corner pin to receiver quadrilateral; retain corners and edges |
| Product packaging photographed at similar angle | place and scale, moderate perspective distortion; change source if missing face required |
| Human, animal or tree standing on a plane | match contact, silhouette and apparent size; **do not** bend anatomy with planar perspective warp |
| Long shadow across ground | separate shadow shape with perspective and penumbra changing with distance |
| Curved fabric or bottle wrap | controlled mesh/warp or displacement with real surface cues; often a UI operation |
| Camera/lens mismatch | better-matched source asset first; limited transform/crop second |

## Four-corner convention

For Photoshop-MCP-IMT's headless `distort_layer` operation, corners are document-pixel coordinates `tl`, `tr`, `br`, `bl`. Confirm target layer type and whether the operation requires rasterization. Do not claim Smart Object transformation is maintained if the route actually rasterizes it.

Planar warp acceptance:
- the source plane's left/right/top/bottom boundaries align with scene geometry;
- text is not mirrored or accidentally skewed past readability;
- plane is not flipped or self-intersecting;
- edges meet physical receiver boundaries;
- no stray pixels extend beyond the receiver.

## Camera- and depth-related realism

- Nearby objects show more detail/contrast and potentially shallower focus; distant elements usually require some atmospheric attenuation. Avoid fake blur on an otherwise deep-focus scene.
- Copy the base plate's softness and aberration **after** the transform; don't repeatedly resample the same pixel layer.
- Watch linear perspective in reflections: a mirror reflection follows the mirror plane/camera, not a simple vertical duplicate by default.
- For a 3D render plate, use pass/depth information when provided, but never invent camera or scale metadata.

## Failure stop

If subject scale, direction of view, or visible face is physically incompatible, request a better source or document the remaining visual compromise. Curves and shadow effects cannot correct a geometric contradiction.
