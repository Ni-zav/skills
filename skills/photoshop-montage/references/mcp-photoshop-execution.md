# Executing photomontage through Photoshop MCP

This is an **integration adapter**, not a guarantee that Photoshop is available. Prefer a host-neutral editing plan; use the actual connected server's schema. The examples below assume Photoshop-MCP-IMT and must be reconciled with its live catalog. Other servers expose different operation names.

**High-risk operations require a preview checkpoint**: `select_subject`, `recipe remove_background`, `create_layer_mask`, `invert_selection`, `content_aware_fill`, `generative_remove` and any region-wide adjustment. These do not identify the user's semantic target automatically. Read `scene-understanding-and-edit-contract.md` first.

## Connection and operation discovery

1. Confirm installed Photoshop, active local document, linked MCP server, permissions, target operating system and active Adobe session.
2. For Photoshop-MCP-IMT, call `ps_get_state` and `ps_get_layers`; identify multiple open documents and exact active layer before writing.
3. Call `ps_catalog` (then category-specific schema), and `ps_do` with `get_capabilities` when version-dependent tools are needed. Do not infer functionality from the skill text or outdated README.
4. Save a distinct working PSD (or duplicate master) before edits; do not write over the user's only copy.
5. Build a human-inspectable `CHANGE / KEEP / PROTECT / CONTEXT` overlay first. Check exact active document, layer, selection bounds **and visible footprint/polarity**; bounds alone cannot tell whether the correct person/part was selected. Don't combine a risky selection with a destructive follow-up in one blind `ps_batch`.
6. Apply small, inspectable changes. Photoshop's `ps_batch` is sequential but **not transactional**; after a partial failure, inspect and reconcile instead of blind replays.
7. After an edit, read back document/layer state and **render a preview** with `ps_export_frame` or `get_preview`. Compare protected before/after regions, explicit effect footprint, local seam/lighting and full frame. State readback is not mask-quality evidence.

## Capability-to-editing map

| Photoshop need | IMT route to discover | Caveat |
| --- | --- | --- |
| Open/save/backup documents | `ps_get_state`, `ps_save_document`, document operations | Save-over is not undoable; paths must be validated |
| Inspect layer tree | `ps_get_layers` | Doesn't necessarily expose mask content |
| Place a subject | `place_image` via `ps_do` | May create Smart Object; coordinate origin is top-left in IMT |
| Layer names/order | `rename_layer`, `select_layer_by_name`, move/visibility operations | Exact names can collide; identify chosen document |
| Subject selection/mask | `select_subject`, `create_layer_mask`, `recipe remove_background` | First pass only; hair/glass often needs UI refinement |
| Position/transform | `scale_layer`, `move_layer`, `distort_layer` | `distort_layer` four corners are for planar targets; rasterization may be necessary |
| Local color | adjustments, clipping masks, blend mode/opacity operations | Use same-material reference ROIs and masked adjacent-area correction; check non-destructive behavior |
| Contact shadow | separate paint/shape layers or `apply_layer_style` | Drop shadow alone seldom fits real ground geometry |
| Cleanup | `content_aware_fill` or `recipe remove_distraction` | Only after inspected target-part selection and protected-area check; never fill an inferred whole-subject selection |
| Harmonize / fine brushwork | mostly Photoshop UI handoff | Harmonize requires pixel layer, selection of variation and may use credits |
| Export preview and PSD | `ps_export_frame`, `ps_save_document` | Validate filenames, profile, outputs and frame |

Names/parameters above are **discoverable operation names**, not calls this skill has executed. Run each only with the current server's correct schema.

## Safe execution pattern

```text
inspect document + layer tree
  -> create/verify working copy
  -> place one insertion and name it
  -> transform to approved geometry
  -> identify target part, protected neighbors and local reference ROIs
  -> preview selection overlay; check components, bounds and polarity
  -> apply a single scoped selection/mask/repair
  -> inspect at fit/100% and before/after protected-area diff, refine or hand off
  -> add separate contact and cast shadow layers
  -> apply local clipped matching adjustments from comparable nearby materials and lighting
  -> inspect seam gradients and protected pixels again; revise failed gates
  -> save editable PSD + export review image
  -> re-open/read back where supported
```

For IMT, `ps_recipe` can reduce calls when its behavior fits; do **not** substitute a general recipe for a precise compositing requirement without checking its effects. After any action that switches documents (e.g. opening Smart Object contents, new-document upscale), reacquire document ID and active layer.

## UI-only and risky operations

- **Select and Mask, Refine Hair, fine paint, Camera Raw/Liquify, some perspective tools, Harmonize variation selection:** prepare a named working layer, tell the user the exact needed operation and region, inspect the resulting document afterward.
- **Generative tools:** require permission for external pixel upload/credit use and clear scope. A plan/version flag cannot prove account entitlement.
- **Custom scripts / UXP batchPlay:** use only where reviewed operations are missing, and prefer a short scoped script over arbitrary user-supplied code. Adobe requires `executeAsModal` for UXP modifications. Avoid scripts from untrusted documents.
- **Modal Photoshop:** `photoshop_busy` is not a signal to repeatedly retry writes. Ask to close the blocking dialog/tool or use the documented UXP read/save fallback when configured.
- **Timeout:** a write may have completed after client timeout. Re-read state/history before retrying to avoid duplicating objects or consuming credits twice.
- **External and destructive effects:** saving over original, closing without save, flattening, exports, asset file writes and paid generation are not all reversible by Cmd/Ctrl+Z.
- **Confidentiality:** Photoshop MCP exposes document names, layers, preview pixels and potentially full image content to the host AI service. Respect client NDA/privacy constraints.

## Host configuration

The skill **does not embed** an installation command or MCP JSON because each client, Photoshop build and MCP server differs. For the maintained IMT integration consult:
- https://github.com/Immersive-Media-Technologies/photoshop-mcp-imt
- https://github.com/Immersive-Media-Technologies/photoshop-mcp-imt/blob/main/docs/available-tools.md
- https://github.com/Immersive-Media-Technologies/photoshop-mcp-imt/tree/main/skills/ps

If a different Photoshop server is connected, map the same editing sequence to its documented tools after verifying them. If none is connected, provide a human-readable Photoshop step plan—not fake tool results.
