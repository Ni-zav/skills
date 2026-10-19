---
name: email-campaign-operator
description: Plan, write, review, and optimize permission-based email marketing campaigns, newsletters, welcome flows, lead magnets, nurture sequences, promotions, and reactivation. Use when building an email content calendar, segmenting subscribers, improving subject lines or preview text, drafting value-first messages and contextual CTAs, interpreting CTR or conversion data, or designing campaign A/B tests. For sender authentication, spam complaints, and unsubscribe infrastructure, use email-deliverability-auditor; for unsolicited B2B prospecting, do not apply opt-in assumptions.
---

# Email Campaign Operator

Turn a permission-based audience relationship into useful, measurable communication. Optimize durable subscriber value and qualified outcomes, not volume, superficial opens, or clickbait.

## Workflow

1. **Define the boundary.** Identify the audience source and permission, sender, jurisdiction, campaign type, promise, offer, product truth, and whether execution is requested. If eligibility is uncertain, draft only; do not treat an imported list as opted in. Unsolicited B2B prospecting is a separate workflow.
2. **Choose one primary job.** Classify as welcome/lead-magnet delivery, newsletter, education/nurture, product announcement, promotion, win-back, or service/transactional communication. Do not mix commercial marketing into transactional messages without assessing its effect on classification.
3. **Build the brief.** Capture audience segment, stage/need, prior touchpoints, one decision or action, proof inventory, links, primary metric, cadence, locale, and constraints. Mark missing facts and claims for verification rather than inventing details.
4. **Select the message.** Match level of detail and offer to readiness: what does this recipient know, need, or believe next? Use `references/audience-segmentation.md` for segment rules and `references/lifecycle-and-cadence.md` for flows, eligibility, and frequency.
5. **Draft for earned attention.** Offer a genuine early payoff; make one useful idea concrete with a problem, method, and action; use only verified proof. Produce accurate subject and preview variants; choose one contextual primary CTA. A P.S., second CTA, branded prefix, and approximately 200-word format are optional tactics, never mandatory. Consult `references/copy-patterns.md`.
6. **Critique and revise.** Score relevance, first-line value, specificity, proof integrity, voice, and action clarity on a 0-2 scale each. Aim for at least 10/12 with no critical failures. Remove generic greetings, unsupported numbers, invented testimonials, false urgency, and disconnected CTAs.
7. **Preflight before sending.** Ask `email-deliverability-auditor` to check sending eligibility, authentication, functional opt-out, suppression, spam-risk diagnostics, and jurisdiction-specific rules. Check link destinations and UTM attribution; render/test mobile and desktop when HTML is used. Never actually schedule or send merely because a draft is complete; require explicit authorization for audience, message, and execution.
8. **Experiment and learn.** Specify hypothesis, sample, assignment, guardrail, primary metric, and decision rule before A/B tests; compare outcomes rather than assuming a universal 'best' day/time/length. Read `references/experimentation-and-metrics.md`.

## Standard response contract

Scale output to the request. A standalone draft can be short. For a complete campaign plan supply:

- **Brief:** objective, eligible segment, audience insight, offer, evidence, stage, format, cadence.
- **Creative:** finished email, two subject options, preview text, from-name recommendation when relevant, CTA destination and rationale.
- **QA:** evidence/consent gaps, link/rendering checks, compliance blockers (or `not assessed`).
- **Measurement:** primary metric, guardrails, test hypothesis, and next iteration.

Keep draft facts separated from assumptions. Never claim open/delivery/inbox-placement results without observed data.

## Non-negotiables

- Reward attention with relevance and genuine usefulness; never manufacture a benefit.
- Unsubscribes are a respected preference, not a tactic to reverse; stop further marketing to opted-out recipients.
- A welcome lead magnet must be delivered as promised without making extra reply steps a coercive condition.
- Text-forward design can be useful, but neither plain text nor Google-hosted links guarantee inbox placement.
- Apple Mail Privacy Protection and automated link checks can distort engagement measures; prioritize downstream human actions and conversions.
- If the request is chiefly DNS, RFC 8058, complaint diagnostics, suppression mechanics, or legal constraints, hand off to `email-deliverability-auditor`.

## Done

The recipient segment is eligible and understood; the email earns attention, makes verified claims, has a relevant next action, passes required preflight gates (or is clearly draft-only), and has an honest measurement plan. See `references/campaign-examples.md` for worked examples and `references/provenance.md` for source boundaries.
