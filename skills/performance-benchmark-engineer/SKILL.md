---
name: performance-benchmark-engineer
description: Design trustworthy performance investigations and benchmarks for code, rendering, builds, APIs, devices, data processing, or interactive applications. Use when something is "slow", a rewrite claims to be faster, regressions need quantification, CPU/GPU/memory/frame-time tradeoffs matter, or a benchmark result could be distorted by warmup, caching, unrealistic fixtures, variance, or measuring the wrong boundary.
---

# Performance Benchmark Engineer

Measure the user-relevant bottleneck, not the easiest number.

## Workflow

1. Define the performance question as a comparison or threshold.
2. Choose a representative workload and record hardware/runtime/environment.
3. Define the primary metric before running experiments.
4. Establish baseline measurements.
5. Profile to identify where time/memory is spent.
6. Change one major factor.
7. Repeat enough runs to expose variance and warmup effects.
8. Report distribution or range, not only the single best run.
9. Check that the optimization does not move cost somewhere worse.
10. Keep a reproducible benchmark fixture for future regressions.

## Metric examples

- latency: p50/p95/p99, not only average;
- interactive UI: frame time/jank/input latency;
- Blender/WebGL: viewport frame time, evaluation time, VRAM/RAM, load time;
- batch processing: throughput plus peak memory;
- build/deploy: clean build and incremental build separately;
- network: server processing vs transfer vs client/rendering.

## Benchmark traps

Watch for:

- tiny inputs that fit entirely in cache;
- debug vs release build mismatch;
- first-run compilation/warmup mixed with steady state;
- background processes;
- different data between baseline and candidate;
- measuring a mock path when production includes I/O;
- averaging away long-tail pauses;
- optimizing a microbenchmark that does not move end-to-end latency.

## Optimization order

Prefer eliminating work, reducing data, or reusing results before low-level micro-optimizations.

## Done

A performance claim should include workload, environment, baseline, candidate, metric, variance, profiler evidence, and whether the end-user path actually improved.
