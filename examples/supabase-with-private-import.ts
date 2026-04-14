// @ts-nocheck -- This file targets the Deno runtime (Supabase Edge Functions).

/**
 * Supabase Edge Function — importing the SDK from a private GitHub repo
 * =====================================================================
 *
 * Demonstrates how to consume this SDK in Deno without copying dist/ into
 * your Supabase project. Deno fetches the module from GitHub's raw URL,
 * authenticated via DENO_AUTH_TOKENS.
 *
 * Prerequisites:
 *
 *   1. Create a GitHub fine-grained PAT with "Contents: Read-only" scoped
 *      to just the teamleader-focus-js-sdk repository.
 *
 *   2. Store it in Supabase secrets alongside your Teamleader token:
 *
 *        supabase secrets set DENO_AUTH_TOKENS="github_pat_xxxxx@raw.githubusercontent.com"
 *        supabase secrets set TEAMLEADER_ACCESS_TOKEN=...
 *
 *   3. Deploy:
 *
 *        supabase functions deploy companies-lister
 *
 *   4. Invoke:
 *
 *        curl -X POST https://<project>.functions.supabase.co/companies-lister
 *
 * Updating the SDK version is just a URL change in the import below — no
 * reinstall, no redeploy of secrets.
 */

import {
  TeamleaderFocusClient,
  TeamleaderFocusError,
  TeamleaderFocusValidationError,
  TeamleaderFocusAuthenticationError,
} from "https://raw.githubusercontent.com/henkdeblauw/teamleader-focus-js-sdk/v1.0.0/dist/index.js";

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
