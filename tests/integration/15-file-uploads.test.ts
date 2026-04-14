import { describe, it, expect, afterAll } from "vitest";
import { getClient, noToken, cleanupAll, delay } from "./setup.js";

/** 1×1 transparent PNG, base64-encoded */
const TINY_PNG =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

describe.skipIf(noToken)("File uploads", () => {
  const client = getClient();

  let contactId: string;
  let companyId: string;

  describe.sequential("setup", () => {
    it("rate limit cooldown", async () => {
      await delay(3000);
    });

    it("create contact", async () => {
      const res = await client.contacts.add({
        first_name: "SDK",
        last_name: "AvatarTest",
      });
      contactId = (res.data as { id: string }).id;
    });

    it("create company", async () => {
      const res = await client.companies.add({ name: "SDK Logo Test Co." });
      companyId = (res.data as { id: string }).id;
    });
  });

  describe.sequential("contacts.uploadAvatar", () => {
    it("uploads a base64 PNG as avatar (returns 204)", async () => {
      const result = await client.contacts.uploadAvatar({
        id: contactId,
        image: `data:image/png;base64,${TINY_PNG}`,
      });
      // 204 — SDK returns undefined
      expect(result).toBeUndefined();
    });

    it("contact.info returns without throwing after avatar upload", async () => {
      const res = await client.contacts.info({ id: contactId });
      expect(res.data).toBeDefined();
    });

    it("clears avatar via image: null", async () => {
      const result = await client.contacts.uploadAvatar({
        id: contactId,
        image: null,
      });
      expect(result).toBeUndefined();
    });
  });

  describe.sequential("companies.uploadLogo", () => {
    it("uploads a base64 PNG as logo (returns 204)", async () => {
      const result = await client.companies.uploadLogo({
        id: companyId,
        image: `data:image/png;base64,${TINY_PNG}`,
      });
      expect(result).toBeUndefined();
    });

    it("company.info returns without throwing after logo upload", async () => {
      const res = await client.companies.info({ id: companyId });
      expect(res.data).toBeDefined();
    });
  });

  afterAll(async () => {
    await cleanupAll([
      () => (contactId ? client.contacts.delete({ id: contactId }) : Promise.resolve()),
      () => (companyId ? client.companies.delete({ id: companyId }) : Promise.resolve()),
    ]);
  });
});
