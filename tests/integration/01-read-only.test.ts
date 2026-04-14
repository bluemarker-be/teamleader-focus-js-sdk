import { describe, it, expect, beforeAll } from "vitest";
import { getClient, noToken, delay } from "./setup.js";

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
      const res = await client.activityTypes.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("bookkeepingSubmissions", () => {
    it.skip("list — requires filter.subject with a valid entity ID", () => {});
  });

  describe("businessTypes", () => {
    it("list", async () => {
      // businessTypes.list requires a body (all fields optional, but body itself required)
      const res = await client.businessTypes.list({});
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("callOutcomes", () => {
    it("list", async () => {
      const res = await client.callOutcomes.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("commercialDiscounts", () => {
    it("list", async () => {
      const res = await client.commercialDiscounts.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("dealSources", () => {
    it("list", async () => {
      const res = await client.dealSources.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("expenses", () => {
    it("list", async () => {
      const res = await client.expenses.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("levelTwoAreas", () => {
    it("list", async () => {
      await delay(3000); // rate limit cooldown before heavy endpoint
      const res = await client.levelTwoAreas.list({
        country: "BE",
      });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("lostReasons", () => {
    it("list", async () => {
      const res = await client.lostReasons.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("mailTemplates", () => {
    it("list", async () => {
      const res = await client.mailTemplates.list({
        filter: { type: "invoice" },
      });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("paymentMethods", () => {
    it("list", async () => {
      const res = await client.paymentMethods.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("paymentTerms", () => {
    it("list", async () => {
      const res = await client.paymentTerms.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("priceLists", () => {
    it("list", async () => {
      const res = await client.priceLists.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("productCategories", () => {
    it("list", async () => {
      const res = await client.productCategories.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("tags", () => {
    it("list", async () => {
      const res = await client.tags.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("taxRates", () => {
    it("list", async () => {
      const res = await client.taxRates.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("teams", () => {
    it("list", async () => {
      const res = await client.teams.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("ticketStatus", () => {
    it("list", async () => {
      const res = await client.ticketStatus.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("unitsOfMeasure", () => {
    it("list", async () => {
      const res = await client.unitsOfMeasure.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("withholdingTaxRates", () => {
    it("list", async () => {
      const res = await client.withholdingTaxRates.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("workTypes", () => {
    it("list", async () => {
      const res = await client.workTypes.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // List + info resources (fetch first item, then info on it)
  // -----------------------------------------------------------------------

  describe("departments", () => {
    let firstId: string | undefined;

    it("list", async () => {
      const res = await client.departments.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
      if (res.data.length > 0) {
        firstId = (res.data[0] as { id: string }).id;
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
      const res = await client.departments.list();
      const depts = res.data as Array<{ id: string }>;
      if (depts.length > 0) {
        departmentId = depts[0].id;
      }
    });

    it("list", async () => {
      if (!departmentId) return; // skip if no departments
      const res = await client.documentTemplates.list({
        filter: {
          department_id: departmentId,
          document_type: "quotation",
        },
      });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("orders", () => {
    let firstId: string | undefined;

    it("list", async () => {
      const res = await client.orders.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
      if (res.data.length > 0) {
        firstId = (res.data[0] as { id: string }).id;
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
      const res = await client.plannableItems.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
      if (res.data.length > 0) {
        firstId = (res.data[0] as { id: string }).id;
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
