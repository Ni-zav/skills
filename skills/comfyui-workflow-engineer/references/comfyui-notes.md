# ComfyUI Notes

Checked: 2026-10-04.

Primary docs:

- Core concepts/documentation: https://docs.comfy.org/essentials/core-concepts/links
- Custom nodes overview: https://docs.comfy.org/custom-nodes/overview

ComfyUI uses a client-server architecture: Python server code performs workflow computation while the frontend provides the graph UI. It can also run workflows in API mode.

This matters for custom-node design: server-only nodes are naturally automation-friendly, while nodes whose behavior depends on direct frontend/server communication may not be usable through API execution.

Official workflow examples also embed/share workflow data through JSON and sometimes output media metadata. Preserve the graph and dependencies as part of reproducibility, not just the final image.
