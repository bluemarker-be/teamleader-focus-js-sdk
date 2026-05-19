<!--
SYNC IMPACT REPORT
==================
Version change: (unratified template) → 1.0.0
Rationale: First ratification. Previous file contained only template placeholders;
no prior governance content existed to compare against. MAJOR.MINOR.PATCH starts
at 1.0.0 because the principles below describe rules already in force in the
codebase (v1.0.0 of the SDK shipped with explicit semver and zero-dependency
commitments) — this constitution codifies the status quo, it does not propose
new direction.

Modified principles: n/a (initial ratification)
Added sections:
  - Core Principles (6 principles, see below)
  - API Compatibility & Distribution
  - Development Workflow & Quality Gates
  - Governance

Removed sections: n/a

Templates requiring updates:
  ✅ .specify/templates/plan-template.md — Constitution Check section made concrete
  ✅ .specify/templates/spec-template.md — no change required (feature-spec
     concerns are runtime-agnostic; principles bite at plan/tasks/implement)
  ✅ .specify/templates/tasks-template.md — no change required (task structure
     is principle-agnostic; principle compliance is enforced by plan gates)
  ✅ CLAUDE.md — no change required (delegates to active plan; principles are
     reached via the plan that references this file)

Deferred items: none.
-->

# Teamleader Focus JS SDK Constitution

## Core Principles

### I. Spec-Generated Types Are the Source of Truth (NON-NEGOTIABLE)

All public TypeScript types describing Teamleader API request/response shapes
MUST be generated from a versioned OpenAPI spec file under `api-specs/` via
`npm run generate`. `src/types/generated.ts` MUST NOT be hand-edited. Where
the upstream spec is wrong or incomplete, corrections live as version-controlled
post-generation patches in `scripts/generate-types.ts`; each patch MUST fail
loudly (exit 1) if it no longer applies cleanly, so spec drift is detected
rather than silently absorbed.

**Rationale**: The SDK's correctness contract with users is "what the API
says, your editor knows." Hand-edited types break that contract the first
time someone forgets to mirror an upstream change. Patches over generation
keep us honest: drift surfaces as a build failure, not as a runtime surprise
in a customer Edge Function.

### II. Strict Semantic Versioning Post-1.0 (NON-NEGOTIABLE)

The SDK has committed publicly (`CHANGELOG.md`, v1.0.0) that:

- MAJOR (`X.0.0`) is the ONLY release line allowed to introduce breaking
  changes to the public API surface (exported classes, method signatures,
  exported types, error class shapes, OAuth helper signatures).
- MINOR (`1.X.0`) MAY add new resources, new methods, new optional parameters,
  new exported helpers, and new exported types. It MUST NOT change or remove
  existing ones.
- PATCH (`1.0.X`) is reserved for bug fixes and internal changes invisible
  at the type level.
- Adding a method whose existence is driven purely by an upstream spec
  addition (e.g. a new endpoint Teamleader shipped) is a MINOR, not PATCH —
  it grows the surface.
- Removing or renaming an exported symbol — even one believed unused —
  requires a MAJOR.

**Rationale**: The SDK ships into ~100 production Supabase Edge Functions
pinned by git tag. A misclassified bump silently breaks deployments that
trusted the version range. The CHANGELOG promise is load-bearing; this
principle is what makes it true.

### III. Multi-Runtime Portability (NON-NEGOTIABLE)

Source code under `src/` MUST run unmodified on Node.js ≥18, Deno (including
Supabase Edge Functions), and modern browsers. This implies:

- No Node-only built-ins (`fs`, `path`, `child_process`, `http`, `crypto`
  via `node:` specifier, etc.) in `src/`. Use the platform `fetch`,
  `AbortController`, `crypto.subtle`, `TextEncoder`, and Web Streams.
- ESM only. No CommonJS, no `require`, no dual builds.
- No bundler-specific syntax (no `import.meta.glob`, no `process.env`
  reads in library code — config comes through the constructor).
- Imports between SDK files MUST use explicit `.js` extensions so Deno
  can resolve them directly from the published `dist/`.

Scripts under `scripts/` and tests are exempt — they may use Node APIs.

**Rationale**: Half the deployment targets in production are Deno Edge
Functions importing the built JS directly from a raw GitHub URL. A single
`import "node:fs"` in `src/` silently breaks those at runtime; we will not
notice in Node tests. The constraint must be a design rule, not a vibe.

### IV. Zero Runtime Dependencies (NON-NEGOTIABLE)

`package.json` MUST list NO entries under `"dependencies"`. Everything the
SDK needs at runtime — HTTP, retry, backoff, pagination, OAuth, error
parsing, custom-field access — MUST be implemented in-house using platform
primitives. `"devDependencies"` are unrestricted (TypeScript, Vitest,
`openapi-typescript`, etc. are required and have no runtime impact).

**Rationale**: Every transitive dep is a supply-chain surface a customer
inherits when they install the SDK into their Edge Function. The SDK is
small enough that this is achievable; staying small is itself the discipline
that keeps it achievable. The cost of writing our own retry loop is much
lower than the cost of a single CVE in a transitive dep paging an oncall.

### V. Typed Errors with Useful Defaults

