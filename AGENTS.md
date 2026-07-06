# Agent Notes

This repo is a skill catalog. Keep skills small, composable, and compatible with any agent that can read `SKILL.md`.

## Rules

- Add skills under `skills/<skill-name>/`.
- Keep `SKILL.md` concise; move detailed docs to `references/`.
- Add `agents/openai.yaml` for each skill.
- Use `scripts/` only for deterministic helpers worth reusing.
- Use `assets/` only for templates or files copied into target projects.
- Run `npm run dashboard` after adding or renaming skills.
- Run `npm run validate` before handing off.

For more detail, read `.agents/skill-authoring.md`.