# Blender Scene Performance Notes

Checked: 2026-10-04.

Primary Blender references:

- Geometry Nodes performance: https://docs.blender.org/manual/id/dev/modeling/geometry_nodes/performance.html
- Instances: https://docs.blender.org/manual/de/5.2/modeling/geometry_nodes/instances.html
- Realize Instances: https://docs.blender.org/manual/en/5.2/modeling/geometry_nodes/instances/realize_instances.html

Current Blender guidance reinforces several durable principles:

- minimize geometry processed by expensive nodes;
- use selection inputs to limit work;
- reuse intermediate computation when possible;
- instances avoid duplicating underlying geometry and can substantially reduce memory/evaluation cost;
- realizing many complex instances can sharply worsen performance;
- baking stable simulation/procedural results trades flexibility for cheaper repeated evaluation;
- use timings/profiling and isolate slow nodes rather than guessing.

Always benchmark on the Blender version and target scene because engine/evaluation behavior changes.
