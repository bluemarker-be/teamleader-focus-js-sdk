import { describe, it, expect, afterAll } from "vitest";
import { getClient, noToken, cleanupAll, futureDate, isoDate, isoDateTime, delay } from "./setup.js";

describe.skipIf(noToken)("Purchasing", () => {
  const client = getClient();

  let companyId: string;
  let incomingInvoiceId: string;
  let incomingCreditNoteId: string;
  let receiptId: string;

  // -----------------------------------------------------------------------
  // Setup
  // -----------------------------------------------------------------------

  describe.sequential("setup", () => {
    it("create test company (supplier)", async () => {
      const res = await client.companies.add({
        name: "SDK Test Supplier",
      });
      companyId = (res.data as { id: string }).id;
    });
  });

  // -----------------------------------------------------------------------
  // Incoming Invoices
  // -----------------------------------------------------------------------

  describe.sequential("incomingInvoices", () => {
    it("add", async () => {
      const res = await client.incomingInvoices.add({
        title: "SDK Incoming Invoice Test",
        currency: { code: "EUR" },
        supplier_id: companyId,
        due_date: futureDate(30),
        total: {
          tax_exclusive: { amount: 500 },
          tax_inclusive: { amount: 605 },
        },
      });
      expect(res).toHaveProperty("data");
      incomingInvoiceId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      const res = await client.incomingInvoices.info({
        id: incomingInvoiceId,
      });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(incomingInvoiceId);
    });

    it("update", async () => {
      await client.incomingInvoices.update({
        id: incomingInvoiceId,
        due_date: futureDate(60),
      });
    });

    it("markAsPendingReview", async () => {
      await client.incomingInvoices.markAsPendingReview({
        id: incomingInvoiceId,
      });
    });

    it("approve", async () => {
      await client.incomingInvoices.approve({ id: incomingInvoiceId });
    });

    let incomingInvoicePaymentId: string;

    it("registerPayment", async () => {
      const res = await client.incomingInvoices.registerPayment({
        id: incomingInvoiceId,
        payment: {
          amount: 100,
          currency: "EUR",
        },
        paid_at: isoDateTime(),
      });
      expect(res).toHaveProperty("data");
      incomingInvoicePaymentId = (res.data as { id: string }).id;
    });

    it("listPayments", async () => {
      const res = await client.incomingInvoices.listPayments({
        id: incomingInvoiceId,
      });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });

    it("updatePayment", async () => {
      await client.incomingInvoices.updatePayment({
        id: incomingInvoiceId,
        payment_id: incomingInvoicePaymentId,
        payment: {
          amount: 200,
          currency: "EUR",
        },
        paid_at: isoDateTime(),
      });
    });

    it("removePayment", async () => {
      await client.incomingInvoices.removePayment({
        id: incomingInvoiceId,
        payment_id: incomingInvoicePaymentId,
      });
    });

    it("refuse", async () => {
      // We need to put it back to pending review first, then refuse
      try {
        await client.incomingInvoices.markAsPendingReview({
          id: incomingInvoiceId,
        });
      } catch {
        // may already be in correct state
      }
      await client.incomingInvoices.refuse({ id: incomingInvoiceId });
    });

    it.skip("sendToBookkeeping — requires bookkeeping integration", () => {});

    it("delete", async () => {
      await client.incomingInvoices.delete({ id: incomingInvoiceId });
    });
  });

  // -----------------------------------------------------------------------
  // Incoming Credit Notes
  // -----------------------------------------------------------------------

  describe.sequential("incomingCreditNotes", () => {
    it("rate limit cooldown", async () => {
      await delay(3000);
    });

    it("add", async () => {
      const res = await client.incomingCreditNotes.add({
        title: "SDK Incoming Credit Note Test",
        currency: { code: "EUR" },
        supplier_id: companyId,
        total: {
          tax_exclusive: { amount: 100 },
          tax_inclusive: { amount: 121 },
        },
      });
      expect(res).toHaveProperty("data");
      incomingCreditNoteId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      const res = await client.incomingCreditNotes.info({
        id: incomingCreditNoteId,
      });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(incomingCreditNoteId);
    });

    it("update", async () => {
      await client.incomingCreditNotes.update({
        id: incomingCreditNoteId,
        title: "SDK Incoming Credit Note Updated",
      });
    });

    it("markAsPendingReview", async () => {
      await client.incomingCreditNotes.markAsPendingReview({
        id: incomingCreditNoteId,
      });
    });

    it("approve", async () => {
      await client.incomingCreditNotes.approve({
        id: incomingCreditNoteId,
      });
    });

    let incomingCreditNotePaymentId: string;

    it("registerPayment", async () => {
      const res = await client.incomingCreditNotes.registerPayment({
        id: incomingCreditNoteId,
        payment: {
          amount: 121,
          currency: "EUR",
        },
        paid_at: isoDateTime(),
      });
      expect(res).toHaveProperty("data");
      incomingCreditNotePaymentId = (res.data as { id: string }).id;
    });

    it("listPayments", async () => {
      const res = await client.incomingCreditNotes.listPayments({
        id: incomingCreditNoteId,
      });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });

    it("updatePayment", async () => {
      await client.incomingCreditNotes.updatePayment({
        id: incomingCreditNoteId,
        payment_id: incomingCreditNotePaymentId,
        payment: {
          amount: 121,
          currency: "EUR",
        },
        paid_at: isoDateTime(),
      });
    });

    it("removePayment", async () => {
      await client.incomingCreditNotes.removePayment({
        id: incomingCreditNoteId,
        payment_id: incomingCreditNotePaymentId,
      });
    });

    it("refuse", async () => {
      try {
        await client.incomingCreditNotes.markAsPendingReview({
          id: incomingCreditNoteId,
        });
      } catch {
        // may already be in correct state
      }
      await client.incomingCreditNotes.refuse({
        id: incomingCreditNoteId,
      });
    });

    it.skip("sendToBookkeeping — requires bookkeeping integration", () => {});

    it("delete", async () => {
      await client.incomingCreditNotes.delete({
        id: incomingCreditNoteId,
      });
    });
  });

  // -----------------------------------------------------------------------
  // Receipts
  // -----------------------------------------------------------------------

  describe.sequential("receipts", () => {
    it("rate limit cooldown", async () => {
      await delay(3000);
    });

    it("add", async () => {
      const res = await client.receipts.add({
        title: "SDK Receipt Test",
        currency: { code: "EUR" },
        supplier_id: companyId,
        receipt_date: isoDate(),
        total: {
          // spec only defines tax_inclusive on receipts.add — not tax_exclusive
          tax_inclusive: { amount: 25 },
        },
      });
      expect(res).toHaveProperty("data");
      receiptId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      const res = await client.receipts.info({ id: receiptId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(receiptId);
    });

    it("update", async () => {
      await client.receipts.update({
        id: receiptId,
        title: "SDK Receipt Updated",
      });
    });

    it("markAsPendingReview", async () => {
      await client.receipts.markAsPendingReview({ id: receiptId });
    });

    it("approve", async () => {
      await client.receipts.approve({ id: receiptId });
    });

    let receiptPaymentId: string;

    it("registerPayment", async () => {
      const res = await client.receipts.registerPayment({
        id: receiptId,
        payment: {
          amount: 25,
          currency: "EUR",
        },
        paid_at: isoDateTime(),
      });
      expect(res).toHaveProperty("data");
      receiptPaymentId = (res.data as { id: string }).id;
    });

    it("listPayments", async () => {
      const res = await client.receipts.listPayments({
        id: receiptId,
      });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });

    it("updatePayment", async () => {
      await client.receipts.updatePayment({
        id: receiptId,
        payment_id: receiptPaymentId,
        payment: {
          amount: 25,
          currency: "EUR",
        },
        paid_at: isoDateTime(),
      });
    });

    it("removePayment", async () => {
      await client.receipts.removePayment({
        id: receiptId,
        payment_id: receiptPaymentId,
      });
    });

    it("refuse", async () => {
      try {
        await client.receipts.markAsPendingReview({ id: receiptId });
      } catch {
        // may already be in correct state
      }
      await client.receipts.refuse({ id: receiptId });
    });

    it.skip("sendToBookkeeping — requires bookkeeping integration", () => {});

    it("delete", async () => {
      await client.receipts.delete({ id: receiptId });
    });
  });

  // -----------------------------------------------------------------------
  // Cleanup
  // -----------------------------------------------------------------------

  afterAll(async () => {
    await cleanupAll([
      () =>
        incomingInvoiceId
          ? client.incomingInvoices.delete({ id: incomingInvoiceId })
          : Promise.resolve(),
      () =>
        incomingCreditNoteId
          ? client.incomingCreditNotes.delete({ id: incomingCreditNoteId })
          : Promise.resolve(),
      () =>
        receiptId
          ? client.receipts.delete({ id: receiptId })
          : Promise.resolve(),
      () => client.companies.delete({ id: companyId }),
    ]);
  });
});