Every HTTP failure path MUST surface as a `TeamleaderFocusError` subclass
that (a) is distinct from sibling failure modes (auth ≠ rate limit ≠
validation ≠ not-found ≠ server), (b) exposes typed accessors over
Teamleader's `{ errors: [...] }` body (`err.errors`, `err.title`,
`err.field`), and (c) carries a `message` informative enough that an
unhandled throw logs the actual problem, not a generic class name.
`err.body` remains the escape hatch for the raw parsed JSON. Error class
identity is part of the public API surface (see Principle II).

**Rationale**: SDKs that throw `new Error("Request failed")` push the
parsing burden onto every caller, and every caller gets it slightly wrong.
The matrix of cleanup behaviors customers need to express in Edge Functions
(retry vs. abort vs. surface to user vs. swallow) requires distinguishable
errors. We pay the cost once, here, so they don't pay it 100 times.

### VI. Live Integration Verification

Every public method MUST be covered by an integration test under
`tests/integration/` that exercises it against the real Teamleader API,
not a mock. Coverage is tracked per resource by
`npm run verify:endpoints` / `npm run test:coverage`; a missing live
verification for a new method blocks release. Unit tests (Vitest under
`tests/*.test.ts`) remain valuable for protocol logic (retry math,
paginator state, refresh-mutex deduplication) but do not substitute for
a live call.

**Rationale**: Generated types tell us the shape Teamleader *promised*.
Live integration tells us the shape Teamleader *ships*. Past incidents
have caught spec/runtime divergence (void-response endpoints, file upload
2-step flow byte mismatches) that no mocked test would have surfaced.

## API Compatibility & Distribution

The SDK is consumed by:

1. **Node.js / Bun** projects via `npm install git+...#vX.Y.Z` pinning a
   git tag. Customers MUST be able to pin and stay pinned indefinitely
   without breakage within a MAJOR line.
2. **Deno / Supabase Edge Functions** importing from
   `https://raw.githubusercontent.com/operative-bv/teamleader-focus-js-sdk/vX.Y.Z/dist/index.js`.
   Sub-imports resolve relatively, so the entire SDK MUST be self-contained
   under `dist/` after build.

Distribution rules:

- The `dist/` directory is shipped via git tags. Every release MUST commit
  a freshly built `dist/` so URL-based imports work.
- Tags MUST match the `package.json` version exactly (`vX.Y.Z`) and MUST
  correspond to a `CHANGELOG.md` entry that names every public-API change.
- The Teamleader `X-API-Version` header pin is configurable on the client
  (`apiVersion` option) but defaults to the version the bundled spec was
  generated against; changing the default is a MINOR (behavior change
  observable to callers).
- Deprecation: an exported symbol slated for removal MUST be deprecated
  in a MINOR release with a JSDoc `@deprecated` tag and a CHANGELOG note
  for at least one MINOR release before removal in the next MAJOR.

## Development Workflow & Quality Gates

Before any release tag is pushed:

1. **Spec sync**: `npm run check-spec` shows no unreviewed upstream
   changes; if `npm run diff-spec` reports new endpoints, they are either
   implemented (MINOR) or explicitly deferred with a note in CHANGELOG.
2. **Type generation**: `npm run generate` succeeds with all
   post-generation patches applying cleanly (no drift report).
3. **Build**: `npm run build` produces a fresh `dist/` with no TypeScript
   errors.
4. **Unit tests**: `npm test` passes.
5. **Integration tests**: `npm run test:integration` passes against the
   live API.
6. **Endpoint coverage**: `npm run verify:endpoints` reports no public
   method missing live coverage.
7. **CHANGELOG**: an entry exists for the new version naming every public
   addition, change, removal, and deprecation.

For ordinary feature work (not releases): tests for new public methods
are required before merge; unit tests for protocol changes (retry,
pagination, refresh) are required before merge; live integration tests
SHOULD land in the same PR but MAY follow within the next PR for purely
generated additions.

## Governance

This constitution supersedes ad-hoc conventions. Where a contributor's
intuition or a tool's default conflicts with a principle here, the
principle wins; the conflicting practice MUST be changed.

**Amendments**: any change to this file MUST update the version line
below according to the bump rules in Principle II (MAJOR for removing or
redefining a principle, MINOR for adding a principle or section or
materially expanding guidance, PATCH for wording and clarification).
Every amendment MUST update `LAST_AMENDED` to the date of the commit and
prepend a Sync Impact Report comment at the top of this file naming the
templates and docs touched.

**Compliance review**: PRs touching `src/`, `package.json`, the build
output (`dist/`), or `api-specs/` MUST be reviewed against the relevant
principles. The principle most often violated in practice — and therefore
the one to check first — is Principle III (multi-runtime portability);
the easiest way to break it is also the silent way (a Node-only import
slipping into `src/`).

**Runtime guidance for contributors**: implementation specifics
(file layout, helper conventions, current test commands) live in
`README.md` and per-feature plans under `specs/`. This constitution
stays principle-level and changes rarely; those documents change as
the code does.

**Version**: 1.0.0 | **Ratified**: 2026-05-19 | **Last Amended**: 2026-05-19
