import { describe, it, expect, afterAll } from "vitest";
import { getClient, noToken, cleanupAll, delay } from "./setup.js";

describe.skipIf(noToken)("Custom Fields", () => {
  const client = getClient();

  let cfdId1: string;
  let cfdId2: string;
  let contactId: string;

  // -----------------------------------------------------------------------
  // Setup: create two custom field definitions on contacts
  // -----------------------------------------------------------------------

  describe.sequential("setup", () => {
    it("rate limit cooldown", async () => {
      await delay(3000);
    });

    it("create custom field 1 (single_line)", async () => {
      const res = await client.customFieldDefinitions.create({
        context: "contact",
        label: `SDK CF1 ${Date.now()}`,
        type: "single_line",
      });
      expect(res).toHaveProperty("data");
      cfdId1 = (res.data as { id: string }).id;
    });

    it("create custom field 2 (single_line)", async () => {
      const res = await client.customFieldDefinitions.create({
        context: "contact",
        label: `SDK CF2 ${Date.now()}`,
        type: "single_line",
      });
      expect(res).toHaveProperty("data");
      cfdId2 = (res.data as { id: string }).id;
    });
  });

  // -----------------------------------------------------------------------
  // Custom field CRUD on a contact
  // -----------------------------------------------------------------------

  describe.sequential("custom field lifecycle", () => {
    it("create contact with custom_fields", async () => {
      const res = await client.contacts.add({
        first_name: "SDK",
        last_name: "CustomFieldTest",
        custom_fields: [
          { id: cfdId1, value: "value1" },
          { id: cfdId2, value: "value2" },
        ],
      });
      expect(res).toHaveProperty("data");
      contactId = (res.data as { id: string }).id;
    });

    it("verify custom fields are set via info", async () => {
      const res = await client.contacts.info({ id: contactId });
      const data = res.data as { custom_fields?: Array<{ definition: { id: string }; value: string }> };
      expect(data.custom_fields).toBeDefined();

      const cf1 = data.custom_fields!.find((cf) => cf.definition.id === cfdId1);
      const cf2 = data.custom_fields!.find((cf) => cf.definition.id === cfdId2);
      expect(cf1?.value).toBe("value1");
      expect(cf2?.value).toBe("value2");
    });

    it("update with partial strategy — only updates specified field", async () => {
      await client.contacts.update({
        id: contactId,
        custom_fields: [
          { id: cfdId1, value: "updated1" },
        ],
        custom_fields_update_strategy: "partial",
      });

      // Verify: cfdId1 changed, cfdId2 preserved
      const res = await client.contacts.info({ id: contactId });
      const data = res.data as { custom_fields?: Array<{ definition: { id: string }; value: string }> };

      const cf1 = data.custom_fields!.find((cf) => cf.definition.id === cfdId1);
      const cf2 = data.custom_fields!.find((cf) => cf.definition.id === cfdId2);
      expect(cf1?.value).toBe("updated1");
      expect(cf2?.value).toBe("value2"); // unchanged
    });

    it("update without strategy — replaces all custom fields", async () => {
      await client.contacts.update({
        id: contactId,
        custom_fields: [
          { id: cfdId1, value: "only1" },
        ],
      });

      // Verify: cfdId1 set, cfdId2 should be cleared/null
      const res = await client.contacts.info({ id: contactId });
      const data = res.data as { custom_fields?: Array<{ definition: { id: string }; value: unknown }> };

      const cf1 = data.custom_fields!.find((cf) => cf.definition.id === cfdId1);
      const cf2 = data.custom_fields!.find((cf) => cf.definition.id === cfdId2);
      expect(cf1?.value).toBe("only1");
      // cf2 should be null/empty/missing since we didn't include it
      expect(!cf2 || cf2.value === null || cf2.value === "").toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // Cleanup
  // -----------------------------------------------------------------------

  afterAll(async () => {
    await cleanupAll([
      () => contactId ? client.contacts.delete({ id: contactId }) : Promise.resolve(),
      // Custom field definitions cannot be deleted via API
    ]);
  });
});
