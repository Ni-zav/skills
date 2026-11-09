# Removal, replacement, sky, cleanup, and generative boundaries

## Choose the least destructive technique

| Task | Start with | Escalate when |
| --- | --- | --- |
| Small wire, spot, dust, distracting mark | healing/clone on clean layer, Remove tool (new layer), content-aware fill | texture repeats or geometry bends |
| Remove person/object | selection with sufficient surroundings, content-aware repair on duplicate | complex background cannot be reconstructed |
| Replace sky | sky mask plus source sky; preserve edge spill and horizon | no suitable source or background plate |
| Add new object/vegetation/product | place a real source on separate layer; isolate and integrate | authorized source is unavailable |
| Extend crop | canvas expansion and scene-consistent source pixels | only then user-approved generative expand |
| Restore photo | localized texture/color corrections and reversible tonality | irreversible damage requires explicit synthesis |

## Cleanup sequence

1. Work on a duplicate/empty retouch layer (sample underlying layers when using healing), not the locked plate.
2. Select the unwanted region, including a small **context margin**; avoid swallowing protected adjacent edges.
3. Repair the physical background first—lines, perspective, repeated textures, horizons and depth continuity.
4. Inspect the repaired area both isolated and within full composition. Look for clone repetition, texture mismatch, broken grid joints, doubled edges, invented architectural features and haze discontinuities.
5. Keep a named correction layer/mask so reviewers can see what changed.

## Generative steps are conditional

Before invoking Firefly/partner-model editing:
- confirm user permission to send pixels to a cloud service, whether AI alteration is allowed, and any credit or licensing constraint;
- protect identity-critical regions, structural geometry, text/logos and user-specified unchanged areas;
- use a limited selection/mask and specific preservation instructions; compare alternatives against actual source;
- check whether the edit creates fictitious context (especially interiors, products, real properties, people, documentary photography);
- verify completion and exported pixels; reject hallucinated seams even if the tool reports success.

Photoshop's current product/version/plan affects model picker, scriptability, costs and output size. Recheck Adobe's current docs and **actual UI** before quoting credits or choosing a partner model; do not hard-code a table as a permanent truth.

## Sky and atmosphere details

Match solar direction, cloud type, horizon luminance, atmospheric perspective and environmental color on objects. Sky replacement alone does not recolor a noon-lit foreground into plausible evening. Use selective local light changes and preserve the base image's structural silhouettes. Keep transparent/glassy surfaces plausible.

## UI versus automation

The Photoshop-MCP-IMT implementation offers a scripted `recipe remove_distraction` / `content_aware_fill` route, and separate generative operations when present. Refine-edge painting and some Remove-tool/Generative UI choices require explicit manual or computer-use handoffs. An MCP server's claimed category is not proof that a specific build can execute the step.
