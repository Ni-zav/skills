# Android Custom View Performance Notes

Checked: 2026-10-04.

Primary source:

- https://developer.android.com/develop/ui/views/layout/custom-views/optimizing-view

Durable Android guidance:

- Keep `onDraw()` lean.
- Avoid allocations in draw/animation hot paths because garbage collection can cause stutter.
- Reduce unnecessary `invalidate()` calls.
- Avoid unnecessary `requestLayout()` because layout traversal can be expensive.
- Shallow, purpose-built view hierarchies can outperform generic deep layouts when the UI has unusual constraints.

Treat 60 fps as a frame-budget problem, not an aesthetic goal. Profile the actual device and interaction before selecting an optimization.
