import { describe, it, expect, afterAll } from "vitest";
import { getClient, noToken, cleanupAll, delay, collect } from "./setup.js";

/**
 * Projects v2 tests — skipped if account is not migrated to Projects v2.
 */
describe.skipIf(noToken)("Projects v2", () => {
  const client = getClient();

  let isV2: boolean = false;
  let contactId: string;
  let userId: string;
  let projectId: string;
  let dupProjectId: string;
  let groupId: string;
  let dupGroupId: string;
  let ptaskId: string;
  let dupPtaskId: string;
  let materialId: string;
  let dupMaterialId: string;
  let lineId: string;
  // externalParties.update/delete need the party's ID, not project_id
  let externalPartyId: string;
  // For deal/quotation linking tests
  let dealId: string;
  let quotationId: string;
  let pipelineId: string;
  let phaseId: string;
  let departmentId: string;
  let taxRateId: string;

  // -----------------------------------------------------------------------
  // Check v2 migration status
  // -----------------------------------------------------------------------

  describe.sequential("setup", () => {
    it("check projects v2 status", async () => {
      try {
        const res = await client.accounts.projectsV2Status();
        const data = res.data as { migrated?: boolean; status?: string };
        isV2 = data.migrated === true || data.status === "migrated";
      } catch {
        isV2 = false;
      }
    });

    it("create test contact", async () => {
      if (!isV2) return;
      const res = await client.contacts.add({
        first_name: "SDK",
        last_name: "ProjectTest",
      });
      contactId = (res.data as { id: string }).id;
    });

    it("get current user", async () => {
      if (!isV2) return;
      const res = await client.users.me();
      userId = (res.data as { id: string }).id;
    });
  });

  // -----------------------------------------------------------------------
  // Projects
  // -----------------------------------------------------------------------

  describe.sequential("projects", () => {
    it("create", async () => {
      if (!isV2) return;
      const res = await client.projects.create({
        title: "SDK Test Project",
      });
      expect(res).toHaveProperty("data");
      projectId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      if (!isV2) return;
      const res = await client.projects.info({ id: projectId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(projectId);
    });

    it("list", async () => {
      if (!isV2) return;
      const res = await collect(client.projects.list({
        page: { size: 10, number: 1 },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("update", async () => {
      if (!isV2) return;
      await client.projects.update({
        id: projectId,
        title: "SDK Test Project Updated",
      });
    });

    it("addOwner", async () => {
      if (!isV2) return;
      try {
        await client.projects.addOwner({
          id: projectId,
          user_id: userId,
        });
      } catch {
        // user may already be owner
      }
    });

    it("removeOwner", async () => {
      if (!isV2) return;
      try {
        await client.projects.removeOwner({
          id: projectId,
          user_id: userId,
        });
      } catch {
        // may fail if user is the only owner
      }
    });

    it("assign", async () => {
      if (!isV2) return;
      await client.projects.assign({
        id: projectId,
        assignee: { type: "user", id: userId },
      });
    });

    it("unassign", async () => {
      if (!isV2) return;
      await client.projects.unassign({
        id: projectId,
        assignee: { type: "user", id: userId },
      });
    });

    it("addCustomer", async () => {
      if (!isV2) return;
      await client.projects.addCustomer({
        id: projectId,
        customer: { type: "contact", id: contactId },
      });
    });

    it("removeCustomer", async () => {
      if (!isV2) return;
      await client.projects.removeCustomer({
        id: projectId,
        customer: { type: "contact", id: contactId },
      });
    });

    it("setup: create deal for linking", async () => {
      if (!isV2) return;
      // Create pipeline + phase + deal
      const pRes = await client.dealPipelines.create({
        name: "SDK Project Link Pipeline",
      });
      pipelineId = (pRes.data as { id: string }).id;

      const phRes = await collect(client.dealPhases.list({
        filter: { deal_pipeline_id: pipelineId },
      }, { maxPages: 1 }));
      const phases = phRes as Array<{ id: string }>;
      phaseId = phases[0].id;

      const dRes = await client.deals.create({
        title: "SDK Project Link Deal",
        lead: { customer: { type: "contact", id: contactId } },
        phase_id: phaseId,
      });
      dealId = (dRes.data as { id: string }).id;
    });

    it("addDeal", async () => {
      if (!isV2) return;
      await client.projects.addDeal({
        id: projectId,
        deal_id: dealId,
      });
    });

    it("removeDeal", async () => {
      if (!isV2) return;
      await client.projects.removeDeal({
        id: projectId,
        deal_id: dealId,
      });
    });

    it("setup: create quotation for linking", async () => {
      if (!isV2) return;
      // Fetch department + tax rate for quotation
      const depRes = await collect(client.departments.list(undefined, { maxPages: 1 }));
      const depts = depRes as Array<{ id: string }>;
      departmentId = depts[0].id;

      const trRes = await collect(client.taxRates.list(undefined, { maxPages: 1 }));
      const rates = trRes as Array<{
        id: string;
        department?: { type: string; id: string };
      }>;
      const matching = rates.find(
        (r) => r.department && r.department.id === departmentId,
      );
      taxRateId = matching!.id;

      const qRes = await client.quotations.create({
        deal_id: dealId,
        currency: { code: "EUR", exchange_rate: 1 },
        grouped_lines: [
          {
            section: { title: "SDK Project Link" },
            line_items: [
              {
                quantity: 1,
                description: "SDK quotation for project linking",
                unit_price: { amount: 100, tax: "excluding" },
                tax_rate_id: taxRateId,
              },
            ],
          },
        ],
      });
      quotationId = (qRes.data as { id: string }).id;
    });

    it("addQuotation", async () => {
      if (!isV2) return;
      await client.projects.addQuotation({
        id: projectId,
        quotation_id: quotationId,
      });
    });

    it("removeQuotation", async () => {
      if (!isV2) return;
      await client.projects.removeQuotation({
        id: projectId,
        quotation_id: quotationId,
      });
    });

    it("duplicate", async () => {
      if (!isV2) return;
      const res = await client.projects.duplicate({
        id: projectId,
        title: "SDK Duplicated Project",
      });
      expect(res).toHaveProperty("data");
      dupProjectId = (res.data as { id: string }).id;
    });

    it("close", async () => {
      if (!isV2) return;
      await client.projects.close({ id: projectId, closing_strategy: "none" });
    });

    it("reopen", async () => {
      if (!isV2) return;
      await client.projects.reopen({ id: projectId });
    });
  });

  // -----------------------------------------------------------------------
  // Project Groups
  // -----------------------------------------------------------------------

  describe.sequential("projectGroups", () => {
    it("create", async () => {
      if (!isV2) return;
      const res = await client.projectGroups.create({
        project_id: projectId,
        title: "SDK Test Group",
      });
      expect(res).toHaveProperty("data");
      groupId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      if (!isV2) return;
      const res = await client.projectGroups.info({ id: groupId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(groupId);
    });

    it("list", async () => {
      if (!isV2) return;
      const res = await collect(client.projectGroups.list({
        filter: { project_id: projectId },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("update", async () => {
      if (!isV2) return;
      await client.projectGroups.update({
        id: groupId,
        title: "SDK Group Updated",
      });
    });

    it("duplicate", async () => {
      if (!isV2) return;
      const res = await client.projectGroups.duplicate({
        origin_id: groupId,
      });
      expect(res).toHaveProperty("data");
      dupGroupId = (res.data as { id: string }).id;
    });

    it("assign", async () => {
      if (!isV2) return;
      await client.projectGroups.assign({
        id: groupId,
        assignee: { type: "user", id: userId },
      });
    });

    it("unassign", async () => {
      if (!isV2) return;
      await client.projectGroups.unassign({
        id: groupId,
        assignee: { type: "user", id: userId },
      });
    });
  });

  // -----------------------------------------------------------------------
  // Project Tasks
  // -----------------------------------------------------------------------

  describe.sequential("projectTasks", () => {
    it("create", async () => {
      if (!isV2) return;
      const res = await client.projectTasks.create({
        project_id: projectId,
        title: "SDK Test Project Task",
        group_id: groupId,
      });
      expect(res).toHaveProperty("data");
      ptaskId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      if (!isV2) return;
      const res = await client.projectTasks.info({ id: ptaskId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(ptaskId);
    });

    it("list", async () => {
      if (!isV2) return;
      // Per spec, filter only supports `ids` — no project_id filter
      const res = await collect(client.projectTasks.list({
        page: { size: 10, number: 1 },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("update", async () => {
      if (!isV2) return;
      await client.projectTasks.update({
        id: ptaskId,
        title: "SDK Project Task Updated",
      });
    });

    it("duplicate", async () => {
      if (!isV2) return;
      const res = await client.projectTasks.duplicate({
        origin_id: ptaskId,
      });
      expect(res).toHaveProperty("data");
      dupPtaskId = (res.data as { id: string }).id;
    });

    it("assign", async () => {
      if (!isV2) return;
      await client.projectTasks.assign({
        id: ptaskId,
        assignee: { type: "user", id: userId },
      });
    });

    it("unassign", async () => {
      if (!isV2) return;
      await client.projectTasks.unassign({
        id: ptaskId,
        assignee: { type: "user", id: userId },
      });
    });
  });

  // -----------------------------------------------------------------------
  // Project Materials
  // -----------------------------------------------------------------------

  describe.sequential("projectMaterials", () => {
    it("create", async () => {
      if (!isV2) return;
      const res = await client.projectMaterials.create({
        project_id: projectId,
        title: "SDK Test Material",
        group_id: groupId,
      });
      expect(res).toHaveProperty("data");
      materialId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      if (!isV2) return;
      const res = await client.projectMaterials.info({ id: materialId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(materialId);
    });

    it("list", async () => {
      if (!isV2) return;
      // Per spec, filter only supports `ids` — no project_id filter, no page
      const res = await collect(client.projectMaterials.list({}, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("update", async () => {
      if (!isV2) return;
      await client.projectMaterials.update({
        id: materialId,
        title: "SDK Material Updated",
      });
    });

    it("duplicate", async () => {
      if (!isV2) return;
      const res = await client.projectMaterials.duplicate({
        origin_id: materialId,
      });
      expect(res).toHaveProperty("data");
      dupMaterialId = (res.data as { id: string }).id;
    });

    it("assign", async () => {
      if (!isV2) return;
      await client.projectMaterials.assign({
        id: materialId,
        assignee: { type: "user", id: userId },
      });
    });

    it("unassign", async () => {
      if (!isV2) return;
      await client.projectMaterials.unassign({
        id: materialId,
        assignee: { type: "user", id: userId },
      });
    });
  });

  // -----------------------------------------------------------------------
  // Project Lines
  // -----------------------------------------------------------------------

  describe.sequential("projectLines", () => {
    it("list", async () => {
      if (!isV2) return;
      const res = await collect(client.projectLines.list({
        project_id: projectId,
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
      // Get a line ID from existing tasks/materials
      const lines = res as Array<{ id: string }>;
      if (lines.length > 0) {
        lineId = lines[0].id;
      }
    });

    it("addToGroup", async () => {
      if (!isV2 || !lineId) return;
      try {
        await client.projectLines.addToGroup({
          line_id: lineId,
          group_id: groupId,
        });
      } catch {
        // line may already be in this group
      }
    });

    it("removeFromGroup", async () => {
      if (!isV2 || !lineId) return;
      try {
        await client.projectLines.removeFromGroup({ line_id: lineId });
      } catch {
        // line may not be in a group
      }
    });
  });

  // -----------------------------------------------------------------------
  // External Parties
  // -----------------------------------------------------------------------

  describe.sequential("externalParties", () => {
    it("addToProject", async () => {
      if (!isV2) return;
      // addToProject returns 204 no-content — no id returned.
      // We look it up via projects.info → external_parties[] below.
      await client.externalParties.addToProject({
        project_id: projectId,
        customer: { type: "contact", id: contactId },
      });
    });

    it("look up externalPartyId via projects.info", async () => {
      if (!isV2) return;
      const res = await client.projects.info({ id: projectId });
      const project = res.data as
        | { external_parties?: Array<{ id?: string; customer?: { id?: string } }> }
        | undefined;
      const party = project?.external_parties?.find((p) => p.customer?.id === contactId);
      externalPartyId = party?.id ?? "";
    });

    it("update", async () => {
      if (!isV2 || !externalPartyId) return;
      await client.externalParties.update({
        id: externalPartyId,
        customer: { type: "contact", id: contactId },
      });
    });

    it("delete", async () => {
      if (!isV2 || !externalPartyId) return;
      await client.externalParties.delete({
        id: externalPartyId,
      });
    });
  });

  // -----------------------------------------------------------------------
  // Cleanup
  // -----------------------------------------------------------------------

  afterAll(async () => {
    if (!isV2) return;
    await cleanupAll([
      () =>
        dupPtaskId
          ? client.projectTasks.delete({ id: dupPtaskId, delete_strategy: "unlink_time_tracking" })
          : Promise.resolve(),
      () =>
        ptaskId
          ? client.projectTasks.delete({ id: ptaskId, delete_strategy: "unlink_time_tracking" })
          : Promise.resolve(),
      () =>
        dupMaterialId
          ? client.projectMaterials.delete({ id: dupMaterialId })
          : Promise.resolve(),
      () =>
        materialId
          ? client.projectMaterials.delete({ id: materialId })
          : Promise.resolve(),
      () =>
        dupGroupId
          ? client.projectGroups.delete({ id: dupGroupId, delete_strategy: "ungroup_tasks_and_materials" })
          : Promise.resolve(),
      () =>
        groupId
          ? client.projectGroups.delete({ id: groupId, delete_strategy: "ungroup_tasks_and_materials" })
          : Promise.resolve(),
      () =>
        dupProjectId
          ? client.projects.delete({ id: dupProjectId, delete_strategy: "unlink_tasks_and_time_trackings" })
          : Promise.resolve(),
      () =>
        projectId
          ? client.projects.delete({ id: projectId, delete_strategy: "unlink_tasks_and_time_trackings" })
          : Promise.resolve(),
      () =>
        quotationId
          ? client.quotations.delete({ id: quotationId })
          : Promise.resolve(),
      () =>
        dealId
          ? client.deals.delete({ id: dealId })
          : Promise.resolve(),
      () =>
        pipelineId
          ? client.dealPipelines.delete({ id: pipelineId })
          : Promise.resolve(),
      () =>
        contactId
          ? client.contacts.delete({ id: contactId })
          : Promise.resolve(),
    ]);
  });
});
