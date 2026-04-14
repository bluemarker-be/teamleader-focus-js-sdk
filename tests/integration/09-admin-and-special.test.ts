import { describe, it, expect } from "vitest";
import {
  getClient,
  noToken,
  cleanupAll,
  futureDate,
  isoDate,
  isoDateTime,
  delay,
  collect,
} from "./setup.js";

describe.skipIf(noToken)("Admin & Special", () => {
  const client = getClient();

  let userId: string;
  let workTypeId: string;
  let isV2: boolean = true; // assume v2 by default; legacy tests skip if v2

  // -----------------------------------------------------------------------
  // Setup
  // -----------------------------------------------------------------------

  describe.sequential("setup", () => {
    it("get current user", async () => {
      const res = await client.users.me();
      userId = (res.data as { id: string }).id;
    });

    it("fetch work type", async () => {
      const res = await collect(client.workTypes.list(undefined, { maxPages: 1 }));
      const types = res as Array<{ id: string }>;
      expect(types.length).toBeGreaterThan(0);
      workTypeId = types[0].id;
    });

    it("check projects v2 status", async () => {
      try {
        const res = await client.accounts.projectsV2Status();
        const data = res.data as { migrated?: boolean; status?: string };
        isV2 =
          data.migrated === true ||
          data.status === "migrated" ||
          data.status === "projects-v2";
      } catch {
        isV2 = false;
      }
    });
  });

  // -----------------------------------------------------------------------
  // Custom Field Definitions
  // -----------------------------------------------------------------------

  describe.sequential("customFieldDefinitions", () => {
    let cfdId: string;

    it("create", async () => {
      const res = await client.customFieldDefinitions.create({
        context: "contact",
        label: `SDK Test Field ${Date.now()}`,
        type: "single_line",
      });
      expect(res).toHaveProperty("data");
      cfdId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      const res = await client.customFieldDefinitions.info({ id: cfdId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(cfdId);
    });

    it("list", async () => {
      const res = await collect(client.customFieldDefinitions.list({
        page: { size: 10, number: 1 },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    // Note: no delete endpoint exists for custom field definitions
  });

  // -----------------------------------------------------------------------
  // Day Off Types
  // -----------------------------------------------------------------------

  describe.sequential("dayOffTypes", () => {
    let dayOffTypeId: string | undefined;
    let externalDaysOffEnabled = true;

    it("create", async () => {
      try {
        const res = await client.dayOffTypes.create({
          name: "SDK Test Day Off Type",
        });
        expect(res).toHaveProperty("data");
        dayOffTypeId = (res.data as { id: string }).id;
      } catch (err: unknown) {
        // 403 = "Managing days off externally is not enabled"
        const status = (err as { status?: number }).status;
        if (status === 403) {
          externalDaysOffEnabled = false;
          return;
        }
        throw err;
      }
    });

    it("list", async () => {
      const res = await collect(client.dayOffTypes.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("update", async () => {
      if (!dayOffTypeId || !externalDaysOffEnabled) return;
      await client.dayOffTypes.update({
        id: dayOffTypeId,
        name: "SDK Day Off Updated",
      });
    });

    it("delete", async () => {
      if (!dayOffTypeId || !externalDaysOffEnabled) return;
      await client.dayOffTypes.delete({ id: dayOffTypeId });
    });
  });

  // -----------------------------------------------------------------------
  // Days Off
  // -----------------------------------------------------------------------

  describe.sequential("daysOff", () => {
    let dayOffTypeId: string | undefined;
    let importedIds: string[] = [];
    let externalDaysOffEnabled = true;

    it("rate limit cooldown", async () => {
      await delay(3000);
    });

    it("setup: create day off type", async () => {
      try {
        const res = await client.dayOffTypes.create({
          name: "SDK DaysOff Test Type",
        });
        dayOffTypeId = (res.data as { id: string }).id;
      } catch (err: unknown) {
        const status = (err as { status?: number }).status;
        if (status === 403) {
          externalDaysOffEnabled = false;
          return;
        }
        throw err;
      }
    });

    it("import", async () => {
      if (!externalDaysOffEnabled || !dayOffTypeId) return;
      const res = await client.daysOff.import({
        user_id: userId,
        leave_type_id: dayOffTypeId,
        days: [{ starts_at: futureDate(200), ends_at: futureDate(201) }],
      });
      expect(res).toHaveProperty("data");
      const data = res.data as
        | { id: string }
        | Array<{ id: string }>;
      if (Array.isArray(data)) {
        importedIds = data.map((d) => d.id);
      } else if (data && typeof data === "object" && "id" in data) {
        importedIds = [data.id];
      }
    });

    it("bulkDelete", async () => {
      if (!externalDaysOffEnabled || importedIds.length === 0) return;
      await client.daysOff.bulkDelete({ user_id: userId, ids: importedIds });
    });

    it("cleanup: delete day off type", async () => {
      if (!externalDaysOffEnabled || !dayOffTypeId) return;
      await client.dayOffTypes.delete({ id: dayOffTypeId });
    });
  });

  // -----------------------------------------------------------------------
  // Closing Days
  // -----------------------------------------------------------------------

  describe.sequential("closingDays", () => {
    let closingDayId: string | undefined;
    let externalDaysOffEnabled = true;

    it("rate limit cooldown", async () => {
      await delay(3000);
    });

    it("add", async () => {
      try {
        const res = await client.closingDays.add({
          day: futureDate(300),
        });
        expect(res).toHaveProperty("data");
        closingDayId = (res.data as { id: string }).id;
      } catch (err: unknown) {
        const status = (err as { status?: number }).status;
        if (status === 403) {
          externalDaysOffEnabled = false;
          return;
        }
        throw err;
      }
    });

    it("list", async () => {
      const res = await collect(client.closingDays.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("delete", async () => {
      if (!externalDaysOffEnabled || !closingDayId) return;
      await client.closingDays.delete({ id: closingDayId });
    });
  });

  // -----------------------------------------------------------------------
  // Reservations
  // -----------------------------------------------------------------------

  describe.sequential("reservations", () => {
    let reservationId: string | undefined;
    let plannableItemId: string | undefined;
    let taskId: string | undefined;

    it("setup: create task and find plannable item", async () => {
      // Create a scheduled task — this should produce a plannable item
      const taskRes = await client.tasks.create({
        title: "SDK Reservation Test Task",
        description: "For reservation testing",
        due_on: futureDate(14),
        work_type_id: workTypeId,
        assignee: { type: "user", id: userId },
      });
      taskId = (taskRes.data as { id: string }).id;

      // Try all plannable items to find one that can accept a reservation
      const res = await collect(client.plannableItems.list(undefined, { maxPages: 1 }));
      const items = res as Array<{
        id: string;
        source?: { type: string };
        unplanned_duration?: { value: number };
      }>;

      // Prefer items with unplanned duration > 0
      for (const item of items) {
        if (item.unplanned_duration && item.unplanned_duration.value > 0) {
          plannableItemId = item.id;
          break;
        }
      }
      // Fallback: try the first item
      if (!plannableItemId && items.length > 0) {
        plannableItemId = items[0].id;
      }
    });

    it("create", async () => {
      if (!plannableItemId) return; // skip if no plannable items
      try {
        const res = await client.reservations.create({
          plannable_item_id: plannableItemId,
          date: futureDate(10),
          duration: { unit: "minutes", value: 30 },
          assignee: { type: "user", id: userId },
        });
        expect(res).toHaveProperty("data");
        reservationId = (res.data as { id: string }).id;
      } catch (err: unknown) {
        // Some plannable items cannot accept reservations — skip gracefully
        const msg = (err as { body?: { errors?: Array<{ key?: string }> } })
          .body?.errors?.[0]?.key;
        if (msg === "reservation_cannot_be_created_for_plannable_item") {
          plannableItemId = undefined;
          return;
        }
        throw err;
      }
    });

    it("list", async () => {
      const res = await collect(client.reservations.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("update", async () => {
      if (!reservationId) return;
      await client.reservations.update({
        id: reservationId,
        duration: { unit: "minutes", value: 60 },
      });
    });

    it("delete", async () => {
      if (!reservationId) return;
      await client.reservations.delete({ id: reservationId });
    });

    it("cleanup: delete task", async () => {
      if (!taskId) return;
      await cleanupAll([() => client.tasks.delete({ id: taskId! })]);
    });
  });

  // -----------------------------------------------------------------------
  // Tickets
  // -----------------------------------------------------------------------

  describe.sequential("tickets", () => {
    let ticketId: string;
    let messageId: string;
    let contactId: string;
    let ticketStatusId: string;

    it("setup: create contact for ticket", async () => {
      const res = await client.contacts.add({
        first_name: "SDK",
        last_name: "TicketTest",
      });
      contactId = (res.data as { id: string }).id;
    });

    it("setup: fetch ticket status", async () => {
      const res = await collect(client.ticketStatus.list(undefined, { maxPages: 1 }));
      const statuses = res as Array<{ id: string }>;
      expect(statuses.length).toBeGreaterThan(0);
      ticketStatusId = statuses[0].id;
    });

    it("create", async () => {
      const res = await client.tickets.create({
        subject: "SDK Integration Test Ticket",
        customer: { type: "contact", id: contactId },
        ticket_status_id: ticketStatusId,
        description: "This is a test ticket created by the SDK integration tests.",
      });
      expect(res).toHaveProperty("data");
      ticketId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      const res = await client.tickets.info({ id: ticketId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(ticketId);
    });

    it("list", async () => {
      const res = await collect(client.tickets.list({
        page: { size: 10, number: 1 },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("update", async () => {
      await client.tickets.update({
        id: ticketId,
        subject: "SDK Ticket Updated",
      });
    });

    it("addInternalMessage", async () => {
      const res = await client.tickets.addInternalMessage({
        id: ticketId,
        body: "SDK internal message test",
      });
      expect(res).toHaveProperty("data");
      messageId = (res.data as { id: string }).id;
    });

    it("listMessages", async () => {
      const res = await client.tickets.listMessages({ id: ticketId });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
      expect(res.data.length).toBeGreaterThan(0);
    });

    it("getMessage", async () => {
      if (!messageId) return;
      // tickets.getMessage only takes message_id — not ticket id
      const res = await client.tickets.getMessage({
        message_id: messageId,
      });
      expect(res).toHaveProperty("data");
    });

    it("importMessage", async () => {
      const res = await client.tickets.importMessage({
        id: ticketId,
        body: "SDK imported message test",
        sent_at: isoDateTime(-2),
        sent_by: { type: "contact", id: contactId },
      });
      expect(res).toHaveProperty("data");
    });

    it("addReply", async () => {
      const res = await client.tickets.addReply({
        id: ticketId,
        body: "SDK integration test reply",
      });
      expect(res).toHaveProperty("data");
    });

    it("cleanup: delete contact", async () => {
      await cleanupAll([() => client.contacts.delete({ id: contactId })]);
    });
  });

  // -----------------------------------------------------------------------
  // Webhooks
  // -----------------------------------------------------------------------

  describe.sequential("webhooks", () => {
    it("register", async () => {
      await client.webhooks.register({
        url: "https://httpbin.org/post",
        types: ["contact.added"],
      });
    });

    it("list", async () => {
      const res = await collect(client.webhooks.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("unregister", async () => {
      await client.webhooks.unregister({
        url: "https://httpbin.org/post",
        types: ["contact.added"],
      });
    });
  });

  // -----------------------------------------------------------------------
  // Email Tracking — requires email integration, skip
  // -----------------------------------------------------------------------

  describe.sequential("emailTracking", () => {
    let etContactId: string;

    it("setup: create contact", async () => {
      const res = await client.contacts.add({
        first_name: "SDK",
        last_name: "EmailTrackingTest",
      });
      etContactId = (res.data as { id: string }).id;
    });

    it("create", async () => {
      const res = await client.emailTracking.create({
        subject: { type: "contact", id: etContactId },
        title: "SDK test tracked email",
        content: "<p>This is a tracked email from SDK integration tests.</p>",
      });
      expect(res).toHaveProperty("data");
    });

    it("list", async () => {
      const res = await collect(client.emailTracking.list({
        filter: { subject: { type: "contact", id: etContactId } },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("cleanup", async () => {
      await cleanupAll([() => client.contacts.delete({ id: etContactId })]);
    });
  });

  // -----------------------------------------------------------------------
  // Migrate — requires legacy IDs, skip
  // -----------------------------------------------------------------------

  describe("migrate", () => {
    it.skip("id — requires legacy system IDs", () => {});
    it.skip("taxRate — requires legacy tax rate ID", () => {});
    it.skip("activityType — requires legacy activity type ID", () => {});
  });

  // -----------------------------------------------------------------------
  // Cloud Platforms — requires cloud platform link, skip
  // -----------------------------------------------------------------------

  describe("cloudPlatforms", () => {
    it("url", async () => {
      // cloudPlatforms.url accepts "invoice", "quotation", or "ticket"
      const invRes = await collect(client.invoices.list({ page: { size: 1, number: 1 } }, { maxPages: 1 }));
      const invoices = invRes as Array<{ id: string }>;
      expect(invoices.length).toBeGreaterThan(0);

      const res = await client.cloudPlatforms.url({
        type: "invoice",
        id: invoices[0].id,
      });
      expect(res).toHaveProperty("data");
    });
  });

  describe.sequential("bookkeepingSubmissions", () => {
    let incomingInvoiceId: string;
    let supplierId: string;

    it("setup: create supplier + incoming invoice", async () => {
      const compRes = await client.companies.add({ name: "SDK BookkeepingTest Supplier" });
      supplierId = (compRes.data as { id: string }).id;

      const invRes = await client.incomingInvoices.add({
        title: "SDK Bookkeeping Test",
        currency: { code: "EUR" },
        supplier_id: supplierId,
        due_date: futureDate(30),
        total: {
          tax_exclusive: { amount: 100 },
          tax_inclusive: { amount: 121 },
        },
      });
      incomingInvoiceId = (invRes.data as { id: string }).id;
    });

    it("list", async () => {
      const res = await collect(client.bookkeepingSubmissions.list({
        filter: {
          subject: {
            type: "incomingInvoice",
            id: incomingInvoiceId,
          },
        },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("cleanup", async () => {
      await cleanupAll([
        () => client.incomingInvoices.delete({ id: incomingInvoiceId }),
        () => client.companies.delete({ id: supplierId }),
      ]);
    });
  });

  // -----------------------------------------------------------------------
  // Legacy Projects (only if NOT migrated to v2)
  // -----------------------------------------------------------------------

  describe.sequential("legacyProjects", () => {
    let projectId: string;
    let contactId: string;

    it("setup: create contact", async () => {
      if (isV2) return;
      const res = await client.contacts.add({
        first_name: "SDK",
        last_name: "LegacyProjectTest",
      });
      contactId = (res.data as { id: string }).id;
    });

    it("create", async () => {
      if (isV2) return;
      const res = await client.legacyProjects.create({
        title: "SDK Legacy Project",
        customer: { type: "contact", id: contactId },
        starts_on: isoDate(),
        milestones: [
          {
            due_on: futureDate(30),
            name: "SDK Test Milestone",
            responsible_user_id: userId,
          },
        ],
        participants: [
          {
            participant: { type: "user", id: userId },
            role: "decision_maker",
          },
        ],
      });
      expect(res).toHaveProperty("data");
      projectId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      if (isV2 || !projectId) return;
      const res = await client.legacyProjects.info({ id: projectId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(projectId);
    });

    it("list", async () => {
      if (isV2) return;
      const res = await collect(client.legacyProjects.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("update", async () => {
      if (isV2 || !projectId) return;
      await client.legacyProjects.update({
        id: projectId,
        title: "SDK Legacy Project Updated",
      });
    });

    it("close", async () => {
      if (isV2 || !projectId) return;
      await client.legacyProjects.close({ id: projectId });
    });

    it("reopen", async () => {
      if (isV2 || !projectId) return;
      await client.legacyProjects.reopen({ id: projectId });
    });

    it("addParticipant", async () => {
      if (isV2 || !projectId) return;
      await client.legacyProjects.addParticipant({
        id: projectId,
        participant: { type: "user", id: userId },
      });
    });

    it("updateParticipant", async () => {
      if (isV2 || !projectId) return;
      await client.legacyProjects.updateParticipant({
        id: projectId,
        participant: { type: "user", id: userId },
        role: "decision_maker",
      });
    });

    it("delete", async () => {
      if (isV2 || !projectId) return;
      await client.legacyProjects.delete({ id: projectId });
    });

    it("cleanup", async () => {
      if (isV2) return;
      await cleanupAll([
        () => client.contacts.delete({ id: contactId }),
      ]);
    });
  });

  // -----------------------------------------------------------------------
  // Legacy Milestones (only if NOT migrated to v2)
  // -----------------------------------------------------------------------

  describe.sequential("legacyMilestones", () => {
    let projectId: string;
    let milestoneId: string;
    let contactId: string;

    it("setup: create contact + project", async () => {
      if (isV2) return;
      const contactRes = await client.contacts.add({
        first_name: "SDK",
        last_name: "LegacyMilestoneTest",
      });
      contactId = (contactRes.data as { id: string }).id;

      const projectRes = await client.legacyProjects.create({
        title: "SDK Milestone Project",
        customer: { type: "contact", id: contactId },
        starts_on: isoDate(),
        milestones: [
          {
            due_on: futureDate(30),
            name: "SDK Initial Milestone",
            responsible_user_id: userId,
          },
        ],
        participants: [
          {
            participant: { type: "user", id: userId },
            role: "decision_maker",
          },
        ],
      });
      projectId = (projectRes.data as { id: string }).id;
    });

    it("create", async () => {
      if (isV2) return;
      const res = await client.legacyMilestones.create({
        project_id: projectId,
        name: "SDK Test Milestone",
        due_on: futureDate(60),
        responsible_user_id: userId,
      });
      expect(res).toHaveProperty("data");
      milestoneId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      if (isV2 || !milestoneId) return;
      const res = await client.legacyMilestones.info({ id: milestoneId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(milestoneId);
    });

    it("list", async () => {
      if (isV2) return;
      const res = await collect(client.legacyMilestones.list({
        filter: { project_id: projectId },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("update", async () => {
      if (isV2 || !milestoneId) return;
      await client.legacyMilestones.update({
        id: milestoneId,
        name: "SDK Milestone Updated",
      });
    });

    it("close", async () => {
      if (isV2 || !milestoneId) return;
      await client.legacyMilestones.close({ id: milestoneId });
    });

    it("open", async () => {
      if (isV2 || !milestoneId) return;
      await client.legacyMilestones.open({ id: milestoneId });
    });

    it("delete", async () => {
      if (isV2 || !milestoneId) return;
      await client.legacyMilestones.delete({ id: milestoneId });
    });

    it("cleanup", async () => {
      if (isV2) return;
      await cleanupAll([
        () => client.legacyProjects.delete({ id: projectId }),
        () => client.contacts.delete({ id: contactId }),
      ]);
    });
  });
});
