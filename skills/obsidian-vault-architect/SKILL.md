---
name: obsidian-vault-architect
description: Design and evolve a long-lived Obsidian vault's information architecture, note schemas, links, properties/frontmatter, attachments, templates, indexes, migrations, and automation boundaries. Use when consolidating multiple vaults, cleaning duplicated folder structures, designing a single personal knowledge base, changing note schemas safely, organizing research/projects/daily notes, or when plugins/bots need a stable vault model to write into.
---

# Obsidian Vault Architect

Optimize for retrieval and durable files, not folder cleverness.

## Principles

- Markdown files remain useful without any one plugin.
- Folders answer "where is the source-of-truth file"; links/properties answer richer relationships.
- Prefer a small number of stable note types over dozens of folder-specific exceptions.
- Automations should target documented schemas and inboxes, not rewrite arbitrary notes.
- Preserve provenance for imported/research material.
- Migrations must be reversible or backed up.

## Architecture workflow

1. Inventory real note types and current retrieval habits.
2. Identify duplicate concepts and competing sources of truth.
3. Define a minimal set of durable zones, for example:
   - inbox/capture;
   - projects;
   - areas/ongoing responsibilities;
   - references/research;
   - daily/journal;
   - attachments/archive.
4. Define schemas only where structured fields power useful queries or automation.
5. Pick stable identifiers/links for entities that appear across many notes.
6. Design templates from the schema rather than the other way around.
7. Migrate a representative subset.
8. Check broken/unresolved links, attachments, queries, and sync behavior.
9. Expand migration, then remove obsolete structures only after verification.

## File modification

When implementing via an Obsidian plugin, prefer Obsidian's Vault/FileManager APIs instead of bypassing them with raw filesystem operations. For read-modify-write operations, use APIs that avoid overwriting concurrent changes.

Do not develop destructive migration logic directly against the only copy of a personal vault.

## Frontmatter/properties

Use properties for fields that have consistent semantics across a note type. Do not turn every natural-language detail into metadata.

Document:

- field name;
- type;
- allowed values if constrained;
- default behavior;
- whether automation owns it or the human does.

## Automation boundary

Bots/gateways should usually append/create into defined capture surfaces. A later organization step can classify and link. Avoid allowing every capture source to invent its own taxonomy.

Read `references/vault-api-notes.md` when writing migration/plugin code.
