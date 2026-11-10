# Scene understanding, target identification, and edit contracts

The agent's biggest risk is **mistaking a visual instruction for a tool selection**: “remove the cables behind the person” can become “remove the person” when `select_subject` selects the wrong object. No Photoshop command provides semantic understanding by itself.

## The two-pass visual observation

**Pass A — global scene**: inspect the full-resolution source at fit-to-screen; inventory dominant objects, nested parts, background surfaces, foreground occluders, perspective lines, light sources, and protected identity/geometry/text. Identify what the user named and where it is likely located.

**Pass B — local evidence**: inspect a generous crop around each candidate plus a 100% crop of the boundary, and inspect the corresponding layer/mask when available. Distinguish:

- **Object instance**: which of several cars, people, windows, plants, cables?
- **Part**: the wire on the wall, reflection in glass, unwanted sign, right-hand branch, product cap—not the entire parent object.
- **Relations**: in front of/behind, touching, casting shadow on, crossing/inside, same plane/material as, blocking a protected edge.
- **Geometry/lighting evidence**: horizon, material continuity, expected shadow direction, local temperature/cast, texture scale.
- **Confidence**: `observed` / `inferred` / `uncertain`. If there is no usable preview, mark target identity **unverified** and don't remove it.

If multiple candidates fit a phrase, don't guess and apply `Select Subject`. Stage non-destructive candidate overlays and ask for an annotated region/one clarifying pointer **only when required to avoid deleting protected pixels**.

## Scene map / edit contract

Build this compact internal plan before any destructive action:

| Item | Required content |
| --- | --- |
| Operation | INSERT, REMOVE, REPLACE, RETOUCH, MATCH_COLOR, or broad grade explicitly requested |
| Target | unique object instance or part: appearance, location and distinguishing neighbor |
| Change mask | editable target shape with anticipated area; only region eligible for modification |
| Context ring | nearby read-only area for material, tone, texture, shadow and color samples |
| Keep | adjacent elements and portions of same object that must remain |
| Protect | critical elements; explicit no-overwrite exclusion mask |
| Allowed spill | named secondary effect such as a bounded cast shadow or light bounce; otherwise none |
| Before image | original full frame and target/adjacent crops |
| Expected result | visible target outcome and unchanged region requirements |
| Abort triggers | wrong target, mask includes Keep, unapproved region expands, source corrupted |

### Semantic mask model

- `CHANGE`: pixels eligible for local edit.
- `KEEP`: visible material to leave unchanged; can include **other parts of the same object**.
- `PROTECT`: hard exclusion; editing must not touch even if an auto-selection encompasses it.
- `CONTEXT`: pixels for read-only sampling only.
- `EFFECT`: separately approved contact shadow, reflection or indirect light area. Do not quietly include it in `CHANGE`.

If using binary region masks, an edit is authorized only in `CHANGE - KEEP - PROTECT`, plus explicitly permitted `EFFECT`. A soft feather is still a change; account for its full reach. Non-destructive global preview display may differ due to color management; compare like-for-like profiles.

## Safety check before any action

1. Display the candidate selection as a conspicuous colored overlay against the source, then review the full image and target crop.
2. Confirm **which side** of the selection a Photoshop mask reveals or conceals. Photoshop masks reveal white, hide black. Selection-to-mask usually reveals selection; wrong polarity can hide the whole source.
3. Confirm whether every selection component belongs to the intended object: a wire crossing a lamp must not include the lamp. Prefer painting/paths or intersect/subtract selections over full-scene auto-detection.
4. Estimate selected footprint relative to the target and ROI. A selection that abruptly spans the canvas or an unrelated large region is suspicious; do not use one universal percentage cutoff because valid target sizes differ.
5. Save the source; test on the working copy. For ambiguous partial removals, do a small preview and compare before repeating.
6. Check Photoshop active document/layer and mask channel right before write. Switching tabs or layers invalidates assumptions.

## Decisions that should change the next tool

| Observation | Decision |
| --- | --- |
| Selection covers dominant person, user asked for cable behind them | reject Select Subject; isolate cable strokes with path/brush; keep person |
| “Remove background” requested but base is an entire scene | determine whether source cutout or final scene background should be removed; don't erase base |
| Object edges overlap glass/foliage/railing | use depth-specific matte components and occlusion layers, not one bounding rectangle |
| Preview shows unrecognized part or too few pixels | inspect larger/100% crop and alternative candidate; do not guess |
| Target meets protected line or text | split mask into segments; reconstruct only missing surface; manual approval if identity-critical |
| Selected area invert/polarity unexpectedly hides frame | revert mask and flip only after proving intended positive region |
| Multiple plausible target objects | stage overlays and obtain disambiguation instead of deleting all |

## After-action verification

- Compare source and output full frame at identical profile, resolution and crop.
- Examine a **difference overlay or heatmap**: are changes confined to `CHANGE` and optional `EFFECT`? Ignore expected whole-frame color conversion differences only after establishing they come from a deliberate, explicitly authorized transform.
- Check all `KEEP` and `PROTECT` regions for disappearances, damage, unexpected blur/tint, distorted lines, and mask leakage.
- Confirm intended removal did not also erase structural edges, texture flow, foreground occluders, adjacent objects or shadows belonging to other subjects.
- A bounding-box or tool success flag cannot prove pixel-level preservation. If preview or pixel comparison is unavailable, mark verification **blocked**.

## Reasoning-output compactness

Do not drown the user in speculative scene descriptions. For an ambiguous/risky edit, present only the proposed target and protected elements, the plan, and the specific blocker. For routine clear edits, keep the scene map internal and report results and evidence.
