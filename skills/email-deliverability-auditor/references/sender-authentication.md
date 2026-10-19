# Sender authentication and mailbox-provider requirements

Review official documentation whenever sending volume, domain, provider, or date changes. This is a checklist, not a static substitute for the source.

Last reviewed: 2026-10-19.

## Verify the entire sent-message chain

1. **Header From**: recognizable verified identity, domain policy, and valid `Reply-To` when relevant.
2. **SPF**: sending IP is authorized by the envelope-from/Return-Path domain; inspect `Authentication-Results: spf=...` from an actual recipient. Multiple SPF TXT records or excessive DNS lookups can break SPF.
3. **DKIM**: a signature exists, verifies, and uses the intended `d=` domain. Check selector and key from the active ESP; don't treat a published key as proof of valid signing.
4. **DMARC**: publish `_dmarc.domain` policy, verify that SPF *or* DKIM passes with domain alignment to Header From. `p=none` can be sufficient as an initial policy when allowed by the provider, but is not equivalent to protective enforcement.
5. **Transport and identity**: validate TLS, forward and reverse DNS/PTR where applicable, RFC 5322 format, and consistent sending identity.
6. **Message type**: separate marketing/subscribed mail from genuinely transactional mail; check provider requirements that depend on classification and volume.

## Gmail

Source: https://support.google.com/mail/answer/81126?hl=en

Google's Gmail sender guidelines distinguish all senders from those sending 5,000+ messages in a day to personal Gmail accounts. The higher-volume category includes SPF *and* DKIM, DMARC (at least a valid published policy), From alignment, and marketing/subscription one-click unsubscribe with a visible unsubscribe link. Google also requires accurate message formatting and low user-reported spam; consult its FAQ for enforcement, thresholds, and terminology: https://support.google.com/mail/answer/14229414?hl=en

Provider-reported spam-rate guidance aims below 0.1% and to avoid 0.3% or higher. Monitor via Google Postmaster Tools where available; its denominator and visibility differ from ESP-level complaint metrics. Do not misstate this as a universal rate computed from all emails sent.

## Yahoo

Source: https://senders.yahooinc.com/best-practices/

Yahoo's requirements differentiate bulk and all senders. Bulk-sender guidance includes SPF and DKIM, DMARC with From alignment, accessible unsubscribe mechanisms, low complaints, valid DNS, and RFC conformance. See its one-click FAQ: https://senders.yahooinc.com/faqs/

The exact rule for accepted one-click methods and the time allowed to honor unsubscribes must be checked against current Yahoo documentation; do not infer Gmail's implementation is identical.

## RFC 8058 one-click

Standard: https://www.rfc-editor.org/rfc/rfc8058

For an applicable provider's HTTPS POST method, the delivered message should carry headers such as:

```text
List-Unsubscribe: <https://example.com/unsub/opaque-token>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
```

The HTTPS endpoint must recognize the authorized POST and unsubscribe the intended recipient without login, confirmation page, or requiring a user-visible GET visit. Tokens must be unpredictable and avoid putting raw email addresses in URLs. Confirm DKIM signature/headers per RFC, endpoint authentication semantics, replay tolerance, idempotence, correct suppression propagation, and that GET requests/scanners alone do not unsubscribe contacts. A normal visible in-body link remains a separate requirement where applicable.

## Important distinctions

- `spf=pass` does not guarantee DMARC alignment. `dkim=pass` from an unrelated `d=` domain does not automatically make DMARC pass.
- `DMARC p=none` can be valid monitoring posture, not evidence of enforcement.
- `250 OK` means one receiving hop accepted a message, not that a human read it.
- No provider guarantees Primary tab. A legitimate promotional email landing in Promotions is not automatically a delivery defect.
