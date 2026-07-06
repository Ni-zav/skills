# Nigel Agent Skills

Agent-neutral skills for Codex, Claude Code, and compatible tools that read `SKILL.md`.

## Quickstart

```bash
npm run dashboard
npm run validate
```

Install local copies before this repo is published:

```bash
npm run install:codex
npm run install:claude
```

After publishing to GitHub, use the public skills installer pattern:

```bash
npx skills@latest add <owner>/<repo>
```

## Layout

- `skills/<skill-name>/SKILL.md`: the actual skill entrypoint
- `skills/<skill-name>/agents/openai.yaml`: Codex/OpenAI UI metadata
- `skills/<skill-name>/references/`: detailed docs loaded only when needed
- `skills/<skill-name>/scripts/`: deterministic helpers
- `skills/<skill-name>/assets/`: templates copied into target projects
- `.agents/`: repo-level operating notes for agents
- `DASHBOARD.md` and `skills.json`: generated catalog

## Current Skills

See `DASHBOARD.md`.

## References

- Matt Pocock's skills repo uses a root `skills/` catalog, `.agents/` docs, and the `npx skills@latest add mattpocock/skills` install pattern: https://github.com/mattpocock/skills
- Claude Code skills use `SKILL.md` and load from `~/.claude/skills/<skill-name>/SKILL.md`, `.claude/skills/<skill-name>/SKILL.md`, or plugin skill folders: https://docs.anthropic.com/en/docs/claude-code/skills
- Blender extension manifests and build/validate commands: https://docs.blender.org/manual/en/latest/advanced/extensions/getting_started.html