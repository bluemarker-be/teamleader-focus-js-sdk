import { describe, it, expect, beforeAll } from "vitest";
import { getClient, noToken, delay, collect } from "./setup.js";

describe.skipIf(noToken)("Read-only resources", () => {
  const client = getClient();

  // Wait for rate limit window to reset before starting many list calls
  beforeAll(async () => {
    await delay(3000);
  });

  // -----------------------------------------------------------------------
  // Pure list-only resources
  // -----------------------------------------------------------------------

  describe("activityTypes", () => {
    it("list", async () => {
      const res = await collect(client.activityTypes.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("bookkeepingSubmissions", () => {
    it.skip("list — requires filter.subject with a valid entity ID", () => {});
  });

  describe("businessTypes", () => {
    it("list", async () => {
      // businessTypes.list requires a body (all fields optional, but body itself required)
      const res = await collect(client.businessTypes.list({}, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("callOutcomes", () => {
    it("list", async () => {
      const res = await collect(client.callOutcomes.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("commercialDiscounts", () => {
    it("list", async () => {
      const res = await collect(client.commercialDiscounts.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("dealSources", () => {
    it("list", async () => {
      const res = await collect(client.dealSources.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("expenses", () => {
    it("list", async () => {
      const res = await collect(client.expenses.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("levelTwoAreas", () => {
    it("list", async () => {
      await delay(3000); // rate limit cooldown before heavy endpoint
      const res = await collect(client.levelTwoAreas.list({
        country: "BE",
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("lostReasons", () => {
    it("list", async () => {
      const res = await collect(client.lostReasons.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("mailTemplates", () => {
    it("list", async () => {
      const res = await collect(client.mailTemplates.list({
        filter: { type: "invoice" },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("paymentMethods", () => {
    it("list", async () => {
      const res = await collect(client.paymentMethods.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("paymentTerms", () => {
    it("list", async () => {
      const res = await collect(client.paymentTerms.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("priceLists", () => {
    it("list", async () => {
      const res = await collect(client.priceLists.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("productCategories", () => {
    it("list", async () => {
      const res = await collect(client.productCategories.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("tags", () => {
    it("list", async () => {
      const res = await collect(client.tags.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("taxRates", () => {
    it("list", async () => {
      const res = await collect(client.taxRates.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("teams", () => {
    it("list", async () => {
      const res = await collect(client.teams.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("ticketStatus", () => {
    it("list", async () => {
      const res = await collect(client.ticketStatus.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("unitsOfMeasure", () => {
    it("list", async () => {
      const res = await collect(client.unitsOfMeasure.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("withholdingTaxRates", () => {
    it("list", async () => {
      const res = await collect(client.withholdingTaxRates.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("workTypes", () => {
    it("list", async () => {
      const res = await collect(client.workTypes.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // List + info resources (fetch first item, then info on it)
  // -----------------------------------------------------------------------

  describe("departments", () => {
    let firstId: string | undefined;

    it("list", async () => {
      const res = await collect(client.departments.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
      if (res.length > 0) {
        firstId = (res[0] as { id: string }).id;
      }
    });

    it("info", async () => {
      if (!firstId) return; // skip if list was empty
      const res = await client.departments.info({ id: firstId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(firstId);
    });
  });

  describe.sequential("documentTemplates", () => {
    let departmentId: string | undefined;

    it("fetch department for filter", async () => {
      const res = await collect(client.departments.list(undefined, { maxPages: 1 }));
      const depts = res as Array<{ id: string }>;
      if (depts.length > 0) {
        departmentId = depts[0].id;
      }
    });

    it("list", async () => {
      if (!departmentId) return; // skip if no departments
      const res = await collect(client.documentTemplates.list({
        filter: {
          department_id: departmentId,
          document_type: "quotation",
        },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("orders", () => {
    let firstId: string | undefined;

    it("list", async () => {
      const res = await collect(client.orders.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
      if (res.length > 0) {
        firstId = (res[0] as { id: string }).id;
      }
    });

    it("info", async () => {
      if (!firstId) return;
      const res = await client.orders.info({ id: firstId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(firstId);
    });
  });

  describe("plannableItems", () => {
    let firstId: string | undefined;

    it("list", async () => {
      const res = await collect(client.plannableItems.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
      if (res.length > 0) {
        firstId = (res[0] as { id: string }).id;
      }
    });

    it("info", async () => {
      if (!firstId) return;
      const res = await client.plannableItems.info({ id: firstId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(firstId);
    });
  });
});
