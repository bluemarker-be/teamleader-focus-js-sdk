// @ts-nocheck -- This file targets the Deno runtime (Supabase Edge Functions),
// not Node.js. The `Deno` global, `jsr:` imports, and the `_shared/` path
// resolve correctly in that environment.

/**
 * Supabase Edge Function example
 * =================================
 *
 * Fetches all companies, creates 3 contacts, and links them to the first
 * company — with pagination, full error handling, and cleanup on failure.
 *
 * Setup
 * -----
 * 1. Copy the SDK into `supabase/functions/_shared/teamleader/` (private
 *    distribution — Deno Edge Runtime cannot install from private git).
 *    Alternatively, publish the SDK to a registry Deno can reach.
 *
 * 2. Store OAuth tokens in a Supabase table so the function can read the
 *    latest values (they rotate). Example table `teamleader_credentials`:
 *      - `id` (uuid, pk)
 *      - `access_token` (text)
 *      - `refresh_token` (text)
 *      - `updated_at` (timestamptz)
 *
 * 3. Set environment variables on the function:
 *      TEAMLEADER_CLIENT_ID
 *      TEAMLEADER_CLIENT_SECRET
 *      SUPABASE_URL
 *      SUPABASE_SERVICE_ROLE_KEY  (service-role, not anon — needed to write tokens)
 *
 * Deploy
 * ------
 * supabase functions deploy companies-and-contacts
 *
 * Invoke
 * ------
 * curl -X POST https://<project>.functions.supabase.co/companies-and-contacts \
 *   -H "Authorization: Bearer <anon-or-service-key>"
 */

import {
  TeamleaderClient,
  TeamleaderError,
  TeamleaderAuthenticationError,
  TeamleaderRateLimitError,
  TeamleaderValidationError,
  TeamleaderTokenRefreshError,
  TeamleaderNetworkError,
} from "../../_shared/teamleader/index.js";
import { createClient } from "jsr:@supabase/supabase-js@2";

// ---------------------------------------------------------------------------
// Token persistence — Supabase table read/write
// ---------------------------------------------------------------------------

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

async function loadTokens(): Promise<{ access_token: string; refresh_token: string }> {
  const { data, error } = await supabase
    .from("teamleader_credentials")
    .select("access_token, refresh_token")
    .single();

  if (error || !data) {
    throw new Error(`Failed to load Teamleader credentials: ${error?.message ?? "no row"}`);
  }
  return data;
}

async function saveTokens(tokens: { access_token: string; refresh_token: string }): Promise<void> {
  const { error } = await supabase
    .from("teamleader_credentials")
    .update({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      updated_at: new Date().toISOString(),
    })
    .not("id", "is", null); // update the single row

  if (error) {
    // Log but don't throw — the token is already valid in memory for this request
    console.error("Failed to persist refreshed tokens:", error);
  }
}

// ---------------------------------------------------------------------------
// Domain logic
// ---------------------------------------------------------------------------

interface TeamleaderCompany {
  id: string;
  name: string;
}

interface CreatedContact {
  id: string;
  type: string;
}

interface ResultPayload {
  company: { id: string; name: string };
  contacts_created: CreatedContact[];
  contacts_linked: number;
  total_companies_scanned: number;
}

