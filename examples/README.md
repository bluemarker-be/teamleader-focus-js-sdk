# Examples

Reference implementations showing how to use the SDK in real deployments.

## Supabase Edge Function — companies + contacts workflow

[`supabase-companies-and-contacts.ts`](./supabase-companies-and-contacts.ts)

Demonstrates:
- Token persistence via a Supabase table (tokens rotate — the SDK writes
  fresh ones back via `onTokenRefresh`)
- `getTokens` callback for multi-process safety (concurrent Edge Function
  invocations can share the same DB-backed tokens)
- Full pagination of `/companies.list` via `client.paginateItems`
- Creating 3 contacts with structured field names
- Linking each contact to the first company
- **Cleanup on partial failure** — if contact #2 creates successfully but
  linking fails, contact #1 and #2 are deleted before the error is returned
- Exhaustive error mapping: every `TeamleaderError` subclass maps to a
  meaningful HTTP status + code + body

### Running locally

```bash
supabase functions serve companies-and-contacts
curl -X POST http://localhost:54321/functions/v1/companies-and-contacts \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY"
```

### Deploying

```bash
supabase functions deploy companies-and-contacts
supabase secrets set TEAMLEADER_CLIENT_ID=... TEAMLEADER_CLIENT_SECRET=...
```

### Distributing the SDK to the Edge Function

Because the SDK is in a private GitHub repo, Deno's Edge Runtime can't
install it directly. Two options:

1. **Vendor the SDK**: copy `dist/` into `supabase/functions/_shared/teamleader/`
   and import with a relative path (this example does that).
2. **Publish to a registry**: if you later publish to npm or JSR, use
   `import ... from "npm:teamleader-focus-js-sdk"` instead.
