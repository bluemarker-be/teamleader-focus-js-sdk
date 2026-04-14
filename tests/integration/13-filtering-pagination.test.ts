import { describe, it, expect, afterAll } from "vitest";
import { getClient, noToken, cleanupAll, delay } from "./setup.js";
import { paginatePages, paginateItems } from "../../src/paginator.js";

describe.skipIf(noToken)("Filtering & Pagination", () => {
  const client = getClient();

  let contactIds: string[] = [];

  // -----------------------------------------------------------------------
  // Setup: create 3+ contacts for pagination testing
  // -----------------------------------------------------------------------

  describe.sequential("setup", () => {
    it("create 3 contacts", async () => {
      await delay(3000);

      for (let i = 1; i <= 3; i++) {
        const res = await client.contacts.add({
          first_name: "SDKPage",
          last_name: `TestContact${i}`,
          emails: [{ type: "primary", email: `sdk-page-${i}@example.com` }],
        });
        contactIds.push((res.data as { id: string }).id);
      }
    });
  });

  // -----------------------------------------------------------------------
  // Filter verification
  // -----------------------------------------------------------------------

  describe.sequential("filtering", () => {
    it("contacts.list filter.term returns matching results", async () => {
      await delay(1000); // allow indexing
      const res = await client.contacts.list({
        filter: { term: "SDKPage" },
        page: { size: 100, number: 1 },
      });
      const contacts = res.data as Array<{ first_name: string }>;
      expect(contacts.length).toBeGreaterThanOrEqual(3);

      // Every result should contain "SDKPage" in first_name
      for (const c of contacts) {
        expect(c.first_name).toContain("SDKPage");
      }
    });

    it("contacts.list filter.ids returns only requested contacts", async () => {
      const requestedIds = contactIds.slice(0, 2); // first 2
      const res = await client.contacts.list({
        filter: { ids: requestedIds },
      });
      const contacts = res.data as Array<{ id: string }>;
      expect(contacts).toHaveLength(2);
      for (const c of contacts) {
        expect(requestedIds).toContain(c.id);
      }
    });
  });

  // -----------------------------------------------------------------------
  // Pagination verification
  // -----------------------------------------------------------------------

  describe.sequential("pagination", () => {
    it("page.size limits results and meta reflects pagination", async () => {
      const res = await client.contacts.list({
        filter: { term: "SDKPage" },
        page: { size: 2, number: 1 },
      });
      const contacts = res.data as Array<{ id: string }>;

      expect(contacts.length).toBeLessThanOrEqual(2);

      // Meta may be present with matches count
      if (res.meta) {
        const meta = res.meta as { page: { size: number; number: number }; matches: number };
        expect(meta.matches).toBeGreaterThanOrEqual(3);
        expect(meta.page.size).toBe(2);
        expect(meta.page.number).toBe(1);
      }
    });

    it("page 2 returns different items than page 1", async () => {
      const page1 = await client.contacts.list({
        filter: { term: "SDKPage" },
        page: { size: 2, number: 1 },
      });
      const page2 = await client.contacts.list({
        filter: { term: "SDKPage" },
        page: { size: 2, number: 2 },
      });

      const page1Ids = (page1.data as Array<{ id: string }>).map((c) => c.id);
      const page2Ids = (page2.data as Array<{ id: string }>).map((c) => c.id);

      // Page 2 should have at least 1 item (we created 3 with size 2)
      expect(page2Ids.length).toBeGreaterThanOrEqual(1);

      // No overlap between pages
      for (const id of page2Ids) {
        expect(page1Ids).not.toContain(id);
      }
    });

    it("paginateItems collects all items across pages", async () => {
      const allItems: Array<{ id: string }> = [];
      for await (const item of paginateItems<{ id: string }>(
        client,
        "/contacts.list",
        { filter: { term: "SDKPage" }, page: { size: 2 } },
      )) {
        allItems.push(item);
      }

      expect(allItems.length).toBeGreaterThanOrEqual(3);
      // All our test contact IDs should be in the results
      for (const id of contactIds) {
        expect(allItems.some((item) => item.id === id)).toBe(true);
      }
    });

    it("paginatePages yields non-empty pages", async () => {
      const pages: Array<{ data: unknown[] }> = [];
      for await (const page of paginatePages(
        client,
        "/contacts.list",
        { filter: { term: "SDKPage" }, page: { size: 2 } },
      )) {
        pages.push(page);
      }

      expect(pages.length).toBeGreaterThanOrEqual(2);
      // Every yielded page should have data (verifies the empty-page fix)
      for (const page of pages) {
        expect(page.data.length).toBeGreaterThan(0);
      }
    });
  });

  // -----------------------------------------------------------------------
  // Sorting verification
  // -----------------------------------------------------------------------

  describe.sequential("sorting", () => {
    it("contacts.list sorted by name asc", async () => {
      const res = await client.contacts.list({
        filter: { term: "SDKPage" },
        sort: [{ field: "name", order: "asc" }],
        page: { size: 100, number: 1 },
      });
      const contacts = res.data as Array<{ last_name: string }>;
      const names = contacts.map((c) => c.last_name);
      const sorted = [...names].sort();
      expect(names).toEqual(sorted);
    });
  });

  // -----------------------------------------------------------------------
  // Cleanup
  // -----------------------------------------------------------------------

  afterAll(async () => {
    await cleanupAll(
      contactIds.map((id) => () => client.contacts.delete({ id })),
    );
  });
});
