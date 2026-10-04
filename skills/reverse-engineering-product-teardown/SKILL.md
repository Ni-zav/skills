---
name: reverse-engineering-product-teardown
description: Analyze how an existing software product or technical system is likely built by combining observable behavior, public artifacts, file formats, network traces the user is authorized to inspect, documentation, binaries/source when lawfully available, and controlled experiments. Use when researching a competitor/tool architecture, recreating a capability, documenting a proprietary workflow for interoperability, or deciding which parts can be reproduced without guessing from UI appearance alone.
---

# Product Teardown and Reverse Engineering

Separate observation from inference.

## Evidence classes

Label findings as:

- **observed** — directly measured/seen;
- **documented** — stated by an authoritative public source;
- **inferred** — best explanation of observations;
- **unknown** — not established.

Never present an inference as a discovered implementation fact.

## Workflow

1. Define the capability being studied, not "reverse engineer everything".
2. Inventory lawful/public/authorized evidence:
   - product behavior;
   - public docs/API/SDK;
   - exported files;
   - logs/network calls from the user's own environment;
   - package metadata;
   - source or binaries the user is authorized to inspect.
3. Build a black-box input/output matrix.
4. Change one input dimension at a time.
5. Inspect persistent/exported artifacts for stable structure.
6. Infer the smallest architecture consistent with observations.
7. Test the inference with a prediction that has not already been observed.
8. Implement an independent compatible behavior where requested.
9. Document uncertain areas and avoid unnecessary dependence on hidden implementation details.

## Interoperability over cloning

When the user's goal is compatibility, target the observable contract: file schema, protocol, coordinate convention, API behavior, user workflow, or output quality. Internal architecture can be completely different.

## Safety and boundaries

Do not bypass access controls, licensing checks, authentication, DRM, or security protections. Do not obtain secrets or data belonging to others. Prefer public documentation, user-owned data, and controlled experiments.

## Teardown output

A useful teardown includes:

- capability map;
- evidence table;
- likely architecture;
- confidence by component;
- reproducible experiments;
- open questions;
- implementation opportunities;
- legal/license/interoperability constraints when relevant.

## Done

The teardown should enable a concrete decision or prototype while keeping observations, hypotheses, and unknowns clearly distinct.
