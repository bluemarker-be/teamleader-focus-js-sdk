import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getClient, noToken, cleanupAll, delay } from "./setup.js";

describe.skipIf(noToken)("CRM — Contacts & Companies", () => {
  const client = getClient();

  let contactId: string;
  let companyId: string;
  let noteId: string;

  // Wait for rate limit window to reset before starting
  beforeAll(async () => {
    await delay(3000);
  });

  // -----------------------------------------------------------------------
  // Contacts
  // -----------------------------------------------------------------------

  describe.sequential("contacts", () => {
    it("add", async () => {
      const res = await client.contacts.add({
        first_name: "SDK",
        last_name: "IntegrationTest",
        emails: [{ type: "primary", email: "sdk-test@example.com" }],
      });
      expect(res).toHaveProperty("data");
      const data = res.data as { id: string };
      expect(data).toHaveProperty("id");
      contactId = data.id;
    });

    it("info", async () => {
      const res = await client.contacts.info({ id: contactId });
      expect(res).toHaveProperty("data");
      const data = res.data as { id: string; first_name: string };
      expect(data.id).toBe(contactId);
      expect(data.first_name).toBe("SDK");
    });

    it("list", async () => {
      const res = await client.contacts.list({
        filter: { term: "SDK IntegrationTest" },
        page: { size: 10, number: 1 },
      });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });

    it("update", async () => {
      await client.contacts.update({
        id: contactId,
        first_name: "SDKUpdated",
      });
      // 204 — verify via info
      const res = await client.contacts.info({ id: contactId });
      expect((res.data as { first_name: string }).first_name).toBe(
        "SDKUpdated",
      );
    });

    it("tag", async () => {
      await client.contacts.tag({
        id: contactId,
        tags: ["sdk-integration-test"],
      });
    });

    it("untag", async () => {
      await client.contacts.untag({
        id: contactId,
        tags: ["sdk-integration-test"],
      });
    });

    it("uploadAvatar (set and remove)", async () => {
      // Minimal 1x1 transparent PNG as base64 data URI
      const tinyPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";

      // Set avatar
      await client.contacts.uploadAvatar({
        id: contactId,
        image: tinyPng,
      });

      // Remove avatar
      await client.contacts.uploadAvatar({
        id: contactId,
        image: null,
      });
    });
  });

  // -----------------------------------------------------------------------
  // Companies
  // -----------------------------------------------------------------------

  describe.sequential("companies", () => {
    it("rate limit cooldown", async () => {
      await delay(3000);
    });

    it("add", async () => {
      const res = await client.companies.add({
        name: "SDK Test Corp",
      });
      expect(res).toHaveProperty("data");
      const data = res.data as { id: string };
      expect(data).toHaveProperty("id");
      companyId = data.id;
    });

    it("info", async () => {
      const res = await client.companies.info({ id: companyId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(companyId);
    });

    it("list", async () => {
      const res = await client.companies.list({
        filter: { term: "SDK Test Corp" },
        page: { size: 10, number: 1 },
      });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
    });

    it("update", async () => {
      await client.companies.update({
        id: companyId,
        name: "SDK Test Corp Updated",
      });
      const res = await client.companies.info({ id: companyId });
      expect((res.data as { name: string }).name).toBe(
        "SDK Test Corp Updated",
      );
    });

    it("tag", async () => {
      await client.companies.tag({
        id: companyId,
        tags: ["sdk-integration-test"],
      });
    });

    it("untag", async () => {
      await client.companies.untag({
        id: companyId,
        tags: ["sdk-integration-test"],
      });
    });

    it("uploadLogo (set and remove)", async () => {
      // Minimal 1x1 transparent PNG as base64 data URI
      const tinyPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";

      // Set logo
      await client.companies.uploadLogo({
        id: companyId,
        image: tinyPng,
      });

      // Remove logo
      await client.companies.uploadLogo({
        id: companyId,
        image: null,
      });
    });
  });

  // -----------------------------------------------------------------------
  // Contact ↔ Company linking
  // -----------------------------------------------------------------------

  describe.sequential("contact-company linking", () => {
    it("linkToCompany", async () => {
      await client.contacts.linkToCompany({
        id: contactId,
        company_id: companyId,
        position: "Developer",
      });
    });

    it("updateCompanyLink", async () => {
      await client.contacts.updateCompanyLink({
        id: contactId,
        company_id: companyId,
        position: "CTO",
      });
    });

    it("unlinkFromCompany", async () => {
      await client.contacts.unlinkFromCompany({
        id: contactId,
        company_id: companyId,
      });
    });
  });

  // -----------------------------------------------------------------------
  // Notes (on contact)
  // -----------------------------------------------------------------------

  describe.sequential("notes", () => {
    it("create", async () => {
      const res = await client.notes.create({
        content: "SDK integration test note",
        subject: { type: "contact", id: contactId },
      });
      expect(res).toHaveProperty("data");
      const data = res.data as { id: string };
      expect(data).toHaveProperty("id");
      noteId = data.id;
    });

    it("list", async () => {
      const res = await client.notes.list({
        filter: { subject: { type: "contact", id: contactId } },
      });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
      expect(res.data.length).toBeGreaterThan(0);
    });

    it("update", async () => {
      await client.notes.update({
        id: noteId,
        content: "SDK integration test note — updated",
      });
    });
  });

  // -----------------------------------------------------------------------
  // Files (full lifecycle: upload → info → download → list → delete)
  // -----------------------------------------------------------------------

  describe.sequential("files", () => {
    let fileId: string;

    it("upload", async () => {
      const res = await client.files.upload({
        name: "sdk-test.pdf",
        subject: { type: "contact", id: contactId },
      });
      expect(res).toHaveProperty("data");
      const data = res.data as { location: string; expires_at: string };
      expect(data.location).toBeTruthy();

      // Upload a minimal PDF to the pre-signed URL
      const minimalPdf =
        "%PDF-1.0\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n" +
        "2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n" +
        "3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R>>endobj\n" +
        "xref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n" +
        "0000000058 00000 n \n0000000115 00000 n \n" +
        "trailer<</Size 4/Root 1 0 R>>\nstartxref\n190\n%%EOF";
      const uploadRes = await fetch(data.location, {
        method: "POST",
        body: Buffer.from(minimalPdf),
      });
      expect(uploadRes.ok).toBe(true);
    });

    it("list (find uploaded file)", async () => {
      const res = await client.files.list({
        filter: { subject: { type: "contact", id: contactId } },
      });
      expect(res).toHaveProperty("data");
      expect(Array.isArray(res.data)).toBe(true);
      const files = res.data as Array<{ id: string; name?: string }>;
      const uploaded = files.find((f) => f.name === "sdk-test.pdf");
      expect(uploaded).toBeDefined();
      fileId = uploaded!.id;
    });

    it("info", async () => {
      const res = await client.files.info({ id: fileId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(fileId);
    });

    it("download", async () => {
      const res = await client.files.download({ id: fileId });
      expect(res).toHaveProperty("data");
      const data = res.data as { location: string };
      expect(data.location).toBeTruthy();
    });

    it("delete", async () => {
      await client.files.delete({ id: fileId });
    });
  });

  // -----------------------------------------------------------------------
  // Cleanup
  // -----------------------------------------------------------------------

  afterAll(async () => {
    await cleanupAll([
      () => client.contacts.delete({ id: contactId }),
      () => client.companies.delete({ id: companyId }),
    ]);
  });
});
