# Widget Studio · Playwright verification

> Historický výsledek Widget Studio V1. Aktuální kompletní knihovna a aktivní reference: [Widget System](WIDGET-SYSTEM.md) a [ověření](WIDGET-SYSTEM-REVIEW.md).

## Result · 2. 11. 2026

**44 tests passed, 0 failed, 0 skipped** in the complete `npm run design:test` run. The required `npm ci --ignore-scripts`, `npm run design:setup` and `npm run design:doctor` also completed successfully after adding the test dependency. No catalog HTML, component JavaScript/CSS, assets or Pages workflow changed relative to `main` (`94b862c`). No merge or deployment was performed.

Environment: Playwright **1.64.1**, system Chromium **154.0.8037.57**, Linux x64, pinned Geist fixtures. This is the same environment as the original Design Workflow references. The runtime font request and all fixtures are integrity checked.

## Actually exercised

- Existing catalog tests: **20** (unchanged).
- Widget functional matrix: **16** tests = Find/QR × Small/Large × Dark/Light × desktop1366×768/mobile390×844. Each case checks multiple existing content and interaction states.
- Widget visual matrix: **8** tests = Find/QR × Small/Large × Dark/Light at1366×768; each compares four content states, for **32 new PNG references**. The original eight references remain unchanged; **40 total**.
- Find Phrase: empty, filled asset, filled phrase, demo unavailable; native radio arrows, input editing, Tab/Space, demo availability and Default/Hover/Focus previews. No search backend is mocked or fabricated.
- QR Generator: empty/disabled, valid URL, invalid URL, real result, HTTP(S) validation, live Generate click, actual PNG download, reset/focus, regeneration through Enter with a different URL, and Default/Hover/Focus/Pressed previews in input/result states.
- Independent **jsQR1.4.0** (Apache-2.0, devDependency only) decodes both the actual visible SVG and the downloaded PNG to the exact submitted URL. It also decodes regeneration to the new URL. There is no replacement encoder, fake result or runtime dependency.
- Small remains **320×280**, Large **640×320** in every tested state; no scale. Studio page containment is checked on both viewports. Console/runtime errors fail the shared fixture.
- Representative dark/light Small/Large screenshots were visually inspected. References record current appearance; they do not approve a redesign.

## Reference inventory

All widget references below use the existing component at its defined size in the1366×768 desktop viewport. Mobile functional coverage preserves the same fixed size and allows the existing Studio scroller; it intentionally does not create duplicate pixel goldens.

