---
name: photoshop-montage
description: Plan and execute editable Adobe Photoshop photomontages using visual scene recognition, object/part-level edit boundaries, preservation masks, adjacent-region color coherence, precise removals, perspective, occlusion and shadows. Use when inserting, removing, replacing or blending people, objects, vegetation, skies, signs, products or 3D-render elements; when a composite looks pasted-on or colors clash at a seam; when an agent removes too much; or when Photoshop MCP edits need verified layered PSDs. Not for CAD/3D modeling or standalone text-to-image generation.
---

# Photoshop Montage

Treat montage as **scene understanding followed by constrained image editing**, not as a sequence of Photoshop buttons. Preserve the source; change only the intended object, part, or region. A convincing composite must make adjacent pixels belong to the same *lighting/environment*, not paint dissimilar materials the same RGB color.

## Reference routing

1. **Every edit, first**: read `references/scene-understanding-and-edit-contract.md` to inspect the actual image, identify the target at object/part level, mark keep/change/protect regions, and decide whether the edit is safe. Read `references/composition-and-assets.md` for asset/camera fit.
2. **Every boundary and composite**: read `references/masking-and-occlusion.md` and `references/local-color-coherence.md`. For deeper color/texture finish, read `references/color-atmosphere-and-finish.md`.
3. **Per task**: perspective → `references/perspective-and-placement.md`; shadows/reflections → `references/lighting-shadows-reflections.md`; removal/replacement → `references/removal-replacement-and-retouch.md`; worked examples → `references/recipes.md`.
4. **When controlling Photoshop**: read `references/mcp-photoshop-execution.md`, discover live capabilities, and verify each risky selection/action before committing. Always finish with `references/quality-gates.md`.

## Mandatory observe → decide → act → verify loop

1. **Observe before selecting.** Inspect full frame and enlarged target/neighbor crops, existing layer stack, and available input photos. Write an evidence-separated scene map: target *instance and part*, adjacent objects/materials, depth/occlusion, continuity lines, local light and protected details. A document name, text prompt, or bounding box is **not** proof of visual understanding.
2. **Define the change contract.** Specify `INSERT | REMOVE | REPLACE | RETOUCH | MATCH_COLOR`, the exact target, `CHANGE` mask/ROI, `KEEP` and `PROTECT` masks, optional `CONTEXT` sampling halo, and allowed secondary effects (contact shadow, reflection, local ambient spill). `CONTEXT` is **read-only** unless separately approved. If the requested part cannot be distinguished safely, do not use broad automatic removal; isolate a candidate and request a targeted selection/annotation.
3. **Protect and preview.** Duplicate/Save As an editable master; keep the original plate. Preview the selection/mask **over the source** at fit and 100% before filling, deleting, applying masks, or generating. Check connected components and coverage: the selected region must be the intended object/part, not the entire subject, backdrop, or its neighbors. No preview or uncertain target → **no destructive edit**.
4. **Make the smallest reversible change.** Operate on a named copy/mask, only within approved `CHANGE`. Use exact object-instance semantics, not `Select Subject` by default. Preserve original pixels and separate occlusion, inserted subject, shadow and localized adjustments.
5. **Reconcile the seam.** For a new insertion or repaired region, compare matched nearby materials/planes and local light, color cast, brightness gradient, shadow response, texture/noise and blur using `references/local-color-coherence.md`. Avoid matching an object to a surrounding *different material* by raw average color.
6. **Verify two things separately.** (a) Intended effect occurred; (b) no unauthorized changes occurred. Inspect the preview, target/adjacent crops, and **before/after difference outside the approved change footprint**. Stop, undo/revert and narrow the selection if unrelated features disappear or color corrections spill onto protected content.
7. **Iterate with diagnosis.** Classify failure (`wrong target`, `wrong mask polarity`, `overwide selection`, `halo`, `geometry mismatch`, `local-color seam`, `wrong light`, `texture mismatch`) and fix **that cause**, not blindly rerun the same operation. Repeated failure → stop and report a concrete handoff.
8. **Deliver only verified work.** Save layered PSD and a separate preview, confirm output and original are recoverable, and disclose any unverified visual, masked region, unavailable tool, or credit/cloud operation.

## Minimal edit-contract example

```text
Operation: REMOVE
Target: only the dangling cable crossing the top-left wall
CHANGE: cable strokes + strictly necessary reconstruction footprint
KEEP: ceiling lamp, nearby pipes and wall texture outside the cable
PROTECT: wall joint lines, sign text, people, building silhouette
CONTEXT: intact wall on both sides for reconstruction and color sampling (read-only)
Expected: cable absent; unchanged lamp/pipes/sign; seamless wall tone/texture
Abort if: selection includes lamp/pipe, exceeds local target, or preview loses structural lines
```

Treat this as a decision record, not a Photoshop API schema or segmentation guarantee.

## Hard safety rules

- **Selection is not intent.** `select_subject` may select a dominant person/building or the whole foreground. Never infer that all selected pixels should be removed because the user said “remove this part.” For targeted removals, use an explicitly checked part mask or precise selection; check polarity before `create_layer_mask`.
- **No whole-frame generative replacement** for a local change; no automatic `remove_background` on the base plate to fix a small detail. Do not let prompt wording override the approved region.
- **Different materials remain different colors.** Match illumination/cast, perceptual brightness relationships and spatial gradients at the seam; don't force skin/foliage/product to match the wall's RGB values.
- **A mask bounds box is insufficient.** Confirm the visible overlay and internal holes; re-read after tool or Photoshop tab changes. No image preview → no “looks realistic” claim.
- **No silent cloud or credit use.** Approval is required before sending protected pixels to external AI or spending credits. Prefer manual Photoshop corrections when they preserve identity better.
- **Don't rasterize/flatten the only master.** Keep protected source and source Smart Objects; use working duplicates where pixel-only tools require them.
- **Do not confuse photo editing with 3D modeling.** Fix image integration, never silently remodel approved geometry.

## Layer contract

Keep `00_BASE_LOCKED`, `10_PLACEMENT`, `20_MATTES_OCCLUSION`, `30_CONTACT_LIGHT`, `40_LOCAL_MATCH`, `50_GLOBAL_FINISH`; add `15_CHANGE_KEEP_PROTECT` for clearly named scoped target, preserve and context masks and `35_EDGE_AND_LOCAL_COLOR` for independently adjustable edge/adjacent light/color corrections. Verify actual z-order instead of relying on group names.

## Done condition

Pass `references/quality-gates.md` for **target fidelity, protected-content integrity, mask coverage, local seam/color coherence, physical integration, editability and exports**. A structurally successful MCP call is not evidence that the correct object was edited or the image is believable.
