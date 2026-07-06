# Invocation

Use this repo as a source catalog, not as runtime state.

## Codex

Copy skills to `$CODEX_HOME/skills` or `~/.codex/skills`:

```bash
npm run install:codex
```

Invoke by name when the agent supports `$skill-name`.

## Claude Code

Claude Code personal skills live at `~/.claude/skills/<skill-name>/SKILL.md`. Project skills live at `.claude/skills/<skill-name>/SKILL.md`.

Copy local skills to the personal folder:

```bash
npm run install:claude
```

Invoke with `/skill-name` or let Claude load a skill automatically from the frontmatter description.

## Published Repo

Once this repo is pushed to GitHub:

```bash
npx skills@latest add <owner>/<repo>
```

Keep the root `skills/` directory and generated `skills.json` stable so installers and dashboards can discover entries.