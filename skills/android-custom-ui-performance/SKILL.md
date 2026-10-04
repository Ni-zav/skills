---
name: android-custom-ui-performance
description: Build and optimize Android interfaces based on classic View/Canvas/custom drawing rather than Compose, especially launchers, camera/document tools, dense custom UIs, and Java apps where frame time, allocations, gesture latency, geometry caching, redraw frequency, and lifecycle correctness matter. Use when UI feels slow, typing/search stutters, Canvas drawing is heavy, a custom launcher needs compact high-performance rendering, or the code intentionally avoids RecyclerView/Compose.
---

# Android Custom UI Performance

Optimize the hot path first. A custom-drawn UI can be extremely fast if geometry, allocation, and invalidation are controlled.

## Workflow

1. Reproduce on the target device and record the slow interaction: launch, typing, scroll, gesture, capture, animation, or redraw.
2. Identify the hot callback: `onDraw`, touch dispatch, text filtering, layout/measure, bitmap processing, camera callback, or background task.
3. Measure before restructuring. Look for repeated allocations, full-list recomputation, excessive `invalidate()`, repeated text measurement, bitmap decode/scale, deep layout work, or work accidentally running on the UI thread.
4. Cache immutable or slowly changing geometry and text metrics.
5. Recompute only the subset invalidated by state changes.
6. Keep drawing deterministic: preallocate `Paint`, `Rect`, paths, buffers, and commonly reused objects.
7. Move CPU-heavy image/data work off the main thread, then marshal only final UI state back.
8. Preserve lifecycle correctness: camera/session resources, handlers, listeners, callbacks, and background jobs must stop cleanly.
9. Verify on a low/mid device, not only an emulator.

## Canvas rules

- Avoid allocations inside `onDraw()`.
- Avoid unnecessary `requestLayout()`; it can trigger expensive hierarchy traversal.
- Avoid invalidating the entire view when a smaller region or state update is enough.
- Cache text widths/positions when labels do not change every frame.
- Separate model filtering from rendering.
- Do not trade correctness for one-frame speed by reusing stale geometry across incompatible states.

## Search and launcher UIs

For fuzzy/acronym search and app lists:

- normalize searchable fields once;
- cache tokens/acronyms where practical;
- short-circuit exact/prefix matches before expensive fuzzy scoring;
- do not launch a single result until input semantics make it unambiguous;
- keep web/calculator/special-command parsing out of the ordinary app-filter loop where possible.

## Verification

Use the relevant tools available in the environment: frame timing, profiler, traces, macro/micro benchmarks, allocation inspection, and device-level interaction tests. Verify behavior as well as speed—an optimization that breaks launch semantics, accessibility, or lifecycle is a regression.

Read `references/performance-notes.md` for durable Android guidance.
