---
name: failure-localization
description: Diagnose technical failures by locating the first boundary where observed behavior diverges from expected behavior, then prove the root cause before changing code. Use when builds, tests, integrations, deployments, UI flows, networking, data pipelines, or device behavior fail unexpectedly; when several components could be responsible; or when repeated speculative fixes have not converged.
---

# Failure Localization

Treat debugging as a search problem over system boundaries.

## Workflow

1. Write the expected path as a sequence of observable boundaries.
2. Reproduce once without changing anything and capture the earliest reliable symptom.
3. Compare a working case to the failing case when one exists.
4. Instrument the boundaries nearest the divergence:
   - input received;
   - transformed state;
   - outgoing request/event;
   - downstream acknowledgement;
   - persisted result;
   - user-visible result.
5. Find the **first** boundary that differs. Work upstream from symptoms, not downstream from guesses.
6. Form one falsifiable hypothesis for that boundary.
7. Run the smallest experiment that distinguishes the hypothesis from its strongest alternative.
8. Only after evidence points to a cause, change the narrowest responsible code/configuration.
9. Re-run the original reproduction plus a nearby regression case.
10. Record the causal chain and the evidence that proves the fix.

## High-value comparisons

Prefer comparisons that remove whole classes of explanations:

- working commit vs failing commit;
- local vs production;
- Wi-Fi vs mobile data;
- one browser/device vs another;
- fixture A vs fixture B;
- old dependency/runtime vs new one;
- direct service access vs proxy/tunnel;
- same input before and after a transformation.

## Regression search

When a behavior used to work and the failing range is bounded, use history as an experiment. Bisect commits/config changes instead of reading every change manually.

## Avoid

- changing several variables before the next observation;
- treating the loudest error as the root cause;
- adding retries to deterministic failures;
- rewriting a subsystem before identifying the first bad boundary;
- accepting "works now" without re-running the original failure path.

## Done

A debugging task is complete when you can state:

1. the first incorrect boundary;
2. the causal mechanism;
3. the evidence that ruled out the main alternatives;
4. the smallest fix;
5. the regression verification.
