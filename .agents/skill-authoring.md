# Skill Authoring

Use `skill-creator` for new skills when available, then adapt the generated shell.

## Checklist

1. Choose a hyphen-case name under 64 characters.
2. Put the skill at `skills/<skill-name>/SKILL.md`.
3. Make the frontmatter `description` say what the skill does and when to use it.
4. Keep `SKILL.md` procedural and short.
5. Move long specs, variants, and examples to one-level `references/*.md` files.
6. Add scripts only when repeated code or deterministic checking is useful.
7. Add assets only when the skill needs templates or reusable files.
8. Add or regenerate `agents/openai.yaml`.
9. Run `npm run dashboard`.
10. Run `npm run validate`.

## Frontmatter

Use only the fields needed for broad compatibility:

```yaml
---
name: example-skill
description: What the skill does and when an agent should use it.
---
```

## Good Skill Shape

```text
skill-name/
  SKILL.md
  agents/openai.yaml
  references/
    one-topic.md
  scripts/
    check_something.py
  assets/
    starter-template/
```

Do not add README files inside individual skill folders. The skill itself is the documentation.