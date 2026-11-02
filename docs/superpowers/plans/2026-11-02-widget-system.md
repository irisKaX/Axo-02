# Complete Widget System Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans for inline implementation. Steps use checkbox syntax.

**Goal:** Extend the existing Studio to ten tools, twenty fixed-size compositions, without a Dashboard or deployment.
**Architecture:** A registry owns metadata, rendering and instance lifecycle. Tool compositions reuse catalog inputs/buttons and existing QR logic; the Studio owns selection, comparisons and diagnostics. Composition Lab remains unchanged.
**Tech Stack:** Existing vanilla JavaScript, CSS tokens, vendored QR encoder, Playwright.
**Spec:** User request “AXO-02 · Complete Widget System”, recorded in docs/WIDGET-SYSTEM.md.

## Global Constraints

320 × 280 / 640 × 320 CSS px; Geist and existing tokens; no override layers or !important; no new backend; no main merge/deployment; one feature branch.

## Review Focus

- Long user input must not widen cards or introduce HTML.
- Multiple instances must have independent state and IDs.
- Destroyed instances must release handlers and pending exports.
- All fixture states must be visibly distinguishable from real tool output.
- Narrow viewports must scroll the preview internally without distorting it.

### 1. Registry and compositions

- [x] Add failing Playwright coverage for ten entries, required methods, fixed sizes and independent instances.
- [x] Implement components/widget-registry.js and widget-system.css; retain existing QR controller with optional scoped selectors/lifecycle cleanup.
- [x] Verify twenty compositions, fixtures, serializable state, long inputs and destroy.

### 2. Integrated Studio

- [x] Replace canonical widget-studio.js/css with selection, states, comparison and library views; integrate assets in index.html.
- [x] Verify keyboard, drafts, route lifecycle and mobile internal scrolling.

### 3. Evidence and review

- [x] Extend existing tests, retain catalog regression tests and archive old Studio references as historical (never silently regenerate).
- [x] Capture all twenty variants in both themes plus full-library views; inspect before creating any new baseline.
- [x] Run Impeccable critique/detection and full Playwright; document real/demo/unconnected capabilities and limitations.
- [x] Commit and push feature branch only.
