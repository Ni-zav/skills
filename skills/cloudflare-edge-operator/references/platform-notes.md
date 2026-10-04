# Cloudflare Platform Notes

Checked: 2026-10-04.

Primary sources:

- https://developers.cloudflare.com/workers/best-practices/workers-best-practices/
- https://developers.cloudflare.com/workers/wrangler/
- https://developers.cloudflare.com/d1/best-practices/
- https://developers.cloudflare.com/workers/wrangler/commands/pages/

Current guidance worth preserving:

- Workers Static Assets is the recommended starting point for new static and full-stack projects; Pages still works, but new platform investment is centered on Workers.
- Keep compatibility dates current deliberately and enable `nodejs_compat` when the code depends on Node built-ins.
- Generate binding types with `wrangler types`.
- Use bindings rather than calling Cloudflare REST APIs from a Worker for its own R2/KV/D1/etc resources.
- Use Queues for buffering/fan-out and Workflows for durable multi-step processes.
- Configure Workers Logs and traces before an incident.
- Workers runtime tests catch platform behavior that plain Node tests can miss. Confirm production flags explicitly because test tooling may inject compatibility behavior.
- When bringing an existing Pages project under Wrangler configuration, compare/download the current dashboard configuration before replacing it.

Recheck official docs whenever Wrangler command syntax, compatibility flags, product limits, or Pages migration behavior matters.
