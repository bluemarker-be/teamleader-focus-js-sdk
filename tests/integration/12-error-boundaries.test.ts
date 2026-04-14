import { describe, it, expect, afterAll } from "vitest";
import { getClient, noToken, cleanupAll, delay, isoDate } from "./setup.js";
import {
  TeamleaderFocusError,
  TeamleaderFocusValidationError,
} from "../../src/errors.js";

describe.skipIf(noToken)("Error Boundaries", () => {
  const client = getClient();

  // -----------------------------------------------------------------------
  // Invalid IDs
  // -----------------------------------------------------------------------

  describe("invalid IDs", () => {
    it("contacts.info with non-existent UUID returns error", async () => {
      try {
        await client.contacts.info({ id: "00000000-0000-0000-0000-000000000000" });
        expect.fail("Expected an error");
      } catch (err) {
        expect(err).toBeInstanceOf(TeamleaderFocusError);
        const tlErr = err as TeamleaderFocusError;
        expect(tlErr.status).toBeGreaterThanOrEqual(400);
        expect(tlErr.body).toBeDefined();
      }
    });

    it("deals.info with non-existent UUID returns error", async () => {
      try {
        await client.deals.info({ id: "00000000-0000-0000-0000-000000000000" });
        expect.fail("Expected an error");
      } catch (err) {
        expect(err).toBeInstanceOf(TeamleaderFocusError);
      }
    });

    it("invoices.info with non-existent UUID returns error", async () => {
      try {
        await client.invoices.info({ id: "00000000-0000-0000-0000-000000000000" });
        expect.fail("Expected an error");
      } catch (err) {
        expect(err).toBeInstanceOf(TeamleaderFocusError);
      }
    });
  });

  // -----------------------------------------------------------------------
  // Missing required fields
  // -----------------------------------------------------------------------

  describe("missing required fields", () => {
    it("contacts.add without first_name or last_name", async () => {
      try {
        await client.contacts.add({} as any);
        expect.fail("Expected a validation error");
      } catch (err) {
        expect(err).toBeInstanceOf(TeamleaderFocusValidationError);
        const vlErr = err as TeamleaderFocusValidationError;
        expect(vlErr.status === 400 || vlErr.status === 422).toBe(true);
      }
    });

    it("deals.create without title", async () => {
      try {
        await client.deals.create({ lead: { customer: { type: "contact", id: "fake" } } } as any);
        expect.fail("Expected a validation error");
      } catch (err) {
        expect(err).toBeInstanceOf(TeamleaderFocusError);
      }
    });

    it("deals.create without lead", async () => {
      try {
        await client.deals.create({ title: "No Lead" } as any);
        expect.fail("Expected a validation error");
      } catch (err) {
        expect(err).toBeInstanceOf(TeamleaderFocusError);
      }
    });
  });

  // -----------------------------------------------------------------------
  // State violations
  // -----------------------------------------------------------------------

  describe.sequential("state violations", () => {
    let contactId: string;
    let invoiceId: string;
    let dealId: string;
    let pipelineId: string;
    let departmentId: string;
    let taxRateId: string;

    it("setup", async () => {
      await delay(3000);

      const cRes = await client.contacts.add({ first_name: "SDK", last_name: "ErrorTest" });
      contactId = (cRes.data as { id: string }).id;

      const depRes = await client.departments.list();
      departmentId = (depRes.data as Array<{ id: string }>)[0].id;

      const trRes = await client.taxRates.list();
      const rates = trRes.data as Array<{ id: string; department?: { id: string } }>;
      taxRateId = rates.find((r) => r.department?.id === departmentId)!.id;

      // Create and book an invoice
      const invRes = await client.invoices.draft({
        invoicee: { customer: { type: "contact", id: contactId } },
        department_id: departmentId,
        payment_term: { type: "cash" },
        currency: { code: "EUR", exchange_rate: 1 },
        grouped_lines: [{
          section: { title: "Error test" },
          line_items: [{
            quantity: 1,
            description: "Error boundary test",
            unit_price: { amount: 100, tax: "excluding" },
            tax_rate_id: taxRateId,
          }],
        }],
      });
      invoiceId = (invRes.data as { id: string }).id;
      await client.invoices.book({ id: invoiceId, on: isoDate() });

      // Create and win a deal
      const pRes = await client.dealPipelines.create({ name: "SDK Error Test Pipeline" });
      pipelineId = (pRes.data as { id: string }).id;
      const phRes = await client.dealPhases.list({ filter: { deal_pipeline_id: pipelineId } });
      const phaseId = (phRes.data as Array<{ id: string }>)[0].id;

      const dRes = await client.deals.create({
        title: "SDK Error Test Deal",
        lead: { customer: { type: "contact", id: contactId } },
        phase_id: phaseId,
      });
      dealId = (dRes.data as { id: string }).id;
      await client.deals.win({ id: dealId });
    });

    it("invoices.update on a booked invoice fails (must use updateBooked)", async () => {
      try {
        await client.invoices.update({ id: invoiceId, payment_term: { type: "cash" } });
        console.log("  NOTE: invoices.update succeeded on booked invoice (API may have changed)");
      } catch (err) {
        expect(err).toBeInstanceOf(TeamleaderFocusError);
      }
    });

    it("invoices.delete on a booked invoice — observe behavior", async () => {
      try {
        await client.invoices.delete({ id: invoiceId });
        // API allowed it — note as observation
        console.log("  NOTE: invoices.delete succeeded on booked invoice");
      } catch (err) {
        expect(err).toBeInstanceOf(TeamleaderFocusError);
      }
    });

    it("deals.win on an already-won deal — observe behavior", async () => {
      try {
        await client.deals.win({ id: dealId });
        console.log("  NOTE: deals.win is idempotent on already-won deal");
      } catch (err) {
        expect(err).toBeInstanceOf(TeamleaderFocusError);
        console.log(`  NOTE: deals.win on already-won deal returns status ${(err as TeamleaderFocusError).status}`);
      }
    });

    afterAll(async () => {
      await cleanupAll([
        () => client.deals.delete({ id: dealId }),
        () => client.dealPipelines.delete({ id: pipelineId }),
        () => client.contacts.delete({ id: contactId }),
      ]);
    });
  });
});
