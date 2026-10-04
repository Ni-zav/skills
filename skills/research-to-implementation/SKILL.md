---
name: research-to-implementation
description: Turn ambiguous technical requests into evidence-backed implementation work. Use when a task starts with "research/check/figure out what is possible", compares libraries or architectures, asks whether an existing repo/product can support something, or needs research to end in code, tests, documentation, commits, or a concrete handoff instead of a report that stops at recommendations.
---

# Research to Implementation

Treat research as the first phase of delivery, not the final deliverable.

## Workflow

1. Inspect the target repository and existing decisions before searching externally.
2. Convert the request into decision questions. Separate:
   - facts that can be verified;
   - constraints from the current codebase;
   - design choices;
   - unknowns that need experiments.
3. Prefer primary sources: official docs, upstream source, release notes, specifications, and reproducible repository evidence.
4. Record only findings that change a decision. Avoid encyclopedic notes.
5. Build a small decision table when multiple approaches compete: capability, integration cost, maintenance risk, licensing, performance, and reversibility.
6. Choose the narrowest viable approach and state what evidence ruled out the main alternatives.
7. Implement in bounded commits. Preserve existing architecture unless evidence justifies a change.
8. Verify at the real boundary: build, runtime, integration, generated artifact, network path, or target application—not only unit syntax.
9. Put durable findings in the target repo where the next agent will find them.
10. Finish with what changed, evidence run, unresolved risk, and the next concrete gate.

## Evidence hierarchy

Prefer, in order:

1. target repository state and reproducible local behavior;
2. official specification or vendor documentation;
3. upstream source/release notes/issues;
4. reputable technical references;
5. community discussion for symptoms and edge cases.

Do not present a community workaround as a product guarantee.

## Experiment discipline

When documentation is ambiguous, create the smallest falsifiable experiment. Define the expected observation before running it. A failed experiment should eliminate a hypothesis or narrow the next test.

## Repository hygiene

- Keep research notes close to the project when they are project-specific.
- Put reusable cross-project knowledge in a skill/reference instead.
- Do not create duplicate "research", "notes", and "findings" files without a clear source-of-truth rule.
- Prefer incremental commits whose messages describe the decision or capability added.

## Done

A research task is not done because sources were found. It is done when the decision is justified and the requested implementation or actionable handoff is verified.
