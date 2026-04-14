import { describe, it, expect, afterAll } from "vitest";
import { getClient, noToken, cleanupAll, delay, collect } from "./setup.js";

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
      const contacts = await collect(
        client.contacts.list({
          filter: { term: "SDKPage" },
          page: { size: 100, number: 1 },
        }, { maxPages: 1 }),
      ) as Array<{ first_name: string }>;
      expect(contacts.length).toBeGreaterThanOrEqual(3);

      // Every result should contain "SDKPage" in first_name
      for (const c of contacts) {
        expect(c.first_name).toContain("SDKPage");
      }
    });

    it("contacts.list filter.ids returns only requested contacts", async () => {
      const requestedIds = contactIds.slice(0, 2); // first 2
      const contacts = await collect(
        client.contacts.list({
          filter: { ids: requestedIds },
        }, { maxPages: 1 }),
      ) as Array<{ id: string }>;
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
    it("maxPages: 1 with page.size: 2 caps at one page", async () => {
      const contacts = await collect(
        client.contacts.list({
          filter: { term: "SDKPage" },
          page: { size: 2, number: 1 },
        }, { maxPages: 1 }),
      ) as Array<{ id: string }>;

      expect(contacts.length).toBeLessThanOrEqual(2);
    });

    it("auto-paginates across all pages (no maxPages)", async () => {
      // No maxPages — iterator should fetch all pages automatically
      const contacts = await collect(
        client.contacts.list({
          filter: { term: "SDKPage" },
          page: { size: 2 },
        }),
      ) as Array<{ id: string }>;

      // Should include all 3 test contacts across multiple pages
      expect(contacts.length).toBeGreaterThanOrEqual(3);
      for (const id of contactIds) {
        expect(contacts.some((c) => c.id === id)).toBe(true);
      }
    });

    it("client.paginatePages yields non-empty pages (low-level API)", async () => {
      const pages: Array<{ data: unknown[] }> = [];
      for await (const page of client.paginatePages(
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
      const contacts = await collect(
        client.contacts.list({
          filter: { term: "SDKPage" },
          sort: [{ field: "name", order: "asc" }],
          page: { size: 100, number: 1 },
        }, { maxPages: 1 }),
      ) as Array<{ last_name: string }>;
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
