import { describe, it, expect } from "vitest";
import { getClient, noToken, isoDate, futureDate } from "./setup.js";

describe.skipIf(noToken)("Users & Account", () => {
  const client = getClient();
  let userId: string;

  // -----------------------------------------------------------------------
  // Users
  // -----------------------------------------------------------------------

  describe.sequential("users", () => {
    it("me", async () => {
      const res = await client.users.me();
      expect(res).toHaveProperty("data");
      const data = res.data as { id: string };
      expect(data).toHaveProperty("id");
      userId = data.id;
    });

    it("list", async () => {
      const res = await client.users.list();
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
      expect(res.data.length).toBeGreaterThan(0);
    });

    it("info", async () => {
      const res = await client.users.info({ id: userId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(userId);
    });

    it("listDaysOff", async () => {
      const res = await client.users.listDaysOff({
        id: userId,
        filter: {
          starts_after: isoDate(),
          ends_before: futureDate(365),
        },
        page: { size: 10, number: 1 },
      });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });

    it("getWeekSchedule", async () => {
      const res = await client.users.getWeekSchedule({ id: userId });
      expect(res).toHaveProperty("data");
    });
  });

  // -----------------------------------------------------------------------
  // Account
  // -----------------------------------------------------------------------

  describe("accounts", () => {
    it("projectsV2Status", async () => {
      const res = await client.accounts.projectsV2Status();
      expect(res).toHaveProperty("data");
    });
  });

  // -----------------------------------------------------------------------
  // Currencies
  // -----------------------------------------------------------------------

  describe("currencies", () => {
    it("exchangeRates", async () => {
      const res = await client.currencies.exchangeRates({
        base: "USD",
      });
      expect(res).toHaveProperty("data");
    });
  });

  // -----------------------------------------------------------------------
  // User Availability
  // -----------------------------------------------------------------------

  describe.sequential("userAvailability", () => {
    it("total", async () => {
      const res = await client.userAvailability.total({
        period: {
          start_date: isoDate(),
          end_date: futureDate(7),
        },
        filter: { assignees: [{ type: "user", id: userId }] },
      });
      expect(res).toHaveProperty("data");
    });

    it("daily", async () => {
      const res = await client.userAvailability.daily({
        period: {
          start_date: isoDate(),
          end_date: futureDate(7),
        },
        filter: { assignees: [{ type: "user", id: userId }] },
      });
      expect(res).toHaveProperty("data");
    });
  });
});
