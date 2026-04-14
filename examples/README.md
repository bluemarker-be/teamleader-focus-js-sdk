# Examples

Reference implementations showing how to use the SDK.

## Supabase Edge Function — importing from a private GitHub repo

[`supabase-with-private-import.ts`](./supabase-with-private-import.ts)

Shows the **recommended** way to consume this SDK in Supabase Edge Functions:
direct URL import from the private GitHub repo, authenticated via
`DENO_AUTH_TOKENS`. No `dist/` copy, no sync-on-update — bump the version by
changing one URL.

See the [main README's installation section](../README.md#deno--supabase-edge-functions)
for setup steps (PAT creation, Supabase secrets, deploy).

## Supabase Edge Function — companies + contacts workflow

[`supabase-companies-and-contacts.ts`](./supabase-companies-and-contacts.ts)

A minimal Supabase Edge Function that:

1. Iterates all companies via `for await (const c of teamleader.companies.list())` — auto-paginates
2. Creates 3 contacts with `teamleader.contacts.add(...)`
3. Links each contact to the first company with `teamleader.contacts.linkToCompany(...)`
4. Catches any `TeamleaderFocusError` and returns a matching HTTP status

### Setup

Either:
- **Recommended:** Import from `https://raw.githubusercontent.com/...` as shown
  in `supabase-with-private-import.ts` (requires `DENO_AUTH_TOKENS`), or
- **Alternative:** Copy the SDK's `dist/` into
  `supabase/functions/_shared/teamleader/` and import via relative path.

Then set the access token secret:
   ```bash
   supabase secrets set TEAMLEADER_ACCESS_TOKEN=...
   ```

### Deploy

```bash
supabase functions deploy companies-and-contacts
```

### Production notes

The example uses a single access token from an env var for simplicity.
For production you'll likely want:

- **Token persistence**: Teamleader refresh tokens are single-use and rotate
  on every refresh. Store them in a Supabase table and pass `refreshToken` +
  `clientId` + `clientSecret` + an `onTokenRefresh` callback that writes the
  new tokens back to the table.
- **Multi-process safety**: if multiple Edge Function invocations run
  concurrently, pass a `getTokens` callback that re-reads the latest tokens
  from your table before each request (see `tests/integration/setup.ts`
  for an example of that pattern).
- **Cleanup on partial failure**: if contact 2 of 3 succeeds but linking
  fails, you may want to delete the created contacts before returning the
  error. Track created IDs in a list and delete them in a catch block.
