# Contributing

Thanks for wanting to help improve this SDK. This document covers how
to file issues, propose changes, and get set up locally.

## Filing issues

Before opening an issue, please search existing issues (open + closed)
to avoid duplicates. Use the templates in
[`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/) — they prompt you
for the info that speeds up triage.

- **Bug reports:** include the SDK version
  (`npm ls @bluemarker/teamleader-focus-js-sdk`), your runtime
  (Node/Deno/Bun version), a minimal reproduction, and what you
  expected vs. what happened.
- **Feature requests:** describe the use case *first*, then the
  proposed API. That helps evaluate alternatives.

## Development setup

```bash
git clone https://github.com/bluemarker-be/teamleader-focus-js-sdk.git
cd teamleader-focus-js-sdk
npm install
npm test
```

### Available scripts

- `npm test` — unit tests (fast, no network)
- `npm run test:integration` — hits the real Teamleader API (needs
  OAuth creds in `.env`; see `.env.example`)
- `npm run build` — compile TypeScript to `dist/`
- `npm run generate` — regenerate types from `api-specs/<latest>.yaml`
- `npm run check-spec` — check for a newer Teamleader spec version
- `npm run diff-spec` — structural diff between local and remote spec

### Integration tests

Integration tests need a Teamleader OAuth2 app and a `.env` file:

```
CLIENT_ID=...
CLIENT_SECRET=...
ACCESS_TOKEN=...
REFRESH_TOKEN=...
```

The suite auto-rotates the refresh token and writes new tokens back
to `.env` so subsequent runs still work.

## Making a change

1. Fork the repo, create a branch (`git checkout -b fix/some-bug`).
2. Keep the diff focused — one thing per PR.
3. Update or add tests as needed. `npm test` must pass.
4. If your change affects the public API, update `CHANGELOG.md`.
5. Open a PR against `main` and fill in the template.

## Code style

- ESM only (`"type": "module"`). No CommonJS shims.
- Zero runtime dependencies. Dev dependencies are fine.
- Match existing patterns in `src/resources/*.ts` — cross-resource
  consistency matters more than local cleverness.

## Syncing the spec

When Teamleader ships a new API spec:

```bash
npm run check-spec -- --update  # fetch new spec + prepend to CHANGELOG
npm run generate                # regenerate types
npm test                        # confirm nothing broke
```

Interim spec bumps land as `chore(spec)` commits. Version-cut releases
consolidate them into a MINOR bump. See past commits for the pattern.

## Reporting security issues

Please do not file security issues publicly. See [SECURITY.md](SECURITY.md).
