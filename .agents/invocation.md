# Installing and Invoking

The repository is source-of-truth content, not runtime state.

## Install all

```bash
npx skills@latest add Ni-zav/skills
```

Local copy:

```bash
npm run install:codex
npm run install:claude
```

## Install one local skill

```bash
node scripts/skills.mjs install --target codex --skill <name>
node scripts/skills.mjs install --target claude --skill <name>
```

Use `--dest <path>` for a custom target and `--force` only when replacing an existing installed copy is intentional.

## Invocation

Compatible agents may auto-select a skill from its frontmatter description. Explicit invocation is useful when the user wants a particular workflow; use the host's supported skill syntax (for example `$skill-name` in Codex-style surfaces).

Do not add host-specific commands to the portable `SKILL.md` unless the skill actually depends on that host.
