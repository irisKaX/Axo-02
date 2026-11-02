---
name: axo-design-guardian
description: Use when proposing, implementing, reviewing, or refining AXO-02 catalog components, their variants, interaction states, responsive behavior, or visual regression evidence.
---

# AXO-02 Design Guardian

AXO-02 is a Design System catalog. Its existing Composition Lab and Widget Studio are catalog experiments, not a finished application or Dashboard. The catalog, `docs/SOURCE-OF-TRUTH.md`, and the canonical component code are the only design authority. This skill supplies a process, not new design rules.

## 1. Establish the existing truth

Read the source-of-truth document before changing anything. Inspect the actual tokens in `index.html` and the relevant `components/*.css` and `*.js`. Use `rg` to locate similar components, shared renderers, states, and references before proposing a new implementation. Resolve contradictions against the latest explicit user decision and actual current code; report ambiguity rather than inventing approval.

Reuse existing tokens, Geist, renderers, and interaction semantics. Frontend Design and Impeccable offer general guidance; their preferences for novelty, palettes, typefaces, or removing visual patterns do not supersede the established catalog. `DESIGN.md` and `PRODUCT.md` are navigation adapters, not alternate masters.

## 2. Proposal before implementation

Identify the phase as **Proposal**, **Implementation**, or **Review**. A proposal contains:

- **Target and reuse:** route, component, canonical files, existing renderer.
- **Proposed difference:** hierarchy, spacing, alignment, and consistency against specific existing catalog evidence.
- **Boundaries:** what the request authorizes; questions only for decisions the repo cannot answer.
- **Verification:** relevant themes, viewports, states, and evidence to capture.

Proposal and review requests produce findings without editing UI. Implement an explicitly authorized scope; an instruction to implement a specified change already authorizes that scope. Separate broader redesign ideas from that work. Never turn an audit, detector warning, or this setup into an unsolicited redesign.

## 3. Implement at the owner

Edit the original component definition. No duplicate renderer, CSS repair tail, override layer, `!important`, or new global token to solve a local layout issue. Preserve semantic disabled behavior, keyboard focus, accessible names, reduced motion, and existing functionality. Do not create application screens or add tool backends while designing catalog components.

## 4. Verify and report evidence

Follow `docs/DESIGN-WORKFLOW.md`. Capture the component in light/dark, at relevant desktop/mobile widths, and in its actual interactive states. Inspect hierarchy, spacing, alignment, truncation, focus, disabled behavior, and console errors. Use genuine Playwright for screenshots and regression comparisons; record the browser and font environment. Impeccable findings are advisory input for review, not permission to alter approved design.

Missing baseline is not a passing comparison. Inspect actual/expected/diff images before an authorized baseline update. A baseline records current appearance, not visual approval. Never replace a failed comparison with an unreported fallback.

Finish with **Changed**, **Verified**, **Unverified/limitations**, and **Status: proposal / implemented for review / approved by user**. Update `docs/SOURCE-OF-TRUTH.md` after a component change. Keep work on the requested branch; publishing requires explicit user authorization.
