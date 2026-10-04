# Webhook and Idempotency Notes

Checked: 2026-10-04.

Provider implementations differ, so always verify the actual provider documentation.

A useful primary example is Stripe's idempotent-request documentation:
https://docs.stripe.com/api/idempotent_requests

The durable engineering lessons are broader than Stripe:

- network failure can make request outcome ambiguous;
- retries therefore need stable operation identity;
- inbound events may be duplicated or delayed;
- provider event/request IDs should be retained for support and reconciliation;
- exactly-once behavior is usually implemented by the consumer's idempotent state transition, not guaranteed by transport.

Do not copy one provider's retry/signature rules onto another provider.
