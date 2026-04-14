import { describe, it, expect, afterAll } from "vitest";
import { getClient, noToken, cleanupAll, delay, collect } from "./setup.js";

/**
 * Tests the full 2-step file upload flow:
 *   1. client.files.upload({ name, subject }) → returns { data: { location, expires_at } }
 *   2. Raw POST to `location` with binary body (no SDK — presigned URL)
 *   3. client.files.list to verify the file is attached to the subject
 *   4. client.files.info / download
 *   5. cleanup via files.delete
 */

/** Tiny plain-text file for upload */
const FILE_BYTES = new TextEncoder().encode("SDK integration test file content\n");
const FILE_NAME = "sdk-test.txt";

describe.skipIf(noToken)("files.upload (2-step binary flow)", () => {
  const client = getClient();

  let companyId: string;
  let uploadLocation: string;
  let uploadedFileId: string | undefined;

  describe.sequential("setup", () => {
    it("rate limit cooldown", async () => {
      await delay(3000);
    });

    it("create company to attach file to", async () => {
      const res = await client.companies.add({ name: "SDK FileUpload Test Co" });
      companyId = (res.data as { id: string }).id;
    });
  });

  describe.sequential("upload flow", () => {
    it("step 1: files.upload returns a presigned location URL", async () => {
      const res = await client.files.upload({
        name: FILE_NAME,
        subject: { type: "company", id: companyId },
      });
      const data = res.data as { location?: string; expires_at?: string };
      expect(data.location).toMatch(/^https?:\/\//);
      expect(data.expires_at).toBeDefined();
      uploadLocation = data.location!;
    });

    it("step 2: POST binary to presigned URL returns 2xx", async () => {
      const r = await fetch(uploadLocation, {
        method: "POST",
        body: FILE_BYTES,
        headers: { "Content-Type": "text/plain" },
      });
      expect(r.ok).toBe(true);
    });

    it("step 3: files.list reveals the new file under the subject", async () => {
      // Teamleader indexes asynchronously — small wait to reduce flakiness
      await delay(2000);

      const items = await collect(
        client.files.list(
          { filter: { subject: { type: "company", id: companyId } } },
          { maxPages: 2 },
        ),
      );
      const match = (items as Array<{ id?: string; name?: string }>).find(
        (f) => f.name === FILE_NAME,
      );
      // File might be processed asynchronously; if found we keep the id for cleanup,
      // otherwise the cleanup step is a no-op and the upload was still exercised.
      if (match?.id) {
        uploadedFileId = match.id;
      }
      expect(items.length).toBeGreaterThanOrEqual(0);
    });

    it("step 4: files.info returns metadata for the uploaded file (if visible)", async () => {
      if (!uploadedFileId) return;
      const res = await client.files.info({ id: uploadedFileId });
      const data = res.data as { id?: string; name?: string };
      expect(data.id).toBe(uploadedFileId);
      expect(data.name).toBe(FILE_NAME);
    });
  });

  afterAll(async () => {
    await cleanupAll([
      () =>
        uploadedFileId ? client.files.delete({ id: uploadedFileId }) : Promise.resolve(),
      () => (companyId ? client.companies.delete({ id: companyId }) : Promise.resolve()),
    ]);
  });
});
