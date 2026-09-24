# Teamleader Focus SDK

Fully typed TypeScript SDK for the [Teamleader Focus API](https://developer.teamleader.eu/). Zero dependencies, ESM-only, works in Node.js, Deno (e.g. Supabase Edge Functions/Xano), and browsers.

Types are auto-generated from the official OpenAPI spec — your editor gives you autocomplete on every parameter and response field. For field-level documentation, refer to the [Teamleader API docs](https://developer.teamleader.eu/).

## Installation

### Node.js / Bun

```bash
npm install @bluemarker/teamleader-focus-js-sdk
# or: pnpm add @bluemarker/teamleader-focus-js-sdk
# or: bun add @bluemarker/teamleader-focus-js-sdk
```

### Deno / Supabase Edge Functions

Import directly via Deno's npm specifier — no auth token needed:

```ts
// supabase/functions/my-function/index.ts
import { TeamleaderFocusClient } from "npm:@bluemarker/teamleader-focus-js-sdk@^1.2.0";
```

Or via a CDN like esm.sh if you prefer HTTP imports:

```ts
import { TeamleaderFocusClient } from "https://esm.sh/@bluemarker/teamleader-focus-js-sdk@1.2.0";
```

## Setup

### Get your credentials

1. Register a Teamleader Focus OAuth2 application at the
   [Teamleader Marketplace](https://marketplace.teamleader.eu/).
2. Note your `client_id` and `client_secret`.
3. Complete the OAuth2 flow to obtain an `access_token` and
   `refresh_token` — see [OAuth2 flow](#oauth2-flow) below for the
   built-in helpers.

### Basic client

```typescript
import { TeamleaderFocusClient } from "@bluemarker/teamleader-focus-js-sdk";

const teamleader = new TeamleaderFocusClient({
  accessToken: "your-access-token",
});
```

### With automatic token refresh

```typescript
const teamleader = new TeamleaderFocusClient({
  accessToken: "...",
  refreshToken: "...",
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  onTokenRefresh: (tokens) => {
    // Store the new tokens (e.g. in database)
    console.log(tokens.access_token, tokens.refresh_token);
  },
});
```

### Other config

```typescript
const teamleader = new TeamleaderFocusClient({
  accessToken: "...",
  userAgent: "MyApp/1.2",          // identify your integration in TL's logs
  signal: abortController.signal,  // cancel all requests from this client
  timeout: 30_000,                 // per-request timeout in ms
  maxRetries: 3,                   // retries on 429/500/502/503
  apiVersion: "2023-09-26",        // pin X-API-Version header
});
```

### Reading custom fields

```typescript
import { customField } from "@bluemarker/teamleader-focus-js-sdk";

const { data: contact } = await teamleader.contacts.info({ id: "abc" });
const birthday = customField<string>(contact, "bf6765de-56eb-40ec-ad14-9096c5dc5fe1");
```

## Usage

```typescript
// List contacts — .list() returns an async iterator that auto-paginates
for await (const contact of teamleader.contacts.list({ filter: { term: "John" } })) {
  console.log(contact.first_name, contact.last_name);
}

// Collect all items into an array
const contacts = [];
for await (const c of teamleader.contacts.list()) contacts.push(c);

// Safety limit — stop after N pages
for await (const c of teamleader.contacts.list({}, { maxPages: 3 })) {
  // …
}

// Get a single deal
const { data: deal } = await teamleader.deals.info({ id: "deal-uuid" });

// Create a company
const { data: created } = await teamleader.companies.add({
  name: "Acme Corp",
});

// Update (returns void)
await teamleader.contacts.update({ id: "uuid", first_name: "Jane" });

// Delete (returns void)
await teamleader.contacts.delete({ id: "uuid" });
```

All 68 resources are available — see the full list below.

## Resources

| Resource | Methods |
| --- | --- |
| `accounts` | `projectsV2Status` |
| `activityTypes` | `list` |
| `bookkeepingSubmissions` | `list` |
| `businessTypes` | `list` |
| `callOutcomes` | `list` |
| `calls` | `list` `info` `add` `update` `delete` `complete` |
| `closingDays` | `list` `add` `delete` |
| `cloudPlatforms` | `url` |
| `commercialDiscounts` | `list` |
| `companies` | `list` `info` `add` `update` `delete` `tag` `untag` `uploadLogo` |
| `contacts` | `list` `info` `add` `update` `delete` `tag` `untag` `linkToCompany` `unlinkFromCompany` `updateCompanyLink` `uploadAvatar` |
| `creditNotes` | `list` `info` `download` `sendViaPeppol` |
| `currencies` | `exchangeRates` |
| `customFieldDefinitions` | `create` `list` `info` |
| `dayOffTypes` | `list` `create` `update` `delete` |
| `daysOff` | `import` `bulkDelete` |
| `dealPhases` | `list` `create` `update` `move` `delete` |
| `dealPipelines` | `list` `create` `update` `markAsDefault` `duplicate` `delete` |
| `dealSources` | `list` |
| `deals` | `list` `info` `create` `update` `move` `win` `lose` `delete` |
| `departments` | `list` `info` |
| `documentTemplates` | `list` |
| `emailTracking` | `list` `create` |
| `events` | `list` `info` `create` `update` `cancel` |
| `expenses` | `list` |
| `externalParties` | `addToProject` `update` `delete` |
| `files` | `list` `info` `upload` `download` `delete` |
| `incomingCreditNotes` | `add` `info` `update` `delete` `approve` `refuse` `markAsPendingReview` `sendToBookkeeping` `listPayments` `registerPayment` `removePayment` `updatePayment` |
| `incomingInvoices` | `add` `info` `update` `delete` `approve` `refuse` `markAsPendingReview` `sendToBookkeeping` `listPayments` `registerPayment` `removePayment` `updatePayment` |
| `invoices` | `list` `info` `download` `draft` `update` `updateBooked` `copy` `book` `delete` `registerPayment` `removePayments` `credit` `creditPartially` `send` `sendViaPeppol` |
| `legacyMilestones` | `list` `info` `create` `update` `delete` `close` `open` |
| `legacyProjects` | `list` `info` `create` `update` `close` `reopen` `delete` `addParticipant` `updateParticipant` |
| `levelTwoAreas` | `list` |
| `lostReasons` | `list` |
| `mailTemplates` | `list` |
| `meetings` | `list` `info` `schedule` `update` `complete` `createReport` `delete` |
| `migrate` | `id` `taxRate` `activityType` |
| `notes` | `list` `create` `update` `delete` |
| `orders` | `list` `info` |
| `paymentMethods` | `list` |
| `paymentTerms` | `list` |
| `plannableItems` | `list` `info` |
| `priceLists` | `list` |
| `productCategories` | `list` |
| `products` | `list` `info` `add` `update` `delete` |
| `projectGroups` | `list` `info` `create` `update` `duplicate` `delete` `assign` `unassign` |
| `projectLines` | `list` `addToGroup` `removeFromGroup` |
| `projectMaterials` | `list` `info` `create` `update` `duplicate` `delete` `assign` `unassign` |
| `projectTasks` | `list` `info` `create` `update` `duplicate` `delete` `assign` `unassign` |
| `projects` | `list` `info` `create` `update` `close` `reopen` `duplicate` `delete` `addOwner` `removeOwner` `assign` `unassign` `addCustomer` `removeCustomer` `addDeal` `removeDeal` `addQuotation` `removeQuotation` |
| `quotations` | `list` `info` `download` `create` `send` `update` `accept` `delete` |
| `receipts` | `add` `info` `update` `delete` `approve` `refuse` `markAsPendingReview` `sendToBookkeeping` `listPayments` `registerPayment` `removePayment` `updatePayment` |
| `reservations` | `list` `create` `update` `delete` |
| `subscriptions` | `list` `info` `create` `update` `deactivate` |
| `tags` | `list` |
| `tasks` | `list` `info` `create` `update` `complete` `reopen` `schedule` `delete` |
| `taxRates` | `list` |
| `teams` | `list` |
| `ticketStatus` | `list` |
| `tickets` | `list` `info` `create` `update` `listMessages` `getMessage` `addReply` `addInternalMessage` `importMessage` |
| `timeTracking` | `list` `info` `add` `update` `resume` `delete` |
| `timers` | `current` `start` `stop` `update` |
| `unitsOfMeasure` | `list` |
| `userAvailability` | `total` `daily` |
| `userSchedules` | `list` |
| `users` | `me` `list` `info` `listDaysOff` `getWeekSchedule` |
| `webhooks` | `register` `list` `unregister` |
| `withholdingTaxRates` | `list` |
| `workTypes` | `list` |

## Examples

See the [`examples/` folder on GitHub](https://github.com/bluemarker-be/teamleader-focus-js-sdk/tree/main/examples)
for end-to-end reference implementations — including a Supabase Edge
Function that paginates companies, creates contacts, links them, and
handles every `TeamleaderFocusError` subclass with cleanup-on-failure.

## OAuth2 flow

If your users need to authorize via Teamleader's OAuth2 flow:

```typescript
import {
  createAuthorizationUrl,
  exchangeCodeForTokens,
  refreshTokens,
} from "@bluemarker/teamleader-focus-js-sdk";

// Step 1: Redirect user to Teamleader
const url = createAuthorizationUrl({
  clientId: "your-client-id",
  redirectUri: "https://yourapp.com/callback",
  state: "random-csrf-token", // optional but recommended
});

// Step 2: After redirect, exchange the code for tokens
const tokens = await exchangeCodeForTokens({
  code: "code-from-callback-url",
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  redirectUri: "https://yourapp.com/callback",
});
// → { access_token, refresh_token, token_type, expires_in }

// Step 3: Refresh when needed (or let the client handle it automatically)
const newTokens = await refreshTokens({
  refreshToken: tokens.refresh_token,
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
});
```

## Pagination

Every `.list()` method returns an async iterator that auto-paginates across
every page. Page size is clamped to the API maximum (100). There is no
default cap — the iterator stops when the API returns an empty or short
page, so iterating naturally yields every item.

```typescript
// Iterate all contacts — pages are fetched lazily as you consume
for await (const contact of teamleader.contacts.list({ filter: { term: "John" } })) {
  console.log(contact);
}

// Opt-in safety cap
for await (const deal of teamleader.deals.list({}, { maxPages: 5 })) {
  // stops after 5 pages (max 500 items at size: 100)
}

// Break out when you have what you need
for await (const c of teamleader.contacts.list()) {
  if (c.email === "target@example.com") break;
}

// Cancel mid-flight via AbortController
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
for await (const c of teamleader.contacts.list({}, { signal: controller.signal })) {
  // stops cleanly after 5s
}
```

### Low-level pagination

If you need access to the raw page response (e.g. to read `meta` or call
an endpoint not covered by a resource class), use the client primitives:

```typescript
// Per-page iterator — yields each page's full response body
for await (const page of teamleader.paginatePages("/contacts.list")) {
  console.log(page.data);   // array of contacts
  console.log(page.meta);   // { page: { size, number }, matches }
}

// Per-item iterator on an arbitrary endpoint
for await (const item of teamleader.paginateItems("/contacts.list", { filter: { term: "John" } })) {
  console.log(item);
}
```

## Error handling

```typescript
import {
  TeamleaderFocusError,
  TeamleaderFocusAuthenticationError,
  TeamleaderFocusValidationError,
  TeamleaderFocusRateLimitError,
  TeamleaderFocusNetworkError,
} from "@bluemarker/teamleader-focus-js-sdk";

try {
  const { data } = await teamleader.contacts.info({ id: "uuid" });
} catch (err) {
  if (err instanceof TeamleaderFocusAuthenticationError) {
    // 401 — token expired or invalid
  } else if (err instanceof TeamleaderFocusValidationError) {
    // 400/422 — invalid request params.
    // Typed accessors pull details from Teamleader's { errors: [...] } body:
    console.log(err.title);   // "project_id must be valid"
    console.log(err.field);   // "project_id"
    console.log(err.errors);  // full array, typed as TeamleaderApiError[]
    console.log(err.body);    // raw parsed JSON (unknown)
  } else if (err instanceof TeamleaderFocusRateLimitError) {
    // 429 — rate limited (auto-retried based on maxRetries)
    console.log(err.retryAfter); // Date
  } else if (err instanceof TeamleaderFocusNetworkError) {
    // DNS failure, timeout, etc.
  }
}
```

Rate limit retries are automatic (default: 3 retries). Configure with `maxRetries`:

```typescript
const teamleader = new TeamleaderFocusClient({
  accessToken: "...",
  maxRetries: 5, // or 0 to disable
});
```

## Type safety & spec alignment

Types are generated directly from Teamleader's official OpenAPI
specification (`@teamleader/focus-api-specification`). A small set of
documented patches corrects known divergences between the spec and
the runtime API — for example, enum values the API actually accepts
but the spec omits. When Teamleader updates its API, a new SDK
release picks up the changes with matching type coverage.

## License

MIT © [Henk de Blauw / Bluemarker](https://www.bluemarker.be)
