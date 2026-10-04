# Huawei Theme Studio Pro Notes

Checked: 2026-10-04.

Primary sources:

- Watch Face codelab: https://developer.huawei.com/consumer/en/codelab/theme-Watchface/
- Expression overview: https://developer.huawei.com/consumer/en/doc/content/expressions-0000002678032923
- Expression application scope: https://developer.huawei.com/consumer/en/doc/content/range-of-application-0000002677928141
- Global variables: https://developer.huawei.com/consumer/en/doc/content/global-variables-0000002648008268
- DoF effect: https://developer.huawei.com/consumer/en/doc/content/depth-of-field-pro-0000001633846453

Current useful facts:

- Theme Studio supports watch-face creation/export and device testing through Huawei Health.
- Expression support is specification/device dependent. Current Huawei docs describe expressions for dynamic properties such as position, color, font size, image selection, and animation control.
- Expressions can reference time/date and device data variables; current documentation includes a millisecond variable that can update at approximately 30 fps.
- Current documentation says expression-created faces require HarmonyOS 7.0+ on supported wearables.
- Current creation examples distinguish WATCH and GT/FIT specification families and document expression-count/length limits. Recheck these limits before shipping.
- Huawei documents a DoF effect for supported 466x466 version-1.y watch faces, using layer movement to create perceived depth.

Do not freeze capability assumptions from one watch family into every target. Verify the target specification first.
