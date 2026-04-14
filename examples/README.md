# Examples

Reference implementations showing how to use the SDK.

## Supabase Edge Function — companies + contacts

[`supabase-companies-and-contacts.ts`](./supabase-companies-and-contacts.ts)

A minimal Supabase Edge Function that:

1. Paginates all companies via `teamleader.paginateItems("/companies.list")`
2. Creates 3 contacts with `teamleader.contacts.add(...)`
3. Links each contact to the first company with `teamleader.contacts.linkToCompany(...)`
4. Catches any `TeamleaderFocusError` and returns a matching HTTP status

### Setup

1. Copy the SDK's `dist/` into `supabase/functions/_shared/teamleader/`
   (the Deno Edge Runtime cannot install from a private git repo).
2. Set the access token secret:
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
