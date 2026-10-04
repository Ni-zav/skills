---
name: computer-vision-document-pipeline
description: Build and debug mobile/document-scanning pipelines that detect page boundaries, stabilize editable corners, rectify perspective, enhance readability, run OCR, manage multi-page projects, and export reliable PDFs. Use when camera capture produces black/warped previews, edge detection is unstable, corner handles jitter, flattening crashes, OCR coordinates no longer align, or a document-scanner app needs a robust capture-to-export architecture.
---

# Computer Vision Document Pipeline

Treat scanning as a coordinate-system pipeline, not one image filter.

## Pipeline

1. Capture an immutable source image and record orientation/rotation metadata.
2. Produce a smaller analysis image for detection; keep mapping back to source coordinates explicit.
3. Detect candidate document boundaries.
4. Score/select a quadrilateral using geometry and image evidence.
5. Stabilize the editable boundary without silently changing user corrections.
6. Order corners consistently.
7. Compute perspective transform in source-image coordinates.
8. Warp once from the best available source, not repeatedly from already-warped previews.
9. Apply optional enhancement to a derived image.
10. Run OCR against the final geometry if OCR coordinates need to match exported pixels.
11. Persist project/page metadata separately from transient bitmaps.
12. Export pages with deterministic order, dimensions, and rotation.

## Boundary detection

A usable page detector should handle:

- no convincing document;
- multiple quadrilateral candidates;
- partially out-of-frame pages;
- low contrast;
- shadows;
- curved paper;
- background rectangles stronger than the document.

Return confidence and candidate geometry. Do not fabricate a confident full-frame document when evidence is weak.

## Coordinate discipline

Name coordinate spaces explicitly: preview view, camera buffer, analysis bitmap, source image, cropped/warped page, OCR page, PDF page.

Every conversion should have one documented mapping. Many "black image" and misplaced-corner bugs are actually width/height, rotation, crop, or transform-space mismatches.

## User editing

Keep automatic detection and user-adjusted geometry as separate states. Once the user moves a handle, do not re-run detection and overwrite it unless explicitly requested.

Side handles can influence adjacent corners, but clamp geometry to a valid convex quadrilateral and preserve handle ordering.

## Memory and lifecycle

On mobile, keep full-resolution decode/warp work off the UI thread and avoid holding multiple unnecessary full-size bitmaps. Close/recycle native resources according to the platform/library lifecycle.

## Verification fixtures

Keep images for:

- clean white paper;
- dark/low-contrast page;
- rotated portrait/landscape;
- page near image edge;
- perspective skew;
- no document;
- multiple rectangles;
- very large source image.

Read `references/geometry-notes.md` when modifying perspective or coordinate mapping.
