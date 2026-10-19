# Measurement, experimental design, and attribution

Read before A/B testing, reporting performance, or changing cadence.

## Metric definitions

| Metric | Suggested denominator | Interpretation |
| --- | --- | --- |
| Delivered | Sent minus bounces (per ESP definition) | Transport acceptance, not inbox placement |
| Unique click-through rate (CTR) | Unique human clickers / delivered | Better than opens, but bots/security scanners can inflate clicks |
| Click-to-open rate (CTOR) | Unique clickers / reported opens | Especially fragile where opens are privacy-proxied |
| Conversion rate | Attributed conversions / eligible delivered or clickers (declare which) | Meaningful action; attribution may be incomplete |
| Unsubscribe rate | Opt-outs / delivered | Fatigue/relevance signal; list hygiene outcome |
| Spam complaint rate | Provider-reported complaints / provider-defined population | Provider-specific; not interchangeable with all-delivered rate |
| Revenue per recipient | Incremental attributable net revenue / eligible recipients | Account for margin, costs, cannibalization, and holdouts |

State whether numerator/denominator are unique, per campaign, per cohort, delivered, sent, or opened. Never compare unlike metrics as equivalent.

## Experiment ladder

1. Write the hypothesis: 'Segment A will find insight X more relevant than Y and therefore perform action Z.'
2. Define eligibility and exclusions before randomizing; assign recipients once, not emails.
3. Change one meaningful lever at a time (subject/preview, content hook, CTA, timing, or frequency); maintain common offer and audience.
4. Set a primary outcome (usually qualified click, lead, booking, purchase, or revenue) and a guardrail (complaints, opt-outs, bounces).
5. Specify minimum practical lift, observation window, sample-size/power assumptions, and decision rule before launch. At low volume, label tests exploratory.
6. Compare full variants including downstream landing-page quality; don't declare a winner solely from opens or from early noise.
7. Capture confidence intervals/uncertainty and segment differences. Record `inconclusive` when appropriate.

## Measurement caveats

- Apple Mail Privacy Protection can generate machine opens. Open rate is contextual and unreliable for precise comparisons.
- Link scanning, forwarding, broken UTMs, last-click bias, and cross-device actions can distort clicks and revenue.
- Deliverability improvement is not proven by `accepted` status or screenshot of one inbox.
- Historical numbers in the Hormozi video (including ROI and CTR) are **illustrations from his discussion**, not portable industry benchmarks or promised effects.

## Campaign report template

`Goal | Cohort and basis | Variants | Exposure | Primary outcome | Guardrails | Caveats | Decision | Next test`.
