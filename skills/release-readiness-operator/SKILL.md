---
name: release-readiness-operator
description: Decide whether a software product is actually ready to release by turning claims into explicit evidence gates across functionality, packaging, deployment, recovery, documentation, and user-facing installation. Use when a project is "almost done", has a list of remaining release gates, needs a version/tag/release, requires dogfooding or real-provider validation, or when unit tests pass but production readiness is still uncertain.
---

# Release Readiness Operator

A release is an evidence state, not a feeling.

## Start with the release promise

Write what the user will be able to do after release. Convert that promise into gates.

Typical gate groups:

- build and static checks;
- automated tests;
- critical end-to-end flows;
- real provider/device/environment validation;
- failure/retry/recovery paths;
- install/upgrade/uninstall path;
- configuration and secret handling;
- observability;
- documentation;
- artifact/version/tag integrity.

## Gate table

Track each gate as:

- **required / optional**;
- evidence command or observation;
- result;
- artifact/log/reference;
- blocker owner;
- whether it must be rerun after code changes.

Do not mark a gate passed from indirect evidence. A synthetic webhook does not prove a real provider transition; a health endpoint does not prove delivery.

## Release sequence

1. Freeze the release scope.
2. Run cheap deterministic gates.
3. Run real boundary/integration gates.
4. Exercise at least one expected failure path.
5. Verify install/upgrade from a clean environment when applicable.
6. Review config/secrets and generated artifacts.
7. Update user docs/changelog.
8. Create version/tag only after required gates pass.
9. Deploy/publish.
10. Run post-release smoke tests and retain rollback instructions.

## Partial readiness

If some gates cannot be run, distinguish:

- **verified**;
- **not verified**;
- **known failing**;
- **not applicable**.

Never collapse "not tested" into "passed".

## Rollback

Before release, identify the fastest safe reversal: previous image/tag, previous Worker deployment, feature flag, database compatibility window, package version, or documented manual rollback.

## Done

A release handoff must say exactly which gates passed, which remain, what artifact/version was produced, and how to detect and reverse a bad release.
