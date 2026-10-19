# Diagnose the first failing delivery boundary

Read when messages bounce, queue, disappear, land in spam, or reports conflict.

## Evidence map

| Boundary | What to inspect | What it proves / does not prove |
| --- | --- | --- |
| Client/ESP acceptance | Submission event, configuration, rejected records | ESP accepted work, not recipient delivery |
| SMTP handoff | Server reply, 4xx deferral vs 5xx rejection, enhanced status code | Receiving system accepted/rejected at that hop |
| Authentication | Original recipient `Authentication-Results`, From/Return-Path/DKIM domains | Which checks passed and whether DMARC aligns |
| Provider policy | Dated Gmail/Yahoo requirements, recipient type and daily volume | Which obligations apply |
| Reputation | Postmaster trends, complaint feedback, bounce types, domain/IP history | Directional root-cause evidence; not individual inbox placement |
| Mailbox placement | Consented seed accounts, provider dashboards, inbox/spam view | Limited sampled placement, not population-wide guarantee |
| Human value | Unique qualified clicks, conversions, replies, unsubscribes | Engagement with attribution/noise caveats |

## Triage sequence

1. Scope when the problem began. Compare before/after deployment, ESP, DNS, list import, email type, content, and volume.
2. Check hard bounces and error codes first. A rejected message cannot be repaired by changing its subject line.
3. On accepted-but-missing mail, inspect actual auth results, complaint trends, provider-specific deferrals, and cohort/list quality.
4. Isolate new-sender reputation versus sudden volume change, accidental expired DKIM selector, cross-domain alignment failure, missing list-unsubscribe headers, or suppression propagation defects.
5. Try the smallest safe reversible fix. Verify provider acceptance and policy compliance before controlled authorized resend.
6. Do not keep blasting to 'warm up' an ineligible or complaining audience. Pause and repair the data/policy problem.
7. Record outcome, sample/observation limits, and alternative causes not ruled out.

## Example diagnosis

Observed: A new ESP sends a domain whose SPF authenticates the ESP return-path but DKIM signs an unrelated provider domain; DMARC fails for the branded From domain.

Working hypothesis: Neither authenticated identity aligns with the visible From.

Next action: Configure aligned ESP custom MAIL FROM and/or domain DKIM, then resend a small authorized test and inspect recipient headers. Avoid claiming success solely after publishing DNS.

## Redaction

Never paste complete raw contact lists, live unsubscribe tokens, credentials, full message bodies containing private data, or confidential customer histories into a diagnostic report. Use masked identities and summarized counts.
