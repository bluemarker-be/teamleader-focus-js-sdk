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

  describe("incoming invoices (payment methods)", () => {
    it("listPayments → POST /incomingInvoices.listPayments", async () => {
      const { client, calls } = createClientWithBody({ data: [] });
      await client.incomingInvoices.listPayments({ id: "inv1" });
      expect(calls[0].url).toContain("/incomingInvoices.listPayments");
    });

    it("registerPayment → POST /incomingInvoices.registerPayment", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "pay1" } });
      await client.incomingInvoices.registerPayment({ id: "inv1", payment: { amount: 100, currency: "EUR", paid_at: "2026-01-01" } } as any);
      expect(calls[0].url).toContain("/incomingInvoices.registerPayment");
    });

    it("removePayment → POST /incomingInvoices.removePayment", async () => {
      const { fetchFn, calls } = mockFetch({ status: 204 });
      const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });
      await client.incomingInvoices.removePayment({ id: "pay1" } as any);
      expect(calls[0].url).toContain("/incomingInvoices.removePayment");
    });

    it("updatePayment → POST /incomingInvoices.updatePayment", async () => {
      const { fetchFn, calls } = mockFetch({ status: 204 });
      const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });
      await client.incomingInvoices.updatePayment({ id: "pay1" } as any);
      expect(calls[0].url).toContain("/incomingInvoices.updatePayment");
    });
  });

  describe("incoming credit notes (payment methods)", () => {
    it("listPayments → POST /incomingCreditNotes.listPayments", async () => {
      const { client, calls } = createClientWithBody({ data: [] });
      await client.incomingCreditNotes.listPayments({ id: "cn1" });
      expect(calls[0].url).toContain("/incomingCreditNotes.listPayments");
    });

    it("registerPayment → POST /incomingCreditNotes.registerPayment", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "pay1" } });
      await client.incomingCreditNotes.registerPayment({ id: "cn1", payment: { amount: 50, currency: "EUR", paid_at: "2026-01-01" } } as any);
      expect(calls[0].url).toContain("/incomingCreditNotes.registerPayment");
    });

    it("removePayment → POST /incomingCreditNotes.removePayment", async () => {
      const { fetchFn, calls } = mockFetch({ status: 204 });
      const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });
      await client.incomingCreditNotes.removePayment({ id: "pay1" } as any);
      expect(calls[0].url).toContain("/incomingCreditNotes.removePayment");
    });

    it("updatePayment → POST /incomingCreditNotes.updatePayment", async () => {
      const { fetchFn, calls } = mockFetch({ status: 204 });
      const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });
      await client.incomingCreditNotes.updatePayment({ id: "pay1" } as any);
      expect(calls[0].url).toContain("/incomingCreditNotes.updatePayment");
    });
  });

  describe("receipts (payment methods)", () => {
    it("listPayments → POST /receipts.listPayments", async () => {
      const { client, calls } = createClientWithBody({ data: [] });
      await client.receipts.listPayments({ id: "r1" });
      expect(calls[0].url).toContain("/receipts.listPayments");
    });

    it("registerPayment → POST /receipts.registerPayment", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "pay1" } });
      await client.receipts.registerPayment({ id: "r1", payment: { amount: 25, currency: "EUR", paid_at: "2026-01-01" } } as any);
      expect(calls[0].url).toContain("/receipts.registerPayment");
    });

    it("removePayment → POST /receipts.removePayment", async () => {
      const { fetchFn, calls } = mockFetch({ status: 204 });
      const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });
      await client.receipts.removePayment({ id: "pay1" } as any);
      expect(calls[0].url).toContain("/receipts.removePayment");
    });

    it("updatePayment → POST /receipts.updatePayment", async () => {
      const { fetchFn, calls } = mockFetch({ status: 204 });
      const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });
      await client.receipts.updatePayment({ id: "pay1" } as any);
      expect(calls[0].url).toContain("/receipts.updatePayment");
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
