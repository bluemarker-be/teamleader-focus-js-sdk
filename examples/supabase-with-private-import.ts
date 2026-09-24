// @ts-nocheck -- This file targets the Deno runtime (Supabase Edge Functions).

/**
 * Supabase Edge Function — consuming the SDK from npm
 * ====================================================
 *
 * Since v1.2.0 the SDK is published to npm as
 * `@bluemarker/teamleader-focus-js-sdk`, so Deno can import it directly
 * via the `npm:` specifier — no auth token, no CDN indirection.
 *
 * Prerequisites:
 *
 *   1. Store your Teamleader token in Supabase secrets:
 *
 *        supabase secrets set TEAMLEADER_ACCESS_TOKEN=...
 *
 *   2. Deploy:
 *
 *        supabase functions deploy companies-lister
 *
 *   3. Invoke:
 *
 *        curl -X POST https://<project>.functions.supabase.co/companies-lister
 *
 * Updating the SDK version is just a version bump in the import below.
 */

import {
  TeamleaderFocusClient,
  TeamleaderFocusError,
  TeamleaderFocusValidationError,
  TeamleaderFocusAuthenticationError,
} from "npm:@bluemarker/teamleader-focus-js-sdk@^1.2.0";

Deno.serve(async () => {
  const teamleader = new TeamleaderFocusClient({
    accessToken: Deno.env.get("TEAMLEADER_ACCESS_TOKEN")!,
    userAgent: "my-app/1.0 (supabase-edge)",
  });

  try {
    // .list() auto-paginates — AbortSignal stops it if the request times out
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25_000);

    const companies = [];
    for await (const company of teamleader.companies.list(
      {},
      { signal: controller.signal, maxPages: 10 },
    )) {
      companies.push({ id: company.id, name: company.name });
    }

    clearTimeout(timeout);

    return Response.json({ count: companies.length, companies });
  } catch (err) {
    // Typed error accessors — no need to cast err.body
    if (err instanceof TeamleaderFocusAuthenticationError) {
      return Response.json(
        { error: "Teamleader token expired or invalid" },
        { status: 401 },
      );
    }
    if (err instanceof TeamleaderFocusValidationError) {
      return Response.json(
        { error: err.title, field: err.field, status: err.status },
        { status: err.status },
      );
    }
    if (err instanceof TeamleaderFocusError) {
      return Response.json(
        { error: err.message, status: err.status, body: err.body },
        { status: err.status || 500 },
      );
    }
    return Response.json({ error: String(err) }, { status: 500 });
  }
});
