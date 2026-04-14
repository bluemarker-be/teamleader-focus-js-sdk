import { describe, it, beforeAll, afterAll } from "vitest";
import { getClient, noToken, cleanupAll, delay, collect } from "./setup.js";
import { TeamleaderFocusError } from "../../src/errors.js";

/**
 * Live test: is exchange_rate required or optional per endpoint?
 *
 * The OpenAPI spec defines two currency schemas:
 * - CurrencyWithRequiredExchangeRate (deals.create / deals.update) → exchange_rate required
 * - Currency (quotations.create / invoices.draft) → exchange_rate optional
 *
 * This test observes the actual API behaviour for each combination.
 * Tests use try/catch instead of expect().toThrow() — the goal is to
 * observe and log, not assert.
 */
describe.skipIf(noToken)("Currency exchange_rate — required vs optional", () => {
  const client = getClient();

  // Shared IDs
  let contactId: string;
  let departmentId: string;
  let taxRateId: string;
  let pipelineId: string;
  let phaseId: string;
  let baseDealId: string; // deal for quotations

  // Track all created resources for cleanup
  const dealIds: string[] = [];
  const quotationIds: string[] = [];
  const invoiceIds: string[] = [];

  beforeAll(async () => {
    await delay(3000);
  });

  // -----------------------------------------------------------------------
  // Setup
  // -----------------------------------------------------------------------

  describe.sequential("setup", () => {
    it("create test contact", async () => {
      const res = await client.contacts.add({
        first_name: "SDK",
        last_name: "CurrencyTest",
      });
      contactId = (res.data as { id: string }).id;
    });

    it("fetch department ID", async () => {
      const res = await collect(client.departments.list(undefined, { maxPages: 1 }));
      const depts = res as Array<{ id: string }>;
      departmentId = depts[0].id;
    });

    it("fetch tax rate ID", async () => {
      const res = await collect(client.taxRates.list(undefined, { maxPages: 1 }));
      const rates = res as Array<{
        id: string;
        department?: { type: string; id: string };
      }>;
      const matching = rates.find(
        (r) => r.department && r.department.id === departmentId,
      );
      taxRateId = matching!.id;
    });

    it("create pipeline + phase", async () => {
      const pRes = await client.dealPipelines.create({
        name: "SDK CurrencyTest Pipeline",
      });
      pipelineId = (pRes.data as { id: string }).id;

      const phRes = await collect(client.dealPhases.list({
        filter: { deal_pipeline_id: pipelineId },
      }, { maxPages: 1 }));
      const phases = phRes as Array<{ id: string }>;
      if (phases.length > 0) {
        phaseId = phases[0].id;
      } else {
        const newPhase = await client.dealPhases.create({
          deal_pipeline_id: pipelineId,
          name: "SDK CurrencyTest Phase",
          requires_attention_after: { amount: 7, unit: "days" },
        });
        phaseId = (newPhase.data as { id: string }).id;
      }
    });

    it("create base deal (for quotations)", async () => {
      const res = await client.deals.create({
        title: "SDK CurrencyTest Base Deal",
        lead: { customer: { type: "contact", id: contactId } },
        phase_id: phaseId,
      });
      baseDealId = (res.data as { id: string }).id;
      dealIds.push(baseDealId);
    });
  });

  // -----------------------------------------------------------------------
  // Helper: log result
  // -----------------------------------------------------------------------

  function logResult(label: string, outcome: "PASS" | "FAIL", detail: string) {
    const icon = outcome === "PASS" ? "✅" : "❌";
    console.log(`  ${icon} ${label}: ${outcome} — ${detail}`);
  }

  function errorDetail(err: unknown): string {
    if (err instanceof TeamleaderFocusError) {
      return `status=${err.status} body=${JSON.stringify(err.body)}`;
    }
    return String(err);
  }

  // -----------------------------------------------------------------------
  // deals.create
  // -----------------------------------------------------------------------

  describe.sequential("deals.create", () => {
    it("with exchange_rate", async () => {
      try {
        const res = await client.deals.create({
          title: "SDK CurrencyTest Deal — with rate",
          lead: { customer: { type: "contact", id: contactId } },
          phase_id: phaseId,
          currency: { code: "USD", exchange_rate: 1.08 },
        } as any);
        const id = (res.data as { id: string }).id;
        dealIds.push(id);
        logResult("deals.create + exchange_rate", "PASS", `created ${id}`);
      } catch (err) {
        logResult("deals.create + exchange_rate", "FAIL", errorDetail(err));
      }
    });

    it("without exchange_rate", async () => {
      try {
        const res = await client.deals.create({
          title: "SDK CurrencyTest Deal — no rate",
          lead: { customer: { type: "contact", id: contactId } },
          phase_id: phaseId,
          currency: { code: "USD" },
        } as any);
        const id = (res.data as { id: string }).id;
        dealIds.push(id);
        logResult("deals.create − exchange_rate", "PASS", `created ${id} (rate NOT required!)`);
      } catch (err) {
        logResult("deals.create − exchange_rate", "FAIL", errorDetail(err));
      }
    });

    it("without currency", async () => {
      try {
        const res = await client.deals.create({
          title: "SDK CurrencyTest Deal — no currency",
          lead: { customer: { type: "contact", id: contactId } },
          phase_id: phaseId,
        });
        const id = (res.data as { id: string }).id;
        dealIds.push(id);
        logResult("deals.create − currency", "PASS", `created ${id}`);
      } catch (err) {
        logResult("deals.create − currency", "FAIL", errorDetail(err));
      }
    });

    it("EUR with exchange_rate=1.08 (non-1)", async () => {
      try {
        const res = await client.deals.create({
          title: "SDK CurrencyTest Deal — EUR wrong rate",
          lead: { customer: { type: "contact", id: contactId } },
          phase_id: phaseId,
          currency: { code: "EUR", exchange_rate: 1.08 },
        } as any);
        const id = (res.data as { id: string }).id;
        dealIds.push(id);
        logResult("deals.create EUR rate=1.08", "PASS", `created ${id} (non-1 rate accepted!)`);
      } catch (err) {
        logResult("deals.create EUR rate=1.08", "FAIL", errorDetail(err));
      }
    });
  });

  // -----------------------------------------------------------------------
  // deals.update
  // -----------------------------------------------------------------------

  describe.sequential("deals.update", () => {
    it("with exchange_rate", async () => {
      try {
        await client.deals.update({
          id: baseDealId,
          currency: { code: "USD", exchange_rate: 1.08 },
        } as any);
        logResult("deals.update + exchange_rate", "PASS", "updated");
      } catch (err) {
        logResult("deals.update + exchange_rate", "FAIL", errorDetail(err));
      }
    });

    it("without exchange_rate", async () => {
      try {
        await client.deals.update({
          id: baseDealId,
          currency: { code: "USD" },
        } as any);
        logResult("deals.update − exchange_rate", "PASS", "updated (rate NOT required!)");
      } catch (err) {
        logResult("deals.update − exchange_rate", "FAIL", errorDetail(err));
      }
    });

    it("EUR with exchange_rate=1.08 (non-1)", async () => {
      try {
        await client.deals.update({
          id: baseDealId,
          currency: { code: "EUR", exchange_rate: 1.08 },
        } as any);
        logResult("deals.update EUR rate=1.08", "PASS", "updated (non-1 rate accepted!)");
      } catch (err) {
        logResult("deals.update EUR rate=1.08", "FAIL", errorDetail(err));
      }
    });
  });

  // -----------------------------------------------------------------------
  // quotations.create
  // -----------------------------------------------------------------------

  const groupedLines = (label: string) => [
    {
      section: { title: label },
      line_items: [
        {
          quantity: 1,
          description: "SDK currency test line",
          unit_price: { amount: 100, tax: "excluding" as const },
          tax_rate_id: "", // filled in beforeAll
        },
      ],
    },
  ];

  describe.sequential("quotations.create", () => {
    it("with exchange_rate", async () => {
      const lines = groupedLines("Quotation + rate");
      lines[0].line_items[0].tax_rate_id = taxRateId;
      try {
        const res = await client.quotations.create({
          deal_id: baseDealId,
          currency: { code: "USD", exchange_rate: 1.08 },
          grouped_lines: lines,
        });
        const id = (res.data as { id: string }).id;
        quotationIds.push(id);
        logResult("quotations.create + exchange_rate", "PASS", `created ${id}`);
      } catch (err) {
        logResult("quotations.create + exchange_rate", "FAIL", errorDetail(err));
      }
    });

    it("without exchange_rate", async () => {
      const lines = groupedLines("Quotation − rate");
      lines[0].line_items[0].tax_rate_id = taxRateId;
      try {
        const res = await client.quotations.create({
          deal_id: baseDealId,
          currency: { code: "USD" },
          grouped_lines: lines,
        } as any);
        const id = (res.data as { id: string }).id;
        quotationIds.push(id);
        logResult("quotations.create − exchange_rate", "PASS", `created ${id} (rate optional!)`);
      } catch (err) {
        logResult("quotations.create − exchange_rate", "FAIL", errorDetail(err));
      }
    });

    it("without currency", async () => {
      const lines = groupedLines("Quotation − currency");
      lines[0].line_items[0].tax_rate_id = taxRateId;
      try {
        const res = await client.quotations.create({
          deal_id: baseDealId,
          grouped_lines: lines,
        } as any);
        const id = (res.data as { id: string }).id;
        quotationIds.push(id);
        logResult("quotations.create − currency", "PASS", `created ${id}`);
      } catch (err) {
        logResult("quotations.create − currency", "FAIL", errorDetail(err));
      }
    });

    it("EUR with exchange_rate=1.08 (non-1)", async () => {
      const lines = groupedLines("Quotation EUR wrong rate");
      lines[0].line_items[0].tax_rate_id = taxRateId;
      try {
        const res = await client.quotations.create({
          deal_id: baseDealId,
          currency: { code: "EUR", exchange_rate: 1.08 },
          grouped_lines: lines,
        });
        const id = (res.data as { id: string }).id;
        quotationIds.push(id);
        logResult("quotations.create EUR rate=1.08", "PASS", `created ${id} (non-1 rate accepted!)`);
      } catch (err) {
        logResult("quotations.create EUR rate=1.08", "FAIL", errorDetail(err));
      }
    });
  });

  // -----------------------------------------------------------------------
  // invoices.draft
  // -----------------------------------------------------------------------

  describe.sequential("invoices.draft", () => {
    it("with exchange_rate", async () => {
      const lines = groupedLines("Invoice + rate");
      lines[0].line_items[0].tax_rate_id = taxRateId;
      try {
        const res = await client.invoices.draft({
          invoicee: { customer: { type: "contact", id: contactId } },
          department_id: departmentId,
          payment_term: { type: "cash" },
          currency: { code: "USD", exchange_rate: 1.08 },
          grouped_lines: lines,
        });
        const id = (res.data as { id: string }).id;
        invoiceIds.push(id);
        logResult("invoices.draft + exchange_rate", "PASS", `created ${id}`);
      } catch (err) {
        logResult("invoices.draft + exchange_rate", "FAIL", errorDetail(err));
      }
    });

    it("without exchange_rate", async () => {
      const lines = groupedLines("Invoice − rate");
      lines[0].line_items[0].tax_rate_id = taxRateId;
      try {
        const res = await client.invoices.draft({
          invoicee: { customer: { type: "contact", id: contactId } },
          department_id: departmentId,
          payment_term: { type: "cash" },
          currency: { code: "USD" },
          grouped_lines: lines,
        } as any);
        const id = (res.data as { id: string }).id;
        invoiceIds.push(id);
        logResult("invoices.draft − exchange_rate", "PASS", `created ${id} (rate optional!)`);
      } catch (err) {
        logResult("invoices.draft − exchange_rate", "FAIL", errorDetail(err));
      }
    });

    it("without currency", async () => {
      const lines = groupedLines("Invoice − currency");
      lines[0].line_items[0].tax_rate_id = taxRateId;
      try {
        const res = await client.invoices.draft({
          invoicee: { customer: { type: "contact", id: contactId } },
          department_id: departmentId,
          payment_term: { type: "cash" },
          grouped_lines: lines,
        } as any);
        const id = (res.data as { id: string }).id;
        invoiceIds.push(id);
        logResult("invoices.draft − currency", "PASS", `created ${id}`);
      } catch (err) {
        logResult("invoices.draft − currency", "FAIL", errorDetail(err));
      }
    });

    it("EUR with exchange_rate=1.08 (non-1)", async () => {
      const lines = groupedLines("Invoice EUR wrong rate");
      lines[0].line_items[0].tax_rate_id = taxRateId;
      try {
        const res = await client.invoices.draft({
          invoicee: { customer: { type: "contact", id: contactId } },
          department_id: departmentId,
          payment_term: { type: "cash" },
          currency: { code: "EUR", exchange_rate: 1.08 },
          grouped_lines: lines,
        });
        const id = (res.data as { id: string }).id;
        invoiceIds.push(id);
        logResult("invoices.draft EUR rate=1.08", "PASS", `created ${id} (non-1 rate accepted!)`);
      } catch (err) {
        logResult("invoices.draft EUR rate=1.08", "FAIL", errorDetail(err));
      }
    });
  });

  // -----------------------------------------------------------------------
  // Cleanup
  // -----------------------------------------------------------------------

  afterAll(async () => {
    const fns: Array<() => Promise<unknown>> = [];

    // Delete invoices (draft only — can be deleted)
    for (const id of invoiceIds) {
      fns.push(() => client.invoices.delete({ id }));
    }
    // Delete quotations
    for (const id of quotationIds) {
      fns.push(() => client.quotations.delete({ id }));
    }
    // Delete deals
    for (const id of dealIds) {
      fns.push(() => client.deals.delete({ id }));
    }
    // Delete pipeline + contact
    fns.push(
      () => pipelineId ? client.dealPipelines.delete({ id: pipelineId }) : Promise.resolve(),
      () => client.contacts.delete({ id: contactId }),
    );

    await cleanupAll(fns);
  });
});
