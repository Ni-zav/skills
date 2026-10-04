---
name: cloudflare-edge-operator
description: Build, migrate, deploy, and debug Cloudflare edge applications using Workers, Workers Static Assets, Pages/Pages Functions, Wrangler, R2, D1, KV, Queues, Workflows, service bindings, cron triggers, and observability. Use when working on wrangler configuration, Cloudflare deployments, environment bindings, Workers/Pages migration, webhook services, deployment status tools, R2-backed assets, D1 data, scheduled Workers, or production failures that differ from local behavior.
---

# Cloudflare Edge Operator

Start from the deployed topology, not from framework assumptions.

## Workflow

1. Inventory the project:
   - `wrangler.toml/json/jsonc`;
   - Worker entry point and static build output;
   - bindings and environments;
   - routes/custom domains;
   - secrets versus plain vars;
   - Pages project settings if legacy Pages is involved.
2. Verify current Cloudflare docs before relying on version-sensitive CLI flags or platform limits.
3. For new static/full-stack projects, evaluate Workers Static Assets before choosing Pages.
4. Generate binding types with Wrangler instead of maintaining a handwritten environment interface.
5. Use platform bindings (R2, D1, KV, Queues, services) from Workers rather than calling Cloudflare's REST API back into the same account unless the API itself is the product requirement.
6. Move retriable/background work out of the request critical path with `waitUntil`, Queues, or Workflows as appropriate.
7. Configure logs/traces before production debugging.
8. Verify with the ladder below.

## Verification ladder

Run the layers that apply:

1. typecheck/lint;
2. unit tests;
3. Workers-runtime tests;
4. `wrangler deploy --dry-run` or equivalent build validation;
5. real deployment;
6. `/healthz` / `/readyz` or a narrow functional probe;
7. one real end-to-end event through the external integration;
8. scheduled/background/retry path if the product depends on it.

A 200 health endpoint does not prove webhook delivery, queue consumption, scheduled reconciliation, or provider-side permissions.

## Configuration invariants

- Keep compatibility dates intentional and periodically current.
- If Node built-ins are used, ensure the deployed config—not only tests—has the needed compatibility flag.
- Never commit account tokens or secrets.
- Treat environment-specific resource IDs and URLs as deployment configuration, not source constants.
- Avoid request-scoped mutable state in module globals.
- Await promises or explicitly attach them to the request lifecycle with `waitUntil`.
- Stream large bodies instead of buffering when practical.

Read `references/platform-notes.md` for current platform direction and migration traps.
