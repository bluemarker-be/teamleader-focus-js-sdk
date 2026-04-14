// @ts-nocheck -- This file targets the Deno runtime (Supabase Edge Functions).

/**
 * Supabase Edge Function example — simple version
 * ================================================
 *
 * Lists all companies, creates 3 contacts, links them to the first company.
 *
 * Deploy:  supabase functions deploy companies-and-contacts
 * Invoke:  curl -X POST https://<project>.functions.supabase.co/companies-and-contacts
 */

import {
  TeamleaderFocusClient,
  TeamleaderFocusError,
} from "../../_shared/teamleader/index.js";

Deno.serve(async () => {
  const teamleader = new TeamleaderFocusClient({
    accessToken: Deno.env.get("TEAMLEADER_ACCESS_TOKEN")!,
  });

  try {
    // 1. List all companies — .list() auto-paginates across every page
    const companies = [];
    for await (const company of teamleader.companies.list()) {
      companies.push(company);
    }

    if (companies.length === 0) {
      return Response.json({ error: "No companies found" }, { status: 404 });
    }

    const target = companies[0];

    // 2. Create 3 contacts
    const contacts = [];
    for (let i = 1; i <= 3; i++) {
      const { data } = await teamleader.contacts.add({
        first_name: `Demo${i}`,
        last_name: "Contact",
        emails: [{ type: "primary", email: `demo${i}@example.com` }],
      });
      contacts.push(data);
    }

    // 3. Link each contact to the company
    for (const contact of contacts) {
      await teamleader.contacts.linkToCompany({
        id: contact.id,
        company_id: target.id,
      });
    }

    return Response.json({
      company: target,
      contacts_created: contacts,
      contacts_linked: contacts.length,
    });
  } catch (err) {
    if (err instanceof TeamleaderFocusError) {
      return Response.json(
        { error: err.message, status: err.status, body: err.body },
        { status: err.status || 500 },
      );
    }
    return Response.json({ error: String(err) }, { status: 500 });
  }
});