| Widget | Size | Theme | References |
| --- | --- | --- | --- |
| Find Phrase | Small | Dark | [empty](../tests/design/baselines/chromium-154-linux-x64-dark-desktop/widget-find-small-empty.png) · [asset](../tests/design/baselines/chromium-154-linux-x64-dark-desktop/widget-find-small-asset.png) · [phrase](../tests/design/baselines/chromium-154-linux-x64-dark-desktop/widget-find-small-phrase.png) · [unavailable](../tests/design/baselines/chromium-154-linux-x64-dark-desktop/widget-find-small-unavailable.png) |
| Find Phrase | Small | Light | [empty](../tests/design/baselines/chromium-154-linux-x64-light-desktop/widget-find-small-empty.png) · [asset](../tests/design/baselines/chromium-154-linux-x64-light-desktop/widget-find-small-asset.png) · [phrase](../tests/design/baselines/chromium-154-linux-x64-light-desktop/widget-find-small-phrase.png) · [unavailable](../tests/design/baselines/chromium-154-linux-x64-light-desktop/widget-find-small-unavailable.png) |
| Find Phrase | Large | Dark | [empty](../tests/design/baselines/chromium-154-linux-x64-dark-desktop/widget-find-large-empty.png) · [asset](../tests/design/baselines/chromium-154-linux-x64-dark-desktop/widget-find-large-asset.png) · [phrase](../tests/design/baselines/chromium-154-linux-x64-dark-desktop/widget-find-large-phrase.png) · [unavailable](../tests/design/baselines/chromium-154-linux-x64-dark-desktop/widget-find-large-unavailable.png) |
| Find Phrase | Large | Light | [empty](../tests/design/baselines/chromium-154-linux-x64-light-desktop/widget-find-large-empty.png) · [asset](../tests/design/baselines/chromium-154-linux-x64-light-desktop/widget-find-large-asset.png) · [phrase](../tests/design/baselines/chromium-154-linux-x64-light-desktop/widget-find-large-phrase.png) · [unavailable](../tests/design/baselines/chromium-154-linux-x64-light-desktop/widget-find-large-unavailable.png) |
| QR Generator | Small | Dark | [empty](../tests/design/baselines/chromium-154-linux-x64-dark-desktop/widget-qr-small-empty.png) · [valid](../tests/design/baselines/chromium-154-linux-x64-dark-desktop/widget-qr-small-valid.png) · [invalid](../tests/design/baselines/chromium-154-linux-x64-dark-desktop/widget-qr-small-invalid.png) · [result](../tests/design/baselines/chromium-154-linux-x64-dark-desktop/widget-qr-small-result.png) |
| QR Generator | Small | Light | [empty](../tests/design/baselines/chromium-154-linux-x64-light-desktop/widget-qr-small-empty.png) · [valid](../tests/design/baselines/chromium-154-linux-x64-light-desktop/widget-qr-small-valid.png) · [invalid](../tests/design/baselines/chromium-154-linux-x64-light-desktop/widget-qr-small-invalid.png) · [result](../tests/design/baselines/chromium-154-linux-x64-light-desktop/widget-qr-small-result.png) |
| QR Generator | Large | Dark | [empty](../tests/design/baselines/chromium-154-linux-x64-dark-desktop/widget-qr-large-empty.png) · [valid](../tests/design/baselines/chromium-154-linux-x64-dark-desktop/widget-qr-large-valid.png) · [invalid](../tests/design/baselines/chromium-154-linux-x64-dark-desktop/widget-qr-large-invalid.png) · [result](../tests/design/baselines/chromium-154-linux-x64-dark-desktop/widget-qr-large-result.png) |
| QR Generator | Large | Light | [empty](../tests/design/baselines/chromium-154-linux-x64-light-desktop/widget-qr-large-empty.png) · [valid](../tests/design/baselines/chromium-154-linux-x64-light-desktop/widget-qr-large-valid.png) · [invalid](../tests/design/baselines/chromium-154-linux-x64-light-desktop/widget-qr-large-invalid.png) · [result](../tests/design/baselines/chromium-154-linux-x64-light-desktop/widget-qr-large-result.png) |

[Original references and environment metadata](../tests/design/baselines/) · [Widget functional tests](../tests/design/widget-studio.spec.mjs) · [Widget visual tests](../tests/design/widget-studio.visual.spec.mjs)

## Run and inspect

```sh
npm ci --ignore-scripts
npm run design:setup
npm run design:doctor
npm run design:test
npx --no-install playwright test widget-studio
npm run design:visual
npm run design:screenshots
```

The test report is `playwright-report/design/index.html`, screenshots and traces are in `test-results/design/`, and PNG downloads are attached to the matching functional test. Reports are generated artifacts and are not part of the catalog deployment. `npm run design:visual:update -- --approve` is only for an explicitly reviewed baseline change, not a way to hide a regression.

## Findings and unverified areas

- **Find Phrase search results cannot be tested:** the existing component has no search backend, scan or result view. Only its real existing demo controls were verified.
- Existing mobile Inputs-route overflow from a hidden URL tooltip remains reported by the original tests; no visual fix was made. This is separate from Widget Studio containment.
- Only the recorded Chromium environment was run. Firefox, WebKit, other browser versions, assistive-technology behavior and full animation timing are unverified. Screenshot fixtures use reduced motion.
- Native Codex Web skill auto-discovery/hooks remain unverified/inactive as documented in [Design Workflow](DESIGN-WORKFLOW.md). These are not requirements for running the actual Playwright suite.
- `main` was an ancestor of the setup branch and `git merge-tree` reported a conflict-free merge. The Pull Request creation still requires reachable GitHub API: current proxy returns403 for `api.github.com`. No PR URL is claimed until GitHub confirms creation. A supported environment draft adds only that host and preserves existing font destinations; saving the draft does not apply/publish it.
