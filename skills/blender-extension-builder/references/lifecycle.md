# Blender Add-On Lifecycle

Use this when editing registration, UI classes, keymaps, handlers, timers, properties, or reload behavior.

## Class Registration

Keep classes in one ordered tuple. Register in order, unregister in reverse order.

```python
classes = (
    EXAMPLE_OT_do_thing,
    EXAMPLE_PT_panel,
)


def register():
    for cls in classes:
        bpy.utils.register_class(cls)


def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
```

Order matters:
- Register `PropertyGroup` classes before assigning `PointerProperty` or `CollectionProperty` that references them.
- Register operators before panels that draw their buttons.
- Register menus and UILists before panels that use them.

## Clean Up All Side Effects

Anything registered outside `bpy.utils.register_class` needs explicit cleanup.

Common globals to track:

```python
addon_keymaps = []
preview_collections = {}
timer_registered = False
```

Clean these in `unregister()`:
- keymaps added through `wm.keyconfigs.addon`
- handlers appended to `bpy.app.handlers`
- timers registered with `bpy.app.timers`
- draw handlers registered on spaces/regions
- custom properties added to `bpy.types.Scene`, `Object`, `WindowManager`, etc.
- preview collections from `bpy.utils.previews`
- msgbus subscriptions
- persistent modal state and background tasks

Use idempotent guards where Blender may call cleanup after partial registration.

## Keymap Pattern

```python
addon_keymaps = []


def register_keymaps():
    wm = bpy.context.window_manager
    kc = wm.keyconfigs.addon
    if not kc:
        return
    km = kc.keymaps.new(name="3D View", space_type="VIEW_3D")
    kmi = km.keymap_items.new("example_extension.ping", "P", "PRESS", ctrl=True)
    addon_keymaps.append((km, kmi))


def unregister_keymaps():
    for km, kmi in addon_keymaps:
        km.keymap_items.remove(kmi)
    addon_keymaps.clear()
```

Call `register_keymaps()` after class registration and `unregister_keymaps()` before class unregistration.

## Handlers And Timers

Do not append handlers blindly. Check before appending and remove only if present.

```python
from bpy.app.handlers import persistent


@persistent
def on_load_post(_dummy):
    pass


def register_handlers():
    if on_load_post not in bpy.app.handlers.load_post:
        bpy.app.handlers.load_post.append(on_load_post)


def unregister_handlers():
    if on_load_post in bpy.app.handlers.load_post:
        bpy.app.handlers.load_post.remove(on_load_post)
```

For timers, keep the callable stable so it can be unregistered:

```python
def tick():
    return None


def unregister_timers():
    if bpy.app.timers.is_registered(tick):
        bpy.app.timers.unregister(tick)
```

## Properties

Register property classes before assigning them:

```python
class ExampleSettings(bpy.types.PropertyGroup):
    enabled: bpy.props.BoolProperty(name="Enabled", default=False)


def register_properties():
    bpy.types.Scene.example_settings = bpy.props.PointerProperty(type=ExampleSettings)


def unregister_properties():
    del bpy.types.Scene.example_settings
```

Delete custom properties before unregistering their `PropertyGroup` classes.

## UI Rules

- Keep `Panel.draw` cheap and side-effect free.
- Do not create objects, edit files, start network calls, or mutate preferences from draw.
- Put actions in operators, then call operators from UI.
- Use `poll` for context gating instead of disabling buttons after the fact.
- Keep `bl_idname` stable for operators, panels, menus, UILists, and preferences.

## Reload Safety

For multi-file add-ons, reload submodules during development only when necessary. Keep production import paths simple.

```python
if "bpy" in locals():
    import importlib
    importlib.reload(operators)
    importlib.reload(ui)
else:
    from . import operators, ui
```

Avoid broad wildcard imports; explicit module registration keeps unregister cleanup readable.

## Background Smoke Test

Use a factory startup so the add-on does not accidentally depend on user preferences:

```bash
blender --background --factory-startup --python-expr "import importlib.util, pathlib; p=pathlib.Path(r'/path/to/extension/__init__.py'); spec=importlib.util.spec_from_file_location('smoke_ext', p); m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); m.register(); m.unregister(); print('OK')"
```

If the add-on uses relative imports, load it as a package from the parent directory instead of a standalone module.