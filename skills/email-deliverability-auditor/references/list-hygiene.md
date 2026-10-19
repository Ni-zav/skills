# List hygiene and unsubscribe verification

Read before migrations, bulk marketing, re-engagement, or unsubscribe debugging.

## Provenance and eligibility inventory

For each recipient cohort document: source and collection date, specific signup promise, preference/consent or other applicable lawful basis, jurisdiction, last meaningful engagement, previous opt-outs/complaints, and suppression provenance. Exclude imports without sufficient basis; do not resurrect suppressions because a CSV lacks unsubscribe flags.

For service-triggered messages, maintain a separate classification and only send the content justified by the service event.

## Mandatory controls

- Maintain a suppression ledger across ESP and CRM migrations. Do not delete all evidence of opt-out merely because marketing must cease; retain only the minimal lawful suppression record necessary.
- Suppress hard bounces, active complaints, unsubscribes, and invalid addresses promptly and according to applicable law/provider policy; respect preferences by scope.
- Do not buy, scrape, or automatically enroll contacts for a subscription newsletter.
- Define global and channel/topic opt-outs. The user must have an accessible way to stop all marketing within applicable rules.
- For provider-required one-click, test the *actual received message headers* and HTTPS POST endpoint, not just the ESP dashboard setting.
- Avoid shared tracking links that disclose identity or lead to unrelated, misleading landing pages.
- Verify list segmentation and exclusion logic in a small non-sending audit before launch.
- Keep frequency consistent with what recipients were told; don't suddenly increase frequency to 'warm' a list.
- Restrict diagnostic exports to redacted/aggregate information.

## Verification ladder

1. Inspect consent/source and suppression sample, with sensitive data redacted.
2. Confirm the campaign audience query excludes every known ineligible segment and already-messaged/over-frequency contact.
3. Test preference-center and in-body unsubscribe paths.
4. Send test messages only to explicitly authorized test accounts; inspect RFC 8058 headers and POST behavior if applicable.
5. Submit an unsubscribe and verify suppression across all sending systems before the next eligible send.
6. Verify a bounce/complaint event is consumed into suppression with retry/idempotency behavior.
7. Review audit logs or confirmation reports, not just screenshots.

## Re-engagement

For a long-dormant but still eligible cohort, avoid immediate full-volume sending. Pilot with a suitable audience, clearly explain value and expectations, use a readily accessible opt-out, watch complaints and real engagement, and sunset unresponsive recipients where prudent. Never market to already opted-out people to 'ask if they want back in'.
