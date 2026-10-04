---
name: migration-executor
description: Plan and execute technical migrations with explicit compatibility, rollout, data, and rollback boundaries. Use when moving between frameworks, APIs, hosting platforms, storage systems, package formats, schemas, authentication methods, build tools, or service architectures; especially when the old and new systems must coexist temporarily or a big-bang rewrite would be risky.
---

# Migration Executor

Preserve behavior first; improve architecture second.

## Workflow

1. Inventory the current system and the externally visible contract.
2. Define the target state and the exact reason for migrating.
3. Classify differences:
   - mechanical;
   - behavioral;
   - data/schema;
   - operational;
   - security/auth;
   - performance;
   - unsupported feature.
4. Decide the migration unit: file, endpoint, route, workload, dataset, tenant, feature, or deployment.
5. Create a compatibility window whenever possible:
   - adapter;
   - dual read;
   - dual write;
   - shadow execution;
   - feature flag;
   - side-by-side deployment.
6. Migrate the smallest representative slice.
7. Compare old/new behavior using the same fixture or traffic.
8. Expand only after the slice proves the migration assumptions.
9. Remove compatibility code after the rollback window closes.
10. Update docs, CI, deployment configuration, and stale references to the old path.

## Data migrations

Separate schema change from destructive cleanup. Make forward code tolerant of the old shape before rewriting all data when possible.

For transformations:

- preserve source backup/export;
- make reruns idempotent;
- record counts/checksums;
- verify representative records;
- reconcile totals before deleting the old source.

## API/platform migrations

Read current official migration/breaking-change docs. Do not treat a changed identifier/version string as the whole migration if request semantics, prompts, auth, defaults, or runtime behavior also changed.

## Rollback

Define rollback before production mutation. If rollback is impossible, state that explicitly and increase pre-migration validation accordingly.

## Done

The migration is complete only when the target path is verified, rollback/compatibility decisions are documented, old-path dependencies are accounted for, and cleanup is either finished or explicitly scheduled.
