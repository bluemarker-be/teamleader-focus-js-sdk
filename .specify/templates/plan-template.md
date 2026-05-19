# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]

**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]

**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]

**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]

**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]

**Project Type**: [e.g., library/cli/web-service/mobile-app/compiler/desktop-app or NEEDS CLARIFICATION]

**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]

**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]

**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

*Source: `.specify/memory/constitution.md` (v1.0.0). Answer each gate
explicitly — "N/A" is a valid answer when justified, but blank or
hand-waved gates fail the check.*

- [ ] **I. Spec-Generated Types**: Does this feature touch
  `src/types/generated.ts`? If yes, the change MUST come from
  regenerating against an updated `api-specs/*.yaml` (and possibly a new
  patch in `scripts/generate-types.ts`). Hand-edits are forbidden.
- [ ] **II. Strict Semver Post-1.0**: Classify the public-API impact —
  PATCH (no surface change), MINOR (additions only), or MAJOR (changes/
  removals). State the target version bump. If MAJOR, name the breaking
  change(s) and confirm a deprecation MINOR shipped at least one release
  earlier (or document why an exception is justified).
- [ ] **III. Multi-Runtime Portability**: Will any new code under `src/`
  use platform-only APIs? List every `import` statement that's not from
  another `src/` file or a standard Web API (`fetch`, `crypto.subtle`,
  `TextEncoder`, `AbortController`, Web Streams). Anything Node-only
  (`node:fs`, `node:path`, `process`, etc.) fails the gate.
- [ ] **IV. Zero Runtime Dependencies**: Does this feature add any entry
  to `package.json` `"dependencies"`? If yes, the gate fails — design an
  in-house alternative or escalate as a constitutional amendment.
- [ ] **V. Typed Errors**: Does this feature introduce a new failure
  mode? If yes, name the `TeamleaderFocusError` subclass (existing or
  new) it surfaces as, the typed accessors it exposes, and confirm the
  `message` is informative without a custom handler.
- [ ] **VI. Live Integration Verification**: List the integration test(s)
  under `tests/integration/` that will cover each new public method
  against the live API. If the feature is purely internal (Principle I/IV
  /protocol logic), state that and rely on unit tests.

If any gate fails, document the violation in **Complexity Tracking**
below with explicit justification; an unjustified failure blocks Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
