import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getClient, noToken, cleanupAll, delay, collect } from "./setup.js";

describe.skipIf(noToken)("CRM — Deals", () => {
  const client = getClient();

  // Shared IDs
  let contactId: string;
  let pipelineId: string;
  let phaseId: string;
  let phase2Id: string;
  let dupPipelineId: string;
  let dupPhaseId: string;
  let dealId: string;
  let deal2Id: string;
  let existingPhaseId: string;

  // Wait for rate limit window to reset before starting
  beforeAll(async () => {
    await delay(3000);
  });

  // -----------------------------------------------------------------------
  // Setup: create a contact for deal.lead.customer
  // -----------------------------------------------------------------------

  describe.sequential("setup", () => {
    it("create test contact", async () => {
      const res = await client.contacts.add({
        first_name: "SDK",
        last_name: "DealTest",
      });
      contactId = (res.data as { id: string }).id;
    });
  });

  // -----------------------------------------------------------------------
  // Deal Pipelines
  // -----------------------------------------------------------------------

  describe.sequential("dealPipelines", () => {
    it("list", async () => {
      const res = await collect(client.dealPipelines.list(undefined, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("create", async () => {
      const res = await client.dealPipelines.create({
        name: "SDK Test Pipeline",
      });
      expect(res).toHaveProperty("data");
      pipelineId = (res.data as { id: string }).id;
    });

    it("update", async () => {
      await client.dealPipelines.update({
        id: pipelineId,
        name: "SDK Test Pipeline Updated",
      });
    });

    it("markAsDefault", async () => {
      await client.dealPipelines.markAsDefault({ id: pipelineId });
    });

    it("duplicate", async () => {
      const res = await client.dealPipelines.duplicate({
        id: pipelineId,
      });
      expect(res).toHaveProperty("data");
      dupPipelineId = (res.data as { id: string }).id;
    });
  });

  // -----------------------------------------------------------------------
  // Deal Phases
  // -----------------------------------------------------------------------

  describe.sequential("dealPhases", () => {
    it("list", async () => {
      const res = await collect(client.dealPhases.list({
        filter: { deal_pipeline_id: pipelineId },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
      // Pipeline was just created — it may have default phases
      if (res.length > 0) {
        existingPhaseId = (res[0] as { id: string }).id;
      }
    });

    it("create", async () => {
      const res = await client.dealPhases.create({
        deal_pipeline_id: pipelineId,
        name: "SDK Test Phase",
        requires_attention_after: { amount: 7, unit: "days" },
      });
      expect(res).toHaveProperty("data");
      phaseId = (res.data as { id: string }).id;
    });

    it("update", async () => {
      await client.dealPhases.update({
        id: phaseId,
        name: "SDK Test Phase Updated",
        requires_attention_after: { amount: 14, unit: "days" },
      });
    });

    it.skip("duplicate — endpoint returns 404, not functional in current API", () => {});

    it("create phase2 for move test", async () => {
      const res = await client.dealPhases.create({
        deal_pipeline_id: pipelineId,
        name: "SDK Test Phase 2",
        requires_attention_after: { amount: 3, unit: "days" },
      });
      expect(res).toHaveProperty("data");
      phase2Id = (res.data as { id: string }).id;
    });

    it("move", async () => {
      // Move the second custom phase after the first custom phase
      // (the default "New" phase cannot be moved)
      await client.dealPhases.move({
        id: phase2Id,
        after_phase_id: phaseId,
      });
    });
  });

  // -----------------------------------------------------------------------
  // Deals
  // -----------------------------------------------------------------------

  describe.sequential("deals", () => {
    it("create", async () => {
      const targetPhase = existingPhaseId || phaseId;
      const res = await client.deals.create({
        title: "SDK Test Deal",
        lead: {
          customer: { type: "contact", id: contactId },
        },
        phase_id: targetPhase,
      });
      expect(res).toHaveProperty("data");
      dealId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      const res = await client.deals.info({ id: dealId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(dealId);
    });

    it("list", async () => {
      const res = await collect(client.deals.list({
        filter: { term: "SDK Test Deal" },
        page: { size: 10, number: 1 },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("update", async () => {
      await client.deals.update({
        id: dealId,
        title: "SDK Test Deal Updated",
      });
    });

    it("move", async () => {
      const targetPhase = phaseId;
      await client.deals.move({
        id: dealId,
        phase_id: targetPhase,
      });
    });

    it("win", async () => {
      await client.deals.win({ id: dealId });
    });

    it("create deal2 for lose", async () => {
      const targetPhase = existingPhaseId || phaseId;
      const res = await client.deals.create({
        title: "SDK Test Deal 2",
        lead: {
          customer: { type: "contact", id: contactId },
        },
        phase_id: targetPhase,
      });
      deal2Id = (res.data as { id: string }).id;
    });

    it("lose", async () => {
      await client.deals.lose({ id: deal2Id });
    });

    it("delete deal2", async () => {
      await client.deals.delete({ id: deal2Id });
    });

    it("delete deal", async () => {
      await client.deals.delete({ id: dealId });
    });
  });

  // -----------------------------------------------------------------------
  // Cleanup
  // -----------------------------------------------------------------------

  afterAll(async () => {
    await cleanupAll([
      () => client.deals.delete({ id: dealId }),
      () => client.deals.delete({ id: deal2Id }),
      () =>
        phase2Id
          ? client.dealPhases.delete({ id: phase2Id })
          : Promise.resolve(),
      () =>
        dupPhaseId
          ? client.dealPhases.delete({ id: dupPhaseId })
          : Promise.resolve(),
      () =>
        phaseId
          ? client.dealPhases.delete({ id: phaseId })
          : Promise.resolve(),
      () =>
        dupPipelineId
          ? client.dealPipelines.delete({ id: dupPipelineId })
          : Promise.resolve(),
      () =>
        pipelineId
          ? client.dealPipelines.delete({ id: pipelineId })
          : Promise.resolve(),
      () => client.contacts.delete({ id: contactId }),
    ]);
  });
});
