# Teamleader Focus SDK

Fully typed TypeScript SDK for the [Teamleader Focus API](https://developer.teamleader.eu/). Zero dependencies, ESM-only, works in Node.js, Deno (Supabase Edge Functions), and browsers.

Types are auto-generated from the official OpenAPI spec — your editor gives you autocomplete on every parameter and response field. For field-level documentation, refer to the [Teamleader API docs](https://developer.teamleader.eu/).

## Setup

```typescript
import { TeamleaderClient } from "teamleader-focus-js-sdk";

const teamleader = new TeamleaderClient({
  accessToken: "your-access-token",
});
```

### With automatic token refresh

```typescript
const teamleader = new TeamleaderClient({
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

## Usage

```typescript
// List contacts
const { data } = await teamleader.contacts.list({
  filter: { term: "John" },
  page: { size: 50, number: 1 },
});

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
| `calls` | `list` `info` `add` `update` `complete` |
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
| `dealPhases` | `list` `create` `update` `duplicate` `move` `delete` |
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
| `incomingCreditNotes` | `add` `info` `update` `delete` `approve` `refuse` `markAsPendingReview` `sendToBookkeeping` |
| `incomingInvoices` | `add` `info` `update` `delete` `approve` `refuse` `markAsPendingReview` `sendToBookkeeping` |
| `invoices` | `list` `info` `download` `draft` `update` `updateBooked` `copy` `book` `delete` `registerPayment` `removePayments` `credit` `creditPartially` `send` `sendViaPeppol` |
| `legacyMilestones` | `list` `info` `create` `update` `delete` `close` `open` |
| `legacyProjects` | `list` `info` `create` `update` `close` `reopen` `delete` `addParticipant` `updateParticipant` |
| `levelTwoAreas` | `list` |
| `lostReasons` | `list` |
| `mailTemplates` | `list` |
| `meetings` | `list` `info` `schedule` `update` `complete` `createReport` `delete` |
| `migrate` | `id` `taxRate` `activityType` |
| `notes` | `list` `create` `update` |
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
| `receipts` | `add` `info` `update` `delete` `approve` `refuse` `markAsPendingReview` `sendToBookkeeping` |
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
| `users` | `me` `list` `info` `listDaysOff` `getWeekSchedule` |
| `webhooks` | `register` `list` `unregister` |
| `withholdingTaxRates` | `list` |
| `workTypes` | `list` |

## OAuth2 flow

If your users need to authorize via Teamleader's OAuth2 flow:

```typescript
import {
  createAuthorizationUrl,
  exchangeCodeForTokens,
  refreshTokens,
} from "teamleader-focus-js-sdk";

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

```typescript
import { paginateItems, paginatePages } from "teamleader-focus-js-sdk";

// Iterate over all items across pages
for await (const contact of paginateItems(teamleader, "/contacts.list", {
  filter: { term: "John" },
  page: { size: 100 },
})) {
  console.log(contact);
}

// Or iterate per page
for await (const page of paginatePages(teamleader, "/contacts.list")) {
  console.log(page.data);   // array of contacts
  console.log(page.meta);   // { page: { size, number }, matches }
}

// Safety limit (default: 100 pages max)
for await (const item of paginateItems(teamleader, "/deals.list", {}, { maxPages: 5 })) {
  // stops after 5 pages
}
```

## Error handling

```typescript
import {
  TeamleaderError,
  TeamleaderAuthenticationError,
  TeamleaderValidationError,
  TeamleaderRateLimitError,
  TeamleaderNetworkError,
} from "teamleader-focus-js-sdk";

try {
  await teamleader.contacts.list();
} catch (err) {
  if (err instanceof TeamleaderAuthenticationError) {
    // 401 — token expired or invalid
  } else if (err instanceof TeamleaderValidationError) {
    // 400/422 — invalid request params
    console.log(err.status, err.body);
  } else if (err instanceof TeamleaderRateLimitError) {
    // 429 — rate limited (auto-retried based on maxRetries)
    console.log(err.retryAfter); // Date
  } else if (err instanceof TeamleaderNetworkError) {
    // DNS failure, timeout, etc.
  }
}
```

Rate limit retries are automatic (default: 3 retries). Configure with `maxRetries`:

```typescript
const teamleader = new TeamleaderClient({
  accessToken: "...",
  maxRetries: 5, // or 0 to disable
});
```

## Development

```bash
npm run generate  # regenerate types from OpenAPI spec
npm run build     # compile to dist/
npm run test      # run tests
npm run dev       # watch mode
```
