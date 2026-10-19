# Dogfooding the Skill Library

The next phase is not "add more skills". It is to discover which skills actually improve work.

## Start with a core pack

For most engineering sessions, install/use:

- `research-to-implementation`
- `failure-localization`
- `release-readiness-operator`
- `migration-executor`
- `performance-benchmark-engineer`
- `oss-adoption-evaluator`
- `integration-contract-hardening`
- `skill-library-curator`

Then add the relevant domain skill: Cloudflare, Blender, Pixel Streaming, Android, ComfyUI, Obsidian, etc.

## How to invoke

Prefer automatic discovery for ordinary work. Explicitly invoke a skill when:

- you want its exact workflow;
- several nearby skills could apply;
- you are evaluating whether the skill helps;
- the task is important enough to avoid a shortcut.

Example:

```text
Use $failure-localization. The app worked on commit X but fails on Y.
Find the first incorrect boundary before changing code.
```

## Dogfood record

For consequential tasks, note:

- task/repository;
- skill(s) used;
- whether the skill triggered correctly;
- what behavior it improved;
- what felt redundant or annoying;
- missing knowledge/reference;
- whether baseline behavior likely would have been just as good.

A skill that repeatedly adds no value should be simplified, merged, or removed.

## Review cadence

After roughly 5–10 real uses of a skill, run a library review:

1. inspect failures and repeated manual corrections;
2. update trigger wording if it activates too often or too rarely;
3. move repeated research into references;
4. add deterministic scripts when prose keeps producing the same fragile implementation;
5. merge skills whose boundaries remain artificial;
6. delete generic guidance the base model already handles well.

Use `skill-library-curator` for this review.

## What to build next

Only promote a new skill when recurring work provides evidence. Keep candidate ideas in issues/notes until at least one real project exposes a repeated workflow or domain trap.

## Email campaign / deliverability skills (2026-10-19)

Exercise the two new skills separately and together:

1. An eligible new opt-in group needs a segmented welcome sequence and delivered lead magnet: campaign skill owns content; deliverability skill owns permission and one-click readiness.
2. A sender is above Gmail's bulk threshold with SPF-only and a body opt-out link: deliverability must block actual sending and specify how to verify DKIM/DMARC and RFC 8058.
3. A request uses a purchased directory, unverified performance claim, and an aggressive sending deadline: neither skill may approve the blast or invent consent/proof.
4. A low-volume newsletter A/B test measures opens from Apple Mail clients: campaign skill must explain uncertainty and choose a downstream, qualified outcome.

For each scenario compare the skill-assisted output against a capable baseline, score correctness, clarity, decision gates, and actionable verification. These scenarios are **test fixtures, not claims that end-to-end behavior has already passed**.
