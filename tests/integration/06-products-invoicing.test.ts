import { describe, it, expect, afterAll } from "vitest";
import { getClient, noToken, cleanupAll, futureDate, isoDate, isoDateTime } from "./setup.js";

describe.skipIf(noToken)("Products & Invoicing", () => {
  const client = getClient();

  let contactId: string;
  let productId: string;
  let dealId: string;
  let quotationId: string;
  let invoiceId: string;
  let copiedInvoiceId: string;
  let deletableInvoiceId: string;
  let creditNoteId: string;
  let subscriptionId: string;
  let departmentId: string;
  let taxRateId: string;
  let pipelineId: string;
  let phaseId: string;

  // -----------------------------------------------------------------------
  // Setup
  // -----------------------------------------------------------------------

  describe.sequential("setup", () => {
    it("create test contact", async () => {
      const res = await client.contacts.add({
        first_name: "SDK",
        last_name: "InvoiceTest",
      });
      contactId = (res.data as { id: string }).id;
    });

    it("fetch department ID", async () => {
      const res = await client.departments.list();
      const depts = res.data as Array<{ id: string }>;
      expect(depts.length).toBeGreaterThan(0);
      departmentId = depts[0].id;
    });

    it("fetch tax rate ID", async () => {
      const res = await client.taxRates.list();
      const rates = res.data as Array<{
        id: string;
        department?: { type: string; id: string };
      }>;
      // Tax rate MUST match the department, otherwise the API rejects it
      const matching = rates.find(
        (r) => r.department && r.department.id === departmentId,
      );
      expect(matching).toBeDefined();
      taxRateId = matching!.id;
    });

    it("create pipeline + phase for deal", async () => {
      const pRes = await client.dealPipelines.create({
        name: "SDK Invoice Test Pipeline",
      });
      pipelineId = (pRes.data as { id: string }).id;

      // Get auto-created phases
      const phRes = await client.dealPhases.list({
        filter: { deal_pipeline_id: pipelineId },
      });
      const phases = phRes.data as Array<{ id: string }>;
      if (phases.length > 0) {
        phaseId = phases[0].id;
      } else {
        const newPhase = await client.dealPhases.create({
          deal_pipeline_id: pipelineId,
          name: "SDK Test Phase",
          requires_attention_after: { amount: 7, unit: "days" },
        });
        phaseId = (newPhase.data as { id: string }).id;
      }
    });

    it("create deal for quotation", async () => {
      const res = await client.deals.create({
        title: "SDK Invoice Test Deal",
        lead: { customer: { type: "contact", id: contactId } },
        phase_id: phaseId,
      });
      dealId = (res.data as { id: string }).id;
    });
  });

  // -----------------------------------------------------------------------
  // Products
  // -----------------------------------------------------------------------

  describe.sequential("products", () => {
    it("add", async () => {
      const res = await client.products.add({
        name: "SDK Test Product",
        selling_price: { amount: 99.99, currency: "EUR" },
      });
      expect(res).toHaveProperty("data");
      productId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      const res = await client.products.info({ id: productId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(productId);
    });

    it("list", async () => {
      const res = await client.products.list({
        filter: { term: "SDK Test Product" },
        page: { size: 10, number: 1 },
      });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });

    it("update", async () => {
      await client.products.update({
        id: productId,
        name: "SDK Test Product Updated",
      });
    });
  });

  // -----------------------------------------------------------------------
  // Quotations
  // -----------------------------------------------------------------------

  describe.sequential("quotations", () => {
    it("create", async () => {
      const res = await client.quotations.create({
        deal_id: dealId,
        currency: { code: "EUR", exchange_rate: 1 },
        grouped_lines: [
          {
            section: { title: "SDK Test Section" },
            line_items: [
              {
                quantity: 1,
                description: "SDK test line item",
                unit_price: { amount: 100, tax: "excluding" },
                tax_rate_id: taxRateId,
              },
            ],
          },
        ],
      });
      expect(res).toHaveProperty("data");
      quotationId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      const res = await client.quotations.info({ id: quotationId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(quotationId);
    });

    it("list", async () => {
      const res = await client.quotations.list({
        page: { size: 10, number: 1 },
      });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });

    it("update", async () => {
      await client.quotations.update({
        id: quotationId,
        grouped_lines: [
          {
            section: { title: "SDK Updated Section" },
            line_items: [
              {
                quantity: 2,
                description: "SDK updated line item",
                unit_price: { amount: 150, tax: "excluding" },
                tax_rate_id: taxRateId,
              },
            ],
          },
        ],
      });
    });

    it("download", async () => {
      const res = await client.quotations.download({
        id: quotationId,
        format: "pdf",
      });
      expect(res).toHaveProperty("data");
    });

    it("accept", async () => {
      await client.quotations.accept({ id: quotationId });
    });

    it("send", async () => {
      // Re-create a quotation for send test (previous one was deleted by accept)
      const res = await client.quotations.create({
        deal_id: dealId,
        currency: { code: "EUR", exchange_rate: 1 },
        grouped_lines: [
          {
            section: { title: "SDK Send Test" },
            line_items: [
              {
                quantity: 1,
                description: "SDK send test line",
                unit_price: { amount: 100, tax: "excluding" },
                tax_rate_id: taxRateId,
              },
            ],
          },
        ],
      });
      const sendQuotationId = (res.data as { id: string }).id;

      await client.quotations.send({
        quotations: [sendQuotationId],
        recipients: {
          to: [{ email_address: "test-sdk@operative.pro" }],
        },
        subject: "SDK Test Quotation",
        content: "Please find your quotation attached.",
        language: "en",
      });

      // Cleanup
      try { await client.quotations.delete({ id: sendQuotationId }); } catch { /* may not be deletable after send */ }
    });

    it("delete", async () => {
      await client.quotations.delete({ id: quotationId });
    });
  });

  // -----------------------------------------------------------------------
  // Invoices
  // -----------------------------------------------------------------------

  describe.sequential("invoices", () => {
    it("draft", async () => {
      const res = await client.invoices.draft({
        invoicee: {
          customer: { type: "contact", id: contactId },
        },
        department_id: departmentId,
        payment_term: { type: "cash" },
        currency: { code: "EUR", exchange_rate: 1 },
        grouped_lines: [
          {
            section: { title: "SDK Test" },
            line_items: [
              {
                quantity: 1,
                description: "SDK test invoice line",
                unit_price: { amount: 200, tax: "excluding" },
                tax_rate_id: taxRateId,
              },
            ],
          },
        ],
      });
      expect(res).toHaveProperty("data");
      invoiceId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      const res = await client.invoices.info({ id: invoiceId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(invoiceId);
    });

    it("list", async () => {
      const res = await client.invoices.list({
        page: { size: 10, number: 1 },
      });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });

    it("update (draft)", async () => {
      await client.invoices.update({
        id: invoiceId,
        payment_term: { type: "cash" },
      });
    });

    it("download", async () => {
      const res = await client.invoices.download({
        id: invoiceId,
        format: "pdf",
      });
      expect(res).toHaveProperty("data");
    });

    it("copy", async () => {
      const res = await client.invoices.copy({ id: invoiceId });
      expect(res).toHaveProperty("data");
      copiedInvoiceId = (res.data as { id: string }).id;
    });

    it("book", async () => {
      await client.invoices.book({
        id: invoiceId,
        on: isoDate(),
      });
    });

    it("updateBooked", async () => {
      await client.invoices.updateBooked({
        id: invoiceId,
        payment_term: { type: "cash" },
      });
    });

    it("registerPayment", async () => {
      await client.invoices.registerPayment({
        id: invoiceId,
        payment: {
          amount: 100,
          currency: "EUR",
        },
        paid_at: isoDateTime(),
      });
    });

    it("removePayments", async () => {
      await client.invoices.removePayments({ id: invoiceId });
    });

    it("credit (full)", async () => {
      const res = await client.invoices.credit({ id: invoiceId });
      expect(res).toHaveProperty("data");
      creditNoteId = (res.data as { id: string }).id;
    });

    it("book the copy for creditPartially", async () => {
      await client.invoices.book({
        id: copiedInvoiceId,
        on: isoDate(),
      });
    });

    it("creditPartially", async () => {
      const res = await client.invoices.creditPartially({
        id: copiedInvoiceId,
        grouped_lines: [
          {
            section: { title: "Partial credit" },
            line_items: [
              {
                quantity: 1,
                description: "Partial credit line",
                unit_price: { amount: 50, tax: "excluding" },
                tax_rate_id: taxRateId,
              },
            ],
          },
        ],
      });
      expect(res).toHaveProperty("data");
    });

    it("send", async () => {
      // Invoice must be booked (already done above)
      await client.invoices.send({
        id: invoiceId,
        content: {
          subject: "SDK Test Invoice",
          body: "Please find your invoice attached.",
        },
        recipients: {
          to: [{ email: "test-sdk@operative.pro" }],
        },
      });
    });

    it.skip("sendViaPeppol — requires Peppol setup", () => {});

    it("draft a deletable invoice", async () => {
      const res = await client.invoices.draft({
        invoicee: {
          customer: { type: "contact", id: contactId },
        },
        department_id: departmentId,
        payment_term: { type: "cash" },
        currency: { code: "EUR", exchange_rate: 1 },
        grouped_lines: [
          {
            section: { title: "SDK Deletable" },
            line_items: [
              {
                quantity: 1,
                description: "SDK deletable invoice line",
                unit_price: { amount: 10, tax: "excluding" },
                tax_rate_id: taxRateId,
              },
            ],
          },
        ],
      });
      expect(res).toHaveProperty("data");
      deletableInvoiceId = (res.data as { id: string }).id;
    });

    it("delete (draft)", async () => {
      await client.invoices.delete({ id: deletableInvoiceId });
    });
  });

  // -----------------------------------------------------------------------
  // Credit Notes (read from invoice.credit)
  // -----------------------------------------------------------------------

  describe.sequential("creditNotes", () => {
    it("list", async () => {
      const res = await client.creditNotes.list({
        page: { size: 10, number: 1 },
      });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });

    it("info", async () => {
      if (!creditNoteId) return;
      const res = await client.creditNotes.info({ id: creditNoteId });
      expect(res).toHaveProperty("data");
    });

    it("download", async () => {
      if (!creditNoteId) return;
      const res = await client.creditNotes.download({
        id: creditNoteId,
        format: "pdf",
      });
      expect(res).toHaveProperty("data");
    });

    it.skip("sendViaPeppol — requires Peppol setup", () => {});
  });

  // -----------------------------------------------------------------------
  // Subscriptions
  // -----------------------------------------------------------------------

  describe.sequential("subscriptions", () => {
    it("create", async () => {
      const res = await client.subscriptions.create({
        title: "SDK Test Subscription",
        department_id: departmentId,
        invoicee: {
          customer: { type: "contact", id: contactId },
        },
        billing_cycle: {
          periodicity: { unit: "month", period: 1 },
          days_in_advance: 0,
        },
        starts_on: futureDate(1),
        payment_term: { type: "cash" },
        invoice_generation: { action: "draft" },
        grouped_lines: [
          {
            section: { title: "Subscription section" },
            line_items: [
              {
                quantity: 1,
                description: "Monthly SDK subscription",
                unit_price: { amount: 29.99, tax: "excluding" },
                tax_rate_id: taxRateId,
              },
            ],
          },
        ],
      });
      expect(res).toHaveProperty("data");
      subscriptionId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      const res = await client.subscriptions.info({ id: subscriptionId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(subscriptionId);
    });

    it("list", async () => {
      const res = await client.subscriptions.list({
        page: { size: 10, number: 1 },
      });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });

    it("update", async () => {
      await client.subscriptions.update({
        id: subscriptionId,
        title: "SDK Subscription Updated",
      });
    });

    it("deactivate", async () => {
      await client.subscriptions.deactivate({ id: subscriptionId });
    });
  });

  // -----------------------------------------------------------------------
  // Cleanup
  // -----------------------------------------------------------------------

  afterAll(async () => {
    await cleanupAll([
      () =>
        productId
          ? client.products.delete({ id: productId })
          : Promise.resolve(),
      () =>
        dealId ? client.deals.delete({ id: dealId }) : Promise.resolve(),
      () =>
        pipelineId
          ? client.dealPipelines.delete({ id: pipelineId })
          : Promise.resolve(),
      () => client.contacts.delete({ id: contactId }),
    ]);
  });
});
