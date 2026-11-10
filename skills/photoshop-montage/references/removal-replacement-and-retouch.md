# Removal, replacement, sky, cleanup, and generative boundaries

**Before any removal, read** `scene-understanding-and-edit-contract.md`: identify the **specific instance or part**, verify the candidate mask overlay, and define read-only context versus editable footprint. “Remove the cable” must not become “remove the lamp the cable crosses.”

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
2. Build a deliberate target-only `CHANGE` selection, respecting `KEEP` and `PROTECT` exclusions. Keep nearby surrounding `CONTEXT` as **read-only reference**. If the chosen fill operation requires a small synthesis margin, explicitly include and inspect the **minimum** required footprint; do not use a whole-subject selection for a part removal.
3. Preview the selection overlay and check mask polarity/covered components **before** fill, delete or generation. Then repair physical background first—lines, perspective, repeated textures, horizons and depth continuity.
4. Inspect the repaired area both isolated and within full composition. Look for clone repetition, texture mismatch, broken grid joints, doubled edges, invented architectural features and haze discontinuities.
5. Compare before/after with a protected-area difference check. If an unrelated object, part or structural line changed, **revert**, narrow selection, and retry a smaller correction or hand off a manual mask. Keep a named correction layer/mask so reviewers can see what changed.

## Dangerous automation shortcuts

- Do not invoke `select_subject` to remove a small object or part; it may select the entire dominant subject. Use a region-specific path/mask or inspected object selection. No candidate overlay → no automatic destructive removal.
- Do not run `remove_background` on the final scene when the task is removing a distraction *within* the scene; it can hide the entire background.
- An inverted selection or an incorrectly created reveal/hide mask can make unrelated areas vanish. Inspect the mask thumbnail, overlay and output before saving.
- For several objects, remove and verify **one object at a time**; don't combine multiple uncertain targets into one enormous selection.
- Preserve adjacent reflections/shadows unless they clearly belong to the removed object and were explicitly included in the edit contract.

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
