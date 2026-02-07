import { describe, it, expect } from "vitest";
import { TeamleaderClient } from "../src/client.js";
import { paginatePages, paginateItems } from "../src/paginator.js";
import { mockFetchSequence } from "./helpers.js";

describe("Pagination", () => {
  it("paginatePages iterates through all pages", async () => {
    const { fetchFn } = mockFetchSequence([
      {
        body: {
          data: [{ id: "1" }, { id: "2" }],
          meta: { page: { size: 2, number: 1 }, matches: 3 },
        },
      },
      {
        body: {
          data: [{ id: "3" }],
          meta: { page: { size: 2, number: 2 }, matches: 3 },
        },
      },
    ]);
    const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });

    const pages: unknown[] = [];
    for await (const page of paginatePages(client, "/contacts.list", { page: { size: 2 } })) {
      pages.push(page);
    }

    expect(pages).toHaveLength(2);
  });

  it("paginateItems yields individual items", async () => {
    const { fetchFn } = mockFetchSequence([
      {
        body: {
          data: [{ id: "1" }, { id: "2" }],
          meta: { page: { size: 2, number: 1 }, matches: 3 },
        },
      },
      {
        body: {
          data: [{ id: "3" }],
          meta: { page: { size: 2, number: 2 }, matches: 3 },
        },
      },
    ]);
    const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });

    const items: unknown[] = [];
    for await (const item of paginateItems(client, "/contacts.list", { page: { size: 2 } })) {
      items.push(item);
    }

    expect(items).toHaveLength(3);
    expect(items).toEqual([{ id: "1" }, { id: "2" }, { id: "3" }]);
  });

  it("stops on empty page", async () => {
    const { fetchFn } = mockFetchSequence([
      {
        body: {
          data: [{ id: "1" }],
          meta: { page: { size: 20, number: 1 }, matches: 1 },
        },
      },
    ]);
    const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });

    const items: unknown[] = [];
    for await (const item of paginateItems(client, "/contacts.list")) {
      items.push(item);
    }

    expect(items).toHaveLength(1);
  });

  it("respects maxPages limit", async () => {
    const { fetchFn, calls } = mockFetchSequence(
      Array(10).fill({
        body: {
          data: Array(20).fill({ id: "x" }),
          meta: { page: { size: 20, number: 1 }, matches: 1000 },
        },
      }),
    );
    const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });

    const items: unknown[] = [];
    for await (const item of paginateItems(client, "/contacts.list", {}, { maxPages: 2 })) {
      items.push(item);
    }

    expect(calls).toHaveLength(2);
    expect(items).toHaveLength(40); // 2 pages * 20 items
  });

  it("sends correct page numbers in sequence", async () => {
    const { fetchFn, calls } = mockFetchSequence([
      {
        body: {
          data: [{ id: "1" }, { id: "2" }],
          meta: { page: { size: 2, number: 1 }, matches: 4 },
        },
      },
      {
        body: {
          data: [{ id: "3" }, { id: "4" }],
          meta: { page: { size: 2, number: 2 }, matches: 4 },
        },
      },
    ]);
    const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });

    for await (const _ of paginatePages(client, "/contacts.list", { page: { size: 2 } })) {
      // consume
    }

    const page1Body = JSON.parse(calls[0].init.body as string);
    const page2Body = JSON.parse(calls[1].init.body as string);
    expect(page1Body.page).toEqual({ size: 2, number: 1 });
    expect(page2Body.page).toEqual({ size: 2, number: 2 });
  });
});
