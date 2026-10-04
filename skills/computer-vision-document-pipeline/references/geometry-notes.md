# Document Geometry Notes

Checked: 2026-10-04.

Primary OpenCV reference:

- getPerspectiveTransform / perspective geometry: https://docs.opencv.org/doc/doxygen/html/d9/ded/group__geometry__shape.html

A perspective rectification from a detected quadrilateral requires four corresponding source and destination points. Keep a consistent corner order such as top-left, top-right, bottom-right, bottom-left before computing the transform.

Important implementation rule: `perspectiveTransform` transforms point coordinates, while image rectification uses a perspective warp operation. Do not confuse point-space transforms with image resampling.

Detection can happen at reduced resolution, but transform the chosen quadrilateral back to the original image coordinates before the final high-quality warp.
