import { describe, it, expect } from "vitest";
import { TeamleaderClient } from "../src/client.js";
import { mockFetch } from "./helpers.js";

describe("Resources", () => {
  function createClient() {
    const { fetchFn, calls } = mockFetch({ body: { data: [] } });
    const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });
    return { client, calls };
  }

  function createClientWithBody(body: unknown) {
    const { fetchFn, calls } = mockFetch({ body });
    const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });
    return { client, calls };
  }

  describe("contacts", () => {
    it("list → POST /contacts.list", async () => {
      const { client, calls } = createClient();
      await client.contacts.list();
      expect(calls[0].url).toContain("/contacts.list");
    });

    it("info → POST /contacts.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "abc" } });
      await client.contacts.info({ id: "abc" });
      expect(calls[0].url).toContain("/contacts.info");
      expect(JSON.parse(calls[0].init.body as string)).toEqual({ id: "abc" });
    });

    it("add → POST /contacts.add", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "contact", id: "new" } });
      await client.contacts.add({ first_name: "John", last_name: "Doe" });
      expect(calls[0].url).toContain("/contacts.add");
    });

    it("tag → POST /contacts.tag", async () => {
      const { fetchFn, calls } = mockFetch({ status: 204 });
      const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });
      await client.contacts.tag({ id: "abc", tags: ["vip"] });
      expect(calls[0].url).toContain("/contacts.tag");
    });
  });

  describe("companies", () => {
    it("list → POST /companies.list", async () => {
      const { client, calls } = createClient();
      await client.companies.list();
      expect(calls[0].url).toContain("/companies.list");
    });
  });

  describe("deals", () => {
    it("create → POST /deals.create", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "deal", id: "d1" } });
      await client.deals.create({ title: "Big deal", lead: { customer: { type: "contact", id: "c1" }, department_id: "dep1" } });
      expect(calls[0].url).toContain("/deals.create");
    });

    it("win → POST /deals.win", async () => {
      const { fetchFn, calls } = mockFetch({ status: 204 });
      const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });
      await client.deals.win({ id: "d1" });
      expect(calls[0].url).toContain("/deals.win");
    });
  });

  describe("users", () => {
    it("me → POST /users.me", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "u1", first_name: "Admin" } });
      await client.users.me();
      expect(calls[0].url).toContain("/users.me");
      expect(calls[0].init.body).toBeUndefined();
    });
  });

  describe("invoices", () => {
    it("list → POST /invoices.list", async () => {
      const { client, calls } = createClient();
      await client.invoices.list();
      expect(calls[0].url).toContain("/invoices.list");
    });
  });

  describe("projects (v2)", () => {
    it("list → POST /projects-v2/projects.list", async () => {
      const { client, calls } = createClient();
      await client.projects.list();
      expect(calls[0].url).toContain("/projects-v2/projects.list");
    });

    it("create → POST /projects-v2/projects.create", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "project", id: "p1" } });
      await client.projects.create({ title: "New Project" });
      expect(calls[0].url).toContain("/projects-v2/projects.create");
    });
  });

  describe("project sub-resources", () => {
    it("projectTasks.list → POST /projects-v2/tasks.list", async () => {
      const { client, calls } = createClient();
      await client.projectTasks.list({ project_id: "p1" });
      expect(calls[0].url).toContain("/projects-v2/tasks.list");
    });

    it("projectMaterials.list → POST /projects-v2/materials.list", async () => {
      const { client, calls } = createClient();
      await client.projectMaterials.list({ project_id: "p1" });
      expect(calls[0].url).toContain("/projects-v2/materials.list");
    });
  });

  describe("webhooks", () => {
    it("register → POST /webhooks.register", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "webhook", id: "w1" } });
      await client.webhooks.register({ url: "https://example.com/hook", types: ["contact.added"] });
      expect(calls[0].url).toContain("/webhooks.register");
    });
  });

  describe("time tracking", () => {
    it("list → POST /timeTracking.list", async () => {
      const { client, calls } = createClient();
      await client.timeTracking.list();
      expect(calls[0].url).toContain("/timeTracking.list");
    });
  });

  describe("other resources send correct endpoints", () => {
    const cases: Array<[string, (client: TeamleaderClient) => Promise<unknown>]> = [
      ["departments.list", (c) => c.departments.list()],
      ["teams.list", (c) => c.teams.list()],
      ["tags.list", (c) => c.tags.list()],
      ["taxRates.list", (c) => c.taxRates.list()],
      ["paymentTerms.list", (c) => c.paymentTerms.list()],
      ["activityTypes.list", (c) => c.activityTypes.list()],
      ["businessTypes.list", (c) => c.businessTypes.list()],
      ["lostReasons.list", (c) => c.lostReasons.list()],
      ["workTypes.list", (c) => c.workTypes.list()],
      ["ticketStatus.list", (c) => c.ticketStatus.list()],
    ];

    for (const [endpoint, fn] of cases) {
      it(`${endpoint}`, async () => {
        const { client, calls } = createClient();
        await fn(client);
        expect(calls[0].url).toContain(`/${endpoint}`);
      });
    }
  });
});
