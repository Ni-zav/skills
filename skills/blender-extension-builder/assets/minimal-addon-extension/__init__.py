import bpy


class EXAMPLE_OT_ping(bpy.types.Operator):
    bl_idname = "example_extension.ping"
    bl_label = "Ping"
    bl_description = "Run an example extension operator"

    def execute(self, context):
        self.report({"INFO"}, "Example extension is registered")
        return {"FINISHED"}


class EXAMPLE_PT_panel(bpy.types.Panel):
    bl_idname = "EXAMPLE_PT_panel"
    bl_label = "Example Extension"
    bl_space_type = "VIEW_3D"
    bl_region_type = "UI"
    bl_category = "Example"

    def draw(self, context):
        self.layout.operator(EXAMPLE_OT_ping.bl_idname)


classes = (
    EXAMPLE_OT_ping,
    EXAMPLE_PT_panel,
)


def register():
    for cls in classes:
        bpy.utils.register_class(cls)


def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)


if __name__ == "__main__":
    register()