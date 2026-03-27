/**
 * Live API test: custom_fields_update_strategy: "partial"
 *
 * Tests which Teamleader Focus resources support partial custom field updates.
 * This parameter is NOT in the OpenAPI spec, so we use raw `client.request()`.
 *
 * Usage: npx tsx tests/live/custom-fields-partial-update.ts
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { TeamleaderClient } from "../../src/client.js";

// Minimal .env loader (no dependency needed)
function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), ".env");
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch { /* .env not found, rely on existing env vars */ }
}
loadEnv();

// ─── Types ───────────────────────────────────────────────────────────────────

interface CustomFieldValue {
  id: string;
  value: string;
}

interface CustomFieldResponse {
  definition: { type: string; id: string };
  value: string | null;
}

interface TestResult {
  resource: string;
  context: string;
  partialWorks: boolean | null; // null = skipped/error
  defaultReplaces: boolean | null;
  error?: string;
}

interface Dependencies {
  departmentId: string;
  userId: string;
  contactId: string;
  companyId: string;
  activityTypeId: string;
  ticketStatusId: string;
  workTypeId: string | null;
  taxRateId: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function log(msg: string) {
  console.log(`  ${msg}`);
}

function logSection(title: string) {
  console.log(`\n${"═".repeat(70)}`);
  console.log(`  ${title}`);
  console.log(`${"═".repeat(70)}`);
}

function logStep(step: string) {
  console.log(`\n  ── ${step} ──`);
}

/** Small delay to avoid rate limits */
function delay(ms = 300) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Format date as ISO 8601 with +00:00 offset, no milliseconds (TL rejects trailing Z and ms) */
function toTlIso(date: Date): string {
  // "2026-02-15T10:00:00+00:00" — no milliseconds, explicit offset
  return date.toISOString().replace(/\.\d{3}Z$/, "+00:00");
}

/**
 * Find or create a custom field definition.
 * Reuses existing fields with the same label+context to avoid hitting the max limit.
 */
async function findOrCreateField(
  client: TeamleaderClient,
  label: string,
  context: string,
): Promise<string> {
  // List existing fields for this context
  try {
    const existing = await client.request<{ data: { id: string; label: string; context: string }[] }>(
      "/customFieldDefinitions.list",
      { filter: { context }, page: { size: 100, number: 1 } },
    );
    const match = existing.data.find((f) => f.label === label);
    if (match) return match.id;
  } catch { /* ignore, will try create */ }

  // Create new
  const result = await client.request<{ data: { id: string } }>(
    "/customFieldDefinitions.create",
    { label, type: "single_line", context },
  );
  return result.data.id;
}

/** Extract custom field values from .info response */
function getCustomFieldValues(
  customFields: CustomFieldResponse[] | undefined,
  fieldAId: string,
  fieldBId: string,
): { a: string | null; b: string | null } {
  const a = customFields?.find((cf) => cf.definition.id === fieldAId)?.value ?? null;
  const b = customFields?.find((cf) => cf.definition.id === fieldBId)?.value ?? null;
  return { a, b };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // Validate env
  const { ACCESS_TOKEN, REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET } = process.env;
  if (!ACCESS_TOKEN || !REFRESH_TOKEN || !CLIENT_ID || !CLIENT_SECRET) {
    console.error("Missing .env credentials (ACCESS_TOKEN, REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET)");
    process.exit(1);
  }

  const client = new TeamleaderClient({
    accessToken: ACCESS_TOKEN,
    refreshToken: REFRESH_TOKEN,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    onTokenRefresh(tokens) {
      log(`Token refreshed (expires_in: ${tokens.expires_in}s)`);
    },
  });

  // ─── Fase 0: Discover valid custom field contexts ────────────────────────

  logSection("FASE 0: Discover valid custom field contexts");

  const contextsToTest = [
    // Documented in spec
    "contact", "company", "deal", "project", "product", "invoice", "subscription", "ticket",
    // Undocumented from UI HTML
    "meeting_report", "meeting", "todo", "callback", "pro_external_cost", "werkbonnen",
    // Alternate names to check
    "sale", "task", "call", "work_order",
    // Legacy (in spec but not UI)
    "milestone",
  ];

  const validContexts = new Map<string, string>(); // context → fieldId (we'll delete later)
  const invalidContexts: string[] = [];

  for (const ctx of contextsToTest) {
    try {
      // Try to find existing or create — stable label per context
      const label = `SDK Disc ${ctx}`.slice(0, 30);
      const fieldId = await findOrCreateField(client, label, ctx);
      validContexts.set(ctx, fieldId);
      log(`✅ "${ctx}" — valid (field ${fieldId})`);
    } catch (e: any) {
      const msg = e?.body?.errors?.[0]?.title ?? e?.message ?? String(e);
      invalidContexts.push(ctx);
      log(`❌ "${ctx}" — rejected: ${msg}`);
    }
    await delay(200);
  }

  logStep("Context discovery summary");
  log(`Valid: ${[...validContexts.keys()].join(", ")}`);
  log(`Invalid: ${invalidContexts.join(", ")}`);

  // ─── Fetch dependencies ──────────────────────────────────────────────────

  logSection("SETUP: Fetch dependencies");

  const [deptResult, userResult, activityResult, ticketStatusResult, workTypeResult] =
    await Promise.all([
      client.request<{ data: { id: string }[] }>("/departments.list", {}),
      client.request<{ data: { id: string } }>("/users.me", {}),
      client.request<{ data: { id: string; category: string }[] }>("/activityTypes.list", {}),
      client.request<{ data: { id: string }[] }>("/ticketStatus.list", {}),
      client.request<{ data: { id: string }[] }>("/workTypes.list", {}).catch(() => ({ data: [] })),
    ]);

  const departmentId = deptResult.data[0].id;

  // Fetch tax rates for the specific department
  let taxRateId = "";
  try {
    const deptTaxRates = await client.request<{ data: { id: string }[] }>("/taxRates.list", {
      filter: { department_id: departmentId },
    });
    taxRateId = deptTaxRates.data[0]?.id ?? "";
  } catch {
    // ignore
  }
  if (!taxRateId) {
    // Fallback: list all tax rates without filter
    const allTaxRates = await client.request<{ data: { id: string }[] }>("/taxRates.list", {});
    taxRateId = allTaxRates.data[0]?.id ?? "";
  }

  const deps: Dependencies = {
    departmentId,
    userId: userResult.data.id,
    contactId: "", // created below
    companyId: "", // created below
    activityTypeId: activityResult.data.find((a) => a.category === "meeting")?.id ?? activityResult.data[0].id,
    ticketStatusId: ticketStatusResult.data[0].id,
    workTypeId: workTypeResult.data[0]?.id ?? null,
    taxRateId,
  };

  log(`Department: ${deps.departmentId}`);
  log(`User: ${deps.userId}`);
  log(`Activity type: ${deps.activityTypeId}`);
  log(`Ticket status: ${deps.ticketStatusId}`);
  log(`Work type: ${deps.workTypeId ?? "(none)"}`);
  log(`Tax rate: ${deps.taxRateId}`);

  // Create shared test contact & company
  logStep("Create shared test entities");

  const contactResult = await client.request<{ data: { id: string } }>("/contacts.add", {
    last_name: "SDK Test Contact",
    first_name: "CF Partial",
  });
  deps.contactId = contactResult.data.id;
  log(`Contact: ${deps.contactId}`);

  await delay();

  const companyResult = await client.request<{ data: { id: string } }>("/companies.add", {
    name: "SDK Test Company CF Partial",
  });
  deps.companyId = companyResult.data.id;
  log(`Company: ${deps.companyId}`);

  // ─── Define test cases ───────────────────────────────────────────────────

  interface TestCase {
    resource: string;
    context: string;
    createEndpoint: string;
    createBody: () => Record<string, unknown>;
    updateEndpoint: string;
    infoEndpoint: string;
    /** Extract entity ID from create response */
    extractId: (resp: any) => string;
    /** Build update body (without custom_fields) */
    updateBody: (id: string) => Record<string, unknown>;
    /** Whether .info needs includes=custom_fields */
    needsInclude?: boolean;
    /** Try multiple include values if the first fails */
    includesFallback?: string[];
    /** Optional cleanup endpoint */
    deleteEndpoint?: string;
  }

  const testCases: TestCase[] = [
    // 1. Contacts
    {
      resource: "contacts",
      context: "contact",
      createEndpoint: "/contacts.add",
      createBody: () => ({ last_name: `SDK CF Test ${Date.now()}` }),
      updateEndpoint: "/contacts.update",
      infoEndpoint: "/contacts.info",
      extractId: (r: any) => r.data.id,
      updateBody: (id: string) => ({ id }),
      needsInclude: true,
      deleteEndpoint: "/contacts.delete",
    },
    // 2. Companies
    {
      resource: "companies",
      context: "company",
      createEndpoint: "/companies.add",
      createBody: () => ({ name: `SDK CF Test ${Date.now()}` }),
      updateEndpoint: "/companies.update",
      infoEndpoint: "/companies.info",
      extractId: (r: any) => r.data.id,
      updateBody: (id: string) => ({ id }),
      needsInclude: true,
      deleteEndpoint: "/companies.delete",
    },
    // 3. Deals (context is "sale", not "deal" per API validation)
    {
      resource: "deals",
      context: "sale",
      createEndpoint: "/deals.create",
      createBody: () => ({
        title: `SDK CF Test ${Date.now()}`,
        lead: { customer: { type: "contact", id: deps.contactId } },
      }),
      updateEndpoint: "/deals.update",
      infoEndpoint: "/deals.info",
      extractId: (r: any) => r.data.id,
      updateBody: (id: string) => ({ id }),
      needsInclude: true,
      deleteEndpoint: "/deals.delete",
    },
    // 4. Products
    {
      resource: "products",
      context: "product",
      createEndpoint: "/products.add",
      createBody: () => ({ name: `SDK CF Test ${Date.now()}` }),
      updateEndpoint: "/products.update",
      infoEndpoint: "/products.info",
      extractId: (r: any) => r.data.id,
      updateBody: (id: string) => ({ id }),
      needsInclude: true,
      deleteEndpoint: "/products.delete",
    },
    // 5. Invoices (draft)
    {
      resource: "invoices",
      context: "invoice",
      createEndpoint: "/invoices.draft",
      createBody: () => ({
        invoicee: { customer: { type: "contact", id: deps.contactId } },
        department_id: deps.departmentId,
        payment_term: { type: "cash" },
        grouped_lines: [
          {
            section: { title: "Test" },
            line_items: [
              {
                quantity: 1,
                description: "SDK CF Test Item",
                unit_price: { amount: 10, currency: "EUR", tax: "excluding" },
                tax_rate_id: deps.taxRateId,
              },
            ],
          },
        ],
      }),
      updateEndpoint: "/invoices.update",
      infoEndpoint: "/invoices.info",
      extractId: (r: any) => r.data.id,
      updateBody: (id: string) => ({ id }),
      needsInclude: true,
      deleteEndpoint: "/invoices.delete",
    },
    // 6. Subscriptions
    {
      resource: "subscriptions",
      context: "subscription",
      createEndpoint: "/subscriptions.create",
      createBody: () => ({
        title: `SDK CF Test ${Date.now()}`,
        invoicee: { customer: { type: "contact", id: deps.contactId } },
        department_id: deps.departmentId,
        starts_on: new Date().toISOString().slice(0, 10),
        billing_cycle: { periodicity: { unit: "month", period: 1 }, days_in_advance: 0 },
        payment_term: { type: "cash" },
        invoice_generation: { action: "draft" },
        grouped_lines: [
          {
            section: { title: "Test" },
            line_items: [
              {
                quantity: 1,
                description: "SDK CF Sub Item",
                unit_price: { amount: 5, currency: "EUR", tax: "excluding" },
                tax_rate_id: deps.taxRateId,
              },
            ],
          },
        ],
      }),
      updateEndpoint: "/subscriptions.update",
      infoEndpoint: "/subscriptions.info",
      extractId: (r: any) => r.data.id,
      updateBody: (id: string) => ({ id }),
      needsInclude: true,
      deleteEndpoint: "/subscriptions.deactivate",
    },
    // 7. Tickets
    {
      resource: "tickets",
      context: "ticket",
      createEndpoint: "/tickets.create",
      createBody: () => ({
        subject: `SDK CF Test ${Date.now()}`,
        customer: { type: "contact", id: deps.contactId },
        ticket_status_id: deps.ticketStatusId,
      }),
      updateEndpoint: "/tickets.update",
      infoEndpoint: "/tickets.info",
      extractId: (r: any) => r.data.id,
      updateBody: (id: string) => ({ id }),
      needsInclude: true,
    },
    // 8. Projects (v2) — include might not support "custom_fields"
    {
      resource: "projects",
      context: "project",
      createEndpoint: "/projects-v2/projects.create",
      createBody: () => ({ title: `SDK CF Test ${Date.now()}` }),
      updateEndpoint: "/projects-v2/projects.update",
      infoEndpoint: "/projects-v2/projects.info",
      extractId: (r: any) => r.data.id,
      updateBody: (id: string) => ({ id }),
      needsInclude: true,
      includesFallback: ["custom_fields", "custom_fields,legacy_project", ""],
      deleteEndpoint: "/projects-v2/projects.delete",
    },
    // 9. Meetings
    {
      resource: "meetings",
      context: "meeting",
      createEndpoint: "/meetings.schedule",
      createBody: () => {
        const start = new Date(Date.now() + 86400000); // tomorrow
        const end = new Date(start.getTime() + 3600000); // +1h
        return {
          title: `SDK CF Test ${Date.now()}`,
          starts_at: toTlIso(start),
          ends_at: toTlIso(end),
          attendees: [{ type: "user", id: deps.userId }],
          activity_type_id: deps.activityTypeId,
        };
      },
      updateEndpoint: "/meetings.update",
      infoEndpoint: "/meetings.info",
      extractId: (r: any) => r.data.id,
      updateBody: (id: string) => ({ id }),
      needsInclude: true,
      deleteEndpoint: "/meetings.delete",
    },
  ];

  // Conditionally add tasks (if context "todo" or "task" works)
  const taskContext = validContexts.has("todo") ? "todo" : validContexts.has("task") ? "task" : null;
  if (taskContext) {
    testCases.push({
      resource: "tasks",
      context: taskContext,
      createEndpoint: "/tasks.create",
      createBody: () => ({
        title: `SDK CF Test ${Date.now()}`,
        due_on: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
        ...(deps.workTypeId ? { work_type_id: deps.workTypeId } : {}),
      }),
      updateEndpoint: "/tasks.update",
      infoEndpoint: "/tasks.info",
      extractId: (r: any) => r.data.id,
      updateBody: (id: string) => ({ id }),
      needsInclude: true,
      deleteEndpoint: "/tasks.delete",
    });
  }

  // Conditionally add calls (if context "callback" or "call" works)
  const callContext = validContexts.has("callback") ? "callback" : validContexts.has("call") ? "call" : null;
  if (callContext) {
    testCases.push({
      resource: "calls",
      context: callContext,
      createEndpoint: "/calls.add",
      createBody: () => ({
        participant: { customer: { type: "contact", id: deps.contactId } },
        due_at: toTlIso(new Date(Date.now() + 86400000)),
        assignee: { type: "user", id: deps.userId },
      }),
      updateEndpoint: "/calls.update",
      infoEndpoint: "/calls.info",
      extractId: (r: any) => r.data.id,
      updateBody: (id: string) => ({ id }),
      needsInclude: true,
    });
  }

  // Filter test cases to only those with a valid context
  const runnableTests = testCases.filter((tc) => validContexts.has(tc.context));
  const skippedTests = testCases.filter((tc) => !validContexts.has(tc.context));

  if (skippedTests.length > 0) {
    logStep("Skipped (invalid context)");
    for (const tc of skippedTests) {
      log(`⏭️  ${tc.resource} (context: "${tc.context}")`);
    }
  }

  // ─── Run tests ───────────────────────────────────────────────────────────

  const results: TestResult[] = [];
  const createdFieldIds: string[] = [...validContexts.values()]; // discovery fields to log

  for (const tc of runnableTests) {
    logSection(`TEST: ${tc.resource} (context: "${tc.context}")`);

    let fieldAId = "";
    let fieldBId = "";
    let entityId = "";

    try {
      // a) Create 2 custom field definitions
      logStep("a) Create custom field definitions");

      // Stable labels per resource — reuses existing fields
      const labelA = `SDK A ${tc.resource}`.slice(0, 30);
      const labelB = `SDK B ${tc.resource}`.slice(0, 30);

      fieldAId = await findOrCreateField(client, labelA, tc.context);
      createdFieldIds.push(fieldAId);
      log(`Field A: ${fieldAId}`);
      await delay();

      fieldBId = await findOrCreateField(client, labelB, tc.context);
      createdFieldIds.push(fieldBId);
      log(`Field B: ${fieldBId}`);
      await delay();

      // b) Create entity
      logStep("b) Create test entity");
      const createResp = await client.request<any>(tc.createEndpoint, tc.createBody());
      entityId = tc.extractId(createResp);
      log(`Entity: ${entityId}`);
      await delay();

      // c) Set both custom fields (full array)
      logStep("c) Set both custom fields");
      const bothFields: CustomFieldValue[] = [
        { id: fieldAId, value: "value-A-initial" },
        { id: fieldBId, value: "value-B-initial" },
      ];
      await client.request(tc.updateEndpoint, {
        ...tc.updateBody(entityId),
        custom_fields: bothFields,
      });
      log("Both fields set");
      await delay();

      // d) Verify both fields are set
      logStep("d) Verify initial state");

      // Determine the right includes value (some endpoints reject "custom_fields")
      let infoParams: any = { id: entityId };
      if (tc.needsInclude) {
        if (tc.includesFallback) {
          let resolved = false;
          for (const inc of tc.includesFallback) {
            try {
              const tryParams: any = { id: entityId };
              if (inc) tryParams.includes = inc;
              await client.request<any>(tc.infoEndpoint, tryParams);
              infoParams = tryParams;
              log(`Using includes="${inc || "(none)"}"`);
              resolved = true;
              break;
            } catch {
              log(`includes="${inc}" not accepted, trying next...`);
            }
            await delay(200);
          }
          if (!resolved) {
            infoParams = { id: entityId };
            log("No includes worked, using bare request");
          }
        } else {
          infoParams.includes = "custom_fields";
        }
      }

      const info1 = await client.request<{ data: { custom_fields?: CustomFieldResponse[] } }>(
        tc.infoEndpoint,
        infoParams,
      );
      const vals1 = getCustomFieldValues(info1.data.custom_fields, fieldAId, fieldBId);
      log(`Field A = "${vals1.a}", Field B = "${vals1.b}"`);

      if (vals1.a !== "value-A-initial" || vals1.b !== "value-B-initial") {
        throw new Error(`Initial values not set correctly: A="${vals1.a}", B="${vals1.b}"`);
      }
      await delay();

      // e) Update only field A with custom_fields_update_strategy: "partial"
      logStep("e) Partial update: only field A");
      await client.request(tc.updateEndpoint, {
        ...tc.updateBody(entityId),
        custom_fields: [{ id: fieldAId, value: "value-A-partial" }],
        custom_fields_update_strategy: "partial",
      } as any);
      log("Partial update sent");
      await delay();

      // f) Verify: field A changed, field B retained
      logStep("f) Verify partial update");
      const info2 = await client.request<{ data: { custom_fields?: CustomFieldResponse[] } }>(
        tc.infoEndpoint,
        infoParams,
      );
      const vals2 = getCustomFieldValues(info2.data.custom_fields, fieldAId, fieldBId);
      log(`Field A = "${vals2.a}", Field B = "${vals2.b}"`);

      const partialWorks = vals2.a === "value-A-partial" && vals2.b === "value-B-initial";
      log(partialWorks ? "✅ PARTIAL UPDATE WORKS" : "❌ Partial update did NOT work");
      await delay();

      // g) Control test: update only field A WITHOUT strategy (should replace = field B gone)
      logStep("g) Control: update without strategy");
      // First reset both fields
      await client.request(tc.updateEndpoint, {
        ...tc.updateBody(entityId),
        custom_fields: [
          { id: fieldAId, value: "value-A-reset" },
          { id: fieldBId, value: "value-B-reset" },
        ],
      });
      await delay();

      // Now update only field A without strategy
      await client.request(tc.updateEndpoint, {
        ...tc.updateBody(entityId),
        custom_fields: [{ id: fieldAId, value: "value-A-control" }],
      });
      await delay();

      // h) Verify: field B should be gone (default replace behavior)
      logStep("h) Verify default replace behavior");
      const info3 = await client.request<{ data: { custom_fields?: CustomFieldResponse[] } }>(
        tc.infoEndpoint,
        infoParams,
      );
      const vals3 = getCustomFieldValues(info3.data.custom_fields, fieldAId, fieldBId);
      log(`Field A = "${vals3.a}", Field B = "${vals3.b}"`);

      const defaultReplaces = vals3.a === "value-A-control" && (vals3.b === null || vals3.b === "");
      log(defaultReplaces ? "✅ Default replace confirmed" : "⚠️  Default does NOT replace (B still present)");

      results.push({
        resource: tc.resource,
        context: tc.context,
        partialWorks,
        defaultReplaces,
      });
    } catch (e: any) {
      const msg = e?.body?.errors?.[0]?.title ?? e?.message ?? String(e);
      log(`💥 ERROR: ${msg}`);
      if (e?.body) log(`   Body: ${JSON.stringify(e.body).slice(0, 200)}`);
      results.push({
        resource: tc.resource,
        context: tc.context,
        partialWorks: null,
        defaultReplaces: null,
        error: msg,
      });
    }

    // i) Cleanup: try to delete entity
    if (entityId && tc.deleteEndpoint) {
      try {
        await client.request(tc.deleteEndpoint, { id: entityId });
        log(`🧹 Deleted entity ${entityId}`);
      } catch {
        log(`⚠️  Could not delete entity ${entityId}`);
      }
      await delay();
    }
  }

  // ─── Cleanup shared entities ─────────────────────────────────────────────

  logSection("CLEANUP");

  try {
    await client.request("/contacts.delete", { id: deps.contactId });
    log(`🧹 Deleted shared contact ${deps.contactId}`);
  } catch {
    log(`⚠️  Could not delete shared contact (may have linked entities)`);
  }

  try {
    await client.request("/companies.delete", { id: deps.companyId });
    log(`🧹 Deleted shared company ${deps.companyId}`);
  } catch {
    log(`⚠️  Could not delete shared company (may have linked entities)`);
  }

  // Note: no customFieldDefinitions.delete endpoint exists
  log(`\n  ⚠️  ${createdFieldIds.length} custom field definitions created (no delete API).`);
  log("  They are labeled 'SDK Test Field ...' / 'SDK Discovery Test [...]' for identification.");

  // ─── Results table ───────────────────────────────────────────────────────

  logSection("RESULTS");

  console.log("");
  console.log(
    "  " +
      "Resource".padEnd(22) +
      "Context".padEnd(16) +
      "Partial".padEnd(12) +
      "Default=Replace".padEnd(18) +
      "Error",
  );
  console.log("  " + "─".repeat(80));

  for (const r of results) {
    const partial =
      r.partialWorks === null ? "⚠️  SKIP" : r.partialWorks ? "✅ YES" : "❌ NO";
    const replace =
      r.defaultReplaces === null ? "⚠️  SKIP" : r.defaultReplaces ? "✅ YES" : "⚠️  NO";

    console.log(
      "  " +
        r.resource.padEnd(22) +
        r.context.padEnd(16) +
        partial.padEnd(12) +
        replace.padEnd(18) +
        (r.error ?? ""),
    );
  }

  console.log("");

  // Summary
  const working = results.filter((r) => r.partialWorks === true);
  const notWorking = results.filter((r) => r.partialWorks === false);
  const errors = results.filter((r) => r.partialWorks === null);

  log(`Summary: ${working.length} working, ${notWorking.length} not working, ${errors.length} errors/skipped`);

  if (working.length > 0) {
    log(`\nResources supporting partial custom field updates:`);
    for (const r of working) {
      log(`  • ${r.resource} (context: "${r.context}")`);
    }
  }

  console.log("");
}

main().catch((e) => {
  console.error("\nFatal error:", e);
  process.exit(1);
});
