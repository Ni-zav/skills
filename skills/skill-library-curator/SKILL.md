---
name: skill-library-curator
description: Design, audit, de-duplicate, and evolve an Agent Skills library so skills trigger reliably without overlapping into a noisy prompt collection. Use when adding many skills, deciding whether a workflow deserves its own skill, diagnosing overlapping descriptions or missing triggers, reviewing third-party skills before installation, evaluating skill usefulness against a baseline model, or splitting/merging skills as the library grows.
---

# Skill Library Curator

Optimize for marginal capability, not skill count.

## Admission test

A new skill should add at least one of:

- domain facts the base model cannot safely assume;
- a repeatable procedure that prevents common shortcuts;
- tool/file/API integration knowledge;
- a distinctive quality rubric;
- deterministic scripts/assets;
- current curated references.

Reject skills whose only content is a persona, generic coding advice, or restated framework documentation.

## Overlap audit

For a proposed skill:

1. Search existing skill names/descriptions.
2. Identify the nearest two skills.
3. Write a positive trigger and a boundary where each should **not** trigger.
4. If the workflows share most steps, merge them and route to references.
5. If the same user request would activate several skills with no clear primary owner, sharpen descriptions.

## Description quality

The description must tell the agent:

- what capability is provided;
- concrete task vocabulary;
- when to use it;
- enough boundary language to distinguish nearby skills.

Do not hide trigger information only in the body because discovery happens before activation.

## Third-party skill review

Treat an installed skill as executable instructions with possible scripts/tool access.

Before adopting:

- inspect every instruction and script;
- verify external commands/network actions;
- check license/provenance;
- remove irrelevant host-specific behavior;
- rewrite rather than copy when only the principle is useful;
- test against realistic prompts.

## Evals

Use both:

- **trigger evals**: should/should-not activate;
- **task evals**: does the skill materially improve the result over baseline?

If a strong baseline performs equally well, simplify or delete the skill.

## Maintenance

Periodically review:

- stale source links;
- duplicated references;
- obsolete product/version facts;
- skills with no real usage;
- descriptions that collide;
- giant SKILL.md files that should use progressive disclosure.

## Done

A healthy library is easy to discover, sparse in overlap, explicit about boundaries, and demonstrably more useful than the base agent alone.
