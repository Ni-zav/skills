# Skill Authoring

## First question: should this be a skill?

Create a skill when the agent repeatedly needs knowledge or procedure it will not reliably infer from the task itself.

Good candidates:

- niche domain constraints and failure modes;
- a repeatable cross-repository workflow;
- a fragile operation with a reliable verification ladder;
- tool/product knowledge that needs curated current sources;
- a distinctive quality rubric the user repeatedly applies.

Bad candidates:

- "be a senior developer";
- generic framework syntax;
- generic code review;
- one repository's temporary TODO list;
- facts that belong in that repository's own `AGENTS.md`;
- huge copied documentation.

## Shape

```text
skills/<name>/
  SKILL.md
  agents/
    openai.yaml
  evals/
    evals.json
  references/        # only when useful
  scripts/           # only when deterministic helpers help
  assets/            # only when output needs reusable files
```

Keep skills flat; do not nest another `SKILL.md` inside a skill.

## Frontmatter

Use only:

```yaml
---
name: example-skill
description: What the skill does. Use when ...
---
```

The description is the discovery surface. Include concrete trigger vocabulary there rather than hiding a "when to use" section in the body.

## Body

Write the shortest workflow that changes agent behavior.

A good body usually contains:

1. the decision/workflow;
2. the few domain invariants that are easy to violate;
3. a verification ladder;
4. pointers to references and when to read them;
5. a concrete done condition.

Do not restate documentation the model can fetch. Explain what to verify and which source is authoritative.

## References

Use references for:

- format/version details;
- product-specific configuration;
- domain decision tables;
- known failure modes;
- source links and freshness notes;
- worked examples too large for the core workflow.

Prefer one level of reference files with descriptive names.

## Scripts

A script must earn its maintenance cost. Add it when it makes a fragile task deterministic, validates structure, performs repeatable conversion, or saves substantial rewritten code. Treat scripts as black boxes first: document invocation and expected output.

## Evals

Each new skill should have `evals/evals.json`:

```json
{
  "prompts": [
    "A realistic request that should trigger the skill.",
    "A second request with different wording.",
    "A boundary case where the skill adds value."
  ]
}
```

Prompts should look like actual user requests, not descriptions of the skill.

## Freshness

For fast-moving products, put source URLs and a checked date in a reference. Tell the agent to verify current official docs when a version, limit, command, publishing rule, or API shape matters.

## Final checks

- Does the skill teach something the base model would otherwise have to rediscover?
- Is the description specific enough to trigger?
- Is `SKILL.md` compact?
- Are volatile facts isolated?
- Is there an explicit verification ladder?
- Are the eval prompts realistic?
- Does `agents/openai.yaml` still describe the actual skill?
