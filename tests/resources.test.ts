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

  function createVoidClient() {
    const { fetchFn, calls } = mockFetch({ status: 204 });
    const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });
    return { client, calls };
  }

  // ---------------------------------------------------------------------------
  // Contacts
  // ---------------------------------------------------------------------------

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

    it("update → POST /contacts.update", async () => {
      const { client, calls } = createVoidClient();
      await client.contacts.update({ id: "abc", first_name: "Jane" });
      expect(calls[0].url).toContain("/contacts.update");
    });

    it("delete → POST /contacts.delete", async () => {
      const { client, calls } = createVoidClient();
      await client.contacts.delete({ id: "abc" });
      expect(calls[0].url).toContain("/contacts.delete");
    });

    it("tag → POST /contacts.tag", async () => {
      const { client, calls } = createVoidClient();
      await client.contacts.tag({ id: "abc", tags: ["vip"] });
      expect(calls[0].url).toContain("/contacts.tag");
    });

    it("untag → POST /contacts.untag", async () => {
      const { client, calls } = createVoidClient();
      await client.contacts.untag({ id: "abc", tags: ["vip"] });
      expect(calls[0].url).toContain("/contacts.untag");
    });

    it("linkToCompany → POST /contacts.linkToCompany", async () => {
      const { client, calls } = createVoidClient();
      await client.contacts.linkToCompany({ id: "abc", company_id: "comp1" });
      expect(calls[0].url).toContain("/contacts.linkToCompany");
    });

    it("unlinkFromCompany → POST /contacts.unlinkFromCompany", async () => {
      const { client, calls } = createVoidClient();
      await client.contacts.unlinkFromCompany({ id: "abc", company_id: "comp1" });
      expect(calls[0].url).toContain("/contacts.unlinkFromCompany");
    });

    it("updateCompanyLink → POST /contacts.updateCompanyLink", async () => {
      const { client, calls } = createVoidClient();
      await client.contacts.updateCompanyLink({ id: "abc", company_id: "comp1" });
      expect(calls[0].url).toContain("/contacts.updateCompanyLink");
    });

    it("uploadAvatar → POST /contacts.uploadAvatar", async () => {
      const { client, calls } = createVoidClient();
      await client.contacts.uploadAvatar({ id: "abc", image: null });
      expect(calls[0].url).toContain("/contacts.uploadAvatar");
    });
  });

  // ---------------------------------------------------------------------------
  // Companies
  // ---------------------------------------------------------------------------

  describe("companies", () => {
    it("list → POST /companies.list", async () => {
      const { client, calls } = createClient();
      await client.companies.list();
      expect(calls[0].url).toContain("/companies.list");
    });

    it("info → POST /companies.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "c1" } });
      await client.companies.info({ id: "c1" });
      expect(calls[0].url).toContain("/companies.info");
    });

    it("add → POST /companies.add", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "company", id: "c1" } });
      await client.companies.add({ name: "Acme" });
      expect(calls[0].url).toContain("/companies.add");
    });

    it("update → POST /companies.update", async () => {
      const { client, calls } = createVoidClient();
      await client.companies.update({ id: "c1", name: "Acme Inc" });
      expect(calls[0].url).toContain("/companies.update");
    });

    it("delete → POST /companies.delete", async () => {
      const { client, calls } = createVoidClient();
      await client.companies.delete({ id: "c1" });
      expect(calls[0].url).toContain("/companies.delete");
    });

    it("tag → POST /companies.tag", async () => {
      const { client, calls } = createVoidClient();
      await client.companies.tag({ id: "c1", tags: ["enterprise"] });
      expect(calls[0].url).toContain("/companies.tag");
    });

    it("untag → POST /companies.untag", async () => {
      const { client, calls } = createVoidClient();
      await client.companies.untag({ id: "c1", tags: ["enterprise"] });
      expect(calls[0].url).toContain("/companies.untag");
    });

    it("uploadLogo → POST /companies.uploadLogo", async () => {
      const { client, calls } = createVoidClient();
      await client.companies.uploadLogo({ id: "c1", image: null });
      expect(calls[0].url).toContain("/companies.uploadLogo");
    });
  });

  // ---------------------------------------------------------------------------
  // Deals
  // ---------------------------------------------------------------------------

  describe("deals", () => {
    it("list → POST /deals.list", async () => {
      const { client, calls } = createClient();
      await client.deals.list();
      expect(calls[0].url).toContain("/deals.list");
    });

    it("info → POST /deals.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "d1" } });
      await client.deals.info({ id: "d1" });
      expect(calls[0].url).toContain("/deals.info");
    });

    it("create → POST /deals.create", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "deal", id: "d1" } });
      await client.deals.create({ title: "Big deal", lead: { customer: { type: "contact", id: "c1" } } });
      expect(calls[0].url).toContain("/deals.create");
    });

    it("update → POST /deals.update", async () => {
      const { client, calls } = createVoidClient();
      await client.deals.update({ id: "d1", title: "Bigger deal" });
      expect(calls[0].url).toContain("/deals.update");
    });

    it("move → POST /deals.move", async () => {
      const { client, calls } = createVoidClient();
      await client.deals.move({ id: "d1", phase_id: "ph2" });
      expect(calls[0].url).toContain("/deals.move");
    });

    it("win → POST /deals.win", async () => {
      const { client, calls } = createVoidClient();
      await client.deals.win({ id: "d1" });
      expect(calls[0].url).toContain("/deals.win");
    });

    it("lose → POST /deals.lose", async () => {
      const { client, calls } = createVoidClient();
      await client.deals.lose({ id: "d1" });
      expect(calls[0].url).toContain("/deals.lose");
    });

    it("delete → POST /deals.delete", async () => {
      const { client, calls } = createVoidClient();
      await client.deals.delete({ id: "d1" });
      expect(calls[0].url).toContain("/deals.delete");
    });
  });

  // ---------------------------------------------------------------------------
  // Users
  // ---------------------------------------------------------------------------

  describe("users", () => {
    it("me → POST /users.me", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "u1" } });
      await client.users.me();
      expect(calls[0].url).toContain("/users.me");
      expect(calls[0].init.body).toBeUndefined();
    });

    it("list → POST /users.list", async () => {
      const { client, calls } = createClient();
      await client.users.list();
      expect(calls[0].url).toContain("/users.list");
    });

    it("info → POST /users.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "u1" } });
      await client.users.info({ id: "u1" });
      expect(calls[0].url).toContain("/users.info");
    });

    it("listDaysOff → POST /users.listDaysOff", async () => {
      const { client, calls } = createClient();
      await client.users.listDaysOff({ id: "u1" });
      expect(calls[0].url).toContain("/users.listDaysOff");
    });

    it("getWeekSchedule → POST /users.getWeekSchedule", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.users.getWeekSchedule({ id: "u1" });
      expect(calls[0].url).toContain("/users.getWeekSchedule");
    });
  });

  // ---------------------------------------------------------------------------
  // Invoices
  // ---------------------------------------------------------------------------

  describe("invoices", () => {
    const invoiceEndpoints: Array<[string, (c: TeamleaderClient) => Promise<unknown>]> = [
      ["invoices.list", (c) => c.invoices.list()],
      ["invoices.info", (c) => c.invoices.info({ id: "i1" })],
      ["invoices.download", (c) => c.invoices.download({ id: "i1", format: "pdf" })],
      ["invoices.draft", (c) => c.invoices.draft({
        invoicee: { customer: { type: "contact", id: "c1" } },
        department_id: "dep1",
        payment_term: { type: "cash" },
        grouped_lines: [{ line_items: [{ quantity: 1, description: "Line", tax_rate_id: "tr1" }] }],
      })],
      ["invoices.copy", (c) => c.invoices.copy({ id: "i1" })],
      ["invoices.credit", (c) => c.invoices.credit({ id: "i1" })],
      ["invoices.creditPartially", (c) => c.invoices.creditPartially({
        id: "i1",
        grouped_lines: [{ line_items: [{ quantity: 1, description: "Line", tax_rate_id: "tr1" }] }],
      })],
    ];

    for (const [endpoint, fn] of invoiceEndpoints) {
      it(`${endpoint.split(".")[1]} → POST /${endpoint}`, async () => {
        const { client, calls } = createClientWithBody({ data: {} });
        await fn(client);
        expect(calls[0].url).toContain(`/${endpoint}`);
      });
    }

    const voidEndpoints: Array<[string, (c: TeamleaderClient) => Promise<unknown>]> = [
      ["invoices.update", (c) => c.invoices.update({ id: "i1" })],
      ["invoices.updateBooked", (c) => c.invoices.updateBooked({ id: "i1" })],
      ["invoices.book", (c) => c.invoices.book({ id: "i1", on: "2026-01-01" })],
      ["invoices.delete", (c) => c.invoices.delete({ id: "i1" })],
      ["invoices.registerPayment", (c) => c.invoices.registerPayment({
        id: "i1",
        payment: { amount: 100, currency: "EUR" },
        paid_at: "2026-01-01T10:00:00+00:00",
      })],
      ["invoices.removePayments", (c) => c.invoices.removePayments({ id: "i1" })],
      ["invoices.send", (c) => c.invoices.send({
        id: "i1",
        content: { subject: "Inv", body: "Body" },
      })],
      ["invoices.sendViaPeppol", (c) => c.invoices.sendViaPeppol({ id: "i1" })],
    ];

    for (const [endpoint, fn] of voidEndpoints) {
      it(`${endpoint.split(".")[1]} → POST /${endpoint}`, async () => {
        const { client, calls } = createVoidClient();
        await fn(client);
        expect(calls[0].url).toContain(`/${endpoint}`);
      });
    }
  });

  // ---------------------------------------------------------------------------
  // Quotations
  // ---------------------------------------------------------------------------

  describe("quotations", () => {
    it("list → POST /quotations.list", async () => {
      const { client, calls } = createClient();
      await client.quotations.list();
      expect(calls[0].url).toContain("/quotations.list");
    });

    it("info → POST /quotations.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "q1" } });
      await client.quotations.info({ id: "q1" });
      expect(calls[0].url).toContain("/quotations.info");
    });

    it("download → POST /quotations.download", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.quotations.download({ id: "q1", format: "pdf" });
      expect(calls[0].url).toContain("/quotations.download");
    });

    it("create → POST /quotations.create", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "quotation", id: "q1" } });
      await client.quotations.create({
        deal_id: "d1",
        grouped_lines: [{ line_items: [{ quantity: 1, description: "Line", tax_rate_id: "tr1" }] }],
      });
      expect(calls[0].url).toContain("/quotations.create");
    });

    it("send → POST /quotations.send", async () => {
      const { client, calls } = createVoidClient();
      await client.quotations.send({
        quotations: ["q1"],
        recipients: { to: [{ email_address: "test@example.com" }] },
        subject: "Quote",
        content: "Body",
        language: "en",
      });
      expect(calls[0].url).toContain("/quotations.send");
    });

    it("update → POST /quotations.update", async () => {
      const { client, calls } = createVoidClient();
      await client.quotations.update({ id: "q1" });
      expect(calls[0].url).toContain("/quotations.update");
    });

    it("accept → POST /quotations.accept", async () => {
      const { client, calls } = createVoidClient();
      await client.quotations.accept({ id: "q1" });
      expect(calls[0].url).toContain("/quotations.accept");
    });

    it("delete → POST /quotations.delete", async () => {
      const { client, calls } = createVoidClient();
      await client.quotations.delete({ id: "q1" });
      expect(calls[0].url).toContain("/quotations.delete");
    });
  });

  // ---------------------------------------------------------------------------
  // Products
  // ---------------------------------------------------------------------------

  describe("products", () => {
    it("list → POST /products.list", async () => {
      const { client, calls } = createClient();
      await client.products.list();
      expect(calls[0].url).toContain("/products.list");
    });

    it("info → POST /products.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "p1" } });
      await client.products.info({ id: "p1" });
      expect(calls[0].url).toContain("/products.info");
    });

    it("add → POST /products.add", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "product", id: "p1" } });
      await client.products.add({ name: "Widget" });
      expect(calls[0].url).toContain("/products.add");
    });

    it("update → POST /products.update", async () => {
      const { client, calls } = createVoidClient();
      await client.products.update({ id: "p1" });
      expect(calls[0].url).toContain("/products.update");
    });

    it("delete → POST /products.delete", async () => {
      const { client, calls } = createVoidClient();
      await client.products.delete({ id: "p1" });
      expect(calls[0].url).toContain("/products.delete");
    });
  });

  // ---------------------------------------------------------------------------
  // Projects v2
  // ---------------------------------------------------------------------------

  describe("projects (v2)", () => {
    it("list → POST /projects-v2/projects.list", async () => {
      const { client, calls } = createClient();
      await client.projects.list();
      expect(calls[0].url).toContain("/projects-v2/projects.list");
    });

    it("info → POST /projects-v2/projects.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "p1" } });
      await client.projects.info({ id: "p1" });
      expect(calls[0].url).toContain("/projects-v2/projects.info");
    });

    it("create → POST /projects-v2/projects.create", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "project", id: "p1" } });
      await client.projects.create({ title: "New Project" });
      expect(calls[0].url).toContain("/projects-v2/projects.create");
    });

    const voidMethods: Array<[string, (c: TeamleaderClient) => Promise<unknown>]> = [
      ["projects.update", (c) => c.projects.update({ id: "p1", title: "Updated" })],
      ["projects.close", (c) => c.projects.close({ id: "p1", closing_strategy: "none" })],
      ["projects.reopen", (c) => c.projects.reopen({ id: "p1" })],
      ["projects.delete", (c) => c.projects.delete({ id: "p1", delete_strategy: "unlink_tasks_and_time_trackings" })],
      ["projects.addOwner", (c) => c.projects.addOwner({ id: "p1", user_id: "u1" })],
      ["projects.removeOwner", (c) => c.projects.removeOwner({ id: "p1", user_id: "u1" })],
      ["projects.assign", (c) => c.projects.assign({ id: "p1", assignee: { type: "user", id: "u1" } })],
      ["projects.unassign", (c) => c.projects.unassign({ id: "p1", assignee: { type: "user", id: "u1" } })],
      ["projects.addCustomer", (c) => c.projects.addCustomer({ id: "p1", customer: { type: "contact", id: "c1" } })],
      ["projects.removeCustomer", (c) => c.projects.removeCustomer({ id: "p1", customer: { type: "contact", id: "c1" } })],
      ["projects.addDeal", (c) => c.projects.addDeal({ id: "p1", deal_id: "d1" })],
      ["projects.removeDeal", (c) => c.projects.removeDeal({ id: "p1", deal_id: "d1" })],
      ["projects.addQuotation", (c) => c.projects.addQuotation({ id: "p1", quotation_id: "q1" })],
      ["projects.removeQuotation", (c) => c.projects.removeQuotation({ id: "p1", quotation_id: "q1" })],
    ];

    for (const [endpoint, fn] of voidMethods) {
      it(`${endpoint.split(".")[1]} → POST /projects-v2/${endpoint}`, async () => {
        const { client, calls } = createVoidClient();
        await fn(client);
        expect(calls[0].url).toContain(`/projects-v2/${endpoint}`);
      });
    }

    it("duplicate → POST /projects-v2/projects.duplicate", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "project", id: "p2" } });
      await client.projects.duplicate({ id: "p1", title: "Duplicated" });
      expect(calls[0].url).toContain("/projects-v2/projects.duplicate");
    });
  });

  // ---------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------

  describe("events", () => {
    it("list → POST /events.list", async () => {
      const { client, calls } = createClient();
      await client.events.list();
      expect(calls[0].url).toContain("/events.list");
    });

    it("info → POST /events.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "e1" } });
      await client.events.info({ id: "e1" });
      expect(calls[0].url).toContain("/events.info");
    });

    it("create → POST /events.create", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "event", id: "e1" } });
      await client.events.create({
        title: "Ev",
        activity_type_id: "at1",
        starts_at: "2026-01-01T10:00:00+00:00",
        ends_at: "2026-01-01T11:00:00+00:00",
      });
      expect(calls[0].url).toContain("/events.create");
    });

    it("update → POST /events.update", async () => {
      const { client, calls } = createVoidClient();
      await client.events.update({ id: "e1" });
      expect(calls[0].url).toContain("/events.update");
    });

    it("cancel → POST /events.cancel", async () => {
      const { client, calls } = createVoidClient();
      await client.events.cancel({ id: "e1" });
      expect(calls[0].url).toContain("/events.cancel");
    });
  });

  // ---------------------------------------------------------------------------
  // Tasks
  // ---------------------------------------------------------------------------

  describe("tasks", () => {
    it("list → POST /tasks.list", async () => {
      const { client, calls } = createClient();
      await client.tasks.list();
      expect(calls[0].url).toContain("/tasks.list");
    });

    it("info → POST /tasks.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "t1" } });
      await client.tasks.info({ id: "t1" });
      expect(calls[0].url).toContain("/tasks.info");
    });

    it("create → POST /tasks.create", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "task", id: "t1" } });
      await client.tasks.create({ title: "Todo", due_on: "2026-01-01", work_type_id: "wt1" });
      expect(calls[0].url).toContain("/tasks.create");
    });

    it("update → POST /tasks.update", async () => {
      const { client, calls } = createVoidClient();
      await client.tasks.update({ id: "t1" });
      expect(calls[0].url).toContain("/tasks.update");
    });

    it("complete → POST /tasks.complete", async () => {
      const { client, calls } = createVoidClient();
      await client.tasks.complete({ id: "t1" });
      expect(calls[0].url).toContain("/tasks.complete");
    });

    it("reopen → POST /tasks.reopen", async () => {
      const { client, calls } = createVoidClient();
      await client.tasks.reopen({ id: "t1" });
      expect(calls[0].url).toContain("/tasks.reopen");
    });

    it("schedule → POST /tasks.schedule", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.tasks.schedule({
        id: "t1",
        starts_at: "2026-01-01T10:00:00+00:00",
        ends_at: "2026-01-01T11:00:00+00:00",
      });
      expect(calls[0].url).toContain("/tasks.schedule");
    });

    it("delete → POST /tasks.delete", async () => {
      const { client, calls } = createVoidClient();
      await client.tasks.delete({ id: "t1" });
      expect(calls[0].url).toContain("/tasks.delete");
    });
  });

  // ---------------------------------------------------------------------------
  // Meetings
  // ---------------------------------------------------------------------------

  describe("meetings", () => {
    it("list → POST /meetings.list", async () => {
      const { client, calls } = createClient();
      await client.meetings.list();
      expect(calls[0].url).toContain("/meetings.list");
    });

    it("info → POST /meetings.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "m1" } });
      await client.meetings.info({ id: "m1" });
      expect(calls[0].url).toContain("/meetings.info");
    });

    it("schedule → POST /meetings.schedule", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "meeting", id: "m1" } });
      await client.meetings.schedule({
        title: "Sync",
        starts_at: "2026-01-01T10:00:00+00:00",
        ends_at: "2026-01-01T11:00:00+00:00",
        attendees: [{ type: "user", id: "u1" }],
      });
      expect(calls[0].url).toContain("/meetings.schedule");
    });

    it("update → POST /meetings.update", async () => {
      const { client, calls } = createVoidClient();
      await client.meetings.update({ id: "m1" });
      expect(calls[0].url).toContain("/meetings.update");
    });

    it("complete → POST /meetings.complete", async () => {
      const { client, calls } = createVoidClient();
      await client.meetings.complete({ id: "m1" });
      expect(calls[0].url).toContain("/meetings.complete");
    });

    it("createReport → POST /meetings.createReport", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.meetings.createReport({
        id: "m1",
        attach_to: { type: "contact", id: "c1" },
      });
      expect(calls[0].url).toContain("/meetings.createReport");
    });

    it("delete → POST /meetings.delete", async () => {
      const { client, calls } = createVoidClient();
      await client.meetings.delete({ id: "m1" });
      expect(calls[0].url).toContain("/meetings.delete");
    });
  });

  // ---------------------------------------------------------------------------
  // Notes
  // ---------------------------------------------------------------------------

  describe("notes", () => {
    it("list → POST /notes.list", async () => {
      const { client, calls } = createClient();
      await client.notes.list({ filter: { subject: { type: "contact", id: "c1" } } });
      expect(calls[0].url).toContain("/notes.list");
    });

    it("create → POST /notes.create", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "note", id: "n1" } });
      await client.notes.create({ subject: { type: "contact", id: "c1" }, content: "Hi" });
      expect(calls[0].url).toContain("/notes.create");
    });

    it("update → POST /notes.update", async () => {
      const { client, calls } = createVoidClient();
      await client.notes.update({ id: "n1", content: "Updated" });
      expect(calls[0].url).toContain("/notes.update");
    });
  });

  // ---------------------------------------------------------------------------
  // Calls
  // ---------------------------------------------------------------------------

  describe("calls", () => {
    it("list → POST /calls.list", async () => {
      const { client, calls: c } = createClient();
      await client.calls.list();
      expect(c[0].url).toContain("/calls.list");
    });

    it("info → POST /calls.info", async () => {
      const { client, calls: c } = createClientWithBody({ data: { id: "cl1" } });
      await client.calls.info({ id: "cl1" });
      expect(c[0].url).toContain("/calls.info");
    });

    it("add → POST /calls.add", async () => {
      const { client, calls: c } = createClientWithBody({ data: { type: "call", id: "cl1" } });
      await client.calls.add({
        participant: { customer: { type: "contact", id: "c1" } },
        due_at: "2026-01-01T10:00:00+00:00",
        assignee: { type: "user", id: "u1" },
      });
      expect(c[0].url).toContain("/calls.add");
    });

    it("update → POST /calls.update", async () => {
      const { client, calls: c } = createVoidClient();
      await client.calls.update({ id: "cl1" });
      expect(c[0].url).toContain("/calls.update");
    });

    it("complete → POST /calls.complete", async () => {
      const { client, calls: c } = createVoidClient();
      await client.calls.complete({ id: "cl1" });
      expect(c[0].url).toContain("/calls.complete");
    });
  });

  // ---------------------------------------------------------------------------
  // Time tracking
  // ---------------------------------------------------------------------------

  describe("timeTracking", () => {
    it("list → POST /timeTracking.list", async () => {
      const { client, calls } = createClient();
      await client.timeTracking.list();
      expect(calls[0].url).toContain("/timeTracking.list");
    });

    it("info → POST /timeTracking.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "tt1" } });
      await client.timeTracking.info({ id: "tt1" });
      expect(calls[0].url).toContain("/timeTracking.info");
    });

    it("add → POST /timeTracking.add", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "timeTracking", id: "tt1" } });
      await client.timeTracking.add({
        started_at: "2026-01-01T10:00:00+00:00",
        duration: 3600,
        user_id: "u1",
      });
      expect(calls[0].url).toContain("/timeTracking.add");
    });

    it("update → POST /timeTracking.update", async () => {
      const { client, calls } = createVoidClient();
      await client.timeTracking.update({
        id: "tt1",
        duration: 3600,
        started_at: "2026-01-01T10:00:00+00:00",
      });
      expect(calls[0].url).toContain("/timeTracking.update");
    });

    it("resume → POST /timeTracking.resume", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.timeTracking.resume({ id: "tt1" });
      expect(calls[0].url).toContain("/timeTracking.resume");
    });

    it("delete → POST /timeTracking.delete", async () => {
      const { client, calls } = createVoidClient();
      await client.timeTracking.delete({ id: "tt1" });
      expect(calls[0].url).toContain("/timeTracking.delete");
    });
  });

  // ---------------------------------------------------------------------------
  // Credit notes
  // ---------------------------------------------------------------------------

  describe("creditNotes", () => {
    it("list → POST /creditNotes.list", async () => {
      const { client, calls } = createClient();
      await client.creditNotes.list();
      expect(calls[0].url).toContain("/creditNotes.list");
    });

    it("info → POST /creditNotes.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "cn1" } });
      await client.creditNotes.info({ id: "cn1" });
      expect(calls[0].url).toContain("/creditNotes.info");
    });

    it("download → POST /creditNotes.download", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.creditNotes.download({ id: "cn1", format: "pdf" });
      expect(calls[0].url).toContain("/creditNotes.download");
    });

    it("sendViaPeppol → POST /creditNotes.sendViaPeppol", async () => {
      const { client, calls } = createVoidClient();
      await client.creditNotes.sendViaPeppol({ id: "cn1" });
      expect(calls[0].url).toContain("/creditNotes.sendViaPeppol");
    });
  });

  // ---------------------------------------------------------------------------
  // Tickets
  // ---------------------------------------------------------------------------

  describe("tickets", () => {
    it("list → POST /tickets.list", async () => {
      const { client, calls } = createClient();
      await client.tickets.list();
      expect(calls[0].url).toContain("/tickets.list");
    });

    it("info → POST /tickets.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "tk1" } });
      await client.tickets.info({ id: "tk1" });
      expect(calls[0].url).toContain("/tickets.info");
    });

    it("create → POST /tickets.create", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "ticket", id: "tk1" } });
      await client.tickets.create({
        subject: "Help",
        customer: { type: "contact", id: "c1" },
        ticket_status_id: "ts1",
      });
      expect(calls[0].url).toContain("/tickets.create");
    });

    it("update → POST /tickets.update", async () => {
      const { client, calls } = createVoidClient();
      await client.tickets.update({ id: "tk1" });
      expect(calls[0].url).toContain("/tickets.update");
    });

    it("listMessages → POST /tickets.listMessages", async () => {
      const { client, calls } = createClientWithBody({ data: [] });
      await client.tickets.listMessages({ id: "tk1" });
      expect(calls[0].url).toContain("/tickets.listMessages");
    });

    it("getMessage → POST /tickets.getMessage", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.tickets.getMessage({ message_id: "msg1" });
      expect(calls[0].url).toContain("/tickets.getMessage");
    });

    it("addReply → POST /tickets.addReply", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.tickets.addReply({ id: "tk1", body: "Reply body" });
      expect(calls[0].url).toContain("/tickets.addReply");
    });

    it("addInternalMessage → POST /tickets.addInternalMessage", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.tickets.addInternalMessage({ id: "tk1", body: "Internal body" });
      expect(calls[0].url).toContain("/tickets.addInternalMessage");
    });

    it("importMessage → POST /tickets.importMessage", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.tickets.importMessage({
        id: "tk1",
        body: "Imported body",
        sent_by: { type: "contact", id: "c1" },
        sent_at: "2026-01-01T10:00:00+00:00",
      });
      expect(calls[0].url).toContain("/tickets.importMessage");
    });
  });

  // ---------------------------------------------------------------------------
  // Files
  // ---------------------------------------------------------------------------

  describe("files", () => {
    it("list → POST /files.list", async () => {
      const { client, calls } = createClient();
      await client.files.list({ filter: { subject: { type: "contact", id: "c1" } } });
      expect(calls[0].url).toContain("/files.list");
    });

    it("info → POST /files.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "f1" } });
      await client.files.info({ id: "f1" });
      expect(calls[0].url).toContain("/files.info");
    });

    it("upload → POST /files.upload", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "file", id: "f1" } });
      await client.files.upload({
        name: "test.pdf",
        subject: { type: "contact", id: "c1" },
      });
      expect(calls[0].url).toContain("/files.upload");
    });

    it("download → POST /files.download", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.files.download({ id: "f1" });
      expect(calls[0].url).toContain("/files.download");
    });

    it("delete → POST /files.delete", async () => {
      const { client, calls } = createVoidClient();
      await client.files.delete({ id: "f1" });
      expect(calls[0].url).toContain("/files.delete");
    });
  });

  // ---------------------------------------------------------------------------
  // Subscriptions
  // ---------------------------------------------------------------------------

  describe("subscriptions", () => {
    it("list → POST /subscriptions.list", async () => {
      const { client, calls } = createClient();
      await client.subscriptions.list();
      expect(calls[0].url).toContain("/subscriptions.list");
    });

    it("info → POST /subscriptions.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "s1" } });
      await client.subscriptions.info({ id: "s1" });
      expect(calls[0].url).toContain("/subscriptions.info");
    });

    it("create → POST /subscriptions.create", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "subscription", id: "s1" } });
      await client.subscriptions.create({
        title: "Monthly",
        invoicee: { customer: { type: "contact", id: "c1" } },
        department_id: "dep1",
        starts_on: "2026-01-01",
        billing_cycle: { periodicity: { unit: "month", period: 1 }, days_in_advance: 0 },
        payment_term: { type: "cash" },
        invoice_generation: { action: "draft" },
        grouped_lines: [{ line_items: [{ quantity: 1, description: "Line", tax_rate_id: "tr1" }] }],
      });
      expect(calls[0].url).toContain("/subscriptions.create");
    });

    it("update → POST /subscriptions.update", async () => {
      const { client, calls } = createVoidClient();
      await client.subscriptions.update({ id: "s1" });
      expect(calls[0].url).toContain("/subscriptions.update");
    });

    it("deactivate → POST /subscriptions.deactivate", async () => {
      const { client, calls } = createVoidClient();
      await client.subscriptions.deactivate({ id: "s1" });
      expect(calls[0].url).toContain("/subscriptions.deactivate");
    });
  });

  // ---------------------------------------------------------------------------
  // Webhooks
  // ---------------------------------------------------------------------------

  describe("webhooks", () => {
    it("register → POST /webhooks.register", async () => {
      const { client, calls } = createVoidClient();
      await client.webhooks.register({ url: "https://example.com/hook", types: ["contact.added"] });
      expect(calls[0].url).toContain("/webhooks.register");
    });

    it("list → POST /webhooks.list", async () => {
      const { client, calls } = createClient();
      await client.webhooks.list();
      expect(calls[0].url).toContain("/webhooks.list");
    });

    it("unregister → POST /webhooks.unregister", async () => {
      const { client, calls } = createVoidClient();
      await client.webhooks.unregister({ url: "https://example.com/hook", types: ["contact.added"] });
      expect(calls[0].url).toContain("/webhooks.unregister");
    });
  });

  // ---------------------------------------------------------------------------
  // Deal pipelines
  // ---------------------------------------------------------------------------

  describe("dealPipelines", () => {
    it("list → POST /dealPipelines.list", async () => {
      const { client, calls } = createClient();
      await client.dealPipelines.list();
      expect(calls[0].url).toContain("/dealPipelines.list");
    });

    it("create → POST /dealPipelines.create", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "dealPipeline", id: "dp1" } });
      await client.dealPipelines.create({ name: "Sales" });
      expect(calls[0].url).toContain("/dealPipelines.create");
    });

    it("update → POST /dealPipelines.update", async () => {
      const { client, calls } = createVoidClient();
      await client.dealPipelines.update({ id: "dp1", name: "Updated" });
      expect(calls[0].url).toContain("/dealPipelines.update");
    });

    it("markAsDefault → POST /dealPipelines.markAsDefault", async () => {
      const { client, calls } = createVoidClient();
      await client.dealPipelines.markAsDefault({ id: "dp1" });
      expect(calls[0].url).toContain("/dealPipelines.markAsDefault");
    });

    it("duplicate → POST /dealPipelines.duplicate", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "dealPipeline", id: "dp2" } });
      await client.dealPipelines.duplicate({ id: "dp1" });
      expect(calls[0].url).toContain("/dealPipelines.duplicate");
    });

    it("delete → POST /dealPipelines.delete", async () => {
      const { client, calls } = createVoidClient();
      await client.dealPipelines.delete({ id: "dp1" });
      expect(calls[0].url).toContain("/dealPipelines.delete");
    });
  });

  // ---------------------------------------------------------------------------
  // Deal phases
  // ---------------------------------------------------------------------------

  describe("dealPhases", () => {
    it("list → POST /dealPhases.list", async () => {
      const { client, calls } = createClient();
      await client.dealPhases.list({ filter: { deal_pipeline_id: "dp1" } });
      expect(calls[0].url).toContain("/dealPhases.list");
    });

    it("create → POST /dealPhases.create", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "dealPhase", id: "ph1" } });
      await client.dealPhases.create({
        name: "Lead",
        deal_pipeline_id: "dp1",
        requires_attention_after: { amount: 7, unit: "days" },
      });
      expect(calls[0].url).toContain("/dealPhases.create");
    });

    it("update → POST /dealPhases.update", async () => {
      const { client, calls } = createVoidClient();
      await client.dealPhases.update({
        id: "ph1",
        requires_attention_after: { amount: 14, unit: "days" },
      });
      expect(calls[0].url).toContain("/dealPhases.update");
    });

    it("move → POST /dealPhases.move", async () => {
      const { client, calls } = createVoidClient();
      await client.dealPhases.move({ id: "ph1", after_phase_id: "ph2" });
      expect(calls[0].url).toContain("/dealPhases.move");
    });

    it("delete → POST /dealPhases.delete", async () => {
      const { client, calls } = createVoidClient();
      await client.dealPhases.delete({ id: "ph1" });
      expect(calls[0].url).toContain("/dealPhases.delete");
    });
  });

  // ---------------------------------------------------------------------------
  // Custom field definitions
  // ---------------------------------------------------------------------------

  describe("customFieldDefinitions", () => {
    it("list → POST /customFieldDefinitions.list", async () => {
      const { client, calls } = createClient();
      await client.customFieldDefinitions.list();
      expect(calls[0].url).toContain("/customFieldDefinitions.list");
    });

    it("info → POST /customFieldDefinitions.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "cf1" } });
      await client.customFieldDefinitions.info({ id: "cf1" });
      expect(calls[0].url).toContain("/customFieldDefinitions.info");
    });

    it("create → POST /customFieldDefinitions.create", async () => {
      const { client, calls } = createClientWithBody({ data: { type: "customFieldDefinition", id: "cf1" } });
      await client.customFieldDefinitions.create({
        context: "contact",
        label: "Test Field",
        type: "single_line",
      });
      expect(calls[0].url).toContain("/customFieldDefinitions.create");
    });
  });

  // ---------------------------------------------------------------------------
  // Closing days
  // ---------------------------------------------------------------------------

  describe("closingDays", () => {
    it("list → POST /closingDays.list", async () => {
      const { client, calls } = createClient();
      await client.closingDays.list();
      expect(calls[0].url).toContain("/closingDays.list");
    });

    it("add → POST /closingDays.add", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "cd1" } });
      await client.closingDays.add({ day: "2026-12-25" });
      expect(calls[0].url).toContain("/closingDays.add");
    });

    it("delete → POST /closingDays.delete", async () => {
      const { client, calls } = createVoidClient();
      await client.closingDays.delete({ id: "cd1" });
      expect(calls[0].url).toContain("/closingDays.delete");
    });
  });

  // ---------------------------------------------------------------------------
  // Day off types
  // ---------------------------------------------------------------------------

  describe("dayOffTypes", () => {
    it("list → POST /dayOffTypes.list", async () => {
      const { client, calls } = createClient();
      await client.dayOffTypes.list();
      expect(calls[0].url).toContain("/dayOffTypes.list");
    });

    it("create → POST /dayOffTypes.create", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "dot1" } });
      await client.dayOffTypes.create({ name: "Sick" });
      expect(calls[0].url).toContain("/dayOffTypes.create");
    });

    it("update → POST /dayOffTypes.update", async () => {
      const { client, calls } = createVoidClient();
      await client.dayOffTypes.update({ id: "dot1", name: "Updated" });
      expect(calls[0].url).toContain("/dayOffTypes.update");
    });

    it("delete → POST /dayOffTypes.delete", async () => {
      const { client, calls } = createVoidClient();
      await client.dayOffTypes.delete({ id: "dot1" });
      expect(calls[0].url).toContain("/dayOffTypes.delete");
    });
  });

  // ---------------------------------------------------------------------------
  // Days off
  // ---------------------------------------------------------------------------

  describe("daysOff", () => {
    it("import → POST /daysOff.import", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.daysOff.import({
        user_id: "u1",
        leave_type_id: "lt1",
        days: [{ starts_at: "2026-01-01T00:00:00+00:00", ends_at: "2026-01-02T00:00:00+00:00" }],
      });
      expect(calls[0].url).toContain("/daysOff.import");
    });

    it("bulkDelete → POST /daysOff.bulkDelete", async () => {
      const { client, calls } = createVoidClient();
      await client.daysOff.bulkDelete({ user_id: "u1", ids: ["do1"] });
      expect(calls[0].url).toContain("/daysOff.bulkDelete");
    });
  });

  // ---------------------------------------------------------------------------
  // Timers
  // ---------------------------------------------------------------------------

  describe("timers", () => {
    it("current → POST /timers.current", async () => {
      const { client, calls } = createClientWithBody({ data: null });
      await client.timers.current();
      expect(calls[0].url).toContain("/timers.current");
    });

    it("start → POST /timers.start", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.timers.start({ description: "Working" });
      expect(calls[0].url).toContain("/timers.start");
    });

    it("stop → POST /timers.stop", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.timers.stop();
      expect(calls[0].url).toContain("/timers.stop");
    });

    it("update → POST /timers.update", async () => {
      const { client, calls } = createVoidClient();
      await client.timers.update({ description: "Updated" });
      expect(calls[0].url).toContain("/timers.update");
    });
  });

  // ---------------------------------------------------------------------------
  // Legacy projects
  // ---------------------------------------------------------------------------

  describe("legacyProjects", () => {
    const dataMethods: Array<[string, (c: TeamleaderClient) => Promise<unknown>]> = [
      ["projects.list", (c) => c.legacyProjects.list()],
      ["projects.info", (c) => c.legacyProjects.info({ id: "lp1" })],
      ["projects.create", (c) => c.legacyProjects.create({
        title: "LP",
        starts_on: "2026-01-01",
        milestones: [{ due_on: "2026-02-01", name: "M1", responsible_user_id: "u1" }],
        participants: [{ participant: { type: "user", id: "u1" }, role: "decision_maker" }],
      })],
    ];

    for (const [endpoint, fn] of dataMethods) {
      it(`${endpoint.split(".")[1]} → POST /${endpoint}`, async () => {
        const { client, calls } = createClientWithBody({ data: { id: "lp1" } });
        await fn(client);
        expect(calls[0].url).toContain(`/${endpoint}`);
      });
    }

    const voidMethods: Array<[string, (c: TeamleaderClient) => Promise<unknown>]> = [
      ["projects.update", (c) => c.legacyProjects.update({ id: "lp1" })],
      ["projects.close", (c) => c.legacyProjects.close({ id: "lp1" })],
      ["projects.reopen", (c) => c.legacyProjects.reopen({ id: "lp1" })],
      ["projects.delete", (c) => c.legacyProjects.delete({ id: "lp1" })],
      ["projects.addParticipant", (c) => c.legacyProjects.addParticipant({ id: "lp1", participant: { type: "user", id: "u1" } })],
      ["projects.updateParticipant", (c) => c.legacyProjects.updateParticipant({ id: "lp1", participant: { type: "user", id: "u1" }, role: "decision_maker" })],
    ];

    for (const [endpoint, fn] of voidMethods) {
      it(`${endpoint.split(".")[1]} → POST /${endpoint}`, async () => {
        const { client, calls } = createVoidClient();
        await fn(client);
        expect(calls[0].url).toContain(`/${endpoint}`);
      });
    }
  });

  // ---------------------------------------------------------------------------
  // Legacy milestones
  // ---------------------------------------------------------------------------

  describe("legacyMilestones", () => {
    const dataMethods: Array<[string, (c: TeamleaderClient) => Promise<unknown>]> = [
      ["milestones.list", (c) => c.legacyMilestones.list()],
      ["milestones.info", (c) => c.legacyMilestones.info({ id: "ms1" })],
      ["milestones.create", (c) => c.legacyMilestones.create({
        project_id: "lp1",
        name: "M1",
        due_on: "2026-02-01",
        responsible_user_id: "u1",
        billing_method: "time_and_materials",
      })],
    ];

    for (const [endpoint, fn] of dataMethods) {
      it(`${endpoint.split(".")[1]} → POST /${endpoint}`, async () => {
        const { client, calls } = createClientWithBody({ data: { id: "ms1" } });
        await fn(client);
        expect(calls[0].url).toContain(`/${endpoint}`);
      });
    }

    const voidMethods: Array<[string, (c: TeamleaderClient) => Promise<unknown>]> = [
      ["milestones.update", (c) => c.legacyMilestones.update({ id: "ms1" })],
      ["milestones.delete", (c) => c.legacyMilestones.delete({ id: "ms1" })],
      ["milestones.close", (c) => c.legacyMilestones.close({ id: "ms1" })],
      ["milestones.open", (c) => c.legacyMilestones.open({ id: "ms1" })],
    ];

    for (const [endpoint, fn] of voidMethods) {
      it(`${endpoint.split(".")[1]} → POST /${endpoint}`, async () => {
        const { client, calls } = createVoidClient();
        await fn(client);
        expect(calls[0].url).toContain(`/${endpoint}`);
      });
    }
  });

  // ---------------------------------------------------------------------------
  // Project groups
  // ---------------------------------------------------------------------------

  describe("projectGroups", () => {
    const dataMethods: Array<[string, (c: TeamleaderClient) => Promise<unknown>]> = [
      ["projectGroups.list", (c) => c.projectGroups.list()],
      ["projectGroups.info", (c) => c.projectGroups.info({ id: "pg1" })],
      ["projectGroups.create", (c) => c.projectGroups.create({ project_id: "p1", title: "G1" })],
      ["projectGroups.duplicate", (c) => c.projectGroups.duplicate({ origin_id: "pg1" })],
    ];

    for (const [endpoint, fn] of dataMethods) {
      it(`${endpoint.split(".")[1]} → POST /projects-v2/${endpoint}`, async () => {
        const { client, calls } = createClientWithBody({ data: { id: "pg1" } });
        await fn(client);
        expect(calls[0].url).toContain(`/projects-v2/${endpoint}`);
      });
    }

    const voidMethods: Array<[string, (c: TeamleaderClient) => Promise<unknown>]> = [
      ["projectGroups.update", (c) => c.projectGroups.update({ id: "pg1" })],
      ["projectGroups.delete", (c) => c.projectGroups.delete({ id: "pg1", delete_strategy: "ungroup_tasks_and_materials" })],
      ["projectGroups.assign", (c) => c.projectGroups.assign({ id: "pg1", assignee: { type: "user", id: "u1" } })],
      ["projectGroups.unassign", (c) => c.projectGroups.unassign({ id: "pg1", assignee: { type: "user", id: "u1" } })],
    ];

    for (const [endpoint, fn] of voidMethods) {
      it(`${endpoint.split(".")[1]} → POST /projects-v2/${endpoint}`, async () => {
        const { client, calls } = createVoidClient();
        await fn(client);
        expect(calls[0].url).toContain(`/projects-v2/${endpoint}`);
      });
    }
  });

  // ---------------------------------------------------------------------------
  // Project tasks
  // ---------------------------------------------------------------------------

  describe("projectTasks", () => {
    it("list → POST /projects-v2/tasks.list", async () => {
      const { client, calls } = createClient();
      // projectTasks.list filter only supports ids
      await client.projectTasks.list({ filter: { ids: ["pt1"] } });
      expect(calls[0].url).toContain("/projects-v2/tasks.list");
    });

    it("info → POST /projects-v2/tasks.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "pt1" } });
      await client.projectTasks.info({ id: "pt1" });
      expect(calls[0].url).toContain("/projects-v2/tasks.info");
    });

    it("create → POST /projects-v2/tasks.create", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "pt1" } });
      await client.projectTasks.create({ project_id: "p1", title: "T1" });
      expect(calls[0].url).toContain("/projects-v2/tasks.create");
    });

    it("duplicate → POST /projects-v2/tasks.duplicate", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "pt2" } });
      await client.projectTasks.duplicate({ origin_id: "pt1" });
      expect(calls[0].url).toContain("/projects-v2/tasks.duplicate");
    });

    const voidMethods: Array<[string, (c: TeamleaderClient) => Promise<unknown>]> = [
      ["tasks.update", (c) => c.projectTasks.update({ id: "pt1" })],
      ["tasks.delete", (c) => c.projectTasks.delete({ id: "pt1", delete_strategy: "unlink_time_tracking" })],
      ["tasks.assign", (c) => c.projectTasks.assign({ id: "pt1", assignee: { type: "user", id: "u1" } })],
      ["tasks.unassign", (c) => c.projectTasks.unassign({ id: "pt1", assignee: { type: "user", id: "u1" } })],
    ];

    for (const [endpoint, fn] of voidMethods) {
      it(`${endpoint.split(".")[1]} → POST /projects-v2/${endpoint}`, async () => {
        const { client, calls } = createVoidClient();
        await fn(client);
        expect(calls[0].url).toContain(`/projects-v2/${endpoint}`);
      });
    }
  });

  // ---------------------------------------------------------------------------
  // Project materials
  // ---------------------------------------------------------------------------

  describe("projectMaterials", () => {
    it("list → POST /projects-v2/materials.list", async () => {
      const { client, calls } = createClient();
      // projectMaterials.list filter only supports ids
      await client.projectMaterials.list({ filter: { ids: ["pm1"] } });
      expect(calls[0].url).toContain("/projects-v2/materials.list");
    });

    it("info → POST /projects-v2/materials.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "pm1" } });
      await client.projectMaterials.info({ id: "pm1" });
      expect(calls[0].url).toContain("/projects-v2/materials.info");
    });

    it("create → POST /projects-v2/materials.create", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "pm1" } });
      await client.projectMaterials.create({ project_id: "p1", title: "M1" });
      expect(calls[0].url).toContain("/projects-v2/materials.create");
    });

    it("duplicate → POST /projects-v2/materials.duplicate", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "pm2" } });
      await client.projectMaterials.duplicate({ origin_id: "pm1" });
      expect(calls[0].url).toContain("/projects-v2/materials.duplicate");
    });

    const voidMethods: Array<[string, (c: TeamleaderClient) => Promise<unknown>]> = [
      ["materials.update", (c) => c.projectMaterials.update({ id: "pm1" })],
      ["materials.delete", (c) => c.projectMaterials.delete({ id: "pm1" })],
      ["materials.assign", (c) => c.projectMaterials.assign({ id: "pm1", assignee: { type: "user", id: "u1" } })],
      ["materials.unassign", (c) => c.projectMaterials.unassign({ id: "pm1", assignee: { type: "user", id: "u1" } })],
    ];

    for (const [endpoint, fn] of voidMethods) {
      it(`${endpoint.split(".")[1]} → POST /projects-v2/${endpoint}`, async () => {
        const { client, calls } = createVoidClient();
        await fn(client);
        expect(calls[0].url).toContain(`/projects-v2/${endpoint}`);
      });
    }
  });

  // ---------------------------------------------------------------------------
  // Project lines
  // ---------------------------------------------------------------------------

  describe("projectLines", () => {
    it("list → POST /projects-v2/projectLines.list", async () => {
      const { client, calls } = createClient();
      await client.projectLines.list({ project_id: "p1" });
      expect(calls[0].url).toContain("/projects-v2/projectLines.list");
    });

    it("addToGroup → POST /projects-v2/projectLines.addToGroup", async () => {
      const { client, calls } = createVoidClient();
      await client.projectLines.addToGroup({ line_id: "pl1", group_id: "g1" });
      expect(calls[0].url).toContain("/projects-v2/projectLines.addToGroup");
    });

    it("removeFromGroup → POST /projects-v2/projectLines.removeFromGroup", async () => {
      const { client, calls } = createVoidClient();
      await client.projectLines.removeFromGroup({ line_id: "pl1" });
      expect(calls[0].url).toContain("/projects-v2/projectLines.removeFromGroup");
    });
  });

  // ---------------------------------------------------------------------------
  // External parties
  // ---------------------------------------------------------------------------

  describe("externalParties", () => {
    it("addToProject → POST /projects-v2/externalParties.addToProject", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "ep1" } });
      await client.externalParties.addToProject({
        project_id: "p1",
        customer: { type: "contact", id: "c1" },
      });
      expect(calls[0].url).toContain("/projects-v2/externalParties.addToProject");
    });

    it("update → POST /projects-v2/externalParties.update", async () => {
      const { client, calls } = createVoidClient();
      await client.externalParties.update({
        id: "ep1",
        customer: { type: "contact", id: "c1" },
      });
      expect(calls[0].url).toContain("/projects-v2/externalParties.update");
    });

    it("delete → POST /projects-v2/externalParties.delete", async () => {
      const { client, calls } = createVoidClient();
      await client.externalParties.delete({ id: "ep1" });
      expect(calls[0].url).toContain("/projects-v2/externalParties.delete");
    });
  });

  // ---------------------------------------------------------------------------
  // Incoming invoices (full CRUD + payments)
  // ---------------------------------------------------------------------------

  describe("incomingInvoices", () => {
    it("add → POST /incomingInvoices.add", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "ii1" } });
      await client.incomingInvoices.add({
        title: "Inv",
        currency: { code: "EUR" },
        supplier_id: "comp1",
        due_date: "2026-02-01",
        total: {
          tax_exclusive: { amount: 100 },
          tax_inclusive: { amount: 121 },
        },
      });
      expect(calls[0].url).toContain("/incomingInvoices.add");
    });

    it("info → POST /incomingInvoices.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "ii1" } });
      await client.incomingInvoices.info({ id: "ii1" });
      expect(calls[0].url).toContain("/incomingInvoices.info");
    });

    it("listPayments → POST /incomingInvoices.listPayments", async () => {
      const { client, calls } = createClientWithBody({ data: [] });
      await client.incomingInvoices.listPayments({ id: "ii1" });
      expect(calls[0].url).toContain("/incomingInvoices.listPayments");
    });

    it("registerPayment → POST /incomingInvoices.registerPayment", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "pay1" } });
      await client.incomingInvoices.registerPayment({
        id: "ii1",
        payment: { amount: 100, currency: "EUR" },
        paid_at: "2026-01-01T10:00:00+00:00",
      });
      expect(calls[0].url).toContain("/incomingInvoices.registerPayment");
    });

    const voidMethods: Array<[string, (c: TeamleaderClient) => Promise<unknown>]> = [
      ["incomingInvoices.update", (c) => c.incomingInvoices.update({ id: "ii1" })],
      ["incomingInvoices.delete", (c) => c.incomingInvoices.delete({ id: "ii1" })],
      ["incomingInvoices.approve", (c) => c.incomingInvoices.approve({ id: "ii1" })],
      ["incomingInvoices.refuse", (c) => c.incomingInvoices.refuse({ id: "ii1" })],
      ["incomingInvoices.markAsPendingReview", (c) => c.incomingInvoices.markAsPendingReview({ id: "ii1" })],
      ["incomingInvoices.sendToBookkeeping", (c) => c.incomingInvoices.sendToBookkeeping({ id: "ii1" })],
      ["incomingInvoices.removePayment", (c) => c.incomingInvoices.removePayment({ id: "ii1", payment_id: "pay1" })],
      ["incomingInvoices.updatePayment", (c) => c.incomingInvoices.updatePayment({ id: "ii1", payment_id: "pay1" })],
    ];

    for (const [endpoint, fn] of voidMethods) {
      it(`${endpoint.split(".")[1]} → POST /${endpoint}`, async () => {
        const { client, calls } = createVoidClient();
        await fn(client);
        expect(calls[0].url).toContain(`/${endpoint}`);
      });
    }
  });

  // ---------------------------------------------------------------------------
  // Incoming credit notes (full CRUD + payments)
  // ---------------------------------------------------------------------------

  describe("incomingCreditNotes", () => {
    it("add → POST /incomingCreditNotes.add", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "icn1" } });
      await client.incomingCreditNotes.add({
        title: "CN",
        currency: { code: "EUR" },
        supplier_id: "comp1",
        total: {
          tax_exclusive: { amount: 100 },
          tax_inclusive: { amount: 121 },
        },
      });
      expect(calls[0].url).toContain("/incomingCreditNotes.add");
    });

    it("info → POST /incomingCreditNotes.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "icn1" } });
      await client.incomingCreditNotes.info({ id: "icn1" });
      expect(calls[0].url).toContain("/incomingCreditNotes.info");
    });

    it("listPayments → POST /incomingCreditNotes.listPayments", async () => {
      const { client, calls } = createClientWithBody({ data: [] });
      await client.incomingCreditNotes.listPayments({ id: "icn1" });
      expect(calls[0].url).toContain("/incomingCreditNotes.listPayments");
    });

    it("registerPayment → POST /incomingCreditNotes.registerPayment", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "pay1" } });
      await client.incomingCreditNotes.registerPayment({
        id: "icn1",
        payment: { amount: 100, currency: "EUR" },
        paid_at: "2026-01-01T10:00:00+00:00",
      });
      expect(calls[0].url).toContain("/incomingCreditNotes.registerPayment");
    });

    const voidMethods: Array<[string, (c: TeamleaderClient) => Promise<unknown>]> = [
      ["incomingCreditNotes.update", (c) => c.incomingCreditNotes.update({ id: "icn1" })],
      ["incomingCreditNotes.delete", (c) => c.incomingCreditNotes.delete({ id: "icn1" })],
      ["incomingCreditNotes.approve", (c) => c.incomingCreditNotes.approve({ id: "icn1" })],
      ["incomingCreditNotes.refuse", (c) => c.incomingCreditNotes.refuse({ id: "icn1" })],
      ["incomingCreditNotes.markAsPendingReview", (c) => c.incomingCreditNotes.markAsPendingReview({ id: "icn1" })],
      ["incomingCreditNotes.sendToBookkeeping", (c) => c.incomingCreditNotes.sendToBookkeeping({ id: "icn1" })],
      ["incomingCreditNotes.removePayment", (c) => c.incomingCreditNotes.removePayment({ id: "icn1", payment_id: "pay1" })],
      ["incomingCreditNotes.updatePayment", (c) => c.incomingCreditNotes.updatePayment({ id: "icn1", payment_id: "pay1" })],
    ];

    for (const [endpoint, fn] of voidMethods) {
      it(`${endpoint.split(".")[1]} → POST /${endpoint}`, async () => {
        const { client, calls } = createVoidClient();
        await fn(client);
        expect(calls[0].url).toContain(`/${endpoint}`);
      });
    }
  });

  // ---------------------------------------------------------------------------
  // Receipts (full CRUD + payments)
  // ---------------------------------------------------------------------------

  describe("receipts", () => {
    it("add → POST /receipts.add", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "r1" } });
      await client.receipts.add({
        title: "Receipt",
        currency: { code: "EUR" },
      });
      expect(calls[0].url).toContain("/receipts.add");
    });

    it("info → POST /receipts.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "r1" } });
      await client.receipts.info({ id: "r1" });
      expect(calls[0].url).toContain("/receipts.info");
    });

    it("listPayments → POST /receipts.listPayments", async () => {
      const { client, calls } = createClientWithBody({ data: [] });
      await client.receipts.listPayments({ id: "r1" });
      expect(calls[0].url).toContain("/receipts.listPayments");
    });

    it("registerPayment → POST /receipts.registerPayment", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "pay1" } });
      await client.receipts.registerPayment({
        id: "r1",
        payment: { amount: 100, currency: "EUR" },
        paid_at: "2026-01-01T10:00:00+00:00",
      });
      expect(calls[0].url).toContain("/receipts.registerPayment");
    });

    const voidMethods: Array<[string, (c: TeamleaderClient) => Promise<unknown>]> = [
      ["receipts.update", (c) => c.receipts.update({ id: "r1" })],
      ["receipts.delete", (c) => c.receipts.delete({ id: "r1" })],
      ["receipts.approve", (c) => c.receipts.approve({ id: "r1" })],
      ["receipts.refuse", (c) => c.receipts.refuse({ id: "r1" })],
      ["receipts.markAsPendingReview", (c) => c.receipts.markAsPendingReview({ id: "r1" })],
      ["receipts.sendToBookkeeping", (c) => c.receipts.sendToBookkeeping({ id: "r1" })],
      ["receipts.removePayment", (c) => c.receipts.removePayment({ id: "r1", payment_id: "pay1" })],
      ["receipts.updatePayment", (c) => c.receipts.updatePayment({ id: "r1", payment_id: "pay1" })],
    ];

    for (const [endpoint, fn] of voidMethods) {
      it(`${endpoint.split(".")[1]} → POST /${endpoint}`, async () => {
        const { client, calls } = createVoidClient();
        await fn(client);
        expect(calls[0].url).toContain(`/${endpoint}`);
      });
    }
  });

  // ---------------------------------------------------------------------------
  // Reservations
  // ---------------------------------------------------------------------------

  describe("reservations", () => {
    it("list → POST /reservations.list", async () => {
      const { client, calls } = createClient();
      await client.reservations.list();
      expect(calls[0].url).toContain("/reservations.list");
    });

    it("create → POST /reservations.create", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "res1" } });
      await client.reservations.create({
        plannable_item_id: "pi1",
        date: "2026-01-01",
        duration: { unit: "minutes", value: 60 },
        assignee: { type: "user", id: "u1" },
      });
      expect(calls[0].url).toContain("/reservations.create");
    });

    it("update → POST /reservations.update", async () => {
      const { client, calls } = createVoidClient();
      await client.reservations.update({ id: "res1" });
      expect(calls[0].url).toContain("/reservations.update");
    });

    it("delete → POST /reservations.delete", async () => {
      const { client, calls } = createVoidClient();
      await client.reservations.delete({ id: "res1" });
      expect(calls[0].url).toContain("/reservations.delete");
    });
  });

  // ---------------------------------------------------------------------------
  // Accounts, migrate, user availability, plannable items, etc.
  // ---------------------------------------------------------------------------

  describe("accounts", () => {
    it("projectsV2Status → POST /accounts.projects-v2-status", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.accounts.projectsV2Status();
      expect(calls[0].url).toContain("/accounts.projects-v2-status");
    });
  });

  describe("migrate", () => {
    it("id → POST /migrate.id", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.migrate.id({ type: "contact", id: 123 });
      expect(calls[0].url).toContain("/migrate.id");
    });

    it("taxRate → POST /migrate.taxRate", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.migrate.taxRate({ department_id: "dep1" });
      expect(calls[0].url).toContain("/migrate.taxRate");
    });

    it("activityType → POST /migrate.activityType", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.migrate.activityType({ type: "task" });
      expect(calls[0].url).toContain("/migrate.activityType");
    });
  });

  describe("userAvailability", () => {
    it("total → POST /userAvailability.total", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.userAvailability.total({
        period: { start_date: "2026-01-01", end_date: "2026-01-07" },
        filter: { assignees: [{ type: "user", id: "u1" }] },
      });
      expect(calls[0].url).toContain("/userAvailability.total");
    });

    it("daily → POST /userAvailability.daily", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.userAvailability.daily({
        period: { start_date: "2026-01-01", end_date: "2026-01-07" },
        filter: { assignees: [{ type: "user", id: "u1" }] },
      });
      expect(calls[0].url).toContain("/userAvailability.daily");
    });
  });

  describe("plannableItems", () => {
    it("list → POST /plannableItems.list", async () => {
      const { client, calls } = createClient();
      await client.plannableItems.list();
      expect(calls[0].url).toContain("/plannableItems.list");
    });

    it("info → POST /plannableItems.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "pi1" } });
      await client.plannableItems.info({ id: "pi1" });
      expect(calls[0].url).toContain("/plannableItems.info");
    });
  });

  describe("emailTracking", () => {
    it("list → POST /emailTracking.list", async () => {
      const { client, calls } = createClient();
      await client.emailTracking.list({ filter: { subject: { type: "contact", id: "c1" } } });
      expect(calls[0].url).toContain("/emailTracking.list");
    });

    it("create → POST /emailTracking.create", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.emailTracking.create({
        subject: { type: "contact", id: "c1" },
        content: "<p>Body</p>",
      });
      expect(calls[0].url).toContain("/emailTracking.create");
    });
  });

  describe("cloudPlatforms", () => {
    it("url → POST /cloudPlatforms.url", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.cloudPlatforms.url({ type: "invoice", id: "i1" });
      expect(calls[0].url).toContain("/cloudPlatforms.url");
    });
  });

  describe("currencies", () => {
    it("exchangeRates → POST /currencies.exchangeRates", async () => {
      const { client, calls } = createClientWithBody({ data: {} });
      await client.currencies.exchangeRates({ base: "USD" });
      expect(calls[0].url).toContain("/currencies.exchangeRates");
    });
  });

  describe("orders", () => {
    it("list → POST /orders.list", async () => {
      const { client, calls } = createClient();
      await client.orders.list();
      expect(calls[0].url).toContain("/orders.list");
    });

    it("info → POST /orders.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "o1" } });
      await client.orders.info({ id: "o1" });
      expect(calls[0].url).toContain("/orders.info");
    });
  });

  // ---------------------------------------------------------------------------
  // Simple list-only resources (parametric)
  // ---------------------------------------------------------------------------

  describe("list-only resources", () => {
    const cases: Array<[string, (client: TeamleaderClient) => Promise<unknown>]> = [
      ["departments.list", (c) => c.departments.list()],
      ["teams.list", (c) => c.teams.list()],
      ["tags.list", (c) => c.tags.list()],
      ["taxRates.list", (c) => c.taxRates.list()],
      ["paymentTerms.list", (c) => c.paymentTerms.list()],
      ["activityTypes.list", (c) => c.activityTypes.list()],
      ["businessTypes.list", (c) => c.businessTypes.list({ country: "BE" })],
      ["lostReasons.list", (c) => c.lostReasons.list()],
      ["workTypes.list", (c) => c.workTypes.list()],
      ["ticketStatus.list", (c) => c.ticketStatus.list()],
      ["callOutcomes.list", (c) => c.callOutcomes.list()],
      ["unitsOfMeasure.list", (c) => c.unitsOfMeasure.list()],
      ["commercialDiscounts.list", (c) => c.commercialDiscounts.list()],
      ["withholdingTaxRates.list", (c) => c.withholdingTaxRates.list()],
      ["paymentMethods.list", (c) => c.paymentMethods.list()],
      ["bookkeepingSubmissions.list", (c) => c.bookkeepingSubmissions.list()],
      ["productCategories.list", (c) => c.productCategories.list()],
      ["priceLists.list", (c) => c.priceLists.list()],
      ["dealSources.list", (c) => c.dealSources.list()],
      ["expenses.list", (c) => c.expenses.list()],
      ["dayOffTypes.list", (c) => c.dayOffTypes.list()],
    ];

    for (const [endpoint, fn] of cases) {
      it(`${endpoint}`, async () => {
        const { client, calls } = createClient();
        await fn(client);
        expect(calls[0].url).toContain(`/${endpoint}`);
      });
    }
  });

  // ---------------------------------------------------------------------------
  // Resources with required params for list
  // ---------------------------------------------------------------------------

  describe("resources with required list params", () => {
    it("departments.info → POST /departments.info", async () => {
      const { client, calls } = createClientWithBody({ data: { id: "dep1" } });
      await client.departments.info({ id: "dep1" });
      expect(calls[0].url).toContain("/departments.info");
    });

    it("documentTemplates.list → POST /documentTemplates.list", async () => {
      const { client, calls } = createClient();
      await client.documentTemplates.list({
        filter: { department_id: "dep1", document_type: "quotation" },
      });
      expect(calls[0].url).toContain("/documentTemplates.list");
    });

    it("levelTwoAreas.list → POST /levelTwoAreas.list", async () => {
      const { client, calls } = createClient();
      await client.levelTwoAreas.list({ country: "BE" });
      expect(calls[0].url).toContain("/levelTwoAreas.list");
    });

    it("mailTemplates.list → POST /mailTemplates.list", async () => {
      const { client, calls } = createClient();
      await client.mailTemplates.list({ filter: { type: "invoice" } });
      expect(calls[0].url).toContain("/mailTemplates.list");
    });
  });
});
