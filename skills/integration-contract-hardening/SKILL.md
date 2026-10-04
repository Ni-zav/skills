---
name: integration-contract-hardening
description: Make external API, webhook, queue, callback, and event integrations reliable under retries, duplicates, delays, partial failure, reordered delivery, credential rotation, and provider-specific semantics. Use when integrating Discord, Telegram, GitHub, Cloudflare, payment/webhook providers, third-party APIs, background queues, or any boundary where a successful HTTP request does not guarantee exactly-once business behavior.
---

# Integration Contract Hardening

Design for at-least-once reality.

## Contract inventory

For each integration record:

- authentication/signature;
- event/request identifier;
- ordering guarantees;
- retry policy;
- timeout;
- duplicate behavior;
- maximum payload;
- acknowledgement semantics;
- rate limits;
- replay support;
- versioning;
- provider source of truth.

## Inbound events

1. Authenticate/verify before trusting payload fields.
2. Persist enough event identity/provenance for replay and debugging.
3. Make processing idempotent using provider event ID or a stable derived key.
4. Acknowledge according to provider timing requirements.
5. Push slow/retriable work to a queue when the provider expects a fast response.
6. Distinguish permanent validation failures from transient downstream failures.
7. Keep a dead-letter/reconciliation path for events that exhaust retries.

## Outbound requests

- use provider-supported idempotency keys where available;
- bound retry count and apply backoff;
- retry only operations whose semantics are safe;
- log provider request/event IDs;
- make credential rotation/configuration observable;
- handle rate-limit and timeout responses explicitly.

## Reconciliation

If missing one event would corrupt state, add periodic reconciliation against the provider source of truth. Webhooks should accelerate state updates, not always be the sole durability mechanism.

## Verification

Test:

- duplicate delivery;
- reordered events;
- timeout after the provider processed the request;
- provider 5xx;
- invalid signature/token;
- rate limit;
- worker restart between receipt and completion;
- replay/reconciliation.

Read `references/webhook-notes.md` for current provider-neutral source notes.