async function run(client: TeamleaderClient): Promise<ResultPayload> {
  // -------------------------------------------------------------------------
  // 1. List all companies via pagination
  // -------------------------------------------------------------------------
  const companies: TeamleaderCompany[] = [];
  for await (const company of client.paginateItems<TeamleaderCompany>(
    "/companies.list",
    { page: { size: 100 } }, // API maximum
  )) {
    companies.push(company);
  }

  if (companies.length === 0) {
    throw new Error("No companies in this Teamleader account — cannot link contacts.");
  }

  const targetCompany = companies[0];

  // -------------------------------------------------------------------------
  // 2. Create 3 contacts (track created IDs so we can clean up on failure)
  // -------------------------------------------------------------------------
  const createdContacts: CreatedContact[] = [];

  try {
    for (let i = 1; i <= 3; i++) {
      const suffix = Math.random().toString(36).slice(2, 8);
      const res = await client.contacts.add({
        first_name: `Demo${i}`,
        last_name: `Contact-${suffix}`,
        emails: [
          {
            type: "primary",
            email: `demo${i}.${suffix}@example.com`,
          },
        ],
      });

      if (!res.data?.id) {
        throw new Error(`contacts.add returned no id for contact ${i}`);
      }
      createdContacts.push({ id: res.data.id, type: res.data.type ?? "contact" });
    }

    // -----------------------------------------------------------------------
    // 3. Link each contact to the target company
    // -----------------------------------------------------------------------
    let linkedCount = 0;
    for (const contact of createdContacts) {
      await client.contacts.linkToCompany({
        id: contact.id,
        company_id: targetCompany.id,
      });
      linkedCount++;
    }

    return {
      company: { id: targetCompany.id, name: targetCompany.name },
      contacts_created: createdContacts,
      contacts_linked: linkedCount,
      total_companies_scanned: companies.length,
    };
  } catch (err) {
    // Partial failure — clean up what we created before re-throwing
    console.error("Workflow failed, rolling back created contacts:", err);
    for (const contact of createdContacts) {
      try {
        await client.contacts.delete({ id: contact.id });
      } catch (cleanupErr) {
        console.error(`Cleanup failed for contact ${contact.id}:`, cleanupErr);
        // swallow — we're already in an error path
      }
    }
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Error response mapping
// ---------------------------------------------------------------------------

interface ErrorResponse {
  error: string;
  code: string;
  status: number;
  retry_after?: string;
  details?: unknown;
}

function mapError(err: unknown): { response: ErrorResponse; httpStatus: number } {
  // Token refresh failed — user must re-authorize
  if (err instanceof TeamleaderTokenRefreshError) {
    return {
      response: {
        error: "Teamleader refresh token is no longer valid. User must re-authorize.",
        code: "teamleader_token_refresh_failed",
        status: 401,
        details: err.body,
      },
      httpStatus: 401,
    };
  }

  // 401 after refresh attempts exhausted
  if (err instanceof TeamleaderAuthenticationError) {
    return {
      response: {
        error: "Teamleader authentication failed.",
        code: "teamleader_unauthorized",
        status: 401,
        details: err.body,
      },
      httpStatus: 401,
    };
  }

  // 429 after all retries
  if (err instanceof TeamleaderRateLimitError) {
    return {
      response: {
        error: "Teamleader rate limit exceeded.",
        code: "teamleader_rate_limited",
        status: 429,
        retry_after: err.retryAfter.toISOString(),
        details: err.body,
      },
      httpStatus: 429,
    };
  }

  // 400/422 — client sent bad data
  if (err instanceof TeamleaderValidationError) {
    return {
      response: {
        error: "Teamleader rejected the request.",
        code: "teamleader_validation_error",
        status: err.status,
        details: err.body,
      },
      httpStatus: err.status,
    };
  }

  // Network issue (timeout, DNS, etc.)
  if (err instanceof TeamleaderNetworkError) {
    return {
      response: {
        error: `Network error reaching Teamleader: ${err.message}`,
        code: "teamleader_network_error",
        status: 502,
      },
      httpStatus: 502,
    };
  }

  // Any other Teamleader error (500/502/503)
  if (err instanceof TeamleaderError) {
    return {
      response: {
        error: `Teamleader API error: ${err.message}`,
        code: "teamleader_api_error",
        status: err.status,
        details: err.body,
      },
      httpStatus: err.status >= 500 ? 502 : err.status,
    };
  }

  // Unknown — don't leak internals
  const message = err instanceof Error ? err.message : String(err);
  console.error("Unexpected error:", err);
  return {
    response: {
      error: `Internal error: ${message}`,
      code: "internal_error",
      status: 500,
    },
    httpStatus: 500,
  };
}

// ---------------------------------------------------------------------------
// Edge Function entrypoint
// ---------------------------------------------------------------------------

Deno.serve(async (req: Request) => {
  // Method guard
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed", code: "method_not_allowed" }),
      { status: 405, headers: { "Content-Type": "application/json" } },
    );
  }

  let client: TeamleaderClient;
  try {
    const tokens = await loadTokens();
    client = new TeamleaderClient({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      clientId: Deno.env.get("TEAMLEADER_CLIENT_ID")!,
      clientSecret: Deno.env.get("TEAMLEADER_CLIENT_SECRET")!,
      apiVersion: "2023-09-26",
      maxRetries: 3,
      onTokenRefresh: async (newTokens) => {
        // Persist rotated tokens so the next invocation doesn't fail
        await saveTokens(newTokens);
      },
      // Multi-process safety: re-read from DB if another Edge Function
      // instance refreshed the token between our load and our request
      getTokens: async () => loadTokens(),
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Failed to initialize Teamleader client.",
        code: "init_failed",
        details: err instanceof Error ? err.message : String(err),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const result = await run(client);
    return new Response(JSON.stringify(result, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const { response, httpStatus } = mapError(err);
    return new Response(JSON.stringify(response, null, 2), {
      status: httpStatus,
      headers: { "Content-Type": "application/json" },
    });
  }
});
