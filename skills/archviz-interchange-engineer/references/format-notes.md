# Interchange Format Notes

Checked: 2026-10-04.

## SketchUp

Primary source: https://extensions.sketchup.com/developers/sketchup_c_api/sketchup/index.html

The SketchUp C API can read, write, create, and modify `.skp` models. Important constraints include:

- internal geometric values use inches;
- C API interaction is required on the main thread;
- the API exposes native model structure rather than only a triangle soup;
- the importer/exporter interface is separate from direct file API use.

Treat unit conversion and main-thread ownership as explicit architectural concerns.

## IFC

Primary sources:

- https://docs.ifcopenshell.org/
- https://docs.ifcopenshell.org/ifcopenshell-python/geometry_processing.html

IfcOpenShell supports semantic IFC access plus geometry processing. For bulk geometry, its iterator supports multicore processing and caching and is preferable to repeatedly processing elements one at a time. Keep IFC GUID/semantic identity attached to derived meshes.

## Revit / IFC

Primary source: https://help.autodesk.com/cloudhelp/2026/ENU/Revit-API-MainReference/files/html/d032aa74-3835-7cfa-7a8e-b5a8c1f4f7d0.htm

The Revit API supports custom IFC export paths and IFC export configuration. Native RVT support is a different problem from IFC interoperability; do not imply that an IFC pipeline can round-trip arbitrary RVT data.

## DWG/DXF

Open-source DXF parsers can be enough for 2D/3D entity extraction when the product only needs a subset. DWG support commonly requires a licensed/vendor SDK or conversion stage. One commercial reference is ODA Drawings SDK: https://www.opendesign.com/faq/question/which-file-formats-does-drawings-sdk-work

Before selecting a library, list exact entities and versions the product must support. "Supports DXF" is meaningless without the entity/fidelity matrix.
