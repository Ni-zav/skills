---
name: email-deliverability-auditor
description: Audit email deliverability, authentication, sender reputation, marketing consent, suppression, and unsubscribe compliance before or after sending. Use when SPF, DKIM, DMARC, PTR, TLS, or domain alignment is unclear; Gmail or Yahoo rejects or spam-folders campaigns; bulk sender and RFC 8058 one-click rules matter; complaint or bounce rates rise; an ESP migration is planned; or a newsletter needs a launch preflight. For copy, segmentation, and campaign experimentation, use email-campaign-operator.
---

# Email Deliverability Auditor

Determine why mail is accepted, deferred, rejected, routed to spam, or blocked by policy without treating any single heuristic as a guaranteed inbox-placement fix.

## Operating workflow

1. **Scope and permission.** Identify sender domain/from-address, ESP/SMTP path, recipients' mailbox providers and countries, approximate daily volume and marketing vs transactional purpose. Confirm the intended recipients are eligible under relevant law and subscription preferences. Never authorize scraping, purchased lists, or mailing suppressed addresses.
2. **Collect minimum evidence.** Ask for redacted DNS records, representative message headers/authentication results, SMTP codes or ESP logs, campaign dates, delivery/bounce counts, complaint data, suppression/unsubscribe logs, and list origin. Do not ask for passwords, secrets, raw contact lists, or private customer content.
3. **Determine applicable rules.** Check current authoritative provider rules, audience jurisdictions, volume thresholds, and message classification; re-read `references/sender-authentication.md` and `references/compliance-by-jurisdiction.md` before giving requirements. Distinguish legal obligations from provider policies and desirable heuristics.
4. **Verify the identity chain.** Check DNS and actual sent mail: SPF envelope domain authorization, DKIM signature and verified `d=` domain, header-From alignment for DMARC, published DMARC policy, TLS, forward/reverse DNS, and correctly formed headers. DNS presence alone never proves outgoing messages authenticate.
5. **Verify subscriber controls.** Confirm import provenance, preference management, complaint/bounce handling, suppression permanence, obvious body unsubscribe, and (when required) functioning RFC 8058 one-click unsubscribe. Test the opt-out journey rather than merely checking for a URL; follow `references/list-hygiene.md`.
6. **Isolate failure layer.** Classify into transport, authentication, policy, reputation, content/engagement, or instrumentation. Check the first failing boundary, provider/date/cohort differences, and error code. Follow `references/diagnostics.md` rather than assuming the Promotions tab is a failure.
7. **Propose safe corrective action.** Prioritize blockers and high-confidence repairs; separate observed evidence, working hypothesis, and untested mitigation. Test changes on eligible cohorts, verify actual headers and unsubscribe POST behavior, and assess the results.
8. **Decide release status.** Mark `blocked`, `conditional`, or `ready for authorized send`. Do not send or schedule any emails without explicit user authorization and recipient eligibility.

## Deliverable

Use an evidence table:

`Control | Requirement/source | Observed evidence | Pass/fail/unknown | Severity | Repair | How to retest`.

Then give a prioritized plan, residual unknowns, and a release verdict. Include the date checked for volatile provider policies.

## Hard gates

- Do not confuse SMTP acceptance, `delivered` in the ESP, tab placement, or a seed inbox screenshot with broad inbox placement.
- Never claim plain text, fewer links, Google-hosted content, or recipient replies guarantee Primary inbox delivery.
- An opt-out is final for the covered marketing scope until a legitimate new permission exists; no workaround sending.
- For bulk marketing, body unsubscribe and provider-required one-click headers are different checks.
- Rate thresholds, jurisdictional rules, and bulk-sender definitions change; verify against live provider and legal sources rather than using video claims.
- Mask recipient addresses and message IDs in diagnostic outputs.

## Done

The observed failure boundary is supported by evidence, sender configuration is validated on *sent mail*, subscriber rights and provider requirements are checked, each blocker has a verifiable fix, and the decision about sending is honest about unknowns. Provenance: `references/provenance.md`.
