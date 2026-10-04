# Repository Instructions

This repository is a portable Agent Skills catalog. Optimize for **useful missing context**, not prompt volume.

## Quality bar

- Put every skill in `skills/<kebab-case-name>/SKILL.md`.
- Frontmatter must contain only `name` and `description`.
- Make the description do the discovery work: say what the skill does and the concrete situations that should trigger it.
- Assume the base model is capable. Do not teach generic programming, Git, debugging, writing, or reasoning unless this repository has a distinctive workflow that materially improves the result.
- Keep the core workflow in `SKILL.md`; move deep, variant-specific, or volatile domain material to `references/`.
- Prefer official/primary sources for volatile technical facts and record source URLs in the relevant reference.
- Add a script only for deterministic/repeated work where prose is weaker.
- Add `agents/openai.yaml` with a short UI description and a default prompt that names `$skill-name`.
- Add `evals/evals.json` for new skills with realistic prompts that test both triggering and useful execution.
- Avoid nested skills. The installable skill directories stay flat under `skills/`.

## Change workflow

1. Inspect existing skill and references before editing.
2. Keep changes scoped and composable.
3. Update sources when a domain has drifted.
4. Run `npm run dashboard`.
5. Run `npm run validate`.
6. Review the generated diff for accidental prompt bloat or duplicated knowledge.

Read `.agents/skill-authoring.md` before creating a new skill.
