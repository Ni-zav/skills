---
name: oss-adoption-evaluator
description: Evaluate whether an open-source project, library, SDK, self-hosted service, or vendor-backed repository is suitable for production adoption. Use when deciding build-vs-adopt, comparing multiple libraries, replacing a paid service, embedding GPL or other licensed software, assessing maintenance/security risk, or deciding whether a project is mature enough to become a dependency or product foundation.
---

# OSS Adoption Evaluator

A repository being popular is not the same as being adoptable.

## Evaluation dimensions

1. **Capability fit** — required features and unsupported edges.
2. **Integration fit** — language/runtime/architecture and operational burden.
3. **Maintenance** — release cadence, issue/PR responsiveness, maintainer concentration, roadmap.
4. **Security posture** — update practices, dependency hygiene, advisories, signing/provenance where relevant.
5. **License** — obligations for linking, distribution, modification, network use, assets/models, and bundled dependencies.
6. **Performance/scale** — evidence under representative workloads.
7. **Exit cost** — how difficult it is to replace later.
8. **Commercial/vendor risk** — open core, hosted dependency, trademark/API restrictions, abandoned components.
9. **Proof quality** — docs/demo claims vs reproducible behavior.

## Workflow

1. Write the non-negotiable requirements.
2. Inspect source/release/license directly.
3. Check recent activity and whether critical issues receive maintainer attention.
4. Check security signals. Use tools such as OpenSSF Scorecard as one input, not a substitute for review.
5. Build a small proof of concept around the hardest required capability.
6. Identify code/data that would become coupled to the dependency.
7. Compare with the strongest alternative and the cost of building the missing piece internally.
8. Produce adopt / adopt-with-guardrails / do-not-adopt.

## License rule

Never infer license compatibility from a README badge alone. Inspect the actual license files and the distribution architecture. Flag legal uncertainty rather than inventing certainty.

## Done

The recommendation must state the critical evidence, missing capability, maintenance/security/license risks, exit strategy, and a concrete PoC result when adoption would be consequential.
